const ATTRIBUTES={machine_id:""};class VPMachineMap extends HTMLElement{a={...ATTRIBUTES};m={lat:0,lon:0,storedistance:0,isatstore:false,isold:true,ts:0,sourcedfrom:"database",errmsg:""};s={success:false,isold:false,istoofar:false};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}connectedCallback(){$N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}static statusText="";static post_load=(_pathparams,_searchparams,attrs)=>new Promise(async(res,_rej)=>{const d=new Map();const r=await $N.FetchLassie(`/api/machines/${attrs.machine_id}/gps`,{});if(!r.ok){d.set(`machines/${attrs.machine_id}/gps`,[])}else{d.set(`machines/${attrs.machine_id}/gps`,[r.data])}VPMachineMap.statusText=r.statusText||"";res({d,refreshon:[]})});ingest(loadeddata,_pathparams,_searchparams){const rd=loadeddata.get(`machines/${this.a.machine_id}/gps`)?.[0];if(!rd){return}this.m.sourcedfrom=rd.sourcedfrom||"";this.m.lat=rd.lat;this.m.lon=rd.lon;this.s.success=rd.lat!==0&&rd.lon!==0;this.m.storedistance=rd.storedistance||0;this.m.isatstore=rd.isatstore;this.m.errmsg=VPMachineMap.statusText||"";this.m.ts=rd.ts||0;this.m.isold=rd.isold}async hydrated(){}render(){console.log("map rendered");render(this.template(this.s,this.m),this.shadow)}template=(_s,_m)=>{return html`<style>:host {
  display: block;
}


#map_info {
  margin-top: 15px;
  display: b;
  justify-content: space-around; /* Use space-around for better spacing */
  align-items: center; /* Vertically align items */
  padding: 0 10px; /* Add some horizontal padding */
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  gap: 10px; /* Add gap between items */
}

.info-item {
  display: block;
  align-items: center;
  gap: 8px; /* Space between icon, label, and value */
  text-align: left; /* Align text to the left */
  padding: 5px 0; /* Add some vertical padding */
}

.info-item ion-icon {
  font-size: 22px; /* Slightly smaller icon */
  color: var(--ion-color-medium-shade); /* Use a standard color */
}

.info-item .label {
  font-weight: normal; /* Less emphasis on label */
  color: var(--ion-color-medium-shade);
}

.info-item .value {
  font-weight: bold; /* Emphasize the value */
  color: var(--ion-color-dark-shade);
}

.info-item .value.attention {
  color: var(--errorcolor); /* Use theme's danger color for attention */
}

/* Responsive adjustments if needed */
@media (max-width: 400px) {
  #map_info {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: flex-start; /* Align items to the start */
    padding-left: 20px; /* Indent stacked items */
  }
  .info-item {
    width: 100%; /* Make items take full width when stacked */
  }
}

.warning-container {
  display: flex;
  text-align: center;
  margin-top: 10px;
  width: 100%;
  border-top: 1px solid #ececec;
  padding-top: 10px;
}



.warning-item {
  flex: 1;
  font-weight: bold;
  font-size: 17px;
}
.warning-item.attention {
  color: var(--errorcolor); /* Use theme's danger color for attention */
}



</style>

<!--<span slot="headermiddle">Location</span>-->

${_s.success ? html`
<iframe 
    width="100%" 
    height="400px" 
    frameborder="0" 
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGeIYK8t4IZuhyAf7z_xsFTjGZKIHePHI&q=${_m.lat},${_m.lon}&zoom=10&maptype=roadmap"
    allowfullscreen
    style="border-bottom: 3px solid #a0a0a0;">
</iframe>

<div id="map_info">
    <div class="info-item">
        <span class="label">Last Located at:</span>
        ${_m.ts ? html`
            <span class="value ${_s.isold ? 'attention' : ''}">
                ${(new Date(_m.ts*1000)).toLocaleDateString()}
            </span>
        ` : html`<span class="value">Unknown</span>`}
    </div>
    <div class="info-item">
        <span class="label">Cell Tower Distance from Store:</span>
        ${_m.storedistance ? html`
            <span class="value ${_s.istoofar ? 'attention' : ''}">
                ${_m.storedistance.toFixed(2)} miles
            </span>
        ` : html`<span class="value">Store GPS Not Set</span>`}
    </div>

    ${_s.isold || !_s.isatstore ? html`
    <div class="warning-container">
		${_m.isold ? html`<div class="warning-item attention">Out of Date</div>` : ''}
		${!_m.isatstore ? html`<div class="warning-item attention">Not at Store and/or Out of Date</div>` : ''}
    </div>
    ` : ''}

    <div class="info-item">
		${_m.sourcedfrom === 'database' ? html`STALE & Err Msg: ${_m.errmsg}` : _m.sourcedfrom }
	</div>
</div>


` : html`

<div id="map_info">
    <div class="info-item">
		<div id="mapspacer" style="height: 400px;width: 100%;"></div>
        <p>.....</p>
    </div>
</div>

`}



`}}customElements.define('vp-machinemap',VPMachineMap);export{}