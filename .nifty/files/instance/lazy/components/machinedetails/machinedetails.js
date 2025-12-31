const ATTRIBUTES={machine_id:""};class VPMachineDetails extends HTMLElement{a={...ATTRIBUTES};m={mdetails:{particle:{},state:{},store_meters:[],incrs:[]}};s={show_particle_more:false};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}connectedCallback(){$N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}ingest(loadeddata){let machineraw=undefined;const machineslist=loadeddata.get("machines_view_list");if(machineslist){machineraw=machineslist.find((m)=>m.machine_id==Number(this.a.machine_id))}else{machineraw=loadeddata.get("machines/"+this.a.machine_id+'/view');machineraw=machineraw.machine}this.m.mdetails=expand(machineraw)}render(){render(this.template(this.s,this.m.mdetails),this.shadow)}async GetAndShowParticleDeviceDetails(e){return new Promise(async(res)=>{const urlstr=`/api/particle/getdetails?particle_id=${this.m.mdetails.particle_id}`;const pm=await $N.FetchLassie(urlstr);if(!pm.ok){e.detail.done();alert("Error getting particle details");res(0);return}this.m.mdetails.particle_more=pm.data;this.s.show_particle_more=true;this.render();setTimeout(()=>{this.shadow.querySelector(".definewrap").scrollTo({behavior:'smooth',top:10000})},100);e.detail.done();res(1)})}template=(_s,_mdetails)=>{return html`<link rel="stylesheet" href="/assets/main.css"><style>
:host {
    display: block;
	height: 100%;
}


.definewrap {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}


    h4 {
        padding: 12px 0 5px 12px;
        font-size: 18px;
        border-bottom: 1px solid #ebebeb;
    }

</style>

<div class="definewrap">

	<!-- <button @click="${()=>this.temp_trigger_sse_machine_update()}">Trigger SSE Machine Update</button> -->
	<h4>Identifiers &amp; Accounts</h4>

	<ul class="items">
		<li>
			<h5>Code Version</h5>
			<p>${_mdetails.codeversion}</p>
		</li>

		<li>
			<h5>Chip ID</h5>
			<p>${_mdetails.logistics_chipid.replace(/^0+/, '')}</p>
		</li>

		<li>
			<h5>PwtData ID</h5>
			<p><a href="https://pwtdata.com/index.php?action=view&controller=clients&clientID=${_mdetails.pwtdataid}" target="_blank">${_mdetails.logistics_pwtdataid.replace(/^0+/, '') || 'NULL'}</a></p>
		</li>

		<li>
			<h5>Machine ID</h5>
			<p>${_mdetails.logistics_machineid.replace(/^0+/, '') || 'NULL'}</p>
		</li>

		<li>
			<h5>Store ID</h5>
			<p>${_mdetails.logistics_storeid.replace(/^0+/, '') || 'NULL'}</p>
		</li>

		<li>
			<h5>National Water ID</h5>
			<p>${_mdetails.logistics_nationalwaterid.replace(/^0+/, '') || 'NULL'}</p>
		</li>

		<li>
			<h5>Store Brand</h5>
			<p>${_mdetails.store_brand}</p>
		</li>

		<li>
			<h5>Store Desc</h5>
			<p>${_mdetails.store_description}</p>
		</li>


		<li>
			<h5>Firestore ID</h5>
			<p>${_mdetails.firestore_refid}</p>
		</li>

		<li>
			<h5>Record ID</h5>
			<p>${_mdetails.machine_id}</p>
		</li>

		<li>
			<h5>Particle Id</h5>
			<p>${_mdetails.particle_id}</p>
		</li>

		<li>
			<h5>Particle Serial</h5>
			<p>${_mdetails.particle_serial}</p>
		</li>

		<li>
			<h5>Particle Product</h5>
			<p>${_mdetails.particle_product_str}</p>
		</li>
	</ul>

	<br><br>
	<h4>Current State</h4>

	<ul class="items">
		<li>
			<h5>Is Active</h5>
			<p>${_mdetails.state_active ? 'YES' : 'NO'}</p>
		</li>

		<li>
			<h5>Condition</h5>
			<p>${_mdetails.state_condition}</p>
		</li>

		<li>
			<h5>Is MIA</h5>
			<p>${_mdetails.state_mia ? 'YES' : 'NO'}</p>
		</li>

		<li>
			<h5>Cellular</h5>
			<p>Strength ${_mdetails.cellsignal[0]} -- Quality ${_mdetails.cellsignal[1]}</p>
		</li>

		<li>
			<h5>Cellular GPS</h5>
			<p>${_mdetails.cellgps[0]}, ${_mdetails.cellgps[1]}, ${(new Date(_mdetails.cellgps[2]*1000)).toLocaleDateString()}</p>
		</li>

		<li>
			<h5>Latest Status Str</h5>
			<p>${_mdetails.state_latest}</p>
		</li>

		<li>
			<h5>Dispenser Mode</h5>
			<p>${_mdetails.dispenser_mode}</p>
		</li>

		<li>
			<h5>Lora Version</h5>
			<p>${_mdetails.lora_version_str}</p>
		</li>

		<li>
			<h5>Meters Tally</h5>
			<p>${_mdetails.meters_tally[0]}, ${_mdetails.meters_tally[1]}, ${_mdetails.meters_tally[2]}, ${_mdetails.meters_tally[3]}, ${_mdetails.meters_tally[4]}</p>
		</li>

		<li>
			<h5>Meter Increments</h5>
			<p>${_mdetails.incrs[0]}, ${_mdetails.incrs[1]}, ${_mdetails.incrs[2]}, ${_mdetails.incrs[3]}, ${_mdetails.incrs[4]}</p>
		</li>
			
		<li>
			<h5>Last Call</h5>
			<p>${(new Date(_mdetails.lastcall*1000)).toLocaleDateString()} at ${(new Date(_mdetails.lastcall*1000)).toLocaleTimeString()}</p>
		</li>
	</ul>

	<br><br>

	${_s.show_particle_more ? html`` : html`
		<div style="text-align: center;padding: 20px;">
			<c-btn @btnclick="${(e)=>this.GetAndShowParticleDeviceDetails(e)}">VIEW MORE PARTICLE DETAILS</button>
			<br><br>&nbsp;
		</div>
	`}

	${_s.show_particle_more ? html`
		<h4>Particle More Details</h4>

		<ul class="items" style="margin-bottom:14px;">
			<li>
				<h5>Name</h5>
				<p>${_mdetails.particle_more.name}</p>
			</li>

			<li>
				<h5>Last Heard</h5>
				<p>${ (new Date(_mdetails.particle_more.last_heard)).toLocaleDateString() + ' at ' + (new Date(_mdetails.particle_more.last_heard)).toLocaleTimeString() }</p>
			</li>

			<li>
				<h5>Last Handshake At</h5>
				<p>${ (new Date(_mdetails.particle_more.last_handshake_at)).toLocaleDateString() + ' at ' + (new Date(_mdetails.particle_more.last_handshake_at)).toLocaleTimeString() }</p>
			</li>

			<li>
				<h5>Is Online</h5>
				<p>${_mdetails.particle_more.online}</p>
			</li>

			<li>
				<h5>System Firmware Version</h5>
				<p>${_mdetails.particle_more.system_firmware_version}</p>
			</li>

			<li>
				<h5>Firmware Version</h5>
				<p>${_mdetails.particle_more.firmware_version}</p>
			</li>
		</ul>
	` : html``}

	<span style="display: block;padding-left: 13px;padding-bottom: 13px;font-size: 0.9em;">*timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
</div>



`}}customElements.define('vp-machinedetails',VPMachineDetails);function expand(machine){let particle_product="";switch(machine.particle_product){case 11724:particle_product="BSeries";break;case 11723:particle_product="Boron";break;case 37972:particle_product="NM Boron";break;default:particle_product="Unknown";break}const machine_details={...machine,lora_version_str:machine.lora_version==0?'N/A':machine.lora_version.toString(),particle_more:null,particle_product_str:particle_product};return machine_details}export{}