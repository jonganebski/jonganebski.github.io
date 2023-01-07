---
title:
  ko: 클린코드
  en: Clean Code
date: 2022-04-22
cover_image_url: https://imagedelivery.net/fOEhHq_KNsIgC-hb-3NU0w/ded7e3db-6930-4b13-6f7a-8e80560e0700/post
---

Photo by <a href="https://unsplash.com/@cedericvandenberghe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Cederic Vandenberghe</a> on <a href="https://unsplash.com/s/photos/castle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Unsplash</a>

<br/>

이 포스트는 노마드코더 개발자 북클럽 '클린코드'(3기) 챌린지를 진행하면서 작성됩니다.

[#노마드코더](https://nomadcoders.co/) [#노개북](https://nomadcoders.co/clean-code)

<ui-lazy-image src="https://imagedelivery.net/fOEhHq_KNsIgC-hb-3NU0w/f830767e-75ee-4c96-8603-967fcfbf2900/post" />

<md-ko>제목: 클린 코드: 에자일 소프트웨어 장인 정신 (8쇄)</md-ko>
<md-en>Title: Clean Code: A handbook of Agile Software Craftsmanship</md-en>
<md-ko>지은이: 로버트 C. 마틴</md-ko>
<md-en>Author: Robert C. Martin</md-en>
옮긴이: 박재호, 이해영  
펴낸이: 한기성  
펴낸곳: (주)도서출판인사이트

<h2 id="day2">2022-04-23</h2>

#### 📖 오늘 읽은 범위

추천사 ~ 1장.깨끗한 코드

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Bjarne Stroustrup, Clean Code (p.9)" colorScheme="emerald">나는 우아하고 효율적인 코드를 좋아한다. 의존성을 최대한 줄여야 유지보수가 쉬워진다. 오류는 명백한 전략에 의거해 철저히 처리한다. 성능을 최적으로 유지해야 사람들이 원칙 없는 최적화로 코드를 망치려는 유혹에 빠지지 않는다. 깨끗한 코드는 한 가지를 제대로 한다.</md-blockquote>

<md-blockquote from="Grady Booch, Clean Code (p.10)" colorScheme="emerald">깨끗한 코드는 단순하고 직접적이다. 깨끗한 코드는 잘 쓴 문장처럼 읽힌다. 깨끗한 코드는 결코 설계자의 의도를 숨기지 않는다. 오히려 명쾌한 추상화와 단순한 제어문으로 가득하다.</md-blockquote>

<md-blockquote from="Ron Jeffries, Clean Code (p.14)" colorScheme="emerald">중복 줄이기, 표현력 높이기, 초반부터 간단한 추상화 고려하기. 내게는 이 세가지가 깨끗한 코드를 만드는 비결이다.</md-blockquote>

<md-blockquote from="Clean Code (p.20)" colorScheme="emerald">"연습해, 연습!"</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

프로그래밍을 배울 때부터 귀에 박히도록 들어왔던 이야기들이다.  
그렇지만 듣거나 읽어서 아는 것과 그걸 실현하는 것은 전혀 다른 문제다.  
1장의 마지막 문장처럼 오로지 연습만이 이것을 가능하게 해 줄 것이다.

#### 🔍 궁금한 내용이 있거나, 잘 이해되지 않는 내용이 있다면 적어보세요.

1. `SRP: Single Responsibility Principle`  
   [위키피디아](https://en.wikipedia.org/wiki/Single-responsibility_principle)  
   [유튜브](https://www.youtube.com/watch?v=UQqY3_6Epbg)

2. `OCP: Open Closed Principle`  
   [위키피디아](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)  
   [유튜브](https://www.youtube.com/watch?v=-ptMtJAdj40)

3. `DIP: Dependency Inversion Principle`  
   [위키피디아](https://en.wikipedia.org/wiki/Dependency_inversion_principle)  
   [유튜브](https://www.youtube.com/watch?v=9oHY5TllWaU)

<h2 id="day3">2022-04-24</h2>

#### 📖 오늘 읽은 범위

2장.의미있는 이름

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p.22 ~ p.38)" colorScheme="emerald">1. 의도를 분명히 밝혀라<br/> 2. 그릇된 정보를 피하라<br/> 3. 의미있게 구분하라<br/> 4. 발음하기 쉬운 이름을 사용하라<br/> 5. 검색하기 쉬운 이름을 사용하라<br/> 6. 인코딩을 피하라 <br/> 7. 자신의 기억력을 자랑하지 마라 <br/> 8. 기발한 이름은 피하라 <br/> 9. 한 개념에 한 단어를 사용하라 <br/> 10. 말장난을 하지 마라 <br/> 11. 해법 영역에서 가져온 이름을 사용하라 <br/> 12. 문제 영역에서 가져온 이름을 사용하라 <br/> 13. 의미 있는 맥락을 추가하라 <br/> 14. 불필요한 맥락을 없애라<br/></md-blockquote>

<md-blockquote from="Clean Code (p.38)" colorScheme="emerald">좋은 이름을 선택하려면 설명 능력이 뛰어나야 하고 문화적인 배경이 같아야 한다. 이것이 제일 어렵다. 좋은 이름을 선택하는 능력은 기술, 비즈니스, 관리 문제가 아니라 교육 문제다.</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

1. 나도 작년까지는 `IInterfaceName`이나 `TTypeName`처럼 인코딩을 해서 이름을 지었었는데, 확실히 가독성을 떨어뜨린다. 그리고 인터페이스인지 타입인지는 IDE에서 충분히 알려준다. 그래서 이제는 인코딩을 피하고 있다. 하지만 올바른 이름을 짓는다는건 항상 어려운 문제다.

2. 이 블로그의 코드에도 약간 나만이 알 수 있는 이름을 쓴 경우가 있는데, 개인 프로젝트니까.. 라는 변명 아닌 변명을 해본다...

3. 메서드의 이름은 동사구로 시작하는게 적합하다고 개인적으로도 생각하지만, 그리 간단한 문제는 아닌 것 같다. 예를 들어,

   ```ts
   function filterPreviousPosts(post) {
     return new Date(post.date).getTime() < Date.now();
   }

   const prevPosts = posts.filter(filterPreviousPosts);
   ```

   ```ts
   function previousPosts(post) {
     return new Date(post.date).getTime() < Date.now();
   }

   const prevPosts = posts.filter(previousPosts);
   ```

   이렇게 함수형 프로그래밍을 적용할 때에는 함수명에 중복되는 filter를 없애고 싶어진다.

4. 나처럼 영어가 모국어가 아닌 외국인 개발자들과 일 할 기회가 있었다. 이름을 지을 때 문화적인 배경이 같아야 한다는 저자의 말에 공감한다. 우리는 서로가 고심해서 지은 이름들을 서로 직관적인 이름이 아니라고 생각했다. 모든 개발자들이 문화적인 배경이 같을 수는 없다. 하지만 그만큼 교육의 중요성이 커진다고 볼 수 있다.

<h2 id="day4">2022-04-25</h2>

#### Mission: 나의 최애 북틸

1. [TIL 2장 의미있는 이름 by cule님](https://nomadcoders.co/community/thread/4528)

   기억하고 싶은 내용과 소감이 잘 축약돼 있다. 내가 느낀 바와도 와 닿아서 마음에 든다.

2. [TIL 2일차. 의미 있는 이름 by hsko0926님](https://blog.naver.com/narnia0926/222710358559)

   각 소제목을 캐치한 것이 좋다. 그리고 거기에 짤막한 예시까지 더해 이해를 높인다.

3. [TID day2.의미있는 이름 by amykim4229님](https://nomadcoders.co/community/thread/4486)

   `명확한 의도를 위한 이름이 길어지면 가독성이 떨어지는데 어느 단어로 구성하는 것이 적절할까 궁금하다` &rarr; 이 부분 저도 공감합니다... 저는 이름이 길어지면 이것저것 바꿔보면서(의미를 해치지 않는 선에서) 더 이뻐보이는걸 선택합니다. 이뻐 보인다는 표현이 좀 적절하지 않을 수 있지만, 이쁜 글자가 더 잘 읽히는 것 같습니다. 반대로 잘 읽히니깐 이뻐 보이는 걸지도? 뭔가 좌우 위아래 밸런스가 맞으면서 정갈해보이는 그런 이름이요. 물론 못 찾으면 어쩔 수 없지만요... 😇

<h2 id="day5">2022-04-26</h2>

#### 📖 오늘 읽은 범위

3장.함수

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p.42 ~ p.60)" colorScheme="emerald">1. 작게 만들어라!<br/> 2. 한 가지만 해라!<br/> 3. 함수 당 추상화 수준은 하나로!<br/> 4. 서술적인 이름을 사용하라<br/> 5. 부수 효과를 일으키지 마라!<br/> 6. 명령과 조회를 분리하라!<br/> 7. 오류 코드보다 예외를 사용하라!<br/> 8. 반복하지 마라!</md-blockquote>

<md-blockquote from="Clean Code (p.45 ~ p.46)" colorScheme="emerald">함수가 확실히 '한 가지' 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 한다. ... 한 함수 내에 추상화 수준을 섞으면 코드를 읽는 사람이 헷갈린다. 특정 표현이 근본 개념인지 아니면 세부사항인지 구분하기 어려운 탓이다.</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

이 챕터를 읽으면서 양심이 찔리는 부분은 함수 내 모든 문장의 추상화 수준이 동일해야 한다는 것과 부수 효과를 일으키지 말아야 한다고 히는 부분이다. 그리고 개인적으로는 가장 지키기 어려운 부분들이다. 하지만 내가 불가능하다고 생각하더라도 이 원칙들을 지키면서 코드를 짤 수 있는 방법이 거의 대부분 존재하더라. 더 많은 고민과 연습이 필요하다.

<h2 id="day7">2022-04-28</h2>

#### 📖 오늘 읽은 범위

4장.주석

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p.68)" colorScheme="emerald">우리는 코드로 의도를 표현하지 못해, 그러니까 실패를 만회하기 위해 주석을 사용한다.</md-blockquote>

<md-blockquote from="Clean Code (p.70 ~ p.75)" colorScheme="emerald">**- 좋은 주석 -**<br/><br/>1. 법적인 주석<br/>2. 정보를 제공하는 주석<br/>3. 의도를 설명하는 주석<br/>4. 의미를 명료하게 밝히는 주석<br/>5. 결과를 경고하는 주석<br/>6. TODO 주석<br/>7. 중요성을 강조하는 주석</md-blockquote>

<md-blockquote from="Clean Code (p.75 ~ p.94)" colorScheme="emerald">**- 나쁜 주석 -**<br/><br/>1. 주절거리는 주석<br/>2. 같은 이야기를 반복하는 주석<br/>3. 오해할 여지가 있는 주석<br/>4. 의무적으로 다는 주석<br/>5. 이력을 기록하는 주석<br/>6. 있으나 마나 한 주석<br/>7. 무서운 잡음<br/>8. 함수나 변수로 표현할 수 있다면 주석을 달지 마라<br/>9. 닫는 괄호에 다는 주석<br/>10. 공로를 돌리거나 저자를 표시하는 주석<br/>11. 주석으로 처리한 코드<br/>12. HTML 주석<br/>13. 전역 정보 <br/>14. 너무나 많은 정보<br/>15. 모호한 관계<br/>16.함수 헤더<br/>17. 비공개 코드에서 Javadocs</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

저자가 코드를 다는 것은 실패를 만회하기 위한 것일 뿐이라고 이야기한다. 이 부분은 혹시 나쁜 주석을 그만큼 크게 경계하기에 좀 과장해서 이야기 한 것은 아닐까 하는 생각이 든다. 하지만 분명 나쁜 주석의 예로 나온 것들 모두 공감한다.

나는 주석을 달지 않는 편이었지만, Jsdoc과 Rust를 접하면서 주석을 다는데에 재미가 붙었다. Vscode에서 마우스만 올리면 사용 예시까지 나오는 Rust가 매우 신선했기 때문이다. 이 블로그의 코드에도 나름 주석을 잘 달아보려고 했다. 하지만 실제로 코드를 수정하고는 관련 주석은 수정하지 않아서 나중에 주석만 따로 수정하는 커밋을 작성한 경우도 있었다. 이런 주석이 수정되지 않고 계속 남아있다면 오히려 개발자에게 혼돈만 주겠지.

#### 🔍 궁금한 내용이 있거나, 잘 이해되지 않는 내용이 있다면 적어보세요.

책에 나오지 않은 사례로, 나는 이런 주석을 사용하곤 한다.

이건 좋은 사례에 들어갈까? 아니면 나쁜 사례에 들어갈까?

```ts
/*
|--------------------------------------------
| Types
|--------------------------------------------
*/

type UnionType = 'this' | 'is' | 'only' | 'example';

interface SomeResponse {
   ...
};

/*
|--------------------------------------------
| Constants
|--------------------------------------------
*/

const A = 'A';

const B = 'B';

/*
|--------------------------------------------
| Helper Functions
|--------------------------------------------
*/

function handlerA (){
   ...
}

function handlerB (){
   ...
}

/*
|--------------------------------------------
| MAIN FUNCTION
|--------------------------------------------
*/

export function useExample (){
   ...
}

```

파일을 나누는 것 보다 이렇게 하나의 파일 안에서 카테고리로 표시하는게 더 나은 경우가 있다. 이 아이디어는 이전 회사에서 Laravel 코드를 보다가 얻었다. 물론 파일의 크기가 커지면 적절히 나누는게 필요할 것이다.

하지만 3장 함수에서 말한 것처럼 MAIN FUNCTION 내에서 동일한 추상화를 구현하다 보면 여러개의 Helper Function들을 만들게 된다. 내가 보기엔 이 함수들을 다른 파일에 선언하는 것보다는 이 방법이 서로의 연관성을 더 잘 나타내는 것 같다. 그런데 이건 노트북 화면 하나로만 개발하던 내 버릇 때문에 그런 걸수도 있다. 파일이 많아지면 좁은 화면 때문에 힘들어서...

<h2 id="day11">2022-05-02</h2>

#### 📖 오늘 읽은 범위

5장.형식 맞추기

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p.98)" colorScheme="emerald">소스 파일도 신문 기사와 비슷하게 작성한다. 이름은 간단하면서도 설명이 가능하게 짓는다. 이름만 보고도 올바른 모듈을 살펴보고 있는지 아닌지를 판단할 정도로 신경써서 짓는다.</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

한 번은 컴포넌트를 전혀 나누지 않은 프로젝트를 이어 받아서 진행한 경험이 있다. 단 하나의 파일에 여러가지 기능을 수행하는 코드들이 난잡하게 뒤섞여 있었다. 심지어 스타일까지. (+Javascript ^^) 2,000 줄이 넘어가는 코드를 위아래로 왔다갔다 하다가 결국은 내가 무엇을 찾으려 했던 건지도 잊어버렸다. 그 코드를 보면서 나는 정말 이렇게 코드를 짜지 말아야겠다고 마음 먹었다. 나는 내 코드가 다른 개발자가 이어받았을 때 읽어내려가는데 큰 허들이 없기를 바란다.

<h2 id="day14">2022-05-05</h2>

#### 📖 오늘 읽은 범위

7장. 오류처리

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p.130)" colorScheme="emerald">오류 처리는 중요하다. 하지만 오류 처리 코드로 인해 프로그램 논리를 이해하기 어려워진다면 깨끗한 코드라 부르기 어렵다.</md-blockquote>

<md-blockquote from="Clean Code (p.142)" colorScheme="emerald">오류 처리를 프로그램 논리와 분리하면 독립적인 추론이 가능해지며 코드 유지보수성도 크게 높아진다.</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

책을 읽고 평소에 굼금하던 바를 MDN에서 검색해 봤다. MDN에 의하면 에러의 종류는 다음과 같다. [링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

#### Error types

Besides the generic Error constructor, there are other core error constructors in JavaScript. For client-side exceptions, see Exception handling statements.

1. EvalError

   Creates an instance representing an error that occurs regarding the global function eval().

2. RangeError

   Creates an instance representing an error that occurs when a numeric variable or parameter is outside of its valid range.

3. ReferenceError

   Creates an instance representing an error that occurs when de-referencing an invalid reference.

4. SyntaxError

   Creates an instance representing a syntax error.

5. TypeError

   Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.

6. URIError

   Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters.

7. AggregateError

   Creates an instance representing several errors wrapped in a single error when multiple errors need to be reported by an operation, for example by Promise.any().

8. InternalError (Non-Standard)

   Creates an instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g. "too much recursion".

그래서 에러 핸들링이 다음과 같이 가능하다. 이럴 경우 unknown이던 에러의 타입이 정해지면서 `error.name`, `error.message`, `error.cause`, `error.stack`등에 접근이 가능해진다.

```ts
function example() {
  try {
    throw new TypeError('Hello Error!');
  } catch (error) {
    if (error instanceof TypeError) {
      console.error(error.message); // Hello Error 출력
    } else if (error instanceof RangeError) {
      console.error(error.message);
    }
    // ...
  }
}
```

만약 어떤 종류의 에러인지는 상관없고, 타입 지원을 받고 싶다면 아래처럼 하면 가능하다.

```ts
function example() {
  try {
    throw new SyntaxError('Hello Error!');
  } catch (error) {
    if (!(error instanceof Error)) return;
    // 타입 지원을 받게 된다.
    console.log(error.message); //  Hello Error 출력
    console.log(error.name); //  SyntaxError 출력
}
```

#### 🔍 궁금한 내용이 있거나, 잘 이해되지 않는 내용이 있다면 적어보세요.

그런데 자바스크립트에서는 저 타입들을 고려하면서 에러 핸들링을 하는 것을 거의 본 적이 없다.

그 이유가 무엇일까? 굳이 저럴 필요가 없기 때문일까?

<h2 id="day16">2022-05-07</h2>

#### 📖 오늘 읽은 범위

9장. 단위 테스트

#### 😀 책에서 기억하고 싶은 내용을 써보세요.

<md-blockquote from="Clean Code (p. 167 ~ 168)" colorScheme="emerald">F.I.R.S.T<br/><br/>Fast, Independent, Repeatable, Self-Validating, Timely</md-blockquote>

#### 🤔 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

나에게 TDD를 적용한다는건 아직까지도 큰 과제로 남아있다. F.I.R.S.T 원칙에서 특히 눈에 띄 건 Timely(적시성)이다. 실제 코드를 먼저 작성했더니 테스트에 에로사항이 많아서 결국 테스트하기 좋도록 파일구조를 바꾸는게 거의 루틴화 돼 있다. 흠, 그렇다면 테스트 코드를 먼저 짜면 되겠구나! 했지만 나의 테스트 코드 작성 능력이 그에 미치지 못하는 관계로... ㅠㅠ

#### 🔍 궁금한 내용이 있거나, 잘 이해되지 않는 내용이 있다면 적어보세요.

요즘은 테스트의 종류도 다양해 진 것 같다. 일단 내가 경험해 본 테스트들은

1. Cypress로 E2E Test
2. Cypress로 Component Test
3. Jest로 Unit Test
4. Vitest로 Unit Test

가 있다. 개인적으로는 프론트엔드 작업을 할 때 Cypress로 E2E Test를 작성하고 나서 해당 페이지를 만드는게 가장 쉬웠다. 그리고 한 페이지를 관통하는 테스트다 보니 파일 구조를 변경한다거나 뭔가 수정을 가한다던가 할 때에도 테스트 파일을 건들 일이 별로 없다.

하지만 복잡한 페이지는 고려해야 할 것들이 너무 많아서 실제 코드를 작성하다가도 테스트 코드를 수정하는 일이 잦다. 그리고 지금 회사에서는 웹뷰를 사용하고 있는데, Cypress로 유의미한 테스트를 돌릴 수 있을까 하는 의문도 있다. 다른 개발자들은 어떤 테스트로 TDD를 하는지(아마 unit test라 생각하지만), 그리고 다양해진 테스트들 중 어디까지 취하는 것이 효율적이라고 생각하는지 등등이 궁금하다.
