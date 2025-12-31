import{animate_in,animate_out,init_animation_state,get_isanmiating,run_handle_scroll,ShapeE,FloatShapeSizeE}from"./ol2_animate.js";var BrowserScreenSizeCategoryE=function(BrowserScreenSizeCategoryE){BrowserScreenSizeCategoryE[BrowserScreenSizeCategoryE["SMALL"]=0]="SMALL";BrowserScreenSizeCategoryE[BrowserScreenSizeCategoryE["MEDIUM"]=1]="MEDIUM";BrowserScreenSizeCategoryE[BrowserScreenSizeCategoryE["LARGE"]=2]="LARGE";return BrowserScreenSizeCategoryE}(BrowserScreenSizeCategoryE||{});const ATTRIBUTES={close:""};class COl2 extends HTMLElement{a={...ATTRIBUTES};s={title:"",show_closebtn:true,show_header:true};m={shape:ShapeE.FILL,floatsize:FloatShapeSizeE.M,actionterm:""};shadow;viewwrapperel;content_el;wrapper_el;theme_color_meta;handle_click=(_e)=>{this.close()};handle_content_click=(e)=>{e.stopPropagation()};handle_scroll=(_e)=>{if(this.m.shape===ShapeE.FILL){run_handle_scroll(this,this.viewwrapperel,()=>this.closed())}};static get observedAttributes(){return Object.keys(ATTRIBUTES)}constructor(){super();this.shadow=this.attachShadow({mode:'open'})}async connectedCallback(){this.s.title=this.getAttribute("title")||"asdfsdf";this.s.show_closebtn=this.getAttribute("closebtn")==="false"?false:true;this.s.show_header=this.getAttribute("showheader")==="false"?false:true;this.m.actionterm=this.getAttribute("actionterm")||"";const shapeA=this.getAttribute("shape")||"";const floatsizeA=this.getAttribute("floatsizes")||"";const{shape,floatsize}=determine_shape_and_size(shapeA,floatsizeA,determine_screen_size_category());this.m.shape=shape;this.m.floatsize=floatsize;this.setAttribute("shape",shape);this.sc();this.viewwrapperel=document.querySelector('#views > .view:last-child').shadowRoot.querySelector(':host > .wrapper');this.content_el=this.shadow.querySelector(".content");this.wrapper_el=this.shadow.querySelector(".wrapper");this.addEventListener("click",this.handle_click,false);this.addEventListener("scroll",this.handle_scroll,false);this.content_el.addEventListener("click",this.handle_content_click,false);if(this.firstElementChild.tagName.startsWith("VP-")){const viewparthydrated=async()=>{this.firstElementChild.removeEventListener('viewparthydrated',viewparthydrated);this.firstElementChild.removeEventListener('viewpartconnectfailed',viewpartconnectfailed);const postload_promise=$N.CMech.PostLoadViewPart(this.firstElementChild);await this.init();await postload_promise};const viewpartconnectfailed=()=>{this.firstElementChild.removeEventListener('viewparthydrated',viewparthydrated);this.firstElementChild.removeEventListener('viewpartconnectfailed',viewpartconnectfailed);$N.Unrecoverable("Unable to Load Page",'View part failed to connect.',"Back to Home","srf",`vp component: ${this.firstElementChild.tagName}`,null)};this.firstElementChild.addEventListener('viewparthydrated',viewparthydrated);this.firstElementChild.addEventListener('viewpartconnectfailed',viewpartconnectfailed)}else{this.init()}}async attributeChangedCallback(name){if(name==="close"){this.close()}}sc(){render(this.template(this.s,this.m),this.shadow)}async init(){await init_animation_state(this);this.setAttribute('readytoanimate','');await animate_in(this,this.viewwrapperel,this.content_el)}disconnectedCallback(){this.removeEventListener("click",this.handle_click);if(this.content_el){this.content_el.removeEventListener("click",this.handle_content_click)}this.removeEventListener("scroll",this.handle_scroll)}async close(){if(get_isanmiating(this))return;await animate_out(this,this.viewwrapperel,this.content_el);this.closed()}closed(){this.dispatchEvent(new Event('close'))}actiontermclicked(){if(this.firstElementChild.actiontermclicked){this.firstElementChild.actiontermclicked()}}template=(_s,_m)=>{return html`<style>


:host {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	scroll-snap-type: none;
	scrollbar-width: none;
	z-index: 1000;
	visibility: hidden;
}
:host([readytoanimate]) {
	visibility: visible;
	scroll-snap-type: y mandatory;
}
/* :host( [shape="fill"] ) { */
/* } */

:host::-webkit-scrollbar {
	display: none;
}


.spacer {
	display: none;
	height: 100vh;
	width: 100vw;
	scroll-snap-align: start;
}
.spacer[shape="fill"] {
	display: block;
}

.spacer.active {
	display: block;
}

.wrapper {
	position: relative;
	height: 100vh;
	scroll-snap-align: start;
	overflow-y: hidden;
	padding-top: 22px;
	box-sizing: border-box;
}


.content {
	position: relative;
	display: block;
	background-color: white;
	padding: 0px;
	box-sizing: border-box;
	border-radius: 12px 12px 0 0;
	box-shadow: 0 4px 14px 0px rgb(0 0 0 / 19%);
	z-index: 1001;
	opacity: 0;
	overflow-y: hidden;
}

.wrapper[shape="float"] .content {
	height: calc(100vh - 12vh); 
	margin: 0 auto;
	border-radius: 12px 12px 12px 12px;
}
.wrapper[shape="fill"] .content {
	width: 100vw;
	height: calc(100vh - 17px);
}
.wrapper[shape="float"] .content.floatsize-s { /* all the same for now */
	width: 480px;
}
.wrapper[shape="float"] .content.floatsize-m { /* all the same for now */
	width: 480px;
}
.wrapper[shape="float"] .content.floatsize-l { /* all the same for now */
	width: 480px;
}


.content > header {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
	font-size: 16px;
	color: var(--actioncolor);
	cursor: pointer;

	.left, .right { width: 20%; }

	a {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}
	
    & .middle {
        width: 60%;

        & h1 {
			/* font-family: var(--fontfamily); */
			/* -webkit-font-smoothing: antialiased; */
			color: var(--textcolor);
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			padding: 0;
			margin: 0;
			}
    }

    & .right {
        slot[name="headerright"]::slotted(*) {
            color: blue;
        }
    }
}

.content > slot {
    /* display: block; */
    /* overflow-y: hidden; */
}




</style>

<div class="spacer" shape="${_m.shape}">&nbsp;</div>
<div class="wrapper" shape="${_m.shape}">
	<div class="content floatsize-${_m.floatsize}" >
		${_s.show_header ? html`
		<header>
			<div class="left">${_s.show_closebtn ? html`<a @click="${()=>this.close()}">close</a>` : ''} <slot name="headerleft"></slot></div>
			<div class="middle"><h1>${_s.title}</h1></div>
			<div class="right"><a @click="${()=>this.actiontermclicked()}">${_m.actionterm}</a></div>
		</header>
		` : ''}
		<slot></slot>
	</div>
</div>
`}}customElements.define('c-ol2',COl2);function determine_shape_and_size(_shapeA,floatsizeA,screen_size_category){if(screen_size_category===0){return{shape:ShapeE.FILL,floatsize:FloatShapeSizeE.NA}}const shape=ShapeE.FLOAT;let floatsize=FloatShapeSizeE.M;if(floatsize){switch(floatsizeA.trim().toLowerCase()){case"s":floatsize=FloatShapeSizeE.S;break;case"m":floatsize=FloatShapeSizeE.M;break;case"l":floatsize=FloatShapeSizeE.L;break;default:floatsize=FloatShapeSizeE.M;break}}return{shape,floatsize}}function determine_screen_size_category(){const screen_width=window.innerWidth;if(screen_width<768){return 0}else if(screen_width>=768&&screen_width<1024){return 1}else{return 2}}