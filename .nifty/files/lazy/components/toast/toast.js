var ModeT=function(ModeT){ModeT[ModeT["CLOSED"]=0]="CLOSED";ModeT[ModeT["OPEN"]=1]="OPEN";ModeT[ModeT["OPENING"]=2]="OPENING";ModeT[ModeT["CLOSING"]=3]="CLOSING";return ModeT}(ModeT||{});var LevelT=function(LevelT){LevelT[LevelT["INFO"]=0]="INFO";LevelT[LevelT["SAVED"]=1]="SAVED";LevelT[LevelT["SUCCESS"]=2]="SUCCESS";LevelT[LevelT["WARNING"]=3]="WARNING";LevelT[LevelT["ERROR"]=4]="ERROR";return LevelT}(LevelT||{});const DEFAULT_DURATION=2000;const DUMMYEL=document.createElement("div");class CToast extends HTMLElement{s;m;els;shadow;static get observedAttributes(){return['action']}constructor(){super();this.shadow=this.attachShadow({mode:'open'});this.s={mode:0,level:0,isanimating:false,msg:"",level_class:""};this.m={c:""};this.els={msg:DUMMYEL}}connectedCallback(){this.sc()}async attributeChangedCallback(name,oldval,newval){if(name=="action"&&newval==='run'&&(oldval===''||oldval===null)){const level=this.getAttribute("level")||"info";const msg=this.getAttribute("msg")||"";const duration=this.getAttribute("duration")||DEFAULT_DURATION;await this.action(msg,level,Number(duration));this.setAttribute("action","")}}action(msg,levelstr,duration){return new Promise((res)=>{duration=duration||DEFAULT_DURATION;this.els.msg=this.shadow.getElementById("msg");this.els.msg.textContent=msg;this.setlevelfromstr(levelstr);this.classList.remove("level_info","level_saved","level_success","level_warning","level_error");this.classList.add(this.s.level_class);this.style.display="block";this.offsetHeight;this.classList.add("active");setTimeout(()=>{this.classList.remove("active");this.addEventListener("transitionend",transitionend)},duration);function transitionend(){this.removeEventListener("transitionend",transitionend);this.style.display="none";this.dispatchEvent(new CustomEvent('done'));res(1)}})}sc(){render(this.template(),this.shadow)}setlevelfromstr(levelstr){switch(levelstr.toLowerCase()){case"info":this.s.level=0;this.s.level_class="level_info";break;case"saved":this.s.level=1;this.s.level_class="level_saved";break;case"success":this.s.level=2;this.s.level_class="level_success";break;case"warning":this.s.level=3;this.s.level_class="level_warning";break;case"error":this.s.level=4;this.s.level_class="level_error";break;default:this.s.level=0;this.s.level_class="level_info";break}}template=()=>{return html`<style>

:host {
    display: none;
    position: absolute;
    left: 50%;
    margin-left: -175px;
    box-sizing: border-box;
    width: 350px;
    height: 40px;
    bottom: 20px;
    padding: var(--padding-container);
    z-index: 10000;
    background-color: #333;
    border-radius: 8px;
    box-shadow: 0 0 20px 7px rgb(0 0 0 / 16%);
    opacity: 0;
    transform: translate3d(0, 30px, 14px) perspective(300px) rotateX(72deg);
    transition-duration: 0.5s;
    transition-property: transform opacity;
    transition-timing-function: cubic-bezier(0.75, 0, 0.52, 1.51);
}
:host(.active) {
    opacity: 1;
    transform: translate3d(0, 0, 0) perspective(300px) rotateX(0deg);
}
:host(.level_info) {
    background-color: #007bff;
}
:host(.level_warning) {
    background-color: #ffc107;
}
:host(.level_error) {
    background-color: #dc3545;
}
:host(.level_success) {
    background-color: #28a745;
}
:host(.level_saved) {
    background-color: #0eb8ab;
}

:host > #msg {
    color: white;
    font-size: 14px;
    FONT-WEIGHT: 700;
    text-align: center;
}


</style>
<div id="msg"></div>
`}}customElements.define('c-toast',CToast);export{}