---
title: Closure
date: 2021-04-22
coverUrl: https://images.pexels.com/photos/5910298/pexels-photo-5910298.jpeg?cs=srgb&dl=pexels-plato-terentev-5910298.jpg&fm=jpg
---

<span class="photo-reference">Plato Terentev 님의 사진, 출처: Pexels</span>

얼마 전 있었던 기술면접에서 Closure에 대한 질문이 나왔다. 뭔가 들어본 듯 하면서도 전혀 기억 나는 것이 없어서 모른다고 답변 드릴 수 밖에 없었다. 일단 정의부터 찾아봤는데, 곧바로 이해가 되지는 않았다.

## 클로저의 정의

클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. - 생활코딩

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time. - MDN

번역: 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호작용에 따른 현상 - 정재남, 코어 자바스크립트 p.116

## 이해

아래처럼 만들면 outer함수와 inner함수가 뭔지 알 수 있을 것이다. inner함수는 다른 함수 내부에 선언된 함수다. 그리고 상대적으로 밖에 있는 함수가 outer함수다. 그리고 inner함수에 name이라는 변수가 없다면 그 다음 스코프인 outer함수 내에서 name을 찾게된다.

```ts
const outer = () => {
	const name = 'Rice Shower';
	const inner = () => {
		console.log(name);
	};
	inner();
};

outer(); // Rice Shower
```

좀 더 어려운 이야기: 바로 위 스코프를 검색하게 되는 이유는 inner함수가 선언될 때 형성되는 inner함수의 Lexical Environment의 outerEnvironmentReference가(아.. 길다) `선언 시점`의 Lexical Environment(그러므로 outer함수의 Lexical Environment)를 참조하기 때문이다.

여기까진 당연한 소리로 들렸다. 신기한 건 다음부터였다.

```ts
const outer = () => {
	const name = 'Rice Shower';
	const inner = () => {
		console.log(name);
	};
	return inner;
};

const inner = outer();
inner(); // Rice Shower
```

잘 보면 뭔가 이상하다. `const inner = outer()`에서 inner는 console.log(name)을 하는 함수가 됐다. 그런데 어떻게 이미 임무를 완수하고 끝나버린 outer함수의 지역변수인 name을 가져올 수 있는 것인가?

내가 이해한 바로는 위에 어려운 이야기와 관련이 있다. `선언 시점`이 중요한 키워드인데, inner함수가 선언될 당시에는 name변수가 있었고, 이것을 outerEnvironmentReference로 inner함수의 Lexical Environment가 형성됐다. 그러므로 outer함수는 종료됐지만, inner함수의 Lexical Environment는 자신이 태어날 때 name이라는 변수가 있었다는걸 기억하고 있다. 그리고 Garbage Collector는 어떤 값을 참조하는 변수가 하나라도 있다면 수집대상에서 제외하기 때문에 outer함수 종료 후에도 메모리에 남아있게 된다.

MDN에서 Closure를 Combination(조합)이라고 표현하지만 이런 일련의 현상? 작동방식?이라고 일단 이해하는게 일단 편할 지도 모르겠다는 생각이 들었다.

```ts
// 생활코딩 egoing님의 예제를 조금 바꿔봤다.
const stable = (name: string) => {
	return {
		getName: () => {
			return name;
		},
		setName: (_name: string) => {
			name = _name;
		},
	};
};

const main = stable('Special Week');
const sub = stable('Silence Suzuka');

console.log(main.getName()); // Special Week
console.log(sub.getName()); // Silence Suzuka

main.setName('Tokai Teio');

console.log(main.getName()); // Tokai Teio
console.log(sub.getName()); // Silence Suzuka
```

1. 클로저는 객체의 메소드에서도 적용된다. 위에서 stable은 outer함수로, 객체를 반환하고 있다. 이 객체는 메소드 getNAme, setName을 가지고 있다. 이 메소드들은 생성 당시 stable함수에 있던 name을 `기억`한다. (Lexical Environment의 outerEnvironmentReference로)

2. 동일한 outer 함수 안에서 만들어진 getName과 setName은 생성 당시의 stable함수의 Lexical Environment를 참조했으므로 지역변수 name을 `공유`한다.

3. 하지만 main과 sub는 name을 공유하지 않는다. 맨 위에서 말했다시피 클로저는 함수 생성시에 형성된다. getName과 setName은 stable함수가 실행될 때 생성되므로, main에서 한 번 sub에서 한 번 따로따로 생성되었다. 그러므로 `둘의 클로저는 다르며, 독립적`이다.

4. stable의 지역변수 name은 오로지 getName과 setName에서만 접근이 가능하다. JavaScript는 기본적으로 private한 속성을 지원하지 않는데, 클로저의 이러한 특성을 이용해서 `private 변수`로 활용하도록 응용할 수 있다. (비밀변수, private변수라는 단어는 MDN에서는 찾을 수 없었다. 아마도 편의상 그렇게 부르는 것 같다)

'코어 자바스크립트'에서는 '클로저란 어떤 함수 A에서 선언된 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상'이라고 정리하고 있다.

