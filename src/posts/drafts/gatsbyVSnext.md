---
title: "SSG(Static Site Generation), Gatsby vs Next"
date: "2021-03-12"
coverUrl: "https://images.unsplash.com/photo-1502298411556-0b02524812cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
---

<img src="https://images.unsplash.com/photo-1502298411556-0b02524812cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Intersection" title="Intersection"/>
<span class="photo-reference">Photo by <a href="https://unsplash.com/@kylejglenn?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Kyle Glenn</a> on <a href="https://unsplash.com/s/photos/confused?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

## 내가 둘 다 하게 된 이유

게이츠비를 써 본 것은 현재 이 사이트가 처음이었다. 그리고 신선함과 재미 둘 다 느끼면서 ~~오 오 하는 소리를 연발하면서~~ 개발하고 있었다. 그런데 나에게도 이 에러가 찾아왔다. 

```
Uncaught Error: The result of this StaticQuery could not be fetched.
```

구글 검색을 해보니 어느정도 빈번하면서도, 보고된지 꽤 됐지만, 아직 고쳐지지 않은, 귀찮은 문제인 것 같았다. https://github.com/gatsbyjs/gatsby/issues/26563 에 들어가보면 마땅한 해결책은 없고 대략 혼란하다. 

내 경험을 정리하자면 이렇다.  
1. 내 경우에는 gatsby-plugin-image를 쓰기 시작하면서 발생한 것 같다. 
2. 왜 '발생한 것 같다'라고 하냐면, 이 에러는 localhost에서는 일어나지 않아서 정확히 파악할 방도가 없기 때문이다. Production 환경에서만 발생한다. 그래서 매우 난감한 에러다...
3. 내 경우 해결법(?)은 인터넷 브라우저의 캐쉬를 지우는 것이었다. 그러면 정상적으로 접속이 된다. 하지만 이건 사용자에게 해결을 떠넘기게 된다. 그리고 '만약 이러저러한 에러가 발생하면 캐쉬를 지우세요'라고 홈페이지에 크게 써붙일수도 없거니와, 저 에러가 발생한 시점에서는 이미 사이트에 접속이 안된다. 

그래서 일단 이전 상태로 되돌리고, graphql쪽에 변경이 생기는 업데이트는 당분간 하지 않기로 했다. 그리고 Nextjs로 같은 사이트를 만들기 시작했다. Nextjs에서 SSG를 지원하기 시작하지는 얼마되지 않았지만, 만약 Next의 개발경험이 더 좋다면 그쪽으로 넘어갈 생각이었다. 결론적으로는 Gatsby에 남기로 했지만, 완전히 정착했다고는 하기 어렵다. 상황에 따라서 언제든지 Nextjs로 넘어갈 생각이 있다. 

## Plugin

Gatsby와 Next의 SSG에서 가장 큰 차이는 plugin의 유무라고 생각한다. 차이라기 보다는 개츠비의 특징이라고 해야 할 것 같기도 하고.. config파일에 plugin들을 잘 정리해 놓으면 알아서 처리를 해준다. 여기서는 대표적으로 styled-components를 세팅하는 코드로 비교를 해 보겠다.

### Gatsby

자세한 사항은 <a href="https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/" target="_blank" >게츠비 플러그인 페이지</a>를 참고바란다. 하지만 중요한 건 설정이 심플하다는 것이다.  

```ts
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
}
```

### Next

넥스트는 다음과 같다. 하지만 이런 설정은 SSR일 때에도 동일하니 큰 문제는 아니고 단지 Gatsby의 plugin 설치를 통한 접근이 굉장히 심플하다는걸 보여주고 싶었다. 

```ts
// _document.tsx
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enchanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## Routing

## Creating static pages

## Data fetching

개츠비의 장점
1. 풍부한 플러그인 생태계
2. 다양한 API
3. Graphql

개츠비의 단점
1. 과도한 플러그인 의존도. 에러 발생 시 대책이 제한적임

넥스트(SSG)의 장점
1. 구조가 간결함
 
넥스트(SSG)의 단점
1. 간결한 구조가 오히려 많고 복잡한 코드를 쓰게 할 수 있음
2. 비교적 최근에 생긴 기능이라 정보가 개츠비에 비해 부족한 느낌

개인적으로는 Nextjs가 마음에 들었지만 내가 Gatsby에 남기로 결정한 건 순전히 `gatsby-remark-vscode`의 대체제를 찾지 못해서다.(아시는 분은 이메일 좀 부탁드립니다) Highlightjs도 Prismjs도 gatsby-remark-vscode보다는 그렇게 보기 좋은 Syntex Highlighter가 아니었다. 포스트의 코드들이 이쁘게 보이는게 의외로 중요하더라... 

하지만 프로그래밍을 모르는 누군가를 위해 정적 사이트를 만들어 줘야 된다면 개츠비의 장점이 압도적이다. 이 상황이라면 Nextjs는 경쟁상대로 고려조차 되지 않을 것이라 생각된다. 특히 워드프레스나 Contentful 등에 연결해서 쉽게 포스팅을 할 수 있도록 하는 플러그인들은 굉장히 강력하다.