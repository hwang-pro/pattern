import { PaymentStrategy } from './PaymentStrategy';

export class PaymentContext {
  private strategy: PaymentStrategy | null = null;

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  executePayment(amount: number): string {
    if (!this.strategy) {
      throw new Error('결제 수단을 선택해주세요.');
    }

    if (amount <= 0) {
      throw new Error('결제 금액은 0보다 커야 합니다.');
    }

    return this.strategy.pay(amount);
  }
}

