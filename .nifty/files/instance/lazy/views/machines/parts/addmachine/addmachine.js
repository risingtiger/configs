var ModeE=function(ModeE){ModeE[ModeE["FIND"]=0]="FIND";ModeE[ModeE["FOUND"]=1]="FOUND";return ModeE}(ModeE||{});const ATTRIBUTES={propa:""};class VPMachineAddMachine extends HTMLElement{a={...ATTRIBUTES};m={propa:""};s={mode:0,newmachine:null,newchip:null};newmachine;shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){setTimeout(()=>{debugger;const el=this.shadow.querySelector("c-in2[name='logistics_chipid']");el.focusit();const formel=this.shadow.querySelector('form#findchipform');formel.addEventListener('keyup',(e)=>{if(e.key==='Enter'){this.findChip()}})},800);$N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}ingest(_loadeddata){}render(state_changes={}){this.s=Object.assign(this.s,state_changes);render(this.template(this.s),this.shadow)}async findChip(e){const doneevt=e?e.detail.done:()=>{};const logistics_chipid_el=this.shadow.querySelector("c-in2[name='logistics_chipid']");const particle_product_el=this.shadow.querySelector("c-in2[name='particleproduct']");const logistics_chipid=logistics_chipid_el.getAttribute("val")||"";const particle_product=particle_product_el.getAttribute("val")||"11723";if(!logistics_chipid){$N.ToastShow("Please Enter Logistics Chip ID",'error');return false}let r=await $N.FetchLassie("/api/chips/get_by_logistics_chipid?logistics_chipid="+logistics_chipid);if(r.ok){$N.ToastShow("Chip Already Registered",'error');doneevt();return false}r=await $N.FetchLassie("/api/particle/particleid_from_logistics_chipid?logistics_chipid="+logistics_chipid+"&productid="+particle_product);if(!r.ok){$N.ToastShow("Unable to Find Chip",'error');doneevt();return false}if(r.data.message){$N.ToastShow(r.data.message,'error');return false}const particle_id=r.data.id;r=await $N.FetchLassie("/api/particle/getdetails?particle_id="+particle_id);if(!r.ok){$N.ToastShow("Unable to Process Chip",'error');doneevt();return false}const particlechipdetails=r.data;const codeversion="1.2.7";const datetime=Math.floor(new Date().getTime()/1000);const newchip={chip_id:0,logistics_chipid:logistics_chipid.toString().padStart(7,"0"),codeversion,cellsignal:[1,1],cellgps:[0,0,0],chipgps:[0,0,0],particle_id:particlechipdetails.particle_id,particle_account:"nationalwater",particle_product:particlechipdetails.product_id,particle_serial:particlechipdetails.serial_number,particle_development:false,chipts:datetime};const newmachine={machine_id:0,logistics_machineid:"0000000",dispenser_mode:'none',lora_version:0,meters_tally:[0,0,0,0,0],meters_reconciles:[],incrs:[10,10,10,10,10],state_active:false,state_condition:"ok",state_latest:"@@@",state_mia:false,timezone:"Denver",machinets:datetime,lastcall:datetime,firestore_refid:"",chip_id:0,store_id:0};doneevt();this.s.mode=1;this.s.newmachine=newmachine;this.s.newchip=newchip;this.render()}async addChip(e){const httpopts={method:"POST",body:JSON.stringify({newmachine:this.s.newmachine,newchip:this.s.newchip})};const r=await $N.FetchLassie("/api/machines/add",httpopts);if(!r.ok){$N.ToastShow("Error Adding Chip",'error');return false}$N.ToastShow(this.s.newchip.logistics_chipid+" Added. machine_id: "+r.data.machine_id,'saved');this.s.mode=0;e.detail.done();this.render()}template=(_s)=>{return html`<style>
#findchip {
    display: none;
}
#findchip.active {
    display: block;
}

#addchip {
    display: none;
}
#addchip.active {
    display: block;
}
</style>
<div id="findchip" class="${_s.mode === 0 ? 'active' : ''}">
	<form id="findchipform">
		<c-in2 label="Chip Logistics ID" name="logistics_chipid" type="number" placeholder="e.g. pwt_0239 would be 239"></c-in2>
		<c-in2 label="Particle Product" name="particleproduct" type="dselect" options="Pure Water Boron:11723,NewMachine:37972" val="11723"></c-in2>
		<div style="text-align:center;padding-top: 16px;">
			<c-btn @btnclick="${(e)=>{this.findChip(e)}}">Find Chip</c-btn>
		</div>
	</form>
</div>




<div id="addchip" class="${_s.mode === 1 ? 'active' : ''}">

    <ul class="items">
        <li>
            <h5>Chip ID</h5>
            <p>${_s.newchip?.logistics_chipid}</p>
        </li>
        <li>
            <h5>Particle ID</h5>
            <p>${_s.newchip?.particle_id}</p>
        </li>
        <li>
            <h5>Particle Serial</h5>
            <p>${_s.newchip?.particle_serial}</p>
        </li>
        <li>
            <h5>Particle Product</h5>
            <p>${_s.newchip?.particle_product}</p>
        </li>
    </ul>

    <div style="text-align: center;padding-top:16px;padding-bottom:24px;">
        <c-btn name="addchip" primary @btnclick="${(e)=>this.addChip(e)}">Add It Now</c-btn>
    </div>
</div>

`}}customElements.define('vp-machineaddmachine',VPMachineAddMachine);export{}