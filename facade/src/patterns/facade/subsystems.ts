// DVD 플레이어 서브시스템
export class DVDPlayer {
  private isPlaying: boolean = false;
  private movie: string = '';

  play(movie: string): void {
    this.movie = movie;
    this.isPlaying = true;
    console.log(`🎬 DVD 플레이어: "${movie}" 재생 시작`);
  }

  stop(): void {
    if (this.isPlaying) {
      console.log(`⏹️ DVD 플레이어: "${this.movie}" 재생 중지`);
      this.isPlaying = false;
      this.movie = '';
    }
  }

  getStatus(): { isPlaying: boolean; movie: string } {
    return {
      isPlaying: this.isPlaying,
      movie: this.movie
    };
  }
}

// 프로젝터 서브시스템
export class Projector {
  private isOn: boolean = false;
  private input: string = '';

  on(): void {
    this.isOn = true;
    console.log('📽️ 프로젝터: 켜짐');
  }

  off(): void {
    this.isOn = false;
    this.input = '';
    console.log('📽️ 프로젝터: 꺼짐');
  }

  setInput(input: string): void {
    this.input = input;
    console.log(`📽️ 프로젝터: 입력 소스 "${input}"로 설정`);
  }

  getStatus(): { isOn: boolean; input: string } {
    return {
      isOn: this.isOn,
      input: this.input
    };
  }
}

// 사운드 시스템 서브시스템
export class SoundSystem {
  private isOn: boolean = false;
  private volume: number = 0;

  on(): void {
    this.isOn = true;
    console.log('🔊 사운드 시스템: 켜짐');
  }

  off(): void {
    this.isOn = false;
    this.volume = 0;
    console.log('🔊 사운드 시스템: 꺼짐');
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
    console.log(`🔊 사운드 시스템: 볼륨 ${this.volume}%로 설정`);
  }

  getStatus(): { isOn: boolean; volume: number } {
    return {
      isOn: this.isOn,
      volume: this.volume
    };
  }
}

// 조명 서브시스템
export class Lights {
  private brightness: number = 100; // 0-100

  dim(level: number): void {
    this.brightness = Math.max(0, Math.min(100, level));
    console.log(`💡 조명: 밝기 ${this.brightness}%로 설정`);
  }

  brighten(level: number): void {
    this.brightness = Math.max(0, Math.min(100, level));
    console.log(`💡 조명: 밝기 ${this.brightness}%로 설정`);
  }

  getStatus(): { brightness: number } {
    return {
      brightness: this.brightness
    };
  }
}

