!function(e){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function t(e,t,i,s){var a,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(o=(n<3?a(o):n>3?a(t,i,o):a(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const i=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol();class a{constructor(e,t){if(t!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return i&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n=new Map,o=e=>{let t=n.get(e);return void 0===t&&n.set(e,t=new a(e,s)),t},r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(e instanceof a)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return o(i)},c=(e,t)=>{i?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const i=document.createElement("style");i.textContent=t.cssText,e.appendChild(i)})},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>o("string"==typeof e?e:e+""))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var d,u,h,p;const m={toAttribute(e,t){switch(t){case Boolean:e=e?"":null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_};class g extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(e){var t;null!==(t=this.v)&&void 0!==t||(this.v=[]),this.v.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this.Πp(i,t);void 0!==s&&(this.Πm.set(s,i),e.push(s))}),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const a=this[e];this[t]=s,this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static"Πp"(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this.Πg=new Promise(e=>this.enableUpdating=e),this.L=new Map,this.Π_(),this.requestUpdate(),null===(e=this.constructor.v)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this.ΠU)&&void 0!==t?t:this.ΠU=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this.ΠU)||void 0===t||t.splice(this.ΠU.indexOf(e)>>>0,1)}"Π_"(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this.Πi.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return c(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this.ΠU)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this.ΠU)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}),this.Πo=new Promise(e=>this.Πl=e)}attributeChangedCallback(e,t,i){this.K(e,i)}"Πj"(e,t,i=v){var s,a;const n=this.constructor.Πp(e,i);if(void 0!==n&&!0===i.reflect){const o=(null!==(a=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==a?a:m.toAttribute)(t,i.type);this.Πh=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this.Πh=null}}K(e,t){var i,s,a;const n=this.constructor,o=n.Πm.get(e);if(void 0!==o&&this.Πh!==o){const e=n.getPropertyOptions(o),r=e.converter,c=null!==(a=null!==(s=null===(i=r)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==a?a:m.fromAttribute;this.Πh=o,this[o]=c(t,e.type),this.Πh=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||_)(this[e],t)?(this.L.has(e)||this.L.set(e,t),!0===i.reflect&&this.Πh!==e&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async"Πq"(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(e){Promise.reject(e)}const e=this.performUpdate();return null!=e&&await e,!this.isUpdatePending}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach((e,t)=>this[t]=e),this.Πi=void 0);let t=!1;const i=this.L;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this.ΠU)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this.Π$()}catch(e){throw t=!1,this.Π$(),e}t&&this.E(i)}willUpdate(e){}E(e){var t;null===(t=this.ΠU)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}"Π$"(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(e){return!0}update(e){void 0!==this.Πk&&(this.Πk.forEach((e,t)=>this.Πj(t,this[t],e)),this.Πk=void 0),this.Π$()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var f,y,b,w;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(u=(d=globalThis).reactiveElementPlatformSupport)||void 0===u||u.call(d,{ReactiveElement:g}),(null!==(h=(p=globalThis).reactiveElementVersions)&&void 0!==h?h:p.reactiveElementVersions=[]).push("1.0.0-rc.2");const k=globalThis.trustedTypes,x=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,z=`<${j}>`,O=document,S=(e="")=>O.createComment(e),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,T=/>/g,A=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,N=/'/g,L=/"/g,I=/^(?:script|style|textarea)$/i,P=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),q=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),V=new WeakMap,H=O.createTreeWalker(O,129,null,!1);class U{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,n=0;const o=e.length-1,r=this.parts,[c,l]=((e,t)=>{const i=e.length-1,s=[];let a,n=2===t?"<svg>":"",o=D;for(let t=0;t<i;t++){const i=e[t];let r,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===D?"!--"===c[1]?o=M:void 0!==c[1]?o=T:void 0!==c[2]?(I.test(c[2])&&(a=RegExp("</"+c[2],"g")),o=A):void 0!==c[3]&&(o=A):o===A?">"===c[0]?(o=null!=a?a:D,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,r=c[1],o=void 0===c[3]?A:'"'===c[3]?L:N):o===L||o===N?o=A:o===M||o===T?o=D:(o=A,a=void 0);const u=o===A&&e[t+1].startsWith("/>")?" ":"";n+=o===D?i+z:l>=0?(s.push(r),i.slice(0,l)+"$lit$"+i.slice(l)+$+u):i+$+(-2===l?(s.push(void 0),t):u)}const r=n+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==x?x.createHTML(r):r,s]})(e,t);if(this.el=U.createElement(c,i),H.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=H.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith($)){const i=l[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:a,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?Z:"@"===t[1]?J:W})}else r.push({type:6,index:a})}for(const t of e)s.removeAttribute(t)}if(I.test(s.tagName)){const e=s.textContent.split($),t=e.length-1;if(t>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],S()),H.nextNode(),r.push({type:2,index:++a});s.append(e[t],S())}}}else if(8===s.nodeType)if(s.data===j)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf($,e+1));)r.push({type:7,index:a}),e+=$.length-1}a++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function F(e,t,i=e,s){var a,n,o,r;if(t===q)return t;let c=void 0!==s?null===(a=i.Σi)||void 0===a?void 0:a[s]:i.Σo;const l=E(t)?void 0:t._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(n=null==c?void 0:c.O)||void 0===n||n.call(c,!1),void 0===l?c=void 0:(c=new l(e),c.T(e,i,s)),void 0!==s?(null!==(o=(r=i).Σi)&&void 0!==o?o:r.Σi=[])[s]=c:i.Σo=c),void 0!==c&&(t=F(e,c.S(e,t.values),c,s)),t}class B{constructor(e,t){this.l=[],this.N=void 0,this.D=e,this.M=t}u(e){var t;const{el:{content:i},parts:s}=this.D,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:O).importNode(i,!0);H.currentNode=a;let n=H.nextNode(),o=0,r=0,c=s[0];for(;void 0!==c;){if(o===c.index){let t;2===c.type?t=new Y(n,n.nextSibling,this,e):1===c.type?t=new c.ctor(n,c.name,c.strings,this,e):6===c.type&&(t=new K(n,this,e)),this.l.push(t),c=s[++r]}o!==(null==c?void 0:c.index)&&(n=H.nextNode(),o++)}return a}v(e){let t=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(e,i,t),t+=i.strings.length-2):i.I(e[t])),t++}}class Y{constructor(e,t,i,s){this.type=2,this.N=void 0,this.A=e,this.B=t,this.M=i,this.options=s}setConnected(e){var t;null===(t=this.P)||void 0===t||t.call(this,e)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(e,t=this){e=F(this,e,t),E(e)?e===R||null==e||""===e?(this.H!==R&&this.R(),this.H=R):e!==this.H&&e!==q&&this.m(e):void 0!==e._$litType$?this._(e):void 0!==e.nodeType?this.$(e):(e=>{var t;return C(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.g(e):this.m(e)}k(e,t=this.B){return this.A.parentNode.insertBefore(e,t)}$(e){this.H!==e&&(this.R(),this.H=this.k(e))}m(e){const t=this.A.nextSibling;null!==t&&3===t.nodeType&&(null===this.B?null===t.nextSibling:t===this.B.previousSibling)?t.data=e:this.$(O.createTextNode(e)),this.H=e}_(e){var t;const{values:i,_$litType$:s}=e,a="number"==typeof s?this.C(e):(void 0===s.el&&(s.el=U.createElement(s.h,this.options)),s);if((null===(t=this.H)||void 0===t?void 0:t.D)===a)this.H.v(i);else{const e=new B(a,this),t=e.u(this.options);e.v(i),this.$(t),this.H=e}}C(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new U(e)),t}g(e){C(this.H)||(this.H=[],this.R());const t=this.H;let i,s=0;for(const a of e)s===t.length?t.push(i=new Y(this.k(S()),this.k(S()),this,this.options)):i=t[s],i.I(a),s++;s<t.length&&(this.R(i&&i.B.nextSibling,s),t.length=s)}R(e=this.A.nextSibling,t){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,t);e&&e!==this.B;){const t=e.nextSibling;e.remove(),e=t}}}class W{constructor(e,t,i,s,a){this.type=1,this.H=R,this.N=void 0,this.V=void 0,this.element=e,this.name=t,this.M=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(R),this.strings=i):this.H=R}get tagName(){return this.element.tagName}I(e,t=this,i,s){const a=this.strings;let n=!1;if(void 0===a)e=F(this,e,t,0),n=!E(e)||e!==this.H&&e!==q,n&&(this.H=e);else{const s=e;let o,r;for(e=a[0],o=0;o<a.length-1;o++)r=F(this,s[i+o],t,o),r===q&&(r=this.H[o]),n||(n=!E(r)||r!==this.H[o]),r===R?e=R:e!==R&&(e+=(null!=r?r:"")+a[o+1]),this.H[o]=r}n&&!s&&this.W(e)}W(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends W{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===R?void 0:e}}class Z extends W{constructor(){super(...arguments),this.type=4}W(e){e&&e!==R?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class J extends W{constructor(){super(...arguments),this.type=5}I(e,t=this){var i;if((e=null!==(i=F(this,e,t,0))&&void 0!==i?i:R)===q)return;const s=this.H,a=e===R&&s!==R||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==R&&(s===R||a);a&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this.H=e}handleEvent(e){var t,i;"function"==typeof this.H?this.H.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this.H.handleEvent(e)}}class K{constructor(e,t,i){this.element=e,this.type=6,this.N=void 0,this.V=void 0,this.M=t,this.options=i}I(e){F(this,e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var X,Q,ee,te,ie,se;null===(y=(f=globalThis).litHtmlPlatformSupport)||void 0===y||y.call(f,U,Y),(null!==(b=(w=globalThis).litHtmlVersions)&&void 0!==b?b:w.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(X=(se=globalThis).litElementVersions)&&void 0!==X?X:se.litElementVersions=[]).push("3.0.0-rc.2");class ae extends g{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();super.update(e),this.Φt=((e,t,i)=>{var s,a;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let o=n._$litPart$;if(void 0===o){const e=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:null;n._$litPart$=o=new Y(t.insertBefore(S(),e),e,void 0,i)}return o.I(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!1)}render(){return q}}ae.finalized=!0,ae._$litElement$=!0,null===(ee=(Q=globalThis).litElementHydrateSupport)||void 0===ee||ee.call(Q,{LitElement:ae}),null===(ie=(te=globalThis).litElementPlatformSupport)||void 0===ie||ie.call(te,{LitElement:ae});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ne=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,oe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function re(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):oe(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}function ce(e){return re({...e,state:!0,attribute:!1})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const le=({finisher:e,descriptor:t})=>(i,s)=>{var a;if(void 0===s){const s=null!==(a=i.originalKey)&&void 0!==a?a:i.key,n=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(n.finisher=function(t){e(t,s)}),n}{const a=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(a,s)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var de=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ue="[^\\s]+",he=/\[([^]*?)\]/gm;function pe(e,t){for(var i=[],s=0,a=e.length;s<a;s++)i.push(e[s].substr(0,t));return i}var me=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function _e(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var n=a[s];for(var o in n)e[o]=n[o]}return e}var ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ge=["January","February","March","April","May","June","July","August","September","October","November","December"],fe=pe(ge,3),ye={dayNamesShort:pe(ve,3),dayNames:ve,monthNamesShort:fe,monthNames:ge,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},be=_e({},ye),we=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ke={D:function(e){return String(e.getDate())},DD:function(e){return we(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return we(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return we(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return we(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return we(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return we(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return we(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return we(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return we(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return we(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return we(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+we(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+we(Math.floor(Math.abs(t)/60),2)+":"+we(Math.abs(t)%60,2)}},xe=function(e){return+e-1},$e=[null,"[1-9]\\d?"],je=[null,ue],ze=["isPm",ue,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],Oe=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],Se=(me("monthNamesShort"),me("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"}),Ee=function(e,t,i){if(void 0===t&&(t=Se.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=Se[t]||t).replace(he,(function(e,t){return s.push(t),"@@@"}));var a=_e(_e({},be),i);return(t=t.replace(de,(function(t){return ke[t](e,a)}))).replace(/@@@/g,(function(){return s.shift()}))};var Ce,De=Ee,Me=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleDateString(t.language,{year:"numeric",month:"long",day:"numeric"})}:function(e){return De(e,"mediumDate")},Te=function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleString(t.language,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(e){return De(e,"haDateTime")},Ae=function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit"})}:function(e){return De(e,"shortTime")};function Ne(e){return e.substr(0,e.indexOf("."))}function Le(e){return e.substr(e.indexOf(".")+1)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ce||(Ce={}));var Ie=function(e,t,i){var s;switch(null==t?void 0:t.number_format){case Ce.comma_decimal:s=["en-US","en"];break;case Ce.decimal_comma:s=["de","es","it"];break;case Ce.space_comma:s=["fr","sv","cs"];break;case Ce.system:s=void 0;break;default:s=null==t?void 0:t.language}if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},!Number.isNaN(Number(e))&&Intl&&(null==t?void 0:t.number_format)!==Ce.none)try{return new Intl.NumberFormat(s,Pe(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Pe(e,i)).format(Number(e))}return e?e.toString():""},Pe=function(e,t){var i=t||{};if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var s=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=s,i.maximumFractionDigits=s}return i};function qe(e,t,i,s){var a=void 0!==s?s:t.state;if("unknown"===a||"unavailable"===a)return e("state.default."+a);if(t.attributes.unit_of_measurement)return Ie(a,i)+" "+t.attributes.unit_of_measurement;var n=function(e){return Ne(e.entity_id)}(t);if("input_datetime"===n){var o;if(!t.attributes.has_time)return o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),Me(o,i);if(!t.attributes.has_date){var r=new Date;return o=new Date(r.getFullYear(),r.getMonth(),r.getDay(),t.attributes.hour,t.attributes.minute),Ae(o,i)}return o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),Te(o,i)}return"humidifier"===n&&"on"===a&&t.attributes.humidity?t.attributes.humidity+" %":"counter"===n||"number"===n?Ie(a,i):t.attributes.device_class&&e("component."+n+".state."+t.attributes.device_class+"."+t.state)||e("component."+n+".state._."+t.state)||t.state}var Re=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a},Ve={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function He(e,t){if(e in Ve)return Ve[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"hass:bookmark"}}var Ue,Fe,Be,Ye,We,Ge,Ze,Je={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Ke={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return He("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Je)return Je[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"hass:battery-unknown";var s=10*Math.round(i/10);return s>=100?"hass:battery":s<=0?"hass:battery-alert":"hass:battery-"+s}var a=e.attributes.unit_of_measurement;return"°C"===a||"°F"===a?"hass:thermometer":He("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?He("input_datetime"):"hass:calendar":"hass:clock"}},Xe=function(e){if(!e)return"hass:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=Ne(e.entity_id);return t in Ke?Ke[t](e):He(t,e.state)};!function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(Ue||(Ue={})),function(e){e.Level="LEVEL",e.List="LIST",e.Text="TEXT"}(Fe||(Fe={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(Be||(Be={})),function(e){e.Any="or",e.All="and"}(Ye||(Ye={})),function(e){e.Sunrise="sunrise",e.Sunset="sunset"}(We||(We={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(Ge||(Ge={})),function(e){e.ItemCreated="scheduler_item_created",e.ItemUpdated="scheduler_item_updated",e.ItemRemoved="scheduler_item_removed",e.TimerFinished="scheduler_timer_finished",e.TimerUpdated="scheduler_timer_updated"}(Ze||(Ze={}));var Qe;!function(e){e.Overview="OVERVIEW",e.NewSchedule="NEW_SCHEDULE",e.TimePicker="TIME_PICKER",e.TimeScheme="TIME_SCHEME",e.Options="OPTIONS"}(Qe||(Qe={}));const et={type:"scheduler-card",discover_existing:!0,standard_configuration:!0,include:[],exclude:[],groups:[],customize:{},title:!0,time_step:10,show_header_toggle:!1,display_options:{primary_info:"default",secondary_info:["relative-time","additional-tasks"],icon:"action"},tags:[]};function tt(e,t){if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number);return 3600*t[0]+60*t[1]+(t[2]||0)}const i=at(e);if(i){const e=t.states["sun.sun"],s=tt(e.attributes.next_rising,t),a=tt(e.attributes.next_setting,t);let n="sunrise"==i.event?s:a;return n="+"==i.sign?n+tt(i.offset,t):n-tt(i.offset,t),n}const s=new Date(e);return 3600*s.getHours()+60*s.getMinutes()+s.getSeconds()}function it(e){const t=Math.floor(e/3600);e-=3600*t;const i=Math.floor(e/60);e-=60*i;const s=Math.round(e);return String(t%24).padStart(2,"0")+":"+String(i).padStart(2,"0")+":"+String(s).padStart(2,"0")}function st(e,t,i={wrapAround:!0}){let s=e>=0?Math.floor(e/3600):Math.ceil(e/3600),a=Math.floor((e-3600*s)/60);a%t!=0&&(a=Math.round(a/t)*t),a>=60?(s++,a-=60):a<0&&(s--,a+=60),i.wrapAround&&(s>=24?s-=24:s<0&&(s+=24));const n=3600*s+60*a;if(i.maxHours){if(n>3600*i.maxHours)return 3600*i.maxHours;if(n<3600*-i.maxHours)return 3600*-i.maxHours}return n}function at(e){const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);return!!t&&{event:t[1],sign:t[2],offset:t[3]}}function nt(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}const ot=(e,...t)=>{const i={};let s;for(s in e)t.includes(s)||(i[s]=e[s]);return i};function rt(e){return e.every(e=>!Array.isArray(e))?e.slice():e.reduce((e,t)=>e.concat(Array.isArray(t)?rt(t):t),[])}function ct(e){let t=[];return e.forEach(e=>{t.find(t=>"object"==typeof e?dt(t,e):t===e)||t.push(e)}),t}function lt(e){return null!=e}function dt(...e){return e.every(t=>JSON.stringify(t)===JSON.stringify(e[0]))}function ut(e,t){const i=e=>"object"==typeof e?void 0!==e.name?String(e.name).trim().toLowerCase():JSON.stringify(e):String(e).trim().toLowerCase();return i(e)<i(t)?-1:1}function ht(e){return e.charAt(0).toUpperCase()+e.slice(1)}function pt(e){return"string"!=typeof e&&(e=String(e)),ht(e.replace(/_/g," "))}function mt(e){if(e)return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"hass:"+e}function _t(e,t){(e=(e=e.map(e=>Object(Object.assign(Object.assign({},e),{start:tt(e.start,t)<0?"00:00:00":e.start,stop:tt(e.stop,t)>86400?"00:00:00":e.stop})))).map(e=>{const i=tt(e.stop,t)-tt(e.start,t);return i<0?0==tt(e.stop,t)?Object.assign(Object.assign({},e),{stop:it(tt(e.stop,t)+86400)}):Object.assign(Object.assign({},e),{start:e.stop,stop:e.start}):i<60?Object.assign(Object.assign({},e),{start:e.start,stop:it(tt(e.start,t)+60)}):e})).sort((e,i)=>tt(e.start,t)>tt(i.start,t)?1:tt(e.start,t)<tt(i.start,t)?-1:tt(e.stop,t)>tt(i.stop,t)?1:-1);let i="00:00:00",s=e.length;for(let a=0;a<s;a++){const n=e[a];tt(n.start,t)>tt(i,t)?(e.splice(a,0,Object.assign(Object.assign({},n),{start:i,stop:n.start,actions:[]})),s++,a++):tt(n.start,t)<tt(i,t)&&(e=Object.assign(e,{[a]:Object.assign(Object.assign({},n),{start:i})})),i=n.stop}return tt(i,t)<86400&&tt(i,t)>0&&e.push(Object.assign(Object.assign({},e[0]),{start:i,stop:it(86400),actions:[]})),e}const vt=e=>e.locale||{language:e.language,number_format:Ce.system};function gt(e){return Array.isArray(e)?e:null!=e?[e]:[]}function ft(e){const t=[];let i=[];const s=e=>{e&&t.push(i.length?`in ${i.join("->")}: ${e}`:e)},a=(e,t)=>e.hasOwnProperty(t),n=(e,t)=>Array.isArray(t)?t.some(t=>n(e,t)):"array"==t?Array.isArray(e):"object"==t?typeof e===t&&null!==e:typeof e===t,o=(e,t,i)=>{if(a(e,t)){n(e[t],i)||s(`'${t}' must be of type ${i}`)}else s(`missing required property '${t}'`)},r=(e,t,i)=>{if(!a(e,t))return;n(e[t],i)||s(`'${t}' must be of type ${i}`)},c=(e,t,i)=>{let o=!0;return a(e,t)&&n(e[t],"array")?e[t].some(e=>!n(e,i))&&(s(`'${t}' must be an array with items of type ${i}`),o=!1):o=!1,o};if(r(e,"discover_existing","boolean"),r(e,"standard_configuration","boolean"),r(e,"title",["boolean","string"]),r(e,"time_step","number"),r(e,"show_header_toggle","boolean"),r(e,"show_add_button","boolean"),r(e,"include","array"),c(e,"include","string"),r(e,"exclude","array"),c(e,"exclude","string"),r(e,"display_options","object"),a(e,"display_options")&&(i.push("display_options"),r(e.display_options,"primary_info",["string","array"]),r(e.display_options,"secondary_info",["string","array"]),r(e.display_options,"icon","string"),c(e.display_options,"primary_info","string"),c(e.display_options,"secondary_info","string")),i=[],r(e,"groups","array"),a(e,"groups")&&n(e.groups,"array")&&(i.push("groups"),e.groups.forEach((e,t)=>{i=["groups",t],o(e,"name","string"),r(e,"icon","string"),o(e,"include","array"),r(e,"exclude","array"),c(e,"include","string"),c(e,"exclude","string")})),i=[],r(e,"customize","object"),a(e,"customize")&&n(e.customize,"object")&&Object.keys(e.customize).forEach(t=>{if(i=["customize"],n(t,"string")||s(t+" is not allowed"),o(e.customize,t,"object"),a(e.customize,t)&&n(e.customize[t],"object")){i.push(t);const l=e.customize[t];r(l,"name","string"),r(l,"icon","string"),r(l,"actions","array"),c(l,"actions","object")&&l.actions.forEach((e,l)=>{i=["customize",t,l],(e=>{const t=i;r(e,"name","string"),r(e,"icon","string"),o(e,"service","string"),r(e,"service_data","object"),c(e,"service_data","string"),a(e,"service_data")&&n(e.service_data,"object")&&Object.keys(e.service_data).some(e=>!n(e,"string"))&&s("service_data items must have string as index type"),r(e,"variables","object"),a(e,"variables")&&n(e.variables,"object")&&Object.keys(e.variables).forEach(l=>{if(i=t.concat(t,["variables"]),n(l,"string")||s(l+" is not allowed"),o(e.variables,l,"object"),a(e.variables,l)&&n(e.variables[l],"object")){i.push(l);const s=e.variables[l];c(s,"options","object")?s.options.forEach((e,s)=>{i=t.concat(t,["variables",l,"options",s]),o(e,"value","string"),r(e,"name","string"),r(e,"icon","string")}):void 0!==s.min||void 0!==s.max?(r(s,"min","number"),r(s,"max","number"),r(s,"step","number"),r(s,"scale_factor","number"),r(s,"optional","boolean"),r(s,"unit","string")):r(s,"multiline","boolean")}})})(e)}),r(l,"states",["object","array"]),a(l,"states")&&n(l.states,"array")?c(l,"states","string"):a(l,"states")&&n(l.states,"object")&&(o(l.states,"min","number"),o(l.states,"max","number"),r(l.states,"step","number"),r(l.states,"scale_factor","number"),r(l.states,"unit","string"))}}),r(e,"tags",["string","array"]),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`)}var yt={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]",set_mode:"nastavit režim[ na {mode}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},notify:{notify:"send notification"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"nastavit režim[ na {operation_mode}]",set_away_mode:"vypnout režim"}},bt={alarm_control_panel:"poplašný ovládací panel",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"světla",lock:"zámky",media_player:"média přehrávače",scene:"scény",script:"skripty",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},wt={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"příští {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},panel:{common:{title:"Plánovač"},overview:{no_entries:"Nejsou žádné položky k zobrazení",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},entity_picker:{no_groups_defined:"Nejsou definovány žádné skupiny",no_group_selected:"Nejprve vyberte skupinu",no_entities_for_group:"V této skupině nejsou žádné entity",no_entity_selected:"Nejprve vyberte entitu",no_actions_for_entity:"Pro tuto entitu neexistují žádné akce",make_scheme:"vytvořit schéma",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Nejprve vyberte časový úsek",time_scheme:"Schéma",time_input_mode:"Time control mode"},conditions:{equal_to:"je",unequal_to:"není",all:"Vše",any:"žádný",no_conditions_defined:"Nejsou definovány žádné podmínky",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"chování po spuštění",period:"období"}}},kt={services:yt,domains:bt,ui:wt},xt=Object.freeze({__proto__:null,services:yt,domains:bt,ui:wt,default:kt}),$t={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool:"regulieren[ auf {target_temp_low} - {target_temp_high}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]",set_cover_tilt_position:"Tilt Position setzen[ auf {tilt_position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]",set_mode:"Modus setzen[ auf {mode}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},notify:{notify:"Nachricht senden"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_operation_mode:"Modus setzen[ auf {operation_mode}]",set_away_mode:"Abwesenheitsmodus setzen"}},jt={alarm_control_panel:"Alarmzentrale",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",scene:"Szene",script:"Skripte",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},zt={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}",next_week_day:"nächsten {weekday}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"um Mittag",at_sun_event:"beim {sunEvent}"}},panel:{common:{title:"Zeitplaner"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",backend_error:"Es konnte keine Verbindung mit der Schedulerkomponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",excluded_items:"{number}{if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},entity_picker:{no_groups_defined:"Es gibt keine Gruppe",no_group_selected:"Wähle zuerst eine Gruppe aus",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_entity_selected:"Wähle zuerst eine Entity aus",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",make_scheme:"Erstelle Zeitplan",multiple:"mehrere"},time_picker:{no_timeslot_selected:"Wähle zuerst ein Zeitfenster aus",time_scheme:"Zeitplan",time_input_mode:"Time control mode"},conditions:{equal_to:"ist",unequal_to:"ist nicht",all:"alle",any:"keine",no_conditions_defined:"Es sind keine Bedingungen definiert",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"Verhalten nach Abschluß",period:"Term"}}},Ot={services:$t,domains:jt,ui:zt},St=Object.freeze({__proto__:null,services:$t,domains:jt,ui:zt,default:Ot}),Et={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"set mode[ to {mode}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"set mode[ to {operation_mode}]",set_away_mode:"set away mode"}},Ct={alarm_control_panel:"alarm control panel",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lights",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},Dt={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"next {weekday}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Scheduler"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"There are no groups defined",no_group_selected:"Select a group first",no_entities_for_group:"There are no entities in this group",no_entity_selected:"Select an entity first",no_actions_for_entity:"There are no actions for this entity",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first",time_scheme:"Scheme",time_input_mode:"Time control mode"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"behaviour after completion",period:"period"},card_editor:{tabs:{entities:"Entities",other:"Other"},fields:{title:{heading:"Title of the card",options:{standard:"standard",hidden:"hidden",custom:"custom"},custom_title:"Custom title"},discover_existing:{heading:"Show all schedules",description:"This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "},time_step:{heading:"Time step",description:"Resolution (in minutes) for creating schedules"},display_format_primary:{heading:"Displayed primary info",description:"Configure which label is used for schedules in the overview",options:{default:"Schedule name",entity_action:"Summary of task"}},display_format_secondary:{heading:"Displayed secondary info",description:"Configure what additional properties are visible in the overview",options:{relative_time:"Time remaining until next action",time:"Configured time for next action",days:"Repeated days of the week",additional_tasks:"Number of additional tasks"}},tags:{heading:"Tags",description:"Use tags to divide schedules between multiple cards"},entities:{heading:"Included entities",description:"Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",included_number:"{number}/{total} selected"}}}}},Mt={services:Et,domains:Ct,ui:Dt},Tt=Object.freeze({__proto__:null,services:Et,domains:Ct,ui:Dt,default:Mt}),At={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción[ a {temperature}]",set_temperature_hvac_mode_cool:"frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"regular[ entre {target_temp_low} - {target_temp_high}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste[ {preset_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición[ a {position}]",set_cover_tilt_position:"establecer inclinación[ a {tilt_position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]",set_mode:"establecer modo[ a {mode}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},notify:{notify:"enviar notificación"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"establecer modo[ a {operation_mode}]",set_away_mode:"establecer modo fuera de casa"}},Nt={alarm_control_panel:"panel de control de alarma",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luces",lock:"cerraduras",media_player:"reproductores",automation:"automatizaciones",scene:"escenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},Lt={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},panel:{common:{title:"Programador"},overview:{no_entries:"No hay ningún elemento que mostrar",backend_error:"Fallo de conexión con Scheduler component. Debe ser installado como integración antes de poder usar este panel.",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},entity_picker:{no_groups_defined:"No hay ningún grupo definido",no_group_selected:"selecciona un grupo primero",no_entities_for_group:"no hay ninguna entidad en este grupo",no_entity_selected:"selecciona una entidad primero",no_actions_for_entity:"no hay acciones para esta entidad",make_scheme:"crear planificación",multiple:"Múltiple"},time_picker:{no_timeslot_selected:"selecciona un bloque de tiempo primero",time_scheme:"Planificación",time_input_mode:"Time control mode"},conditions:{equal_to:"igual a",unequal_to:"desigual a",all:"todos",any:"cualquiera",no_conditions_defined:"no hay ninguna condición definida",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"acción después de la finalización",period:"período"}}},It={services:At,domains:Nt,ui:Lt},Pt=Object.freeze({__proto__:null,services:At,domains:Nt,ui:Lt,default:It}),qt={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]",set_cover_tilt_position:"sea ribide kalle [ asendisse {tilt_position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]",set_mode:"vali režiim [{mode}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},notify:{notify:"send notification"},script:{script:"käivita"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_operation_mode:"vali režiim [{operation_mode}]",set_away_mode:"kodust ära"}},Rt={alarm_control_panel:"valvepaneel",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",light:"valgustid",lock:"lukud",media_player:"meediamängijad",scene:"stseenid",script:"skriptud",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},Vt={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}",next_week_day:"järgmisel {weekday}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},panel:{common:{title:"Ajastaja"},overview:{no_entries:"Ajastused puuduvad",backend_error:"Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},entity_picker:{no_groups_defined:"Gruppe pole valitud",no_group_selected:"Vali alustuseks grupid",no_entities_for_group:"Selles grupis puuduvad olemid",no_entity_selected:"Vali alustuseks olem",no_actions_for_entity:"Selle olemi jaoks pole tegevusi",make_scheme:"loo skeem",multiple:"Mitu"},time_picker:{no_timeslot_selected:"Alustuseks vali ajavahemik",time_scheme:"Kkeem",time_input_mode:"Time control mode"},conditions:{equal_to:"võrdub",unequal_to:"ei võrdu",all:"kõik",any:"iga",no_conditions_defined:"Tingimusi pole määratud",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"toiming peale käivitumist",period:"periood"}}},Ht={services:qt,domains:Rt,ui:Vt},Ut=Object.freeze({__proto__:null,services:qt,domains:Rt,ui:Vt,default:Ht}),Ft={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]",set_mode:"ajuster le mode[ à {mode}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},notify:{notify:"send notification"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_operation_mode:"ajuster le mode[ à {operation_mode}]",set_away_mode:"choisir le mode absent"}},Bt={alarm_control_panel:"panneau de contrôle de l'alarme",climate:"thermostat",cover:"volet",fan:"ventilateur",group:"groupe",humidifier:"humidificateur",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",light:"lumière",lock:"serrure",media_player:"lecteur multimédia",scene:"scène",script:"script",switch:"interrupteur",vacuum:"aspirateur",water_heater:"chauffe eau"},Yt={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}",next_week_day:"{weekday} prochain"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},panel:{common:{title:"Planificateur"},overview:{no_entries:"il n'y a pas d'entrée à montrer",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},entity_picker:{no_groups_defined:"Aucun groupe défini",no_group_selected:"Choisir un groupe en premier",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_entity_selected:"Choisir une entité en premier",no_actions_for_entity:"Il n'y a pas d'action pour cette entité",make_scheme:"créer un schéma",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Choisir d'abord une plage horaire",time_scheme:"Schéma",time_input_mode:"Time control mode"},conditions:{equal_to:"égal à",unequal_to:"pas égal à",all:"tous",any:"tout",no_conditions_defined:"Il n'y a pas de condition définie",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportement après l'achèvement",period:"période"}}},Wt={services:Ft,domains:Bt,ui:Yt},Gt=Object.freeze({__proto__:null,services:Ft,domains:Bt,ui:Yt,default:Wt}),Zt={generic:{parameter_to_value:"{parameter} ל {value}",action_with_parameter:"{action} עם {parameter}"},climate:{set_temperature:"קבע טמפרטורה[ ל {temperature}]",set_temperature_hvac_mode_heat:"חימום[ ל {temperature}]",set_temperature_hvac_mode_cool:"קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"קבע מצב עבודה[ ל {hvac_mode}]",set_preset_mode:"קבע הגדרה[ ל {preset_mode}]"},cover:{close_cover:"סגירה",open_cover:"פתיחה",set_cover_position:"קבע מיקום[ ל {position}]",set_cover_tilt_position:"קבע הטיה[ ל {tilt_position}]"},fan:{set_speed:"קבע מהירות[ ל {speed}]",set_direction:"קבע כיוון[ ל {direction}]",oscillate:"קבע תנודה[ ל {oscillate}]"},humidifier:{set_humidity:"קבע לחות[ ל {humidity}]",set_mode:"קבע מצב עבודה[ ל {mode}]"},input_number:{set_value:"קבע ערך[ ל {value}]"},input_select:{select_option:"בחר אפשרות[ {option}]"},select:{select_option:"בחר אפשרות[ {option}]"},light:{turn_on:"הדלקה[ בעוצמה של {brightness}]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"בצע"},vacuum:{start_pause:"התחל / הפסק"},water_heater:{set_operation_mode:"קבע מצב עבודה[ ל {operation_mode}]",set_away_mode:"קבע מצב מוץ לבית"}},Jt={alarm_control_panel:"בקרת אזעקה",climate:"מזג אוויר",cover:"תריסים",fan:"מאווררים",group:"קבוצות יישויות",humidifier:"מכשירי אדים",input_boolean:"כניסה בוליאנית",input_number:"כניסה מספרית",input_select:"בחירת כניסה",light:"תאורה",lock:"מנעולים",media_player:"נגני מדיה",scene:"תרחישים",script:"סקריפטים",switch:"מפסקים",vacuum:"שואבי אבק",water_heater:"מחממי מים"},Kt={components:{date:{day_types_short:{daily:"כל יום",workdays:"ימי חול",weekend:"סוף שבוע"},day_types_long:{daily:"כל יום",workdays:"בימי חול",weekend:"בסוף השבוע"},days:"ימים",tomorrow:"מחר",repeated_days:"בכל {days}",repeated_days_except:"בכל יום פרט ל  {excludedDays}",days_range:"מ- {startDay} ועד- {endDay}",next_week_day:"הבא {weekday}"},time:{absolute:"בשעה {time}",interval:"משעה {startTime} עד שעה {endTime}",at_midnight:"בחצות הלילה",at_noon:"בחצות היום",at_sun_event:"ב {sunEvent}"}},panel:{common:{title:"לוח זמנים"},overview:{no_entries:"אין פריטים להצגה",backend_error:"אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",excluded_items:"{number} לא נכלל {if number is 1} פריט {else} פריטים",hide_excluded:"הסתר פריטים לא כלולים",additional_tasks:"{number} נוסף {if number is 1} משימה {else} משימות"},entity_picker:{no_groups_defined:"לא הוגדרו קבוצות",no_group_selected:"בחר קבוצה תחילה",no_entities_for_group:"אין יישויות בקבוצה זו",no_entity_selected:"תחילה בחר יישות",no_actions_for_entity:"אין פעולות עבור יישות זאת",make_scheme:"בנה סכימה",multiple:"מספר יישויות"},time_picker:{no_timeslot_selected:"בחר משבצת זמן קודם",time_scheme:"סכימה",time_input_mode:"Time control mode"},conditions:{equal_to:"שווה ל",unequal_to:"שונה מ",all:"כל התנאים",any:"אחד מהתנאים",no_conditions_defined:"לא הוגדרו תנאים",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"התנהגות לאחר הפעלה",period:"פרק זמן"}}},Xt={services:Zt,domains:Jt,ui:Kt},Qt=Object.freeze({__proto__:null,services:Zt,domains:Jt,ui:Kt,default:Xt}),ei={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_cool:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"mód beállítása[ to {mode}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},notify:{notify:"send notification"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"mód beállítása[ to {operation_mode}]",set_away_mode:"set away mode"}},ti={alarm_control_panel:"alarm control panel",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",light:"lámpa",lock:"locks",media_player:"lejátszó",scene:"jelenetek",script:"scripts",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},ii={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"következő {weekday}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},panel:{common:{title:"Időzítések"},overview:{no_entries:"Nincs megjeleníthető elem",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},entity_picker:{no_groups_defined:"Nincsenek deffiniált csoportok",no_group_selected:"Előbb egy csoportot szükséges választani",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_entity_selected:"Előbb egy entitást szükséges választani",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first",time_scheme:"Scheme",time_input_mode:"Time control mode"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"behaviour after triggering",period:"időszak"}}},si={services:ei,domains:ti,ui:ii},ai=Object.freeze({__proto__:null,services:ei,domains:ti,ui:ii,default:si}),ni={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"regola[ a {target_temp_low} - {target_temp_high}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]",set_cover_tilt_position:"imposta inclinazione[ su {tilt_position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]",set_mode:"imposta modalità[ a {mode}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},notify:{notify:"invia notifica"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_operation_mode:"imposta modalità[ a {operation_mode}]",set_away_mode:"imposta fuori casa"}},oi={alarm_control_panel:"pannello di controllo allarme",climate:"clima",cover:"serrande",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input booleani",input_number:"input numerici",input_select:"input select",light:"luci",lock:"lucchetti",media_player:"media player",scene:"scene",script:"script",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},ri={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"giorni",tomorrow:"domani",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",next_week_day:"prossimo {weekday}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},panel:{common:{title:"Schedulatore"},overview:{no_entries:"Non ci sono oggetti da visualizzare",backend_error:"Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},entity_picker:{no_groups_defined:"Non ci sono gruppi definiti",no_group_selected:"Seleziona prima un gruppo",no_entities_for_group:"Non ci sono entità in questo gruppo",no_entity_selected:"Seleziona prima un'entità",no_actions_for_entity:"Non ci sono azioni per questa entità",make_scheme:"crea schema",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Seleziona prima una fascia oraria",time_scheme:"Schema",time_input_mode:"Time control mode"},conditions:{equal_to:"uguale",unequal_to:"non uguale",all:"tutte",any:"qualunque",no_conditions_defined:"Non ci sono condizioni definite",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportamento dopo il completamento",period:"periodo"}}},ci={services:ni,domains:oi,ui:ri},li=Object.freeze({__proto__:null,services:ni,domains:oi,ui:ri,default:ci}),di={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool:"reguleren[ naar {target_temp_low} - {target_temp_high}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]",set_cover_tilt_position:"hellingshoek instellen[ naar {tilt_position}]"},fan:{set_speed:"snelheid instellen[ op {speed}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]",set_mode:"modus aanpassen[ naar {mode}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},notify:{notify:"notificatie sturen"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_operation_mode:"modus aanpassen[ naar {operation_mode}]",set_away_mode:"stel afwezigheidsmode in"}},ui={alarm_control_panel:"alarmsystemen",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",select:"select",light:"verlichting",lock:"sloten",media_player:"mediaspelers",scene:"scènes",script:"scripts",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},hi={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}",next_week_day:"volgende week {weekday}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},panel:{common:{title:"Tijdplanner"},overview:{no_entries:"Er zijn geen items aangemaakt",backend_error:"Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},entity_picker:{no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",make_scheme:"maak schema",multiple:"Meerdere"},time_picker:{no_timeslot_selected:"Kies eerst een tijdsslot",time_scheme:"Schema",time_input_mode:"Invoermodus voor tijd"},conditions:{equal_to:"is",unequal_to:"is niet",all:"en",any:"of",no_conditions_defined:"Er zijn geen voorwaarden gedefinieerd",track_conditions:"Herevalueer wanneer condities veranderen"},options:{repeat_type:"gedrag na voltooiing",period:"periode"}}},pi={services:di,domains:ui,ui:hi},mi=Object.freeze({__proto__:null,services:di,domains:ui,ui:hi,default:pi}),_i={generic:{parameter_to_value:"{parameter} til {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_cool:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat_cool:"reguler[ til {target_temp_low} - {target_temp_high}]",set_hvac_mode:"sett modus[ til {hvac_mode}]",set_preset_mode:"sett forhåndsvalg[ {preset_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ til {position}]",set_cover_tilt_position:"sett vippestilling[ til {tilt_position}]"},fan:{set_speed:"sett hastighet[ til {speed}]",set_direction:"sett retning[ til {direction}]",oscillate:"sett svingning[ til {oscillate}]"},humidifier:{set_humidity:"sett luftfuktighet[ til {humidity}]",set_mode:"sett modus[ til {mode}]"},input_number:{set_value:"sett verdi[ til {value}]"},input_select:{select_option:"velg[ {option}]"},select:{select_option:"velg[ {option}]"},light:{turn_on:"slå på[ med {brightness} lysstyrke]"},media_player:{select_source:"velg kilde[ {source}]"},notify:{notify:"send notifikasjon"},script:{script:"utfør"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"sett modus[ til {operation_mode}]",set_away_mode:"sett bortemodus"}},vi={alarm_control_panel:"alarmpanel",climate:"klima",cover:"solskjerming",fan:"vifter",group:"grupper",humidifier:"luftfuktere",input_boolean:"input boolsk",input_number:"input nummer",input_select:"input valg",light:"lys",lock:"låser",media_player:"mediaspillere",scene:"scener",script:"skript",switch:"brytere",vacuum:"støvsugere",water_heater:"varmtvannsberedere"},gi={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},days:"Dager",tomorrow:"imorgen",repeated_days:"hver {days}",repeated_days_except:"hver dag unntatt {excludedDays}",days_range:"fra {startDay} til {endDay}",next_week_day:"neste {weekday}"},time:{absolute:"kl. {time}",interval:"fra {startTime} til {endTime}",at_midnight:"ved midnatt",at_noon:"kl. 12.00",at_sun_event:"ved {sunEvent}"}},panel:{common:{title:"Tidsplan"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",backend_error:"Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",excluded_items:"{number} ekskludert {if number is 1} element {else} elementer",hide_excluded:"skjul ekskluderte elementer",additional_tasks:"{number} flere {if number is 1} oppgaver {else} oppgaver"},entity_picker:{no_groups_defined:"Ingen grupper definert",no_group_selected:"Velg en gruppe først",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_entity_selected:"Velg en entitet først",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",make_scheme:"lag tidsplan",multiple:"Flere"},time_picker:{no_timeslot_selected:"Velg tidsluke først",time_scheme:"Tidsplan",time_input_mode:"Time control mode"},conditions:{equal_to:"er",unequal_to:"er ikke",all:"alle",any:"any",no_conditions_defined:"Ingen vilkår definert",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"oppførsel etter fullføring",period:"periode"}}},fi={services:_i,domains:vi,ui:gi},yi=Object.freeze({__proto__:null,services:_i,domains:vi,ui:gi,default:fi}),bi={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]",set_cover_tilt_position:"ustaw pozycję lameli[ na {tilt_position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]",set_mode:"ustaw tryb[ na {mode}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},notify:{notify:"send notification"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"ustaw tryb[ na {operation_mode}]",set_away_mode:"ustaw tryb nieobecności"}},wi={alarm_control_panel:"panel kontrolny alarmu",climate:"klimatyzacja",cover:"rolety",fan:"wentylatory",group:"grupy",humidifier:"nawilżacze",input_boolean:"wejście logiczne",input_number:"wejście liczbowe",input_select:"wybór wejścia",light:"światła",lock:"zamki",media_player:"odtwarzacze",scene:"sceny",script:"skrypty",switch:"przełączniki",vacuum:"odkurzacze",water_heater:"podgrzewacze wody"},ki={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"następna {weekday}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północ",at_noon:"o południe",at_sun_event:"o {sunEvent}"}},panel:{common:{title:"Harmonogram"},overview:{no_entries:"Nie ma elementów do pokazania",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},entity_picker:{no_groups_defined:"Nie ma zdefiniowanych grup",no_group_selected:"Najpierw wybierz grupę",no_entities_for_group:"Nie ma encji w tej grupie",no_entity_selected:"Najpierw wybierz encję",no_actions_for_entity:"Nie ma akcji dla tej encji",make_scheme:"stwórz schemat",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Najpierw wybierz przedział czasowy",time_scheme:"Schemat",time_input_mode:"Time control mode"},conditions:{equal_to:"jest równe ",unequal_to:"nie jest równe",all:"wszystkie",any:"dowolny",no_conditions_defined:"Nie ma zdefiniowanych warunków",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"zachowanie po zakończeniu",period:"okres"}}},xi={services:bi,domains:wi,ui:ki},$i=Object.freeze({__proto__:null,services:bi,domains:wi,ui:ki,default:xi}),ji={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"send notification"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},zi={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},Oi={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema",multiple:"Multiple"},time_picker:{no_timeslot_selected:"É necessário selecionar um período horário para escolher uma ação",time_scheme:"Esquema",time_input_mode:"Time control mode"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportamento após a conclusão",period:"período"}}},Si={services:ji,domains:zi,ui:Oi},Ei=Object.freeze({__proto__:null,services:ji,domains:zi,ui:Oi,default:Si}),Ci={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"send notification"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},Di={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},Mi={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro",time_scheme:"Esquema",time_input_mode:"Time control mode"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportamento após a conclusão",period:"período"}}},Ti={services:Ci,domains:Di,ui:Mi},Ai=Object.freeze({__proto__:null,services:Ci,domains:Di,ui:Mi,default:Ti}),Ni={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]",set_mode:"setare mod[ la {mode}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},notify:{notify:"send notification"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_operation_mode:"setare mod[ la {operation_mode}]",set_away_mode:"setare mod plecat"}},Li={alarm_control_panel:"panou control alarmă",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",light:"lumini",lock:"încuietori",media_player:"media playere",scene:"scene",script:"scripturi",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},Ii={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}",next_week_day:"{weekday} viitoare"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},panel:{common:{title:"Planificator"},overview:{no_entries:"Nu există elemente de afișat",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},entity_picker:{no_groups_defined:"Nu există grupuri definite",no_group_selected:"Prima dată selectați un grup",no_entities_for_group:"Nu există entități definite în acest grup",no_entity_selected:"Prima dată selectați o entitate",no_actions_for_entity:"Nu există acțiuni pentru această entitate",make_scheme:"creare schemă",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Prima dată selectați un interval orar",time_scheme:"Schemă",time_input_mode:"Time control mode"},conditions:{equal_to:"este",unequal_to:"nu este",all:"tot",any:"oricare",no_conditions_defined:"Nu există condiții definite",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportament după declanșare",period:"perioadă"}}},Pi={services:Ni,domains:Li,ui:Ii},qi=Object.freeze({__proto__:null,services:Ni,domains:Li,ui:Ii,default:Pi}),Ri={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool:"регулировать[ в пределах {target_temp_low} - {target_temp_high}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]",set_cover_tilt_position:"установить наклон[ {tilt_position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]",set_mode:"установить режим[ {mode}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},notify:{notify:"послать сообщение"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"установить режим[ {operation_mode}]",set_away_mode:"установить режим вне дома"}},Vi={alarm_control_panel:"панель управления сигнализацией",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",light:"освещение",lock:"замки",media_player:"медиа-плееры",scene:"сцены",script:"скрипты",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},Hi={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}",next_week_day:"в следующую {weekday}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},panel:{common:{title:"Планировщик"},overview:{no_entries:"Отсутствуют элементы",backend_error:"Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},entity_picker:{no_groups_defined:"Не определены группы",no_group_selected:"Выберите группу",no_entities_for_group:"Отсутствуют элементы в группе",no_entity_selected:"Выберите элемент",no_actions_for_entity:"Нет действий для этого элемента",make_scheme:"создать схему",multiple:"Множественный"},time_picker:{no_timeslot_selected:"Выберите временной слот",time_scheme:"Cхему",time_input_mode:"Time control mode"},conditions:{equal_to:"равно",unequal_to:"не равно",all:"все",any:"любое",no_conditions_defined:"Не определены условия",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"поведение после срабатывания",period:"период"}}},Ui={services:Ri,domains:Vi,ui:Hi},Fi=Object.freeze({__proto__:null,services:Ri,domains:Vi,ui:Hi,default:Ui}),Bi={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastaviť teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"vykurovanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"nastaviť režim[ na {hvac_mode}]",set_preset_mode:"nastaviť predvoľbu[ {preset_mode}]"},cover:{close_cover:"zatvoriť",open_cover:"otvoriť",set_cover_position:"nastaviť polohu[ na {position}]",set_cover_tilt_position:"nastaviť naklonenie[ na {tilt_position}]"},fan:{set_speed:"nastaviť rýchlosť[ na {speed}]",set_direction:"nastaviť smer[ na {direction}]",oscillate:"nastaviť osciláciu[ na {oscillate}]"},humidifier:{set_humidity:"nastaviť vlhkosť[ na {humidity}]",set_mode:"nastaviť režim[ na {mode}]"},input_number:{set_value:"nastaviť hodnotu[ na {value}]"},input_select:{select_option:"vybrať možnosť[ {option}]"},select:{select_option:"vybrať možnosť[ {option}]"},light:{turn_on:"zapnúť[ na {brightness} jas]"},media_player:{select_source:"vybrať zdroj[ {source}]"},notify:{notify:"send notification"},script:{script:"spustiť"},vacuum:{start_pause:"štart / pauza"},water_heater:{set_operation_mode:"nastaviť režim[ na {operation_mode}]",set_away_mode:"nastaviť mód neprítomný"}},Yi={alarm_control_panel:"ovládací panel alarmu",climate:"klimatizácia",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"svetlá",lock:"zámky",media_player:"mediálne prehrávače",scene:"scény",script:"skripty",switch:"vypínače",vacuum:"vysávače",water_heater:"ohrievače vody"},Wi={components:{date:{day_types_short:{daily:"denne",workdays:"pracovné dni",weekend:"víkend"},day_types_long:{daily:"každý deň",workdays:"cez pracovné dni",weekend:"cez víkend"},days:"dni",tomorrow:"zajtra",repeated_days:"každý {days}",repeated_days_except:"každý deň okrem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"budúcu {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od polnoci",at_noon:"od obeda",at_sun_event:"na {sunEvent}"}},panel:{common:{title:"Plánovač"},overview:{no_entries:"Žiadne položky k zobrazeniu",backend_error:"Nepodarilo sa pripojiť k Scheduler Component. Musí byť nainštalovaný ako integrácia pred použitím tejto karty.",excluded_items:"Vylúčené položky: {number}",hide_excluded:"skryť vylúčené položky",additional_tasks:"Ďalšie úlohy: {number}"},entity_picker:{no_groups_defined:"Nie sú definované žiadne skupiny",no_group_selected:"Najprv vyberte skupinu",no_entities_for_group:"V tejto skupine nie sú žiadne entity",no_entity_selected:"Najprv vyberte entitu",no_actions_for_entity:"Pre túto entitu neexistujú žiadne akcie",make_scheme:"vytvoriť schému",multiple:"Viacero"},time_picker:{no_timeslot_selected:"Najprv vyberte časový úsek",time_scheme:"Schému",time_input_mode:"Time control mode"},conditions:{equal_to:"je",unequal_to:"nie je",all:"Všetko",any:"žiadny",no_conditions_defined:"Nie sú definované žiadne podmienky",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"správanie sa po spustení",period:"obdobie"}}},Gi={services:Bi,domains:Yi,ui:Wi},Zi={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"regulate[ to {target_temp_low} - {target_temp_high}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]",set_mode:"встановити режим[ to {mode}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},notify:{notify:"send notification"},script:{script:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"встановити режим[ to {operation_mode}]",set_away_mode:"встановити режим Не вдома"}},Ji={alarm_control_panel:"панель керування сигналізацією",climate:"клімат",cover:"жалюзі",fan:"вентилятори",group:"групи",humidifier:"зволожувачі",input_boolean:"логічні",input_number:"числові",input_select:"списки",light:"освітлення",lock:"замки",media_player:"медіаплеєри",scene:"сцени",script:"скрипти",switch:"вимикачі",vacuum:"пилососи",water_heater:"водонагрівачі"},Ki={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}",next_week_day:"наступної {weekday}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},panel:{common:{title:"Планувальник"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань"},entity_picker:{no_groups_defined:"Немає визначених груп",no_group_selected:"Спершу виберіть групу",no_entities_for_group:"В даній групі відсутні елементи",no_entity_selected:"Спершу виберіть елемент",no_actions_for_entity:"Немає дій для цього елемента",make_scheme:"створити схему",multiple:"Декілька"},time_picker:{no_timeslot_selected:"Спершу виберіть часовий проміжок",time_scheme:"Cхему",time_input_mode:"Time control mode"},conditions:{equal_to:"дорівнює",unequal_to:"не рівне",all:"всі",any:"будь-яке",no_conditions_defined:"Не визначені умови",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"поведінка після спрацювання",period:"період"}}},Xi={services:Zi,domains:Ji,ui:Ki},Qi={generic:{parameter_to_value:"{parameter} 至 {value}",action_with_parameter:"{action} 使用 {parameter}"},climate:{set_temperature:"设定温度[ 至 {temperature}]",set_temperature_hvac_mode_heat:"制热模式[ 至 {temperature}]",set_temperature_hvac_mode_cool:"制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool:"调节[ 至 {target_temp_low} - {target_temp_high}]",set_hvac_mode:"设定模式[ 为 {hvac_mode}]",set_preset_mode:"设定预设模式[ 为 {preset_mode}]"},cover:{close_cover:"关闭",open_cover:"打开",set_cover_position:"设定位置[ 至 {position}]",set_cover_tilt_position:"设定倾斜位置[ 至 {tilt_position}]"},fan:{set_speed:"设定风速[ 至 {speed}]",set_direction:"设定方向[ 至 {direction}]",oscillate:"设置摇摆[ 至 {oscillate}]"},humidifier:{set_humidity:"设定湿度[ 至 {humidity}]",set_mode:"设定模式[ 为 {mode}]"},input_number:{set_value:"设定数值[ 至 {value}]"},input_select:{select_option:"选择选项[ {option}]"},select:{select_option:"选择选项[ {option}]"},light:{turn_on:"打开[ 并设定亮度为 {brightness}]"},media_player:{select_source:"选择播放源[ {source}]"},notify:{notify:"发送通知"},script:{script:"执行"},vacuum:{start_pause:"开始 / 暂停"},water_heater:{set_operation_mode:"设定模式[ 为 {operation_mode}]",set_away_mode:"设定离开模式"}},es={alarm_control_panel:"警戒控制面板",climate:"空调/地暖",cover:"窗帘",fan:"风扇/空气净化器",group:"实体组",humidifier:"空气加湿器",input_boolean:"输入二元选择器",input_number:"输入数值",input_select:"输入选择",light:"灯具",lock:"门锁",media_player:"媒体播放器",scene:"场景",script:"脚本",switch:"开关",vacuum:"扫地机/吸尘器",water_heater:"热水器"},ts={components:{date:{day_types_short:{daily:"每日",workdays:"工作日",weekend:"周末"},day_types_long:{daily:"每一天",workdays:"在工作日",weekend:"在周末"},days:"天",tomorrow:"明天",repeated_days:"每 {days}",repeated_days_except:"每天，除了 {excludedDays}",days_range:"从 {startDay} 至 {endDay}",next_week_day:"下{weekday}"},time:{absolute:"在 {time}",interval:"从 {startTime} 至 {endTime}",at_midnight:"在午夜",at_noon:"在正午",at_sun_event:"在 {sunEvent}"}},panel:{common:{title:"计划任务"},overview:{no_entries:"无事项",backend_error:"计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",excluded_items:"{number} 除外 {if number is 1} 事项 {else} 事项",hide_excluded:"隐藏除外事项",additional_tasks:"{number} 更多 {if number is 1} 任务 {else} 任务"},entity_picker:{no_groups_defined:"未添加需执行计划任务的群组",no_group_selected:"请选择群组",no_entities_for_group:"群组不含实体",no_entity_selected:"请选择实体",no_actions_for_entity:"该实体不含可执行的动作",make_scheme:"制定计划",multiple:"多选"},time_picker:{no_timeslot_selected:"请选择时间段",time_scheme:"议程",time_input_mode:"Time control mode"},conditions:{equal_to:"是",unequal_to:"非",all:"全部",any:"任一",no_conditions_defined:"未定义条件",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"触发后的行为",period:"时期"}}},is={services:Qi,domains:es,ui:ts};const ss={cs:xt,de:St,en:Tt,es:Pt,et:Ut,es_419:Pt,fr:Gt,he:Qt,hu:ai,it:li,nb:yi,nl:mi,nn:yi,no:yi,pl:$i,pt:Ei,pt_BR:Ai,ro:qi,sk:Object.freeze({__proto__:null,services:Bi,domains:Yi,ui:Wi,default:Gi}),ru:Fi,uk:Object.freeze({__proto__:null,services:Zi,domains:Ji,ui:Ki,default:Xi}),"zh-Hans":Object.freeze({__proto__:null,services:Qi,domains:es,ui:ts,default:is})};function as(e,t,i="",s=""){let a;try{if("test"==t.language)return"TRANSLATED";a=e.split(".").reduce((e,t)=>e[t],ss[t.language]),a||(a=e.split(".").reduce((e,t)=>e[t],ss.en))}catch(t){try{a=e.split(".").reduce((e,t)=>e[t],ss.en)}catch(e){a=""}}if(""!==i&&""!==s&&a){Array.isArray(i)||(i=[i]),Array.isArray(s)||(s=[s]);for(let e=0;e<i.length;e++){a=a.replace(String(i[e]),String(s[e]));const t=a.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){a=String(s[e])==t[2]?a.replace(t[0],t[3]):a.replace(t[0],t[4])}}}return a}const ns=r`
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
      padding: 5px;
    }
    .card-header ha-icon-button {
        position: absolute;
        right: 6px;
        top: 6px;
    }
    .card-content {
      flex: 1;
    }
    .card-content > *:first-child {
      margin-top: 0;
    }
    .card-content > *:last-child {
      margin-bottom: 0;
    }
    div.text-field, div.secondary {
      color: var(--secondary-text-color);
    }
    .disabled {
      color: var(--disabled-text-color);
    }
    div.header {
      color: var(--secondary-text-color);
      text-transform: uppercase;
      font-weight: 500;
      font-size: 12px;
      margin: 20px 0px 0px 0px;
      display: flex;
      flex-direction: row;
    }
    div.header .switch {
      text-transform: none;
      font-weight: normal;
      font-size: 14px;
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
    }
    div.header ha-switch {
      display: flex;
      align-self: center;
      margin: 0px 8px;
      line-height: 24px;
    }
    mwc-button {
      margin: 2px 0px;
    }
    mwc-button.active {
      background: var(--primary-color);
      --mdc-theme-primary: var(--text-primary-color);
      border-radius: 4px;
    }      
    mwc-button ha-icon {
      margin-right: 11px;
    }
    mwc-button.warning {
      --mdc-theme-primary: var(--error-color);
    }
    div.checkbox-container {
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      grid-template-rows: min-content;
      grid-template-areas: "checkbox slider value";
      grid-gap: 0px 10px;
    }
    div.checkbox-container div.checkbox {
      grid-area: checkbox;
      display: flex;
      align-items: center;x
    }
    div.checkbox-container div.slider {
      grid-area: slider;
      display: flex;
      align-items: center;
    }
    div.checkbox-container div.value {
      grid-area: value;
      min-width: 40px;
      display: flex;
      align-items: center;
    }
    a {
      color: var(--primary-color);
    }
    a:visited {
      color: var(--accent-color);
    }
  `,os=e=>{class i extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([re({attribute:!1})],i.prototype,"hass",void 0),i},rs=2;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class cs extends class{constructor(e){}T(e,t,i){this.Σdt=e,this.M=t,this.Σct=i}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){if(super(e),this.vt=R,e.type!==rs)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===R)return this.Vt=void 0,this.vt=e;if(e===q)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.vt)return this.Vt;this.vt=e;const t=[e];return t.raw=t,this.Vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}}cs.directiveName="unsafeHTML",cs.resultType=1;const ls=(e=>(...t)=>({_$litDirective$:e,values:t}))(cs),ds=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],us=(e,t,i)=>{if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}if((()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1})())return e.toLocaleDateString(t.language,{weekday:i?"short":"long"});{const t=e.getDay();return i?ds[t].substr(0,3):ds[t]}};var hs;!function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(hs||(hs={}));const ps=e=>{if(e.time_format===hs.language||e.time_format===hs.system){const t=e.time_format===hs.language?e.language:void 0,i=(new Date).toLocaleString(t);return i.includes("AM")||i.includes("PM")}return e.time_format===hs.am_pm};function ms(e,t,i){return i===hs.am_pm||!i&&t.time_format===hs.am_pm?Ee(e,"h:mm A"):i===hs.twenty_four||!i&&t.time_format===hs.twenty_four?Ee(e,"shortTime"):(()=>{try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1})()?e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit",hour12:ps(t)}):ps(t)?ms(e,t,hs.am_pm):ms(e,t,hs.twenty_four)}function _s(e,t,i){const s=e.getFullYear()==(new Date).getFullYear(),a=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1};return i?Ee(e,"isoDate"):s?a()?new Intl.DateTimeFormat(t.language,{month:"long",day:"numeric"}).format(e):Ee(e,"MMMM D"):a()?new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}).format(e):Ee(e,"MMMM D, YYYY")}var vs=window&&window.__assign||function(){return(vs=Object.assign||function(e){for(var t,i=1,s=arguments.length;i<s;i++)for(var a in t=arguments[i])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};var gs={second:45,minute:45,hour:22,day:5};let fs=class extends ae{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const s=i>=0?"past":"future";i=Math.abs(i);const a=Math.round(i);if("future"==s&&a>0){if(i/3600>=6){const i=t.setHours(0,0,0,0),s=Math.floor((e.valueOf()-i.valueOf())/864e5);let a="";s>14?a=_s(e,vt(this._hass)):s>7?a=as("ui.components.date.next_week_day",vt(this._hass),"{weekday}",us(e,vt(this._hass))):1==s?a=as("ui.components.date.tomorrow",vt(this._hass)):s>0&&(a=us(e,vt(this._hass)));let n=as("ui.components.time.absolute",vt(this._hass),"{time}",ms(e,vt(this._hass)));return 12==e.getHours()&&0==e.getMinutes()?n=as("ui.components.time.at_noon",vt(this._hass)):0==e.getHours()&&0==e.getMinutes()&&(n=as("ui.components.time.at_midnight",vt(this._hass))),String(a+" "+n).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(vt(this._hass).language,{numeric:"auto"}).format(1,"hour")} ${t} ${Intl.NumberFormat(vt(this._hass).language,{style:"unit",unit:"minute",unitDisplay:"long"}).format(e)}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(vt(this._hass).language,{numeric:"auto"}).format(1,"minute")} ${t} ${Intl.NumberFormat(vt(this._hass).language,{style:"unit",unit:"second",unitDisplay:"long"}).format(e)}`}}const n=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var s=vs(vs({},gs),i||{}),a=(+e-+t)/1e3;if(Math.abs(a)<s.second)return{value:Math.round(a),unit:"second"};var n=a/60;if(Math.abs(n)<s.minute)return{value:Math.round(n),unit:"minute"};var o=a/3600;if(Math.abs(o)<s.hour)return{value:Math.round(o),unit:"hour"};var r=a/86400;if(Math.abs(r)<s.day)return{value:Math.round(r),unit:"day"};var c=new Date(e),l=new Date(t),d=c.getFullYear()-l.getFullYear();if(Math.round(Math.abs(d))>0)return{value:Math.round(d),unit:"year"};var u=12*d+c.getMonth()-l.getMonth();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"month"};var h=a/604800;return{value:Math.round(h),unit:"week"}}(e);return new Intl.RelativeTimeFormat(vt(this._hass).language,{numeric:"auto"}).format(n.value,n.unit)}render(){if(!this._hass||!this.datetime)return P``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),P`
      ${ht(this.relativeTime(this.datetime))}
    `}};function ys(...e){const t=e[0].options.map(e=>e.value).filter(t=>e.map(e=>e.options).every(e=>e.map(e=>e.value).includes(t))).map(t=>{const i=e.map(e=>e.options.find(e=>e.value==t)).filter(lt).map(e=>e.name).filter(lt),s=e.map(e=>e.options.find(e=>e.value==t)).filter(lt).map(e=>e.icon).filter(lt);return{value:t,name:i.length?i.reduce((e,t)=>t):void 0,icon:s.length?s.reduce((e,t)=>t):void 0}}),i=e.map(e=>e.name).filter(lt);return{type:Fe.List,name:i.length?i.reduce((e,t)=>t):void 0,options:t}}function bs(e,t){const i=t.options.find(t=>t.value==e);return i?i.name||i.value:""}t([re()],fs.prototype,"_hass",void 0),t([re()],fs.prototype,"datetime",void 0),fs=t([ne("my-relative-time")],fs);function ws(...e){const t=e.map(e=>e.min).filter(lt),i=e.map(e=>e.max).filter(lt),s=e.map(e=>e.step).filter(lt),a=ct(e.map(e=>e.scale_factor).filter(lt)),n=e.map(e=>e.optional).filter(lt),o=e.map(e=>e.unit).filter(lt),r=e.map(e=>e.name).filter(lt),c=s.length?Math.max(...s):1,l=e=>(e=Math.round(e/c)*c,parseFloat(e.toPrecision(12)));return{type:Fe.Level,min:l(t.length?Math.min(...t):0),max:l(i.length?Math.max(...i):255),step:c,scale_factor:1==a.length?a[0]:1,optional:n.length&&n.every(e=>e)||!1,unit:o.length?o.reduce((e,t)=>t):"",name:r.length?r.reduce((e,t)=>t):void 0}}function ks(e,t){let i=Number(e);return isNaN(i)?"":(1!=t.scale_factor&&(i/=t.scale_factor,i=Math.round(i/t.step)*t.step,i=parseFloat(i.toPrecision(12)),i>t.max?i=t.max:i<t.min&&(i=t.min)),`${i}${t.unit}`)}const xs=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage";case"door":return"hass:door-closed";case"shutter":return"hass:window-shutter";case"blind":return"hass:blinds";case"window":return"hass:window-closed";default:return"hass:window-shutter"}},$s=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage-open";case"door":return"hass:door-open";case"shutter":return"hass:window-shutter-open";case"blind":return"hass:blinds-open";case"window":return"hass:window-open";default:return"hass:window-shutter-open"}};function js(...e){const t=e.map(e=>e.name).filter(lt);return{type:Fe.Text,name:t.length?t.reduce((e,t)=>t):void 0,multiline:e.some(e=>e.multiline)}}const zs={alarm_control_panel:"hass:alarm-light-outline",automation:"hass:playlist-play",binary_sensor:"hass:radiobox-blank",camera:"hass:camera",climate:"hass:home-thermometer-outline",cover:"hass:window-shutter",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",humidifier:"hass:air-humidifier",input_boolean:"hass:drawing",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb-outline",lock:"hass:lock-open-outline",media_player:"hass:cast-connected",notify:"hass:message-text-outline",person:"hass:account-outline",proximity:"hass:map-marker-distancenb ",remote:"hass:remote",scene:"hass:palette-outline",script:"hass:file-document",sensor:"hass:eye",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",vacuum:"hass:robot-vacuum",water_heater:"hass:water-boiler"};function Os(e,t){const i=Ne(e),s=t.states[e];switch(i){case"binary_sensor":return(e=>e&&Xe(Object.assign(Object.assign({},e),{state:"off"}))||"hass:radiobox-blank")(s);case"cover":return xs(s);case"sensor":return(e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"humidity":return"hass:water-percent";case"illuminance":return"hass:brightness-5";case"temperature":return"hass:thermometer";case"power":return"hass:flash";case"pressure":return"hass:gauge";case"signal_strength":return"hass:wifi";default:return"°C"==e.attributes.unit_of_measurement||"°F"==e.attributes.unit_of_measurement?"hass:thermometer":"hass:eye"}})(s);default:return i in zs?zs[i]:"hass:folder-outline"}}function Ss(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=!e.includes(".")&&t.includes(".")?e==Ne(t):e==t;else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}function Es(e,t,i){const s=e in t.states?t.states[e]:void 0;let a={id:e,name:s?s.attributes.friendly_name||Le(e):"(unknown entity)",icon:s?s.attributes.icon:"help-circle-outline"};if(!s&&"notify"==Ne(e)){let i=Le(e),s=Os(e,t);if(i.includes("mobile_app_")&&(i=i.split("mobile_app_").pop(),"device_tracker."+i in t.states)){i=t.states["device_tracker."+i].attributes.friendly_name||i,s="hass:cellphone-text"}a=Object.assign(Object.assign({},a),{name:i,icon:s})}if(void 0!==i.standard_configuration&&!i.standard_configuration||a.icon?a.icon||(a=Object.assign(Object.assign({},a),{icon:"folder-outline"})):a=Object.assign(Object.assign({},a),{icon:Os(e,t)}),i.customize){Object.entries(i.customize).filter(([e])=>Ss(e,a.id)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e).forEach(e=>{a=Object.assign(Object.assign({},a),nt(e,["name","icon"]))})}return a}const Cs=/\{[^\}]+\}/g,Ds=/\[([^\]]+)\]/;function Ms(e){let t=e.name;t||(t=pt(Le(e.service)));const i=t.match(Ds);if(i){let s=i[1];const a=i[1].match(Cs);return a&&a.length&&a.every(t=>{const i=t.substring(1,t.length-1);if(!Object.keys(e.service_data||{}).includes(i))return!1;let a="";return a=Object.keys(e.variables||{}).includes(i)?e.variables[i].type==Fe.Level?ks(e.service_data[i],e.variables[i]):e.variables[i].type==Fe.List?bs(e.service_data[i],e.variables[i]):function(e,t){return String(e)}(e.service_data[i],e.variables[i]):e.service_data[i],s=s.replace(t,a),!0})?t.replace(i[0],s):t.replace(i[0],"")}return t||""}function Ts(e){return e.includes("daily")?Ge.Daily:e.includes("workday")?Ge.Workday:e.includes("weekend")?Ge.Weekend:Ge.Custom}function As(e){let t=new Date;const i=(e||"").match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);null!==i&&t.setFullYear(Number(i[1]),Number(i[2])-1,Number(i[3]));const s=(e||"").match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);return null!==s&&t.setHours(Number(s[1]),Number(s[2]),s.length>4?Number(s[4]):t.getSeconds()),t}const Ns=(e,t,i)=>{let s=((e,t,i)=>{const s=[{value:"off",icon:"hass:power-off",name:e("state_attributes.climate.hvac_action.off")},{value:"heat",icon:"hass:fire",name:e("state_attributes.climate.hvac_action.heating")},{value:"cool",icon:"hass:snowflake",name:e("state_attributes.climate.hvac_action.cooling")},{value:"heat_cool",icon:"hass:thermometer"},{value:"auto",icon:"hass:autorenew"},{value:"dry",icon:"hass:water-percent",name:e("state_attributes.climate.hvac_action.drying")},{value:"fan_only",icon:"hass:fan",name:e("state_attributes.climate.hvac_action.fan")}],a=t&&Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes:[];return i?s.filter(e=>a.find(t=>t===e.value)):s})(e.localize,t,i);1==s.length&&i&&(s=[]);const a=s.map(e=>e.value),n=((e,t)=>{const i=[{value:"none",name:e("state_attributes.climate.preset_mode.none"),icon:"hass:cancel"},{value:"eco",name:e("state_attributes.climate.preset_mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.climate.preset_mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.climate.preset_mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.climate.preset_mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.climate.preset_mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.climate.preset_mode.sleep"),icon:"hass:sleep"},{value:"activity",name:e("state_attributes.climate.preset_mode.activity"),icon:"hass:account-alert-outline"}];return(t&&Array.isArray(t.attributes.preset_modes)?t.attributes.preset_modes:[]).map(e=>i.find(t=>t.value===e)||{value:e})})(e.localize,t),o=ws({name:e.localize("ui.card.weather.attributes.temperature"),min:void 0!==(null==t?void 0:t.attributes.min_temp)?null==t?void 0:t.attributes.min_temp:e.config.unit_system.temperature.includes("F")?50:10,max:void 0!==(null==t?void 0:t.attributes.max_temp)?null==t?void 0:t.attributes.max_temp:e.config.unit_system.temperature.includes("F")?90:30,step:(null==t?void 0:t.attributes.target_temp_step)?null==t?void 0:t.attributes.target_temp_step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),r=[];return n.length&&r.push({service:"climate.set_preset_mode",variables:{preset_mode:ys({name:e.localize("ui.card.climate.preset_mode"),options:n})},icon:"hass:cloud-download-outline",name:as("services.climate.set_preset_mode",vt(e)),supported_feature:16}),!a.includes("off")&&i||r.push({service:"climate.set_hvac_mode",service_data:{hvac_mode:"off"},icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_off")}),a.includes("off")&&i||r.push({service:"climate.turn_off",icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_off")}),!a.includes("heat")&&i||r.push({service:"climate.set_temperature",service_data:{hvac_mode:"heat"},variables:{temperature:o},icon:"hass:fire",name:as("services.climate.set_temperature_hvac_mode_heat",vt(e)),supported_feature:1}),!a.includes("cool")&&i||r.push({service:"climate.set_temperature",service_data:{hvac_mode:"cool"},variables:{temperature:o},icon:"hass:snowflake",name:as("services.climate.set_temperature_hvac_mode_cool",vt(e)),supported_feature:1}),(a.includes("cool")||a.includes("heat"))&&i||r.push({service:"climate.set_temperature",variables:{temperature:o},icon:"hass:thermometer",name:as("services.climate.set_temperature",vt(e)),supported_feature:1}),!a.includes("heat_cool")&&i||r.push({service:"climate.set_temperature",service_data:{hvac_mode:"heat_cool"},variables:{target_temp_low:ws(o,{name:e.localize("ui.panel.lovelace.editor.card.generic.minimum")}),target_temp_high:ws(o,{name:e.localize("ui.panel.lovelace.editor.card.generic.maximum")})},icon:"hass:fire",name:as("services.climate.set_temperature_hvac_mode_heat_cool",vt(e)),supported_feature:2}),i&&(s=s.filter(e=>!["off","heat","cool","heat_cool"].includes(e.value))),s.length&&r.push({service:"climate.set_hvac_mode",variables:{hvac_mode:ys({name:e.localize("ui.card.climate.operation"),options:s})},icon:"hass:cog-transfer-outline",name:as("services.climate.set_hvac_mode",vt(e))}),r},Ls=(e,t,i)=>{const s=((e,t,i)=>{const s=[{value:"normal",name:e("state_attributes.humidifier.mode.normal"),icon:"hass:account-outline"},{value:"eco",name:e("state_attributes.humidifier.mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.humidifier.mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.humidifier.mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.humidifier.mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.humidifier.mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.humidifier.mode.sleep"),icon:"hass:account-sleep"},{value:"auto",name:e("state_attributes.humidifier.mode.auto"),icon:"hass:autorenew"},{value:"baby",name:e("state_attributes.humidifier.mode.baby"),icon:"hass:baby-bottle-outline"}],a=t&&Array.isArray(t.attributes.available_modes)?t.attributes.available_modes:[];return i?s.filter(e=>a.find(t=>t===e.value)):s})(e.localize,t,i),a=[{service:"humidifier.turn_on",icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"humidifier.turn_off",icon:"hass:power-off",name:e.localize("ui.card.vacuum.actions.turn_off")},{service:"humidifier.set_humidity",variables:{humidity:ws({name:e.localize("ui.card.humidifier.humidity"),min:void 0!==(null==t?void 0:t.attributes.min_humidity)?null==t?void 0:t.attributes.min_humidity:0,max:void 0!==(null==t?void 0:t.attributes.max_humidity)?null==t?void 0:t.attributes.max_humidity:100,step:1,unit:"%"})},icon:"hass:water-percent",name:as("services.humidifer.set_humidity",vt(e))}];return s.length&&a.push({service:"humidifier.set_mode",variables:{mode:ys({name:e.localize("ui.card.humidifier.mode"),options:s})},icon:"hass:cog-transfer-outline",name:as("services.humidifier.set_mode",vt(e))}),a},Is=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?t.attributes.options.map(e=>({value:String(e)})):[],Ps=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?t.attributes.options.map(e=>({value:String(e)})):[],qs=e=>{if(!e)return 0;switch(Ne(e.entity_id)){case"light":return(e=>{if(!e||!Array.isArray(e))return 0;let t=e.map(e=>{switch(e){case"brightness":case"color_temp":case"hs":case"xy":case"rgb":case"rgbw":case"rgbww":return 1;case"unknown":case"onoff":case"white":default:return 0}});return t=ct(t),t.reduce((e,t)=>e|t,0)})(e.attributes.supported_color_modes);default:return e.attributes.supported_features||0}},Rs=(e,t)=>t&&t.attributes.source_list&&Array.isArray(t.attributes.source_list)?Array(t.attributes.source_list).map(e=>({value:String(e)})):[],Vs=(e,t,i)=>{const s=[{value:"off",icon:"hass:power-off",name:e("component.water_heater.state._.off")},{value:"eco",icon:"hass:leaf",name:e("component.water_heater.state._.eco")},{value:"electric",icon:"hass:lightning-bolt",name:e("component.water_heater.state._.electric")},{value:"gas",icon:"hass:fire",name:e("component.water_heater.state._.gas")},{value:"heat_pump",icon:"hass:hvac",name:e("component.water_heater.state._.heat_pump")},{value:"high_demand",icon:"hass:water-plus-outline",name:e("component.water_heater.state._.high_demand")},{value:"performance",icon:"hass:rocket-launch-outline",name:e("component.water_heater.state._.performance")}],a=t&&Array.isArray(t.attributes.operation_list)?t.attributes.operation_list:[];return i?s.filter(e=>a.find(t=>t===e.value)):s};function Hs(e,t,i=!1){const s=(e,t)=>Object.keys(t.variables||{}).includes(e)&&t.variables[e].type==Fe.Level&&t.variables[e].optional;if(e.service!==t.service)return!1;const a=Object.keys(e.service_data||{}),n=Object.keys(e.variables||{}),o=Object.keys(t.service_data||{}),r=Object.keys(t.variables||{}),c=[...new Set([...a,...n])],l=[...new Set([...o,...r])];return[...new Set([...c,...l])].every(d=>{if(!c.includes(d))return s(d,t);if(!l.includes(d))return s(d,e);if(a.filter(e=>!n.includes(e)).includes(d)&&o.filter(e=>!r.includes(e)).includes(d))return e.service_data[d]===t.service_data[d];if(n.includes(d)&&r.includes(d))return!0;if(!i)return!1;const u=a.includes(d)?e.service_data[d]:t.service_data[d],h=n.includes(d)?e.variables[d]:t.variables[d];return h.type===Fe.List?h.options.some(e=>e.value===u):h.type===Fe.Level?!isNaN(u):h.type==Fe.Text})}function Us(e){if(Object.keys(e||{}).length)return Object.entries(e).map(([e,t])=>"options"in t?[e,ys(t)]:"min"in t||"max"in t?[e,ws(t)]:[e,js(t)]).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{})}function Fs(...e){const t=ct(e.map(e=>e.type).filter(lt));return t.length?t.length>1?void 0:t[0]==Fe.Level?ws(...e):t[0]==Fe.List?ys(...e):js(...e):(e=Object.values(Us(Object.assign({},...e))),Fs(...e))}function Bs(e){if(1==e.length)return e[0];let t=e[0].filter(t=>e.slice(1).every(e=>e.some(e=>Hs(t,e))));return t=t.map(t=>{const i=Object.entries(t.variables||{}).map(([i,s])=>{const a=e.map(e=>e.find(e=>Hs(e,t)));if(!a.every(e=>e&&e.variables&&i in e.variables))return[i,void 0];const n=a.map(e=>e.variables[i]);return n.every(e=>s.type==e.type)?[i,Fs(...n)]:[i,void 0]}).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{});if(!Object.values(i).find(e=>e.type==Fe.List&&!e.options.length))return t=Object.assign(Object.assign({},t),{variables:i})}).filter(lt),t}function Ys(e,t,i=!0){try{const s=Ne(e),a=t.states[e];switch(s){case"alarm_control_panel":return((e,t)=>[{service:"alarm_control_panel.alarm_disarm",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.alarm_control_panel.disarm")},{service:"alarm_control_panel.alarm_arm_home",icon:"hass:home-outline",name:e.localize("ui.card.alarm_control_panel.arm_home"),supported_feature:1},{service:"alarm_control_panel.alarm_arm_away",icon:"hass:exit-run",name:e.localize("ui.card.alarm_control_panel.arm_away"),supported_feature:2},{service:"alarm_control_panel.alarm_arm_night",icon:"hass:power-sleep",name:e.localize("ui.card.alarm_control_panel.arm_night"),supported_feature:4},{service:"alarm_control_panel.alarm_arm_custom_bypass",icon:"hass:shield-lock-outline",name:e.localize("ui.card.alarm_control_panel.arm_custom_bypass"),supported_feature:16}])(t);case"automation":return((e,t)=>[{service:"automation.turn_on",icon:"hass:flash",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"automation.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.vacuum.actions.turn_off")},{service:"automation.trigger",icon:"hass:play",name:e.localize("ui.card.script.run")}])(t);case"climate":return Ns(t,a,i);case"cover":return((e,t)=>[{service:"cover.open_cover",icon:$s(t),name:as("services.cover.open_cover",vt(e)),supported_feature:1},{service:"cover.close_cover",icon:xs(t),name:as("services.cover.close_cover",vt(e)),supported_feature:2},{service:"cover.set_cover_position",variables:{position:ws({name:e.localize("ui.card.cover.position",vt(e)),min:0,max:100,step:1,unit:"%"})},supported_feature:4,icon:"hass:ray-vertex",name:as("services.cover.set_cover_position",vt(e))},{service:"cover.set_cover_tilt_position",variables:{tilt_position:ws({name:e.localize("ui.card.cover.tilt_position",vt(e)),min:0,max:100,step:1,unit:"%"})},supported_feature:128,icon:"hass:valve",name:as("services.cover.set_cover_tilt_position",vt(e))}])(t,a);case"fan":return((e,t)=>{const i=[{service:"fan.turn_on",icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"fan.turn_off",icon:"hass:power-off",name:e.localize("ui.card.vacuum.actions.turn_off")},{service:"fan.set_percentage",variables:{percentage:ws({name:e.localize("ui.card.fan.speed"),min:0,max:100,step:1,unit:"%"})},supported_feature:1,icon:"hass:weather-windy",name:as("services.fan.set_speed",vt(e))},{service:"fan.oscillate",variables:{oscillating:ys({name:e.localize("ui.card.fan.oscillate"),options:[{value:"True",name:e.localize("state.default.on"),icon:"hass:flash"},{value:"False",name:e.localize("state.default.off"),icon:"hass:flash-off"}]})},supported_feature:2,icon:"hass:arrow-left-right",name:as("services.fan.oscillate",vt(e))},{service:"fan.set_direction",variables:{direction:ys({name:e.localize("ui.card.fan.direction"),options:[{value:"forward",name:e.localize("ui.card.fan.forward"),icon:"hass:autorenew"},{value:"reverse",name:e.localize("ui.card.fan.reverse"),icon:"hass:sync"}]})},supported_feature:4,icon:"hass:cog-clockwise",name:as("services.fan.set_direction",vt(e))}],s=t&&Array.isArray(t.attributes.preset_modes)?t.attributes.preset_modes:[];return s.length&&i.push({service:"fan.set_preset_mode",variables:{preset_mode:ys({name:e.localize("ui.card.fan.preset_mode"),options:s.map(e=>Object({value:e}))})},supported_feature:8,icon:"hass:cloud-download-outline",name:as("services.climate.set_preset_mode",vt(e))}),i})(t,a);case"group":const s=(a&&a.attributes.entity_id&&Array.isArray(a.attributes.entity_id)?a.attributes.entity_id:[]).map(e=>Ys(e,t,i));return function(e,t,i){const s=t&&t.attributes.entity_id&&Array.isArray(t.attributes.entity_id)?t.attributes.entity_id:[];return i=i.map((t,i)=>{const a=e.states[s[i]],n=qs(a);return t=t.filter(e=>!e.supported_feature||e.supported_feature&n).map(e=>ot(e,"supported_feature"))}),[...new Set(s.map(e=>Ne(e)))].length>1&&(i=i.map(e=>e.map(e=>"turn_on"==Le(e.service)||"turn_off"==Le(e.service)?Object.assign(Object.assign({},e),{service:"homeassistant."+Le(e.service),icon:"turn_on"==Le(e.service)?"flash":"flash-off"}):e))),i.length?Bs(i):[]}(t,a,s);case"humidifier":return Ls(t,a,i);case"input_boolean":return((e,t)=>[{service:"input_boolean.turn_on",icon:"hass:flash",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"input_boolean.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.vacuum.actions.turn_off")}])(t);case"input_number":return((e,t)=>[{service:"input_number.set_value",variables:{value:ws({name:e.localize("ui.panel.config.helpers.types.input_number"),min:t&&t.attributes.min?Number(t.attributes.min):0,max:t&&t.attributes.max?Number(t.attributes.max):255,step:t&&t.attributes.step?Number(t.attributes.step):1,unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""})},icon:"hass:counter",name:as("services.input_number.set_value",vt(e))}])(t,a);case"input_select":return((e,t)=>[{service:"input_select.select_option",variables:{option:ys({name:e.localize("ui.components.dialogs.input_select.options"),options:Is(e.localize,t)})},icon:"counter",name:as("services.input_select.select_option",vt(e))}])(t,a);case"select":return((e,t)=>[{service:"select.select_option",variables:{option:ys({name:e.localize("ui.components.dialogs.select.options"),options:Ps(e.localize,t)})},icon:"counter",name:as("services.select.select_option",vt(e))}])(t,a);case"light":return((e,t)=>{const i=[{service:"light.turn_off",icon:"hass:lightbulb-off",name:e.localize("ui.card.vacuum.actions.turn_off")}];return 1&qs(t)?i.push({service:"light.turn_on",variables:{brightness:ws({name:e.localize("ui.card.light.brightness"),min:0,max:100,scale_factor:2.55,step:1,unit:"%",optional:!0})},icon:"hass:lightbulb-on",name:as("services.light.turn_on",vt(e)),supported_feature:1}):i.push({service:"light.turn_on",icon:"hass:lightbulb-on",name:e.localize("ui.card.vacuum.actions.turn_on")}),i})(t,a);case"lock":return((e,t)=>[{service:"lock.unlock",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.lock.unlock")},{service:"lock.lock",icon:"hass:lock-outline",name:e.localize("ui.card.lock.lock")}])(t);case"media_player":return((e,t)=>[{service:"media_player.turn_on",icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_on"),supported_feature:128},{service:"media_player.turn_off",icon:"hass:power-off",name:e.localize("ui.card.vacuum.actions.turn_off"),supported_feature:256},{service:"media_player.select_source",variables:{source:ys({name:e.localize("ui.card.media_player.source"),options:Rs(e.localize,t)})},icon:"hass:music-box-multiple-outline",name:as("services.media_player.select_source",vt(e)),supported_feature:2048}])(t,a);case"notify":return((e,t)=>[{service:t,icon:"hass:message-alert",name:as("services.notify.notify",vt(e)),variables:{title:js({name:e.localize("ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title")}),message:js({name:e.localize("ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message"),multiline:!0})}}])(t,e);case"scene":return((e,t)=>[{service:"scene.turn_on",icon:"hass:play",name:e.localize("ui.card.vacuum.actions.turn_on")}])(t);case"script":return((e,t)=>{const i=[{service:"script.turn_on",icon:"hass:flash",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"script.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.vacuum.actions.turn_off")}];return t&&i.push({service:"script."+Le(t.entity_id),icon:"hass:play",name:as("services.script.script",vt(e))}),i})(t,a);case"switch":return((e,t)=>[{service:"switch.turn_on",icon:"hass:flash",name:e.localize("ui.card.vacuum.actions.turn_on")},{service:"switch.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.vacuum.actions.turn_off")}])(t);case"vacuum":return((e,t)=>[{service:"vacuum.turn_on",icon:"hass:power",name:e.localize("ui.card.vacuum.actions.turn_on"),supported_feature:1},{service:"vacuum.start",icon:"hass:play-circle-outline",name:e.localize("ui.card.vacuum.start_cleaning"),supported_feature:8192},{service:"vacuum.start_pause",icon:"hass:play-circle-outline",name:as("services.vacuum.start_pause",vt(e)),supported_feature:4}])(t);case"water_heater":return((e,t,i)=>[{service:"water_heater.set_temperature",variables:{temperature:ws({name:e.localize("ui.card.weather.attributes.temperature"),min:void 0!==(null==t?void 0:t.attributes.min_temp)?null==t?void 0:t.attributes.min_temp:e.config.unit_system.temperature.includes("F")?50:10,max:void 0!==(null==t?void 0:t.attributes.max_temp)?null==t?void 0:t.attributes.max_temp:e.config.unit_system.temperature.includes("F")?90:30,step:(null==t?void 0:t.attributes.target_temp_step)?null==t?void 0:t.attributes.target_temp_step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature})},icon:"hass:thermometer",name:as("services.climate.set_temperature",vt(e)),supported_feature:1},{service:"water_heater.set_operation_mode",variables:{operation_mode:ys({name:e.localize("ui.card.water_heater.operation"),options:Vs(e.localize,t,i)})},icon:"hass:cog-transfer-outline",name:as("services.water_heater.set_operation_mode",vt(e)),supported_feature:2},{service:"water_heater.set_away_mode",variables:{mode:ys({name:e.localize("ui.card.water_heater.away_mode"),options:[{value:"on",name:e.localize("ui.card.input_boolean.on"),icon:"hass:toggle-switch-outline"},{value:"off",name:e.localize("ui.card.input_boolean.off"),icon:"hass:toggle-switch-off-outline"}]})},icon:"hass:car-traction-control",name:as("services.water_heater.set_away_mode",vt(e)),supported_feature:4}])(t,a,i);default:return[]}}catch(t){return console.error(`Scheduler-card failed to load actions for '${e}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`),[]}}function Ws(e,t){const i=e.entity_id||e.service,s=e.service,a=e.service_data||{},n=Object.keys(a);let o=Ys(i,t,!1),r=o.filter(t=>Hs(e,t,!0));if(1==r.length?o=r:(o=o.filter(e=>e.service==s),o=o.filter(e=>Object.keys(e.service_data||{}).every(e=>n.includes(e)))),o.length>1&&o.sort((e,t)=>{const i=Object.entries(e.service_data||{}).map(([e,t])=>e in a?a[e]==t?1:-1:0).reduce((e,t)=>e+t,0),s=Object.entries(t.service_data||{}).map(([e,t])=>e in a?a[e]==t?1:-1:0).reduce((e,t)=>e+t,0);if(i>s)return-1;if(i<s)return 1;const o=ct([...Object.keys(e.service_data||{}),...Object.keys(e.variables||{})]),r=ct([...Object.keys(t.service_data||{}),...Object.keys(t.variables||{})]),c=n.filter(e=>o.includes(e)).length,l=n.filter(e=>r.includes(e)).length;if(c>l)return-1;if(c<l)return 1;const d=o.filter(e=>!n.includes(e)).length,u=r.filter(e=>!n.includes(e)).length;return d>u?1:d<u?-1:0}),o.length){let e=Object.assign({},o[0].variables||{});return Object.entries(a).forEach(([t,i])=>{Object.keys(e||{}).includes(t)&&e[t].type==Fe.List&&(e=Object.assign(Object.assign({},e),{[t]:e[t].options.some(e=>e.value==i)?e[t]:Object.assign(Object.assign({},e[t]),{options:[...e[t].options,{value:i}]})}))}),Object.assign(Object.assign({},o[0]),{service_data:Object.assign(Object.assign({},o[0].service_data||{}),a),variables:e})}return{service:s,service_data:e.service_data}}function Gs(e,t,i){if(Array.isArray(e)){return Bs(e.map(e=>Gs(e,t,i)))}const s=t.states[e];let a=i.standard_configuration?Ys(e,t):[];const n=rt(Object.entries(i.customize).filter(([t])=>Ss(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.exclude_actions).filter(lt));n.length&&(a=a.filter(e=>!n.some(t=>{return(i=Ms(e),i.replace(/_/g," ").trim().toLowerCase()).includes(t);var i})));const o=rt(Object.entries(i.customize).filter(([t])=>Ss(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.actions).filter(lt));o.length&&o.forEach(s=>{Ne(s.service).length||(s=Object.assign(Object.assign({},s),{service:Ne(e)+"."+Le(s.service)})),s.service_data&&(s=Object.assign(Object.assign({},s),{service_data:ot(s.service_data,"entity_id")}));let n=a.findIndex(e=>Hs(e,s));if(n<0){const o=(i.standard_configuration?Ys(e,t,!1):[]).find(e=>Hs(e,s));o&&(a=[...a,o],n=a.length-1)}if(n>=0){if(Object.assign(a,{[n]:Object.assign(Object.assign({},a[n]),ot(s,"variables"))}),Object.keys(s.variables||{}).length){let e=a[n].variables||{};e=Object.entries(e).map(([e,t])=>Object.keys(s.variables).includes(e)?[e,Object.assign(Object.assign({},t),s.variables[e])]:[e,s.variables[e]]).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{});const t=Object.keys(s.variables).filter(t=>!Object.keys(e).includes(t));e=Object.assign(Object.assign({},e),Us(nt(s.variables,t))),Object.assign(a,{[n]:Object.assign(Object.assign({},a[n]),{variables:e})})}}else s=Object.assign(Object.assign({},s),{variables:Us(s.variables)}),a.push(s)});const r=qs(s);return a=a.filter(e=>!e.supported_feature||e.supported_feature&r),a=a.map(e=>(Object.keys(e.variables||{}).length&&Object.keys(e.variables).forEach(t=>{e.variables[t].type==Fe.List&&1==e.variables[t].options.length&&(e=Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{[t]:e.variables[t].options[0].value}),variables:ot(e.variables,t)}))}),e)),a}let Zs=class extends ae{set schedule(e){this._schedule=e}set hass(e){this._hass=e}get hass(){return this._hass}shouldUpdate(e){if(e.size>1)return!0;const t=e.get("_hass");if(t&&this._schedule)return JSON.stringify(t.states[this._schedule.entity_id])!==JSON.stringify(this._hass.states[this._schedule.entity_id]);const i=e.get("_schedule");return!i||JSON.stringify(i)!==JSON.stringify(this._schedule)}render(){var e,t;if(!this._schedule.next_entries.length)return"NOT_RUNNING"!==this._hass.config.state?P`
            <hui-warning>
              Defective schedule entity: ${this._schedule.entity_id}
            </hui-warning>
          `:P`
            <hui-warning>
              ${this._hass.localize("ui.panel.lovelace.warning.starting")}
            </hui-warning>
          `;const i=this._schedule.timeslots[this._schedule.next_entries[0]],s=ct(i.actions.map(e=>e.entity_id||e.service)).map(e=>Es(e,this._hass,this.config)),a=1==ct(s.map(e=>e.icon)).length?s[0].icon:Os(s[0].id,this._hass),n=ct(s.map(e=>Ne(e.id))),o=1==s.length?s[0].name:1==n.length?`${s.length}x ${as("domains."+n[0],vt(this._hass))||n[0]}`:s.length+"x entities",r=Gs(i.actions[0].entity_id||i.actions[0].service,this._hass,this.config).filter(e=>Hs(e,i.actions[0],!0)).reduce((e,t)=>t,void 0),c=r?Object.assign(Object.assign({},r),{service_data:Object.assign(Object.assign({},r.service_data),Object.entries(i.actions[0].service_data||{}).filter(([e])=>Object.keys(r.variables||{}).includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}))}):Ws(i.actions[0],this._hass),l=this.config.display_options&&this.config.display_options.icon&&"entity"==this.config.display_options.icon?a:c.icon,d=e=>{switch(e){case"default":return d("name")||`${d("entity")}: ${d("action")}`;case"name":return this._schedule.name||"";case"relative-time":return"<my-relative-time></my-relative-time>";case"additional-tasks":return this._schedule.timeslots.length>1?"+"+as("ui.panel.overview.additional_tasks",vt(this._hass),"{number}",String(this._schedule.timeslots.length-1)):"";case"time":return ht(this.computeTime(this._schedule.timeslots[this._schedule.next_entries[0]]));case"days":return ht(this.computeDays(this._schedule.weekdays));case"entity":return o.length?ht(pt(o)):"";case"action":return ht(Ms(c));case"tags":return(this._schedule.tags||[]).map(e=>`<tag>${e}</tag>`).join("");default:const t=/\{([^\}]+)\}/;let i;for(;i=t.exec(e);)e=e.replace(i[0],String(d(String(i[1]))));return e}},u=e=>{const t=e=>{const t=e.split("<my-relative-time></my-relative-time>");if(t.length>1)return P`
            ${t[0]?ls(t[0]):""}
            <my-relative-time
              .hass=${this._hass}
              .datetime=${new Date(this._schedule.timestamps[this._schedule.next_entries[0]])}
            >
            </my-relative-time>
            ${t[1]?ls(t[1]):""}
          `;const i=e.split(/<tag>(.*?)<\/tag>/g);return i.length>1?i.filter(e=>e.length).map(e=>ls(`<span class="filter-tag">${e}</span>`)):ls(e)};return"string"==typeof e?t(d(e)):e.map(e=>{const i=d(e);return i?P`
                  ${t(i)}<br />
                `:""})};return P`
      <ha-icon icon="${mt(l)}"></ha-icon>
      <div class="info">
        ${this.config.display_options&&this.config.display_options.primary_info?u(this.config.display_options.primary_info):u("{entity}: {action}")}
        <div class="secondary">
          ${this.config.display_options&&this.config.display_options.secondary_info?u(this.config.display_options.secondary_info):u(["relative-time","additional-tasks"])}
        </div>
      </div>
      <ha-switch
        ?checked=${["on","triggered"].includes((null===(e=this.hass.states[this._schedule.entity_id])||void 0===e?void 0:e.state)||"")}
        ?disabled=${"completed"==(null===(t=this.hass.states[this._schedule.entity_id])||void 0===t?void 0:t.state)}
        @click=${this.toggleDisabled}
      >
      </ha-switch>
    `}computeDays(e){if(!this._hass)return"";switch(Ts(e)){case Ge.Daily:return as("ui.components.date.day_types_long.daily",vt(this._hass));case Ge.Workday:return as("ui.components.date.day_types_long.workdays",vt(this._hass));case Ge.Weekend:return as("ui.components.date.day_types_long.weekend",vt(this._hass));case Ge.Custom:const t=e.map(e=>{switch(e){case"mon":return 1;case"tue":return 2;case"wed":return 3;case"thu":return 4;case"fri":return 5;case"sat":return 6;case"sun":return 7;default:return}}).filter(e=>e),i=function(e){const t=[];for(let i=0;i<e.length-1;i++){let s=i+1;for(;e[s]-e[s-1]==1;)s++;t.push(s-i)}return t}(t),s=Math.max(...i);if(6==t.length){const e=[1,2,3,4,5,6,7].filter(e=>!t.includes(e));return as("ui.components.date.repeated_days_except",vt(this._hass),"{excludedDays}",us(e.pop(),vt(this._hass)))}const a=t.map(e=>us(e,vt(this._hass)));if(t.length>=3&&s>=3){const e=i.reduce((e,t,i)=>t==s?i:e,0);a.splice(e,s,as("ui.components.date.days_range",vt(this._hass),["{startDay}","{endDay}"],[a[e],a[e+s-1]]))}const n=a.length>1?`${a.slice(0,-1).join(", ")} ${this._hass.localize("ui.common.and")} ${a.pop()}`:""+a.pop();return as("ui.components.date.repeated_days",vt(this._hass),"{days}",n);default:return""}}computeTime(e){const t=e=>{const t=at(e);if(!t)return e;const i=t.event==We.Sunrise?this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").toLowerCase():this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset").toLowerCase();if(Math.abs(tt(t.offset,this.hass))<300)return as("ui.components.time.at_sun_event",vt(this.hass),"{sunEvent}",i);const s="-"==t.sign?this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1).toLowerCase():this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1).toLowerCase();return`${ms(As(t.offset),vt(this.hass),hs.twenty_four)} ${s} ${i}`};if(e.stop){const i=at(e.start)?t(e.start):ms(As(e.start),vt(this.hass)),s=at(e.stop)?t(e.stop):ms(As(e.stop),vt(this.hass));return as("ui.components.time.interval",vt(this.hass),["{startTime}","{endTime}"],[i,s])}{const i=e.start;if(at(i))return t(i);{const e=As(i);return as("ui.components.time.absolute",vt(this.hass),"{time}",ms(e,vt(this.hass)))}}}toggleDisabled(e){if(!this._hass||!this._schedule)return;e.stopPropagation();const t=!e.target.checked;this._hass.callService("switch",t?"turn_on":"turn_off",{entity_id:this._schedule.entity_id})}};Zs.styles=r`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    .info,
    .info > * {
      color: var(--primary-text-color);
      transition: color 0.2s ease-in-out;
    }
    .secondary {
      display: block;
      color: var(--secondary-text-color);
      transition: color 0.2s ease-in-out;
    }
    ha-icon {
      flex: 0 0 40px;
      color: var(--state-icon-color);
      transition: color 0.2s ease-in-out;
    }
    ha-switch {
      padding: 13px 5px;
    }
    hui-warning {
      flex: 1 0 40px;
    }
    span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.54);
      color: var(--primary-text-color);
      height: 24px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      padding: 0px 10px;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      margin: 4px 2px 0px 2px;
      transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
    }
    :host([disabled]) {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --paper-item-icon-color: var(--disabled-text-color);
      --state-icon-color: var(--disabled-text-color);
    }
    :host([disabled]) span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.3);
    }
  `,t([re()],Zs.prototype,"config",void 0),t([re()],Zs.prototype,"_schedule",void 0),t([re()],Zs.prototype,"_hass",void 0),Zs=t([ne("scheduler-entity-row")],Zs);const Js=e=>e.callWS({type:"scheduler"}),Ks=(e,t)=>e.callWS({type:"scheduler/item",schedule_id:t}),Xs=e=>e.callWS({type:"scheduler/tags"});function Qs(e,t){const i=P`
    <b>Something went wrong!</b><br />
    ${e.body.message}<br /><br />
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;Re(t,"show-dialog",{dialogTag:"dialog-error",dialogImport:()=>Promise.resolve().then((function(){return Ea})),dialogParams:{error:i}})}function ea(e,t){var i;const s=(e,t)=>((t.include||[]).some(t=>Ss(t,e))||Object.keys(t.customize||{}).some(t=>Ss(t,e)))&&!(t.exclude||[]).some(t=>Ss(t,e));return(null===(i=t.groups)||void 0===i?void 0:i.some(t=>s(e,t)))||s(e,t)}const ta=e=>new Date(e.timestamps[e.next_entries[0]]).valueOf(),ia=(e,t)=>{const i=[...e];return i.sort((e,i)=>{var s,a;const n=null===(s=t.states[e.entity_id])||void 0===s?void 0:s.state,o=null===(a=t.states[i.entity_id])||void 0===a?void 0:a.state;if(["on","triggered","off"].includes(n)&&!["on","triggered","off"].includes(o))return-1;if(!["on","triggered","off"].includes(n)&&["on","triggered","off"].includes(o))return 1;const r=ta(e),c=ta(i),l=(new Date).valueOf(),d=r<l&&c<l;return null!==r&&null!==c?r<l&&c>=l?1:r>=l&&c<l?-1:r>c?d?-1:1:r<c?d?1:-1:e.entity_id<i.entity_id?1:-1:null!==c?1:null!==r?-1:e.entity_id<i.entity_id?1:-1}),i};let sa=class extends(os(ae)){constructor(){super(...arguments),this.showDiscovered=!1,this.connectionError=!1}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeMessage(e=>this.updateScheduleItem(e),{type:"scheduler_updated"})]}async updateScheduleItem(e){Ks(this.hass,e.schedule_id).then(t=>{var i;const s=null===(i=this.schedules)||void 0===i?void 0:i.find(t=>t.schedule_id==e.schedule_id);let a=[...this.schedules||[]];t&&this.filterIncludedSchedule(t)?a=s?s.enabled==t.enabled&&ta(s)==ta(t)?a.map(e=>e.schedule_id==t.schedule_id?t:e):ia(a.map(e=>e.schedule_id==t.schedule_id?t:e),this.hass):ia([...a,t],this.hass):s&&(a=a.filter(t=>t.schedule_id!=e.schedule_id)),this.schedules=[...a]})}async loadSchedules(){Js(this.hass).then(e=>{let t=e;t=t.filter(e=>this.filterIncludedSchedule(e)),this.schedules=ia(t,this.hass)}).catch(e=>{this.schedules=[],this.connectionError=!0})}shouldUpdate(e){const t=e.get("hass"),i=e.get("config");return t&&1==e.size&&this.schedules?this.schedules.some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this.hass.states[e.entity_id])):(i&&this.config&&(i.discover_existing!==this.config.discover_existing||i.tags!==this.config.tags)&&(async()=>{await this.loadSchedules()})(),!0)}render(){return this.hass&&this.config&&this.schedules?P`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title?"string"==typeof this.config.title?this.config.title:as("ui.panel.common.title",vt(this.hass)):""}
          </div>
          ${this.schedules.length&&this.config.show_header_toggle?P`
                <ha-switch
                  ?checked=${this.schedules.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")})}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `:""}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${!1!==this.config.show_add_button?P`
              <div class="card-actions">
                <mwc-button @click=${this.newItemClick} ?disabled=${this.connectionError}
                  >${this.hass.localize("ui.components.area-picker.add_dialog.add")}
                </mwc-button>
              </div>
            `:""}
      </ha-card>
    `:P``}getRows(){if(!this.config||!this.hass||!this.schedules)return P``;if(this.connectionError)return P`
        <div>
          <hui-warning>
            ${as("ui.panel.overview.backend_error",vt(this.hass))}
          </hui-warning>
        </div>
      `;if(!Object.keys(this.schedules).length)return P`
        <div>
          ${as("ui.panel.overview.no_entries",vt(this.hass))}
        </div>
      `;const e=[],t=[];return this.schedules.forEach(i=>{i.timeslots.every(e=>e.actions.every(e=>ea(e.entity_id||e.service,this.config)))&&this.filterByTags(i)?e.push(i):t.push(i)}),P`
      ${e.map(e=>{var t;const i=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"";return P`
          <scheduler-entity-row
            ?disabled=${!["on","triggered"].includes(i)}
            .hass=${this.hass}
            .schedule=${e}
            .config=${this.config}
            @click=${()=>this.editItemClick(e.schedule_id)}
          >
          </scheduler-entity-row>
        `})}
      ${Object.keys(t).length?this.showDiscovered?P`
              ${t.map(e=>{var t;const i=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"";return P`
                  <scheduler-entity-row
                    ?disabled=${!["on","triggered"].includes(i)}
                    .hass=${this.hass}
                    .schedule=${e}
                    .config=${this.config}
                    @click=${()=>this.editItemClick(e.schedule_id)}
                  >
                  </scheduler-entity-row>
                `})}
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${ht(as("ui.panel.overview.hide_excluded",vt(this.hass)))}
                </button>
              </div>
            `:P`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${as("ui.panel.overview.excluded_items",vt(this.hass),"{number}",t.length)}
                </button>
              </div>
            `:""}
    `}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;this.schedules.forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}editItemClick(e){const t=new CustomEvent("editClick",{detail:e});this.dispatchEvent(t)}newItemClick(){const e=new CustomEvent("newClick");this.dispatchEvent(e)}filterIncludedSchedule(e){return!!this.config.discover_existing||!!e&&(!!e.timeslots.every(e=>e.actions.every(e=>ea(e.entity_id||e.service,this.config)))&&this.filterByTags(e))}filterByTags(e){var t;const i=gt(this.config.tags);return!i.length||(!!(e.tags||[]).some(e=>i.includes(e))||!(!i.includes("none")||(null===(t=e.tags)||void 0===t?void 0:t.length)))}};sa.styles=r`
    ${ns}
    scheduler-entity-row {
      cursor: pointer;
      margin: 20px 0px;
    }
    hui-warning {
      padding: 10px 0px;
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
  `,t([re()],sa.prototype,"config",void 0),t([re()],sa.prototype,"showDiscovered",void 0),t([re()],sa.prototype,"schedules",void 0),sa=t([ne("scheduler-entities-card")],sa);var aa="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",na="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";function oa(e,t,i){const s=[];t.groups&&t.groups.forEach(t=>{const i={name:t.name,icon:t.icon||"folder-outline",entities:e.filter(e=>ea(e,t))};s.push(i)});const a=e.filter(e=>!s.some(t=>t.entities.includes(e)));return a.map(Ne).filter((e,t,i)=>i.indexOf(e)===t).forEach(e=>{const n={name:as("domains."+e,vt(i))||e,icon:(void 0===t.standard_configuration||t.standard_configuration)&&e in zs?zs[e]:"folder-outline",entities:a.filter(t=>ea(t,{include:[e],exclude:[]}))};s.push(n)}),s}function ra(e,t){try{const s=Ne(e),a=t.states[e];if(!a)return null;switch(s){case"alarm_control_panel":return((e,t)=>ys({options:[{value:"disarmed",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"disarmed"}),vt(e)),icon:"hass:lock-open-variant-outline"},{value:"armed_away",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"armed_away"}),vt(e)),icon:"hass:exit-run"},{value:"armed_home",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"armed_home"}),vt(e)),icon:"hass:home-outline"},{value:"armed_night",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"armed_night"}),vt(e)),icon:"hass:power-sleep"},{value:"triggered",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"triggered"}),vt(e)),icon:"hass:alarm-light-outline"}]}))(t,a);case"binary_sensor":return((e,t)=>ys({options:[{value:"off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e)),icon:Xe(Object.assign(Object.assign({},t),{state:"off"}))},{value:"on",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"on"}),vt(e)),icon:Xe(Object.assign(Object.assign({},t),{state:"on"}))}]}))(t,a);case"climate":return((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e))},{value:"heat",icon:"hass:fire",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"heat"}),vt(e))},{value:"cool",icon:"hass:snowflake",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"cool"}),vt(e))},{value:"heat_cool",icon:"hass:thermometer",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"heat_cool"}),vt(e))},{value:"auto",icon:"hass:autorenew",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"auto"}),vt(e))},{value:"dry",icon:"hass:water-percent",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"dry"}),vt(e))},{value:"fan_only",icon:"hass:fan",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"fan_only"}),vt(e))}];return ys({options:t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?i.filter(e=>t.attributes.hvac_modes.includes(e.value)):i})})(t,a);case"cover":return((e,t)=>ys({options:[{value:"closed",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"closed"}),vt(e)),icon:Xe(Object.assign(Object.assign({},t),{state:"closed"}))},{value:"open",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"open"}),vt(e)),icon:Xe(Object.assign(Object.assign({},t),{state:"open"}))}]}))(t,a);case"device_tracker":return((e,t)=>ys({options:[{value:"home",name:e.localize("state_badge.device_tracker.home",vt(e)),icon:"hass:home-outline"},{value:"not_home",name:e.localize("state_badge.device_tracker.not_home",vt(e)),icon:"hass:exit-run"}]}))(t);case"fan":return((e,t)=>ys({options:[{value:"off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e)),icon:"hass:power-off"},{value:"on",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"on"}),vt(e)),icon:"hass:power"}]}))(t,a);case"group":const e=(a&&a.attributes.entity_id&&Array.isArray(a.attributes.entity_id)?a.attributes.entity_id:[]).map(e=>ra(e,t)).filter(lt);return(i=e).length&&i.every(e=>e.type==i[0].type)?i[0].type==Fe.List?ys(...i):i[0].type==Fe.Level?ws(...i):null:null;case"humdifier":case"input_boolean":return((e,t)=>ys({options:[{value:"off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e)),icon:"hass:flash-off"},{value:"on",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"on"}),vt(e)),icon:"hass:flash"}]}))(t,a);case"input_number":return((e,t)=>ws({name:e.localize("ui.panel.config.helpers.types.input_number"),min:t&&t.attributes.min?Number(t.attributes.min):0,max:t&&t.attributes.max?Number(t.attributes.max):255,step:t&&t.attributes.step?Number(t.attributes.step):1,unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}))(t,a);case"input_select":return((e,t)=>ys({options:Is(e.localize,t).map(e=>Object.assign(e,{name:e.value}))}))(t,a);case"light":return((e,t)=>ys({options:[{value:"off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e)),icon:"hass:lightbulb-off"},{value:"on",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"on"}),vt(e)),icon:"hass:lightbulb"}]}))(t,a);case"lock":return((e,t)=>ys({options:[{value:"unlocked",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"unlocked"}),vt(e)),icon:"hass:lock-open-variant-outline"},{value:"locked",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"locked"}),vt(e)),icon:"hass:lock-outline"}]}))(t,a);case"person":return((e,t)=>ys({options:[{value:"home",name:e.localize("state_badge.person.home",vt(e)),icon:"hass:home-outline"},{value:"not_home",name:e.localize("state_badge.person.not_home",vt(e)),icon:"hass:exit-run"}]}))(t);case"proximity":return((e,t)=>ws({unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}))(0,a);case"select":return((e,t)=>ys({options:Ps(e.localize,t).map(e=>Object.assign(e,{name:e.value}))}))(t,a);case"sensor":return((e,t)=>{if(t&&!isNaN(Number(t.state))){const e=t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"";return ws({unit:e,min:"%"==e?0:void 0,max:"%"==e?100:void 0,step:"%"==e?1:void 0})}return js()})(0,a);case"sun":return((e,t)=>ys({options:[{value:"below_horizon",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"below_horizon"}),vt(e)),icon:"hass:weather-sunny-off"},{value:"above_horizon",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"above_horizon"}),vt(e)),icon:"hass:weather-sunny"}]}))(t,a);case"switch":return((e,t)=>ys({options:[{value:"off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e)),icon:"hass:flash-off"},{value:"on",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"on"}),vt(e)),icon:"hass:flash"}]}))(t,a);case"water_heater":return((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"off"}),vt(e))},{value:"eco",icon:"hass:leaf",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"eco"}),vt(e))},{value:"electric",icon:"hass:lightning-bolt",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"electric"}),vt(e))},{value:"gas",icon:"hass:fire",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"gas"}),vt(e))},{value:"heat_pump",icon:"hass:hvac",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"heat_pump"}),vt(e))},{value:"high_demand",icon:"hass:water-plus-outline",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"high_demand"}),vt(e))},{value:"performance",icon:"hass:rocket-launch-outline",name:qe(e.localize,Object.assign(Object.assign({},t),{state:"performance"}),vt(e))}];return ys({options:t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?i.filter(e=>t.attributes.hvac_modes.includes(e.value)):i})})(t,a);default:return null}}catch(t){return console.error(`Scheduler-card failed to load states for '${e}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`),null}var i}function ca(e,t,i){let s=i.standard_configuration?ra(e,t):null;const a=Object.entries(i.customize).filter(([t])=>Ss(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.states).filter(lt);return a.length&&a.forEach(e=>{s=Array.isArray(e)?ys({options:e.map(e=>Object({value:e}))}):ws(e)}),s}function la(e,t,i={filterActions:!0,filterStates:!1}){let s=Object.keys(e.states).filter(e=>ea(e,t));return"notify"in e.services&&(s=[...s,...Object.keys(e.services.notify).map(e=>"notify."+e).filter(e=>ea(e,t))]),i.filterActions&&i.filterStates?s=s.filter(i=>Gs(i,e,t).length||ca(i,e,t)):i.filterActions?s=s.filter(i=>Gs(i,e,t).length):i.filterStates&&(s=s.filter(i=>ca(i,e,t))),s}function da(e,t){return e.id||e.value||t}let ua=class extends ae{constructor(){super(...arguments),this.items=[],this.value=null}render(){return this.items.length?this.items.map((e,t)=>this.renderButton(e,t)):P`
        <div class="text-field">
          <slot></slot>
        </div>
      `}renderButton(e,t){const i=Array.isArray(this.value)?this.value:[this.value],s=da(e,t);return P`
      <mwc-button
        class="${i.includes(s)?"active":""}"
        ?disabled=${e.disabled}
        @click=${()=>this.selectItem(s)}
      >
        ${e.icon?P`
              <ha-icon icon="${mt(e.icon)}" class="padded-right"></ha-icon>
            `:""}
        ${pt(function(e){var t;return(null===(t=e.name)||void 0===t?void 0:t.trim())||e.value||e.id||""}(e))}
      </mwc-button>
    `}selectItem(e){if(Array.isArray(this.value))if(this.multiple){let t=Array.isArray(this.value)?[...this.value]:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else this.value=this.value.includes(e)?[]:Array(e);else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;const t=Array.isArray(this.value)?this.value.map(e=>this.items.find((t,i)=>da(t,i)==e)):null!==this.value?this.items.find((e,t)=>da(e,t)==this.value):null,i=new CustomEvent("change",{detail:t});this.dispatchEvent(i)}};ua.styles=ns,t([re({type:Array})],ua.prototype,"items",void 0),t([re()],ua.prototype,"value",void 0),t([re({type:Number})],ua.prototype,"min",void 0),t([re({type:Boolean})],ua.prototype,"optional",void 0),t([re({type:Boolean})],ua.prototype,"multiple",void 0),ua=t([ne("button-group")],ua);let ha=class extends ae{constructor(){super(...arguments),this.selectedEntities=[],this.multipleEntity=!1,this.scheduleEntities=[],this.timeSchemeSelected=!1}async firstUpdated(){if(this.scheduleEntities=(await Js(this.hass)).map(e=>e.entity_id),this.entities&&this.entities.length){const e=this.getGroups().find(e=>e.entities.find(e=>e==this.entities[0].id));if(!e)return;this.selectedGroup=e,this.selectedEntities=[...this.entities.map(e=>e.id)],this.multipleEntity=this.selectedEntities.length>1}if(this.schedule)if(this.schedule.timeslots.every(e=>e.stop))this.timeSchemeSelected=!0;else{const e=ct(rt(this.schedule.timeslots.map(e=>e.actions))),t=this.getActionsForEntity().filter(t=>e.some(e=>Hs(e,t,!0)));1==t.length&&(this.selectedAction=t[0])}}getGroups(){if(!this.hass||!this.config)return[];const e=oa(la(this.hass,this.config).filter(e=>"switch"!==Ne(e)||!this.scheduleEntities.includes(e)),this.config,this.hass);return e.sort(ut),e}getEntitiesForGroup(){if(!this.selectedGroup||!this.hass||!this.config)return[];const e=this.selectedGroup.entities.map(e=>Es(e,this.hass,this.config));return e.sort(ut),e}getActionsForEntity(){if(!this.hass||!this.config||!this.selectedEntities.length)return[];const e=Gs(this.selectedEntities,this.hass,this.config).map(e=>Object.assign(e,{name:Ms(e)}));return e.sort(ut),e}render(){if(!this.hass||!this.config)return P``;const e=this.getGroups();1!=e.length||dt(this.selectedGroup,e[0])||this.selectGroup(e[0]);const t=this.getEntitiesForGroup();1==t.length&&this.selectedEntities[0]!==t[0].id&&this.selectEntity(t[0].id);const i=this.getActionsForEntity();return P`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title?"string"==typeof this.config.title?this.config.title:as("ui.panel.common.title",vt(this.hass)):""}
          </div>
          <ha-icon-button .path=${aa} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
          <button-group
            .items=${e}
            .value=${e.findIndex(e=>dt(e,this.selectedGroup))}
            @change=${e=>this.selectGroup(e.detail)}
          >
            ${as("ui.panel.entity_picker.no_groups_defined",vt(this.hass))}
          </button-group>

          <div class="header">
            ${this.hass.localize("ui.components.entity.entity-picker.entity")}
            ${t.length>1?P`
                  <div class="switch">
                    <ha-switch
                      ?checked=${this.multipleEntity}
                      @change=${e=>{this.multipleEntity=e.target.checked}}
                    >
                    </ha-switch>
                    ${as("ui.panel.entity_picker.multiple",vt(this.hass))}
                  </div>
                `:""}
          </div>
          <button-group
            .items=${t}
            .value=${this.selectedEntities}
            @change=${e=>this.selectEntity(e.target.value)}
            ?multiple=${this.multipleEntity}
            ?optional=${!0}
          >
            ${this.selectedGroup?as("ui.panel.entity_picker.no_entities_for_group",vt(this.hass)):as("ui.panel.entity_picker.no_group_selected",vt(this.hass))}
          </button-group>

          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
          <button-group
            .items=${i}
            .value=${i.findIndex(e=>dt(e,this.selectedAction))}
            @change=${e=>this.selectAction(e.detail)}
          >
            ${this.selectedEntities.length?as("ui.panel.entity_picker.no_actions_for_entity",vt(this.hass)):as("ui.panel.entity_picker.no_entity_selected",vt(this.hass))}
          </button-group>
          ${this.makeSchemeButton(i)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction&&!this.timeSchemeSelected}
            >${this.hass.localize("ui.common.next")}</mwc-button
          >
        </div>
      </ha-card>
    `}makeSchemeButton(e){return e.length&&this.hass?P`
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.or.label")}</div>
      <div class="option-list">
        <mwc-button
          class="${this.timeSchemeSelected?" active":""}"
          @click=${()=>this.selectTimeScheme()}>
          <ha-icon icon="${mt("chart-timeline")}" class="padded-right"></ha-icon>
          ${as("ui.panel.entity_picker.make_scheme",vt(this.hass))}
        </mwc-button>
      </div>
    </div>
    `:P``}selectGroup(e){this.selectedGroup=e,this.selectedEntities=[],this.selectedAction=void 0}selectEntity(e){if(this.selectedEntities=Array.isArray(e)?e:[e],this.selectedAction){const e=this.getActionsForEntity();this.selectedAction=e.find(e=>Hs(e,this.selectedAction))}else this.selectedAction=void 0}selectAction(e){this.selectedAction=e,this.timeSchemeSelected=!1}selectTimeScheme(){this.selectedAction=null,this.timeSchemeSelected=!0}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}nextClick(){const e=new CustomEvent("nextClick",{detail:{entities:this.selectedEntities,action:this.selectedAction,timeSchemeSelected:this.timeSchemeSelected}});this.dispatchEvent(e)}};ha.styles=ns,t([re()],ha.prototype,"hass",void 0),t([re()],ha.prototype,"config",void 0),t([re()],ha.prototype,"selectedGroup",void 0),t([re()],ha.prototype,"selectedEntities",void 0),t([re()],ha.prototype,"selectedAction",void 0),t([re()],ha.prototype,"entities",void 0),t([re()],ha.prototype,"schedule",void 0),t([re()],ha.prototype,"multipleEntity",void 0),t([re()],ha.prototype,"scheduleEntities",void 0),t([re()],ha.prototype,"timeSchemeSelected",void 0),ha=t([ne("scheduler-editor-card")],ha);let pa=class extends ae{constructor(){super(...arguments),this.stepSize=10,this.relativeMode=!1,this.event=We.Sunrise,this._time=0,this.maxOffset=2}get time(){return this._time>=0?this._time:Math.abs(this._time)}set time(e){this._time=st(e,this.stepSize,{wrapAround:!this.relativeMode,maxHours:this.relativeMode?this.maxOffset:void 0})}firstUpdated(){const e=at(this.value);e?(this.relativeMode=!0,this.event=e.event==We.Sunrise?We.Sunrise:We.Sunset,this.time="+"==e.sign?tt(e.offset,this.hass):-tt(e.offset,this.hass)):this.time=tt(this.value,this.hass)}updated(){if(this.relativeMode){const e=this._time>=0?"+":"-",t=it(this.time);this.value=`${this.event}${e}${t}`}else this.value=it(this.time);const e=new CustomEvent("change");this.dispatchEvent(e)}render(){const e=(this.relativeMode?it(this.time):ms(As(it(this.time)),vt(this.hass))).split(/:|\ /);return P`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${()=>this.time=this._time+3600}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${e[0].padStart(2,"0")}</div>
        <div class="hours-down">
          <mwc-button @click=${()=>this.time=this._time-3600}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${()=>this.time=this._time+60*this.stepSize}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${e[1]}</div>
        <div class="minutes-down">
          <mwc-button @click=${()=>this.time=this._time-60*this.stepSize}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode?P`
              <div class="suffix">
                <mwc-button @click=${this.toggleBeforeAfter}>
                  ${this.getBeforeAfter()}
                </mwc-button>
                <mwc-button @click=${this.toggleSunriseSunset}>
                  <ha-icon
                    icon="hass:${this.event==We.Sunrise?"weather-sunny":"weather-night"}"
                  ></ha-icon>
                </mwc-button>
              </div>
            `:e.length>2?P`
              <div class="suffix">
                <mwc-button @click=${this.toggleAmPm}>
                  ${e[2]}
                </mwc-button>
              </div>
            `:""}
        <div class="options">
          ${this.getSunModeToggle()}
        </div>
      </div>
    `}getSunModeToggle(){return this.hass&&this.hass.states["sun.sun"]?P`
      <mwc-button @click="${this.toggleMode}" class="${this.relativeMode?"active":""}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `:P``}getBeforeAfter(){return this.hass?this._time<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1):this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1):""}toggleAmPm(){this.time=this._time+43200}toggleBeforeAfter(){this.time=-this._time}toggleSunriseSunset(){this.event=this.event==We.Sunrise?We.Sunset:We.Sunrise}toggleMode(){if(!this.hass)return;this.relativeMode=!this.relativeMode;const e=this.hass.states["sun.sun"],t=tt(e.attributes.next_rising,this.hass),i=tt(e.attributes.next_setting,this.hass);if(this.relativeMode){this.event=Math.abs(this._time-t)<Math.abs(this._time-i)?We.Sunrise:We.Sunset;let e=this.event==We.Sunrise?this._time-t:this._time-i;e>7200?e=7200:e<-7200&&(e=-7200),this.time=e}else this.time=this.event==We.Sunrise?this._time+t:this._time+i}};pa.styles=r`
    div.time-picker {
      display: grid;
      grid-template-columns: min-content min-content min-content 1fr min-content;
      grid-template-rows: min-content min-content min-content;
      grid-template-areas:
        'hours-up   .         minutes-up   suffix options'
        'hours      separator minutes      suffix options'
        'hours-down .         minutes-down suffix options';
      grid-gap: 10px 0px;
      align-items: center;
    }

    div.hours-up {
      grid-area: hours-up;
    }
    div.hours {
      grid-area: hours;
    }
    div.hours-down {
      grid-area: hours-down;
    }
    div.separator {
      grid-area: separator;
    }
    div.minutes-up {
      grid-area: minutes-up;
    }
    div.minutes {
      grid-area: minutes;
    }
    div.minutes-down {
      grid-area: minutes-down;
    }
    div.suffix {
      grid-area: suffix;
      flex-grow: 1;
    }
    div.options {
      grid-area: options;
    }

    div.hours-up,
    div.hours-down,
    div.minutes-up,
    div.minutes-down {
      --mdc-icon-size: 42px;
    }

    div.hours,
    div.minutes {
      font-size: 42px;
      text-align: center;
    }

    div.separator {
      font-size: 36px;
    }

    div.suffix mwc-button {
      --mdc-typography-button-font-size: 16px;
      --mdc-icon-size: 32px;
    }

    mwc-button.active {
      background: var(--primary-color);
      --mdc-theme-primary: var(--text-primary-color);
      border-radius: 4px;
    }
  `,t([re()],pa.prototype,"hass",void 0),t([re({type:Number})],pa.prototype,"stepSize",void 0),t([re()],pa.prototype,"relativeMode",void 0),t([re()],pa.prototype,"event",void 0),t([re()],pa.prototype,"_time",void 0),pa=t([ne("time-picker")],pa);const ma=(e,t,i,s={})=>{if(at(e))return e;const a=tt(e,i),n=i.states["sun.sun"],o=tt(n.attributes.next_rising,i),r=tt(n.attributes.next_setting,i);t||(t=Math.abs(a-o)<Math.abs(a-r)?We.Sunrise:We.Sunset);let c=a-(t==We.Sunrise?tt(n.attributes.next_rising,i):tt(n.attributes.next_setting,i));return s.stepSize&&(c=st(c,s.stepSize,{maxHours:2})),`${t}${c>0?"+":"-"}${it(Math.abs(c))}`};let _a=class extends ae{constructor(){super(...arguments),this.slots=[],this.actions=[],this.stepSize=10,this.isDragging=!1,this.currentTime=0,this.rangeMin=0,this.rangeMax=86400,this.activeSlot=null,this.activeMarker=null,this.previousSlot=null,this.timer=0,this.timeout=0,this.zoomFactor=1}firstUpdated(){window.addEventListener("resize",()=>{clearTimeout(this.timeout),this.timeout=window.setTimeout(()=>{this.requestUpdate()},50)})}render(){if(!this.hass)return P``;const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=86400/(this.rangeMax-this.rangeMin)*e,i=-this.rangeMin/(this.rangeMax-this.rangeMin)*e;return P`
      <div class="outer">
        <div
          class="wrapper ${this.isDragging?"":"selectable"}"
          style="width: ${t.toFixed(2)}px; margin-left: ${i.toFixed(2)}px"
        >
          ${this.renderSlots()}
        </div>
      </div>
      <div class="outer">
        <div class="time-wrapper" style="width: ${t.toFixed(2)}px; margin-left: ${i.toFixed(2)}px">
          ${this.renderTimes()}
        </div>
      </div>
      <mwc-button @click=${this._addSlot} ?disabled=${null===this.activeSlot||this.slots.length>=24}>
        <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
      </mwc-button>
      <mwc-button @click=${this._removeSlot} ?disabled=${null===this.activeSlot||this.slots.length<=2}>
        <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize("ui.common.delete")}
      </mwc-button>
    `}renderSlots(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=86400/(this.rangeMax-this.rangeMin)*e;let i=-this.rangeMin/(this.rangeMax-this.rangeMin)*e;return this.slots.map((s,a)=>{const n=((tt(s.stop,this.hass)||86400)-tt(s.start,this.hass))/86400,o=this.computeActionDisplay(s)||"",r=5*(o||"").length+10,c=i<0&&i+n*t>0?5-i:15,l=i+n*t>e&&i<e?n*t-(e-i)+5:15,d=n*t-c-l;return i+=n*t,P`
        <div
          class="slot${this.activeSlot==a&&null===this.activeMarker?" active":""} ${n*t<2?"noborder":""}"
          style="width: ${Math.floor(1e4*n)/100}%"
          @click=${this._selectSlot}
          slot="${a}"
        >
          ${a>0&&(this.activeSlot===a||this.activeSlot===a-1)?P`
                <div class="handle">
                  <div class="button-holder">
                    <ha-icon-button
                      .path=${"M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z"}
                      @mousedown=${this._handleTouchStart}
                      @touchstart=${this._handleTouchStart}
                    >
                    </ha-icon-button>
                  </div>
                </div>
              `:""}
          ${a>0?this.renderTooltip(a):""}

          <span style="margin-left: ${c.toFixed(2)}px; margin-right: ${l.toFixed(2)}px">
            ${o&&(d>r/3||d>50)&&d>30?o:""}
          </span>
        </div>
      `})}renderTooltip(e){const t=at(this.slots[e].start);return P`
      <div class="tooltip-container center">
        <div class="tooltip ${this.activeMarker==e?"active":""}" @click=${this._selectMarker}>
          ${t?P`
                <ha-icon icon="hass:${"sunrise"==t.event?"weather-sunny":"weather-night"}"></ha-icon>
                ${t.sign} ${ms(As(t.offset),vt(this.hass),hs.twenty_four)}
              `:ms(As(this.slots[e].start),vt(this.hass))}
        </div>
      </div>
    `}renderTimes(){this._updateTooltips();const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=[1,2,3,4,6,8,12],i=ps(vt(this.hass))?55:40;let s=Math.ceil(24/(e/i));for(;!t.includes(s);)s++;return[0,...Array.from(Array(24/s-1).keys()).map(e=>(e+1)*s),24].map(e=>{const t=0==e||24==e;let i=t?s/48*100:s/24*100;return P`
        <div style="width: ${Math.floor(100*i)/100}%" class="${t?"":"time"}">
          ${t?"":ms(As(it(3600*e)),vt(this.hass))}
        </div>
      `})}computeActionDisplay(e){if(this.hass)return e.actions?ct(e.actions.map(e=>{const t=this.actions.find(t=>Hs(t,e,!0));return t?t.variables&&Object.keys(t.variables).some(t=>e.service_data&&t in e.service_data)?Object.entries(t.variables).filter(([t])=>e.service_data&&t in e.service_data).map(([t,i])=>{const s=e.service_data[t];if(i.type==Fe.Level)return i=i,ks(Number(s),i);if(i.type==Fe.List){const e=(i=i).options.find(e=>e.value==s);return pt(e&&e.name?e.name:String(s))}return""}).join(", "):pt(t.name||as("services."+e.service,vt(this.hass))||e.service):"???"})).join(", "):""}_handleTouchStart(e){const t=parseFloat(getComputedStyle(this).getPropertyValue("width")),i=86400/(this.rangeMax-this.rangeMin)*t,s=-(-this.rangeMin/(this.rangeMax-this.rangeMin)*t)/i*86400,a=e.target;let n=a;for(;!n.classList.contains("slot");)n=n.parentElement;const o=n,r=o.previousElementSibling,c=Number(r.getAttribute("slot")),l=c>0?tt(this.slots[c].start,this.hass)+60*this.stepSize:0,d=c<this.slots.length-2?(tt(this.slots[c+1].stop,this.hass)||86400)-60*this.stepSize:86400;this.isDragging=!0;const u=o.parentElement.parentElement.getBoundingClientRect();let h=e=>{let a;a="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let n=a-u.left;n>t-10&&(n=t-10),n<10&&(n=10);let o=Math.round(n/i*86400+s);o<l&&(o=l),o>d&&(o=d),this.currentTime=o;const r=at(this.slots[c].stop);let h;r?h=ma(it(o),r.event,this.hass,{stepSize:this.stepSize}):(o=Math.round(o)>=86400?86400:st(o,this.stepSize),h=it(o)),h!=this.slots[c].stop&&(this.slots=Object.assign(this.slots,{[c]:Object.assign(Object.assign({},this.slots[c]),{stop:h}),[c+1]:Object.assign(Object.assign({},this.slots[c+1]),{start:h})}),this.requestUpdate())};const p=()=>{window.removeEventListener("mousemove",h),window.removeEventListener("touchmove",h),window.removeEventListener("mouseup",p),window.removeEventListener("touchend",p),h=()=>{},setTimeout(()=>{this.isDragging=!1},100),a.blur();const e=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(e)};window.addEventListener("mouseup",p),window.addEventListener("touchend",p),window.addEventListener("blur",p),window.addEventListener("mousemove",h),window.addEventListener("touchmove",h)}_selectSlot(e){if(this.isDragging)return;let t=e.target;"span"==t.tagName.toLowerCase()&&(t=t.parentElement),t.classList.contains("handle")&&(t=t.parentElement);const i=Number(t.getAttribute("slot"));this.activeSlot==i&&null===this.activeMarker?(this.activeSlot=null,this.previousSlot=null):(this.previousSlot=this.activeSlot,this.activeSlot=i),this.activeMarker=null,this._updateZoom();const s=new CustomEvent("update",{detail:{entry:this.activeSlot}});this.dispatchEvent(s)}_calculateZoom(){const e=Number(this.activeSlot);let t=tt(this.slots[e].start,this.hass),i=tt(this.slots[e].stop,this.hass)||86400;t-=(i-t)/3,i+=(i-t)/3,(i-t)/86400*parseFloat(getComputedStyle(this).getPropertyValue("width"))>=100?(t=0,i=86400):(t<0&&(i-=t),i>86400&&(t-=i-86400)),this.rangeMin=t>0?t:0,this.rangeMax=i<86400?i:86400,clearInterval(this.timer),clearTimeout(this.timeout),this.timer=window.setInterval(()=>{this._updateTooltips()},50),this.timeout=window.setTimeout(()=>{clearInterval(this.timer),this._updateTooltips()},230)}_addSlot(){if(null===this.activeSlot)return;const e=this.slots[this.activeSlot],t=tt(e.start,this.hass);let i=tt(e.stop,this.hass);i<t&&(i+=86400);const s=st(t+(i-t)/2,this.stepSize);this.slots=[...this.slots.slice(0,this.activeSlot),Object.assign(Object.assign({},this.slots[this.activeSlot]),{stop:it(s)}),{start:it(s),stop:it(i),actions:[]},...this.slots.slice(this.activeSlot+1)],this._updateZoom();const a=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(a)}_removeSlot(){if(null===this.activeSlot)return;const e=this.activeSlot==this.slots.length-1?this.activeSlot-1:this.activeSlot;this.slots=[...this.slots.slice(0,e),Object.assign(Object.assign({},this.slots[e+1]),{start:this.slots[e].start,stop:this.slots[e+1].stop}),...this.slots.slice(e+2)],this.activeSlot==this.slots.length&&this.activeSlot--,this._updateZoom();const t=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(t)}_updateTooltips(){var e;const t=parseFloat(getComputedStyle(this).getPropertyValue("width"));let i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".tooltip");const s=e=>{const t=e.offsetWidth,i=e.parentElement.offsetLeft+e.offsetLeft-15;return e.parentElement.classList.contains("left")?[i+t/2,i+3*t/2]:e.parentElement.classList.contains("right")?[i-t/2,i+t/2]:[i,i+t]};null==i||i.forEach((e,a)=>{const n=e.parentElement,o=n.classList.contains("visible"),r=Number(n.parentElement.getAttribute("slot"));if(r!=this.activeSlot&&r-1!=this.activeSlot)o&&n.classList.remove("visible");else{const c=e.parentElement.offsetLeft;if(c<0||c>t+15)o&&n.classList.remove("visible");else{o||n.classList.add("visible");const c=n.offsetWidth,l=n.classList.contains("center");let d=s(e)[0],u=t-s(e)[1];if(a>0&&r-1==this.activeSlot)d-=s(i[a-1])[1];else if(a+1<i.length&&r==this.activeSlot){let e=s(i[a+1])[0];u-=e<0?0:t-e}d<u?d<0?l&&u>c/2&&(n.classList.add("right"),n.classList.remove("center"),n.classList.remove("left")):(n.classList.add("center"),n.classList.remove("right"),n.classList.remove("left")):u<0?l&&d>c/2&&(n.classList.add("left"),n.classList.remove("center"),n.classList.remove("right")):(n.classList.add("center"),n.classList.remove("left"),n.classList.remove("right"))}}})}_updateZoom(){clearInterval(this.timer),clearTimeout(this.timeout),this.timer=window.setInterval(()=>{this._updateTooltips()},50),this.timeout=window.setTimeout(()=>{clearInterval(this.timer),this._updateTooltips()},230)}_selectMarker(e,t=!0){e.stopImmediatePropagation();let i=e.target;for(;!i.classList.contains("slot");)i=i.parentElement;const s=Number(i.getAttribute("slot"));t&&this.activeMarker===s?this.activeMarker=null:this.activeMarker=t?s:null;const a=new CustomEvent("update",{detail:{entry:this.activeSlot,marker:this.activeMarker}});this.dispatchEvent(a),this._updateTooltips()}static get styles(){return r`
      :host {
        display: block;
        max-width: 100%;
        overflow: hidden;
      }
      div.outer {
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        border-radius: 5px;
      }
      div.wrapper,
      div.time-wrapper {
        white-space: nowrap;
        transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67), margin 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
      .slot {
        float: left;
        background: rgba(var(--rgb-primary-color), 0.7);
        height: 60px;
        cursor: pointer;
        box-sizing: border-box;
        transition: background 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
      .wrapper.selectable .slot:hover {
        background: rgba(var(--rgb-primary-color), 0.85);
      }
      .slot:not(:first-child) {
        border-left: 1px solid var(--card-background-color);
      }
      .slot:not(:last-child) {
        border-right: 1px solid var(--card-background-color);
      }
      .slot.active {
        background: rgba(var(--rgb-accent-color), 0.7);
      }
      .slot.noborder {
        border: none;
      }
      .wrapper.selectable .slot.active:hover {
        background: rgba(var(--rgb-accent-color), 0.85);
      }
      div.time-wrapper div {
        float: left;
        display: flex;
        position: relative;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        align-content: center;
        align-items: center;
        justify-content: center;
      }
      div.time-wrapper div.time:before {
        content: ' ';
        background: var(--disabled-text-color);
        position: absolute;
        left: 0px;
        top: 0px;
        width: 1px;
        height: 5px;
        margin-left: 50%;
        margin-top: 0px;
      }
      .slot span {
        font-size: 14px;
        color: var(--text-primary-color);
        height: 100%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        transition: margin 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
        line-height: 1em;
      }
      div.handle {
        display: flex;
        height: 100%;
        width: 36px;
        margin-left: -19px;
        margin-bottom: -60px;
        align-content: center;
        align-items: center;
        justify-content: center;
      }
      div.button-holder {
        background: var(--card-background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        visibility: hidden;
        animation: 0.2s fadeIn;
        animation-fill-mode: forwards;
      }
      ha-icon-button {
        --mdc-icon-button-size: 36px;
        margin-top: -6px;
        margin-left: -6px;
      }
      @keyframes fadeIn {
        99% {
          visibility: hidden;
        }
        100% {
          visibility: visible;
        }
      }
      div.tooltip-container {
        position: absolute;
        margin-top: -28px;
        margin-left: -40px;
        width: 80px;
        height: 26px;
        display: flex;
        text-align: center;
        display: none;
      }
      div.tooltip-container.visible {
        display: block;
      }
      div.tooltip-container.left {
        margin-left: -80px;
        text-align: right;
      }
      div.tooltip-container.right {
        margin-left: 0px;
        text-align: left;
      }
      div.tooltip {
        display: inline-flex;
        margin: 0px auto;
        border-radius: 5px;
        color: var(--text-primary-color);
        font-size: 1em;
        padding: 0px 5px;
        text-align: center;
        line-height: 26px;
        z-index: 1;
        transition: all 0.1s ease-in;
        transform-origin: center bottom;
        --tooltip-color: var(--primary-color);
        background: var(--tooltip-color);
      }
      div.tooltip.active {
        --tooltip-color: rgba(var(--rgb-accent-color), 0.7);
      }
      div.tooltip-container.left div.tooltip {
        transform-origin: right bottom;
      }
      div.tooltip-container.right div.tooltip {
        transform-origin: left bottom;
      }
      div.tooltip-container.center div.tooltip:before {
        content: ' ';
        width: 0px;
        height: 0px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid var(--tooltip-color);
        position: absolute;
        margin-top: 25px;
        margin-left: calc(50% - 6px);
        top: 0px;
        left: 0px;
      }
      div.tooltip-container.left div.tooltip:before {
        content: ' ';
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 8px solid var(--tooltip-color);
        opacity: 1;
        position: absolute;
        margin-top: 15px;
        margin-left: calc(100% - 8px);
        left: 0px;
        top: 0px;
        width: 0px;
        height: 0px;
      }
      div.tooltip-container.right div.tooltip:before {
        content: ' ';
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 8px solid var(--tooltip-color);
        opacity: 1;
        position: absolute;
        margin-top: 15px;
        margin-left: 0px;
        left: 0px;
        top: 0px;
        width: 0px;
        height: 0px;
      }
      div.tooltip ha-icon {
        --mdc-icon-size: 20px;
      }
      mwc-button ha-icon {
        margin-right: 11px;
      }
    `}};t([re()],_a.prototype,"hass",void 0),t([re({type:Array})],_a.prototype,"slots",void 0),t([re({type:Array})],_a.prototype,"actions",void 0),t([re({type:Number})],_a.prototype,"stepSize",void 0),t([re()],_a.prototype,"rangeMin",void 0),t([re()],_a.prototype,"rangeMax",void 0),t([re()],_a.prototype,"activeSlot",void 0),t([re()],_a.prototype,"activeMarker",void 0),t([function(e){return le({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */({passive:!0})],_a.prototype,"_handleTouchStart",null),_a=t([ne("timeslot-editor")],_a);const va=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()};let ga=class extends ae{constructor(){super(...arguments),this.min=0,this.max=255,this.step=1,this.scaleFactor=1,this.unit="",this.optional=!1,this.disabled=!1,this._displayedValue=0}set value(e){e=isNaN(e)?this.min:this._roundedValue(e/this.scaleFactor),this._displayedValue=e}firstUpdated(){(async()=>{await va()})(),this.disabled&&!this.optional&&(this.disabled=!1,this.requestUpdate())}render(){return P`
      <div class="checkbox-container">
        <div class="checkbox">
          ${this.getCheckbox()}
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled?" disabled":""}">
          ${this._displayedValue}${this.unit}
        </div>
      </div>
    `}getSlider(){return this.disabled?P`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          disabled
        ></ha-slider>
      `:P`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          @change=${this._updateValue}
        ></ha-slider>
      `}getCheckbox(){return this.optional?P`
      <ha-checkbox @change=${this.toggleChecked} ?checked=${!this.disabled}></ha-checkbox>
    `:P``}toggleChecked(e){const t=e.target.checked;this.disabled=!t;const i=this.disabled?null:this._scaledValue(this._displayedValue);Re(this,"value-changed",{value:i})}_updateValue(e){let t=Number(e.target.value);this._displayedValue=t,t=this._scaledValue(this._displayedValue),Re(this,"value-changed",{value:t})}_roundedValue(e){return e=Math.round(e/this.step)*this.step,(e=parseFloat(e.toPrecision(12)))>this.max?e=this.max:e<this.min&&(e=this.min),e}_scaledValue(e){return e=this._roundedValue(e),e*=this.scaleFactor,e=parseFloat(e.toFixed(2))}};ga.styles=r`
    ${ns} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `,t([re({type:Number})],ga.prototype,"min",void 0),t([re({type:Number})],ga.prototype,"max",void 0),t([re({type:Number})],ga.prototype,"step",void 0),t([re({type:Number})],ga.prototype,"value",null),t([re({type:Number})],ga.prototype,"scaleFactor",void 0),t([re({type:String})],ga.prototype,"unit",void 0),t([re({type:Boolean})],ga.prototype,"optional",void 0),t([re({type:Boolean})],ga.prototype,"disabled",void 0),t([re({type:Number})],ga.prototype,"_displayedValue",void 0),ga=t([ne("variable-slider")],ga);let fa=class extends ae{render(){return this.variable?this.variable.type==Fe.Level?this.renderLevelVariable():this.variable.type==Fe.List?this.renderListVariable():this.variable.type==Fe.Text?this.renderTextVariable():P``:P``}levelVariableUpdated(e){this.value=e.detail.value,Re(this,"value-changed",{value:e.detail.value})}renderLevelVariable(){const e=this.variable,t=Number(this.value);return P`
      <variable-slider
        min=${e.min}
        max=${e.max}
        step=${e.step}
        scaleFactor=${e.scale_factor}
        value=${t}
        .unit=${e.unit}
        ?optional=${e.optional}
        ?disabled=${isNaN(t)}
        @value-changed=${this.levelVariableUpdated}
      >
      </variable-slider>
    `}listVariableUpdated(e){const t="string"==typeof e?e:String(e.target.value);this.value=t,Re(this,"value-changed",{value:t})}renderListVariable(){const e=this.variable.options,t=String(this.value)||null;return 1==e.length&&t!=e[0].value&&this.listVariableUpdated(e[0].value),P`
      <button-group .items=${e} value=${t} @change=${this.listVariableUpdated}> </button-group>
    `}renderTextVariable(){const e=this.variable,t=this.value;return P`
      <paper-input
        no-label-float
        .value=${t||""}
        @value-changed=${this.listVariableUpdated}
        .label=${e.name}
      >
      </paper-input>
    `}};t([re()],fa.prototype,"variable",void 0),t([re()],fa.prototype,"value",void 0),fa=t([ne("scheduler-variable-picker")],fa);let ya=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?P`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${aa}> </ha-icon-button>
            <span slot="title">
              ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_title")}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_text")}
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:P``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([re({attribute:!1})],ya.prototype,"hass",void 0),t([ce()],ya.prototype,"_params",void 0),ya=t([ne("dialog-delete-confirm")],ya);var ba=Object.freeze({__proto__:null,get DialogDeleteConfirm(){return ya}});const wa=(e,t)=>{let i={entity_id:e,service:t.service,service_data:Object.assign({},t.service_data)};return Object.entries(t.variables||{}).forEach(([e,t])=>{Object.keys(i.service_data||{}).includes(e)||(t.type==Fe.Level?(t=t,i=Object.assign(Object.assign({},i),{service_data:t.optional?ot(i.service_data||{},e):Object.assign(Object.assign({},i.service_data),{[e]:parseFloat((t.min*t.scale_factor).toPrecision(12))||0})})):t.type==Fe.List?(t=t,i=Object.assign(Object.assign({},i),{service_data:Object.assign(Object.assign({},i.service_data),{[e]:t.options.length?t.options[0].value:void 0})})):t.type==Fe.Text&&(t=t,i=Object.assign(Object.assign({},i),{service_data:Object.assign(Object.assign({},i.service_data),{[e]:""})})))}),i};let ka=class extends ae{constructor(){super(...arguments),this.activeEntry=null,this.activeMarker=null,this.timeslots=!1,this.editItem=!1}firstUpdated(){if(!this.actions||!this.hass)return;this.timeslots||(this.activeEntry=0);const e=this.actions.map(e=>{const t=Object.assign(Object.assign({},e),{service_data:ot(e.service_data||{},...Object.keys(e.variables||{}))});return Object.assign(e,{name:Ms(t)})});e.sort(ut),this.actions=e}render(){return this.hass&&this.config&&this.entities&&this.actions?P`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title?"string"==typeof this.config.title?this.config.title:as("ui.panel.common.title",vt(this.hass)):""}
          </div>
          <ha-icon-button .path=${aa} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
          ${this.renderSummary()}
          ${this.timeslots?P`
                ${this.renderDays()}
                <div class="header">${as("ui.panel.time_picker.time_scheme",vt(this.hass))}</div>

                <timeslot-editor
                  .hass=${this.hass}
                  .actions=${this.actions}
                  .slots=${this.schedule.timeslots}
                  stepSize=${this.config.time_step||10}
                  @update=${this.handlePlannerUpdate}
                >
                </timeslot-editor>

                ${this.renderMarkerOptions()} ${this.renderActions()} ${this.getVariableEditor()}
              `:P`
                ${this.getVariableEditor()} ${this.renderDays()}
                <div class="header">${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}</div>
                <time-picker
                  .hass=${this.hass}
                  .value=${this.schedule.timeslots[0].start}
                  stepSize=${this.config.time_step||10}
                  @change=${e=>this.updateActiveEntry({start:e.target.value})}
                >
                </time-picker>
              `}
        </div>
        <div class="card-actions">
          <mwc-button
            @click=${this.saveClick}
            ?disabled=${!this.schedule.timeslots.filter(e=>e.actions.length).length}
          >
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
          ${this.editItem?P`
                <mwc-button class="warning" @click=${this.deleteClick}
                  >${this.hass.localize("ui.common.delete")}</mwc-button
                >
              `:""}
          <mwc-button @click="${this.optionsClick}" style="float: right"
            >${this.hass.localize("ui.dialogs.helper_settings.input_select.options")}</mwc-button
          >
        </div>
      </ha-card>
    `:P``}renderSummary(){return this.entities&&this.actions?P`
      <div class="summary">
        <div class="summary-entity" @click=${this.editActionClick}>
          ${this.entities.map(e=>P`
              <div>
                <ha-icon icon="${mt(e.icon)}"> </ha-icon>
                ${ht(pt(e.name||this.hass.states[e.id].attributes.friendly_name||Le(e.id)))}
              </div>
            `)}
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"> </ha-icon>
        </div>
        <div class="summary-action" @click=${this.editActionClick}>
          ${this.timeslots?P`
                <div>
                  <ha-icon icon="${mt("chart-timeline")}"> </ha-icon>
                  ${ht(as("ui.panel.entity_picker.make_scheme",vt(this.hass)))}
                </div>
              `:P`
                <div>
                  <ha-icon icon="${mt(this.actions[0].icon||"flash")}"> </ha-icon>
                  ${ht(this.actions[0].name||Le(this.actions[0].service))}
                </div>
              `}
        </div>
      </div>
    `:P``}renderDays(){if(!this.hass)return P``;let e=Array.from(Array(7).keys());const t=function(e){const t=e.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i),i=t[1],s=t[4],a="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),n="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),o="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);return s?n.includes(s)?"sun":a.includes(s)?"sat":"mon":o.includes(i)?"sun":["ar","arq","arz","fa"].includes(i)?"sat":"mon"}(this.hass.language),i=e.length-ds.findIndex(e=>e.substr(0,3)==t);e=[...e.slice(-i),...e.slice(0,-i)];const s=e.map(e=>Object({value:ds[e].substr(0,3),name:us(e,vt(this.hass),!0)})),a=[{value:Ge.Daily,name:as("ui.components.date.day_types_short.daily",vt(this.hass))},{value:Ge.Workday,name:as("ui.components.date.day_types_short.workdays",vt(this.hass))},{value:Ge.Weekend,name:as("ui.components.date.day_types_short.weekend",vt(this.hass))},{value:Ge.Custom,name:this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.label")}];return P`
      <div class="header">${as("ui.components.date.days",vt(this.hass))}</div>
      <button-group .items=${a} value=${Ts(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${Ts(this.schedule.weekdays)==Ge.Custom?P`
            <div>
              <button-group
                .items=${s}
                .value=${this.schedule.weekdays}
                min="1"
                multiple
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `:""}
    `}renderActions(){var e;if(!this.hass||null!==this.activeMarker)return;const t=null!==this.activeEntry&&this.schedule.timeslots[this.activeEntry].actions.length?this.schedule.timeslots[this.activeEntry].actions[0]:null;return P`
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
      <button-group
        .items=${null!==this.activeEntry?this.actions:[]}
        .value=${null!==t?null===(e=this.actions)||void 0===e?void 0:e.findIndex(e=>Hs(e,t,!0)):null}
        optional="true"
        @change=${this.selectAction}
      >
        ${as("ui.panel.time_picker.no_timeslot_selected",vt(this.hass))}
      </button-group>
    `}renderMarkerOptions(){if(!this.hass||!this.config||null===this.activeMarker)return;const e=this.schedule.timeslots[this.activeMarker].start,t=at(e),i=tt(e,this.hass)-tt("sunrise+00:00",this.hass),s=tt(e,this.hass)-tt("sunset+00:00",this.hass),a=[{value:"time",name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.time.at"),icon:"hass:clock-outline"},{value:We.Sunrise,name:this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise"),icon:"hass:weather-sunny",disabled:Math.abs(i)>7200},{value:We.Sunset,name:this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset"),icon:"hass:weather-night",disabled:Math.abs(s)>7200}];return P`
      <div class="header">${as("ui.panel.time_picker.time_input_mode",vt(this.hass))}</div>
      <button-group .items=${a} .value=${t?t.event:"time"} @change=${this.updateMarkerSetting}>
      </button-group>
    `}updateMarkerSetting(e){const t=e.target.value,i=this.schedule.timeslots[this.activeMarker].start,s="time"==t?((e,t,i={})=>{const s=at(e);if(!s)return e;const a=t.states["sun.sun"],n="sunrise"==s.event?tt(a.attributes.next_rising,t):tt(a.attributes.next_setting,t);let o="+"==s.sign?n+tt(s.offset,t):n-tt(s.offset,t);return i.stepSize&&(o=st(o,i.stepSize)),it(o)})(i,this.hass,{stepSize:this.config.time_step}):ma(i,t,this.hass,{stepSize:this.config.time_step});let a=[...this.schedule.timeslots];a=Object.assign(a,{[this.activeMarker-1]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeMarker-1]),{stop:s}),[this.activeMarker]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeMarker]),{start:s})}),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...a]})}updateActiveEntry(e){null!==this.activeEntry&&(this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:Object.assign([...this.schedule.timeslots],{[this.activeEntry]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry]),e)})}))}updateActiveEntryAction(e,t){null!==this.activeEntry&&(e&&"service"in e?this.updateActiveEntry({actions:Object.assign([...this.schedule.timeslots[this.activeEntry].actions],{[t]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry].actions[t]),e)})}):e?Object.entries(e).forEach(([e,i])=>{let s=[...this.schedule.timeslots[this.activeEntry].actions],a="object"==typeof i&&e in this.schedule.timeslots[this.activeEntry].actions[t]?Object.assign(Object.assign({},s[t][e]),i):i;const n=Object.keys(a).filter(e=>null===a[e]);n.length&&(a=ot(a,...n)),s=Object.assign(s,{[t]:Object.assign(Object.assign({},s[t]),{[e]:a})}),this.updateActiveEntry({actions:s})}):this.updateActiveEntry({actions:[...this.schedule.timeslots[this.activeEntry].actions].filter((e,i)=>i!=t)}))}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){const t=e.detail.entries;t.length<this.schedule.timeslots.length&&this.activeEntry==this.schedule.timeslots.length-1&&(this.activeEntry=this.schedule.timeslots.length-2),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...t]})}else e.detail.hasOwnProperty("entry")&&(this.activeMarker=null,this.activeEntry=null!==e.detail.entry?Number(e.detail.entry):null);e.detail.hasOwnProperty("marker")&&(this.activeEntry=null,this.activeMarker=null!==e.detail.marker?Number(e.detail.marker):null)}selectAction(e){if(!this.actions||null===this.activeEntry)return;const t=e.detail;t?this.entities.map(e=>e.id).forEach((e,i)=>{this.updateActiveEntryAction(wa(e,t),i)}):this.entities.forEach((e,t)=>{this.updateActiveEntryAction(null,t)})}getVariableEditor(){if(null===this.activeEntry||!this.actions)return P``;const e=[];return this.schedule.timeslots[this.activeEntry].actions.forEach(t=>{t=ot(t,"entity_id"),this.actions.find(e=>Hs(e,t,!0)&&Object.keys(e.variables||{}).length)&&(e.some(e=>dt(e,t))||e.push(t))}),e.map(e=>Object.entries(this.actions.find(t=>Hs(t,e,!0)).variables).map(([t,i])=>P`
            <div class="header">
              ${i.name||pt(t)}
            </div>
            <scheduler-variable-picker
              .variable=${i}
              .value=${e.service_data?e.service_data[t]:null}
              @value-changed=${e=>this.entities.forEach((i,s)=>{this.updateActiveEntryAction({service_data:{[t]:e.detail.value}},s)})}
            >
              ${this.hass.localize("ui.dialogs.helper_settings.input_select.no_options")}
            </scheduler-variable-picker>
          `))}selectDays(e){const t=e.target.value;let i=this.schedule.weekdays;if(Object.values(Ge).includes(t))switch(t){case Ge.Daily:i=["daily"];break;case Ge.Workday:i=["workday"];break;case Ge.Weekend:i=["weekend"];break;case Ge.Custom:i=[]}else i=t;this.schedule=Object.assign(Object.assign({},this.schedule),{weekdays:i})}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}optionsClick(){const e=new CustomEvent("optionsClick",{detail:this.schedule});this.dispatchEvent(e)}editActionClick(){const e=new CustomEvent("editActionClick",{detail:this.schedule});this.dispatchEvent(e)}async deleteClick(e){const t=e.target;if(await new Promise(e=>{Re(t,"show-dialog",{dialogTag:"dialog-delete-confirm",dialogImport:()=>Promise.resolve().then((function(){return ba})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})){const e=new CustomEvent("deleteClick");this.dispatchEvent(e)}}};ka.styles=r`
    ${ns}
    div.summary {
      display: grid;
      grid-template-columns: 1fr max-content 1fr;
      grid-template-areas: 'entity arrow action';
      grid-auto-flow: column;
      grid-gap: 5px;
    }

    div.summary-entity {
      grid-area: entity;
    }
    div.summary-action {
      grid-area: action;
    }
    div.summary-arrow {
      grid-area: arrow;
      color: var(--secondary-text-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div.summary-entity,
    div.summary-action {
      color: var(--dark-primary-color);
      padding: 5px;
      font-size: 14px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      background: rgba(var(--rgb-primary-color), 0.15);
      border-radius: 4px;
      align-items: center;
    }
    div.summary-entity div,
    div.summary-action div {
      display: flex;
      flex-grow: 1;
      margin: 5px;
      width: 100%;
      align-items: center;
    }
    div.summary-entity ha-icon,
    div.summary-action ha-icon {
      display: flex;
      flex: 0 0 30px;
    }
  `,t([re()],ka.prototype,"hass",void 0),t([re()],ka.prototype,"config",void 0),t([re()],ka.prototype,"schedule",void 0),t([re()],ka.prototype,"actions",void 0),t([re()],ka.prototype,"entities",void 0),t([re()],ka.prototype,"activeEntry",void 0),t([re()],ka.prototype,"activeMarker",void 0),t([re({type:Boolean})],ka.prototype,"timeslots",void 0),t([re({type:Boolean})],ka.prototype,"editItem",void 0),ka=t([ne("scheduler-timepicker-card")],ka);let xa=class extends ae{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.disabled=!1,this.allowCustomValue=!1,this.invalid=!1,this.rowRenderer=(e,t,i)=>{!e.firstElementChild&&this.icons?(e.innerHTML='\n        <style>\n          paper-icon-item {\n              margin: -10px;\n              padding: 0;\n          }\n          ha-icon {\n              display: flex;\n              flex: 0 0 40px;\n              color: var(--state-icon-color);\n          }\n        </style>\n        <paper-icon-item>\n          <ha-icon icon="" slot="item-icon"></ha-icon>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-icon-item>\n        ',e.querySelector(".name").textContent=i.item.name,e.querySelector("[secondary]").textContent=i.item.description||"",e.querySelector("ha-icon").icon=i.item.icon):e.firstElementChild||(e.innerHTML=`\n        <style>\n          paper-item {\n              margin: -10px;\n              padding: 0;\n          }\n        </style>\n        <paper-item>\n          <paper-item-body>\n            ${i.item.name}\n          </paper-item-body>\n        </paper-item>\n        `)}}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("paper-input")).focus()})}shouldUpdate(e){if(e.get("items"))if(dt(this.items,e.get("items"))){if(1==e.size)return!1}else this.firstUpdated();return!0}firstUpdated(){(async()=>{await va()})(),this._comboBox.items=this.items}render(){return P`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
        .allowCustomValue=${this.allowCustomValue}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
        <paper-input
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
        >
          ${lt(this._value)&&this.items.find(e=>e.value==this._value)?P`
                ${this.icons?P`
                      <ha-icon slot="prefix" icon="${this.items.find(e=>e.value==this._value).icon}"> </ha-icon>
                    `:""}
                ${this.clearable?P`
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} .path=${aa}>
                      </ha-icon-button>
                    `:""}
              `:""}
          <ha-icon-button slot="suffix" class="toggle-button" .path=${this._opened?"M7,15L12,10L17,15H7Z":"M7,10L12,15L17,10H7Z"}>
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return lt(this.value)?this.value:""}_openedChanged(e){this._opened=e.detail.value}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{Re(this,"value-changed",{value:e})},0)}static get styles(){return r`
      :host {
        line-height: 1em;
      }
      paper-input > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      [hidden] {
        display: none;
      }
      paper-input > ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        width: 40px;
        height: 26px;
        align-items: center;
      }
    `}};t([re()],xa.prototype,"label",void 0),t([re()],xa.prototype,"value",void 0),t([re()],xa.prototype,"items",void 0),t([re()],xa.prototype,"clearable",void 0),t([re()],xa.prototype,"icons",void 0),t([re({type:Boolean})],xa.prototype,"disabled",void 0),t([ce()],xa.prototype,"_opened",void 0),t([re({attribute:"allow-custom-value",type:Boolean})],xa.prototype,"allowCustomValue",void 0),t([re({type:Boolean})],xa.prototype,"invalid",void 0),t([function(e,t){return le({descriptor:i=>{const s={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i;return void 0===this[t]&&(this[t]=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e)),this[t]}}return s}})}("vaadin-combo-box-light",!0)],xa.prototype,"_comboBox",void 0),xa=t([ne("scheduler-select")],xa);let $a=class extends ae{constructor(){super(...arguments),this.items=[],this.value=[],this.label="",this.invalid=!1}shouldUpdate(e){return e.get("items")&&(dt(this.items,e.get("items"))||this.firstUpdated()),!0}firstUpdated(){this.value.some(e=>!this.items.map(e=>e.value).includes(e))&&(this.value=this.value.filter(e=>this.items.map(e=>e.value).includes(e)),Re(this,"value-changed",{value:this.value}))}render(){return P`
      <div class="chip-set">
        ${this.value.length?this.value.map(e=>this.items.find(t=>t.value==e)).filter(lt).map(e=>P`
          <div class="chip">
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="hass:close" @click=${()=>this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `):""}
        <scheduler-select
          .items=${this.items.filter(e=>!this.value.includes(e.value))}
          label=${this.label}
          .icons=${!1}
          .allowCustomValue=${!0}
          @value-changed=${this._addClick}
          ?invalid=${this.invalid&&this.value.length!=this.items.length}
        >
        </scheduler-select>
      </div>
    `}_removeClick(e){this.value=this.value.filter(t=>t!==e),Re(this,"value-changed",{value:this.value})}_addClick(e){e.stopPropagation();const t=e.target,i=t.value;this.value.includes(i)||(this.value=[...this.value,i]),t.value="",Re(this,"value-changed",{value:[...this.value]})}static get styles(){return r`
      div.chip {
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgba(var(--rgb-primary-color), 0.54);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 1px 0px;
      }
      .icon {
        vertical-align: middle;
        outline: none;
        display: flex;
        align-items: center;
        border-radius: 50%;
        padding: 6px;
        color: rgba(0, 0, 0, 0.54);
        background: rgb(168, 232, 251);
        --mdc-icon-size: 20px;
        margin-left: -14px !important;
      }
      .label {
        margin: 0px 4px;
      }
      .button {
        cursor: pointer;
        background: var(--secondary-text-color);
        border-radius: 50%;
        --mdc-icon-size: 14px;
        color: var(--card-background-color);
        width: 16px;
        height: 16px;
        padding: 1px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        margin-right: -6px !important;
      }
    `}};t([re()],$a.prototype,"items",void 0),t([re({type:Array})],$a.prototype,"value",void 0),t([re()],$a.prototype,"label",void 0),t([re({type:Boolean})],$a.prototype,"invalid",void 0),$a=t([ne("scheduler-selector")],$a);const ja=(e,t)=>{let i={};return(null==t?void 0:t.length)&&!t.includes(Be.Above)||(i=Object.assign(Object.assign({},i),{[Be.Above]:{value:Be.Above,name:e.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.above"),icon:"hass:greater-than"}})),(null==t?void 0:t.length)&&!t.includes(Be.Below)||(i=Object.assign(Object.assign({},i),{[Be.Below]:{value:Be.Below,name:e.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.below"),icon:"hass:less-than"}})),(null==t?void 0:t.length)&&!t.includes(Be.Equal)||(i=Object.assign(Object.assign({},i),{[Be.Equal]:{value:Be.Equal,name:as("ui.panel.conditions.equal_to",vt(e)),icon:"hass:equal"}})),(null==t?void 0:t.length)&&!t.includes(Be.Unequal)||(i=Object.assign(Object.assign({},i),{[Be.Unequal]:{value:Be.Unequal,name:as("ui.panel.conditions.unequal_to",vt(e)),icon:"hass:not-equal-variant"}})),i};let za=class extends ae{constructor(){super(...arguments),this.addCondition=!1,this.tags=[],this.startDate="",this.endDate=""}async firstUpdated(){var e,t,i;if(null===(e=this.config)||void 0===e?void 0:e.tags){(async()=>{await va()})();const e=(await Xs(this.hass)).map(e=>e.name),t=gt(this.config.tags);this.tags=[...e,...t.filter(t=>!e.includes(t)&&"none"!=t)]}(await window.loadCardHelpers()).importMoreInfoControl("input_datetime"),this.startDate=(null===(t=this.schedule)||void 0===t?void 0:t.start_date)||_s(new Date,vt(this.hass),!0),this.endDate=(null===(i=this.schedule)||void 0===i?void 0:i.end_date)||_s(new Date,vt(this.hass),!0)}render(){var e,t;if(!this.hass||!this.config||!this.schedule)return P``;let i=[{name:this.hass.localize("ui.panel.config.automation.editor.actions.type.repeat.label"),value:Ue.Repeat,icon:"refresh"},{name:this.hass.localize("ui.dialogs.more_info_control.vacuum.stop"),value:Ue.Pause,icon:"stop"},{name:this.hass.localize("ui.common.delete"),value:Ue.Single,icon:"trash-can-outline"}];return lt(this.schedule.start_date)&&(i=i.filter(e=>e.value!=Ue.Repeat)),P`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title?"string"==typeof this.config.title?this.config.title:as("ui.panel.common.title",vt(this.hass)):""}
          </div>
          <ha-icon-button .path=${aa} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.addCondition?this.renderAddCondition():P`
                <div class="header">
                  ${this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.conditions")}
                  ${!this.schedule.timeslots[0].conditions||this.schedule.timeslots[0].conditions.length<2?"":P`
                        <div class="switch">
                          ${as("ui.panel.conditions.any",vt(this.hass))}
                          <ha-switch
                            style="margin: 0px 10px"
                            @change=${this.conditionTypeSwitchClick}
                            ?checked=${this.schedule.timeslots[0].condition_type==Ye.All}
                          ></ha-switch>
                          ${as("ui.panel.conditions.all",vt(this.hass))}
                        </div>
                      `}
                </div>
                ${this.renderConditions()}

                <div class="condition-options">
                  <div style="flex: 1">
                    <mwc-button @click=${this.addConditionClick}>
                      <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
                      ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
                    </mwc-button>
                  </div>
                  <div class="track-conditions">
                    ${this.schedule.timeslots[0].stop&&this.schedule.timeslots[0].conditions&&this.schedule.timeslots[0].conditions.length>0?P`
                          <ha-checkbox
                            id="track_conditions"
                            ?checked=${this.schedule.timeslots[0].track_conditions}
                            @change=${this.trackConditionsClick}
                          ></ha-checkbox>
                          <span
                            @click=${()=>this.shadowRoot.querySelector("#track_conditions").click()}
                          >
                            ${as("ui.panel.conditions.track_conditions",vt(this.hass))}
                          </span>
                        `:""}
                  </div>
                </div>

                <div class="header">${as("ui.panel.options.period",vt(this.hass))}</div>
                <div class="checkbox-container">
                  <div class="checkbox">
                    <ha-checkbox ?checked=${lt(this.schedule.start_date)} @change=${this.toggleEnableDateRange}>
                    </ha-checkbox>
                  </div>
                  <div class="slider date-range">
                    <div>
                      <span>
                        ${pt((null===(e=as("ui.components.date.days_range",vt(this.hass)).split("{").shift())||void 0===e?void 0:e.trim())||"")}
                      </span>
                      <ha-date-input
                        value=${this.startDate}
                        .label=${this.hass.localize("ui.components.date-range-picker.start_date")}
                        @value-changed=${this._setStartDate}
                        ?disabled=${!lt(this.schedule.start_date)}
                      >
                      </ha-date-input>
                    </div>

                    <div>
                      <span>
                        ${pt((null===(t=as("ui.components.date.days_range",vt(this.hass)).split("}")[1].split("{").shift())||void 0===t?void 0:t.trim())||"")}
                      </span>
                      <ha-date-input
                        value=${this.endDate}
                        .label=${this.hass.localize("ui.components.date-range-picker.end_date")}
                        @value-changed=${this._setEndDate}
                        ?disabled=${!lt(this.schedule.start_date)}
                      >
                      </ha-date-input>
                    </div>
                  </div>
                </div>

                <div class="header">${this.hass.localize("ui.components.area-picker.add_dialog.name")}</div>
                <paper-input
                  no-label-float
                  value=${this.schedule.name||""}
                  placeholder=${this.schedule.name?"":this.hass.localize("ui.components.area-picker.add_dialog.name")}
                  @value-changed=${this.updateName}
                ></paper-input>

                ${this.config.tags?P`
                      <div class="header">${this.hass.localize("ui.panel.config.tag.caption")}</div>
                      <scheduler-selector
                        .items=${this.getTagOptions()}
                        .value=${this.schedule.tags||[]}
                        @value-changed=${this.updateTags}
                        label=${this.hass.localize("ui.panel.config.tag.add_tag")}
                      >
                      </scheduler-selector>
                    `:""}

                <div class="header">${as("ui.panel.options.repeat_type",vt(this.hass))}</div>
                <button-group
                  .items=${i}
                  value="${this.schedule.repeat_type}"
                  @change=${this.updateRepeatType}
                >
                </button-group>
              `}
        </div>
        <div class="card-actions">
          ${this.addCondition?P`
                <mwc-button
                  @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity||!this.conditionMatchType||!this.conditionValue}
                  >${this.hass.localize("ui.common.save")}</mwc-button
                >
                ${void 0!==this.editItem?P`
                      <mwc-button class="warning" @click=${this.deleteConditionClick}
                        >${this.hass.localize("ui.common.delete")}</mwc-button
                      >
                    `:""}
                <mwc-button @click=${this.cancelConditionClick} style="float: right"
                  >${this.hass.localize("ui.common.cancel")}</mwc-button
                >
              `:P`
                <mwc-button
                  @click=${this.saveClick}
                  ?disabled=${!this.schedule.timeslots.filter(e=>e.actions.length).length}
                >
                  ${this.hass.localize("ui.common.save")}
                </mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize("ui.common.back")}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `}renderAddCondition(){if(!this.addCondition||!this.hass||!this.config)return P``;if(this.selectedEntity){const e=this.selectedEntity,t=ca(e.id,this.hass,this.config);let i;if((null==t?void 0:t.type)==Fe.Level)i=[Be.Above,Be.Below];else if((null==t?void 0:t.type)==Fe.List)i=[Be.Equal,Be.Unequal];else{const t=e.id in this.hass.states?this.hass.states[e.id].state:null;i=!t||["unavailable","unknown"].includes(t)?[Be.Equal,Be.Unequal,Be.Above,Be.Below]:isNaN(Number(t))?[Be.Equal,Be.Unequal]:[Be.Above,Be.Below]}const s=ja(this.hass,i);return P`
        <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
        <div style="display: flex; flex-direction: row; align-items: center">
          <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)">
            <ha-icon icon="${mt(e.icon||"folder-outline")}"></ha-icon>
            ${pt(e.name)}
          </mwc-button>
          <ha-icon-button
            .path=${na}
            style="margin-left: 10px"
            @click=${()=>{this.selectedEntity=void 0}}
          >
          </ha-icon-button>
        </div>

        <div class="header">
          ${this.hass.localize("ui.panel.config.automation.editor.conditions.type.device.condition")}
        </div>
        <button-group
          .items=${Object.values(s)}
          value=${this.conditionMatchType}
          @change=${e=>this.conditionMatchType=e.target.value}
        >
        </button-group>

        <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.state.label")}</div>
        <scheduler-variable-picker
          .variable=${t}
          .value=${this.conditionValue}
          @value-changed=${e=>this.conditionValue=e.detail.value}
        >
        </scheduler-variable-picker>
      `}{const e=oa(la(this.hass,this.config,{filterActions:!1,filterStates:!0}),this.config,this.hass);e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1);let t=[];return this.selectedGroup&&(t=e.find(e=>dt(e,this.selectedGroup)).entities.map(e=>Es(e,this.hass,this.config)),t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1)),P`
        <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>

        <button-group
          .items=${e}
          .value=${e.findIndex(e=>dt(e,this.selectedGroup))}
          @change=${this.selectGroup}
        >
          ${as("ui.panel.entity_picker.no_groups_defined",vt(this.hass))}
        </button-group>

        <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
        <button-group
          .items=${t}
          .value=${t.findIndex(e=>dt(e,this.selectedEntity))}
          @change=${this.selectEntity}
        >
          ${this.selectedGroup?as("ui.panel.entity_picker.no_entities_for_group",vt(this.hass)):as("ui.panel.entity_picker.no_group_selected",vt(this.hass))}
        </button-group>
      `}}selectGroup(e){this.selectedGroup=e.detail,this.selectedEntity=void 0}selectEntity(e){this.selectedEntity=e.detail,this.conditionMatchType=void 0,this.conditionValue=void 0}renderConditions(){if(!this.hass||!this.schedule)return P``;const e=this.schedule.timeslots[0].conditions||[];return e.length?e.map((e,t)=>{const i=Es(e.entity_id,this.hass,this.config),s=ca(e.entity_id,this.hass,this.config);return P`
        <div class="summary">
          <ha-icon icon="${i.icon||"folder-outline"}"></ha-icon>
          <span>
            ${pt(i.name)} ${ja(this.hass)[e.match_type].name.toLowerCase()}
            ${s?s.type==Fe.List?bs(e.value,s):s.type==Fe.Level?ks(e.value,s):"":""}
          </span>
          <ha-icon-button
            .path=${na}
            @click=${()=>{this.editConditionClick(t)}}
          >
          </ha-icon-button>
        </div>
      `}):P`
        <div class="text-field">${as("ui.panel.conditions.no_conditions_defined",vt(this.hass))}</div>
      `}addConditionClick(){this.addCondition=!0,this.selectedEntity=void 0,this.selectedGroup=void 0}confirmConditionClick(){var e;if(!(this.selectedEntity&&this.config&&this.hass&&this.schedule&&this.conditionMatchType&&this.conditionValue))return;const t={entity_id:this.selectedEntity.id,match_type:this.conditionMatchType,value:this.conditionValue,attribute:"state"},i=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[],s=this.schedule.timeslots[0].condition_type?this.schedule.timeslots[0].condition_type:Ye.Any;void 0===this.editItem?i.push(t):i.splice(this.editItem,1,t),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:i,condition_type:s}))}),this.addCondition=!1,this.editItem=void 0}cancelConditionClick(){this.addCondition=!1,this.editItem=void 0}editConditionClick(e){if(!(this.schedule&&this.schedule.timeslots[0].conditions&&this.hass&&this.config))return;const t=this.schedule.timeslots[0].conditions[e];if(!t)return;this.editItem=e;const i=oa(la(this.hass,this.config,{filterActions:!1,filterStates:!0}),this.config,this.hass);this.selectedGroup=i.find(e=>e.entities.includes(t.entity_id)),this.selectedEntity=Es(t.entity_id,this.hass,this.config),this.conditionMatchType=t.match_type,this.conditionValue=t.value,this.addCondition=!0}deleteConditionClick(){var e;if(!this.config||!this.hass||!this.schedule||void 0===this.editItem)return;const t=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[];t.splice(this.editItem,1),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:t}))}),this.addCondition=!1,this.editItem=void 0}conditionTypeSwitchClick(e){if(!this.schedule)return;const t=e.target.checked?Ye.All:Ye.Any;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{condition_type:t}))})}trackConditionsClick(e){if(!this.schedule)return;const t=e.target.checked;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object(Object.assign(Object.assign({},e),{track_conditions:t})))})}_setStartDate(e){const t=String(e.detail.value);if(!t)return;As(t)>As(this.endDate)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t}_setEndDate(e){const t=String(e.detail.value);if(!t)return;As(this.startDate)>As(t)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t}toggleEnableDateRange(e){const t=e.target.checked;this.shadowRoot.querySelectorAll("ha-date-input");this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t?this.startDate:void 0,end_date:t?this.endDate:void 0,repeat_type:t?this.schedule.repeat_type==Ue.Repeat?Ue.Pause:this.schedule.repeat_type:this.schedule.repeat_type==Ue.Pause?Ue.Repeat:this.schedule.repeat_type})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t})}updateRepeatType(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}getTagOptions(){var e;let t=[...this.tags];return(null===(e=this.schedule)||void 0===e?void 0:e.tags.length)&&(t=[...t,...this.schedule.tags.filter(e=>!t.includes(e))]),t.sort(ut),t.map(e=>Object({name:e,value:e}))}updateTags(e){let t=e.target.value;t=t.map(e=>e.trim()),t=t.filter(e=>"none"!=e),t.sort(ut),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:t})}cancelClick(){if(this.addCondition)this.addCondition=!this.addCondition;else{const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}backClick(){const e=new CustomEvent("backClick",{detail:this.schedule});this.dispatchEvent(e)}};za.styles=r`
    ${ns}
    div.summary {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 0px;
      background: rgba(var(--rgb-primary-color), 0.15);
      color: var(--dark-primary-color);
      border-radius: 8px;
      margin: 2px 0px;
      font-size: 14px;
      font-weight: 500;
    }
    div.summary ha-icon {
      flex: 0 0 48px;
      justify-content: center;
      display: flex;
    }
    div.summary span {
      flex: 1 0 60px;
      display: flex;
    }
    div.summary ha-icon-button {
      margin: -8px 0px;
    }
    div.date-range {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    div.date-range div {
      display: flex;
      align-items: center;
    }
    div.date-range div span {
      display: inline-flex;
      padding: 0px 10px;
    }
    div.date-range div:first-child span {
      padding-left: 0px;
    }
    div.condition-options {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
    }
    div.track-conditions {
      display: flex;
      flex-direction: row;
      text-align: right;
      align-items: center;
      max-width: 50%;
    }
    div.track-conditions span {
      text-align: left;
    }
  `,t([re()],za.prototype,"hass",void 0),t([re()],za.prototype,"config",void 0),t([re()],za.prototype,"schedule",void 0),t([re()],za.prototype,"selectedGroup",void 0),t([re()],za.prototype,"selectedEntity",void 0),t([re()],za.prototype,"conditionMatchType",void 0),t([re()],za.prototype,"conditionValue",void 0),t([re()],za.prototype,"editItem",void 0),t([re()],za.prototype,"addCondition",void 0),t([re()],za.prototype,"tags",void 0),t([ce()],za.prototype,"startDate",void 0),t([ce()],za.prototype,"endDate",void 0),za=t([ne("scheduler-options-card")],za);let Oa=class extends ae{constructor(){super(...arguments),this.scheduleEntities=[],this._cardTab=!1,this.selectedDomain=""}setConfig(e){this._config=e}async firstUpdated(){await va(),this.scheduleEntities=(await Js(this.hass)).map(e=>e.entity_id);const e=(await Xs(this.hass)).map(e=>e.name);e.sort(ut),this.tagOptions=e}render(){return this.hass&&this._config?P`
      <mwc-tab-bar .activeIndex=${this._cardTab?1:0} @MDCTabBar:activated=${this._selectTab}>
        <mwc-tab .label=${as("ui.panel.card_editor.tabs.entities",vt(this.hass))}></mwc-tab>
        <mwc-tab .label=${as("ui.panel.card_editor.tabs.other",vt(this.hass))}></mwc-tab>
      </mwc-tab-bar>

      <div class="card-config">
        ${this._cardTab?P`
              <div class="header">${as("ui.panel.card_editor.fields.title.heading",vt(this.hass))}</div>
              <button-group
                .items=${[{name:as("ui.panel.card_editor.fields.title.options.standard",vt(this.hass)),value:"standard"},{name:as("ui.panel.card_editor.fields.title.options.hidden",vt(this.hass)),value:"hidden"},{name:as("ui.panel.card_editor.fields.title.options.custom",vt(this.hass)),value:"custom"}]}
                value=${this.getTitleOption()}
                @change=${e=>this._setTitleFormatOption(e.target.value)}
              >
              </button-group>
              ${"string"==typeof this._config.title?P`
                    <paper-input
                      label=${as("ui.panel.card_editor.fields.title.custom_title",vt(this.hass))}
                      .value=${this._config.title}
                      @value-changed=${e=>{this._updateConfig({title:String(e.target.value)})}}
                    ></paper-input>
                  `:""}

              <div class="header">
                ${as("ui.panel.card_editor.fields.discover_existing.heading",vt(this.hass))}
              </div>
              <div class="text-field">
                ${as("ui.panel.card_editor.fields.discover_existing.description",vt(this.hass))}
              </div>
              <ha-switch
                ?checked=${!1!==this._config.discover_existing}
                @change=${e=>{this._updateConfig({discover_existing:e.target.checked})}}
              >
              </ha-switch>

              <div class="header">
                ${as("ui.panel.card_editor.fields.time_step.heading",vt(this.hass))}
              </div>
              <div class="text-field">
                ${as("ui.panel.card_editor.fields.time_step.description",vt(this.hass))}
              </div>
              <variable-slider
                min="1"
                max="30"
                step="1"
                value=${this._config.time_step||10}
                unit=" min"
                ?optional=${!1}
                ?disabled=${!1}
                @value-changed=${e=>{this._updateConfig({time_step:Number(e.detail.value)})}}
              >
              </variable-slider>

              <div class="header">
                ${as("ui.panel.card_editor.fields.display_format_primary.heading",vt(this.hass))}
              </div>
              <div class="text-field">
                ${as("ui.panel.card_editor.fields.display_format_primary.description",vt(this.hass))}
              </div>

              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_primary.options.default",vt(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${"default"==(this._config.display_options||et.display_options).primary_info}
                  value="default"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>
              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_primary.options.entity_action",vt(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${"{entity}: {action}"==(this._config.display_options||et.display_options).primary_info}
                  value="{entity}: {action}"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>

              <div class="header">
                ${as("ui.panel.card_editor.fields.display_format_secondary.heading",vt(this.hass))}
              </div>
              <div class="text-field">
                ${as("ui.panel.card_editor.fields.display_format_secondary.description",vt(this.hass))}
              </div>

              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_secondary.options.relative_time",vt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${gt((this._config.display_options||et.display_options).secondary_info).includes("relative-time")}
                  value="relative-time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_secondary.options.time",vt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${gt((this._config.display_options||et.display_options).secondary_info).includes("time")}
                  value="time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_secondary.options.days",vt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${gt((this._config.display_options||et.display_options).secondary_info).includes("days-tasks")}
                  value="days"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${as("ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks",vt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${gt((this._config.display_options||et.display_options).secondary_info).includes("additional-tasks")}
                  value="additional-tasks"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              ${void 0!==this.tagOptions?P`
                    <div class="header">
                      ${as("ui.panel.card_editor.fields.tags.heading",vt(this.hass))}
                    </div>
                    <div class="text-field">
                      ${as("ui.panel.card_editor.fields.tags.description",vt(this.hass))}
                    </div>
                    <scheduler-selector
                      .items=${this.getTagOptions()}
                      .value=${gt(this._config.tags)}
                      @value-changed=${this.updateTags}
                      label=${this.hass.localize("ui.panel.config.tag.add_tag")}
                    >
                    </scheduler-selector>
                  `:""}
            `:P`
              <div class="header">
                ${as("ui.panel.card_editor.fields.entities.heading",vt(this.hass))}
              </div>
              <div class="text-field">
                ${as("ui.panel.card_editor.fields.entities.description",vt(this.hass))}
              </div>
              ${this.getDomainSwitches()}
            `}
      </div>
    `:P``}_selectTab(e){this._cardTab=1===e.detail.index}_updateConfig(e){this._config&&(this._config=Object.assign(Object.assign({},this._config),e),Re(this,"config-changed",{config:this._config}))}_setTitleFormatOption(e){var t;this.hass&&("standard"==e?this._updateConfig({title:!0}):"hidden"==e?this._updateConfig({title:!1}):this._updateConfig({title:"string"==typeof(null===(t=this._config)||void 0===t?void 0:t.title)?this._config.title:as("ui.panel.common.title",vt(this.hass))}))}getTitleOption(){return this.hass&&this._config?"string"==typeof this._config.title?"custom":this._config.title?"standard":"hidden":""}updateTags(e){if(!this._config||!this.hass)return;let t=e.target.value;t=t.map(e=>e.trim()),t.sort(ut),this._updateConfig({tags:t})}getTagOptions(){if(!this._config||!this.hass)return[];let e=this.tagOptions||[];if(this._config.tags){const t=gt(this._config.tags);e=[...e,...t.filter(t=>!e.includes(t))]}return e.map(e=>Object({name:e,value:e}))}_setDisplayOptionsPrimary(e){var t;const i=e.target.value,s=Object.assign(Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||et.display_options),{primary_info:i});this._updateConfig({display_options:s})}_setDisplayOptionsSecondary(e){var t;const i=e.target.value,s=e.target.checked;let a=Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||et.display_options),n=gt(a.secondary_info||[]);n=s?Array.from(new Set([...n,i])):n.filter(e=>e!==i),n.sort((e,t)=>{const i={"relative-time":1,time:n.includes("relative-time")?3:2,days:n.includes("relative-time")?2:3,"additional-tasks":4},s=Object.keys(i).includes(e)?i[e]:5,a=Object.keys(i).includes(t)?i[t]:5;return s>a?1:s<a?-1:0}),a=Object.assign(Object.assign({},a),{secondary_info:[...n]}),this._updateConfig({display_options:a})}getDomainSwitches(){if(!this._config||!this.hass)return;const e=la(this.hass,Object.assign(Object.assign({},et),{include:["*"]}),{filterActions:!0,filterStates:!0}).filter(e=>"switch"!==Ne(e)||!this.scheduleEntities.includes(e)).map(e=>Es(e,this.hass,{include:["*"]})).filter(e=>ra(e.id,this.hass)||Gs(e.id,this.hass,et)),t=e.map(e=>Ne(e.id)).filter((e,t,i)=>i.indexOf(e)===t);return t.sort((e,t)=>e.trim().toLowerCase()<t.trim().toLowerCase()?-1:1),t.map(t=>{var i;const s=e.filter(e=>Ne(e.id)==t).length,a=e.filter(e=>Ne(e.id)==t),n=a.filter(e=>ea(e.id,this._config)).length;return s?P`
        <div class="row" @click=${()=>this.toggleShowDomain(t)}>
          <ha-icon icon="${mt(zs[t])}"> </ha-icon>

          <div class="info">
            ${t}
            <div class="secondary">
              ${as("ui.panel.card_editor.fields.entities.included_number",vt(this.hass),["{number}","{total}"],[n,s])}
            </div>
          </div>
          <ha-switch
            @click=${e=>e.stopPropagation()}
            @change=${e=>this.toggleSelectEntity(t,e.target.checked)}
            ?checked=${ea(t,this._config)}
            ?disabled=${ea(t,{groups:null===(i=this._config)||void 0===i?void 0:i.groups})}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain==t?P`
              <div class="divider"></div>
              ${a.map(e=>{var i,s;return P`
                  <div class="row" @click=${()=>this.toggleSelectEntity(e.id)}>
                    <ha-icon icon="${e.icon}"></ha-icon>
                    <div class="info">
                      ${e.name}
                      <div class="secondary">
                        ${e.id}
                      </div>
                    </div>
                    <ha-switch
                      ?checked=${ea(e.id,this._config)}
                      ?disabled=${ea(e.id,{groups:null===(i=this._config)||void 0===i?void 0:i.groups})||ea(t,{groups:null===(s=this._config)||void 0===s?void 0:s.groups})}
                    ></ha-switch>
                  </div>
                `})}
              <div class="divider"></div>
            `:""}
      `:""})}toggleShowDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectEntity(e,t){if(!this._config||!this.hass)return;const i=ea(e,this._config);void 0===t&&(t=!i);const s=Ne(e);let a=[...this._config.include||[]],n=[...this._config.exclude||[]];if(!i&&t)n.includes(e)&&(n=n.filter(t=>t!=e)),a.includes(e)||(a=[...a,e]);else{if(!i||t)return;(s&&a.includes(s)||ea(e,{customize:this._config.customize})||s&&ea(s,{customize:this._config.customize}))&&(n=[...n,e]),a.includes(e)&&(a=a.filter(t=>t!=e))}a.sort(ut),n.sort(ut),this._updateConfig({include:a,exclude:n})}static get styles(){return r`
      ${ns}
      div.row {
        display: flex;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        margin: 10px 0px;
      }
      div.divider {
        height: 1px;
        background: var(--divider-color);
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
      .secondary {
        display: block;
        color: var(--secondary-text-color);
      }
      div.row ha-icon {
        padding: 8px;
        color: var(--paper-item-icon-color);
      }
      div.row state-badge {
        flex: 0 0 40px;
      }
      div.row ha-switch {
        padding: 13px 5px;
      }
    `}};t([re()],Oa.prototype,"hass",void 0),t([re()],Oa.prototype,"_config",void 0),t([re()],Oa.prototype,"scheduleEntities",void 0),t([re()],Oa.prototype,"tagOptions",void 0),t([ce()],Oa.prototype,"_cardTab",void 0),t([re()],Oa.prototype,"selectedDomain",void 0),Oa=t([ne("scheduler-card-editor")],Oa);let Sa=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?P`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${aa}> </ha-icon-button>
            <span slot="title">
              ${this.hass.localize("state_badge.default.error")}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.error||""}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:P``}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([re({attribute:!1})],Sa.prototype,"hass",void 0),t([ce()],Sa.prototype,"_params",void 0),Sa=t([ne("dialog-error")],Sa);var Ea=Object.freeze({__proto__:null,get DialogError(){return Sa}});let Ca=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?P`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${aa}> </ha-icon-button>
            <span slot="title">
              Defective entity
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          This schedule is defective and cannot be edited with the card. Consider to delete the item and recreate it. If
          the problem persists, please report the issue on GitHub.
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left; --mdc-theme-primary: var(--error-color)"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this.hass.localize("ui.common.delete")}
        </mwc-button>
      </ha-dialog>
    `:P``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([re({attribute:!1})],Ca.prototype,"hass",void 0),t([ce()],Ca.prototype,"_params",void 0),Ca=t([ne("dialog-delete-defective")],Ca);var Da=Object.freeze({__proto__:null,get DialogDeleteDefective(){return Ca}});const Ma=(e,t,i,s)=>{if(!e)return null;const a=Ws(e,s);let n=i.find(e=>Hs(e,a,!0));if(!n)return null;let o=t.map(e=>wa(e,n));return o=Object.keys(n.variables||{}).filter(t=>Object.keys(e.service_data||{}).includes(t)).reduce((t,i)=>{if(!t)return t;switch(n.variables[i].type){case Fe.Level:const s=n.variables[i];let a=Number(e.service_data[i]);return a/=s.scale_factor,a=Math.round(a/s.step)*s.step,a=parseFloat(a.toPrecision(12)),a>s.max?a=s.max:a<s.min&&(a=s.min),a*=s.scale_factor,a=parseFloat(a.toFixed(2)),t.map(e=>Object.assign(e,{service_data:Object.assign(Object.assign({},e.service_data),{[i]:a})}));case Fe.List:return n.variables[i].options.some(t=>t.value==e.service_data[i])?t.map(t=>Object.assign(t,{service_data:Object.assign(Object.assign({},t.service_data),{[i]:e.service_data[i]})})):null;case Fe.Text:return t.map(t=>Object.assign(t,{service_data:Object.assign(Object.assign({},t.service_data),{[i]:e.service_data[i]})}));default:return t}},o),o};window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v2.3.0".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),e.SchedulerCard=class extends ae{constructor(){super(...arguments),this._view=Qe.Overview,this.actions=[],this.translationsLoaded=!1,this.editItem=null}static getConfigElement(){return document.createElement("scheduler-card-editor")}set hass(e){this._hass=e}firstUpdated(){const e=this._hass;if(e.localize("ui.panel.config.automation.editor.actions.name"))this.translationsLoaded=!0;else{document.querySelector("home-assistant")._loadFragmentTranslations(e.language,"config").then(()=>{this._hass.localize})}}shouldUpdate(e){const t=e.get("_hass");return!t||1!=e.size||(t.localize("ui.panel.config.automation.editor.actions.name")?this._view==Qe.Overview:(this.translationsLoaded=!0,!0))}setConfig(e){ft(e);const t=Object.assign(Object.assign({},et),e);this._config=t}getCardSize(){return 9}render(){return this._hass&&this._config&&this.translationsLoaded?this._view==Qe.Overview?P`
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `:this._view==Qe.NewSchedule?P`
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entities=${this.entities}
          .schedule=${this.schedule}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `:this._view==Qe.TimePicker||this._view==Qe.TimeScheme?P`
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .schedule=${this.schedule}
          .entities=${this.entities}
          .actions=${this.actions}
          ?timeslots=${this._view==Qe.TimeScheme}
          ?editItem=${null!==this.editItem}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `:this._view==Qe.Options?P`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .schedule=${this.schedule}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${this._saveItemClick}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `:P``:P``}_addItemClick(){this._view=Qe.NewSchedule,this.editItem=null,this.entities=[],this.actions=[],this.schedule=void 0}_cancelEditClick(){this._view=Qe.Overview,this.editItem=null}_confirmItemClick(e){if(!this._hass||!this._config)return;const t=e.detail.entities;this.entities=t.map(e=>Es(e,this._hass,this._config));const i=Boolean(e.detail.timeSchemeSelected),s=e.detail.action,a=this.schedule,n=1==gt(this._config.tags).length?gt(this._config.tags).slice(0,1):[];if(i){this.actions=Gs(t,this._hass,this._config);const e=[{start:"00:00:00",stop:"08:00:00",actions:[]},{start:"08:00:00",stop:"16:00:00",actions:[]},{start:"16:00:00",stop:"00:00:00",actions:[]}];if(a){const i=a.timeslots.map(e=>e.actions[0]).map(e=>Ma(e,t,this.actions,this._hass));this.schedule=Object.assign(Object.assign({},a),{timeslots:a.timeslots.length>1&&a.timeslots.every(e=>e.stop)?a.timeslots.map((e,t)=>Object.assign(e,{actions:i[t]||[]})):e})}else this.schedule={weekdays:["daily"],timeslots:e,repeat_type:Ue.Repeat,tags:n};this._view=Qe.TimeScheme}else{this.actions=[s];const e={start:"12:00:00",actions:t.map(e=>wa(e,this.actions[0]))};this.schedule=a?Object.assign(Object.assign({},a),{timeslots:1!=a.timeslots.length||a.timeslots[0].stop?[e]:[Object.assign(Object.assign({},a.timeslots[0]),{actions:Ma(a.timeslots[0].actions[0],t,this.actions,this._hass)||e.actions})]}):{weekdays:["daily"],timeslots:[e],repeat_type:Ue.Repeat,tags:n},this._view=Qe.TimePicker}}_editActionClick(e){this.schedule=e.detail,this._view=Qe.NewSchedule}_saveItemClick(e){if(!this._hass)return;let t=e.detail;var i,s;t=Object.assign(Object.assign({},t),{timeslots:t.timeslots.map(e=>{var t;return e.actions&&e.actions.length?(e.actions.some(e=>!e.entity_id||"notify"==Ne(e.entity_id||""))&&(e=Object.assign(Object.assign({},e),{actions:e.actions.map(e=>e.entity_id&&"notify"!=Ne(e.entity_id||"")?e:ot(e,"entity_id"))})),e.stop||(e=ot(e,"stop")),(null===(t=e.conditions)||void 0===t?void 0:t.length)||(e=ot(e,"conditions","condition_type")),e):null}).filter(lt)}),this.editItem?(function(e){return!!e&&null!==e.match(/^Schedule\ #[a-f0-9]{6}/)}(t.name)&&(t=Object.assign(Object.assign({},t),{name:""})),(i=this._hass,s=Object.assign(Object.assign({},t),{schedule_id:this.editItem}),i.callApi("POST","scheduler/edit",s)).catch(e=>Qs(e,this)).then(()=>{this.editItem=null,this._view=Qe.Overview})):((e,t)=>e.callApi("POST","scheduler/add",t))(this._hass,t).catch(e=>Qs(e,this)).then(()=>{this._view=Qe.Overview})}_deleteItemClick(){if(!this.editItem||!this._hass)return;const e=this.editItem;var t,i;(t=this._hass,i=e,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>Qs(e,this)).then(()=>{this.editItem=null,this._view=Qe.Overview})}async _editItemClick(e){if(!this._hass||!this._config)return;const t=await Ks(this._hass,e.detail);if(!t)return;const i=ct(rt(t.timeslots.map(e=>e.actions.map(e=>e.entity_id||e.service))));this.entities=i.map(e=>Es(e,this._hass,this._config));let s=Gs(i,this._hass,this._config);const a=ct(rt(t.timeslots.map(e=>e.actions)));let n=a.filter(e=>!s.some(t=>Hs(t,e,!0)));if(n.length&&ct(n).forEach(e=>s.push(Ws(e,this._hass))),this.actions=s,this.schedule={weekdays:t.weekdays,timeslots:t.timeslots,repeat_type:t.repeat_type,name:t.name,tags:t.tags||[],start_date:t.start_date,end_date:t.end_date},this.editItem=t.schedule_id,this.entities.length&&this.schedule.timeslots.length)this.schedule.timeslots.every(e=>e.stop)?(this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:_t(this.schedule.timeslots,this._hass)}),this.actions.length?this._view=Qe.TimeScheme:Qs({error:"",body:{message:`Could not compute actions for the schedule #${e.detail}.`}},this)):(this.actions=this.actions.filter(e=>a.find(t=>Hs(e,t,!0))).reduce((e,t)=>[t],[]),this.actions.length?this._view=Qe.TimePicker:Qs({error:"",body:{message:`Could not compute actions for schedule #${e.detail}.`}},this));else{await new Promise(e=>{Re(this,"show-dialog",{dialogTag:"dialog-delete-defective",dialogImport:()=>Promise.resolve().then((function(){return Da})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})?this._deleteItemClick():this._cancelEditClick()}}_gotoOptionsClick(e){this.schedule=e.detail,this._view=Qe.Options}_optionsBackClick(e){this.schedule=e.detail,this.schedule.timeslots.every(e=>e.stop)?this._view=Qe.TimeScheme:this._view=Qe.TimePicker}},t([re()],e.SchedulerCard.prototype,"_config",void 0),t([re()],e.SchedulerCard.prototype,"_hass",void 0),t([re()],e.SchedulerCard.prototype,"_view",void 0),t([re()],e.SchedulerCard.prototype,"entities",void 0),t([re()],e.SchedulerCard.prototype,"actions",void 0),t([re()],e.SchedulerCard.prototype,"schedule",void 0),t([re()],e.SchedulerCard.prototype,"translationsLoaded",void 0),e.SchedulerCard=t([ne("scheduler-card")],e.SchedulerCard)}({});
