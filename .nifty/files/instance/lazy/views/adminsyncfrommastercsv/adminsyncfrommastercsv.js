import{Utils}from"./adminsyncfrommastercsv_utils.js";import{SyncLogic}from"./adminsyncfrommastercsv_synclogic.js";const ATTRIBUTES={propa:""};class VAdminSyncFromMasterCsv extends HTMLElement{a={...ATTRIBUTES};m={stores:[],machines:[],chips:[],csvrows:null,logs:[]};s={propa:false,dropActive:false};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}static load=(_pathparams,_searchparams)=>new Promise(async(res,_rej)=>{const d=new Map();res({d,refreshon:[]})});ingest=()=>{};render(){render(this.template(this.s,this.m),this.shadow)}async beginsync(){const r=await $N.FetchLassie('/api/admin/sync_from_master_csv/getall',{method:'GET'});const data=r.data;this.m.stores=data.stores;this.m.machines=data.machines;this.m.chips=data.chips;for(let i=0;i<this.m.csvrows.length;i++){const csvrow=this.m.csvrows[i];const r=await SyncLogic.TestRow(csvrow,this.m.stores,this.m.machines,this.m.chips);if(r.msg){this.m.logs.push({message:`${r.msg}`,rowIndex:i,action:r.action});this.render()}if(this.m.logs.length>100){this.m.logs.push('Too many errors, stopping.');this.render();break}}}rowitemaction(e,rowIndex,action){return new Promise((resolve)=>{if(action==='addstore'){this.addstore(e,rowIndex).then(()=>{resolve(true)})}else if(action==='updatestore'){this.updatestore(e,rowIndex).then(()=>{resolve(true)})}else if(action==='updatestoremachineids'){this.updatestoremachineids(e,rowIndex).then(()=>{resolve(true)})}})}async addstore(e,rowIndex){if(!this.m.csvrows)return;const csvrow=this.m.csvrows[rowIndex];const r=await $N.FetchLassie('/api/admin/sync_from_master_csv/addstore',{method:'POST',body:JSON.stringify(csvrow)});if(!r.ok){$N.ToastShow('Error adding store.','error');e.detail.done();return}const sr=await $N.FetchLassie(`/api/admin/stores/save_latlon_from_address?store_id=${r.data.store_id}`);if(!sr.ok){$N.ToastShow('Error geocoding store address.','error');e.detail.done();return}$N.ToastShow('Store added successfully.');e.detail.done()}async updatestore(e,rowIndex){if(!this.m.csvrows)return;const csvrow=this.m.csvrows[rowIndex];const store_id=this.m.stores.find((s)=>s.logistics_nationalwaterid===csvrow.nwsid)?.store_id;if(!store_id){console.error('Store not found for updatestore:',csvrow);e.detail.done();return}try{await $N.FetchLassie('/api/admin/sync_from_master_csv/updatestore?store_id='+store_id,{method:'POST',body:JSON.stringify(csvrow)})}catch{$N.ToastShow('Error updating store.','error');e.detail.done();return}const sr=await $N.FetchLassie(`/api/admin/stores/save_latlon_from_address?store_id=${store_id}`);if(!sr.ok){$N.ToastShow('Error geocoding store address.','error');e.detail.done();return}$N.ToastShow('Store updated successfully.');e.detail.done()}async updatestoremachineids(e,rowIndex){if(!this.m.csvrows)return;const csvrow=this.m.csvrows[rowIndex];const store=this.m.stores.find((s)=>s.logistics_nationalwaterid===csvrow.nwsid);if(!store)return;const machine=this.m.machines.find((m)=>m.store_id===store.store_id);if(!machine)return;const machine_id=machine.machine_id;if(!machine_id){console.error('Machine not found for updatestore:',csvrow);e.detail.done();return}try{const r=await $N.FetchLassie(`/api/admin/sync_from_master_csv/updatestoremachineid?machine_id=${machine_id}&logistics_machineid=${csvrow.machineids[0]}`);if(!r.ok){throw new Error('Error updating machine')}}catch{$N.ToastShow('Error updating machine.','error');e.detail.done();return}$N.ToastShow('Machine updated successfully.');e.detail.done()}handleDragOver(e){e.preventDefault();this.s.dropActive=true;this.render()}handleDragLeave(e){e.preventDefault();this.s.dropActive=false;this.render()}async handleDrop(e){e.preventDefault();this.s.dropActive=false;const files=e.dataTransfer?.files;if(files&&files.length===1&&files[0].name.toLowerCase().endsWith('.txt')){const parsedcsvrows=await Utils.parseCsv(files[0]).catch((_err)=>null);if(parsedcsvrows){this.m.csvrows=parsedcsvrows;this.m.logs=[];this.beginsync()}else{alert('Error parsing CSV file.')}}else{alert('Please drop a single CSV file.')}this.render()}template=(_s,_m)=>{return html`<style>

header.viewheader {
    background: white;
    height: 57px !important;
    box-shadow: 0 0 15px 0px rgb(0 0 0 / 11%);
	justify-content: space-between;

    & .left {
    width: 80%;
    }
    & .middle {
    width: 10%;
    }
    & .right {
    width: 10%;
    }
}

#mainadminsyncfrommastercsvcontent {
	height:  100vh;
	overflow-y: scroll;
	text-align: center; 
	padding-top: 70px;
}

#csv-drop-area {
	border: 2px dashed #ccc;
	padding: 20px;
	text-align: center;
	cursor: pointer;
	transition: border-color 0.3s;
}

#csv-drop-area.active {
	border-color: #007bff;
	background-color: #f8f9fa;
}

#adminsection_logs {
	margin-top: 20px;
	text-align: left;
}

#logs-container {
	max-height: 400px;
	overflow-y: auto;
	border: 1px solid #ccc;
	padding: 10px;
	background-color: #f9f9f9;
}

.log-entry {
	margin-bottom: 5px;
	padding: 5px;
	border-radius: 3px;
}

.log-entry.error {
	color: red;
	background-color: #ffe6e6;
}





</style>



<div class="wrapper">

	<header class="viewheader">
		<a class="left" @click="${()=>$N.SwitchStation.GoBack({default:'home'})}"><span>‸</span></a>
		<div class="middle"><v-simplegreeting></v-simplegreeting> &nbsp;</div>
		<div class="right">
			${ localStorage.getItem('id_token') ? html`
				<a class="loginout" @click="${()=> this.LogoutUser()}">logout</a>
				` : html`
				<a class="loginout" @click="${()=> { window.location.href='/v/login'; }}">login</a>
				`}
		</div>
	</header>

    <div id="mainadminsyncfrommastercsvcontent">

		 <section id="adminsection_csvupload">
			 <h2>Upload Master CSV</h2>
			 <div 
				id="csv-drop-area" 
				class="${_s.dropActive ? 'active' : ''}" 
				@dragover="${(e) => this.handleDragOver(e)}" 
				@dragleave="${(e) => this.handleDragLeave(e)}" 
				@drop="${(e) => this.handleDrop(e)}">
					 Drop CSV file here
			 </div>
		 </section>

		 <section id="adminsection_logs">
			 <h2>Sync Logs</h2>
			 <div id="logs-container">
				 <table>
					 <thead>
						 <tr>
							 <th>Message</th>
							 <th>Action</th>
							 <th>Controls</th>
						 </tr>
					 </thead>
					 <tbody>
						 ${_m.logs.map(log => html`
						 <tr class="log-entry error">
							 <td>${typeof log === 'string' ? log : log.message}</td>
							<td>${typeof log === 'object' && log.action ? html`<c-btn small @btnclick="${(e) => this.rowitemaction(e,log.rowIndex, log.action)}">${log.action}</c-btn>` : ''}</td>
						 </tr>
						 `)}
					 </tbody>
				 </table>
			 </div>
		 </section>

     </div>

</div>


`}}customElements.define('v-adminsyncfrommastercsv',VAdminSyncFromMasterCsv)