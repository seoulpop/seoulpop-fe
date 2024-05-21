# 🚀 Pages
여기는 Seoul Pop Team의 pages directory 입니다.

---

### 🗒️ Description

각 페이지를 모아둔 디렉토리

### 🔎 How to use

pages 디렉토리에 페이지 컴포넌트를 작성하고, src/router/Router.tsx에 연결한다. 

### 🌱 How to contribute

- 라우팅 처리를 하고싶은 이름으로 PascalCase를 따라 생성한다.

### 💡 Example
```tsx
// src/pages/ExamplePage.tsx
import Example from '@/containers/example';
import { getDataApi } from '@/services/example';
import { getMetadata } from '@/app/sharedMetadata';

export const metadata = getMetadata({ ... });

const ExamplePage = async () => {
  const data = await getDataApi()
    .then((res) => res.data)
    .catch(() => []);
  
  return <Example data={data}/> 
};

export default ExamplePage;
```
