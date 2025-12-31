const ATTRIBUTES={propa:""};class VHome extends HTMLElement{a={...ATTRIBUTES};m={propa:""};s={showAuth:false,showTesty:false,admin_response:[],pwtdata_interface_response_str:"",report_month_meters:[],month_names:["January","February","March","April","May","June","July","August","September","October","November","December"],csv_html:"",synopsis:{show:false,data:null},store_pwtdataid_log:[]};reconcile_return_str;shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.reconcile_return_str="";this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}static load=(_pathparams,_searchparams)=>new Promise(async(res,_rej)=>{const d=new Map();res({d,refreshon:[]})});ingest=()=>{};hydrated=()=>{const d=new Date();d.setUTCDate(1);d.setUTCHours(0);d.setUTCMinutes(0);d.setUTCSeconds(0);d.setUTCMilliseconds(0);d.setUTCMonth(d.getUTCMonth()-1);this.s.report_month_meters.push({year:d.getUTCFullYear(),month:d.getUTCMonth()});d.setUTCMonth(d.getUTCMonth()-1);this.s.report_month_meters.push({year:d.getUTCFullYear(),month:d.getUTCMonth()});d.setUTCMonth(d.getUTCMonth()-1);this.s.report_month_meters.push({year:d.getUTCFullYear(),month:d.getUTCMonth()})};render(){render(this.template(this.s,this.reconcile_return_str),this.shadow)}testing2(e){setTimeout(()=>{e.detail.done()},5000)}async LogoutUser(){localStorage.removeItem("id_token");localStorage.removeItem("token_expires_at");localStorage.removeItem("refresh_token");localStorage.removeItem("auth_group");localStorage.removeItem("user_email");setTimeout(()=>{window.location.href="/v/login"},600);this.render()}async update_all_stores_with_pwtdataid(){const appendPWTDataIdLog=(entry)=>{this.s.store_pwtdataid_log=[...this.s.store_pwtdataid_log,entry];this.render()};this.s.store_pwtdataid_log=[];this.render();const response=await $N.FetchLassie("/api/stores/getall");if(!response.ok||!response.data||!response.data.length){appendPWTDataIdLog({storeId:"",storeName:"All Stores",status:"error",message:"Failed to fetch stores."});return}const stores=response.data;let count_changes=0;stores.sort((a,b)=>a.store_id-b.store_id);let pwteclientids;const presponse_r=await fetch("http://35.226.171.128:8080/api/allclientids");if(!presponse_r.ok){appendPWTDataIdLog({storeId:"",storeName:"All Stores",status:"error",message:"Failed to fetch PWT data."});return}pwteclientids=await presponse_r.json();const pwtclients_parsed=pwteclientids.map((pc)=>{let nwsid=null;const match=pc.clientName.match(/^(\d{4})\s/);if(match){nwsid=Number(match[1])}return{nwsid,clientid:Number(pc.clientID)}});for(const store of stores){const nwsid=Number(store.logistics_nationalwaterid.replace(/^0+/,''));const pwtclient=pwtclients_parsed.find((pc)=>pc.nwsid===nwsid);if(pwtclient&&pwtclient.clientid.toString().padStart(7,'0')!==store.logistics_pwtdataid){const r=await $N.FetchLassie(`/api/admin/stores/update_pwtdataid?store_id=${store.store_id}&pwtdataid=${pwtclient.clientid}`);if(!r.ok){appendPWTDataIdLog({storeId:store.store_id,storeName:store.store_name,status:"error",message:`Failed to update PWT Data ID: ${r.data && r.data.message ? r.data.message : 'Unknown error'}`});continue}appendPWTDataIdLog({storeId:store.store_id,storeName:store.store_name,status:"success",message:`Updated ${store.store_description} to PWT Data ID ${pwtclient.clientid}`});console.log(`Updated store ${store.store_id} (${store.store_description}) with PWT Data ID ${pwtclient.clientid}`);count_changes+=1;await new Promise((resolve)=>setTimeout(resolve,200))}else{console.log("no match or already set. skipping")}}appendPWTDataIdLog({storeId:"",storeName:"All Stores",status:"success",message:`Completed updating PWT Data IDs. Changed ${count_changes}`})}async meters_monthly(){}async run_report_month_meters(btnel){const val=this.shadow.getElementById("report_month_meters").value;const split=val.split(",");const year=parseInt(split[0]);const month=parseInt(split[1]);const csvstr=await $N.FetchLassie("/api/reports/meters_monthly?year="+year+"&month="+month,{headers:{'Content-Type':'text/csv','Accept':'text/csv'}});if(!csvstr.ok){alert("Error");btnel.setAttribute("resolved",true);this.render();return}$N.Utils.CSVDownload(csvstr.data,"meters_monthly_"+year+"_"+month);btnel.setAttribute("resolved",true);this.render()}async adminetc(api,method="GET",body,queries){if(confirm("Are you sure you want to run admin: "+api)){const obj={method};if(body){obj.body=JSON.stringify(body)}if(queries){const queryString=Object.entries(queries).map(([key,value])=>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');api=`${api}${api.includes('?') ? '&' : '?'}${queryString}`}const response=await $N.FetchLassie("/api/admin/"+api,obj);if(!response.ok){alert("Error");return}const d=response.data;if(d.csvreturn){$N.Utils.CSVDownload(d.csvreturn,"admin_"+api.replace(/\//g,"_")+".csv")}else{this.s.admin_response=d.message}this.render()}}async getmachinessnyopsis(){const response=await $N.FetchLassie("/api/admin/reports/machines_synopsis");if(!response.ok){alert("Error");return}const d=response.data;this.s.synopsis.show=true;this.s.synopsis.data=d;this.render()}async internal(api,method="GET",body,queries){if(confirm("Are you sure you want to run internal: "+api)){const obj={method};if(body){obj.body=JSON.stringify(body)}if(queries){const queryString=Object.entries(queries).map(([key,value])=>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');api=`${api}${api.includes('?') ? '&' : '?'}${queryString}`}const response=await $N.FetchLassie("/api/internal/"+api,obj);if(!response.ok){alert("Error");return}this.render()}}async pwtdata_interfaceetc(api,method,body){if(confirm("Are you sure you want to run pwtdata interface: "+api)){const obj={method};if(body){obj.body=JSON.stringify(body)}const response_str=await $N.FetchLassie("/api/pwt/pwtdata_interface/"+api,obj);if(!response_str.ok){alert("Error");return}this.s.pwtdata_interface_response_str=response_str.data;this.render()}}get_logs(){$N.Logger.get()}template=(_s,_reconcile_return_str)=>{return html`<style>

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

#store_pwtdataid_log {
	display: none;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: min(480px, 90vw);
    max-height: 360px;
    overflow-y: auto;
    padding: 16px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    box-shadow: 0 10px 24px rgb(0 0 0 / 20%);
}

#store_pwtdataid_log.active {
    display: block;
}

#store_pwtdataid_log h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    text-align: left;
}

#store_pwtdataid_log ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

#store_pwtdataid_log li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 8px 0;
    border-bottom: 1px solid #ececec;
    font-size: 13px;
    text-align: left;
}

#store_pwtdataid_log li:last-of-type {
    border-bottom: none;
}

#store_pwtdataid_log li.success {
    color: var(--actioncolor);
}

#store_pwtdataid_log li.error {
    color: #b00020;
}

#store_pwtdataid_log li.skipped {
    color: #666666;
}

#store_pwtdataid_log .store {
    font-weight: bold;
}

#store_pwtdataid_log .message {
    opacity: 0.85;
}

#mainhomecontent {
	height:  100vh;
	overflow-y: scroll;
	text-align: center; 
	padding-top: 70px;
}


img.logo {
    width: 47px;
    margin-left: 15px;
    margin-right: 8px;
    position: relative;
    top: -8px;
}

img.logo + strong {
    display: inline-block;
    position: relative;
    top: -20px;
    font-size: 18px;
}

.loginout {
    color: var(--actioncolor);
    font-weight: bold;
    font-size: 15px;
    position: relative;
    top: 13px;
    right: 20px;
    text-align: right;
    display: inline-block;
}

.testy {
    display: none;
    position: absolute;
    width:  100px;
    height: 100px;
    top:    80px;
    left:   30px;
    background-color: orange;
    opacity: 0;
}


.loggedinstatus {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    font-size: 8px;

    & .loggedinstatus {
        padding: 8px 10px;
        margin: 0 0 20px 0;
        font-size: 10px;

        & span {
            font-weight: bold;
            cursor: pointer;
            color: var(--actioncolor);
        }
    }
}

.appupdatedate {
    position: absolute;
    bottom: 30px;
    left: 10px;
    font-size: 12px;
}

a {
    color: red;

    & > span {
        color: blue;
    }
}




.adminsection {
    display: flex;
    flex-wrap: wrap;
    padding: var(--padding-container);
    justify-content: space-between;

    & > section {
        border: 1px solid #e7e7e7;
        background: #fbfbfb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: var(--padding-container);
        width: calc(50% - 5px);
        margin: 0 0 11px 0;
    }
    & > section.fullwidth {
		width: 100%;
	}
    
    & > section > h2 {
        font-size: 16px;
        text-align: left;
    }

    & > section > h2 + div {
        display: flex;
        flex-wrap: wrap;

    }

    & > section > h2 + div > h5 {
        font-weight: normal;
        text-decoration: underline;
        padding-right: 20px;
        cursor: pointer;
    }
}



#admin_response, #pwtdata_interface_response {
    padding: 15px;
    text-align: left;
    border: 1px solid #e7e7e7;
    background: #fbfbfb;
    border-radius: 8px;
    margin: 0 var(--padding-container) 0 var(--padding-container);
}



.error {
    background-color: red;
    color: white;
}



#synopsis {
	position:absolute;
	top: 68px;
	height: 332px;
	overflow-y: scroll;
}

.synopsis-list {
	column-count: 4;
	column-gap: 20px;
	padding: var(--padding-container);
	border: 1px solid #e7e7e7;
	background: #fbfbfb;
	border-radius: 8px;
	margin: 0 var(--padding-container) 0 var(--padding-container);
	

	& dt {
		font-weight: bold;
		text-align: left;
	}

	& dd {
		font-size: 14px;
		text-align: left;
		padding: 0;
		margin: 0 0 20px 0;
	}
}




</style>



<div class="wrapper">


	<div id="store_pwtdataid_log" class="${_s.store_pwtdataid_log.length ? 'active' : ''}">
		<ul>
			${_s.store_pwtdataid_log.map((entry)=> html`
				<li class="${entry.status}">
					<span class="store">${entry.storeName}</span>
					<span class="message">${entry.message}</span>
				</li>
			`)}
		</ul>
	</div>

	<header class="viewheader">
		<div class="left" style="width: 65px;">
			<img class="logo" src="/assets/media/logo-icon.svg" alt="pwtlogo" /><strong>&nbsp;</strong>
		</div>
		<div class="middle"><v-simplegreeting></v-simplegreeting> &nbsp;</div>
		<div class="right">
			${ localStorage.getItem('id_token') ? html`
				<a class="loginout" @click="${()=> this.LogoutUser()}">logout</a>
				` : html`
				<a class="loginout" @click="${()=> { window.location.href='/v/login'; }}">login</a>
				`}
		</div>
	</header>

    <div id="mainhomecontent">

		${ !localStorage.getItem('id_token') ? html`<button style="cursor:pointer;padding: 8px 12px;background:white;border-radius:8px;border:1px solid lightgray;" class="loginout" @click="${()=> { window.location.href='/v/login'; }}">login</button>` : ''}


        ${ localStorage.getItem('id_token') ? html`
            <div style="display:flex; justify-content: space-evenly; align-items: center;">
                <c-btn noanime @click="${()=>$N.SwitchStation.GoTo('machines')}">View Machines</c-btn>
            </div>
			<br><br>
            <div style="display:flex; justify-content: space-evenly; align-items: center;">
                <c-btn noanime @click="${()=>$N.SwitchStation.GoTo('setup_push_allowance')}">Notification Subscription</c-btn>
            </div>
			<br><br>
            <div style="display:flex; justify-content: space-evenly; align-items: center;">
                <c-btn noanime @click="${()=>$N.SwitchStation.GoTo('notifications')}">Employee Notifications</c-btn>
            </div>

            <br><br>
		` : ''}

		<br><br><br><br>
		<!--<a href="https://localhost:3003/index.html?update_init=1">Run Update</a>-->
		<p>&nbsp;</p>
		<p>&nbsp;</p>


        ${ (localStorage.getItem('user_email') === 'accounts@risingtiger.com') ? html`

            <div class="adminsection">

                <section id="adminsection_reports">


                    <h2>Admin Reports</h2>

                    <div>
                        <h5 @click="${()=>this.adminetc('reports/statuses_stats')}">statuses stats</h5>
                        <h5 @click="${()=>this.adminetc('reports/chipcelllocations')}">chip cell locations</h5>
                        <h5 @click="${()=>this.adminetc('reports/pwt_log_meter_compares')}">pwt log meter compares</h5>
                        <h5 @click="${()=>this.adminetc('reports/machines_sanity')}">machines sanity</h5>
                        <h5 @click="${()=>this.getmachinessnyopsis()}">machines synopsis</h5>
                        <h5 @click="${()=>this.adminetc('reports/particle/chipsinfo')}">particle chips info</h5>
                    </div>

                </section> 

                <section id="adminsection_reports">

                    <h2>Admin Logs</h2>

                    <div>
                        <h5 @click="${()=>this.get_logs()}">Get Logs</h5>
                    </div>

                </section> 

                <section id="adminsection_test">

                    <h2>Admin Test</h2>

                    <div>
						<h5 @click="${()=>this.adminetc('test/pushnotifications', 'GET', null)}">Push Notifications</h5>
						<h5 @click="${()=>this.adminetc('test/email', 'GET', null, { title: "Test Title", body: "Email Test From App", tags:"testing,errors" })}">Email</h5>
                    </div>

                </section> 

                <section id="adminsection_tasks">

                    <h2>Admin Tasks</h2>

                    <div>
						<h5 @click="${()=>this.update_all_stores_with_pwtdataid()}">PWTDATAID Update</h5>
						<h5 @click="${()=>$N.SwitchStation.GoTo('adminsyncfrommastercsv')}">Sync From Master CSV</h5>
                    </div>

                </section> 

                <section id="internal">

                    <h2>Internal</h2>

                    <div>
                        <h5 @click="${()=>this.internal('notify/cronschedule_afterstatusschedules', 'GET')}">after status schedules</h5>
                    </div>

                </section> 

            </div>


            <div id="admin_response">
				${_s.admin_response}
            </div>

            <div id="pwtdata_interface_response">
                <p>${_s.pwtdata_interface_response_str}</p>
            </div>

			${ this.s.synopsis.show ? html`
			<div id="synopsis">
				<dl class="synopsis-list">
					<dt>Total Machines:</dt><dd>${this.s.synopsis.data.total}</dd>
					<dt>Active:</dt><dd>${this.s.synopsis.data.active}</dd>
					<dt>Not Active:</dt><dd>${this.s.synopsis.data.notactive}</dd>
					<dt>OK:</dt><dd>${this.s.synopsis.data.ok}</dd>
					<dt>Not OK:</dt><dd>${this.s.synopsis.data.not_ok}</dd>
					<dt>Assigned:</dt><dd>${this.s.synopsis.data.assigned}</dd>
					<dt>Unassigned:</dt><dd>${this.s.synopsis.data.unassigned}</dd>
					<dt>Tiger Total:</dt><dd>${this.s.synopsis.data.tiger_total}</dd>
					<dt>MIA:</dt><dd>${this.s.synopsis.data.mia}</dd>
					<dt>Silent:</dt><dd>${this.s.synopsis.data.silent}</dd>
					<dt>Called In 7days:</dt><dd>${this.s.synopsis.data.calledin}</dd>
					<dt>Poor Cell:</dt><dd>${this.s.synopsis.data.poorcell}</dd>
					<dt>Dispenser Normal:</dt><dd>${this.s.synopsis.data.dispensernormal}</dd>
					<dt>Dispenser LoRa:</dt><dd>${this.s.synopsis.data.dispenserlora}</dd>
					<dt>Dispenser Switch:</dt><dd>${this.s.synopsis.data.dispenserswitch}</dd>
					<dt>Incrs1:</dt><dd>${this.s.synopsis.data.incrs1}</dd>
					<dt>Incrs10:</dt><dd>${this.s.synopsis.data.incrs10}</dd>
					<dt>No Store ID:</dt><dd>${this.s.synopsis.data.nostoreid}</dd>
					<dt>No Machine ID:</dt><dd>${this.s.synopsis.data.nomachineid}</dd>
					<dt>No PWT Data ID:</dt><dd>${this.s.synopsis.data.nopwtdataid}</dd>
					<dt>No National Water ID:</dt><dd>${this.s.synopsis.data.nonationalwaterid}</dd>
					<dt>No Store Brand:</dt><dd>${this.s.synopsis.data.nostorebrand}</dd>
					<dt>No Store GPS:</dt><dd>${this.s.synopsis.data.nostoregps}</dd>
				</dl>
			</div>
			` : ''}


        ` : ''}

    </div>

    <p class="appupdatedate">Updated -- ${(new Date(APPUPDATE_TS*1000)).toLocaleDateString()} -- ${(new Date(APPUPDATE_TS)).toLocaleTimeString()} </p>


</div>


`}}customElements.define('v-home',VHome);export{}