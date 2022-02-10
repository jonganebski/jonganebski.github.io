---
title: Event Listener에 대한 탐구
date: 2021-04-19
coverUrl: https://images.unsplash.com/photo-1595984300393-017f4108f886?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80
---

<span class="photo-reference">Photo by <a href="https://unsplash.com/@anspchee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Al Soot</a> on <a href="https://unsplash.com/s/photos/bubble?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>

addEventListner. 자바스크립트를 쓰는 이상 굉장히 많이 사용하게 된다. 하지만 평소에는 별 다른 생각없이 지나치게 되는 특징들을 정리해 보고자 한다.

## Bubbling & Capturing

내 기준에서는 Bubbling과 Capturing이 가장 생소한 것 같다. 물론 알고는 있었지만, 평소에 별 신경을 쓰지 않아서 기억의 저편으로 사라지다가 다시 불러오는 걸 반복하게 된다.

```html
<body>
  <article>
    <section>
      <h3></h3>
    </section>
  </article>
  <script>
    const article = document.querySelector('article');
    const section = document.querySelector('section');
    const h3 = document.querySelector('h3');

    article.addEventListener('click', () => console.log('Article'));
    section.addEventListener('click', () => console.log('Section'));
    h3.addEventListener('click', () => console.log('H3'));
  </script>
</body>
```

위의 사례가 가장 기본적으로 이벤트리스너를 사용하는 방식일 것이다. 여기서 console.log가 되는 순서는 다음과 같다.

h3를 클릭했을 때: H3 &rarr; Section &rarr; Article

이렇게 이벤트리스너는 해당 엘리먼트에서 부모 엘리먼트로 올라가면서 차례로 이벤트리스너를 실행한다. 이것을 Bubbling이라고 하며, 이벤트리스너의 기본적인 동작이다.

```html
<body>
  <article>
    <section>
      <h3></h3>
    </section>
  </article>
  <script>
    const article = document.querySelector('article');
    const section = document.querySelector('section');
    const heading = document.querySelector('h3');

    article.addEventListener('click', () => console.log('Article'), {
      capture: true, // 이 부분 추가
    });
    section.addEventListener('click', () => console.log('Section'));
    heading.addEventListener('click', () => console.log('H3'));
  </script>
</body>
```

article에 capture: true로 설정한다면 위에서 본 순서에 변화가 생긴다.

h3를 클릭했을 때: Article &rarr; H3 &rarr; Section

이렇게 capture가 true로 설정된 이벤트부터 발생하게 된다. 좀 더 다양하게 이벤트리스너를 만들어보자.

```html
<body>
  <article>
    <section>
      <h3></h3>
    </section>
  </article>
  <script>
    const article = document.querySelector('article');
    const section = document.querySelector('section');
    const heading = document.querySelector('h3');
    // 복잡하지 않다. 단순히 각 엘리먼트에 capture: true인 이벤트만 추가했다.
    article.addEventListener('click', () => console.log('Article'));
    article.addEventListener('click', () => console.log('Capture Article'), {
      capture: true,
    });
    section.addEventListener('click', () => console.log('Section'));
    section.addEventListener('click', () => console.log('Capture Section'), {
      capture: true,
    });
    heading.addEventListener('click', () => console.log('H3'));
    heading.addEventListener('click', () => console.log('Capture H3'), {
      capture: true,
    });
  </script>
</body>
```

이 때 똑같이 h3를 클릭하면 다음 같은 순서로 실행된다.

h3를 클릭했을 때: Capture Article &rarr; Capture Section &rarr; Capture H3 &rarr; H3 &rarr; Section &rarr; Article

capture: true 이벤트가 내림차순으로 실행되고, 그 다음에 capture: false 이벤트가 오름차순으로 실행된다.

## Stop Propagation

위에서 본 Bubbling과 Capturing의 순차적인 실행을 끊을 수도 있다. 이 때 사용되는 것이 stopPropagation()이다. 다른 이벤트리스너가 실행되는 걸 바라지 않을 때 유용하다.

h3를 클릭:

stopPropagation()없을 때: Capture Article &rarr; Capture Section &rarr; Capture H3 &rarr; H3 &rarr; Section &rarr; Article

Capture Section에 stopPropagation(): Capture Article &rarr; Capture Section

Section에 stopPropagation(): Capture Article &rarr; Capture Section &rarr; Capture H3 &rarr; H3 &rarr; Section

