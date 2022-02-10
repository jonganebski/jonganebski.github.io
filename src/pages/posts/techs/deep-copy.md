---
title: 객체를 복사하는 방법, JSON.parse(JSON.stringify(Object)) vs 깊은 복사
date: 2021-02-15
cover_image_url: https://images.unsplash.com/flagged/photo-1582733265415-a0740c8a82fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80
---

<span class="photo-reference">Photo by <a href="https://unsplash.com/@seimesa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Mario Mesaglio</a> on <a href="https://unsplash.com/s/photos/recursive?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></span>

## 왜 이러지??

```js
const test = [1, 2, 3, 4, 5];

const copied = test;

test.pop();

console.log(copied);
// 기대한 copied의 값
// [1, 2, 3, 4, 5]
// 출력되는 copied의 값
// [1, 2, 3, 4]
```

copied는 건들지 않고 test에만 변형을 가했지만 copied에도 그 영향이 미쳤다. 이걸 설명하기 위해서는 `기본형 타입(Primitive Type)`과 `참조형 타입(Reference Type)`의 차이와 주소값에 대한 설명이 필요하지만 이건 나중에 따로 다루겠다. 일단은 자바스크립트에서 배열(Array)은 참조형 타입이고, 참조형 타입은 기본형 타입인 문자열(string)이나 숫자(number)등을 복사하듯이 해서는 복사가 제대로 이뤄지지 않는다는 것만 알면 되겠다. 배열 외에도 참조형 타입에는 Object, Function, Date, RegExp, Map, WeakMap, Set, WeakSet 등이 있다.

위의 test같은 1차원 배열은 `얕은 복사`로 복사할 수 있다. 쉽게 말하면 배열 안에 있는 숫자들은 기본형 타입이니 그 단계로 한 단계 내려가 숫자들을 직접 복사하는 것이다.

```js
const test = [1, 2, 3, 4, 5];
const copied = [];

for (let i = 0; i < test.length; i++) {
	const copiedNumber = test[i]; // 기본형 타입의 복사
	copied.push(copiedNumber);
}

test.pop();
console.log(copied);
// 기대한 copied의 값
// [1, 2, 3, 4, 5]
// 출력되는 copied의 값
// [1, 2, 3, 4, 5]
// 이제 test.pop()의 효과를 copied가 받지 않는다.
```

얕은 복사에는 많은 방법이 있다. 위에서처럼 for loop를 사용한 것은 기본형 타입이 복사되는 것을 보여주기 위함이었고, 다음과 같은 방법들이 있다.

```js
const copied = [...test];
// or
const copied = test.slice();
// or
const copied = test.map((num) => num);
// or
const copied = test.filter(() => true);
// 등등...
```

slice, map, filter등의 메소드는 새로운 배열을 리턴한다는 성질을 이용한 것인데, 사실 복사만 하려고 이 메소드들을 사용하는 일은 드물다. (그나마 slice정도...)

그러면 2차원 배열은 어떨까? 아쉽게도 얕은 복사로는 복사가 되지 않는다. 한 단계 아래로 내려가서 복사를 하더라도 그 한 단계 아래에 있는 것이 또 배열이기 때문에 맨 처음에 언급한 문제가 반복된다.

```js
const nested = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const copied = [];

for (let i = 0; i < nested.length; i++) {
	const copiedNumber = nested[i];
	copied.push(copiedNumber);
}

nested.pop();
console.log(copied);
// 기대한 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// 출력되는 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// 응? 괜찮은거 아닌가? 싶지만...
nested[2].pop();
console.log(copied);
// 기대한 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// 출력되는 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8],
// ];
// 가장 안쪽을 건들면 또다시 copied가 영향을 받는다.
```

해결법은 한 단계 더 들어가서 복사하는 것이다. 다이브를 두 번 해보자.

