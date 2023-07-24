"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[367],{367:function(n,e,t){t.d(e,{$8:function(){return nD},p8:function(){return c},B6:function(){return o},Dr:function(){return u},Gk:function(){return nb}});var r=t(7175),i=t(782);let c=()=>(0,r.tZ)(i.h,{title:"온도조절",hasGoBack:!0,children:(0,r.tZ)(i.h.TempSave,{onClick:()=>console.log("save")})});var l=t(7909);let o=()=>{let{query:{id:n}}=(0,l.useRouter)();return(0,r.tZ)("div",{children:n})},u=()=>(0,r.tZ)(i.h,{title:"지하철 민원 서비스 아하철",invisibleTitle:!0,children:(0,r.tZ)(i.h.Alarm,{})});var a=t(5625),f=t(1279),d=t.n(f),s=t(1987),p=t(2559),h=t.n(p),v=t(5722);function b(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function Z(){let n=b(["\n    position: relative;\n    width: 100%;\n    min-height: 114px;\n    padding: 10px 16px;\n    border-radius: 20px;\n    overflow: hidden;\n    cursor: pointer;\n\n    ",";\n    ",";\n    ",";\n\n    & > h4 {\n      ",";\n      margin-bottom: 4px;\n    }\n\n    & > pre {\n      ",";\n      font-family: Pretendard;\n    }\n  "]);return Z=function(){return n},n}function g(){let n=b(["\n  ","\n"]);return g=function(){return n},n}function m(){let n=b(["\n    border: none;\n    background-color: ",";\n  "]);return m=function(){return n},n}function x(){let n=b(["\n    border: 1px solid ",";\n    background-color: ",";\n  "]);return x=function(){return n},n}function j(){let n=b(["\n    border: none;\n    background-color: ",";\n  "]);return j=function(){return n},n}let O=v.Z.article(g(),n=>{let{theme:e,variant:t}=n;return(0,a.iv)(Z(),"primary"===t&&w.primary(e),"secondary"===t&&w.secondary(e),"inactive"===t&&w.inactive(e),e.fonts.bold18,e.fonts.regular12)}),w={primary:n=>(0,a.iv)(m(),n.colors.secondary),secondary:n=>(0,a.iv)(x(),n.colors.gray_19_05,n.colors.white),inactive:n=>(0,a.iv)(j(),n.colors.gray_10)};var y=t(2652);let z=n=>{let{className:e,title:t,content:i,variant:c,tabId:l,children:o}=n;return(0,r.tZ)(h(),{href:"".concat(y.mD.COMPLAINTS,"/").concat(l),css:{all:"unset"},children:(0,r.BX)(O,{variant:c,className:e,children:[(0,r.tZ)("h4",{children:t}),(0,r.tZ)("pre",{children:i}),o]})})};function P(){var n,e;let t=(n=["\n  position: absolute;\n  bottom: 0;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return P=function(){return t},t}let k=v.Z.div(P()),C=n=>{let{overrideCss:e,children:t}=n;return(0,r.tZ)(k,{css:e,children:t})};function B(){var n,e;let t=(n=["\n  bottom: 10.1px;\n  right: 9.5px;\n  width: 54.5px;\n  height: 46.9px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return B=function(){return t},t}let _=()=>(0,r.tZ)(z,{title:"응급환자",content:"열차 내 응급환자\n긴급 신고하기",variant:"secondary",tabId:"patient",children:(0,r.tZ)(C,{overrideCss:I,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c3.svg",alt:""})})}),I=(0,a.iv)(B());function X(){var n,e;let t=(n=["\n  right: 12.32px;\n  width: 147.68px;\n  height: 95.99px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return X=function(){return t},t}let D=()=>(0,r.tZ)(z,{title:"성추행",content:"열차 내 성폭력, 몰래카메라 등 \n발생시 신고하기",variant:"primary",tabId:"sexual",css:{minHeight:"100%"},children:(0,r.tZ)(C,{overrideCss:N,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c7.svg",alt:""})})}),N=(0,a.iv)(X());function A(){var n,e;let t=(n=["\n  bottom: 5.68px;\n  right: 21.8px;\n  width: 30.2px;\n  height: 56.32px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return A=function(){return t},t}let E=()=>(0,r.tZ)(z,{title:"폭력",content:"열차 내 폭행(싸움)\n발생시 신고하기",variant:"secondary",tabId:"violence",children:(0,r.tZ)(C,{overrideCss:R,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c4.svg",alt:""})})}),R=(0,a.iv)(A());function T(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function G(){let n=T(["\n  margin-bottom: 25px;\n"]);return G=function(){return n},n}function S(){let n=T(["\n    ",";\n    margin-bottom: 12px;\n  "]);return S=function(){return n},n}function q(){let n=T(["\n  ","\n"]);return q=function(){return n},n}function H(){let n=T(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(2, 1fr);\n  column-gap: 15px;\n  row-gap: 18px;\n  width: 100%;\n\n  & > li:nth-of-type(2) {\n    grid-column: 2 / 3;\n    grid-row: 1 / 3;\n  }\n"]);return H=function(){return n},n}let L=v.Z.div(G()),M=v.Z.h3(q(),n=>{let{theme:e}=n;return(0,a.iv)(S(),e.fonts.bold16)}),U=v.Z.ul(H()),$=()=>(0,r.BX)(L,{children:[(0,r.tZ)(M,{children:"긴급상황 \uD83D\uDEA8"}),(0,r.BX)(U,{children:[(0,r.tZ)("li",{children:(0,r.tZ)(_,{})}),(0,r.tZ)("li",{children:(0,r.tZ)(D,{})}),(0,r.tZ)("li",{children:(0,r.tZ)(E,{})})]})]});function F(){var n,e;let t=(n=["\n  right: -4.92px;\n  width: 74.92px;\n  height: 63.53px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return F=function(){return t},t}let J=()=>(0,r.tZ)(z,{title:"질서저해",content:"취객, 노숙, 구걸, 소란\n열차 내 질서저해",variant:"secondary",tabId:"impediment",children:(0,r.tZ)(C,{overrideCss:K,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c6.svg",alt:""})})}),K=(0,a.iv)(F());function Q(){var n,e;let t=(n=["\n  bottom: 7.59px;\n  right: 16.78px;\n  width: 46.22px;\n  height: 42.93px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return Q=function(){return t},t}let V=()=>(0,r.tZ)(z,{title:"시설 \xb7 환경민원",content:"토사물, 오물, 객실환기\n각종 환경민원",variant:"secondary",tabId:"facilities",children:(0,r.tZ)(C,{overrideCss:W,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c1.svg",alt:""})})}),W=(0,a.iv)(Q());function Y(){var n,e;let t=(n=["\n  right: 10.41px;\n  width: 73.59px;\n  height: 100%;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return Y=function(){return t},t}let nn=()=>(0,r.tZ)(z,{title:"온도조절",content:"너무 덥거나\n너무 추울때",variant:"primary",tabId:"temperature",children:(0,r.tZ)(C,{overrideCss:ne,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c5.svg",alt:""})})}),ne=(0,a.iv)(Y());function nt(){var n,e;let t=(n=["\n  bottom: 5.48px;\n  right: 12px;\n  width: 50px;\n  height: 50.52px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return nt=function(){return t},t}let nr=()=>(0,r.tZ)(z,{title:"안내방송",content:"방송 불량, 음량문제\n요청까지 한번에",variant:"primary",tabId:"announcement",children:(0,r.tZ)(C,{overrideCss:ni,children:(0,r.tZ)(d(),{fill:!0,priority:!0,src:"illust/c2.svg",alt:""})})}),ni=(0,a.iv)(nt());function nc(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function nl(){let n=nc(["\n  margin-bottom: 25px;\n"]);return nl=function(){return n},n}function no(){let n=nc(["\n    ",";\n    margin-bottom: 12px;\n  "]);return no=function(){return n},n}function nu(){let n=nc(["\n  ","\n"]);return nu=function(){return n},n}function na(){let n=nc(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  column-gap: 15px;\n  row-gap: 18px;\n  width: 100%;\n"]);return na=function(){return n},n}let nf=v.Z.div(nl()),nd=v.Z.h3(nu(),n=>{let{theme:e}=n;return(0,a.iv)(no(),e.fonts.bold16)}),ns=v.Z.ul(na()),np=()=>(0,r.BX)(nf,{children:[(0,r.tZ)(nd,{children:"지하철 환경"}),(0,r.BX)(ns,{children:[(0,r.tZ)("li",{children:(0,r.tZ)(V,{})}),(0,r.tZ)("li",{children:(0,r.tZ)(nn,{})}),(0,r.tZ)("li",{children:(0,r.tZ)(nr,{})}),(0,r.tZ)("li",{children:(0,r.tZ)(J,{})})]})]});function nh(){var n,e;let t=(n=["\n  padding: 20px 16px;\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return nh=function(){return t},t}let nv=v.Z.section(nh()),nb=()=>(0,r.BX)(nv,{children:[(0,r.tZ)(np,{}),(0,r.tZ)($,{})]});function nZ(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function ng(){let n=nZ(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"]);return ng=function(){return n},n}function nm(){let n=nZ(["\n    ",";\n    color: ",";\n    margin-bottom: 24px;\n  "]);return nm=function(){return n},n}function nx(){let n=nZ(["\n  ","\n"]);return nx=function(){return n},n}function nj(){let n=nZ(["\n  width: 100%;\n"]);return nj=function(){return n},n}function nO(){let n=nZ(["\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    margin-bottom: 10px;\n\n    & > span {\n      ",";\n      color: ",";\n    }\n  "]);return nO=function(){return n},n}function nw(){let n=nZ(["\n  ","\n"]);return nw=function(){return n},n}function ny(){let n=nZ(["\n    ",";\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 32px;\n    border-radius: 20px;\n    padding: 0 18px;\n    color: ",";\n    background-color: ",";\n    transition: all 0.3s ease-in-out;\n\n    @media (hover: hover) {\n      &:not(:disabled):hover {\n        color: ",";\n        background-color: ",";\n      }\n    }\n\n    &:active {\n      color: ",";\n      background-color: ",";\n    }\n  "]);return ny=function(){return n},n}function nz(){let n=nZ(["\n  ","\n"]);return nz=function(){return n},n}let nP=v.Z.div(ng()),nk=v.Z.h5(nx(),n=>{let{theme:e}=n;return(0,a.iv)(nm(),e.fonts.thin23,e.colors.primary)}),nC=v.Z.ul(nj()),nB=v.Z.li(nw(),n=>{let{theme:e}=n;return(0,a.iv)(nO(),e.fonts.regular14,e.colors.black)}),n_=v.Z.a(nz(),n=>{let{theme:e}=n;return(0,a.iv)(ny(),e.fonts.regular12,e.colors.gray_53,e.colors.gray_10,e.colors.white,e.colors.primary,e.colors.white,e.colors.primary)});var nI=t(2756),nX=t(5001),nD=(0,s.forwardRef)(function(n,e){let{isOpen:t,onClose:i}=n;return(0,r.tZ)(nI.R1,{ref:e,title:"콜센터 신고",isOpen:t,onClose:i,children:(0,r.BX)(nP,{children:[(0,r.tZ)(nk,{children:"저희가 더 준비하겠습니다!"}),(0,r.tZ)(nC,{children:nX.U.map(n=>(0,r.BX)(nB,{children:[(0,r.tZ)("span",{children:n.label}),(0,r.tZ)(n_,{href:"tel:".concat(n.callNumber),children:"연결하기"})]},n.id))})]})})})}}]);