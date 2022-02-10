---
title: Big O Notation
date: 2021-02-26
coverUrl: https://images.unsplash.com/photo-1517277601118-41621a7767e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80
---

<span class="photo-reference">Photo by <a href="https://unsplash.com/@abiglow?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alan Biglow</a> on <a href="https://unsplash.com/s/photos/speedometer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

## Time Complexity and Space Complexity

어떤 알고리즘의 성능은 그 알고리즘이 얼마나 오래 걸리는지, 그리고 얼마만큼의 메모리를 사용하는지에 따라 결정된다. 이것을 측정할 때 흔히 쓰이는 것이 Big O Notaion이며, 여기에서 시간복잡도(time complexity)와 공간복잡도(space complexity)라는 개념으로 알고리즘이 얼마나 오래걸리는지, 그리고 얼마나 많은 메모리를 사용하는지를 나타낸다. 이 복잡도가 클 수록 더 오래 걸리고(더 느리고), 더 많은 메모리를 사용한다(더 무겁다).

이 Big O Notation을 구할 때 사용하는 변수는 입력값(input)의 크기다. 왜냐하면 입력값의 크기가 알고리즘의 성능에 직접적으로 영향을 미치기 때문이다. 가장 많이 사용되는 배열을 예로 들자만, 그 배열의 길이 n이 입력값의 크기다.

## Examples

가장 일반적으로 보게 되는 복잡도를 가장 작은 것에서부터 가장 큰 것까지 정렬해 보자면 다음과 같다.

1. Constant: O(1)
1. Logarithmic: O(log(n))
1. Linear: O(n)
1. Log-linear: O(nlog(n))
1. Quadratic: O(n<sup>2</sup>)
1. Cubic: O(n<sup>3</sup>)
1. Expotential: O(2<sup>n</sup>)
1. Factorial: O(n!)

## Elematary Operation

```js
const input = [1, 2, 3, 4, 5];

// 시간복잡도: O(1), 공간복잡도: O(1)
const algorithm = (input) => {
	return input[0];
};

console.log(algorithm(input)); // 1
```

그렇다면 단위는 무엇일까? 예를 들어 시간복잡도가 O(1)이라면 이것은 1초가 걸리다는 것을 의미하는 것일까? 여기서 1은 알고리즘이 Elementary Operation을 수행하는 횟수을 말한다. Elematary Operation이란 컴퓨터가 하나의 메모리 주소에 접근하는 것이라고 할 수 있다. 따라서 그 절대적인 시간은 컴퓨터마다 다를 수 있다. Big O Notaion에서 측정하는 알고리즘의 속도(시간복잡도)는 몇 초가 걸린다의 개념이 아니라, Elematary Operation을 몇 번 수행한다는 개념이다.

그런데 하나의 메모리 주소에는 8비트만 저장할 수 있다. 만약 위의 알고리즘에서 숫자가 64비트의 숫자로 저장된 것이라면(자바스크립트에서는 기본적으로 64비트로 저장된다. 즉, 숫자 하나가 이미 8개의 메모리를 차지하고 있다.), `input[0]`는 8개의 메모리 주소에 접근하므로 O(8)이 되어야 하지 않을까? 그렇지 않다.

## Asymptotic Analysis

Big O Notation은 점근적 분석(Asymptotic Analysis)을 사용한다. 간단히 말하자면, 알고리즘의 입력값이 무한대에 가깝다고 가정한 상태에서 그 복잡도를 구하는 것이다. 위 알고리즘에서 만약 input의 길이가 10,000,000,000이라고 해도 길이가 5일 때와 똑같이 8개의 메모리 주소에 접근하는 일정한 Elematary Operation을 수행한다.

Big O Notaion의 관심사는 알고리즘의 입력값 크기가 무한히 커질 때, 그 알고리즘의 복잡도가 어떻게 변하는지에 있다. 입력값 크기에 상관없이 일정한 복잡도라면, 그것이 8개의 메모리 주소에 접근하든 1개의 메모리 주소에 접근하든 1로 본다. 그래서 O(8)이나 O(10,000) 등은 존재하지 않고, 입력값의 크기에 영향을 받지 않는다면 모두 O(1)로 표시한다.

```js
const input = [1, 2, 3, 4, 5];

// 시간복잡도: O(n), 공간복잡도: O(1)
const algorithm = (input) => {
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		sum += input[i];
	}
	return sum;
};

console.log(algorithm(input)); // 15
```

그렇다면 이 알고리즘에서 시간복잡도는 O(n+1)이 아닐까? 왜냐하면 `let sum = 0;`에서 한 번, 그리고 input의 길이 n만큼 for loop를 돌기 때문이다. 하지만 여기에서도 점근적 분석이 적용된다. n이 무한히 커지는 것을 가정하면, n+1에서 1은 의미가 없다. 그렇기 때문에 O(n)으로 표시된다.

이것을 다른 경우에 적용해 보자면 O(2n)이나 O(3n+1)이나 O(n)으로 표시되며, O(n<sup>2</sup>+2n)이나 O(n<sup>2</sup>+log(n)+3)의 경우에는 O(n<sup>2</sup>)로 표시된다. 즉 가장 결정적인 요소만 남긴다고 볼 수 있다.