```js
const nested = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const copied = [];

for (let i = 0; i < nested.length; i++) {
	const deep1 = [];
	for (let j = 0; j < nested[i].length; j++) {
		const copiedNumber = nested[i][j]; // 기본형 타입의 복사
		deep1.push(copiedNumber);
	}
	copied.push(deep1);
}

nested[2].pop();
console.log(copied);
// 기대한 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// 출력되는 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
```

위에 소개한 방법들을 따르다면 이렇게 되겠다.

```js
const copied = [[...nested[0]], [...nested[1]], [...nested[2]]];
// or
const copied = [nested[0].slice(), nested[1].slice(), nested[2].slice()];
// ... 그만하자. 사실 아무도 이렇게 하지 않는다.
const nested = [
	[1, 2, 3],
	[1, 2, 3, [4, 5, 6]],
	[1, 2, 3, [4, 5, 6, [7, 8, 9]]],
	{ name: 'Jon', age: 5, friends: ['Roberto', 'Dominik', 'Gasai Yuno'] },
	[1, 2, 3, [4, 5, 6, [7, 8, 9]]],
	[1, 2, 3, [4, 5, 6]],
	[1, 2, 3],
];
// 이런건 어떻게 하려고...
```

이렇게 (기본형 타입이 있는 단계까지) 여러 단계 아래로 내려가 복사해 오는 것을 `깊은 복사`라고 한다. 여러 층으로 된 참조형 타입은 깊은 복사를 해야만 제대로 복사가 된다. 그런데 여기서 자주 언급되는 치트방법이 있는데 바로 `JSON.parse()`와 `JSON.stringify()`를 사용하는 것이다.

## JSON.parse(JSON.stringify())

### 장점

간편하다.

```js
const nested = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

const copied = JSON.parse(JSON.stringify(nested));

nested[2].pop();
console.log(copied);
// 기대한 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// 출력되는 copied의 값
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
```

깊은 복사를 하는 대신에 객체 자체를 JSON문자열로 바꿨다(stringify)가 다시 객체로 해석(parse)하게끔 하는 방법이다. JSON문자열로 바뀌면서 기존에 있던 주소값들은 전혀 상관이 없게 되고, 이걸 해석할 때 완전히 새로운 주소들에 써진 객체가 된다. 어떻게 보면 인간이 하는 사고방식과 가장 유사한 방법이다.

### 단점

문제는 장점에 비해 단점이 치명적이라는 것이다.

1. 데이터의 종류에 따라서는 손실 또는 변형될 수 있다.
2. 이 가능성을 에러 메시지나 경고 메시지 등으로 전혀 알려주지 않는다.

예시인 nested를 조금 바꿔서 해보자.

```js
const nested = {
	name: undefined,
	sayHello: () => console.log('Hello!'),
};

const copied = JSON.parse(JSON.stringify(nested));

console.log(copied);
// 기대한 copied의 값
// {
//   name: undefined,
//   sayHello: () => console.log("Hello!")
// };
// 출력되는 copied의 값
// {}
```

아무런 언급도 없이 값들이 그냥 사라져버렸다. 이런 반응을 보이는 데이터 종류에는 위에서 쓴 undefined나 함수, 그리고 Date 객체, Symbol() 등이 있고, NaN이나 Infinity같은 경우에는 null로 바꿔버린다.

JSON.parse(JSON.stringify())는 간편하기는 하지만 결코 추천할 수 없는 방법이다.

## 깊은 복사(Recursive)

자, 그럼 남은 선택지는 깊은 복사를 하는 것 뿐이다. 10중 배열이건 100중 객체건 기본형 타입이 있는 곳까지 내려가 복사를 해오는 것이다. 하지만 우리가 직접 할 필요는 없다. Javascript에게 일을 시켜보자. 일단 배열일 때만 쓸 수 있는 함수를 만들어 봤다.

