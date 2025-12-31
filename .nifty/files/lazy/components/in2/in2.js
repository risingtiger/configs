var TypeT=function(TypeT){TypeT[TypeT["INPUT"]=0]="INPUT";TypeT[TypeT["DSELECT"]=1]="DSELECT";TypeT[TypeT["TOGGLE"]=2]="TOGGLE";return TypeT}(TypeT||{});const ATTRIBUTES={val:""};class CIn2 extends Lit_Element{a={...ATTRIBUTES};s={val:"",savingstate:0,err_msg:"",options:"",min:"",max:""};m={name:"",type:2,inputtype:"text",label:"",labelwidth:0,placeholder:""};animatehandles={view:null,edit:null};keyframes={view:null,edit:null};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}connectedCallback(){const attr_typestr=this.getAttribute("type")||"text";this.m.label=this.getAttribute("label")||"";this.m.labelwidth=parseInt(this.getAttribute("labelwidth")||"125");this.m.name=this.getAttribute("name")||"";this.m.placeholder=this.getAttribute("placeholder")||"";this.s.val=this.getAttribute("val")||"";this.s.options=this.getAttribute("options")||"";this.s.min=this.getAttribute("min")||"";this.s.max=this.getAttribute("max")||"";this.a.val=this.s.val;if(attr_typestr==="toggle"){this.m.type=2;this.m.inputtype="none"}else if(attr_typestr==="dselect"){this.m.type=1;this.m.inputtype="none"}else{this.m.type=0;this.m.inputtype=attr_typestr}this.addEventListener("click",(e)=>this.clicked(e),true);this.sc()}async attributeChangedCallback(name,oldval,newval){if(oldval===null||oldval===newval){return}const a=this.a;a[name]=newval;if(name==="val"){console.log("attributeChangedCallback oldval -> newval",oldval,newval);this.s.val=newval}if(!a.updatescheduled){a.updatescheduled=true;Promise.resolve().then(()=>{this.sc();a.updatescheduled=false})}}sc(){render(this.template(this.a,this.s,this.m),this.shadow)}clicked(_e){}focused(){if(this.m.type===0){this.shadow.querySelector(".controlel").select()}}blurred(){}keyupped(_e){}toggle_toggled(e){const el=e.currentTarget;if(this.s.val==="true"){el.classList.remove("istrue")}else{el.classList.add("istrue")}this.valchanged(el.classList.contains("istrue")?"true":"false")}toggle_keydown(e){if(e.key!==" ")return;e.preventDefault();const el=e.currentTarget;if(this.s.val==="true"){el.classList.remove("istrue")}else{el.classList.add("istrue")}this.valchanged(el.classList.contains("istrue")?"true":"false")}valchanged(newval){const oldval=this.s.val;this.setAttribute("val",newval);this.dispatchEvent(new CustomEvent("update",{detail:{name:this.m.name,newval:newval,oldval:oldval}}))}number_spinner_clicked(_e,direction){if(this.m.inputtype!=="number")return;const currentval=parseFloat(this.s.val)||0;const step=parseFloat(this.getAttribute("step")||"1");const max=this.s.max?parseFloat(this.s.max):Infinity;const min=this.s.min?parseFloat(this.s.min):-Infinity;const newval=direction==="up"?Math.min(currentval+step,max):Math.max(currentval-step,min);this.valchanged(newval.toString())}label_clicked(_e){this.shadow.querySelector(".controlel").focus()}rendercontrol(){if(this.m.type===2){return html`<span 
							class="switch ${this.s.val === 'true' ? 'istrue' : ''}"
							tabindex="0"
							@click="${(e)=>this.toggle_toggled(e)}"
							@keydown="${(e)=>this.toggle_keydown(e)}"
							class="controlel"><span class="inner"></span></span>`}else if(this.m.type===1){return html`<c-dselect 
							options="${this.getAttribute('options') || ''}" 
							@update="${(e)=>{
                this.valchanged(e.detail.newval);
            }}" 
							val="${this.s.val || 'none'}"></c-dselect>`}else if(this.m.type===0){if(this.m.name==="merchant")console.log("merchant ",this.s.val);const inputEl=html`
				<input 
							@input="${(e)=>this.valchanged(e.currentTarget.value)}"  
							@blur="${()=>this.blurred()}" 
							@focus="${()=>this.focused()}" 
							@keyup="${(e)=>this.keyupped(e)}" 
							class="controlel"
							type="${this.m.inputtype}" 
							value="${this.s.val}" 
							placeholder="${this.m.placeholder}" 
							enterkeyhint="done" 
							${this.s.min ? html`min="${this.s.min}"` : ""}
							${this.s.max ? html`max="${this.s.max}"` : ""}
							name="${this.m.name}"></input>`;if(this.m.inputtype==="number"){const currentval=parseFloat(this.s.val)||0;const max=this.s.max?parseFloat(this.s.max):Infinity;const min=this.s.min?parseFloat(this.s.min):-Infinity;const isAtMax=currentval>=max;const isAtMin=currentval<=min;return html`
				<div class="number-spinner">
					${inputEl}
					<div class="spinner-buttons">
						<button class="spinner-btn spinner-up" 
								tabindex="-1"
								@click="${(e)=>this.number_spinner_clicked(e, "up")}"
								?disabled="${isAtMax}">
							<i class="icon icon-arrowup"></i>
						</button>
						<button class="spinner-btn spinner-down" 
								tabindex="-1"
								@click="${(e)=>this.number_spinner_clicked(e, "down")}"
								?disabled="${isAtMin}">
							<i class="icon icon-arrowdown"></i>
						</button>
					</div>
				</div>`}return inputEl}}template=(_a,_s,_m)=>{return html`<style>:host {
    -webkit-font-smoothing: antialiased;
    display: flex;
    -webkit-font-smoothing: antialiased;
    position: relative;
    box-sizing: border-box;
    justify-content: space-between;
    flex-wrap: nowrap;
    text-indent: 0;
    padding-left: 0;
    height: 52px;
    border-bottom-width: 0.5px;
    border-bottom-style: solid;
    border-bottom-color: var(--bordercolor);
    padding-right: 0;
}



:host > label {
    overflow: hidden;
    text-wrap: nowrap;
    margin-right: 6px;
    font-family: var(--fontfamily);
    font-weight: 700;
    color: rgb(190 56 151);
    padding: 17px 0 0 11px;
}
:host > label::after {
    content: ":";
}


:host > section {
    position: relative;
    flex: 1;
    padding-right: 10px;
    padding-top: 6px;
    text-align: right;
    
    

	& > i.icon {
		display:block;
		position:absolute;
		padding: 13px 8px 14px 13px;
		right: 0px;
		width: 20px;
		height: 20px;
		opacity: 1;
		transition: 0.3s easeout;
		transition-property: opacity, transform;
	}
	& > i.icon::before {
		font-family: icons !important;
        font-style: normal;
        font-weight: normal !important;
        font-variant: normal;
        text-transform: none;
        -webkit-font-smoothing: antialiased;
        font-size: 18px;
		content: "\f114";
		font-size: 18px;
		color: #8b8b8b;
	}
	& > i.icon.icon-type0::before { /* input */
		content: "\f114";
	}
	& > i.icon.icon-type1::before { /* dselect */
		content: "\f114";
	}
	& > i.icon.icon-type2 { /* toggle switch */
		display: none;
	}
}
section.saving > i.icon {
	opacity: 0;
	transform: translate3d(0, 9px, 0);
}



input {
	font-size: var(--textsize);
	height: 35px;
	box-sizing: border-box;
	outline: none;
	border: none;
	border-radius: 4px;
	border: 1px solid #dcdcdc;
	padding: 9px 0px 8px 8px;
	color: #6d6d6d;
	display: block;
	margin-top: 0;
	width: 100%;
	height: 39px;
	border: none;
	text-align: right;
	transition: 0.3s ease-out;
	transition-property: filter;
}
input::placeholder {
	color: #b0b0b0;
}
input[type="date"] {
	font-family: var(--fontfamily);
	color: #6d6d6d;
	font-size: var(--textsize);
}
input[type="date"]::-webkit-calendar-picker-indicator {
	cursor: pointer;
	filter: invert(0.5);
}



c-dselect {
    padding: 10px 0 0 0;
}
c-dselect::part(instigator) {
}
section.saving c-dselect::part(instigator) {
}

span.switch {
    position: relative;
    display: inline-block;
    border-width: 1px;
    border-color: rgb(0 0 0 / 16%);
    border-style: solid;
    border-radius: 52px;
    background-color: #fff;
    width: 30px;
    height: 18px;
    user-select: none;
    margin-top: 10px;
    margin-right: 0px;
    transition: 0.4s cubic-bezier(0.73, 0.01, 0.28, 1);
    transition-property: background-color, border-color, transform;

    & > .inner {
        position: relative;
        display: block;
        width: 14px;
        height: 14px;
        margin-top: 2px;
        border-radius: 50%;
        background-color: #d9dadc;
        user-select: none;
        transform: translateX(2px);
		transition: 0.4s cubic-bezier(0.73, 0.01, 0.28, 1);
		transition-property: background-color, transform;
    }
}
span.switch.istrue {
    border-color: rgba(255, 255, 255, 0);
    background-color: #36cf90;

    & > .inner {
        background-color: white;
        transform: translateX(14px);
    }
}

c-animeffect {
	position: absolute;
	opacity: 1;
	top: 18px;
	right: 9px;
	width: 18px;
	height: 18px;
}
c-animeffect.active {
	opacity: 1;
}

c-dselect + c-animeffect {
	top: 8px;
	right: 5px;
}


span.switch + c-animeffect {
	top: 7px;
	right: 3px;
}




/* Hide spinners everywhere */
input[type=number] {
  -moz-appearance: textfield; /* Firefox */
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Chrome, Safari, Edge */
  margin: 0;
}


/* Custom number spinner buttons */
.number-spinner {
	display: flex;
	gap: 6px;
	align-items: stretch;
	width: 100%;
}

.number-spinner input {
}

.spinner-buttons {
	display: flex;
	flex-direction: column;
	gap: 2px;
	justify-content: center;
}


.spinner-btn {
	width: 16px;
	height: 15px;
	padding: 0;
	margin: 0;
	border: 1px solid #dcdcdc;
	border-radius: 3px;
	background-color: #f9f9f9;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.2s ease-out;
	transition-property: background-color, border-color, opacity;
}

.spinner-btn:hover:not(:disabled) {
	background-color: #f0f0f0;
	border-color: #b0b0b0;
}

.spinner-btn:active:not(:disabled) {
	background-color: #e8e8e8;
}

.spinner-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}




.spinner-btn i.icon {
	/* width: 6px; */
	/* height: 12px; */
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: icons !important;
	font-style: normal;
	font-weight: normal !important;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.spinner-btn.spinner-up i.icon::before {
	content: "\f119"; /* _01_arrowright1 rotated up */
	transform: rotate(-90deg);
	display: block;
	font-size: 8px;
	color: #5f5f5f;
}

.spinner-btn.spinner-down i.icon::before {
	content: "\f119"; /* _01_arrowright1 rotated down */
	transform: rotate(90deg);
	display: block;
	font-size: 8px;
	color: #5f5f5f;
}
</style>
<label class="${_s.savingstate===1 ? 'saving' : ''}" part="label" @click="${(e)=>this.label_clicked(e)}" style="width: ${_m.labelwidth}px;">${_m.label}</label>
<section class="${_s.savingstate===1 ? 'saving' : ''}">
	<!-- <i class="icon icon-type${_m.type}" @click="${(e)=>this.actionicon_clicked(e)}"></i> -->
	${_s.savingstate!==0 ? html`<c-animeffect ?active=${_s.savingstate===1}></c-animeffect>` : ''}
	${this.rendercontrol()}
</section>
`}}customElements.define('c-in2',CIn2);export{}