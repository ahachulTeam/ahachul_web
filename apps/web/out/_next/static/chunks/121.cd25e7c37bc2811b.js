"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[121],{8121:function(e,n,r){r.r(n),r.d(n,{default:function(){return y}});var t=r(7175),o=r(1821),a=r(2262),l=r(7618),i=r(1987);let c=(e,n,r)=>{let{control:t,formState:{errors:o},setValue:a,getValues:c,setError:u,clearErrors:s}=(0,l.Gc)(),[d,p]=(0,i.useState)(void 0),[y,f]=(0,i.useState)(!1),g=(e,n)=>()=>e!==n?p(n):p(void 0),b=(0,i.useCallback)(()=>{s("categoryType"),f(!0)},[s]),v=(0,i.useCallback)(()=>{f(!1),n()},[n]),h=(0,i.useCallback)(()=>{d&&y&&a("categoryType",d),c("categoryType")?a("categoryType",c("categoryType")):(u("categoryType",{message:"호선을 입력해주세요."}),a("categoryType",void 0)),r()},[c,y,r,u,a,d]);return(0,i.useEffect)(()=>p(c("categoryType")),[e,c]),{errors:o,control:t,tempCategoryType:d,isFilterSubmitClicked:y,selectedCategoryType:c("categoryType"),handleCategoryTypeChange:g,handleOpenFilter:v,handleCloseFilter:h,handleFilterSubmit:b}};var u=r(2010),s=r(6869),d=r(2756);let p={id:"categoryType",label:"게시판",options:[{label:"자유",value:"FREE"},{label:"정보",value:"INSIGHT"},{label:"유머",value:"HUMOR"}]};function y(){var e;let{dialogRef:n,isOpen:r,onOpen:i,onClose:y}=(0,o.qY)(),{handleKeyListener:f}=(0,o.dx)(n),{errors:g,control:b,tempCategoryType:v,isFilterSubmitClicked:h,selectedCategoryType:m,handleCategoryTypeChange:x,handleOpenFilter:k,handleCloseFilter:T,handleFilterSubmit:Z}=c(r,i,y);return(0,t.BX)(t.HY,{children:[(0,t.BX)(u.Go,{type:"button","aria-haspopup":"dialog","aria-controls":"lines-filter","aria-expanded":r,"aria-selected":Boolean(m),"aria-invalid":Boolean(null==g?void 0:null===(e=g.subwayLineId)||void 0===e?void 0:e.message),onClick:k,children:[m?(0,t.tZ)("span",{children:p.options.filter(e=>e.value===m)[0].label}):(0,t.tZ)("span",{children:"어디서 일어난 일인가요?"}),(0,t.tZ)(s.e0,{})]}),(0,t.tZ)(d.R1,{ref:n,id:"category-filter",title:"카테고리를 선택해주세요",isOpen:r,closedCases:[h],onClose:T,children:(0,t.BX)(u.Y7,{role:"menu",onKeyDown:f,children:[(0,t.tZ)(l.Qr,{name:"categoryType",control:b,rules:{required:!0},render:()=>(0,t.tZ)(u.xh,{children:p.options.map(e=>(0,t.tZ)(u.Wx,{role:"menuitemradio","aria-checked":e.value===v,onClick:x(v,e.value),children:e.label},e.value))})}),(0,t.tZ)(a.zx,{label:"선택하기",type:"button",size:"md",variant:"primary",disabled:!v,onClick:Z})]})})]})}},2010:function(e,n,r){r.d(n,{Go:function(){return p},Wx:function(){return g},Y7:function(){return y},xh:function(){return f}});var t=r(5625),o=r(5722);function a(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function l(){let e=a(["\n    ",";\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 44px;\n    border: 1px solid ",";\n    border-radius: 110px;\n    color: ",";\n    background-color: ",";\n    transition: all 0.3s ease-in-out;\n\n    & > span {\n      margin-left: 25px;\n    }\n\n    & > svg {\n      margin-right: 15px;\n      transform: rotate(180deg);\n      transition: all 0.3s ease-in-out;\n\n      & > path {\n        stroke: ",";\n      }\n    }\n\n    &[aria-selected='true'] {\n      color: ",";\n      background-color: ",";\n      border-color: white;\n\n      & > svg {\n        opacity: 0;\n      }\n    }\n\n    &[aria-invalid='true'] {\n      border-color: ",";\n    }\n  "]);return l=function(){return e},e}function i(){let e=a(["\n  ","\n"]);return i=function(){return e},e}function c(){let e=a(["\n  display: flex;\n  flex-direction: column;\n"]);return c=function(){return e},e}function u(){let e=a(["\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  margin-bottom: 10px;\n"]);return u=function(){return e},e}function s(){let e=a(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 32px;\n    margin-right: 16px;\n    margin-bottom: 15px;\n    border-radius: 20px;\n    color: ",";\n    background-color: ",";\n    transition: all 0.3s ease-in-out;\n\n    &[aria-checked='true'] {\n      color: ",";\n      background-color: ",";\n    }\n  "]);return s=function(){return e},e}function d(){let e=a(["\n  ","\n"]);return d=function(){return e},e}let p=o.Z.button(i(),e=>{let{theme:n}=e;return(0,t.iv)(l(),n.fonts.regular14,n.colors.gray_19,n.colors.gray_40,n.colors.white,n.colors.gray_40,n.colors.primary,n.colors.secondary,n.colors.red_10)}),y=o.Z.div(c()),f=o.Z.div(u()),g=o.Z.button(d(),e=>{let{theme:n}=e;return(0,t.iv)(s(),n.colors.gray_53,n.colors.gray_07,n.colors.primary,n.colors.secondary)})}}]);