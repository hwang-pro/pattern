import type { Command } from './Command';
import type { TextEditor } from './TextEditor';

export class DeleteCommand implements Command {
  private editor: TextEditor;
  private length: number;
  private deletedText: string = '';

  constructor(editor: TextEditor, length: number) {
    this.editor = editor;
    this.length = length;
  }

  execute(): void {
    const currentContent = this.editor.content;
    this.deletedText = currentContent.slice(-this.length);
    this.editor.delete(this.length);
  }

  undo(): void {
    this.editor.write(this.deletedText);
  }
}

