var ModeT=function(ModeT){ModeT[ModeT["INERT"]=0]="INERT";ModeT[ModeT["SAVING"]=1]="SAVING";ModeT[ModeT["SAVED"]=2]="SAVED";return ModeT}(ModeT||{});const ATTRIBUTES={val:""};class CForm2 extends HTMLElement{a={...ATTRIBUTES};s;m;shadow;constructor(){super();this.shadow=this.attachShadow({mode:'open'});this.s={mode:0};this.m={propa:true};this.shadow.addEventListener('keydown',(e)=>{const ke=e;if(ke.key==='Enter'){ke.preventDefault();this.submitForm()}})}connectedCallback(){this.sc()}async attributeChangedCallback(name,oldval,newval){if(oldval===null)return;const a=this.a;a[name]=newval;if(!a.updatescheduled){a.updatescheduled=true;Promise.resolve().then(()=>{this.sc();a.updatescheduled=false})}}submitForm(){console.log("ya");this.s.mode=1;this.sc()}sc(){render(this.template(),this.shadow)}template=()=>{return html`<style>

:host {
}

form {
}



</style>
<!-- <div class="formwrap"> -->
	<slot></slot>
<!-- </div> -->
`}}customElements.define('c-form2',CForm2);export{}