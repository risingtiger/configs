const ATTRIBUTES={propa:""};class VPMachineNnotification extends HTMLElement{a={...ATTRIBUTES};s={errRows:[]};m={propa:""};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}ingest=()=>{};AddNotification(title,errmsg,ts,bitName,type){if(!this.s.errRows.find((err)=>err.bitName===bitName)){const errRowData={bitName:bitName,msg:errmsg,title:title,ts:ts,datetime:new Date(ts*1000).toLocaleString(),element:null};this.s.errRows.unshift(errRowData);const errRowEl=document.createElement('div');errRowEl.className='errrow '+type;const titleEl=document.createElement('div');titleEl.className='errrowtitle';titleEl.textContent=errRowData.title;const msgEl=document.createElement('div');msgEl.className='errrowmsg';msgEl.textContent=errRowData.msg;const datetimeEl=document.createElement('div');datetimeEl.className='errrowdatetime';datetimeEl.textContent=errRowData.datetime;const closeBtn=document.createElement('button');closeBtn.className='close-btn';closeBtn.textContent='×';closeBtn.addEventListener('click',()=>this.DismissAlert(bitName));errRowEl.appendChild(titleEl);errRowEl.appendChild(msgEl);errRowEl.appendChild(datetimeEl);errRowEl.appendChild(closeBtn);errRowData.element=errRowEl;const containerEl=this.shadow.querySelector('.errrow-container');containerEl.style.height=`${this.s.errRows.length * 85}px`;containerEl.insertBefore(errRowEl,containerEl.firstChild);setTimeout(()=>{errRowEl.setAttribute('active','')},30)}this.setAttribute('active','')}DismissAlert(bitName){const index=this.s.errRows.findIndex((err)=>err.bitName===bitName);if(index>-1){const errRowData=this.s.errRows[index];const errRowEl=errRowData.element;if(errRowEl){errRowEl.classList.add('exit');errRowEl.addEventListener('transitionend',()=>{errRowEl.remove();this.s.errRows.splice(index,1);const containerEl=this.shadow.querySelector('.errrow-container');containerEl.style.height=`${this.s.errRows.length * 85}px`;if(this.s.errRows.length===0){this.removeAttribute('active')}},{once:true})}}}async render(){render(this.template(),this.shadow)}template=()=>{return html`<style>
:host {
	width: 80%;
	margin-left: -40%;
	box-sizing: border-box;
	bottom: 20px;
}

.errrow-container {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: flex-end;
	/* background:rgba(128, 128, 128, 0.39); */
}
.errrow {
	color: white;
	padding: 0 32px;
	margin-bottom: 5px;
	position: relative;
	opacity: 0;
	transform: translateY(-20px);
	transition: all 0.5s ease-in-out;
	box-sizing: border-box;
	height: 80px;
	border-radius: 12px;
	display: flex;
	flex-wrap: wrap;
}
.errrow.err {
	background-color: #c93e25;
	& > .errrowmsg {
		background: #df5137;
	}
}
.errrow.warn {
	background-color: #f48106;
	
	& > .errrowmsg {
		background: #ff9b2f;
	}
}
.errrow.info {
	background-color: #259fc9;
	
	& > .errrowmsg {
		background: #4bb9df;
	}
}
.errrow[active] {
	opacity: 1;
	transform: translateY(0);
}
.errrow.exit {
	opacity: 0;
	transform: translateX(100%);
}
.errrowtitle, .errrowmsg, .errrowdatetime {
	color: white;
	font-weight: bold;
	font-size: 15px;
}
.errrowtitle {
	color: white;
	font-weight: bold;
	padding-right: 21px;
	font-size: 17px;
	position: relative;
	top: 27px;
	width: 179px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.errrowmsg {
	color: white;
	font-weight: normal;
	position: relative;
	top: 22px;
	height: 32px;
	margin-right: 37px;
	border-radius: 8px;
	padding: 6px 14px;
	width: 173px;
	text-align: left;
	box-sizing: border-box;
}
.errrowdatetime {
	color: white;
	font-weight: normal;
	font-size: 13px;
	position: relative;
	top: 29px;
	color: #ffffffb8;
}
.close-btn {
	position: absolute;
	top: 0px;
	right: 5px;
	background: transparent;
	border: none;
	font-size: 18px;
	color: white;
	cursor: pointer;
	padding: 8px 9px;
}



@media only screen and (max-device-width: 767px) {

	:host {
		width: 94%;
		margin-left: -47%;
		bottom: 8px;
	}

	.errrow-container {
		display: flex;
	}
	.errrow {
		padding: 0px 10px;
	}
	.errrowtitle {
	top: 7px;
}
.errrowmsg {
	top: 3px;
	margin-right: 6px;
	left: 169px;
}
.errrowdatetime {
	top: -3px;
	left: -178px;
}

}

@media only screen and (min-device-width: 768px) {
    .aux.brandname:hover, .aux.viewmetersreport:hover {
        cursor: pointer;

		& > h6 {
			text-decoration: underline;
		}
    }
}
</style>
<div class="errrow-container"></div>
`}}customElements.define('vp-machinenotification',VPMachineNnotification);export{}