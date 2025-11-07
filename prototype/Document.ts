// Document 인터페이스
export interface Document {
  title: string
  content: string
  metadata: Record<string, any>
  clone(): Document
}

// ConcreteDocument 클래스 - Prototype 패턴 구현
export class ConcreteDocument implements Document {
  public title: string
  public content: string
  public metadata: Record<string, any>

  constructor(
    title: string = '',
    content: string = '',
    metadata: Record<string, any> = {}
  ) {
    this.title = title
    this.content = content
    this.metadata = metadata
  }

  // 깊은 복사를 수행하는 clone 메서드
  clone(): Document {
    // metadata도 깊은 복사
    const clonedMetadata = JSON.parse(JSON.stringify(this.metadata))
    
    return new ConcreteDocument(
      this.title,
      this.content,
      clonedMetadata
    )
  }

  // 편의 메서드: 문서 정보를 문자열로 반환
  toString(): string {
    return `제목: ${this.title}\n내용: ${this.content}\n메타데이터: ${JSON.stringify(this.metadata, null, 2)}`
  }
}

// 문서 템플릿 팩토리
export class DocumentTemplateFactory {
  static createReportTemplate(): ConcreteDocument {
    return new ConcreteDocument(
      '월간 보고서',
      '이번 달 주요 성과:\n\n1. 프로젝트 완료율: 95%\n2. 매출 증가율: 15%\n3. 고객 만족도: 4.5/5.0',
      {
        type: '보고서',
        author: '관리자',
        date: new Date().toISOString(),
        status: '초안'
      }
    )
  }

  static createEmailTemplate(): ConcreteDocument {
    return new ConcreteDocument(
      '회의 안내 이메일',
      '안녕하세요,\n\n다음 주 월요일 오후 2시에 팀 회의가 예정되어 있습니다.\n\n주제: 프로젝트 진행 상황 공유\n장소: 회의실 A\n\n참석 부탁드립니다.',
      {
        type: '이메일',
        recipient: '팀원 전체',
        priority: '보통',
        date: new Date().toISOString()
      }
    )
  }

  static createMemoTemplate(): ConcreteDocument {
    return new ConcreteDocument(
      '오늘의 메모',
      '- 오전: 클라이언트 미팅\n- 오후: 코드 리뷰\n- 저녁: 문서 작성\n\n중요 사항:\n✓ 다음 주까지 제출할 보고서 준비\n✓ 신규 프로젝트 계획 수립',
      {
        type: '메모',
        category: '일정',
        tags: ['업무', '중요'],
        date: new Date().toISOString()
      }
    )
  }
}


