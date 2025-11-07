<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Command Pattern - 텍스트 에디터
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 메인 에디터 영역 -->
        <div class="lg:col-span-2 space-y-4">
          <!-- 입력 컨트롤 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">커맨드 실행</h2>
            
            <div class="space-y-4">
              <!-- 텍스트 추가 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  텍스트 추가
                </label>
                <div class="flex gap-2">
                  <input
                    v-model="inputText"
                    type="text"
                    placeholder="추가할 텍스트 입력"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @keyup.enter="handleWrite"
                  />
                  <button
                    @click="handleWrite"
                    class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </div>

              <!-- 텍스트 삭제 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  텍스트 삭제
                </label>
                <div class="flex gap-2">
                  <input
                    v-model.number="deleteLength"
                    type="number"
                    min="1"
                    :max="editor.content.length"
                    placeholder="삭제할 문자 수"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    @click="handleDelete"
                    :disabled="!editor.content || deleteLength <= 0"
                    class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <!-- 굵게 -->
              <div>
                <button
                  @click="handleBold"
                  :class="[
                    'w-full px-6 py-2 rounded-md transition-colors',
                    editor.isBold
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  ]"
                >
                  {{ editor.isBold ? '굵게 해제' : '굵게' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Undo/Redo 컨트롤 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">히스토리 제어</h2>
            <div class="flex gap-4">
              <button
                @click="handleUndo"
                :disabled="!commandManager.canUndo()"
                class="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Undo (Ctrl+Z)
              </button>
              <button
                @click="handleRedo"
                :disabled="!commandManager.canRedo()"
                class="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Redo (Ctrl+Y)
              </button>
            </div>
          </div>

          <!-- 텍스트 미리보기 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">현재 텍스트 상태</h2>
            <div class="min-h-[150px] p-4 border border-gray-300 rounded-md bg-gray-50">
              <p
                :class="[
                  'text-lg',
                  editor.isBold ? 'font-bold' : 'font-normal'
                ]"
              >
                {{ editor.content || '(텍스트가 없습니다)' }}
              </p>
            </div>
            <div class="mt-4 text-sm text-gray-600">
              <p>문자 수: {{ editor.content.length }}</p>
              <p>굵게: {{ editor.isBold ? '예' : '아니오' }}</p>
            </div>
          </div>
        </div>

        <!-- 히스토리 타임라인 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">커맨드 히스토리</h2>
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
              <div
                v-for="(command, index) in commandManager.getHistory()"
                :key="index"
                :class="[
                  'p-3 rounded-md border-2 transition-all',
                  index === commandManager.getCurrentIndex()
                    ? 'border-blue-500 bg-blue-50'
                    : index < commandManager.getCurrentIndex()
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 bg-white opacity-50'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">
                    {{ getCommandName(command) }}
                  </span>
                  <span class="text-xs text-gray-500">
                    #{{ index + 1 }}
                  </span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ getCommandDescription(command) }}
                </div>
              </div>
              <div
                v-if="commandManager.getHistory().length === 0"
                class="text-center text-gray-400 py-8"
              >
                히스토리가 없습니다
              </div>
            </div>
            <button
              @click="handleClearHistory"
              class="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              히스토리 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { TextEditor } from './TextEditor';
import { CommandManager } from './CommandManager';
import { WriteCommand } from './WriteCommand';
import { DeleteCommand } from './DeleteCommand';
import { BoldCommand } from './BoldCommand';

const editor = ref(new TextEditor());
const commandManager = ref(new CommandManager());
const inputText = ref('');
const deleteLength = ref(1);

const handleWrite = () => {
  if (!inputText.value.trim()) return;
  
  const command = new WriteCommand(editor.value, inputText.value);
  commandManager.value.executeCommand(command);
  inputText.value = '';
};

const handleDelete = () => {
  if (deleteLength.value <= 0 || deleteLength.value > editor.value.content.length) {
    return;
  }
  
  const command = new DeleteCommand(editor.value, deleteLength.value);
  commandManager.value.executeCommand(command);
  deleteLength.value = 1;
};

const handleBold = () => {
  const command = new BoldCommand(editor.value);
  commandManager.value.executeCommand(command);
};

const handleUndo = () => {
  commandManager.value.undo();
};

const handleRedo = () => {
  commandManager.value.redo();
};

const handleClearHistory = () => {
  commandManager.value.clearHistory();
  editor.value.setContent('');
  editor.value.setBold(false);
};

const getCommandName = (command: any): string => {
  if (command instanceof WriteCommand) {
    return 'WriteCommand';
  } else if (command instanceof DeleteCommand) {
    return 'DeleteCommand';
  } else if (command instanceof BoldCommand) {
    return 'BoldCommand';
  }
  return 'Unknown';
};

const getCommandDescription = (command: any): string => {
  if (command instanceof WriteCommand) {
    return `텍스트 추가: "${command['text']}"`;
  } else if (command instanceof DeleteCommand) {
    return `텍스트 삭제: ${command['length']}자`;
  } else if (command instanceof BoldCommand) {
    return '텍스트 굵게 토글';
  }
  return '';
};

// 키보드 단축키 처리
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 'z' && !event.shiftKey) {
      event.preventDefault();
      handleUndo();
    } else if (event.key === 'y' || (event.key === 'z' && event.shiftKey)) {
      event.preventDefault();
      handleRedo();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

