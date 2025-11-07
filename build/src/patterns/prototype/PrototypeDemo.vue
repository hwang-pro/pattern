<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">
        Prototype Pattern Demo
      </h1>
      <p class="text-gray-600 text-center mb-8">
        문서 템플릿을 복제하여 새로운 문서를 생성해보세요
      </p>

      <!-- 템플릿 선택 섹션 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          템플릿 선택
        </h2>
        <div class="grid md:grid-cols-3 gap-4">
          <button
            v-for="template in templates"
            :key="template.title"
            @click="selectTemplate(template)"
            :class="[
              'p-4 rounded-lg border-2 transition-all duration-200',
              selectedTemplate?.title === template.title
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            ]"
          >
            <div class="text-center">
              <div class="text-3xl mb-2">{{ getTemplateIcon(template.metadata.type) }}</div>
              <h3 class="font-semibold text-gray-700">{{ template.metadata.type }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ template.title }}</p>
            </div>
          </button>
        </div>

        <button
          v-if="selectedTemplate"
          @click="cloneDocument"
          class="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          📋 템플릿 복제하기
        </button>
      </div>

      <!-- 원본과 복제본 비교 섹션 -->
      <div v-if="clonedDocuments.length > 0" class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          원본 vs 복제본 비교
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <!-- 원본 문서 -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-700">
                원본 문서
              </h3>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                원본
              </span>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  v-model="selectedTemplate.title"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  readonly
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  v-model="selectedTemplate.content"
                  rows="6"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  readonly
                ></textarea>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm font-medium text-gray-700 mb-2">메타데이터</p>
                <pre class="text-xs text-gray-600 overflow-auto">{{ JSON.stringify(selectedTemplate.metadata, null, 2) }}</pre>
              </div>
            </div>
          </div>

          <!-- 복제본 문서들 -->
          <div
            v-for="(cloned, index) in clonedDocuments"
            :key="index"
            class="bg-white rounded-lg shadow-lg p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-700">
                복제본 #{{ index + 1 }}
              </h3>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  복제본
                </span>
                <button
                  @click="removeClonedDocument(index)"
                  class="px-2 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition"
                >
                  삭제
                </button>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  v-model="cloned.title"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="제목을 수정하세요"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  v-model="cloned.content"
                  rows="6"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="내용을 수정하세요"
                ></textarea>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm font-medium text-gray-700 mb-2">메타데이터</p>
                <div class="space-y-2">
                  <div v-for="(value, key) in cloned.metadata" :key="key" class="flex items-start">
                    <span class="text-xs font-medium text-gray-600 w-20 flex-shrink-0">{{ key }}:</span>
                    <input
                      v-if="typeof value === 'string'"
                      v-model="cloned.metadata[key]"
                      type="text"
                      class="flex-1 text-xs px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-green-500 outline-none"
                    />
                    <span v-else class="text-xs text-gray-600">{{ JSON.stringify(value) }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p class="text-xs text-yellow-800">
                  💡 복제본을 수정해도 원본은 변경되지 않습니다!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 안내 메시지 -->
      <div v-else class="bg-white rounded-lg shadow-lg p-12 text-center">
        <div class="text-6xl mb-4">📄</div>
        <p class="text-gray-500 text-lg">
          템플릿을 선택하고 복제 버튼을 클릭하여 문서를 생성하세요
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Document, ConcreteDocument, DocumentTemplateFactory } from './Document'

const templates = ref<ConcreteDocument[]>([
  DocumentTemplateFactory.createReportTemplate(),
  DocumentTemplateFactory.createEmailTemplate(),
  DocumentTemplateFactory.createMemoTemplate()
])

const selectedTemplate = ref<ConcreteDocument | null>(null)
const clonedDocuments = ref<Document[]>([])

const selectTemplate = (template: ConcreteDocument) => {
  selectedTemplate.value = template
}

const cloneDocument = () => {
  if (!selectedTemplate.value) return
  
  // Prototype 패턴: clone() 메서드를 사용하여 깊은 복사
  const cloned = selectedTemplate.value.clone()
  clonedDocuments.value.push(cloned)
}

const removeClonedDocument = (index: number) => {
  clonedDocuments.value.splice(index, 1)
}

const getTemplateIcon = (type: string): string => {
  const icons: Record<string, string> = {
    '보고서': '📊',
    '이메일': '📧',
    '메모': '📝'
  }
  return icons[type] || '📄'
}
</script>


