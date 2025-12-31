const ATTRIBUTES={propa:""};class VTestAssist extends HTMLElement{m={dummydata:[]};a={...ATTRIBUTES};s={propa:false};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}static load(_pathparams,_searchparams){return new Promise(async(res,_rej)=>{const d=new Map();const dummydata=[{dummytext:"Chair"},{dummytext:"Table"},{dummytext:"Lamp"},{dummytext:"Sofa"},{dummytext:"Desk"},{dummytext:"Shelf"},{dummytext:"Bed"},{dummytext:"Rug"}];d.set("dummydata",dummydata);res({d,refreshon:[]})})}ingest(loadeddata,_pathparams,_searchparams){const dummydata=loadeddata.get('dummydata')||[];this.m.dummydata=dummydata}render(){render(this.template(this.s,this.m),this.shadow)}template=(_s,_m)=>{return html`<style>

</style>
<header class="viewheader">
    <a class="left"><span>&nbsp;</span></a>
    <div class="middle"><h1>Test Assist</h1></div>
    <div class="right">
        &nbsp;
    </div>
</header>


<div class="wrapper">
	<div class="message-container">
		<strong>Test Assist</strong>
		<br>
		${_m.dummydata.map(m => html`
			<div>${m.dummytext}</div>
		`)}
	</div>
</div>

`}}customElements.define('v-testassist',VTestAssist);export{}