"use strict";(self.webpackChunkspendion=self.webpackChunkspendion||[]).push([[796],{2796:(y,m,e)=>{e.r(m),e.d(m,{SignupComponent:()=>U});var _=e(6814),u=e(2032),i=e(9157),E=e(617),O=e(6385),g=e(2296),v=e(2939),d=e(5940),t=e(6223),C=e(9862),c=e(2333),l=e(1896),f=e(4532),P=e(1945),n=e(5879);function M(r,s){1&r&&(n.TgZ(0,"div",12),n._UZ(1,"mat-spinner",13),n.qZA())}const I=function(){return["/login"]};let U=(()=>{var r;class s{constructor(a,o,p){this._AuthSvc=a,this._utilSvc=o,this.router=p,this.form=new t.cw({firstName:new t.NI("",[t.kI.required,t.kI.minLength(3)]),lastName:new t.NI("",[t.kI.required,t.kI.minLength(3)]),email:new t.NI("",[t.kI.required,t.kI.email]),password:new t.NI("",[t.kI.required,t.kI.minLength(6),t.kI.maxLength(16)])}),this.loading=!1}signup(){const a=this.buildUserObject();this.callSignUpService(a)}buildUserObject(){return{firstName:this.form.controls.firstName.value,lastName:this.form.controls.lastName.value,email:this.form.controls.email.value,password:this.form.controls.password.value}}callSignUpService(a){this.loading=!0,this._AuthSvc.signup(a).subscribe({next:o=>this.handleResponse(o),error:o=>this.handleError(o)})}handleResponse(a){this._utilSvc.openSnackBar("Signup success","Close"),this.loading=!1,localStorage.setItem("token",a.token),localStorage.setItem("person",JSON.stringify(a.person)),this.router.navigate(["/home"])}handleError(a){this._utilSvc.openSnackBar(a.error.msj,"Close"),this.loading=!1}}return(r=s).\u0275fac=function(a){return new(a||r)(n.Y36(c.e),n.Y36(f.F),n.Y36(l.F0))},r.\u0275cmp=n.Xpm({type:r,selectors:[["app-signup"]],standalone:!0,features:[n._Bn([c.e,f.F]),n.jDz],decls:31,vars:7,consts:[[1,"container"],[1,"wrapper"],[3,"formGroup","ngSubmit","keyup.enter"],[1,"form-group"],["matInput","","type","text","placeholder","Ex: John","formControlName","firstName"],["matInput","","type","text","placeholder","Ex: Smith","formControlName","lastName"],["matInput","","type","email","placeholder","Ex: jsmith@gmail.com","formControlName","email",3,"readonly"],["matInput","","type","password","placeholder","******","formControlName","password",3,"readonly"],["mat-raised-button","","type","submit","color","primary",3,"disabled"],["class","spinner",4,"ngIf"],[1,"login-wrapper"],["mat-stroked-button","","color","primary",3,"routerLink"],[1,"spinner"],["mode","indeterminate","color","primary","diameter","40"]],template:function(a,o){1&a&&(n.TgZ(0,"div",0)(1,"div",1)(2,"form",2),n.NdJ("ngSubmit",function(){return o.signup()})("keyup.enter",function(){return o.signup()}),n._UZ(3,"app-logo"),n.TgZ(4,"h3"),n._uU(5,"Signup"),n.qZA(),n.TgZ(6,"div",3)(7,"mat-form-field")(8,"mat-label"),n._uU(9,"First name"),n.qZA(),n._UZ(10,"input",4),n.qZA(),n.TgZ(11,"mat-form-field")(12,"mat-label"),n._uU(13,"Last name"),n.qZA(),n._UZ(14,"input",5),n.qZA()(),n.TgZ(15,"mat-form-field")(16,"mat-label"),n._uU(17,"Email"),n.qZA(),n._UZ(18,"input",6),n.qZA(),n.TgZ(19,"mat-form-field")(20,"mat-label"),n._uU(21,"Password"),n.qZA(),n._UZ(22,"input",7),n.qZA(),n.TgZ(23,"button",8),n._uU(24,"Sign up"),n.qZA(),n.YNc(25,M,2,0,"div",9),n.qZA(),n.TgZ(26,"div",10)(27,"span"),n._uU(28,"Do you have an account?"),n.qZA(),n.TgZ(29,"button",11),n._uU(30,"Login"),n.qZA()()()()),2&a&&(n.xp6(2),n.Q6J("formGroup",o.form),n.xp6(16),n.Q6J("readonly",o.loading),n.xp6(4),n.Q6J("readonly",o.loading),n.xp6(1),n.Q6J("disabled",o.form.invalid||o.loading),n.xp6(2),n.Q6J("ngIf",o.loading),n.xp6(4),n.Q6J("routerLink",n.DdM(6,I)))},dependencies:[_.ez,_.O5,u.c,u.Nt,i.KE,i.hX,i.lN,E.Ps,O.t,g.ot,g.lW,v.ZX,d.Cq,d.Ou,t.UX,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,C.JF,l.Bz,l.rH,P.R],styles:[".container[_ngcontent-%COMP%]{width:100%;height:100vh;display:flex;justify-content:center;align-items:center;gap:20px}.wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;background:white;border:1px solid rgba(0,0,0,.2);border-radius:7px;padding:20px}form[_ngcontent-%COMP%]{margin:0 auto;width:450px;display:flex;flex-direction:column;text-align:center}.signup-option[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:20px;gap:20px}h3[_ngcontent-%COMP%]{color:#424242}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;margin-top:20px}.form-group[_ngcontent-%COMP%]{display:flex;gap:20px}.login-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:20px}@media screen and (max-width: 480px){.container[_ngcontent-%COMP%]{position:relative;top:0;left:0;transform:translate(0)}.wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:73%}form[_ngcontent-%COMP%]{width:100%}}"]}),s})()}}]);