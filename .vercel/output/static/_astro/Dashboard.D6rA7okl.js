import{j as e,c as C}from"./utils.ag4OtbVb.js";import{r as a}from"./index.CWXBSLiN.js";import{U as H,a as F}from"./url.view-service.impl.B5UazGs6.js";import"./ui.store.V0UIaDrX.js";import{b as we,B as w}from"./button.DlpEXsww.js";import{c as E}from"./createLucideIcon.CQccyi0-.js";import{C as be,c as Q,A as Pe,a as Ne,b as Re,R as Le}from"./index.B6PmyX3Q.js";import{z as _,u as De,t as Ee,F as Se,a as q,b as Y,e as X,c as K,d as W}from"./form.JoO0pxNJ.js";import{u as G}from"./use-service.OG-UkMvg.js";import{D as Z,a as ee,b as te,c as oe,d as re,e as ne,f as se}from"./dialog.DIVVgkhT.js";import{I as U}from"./input.BC8Asylz.js";import{L as ae}from"./loader-circle.CvAbasbM.js";import{e as ke}from"./envs.CDsL9Qmw.js";import{C as Ie,a as Oe,b as J,c as _e,d as Ue}from"./card.CfIqYNeu.js";import{c as Ae,a as T,P as ie,D as Me,b as He,u as Fe}from"./index.DaBOQRUy.js";import{u as le,P as Ge,S as Ve}from"./index.Cxtmh_mJ.js";import{u as ze}from"./index.B3lKFRaG.js";import{R as Be}from"./index.Mk6t-_Xc.js";import{C as $e}from"./check.DRrj-YD9.js";import{u as qe}from"./use-toast.D-BVXOBP.js";import"./index.CrMHok4L.js";import"./x.BPQqOk2p.js";import"./index.bO9abPB-.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=E("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=E("Clipboard",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=E("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=E("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]),ce=({className:t,...r})=>e.jsx("nav",{role:"navigation","aria-label":"pagination",className:C("mx-auto flex w-full justify-center",t),...r});ce.displayName="Pagination";const de=a.forwardRef(({className:t,...r},o)=>e.jsx("ul",{ref:o,className:C("flex flex-row items-center gap-1",t),...r}));de.displayName="PaginationContent";const D=a.forwardRef(({className:t,...r},o)=>e.jsx("li",{ref:o,className:C("",t),...r}));D.displayName="PaginationItem";const S=({className:t,isActive:r,disabled:o,size:n="icon",...s})=>e.jsx("a",{"aria-current":r?"page":void 0,className:C(we({variant:r?"outline":"ghost",size:n}),o&&"pointer-events-none opacity-50",t),...s});S.displayName="PaginationLink";const ue=({className:t,disabled:r,...o})=>e.jsxs(S,{"aria-label":"Go to previous page",size:"default",className:C("gap-1 pl-2.5",r&&"pointer-events-none opacity-50",t),disabled:r,...o,children:[e.jsx(Ye,{className:"h-4 w-4"}),e.jsx("span",{children:"Previous"})]});ue.displayName="PaginationPrevious";const pe=({className:t,disabled:r,...o})=>e.jsxs(S,{"aria-label":"Go to next page",size:"default",className:C("gap-1 pr-2.5",r&&"pointer-events-none opacity-50",t),disabled:r,...o,children:[e.jsx("span",{children:"Next"}),e.jsx(be,{className:"h-4 w-4"})]});pe.displayName="PaginationNext";const Je=({currentPage:t,totalPages:r,onPageChange:o})=>{const n=()=>{t>1&&o(t-1)},s=()=>{t<r&&o(t+1)};return e.jsx(ce,{children:e.jsxs(de,{children:[e.jsx(D,{children:e.jsx(ue,{onClick:l=>{l.preventDefault(),n()},disabled:t===1})}),Array.from({length:r},(l,i)=>e.jsx(D,{children:e.jsx(S,{onClick:u=>{u.preventDefault(),o(i+1)},isActive:i+1===t,children:i+1})},i)),e.jsx(D,{children:e.jsx(pe,{onClick:l=>{l.preventDefault(),s()},disabled:t===r})})]})})},Qe=_.object({name:_.string().max(80).optional(),longUrl:_.string().url()}),Ze=()=>{const[t,r]=a.useState(!1),[o,n]=a.useState(!1),s=G(F,H),l=async u=>{const{name:c,longUrl:h}=u;n(!0),await s?.createUrl(h,c),n(!1),window.location.href="/dashboard"},i=De({resolver:Ee(Qe),defaultValues:{name:"",longUrl:""}});return e.jsxs(Z,{open:t,onOpenChange:r,children:[e.jsx(ee,{asChild:!0,children:e.jsx(w,{className:"whitespace-nowrap",children:"Shorten URL"})}),e.jsxs(te,{children:[e.jsxs(oe,{children:[e.jsx(re,{children:"Shorten URL"}),e.jsx(ne,{children:"Enter a long URL to get a shortened version."})]}),e.jsx(Se,{...i,children:e.jsxs("form",{onSubmit:i.handleSubmit(l),className:"space-y-4",children:[e.jsx(q,{control:i.control,name:"name",render:({field:u})=>e.jsxs(Y,{children:[e.jsx(X,{children:"Name (Optional)"}),e.jsx(K,{children:e.jsx(U,{type:"text",autoComplete:"off",...u})}),e.jsx(W,{})]})}),e.jsx(q,{control:i.control,name:"longUrl",render:({field:u})=>e.jsxs(Y,{children:[e.jsx(X,{children:"Long URL"}),e.jsx(K,{children:e.jsx(U,{type:"text",autoComplete:"off",...u})}),e.jsx(W,{})]})}),e.jsx(se,{children:e.jsx(w,{className:"w-full mt-2",type:"submit",children:o?e.jsxs(e.Fragment,{children:[e.jsx(ae,{className:"animate-spin"})," Loading..."]}):"Shorten URL"})})]})})]})]})},et=({button:t,action:r,callback:o,isLoading:n})=>{const[s,l]=a.useState(!1),i=()=>{o(),l(!1)};return e.jsxs(Z,{open:s,onOpenChange:l,children:[e.jsx(ee,{asChild:!0,children:t}),e.jsxs(te,{children:[e.jsxs(oe,{children:[e.jsx(re,{children:"Are you absolutely sure?"}),e.jsx(ne,{children:"This action cannot be undone."})]}),e.jsx(se,{className:"sm:justify-start",children:e.jsx(w,{variant:"destructive",className:"mt-2",type:"button",onClick:i,children:n?e.jsxs(e.Fragment,{children:[e.jsx(ae,{className:"animate-spin"})," Loading..."]}):r})})]})]})};var[k,Xt]=Ae("Tooltip",[Q]),I=Q(),he="TooltipProvider",tt=700,A="tooltip.open",[ot,V]=k(he),me=t=>{const{__scopeTooltip:r,delayDuration:o=tt,skipDelayDuration:n=300,disableHoverableContent:s=!1,children:l}=t,[i,u]=a.useState(!0),c=a.useRef(!1),h=a.useRef(0);return a.useEffect(()=>{const d=h.current;return()=>window.clearTimeout(d)},[]),e.jsx(ot,{scope:r,isOpenDelayed:i,delayDuration:o,onOpen:a.useCallback(()=>{window.clearTimeout(h.current),u(!1)},[]),onClose:a.useCallback(()=>{window.clearTimeout(h.current),h.current=window.setTimeout(()=>u(!0),n)},[n]),isPointerInTransitRef:c,onPointerInTransitChange:a.useCallback(d=>{c.current=d},[]),disableHoverableContent:s,children:l})};me.displayName=he;var O="Tooltip",[rt,L]=k(O),xe=t=>{const{__scopeTooltip:r,children:o,open:n,defaultOpen:s=!1,onOpenChange:l,disableHoverableContent:i,delayDuration:u}=t,c=V(O,t.__scopeTooltip),h=I(r),[d,x]=a.useState(null),f=ze(),m=a.useRef(0),g=i??c.disableHoverableContent,p=u??c.delayDuration,v=a.useRef(!1),[j=!1,y]=Fe({prop:n,defaultProp:s,onChange:$=>{$?(c.onOpen(),document.dispatchEvent(new CustomEvent(A))):c.onClose(),l?.($)}}),P=a.useMemo(()=>j?v.current?"delayed-open":"instant-open":"closed",[j]),N=a.useCallback(()=>{window.clearTimeout(m.current),m.current=0,v.current=!1,y(!0)},[y]),R=a.useCallback(()=>{window.clearTimeout(m.current),m.current=0,y(!1)},[y]),B=a.useCallback(()=>{window.clearTimeout(m.current),m.current=window.setTimeout(()=>{v.current=!0,y(!0),m.current=0},p)},[p,y]);return a.useEffect(()=>()=>{m.current&&(window.clearTimeout(m.current),m.current=0)},[]),e.jsx(Le,{...h,children:e.jsx(rt,{scope:r,contentId:f,open:j,stateAttribute:P,trigger:d,onTriggerChange:x,onTriggerEnter:a.useCallback(()=>{c.isOpenDelayed?B():N()},[c.isOpenDelayed,B,N]),onTriggerLeave:a.useCallback(()=>{g?R():(window.clearTimeout(m.current),m.current=0)},[R,g]),onOpen:N,onClose:R,disableHoverableContent:g,children:o})})};xe.displayName=O;var M="TooltipTrigger",fe=a.forwardRef((t,r)=>{const{__scopeTooltip:o,...n}=t,s=L(M,o),l=V(M,o),i=I(o),u=a.useRef(null),c=le(r,u,s.onTriggerChange),h=a.useRef(!1),d=a.useRef(!1),x=a.useCallback(()=>h.current=!1,[]);return a.useEffect(()=>()=>document.removeEventListener("pointerup",x),[x]),e.jsx(Pe,{asChild:!0,...i,children:e.jsx(Ge.button,{"aria-describedby":s.open?s.contentId:void 0,"data-state":s.stateAttribute,...n,ref:c,onPointerMove:T(t.onPointerMove,f=>{f.pointerType!=="touch"&&!d.current&&!l.isPointerInTransitRef.current&&(s.onTriggerEnter(),d.current=!0)}),onPointerLeave:T(t.onPointerLeave,()=>{s.onTriggerLeave(),d.current=!1}),onPointerDown:T(t.onPointerDown,()=>{h.current=!0,document.addEventListener("pointerup",x,{once:!0})}),onFocus:T(t.onFocus,()=>{h.current||s.onOpen()}),onBlur:T(t.onBlur,s.onClose),onClick:T(t.onClick,s.onClose)})})});fe.displayName=M;var z="TooltipPortal",[nt,st]=k(z,{forceMount:void 0}),ge=t=>{const{__scopeTooltip:r,forceMount:o,children:n,container:s}=t,l=L(z,r);return e.jsx(nt,{scope:r,forceMount:o,children:e.jsx(ie,{present:o||l.open,children:e.jsx(He,{asChild:!0,container:s,children:n})})})};ge.displayName=z;var b="TooltipContent",ve=a.forwardRef((t,r)=>{const o=st(b,t.__scopeTooltip),{forceMount:n=o.forceMount,side:s="top",...l}=t,i=L(b,t.__scopeTooltip);return e.jsx(ie,{present:n||i.open,children:i.disableHoverableContent?e.jsx(je,{side:s,...l,ref:r}):e.jsx(at,{side:s,...l,ref:r})})}),at=a.forwardRef((t,r)=>{const o=L(b,t.__scopeTooltip),n=V(b,t.__scopeTooltip),s=a.useRef(null),l=le(r,s),[i,u]=a.useState(null),{trigger:c,onClose:h}=o,d=s.current,{onPointerInTransitChange:x}=n,f=a.useCallback(()=>{u(null),x(!1)},[x]),m=a.useCallback((g,p)=>{const v=g.currentTarget,j={x:g.clientX,y:g.clientY},y=dt(j,v.getBoundingClientRect()),P=ut(j,y),N=pt(p.getBoundingClientRect()),R=mt([...P,...N]);u(R),x(!0)},[x]);return a.useEffect(()=>()=>f(),[f]),a.useEffect(()=>{if(c&&d){const g=v=>m(v,d),p=v=>m(v,c);return c.addEventListener("pointerleave",g),d.addEventListener("pointerleave",p),()=>{c.removeEventListener("pointerleave",g),d.removeEventListener("pointerleave",p)}}},[c,d,m,f]),a.useEffect(()=>{if(i){const g=p=>{const v=p.target,j={x:p.clientX,y:p.clientY},y=c?.contains(v)||d?.contains(v),P=!ht(j,i);y?f():P&&(f(),h())};return document.addEventListener("pointermove",g),()=>document.removeEventListener("pointermove",g)}},[c,d,i,h,f]),e.jsx(je,{...t,ref:l})}),[it,lt]=k(O,{isInside:!1}),je=a.forwardRef((t,r)=>{const{__scopeTooltip:o,children:n,"aria-label":s,onEscapeKeyDown:l,onPointerDownOutside:i,...u}=t,c=L(b,o),h=I(o),{onClose:d}=c;return a.useEffect(()=>(document.addEventListener(A,d),()=>document.removeEventListener(A,d)),[d]),a.useEffect(()=>{if(c.trigger){const x=f=>{f.target?.contains(c.trigger)&&d()};return window.addEventListener("scroll",x,{capture:!0}),()=>window.removeEventListener("scroll",x,{capture:!0})}},[c.trigger,d]),e.jsx(Me,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:l,onPointerDownOutside:i,onFocusOutside:x=>x.preventDefault(),onDismiss:d,children:e.jsxs(Ne,{"data-state":c.stateAttribute,...h,...u,ref:r,style:{...u.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[e.jsx(Ve,{children:n}),e.jsx(it,{scope:o,isInside:!0,children:e.jsx(Be,{id:c.contentId,role:"tooltip",children:s||n})})]})})});ve.displayName=b;var ye="TooltipArrow",ct=a.forwardRef((t,r)=>{const{__scopeTooltip:o,...n}=t,s=I(o);return lt(ye,o).isInside?null:e.jsx(Re,{...s,...n,ref:r})});ct.displayName=ye;function dt(t,r){const o=Math.abs(r.top-t.y),n=Math.abs(r.bottom-t.y),s=Math.abs(r.right-t.x),l=Math.abs(r.left-t.x);switch(Math.min(o,n,s,l)){case l:return"left";case s:return"right";case o:return"top";case n:return"bottom";default:throw new Error("unreachable")}}function ut(t,r,o=5){const n=[];switch(r){case"top":n.push({x:t.x-o,y:t.y+o},{x:t.x+o,y:t.y+o});break;case"bottom":n.push({x:t.x-o,y:t.y-o},{x:t.x+o,y:t.y-o});break;case"left":n.push({x:t.x+o,y:t.y-o},{x:t.x+o,y:t.y+o});break;case"right":n.push({x:t.x-o,y:t.y-o},{x:t.x-o,y:t.y+o});break}return n}function pt(t){const{top:r,right:o,bottom:n,left:s}=t;return[{x:s,y:r},{x:o,y:r},{x:o,y:n},{x:s,y:n}]}function ht(t,r){const{x:o,y:n}=t;let s=!1;for(let l=0,i=r.length-1;l<r.length;i=l++){const u=r[l].x,c=r[l].y,h=r[i].x,d=r[i].y;c>n!=d>n&&o<(h-u)*(n-c)/(d-c)+u&&(s=!s)}return s}function mt(t){const r=t.slice();return r.sort((o,n)=>o.x<n.x?-1:o.x>n.x?1:o.y<n.y?-1:o.y>n.y?1:0),xt(r)}function xt(t){if(t.length<=1)return t.slice();const r=[];for(let n=0;n<t.length;n++){const s=t[n];for(;r.length>=2;){const l=r[r.length-1],i=r[r.length-2];if((l.x-i.x)*(s.y-i.y)>=(l.y-i.y)*(s.x-i.x))r.pop();else break}r.push(s)}r.pop();const o=[];for(let n=t.length-1;n>=0;n--){const s=t[n];for(;o.length>=2;){const l=o[o.length-1],i=o[o.length-2];if((l.x-i.x)*(s.y-i.y)>=(l.y-i.y)*(s.x-i.x))o.pop();else break}o.push(s)}return o.pop(),r.length===1&&o.length===1&&r[0].x===o[0].x&&r[0].y===o[0].y?r:r.concat(o)}var ft=me,gt=xe,vt=fe,jt=ge,Ce=ve;const yt=ft,Ct=gt,Tt=vt,Te=a.forwardRef(({className:t,sideOffset:r=4,...o},n)=>e.jsx(jt,{children:e.jsx(Ce,{ref:n,sideOffset:r,className:C("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...o})}));Te.displayName=Ce.displayName;const wt=({url:t})=>{const[r,o]=a.useState(!1),[n,s]=a.useState(!1),l=G(F,H),i=()=>{navigator.clipboard.writeText(`${ke.PUBLIC_API_DOMAIN}/${t.shortId}`),o(!0),setTimeout(()=>{o(!1)},3e3)},u=async()=>{s(!0),await l?.deleteUrl(t.id),s(!1),window.location.href="/dashboard"};return e.jsxs(Ie,{children:[e.jsx(Oe,{children:e.jsxs("div",{className:"flex flex-col space-y-1.5",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[t.name&&t.name.length>30?e.jsx(yt,{children:e.jsxs(Ct,{children:[e.jsx(Tt,{asChild:!0,children:e.jsx(J,{className:"text-lg truncate flex-1",children:t.name})}),e.jsx(Te,{children:e.jsx("p",{children:t.name})})]})}):e.jsx(J,{className:"text-lg truncate flex-1",children:t.name||t.shortId}),t.name&&e.jsx("span",{className:"text-sm text-muted-foreground shrink-0",children:t.shortId})]}),e.jsx(_e,{className:"truncate",children:t.originalUrl})]})}),e.jsxs(Ue,{className:"flex justify-between",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx(w,{variant:"outline",size:"sm",onClick:i,children:r?e.jsx($e,{className:"text-green-500"}):e.jsx(Xe,{})}),e.jsx(w,{variant:"outline",size:"sm",onClick:()=>window.open(t.originalUrl,"_blank"),children:e.jsx(Ke,{})})]}),e.jsx(et,{action:"Delete URL",button:e.jsx(w,{className:"border-red-500",variant:"outline",size:"sm",children:e.jsx(We,{className:"text-red-500"})}),callback:u,isLoading:n})]})]},t.id)},bt=({searchTerm:t,handleSearchChange:r})=>e.jsx("div",{className:"flex-grow",children:e.jsx(U,{type:"text",placeholder:"Search URLs...",value:t,onChange:r,className:"w-full"})}),Kt=({page:t})=>{const[r,o]=a.useState(t.items),[n,s]=a.useState(""),[l,i]=a.useState(t.page),[u,c]=a.useState(t.totalPages),h=G(F,H),{toast:d}=qe();a.useEffect(()=>{const p=new URL(window.location.href);p.searchParams.get("updated-password")==="true"&&(d({title:"Password updated 🎉",description:"Your password has been successfully updated"}),p.searchParams.delete("updated-password"),window.history.replaceState({},document.title,p.toString()))},[d]);const x=9,f=async(p,v)=>{const j=await h.getUrls(p,x,v);j&&(o(j.items),c(j.totalPages))},m=p=>{s(p.target.value),i(1),t.total>0&&f(1,p.target.value)},g=p=>{i(p),f(p,n)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between items-center mb-6 gap-4",children:[e.jsx(bt,{searchTerm:n,handleSearchChange:m}),e.jsx(Ze,{})]}),r.length===0?n&&t.total>0?e.jsxs("p",{className:"px-8 text-center text-sm text-muted-foreground",children:['No URLs found matching "',e.jsx("strong",{children:n}),'". Please try a different search term']}):e.jsxs("p",{className:"px-8 text-center text-sm text-muted-foreground",children:["You haven't shortened any URLs yet. Click the ",e.jsx("strong",{children:'"Shorten URL"'})," button to shorten your first URL"]}):e.jsxs("div",{children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:r.map(p=>e.jsx(wt,{url:p},p.id))}),e.jsx("div",{className:"mt-6",children:e.jsx(Je,{currentPage:l,totalPages:u,onPageChange:g})})]})]})};export{Kt as default};