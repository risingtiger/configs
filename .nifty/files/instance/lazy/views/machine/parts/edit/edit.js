const ATTRIBUTES={propa:""};class VPMachineEdit extends HTMLElement{a={...ATTRIBUTES};s={propa:"",storelink:{step:0,nationalwaterid:null,storedata:null}};m={machine:{},brands:["Bees","Bellas","Clarks","Daisys Holistic","Davis Foods","Digbys","Food Ranch","Good Earth","Harmons","Lallatin","Lees","Lins","Luckys","Madison Foods","Maceys","Marios","McKays","New Seasons","Sprouts","Thyme","Village Market","WinCo","Winegars","Woodburn","Whole Foods"]};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterViewPart(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewPartDisconnectedCallback(this)}ingest(loadeddata,pathparams){const m=loadeddata.get(`machines/${pathparams.id}/view`);const machine=m.machine;this.m.machine=machine;this.m.brands.sort((a,b)=>{return a.localeCompare(b)});this.m.brands.unshift("NOT SET");if(!this.m.brands.includes(this.m.machine.store_brand||"")){this.m.machine.store_brand="NOT SET"}}render(state_changes={}){this.s=Object.assign(this.s,state_changes);render(this.template(this.s,this.m),this.shadow)}async actiontermclicked(){const isactiveEl=this.shadow.querySelector("c-in2[name='isactive']");const brandEl=this.shadow.querySelector("c-in2[name='brand']");const newIsActive=isactiveEl.getAttribute("val")==="true";const newBrand=brandEl.getAttribute("val");const curIsActive=!!this.m.machine.state_active;const curBrand=this.m.machine.store_brand;const updates=[];if(newIsActive!==curIsActive){updates.push({table:'machines',rowid:this.m.machine.machine_id,props:{state_active:newIsActive}})}if(newBrand!==curBrand){updates.push({table:'stores',rowid:this.m.machine.store_id,props:{store_brand:newBrand}})}updates.push(...this.get_incrsupdates());if(updates.length===0){alert("No save required; make some modifications first.");return}const body={updates};const opts={method:'PUT',body:JSON.stringify(body)};const r=await $N.FetchLassie(`/api/machines/${this.m.machine.machine_id}`,opts,null);if(!r.ok){alert('Unable to save changes');return}$N.ToastShow("Changes Saved")}get_incrsupdates(){const storeEl=this.shadow.querySelector("c-in2[name='incrs_store']");const pure1El=this.shadow.querySelector("c-in2[name='incrs_pure1']");const min1El=this.shadow.querySelector("c-in2[name='incrs_min1']");const pure2El=this.shadow.querySelector("c-in2[name='incrs_pure2']");const min2El=this.shadow.querySelector("c-in2[name='incrs_min2']");const newIncrs=[Number(storeEl.getAttribute("val")||"0"),Number(pure1El.getAttribute("val")||"0"),Number(min1El.getAttribute("val")||"0"),Number(pure2El.getAttribute("val")||"0"),Number(min2El.getAttribute("val")||"0")];const curIncrs=(this.m.machine.incrs||[]).map((n)=>Number(n));const changed=newIncrs.some((n,i)=>n!==curIncrs[i]);if(!changed){return[]}const updates=[{table:'machines',rowid:this.m.machine.machine_id,props:{incrs:newIncrs}}];return updates}nw_id_keyup(e){if(e.key!=="Enter"){return}this.searchStore()}async searchStore(e){const btndone=e?e.detail.done:()=>{};const nwIdEl=this.shadow.querySelector("input[name='nw_id']");const nwId=Number(nwIdEl.value);if(isNaN(nwId)){alert("Please enter a National Water ID. Must be a number");return}this.s.storelink.nationalwaterid=nwId;try{const r=await $N.FetchLassie(`/api/stores/search?field=nationalwaterid&val=${nwId}`);if(!r.ok||r.data.length===0){throw new Error("Store not found")}this.s.storelink.storedata=r.data[0]}catch(err){alert("Error fetching store details");this.s.storelink.nationalwaterid=null;this.s.storelink.storedata=null;btndone();return}this.s.storelink.step=2;btndone();this.render()}async linkStore(e,forcelink=false){this.s.storelink.step=3;this.render();try{const r=await $N.FetchLassie(`/api/machines/${this.m.machine.machine_id}/linkstore?nationalwaterid=${this.s.storelink.nationalwaterid}${forcelink ? '&force=true' : ""}`);if(!r.ok){throw new Error("No response")}if(r.data.ermsg){throw new Error(r.data.ermsg)}}catch(ermsg){if(ermsg.message.includes('store already linked')){if(confirm("Store is already linked to another machine. Click OK to proceed to link anyway, which will result in a single store being linked to multiple machines")){this.linkStore(e,true);return}}$N.ToastShow(ermsg.message,4);e.detail.done();await new Promise((r)=>setTimeout(()=>r(1),2000));this.s.storelink.step=2;this.render();return}$N.ToastShow("Store linked successfully!");this.s.storelink.step=4;e.detail.done();const revealel=this.shadow.querySelector("c-reveal#storelink");setTimeout(()=>{revealel.closeit();this.s.storelink.nationalwaterid=null;this.s.storelink.storedata=null;this.s.storelink.step=0;this.render()},1000)}template=(_s,_m)=>{return html`<style>:host {
    position: relative;
}



ul#mainitems {
	height: 330px;

}

c-btn.savebtn {
	margin: 8px 0 16px 0;
}

ul#mainitems > li > h5 {
    color: rgb(190 56 151);
}

c-reveal#increments {
    padding: 0px 0px 0 0px;

    & > h5 {
        padding: 0px 0 5px 0;
    }

    & > p {
        padding: 0 0 19px 0;
    }

    & .linkrefs {
        display: flex;
        justify-content: space-around;
        padding-bottom: 25px;

        & > div {
            & label {
                padding-bottom: 5px;
                padding-left: 7px;
            }

            & input {
                width: 115px;
            }
        }
    }

    .confirm_msg {
        color: #009e88;
        text-align: center;
        font-weight: 900;
    }

    .heightfix {
        height: 115px;
        overflow: hidden;
    }
}


c-reveal#increments {
    & .amounts {
        & > div {
            display: flex;
            justify-content: space-between;

            & > label {
                padding-top: 7px;
                flex-grow: 2;
                width: 100px;
                display: block;
                text-align: right;
                padding-right: 12px;
            }

            & > span.input {
                padding-bottom: 8px;
                display: block;
                flex-grow: 1;
            }

            & > span.input > input {
                width: 62px;
            }
        }
    }
}




c-reveal#storelink {

	& .enter-nw-row {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 6px 0 14px 0;
	}
	& label {
		font-size: 14px;
		padding-left: 13px;
		color: #878787;
	}
	& input[name="nw_id"] {
		font-size: 14px;
		border: 1px solid #dbdbdb;
		border-radius: 6px;
		outline: none;
		box-shadow: none;
		padding: 4px 8px 4px 6px;
		color: #8c8c8c;
		margin-left: auto;
		margin-right: 6px;
	}
	& c-btn {
		margin-right: 8px;
		margin-left: 0;
	}

	& .alreadylinked {
		padding: 10px 0 14px 14px;
	}

	& .store-info {

		hr {
			border-color: #ffffff;
			height: 1px;
			border: 0;
			border-top: 1px solid #cecece;
			margin-bottom: 14px;
		}
		padding: 0px 10px 10px 14px;

		p.storedetails {
			padding-bottom: 24px;
			& strong {
				color: #11cdc5;
			}
		}

		p.linkbtn {
			text-align:  center;
		}


	}

	& .success {
	 color: #17ccc4;
	 font-weight: bold;
	 padding: 21px 14px 14px 14px;
	 text-align: center;
	}
}



.savingstate {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    & h4 {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: gray;
        top: 171px;
    }
}
.savingstate.active {
    display: block;
}

.checkcircle {
    position: absolute;
    top: 41px;
    left: 0;
    width: 100%;
    margin: 0 auto 10px auto;
    text-align: center;

    & .icon-checkcircle {
        font-size: 98px;
        color: purple;
    }
}

/*& .spinnerhldr {
    }
    */

.spinner {
    position: absolute;
    display: block;
    width: 64px;
    height: 64px;
    top: 67px;
    left: calc(50% - 32px);

    .container1 > div,
    & .container2 > div,
    & .container3 > div {
        width: 10px;
        height: 10px;
        background-color: #b833da;

        border-radius: 100%;
        position: absolute;
        animation: bouncedelay 1.2s infinite ease-in-out;
        /* Prevent first frame from flickering when animation starts */
        animation-fill-mode: both;
    }

    .spinner-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .container2 {
        transform: rotateZ(45deg);
    }

    .container3 {
        transform: rotateZ(90deg);
    }

    .circle1 {
        top: 0;
        left: 0;
    }
    .circle2 {
        top: 0;
        right: 0;
    }
    .circle3 {
        right: 0;
        bottom: 0;
    }
    .circle4 {
        left: 0;
        bottom: 0;
    }

    .container2 .circle1 {
        animation-delay: -1.1s;
    }

    .container3 .circle1 {
        animation-delay: -1s;
    }

    .container1 .circle2 {
        animation-delay: -0.9s;
    }

    .container2 .circle2 {
        animation-delay: -0.8s;
    }

    .container3 .circle2 {
        animation-delay: -0.7s;
    }

    .container1 .circle3 {
        animation-delay: -0.6s;
    }

    .container2 .circle3 {
        animation-delay: -0.5s;
    }

    .container3 .circle3 {
        animation-delay: -0.4s;
    }

    .container1 .circle4 {
        animation-delay: -0.3s;
    }

    .container2 .circle4 {
        animation-delay: -0.2s;
    }

    .container3 .circle4 {
        animation-delay: -0.1s;
    }
}


.savingstate_bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffffdb;
}
.savingstate_bg.active {
    display: block;
}



@-webkit-keyframes bouncedelay {
    40% {
        transform: scale(1);
    }
}

 @-webkit-keyframes bouncedelay {
     0%,
     80%,
     100% {
         transform: scale(0);
     }
     40% { 
         transform: scale(1);
     }
 }



</style>

<c-in2 label="Is Active" name="isactive" type="toggle" val="${_m.machine.state_active ? 'true' : 'false'}"></c-in2>
<c-in2 label="Brand" name="brand" type="dselect" options="${_m.brands.map(m=>m+':'+m)}" val="${_m.machine.store_brand}"></c-in2>

<ul id="mainitems" class="items">

    <li>
        <h5>Meter Increments:</h5>
        <p>${_m.machine.incrs[0]}, ${_m.machine.incrs[1]}, ${_m.machine.incrs[2]}, ${_m.machine.incrs[3]}, ${_m.machine.incrs[4]}</p>
		<div class="actions">
			<i class="action icon-edit1"></i>
		</div>

        <c-reveal id="increments">
			<c-in2 label="Store" name="incrs_store" type="dselect" val="${_m.machine.incrs[0]}" options="10 Gallon Increments:10,1 Gallon Increments:1"    ></c-in2>
			<c-in2 label="Pure 1" name="incrs_pure1" type="dselect" val="${_m.machine.incrs[1]}" options="10 Gallon Increments:10,1 Gallon Increments:1"   ></c-in2>
			<c-in2 label="Mineral 1" name="incrs_min1" type="dselect" val="${_m.machine.incrs[2]}" options="10 Gallon Increments:10,1 Gallon Increments:1" ></c-in2>
			<c-in2 label="Pure 2"  name="incrs_pure2" type="dselect" val="${_m.machine.incrs[3]}" options="10 Gallon Increments:10,1 Gallon Increments:1"  ></c-in2>
			<c-in2 label="Mineral 2" name="incrs_min2" type="dselect" val="${_m.machine.incrs[4]}" options="10 Gallon Increments:10,1 Gallon Increments:1" ></c-in2>
        </c-reveal>
    </li>
    <li>
        <h5>NW ID Link:</h5>
        <p>${_m.machine.store_id === 1208 ? 'No Link' : '#'+_m.machine.logistics_nationalwaterid.replace(/^0+/g,'') + ' ' + _m.machine.city + ' ' + _m.machine.state}</p>
		<div class="actions">
			<i class="action icon-edit1"></i>
		</div>

        <c-reveal id="storelink">
 			${_m.machine.store_id === 1208 || _s.storelink.step !== 0 ? html`
				<div class="enter-nw-row">
					<label>Enter National Water ID</label>
					<input name="nw_id" type="text" val="${ _s.storelink.nationalwaterid }" @keyup="${(e)=>this.nw_id_keyup(e)}"></input>
					<c-btn small @btnclick="${(e)=>this.searchStore(e)}">Search</c-btn>
				</div>
				${_s.storelink.step === 2 || _s.storelink.step === 3 || _s.storelink.step === 4 ? html`
					<div class="store-info">
						<hr>
						<p class='storedetails'> 
							<strong>${_s.storelink.storedata.store_description}</strong>  &nbsp; 
							${_s.storelink.storedata.address}, ${_s.storelink.storedata.city}, ${_s.storelink.storedata.state}
						</p>
						<p class="linkbtn">
							<c-btn  @btnclick="${(e)=>this.linkStore(e)}">${_s.storelink.step === 2 ? 'Link Store' : 'Link Store'}</c-btn>
						</p>
					</div>

				` : ''}
				${_s.storelink.step === 3 ? html`<p class="success">... LINKING ...</p>` : ''}
				${_s.storelink.step === 4 ? html`<p class="success">Store Linked Successfully</p>` : ''}

			` : html`<p class="alreadylinked">Already Linked</p>`}


			${_s.storelink.step === 2 ? '' : ''}
         </c-reveal>
    </li>
</ul>



<div class="savingstate_bg ${_s.savingState === 1 || _s.savingState === 2 ? 'active' : ''}"></div>

  <div class="savingstate spinnerhldr ${_s.savingState === 1 ? 'active' : ''}">
    <div class="spinner">
      <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
    <h4>Saving...</h4>
	</div>


  <div class="savingstate check ${_s.savingState === 2 ? 'active' : ''}">
    <div class="checkcircle">
      <i class="icon-checkcircle"></i>
    </div>

    <h4>Saved</h4>
  </div>






`}}customElements.define('vp-machineedit',VPMachineEdit);export{}