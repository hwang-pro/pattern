# Command Pattern Demo - 텍스트 에디터

Vue 3 + TypeScript + Vite로 구현한 Command 패턴 데모 애플리케이션입니다.

## 기능

- **텍스트 추가**: WriteCommand를 사용하여 텍스트를 추가합니다.
- **텍스트 삭제**: DeleteCommand를 사용하여 텍스트를 삭제합니다.
- **텍스트 굵게**: BoldCommand를 사용하여 텍스트를 굵게 만듭니다.
- **Undo/Redo**: CommandManager를 통해 실행한 커맨드를 되돌리거나 다시 실행할 수 있습니다.
- **히스토리 시각화**: 실행한 모든 커맨드를 타임라인으로 확인할 수 있습니다.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 키보드 단축키

- **Ctrl+Z**: Undo (마지막 커맨드 실행 취소)
- **Ctrl+Y**: Redo (취소한 커맨드 다시 실행)

## 프로젝트 구조

```
src/
  patterns/
    command/
      Command.ts          # Command 인터페이스
      TextEditor.ts       # Receiver 클래스
      WriteCommand.ts     # 텍스트 추가 커맨드
      DeleteCommand.ts    # 텍스트 삭제 커맨드
      BoldCommand.ts      # 텍스트 굵게 커맨드
      CommandManager.ts   # Invoker 클래스
      CommandDemo.vue     # Vue 컴포넌트
  App.vue
  main.ts
  style.css
```

## Command 패턴 구조

- **Command**: 실행할 작업을 캡슐화하는 인터페이스
- **Concrete Commands**: WriteCommand, DeleteCommand, BoldCommand
- **Receiver**: TextEditor (실제 작업을 수행하는 객체)
- **Invoker**: CommandManager (커맨드를 실행하고 히스토리를 관리)

