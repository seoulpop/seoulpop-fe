# 🔗 Services
여기는 Seoul Pop Team의 index directory 입니다.

---

### 🗒️ Description

각종 API 요청들을 모아둔 디렉토리

### 🔎 How to use

```tsx
import { getDataApi } from '@/index/example';
...

const data = await getDataApi()
  .then((res) => res.data)
  .catch(() => []);
```

### 🌱 How to contribute

- 만들고자 하는 서비스의 이름으로 현재 디렉토리의 하위에 파일을 생성한다.
    - 파일 이름은 camelCase를 따른다. `camelCase.ts`
- API 요청을 이 곳에서만 정리하고, 전달한다.

### 💡 Example

```tsx
export const apiExample = axios.create({
  baseURL: `${import.meta.env.BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```
