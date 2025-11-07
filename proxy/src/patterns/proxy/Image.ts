// Image 인터페이스
export interface Image {
  display(): void
  getUrl(): string
}

// RealImage 클래스 - 실제 이미지 로딩
export class RealImage implements Image {
  private url: string
  private imageElement: HTMLImageElement | null = null
  private loadCount: number = 0

  constructor(url: string) {
    this.url = url
  }

  display(): void {
    if (!this.imageElement) {
      this.imageElement = new Image()
      this.imageElement.src = this.url
      this.loadCount++
    }
  }

  getUrl(): string {
    return this.url
  }

  getImageElement(): HTMLImageElement | null {
    return this.imageElement
  }

  getLoadCount(): number {
    return this.loadCount
  }
}

// ProxyImage 클래스 - Virtual Proxy 패턴 구현
export class ProxyImage implements Image {
  private url: string
  private realImage: RealImage | null = null
  private isLoading: boolean = false
  private isLoaded: boolean = false
  private loadCount: number = 0

  constructor(url: string) {
    this.url = url
  }

  display(): void {
    // 이미 로드된 경우 캐시된 이미지 사용
    if (this.isLoaded && this.realImage) {
      return
    }

    // 로딩 중인 경우 무시
    if (this.isLoading) {
      return
    }

    // 실제 이미지 로딩 시작
    this.isLoading = true
    this.loadCount++

    // setTimeout으로 지연 시뮬레이션 (1-2초)
    const delay = Math.random() * 1000 + 1000

    setTimeout(() => {
      if (!this.realImage) {
        this.realImage = new RealImage(this.url)
      }
      this.realImage.display()
      this.isLoaded = true
      this.isLoading = false
    }, delay)
  }

  getUrl(): string {
    return this.url
  }

  getRealImage(): RealImage | null {
    return this.realImage
  }

  getIsLoading(): boolean {
    return this.isLoading
  }

  getIsLoaded(): boolean {
    return this.isLoaded
  }

  getLoadCount(): number {
    return this.loadCount
  }
}

