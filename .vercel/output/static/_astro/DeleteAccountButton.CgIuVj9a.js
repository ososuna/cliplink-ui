import{j as e}from"./utils.ag4OtbVb.js";import{z as o,u as n,F as m,a as l,b as d,e as u,c as h,d as p,t as x}from"./form.CVx5lfpo.js";import{B as t}from"./button.D_Iz6kOH.js";import{D as f,a as j,b as y,c as g,d as v,e as D,f as b}from"./dialog.B_9hdVc3.js";import{I as F}from"./input.BC8Asylz.js";import{u as A}from"./use-service.OG-UkMvg.js";import{A as S,a as T}from"./auth.view-service.impl.BxHa1p8t.js";import"./ui.store.V0UIaDrX.js";import{c as w}from"./createLucideIcon.CQccyi0-.js";import"./index.CWXBSLiN.js";import"./index.DttyIPLX.js";import"./index.l-XZqF8a.js";import"./index.CrMHok4L.js";import"./index.CX4zb87W.js";import"./index.aLrDYkXN.js";import"./x.BPQqOk2p.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=w("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),s="Delete my account",I=o.object({confirm:o.string().refine(r=>r.toLowerCase()===s.toLowerCase(),{message:`Please type "${s}" to confirm`})}),O=()=>{const r=n({resolver:x(I),defaultValues:{confirm:""}}),a=A(T,S),i=async()=>{await a.deleteAccount()};return e.jsxs(f,{children:[e.jsx(j,{asChild:!0,children:e.jsxs(t,{className:"border-red-500 mt-5",variant:"outline",children:[e.jsx(k,{className:"mr-2 h-4 w-4 text-red-500"}),e.jsx("span",{className:"text-red-500",children:"Delete Account"})]})}),e.jsxs(y,{children:[e.jsxs(g,{children:[e.jsx(v,{children:"Are you absolutely sure?"}),e.jsxs(D,{children:["This action cannot be undone. This will permanently delete your account and remove your data from our servers. Type ",e.jsxs("strong",{children:['"',s,'"']})," to confirm."]})]}),e.jsx(m,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(i),className:"space-y-4",children:[e.jsx(l,{control:r.control,name:"confirm",render:({field:c})=>e.jsxs(d,{children:[e.jsx(u,{children:"Type to confirm"}),e.jsx(h,{children:e.jsx(F,{...c})}),e.jsx(p,{})]})}),e.jsx(b,{className:"sm:justify-start",children:e.jsx(t,{variant:"destructive",className:"mt-2",type:"submit",children:"Delete Account"})})]})})]})]})};export{O as default};
