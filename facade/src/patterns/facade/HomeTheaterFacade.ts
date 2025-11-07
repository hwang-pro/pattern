import { DVDPlayer, Projector, SoundSystem, Lights } from './subsystems';

export class HomeTheaterFacade {
  private dvdPlayer: DVDPlayer;
  private projector: Projector;
  private soundSystem: SoundSystem;
  private lights: Lights;

  constructor() {
    this.dvdPlayer = new DVDPlayer();
    this.projector = new Projector();
    this.soundSystem = new SoundSystem();
    this.lights = new Lights();
  }

  // 영화 보기: 모든 기기를 적절히 켜고 설정
  watchMovie(movie: string = '인터스텔라'): void {
    console.log('\n🎬 영화 보기 시작...\n');
    
    // 1. 조명을 어둡게
    this.lights.dim(10);
    
    // 2. 프로젝터 켜기
    this.projector.on();
    this.projector.setInput('DVD');
    
    // 3. 사운드 시스템 켜기
    this.soundSystem.on();
    this.soundSystem.setVolume(50);
    
    // 4. DVD 플레이어로 영화 재생
    this.dvdPlayer.play(movie);
    
    console.log('\n✨ 영화 감상 준비 완료!\n');
  }

  // 영화 끝내기: 모든 기기를 끄고 정리
  endMovie(): void {
    console.log('\n🏁 영화 끝내기...\n');
    
    // 1. DVD 플레이어 중지
    this.dvdPlayer.stop();
    
    // 2. 프로젝터 끄기
    this.projector.off();
    
    // 3. 사운드 시스템 끄기
    this.soundSystem.off();
    
    // 4. 조명 밝게
    this.lights.brighten(100);
    
    console.log('\n✅ 모든 기기 정리 완료!\n');
  }

  // 각 서브시스템의 상태를 가져오는 메서드들
  getDVDPlayerStatus() {
    return this.dvdPlayer.getStatus();
  }

  getProjectorStatus() {
    return this.projector.getStatus();
  }

  getSoundSystemStatus() {
    return this.soundSystem.getStatus();
  }

  getLightsStatus() {
    return this.lights.getStatus();
  }

  // 전체 상태 가져오기
  getAllStatus() {
    return {
      dvdPlayer: this.getDVDPlayerStatus(),
      projector: this.getProjectorStatus(),
      soundSystem: this.getSoundSystemStatus(),
      lights: this.getLightsStatus()
    };
  }
}

