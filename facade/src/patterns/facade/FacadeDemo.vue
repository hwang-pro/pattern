<template>
  <div class="facade-demo">
    <div class="container">
      <h1 class="title">🎬 홈 시어터 시스템 (Facade 패턴)</h1>
      
      <div class="controls">
        <button 
          @click="handleWatchMovie" 
          :disabled="isMoviePlaying"
          class="btn btn-primary"
        >
          {{ isMoviePlaying ? '영화 재생 중...' : '🎬 영화 보기' }}
        </button>
        
        <button 
          @click="handleEndMovie" 
          :disabled="!isMoviePlaying"
          class="btn btn-secondary"
        >
          🏁 영화 끝내기
        </button>
      </div>

      <div class="status-grid">
        <!-- DVD Player -->
        <div class="status-card" :class="{ active: status.dvdPlayer.isPlaying }">
          <div class="card-header">
            <h3>🎬 DVD 플레이어</h3>
            <span class="status-badge" :class="status.dvdPlayer.isPlaying ? 'on' : 'off'">
              {{ status.dvdPlayer.isPlaying ? 'ON' : 'OFF' }}
            </span>
          </div>
          <div class="card-body">
            <p v-if="status.dvdPlayer.isPlaying" class="movie-title">
              {{ status.dvdPlayer.movie || '재생 중...' }}
            </p>
            <p v-else class="movie-title inactive">대기 중</p>
          </div>
        </div>

        <!-- Projector -->
        <div class="status-card" :class="{ active: status.projector.isOn }">
          <div class="card-header">
            <h3>📽️ 프로젝터</h3>
            <span class="status-badge" :class="status.projector.isOn ? 'on' : 'off'">
              {{ status.projector.isOn ? 'ON' : 'OFF' }}
            </span>
          </div>
          <div class="card-body">
            <p class="input-source">
              입력: <span :class="{ active: status.projector.isOn }">
                {{ status.projector.input || '없음' }}
              </span>
            </p>
          </div>
        </div>

        <!-- Sound System -->
        <div class="status-card" :class="{ active: status.soundSystem.isOn }">
          <div class="card-header">
            <h3>🔊 사운드 시스템</h3>
            <span class="status-badge" :class="status.soundSystem.isOn ? 'on' : 'off'">
              {{ status.soundSystem.isOn ? 'ON' : 'OFF' }}
            </span>
          </div>
          <div class="card-body">
            <div class="volume-control">
              <div class="volume-bar">
                <div 
                  class="volume-fill" 
                  :style="{ width: status.soundSystem.volume + '%' }"
                ></div>
              </div>
              <span class="volume-text">{{ status.soundSystem.volume }}%</span>
            </div>
          </div>
        </div>

        <!-- Lights -->
        <div class="status-card" :class="{ active: status.lights.brightness < 50 }">
          <div class="card-header">
            <h3>💡 조명</h3>
            <span class="status-badge" :class="status.lights.brightness < 50 ? 'dim' : 'bright'">
              {{ status.lights.brightness < 50 ? '어둡게' : '밝게' }}
            </span>
          </div>
          <div class="card-body">
            <div class="brightness-control">
              <div class="brightness-bar">
                <div 
                  class="brightness-fill" 
                  :style="{ width: status.lights.brightness + '%' }"
                ></div>
              </div>
              <span class="brightness-text">{{ status.lights.brightness }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 애니메이션 효과 -->
      <div v-if="isMoviePlaying" class="movie-overlay">
        <div class="film-strip"></div>
        <div class="screen-glow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { HomeTheaterFacade } from './HomeTheaterFacade';

const facade = new HomeTheaterFacade();
const isMoviePlaying = ref(false);
let statusInterval: number | null = null;

const status = reactive({
  dvdPlayer: { isPlaying: false, movie: '' },
  projector: { isOn: false, input: '' },
  soundSystem: { isOn: false, volume: 0 },
  lights: { brightness: 100 }
});

const updateStatus = () => {
  const allStatus = facade.getAllStatus();
  Object.assign(status, allStatus);
};

const handleWatchMovie = () => {
  facade.watchMovie('인터스텔라');
  isMoviePlaying.value = true;
  updateStatus();
  
  // 상태를 주기적으로 업데이트
  if (statusInterval) {
    clearInterval(statusInterval);
  }
  statusInterval = window.setInterval(updateStatus, 100);
};

const handleEndMovie = () => {
  facade.endMovie();
  isMoviePlaying.value = false;
  updateStatus();
  
  if (statusInterval) {
    clearInterval(statusInterval);
    statusInterval = null;
  }
};

onMounted(() => {
  updateStatus();
});

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval);
  }
});
</script>

<style scoped>
.facade-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.title {
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.6s ease-out;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.8s ease-out;
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.status-card.active {
  border-color: #667eea;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  transform: scale(1.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.on {
  background: #10b981;
  color: white;
}

.status-badge.off {
  background: #6b7280;
  color: white;
}

.status-badge.dim {
  background: #1f2937;
  color: white;
}

.status-badge.bright {
  background: #fbbf24;
  color: white;
}

.card-body {
  margin-top: 1rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
  margin: 0;
  animation: pulse 2s infinite;
}

.movie-title.inactive {
  color: #9ca3af;
  animation: none;
}

.input-source {
  color: #6b7280;
  font-size: 1rem;
}

.input-source span.active {
  color: #667eea;
  font-weight: bold;
}

.volume-control,
.brightness-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.volume-bar,
.brightness-bar {
  flex: 1;
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.volume-fill,
.brightness-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.volume-text,
.brightness-text {
  font-weight: bold;
  color: #667eea;
  min-width: 45px;
  text-align: right;
}

.movie-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.film-strip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  animation: filmMove 0.5s linear infinite;
}

.screen-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(102, 126, 234, 0.1) 0%,
    transparent 70%
  );
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes filmMove {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}

@keyframes glow {
  from {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }
  
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
}
</style>