```js
...
section.addEventListener("click", e => {
  e.stopPropagation()
  console.log("Section")
})
...
```

## Once

이벤트가 1번만 실행되도록 한다. 간단한 사용법만 보고 넘어가자.

```js
section.addEventListener('click', () => console.log('Section'), { once: true });
```

## Target & Current Target

단순한 이벤트리스너를 만들 때에는 둘의 차이를 느끼지 힘들지만 둘은 엄연히 다르다. 먼저 핵심을 요약하자면, `currentTarget은 해당 이벤트리스너가 부여된 엘리먼트(자기자신)`를 가리키며, `target은 이벤트 버블링의 최하위 엘리먼트`를 가리킨다. 처음의 간단한 코드로 돌아가서 살펴보자.

```html
<body>
  <article>
    <section>
      <h3></h3>
    </section>
  </article>
  <script>
    const article = document.querySelector('article');
    const section = document.querySelector('section');
    const h3 = document.querySelector('h3');
    // h3를 클릭했을 때
    article.addEventListener('click', (e) => {
      console.log('currentTarget: ', e.currentTarget); // article
      console.log('target: ', e.target); // h3
    });
    section.addEventListener('click', (e) => {
      console.log('currentTarget: ', e.currentTarget); // section
      console.log('target: ', e.target); // h3
    });
    h3.addEventListener('click', (e) => {
      console.log('currentTarget: ', e.currentTarget); // h3
      console.log('target: ', e.target); // h3
    });
  </script>
</body>
```

일단 버블링 순서를 다시 한 번 확인하자.

h3를 클릭했을 때: H3 &rarr; Section &rarr; Article

이렇게 h3를 클릭했을 때,

h3의 currentTarget 은 h3 자신이며, target은 h3다. (currentTarget과 target이 일치한다)

section의 currentTarget은 section 자신이며, target은 h3다.

article의 currentTarget은 article 자신이며, target은 h3다.

### 또 다른 차이점

```html
<body>
  <div>
    <input type="text" />
  </div>
  <script>
    const input = document.querySelector('input');
    let timeoutId = 0;
    input.addEventListener('input', (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log(e.currentTarget); // null
        console.log(e.target); // <input type="text">
      }, 1000);
    });
  </script>
</body>
```

위에서처럼 setTimeout으로 시간차를 두고 currentTarget에 접근하면 currentTarget은 null이 나온다. MDN에서는 이렇게 설명하고 있다. The value of event.currentTarget is only available while the event is being handled.(currentTarget은 이벤트가 다뤄지는 시점에서만 사용 가능하다라고 번역할 수 있겠다). 'being handled'를 '다뤄지는 시점'이라고해서 좀 이상하게 느껴지지만, 뒤이은 설명을 참고해서 이해해 본다면, 오직 직접 `event.currentTarget`으로 `이벤트 시점에` 접근해야만 사용이 가능하다는 뜻으로 보인다.  
아래처럼 이벤트 객체를 console.log하면 currentTarget은 null이며, event.currentTarget을 console.log해야만 엘리먼트가 제대로 표시된다.

```html
<body>
  <div>
    <input type="text" />
  </div>
  <script>
    const input = document.querySelector('input');
    let timeoutId = 0;
    input.addEventListener('input', (e) => {
      console.log(e); // {..., currentTarget: null, ...}
      console.log(e.currentTarget); // <input type="text">
    });
  </script>
</body>
```

그러므로 아래처럼 이벤트 시점에 let으로 currentTarget을 저장해놔야 setTimeout에서도 접근이 가능해진다.(target과 currentTarget이 동일하다면 그냥 target을 쓰면 되겠다.)

```html
<body>
  <div>
    <input type="text" />
  </div>
  <script>
    const input = document.querySelector('input');
    let timeoutId = 0;
    let currentTarget = ''; // 추가된 부분
    input.addEventListener('input', (e) => {
      clearTimeout(timeoutId);
      currentTarget = e.currentTarget; // 추가된 부분
      timeoutId = setTimeout(() => {
        console.log(currentTarget); // <input type="text">
      }, 1000);
    });
  </script>
</body>
```

---

참고자료  
<a href="https://www.youtube.com/watch?v=SqQZ8SttQsI" target="_blank">https://www.youtube.com/watch?v=SqQZ8SttQsI</a>  
<a href="https://www.youtube.com/watch?v=XF1_MlZ5l6M" target="_blank">https://www.youtube.com/watch?v=XF1_MlZ5l6M</a>
