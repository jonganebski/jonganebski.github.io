import{d as b,u as z,p as $,c as s,e as a,w as c,f as t,H as B,g as n,t as r,F as u,i as m,k as g,h as o,n as h,q as D,l as j}from"./app.51fabfea.js";const A={class:"mx-auto py-20 px-15 lg:px-20 max-w-screen-xl text-dark-500 dark:text-light-500"},S={class:"text-6xl"},E={class:"mt-30 flex flex-wrap gap-16"},F={class:"mt-2 text-center overflow-hidden"},V=b({setup(H){const{t:e,locale:d}=z(),i="https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/game-images",y=$(()=>[{path:"/games/mine-sweeper",name:e("minesweeper"),src:`${i}/screenshot-minesweeper.jpg`},{path:"/games/sliding-puzzle",name:e("sliding_puzzle"),src:`${i}/screenshot-sliding-puzzle.jpg`},{path:"/games/tetris",name:e("tetris"),src:`${i}/screenshot-tetris.png`}]);return(L,N)=>{const x=D,f=g("router-link"),w=j,k=g("client-only");return o(),s(u,null,[a(t(B),null,{default:c(()=>[n("title",null,r(t(e)("nav.games"))+" | "+r(t(e)("jon_ganebskis_blog")),1)]),_:1}),n("div",A,[n("h1",S,r(t(e)("nav.games")),1),n("ul",E,[(o(!0),s(u,null,m(t(y),({path:p,name:l,src:v})=>(o(),s("li",{key:p},[a(f,{class:"group",to:p,"aria-label":t(d)==="ko"?`${l}\uC744(\uB97C) \uD50C\uB808\uC774\uD558\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694`:`Click to play ${l}`},{default:c(()=>[a(x,{class:"w-[200px] h-[240px] object-cover transition-shadow shadow-sm group-hover:shadow-xl",style:h({transitionDelay:`${l.length*10}ms`}),height:240,width:200,src:v},null,8,["style","src"]),n("h4",F,[(o(!0),s(u,null,m(l.split(""),(C,_)=>(o(),s("span",{key:_,class:"inline-block transition-all transform translate-y-[1em] group-hover:translate-y-0 opacity-0 group-hover:opacity-100",style:h({transitionDelay:`${_*10}ms`})},r(C),5))),128))])]),_:2},1032,["to","aria-label"])]))),128))])]),a(k,null,{default:c(()=>[a(w)]),_:1})],64)}}});export{V as default};