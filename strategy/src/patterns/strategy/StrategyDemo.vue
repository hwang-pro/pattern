<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">결제 시스템</h1>
        <p class="text-gray-600 mb-8">Strategy 패턴을 활용한 결제 시스템 데모</p>

        <!-- 결제 폼 -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">결제 정보 입력</h2>

          <!-- 결제 금액 입력 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              결제 금액 (원)
            </label>
            <input
              v-model.number="amount"
              type="number"
              min="1"
              placeholder="결제할 금액을 입력하세요"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- 결제 수단 선택 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              결제 수단 선택
            </label>
            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition"
                     :class="paymentMethod === 'credit' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="credit"
                  class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-3 text-gray-700 font-medium">신용카드</span>
              </label>

              <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition"
                     :class="paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="paypal"
                  class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-3 text-gray-700 font-medium">PayPal</span>
              </label>

              <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition"
                     :class="paymentMethod === 'crypto' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="crypto"
                  class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-3 text-gray-700 font-medium">암호화폐</span>
              </label>
            </div>
          </div>

          <!-- 동적 입력 폼 -->
          <div v-if="paymentMethod" class="mb-6">
            <div v-if="paymentMethod === 'credit'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  카드번호
                </label>
                <input
                  v-model="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  @input="formatCardNumber"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  v-model="cvv"
                  type="text"
                  placeholder="123"
                  maxlength="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div v-if="paymentMethod === 'paypal'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  이메일 주소
                </label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="user@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div v-if="paymentMethod === 'crypto'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  지갑 주소
                </label>
                <input
                  v-model="walletAddress"
                  type="text"
                  placeholder="0x1234567890abcdef..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <!-- 결제하기 버튼 -->
          <button
            @click="handlePayment"
            :disabled="!canPay"
            class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            결제하기
          </button>

          <!-- 에러 메시지 -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>
        </div>

        <!-- 결제 내역 리스트 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">결제 내역</h2>
          <div v-if="paymentHistory.length === 0" class="text-center py-12 text-gray-400">
            결제 내역이 없습니다.
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(payment, index) in paymentHistory"
              :key="index"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p class="text-gray-800 font-medium">{{ payment.message }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ payment.timestamp }}</p>
                </div>
                <span class="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  완료
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PaymentContext } from './PaymentContext';
import { CreditCardStrategy, PayPalStrategy, CryptoStrategy } from './PaymentStrategy';

// 상태 관리
const amount = ref<number>(0);
const paymentMethod = ref<'credit' | 'paypal' | 'crypto' | ''>('');
const cardNumber = ref('');
const cvv = ref('');
const email = ref('');
const walletAddress = ref('');
const error = ref('');
const paymentHistory = ref<Array<{ message: string; timestamp: string }>>([]);

// PaymentContext 인스턴스
const paymentContext = new PaymentContext();

// 카드번호 포맷팅
const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\s/g, '');
  if (value.length > 16) {
    value = value.slice(0, 16);
  }
  cardNumber.value = value.replace(/(.{4})/g, '$1 ').trim();
};

// 결제 가능 여부 확인
const canPay = computed(() => {
  if (!amount.value || amount.value <= 0) return false;
  if (!paymentMethod.value) return false;

  switch (paymentMethod.value) {
    case 'credit':
      return cardNumber.value.replace(/\s/g, '').length >= 16 && cvv.value.length >= 3;
    case 'paypal':
      return email.value.includes('@');
    case 'crypto':
      return walletAddress.value.length >= 10;
    default:
      return false;
  }
});

// 결제 처리
const handlePayment = () => {
  error.value = '';

  try {
    // 전략 설정
    switch (paymentMethod.value) {
      case 'credit':
        paymentContext.setStrategy(
          new CreditCardStrategy(cardNumber.value.replace(/\s/g, ''), cvv.value)
        );
        break;
      case 'paypal':
        paymentContext.setStrategy(new PayPalStrategy(email.value));
        break;
      case 'crypto':
        paymentContext.setStrategy(new CryptoStrategy(walletAddress.value));
        break;
      default:
        throw new Error('결제 수단을 선택해주세요.');
    }

    // 결제 실행
    const result = paymentContext.executePayment(amount.value);

    // 결제 내역에 추가
    paymentHistory.value.unshift({
      message: result,
      timestamp: new Date().toLocaleString('ko-KR')
    });

    // 폼 초기화
    resetForm();
  } catch (err) {
    error.value = err instanceof Error ? err.message : '결제 처리 중 오류가 발생했습니다.';
  }
};

// 폼 초기화
const resetForm = () => {
  amount.value = 0;
  cardNumber.value = '';
  cvv.value = '';
  email.value = '';
  walletAddress.value = '';
  error.value = '';
};
</script>

