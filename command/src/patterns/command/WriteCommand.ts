import type { Command } from './Command';
import type { TextEditor } from './TextEditor';

export class WriteCommand implements Command {
  private editor: TextEditor;
  private text: string;

  constructor(editor: TextEditor, text: string) {
    this.editor = editor;
    this.text = text;
  }

  execute(): void {
    this.editor.write(this.text);
  }

  undo(): void {
    const currentContent = this.editor.content;
    const newContent = currentContent.slice(0, -this.text.length);
    this.editor.setContent(newContent);
  }
}

