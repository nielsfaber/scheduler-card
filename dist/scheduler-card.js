!function(e){"use strict";function t(e,t,i,s){var a,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(n=(o<3?a(n):o>3?a(t,i,n):a(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i=window,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,a)},d=(e,t)=>{s?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const s=document.createElement("style"),a=i.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=t.cssText,e.appendChild(s)})},l=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var c;const u=window,h=u.trustedTypes,m=h?h.emptyScript:"",p=u.reactiveElementPolyfillSupport,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:g},y="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const a=this[e];this[t]=s,this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return d(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var s;const a=this.constructor._$Ep(e,i);if(void 0!==a&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:_).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,a=s._$Ev.get(e);if(void 0!==a&&this._$El!==a){const e=s.getPropertyOptions(a),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:_;this._$El=a,this[a]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var b;f[y]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(c=u.reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.6.3");const k=window,w=k.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,O=`<${j}>`,z=document,S=()=>z.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,E="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,M=/>/g,L=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,N=/"/g,I=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),H=new WeakMap,F=z.createTreeWalker(z,129,null,!1);function U(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const B=(e,t)=>{const i=e.length-1,s=[];let a,o=2===t?"<svg>":"",n=T;for(let t=0;t<i;t++){const i=e[t];let r,d,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,d=n.exec(i),null!==d);)c=n.lastIndex,n===T?"!--"===d[1]?n=D:void 0!==d[1]?n=M:void 0!==d[2]?(I.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=L):void 0!==d[3]&&(n=L):n===L?">"===d[0]?(n=null!=a?a:T,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,r=d[1],n=void 0===d[3]?L:'"'===d[3]?N:P):n===N||n===P?n=L:n===D||n===M?n=T:(n=L,a=void 0);const u=n===L&&e[t+1].startsWith("/>")?" ":"";o+=n===T?i+O:l>=0?(s.push(r),i.slice(0,l)+"$lit$"+i.slice(l)+$+u):i+$+(-2===l?(s.push(void 0),t):u)}return[U(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class W{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,o=0;const n=e.length-1,r=this.parts,[d,l]=B(e,t);if(this.el=W.createElement(d,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=F.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith($)){const i=l[o++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:a,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?X:"@"===t[1]?ee:J})}else r.push({type:6,index:a})}for(const t of e)s.removeAttribute(t)}if(I.test(s.tagName)){const e=s.textContent.split($),t=e.length-1;if(t>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],S()),F.nextNode(),r.push({type:2,index:++a});s.append(e[t],S())}}}else if(8===s.nodeType)if(s.data===j)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf($,e+1));)r.push({type:7,index:a}),e+=$.length-1}a++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){var a,o,n,r;if(t===V)return t;let d=void 0!==s?null===(a=i._$Co)||void 0===a?void 0:a[s]:i._$Cl;const l=C(t)?void 0:t._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(o=null==d?void 0:d._$AO)||void 0===o||o.call(d,!1),void 0===l?d=void 0:(d=new l(e),d._$AT(e,i,s)),void 0!==s?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[s]=d:i._$Cl=d),void 0!==d&&(t=Z(e,d._$AS(e,t.values),d,s)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:z).importNode(i,!0);F.currentNode=a;let o=F.nextNode(),n=0,r=0,d=s[0];for(;void 0!==d;){if(n===d.index){let t;2===d.type?t=new G(o,o.nextSibling,this,e):1===d.type?t=new d.ctor(o,d.name,d.strings,this,e):6===d.type&&(t=new te(o,this,e)),this._$AV.push(t),d=s[++r]}n!==(null==d?void 0:d.index)&&(o=F.nextNode(),n++)}return F.currentNode=z,a}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,s){var a;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(a=null==s?void 0:s.isConnected)||void 0===a||a}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),C(e)?e===R||null==e||""===e?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==R&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(z.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,a="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=W.createElement(U(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===a)this._$AH.v(i);else{const e=new K(a,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=H.get(e.strings);return void 0===t&&H.set(e.strings,t=new W(e)),t}T(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new G(this.k(S()),this.k(S()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,s,a){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const a=this.strings;let o=!1;if(void 0===a)e=Z(this,e,t,0),o=!C(e)||e!==this._$AH&&e!==V,o&&(this._$AH=e);else{const s=e;let n,r;for(e=a[0],n=0;n<a.length-1;n++)r=Z(this,s[i+n],t,n),r===V&&(r=this._$AH[n]),o||(o=!C(r)||r!==this._$AH[n]),r===R?e=R:e!==R&&(e+=(null!=r?r:"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}}const Q=w?w.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==R?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class ee extends J{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Z(this,e,t,0))&&void 0!==i?i:R)===V)return;const s=this._$AH,a=e===R&&s!==R||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==R&&(s===R||a);a&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class te{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ie=k.litHtmlPolyfillSupport;null==ie||ie(W,G),(null!==(b=k.litHtmlVersions)&&void 0!==b?b:k.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var se,ae;class oe extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,a;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let n=o._$litPart$;if(void 0===n){const e=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:null;o._$litPart$=n=new G(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return V}}oe.finalized=!0,oe._$litElement$=!0,null===(se=globalThis.litElementHydrateSupport)||void 0===se||se.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(ae=globalThis.litElementVersions)&&void 0!==ae?ae:globalThis.litElementVersions=[]).push("3.3.3");const re=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,de=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function le(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):de(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}function ce(e){return le({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ue;null===(ue=window.HTMLSlotElement)||void 0===ue||ue.prototype.assignedElements;const he=(e,t)=>{if(typeof e!=typeof t)return!1;if("object"==typeof e&&"object"==typeof t&&null!==e&&null!==t){const i=[...new Set([...Object.keys(e),...Object.keys(t)])];return!!i.every(i=>Object.keys(e).includes(i)&&Object.keys(t).includes(i))&&i.every(i=>he(e[i],t[i]))}return e===t};var me,pe,_e,ge,ve,ye,fe,be;!function(e){e.Single="single",e.Scheme="scheme"}(me||(me={})),function(e){e.Daily="daily",e.Workday="workday",e.Weekend="weekend",e.Monday="monday",e.Tuesday="tuesday",e.Wednesday="wednesday",e.Thursday="thursday",e.Friday="friday",e.Saturday="saturday",e.Sunday="sunday"}(pe||(pe={})),function(e){e.Or="or",e.And="and"}(_e||(_e={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(ge||(ge={})),function(e){e.Name="name",e.RelativeTime="relative-time",e.AdditionalTasks="additional-tasks",e.Time="time",e.Days="days",e.Entity="entity",e.Action="action",e.Tags="tags",e.Default="default"}(ve||(ve={})),function(e){e.ItemCreated="scheduler_item_created",e.ItemUpdated="scheduler_item_updated",e.ItemRemoved="scheduler_item_removed",e.TimerFinished="scheduler_timer_finished",e.TimerUpdated="scheduler_timer_updated"}(ye||(ye={})),function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(fe||(fe={})),function(e){e.Fixed="fixed",e.Sunrise="sunrise",e.Sunset="sunset"}(be||(be={}));const ke=e=>({service:e.service,service_data:e.service_data,target:{entity_id:e.entity_id?e.entity_id:void 0}}),we=e=>({start:e.start,stop:e.stop,actions:je(e.actions.map(ke)),conditions:{type:"and"==e.condition_type?_e.And:_e.Or,items:e.conditions||[],track_changes:Boolean(e.track_conditions)}}),xe=e=>{switch(e){case"mon":return pe.Monday;case"tue":return pe.Tuesday;case"wed":return pe.Wednesday;case"thu":return pe.Thursday;case"fri":return pe.Friday;case"sat":return pe.Saturday;case"sun":return pe.Sunday;case"workday":return pe.Workday;case"weekend":return pe.Weekend;default:return pe.Daily}},$e=e=>Object.assign(Object.assign({},Object.fromEntries(Object.entries(e).filter(([e])=>!["slots","weekdays",""].includes(e)))),{entries:[{slots:e.timeslots.map(we),weekdays:e.weekdays.map(xe)}]}),je=e=>{if(1==e.length)return e;if(e.every(t=>he(Object.assign(Object.assign({},t),{target:void 0}),Object.assign(Object.assign({},e[0]),{target:void 0})))){const t=[...new Set(e.map(e=>{var t;return null===(t=e.target)||void 0===t?void 0:t.entity_id}).filter(e=>void 0!==e))];return[Object.assign(Object.assign({},e[0]),{target:{entity_id:t.length?t:void 0}})]}return e},Oe=e=>e.callWS({type:"scheduler"}).then(e=>e.map($e)),ze=(e,t)=>{let i=t.hours||0,s=t.minutes||0;(i<0||s<0)&&(i=-Math.abs(i),s=-Math.abs(s));let a=e.hours,o=e.minutes;return a<0&&o>0&&(o=-o),a+=i,o+=s,o>=60||o>0&&a<0&&e.mode!=be.Fixed?(a+=1,o-=60):(o<=-60||o<0&&e.mode==be.Fixed||o<0&&a>0&&e.mode!=be.Fixed)&&(a-=1,o+=60),a<0&&e.mode==be.Fixed?a+=24:a>=24&&e.mode==be.Fixed&&(a-=24),{mode:e.mode,hours:a,minutes:o}},Se=(e,t=1)=>{let i=3600*Math.abs(e.hours)+60*Math.abs(e.minutes)+(e.seconds||0);const s=e.hours<0||e.minutes<0?-1:1;let a=Math.floor(i/3600),o=Math.round((i-3600*a)/60);return o%t!=0&&(o=Math.round(o/t)*t),o>=60&&(a++,o-=60),s<0&&(a>0?a=-a:o=-o),Object.assign(Object.assign({},e),{hours:a,minutes:o})},Ce=e=>{if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number),i=Se({hours:t[0],minutes:t[1],seconds:t[2]});return{mode:be.Fixed,hours:i.hours,minutes:i.minutes}}const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);if(t){let e=t[3].split(":").map(Number);const i=Se({hours:e[0],minutes:e[1],seconds:e[2]});let s=i.hours,a=i.minutes;return"-"==t[2]&&(s>0&&(s=-s),a=-a),{mode:"sunrise"==t[1]?be.Sunrise:be.Sunset,hours:s,minutes:a}}const i=new Date(e),s=Se({hours:i.getHours(),minutes:i.getMinutes(),seconds:i.getSeconds()});return{mode:be.Fixed,hours:s.hours,minutes:s.minutes}},Ae=(e,t)=>{if("string"==typeof e&&(e=Ce(e)),e.mode==be.Fixed)return 3600*e.hours+60*e.minutes;if(e.mode==be.Sunrise){const i=Ce(t.states["sun.sun"].attributes.next_rising),s=ze(i,e);return 3600*s.hours+60*s.minutes}{const i=Ce(t.states["sun.sun"].attributes.next_setting),s=ze(i,e);return 3600*s.hours+60*s.minutes}};var Ee,Te;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ee||(Ee={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Te||(Te={}));const De=e=>{if(e.time_format===Te.language||e.time_format===Te.system){const t=e.time_format===Te.language?e.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(t).includes("10")}return e.time_format===Te.am_pm};var Me;!function(e){e.AM="AM",e.PM="PM"}(Me||(Me={}));const Le=e=>({am_pm:e>=12?Me.PM:Me.AM,hours:e%12||12}),Pe=(e,t)=>t==Me.AM?12==e?0:e:12==e?12:e+12,Ne=(e,t={seconds:!0})=>{let i="";if(e.hours>=24&&(e.hours-=24),e.mode==be.Fixed&&t.am_pm){const s=Le(e.hours).am_pm,a=Le(e.hours).hours;i=String(a).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00"),i+=" "+(s===Me.AM?"am":"pm")}else e.mode==be.Fixed?(i=String(e.hours).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00")):(i=e.mode+(e.hours<0||e.minutes<0?"-":"+")+String(Math.abs(e.hours)).padStart(2,"0")+":"+String(Math.abs(e.minutes)).padStart(2,"0"),t.seconds&&(i+=":00"));return i},Ie=(e,t)=>{const i=e=>{(e=(e=e.map(e=>Object.assign(Object.assign({},e),{start:Ae(e.start,t)<0?"00:00:00":e.start,stop:e.stop?Ae(e.stop,t)>86400?"00:00:00":e.stop:void 0}))).map(e=>{if(e.stop&&Ae(e.start,t)>Ae(e.stop,t)){if(0==Ae(e.stop,t))return Object.assign(Object.assign({},e),{stop:Ne(ze(Ce(e.stop),{hours:24}))});e=Object.assign(Object.assign({},e),{start:e.stop,stop:e.start})}return e.stop&&Ae(e.stop,t)-Ae(e.start,t)<60&&(e=Object.assign(Object.assign({},e),{stop:Ne(ze(Ce(e.start),{minutes:1}))})),e})).sort((e,i)=>Ae(e.start,t)>Ae(i.start,t)?1:Ae(e.start,t)<Ae(i.start,t)?-1:Ae(e.stop||e.start,t)>Ae(i.stop||i.start,t)?1:-1);let i="00:00:00",s=e.length;for(let a=0;a<s;a++){const o=e[a];Ae(o.start,t)>Ae(i,t)?(e.splice(a,0,Object.assign(Object.assign({},o),{start:i,stop:o.start,actions:[],conditions:o.conditions})),s++,a++):Ae(o.start,t)<Ae(i,t)&&(e=Object.assign(e,{[a]:Object.assign(Object.assign({},o),{start:i})})),i=o.stop||o.start}return Ae(i,t)<86400&&Ae(i,t)>0&&e.push({start:i,stop:Ne({mode:be.Fixed,hours:24,minutes:0}),actions:[],conditions:e[0].conditions}),e};return e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object.assign(Object.assign({},e),{slots:i(e.slots)}))})},qe=["relative-time","state"],Ve=["relative-time","additional-tasks"],Re=["*"],He={actions:[],conditions:{type:_e.Or,items:[],track_changes:!1}},Fe={entries:[{weekdays:[pe.Daily],slots:[Object.assign(Object.assign({},He),{start:"00:00:00",stop:"08:00:00"}),Object.assign(Object.assign({},He),{start:"08:00:00",stop:"16:00:00"}),Object.assign(Object.assign({},He),{start:"16:00:00",stop:"00:00:00"})]}],repeat_type:fe.Repeat,next_entries:[],timestamps:[],enabled:!0},Ue=Object.assign(Object.assign({},Fe),{entries:[{weekdays:[pe.Daily],slots:[Object.assign(Object.assign({},He),{start:"00:00:00",stop:"12:00:00"}),Object.assign(Object.assign({},He),{start:"12:00:00"}),Object.assign(Object.assign({},He),{start:"12:01:00",stop:"00:00:00"})]}]});function Be(e){return null!=e}const We=(e,t)=>Object.keys(e).includes(t),Ze=e=>"boolean"==typeof e,Ke=e=>"number"==typeof e,Ge=e=>"string"==typeof e,Je=e=>"object"==typeof e&&!Array.isArray(e),Ye=e=>Array.isArray(e)&&e.every(e=>"string"==typeof e),Qe=(e,t)=>Je(t)?We(t,"states")&&!(Ye(t.states)||Je(t.states)&&We(t.states,"min")&&Ke(t.states.min)&&We(t.states,"max")&&Ke(t.states.max))?`In 'customize' [${e}].states' must be a list of strings or a range of numbers`:void 0:`'In customize, ${e}' must be a struct`;var Xe={generic:{parameter_to_value:"{parameter} на {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"задай температура[ на {temperature}]",set_temperature_hvac_mode_heat:"отопление[ на {temperature}]",set_temperature_hvac_mode_cool:"охлаждане[ на {temperature}]",set_temperature_hvac_mode_heat_cool:"отопление/охлаждане[ на {temperature}]",set_temperature_hvac_mode_heat_cool_range:"отопление/охлаждане[ на {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"автоматично[ на {temperature}]",set_hvac_mode:"задай режим[ на {hvac_mode}]",set_preset_mode:"задай предварителна настройка[ на {preset_mode}]",set_fan_mode:"задай режим на вентилатор[ на {fan_mode}]",set_swing_mode:"задай режим на въртене[ на {swing_mode}]"},cover:{close_cover:"затвори",open_cover:"отвори",set_cover_position:"задай позиция[ на {position}]",set_cover_tilt_position:"задай позиция на наклон[ на {tilt_position}]"},fan:{set_percentage:"задай скорост[ на {percentage}]",set_direction:"задай посока[ на {direction}]",oscillate:"задай осцилация[ на {oscillate}]"},humidifier:{set_humidity:"задай влажност[ на {humidity}]",set_mode:"задай режим[ на {mode}]"},input_number:{set_value:"задай стойност[ на {value}]"},input_select:{select_option:"избери опция[ {option}]"},select:{select_option:"избери опция[ {option}]"},light:{turn_on:"включи[ с {brightness} яркост]"},media_player:{select_source:"избери източник[ {source}]"},notify:{send_message:"изпрати известие"},script:{execute:"изпълни"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"задай режим[ на {operation_mode}]",set_away_mode:"задай режим 'не съм вкъщи'"}},et={components:{date:{day_types_short:{daily:"дневно",workdays:"работни дни",weekend:"уикенд"},day_types_long:{daily:"всеки ден",workdays:"в работни дни",weekend:"през уикенда"},days:"дни",tomorrow:"утре",repeated_days:"всеки {days}",repeated_days_except:"всеки ден освен {excludedDays}",days_range:"от {startDay} до {endDay}",next_week_day:"следващ {weekday}"},time:{absolute:"в {time}",interval:"от {startTime} до {endTime}",at_midnight:"в полунощ",at_noon:"на обяд",at_sun_event:"при {sunEvent}"}},dialog:{enable_schedule:{title:"Завърши промените",description:"Графикът, който сте променили, е деактивиран. Искате ли да го активирате?"},confirm_delete:{title:"Премахни обект?",description:"Сигурни ли сте, че искате да премахнете този обект?"},confirm_migrate:{title:"Актуализирай графика",description:"Някои настройки ще бъдат загубени при тази промяна. Искате ли да продължите?"},weekday_picker:{title:"Повтарящи се дни за графика",choose:"Избери..."},entity_picker:{title:"Изберете обекти",choose:"Избери...",no_results:"Няма намерени съвпадения"},action_picker:{title:"Изберете действие"}},panel:{common:{title:"Планировчик",new_schedule:"Нов график",default_name:"График #{id}"},overview:{no_entries:"Няма елементи за показване",backend_error:"Не може да се свърже с компонента за планиране. Той трябва да бъде инсталиран като интеграция, преди тази карта да може да се използва.",excluded_items:"{number} изключен {if number is 1} елемент {else} елемента",hide_excluded:"скрий изключените елементи",additional_tasks:"{number} още {if number is 1} задача {else} задачи"},editor:{repeated_days:"Повтарящи се дни",start_time:"Начален час",stop_time:"Краен час",action:"Действие",add_action:"Добави действие",select_timeslot:"Изберете времеви слот",toggle_single_mode:"В единичен режим",toggle_scheme_mode:"В режим на схема",validation_errors:{overlapping_time:"Графикът има припокриващи се времеви слотове",missing_target_entity:"Едно или повече действия нямат целеви обект",missing_service_parameter:"Едно или повече действия нямат задължителна настройка",missing_action:"Графикът няма действия"}},options:{conditions:{header:"Условия",add_condition:"Добави условие",new_condition:"Нов условие",types:{equal_to:"{entity} е равно на {value}",unequal_to:"{entity} не е равно на {value}",above:"{entity} е над {value}",below:"{entity} е под {value}"},options:{logic_and:"Всички условия трябва да са изпълнени",logic_or:"Поне едно условие трябва да е изпълнено",track_changes:"Преоценка при промяна на условията"}},period:{header:"Период",start_date:"От",end_date:"До"},repeat_type:"поведение след завършване",tags:"Етикети"},card_editor:{tabs:{entities:"Обекти",other:"Други"},fields:{title:{heading:"Заглавие на картата",options:{standard:"стандартно",hidden:"скрито",custom:"персонализирано"},custom_title:"Персонализирано заглавие"},discover_existing:{heading:"Покажи всички графици",description:"Това задава параметъра 'discover existing'. Предварително създадени графици ще бъдат автоматично добавени към картата. "},time_step:{heading:"Времева стъпка",description:"Резолюция (в минути) за създаване на графици",unit_minutes:"мин"},default_editor:{heading:"Редактор по подразбиране",options:{single:"Режим на единичен график",scheme:"Режим на времева схема"}},sort_by:{heading:"Опции за сортиране",description:"Ред, в който се показват графиците в картата",options:{relative_time:"Оставащо време до следващото действие",title:"Показано заглавие на графика",state:"Покажи активните графици отгоре"}},display_format_primary:{heading:"Показана основна информация",description:"Конфигурирайте кой етикет се използва за графиците в прегледа",options:{default:"Име на графика",entity_action:"Резюме на задачата"}},display_format_secondary:{heading:"Показана допълнителна информация",description:"Конфигурирайте какви допълнителни свойства са видими в прегледа",options:{relative_time:"Оставащо време до следващото действие",time:"Конфигуриран час за следващо действие",days:"Повтарящи се дни от седмицата",additional_tasks:"Брой допълнителни задачи"}},show_header_toggle:{heading:"Покажи превключвател в заглавието",description:"Покажи превключвател в горната част на картата за активиране/деактивиране на всички обекти"},tags:{heading:"Етикети",description:"Използвайте етикети за разделяне на графиците между множество карти"},entities:{button_label:"Конфигурирай включени обекти",heading:"Включени обекти",description:"Изберете обектите, които искате да контролирате чрез планировчика. Можете да кликнете на група, за да я отворите. Имайте предвид, че някои обекти (като сензори) могат да се използват само за условия, не и за действия.",included_number:"{number}/{total} избрани"}}}}},tt={services:Xe,ui:et},it=Object.freeze({__proto__:null,services:Xe,ui:et,default:tt}),st={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"topení/chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"topení/chlazení[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]",set_mode:"nastavit režim[ na {mode}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},notify:{send_message:"send notification"},script:{execute:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"nastavit režim[ na {operation_mode}]",set_away_mode:"vypnout režim"}},at={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"příští {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončete úpravy",description:"Plán, který byl změněn, je aktuálně zakázán, měl by být povolen?"},confirm_delete:{title:"Odebrat entitu?",description:"Opravdu chcete tuto entitu odebrat?"},confirm_migrate:{title:"Aktualizovat plán",description:"Některá nastavení budou touto změnou ztracena. Chceš pokračovat?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Nejsou žádné položky k zobrazení",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Nejprve vyberte časový úsek",toggle_single_mode:"Do režimu jednoho",toggle_scheme_mode:"Do režimu schématu",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Období",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"}}},ot={services:st,ui:at},nt=Object.freeze({__proto__:null,services:st,ui:at,default:ot}),rt={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"Heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"Kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool:"Heizen/Kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool_range:"Heizen/Kühlen[ auf {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"Automatisch[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]",set_fan_mode:"Lüftermodus einstellen[ auf {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"Schließen",open_cover:"Öffnen",set_cover_position:"Position setzen[ auf {position}]",set_cover_tilt_position:"Neigungsposition setzen[ auf {tilt_position}]"},fan:{set_speed:"Geschwindigkeit setzen[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]",set_mode:"Modus setzen[ auf {mode}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"Anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},notify:{send_message:"Nachricht senden"},script:{execute:"Ausführen"},vacuum:{start_pause:"Start/Pause"},water_heater:{set_operation_mode:"Modus setzen[ auf {operation_mode}]",set_away_mode:"Abwesenheitsmodus setzen"}},dt={components:{date:{day_types_short:{daily:"Täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"Morgen",repeated_days:"Jeden {days}",repeated_days_except:"Täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}",next_week_day:"nächsten {weekday}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"zum Mittag",at_sun_event:"beim {sunEvent}"}},dialog:{enable_schedule:{title:"Modifikationen beenden",description:"Der geänderte Zeitplan ist derzeit deaktiviert, soll er aktiviert werden?"},confirm_delete:{title:"Entität entfernen?",description:"Bist du dir sicher, dass du diese Entität löschen möchtest?"},confirm_migrate:{title:"Zeitplan ändern",description:"Einige Einstellungen gehen durch diese Änderung verloren. Möchtest du fortfahren?"},weekday_picker:{title:"Wiederholungen für den Zeitplan",choose:"Auswahl..."},entity_picker:{title:"Entitäten auswählen",choose:"Auswahl...",no_results:"Keine passenden Elemente gefunden"},action_picker:{title:"Aktion auswählen"}},panel:{common:{title:"Zeitplaner",new_schedule:"Neuer Zeitplan",default_name:"Zeitplan #{id}"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",backend_error:"Es konnte keine Verbindung mit der Scheduler-Komponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",excluded_items:"{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},editor:{repeated_days:"Wiederholen",start_time:"Startzeit",stop_time:"Endzeit",action:"Aktion",add_action:"Aktion hinzufügen",select_timeslot:"Wähle ein Zeitfenster aus",toggle_single_mode:"Zum Einzelmodus",toggle_scheme_mode:"Zum Schemamodus",validation_errors:{overlapping_time:"Der Zeitplan weist Überschneidungen auf.",missing_target_entity:"Bei einer oder mehreren Aktionen fehlt eine Zielentität.",missing_service_parameter:"Bei einer oder mehreren Aktionen fehlt eine erforderliche Einstellung.",missing_action:"Zeitplan enthält keine Aktionen"}},options:{conditions:{header:"Bedingungen",add_condition:"Bedingung hinzufügen",new_condition:"Neuer Zustand",types:{equal_to:"{entity} ist {value}",unequal_to:"{entity} ist nicht {value}",above:"{entity} ist über {value}",below:"{entity} ist unter {value}"},options:{logic_and:"Alle Bedingungen müssen zutreffen.",logic_or:"Eine Bedingung muss zutreffen.",track_changes:"Erneut prüfen wenn sich die Zustände ändern"}},period:{header:"Zeitraum",start_date:"Von",end_date:"Bis"},repeat_type:"Verhalten nach Abschluss",tags:"Tags"}}},lt={services:rt,ui:dt},ct=Object.freeze({__proto__:null,services:rt,ui:dt,default:lt}),ut={generic:{parameter_to_value:"{parameter} σε {value}",action_with_parameter:"{action} με {parameter}"},climate:{set_temperature:"ορισμός θερμοκρασίας[ σε {temperature}]",set_temperature_hvac_mode_heat:"θέρμανση[ σε {temperature}]",set_temperature_hvac_mode_cool:"ψύξη[ σε {temperature}]",set_temperature_hvac_mode_heat_cool:"θέρμανση/ψύξη[ σε {temperature}]",set_temperature_hvac_mode_heat_cool_range:"θέρμανση/ψύξη[ σε {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ σε {temperature}]",set_hvac_mode:"ορισμός λειτουργίας[ σε {hvac_mode}]",set_preset_mode:"ορισμός προκαθορισμένης ρύθμισης[ σε {preset_mode}]",set_fan_mode:"όρισμός ανεμιστήρα[ σε {fan_mode}]",set_swing_mode:"ορισμός κατεύθυνσης[ σε {swing_mode}]"},cover:{close_cover:"κλείσιμο",open_cover:"άνοιγμα",set_cover_position:"ορισμός θέσησ[ σε {position}]",set_cover_tilt_position:"ορισμός κλίσης[ σε {tilt_position}]"},fan:{set_percentage:"ορισμός ταχύτητας[ σε {percentage}]",set_direction:"ορισμός κατεύθυνσης[ σε {direction}]",oscillate:"ορισμός ταλάντωσης[ σε {oscillate}]"},humidifier:{set_humidity:"ορισμός υγρασίας[ σε {humidity}]",set_mode:"ορισμός λειτουργίας[ σε {mode}]"},input_number:{set_value:"ορισμός τιμής[ σε {value}]"},input_select:{select_option:"επιλογή παραμέτρου[ {option}]"},select:{select_option:"επιλογή παραμέτρου[ {option}]"},light:{turn_on:"άναμα[ με φωτεινότητα {brightness} ]"},media_player:{select_source:"επιλογή πηγής[ {source}]"},notify:{send_message:"αποστολή ειδοποίησης"},script:{execute:"εκτέλεση"},vacuum:{start_pause:"έναρξη / παύση"},water_heater:{set_operation_mode:"ορισμός λειτουργίας[ σε {operation_mode}]",set_away_mode:"ορισμός λειτουργίας απουσίας"}},ht={components:{date:{day_types_short:{daily:"ημερήσια",workdays:"εργάσιμες",weekend:"σαββατοκύριακο"},day_types_long:{daily:"κάθε μέρα",workdays:"τις καθημερινές",weekend:"το σαββατοκύριακο"},days:"ημέρες",tomorrow:"αύριο",repeated_days:"κάθε {days}",repeated_days_except:"κάθε μέρα εκτός {excludedDays}",days_range:"από {startDay} έως {endDay}",next_week_day:"επόμενη/-ο {weekday}"},time:{absolute:"στις {time}",interval:"από {startTime} ως {endTime}",at_midnight:"τα μεσάνυχτα",at_noon:"το μεσημέρι",at_sun_event:"το {sunEvent}"}},dialog:{enable_schedule:{title:"Ολοκλήρωση τροποποιήσεων",description:"Το πρόγραμμα που τροποποιήθηκε είναι απενεργοποιημένο, επιθυμείτε να το ενεργοποιήσετε;"},confirm_delete:{title:"Αφαίρεση οντότητας",description:"Είστε σίγουροι ότι θέλετε να αφαιρεθεί αυτή η οντότητα;"},confirm_migrate:{title:"Ενημέρωση προγράμματος",description:"Κάποιες ρυθμίσεις θα χαθούν από αυτή την αλλαγή. Θέλετε να συνεχίσετε;"},weekday_picker:{title:"Επαναλαμβανόμενες ημέρες για το πρόγραμμα",choose:"Επιλογή ημερών..."},entity_picker:{title:"Επιλογή οντοτήτων",choose:"Επιλογή...",no_results:"Δεν βρέθηκε οντότητα"},action_picker:{title:"Επιλογή ενέργειας"}},panel:{common:{title:"Χρονοπρογραμματισμός",new_schedule:"Νέο Πρόγραμμα",default_name:"Πρόγραμμα #{id}"},overview:{no_entries:"Δεν βρέθηκαν καταχωρήσεις προς προβολή",backend_error:"Δεν είναι δυνατή η σύνδεη με το scheduler component. Πρέπει να εγκατασταθεί σαν integration πριν την χρήση αυτής της κάρτας.",excluded_items:"{number} {if number is 1} εξαιρούμενο αντικείμενο {else} εξαιρούμενα αντικείμενα",hide_excluded:"απόκρυψη εξαιρούμενων αντικειμένων",additional_tasks:"{number} επιπλέον {if number is 1} εργασία {else} εργασίες"},editor:{repeated_days:"Επαναλαμβανόμενες ημέρες",start_time:"Ώρα έναρξης",stop_time:"Ώρα ολοκλήρωσης",action:"Ενέργεια",add_action:"Προσθήκη ενέργειας",select_timeslot:"Επιλογή μιας ώρας",toggle_single_mode:"Μεμονωμένη λειτουργία",toggle_scheme_mode:"Λειτουργία προγραμματισμού",validation_errors:{overlapping_time:"Το πρόγραμμα παρουσιάζει αλληλοεπικαλύψεις ώρας",missing_target_entity:"Μια ή περισσότερες ενέργειες δεν διαθέτουν οντότητα - στόχο",missing_service_parameter:"Μια ή περισσότερες ενέργειες δεν διαθέτουν μια απαιτούμενη ρύθμιση",missing_action:"Το πρόγραμμα δεν διαθέτει ενέργειες"}},options:{conditions:{header:"Συνθήκες",add_condition:"Προσθήκη συνθήκης",new_condition:"Νέα συνθήκη",types:{equal_to:"{entity} ισούται με {value}",unequal_to:"{entity} δεν ισούται με {value}",above:"{entity} είναι περισσότερο από {value}",below:"{entity} είναι λιγότερο από {value}"},options:{logic_and:"Όλες οι συνθήκες πρέπει να αληθεύουν",logic_or:"Οποιαδήποτε συνθήκη πρέπει να αληθεύει",track_changes:"Επαναξιολόγηση όταν οι συνθήκες αλλάξουν"}},period:{header:"Περίοδος",start_date:"Από",end_date:"Έως"},repeat_type:"συμπεριφορά μετά την ολοκλήρωση",tags:"Tags"},card_editor:{tabs:{entities:"Οντότητες",other:"Λοιπά"},fields:{title:{heading:"Τίτλος της κάρτας",options:{standard:"τυπικό",hidden:"κρυφό",custom:"προσαρμοσμένο"},custom_title:"Προσαρμοσμενος τίτλος"},discover_existing:{heading:"Προβολή όλων των προγραμμάτων",description:"Αυτό ρυθμίζει την παράμμετρο 'ανακάλυψη υπαρχόντων'. Τα ήδη δημιουργημένα προγράμματα θα προστεθούν αυτόματα στην κάρτα. "},time_step:{heading:"Βήμα χρόνου",description:"Ανάλυση (σε λεπτά) για τη δημιουργία προγραμμάτων",unit_minutes:"λεπτά"},default_editor:{heading:"Προεπιλεγμένος επεξεργαστής χρόνου",options:{single:"Λειτουργία μονής χρονικής περιόδου",scheme:"Λειτουργία χρονικού σχήματος"}},sort_by:{heading:"Επιλογές ταξινόμησης",description:"Σειρά με την οποία εμφανίζονται τα προγράμματα στην κάρτα",options:{relative_time:"Υπολειπόμενος χρόνος έως την επόμενη ενέργεια",title:"Εμφανιζόμενος τίτλος του προγράμματος",state:"Εμφάνιση των ενεργών προγραμμάτων στην κορυφή"}},display_format_primary:{heading:"Προβαλλόμενη κύρια πληροφορία",description:"Ρυθμίστε ποια ετικέτα χρησιμοποιείται για τα προγράμματα στην επισκόπηση",options:{default:"Όνομα προγράμματος",entity_action:"Σύνοψη ενέργειας"}},display_format_secondary:{heading:"Προβαλλόμενη δευτερεύουσα πληροφορία",description:"Ρυθμίστε ποιες πρόσθετες ιδιότητες εμφανίζονται στην επισκόπηση",options:{relative_time:"Υπολειπόμενος χρόνος μέχρι την επόμενη ενέργεια",time:"Προγραμματισμένη ώρα για την επόμενη ενέργεια",days:"Επαναλαμβανόμενες ημέρες της εβδομάδας",additional_tasks:"Αριθμός πρόσθετων εργασιών"}},show_header_toggle:{heading:"Εμφάνιση διακόπτη κεφαλίδας",description:"Εμφάνιση διακόπτη στο επάνω μέρος της κάρτας για ενεργοποίηση/απενεργοποίηση όλων των οντοτήτων"},tags:{heading:"Ετικέτες",description:"Χρησιμοποιήστε ετικέτες για να χωρίσετε τα προγράμματα μεταξύ πολλών καρτών"},entities:{button_label:"Ρύθμιση συμπεριλαμβανόμενων οντοτήτων",heading:"Συμπεριλαμβανόμενες οντότητες",description:"Επιλέξτε τις οντότητες που θέλετε να ελέγχετε μέσω του χρονοπρογραμματιστή. Μπορείτε να κάνετε κλικ σε μια ομάδα για να την ανοίξετε. Λάβετε υπόψη ότι ορισμένες οντότητες (όπως αισθητήρες) μπορούν να χρησιμοποιηθούν μόνο για συνθήκες και όχι για ενέργειες.",included_number:"{number}/{total} επιλεγμένες"}}}}},mt={services:ut,ui:ht},pt=Object.freeze({__proto__:null,services:ut,ui:ht,default:mt}),_t={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"heat/cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heat/cool[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_percentage:"set speed[ to {percentage}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"set mode[ to {mode}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},notify:{send_message:"send notification"},script:{execute:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"set mode[ to {operation_mode}]",set_away_mode:"set away mode"}},gt={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"next {weekday}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},dialog:{enable_schedule:{title:"Complete modifications",description:"The schedule you have changed is currently disabled, do you want to enable it?"},confirm_delete:{title:"Remove entity?",description:"Are you sure you want to remove this entity?"},confirm_migrate:{title:"Update schedule",description:"Some settings will be lost by this change. Do you want to continue?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Scheduler",new_schedule:"New schedule",default_name:"Schedule #{id}"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Period",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"},card_editor:{tabs:{entities:"Entities",other:"Other"},fields:{title:{heading:"Title of the card",options:{standard:"standard",hidden:"hidden",custom:"custom"},custom_title:"Custom title"},discover_existing:{heading:"Show all schedules",description:"This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "},time_step:{heading:"Time step",description:"Resolution (in minutes) for creating schedules",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Single schedule mode",scheme:"Time scheme mode"}},sort_by:{heading:"Sorting options",description:"Order in which the schedules appear in the card",options:{relative_time:"Time remaining until next action",title:"Displayed title of the schedule",state:"Show active schedules on top"}},display_format_primary:{heading:"Displayed primary info",description:"Configure which label is used for schedules in the overview",options:{default:"Schedule name",entity_action:"Summary of task"}},display_format_secondary:{heading:"Displayed secondary info",description:"Configure what additional properties are visible in the overview",options:{relative_time:"Time remaining until next action",time:"Configured time for next action",days:"Repeated days of the week",additional_tasks:"Number of additional tasks"}},show_header_toggle:{heading:"Show header toggle",description:"Show toggle switch at the top of the card for enabling/disabling all entities"},tags:{heading:"Tags",description:"Use tags to divide schedules between multiple cards"},entities:{button_label:"Configure included entities",heading:"Included entities",description:"Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",included_number:"{number}/{total} selected"}}}}},vt={services:_t,ui:gt},yt=Object.freeze({__proto__:null,services:_t,ui:gt,default:vt}),ft={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción[ a {temperature}]",set_temperature_hvac_mode_cool:"frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"calefacción/frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"calefacción/frío[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automático[ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste[ {preset_mode}]",set_fan_mode:"establecer ventilador[ a {fan_mode}]",set_swing_mode:"establecer oscilación[ a {swing_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición[ a {position}]",set_cover_tilt_position:"establecer inclinación[ a {tilt_position}]"},fan:{set_speed:"establecer velocidad[ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]",set_mode:"establecer modo[ a {mode}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ a {option}]"},select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},notify:{send_message:"enviar notificación"},script:{execute:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"establecer modo[ a {operation_mode}]",set_away_mode:"establecer modo fuera de casa"}},bt={components:{date:{day_types_short:{daily:"todos los días",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"días hábiles",weekend:"fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"a la(s) {time}",interval:"desde la(s) {startTime} hasta la(s) {endTime}",at_midnight:"a la medianoche",at_noon:"al mediodía",at_sun_event:"al {sunEvent}"}},dialog:{enable_schedule:{title:"Completar modificaciones",description:"El horario que ha modificado está actualmente deshabilitado, ¿Desea habilitarlo?"},confirm_delete:{title:"¿Eliminar entidad?",description:"¿Está seguro de que deseas eliminar esta entidad?"},confirm_migrate:{title:"Modificar horario",description:"Algunas configuraciones se perderán con este cambio. ¿Desea proceder?"},weekday_picker:{title:"Días repetidos para el horario",choose:"Elegir..."},entity_picker:{title:"Elegir entidades",choose:"Elegir...",no_results:"No se encontraron artículos coincidentes"},action_picker:{title:"Elija Acción"}},panel:{common:{title:"Planificador",new_schedule:"Nuevo horario",default_name:"Horario #{id}"},overview:{no_entries:"No hay ningún elemento que mostrar",backend_error:"Fallo de conexión con el componente planificador (Scheduler component). Debe ser instalado como integración antes de poder usar este panel.",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},editor:{repeated_days:"Días repetidos",start_time:"Inicio",stop_time:"Finalización",action:"Acción",add_action:"Agregar acción",select_timeslot:"Seleccione un bloque de tiempo",toggle_single_mode:"Al modo simple",toggle_scheme_mode:"Al modo esquema",validation_errors:{overlapping_time:"El esquema tiene bloques de tiempo sobrepuestos",missing_target_entity:"Una o más acciones carecen de una entidad asociada",missing_service_parameter:"Una o más acciones carecen de una configuración requerida",missing_action:"El horario no tiene acciones"}},options:{conditions:{header:"Condiciones",add_condition:"Agregar condición",new_condition:"Nueva condición",types:{equal_to:"{entity} es igual a {value}",unequal_to:"{entity} es diferente a {value}",above:"{entity} es mayor que {value}",below:"{entity} es menor que {value}"},options:{logic_and:"Todas las condiciones deben ser válidas",logic_or:"Cualquier condición debe ser válida",track_changes:"Reevaluar si una condición cambia"}},period:{header:"Período",start_date:"De",end_date:"A"},repeat_type:"comportamiento despues de finalizar ",tags:"Etiquetas"},card_editor:{tabs:{entities:"Entidades",other:"Otros"},fields:{title:{heading:"Títujo de la tarjeta",options:{standard:"estándar",hidden:"oculta",custom:"personalizada"},custom_title:"Título personalizado"},discover_existing:{heading:"Mostrar todos los horarios",description:"Esto ajustará el parámetro 'descubrir existentes (discover existing)'. Los horarios creados anteriormente deberán de ser agregados automáticamente a la tarjeta."},time_step:{heading:"Paso de tiempo",description:"Resolución (en minutos) para la creación de horarios.",unit_minutes:"min"},default_editor:{heading:"Editor de tiempo por defecto",options:{single:"Modo de horario sencillo",scheme:"Modo de esquema de tiempo"}},sort_by:{heading:"Opciones de clasificación",description:"Orden en que los horarios aparecen en la tarjeta",options:{relative_time:"Tiempo restante hasta la siguiente acción",title:"Título mostrado del horario",state:"Mostrar los horarios activos primero"}},display_format_primary:{heading:"Mostrar información primaria",description:"Configura que etiqueta se utiliza para los horarios en la vista principal",options:{default:"Nombre del horario",entity_action:"Resumen de la tarea"}},display_format_secondary:{heading:"Mostrar información secundaria",description:"Configura que propiedades adicionales son visibles en la vista principal",options:{relative_time:"Tiempo restante hasta la siguiente acción",time:"Tiempo configurado para la siguiente acción",days:"Días repetidos de la semana",additional_tasks:"Número de tareas adicionales"}},show_header_toggle:{heading:"Mostrar el interruptor del encabezado",description:"Muestra el interruptor en la parte alta de la tarjeta para habilitar/desabilitar todas las entidades Show toggle switch at the top of the card for enabling/disabling all entities"},tags:{heading:"Etiquetas",description:"Use etiquetas para dividir los horarios entre múltiples tarjetas"},entities:{button_label:"Configurar entidades incluidas",heading:"Entidades incluidas",description:"Seleccione las entidades que desea controlar usando el planificador. Puede hacer click en un grupo para abrirlo. Note que algunas entidades (como los sensores) solo pueden ser usados para condiciones, no para acciones.",included_number:"{number}/{total} seleccionados"}}}}},kt={services:ft,ui:bt},wt=Object.freeze({__proto__:null,services:ft,ui:bt,default:kt}),xt={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_temperature_hvac_mode_heat_cool:"küte/jahutus[ @ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"küte/jahutus[ @ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatne[ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]",set_cover_tilt_position:"sea ribide kalle [ asendisse {tilt_position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]",set_mode:"vali režiim [{mode}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},notify:{send_message:"send notification"},script:{execute:"käivita"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_operation_mode:"vali režiim [{operation_mode}]",set_away_mode:"kodust ära"}},$t={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}",next_week_day:"järgmisel {weekday}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Viige muudatused lõpule",description:"Muudetud ajakava on praegu keelatud, kas see peaks olema lubatud?"},confirm_delete:{title:"Kas eemaldan olemi?",description:"Oled kindel, et soovid selle olemi eemaldada?"},confirm_migrate:{title:"Muutke ajakava",description:"Selle muudatusega lähevad mõned seaded kaotsi. Kas soovite jätkata?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastaja",new_schedule:"Uus ajakava",default_name:"Ajakava #{id}"},overview:{no_entries:"Ajastused puuduvad",backend_error:"Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Alustuseks vali ajavahemik",toggle_single_mode:"Üksikrežiimile",toggle_scheme_mode:"Skeemirežiimile",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periood",start_date:"From",end_date:"To"},repeat_type:"toiming peale käivitumist",tags:"Tags"}}},jt={services:xt,ui:$t},Ot=Object.freeze({__proto__:null,services:xt,ui:$t,default:jt}),zt={generic:{parameter_to_value:"{parameter} {value}",action_with_parameter:"{action} {parameter}"},climate:{set_temperature:"aseta lämpötilaksi[ {temperature}]",set_temperature_hvac_mode_heat:"lämmitä[ {temperature} asteeseen]",set_temperature_hvac_mode_cool:"jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool:"lämmitä/jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool_range:"lämmitä/jäähdytä[ välillä {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatilla[ {temperature} asteeseen]",set_hvac_mode:"aseta tilaksi[ {hvac_mode}]",set_preset_mode:"aseta esivalinta[ {preset_mode}]",set_fan_mode:"aseta tuuletus[ {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"sulje",open_cover:"avaa",set_cover_position:"aseta sijainniksi[ {position}]",set_cover_tilt_position:"aseta kallistus[ {tilt_position}]"},fan:{set_speed:"aseta nopeus[ {speed}]",set_direction:"asenta suunta[ {direction}]",oscillate:"aseta pyörimisnopeus[ {oscillate}]"},humidifier:{set_humidity:"aseta kosteus[ {humidity}]",set_mode:"aseta tilaksi {mode}"},input_number:{set_value:"aseta arvo {value}"},input_select:{select_option:"valitse[ {option}]"},select:{select_option:"valitse[ {option}]"},light:{turn_on:"kytke päälle[ {brightness} kirkkaudella]"},media_player:{select_source:"valitse lähteeksi[ {source}]"},notify:{send_message:"lähetä ilmoitus"},script:{execute:"suorita"},vacuum:{start_pause:"aloita / keskeytä"},water_heater:{set_operation_mode:"aseta tilaksi[ {operation_mode}]",set_away_mode:"aseta poissa-tila"}},St={components:{date:{day_types_short:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},day_types_long:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},days:"päivää",tomorrow:"huomenna",repeated_days:"joka {days}",repeated_days_except:"joka päivä paitsi {excludedDays}",days_range:"{startDay} {endDay}",next_week_day:"seuraava {weekday}"},time:{absolute:"{time}",interval:"{startTime} - {endTime}",at_midnight:"keskiyöllä",at_noon:"keskipäivällä",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Suorita muutokset loppuun",description:"Muutettu aikataulu on tällä hetkellä poissa käytöstä, pitäisikö se ottaa käyttöön?"},confirm_delete:{title:"Poistetaanko kohde?",description:"Haluatko varmasti poistaa tämän kohteen?"},confirm_migrate:{title:"Muokkaa aikataulua",description:"Jotkut asetukset menetetään tämän muutoksen seurauksena. Haluatko edetä?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastin",new_schedule:"Uusi aikataulu",default_name:"Aikataulu #{id}"},overview:{no_entries:"Ei näytettäviä kohteita",backend_error:"Ei voitu yhdistää scheduler komponenttiin. Kortin käyttäminen vaatii scheduler integraation asentamisen.",excluded_items:"{number} {if number is 1} poissuljettu kohde {else} poissuljettua kohdetta",hide_excluded:"piilota poissuljetut kohteet",additional_tasks:"{number} {if number is 1} tehtävä {else} tehtävää"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Valitse aikaikkuna ensin",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Ajanjakso",start_date:"From",end_date:"To"},repeat_type:"toiminta tapahtuman jälkeen",tags:"Tags"},card_editor:{tabs:{entities:"Kohteet",other:"Muu"},fields:{title:{heading:"Kortin otsikko",options:{standard:"normaali",hidden:"piilotettu",custom:"muokattu"},custom_title:"Muokattu otsikko"},discover_existing:{heading:"Näytä kaikki ajoitukset",description:"Tämä kytkee käyttöön 'näytä olemassa olevat -attribuutin'. Aiemmin luodut ajastukset lisätään automaattisesti korttiin. "},time_step:{heading:"Ajastusvälit",description:"Ajastusväli minuutteina ajastusten luontiin",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Yksittäistilaan",scheme:"Kaaviotilaan"}},sort_by:{heading:"Lajitteluasetukset",description:"Järjestys miten ajastukset näkyvät kortissa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",title:"Ajastuksen otsikko",state:"Aktiiviset ajastukset ylhäällä"}},display_format_primary:{heading:"Ensisijainen tieto",description:"Valitse mitä näytetään yhteenvedossa",options:{default:"Ajastuksen nimi",entity_action:"Ajastuksen yhteenveto"}},display_format_secondary:{heading:"Toissijainen tieto",description:"Valitse mitkä lisätiedot näkyvät yhteenvedossa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",time:"Seuraavalle toiminnolle määritetty aika",days:"Toistuvat viikonpäivät",additional_tasks:"Lisätoimintojen määrä"}},show_header_toggle:{heading:"Näytä otsikkokytkin",description:"Näytä kytkin kortin yläreunassa usean ajastuksen päälle/pois kytkemiseen"},tags:{heading:"Tunniste",description:"Käytä tunnisteita ajastusten jakamiseen korttien välillä"},entities:{button_label:"Sisällytettyjen entiteettien määrittäminen",heading:"Ajastettavat kohteet",description:"Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",included_number:"{number} / {total} valittu"}}}}},Ct={services:zt,ui:St},At=Object.freeze({__proto__:null,services:zt,ui:St,default:Ct}),Et={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool:"chauffe/refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool_range:"chauffe/refroidit[ à {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]",set_fan_mode:"ajuster le mode de ventilation[ à {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]",set_cover_tilt_position:"régler les volets[ à {tilt_position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]",set_mode:"ajuster le mode[ à {mode}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},notify:{send_message:"envoyer une notification"},script:{execute:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_operation_mode:"ajuster le mode[ à {operation_mode}]",set_away_mode:"choisir le mode absent"}},Tt={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}",next_week_day:"{weekday} prochain"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},dialog:{enable_schedule:{title:"Compléter les modifications",description:"Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"},confirm_delete:{title:"Supprimer l'entité ?",description:"Voulez-vous vraiment supprimer cette entité ?"},confirm_migrate:{title:"Modifier l'horaire",description:"Certains paramètres seront perdus par ce changement. Voulez-vous poursuivre?"},weekday_picker:{title:"Jours de répétition",choose:"Choisir les jours..."},entity_picker:{title:"Choisir les entités",choose:"Choisir...",no_results:"Aucune entité trouvée"},action_picker:{title:"Choisir une action"}},panel:{common:{title:"Planificateur",new_schedule:"Nouvel horaire",default_name:"Horaire #{id}"},overview:{no_entries:"il n'y a pas d'entrée à montrer",backend_error:"Impossible de se connecter au composant du planificateur. Il doit être installé en tant qu'intégration avant que cette carte ne puisse être utilisée.",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},editor:{repeated_days:"Jours de répétition",start_time:"Heure de début",stop_time:"Heure de fin",action:"Action",add_action:"Ajouter une action",select_timeslot:"Choisir d'abord une plage horaire",toggle_single_mode:"Vers mode simple",toggle_scheme_mode:"Vers mode schéma",validation_errors:{overlapping_time:"Certaines plages horaires se chevauchent",missing_target_entity:"Certaines actions n'ont pas d'entité sélectionnée",missing_service_parameter:"Certaines actions ne sont pas totalement configurées",missing_action:"Le planning n'a aucune action définie"}},options:{conditions:{header:"Conditions",add_condition:"Ajouter une condition",new_condition:"Nouvelle condition",types:{equal_to:"{entity} est égal à {value}",unequal_to:"{entity} n'est pas égal à {value}",above:"{entity} est supérieur à {value}",below:"{entity} est inférieur à {value}"},options:{logic_and:"Toutes les conditions doivent être valides",logic_or:"Au moins une condition doit être valide",track_changes:"Ré-évaluer lorsque la condition change"}},period:{header:"Période",start_date:"Du",end_date:"Au"},repeat_type:"Comportement après l'achèvement",tags:"Tags"}}},Dt={services:Et,ui:Tt},Mt=Object.freeze({__proto__:null,services:Et,ui:Tt,default:Dt}),Lt={generic:{parameter_to_value:"{parameter} ל {value}",action_with_parameter:"{action} עם {parameter}"},climate:{set_temperature:"קבע טמפרטורה[ ל {temperature}]",set_temperature_hvac_mode_heat:"חימום[ ל {temperature}]",set_temperature_hvac_mode_cool:"קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool:"חימום/קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool_range:"חימום/קירור[ ל {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"אוטומטי[ ל {temperature}]",set_hvac_mode:"קבע מצב עבודה[ ל {hvac_mode}]",set_preset_mode:"קבע הגדרה[ ל {preset_mode}]",set_fan_mode:"הגדר מצב מאוורר[ ל {fan_mode}]",set_swing_mode:"הגדר מצב תנודת תריס[ ל {swing_mode}]"},cover:{close_cover:"סגירה",open_cover:"פתיחה",set_cover_position:"קבע מיקום[ ל {position}]",set_cover_tilt_position:"קבע הטיה[ ל {tilt_position}]"},fan:{set_speed:"קבע מהירות[ ל {speed}]",set_direction:"קבע כיוון[ ל {direction}]",oscillate:"קבע תנודת תריס[ ל {oscillate}]"},humidifier:{set_humidity:"קבע לחות[ ל {humidity}]",set_mode:"קבע מצב עבודה[ ל {mode}]"},input_number:{set_value:"קבע ערך[ ל {value}]"},input_select:{select_option:"בחר אפשרות[ {option}]"},select:{select_option:"בחר אפשרות[ {option}]"},light:{turn_on:"הדלקה[ בעוצמה של {brightness}]"},media_player:{select_source:"בחר מקור[ {source}]"},notify:{send_message:"שלח התראה"},script:{execute:"בצע"},vacuum:{start_pause:"התחל / הפסק"},water_heater:{set_operation_mode:"קבע מצב עבודה[ ל {operation_mode}]",set_away_mode:"קבע מצב מוץ לבית"}},Pt={components:{date:{day_types_short:{daily:"כל יום",workdays:"ימי חול",weekend:"סוף שבוע"},day_types_long:{daily:"כל יום",workdays:"בימי חול",weekend:"בסוף השבוע"},days:"ימים",tomorrow:"מחר",repeated_days:"בכל {days}",repeated_days_except:"בכל יום פרט ל  {excludedDays}",days_range:"מ- {startDay} ועד- {endDay}",next_week_day:"הבא {weekday}"},time:{absolute:"בשעה {time}",interval:"משעה {startTime} עד שעה {endTime}",at_midnight:"בחצות הלילה",at_noon:"בחצות היום",at_sun_event:"ב {sunEvent}"}},dialog:{enable_schedule:{title:"השלם את השינויים",description:"לוח הזמנים ששונה מושבת כעת, האם צריך להפעיל אותו?"},confirm_delete:{title:"להסיר את הישות?",description:"האם בוודאות ברצונך להסיר ישות זו?"},confirm_migrate:{title:"שנה את לוח הזמנים",description:"חלק מההגדרות יאבדו על ידי פעולה זו. האם אתה רוצה להמשיך?"},weekday_picker:{title:"ימים לחזרה עבור לוח זמנים",choose:"בחר..."},entity_picker:{title:"בחר ישויות",choose:"בחר...",no_results:"לא נמצאו פריטים תואמים"},action_picker:{title:"בחר פעולה"}},panel:{common:{title:"לוח זמנים",new_schedule:"לוח זמנים חדש",default_name:"לוח זמנים #{id}"},overview:{no_entries:"אין פריטים להצגה",backend_error:"אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",excluded_items:"{number} לא נכלל {if number is 1} פריט {else} פריטים",hide_excluded:"הסתר פריטים לא כלולים",additional_tasks:"{number} נוסף {if number is 1} משימה {else} משימות"},editor:{repeated_days:"ימים לחזרה",start_time:"זמן התחלה",stop_time:"זמן סיום",action:"פעולה",add_action:"הוספת פעולה",select_timeslot:"בחר משבצת זמן קודם",toggle_single_mode:"למצב פשוט",toggle_scheme_mode:"למצב דיאגרמה",validation_errors:{overlapping_time:"לוח הזמנים כולל משבצות זמן חופפות",missing_target_entity:"אחת או יותר מהפעולות חסרות ישות יעד",missing_service_parameter:"אחת או יותר מהפעולות חסרות הגדרה נדרשת",missing_action:"לוח הזמנים אינו כולל פעולות"}},options:{conditions:{header:"תנאים",add_condition:"הוספת תנאי",new_condition:"תנאי חדש",types:{equal_to:"{entity} שווה ל-{value}",unequal_to:"{entity} לא שווה ל-{value}",above:"{entity} מעל {value}",below:"{entity} מתחת {value}"},options:{logic_and:"כל התנאים חייבים להיות נכונים",logic_or:"כל תנאי חייב להיות נכון",track_changes:"הערכה מחדש כאשר התנאים משתנים"}},period:{header:"פרק זמן",start_date:"מ",end_date:"ל"},repeat_type:"התנהגות לאחר הפעלה",tags:"תגים"},card_editor:{tabs:{entities:"ישויות",other:"אחר"},fields:{title:{heading:"כותרת הכרטיס",options:{standard:"רגילה",hidden:"מוסתרת",custom:"מותאמת אישית"},custom_title:"כותרת מותאמת אישית"},discover_existing:{heading:"הצג את כל לוחות הזמנים",description:"הגדרה זו קובעת את הפרמטר 'discover existing'. לוחות זמנים שנוצרו בעבר יתווספו אוטומטית לכרטיס"},time_step:{heading:"מרווח זמן",description:"רזולוציה (בדקות) ליצירת לוחות זמנים",unit_minutes:"דק'"},default_editor:{heading:"עורך זמן ברירת מחדל",options:{single:"מצב לוח זמנים בודד",scheme:"מצב תבנית זמנים"}},sort_by:{heading:"אפשרויות מיון",description:"סדר הופעת לוחות הזמנים בכרטיס",options:{relative_time:"זמן שנותר עד הפעולה הבאה",title:"כותרת לוח הזמנים המוצגת",state:"הצג לוחות זמנים פעילים בראש"}},display_format_primary:{heading:"מידע ראשי מוצג",description:"הגדר איזו תווית תשמש עבור לוחות הזמנים בסקירה הכללית",options:{default:"שם לוח הזמנים",entity_action:"סיכום המשימה"}},display_format_secondary:{heading:"מידע משני מוצג",description:"הגדר אילו מאפיינים נוספים יהיו גלויים בסקירה הכללית",options:{relative_time:"זמן שנותר עד הפעולה הבאה",time:"זמן מוגדר לפעולה הבאה",days:"ימים חוזרים בשבוע",additional_tasks:"מספר משימות נוספות"}},show_header_toggle:{heading:"הצג מתג בכותרת",description:"הצג מתג הפעלה/כיבוי בראש הכרטיס להפעלה/השבתה של כל הישויות"},tags:{heading:"תגיות",description:"השתמש בתגיות כדי לחלק לוחות זמנים בין כרטיסים שונים"},entities:{button_label:"הגדר ישויות כלולות",heading:"ישויות כלולות",description:"בחר את הישויות שברצונך לשלוט בהן באמצעות המתזמן. ניתן ללחוץ על קבוצה כדי לפתוח אותה. שים לב שחלק מהישויות (כמו חיישנים) יכולות לשמש רק לתנאים, ולא לפעולות.",included_number:"{number}/{total} נבחרו"}}}}},Nt={services:Lt,ui:Pt},It=Object.freeze({__proto__:null,services:Lt,ui:Pt,default:Nt}),qt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"melegíteni[ to {temperature}]",set_temperature_hvac_mode_cool:"hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"melegíteni/hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"melegíteni/hűtés[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatikus[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"mód beállítása[ to {mode}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},notify:{send_message:"send notification"},script:{execute:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"mód beállítása[ to {operation_mode}]",set_away_mode:"set away mode"}},Vt={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"következő {weekday}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},dialog:{enable_schedule:{title:"Végezze el a módosításokat",description:"A módosított ütemezés jelenleg le van tiltva, engedélyezni kell?"},confirm_delete:{title:"Biztos benne, hogy eltávolítja az entitást?",description:"Biztos benne, hogy el szeretné távolítani ezt az entitást?"},confirm_migrate:{title:"Ütemezés módosítása",description:"Ezzel a művelettel bizonyos beállítások elvesznek. Akarod folytatni?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Időzítések",new_schedule:"Új ütemezés",default_name:"Ütemterv #{id}"},overview:{no_entries:"Nincs megjeleníthető elem",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",toggle_single_mode:"Egyszerű módba",toggle_scheme_mode:"Diagram módba",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Időszak",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"}}},Rt={services:qt,ui:Vt},Ht=Object.freeze({__proto__:null,services:qt,ui:Vt,default:Rt}),Ft={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"riscaldamento/raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"riscaldamento/raffrescamento[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]",set_cover_tilt_position:"imposta inclinazione[ su {tilt_position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]",set_mode:"imposta modalità[ a {mode}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},notify:{send_message:"invia notifica"},script:{execute:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_operation_mode:"imposta modalità[ a {operation_mode}]",set_away_mode:"imposta fuori casa"}},Ut={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"giorni",tomorrow:"domani",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",next_week_day:"prossimo {weekday}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},dialog:{enable_schedule:{title:"Completa le modifiche",description:"La pianificazione modificata è attualmente disabilitata, dovrebbe essere abilitata?"},confirm_delete:{title:"Vuoi rimuovere l'entità?",description:"Sei sicuro di voler rimuovere questa entità?"},confirm_migrate:{title:"Modifica orario",description:"Alcune impostazioni andranno perse con questa azione. Vuoi procedere?"},weekday_picker:{title:"Giorni ripetuti per la pianificazione",choose:"Scegli..."},entity_picker:{title:"Scegli entità",choose:"Scegli...",no_results:"Nessun elemento corrispondente trovato"},action_picker:{title:"Scegli azione"}},panel:{common:{title:"Schedulatore",new_schedule:"Nuovo orario",default_name:"Orario #{id}"},overview:{no_entries:"Non ci sono oggetti da visualizzare",backend_error:"Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},editor:{repeated_days:"Giorni ripetuti",start_time:"Ora di inizio",stop_time:"Ora di fine",action:"Azione",add_action:"Aggiungi azione",select_timeslot:"Seleziona una fascia oraria",toggle_single_mode:"Alla modo semplice",toggle_scheme_mode:"Alla modo schema",validation_errors:{overlapping_time:"Il programma ha fasce orarie sovrapposte",missing_target_entity:"Una o più azioni mancano di un'entità target",missing_service_parameter:"Una o più azioni mancano di un'impostazione richiesta",missing_action:"Il programma non ha azioni"}},options:{conditions:{header:"Condizioni",add_condition:"Aggiungi condizione",new_condition:"Nuova condizione",types:{equal_to:"{entity} è uguale a {value}",unequal_to:"{entity} è diverso da {value}",above:"{entity} è superiore a {value}",below:"{entity} è inferiore a {value}"},options:{logic_and:"Tutte le condizioni devono essere vere",logic_or:"Qualsiasi condizione deve essere vera",track_changes:"Rivaluta quando cambiano le condizioni"}},period:{header:"Periodo",start_date:"From",end_date:"To"},repeat_type:"comportamento dopo il completamento",tags:"Tags"}}},Bt={services:Ft,ui:Ut},Wt=Object.freeze({__proto__:null,services:Ft,ui:Ut,default:Bt}),Zt={generic:{parameter_to_value:"{parameter} uz {value}",action_with_parameter:"{action} ar {parameter}"},climate:{set_temperature:"uzstādīt temperatūru[ uz {temperature}]",set_temperature_hvac_mode_heat:"sildīt[ līdz {temperature}]",set_temperature_hvac_mode_cool:"atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool:"sildīt/atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool_range:"sildīt/atdzesēt[ uz {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ uz {temperature}]",set_hvac_mode:"iestatīt[ uz {hvac_mode}]",set_preset_mode:"iestatīt režīmu[ uz {preset_mode}]",set_fan_mode:"iestatīt ventilatora režīmu[ uz {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"aizvērt",open_cover:"atvērt",set_cover_position:"uzstādīt pozīciju[ uz {position}]",set_cover_tilt_position:"uzstādīt slīpuma stāvokli[ uz {tilt_position}]"},fan:{set_speed:"iestatīt ātrumu[ uz {speed}]",set_direction:"iestatīt virzienu[ uz {direction}]",oscillate:"iestatīt oscilāciju[ uz {oscillate}]"},humidifier:{set_humidity:"iestatīt mitrumu[ uz {humidity}]",set_mode:"iestatīt režīmu[ uz {mode}]"},input_number:{set_value:"iestatīt vērtību[ uz {value}]"},input_select:{select_option:"izvēlēties opciju[ {option}]"},select:{select_option:"izvēlēties opciju[ {option}]"},light:{turn_on:"ieslēgt[ ar {brightness} spilgtumu]"},media_player:{select_source:"izvēlēties avotu[ {source}]"},notify:{send_message:"nosūtīt paziņojumu"},script:{execute:"izpildīt"},vacuum:{start_pause:"sākt / pauze"},water_heater:{set_operation_mode:"iestatīt režīmu[ uz {operation_mode}]",set_away_mode:"iestatīt prombūtnes režīmu"}},Kt={components:{date:{day_types_short:{daily:"ikdienišķs",workdays:"darba dienas",weekend:"nedēļas nogale"},day_types_long:{daily:"katru dienu",workdays:"darba dienās",weekend:"nedēļas nogalē"},days:"dienas",tomorrow:"rītdiena",repeated_days:"katras {days}",repeated_days_except:"katru dienu, izņemot {excludedDays}",days_range:"no {startDay} līdz {endDay}",next_week_day:"nākošo {weekday}"},time:{absolute:"kad {time}",interval:"no {startTime} līdz {endTime}",at_midnight:"kad midnight",at_noon:"kad noon",at_sun_event:"kad {sunEvent}"}},dialog:{enable_schedule:{title:"Pabeigt modificēšanu",description:"Izmainītais grafiks pašlaik ir atspējots, vai vēlaties to iespējot?"},confirm_delete:{title:"Vai dzēst vienību?",description:"Vai tiešām vēlaties dzēst šo vienību?"},confirm_migrate:{title:"Atjaunināt grafiku",description:"Šīs izmaiņas rezultātā daži iestatījumi tiks zaudēti. Vai vēlaties turpināt?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plānotājs",new_schedule:"Jauns grafiks",default_name:"Grafiks #{id}"},overview:{no_entries:"Nav parādāmu vienību",backend_error:"Nevar izveidot savienojumu ar plānotāja komponenti. Pirms šīs kartes izmantošanas tā ir jāinstalē kā integrācija.",excluded_items:"{number} izslēgtas {if number is 1} vienība {else} vienības",hide_excluded:"paslēpt izslēgtās vienības",additional_tasks:"{number} papildu {if number is 1} uzdevums {else} uzdevumi"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Vispirms izvēlieties laika slotu",toggle_single_mode:"Uz vienkāršo režīmu",toggle_scheme_mode:"Uz shēmas režīmu",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Pārvērtēt, kad mainās nosacījumi"}},period:{header:"Periods",start_date:"From",end_date:"To"},repeat_type:"uzvedība pēc beigām",tags:"Tags"},card_editor:{tabs:{entities:"Vienības",other:"Cits"},fields:{title:{heading:"Kartes nosaukums",options:{standard:"standarta",hidden:"paslēpts",custom:"pielāgots"},custom_title:"Pielāgots nosaukums"},discover_existing:{heading:"Rādīt visus grafikus",description:"Šis iestata 'atklāt esošo' parametru. Iepriekš izveidotie grafiki automātiski tiks pievienoti kartei."},time_step:{heading:"Laika solis",description:"Izšķirtspēja (minūtēs) grafiku izveidei",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Single schedule mode",scheme:"Time scheme mode"}},sort_by:{heading:"Kārtošanas opcijas",description:"Kārtība, kādā grafiki parādās kartē",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",title:"Grafika nosaukums",state:"Rādīt aktīvos grafikus augšā"}},display_format_primary:{heading:"Rādītā primārā informācija",description:"Konfigurējiet, kura informācija tiek izmantota grafiku pārskatā",options:{default:"Grafika nosaukums",entity_action:"Uzdevuma kopsavilkums"}},display_format_secondary:{heading:"Rādītā sekundārā informācija",description:"Konfigurējiet, kuras papildu īpašības ir redzamas pārskatā",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",time:"Konfigurētais laiks nākamajai darbībai",days:"Atkārtotas nedēļas dienas",additional_tasks:"Papildu uzdevumu skaits"}},show_header_toggle:{heading:"Rādīt galvenes pārslēgšanu",description:"Rādīt pārslēgšanas slēdzi kartes augšdaļā, lai iespējotu/atspējotu visas vienības"},tags:{heading:"Tagi",description:"Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"},entities:{button_label:"Iekļauto elementu konfigurēšana",heading:"Iekļautās vienības",description:"Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",included_number:"{number}/{total} izvēlēts"}}}}},Gt={services:Zt,ui:Kt},Jt=Object.freeze({__proto__:null,services:Zt,ui:Kt,default:Gt}),Yt={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool:"verwarmen/koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool_range:"verwarmen/koelen[ naar {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen",set_fan_mode:"ventilatiemodus aanpassen[ naar {fan_mode}]",set_swing_mode:"oscillatiemodus aanpassen[ naar {swing_mode}]"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]",set_cover_tilt_position:"hellingshoek instellen[ naar {tilt_position}]"},fan:{set_percentage:"snelheid instellen[ op {percentage}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]",set_mode:"modus aanpassen[ naar {mode}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},notify:{send_message:"notificatie sturen"},script:{execute:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_operation_mode:"modus aanpassen[ naar {operation_mode}]",set_away_mode:"stel afwezigheidsmode in"}},Qt={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}",next_week_day:"volgende week {weekday}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},dialog:{enable_schedule:{title:"Wijzigingen voltooid",description:"Deze planning is momenteel gedeactiveerd. Dient deze te worden ingeschakeld?"},confirm_delete:{title:"Entiteit verwijderen?",description:"Weet je zeker dat je dit item wilt verwijderen?"},confirm_migrate:{title:"Schema bijwerken",description:"Door deze actie gaan vorige instellingen verloren. Wil je doorgaan?"},weekday_picker:{title:"Herhaalde dagen voor tijdschema",choose:"Kies..."},entity_picker:{title:"Kies entiteiten",choose:"Kies...",no_results:"Geen overeenkomstige items gevonden"},action_picker:{title:"Kies actie"}},panel:{common:{title:"Tijdplanner",new_schedule:"Nieuw schema",default_name:"Schema #{id}"},overview:{no_entries:"Er zijn geen items aangemaakt",backend_error:"Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},editor:{repeated_days:"Herhaling",start_time:"Starttijd",stop_time:"Eindtijd",action:"Actie",add_action:"Actie toevoegen",select_timeslot:"Selecteer een tijdslot...",toggle_single_mode:"Naar enkele modus",toggle_scheme_mode:"Naar schema modus",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Condities",add_condition:"Conditie toevoegen",new_condition:"Nieuwe conditie",types:{equal_to:"{entity} is gelijk aan {value}",unequal_to:"{entity} is ongelijk aan {value}",above:"{entity} is hoger dan {value}",below:"{entity} is lager dan {value}"},options:{logic_and:"Alle condities moeten zijn voldaan",logic_or:"Een van de condities moet zijn voldaan",track_changes:"Herevalueer als de condities veranderen"}},period:{header:"Periode",start_date:"Vanaf",end_date:"Tot"},repeat_type:"Gedrag na voltooiing",tags:"Tags"},card_editor:{tabs:{entities:"Entiteiten",other:"Overig"},fields:{title:{heading:"Titel van de kaart",options:{standard:"standaard",hidden:"verborgen",custom:"anders"},custom_title:"Eigen titel"},discover_existing:{heading:"Alle schema's tonen",description:"Hiermee wordt de 'discover existing' instelling geactiveerd. Eerder aangemaakte schema's zullen automatisch worden weergegeven."},time_step:{heading:"Stapgrootte voor tijd",description:"Resolutie (in minuten)",unit_minutes:"min"},default_editor:{heading:"Standaardmodus voor tijdsinvoer",options:{single:"Enkele modus",scheme:"Tijdschema-modus"}},sort_by:{heading:"Sorteer-opties",description:"Volgorde waarin de schema's worden weergegeven in de kaart",options:{relative_time:"Resterende tijd tot volgende actie",title:"Weergegeven titel van de schema's",state:"Actieve schema's eerst"}},display_format_primary:{heading:"Weergegeven primaire info",description:"Kies welk label wordt gebruikt in de weergave",options:{default:"Schema naam",entity_action:"Samenvatting van de actie"}},display_format_secondary:{heading:"Weergegeven secondaire info",description:"Kies welke aanvullende informatie zichtbaar is in de weergave",options:{relative_time:"Resterende tijd tot volgende actie",time:"Ingestelde tijd voor de volgende actie",days:"Herhaalde dagen van de week",additional_tasks:"Aantal resterende acties"}},show_header_toggle:{heading:"Hoofdschakelaar weergeven",description:"Schakelaar weergeven bovenin de kaart om alle schema's te (de)activeren"},tags:{heading:"Tags",description:"Tags kunnen gebruikt worden om schema's te verdelen over meerdere kaarten"},entities:{button_label:"Configureer zichtbare entiteiten",heading:"Zichtbare entiteiten",description:"Kies de entiteiten die je wilt bedienen vanuit schema's. Klik op een categorie om deze te openen. Merk op dat sommige entiteiten gebruikt worden om condities toe te wijzen.",included_number:"{number}/{total} geselecteerd"}}}}},Xt={services:Yt,ui:Qt},ei=Object.freeze({__proto__:null,services:Yt,ui:Qt,default:Xt}),ti={generic:{parameter_to_value:"{parameter} til {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat:"oppvarming[ til {temperature}]",set_temperature_hvac_mode_cool:"kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool:"oppvarming/kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool_range:"oppvarming/kjøling[ til {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ til {temperature}]",set_hvac_mode:"sett modus[ til {hvac_mode}]",set_preset_mode:"sett forhåndsvalg[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ til {position}]",set_cover_tilt_position:"sett vippestilling[ til {tilt_position}]"},fan:{set_speed:"sett hastighet[ til {speed}]",set_direction:"sett retning[ til {direction}]",oscillate:"sett svingning[ til {oscillate}]"},humidifier:{set_humidity:"sett luftfuktighet[ til {humidity}]",set_mode:"sett modus[ til {mode}]"},input_number:{set_value:"sett verdi[ til {value}]"},input_select:{select_option:"velg[ {option}]"},select:{select_option:"velg[ {option}]"},light:{turn_on:"slå på[ med {brightness} lysstyrke]"},media_player:{select_source:"velg kilde[ {source}]"},notify:{send_message:"send notifikasjon"},script:{execute:"utfør"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"sett modus[ til {operation_mode}]",set_away_mode:"sett bortemodus"}},ii={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},days:"Dager",tomorrow:"imorgen",repeated_days:"hver {days}",repeated_days_except:"hver dag unntatt {excludedDays}",days_range:"fra {startDay} til {endDay}",next_week_day:"neste {weekday}"},time:{absolute:"kl. {time}",interval:"fra {startTime} til {endTime}",at_midnight:"ved midnatt",at_noon:"kl. 12.00",at_sun_event:"ved {sunEvent}"}},dialog:{enable_schedule:{title:"Fullfør endringene",description:"Tidsplanen som er endret er for øyeblikket deaktivert, bør den være aktivert?"},confirm_delete:{title:"Vil du fjerne entiteten?",description:"Er du sikker på at du vil fjerne denne entiteten?"},confirm_migrate:{title:"Endre tidsplanen",description:"Noen innstillinger vil gå tapt ved denne handlingen. Vil du fortsette?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Tidsplan",new_schedule:"Ny tidsplan",default_name:"Tidsplan #{id}"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",backend_error:"Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",excluded_items:"{number} ekskludert {if number is 1} element {else} elementer",hide_excluded:"skjul ekskluderte elementer",additional_tasks:"{number} flere {if number is 1} oppgaver {else} oppgaver"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Velg tidsluke",toggle_single_mode:"Til enkel modus",toggle_scheme_mode:"Til skjemamodus",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periode",start_date:"From",end_date:"To"},repeat_type:"oppførsel etter fullføring",tags:"Tags"}}},si={services:ti,ui:ii},ai=Object.freeze({__proto__:null,services:ti,ui:ii,default:si}),oi={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z parametrem {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrzewanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chłodzenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrzewanie/chłodzenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrzewanie/chłodzenie[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ na {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw tryb[ na {preset_mode}]",set_fan_mode:"ustaw tryb wentylatora[ na {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]",set_cover_tilt_position:"ustaw kąt nachylenia[ na {tilt_position}]"},fan:{set_percentage:"ustaw prędkość[ na {percentage}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylację[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]",set_mode:"ustaw tryb[ na {mode}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"włącz[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},notify:{send_message:"wyślij powiadomienie"},script:{execute:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"ustaw tryb[ na {operation_mode}]",set_away_mode:"ustaw tryb poza domem"}},ni={components:{date:{day_types_short:{daily:"codziennie",workdays:"dni robocze",weekend:"weekend"},day_types_long:{daily:"każdego dnia",workdays:"w dni robocze",weekend:"w weekend"},days:"dni",tomorrow:"jutro",repeated_days:"każde {days}",repeated_days_except:"każdego dnia oprócz {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"w {weekday}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północy",at_noon:"w południe",at_sun_event:"o {sunEvent}"}},dialog:{enable_schedule:{title:"Zakończ modyfikacje",description:"Harmonogram, który zmieniłeś, jest obecnie wyłączony. Czy chcesz go włączyć?"},confirm_delete:{title:"Usunąć encję?",description:"Czy na pewno chcesz usunąć tę encję?"},confirm_migrate:{title:"Aktualizuj harmonogram",description:"Niektóre ustawienia zostaną utracone przy tej zmianie. Czy chcesz kontynuować?"},weekday_picker:{title:"Dni powtórzeń dla harmonogramu",choose:"Wybierz..."},entity_picker:{title:"Wybierz encje",choose:"Wybierz...",no_results:"Nie znaleziono pasujących elementów"},action_picker:{title:"Wybierz akcję"}},panel:{common:{title:"Harmonogram",new_schedule:"Nowy harmonogram",default_name:"Harmonogram #{id}"},overview:{no_entries:"Brak elementów do wyświetlenia",backend_error:"Nie można połączyć się z komponentem harmonogramu. Musi być zainstalowany jako integracja, zanim ta karta będzie mogła być używana.",excluded_items:"{number} wykluczonych {if number is 1} element {else} elementów",hide_excluded:"ukryj wykluczone elementy",additional_tasks:"{number} dodatkowych {if number is 1} zadanie {else} zadań"},editor:{repeated_days:"Powtarzane dni",start_time:"Czas rozpoczęcia",stop_time:"Czas zakończenia",action:"Akcja",add_action:"Dodaj akcję",select_timeslot:"Wybierz przedział czasowy",toggle_single_mode:"Do trybu prostego",toggle_scheme_mode:"Do trybu schematu",validation_errors:{overlapping_time:"Harmonogram ma nachodzące na siebie przedziały czasowe",missing_target_entity:"Jednej lub więcej akcji brakuje docelowej encji",missing_service_parameter:"Jednej lub więcej akcji brakuje wymaganego parametru",missing_action:"Harmonogram nie ma żadnych akcji"}},options:{conditions:{header:"Warunki",add_condition:"Dodaj warunek",new_condition:"Nowy warunek",types:{equal_to:"{entity} równa się {value}",unequal_to:"{entity} różni się od {value}",above:"{entity} jest powyżej {value}",below:"{entity} jest poniżej {value}"},options:{logic_and:"Wszystkie warunki muszą być spełnione",logic_or:"Dowolny warunek musi być spełniony",track_changes:"Ponownie sprawdzaj przy zmianie warunków"}},period:{header:"Okres",start_date:"Od",end_date:"Do"},repeat_type:"zachowanie po zakończeniu",tags:"Tagi"},card_editor:{tabs:{entities:"Encje",other:"Inne"},fields:{title:{heading:"Tytuł karty",options:{standard:"standardowy",hidden:"ukryty",custom:"niestandardowy"},custom_title:"Niestandardowy tytuł"},discover_existing:{heading:"Pokaż wszystkie harmonogramy",description:"Ustawia parametr 'discover existing'. Wcześniej utworzone harmonogramy będą automatycznie dodane do karty."},time_step:{heading:"Krok czasu",description:"Rozdzielczość (w minutach) przy tworzeniu harmonogramów",unit_minutes:"min"},default_editor:{heading:"Domyślny edytor czasu",options:{single:"Tryb prostego harmonogramu",scheme:"Tryb schematu czasu"}},sort_by:{heading:"Opcje sortowania",description:"Kolejność, w jakiej harmonogramy pojawiają się na karcie",options:{relative_time:"Czas do następnej akcji",title:"Wyświetlana nazwa harmonogramu",state:"Pokaż aktywne harmonogramy na górze"}},display_format_primary:{heading:"Wyświetlana główna informacja",description:"Określ, która etykieta jest używana dla harmonogramów w podglądzie",options:{default:"Nazwa harmonogramu",entity_action:"Podsumowanie zadania"}},display_format_secondary:{heading:"Wyświetlana dodatkowa informacja",description:"Skonfiguruj, które dodatkowe właściwości są widoczne w podglądzie",options:{relative_time:"Czas do następnej akcji",time:"Skonfigurowany czas następnej akcji",days:"Powtarzane dni tygodnia",additional_tasks:"Liczba dodatkowych zadań"}},show_header_toggle:{heading:"Pokaż przełącznik w nagłówku",description:"Pokaż przełącznik w nagłówku karty do włączania/wyłączania wszystkich encji"},tags:{heading:"Tagi",description:"Używaj tagów do podziału harmonogramów pomiędzy wieloma kartami"},entities:{button_label:"Konfiguruj zawarte encje",heading:"Zawarte encje",description:"Wybierz encje, którymi chcesz sterować za pomocą harmonogramu. Możesz kliknąć na grupę, aby ją otworzyć. Zauważ, że niektóre encje (np. sensory) mogą być używane tylko jako warunki, a nie akcje.",included_number:"{number}/{total} wybrano"}}}}},ri={services:oi,ui:ni},di=Object.freeze({__proto__:null,services:oi,ui:ni,default:ri}),li={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo ventoinha[ para {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir inclinação[ como {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{send_message:"enviar notificação"},script:{execute:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},ci={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover a entidade?",description:"Tem a certeza que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"},weekday_picker:{title:"Repetições semanais",choose:"Escolha..."},entity_picker:{title:"Escolha entidades",choose:"Escolha...",no_results:"Sem resultados"},action_picker:{title:"Escolha a acção"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Não consegui ligar ao componente de agendamento. Essa integração tem que ser instalada antes da utilização deste cartão.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},editor:{repeated_days:"Repetições semanais",start_time:"Hora início",stop_time:"Hora fim",action:"Acção",add_action:"Acrescentar acção",select_timeslot:"Selecionar um período horário",toggle_single_mode:"Para modo simples",toggle_scheme_mode:"Para modo esquema",validation_errors:{overlapping_time:"O Horário tem sobreposições",missing_target_entity:"Uma ou mais acções sem entidade definida",missing_service_parameter:"Unma ou mais acções sem uma definição obrigatória",missing_action:"O Horário não tem acções"}},options:{conditions:{header:"Condições",add_condition:"Acrescentar condição",new_condition:"Nova condição",types:{equal_to:"{entity} igual a {value}",unequal_to:"{entity} diferente de {value}",above:"{entity} acima de {value}",below:"{entity} abaixo de {value}"},options:{logic_and:"Todas as condições têm de ser verdadeiras",logic_or:"Uma das condições tem de ser verdadeira",track_changes:"Reavaliar em caso de alterações"}},period:{header:"Período",start_date:"Desde",end_date:"Até"},repeat_type:"Comportamento após a conclusão",tags:"Etiquetas"}}},ui={services:li,ui:ci},hi=Object.freeze({__proto__:null,services:li,ui:ci,default:ui}),mi={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo do ventilador[ para {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir a posição de inclinação[ para {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{send_message:"enviar notificação"},script:{execute:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},pi={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"de {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover entidade?",description:"Tem certeza de que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens para mostrar",backend_error:"Não foi possível conectar com o componente agendador. Ele precisa ser instalado como integração antes que este cartão possa ser usado.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selecionar um período horário",toggle_single_mode:"Para modo simples",toggle_scheme_mode:"Para modo esquema",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Reavaliar quando as condições mudarem"}},period:{header:"Período",start_date:"From",end_date:"To"},repeat_type:"comportamento após a conclusão",tags:"Tags"}}},_i={services:mi,ui:pi},gi=Object.freeze({__proto__:null,services:mi,ui:pi,default:_i}),vi={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool:"încălzire/răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool_range:"încălzire/răcire[ la {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]",set_mode:"setare mod[ la {mode}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},notify:{send_message:"send notification"},script:{execute:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_operation_mode:"setare mod[ la {operation_mode}]",set_away_mode:"setare mod plecat"}},yi={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}",next_week_day:"{weekday} viitoare"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},dialog:{enable_schedule:{title:"Completați modificările",description:"Programul care a fost modificat este momentan dezactivat, ar trebui activat?"},confirm_delete:{title:"Ștergeți entitatea?",description:"Sigur doriți să eliminați această entitate?"},confirm_migrate:{title:"Modificați programul",description:"Unele setări se vor pierde prin această acțiune. Vrei sa continui?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Planificator",new_schedule:"Noul program",default_name:"Program #{id}"},overview:{no_entries:"Nu există elemente de afișat",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selectați un interval orar",toggle_single_mode:"Te lokho modo",toggle_scheme_mode:"Te sxeme modo",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Perioadă",start_date:"From",end_date:"To"},repeat_type:"comportament după declanșare",tags:"Tags"}}},fi={services:vi,ui:yi},bi=Object.freeze({__proto__:null,services:vi,ui:yi,default:fi}),ki={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool:"обогрев/охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"обогрев/охлаждение[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвто[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]",set_cover_tilt_position:"установить наклон[ {tilt_position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]",set_mode:"установить режим[ {mode}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},notify:{send_message:"послать сообщение"},script:{execute:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"установить режим[ {operation_mode}]",set_away_mode:"установить режим вне дома"}},wi={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}",next_week_day:"в следующую {weekday}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},dialog:{enable_schedule:{title:"Завершите модификации",description:"Расписание, которое было изменено, в настоящее время отключено, следует ли его включить?"},confirm_delete:{title:"Удалить объект?",description:"Вы уверены, что хотите удалить этот объект?"},confirm_migrate:{title:"Изменить расписание",description:"При этом некоторые настройки будут потеряны. Вы хотите продолжить?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планировщик",new_schedule:"Новое расписание",default_name:"Расписание #{id}"},overview:{no_entries:"Отсутствуют элементы",backend_error:"Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Выберите временной слот",toggle_single_mode:"В простой режим",toggle_scheme_mode:"В режим схемы",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"период",start_date:"From",end_date:"To"},repeat_type:"поведение после срабатывания",tags:"Tags"}}},xi={services:ki,ui:wi},$i=Object.freeze({__proto__:null,services:ki,ui:wi,default:xi}),ji={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastaviť teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"vykurovanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"vykurovanie/chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"vykurovanie/chladenie[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastaviť režim[ na {hvac_mode}]",set_preset_mode:"nastaviť predvoľbu[ {preset_mode}]",set_fan_mode:"nastaviť režim ventilátora[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"zatvoriť",open_cover:"otvoriť",set_cover_position:"nastaviť polohu[ na {position}]",set_cover_tilt_position:"nastaviť naklonenie[ na {tilt_position}]"},fan:{set_speed:"nastaviť rýchlosť[ na {speed}]",set_direction:"nastaviť smer[ na {direction}]",oscillate:"nastaviť osciláciu[ na {oscillate}]"},humidifier:{set_humidity:"nastaviť vlhkosť[ na {humidity}]",set_mode:"nastaviť režim[ na {mode}]"},input_number:{set_value:"nastaviť hodnotu[ na {value}]"},input_select:{select_option:"vybrať možnosť[ {option}]"},select:{select_option:"vybrať možnosť[ {option}]"},light:{turn_on:"zapnúť[ na {brightness} jas]"},media_player:{select_source:"vybrať zdroj[ {source}]"},notify:{send_message:"poslať notifikáciu"},script:{execute:"spustiť"},vacuum:{start_pause:"štart / pauza"},water_heater:{set_operation_mode:"nastaviť režim[ na {operation_mode}]",set_away_mode:"nastaviť režim neprítomnosti"}},Oi={components:{date:{day_types_short:{daily:"denne",workdays:"pracovné dni",weekend:"víkendy"},day_types_long:{daily:"každý deň",workdays:"cez pracovné dni",weekend:"cez víkend"},days:"dni",tomorrow:"zajtra",repeated_days:"každý {days}",repeated_days_except:"každý deň okrem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"budúcu {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od polnoci",at_noon:"od obeda",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončite úpravy",description:"Plán, ktorý sa zmenil, je momentálne zakázaný, chcete ho povoliť?"},confirm_delete:{title:"Odstrániť entitu?",description:"Naozaj chcete odstrániť túto entitu?"},confirm_migrate:{title:"Aktualizovať plán",description:"Touto akciou sa stratia niektoré nastavenia. Chcete pokračovať?"},weekday_picker:{title:"Dni opakovania pre plán",choose:"Vyberte..."},entity_picker:{title:"Vyberte entity",choose:"Vyberte...",no_results:"Žiadne vyhovujúce položky neboli nájdené"},action_picker:{title:"Vyberte akciu"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Žiadne položky na zobrazenie",backend_error:"Nepodarilo sa pripojiť ku komponentu Scheduler. Pred tým, ako použijete túto kartu ho musíte nainštalovať ako integráciu.",excluded_items:"Vylúčené položky: {number}",hide_excluded:"skryť vylúčené položky",additional_tasks:"Ďalšie úlohy: {number}"},editor:{repeated_days:"Dni opakovania",start_time:"Čas začiatku",stop_time:"Čas konca",action:"Akcia",add_action:"Pridať akciu",select_timeslot:"Najprv vyberte časový úsek",toggle_single_mode:"Do režimu jedného",toggle_scheme_mode:"Do režimu schémy",validation_errors:{overlapping_time:"Plán obsahuje prekrývajúce sa časové intervaly",missing_target_entity:"Pre aspoň jednu akciu nie je zadaná cieľová entita",missing_service_parameter:"Pre aspoň jednu akciu nie je zadané vyžadované nastavenie",missing_action:"Plán neobsahuje žiadne akcie"}},options:{conditions:{header:"Podmienky",add_condition:"Pridať podmienku",new_condition:"Nová podmienka",types:{equal_to:"{entity} sa rovná {value}",unequal_to:"{entity} sa nerovná {value}",above:"{entity} je nad {value}",below:"{entity} je pod {value}"},options:{logic_and:"Všetky podmienky musia platiť",logic_or:"Akákoľvek podmienka musí platiť",track_changes:"Prehodnoťte, keď sa zmenia podmienky"}},period:{header:"Obdobie",start_date:"Od",end_date:"Do"},repeat_type:"správanie sa po spustení",tags:"Štítky"},card_editor:{tabs:{entities:"Entity",other:"Iné"},fields:{title:{heading:"Názov karty",options:{standard:"štandardné",hidden:"skryté",custom:"vlastné"},custom_title:"Vlastný názov"},discover_existing:{heading:"Zobraziť všetky plány",description:"Tým sa nastaví parameter „objaviť existujúce“. Predtým vytvorené plány sa automaticky pridajú na kartu."},time_step:{heading:"Časový krok",description:"Rozlíšenie (v minútach) pre vytváranie plánov",unit_minutes:"min"},default_editor:{heading:"Predvolený editor času",options:{single:"Režim jedného plánu",scheme:"Režim schémy"}},sort_by:{heading:"Možnosti triedenia",description:"Poradie, v akom sa rozvrhy zobrazujú na karte",options:{relative_time:"Zostávajúci čas do ďalšej akcie",title:"Zobrazený názov rozvrhu",state:"Zobraziť aktívne plány navrchu"}},display_format_primary:{heading:"Zobrazené primárne informácie",description:"V prehľade nakonfigurujte, ktorý štítok sa použije pre plány",options:{default:"Názov rozvrhu",entity_action:"Zhrnutie úlohy"}},display_format_secondary:{heading:"Zobrazené sekundárne informácie",description:"Nakonfigurujte, ktoré ďalšie vlastnosti sú viditeľné v prehľade",options:{relative_time:"Zostávajúci čas do ďalšej akcie",time:"Nastavený čas pre ďalšiu akciu",days:"Opakované dni v týždni",additional_tasks:"Počet dodatočných úloh"}},show_header_toggle:{heading:"Zobraziť prepínač hlavičky",description:"Zobraziť prepínač v hornej časti karty na povolenie/zakázanie všetkých entít"},tags:{heading:"Štítky",description:"Použite štítky na rozdelenie plánov medzi viacero kariet"},entities:{button_label:"Konfigurácia zahrnutých entít",heading:"Zahrnuté entity",description:"Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",included_number:"{number}/{total} vybraný"}}}}},zi={services:ji,ui:Oi},Si={generic:{parameter_to_value:"{parameter} v {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"nastavi temperaturo[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrej[ na {temperature}]",set_temperature_hvac_mode_cool:"ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrej/ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrej/ohladi[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"samodejno[ na {temperature}]",set_hvac_mode:"nastavi način[ na {hvac_mode}]",set_preset_mode:"nastavi preset[ na {preset_mode}]",set_fan_mode:"nastavi ventilator[ na {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"zapri",open_cover:"odpri",set_cover_position:"nastavi pozicijo[ na {position}]",set_cover_tilt_position:"nastavi naklon[ na {tilt_position}]"},fan:{set_speed:"nastavi hitrost[ na {speed}]",set_direction:"nastavi smer[ na {direction}]",oscillate:"nastavi obračanje[ na {oscillate}]"},humidifier:{set_humidity:"nastavi vlažnost[ na {humidity}]",set_mode:"nastavi način[ na {mode}]"},input_number:{set_value:"nastavi vrednost[ na {value}]"},input_select:{select_option:"izberi možnost[ {option}]"},select:{select_option:"izberi možnost[ {option}]"},light:{turn_on:"vključi[ z {brightness} brightness]"},media_player:{select_source:"Izberi vir[ {source}]"},notify:{send_message:"pošlji sporočilo"},script:{execute:"izvedi"},vacuum:{start_pause:"zaženi / ustavi"},water_heater:{set_operation_mode:"nastavi način[ na {operation_mode}]",set_away_mode:"nastavi način odsoten"}},Ci={components:{date:{day_types_short:{daily:"dnevno",workdays:"delovniki",weekend:"vikend"},day_types_long:{daily:"vsak dan",workdays:"ob delovnikih",weekend:"ob vikendih"},days:"dni",tomorrow:"jutri",repeated_days:"vsakih {days}",repeated_days_except:"vsak dan razen {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"naslednji {weekday}"},time:{absolute:"ob {time}",interval:"od {startTime} do {endTime}",at_midnight:"opolnoči",at_noon:"opoldne",at_sun_event:"ob {sunEvent}"}},dialog:{enable_schedule:{title:"Zaključi spremembe",description:"Urnik, katerega ste spremenili je trenutno izključen, ali ga želite omogočiti?"},confirm_delete:{title:"Ali želite odstraniti entiteto?",description:"Ali ste prepričani, da želite odstraniti to entiteto?"},confirm_migrate:{title:"Spremenite urnik",description:"Nekatere nastavitve bodo s tem dejanjem izgubljene. Želite nadaljevati?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Urnik",new_schedule:"Nov urnik",default_name:"Urnik #{id}"},overview:{no_entries:"Ni vpisov za prikaz",backend_error:"Ni povezave s komponento urnika. Komponenta mora biti nameščena kot integracija, preden lahko uporabite to kartico.",excluded_items:"{number}{if number is 1} izločen predmet {else} izločenih predmetov",hide_excluded:"skrij izločene predmete",additional_tasks:"še {number}{if number is 1} opravilo {else} opravil"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Najprej izberi časovni okvir",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Ponovno preglej ko se pogoji spremenijo"}},period:{header:"Perioda",start_date:"From",end_date:"To"},repeat_type:"obnašanje, ko končaš",tags:"Tags"},card_editor:{tabs:{entities:"Entitete",other:"Ostalo"},fields:{title:{heading:"Ime kartice",options:{standard:"standardno",hidden:"skrito",custom:"po meri"},custom_title:"Ime po želji"},discover_existing:{heading:"Prikaži vse urnike",description:"Tole nastavi parameter 'discover existing'. Prej kreirani urniki bodo samodejno dodani v kartico. "},time_step:{heading:"Časovni korak",description:"Ločljivost (v minutah) za kreiranje urnikov",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"V enojni način",scheme:"V shematski način"}},sort_by:{heading:"Možnosti sortiranja",description:"Zaporedje, po katerem se prikažejo urniki na kartici",options:{relative_time:"Preostali čas do naslednje akcije",title:"Prikazano ime urnika",state:"Prikaži aktivne urnike na vrhu"}},display_format_primary:{heading:"Prikazane primarne informacije",description:"Nastavite, kaj se prikazuje v pregledu urnikov",options:{default:"Ime urnika",entity_action:"Povzetek operacije"}},display_format_secondary:{heading:"Prikazane sekundarne informacije",description:"Nastavite, katere dodatne informacije želite imeti prikazane v pregledu",options:{relative_time:"Preostali čas do naslednje akcije",time:"Nastavljen čas za naslednjo akcijo",days:"Katere dni/kdaj se sproži akcija",additional_tasks:"Število dodatnih opravil"}},show_header_toggle:{heading:"Prikaži glavo",description:"Na vrhu prikaže stikalo, s katerim lahko omogočite/izključite vse entitete naenkrat"},tags:{heading:"Tag-i",description:"Uporabite tag-e za ločevanje urnikov med več karticami"},entities:{button_label:"Konfiguriraj vključene entitete",heading:"Vključene entitete",description:"Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",included_number:"{number}/{total} izbranih"}}}}},Ai={services:Si,ui:Ci},Ei={generic:{parameter_to_value:"{parameter} till {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"ställ in temperaturen[ på {temperature}]",set_temperature_hvac_mode_heat:"värma[ till {temperature}]",set_temperature_hvac_mode_cool:"kyla[ till {temperature}]",set_temperature_hvac_mode_heat_cool:"värma/kyla[ till {temperature}]",set_temperature_hvac_mode_heat_cool_range:"värma/kyla[ till {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ till {temperature}]",set_hvac_mode:"ställ in läget[ till {hvac_mode}]",set_preset_mode:"ställ in förinställningen[ till {preset_mode}]",set_fan_mode:"ställ in fläktläge[ till {fan_mode}]",set_swing_mode:"ställ in svängningsläge[ till {swing_mode}]"},cover:{close_cover:"stäng",open_cover:"öppna",set_cover_position:"ställ in positionen[ till {position}]",set_cover_tilt_position:"ställ in lutningsposition[ till {tilt_position}]"},fan:{set_percentage:"ställ in hastighet[ till {percentage}]",set_direction:"ställ in riktning[ till {direction}]",oscillate:"ställ in oscillation[ till {oscillate}]"},humidifier:{set_humidity:"ställ in luftfuktighet[ till {humidity}]",set_mode:"ställ in läge[ till {mode}]"},input_number:{set_value:"ställ in den[ till {value}]"},input_select:{select_option:"välj alternativ[ {option}]"},select:{select_option:"välj alternativ[ {option}]"},light:{turn_on:"slå på[ med {brightness} brightness]"},media_player:{select_source:"välj källa[ {source}]"},notify:{send_message:"send notification"},script:{execute:"utföra"},vacuum:{start_pause:"starta / pausa"},water_heater:{set_operation_mode:"ställ in läget[ till {operation_mode}]",set_away_mode:"ställ in borta läget"}},Ti={components:{date:{day_types_short:{daily:"daglig",workdays:"arbetsdagar",weekend:"helgen"},day_types_long:{daily:"varje dag",workdays:"på arbetsdagar",weekend:"i helgen"},days:"dagar",tomorrow:"imorgon",repeated_days:"varje {days}",repeated_days_except:"varje dag utom {excludedDays}",days_range:"från {startDay} till {endDay}",next_week_day:"nästa {weekday}"},time:{absolute:"kl. {time}",interval:"från {startTime} till {endTime}",at_midnight:"vid midnatt",at_noon:"vid middagstid",at_sun_event:"vid {sunEvent}"}},dialog:{enable_schedule:{title:"Slutför modifieringar",description:"Schemat du har ändrat är för närvarande inaktiverat, vill du aktivera den?"},confirm_delete:{title:"Ta bort enheten?",description:"Är du säker på att du vill ta bort den här enheten?"},confirm_migrate:{title:"Uppdatera schema",description:"Vissa inställningar kommer att gå förlorade genom den här ändringen. Vill du fortsätta?"},weekday_picker:{title:"Upprepade dagar för schema",choose:"Välj..."},entity_picker:{title:"Välj enheter",choose:"Välj...",no_results:"Inga matchande objekt hittades"},action_picker:{title:"Välj åtgärd"}},panel:{common:{title:"Schemaläggare",new_schedule:"Ny schema",default_name:"Schema #{id}"},overview:{no_entries:"Det finns inga objekt att visa",backend_error:"Kunde inte ansluta till schemaläggarkomponenten. Den måste installeras som integration innan det här kortet kan användas.",excluded_items:"{number} utesluten {if number is 1} artikel {else} artiklar",hide_excluded:"dölj uteslutna objekt",additional_tasks:"{number} mer {if number is 1} uppgift {else} uppgifter"},editor:{repeated_days:"Upprepade dagar",start_time:"Starttid",stop_time:"Sluttid",action:"Åtgärd",add_action:"Lägg till åtgärd",select_timeslot:"Välj en tidslucka",toggle_single_mode:"Till enkelläge",toggle_scheme_mode:"Till schemaläge",validation_errors:{overlapping_time:"Schemat har överlappande tidsluckor",missing_target_entity:"En eller flera åtgärder saknar en målentitet",missing_service_parameter:"En eller flera åtgärder saknar en obligatorisk inställning",missing_action:"Schemat har inga åtgärder"}},options:{conditions:{header:"Villkor",add_condition:"Lägg till villkor",new_condition:"Nytt villkor",types:{equal_to:"{entity} är lika med {value}",unequal_to:"{entity} är ojämlik med {value}",above:"{entity} är över {value}",below:"{entity} är under {value}"},options:{logic_and:"Alla villkor måste vara sanna",logic_or:"Något av villkoren måste vara sant",track_changes:"Omvärdera när förutsättningarna förändras"}},period:{header:"Period",start_date:"Från",end_date:"Till"},repeat_type:"beteende efter avslutad",tags:"Taggar"},card_editor:{tabs:{entities:"Enheter",other:"Andra"},fields:{title:{heading:"Kortets titel",options:{standard:"standard",hidden:"dold",custom:"anpassad"},custom_title:"Anpassad titel"},discover_existing:{heading:"Visa alla scheman",description:"Detta ställer in parametern ''upptäck befintliga''. Tidigare skapade scheman läggs automatiskt till på kortet."},time_step:{heading:"Tidssteg",description:"Upplösning (i minuter) för att skapa scheman",unit_minutes:"min"},default_editor:{heading:"Standard tidsredigerare",options:{single:"Enkelt schemalagt läge",scheme:"Tidschemaläge"}},sort_by:{heading:"Sorteringsalternativ",description:"Ordning i vilken scheman visas på kortet",options:{relative_time:"Tid kvar till nästa åtgärd",title:"Visad titel på schemat",state:"Visa aktiva scheman överst"}},display_format_primary:{heading:"Visad primär information",description:"Konfigurera vilken etikett som används för scheman i översikten",options:{default:"Schemanamn",entity_action:"Sammanfattning av uppgiften"}},display_format_secondary:{heading:"Visad sekundär information",description:"Konfigurera vilka ytterligare egenskaper som ska synas i översikten",options:{relative_time:"Tid kvar till nästa åtgärd",time:"Konfigurerad tid för nästa åtgärd",days:"Upprepade dagar i veckan",additional_tasks:"Antal ytterligare uppgifter"}},show_header_toggle:{heading:"Visa rubrikväxling",description:"Visa växlingsknappen högst upp på kortet för att aktivera/inaktivera alla enheter"},tags:{heading:"Taggar",description:"Använd taggar för att dela upp scheman mellan flera kort"},entities:{button_label:"Konfigurera inkluderade entiteter",heading:"Inkluderade enheter",description:"Välj de enheter som du vill styra med hjälp av schemaläggaren. Du kan klicka på en grupp för att öppna den. Observera att vissa enheter (t.ex. sensorer) bara kan användas för villkor, inte för åtgärder.",included_number:"{number}/{total} vald"}}}}},Di={services:Ei,ui:Ti},Mi={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"нагрів/охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"нагрів/охолодження[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвтоматичний[ to {temperature}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]",set_mode:"встановити режим[ to {mode}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},notify:{send_message:"send notification"},script:{execute:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"встановити режим[ to {operation_mode}]",set_away_mode:"встановити режим Не вдома"}},Li={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}",next_week_day:"наступної {weekday}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},dialog:{enable_schedule:{title:"Завершіть зміни",description:"Розклад, який було змінено, наразі вимкнено, чи потрібно його ввімкнути?"},confirm_delete:{title:"Видалити сутність?",description:"Ви дійсно бажаєте видалити цю сутність?"},confirm_migrate:{title:"Змінити розклад",description:"У результаті цієї дії деякі налаштування буде втрачено. Ви бажаєте продовжити?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планувальник",new_schedule:"Новий розклад",default_name:"Розклад #{id}"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Спершу виберіть часовий проміжок",toggle_single_mode:"До одиночного режиму",toggle_scheme_mode:"До схемного режиму",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"період",start_date:"From",end_date:"To"},repeat_type:"поведінка після спрацювання",tags:"Tags"}}},Pi={services:Mi,ui:Li},Ni={generic:{parameter_to_value:"{parameter} کو {value} پر سیٹ کریں",action_with_parameter:"{parameter} کے ساتھ {action}"},climate:{set_temperature:"درجہ حرارت سیٹ کریں[ {temperature} پر]",set_temperature_hvac_mode_heat:"ہیٹ[ {temperature} پر]",set_temperature_hvac_mode_cool:"کول[ {temperature} پر]",set_temperature_hvac_mode_heat_cool:"ہیٹ/کول[ {temperature} پر]",set_temperature_hvac_mode_heat_cool_range:"ہیٹ/کول[ {target_temp_low} سے {target_temp_high} تک]",set_temperature_hvac_mode_auto:"آٹو[ {temperature} پر]",set_hvac_mode:"موڈ سیٹ کریں[ {hvac_mode} پر]",set_preset_mode:"پری سیٹ موڈ سیٹ کریں[ {preset_mode} پر]",set_fan_mode:"فین موڈ سیٹ کریں[ {fan_mode} پر]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"بند کریں",open_cover:"کھولیں",set_cover_position:"پوزیشن سیٹ کریں[ {position} پر]",set_cover_tilt_position:"جھکاؤ پوزیشن سیٹ کریں[ {tilt_position} پر]"},fan:{set_percentage:"رفتار سیٹ کریں[ {percentage} پر]",set_direction:"سمت سیٹ کریں[ {direction} پر]",oscillate:"آسیلیشن سیٹ کریں[ {oscillate} پر]"},humidifier:{set_humidity:"نمی سیٹ کریں[ {humidity} پر]",set_mode:"موڈ سیٹ کریں[ {mode} پر]"},input_number:{set_value:"ویلیو سیٹ کریں[ {value} پر]"},input_select:{select_option:"آپشن منتخب کریں[ {option}]"},select:{select_option:"آپشن منتخب کریں[ {option}]"},light:{turn_on:"آن کریں[ {brightness} چمک کے ساتھ]"},media_player:{select_source:"سورس منتخب کریں[ {source}]"},notify:{send_message:"نوٹیفکیشن بھیجیں"},script:{execute:"چلائیں"},vacuum:{start_pause:"شروع / روکیں"},water_heater:{set_operation_mode:"موڈ سیٹ کریں[ {operation_mode} پر]",set_away_mode:"غیر موجودگی کا موڈ سیٹ کریں"}},Ii={components:{date:{day_types_short:{daily:"روزانہ",workdays:"کام کے دن",weekend:"ہفتہ اختتام"},day_types_long:{daily:"ہر دن",workdays:"کام کے دنوں میں",weekend:"ہفتے کے آخر میں"},days:"دن",tomorrow:"کل",repeated_days:"ہر {days}",repeated_days_except:"ہر دن سوائے {excludedDays}",days_range:"{startDay} سے {endDay} تک",next_week_day:"اگلا {weekday}"},time:{absolute:"{time} پر",interval:"{startTime} سے {endTime} تک",at_midnight:"آدھی رات کو",at_noon:"دوپہر کو",at_sun_event:"{sunEvent} کے وقت"}},dialog:{enable_schedule:{title:"ترمیم مکمل کریں",description:"جو شیڈول آپ نے بدلا ہے وہ اس وقت غیر فعال ہے، کیا آپ اسے فعال کرنا چاہتے ہیں؟"},confirm_delete:{title:"اینٹیٹی حذف کریں؟",description:"کیا آپ واقعی اس اینٹیٹی کو حذف کرنا چاہتے ہیں؟"},confirm_migrate:{title:"شیڈول اپ ڈیٹ کریں",description:"اس تبدیلی سے کچھ سیٹنگز ضائع ہو سکتی ہیں۔ کیا آپ جاری رکھنا چاہتے ہیں؟"},weekday_picker:{title:"شیڈول کے لیے دہرائے گئے دن",choose:"منتخب کریں..."},entity_picker:{title:"اینٹیٹیز منتخب کریں",choose:"منتخب کریں...",no_results:"کوئی مماثل آئٹمز نہیں ملے"},action_picker:{title:"عمل منتخب کریں"}},panel:{common:{title:"شیڈولر",new_schedule:"نیا شیڈول",default_name:"شیڈول #{id}"},overview:{no_entries:"دکھانے کے لیے کوئی آئٹمز نہیں ہیں",backend_error:"شیڈولر کمپوننٹ سے کنکشن نہیں ہو سکا۔ اسے کارڈ استعمال کرنے سے پہلے انٹیگریشن کے طور پر انسٹال کرنا ضروری ہے۔",excluded_items:"{number} خارج شدہ {if number is 1} آئٹم {else} آئٹمز",hide_excluded:"خارج شدہ آئٹمز چھپائیں",additional_tasks:"{number} مزید {if number is 1} کام {else} کام"},editor:{repeated_days:"دہرائے گئے دن",start_time:"آغاز کا وقت",stop_time:"اختتامی وقت",action:"عمل",add_action:"عمل شامل کریں",select_timeslot:"ٹائم سلاٹ منتخب کریں",toggle_single_mode:"سنگل موڈ پر جائیں",toggle_scheme_mode:"اسکیم موڈ پر جائیں",validation_errors:{overlapping_time:"شیڈول میں وقتوں کا اوورلیپ ہے",missing_target_entity:"ایک یا زیادہ اعمال میں ہدف اینٹیٹی غائب ہے",missing_service_parameter:"ایک یا زیادہ اعمال میں مطلوبہ سیٹنگ غائب ہے",missing_action:"شیڈول میں کوئی عمل موجود نہیں"}},options:{conditions:{header:"شرائط",add_condition:"شرط شامل کریں",new_condition:"نئی شرط",types:{equal_to:"{entity} {value} کے برابر ہے",unequal_to:"{entity} {value} کے برابر نہیں ہے",above:"{entity} {value} سے زیادہ ہے",below:"{entity} {value} سے کم ہے"},options:{logic_and:"تمام شرائط درست ہونی چاہئیں",logic_or:"کوئی ایک شرط درست ہونی چاہیے",track_changes:"جب شرائط بدلیں تو دوبارہ جانچ کریں"}},period:{header:"مدت",start_date:"سے",end_date:"تک"},repeat_type:"مکمل ہونے کے بعد کا برتاؤ",tags:"ٹیگز"},card_editor:{tabs:{entities:"اینٹیٹیز",other:"دیگر"},fields:{title:{heading:"کارڈ کا عنوان",options:{standard:"معیاری",hidden:"چھپا ہوا",custom:"حسبِ ضرورت"},custom_title:"اپنا عنوان"},discover_existing:{heading:"تمام شیڈولز دکھائیں",description:"یہ 'discover existing' پیرامیٹر سیٹ کرتا ہے۔ پہلے سے بنائے گئے شیڈولز خود بخود کارڈ میں شامل ہو جائیں گے۔"},time_step:{heading:"وقت کا وقفہ",description:"شیڈول بنانے کے لیے وقت کی ریزولوشن (منٹ میں)",unit_minutes:"منٹ"},default_editor:{heading:"ڈیفالٹ ٹائم ایڈیٹر",options:{single:"سنگل شیڈول موڈ",scheme:"ٹائم اسکیم موڈ"}},sort_by:{heading:"ترتیب کے اختیارات",description:"کارڈ میں شیڈولز کی ترتیب",options:{relative_time:"اگلے عمل تک باقی وقت",title:"شیڈول کا دکھایا گیا عنوان",state:"فعال شیڈولز اوپر دکھائیں"}},display_format_primary:{heading:"مرکزی معلومات کی نمائش",description:"اوورویو میں شیڈولز کے لیے لیبل کنفیگر کریں",options:{default:"شیڈول کا نام",entity_action:"کام کا خلاصہ"}},display_format_secondary:{heading:"ثانوی معلومات کی نمائش",description:"اوورویو میں اضافی خصوصیات دکھانے کا انتخاب کریں",options:{relative_time:"اگلے عمل تک باقی وقت",time:"اگلے عمل کا وقت",days:"ہفتے کے دہرائے گئے دن",additional_tasks:"اضافی کاموں کی تعداد"}},show_header_toggle:{heading:"ہیڈر ٹوگل دکھائیں",description:"کارڈ کے اوپر تمام اینٹیٹیز کو فعال/غیر فعال کرنے کے لیے سوئچ دکھائیں"},tags:{heading:"ٹیگز",description:"شیڈولز کو مختلف کارڈز میں تقسیم کرنے کے لیے ٹیگز استعمال کریں"},entities:{button_label:"شامل اینٹیٹیز ترتیب دیں",heading:"شامل اینٹیٹیز",description:"وہ اینٹیٹیز منتخب کریں جنہیں آپ شیڈولر کے ذریعے کنٹرول کرنا چاہتے ہیں۔ آپ گروپ پر کلک کر کے اسے کھول سکتے ہیں۔ یاد رکھیں کہ کچھ اینٹیٹیز (جیسے سینسرز) صرف شرائط کے لیے استعمال ہو سکتی ہیں، اعمال کے لیے نہیں۔",included_number:"{number}/{total} منتخب شدہ"}}}}},qi={services:Ni,ui:Ii},Vi={generic:{parameter_to_value:"{parameter} 至 {value}",action_with_parameter:"{action} 使用 {parameter}"},climate:{set_temperature:"设定温度[ 至 {temperature}]",set_temperature_hvac_mode_heat:"制热模式[ 至 {temperature}]",set_temperature_hvac_mode_cool:"制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool:"制热模式/制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool_range:"制热模式/制冷模式[ 至 {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"自动[ 至 {temperature}]",set_hvac_mode:"设定模式[ 为 {hvac_mode}]",set_preset_mode:"设定预设模式[ 为 {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]",set_swing_mode:"set swing mode[ to {swing_mode}]"},cover:{close_cover:"关闭",open_cover:"打开",set_cover_position:"设定位置[ 至 {position}]",set_cover_tilt_position:"设定倾斜位置[ 至 {tilt_position}]"},fan:{set_speed:"设定风速[ 至 {speed}]",set_direction:"设定方向[ 至 {direction}]",oscillate:"设置摇摆[ 至 {oscillate}]"},humidifier:{set_humidity:"设定湿度[ 至 {humidity}]",set_mode:"设定模式[ 为 {mode}]"},input_number:{set_value:"设定数值[ 至 {value}]"},input_select:{select_option:"选择选项[ {option}]"},select:{select_option:"选择选项[ {option}]"},light:{turn_on:"打开[ 并设定亮度为 {brightness}]"},media_player:{select_source:"选择播放源[ {source}]"},notify:{send_message:"发送通知"},script:{execute:"执行"},vacuum:{start_pause:"开始 / 暂停"},water_heater:{set_operation_mode:"设定模式[ 为 {operation_mode}]",set_away_mode:"设定离开模式"}},Ri={components:{date:{day_types_short:{daily:"每日",workdays:"工作日",weekend:"周末"},day_types_long:{daily:"每一天",workdays:"在工作日",weekend:"在周末"},days:"天",tomorrow:"明天",repeated_days:"每 {days}",repeated_days_except:"每天，除了 {excludedDays}",days_range:"从 {startDay} 至 {endDay}",next_week_day:"下{weekday}"},time:{absolute:"在 {time}",interval:"从 {startTime} 至 {endTime}",at_midnight:"在午夜",at_noon:"在正午",at_sun_event:"在 {sunEvent}"}},dialog:{enable_schedule:{title:"完成修改",description:"已更改的计划当前已禁用，是否应该启用？"},confirm_delete:{title:"是否删除实体？",description:"您确定要删除此实体吗？"},confirm_migrate:{title:"修改时间表",description:"此操作将丢失某些设置。 你想继续吗？"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"计划任务",new_schedule:"新时间表",default_name:"日程 #{id}"},overview:{no_entries:"无事项",backend_error:"计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",excluded_items:"{number} 除外 {if number is 1} 事项 {else} 事项",hide_excluded:"隐藏除外事项",additional_tasks:"{number} 更多 {if number is 1} 任务 {else} 任务"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"请选择时间段",toggle_single_mode:"转为单一模式",toggle_scheme_mode:"转为方案模式",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"时期",start_date:"From",end_date:"To"},repeat_type:"触发后的行为",tags:"Tags"}}},Hi={services:Vi,ui:Ri};const Fi={bg:it,cs:nt,de:ct,el:pt,en:yt,es:wt,et:Ot,es_419:wt,fi:At,fr:Mt,he:It,hu:Ht,it:Wt,lv:Jt,nb:ai,nl:ei,nn:ai,no:ai,pl:di,pt:hi,"pt-BR":gi,ro:bi,sk:Object.freeze({__proto__:null,services:ji,ui:Oi,default:zi}),sl:Object.freeze({__proto__:null,services:Si,ui:Ci,default:Ai}),sv:Object.freeze({__proto__:null,services:Ei,ui:Ti,default:Di}),ru:$i,uk:Object.freeze({__proto__:null,services:Mi,ui:Li,default:Pi}),ur:Object.freeze({__proto__:null,services:Ni,ui:Ii,default:qi}),"zh-Hans":Object.freeze({__proto__:null,services:Vi,ui:Ri,default:Hi})};function Ui(e,t,i=[],s=[]){let a;try{a=e.split(".").reduce((e,t)=>e[t],Fi[t.locale.language]),a||(a=e.split(".").reduce((e,t)=>e[t],Fi.en))}catch(t){try{a=e.split(".").reduce((e,t)=>e[t],Fi.en)}catch(e){a=""}}if(i=[i||[]].flat(),s=[s||[]].flat(),i.length&&s.length&&a)for(let e=0;e<i.length;e++){a=a.replace(String(i[e]),String(s[e]));const t=a.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){a=String(s[e])==t[2]?a.replace(t[0],t[3]):a.replace(t[0],t[4])}}const o=/\[([^\]]+)\]/.exec(a);if(o){a=/\{([^\}]+)\}/.exec(o[1])?a.replace(o[0],""):a.replace(o[0],o[1])}return a||console.log("missing translation for "+e),a}const Bi=e=>e.split(".")[1]||"",Wi=e=>e.split(".")[0]||"",Zi=(e,t)=>{var i;return void 0===(null==t?void 0:t.friendly_name)?Bi(e).replace(/_/g," "):(null!==(i=null==t?void 0:t.friendly_name)&&void 0!==i?i:"").toString()};function Ki(e,t){let i=!1;if(!t)return!1;if(e.match(/^[a-z0-9_\.]+$/))i=!e.includes(".")&&t.includes(".")?e==Wi(t):e==t;else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}const Gi=(e,t)=>e.includes(".")?((t.include||Re).some(t=>Ki(t,e))||Object.keys(t.customize||{}).some(t=>Ki(t,e)))&&!(t.exclude||[]).some(t=>Ki(t,e)):((t.include||Re).map(Wi).some(t=>Ki(t,e))||Object.keys(t.customize||{}).map(Wi).some(t=>Ki(t,e)))&&!(t.exclude||[]).some(t=>Ki(t,e)),Ji=(e,t)=>{var i,s;let a=[],o=!0;if(e.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var t;let i=(null===(t=e.target)||void 0===t?void 0:t.entity_id)?[e.target.entity_id].flat():[e.service];a=[...a,...i]})})}),![...new Set(a)].every(e=>Gi(e,t)))return!1;const n=[t.tags||[]].flat();n.length&&(o=!1,((e.tags||[]).some(e=>n.includes(e))||n.includes("none")&&!(null===(i=e.tags)||void 0===i?void 0:i.length)||n.includes("enabled")&&e.enabled||n.includes("disabled")&&!e.enabled)&&(o=!0));const r=[t.exclude_tags||[]].flat();return r.length&&o&&((e.tags||[]).some(e=>r.includes(e))||r.includes("none")&&!(null===(s=e.tags)||void 0===s?void 0:s.length)||r.includes("enabled")&&e.enabled||r.includes("disabled")&&!e.enabled)&&(o=!1),o},Yi=(e,t)=>((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()),Qi=e=>{let t=e.trim();return t.charAt(0).toUpperCase()+t.slice(1)},Xi=(e,t,i=!0)=>{let s=t.localize(e);return s||!i?s:`{${e.split(".").pop()}}`},es=(e,t)=>{let i=e.mode==be.Sunrise?Xi("ui.panel.config.automation.editor.conditions.type.sun.sunrise",t):Xi("ui.panel.config.automation.editor.conditions.type.sun.sunset",t);"de"!=t.language&&(i=i.toLowerCase());const s=3600*e.hours+60*e.minutes;if(Math.abs(s)<=60)return Ui("ui.components.time.at_sun_event",t,"{sunEvent}",i);let a=Xi(s<0?"ui.panel.config.automation.editor.conditions.type.sun.before":"ui.panel.config.automation.editor.conditions.type.sun.after",t);return a=a.replace(/[^a-z]/gi,"").toLowerCase(),`${Ne(e,{seconds:!1}).split(/\+|\-/).pop()} ${a} ${i}`},ts={alarm_control_panel:{alarm_disarm:{target:{}},alarm_arm_home:{supported_features:1,target:{}},alarm_arm_away:{supported_features:2,target:{}},alarm_arm_night:{supported_features:4,target:{}},alarm_arm_custom_bypass:{supported_features:16,target:{}},alarm_arm_vacation:{supported_features:32,target:{}}},automation:{turn_on:{target:{}},turn_off:{target:{}},trigger:{target:{}}},button:{press:{target:{}}},climate:{turn_off:{target:{},supported_features:128},turn_on:{target:{},supported_features:256},set_hvac_mode:{translation_key:"services.climate.set_hvac_mode",target:{},fields:{hvac_mode:{}}},set_temperature:{translation_key:["services.climate.set_temperature","services.climate.set_temperature_hvac_mode_heat","services.climate.set_temperature_hvac_mode_cool","services.climate.set_temperature_hvac_mode_heat_cool"],target:{},fields:{temperature:{supported_features:1},target_temp_high:{supported_features:2},target_temp_low:{supported_features:2},hvac_mode:{optional:!0}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",supported_features:16,target:{},fields:{preset_mode:{}}},set_fan_mode:{translation_key:"services.climate.set_fan_mode",supported_features:8,target:{},fields:{fan_mode:{}}},set_swing_mode:{translation_key:"services.climate.set_swing_mode",supported_features:32,target:{},fields:{swing_mode:{}}}},cover:{close_cover:{supported_features:2,target:{}},open_cover:{supported_features:1,target:{}},set_cover_position:{translation_key:"services.cover.set_cover_position",supported_features:4,target:{},fields:{position:{}}},set_cover_tilt_position:{translation_key:"services.cover.set_cover_tilt_position",supported_features:128,target:{},fields:{tilt_position:{}}}},fan:{turn_on:{target:{}},turn_off:{target:{}},set_percentage:{translation_key:"services.fan.set_percentage",supported_features:1,target:{},fields:{percentage:{}}},oscillate:{translation_key:"services.fan.oscillate",supported_features:2,target:{},fields:{oscillating:{}}},set_direction:{translation_key:"services.fan.set_direction",supported_features:4,target:{},fields:{direction:{}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",supported_features:8,target:{},fields:{preset_mode:{}}}},humidifier:{turn_on:{target:{}},turn_off:{target:{}},set_humidity:{translation_key:"services.humidifier.set_humidity",target:{},fields:{humidity:{}}},set_mode:{translation_key:"services.humidifier.set_mode",supported_features:1,target:{},fields:{mode:{}}}},input_boolean:{turn_on:{target:{}},turn_off:{target:{}}},input_button:{press:{target:{}}},input_number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},input_select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},lawn_mower:{start_mowing:{target:{},supported_features:1},pause:{target:{},supported_features:2},dock:{target:{},supported_features:4}},light:{turn_on:{translation_key:"services.light.turn_on",target:{},fields:{brightness:{optional:!0}}},turn_off:{target:{}}},lock:{lock:{target:{}},unlock:{target:{}}},media_player:{turn_on:{target:{}},turn_off:{target:{}},select_source:{translation_key:"services.media_player.select_source",supported_features:2048,target:{},fields:{source:{}}}},notify:{"{entity_id}":{translation_key:"services.notify.send_message",fields:{title:{optional:!0},message:{}}}},number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},scene:{turn_on:{target:{}}},script:{"{entity_id}":{translation_key:"services.script.execute"}},select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},switch:{turn_on:{target:{}},turn_off:{target:{}}},vacuum:{turn_on:{supported_features:1,target:{}},start:{supported_features:8192,target:{}},play_pause:{target:{}}},valve:{open_valve:{supported_features:1,target:{}},close_valve:{supported_features:2,target:{}},set_valve_position:{translation_key:"services.cover.set_cover_position",supported_features:4,target:{},fields:{position:{}}}},water_heater:{set_temperature:{translation_key:"services.climate.set_temperature",supported_features:1,target:{},fields:{temperature:{}}},set_operation_mode:{translation_key:"services.water_heater.set_operation_mode",supported_features:2,target:{},fields:{operation_mode:{}}},set_away_mode:{translation_key:"services.water_heater.set_away_mode",supported_features:4,target:{},fields:{away_mode:{}}},turn_off:{target:{},supported_features:8},turn_on:{target:{},supported_features:8}}},is=e=>{if("object"!=typeof e)return null;if(!Object.keys(e).length||!Object.keys(e).every(e=>"string"==typeof e))return null;let t={value:"",label:""};return Object.keys(e).includes("name")?t=Object.assign(Object.assign({},t),{label:String(e.name)}):Object.keys(e).includes("label")?t=Object.assign(Object.assign({},t),{label:String(e.label)}):Object.keys(e).includes("value")&&(t=Object.assign(Object.assign({},t),{label:String(e.value)})),Object.keys(e).includes("value")?t=Object.assign(Object.assign({},t),{value:String(e.value)}):Object.keys(e).includes("name")?t=Object.assign(Object.assign({},t),{value:String(e.name)}):Object.keys(e).includes("label")&&(t=Object.assign(Object.assign({},t),{value:String(e.label)})),Object.keys(e).includes("icon")&&Be(e.icon)&&(t=Object.assign(Object.assign({},t),{icon:String(e.icon)})),t.value.length&&t.label.length?t:null},ss=e=>{let t={select:{options:Array.isArray(e.options)?e.options.every(e=>"string"==typeof e)?e.options:e.options.map(is).filter(Be):[]}};return e.translation_key&&(t=Object.assign(Object.assign({},t),{select:Object.assign(Object.assign({},t.select),{translation_key:e.translation_key})})),t},as=(e,t)=>{if(e.hasOwnProperty("service")&&e.service!==t.service)return!1;const i=e.service_data||{},s=t.service_data||{},a=e.hasOwnProperty("variables")?e.variables||{}:e.hasOwnProperty("fields")&&e.fields||{};let o=[...new Set([...Object.keys(i),...Object.keys(s),...Object.keys(a)])];return o=o.filter(e=>"entity_id"!=e),!!o.every(e=>{var t;if(Object.keys(i).includes(e)&&Object.keys(s).includes(e))return he(i[e],s[e]);if(Object.keys(a).includes(e)){let i=a[e],o=s[e];if(Object.keys(i).includes("options")){let e=ss({options:i.options});return!Be(o)||(null===(t=e.select)||void 0===t?void 0:t.options.find(e=>"string"==typeof e?e==o:e.value==o))}return!Object.keys(i).includes("min")||!Object.keys(i).includes("max")||(!(Be(o)||!Object.keys(i).includes("optional")||!i.optional)||"number"==typeof o)}return!1})},os=(e,t)=>{let i=[];return Object.keys(e).filter(t=>{var i;return null===(i=e[t].actions)||void 0===i?void 0:i.length}).filter(i=>!t||!t.includes(".")&&Ki(Wi(i),t)||Ki(i,t)||"script"==Wi(t)&&e[i].actions.find(e=>e.service==t)).forEach(s=>{Object.values(e[s].actions).forEach(e=>{if(e.service.includes(".")||(e=Object.assign(Object.assign({},e),{service:`${Wi(s)}.${e.service}`})),s.includes(".")&&"script"!=Wi(s)&&(e=Object.assign(Object.assign({},e),{target:{entity_id:s}})),"script"!=Wi(s)&&"script"==Wi(t||"")){if(e.service!=t&&(null==t?void 0:t.includes(".")))return;e=Object.assign(Object.assign({},e),{target:Object.assign(Object.assign({},e.target),{domain:s})})}i.push({service:e.service,service_data:e.service_data||{},target:e.target?e.target:void 0,name:e.name||"",icon:e.icon||"",variables:e.variables})})}),i},ns=(e,t)=>{var i;const s=Wi(e.service),a=Bi(e.service);let o,n={};if(Object.keys(ts).includes(s)&&(Object.keys(ts[s]).includes(a)?n=Object.assign(Object.assign({},n),ts[s][a]):Object.keys(ts[s]).includes("{entity_id}")&&(n=Object.assign(Object.assign({},n),ts[s]["{entity_id}"]))),!t)return n;o=["script","notify"].includes(s)?e.service:null===(i=e.target)||void 0===i?void 0:i.entity_id,o||(o=s);const r=os(t,[o].flat().pop());if(r.length){let t=r.map(t=>{if(!as(t,e))return null;let i={};return Object.keys(t.variables||{}).forEach(e=>{i=Object.assign(Object.assign({},i),{fields:Object.assign(Object.assign({},i.fields||{}),{[e]:{}})})}),Object.assign(Object.assign({},i),{name:t.name||n.name,icon:t.icon||n.icon,target:t.target||n.target})}).filter(Be);if(t.length&&!as(n,e))return t[0]}return n},rs=e=>{const t=Math.pow(10,5);return e=Math.round(e*t)/t},ds=(e,t,i)=>{if(!t)return e;if(Object.keys(t).includes("select")&&t.select){const s=t.select;let a=s.options.map(e=>"string"==typeof e?Object({value:e,label:e}):e),o=null==a?void 0:a.find(t=>t.value==e);s.translation_key?e=Xi(s.translation_key.replace("${value}",e),i,!1)||o?null==o?void 0:o.label:e:o&&(e=o.label)}if(Object.keys(t).includes("number")&&t.number){const i=t.number;if(e=Number(e),"number"==typeof(null==i?void 0:i.scale_factor)&&(e/=i.scale_factor),"number"==typeof(null==i?void 0:i.step)&&(e=Math.round(e/i.step)*i.step),e=rs(e),null==i?void 0:i.unit)return`${e}${i.unit}`}return Object.keys(t).includes("boolean")&&t.boolean&&(e=Boolean(e)?"True":"False"),e},ls=e=>{let t={number:{}};return Object.keys(e).includes("min")&&!isNaN(Number(e.min))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{min:Number(e.min)})})),Object.keys(e).includes("max")&&!isNaN(Number(e.max))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{max:Number(e.max)})})),Object.keys(e).includes("step")&&!isNaN(Number(e.step))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{step:Number(e.step)})})),Object.keys(e).includes("mode")&&["box","slider"].includes(e.mode)&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{mode:e.mode})})),Object.keys(e).includes("unit")&&e.unit&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{unit:e.unit})})),Object.keys(e).includes("optional")&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{optional:Boolean(e.optional)})})),Object.keys(e).includes("scale_factor")&&!isNaN(Number(e.scale_factor))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{scale_factor:Number(e.scale_factor)})})),t},cs={alarm_control_panel:{services:{alarm_arm_away:"mdi:shield-lock",alarm_arm_home:"mdi:shield-home",alarm_arm_night:"mdi:shield-moon",alarm_custom_bypass:"mdi:security",alarm_disarm:"mdi:shield-off",alarm_trigger:"mdi:bell-ring",alarm_arm_vacation:"mdi:shield-airplane"}},automation:{services:{turn_on:"mdi:robot",turn_off:"mdi:robot-off",trigger:"mdi:play"}},button:{services:{press:"mdi:gesture-tap-button"}},climate:{services:{set_temperature:"mdi:thermometer",set_hvac_mode:"mdi:cog-transfer-outline",set_preset_mode:"mdi:cloud-download-outline",set_fan_mode:"mdi:fan",set_humidity:"mdi:water-percent",set_swing_mode:"mdi:arrow-oscillating"},attributes:{hvac_mode:{auto:"mdi:autorenew",cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",heat:"mdi:fire",heat_cool:"mdi:thermometer",off:"mdi:power"},preset_mode:{activity:"mdi:motion-sensor",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",sleep:"mdi:bed"},fan_mode:{diffuse:"mdi:weather-windy",focus:"mdi:target",high:"mdi:speedometer",low:"mdi:speedometer-slow",medium:"mdi:speedometer-medium",middle:"mdi:speedometer-medium",off:"mdi:fan-off",on:"mdi:fan"},swing_mode:{both:"mdi:arrow-all",horizontal:"mdi:arrow-left-right",off:"mdi:arrow-oscillating-off",on:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down"}}},cover:{services:{close_cover:"mdi:arrow-down-box",close_cover_tilt:"mdi:arrow-bottom-left",open_cover:"mdi:arrow-up-box",open_cover_tilt:"mdi:arrow-top-right",set_cover_position:"mdi:arrow-down-box",set_cover_tilt_position:"mdi:arrow-top-right"}},fan:{services:{oscillate:"mdi:arrow-oscillating",set_percentage:"mdi:fan",set_preset_mode:"mdi:fan-auto",turn_off:"mdi:fan-off",turn_on:"mdi:fan"}},humidifier:{services:{set_humidity:"mdi:water-percent",set_mode:"mdi:air-humidifier",turn_off:"mdi:air-humidifier-off",turn_on:"mdi:air-humidifier"},attributes:{mode:{auto:"mdi:refresh-auto",away:"mdi:account-arrow-right",baby:"mdi:baby-carriage",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",normal:"mdi:water-percent",sleep:"mdi:power-sleep"}}},input_boolean:{services:{turn_off:"mdi:toggle-switch-off",turn_on:"mdi:toggle-switch"}},input_button:{services:{press:"mdi:gesture-tap-button"}},input_number:{services:{set_value:"mdi:counter"}},input_select:{services:{select_option:"mdi:counter"}},lawn_mower:{services:{dock:"mdi:home-import-outline",start_mowing:"mdi:play",pause:"mdi:pause"}},light:{services:{turn_off:"mdi:lightbulb-off",turn_on:"mdi:lightbulb-on"}},lock:{services:{lock:"mdi:lock",unlock:"mdi:lock-open"}},media_player:{services:{media_play:"mdi:play",media_stop:"mdi:stop",play_media:"mdi:play",select_source:"mdi:import",turn_off:"mdi:power",turn_on:"mdi:power"}},notify:{services:{"{entity_id}":"mdi:message-alert"}},scene:{services:{turn_on:"mdi:play"}},script:{services:{turn_on:"mdi:flash",turn_off:"mdi:flash-off","{entity_id}":"mdi:play"}},select:{services:{select_option:"mdi:counter"}},switch:{services:{turn_off:"mdi:toggle-switch-variant-off",turn_on:"mdi:toggle-switch-variant"}},vacuum:{services:{send_command:"mdi:send",start:"mdi:play",turn_off:"mdi:stop",turn_on:"mdi:play"}},valve:{services:{open_valve:"mdi:valve-open",close_valve:"mdi:valve-closed",set_valve_position:"mdi:valve"}},water_heater:{services:{set_away_mode:"mdi:account-arrow-right",set_operation_mode:"mdi:water-boiler",set_temperature:"mdi:thermometer",turn_off:"mdi:water-boiler-off",turn_on:"mdi:water-boiler"},attributes:{operation_mode:{eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire-circle",heat_pump:"mdi:heat-wave",high_demand:"mdi:finance",off:"mdi:power",performance:"mdi:rocket-launch"}}}},us=(e,t,i,s,a)=>{const o=Wi(e),n=["script","notify"].includes(o)?[e]:[t||[]].flat();let r=n.map(e=>hs(e,i,s)),d=_s(r),l=n.map(t=>ms(e,t,i,a));return _s(l)||d},hs=(e,t,i)=>{const s=Object.keys(i.states).includes(e)?i.states[e]:null,a=(null==s?void 0:s.attributes)||{},o=Wi(e),n=`${o}.${t}`,r=e=>{var i,s;const a=null===(s=null===(i=cs[o])||void 0===i?void 0:i.attributes)||void 0===s?void 0:s[t],n=!!a&&(e||[]).every(e=>e in a);return(e||[]).map(e=>({value:e,label:e,icon:n?a[e]:void 0}))};switch(n){case"climate.temperature":case"climate.target_temp_low":case"climate.target_temp_high":{const e="climate.temperature"==n?(2&(a.supported_features||0))>0:(1&(a.supported_features||0))>0,t=i.config.unit_system.temperature.includes("F")?1:.5;return ls({min:a.min_temp,max:a.max_temp,step:a.target_temp_step||t,unit:""+i.config.unit_system.temperature,optional:e})}case"climate.hvac_mode":return ss({options:r(a.hvac_modes),translation_key:"component.climate.entity_component._.state.${value}"});case"climate.preset_mode":return ss({options:r(a.preset_modes),translation_key:"state_attributes.climate.preset_mode.${value}"});case"climate.fan_mode":return ss({options:r(a.fan_modes)});case"climate.swing_mode":return ss({options:r(a.swing_modes)});case"cover.position":case"cover.tilt_position":case"fan.percentage":case"valve.position":return ls({min:0,max:100,step:1,unit:"%"});case"fan.oscillating":return{boolean:{}};case"fan.direction":return ss({options:r(["forward","reverse"]),translation_key:"ui.card.fan.${value}"});case"fan.preset_mode":return ss({options:r(a.preset_modes)});case"humidifier.humidity":return ls({min:a.min_humidity,max:a.max_humidity,step:1,unit:"%"});case"humidifier.mode":return ss({options:r(a.available_modes),translation_key:"component.humidifier.entity_component._.state_attributes.mode.state.${value}"});case"input_number.value":case"number.value":return ls({min:a.min,max:a.max,step:a.step,mode:a.mode,unit:a.unit_of_measurement});case"input_select.option":case"select.option":return ss({options:r(a.options)});case"light.brightness":return ls({min:0,max:100,step:1,unit:"%",scale_factor:2.55});case"media_player.source":case"notify.title":case"notify.message":return{text:{}};case"water_heater.temperature":{const e=i.config.unit_system.temperature.includes("F")?1:.5;return ls({min:a.min_temp,max:a.max_temp,step:a.target_temp_step||e,unit:""+i.config.unit_system.temperature})}case"water_heater.operation_mode":return ss({options:r(a.operation_list)});case"water_heater.away_mode":return{boolean:{}}}return null},ms=(e,t,i,s)=>{const a=os(s||{},t);if(a.length){let t=a.map(t=>{if(t.service!=e||!Object.keys(t.variables||{}).includes(i))return null;let s=(t.variables||{})[i];return ps(s)}).filter(e=>void 0!==e);return _s(t)}return null},ps=e=>Object.keys(e).includes("options")?ss({options:e.options}):Object.keys(e).includes("min")&&Object.keys(e).includes("max")?ls(e):{text:{}},_s=e=>{const t=e=>1==new Set(e).size;if(e.some(e=>null===e)||!e.length)return null;if(e.every(e=>e.hasOwnProperty("select"))){const i=e.map(e=>e.select.options).filter(e=>void 0!==e);let s=[];if(i.every(e=>e.every(e=>"string"==typeof e)))s=i.length?i.reduce((e,t)=>e.filter(e=>t.includes(e))):[];else{let e=i.map(e=>e.map(e=>is("object"==typeof e?e:{value:e})).filter(Be));s=e.length?e.reduce((e,t)=>e.filter(e=>t.find(t=>t.value===e.value))):[]}const a=e.map(e=>e.select.translation_key).filter(e=>void 0!==e);return{select:{options:s.length?s:[],translation_key:a.length&&t(a)?a[0]:void 0}}}if(e.every(e=>e.hasOwnProperty("number"))){const i=e.map(e=>e.number.min).filter(e=>void 0!==e),s=e.map(e=>e.number.max).filter(e=>void 0!==e),a=e.map(e=>e.number.step).filter(e=>void 0!==e),o=e.map(e=>e.number.mode).filter(e=>void 0!==e),n=e.map(e=>e.number.unit).filter(e=>void 0!==e),r=e.map(e=>e.number.optional),d=e.map(e=>e.number.scale_factor).filter(e=>void 0!==e);return{number:{min:i.length?Math.max(...i):void 0,max:s.length?Math.min(...s):void 0,step:a.length?Math.max(...a):void 0,mode:o.length&&t(o)?o[0]:void 0,unit:n.length&&t(n)?n[0]:void 0,optional:r.every(e=>e),scale_factor:d.length&&t(d)?d[0]:void 0}}}return e.every(e=>e.hasOwnProperty("boolean"))?{boolean:{}}:e.every(e=>e.hasOwnProperty("text"))?{text:{}}:null},gs=/\[([^\]]+)\]/,vs=/\{([^\}]+)\}/,ys=(e,t)=>{const i=Bi(t.service);return-1!=e.indexOf(i)&&(e=e.substring(e.indexOf(i)+i.length+1)),Object.keys(t.service_data).reduce((i,s)=>{if(-1==e.indexOf(s))return i;let a=e.substring(e.indexOf(s)+s.length+1);return a==t.service_data[s]?i+e.length+a.length+1:i},0)},fs=(e,t,i,s=!1,a=!1)=>{const o=ns(e,i);let n,r=o.name||"",d=Object.fromEntries(Object.entries(e.service_data).filter(([e,t])=>Be(t)).map(([s,a])=>{var o;const n=us(e.service,null===(o=e.target)||void 0===o?void 0:o.entity_id,s,t,i);return n?[s,ds(a,n,t)]:[s,null]}).filter(([e,t])=>Be(t)));if(s){if(Object.keys(d).length>1){const e=(e,t)=>{const i=!!o.fields&&o.fields[e]||{},s=!!o.fields&&o.fields[t]||{};return(null==i?void 0:i.optional)&&!s.optional?1:(null==s?void 0:s.optional)&&!i.optional||e<t?-1:e>t?1:0};return d=Object.fromEntries(Object.entries(d).sort(([t],[i])=>e(t,i))),Object.values(d).join(", ")}if(Object.keys(d).length)return Object.values(d)[0]}if((null==o?void 0:o.translation_key)&&!r){let i="";if(Array.isArray(o.translation_key)){let t=o.translation_key;t.sort((t,i)=>{let s=ys(t,e),a=ys(i,e);return s!=a?a-s:t.length-i.length}),i=t[0]}else i=o.translation_key;r=Ui(i,t,Object.keys(d).map(e=>`{${e}}`),Object.values(d))}else{const i=Wi(e.service),s=Bi(e.service);r||(r=Xi(`component.${i}.services.${s}.name`,t,!1)),!r&&Object.keys(t.services[i]||{}).includes(s)&&(r=t.services[i][s].name||""),r||(r=s.replace(/_/g," "))}let l,c=0;for(;(n=gs.exec(r))&&c<100;){c++;let t=n[1].match(vs);r=t&&Object.keys(e.service_data||{}).includes(t[1])&&Object.keys(d).includes(t[1])?r.replace(n[0],n[1].replace(t[0],d[t[1]])):r.replace(n[0],"")}for(c=0;(l=vs.exec(r))&&c<100;)c++,r=Object.keys(d).includes(l[1])?r.replace(l[0],d[l[1]]):r.replace(l[0],"");if(a&&null!==/<.+?>/g.exec(r)){r=(new DOMParser).parseFromString(r,"text/html").body.textContent||""}return r},bs=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},ks=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],ws=(e,t,i)=>{let s;if(e instanceof Date){e.getDay();if(s=pe.Friday,bs())return e.toLocaleDateString(i.locale.language,{weekday:t});e.getDay();s=pe.Friday}else s=e;switch(s){case pe.Daily:return Ui(`ui.components.date.day_types_${t}.daily`,i);case pe.Workday:return Ui(`ui.components.date.day_types_${t}.workdays`,i);case pe.Weekend:return Ui(`ui.components.date.day_types_${t}.weekend`,i);case pe.Monday:case pe.Tuesday:case pe.Wednesday:case pe.Thursday:case pe.Friday:case pe.Saturday:case pe.Sunday:let e=new Date(2017,1,26),a=ks.findIndex(e=>e==s);return bs()?(e.setDate(e.getDate()+a),e.toLocaleDateString(i.locale.language,{weekday:t})):ks[a];default:return""}},xs=e=>{let t=e.locale.first_weekday;if(t&&"language"!=t)return $s.map(e=>e.toLowerCase()).findIndex(e=>e==t);if("weekInfo"in Intl.Locale.prototype)return new Intl.Locale(e.locale.language).weekInfo.firstDay%7;{const t="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),i="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),s=["ar","arq","arz","fa"],a="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g),o=e.locale.language.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return o[1]?i.includes(o[4])?0:t.includes(o[4])?6:1:a.includes(o[1])?0:s.includes(o[1])?6:1}},$s=[pe.Sunday,pe.Monday,pe.Tuesday,pe.Wednesday,pe.Thursday,pe.Friday,pe.Saturday],js=(e,t,i)=>{const s=xs(i);let a=((e,t)=>e.concat(e).slice(t,t+e.length))($s,s);e.sort((e,t)=>a.findIndex(t=>t==e)-a.findIndex(e=>e==t));const o=e.filter(e=>a.includes(e)).map(e=>a.findIndex(t=>t==e)),n=(e=>{const t=[];for(let i=0;i<e.length-1;i++){let s=i+1;for(;e[s]-e[s-1]==1;)s++;t.push(s-i)}return t})(o),r=Math.max(...n);if(o.length){if(6==o.length){const e=[0,1,2,3,4,5,6].filter(e=>!o.includes(e)),s=ws(a[e.pop()],t,i);return Ui("ui.components.date.repeated_days_except",i,"{excludedDays}",s)}const e=o.map(e=>ws(a[e],t,i));if(o.length>=3&&r>=3){const t=n.reduce((e,t,i)=>t==r?i:e,0);e.splice(t,r,Ui("ui.components.date.days_range",i,["{startDay}","{endDay}"],[e[t],e[t+r-1]]))}const s=e.length>1?`${e.slice(0,-1).join(", ")} ${Xi("ui.common.and",i)} ${e.pop()}`:""+e.pop();return o.length>=3&&r>=3?s:Ui("ui.components.date.repeated_days",i,"{days}",s)}return e.map(e=>ws(e,t,i)).join(", ")},Os=(e,t,i)=>{const s=Object.entries(i||{}).filter(([t,i])=>Ki(t,e)&&i.name).map(([e,t])=>t.name);return s.filter(Be).length?s.filter(Be)[0]:Object.keys(t.states).includes(e)&&t.states[e].attributes.friendly_name?t.states[e].attributes.friendly_name:Bi(e).replace(/_/g," ")},zs=(e,t,i,s)=>{const a=t=>{var o,n;switch(t){case ve.Action:const r=e.entries[0].slots[e.next_entries[0]||0].actions[0];return Qi(fs(r,i,s));case ve.Days:return Qi(js(e.entries[0].weekdays,"long",i));case ve.Name:return Qi(e.name||"");case ve.AdditionalTasks:return e.entries[0].slots.length>1?"+"+Ui("ui.panel.overview.additional_tasks",i,"{number}",String(e.entries[0].slots.length-1)):"";case ve.Entity:const d=e.entries[0].slots[e.next_entries[0]||0].actions[0];let l=[(null===(o=d.target)||void 0===o?void 0:o.entity_id)||[]].flat();!l.length&&["script","notify"].includes(Wi(d.service))&&(l=[d.service]);const c=l.map(e=>Os(e,i,s)).join(", ");return Qi(c);case ve.RelativeTime:return"<relative-time></relative-time>";case ve.Tags:return null===(n=e.tags)||void 0===n?void 0:n.map(e=>`<tag>${e}</tag>`).join("");case ve.Time:const u=e.entries[0].slots[e.next_entries[0]||0];return Qi(((e,t,i)=>{const s=De(i.locale);if(t){const a=Ce(e),o=Ce(t),n=a.mode==be.Fixed?Ne(a,{am_pm:s}):es(a,i),r=o.mode==be.Fixed?Ne(o,{am_pm:s}):es(o,i);return Qi(Ui("ui.components.time.interval",i,["{startTime}","{endTime}"],[n,r]))}{const t=Ce(e),a=t.mode==be.Fixed?Ne(t,{am_pm:s}):es(t,i);return Qi(Ui("ui.components.time.absolute",i,"{time}",a))}})(u.start,u.stop,i));case ve.Default:const h=a(ve.Name);return h||`${a(ve.Entity)}: ${a(ve.Action)}`;default:const m=/\{([^\}]+)\}/;let p;for(;p=m.exec(t);)t=t.replace(p[0],String(a(String(p[1]))));return t}};return[...[t].flat()].map(e=>{let t=a(e);return t||""})},Ss=(e,t)=>{const i=new Date(e.timestamps[e.next_entries[0]]).valueOf(),s=new Date(t.timestamps[t.next_entries[0]]).valueOf(),a=(new Date).valueOf(),o=i<a&&s<a;return null!==i&&null!==s?i<a&&s>=a?1:i>=a&&s<a?-1:i>s?o?-1:1:i<s?o?1:-1:e.entity_id<t.entity_id?1:-1:null!==s?1:null!==i?-1:e.entity_id<t.entity_id?1:-1},Cs=(e,t,i)=>{const s=[t.sort_by].flat();return s.includes("relative-time")&&(e=e.sort(Ss)),s.includes("title")&&(e=e.sort((e,s)=>{var a;return((e,t,i,s,a)=>{try{const o=zs(e,i,s,a).join(),n=zs(t,i,s,a).join();return Yi(o,n)}catch(e){return 0}})(e,s,(null===(a=t.display_options)||void 0===a?void 0:a.primary_info)||"default",i,t.customize)})),s.includes("state")&&(e=e.sort((e,t)=>((e,t,i,s)=>{var a,o;const n=null===(a=i.states[e.entity_id])||void 0===a?void 0:a.state,r=null===(o=i.states[t.entity_id])||void 0===o?void 0:o.state,d=["on","triggered"].includes(n),l=["on","triggered"].includes(r);if(d&&!l)return-1;if(!d&&l)return 1;if(s){if("off"!=n&&"off"==r)return 1;if("off"==n&&"off"!=r)return-1}return 0})(e,t,i,s.includes("relative-time")))),e},As=(e,t)=>e.callWS({type:"scheduler/item",schedule_id:t}).then(e=>$e(e)),Es=(e,t,i,s)=>{s=s||{},i=null==i?{}:i;const a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a},Ts=async e=>{let t={};const i=Object.keys(e.states).filter(e=>"script"==Wi(e));return i.length&&await e.callWS({type:"config/entity_registry/get_entries",entity_ids:i}).then(e=>{t=Object.fromEntries(Object.entries(e).map(([,e])=>(e=>{let t={};const i=`${e.platform}.${e.unique_id}`;return e.name&&(t=Object.assign(Object.assign({},t),{name:e.name})),e.icon&&(t=Object.assign(Object.assign({},t),{icon:e.icon})),[i,t]})(e)).filter(([,e])=>Object.keys(e).length))}),t},Ds=e=>e.callWS({type:"scheduler/tags"});var Ms="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",Ls="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",Ps="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Ns="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",Is="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",qs="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z";const Vs={alarm_control_panel:"mdi:alarm-light-outline",air_quality:"mdi:air-filter",alert:"mdi:alert",automation:"mdi:robot",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",camera:"mdi:camera",calendar:"mdi:calendar",cover:"mdi:window-shutter",climate:"mdi:thermostat",configurator:"mdi:cog",conversation:"mdi:microphone-message",counter:"mdi:counter",date:"mdi:calendar",datetime:"mdi:calendar-clock",demo:"mdi:home-assistant",device_tracker:"mdi:account",fan:"mdi:fan",google_assistant:"mdi:google-assistant",group:"mdi:google-circles-communities",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",humidifier:"mdi:air-humidifier",image_processing:"mdi:image-filter-frames",image:"mdi:image",input_boolean:"mdi:toggle-switch",input_button:"mdi:button-pointer",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",lawn_mower:"mdi:robot-mower",light:"mdi:lightbulb",lock:"mdi:lock-open-outline",media_player:"mdi:cast-connected",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",number:"mdi:ray-vertex",persistent_notification:"mdi-bell",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:palette",schedule:"mdi:calendar-clock",script:"mdi:script-text",select:"mdi:format-list-bulleted",sensor:"mdi:eye",simple_alarm:"mdi:bell",siren:"mdi:bullhorn",stt:"mdi:microphone-message",sun:"mdi:white-balance-sunny",switch:"mdi:flash",text:"mdi:form-textbox",time:"mdi:clock",timer:"mdi:timer-outline",todo:"mdi:clipboard-list",tts:"mdi:speaker-message",vacuum:"mdi:robot-vacuum",valve:"mdi:valve-closed",wake_word:"mdi:chat-sleep",water_heater:"mdi:water-boiler",weather:"mdi:weather-partly-cloudy",zone:"mdi:map-marker-radius"},Rs=e=>Object.keys(Vs).includes(e)?Vs[e]:"mdi:help",Hs=(e,t)=>{let i=Object.keys(e.services).filter(e=>((e,t)=>{let i=Object.keys(ts).includes(e);return!i&&t?Object.keys(t).map(Wi).includes(e):i})(e,t.customize));return i=i.filter(e=>Gi(e,t)),i.map(t=>({key:t,name:Xi(`component.${t}.title`,e,!1)||t.replace(/_/g," "),description:"",icon:Rs(t)}))},Fs=1,Us=2,Bs=e=>(...t)=>({_$litDirective$:e,values:t});class Ws{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const Zs=Bs(class extends Ws{constructor(e){var t;if(super(e),e.type!==Fs||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const s=e[i];return null==s?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach(e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const s=t[e];if(null!=s){this.ht.add(e);const t="string"==typeof s&&s.endsWith(" !important");e.includes("-")||t?i.setProperty(e,t?s.slice(0,-11):s,t?"important":""):i[e]=s}}return V}}),Ks={alarm_control_panel:{disarmed:"mdi:lock-open-variant-outline",armed_away:"mdi:exit-run",armed_home:"mdi:home-outline",armed_night:"mdi:power-sleep",armed_custom_bypass:"mdi:security",armed_vacation:"mdi:shield-airplane",triggered:"mdi:alarm-light-outline"},binary_sensor:{battery:{on:"mdi:battery-outline",off:"mdi:battery"},battery_charging:{on:"mdi:battery-charging",off:"mdi:battery"},cold:{on:"mdi:snowflake",off:"mdi:thermometer"},connectivity:{on:"mdi:server-network",off:"mdi:server-network-off"},door:{on:"mdi:door-open",off:"mdi:door-closed"},garage_door:{on:"mdi:garage-open",off:"mdi:garage"},power:{on:"mdi:power-plug",off:"mdi:power-plug-off"},gas:{on:"mdi:alert-circle",off:"mdi:check-circle"},problem:{on:"mdi:alert-circle",off:"mdi:check-circle"},safety:{on:"mdi:alert-circle",off:"mdi:check-circle"},tamper:{on:"mdi:alert-circle",off:"mdi:check-circle"},smoke:{on:"mdi:smoke",off:"mdi:check-circle"},heat:{on:"mdi:fire",off:"mdi:thermometer"},light:{on:"mdi:brightness-7",off:"mdi:brightness-5"},lock:{on:"mdi:lock-open",off:"mdi:lock"},moisture:{on:"mdi:water",off:"mdi:water-off"},motion:{on:"mdi:run",off:"mdi:walk"},occupancy:{on:"mdi:home",off:"mdi:home-outline"},opening:{on:"mdi:square-outline",off:"mdi:square"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:home",off:"mdi:home-outline"},running:{on:"mdi:play",off:"mdi:stop"},sound:{on:"mdi:music-note",off:"mdi:music-note-off"},update:{on:"mdi:package-up",off:"mdi:package"},vibration:{on:"mdi:vibrate",off:"mdi:crop-portrait"},window:{on:"mdi:window-open",off:"mdi:window-closed"},_:{on:"mdi:checkbox-marked-circle",off:"mdi:radiobox-blank"}},calendar:{on:"mdi:flash",off:"mdi:flash-off"},cover:{garage:{closed:"mdi:garage",open:"mdi:garage-open"},door:{closed:"mdi:door-closed",open:"mdi:door-open"},blind:{closed:"mdi:blinds",open:"mdi:blinds-open"},window:{closed:"mdi:window-closed",open:"mdi:window-open"},_:{closed:"mdi:window-shutter",open:"mdi:window-shutter-open"}},climate:{off:"mdi:power-off",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:thermometer",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"},device_tracker:{home:"mdi:home-outline",not_home:"mdi:exit-run"},fan:{on:"mdi:power",off:"mdi:power-off"},humidifier:{on:"mdi:power",off:"mdi:power-off"},input_boolean:{on:"mdi:flash",off:"mdi:flash-off"},light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off"},lawn_mower:{mowing:"mdi:play",paused:"mdi:pause",docked:"mdi:home-import-outline"},lock:{unlocked:"mdi:lock-open-variant-outline",locked:"mdi:lock-outline"},person:{home:"mdi:home-outline",not_home:"mdi:exit-run"},sun:{below_horizon:"mdi:weather-sunny-off",above_horizon:"mdi:weather-sunny"},switch:{on:"mdi:flash",off:"mdi:flash-off"},timer:{active:"mdi:play",paused:"mdi:pause",idle:"mdi:sleep"},valve:{open:"mdi:valve-open",closed:"mdi:valve-closed"},water_heater:{off:"mdi:power-off",eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:hvac",high_demand:"mdi:water-plus-outline",performance:"mdi:rocket-launch-outline"}},Gs=(e,t,i)=>{const s=Wi(e);if(!Object.keys(Ks).includes(s))return;let a=Ks[s];if("object"==typeof Object.values(a)[0]){const t=i.states[e],s=null==t?void 0:t.attributes.device_class;a=s&&Object.keys(a).includes(s)?a[s]:a._}return Object.keys(a).includes(t)?a[t]:void 0},Js=["alarm_control_panel","binary_sensor","climate","calendar","cover","device_tracker","fan","humidifier","input_boolean","input_number","input_select","lawn_mower","light","lock","number","person","proximity","select","sensor","sun","switch","timer","valve","water_heater"],Ys=(e,t,i)=>{let s=((e,t)=>{const i=Object.keys(t.states).includes(e)?t.states[e]:void 0,s=Wi(e),a=(null==i?void 0:i.attributes)||{},o=i=>null==i?void 0:i.map(i=>Object({value:i,icon:Gs(e,i,t)}));switch(s){case"alarm_control_panel":let e=["disarmed","triggered"];return 2&(a.supported_features||0)&&(e=[...e,"armed_away"]),1&(a.supported_features||0)&&(e=[...e,"armed_home"]),4&(a.supported_features||0)&&(e=[...e,"armed_night"]),16&(a.supported_features||0)&&(e=[...e,"armed_custom_bypass"]),32&(a.supported_features||0)&&(e=[...e,"armed_vacation"]),ss({options:o(e),translation_key:"component.alarm_control_panel.entity_component._.state.${value}"});case"binary_sensor":return ss({options:o(["on","off"]),translation_key:"component.binary_sensor.entity_component.${deviceClass}.state.${value}"});case"climate":return ss({options:o(a.hvac_modes),translation_key:"component.climate.entity_component._.state.${value}"});case"calendar":case"fan":case"humidifier":case"input_boolean":case"light":case"switch":return ss({options:o(["on","off"]),translation_key:"component.switch.entity_component._.state.${value}"});case"cover":return ss({options:o(["open","closed"]),translation_key:"component.cover.entity_component._.state.${value}"});case"device_tracker":return ss({options:o(["home","not_home"]),translation_key:"component.device_tracker.entity_component._.state.${value}"});case"input_number":case"number":return ls({min:a.min,max:a.max,step:a.step,mode:a.mode,unit:a.unit_of_measurement});case"input_select":case"select":return ss({options:a.options});case"lawn_mower":return ss({options:o(["mowing","paused","docked"]),translation_key:"component.lawn_mower.entity_component._.state.${value}"});case"lock":return ss({options:o(["locked","unlocked"]),translation_key:"component.lock.entity_component._.state.${value}"});case"person":const s=Object.keys(t.states).filter(e=>"zone"==Wi(e)).map(Bi);return ss({options:[...new Set(["home","not_home",...s])]});case"proximity":return ls({mode:"box",unit:a.unit_of_measurement});case"sensor":return!isNaN(Number(null==i?void 0:i.state))||Be(a.unit_of_measurement)?ls({mode:"box",unit:a.unit_of_measurement,min:"%"==a.unit_of_measurement?0:void 0,max:"%"==a.unit_of_measurement?100:void 0}):{text:{}};case"sun":return ss({options:o(["above_horizon","below_horizon"]),translation_key:"component.sun.entity_component._.state.${value}"});case"timer":return ss({options:o(["active","paused","idle"]),translation_key:"component.timer.entity_component._.state.${value}"});case"valve":return ss({options:o(["open","closed"]),translation_key:"component.valve.entity_component._.state.${value}"});case"water_heater":case"climate":return ss({options:o(a.operation_list),translation_key:"component.climate.entity_component._.state.${value}"});default:return{text:{}}}})(e,t),a=Object.keys(i||{}).filter(t=>Ki(t,Wi(e))||Ki(t,e)).filter(e=>Object.keys(i[e]).includes("states")).sort((e,t)=>e.length-t.length).map(e=>i[e].states).shift();return a&&(Array.isArray(a)?s=ss({options:a}):"object"==typeof a&&"min"in a&&"max"in a&&(s=ls(a))),s},Qs=(e,t)=>{let i=Object.keys(e.states).map(e=>Wi(e)).reduce((e,t)=>e.includes(t)?e:[...e,t],[]).filter(e=>((e,t)=>{let i=Js.includes(e);return!i&&t?Object.keys(t).map(Wi).includes(e):i})(e,t.customize||{}));return i=i.filter(e=>Gi(e,t)),i.map(t=>({key:t,name:Xi(`component.${t}.title`,e,!1)||t.replace(/_/g," "),description:"",icon:Rs(t)}))},Xs=(e,t,i)=>{let s=Object.entries(t||{}).filter(([t,i])=>Ki(t,e)&&i.icon).map(([e,t])=>t);if(s.length)return s.map(e=>{return(t=e.icon).match(/^[a-z]+\:[a-zA-Z\-]+$/)?t:"mdi:"+t;var t}).shift();if(!Object.keys(i.states).includes(e))return"mdi:help";const a=i.states[e];if(a.attributes.icon)return a.attributes.icon;const o=Wi(e);return Rs(o)},ea=(e,t,i)=>{if(["script","notify"].includes(e)){let s=Object.keys(i.services[e]);"script"==e&&(s=s.filter(e=>!["turn_on","turn_off","reload","toggle","test"].includes(e)));let a=s.map(s=>({key:`${e}.${s}`,name:Os(`${e}.${s}`,i,t),description:"",icon:Xs(`${e}.${s}`,t,i)}));return a.sort((e,t)=>Yi(e.name,t.name)),a}{let s=Object.keys(i.states).filter(t=>Wi(t)==e).map(e=>{var s;return{key:e,name:Zi(e,null===(s=i.states[e])||void 0===s?void 0:s.attributes),description:"",icon:Xs(e,t,i)}});return s.sort((e,t)=>Yi(e.name,t.name)),s}},ta=(e,t)=>t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t));let ia=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0,this.expandedGroups=[],this.scheduleEntities=[]}async showDialog(e){this._params=e,this.loadOptions(),await this.updateComplete}async closeDialog(){this._params&&this._params.confirm({domains:this._params.domains,entities:this._params.entities}),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}loadOptions(){if(!this._params)return;let e=(e=>{let t=Hs(e,{include:["*"]}),i=Qs(e,{include:["*"]});return i=i.filter(e=>!t.map(e=>e.key).includes(e.key)),t=[...t,...i],t.sort((e,t)=>Yi(e.name,t.name)),t})(this.hass);this.options=e.map(e=>Object.assign(Object.assign({},e),{entities:ea(e.key,this._params.cardConfig.customize,this.hass)})).filter(e=>e.entities.length)}shouldUpdate(e){return!!(e.has("_params")||e.has("expandedGroups")||e.has("_filter")||e.has("scheduleEntities"))}async firstUpdated(){this.scheduleEntities=Object.entries(await Oe(this.hass)).map(([,e])=>e.entity_id)}render(){return this._params?q`
      <ha-dialog
        open
        .heading=${!0}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Ps}
            ></ha-icon-button>
            <span slot="title">
              ${Ui("ui.dialog.entity_picker.title",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${Xi("ui.common.search",this.hass)}
            aria-label=${Xi("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${Xi("ui.common.clear",this.hass)}
                  .path=${Ps}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${Zs({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_clearSearch(){this._search="",this._filter=""}_toggleSelectEntity(e){let t=e.target;for(;"MWC-LIST-ITEM"!=t.tagName;)t=t.parentElement;t.querySelector("ha-checkbox");const i=t.getAttribute("key");this._params.entities.includes(i)?this._params=Object.assign(Object.assign({},this._params),{entities:this._params.entities.filter(e=>e!=i)}):this._params=Object.assign(Object.assign({},this._params),{entities:[...this._params.entities,i]})}_toggleSelectDomain(e,t){var i;let s=e.target;for(;"MWC-LIST-ITEM"!=s.tagName;)s=s.parentElement;const a=s.getAttribute("key"),o=null===(i=this.options)||void 0===i?void 0:i.find(e=>e.key==a).entities.map(e=>e.key);this._params=t?Object.assign(Object.assign({},this._params),{domains:this._params.domains.filter(e=>e!=a),entities:this._params.entities.filter(e=>!(null==o?void 0:o.includes(e)))}):Object.assign(Object.assign({},this._params),{domains:[...this._params.domains,a]}),e.stopPropagation()}closeGroupByKey(e){this.shadowRoot.querySelector("mwc-list").childNodes.forEach(t=>{if(t.nodeType==Node.ELEMENT_NODE&&"MWC-LIST-ITEM"==t.tagName&&t.getAttribute("key")==e){const e=t,i=e.nextElementSibling,s=e.querySelector("ha-icon-button");i.style.height="0px",e.removeAttribute("expanded"),s.classList.remove("expanded")}})}async _toggleExpandGroup(e){let t=e.target;for(;"MWC-LIST-ITEM"!=t.tagName;)t=t.parentElement;const i=t.querySelector("ha-icon-button"),s=t.getAttribute("key");this.expandedGroups.includes(s)||(this.expandedGroups.forEach(e=>this.closeGroupByKey(e)),this.expandedGroups=[s],await this.requestUpdate());const a=t.nextElementSibling,o=a.scrollHeight;t.hasAttribute("expanded")?(t.removeAttribute("expanded"),i.classList.remove("expanded"),a.style.height="0px",setTimeout(()=>{this.expandedGroups=this.expandedGroups.filter(e=>e!=s)},300)):(t.setAttribute("expanded","true"),i.classList.add("expanded"),a.style.height=o+"px")}_renderOptions(){if(!this.options)return;let e=[...this.options];const t=this._filter&&this._filter.trim().length;if(t){const t=this._filter.toLowerCase().trim().split(" ");e=e.map(e=>ta(e,t)||(e=Object.assign(Object.assign({},e),{entities:(e.entities||[]).filter(e=>ta(e,t))})).entities.length?e:void 0).filter(e=>void 0!==e)}return e.length?Object.keys(e).map(i=>{var s,a;const o=e[i].key,n=null===(s=this._params)||void 0===s?void 0:s.domains.includes(o);let r=[...e[i].entities];"switch"==o&&(r=r.filter(e=>!this.scheduleEntities.includes(e.key)));const d=n?r.length:r.filter(e=>{var t;return null===(t=this._params)||void 0===t?void 0:t.entities.includes(e.key)}).length,l=(null===(a=this._params)||void 0===a?void 0:a.domains.includes(o))||e[i].entities.every(e=>{var t;return null===(t=this._params)||void 0===t?void 0:t.entities.includes(e.key)});return q`
        <mwc-list-item
          graphic="icon"
          twoline
          hasMeta
          @click=${this._toggleExpandGroup}
          key="${o}"
        >
          <ha-icon slot="graphic" icon="${e[i].icon}"></ha-icon>
          <div slot="meta" class="meta">
            <ha-button
              appearance="plain"
              @click=${e=>this._toggleSelectDomain(e,l)}
              size="small"
            >
              ${Xi(l?"ui.components.media-browser.file_management.deselect_all":"ui.components.subpage-data-table.select_all",this.hass)}
            </ha-button>
            <ha-icon-button .path="${Ms}" @click=${e=>{e.target.blur()}} class="chevron"></ha-icon-button>
          </div>
          <span>${e[i].name}</span>
          <span slot="secondary">${Ui("ui.panel.card_editor.fields.entities.included_number",this.hass,["{number}","{total}"],[d,r.length])}</span>
        </mwc-list-item>
        ${this.expandedGroups.includes(o)||t?q`
        <div class="group ${t?"open":""}">
          <li role="divider"></li>
        ${r.map(e=>{var t,i;return q`
          <mwc-list-item
            graphic="icon"
            twoline
            hasMeta
            @click=${this._toggleSelectEntity}
            class="nested"
            key="${e.key}"
          >
            ${Object.keys(this.hass.states).includes(e.key)?q`<ha-state-icon .stateObj=${this.hass.states[e.key]} .hass=${this.hass} slot="graphic"></ha-state-icon>`:q`<ha-icon slot="graphic" icon="${e.icon}"></ha-icon>`}
            <ha-checkbox
              slot="meta"
              ?checked=${(null===(t=this._params)||void 0===t?void 0:t.entities.includes(e.key))||(null===(i=this._params)||void 0===i?void 0:i.domains.includes(o))}
            ></ha-checkbox>

            <span>${e.name}</span>
            <span slot="secondary">${e.key}</span>
          </mwc-list-item>
        `})}
          <li role="divider"></li>
        </div>
      `:""}
      `}):q`
        <mwc-list-item disabled>
          ${Xi("ui.components.entity.entity-picker.no_match",this.hass)}
        </mwc-list-item>
      `}static get styles(){return r`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 550px) {
        ha-dialog {
          --mdc-dialog-min-width: 500px;
        }
      }
      ha-textfield {
        display: block;
        margin: 0 16px;
      }
      mwc-list-item {
        --mdc-ripple-hover-opacity: 0.04;
        --mdc-ripple-focus-opacity: 0.04;
        --mdc-ripple-press-opacity: 0.12;
        --mdc-list-item-meta-size: 180px;
      }
      mwc-list-item.nested {
        --mdc-list-item-meta-size: 48px;
        --mdc-list-side-padding: 32px;
      }
      mwc-list-item.nested ha-icon {
        display: flex;
        justify-content: flex-end;
      }
      mwc-list-item ha-checkbox, mwc-list-item ha-icon-button, mwc-list-item ha-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div.group {
        height: 0px;
        overflow: hidden;
        transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
      }
      div.group.open {
        height: auto;
      }
      mwc-list-item .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      mwc-list-item .chevron.expanded {
        transform: rotate(180deg);
      }
      div.group li {
        width: 100%;
        height: 1px;
        display: block;
        background: var(--divider-color);
        margin: 0px 10px;
      }
      div.meta {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `}};t([le({attribute:!1})],ia.prototype,"hass",void 0),t([ce()],ia.prototype,"_params",void 0),t([ce()],ia.prototype,"_search",void 0),t([ce()],ia.prototype,"_filter",void 0),t([ce()],ia.prototype,"_width",void 0),t([ce()],ia.prototype,"_height",void 0),t([ce()],ia.prototype,"expandedGroups",void 0),t([ce()],ia.prototype,"options",void 0),t([ce()],ia.prototype,"scheduleEntities",void 0),ia=t([re("dialog-select-entities")],ia);var sa=Object.freeze({__proto__:null,get DialogSelectEntities(){return ia}});let aa=class extends oe{constructor(){super(...arguments),this.active=!1}render(){return q`
      <div class="chip ${this.active?"active":""}" @click=${this._handleClick}>
        <div class="overlay"></div>
        ${this.renderIcon()}
        <span class="value"><slot></slot></span>
        ${this.renderTrailingIcon()}
      </div>
    `}renderIcon(){if(!this.icon&&!this.toggleable&&!this.useStateIcon)return R;if(this.toggleable)return q`
        <div class="icon">
          <ha-icon
            icon="mdi:check"
          ></ha-icon>
        </div>
      `;if(this.useStateIcon){let e=this.hass.states[this.value||""];return q`
          <div class="icon filled">
            ${e?q`<ha-state-icon .stateObj=${e} .hass=${this.hass}></ha-state-icon>`:q`<ha-icon icon="mdi:help-circle-outline"></ha-icon>
            `}
          </div>
        `}return q`
        <div class="icon filled">
          <ha-icon
            .icon=${this.icon}
          ></ha-icon>
        </div>
      `}renderTrailingIcon(){const e="icn_"+Math.random().toString(36).substring(2,9);return this.removable||this.badge?this.badge?q`
        <div class="badge">
          ${this.badge}
        </div>
      `:q`
        <div class="trailing-icon" @click=${this._iconClick}>
          <ha-icon icon="mdi:close" id="${e}"></ha-icon>
          ${this.disabled?R:q`<ha-tooltip for="${e}">${Xi("ui.common.remove",this.hass)}</ha-tooltip>`}
        </div>
      `:R}_handleClick(e){if(!this.disabled){if(this.toggleable){this.active=!this.active;const e=new CustomEvent("click",{detail:{active:this.active,value:this.value}});this.dispatchEvent(e)}else{const e=new CustomEvent("click",{detail:{value:this.value}});this.dispatchEvent(e)}e.stopPropagation()}}_iconClick(e){if(e.stopPropagation(),this.disabled)return;const t=new CustomEvent("icon-clicked",{detail:{value:this.value}});this.dispatchEvent(t)}static get styles(){return r`
      :host {
        margin: 4px;
      }
      .chip {
        display: inline-flex;
        position: relative;
        height: var(--chip-height, 32px);
        background: none;
        user-select: none;
        z-index: 1;
        align-items: center;
        justify-content: center;
      }
      .chip:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        border: 1px solid var(--chip-color, rgb(168, 225, 251));
        border-radius: var(--chip-border-radius, 32px);
        background: rgba(0, 0, 0, 0);
        opacity: var(--background-opacity, 1);
        z-index: -2;
      }
      .chip.active:before {
        background: var(--chip-color, rgb(168, 225, 251));
      }
      .icon {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 20px;
        margin-right: -8px;
        color: rgba(0, 0, 0, 0.54);
      }
      .icon.filled:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, rgb(168, 225, 251));
        border-radius: 32px;
        z-index: -2;
      }
      .value {
        color: var(--primary-text-color);
        font-size: var(--chip-font-size, 0.875rem);
        font-weight: 400;
        display: flex;
        align-items: center;
        padding: 0px 12px;
        opacity: 0.9;
      }
      .trailing-icon {
        position: relative;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 16px;
        margin: 0px 3px 0px -8px;
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .trailing-icon:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, var(--secondary-text-color));
        border-radius: 26px;
        z-index: -2;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
      }
      .trailing-icon:hover:before {
        opacity: 0.15;
      }
      .trailing-icon:active:before {
        opacity: 0.3;
      }
      :host([disabled]) .trailing-icon:hover:before, :host([disabled]) .trailing-icon:active:before {
        opacity: 0;
      }
      :host([disabled]) .trailing-icon {
        cursor: not-allowed;
      }
      :host([selectable]) .chip, :host([toggleable]) .chip {
        cursor: pointer;
      }
      .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: rgba(0, 0, 0, 0);
        border-radius: var(--chip-border-radius, 32px);
        transition: background-color 0.1s ease-in-out, border 0.1s ease-in-out;
        border: 1px solid rgba(0, 0, 0, 0);
      }
      :host([selectable]) .chip:hover .overlay, :host([toggleable]) .chip:hover .overlay {
        border: 1px solid rgba(0, 0, 0, 0.05);
        background: rgba(0, 0, 0, 0.05);
      }
      :host([selectable]) .chip:active .overlay, :host([toggleable]) .chip:active .overlay {
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.1);
      }
      :host([selectable]) .chip:hover .value, :host([toggleable]) .chip:hover .value {
        opacity: 1;
      }
      :host([active]):host([selectable]) .chip:hover .overlay, :host([active]):host([toggleable]) .chip:hover .overlay {
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0);
      }
      :host([active]):host([selectable]) .chip:active .overlay, :host([active]):host([toggleable]) .chip:active .overlay {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(0, 0, 0, 0);
      }
      
      :host([toggleable]) .icon {
        width: 0px;
        transition: width 0.1s ease-in-out;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-left: 12px;
      }
      :host([toggleable]) .active .icon {
        width: 20px;
      }
      .badge {
        position: relative;
        display: flex;
        height: 26px;
        min-width: 26px;
        border-radius: 13px;
        font-size: var(--chip-font-size, 0.875rem);
        align-items: center;
        justify-content: center;
        margin: 0px 3px 0px -8px;
      }
      .badge:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, var(--secondary-text-color));
        border-radius: 26px;
        z-index: -2;
        transition: opacity 0.1s ease-in-out;
        opacity: 0.1;
      }
    `}};t([le({attribute:!1})],aa.prototype,"hass",void 0),t([le({type:String})],aa.prototype,"icon",void 0),t([le({type:Boolean})],aa.prototype,"useStateIcon",void 0),t([le({type:Boolean})],aa.prototype,"selectable",void 0),t([le({type:Boolean})],aa.prototype,"removable",void 0),t([le({type:Boolean})],aa.prototype,"toggleable",void 0),t([le({type:Boolean})],aa.prototype,"active",void 0),t([le({type:String})],aa.prototype,"badge",void 0),t([le({type:String})],aa.prototype,"value",void 0),t([le({type:Boolean})],aa.prototype,"disabled",void 0),aa=t([re("scheduler-chip")],aa);let oa=class extends oe{constructor(){super(...arguments),this.value=[]}render(){return this.items?q`
      ${Object.values(this.items).map(e=>this.renderChipitem(e))}
    `:q``}renderChipitem(e){const t=e.useStateIcon&&!Object.keys(this.hass.states).includes(e.value||"");return q`
      <scheduler-chip
        .hass=${this.hass}
        .value=${e.value||e.name}
        .icon=${e.icon}
        ?useStateIcon=${e.useStateIcon}
        ?active=${this.value.includes(e.value||e.name)}
        .badge=${void 0!==e.badge?String(e.badge):void 0}
        ?selectable=${this.selectable}
        ?toggleable=${this.toggleable}
        ?removable=${this.removable}
        @click=${this._handleClick}
        @icon-clicked=${this._handleClick}
        ?disabled=${this.disabled}
        style="${t?"text-decoration: line-through":""}"
      >
        ${e.name}
      </scheduler-chip>
      `}_handleClick(e){if(!this.disabled)if(this.toggleable){const t=e.detail.value,i=e.detail.active;this.value.includes(t)&&!i?this.value=this.value.filter(e=>e!=t):!this.value.includes(t)&&t&&(this.value=[...this.value,t]);const s=new CustomEvent("value-changed",{detail:this.value});this.dispatchEvent(s)}else{const t=new CustomEvent("value-changed",{detail:e.detail.value});this.dispatchEvent(t)}}static get styles(){return r`
      :host {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin: 0px -4px;
        flex-wrap: wrap;
      }
      scheduler-chip {
        display: inline-flex;
        margin-bottom: 4px;
      }
    `}};t([le({attribute:!1})],oa.prototype,"hass",void 0),t([le({attribute:!1})],oa.prototype,"items",void 0),t([le({attribute:!1})],oa.prototype,"value",void 0),t([le({type:Boolean})],oa.prototype,"selectable",void 0),t([le({type:Boolean})],oa.prototype,"toggleable",void 0),t([le({type:Boolean})],oa.prototype,"removable",void 0),t([le({type:Boolean})],oa.prototype,"disabled",void 0),oa=t([re("scheduler-chip-set")],oa);const na=[{name:"primary",weight:10},{name:"secondary",weight:8}];let ra=class extends oe{constructor(){super(...arguments),this.value=[],this.multiple=!1,this.disabled=!1,this.multipleMode=!1,this.scheduleEntities=[],this._valueRenderer=e=>{Array.isArray(e)&&(e=e.length?[...e].pop():"");const t=e||"",i=this.hass.states[t];if(!i)return q`
        <ha-svg-icon
          slot="start"
          .path=${qs}
          style="margin: 0 4px"
        ></ha-svg-icon>
        <span slot="headline">${t}</span>
      `;const s=this._parseEntityItem(t);return q`
      ${s.icon?q`
        <ha-icon
          slot="start"
          icon="${s.icon}"
        ></ha-icon>
       `:q`
      <state-badge
        .hass=${this.hass}
        .stateObj=${i}
        slot="start"
        color="var(--icon-primary-color)"
      ></state-badge>
      `}
      <span slot="headline">${s.primary}</span>
      <span slot="supporting-text">${s.secondary}</span>
    `},this._rowRenderer=e=>{const t=e.id||"",i=this.hass.states[t];return q`
      <ha-combo-box-item type="button" compact>
        ${e.icon?q`
          <ha-icon
            slot="start"
            icon="${e.icon}"
          ></ha-icon>
        `:i?q`
          <state-badge
            .hass=${this.hass}
            .stateObj=${i}
            slot="start"
            color="var(--icon-primary-color)"
          ></state-badge>
        `:q`
          <ha-svg-icon
            slot="start"
            .path=${qs}
          ></ha-svg-icon>
        `}
        <span slot="headline">${e.primary}</span>
        ${e.secondary?q`<span slot="supporting-text">${e.secondary}</span>`:R}
      </ha-combo-box-item>
    `},this._filteredItems=()=>{let e=Object.keys(this.hass.states);return this.domain&&(e=e.filter(e=>Wi(e)==this.domain)),this.multiple&&(e=e.filter(e=>{var t;return!(null===(t=this.value)||void 0===t?void 0:t.includes(e))})),this.config&&(e=e.filter(e=>((this.config.include||Re).some(t=>Ki(t,e))||Object.keys(this.config.customize||{}).some(t=>Ki(t,e)))&&!(this.config.exclude||[]).some(t=>Ki(t,e)))),e=e.filter(e=>!this.scheduleEntities.includes(e)),this.filterFunc&&(e=e.filter(e=>this.filterFunc(this.hass.states[e]))),e.map(e=>this._parseEntityItem(e))}}async firstUpdated(){this.scheduleEntities=Object.entries(await Oe(this.hass)).map(([,e])=>e.entity_id),this._autoSelectIfSingleEntity()}updated(e){super.updated(e),e.has("domain")&&this._autoSelectIfSingleEntity()}_autoSelectIfSingleEntity(){if(this.value&&this.value.length>0)return;const e=this._filteredItems();1===e.length&&(this.value=[e[0].id],Es(this,"value-changed",{value:this.value}))}render(){var e,t;return q`
      ${this.renderChips()}

      ${(null===(e=this.value)||void 0===e?void 0:e.length)&&!this.multipleMode&&this.multiple?R:q`

      <ha-generic-picker
        .label=${(null===(t=this.value)||void 0===t?void 0:t.length)?"":Xi("ui.components.entity.entity-picker.choose_entity",this.hass)}
        .hass=${this.hass}
        .autofocus=${this.autofocus}
        .notFoundLabel=${Xi("ui.components.combo-box.no_match",this.hass)}
        .value=${this.multiple?"":this.value}
        .valueRenderer=${this._valueRenderer}
        .rowRenderer=${this._rowRenderer}
        .disabled=${this.disabled}
        .getItems=${this._filteredItems}
        .searchKeys=${na}
        .searchLabel=${Xi("ui.dialogs.quick-bar.filter_placeholder",this.hass)}
        @value-changed=${this._valueChanged}
        hide-clear-icon
        allow-custom-value
      >
      </ha-generic-picker>
      `}
    `}renderChips(){if(!this.multiple)return R;let e=(this.value||[]).map(e=>{const t=this._parseEntityItem(e);return{name:t.primary,value:e,useStateIcon:!t.icon,icon:t.icon}});return q`
      <div class="wrapper">
      <scheduler-chip-set
        .hass=${this.hass}
        .items=${e}
        removable
        @value-changed=${this._removeClick}
        ?disabled=${this.disabled}
      >
      </scheduler-chip-set>
      <div class="column-right">
      ${e.length?q`
      <ha-icon-button
        @click=${e=>{this.multipleMode=!this.multipleMode,e.target.blur()}}
        .path=${this.multipleMode?"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z":Ms}
        slot="end"
      ></ha-icon-button>
      `:R}
      </div>
      </div>
      `}_valueChanged(e){let t=e.detail.value;const i=e.currentTarget;t&&(this.value=[...this.value||[],t],this.multiple&&(i.value=""),Es(this,"value-changed",{value:this.value}),e.stopPropagation())}_removeClick(e){const t=e.detail;this.value=(this.value||[]).filter(e=>e!==t),Es(this,"value-changed",{value:this.value})}_parseEntityItem(e){var t,i,s,a;const o=Object.entries((null===(t=this.config)||void 0===t?void 0:t.customize)||{}).filter(([t,i])=>Ki(t,e)).map(([e,t])=>t),n=null===(i=o.find(e=>"name"in e))||void 0===i?void 0:i.name,r=null===(s=o.find(e=>"icon"in e))||void 0===s?void 0:s.icon;return{id:e,primary:n||Zi(e,null===(a=this.hass.states[e])||void 0===a?void 0:a.attributes),secondary:e,icon:r}}};ra.styles=r`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    :host > * {
      display: block;
      width: 100%;
    }
    div.wrapper {
      display: flex;
    }
    scheduler-chip-set {
      display: flex;
    }
    div.column-right {
      display: flex;
    }
    div.column-right ha-icon-button {
      display: flex;
      align-self: flex-end;
    }
  `,t([le({attribute:!1})],ra.prototype,"hass",void 0),t([le()],ra.prototype,"domain",void 0),t([le()],ra.prototype,"config",void 0),t([le({type:Array})],ra.prototype,"value",void 0),t([le({type:Boolean})],ra.prototype,"multiple",void 0),t([le({type:Boolean})],ra.prototype,"disabled",void 0),t([ce()],ra.prototype,"multipleMode",void 0),t([ce()],ra.prototype,"scheduleEntities",void 0),ra=t([re("scheduler-entity-picker")],ra);let da=class extends oe{constructor(){super(...arguments),this.expanded=!1,this.disabled=!1,this.idx=-1,this.openClose=new CustomEvent("open-close",{detail:{},bubbles:!0,composed:!0})}render(){return q`
      <div
        class="header ${this.expanded?"expanded":""}"
        @click=${this._toggleContent}
        @focus=${this._focusChanged}
        @blur=${this._focusChanged}
        role="button"
        tabindex="0"
        aria-expanded=${this.expanded}
        aria-controls="sect1"
      >
        ${this.disabled?"":q`
        <ha-icon
          icon="mdi:chevron-down"
          class="chevron ${this.expanded?"expanded":""}"
        ></ha-icon>
        `}
        <slot name="header" class="title"></slot>
        <div id="contextMenu">
          <slot name="contextMenu">
          </slot>
        </div>
      </div>

      <div class="container">
        <slot name="content"></slot>
      </div>
    `}_toggleContent(){this.disabled||this.dispatchEvent(this.openClose)}attributeChangedCallback(e,t,i){let s=void 0;if(null!==this.shadowRoot)for(const e of this.shadowRoot.children)if("container"==e.className){s=e;break}if(s)if(this.hasAttribute("expanded")){const e=s.scrollHeight;s.style.height=e+"px"}else s.style.height="0px";super.attributeChangedCallback(e,t,i)}_focusChanged(e){this.disabled||this.shadowRoot.querySelector(".header").classList.toggle("focused","focus"===e.type)}static get styles(){return r`
      :host {
        display: block;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        box-sizing: border-box;
        margin: 8px 0px;
        position: relative;
      }
      .header {
        display: flex;
        width: 100%;
        border-radius: 12px;
        padding: 12px;
        box-sizing: border-box;
        cursor: pointer;
      }
      :host([disabled]) .header {
        cursor: default;
      }
      .header .title {
        font-weight: 600;
        padding: 0px 8px;
      }
      .header ::slotted(div) {
        flex: 1;
        margin-right: 32px;
      }
      .header.focused {
        background: var(--input-fill-color);
      }
      .header.expanded {
        border-radius: 12px 12px 0px 0px;
      }
      #contextMenu {
        position: absolute;
        right: 0px;
        top: 0px;
      }

      .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        direction: var(--direction);
        margin-left: 0px;
      }
      .chevron.expanded {
        transform: rotate(180deg);
      }
      .container {
        overflow: hidden;
        transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0px 12px;
        box-sizing: border-box;
        height: 0px;
      }
      :host([disabled]) .container {
        height: auto;
      }
      .container.expanded {
        height: auto;
      }
      @media all and (max-width: 450px) {
        .container {
          padding: 0px;
        }
      }
    `}};t([le({type:Boolean,reflect:!0})],da.prototype,"expanded",void 0),t([le({type:Boolean,reflect:!0})],da.prototype,"disabled",void 0),t([le({attribute:!0})],da.prototype,"idx",void 0),t([le({type:CustomEvent})],da.prototype,"openClose",void 0),da=t([re("scheduler-collapsible-section")],da);let la=class extends oe{set openedItem(e){e!==this._openedItem&&void 0!==e&&setTimeout(()=>{this.updateOpenedItem(e)},50)}constructor(){super(),this.disabled=!1,this._openedItem=-1,this._numItems=0,this.addEventListener("open-close",this.toggleActiveSection)}firstUpdated(){const e=this.querySelectorAll("scheduler-collapsible-section");this._numItems=e.length}toggleActiveSection(e){if(this.disabled)return;const t=e.target,i=Number(t.getAttribute("idx"));"true"===t.getAttribute("expanded")?this.updateOpenedItem(-1):this.updateOpenedItem(i)}updateOpenedItem(e){this.querySelectorAll("scheduler-collapsible-section").forEach((function(t){const i=Number(t.getAttribute("idx"));i!==e&&t.getAttribute("expanded")?t.removeAttribute("expanded"):i!==e||t.getAttribute("expanded")||t.setAttribute("expanded","true")})),this._openedItem=e;const t=new CustomEvent("openclose-changed",{detail:{item:e}});this.dispatchEvent(t)}render(){return q`
      <slot></slot>
    `}};t([le()],la.prototype,"disabled",void 0),t([ce()],la.prototype,"_openedItem",void 0),t([ce()],la.prototype,"_numItems",void 0),la=t([re("scheduler-collapsible-group")],la);const ca="__NONE_OPTION__";let ua=class extends oe{constructor(){super(...arguments),this.disabled=!1}render(){var e;if(this.config.select){const e=this.config.select,t=[this.value||[]].flat().map(String),i=e=>{const i=e.detail;this.value=t.filter(e=>e!=i),Es(this,"value-changed",{value:this.value})},s=()=>{let e=t.map(e=>Object({name:e,value:e}));return q`
        <scheduler-chip-set
          .hass=${this.hass}
          .items=${e}
          removable
          @value-changed=${i}
        >
        </scheduler-chip-set>`},a=e=>{var t;let i=null===(t=this.config.select)||void 0===t?void 0:t.translation_key,s="";return i&&(s=Xi(i.replace("${value}",e),this.hass,!1)),s||(s=e),s},o=e=>"object"==typeof e?{id:e.value,primary:a(e.label),icon:e.icon}:{id:e,primary:a(e)};let n=[...null==e?void 0:e.options].map(o),r=[this.value||[]].flat().map(String);n=[...n,...r.filter(e=>!n.find(t=>t.id==e)).map(o)],Array.isArray(this.value)&&(n=n.filter(e=>"object"==typeof e?!t.includes(e.id):!t.includes(e)));const d=()=>{if(!n.length)return q`
          <ha-list-item .value=${ca}>
            ${this.hass.localize("ui.components.combo-box.no_match")}
          </ha-list-item>
        `;const e=n.some(e=>e.icon);return n.map(t=>q`
          <ha-list-item
            .value=${t.id}
            .graphic=${e?"icon":""}
          >
            ${t.icon?q`<ha-icon slot="graphic" .icon=${t.icon}></ha-icon>`:R}
            <span>${t.primary}</span>
          </ha-list-item>
        `)},l=e=>{e.stopPropagation();const t=e.target.value;if(t==ca)return e.target.select(-1),e.preventDefault(),void setTimeout(()=>{e.target.blur()},50);this._valueChanged(new CustomEvent("value-changed",{detail:{value:t}}))};return q`
          <div class="select-wrapper">
          ${e.multiple?q`
            <div class="chips">
            ${s()}
            </div>
          `:""}
          <ha-select
            .value=${Array.isArray(this.value)?"":this.value||""}
            .disabled=${this.disabled}
            @selected=${l}
            @closed=${e=>{e.stopPropagation()}}
            fixedMenuPosition
            naturalMenuWidth
          >
            ${d()}
          </ha-select>
        </div>
      `}if(this.config.number){const t=this.config.number,i="box"==t.mode||!Be(t.min)||!Be(t.max);let s=this.value;i||"number"==typeof s||(s=t.min),"number"==typeof t.scale_factor&&(s=Number(s)/t.scale_factor),"number"==typeof(null==t?void 0:t.step)&&(s=Math.round(Number(s)/t.step)*t.step),Be(s)&&(s=rs(Number(s)));const a=e=>{let i=Number(e.target.value);"number"==typeof t.scale_factor&&(i*=t.scale_factor),"number"==typeof(null==t?void 0:t.step)&&(i=Math.round(i/t.step)*t.step),i=rs(i),this._valueChanged(new CustomEvent("value-changed",{detail:{value:i}})),e.stopPropagation()},o=e=>{e.stopPropagation();let t=e.target.value;const i=""===t||isNaN(Number(t))?void 0:Number(t);this._valueChanged(new CustomEvent("value-changed",{detail:{value:i}}))},n=(e,i)=>{let s=t.step&&Number(t.step)%1==0?null!==e.match(/^-?\d+$/):null!==e.match(/^[+-]?\d+([.,]\d+)?$/);return s&&Be(t.min)&&(s=Number(e)>=t.min),s&&Be(t.max)&&(s=Number(e)<=t.max),{valid:s,customError:!s}};return q`
        <div class="slider-wrapper">
        ${i?q`
        <ha-textfield
          .inputMode=${t.step&&Number(t.step)%1==0?"numeric":"decimal"}
          .min=${t.min}
          .max=${t.max}
          .value=${s||""}
          .step=${null!==(e=t.step)&&void 0!==e?e:1}
          .disabled=${this.disabled}
          .required=${!0}
          .suffix=${t.unit}
          type="number"
          autoValidate
          .validityTransform=${n}
          @input=${o}
        >
        </ha-textfield>
        `:q`
        <ha-slider
          .min=${t.min}
          .max=${t.max}
          .step=${t.step||1}
          .value=${s}
          @change=${a}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${s} ${t.unit||""}</span>
        `}
        </div>
      `}if(this.config.text){this.config.text;return q`
        <div class="textfield-wrapper">
          <ha-textfield
            .value=${this.value||""}
            @input=${this._valueChanged}
            .placeholder=""
            ?disabled=${this.disabled}
          ></ha-textfield> 
        </div>     
      `}if(this.config.boolean){let e={select:{options:[{value:"true",label:"True",icon:"mdi:check"},{value:"false",label:"False",icon:"mdi:close"}]}};const t=e=>{let t=Be(e.detail.value)?"true"===e.detail.value:void 0;e.stopPropagation(),this._valueChanged(new CustomEvent("value-changed",{detail:{value:t}}))};return q`
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${e}
          .value=${"boolean"==typeof this.value?this.value?"true":"false":void 0}
          @value-changed=${t}
          ?disabled=${this.disabled}
        >
        </scheduler-combo-selector>
      `}return q``}_valueChanged(e){if(e.stopPropagation(),Array.isArray(this.value)){let t=e.detail.value;if(!t)return;this.value=[...this.value,t],e.target.value=""}else if(e.detail){let t=e.detail.value;void 0===t&&(t=null),this.value=t}else this.value=e.target.value;Es(this,"value-changed",{value:this.value})}};ua.styles=r`
      :host {
        display: flex;
        width: 100%;
      }
      div.slider-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        gap: 4px;
      }
      div.slider-wrapper > * {
        display: flex;
      }
      div.slider-wrapper ha-slider {
        flex: 1;
      }
      div.slider-wrapper span {
        justify-content: center;
        align-self: center;
        min-width: 45px;
        text-align: end;
      }
      div.slider-wrapper ha-textfield {
        --ha-textfield-input-width: 40px;
      }
      div.select-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      div.textfield-wrapper {
        display: flex;
        width: 100%;
      }
      div.textfield-wrapper ha-textfield {
        display: flex;
        width: 100%;
      }
  `,t([le({attribute:!1})],ua.prototype,"hass",void 0),t([le({attribute:!1})],ua.prototype,"config",void 0),t([le()],ua.prototype,"value",void 0),t([le({type:Boolean})],ua.prototype,"disabled",void 0),ua=t([re("scheduler-combo-selector")],ua);let ha=class extends oe{constructor(){super(...arguments),this._config={},this.title="",this.tagOptions=[],this.customTagValue=""}setConfig(e){this._config=Object.assign({},e)}async firstUpdated(){this.title="string"==typeof this._config.title?this._config.title:"";const e=(await Ds(this.hass)).map(e=>e.name);e.sort(Yi),this.tagOptions=e}render(){var e,t,i,s,a,o;const n={number:{min:0,max:30,step:1,unit_of_measurement:Ui("ui.panel.card_editor.fields.time_step.unit_minutes",this.hass)}},r={select:{options:this.tagOptions,multiple:!0,custom_value:!0}};return q`
      <div class="card-config">

        <ha-button @click=${this._showIncludedEntitiesDialog} outlined>
          ${Ui("ui.panel.card_editor.fields.entities.button_label",this.hass)}
          <ha-svg-icon
            slot="trailingIcon"
            .path=${"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"}
          ></ha-svg-icon>
        </ha-button>

        <scheduler-settings-row ?showPrefix=${!0}>
          <ha-checkbox
            slot="prefix"
            ?checked=${!1!==this._config.title}
            @change=${this._setEnableTitle}
          >
          </ha-checkbox>
          <span slot="heading">${Ui("ui.panel.card_editor.fields.title.heading",this.hass)}</span>

          <ha-textfield
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${Ui("ui.panel.common.title",this.hass)}
            ?disabled=${!1===this._config.title}
          ></ha-textfield>

        </scheduler-settings-row>

        <div class="two-columns" style="margin: 10px 0px 15px 0px">
        <div class="column">
          <ha-formfield label="${Ui("ui.panel.card_editor.fields.discover_existing.heading",this.hass)}">
            <ha-switch
              ?checked=${!1!==this._config.discover_existing}
              @change=${e=>{this._updateConfig({discover_existing:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="column">
          <ha-formfield label="${Ui("ui.panel.card_editor.fields.show_header_toggle.heading",this.hass)}">
            <ha-switch
              ?checked=${this._config.show_header_toggle}
              @change=${e=>{this._updateConfig({show_header_toggle:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

        <scheduler-settings-row>
          <span slot="heading">${Ui("ui.panel.card_editor.fields.time_step.heading",this.hass)}</span>

          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${n}
            .value=${this._config.time_step||15}
            @value-changed=${e=>{this._updateConfig({time_step:e.detail.value})}}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>

        <span>${Ui("ui.panel.card_editor.fields.default_editor.heading",this.hass)}</span>
        <div class="two-columns">
          <div class="column">
            <ha-formfield label="${Ui("ui.panel.card_editor.fields.default_editor.options.single",this.hass)}">
              <ha-radio
                name="default_editor"
                value="${me.Single}"
                @change=${()=>{this._updateConfig({default_editor:me.Single})}}
                ?checked=${this._config.default_editor!=me.Scheme}
              >
              </ha-radio>
            </ha-formfield>
          </div>
          <div class="column">
            <ha-formfield label="${Ui("ui.panel.card_editor.fields.default_editor.options.scheme",this.hass)}">
              <ha-radio
                name="default_editor"
                value="${me.Scheme}"
                @change=${()=>{this._updateConfig({default_editor:me.Scheme})}}
                ?checked=${this._config.default_editor==me.Scheme}
              >
              </ha-radio>
            </ha-formfield>
          </div>
        </div>

          <span slot="heading">${Ui("ui.panel.card_editor.fields.sort_by.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.sort_by.options.relative_time",this.hass)}">
            <ha-radio
              name="sort_by"
              value="relative-time"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by||qe].flat().includes("relative-time")}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.sort_by.options.title",this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by||qe].flat().includes("title")}
            ></ha-radio>
          </ha-formfield>
        </div>
        </div>


          <span>${Ui("ui.panel.card_editor.fields.display_format_primary.heading",this.hass)}</span>


        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_primary.options.default",this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="default"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[(null===(e=this._config.display_options)||void 0===e?void 0:e.primary_info)||"default"].flat().includes("default")}
            >
            </ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_primary.options.entity_action",this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="{entity}: {action}"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[(null===(t=this._config.display_options)||void 0===t?void 0:t.primary_info)||"default"].flat().includes("{entity}: {action}")}
            >
            </ha-radio>
          </ha-formfield>

        </div>

        </div>

          <span>${Ui("ui.panel.card_editor.fields.display_format_secondary.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">
          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_secondary.options.relative_time",this.hass)}">
            <ha-checkbox
              value="relative-time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[(null===(i=this._config.display_options)||void 0===i?void 0:i.secondary_info)||Ve].flat().includes("relative-time")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_secondary.options.time",this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[(null===(s=this._config.display_options)||void 0===s?void 0:s.secondary_info)||Ve].flat().includes("time")}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_secondary.options.days",this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[(null===(a=this._config.display_options)||void 0===a?void 0:a.secondary_info)||Ve].flat().includes("days")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Ui("ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks",this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[(null===(o=this._config.display_options)||void 0===o?void 0:o.secondary_info)||Ve].flat().includes("additional-tasks")}
            >
            </ha-checkbox>
          </ha-formfield>
        </div>

        </div>

        <scheduler-settings-row>
          <span slot="heading">${Ui("ui.panel.card_editor.fields.tags.heading",this.hass)}</span>
          <div style="display: flex; flex-direction: column">
            <scheduler-combo-selector
              .hass=${this.hass}
              .config=${r}
              .value=${[this._config.tags||[]].flat()}
              @value-changed=${e=>{this._updateConfig({tags:e.detail.value})}}
            >
            </scheduler-combo-selector>
              
            <ha-button-menu
              @closed=${e=>{e.stopPropagation(),e.target.querySelector("ha-button").blur()}}
              @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
              @opened=${e=>{e.target.querySelector("ha-textfield").focus()}}
              fixed
              menuCorner="END"
              corner="BOTTOM_START"
            >
              <ha-button appearance="plain" slot="trigger">
                <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                ${Xi("ui.panel.config.tag.add_tag",this.hass)}
              </ha-button>

              <div style="display: flex; align-items: center; padding: 0x 2px 0px 8px">
                <ha-textfield
                  .value=${this.customTagValue}
                  .label=${Xi("ui.panel.config.tag.add_tag",this.hass)}
                  @input=${e=>{this.customTagValue=e.currentTarget.value}}
                  .placeholder=""
                ></ha-textfield> 
                <ha-button
                  appearance="plain"
                  @click=${this._customTagConfirmClick}
                >
                  ${Xi("ui.common.ok",this.hass)}
                </ha-button>
              </div>
            </ha-button-menu>
          </div>
        </scheduler-settings-row>

      </div>
    `}_setEnableTitle(e){e.target.checked?this.title.length?this._updateConfig({title:this.title}):this._updateConfig({title:!0}):this._updateConfig({title:!1})}_setTitle(e){const t=e.target.value;this.title=t,t!==Ui("ui.panel.common.title",this.hass)&&t.length?this._updateConfig({title:t}):this._updateConfig({title:!0})}_setSortBy(e){var t;const i=e.target.value;let s=[(null===(t=this._config)||void 0===t?void 0:t.sort_by)||qe].flat();s=s.filter(e=>"state"==e),s.includes(i)||(s=[...s,i]),this._updateConfig({sort_by:s})}_setDisplayOptionsPrimary(e){var t;const i=e.target.value,s=Object.assign(Object.assign({},null===(t=this._config)||void 0===t?void 0:t.display_options),{primary_info:i});this._updateConfig({display_options:s})}_setDisplayOptionsSecondary(e){var t;const i=e.target.value,s=e.target.checked;let a=Object.assign({},null===(t=this._config)||void 0===t?void 0:t.display_options),o=[a.secondary_info||[]].flat();o=s?Array.from(new Set([...o,i])):o.filter(e=>e!==i),o.sort((e,t)=>{const i={"relative-time":1,time:o.includes("relative-time")?3:2,days:o.includes("relative-time")?2:3,"additional-tasks":4},s=Object.keys(i).includes(e)?i[e]:5,a=Object.keys(i).includes(t)?i[t]:5;return s>a?1:s<a?-1:0}),a=Object.assign(Object.assign({},a),{secondary_info:[...o]}),this._updateConfig({display_options:a})}async _showIncludedEntitiesDialog(e){let t=(this._config.include||[]).filter(e=>!e.includes(".")),i=(this._config.include||[]).filter(e=>e.includes("."));const s=await Ts(this.hass);let a=Object.assign(Object.assign({},this._config),{customize:Object.assign(Object.assign({},s),this._config.customize||{})});await new Promise(s=>{const o={cancel:()=>s(null),confirm:e=>s(e),domains:t,entities:i,cardConfig:a};Es(e.target,"show-dialog",{dialogTag:"dialog-select-entities",dialogImport:()=>Promise.resolve().then((function(){return sa})),dialogParams:o})}).then(e=>{e&&this._updateConfig({include:[...e.domains,...e.entities]})})}_customTagConfirmClick(e){let t=e.target;t=t.parentElement,t=t.parentElement;t.querySelector("ha-button").click();let i=String(this.customTagValue).trim();if(i.length){let e=[this._config.tags||[]].flat();e=[...new Set([...e,i])],this._updateConfig({tags:e})}this.customTagValue=""}_updateConfig(e){this._config&&(this._config=Object.assign(Object.assign({},this._config),e),Es(this,"config-changed",{config:this._config}))}};ha.styles=r`
    div.entities-list {
      max-height: 500px;
      overflow: auto;
    }
    div.row {
      display: flex;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      margin: 10px 0px;
    }
    div.row ha-icon {
      padding: 8px;
      color: var(--state-icon-color);
    }
    div.row ha-switch {
      padding: 13px 5px;
    }
    .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    .info,
    .info > * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-textfield {
      width: 100%;
    }
    div.two-columns {
      display: flex; 
      flex-direction: row; 
    }
    div.two-columns .column {
      flex: 50%;
    
    }
    div.two-columns .column > * {
      display: flex; 
      flex-direction: column; 
    }
    scheduler-combo-selector {
      min-width: 240px;
    }
  `,t([le({attribute:!1})],ha.prototype,"hass",void 0),t([le()],ha.prototype,"_config",void 0),t([le()],ha.prototype,"title",void 0),t([le()],ha.prototype,"tagOptions",void 0),t([ce()],ha.prototype,"customTagValue",void 0),ha=t([re("scheduler-card-editor")],ha);const ma=r`
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
    --dialog-content-padding: 0px;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-max-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertical-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  @media (min-width: 450px) and (min-height: 500px) {
    .header-bar {
        padding: 16px 16px 8px 16px;
    }
}
  ha-dialog {
    --dialog-surface-position: static;
    --dialog-content-position: static;
    --vertical-align-dialog: flex-start;
  }
  .content {
    outline: none;
  }
  .heading {
    border-bottom: 1px solid var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12));
  }
  @media all and (min-width: 600px) and (min-height: 501px) {
    ha-dialog {
      --mdc-dialog-min-width: 560px;
      --mdc-dialog-max-width: 580px;
      --dialog-surface-margin-top: 40px;
      --mdc-dialog-max-height: calc(100% - 72px);
    }
    :host([large]) ha-dialog {
      --mdc-dialog-min-width: 90vw;
      --mdc-dialog-max-width: 90vw;
    }
  }
  .config-button {
    position: absolute;
    right: 0px;
  }
  .buttons {
      box-sizing: border-box;
      display: flex;
      padding: 16px 24px;
      justify-content: space-between;
      background-color: var(--mdc-theme-surface, #fff);
      border-top: 1px solid var(--divider-color);
      position: sticky;
      bottom: 0px;
    }
  .content {
    padding: 0px 24px 16px 24px;
  }

`,pa=(r`
  .error {
    color: red;
  }
  .dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dt {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }
  .dd {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, auto) minmax(0, 2fr));
    margin: 0;
  }
  .toggle {
    padding: 0.6em;
    border: grey;
    border-radius: 50%;
  }
  .toggle.on {
    background-color: green;
  }
  .toggle.off {
    background-color: red;
  }
  .button {
    display: block;
    border: outset 0.2em;
    border-radius: 50%;
    border-color: silver;
    background-color: silver;
    width: 1.4em;
    height: 1.4em;
  }
  .value {
    padding-left: 0.5em;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }


`,(e,t,i,s)=>{var a;const o=e.service,n=null===(a=e.target)||void 0===a?void 0:a.entity_id,r=ns(e,s);if(!r||!r.fields||!Object.keys(r.fields).includes(t))return!1;const d=r.fields[t];if(null===us(o,n,t,i,s))return!1;if(Object.keys(e.service_data||{}).includes(t))return!0;if(d.supported_features){if(![n||[]].flat().every(e=>{if(!Object.keys(i.states).includes(e))return!1;return((i.states[e].attributes.supported_features||0)&d.supported_features)>0}))return!1}return!("light"==Wi(o)&&![n||[]].flat().every(e=>{if(!Object.keys(i.states).includes(e))return!1;const s=i.states[e].attributes.supported_color_modes||[];return"brightness"!=t||s.filter(e=>"onoff"!=e).length}))});var _a;!function(e){e.OverlappingTime="overlapping_time",e.MissingTargetEntity="missing_target_entity",e.MissingServiceParameter="missing_service_parameter",e.MissingAction="missing_action"}(_a||(_a={}));const ga=(e,t,i)=>{let s=[];s=[...s,...e.entries.map(e=>((e,t)=>e.every((i,s)=>{const a=Ae(i.start,t),o=void 0===i.stop?a:Ae(i.stop,t)||86400;return!(a>o)&&e.every((e,i)=>{if(i<=s)return!0;return Ae(e.start,t)>=o})})?null:_a.OverlappingTime)(e.slots,t)).filter(e=>null!==e)];let a=e.entries.map(e=>e.slots.map(e=>e.actions)).flat().flat();return a.length||(s=[...s,_a.MissingAction]),s=[...s,...a.map(e=>((e,t,i)=>{var s;const a=ns(e,i);return(null==a?void 0:a.target)&&!(null===(s=e.target)||void 0===s?void 0:s.entity_id)?_a.MissingTargetEntity:(null==a?void 0:a.fields)&&!Object.entries(a.fields).filter(([s])=>pa(e,s,t,i)).every(([s,a])=>{var o,n;let r=us(e.service,null===(o=e.target)||void 0===o?void 0:o.entity_id,s,t,i);const d=!(!r.number||!(null===(n=r.number)||void 0===n?void 0:n.optional))||a.optional;return!(!Object.keys(e.service_data).includes(s)&&!d)&&!(!Be(e.service_data[s])&&!d)})?_a.MissingServiceParameter:null})(e,t,i)).filter(e=>null!==e)],s.length?s.shift():null},va=e=>{const t=e=>e.actions.length?(e.stop||(e=Object.fromEntries(Object.entries(e).filter(([e])=>"stop"!=e))),e):null;let i={weekdays:(e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object.assign(Object.assign({},e),{slots:e.slots.map(t).filter(e=>null!==e)}))})).entries[0].weekdays.map(ya),timeslots:e.entries[0].slots.map(fa),name:e.name,start_date:e.start_date,end_date:e.end_date,repeat_type:e.repeat_type,tags:e.tags||[]};return e.schedule_id&&(i=Object.assign(Object.assign({},i),{schedule_id:e.schedule_id})),i},ya=e=>{switch(e){case pe.Monday:return"mon";case pe.Tuesday:return"tue";case pe.Wednesday:return"wed";case pe.Thursday:return"thu";case pe.Friday:return"fri";case pe.Saturday:return"sat";case pe.Sunday:return"sun";case pe.Workday:return"workday";case pe.Weekend:return"weekend";default:return"daily"}},fa=e=>({start:e.start,stop:e.stop,actions:e.actions.map(e=>ba(e)).flat(),condition_type:e.conditions.items.length?e.conditions.type==_e.And?"and":"or":void 0,conditions:e.conditions.items.length?e.conditions.items:void 0,track_conditions:e.conditions.track_changes}),ba=e=>{var t,i;const s=e=>Object.keys(e).filter(t=>Be(e[t])).reduce((t,i)=>(t[i]=e[i],t),{});if(e.target){if(Array.isArray(null===(t=e.target)||void 0===t?void 0:t.entity_id)){return null==e?void 0:e.target.entity_id.map(t=>({service:e.service,service_data:s(e.service_data),entity_id:t}))}return{service:e.service,service_data:s(e.service_data),entity_id:null===(i=e.target)||void 0===i?void 0:i.entity_id}}return{service:e.service,service_data:s(e.service_data)}},ka=(e,t,i)=>{const s={title:Xi("state_badge.default.error",i),description:q`
    <b>Something went wrong!</b><br />
    ${e.body.message}<br /><br />
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,primaryButtonLabel:Xi("ui.common.ok",i),confirm:()=>{},cancel:()=>{}};Es(t,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ja})),dialogParams:s})},wa=e=>{if(!Object.keys(e).includes("select")||!e.select){if(Object.keys(e).includes("number")&&e.number){const t=e.number.min;return void 0!==t?t:0}return Object.keys(e).includes("boolean")&&e.boolean?void 0:(Object.keys(e).includes("text")&&e.text,"")}e.select.options},xa=(e,t)=>{const i=ns(e,t),s=Wi(e.service),a=Bi(e.service);if(i.icon)return(o=i.icon).match(/^[a-z]+\:[a-zA-Z\-]+$/)?o:"mdi:"+o;if(Object.keys(cs).includes(s)&&Object.keys(cs[s].services).includes(a)){if(void 0!==cs[s].attributes){let t=cs[s].attributes;const i=Object.keys(t).find(t=>Object.keys(e.service_data).includes(t));if(i&&Object.keys(t[i]).includes(e.service_data[i]))return t[i][e.service_data[i]]}return cs[s].services[a]}return Object.keys(cs).includes(s)&&Object.keys(cs[s].services).includes("{entity_id}")?cs[s].services["{entity_id}"]:"mdi:flash";var o},$a=(e,t,i)=>{let s=Ae("string"==typeof e?Ce(e):e,i),a=Ae("string"==typeof t?Ce(t):t,i);return a>s?1:a<s?-1:0},ja=e=>Ce(e.start),Oa=e=>{if(Be(e.stop)){const t=Ce(e.stop);return 0==t.hours&&0==t.minutes&&t.mode==be.Fixed?Object.assign(Object.assign({},t),{hours:24}):t}return ze(ja(e),{minutes:1})},za=(e,t,i,s)=>{let a=t;if(Be(i.stop))return[e,a]=za(e,t+1,{start:i.stop},s),[e,a-1];if(!Be(i.start))return[e,a];let o=ja(e[t]),n=i.start,r=ja(e[t]);for(let i=t-1;i>=0;i--){if(e[i].actions.length){r=i==t-1?ze(ja(e[i]),{minutes:1}):Oa(e[i]);break}r=ja(e[i])}let d=ze(Oa(e[t]),{minutes:-1});if(!Be(e[t].stop))for(let i=t+1;i<e.length;i++){if(e[i].actions.length){d=i==t+1?ze(Oa(e[i]),{minutes:-1}):ja(e[i]);break}d=Oa(e[i])}if($a(r,n,s)<0&&(n=r),$a(d,n,s)>0&&Ae(d,s)>0&&(n=d),e=Object.assign(e,{[t]:Object.assign(Object.assign({},e[t]),{start:Ne(n)})}),$a(o,n,s)<=0)for(let i=t-1;i>=0;i--){let t=$a(ja(e[i]),n,s),o=$a(Oa(e[i]),n,s);if(t>0&&o<=0){e=Object.assign(e,{[i]:Object.assign(Object.assign({},e[i]),{stop:Ne(n)})});break}if(o>=0)break;t<=0&&(e=Object.assign(e,{[i]:null}),a-=1)}if($a(o,n,s)<0&&!Be(e[t].stop)&&(e=Be(e[t+1].stop)&&!e[t+1].actions.length?Object.assign(e,{[t+1]:Object.assign(Object.assign({},e[t+1]),{start:Ne(Oa(e[t]))})}):[...e.slice(0,t+1),Object.assign(Object.assign({},e[t]),{start:Ne(Oa(e[t])),stop:Ne(ja(e[t+1])),actions:[]}),...e.slice(t+1)]),$a(o,n,s)>=0)for(let t=a+1;t<e.length;t++){let i=Oa(e[a]),o=$a(ja(e[t]),i,s),n=$a(Oa(e[t]),i,s);if(o>=0&&n<0)e=Object.assign(e,{[t]:Object.assign(Object.assign({},e[t]),{start:Ne(i)})});else{if(o<0)break;n>=0&&(e=Object.assign(e,{[t]:null}))}}return $a(o,n,s)>0&&(t>0&&Be(e[t-1].stop)?e=Object.assign(e,{[t-1]:Object.assign(Object.assign({},e[t-1]),{stop:Ne(n)})}):(e=[...e.slice(0,t),Object.assign(Object.assign({},e[t]),{start:t>0?Ne(Oa(e[t-1])):"00:00:00",stop:Ne(n),actions:[]}),...e.slice(t)],a=t+1)),[e=e.filter(Be),a]},Sa=(e,t)=>{const i=new Date(t),s=3600*i.getHours()+60*i.getMinutes()+i.getSeconds();let a=3600*e.hours+60*e.minutes-s;const o=a<0?-1:1;a=Math.abs(a);let n=Math.floor(a/3600),r=Math.round((a-3600*n)/60);return o<0&&(n>0&&(n=-n),r=-r),Se({hours:n,minutes:r})};let Ca=class extends oe{constructor(){super(),this.selectedSlot=null,this.timeout=0,this.large=!1,this.handleResize=this.handleResize.bind(this)}handleResize(e){clearTimeout(this.timeout),this.timeout=window.setTimeout(()=>{this.requestUpdate()},50)}firstUpdated(){}render(){return q`
      <div class="bar">
        ${this.renderTimeslots()}
      </div>
      <div class="time-bar">
        ${this.renderTimebar()}
      </div>
    `}renderTimebar(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=[1,2,3,4,6,8,12],i=De(this.hass.locale),s=i?130:100;let a=Math.ceil(24/(e/s));for(;!t.includes(a);)a++;const o=[0,...Array.from(Array(24/a-1).keys()).map(e=>(e+1)*a),24];return o.map((e,t)=>{let s=a/24*100;s=Math.floor(100*s)/100;let n={mode:be.Fixed,hours:e,minutes:0};return 0==t?q`
        <span class="left" style=${Zs({width:s/2+"%"})}>${Ne(n,{seconds:!1,am_pm:i})}</span>
      `:t==o.length-1?q`
        <span class="right" style=${Zs({width:s/2+"%"})}>${Ne(n,{seconds:!1,am_pm:i})}</span>
      `:q`
        <span style=${Zs({width:s+"%"})}>${Ne(n,{seconds:!1,am_pm:i})}</span>
      `})}renderTimeslots(){const e=this.schedule.slots,t=this.computeSlotWidths();return e.map((i,s)=>{let a=Ae(i.start,this.hass),o=Ae(i.stop||i.start,this.hass);!o&&a&&(o=86400);const n=(o-a)/86400*100,r=i.actions.length?fs(i.actions[0],this.hass,this.config.customize,!0,!0):"",d=parseFloat(getComputedStyle(this).getPropertyValue("width")),l=5*r.length+10,c=s>0?15:0,u=s<e.length-1?15:0,h=n*d/100-c-u,m=e[s+1];return q`
        <div
          class="slot ${this.selectedSlot==s?"selected":""} ${i.actions.length?"":"empty"} ${void 0===i.stop?"short":""}"
          style="${Zs({width:t[s]+"px"})}"
          @click=${this._toggleSelectTimeslot}
          idx="${s}"
        >
          ${i.stop,""}
          ${i.actions.length?r&&(h>l/3||h>50)&&h>30?q`<span style="margin-left: ${c}px; margin-right: ${u}px">${r}</span>`:h>16?q`<ha-icon icon="${xa(i.actions[0],this.config.customize)}"></ha-icon>`:"":""}
        </div>
        ${s<e.length-1&&i.stop?q`
        <div idx="${s}" class="handle ${this.selectedSlot==s+1||this.selectedSlot==s?"":"hidden"} ${m&&!m.stop?"center":""}">
          <span>
            <ha-icon-button
              .path=${"M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z"}
              @mousedown=${this._handleDragStart}
              @touchstart=${this._handleDragStart}
            >
            </ha-icon-button>
          </span>
        </div>
        `:""}
      `})}computeSlotWidths(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=this.schedule.slots;let i=e-3*(t.length-1);const s=t.map(e=>{let t=Ae(e.start,this.hass),i=Ae(e.stop||e.start,this.hass);return!i&&t&&(i=86400),(i-t)/86400}),a=Math.round(5/i*100)/100;i-=5*s.filter(e=>e<a).length;let o=i;return s.map(e=>{let t=e<a?5:Math.round(e*i);return t>o&&(t=o),o-=t,t})}_toggleSelectTimeslot(e){let t=e.target;"div"!=t.tagName.toLowerCase()&&(t=t.parentElement);const i=Number(t.getAttribute("idx"));this.selectedSlot=this.selectedSlot!==i?i:null;const s=new CustomEvent("update",{detail:{selectedSlot:this.selectedSlot}});this.dispatchEvent(s),e.stopPropagation()}_handleDragStart(e){let t=e.target;for(;"DIV"!==t.tagName;)t=t.parentElement;const i=t.parentElement.getBoundingClientRect(),s=Number(t.getAttribute("idx"));let a=s>0?Ae(this.schedule.slots[s-1].stop||this.schedule.slots[s-1].start,this.hass)+900:900,o=(Ae(this.schedule.slots[s+1].stop||this.schedule.slots[s+1].start,this.hass)||86400)-900;void 0===this.schedule.slots[s+1].stop&&(o=(Ae(this.schedule.slots[s+2].stop||this.schedule.slots[s+2].start,this.hass)||86400)-900);const n=Ce(this.schedule.slots[s+1].start).mode;if([be.Sunrise,be.Sunset].includes(n)){let e=Ce(this.schedule.slots[s+1].start),t=Ae(Object.assign(Object.assign({},e),{hours:4,minutes:0}),this.hass),i=Ae(Object.assign(Object.assign({},e),{hours:-4,minutes:0}),this.hass);i>a&&(a=i),t<o&&(o=t)}let r=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX,t-=i.left,t>i.width&&(t=i.width),t<0&&(t=0);let r=Math.round(t/i.width*86400);r<a?r=a:r>o&&(r=o);const d=Math.floor(r/3600),l=Math.round((r-3600*d)/60);let c={mode:be.Fixed,hours:d,minutes:l};if([be.Sunrise,be.Sunset].includes(n)){const e=n==be.Sunrise?this.hass.states["sun.sun"].attributes.next_rising:this.hass.states["sun.sun"].attributes.next_setting,t=Sa(c,e);c={mode:n,hours:t.hours,minutes:t.minutes}}c=Se(c,15);const u=Ne(c);let h=[...this.schedule.slots];if(h=Object.assign(h,{[s]:Object.assign(Object.assign({},h[s]),{stop:u}),[s+1]:Object.assign(Object.assign({},h[s+1]),{start:Ne(c)})}),void 0===h[s+1].stop){const e=Ne(ze(c,{minutes:1}));h=Object.assign(h,{[s+2]:Object.assign(Object.assign({},h[s+2]),{start:e})})}this.schedule=Object.assign(Object.assign({},this.schedule),{slots:h});const m=new CustomEvent("update",{detail:{slots:h}});this.dispatchEvent(m)};const d=()=>{window.removeEventListener("mousemove",r),window.removeEventListener("touchmove",r),window.removeEventListener("mouseup",d),window.removeEventListener("touchend",d),window.removeEventListener("blur",d),r=()=>{}};window.addEventListener("mouseup",d),window.addEventListener("touchend",d),window.addEventListener("blur",d),window.addEventListener("mousemove",r),window.addEventListener("touchmove",r)}static get styles(){return r`
      :host {
        display: block;
        max-width: 100%;
        overflow: hidden;
      }
      .bar {
        width: 100%;
        height: 60px;
        display: flex;
      }
      .time-bar {
        width: 100%;
        height: 18px;
        display: flex;
      }
      .time-bar span {
        display: flex;
        justify-content: center;
        white-space: nowrap;
      }
      .time-bar span.left {
        justify-content: left;
      }
      .time-bar span.right {
        justify-content: right;
      }

      .slot {
        display: flex;
        height: 100%;
        box-sizing: border-box; 
        cursor: pointer;
        background: rgba(var(--rgb-primary-color), 0.7);
        color: var(--text-primary-color);
        font-weight: 500;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        white-space: normal;
        margin-right: 3px;
      }
      .slot:hover {
        background: rgba(var(--rgb-primary-color), 0.85);
      }
      .slot.selected {
        border: 3px solid rgba(var(--rgb-primary-color), 0.85);
      }
      .slot.selected:hover {
        border: 3px solid rgba(var(--rgb-primary-color), 1);
      }
      .slot:first-child {
        border-radius: 10px 0px 0px 10px;
      }
      .slot:last-child {
        border-radius: 0px 10px 10px 0px;
        margin-right: 0px;
      }
      .slot.empty {
        background: rgba(var(--rgb-secondary-text-color), 0.5);
      }
      .slot.empty:hover {
        background: rgba(var(--rgb-secondary-text-color), 0.65);
      }
      .slot.empty.selected {
        border: 3px solid rgba(var(--rgb-secondary-text-color), 0.65);
      }
      .slot.empty.selected:hover {
        border: 3px solid rgba(var(--rgb-secondary-text-color), 1);
      }
      .slot .marker {
        width: 24px;
        height: 24px;
        background: rgba(var(--rgb-primary-color), 0.85);
        margin-top: -80px;
        position: absolute;
        transform: rotate(45deg);
        border-radius: 12px 12px 0px 12px;
      }
      .slot .marker:hover {
        background: rgba(var(--rgb-primary-color), 1);
      }
      .slot.empty .marker {
        background: rgba(var(--rgb-secondary-text-color), 0.85);
      }
      .slot.empty .marker:hover {
        background: rgba(var(--rgb-secondary-text-color), 1);
      }
      .handle {
        display: flex;
        width: 36px;
        height: 100%;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-left: -18px;
        margin-right: -18px;
        visibility: visible;
      }
      .handle.hidden {
        visibility: hidden;
      }
      .handle span {
        background: var(--card-background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        z-index: 5;
      }
      .handle ha-icon-button {
        --mdc-icon-button-size: 36px;
        margin-top: -6px;
        margin-left: -6px;
      }
      .handle.center span {
        margin-right: -2px;
      }
    `}};t([le({attribute:!1})],Ca.prototype,"config",void 0),t([ce()],Ca.prototype,"schedule",void 0),t([ce()],Ca.prototype,"selectedSlot",void 0),t([le({type:Boolean})],Ca.prototype,"large",void 0),t([
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function(e){return(({finisher:e,descriptor:t})=>(i,s)=>{var a;if(void 0===s){const s=null!==(a=i.originalKey)&&void 0!==a?a:i.key,o=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(o.finisher=function(t){e(t,s)}),o}{const a=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(a,s)}})({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}({passive:!0})],Ca.prototype,"_handleDragStart",null),Ca=t([re("scheduler-timeslot-editor")],Ca);const Aa=e=>{let t=60*e.hours+e.minutes;return t>240?e=Object.assign(Object.assign({},e),{hours:4,minutes:0}):t<-240&&(e=Object.assign(Object.assign({},e),{hours:-4,minutes:0})),e};let Ea=class extends oe{constructor(){super(...arguments),this.hours=0,this.minutes=0,this.mode=be.Fixed,this.autoValidate=!0,this.required=!0,this.disabled=!1,this.label="",this.useAmPm=!1,this.large=!1,this.stepSize=10}set time(e){const t=Ce(e);this.mode=t.mode,this.hours=t.hours,this.minutes=t.minutes}render(){return q`
      <div class="time-input-wrap">
        <div class="input">
          ${this.label?q`<span class="label">${this.label}</span>`:R}
          ${this.large?R:this._renderTimeMode()}
          <div class="hours">
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({hours:1})}
              ?disabled=${this.mode!=be.Fixed&&4==this.hours}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            `:R}
            <ha-textfield
              id="hour"
              inputmode="numeric"
              .value=${this.formatHours()}
              label=""
              name="hours"
              @change=${this._hoursChanged}
              @focusin=${this._onFocus}
              no-spinner
              .required=${this.required}
              .autoValidate=${this.autoValidate}
              maxlength="2"
              max=${this.mode==be.Fixed?this.useAmPm?12:23:4}
              min=${this.mode==be.Fixed||this.large?0:-4}
              .disabled=${this.disabled}
              suffix="${this.large?"":":"}"
              class="${this.large?"":"hasSuffix"}"
              .validityTransform=${(e,t)=>{let i=null!==e.match(/^[1|2]?[0-9]$/);return{valid:i,customError:!i}}}
            >
            </ha-textfield>
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({hours:-1})}
              ?disabled=${this.mode!=be.Fixed&&-4==this.hours}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            `:R}
          </div>
          ${this.large?q`<div class="separator">:</div>`:R}
          <div class="minutes">
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({minutes:this.stepSize})}
              ?disabled=${this.mode!=be.Fixed&&4==this.hours}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            `:R}
            <ha-textfield
              id="min"
              type="number"
              inputmode="numeric"
              .value=${this.formatMinutes()}
              label=""
              @change=${this._minutesChanged}
              @focusin=${this._onFocus}
              name="minutes"
              no-spinner
              .required=${this.required}
              .autoValidate=${this.autoValidate}
              maxlength="2"
              max="59"
              min="0"
              .disabled=${this.disabled}
              .validityTransform=${(e,t)=>{let i=null!==e.match(/^[0-5]?[0-9]$/);return{valid:i,customError:!i}}}
              suffix=""
              class=""
            >
            </ha-textfield>
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({minutes:-this.stepSize})}
              ?disabled=${this.mode!=be.Fixed&&-4==this.hours}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            `:R}
          </div>
          ${this._renderSuffix()}
          ${this.large?this._renderTimeMode():R}
        </div>
      </div>
    `}_renderTimeMode(){if(!this.hass.states["sun.sun"])return R;if(this.large){const e=()=>{let e=this._convertTimeMode();e.mode!=be.Fixed&&(e=Aa(e)),this.mode=e.mode,this.hours=e.hours,this.minutes=e.minutes,this._valueChanged()};return q`
        <div class="mode">
          ${this.hass.states["sun.sun"]?q`
          <ha-button
            appearance="${this.mode==be.Fixed?"plain":"accent"}"
            variant="${this.mode==be.Fixed?"neutral":"brand"}"
            @click=${e}
          >
            <ha-icon icon="mdi:theme-light-dark"></ha-icon>
          </ha-button>
          `:R}
        </div>
      `}{let e=[be.Fixed,be.Sunrise,be.Sunset];const t={[be.Fixed]:Xi("ui.components.selectors.selector.types.time",this.hass),[be.Sunrise]:Xi("ui.panel.config.automation.editor.triggers.type.sun.sunrise",this.hass),[be.Sunset]:Xi("ui.panel.config.automation.editor.triggers.type.sun.sunset",this.hass)},i={[be.Fixed]:"mdi:clock-outline",[be.Sunrise]:"mdi:weather-sunset-up",[be.Sunset]:"mdi:weather-sunset-down"},s={[be.Fixed]:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",[be.Sunrise]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z",[be.Sunset]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z"},a=e=>{if(e==be.Fixed)return!1;const t=this._convertTimeMode(e);return Math.abs(60*t.hours+t.minutes)>240};return q`
      <ha-button-menu
        @action=${e=>{const t=e.detail.index,i=e.target.items[t].id,s=this._convertTimeMode(i);this.hours=s.hours,this.minutes=s.minutes,this.mode=i,e.preventDefault();const a=e.target;setTimeout(()=>{a.firstElementChild.blur()},50),this._valueChanged()}}
        @closed=${e=>{e.stopPropagation()}}
        fixed
        ?disabled=${this.disabled}
      >
        <ha-icon-button
          slot="trigger"
          .path=${s[this.mode]}
          ?disabled=${this.disabled}
        >
        </ha-icon-button>
        ${e.map(e=>q`
        <mwc-list-item graphic="icon" ?noninteractive=${this.mode==e} ?disabled=${a(e)} id="${e}">
          ${t[e]}
          <ha-icon
            slot="graphic"
            icon="${i[e]}"
          ></ha-icon>
        </mwc-list-item>
        
        `)}
      </ha-button-menu>
    `}}_renderSuffix(){if(this.large){const e=()=>{let e=Le(this.hours).am_pm;const t=Le(this.hours).hours;this.hours=Pe(t,"AM"==e?Me.PM:Me.AM),this._valueChanged()},t=()=>{0!=this.hours?this.hours=-this.hours:this.minutes=-this.minutes,this._valueChanged()},i=()=>{this.mode=this.mode==be.Sunrise?be.Sunset:be.Sunrise,this._valueChanged()};return q`
        <div class="suffix">
        ${this.useAmPm&&this.mode==be.Fixed?q`
            <ha-button appearance="plain" @click=${e}>
              <span class="large">
                ${Le(this.hours).am_pm==Me.AM?"AM":"PM"}
              </span>
            </ha-button>
          `:R}
        ${this.mode!=be.Fixed?q`
            <ha-button appearance="plain" size="large" @click=${t}>
              <span class="large">
              ${this.hours<0||this.minutes<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").trim().toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").trim().toLowerCase()}
              </span>
            </ha-button>
            <ha-button appearance="plain" @click=${i}>
              <ha-icon icon="${this.mode==be.Sunrise?"mdi:weather-sunny":"mdi:weather-night"}"></ha-icon>
            </ha-button>
         `:R}
        </div>
      `}return this.useAmPm&&this.mode==be.Fixed?q`
        <ha-select
          .required=${this.required}
          .value=${Le(this.hours).am_pm==Me.AM?"AM":"PM"}
          .disabled=${this.disabled}
          name="amPm"
          naturalMenuWidth
          fixedMenuPosition
          @selected=${this._amPmChanged}
          @closed=${e=>{e.stopPropagation()}}
        >
          <mwc-list-item value="AM">AM</mwc-list-item>
          <mwc-list-item value="PM">PM</mwc-list-item>
        </ha-select>
      `:R}_convertTimeMode(e){const t=this.hass.states["sun.sun"].attributes.next_rising,i=this.hass.states["sun.sun"].attributes.next_setting;if(e&&e!=be.Fixed||this.mode==be.Fixed){const s=Sa({hours:this.hours,minutes:this.minutes},t),a=Sa({hours:this.hours,minutes:this.minutes},i),o=60*s.hours+s.minutes,n=60*a.hours+a.minutes;let r=e||(Math.abs(o)<=Math.abs(n)?be.Sunrise:be.Sunset),d=r==be.Sunrise?s:a;return{mode:r,hours:d.hours,minutes:d.minutes}}{let e=this.mode==be.Sunrise?Ce(t):Ce(i);return e=ze(e,{hours:this.hours,minutes:this.minutes}),{mode:be.Fixed,hours:e.hours,minutes:e.minutes}}}_hoursChanged(e){let t=Number(e.target.value);if(this.useAmPm){const e=Le(this.hours).am_pm;t=Pe(t,e)}this.hours=t,this._valueChanged()}_minutesChanged(e){const t=Number(e.target.value);this.minutes=t,this._valueChanged()}_amPmChanged(e){const t=e.target.value;if(Le(this.hours).am_pm==t)return;const i=Le(this.hours).hours;this.hours=Pe(i,"AM"==t?Me.AM:Me.PM),this._valueChanged()}_addTimeOffset(e){let t={mode:this.mode,hours:this.hours,minutes:this.minutes};t=ze(t,e),e.minutes&&(t=Se(t,this.stepSize)),this.mode!=be.Fixed&&(t=Aa(t)),this.hours=t.hours,this.minutes=t.minutes,this._valueChanged()}_valueChanged(){const e={mode:this.mode,hours:this.hours,minutes:this.minutes};Es(this,"value-changed",{value:e})}_onFocus(e){e.currentTarget.select()}formatHours(){const e=this.hours<0||this.minutes<0;let t=this.useAmPm&&this.mode==be.Fixed?Le(this.hours).hours:this.hours;return e&&!this.large?"-"+Math.abs(t).toFixed():this.mode==be.Fixed||this.large?this.large?Math.abs(t):t.toFixed():"+"+Math.abs(t).toFixed()}formatMinutes(){return Math.abs(this.minutes).toString().padStart(2,"0")}};Ea.styles=r`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 4px;
      align-items: center;
    }
    .time-input-wrap {
      display: flex;
      border-radius: var(--mdc-shape-small, 4px) var(--mdc-shape-small, 4px) 0 0;
      overflow: hidden;
      position: relative;
      direction: ltr;
    }
    :host([large]) .time-input-wrap {
      width: 100%;
    }
    div.input {
      display: flex;
    }
    :host([large]) div.input {
      width: 100%;
    }
    div.hours, div.minutes {
      display: flex;
      flex-direction: column;
      width: min-content;
    }
    div.hours ha-icon, div.minutes ha-icon {
      --mdc-icon-size: 42px;
    }
    div.separator {
      display: flex;
      align-items: center;
      font-size: 36px;
    }
    ha-textfield {
      width: 40px;
      text-align: center;
      --mdc-shape-small: 0;
      --text-field-appearance: none;
      --text-field-padding: 0 4px;
      --text-field-suffix-padding-left: 2px;
      --text-field-suffix-padding-right: 0;
      --text-field-text-align: center;
    }
    :host([large]) ha-textfield {
      width: auto;
      --mdc-typography-subtitle1-font-size: 42px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
    }
    ha-textfield.hasSuffix {
      --text-field-padding: 0 0 0 4px;
    }
    ha-textfield:first-child {
      --text-field-border-top-left-radius: var(--mdc-shape-medium);
    }
    ha-textfield:last-child {
      --text-field-border-top-right-radius: var(--mdc-shape-medium);
    }
    div.suffix {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      align-items: center;
      flex-wrap: wrap;
      align-content: center;
    }
    div.mode {
      display: flex;
      align-items: center;
    }
    :host([large]) div.suffix ha-icon, :host([large]) div.mode ha-icon {
      --mdc-icon-size: 32px;
    }
    ha-select {
      --mdc-shape-small: 0;
      width: 85px;
    }
    .label {
      display: flex;
      justify-content: center;
      align-self: center;
      white-space: nowrap;
    }
    ha-button-menu {
      display: flex;
      align-items: flex-end;
      margin-right: 4px;
      padding-bottom: 4px;
    }
    ha-button-menu ha-icon-button {
      color: var(--secondary-text-color);
    }
    mwc-list-item[disabled] ha-icon {
      color: var(--disabled-text-color);
    }
    mwc-list-item[noninteractive] {
      background-color: rgba(var(--rgb-primary-color), 0.12);
      color: var(--sidebar-selected-text-color);
    }
    mwc-list-item[noninteractive] ha-icon {
      color: var(--sidebar-selected-text-color);
    }
    ha-button {
      --ha-button-border-radius: 8px;
      --button-color-fill-loud-hover: var(--ha-color-primary-50);
    }
    ha-button span.large {
      font-size: 16px;
      text-transform: uppercase;
    }
    @media all and (max-width: 450px), all and (max-height: 500px) {
      ha-button {
        --wa-form-control-padding-inline: 10px;
      }
    }
  `,t([le({attribute:!1})],Ea.prototype,"hass",void 0),t([ce()],Ea.prototype,"hours",void 0),t([ce()],Ea.prototype,"minutes",void 0),t([ce()],Ea.prototype,"mode",void 0),t([le({type:Boolean})],Ea.prototype,"autoValidate",void 0),t([le({type:Boolean})],Ea.prototype,"required",void 0),t([le({type:Boolean})],Ea.prototype,"disabled",void 0),t([le({type:String})],Ea.prototype,"label",void 0),t([le({type:Boolean})],Ea.prototype,"useAmPm",void 0),t([le({type:Boolean})],Ea.prototype,"large",void 0),t([le({attribute:!1})],Ea.prototype,"stepSize",void 0),Ea=t([re("scheduler-time-picker")],Ea);let Ta=class extends oe{constructor(){super(...arguments),this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=[]}async showDialog(e){this._params=e,await this.updateComplete,this.selectedWeekdays=this._params.weekdays.filter(e=>![pe.Daily,pe.Weekend,pe.Workday].includes(e)),this.weekdayTypeCustomSelected=this.selectedWeekdays.length>0}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?q`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          ${this.weekdayTypeCustomSelected?q`
          <ha-icon-button
            slot="navigationIcon"
            .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Ls}
            @click=${this.backClick}
          ></ha-icon-button>
            `:q`
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Ps}
          ></ha-icon-button>
          `};
          <span slot="title">
              ${Ui("ui.dialog.weekday_picker.title",this.hass)}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list>
          ${this._renderWeekdayOptions()}
          </mwc-list>
        </div>

        <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${Xi("ui.common.cancel",this.hass)}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
          ?disabled=${!this._params.weekdays.length}
        >
          ${Xi("ui.common.ok",this.hass)}
        </ha-button>
      </ha-dialog>
    `:q``}_renderWeekdayOptions(){let e=[];if(this.weekdayTypeCustomSelected){e=[pe.Sunday,pe.Monday,pe.Tuesday,pe.Wednesday,pe.Thursday,pe.Friday,pe.Saturday];e=((e,t)=>e.concat(e).slice(t,t+e.length))(e,xs(this.hass))}else e=[pe.Daily,pe.Workday,pe.Weekend,"Custom"];const t=e=>{var t,i;return"Custom"==e?null===(t=this._params)||void 0===t?void 0:t.weekdays.every(e=>![pe.Daily,pe.Weekend,pe.Workday].includes(e)):null===(i=this._params)||void 0===i?void 0:i.weekdays.includes(e)};return e.map(e=>q`
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${e}"
          ?hasMeta=${"Custom"==e}
        >
          ${t(e)?q`<ha-icon slot="graphic" icon="mdi:check"></ha-icon>`:""}
          ${"Custom"==e?q`
          
            ${Qi(Ui("ui.dialog.weekday_picker.choose",this.hass))}
            ${t(e)?q`<span class="badge">${this.selectedWeekdays.length}</span>`:""}
            `:Qi(ws(e,"long",this.hass))}

          ${"Custom"==e?q`<ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>`:""}
        </mwc-list-item>
    `)}_toggleSelectOption(e){const t=e.target.getAttribute("option");let i=[...this._params.weekdays];"Custom"==t?(i=this.selectedWeekdays,this.weekdayTypeCustomSelected=!0):[pe.Daily,pe.Weekend,pe.Workday].includes(t)?(i=[t],this.weekdayTypeCustomSelected=!1):i=i.includes(t)?i.filter(e=>e!=t):[...i,t],this._params=Object.assign(this._params,{weekdays:i}),this.requestUpdate()}confirmClick(){const e=Array.from(new Set(this._params.weekdays));this._params.confirm(e)}cancelClick(){this._params.cancel()}backClick(){this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=this._params.weekdays.filter(e=>![pe.Daily,pe.Weekend,pe.Workday].includes(e))}static get styles(){return r`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 350px) {
        ha-dialog {
          --mdc-dialog-min-width: 300px;
        }
      }
      div.wrapper {
        color: var(--primary-text-color);
        padding: 0px 12px;
      }
      mwc-list {
        --mdc-list-vertical-padding: 0px;
      }

      mwc-list-item[disabled] {
        color: var(--disabled-text-color);
      }

      mwc-list-item.nested {
        --mdc-list-side-padding: 36px;
      }
      .badge {
        height: 24px;
        border-radius: 12px;
        background: rgba(var(--rgb-primary-color), 0.3);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 0px 16px;
      }
    `}};t([le({attribute:!1})],Ta.prototype,"hass",void 0),t([ce()],Ta.prototype,"_params",void 0),t([ce()],Ta.prototype,"weekdayTypeCustomSelected",void 0),Ta=t([re("dialog-select-weekdays")],Ta);var Da=Object.freeze({__proto__:null,get DialogSelectWeekdays(){return Ta}});const Ma=(e,t)=>((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()),La=(e,t,i)=>{const s=Object.keys(e.services).includes(t)?Object.keys(e.services[t]).filter(e=>{if(!Object.keys(ts).includes(t))return!1;let s=Object.keys(ts[t]).includes(e);if(!s&&Object.keys(ts[t]).includes("{entity_id}")){if("script"==t&&["turn_on","turn_off","reload","toggle","test"].includes(e))return!1;s=Gi(`${t}.${e}`,i)}return s}):[],a=t=>Xi(`component.${t}.title`,e,!1)||t.replace(/_/g," "),o=s=>{const o=Xi(`component.${t}.services.${s}.name`,e,!1)||!!e.services[t]&&!!e.services[t][s]&&e.services[t][s].name||s.replace(/_/g," ");return"script"==t?Object.keys(i.customize||{}).includes(`${t}.${s}`)&&Be(i.customize[`${t}.${s}`].name)?i.customize[`${t}.${s}`].name:o:`${a(t)}: ${o}`},n=i=>{let s=Xi(`component.${t}.services.${i}.description`,e,!1);return s||(s=e.services[t][i].description),s||"script"!=t||(s=Xi(`component.${t}.services.turn_on.description`,e,!1)),s};let r=s.map(s=>{return{key:s,name:o(s),description:n(s),icon:(a=s,"script"==t&&Object.keys(i.customize||{}).includes(`${t}.${a}`)&&Be(i.customize[`${t}.${a}`].icon)?i.customize[`${t}.${a}`].icon:Object.keys(cs).includes(t)&&Object.keys(cs[t].services).includes(a)?cs[t].services[a]:Rs(t)),action:{service:s.includes(".")?s:`${t}.${s}`,service_data:{},target:e.services[t][s].target?{}:void 0}};var a}),d=(l=i.customize||{},c=t,Object.keys(l).filter(e=>{var t;return null===(t=l[e].exclude_actions)||void 0===t?void 0:t.length}).filter(e=>!c||!c.includes(".")&&Ki(Wi(e),c)||Ki(e,c)).map(e=>l[e].exclude_actions).flat().filter(Be));var l,c;return d.length&&(r=r.filter(t=>!d.some(s=>Ma(Bi(t.action.service),s)>0||Ma(fs(t.action,e,i.customize),s)>0))),os(i.customize||{},t).forEach(e=>{let i=e.service;for(;r.find(e=>e.key==i);)i+="_2";e.variables&&Object.entries(e.variables).forEach(([t,i])=>{let s=ps(i),a=wa(s);!Be(e.service_data[t])&&Be(a)?e=Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{[t]:a})}):Be(e.service_data[t])||(e=Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{[t]:null})}))}),r.push({key:i,name:`${a(t)}: ${Pa(e.name||o(Bi(e.service)))}`,description:Pa(e.name||""),icon:e.icon||Rs(t),action:{service:e.service.includes(".")?e.service:`${t}.${e.service}`,service_data:e.service_data||{},target:e.target?e.target:void 0,name:e.name,icon:e.icon}})}),r},Pa=e=>{if(null!==/<.+?>/g.exec(e)){e=(new DOMParser).parseFromString(e,"text/html").body.textContent||""}let t;for(;t=/\[([^\]]+)\]/.exec(e);)e=e.replace(t[0],"");for(;t=/\{([^\}]+)\}/.exec(e);)e=e.replace(t[0],"");return e};let Na=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0,this.lockDomain=!1}async showDialog(e){this._params=e,e.domainFilter&&(this.lockDomain=!0),await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title"),this.hass.loadBackendTranslation("services")}render(){return this._params?q`
      <ha-dialog
        open
        .heading=${!0}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            ${void 0===this._params.domainFilter||this.lockDomain?q`
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Ps}
            ></ha-icon-button>
            `:q`
            <ha-icon-button
              slot="navigationIcon"
              .label=${Xi("ui.common.back",this.hass)}
              .path=${Ls}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${Ui("ui.dialog.action_picker.title",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${Xi("ui.common.search",this.hass)}
            aria-label=${Xi("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${Xi("ui.common.clear",this.hass)}
                  .path=${Ps}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${Zs({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_renderOptions(){var e;if(null===(e=this._params)||void 0===e?void 0:e.domainFilter)return this._renderDomainActions();const t=Hs(this.hass,this._params.cardConfig);return 1===t.length?(this._params=Object.assign(Object.assign({},this._params),{domainFilter:[t[0].key]}),this._renderDomainActions()):this._renderDomainList(t)}_renderDomainList(e){e.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))}));let t=[];for(var i=e.length;i<7;i++)t.push(0);return Object.keys(e).length?q`
      ${Object.keys(e).map(t=>q`
        <mwc-list-item
          graphic="icon"
          hasMeta
          @click=${()=>this._handleDomainClick(e[t].key)}
        >
          <ha-icon slot="graphic" icon="${e[t].icon}"></ha-icon>
          <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
          <span>${e[t].name}</span>
        </mwc-list-item>`)}
        ${t.map(e=>q`
        <mwc-list-item
          graphic="icon"
          hasMeta
          noninteractive
        >
        </mwc-list-item>
        `)}
      `:q`
          <mwc-list-item disabled>
            ${Xi("ui.components.combo-box.no_match",this.hass)}
          </mwc-list-item>
        `}_renderDomainActions(){var e;let t=this._params.domainFilter.map(e=>La(this.hass,e,this._params.cardConfig)).flat();return(null===(e=this._params.entityFilter)||void 0===e?void 0:e.length)&&(t=t.filter(e=>{var t;return null===(t=this._params.entityFilter)||void 0===t?void 0:t.every(t=>{const i=ns(e.action,this._params.cardConfig.customize),s=this.hass.states[t];return!(i.supported_features&&!((s.attributes.supported_features||0)&i.supported_features))&&((!Object.keys(e.action.service_data).includes("entity_id")||e.action.service_data.entity_id==t)&&(!Object.keys(e.action.target||{}).includes("entity_id")||(e.action.target||{}).entity_id==t))})})),this._filter&&(t=t.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(t).length?Object.keys(t).map(e=>q`
        <mwc-list-item
          graphic="icon"
          @click=${()=>this._handleActionClick(t[e])}
          twoline
        >
          <ha-icon slot="graphic" icon="${t[e].icon}"></ha-icon>
          <span>${t[e].name}</span>
          <span slot="secondary">${t[e].description}</span>
        </mwc-list-item>
    `):q`
          <mwc-list-item disabled>
            ${Xi("ui.components.combo-box.no_match",this.hass)}
          </mwc-list-item>
        `}_handleDomainClick(e){this._params=Object.assign(Object.assign({},this._params),{domainFilter:[e]}),this._clearSearch()}_clearDomain(){this._params=Object.assign(Object.assign({},this._params),{domainFilter:void 0}),this._clearSearch()}_handleActionClick(e){this._params.confirm(e.action),this._params=void 0,this._clearSearch()}_clearSearch(){this._search="",this._filter=""}static get styles(){return r`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 550px) {
        ha-dialog {
          --mdc-dialog-min-width: 500px;
        }
      }
      ha-textfield {
        display: block;
        margin: 0 16px;
      }
    `}};t([le({attribute:!1})],Na.prototype,"hass",void 0),t([ce()],Na.prototype,"_params",void 0),t([ce()],Na.prototype,"_search",void 0),t([ce()],Na.prototype,"_filter",void 0),t([ce()],Na.prototype,"_width",void 0),t([ce()],Na.prototype,"_height",void 0),t([ce()],Na.prototype,"lockDomain",void 0),Na=t([re("dialog-select-action")],Na);var Ia=Object.freeze({__proto__:null,get DialogSelectAction(){return Na}});let qa=class extends oe{constructor(){super(...arguments),this.showPrefix=!1}render(){return q`
      ${this.showPrefix?q`
      <div class="prefix-wrap">
        <div class="prefix"><slot name="prefix"></slot></div>
        <div class="body">
          <div class="heading"><slot name="heading"></slot></div>
          <div class="secondary"><slot name="description"></slot></div>
        </div>
      </div>
      `:q`
      <div class="body">
        <div class="heading"><slot name="heading"></slot></div>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      `}
      <div class="content"><slot></slot></div>
    `}static get styles(){return r`

    :host {
      display: flex;
      padding: 0px;
      align-content: normal;
      align-self: auto;
      align-items: center;
    }
    .body {
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 0;
      padding-inline-start: 0;
      padding-right: 16x;
      padding-inline-end: 16px;
      overflow: hidden;
      align-content: center;
    }
    .body > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      padding: 8px 0;
    }
    // .content ::slotted(*) {
    //   width: var(--settings-row-content-width);
    // }
    .prefix-wrap {
      display: flex;
      flex-direction: row;
    }
    .prefix {
      display: flex;
      width: 48px;
    }
    .heading, .heading ::slotted(*) {
      display: flex;
      align-items: center;
      width: 150px;
    }
    @media all and (max-width: 450px) {
      :host {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        padding: 8px 16px;
      }
      .prefix-wrap {
        display: flex;
        align-items: center;
      }
      .content ::slotted(*) {
        width: 100%;
      }
    `}};t([le({type:Boolean})],qa.prototype,"showPrefix",void 0),qa=t([re("scheduler-settings-row")],qa);let Va=class extends oe{constructor(){super(...arguments),this.selectedSlot=null,this.large=!1,this.selectedEntry=0}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){return q`
    ${this.schedule.entries.map((e,t)=>q`
      
      <div class="editor-header">
        <div class="weekdays">
          <span>
            ${Ui("ui.panel.editor.repeated_days",this.hass)}:
            ${js(e.weekdays,"short",this.hass)}
          </span>
          <ha-icon-button .path=${Is} @click=${e=>this._showWeekdayDialog(e,t)}></ha-icon-button>
        </div>
        <div class="weekdays-actions">
        <ha-button appearance="plain" size="small" @click=${this.toggleViewMode}>
          ${this.viewMode==me.Scheme?Ui("ui.panel.editor.toggle_single_mode",this.hass):Ui("ui.panel.editor.toggle_scheme_mode",this.hass)}
          <ha-icon slot="end" icon="mdi:swap-horizontal"></ha-icon>
        </ha-button>
        </div>
      </div>

      ${this.viewMode==me.Scheme?q`
      <div class="editor-header">
        <div class="weekdays">
          ${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}:
        </div>
        ${this.renderActionButtons()}
      </div>
      <scheduler-timeslot-editor
        .hass=${this.hass}
        .config=${this.config}
        .schedule=${e}
        .selectedSlot=${this.selectedSlot}
        @update=${e=>this._handleUpdate(e,t)}
        .large=${this.large}
      >
      </scheduler-timeslot-editor>
      `:q`
          ${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}:
          <scheduler-time-picker
            .hass=${this.hass}
            .time=${this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${De(this.hass.locale)}
            .stepSize=${this.config.time_step||15}
            large
          >
          </scheduler-time-picker>
      `}
    `)}

    ${this.renderSlot()}
    `}toggleViewMode(){const e=this.viewMode==me.Scheme?me.Single:me.Scheme;this.dispatchEvent(new CustomEvent("setViewMode",{detail:e}))}renderActionButtons(){if(null===this.selectedSlot||null===this.selectedEntry)return q``;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start,t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].stop||e,i=Ae(e,this.hass),s=(Ae(t,this.hass)||86400)-i;return q`
      <div class="actions">
        <ha-icon-button .path=${Ls} @click=${e=>{this._updateSelectedSlot(this.selectedSlot-1),e.target.blur()}} ?disabled=${null===this.selectedSlot||this.selectedSlot<1}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"} @click=${e=>{this._updateSelectedSlot(this.selectedSlot+1),e.target.blur()}} ?disabled=${null===this.selectedSlot||this.selectedSlot>this.schedule.entries[this.selectedEntry].slots.length-2}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M19,6H22V8H19V11H17V8H14V6H17V3H19V6M17,17V14H19V19H3V6H11V8H5V17H17Z"} @click=${this._addTimeslot} ?disabled=${s<1800}>
        </ha-icon-button>
        <ha-icon-button .path=${"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length<=2}>
        </ha-icon-button> 
      </div>
    `}renderSlot(){if(null===this.selectedEntry||null===this.selectedSlot)return q`
        <div class="slot-placeholder"> 
          ${Ui("ui.panel.editor.select_timeslot",this.hass)}
        </div>
      `;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];let t=e.stop;return!t&&this.selectedSlot<this.schedule.entries[this.selectedEntry].slots.length-1&&(t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot+1].start),t||(t=e.start),q`
      ${this.viewMode==me.Scheme?q`
      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${Ui("ui.panel.editor.start_time",this.hass)}:"
            ?disabled=${0==this.selectedSlot}
            .time=${e.start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${De(this.hass.locale)}
          >
          </scheduler-time-picker>
        </div>
        <div class="column">

          <div style="display: flex; flex-direction: row">
          <mwc-checkbox
            ?checked=${void 0!==e.stop}
            @change=${this._toggleStopTime}
          >
          </mwc-checkbox>

          <scheduler-time-picker
            .hass=${this.hass}
            label="${Ui("ui.panel.editor.stop_time",this.hass)}:"
            ?disabled=${void 0===e.stop||this.selectedSlot==this.schedule.entries[this.selectedEntry].slots.length-1}
            .time=${t}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${De(this.hass.locale)}
          >
          </scheduler-time-picker>
          </div>
        </div>
      </div>`:""}

      ${Ui("ui.panel.editor.action",this.hass)}:
      ${this._renderActionConfig()}
    `}_renderActionConfig(){var e,t,i,s;const a=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]),o=a.actions.length?a.actions[0]:void 0;if(!o)return q`
      <div>
        <ha-button appearance="plain"
          @click=${this._showActionDialog}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${Ui("ui.panel.editor.add_action",this.hass)}
        </ha-button>
      </div>
    `;const n=ns(o,this.config.customize),r=(null===(e=n.target)||void 0===e?void 0:e.domain)||Wi(o.service),d=Be(null===(t=null==n?void 0:n.target)||void 0===t?void 0:t.entity_id)||this.schedule.entries[this.selectedEntry].slots.some(e=>{var t,i;return e.actions.length&&Be(null===(i=null===(t=ns(e.actions[0],this.config.customize))||void 0===t?void 0:t.target)||void 0===i?void 0:i.entity_id)});if(void 0===n)return q``;const l=Object.keys(n.fields||{}).filter(e=>pa(o,e,this.hass,this.config.customize));let c="",u=[(null===(i=o.target)||void 0===i?void 0:i.entity_id)||[]].flat();return!u.length&&["notify","script"].includes(r)&&(u=[o.service]),u.length&&(c+=u.map(e=>Os(e,this.hass,this.config.customize)).join(", "),c+=": "),c+=fs(o,this.hass,this.config.customize,!1,!0),q`
      <scheduler-collapsible-section
        ?expanded=${!0}
        ?disabled=${!0}
      >
        <div slot="header" class="header">
          <ha-icon slot="icon" icon="${xa(o,this.config.customize)}"></ha-icon>
          <span>${Qi(c)}</span>
        </div>

        <ha-button-menu
          slot="contextMenu" 
          @action=${this._actionItemOptionsClick}
          @closed=${e=>{e.stopPropagation()}}
          @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
          fixed
        >
          <ha-icon-button slot="trigger" .path=${Ns}>
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${Xi("ui.panel.lovelace.editor.card.conditional.change_type",this.hass)}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${Xi("ui.common.delete",this.hass)}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

          ${n.target?q`
          <scheduler-settings-row>
            <span slot="heading">${Xi("ui.components.entity.entity-picker.entity",this.hass)}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${r}
              .filterFunc=${e=>!n.supported_features||((e.attributes.supported_features||0)&n.supported_features)>0}
              @value-changed=${this._selectEntity}
              .value=${[(null===(s=o.target)||void 0===s?void 0:s.entity_id)||[]].flat()}
              ?multiple=${!0}
              ?disabled=${d}
            >
            </scheduler-entity-picker>
          </scheduler-settings-row>
          `:""}

          ${l.map(e=>{var t;const i=us(o.service,null===(t=o.target)||void 0===t?void 0:t.entity_id,e,this.hass,this.config.customize);if(null===i)return"";let s=n.fields[e].optional||(i.number||{}).optional;const a=!s||Object.keys(o.service_data).includes(e);return q`
            <scheduler-settings-row ?showPrefix=${s}>
              ${s?q`
                <ha-checkbox
                  slot="prefix"
                  ?checked=${a}
                  @change=${t=>this._toggleOptionalField(t,e,i)}
                >
                </ha-checkbox>
              `:""}
              <span slot="heading">
                ${((e,t,i,s)=>{var a;const o=Wi(e.service),n=Bi(e.service);let r=Xi(`component.${o}.services.${n}.fields.${t}.name`,i,!1);!r&&i.services[o]&&i.services[o][e.service]&&i.services[o][e.service].fields&&i.services[o][e.service].fields[t]&&(r=String(i.services[o][e.service].fields[t].name));const d=["script","notify"].includes(o)?[e.service]:[(null===(a=e.target)||void 0===a?void 0:a.entity_id)||[]].flat();let l=os(s||{},d.length?d[0]:o);if(l.length){let i=l.map(i=>{if(i.service!=e.service||!Object.keys(i.variables||{}).includes(t))return null;return(i.variables||{})[t].name}).filter(Be);if(i.length)return i[0]}return r||(r=t.replace(/_/g," ")),r})(o,e,this.hass,this.config.customize)}
              </span>
              <scheduler-combo-selector
                .hass=${this.hass}
                .config=${i}
                ?disabled=${!a}
                .value=${Object.keys(o.service_data).includes(e)?o.service_data[e]:void 0}
                @value-changed=${t=>this._selectField(e,t)}
              >
              </scheduler-combo-selector>
            </scheduler-settings-row>
          `})}
        </div>
      </scheduler-collapsible-section>
    `}_selectField(e,t){const i=t.detail.value,s=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);let a=void 0!==i?Object.assign(Object.assign({},s.actions[0]),{service_data:Object.assign(Object.assign({},s.actions[0].service_data),{[e]:i})}):Object.assign(Object.assign({},s.actions[0]),{service_data:Object.fromEntries(Object.entries(s.actions[0].service_data).filter(([t])=>t!=e))});this._updateSlot({actions:[a]})}_toggleOptionalField(e,t,i){const s=e.target.checked,a=s?wa(i):void 0;s?this._selectField(t,new CustomEvent("value-changed",{detail:{value:Be(a)?a:null}})):this._selectField(t,new CustomEvent("value-changed",{detail:{value:void 0}}))}_selectEntity(e){const t=e.detail.value;t&&this.schedule.entries[this.selectedEntry].slots.forEach((e,i)=>{if(!e.actions.length)return;let s=Object.assign(Object.assign({},e.actions[0]),{target:{entity_id:t}});this._updateSlot({actions:[s]},i)})}_handleUpdate(e,t){this.selectedEntry=t,e.detail.hasOwnProperty("selectedSlot")?(this._updateSelectedSlot(e.detail.selectedSlot),this.selectedSlot=e.detail.selectedSlot):e.detail.hasOwnProperty("slots")&&this._updateEntry({slots:e.detail.slots})}_updateSelectedSlot(e){this.dispatchEvent(new CustomEvent("change",{detail:{selectedSlot:e}}))}_updateEntry(e){let t=Object.assign({},this.schedule.entries[this.selectedEntry]);t=Object.assign(Object.assign({},t),e),this.schedule=Object.assign(Object.assign({},this.schedule),{entries:Object.assign(this.schedule.entries,{[this.selectedEntry]:t})})}_updateSlot(e,t=this.selectedSlot){let i=Object.assign({},this.schedule.entries[this.selectedEntry].slots[t]);i=Object.assign(Object.assign({},i),e),this._updateEntry({slots:Object.assign(this.schedule.entries[this.selectedEntry].slots,{[t]:i})})}async _showWeekdayDialog(e,t){this.selectedEntry=t,await new Promise(i=>{const s={weekdays:[...this.schedule.entries[t].weekdays],cancel:()=>i(null),confirm:e=>i(e)};Es(e.target,"show-dialog",{dialogTag:"dialog-select-weekdays",dialogImport:()=>Promise.resolve().then((function(){return Da})),dialogParams:s})}).then(e=>{e&&this._updateEntry({weekdays:e})})}async _showActionDialog(e){let t=[],i=[];this.schedule.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var s,a;i=[...i,...[(null===(s=e.target)||void 0===s?void 0:s.entity_id)||[]].flat()],t=[...t,...[Wi(e.service),...[(null===(a=e.target)||void 0===a?void 0:a.entity_id)||[]].flat()].map(Wi)]})})}),t=[...new Set(t)],i=[...new Set(i)],await new Promise(s=>{const a={cancel:()=>s(null),confirm:e=>s(e),domainFilter:t.length?t:void 0,entityFilter:i.length?i:void 0,cardConfig:this.config};Es(e.target,"show-dialog",{dialogTag:"dialog-select-action",dialogImport:()=>Promise.resolve().then((function(){return Ia})),dialogParams:a})}).then(e=>{if(!e)return;Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);const t=this.schedule.entries[this.selectedEntry].slots.find(e=>{var t;return e.actions.length?null===(t=e.actions[0].target)||void 0===t?void 0:t.entity_id:void 0});let i=Object.assign({},e);t&&i.target&&(i=Object.assign(Object.assign({},i),{target:t.actions[0].target})),this._updateSlot({actions:[i]})})}_actionItemOptionsClick(e){switch(e.detail.index){case 0:this._showActionDialog(e);break;case 1:this._updateSlot({actions:[]})}}_stopTimeChanged(e){let t=e.detail.value,[i,s]=za([...this.schedule.entries[this.selectedEntry].slots],Number(this.selectedSlot),{stop:t},this.hass);this._updateEntry({slots:i}),s!=this.selectedSlot&&this._updateSelectedSlot(s)}_startTimeChanged(e){let t=e.detail.value,[i,s]=za([...this.schedule.entries[this.selectedEntry].slots],Number(this.selectedSlot),{start:t},this.hass);this._updateEntry({slots:i}),s!=this.selectedSlot&&this._updateSelectedSlot(s)}_toggleStopTime(e){const t=e.target.checked,i=Number(this.selectedSlot);let s=[...this.schedule.entries[this.selectedEntry].slots];if(t){let e=i+1,t=s[e].start;s[i+1].actions.length||(t=s[i+1].stop,e=i+2),s=[...s.slice(0,i),Object.assign(Object.assign({},s[i]),{stop:t}),...s.slice(e)]}else{const e=ze(Ce(s[i].start),{minutes:1});Ae(s[i].stop,this.hass)-Ae(e,this.hass)!=0&&(s=[...s.slice(0,i+1),{start:Ne(e),stop:s[i].stop,actions:[],conditions:s[i].conditions},...s.slice(i+1)]),Object.assign(s,{[i]:Object.assign(Object.assign({},s[i]),{stop:void 0})})}this._updateEntry({slots:s})}_addTimeslot(e){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i,s)=>{let a=[...e.entries[t].slots],o=Ce(a[i].start),n=void 0===a[i].stop?o:Ce(a[i].stop);if(n.mode!==be.Fixed||n.hours||n.minutes||(n=Object.assign(Object.assign({},n),{hours:24})),[be.Sunrise,be.Sunset].includes(o.mode)){const e=o.mode==be.Sunrise?s.states["sun.sun"].attributes.next_rising:s.states["sun.sun"].attributes.next_setting;let t=Ce(e);o=ze(t,{hours:o.hours,minutes:o.minutes})}const r=Ae(o,s),d=(Ae(n,s)-r)/2,l=Math.floor(d/3600),c=Math.round((d-3600*l)/60);let u=ze(o,{hours:l,minutes:c});return u=Se(u,15),a=[...a.slice(0,i),Object.assign(Object.assign({},a[i]),{stop:Ne(u)}),Object.assign(Object.assign({},a[i]),{start:Ne(u),stop:Ne(n),actions:[]}),...a.slice(i+1)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:a})})})})(this.schedule,this.selectedEntry,this.selectedSlot,this.hass),e.target.blur())}_removeTimeslot(e){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i)=>{let s=[...e.entries[t].slots];const a=i==s.length-1?i-1:i;return s=[...s.slice(0,a),Object.assign(Object.assign({},s[a+1]),{start:s[a].start,stop:s[a+1].stop}),...s.slice(a+2)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:s})})})})(this.schedule,this.selectedEntry,this.selectedSlot),this.selectedSlot>=this.schedule.entries[this.selectedEntry].slots.length&&(this.selectedSlot=this.schedule.entries[this.selectedEntry].slots.length-1),e.target.blur())}static get styles(){return r`
  :host {
    position: relative;
  }
  .two-column {
    display: flex;
    flex-direction: row;
    margin: 16px 0px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .two-column .column {
    display: flex;
    flex-direction: column;
    flex: 0 0 215px;
  }
  div.editor-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .weekdays {
    display: flex;
    flex: 1;
    align-items: center;
    white-space: nowrap;
  }
  .weekdays-actions {
    display: flex;
    align-items: center;
  }
  div.actions {
    display: flex;
    align-items: end;
    margin: -4px 0px 0px 0px;
  }
  @media all and (max-width: 150px) {
    div.editor-header {
      flex-direction: column;
      margin-top: 0px;
    }
    div.actions {
      align-self: flex-end;
    }
  }
  div.slot-placeholder {
    padding: 20px 0px 0px 0px;
  }
  scheduler-collapsible-section .header ha-icon {
    margin-right: 6px;
  }
  scheduler-collapsible-section .header span {
    flex: 1;
  }
  mwc-checkbox {
    align-self: center;
  }
  mwc-list-item.warning, mwc-list-item.warning ha-icon {
    color: var(--error-color);
  }
    `}};t([le({attribute:!1})],Va.prototype,"hass",void 0),t([le({attribute:!1})],Va.prototype,"config",void 0),t([le({attribute:!1})],Va.prototype,"viewMode",void 0),t([le({attribute:!1})],Va.prototype,"selectedSlot",void 0),t([le({type:Boolean})],Va.prototype,"large",void 0),t([ce()],Va.prototype,"schedule",void 0),t([ce()],Va.prototype,"selectedEntry",void 0),Va=t([re("scheduler-main-panel")],Va);const Ra=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ha(e){return e.toISOString().split("T")[0]}function Fa(e){let t=new Date;const i=(e||"").match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);null!==i&&t.setFullYear(Number(i[1]),Number(i[2])-1,Number(i[3]));const s=(e||"").match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);return null!==s&&t.setHours(Number(s[1]),Number(s[2]),s.length>4?Number(s[4]):t.getSeconds()),t}const Ua=(e,t)=>"select"in t&&null!==t.select?((e,t)=>{var i;return((null===(i=t.select)||void 0===i?void 0:i.options)||[]).some(t=>"object"==typeof t?t.value==e:t==e)})(String(e),t):"number"in t&&null!==t.number?((e,t)=>{var i,s;return!isNaN(e)&&(!(void 0!==(null===(i=t.number)||void 0===i?void 0:i.min)&&e<t.number.min)&&!(void 0!==(null===(s=t.number)||void 0===s?void 0:s.max)&&e>t.number.max))})(Number(e),t):!("text"in t)||null===t.text||String(e).length>0,Ba=e=>null==e||Array.isArray(e)?e:[e];let Wa=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0}async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title")}render(){return this._params?q`
      <ha-dialog
        open
        .heading=${!0}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Ps}
            ></ha-icon-button>
            <span slot="title">
              ${Ui("ui.panel.options.conditions.add_condition",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${Xi("ui.common.search",this.hass)}
            aria-label=${Xi("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${Xi("ui.common.clear",this.hass)}
                  .path=${Ps}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>

        <mwc-list
          style=${Zs({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_clearSearch(){this._search="",this._filter=""}_renderOptions(){let e=Qs(this.hass,this._params.cardConfig);return e.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(e).map(t=>q`
        <mwc-list-item
          graphic="icon"
          @click=${()=>this._handleDomainClick(e[t].key)}
        >
          <ha-icon slot="graphic" icon="${e[t].icon}"></ha-icon>
          <span>${e[t].name}</span>
        </mwc-list-item>
    `)}_handleDomainClick(e){this._params=Object.assign(Object.assign({},this._params),{domain:e}),this._params.confirm(e),this._params=void 0,this._clearSearch()}static get styles(){return r`
      ha-dialog {
        --dialog-content-padding: 0;
        --mdc-dialog-max-height: 60vh;
      }
      @media all and (min-width: 550px) {
        ha-dialog {
          --mdc-dialog-min-width: 500px;
        }
      }
      ha-textfield {
        display: block;
        margin: 0 16px;
      }
    `}};t([le({attribute:!1})],Wa.prototype,"hass",void 0),t([ce()],Wa.prototype,"_params",void 0),t([ce()],Wa.prototype,"_search",void 0),t([ce()],Wa.prototype,"_filter",void 0),t([ce()],Wa.prototype,"_width",void 0),t([ce()],Wa.prototype,"_height",void 0),Wa=t([re("dialog-select-condition")],Wa);var Za=Object.freeze({__proto__:null,get DialogSelectCondition(){return Wa}});let Ka=class extends oe{constructor(){super(...arguments),this.conditionIdx=-1,this.conditionValid=!0,this.startDate="",this.endDate="",this.tags=[],this.customTagValue=""}async firstUpdated(){var e,t;(await window.loadCardHelpers()).importMoreInfoControl("input_datetime"),this.startDate=(null===(e=this.schedule)||void 0===e?void 0:e.start_date)||Ha(new Date),this.endDate=(null===(t=this.schedule)||void 0===t?void 0:t.end_date)||Ha(new Date);const i=(await Ds(this.hass)).map(e=>e.name),s=[this.config.tags||[]].flat();this.tags=[...new Set([...i,...s.filter(e=>!i.includes(e)&&!["none","disabled","enabled"].includes(e))])]}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){const e={select:{options:this.tags,multiple:!0,custom_value:!0}};return q`
      <div class="header first">
        <span>${Ui("ui.panel.options.conditions.header",this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length?q`
        <ha-button-menu
          @action=${this._conditionConfigOptionsClick}
          @closed=${e=>{e.stopPropagation()}}
          @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
          fixed
          menuCorner="END"
          corner="BOTTOM_END"
        >
          <ha-icon-button
            slot="trigger"
            .path=${"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length<2}>
            ${this.schedule.entries[0].slots[0].conditions.type==_e.Or?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Ui("ui.panel.options.conditions.options.logic_or",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length<2}>
            ${this.schedule.entries[0].slots[0].conditions.type==_e.And?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Ui("ui.panel.options.conditions.options.logic_and",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon">

            ${this.schedule.entries[0].slots[0].conditions.track_changes?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Ui("ui.panel.options.conditions.options.track_changes",this.hass)}
          </mwc-list-item>
        </ha-button-menu>
        `:""}
        </div>
        <scheduler-collapsible-group
          ?disabled=${!this.conditionValid}
          @openclose-changed=${this._updateActiveCondition}
          .openedItem=${this.conditionIdx}
        >
        ${this.renderConditions()}
        </scheduler-collapsible-group>

      <div>
        <ha-button appearance="plain"
          @click=${this._conditionAddClick}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${Ui("ui.panel.options.conditions.add_condition",this.hass)}
        </ha-button>
      </div>


      <span class="header">${Ui("ui.panel.options.period.header",this.hass)}:</span>
      <div class="period">
        <ha-checkbox
          ?checked=${"string"==typeof this.schedule.start_date}
          @change=${this.toggleEnableDateRange}
        >
        </ha-checkbox>
        <span>${Ui("ui.panel.options.period.start_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${Xi("ui.components.date-range-picker.start_date",this.hass)}
          @value-changed=${this._setStartDate}
          ?disabled=${!this.schedule.start_date}
        >
        </ha-date-input>
        <span>${Ui("ui.panel.options.period.end_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${Xi("ui.components.date-range-picker.end_date",this.hass)}
          @value-changed=${this._setEndDate}
          ?disabled=${!this.schedule.end_date}
        >
        </ha-date-input>
      </div>

      <span class="header">${Xi("ui.common.name",this.hass)}:</span>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name||""}
          placeholder=${this.schedule.name?"":Xi("ui.common.name",this.hass)}
          @input=${this.updateName}
        ></ha-textfield>
      </div>

      <span class="header">${Ui("ui.panel.options.tags",this.hass)}:</span>
      <div>
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${e}
          .value=${this.schedule.tags||[]}
          @value-changed=${this.tagsUpdated}
        >
        </scheduler-combo-selector>

        <ha-button-menu
          @closed=${e=>{e.stopPropagation(),e.target.querySelector("ha-button").blur()}}
          @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
          @opened=${e=>{e.target.querySelector("ha-textfield").focus()}}
          fixed
          menuCorner="END"
          corner="BOTTOM_START"
        >
          <ha-button appearance="plain" slot="trigger">
            <ha-icon slot="start" icon="mdi:plus"></ha-icon>
            ${Xi("ui.panel.config.tag.add_tag",this.hass)}
          </ha-button>

          <div style="display: flex; align-items: center; padding: 0px 2px 0px 8px">
            <ha-textfield
              .value=${this.customTagValue}
              .label=${Xi("ui.panel.config.tag.add_tag",this.hass)}
              @input=${e=>{this.customTagValue=e.currentTarget.value}}
              @keydown=${e=>{"Enter"===e.key&&this._customTagConfirmClick(e)}}
              .placeholder=""
            ></ha-textfield> 
            <ha-button
              appearance="plain"
              @click=${this._customTagConfirmClick}
            >
              ${Xi("ui.common.ok",this.hass)}
            </ha-button>
          </div>
        </ha-button-menu>
      </div>

      <span class="header">${Ui("ui.panel.options.repeat_type",this.hass)}:</span>
      <ha-button
        appearance="${this.schedule.repeat_type==fe.Repeat?"filled":"plain"}"
        variant="${this.schedule.repeat_type==fe.Repeat?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${fe.Repeat}"
      >
        <ha-icon slot="start" icon="mdi:refresh"></ha-icon>
        ${Xi("ui.components.calendar.event.repeat.label",this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type==fe.Pause?"filled":"plain"}"
        variant="${this.schedule.repeat_type==fe.Pause?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${fe.Pause}"
      >
        <ha-icon slot="start" icon="mdi:stop"></ha-icon>
        ${Xi("ui.dialogs.more_info_control.vacuum.stop",this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type==fe.Single?"filled":"plain"}"
        variant="${this.schedule.repeat_type==fe.Single?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${fe.Single}"
      >
        <ha-icon slot="start" icon="mdi:trash-can-outline"></ha-icon>
        ${Xi("ui.common.delete",this.hass)}
      </ha-button>
    `}renderConditions(){let e=this.schedule.entries[0].slots[0].conditions.items;return this.conditionIdx==e.length&&(e=[...e,{}]),e.map((e,t)=>{var i;const s=this.conditionIdx==t?this.selectedEntity||e.entity_id||"":e.entity_id||"",a=this.conditionIdx==t&&this.selectedDomain||Wi(s),o=Ys(s||a,this.hass,this.config.customize),n=o&&o.hasOwnProperty("number")?[ge.Above,ge.Below]:[ge.Equal,ge.Unequal],r={[ge.Equal]:"mdi:equal",[ge.Unequal]:"mdi:not-equal-variant",[ge.Above]:"mdi:greater-than",[ge.Below]:"mdi:less-than"},d={[ge.Equal]:"ui.panel.options.conditions.types.equal_to",[ge.Unequal]:"ui.panel.options.conditions.types.unequal_to",[ge.Above]:"ui.panel.options.conditions.types.above",[ge.Below]:"ui.panel.options.conditions.types.below"};return this.conditionIdx!==t||this.selectedMatchType||(this.selectedMatchType=n[0]),q`
      <scheduler-collapsible-section idx="${t}">
        <div slot="header">
          ${e.entity_id&&void 0!==e.value?q`
          <ha-icon slot="icon" icon="${Xs(e.entity_id,this.config.customize,this.hass)}"></ha-icon>
          ${Qi(Ui(d[e.match_type],this.hass,["{entity}","{value}"],[Os(e.entity_id,this.hass,this.config.customize)||"",null!==(i=ds(e.value,o,this.hass))&&void 0!==i?i:""]))}
          `:Ui("ui.panel.options.conditions.add_condition",this.hass)}
        </div>
        <ha-button-menu
          slot="contextMenu" 
          @action=${e=>this._conditionItemOptionsClick(e,t)}
          @closed=${e=>{e.stopPropagation()}}
          @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
          fixed
          ?disabled=${!this.conditionValid&&this.conditionIdx!==t&&-1!=this.conditionIdx}
        >
          <ha-icon-button
            slot="trigger"
            .path=${Ns}
            ?disabled=${!this.conditionValid&&this.conditionIdx!==t&&-1!=this.conditionIdx}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${Xi("ui.panel.lovelace.editor.card.conditional.change_type",this.hass)}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${Xi("ui.common.delete",this.hass)}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

        <scheduler-settings-row>
          <span slot="heading">
            ${Xi("ui.components.selectors.selector.types.entity",this.hass)}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${a}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx==t?Ba(this.selectedEntity):Ba(e.entity_id)}
            ?multiple=${!1}
          >
          </scheduler-entity-picker>
        </scheduler-settings-row>

        <scheduler-settings-row>
          <span slot="heading">
            ${Qi(Ui(d[this.conditionIdx==t?this.selectedMatchType:e.match_type],this.hass,["{entity}","{value}"],["",""]))}
            <ha-button-menu
              @action=${e=>this._selectMatchType(e,n)}
              @closed=${e=>{e.stopPropagation()}}
              fixed
            >
              <ha-icon-button slot="trigger" .path=${Is}>
              </ha-icon-button>
              ${n.map(i=>q`
                <mwc-list-item graphic="icon" ?noninteractive=${this.conditionIdx==t?this.selectedMatchType==i:e.match_type==i}>
                  ${Qi(Ui(d[i],this.hass,["{entity}","{value}"],["",""]))}
                  <ha-icon slot="graphic" icon="${r[i]}"></ha-icon>
                </mwc-list-item>
              `)}
            </ha-button-menu>
          </span>
          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${o}
            .value=${this.conditionIdx==t?this.conditionValue:e.value}
            @value-changed=${this._conditionValueChanged}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>
        </div>
      </scheduler-collapsible-section>
    `})}_updateActiveCondition(e){const t=e.detail.item;if(t<0)return void(this.conditionIdx=-1);if(t===this.conditionIdx)return;this.conditionIdx=t;const i=this.schedule.entries[0].slots[0].conditions.items[t];this.selectedEntity=i?i.entity_id:void 0,this.selectedMatchType=i?i.match_type:void 0,this.conditionValue=i?i.value:void 0}_conditionItemOptionsClick(e,t){switch(e.detail.index){case 0:this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=t,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)});break;case 1:const i=this.schedule.entries[0].slots[0].conditions.items.filter((e,i)=>i!==t),s=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})}),a=e=>Object.assign(e,{slots:e.slots.map(s)});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(a)}),t===this.conditionIdx?this.conditionIdx=-1:void 0!==this.conditionIdx&&t<this.conditionIdx&&(this.conditionIdx=this.conditionIdx-1),this.conditionValid=!0}}_selectMatchType(e,t){const i=e.detail.index;t=t.filter(e=>e!=this.selectedMatchType),this.selectedMatchType=t[i],e.preventDefault();const s=e.target;setTimeout(()=>{s.firstElementChild.blur()},50),this._validateCondition()}_conditionValueChanged(e){this.conditionValue=e.detail.value,this._validateCondition()}async _showConditionDialog(e){return new Promise(t=>{const i={cancel:()=>t(null),confirm:e=>t(e),domain:void 0,cardConfig:this.config};Es(e.target,"show-dialog",{dialogTag:"dialog-select-condition",dialogImport:()=>Promise.resolve().then((function(){return Za})),dialogParams:i})})}_selectEntity(e){const t=e.detail.value;if(this.selectedEntity=t?t.pop():void 0,this.selectedEntity){const e=Ys(this.selectedEntity,this.hass,this.config.customize),t=e&&e.hasOwnProperty("number")?[ge.Above,ge.Below]:[ge.Equal,ge.Unequal];this.selectedMatchType&&t.includes(this.selectedMatchType)||(this.selectedMatchType=t[0])}this._validateCondition()}_validateCondition(){if(this.conditionValid=!1,!this.selectedEntity||!Be(this.conditionValue)||!this.selectedMatchType||void 0===this.conditionIdx)return;const e=Ys(this.selectedEntity,this.hass,this.config.customize);if(!Ua(this.conditionValue,e))return;this.conditionValid=!0;const t={entity_id:this.selectedEntity,match_type:this.selectedMatchType,value:this.conditionValue,attribute:"state"},i=Object.assign(this.schedule.entries[0].slots[0].conditions.items,{[this.conditionIdx]:t}),s=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(s)}))})}_conditionAddClick(e){this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=this.schedule.entries[0].slots[0].conditions.items.length,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)})}_conditionConfigOptionsClick(e){let t=Object.assign({},this.schedule.entries[0].slots[0].conditions);switch(e.detail.index){case 0:if(t.type==_e.Or)return;t=Object.assign(Object.assign({},t),{type:_e.Or});break;case 1:if(t.type==_e.And)return;t=Object.assign(Object.assign({},t),{type:_e.And});break;case 2:const e=!this.schedule.entries[0].slots[0].conditions.track_changes;t=Object.assign(Object.assign({},t),{track_changes:e})}const i=e=>Object.assign(e,{conditions:t});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(i)}))})}_setStartDate(e){const t=String(e.detail.value);if(!t)return;Fa(t)>Fa(this.endDate)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t}_setEndDate(e){const t=String(e.detail.value);if(!t)return;Fa(this.startDate)>Fa(t)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t}toggleEnableDateRange(e){const t=e.target.checked;this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t?this.startDate:void 0,end_date:t?this.endDate:void 0,repeat_type:t?this.schedule.repeat_type==fe.Repeat?fe.Pause:this.schedule.repeat_type:this.schedule.repeat_type==fe.Pause?fe.Repeat:this.schedule.repeat_type})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t.trim()})}tagsUpdated(e){let t=e.detail.value;t=t.map(e=>e.trim()),t=t.filter(e=>!["none","disabled","enabled"].includes(e)),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:t})}_customTagConfirmClick(e){let t=e.target;t=t.parentElement,t=t.parentElement;t.querySelector("ha-button").click(),e.preventDefault();let i=String(this.customTagValue).trim();if(i.length){let e=this.schedule.tags||[];e=[...new Set([...e,i])],e=e.filter(e=>!["none","disabled","enabled"].includes(e)),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:e})}this.customTagValue=""}setRepeatType(e){const t=e.target.getAttribute("value");this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}static get styles(){return r`
      ha-icon-button {
        align-self: center;
      }
      mwc-list-item.warning, mwc-list-item.warning ha-icon {
        color: var(--error-color);
      }
      mwc-list-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      mwc-list-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      mwc-list-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      div.period {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
      ha-textfield {
        width: 100%;
      }
      .header {
        display: flex;
        margin-top: 5px;
        width: 100%;
        align-items: center;
      }
      .header.first {
        margin-top: 0px;
        padding-bottom: 4px;
        align-items: flex-end;
        justify-content: space-between;
      }
      .header > * {
        display: flex;
      }
      .header ha-button-menu {
        margin-bottom: -10px;
      }
    `}};t([le({attribute:!1})],Ka.prototype,"hass",void 0),t([le({attribute:!1})],Ka.prototype,"config",void 0),t([ce()],Ka.prototype,"schedule",void 0),t([ce()],Ka.prototype,"conditionIdx",void 0),t([ce()],Ka.prototype,"selectedDomain",void 0),t([ce()],Ka.prototype,"selectedEntity",void 0),t([ce()],Ka.prototype,"selectedMatchType",void 0),t([ce()],Ka.prototype,"conditionValue",void 0),t([ce()],Ka.prototype,"conditionValid",void 0),t([ce()],Ka.prototype,"startDate",void 0),t([ce()],Ka.prototype,"endDate",void 0),t([le()],Ka.prototype,"tags",void 0),t([ce()],Ka.prototype,"customTagValue",void 0),Ka=t([re("scheduler-options-panel")],Ka);let Ga=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?q`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Ps}
          ></ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        ${this._params.secondaryButtonLabel?q`
          <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
            ${this._params.secondaryButtonLabel}
          </ha-button>
            `:""}
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this._params.primaryButtonLabel}
        </ha-button>
      </ha-dialog>
    `:q``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
      ha-dialog {
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: 600px;
        --mdc-dialog-max-width: min(600px, 95vw);
      }
      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 100vw;
          --mdc-dialog-max-width: 100vw;
          --mdc-dialog-min-height: 100vh;
          --mdc-dialog-min-height: 100svh;
          --mdc-dialog-max-height: 100vh;
          --mdc-dialog-max-height: 100svh;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: var(--ha-border-radius-square);
        }
      }
    `}};t([le({attribute:!1})],Ga.prototype,"hass",void 0),t([ce()],Ga.prototype,"_params",void 0),Ga=t([re("scheduler-generic-dialog")],Ga);var Ja=Object.freeze({__proto__:null,get GenericDialog(){return Ga}});let Ya=class extends oe{constructor(){super(...arguments),this.large=!1,this.selectedEntry=0,this.selectedSlot=null,this._panel="main",this._viewMode=me.Single}set viewMode(e){if(this._viewMode=e,e==me.Single){let e=this.schedule.entries[this.selectedEntry].slots.findIndex(e=>e.actions.length);this.selectedSlot=e>=0?e:1}}shouldUpdate(e){return 1!=e.size||!e.has("hass")||!Be(this.hass)}async showDialog(e){var t;this._params=e,this.schedule=e.schedule,this._panel="main",this.large=!1;const i=this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length&&Be(e.stop)).length>0||this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length).length>1||this.schedule.entries[this.selectedEntry].slots.length>3;let s=this.schedule.entries[this.selectedEntry].slots.findIndex(e=>e.actions.length);this.selectedSlot=s>=0?s:null,this.viewMode=i?me.Scheme:(null===(t=this._params)||void 0===t?void 0:t.cardConfig.default_editor)||me.Single,await this.updateComplete}async closeDialog(){this._params=void 0}willUpdate(){this.hass.loadBackendTranslation("config")}render(){var e;return this._params?q`
      <ha-dialog open @closed=${this.closeDialog} .heading=${!0} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          ${"main"==this._panel?q`
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Ps}
          ></ha-icon-button>
          <ha-icon-button
            slot="actionItems"
            .label=""
            .path=${"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"}
            @click=${()=>{this._panel="options"}}
          ></ha-icon-button>
          `:q`
          <ha-icon-button
            slot="navigationIcon"
            .label=${Xi("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
            @click=${()=>{this._panel="main"}}
          ></ha-icon-button>
          `}
          <span slot="title" @click=${()=>this.large=!this.large}>
            ${this._params.editItem?this.schedule.name?null===(e=this.schedule)||void 0===e?void 0:e.name:Ui("ui.panel.common.default_name",this.hass,"{id}",this._params.editItem):Ui("ui.panel.common.new_schedule",this.hass)}
          </span>

        </ha-dialog-header>

        <div class="content">

          ${"main"==this._panel?q`
          <scheduler-main-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
            .large=${this.large}
            @change=${this._updateSchedule}
            @setViewMode=${this._setViewMode}
            .viewMode=${this._viewMode}
            .selectedSlot=${this.selectedSlot}
          >
          </scheduler-main-panel>
            `:q`
          <scheduler-options-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
            @change=${this._updateSchedule}
          >
          </scheduler-options-panel>
        `}
        </div>


        <div class="buttons">
          <ha-button appearance="plain" @click=${this._handleDeleteClick} variant="danger" ?disabled=${!this.schedule.entity_id}>
            ${Xi("ui.common.delete",this.hass)}
          </ha-button>
          <ha-button appearance="plain" @click=${this._handleSaveClick}>
            ${Xi("ui.common.save",this.hass)}
          </ha-button>
        </div>
      </ha-dialog>
    `:q``}_updateSchedule(e){let t=Object.keys(e.detail);if(t.includes("schedule")){let t=e.detail.schedule;this.schedule=t}t.includes("selectedSlot")&&(this.selectedSlot=e.detail.selectedSlot)}async _handleSaveClick(e){const t=ga(this.schedule,this.hass,this._params.cardConfig.customize);if(t)await new Promise(i=>{const s={cancel:()=>i(!1),confirm:()=>i(!0),title:Xi("state_badge.default.error",this.hass),description:Ui("ui.panel.editor.validation_errors."+t,this.hass),primaryButtonLabel:Xi("ui.common.ok",this.hass)};Es(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ja})),dialogParams:s})});else if(this.schedule.schedule_id){const t=Ie(await As(this.hass,this.schedule.schedule_id),this.hass);if(he(this.schedule,t))return void this.closeDialog();if(!t.enabled){await new Promise(t=>{const i={title:Ui("ui.dialog.enable_schedule.title",this.hass),description:Ui("ui.dialog.enable_schedule.description",this.hass),primaryButtonLabel:Xi("ui.common.yes",this.hass),secondaryButtonLabel:Xi("ui.common.no",this.hass),cancel:()=>{t(!1)},confirm:()=>{t(!0)}};Es(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ja})),dialogParams:i})})&&this.hass.callService("switch","turn_on",{entity_id:t.entity_id})}((e,t)=>{const i=va(t);return e.callApi("POST","scheduler/edit",i)})(this.hass,this.schedule).catch(e=>ka(e,this,this.hass)).then(()=>{this.closeDialog()})}else((e,t)=>{const i=va(t);return e.callApi("POST","scheduler/add",i)})(this.hass,this.schedule).catch(e=>ka(e,this,this.hass)).then(()=>{this.closeDialog()})}async _handleDeleteClick(e){await new Promise(t=>{const i={cancel:()=>t(!1),confirm:()=>t(!0),title:Ui("ui.dialog.confirm_delete.title",this.hass),description:Ui("ui.dialog.confirm_delete.description",this.hass),primaryButtonLabel:Xi("ui.common.ok",this.hass),secondaryButtonLabel:Xi("ui.common.cancel",this.hass)};Es(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ja})),dialogParams:i})}).then(e=>{var t,i;e&&(t=this.hass,i=this._params.editItem,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>ka(e,this,this.hass)).then(()=>{this.closeDialog()})})}_setViewMode(e){let t=e.detail;const i=this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length).length>1;if(t!=me.Scheme)if(t!=me.Single||i)new Promise(t=>{const i={title:Ui("ui.dialog.confirm_migrate.title",this.hass),description:Ui("ui.dialog.confirm_migrate.description",this.hass),primaryButtonLabel:this.hass.localize("ui.common.yes"),secondaryButtonLabel:this.hass.localize("ui.common.no"),cancel:()=>{t(!1)},confirm:()=>{t(!0)}};Es(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ja})),dialogParams:i})}).then(e=>{e&&(this.schedule=(e=>{const t=e=>{let t=e.findIndex(e=>e.actions.length);t<0&&(t=Math.floor(e.length/2));let i=Object.assign(Object.assign({},e[t]),{stop:void 0});const s=i.conditions,a=i.start;return e=[{start:"00:00:00",stop:a,actions:[],conditions:s},i,{start:Ne(ze(Ce(a),{minutes:1})),stop:"00:00:00",actions:[],conditions:s}]};return e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object(Object.assign(Object.assign({},e),{slots:t(e.slots)})))})})(this.schedule),this.viewMode=t)});else{if(he([...this.schedule.entries],[...Fe.entries]))this.schedule=Object.assign(Object.assign({},this.schedule),{entries:[...Ue.entries]});else{let e=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>{let t=e.slots.findIndex(e=>e.actions.length);return t<0&&(t=Math.floor(e.slots.length/2)),Object.assign(Object.assign({},e),{slots:e.slots.map((e,i)=>i==t?Object.assign(Object.assign({},e),{stop:void 0}):null).filter(Be)})})});this.schedule=Ie(e,this.hass)}this.viewMode=t}else{this.viewMode=t;he([...this.schedule.entries],[...Ue.entries])&&(this.schedule=Object.assign(Object.assign({},this.schedule),{entries:[...Fe.entries]}))}}};Ya.styles=ma,t([le({attribute:!1})],Ya.prototype,"hass",void 0),t([ce()],Ya.prototype,"_params",void 0),t([le({type:Boolean,reflect:!0})],Ya.prototype,"large",void 0),t([ce()],Ya.prototype,"schedule",void 0),t([ce()],Ya.prototype,"selectedEntry",void 0),t([ce()],Ya.prototype,"selectedSlot",void 0),t([ce()],Ya.prototype,"_panel",void 0),t([ce()],Ya.prototype,"_viewMode",void 0),Ya=t([re("dialog-scheduler-editor")],Ya);var Qa=Object.freeze({__proto__:null,get DialogSchedulerEditor(){return Ya}});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class Xa extends Ws{constructor(e){if(super(e),this.et=R,e.type!==Us)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===R||null==e)return this.ft=void 0,this.et=e;if(e===V)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Xa.directiveName="unsafeHTML",Xa.resultType=1;const eo=Bs(Xa);var to=window&&window.__assign||function(){return(to=Object.assign||function(e){for(var t,i=1,s=arguments.length;i<s;i++)for(var a in t=arguments[i])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};var io={second:45,minute:45,hour:22,day:5};const so=(e,t,i)=>{if(i===Te.am_pm||!i&&t.time_format===Te.am_pm){const t=Le(e.getHours()).am_pm;return`${Le(e.getHours()).hours}:${String(e.getMinutes()).padStart(2,"0")} ${t}`}return i===Te.twenty_four||!i&&t.time_format===Te.twenty_four?`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`:(()=>{try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1})()?e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit",hour12:De(t)}):De(t)?so(e,t,Te.am_pm):so(e,t,Te.twenty_four)};let ao=class extends oe{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const s=i>=0?"past":"future";i=Math.abs(i);const a=Math.round(i);if("future"==s&&a>0){if(i/3600>=6){const i=t.setHours(0,0,0,0),s=Math.floor((e.valueOf()-i.valueOf())/864e5);let a="";s>14?a=function(e,t){const i=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},s=(e,t)=>{switch(t){case"year":return e.getFullYear();case"month":return Ra[e.getMonth()];case"day":return e.getDate()}};return e.getFullYear()==(new Date).getFullYear()?i()?new Intl.DateTimeFormat(t.language,{month:"long",day:"numeric"}).format(e):`${s(e,"month")} ${s(e,"day")}`:i()?new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}).format(e):`${s(e,"month")} ${s(e,"day")}, ${s(e,"year")}`}(e,this._hass.locale):s>7?a=Ui("ui.components.date.next_week_day",this._hass,"{weekday}",ws(e,"long",this._hass)):1==s?a=Ui("ui.components.date.tomorrow",this._hass):s>0&&(a=ws(e,"long",this._hass));let o=Ui("ui.components.time.absolute",this._hass,"{time}",so(e,this._hass.locale));return 12==e.getHours()&&0==e.getMinutes()?o=Ui("ui.components.time.at_noon",this._hass):0==e.getHours()&&0==e.getMinutes()&&(o=Ui("ui.components.time.at_midnight",this._hass)),String(a+" "+o).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=Xi("ui.common.and",this._hass);return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"hour")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"minute",unitDisplay:"long"}).format(e)}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=Xi("ui.common.and",this._hass);return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"minute")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"second",unitDisplay:"long"}).format(e)}`}}const o=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var s=to(to({},io),i||{}),a=(+e-+t)/1e3;if(Math.abs(a)<s.second)return{value:Math.round(a),unit:"second"};var o=a/60;if(Math.abs(o)<s.minute)return{value:Math.round(o),unit:"minute"};var n=a/3600;if(Math.abs(n)<s.hour)return{value:Math.round(n),unit:"hour"};var r=a/86400;if(Math.abs(r)<s.day)return{value:Math.round(r),unit:"day"};var d=new Date(e),l=new Date(t),c=d.getFullYear()-l.getFullYear();if(Math.round(Math.abs(c))>0)return{value:Math.round(c),unit:"year"};var u=12*c+d.getMonth()-l.getMonth();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"month"};var h=a/604800;return{value:Math.round(h),unit:"week"}}(e);return new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(o.value,o.unit)}render(){if(!this._hass||!this.datetime)return q``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),q`
      ${Qi(this.relativeTime(this.datetime))}
    `}};t([le()],ao.prototype,"_hass",void 0),t([le()],ao.prototype,"datetime",void 0),ao=t([re("scheduler-relative-time")],ao);let oo=class extends oe{render(){var e,t,i,s,a;try{const o=this.hass.states[this.schedule.entity_id];if(!o)return q``;const n="off"==o.state,r=this.schedule.entries[0].slots[this.schedule.next_entries[0]||0].actions[0];let d=xa(r,this.config.customize);if("entity"==(null===(e=this.config.display_options)||void 0===e?void 0:e.icon)){let e=[(null===(t=r.target)||void 0===t?void 0:t.entity_id)||[]].flat().shift();["script","notify"].includes(Wi(r.service))&&(e=r.service),e&&(d=Xs(e,this.config.customize,this.hass))}const l=![(null===(i=r.target)||void 0===i?void 0:i.entity_id)||[]].flat().every(e=>Object.keys(this.hass.states).includes(e));return l&&(d="mdi:help"),q`
      <ha-icon
        icon="${d}"
        @click=${this._handleIconClick}
        class="${n?"disabled":""}"
      ></ha-icon>

      <div
        class="info ${n?"disabled":""} ${l?"defective":""}"
        @click=${this._handleItemClick}
      >
        ${this.renderDisplayItem((null===(s=this.config.display_options)||void 0===s?void 0:s.primary_info)||"default")}
        <div class="secondary">
        ${this.renderDisplayItem((null===(a=this.config.display_options)||void 0===a?void 0:a.secondary_info)||Ve)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${o}
        ></ha-entity-toggle>
      </div>

    `}catch(e){return q`
        <hui-warning .hass=${this.hass} @click=${this._handleItemClick}>
          <span style="white-space: normal">
            Failed to display schedule ${this.schedule.entity_id}.
            Reason: ${e}
          </span>
        </hui-warning>
      `}}renderDisplayItem(e){const t=e=>{const t=e.split("<relative-time></relative-time>");if(t.length>1){const e=this.schedule.timestamps[this.schedule.next_entries[0]||0];return q`
          ${t[0]?eo(t[0]):""}
          <scheduler-relative-time
            .hass=${this.hass}
            .datetime=${new Date(e)}
          >
          </scheduler-relative-time>
          ${t[1]?eo(t[1]):""}
        `}if(null!==e.match(/^(<tag>[^<]*<\/tag>)+$/)){let t=e.split(/<tag>([^<]*)<\/tag>/).filter(e=>e);return q`
          <div class="tags">
            ${null==t?void 0:t.map(e=>q`<span class="tag">${e}</span>`)}
          </div>`}return eo(e)};return zs(this.schedule,e,this.hass,this.config.customize).filter(e=>e.length).map(e=>q`${t(e)}<br/>`)}_handleItemClick(e){const t=new CustomEvent("editClick",{detail:{schedule_id:this.schedule_id}});this.dispatchEvent(t)}_handleIconClick(e){const t=new CustomEvent("editClick",{detail:{schedule_id:this.schedule_id}});this.dispatchEvent(t)}static get styles(){return r`
      :host {
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .info {
        margin-left: 16px;
        margin-right: 8px;
        margin-inline-start: 16px;
        margin-inline-end: 8px;
        flex: 1 1 30%;
        transition: color 0.2s ease-in-out;
        cursor: pointer;
      }
      .info,
      .info > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .flex ::slotted(*) {
        margin-left: 8px;
        margin-inline-start: 8px;
        margin-inline-end: initial;
        min-width: 0;
      }
      .flex ::slotted([slot="secondary"]) {
        margin-left: 0;
        margin-inline-start: 0;
        margin-inline-end: initial;
      }
      .secondary,
      ha-relative-time {
        color: var(--secondary-text-color);
        transition: color 0.2s ease-in-out;
      }
      .state {
        text-align: var(--float-end);
      }
      .value {
        direction: ltr;
      }
      ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        transition: color 0.2s ease-in-out;
        cursor: pointer;
        align-items: center;
        justify-content: center;
      }
      ha-icon.disabled {
        color: var(--disabled-text-color);
      }
      div.disabled {
        --primary-text-color: var(--disabled-text-color);
        --secondary-text-color: var(--disabled-text-color);
        --state-icon-color: var(--disabled-text-color);
        color: var(--disabled-text-color);
      }
      div.tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }
      span.tag {
        height: 28px;
        border-radius: 14px;
        background: rgba(var(--rgb-primary-color), 0.40);
        color: var(--primary-text-color);
        line-height: 1.25rem;
        font-size: 0.875rem;
        padding: 0px 12px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .defective {
        text-decoration: line-through;
      }
    `}};t([le()],oo.prototype,"hass",void 0),t([le()],oo.prototype,"schedule_id",void 0),t([le()],oo.prototype,"schedule",void 0),t([le()],oo.prototype,"config",void 0),oo=t([re("scheduler-item-row")],oo),e.SchedulerCard=class extends oe{constructor(){super(...arguments),this._config={},this.showDiscovered=!1,this.translationsLoaded=!1,this.connectionError=!1}async setConfig(e){e=(e=>{let t=[];if(We(e,"include")&&!Ye(e.include)&&t.push("'include' must be a list of strings"),We(e,"exclude")&&!Ye(e.exclude)&&t.push("'exclude' must be a list of strings"),We(e,"discover_existing")&&!Ze(e.discover_existing)&&t.push("'discover_existing' must be a boolean"),!We(e,"title")||Ze(e.title)||Ge(e.title)||t.push("'title' must be a boolean or string"),We(e,"time_step")&&(!Ke(e.time_step)||Number(e.time_step)<1||Number(e.time_step)>30)&&t.push("'time_step' must be a number between 1 and 30"),We(e,"show_header_toggle")&&!Ze(e.show_header_toggle)&&t.push("'show_header_toggle' must be a boolean"),We(e,"show_add_button")&&!Ze(e.show_add_button)&&t.push("'show_add_button' must be a boolean"),We(e,"display_options")&&(Je(e.display_options)?(!We(e.display_options,"primary_info")||Ge(e.display_options.primary_info)||Ye(e.display_options.primary_info)||t.push("in 'display_options': 'primary_info' must be a string or list of strings"),!We(e.display_options,"secondary_info")||Ge(e.display_options.secondary_info)||Ye(e.display_options.secondary_info)||t.push("in 'display_options': 'secondary_info' must be a string or list of strings"),!We(e.display_options,"icon")||Ge(e.display_options.icon)&&["action","entity"].includes(e.display_options.icon)||t.push("in 'display_options': 'icon' must be a set to either 'action' or 'entity' ")):t.push("'display_options' must be a struct")),!We(e,"sort_by")||Ge(e.sort_by)||Ye(e.sort_by)||t.push("'sort_by' must be a string or list of strings"),We(e,"customize")&&!Je(e.customize))t.push("'customize' must be a struct");else if(We(e,"customize")){let i=Object.entries(e.customize).map(([e,t])=>Qe(e,t)).filter(Be);i.length&&t.push(...i)}if(!We(e,"tags")||Ge(e.tags)||Ye(e.tags)||t.push("'tags' must be a string or list of strings"),!We(e,"exclude_tags")||Ge(e.tags)||Ye(e.tags)||t.push("'exclude_tags' must be a string or list of strings"),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`);return e})(e),this._config=Object.assign({},e)}async firstUpdated(){await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider")&&customElements.get("ha-generic-picker"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})();document.querySelector("home-assistant")._loadFragmentTranslations(this.hass.language,"config"),await Ts(this.hass).then(e=>{e=Object.fromEntries(Object.entries(e).filter(([e])=>Gi(e,this._config))),this._config=Object.assign(Object.assign({},this._config),{customize:Object.assign(Object.assign({},e),this._config.customize||{})})})}willUpdate(){this.hass.loadBackendTranslation("services")}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeMessage(e=>this.handleScheduleItemUpdated(e),{type:"scheduler_updated"})]}shouldUpdate(e){const t=e.get("hass"),i=e.get("_config");if(i&&this._config){Object.keys(i).filter(e=>i[e]!==this._config[e]).some(e=>["tags","discover_existing","sort_by","display_options"].includes(e))&&(async()=>{await this.loadSchedules()})()}return!this.translationsLoaded&&Xi("component.input_boolean.services.turn_on.name",this.hass,!1).length&&Xi("ui.panel.config.automation.editor.conditions.type.sun.sunrise",this.hass,!1).length?(this.translationsLoaded=!0,!0):!t||1!=e.size||!this.schedules||Object.values(this.schedules).some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this.hass.states[e.entity_id]))}render(){let e=[...this.schedules||[]],t=e.filter(e=>Ji(e,this._config)),i=e.filter(e=>!Ji(e,this._config));const s=this.showDiscovered?e.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")}):t.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")});return q`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${!Be(this._config.title)||"boolean"==typeof this._config.title&&this._config.title?Ui("ui.panel.common.title",this.hass):"boolean"==typeof this._config.title?"":this._config.title}
          </div>

          ${Object.keys(this.schedules||{}).length&&this._config.show_header_toggle?q`
          <ha-switch
            ?checked=${s}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
          `:""}
        </div>

        <div class="card-content" id="states">

    ${this.connectionError?q`
        <div>
          <hui-warning .hass=${this.hass}>
            <span style="white-space: normal">
              ${Ui("ui.panel.overview.backend_error",this.hass)}
            </span>
          </hui-warning>
        </div>
      `:Object.keys(e).length?t.map(e=>q`
            <scheduler-item-row
              .hass=${this.hass}
              .config=${this._config}
              .schedule_id=${e.schedule_id}
              .schedule=${e}
              @editClick=${t=>{this._handleEditClick(t,e)}}
            >
            </scheduler-item-row>
          `):q`
        <div>
          ${Ui("ui.panel.overview.no_entries",this.hass)}
        </div>
        `}

      ${Object.keys(e).length>t.length&&!1!==this._config.discover_existing?this.showDiscovered?q`

          ${i.map(e=>q`
                <scheduler-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${e.schedule_id}
                  .schedule=${e}
              @editClick=${t=>{this._handleEditClick(t,e)}}
                >
                </scheduler-item-row>
              `)}

              <div>
                <ha-button
                  appearance="plain"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${Ui("ui.panel.overview.hide_excluded",this.hass)}
                </ha-button>
              </div>
            `:q`
              <div>
                <ha-button
                  appearance="plain"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Ui("ui.panel.overview.excluded_items",this.hass,"{number}",Object.keys(e).length-t.length)}
                </ha-button>
              </div>
            `:""}
        </div>
        ${!1!==this._config.show_add_button?q`
        <div class="card-actions">
          ${this.connectionError?q`
          <ha-button appearance="plain" variant="warning" @click=${this._retryConnection}
            >${Xi("ui.common.refresh",this.hass)}
          </ha-button>
            `:q`
          <ha-button appearance="plain" @click=${this._addClick}
            >${Xi("ui.common.add",this.hass)}
          </ha-button>
          `}
        </div>`:""}
      </ha-card>
    `}async loadSchedules(){Oe(this.hass).then(e=>{this.schedules=Cs(e,this._config,this.hass)}).catch(e=>{this.schedules=[],this.connectionError=!0})}async getCardSize(){return new Promise(e=>{let t=0;const i=setInterval(()=>{var s;if(t++,!this._config||!this.schedules&&!this.connectionError&&t<50)return;let a=this._config.title||this._config.show_header_toggle?3:1;this._config.show_add_button&&(a+=1);const o=(([(null===(s=this._config.display_options)||void 0===s?void 0:s.secondary_info)||[]].flat().length||2)+1)/2;this.schedules&&(a+=this.showDiscovered?Object.keys(this.schedules).length*o:Object.values(this.schedules).filter(e=>Ji(e,this._config)).length*o),clearInterval(i),e(Math.round(a))},50)})}_retryConnection(){setTimeout(async()=>{await this.loadSchedules()},100),this.connectionError=!1,this.requestUpdate()}async handleScheduleItemUpdated(e){"scheduler_item_removed"!=e.event?As(this.hass,e.schedule_id).then(t=>{const i=this.schedules.findIndex(t=>t.schedule_id==e.schedule_id),s=i>=0?this.schedules[i]:null;let a=[...this.schedules||[]];!t||!1===this._config.discover_existing&&!Ji(t,this._config)?s&&(a=a.filter(t=>t.schedule_id!==e.schedule_id)):s?s.timestamps[s.next_entries[0]||0]==t.timestamps[t.next_entries[0]||0]?a=Object.assign(a,{[i]:t}):(a=Object.assign(a,{[i]:t}),a=Cs(a,this._config,this.hass)):a=Cs([...a,t],this._config,this.hass),this.schedules=[...a]}):this.schedules=(this.schedules||[]).filter(t=>t.schedule_id!==e.schedule_id)}_handleEditClick(e,t){if(!this.schedules)return;const i={schedule:Ie(t,this.hass),cardConfig:this._config,editItem:t.schedule_id};Es(e.target,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return Qa})),dialogParams:i})}_addClick(e){const t=[this._config.tags||[]].flat().filter(e=>!["none","disabled","enabled"].includes(e));let i=this._config.default_editor==me.Scheme?JSON.parse(JSON.stringify(Fe)):JSON.parse(JSON.stringify(Ue));const s={schedule:Object.assign(Object.assign({},i),{tags:1==t.length?t:[]}),cardConfig:this._config};Es(this,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return Qa})),dialogParams:s})}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;Object.values(this.schedules).filter(e=>this.showDiscovered||Ji(e,this._config)).forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}static getConfigElement(){return document.createElement("scheduler-card-editor")}},e.SchedulerCard.styles=r`
    .card-header {
      display: flex;
      justify-content: space-between;
    }
    .card-header .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
    }
    .card-header ha-switch {
      display: flex;
      align-self: center;
      margin: 0px 6px;
      line-height: 24px;
    }

    #states > * {
      margin: 8px 0;
    }
    #states > *:first-child {
      margin-top: 0;
    }
    #states > *:last-child {
      margin-bottom: 0;
    }
  
    button.show-more {
      color: var(--primary-color);
      text-align: left;
      cursor: pointer;
      background: none;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
      font: inherit;
    }
    button.show-more:focus {
      outline: none;
      text-decoration: underline;
    }
    .card-actions, .card-actions > * { 
      display: flex;
    }
  `,t([le({attribute:!1})],e.SchedulerCard.prototype,"hass",void 0),t([le()],e.SchedulerCard.prototype,"_config",void 0),t([ce()],e.SchedulerCard.prototype,"schedules",void 0),t([ce()],e.SchedulerCard.prototype,"showDiscovered",void 0),e.SchedulerCard=t([re("scheduler-card")],e.SchedulerCard),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v4.0.11".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray")}({});
