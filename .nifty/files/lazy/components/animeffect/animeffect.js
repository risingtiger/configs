var WhatE=function(WhatE){WhatE[WhatE["INIT"]=0]="INIT";WhatE[WhatE["SPIN"]=1]="SPIN";return WhatE}(WhatE||{});const ATTRIBUTES={prop:"",active:false};class CAnimeffect extends HTMLElement{a={...ATTRIBUTES};s={what:0};m={propa:""};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}connectedCallback(){this.a.active=this.hasAttribute('active');this.s.what=1;this.sc()}async attributeChangedCallback(name,_old_val,new_val){if(name==='active'){this.a.active=new_val==='true';this.sc()}}sc(){render(this.template(this.s,this.m),this.shadow)}template=(_s,_m)=>{return html`<style>
:host {
}

.spin {
    display: block;
    width: 100%;
    height: 100%;
    background: none;
    opacity: 0;
	transform: translate3d(0, -90px, 0);
    transition: 3s ease-out;
	transition-property: opacity, transform;

    & > .spinner {
		display: block;
		width: 100%;
		height: 100%;
		border: 3px solid #f3f3f3;
		box-sizing: border-box;
		border-radius: 50%;
		border-top-color: #0091e8;
		animation: spin 1s ease-in-out infinite;
    }
}
:host([active]) .spin {
	opacity:  1;
	transform: translate3d(0, 0, 0);
}
@starting-style {
    :host([active]) .spin {
		display: block;
        opacity: 0;
		transform: translate3d(0, -90px, 0);
    }
}
.spin.blur {
    box-shadow: 0 0 20px 20px white;
}




@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
${_s.what === 1 ? html`
<div class="spin">
    <div class="spinner"></div>
</div>
` : '' }
`}}customElements.define('c-animeffect',CAnimeffect);export{}