## return 없이도 클로저가 발생하는 경우

위에서는 모두 outer함수가 inner함수를 리턴하거나 inner함수들이 선언된 객체를 리턴하는 경우였다. 하지만 리턴 없이도 클로저가 발생하는 2가지 경우가 있다.

1. setInterval / setTimeout

```ts
// 코어 자바스크립트에 소개된 예시를 조금 바꿔 봤다.
const outer = () => {
	let a = 0;
	let intervalId: number;

	const inner = () => {
		++a;
		if (a >= 10) {
			clearInterval(intervalId);
			return;
		}
		console.log(a);
	};

	intervalId = setInterval(inner, 1000);
};

outer(); // 1 2 3 4 5 6 7 8 9
// outer함수는 종료됐고 inner함수를 리턴하지도 않았지만,
// setInterval의 콜백함수인 inner함수는 변수 a를 계속 사용하고 있다.
```

2. addEventListener

```html
<!-- 코어 자바스크립트에 소개된 예시를 조금 바꿔 봤다. -->
<body>
	<div>
		<button>Click</button>
	</div>
	<script>
		const outer = () => {
			let count = 0;
			const button = document.querySelector('button');
			if (!button) return;

			const inner = () => {
				++count;
				console.log(`${count} times clicked`);
			};

			button.addEventListener('click', inner);
		};

		outer(); // 버튼 클릭 시: 1 times clicked, 2 times clicked, 3 times cilcked, ...
		// outer함수는 종료됐고 inner함수를 리턴하지도 않았지만,
		// addEventListener의 콜백함수인 inner함수는 변수 count를 계속 사용하고 있다.
	</script>
</body>
```

## 자주 하는 실수

MDN에서는 클로저와 관련해서 범할 수 있는 실수에 대해서 언급하고 있다. 하지만 요즘은 for loop를 만들 때 block scope를 가진 let을 사용하므로 별 의미는 없다고 볼 수 있다. 그래도 클로저를 이해하는데 중요하다고 생각한다.

```ts
const arr: any[] = [];

for (var i = 0; i < 5; i++) {
	// 여기서 let을 쓰면 0 1 2 3 4 가 출력된다.
	// 하지만 var를 쓰면 아래처럼 5 5 5 5 5가 출력된다.
	arr[i] = () => i;
}

for (var j = 0; j < arr.length; j++) {
	console.log(arr[j]()); // 5 5 5 5 5
}
```

여기서 내가 이해한 바를 써보자면, var는 function scope를 갖는데 for문은 function scope가 아니다. 그래서 이런게 가능하다.

```ts
for (var i = 0; i < 5; i++) {
	// do something
}
console.log(i); // 5
```

let은 block scope이므로 위처럼 for문 밖에서 i로 접근이 불가능하다.

```ts
for (let i = 0; i < 5; i++) {
	// do something
}
console.log(i); // Error
```

그러므로 var를 썼다면 for loop 안에서 선언되는 함수들의 outerEnvironmentReference는 모두 전역환경(?)을 참조하게 된다. 그리고 이 전역환경에서 i는 5로 변화한다. 그렇기 때문에 의도했던 0 1 2 3 4가 아니라, 5 5 5 5 5가 출력되는 것이다. 하지만 let은 block scope를 가지므로 for loop 안에서 선언되는 함수들은 i가 각기 다를 때의 환경을 참조하게 된다.  
정리하자면 var를 썼을 때에는 모두 같은 i를 참조하며, 그 i는 5로 변화했기에 모두 5를 출력한다. let을 썼을 때에는 각기 다른 i를 참조했기 때문에 그에 대응해서 0 1 2 3 4를 출력한다.

그렇다면 var를 쓸 때 각기 다른 환경을 참조하게끔 하는 방법은 무엇인가? 사실 이것이 MDN에서 힘줘서 설명하고 있는 부분이며, let을 쓰고 있는 요즘은 그리 와닿지는 않는 부분이다. 하지만 let을 쓰는건 클로저를 응용하는 것과는 상관이 없는 것이라, 클로저를 알기 위해서는 봐 둘 필요가 있다.

결론을 바로 보면 이렇다.

```ts
const arr: any[] = [];

for (var i = 0; i < 5; i++) {
	arr[i] = (
		(x: number) => () =>
			x
	)(i); // arr[i] = () => i 에서 변경
}

for (var j = 0; j < arr.length; j++) {
	console.log(arr[j]()); // 0 1 2 3 4
}
```

내가 이해한 바로는 이렇게 고치면 `() => x`함수는 전역환경이 아니라 `(x: number) => () => x` 이 함수의 LexicalEnvironment를 참조하게 된다. 처음으로 돌아가서 outer함수와 inner함수를 보고 오면 그 관계와 똑같다는걸 알 수 있다.

---

참고자료

<a href="https://opentutorials.org/course/743/6544" target="_blank">https://opentutorials.org/course/743/6544</a>  
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures</a>  
코어 자바스크립트, 정재남 저
