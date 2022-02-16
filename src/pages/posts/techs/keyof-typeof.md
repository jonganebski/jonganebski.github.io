---
title:
  ko: keyof & typeof
  en: keyof & typeof
date: 2021-05-09
cover_image_url: https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1021&q=80
---

<span class="photo-reference">Photo by <a href="https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Antonin Kolar</a> on <a href="https://unsplash.com/s/photos/sort?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</span>

타입스크립트를 사용하다보면 `keyof typeof`를 사용하는 경우를 종종 본다. 그 원리를 알기 전에 그냥 사용하는데에 익숙해져버려서 잘 알지도 못하고 쓰는 것 같았다. 그래서 이번에는 typeof와 keyof에 대해서 포스트를 작성해 보고자 한다.  
하지만 그 이전에 짚고 넘어가야 하는 개념이 있는데, Literal Type(이하 리터럴 타입)와 Union Type(이하 유니언 타입)이다.

## Literal Type

```ts
type JujutsuKaisen = 'Gojo';

const charA: JujutsuKaisen = 'Gojo';
// OK
const charB: JujutsuKaisen = 'All might';
// error TS2322: Type '"All might"' is not assignable to type '"Gojo"'.
```

리터럴 타입은 타입스크립트에서 조금 더 간추려진 string, number, 또는 boolean 타입이라고 볼 수 있다. 위에서 JujutsuKaisen 타입은 "Gojo"로, 문자열이면서 동시에 문자열 중에서도 "Gojo"만이 허용된 문자열 타입이다. 그래서 JujutsuKaisen 타입인 charB를 "All might"라는 문자열로 선언할 수 없다.

## Union Type

위의 리터럴 타입은 그 자체로서는 그다지 유용하지 않지만, 유니언으로 활용될 때 빛을 발한다.

```ts
type JujutsuKaisen = 'Gojo' | 'Nanami' | 'Nobara';

const charA: JujutsuKaisen = 'Gojo';
// OK
const charB: JujutsuKaisen = 'Nanami';
// OK
const charC: JujutsuKaisen = 'Nobara';
// OK
const charD: JujutsuKaisen = 'Tanjiro';
// error TS2322: Type '"Tanjiro"' is not assignable to type 'JujutsuKaisen'.
```

여기서 JujutsuKaisen 타입은 확장돼서 "Gojo" 또는 "Nanami" 또는 "Nobara"가 될 수 있다. 그 이외의 값들은 타입스크립트 에러를 발생시킬 것이다.

## keyof

keyof는 객체 형태의 type이나 interface의 key들로 이루어진 유니언 타입을 생성해 준다고 보면 된다.

> The keyof operator takes an object type and produces a string or numeric literal union of its keys.
>
> <small class="caption"><a href="https://www.typescriptlang.org/docs/handbook/2/keyof-types.html">— Typescript Documentation</a></small>

```ts
type Coordinate = { lon: number; lan: number };

type X = keyof Coordinate;
// type X = "lon" | "lan" 과 같다.

// -------------------------

interface User {
  username: string;
  email: string;
}

type Y = keyof User;
// typeY = "username" | "email" 과 같다.
```

> If the type has a string or number index signature, keyof will return those types instead.
>
> <small class="caption"><a href="https://www.typescriptlang.org/docs/handbook/2/keyof-types.html">— Typescript Documentation</a></small>

```ts
interface KeysAreNumber {
  [n: number]: string;
}

type X = typeof KeysAreNumber;
// type X = number 와 같다.

// -------------------------

interface KeysAreString {
  [n: string]: string;
}

type Y = keyof KeysAreString;
// type Y = string | number 와 같다. (주의할 부분!)
```

위에서 type Y는 string이 되어야 마땅해 보이지만 string | number로 나온다. 그 이유는 자바스크립트에서 객체의 key를 다루는 방식을 알아야 이해된다.

자바스크립트에서 객체의 key는 항상 문자열로 전환된다. 문서에서는 `object keys are always coerced to a string`이라고 표현하고 있다. 그래서 자바스크립트는 `object[0]`이나 `object["0"]`이나 같다고 생각한다. 타입스크립트에서도 이건 다르지 않다. 그런 이유로 type Y에는 문자열과 숫자 모두 가능하기에 string | number로 표현되는 것이다.

## typeof

사실 typeof는 자바스크립트에도 있다.

```js
const user = { username: 'violet', email: 'evergarden@CH.com' };

console.log(typeof user); // object
```

그런데 typeof가 타입스크립트의 타입으로 호출되는 경우에는 조금 달라진다.

```ts
const user = { username: 'violet', email: 'evergarden@CH.com' };

type User = typeof user;
// type User = {username: string, email: string} 과 같다.
```

## keyof typeof

위의 이야기를 종합하면 이렇게 된다.

```ts
const user = { username: 'violet', email: 'evergarden@CH.com' };

type User = keyof typeof user;
// type User = "username" | "email" 과 같다.
```

즉 `keyof typeof`는 어떤 객체의 key들로 이뤄진 유니언 타입을 만들고 싶을 때 유용하게 사용할 수 있다.

이것은 객체 뿐만 아니라 enum에도 적용된다. enum은 컴파일 시점에는 타입으로 활용되지만, 런타임 시점에서는 객체로 취급된다. 런타임 시점이라함은 이미 타입스크립트에서 자바스크립트로 컴파일이 완료된 이후이기 때문에 enum이라는 것은 존재하지 않고, 따라서 단순한 객체로 변환됐기 때문이다.

```ts
enum Role {
  'Owner' = 'Owner',
  'Customer' = 'Customer',
  'Service' = 'Service',
}

type User = keyof typeof Role;
// type User = "Owner" | "Customer" | "Service" 와 같다.
```

---

참고자료

<a href="https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript" target="_blank">https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript</a>  
<a href="https://www.typescriptlang.org/docs/handbook/2/keyof-types.html" target="_blank">https://www.typescriptlang.org/docs/handbook/2/keyof-types.html</a>
