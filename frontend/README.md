<!-- TODO: 타이틀 이미지 추가 필요 -->
[//]: # (<img src="assets/images/title.png" alt="title">)

![image-2.png](./image-2.png)

## 💬 프로젝트 소개

<b>서울 문화재 지도 서비스</b>  
위치 기반으로 인접 문화재, 역사 푸쉬 알림을 받고   
AR 카메라로 과거의 모습을 조회할 수 있습니다.

---

## 📚 목차

- [🎯 기획 배경](#plans)
- [🙇 팀원 소개](#members)
- [🔨 기술 스택](#skills)
- [🚀 실행 방법 및 배포 주소](#installation)
- [💡 주요 기능 및 역할](#features)

---

<a name="plans"></a>

## 🎯 기획 배경

서울팝을 통해 역사에 관심은 있지만, 바쁜 현대사회에서 찾아볼 시간이 부족한 사람을이 쉽게 역사를 인터렉티브하게 접할 수 있습니다. 

---

<a name="members"></a>

## 🙇 팀원 소개

|           [서범석](https://github.com/beomxtone)           |           [박지영](https://github.com/parkyolo)            |            [박진아](https://github.com/dev-hamster)            |
| :--------------------------------------------------------: |:-------------------------------------------------------:|:-----------------------------------------------------------:|
| <img src="https://github.com/beomxtone.png" width="120" /> | <img src="https://github.com/parkyolo.png" width="120"> | <img src="https://github.com/dev-hamster.png" width="120" > |

---

<a name="skills"></a>

## 🔨 기술 스택

- Language: `Typescript`
- Core: `React`
- Styling: `Emotion`
- State: `React-Query`, `Zustand`
- etc: `Ar.js`, `Aframe`, `Capacitor`

---

<a name="installation"></a>

## 🚀 실행 방법 및 배포 주소

```
// 패키지 라이브러리 설치
pnpm install

// 개발 환경 실행
pnpm dev

// 빌드 파일 생성
pnpm build
```

- 📱 front-domain : https://seoul-pop.com
- 🛠 back-server : https://api.seoul-pop.com
- 🔗 back-swagger : https://api.seoul-pop.com/swagger-ui/index.html#

---

<a name="features"></a>

## 💡 주요 기능 및 역할

### 🖥️ 역사 지도 - `박지영`, `서범석`

문화재 정보, 3.1운동 사적지, 6.25 전쟁 사적지 3개의 카테고리로 역사 정보를 분류하고 길안내를 지원합니다.

|                       첫 화면                        |
|:-------------------------------------------------:|
| <img src="assets/gifs/landing.gif" width='250px'> |

### 🖥️ ar 역사 정보 - `박진아`

주변에 있는 역사 정보를 ar 컨텐츠로 띄어줍니다. 

|                       첫 화면                        |
|:-------------------------------------------------:|
| <img src="assets/gifs/landing.gif" width='250px'> |

### 🖥️ 주변 역사 알림 - `박지영`

백그라운드 실시간 위치 데이터를 기반으로 인접한 역사 정보가 있으면 알림을 사용자에게 보냅니다.

|                       첫 화면                        |
|:-------------------------------------------------:|
| <img src="assets/gifs/landing.gif" width='250px'> |


### 📂 폴더 구조 및 아키텍처 설계 - `서범석`

```
.
├── node_modules
├── public
└── src
    ├── api
    ├── components
    ├── constants
    ├── containers
    ├── hooks
    │   ├── server
    │   └── store
    ├── pages
    ├── router
    ├── styles
    ├── types
    └── utils

```
