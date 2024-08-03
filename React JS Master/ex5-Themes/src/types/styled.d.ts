// TypeScript 프로젝트에서 styled-components의 기본 테마 인터페이스를 사용자 정의 속성으로 확장

// TypeScript 컴파일러가 styled-components가 제공하는 타입과 인터페이스를 이해할 수 있도록 하기 위함
import "styled-components";

// TypeScript 모듈 선언을 엽니다. 모듈 선언은 기존 모듈의 타입을 확장하거나 수정할 때 사용
declare module "styled-components" {
  // 모듈 선언 내부에서 이 코드는 DefaultTheme 인터페이스를 확장
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor?: string;
  }
}
