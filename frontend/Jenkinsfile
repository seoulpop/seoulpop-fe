pipeline {
    agent any

    environment {
        imageName = 'seoulpop/frontend'
        registryCredential = 'docker-hub'
        dockerImage = ''

        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a409.p.ssafy.io'
    }

    parameters {
        string(name: 'DOCKER_NETWORK', defaultValue: 'proxy-network', description: 'docker network name')
        string(name: 'IMAGE_NAME', defaultValue: 'seoulpop-fe', description: 'docker image name')
        string(name: 'MATTERMOST_CHANNEL', defaultValue: 'deploy-a409', description: 'mattermost channel name')
        string(name: 'MATTERMOST_ENDPOINT'
                , defaultValue: 'https://meeting.ssafy.com/hooks/uobkrknhgpdwbm5bc7yxmz7jjh'
                , description: 'mattermost hooks endpoint')
        choice(name: 'ENV_TYPE', choices: ['dev', 'prod'], description: 'Choose the environment type')
    }

    stages {
        stage('environment setup') {
            steps {
                script {
                    env.BRANCH_NAME = params.ENV_TYPE == 'prod'
                            ? 'release-fe'
                            : 'dev-fe'
                    env.DB_NAME = params.ENV_TYPE == 'prod'
                            ? 'serviceDB'
                            : 'seoulpopDB'
                    env.FRONTEND_URL = params.ENV_TYPE == 'prod'
                            ? 'https://seoul-pop.com'
                            : 'https://seoul-pop.com'
                    env.BACKEND_URL = params.ENV_TYPE == 'prod'
                            ? 'https://api.seoul-pop.com'
                            : 'https://api.seoul-pop.com'
                    env.DOCKER_PORT = params.ENV_TYPE == 'prod'
                            ? '3001'
                            : '3000'
                }
            }
        }
        stage('git clone') {
            steps {
                git branch: "${env.BRANCH_NAME}",
                        credentialsId: 'gitlab-account',
                        url: 'https://lab.ssafy.com/s10-final/S10P31A409'
            }
        }
        stage('image build & docker-hub push') {
            steps {
                dir('frontend') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh 'docker buildx create --use --name mybuilder'
                            sh "docker buildx build --platform linux/amd64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }
        stage('previous docker rm') {
            steps {
                sshagent(credentials: ['ubuntu']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${releaseServerAccount}@${releaseServerUri} 'sudo docker stop \$(sudo docker ps -aq --filter "ancestor=${imageName}:latest") || true'
                        ssh -o StrictHostKeyChecking=no ${releaseServerAccount}@${releaseServerUri} 'sudo docker rm -f \$(sudo docker ps -aq --filter "ancestor=${imageName}:latest") || true'
                        ssh -o StrictHostKeyChecking=no ${releaseServerAccount}@${releaseServerUri} 'sudo docker rmi ${imageName}:latest || true'
                    """
                }
            }
        }
        stage('docker-hub pull') {
            steps {
                sshagent(credentials: ['ubuntu']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName:latest'"
                }
            }
        }
        stage('service start') {
            steps {
                sshagent(credentials: ['ubuntu']) {
                    dir('frontend') {
                        sh '''
                            echo VITE_NODE_ENV=$VITE_NODE_ENV > .env
                            echo VITE_BASE_URL=$VITE_BASE_URL >> .env
                            echo VITE_KAKAO_JAVASCRIPT_KEY=$VITE_KAKAO_JAVASCRIPT_KEY >> .env
                            echo VITE_FIREBASE_VAPID=$VITE_FIREBASE_VAPID >> .env
                            echo VITE_KAKAO_REDIRECT_URI=$VITE_KAKAO_REDIRECT_URI >> .env
                            echo VITE_REST_API_KEY=$VITE_REST_API_KEY >> .env
                            echo VITE_KAKAO_REST_API_KEY=$VITE_KAKAO_REST_API_KEY >> .env
                        '''
                    }
                    sh "scp -o StrictHostKeyChecking=no frontend/.env $releaseServerAccount@$releaseServerUri:~"

                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.releaseServerAccount}@${env.releaseServerUri} \
                        "sudo docker run -i -e TZ=Asia/Seoul \
                        --name ${params.IMAGE_NAME} \
                        --network ${params.DOCKER_NETWORK} \
                        -p ${env.DOCKER_PORT}:3000 \
                        -d ${env.imageName}:latest"
                    """
                }
            }
        }
        stage('service test & alert send') {
            steps {
                sshagent(credentials: ['ubuntu']) {
                    sh """
                        #!/bin/bash

                        for retry_count in \$(seq 20)
                        do
                            if curl -s "${env.FRONTEND_URL}/" > /dev/null
                            then
                                curl -d '{"text":"${env.BRANCH_NAME} release:$BUILD_NUMBER success"}' -H "Content-Type: application/json" -X POST ${params.MATTERMOST_ENDPOINT}
                                break
                            fi

                            if [ \$retry_count -eq 20 ]
                            then
                                curl -d '{"text":"${env.BRANCH_NAME} release:$BUILD_NUMBER fail"}' -H "Content-Type: application/json" -X POST ${params.MATTERMOST_ENDPOINT}
                                exit 1
                            fi

                            echo "The server is not alive yet. Retry health check in 5 seconds..."
                            sleep 5
                        done
                    """
                }
            }
        }
    }
}