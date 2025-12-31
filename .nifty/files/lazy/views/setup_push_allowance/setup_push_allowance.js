const firebaseConfig={apiKey:"AIzaSyAx0ix0_Yz6RN6_-5kiwU-_uWm4sErpXdw",authDomain:"purewatertech.firebaseapp.com",databaseURL:"https://purewatertech.firebaseio.com",projectId:"purewatertech",storageBucket:"purewatertech.firebasestorage.app",messagingSenderId:"805737116651",appId:"1:805737116651:web:9baada48dc65d9b72c9fae",measurementId:"G-5VBS981F9K"};const vapidKey="BF6MOQVRtD-cw7q34V_3x2xGdnEyym2wNj0wS_qJQtnRnZHagqxV1vVpfVKX6Km-qkhCn4IIS_Pt4mMfqPxyd68";let firebase_service={};firebase_service.initializeApp={};firebase_service.getMessaging={};firebase_service.getToken={};firebase_service.app={};firebase_service.messaging={};const ATTRIBUTES={propa:""};class VSetupPushAllowance extends HTMLElement{m={propa:""};a={...ATTRIBUTES};s={is_subscribed:false};shadow;static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){$N.CMech.RegisterView(this)}async attributeChangedCallback(name,oldval,newval){$N.CMech.AttributeChangedCallback(this,name,oldval,newval)}disconnectedCallback(){$N.CMech.ViewDisconnectedCallback(this)}static load(_pathparams,_searchparams){return new Promise(async(res,_rej)=>{const d=new Map();res({d,refreshon:[]})})}ingest(){}async hydrated(){try{await loadfirebase()}catch(e){$N.Unrecoverable("Error loading subscription system",e,"Back to Home","gen","error loading firebase from gstatic",null);return}navigator.serviceWorker.ready.then((registration)=>{return registration.pushManager.getSubscription()}).then((subscription)=>{if(subscription){this.s.is_subscribed=true}else{this.s.is_subscribed=false}this.render();setTimeout(()=>{this.dispatchEvent(new Event('hydrated'))},100)}).catch((err)=>{console.error('Error during getSubscription()',err)})}render(){render(this.template(this.s),this.shadow)}async Subscribe(e){navigator.serviceWorker.ready.then(async(reg)=>{const result=await Notification.requestPermission();if(result!=='granted'){throw new Error('Permission not granted for Notification')}else{await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlBase64ToUint8Array(vapidKey)});firebase_service.messaging=firebase_service.getMessaging();const fcm_token=await firebase_service.getToken(firebase_service.messaging,{serviceWorkerRegistration:reg,vapidKey});const user_email=localStorage.getItem('user_email');const r=await $N.FetchLassie('/api/push_subscriptions/add?user_email='+user_email+'&fcm_token='+fcm_token,{method:'GET',headers:{'Content-type':'application/json'}});e.detail.done();if(!r.ok){alert('Error trying to subscribe: '+r.statusText);return}this.s.is_subscribed=true;this.render();await reg.showNotification('Notification with ServiceWorker',{body:'Notification with ServiceWorker'})}})}async Unsubscribe(e){navigator.serviceWorker.ready.then(async(reg)=>{reg.pushManager.getSubscription().then((subscription)=>{subscription.unsubscribe().then(async(_successful)=>{const user_email=localStorage.getItem('user_email');await $N.FetchLassie('/api/push_subscriptions/remove?user_email='+user_email,{method:'GET',headers:{'Content-type':'application/json'}});this.s.is_subscribed=false;this.render();e.detail.done()}).catch((_e)=>{})})}).catch((_)=>{})}template=(_s)=>{return html`<style>

h2 {
    font-size: 15px;
    padding-bottom: 16px;
}


</style>

<div class="wrapper">
	<header class="viewheader">
		<a class="left" @click="${()=>$N.SwitchStation.GoBack({default:'home'})}"><span>‸</span></a>
		<div class="middle"><h1>Notifications</h1></div>
		<div class="right">
			&nbsp;
		</div>
	</header>



    <div style="text-align:center; padding-top: 30px;">

        ${_s.is_subscribed ? html`
            <h2>This Device is subscribed to notifications</h2>
            <c-btn @btnclick="${(e)=>this.Unsubscribe(e)}">Unsubscribe</c-btn>
        ` : html`
            <h2>This Device is not subscribed to notifications</h2>
            <c-btn @btnclick="${(e)=>this.Subscribe(e)}">Subscribe</c-btn>
        `}

    </div>

</div>



`}}customElements.define('v-setup_push_allowance',VSetupPushAllowance);function loadfirebase(){return new Promise(async(res,rej)=>{try{const firebaseApp=await import("https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js");firebase_service.initializeApp=firebaseApp.initializeApp;firebase_service.app=firebase_service.initializeApp(firebaseConfig);const firebaseMessaging=await import("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js");firebase_service.getMessaging=firebaseMessaging.getMessaging;firebase_service.getToken=firebaseMessaging.getToken;res(true)}catch(e){console.error("Firebase loading error:",e);rej(e)}})}function urlBase64ToUint8Array(base64String){const padding="=".repeat((4-base64String.length%4)%4);const base64=(base64String+padding).replace(/\-/g,"+").replace(/_/g,"/");const rawData=atob(base64);const outputArray=new Uint8Array(rawData.length);for(let i=0;i<rawData.length;++i){outputArray[i]=rawData.charCodeAt(i)}return outputArray}export{}