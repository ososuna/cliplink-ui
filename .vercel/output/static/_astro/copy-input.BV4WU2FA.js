import{j as e,c}from"./utils.ag4OtbVb.js";import{r as n}from"./index.CWXBSLiN.js";import{I as p}from"./input.BC8Asylz.js";import{C as u}from"./check.DRrj-YD9.js";import{c as m}from"./createLucideIcon.CQccyi0-.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=m("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);function g({value:t,className:s,...o}){const[a,r]=n.useState(!1),i=async()=>{await navigator.clipboard.writeText(t),r(!0),setTimeout(()=>r(!1),2e3)};return e.jsxs("div",{className:"relative group",children:[e.jsx(p,{type:"text",readOnly:!0,value:t,className:c("pr-10 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",s),onClick:i,...o}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none","aria-hidden":"true",children:a?e.jsx(u,{className:"h-4 w-4 text-green-500"}):e.jsx(x,{className:"h-4 w-4 text-gray-500 group-hover:text-gray-700"})})]})}export{g as CopyInput};
