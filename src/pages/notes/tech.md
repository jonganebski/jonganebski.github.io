---
title:
  ko: 기술 노트
  en: Tech Notes
---

# Tech Notes

```ts
const array = 'some random word'.split('');

for (let i = 0; i < array.length; i++) {
  const randIdx = Math.floor(Math.random() * i + 1);
  [array[i], array[randIdx]] = [array[randIdx], array[i]];
}

console.log(array.join(''));
```
