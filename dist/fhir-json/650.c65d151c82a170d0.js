"use strict";(self.webpackChunkfhir_json=self.webpackChunkfhir_json||[]).push([[650],{5860:(F,p,e)=>{e.d(p,{F:()=>u,o:()=>i});const u="http://test.fhir.org/r4/",i="#/definitions/"},1033:(F,p,e)=>{e.d(p,{a:()=>m});var u=e(8306),i=e(4742),t=e(8421),y=e(7669),C=e(5403),R=e(3268),x=e(1810),n=e(4004),c=e(5860),o=e(1223),g=e(520);let m=(()=>{class s{constructor(r){this.http=r}getResource(r){return this.http.get(`${c.F}${r}`)}getResourceList(r){return this.http.get(`${c.F}${r}?_count=20&_summary=true`).pipe((0,n.U)(a=>a.entry))}getBoundlesSample(){const r=["Patient","Practitioner","Organization","Medication"],a=[];return r.forEach(d=>{a.push(this.http.get(`${c.F}?_type=${d}&_summary=count`))}),function O(...s){const f=(0,y.jO)(s),{args:r,keys:a}=(0,i.D)(s),d=new u.y(h=>{const{length:l}=r;if(!l)return void h.complete();const M=new Array(l);let T=l,A=l;for(let v=0;v<l;v++){let P=!1;(0,t.Xf)(r[v]).subscribe(new C.Q(h,S=>{P||(P=!0,A--),M[v]=S},()=>T--,void 0,()=>{(!T||!P)&&(A||h.next(a?(0,x.n)(a,M):M),h.complete())}))}});return f?d.pipe((0,R.Z)(f)):d}(a).pipe((0,n.U)(d=>d.map((h,l)=>({type:r[l],total:h.total}))))}}return s.\u0275fac=function(r){return new(r||s)(o.LFG(g.eN))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},2650:(F,p,e)=>{e.r(p),e.d(p,{ResourceModule:()=>O});var u=e(9808),i=e(1196),t=e(1223),y=e(1033);function C(n,c){if(1&n){const o=t.EpF();t.TgZ(0,"span",3),t.NdJ("click",function(){const s=t.CHM(o).$implicit;return t.oxw().goTo(s)}),t.TgZ(1,"i"),t._uU(2),t.qZA(),t._uU(3),t.qZA()}if(2&n){const o=c.$implicit;t.xp6(2),t.Oqu(o.total),t.xp6(1),t.hij(" ",o.type," ")}}const x=[{path:"",component:(()=>{class n{constructor(o,g,m){this.fhirGet=o,this.router=g,this.route=m}ngOnInit(){this.fhirGet.getBoundlesSample().subscribe(o=>this.resourceManaged=o)}goTo(o){this.router.navigate(["resource","list"],{queryParams:{type:o.type},relativeTo:this.route})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(y.a),t.Y36(i.F0),t.Y36(i.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-resources-page"]],decls:4,vars:1,consts:[[1,"title"],[1,"content"],["class","chip",3,"click",4,"ngFor","ngForOf"],[1,"chip",3,"click"]],template:function(o,g){1&o&&(t.TgZ(0,"div",0),t._uU(1,"Select a resource"),t.qZA(),t.TgZ(2,"div",1),t.YNc(3,C,4,2,"span",2),t.qZA()),2&o&&(t.xp6(3),t.Q6J("ngForOf",g.resourceManaged))},directives:[u.sg],styles:["[_nghost-%COMP%]{padding:12px;display:block}.content[_ngcontent-%COMP%]{padding:12px 0}.content[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]{margin:0 5px 3px 0}.chip[_ngcontent-%COMP%]{display:inline-block;background:#e0e0e0;padding:0 12px;border-radius:32px;font-size:13px;cursor:pointer}.chip[_ngcontent-%COMP%]:hover{background:#ccc}.chip[_ngcontent-%COMP%], i[_ngcontent-%COMP%]{height:32px;line-height:32px}i[_ngcontent-%COMP%]{display:block;float:left;background:black;font-size:12px;width:32px;border-radius:50%;text-align:center;color:#fff;margin:0 8px 0 -12px}"]}),n})()},{path:"resource",loadChildren:()=>e.e(872).then(e.bind(e,8872)).then(n=>n.DynamicLoaderModule)}];let O=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[],imports:[[u.ez,i.Bz.forChild(x)]]}),n})()}}]);