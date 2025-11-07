// PaymentStrategy 인터페이스
export interface PaymentStrategy {
  pay(amount: number): string;
}

// CreditCardStrategy - 카드번호와 CVV 필요
export class CreditCardStrategy implements PaymentStrategy {
  constructor(
    private cardNumber: string,
    private cvv: string
  ) {}

  pay(amount: number): string {
    // 카드번호와 CVV 검증 (간단한 예시)
    if (!this.cardNumber || this.cardNumber.length < 16) {
      throw new Error('유효하지 않은 카드번호입니다.');
    }
    if (!this.cvv || this.cvv.length < 3) {
      throw new Error('유효하지 않은 CVV입니다.');
    }

    return `신용카드 결제 완료: ${amount.toLocaleString()}원 (카드번호: ${this.cardNumber.slice(-4)}****)`;
  }
}

// PayPalStrategy - 이메일 필요
export class PayPalStrategy implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    // 이메일 검증 (간단한 예시)
    if (!this.email || !this.email.includes('@')) {
      throw new Error('유효하지 않은 이메일 주소입니다.');
    }

    return `PayPal 결제 완료: ${amount.toLocaleString()}원 (이메일: ${this.email})`;
  }
}

// CryptoStrategy - 지갑 주소 필요
export class CryptoStrategy implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): string {
    // 지갑 주소 검증 (간단한 예시)
    if (!this.walletAddress || this.walletAddress.length < 10) {
      throw new Error('유효하지 않은 지갑 주소입니다.');
    }

    return `암호화폐 결제 완료: ${amount.toLocaleString()}원 (지갑: ${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)})`;
  }
}

