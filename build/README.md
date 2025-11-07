# Builder Pattern Demo

Vue 3 + TypeScript + Vite로 구현한 Builder 패턴 데모 프로젝트입니다.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
  ├── patterns/
  │   └── builder/
  │       ├── UserProfileBuilder.ts  # Builder 패턴 구현
  │       └── BuilderDemo.vue         # Vue 컴포넌트
  ├── styles/
  │   └── main.css                    # Tailwind CSS
  ├── App.vue
  └── main.ts
```

## Builder 패턴

이 프로젝트는 Builder 패턴을 사용하여 사용자 프로필을 단계별로 생성합니다.

### 사용 예시

```typescript
import { UserProfileBuilder } from './UserProfileBuilder'

const profile = new UserProfileBuilder()
  .setName('홍길동')
  .setAge(25)
  .setEmail('hong@example.com')
  .setPhone('010-1234-5678')
  .setAddress('서울시 강남구')
  .build()
```

## 기술 스택

- Vue 3
- TypeScript
- Vite
- Tailwind CSS

