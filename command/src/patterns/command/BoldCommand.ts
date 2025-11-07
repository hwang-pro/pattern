import type { Command } from './Command';
import type { TextEditor } from './TextEditor';

export class BoldCommand implements Command {
  private editor: TextEditor;
  private previousState: boolean;

  constructor(editor: TextEditor) {
    this.editor = editor;
    this.previousState = editor.isBold;
  }

  execute(): void {
    this.editor.bold();
  }

  undo(): void {
    this.editor.setBold(this.previousState);
  }
}

