import'./parts/addmachine/addmachine.js';import'./parts/notification/notification.js';import MachineLib from"../../libs/machines_lib.js";const ATTRIBUTES={propa:""};const month_abbr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];class VMachines extends HTMLElement{s={sortby:"state",show_logs:0,meters_report_view:{show:0,machine_id:"",machine_incrs:[],machine_ts:0,header_name:""},details_view:{show:0,machine_id:""},add_view:{show:0},map_view:{show:0,machine_id:""},search:{active:false,field:"",val:""},machine_ids_with_err_for_notification:[],retrieve_tries:0,search_timeout:null,current_search_controller:null};m={machines:[]};a={...ATTRIBUTES};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this);$N.SSEvents.Add_Listener(document.body,"machines_notifications",["datasync_doc_patch"],null,async(event)=>{if(!/machines\/[0-9A-Z_a-z]+$/.test(event.paths[0]))return;const notificationsEl=this.shadow.querySelector('vp-machine-notification');const updated_machine=event.data;const is_in_list=this.s.machine_ids_with_err_for_notification.includes(updated_machine.machine_id);const bits=MachineLib.ParseBits(updated_machine.state_latest,updated_machine.particle_product);const{errmsg,name:bitname}=get_states(bits);if(is_in_list&&updated_machine.state_condition!=="err"){this.s.machine_ids_with_err_for_notification=this.s.machine_ids_with_err_for_notification.filter((id)=>id!==updated_machine.machine_id);notificationsEl.DismissAlert(bitname)}else if(!is_in_list&&updated_machine.state_condition==="err"){this.s.machine_ids_with_err_for_notification.push(updated_machine.machine_id);notificationsEl.AddNotification(MachineLib.GetTitle(updated_machine),errmsg,updated_machine.machinets,bitname,'err')}})}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}static load=(_pathparams,searchparams)=>new Promise(async(res,rej)=>{const d=new Map();const hasSearch=searchparams.search_field&&searchparams.search_val;const hasListView=searchparams.what&&searchparams.secondary;const promises=[];if(hasSearch){const field=encodeURIComponent(searchparams.search_field);const val=encodeURIComponent(searchparams.search_val);promises.push($N.FetchLassie(`/api/machines/search?field=${field}&val=${val}`,{method:"GET"}))}else if(hasListView){promises.push($N.FetchLassie(`/api/machines?what=${searchparams.what}&secondary=${searchparams.secondary}`,{method:"GET"}))}else{promises.push($N.FetchLassie('/api/machines?what=notok&secondary=none',{method:"GET"},{cacheit:'5s'}))}const results=await Promise.all(promises);if(!results[0].ok){rej();return}d.set("machines_view_list",results[0].data);res({d,refreshon:["machines"]})});ingest=(loadeddata,_pathparams,searchparams)=>{this.m.machines=structuredClone(loadeddata.get('machines_view_list'));if(searchparams.search_field&&searchparams.search_val){this.s.search.active=true;this.s.search.field=searchparams.search_field;this.s.search.val=searchparams.search_val}else{this.s.search.active=false;this.s.search.field="";this.s.search.val=""}this.aux_data()};async filterKeyup(e){if(e.key==="Shift")return;const el=e.currentTarget;const val=el.value.toLowerCase();const field=el.dataset.field;const formel=this.shadow.querySelector('form#filter');const all_inputs=formel.querySelectorAll('input');if(val.length<1&&!/^[a-zA-Z0-9 ,_]$/.test(e.key)){el.value='';$N.SwitchStation.GoTo('machines')}all_inputs.forEach((input)=>{if(input!==el){input.value=''}});if(val.length<2)return;if(this.s.current_search_controller){this.s.current_search_controller.abort()}if(this.s.search_timeout){clearTimeout(this.s.search_timeout)}this.s.search_timeout=setTimeout(async()=>{await this.filterkeyup__perform_search(field,val)},300)}async filterkeyup__perform_search(field,val){this.s.current_search_controller=new AbortController();const qs=`?search_field=${encodeURIComponent(field)}&search_val=${encodeURIComponent(val)}`;$N.SwitchStation.GoTo(`machines${qs}`,{replacestate:true})}gotoMachine(id){const machine=this.m.machines.find((m)=>m.machine_id===Number(id));const lirowel=this.shadow.querySelector(`li[data-id='${id}']`);$N.Clickity(lirowel);$N.SwitchStation.GoTo(`machines/${id}?firestore_refid=${machine?.firestore_refid}`)}showLogs(){this.s.show_logs=1;this.render()}show_machine_details(machine_id){this.s.details_view.machine_id=machine_id;this.s.details_view.show=1;this.render()}show_machine_map(machine_id){this.s.map_view.machine_id=machine_id;this.s.map_view.show=1;this.render()}show_machine_add(){this.s.add_view.show=1;this.render()}aux_data(){for(const m of this.m.machines){const now=Date.now();const lastcall_d=new Date(m.lastcall*1000);const bits=MachineLib.ParseBits(m.state_latest,m.particle_product);const{errmsg,warnmsg,infomsg}=get_states(bits);m.d=get_last_callin(m.lastcall);m.stateToShow=5;m.stateToShowColor="recovered";if(!m.state_active){m.stateToShow=7;m.stateToShowColor="inactive"}else if(lastcall_d.getTime()<now-86400000*30){m.stateToShow=1;m.stateToShowColor="offline"}else if(errmsg){m.stateToShow=2;m.stateToShowColor="err"}else if(warnmsg){m.stateToShow=3;m.stateToShowColor="warn"}else if(infomsg){m.stateToShow=4;m.stateToShowColor="info"}if(errmsg)m.msg=errmsg;else if(warnmsg)m.msg=warnmsg;else if(infomsg)m.msg=infomsg;else if(m.stateToShow===1)m.msg="Offline";else m.msg="Ok"};if(this.s.sortby==="state"){this.m.machines.sort((a,b)=>{return a.stateToShow>b.stateToShow?1:-1})}}render(state_changes={}){this.s=Object.assign(this.s,state_changes);render(this.template(this.s,this.m),this.shadow);setTimeout(()=>{const filter_storetitle=this.shadow.querySelector("input[name='search_storetitle']");const filter_nwid=this.shadow.querySelector("input[name='search_nwid']");const filter_chip=this.shadow.querySelector("input[name='search_chip']");const filter_serial=this.shadow.querySelector("input[name='search_serial']");filter_storetitle.value=this.s.search.field==='nameetc'?this.s.search.val:'';filter_nwid.value=this.s.search.field==='nwid'?this.s.search.val:'';filter_chip.value=this.s.search.field==='chip'?this.s.search.val:'';filter_serial.value=this.s.search.field==='serial'?this.s.search.val:''},100)}template=(_s,_m)=>{return html`<style>

.viewheader > .right > i.icon-add {
	font-size: 15px;position: relative;top: 0px;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.viewheader > .right > i.icon-refresh {
	font-size: 16px;
	position: absolute;
	top: 11px;
	right: 28px;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}



vp-machine-notification {
	position: fixed;
	z-index: 2;
    left: -5000%;
}
vp-machine-notification[active] {
	left: 50%;
}

#filterwrap {
	width: 100%;
	height: 101px;
	box-sizing: border-box;
	overflow-x: scroll;
	padding-top: 34px;


    form#filter {
		width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        position: relative;
        padding: 11px 11px 17px 11px;
        box-sizing: border-box;
        overflow-x: scroll;
        /*border-bottom: 2px solid #e8e8e8;*/

        & > .justinput.search {
            flex: 1;
			padding-right: 10px;

			& > input {
				border-radius: 8px;
			}
        }
        & > .justinput.search:last-child {
            padding-right: 0;
        }

        /*
        & >
        span.filtertype {
            display: block;
        position: relative;
        padding-right: 10px;
        position: relative;
        width: 100%;

            & >
        input {
                font-size: 13px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #cecece;
        border-radius: 4px;
        padding: 7px 5px 8px 25px;
        color: #6d6d6d;
        display: block;
        margin-top: 0;
        width: 100%;
            }
            & >
        input::placeholder {
                color: #b5b5b5;
            }

            & >
        i {
                color: #bdbdbd;
        font-size: 19px;
        position: absolute;
        top: 6px;
        left: 6px;
            }
        }
        & >
        span.filtertype:last-child {
            padding-right: 0;
        }
    ;
        width: 100%;
			*/
    }
}

#filterwrap form#filter .justinput.search > input.search-active { outline: 2px solid #3b82f6; outline-offset: 0; }

#machines_scrollable {
	width: 100vw;
	height: calc(100vh - var(--viewheader-height) - 72px); 
	overflow-y: scroll;
	overflow-x: hidden;
}

#machines_scrollable > h4.search-summary {padding: 8px 11px 19px 12px;font-weight: bold;}

.filter-links {
	display: flex;
	flex-wrap: wrap;
	gap: 8px 16px;
	padding: 10px 12px;
}

ul.items {
    & li {
		& .aux.brandname, & .aux.info {
			p.bitslegend > .bit {
				font-size: 13px;
				color: var(--textcolor-fade);
			}
		}

        & .aux.brandname {
            width: 275px;
            min-width: 275px;
            max-width: 275px;
            margin-right: 7px;
            overflow: hidden;
            
        }

        & .aux.identifiers {
            width: 80px;
            flex: 1;

            & h6.bits {
				span:nth-child(1) {
					width: 100px;
				}
				span:nth-child(2) {
					width: 52px;
				}
            }
            & p.bitslegend {
				span:nth-child(1) {
					width: 52px;
				}
				span:nth-child(2) {
					width: 52px;
				}
            }
        }


        & .aux.info {
            width: 220px;
            flex: 1;

            & h6.bits {
				justify-content: flex-start;

				span:nth-child(1) {
					width: 243px;
				}
            }
            & p.bitslegend {
				justify-content: flex-start;
				
				
				span:nth-child(1) {
					width: 120px;
				}
            }
        }
    }
}

ion-item:nth-child(1) ion-label {
    margin-top: 8;
}

ion-avatar {
    width: 27px;
    height: 27px;
}

h3 + p {
    padding-left: 10px;
}

.isoffline_text {
    color: red;
}


#listview_buttons {
	position: relative;
	text-align:  right;
	padding-top: 11px;
	padding-right: 11px;

	& > button {
		background:  none;
		display: inline-block;
		border: none;
		padding-left: 30px;
	}
}



@media only screen and (max-device-width: 767px) {

	.viewheader > .right > i.icon-refresh {
		top: 0px;
	}

	ul.items > li > i.action, ul.items > li > .aux.info {
		display: none;
	}

	ul.items > li > .actions > i.icon-meter {
		display: none;
	}
	ul.items > li > .actions > i.icon-location {
		display: none;
	}


    #filterwrap {

        form#filter {
            width: 842px;
            padding-top: 8px;
            padding-bottom: 8px;
        }
    }

}

@media only screen and (min-device-width: 768px) {
}



</style>

<div class="wrapper">

	<header class="viewheader">
		<a class="left" @click="${()=>$N.SwitchStation.GoBack({default:'home'})}"><span>‸</span></a>
		<a class="middle"><h1>Machines</h1></a>
		<div class="right">
			${localStorage.getItem('user_email') === 'accounts@risingtiger.com' ? html`
				<i class="icon-add"  @click="${()=>{ this.show_machine_add(); }}" style=""></i>
				<!--<i class="icon-edit1"  @click="${()=>{ Firestore.Patch(`machines/NhDu4jmNyRBHN0AXs4WX`, { "store.brand": ("Luckys" + ( Math.floor(Math.random() * 20) )) }); }}" style="font-size: 25px;position: relative;top: 5px;"></i>-->
			` : ''}
		</div>
	</header>

    <div id="filterwrap">
        <form id="filter">
            <span class="justinput search">
                <i class="icon-search"></i>
                <input name="search_storetitle" data-field="nameetc" @keyup="${(e)=>this.filterKeyup(e)}" type="text" placeholder="Store Title" value="${_s.search.field==='nameetc' ? _s.search.val : ''}" class="${_s.search.field==='nameetc' ? 'search-active' : ''}"></input>
            </span>
            <span class="justinput search">
                <i class="icon-search"></i>
                <input name="search_nwid" data-field="nwid" @keyup="${(e)=>this.filterKeyup(e)}" type="text" placeholder="National Water ID" value="${_s.search.field==='nwid' ? _s.search.val : ''}" class="${_s.search.field==='nwid' ? 'search-active' : ''}"></input>
            </span>
            <span class="justinput search">
                <i class="icon-search"></i>
                <input name="search_chip" data-field="chip" @keyup="${(e)=>this.filterKeyup(e)}" type="text" placeholder="Chip ID" value="${_s.search.field==='chip' ? _s.search.val : ''}" class="${_s.search.field==='chip' ? 'search-active' : ''}"></input>
            </span>
            <span class="justinput search">
                <i class="icon-search"></i>
                <input name="search_serial" data-field="serial" @keyup="${(e)=>this.filterKeyup(e)}" type="text" placeholder="Serial Number" value="${_s.search.field==='serial' ? _s.search.val : ''}" class="${_s.search.field==='serial' ? 'search-active' : ''}"></input>
            </span>
        </form>
    </div>

	<div id="machines_scrollable">
		${_s.search.active ? html`<h4 class="search-summary">Searching by ${_s.search.field==='nameetc' ? 'title' : (_s.search.field==='chip' ? 'chip' : 'serial number')} for ${_s.search.val}</h4>` : ''}
		<ul class="items">

			${_m.machines.map(m => html`
				<li @click="${(e) => this.gotoMachine(e.currentTarget.dataset.id)}" data-id="${m.machine_id}">
					<div class="thumbnail"><img width="27" src="/assets/media/bubble_${m.stateToShowColor}.svg"></div>

					<div class="aux brandname">
						<h6 class="bits">
							<span class="bit">${m.particle_product === 37972 ? html`<i class="action icon-circles"></i>` : ''} ${get_title(m)}</span>
						</h6>
						<p class="bitslegend">
							<span class="bit">${m.msg}</span>
							<!-- <span class="bit">${m.msg}</span> -->
						</p>
					</div>

					<!-- 
							${(m.particle_product === 11723 || m.particle_product === 20405 || m.particle_product === 20568) ? 'Boron' : 'BSeries'} / ${m.particle_serial.substring(m.particle_serial.length-4)} / ${m.particle_codeversion || '--'}</h6>
					-->

					<div class="aux info">
						<h6 class="bits">
							<!--<span class="bit">${m.cellsignal[0]} & ${m.cellsignal[1]}</span>-->
							<span class="bit">nwid ${m.logistics_nationalwaterid.replace(/^0+/, '')} &nbsp;|&nbsp; chip ${m.logistics_chipid.replace(/^0+/, '')} &nbsp;|&nbsp; serial ${m.particle_serial.slice(-4)}</span>
						</h6>
						<p class="bitslegend">
							<!--<span class="bit">cell sig</span>-->
							<span class="bit">machine ${m.logistics_machineid !== '0000000' ? m.logistics_machineid.replace(/^0+/, '') : 'not set'}</span>
						</p>
					</div>

					<div class="aux info">
						<h6 class="bits">
							<span class="bit">last call ${m.d}</span>
						</h6>
						<p class="bitslegend">
							<span class="bit">cell ${m.cellsignal[0]},${m.cellsignal[1]}</span>
						</p>
					</div>

					<!-- $N.FetchLassie("/api/pwt/admin/test/sse?path=machines/Qp1T2SYG3LQzJS9ffEtA") -->
					<div class="actions">
						<i class="action icon-info" data-mid="${m.machine_id}" @click="${(e)=>{ const mid = e.currentTarget.dataset.mid; this.show_machine_details(mid); e.stopPropagation(); }}"></i>
						<i class="action icon-location" data-mid="${m.machine_id}" @click="${(e)=>{ const mid = e.currentTarget.dataset.mid; this.show_machine_map(mid); e.stopPropagation(); }}"></i>
					</div>
					
					
					<!--
					<div class="aux btnactions">
						<h6 data-machine_record_id="${m.id}" @click="${(e)=>this.show_details(e)}"><i class="icon-info" style=""></i></h6>
						<h6 data-machine_record_id="${m.id}" @click="${(e)=>this.metersReportClicked(e)}"><i class="icon-location" style=""></i></h6>
						<h6 data-machine_record_id="${m.id}" @click="${(e)=>this.meters_report_clicked(e)}"><i class="icon-meter" style=""></i></h6>
					</div>
					-->
				</li>
			`)}

		</ul>

		<div class="filter-links">
			<a @click="${()=>$N.SwitchStation.GoTo('machines?what=notok&secondary=none', {replacestate:true})}">Show Not OK</a>
			<a @click="${()=>$N.SwitchStation.GoTo('machines?what=all&secondary=none', {replacestate:true})}">Show All</a>
			<a @click="${()=>$N.SwitchStation.GoTo('machines?what=inactive_but_calling&secondary=none', {replacestate:true})}">Show Inactive But Calling</a>
			<a @click="${()=>$N.SwitchStation.GoTo('machines?what=newmachines&secondary=none', {replacestate:true})}">Show New Machines</a>
			<a @click="${()=>$N.SwitchStation.GoTo('machines?what=development&secondary=none', {replacestate:true})}">Show Development Chips</a>
		</div>

		<h6 style="padding:10px 0 8px 13px;font-weight:normal;">Linked & Active machines in error or warning state (having called in within the past week)</h6>
	</div>

	<vp-machinenotification></vp-machinenotification>

</div>




${_s.show_logs ? html`
	<c-ol2 shape="1" title="Logs" showheader="true" @close="${()=> this.sc({show_logs:0}) }">
		<span slot="headermiddle">Logs</span>
		<vp-machinelogs></vp-machinelogs>
	</c-ol2>
` : '' }

${_s.details_view.show !== 0 ? html`
	<c-ol2 title="Machine Details" @close="${()=> { this.s.details_view.show = 0; this.render(); }}">
        <vp-machinedetails machine_id="${_s.details_view.machine_id}"></vp-machinedetails>
    </c-ol2>
` : ''}

${_s.add_view.show !== 0 ? html`
	<c-ol2 title="Add Machine" @close="${()=> { this.s.add_view.show = 0; this.render(); }}">
        <vp-machineaddmachine></vp-machineaddmachine>
    </c-ol2>
` : ''}

${_s.map_view.show !== 0 ? html`
	<c-ol2 title="Machine Map" @close="${()=> {this.s.map_view.show = 0; this.render(); }}">
        <vp-machinemap machine_id="${_s.map_view.machine_id}"></vp-machinemap>
    </c-ol2>
` : ''}


`}}customElements.define("v-machines",VMachines);function get_states(bitsXp){let errmsg="";let warnmsg="";let infomsg="";let errname="";let warnname="";let infoname="";let highestPriorityErr=Number.MAX_SAFE_INTEGER;let highestPriorityWarn=Number.MAX_SAFE_INTEGER;let highestPriorityInfo=Number.MAX_SAFE_INTEGER;for(const bitName in bitsXp){const bitKey=bitName;const bitInfo=bitsXp[bitKey];if(bitInfo.state&&bitInfo.type==='err'&&bitInfo.priority<highestPriorityErr){errmsg=bitInfo.errmsg;highestPriorityErr=bitInfo.priority;errname=bitName}else if(bitInfo.state&&bitInfo.type==='warn'&&bitInfo.priority<highestPriorityWarn){warnmsg=bitInfo.errmsg;highestPriorityWarn=bitInfo.priority;warnname=bitName}else if(bitInfo.state&&bitInfo.type==='info'&&bitInfo.priority<highestPriorityInfo){infomsg=bitInfo.errmsg;highestPriorityInfo=bitInfo.priority;infoname=bitName}}if(errmsg)return{errmsg,warnmsg:"",infomsg:"",name:errname};if(warnmsg)return{errmsg:"",warnmsg,infomsg:"",name:warnname};if(infomsg)return{errmsg:"",warnmsg:"",infomsg,name:infoname};return{errmsg:"",warnmsg:"",infomsg:"",name:""}}function get_title(m){return MachineLib.GetTitle(m)}function get_last_callin(machine_lastcall){const date=new Date(machine_lastcall*1000);const dstr=month_abbr[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();return dstr}export{get_title}