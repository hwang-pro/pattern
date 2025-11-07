export class TextEditor {
  private _content: string = '';
  private _isBold: boolean = false;

  get content(): string {
    return this._content;
  }

  get isBold(): boolean {
    return this._isBold;
  }

  write(text: string): void {
    this._content += text;
  }

  delete(length: number): void {
    if (length > this._content.length) {
      this._content = '';
    } else {
      this._content = this._content.slice(0, -length);
    }
  }

  setContent(content: string): void {
    this._content = content;
  }

  bold(): void {
    this._isBold = !this._isBold;
  }

  setBold(isBold: boolean): void {
    this._isBold = isBold;
  }
}

