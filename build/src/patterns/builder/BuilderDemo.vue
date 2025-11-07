<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">
        Builder Pattern Demo
      </h1>
      <p class="text-gray-600 text-center mb-8">
        사용자 프로필을 단계별로 생성해보세요
      </p>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- 입력 폼 -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">
            프로필 정보 입력
          </h2>
          
          <form @submit.prevent="createProfile" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="홍길동"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label for="age" class="block text-sm font-medium text-gray-700 mb-1">
                나이
              </label>
              <input
                id="age"
                v-model.number="formData.age"
                type="number"
                placeholder="25"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="example@email.com"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                placeholder="010-1234-5678"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                id="address"
                v-model="formData.address"
                type="text"
                placeholder="서울시 강남구"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              프로필 생성
            </button>
          </form>
        </div>

        <!-- 생성된 프로필 표시 -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">
            생성된 프로필
          </h2>

          <div v-if="createdProfile" class="space-y-4">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {{ createdProfile.getName().charAt(0) }}
                </div>
                <div class="ml-4">
                  <h3 class="text-2xl font-bold">{{ createdProfile.getName() }}</h3>
                  <p class="text-blue-100">나이: {{ createdProfile.getAge() }}세</p>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">이메일</p>
                  <p class="text-gray-800 font-medium">{{ createdProfile.getEmail() || '미입력' }}</p>
                </div>
              </div>

              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">전화번호</p>
                  <p class="text-gray-800 font-medium">{{ createdProfile.getPhone() || '미입력' }}</p>
                </div>
              </div>

              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">주소</p>
                  <p class="text-gray-800 font-medium">{{ createdProfile.getAddress() || '미입력' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12 text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p>프로필을 생성해주세요</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserProfile, UserProfileBuilder } from './UserProfileBuilder'

interface FormData {
  name: string
  age: number
  email: string
  phone: string
  address: string
}

const formData = ref<FormData>({
  name: '',
  age: 0,
  email: '',
  phone: '',
  address: '',
})

const createdProfile = ref<UserProfile | null>(null)

const createProfile = () => {
  const builder = new UserProfileBuilder()
  
  createdProfile.value = builder
    .setName(formData.value.name)
    .setAge(formData.value.age)
    .setEmail(formData.value.email)
    .setPhone(formData.value.phone)
    .setAddress(formData.value.address)
    .build()
}
</script>

