var re=Object.defineProperty,ue=Object.defineProperties;var ie=Object.getOwnPropertyDescriptors;var ee=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var te=(l,t,n)=>t in l?re(l,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[t]=n,ae=(l,t)=>{for(var n in t||(t={}))ce.call(t,n)&&te(l,n,t[n]);if(ee)for(var n of ee(t))de.call(t,n)&&te(l,n,t[n]);return l},se=(l,t)=>ue(l,ie(t));import{O as pe,s as X,_ as le,u as Z,m as ne,d as me,e as _e,r as ge,a as ve}from"./app.5ef8d18c.js";import{P as fe,d as H,h as d,j as _,m as $,t as p,x as O,y as j,v as e,R as J,p as B,U as he,W as K,w as Q,Y as I,F as P,r as R,a1 as ye,a2 as $e,au as be,av as ke,o as ze,aw as Ce,N as xe,s as N,H as Se,ax as we,ai as Ee,q as Ue,n as M}from"./vendor.204456b6.js";import{_ as Ne,a as Re}from"./records.43d55744.js";import{a as je,_ as Te}from"./option.f1984e9b.js";function Ve(){return fe("sliding-puzzle-records",async()=>(await X.from("sliding-puzzle-records").select("*, user: user_id (user_name, avatar_url)").order("score",{ascending:!0}).limit(100)).data,{refetchOnWindowFocus:!1,refetchOnReconnect:!1,refetchOnMount:!1,staleTime:pe,retry:!1})}const Fe={class:"mt-4 px-2 text-center"},Le={key:0,class:"text-sm text-gray-700 dark:text-gray-300"},Me=J(" Photo by "),Oe=["href"],Be={key:1,class:"text-sm text-gray-700 dark:text-gray-300"},Ze=J(" on "),Pe=["href"],He={class:"text-xs text-gray-500"},Ye=H({props:{selectedImage:null},setup(l){const t=l,{t:n}=Z();return(o,v)=>{var i,f,g,m,k,S,h,y,z,E;return d(),_("div",Fe,[((i=t.selectedImage)==null?void 0:i.creator)?(d(),_("span",Le,[Me,$("a",{class:O([((f=t.selectedImage)==null?void 0:f.creator.url)?"link__active":"link__inactive"]),href:(g=t.selectedImage)==null?void 0:g.creator.url,rel:"noopener noreferrer",target:"_blank"},p((k=(m=t.selectedImage)==null?void 0:m.creator)==null?void 0:k.name),11,Oe)])):j("",!0),((S=t.selectedImage)==null?void 0:S.provider)?(d(),_("span",Be,[Ze,$("a",{class:O([((h=t.selectedImage)==null?void 0:h.provider.url)?"link__active":"link__inactive"]),href:(y=t.selectedImage)==null?void 0:y.provider.url,rel:"noopener noreferrer",target:"_blank"},p((E=(z=t.selectedImage)==null?void 0:z.provider)==null?void 0:E.name),11,Pe)])):j("",!0),$("p",He,p(e(n)("all_rights_of_the_image_belong_to_the_creator")),1)])}}});var De=le(Ye,[["__scopeId","data-v-a201b528"]]);const Ae={class:"text-sm"},Xe={key:0,class:""},Qe={key:0},Ie={key:1},qe={key:2},Ge={key:1},We=H({props:{clicksCount:null,shuffleCount:null,score:null,time:null},setup(l){const t=l,{t:n}=Z(),o=B(()=>{if(!t.time)return null;const v=Math.floor(t.time/(1e3*60)),i=Math.floor((t.time-v*1e3*60)/1e3),f=t.time-v*1e3*60-i*1e3;return{minutes:v,seconds:i,milliseconds:f}});return(v,i)=>(d(),_("div",Ae,[$("span",null,[J(p(e(n)("move",2))+": ",1),$("span",{class:O([t.clicksCount<=t.shuffleCount?"text-green-500":t.clicksCount<t.shuffleCount*2?"text-yellow-500":"text-red-500"])},p(t.clicksCount),3)]),e(o)?(d(),_("p",Xe,[$("span",null,p(e(n)("time"))+": ",1),e(o).minutes?(d(),_("span",Qe,p(e(o).minutes)+" "+p(e(n)("minutes").toLowerCase())+" "+p(" "),1)):j("",!0),e(o).seconds?(d(),_("span",Ie,p(e(o).seconds)+" "+p(e(n)("seconds").toLowerCase())+" "+p(" "),1)):j("",!0),e(o).milliseconds?(d(),_("span",qe,p(e(o).milliseconds)+" "+p(e(n)("milliseconds").toLowerCase()),1)):j("",!0)])):j("",!0),l.score?(d(),_("p",Ge,p(e(n)("score"))+": "+p(l.score),1)):j("",!0)]))}}),Ke={class:"mt-2 text-sm"},Je={class:"pl-2 font-bold"},et={display:"mt-1 grid"},tt=H({props:{categoryName:null},setup(l){const t=l;return(n,o)=>(d(),_("div",Ke,[$("span",Je,p(t.categoryName),1),$("div",et,[he(n.$slots,"default")])]))}}),at=H({props:{modelValue:null,images:null},emits:["update:modelValue"],setup(l,{emit:t}){const n=l,{t:o}=Z();return(v,i)=>{const f=je,g=tt,m=Te;return d(),K(m,{"model-value":n.modelValue,label:e(o)("image"),class:"w-72","onUpdate:modelValue":i[0]||(i[0]=k=>t("update:modelValue",k.toString()))},{default:Q(()=>[(d(!0),_(P,null,I(n.images,({categoryName:k,options:S})=>(d(),K(g,{key:k,"category-name":k,class:"text-dark-500"},{default:Q(()=>[(d(!0),_(P,null,I(S,h=>(d(),K(f,{key:h.url,value:h.url,label:h.label},null,8,["value","label"]))),128))]),_:2},1032,["category-name"]))),128))]),_:1},8,["model-value","label"])}}}),C="https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images",x="utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";function st(){const{t:l}=Z(),t=20,n=R(!1),o=R(0),v=B(()=>100-Math.min(100,o.value/t*100)),i=B(()=>n.value?[{categoryName:l("fate_series"),options:[{label:l("jeanne_alter"),url:`${C}/jean-alter.jpg`},{label:l("rider_5th"),url:`${C}/rider-5th.jpg`}]},{categoryName:l("eighty_six"),options:[{label:l("vladilena_milize"),url:`${C}/vladilena-milize.jpg`}]},{categoryName:l("attack_on_titan"),options:[{label:l("eren_yeager"),url:`${C}/eren-yeager.jpg`},{label:l("sasha_braus"),url:`${C}/sasha-braus.jpg`}]},{categoryName:l("evangelion"),options:[{label:l("asuka_langley_sohryu"),url:`${C}/asuka-langley-soryu.jpg`},{label:l("rei_ayanami"),url:`${C}/rei-ayanami.png`}]}]:[{categoryName:l("nature"),options:[{label:"Kamran Ch",url:`${C}/mountain.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/t/act-for-nature?${x}`},creator:{name:"Kamran Ch",url:`https://unsplash.com/@kamranch?${x}`}},{label:"David Scanlon",url:`${C}/gorilla.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/t/nature?${x}`},creator:{name:"David Scanlon",url:`https://unsplash.com/@dsartwork?${x}`}},{label:"In\xE9s \xC1lvarez Fdez",url:`${C}/wave.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/s/photos/ocean?${x}`},creator:{name:"In\xE9s \xC1lvarez Fdez",url:`https://unsplash.com/@powwpic?${x}`}}]},{categoryName:l("cat",2),options:[{label:"Pacto Visual",url:`${C}/cat_pacto-visual.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/s/photos/cat?${x}`},creator:{name:"Pacto Visual",url:`https://unsplash.com/@pactovisual?${x}`}},{label:"Georgi Benev",url:`${C}/cat_georgi-benev.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/s/photos/cat-box?${x}`},creator:{name:"georgi benev",url:`https://unsplash.com/@georgibenev97?${x}`}},{label:"Michael Sum",url:`${C}/cat_michael-sum.jpg`,provider:{name:"Unsplash",url:`https://unsplash.com/s/photos/cat?${x}`},creator:{name:"Michael Sum",url:`https://unsplash.com/@michaelsum1228?${x}`}}]}]),f=R(g());function g(){const h=ne(0,i.value.length-1),y=ne(0,i.value[h].options.length-1);return i.value[h].options[y].url}let m;function k(){n.value||(o.value+=1,clearTimeout(m),m=setTimeout(()=>o.value=0,200),o.value===t&&(n.value=!n.value,f.value=g()))}function S(h){for(let y=0;y<i.value.length;y++)for(let z=0;z<i.value[y].options.length;z++)if(i.value[y].options[z].url===h)return i.value[y].options[z]}return{worshipRatioReverse:v,selectedImageUrl:f,images:i,findImageByUrl:S,worship:k}}function nt(){const l=$e(),{data:t}=me();return ye(async({score:n})=>{if(!t.value)return null;const{data:o}=await X.from("sliding-puzzle-records").select("*").eq("user_id",t.value.id).order("score",{ascending:!0});if(!o)return null;switch(o.length<=10){case!0:return(await X.from("sliding-puzzle-records").insert({score:n,user_id:t.value.id}).single()).data;case!1:{const v=o[o.length-1];return v.score<n?null:(await X.from("sliding-puzzle-records").update({id:v.id,score:n}).single()).data}}},{onSuccess:n=>{if(!t.value)return;const{user_name:o=t.value.email,avatar_url:v=""}=t.value.user_metadata;if(!n)return;const i=l.getQueryData("sliding-puzzle-records");!i||l.setQueryData("sliding-puzzle-records",()=>[...i,se(ae({},n),{user:{user_name:o,avatar_url:v}})].sort((f,g)=>f.score-g.score))}})}function lt(){const o=R("shuffle"),v=be(ke),i=v.greater("sm"),f=v.greater("lg"),g=B(()=>f.value?140:i.value?100:60),m=nt(),{openIssueModal:k}=_e(),{t:S}=Z(),h=R(0),y=R(null),z=R(null),E=B(()=>!y.value||!z.value?null:z.value-y.value),T=B(()=>E.value?h.value+Math.floor(E.value/1e3):null),u=R([[0,0,0,0,0,0,0],[0,1,2,3,4,5,0],[0,6,7,8,9,10,0],[0,11,12,13,14,15,0],[0,16,17,18,19,20,0],[0,21,22,23,24,25,0],[0,0,0,0,0,-1,0],[0,0,0,0,0,0,0]]);ze(async()=>Y());function w(r,a,s){let c=[];const b=u.value[r-1][a],L=u.value[r+1][a],U=u.value[r][a+1],W=u.value[r][a-1];return 0<b&&b!==s&&c.push(b),0<L&&L!==s&&c.push(L),0<U&&U!==s&&c.push(U),0<W&&W!==s&&c.push(W),s&&(c=c.filter(oe=>oe!==25)),ge(1,c)[0]}async function Y(){y.value=null,z.value=null,u.value=[[0,0,0,0,0,0,0],[0,1,2,3,4,5,0],[0,6,7,8,9,10,0],[0,11,12,13,14,15,0],[0,16,17,18,19,20,0],[0,21,22,23,24,25,0],[0,0,0,0,0,-1,0],[0,0,0,0,0,0,0]],await Ce(),h.value=0,o.value="shuffle";let r;for(let a=0;a<50;a++){const s=document.getElementById("void");if(!s)return;const c=Number(s.dataset.rowidx),b=Number(s.dataset.colidx),L=w(c,b,r),U=document.getElementById(L.toString());if(!U)return;await A(U,Number(U.dataset.rowidx),Number(U.dataset.colidx),!1),r=L}o.value="ready"}function D(){let a=0;for(let s=0;s<u.value.length;s++)for(let c=0;c<u.value[s].length;c++){const b=u.value[s][c];if(b!==0){if(a===25&&b===-1)return!0;if(a+1!==b)return!1;a++}}return!0}async function A(r,a,s,c=!0){const b=F(a,s);return c&&(r.style.transition="transform linear 0.1s"),b==="top"&&(c&&(r.style.transform=`translateY(-${g.value}px)`,await V(100)),[u.value[a][s],u.value[a-1][s]]=[u.value[a-1][s],u.value[a][s]]),b==="bottom"&&(c&&(r.style.transform=`translateY(${g.value}px)`,await V(100)),[u.value[a][s],u.value[a+1][s]]=[u.value[a+1][s],u.value[a][s]]),b==="right"&&(c&&(r.style.transform=`translateX(${g.value}px)`,await V(100)),[u.value[a][s],u.value[a][s+1]]=[u.value[a][s+1],u.value[a][s]]),b==="left"&&(c&&(r.style.transform=`translateX(-${g.value}px)`,await V(100)),[u.value[a][s],u.value[a][s-1]]=[u.value[a][s-1],u.value[a][s]]),c&&(r.style.transition=""),!!b}async function V(r){await new Promise(a=>setTimeout(()=>a(!0),r))}function F(r,a){return u.value[r-1][a]===-1?"top":u.value[r+1][a]===-1?"bottom":u.value[r][a+1]===-1?"right":u.value[r][a-1]===-1?"left":null}async function q(r,a,s){if(o.value==="shuffle"||o.value==="done")return;const c=r.currentTarget;!c||!await A(c,a,s)||(y.value||(y.value=new Date().getTime()),h.value+=1,o.value==="ready"&&(o.value="playing"),!!D()&&(o.value="done",z.value=new Date().getTime(),!!T.value&&(console.log(T.value),m.mutate({score:T.value},{onError:()=>k({title:S("record_mutation_failed.title"),content:S("record_mutation_failed.content")})}))))}function G(r){const a=(r-1)%5*g.value*-1,s=Math.floor((r-1)/5)*g.value*-1;return`${a}px ${s}px`}return{SHUFFLE_COUNT:50,nodeSize:g,SIZE_X:5,SIZE_Y:5,clicksCount:h,status:o,nodes:u,score:T,time:E,computeBgPosition:G,onClickNode:q,initialize:Y}}const ot={class:"mt-20 grid gap-12 place-items-center text-dark-500 dark:text-light-500"},rt={class:"inline-block worship__inactive"},ut={class:"inline-block worship__active","aria-hidden":"true"},it={key:0,class:"w-0 h-0"},ct=["data-rowIdx","data-colIdx"],dt=["id","data-rowIdx","data-colIdx","onClick"],pt={class:"absolute inset-0 bg-black bg-opacity-50 grid place-items-center"},mt=H({setup(l){Ee(V=>({"1d359519":e(u)+"%"}));const{data:t,isLoading:n}=Ve(),{t:o}=Z(),{SHUFFLE_COUNT:v,SIZE_X:i,SIZE_Y:f,clicksCount:g,nodeSize:m,status:k,nodes:S,score:h,time:y,computeBgPosition:z,onClickNode:E,initialize:T}=lt(),{worshipRatioReverse:u,selectedImageUrl:w,findImageByUrl:Y,worship:D,images:A}=st();return xe(()=>w.value,()=>T()),(V,F)=>{const q=Ue("client-only"),G=ve;return d(),_(P,null,[N(e(Se),null,{default:Q(()=>[$("title",null,p(e(o)("sliding_puzzle"))+" | "+p(e(o)("jon_ganebskis_blog")),1)]),_:1}),$("div",ot,[$("h1",{class:"relative select-none text-3xl md:text-5xl",onClick:F[0]||(F[0]=(...r)=>e(D)&&e(D)(...r))},[$("span",rt,p(e(o)("sliding_puzzle")),1),$("span",ut,p(e(o)("sliding_puzzle")),1)]),N(at,{modelValue:e(w),"onUpdate:modelValue":F[1]||(F[1]=r=>we(w)?w.value=r:null),images:e(A)},null,8,["modelValue","images"]),N(We,{class:"min-h-20","shuffle-count":e(v),"clicks-count":e(g),time:e(y),score:e(h)},null,8,["shuffle-count","clicks-count","time","score"])]),N(q,null,{default:Q(()=>[$("div",{class:"relative grid gap-px transition-all duration-1000 ease-linear",style:M({gridTemplateRows:`auto repeat(${e(f)}, ${e(m)}px) auto`})},[$("div",{class:O(["absolute top-0 left-1/2 transform -translate-x-1/2 z-1 pointer-events-none",[e(k)==="done"?"shadow-2xl":"shadow"]]),style:M({width:`${e(i)*e(m)+e(i)}px`,height:`${e(f)*e(m)+e(f)}px`})},[$("div",{class:O(["absolute top-0 left-0 z-1 w-full h-full bg-white opacity-0",{"done__anim-mask":e(k)==="done"}])},null,2),$("div",{class:O(["w-full h-full bg-cover",[e(k)==="done"?"done__anim-image opacity-100":"opacity-0"]]),style:M({backgroundImage:`url(${e(w)})`})},null,6)],6),(d(!0),_(P,null,I(e(S),(r,a)=>(d(),_("div",{key:a,class:"grid gap-px transition-all duration-1000 ease-linear",style:M({gridTemplateColumns:`auto repeat(${e(i)}, ${e(m)}px) auto`})},[(d(!0),_(P,null,I(r,(s,c)=>(d(),_("div",{key:s},[s===0?(d(),_("div",it)):s===-1?(d(),_("div",{key:1,id:"void","data-rowIdx":a,"data-colIdx":c,style:M({width:`${e(m)}px`,height:`${e(m)}px`})},null,12,ct)):(d(),_("button",{key:2,id:s.toString(),"data-rowIdx":a,"data-colIdx":c,class:"text-white",style:M({width:`${e(m)}px`,height:`${e(m)}px`,backgroundImage:`url(${e(w)})`,backgroundSize:`${e(m)*e(i)}px ${e(m)*e(f)}px`,backgroundPosition:e(z)(s),transform:"translate(0px)"}),onClick:b=>e(E)(b,a,c)},[$("div",pt,p(e(k)==="done"?"":s),1)],12,dt))]))),128))],4))),128))],4)]),_:1}),N(Re,{class:"mt-2 text-center"}),N(De,{"selected-image":e(Y)(e(w))},null,8,["selected-image"]),N(Ne,{"is-loading":e(n),data:e(t)},null,8,["is-loading","data"]),N(G)],64)}}});var yt=le(mt,[["__scopeId","data-v-6c08d26e"]]);export{yt as default};
