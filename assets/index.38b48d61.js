var ve=Object.defineProperty,pe=Object.defineProperties;var ge=Object.getOwnPropertyDescriptors;var ae=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable;var ne=(s,a,n)=>a in s?ve(s,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[a]=n,oe=(s,a)=>{for(var n in a||(a={}))we.call(a,n)&&ne(s,n,a[n]);if(ae)for(var n of ae(a))xe.call(a,n)&&ne(s,n,a[n]);return s},re=(s,a)=>pe(s,ge(a));import{s as W,O as me,d as Ne,e as Ce,u as se,_ as ye,a as Me}from"./app.5ef8d18c.js";import{h as f,j as x,m as c,P as he,T as ue,a1 as be,a2 as ke,r as R,aj as Fe,p as te,N as le,ah as fe,Q as _e,A as ce,d as Se,s as Q,w as K,v as i,H as Oe,t as F,F as Y,ai as Qe,q as Re,Y as Z,W as ee,ak as P,n as Ve,x as de,y as G}from"./vendor.204456b6.js";import{_ as Ee,a as Ae}from"./option.f1984e9b.js";import{_ as $e,a as qe}from"./records.43d55744.js";const He={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32"},ze=c("path",{d:"M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z",fill:"currentColor"},null,-1),Le=c("circle",{cx:"16",cy:"23.5",r:"1.5",fill:"currentColor"},null,-1),De=c("path",{d:"M17 8h-1.5a4.49 4.49 0 0 0-4.5 4.5v.5h2v-.5a2.5 2.5 0 0 1 2.5-2.5H17a2.5 2.5 0 0 1 0 5h-2v4.5h2V17a4.5 4.5 0 0 0 0-9z",fill:"currentColor"},null,-1),Te=[ze,Le,De];function je(s,a){return f(),x("svg",He,Te)}var Be={name:"carbon-help",render:je};const Ge={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32"},We=c("path",{d:"M6 30H4V2h24l-5.8 9l5.8 9H6zm0-12h18.33l-4.53-7l4.53-7H6z",fill:"currentColor"},null,-1),Ie=[We];function Ue(s,a){return f(),x("svg",Ge,Ie)}var Ye={name:"carbon-flag",render:Ue};function Pe(s){return he(ue(["mine-sweeper-records",s]),async()=>s.value?(await W.from("mine-sweeper-records").select("*, user: user_id (user_name, avatar_url)").eq("mode_id",s.value).order("score",{ascending:!0}).limit(100)).data:null,ue({enabled:!!s,refetchOnWindowFocus:!1,refetchOnReconnect:!1,refetchOnMount:!1,staleTime:me,retry:!1}))}function Xe(){const s=ke(),{data:a}=Ne();return be(async({modeId:n,score:r})=>{if(!a.value)return null;const{data:m}=await W.from("mine-sweeper-records").select("*").eq("user_id",a.value.id).eq("mode_id",n).order("score",{ascending:!0});if(!m)return null;switch(m.length<=10){case!0:return(await W.from("mine-sweeper-records").insert({mode_id:n,score:r,user_id:a.value.id}).single()).data;case!1:{const g=m[m.length-1];return g.score<r?null:(await W.from("mine-sweeper-records").update({id:g.id,score:r}).single()).data}}},{onSuccess:n=>{if(!a.value)return;const{user_name:r=a.value.email,avatar_url:m=""}=a.value.user_metadata;if(!n)return;const g=s.getQueryData(["mine-sweeper-records",n.mode_id]);!g||s.setQueryData(["mine-sweeper-records",n.mode_id],()=>[...g,re(oe({},n),{user:{user_name:r,avatar_url:m}})].sort((_,t)=>_.score-t.score))}})}function Je(s){class a{constructor(e){this.isExploded=!1,this.isQuestion=!1,this.isFlagged=!1,this.isVeiled=!0,this.isMine=!1,this.hint=0,this.rowNum=e.rowNum,this.colNum=e.colNum}increaseHint(){this.hint+=1}around(e){var o,w,M,p,b,u,k,$,q,H,z,L,D,T,j,B;(w=(o=t.value[this.rowNum-1])==null?void 0:o[this.colNum])==null||w[e](),(p=(M=t.value[this.rowNum-1])==null?void 0:M[this.colNum+1])==null||p[e](),(u=(b=t.value[this.rowNum])==null?void 0:b[this.colNum+1])==null||u[e](),($=(k=t.value[this.rowNum+1])==null?void 0:k[this.colNum+1])==null||$[e](),(H=(q=t.value[this.rowNum+1])==null?void 0:q[this.colNum])==null||H[e](),(L=(z=t.value[this.rowNum+1])==null?void 0:z[this.colNum-1])==null||L[e](),(T=(D=t.value[this.rowNum])==null?void 0:D[this.colNum-1])==null||T[e](),(B=(j=t.value[this.rowNum-1])==null?void 0:j[this.colNum-1])==null||B[e]()}countAround(e){var w,M,p,b,u,k,$,q,H,z,L,D,T,j,B,ie;let o=0;return((M=(w=t.value[this.rowNum-1])==null?void 0:w[this.colNum])==null?void 0:M[e])&&o++,((b=(p=t.value[this.rowNum-1])==null?void 0:p[this.colNum+1])==null?void 0:b[e])&&o++,((k=(u=t.value[this.rowNum])==null?void 0:u[this.colNum+1])==null?void 0:k[e])&&o++,((q=($=t.value[this.rowNum+1])==null?void 0:$[this.colNum+1])==null?void 0:q[e])&&o++,((z=(H=t.value[this.rowNum+1])==null?void 0:H[this.colNum])==null?void 0:z[e])&&o++,((D=(L=t.value[this.rowNum+1])==null?void 0:L[this.colNum-1])==null?void 0:D[e])&&o++,((j=(T=t.value[this.rowNum])==null?void 0:T[this.colNum-1])==null?void 0:j[e])&&o++,((ie=(B=t.value[this.rowNum-1])==null?void 0:B[this.colNum-1])==null?void 0:ie[e])&&o++,o}unveil(){if(!!this.isVeiled&&!this.isFlagged){if(this.isMine){A({isSuccess:!1});return}this.isVeiled=!1,this.hint===0&&this.around("unveil")}}onLeftClick(){this.isFlagged||this.isQuestion||this.unveil()}onDoubleClick(){this.isVeiled||this.countAround("isFlagged")!==this.hint||this.around("unveil")}onRightClick(){if(!!this.isVeiled){if(this.isFlagged){d.value-=1,this.isFlagged=!1,this.isQuestion=!0;return}if(this.isQuestion){d.value-=1,this.isFlagged=!1,this.isQuestion=!1;return}d.value+=1,this.isFlagged=!0,this.isQuestion=!1}}}const n=1e3*999,r={surfaceLight:"#c6c6c6",surfaceDark:"#C0C0C0",shadow:"#808080"},m=Xe(),{openIssueModal:g}=Ce(),{t:_}=se(),t=R([]),d=R(0),C=R(!1),V=R(!1),N=R(null),{timestamp:y,pause:I,resume:E}=Fe({immediate:!1,controls:!0}),S=te(()=>N.value?y.value-N.value:0);le(S,()=>{S.value<n||A({isSuccess:!1})});const v=te(()=>s.value===3?{totalMines:99,rows:16,cols:30}:s.value===2?{totalMines:40,rows:16,cols:16}:s.value===1?{totalMines:10,rows:9,cols:9}:{totalMines:0,rows:0,cols:0});le(()=>s.value,()=>U(),{immediate:!0});function U(){I(),N.value=null,C.value=!1,V.value=!1,d.value=0,t.value=[];for(let e=0;e<v.value.rows;e++){const o=[];for(let w=0;w<v.value.cols;w++)o.push(new a({rowNum:e,colNum:w}));t.value.push(o)}let l=0;for(;l<v.value.totalMines;){const e=Math.round(Math.random()*(v.value.rows-1)),o=Math.round(Math.random()*(v.value.cols-1));t.value[e][o].isMine||(t.value[e][o].isMine=!0,t.value[e][o].around("increaseHint"),l++)}}function X(){N.value=new Date().getTime(),E()}function A(l){if(I(),C.value=!0,V.value=l.isSuccess,!l.isSuccess)return O();!s.value||m.mutate({modeId:s.value,score:S.value},{onSuccess:()=>{const e=_("congratulations")+"!";window.alert(e)},onError:()=>g({title:_("record_mutation_failed.title"),content:_("record_mutation_failed.content")})})}function h(l){C.value||(N.value||X(),l(),v.value.totalMines===d.value&&J()&&A({isSuccess:!0}))}function O(){t.value.forEach(l=>{l.forEach(e=>{e.isFlagged||!e.isMine||(e.isExploded=!0)})})}function J(){for(let l=0;l<t.value.length;l++)for(let e=0;e<t.value[l].length;e++){const o=t.value[l][e];if(!(o.isMine&&o.isFlagged)&&!!o.isVeiled)return!1}return!0}return{withController:h,initialize:U,isGameOver:C,flagCount:d,isSuccess:V,COLORS:r,game:t,meta:v,time:S}}function Ke(s){return he([s],async()=>(await W.from(s).select("id, mode")).data,{refetchOnWindowFocus:!1,refetchOnReconnect:!1,refetchOnMount:!1,staleTime:me,retry:!1})}function Ze(){const{t:s}=se(),{data:a}=Ke("mine-sweeper-modes"),n=fe(),r=_e(),m=te(()=>{var _;return(_=a.value)==null?void 0:_.map(({id:t,mode:d})=>({id:t,mode:s(d==="expert"?"expert":d==="intermediate"?"intermediate":"beginner")}))}),g=R(r.query.mode?Number(r.query.mode):1);return ce(()=>{if(!m.value)return;const _=r.query.mode?Number(r.query.mode):1;if(!m.value.find(({id:d})=>d===_))return n.replace({path:r.path});g.value=_}),ce(()=>Array.isArray(r.query.mode)&&n.replace({path:r.path})),{selectedMode:g,modes:m}}const et={class:"mt-20 min-h-screen grid place-items-center text-dark-500 dark:text-light-500"},tt={class:"text-3xl md:text-5xl"},st={class:"mt-10 flex justify-center"},it={class:"p-2 grid grid-cols-3 intaglio"},at={class:"flex"},nt={class:"counter"},ot={class:"flex items-center justify-center"},rt=["data-isGameOver"],ut={class:"flex justify-end"},lt={class:"counter"},ct={class:"rows-container intaglio"},dt=["data-isExploded","onContextmenu","onDblclick","onClick"],mt={key:1},ht=Se({setup(s){Qe(h=>({"526295dc":i(y).rows,"4b660c4e":i(t).shadow,"52703ba8":i(y).cols,"61463517":i(t).surfaceLight}));const a=fe(),n=_e(),{selectedMode:r,modes:m}=Ze(),{data:g,isLoading:_}=Pe(r),{COLORS:t,isGameOver:d,isSuccess:C,flagCount:V,initialize:N,meta:y,game:I,withController:E,time:S}=Je(r),{t:v}=se();function U(h){return h===1?"text-blue-700":h===2?"text-green-700":h===3?"text-red-700":h===4?"text-purple-700":h===5?"text-fuchsia-700":h===6?"text-cyan-600":"text-black"}function X(h){a.push({path:n.path,query:{mode:h}})}function A(h){return(h/1e3).toFixed(2)+" "+v("abbr.seconds")}return(h,O)=>{const J=Ae,l=Ee,e=Ye,o=Be,w=Re("client-only"),M=Me;return f(),x(Y,null,[Q(i(Oe),null,{default:K(()=>[c("title",null,F(i(v)("minesweeper"))+" | "+F(i(v)("jon_ganebskis_blog")),1)]),_:1}),c("div",et,[c("h1",tt,F(i(v)("minesweeper")),1),c("div",st,[Q(l,{"model-value":i(r),"option-label-key":"mode",label:i(v)("mode"),class:"w-72","onUpdate:modelValue":X},{default:K(()=>[(f(!0),x(Y,null,Z(i(m),p=>(f(),ee(J,{key:p.id,value:p.id,label:p.mode},null,8,["value","label"]))),128))]),_:1},8,["model-value","label"])]),Q(w,null,{default:K(()=>[0<i(y).rows&&0<i(y).cols?(f(),x("div",{key:0,class:"mt-20 flex flex-col items-center justify-center game",onContextmenu:O[1]||(O[1]=P(()=>{},["prevent"]))},[c("div",{class:"p-2 relief",style:Ve({backgroundColor:i(t).surfaceDark})},[c("div",it,[c("div",at,[c("span",nt,F((i(y).totalMines-i(V)).toString().padStart(3,"0")),1)]),c("div",ot,[c("button",{class:"node-btn relief player w-10 h-10","data-isGameOver":i(d),"aria-label":"Click to restart the game",onClick:O[0]||(O[0]=(...p)=>i(N)&&i(N)(...p))},F(i(d)&&i(C)?"\u{1F60E}":i(d)&&!i(C)?"\u{1F480}":""),9,rt)]),c("div",ut,[c("span",lt,F(Math.round(i(S)/1e3).toString().padStart(3,"0")),1)])]),c("div",ct,[(f(!0),x(Y,null,Z(i(I),(p,b)=>(f(),x("div",{key:b,class:"row"},[(f(!0),x(Y,null,Z(p,(u,k)=>(f(),x("button",{key:k,class:de(["node-btn",[u.isVeiled&&"relief"]]),"data-isExploded":u.isExploded,onContextmenu:P(()=>i(E)(()=>u.onRightClick()),["prevent"]),onDblclick:P(()=>i(E)(()=>u.onDoubleClick()),["prevent"]),onClick:P(()=>i(E)(()=>u.onLeftClick()),["prevent"])},[u.isVeiled?G("",!0):(f(),x("span",{key:0,class:de(["font-extrabold",[U(u.hint)]])},F(u.hint===0?"":u.hint),3)),u.isExploded?(f(),x("span",mt,"\u{1F4A3}")):G("",!0),u.isFlagged?(f(),ee(e,{key:2})):G("",!0),u.isQuestion?(f(),ee(o,{key:3})):G("",!0)],42,dt))),128))]))),128))])],4),Q(qe,{class:"mt-2"})],32)):G("",!0)]),_:1}),Q($e,{"is-loading":i(_),data:i(g),formatter:A},null,8,["is-loading","data"]),Q(M)])],64)}}});var wt=ye(ht,[["__scopeId","data-v-e33a5102"]]);export{wt as default};
