import{H as c,C as n}from"./use-service.OG-UkMvg.js";import{s as o}from"./ui.store.V0UIaDrX.js";class l{constructor(r,e,t){this.name=r,this.originalUrl=e,this.userId=t}static create(r){const{name:e,originalUrl:t,userId:s}=r;return t?[void 0,new l(e,t,s)]:["missing original url",void 0]}}class u{constructor(r){this.urlService=r}async execute(r){return await this.urlService.create(r)}}class h{constructor(r){this.urlService=r}async execute(r,e,t){return await this.urlService.getUrls(r,e,t)}}class U{constructor(r){this.urlService=r}async execute(r){await this.urlService.delete(r)}}class v{create(r){return c.post("/url",r)}getUrls(r,e,t){return c.get(`/url?page=${r}&limit=${e}&search=${t}`)}delete(r){return c.delete(`/url/${r}`)}}class g{constructor(r,e=o){this.urlService=r,this.notifyUiError=e}handleError=r=>{r instanceof n&&this.notifyUiError({type:"error",message:r.message}),this.notifyUiError({type:"error",message:"Please try again later. If the issue persists talk to the admin."})};async createUrl(r,e){const[t,s]=l.create({originalUrl:r,name:e});if(!t)return new u(this.urlService).execute(s).then(a=>a).catch(a=>{this.handleError(a)})}async getUrls(r,e,t=""){return new h(this.urlService).execute(r,e,t).then(s=>s).catch(this.handleError)}async deleteUrl(r){return new U(this.urlService).execute(r).catch(this.handleError)}}export{g as U,v as a};
