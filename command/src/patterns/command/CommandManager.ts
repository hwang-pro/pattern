import type { Command } from './Command';

export class CommandManager {
  private history: Command[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  executeCommand(command: Command): void {
    // 현재 인덱스 이후의 히스토리 제거 (새로운 커맨드 실행 시)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    command.execute();
    this.history.push(command);
    this.currentIndex++;

    // 히스토리 크기 제한
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): boolean {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
      return true;
    }
    return false;
  }

  redo(): boolean {
    if (this.canRedo()) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
      return true;
    }
    return false;
  }

  canUndo(): boolean {
    return this.currentIndex >= 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  getHistory(): Command[] {
    return this.history;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  clearHistory(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

