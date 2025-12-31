import'./parts/edit/edit.js';import'./parts/statuses/statuses.js';import MachineLib from"../../libs/machines_lib.js";const ATTRIBUTES={propa:""};class VMachine extends HTMLElement{m={machine:{}};a={...ATTRIBUTES};s={ready:false,show_details:{show:0},show_edit:{show:0},show_map:{show:0},show_metersreport:{show:0}};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}static load=(pathparams,searchparams)=>new Promise(async(res,rej)=>{const d=new Map();const promises=[];promises.push($N.FetchLassie(`/api/machines/${pathparams.id}/view?firestore_refid=${searchparams.firestore_refid}`,{method:"GET"}));const results=await Promise.all(promises);if(!results[0].ok){rej();return}d.set(`machines/${pathparams.id}/view`,results[0].data);res({d,refreshon:["machines/"+pathparams.id]})});ingest(loadeddata,pathparams,_searchparams){const data=loadeddata.get(`machines/${pathparams.id}/view`);this.m.machine=data.machine}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}render(state_changes={}){this.s=Object.assign(this.s,state_changes);render(this.template(this.s,this.m),this.shadow)}actions_menu_selected(e){switch(e.detail.newval){case"details":this.show_machine_details();break;case"edit":this.show_machine_edit();break;case"map":this.show_machine_map();break;case"metersreport":this.show_machine_metersreport();break;case"telemetry":this.show_telemetry();break}}show_machine_details(){this.s.show_details.show=1;this.render()}show_machine_map(){this.s.show_map.show=1;this.render()}show_machine_edit(){this.s.show_edit.show=1;this.render()}show_machine_metersreport(){this.s.show_metersreport.show=1;this.render()}show_telemetry(){if(this.m.machine.logistics_machineid==="0000000"){alert("This machine has no telemetry");return}else{$N.SwitchStation.GoTo(`machines/${this.m.machine.machine_id}/telemetry`)}}template=(_s,_m)=>{return html`<style>
header.viewheader .right {
	& i               {font-size: 15px;position:relative;top: 0;left: 0;padding-right: 1px;}
	& i.icon-location { font-size: 15px; }
	& i.icon-graph    {font-size: 15px;top: -4px;padding-right: 7px;}
	& i.icon-info     {font-size: 18px;top: -3px;}
	& i.icon-edit1    {font-size: 17px;top: -1px;}
	& i.icon-location {font-size: 17px;top: -2px;}
	& i.icon-meter    {font-size: 17px;top: -2px;}
}



#actions_menu::part(instigator) {
    font-size: 22px;
    border: none;
    padding: 0;
    font-weight: bold;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#actions_menu {
	position:relative;
	font-size: 20px;
	top: -4px;
	padding: 0;
	width: 23px;
	padding-right: 15px;
	
    & > span[slot="instigator"] {
        color: var(--actioncolor);
		width: 100%;
    }
}


@media only screen and (max-device-width: 767px) {

    header.viewheader .middle {
    }

    header.viewheader .right {
    }

    header.viewheader .middle h1 {
    }

    header.viewheader .right {
		& .icon-location { display: none; }
		& .icon-graph    { display: none; }
		& .icon-info     { display: none; }
		& .icon-edit1    { display: none; }
		& .icon-location { display: none; }
		& .icon-meter    { display: none; }
    }

    header.viewheader .right .icon-graph {
    }
}

</style>

<!-- -- -->


<div class="wrapper">

	<header class="viewheader">
		<a class="left" @click="${()=>$N.SwitchStation.GoBack({default:'machines'})}"><span>‸</span></a>
		<div class="middle">
			<h1>
				${_m.machine.particle_product === 37972 ? html`<i class="action icon-circles"></i>` : ''} 
				${get_title(_m.machine)}
			</h1>
		</div>
		<div class="right">
			<i class="icon-info"  @click="${()=>{ this.show_machine_details(); }}" style=""></i>
			<i class="icon-edit1"  @click="${()=>{ this.show_machine_edit(); }}" style=""></i>
			<i class="icon-meter"  @click="${()=>{ this.show_machine_metersreport(); }}" style=""></i>
			<i class="icon-location"  @click="${()=>{ this.show_machine_map(); }}" style=""></i>
			<i class="icon-graph"  @click="${()=>{ this.show_telemetry(); }}" style=""></i>
			<c-dselect id="actions_menu" type="menu" options="${localStorage.getItem("user_email") === 'accounts@risingtiger.com' ? 'Machine Details:details,Edit Machine:edit,Show Map:map,Show Telemetry:telemetry,Meters Report:metersreport' : 'Machine Details:details,Show Map:map,Show Telemetry:telemetry,Meters Report:metersreport'}" val="" @update="${(e)=>this.actions_menu_selected(e)}"><span slot="instigator"><i class="icon-tripledot" style=""></i></span></c-dselect>
		</div>
	</header>

	<br>
<!--
	<h5 @click="${()=>$N.FetchLassie(`/api/pwt/reports/meters_timerange?machine_record_id=${_machine.id}&daystart=${'2024-05-01'}&dayend=${'2024-06-01'}`)}">Temp Meters TimeRange</h5>
	<h5 @click="${()=>$N.FetchLassie(`/api/pwt/reports/meters_alltime?machine_record_id=${_machine.id}`)}">Temp Meters AllTime</h5>
	-->

	<vp-machinestatuses></vp-machinestatuses>
</div>




${ _s.show_details.show !== 0 ? html`
    <c-ol2 title="Machine Details" @close="${()=> { this.s.show_details.show = 0; this.render(); }}">
        <vp-machinedetails machine_id="${_m.machine.machine_id}"></vp-machinedetails>
    </c-ol2>
` : ''}




${ _s.show_edit.show !== 0 ? html`
    <c-ol2 title="Edit Machine" actionterm="save" @close="${()=> { this.s.show_edit.show = 0; this.render(); }}">
        <vp-machineedit></vp-machineedit>
    </c-ol2>
` : '' }




${ _s.show_map.show !== 0 ? html`
    <c-ol2 title="Location" @close="${()=> { this.s.show_map.show = 0; this.render(); }}">
        <vp-machinemap machine_id="${_m.machine.machine_id}"></vp-machinemap>
    </c-ol2>
` : '' }




${ _s.show_metersreport.show !== 0 ? html`
	<c-ol2 title="${_m.machine.store_brand ? (_m.machine.store_brand + ' ' + _m.machine.city + ', ' + _m.machine.state) : _m.machine.store_description}" @close="${()=> { this.s.show_metersreport.show = 0; this.render(); }}">
		<vp-metersreport machine_id="${_m.machine.machine_id}" machine_incrs="${_m.machine.incrs}" machine_ts="${_m.machine.machinets}"></vp-metersreport>
    </c-ol2>
` : '' }



`}}function get_title(machine){return MachineLib.GetTitle(machine)}customElements.define('v-machine',VMachine);export{get_title}