```js
const nested = [
  [1, 2, 3],
  [1, 2, 3, [4, 5, 6]],
  [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
  [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
  [1, 2, 3, [4, 5, 6]],
  [1, 2, 3],
]

const deepCopy = (targetElement) => {
  if (!Array.isArray(targetElement)) {
    return targetElement
  }
  const returnArray[] = []

  for (let i = 0; i < targetElement.length; i++) {
    const element = targetElement[i]
    const returnElement = deepCopy(element) // recursive!
    returnArray.push(returnElement)
  }

  return returnArray
}

const copied = deepCopy(nested)

nested[2][3][3].pop()
console.log(copied)
// 기대한 값
// [
//   [1, 2, 3],
//   [1, 2, 3, [4, 5, 6]],
//   [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
//   [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
//   [1, 2, 3, [4, 5, 6]],
//   [1, 2, 3],
// ];
// 출력되는 값
// [
//   [1, 2, 3],
//   [1, 2, 3, [4, 5, 6]],
//   [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
//   [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
//   [1, 2, 3, [4, 5, 6]],
//   [1, 2, 3],
// ];
// nested의 변화에 영향을 받지 않음.
// 제대로 복사가 됨.
```

`deepCopy`함수에서 재밌는 점은 deepCopy함수 내에서 또다시 deepCopy함수를 쓰고 있다는 것이다. 이런 함수를 `Recursive` 함수라고 부르며, 깊은 배열이나 객체 안으로 자바스크립트를 보낼 수 있게 하는 방법이다.

쉬운 예시를 들어보자.

```js
const prison = [[[[[[[[[['Matt Damon']]]]]]]]]];
```

언제나 그렇듯이 맷 데이먼이 10중 감옥에 갇혀 구출을 기다리고 있다. 하지만 우리의 자바스크립트는 구출 대신 복사를 해 올 것이다.

```js
const deepCopy = (targetElement) => {
  if (!Array.isArray(targetElement)) {
    return targetElement
  }
  const returnArray[] = []

  for (let i = 0; i < targetElement.length; i++) {
    const element = targetElement[i]
    const returnElement = deepCopy(element)
    returnArray.push(returnElement)
  }

  return returnArray
}

const copied = deepCopy(prison);

prison[0][0][0][0][0][0][0][0][0].pop();

console.log(prison);
// [[[[[[[[[[]]]]]]]]]]

console.log(copied);
// [[[[[[[[[["Matt Damon"]]]]]]]]]]
// prison 배열의 변화에 영향을 받지 않음
// 즉 제대로 복사되어 서로 완전히 다른 배열이 됨
```

첫 번째 for loop는 10중 감옥과 마주치고 deepCopy함수를 다시 실행한다. 이번엔 9중 감옥과 마주치고 다시 deepCopy함수를 실행한다. 그 다음엔 8중 감옥에 대해 deepCopy함수를 실행한다.  
이 과정은 deepCopy함수의 첫 번째 줄인 `if (!Array.isArray(targetElement))`에 "Matt Damon"문자열이 걸려 `return targetElement`가 실행될 때까지 반복된다. 그 동안 상위의 for loop는 모두 각자의 deepCopy함수가 값을 출력하기를 멈춰서서 기다리고 있다.  
"Matt Damon"에 다다르면 이제 가장 나중에 실행된 deepCopy함수부터 `return returnArray`을 하기 시작한다(=멈춰서 있던 for loop가 하나씩 loop를 끝낸다). 이 과정을 거쳐서 최종적으로 10중 감옥에 갇힌 Matt Damon이 복사됐다.

## 결론

`JSON.parse(JSON.stringify())`는 간편해 보이지만 바람직한 방법은 아니다. Recursive 함수로 깊은 복사를 하는 함수를 만드는 것은 크게 어렵지 않다. 그리고 구글로 검색하면 많은 함수들이 올라와 있어 구하기도 쉬우며, 확실하고 쉬운 방법을 원한다면 `Lodash`라는 라이브러리를 사용하는 방법도 있다고 하니(써보진 않았다) JSON.parse(JSON.stringify())의 사용은 자제하도록 하자.
