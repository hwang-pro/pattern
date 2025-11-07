<template>
  <div class="max-w-6xl mx-auto">
    <!-- 통계 정보 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">로딩 통계</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">총 로딩 시도</p>
          <p class="text-3xl font-bold text-blue-600">{{ totalLoadAttempts }}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">로드 완료</p>
          <p class="text-3xl font-bold text-green-600">{{ loadedCount }}</p>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">로딩 중</p>
          <p class="text-3xl font-bold text-yellow-600">{{ loadingCount }}</p>
        </div>
      </div>
    </div>

    <!-- 이미지 그리드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(imageProxy, index) in imageProxies"
        :key="index"
        class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        @click="loadImage(index)"
      >
        <!-- 이미지 컨테이너 -->
        <div class="relative aspect-video bg-gray-200 flex items-center justify-center">
          <!-- Placeholder -->
          <div
            v-if="!imageProxy.getIsLoaded() && !imageProxy.getIsLoading()"
            class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
          >
            <svg
              class="w-16 h-16 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p class="text-gray-500 text-sm">클릭하여 이미지 로드</p>
          </div>

          <!-- 로딩 스피너 -->
          <div
            v-if="imageProxy.getIsLoading()"
            class="w-full h-full flex flex-col items-center justify-center bg-gray-100"
          >
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-2"></div>
            <p class="text-gray-600 text-sm">로딩 중...</p>
          </div>

          <!-- 실제 이미지 -->
          <img
            v-if="imageProxy.getIsLoaded() && imageProxy.getRealImage()?.getImageElement()?.src"
            :src="imageProxy.getRealImage()!.getImageElement()!.src"
            :alt="`Image ${index + 1}`"
            class="w-full h-full object-cover"
            @load="updateTrigger++"
          />
        </div>

        <!-- 이미지 정보 -->
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 mb-2">이미지 {{ index + 1 }}</h3>
          <div class="flex justify-between items-center text-sm">
            <span
              class="px-2 py-1 rounded"
              :class="
                imageProxy.getIsLoaded()
                  ? 'bg-green-100 text-green-800'
                  : imageProxy.getIsLoading()
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              "
            >
              {{
                imageProxy.getIsLoaded()
                  ? '로드 완료'
                  : imageProxy.getIsLoading()
                  ? '로딩 중'
                  : '대기 중'
              }}
            </span>
            <span class="text-gray-600">
              로딩 횟수: {{ imageProxy.getLoadCount() }}
            </span>
          </div>
          <p class="text-xs text-gray-500 mt-2 truncate">{{ imageProxy.getUrl() }}</p>
        </div>
      </div>
    </div>

    <!-- 안내 메시지 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p class="text-blue-800 text-sm">
        💡 <strong>사용법:</strong> 이미지를 클릭하면 Proxy 패턴을 통해 이미지가 로드됩니다.
        이미 로드된 이미지는 캐시되어 즉시 표시됩니다.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ProxyImage } from './Image'

// 이미지 URL 목록 (5개)
const imageUrls = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3',
  'https://picsum.photos/800/600?random=4',
  'https://picsum.photos/800/600?random=5',
]

// ProxyImage 인스턴스 배열
const imageProxies = ref<ProxyImage[]>([])

// 반응성을 위한 업데이트 트리거
const updateTrigger = ref(0)

// 통계 계산
const totalLoadAttempts = computed(() => {
  updateTrigger.value // 의존성 추가
  return imageProxies.value.reduce((sum, proxy) => sum + proxy.getLoadCount(), 0)
})

const loadedCount = computed(() => {
  updateTrigger.value // 의존성 추가
  return imageProxies.value.filter((proxy) => proxy.getIsLoaded()).length
})

const loadingCount = computed(() => {
  updateTrigger.value // 의존성 추가
  return imageProxies.value.filter((proxy) => proxy.getIsLoading()).length
})

// 이미지 로드 함수
const loadImage = (index: number) => {
  const proxy = imageProxies.value[index]
  proxy.display()

  // 로딩 상태 변경을 Vue에 알리기 위해 트리거 업데이트
  updateTrigger.value++

  // 로딩 완료를 감지하기 위한 폴링
  if (!proxy.getIsLoaded()) {
    const checkInterval = setInterval(() => {
      if (proxy.getIsLoaded()) {
        updateTrigger.value++
        clearInterval(checkInterval)
      } else if (!proxy.getIsLoading()) {
        // 로딩이 시작되지 않은 경우도 체크
        clearInterval(checkInterval)
      }
    }, 100)
  }
}

// 컴포넌트 마운트 시 ProxyImage 인스턴스 생성
onMounted(() => {
  imageProxies.value = imageUrls.map((url) => new ProxyImage(url))
})
</script>

