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

<ui-lazy-image cfId="f830767e-75ee-4c96-8603-967fcfbf2900" />

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