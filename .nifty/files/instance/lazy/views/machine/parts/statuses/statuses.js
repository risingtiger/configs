import MachinesLib from"../../../../libs/machines_lib.js";var Meter_Name=function(Meter_Name){Meter_Name["Store"]="Store";Meter_Name["Pure1"]="Pure1";Meter_Name["Mineral1"]="Mineral1";Meter_Name["Pure2"]="Pure2";Meter_Name["Mineral2"]="Mineral2";return Meter_Name}(Meter_Name||{});const DAY_IN_SECONDS=86400;const DAILY_STATUS_CALLIN_IN_SECONDS=8*3600;const ATTRIBUTES={propa:""};class VPMachineStatuses extends HTMLElement{m={machine:{},statuses:[],daygroups:[],timezone_at_headquarters:"Denver",meters_grand_totals:[]};s={timezone:"",is_timezone_set_to_headquarters:false};a={...ATTRIBUTES};subels=[];shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){await $N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}ingest(loadeddata,pathparams,_searchparams){const d=loadeddata.get(`machines/${pathparams.id}/view`);const rawstatuses=d.statuses;this.m.machine=d.machine;this.m.meters_grand_totals=get_meters_grand_totals(this.m.machine.meters_tally,this.m.machine.incrs,this.m.machine.meters_reconciles);this.s.timezone=this.s.is_timezone_set_to_headquarters?this.m.timezone_at_headquarters:this.m.machine.timezone;this.m.statuses=parse_statuses(rawstatuses,this.m.machine.incrs,this.s.timezone,this.m.machine.particle_product).sort((a,b)=>b.ts-a.ts);this.m.daygroups=set_day_groups(this.m.statuses)}async Switch_Time_Zone(){this.s.is_timezone_set_to_headquarters=this.s.is_timezone_set_to_headquarters?false:true;this.s.timezone=this.s.is_timezone_set_to_headquarters?this.m.timezone_at_headquarters:this.m.machine.timezone;this.render()}render(){render(this.template(this.s,this.m),this.shadow)}template=(_s,_m)=>{return html`<style>


  .content {
    overflow-y: hidden;
  }

  .statusheader { 
    display: flex;
    border-bottom: 3px solid #c5decf;
    background: white;
    box-sizing: border-box;
    height: 103px;

    & > #auxheaderspace_a { 
      display:flex;
      width: 324px;

      & > div { 
        font-size: 12px;
        padding-top: 62px;

        & strong { 
          display: inline-block;
          padding-bottom: 3px;
          font-size: 14px;
          font-weight: 600;
        }
      }
      & > div:nth-child(1) { width: 15px;  }
      & > div:nth-child(2) { width: 103px; }
      & > div:nth-child(3) { width: 72px; }
      & > div:nth-child(4) { width: 70px; }
      & > div:nth-child(5) {  }
    }
  }


  .rotate {
    display: flex;
    flex-grow: 1;
    position: relative;

    & > div {
      position: relative;
      width:10%;
      height: 100px;
      white-space: nowrap;
      text-align: left;

      & > div {
        transform: rotate(300deg);
        transform-origin: bottom left;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 58%;
        height: 25px;

        & > span {
          /*border-bottom: 8px solid #c6decf;	*/
          font-weight: 700;
        }
      }
    }
  }


  .no_statuses {
    text-align: center;
    padding: 40px;
    font-size: 21px;
  }


  ul.statuses {
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    padding-top: 0;
    display: block;
    width: 100%;
    height: calc(100% - 103px);
    overflow-x: hidden;
    overflow-y: scroll;

    & > li {
      display: flex;
      margin: 0;
      padding: 0;
      height: 38px;
      background-image: linear-gradient(180deg, transparent, transparent 48%, #c6decf 48%, #c6decf 52%, transparent 52%);

      & > aside {
        display:flex;
        width: 324px;

        & .datetime {
		  position: relative;
          color: #7b7b7b;
          width: 107px;
          font-size: 13px;
          padding: 4px 0 0 8px;
          margin: 6px 0 0 5px;
          height: 26px;
          box-sizing: border-box;
          border-radius: 8px 0 0 8px;
          background: white;
          border-radius: 8px 0 0 8px;
          border-width: 1px 0 1px 1px;
          border-color: #dee7f1;
          border-style: solid;
        }
        & .datetime.is_startup::before {
		  content: "isstartup";
		  position: absolute;
		  width: 8px;
		  height: 8px;
		  background-color: #5a8cca;
		  border-radius: 50%;
		  margin-right: 5px;
		}
        & .datetime.is_resend::before {
		  content: "isresend";
		  position: absolute;
		  width: 8px;
		  height: 8px;
		  background-color: #5a8cca;
		  border-radius: 50%;
		  margin-right: 5px;
		}

        & > .gallons {
          display: flex;
          font-size: 13px;
          padding: 6px 0px 0 0px;

          & > div {
            width: 70px;
            height: 26px;
            color: #7b7b7b;
            font-weight: normal;
            padding: 4px 0 0 8px;
            background: white;
            box-sizing: border-box;
            border-radius: 0;
            border-width: 0;
            border-color: #dee7f1;
            border-style: solid;

            & > span:nth-child(1) {
              display: inline-block;
              width: 23px;
            }
            & > span:nth-child(2) {
              display: inline-block;
              width: 16px;
            }
            & > span:nth-child(3) {
              display: inline-block;
              width: 10px;
            }

          }
          & > div:nth-child(1) {
            border-radius: 0;
            border-width: 1px 0 1px 0;
          }
          & > div:nth-child(2) {
            border-radius: 0;
            border-width: 1px 0 1px 0;
          }
          & > div:nth-child(3) {
            border-radius: 0 8px 8px 0;
            border-width: 1px 1px 1px 0;
          }
        }
      }

      & > .statuses {
        flex-grow: 1;
        display: flex;

        & > div {
          position: relative;
          text-align: center;
          width: 10%;
          background-image: linear-gradient(90deg, transparent, transparent 49%, #d9e8e0 49%, #d9e8e0 50%, transparent 50%);

          & > span.single {
            display: inline-block;
            padding-top: 6px;

            & > img {
              width: 24px;
            }
          }
          & > span.double {
            position: absolute;
            top: 6px;
            display: block;
            left: 50%;
            z-index: 2;

            & > img {
              width: 24px;
            }
          }
          & > span.double:nth-child(1) {
            margin-left: -18px;
          }
          & > span.double:nth-child(2) {
            margin-left: -7px;
          }
          & > span.double.ok {
            z-index: 1;
          }
        }
      }
    }
    
    & > li.totalsrow {
      margin-bottom: 36px;
      margin-top: 0px;

      & > aside {

        & .datetime {
          font-weight: bold;
          color: #5a8cca;
          background-color: #ebeef2;
        }

        & > .gallons {

          & > div {
            color: white;
            font-weight: bold;
            border-width: 0;
            padding-top: 5px;
          }
          & > div:nth-child(1) {
            background-color: #5b88bf;
            border-right: 2px solid #d3e5fc;
          }
          & > div:nth-child(2) {
            background-color: #5b88bf;
            border-right: 2px solid #d3e5fc;
          }
          & > div:nth-child(3) {
            background-color: #5b88bf;
          }
        }
      }
    }
  }




@media only screen and (max-device-width: 767px) {

    .statusheader .rotate {
        display: none;
    }

    ul.statuses > li > .statuses {
        display: none;
    }
}




@media only screen and (min-device-width: 768px) {

}



</style>


<div class="statusheader">
  <div id="auxheaderspace_a">
    <div>&nbsp;</div>
	<div @click="${()=>this.Switch_Time_Zone()}"><strong>Timezone</strong><br>${_s.timezone == 'Denver' ? 'Salt Lake' : _s.timezone}</div>

	<div><strong>Store</strong><br>${ _m.meters_grand_totals[0]}</div>
	<div><strong>Pure</strong><br>${  _m.meters_grand_totals[1]}</div>
	<div><strong>Min</strong><br>${   _m.meters_grand_totals[2]}</div>
  </div>

  <div class="rotate">
    <div><div><span>After Filter</span></div></div>
    <div><div><span>Disp Pwr</span></div></div>
    <div><div><span>Drip Pan</span></div></div>
    <div><div><span>SmpOver</span></div></div>
    <div><div><span>SmpRun</span></div></div>
    <div><div><span>SmpRunB</span></div></div>
    <div><div><span>Tank</span></div></div>
    <div><div><span>UV Bulb</span></div></div>
    <div><div><span>Proc Pwr</span></div></div>
    <div><div><span>Nozzle</span></div></div>
    <div><div><span>LoRa MIA</span></div></div>
    <div><div><span>Door</span></div></div>
  </div>
</div>

<ul class="statuses">

    <li style="background:none;height: 19px;">
        <aside></aside>

        <div class="statuses">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </li>

    ${!_m.daygroups.length ? html`
        <li style="background:none;height: 19px;">
            There are no statuses yet
        </li>
    ` : html``}

    ${_m.daygroups.map(dg=> html`

        ${dg.statuses.map(s=> html`
            <li>

              <aside>
				<div class="datetime type_${s.type}  ${s.is_startup ? 'is_resend' : ''}">${s.datestr}&nbsp${s.timestr}</div>

                <div class="gallons">
                  <div><span>${s.meters.get('Store')}</span></div>
                  <div><span>${s.meters.get('Pure1')}</span><span>◉</span><span>${s.meters.get('Pure2')}</span></div>
                  <div><span>${s.meters.get('Mineral1')}</span><span>◉</span><span>${s.meters.get('Mineral2')}</span></div>
                </div>
              </aside>


              <div class="statuses">
                <div>${Lit_UnsafeHtml(s.indicators.afltlw)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.dsppwr1)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.drppan)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.smpovr1)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.smprun)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.smprunalrt)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.tnklvl)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.uvblb1)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.procpwr)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.nzl1)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.loramia)}</div>
                <div>${Lit_UnsafeHtml(s.indicators.srvdr1)}</div>
              </div>

            </li>
        `)}   

        <li class="totalsrow">

          <aside>

            <div class="datetime"><span></span><span>daily approx.</span></div>

            <div class="gallons">
              <div>${dg.summary.meters.get("Store")}</div>
              <div>${dg.summary.meters.get("Pure1") + dg.summary.meters.get("Pure2")}</div>
              <div>${dg.summary.meters.get("Mineral1") + dg.summary.meters.get("Mineral2")}</div>
            </div>

          </aside>

          <div class="statuses"></div>
        </li>

    `)}

</ul>




`}}customElements.define('vp-machinestatuses',VPMachineStatuses);function get_meters_grand_totals(meters_tally,incrs,meters_reconciles){let total_meters=meters_tally.slice();for(let reconcile of meters_reconciles){for(let i=0;i<5;i++){total_meters[i]+=reconcile.deltas[i]}}const x=[total_meters[0]*incrs[0],total_meters[1]*incrs[1]+total_meters[3]*incrs[3],total_meters[2]*incrs[2]+total_meters[4]*incrs[4]];return x.map((v)=>{if(v<1000){return v.toString()}else if(v<1000000){return(v/1000).toFixed(0)+"K"}else{return(v/1000000).toFixed(0)+"M"}})}function parse_statuses(raw_statuses,incrs,timezone,particle_product_id){const parsed_statuses=[];for(let i=0;i<raw_statuses.length;i++){const s=raw_statuses[i];let type=0;switch(s.tags.type){case 0:type=0;break;case 1:type=1;break;case 2:type=2;break}const is_resend=s.tags.is_resend;const date=new Date(s.ts*1000);const x=date.toLocaleDateString("en-US",{timeZone:"America/"+timezone});const y=x.split("/");y[0]=y[0].padStart(2,"0");y[1]=y[1].padStart(2,"0");const day_of_month=Number(y[1]);const month=Number(y[0]);const datestr=y[0]+"/"+y[1];const timestr=date.toLocaleTimeString("en-US",{hour12:false,timeZone:"America/"+timezone});let meters;meters=new Map([["Store",getMeter(incrs[0],s.meters_tally[0],raw_statuses[i+1]?.meters_tally[0])],["Pure1",getMeter(incrs[1],s.meters_tally[1],raw_statuses[i+1]?.meters_tally[1])],["Mineral1",getMeter(incrs[2],s.meters_tally[2],raw_statuses[i+1]?.meters_tally[2])],["Pure2",getMeter(incrs[3],s.meters_tally[3],raw_statuses[i+1]?.meters_tally[3])],["Mineral2",getMeter(incrs[4],s.meters_tally[4],raw_statuses[i+1]?.meters_tally[4])]]);const bits_xp=MachinesLib.ParseBits(s.bits,particle_product_id);parsed_statuses.push({id:s.id,bits_xp,meters,datestr,timestr,date,day_of_month,month,day_summary:null,is_resend,type,ts:s.ts})}for(let i=parsed_statuses.length-1;i>=0;i--){const s=parsed_statuses[i];const snext=parsed_statuses[i+1]||null;s.indicators=parse_indicators(s.bits_xp,snext?.bits_xp)}return parsed_statuses;function getMeter(increment,meter_tally,previous_meter_tally){return previous_meter_tally?(meter_tally-previous_meter_tally)*increment:0}}function parse_indicators(sBitsXp,sNextBitsXp){const rtn={};for(const key in sBitsXp){if(key.endsWith("2"))continue;const s=sBitsXp[key];const next=sNextBitsXp&&sNextBitsXp[key]?sNextBitsXp[key]:null;const nextstate=next?next.state:false;const bit1=s.state;const nbit1=nextstate;const bit2=key.endsWith("1")?sBitsXp[key.replace("1","2")]?.state:null;const nbit2=key.endsWith("1")&&next?sNextBitsXp[key.replace("1","2")]?.state:null;rtn[key]=htmlstr(key.endsWith('1')?2:1,s.type,bit1,nbit1,bit2,nbit2)}return rtn;function htmlstr(classt,wstr,bit1,nbit1,bit2,nbit2){let str="";if(classt===1){const x=bit1?wstr:nbit1?"recovered":"";str=x?`<span class='single'><img src='/assets/media/bubble_${x}.svg' /></span>`:""}else if(classt===2){if(!bit1&&!nbit1&&!bit2&&!nbit2){str=""}else{const x1=bit1?wstr:nbit1?"recovered":"ok";const x2=bit2?wstr:nbit2?"recovered":"ok";str=`<span class='double ${x1}'><img src='/assets/media/bubble_${x1}.svg' /></span>`;str+=`<span class='double ${x2}'><img src='/assets/media/bubble_${x2}.svg' /></span>`}}return str}}function set_day_groups(parsed_statuses){const day_groups=[];parsed_statuses.forEach((s,index)=>{const day_group_ts=calculate_day_group_ts(s.ts);let day_group=day_groups.find((dg)=>dg.ts===day_group_ts);if(!day_group){day_groups.push({ts:day_group_ts,summary:{day_of_month:s.day_of_month,month:s.month,meters:new Map([["Store",0],["Pure1",0],["Mineral1",0],["Pure2",0],["Mineral2",0]])},statuses:get_statuses_for_day_group(parsed_statuses,index,day_group_ts)});day_group=day_groups[day_groups.length-1]}});day_groups.forEach(calc_day_group_meter_totals);return day_groups;function calc_day_group_meter_totals(day_group){day_group.statuses.forEach((s)=>{for(let[key,value]of day_group.summary.meters){day_group.summary.meters.set(key,value+s.meters.get(key))}})}function get_statuses_for_day_group(parsed_statuses,index,day_group_ts){const day_group_statuses=[];for(let i=index;i<parsed_statuses.length;i++){const s=parsed_statuses[i];if(s.ts>=day_group_ts&&s.ts<day_group_ts+DAY_IN_SECONDS){day_group_statuses.push(s)}}return day_group_statuses}function calculate_day_group_ts(status_ts){let ts_last_daily_callin=0;let ts_seconds_into_day=status_ts%DAY_IN_SECONDS;if(ts_seconds_into_day>DAILY_STATUS_CALLIN_IN_SECONDS){const last_midnight=status_ts-ts_seconds_into_day;ts_last_daily_callin=last_midnight+DAILY_STATUS_CALLIN_IN_SECONDS}else{const two_midnights_ago=status_ts-ts_seconds_into_day-DAY_IN_SECONDS;ts_last_daily_callin=two_midnights_ago+DAILY_STATUS_CALLIN_IN_SECONDS}return ts_last_daily_callin}}