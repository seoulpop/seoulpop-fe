<!-- TODO: 타이틀 이미지 추가 필요 -->
[//]: # (<img src="assets/images/title.png" alt="title">)

## 💬 프로젝트 소개

<!-- TODO: 프로젝트 소개 내용 변경 필요 -->

서울 문화재 지도 서비스  
위치 기반 인접 문화재, 역사 푸쉬 알림  
AR 문화재 조회, 정보 제공

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

<!-- TODO: 기획서 - 기획 배경이 없음 -->

기획 배경을 써주세요  

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

### 🖥️ 랜딩 페이지 - `서범석`

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
