import{j as r}from"./utils.ag4OtbVb.js";import{r as l}from"./index.CWXBSLiN.js";import{z as s,u as c,F as d,a as p,b as u,c as f,d as h,t as x}from"./form.JoO0pxNJ.js";import{B as j}from"./button.DlpEXsww.js";import{I as w}from"./input.BC8Asylz.js";import{u as F}from"./use-toast.D-BVXOBP.js";import"./index.Cxtmh_mJ.js";import"./index.bO9abPB-.js";import"./index.CrMHok4L.js";const g=s.object({email:s.string().email({message:"Please enter a valid email address."})}),B=({buttonText:a,location:m})=>{const{toast:t}=F();l.useEffect(()=>{const e=new URL(window.location.href);e.searchParams.has("error")&&(t({title:"Something went wrong",description:e.searchParams.get("error"),variant:"destructive"}),e.searchParams.delete("error"),window.history.replaceState({},document.title,e.toString()))},[t]);const o=c({resolver:x(g),defaultValues:{email:""}}),i=e=>{const{email:n}=e;window.location.href=`${m}?email=${encodeURIComponent(n)}`};return r.jsx(d,{...o,children:r.jsxs("form",{onSubmit:o.handleSubmit(i),children:[r.jsx(p,{control:o.control,name:"email",render:({field:e})=>r.jsxs(u,{children:[r.jsx(f,{children:r.jsx(w,{type:"email",autoComplete:"off",placeholder:"name@example.com",...e})}),r.jsx(h,{})]})}),r.jsx(j,{className:"w-full mt-2",type:"submit",children:a})]})})};export{B as default};