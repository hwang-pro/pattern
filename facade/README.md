# Facade 패턴 - 홈 시어터 시스템

Vue 3 + TypeScript + Vite로 구현한 Facade 패턴 데모 프로젝트입니다.

## 프로젝트 구조

```
src/
├── patterns/
│   └── facade/
│       ├── subsystems.ts          # 서브시스템 클래스들 (DVDPlayer, Projector, SoundSystem, Lights)
│       ├── HomeTheaterFacade.ts   # Facade 클래스
│       └── FacadeDemo.vue         # Vue 컴포넌트
├── App.vue
└── main.ts
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 기능

1. **서브시스템 클래스들**
   - `DVDPlayer`: 영화 재생/중지
   - `Projector`: 프로젝터 켜기/끄기, 입력 소스 설정
   - `SoundSystem`: 사운드 시스템 켜기/끄기, 볼륨 조절
   - `Lights`: 조명 밝기 조절

2. **HomeTheaterFacade 클래스**
   - `watchMovie()`: 모든 기기를 적절히 켜고 설정하여 영화 감상 준비
   - `endMovie()`: 모든 기기를 끄고 정리

3. **Vue 컴포넌트**
   - "영화 보기" 버튼으로 `watchMovie()` 실행
   - "영화 끝내기" 버튼으로 `endMovie()` 실행
   - 각 서브시스템의 상태를 실시간으로 표시
   - 애니메이션 효과로 시스템 작동 시각화

## Facade 패턴의 장점

- 복잡한 서브시스템들을 단순한 인터페이스로 제공
- 클라이언트 코드가 서브시스템의 세부사항을 알 필요 없음
- 서브시스템 변경 시 Facade만 수정하면 됨

