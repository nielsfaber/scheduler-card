!function(e){"use strict";function t(e,t,i,a){var s,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i=window,a=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new n(i,e,s)},l=(e,t)=>{a?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const a=document.createElement("style"),s=i.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=t.cssText,e.appendChild(a)})},d=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var c;const u=window,h=u.trustedTypes,m=h?h.emptyScript:"",p=u.reactiveElementPolyfillSupport,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:g},y="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Ep(i,t);void 0!==a&&(this._$Ev.set(a,i),e.push(a))}),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const s=this[e];this[t]=a,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var a;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:_).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,s=a._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=a.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:_;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var b;f[y]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(c=u.reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.6.3");const k=window,w=k.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,O=`<${j}>`,z=document,S=()=>z.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,E="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,L=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,P=/"/g,I=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),R=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),V=new WeakMap,F=z.createTreeWalker(z,129,null,!1);function B(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const U=(e,t)=>{const i=e.length-1,a=[];let s,o=2===t?"<svg>":"",n=T;for(let t=0;t<i;t++){const i=e[t];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===T?"!--"===l[1]?n=M:void 0!==l[1]?n=D:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=null!=s?s:T,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?L:'"'===l[3]?P:N):n===P||n===N?n=L:n===M||n===D?n=T:(n=L,s=void 0);const u=n===L&&e[t+1].startsWith("/>")?" ":"";o+=n===T?i+O:d>=0?(a.push(r),i.slice(0,d)+"$lit$"+i.slice(d)+$+u):i+$+(-2===d?(a.push(void 0),t):u)}return[B(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),a]};class W{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,o=0;const n=e.length-1,r=this.parts,[l,d]=U(e,t);if(this.el=W.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=F.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith($)){const i=d[o++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?X:"@"===t[1]?ee:J})}else r.push({type:6,index:s})}for(const t of e)a.removeAttribute(t)}if(I.test(a.tagName)){const e=a.textContent.split($),t=e.length-1;if(t>0){a.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],S()),F.nextNode(),r.push({type:2,index:++s});a.append(e[t],S())}}}else if(8===a.nodeType)if(a.data===j)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf($,e+1));)r.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,a){var s,o,n,r;if(t===R)return t;let l=void 0!==a?null===(s=i._$Co)||void 0===s?void 0:s[a]:i._$Cl;const d=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(t=Z(e,l._$AS(e,t.values),l,a)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:z).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new G(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new te(o,this,e)),this._$AV.push(t),l=a[++r]}n!==(null==l?void 0:l.index)&&(o=F.nextNode(),n++)}return F.currentNode=z,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,a){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(s=null==a?void 0:a.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),C(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==R&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==H&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(z.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,s="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=W.createElement(B(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new K(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new W(e)),t}T(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new G(this.k(S()),this.k(S()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,a,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const s=this.strings;let o=!1;if(void 0===s)e=Z(this,e,t,0),o=!C(e)||e!==this._$AH&&e!==R,o&&(this._$AH=e);else{const a=e;let n,r;for(e=s[0],n=0;n<s.length-1;n++)r=Z(this,a[i+n],t,n),r===R&&(r=this._$AH[n]),o||(o=!C(r)||r!==this._$AH[n]),r===H?e=H:e!==H&&(e+=(null!=r?r:"")+s[n+1]),this._$AH[n]=r}o&&!a&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}const Q=w?w.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==H?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class ee extends J{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Z(this,e,t,0))&&void 0!==i?i:H)===R)return;const a=this._$AH,s=e===H&&a!==H||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==H&&(a===H||s);s&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class te{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ie=k.litHtmlPolyfillSupport;null==ie||ie(W,G),(null!==(b=k.litHtmlVersions)&&void 0!==b?b:k.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ae,se;class oe extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var a,s;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new G(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return R}}oe.finalized=!0,oe._$litElement$=!0,null===(ae=globalThis.litElementHydrateSupport)||void 0===ae||ae.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");const re=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:a}=t;return{kind:i,elements:a,finisher(t){customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,le=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function de(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):le(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}function ce(e){return de({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const ue=({finisher:e,descriptor:t})=>(i,a)=>{var s;if(void 0===a){const a=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=t?{kind:"method",placement:"prototype",key:a,descriptor:t(i.key)}:{...i,key:a};return null!=e&&(o.finisher=function(t){e(t,a)}),o}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,a,t(a)),null==e||e(s,a)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function he(e,t){return ue({descriptor:i=>{const a={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;a.get=function(){var i,a;return void 0===this[t]&&(this[t]=null!==(a=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==a?a:null),this[t]}}return a}})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var me;null===(me=window.HTMLSlotElement)||void 0===me||me.prototype.assignedElements;const pe=(e,t)=>{if(typeof e!=typeof t)return!1;if("object"==typeof e&&"object"==typeof t&&null!==e&&null!==t){const i=[...new Set([...Object.keys(e),...Object.keys(t)])];return!!i.every(i=>Object.keys(e).includes(i)&&Object.keys(t).includes(i))&&i.every(i=>pe(e[i],t[i]))}return e===t};var _e,ge,ve,ye,fe,be,ke,we;!function(e){e.Single="single",e.Scheme="scheme"}(_e||(_e={})),function(e){e.Daily="daily",e.Workday="workday",e.Weekend="weekend",e.Monday="monday",e.Tuesday="tuesday",e.Wednesday="wednesday",e.Thursday="thursday",e.Friday="friday",e.Saturday="saturday",e.Sunday="sunday"}(ge||(ge={})),function(e){e.Or="or",e.And="and"}(ve||(ve={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(ye||(ye={})),function(e){e.Name="name",e.RelativeTime="relative-time",e.AdditionalTasks="additional-tasks",e.AdditionalTaskInfo="additional-task-info",e.Time="time",e.Days="days",e.Entity="entity",e.Action="action",e.Tags="tags",e.Default="default"}(fe||(fe={})),function(e){e.ItemCreated="scheduler_item_created",e.ItemUpdated="scheduler_item_updated",e.ItemRemoved="scheduler_item_removed",e.TimerFinished="scheduler_timer_finished",e.TimerUpdated="scheduler_timer_updated"}(be||(be={})),function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(ke||(ke={})),function(e){e.Fixed="fixed",e.Sunrise="sunrise",e.Sunset="sunset"}(we||(we={}));const xe=e=>({service:e.service,service_data:e.service_data,target:{entity_id:e.entity_id?e.entity_id:void 0}}),$e=e=>({start:e.start,stop:e.stop,actions:ze(e.actions.map(xe)),conditions:{type:"and"==e.condition_type?ve.And:ve.Or,items:e.conditions||[],track_changes:Boolean(e.track_conditions)}}),je=e=>{switch(e){case"mon":return ge.Monday;case"tue":return ge.Tuesday;case"wed":return ge.Wednesday;case"thu":return ge.Thursday;case"fri":return ge.Friday;case"sat":return ge.Saturday;case"sun":return ge.Sunday;case"workday":return ge.Workday;case"weekend":return ge.Weekend;default:return ge.Daily}},Oe=e=>Object.assign(Object.assign({},Object.fromEntries(Object.entries(e).filter(([e])=>!["slots","weekdays",""].includes(e)))),{entries:[{slots:e.timeslots.map($e),weekdays:e.weekdays.map(je)}]}),ze=e=>{if(1==e.length)return e;if(e.every(t=>pe(Object.assign(Object.assign({},t),{target:void 0}),Object.assign(Object.assign({},e[0]),{target:void 0})))){const t=[...new Set(e.map(e=>{var t;return null===(t=e.target)||void 0===t?void 0:t.entity_id}).filter(e=>void 0!==e))];return[Object.assign(Object.assign({},e[0]),{target:{entity_id:t.length?t:void 0}})]}return e},Se=e=>e.callWS({type:"scheduler"}).then(e=>e.map(Oe)),Ce=(e,t)=>{let i=t.hours||0,a=t.minutes||0;(i<0||a<0)&&(i=-Math.abs(i),a=-Math.abs(a));let s=e.hours,o=e.minutes;return s+=i,o+=a,o>=60||o>0&&s<0?(s+=1,o-=60):(o<=-60||o<0&&e.mode==we.Fixed||o<0&&s>0&&e.mode!=we.Fixed)&&(s-=1,o+=60),s<0&&e.mode==we.Fixed?s+=24:s>=24&&e.mode==we.Fixed&&(s-=24),{mode:e.mode,hours:s,minutes:o}},Ae=(e,t=1)=>{let i=3600*Math.abs(e.hours)+60*Math.abs(e.minutes)+(e.seconds||0);const a=e.hours<0||e.minutes<0?-1:1;let s=Math.floor(i/3600),o=Math.round((i-3600*s)/60);return o%t!=0&&(o=Math.round(o/t)*t),o>=60&&(s++,o-=60),a<0&&(s>0?s=-s:o=-o),Object.assign(Object.assign({},e),{hours:s,minutes:o})},Ee=e=>{if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number),i=Ae({hours:t[0],minutes:t[1],seconds:t[2]});return{mode:we.Fixed,hours:i.hours,minutes:i.minutes}}const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);if(t){let e=t[3].split(":").map(Number);const i=Ae({hours:e[0],minutes:e[1],seconds:e[2]});let a=i.hours,s=i.minutes;return"-"==t[2]&&(a>0&&(a=-a),s=-s),{mode:"sunrise"==t[1]?we.Sunrise:we.Sunset,hours:a,minutes:s}}const i=new Date(e),a=Ae({hours:i.getHours(),minutes:i.getMinutes(),seconds:i.getSeconds()});return{mode:we.Fixed,hours:a.hours,minutes:a.minutes}},Te=(e,t)=>{if("string"==typeof e&&(e=Ee(e)),e.mode==we.Fixed)return 3600*e.hours+60*e.minutes;if(e.mode==we.Sunrise){const i=Ee(t.states["sun.sun"].attributes.next_rising),a=Ce(i,e);return 3600*a.hours+60*a.minutes}{const i=Ee(t.states["sun.sun"].attributes.next_setting),a=Ce(i,e);return 3600*a.hours+60*a.minutes}};var Me,De;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Me||(Me={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(De||(De={}));const Le=e=>{if(e.time_format===De.language||e.time_format===De.system){const t=e.time_format===De.language?e.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(t).includes("10")}return e.time_format===De.am_pm};var Ne;!function(e){e.AM="AM",e.PM="PM"}(Ne||(Ne={}));const Pe=e=>({am_pm:e>=12?Ne.PM:Ne.AM,hours:e%12||12}),Ie=(e,t)=>t==Ne.AM?12==e?0:e:12==e?12:e+12,qe=(e,t={seconds:!0})=>{let i="";if(e.hours>=24&&(e.hours-=24),e.mode==we.Fixed&&t.am_pm){const a=Pe(e.hours).am_pm,s=Pe(e.hours).hours;i=String(s).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00"),i+=" "+(a===Ne.AM?"am":"pm")}else e.mode==we.Fixed?(i=String(e.hours).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00")):(i=e.mode+(e.hours<0||e.minutes<0?"-":"+")+String(Math.abs(e.hours)).padStart(2,"0")+":"+String(Math.abs(e.minutes)).padStart(2,"0"),t.seconds&&(i+=":00"));return i},Re=(e,t)=>{const i=e=>{(e=(e=e.map(e=>Object(Object.assign(Object.assign({},e),{start:Te(e.start,t)<0?"00:00:00":e.start,stop:e.stop?Te(e.stop,t)>86400?"00:00:00":e.stop:void 0})))).map(e=>{if(e.stop&&Te(e.start,t)>Te(e.stop,t)){if(0==Te(e.stop,t))return Object.assign(Object.assign({},e),{stop:qe(Ce(Ee(e.stop),{hours:24}))});e=Object.assign(Object.assign({},e),{start:e.stop,stop:e.start})}return e.stop&&Te(e.stop,t)-Te(e.start,t)<60&&(e=Object.assign(Object.assign({},e),{stop:qe(Ce(Ee(e.start),{minutes:1}))})),e})).sort((e,i)=>Te(e.start,t)>Te(i.start,t)?1:Te(e.start,t)<Te(i.start,t)?-1:Te(e.stop||e.start,t)>Te(i.stop||i.start,t)?1:-1);let i="00:00:00",a=e.length;for(let s=0;s<a;s++){const o=e[s];Te(o.start,t)>Te(i,t)?(e.splice(s,0,Object.assign(Object.assign({},o),{start:i,stop:o.start,actions:[],conditions:o.conditions})),a++,s++):Te(o.start,t)<Te(i,t)&&(e=Object.assign(e,{[s]:Object.assign(Object.assign({},o),{start:i})})),i=o.stop||o.start}return Te(i,t)<86400&&Te(i,t)>0&&e.push({start:i,stop:qe({mode:we.Fixed,hours:24,minutes:0}),actions:[],conditions:e[0].conditions}),e};return e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object(Object.assign(Object.assign({},e),{slots:i(e.slots)})))})},He={include:[],exclude:[],discover_existing:!0,title:!0,show_header_toggle:!1,time_step:15,default_editor:_e.Single,display_options:{primary_info:"default",secondary_info:["relative-time","additional-tasks"],icon:"action"},sort_by:["relative-time","state"],customize:{},tags:[],exclude_tags:[]},Ve={actions:[],conditions:{type:ve.Or,items:[],track_changes:!1}},Fe={entries:[{weekdays:[ge.Daily],slots:[Object.assign(Object.assign({},Ve),{start:"00:00:00",stop:"08:00:00"}),Object.assign(Object.assign({},Ve),{start:"08:00:00",stop:"16:00:00"}),Object.assign(Object.assign({},Ve),{start:"16:00:00",stop:"00:00:00"})]}],repeat_type:ke.Repeat,next_entries:[],timestamps:[],enabled:!0},Be=Object.assign(Object.assign({},Fe),{entries:[{weekdays:[ge.Daily],slots:[Object.assign(Object.assign({},Ve),{start:"00:00:00",stop:"12:00:00"}),Object.assign(Object.assign({},Ve),{start:"12:00:00"}),Object.assign(Object.assign({},Ve),{start:"12:01:00",stop:"00:00:00"})]}]});function Ue(e){return null!=e}const We=(e,t)=>Object.keys(e).includes(t),Ze=e=>"boolean"==typeof e,Ke=e=>"number"==typeof e,Ge=e=>"string"==typeof e,Je=e=>"object"==typeof e&&!Array.isArray(e),Ye=e=>Array.isArray(e)&&e.every(e=>"string"==typeof e),Qe=(e,t)=>Je(t)?We(t,"states")&&!(Ye(t.states)||Je(t.states)&&We(t.states,"min")&&Ke(t.states.min)&&We(t.states,"max")&&Ke(t.states.max))?`In 'customize' [${e}].states' must be a list of strings or a range of numbers`:void 0:`'In customize, ${e}' must be a struct`;var Xe={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"topení/chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"topení/chlazení[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]",set_mode:"nastavit režim[ na {mode}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},notify:{send_message:"send notification"},script:{execute:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"nastavit režim[ na {operation_mode}]",set_away_mode:"vypnout režim"}},et={alarm_control_panel:"poplašný ovládací panel",binary_sensor:"binary sensors",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"světla",lock:"zámky",media_player:"média přehrávače",notify:"notification",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},tt={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"příští {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončete úpravy",description:"Plán, který byl změněn, je aktuálně zakázán, měl by být povolen?"},confirm_delete:{title:"Odebrat entitu?",description:"Opravdu chcete tuto entitu odebrat?"},confirm_migrate:{title:"Aktualizovat plán",description:"Některá nastavení budou touto změnou ztracena. Chceš pokračovat?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Nejsou žádné položky k zobrazení",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Nejprve vyberte časový úsek",toggle_single_mode:"Do režimu jednoho",toggle_scheme_mode:"Do režimu schématu",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Období",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},it={services:Xe,domains:et,ui:tt},at=Object.freeze({__proto__:null,services:Xe,domains:et,ui:tt,default:it}),st={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"Heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"Kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool:"Heizen/Kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool_range:"Heizen/Kühlen[ auf {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"Automatisch[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]",set_fan_mode:"Lüftermodus einstellen[ auf {fan_mode}]"},cover:{close_cover:"Schließen",open_cover:"Öffnen",set_cover_position:"Position setzen[ auf {position}]",set_cover_tilt_position:"Neigungsposition setzen[ auf {tilt_position}]"},fan:{set_speed:"Geschwindigkeit setzen[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]",set_mode:"Modus setzen[ auf {mode}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"Anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},notify:{send_message:"Nachricht senden"},script:{execute:"Ausführen"},vacuum:{start_pause:"Start/Pause"},water_heater:{set_operation_mode:"Modus setzen[ auf {operation_mode}]",set_away_mode:"Abwesenheitsmodus setzen"}},ot={alarm_control_panel:"Alarmzentrale",binary_sensor:"Binärsensor",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppe",humidifier:"Befeuchter",input_boolean:"Eingabe-Boolean",input_number:"Eingabe-Nummer",input_select:"Eingabe-Auswahl",lawn_mower:"Rasenmäher",light:"Licht",lock:"Schloss",media_player:"Medienplayer",notify:"Benachrichtigung",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},nt={components:{date:{day_types_short:{daily:"Täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"Morgen",repeated_days:"Jeden {days}",repeated_days_except:"Täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}",next_week_day:"nächsten {weekday}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"zum Mittag",at_sun_event:"beim {sunEvent}"}},dialog:{enable_schedule:{title:"Modifikationen beenden",description:"Der geänderte Zeitplan ist derzeit deaktiviert, soll er aktiviert werden?"},confirm_delete:{title:"Entität entfernen?",description:"Bist du dir sicher, dass du diese Entität löschen möchtest?"},confirm_migrate:{title:"Zeitplan ändern",description:"Einige Einstellungen gehen durch diese Änderung verloren. Möchtest du fortfahren?"},weekday_picker:{title:"Wiederholungen für den Zeitplan",choose:"Auswahl..."},entity_picker:{title:"Entitäten auswählen",choose:"Auswahl...",no_results:"Keine passenden Elemente gefunden"},action_picker:{title:"Aktion auswählen"}},panel:{common:{title:"Zeitplaner",new_schedule:"Neuer Zeitplan",default_name:"Zeitplan #{id}"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",backend_error:"Es konnte keine Verbindung mit der Scheduler-Komponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",excluded_items:"{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Wiederholen",start_time:"Startzeit",stop_time:"Endzeit",action:"Aktion",add_action:"Aktion hinzufügen",select_timeslot:"Wähle ein Zeitfenster aus",toggle_single_mode:"Zum Einzelmodus",toggle_scheme_mode:"Zum Schemamodus",validation_errors:{overlapping_time:"Der Zeitplan weist Überschneidungen auf.",missing_target_entity:"Bei einer oder mehreren Aktionen fehlt eine Zielentität.",missing_service_parameter:"Bei einer oder mehreren Aktionen fehlt eine erforderliche Einstellung.",missing_action:"Zeitplan enthält keine Aktionen"}},options:{conditions:{header:"Bedingungen",add_condition:"Bedingung hinzufügen",new_condition:"Neuer Zustand",types:{equal_to:"{entity} ist {value}",unequal_to:"{entity} ist nicht {value}",above:"{entity} ist über {value}",below:"{entity} ist unter {value}"},options:{logic_and:"Alle Bedingungen müssen zutreffen.",logic_or:"Eine Bedingung muss zutreffen.",track_changes:"Erneut prüfen wenn sich die Zustände ändern"}},period:{header:"Zeitraum",start_date:"Von",end_date:"Bis"},repeat_type:"Verhalten nach Abschluss",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},rt={services:st,domains:ot,ui:nt},lt=Object.freeze({__proto__:null,services:st,domains:ot,ui:nt,default:rt}),dt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"heat/cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heat/cool[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_percentage:"set speed[ to {percentage}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"set mode[ to {mode}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},notify:{send_message:"send notification"},script:{execute:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"set mode[ to {operation_mode}]",set_away_mode:"set away mode"}},ct={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"lights",lock:"locks",media_player:"media players",notify:"notification",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},ut={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"next {weekday}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},dialog:{enable_schedule:{title:"Complete modifications",description:"The schedule you have changed is currently disabled, do you want to enable it?"},confirm_delete:{title:"Remove entity?",description:"Are you sure you want to remove this entity?"},confirm_migrate:{title:"Update schedule",description:"Some settings will be lost by this change. Do you want to continue?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Scheduler",new_schedule:"New schedule",default_name:"Schedule #{id}"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Period",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"},card_editor:{tabs:{entities:"Entities",other:"Other"},fields:{title:{heading:"Title of the card",options:{standard:"standard",hidden:"hidden",custom:"custom"},custom_title:"Custom title"},discover_existing:{heading:"Show all schedules",description:"This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "},time_step:{heading:"Time step",description:"Resolution (in minutes) for creating schedules",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Single schedule mode",scheme:"Time scheme mode"}},sort_by:{heading:"Sorting options",description:"Order in which the schedules appear in the card",options:{relative_time:"Time remaining until next action",title:"Displayed title of the schedule",state:"Show active schedules on top"}},display_format_primary:{heading:"Displayed primary info",description:"Configure which label is used for schedules in the overview",options:{default:"Schedule name",entity_action:"Summary of task"}},display_format_secondary:{heading:"Displayed secondary info",description:"Configure what additional properties are visible in the overview",options:{relative_time:"Time remaining until next action",time:"Configured time for next action",days:"Repeated days of the week",additional_tasks:"Number of additional tasks",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Show header toggle",description:"Show toggle switch at the top of the card for enabling/disabling all entities"},tags:{heading:"Tags",description:"Use tags to divide schedules between multiple cards"},entities:{button_label:"Configure included entities",heading:"Included entities",description:"Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",included_number:"{number}/{total} selected"}}}}},ht={services:dt,domains:ct,ui:ut},mt=Object.freeze({__proto__:null,services:dt,domains:ct,ui:ut,default:ht}),pt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción[ a {temperature}]",set_temperature_hvac_mode_cool:"frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"calefacción/frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"calefacción/frío[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automático[ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición[ a {position}]",set_cover_tilt_position:"establecer inclinación[ a {tilt_position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]",set_mode:"establecer modo[ a {mode}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},notify:{send_message:"enviar notificación"},script:{execute:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"establecer modo[ a {operation_mode}]",set_away_mode:"establecer modo fuera de casa"}},_t={alarm_control_panel:"panel de control de alarma",binary_sensor:"binary sensors",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luces",lock:"cerraduras",media_player:"reproductores",notify:"notification",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},gt={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},dialog:{enable_schedule:{title:"Completa las modificaciones",description:"El horario que se ha cambiado está actualmente deshabilitado, ¿debería habilitarse?"},confirm_delete:{title:"¿Eliminar entidad?",description:"¿Estás seguro de que deseas eliminar esta entidad?"},confirm_migrate:{title:"Modificar horario",description:"Algunas configuraciones se perderán con este cambio. Quieres proceder?"},weekday_picker:{title:"Días repetidos para el horario",choose:"Elegir..."},entity_picker:{title:"Elegir entidades",choose:"Elegir...",no_results:"No se encontraron artículos coincidentes"},action_picker:{title:"Elige Acción"}},panel:{common:{title:"Programador",new_schedule:"Nuevo horario",default_name:"Horario #{id}"},overview:{no_entries:"No hay ningún elemento que mostrar",backend_error:"Fallo de conexión con Scheduler component. Debe ser installado como integración antes de poder usar este panel.",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales",additional_task_info:{no_action:"Sin acción configurada"}},editor:{repeated_days:"Días repetidos",start_time:"Inicio",stop_time:"Finalización",action:"Acción",add_action:"Agregar acción",select_timeslot:"selecciona un bloque de tiempo",toggle_single_mode:"Al modo simple",toggle_scheme_mode:"Al modo esquema",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Condiciones",add_condition:"Agregar condición",new_condition:"Nueva condición",types:{equal_to:"{entity} es igual a {value}",unequal_to:"{entity} es desigual a {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"Todas condiciones deben ser válidas",logic_or:"Cualquier condición debe ser válida",track_changes:"Reevaluar si una condición cambia"}},period:{header:"Período",start_date:"De",end_date:"A"},repeat_type:"acción después de la finalización",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Información extra de tareas adicionales"}}}}}},vt={services:pt,domains:_t,ui:gt},yt=Object.freeze({__proto__:null,services:pt,domains:_t,ui:gt,default:vt}),ft={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_temperature_hvac_mode_heat_cool:"küte/jahutus[ @ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"küte/jahutus[ @ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatne[ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]",set_cover_tilt_position:"sea ribide kalle [ asendisse {tilt_position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]",set_mode:"vali režiim [{mode}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},notify:{send_message:"send notification"},script:{execute:"käivita"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_operation_mode:"vali režiim [{operation_mode}]",set_away_mode:"kodust ära"}},bt={alarm_control_panel:"valvepaneel",binary_sensor:"binary sensors",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",lawn_mower:"lawn mower",light:"valgustid",lock:"lukud",media_player:"meediamängijad",notify:"notification",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},kt={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}",next_week_day:"järgmisel {weekday}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Viige muudatused lõpule",description:"Muudetud ajakava on praegu keelatud, kas see peaks olema lubatud?"},confirm_delete:{title:"Kas eemaldan olemi?",description:"Oled kindel, et soovid selle olemi eemaldada?"},confirm_migrate:{title:"Muutke ajakava",description:"Selle muudatusega lähevad mõned seaded kaotsi. Kas soovite jätkata?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastaja",new_schedule:"Uus ajakava",default_name:"Ajakava #{id}"},overview:{no_entries:"Ajastused puuduvad",backend_error:"Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Alustuseks vali ajavahemik",toggle_single_mode:"Üksikrežiimile",toggle_scheme_mode:"Skeemirežiimile",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periood",start_date:"From",end_date:"To"},repeat_type:"toiming peale käivitumist",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},wt={services:ft,domains:bt,ui:kt},xt=Object.freeze({__proto__:null,services:ft,domains:bt,ui:kt,default:wt}),$t={generic:{parameter_to_value:"{parameter} {value}",action_with_parameter:"{action} {parameter}"},climate:{set_temperature:"aseta lämpötilaksi[ {temperature}]",set_temperature_hvac_mode_heat:"lämmitä[ {temperature} asteeseen]",set_temperature_hvac_mode_cool:"jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool:"lämmitä/jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool_range:"lämmitä/jäähdytä[ välillä {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatilla[ {temperature} asteeseen]",set_hvac_mode:"aseta tilaksi[ {hvac_mode}]",set_preset_mode:"aseta esivalinta[ {preset_mode}]",set_fan_mode:"aseta tuuletus[ {fan_mode}]"},cover:{close_cover:"sulje",open_cover:"avaa",set_cover_position:"aseta sijainniksi[ {position}]",set_cover_tilt_position:"aseta kallistus[ {tilt_position}]"},fan:{set_speed:"aseta nopeus[ {speed}]",set_direction:"asenta suunta[ {direction}]",oscillate:"aseta pyörimisnopeus[ {oscillate}]"},humidifier:{set_humidity:"aseta kosteus[ {humidity}]",set_mode:"aseta tilaksi {mode}"},input_number:{set_value:"aseta arvo {value}"},input_select:{select_option:"valitse[ {option}]"},select:{select_option:"valitse[ {option}]"},light:{turn_on:"kytke päälle[ {brightness} kirkkaudella]"},media_player:{select_source:"valitse lähteeksi[ {source}]"},notify:{send_message:"lähetä ilmoitus"},script:{execute:"suorita"},vacuum:{start_pause:"aloita / keskeytä"},water_heater:{set_operation_mode:"aseta tilaksi[ {operation_mode}]",set_away_mode:"aseta poissa-tila"}},jt={alarm_control_panel:"hälytyspaneeli",binary_sensor:"binary sensor",climate:"ilmastointi",cover:"kaihdin/tallin ovi",fan:"tuuletin",group:"ryhmä",humidifier:"ilmankosteuttimet",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"valaisin",lock:"lukko",media_player:"mediatoistin",notify:"ilmoitus",switch:"kytkin",vacuum:"imuri",water_heater:"vedenlämmitin"},Ot={components:{date:{day_types_short:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},day_types_long:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},days:"päivää",tomorrow:"huomenna",repeated_days:"joka {days}",repeated_days_except:"joka päivä paitsi {excludedDays}",days_range:"{startDay} {endDay}",next_week_day:"seuraava {weekday}"},time:{absolute:"{time}",interval:"{startTime} - {endTime}",at_midnight:"keskiyöllä",at_noon:"keskipäivällä",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Suorita muutokset loppuun",description:"Muutettu aikataulu on tällä hetkellä poissa käytöstä, pitäisikö se ottaa käyttöön?"},confirm_delete:{title:"Poistetaanko kohde?",description:"Haluatko varmasti poistaa tämän kohteen?"},confirm_migrate:{title:"Muokkaa aikataulua",description:"Jotkut asetukset menetetään tämän muutoksen seurauksena. Haluatko edetä?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastin",new_schedule:"Uusi aikataulu",default_name:"Aikataulu #{id}"},overview:{no_entries:"Ei näytettäviä kohteita",backend_error:"Ei voitu yhdistää scheduler komponenttiin. Kortin käyttäminen vaatii scheduler integraation asentamisen.",excluded_items:"{number} {if number is 1} poissuljettu kohde {else} poissuljettua kohdetta",hide_excluded:"piilota poissuljetut kohteet",additional_tasks:"{number} {if number is 1} tehtävä {else} tehtävää",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Valitse aikaikkuna ensin",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Ajanjakso",start_date:"From",end_date:"To"},repeat_type:"toiminta tapahtuman jälkeen",tags:"Tags"},card_editor:{tabs:{entities:"Kohteet",other:"Muu"},fields:{title:{heading:"Kortin otsikko",options:{standard:"normaali",hidden:"piilotettu",custom:"muokattu"},custom_title:"Muokattu otsikko"},discover_existing:{heading:"Näytä kaikki ajoitukset",description:"Tämä kytkee käyttöön 'näytä olemassa olevat -attribuutin'. Aiemmin luodut ajastukset lisätään automaattisesti korttiin. "},time_step:{heading:"Ajastusvälit",description:"Ajastusväli minuutteina ajastusten luontiin",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Yksittäistilaan",scheme:"Kaaviotilaan"}},sort_by:{heading:"Lajitteluasetukset",description:"Järjestys miten ajastukset näkyvät kortissa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",title:"Ajastuksen otsikko",state:"Aktiiviset ajastukset ylhäällä"}},display_format_primary:{heading:"Ensisijainen tieto",description:"Valitse mitä näytetään yhteenvedossa",options:{default:"Ajastuksen nimi",entity_action:"Ajastuksen yhteenveto"}},display_format_secondary:{heading:"Toissijainen tieto",description:"Valitse mitkä lisätiedot näkyvät yhteenvedossa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",time:"Seuraavalle toiminnolle määritetty aika",days:"Toistuvat viikonpäivät",additional_tasks:"Lisätoimintojen määrä",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Näytä otsikkokytkin",description:"Näytä kytkin kortin yläreunassa usean ajastuksen päälle/pois kytkemiseen"},tags:{heading:"Tunniste",description:"Käytä tunnisteita ajastusten jakamiseen korttien välillä"},entities:{button_label:"Sisällytettyjen entiteettien määrittäminen",heading:"Ajastettavat kohteet",description:"Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",included_number:"{number} / {total} valittu"}}}}},zt={services:$t,domains:jt,ui:Ot},St=Object.freeze({__proto__:null,services:$t,domains:jt,ui:Ot,default:zt}),Ct={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool:"chauffe/refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool_range:"chauffe/refroidit[ à {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]",set_fan_mode:"ajuster le mode de ventilation[ à {fan_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]",set_cover_tilt_position:"régler les volets[ à {tilt_position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]",set_mode:"ajuster le mode[ à {mode}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},notify:{send_message:"envoyer une notification"},script:{execute:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_operation_mode:"ajuster le mode[ à {operation_mode}]",set_away_mode:"choisir le mode absent"}},At={alarm_control_panel:"panneau de contrôle de l'alarme",binary_sensor:"capteurs binaires",climate:"thermostat",cover:"volet",fan:"ventilateur",group:"groupe",humidifier:"humidificateur",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",lawn_mower:"tondeuse",light:"lumière",lock:"serrure",media_player:"lecteur multimédia",notify:"notification",switch:"interrupteur",vacuum:"aspirateur",water_heater:"chauffe eau"},Et={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}",next_week_day:"{weekday} prochain"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},dialog:{enable_schedule:{title:"Compléter les modifications",description:"Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"},confirm_delete:{title:"Supprimer l'entité ?",description:"Voulez-vous vraiment supprimer cette entité ?"},confirm_migrate:{title:"Modifier l'horaire",description:"Certains paramètres seront perdus par ce changement. Voulez-vous poursuivre?"},weekday_picker:{title:"Jours de répétition",choose:"Choisir les jours..."},entity_picker:{title:"Choisir les entités",choose:"Choisir...",no_results:"Aucune entité trouvée"},action_picker:{title:"Choisir une action"}},panel:{common:{title:"Planificateur",new_schedule:"Nouvel horaire",default_name:"Horaire #{id}"},overview:{no_entries:"il n'y a pas d'entrée à montrer",backend_error:"Impossible de se connecter au composant du planificateur. Il doit être installé en tant qu'intégration avant que cette carte ne puisse être utilisée.",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Jours de répétition",start_time:"Heure de début",stop_time:"Heure de fin",action:"Action",add_action:"Ajouter une action",select_timeslot:"Choisir d'abord une plage horaire",toggle_single_mode:"Vers mode simple",toggle_scheme_mode:"Vers mode schéma",validation_errors:{overlapping_time:"Certaines plages horaires se chevauchent",missing_target_entity:"Certaines actions n'ont pas d'entité sélectionnée",missing_service_parameter:"Certaines actions ne sont pas totalement configurées",missing_action:"Le planning n'a aucune action définie"}},options:{conditions:{header:"Conditions",add_condition:"Ajouter une condition",new_condition:"Nouvelle condition",types:{equal_to:"{entity} est égal à {value}",unequal_to:"{entity} n'est pas égal à {value}",above:"{entity} est supérieur à {value}",below:"{entity} est inférieur à {value}"},options:{logic_and:"Toutes les conditions doivent être valides",logic_or:"Au moins une condition doit être valide",track_changes:"Ré-évaluer lorsque la condition change"}},period:{header:"Période",start_date:"Du",end_date:"Au"},repeat_type:"Comportement après l'achèvement",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Tt={services:Ct,domains:At,ui:Et},Mt=Object.freeze({__proto__:null,services:Ct,domains:At,ui:Et,default:Tt}),Dt={generic:{parameter_to_value:"{parameter} ל {value}",action_with_parameter:"{action} עם {parameter}"},climate:{set_temperature:"קבע טמפרטורה[ ל {temperature}]",set_temperature_hvac_mode_heat:"חימום[ ל {temperature}]",set_temperature_hvac_mode_cool:"קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool:"חימום/קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool_range:"חימום/קירור[ ל {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"אוטומטי[ ל {temperature}]",set_hvac_mode:"קבע מצב עבודה[ ל {hvac_mode}]",set_preset_mode:"קבע הגדרה[ ל {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"סגירה",open_cover:"פתיחה",set_cover_position:"קבע מיקום[ ל {position}]",set_cover_tilt_position:"קבע הטיה[ ל {tilt_position}]"},fan:{set_speed:"קבע מהירות[ ל {speed}]",set_direction:"קבע כיוון[ ל {direction}]",oscillate:"קבע תנודה[ ל {oscillate}]"},humidifier:{set_humidity:"קבע לחות[ ל {humidity}]",set_mode:"קבע מצב עבודה[ ל {mode}]"},input_number:{set_value:"קבע ערך[ ל {value}]"},input_select:{select_option:"בחר אפשרות[ {option}]"},select:{select_option:"בחר אפשרות[ {option}]"},light:{turn_on:"הדלקה[ בעוצמה של {brightness}]"},media_player:{select_source:"select source[ {source}]"},notify:{send_message:"send notification"},script:{execute:"בצע"},vacuum:{start_pause:"התחל / הפסק"},water_heater:{set_operation_mode:"קבע מצב עבודה[ ל {operation_mode}]",set_away_mode:"קבע מצב מוץ לבית"}},Lt={alarm_control_panel:"בקרת אזעקה",binary_sensor:"binary sensors",climate:"מזג אוויר",cover:"תריסים",fan:"מאווררים",group:"קבוצות יישויות",humidifier:"מכשירי אדים",input_boolean:"כניסה בוליאנית",input_number:"כניסה מספרית",input_select:"בחירת כניסה",lawn_mower:"lawn mower",light:"תאורה",lock:"מנעולים",media_player:"נגני מדיה",notify:"notification",switch:"מפסקים",vacuum:"שואבי אבק",water_heater:"מחממי מים"},Nt={components:{date:{day_types_short:{daily:"כל יום",workdays:"ימי חול",weekend:"סוף שבוע"},day_types_long:{daily:"כל יום",workdays:"בימי חול",weekend:"בסוף השבוע"},days:"ימים",tomorrow:"מחר",repeated_days:"בכל {days}",repeated_days_except:"בכל יום פרט ל  {excludedDays}",days_range:"מ- {startDay} ועד- {endDay}",next_week_day:"הבא {weekday}"},time:{absolute:"בשעה {time}",interval:"משעה {startTime} עד שעה {endTime}",at_midnight:"בחצות הלילה",at_noon:"בחצות היום",at_sun_event:"ב {sunEvent}"}},dialog:{enable_schedule:{title:"השלם את השינויים",description:"לוח הזמנים ששונה מושבת כעת, האם צריך להפעיל אותו?"},confirm_delete:{title:"להסיר את הישות?",description:"האם בוודאות ברצונך להסיר ישות זו?"},confirm_migrate:{title:"שנה את לוח הזמנים",description:"חלק מההגדרות יאבדו על ידי פעולה זו. האם אתה רוצה להמשיך?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"לוח זמנים",new_schedule:"לוח זמנים חדש",default_name:"לוח זמנים #{id}"},overview:{no_entries:"אין פריטים להצגה",backend_error:"אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",excluded_items:"{number} לא נכלל {if number is 1} פריט {else} פריטים",hide_excluded:"הסתר פריטים לא כלולים",additional_tasks:"{number} נוסף {if number is 1} משימה {else} משימות",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"בחר משבצת זמן קודם",toggle_single_mode:"למצב פשוט",toggle_scheme_mode:"למצב דיאגרמה",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"פרק זמן",start_date:"From",end_date:"To"},repeat_type:"התנהגות לאחר הפעלה",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Pt={services:Dt,domains:Lt,ui:Nt},It=Object.freeze({__proto__:null,services:Dt,domains:Lt,ui:Nt,default:Pt}),qt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"melegíteni[ to {temperature}]",set_temperature_hvac_mode_cool:"hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"melegíteni/hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"melegíteni/hűtés[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatikus[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"mód beállítása[ to {mode}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},notify:{send_message:"send notification"},script:{execute:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"mód beállítása[ to {operation_mode}]",set_away_mode:"set away mode"}},Rt={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",lawn_mower:"lawn mower",light:"lámpa",lock:"locks",media_player:"lejátszó",notify:"notification",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},Ht={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"következő {weekday}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},dialog:{enable_schedule:{title:"Végezze el a módosításokat",description:"A módosított ütemezés jelenleg le van tiltva, engedélyezni kell?"},confirm_delete:{title:"Biztos benne, hogy eltávolítja az entitást?",description:"Biztos benne, hogy el szeretné távolítani ezt az entitást?"},confirm_migrate:{title:"Ütemezés módosítása",description:"Ezzel a művelettel bizonyos beállítások elvesznek. Akarod folytatni?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Időzítések",new_schedule:"Új ütemezés",default_name:"Ütemterv #{id}"},overview:{no_entries:"Nincs megjeleníthető elem",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",toggle_single_mode:"Egyszerű módba",toggle_scheme_mode:"Diagram módba",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Időszak",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Vt={services:qt,domains:Rt,ui:Ht},Ft=Object.freeze({__proto__:null,services:qt,domains:Rt,ui:Ht,default:Vt}),Bt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"riscaldamento/raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"riscaldamento/raffrescamento[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]",set_cover_tilt_position:"imposta inclinazione[ su {tilt_position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]",set_mode:"imposta modalità[ a {mode}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},notify:{send_message:"invia notifica"},script:{execute:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_operation_mode:"imposta modalità[ a {operation_mode}]",set_away_mode:"imposta fuori casa"}},Ut={alarm_control_panel:"pannello di controllo allarme",binary_sensor:"binary sensors",climate:"clima",cover:"serrande",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input booleani",input_number:"input numerici",input_select:"input select",lawn_mower:"lawn mower",light:"luci",lock:"lucchetti",media_player:"media player",notify:"notification",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},Wt={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"giorni",tomorrow:"domani",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",next_week_day:"prossimo {weekday}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},dialog:{enable_schedule:{title:"Completa le modifiche",description:"La pianificazione modificata è attualmente disabilitata, dovrebbe essere abilitata?"},confirm_delete:{title:"Vuoi rimuovere l'entità?",description:"Sei sicuro di voler rimuovere questa entità?"},confirm_migrate:{title:"Modifica orario",description:"Alcune impostazioni andranno perse con questa azione. Vuoi procedere?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Schedulatore",new_schedule:"Nuovo orario",default_name:"Orario #{id}"},overview:{no_entries:"Non ci sono oggetti da visualizzare",backend_error:"Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Seleziona una fascia oraria",toggle_single_mode:"Alla modo semplice",toggle_scheme_mode:"Alla modo schema",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periodo",start_date:"From",end_date:"To"},repeat_type:"comportamento dopo il completamento",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Zt={services:Bt,domains:Ut,ui:Wt},Kt=Object.freeze({__proto__:null,services:Bt,domains:Ut,ui:Wt,default:Zt}),Gt={generic:{parameter_to_value:"{parameter} uz {value}",action_with_parameter:"{action} ar {parameter}"},climate:{set_temperature:"uzstādīt temperatūru[ uz {temperature}]",set_temperature_hvac_mode_heat:"sildīt[ līdz {temperature}]",set_temperature_hvac_mode_cool:"atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool:"sildīt/atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool_range:"sildīt/atdzesēt[ uz {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ uz {temperature}]",set_hvac_mode:"iestatīt[ uz {hvac_mode}]",set_preset_mode:"iestatīt režīmu[ uz {preset_mode}]",set_fan_mode:"iestatīt ventilatora režīmu[ uz {fan_mode}]"},cover:{close_cover:"aizvērt",open_cover:"atvērt",set_cover_position:"uzstādīt pozīciju[ uz {position}]",set_cover_tilt_position:"uzstādīt slīpuma stāvokli[ uz {tilt_position}]"},fan:{set_speed:"iestatīt ātrumu[ uz {speed}]",set_direction:"iestatīt virzienu[ uz {direction}]",oscillate:"iestatīt oscilāciju[ uz {oscillate}]"},humidifier:{set_humidity:"iestatīt mitrumu[ uz {humidity}]",set_mode:"iestatīt režīmu[ uz {mode}]"},input_number:{set_value:"iestatīt vērtību[ uz {value}]"},input_select:{select_option:"izvēlēties opciju[ {option}]"},select:{select_option:"izvēlēties opciju[ {option}]"},light:{turn_on:"ieslēgt[ ar {brightness} spilgtumu]"},media_player:{select_source:"izvēlēties avotu[ {source}]"},notify:{send_message:"nosūtīt paziņojumu"},script:{execute:"izpildīt"},vacuum:{start_pause:"sākt / pauze"},water_heater:{set_operation_mode:"iestatīt režīmu[ uz {operation_mode}]",set_away_mode:"iestatīt prombūtnes režīmu"}},Jt={alarm_control_panel:"trauksmes kontroles panelis",binary_sensor:"binārie sensori",climate:"klimats",cover:"pārsegi",fan:"ventilatori",group:"vienību grupas",humidifier:"mitrinātāji",input_boolean:"ievades binārais lauks",input_number:"ievades numurs",input_select:"ievades izvēle",lawn_mower:"lawn mower",light:"gaismas",lock:"slēdzene",media_player:"multivides atskaņotāji",notify:"paziņojums",switch:"slēdži",vacuum:"putekļu sūcēji",water_heater:"ūdens sildītāji"},Yt={components:{date:{day_types_short:{daily:"ikdienišķs",workdays:"darba dienas",weekend:"nedēļas nogale"},day_types_long:{daily:"katru dienu",workdays:"darba dienās",weekend:"nedēļas nogalē"},days:"dienas",tomorrow:"rītdiena",repeated_days:"katras {days}",repeated_days_except:"katru dienu, izņemot {excludedDays}",days_range:"no {startDay} līdz {endDay}",next_week_day:"nākošo {weekday}"},time:{absolute:"kad {time}",interval:"no {startTime} līdz {endTime}",at_midnight:"kad midnight",at_noon:"kad noon",at_sun_event:"kad {sunEvent}"}},dialog:{enable_schedule:{title:"Pabeigt modificēšanu",description:"Izmainītais grafiks pašlaik ir atspējots, vai vēlaties to iespējot?"},confirm_delete:{title:"Vai dzēst vienību?",description:"Vai tiešām vēlaties dzēst šo vienību?"},confirm_migrate:{title:"Atjaunināt grafiku",description:"Šīs izmaiņas rezultātā daži iestatījumi tiks zaudēti. Vai vēlaties turpināt?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plānotājs",new_schedule:"Jauns grafiks",default_name:"Grafiks #{id}"},overview:{no_entries:"Nav parādāmu vienību",backend_error:"Nevar izveidot savienojumu ar plānotāja komponenti. Pirms šīs kartes izmantošanas tā ir jāinstalē kā integrācija.",excluded_items:"{number} izslēgtas {if number is 1} vienība {else} vienības",hide_excluded:"paslēpt izslēgtās vienības",additional_tasks:"{number} papildu {if number is 1} uzdevums {else} uzdevumi",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Vispirms izvēlieties laika slotu",toggle_single_mode:"Uz vienkāršo režīmu",toggle_scheme_mode:"Uz shēmas režīmu",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Pārvērtēt, kad mainās nosacījumi"}},period:{header:"Periods",start_date:"From",end_date:"To"},repeat_type:"uzvedība pēc beigām",tags:"Tags"},card_editor:{tabs:{entities:"Vienības",other:"Cits"},fields:{title:{heading:"Kartes nosaukums",options:{standard:"standarta",hidden:"paslēpts",custom:"pielāgots"},custom_title:"Pielāgots nosaukums"},discover_existing:{heading:"Rādīt visus grafikus",description:"Šis iestata 'atklāt esošo' parametru. Iepriekš izveidotie grafiki automātiski tiks pievienoti kartei."},time_step:{heading:"Laika solis",description:"Izšķirtspēja (minūtēs) grafiku izveidei",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"Single schedule mode",scheme:"Time scheme mode"}},sort_by:{heading:"Kārtošanas opcijas",description:"Kārtība, kādā grafiki parādās kartē",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",title:"Grafika nosaukums",state:"Rādīt aktīvos grafikus augšā"}},display_format_primary:{heading:"Rādītā primārā informācija",description:"Konfigurējiet, kura informācija tiek izmantota grafiku pārskatā",options:{default:"Grafika nosaukums",entity_action:"Uzdevuma kopsavilkums"}},display_format_secondary:{heading:"Rādītā sekundārā informācija",description:"Konfigurējiet, kuras papildu īpašības ir redzamas pārskatā",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",time:"Konfigurētais laiks nākamajai darbībai",days:"Atkārtotas nedēļas dienas",additional_tasks:"Papildu uzdevumu skaits",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Rādīt galvenes pārslēgšanu",description:"Rādīt pārslēgšanas slēdzi kartes augšdaļā, lai iespējotu/atspējotu visas vienības"},tags:{heading:"Tagi",description:"Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"},entities:{button_label:"Iekļauto elementu konfigurēšana",heading:"Iekļautās vienības",description:"Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",included_number:"{number}/{total} izvēlēts"}}}}},Qt={services:Gt,domains:Jt,ui:Yt},Xt=Object.freeze({__proto__:null,services:Gt,domains:Jt,ui:Yt,default:Qt}),ei={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool:"verwarmen/koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool_range:"verwarmen/koelen[ naar {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen",set_fan_mode:"ventilatiemodus aanpassen[ naar {fan_mode}]"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]",set_cover_tilt_position:"hellingshoek instellen[ naar {tilt_position}]"},fan:{set_percentage:"snelheid instellen[ op {percentage}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]",set_mode:"modus aanpassen[ naar {mode}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},notify:{send_message:"notificatie sturen"},script:{execute:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_operation_mode:"modus aanpassen[ naar {operation_mode}]",set_away_mode:"stel afwezigheidsmode in"}},ti={alarm_control_panel:"alarmsystemen",binary_sensor:"binaire sensoren",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",lawn_mower:"lawn mower",light:"verlichting",lock:"sloten",media_player:"mediaspelers",notify:"notificatie",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},ii={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}",next_week_day:"volgende week {weekday}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},dialog:{enable_schedule:{title:"Wijzigingen voltooid",description:"Deze planning is momenteel gedeactiveerd. Dient deze te worden ingeschakeld?"},confirm_delete:{title:"Entiteit verwijderen?",description:"Weet je zeker dat je dit item wilt verwijderen?"},confirm_migrate:{title:"Schema bijwerken",description:"Door deze actie gaan vorige instellingen verloren. Wil je doorgaan?"},weekday_picker:{title:"Herhaalde dagen voor tijdschema",choose:"Kies..."},entity_picker:{title:"Kies entiteiten",choose:"Kies...",no_results:"Geen overeenkomstige items gevonden"},action_picker:{title:"Kies actie"}},panel:{common:{title:"Tijdplanner",new_schedule:"Nieuw schema",default_name:"Schema #{id}"},overview:{no_entries:"Er zijn geen items aangemaakt",backend_error:"Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Herhaling",start_time:"Starttijd",stop_time:"Eindtijd",action:"Actie",add_action:"Actie toevoegen",select_timeslot:"Selecteer een tijdslot...",toggle_single_mode:"Naar enkele modus",toggle_scheme_mode:"Naar schema modus",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Condities",add_condition:"Conditie toevoegen",new_condition:"Nieuwe conditie",types:{equal_to:"{entity} is gelijk aan {value}",unequal_to:"{entity} is ongelijk aan {value}",above:"{entity} is hoger dan {value}",below:"{entity} is lager dan {value}"},options:{logic_and:"Alle condities moeten zijn voldaan",logic_or:"Een van de condities moet zijn voldaan",track_changes:"Herevalueer als de condities veranderen"}},period:{header:"Periode",start_date:"Vanaf",end_date:"Tot"},repeat_type:"Gedrag na voltooiing",tags:"Tags"},card_editor:{tabs:{entities:"Entiteiten",other:"Overig"},fields:{title:{heading:"Titel van de kaart",options:{standard:"standaard",hidden:"verborgen",custom:"anders"},custom_title:"Eigen titel"},discover_existing:{heading:"Alle schema's tonen",description:"Hiermee wordt de 'discover existing' instelling geactiveerd. Eerder aangemaakte schema's zullen automatisch worden weergegeven."},time_step:{heading:"Stapgrootte voor tijd",description:"Resolutie (in minuten)",unit_minutes:"min"},default_editor:{heading:"Standaardmodus voor tijdsinvoer",options:{single:"Enkele modus",scheme:"Tijdschema-modus"}},sort_by:{heading:"Sorteer-opties",description:"Volgorde waarin de schema's worden weergegeven in de kaart",options:{relative_time:"Resterende tijd tot volgende actie",title:"Weergegeven titel van de schema's",state:"Actieve schema's eerst"}},display_format_primary:{heading:"Weergegeven primaire info",description:"Kies welk label wordt gebruikt in de weergave",options:{default:"Schema naam",entity_action:"Samenvatting van de actie"}},display_format_secondary:{heading:"Weergegeven secondaire info",description:"Kies welke aanvullende informatie zichtbaar is in de weergave",options:{relative_time:"Resterende tijd tot volgende actie",time:"Ingestelde tijd voor de volgende actie",days:"Herhaalde dagen van de week",additional_tasks:"Aantal resterende acties",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Hoofdschakelaar weergeven",description:"Schakelaar weergeven bovenin de kaart om alle schema's te (de)activeren"},tags:{heading:"Tags",description:"Tags kunnen gebruikt worden om schema's te verdelen over meerdere kaarten"},entities:{button_label:"Configureer zichtbare entiteiten",heading:"Zichtbare entiteiten",description:"Kies de entiteiten die je wilt bedienen vanuit schema's. Klik op een categorie om deze te openen. Merk op dat sommige entiteiten gebruikt worden om condities toe te wijzen.",included_number:"{number}/{total} geselecteerd"}}}}},ai={services:ei,domains:ti,ui:ii},si=Object.freeze({__proto__:null,services:ei,domains:ti,ui:ii,default:ai}),oi={generic:{parameter_to_value:"{parameter} til {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat:"oppvarming[ til {temperature}]",set_temperature_hvac_mode_cool:"kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool:"oppvarming/kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool_range:"oppvarming/kjøling[ til {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ til {temperature}]",set_hvac_mode:"sett modus[ til {hvac_mode}]",set_preset_mode:"sett forhåndsvalg[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ til {position}]",set_cover_tilt_position:"sett vippestilling[ til {tilt_position}]"},fan:{set_speed:"sett hastighet[ til {speed}]",set_direction:"sett retning[ til {direction}]",oscillate:"sett svingning[ til {oscillate}]"},humidifier:{set_humidity:"sett luftfuktighet[ til {humidity}]",set_mode:"sett modus[ til {mode}]"},input_number:{set_value:"sett verdi[ til {value}]"},input_select:{select_option:"velg[ {option}]"},select:{select_option:"velg[ {option}]"},light:{turn_on:"slå på[ med {brightness} lysstyrke]"},media_player:{select_source:"velg kilde[ {source}]"},notify:{send_message:"send notifikasjon"},script:{execute:"utfør"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"sett modus[ til {operation_mode}]",set_away_mode:"sett bortemodus"}},ni={alarm_control_panel:"alarmpanel",binary_sensor:"binary sensors",climate:"klima",cover:"solskjerming",fan:"vifter",group:"grupper",humidifier:"luftfuktere",input_boolean:"input boolsk",input_number:"input nummer",input_select:"input valg",lawn_mower:"lawn mower",light:"lys",lock:"låser",media_player:"mediaspillere",notify:"notification",switch:"brytere",vacuum:"støvsugere",water_heater:"varmtvannsberedere"},ri={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},days:"Dager",tomorrow:"imorgen",repeated_days:"hver {days}",repeated_days_except:"hver dag unntatt {excludedDays}",days_range:"fra {startDay} til {endDay}",next_week_day:"neste {weekday}"},time:{absolute:"kl. {time}",interval:"fra {startTime} til {endTime}",at_midnight:"ved midnatt",at_noon:"kl. 12.00",at_sun_event:"ved {sunEvent}"}},dialog:{enable_schedule:{title:"Fullfør endringene",description:"Tidsplanen som er endret er for øyeblikket deaktivert, bør den være aktivert?"},confirm_delete:{title:"Vil du fjerne entiteten?",description:"Er du sikker på at du vil fjerne denne entiteten?"},confirm_migrate:{title:"Endre tidsplanen",description:"Noen innstillinger vil gå tapt ved denne handlingen. Vil du fortsette?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Tidsplan",new_schedule:"Ny tidsplan",default_name:"Tidsplan #{id}"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",backend_error:"Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",excluded_items:"{number} ekskludert {if number is 1} element {else} elementer",hide_excluded:"skjul ekskluderte elementer",additional_tasks:"{number} flere {if number is 1} oppgaver {else} oppgaver",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Velg tidsluke",toggle_single_mode:"Til enkel modus",toggle_scheme_mode:"Til skjemamodus",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periode",start_date:"From",end_date:"To"},repeat_type:"oppførsel etter fullføring",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},li={services:oi,domains:ni,ui:ri},di=Object.freeze({__proto__:null,services:oi,domains:ni,ui:ri,default:li}),ci={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z parametrem {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrzewanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chłodzenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrzewanie/chłodzenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrzewanie/chłodzenie[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ na {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw tryb[ na {preset_mode}]",set_fan_mode:"ustaw tryb wentylatora[ na {fan_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]",set_cover_tilt_position:"ustaw kąt nachylenia[ na {tilt_position}]"},fan:{set_percentage:"ustaw prędkość[ na {percentage}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylację[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]",set_mode:"ustaw tryb[ na {mode}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"włącz[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},notify:{send_message:"wyślij powiadomienie"},script:{execute:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"ustaw tryb[ na {operation_mode}]",set_away_mode:"ustaw tryb poza domem"}},ui={alarm_control_panel:"panel alarmowy",binary_sensor:"czujnik binarny",climate:"klimatyzacja",cover:"roleta",fan:"wentylator",group:"grupa encji",humidifier:"nawilżacz",input_boolean:"przełącznik logiczny",input_number:"wartość liczbowa",input_select:"lista wyboru",lawn_mower:"kosiarka",light:"światło",lock:"zamek",media_player:"odtwarzacz multimedialny",notify:"powiadomienie",switch:"przełącznik",vacuum:"odkurzacz",water_heater:"podgrzewacz wody"},hi={components:{date:{day_types_short:{daily:"codziennie",workdays:"dni robocze",weekend:"weekend"},day_types_long:{daily:"każdego dnia",workdays:"w dni robocze",weekend:"w weekend"},days:"dni",tomorrow:"jutro",repeated_days:"każde {days}",repeated_days_except:"każdego dnia oprócz {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"w {weekday}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północy",at_noon:"w południe",at_sun_event:"o {sunEvent}"}},dialog:{enable_schedule:{title:"Zakończ modyfikacje",description:"Harmonogram, który zmieniłeś, jest obecnie wyłączony. Czy chcesz go włączyć?"},confirm_delete:{title:"Usunąć encję?",description:"Czy na pewno chcesz usunąć tę encję?"},confirm_migrate:{title:"Aktualizuj harmonogram",description:"Niektóre ustawienia zostaną utracone przy tej zmianie. Czy chcesz kontynuować?"},weekday_picker:{title:"Dni powtórzeń dla harmonogramu",choose:"Wybierz..."},entity_picker:{title:"Wybierz encje",choose:"Wybierz...",no_results:"Nie znaleziono pasujących elementów"},action_picker:{title:"Wybierz akcję"}},panel:{common:{title:"Harmonogram",new_schedule:"Nowy harmonogram",default_name:"Harmonogram #{id}"},overview:{no_entries:"Brak elementów do wyświetlenia",backend_error:"Nie można połączyć się z komponentem harmonogramu. Musi być zainstalowany jako integracja, zanim ta karta będzie mogła być używana.",excluded_items:"{number} wykluczonych {if number is 1} element {else} elementów",hide_excluded:"ukryj wykluczone elementy",additional_tasks:"{number} dodatkowych {if number is 1} zadanie {else} zadań",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Powtarzane dni",start_time:"Czas rozpoczęcia",stop_time:"Czas zakończenia",action:"Akcja",add_action:"Dodaj akcję",select_timeslot:"Wybierz przedział czasowy",toggle_single_mode:"Do trybu prostego",toggle_scheme_mode:"Do trybu schematu",validation_errors:{overlapping_time:"Harmonogram ma nachodzące na siebie przedziały czasowe",missing_target_entity:"Jednej lub więcej akcji brakuje docelowej encji",missing_service_parameter:"Jednej lub więcej akcji brakuje wymaganego parametru",missing_action:"Harmonogram nie ma żadnych akcji"}},options:{conditions:{header:"Warunki",add_condition:"Dodaj warunek",new_condition:"Nowy warunek",types:{equal_to:"{entity} równa się {value}",unequal_to:"{entity} różni się od {value}",above:"{entity} jest powyżej {value}",below:"{entity} jest poniżej {value}"},options:{logic_and:"Wszystkie warunki muszą być spełnione",logic_or:"Dowolny warunek musi być spełniony",track_changes:"Ponownie sprawdzaj przy zmianie warunków"}},period:{header:"Okres",start_date:"Od",end_date:"Do"},repeat_type:"zachowanie po zakończeniu",tags:"Tagi"},card_editor:{tabs:{entities:"Encje",other:"Inne"},fields:{title:{heading:"Tytuł karty",options:{standard:"standardowy",hidden:"ukryty",custom:"niestandardowy"},custom_title:"Niestandardowy tytuł"},discover_existing:{heading:"Pokaż wszystkie harmonogramy",description:"Ustawia parametr 'discover existing'. Wcześniej utworzone harmonogramy będą automatycznie dodane do karty."},time_step:{heading:"Krok czasu",description:"Rozdzielczość (w minutach) przy tworzeniu harmonogramów",unit_minutes:"min"},default_editor:{heading:"Domyślny edytor czasu",options:{single:"Tryb prostego harmonogramu",scheme:"Tryb schematu czasu"}},sort_by:{heading:"Opcje sortowania",description:"Kolejność, w jakiej harmonogramy pojawiają się na karcie",options:{relative_time:"Czas do następnej akcji",title:"Wyświetlana nazwa harmonogramu",state:"Pokaż aktywne harmonogramy na górze"}},display_format_primary:{heading:"Wyświetlana główna informacja",description:"Określ, która etykieta jest używana dla harmonogramów w podglądzie",options:{default:"Nazwa harmonogramu",entity_action:"Podsumowanie zadania"}},display_format_secondary:{heading:"Wyświetlana dodatkowa informacja",description:"Skonfiguruj, które dodatkowe właściwości są widoczne w podglądzie",options:{relative_time:"Czas do następnej akcji",time:"Skonfigurowany czas następnej akcji",days:"Powtarzane dni tygodnia",additional_tasks:"Liczba dodatkowych zadań",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Pokaż przełącznik w nagłówku",description:"Pokaż przełącznik w nagłówku karty do włączania/wyłączania wszystkich encji"},tags:{heading:"Tagi",description:"Używaj tagów do podziału harmonogramów pomiędzy wieloma kartami"},entities:{button_label:"Konfiguruj zawarte encje",heading:"Zawarte encje",description:"Wybierz encje, którymi chcesz sterować za pomocą harmonogramu. Możesz kliknąć na grupę, aby ją otworzyć. Zauważ, że niektóre encje (np. sensory) mogą być używane tylko jako warunki, a nie akcje.",included_number:"{number}/{total} wybrano"}}}}},mi={services:ci,domains:ui,ui:hi},pi=Object.freeze({__proto__:null,services:ci,domains:ui,ui:hi,default:mi}),_i={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo ventoinha[ para {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir inclinação[ como {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{send_message:"enviar notificação"},script:{execute:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},gi={alarm_control_panel:"painel de controlo de alarme",binary_sensor:"sensores binários",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"cortador de relva",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notificação",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},vi={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover a entidade?",description:"Tem a certeza que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"},weekday_picker:{title:"Repetições semanais",choose:"Escolha..."},entity_picker:{title:"Escolha entidades",choose:"Escolha...",no_results:"Sem resultados"},action_picker:{title:"Escolha a acção"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Não consegui ligar ao componente de agendamento. Essa integração tem que ser instalada antes da utilização deste cartão.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repetições semanais",start_time:"Hora início",stop_time:"Hora fim",action:"Acção",add_action:"Acrescentar acção",select_timeslot:"Selecionar um período horário",toggle_single_mode:"Para modo simples",toggle_scheme_mode:"Para modo esquema",validation_errors:{overlapping_time:"O Horário tem sobreposições",missing_target_entity:"Uma ou mais acções sem entidade definida",missing_service_parameter:"Unma ou mais acções sem uma definição obrigatória",missing_action:"O Horário não tem acções"}},options:{conditions:{header:"Condições",add_condition:"Acrescentar condição",new_condition:"Nova condição",types:{equal_to:"{entity} igual a {value}",unequal_to:"{entity} diferente de {value}",above:"{entity} acima de {value}",below:"{entity} abaixo de {value}"},options:{logic_and:"Todas as condições têm de ser verdadeiras",logic_or:"Uma das condições tem de ser verdadeira",track_changes:"Reavaliar em caso de alterações"}},period:{header:"Período",start_date:"Desde",end_date:"Até"},repeat_type:"Comportamento após a conclusão",tags:"Etiquetas"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},yi={services:_i,domains:gi,ui:vi},fi=Object.freeze({__proto__:null,services:_i,domains:gi,ui:vi,default:yi}),bi={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo do ventilador[ para {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir a posição de inclinação[ para {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{send_message:"enviar notificação"},script:{execute:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},ki={alarm_control_panel:"painel de alarme",binary_sensor:"sensores binários",climate:"ambiente",cover:"persiana",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"lawn mower",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notificar",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},wi={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"de {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover entidade?",description:"Tem certeza de que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens para mostrar",backend_error:"Não foi possível conectar com o componente agendador. Ele precisa ser instalado como integração antes que este cartão possa ser usado.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selecionar um período horário",toggle_single_mode:"Para modo simples",toggle_scheme_mode:"Para modo esquema",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Reavaliar quando as condições mudarem"}},period:{header:"Período",start_date:"From",end_date:"To"},repeat_type:"comportamento após a conclusão",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},xi={services:bi,domains:ki,ui:wi},$i=Object.freeze({__proto__:null,services:bi,domains:ki,ui:wi,default:xi}),ji={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool:"încălzire/răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool_range:"încălzire/răcire[ la {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]",set_mode:"setare mod[ la {mode}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},notify:{send_message:"send notification"},script:{execute:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_operation_mode:"setare mod[ la {operation_mode}]",set_away_mode:"setare mod plecat"}},Oi={alarm_control_panel:"panou control alarmă",binary_sensor:"binary sensors",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",lawn_mower:"lawn mower",light:"lumini",lock:"încuietori",media_player:"media playere",notify:"notification",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},zi={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}",next_week_day:"{weekday} viitoare"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},dialog:{enable_schedule:{title:"Completați modificările",description:"Programul care a fost modificat este momentan dezactivat, ar trebui activat?"},confirm_delete:{title:"Ștergeți entitatea?",description:"Sigur doriți să eliminați această entitate?"},confirm_migrate:{title:"Modificați programul",description:"Unele setări se vor pierde prin această acțiune. Vrei sa continui?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Planificator",new_schedule:"Noul program",default_name:"Program #{id}"},overview:{no_entries:"Nu există elemente de afișat",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selectați un interval orar",toggle_single_mode:"Te lokho modo",toggle_scheme_mode:"Te sxeme modo",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Perioadă",start_date:"From",end_date:"To"},repeat_type:"comportament după declanșare",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Si={services:ji,domains:Oi,ui:zi},Ci=Object.freeze({__proto__:null,services:ji,domains:Oi,ui:zi,default:Si}),Ai={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool:"обогрев/охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"обогрев/охлаждение[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвто[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]",set_cover_tilt_position:"установить наклон[ {tilt_position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]",set_mode:"установить режим[ {mode}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},notify:{send_message:"послать сообщение"},script:{execute:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"установить режим[ {operation_mode}]",set_away_mode:"установить режим вне дома"}},Ei={alarm_control_panel:"панель управления сигнализацией",binary_sensor:"binary sensors",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",lawn_mower:"lawn mower",light:"освещение",lock:"замки",media_player:"медиа-плееры",notify:"notification",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},Ti={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}",next_week_day:"в следующую {weekday}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},dialog:{enable_schedule:{title:"Завершите модификации",description:"Расписание, которое было изменено, в настоящее время отключено, следует ли его включить?"},confirm_delete:{title:"Удалить объект?",description:"Вы уверены, что хотите удалить этот объект?"},confirm_migrate:{title:"Изменить расписание",description:"При этом некоторые настройки будут потеряны. Вы хотите продолжить?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планировщик",new_schedule:"Новое расписание",default_name:"Расписание #{id}"},overview:{no_entries:"Отсутствуют элементы",backend_error:"Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Выберите временной слот",toggle_single_mode:"В простой режим",toggle_scheme_mode:"В режим схемы",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"период",start_date:"From",end_date:"To"},repeat_type:"поведение после срабатывания",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Mi={services:Ai,domains:Ei,ui:Ti},Di=Object.freeze({__proto__:null,services:Ai,domains:Ei,ui:Ti,default:Mi}),Li={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastaviť teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"vykurovanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"vykurovanie/chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"vykurovanie/chladenie[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastaviť režim[ na {hvac_mode}]",set_preset_mode:"nastaviť predvoľbu[ {preset_mode}]",set_fan_mode:"nastaviť režim ventilátora[ to {fan_mode}]"},cover:{close_cover:"zatvoriť",open_cover:"otvoriť",set_cover_position:"nastaviť polohu[ na {position}]",set_cover_tilt_position:"nastaviť naklonenie[ na {tilt_position}]"},fan:{set_speed:"nastaviť rýchlosť[ na {speed}]",set_direction:"nastaviť smer[ na {direction}]",oscillate:"nastaviť osciláciu[ na {oscillate}]"},humidifier:{set_humidity:"nastaviť vlhkosť[ na {humidity}]",set_mode:"nastaviť režim[ na {mode}]"},input_number:{set_value:"nastaviť hodnotu[ na {value}]"},input_select:{select_option:"vybrať možnosť[ {option}]"},select:{select_option:"vybrať možnosť[ {option}]"},light:{turn_on:"zapnúť[ na {brightness} jas]"},media_player:{select_source:"vybrať zdroj[ {source}]"},notify:{send_message:"poslať notifikáciu"},script:{execute:"spustiť"},vacuum:{start_pause:"štart / pauza"},water_heater:{set_operation_mode:"nastaviť režim[ na {operation_mode}]",set_away_mode:"nastaviť režim neprítomnosti"}},Ni={alarm_control_panel:"ovládací panel alarmu",binary_sensor:"binárny snímač",climate:"klimatizácia",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"vstup boolean",input_number:"vstup číslo",input_select:"vstup voľba",lawn_mower:"kosačka",light:"svetlá",lock:"zámky",media_player:"mediálne prehrávače",notify:"upozornenie",switch:"vypínače",vacuum:"vysávače",water_heater:"ohrievače vody"},Pi={components:{date:{day_types_short:{daily:"denne",workdays:"pracovné dni",weekend:"víkendy"},day_types_long:{daily:"každý deň",workdays:"cez pracovné dni",weekend:"cez víkend"},days:"dni",tomorrow:"zajtra",repeated_days:"každý {days}",repeated_days_except:"každý deň okrem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"budúcu {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od polnoci",at_noon:"od obeda",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončite úpravy",description:"Plán, ktorý sa zmenil, je momentálne zakázaný, chcete ho povoliť?"},confirm_delete:{title:"Odstrániť entitu?",description:"Naozaj chcete odstrániť túto entitu?"},confirm_migrate:{title:"Aktualizovať plán",description:"Touto akciou sa stratia niektoré nastavenia. Chcete pokračovať?"},weekday_picker:{title:"Dni opakovania pre plán",choose:"Vyberte..."},entity_picker:{title:"Vyberte entity",choose:"Vyberte...",no_results:"Žiadne vyhovujúce položky neboli nájdené"},action_picker:{title:"Vyberte akciu"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Žiadne položky na zobrazenie",backend_error:"Nepodarilo sa pripojiť ku komponentu Scheduler. Pred tým, ako použijete túto kartu ho musíte nainštalovať ako integráciu.",excluded_items:"Vylúčené položky: {number}",hide_excluded:"skryť vylúčené položky",additional_tasks:"Ďalšie úlohy: {number}",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Dni opakovania",start_time:"Čas začiatku",stop_time:"Čas konca",action:"Akcia",add_action:"Pridať akciu",select_timeslot:"Najprv vyberte časový úsek",toggle_single_mode:"Do režimu jedného",toggle_scheme_mode:"Do režimu schémy",validation_errors:{overlapping_time:"Plán obsahuje prekrývajúce sa časové intervaly",missing_target_entity:"Pre aspoň jednu akciu nie je zadaná cieľová entita",missing_service_parameter:"Pre aspoň jednu akciu nie je zadané vyžadované nastavenie",missing_action:"Plán neobsahuje žiadne akcie"}},options:{conditions:{header:"Podmienky",add_condition:"Pridať podmienku",new_condition:"Nová podmienka",types:{equal_to:"{entity} sa rovná {value}",unequal_to:"{entity} sa nerovná {value}",above:"{entity} je nad {value}",below:"{entity} je pod {value}"},options:{logic_and:"Všetky podmienky musia platiť",logic_or:"Akákoľvek podmienka musí platiť",track_changes:"Prehodnoťte, keď sa zmenia podmienky"}},period:{header:"Obdobie",start_date:"Od",end_date:"Do"},repeat_type:"správanie sa po spustení",tags:"Štítky"},card_editor:{tabs:{entities:"Entity",other:"Iné"},fields:{title:{heading:"Názov karty",options:{standard:"štandardné",hidden:"skryté",custom:"vlastné"},custom_title:"Vlastný názov"},discover_existing:{heading:"Zobraziť všetky plány",description:"Tým sa nastaví parameter „objaviť existujúce“. Predtým vytvorené plány sa automaticky pridajú na kartu."},time_step:{heading:"Časový krok",description:"Rozlíšenie (v minútach) pre vytváranie plánov",unit_minutes:"min"},default_editor:{heading:"Predvolený editor času",options:{single:"Režim jedného plánu",scheme:"Režim schémy"}},sort_by:{heading:"Možnosti triedenia",description:"Poradie, v akom sa rozvrhy zobrazujú na karte",options:{relative_time:"Zostávajúci čas do ďalšej akcie",title:"Zobrazený názov rozvrhu",state:"Zobraziť aktívne plány navrchu"}},display_format_primary:{heading:"Zobrazené primárne informácie",description:"V prehľade nakonfigurujte, ktorý štítok sa použije pre plány",options:{default:"Názov rozvrhu",entity_action:"Zhrnutie úlohy"}},display_format_secondary:{heading:"Zobrazené sekundárne informácie",description:"Nakonfigurujte, ktoré ďalšie vlastnosti sú viditeľné v prehľade",options:{relative_time:"Zostávajúci čas do ďalšej akcie",time:"Nastavený čas pre ďalšiu akciu",days:"Opakované dni v týždni",additional_tasks:"Počet dodatočných úloh",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Zobraziť prepínač hlavičky",description:"Zobraziť prepínač v hornej časti karty na povolenie/zakázanie všetkých entít"},tags:{heading:"Štítky",description:"Použite štítky na rozdelenie plánov medzi viacero kariet"},entities:{button_label:"Konfigurácia zahrnutých entít",heading:"Zahrnuté entity",description:"Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",included_number:"{number}/{total} vybraný"}}}}},Ii={services:Li,domains:Ni,ui:Pi},qi={generic:{parameter_to_value:"{parameter} v {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"nastavi temperaturo[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrej[ na {temperature}]",set_temperature_hvac_mode_cool:"ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrej/ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrej/ohladi[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"samodejno[ na {temperature}]",set_hvac_mode:"nastavi način[ na {hvac_mode}]",set_preset_mode:"nastavi preset[ na {preset_mode}]",set_fan_mode:"nastavi ventilator[ na {fan_mode}]"},cover:{close_cover:"zapri",open_cover:"odpri",set_cover_position:"nastavi pozicijo[ na {position}]",set_cover_tilt_position:"nastavi naklon[ na {tilt_position}]"},fan:{set_speed:"nastavi hitrost[ na {speed}]",set_direction:"nastavi smer[ na {direction}]",oscillate:"nastavi obračanje[ na {oscillate}]"},humidifier:{set_humidity:"nastavi vlažnost[ na {humidity}]",set_mode:"nastavi način[ na {mode}]"},input_number:{set_value:"nastavi vrednost[ na {value}]"},input_select:{select_option:"izberi možnost[ {option}]"},select:{select_option:"izberi možnost[ {option}]"},light:{turn_on:"vključi[ z {brightness} brightness]"},media_player:{select_source:"Izberi vir[ {source}]"},notify:{send_message:"pošlji sporočilo"},script:{execute:"izvedi"},vacuum:{start_pause:"zaženi / ustavi"},water_heater:{set_operation_mode:"nastavi način[ na {operation_mode}]",set_away_mode:"nastavi način odsoten"}},Ri={alarm_control_panel:"kontrolna plošča alarma",binary_sensor:"binarni sensorji",climate:"klime",cover:"rolete",fan:"ventilatorji",group:"skupine entitet",humidifier:"vlažilniki",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luči",lock:"ključavnice",media_player:"medijsi predvajalniki",notify:"obvestila",switch:"stikala",vacuum:"sesalniki",water_heater:"grelniki vode"},Hi={components:{date:{day_types_short:{daily:"dnevno",workdays:"delovniki",weekend:"vikend"},day_types_long:{daily:"vsak dan",workdays:"ob delovnikih",weekend:"ob vikendih"},days:"dni",tomorrow:"jutri",repeated_days:"vsakih {days}",repeated_days_except:"vsak dan razen {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"naslednji {weekday}"},time:{absolute:"ob {time}",interval:"od {startTime} do {endTime}",at_midnight:"opolnoči",at_noon:"opoldne",at_sun_event:"ob {sunEvent}"}},dialog:{enable_schedule:{title:"Zaključi spremembe",description:"Urnik, katerega ste spremenili je trenutno izključen, ali ga želite omogočiti?"},confirm_delete:{title:"Ali želite odstraniti entiteto?",description:"Ali ste prepričani, da želite odstraniti to entiteto?"},confirm_migrate:{title:"Spremenite urnik",description:"Nekatere nastavitve bodo s tem dejanjem izgubljene. Želite nadaljevati?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Urnik",new_schedule:"Nov urnik",default_name:"Urnik #{id}"},overview:{no_entries:"Ni vpisov za prikaz",backend_error:"Ni povezave s komponento urnika. Komponenta mora biti nameščena kot integracija, preden lahko uporabite to kartico.",excluded_items:"{number}{if number is 1} izločen predmet {else} izločenih predmetov",hide_excluded:"skrij izločene predmete",additional_tasks:"še {number}{if number is 1} opravilo {else} opravil",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Najprej izberi časovni okvir",toggle_single_mode:"To single mode",toggle_scheme_mode:"To scheme mode",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Ponovno preglej ko se pogoji spremenijo"}},period:{header:"Perioda",start_date:"From",end_date:"To"},repeat_type:"obnašanje, ko končaš",tags:"Tags"},card_editor:{tabs:{entities:"Entitete",other:"Ostalo"},fields:{title:{heading:"Ime kartice",options:{standard:"standardno",hidden:"skrito",custom:"po meri"},custom_title:"Ime po želji"},discover_existing:{heading:"Prikaži vse urnike",description:"Tole nastavi parameter 'discover existing'. Prej kreirani urniki bodo samodejno dodani v kartico. "},time_step:{heading:"Časovni korak",description:"Ločljivost (v minutah) za kreiranje urnikov",unit_minutes:"min"},default_editor:{heading:"Default time editor",options:{single:"V enojni način",scheme:"V shematski način"}},sort_by:{heading:"Možnosti sortiranja",description:"Zaporedje, po katerem se prikažejo urniki na kartici",options:{relative_time:"Preostali čas do naslednje akcije",title:"Prikazano ime urnika",state:"Prikaži aktivne urnike na vrhu"}},display_format_primary:{heading:"Prikazane primarne informacije",description:"Nastavite, kaj se prikazuje v pregledu urnikov",options:{default:"Ime urnika",entity_action:"Povzetek operacije"}},display_format_secondary:{heading:"Prikazane sekundarne informacije",description:"Nastavite, katere dodatne informacije želite imeti prikazane v pregledu",options:{relative_time:"Preostali čas do naslednje akcije",time:"Nastavljen čas za naslednjo akcijo",days:"Katere dni/kdaj se sproži akcija",additional_tasks:"Število dodatnih opravil",additional_task_info:"Extra info additional task"}},show_header_toggle:{heading:"Prikaži glavo",description:"Na vrhu prikaže stikalo, s katerim lahko omogočite/izključite vse entitete naenkrat"},tags:{heading:"Tag-i",description:"Uporabite tag-e za ločevanje urnikov med več karticami"},entities:{button_label:"Konfiguriraj vključene entitete",heading:"Vključene entitete",description:"Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",included_number:"{number}/{total} izbranih"}}}}},Vi={services:qi,domains:Ri,ui:Hi},Fi={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"нагрів/охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"нагрів/охолодження[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвтоматичний[ to {temperature}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]",set_mode:"встановити режим[ to {mode}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},notify:{send_message:"send notification"},script:{execute:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"встановити режим[ to {operation_mode}]",set_away_mode:"встановити режим Не вдома"}},Bi={alarm_control_panel:"панель керування сигналізацією",binary_sensor:"binary sensors",climate:"клімат",cover:"жалюзі",fan:"вентилятори",group:"групи",humidifier:"зволожувачі",input_boolean:"логічні",input_number:"числові",input_select:"списки",lawn_mower:"lawn mower",light:"освітлення",lock:"замки",media_player:"медіаплеєри",notify:"notification",switch:"вимикачі",vacuum:"пилососи",water_heater:"водонагрівачі"},Ui={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}",next_week_day:"наступної {weekday}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},dialog:{enable_schedule:{title:"Завершіть зміни",description:"Розклад, який було змінено, наразі вимкнено, чи потрібно його ввімкнути?"},confirm_delete:{title:"Видалити сутність?",description:"Ви дійсно бажаєте видалити цю сутність?"},confirm_migrate:{title:"Змінити розклад",description:"У результаті цієї дії деякі налаштування буде втрачено. Ви бажаєте продовжити?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планувальник",new_schedule:"Новий розклад",default_name:"Розклад #{id}"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Спершу виберіть часовий проміжок",toggle_single_mode:"До одиночного режиму",toggle_scheme_mode:"До схемного режиму",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"період",start_date:"From",end_date:"To"},repeat_type:"поведінка після спрацювання",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Wi={services:Fi,domains:Bi,ui:Ui},Zi={generic:{parameter_to_value:"{parameter} 至 {value}",action_with_parameter:"{action} 使用 {parameter}"},climate:{set_temperature:"设定温度[ 至 {temperature}]",set_temperature_hvac_mode_heat:"制热模式[ 至 {temperature}]",set_temperature_hvac_mode_cool:"制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool:"制热模式/制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool_range:"制热模式/制冷模式[ 至 {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"自动[ 至 {temperature}]",set_hvac_mode:"设定模式[ 为 {hvac_mode}]",set_preset_mode:"设定预设模式[ 为 {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"关闭",open_cover:"打开",set_cover_position:"设定位置[ 至 {position}]",set_cover_tilt_position:"设定倾斜位置[ 至 {tilt_position}]"},fan:{set_speed:"设定风速[ 至 {speed}]",set_direction:"设定方向[ 至 {direction}]",oscillate:"设置摇摆[ 至 {oscillate}]"},humidifier:{set_humidity:"设定湿度[ 至 {humidity}]",set_mode:"设定模式[ 为 {mode}]"},input_number:{set_value:"设定数值[ 至 {value}]"},input_select:{select_option:"选择选项[ {option}]"},select:{select_option:"选择选项[ {option}]"},light:{turn_on:"打开[ 并设定亮度为 {brightness}]"},media_player:{select_source:"选择播放源[ {source}]"},notify:{send_message:"发送通知"},script:{execute:"执行"},vacuum:{start_pause:"开始 / 暂停"},water_heater:{set_operation_mode:"设定模式[ 为 {operation_mode}]",set_away_mode:"设定离开模式"}},Ki={alarm_control_panel:"警戒控制面板",binary_sensor:"binary sensors",climate:"空调/地暖",cover:"窗帘",fan:"风扇/空气净化器",group:"实体组",humidifier:"空气加湿器",input_boolean:"输入二元选择器",input_number:"输入数值",input_select:"输入选择",lawn_mower:"lawn mower",light:"灯具",lock:"门锁",media_player:"媒体播放器",notify:"notification",switch:"开关",vacuum:"扫地机/吸尘器",water_heater:"热水器"},Gi={components:{date:{day_types_short:{daily:"每日",workdays:"工作日",weekend:"周末"},day_types_long:{daily:"每一天",workdays:"在工作日",weekend:"在周末"},days:"天",tomorrow:"明天",repeated_days:"每 {days}",repeated_days_except:"每天，除了 {excludedDays}",days_range:"从 {startDay} 至 {endDay}",next_week_day:"下{weekday}"},time:{absolute:"在 {time}",interval:"从 {startTime} 至 {endTime}",at_midnight:"在午夜",at_noon:"在正午",at_sun_event:"在 {sunEvent}"}},dialog:{enable_schedule:{title:"完成修改",description:"已更改的计划当前已禁用，是否应该启用？"},confirm_delete:{title:"是否删除实体？",description:"您确定要删除此实体吗？"},confirm_migrate:{title:"修改时间表",description:"此操作将丢失某些设置。 你想继续吗？"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities",choose:"Choose...",no_results:"No matching items found"},action_picker:{title:"Choose action"}},panel:{common:{title:"计划任务",new_schedule:"新时间表",default_name:"日程 #{id}"},overview:{no_entries:"无事项",backend_error:"计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",excluded_items:"{number} 除外 {if number is 1} 事项 {else} 事项",hide_excluded:"隐藏除外事项",additional_tasks:"{number} 更多 {if number is 1} 任务 {else} 任务",additional_task_info:{no_action:"No action configured"}},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"请选择时间段",toggle_single_mode:"转为单一模式",toggle_scheme_mode:"转为方案模式",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",new_condition:"New condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"时期",start_date:"From",end_date:"To"},repeat_type:"触发后的行为",tags:"Tags"},card_editor:{fields:{display_format_secondary:{options:{additional_task_info:"Extra info additional task"}}}}}},Ji={services:Zi,domains:Ki,ui:Gi};const Yi={cs:at,de:lt,en:mt,es:yt,et:xt,es_419:yt,fi:St,fr:Mt,he:It,hu:Ft,it:Kt,lv:Xt,nb:di,nl:si,nn:di,no:di,pl:pi,pt:fi,"pt-BR":$i,ro:Ci,sk:Object.freeze({__proto__:null,services:Li,domains:Ni,ui:Pi,default:Ii}),sl:Object.freeze({__proto__:null,services:qi,domains:Ri,ui:Hi,default:Vi}),ru:Di,uk:Object.freeze({__proto__:null,services:Fi,domains:Bi,ui:Ui,default:Wi}),"zh-Hans":Object.freeze({__proto__:null,services:Zi,domains:Ki,ui:Gi,default:Ji})};function Qi(e,t,i=[],a=[]){let s;try{s=e.split(".").reduce((e,t)=>e[t],Yi[t.locale.language]),s||(s=e.split(".").reduce((e,t)=>e[t],Yi.en))}catch(t){try{s=e.split(".").reduce((e,t)=>e[t],Yi.en)}catch(e){s=""}}if(i=[i||[]].flat(),a=[a||[]].flat(),i.length&&a.length&&s)for(let e=0;e<i.length;e++){s=s.replace(String(i[e]),String(a[e]));const t=s.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){s=String(a[e])==t[2]?s.replace(t[0],t[3]):s.replace(t[0],t[4])}}const o=/\[([^\]]+)\]/.exec(s);if(o){s=/\{([^\}]+)\}/.exec(o[1])?s.replace(o[0],""):s.replace(o[0],o[1])}return s||console.log("missing translation for "+e),s}const Xi=e=>e.split(".")[1]||"",ea=e=>e.split(".")[0]||"",ta=(e,t)=>{var i;return void 0===(null==t?void 0:t.friendly_name)?Xi(e).replace(/_/g," "):(null!==(i=null==t?void 0:t.friendly_name)&&void 0!==i?i:"").toString()};function ia(e,t){let i=!1;if(!t)return!1;if(e.match(/^[a-z0-9_\.]+$/))i=!e.includes(".")&&t.includes(".")?e==ea(t):e==t;else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}const aa=(e,t)=>{var i,a;let s=[],o=!0;if(e.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var t;let i=(null===(t=e.target)||void 0===t?void 0:t.entity_id)?[e.target.entity_id].flat():[e.service];s=[...s,...i]})})}),![...new Set(s)].every(e=>((t.include||[]).some(t=>ia(t,e))||Object.keys(t.customize||{}).some(t=>ia(t,e)))&&!(t.exclude||[]).some(t=>ia(t,e))))return!1;const n=[t.tags].flat();n.length&&(o=!1,((e.tags||[]).some(e=>n.includes(e))||n.includes("none")&&!(null===(i=e.tags)||void 0===i?void 0:i.length)||n.includes("enabled")&&e.enabled||n.includes("disabled")&&!e.enabled)&&(o=!0));const r=[t.exclude_tags].flat();return r.length&&o&&((e.tags||[]).some(e=>r.includes(e))||r.includes("none")&&!(null===(a=e.tags)||void 0===a?void 0:a.length)||r.includes("enabled")&&e.enabled||r.includes("disabled")&&!e.enabled)&&(o=!1),o},sa=(e,t)=>((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()),oa=e=>{let t=e.trim();return t.charAt(0).toUpperCase()+t.slice(1)},na=(e,t,i=!0)=>{let a=t.localize(e);return a||!i?a:`{${e.split(".").pop()}}`},ra=(e,t,i)=>{const a=Le(i.locale),s=e=>{const t=Ee(e);return t.mode==we.Fixed?qe(t,{am_pm:a}):((e,t)=>{let i=e.mode==we.Sunrise?na("ui.panel.config.automation.editor.conditions.type.sun.sunrise",t):na("ui.panel.config.automation.editor.conditions.type.sun.sunset",t);"de"!=t.language&&(i=i.toLowerCase());const a=3600*e.hours+60*e.minutes;if(Math.abs(a)<=60)return Qi("ui.components.time.at_sun_event",t,"{sunEvent}",i);let s=na(a<0?"ui.panel.config.automation.editor.conditions.type.sun.before":"ui.panel.config.automation.editor.conditions.type.sun.after",t);return s=s.replace(/[^a-z]/gi,"").toLowerCase(),`${qe(e,{seconds:!1}).split(/\+|\-/).pop()} ${s} ${i}`})(t,i)},o=s(e);if(t){return[o,s(t)]}return[o]},la={alarm_control_panel:{alarm_disarm:{target:{}},alarm_arm_home:{target:{}},alarm_arm_away:{target:{}},alarm_arm_night:{target:{}},alarm_arm_custom_bypass:{target:{}},alarm_arm_vacation:{target:{}}},automation:{turn_on:{target:{}},turn_off:{target:{}},trigger:{target:{}}},button:{press:{target:{}}},climate:{turn_off:{target:{},supported_features:128},turn_on:{target:{},supported_features:256},set_hvac_mode:{translation_key:"services.climate.set_hvac_mode",target:{},fields:{hvac_mode:{}}},set_temperature:{translation_key:["services.climate.set_temperature","services.climate.set_temperature_hvac_mode_heat","services.climate.set_temperature_hvac_mode_cool","services.climate.set_temperature_hvac_mode_heat_cool"],target:{},fields:{temperature:{supported_features:1},target_temp_high:{supported_features:2},target_temp_low:{supported_features:2},hvac_mode:{optional:!0}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",target:{},fields:{preset_mode:{}}},set_fan_mode:{translation_key:"services.climate.set_fan_mode",target:{},fields:{fan_mode:{}}}},cover:{close_cover:{target:{}},open_cover:{target:{}},set_cover_position:{translation_key:"services.cover.set_cover_position",target:{},fields:{position:{}}},set_tilt_position:{translation_key:"services.cover.set_cover_tilt_position",target:{},fields:{tilt_position:{}}}},fan:{turn_on:{target:{}},turn_off:{target:{}},set_percentage:{translation_key:"services.fan.set_percentage",target:{},fields:{percentage:{}}},oscillate:{translation_key:"services.fan.oscillate",target:{},fields:{oscillating:{}}},set_direction:{translation_key:"services.fan.set_direction",target:{},fields:{direction:{}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",target:{},fields:{preset_mode:{}}}},humidifier:{turn_on:{target:{}},turn_off:{target:{}},set_humidity:{translation_key:"services.humidifier.set_humidity",target:{},fields:{humidity:{}}},set_mode:{translation_key:"services.humidifier.set_mode",target:{},fields:{mode:{}}}},input_boolean:{turn_on:{target:{}},turn_off:{target:{}}},input_button:{press:{target:{}}},input_number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},input_select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},lawn_mower:{start_mowing:{target:{},supported_features:1},pause:{target:{},supported_features:2},dock:{target:{},supported_features:4}},light:{turn_on:{translation_key:"services.light.turn_on",target:{},fields:{brightness:{optional:!0}}},turn_off:{target:{}}},lock:{lock:{target:{}},unlock:{target:{}}},media_player:{turn_on:{target:{}},turn_off:{target:{}},select_source:{translation_key:"services.media_player.select_source",target:{},fields:{source:{}}}},notify:{"{entity_id}":{translation_key:"services.notify.send_message",fields:{title:{optional:!0},message:{}}}},number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},scene:{turn_on:{target:{}}},script:{"{entity_id}":{translation_key:"services.script.execute"}},select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},switch:{turn_on:{target:{}},turn_off:{target:{}}},vacuum:{turn_on:{target:{}},start:{target:{}},play_pause:{target:{}}},valve:{open_valve:{target:{}},close_valve:{target:{}},set_valve_position:{translation_key:"services.cover.set_cover_position",target:{},fields:{position:{}}}},water_heater:{set_temperature:{translation_key:"services.climate.set_temperature",target:{},fields:{temperature:{}}},set_operation_mode:{translation_key:"services.water_heater.set_operation_mode",target:{},fields:{operation_mode:{}}},set_away_mode:{translation_key:"services.water_heater.set_away_mode",target:{},fields:{away_mode:{}}}}},da=e=>{if("object"!=typeof e)return null;if(!Object.keys(e).length||!Object.keys(e).every(e=>"string"==typeof e))return null;let t={value:"",label:""};return Object.keys(e).includes("name")?t=Object.assign(Object.assign({},t),{label:String(e.name)}):Object.keys(e).includes("label")?t=Object.assign(Object.assign({},t),{label:String(e.label)}):Object.keys(e).includes("value")&&(t=Object.assign(Object.assign({},t),{label:String(e.value)})),Object.keys(e).includes("value")?t=Object.assign(Object.assign({},t),{value:String(e.value)}):Object.keys(e).includes("name")?t=Object.assign(Object.assign({},t),{value:String(e.name)}):Object.keys(e).includes("label")&&(t=Object.assign(Object.assign({},t),{value:String(e.label)})),Object.keys(e).includes("icon")&&(t=Object.assign(Object.assign({},t),{icon:String(e.icon)})),t.value.length&&t.label.length?t:null},ca=e=>{let t={select:{options:Array.isArray(e.options)?e.options.every(e=>"string"==typeof e)?e.options:e.options.map(da).filter(Ue):[]}};return e.translation_key&&(t=Object.assign(Object.assign({},t),{select:Object.assign(Object.assign({},t.select),{translation_key:e.translation_key})})),t},ua=(e,t)=>{let i=[];return Object.keys(e).filter(t=>{var i;return null===(i=e[t].actions)||void 0===i?void 0:i.length}).filter(i=>!t||!t.includes(".")&&ia(ea(i),t)||ia(i,t)||"script"==ea(t)&&e[i].actions.find(e=>e.service==t)).forEach(a=>{Object.values(e[a].actions).forEach(e=>{if(!e.service.includes(".")&&a.includes(".")&&(e=Object.assign(Object.assign({},e),{service:`${ea(a)}.${e.service}`})),a.includes(".")&&"script"!=ea(a)&&(e=Object.assign(Object.assign({},e),{target:{entity_id:a}})),"script"!=ea(a)&&"script"==ea(t||"")){if(e.service!=t&&(null==t?void 0:t.includes(".")))return;e=Object.assign(Object.assign({},e),{target:Object.assign(Object.assign({},e.target),{domain:a})})}i.push({service:e.service,service_data:e.service_data||{},target:e.target?e.target:void 0,name:e.name||"",icon:e.icon||"",variables:e.variables})})}),i},ha=(e,t)=>{var i;const a=ea(e.service),s=Xi(e.service);let o,n={};if(Object.keys(la).includes(a)&&(Object.keys(la[a]).includes(s)?n=Object.assign(Object.assign({},n),la[a][s]):Object.keys(la[a]).includes("{entity_id}")&&(n=Object.assign(Object.assign({},n),la[a]["{entity_id}"]))),!t)return n;o=["script","notify"].includes(a)?e.service:null===(i=e.target)||void 0===i?void 0:i.entity_id,o||(o=a);const r=ua(t,[o].flat().pop());return r.length&&r.forEach(t=>{((e,t)=>{if(e.service!==t.service)return!1;const i=e.service_data||{},a=t.service_data||{},s=e.variables||{};let o=[...new Set([...Object.keys(i),...Object.keys(a),...Object.keys(s)])];return o=o.filter(e=>"entity_id"!=e),!!o.every(e=>{var t;if(Object.keys(i).includes(e)&&Object.keys(a).includes(e))return pe(i[e],a[e]);if(Object.keys(s).includes(e)){let i=s[e],o=a[e];if(Object.keys(i).includes("options")){let e=ca({options:i.options});return!Ue(o)||(null===(t=e.select)||void 0===t?void 0:t.options.find(e=>"string"==typeof e?e==o:e.value==o))}return!Object.keys(i).includes("min")||!Object.keys(i).includes("max")||(!(Ue(o)||!Object.keys(i).includes("optional")||!i.optional)||"number"==typeof o)}return!1})})(t,e)&&(n={},Object.keys(t.variables||{}).forEach(e=>{n=Object.assign(Object.assign({},n),{fields:Object.assign(Object.assign({},n.fields||{}),{[e]:{}})})}),n=Object.assign(Object.assign({},n),{name:t.name||n.name,icon:t.icon||n.icon,target:t.target||n.target}))}),n},ma=e=>{const t=Math.pow(10,5);return e=Math.round(e*t)/t},pa=(e,t,i)=>{if(!t)return e;if(Object.keys(t).includes("select")&&t.select){const a=t.select;let s=a.options.map(e=>"string"==typeof e?Object({value:e,label:e}):e),o=null==s?void 0:s.find(t=>t.value==e);a.translation_key?e=na(a.translation_key.replace("${value}",e),i,!1)||o?null==o?void 0:o.label:e:o&&(e=o.label)}if(Object.keys(t).includes("number")&&t.number){const i=t.number;if(e=Number(e),"number"==typeof(null==i?void 0:i.scale_factor)&&(e/=i.scale_factor),"number"==typeof(null==i?void 0:i.step)&&(e=Math.round(e/i.step)*i.step),e=ma(e),null==i?void 0:i.unit)return`${e}${i.unit}`}return Object.keys(t).includes("boolean")&&t.boolean&&(e=Boolean(e)?"True":"False"),e},_a=e=>{let t={number:{}};return Object.keys(e).includes("min")&&!isNaN(Number(e.min))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{min:Number(e.min)})})),Object.keys(e).includes("max")&&!isNaN(Number(e.max))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{max:Number(e.max)})})),Object.keys(e).includes("step")&&!isNaN(Number(e.step))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{step:Number(e.step)})})),Object.keys(e).includes("mode")&&["box","slider"].includes(e.mode)&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{mode:e.mode})})),Object.keys(e).includes("unit")&&e.unit&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{unit:e.unit})})),Object.keys(e).includes("optional")&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{optional:Boolean(e.optional)})})),Object.keys(e).includes("scale_factor")&&!isNaN(Number(e.scale_factor))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{scale_factor:Number(e.scale_factor)})})),t},ga={alarm_control_panel:{services:{alarm_arm_away:"mdi:shield-lock",alarm_arm_home:"mdi:shield-home",alarm_arm_night:"mdi:shield-moon",alarm_custom_bypass:"mdi:security",alarm_disarm:"mdi:shield-off",alarm_trigger:"mdi:bell-ring",alarm_arm_vacation:"mdi:shield-airplane"}},automation:{services:{turn_on:"mdi:robot",turn_off:"mdi:robot-off",trigger:"mdi:play"}},button:{services:{press:"mdi:gesture-tap-button"}},climate:{services:{set_temperature:"mdi:thermometer",set_hvac_mode:"mdi:cog-transfer-outline",set_preset_mode:"mdi:cloud-download-outline",set_fan_mode:"mdi:fan",set_humidity:"mdi:water-percent",set_swing_mode:"mdi:arrow-oscillating"},attributes:{hvac_mode:{auto:"mdi:autorenew",cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",heat:"mdi:fire",heat_cool:"mdi:thermometer",off:"mdi:power"},preset_mode:{activity:"mdi:motion-sensor",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",sleep:"mdi:bed"},fan_mode:{diffuse:"mdi:weather-windy",focus:"mdi:target",high:"mdi:speedometer",low:"mdi:speedometer-slow",medium:"mdi:speedometer-medium",middle:"mdi:speedometer-medium",off:"mdi:fan-off",on:"mdi:fan"},swing_mode:{both:"mdi:arrow-all",horizontal:"mdi:arrow-left-right",off:"mdi:arrow-oscillating-off",on:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down"}}},cover:{services:{close_cover:"mdi:arrow-down-box",close_cover_tilt:"mdi:arrow-bottom-left",open_cover:"mdi:arrow-up-box",open_cover_tilt:"mdi:arrow-top-right",set_cover_position:"mdi:arrow-down-box",set_cover_tilt_position:"mdi:arrow-top-right"}},fan:{services:{oscillate:"mdi:arrow-oscillating",set_percentage:"mdi:fan",set_preset_mode:"mdi:fan-auto",turn_off:"mdi:fan-off",turn_on:"mdi:fan"}},humidifier:{services:{set_humidity:"mdi:water-percent",set_mode:"mdi:air-humidifier",turn_off:"mdi:air-humidifier-off",turn_on:"mdi:air-humidifier"},attributes:{mode:{auto:"mdi:refresh-auto",away:"mdi:account-arrow-right",baby:"mdi:baby-carriage",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",normal:"mdi:water-percent",sleep:"mdi:power-sleep"}}},input_boolean:{services:{turn_off:"mdi:toggle-switch-off",turn_on:"mdi:toggle-switch"}},input_button:{services:{press:"mdi:gesture-tap-button"}},input_number:{services:{set_value:"mdi:counter"}},input_select:{services:{select_option:"mdi:counter"}},lawn_mower:{services:{dock:"mdi:home-import-outline",start_mowing:"mdi:play",pause:"mdi:pause"}},light:{services:{turn_off:"mdi:lightbulb-off",turn_on:"mdi:lightbulb-on"}},lock:{services:{lock:"mdi:lock",unlock:"mdi:lock-open"}},media_player:{services:{media_play:"mdi:play",media_stop:"mdi:stop",play_media:"mdi:play",select_source:"mdi:import",turn_off:"mdi:power",turn_on:"mdi:power"}},notify:{services:{"{entity_id}":"mdi:message-alert"}},scene:{services:{turn_on:"mdi:play"}},script:{services:{turn_on:"mdi:flash",turn_off:"mdi:flash-off","{entity_id}":"mdi:play"}},select:{services:{select_option:"mdi:counter"}},switch:{services:{turn_off:"mdi:toggle-switch-variant-off",turn_on:"mdi:toggle-switch-variant"}},vacuum:{services:{send_command:"mdi:send",start:"mdi:play",turn_off:"mdi:stop",turn_on:"mdi:play"}},valve:{services:{open_valve:"mdi:valve-open",close_valve:"mdi:valve-closed",set_valve_position:"mdi:valve"}},water_heater:{services:{set_away_mode:"mdi:account-arrow-right",set_operation_mode:"mdi:water-boiler",set_temperature:"mdi:thermometer",turn_off:"mdi:water-boiler-off",turn_on:"mdi:water-boiler"},attributes:{operation_mode:{eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire-circle",heat_pump:"mdi:heat-wave",high_demand:"mdi:finance",off:"mdi:power",performance:"mdi:rocket-launch"}}}},va=(e,t,i,a,s)=>{const o=ea(e),n=["script","notify"].includes(o)?[e]:[t||[]].flat();let r=n.map(e=>ya(e,i,a)),l=ka(r),d=n.map(t=>fa(e,t,i,s));return ka(d)||l},ya=(e,t,i)=>{const a=Object.keys(i.states).includes(e)?i.states[e]:null,s=(null==a?void 0:a.attributes)||{},o=ea(e),n=`${o}.${t}`,r=e=>{var i,a;const s=null===(a=null===(i=ga[o])||void 0===i?void 0:i.attributes)||void 0===a?void 0:a[t],n=!!s&&e.every(e=>e in s);return e.map(e=>({value:e,label:e,icon:n?s[e]:void 0}))};switch(n){case"climate.temperature":case"climate.target_temp_low":case"climate.target_temp_high":{const e="climate.temperature"==n?(2&(s.supported_features||0))>0:(1&(s.supported_features||0))>0,t=i.config.unit_system.temperature.includes("F")?1:.5;return _a({min:s.min_temp,max:s.max_temp,step:s.target_temp_step||t,unit:""+i.config.unit_system.temperature,optional:e})}case"climate.hvac_mode":return ca({options:r(s.hvac_modes),translation_key:"component.climate.entity_component._.state.${value}"});case"climate.preset_mode":return ca({options:r(s.preset_modes),translation_key:"state_attributes.climate.preset_mode.${value}"});case"climate.fan_mode":return ca({options:r(s.fan_modes)});case"cover.position":case"cover.tilt_position":case"fan.percentage":case"valve.position":return _a({min:0,max:100,step:1,unit:"%"});case"fan.oscillating":return{boolean:{}};case"fan.direction":return ca({options:r(["forward","reverse"]),translation_key:"ui.card.fan.${value}"});case"fan.preset_mode":return ca({options:r(s.preset_modes)});case"humidifier.humidity":return _a({min:s.min_humidity,max:s.max_humidity,step:1,unit:"%"});case"humidifier.mode":return ca({options:r(s.available_modes),translation_key:"component.humidifier.entity_component._.state_attributes.mode.state.${value}"});case"input_number.value":case"number.value":return _a({min:s.min,max:s.max,step:s.step,mode:s.mode,unit:s.unit_of_measurement});case"input_select.option":case"select.option":return ca({options:r(s.options)});case"light.brightness":return _a({min:0,max:100,step:1,unit:"%",scale_factor:2.55});case"media_player.source":case"notify.title":case"notify.message":return{text:{}};case"water_heater.temperature":{const e=i.config.unit_system.temperature.includes("F")?1:.5;return _a({min:s.min_temp,max:s.max_temp,step:s.target_temp_step||e,unit:""+i.config.unit_system.temperature})}case"water_heater.operation_mode":return ca({options:r(s.operation_list)});case"water_heater.away_mode":return{boolean:{}}}return null},fa=(e,t,i,a)=>{const s=ua(a||{},t);if(s.length){let t=s.map(t=>{if(t.service!=e||!Object.keys(t.variables||{}).includes(i))return null;let a=(t.variables||{})[i];return ba(a)}).filter(e=>void 0!==e);return ka(t)}return null},ba=e=>Object.keys(e).includes("options")?ca({options:e.options}):Object.keys(e).includes("min")&&Object.keys(e).includes("max")?_a(e):{text:{}},ka=e=>{const t=e=>1==new Set(e).size;if(e.some(e=>null===e)||!e.length)return null;if(e.every(e=>e.hasOwnProperty("select"))){const i=e.map(e=>e.select.options).filter(e=>void 0!==e);let a=[];if(i.every(e=>e.every(e=>"string"==typeof e)))a=i.length?i.reduce((e,t)=>e.filter(e=>t.includes(e))):[];else{let e=i.map(e=>e.map(e=>da("object"==typeof e?e:{value:e})).filter(Ue));a=e.length?e.reduce((e,t)=>e.filter(e=>t.find(t=>t.value===e.value))):[]}const s=e.map(e=>e.select.translation_key).filter(e=>void 0!==e);return{select:{options:a.length?a:[],translation_key:s.length&&t(s)?s[0]:void 0}}}if(e.every(e=>e.hasOwnProperty("number"))){const i=e.map(e=>e.number.min).filter(e=>void 0!==e),a=e.map(e=>e.number.max).filter(e=>void 0!==e),s=e.map(e=>e.number.step).filter(e=>void 0!==e),o=e.map(e=>e.number.mode).filter(e=>void 0!==e),n=e.map(e=>e.number.unit).filter(e=>void 0!==e),r=e.map(e=>e.number.optional),l=e.map(e=>e.number.scale_factor).filter(e=>void 0!==e);return{number:{min:i.length?Math.max(...i):void 0,max:a.length?Math.min(...a):void 0,step:s.length?Math.max(...s):void 0,mode:o.length&&t(o)?o[0]:void 0,unit:n.length&&t(n)?n[0]:void 0,optional:r.every(e=>e),scale_factor:l.length&&t(l)?l[0]:void 0}}}return e.every(e=>e.hasOwnProperty("boolean"))?{boolean:{}}:e.every(e=>e.hasOwnProperty("text"))?{text:{}}:null},wa=/\[([^\]]+)\]/,xa=/\{([^\}]+)\}/,$a=(e,t)=>{const i=Xi(t.service);return-1!=e.indexOf(i)&&(e=e.substring(e.indexOf(i)+i.length+1)),Object.keys(t.service_data).reduce((i,a)=>{if(-1==e.indexOf(a))return i;let s=e.substring(e.indexOf(a)+a.length+1);return s==t.service_data[a]?i+e.length+s.length+1:i},0)},ja=(e,t,i,a=!1,s=!1)=>{const o=ha(e,i);let n,r=o.name||"",l=Object.fromEntries(Object.entries(e.service_data).filter(([e,t])=>Ue(t)).map(([a,s])=>{var o;const n=va(e.service,null===(o=e.target)||void 0===o?void 0:o.entity_id,a,t,i);return n?[a,pa(s,n,t)]:[a,null]}).filter(([e,t])=>Ue(t)));if(a){if(Object.keys(l).length>1){const e=(e,t)=>{const i=!!o.fields&&o.fields[e]||{},a=!!o.fields&&o.fields[t]||{};return(null==i?void 0:i.optional)&&!a.optional?1:(null==a?void 0:a.optional)&&!i.optional||e<t?-1:e>t?1:0};return l=Object.fromEntries(Object.entries(l).sort(([t],[i])=>e(t,i))),Object.values(l).join(", ")}if(Object.keys(l).length)return Object.values(l)[0]}if((null==o?void 0:o.translation_key)&&!r){let i="";if(Array.isArray(o.translation_key)){let t=o.translation_key;t.sort((t,i)=>{let a=$a(t,e),s=$a(i,e);return a!=s?s-a:t.length-i.length}),i=t[0]}else i=o.translation_key;r=Qi(i,t,Object.keys(l).map(e=>`{${e}}`),Object.values(l))}else{const i=ea(e.service),a=Xi(e.service);r||(r=na(`component.${i}.services.${a}.name`,t,!1)),!r&&Object.keys(t.services[i]||{}).includes(a)&&(r=t.services[i][a].name||""),r||(r=a.replace(/_/g," "))}let d,c=0;for(;(n=wa.exec(r))&&c<100;){c++;let t=n[1].match(xa);r=t&&Object.keys(e.service_data||{}).includes(t[1])&&Object.keys(l).includes(t[1])?r.replace(n[0],n[1].replace(t[0],l[t[1]])):r.replace(n[0],"")}for(c=0;(d=xa.exec(r))&&c<100;)c++,r=Object.keys(l).includes(d[1])?r.replace(d[0],l[d[1]]):r.replace(d[0],"");if(s&&null!==/<.+?>/g.exec(r)){r=(new DOMParser).parseFromString(r,"text/html").body.textContent||""}return r},Oa=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},za=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],Sa=(e,t,i)=>{let a;if(e instanceof Date){e.getDay();if(a=ge.Friday,Oa())return e.toLocaleDateString(i.locale.language,{weekday:t});e.getDay();a=ge.Friday}else a=e;switch(a){case ge.Daily:return Qi(`ui.components.date.day_types_${t}.daily`,i);case ge.Workday:return Qi(`ui.components.date.day_types_${t}.workdays`,i);case ge.Weekend:return Qi(`ui.components.date.day_types_${t}.weekend`,i);case ge.Monday:case ge.Tuesday:case ge.Wednesday:case ge.Thursday:case ge.Friday:case ge.Saturday:case ge.Sunday:let e=new Date(2017,1,26),s=za.findIndex(e=>e==a);return Oa()?(e.setDate(e.getDate()+s),e.toLocaleDateString(i.locale.language,{weekday:t})):za[s];default:return""}},Ca=e=>{let t=e.locale.first_weekday;if(t&&"language"!=t)return Aa.map(e=>e.toLowerCase()).findIndex(e=>e==t);if("weekInfo"in Intl.Locale.prototype)return new Intl.Locale(e.locale.language).weekInfo.firstDay%7;{const t="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),i="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),a=["ar","arq","arz","fa"],s="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g),o=e.locale.language.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return o[1]?i.includes(o[4])?0:t.includes(o[4])?6:1:s.includes(o[1])?0:a.includes(o[1])?6:1}},Aa=[ge.Sunday,ge.Monday,ge.Tuesday,ge.Wednesday,ge.Thursday,ge.Friday,ge.Saturday],Ea=(e,t,i)=>{const a=Ca(i);let s=((e,t)=>e.concat(e).slice(t,t+e.length))(Aa,a);e.sort((e,t)=>s.findIndex(t=>t==e)-s.findIndex(e=>e==t));const o=e.filter(e=>s.includes(e)).map(e=>s.findIndex(t=>t==e)),n=(e=>{const t=[];for(let i=0;i<e.length-1;i++){let a=i+1;for(;e[a]-e[a-1]==1;)a++;t.push(a-i)}return t})(o),r=Math.max(...n);if(o.length){if(6==o.length){const e=[0,1,2,3,4,5,6].filter(e=>!o.includes(e)),a=Sa(s[e.pop()],t,i);return Qi("ui.components.date.repeated_days_except",i,"{excludedDays}",a)}const e=o.map(e=>Sa(s[e],t,i));if(o.length>=3&&r>=3){const t=n.reduce((e,t,i)=>t==r?i:e,0);e.splice(t,r,Qi("ui.components.date.days_range",i,["{startDay}","{endDay}"],[e[t],e[t+r-1]]))}const a=e.length>1?`${e.slice(0,-1).join(", ")} ${na("ui.common.and",i)} ${e.pop()}`:""+e.pop();return o.length>=3&&r>=3?a:Qi("ui.components.date.repeated_days",i,"{days}",a)}return e.map(e=>Sa(e,t,i)).join(", ")},Ta=(e,t,i)=>{const a=Object.entries(i||{}).filter(([t,i])=>ia(t,e)&&i.name).map(([e,t])=>t.name);return a.length?a[0]:Object.keys(t.states).includes(e)&&t.states[e].attributes.friendly_name?t.states[e].attributes.friendly_name:Xi(e).replace(/_/g," ")},Ma=(e,t,i,a)=>{const s=t=>{var o,n;switch(t){case fe.Action:const r=e.entries[0].slots[e.next_entries[0]||0].actions[0];return oa(ja(r,i,a));case fe.Days:return oa(Ea(e.entries[0].weekdays,"long",i));case fe.Name:return oa(e.name||"");case fe.AdditionalTasks:{const t=e.entries[0].slots.length-1;return t>0?"+"+Qi("ui.panel.overview.additional_tasks",i,"{number}",String(t)):""}case fe.AdditionalTaskInfo:return Da(e,i,a);case fe.Entity:const l=e.entries[0].slots[e.next_entries[0]||0].actions[0];let d=[(null===(o=l.target)||void 0===o?void 0:o.entity_id)||[]].flat();!d.length&&["script","notify"].includes(ea(l.service))&&(d=[l.service]);const c=d.map(e=>Ta(e,i,a)).join(", ");return oa(c);case fe.RelativeTime:return"<relative-time></relative-time>";case fe.Tags:return(null===(n=e.tags)||void 0===n?void 0:n.map(e=>`<tag>${e}</tag>`).join(""))||"";case fe.Time:const u=e.entries[0].slots[e.next_entries[0]||0];return oa(((e,t,i)=>{const a=ra(e,t,i);return oa(t?Qi("ui.components.time.interval",i,["{startTime}","{endTime}"],a):Qi("ui.components.time.absolute",i,"{time}",a[0]))})(u.start,u.stop,i));case fe.Default:const h=s(fe.Name);return h||`${s(fe.Entity)}: ${s(fe.Action)}`;default:const m=/\{([^\}]+)\}/;let p;for(;p=m.exec(t);){const e=s(String(p[1])),i=Array.isArray(e)?e.join("<br/>"):String(e);t=t.replace(p[0],i)}return t}};return[...[t].flat()].flatMap(e=>{const t=s(e);return(Array.isArray(t)?t:[t]).filter(e=>Boolean(e))})},Da=(e,t,i)=>{var a,s,o;const n=null===(a=e.entries)||void 0===a?void 0:a[0],r=(null==n?void 0:n.slots)||[];if(!r.length)return[];const l=e.entity_id?t.states[e.entity_id]:void 0,d=l?"off"!==l.state:!1!==e.enabled,c=e=>"number"==typeof e&&Number.isFinite(e)?e:"string"==typeof e&&e.trim().length&&!Number.isNaN(Number(e))?Number(e):void 0,u=c(null===(s=null==l?void 0:l.attributes)||void 0===s?void 0:s.current_slot),h=c(null===(o=e.next_entries)||void 0===o?void 0:o[0]),m="number"==typeof u?u:d&&"number"==typeof h&&r.length?(h+r.length-1)%r.length:void 0,p="number"==typeof u?u:"number"==typeof h?d&&"number"==typeof m?m:h:0;return r.map((e,t)=>(p+t)%r.length).map(e=>{var a;const s=r[e],o=null===(a=s.actions)||void 0===a?void 0:a[0];let n=o?ja(o,t,i,!1,!0):"";(null==n?void 0:n.trim())||(n=Qi("ui.panel.overview.additional_task_info.no_action",t)),n=oa(n);const l=ra(s.start,s.stop,t).map(oa),c=s.stop?`${l[0]} → ${l[1]}`:l[0],u=["slot-info"],h=d&&"number"==typeof m&&e===m;return u.push(h?"slot-info--active":"slot-info--inactive"),d||u.push("slot-info--disabled"),`<span class="${u.join(" ")}">${n}: ${c}</span>`})},La=(e,t)=>{const i=new Date(e.timestamps[e.next_entries[0]]).valueOf(),a=new Date(t.timestamps[t.next_entries[0]]).valueOf(),s=(new Date).valueOf(),o=i<s&&a<s;return null!==i&&null!==a?i<s&&a>=s?1:i>=s&&a<s?-1:i>a?o?-1:1:i<a?o?1:-1:e.entity_id<t.entity_id?1:-1:null!==a?1:null!==i?-1:e.entity_id<t.entity_id?1:-1},Na=(e,t,i)=>{const a=[t.sort_by].flat();return a.includes("relative-time")&&(e=e.sort(La)),a.includes("title")&&(e=e.sort((e,a)=>((e,t,i,a,s)=>{try{const o=Ma(e,i,a,s).join(),n=Ma(t,i,a,s).join();return sa(o,n)}catch(e){return 0}})(e,a,t.display_options.primary_info,i,t.customize))),a.includes("state")&&(e=e.sort((e,t)=>((e,t,i,a)=>{var s,o;const n=null===(s=i.states[e.entity_id])||void 0===s?void 0:s.state,r=null===(o=i.states[t.entity_id])||void 0===o?void 0:o.state,l=["on","triggered"].includes(n),d=["on","triggered"].includes(r);if(l&&!d)return-1;if(!l&&d)return 1;if(a){if("off"!=n&&"off"==r)return 1;if("off"==n&&"off"!=r)return-1}return 0})(e,t,i,a.includes("relative-time")))),e},Pa=(e,t)=>e.callWS({type:"scheduler/item",schedule_id:t}).then(e=>Oe(e)),Ia=(e,t,i,a)=>{a=a||{},i=null==i?{}:i;const s=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,e.dispatchEvent(s),s},qa=e=>e.callWS({type:"scheduler/tags"});var Ra="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",Ha="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",Va="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Fa="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",Ba="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z",Ua="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";const Wa={alarm_control_panel:"mdi:alarm-light-outline",air_quality:"mdi:air-filter",alert:"mdi:alert",automation:"mdi:robot",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",camera:"mdi:camera",calendar:"mdi:calendar",cover:"mdi:window-shutter",climate:"mdi:thermostat",configurator:"mdi:cog",conversation:"mdi:microphone-message",counter:"mdi:counter",date:"mdi:calendar",datetime:"mdi:calendar-clock",demo:"mdi:home-assistant",device_tracker:"mdi:account",fan:"mdi:fan",google_assistant:"mdi:google-assistant",group:"mdi:google-circles-communities",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",humidifier:"mdi:air-humidifier",image_processing:"mdi:image-filter-frames",image:"mdi:image",input_boolean:"mdi:toggle-switch",input_button:"mdi:button-pointer",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",lawn_mower:"mdi:robot-mower",light:"mdi:lightbulb",lock:"mdi:lock-open-outline",media_player:"mdi:cast-connected",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",number:"mdi:ray-vertex",persistent_notification:"mdi-bell",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:palette",schedule:"mdi:calendar-clock",script:"mdi:script-text",select:"mdi:format-list-bulleted",sensor:"mdi:eye",simple_alarm:"mdi:bell",siren:"mdi:bullhorn",stt:"mdi:microphone-message",sun:"mdi:white-balance-sunny",switch:"mdi:flash",text:"mdi:form-textbox",time:"mdi:clock",timer:"mdi:timer-outline",todo:"mdi:clipboard-list",tts:"mdi:speaker-message",vacuum:"mdi:robot-vacuum",valve:"mdi:valve-closed",wake_word:"mdi:chat-sleep",water_heater:"mdi:water-boiler",weather:"mdi:weather-partly-cloudy",zone:"mdi:map-marker-radius"},Za=e=>Object.keys(Wa).includes(e)?Wa[e]:"mdi:help",Ka=(e,t)=>{let i=Object.keys(e.services).filter(e=>((e,t)=>{let i=Object.keys(la).includes(e);return!i&&t?Object.keys(t).map(ea).includes(e):i})(e,t.customize));return i=i.filter(e=>((t.include||[]).map(ea).some(t=>ia(ea(t),e))||Object.keys(t.customize||{}).map(ea).some(t=>ia(ea(t),e)))&&!(t.exclude||[]).some(t=>ia(t,e))),i.map(t=>Object({key:t,name:na(`component.${t}.title`,e,!1)||t.replace(/_/g," "),description:"",icon:Za(t)}))},Ga=1,Ja=2,Ya=e=>(...t)=>({_$litDirective$:e,values:t});class Qa{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const Xa=Ya(class extends Qa{constructor(e){var t;if(super(e),e.type!==Ga||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const a=e[i];return null==a?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach(e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const a=t[e];if(null!=a){this.ht.add(e);const t="string"==typeof a&&a.endsWith(" !important");e.includes("-")||t?i.setProperty(e,t?a.slice(0,-11):a,t?"important":""):i[e]=a}}return R}}),es={alarm_control_panel:{disarmed:"mdi:lock-open-variant-outline",armed_away:"mdi:exit-run",armed_home:"mdi:home-outline",armed_night:"mdi:power-sleep",armed_custom_bypass:"mdi:security",armed_vacation:"mdi:shield-airplane",triggered:"mdi:alarm-light-outline"},binary_sensor:{battery:{on:"mdi:battery-outline",off:"mdi:battery"},battery_charging:{on:"mdi:battery-charging",off:"mdi:battery"},cold:{on:"mdi:snowflake",off:"mdi:thermometer"},connectivity:{on:"mdi:server-network",off:"mdi:server-network-off"},door:{on:"mdi:door-open",off:"mdi:door-closed"},garage_door:{on:"mdi:garage-open",off:"mdi:garage"},power:{on:"mdi:power-plug",off:"mdi:power-plug-off"},gas:{on:"mdi:alert-circle",off:"mdi:check-circle"},problem:{on:"mdi:alert-circle",off:"mdi:check-circle"},safety:{on:"mdi:alert-circle",off:"mdi:check-circle"},tamper:{on:"mdi:alert-circle",off:"mdi:check-circle"},smoke:{on:"mdi:smoke",off:"mdi:check-circle"},heat:{on:"mdi:fire",off:"mdi:thermometer"},light:{on:"mdi:brightness-7",off:"mdi:brightness-5"},lock:{on:"mdi:lock-open",off:"mdi:lock"},moisture:{on:"mdi:water",off:"mdi:water-off"},motion:{on:"mdi:run",off:"mdi:walk"},occupancy:{on:"mdi:home",off:"mdi:home-outline"},opening:{on:"mdi:square-outline",off:"mdi:square"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:home",off:"mdi:home-outline"},running:{on:"mdi:play",off:"mdi:stop"},sound:{on:"mdi:music-note",off:"mdi:music-note-off"},update:{on:"mdi:package-up",off:"mdi:package"},vibration:{on:"mdi:vibrate",off:"mdi:crop-portrait"},window:{on:"mdi:window-open",off:"mdi:window-closed"},_:{on:"mdi:checkbox-marked-circle",off:"mdi:radiobox-blank"}},calendar:{on:"mdi:flash",off:"mdi:flash-off"},cover:{garage:{closed:"mdi:garage",open:"mdi:garage-open"},door:{closed:"mdi:door-closed",open:"mdi:door-open"},blind:{closed:"mdi:blinds",open:"mdi:blinds-open"},window:{closed:"mdi:window-closed",open:"mdi:window-open"},_:{closed:"mdi:window-shutter",open:"mdi:window-shutter-open"}},climate:{off:"mdi:power-off",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:thermometer",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"},device_tracker:{home:"mdi:home-outline",not_home:"mdi:exit-run"},fan:{on:"mdi:power",off:"mdi:power-off"},humidifier:{on:"mdi:power",off:"mdi:power-off"},input_boolean:{on:"mdi:flash",off:"mdi:flash-off"},light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off"},lawn_mower:{mowing:"mdi:play",paused:"mdi:pause",docked:"mdi:home-import-outline"},lock:{unlocked:"mdi:lock-open-variant-outline",locked:"mdi:lock-outline"},person:{home:"mdi:home-outline",not_home:"mdi:exit-run"},sun:{below_horizon:"mdi:weather-sunny-off",above_horizon:"mdi:weather-sunny"},switch:{on:"mdi:flash",off:"mdi:flash-off"},timer:{active:"mdi:play",paused:"mdi:pause",idle:"mdi:sleep"},valve:{open:"mdi:valve-open",closed:"mdi:valve-closed"},water_heater:{off:"mdi:power-off",eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:hvac",high_demand:"mdi:water-plus-outline",performance:"mdi:rocket-launch-outline"}},ts=(e,t,i)=>{const a=ea(e);if(!Object.keys(es).includes(a))return;let s=es[a];if("object"==typeof Object.values(s)[0]){const t=i.states[e],a=null==t?void 0:t.attributes.device_class;s=a&&Object.keys(s).includes(a)?s[a]:s._}return Object.keys(s).includes(t)?s[t]:void 0},is=["alarm_control_panel","binary_sensor","climate","calendar","cover","device_tracker","fan","humidifier","input_boolean","input_number","input_select","lawn_mower","light","lock","number","person","proximity","select","sensor","sun","switch","timer","valve","water_heater"],as=(e,t,i)=>{let a=((e,t)=>{const i=Object.keys(t.states).includes(e)?t.states[e]:void 0,a=ea(e),s=(null==i?void 0:i.attributes)||{},o=i=>null==i?void 0:i.map(i=>Object({value:i,icon:ts(e,i,t)}));switch(a){case"alarm_control_panel":let e=["disarmed","triggered"];return 2&(s.supported_features||0)&&(e=[...e,"armed_away"]),1&(s.supported_features||0)&&(e=[...e,"armed_home"]),4&(s.supported_features||0)&&(e=[...e,"armed_night"]),16&(s.supported_features||0)&&(e=[...e,"armed_custom_bypass"]),32&(s.supported_features||0)&&(e=[...e,"armed_vacation"]),ca({options:o(e),translation_key:"component.alarm_control_panel.entity_component._.state.${value}"});case"binary_sensor":return ca({options:o(["on","off"]),translation_key:"component.binary_sensor.entity_component.${deviceClass}.state.${value}"});case"climate":return ca({options:o(s.hvac_modes),translation_key:"component.climate.entity_component._.state.${value}"});case"calendar":case"fan":case"humidifier":case"input_boolean":case"light":case"switch":return ca({options:o(["on","off"]),translation_key:"component.switch.entity_component._.state.${value}"});case"cover":return ca({options:o(["open","closed"]),translation_key:"component.cover.entity_component._.state.${value}"});case"device_tracker":return ca({options:o(["home","not_home"]),translation_key:"component.device_tracker.entity_component._.state.${value}"});case"input_number":case"number":return _a({min:s.min,max:s.max,step:s.step,mode:s.mode,unit:s.unit_of_measurement});case"input_select":case"select":return ca({options:s.options});case"lawn_mower":return ca({options:o(["mowing","paused","docked"]),translation_key:"component.lawn_mower.entity_component._.state.${value}"});case"lock":return ca({options:o(["locked","unlocked"]),translation_key:"component.lock.entity_component._.state.${value}"});case"person":const a=Object.keys(t.states).filter(e=>"zone"==ea(e)).map(Xi);return ca({options:[...new Set(["home","not_home",...a])]});case"proximity":return _a({mode:"box",unit:s.unit_of_measurement});case"sensor":return isNaN(Number(null==i?void 0:i.state))?{text:{}}:_a({mode:"box",unit:s.unit_of_measurement,min:"%"==s.unit_of_measurement?0:void 0,max:"%"==s.unit_of_measurement?100:void 0});case"sun":return ca({options:o(["above_horizon","below_horizon"]),translation_key:"component.sun.entity_component._.state.${value}"});case"timer":return ca({options:o(["active","paused","idle"]),translation_key:"component.timer.entity_component._.state.${value}"});case"valve":return ca({options:o(["open","closed"]),translation_key:"component.valve.entity_component._.state.${value}"});case"water_heater":case"climate":return ca({options:o(s.operation_list),translation_key:"component.climate.entity_component._.state.${value}"});default:return{text:{}}}})(e,t),s=Object.keys(i).filter(t=>ia(t,ea(e))||ia(t,e)).filter(e=>Object.keys(i[e]).includes("states")).sort((e,t)=>e.length-t.length).map(e=>i[e].states).shift();return s&&(Array.isArray(s)?a=ca({options:s}):"object"==typeof s&&"min"in s&&"max"in s&&(a=_a(s))),a},ss=(e,t)=>{let i=Object.keys(e.states).map(e=>ea(e)).reduce((e,t)=>e.includes(t)?e:[...e,t],[]).filter(e=>((e,t)=>{let i=is.includes(e);return!i&&t?Object.keys(t).map(ea).includes(e):i})(e,t.customize||{}));return i=i.filter(e=>((t.include||[]).some(t=>ia(ea(t),e))||Object.keys(t.customize||{}).some(t=>ia(ea(t),e)))&&!(t.exclude||[]).some(t=>ia(t,e))),i.map(t=>Object({key:t,name:na(`component.${t}.title`,e,!1)||t.replace(/_/g," "),description:"",icon:Za(t)}))},os=(e,t,i)=>{if(!Object.keys(i.states).includes(e))return"mdi:help";let a=Object.entries(t).filter(([t,i])=>ia(t,e)&&i.icon).map(([e,t])=>t);if(a.length)return a.map(e=>{return(t=e.icon).match(/^[a-z]+\:[a-zA-Z\-]+$/)?t:"mdi:"+t;var t}).shift();const s=i.states[e];if(s.attributes.icon)return s.attributes.icon;const o=ea(e);return Za(o)},ns=(e,t,i)=>{if(["script","notify"].includes(e)){let a=Object.keys(i.services[e]);"script"==e&&(a=a.filter(e=>!["turn_on","turn_off","reload","toggle","test"].includes(e)));let s=a.map(a=>{var s;return Object({key:`${e}.${a}`,name:i.states[`${e}.${a}`]?ta(`${e}.${a}`,null===(s=i.states[`${e}.${a}`])||void 0===s?void 0:s.attributes):i.services[e][a].name,description:"",icon:i.states[`${e}.${a}`]?os(`${e}.${a}`,t,i):Za(e)})});return s.sort((e,t)=>sa(e.name,t.name)),s}{let a=Object.keys(i.states).filter(t=>ea(t)==e).map(e=>{var a;return Object({key:e,name:ta(e,null===(a=i.states[e])||void 0===a?void 0:a.attributes),description:"",icon:os(e,t,i)})});return a.sort((e,t)=>sa(e.name,t.name)),a}},rs=(e,t)=>t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t));let ls=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0,this.expandedGroups=[],this.scheduleEntities=[]}async showDialog(e){this._params=e,this.loadOptions(),await this.updateComplete}async closeDialog(){this._params&&this._params.confirm({domains:this._params.domains,entities:this._params.entities}),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}loadOptions(){let e=(e=>{let t=Ka(e,{include:["*"]}),i=ss(e,{include:["*"]});return i=i.filter(e=>!t.map(e=>e.key).includes(e.key)),t=[...t,...i],t.sort((e,t)=>sa(e.name,t.name)),t})(this.hass);this.options=e.map(e=>Object(Object.assign(Object.assign({},e),{entities:ns(e.key,this._params.cardConfig.customize,this.hass)})))}shouldUpdate(e){return!!(e.has("_params")||e.has("expandedGroups")||e.has("_filter")||e.has("scheduleEntities"))}async firstUpdated(){this.scheduleEntities=Object.entries(await Se(this.hass)).map(([,e])=>e.entity_id)}render(){return this._params?q`
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
              .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Va}
            ></ha-icon-button>
            <span slot="title">
              ${Qi("ui.dialog.entity_picker.title",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${na("ui.common.search",this.hass)}
            aria-label=${na("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${na("ui.common.clear",this.hass)}
                  .path=${Va}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${Xa({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_clearSearch(){this._search="",this._filter=""}_toggleSelectEntity(e){let t=e.target;for(;"MWC-LIST-ITEM"!=t.tagName;)t=t.parentElement;t.querySelector("ha-checkbox");const i=t.getAttribute("key");this._params.entities.includes(i)?this._params=Object.assign(Object.assign({},this._params),{entities:this._params.entities.filter(e=>e!=i)}):this._params=Object.assign(Object.assign({},this._params),{entities:[...this._params.entities,i]})}_toggleSelectDomain(e){var t;let i=e.target;for(;"MWC-LIST-ITEM"!=i.tagName;)i=i.parentElement;const a=i.getAttribute("key"),s=null===(t=this.options)||void 0===t?void 0:t.find(e=>e.key==a).entities.map(e=>e.key);this._params.domains.includes(a)?this._params=Object.assign(Object.assign({},this._params),{domains:this._params.domains.filter(e=>e!=a),entities:this._params.entities.filter(e=>!(null==s?void 0:s.includes(e)))}):this._params=Object.assign(Object.assign({},this._params),{domains:[...this._params.domains,a]}),e.stopPropagation()}closeGroupByKey(e){this.shadowRoot.querySelector("mwc-list").childNodes.forEach(t=>{if(t.nodeType==Node.ELEMENT_NODE&&"MWC-LIST-ITEM"==t.tagName&&t.getAttribute("key")==e){const e=t,i=e.nextElementSibling,a=e.querySelector("ha-icon-button");i.style.height="0px",e.removeAttribute("expanded"),a.classList.remove("expanded")}})}async _toggleExpandGroup(e){let t=e.target;for(;"MWC-LIST-ITEM"!=t.tagName;)t=t.parentElement;const i=t.querySelector("ha-icon-button"),a=t.getAttribute("key");this.expandedGroups.includes(a)||(this.expandedGroups.forEach(e=>this.closeGroupByKey(e)),this.expandedGroups=[a],await this.requestUpdate());const s=t.nextElementSibling,o=s.scrollHeight;t.hasAttribute("expanded")?(t.removeAttribute("expanded"),i.classList.remove("expanded"),s.style.height="0px",setTimeout(()=>{this.expandedGroups=this.expandedGroups.filter(e=>e!=a)},300)):(t.setAttribute("expanded","true"),i.classList.add("expanded"),s.style.height=o+"px")}_renderOptions(){if(!this.options)return;let e=[...this.options];const t=this._filter&&this._filter.trim().length;if(t){const t=this._filter.toLowerCase().trim().split(" ");e=e.map(e=>rs(e,t)||(e=Object.assign(Object.assign({},e),{entities:(e.entities||[]).filter(e=>rs(e,t))})).entities.length?e:void 0).filter(e=>void 0!==e)}return e.length?Object.keys(e).map(i=>{var a,s;const o=e[i].key,n=null===(a=this._params)||void 0===a?void 0:a.domains.includes(o);let r=[...e[i].entities];"switch"==o&&(r=r.filter(e=>!this.scheduleEntities.includes(e.key)));const l=n?r.length:r.filter(e=>{var t;return null===(t=this._params)||void 0===t?void 0:t.entities.includes(e.key)}).length;return q`
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
              @click=${this._toggleSelectDomain}
              size="small"
            >
              ${(null===(s=this._params)||void 0===s?void 0:s.domains.includes(o))||e[i].entities.every(e=>{var t;return null===(t=this._params)||void 0===t?void 0:t.entities.includes(e.key)})?na("ui.components.media-browser.file_management.deselect_all",this.hass):na("ui.components.subpage-data-table.select_all",this.hass)}
            </ha-button>
            <ha-icon-button .path="${Ra}" @click=${e=>{e.target.blur()}} class="chevron"></ha-icon-button>
          </div>
          <span>${e[i].name}</span>
          <span slot="secondary">${Qi("ui.panel.card_editor.fields.entities.included_number",this.hass,["{number}","{total}"],[l,r.length])}</span>
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
            <ha-state-icon .stateObj=${this.hass.states[e.key]} .hass=${this.hass} slot="graphic"></ha-state-icon>
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
          ${na("ui.components.entity.entity-picker.no_match",this.hass)}
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
    `}};t([de({attribute:!1})],ls.prototype,"hass",void 0),t([ce()],ls.prototype,"_params",void 0),t([ce()],ls.prototype,"_search",void 0),t([ce()],ls.prototype,"_filter",void 0),t([ce()],ls.prototype,"_width",void 0),t([ce()],ls.prototype,"_height",void 0),t([ce()],ls.prototype,"expandedGroups",void 0),t([ce()],ls.prototype,"options",void 0),t([ce()],ls.prototype,"scheduleEntities",void 0),ls=t([re("dialog-select-entities")],ls);var ds=Object.freeze({__proto__:null,get DialogSelectEntities(){return ls}});let cs=class extends oe{constructor(){super(...arguments),this.active=!1}render(){return q`
      <div class="chip ${this.active?"active":""}" @click=${this._handleClick}>
        <div class="overlay"></div>
        ${this.renderIcon()}
        <span class="value"><slot></slot></span>
        ${this.renderTrailingIcon()}
      </div>
    `}renderIcon(){if(!this.icon&&!this.toggleable&&!this.useStateIcon)return H;if(this.toggleable)return q`
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
          ${this.disabled?H:q`<ha-tooltip for="${e}">${na("ui.common.remove",this.hass)}</ha-tooltip>`}
        </div>
      `:H}_handleClick(e){if(!this.disabled){if(this.toggleable){this.active=!this.active;const e=new CustomEvent("click",{detail:{active:this.active,value:this.value}});this.dispatchEvent(e)}else{const e=new CustomEvent("click",{detail:{value:this.value}});this.dispatchEvent(e)}e.stopPropagation()}}_iconClick(e){if(e.stopPropagation(),this.disabled)return;const t=new CustomEvent("icon-clicked",{detail:{value:this.value}});this.dispatchEvent(t)}static get styles(){return r`
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
    `}};t([de({attribute:!1})],cs.prototype,"hass",void 0),t([de({type:String})],cs.prototype,"icon",void 0),t([de({type:Boolean})],cs.prototype,"useStateIcon",void 0),t([de({type:Boolean})],cs.prototype,"selectable",void 0),t([de({type:Boolean})],cs.prototype,"removable",void 0),t([de({type:Boolean})],cs.prototype,"toggleable",void 0),t([de({type:Boolean})],cs.prototype,"active",void 0),t([de({type:String})],cs.prototype,"badge",void 0),t([de({type:String})],cs.prototype,"value",void 0),t([de({type:Boolean})],cs.prototype,"disabled",void 0),cs=t([re("scheduler-chip")],cs);let us=class extends oe{constructor(){super(...arguments),this.value=[]}render(){return this.items?q`
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
      `}_handleClick(e){if(!this.disabled)if(this.toggleable){const t=e.detail.value,i=e.detail.active;this.value.includes(t)&&!i?this.value=this.value.filter(e=>e!=t):!this.value.includes(t)&&t&&(this.value=[...this.value,t]);const a=new CustomEvent("value-changed",{detail:this.value});this.dispatchEvent(a)}else{const t=new CustomEvent("value-changed",{detail:e.detail.value});this.dispatchEvent(t)}}static get styles(){return r`
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
    `}};t([de({attribute:!1})],us.prototype,"hass",void 0),t([de({attribute:!1})],us.prototype,"items",void 0),t([de({attribute:!1})],us.prototype,"value",void 0),t([de({type:Boolean})],us.prototype,"selectable",void 0),t([de({type:Boolean})],us.prototype,"toggleable",void 0),t([de({type:Boolean})],us.prototype,"removable",void 0),t([de({type:Boolean})],us.prototype,"disabled",void 0),us=t([re("scheduler-chip-set")],us);let hs=class extends oe{constructor(){super(...arguments),this.autofocus=!1,this.disabled=!1,this.hideClearIcon=!1,this._opened=!1,this._isOpening=!1,this._items=[],this._getItems=()=>{const e=(this.getItems?this.getItems():[]).sort((e,t)=>sa(e.primary,t.primary));return e.length||e.push({id:"___no_matching_items_found___",primary:Qi("ui.dialog.entity_picker.no_results",this.hass),icon:"mdi:cancel"}),e}}shouldUpdate(e){return!!(e.has("value")||e.has("label")||e.has("disabled"))||!(!e.has("_opened")&&this._opened)}willUpdate(e){e.has("_opened")&&this._opened&&(this._items=this._getItems())}render(){const e=!!this.value&&!this.disabled&&!this.hideClearIcon;return q`
      ${this.label?q`<label ?disabled=${this.disabled}>${this.label}</label>`:H}
      <div class="container">
        ${this._opened?q`
            <ha-combo-box
              item-id-path="id"
              item-value-path="id"
              item-label-path="a11y_label"
              clear-initial-value
              .hass=${this.hass}
              .value=${this._value}
              .label=${this.label}
              .helper=${this.helper}
              .allowCustomValue=${this.allowCustomValue}
              .filteredItems=${this._items}
              .renderer=${this.rowRenderer}
              .disabled=${this.disabled}
              .hideClearIcon=${this.hideClearIcon}
              @opened-changed=${this._openedChanged}
              @value-changed=${this._valueChanged}
              @filter-changed=${this._filterChanged}
            >
            </ha-combo-box>
            `:q`

          <ha-combo-box-item
            .disabled=${this.disabled}
            type="button"
            compact
            class="textInput"
            @click=${this.open}

          >
            ${this.value?this.valueRenderer?this.valueRenderer(this.value):q`<span slot="headline">${this.value}</span>`:q`
              <span slot="headline" class="placeholder">
                ${this.placeholder||Qi("ui.dialog.entity_picker.choose",this.hass)}
              </span>
            `}
            ${e?q`
                <ha-icon-button
                  class="clear"
                  slot="end"
                  @click=${this._clear}
                  .path=${Va}
                ></ha-icon-button>
                `:H}
            <ha-svg-icon
              class="arrow"
              slot="end"
              .path=${"M7,10L12,15L17,10H7Z"}
            ></ha-svg-icon>
          </ha-combo-box-item>
            `}
      </div>
      ${this._renderHelper()}
    `}get _value(){return this.value||""}_renderHelper(){return this.helper?q`<ha-input-helper-text .disabled=${this.disabled}
          >${this.helper}</ha-input-helper-text
        >`:H}_valueChanged(e){var t;e.stopPropagation(),this._comboBox.setTextFieldValue("");const i=null===(t=e.detail.value)||void 0===t?void 0:t.trim();"___no_matching_items_found___"!==i&&(this._items.find(e=>e.id==i)||this.allowCustomValue)&&i!==this._value&&this._setValue(i)}_filterChanged(e){if(!this._opened)return;let t=this._items;const i=e.target,a=e.detail.value.trim().split(" ").map(String).filter(e=>e.length).map(e=>e.trim());a.length&&(t=t.filter(e=>a.every(t=>{var i;return e.primary.includes(t)||(null===(i=e.secondary)||void 0===i?void 0:i.includes(t))}))),i.filteredItems=t}_clear(e){e.stopPropagation(),this._setValue(void 0)}_setValue(e){this.value=e,Ia(this,"value-changed",{value:e})}async focus(){var e;await this.updateComplete,await(null===(e=this._comboBox)||void 0===e?void 0:e.focus())}async open(){var e;this._opened=!0,this._isOpening=!0,await this.updateComplete,null===(e=this._comboBox)||void 0===e||e.focus(),this._comboBox.open(),this._comboBox.value=""}async _openedChanged(e){var t;const i=e.detail.value;e.stopPropagation(),this._isOpening?this._isOpening=!1:this._opened&&!i&&(this._opened=!1,await this.updateComplete,null===(t=this._field)||void 0===t||t.focus())}static get styles(){return[r`
        .container {
          position: relative;
          display: block;
        }
        label[disabled] {
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.6));
        }
        label {
          display: block;
          margin: 0 0 8px;
        }
        ha-input-helper-text {
          display: block;
          margin: 8px 0 0;
        }

        ha-combo-box-item.textInput[disabled] {
          background-color: var(
            --mdc-text-field-disabled-fill-color,
            whitesmoke
          );
        }
        ha-combo-box-item.textInput {
          background-color: var(--mdc-text-field-fill-color, whitesmoke);
          border-radius: 4px;
          border-end-end-radius: 0;
          border-end-start-radius: 0;
          --md-list-item-one-line-container-height: 56px;
          --md-list-item-two-line-container-height: 56px;
          --md-list-item-top-space: 0px;
          --md-list-item-bottom-space: 0px;
          --md-list-item-leading-space: 8px;
          --md-list-item-trailing-space: 8px;
          --ha-md-list-item-gap: 8px;
          /* Remove the default focus ring */
          --md-focus-ring-width: 0px;
          --md-focus-ring-duration: 0s;
        }

        /* Add Similar focus style as the text field */
        ha-combo-box-item.textInput[disabled]:after {
          background-color: var(
            --mdc-text-field-disabled-line-color,
            rgba(0, 0, 0, 0.42)
          );
        }
        ha-combo-box-item.textInput:after {
          display: block;
          content: "";
          position: absolute;
          pointer-events: none;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          width: 100%;
          background-color: var(
            --mdc-text-field-idle-line-color,
            rgba(0, 0, 0, 0.42)
          );
          transform:
            height 180ms ease-in-out,
            background-color 180ms ease-in-out;
        }

        ha-combo-box-item.textInput:focus:after {
          height: 2px;
          background-color: var(--mdc-theme-primary);
        }
        .clear {
          margin: 0 -8px;
          --mdc-icon-button-size: 32px;
          --mdc-icon-size: 20px;
        }
        .arrow {
          --mdc-icon-size: 20px;
          width: 32px;
        }
        .placeholder {
          color: var(--secondary-text-color);
          padding: 0 8px;
        }
      `]}};t([de({attribute:!1})],hs.prototype,"hass",void 0),t([de({type:Boolean})],hs.prototype,"autofocus",void 0),t([de({type:Boolean})],hs.prototype,"disabled",void 0),t([de({type:Boolean,attribute:"allow-custom-value"})],hs.prototype,"allowCustomValue",void 0),t([de()],hs.prototype,"label",void 0),t([de()],hs.prototype,"value",void 0),t([de()],hs.prototype,"helper",void 0),t([de()],hs.prototype,"placeholder",void 0),t([de({type:String,attribute:"search-label"})],hs.prototype,"searchLabel",void 0),t([de({attribute:"hide-clear-icon",type:Boolean})],hs.prototype,"hideClearIcon",void 0),t([de({attribute:!1,type:Array})],hs.prototype,"getItems",void 0),t([de({attribute:!1,type:Array})],hs.prototype,"getAdditionalItems",void 0),t([de({attribute:!1})],hs.prototype,"rowRenderer",void 0),t([de({attribute:!1})],hs.prototype,"valueRenderer",void 0),t([de({attribute:"not-found-label",type:String})],hs.prototype,"notFoundLabel",void 0),t([he(".textInput")],hs.prototype,"_field",void 0),t([he("ha-combo-box")],hs.prototype,"_comboBox",void 0),t([ce()],hs.prototype,"_opened",void 0),hs=t([re("scheduler-picker")],hs);let ms=class extends oe{constructor(){super(...arguments),this.value=[],this.multiple=!1,this.disabled=!1,this.multipleMode=!1,this.scheduleEntities=[],this._valueRenderer=e=>{Array.isArray(e)&&(e=e.length?e.pop():"");const t=e||"",i=this.hass.states[t];if(!i)return q`
        <ha-svg-icon
          slot="start"
          .path=${Ba}
          style="margin: 0 4px"
        ></ha-svg-icon>
        <span slot="headline">${t}</span>
      `;const a=this._parseEntityItem(t);return q`
      ${a.icon?q`
        <ha-icon
          slot="start"
          icon="${a.icon}"
        ></ha-icon>
       `:q`
      <state-badge
        .hass=${this.hass}
        .stateObj=${i}
        slot="start"
        color="var(--icon-primary-color)"
      ></state-badge>
      `}
      <span slot="headline">${a.primary}</span>
      <span slot="supporting-text">${a.secondary}</span>
    `},this.rowRenderer=e=>{const t=e.id||"",i=this.hass.states[t];return q`
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
            .path=${Ba}
          ></ha-svg-icon>
        `}
        <span slot="headline">${e.primary}</span>
        ${e.secondary?q`<span slot="supporting-text">${e.secondary}</span>`:H}
      </ha-combo-box-item>
    `},this._filteredItems=()=>{let e=Object.keys(this.hass.states);return this.domain&&(e=e.filter(e=>ea(e)==this.domain)),this.multiple&&(e=e.filter(e=>{var t;return!(null===(t=this.value)||void 0===t?void 0:t.includes(e))})),this.config&&(e=e.filter(e=>((this.config.include||[]).some(t=>ia(t,e))||Object.keys(this.config.customize||{}).some(t=>ia(t,e)))&&!(this.config.exclude||[]).some(t=>ia(t,e)))),e=e.filter(e=>!this.scheduleEntities.includes(e)),e.map(e=>this._parseEntityItem(e))}}async firstUpdated(){this.scheduleEntities=Object.entries(await Se(this.hass)).map(([,e])=>e.entity_id),this._autoSelectIfSingleEntity()}updated(e){super.updated(e),e.has("domain")&&this._autoSelectIfSingleEntity()}_autoSelectIfSingleEntity(){if(this.value&&this.value.length>0)return;const e=this._filteredItems();1===e.length&&(this.value=[e[0].id],Ia(this,"value-changed",{value:this.value}))}render(){var e;return q`
      ${this.renderChips()}

      ${(null===(e=this.value)||void 0===e?void 0:e.length)&&!this.multipleMode&&this.multiple?H:q`
      <scheduler-picker
        .hass=${this.hass}
        allow-custom-value
        .getItems=${this._filteredItems}
        .rowRenderer=${this.rowRenderer}
        .valueRenderer=${this._valueRenderer}
        @value-changed=${this._valueChanged}
        ?disabled=${this.disabled}
        .value=${this.multiple?"":this.value}
      >
      </scheduler-picker>
      `}
    `}renderChips(){if(!this.multiple)return H;let e=(this.value||[]).map(e=>{const t=this._parseEntityItem(e);return{name:t.primary,value:e,useStateIcon:!t.icon,icon:t.icon}});return q`
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
        .path=${this.multipleMode?"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z":Ra}
        slot="end"
      ></ha-icon-button>
      `:H}
      </div>
      </div>
      `}_valueChanged(e){let t=e.detail.value;const i=e.currentTarget;t&&(this.value=[...this.value||[],t],this.multiple&&(i.value=""),Ia(this,"value-changed",{value:this.value}),e.stopPropagation())}_removeClick(e){const t=e.detail;this.value=(this.value||[]).filter(e=>e!==t),Ia(this,"value-changed",{value:this.value})}_parseEntityItem(e){var t,i,a,s;const o=Object.entries((null===(t=this.config)||void 0===t?void 0:t.customize)||{}).filter(([t,i])=>ia(t,e)).map(([e,t])=>t),n=null===(i=o.find(e=>"name"in e))||void 0===i?void 0:i.name,r=null===(a=o.find(e=>"icon"in e))||void 0===a?void 0:a.icon;return{id:e,primary:n||ta(e,null===(s=this.hass.states[e])||void 0===s?void 0:s.attributes),secondary:e,icon:r}}};ms.styles=r`
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
  `,t([de({attribute:!1})],ms.prototype,"hass",void 0),t([de()],ms.prototype,"domain",void 0),t([de()],ms.prototype,"config",void 0),t([de({type:Array})],ms.prototype,"value",void 0),t([de({type:Boolean})],ms.prototype,"multiple",void 0),t([de({type:Boolean})],ms.prototype,"disabled",void 0),t([ce()],ms.prototype,"multipleMode",void 0),t([ce()],ms.prototype,"scheduleEntities",void 0),ms=t([re("scheduler-entity-picker")],ms);let ps=class extends oe{constructor(){super(...arguments),this.expanded=!1,this.disabled=!1,this.idx=-1,this.openClose=new CustomEvent("open-close",{detail:{},bubbles:!0,composed:!0})}render(){return q`
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
    `}_toggleContent(){this.disabled||this.dispatchEvent(this.openClose)}attributeChangedCallback(e,t,i){let a=void 0;if(null!==this.shadowRoot)for(const e of this.shadowRoot.children)if("container"==e.className){a=e;break}if(a)if(this.hasAttribute("expanded")){const e=a.scrollHeight;a.style.height=e+"px"}else a.style.height="0px";super.attributeChangedCallback(e,t,i)}_focusChanged(e){this.disabled||this.shadowRoot.querySelector(".header").classList.toggle("focused","focus"===e.type)}static get styles(){return r`
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
    `}};t([de({type:Boolean,reflect:!0})],ps.prototype,"expanded",void 0),t([de({type:Boolean,reflect:!0})],ps.prototype,"disabled",void 0),t([de({attribute:!0})],ps.prototype,"idx",void 0),t([de({type:CustomEvent})],ps.prototype,"openClose",void 0),ps=t([re("scheduler-collapsible-section")],ps);let _s=class extends oe{set openedItem(e){e!==this._openedItem&&void 0!==e&&setTimeout(()=>{this.updateOpenedItem(e)},50)}constructor(){super(),this.disabled=!1,this._openedItem=-1,this._numItems=0,this.addEventListener("open-close",this.toggleActiveSection)}firstUpdated(){const e=this.querySelectorAll("scheduler-collapsible-section");this._numItems=e.length}toggleActiveSection(e){if(this.disabled)return;const t=e.target,i=Number(t.getAttribute("idx"));"true"===t.getAttribute("expanded")?this.updateOpenedItem(-1):this.updateOpenedItem(i)}updateOpenedItem(e){this.querySelectorAll("scheduler-collapsible-section").forEach((function(t){const i=Number(t.getAttribute("idx"));i!==e&&t.getAttribute("expanded")?t.removeAttribute("expanded"):i!==e||t.getAttribute("expanded")||t.setAttribute("expanded","true")})),this._openedItem=e;const t=new CustomEvent("openclose-changed",{detail:{item:e}});this.dispatchEvent(t)}render(){return q`
      <slot></slot>
    `}};t([de()],_s.prototype,"disabled",void 0),t([ce()],_s.prototype,"_openedItem",void 0),t([ce()],_s.prototype,"_numItems",void 0),_s=t([re("scheduler-collapsible-group")],_s);let gs=class extends oe{constructor(){super(...arguments),this.disabled=!1}render(){if(this.config.select){const e=this.config.select,t=[this.value||[]].flat().map(String),i=e=>{const i=e.detail;this.value=t.filter(e=>e!=i),Ia(this,"value-changed",{value:this.value})},a=()=>{let e=t.map(e=>Object({name:e,value:e}));return q`
        <scheduler-chip-set
          .hass=${this.hass}
          .items=${e}
          removable
          @value-changed=${i}
        >
        </scheduler-chip-set>`},s=e=>{var t;let i=null===(t=this.config.select)||void 0===t?void 0:t.translation_key,a="";return i&&(a=na(i.replace("${value}",e),this.hass,!1)),a||(a=e),a},o=()=>{const i=e=>"object"==typeof e?{id:e.value,primary:s(e.label),icon:e.icon}:{id:e,primary:s(e)};let a=[...null==e?void 0:e.options].map(i),o=[this.value||[]].flat().map(String);return a=[...a,...o.filter(e=>!a.find(t=>t.id==e)).map(i)],Array.isArray(this.value)&&(a=a.filter(e=>"object"==typeof e?!t.includes(e.id):!t.includes(e))),a},n=t=>{let i=t,a="",o=e.options.find(e=>"object"==typeof e?e.value===t:e===t);return o&&"object"==typeof o?(i=s(o.label),a=o.icon||a):i=s(t),a?q`
            <ha-icon
              slot="start"
              .icon=${a}
              style="margin: 0 4px"
            >
            </ha-icon>
            <span slot="headline">${i}</span>
          `:q`
            <span slot="headline">${i}</span>
          `},r=e=>e.icon?q`
            <ha-combo-box-item type="button" compact>
              <ha-icon
                slot="start"
                .icon=${e.icon}
              >
              </ha-icon>
              <span slot="headline">${e.primary}</span>
            </ha-combo-box-item>
          `:q`
            <ha-combo-box-item type="button" compact>
              <span slot="headline">${e.primary}</span>
            </ha-combo-box-item>
          `;return q`
          <div class="select-wrapper">
        ${e.multiple?q`
          <div class="chips">
          ${a()}
          </div>
        `:""}
        <scheduler-picker
          .hass=${this.hass}
          ?allow-custom-value=${e.custom_value}
          .getItems=${o}
          .rowRenderer=${r}
          .valueRenderer=${n}
          @value-changed=${this._valueChanged}
          .value=${Array.isArray(this.value)?"":this.value||""}
          ?disabled=${this.disabled}
        >
        </scheduler-picker>
        </div>
      `}if(this.config.number){const e=this.config.number;let t=e.min||0,i=e.max||255,a="number"==typeof this.value?this.value:t;"number"==typeof e.scale_factor&&(a/=e.scale_factor),"number"==typeof(null==e?void 0:e.step)&&(a=Math.round(a/e.step)*e.step),a=ma(a);const s=t=>{let i=Number(t.target.value);"number"==typeof e.scale_factor&&(i*=e.scale_factor),"number"==typeof(null==e?void 0:e.step)&&(i=Math.round(i/e.step)*e.step),i=ma(i),this._valueChanged(new CustomEvent("value-changed",{detail:{value:i}})),t.stopPropagation()};return q`
        <div class="slider-wrapper">
        <ha-slider
          .min=${t}
          .max=${i}
          .step=${e.step||1}
          .value=${a}
          @change=${s}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${a} ${e.unit||""}</span>
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
      `}if(this.config.boolean){let e={select:{options:[{value:"true",label:"True",icon:"mdi:check"},{value:"false",label:"False",icon:"mdi:close"}]}};const t=e=>{let t=Ue(e.detail.value)?"true"===e.detail.value:void 0;e.stopPropagation(),this._valueChanged(new CustomEvent("value-changed",{detail:{value:t}}))};return q`
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${e}
          .value=${"boolean"==typeof this.value?this.value?"true":"false":void 0}
          @value-changed=${t}
          ?disabled=${this.disabled}
        >
        </scheduler-combo-selector>
      `}return q``}_valueChanged(e){if(e.stopPropagation(),Array.isArray(this.value)){let t=e.detail.value;if(!t)return;this.value=[...this.value,t],e.target.value=""}else if(e.detail){let t=e.detail.value;void 0===t&&(t=null),this.value=t}else this.value=e.target.value;Ia(this,"value-changed",{value:this.value})}};gs.styles=r`
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
  `,t([de({attribute:!1})],gs.prototype,"hass",void 0),t([de({attribute:!1})],gs.prototype,"config",void 0),t([de()],gs.prototype,"value",void 0),t([de()],gs.prototype,"disabled",void 0),gs=t([re("scheduler-combo-selector")],gs);let vs=class extends oe{constructor(){super(...arguments),this._config=He,this.title="",this.tagOptions=[]}setConfig(e){this._config=Object.assign(Object.assign({},He),e)}async firstUpdated(){this.title="string"==typeof this._config.title?this._config.title:"";const e=(await qa(this.hass)).map(e=>e.name);e.sort(sa),this.tagOptions=e}render(){const e={number:{min:0,max:30,step:1,unit_of_measurement:Qi("ui.panel.card_editor.fields.time_step.unit_minutes",this.hass)}},t={select:{options:this.tagOptions,multiple:!0,custom_value:!0}};return q`
      <div class="card-config">

        <ha-button @click=${this._showIncludedEntitiesDialog} outlined>
          ${Qi("ui.panel.card_editor.fields.entities.button_label",this.hass)}
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
          <span slot="heading">${Qi("ui.panel.card_editor.fields.title.heading",this.hass)}</span>

          <ha-textfield
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${Qi("ui.panel.common.title",this.hass)}
            ?disabled=${!1===this._config.title}
          ></ha-textfield>

        </scheduler-settings-row>

        <div class="two-columns" style="margin: 10px 0px 15px 0px">
        <div class="column">
          <ha-formfield label="${Qi("ui.panel.card_editor.fields.discover_existing.heading",this.hass)}">
            <ha-switch
              ?checked=${!1!==this._config.discover_existing}
              @change=${e=>{this._updateConfig({discover_existing:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="column">
          <ha-formfield label="${Qi("ui.panel.card_editor.fields.show_header_toggle.heading",this.hass)}">
            <ha-switch
              ?checked=${this._config.show_header_toggle}
              @change=${e=>{this._updateConfig({show_header_toggle:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

        <scheduler-settings-row>
          <span slot="heading">${Qi("ui.panel.card_editor.fields.time_step.heading",this.hass)}</span>

          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${e}
            .value=${this._config.time_step||He.time_step}
            @value-changed=${e=>{this._updateConfig({time_step:e.detail.value})}}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>

        <span>${Qi("ui.panel.card_editor.fields.default_editor.heading",this.hass)}</span>
        <div class="two-columns">
          <div class="column">
            <ha-formfield label="${Qi("ui.panel.card_editor.fields.default_editor.options.single",this.hass)}">
              <ha-radio
                name="default_editor"
                value="${_e.Single}"
                @change=${()=>{this._updateConfig({default_editor:_e.Single})}}
                ?checked=${this._config.default_editor==_e.Single}
              >
              </ha-radio>
            </ha-formfield>
          </div>
          <div class="column">
            <ha-formfield label="${Qi("ui.panel.card_editor.fields.default_editor.options.scheme",this.hass)}">
              <ha-radio
                name="default_editor"
                value="${_e.Scheme}"
                @change=${()=>{this._updateConfig({default_editor:_e.Scheme})}}
                ?checked=${this._config.default_editor==_e.Scheme}
              >
              </ha-radio>
            </ha-formfield>
          </div>
        </div>

          <span slot="heading">${Qi("ui.panel.card_editor.fields.sort_by.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.sort_by.options.relative_time",this.hass)}">
            <ha-radio
              name="sort_by"
              value="relative-time"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes("relative-time")}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.sort_by.options.title",this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes("title")}
            ></ha-radio>
          </ha-formfield>
        </div>
        </div>


          <span>${Qi("ui.panel.card_editor.fields.display_format_primary.heading",this.hass)}</span>


        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_primary.options.default",this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="default"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes("default")}
            >
            </ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_primary.options.entity_action",this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="{entity}: {action}"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes("{entity}: {action}")}
            >
            </ha-radio>
          </ha-formfield>

        </div>

        </div>

          <span>${Qi("ui.panel.card_editor.fields.display_format_secondary.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">
          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_secondary.options.relative_time",this.hass)}">
            <ha-checkbox
              value="relative-time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("relative-time")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_secondary.options.time",this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("time")}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_secondary.options.days",this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("days")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks",this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("additional-tasks")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Qi("ui.panel.card_editor.fields.display_format_secondary.options.additional_task_info",this.hass)}">
            <ha-checkbox
              value="additional-task-info"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("additional-task-info")}
            >
            </ha-checkbox>
          </ha-formfield>
        </div>

        </div>

        <scheduler-settings-row>
          <span slot="heading">${Qi("ui.panel.card_editor.fields.tags.heading",this.hass)}</span>

          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${t}
            .value=${[this._config.tags||[]].flat()}
            @value-changed=${e=>{this._updateConfig({tags:e.detail.value})}}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>

      </div>
    `}_setEnableTitle(e){e.target.checked?this.title.length?this._updateConfig({title:this.title}):this._updateConfig({title:!0}):this._updateConfig({title:!1})}_setTitle(e){const t=e.target.value;this.title=t,t!==Qi("ui.panel.common.title",this.hass)&&t.length?this._updateConfig({title:t}):this._updateConfig({title:!0})}_setSortBy(e){var t;const i=e.target.value;let a=[(null===(t=this._config)||void 0===t?void 0:t.sort_by)||He.sort_by].flat();a=a.filter(e=>"state"==e),a.includes(i)||(a=[...a,i]),this._updateConfig({sort_by:a})}_setDisplayOptionsPrimary(e){var t;const i=e.target.value,a=Object.assign(Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||He.display_options),{primary_info:i});this._updateConfig({display_options:a})}_setDisplayOptionsSecondary(e){var t;const i=e.target.value,a=e.target.checked;let s=Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||He.display_options),o=[s.secondary_info||[]].flat();o=a?Array.from(new Set([...o,i])):o.filter(e=>e!==i),o.sort((e,t)=>{const i={"relative-time":1,time:o.includes("relative-time")?3:2,days:o.includes("relative-time")?2:3,"additional-tasks":4,"additional-task-info":5},a=Object.keys(i).includes(e)?i[e]:5,s=Object.keys(i).includes(t)?i[t]:5;return a>s?1:a<s?-1:0}),s=Object.assign(Object.assign({},s),{secondary_info:[...o]}),this._updateConfig({display_options:s})}async _showIncludedEntitiesDialog(e){let t=this._config.include.filter(e=>!e.includes(".")),i=this._config.include.filter(e=>e.includes("."));await new Promise(a=>{const s={cancel:()=>a(null),confirm:e=>a(e),domains:t,entities:i,cardConfig:this._config};Ia(e.target,"show-dialog",{dialogTag:"dialog-select-entities",dialogImport:()=>Promise.resolve().then((function(){return ds})),dialogParams:s})}).then(e=>{e&&this._updateConfig({include:[...e.domains,...e.entities]})})}_updateConfig(e){this._config&&(this._config=Object.assign(Object.assign({},this._config),e),Ia(this,"config-changed",{config:this._config}))}};vs.styles=r`
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
  `,t([de({attribute:!1})],vs.prototype,"hass",void 0),t([de()],vs.prototype,"_config",void 0),t([de()],vs.prototype,"title",void 0),t([de()],vs.prototype,"tagOptions",void 0),vs=t([re("scheduler-card-editor")],vs);const ys=r`
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

`,fs=(r`
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


`,(e,t,i,a)=>{var s;const o=e.service,n=null===(s=e.target)||void 0===s?void 0:s.entity_id,r=ha(e,a);if(!r||!r.fields||!Object.keys(r.fields).includes(t))return!1;const l=r.fields[t];if(null===va(o,n,t,i,a))return!1;if(Object.keys(e.service_data||{}).includes(t))return!0;if(l.supported_features){if(![n||[]].flat().every(e=>{if(!Object.keys(i.states).includes(e))return!1;return((i.states[e].attributes.supported_features||0)&l.supported_features)>0}))return!1}return!0});var bs;!function(e){e.OverlappingTime="overlapping_time",e.MissingTargetEntity="missing_target_entity",e.MissingServiceParameter="missing_service_parameter",e.MissingAction="missing_action"}(bs||(bs={}));const ks=(e,t,i)=>{let a=[];a=[...a,...e.entries.map(e=>((e,t)=>e.every((i,a)=>{const s=Te(i.start,t),o=void 0===i.stop?s:Te(i.stop,t)||86400;return!(s>o)&&e.every((e,i)=>{if(i<=a)return!0;return Te(e.start,t)>=o})})?null:bs.OverlappingTime)(e.slots,t)).filter(e=>null!==e)];let s=e.entries.map(e=>e.slots.map(e=>e.actions)).flat().flat();return s.length||(a=[...a,bs.MissingAction]),a=[...a,...s.map(e=>((e,t,i)=>{var a;const s=ha(e,i);return(null==s?void 0:s.target)&&!(null===(a=e.target)||void 0===a?void 0:a.entity_id)?bs.MissingTargetEntity:(null==s?void 0:s.fields)&&!Object.entries(s.fields).filter(([a])=>fs(e,a,t,i)).every(([a,s])=>{var o,n;let r=va(e.service,null===(o=e.target)||void 0===o?void 0:o.entity_id,a,t,i);const l=!(!r.number||!(null===(n=r.number)||void 0===n?void 0:n.optional))||s.optional;return!(!Object.keys(e.service_data).includes(a)&&!l)&&!(!Ue(e.service_data[a])&&!l)})?bs.MissingServiceParameter:null})(e,t,i)).filter(e=>null!==e)],a.length?a.shift():null},ws=e=>{const t=e=>e.actions.length?(e.stop||(e=Object.fromEntries(Object.entries(e).filter(([e])=>"stop"!=e))),e):null;let i={weekdays:(e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object.assign(Object.assign({},e),{slots:e.slots.map(t).filter(e=>null!==e)}))})).entries[0].weekdays.map(xs),timeslots:e.entries[0].slots.map($s),name:e.name,start_date:e.start_date,end_date:e.end_date,repeat_type:e.repeat_type,tags:e.tags||[]};return e.schedule_id&&(i=Object.assign(Object.assign({},i),{schedule_id:e.schedule_id})),i},xs=e=>{switch(e){case ge.Monday:return"mon";case ge.Tuesday:return"tue";case ge.Wednesday:return"wed";case ge.Thursday:return"thu";case ge.Friday:return"fri";case ge.Saturday:return"sat";case ge.Sunday:return"sun";case ge.Workday:return"workday";case ge.Weekend:return"weekend";default:return"daily"}},$s=e=>({start:e.start,stop:e.stop,actions:e.actions.map(e=>js(e)).flat(),condition_type:e.conditions.items.length?e.conditions.type==ve.And?"and":"or":void 0,conditions:e.conditions.items.length?e.conditions.items:void 0,track_conditions:e.conditions.track_changes}),js=e=>{var t,i;const a=e=>Object.keys(e).filter(t=>Ue(e[t])).reduce((t,i)=>(t[i]=e[i],t),{});if(e.target){if(Array.isArray(null===(t=e.target)||void 0===t?void 0:t.entity_id)){return null==e?void 0:e.target.entity_id.map(t=>Object({service:e.service,service_data:a(e.service_data),entity_id:t}))}return{service:e.service,service_data:a(e.service_data),entity_id:null===(i=e.target)||void 0===i?void 0:i.entity_id}}return{service:e.service,service_data:a(e.service_data)}},Os=(e,t,i)=>{const a={title:na("state_badge.default.error",i),description:q`
    <b>Something went wrong!</b><br />
    ${e.body.message}<br /><br />
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,primaryButtonLabel:na("ui.common.ok",i),confirm:()=>{},cancel:()=>{}};Ia(t,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return to})),dialogParams:a})},zs=e=>{if(!Object.keys(e).includes("select")||!e.select){if(Object.keys(e).includes("number")&&e.number){const t=e.number.min;return void 0!==t?t:0}return Object.keys(e).includes("boolean")&&e.boolean?void 0:(Object.keys(e).includes("text")&&e.text,"")}e.select.options},Ss=(e,t)=>{const i=ha(e,t),a=ea(e.service),s=Xi(e.service);if(i.icon)return(o=i.icon).match(/^[a-z]+\:[a-zA-Z\-]+$/)?o:"mdi:"+o;if(Object.keys(ga).includes(a)&&Object.keys(ga[a].services).includes(s)){if(void 0!==ga[a].attributes){let t=ga[a].attributes;const i=Object.keys(t).find(t=>Object.keys(e.service_data).includes(t));if(i&&Object.keys(t[i]).includes(e.service_data[i]))return t[i][e.service_data[i]]}return ga[a].services[s]}return Object.keys(ga).includes(a)&&Object.keys(ga[a].services).includes("{entity_id}")?ga[a].services["{entity_id}"]:"mdi:flash";var o},Cs=(e,t,i)=>{let a=Te("string"==typeof e?Ee(e):e,i),s=Te("string"==typeof t?Ee(t):t,i);return s>a?1:s<a?-1:0},As=e=>Ee(e.start),Es=e=>{if(Ue(e.stop)){const t=Ee(e.stop);return 0==t.hours&&0==t.minutes&&t.mode==we.Fixed?Object.assign(Object.assign({},t),{hours:24}):t}return Ce(As(e),{minutes:1})},Ts=(e,t,i,a)=>{let s=t;if(i.stop)return[e,s]=Ts(e,t+1,{start:i.stop},a),[e,s-1];if(i.start){let o=As(e[t]),n=i.start;if(Cs(o,n,a)<0){let i=As(e[t]);for(let a=t-1;a>=0;a--){if(e[a].actions.length){i=a==t-1?Ce(As(e[a]),{minutes:1}):Es(e[a]);break}i=As(e[a])}Cs(i,n,a)<0&&(n=i),e=Object.assign(e,{[t]:Object.assign(Object.assign({},e[t]),{start:qe(n)})});for(let i=t-1;i>=0;i--){let t=Cs(As(e[i]),n,a),o=Cs(Es(e[i]),n,a);if(t>0&&o<0){e=Object.assign(e,{[i]:Object.assign(Object.assign({},e[i]),{stop:qe(n)})});break}if(o>=0)break;t<=0&&(e=Object.assign(e,{[i]:null}),s-=1)}Ue(e[t].stop)||(e=Ue(e[t+1].stop)&&!e[t+1].actions.length?Object.assign(e,{[t+1]:Object.assign(Object.assign({},e[t+1]),{start:qe(Es(e[t]))})}):[...e.slice(0,t+1),Object.assign(Object.assign({},e[t]),{start:qe(Es(e[t])),stop:qe(As(e[t+1])),actions:[]}),...e.slice(t+1)])}else if(Cs(o,n,a)>0){let i=Ce(Es(e[t]),{minutes:-1});if(!Ue(e[t].stop))for(let a=t+1;a<e.length;a++){if(e[a].actions.length){i=a==t+1?Ce(Es(e[a]),{minutes:-1}):As(e[a]);break}i=Es(e[a])}Cs(i,n,a)>0&&Te(i,a)>0&&(n=i),Ue((e=Object.assign(e,{[t]:Object.assign(Object.assign({},e[t]),{start:qe(n)})}))[t-1].stop)?e=Object.assign(e,{[t-1]:Object.assign(Object.assign({},e[t-1]),{stop:qe(n)})}):(e=[...e.slice(0,t),Object.assign(Object.assign({},e[t]),{start:qe(Es(e[t-1])),stop:qe(n),actions:[]}),...e.slice(t)],s=t+1);for(let t=s+1;t<e.length;t++){let i=Cs(As(e[t]),n,a),s=Cs(Es(e[t]),n,a);if(i>0&&s<0)e=Object.assign(e,{[t]:Object.assign(Object.assign({},e[t]),{start:qe(n)})});else{if(i<0)break;s>=0&&(e=Object.assign(e,{[t]:null}))}}}}return[e=e.filter(Ue),s]},Ms=(e,t)=>{const i=new Date(t),a=3600*i.getHours()+60*i.getMinutes()+i.getSeconds();let s=3600*e.hours+60*e.minutes-a;const o=s<0?-1:1;s=Math.abs(s);let n=Math.floor(s/3600),r=Math.round((s-3600*n)/60);return o<0&&(n>0&&(n=-n),r=-r),Ae({hours:n,minutes:r})};let Ds=class extends oe{constructor(){super(),this.selectedSlot=null,this.timeout=0,this.large=!1,this.handleResize=this.handleResize.bind(this)}handleResize(e){clearTimeout(this.timeout),this.timeout=window.setTimeout(()=>{this.requestUpdate()},50)}firstUpdated(){}render(){return q`
      <div class="bar">
        ${this.renderTimeslots()}
      </div>
      <div class="time-bar">
        ${this.renderTimebar()}
      </div>
    `}renderTimebar(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=[1,2,3,4,6,8,12],i=Le(this.hass.locale),a=i?130:100;let s=Math.ceil(24/(e/a));for(;!t.includes(s);)s++;const o=[0,...Array.from(Array(24/s-1).keys()).map(e=>(e+1)*s),24];return o.map((e,t)=>{let a=s/24*100;a=Math.floor(100*a)/100;let n={mode:we.Fixed,hours:e,minutes:0};return 0==t?q`
        <span class="left" style=${Xa({width:a/2+"%"})}>${qe(n,{seconds:!1,am_pm:i})}</span>
      `:t==o.length-1?q`
        <span class="right" style=${Xa({width:a/2+"%"})}>${qe(n,{seconds:!1,am_pm:i})}</span>
      `:q`
        <span style=${Xa({width:a+"%"})}>${qe(n,{seconds:!1,am_pm:i})}</span>
      `})}renderTimeslots(){const e=this.schedule.slots,t=this.computeSlotWidths();return e.map((i,a)=>{let s=Te(i.start,this.hass),o=Te(i.stop||i.start,this.hass);!o&&s&&(o=86400);const n=(o-s)/86400*100,r=i.actions.length?ja(i.actions[0],this.hass,this.config.customize,!0,!0):"",l=parseFloat(getComputedStyle(this).getPropertyValue("width")),d=5*r.length+10,c=a>0?15:0,u=a<e.length-1?15:0,h=n*l/100-c-u,m=e[a+1];return q`
        <div
          class="slot ${this.selectedSlot==a?"selected":""} ${i.actions.length?"":"empty"} ${void 0===i.stop?"short":""}"
          style="${Xa({width:t[a]+"px"})}"
          @click=${this._toggleSelectTimeslot}
          idx="${a}"
        >
          ${i.stop,""}
          ${i.actions.length?r&&(h>d/3||h>50)&&h>30?q`<span style="margin-left: ${c}px; margin-right: ${u}px">${r}</span>`:h>16?q`<ha-icon icon="${Ss(i.actions[0],this.config.customize)}"></ha-icon>`:"":""}
        </div>
        ${a<e.length-1&&i.stop?q`
        <div idx="${a}" class="handle ${this.selectedSlot==a+1||this.selectedSlot==a?"":"hidden"} ${m&&!m.stop?"center":""}">
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
      `})}computeSlotWidths(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=this.schedule.slots;let i=e-3*(t.length-1);const a=t.map(e=>{let t=Te(e.start,this.hass),i=Te(e.stop||e.start,this.hass);return!i&&t&&(i=86400),(i-t)/86400}),s=Math.round(5/i*100)/100;i-=5*a.filter(e=>e<s).length;let o=i;return a.map(e=>{let t=e<s?5:Math.round(e*i);return t>o&&(t=o),o-=t,t})}_toggleSelectTimeslot(e){let t=e.target;"div"!=t.tagName.toLowerCase()&&(t=t.parentElement);const i=Number(t.getAttribute("idx"));this.selectedSlot=this.selectedSlot!==i?i:null;const a=new CustomEvent("update",{detail:{selectedSlot:this.selectedSlot}});this.dispatchEvent(a),e.stopPropagation()}_handleDragStart(e){let t=e.target;for(;"DIV"!==t.tagName;)t=t.parentElement;const i=t.parentElement.getBoundingClientRect(),a=Number(t.getAttribute("idx"));let s=a>0?Te(this.schedule.slots[a-1].stop||this.schedule.slots[a-1].start,this.hass)+900:900,o=(Te(this.schedule.slots[a+1].stop||this.schedule.slots[a+1].start,this.hass)||86400)-900;void 0===this.schedule.slots[a+1].stop&&(o=(Te(this.schedule.slots[a+2].stop||this.schedule.slots[a+2].start,this.hass)||86400)-900);const n=Ee(this.schedule.slots[a+1].start).mode;if([we.Sunrise,we.Sunset].includes(n)){let e=Ee(this.schedule.slots[a+1].start),t=Te(Object.assign(Object.assign({},e),{hours:4,minutes:0}),this.hass),i=Te(Object.assign(Object.assign({},e),{hours:-4,minutes:0}),this.hass);i>s&&(s=i),t<o&&(o=t)}let r=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX,t-=i.left,t>i.width&&(t=i.width),t<0&&(t=0);let r=Math.round(t/i.width*86400);r<s?r=s:r>o&&(r=o);const l=Math.floor(r/3600),d=Math.round((r-3600*l)/60);let c={mode:we.Fixed,hours:l,minutes:d};if([we.Sunrise,we.Sunset].includes(n)){const e=n==we.Sunrise?this.hass.states["sun.sun"].attributes.next_rising:this.hass.states["sun.sun"].attributes.next_setting,t=Ms(c,e);c={mode:n,hours:t.hours,minutes:t.minutes}}c=Ae(c,15);const u=qe(c);let h=[...this.schedule.slots];if(h=Object.assign(h,{[a]:Object.assign(Object.assign({},h[a]),{stop:u}),[a+1]:Object.assign(Object.assign({},h[a+1]),{start:qe(c)})}),void 0===h[a+1].stop){const e=qe(Ce(c,{minutes:1}));h=Object.assign(h,{[a+2]:Object.assign(Object.assign({},h[a+2]),{start:e})})}this.schedule=Object.assign(Object.assign({},this.schedule),{slots:h});const m=new CustomEvent("update",{detail:{slots:h}});this.dispatchEvent(m)};const l=()=>{window.removeEventListener("mousemove",r),window.removeEventListener("touchmove",r),window.removeEventListener("mouseup",l),window.removeEventListener("touchend",l),window.removeEventListener("blur",l),r=()=>{}};window.addEventListener("mouseup",l),window.addEventListener("touchend",l),window.addEventListener("blur",l),window.addEventListener("mousemove",r),window.addEventListener("touchmove",r)}static get styles(){return r`
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
    `}};t([de({attribute:!1})],Ds.prototype,"config",void 0),t([ce()],Ds.prototype,"schedule",void 0),t([ce()],Ds.prototype,"selectedSlot",void 0),t([de({type:Boolean})],Ds.prototype,"large",void 0),t([function(e){return ue({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}({passive:!0})],Ds.prototype,"_handleDragStart",null),Ds=t([re("scheduler-timeslot-editor")],Ds);const Ls=e=>{let t=60*e.hours+e.minutes;return t>240?e=Object.assign(Object.assign({},e),{hours:4,minutes:0}):t<-240&&(e=Object.assign(Object.assign({},e),{hours:-4,minutes:0})),e};let Ns=class extends oe{constructor(){super(...arguments),this.hours=0,this.minutes=0,this.mode=we.Fixed,this.autoValidate=!0,this.required=!0,this.disabled=!1,this.label="",this.useAmPm=!1,this.large=!1,this.stepSize=10}set time(e){const t=Ee(e);this.mode=t.mode,this.hours=t.hours,this.minutes=t.minutes}render(){return q`
      <div class="time-input-wrap">
        <div class="input">
          ${this.label?q`<span class="label">${this.label}</span>`:H}
          ${this.large?H:this._renderTimeMode()}
          <div class="hours">
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({hours:1})}
              ?disabled=${this.mode!=we.Fixed&&4==this.hours}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            `:H}
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
              max=${this.mode==we.Fixed?this.useAmPm?12:23:4}
              min=${this.mode==we.Fixed||this.large?0:-4}
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
              ?disabled=${this.mode!=we.Fixed&&-4==this.hours}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            `:H}
          </div>
          ${this.large?q`<div class="separator">:</div>`:H}
          <div class="minutes">
            ${this.large?q`
            <ha-button
              appearance="plain"
              @click=${()=>this._addTimeOffset({minutes:this.stepSize})}
              ?disabled=${this.mode!=we.Fixed&&4==this.hours}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            `:H}
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
              ?disabled=${this.mode!=we.Fixed&&-4==this.hours}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            `:H}
          </div>
          ${this._renderSuffix()}
          ${this.large?this._renderTimeMode():H}
        </div>
      </div>
    `}_renderTimeMode(){if(!this.hass.states["sun.sun"])return H;if(this.large){const e=()=>{let e=this._convertTimeMode();e.mode!=we.Fixed&&(e=Ls(e)),this.mode=e.mode,this.hours=e.hours,this.minutes=e.minutes,this._valueChanged()};return q`
        <div class="mode">
          ${this.hass.states["sun.sun"]?q`
          <ha-button
            appearance="${this.mode==we.Fixed?"plain":"filled"}"
            variant="${this.mode==we.Fixed?"neutral":"brand"}"
            @click=${e}
          >
            <ha-icon icon="mdi:theme-light-dark"></ha-icon>
          </ha-button>
          `:H}
        </div>
      `}{let e=[we.Fixed,we.Sunrise,we.Sunset];const t={[we.Fixed]:na("ui.components.selectors.selector.types.time",this.hass),[we.Sunrise]:na("ui.panel.config.automation.editor.triggers.type.sun.sunrise",this.hass),[we.Sunset]:na("ui.panel.config.automation.editor.triggers.type.sun.sunset",this.hass)},i={[we.Fixed]:"mdi:clock-outline",[we.Sunrise]:"mdi:weather-sunset-up",[we.Sunset]:"mdi:weather-sunset-down"},a={[we.Fixed]:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",[we.Sunrise]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z",[we.Sunset]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z"},s=e=>{if(e==we.Fixed)return!1;const t=this._convertTimeMode(e);return Math.abs(60*t.hours+t.minutes)>240},o=(e,t)=>{const i=e.detail.index,a=(t=t.filter(e=>e!=this.mode))[i],s=this._convertTimeMode(a);this.hours=s.hours,this.minutes=s.minutes,this.mode=a,e.preventDefault();const o=e.target;setTimeout(()=>{o.firstElementChild.blur()},50),this._valueChanged()};return q`
      <ha-button-menu
        @action=${t=>o(t,e)}
        @closed=${e=>{e.stopPropagation()}}
        fixed
        ?disabled=${this.disabled}
      >
        <ha-icon-button
          slot="trigger"
          .path=${a[this.mode]}
          ?disabled=${this.disabled}
        >
        </ha-icon-button>
        ${e.map(e=>q`
        <mwc-list-item graphic="icon" ?noninteractive=${this.mode==e} ?disabled=${s(e)}>
          ${t[e]}
          <ha-icon
            slot="graphic"
            icon="${i[e]}"
          ></ha-icon>
        </mwc-list-item>
        
        `)}
      </ha-button-menu>
    `}}_renderSuffix(){if(this.large){const e=()=>{let e=Pe(this.hours).am_pm;const t=Pe(this.hours).hours;this.hours=Ie(t,"AM"==e?Ne.PM:Ne.AM),this._valueChanged()},t=()=>{0!=this.hours?this.hours=-this.hours:this.minutes=-this.minutes,this._valueChanged()},i=()=>{this.mode=this.mode==we.Sunrise?we.Sunset:we.Sunrise,this._valueChanged()};return q`
        <div class="suffix">
        ${this.useAmPm&&this.mode==we.Fixed?q`
            <ha-button appearance="plain" @click=${e}>
              <span class="large">
                ${Pe(this.hours).am_pm==Ne.AM?"AM":"PM"}
              </span>
            </ha-button>
          `:H}
        ${this.mode!=we.Fixed?q`
            <ha-button appearance="plain" size="large" @click=${t}>
              <span class="large">
              ${this.hours<0||this.minutes<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").trim().toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").trim().toLowerCase()}
              </span>
            </ha-button>
            <ha-button appearance="plain" @click=${i}>
              <ha-icon icon="${this.mode==we.Sunrise?"mdi:weather-sunny":"mdi:weather-night"}"></ha-icon>
            </ha-button>
         `:H}
        </div>
      `}return this.useAmPm&&this.mode==we.Fixed?q`
        <ha-select
          .required=${this.required}
          .value=${Pe(this.hours).am_pm==Ne.AM?"AM":"PM"}
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
      `:H}_convertTimeMode(e){const t=this.hass.states["sun.sun"].attributes.next_rising,i=this.hass.states["sun.sun"].attributes.next_setting;if(e&&e!=we.Fixed||this.mode==we.Fixed){const a=Ms({hours:this.hours,minutes:this.minutes},t),s=Ms({hours:this.hours,minutes:this.minutes},i),o=60*a.hours+a.minutes,n=60*s.hours+s.minutes;let r=e||Math.abs(o)<=Math.abs(n)?we.Sunrise:we.Sunset,l=r==we.Sunrise?a:s;return{mode:r,hours:l.hours,minutes:l.minutes}}{let e=this.mode==we.Sunrise?Ee(t):Ee(i);return e=Ce(e,{hours:this.hours,minutes:this.minutes}),{mode:we.Fixed,hours:e.hours,minutes:e.minutes}}}_hoursChanged(e){let t=Number(e.target.value);if(this.useAmPm){const e=Pe(this.hours).am_pm;t=Ie(t,e)}this.hours=t,this._valueChanged()}_minutesChanged(e){const t=Number(e.target.value);this.minutes=t,this._valueChanged()}_amPmChanged(e){const t=e.target.value;if(Pe(this.hours).am_pm==t)return;const i=Pe(this.hours).hours;this.hours=Ie(i,"AM"==t?Ne.AM:Ne.PM),this._valueChanged()}_addTimeOffset(e){let t={mode:this.mode,hours:this.hours,minutes:this.minutes};t=Ce(t,e),this.mode!=we.Fixed&&(t=Ls(t)),this.hours=t.hours,this.minutes=t.minutes,this._valueChanged()}_valueChanged(){const e={mode:this.mode,hours:this.hours,minutes:this.minutes};Ia(this,"value-changed",{value:e})}_onFocus(e){e.currentTarget.select()}formatHours(){const e=this.hours<0||this.minutes<0;let t=this.useAmPm&&this.mode==we.Fixed?Pe(this.hours).hours:this.hours;return e&&!this.large?"-"+Math.abs(t).toFixed():this.mode==we.Fixed||this.large?this.large?Math.abs(t):t.toFixed():"+"+Math.abs(t).toFixed()}formatMinutes(){return Math.abs(this.minutes).toString().padStart(2,"0")}};Ns.styles=r`
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
    }
    ha-button span.large {
      font-size: 16px;
      text-transform: uppercase;
    }
  `,t([de({attribute:!1})],Ns.prototype,"hass",void 0),t([ce()],Ns.prototype,"hours",void 0),t([ce()],Ns.prototype,"minutes",void 0),t([ce()],Ns.prototype,"mode",void 0),t([de({type:Boolean})],Ns.prototype,"autoValidate",void 0),t([de({type:Boolean})],Ns.prototype,"required",void 0),t([de({type:Boolean})],Ns.prototype,"disabled",void 0),t([de({type:String})],Ns.prototype,"label",void 0),t([de({type:Boolean})],Ns.prototype,"useAmPm",void 0),t([de({type:Boolean})],Ns.prototype,"large",void 0),t([de({attribute:!1})],Ns.prototype,"stepSize",void 0),Ns=t([re("scheduler-time-picker")],Ns);let Ps=class extends oe{constructor(){super(...arguments),this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=[]}async showDialog(e){this._params=e,await this.updateComplete,this.selectedWeekdays=this._params.weekdays.filter(e=>![ge.Daily,ge.Weekend,ge.Workday].includes(e)),this.weekdayTypeCustomSelected=this.selectedWeekdays.length>0}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?q`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          ${this.weekdayTypeCustomSelected?q`
          <ha-icon-button
            slot="navigationIcon"
            .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Ha}
            @click=${this.backClick}
          ></ha-icon-button>
            `:q`
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Va}
          ></ha-icon-button>
          `};
          <span slot="title">
              ${Qi("ui.dialog.weekday_picker.title",this.hass)}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list>
          ${this._renderWeekdayOptions()}
          </mwc-list>
        </div>

        <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${na("ui.common.cancel",this.hass)}
        </ha-button>
        <ha-button
          appearance="accent"
          slot="primaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
          ?disabled=${!this._params.weekdays.length}
        >
          ${na("ui.common.ok",this.hass)}
        </ha-button>
      </ha-dialog>
    `:q``}_renderWeekdayOptions(){let e=[];if(this.weekdayTypeCustomSelected){e=[ge.Sunday,ge.Monday,ge.Tuesday,ge.Wednesday,ge.Thursday,ge.Friday,ge.Saturday];e=((e,t)=>e.concat(e).slice(t,t+e.length))(e,Ca(this.hass))}else e=[ge.Daily,ge.Workday,ge.Weekend,"Custom"];const t=e=>{var t,i;return"Custom"==e?null===(t=this._params)||void 0===t?void 0:t.weekdays.every(e=>![ge.Daily,ge.Weekend,ge.Workday].includes(e)):null===(i=this._params)||void 0===i?void 0:i.weekdays.includes(e)};return e.map(e=>q`
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${e}"
          ?hasMeta=${"Custom"==e}
        >
          ${t(e)?q`<ha-icon slot="graphic" icon="mdi:check"></ha-icon>`:""}
          ${"Custom"==e?q`
          
            ${oa(Qi("ui.dialog.weekday_picker.choose",this.hass))}
            ${t(e)?q`<span class="badge">${this.selectedWeekdays.length}</span>`:""}
            `:oa(Sa(e,"long",this.hass))}

          ${"Custom"==e?q`<ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>`:""}
        </mwc-list-item>
    `)}_toggleSelectOption(e){const t=e.target.getAttribute("option");let i=[...this._params.weekdays];"Custom"==t?(i=this.selectedWeekdays,this.weekdayTypeCustomSelected=!0):[ge.Daily,ge.Weekend,ge.Workday].includes(t)?(i=[t],this.weekdayTypeCustomSelected=!1):i=i.includes(t)?i.filter(e=>e!=t):[...i,t],this._params=Object.assign(this._params,{weekdays:i}),this.requestUpdate()}confirmClick(){this._params.confirm(this._params.weekdays)}cancelClick(){this._params.cancel()}backClick(){this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=this._params.weekdays.filter(e=>![ge.Daily,ge.Weekend,ge.Workday].includes(e))}static get styles(){return r`
      ha-dialog {
        --dialog-content-padding: 0px;
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
    `}};t([de({attribute:!1})],Ps.prototype,"hass",void 0),t([ce()],Ps.prototype,"_params",void 0),t([ce()],Ps.prototype,"weekdayTypeCustomSelected",void 0),Ps=t([re("dialog-select-weekdays")],Ps);var Is=Object.freeze({__proto__:null,get DialogSelectWeekdays(){return Ps}});const qs=(e,t)=>((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()),Rs=(e,t,i)=>{const a=Object.keys(e.services).includes(t)?Object.keys(e.services[t]).filter(a=>{if(!Object.keys(la).includes(t))return!1;let s=Object.keys(la[t]).includes(a);return!s&&Object.keys(la[t]).includes("{entity_id}")&&(s=((i.include||[]).some(e=>ia(e,`${t}.${a}`))||Object.keys(i.customize||{}).some(e=>ia(e,`${t}.${a}`)))&&!(i.exclude||[]).some(e=>ia(e,`${t}.${a}`)),s&&(s=Object.keys(e.states).includes(`${t}.${a}`))),s}):[],s=t=>na(`component.${t}.title`,e,!1)||t.replace(/_/g," "),o=i=>na(`component.${t}.services.${i}.name`,e,!1)||!!e.services[t]&&!!e.services[t][i]&&e.services[t][i].name||i.replace(/_/g," "),n=i=>{let a=na(`component.${t}.services.${i}.description`,e,!1);return a||(a=e.services[t][i].description),a||"script"!=t||(a=na(`component.${t}.services.turn_on.description`,e,!1)),a};let r=a.map(i=>Object({key:i,name:`${s(t)}: ${o(i)}`,description:n(i),icon:Object.keys(ga).includes(t)&&Object.keys(ga[t].services).includes(i)?ga[t].services[i]:Za(t),action:{service:i.includes(".")?i:`${t}.${i}`,service_data:{},target:e.services[t][i].target?{}:void 0}})),l=(d=i.customize||{},c=t,Object.keys(d).filter(e=>{var t;return null===(t=d[e].exclude_actions)||void 0===t?void 0:t.length}).filter(e=>!c||!c.includes(".")&&ia(ea(e),c)||ia(e,c)).map(e=>d[e].exclude_actions).flat().filter(Ue));var d,c;return l.length&&(r=r.filter(t=>!l.some(a=>qs(Xi(t.action.service),a)>0||qs(ja(t.action,e,i.customize),a)>0))),ua(i.customize||{},t).forEach(e=>{let i=e.service;for(;r.find(e=>e.key==i);)i+="_2";e.variables&&Object.entries(e.variables).forEach(([t,i])=>{let a=ba(i),s=zs(a);!Ue(e.service_data[t])&&Ue(s)&&(e=Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{[t]:s})}))}),r.push({key:i,name:`${s(t)}: ${Hs(e.name||o(Xi(e.service)))}`,description:Hs(e.name||""),icon:e.icon||Za(t),action:{service:e.service.includes(".")?e.service:`${t}.${e.service}`,service_data:e.service_data||{},target:e.target?e.target:void 0,name:e.name,icon:e.icon}})}),r},Hs=e=>{if(null!==/<.+?>/g.exec(e)){e=(new DOMParser).parseFromString(e,"text/html").body.textContent||""}let t;for(;t=/\[([^\]]+)\]/.exec(e);)e=e.replace(t[0],"");for(;t=/\{([^\}]+)\}/.exec(e);)e=e.replace(t[0],"");return e};let Vs=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0,this.lockDomain=!1}async showDialog(e){this._params=e,e.domainFilter&&(this.lockDomain=!0),await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title"),this.hass.loadBackendTranslation("services")}render(){return this._params?q`
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
              .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Va}
            ></ha-icon-button>
            `:q`
            <ha-icon-button
              slot="navigationIcon"
              .label=${na("ui.common.back",this.hass)}
              .path=${Ha}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${Qi("ui.dialog.action_picker.title",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${na("ui.common.search",this.hass)}
            aria-label=${na("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${na("ui.common.clear",this.hass)}
                  .path=${Va}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${Xa({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_renderOptions(){var e;if(null===(e=this._params)||void 0===e?void 0:e.domainFilter)return this._renderDomainActions();const t=Ka(this.hass,this._params.cardConfig);return 1===t.length?(this._params=Object.assign(Object.assign({},this._params),{domainFilter:[t[0].key]}),this._renderDomainActions()):this._renderDomainList(t)}_renderDomainList(e){e.sort((e,t)=>sa(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))}));let t=[];for(var i=e.length;i<7;i++)t.push(0);return Object.keys(e).length?q`
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
            ${na("ui.components.combo-box.no_match",this.hass)}
          </mwc-list-item>
        `}_renderDomainActions(){var e;let t=this._params.domainFilter.map(e=>Rs(this.hass,e,this._params.cardConfig)).flat();return(null===(e=this._params.entityFilter)||void 0===e?void 0:e.length)&&(t=t.filter(e=>{var t;return null===(t=this._params.entityFilter)||void 0===t?void 0:t.every(t=>(!Object.keys(e.action.service_data).includes("entity_id")||e.action.service_data.entity_id==t)&&(!Object.keys(e.action.target||{}).includes("entity_id")||(e.action.target||{}).entity_id==t))})),this._filter&&(t=t.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(t).length?Object.keys(t).map(e=>q`
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
            ${na("ui.components.combo-box.no_match",this.hass)}
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
    `}};t([de({attribute:!1})],Vs.prototype,"hass",void 0),t([ce()],Vs.prototype,"_params",void 0),t([ce()],Vs.prototype,"_search",void 0),t([ce()],Vs.prototype,"_filter",void 0),t([ce()],Vs.prototype,"_width",void 0),t([ce()],Vs.prototype,"_height",void 0),t([ce()],Vs.prototype,"lockDomain",void 0),Vs=t([re("dialog-select-action")],Vs);var Fs=Object.freeze({__proto__:null,get DialogSelectAction(){return Vs}});let Bs=class extends oe{constructor(){super(...arguments),this.showPrefix=!1}render(){return q`
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
    `}};t([de({type:Boolean})],Bs.prototype,"showPrefix",void 0),Bs=t([re("scheduler-settings-row")],Bs);let Us=class extends oe{constructor(){super(...arguments),this.selectedSlot=null,this.large=!1,this.selectedEntry=0}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){return q`
    ${this.schedule.entries.map((e,t)=>q`
      
      <div class="editor-header">
        <div class="weekdays">
          <span>
            ${Qi("ui.panel.editor.repeated_days",this.hass)}:
            ${Ea(e.weekdays,"short",this.hass)}
          </span>
          <ha-icon-button .path=${Fa} @click=${e=>this._showWeekdayDialog(e,t)}></ha-icon-button>
        </div>
        <div class="weekdays-actions">
        <ha-button appearance="plain" size="small" @click=${this.toggleViewMode}>
          ${this.viewMode==_e.Scheme?Qi("ui.panel.editor.toggle_single_mode",this.hass):Qi("ui.panel.editor.toggle_scheme_mode",this.hass)}
          <ha-icon slot="end" icon="mdi:swap-horizontal"></ha-icon>
        </ha-button>
        </div>
      </div>

      ${this.viewMode==_e.Scheme?q`
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
            ?useAmPm=${Le(this.hass.locale)}
            .stepSize=${this.config.time_step}
            large
          >
          </scheduler-time-picker>
      `}
    `)}

    ${this.renderSlot()}
    `}toggleViewMode(){const e=this.viewMode==_e.Scheme?_e.Single:_e.Scheme;this.dispatchEvent(new CustomEvent("setViewMode",{detail:e}))}renderActionButtons(){if(null===this.selectedSlot||null===this.selectedEntry)return q``;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start,t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].stop||e,i=Te(e,this.hass),a=(Te(t,this.hass)||86400)-i;return q`
      <div class="actions">
        <ha-icon-button .path=${Ha} @click=${e=>{this._updateSelectedSlot(this.selectedSlot-1),e.target.blur()}} ?disabled=${null===this.selectedSlot||this.selectedSlot<1}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"} @click=${e=>{this._updateSelectedSlot(this.selectedSlot+1),e.target.blur()}} ?disabled=${null===this.selectedSlot||this.selectedSlot>this.schedule.entries[this.selectedEntry].slots.length-2}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M19,6H22V8H19V11H17V8H14V6H17V3H19V6M17,17V14H19V19H3V6H11V8H5V17H17Z"} @click=${this._addTimeslot} ?disabled=${a<1800}>
        </ha-icon-button>
        <ha-icon-button .path=${Ua} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length<=2}>
        </ha-icon-button> 
      </div>
    `}renderSlot(){if(null===this.selectedEntry||null===this.selectedSlot)return q`
        <div class="slot-placeholder"> 
          ${Qi("ui.panel.editor.select_timeslot",this.hass)}
        </div>
      `;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];let t=e.stop;return!t&&this.selectedSlot<this.schedule.entries[this.selectedEntry].slots.length-1&&(t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot+1].start),t||(t=e.start),q`
      ${this.viewMode==_e.Scheme?q`
      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${Qi("ui.panel.editor.start_time",this.hass)}:"
            ?disabled=${0==this.selectedSlot}
            .time=${e.start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${Le(this.hass.locale)}
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
            label="${Qi("ui.panel.editor.stop_time",this.hass)}:"
            ?disabled=${void 0===e.stop||this.selectedSlot==this.schedule.entries[this.selectedEntry].slots.length-1}
            .time=${t}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${Le(this.hass.locale)}
          >
          </scheduler-time-picker>
          </div>
        </div>
      </div>`:""}

      ${Qi("ui.panel.editor.action",this.hass)}:
      ${this._renderActionConfig()}
    `}_renderActionConfig(){var e,t,i,a;const s=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]),o=s.actions.length?s.actions[0]:void 0;if(!o)return q`
      <div>
        <ha-button appearance="plain"
          @click=${this._showActionDialog}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${Qi("ui.panel.editor.add_action",this.hass)}
        </ha-button>
      </div>
    `;const n=ha(o,this.config.customize),r=(null===(e=n.target)||void 0===e?void 0:e.domain)||ea(o.service),l=Ue(null===(t=null==n?void 0:n.target)||void 0===t?void 0:t.entity_id)||this.schedule.entries[this.selectedEntry].slots.some(e=>{var t,i;return e.actions.length&&Ue(null===(i=null===(t=ha(e.actions[0],this.config.customize))||void 0===t?void 0:t.target)||void 0===i?void 0:i.entity_id)});if(void 0===n)return q``;const d=Object.keys(n.fields||{}).filter(e=>fs(o,e,this.hass,this.config.customize));let c="",u=[(null===(i=o.target)||void 0===i?void 0:i.entity_id)||[]].flat();return!u.length&&["notify","script"].includes(r)&&(u=[o.service]),u.length&&(c+=u.map(e=>Ta(e,this.hass,this.config.customize)).join(", "),c+=": "),c+=ja(o,this.hass,this.config.customize,!1,!0),q`
      <scheduler-collapsible-section
        ?expanded=${!0}
        ?disabled=${!0}
      >
        <div slot="header" class="header">
          <ha-icon slot="icon" icon="${Ss(o,this.config.customize)}"></ha-icon>
          <span>${oa(c)}</span>
        </div>
        <ha-icon-button slot="contextMenu" .path=${Ua} @click=${this._removeAction}></ha-icon-button>
        <div slot="content">

          ${n.target?q`
          <scheduler-settings-row>
            <span slot="heading">${na("ui.components.entity.entity-picker.entity",this.hass)}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${r}
              @value-changed=${this._selectEntity}
              .value=${[(null===(a=o.target)||void 0===a?void 0:a.entity_id)||[]].flat()}
              ?multiple=${!0}
              ?disabled=${l}
            >
            </scheduler-entity-picker>
          </scheduler-settings-row>
          `:""}

          ${d.map(e=>{var t;const i=va(o.service,null===(t=o.target)||void 0===t?void 0:t.entity_id,e,this.hass,this.config.customize);if(null===i)return"";let a=n.fields[e].optional||(i.number||{}).optional;const s=!a||Object.keys(o.service_data).includes(e);return q`
            <scheduler-settings-row ?showPrefix=${a}>
              ${a?q`
                <ha-checkbox
                  slot="prefix"
                  ?checked=${s}
                  @change=${t=>this._toggleOptionalField(t,e,i)}
                >
                </ha-checkbox>
              `:""}
              <span slot="heading">
                ${((e,t,i,a)=>{var s;const o=ea(e.service),n=Xi(e.service);let r=na(`component.${o}.services.${n}.fields.${t}.name`,i,!1);!r&&i.services[o]&&i.services[o][e.service]&&i.services[o][e.service].fields&&i.services[o][e.service].fields[t]&&(r=String(i.services[o][e.service].fields[t].name));const l=["script","notify"].includes(o)?[e.service]:[(null===(s=e.target)||void 0===s?void 0:s.entity_id)||[]].flat();let d=ua(a||{},l.length?l[0]:o);if(d.length){let i=d.map(i=>{if(i.service!=e.service||!Object.keys(i.variables||{}).includes(t))return null;return(i.variables||{})[t].name}).filter(e=>void 0!==e);if(i.length)return i[0]}return r||(r=t.replace(/_/g," ")),r})(o,e,this.hass,this.config.customize)}
              </span>
              <scheduler-combo-selector
                .hass=${this.hass}
                .config=${i}
                ?disabled=${!s}
                .value=${Object.keys(o.service_data).includes(e)?o.service_data[e]:void 0}
                @value-changed=${t=>this._selectField(e,t)}
              >
              </scheduler-combo-selector>
            </scheduler-settings-row>
          `})}
        </div>
      </scheduler-collapsible-section>
    `}_selectField(e,t){const i=t.detail.value,a=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);let s=void 0!==i?Object.assign(Object.assign({},a.actions[0]),{service_data:Object.assign(Object.assign({},a.actions[0].service_data),{[e]:i})}):Object.assign(Object.assign({},a.actions[0]),{service_data:Object.fromEntries(Object.entries(a.actions[0].service_data).filter(([t])=>t!=e))});this._updateSlot({actions:[s]})}_toggleOptionalField(e,t,i){const a=e.target.checked,s=a?zs(i):void 0;a?this._selectField(t,new CustomEvent("value-changed",{detail:{value:Ue(s)?s:null}})):this._selectField(t,new CustomEvent("value-changed",{detail:{value:void 0}}))}_selectEntity(e){const t=e.detail.value;t&&this.schedule.entries[this.selectedEntry].slots.forEach((e,i)=>{if(!e.actions.length)return;let a=Object.assign(Object.assign({},e.actions[0]),{target:{entity_id:t}});this._updateSlot({actions:[a]},i)})}_handleUpdate(e,t){this.selectedEntry=t,e.detail.hasOwnProperty("selectedSlot")?(this._updateSelectedSlot(e.detail.selectedSlot),this.selectedSlot=e.detail.selectedSlot):e.detail.hasOwnProperty("slots")&&this._updateEntry({slots:e.detail.slots})}_updateSelectedSlot(e){this.dispatchEvent(new CustomEvent("change",{detail:{selectedSlot:e}}))}_updateEntry(e){let t=Object.assign({},this.schedule.entries[this.selectedEntry]);t=Object.assign(Object.assign({},t),e),this.schedule=Object.assign(Object.assign({},this.schedule),{entries:Object.assign(this.schedule.entries,{[this.selectedEntry]:t})})}_updateSlot(e,t=this.selectedSlot){let i=Object.assign({},this.schedule.entries[this.selectedEntry].slots[t]);i=Object.assign(Object.assign({},i),e),this._updateEntry({slots:Object.assign(this.schedule.entries[this.selectedEntry].slots,{[t]:i})})}async _showWeekdayDialog(e,t){this.selectedEntry=t,await new Promise(i=>{const a={weekdays:[...this.schedule.entries[t].weekdays],cancel:()=>i(null),confirm:e=>i(e)};Ia(e.target,"show-dialog",{dialogTag:"dialog-select-weekdays",dialogImport:()=>Promise.resolve().then((function(){return Is})),dialogParams:a})}).then(e=>{e&&this._updateEntry({weekdays:e})})}async _showActionDialog(e){let t=[],i=[];this.schedule.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var a,s;i=[...i,...[(null===(a=e.target)||void 0===a?void 0:a.entity_id)||[]].flat()],t=[...t,...[ea(e.service),...[(null===(s=e.target)||void 0===s?void 0:s.entity_id)||[]].flat()].map(ea)]})})}),t=[...new Set(t)],i=[...new Set(i)],await new Promise(a=>{const s={cancel:()=>a(null),confirm:e=>a(e),domainFilter:t.length?t:void 0,entityFilter:i.length?i:void 0,cardConfig:this.config};Ia(e.target,"show-dialog",{dialogTag:"dialog-select-action",dialogImport:()=>Promise.resolve().then((function(){return Fs})),dialogParams:s})}).then(e=>{if(!e)return;Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);const t=this.schedule.entries[this.selectedEntry].slots.find(e=>{var t;return e.actions.length?null===(t=e.actions[0].target)||void 0===t?void 0:t.entity_id:void 0});let i=Object.assign({},e);t&&i.target&&(i=Object.assign(Object.assign({},i),{target:t.actions[0].target})),this._updateSlot({actions:[i]})})}_removeAction(){this._updateSlot({actions:[]})}_stopTimeChanged(e){let t=e.detail.value,[i,a]=Ts([...this.schedule.entries[this.selectedEntry].slots],Number(this.selectedSlot),{stop:t},this.hass);this._updateEntry({slots:i}),a!=this.selectedSlot&&this._updateSelectedSlot(a)}_startTimeChanged(e){let t=e.detail.value,[i,a]=Ts([...this.schedule.entries[this.selectedEntry].slots],Number(this.selectedSlot),{start:t},this.hass);this._updateEntry({slots:i}),a!=this.selectedSlot&&this._updateSelectedSlot(a)}_toggleStopTime(e){const t=e.target.checked,i=Number(this.selectedSlot);let a=[...this.schedule.entries[this.selectedEntry].slots];if(t){let e=i+1,t=a[e].start;a[i+1].actions.length||(t=a[i+1].stop,e=i+2),a=[...a.slice(0,i),Object.assign(Object.assign({},a[i]),{stop:t}),...a.slice(e)]}else{const e=Ce(Ee(a[i].start),{minutes:1});Te(a[i].stop,this.hass)-Te(e,this.hass)!=0&&(a=[...a.slice(0,i+1),{start:qe(e),stop:a[i].stop,actions:[],conditions:a[i].conditions},...a.slice(i+1)]),Object.assign(a,{[i]:Object.assign(Object.assign({},a[i]),{stop:void 0})})}this._updateEntry({slots:a})}_addTimeslot(e){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i,a)=>{let s=[...e.entries[t].slots],o=Ee(s[i].start),n=void 0===s[i].stop?o:Ee(s[i].stop);if(n.mode!==we.Fixed||n.hours||n.minutes||(n=Object.assign(Object.assign({},n),{hours:24})),[we.Sunrise,we.Sunset].includes(o.mode)){const e=o.mode==we.Sunrise?a.states["sun.sun"].attributes.next_rising:a.states["sun.sun"].attributes.next_setting;let t=Ee(e);o=Ce(t,{hours:o.hours,minutes:o.minutes})}const r=Te(o,a),l=(Te(n,a)-r)/2,d=Math.floor(l/3600),c=Math.round((l-3600*d)/60);let u=Ce(o,{hours:d,minutes:c});return u=Ae(u,15),s=[...s.slice(0,i),Object.assign(Object.assign({},s[i]),{stop:qe(u)}),Object.assign(Object.assign({},s[i]),{start:qe(u),stop:qe(n),actions:[]}),...s.slice(i+1)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:s})})})})(this.schedule,this.selectedEntry,this.selectedSlot,this.hass),e.target.blur())}_removeTimeslot(e){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i)=>{let a=[...e.entries[t].slots];const s=i==a.length-1?i-1:i;return a=[...a.slice(0,s),Object.assign(Object.assign({},a[s+1]),{start:a[s].start,stop:a[s+1].stop}),...a.slice(s+2)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:a})})})})(this.schedule,this.selectedEntry,this.selectedSlot),this.selectedSlot>=this.schedule.entries[this.selectedEntry].slots.length&&(this.selectedSlot=this.schedule.entries[this.selectedEntry].slots.length-1),e.target.blur())}static get styles(){return r`
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
  ha-button ha-icon[slot='start'] {
    margin: 0px 4px 0px -8px;
  }
  ha-button ha-icon[slot='end'] {
    margin: 0px -8px 0px 4px;
  }
  mwc-checkbox {
    align-self: center;
  }
    `}};t([de({attribute:!1})],Us.prototype,"hass",void 0),t([de({attribute:!1})],Us.prototype,"config",void 0),t([de({attribute:!1})],Us.prototype,"viewMode",void 0),t([de({attribute:!1})],Us.prototype,"selectedSlot",void 0),t([de({type:Boolean})],Us.prototype,"large",void 0),t([ce()],Us.prototype,"schedule",void 0),t([ce()],Us.prototype,"selectedEntry",void 0),Us=t([re("scheduler-main-panel")],Us);const Ws=["January","February","March","April","May","June","July","August","September","October","November","December"];function Zs(e){return e.toISOString().split("T")[0]}function Ks(e){let t=new Date;const i=(e||"").match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);null!==i&&t.setFullYear(Number(i[1]),Number(i[2])-1,Number(i[3]));const a=(e||"").match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);return null!==a&&t.setHours(Number(a[1]),Number(a[2]),a.length>4?Number(a[4]):t.getSeconds()),t}const Gs=(e,t)=>"select"in t&&null!==t.select?((e,t)=>{var i;return((null===(i=t.select)||void 0===i?void 0:i.options)||[]).some(t=>"object"==typeof t?t.value==e:t==e)})(String(e),t):"number"in t&&null!==t.number?((e,t)=>{var i,a;return!isNaN(e)&&(!(void 0!==(null===(i=t.number)||void 0===i?void 0:i.min)&&e<t.number.min)&&!(void 0!==(null===(a=t.number)||void 0===a?void 0:a.max)&&e>t.number.max))})(Number(e),t):!("text"in t)||null===t.text||String(e).length>0,Js=e=>null==e||Array.isArray(e)?e:[e];let Ys=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0}async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title")}render(){return this._params?q`
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
              .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
              .path=${Va}
            ></ha-icon-button>
            <span slot="title">
              ${Qi("ui.panel.options.conditions.add_condition",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${na("ui.common.search",this.hass)}
            aria-label=${na("ui.common.search",this.hass)}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&q`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${na("ui.common.clear",this.hass)}
                  .path=${Va}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>

        <mwc-list
          style=${Xa({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:q``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_clearSearch(){this._search="",this._filter=""}_renderOptions(){let e=ss(this.hass,this._params.cardConfig);return e.sort((e,t)=>sa(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(e).map(t=>q`
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
    `}};t([de({attribute:!1})],Ys.prototype,"hass",void 0),t([ce()],Ys.prototype,"_params",void 0),t([ce()],Ys.prototype,"_search",void 0),t([ce()],Ys.prototype,"_filter",void 0),t([ce()],Ys.prototype,"_width",void 0),t([ce()],Ys.prototype,"_height",void 0),Ys=t([re("dialog-select-condition")],Ys);var Qs=Object.freeze({__proto__:null,get DialogSelectCondition(){return Ys}});let Xs=class extends oe{constructor(){super(...arguments),this.conditionIdx=-1,this.conditionValid=!0,this.startDate="",this.endDate="",this.tags=[]}async firstUpdated(){var e,t;(await window.loadCardHelpers()).importMoreInfoControl("input_datetime"),this.startDate=(null===(e=this.schedule)||void 0===e?void 0:e.start_date)||Zs(new Date),this.endDate=(null===(t=this.schedule)||void 0===t?void 0:t.end_date)||Zs(new Date);const i=(await qa(this.hass)).map(e=>e.name),a=[...this.config.tags].flat();this.tags=[...i,...a.filter(e=>!i.includes(e)&&!["none","disabled","enabled"].includes(e))]}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){const e={select:{options:this.tags,multiple:!0,custom_value:!0}};return q`
      <div class="header first">
        <span>${Qi("ui.panel.options.conditions.header",this.hass)}:</span>
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
            ${this.schedule.entries[0].slots[0].conditions.type==ve.Or?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Qi("ui.panel.options.conditions.options.logic_or",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length<2}>
            ${this.schedule.entries[0].slots[0].conditions.type==ve.And?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Qi("ui.panel.options.conditions.options.logic_and",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon">

            ${this.schedule.entries[0].slots[0].conditions.track_changes?q`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Qi("ui.panel.options.conditions.options.track_changes",this.hass)}
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
          ${Qi("ui.panel.options.conditions.add_condition",this.hass)}
        </ha-button>
      </div>


      <span class="header">${Qi("ui.panel.options.period.header",this.hass)}:</span>
      <div class="period">
        <ha-checkbox
          ?checked=${"string"==typeof this.schedule.start_date}
          @change=${this.toggleEnableDateRange}
        >
        </ha-checkbox>
        <span>${Qi("ui.panel.options.period.start_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${na("ui.components.date-range-picker.start_date",this.hass)}
          @value-changed=${this._setStartDate}
          ?disabled=${!this.schedule.start_date}
        >
        </ha-date-input>
        <span>${Qi("ui.panel.options.period.end_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${na("ui.components.date-range-picker.end_date",this.hass)}
          @value-changed=${this._setEndDate}
          ?disabled=${!this.schedule.end_date}
        >
        </ha-date-input>
      </div>

      <span class="header">${na("ui.common.name",this.hass)}:</span>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name||""}
          placeholder=${this.schedule.name?"":na("ui.common.name",this.hass)}
          @input=${this.updateName}
        ></ha-textfield>
      </div>

      <span class="header">${Qi("ui.panel.options.tags",this.hass)}:</span>
      <div>
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${e}
          .value=${this.schedule.tags||[]}
          @value-changed=${this.tagsUpdated}
        >
        </scheduler-combo-selector>
      </div>

      <span class="header">${Qi("ui.panel.options.repeat_type",this.hass)}:</span>
      <ha-button
        appearance="${this.schedule.repeat_type==ke.Repeat?"filled":"plain"}"
        variant="${this.schedule.repeat_type==ke.Repeat?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${ke.Repeat}"
      >
        <ha-icon slot="start" icon="mdi:refresh"></ha-icon>
        ${na("ui.components.calendar.event.repeat.label",this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type==ke.Pause?"filled":"plain"}"
        variant="${this.schedule.repeat_type==ke.Pause?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${ke.Pause}"
      >
        <ha-icon slot="start" icon="mdi:stop"></ha-icon>
        ${na("ui.dialogs.more_info_control.vacuum.stop",this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type==ke.Single?"filled":"plain"}"
        variant="${this.schedule.repeat_type==ke.Single?"brand":"neutral"}"
        @click=${this.setRepeatType}
        value="${ke.Single}"
      >
        <ha-icon slot="start" icon="mdi:trash-can-outline"></ha-icon>
        ${na("ui.common.delete",this.hass)}
      </ha-button>
    `}renderConditions(){let e=this.schedule.entries[0].slots[0].conditions.items;return this.conditionIdx==e.length&&(e=[...e,{}]),e.map((e,t)=>{const i=this.conditionIdx==t?this.selectedEntity||e.entity_id||"":e.entity_id||"",a=this.conditionIdx==t&&this.selectedDomain||ea(i),s=as(i||a,this.hass,this.config.customize),o=s&&s.hasOwnProperty("number")?[ye.Above,ye.Below]:[ye.Equal,ye.Unequal],n={[ye.Equal]:"mdi:equal",[ye.Unequal]:"mdi:not-equal-variant",[ye.Above]:"mdi:greater-than",[ye.Below]:"mdi:less-than"},r={[ye.Equal]:"ui.panel.options.conditions.types.equal_to",[ye.Unequal]:"ui.panel.options.conditions.types.unequal_to",[ye.Above]:"ui.panel.options.conditions.types.above",[ye.Below]:"ui.panel.options.conditions.types.below"};return this.conditionIdx!==t||this.selectedMatchType||(this.selectedMatchType=o[0]),q`
      <scheduler-collapsible-section idx="${t}">
        <div slot="header">
          ${e.entity_id&&void 0!==e.value?q`
          <ha-icon slot="icon" icon="${os(e.entity_id,this.config.customize,this.hass)}"></ha-icon>
          ${oa(Qi(r[e.match_type],this.hass,["{entity}","{value}"],[Ta(e.entity_id,this.hass,this.config.customize)||"",pa(e.value,s,this.hass)||""]))}
          `:Qi("ui.panel.options.conditions.add_condition",this.hass)}
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
            .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
            ?disabled=${!this.conditionValid&&this.conditionIdx!==t&&-1!=this.conditionIdx}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${na("ui.panel.lovelace.editor.card.conditional.change_type",this.hass)}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${na("ui.common.delete",this.hass)}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

        <scheduler-settings-row>
          <span slot="heading">
            ${na("ui.components.selectors.selector.types.entity",this.hass)}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${a}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx==t?Js(this.selectedEntity):Js(e.entity_id)}
            ?multiple=${!1}
          >
          </scheduler-entity-picker>
        </scheduler-settings-row>

        <scheduler-settings-row>
          <span slot="heading">
            ${oa(Qi(r[this.conditionIdx==t?this.selectedMatchType:e.match_type],this.hass,["{entity}","{value}"],["",""]))}
            <ha-button-menu
              @action=${e=>this._selectMatchType(e,o)}
              @closed=${e=>{e.stopPropagation()}}
              fixed
            >
              <ha-icon-button slot="trigger" .path=${Fa}>
              </ha-icon-button>
              ${o.map(i=>q`
                <mwc-list-item graphic="icon" ?noninteractive=${this.conditionIdx==t?this.selectedMatchType==i:e.match_type==i}>
                  ${oa(Qi(r[i],this.hass,["{entity}","{value}"],["",""]))}
                  <ha-icon slot="graphic" icon="${n[i]}"></ha-icon>
                </mwc-list-item>
              `)}
            </ha-button-menu>
          </span>
          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${s}
            .value=${this.conditionIdx==t?this.conditionValue:e.value}
            @value-changed=${this._conditionValueChanged}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>
        </div>
      </scheduler-collapsible-section>
    `})}_updateActiveCondition(e){const t=e.detail.item;if(t<0)return void(this.conditionIdx=-1);if(t===this.conditionIdx)return;this.conditionIdx=t;const i=this.schedule.entries[0].slots[0].conditions.items[t];this.selectedEntity=i?i.entity_id:void 0,this.selectedMatchType=i?i.match_type:void 0,this.conditionValue=i?i.value:void 0}_conditionItemOptionsClick(e,t){switch(e.detail.index){case 0:this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=t,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)});break;case 1:const i=this.schedule.entries[0].slots[0].conditions.items.filter((e,i)=>i!==t),a=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})}),s=e=>Object.assign(e,{slots:e.slots.map(a)});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(s)}),t===this.conditionIdx?this.conditionIdx=-1:void 0!==this.conditionIdx&&t<this.conditionIdx&&(this.conditionIdx=this.conditionIdx-1),this.conditionValid=!0}}_selectMatchType(e,t){const i=e.detail.index;t=t.filter(e=>e!=this.selectedMatchType),this.selectedMatchType=t[i],e.preventDefault();const a=e.target;setTimeout(()=>{a.firstElementChild.blur()},50),this._validateCondition()}_conditionValueChanged(e){this.conditionValue=e.detail.value,this._validateCondition()}async _showConditionDialog(e){return new Promise(t=>{const i={cancel:()=>t(null),confirm:e=>t(e),domain:void 0,cardConfig:this.config};Ia(e.target,"show-dialog",{dialogTag:"dialog-select-condition",dialogImport:()=>Promise.resolve().then((function(){return Qs})),dialogParams:i})})}_selectEntity(e){const t=e.detail.value;if(this.selectedEntity=t?t.pop():void 0,this.selectedEntity){const e=as(this.selectedEntity,this.hass,this.config.customize),t=e&&e.hasOwnProperty("number")?[ye.Above,ye.Below]:[ye.Equal,ye.Unequal];this.selectedMatchType&&t.includes(this.selectedMatchType)||(this.selectedMatchType=t[0])}this._validateCondition()}_validateCondition(){if(this.conditionValid=!1,!this.selectedEntity||!Ue(this.conditionValue)||!this.selectedMatchType||void 0===this.conditionIdx)return;const e=as(this.selectedEntity,this.hass,this.config.customize);if(!Gs(this.conditionValue,e))return;this.conditionValid=!0;const t={entity_id:this.selectedEntity,match_type:this.selectedMatchType,value:this.conditionValue,attribute:"state"},i=Object.assign(this.schedule.entries[0].slots[0].conditions.items,{[this.conditionIdx]:t}),a=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(a)}))})}_conditionAddClick(e){this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=this.schedule.entries[0].slots[0].conditions.items.length,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)})}_conditionConfigOptionsClick(e){let t=Object.assign({},this.schedule.entries[0].slots[0].conditions);switch(e.detail.index){case 0:if(t.type==ve.Or)return;t=Object.assign(Object.assign({},t),{type:ve.Or});break;case 1:if(t.type==ve.And)return;t=Object.assign(Object.assign({},t),{type:ve.And});break;case 2:const e=!this.schedule.entries[0].slots[0].conditions.track_changes;t=Object.assign(Object.assign({},t),{track_changes:e})}const i=e=>Object.assign(e,{conditions:t});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(i)}))})}_setStartDate(e){const t=String(e.detail.value);if(!t)return;Ks(t)>Ks(this.endDate)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t}_setEndDate(e){const t=String(e.detail.value);if(!t)return;Ks(this.startDate)>Ks(t)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t}toggleEnableDateRange(e){const t=e.target.checked;this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t?this.startDate:void 0,end_date:t?this.endDate:void 0,repeat_type:t?this.schedule.repeat_type==ke.Repeat?ke.Pause:this.schedule.repeat_type:this.schedule.repeat_type==ke.Pause?ke.Repeat:this.schedule.repeat_type})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t.trim()})}tagsUpdated(e){let t=e.detail.value;t=t.map(e=>e.trim()),t=t.filter(e=>!["none","disabled","enabled"].includes(e)),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:t})}setRepeatType(e){const t=e.target.getAttribute("value");this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}static get styles(){return r`
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
      ha-button ha-icon[slot='start'] {
        margin: 0px 4px 0px -8px;
      }
      ha-button ha-icon[slot='end'] {
        margin: 0px -8px 0px 4px;
      }
    `}};t([de({attribute:!1})],Xs.prototype,"hass",void 0),t([de({attribute:!1})],Xs.prototype,"config",void 0),t([ce()],Xs.prototype,"schedule",void 0),t([ce()],Xs.prototype,"conditionIdx",void 0),t([ce()],Xs.prototype,"selectedDomain",void 0),t([ce()],Xs.prototype,"selectedEntity",void 0),t([ce()],Xs.prototype,"selectedMatchType",void 0),t([ce()],Xs.prototype,"conditionValue",void 0),t([ce()],Xs.prototype,"conditionValid",void 0),t([ce()],Xs.prototype,"startDate",void 0),t([ce()],Xs.prototype,"endDate",void 0),t([de()],Xs.prototype,"tags",void 0),Xs=t([re("scheduler-options-panel")],Xs);let eo=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?q`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Va}
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
    `}};t([de({attribute:!1})],eo.prototype,"hass",void 0),t([ce()],eo.prototype,"_params",void 0),eo=t([re("scheduler-generic-dialog")],eo);var to=Object.freeze({__proto__:null,get GenericDialog(){return eo}});let io=class extends oe{constructor(){super(...arguments),this.large=!1,this.selectedEntry=0,this.selectedSlot=null,this._panel="main",this._viewMode=_e.Single}set viewMode(e){if(this._viewMode=e,e==_e.Single){let e=this.schedule.entries[this.selectedEntry].slots.findIndex(e=>e.actions.length);this.selectedSlot=e>=0?e:1}}shouldUpdate(e){return 1!=e.size||!e.has("hass")||!Ue(this.hass)}async showDialog(e){var t;this._params=e,this.schedule=e.schedule,this._panel="main",this.large=!1;const i=this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length&&Ue(e.stop)).length>0||this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length).length>1||this.schedule.entries[this.selectedEntry].slots.length>3;let a=this.schedule.entries[this.selectedEntry].slots.findIndex(e=>e.actions.length);this.selectedSlot=a>=0?a:null,this.viewMode=i?_e.Scheme:(null===(t=this._params)||void 0===t?void 0:t.cardConfig.default_editor)||_e.Single,await this.updateComplete}async closeDialog(){this._params=void 0}willUpdate(){this.hass.loadBackendTranslation("config")}render(){var e;return this._params?q`
      <ha-dialog open @closed=${this.closeDialog} .heading=${!0} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          ${"main"==this._panel?q`
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${Va}
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
            .label=${na("ui.dialogs.more_info_control.dismiss",this.hass)}
            .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
            @click=${()=>{this._panel="main"}}
          ></ha-icon-button>
          `}
          <span slot="title" @click=${()=>this.large=!this.large}>
            ${this._params.editItem?this.schedule.name?null===(e=this.schedule)||void 0===e?void 0:e.name:Qi("ui.panel.common.default_name",this.hass,"{id}",this._params.editItem):Qi("ui.panel.common.new_schedule",this.hass)}
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
            ${na("ui.common.delete",this.hass)}
          </ha-button>
          <ha-button appearance="plain" @click=${this._handleSaveClick}>
            ${na("ui.common.save",this.hass)}
          </ha-button>
        </div>
      </ha-dialog>
    `:q``}_updateSchedule(e){let t=Object.keys(e.detail);if(t.includes("schedule")){let t=e.detail.schedule;this.schedule=t}t.includes("selectedSlot")&&(this.selectedSlot=e.detail.selectedSlot)}async _handleSaveClick(e){const t=ks(this.schedule,this.hass,this._params.cardConfig.customize);if(t)await new Promise(i=>{const a={cancel:()=>i(!1),confirm:()=>i(!0),title:na("state_badge.default.error",this.hass),description:Qi("ui.panel.editor.validation_errors."+t,this.hass),primaryButtonLabel:na("ui.common.ok",this.hass)};Ia(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return to})),dialogParams:a})});else if(this.schedule.schedule_id){const t=Re(await Pa(this.hass,this.schedule.schedule_id),this.hass);if(pe(this.schedule,t))return void this.closeDialog();if(!t.enabled){await new Promise(t=>{const i={title:Qi("ui.dialog.enable_schedule.title",this.hass),description:Qi("ui.dialog.enable_schedule.description",this.hass),primaryButtonLabel:na("ui.common.yes",this.hass),secondaryButtonLabel:na("ui.common.no",this.hass),cancel:()=>{t(!1)},confirm:()=>{t(!0)}};Ia(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return to})),dialogParams:i})})&&this.hass.callService("switch","turn_on",{entity_id:t.entity_id})}((e,t)=>{const i=ws(t);return e.callApi("POST","scheduler/edit",i)})(this.hass,this.schedule).catch(e=>Os(e,this,this.hass)).then(()=>{this.closeDialog()})}else((e,t)=>{const i=ws(t);return e.callApi("POST","scheduler/add",i)})(this.hass,this.schedule).catch(e=>Os(e,this,this.hass)).then(()=>{this.closeDialog()})}async _handleDeleteClick(e){await new Promise(t=>{const i={cancel:()=>t(!1),confirm:()=>t(!0),title:Qi("ui.dialog.confirm_delete.title",this.hass),description:Qi("ui.dialog.confirm_delete.description",this.hass),primaryButtonLabel:na("ui.common.ok",this.hass),secondaryButtonLabel:na("ui.common.cancel",this.hass)};Ia(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return to})),dialogParams:i})}).then(e=>{var t,i;e&&(t=this.hass,i=this._params.editItem,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>Os(e,this,this.hass)).then(()=>{this.closeDialog()})})}_setViewMode(e){let t=e.detail;const i=this.schedule.entries[this.selectedEntry].slots.filter(e=>e.actions.length).length>1;if(t!=_e.Scheme){if(t==_e.Single&&!i){let e=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>{let t=e.slots.findIndex(e=>e.actions.length);return t<0&&(t=Math.floor(e.slots.length/2)),Object(Object.assign(Object.assign({},e),{slots:e.slots.map((e,i)=>i==t?Object.assign(Object.assign({},e),{stop:void 0}):null).filter(Ue)}))})});return this.schedule=Re(e,this.hass),void(this.viewMode=t)}new Promise(t=>{const i={title:Qi("ui.dialog.confirm_migrate.title",this.hass),description:Qi("ui.dialog.confirm_migrate.description",this.hass),primaryButtonLabel:this.hass.localize("ui.common.yes"),secondaryButtonLabel:this.hass.localize("ui.common.no"),cancel:()=>{t(!1)},confirm:()=>{t(!0)}};Ia(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return to})),dialogParams:i})}).then(e=>{e&&(this.schedule=(e=>{const t=e=>{let t=e.findIndex(e=>e.actions.length);t<0&&(t=Math.floor(e.length/2));let i=Object.assign(Object.assign({},e[t]),{stop:void 0});const a=i.conditions,s=i.start;return e=[{start:"00:00:00",stop:s,actions:[],conditions:a},i,{start:qe(Ce(Ee(s),{minutes:1})),stop:"00:00:00",actions:[],conditions:a}]};return e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object(Object.assign(Object.assign({},e),{slots:t(e.slots)})))})})(this.schedule),this.viewMode=t)})}else this.viewMode=t}};io.styles=ys,t([de({attribute:!1})],io.prototype,"hass",void 0),t([ce()],io.prototype,"_params",void 0),t([de({type:Boolean,reflect:!0})],io.prototype,"large",void 0),t([ce()],io.prototype,"schedule",void 0),t([ce()],io.prototype,"selectedEntry",void 0),t([ce()],io.prototype,"selectedSlot",void 0),t([ce()],io.prototype,"_panel",void 0),t([ce()],io.prototype,"_viewMode",void 0),io=t([re("dialog-scheduler-editor")],io);var ao=Object.freeze({__proto__:null,get DialogSchedulerEditor(){return io}});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class so extends Qa{constructor(e){if(super(e),this.et=H,e.type!==Ja)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===H||null==e)return this.ft=void 0,this.et=e;if(e===R)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}so.directiveName="unsafeHTML",so.resultType=1;const oo=Ya(so);var no=window&&window.__assign||function(){return(no=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var s in t=arguments[i])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)};var ro={second:45,minute:45,hour:22,day:5};const lo=(e,t,i)=>{if(i===De.am_pm||!i&&t.time_format===De.am_pm){const t=Pe(e.getHours()).am_pm;return`${Pe(e.getHours()).hours}:${String(e.getMinutes()).padStart(2,"0")} ${t}`}return i===De.twenty_four||!i&&t.time_format===De.twenty_four?`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`:(()=>{try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1})()?e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit",hour12:Le(t)}):Le(t)?lo(e,t,De.am_pm):lo(e,t,De.twenty_four)};let co=class extends oe{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const a=i>=0?"past":"future";i=Math.abs(i);const s=Math.round(i);if("future"==a&&s>0){if(i/3600>=6){const i=t.setHours(0,0,0,0),a=Math.floor((e.valueOf()-i.valueOf())/864e5);let s="";a>14?s=function(e,t){const i=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},a=(e,t)=>{switch(t){case"year":return e.getFullYear();case"month":return Ws[e.getMonth()];case"day":return e.getDate()}};return e.getFullYear()==(new Date).getFullYear()?i()?new Intl.DateTimeFormat(t.language,{month:"long",day:"numeric"}).format(e):`${a(e,"month")} ${a(e,"day")}`:i()?new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}).format(e):`${a(e,"month")} ${a(e,"day")}, ${a(e,"year")}`}(e,this._hass.locale):a>7?s=Qi("ui.components.date.next_week_day",this._hass,"{weekday}",Sa(e,"long",this._hass)):1==a?s=Qi("ui.components.date.tomorrow",this._hass):a>0&&(s=Sa(e,"long",this._hass));let o=Qi("ui.components.time.absolute",this._hass,"{time}",lo(e,this._hass.locale));return 12==e.getHours()&&0==e.getMinutes()?o=Qi("ui.components.time.at_noon",this._hass):0==e.getHours()&&0==e.getMinutes()&&(o=Qi("ui.components.time.at_midnight",this._hass)),String(s+" "+o).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=na("ui.common.and",this._hass);return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"hour")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"minute",unitDisplay:"long"}).format(e)}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=na("ui.common.and",this._hass);return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"minute")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"second",unitDisplay:"long"}).format(e)}`}}const o=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var a=no(no({},ro),i||{}),s=(+e-+t)/1e3;if(Math.abs(s)<a.second)return{value:Math.round(s),unit:"second"};var o=s/60;if(Math.abs(o)<a.minute)return{value:Math.round(o),unit:"minute"};var n=s/3600;if(Math.abs(n)<a.hour)return{value:Math.round(n),unit:"hour"};var r=s/86400;if(Math.abs(r)<a.day)return{value:Math.round(r),unit:"day"};var l=new Date(e),d=new Date(t),c=l.getFullYear()-d.getFullYear();if(Math.round(Math.abs(c))>0)return{value:Math.round(c),unit:"year"};var u=12*c+l.getMonth()-d.getMonth();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"month"};var h=s/604800;return{value:Math.round(h),unit:"week"}}(e);return new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(o.value,o.unit)}render(){if(!this._hass||!this.datetime)return q``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),q`
      ${oa(this.relativeTime(this.datetime))}
    `}};t([de()],co.prototype,"_hass",void 0),t([de()],co.prototype,"datetime",void 0),co=t([re("scheduler-relative-time")],co);let uo=class extends oe{render(){var e;try{const t=this.hass.states[this.schedule.entity_id];if(!t)return q``;const i="off"==t.state,a=this.schedule.entries[0].slots[this.schedule.next_entries[0]||0].actions[0];let s=Ss(a,this.config.customize);if("entity"==this.config.display_options.icon){let t=[(null===(e=a.target)||void 0===e?void 0:e.entity_id)||[]].flat().shift();["script","notify"].includes(ea(a.service))&&(t=a.service),t&&(s=os(t,this.config.customize,this.hass))}return q`
      <ha-icon
        icon="${s}"
        @click=${this._handleIconClick}
        class="${i?"disabled":""}"
      ></ha-icon>

      <div
        class="info ${i?"disabled":""}"
        @click=${this._handleItemClick}
      >
        ${this.renderDisplayItem(this.config.display_options.primary_info)}
        <div class="secondary">
        ${this.renderDisplayItem(this.config.display_options.secondary_info)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${t}
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
          ${t[0]?oo(t[0]):""}
          <scheduler-relative-time
            .hass=${this.hass}
            .datetime=${new Date(e)}
          >
          </scheduler-relative-time>
          ${t[1]?oo(t[1]):""}
        `}if(null!==e.match(/^(<tag>[^<]*<\/tag>)+$/)){let t=e.split(/<tag>([^<]*)<\/tag>/).filter(e=>e);return q`
          <div class="tags">
            ${null==t?void 0:t.map(e=>q`<span class="tag">${e}</span>`)}
          </div>`}return oo(e)};return Ma(this.schedule,e,this.hass,this.config.customize).filter(e=>e.length).map(e=>{const i=t(e);return e.includes('class="slot-info"')?i:q`<span class="secondary-line">${i}</span>`})}_handleItemClick(e){const t=new CustomEvent("editClick",{detail:{schedule_id:this.schedule_id}});this.dispatchEvent(t)}_handleIconClick(e){const t=new CustomEvent("editClick",{detail:{schedule_id:this.schedule_id}});this.dispatchEvent(t)}static get styles(){return r`
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
      .secondary {
        display: flex;
        flex-direction: column;
        gap: 0.05rem;
      }
      span.secondary-line {
        display: block;
        margin: 0;
      }
      span.slot-info {
        display: block;
        margin: 0;
        line-height: 1.1;
      }
      span.slot-info--active {
        color: var(--primary-text-color);
        font-weight: 600;
        font-size: 1.24em;
      }
      span.slot-info--inactive {
        color: var(--disabled-text-color);
      }
      span.slot-info--disabled {
        color: var(--disabled-text-color);
        font-weight: normal;
      }
      .info.disabled span.slot-info,
      .info.disabled span.slot-info--active {
        color: var(--disabled-text-color);
        font-weight: normal;
        font-size: inherit;
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
    `}};t([de()],uo.prototype,"hass",void 0),t([de()],uo.prototype,"schedule_id",void 0),t([de()],uo.prototype,"schedule",void 0),t([de()],uo.prototype,"config",void 0),uo=t([re("scheduler-item-row")],uo),e.SchedulerCard=class extends oe{constructor(){super(...arguments),this._config=He,this.showDiscovered=!1,this.translationsLoaded=!1,this.connectionError=!1}setConfig(e){e=(e=>{let t=[];if(We(e,"include")&&!Ye(e.include)&&t.push("'include' must be a list of strings"),We(e,"exclude")&&!Ye(e.exclude)&&t.push("'exclude' must be a list of strings"),We(e,"discover_existing")&&!Ze(e.discover_existing)&&t.push("'discover_existing' must be a boolean"),!We(e,"title")||Ze(e.title)||Ge(e.title)||t.push("'title' must be a boolean or string"),We(e,"time_step")&&(!Ke(e.time_step)||Number(e.time_step)<1||Number(e.time_step)>30)&&t.push("'time_step' must be a number between 1 and 30"),We(e,"show_header_toggle")&&!Ze(e.show_header_toggle)&&t.push("'show_header_toggle' must be a boolean"),We(e,"show_add_button")&&!Ze(e.show_add_button)&&t.push("'show_add_button' must be a boolean"),We(e,"display_options")&&(Je(e.display_options)?(!We(e.display_options,"primary_info")||Ge(e.display_options.primary_info)||Ye(e.display_options.primary_info)||t.push("in 'display_options': 'primary_info' must be a string or list of strings"),!We(e.display_options,"secondary_info")||Ge(e.display_options.secondary_info)||Ye(e.display_options.secondary_info)||t.push("in 'display_options': 'secondary_info' must be a string or list of strings"),!We(e.display_options,"icon")||Ge(e.display_options.icon)&&["action","entity"].includes(e.display_options.icon)||t.push("in 'display_options': 'icon' must be a set to either 'action' or 'entity' ")):t.push("'display_options' must be a struct")),!We(e,"sort_by")||Ge(e.sort_by)||Ye(e.sort_by)||t.push("'sort_by' must be a string or list of strings"),We(e,"customize")&&!Je(e.customize))t.push("'customize' must be a struct");else if(We(e,"customize")){let i=Object.entries(e.customize).map(([e,t])=>Qe(e,t)).filter(Ue);i.length&&t.push(...i)}if(!We(e,"tags")||Ge(e.tags)||Ye(e.tags)||t.push("'tags' must be a string or list of strings"),!We(e,"exclude_tags")||Ge(e.tags)||Ye(e.tags)||t.push("'exclude_tags' must be a string or list of strings"),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`);return e})(e),this._config=Object.assign(Object.assign({},He),e)}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider")&&customElements.get("ha-combo-box"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})();document.querySelector("home-assistant")._loadFragmentTranslations(this.hass.language,"config")}willUpdate(){this.hass.loadBackendTranslation("services")}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeMessage(e=>this.handleScheduleItemUpdated(e),{type:"scheduler_updated"})]}shouldUpdate(e){const t=e.get("hass"),i=e.get("_config");if(i&&this._config){Object.keys(i).filter(e=>i[e]!==this._config[e]).some(e=>["tags","discover_existing","sort_by","display_options"].includes(e))&&(async()=>{await this.loadSchedules()})()}return!this.translationsLoaded&&na("component.input_boolean.services.turn_on.name",this.hass,!1).length&&na("ui.panel.config.automation.editor.conditions.type.sun.sunrise",this.hass,!1).length?(this.translationsLoaded=!0,!0):!t||1!=e.size||!this.schedules||Object.values(this.schedules).some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this.hass.states[e.entity_id]))}render(){let e=[...this.schedules||[]],t=e.filter(e=>aa(e,this._config)),i=e.filter(e=>!aa(e,this._config));const a=this.showDiscovered?e.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")}):t.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")});return q`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title?"string"==typeof this._config.title?this._config.title:Qi("ui.panel.common.title",this.hass):""}
          </div>

          ${Object.keys(this.schedules||{}).length&&this._config.show_header_toggle?q`
          <ha-switch
            ?checked=${a}
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
              ${Qi("ui.panel.overview.backend_error",this.hass)}
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
          ${Qi("ui.panel.overview.no_entries",this.hass)}
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
                  ${Qi("ui.panel.overview.hide_excluded",this.hass)}
                </ha-button>
              </div>
            `:q`
              <div>
                <ha-button
                  appearance="plain"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Qi("ui.panel.overview.excluded_items",this.hass,"{number}",Object.keys(e).length-t.length)}
                </ha-button>
              </div>
            `:""}
        </div>
        ${!1!==this._config.show_add_button?q`
        <div class="card-actions">
          ${this.connectionError?q`
          <ha-button appearance="plain" variant="warning" @click=${this._retryConnection}
            >${na("ui.common.refresh",this.hass)}
          </ha-button>
            `:q`
          <ha-button appearance="plain" @click=${this._addClick}
            >${na("ui.common.add",this.hass)}
          </ha-button>
          `}
        </div>`:""}
      </ha-card>
    `}async loadSchedules(){Se(this.hass).then(e=>{this.schedules=Na(e,this._config,this.hass)}).catch(e=>{this.schedules=[],this.connectionError=!0})}async getCardSize(){return new Promise(e=>{let t=0;const i=setInterval(()=>{if(t++,!this._config||!this.schedules&&!this.connectionError&&t<50)return;let a=this._config.title||this._config.show_header_toggle?3:1;this._config.show_add_button&&(a+=1);const s=(([this._config.display_options.secondary_info||[]].flat().length||2)+1)/2;this.schedules&&(a+=this.showDiscovered?Object.keys(this.schedules).length*s:Object.values(this.schedules).filter(e=>aa(e,this._config)).length*s),clearInterval(i),e(Math.round(a))},50)})}_retryConnection(){setTimeout(async()=>{await this.loadSchedules()},100),this.connectionError=!1,this.requestUpdate()}async handleScheduleItemUpdated(e){"scheduler_item_removed"!=e.event?Pa(this.hass,e.schedule_id).then(t=>{const i=this.schedules.findIndex(t=>t.schedule_id==e.schedule_id),a=i>=0?this.schedules[i]:null;let s=[...this.schedules||[]];t&&(this._config.discover_existing||aa(t,this._config))?a?a.timestamps[a.next_entries[0]||0]==t.timestamps[t.next_entries[0]||0]?s=Object.assign(s,{[i]:t}):(s=Object.assign(s,{[i]:t}),s=Na(s,this._config,this.hass)):s=Na([...s,t],this._config,this.hass):a&&(s=s.filter(t=>t.schedule_id!==e.schedule_id)),this.schedules=[...s]}):this.schedules=(this.schedules||[]).filter(t=>t.schedule_id!==e.schedule_id)}_handleEditClick(e,t){if(!this.schedules)return;const i={schedule:Re(t,this.hass),cardConfig:this._config,editItem:t.schedule_id};Ia(e.target,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:i})}_addClick(e){const t=[this._config.tags||[]].flat().filter(e=>!["none","disabled","enabled"].includes(e));let i=this._config.default_editor==_e.Scheme?JSON.parse(JSON.stringify(Fe)):JSON.parse(JSON.stringify(Be));const a={schedule:Object.assign(Object.assign({},i),{tags:1==t.length?t:[]}),cardConfig:this._config};Ia(this,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:a})}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;Object.values(this.schedules).filter(e=>this.showDiscovered||aa(e,this._config)).forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}static getConfigElement(){return document.createElement("scheduler-card-editor")}},e.SchedulerCard.styles=r`
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
  `,t([de({attribute:!1})],e.SchedulerCard.prototype,"hass",void 0),t([de()],e.SchedulerCard.prototype,"_config",void 0),t([ce()],e.SchedulerCard.prototype,"schedules",void 0),t([ce()],e.SchedulerCard.prototype,"showDiscovered",void 0),e.SchedulerCard=t([re("scheduler-card")],e.SchedulerCard),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v4.0.7".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray")}({});
