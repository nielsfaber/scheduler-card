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
     */;var c;const u=window,m=u.trustedTypes,h=m?m.emptyScript:"",p=u.reactiveElementPolyfillSupport,_={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:g},y="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Ep(i,t);void 0!==a&&(this._$Ev.set(a,i),e.push(a))}),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const s=this[e];this[t]=a,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var a;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:_).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,s=a._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=a.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:_;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var b;f[y]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(c=u.reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.6.3");const k=window,w=k.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,O=`<${j}>`,z=document,S=()=>z.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,E="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,M=/>/g,P=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,q=/"/g,I=/^(?:script|style|textarea|title)$/i,R=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),N=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),F=new WeakMap,V=z.createTreeWalker(z,129,null,!1);function U(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const B=(e,t)=>{const i=e.length-1,a=[];let s,o=2===t?"<svg>":"",n=T;for(let t=0;t<i;t++){const i=e[t];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===T?"!--"===l[1]?n=D:void 0!==l[1]?n=M:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=P):void 0!==l[3]&&(n=P):n===P?">"===l[0]?(n=null!=s?s:T,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?P:'"'===l[3]?q:L):n===q||n===L?n=P:n===D||n===M?n=T:(n=P,s=void 0);const u=n===P&&e[t+1].startsWith("/>")?" ":"";o+=n===T?i+O:d>=0?(a.push(r),i.slice(0,d)+"$lit$"+i.slice(d)+$+u):i+$+(-2===d?(a.push(void 0),t):u)}return[U(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),a]};class W{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,o=0;const n=e.length-1,r=this.parts,[l,d]=B(e,t);if(this.el=W.createElement(l,i),V.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=V.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith($)){const i=d[o++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?X:"@"===t[1]?ee:G})}else r.push({type:6,index:s})}for(const t of e)a.removeAttribute(t)}if(I.test(a.tagName)){const e=a.textContent.split($),t=e.length-1;if(t>0){a.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],S()),V.nextNode(),r.push({type:2,index:++s});a.append(e[t],S())}}}else if(8===a.nodeType)if(a.data===j)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf($,e+1));)r.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,a){var s,o,n,r;if(t===N)return t;let l=void 0!==a?null===(s=i._$Co)||void 0===s?void 0:s[a]:i._$Cl;const d=A(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(t=Z(e,l._$AS(e,t.values),l,a)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:z).importNode(i,!0);V.currentNode=s;let o=V.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new J(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new te(o,this,e)),this._$AV.push(t),l=a[++r]}n!==(null==l?void 0:l.index)&&(o=V.nextNode(),n++)}return V.currentNode=z,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,a){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(s=null==a?void 0:a.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),A(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==N&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>C(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==H&&A(this._$AH)?this._$AA.nextSibling.data=e:this.$(z.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,s="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=W.createElement(U(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new K(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new W(e)),t}T(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new J(this.k(S()),this.k(S()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,i,a,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const s=this.strings;let o=!1;if(void 0===s)e=Z(this,e,t,0),o=!A(e)||e!==this._$AH&&e!==N,o&&(this._$AH=e);else{const a=e;let n,r;for(e=s[0],n=0;n<s.length-1;n++)r=Z(this,a[i+n],t,n),r===N&&(r=this._$AH[n]),o||(o=!A(r)||r!==this._$AH[n]),r===H?e=H:e!==H&&(e+=(null!=r?r:"")+s[n+1]),this._$AH[n]=r}o&&!a&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}const Q=w?w.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==H?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class ee extends G{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Z(this,e,t,0))&&void 0!==i?i:H)===N)return;const a=this._$AH,s=e===H&&a!==H||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==H&&(a===H||s);s&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class te{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ie=k.litHtmlPolyfillSupport;null==ie||ie(W,J),(null!==(b=k.litHtmlVersions)&&void 0!==b?b:k.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ae,se;class oe extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var a,s;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new J(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return N}}oe.finalized=!0,oe._$litElement$=!0,null===(ae=globalThis.litElementHydrateSupport)||void 0===ae||ae.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");const re=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:a}=t;return{kind:i,elements:a,finisher(t){customElements.define(e,t)}}})(e,t)
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
     */
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ue;null===(ue=window.HTMLSlotElement)||void 0===ue||ue.prototype.assignedElements;const me=(e,t)=>{if(typeof e!=typeof t)return!1;if("object"==typeof e&&"object"==typeof t&&null!==e&&null!==t){const i=[...new Set([...Object.keys(e),...Object.keys(t)])];return!!i.every(i=>Object.keys(e).includes(i)&&Object.keys(t).includes(i))&&i.every(i=>me(e[i],t[i]))}return e===t};var he,pe,_e,ge,ve,ye,fe;!function(e){e.Daily="daily",e.Workday="workday",e.Weekend="weekend",e.Monday="monday",e.Tuesday="tuesday",e.Wednesday="wednesday",e.Thursday="thursday",e.Friday="friday",e.Saturday="saturday",e.Sunday="sunday"}(he||(he={})),function(e){e.Or="or",e.And="and"}(pe||(pe={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(_e||(_e={})),function(e){e.Name="name",e.RelativeTime="relative-time",e.AdditionalTasks="additional-tasks",e.Time="time",e.Days="days",e.Entity="entity",e.Action="action",e.Tags="tags",e.Default="default"}(ge||(ge={})),function(e){e.ItemCreated="scheduler_item_created",e.ItemUpdated="scheduler_item_updated",e.ItemRemoved="scheduler_item_removed",e.TimerFinished="scheduler_timer_finished",e.TimerUpdated="scheduler_timer_updated"}(ve||(ve={})),function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(ye||(ye={})),function(e){e.Fixed="fixed",e.Sunrise="sunrise",e.Sunset="sunset"}(fe||(fe={}));const be=e=>({service:e.service,service_data:e.service_data,target:{entity_id:e.entity_id?e.entity_id:void 0}}),ke=e=>({start:e.start,stop:e.stop,actions:$e(e.actions.map(be)),conditions:{type:"and"==e.condition_type?pe.And:pe.Or,items:e.conditions||[],track_changes:Boolean(e.track_conditions)}}),we=e=>{switch(e){case"mon":return he.Monday;case"tue":return he.Tuesday;case"wed":return he.Wednesday;case"thu":return he.Thursday;case"fri":return he.Friday;case"sat":return he.Saturday;case"sun":return he.Sunday;case"workday":return he.Workday;case"weekend":return he.Weekend;default:return he.Daily}},xe=e=>Object.assign(Object.assign({},Object.fromEntries(Object.entries(e).filter(([e])=>!["slots","weekdays"].includes(e)))),{entries:[{slots:e.timeslots.map(ke),weekdays:e.weekdays.map(we)}]}),$e=e=>{if(1==e.length)return e;if(e.every(t=>me(Object.assign(Object.assign({},t),{target:void 0}),Object.assign(Object.assign({},e[0]),{target:void 0})))){const t=[...new Set(e.map(e=>{var t;return null===(t=e.target)||void 0===t?void 0:t.entity_id}).filter(e=>void 0!==e))];return[Object.assign(Object.assign({},e[0]),{target:{entity_id:t.length?t:void 0}})]}return e},je=e=>{class i extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([de({attribute:!1})],i.prototype,"hass",void 0),i},Oe=(e,t)=>{let i=t.hours||0,a=t.minutes||0;(i<0||a<0)&&(i=-Math.abs(i),a=-Math.abs(a));let s=e.hours,o=e.minutes;return s<0||o<0?(s-=i,o-=a):(s+=i,o+=a),o>60?(s+=1,o-=60):(o<-60||o<0&&e.mode==fe.Fixed)&&(s-=1,o+=60),(s<0&&e.mode==fe.Fixed||s>24&&e.mode==fe.Fixed)&&(s+=24),{mode:e.mode,hours:s,minutes:o}},ze=(e,t=1)=>{let i=3600*Math.abs(e.hours)+60*Math.abs(e.minutes)+(e.seconds||0);const a=e.hours<0||e.minutes<0?-1:1;let s=Math.floor(i/3600),o=Math.round((i-3600*s)/60);return o%t!=0&&(o=Math.round(o/t)*t),o>=60&&(s++,o-=60),a<0&&(s>0?s=-s:o=-o),Object.assign(Object.assign({},e),{hours:s,minutes:o})},Se=e=>{if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number),i=ze({hours:t[0],minutes:t[1],seconds:t[2]});return{mode:fe.Fixed,hours:i.hours,minutes:i.minutes}}const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);if(t){let e=t[3].split(":").map(Number);const i=ze({hours:e[0],minutes:e[1],seconds:e[2]});let a=i.hours,s=i.minutes;return"-"==t[2]&&(a>0?a=-a:s=-s),{mode:"sunrise"==t[1]?fe.Sunrise:fe.Sunset,hours:a,minutes:s}}const i=new Date(e),a=ze({hours:i.getHours(),minutes:i.getMinutes(),seconds:i.getSeconds()});return{mode:fe.Fixed,hours:a.hours,minutes:a.minutes}},Ae=(e,t)=>{if("string"==typeof e&&(e=Se(e)),e.mode==fe.Fixed)return 3600*e.hours+60*e.minutes;if(e.mode==fe.Sunrise){const i=Se(t.states["sun.sun"].attributes.next_rising),a=Oe(i,e);return 3600*a.hours+60*a.minutes}{const i=Se(t.states["sun.sun"].attributes.next_setting),a=Oe(i,e);return 3600*a.hours+60*a.minutes}};var Ce,Ee;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ce||(Ce={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ee||(Ee={}));const Te=e=>{if(e.time_format===Ee.language||e.time_format===Ee.system){const t=e.time_format===Ee.language?e.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(t).includes("10")}return e.time_format===Ee.am_pm};var De;!function(e){e.AM="AM",e.PM="PM"}(De||(De={}));const Me=e=>({am_pm:e>=12?De.PM:De.AM,hours:e%12||12}),Pe=(e,t)=>t==De.AM?12==e?0:e:12==e?0:e+12,Le=(e,t={seconds:!0})=>{let i="";if(e.hours>=24&&(e.hours-=24),e.mode==fe.Fixed&&t.am_pm){const a=Me(e.hours).am_pm,s=Me(e.hours).hours;i=String(s).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00"),i+=" "+(a===De.AM?"am":"pm")}else e.mode==fe.Fixed?(i=String(e.hours).padStart(2,"0")+":"+String(e.minutes).padStart(2,"0"),t.seconds&&(i+=":00")):(i=e.mode+(e.hours<0||e.minutes<0?"-":"+")+String(Math.abs(e.hours)).padStart(2,"0")+":"+String(Math.abs(e.minutes)).padStart(2,"0"),t.seconds&&(i+=":00"));return i},qe=(e,t)=>{const i=e=>{(e=(e=e.map(e=>Object(Object.assign(Object.assign({},e),{start:Ae(e.start,t)<0?"00:00:00":e.start,stop:e.stop?Ae(e.stop,t)>86400?"00:00:00":e.stop:void 0})))).map(e=>{if(e.stop&&Ae(e.start,t)>Ae(e.stop,t)){if(0==Ae(e.stop,t))return Object.assign(Object.assign({},e),{stop:Le(Oe(Se(e.stop),{hours:24}))});e=Object.assign(Object.assign({},e),{start:e.stop,stop:e.start})}return e.stop&&Ae(e.stop,t)-Ae(e.start,t)<60&&(e=Object.assign(Object.assign({},e),{stop:Le(Oe(Se(e.start),{minutes:1}))})),e})).sort((e,i)=>Ae(e.start,t)>Ae(i.start,t)?1:Ae(e.start,t)<Ae(i.start,t)?-1:Ae(e.stop||e.start,t)>Ae(i.stop||i.start,t)?1:-1);let i="00:00:00",a=e.length;for(let s=0;s<a;s++){const o=e[s];Ae(o.start,t)>Ae(i,t)?(e.splice(s,0,Object.assign(Object.assign({},o),{start:i,stop:o.start,actions:[],conditions:o.conditions})),a++,s++):Ae(o.start,t)<Ae(i,t)&&(e=Object.assign(e,{[s]:Object.assign(Object.assign({},o),{start:i})})),i=o.stop||o.start}return Ae(i,t)<86400&&Ae(i,t)>0&&e.push({start:i,stop:Le({mode:fe.Fixed,hours:24,minutes:0}),actions:[],conditions:e[0].conditions}),e};return e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object(Object.assign(Object.assign({},e),{slots:i(e.slots)})))})},Ie={include:[],exclude:[],discover_existing:!0,title:!0,show_header_toggle:!1,display_options:{primary_info:"default",secondary_info:["relative-time","additional-tasks"]},sort_by:["relative-time","state"],customize:{},tags:[],exclude_tags:[]},Re={actions:[],conditions:{type:pe.Or,items:[],track_changes:!1}},Ne={entries:[{weekdays:[he.Daily],slots:[Object.assign(Object.assign({},Re),{start:"00:00:00",stop:"08:00:00"}),Object.assign(Object.assign({},Re),{start:"08:00:00",stop:"16:00:00"}),Object.assign(Object.assign({},Re),{start:"16:00:00",stop:"00:00:00"})]}],repeat_type:ye.Repeat,next_entries:[],timestamps:[],enabled:!0},He=(e,t)=>Object.keys(e).includes(t),Fe=e=>"boolean"==typeof e,Ve=e=>"string"==typeof e,Ue=e=>"object"==typeof e&&!Array.isArray(e),Be=e=>Array.isArray(e)&&e.every(e=>"string"==typeof e);var We={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"topení/chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"topení/chlazení[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]",set_mode:"nastavit režim[ na {mode}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},notify:{notify:"send notification"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"nastavit režim[ na {operation_mode}]",set_away_mode:"vypnout režim"}},Ze={alarm_control_panel:"poplašný ovládací panel",binary_sensor:"binary sensors",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"světla",lock:"zámky",media_player:"média přehrávače",notify:"notification",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},Ke={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"příští {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončete úpravy",description:"Plán, který byl změněn, je aktuálně zakázán, měl by být povolen?"},confirm_delete:{title:"Odebrat entitu?",description:"Opravdu chcete tuto entitu odebrat?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Nejsou žádné položky k zobrazení",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Nejprve vyberte časový úsek",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Období",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"}}},Je={services:We,domains:Ze,ui:Ke},Ge=Object.freeze({__proto__:null,services:We,domains:Ze,ui:Ke,default:Je}),Ye={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool:"heizen/kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heizen/kühlen[ auf {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]",set_cover_tilt_position:"Tilt Position setzen[ auf {tilt_position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]",set_mode:"Modus setzen[ auf {mode}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},notify:{notify:"Nachricht senden"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_operation_mode:"Modus setzen[ auf {operation_mode}]",set_away_mode:"Abwesenheitsmodus setzen"}},Qe={alarm_control_panel:"Alarmzentrale",binary_sensor:"binary sensors",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",notify:"notification",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},Xe={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}",next_week_day:"nächsten {weekday}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"um Mittag",at_sun_event:"beim {sunEvent}"}},dialog:{enable_schedule:{title:"Modifikationen beenden",description:"Der geänderte Zeitplan ist derzeit deaktiviert, sollte er aktiviert werden?"},confirm_delete:{title:"Entität entfernen?",description:"Bist du dir sicher, dass du diese Entität löschen möchtest?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Zeitplaner",new_schedule:"Neuer Zeitplan",default_name:"Zeitplan #{id}"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",backend_error:"Es konnte keine Verbindung mit der Schedulerkomponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",excluded_items:"{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Wähle ein Zeitfenster aus",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} ist {value}",unequal_to:"{entity} ist nicht {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Erneut prüfen wenn sich die Zustände ändern"}},period:{header:"Zeitraum",start_date:"From",end_date:"To"},repeat_type:"Verhalten nach Abschluß",tags:"Tags"}}},et={services:Ye,domains:Qe,ui:Xe},tt=Object.freeze({__proto__:null,services:Ye,domains:Qe,ui:Xe,default:et}),it={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"heat/cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heat/cool[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_percentage:"set speed[ to {percentage}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"set mode[ to {mode}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"set mode[ to {operation_mode}]",set_away_mode:"set away mode"}},at={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"lights",lock:"locks",media_player:"media players",notify:"notification",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},st={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"next {weekday}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},dialog:{enable_schedule:{title:"Complete modifications",description:"The schedule you have changed is currently disabled, do you want to enable it?"},confirm_delete:{title:"Remove entity?",description:"Are you sure you want to remove this entity?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Scheduler",new_schedule:"New schedule",default_name:"Schedule #{id}"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Period",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"},card_editor:{tabs:{entities:"Entities",other:"Other"},fields:{title:{heading:"Title of the card",options:{standard:"standard",hidden:"hidden",custom:"custom"},custom_title:"Custom title"},discover_existing:{heading:"Show all schedules",description:"This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "},time_step:{heading:"Time step",description:"Resolution (in minutes) for creating schedules"},sort_by:{heading:"Sorting options",description:"Order in which the schedules appear in the card",options:{relative_time:"Time remaining until next action",title:"Displayed title of the schedule",state:"Show active schedules on top"}},display_format_primary:{heading:"Displayed primary info",description:"Configure which label is used for schedules in the overview",options:{default:"Schedule name",entity_action:"Summary of task"}},display_format_secondary:{heading:"Displayed secondary info",description:"Configure what additional properties are visible in the overview",options:{relative_time:"Time remaining until next action",time:"Configured time for next action",days:"Repeated days of the week",additional_tasks:"Number of additional tasks"}},show_header_toggle:{heading:"Show header toggle",description:"Show toggle switch at the top of the card for enabling/disabling all entities"},tags:{heading:"Tags",description:"Use tags to divide schedules between multiple cards"},entities:{heading:"Included entities",description:"Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",included_number:"{number}/{total} selected"}}}}},ot={services:it,domains:at,ui:st},nt=Object.freeze({__proto__:null,services:it,domains:at,ui:st,default:ot}),rt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción[ a {temperature}]",set_temperature_hvac_mode_cool:"frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"calefacción/frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"calefacción/frío[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automático[ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición[ a {position}]",set_cover_tilt_position:"establecer inclinación[ a {tilt_position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]",set_mode:"establecer modo[ a {mode}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},notify:{notify:"enviar notificación"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"establecer modo[ a {operation_mode}]",set_away_mode:"establecer modo fuera de casa"}},lt={alarm_control_panel:"panel de control de alarma",binary_sensor:"binary sensors",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luces",lock:"cerraduras",media_player:"reproductores",notify:"notification",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},dt={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},dialog:{enable_schedule:{title:"Completa las modificaciones",description:"El horario que se ha cambiado está actualmente deshabilitado, ¿debería habilitarse?"},confirm_delete:{title:"¿Eliminar entidad?",description:"¿Estás seguro de que deseas eliminar esta entidad?"},weekday_picker:{title:"Días repetidos para el horario",choose:"Elegir..."},entity_picker:{title:"Elegir entidades"},action_picker:{title:"Elige Acción"}},panel:{common:{title:"Programador",new_schedule:"Nuevo horario",default_name:"Horario #{id}"},overview:{no_entries:"No hay ningún elemento que mostrar",backend_error:"Fallo de conexión con Scheduler component. Debe ser installado como integración antes de poder usar este panel.",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},editor:{repeated_days:"Días repetidos",start_time:"Inicio",stop_time:"Finalización",action:"Acción",add_action:"Agregar acción",select_timeslot:"selecciona un bloque de tiempo",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Condiciones",add_condition:"Agregar condición",types:{equal_to:"{entity} es igual a {value}",unequal_to:"{entity} es desigual a {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"Todas condiciones deben ser válidas",logic_or:"Cualquier condición debe ser válida",track_changes:"Reevaluar si una condición cambia"}},period:{header:"Período",start_date:"De",end_date:"A"},repeat_type:"acción después de la finalización",tags:"Tags"}}},ct={services:rt,domains:lt,ui:dt},ut=Object.freeze({__proto__:null,services:rt,domains:lt,ui:dt,default:ct}),mt={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_temperature_hvac_mode_heat_cool:"küte/jahutus[ @ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"küte/jahutus[ @ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatne[ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]",set_cover_tilt_position:"sea ribide kalle [ asendisse {tilt_position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]",set_mode:"vali režiim [{mode}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},notify:{notify:"send notification"},script:{script:"käivita"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_operation_mode:"vali režiim [{operation_mode}]",set_away_mode:"kodust ära"}},ht={alarm_control_panel:"valvepaneel",binary_sensor:"binary sensors",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",lawn_mower:"lawn mower",light:"valgustid",lock:"lukud",media_player:"meediamängijad",notify:"notification",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},pt={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}",next_week_day:"järgmisel {weekday}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Viige muudatused lõpule",description:"Muudetud ajakava on praegu keelatud, kas see peaks olema lubatud?"},confirm_delete:{title:"Kas eemaldan olemi?",description:"Oled kindel, et soovid selle olemi eemaldada?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastaja",new_schedule:"Uus ajakava",default_name:"Ajakava #{id}"},overview:{no_entries:"Ajastused puuduvad",backend_error:"Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Alustuseks vali ajavahemik",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periood",start_date:"From",end_date:"To"},repeat_type:"toiming peale käivitumist",tags:"Tags"}}},_t={services:mt,domains:ht,ui:pt},gt=Object.freeze({__proto__:null,services:mt,domains:ht,ui:pt,default:_t}),vt={generic:{parameter_to_value:"{parameter} {value}",action_with_parameter:"{action} {parameter}"},climate:{set_temperature:"aseta lämpötilaksi[ {temperature}]",set_temperature_hvac_mode_heat:"lämmitä[ {temperature} asteeseen]",set_temperature_hvac_mode_cool:"jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool:"lämmitä/jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool_range:"lämmitä/jäähdytä[ välillä {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatilla[ {temperature} asteeseen]",set_hvac_mode:"aseta tilaksi[ {hvac_mode}]",set_preset_mode:"aseta esivalinta[ {preset_mode}]",set_fan_mode:"aseta tuuletus[ {fan_mode}]"},cover:{close_cover:"sulje",open_cover:"avaa",set_cover_position:"aseta sijainniksi[ {position}]",set_cover_tilt_position:"aseta kallistus[ {tilt_position}]"},fan:{set_speed:"aseta nopeus[ {speed}]",set_direction:"asenta suunta[ {direction}]",oscillate:"aseta pyörimisnopeus[ {oscillate}]"},humidifier:{set_humidity:"aseta kosteus[ {humidity}]",set_mode:"aseta tilaksi {mode}"},input_number:{set_value:"aseta arvo {value}"},input_select:{select_option:"valitse[ {option}]"},select:{select_option:"valitse[ {option}]"},light:{turn_on:"kytke päälle[ {brightness} kirkkaudella]"},media_player:{select_source:"valitse lähteeksi[ {source}]"},notify:{notify:"lähetä ilmoitus"},script:{script:"suorita"},vacuum:{start_pause:"aloita / keskeytä"},water_heater:{set_operation_mode:"aseta tilaksi[ {operation_mode}]",set_away_mode:"aseta poissa-tila"}},yt={alarm_control_panel:"hälytyspaneeli",binary_sensor:"binary sensor",climate:"ilmastointi",cover:"kaihdin/tallin ovi",fan:"tuuletin",group:"ryhmä",humidifier:"ilmankosteuttimet",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"valaisin",lock:"lukko",media_player:"mediatoistin",notify:"ilmoitus",switch:"kytkin",vacuum:"imuri",water_heater:"vedenlämmitin"},ft={components:{date:{day_types_short:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},day_types_long:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},days:"päivää",tomorrow:"huomenna",repeated_days:"joka {days}",repeated_days_except:"joka päivä paitsi {excludedDays}",days_range:"{startDay} {endDay}",next_week_day:"seuraava {weekday}"},time:{absolute:"{time}",interval:"{startTime} - {endTime}",at_midnight:"keskiyöllä",at_noon:"keskipäivällä",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Suorita muutokset loppuun",description:"Muutettu aikataulu on tällä hetkellä poissa käytöstä, pitäisikö se ottaa käyttöön?"},confirm_delete:{title:"Poistetaanko kohde?",description:"Haluatko varmasti poistaa tämän kohteen?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Ajastin",new_schedule:"Uusi aikataulu",default_name:"Aikataulu #{id}"},overview:{no_entries:"Ei näytettäviä kohteita",backend_error:"Ei voitu yhdistää scheduler komponenttiin. Kortin käyttäminen vaatii scheduler integraation asentamisen.",excluded_items:"{number} {if number is 1} poissuljettu kohde {else} poissuljettua kohdetta",hide_excluded:"piilota poissuljetut kohteet",additional_tasks:"{number} {if number is 1} tehtävä {else} tehtävää"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Valitse aikaikkuna ensin",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Ajanjakso",start_date:"From",end_date:"To"},repeat_type:"toiminta tapahtuman jälkeen",tags:"Tags"},card_editor:{tabs:{entities:"Kohteet",other:"Muu"},fields:{title:{heading:"Kortin otsikko",options:{standard:"normaali",hidden:"piilotettu",custom:"muokattu"},custom_title:"Muokattu otsikko"},discover_existing:{heading:"Näytä kaikki ajoitukset",description:"Tämä kytkee käyttöön 'näytä olemassa olevat -attribuutin'. Aiemmin luodut ajastukset lisätään automaattisesti korttiin. "},time_step:{heading:"Ajastusvälit",description:"Ajastusväli minuutteina ajastusten luontiin"},sort_by:{heading:"Lajitteluasetukset",description:"Järjestys miten ajastukset näkyvät kortissa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",title:"Ajastuksen otsikko",state:"Aktiiviset ajastukset ylhäällä"}},display_format_primary:{heading:"Ensisijainen tieto",description:"Valitse mitä näytetään yhteenvedossa",options:{default:"Ajastuksen nimi",entity_action:"Ajastuksen yhteenveto"}},display_format_secondary:{heading:"Toissijainen tieto",description:"Valitse mitkä lisätiedot näkyvät yhteenvedossa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",time:"Seuraavalle toiminnolle määritetty aika",days:"Toistuvat viikonpäivät",additional_tasks:"Lisätoimintojen määrä"}},show_header_toggle:{heading:"Näytä otsikkokytkin",description:"Näytä kytkin kortin yläreunassa usean ajastuksen päälle/pois kytkemiseen"},tags:{heading:"Tunniste",description:"Käytä tunnisteita ajastusten jakamiseen korttien välillä"},entities:{heading:"Ajastettavat kohteet",description:"Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",included_number:"{number} / {total} valittu"}}}}},bt={services:vt,domains:yt,ui:ft},kt=Object.freeze({__proto__:null,services:vt,domains:yt,ui:ft,default:bt}),wt={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool:"chauffe/refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool_range:"chauffe/refroidit[ à {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]",set_fan_mode:"ajuster le mode de ventilation[ à {fan_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]",set_cover_tilt_position:"régler les volets[ à {tilt_position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]",set_mode:"ajuster le mode[ à {mode}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},notify:{notify:"envoyer une notification"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_operation_mode:"ajuster le mode[ à {operation_mode}]",set_away_mode:"choisir le mode absent"}},xt={alarm_control_panel:"panneau de contrôle de l'alarme",binary_sensor:"capteurs binaires",climate:"thermostat",cover:"volet",fan:"ventilateur",group:"groupe",humidifier:"humidificateur",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",lawn_mower:"lawn mower",light:"lumière",lock:"serrure",media_player:"lecteur multimédia",notify:"notification",switch:"interrupteur",vacuum:"aspirateur",water_heater:"chauffe eau"},$t={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}",next_week_day:"{weekday} prochain"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},dialog:{enable_schedule:{title:"Compléter les modifs",description:"Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"},confirm_delete:{title:"Supprimer l'entité ?",description:"Voulez-vous vraiment supprimer cette entité ?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Planificateur",new_schedule:"Nouvel horaire",default_name:"Horaire #{id}"},overview:{no_entries:"il n'y a pas d'entrée à montrer",backend_error:"Impossible de se connecter au composant du planificateur. Il doit être installé en tant qu'intégration avant que cette carte ne puisse être utilisée.",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Choisir d'abord une plage horaire",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Ré-évaluer lorsque la condition change"}},period:{header:"Période",start_date:"From",end_date:"To"},repeat_type:"comportement après l'achèvement",tags:"Tags"}}},jt={services:wt,domains:xt,ui:$t},Ot=Object.freeze({__proto__:null,services:wt,domains:xt,ui:$t,default:jt}),zt={generic:{parameter_to_value:"{parameter} ל {value}",action_with_parameter:"{action} עם {parameter}"},climate:{set_temperature:"קבע טמפרטורה[ ל {temperature}]",set_temperature_hvac_mode_heat:"חימום[ ל {temperature}]",set_temperature_hvac_mode_cool:"קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool:"חימום/קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool_range:"חימום/קירור[ ל {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"אוטומטי[ ל {temperature}]",set_hvac_mode:"קבע מצב עבודה[ ל {hvac_mode}]",set_preset_mode:"קבע הגדרה[ ל {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"סגירה",open_cover:"פתיחה",set_cover_position:"קבע מיקום[ ל {position}]",set_cover_tilt_position:"קבע הטיה[ ל {tilt_position}]"},fan:{set_speed:"קבע מהירות[ ל {speed}]",set_direction:"קבע כיוון[ ל {direction}]",oscillate:"קבע תנודה[ ל {oscillate}]"},humidifier:{set_humidity:"קבע לחות[ ל {humidity}]",set_mode:"קבע מצב עבודה[ ל {mode}]"},input_number:{set_value:"קבע ערך[ ל {value}]"},input_select:{select_option:"בחר אפשרות[ {option}]"},select:{select_option:"בחר אפשרות[ {option}]"},light:{turn_on:"הדלקה[ בעוצמה של {brightness}]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"בצע"},vacuum:{start_pause:"התחל / הפסק"},water_heater:{set_operation_mode:"קבע מצב עבודה[ ל {operation_mode}]",set_away_mode:"קבע מצב מוץ לבית"}},St={alarm_control_panel:"בקרת אזעקה",binary_sensor:"binary sensors",climate:"מזג אוויר",cover:"תריסים",fan:"מאווררים",group:"קבוצות יישויות",humidifier:"מכשירי אדים",input_boolean:"כניסה בוליאנית",input_number:"כניסה מספרית",input_select:"בחירת כניסה",lawn_mower:"lawn mower",light:"תאורה",lock:"מנעולים",media_player:"נגני מדיה",notify:"notification",switch:"מפסקים",vacuum:"שואבי אבק",water_heater:"מחממי מים"},At={components:{date:{day_types_short:{daily:"כל יום",workdays:"ימי חול",weekend:"סוף שבוע"},day_types_long:{daily:"כל יום",workdays:"בימי חול",weekend:"בסוף השבוע"},days:"ימים",tomorrow:"מחר",repeated_days:"בכל {days}",repeated_days_except:"בכל יום פרט ל  {excludedDays}",days_range:"מ- {startDay} ועד- {endDay}",next_week_day:"הבא {weekday}"},time:{absolute:"בשעה {time}",interval:"משעה {startTime} עד שעה {endTime}",at_midnight:"בחצות הלילה",at_noon:"בחצות היום",at_sun_event:"ב {sunEvent}"}},dialog:{enable_schedule:{title:"השלם את השינויים",description:"לוח הזמנים ששונה מושבת כעת, האם צריך להפעיל אותו?"},confirm_delete:{title:"להסיר את הישות?",description:"האם בוודאות ברצונך להסיר ישות זו?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"לוח זמנים",new_schedule:"לוח זמנים חדש",default_name:"לוח זמנים #{id}"},overview:{no_entries:"אין פריטים להצגה",backend_error:"אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",excluded_items:"{number} לא נכלל {if number is 1} פריט {else} פריטים",hide_excluded:"הסתר פריטים לא כלולים",additional_tasks:"{number} נוסף {if number is 1} משימה {else} משימות"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"בחר משבצת זמן קודם",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"פרק זמן",start_date:"From",end_date:"To"},repeat_type:"התנהגות לאחר הפעלה",tags:"Tags"}}},Ct={services:zt,domains:St,ui:At},Et=Object.freeze({__proto__:null,services:zt,domains:St,ui:At,default:Ct}),Tt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"melegíteni[ to {temperature}]",set_temperature_hvac_mode_cool:"hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"melegíteni/hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"melegíteni/hűtés[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatikus[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"mód beállítása[ to {mode}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},notify:{notify:"send notification"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"mód beállítása[ to {operation_mode}]",set_away_mode:"set away mode"}},Dt={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",lawn_mower:"lawn mower",light:"lámpa",lock:"locks",media_player:"lejátszó",notify:"notification",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},Mt={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"következő {weekday}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},dialog:{enable_schedule:{title:"Végezze el a módosításokat",description:"A módosított ütemezés jelenleg le van tiltva, engedélyezni kell?"},confirm_delete:{title:"Biztos benne, hogy eltávolítja az entitást?",description:"Biztos benne, hogy el szeretné távolítani ezt az entitást?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Időzítések",new_schedule:"Új ütemezés",default_name:"Ütemterv #{id}"},overview:{no_entries:"Nincs megjeleníthető elem",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Select a timeslot",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Időszak",start_date:"From",end_date:"To"},repeat_type:"behaviour after completion",tags:"Tags"}}},Pt={services:Tt,domains:Dt,ui:Mt},Lt=Object.freeze({__proto__:null,services:Tt,domains:Dt,ui:Mt,default:Pt}),qt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"riscaldamento/raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"riscaldamento/raffrescamento[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]",set_cover_tilt_position:"imposta inclinazione[ su {tilt_position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]",set_mode:"imposta modalità[ a {mode}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},notify:{notify:"invia notifica"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_operation_mode:"imposta modalità[ a {operation_mode}]",set_away_mode:"imposta fuori casa"}},It={alarm_control_panel:"pannello di controllo allarme",binary_sensor:"binary sensors",climate:"clima",cover:"serrande",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input booleani",input_number:"input numerici",input_select:"input select",lawn_mower:"lawn mower",light:"luci",lock:"lucchetti",media_player:"media player",notify:"notification",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},Rt={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"giorni",tomorrow:"domani",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",next_week_day:"prossimo {weekday}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},dialog:{enable_schedule:{title:"Completa le modifiche",description:"La pianificazione modificata è attualmente disabilitata, dovrebbe essere abilitata?"},confirm_delete:{title:"Vuoi rimuovere l'entità?",description:"Sei sicuro di voler rimuovere questa entità?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Schedulatore",new_schedule:"Nuovo orario",default_name:"Orario #{id}"},overview:{no_entries:"Non ci sono oggetti da visualizzare",backend_error:"Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Seleziona una fascia oraria",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periodo",start_date:"From",end_date:"To"},repeat_type:"comportamento dopo il completamento",tags:"Tags"}}},Nt={services:qt,domains:It,ui:Rt},Ht=Object.freeze({__proto__:null,services:qt,domains:It,ui:Rt,default:Nt}),Ft={generic:{parameter_to_value:"{parameter} uz {value}",action_with_parameter:"{action} ar {parameter}"},climate:{set_temperature:"uzstādīt temperatūru[ uz {temperature}]",set_temperature_hvac_mode_heat:"sildīt[ līdz {temperature}]",set_temperature_hvac_mode_cool:"atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool:"sildīt/atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool_range:"sildīt/atdzesēt[ uz {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ uz {temperature}]",set_hvac_mode:"iestatīt[ uz {hvac_mode}]",set_preset_mode:"iestatīt režīmu[ uz {preset_mode}]",set_fan_mode:"iestatīt ventilatora režīmu[ uz {fan_mode}]"},cover:{close_cover:"aizvērt",open_cover:"atvērt",set_cover_position:"uzstādīt pozīciju[ uz {position}]",set_cover_tilt_position:"uzstādīt slīpuma stāvokli[ uz {tilt_position}]"},fan:{set_speed:"iestatīt ātrumu[ uz {speed}]",set_direction:"iestatīt virzienu[ uz {direction}]",oscillate:"iestatīt oscilāciju[ uz {oscillate}]"},humidifier:{set_humidity:"iestatīt mitrumu[ uz {humidity}]",set_mode:"iestatīt režīmu[ uz {mode}]"},input_number:{set_value:"iestatīt vērtību[ uz {value}]"},input_select:{select_option:"izvēlēties opciju[ {option}]"},select:{select_option:"izvēlēties opciju[ {option}]"},light:{turn_on:"ieslēgt[ ar {brightness} spilgtumu]"},media_player:{select_source:"izvēlēties avotu[ {source}]"},notify:{notify:"nosūtīt paziņojumu"},script:{script:"izpildīt"},vacuum:{start_pause:"sākt / pauze"},water_heater:{set_operation_mode:"iestatīt režīmu[ uz {operation_mode}]",set_away_mode:"iestatīt prombūtnes režīmu"}},Vt={alarm_control_panel:"trauksmes kontroles panelis",binary_sensor:"binārie sensori",climate:"klimats",cover:"pārsegi",fan:"ventilatori",group:"vienību grupas",humidifier:"mitrinātāji",input_boolean:"ievades binārais lauks",input_number:"ievades numurs",input_select:"ievades izvēle",lawn_mower:"lawn mower",light:"gaismas",lock:"slēdzene",media_player:"multivides atskaņotāji",notify:"paziņojums",switch:"slēdži",vacuum:"putekļu sūcēji",water_heater:"ūdens sildītāji"},Ut={components:{date:{day_types_short:{daily:"ikdienišķs",workdays:"darba dienas",weekend:"nedēļas nogale"},day_types_long:{daily:"katru dienu",workdays:"darba dienās",weekend:"nedēļas nogalē"},days:"dienas",tomorrow:"rītdiena",repeated_days:"katras {days}",repeated_days_except:"katru dienu, izņemot {excludedDays}",days_range:"no {startDay} līdz {endDay}",next_week_day:"nākošo {weekday}"},time:{absolute:"kad {time}",interval:"no {startTime} līdz {endTime}",at_midnight:"kad midnight",at_noon:"kad noon",at_sun_event:"kad {sunEvent}"}},dialog:{enable_schedule:{title:"Pabeigt modificēšanu",description:"Izmainītais grafiks pašlaik ir atspējots, vai vēlaties to iespējot?"},confirm_delete:{title:"Vai dzēst vienību?",description:"Vai tiešām vēlaties dzēst šo vienību?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plānotājs",new_schedule:"Jauns grafiks",default_name:"Grafiks #{id}"},overview:{no_entries:"Nav parādāmu vienību",backend_error:"Nevar izveidot savienojumu ar plānotāja komponenti. Pirms šīs kartes izmantošanas tā ir jāinstalē kā integrācija.",excluded_items:"{number} izslēgtas {if number is 1} vienība {else} vienības",hide_excluded:"paslēpt izslēgtās vienības",additional_tasks:"{number} papildu {if number is 1} uzdevums {else} uzdevumi"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Vispirms izvēlieties laika slotu",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Pārvērtēt, kad mainās nosacījumi"}},period:{header:"Periods",start_date:"From",end_date:"To"},repeat_type:"uzvedība pēc beigām",tags:"Tags"},card_editor:{tabs:{entities:"Vienības",other:"Cits"},fields:{title:{heading:"Kartes nosaukums",options:{standard:"standarta",hidden:"paslēpts",custom:"pielāgots"},custom_title:"Pielāgots nosaukums"},discover_existing:{heading:"Rādīt visus grafikus",description:"Šis iestata 'atklāt esošo' parametru. Iepriekš izveidotie grafiki automātiski tiks pievienoti kartei."},time_step:{heading:"Laika solis",description:"Izšķirtspēja (minūtēs) grafiku izveidei"},sort_by:{heading:"Kārtošanas opcijas",description:"Kārtība, kādā grafiki parādās kartē",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",title:"Grafika nosaukums",state:"Rādīt aktīvos grafikus augšā"}},display_format_primary:{heading:"Rādītā primārā informācija",description:"Konfigurējiet, kura informācija tiek izmantota grafiku pārskatā",options:{default:"Grafika nosaukums",entity_action:"Uzdevuma kopsavilkums"}},display_format_secondary:{heading:"Rādītā sekundārā informācija",description:"Konfigurējiet, kuras papildu īpašības ir redzamas pārskatā",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",time:"Konfigurētais laiks nākamajai darbībai",days:"Atkārtotas nedēļas dienas",additional_tasks:"Papildu uzdevumu skaits"}},show_header_toggle:{heading:"Rādīt galvenes pārslēgšanu",description:"Rādīt pārslēgšanas slēdzi kartes augšdaļā, lai iespējotu/atspējotu visas vienības"},tags:{heading:"Tagi",description:"Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"},entities:{heading:"Iekļautās vienības",description:"Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",included_number:"{number}/{total} izvēlēts"}}}}},Bt={services:Ft,domains:Vt,ui:Ut},Wt=Object.freeze({__proto__:null,services:Ft,domains:Vt,ui:Ut,default:Bt}),Zt={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool:"verwarmen/koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool_range:"verwarmen/koelen[ naar {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen",set_fan_mode:"ventilatiemodus aanpassen[ naar {fan_mode}]"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]",set_cover_tilt_position:"hellingshoek instellen[ naar {tilt_position}]"},fan:{set_percentage:"snelheid instellen[ op {percentage}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]",set_mode:"modus aanpassen[ naar {mode}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},notify:{notify:"notificatie sturen"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_operation_mode:"modus aanpassen[ naar {operation_mode}]",set_away_mode:"stel afwezigheidsmode in"}},Kt={alarm_control_panel:"alarmsystemen",binary_sensor:"binaire sensoren",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",lawn_mower:"lawn mower",light:"verlichting",lock:"sloten",media_player:"mediaspelers",notify:"notificatie",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},Jt={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}",next_week_day:"volgende week {weekday}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},dialog:{enable_schedule:{title:"Wijzigingen voltooid",description:"Deze planning is momenteel gedeactiveerd. Dient deze te worden ingeschakeld?"},confirm_delete:{title:"Entiteit verwijderen?",description:"Weet je zeker dat je dit item wilt verwijderen?"},weekday_picker:{title:"Herhaalde dagen voor tijdschema",choose:"Kies..."},entity_picker:{title:"Kies entiteiten"},action_picker:{title:"Kies actie"}},panel:{common:{title:"Tijdplanner",new_schedule:"Nieuw schema",default_name:"Schema #{id}"},overview:{no_entries:"Er zijn geen items aangemaakt",backend_error:"Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},editor:{repeated_days:"Herhaling",start_time:"Starttijd",stop_time:"Eindtijd",action:"Actie",add_action:"Actie toevoegen",select_timeslot:"Selecteer een tijdslot...",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Condities",add_condition:"Conditie toevoegen",types:{equal_to:"{entity} is gelijk aan {value}",unequal_to:"{entity} is ongelijk aan {value}",above:"{entity} is hoger dan {value}",below:"{entity} is lager dan {value}"},options:{logic_and:"Alle condities moeten zijn voldaan",logic_or:"Een van de condities moet zijn voldaan",track_changes:"Herevalueer als de condities veranderen"}},period:{header:"Periode",start_date:"Vanaf",end_date:"Tot"},repeat_type:"Gedrag na voltooiing",tags:"Tags"}}},Gt={services:Zt,domains:Kt,ui:Jt},Yt=Object.freeze({__proto__:null,services:Zt,domains:Kt,ui:Jt,default:Gt}),Qt={generic:{parameter_to_value:"{parameter} til {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat:"oppvarming[ til {temperature}]",set_temperature_hvac_mode_cool:"kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool:"oppvarming/kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool_range:"oppvarming/kjøling[ til {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ til {temperature}]",set_hvac_mode:"sett modus[ til {hvac_mode}]",set_preset_mode:"sett forhåndsvalg[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ til {position}]",set_cover_tilt_position:"sett vippestilling[ til {tilt_position}]"},fan:{set_speed:"sett hastighet[ til {speed}]",set_direction:"sett retning[ til {direction}]",oscillate:"sett svingning[ til {oscillate}]"},humidifier:{set_humidity:"sett luftfuktighet[ til {humidity}]",set_mode:"sett modus[ til {mode}]"},input_number:{set_value:"sett verdi[ til {value}]"},input_select:{select_option:"velg[ {option}]"},select:{select_option:"velg[ {option}]"},light:{turn_on:"slå på[ med {brightness} lysstyrke]"},media_player:{select_source:"velg kilde[ {source}]"},notify:{notify:"send notifikasjon"},script:{script:"utfør"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"sett modus[ til {operation_mode}]",set_away_mode:"sett bortemodus"}},Xt={alarm_control_panel:"alarmpanel",binary_sensor:"binary sensors",climate:"klima",cover:"solskjerming",fan:"vifter",group:"grupper",humidifier:"luftfuktere",input_boolean:"input boolsk",input_number:"input nummer",input_select:"input valg",lawn_mower:"lawn mower",light:"lys",lock:"låser",media_player:"mediaspillere",notify:"notification",switch:"brytere",vacuum:"støvsugere",water_heater:"varmtvannsberedere"},ei={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},days:"Dager",tomorrow:"imorgen",repeated_days:"hver {days}",repeated_days_except:"hver dag unntatt {excludedDays}",days_range:"fra {startDay} til {endDay}",next_week_day:"neste {weekday}"},time:{absolute:"kl. {time}",interval:"fra {startTime} til {endTime}",at_midnight:"ved midnatt",at_noon:"kl. 12.00",at_sun_event:"ved {sunEvent}"}},dialog:{enable_schedule:{title:"Fullfør endringene",description:"Tidsplanen som er endret er for øyeblikket deaktivert, bør den være aktivert?"},confirm_delete:{title:"Vil du fjerne entiteten?",description:"Er du sikker på at du vil fjerne denne entiteten?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Tidsplan",new_schedule:"Ny tidsplan",default_name:"Tidsplan #{id}"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",backend_error:"Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",excluded_items:"{number} ekskludert {if number is 1} element {else} elementer",hide_excluded:"skjul ekskluderte elementer",additional_tasks:"{number} flere {if number is 1} oppgaver {else} oppgaver"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Velg tidsluke",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Periode",start_date:"From",end_date:"To"},repeat_type:"oppførsel etter fullføring",tags:"Tags"}}},ti={services:Qt,domains:Xt,ui:ei},ii=Object.freeze({__proto__:null,services:Qt,domains:Xt,ui:ei,default:ti}),ai={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_temperature_hvac_mode_heat_cool:"grzej/chłodź[ do {temperature}]",set_temperature_hvac_mode_heat_cool_range:"grzej/chłodź[ do {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatyczny[ do {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]",set_cover_tilt_position:"ustaw pozycję lameli[ na {tilt_position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]",set_mode:"ustaw tryb[ na {mode}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},notify:{notify:"wyślij powiadomienie"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"ustaw tryb[ na {operation_mode}]",set_away_mode:"ustaw tryb nieobecności"}},si={alarm_control_panel:"panel kontrolny alarmu",binary_sensor:"sensor binarny",climate:"klimatyzacja",cover:"roleta",fan:"wentylator",group:"grupa",humidifier:"nawilżacz",input_boolean:"pole wartości logicznej",input_number:"pole numeryczne",input_select:"pole wyboru",lawn_mower:"kosiarka",light:"światło",lock:"zamkek",media_player:"odtwarzacz",notify:"powiadomienie",switch:"przełącznik",vacuum:"odkurzacz",water_heater:"podgrzewacz wody"},oi={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"następny/a {weekday}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północ",at_noon:"w południe",at_sun_event:"o {sunEvent}"}},dialog:{enable_schedule:{title:"Zakończ modyfikacje",description:"Zmieniony harmonogram jest obecnie wyłączony, czy powinien być włączony?"},confirm_delete:{title:"Usunąć encję?",description:"Czy na pewno chcesz usunąć tę encję?"},weekday_picker:{title:"Repeated days for schedule",choose:"Wybierz..."},entity_picker:{title:"Wybierz encje"},action_picker:{title:"Wybierz akcje"}},panel:{common:{title:"Harmonogram",new_schedule:"Nowy harmonogram",default_name:"Harmonogram #{id}"},overview:{no_entries:"Nie ma elementów do pokazania",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Akcja",add_action:"Dodaj akcję",select_timeslot:"Najpierw wybierz przedział czasowy",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Warunki",add_condition:"Dodaj warunek",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Okres",start_date:"Od",end_date:"Do"},repeat_type:"zachowanie po zakończeniu",tags:"Tagi"}}},ni={services:ai,domains:si,ui:oi},ri=Object.freeze({__proto__:null,services:ai,domains:si,ui:oi,default:ni}),li={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"send notification"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},di={alarm_control_panel:"painel de controlo de alarme",binary_sensor:"binary sensors",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"lawn mower",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notification",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},ci={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover a entidade?",description:"Tem a certeza que deseja remover esta entidade?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Não consegui ligar ao componente de agendamento. Essa integração tem que ser instalada antes da utilização deste cartão.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selecionar um período horário",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Revaliar em caso de alterações"}},period:{header:"Período",start_date:"From",end_date:"To"},repeat_type:"comportamento após a conclusão",tags:"Tags"}}},ui={services:li,domains:di,ui:ci},mi=Object.freeze({__proto__:null,services:li,domains:di,ui:ci,default:ui}),hi={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo do ventilador[ para {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir a posição de inclinação[ para {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"enviar notificação"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},pi={alarm_control_panel:"painel de alarme",binary_sensor:"sensores binários",climate:"ambiente",cover:"persiana",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"lawn mower",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notificar",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},_i={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"de {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover entidade?",description:"Tem certeza de que deseja remover esta entidade?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens para mostrar",backend_error:"Não foi possível conectar com o componente agendador. Ele precisa ser instalado como integração antes que este cartão possa ser usado.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selecionar um período horário",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Reavaliar quando as condições mudarem"}},period:{header:"Período",start_date:"From",end_date:"To"},repeat_type:"comportamento após a conclusão",tags:"Tags"}}},gi={services:hi,domains:pi,ui:_i},vi=Object.freeze({__proto__:null,services:hi,domains:pi,ui:_i,default:gi}),yi={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool:"încălzire/răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool_range:"încălzire/răcire[ la {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]",set_mode:"setare mod[ la {mode}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},notify:{notify:"send notification"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_operation_mode:"setare mod[ la {operation_mode}]",set_away_mode:"setare mod plecat"}},fi={alarm_control_panel:"panou control alarmă",binary_sensor:"binary sensors",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",lawn_mower:"lawn mower",light:"lumini",lock:"încuietori",media_player:"media playere",notify:"notification",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},bi={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}",next_week_day:"{weekday} viitoare"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},dialog:{enable_schedule:{title:"Completați modificările",description:"Programul care a fost modificat este momentan dezactivat, ar trebui activat?"},confirm_delete:{title:"Ștergeți entitatea?",description:"Sigur doriți să eliminați această entitate?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Planificator",new_schedule:"Noul program",default_name:"Program #{id}"},overview:{no_entries:"Nu există elemente de afișat",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Selectați un interval orar",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"Perioadă",start_date:"From",end_date:"To"},repeat_type:"comportament după declanșare",tags:"Tags"}}},ki={services:yi,domains:fi,ui:bi},wi=Object.freeze({__proto__:null,services:yi,domains:fi,ui:bi,default:ki}),xi={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool:"обогрев/охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"обогрев/охлаждение[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвто[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]",set_cover_tilt_position:"установить наклон[ {tilt_position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]",set_mode:"установить режим[ {mode}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},notify:{notify:"послать сообщение"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"установить режим[ {operation_mode}]",set_away_mode:"установить режим вне дома"}},$i={alarm_control_panel:"панель управления сигнализацией",binary_sensor:"binary sensors",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",lawn_mower:"lawn mower",light:"освещение",lock:"замки",media_player:"медиа-плееры",notify:"notification",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},ji={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}",next_week_day:"в следующую {weekday}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},dialog:{enable_schedule:{title:"Завершите модификации",description:"Расписание, которое было изменено, в настоящее время отключено, следует ли его включить?"},confirm_delete:{title:"Удалить объект?",description:"Вы уверены, что хотите удалить этот объект?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планировщик",new_schedule:"Новое расписание",default_name:"Расписание #{id}"},overview:{no_entries:"Отсутствуют элементы",backend_error:"Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Выберите временной слот",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"период",start_date:"From",end_date:"To"},repeat_type:"поведение после срабатывания",tags:"Tags"}}},Oi={services:xi,domains:$i,ui:ji},zi=Object.freeze({__proto__:null,services:xi,domains:$i,ui:ji,default:Oi}),Si={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastaviť teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"vykurovanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"vykurovanie/chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"vykurovanie/chladenie[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastaviť režim[ na {hvac_mode}]",set_preset_mode:"nastaviť predvoľbu[ {preset_mode}]",set_fan_mode:"nastaviť režim ventilátora[ to {fan_mode}]"},cover:{close_cover:"zatvoriť",open_cover:"otvoriť",set_cover_position:"nastaviť polohu[ na {position}]",set_cover_tilt_position:"nastaviť naklonenie[ na {tilt_position}]"},fan:{set_speed:"nastaviť rýchlosť[ na {speed}]",set_direction:"nastaviť smer[ na {direction}]",oscillate:"nastaviť osciláciu[ na {oscillate}]"},humidifier:{set_humidity:"nastaviť vlhkosť[ na {humidity}]",set_mode:"nastaviť režim[ na {mode}]"},input_number:{set_value:"nastaviť hodnotu[ na {value}]"},input_select:{select_option:"vybrať možnosť[ {option}]"},select:{select_option:"vybrať možnosť[ {option}]"},light:{turn_on:"zapnúť[ na {brightness} jas]"},media_player:{select_source:"vybrať zdroj[ {source}]"},notify:{notify:"poslať notifikáciu"},script:{script:"spustiť"},vacuum:{start_pause:"štart / pauza"},water_heater:{set_operation_mode:"nastaviť režim[ na {operation_mode}]",set_away_mode:"nastaviť mód neprítomný"}},Ai={alarm_control_panel:"ovládací panel alarmu",binary_sensor:"binárny snímač",climate:"klimatizácia",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"vstup boolean",input_number:"vstup číslo",input_select:"vstup voľba",lawn_mower:"lawn mower",light:"svetlá",lock:"zámky",media_player:"mediálne prehrávače",notify:"notification",switch:"vypínače",vacuum:"vysávače",water_heater:"ohrievače vody"},Ci={components:{date:{day_types_short:{daily:"denne",workdays:"pracovné dni",weekend:"víkend"},day_types_long:{daily:"každý deň",workdays:"cez pracovné dni",weekend:"cez víkend"},days:"dni",tomorrow:"zajtra",repeated_days:"každý {days}",repeated_days_except:"každý deň okrem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"budúcu {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od polnoci",at_noon:"od obeda",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončite úpravy",description:"Plán, ktorý sa zmenil, je momentálne zakázaný, mal by byť povolený?"},confirm_delete:{title:"Odstrániť entitu?",description:"Naozaj chcete odstrániť túto entitu?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Žiadne položky k zobrazeniu",backend_error:"Nepodarilo sa pripojiť k Scheduler Component. Musí byť nainštalovaný ako integrácia pred použitím tejto karty.",excluded_items:"Vylúčené položky: {number}",hide_excluded:"skryť vylúčené položky",additional_tasks:"Ďalšie úlohy: {number}"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Najprv vyberte časový úsek",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Prehodnoťte, keď sa zmenia podmienky"}},period:{header:"Obdobie",start_date:"From",end_date:"To"},repeat_type:"správanie sa po spustení",tags:"Tags"},card_editor:{tabs:{entities:"Entity",other:"Iné"},fields:{title:{heading:"Názov karty",options:{standard:"štandardné",hidden:"skryté",custom:"vlastné"},custom_title:"Vlastný názov"},discover_existing:{heading:"Zobraziť všetky plány",description:"Tým sa nastaví parameter „objaviť existujúce“. Predtým vytvorené plány sa automaticky pridajú na kartu."},time_step:{heading:"Časový krok",description:"Rozlíšenie (v minútach) pre vytváranie plánov"},sort_by:{heading:"Možnosti triedenia",description:"Poradie, v akom sa rozvrhy zobrazujú na karte",options:{relative_time:"Zostávajúci čas do ďalšej akcie",title:"Zobrazený názov rozvrhu",state:"Zobraziť aktívne plány navrchu"}},display_format_primary:{heading:"Zobrazené primárne informácie",description:"V prehľade nakonfigurujte, ktorý štítok sa použije pre plány",options:{default:"Názov rozvrhu",entity_action:"Zhrnutie úlohy"}},display_format_secondary:{heading:"Zobrazené sekundárne informácie",description:"Nakonfigurujte, ktoré ďalšie vlastnosti sú viditeľné v prehľade",options:{relative_time:"Zostávajúci čas do ďalšej akcie",time:"Nastavený čas pre ďalšiu akciu",days:"Opakované dni v týždni",additional_tasks:"Počet dodatočných úloh"}},show_header_toggle:{heading:"Zobraziť prepínač hlavičky",description:"Zobraziť prepínač v hornej časti karty na povolenie/zakázanie všetkých entít"},tags:{heading:"Tagy",description:"Použite štítky na rozdelenie plánov medzi viacero kariet"},entities:{heading:"Zahrnuté entity",description:"Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",included_number:"{number}/{total} vybraný"}}}}},Ei={services:Si,domains:Ai,ui:Ci},Ti={generic:{parameter_to_value:"{parameter} v {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"nastavi temperaturo[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrej[ na {temperature}]",set_temperature_hvac_mode_cool:"ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrej/ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrej/ohladi[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"samodejno[ na {temperature}]",set_hvac_mode:"nastavi način[ na {hvac_mode}]",set_preset_mode:"nastavi preset[ na {preset_mode}]",set_fan_mode:"nastavi ventilator[ na {fan_mode}]"},cover:{close_cover:"zapri",open_cover:"odpri",set_cover_position:"nastavi pozicijo[ na {position}]",set_cover_tilt_position:"nastavi naklon[ na {tilt_position}]"},fan:{set_speed:"nastavi hitrost[ na {speed}]",set_direction:"nastavi smer[ na {direction}]",oscillate:"nastavi obračanje[ na {oscillate}]"},humidifier:{set_humidity:"nastavi vlažnost[ na {humidity}]",set_mode:"nastavi način[ na {mode}]"},input_number:{set_value:"nastavi vrednost[ na {value}]"},input_select:{select_option:"izberi možnost[ {option}]"},select:{select_option:"izberi možnost[ {option}]"},light:{turn_on:"vključi[ z {brightness} brightness]"},media_player:{select_source:"Izberi vir[ {source}]"},notify:{notify:"pošlji sporočilo"},script:{script:"izvedi"},vacuum:{start_pause:"zaženi / ustavi"},water_heater:{set_operation_mode:"nastavi način[ na {operation_mode}]",set_away_mode:"nastavi način odsoten"}},Di={alarm_control_panel:"kontrolna plošča alarma",binary_sensor:"binarni sensorji",climate:"klime",cover:"rolete",fan:"ventilatorji",group:"skupine entitet",humidifier:"vlažilniki",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luči",lock:"ključavnice",media_player:"medijsi predvajalniki",notify:"obvestila",switch:"stikala",vacuum:"sesalniki",water_heater:"grelniki vode"},Mi={components:{date:{day_types_short:{daily:"dnevno",workdays:"delovniki",weekend:"vikend"},day_types_long:{daily:"vsak dan",workdays:"ob delovnikih",weekend:"ob vikendih"},days:"dni",tomorrow:"jutri",repeated_days:"vsakih {days}",repeated_days_except:"vsak dan razen {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"naslednji {weekday}"},time:{absolute:"ob {time}",interval:"od {startTime} do {endTime}",at_midnight:"opolnoči",at_noon:"opoldne",at_sun_event:"ob {sunEvent}"}},dialog:{enable_schedule:{title:"Zaključi spremembe",description:"Urnik, katerega ste spremenili je trenutno izključen, ali ga želite omogočiti?"},confirm_delete:{title:"Ali želite odstraniti entiteto?",description:"Ali ste prepričani, da želite odstraniti to entiteto?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Urnik",new_schedule:"Nov urnik",default_name:"Urnik #{id}"},overview:{no_entries:"Ni vpisov za prikaz",backend_error:"Ni povezave s komponento urnika. Komponenta mora biti nameščena kot integracija, preden lahko uporabite to kartico.",excluded_items:"{number}{if number is 1} izločen predmet {else} izločenih predmetov",hide_excluded:"skrij izločene predmete",additional_tasks:"še {number}{if number is 1} opravilo {else} opravil"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Najprej izberi časovni okvir",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Ponovno preglej ko se pogoji spremenijo"}},period:{header:"Perioda",start_date:"From",end_date:"To"},repeat_type:"obnašanje, ko končaš",tags:"Tags"},card_editor:{tabs:{entities:"Entitete",other:"Ostalo"},fields:{title:{heading:"Ime kartice",options:{standard:"standardno",hidden:"skrito",custom:"po meri"},custom_title:"Ime po želji"},discover_existing:{heading:"Prikaži vse urnike",description:"Tole nastavi parameter 'discover existing'. Prej kreirani urniki bodo samodejno dodani v kartico. "},time_step:{heading:"Časovni korak",description:"Ločljivost (v minutah) za kreiranje urnikov"},sort_by:{heading:"Možnosti sortiranja",description:"Zaporedje, po katerem se prikažejo urniki na kartici",options:{relative_time:"Preostali čas do naslednje akcije",title:"Prikazano ime urnika",state:"Prikaži aktivne urnike na vrhu"}},display_format_primary:{heading:"Prikazane primarne informacije",description:"Nastavite, kaj se prikazuje v pregledu urnikov",options:{default:"Ime urnika",entity_action:"Povzetek operacije"}},display_format_secondary:{heading:"Prikazane sekundarne informacije",description:"Nastavite, katere dodatne informacije želite imeti prikazane v pregledu",options:{relative_time:"Preostali čas do naslednje akcije",time:"Nastavljen čas za naslednjo akcijo",days:"Katere dni/kdaj se sproži akcija",additional_tasks:"Število dodatnih opravil"}},show_header_toggle:{heading:"Prikaži glavo",description:"Na vrhu prikaže stikalo, s katerim lahko omogočite/izključite vse entitete naenkrat"},tags:{heading:"Tag-i",description:"Uporabite tag-e za ločevanje urnikov med več karticami"},entities:{heading:"Vključene entitete",description:"Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",included_number:"{number}/{total} izbranih"}}}}},Pi={services:Ti,domains:Di,ui:Mi},Li={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"нагрів/охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"нагрів/охолодження[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвтоматичний[ to {temperature}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]",set_mode:"встановити режим[ to {mode}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},notify:{notify:"send notification"},script:{script:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"встановити режим[ to {operation_mode}]",set_away_mode:"встановити режим Не вдома"}},qi={alarm_control_panel:"панель керування сигналізацією",binary_sensor:"binary sensors",climate:"клімат",cover:"жалюзі",fan:"вентилятори",group:"групи",humidifier:"зволожувачі",input_boolean:"логічні",input_number:"числові",input_select:"списки",lawn_mower:"lawn mower",light:"освітлення",lock:"замки",media_player:"медіаплеєри",notify:"notification",switch:"вимикачі",vacuum:"пилососи",water_heater:"водонагрівачі"},Ii={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}",next_week_day:"наступної {weekday}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},dialog:{enable_schedule:{title:"Завершіть зміни",description:"Розклад, який було змінено, наразі вимкнено, чи потрібно його ввімкнути?"},confirm_delete:{title:"Видалити сутність?",description:"Ви дійсно бажаєте видалити цю сутність?"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"Планувальник",new_schedule:"Новий розклад",default_name:"Розклад #{id}"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"Спершу виберіть часовий проміжок",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"період",start_date:"From",end_date:"To"},repeat_type:"поведінка після спрацювання",tags:"Tags"}}},Ri={services:Li,domains:qi,ui:Ii},Ni={generic:{parameter_to_value:"{parameter} 至 {value}",action_with_parameter:"{action} 使用 {parameter}"},climate:{set_temperature:"设定温度[ 至 {temperature}]",set_temperature_hvac_mode_heat:"制热模式[ 至 {temperature}]",set_temperature_hvac_mode_cool:"制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool:"制热模式/制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool_range:"制热模式/制冷模式[ 至 {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"自动[ 至 {temperature}]",set_hvac_mode:"设定模式[ 为 {hvac_mode}]",set_preset_mode:"设定预设模式[ 为 {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"关闭",open_cover:"打开",set_cover_position:"设定位置[ 至 {position}]",set_cover_tilt_position:"设定倾斜位置[ 至 {tilt_position}]"},fan:{set_speed:"设定风速[ 至 {speed}]",set_direction:"设定方向[ 至 {direction}]",oscillate:"设置摇摆[ 至 {oscillate}]"},humidifier:{set_humidity:"设定湿度[ 至 {humidity}]",set_mode:"设定模式[ 为 {mode}]"},input_number:{set_value:"设定数值[ 至 {value}]"},input_select:{select_option:"选择选项[ {option}]"},select:{select_option:"选择选项[ {option}]"},light:{turn_on:"打开[ 并设定亮度为 {brightness}]"},media_player:{select_source:"选择播放源[ {source}]"},notify:{notify:"发送通知"},script:{script:"执行"},vacuum:{start_pause:"开始 / 暂停"},water_heater:{set_operation_mode:"设定模式[ 为 {operation_mode}]",set_away_mode:"设定离开模式"}},Hi={alarm_control_panel:"警戒控制面板",binary_sensor:"binary sensors",climate:"空调/地暖",cover:"窗帘",fan:"风扇/空气净化器",group:"实体组",humidifier:"空气加湿器",input_boolean:"输入二元选择器",input_number:"输入数值",input_select:"输入选择",lawn_mower:"lawn mower",light:"灯具",lock:"门锁",media_player:"媒体播放器",notify:"notification",switch:"开关",vacuum:"扫地机/吸尘器",water_heater:"热水器"},Fi={components:{date:{day_types_short:{daily:"每日",workdays:"工作日",weekend:"周末"},day_types_long:{daily:"每一天",workdays:"在工作日",weekend:"在周末"},days:"天",tomorrow:"明天",repeated_days:"每 {days}",repeated_days_except:"每天，除了 {excludedDays}",days_range:"从 {startDay} 至 {endDay}",next_week_day:"下{weekday}"},time:{absolute:"在 {time}",interval:"从 {startTime} 至 {endTime}",at_midnight:"在午夜",at_noon:"在正午",at_sun_event:"在 {sunEvent}"}},dialog:{enable_schedule:{title:"完成修改",description:"已更改的计划当前已禁用，是否应该启用？"},confirm_delete:{title:"是否删除实体？",description:"您确定要删除此实体吗？"},weekday_picker:{title:"Repeated days for schedule",choose:"Choose..."},entity_picker:{title:"Choose entities"},action_picker:{title:"Choose action"}},panel:{common:{title:"计划任务",new_schedule:"新时间表",default_name:"日程 #{id}"},overview:{no_entries:"无事项",backend_error:"计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",excluded_items:"{number} 除外 {if number is 1} 事项 {else} 事项",hide_excluded:"隐藏除外事项",additional_tasks:"{number} 更多 {if number is 1} 任务 {else} 任务"},editor:{repeated_days:"Repeated days",start_time:"Start time",stop_time:"End time",action:"Action",add_action:"Add action",select_timeslot:"请选择时间段",validation_errors:{overlapping_time:"Schedule has overlapping timeslots",missing_target_entity:"One or more actions are missing a target entity",missing_service_parameter:"One or more actions are missing a required setting",missing_action:"Schedule has no actions"}},options:{conditions:{header:"Conditions",add_condition:"Add condition",types:{equal_to:"{entity} is equal to {value}",unequal_to:"{entity} is unequal to {value}",above:"{entity} is above {value}",below:"{entity} is below {value}"},options:{logic_and:"All conditions must be true",logic_or:"Any condition must be true",track_changes:"Re-evaluate when conditions change"}},period:{header:"时期",start_date:"From",end_date:"To"},repeat_type:"触发后的行为",tags:"Tags"}}},Vi={services:Ni,domains:Hi,ui:Fi};const Ui={cs:Ge,de:tt,en:nt,es:ut,et:gt,es_419:ut,fi:kt,fr:Ot,he:Et,hu:Lt,it:Ht,lv:Wt,nb:ii,nl:Yt,nn:ii,no:ii,pl:ri,pt:mi,"pt-BR":vi,ro:wi,sk:Object.freeze({__proto__:null,services:Si,domains:Ai,ui:Ci,default:Ei}),sl:Object.freeze({__proto__:null,services:Ti,domains:Di,ui:Mi,default:Pi}),ru:zi,uk:Object.freeze({__proto__:null,services:Li,domains:qi,ui:Ii,default:Ri}),"zh-Hans":Object.freeze({__proto__:null,services:Ni,domains:Hi,ui:Fi,default:Vi})};function Bi(e,t,i=[],a=[]){let s;try{s=e.split(".").reduce((e,t)=>e[t],Ui[t.locale.language]),s||(s=e.split(".").reduce((e,t)=>e[t],Ui.en))}catch(t){try{s=e.split(".").reduce((e,t)=>e[t],Ui.en)}catch(e){s=""}}if(i=[i||[]].flat(),a=[a||[]].flat(),i.length&&a.length&&s)for(let e=0;e<i.length;e++){s=s.replace(String(i[e]),String(a[e]));const t=s.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){s=String(a[e])==t[2]?s.replace(t[0],t[3]):s.replace(t[0],t[4])}}const o=/\[([^\]]+)\]/.exec(s);if(o){s=/\{([^\}]+)\}/.exec(o[1])?s.replace(o[0],""):s.replace(o[0],o[1])}return s||console.log("missing translation for "+e),s}const Wi=e=>e.split(".")[1]||"",Zi=e=>e.split(".")[0]||"",Ki=(e,t)=>{var i;return void 0===(null==t?void 0:t.friendly_name)?Wi(e).replace(/_/g," "):(null!==(i=null==t?void 0:t.friendly_name)&&void 0!==i?i:"").toString()};function Ji(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=!e.includes(".")&&t.includes(".")?e==Zi(t):e==t;else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}const Gi=(e,t)=>{var i,a;let s=[],o=!0;if(e.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var t;let i=(null===(t=e.target)||void 0===t?void 0:t.entity_id)?[e.target.entity_id].flat():e.service;s=[...s,...i]})})}),![...new Set(s)].every(e=>((t.include||[]).some(t=>Ji(t,e))||Object.keys(t.customize||{}).some(t=>Ji(t,e)))&&!(t.exclude||[]).some(t=>Ji(t,e))))return!1;const n=[...t.tags].flat();n.length&&(o=!1,((e.tags||[]).some(e=>n.includes(e))||n.includes("none")&&!(null===(i=e.tags)||void 0===i?void 0:i.length)||n.includes("enabled")&&e.enabled||n.includes("disabled")&&!e.enabled)&&(o=!0));const r=[...t.exclude_tags].flat();return r.length&&o&&((e.tags||[]).some(e=>r.includes(e))||r.includes("none")&&!(null===(a=e.tags)||void 0===a?void 0:a.length)||r.includes("enabled")&&e.enabled||r.includes("disabled")&&!e.enabled)&&(o=!1),o},Yi=(e,t)=>((e,t)=>e<t?-1:e>t?1:0)(e.toLowerCase(),t.toLowerCase()),Qi=e=>{let t=e.trim();return t.charAt(0).toUpperCase()+t.slice(1)},Xi=(e,t)=>{let i=e.mode==fe.Sunrise?t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise"):t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset");"de"!=t.language&&(i=i.toLowerCase());const a=3600*e.hours+60*e.minutes;if(Math.abs(a)<=60)return Bi("ui.components.time.at_sun_event",t,"{sunEvent}",i);let s=a<0?t.localize("ui.panel.config.automation.editor.conditions.type.sun.before"):t.localize("ui.panel.config.automation.editor.conditions.type.sun.after");return s=s.replace(/[^a-z]/gi,"").toLowerCase(),`${Le(e,{seconds:!1}).split(/\+|\-/).pop()} ${s} ${i}`},ea={alarm_control_panel:{alarm_disarm:{target:{}},alarm_arm_home:{target:{}},alarm_arm_away:{target:{}},alarm_arm_night:{target:{}},alarm_arm_custom_bypass:{target:{}},alarm_arm_vacation:{target:{}}},automation:{turn_on:{target:{}},turn_off:{target:{}},trigger:{target:{}}},button:{press:{target:{}}},climate:{turn_off:{target:{},supported_features:128},turn_on:{target:{},supported_features:256},set_hvac_mode:{translation_key:"services.climate.set_hvac_mode",target:{},fields:{hvac_mode:{}}},set_temperature:{translation_key:["services.climate.set_temperature","services.climate.set_temperature_hvac_mode_heat","services.climate.set_temperature_hvac_mode_cool","services.climate.set_temperature_hvac_mode_heat_cool"],target:{},fields:{temperature:{supported_features:1},target_temp_high:{supported_features:2},target_temp_low:{supported_features:2},hvac_mode:{optional:!0}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",target:{},fields:{preset_mode:{}}},set_fan_mode:{translation_key:"services.climate.set_fan_mode",target:{},fields:{fan_mode:{}}}},cover:{close_cover:{target:{}},open_cover:{target:{}},set_cover_position:{translation_key:"services.cover.set_cover_position",target:{},fields:{position:{}}},set_tilt_position:{translation_key:"services.cover.set_cover_tilt_position",target:{},fields:{tilt_position:{}}}},fan:{turn_on:{target:{}},turn_off:{target:{}},set_percentage:{translation_key:"services.fan.set_percentage",target:{},fields:{percentage:{}}},oscillate:{translation_key:"services.fan.oscillate",target:{},fields:{oscillating:{}}},set_direction:{translation_key:"services.fan.set_direction",target:{},fields:{direction:{}}},set_preset_mode:{translation_key:"services.climate.set_preset_mode",target:{},fields:{preset_mode:{}}}},humidifier:{turn_on:{target:{}},turn_off:{target:{}},set_humidity:{translation_key:"services.humidifier.set_humidity",target:{},fields:{humidity:{}}},set_mode:{translation_key:"services.humidifier.set_mode",target:{},fields:{mode:{}}}},input_boolean:{turn_on:{target:{}},turn_off:{target:{}}},input_button:{press:{target:{}}},input_number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},input_select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},light:{turn_on:{translation_key:"services.light.turn_on",target:{},fields:{brightness:{optional:!0}}},turn_off:{target:{}}},lock:{lock:{target:{}},unlock:{target:{}}},media_player:{turn_on:{target:{}},turn_off:{target:{}},select_source:{translation_key:"services.media_player.select_source",target:{},fields:{source:{}}}},notify:{"{entity_id}":{fields:{title:{optional:!0},message:{}}}},number:{set_value:{translation_key:"services.input_number.set_value",target:{},fields:{value:{}}}},scene:{turn_on:{target:{}}},script:{"{entity_id}":{}},select:{select_option:{translation_key:"services.input_select.select_option",target:{},fields:{option:{}}}},switch:{turn_on:{target:{}},turn_off:{target:{}}},vacuum:{turn_on:{target:{}},start:{target:{}},play_pause:{target:{}}},water_heater:{set_temperature:{translation_key:"services.climate.set_temperature",target:{},fields:{temperature:{}}},set_operation_mode:{translation_key:"services.water_heater.set_operation_mode",target:{},fields:{operation_mode:{}}},set_away_mode:{translation_key:"services.water_heater.set_away_mode",target:{},fields:{away_mode:{}}}}},ta=(e,t)=>{if(e.service!==t.service)return!1;const i=e.service_data||{},a=t.service_data||{};let s=[...new Set([...Object.keys(i),...Object.keys(a)])];return s=s.filter(e=>"entity_id"!=e),!!s.every(e=>!(!Object.keys(i).includes(e)||!Object.keys(a).includes(e))&&me(i[e],a[e]))},ia=(e,t)=>{var i;const a=Zi(e.service),s=Wi(e.service);let o={};if(Object.keys(ea).includes(a)&&(Object.keys(ea[a]).includes(s)?o=Object.assign(Object.assign({},o),ea[a][s]):Object.keys(ea[a]).includes("{entity_id}")&&(o=Object.assign(Object.assign({},o),ea[a]["{entity_id}"]))),!t)return o;let n=null===(i=e.target)||void 0===i?void 0:i.entity_id;"script"!=a&&"notify"!=a||(n=n||e.service);const r=Object.entries(t).filter(([e])=>Ji(e,[n].flat().pop())).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.actions||[]).filter(e=>void 0!==e).flat();return r.length&&r.forEach(t=>{ta(t,e)&&(Object.keys(t.variables||{}).forEach(e=>{o=Object.assign(Object.assign({},o),{fields:Object.assign(Object.assign({},o.fields||{}),{[e]:{}})})}),o=Object.assign(Object.assign({},o),{name:t.name||o.name,icon:t.icon||o.icon}))}),o},aa=e=>{let t={select:{options:Array.isArray(e.options)?e.options:[]}};return e.translation_key&&(t=Object.assign(Object.assign({},t),{select:Object.assign(Object.assign({},t.select),{translation_key:e.translation_key})})),t},sa=e=>{let t={number:{}};return Object.keys(e).includes("min")&&!isNaN(Number(e.min))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{min:Number(e.min)})})),Object.keys(e).includes("max")&&!isNaN(Number(e.max))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{max:Number(e.max)})})),Object.keys(e).includes("step")&&!isNaN(Number(e.step))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{step:Number(e.step)})})),Object.keys(e).includes("mode")&&["box","slider"].includes(e.mode)&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{mode:e.mode})})),Object.keys(e).includes("unit_of_measurement")&&e.unit_of_measurement&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{unit_of_measurement:e.unit_of_measurement})})),Object.keys(e).includes("optional")&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{optional:Boolean(e.optional)})})),Object.keys(e).includes("scale_factor")&&!isNaN(Number(e.scale_factor))&&(t=Object.assign(Object.assign({},t),{number:Object.assign(Object.assign({},t.number),{scale_factor:Number(e.scale_factor)})})),t},oa=(e,t,i,a,s)=>{const o=Zi(e),n=["script","notify"].includes(o)?[e]:[t||[]].flat();let r=n.map(e=>na(e,i,a)),l=la(r),d=n.map(t=>ra(e,t,i,s));return la(d)||l},na=(e,t,i)=>{const a=Object.keys(i.states).includes(e)?i.states[e]:null,s=(null==a?void 0:a.attributes)||{},o=`${Zi(e)}.${t}`;switch(o){case"climate.temperature":case"climate.target_temp_low":case"climate.target_temp_high":const e="climate.temperature"==o?1==(2&(s.supported_features||0)):1==(1&(s.supported_features||0));return sa({min:s.min_temp,max:s.max_temp,step:s.target_temp_step,unit_of_measurement:""+i.config.unit_system.temperature,optional:e});case"climate.hvac_mode":return aa({options:s.hvac_modes,translation_key:"component.climate.entity_component._.state.${value}"});case"climate.preset_mode":return aa({options:s.preset_modes,translation_key:"state_attributes.climate.preset_mode.${value}"});case"climate.fan_mode":return aa({options:s.fan_modes});case"cover.position":case"cover.tilt_position":case"fan.percentage":return sa({min:0,max:100,step:1,unit_of_measurement:"%"});case"fan.oscillating":return{boolean:{}};case"fan.direction":return aa({options:["forward","reverse"],translation_key:"ui.card.fan.${value}"});case"fan.preset_mode":return aa({options:s.preset_modes});case"humdifier.humidity":return sa({min:s.min_humidity,max:s.max_humidity,step:1,unit_of_measurement:"%"});case"humidity.mode":return aa({options:s.available_modes});case"input_number.value":case"number.value":return sa({min:s.min,max:s.max,step:s.step,mode:s.mode,unit_of_measurement:s.unit_of_measurement});case"input_select.option":case"select.option":return aa({options:s.options});case"light.brightness":return sa({min:0,max:100,step:1,unit_of_measurement:"%",scale_factor:2.55});case"media_player.source":case"notify.title":case"notify.message":return{text:{}};case"water_heater.temperature":return sa({min:s.min_temp,max:s.max_temp,step:.1,unit_of_measurement:"${hass.config.unit_system.temperature}"});case"water_heater.operation_mode":return aa({options:s.operation_list});case"water_heater.away_mode":return{boolean:{}}}return null},ra=(e,t,i,a)=>{const s=Object.entries(a||{}).filter(([e])=>Ji(e,[t].flat().pop())).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.actions||[]).filter(e=>void 0!==e).flat();if(s.length){let t=s.map(t=>{if(t.service!=e||!Object.keys(t.variables).includes(i))return{};let a=t.variables[i];return Object.keys(a).includes("options")?aa({options:a.options.map(e=>e.value)}):Object.keys(a).includes("min")&&Object.keys(a).includes("max")?sa(a):{text:{}}}).filter(e=>void 0!==e);return la(t)}return null},la=e=>{const t=e=>1==new Set(e).size;if(e.some(e=>null===e)||!e.length)return null;if(e.every(e=>e.hasOwnProperty("select"))){const i=e.map(e=>e.select.options).filter(e=>void 0!==e),a=i.length?i.reduce((e,t)=>e.filter(e=>t.includes(e))):[],s=e.map(e=>e.select.translation_key).filter(e=>void 0!==e);return{select:{options:a.length?a:[],translation_key:s.length&&t(s)?s[0]:void 0}}}if(e.every(e=>e.hasOwnProperty("number"))){const i=e.map(e=>e.number.min).filter(e=>void 0!==e),a=e.map(e=>e.number.max).filter(e=>void 0!==e),s=e.map(e=>e.number.step).filter(e=>void 0!==e),o=e.map(e=>e.number.mode).filter(e=>void 0!==e),n=e.map(e=>e.number.unit_of_measurement).filter(e=>void 0!==e),r=e.map(e=>e.number.optional),l=e.map(e=>e.number.scale_factor).filter(e=>void 0!==e);return{number:{min:i.length?Math.max(...i):void 0,max:a.length?Math.min(...a):void 0,step:s.length?Math.max(...s):void 0,mode:o.length&&t(o)?o[0]:void 0,unit_of_measurement:n.length&&t(n)?n[0]:void 0,optional:r.every(e=>e),scale_factor:l.length&&t(l)?l[0]:void 0}}}return e.every(e=>e.hasOwnProperty("boolean"))?{boolean:{}}:e.every(e=>e.hasOwnProperty("text"))?{text:{}}:null},da=(e,t)=>{const i=Wi(t.service);return-1!=e.indexOf(i)&&(e=e.substring(e.indexOf(i)+i.length+1)),Object.keys(t.service_data).reduce((i,a)=>{if(-1==e.indexOf(a))return i;let s=e.substring(e.indexOf(a)+a.length+1);return s==t.service_data[a]?i+e.length+s.length+1:i},0)},ca=(e,t,i,a=!1)=>{const s=ia(e,i);let o=s.name||"";if((null==s?void 0:s.translation_key)&&!o){let i="";if(Array.isArray(s.translation_key)){let t=s.translation_key;t.sort((t,i)=>{let a=da(t,e),s=da(i,e);return a!=s?s-a:t.length-i.length}),i=t[0]}else i=s.translation_key;let n=((e,t,i)=>Object.fromEntries(Object.entries(e.service_data).map(([a,s])=>{var o;const n=oa(e.service,null===(o=e.target)||void 0===o?void 0:o.entity_id,a,t,i);if(!n)return[a,s];if(Object.keys(n).includes("select")&&n.select){const e=n.select;(null==e?void 0:e.translation_key)&&(s=t.localize(e.translation_key.replace("${value}",s))||s)}if(Object.keys(n).includes("number")&&n.number){const e=n.number;if(s=Number(s),"number"==typeof(null==e?void 0:e.scale_factor)&&(s/=e.scale_factor),"number"==typeof(null==e?void 0:e.step)&&(s=Math.round(s/e.step)*e.step),null==e?void 0:e.unit_of_measurement)return[a,`${s}${e.unit_of_measurement}`]}return[a,s]})))(e,t);if(o=Bi(i,t,Object.keys(n).map(e=>`{${e}}`),Object.values(n)),a){if(Object.keys(n).length>1){const e=(e,t)=>{const i=s.fields[e],a=s.fields[t];return i.optional&&!a.optional?1:a.optional&&!i.optional||e<t?-1:e>t?1:0};return n=Object.fromEntries(Object.entries(n).sort(([t],[i])=>e(t,i))),Object.values(n).shift()}if(Object.keys(n).length)return Object.values(n)[0]}}else{const i=Zi(e.service),a=Wi(e.service);o||(o=t.localize(`component.${i}.services.${a}.name`)),!o&&Object.keys(t.services[i]||{}).includes(a)&&(o=t.services[i][a].name||""),o||(o=a.replace(/_/g," "))}return o},ua=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},ma=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],ha=(e,t,i)=>{let a;if(e instanceof Date){console.log("------");let s=e.getDay();if(console.log(s),a=he.Friday,ua())return e.toLocaleDateString(i.locale.language,{weekday:t});e.getDay();a=he.Friday}else a=e;switch(a){case he.Daily:return Bi(`ui.components.date.day_types_${t}.daily`,i);case he.Workday:return Bi(`ui.components.date.day_types_${t}.workdays`,i);case he.Weekend:return Bi(`ui.components.date.day_types_${t}.weekend`,i);case he.Monday:case he.Tuesday:case he.Wednesday:case he.Thursday:case he.Friday:case he.Saturday:case he.Sunday:let e=new Date(2017,1,26),s=ma.findIndex(e=>e==a);return ua()?(e.setDate(e.getDate()+s),e.toLocaleDateString(i.locale.language,{weekday:t})):ma[s];default:return""}},pa=(e,t,i,a)=>{const s=t=>{var o,n;switch(t){case ge.Action:const r=e.entries[0].slots[e.next_entries[0]||0].actions[0];return ca(r,i,a);case ge.Days:return e.entries[0].weekdays.map(e=>ha(e,"long",i)).join(", ");case ge.Name:return e.name||"";case ge.AdditionalTasks:return e.entries[0].slots.length>1?"+"+Bi("ui.panel.overview.additional_tasks",i,"{number}",String(e.entries[0].slots.length-1)):"";case ge.Entity:return[(null===(o=e.entries[0].slots[e.next_entries[0]||0].actions[0].target)||void 0===o?void 0:o.entity_id)||[]].flat().map(e=>{var t;return Ki(e,null===(t=i.states[e])||void 0===t?void 0:t.attributes)}).join(", ");case ge.RelativeTime:const l=e.timestamps[e.next_entries[0]||0];return R`
          <scheduler-relative-time
            .hass=${i}
            .datetime=${new Date(l)}
          >
          </scheduler-relative-time>`;case ge.Tags:return R`
          <div class="tags">
            ${null===(n=e.tags)||void 0===n?void 0:n.map(e=>R`<span class="tag">${e}</span>`)}
          </div>`;case ge.Time:const d=e.entries[0].slots[e.next_entries[0]||0];return((e,t,i)=>{const a=Te(i.locale);if(t){const s=Se(e),o=Se(t),n=s.mode==fe.Fixed?Le(s,{am_pm:a}):Xi(s,i),r=o.mode==fe.Fixed?Le(o,{am_pm:a}):Xi(o,i);return Qi(Bi("ui.components.time.interval",i,["{startTime}","{endTime}"],[n,r]))}{const t=Se(e),s=t.mode==fe.Fixed?Le(t,{am_pm:a}):Xi(t,i);return Qi(Bi("ui.components.time.absolute",i,"{time}",s))}})(d.start,d.stop,i);case ge.Default:const c=s(ge.Name)||s(ge.Entity);return c?`${Qi(c)}: ${s(ge.Action)}`:""+Qi(s(ge.Action));default:const u=/(\{[a-z\-]+\})/g;if(t.match(u)){return t.split(u).map(e=>{let t=e.match(/^\{([a-z\-]+)\}$/);return t?s(t[1]):e})}return t}};return[...[t].flat()].map(e=>{let t=s(e);return t?R`
    ${t}
          <br/>
            `:""})},_a=(e,t,i)=>{const a=[t.sort_by].flat();return a.includes("relative-time")&&(e=Object.entries(e).sort(([,e],[,t])=>((e,t)=>{const i=new Date(e.timestamps[e.next_entries[0]]).valueOf(),a=new Date(t.timestamps[t.next_entries[0]]).valueOf(),s=(new Date).valueOf(),o=i<s&&a<s;return null!==i&&null!==a?i<s&&a>=s?1:i>=s&&a<s?-1:i>a?o?-1:1:i<a?o?1:-1:e.entity_id<t.entity_id?1:-1:null!==a?1:null!==i?-1:e.entity_id<t.entity_id?1:-1})(e,t)).reduce((e,[t,i])=>Object.assign(Object.assign({},e),{[t]:i}),{})),a.includes("title")&&(e=Object.entries(e).sort(([,e],[,a])=>((e,t,i,a,s)=>{const o=pa(e,i,a,s).join(),n=pa(t,i,a,s).join();return Yi(o,n)})(e,a,t.display_options.primary_info,i,t.customize)).reduce((e,[t,i])=>Object.assign(Object.assign({},e),{[t]:i}),{})),a.includes("state")&&(e=Object.entries(e).sort(([,e],[,t])=>((e,t,i,a)=>{var s,o;const n=null===(s=i.states[e.entity_id])||void 0===s?void 0:s.state,r=null===(o=i.states[t.entity_id])||void 0===o?void 0:o.state,l=["on","triggered"].includes(n),d=["on","triggered"].includes(r);if(l&&!d)return-1;if(!l&&d)return 1;if(a){if("off"!=n&&"off"==r)return 1;if("off"==n&&"off"!=r)return-1}return 0})(e,t,i,a.includes("relative-time"))).reduce((e,[t,i])=>Object.assign(Object.assign({},e),{[t]:i}),{})),e},ga=(e,t)=>e.callWS({type:"scheduler/item",schedule_id:t}).then(e=>xe(e)),va=(e,t,i,a)=>{a=a||{},i=null==i?{}:i;const s=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,e.dispatchEvent(s),s};var ya="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",fa="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",ba="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";const ka={alarm_control_panel:"mdi:alarm-light-outline",air_quality:"mdi:air-filter",alert:"mdi:alert",automation:"mdi:robot",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",camera:"mdi:camera",calendar:"mdi:calendar",cover:"mdi:window-shutter",climate:"mdi:thermostat",configurator:"mdi:cog",conversation:"mdi:microphone-message",counter:"mdi:counter",date:"mdi:calendar",datetime:"mdi:calendar-clock",demo:"mdi:home-assistant",device_tracker:"mdi:account",fan:"mdi:fan",google_assistant:"mdi:google-assistant",group:"mdi:google-circles-communities",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",humidifier:"mdi:air-humidifier",image_processing:"mdi:image-filter-frames",image:"mdi:image",input_boolean:"mdi:toggle-switch",input_button:"mdi:button-pointer",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",lawn_mower:"mdi:robot-mower",light:"mdi:lightbulb",lock:"mdi:lock-open-outline",media_player:"mdi:cast-connected",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",number:"mdi:ray-vertex",persistent_notification:"mdi-bell",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:palette",schedule:"mdi:calendar-clock",script:"mdi:script-text",select:"mdi:format-list-bulleted",sensor:"mdi:eye",simple_alarm:"mdi:bell",siren:"mdi:bullhorn",stt:"mdi:microphone-message",sun:"mdi:white-balance-sunny",switch:"mdi:flash",text:"mdi:form-textbox",time:"mdi:clock",timer:"mdi:timer-outline",todo:"mdi:clipboard-list",tts:"mdi:speaker-message",vacuum:"mdi:robot-vacuum",wake_word:"mdi:chat-sleep",water_heater:"mdi:water-boiler",weather:"mdi:weather-partly-cloudy",zone:"mdi:map-marker-radius"},wa=e=>Object.keys(ka).includes(e)?ka[e]:"mdi:help",xa=(e,t)=>{let i=Object.keys(e.services).filter(e=>((e,t)=>{let i=Object.keys(ea).includes(e);return!i&&t?Object.keys(t).map(Zi).includes(e):i})(e,t.customize));return i=i.filter(e=>((t.include||[]).map(Zi).some(t=>Ji(t,e))||Object.keys(t.customize||{}).map(Zi).some(t=>Ji(t,e)))&&!(t.exclude||[]).some(t=>Ji(t,e))),i.map(t=>Object({key:t,name:e.localize(`component.${t}.title`)||t.replace(/_/g," "),description:"",icon:wa(t)}))},$a=1;
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ja=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){var t;if(super(e),e.type!==$a||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const a=e[i];return null==a?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach(e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const a=t[e];if(null!=a){this.ht.add(e);const t="string"==typeof a&&a.endsWith(" !important");e.includes("-")||t?i.setProperty(e,t?a.slice(0,-11):a,t?"important":""):i[e]=a}}return N}}),Oa=["alarm_control_panel","binary_sensor","climate","calendar","cover","device_tracker","fan","humidifier","input_boolean","input_number","input_select","light","lock","number","person","proximity","select","sensor","sun","switch","timer","water_heater"],za=(e,t)=>{const i=Object.keys(t.states).includes(e)?t.states[e]:void 0,a=Zi(e),s=(null==i?void 0:i.attributes)||{};switch(a){case"alarm_control_panel":let e=["disarmed","triggered"];return 2&(s.supported_features||0)&&(e=[...e,"armed_away"]),1&(s.supported_features||0)&&(e=[...e,"armed_home"]),4&(s.supported_features||0)&&(e=[...e,"armed_night"]),16&(s.supported_features||0)&&(e=[...e,"armed_custom_bypass"]),32&(s.supported_features||0)&&(e=[...e,"armed_vacation"]),aa({options:e,translation_key:"component.${domain}.entity_component._.state.${value}"});case"binary_sensor":return aa({options:["on","off"],translation_key:"component.${domain}.entity_component.${deviceClass}.state.${value}"});case"climate":return aa({options:s.hvac_modes,translation_key:"component.${domain}.entity_component._.state.${value}"});case"calendar":case"fan":case"humidifier":case"input_boolean":case"light":case"switch":return aa({options:["on","off"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"cover":return aa({options:["open","closed"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"device_tracker":return aa({options:["home","not_home"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"input_number":case"number":return sa({min:s.min,max:s.max,step:s.step,mode:s.mode,unit_of_measurement:s.unit_of_measurement});case"input_select":case"select":return aa({options:s.options});case"lock":return aa({options:["locked","unlocked"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"person":const a=Object.keys(t.states).filter(e=>"zone"==Zi(e)).map(Wi);return aa({options:[...new Set(["home","not_home",...a])]});case"proximity":return sa({mode:"box",unit_of_measurement:s.unit_of_measurement});case"sensor":return isNaN(Number(null==i?void 0:i.state))?{text:{}}:sa({mode:"box",unit_of_measurement:s.unit_of_measurement});case"sun":return aa({options:["above_horizon","below_horizon"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"timer":return aa({options:["active","paused","idle"],translation_key:"component.${domain}.entity_component._.state.${value}"});case"water_heater":case"climate":return aa({options:s.operation_list,translation_key:"component.${domain}.entity_component._.state.${value}"});default:return{text:{}}}},Sa=e=>Oa.includes(e),Aa=(e,t)=>{let i=Object.keys(e.states).map(e=>Zi(e)).reduce((e,t)=>e.includes(t)?e:[...e,t],[]).filter(Sa);return i=i.filter(e=>((t.include||[]).some(t=>Ji(t,e))||Object.keys(t.customize||{}).some(t=>Ji(t,e)))&&!(t.exclude||[]).some(t=>Ji(t,e))),i.map(t=>Object({key:t,name:e.localize(`component.${t}.title`)||t.replace(/_/g," "),description:"",icon:wa(t)}))},Ca=(e,t)=>{if(!Object.keys(t.states).includes(e))return"mdi:help";const i=t.states[e];if(i.attributes.icon)return i.attributes.icon;const a=Zi(e);return wa(a)},Ea=e=>{let t=xa(e,{include:["*"]}),i=Aa(e,{include:["*"]});return i=i.filter(e=>!t.map(e=>e.key).includes(e.key)),[...t,...i]},Ta=(e,t)=>{if(["script","notify"].includes(e)){return Object.keys(t.services[e]).map(i=>{var a;return Object({key:`${e}.${i}`,name:t.states[`${e}.${i}`]?Ki(`${e}.${i}`,null===(a=t.states[`${e}.${i}`])||void 0===a?void 0:a.attributes):t.services[e][i].name,description:"",icon:t.states[`${e}.${i}`]?Ca(`${e}.${i}`,t):wa(e)})})}return Object.keys(t.states).filter(t=>Zi(t)==e).map(e=>{var i;return Object({key:e,name:Ki(e,null===(i=t.states[e])||void 0===i?void 0:i.attributes),description:"",icon:Ca(e,t)})})};let Da=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0}async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.confirm({domains:this._params.domains,entities:this._params.entities}),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}render(){return this._params?R`
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
            ${this.selectedDomain?R`
            <ha-icon-button
              slot="navigationIcon"
              .label=${this.hass.localize("ui.common.back")}
              .path=${ya}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `:R`
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
              .path=${fa}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${Bi("ui.dialog.entity_picker.title",this.hass)}
              ${this.selectedDomain?R`
                - 
                ${Ea(this.hass).find(e=>e.key==this.selectedDomain).name}
              `:""}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${this.hass.localize("ui.common.search")}
            aria-label=${this.hass.localize("ui.common.search")}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&R`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${fa}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${ja({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:R``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_renderOptions(){if(this.selectedDomain){const e=this.selectedDomain;let t=Ta(e,this.hass);return t.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(t=t.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(t).map(e=>{var i;const a=t[e].key,s=null===(i=this._params)||void 0===i?void 0:i.entities.includes(a);return R`
        <mwc-list-item
          graphic="icon"
          hasMeta
          twoline
          @click=${()=>this.toggleIncludeEntity(a)}
        >
          <ha-icon slot="graphic" icon="${t[e].icon}"></ha-icon>
          <ha-switch
            slot="meta"
            ?checked=${s}
          ></ha-switch>
          <span>${t[e].name}</span>
          <span slot="secondary">${t[e].key}</span>
        </mwc-list-item>
    `})}{let e=Ea(this.hass);return e.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(e).map(t=>{var i,a;const s=e[t].key,o=Ta(s,this.hass),n=null===(i=this._params)||void 0===i?void 0:i.domains.includes(s);return R`
      <mwc-list-item
        graphic="icon"
        hasMeta
        @click=${()=>this._handleDomainClick(s)}
        twoline
      >
        <ha-icon slot="graphic" icon="${e[t].icon}"></ha-icon>

        <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
        <span>${e[t].name}</span>
        <span slot="secondary">${n?o.length:0}/${o.length} entities selected</span>
        <mwc-button 
          @click=${e=>this._toggleIncludeDomain(e,s)}
        >
          ${(null===(a=this._params)||void 0===a?void 0:a.domains.includes(s))?"deselect all":"select all"}
        </mwc-button>
      </mwc-list-item>
  `})}}toggleIncludeDomain(e,t){var i;e.stopImmediatePropagation(),(null===(i=this._params)||void 0===i?void 0:i.domains.includes(t))?this._params=Object.assign(Object.assign({},this._params),{domains:this._params.domains.filter(e=>e!=t)}):this._params=Object.assign(Object.assign({},this._params),{domains:[...this._params.domains,t]})}toggleIncludeEntity(e){var t;(null===(t=this._params)||void 0===t?void 0:t.entities.includes(e))?this._params=Object.assign(Object.assign({},this._params),{entities:this._params.entities.filter(t=>t!=e)}):this._params=Object.assign(Object.assign({},this._params),{entities:[...this._params.entities,e]})}_toggleIncludeDomain(e,t){var i;e.stopImmediatePropagation(),(null===(i=this._params)||void 0===i?void 0:i.domains.includes(t))?this._params=Object.assign(Object.assign({},this._params),{domains:this._params.domains.filter(e=>e!=t)}):this._params=Object.assign(Object.assign({},this._params),{domains:[...this._params.domains,t]})}_handleDomainClick(e){this.selectedDomain=e,this._clearSearch()}_clearDomain(){this.selectedDomain=void 0,this._clearSearch()}_clearSearch(){this._search="",this._filter=""}static get styles(){return r`
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
      mwc-list {
        padding-right: 10px;
      }
      mwc-list-item {
        --mdc-ripple-color: #ffffff;
      }
      mwc-list-item mwc-button {
        display: none;
      }
      @media all and (min-width: 550px) {
        mwc-list-item mwc-button {
          position: absolute;
          display: block;
          right: 60px;
          top: 18px;
        }
      }
    `}};t([de({attribute:!1})],Da.prototype,"hass",void 0),t([ce()],Da.prototype,"_params",void 0),t([ce()],Da.prototype,"_search",void 0),t([ce()],Da.prototype,"_filter",void 0),t([ce()],Da.prototype,"_width",void 0),t([ce()],Da.prototype,"_height",void 0),t([ce()],Da.prototype,"selectedDomain",void 0),Da=t([re("dialog-select-entities")],Da);var Ma=Object.freeze({__proto__:null,get DialogSelectEntities(){return Da}});let Pa=class extends oe{constructor(){super(...arguments),this.valueMultiple=[],this.multiple=!1,this.allowMultiple=!1,this.initialValue="",this.rowRenderer=e=>R`
      <mwc-list-item graphic="avatar" twoline>
        ${e.state?R`<state-badge slot="graphic" .stateObj=${e} .hass=${this.hass} color="var(--icon-primary-color)"></state-badge>`:R`<ha-icon slot="graphic" icon="mdi:help-circle-outline"></ha-icon>`}
        <span>${e.friendly_name}</span>
        <span slot="secondary">${e.entity_id}</span>
      </mwc-list-item>
    `,this._filteredItems=()=>{let e=Object.keys(this.hass.states);this.domain&&(e=e.filter(e=>Zi(e)==this.domain)),this.valueMultiple.length&&(e=e.filter(e=>!this.valueMultiple.includes(e))),this.config&&(e=e.filter(e=>((this.config.include||[]).some(t=>Ji(t,e))||Object.keys(this.config.customize||{}).some(t=>Ji(t,e)))&&!(this.config.exclude||[]).some(t=>Ji(t,e)))),!this.initialValue||e.includes(this.initialValue)||this.valueMultiple.includes(this.initialValue)||(e=[...e,this.initialValue]);let t=e.map(e=>{var t;return Object(Object.assign(Object.assign({},this.hass.states[e]),{entity_id:e,friendly_name:Ki(e,null===(t=this.hass.states[e])||void 0===t?void 0:t.attributes)}))});return t.sort((e,t)=>Yi(e.friendly_name,t.friendly_name)),t},this._removeValue=e=>{this.valueMultiple=this.valueMultiple.filter(t=>t!=e),va(this,"value-changed",{value:this.valueMultiple})}}firstUpdated(){this.value&&(this.initialValue=this.value),this.valueMultiple.length>1&&(this.multiple=!0)}render(){return R`
      ${this.renderChips()}
      <div class="wrapper">
      ${this.multiple&&this.valueMultiple.length>1||!this.multiple&&!this.value||!this.allowMultiple?"":R` 
      <ha-icon-button
        .path=${this.multiple?"M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z":"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"}
        @click=${this._toggleMultiple}
      >
      </ha-icon-button>`}
      <ha-combo-box
        .hass=${this.hass}
        label=${this.hass.localize("ui.components.entity.entity-picker.entity")}
        item-value-path="entity_id"
        item-label-path="friendly_name"
        .renderer=${this.rowRenderer}
        .filteredItems=${this._filteredItems()}
        @filter-changed=${this._filterChanged}
        @value-changed=${this._valueChanged}
        .value=${this.value||""}
      >
      </ha-combo-box>
      </div>
    `}renderChips(){if(!this.multiple)return R``;return R`
      <div class="chips">
        ${this.valueMultiple.map(e=>{var t;const i=this.hass.states[e];return R`
        <div class="chip">
          ${i?R`<ha-state-icon .stateObj=${i} .hass=${this.hass} class="icon"></ha-state-icon>`:R`<ha-icon icon="mdi:help-circle-outline" class="icon"></ha-icon>`}
          <span class="label">${Ki(e,null===(t=this.hass.states[e])||void 0===t?void 0:t.attributes)}</span>
          <ha-icon icon="mdi:close" @click=${()=>this._removeValue(e)} class="marker"></ha-icon>
        </div>
      `})}
      </div>
    `}_filterChanged(e){this._filter=e.detail.value.toLowerCase()}_valueChanged(e){let t=e.detail.value;if(this.multiple){if(!t)return;this.valueMultiple=[...this.valueMultiple,t],e.target.setInputValue(void 0),va(this,"value-changed",{value:this.valueMultiple})}else this.value=t,va(this,"value-changed",{value:this.value});e.stopPropagation()}_toggleMultiple(){this.multiple?(this.multiple=!1,this.value=this.valueMultiple.shift(),this.valueMultiple=[]):(this.multiple=!0,this.valueMultiple=[this.value],this.value=void 0)}};Pa.styles=r`
    :host {
      display: flex;
      flex-direction: column;
    }
    div.chips {
      flex: 1 0 auto;
    }
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
      margin: 4px;
    }
    div.chip .icon {
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
    div.chip .label {
        margin: 0px 4px;
    }
    div.chip .marker {
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
    div.wrapper {
      display: flex;
      flex: 1 0 auto;
      align-items: center;
    }
  `,t([de({attribute:!1})],Pa.prototype,"hass",void 0),t([de()],Pa.prototype,"domain",void 0),t([de()],Pa.prototype,"config",void 0),t([ce()],Pa.prototype,"_filter",void 0),t([de()],Pa.prototype,"value",void 0),t([de()],Pa.prototype,"valueMultiple",void 0),t([de()],Pa.prototype,"multiple",void 0),t([de()],Pa.prototype,"allowMultiple",void 0),t([de()],Pa.prototype,"initialValue",void 0),Pa=t([re("scheduler-entity-picker")],Pa);let La=class extends oe{constructor(){super(...arguments),this.expanded=!1,this.disabled=!1,this.openClose=new CustomEvent("open-close",{detail:{},bubbles:!0,composed:!0})}render(){return R`
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
        ${this.disabled?"":R`
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
      .header ::slotted(span) {
        display: flex;
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
    `}};t([de({type:Boolean,reflect:!0})],La.prototype,"expanded",void 0),t([de({type:Boolean,reflect:!0})],La.prototype,"disabled",void 0),t([de({type:CustomEvent})],La.prototype,"openClose",void 0),La=t([re("collapsible-section")],La);let qa=class extends oe{set openedItem(e){e!==this._openedItem&&void 0!==e&&setTimeout(()=>{this.updateOpenedItem(e)},50)}constructor(){super(),this.disabled=!1,this._openedItem=-1,this._numItems=0,this.addEventListener("open-close",this.toggleActiveSection)}firstUpdated(){const e=this.querySelectorAll("collapsible-section");this._numItems=e.length}toggleActiveSection(e){if(this.disabled)return;const t=e.target,i=this.querySelectorAll("collapsible-section");let a=-1;i.forEach((function(e,i){e!==t||e.getAttribute("expanded")||(a=i)})),this.updateOpenedItem(a)}updateOpenedItem(e){this.querySelectorAll("collapsible-section").forEach((function(t,i){i!=e&&t.getAttribute("expanded")?t.removeAttribute("expanded"):i!=e||t.getAttribute("expanded")||t.setAttribute("expanded","true")})),this._openedItem=e;const t=new CustomEvent("openclose-changed",{detail:{item:e}});this.dispatchEvent(t)}render(){return R`
      <slot></slot>
    `}};t([de()],qa.prototype,"disabled",void 0),t([ce()],qa.prototype,"_openedItem",void 0),t([ce()],qa.prototype,"_numItems",void 0),qa=t([re("collapsible-group")],qa);let Ia=class extends oe{constructor(){super(...arguments),this.disabled=!1,this.rowRenderer=e=>R`
      <mwc-list-item>
        <span>${e.label}</span>
      </mwc-list-item>
    `}render(){if(this.config.select){const e=this.config.select,t=[this.value||[]].flat().map(String),i=e=>{this.value=t.filter(t=>t!=e),va(this,"value-changed",{value:this.value})},a=()=>t.map(e=>R`
            <div class="chip">
              <span class="label">${e}</span>
              <ha-icon icon="mdi:close" @click=${()=>i(e)}></ha-icon>
            </div>
          `),s=()=>{let i=[...null==e?void 0:e.options],a=[this.value||[]].flat().map(String);i=[...i,...a.filter(e=>!i.find(t=>"object"==typeof t?t.value==e:t==e))],Array.isArray(this.value)&&(i=i.filter(e=>"object"==typeof e?!t.includes(e.value):!t.includes(e)));const s=e=>{var t;const i=null===(t=this.config.select)||void 0===t?void 0:t.translation_key;let a="";return i&&(a=this.hass.localize(i.replace("${value}",e))),a||(a=e),a};return i.map(e=>"object"==typeof e?e:Object({value:e,label:s(e)}))};return R`
          <div class="select-wrapper">
        ${e.multiple?R`
          <div class="chips">
          ${a()}
          </div>
        `:""}
        <ha-combo-box
          .hass=${this.hass}
          label=""
          item-value-path="value"
          item-label-path="label"
          .renderer=${this.rowRenderer}
          .filteredItems=${s()}
          @value-changed=${this._valueChanged}
          .value=${Array.isArray(this.value)?"":this.value||""}
          ?disabled=${this.disabled}
          ?allow-custom-value=${e.custom_value}
        >
        </ha-combo-box>
        </div>
      `}if(this.config.number){const e=this.config.number;let t=e.min||0,i=e.max||255,a="number"==typeof this.value?this.value:t;"number"==typeof e.scale_factor&&(a=parseFloat((a/e.scale_factor).toPrecision(12))),"number"==typeof(null==e?void 0:e.step)&&(a=Math.round(a/e.step)*e.step);const s=t=>{let i=Number(t.target.value);"number"==typeof e.scale_factor&&(i*=e.scale_factor),"number"==typeof(null==e?void 0:e.step)&&(i=Math.round(i/e.step)*e.step),i=parseFloat(i.toFixed(2)),this._valueChanged(new CustomEvent("value-changed",{detail:{value:i}}))};return R`
        <div class="slider-wrapper">
        <ha-slider
          labeled
          .min=${t}
          .max=${i}
          .step=${e.step||1}
          .value=${a}
          @change=${s}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${a}${e.unit_of_measurement||""}</span>
        </div>
      `}if(this.config.text){this.config.text;return R`
          <ha-textfield
            .value=${this.value||""}
            @value-changed=${this._valueChanged}
            .placeholder=""
            ?disabled=${this.disabled}
          ></ha-textfield>      
      `}return R``}_valueChanged(e){if(e.stopPropagation(),Array.isArray(this.value)){let t=e.detail.value;if(!t)return;this.value=[...this.value,t],e.target.setInputValue("")}else if(e.detail){let t=e.detail.value;if(void 0===t)return;this.value=t}else this.value=e.target.value;va(this,"value-changed",{value:this.value})}};Ia.styles=r`
      :host {
        display: flex;
        width: 100%;
      }
      div.slider-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
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
        margin: 4px;
      }
      div.chip .label {
          margin: 0px 4px;
      }
      div.chip ha-icon {
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
  `,t([de({attribute:!1})],Ia.prototype,"hass",void 0),t([de({attribute:!1})],Ia.prototype,"config",void 0),t([de()],Ia.prototype,"value",void 0),t([de()],Ia.prototype,"disabled",void 0),Ia=t([re("combo-selector")],Ia);const Ra=e=>e.callWS({type:"scheduler/tags"});let Na=class extends oe{constructor(){super(...arguments),this._config=Ie,this.title="",this.tagOptions=[]}setConfig(e){this._config=Object.assign(Object.assign({},Ie),e)}async firstUpdated(){this.title="string"==typeof this._config.title?this._config.title:"";const e=(await Ra(this.hass)).map(e=>e.name);e.sort(Yi),this.tagOptions=e}render(){const e={select:{options:this.tagOptions,multiple:!0,custom_value:!0}};return R`
      <div class="card-config">

        <mwc-button @click=${this._showIncludedEntitiesDialog}>
          Configure included entities
        </mwc-button>

        <settings-row ?showPrefix=${!0}>
          <ha-checkbox
            slot="prefix"
            ?checked=${!1!==this._config.title}
            @change=${this._setEnableTitle}
          >
          </ha-checkbox>
          <span slot="heading">${Bi("ui.panel.card_editor.fields.title.heading",this.hass)}</span>

          <ha-textfield
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${Bi("ui.panel.common.title",this.hass)}
            ?disabled=${!1===this._config.title}
          ></ha-textfield>

        </settings-row>

        <div class="two-columns" style="margin: 10px 0px 15px 0px">
        <div class="column">
          <ha-formfield label="${Bi("ui.panel.card_editor.fields.discover_existing.heading",this.hass)}">
            <ha-switch
              ?checked=${!1!==this._config.discover_existing}
              @change=${e=>{this._updateConfig({discover_existing:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="column">
          <ha-formfield label="${Bi("ui.panel.card_editor.fields.show_header_toggle.heading",this.hass)}">
            <ha-switch
              ?checked=${this._config.show_header_toggle}
              @change=${e=>{this._updateConfig({show_header_toggle:e.target.checked})}}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

          <span slot="heading">${Bi("ui.panel.card_editor.fields.sort_by.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.sort_by.options.relative_time",this.hass)}">
            <ha-radio
              name="sort_by"
              value="relative-time"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes("relative-time")}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.sort_by.options.title",this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes("title")}
            ></ha-radio>
          </ha-formfield>
        </div>
        </div>


          <span>${Bi("ui.panel.card_editor.fields.display_format_primary.heading",this.hass)}</span>


        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_primary.options.default",this.hass)}">
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

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_primary.options.entity_action",this.hass)}">
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

          <span>${Bi("ui.panel.card_editor.fields.display_format_secondary.heading",this.hass)}</span>

        <div class="two-columns">
        <div class="column">
          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_secondary.options.relative_time",this.hass)}">
            <ha-checkbox
              value="relative-time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("relative-time")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_secondary.options.time",this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("time")}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_secondary.options.days",this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("days")}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${Bi("ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks",this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes("additional-tasks")}
            >
            </ha-checkbox>
          </ha-formfield>
        </div>

        </div>

        <settings-row>
          <span slot="heading">${Bi("ui.panel.card_editor.fields.tags.heading",this.hass)}</span>

          <combo-selector
            .hass=${this.hass}
            .config=${e}
            .value=${[this._config.tags||[]].flat()}
            @value-changed=${e=>{this._updateConfig({tags:e.detail.value})}}
          >
          </combo-selector>
        </settings-row>

      </div>
    `}_setEnableTitle(e){e.target.checked?this.title.length?this._updateConfig({title:this.title}):this._updateConfig({title:!0}):this._updateConfig({title:!1})}_setTitle(e){const t=e.target.value;this.title=t,t!==Bi("ui.panel.common.title",this.hass)&&t.length?this._updateConfig({title:t}):this._updateConfig({title:!0})}_setSortBy(e){var t;const i=e.target.value;let a=[(null===(t=this._config)||void 0===t?void 0:t.sort_by)||Ie.sort_by].flat();a=a.filter(e=>"state"==e),a.includes(i)||(a=[...a,i]),this._updateConfig({sort_by:a})}_setDisplayOptionsPrimary(e){var t;const i=e.target.value,a=Object.assign(Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||Ie.display_options),{primary_info:i});this._updateConfig({display_options:a})}_setDisplayOptionsSecondary(e){var t;const i=e.target.value,a=e.target.checked;let s=Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||Ie.display_options),o=[s.secondary_info||[]].flat();o=a?Array.from(new Set([...o,i])):o.filter(e=>e!==i),o.sort((e,t)=>{const i={"relative-time":1,time:o.includes("relative-time")?3:2,days:o.includes("relative-time")?2:3,"additional-tasks":4},a=Object.keys(i).includes(e)?i[e]:5,s=Object.keys(i).includes(t)?i[t]:5;return a>s?1:a<s?-1:0}),s=Object.assign(Object.assign({},s),{secondary_info:[...o]}),this._updateConfig({display_options:s})}async _showIncludedEntitiesDialog(e){let t=this._config.include.filter(e=>!e.includes(".")),i=this._config.include.filter(e=>e.includes("."));await new Promise(a=>{const s={cancel:()=>a(null),confirm:e=>a(e),domains:t,entities:i};va(e.target,"show-dialog",{dialogTag:"dialog-select-entities",dialogImport:()=>Promise.resolve().then((function(){return Ma})),dialogParams:s})}).then(e=>{e&&this._updateConfig({include:[...e.domains,...e.entities]})})}_updateConfig(e){this._config&&(this._config=Object.assign(Object.assign({},this._config),e),va(this,"config-changed",{config:this._config}))}};Na.styles=r`
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
    combo-selector {
      min-width: 240px;
    }
  `,t([de({attribute:!1})],Na.prototype,"hass",void 0),t([de()],Na.prototype,"_config",void 0),t([de()],Na.prototype,"title",void 0),t([de()],Na.prototype,"tagOptions",void 0),Na=t([re("scheduler-card-editor")],Na);const Ha=r`
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
    mwc-button.warning {
      --mdc-theme-primary: var(--error-color);
    }
  .content {
    padding: 0px 24px 16px 24px;
  }

`,Fa=(r`
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


`,(e,t,i,a)=>{var s;const o=e.service,n=null===(s=e.target)||void 0===s?void 0:s.entity_id,r=ia(e,a);if(!r||!r.fields||!Object.keys(r.fields).includes(t))return!1;const l=r.fields[t];if(null===oa(o,n,t,i,a))return!1;if(Object.keys(e.service_data||{}).includes(t))return!0;if(l.supported_features){if(![n||[]].flat().every(e=>{if(!Object.keys(i.states).includes(e))return!1;return 1==((i.states[e].attributes.supported_features||0)&l.supported_features)}))return!1}return!0});var Va;!function(e){e.OverlappingTime="overlapping_time",e.MissingTargetEntity="missing_target_entity",e.MissingServiceParameter="missing_service_parameter",e.MissingAction="missing_action"}(Va||(Va={}));const Ua=(e,t,i)=>{let a=[];a=[...a,...e.entries.map(e=>((e,t)=>e.every((i,a)=>{const s=Ae(i.start,t),o=void 0===i.stop?s:Ae(i.stop,t)||86400;return!(s>o)&&e.every((e,i)=>{if(i<=a)return!0;return Ae(e.start,t)>=o})})?null:Va.OverlappingTime)(e.slots,t)).filter(e=>null!==e)];let s=e.entries.map(e=>e.slots.map(e=>e.actions)).flat().flat();return s.length||(a=[...a,Va.MissingAction]),a=[...a,...s.map(e=>((e,t,i)=>{var a;const s=ia(e,i);return(null==s?void 0:s.target)&&!(null===(a=e.target)||void 0===a?void 0:a.entity_id)?Va.MissingTargetEntity:(null==s?void 0:s.fields)&&!Object.entries(s.fields).filter(([a])=>Fa(e,a,t,i)).every(([t,i])=>!(!Object.keys(e.service_data).includes(t)&&!i.optional))?Va.MissingServiceParameter:null})(e,t,i)).filter(e=>null!==e)],a.length?a.shift():null},Ba=e=>{const t=e=>e.actions.length?(e.stop||(e=Object.fromEntries(Object.entries(e).filter(([e])=>"stop"!=e))),e):null;let i={weekdays:(e=Object.assign(Object.assign({},e),{entries:e.entries.map(e=>Object.assign(Object.assign({},e),{slots:e.slots.map(t).filter(e=>null!==e)}))})).entries[0].weekdays.map(Wa),timeslots:e.entries[0].slots.map(Za),name:e.name,start_date:e.start_date,end_date:e.end_date,repeat_type:e.repeat_type,tags:e.tags||[]};return e.schedule_id&&(i=Object.assign(Object.assign({},i),{schedule_id:e.schedule_id})),i},Wa=e=>{switch(e){case he.Monday:return"mon";case he.Tuesday:return"tue";case he.Wednesday:return"wed";case he.Thursday:return"thu";case he.Friday:return"fri";case he.Saturday:return"sat";case he.Sunday:return"sun";case he.Workday:return"workday";case he.Weekend:return"weekend";default:return"daily"}},Za=e=>({start:e.start,stop:e.stop,actions:e.actions.map(e=>Ka(e)).flat(),condition_type:e.conditions.items.length?e.conditions.type==pe.And?"and":"or":void 0,conditions:e.conditions.items.length?e.conditions.items:void 0,track_conditions:e.conditions.track_changes}),Ka=e=>{var t,i;if(Array.isArray(null===(t=e.target)||void 0===t?void 0:t.entity_id)){return null==e?void 0:e.target.entity_id.map(t=>Object({service:e.service,service_data:e.service_data,entity_id:t}))}return{service:e.service,service_data:e.service_data,entity_id:null===(i=e.target)||void 0===i?void 0:i.entity_id}},Ja=(e,t,i)=>{const a={title:i.localize("state_badge.default.error"),description:R`
    <b>Something went wrong!</b><br />
    ${e.body.message}<br /><br />
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,primaryButtonLabel:i.localize("ui.common.ok"),confirm:()=>{},cancel:()=>{}};va(t,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return vs})),dialogParams:a})},Ga=e=>{let t=e.locale.first_weekday;if(t&&"language"!=t)return Ya.map(e=>e.toLowerCase()).findIndex(e=>e==t);if("weekInfo"in Intl.Locale.prototype)return new Intl.Locale(e.locale.language).weekInfo.firstDay%7;{const t="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),i="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),a=["ar","arq","arz","fa"],s="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g),o=e.locale.language.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return o[1]?i.includes(o[4])?0:t.includes(o[4])?6:1:s.includes(o[1])?0:a.includes(o[1])?6:1}},Ya=[he.Sunday,he.Monday,he.Tuesday,he.Wednesday,he.Thursday,he.Friday,he.Saturday],Qa={alarm_control_panel:{services:{alarm_arm_away:"mdi:shield-lock",alarm_arm_home:"mdi:shield-home",alarm_arm_night:"mdi:shield-moon",alarm_custom_bypass:"mdi:security",alarm_disarm:"mdi:shield-off",alarm_trigger:"mdi:bell-ring",alarm_arm_vacation:"mdi:shield-airplane"}},automation:{services:{turn_on:"mdi:robot",turn_off:"mdi:robot-off",trigger:"mdi:play"}},button:{services:{press:"mdi:gesture-tap-button"}},climate:{services:{set_temperature:"mdi:thermometer",set_hvac_mode:"mdi:cog-transfer-outline",set_preset_mode:"mdi:cloud-download-outline",set_fan_mode:"mdi:fan",set_humidity:"mdi:water-percent",set_swing_mode:"mdi:arrow-oscillating"},attributes:{hvac_mode:{cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",heat:"mdi:fire",heat_cool:"mdi:thermometer",off:"mdi:power"},preset_mode:{activity:"mdi:motion-sensor",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",sleep:"mdi:bed"},fan_mode:{diffuse:"mdi:weather-windy",focus:"mdi:target",high:"mdi:speedometer",low:"mdi:speedometer-slow",medium:"mdi:speedometer-medium",middle:"mdi:speedometer-medium",off:"mdi:fan-off",on:"mdi:fan"},swing_mode:{both:"mdi:arrow-all",horizontal:"mdi:arrow-left-right",off:"mdi:arrow-oscillating-off",on:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down"}}},cover:{services:{close_cover:"mdi:arrow-down-box",close_cover_tilt:"mdi:arrow-bottom-left",open_cover:"mdi:arrow-up-box",open_cover_tilt:"mdi:arrow-top-right",set_cover_position:"mdi:arrow-down-box",set_cover_tilt_position:"mdi:arrow-top-right"}},fan:{services:{oscillate:"mdi:arrow-oscillating",set_percentage:"mdi:fan",set_preset_mode:"mdi:fan-auto",turn_off:"mdi:fan-off",turn_on:"mdi:fan"}},humidifier:{services:{set_humidity:"mdi:water-percent",set_mode:"mdi:air-humidifier",turn_off:"mdi:air-humidifier-off",turn_on:"mdi:air-humidifier"},attributes:{mode:{auto:"mdi:refresh-auto",away:"mdi:account-arrow-right",baby:"mdi:baby-carriage",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",home:"mdi:home",normal:"mdi:water-percent",sleep:"mdi:power-sleep"}}},input_boolean:{services:{turn_off:"mdi:toggle-switch-off",turn_on:"mdi:toggle-switch"}},input_button:{services:{press:"mdi:gesture-tap-button"}},input_number:{services:{set_value:"mdi:counter"}},input_select:{services:{select_option:"mdi:counter"}},lawn_mower:{services:{dock:"mdi:home-import-outline",start_mowing:"mdi:play"}},light:{services:{turn_off:"mdi:lightbulb-off",turn_on:"mdi:lightbulb-on"}},lock:{services:{lock:"mdi:lock",unlock:"mdi:lock-open"}},media_player:{services:{media_play:"mdi:play",media_stop:"mdi:stop",play_media:"mdi:play",select_source:"mdi:import",turn_off:"mdi:power",turn_on:"mdi:power"}},notify:{services:{"{entity_id}":"mdi:message-alert"}},scene:{services:{turn_on:"mdi:play"}},script:{services:{turn_on:"mdi:flash",turn_off:"mdi:flash-off","{entity_id}":"mdi:play"}},select:{services:{select_option:"mdi:counter"}},switch:{services:{turn_off:"mdi:toggle-switch-variant-off",turn_on:"mdi:toggle-switch-variant"}},vacuum:{services:{send_command:"mdi:send",start:"mdi:play",turn_off:"mdi:stop",turn_on:"mdi:play"}},water_heater:{services:{set_away_mode:"mdi:account-arrow-right",set_operation_mode:"mdi:water-boiler",set_temperature:"mdi:thermometer",turn_off:"mdi:water-boiler-off",turn_on:"mdi:water-boiler"},attributes:{operation_mode:{eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire-circle",heat_pump:"mdi:heat-wave",high_demand:"mdi:finance",off:"mdi:power",performance:"mdi:rocket-launch"}}}},Xa=(e,t)=>{const i=ia(e,t),a=Zi(e.service),s=Wi(e.service);if(i.icon)return(o=i.icon).match(/^[a-z]+\:[a-zA-Z]+$/)?o:"mdi:"+o;var o;if(!Object.keys(Qa).includes(a)||!Object.keys(Qa[a].services).includes(s))return"mdi:flash";if(void 0!==Qa[a].attributes){let t=Qa[a].attributes;const i=Object.keys(t).find(t=>Object.keys(e.service_data).includes(t));if(i&&Object.keys(t[i]).includes(e.service_data[i]))return t[i][e.service_data[i]]}return Qa[a].services[s]},es=(e,t)=>{const i=new Date(t),a=3600*i.getHours()+60*i.getMinutes()+i.getSeconds();let s=3600*e.hours+60*e.minutes-a;const o=s<0?-1:1;s=Math.abs(s);let n=Math.floor(s/3600),r=Math.round((s-3600*n)/60);return o<0&&(n>0?n=-n:r=-r),ze({hours:n,minutes:r})};let ts=class extends oe{constructor(){super(),this.selectedSlot=null,this.timeout=0,this.large=!1,this.handleResize=this.handleResize.bind(this)}handleResize(e){clearTimeout(this.timeout),this.timeout=window.setTimeout(()=>{this.requestUpdate()},50)}firstUpdated(){}render(){return R`
      <div class="bar">
        ${this.renderTimeslots()}
      </div>
      <div class="time-bar">
        ${this.renderTimebar()}
      </div>
    `}renderTimebar(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=[1,2,3,4,6,8,12],i=Te(this.hass.locale),a=i?130:100;let s=Math.ceil(24/(e/a));for(;!t.includes(s);)s++;const o=[0,...Array.from(Array(24/s-1).keys()).map(e=>(e+1)*s),24];return o.map((e,t)=>{let a=s/24*100;a=Math.floor(100*a)/100;let n={mode:fe.Fixed,hours:e,minutes:0};return 0==t?R`
        <span class="left" style=${ja({width:a/2+"%"})}>${Le(n,{seconds:!1,am_pm:i})}</span>
      `:t==o.length-1?R`
        <span class="right" style=${ja({width:a/2+"%"})}>${Le(n,{seconds:!1,am_pm:i})}</span>
      `:R`
        <span style=${ja({width:a+"%"})}>${Le(n,{seconds:!1,am_pm:i})}</span>
      `})}renderTimeslots(){const e=this.schedule.slots,t=this.computeSlotWidths();return e.map((i,a)=>{let s=Ae(i.start,this.hass),o=Ae(i.stop||i.start,this.hass);!o&&s&&(o=86400);const n=(o-s)/86400*100,r=i.actions.length?ca(i.actions[0],this.hass,this.config.customize,!0):"",l=parseFloat(getComputedStyle(this).getPropertyValue("width")),d=5*r.length+10,c=a>0?15:0,u=a<e.length-1?15:0,m=n*l/100-c-u,h=e[a+1];return R`
        <div
          class="slot ${this.selectedSlot==a?"selected":""} ${i.actions.length?"":"empty"} ${void 0===i.stop?"short":""}"
          style="${ja({width:t[a]+"px"})}"
          @click=${this._toggleSelectTimeslot}
          idx="${a}"
        >
          ${i.stop,""}
          ${i.actions.length?r&&(m>d/3||m>50)&&m>30?R`<span style="margin-left: ${c}px; margin-right: ${u}px">${r}</span>`:m>16?R`<ha-icon icon="${Xa(i.actions[0],this.config.customize)}"></ha-icon>`:"":""}
        </div>
        ${a<e.length-1&&i.stop?R`
        <div idx="${a}" class="handle ${this.selectedSlot==a+1||this.selectedSlot==a?"":"hidden"} ${h&&!h.stop?"center":""}">
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
      `})}computeSlotWidths(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=this.schedule.slots;let i=e-3*(t.length-1);const a=t.map(e=>{let t=Ae(e.start,this.hass),i=Ae(e.stop||e.start,this.hass);return!i&&t&&(i=86400),(i-t)/86400}),s=Math.round(5/i*100)/100;i-=5*a.filter(e=>e<s).length;let o=i;return a.map(e=>{let t=e<s?5:Math.round(e*i);return t>o&&(t=o),o-=t,t})}_toggleSelectTimeslot(e){let t=e.target;"div"!=t.tagName.toLowerCase()&&(t=t.parentElement);const i=Number(t.getAttribute("idx"));this.selectedSlot=this.selectedSlot!==i?i:null;const a=new CustomEvent("update",{detail:{selectedSlot:this.selectedSlot}});this.dispatchEvent(a),e.stopPropagation()}_handleDragStart(e){let t=e.target;for(;"DIV"!==t.tagName;)t=t.parentElement;const i=t.parentElement.getBoundingClientRect(),a=Number(t.getAttribute("idx"));let s=a>0?Ae(this.schedule.slots[a-1].stop||this.schedule.slots[a-1].start,this.hass)+900:900,o=(Ae(this.schedule.slots[a+1].stop||this.schedule.slots[a+1].start,this.hass)||86400)-900;void 0===this.schedule.slots[a+1].stop&&(o=(Ae(this.schedule.slots[a+2].stop||this.schedule.slots[a+2].start,this.hass)||86400)-900);const n=Se(this.schedule.slots[a+1].start).mode;if([fe.Sunrise,fe.Sunset].includes(n)){let e=Se(this.schedule.slots[a+1].start),t=Ae(Object.assign(Object.assign({},e),{hours:4,minutes:0}),this.hass),i=Ae(Object.assign(Object.assign({},e),{hours:-4,minutes:0}),this.hass);i>s&&(s=i),t<o&&(o=t)}let r=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX,t-=i.left,t>i.width&&(t=i.width),t<0&&(t=0);let r=Math.round(t/i.width*86400);r<s?r=s:r>o&&(r=o);const l=Math.floor(r/3600),d=Math.round((r-3600*l)/60);let c={mode:fe.Fixed,hours:l,minutes:d};if([fe.Sunrise,fe.Sunset].includes(n)){const e=n==fe.Sunrise?this.hass.states["sun.sun"].attributes.next_rising:this.hass.states["sun.sun"].attributes.next_setting,t=es(c,e);c={mode:n,hours:t.hours,minutes:t.minutes}}c=ze(c,15);const u=Le(c);let m=[...this.schedule.slots];if(m=Object.assign(m,{[a]:Object.assign(Object.assign({},m[a]),{stop:u}),[a+1]:Object.assign(Object.assign({},m[a+1]),{start:Le(c)})}),void 0===m[a+1].stop){const e=Le(Oe(c,{minutes:1}));m=Object.assign(m,{[a+2]:Object.assign(Object.assign({},m[a+2]),{start:e})})}this.schedule=Object.assign(Object.assign({},this.schedule),{slots:m});const h=new CustomEvent("update",{detail:{slots:m}});this.dispatchEvent(h)};const l=()=>{window.removeEventListener("mousemove",r),window.removeEventListener("touchmove",r),window.removeEventListener("mouseup",l),window.removeEventListener("touchend",l),window.removeEventListener("blur",l),r=()=>{}};window.addEventListener("mouseup",l),window.addEventListener("touchend",l),window.addEventListener("blur",l),window.addEventListener("mousemove",r),window.addEventListener("touchmove",r)}static get styles(){return r`
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
    `}};t([de({attribute:!1})],ts.prototype,"hass",void 0),t([de({attribute:!1})],ts.prototype,"config",void 0),t([ce()],ts.prototype,"schedule",void 0),t([ce()],ts.prototype,"selectedSlot",void 0),t([de({type:Boolean})],ts.prototype,"large",void 0),t([
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function(e){return(({finisher:e,descriptor:t})=>(i,a)=>{var s;if(void 0===a){const a=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=t?{kind:"method",placement:"prototype",key:a,descriptor:t(i.key)}:{...i,key:a};return null!=e&&(o.finisher=function(t){e(t,a)}),o}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,a,t(a)),null==e||e(s,a)}})({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}({passive:!0})],ts.prototype,"_handleDragStart",null),ts=t([re("scheduler-timeslot-editor")],ts);let is=class extends oe{constructor(){super(...arguments),this.hours=0,this.minutes=0,this.mode=fe.Fixed,this.autoValidate=!0,this.required=!0,this.disabled=!1,this.label="",this.useAmPm=!1}set time(e){this.hours=Number(e.split(":")[0]),this.minutes=Number(e.split(":")[1]);const t=Se(e);this.mode=t.mode,this.hours=t.hours,this.minutes=t.minutes}render(){return R`
      <div class="time-input-wrap">


        <span class="label">${this.label}</span>
        ${this._renderTimeModeOptions()}
          <div class="input">
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
          max=${this.mode==fe.Fixed?this.useAmPm?12:23:4}
          min=${this.mode==fe.Fixed?0:-4}
          .disabled=${this.disabled}
          suffix=":"
          class="hasSuffix"
          .validityTransform=${(e,t)=>{const i=null!==e.match(/[\+|\-]?[0-9]+/);return{valid:i,customError:!i}}}
        >
        </ha-textfield>
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
          suffix=""
          class=""
        >
        </ha-textfield>
        ${this.useAmPm&&this.mode==fe.Fixed?R`
          <ha-select
            .required=${this.required}
            .value=${Me(this.hours).am_pm==De.AM?"AM":"PM"}
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
        `:""}
        </div>
      </div>
    `}convertTimeMode(e){let t={mode:fe.Fixed,hours:this.hours,minutes:this.minutes};if([fe.Sunrise,fe.Sunset].includes(this.mode)){const e=this.mode==fe.Sunrise?this.hass.states["sun.sun"].attributes.next_rising:this.hass.states["sun.sun"].attributes.next_setting;let i=Se(e);i=Oe(i,{hours:this.hours,minutes:this.minutes}),t=Object.assign(Object.assign({},t),{hours:i.hours,minutes:i.minutes})}if([fe.Sunrise,fe.Sunset].includes(e)){const t=e==fe.Sunrise?this.hass.states["sun.sun"].attributes.next_rising:this.hass.states["sun.sun"].attributes.next_setting,i=es({hours:this.hours,minutes:this.minutes},t);return{mode:e,hours:i.hours,minutes:i.minutes}}return t}_renderTimeModeOptions(){if(!this.hass.states["sun.sun"])return R``;let e=[fe.Fixed,fe.Sunrise,fe.Sunset];const t={[fe.Fixed]:"Time",[fe.Sunrise]:"Sunrise",[fe.Sunset]:"Sunset"},i={[fe.Fixed]:"mdi:clock-outline",[fe.Sunrise]:"mdi:weather-sunset-up",[fe.Sunset]:"mdi:weather-sunset-down"},a={[fe.Fixed]:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",[fe.Sunrise]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z",[fe.Sunset]:"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z"},s=e=>{if(e==fe.Fixed)return!1;const t=this.convertTimeMode(e);return Math.abs(60*t.hours)+Math.abs(t.minutes)>240};return R`
      <ha-button-menu
        @action=${t=>this._handleMenuAction(t,e)}
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
        ${e.map(e=>R`
        <mwc-list-item graphic="icon" ?noninteractive=${this.mode==e} ?disabled=${s(e)}>
          ${t[e]}
          <ha-icon
            slot="graphic"
            icon="${i[e]}"
          ></ha-icon>
        </mwc-list-item>
        
        `)}
      </ha-button-menu>
    `}_hoursChanged(e){let t=Number(e.target.value);if(this.useAmPm){const e=Me(this.hours).am_pm;t=Pe(t,e)}this.hours=t,this._valueChanged()}_minutesChanged(e){const t=Number(e.target.value);this.minutes=t,this._valueChanged()}_amPmChanged(e){const t=e.target.value,i=Me(this.hours).hours;this.hours=Pe(i,"AM"==t?De.AM:De.PM),this._valueChanged()}_valueChanged(){const e={mode:this.mode,hours:this.hours,minutes:this.minutes};va(this,"value-changed",{value:e})}_onFocus(e){e.currentTarget.select()}formatHours(){const e=this.hours<0||this.minutes<0;let t=this.useAmPm&&this.mode==fe.Fixed?Me(this.hours).hours:this.hours;return e?"-"+Math.abs(t).toFixed():this.mode!=fe.Fixed?"+"+Math.abs(t).toFixed():t.toFixed()}formatMinutes(){return Math.abs(this.minutes).toString().padStart(2,"0")}_handleMenuAction(e,t){const i=e.detail.index,a=(t=t.filter(e=>e!=this.mode))[i],s=this.convertTimeMode(a);this.hours=s.hours,this.minutes=s.minutes,this.mode=a,e.preventDefault();const o=e.target;setTimeout(()=>{o.firstElementChild.blur()},50);const n={mode:this.mode,hours:this.hours,minutes:this.minutes};va(this,"value-changed",{value:n})}};is.styles=r`
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
    div.column {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
    :host([useAmPm]) div.column {
      flex-direction: column;
    }
    div.input {
      display: flex;
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
    ha-textfield.hasSuffix {
      --text-field-padding: 0 0 0 4px;
    }
    ha-textfield:first-child {
      --text-field-border-top-left-radius: var(--mdc-shape-medium);
    }
    ha-textfield:last-child {
      --text-field-border-top-right-radius: var(--mdc-shape-medium);
    }
    ha-select {
      --mdc-shape-small: 0;
      width: 85px;
    }
    .label {
      display: flex;
      justify-content: center;
      align-self: center;
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
  `,t([de({attribute:!1})],is.prototype,"hass",void 0),t([ce()],is.prototype,"hours",void 0),t([ce()],is.prototype,"minutes",void 0),t([ce()],is.prototype,"mode",void 0),t([de({type:Boolean})],is.prototype,"autoValidate",void 0),t([de({type:Boolean})],is.prototype,"required",void 0),t([de({type:Boolean})],is.prototype,"disabled",void 0),t([de({type:String})],is.prototype,"label",void 0),t([de({type:Boolean})],is.prototype,"useAmPm",void 0),is=t([re("scheduler-time-picker")],is);let as=class extends oe{constructor(){super(...arguments),this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=[]}async showDialog(e){this._params=e,await this.updateComplete,this.selectedWeekdays=this._params.weekdays.filter(e=>![he.Daily,he.Weekend,he.Workday].includes(e)),this.weekdayTypeCustomSelected=this.selectedWeekdays.length>0}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?R`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          ${this.weekdayTypeCustomSelected?R`
          <ha-icon-button
            slot="navigationIcon"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${ya}
            @click=${this.backClick}
          ></ha-icon-button>
            `:R`
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${fa}
          ></ha-icon-button>
          `};
          <span slot="title">
              ${Bi("ui.dialog.weekday_picker.title",this.hass)}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list>
          ${this._renderWeekdayOptions()}
          </mwc-list>
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
          ?disabled=${!this._params.weekdays.length}
        >
          ${this.hass.localize("ui.common.ok")}
        </mwc-button>
      </ha-dialog>
    `:R``}_renderWeekdayOptions(){let e=[];if(this.weekdayTypeCustomSelected){e=[he.Sunday,he.Monday,he.Tuesday,he.Wednesday,he.Thursday,he.Friday,he.Saturday];e=((e,t)=>e.concat(e).slice(t,t+e.length))(e,Ga(this.hass))}else e=[he.Daily,he.Workday,he.Weekend,"Custom"];const t=e=>{var t,i;return"Custom"==e?null===(t=this._params)||void 0===t?void 0:t.weekdays.every(e=>![he.Daily,he.Weekend,he.Workday].includes(e)):null===(i=this._params)||void 0===i?void 0:i.weekdays.includes(e)};return e.map(e=>R`
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${e}"
          ?hasMeta=${"Custom"==e}
        >
          ${t(e)?R`<ha-icon slot="graphic" icon="mdi:arrow-right"></ha-icon>`:""}
          ${"Custom"==e?R`
          
            ${Qi(Bi("ui.dialog.weekday_picker.choose",this.hass))}
            ${t(e)?R`<span class="badge">${this.selectedWeekdays.length}</span>`:""}
            `:Qi(ha(e,"long",this.hass))}

          ${"Custom"==e?R`<ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>`:""}
        </mwc-list-item>
    `)}_toggleSelectOption(e){const t=e.target.getAttribute("option");let i=[...this._params.weekdays];"Custom"==t?(i=this.selectedWeekdays,this.weekdayTypeCustomSelected=!0):[he.Daily,he.Weekend,he.Workday].includes(t)?(i=[t],this.weekdayTypeCustomSelected=!1):i=i.includes(t)?i.filter(e=>e!=t):[...i,t],this._params=Object.assign(this._params,{weekdays:i}),this.requestUpdate()}confirmClick(){this._params.confirm(this._params.weekdays)}cancelClick(){this._params.cancel()}backClick(){this.weekdayTypeCustomSelected=!1,this.selectedWeekdays=this._params.weekdays.filter(e=>![he.Daily,he.Weekend,he.Workday].includes(e))}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
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
    `}};t([de({attribute:!1})],as.prototype,"hass",void 0),t([ce()],as.prototype,"_params",void 0),t([ce()],as.prototype,"weekdayTypeCustomSelected",void 0),as=t([re("dialog-select-weekdays")],as);var ss=Object.freeze({__proto__:null,get DialogSelectWeekdays(){return as}});let os=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0,this.lockDomain=!1}async showDialog(e){this._params=e,e.domainFilter&&(this.lockDomain=!0),await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title"),this.hass.loadBackendTranslation("services")}render(){return this._params?R`
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
            ${void 0===this._params.domainFilter||this.lockDomain?R`
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
              .path=${fa}
            ></ha-icon-button>
            `:R`
            <ha-icon-button
              slot="navigationIcon"
              .label=${this.hass.localize("ui.common.back")}
              .path=${ya}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${Bi("ui.dialog.action_picker.title",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${this.hass.localize("ui.common.search")}
            aria-label=${this.hass.localize("ui.common.search")}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&R`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${fa}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${ja({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:R``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_renderOptions(){var e;if(null===(e=this._params)||void 0===e?void 0:e.domainFilter){let e=this._params.domainFilter.map(e=>((e,t,i)=>{const a=Object.keys(e.services).includes(t)?Object.keys(e.services[t]).filter(e=>{if(!Object.keys(ea).includes(t))return!1;let i=Object.keys(ea[t]).includes(e);return!i&&Object.keys(ea[t]).includes("{entity_id}")&&(i=!["turn_on","turn_off","reload","toggle","test"].includes(e)),i}):[],s=t=>e.localize(`component.${t}.title`)||t.replace(/_/g," "),o=i=>e.localize(`component.${t}.services.${i}.description`)||e.services[t][i].description;let n=a.map(i=>{return Object({key:i,name:`${s(t)}: ${a=i,e.localize(`component.${t}.services.${a}.name`)||e.services[t][a].name||a.replace(/_/g," ")}`,description:o(i),icon:wa(t),action:{service:i.includes(".")?i:`${t}.${i}`,service_data:{},target:e.services[t][i].target?{}:void 0}});var a});return Object.keys(i||{}).filter(e=>Zi(e)==t).map(e=>(i||{})[e].actions||[]).flat().forEach(e=>{let i=e.service;for(;n.find(e=>e.key==i);)i+="_2";n.push({key:i,name:e.name||"",description:e.name||"",icon:e.icon||wa(t),action:{service:e.service.includes(".")?e.service:`${t}.${e.service}`,service_data:e.service_data||{},target:e.target?{}:void 0,name:e.name,icon:e.icon}})}),n})(this.hass,e,this._params.cardConfig.customize)).flat();return Object.keys(e).map(t=>R`
        <mwc-list-item
          graphic="icon"
          @click=${()=>this._handleActionClick(e[t])}
          twoline
        >
          <ha-icon slot="graphic" icon="${e[t].icon}"></ha-icon>
          <span>${e[t].name}</span>
          <span slot="secondary">${e[t].description}</span>
        </mwc-list-item>
    `)}{let e=xa(this.hass,this._params.cardConfig);e.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))}));let i=[];for(var t=e.length;t<7;t++)i.push(0);return R`
      ${Object.keys(e).map(t=>R`
        <mwc-list-item
          graphic="icon"
          hasMeta
          @click=${()=>this._handleDomainClick(e[t].key)}
        >
          <ha-icon slot="graphic" icon="${e[t].icon}"></ha-icon>
          <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
          <span>${e[t].name}</span>
        </mwc-list-item>`)}
        ${i.map(e=>R`
        <mwc-list-item
          graphic="icon"
          hasMeta
          noninteractive
        >
        </mwc-list-item>
        `)}
      `}}_handleDomainClick(e){this._params=Object.assign(Object.assign({},this._params),{domainFilter:[e]}),this._clearSearch()}_clearDomain(){this._params=Object.assign(Object.assign({},this._params),{domainFilter:void 0}),this._clearSearch()}_handleActionClick(e){this._params.confirm(e.action),this._params=void 0,this._clearSearch()}_clearSearch(){this._search="",this._filter=""}static get styles(){return r`
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
    `}};t([de({attribute:!1})],os.prototype,"hass",void 0),t([ce()],os.prototype,"_params",void 0),t([ce()],os.prototype,"_search",void 0),t([ce()],os.prototype,"_filter",void 0),t([ce()],os.prototype,"_width",void 0),t([ce()],os.prototype,"_height",void 0),t([ce()],os.prototype,"lockDomain",void 0),os=t([re("dialog-select-action")],os);var ns=Object.freeze({__proto__:null,get DialogSelectWeekdays(){return os}});let rs=class extends oe{constructor(){super(...arguments),this.showPrefix=!1}render(){return R`
      ${this.showPrefix?R`
      <div class="prefix-wrap">
        <div class="prefix"><slot name="prefix"></slot></div>
        <div class="body">
          <div class="heading"><slot name="heading"></slot></div>
          <div class="secondary"><slot name="description"></slot></div>
        </div>
      </div>
      `:R`
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
    .content ::slotted(*) {
      width: var(--settings-row-content-width);
    }
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
    `}};t([de({type:Boolean})],rs.prototype,"showPrefix",void 0),rs=t([re("settings-row")],rs);let ls=class extends oe{constructor(){super(...arguments),this.selectedEntry=0,this.selectedSlot=null,this.large=!1}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){return R`
    ${this.schedule.entries.map((e,t)=>R`

      <div class="editor-header">
      <div class="weekdays">
        <span>
          ${Bi("ui.panel.editor.repeated_days",this.hass)}:
          ${((e,t,i)=>{const a=Ga(i);let s=((e,t)=>e.concat(e).slice(t,t+e.length))(Ya,a);e.sort((e,t)=>s.findIndex(t=>t==e)-s.findIndex(e=>e==t));const o=e.filter(e=>s.includes(e)).map(e=>s.findIndex(t=>t==e)),n=(e=>{const t=[];for(let i=0;i<e.length-1;i++){let a=i+1;for(;e[a]-e[a-1]==1;)a++;t.push(a-i)}return t})(o),r=Math.max(...n);if(o.length){if(6==o.length){const e=[0,1,2,3,4,5,6].filter(e=>!o.includes(e)),a=ha(s[e.pop()],t,i);return Bi("ui.components.date.repeated_days_except",i,"{excludedDays}",a)}const e=o.map(e=>ha(s[e],t,i));if(o.length>=3&&r>=3){const t=n.reduce((e,t,i)=>t==r?i:e,0);e.splice(t,r,Bi("ui.components.date.days_range",i,["{startDay}","{endDay}"],[e[t],e[t+r-1]]))}const a=e.length>1?`${e.slice(0,-1).join(", ")} ${i.localize("ui.common.and")} ${e.pop()}`:""+e.pop();return o.length>=3&&r>=3?a:Bi("ui.components.date.repeated_days",i,"{days}",a)}return e.map(e=>ha(e,t,i)).join(", ")})(e.weekdays,"short",this.hass)}
        </span>
        <ha-icon-button .path=${ba} @click=${e=>this._showWeekdayDialog(e,t)}></ha-icon-button>
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
    `)}

    ${this.renderSlot()}
    `}renderActionButtons(){if(null===this.selectedSlot||null===this.selectedEntry)return R``;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start,t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].stop||e,i=Ae(e,this.hass),a=(Ae(t,this.hass)||86400)-i;return R`
      <div class="actions">
        <ha-icon-button .path=${ya} @click=${()=>{this.selectedSlot=this.selectedSlot-1}} ?disabled=${null===this.selectedSlot||this.selectedSlot<1}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"} @click=${()=>{this.selectedSlot=this.selectedSlot+1}} ?disabled=${null===this.selectedSlot||this.selectedSlot>this.schedule.entries[this.selectedEntry].slots.length-2}>
        </ha-icon-button> 
        <ha-icon-button .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"} @click=${this._addTimeslot} ?disabled=${a<1800}>
        </ha-icon-button>
        <ha-icon-button .path=${"M19,13H5V11H19V13Z"} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length<=2}>
        </ha-icon-button> 
      </div>
    `}renderSlot(){if(null===this.selectedEntry||null===this.selectedSlot)return R`
        <div class="slot-placeholder"> 
          ${Bi("ui.panel.editor.select_timeslot",this.hass)}
        </div>
      `;const e=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];let t=e.stop;return!t&&this.selectedSlot<this.schedule.entries[this.selectedEntry].slots.length-1&&(t=this.schedule.entries[this.selectedEntry].slots[this.selectedSlot+1].start),t||(t=e.start),R`

      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${Bi("ui.panel.editor.start_time",this.hass)}:"
            ?disabled=${0==this.selectedSlot}
            .time=${e.start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${Te(this.hass.locale)}
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
            label="${Bi("ui.panel.editor.stop_time",this.hass)}:"
            ?disabled=${void 0===e.stop||this.selectedSlot==this.schedule.entries[this.selectedEntry].slots.length-1}
            .time=${t}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${Te(this.hass.locale)}
          >
          </scheduler-time-picker>
          </div>
        </div>
      </div>

      ${Bi("ui.panel.editor.action",this.hass)}:
      ${this._renderActionConfig()}
    `}_renderActionConfig(){var e,t,i,a,s;const o=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]),n=o.actions.length?o.actions[0]:void 0;if(!n)return R`
      <div>
        <mwc-button
          @click=${this._showActionDialog}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          ${Bi("ui.panel.editor.add_action",this.hass)}
        </mwc-button>
      </div>
    `;const r=Zi(n.service),l=ia(n,this.config.customize);if(void 0===l)return R``;const d=Object.keys(l.fields||{}).filter(e=>Fa(n,e,this.hass,this.config.customize));let c="",u=[(null===(e=n.target)||void 0===e?void 0:e.entity_id)||[]].flat();return u.length&&(c+=u.map(e=>{var t;return Ki(e,null===(t=this.hass.states[e])||void 0===t?void 0:t.attributes)}).join(", "),c+=": "),c+=ca(n,this.hass,this.config.customize),R`
      <collapsible-section
        ?expanded=${!0}
        ?disabled=${!0}
      >
        <span slot="header">
          <ha-icon slot="icon" icon="${Xa(n,this.config.customize)}"></ha-icon>
          ${Qi(c)}
        </span>
        <ha-icon-button slot="contextMenu" .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"} @click=${this._removeAction}></ha-icon-button>
        <div slot="content">

          ${l.target?R`
          <settings-row>
            <span slot="heading">${this.hass.localize("ui.components.entity.entity-picker.entity")}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${r}
              @value-changed=${this._selectEntity}
              .value=${Array.isArray(null===(t=n.target)||void 0===t?void 0:t.entity_id)||null===(i=n.target)||void 0===i?void 0:i.entity_id}
              .valueMultiple=${Array.isArray(null===(a=n.target)||void 0===a?void 0:a.entity_id)?null===(s=n.target)||void 0===s?void 0:s.entity_id:[]}
              ?allowMultiple=${!0}
            >
            </scheduler-entity-picker>
          </settings-row>
          `:""}

          ${d.map(e=>{var t;const i=oa(n.service,null===(t=n.target)||void 0===t?void 0:t.entity_id,e,this.hass,this.config.customize);if(null===i)return"";let a=l.fields[e].optional||(i.number||{}).optional;const s=!a||Object.keys(n.service_data).includes(e);return R`
            <settings-row ?showPrefix=${a}>
              ${a?R`
                <ha-checkbox
                  slot="prefix"
                  ?checked=${s}
                  @change=${t=>this._toggleOptionalField(t,e,i)}
                >
                </ha-checkbox>
              `:""}
              <span slot="heading">
                ${((e,t,i,a)=>{const s=Zi(e.service),o=Wi(e.service);let n=i.localize(`component.${s}.services.${o}.fields.${t}.name`);!n&&i.services[s]&&i.services[s][e.service]&&i.services[s][e.service].fields&&i.services[s][e.service].fields[t]&&(n=String(i.services[s][e.service].fields[t].name));const r=Object.entries(a||{}).filter(([t])=>t==s||t==e.service).map(([t,i])=>(i.actions||[]).filter(t=>ta(t,e))).flat().find(e=>Object.keys(e.variables).includes(t));return r&&(n=r.variables[t].name||""),n||(n=t.replace(/_/g," ")),n})(n,e,this.hass,this.config.customize)}
              </span>
              <combo-selector
                .hass=${this.hass}
                .config=${i}
                ?disabled=${!s}
                .value=${Object.keys(n.service_data).includes(e)?n.service_data[e]:void 0}
                @value-changed=${t=>this._selectField(e,t)}
              >
              </combo-selector>
            </settings-row>
          `})}
        </div>
      </collapsible-section>
    `}_selectField(e,t){const i=t.detail.value,a=Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);let s=void 0!==i?Object.assign(Object.assign({},a.actions[0]),{service_data:Object.assign(Object.assign({},a.actions[0].service_data),{[e]:i})}):Object.assign(Object.assign({},a.actions[0]),{service_data:Object.fromEntries(Object.entries(a.actions[0].service_data).filter(([t])=>t!=e))});this._updateSlot({actions:[s]})}_toggleOptionalField(e,t,i){const a=e.target.checked?(e=>{if(Object.keys(e).includes("select")&&e.select){const t=e.select.options;return t.length?t[0]:""}if(Object.keys(e).includes("number")&&e.number){const t=e.number.min;return void 0!==t?t:0}return(!Object.keys(e).includes("boolean")||!e.boolean)&&(Object.keys(e).includes("text")&&e.text,"")})(i):void 0;this._selectField(t,new CustomEvent("value-changed",{detail:{value:a}}))}_selectEntity(e){const t=e.detail.value;t&&this.schedule.entries[this.selectedEntry].slots.forEach((e,i)=>{if(!e.actions.length)return;let a=Object.assign(Object.assign({},e.actions[0]),{target:{entity_id:t}});this._updateSlot({actions:[a]},i)})}_handleUpdate(e,t){this.selectedEntry=t,e.detail.hasOwnProperty("selectedSlot")?this.selectedSlot=e.detail.selectedSlot:e.detail.hasOwnProperty("slots")&&this._updateEntry({slots:e.detail.slots})}_updateEntry(e){let t=Object.assign({},this.schedule.entries[this.selectedEntry]);t=Object.assign(Object.assign({},t),e),this.schedule=Object.assign(Object.assign({},this.schedule),{entries:Object.assign(this.schedule.entries,{[this.selectedEntry]:t})})}_updateSlot(e,t=this.selectedSlot){let i=Object.assign({},this.schedule.entries[this.selectedEntry].slots[t]);i=Object.assign(Object.assign({},i),e),this._updateEntry({slots:Object.assign(this.schedule.entries[this.selectedEntry].slots,{[t]:i})})}async _showWeekdayDialog(e,t){this.selectedEntry=t,await new Promise(i=>{const a={weekdays:[...this.schedule.entries[t].weekdays],cancel:()=>i(null),confirm:e=>i(e)};va(e.target,"show-dialog",{dialogTag:"dialog-select-weekdays",dialogImport:()=>Promise.resolve().then((function(){return ss})),dialogParams:a})}).then(e=>{e&&this._updateEntry({weekdays:e})})}async _showActionDialog(e){let t=[];this.schedule.entries.forEach(e=>{e.slots.forEach(e=>{e.actions.forEach(e=>{var i;let a=[Zi(e.service),...[(null===(i=e.target)||void 0===i?void 0:i.entity_id)||[]].flat()].map(Zi);a=a.filter(e=>!t.includes(e)),a.length&&(t=[...t,...a])})})}),t=[...new Set(t)],await new Promise(i=>{const a={cancel:()=>i(null),confirm:e=>i(e),domainFilter:t.length?t:void 0,cardConfig:this.config};va(e.target,"show-dialog",{dialogTag:"dialog-select-action",dialogImport:()=>Promise.resolve().then((function(){return ns})),dialogParams:a})}).then(e=>{if(!e)return;Object.assign({},this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);const t=this.schedule.entries[this.selectedEntry].slots.find(e=>{var t;return e.actions.length?null===(t=e.actions[0].target)||void 0===t?void 0:t.entity_id:void 0});let i=Object.assign({},e);t&&i.target&&(i=Object.assign(Object.assign({},i),{target:t.actions[0].target})),this._updateSlot({actions:[i]})})}_removeAction(){this._updateSlot({actions:[]})}_stopTimeChanged(e){const t=e.detail.value,i=Le(t),a=Number(this.selectedSlot);let s=[...this.schedule.entries[this.selectedEntry].slots];s=Object.assign(s,{[a]:Object.assign(Object.assign({},s[a]),{stop:i})}),a<s.length-1&&(s=Object.assign(s,{[a+1]:Object.assign(Object.assign({},s[a+1]),{start:i})})),this._updateEntry({slots:s})}_startTimeChanged(e){const t=e.detail.value,i=Le(t),a=Number(this.selectedSlot);let s=[...this.schedule.entries[this.selectedEntry].slots];s=Object.assign(s,{[a]:Object.assign(Object.assign({},s[a]),{start:i})}),a>0&&(s=Object.assign(s,{[a-1]:Object.assign(Object.assign({},s[a-1]),{stop:i})})),this._updateEntry({slots:s})}_toggleStopTime(e){const t=e.target.checked,i=Number(this.selectedSlot);let a=[...this.schedule.entries[this.selectedEntry].slots];if(t){let e=i+1,t=a[i].start;a[i+1].actions.length||(t=a[i+1].stop,e=i+2),a=[...a.slice(0,i),Object.assign(Object.assign({},a[i]),{stop:t}),...a.slice(e)]}else{const e=Oe(Se(a[i].start),{minutes:1});a=[...a.slice(0,i),Object.assign(Object.assign({},a[i]),{stop:void 0}),{start:Le(e),stop:a[i].stop,actions:[],conditions:a[i].conditions},...a.slice(i+1)]}this._updateEntry({slots:a})}_addTimeslot(){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i,a)=>{let s=[...e.entries[t].slots],o=Se(s[i].start),n=void 0===s[i].stop?o:Se(s[i].stop);if(n.mode!==fe.Fixed||n.hours||n.minutes||(n=Object.assign(Object.assign({},n),{hours:24})),[fe.Sunrise,fe.Sunset].includes(o.mode)){const e=o.mode==fe.Sunrise?a.states["sun.sun"].attributes.next_rising:a.states["sun.sun"].attributes.next_setting;let t=Se(e);o=Oe(t,{hours:o.hours,minutes:o.minutes})}const r=Ae(o,a),l=(Ae(n,a)-r)/2,d=Math.floor(l/3600),c=Math.round((l-3600*d)/60);let u=Oe(o,{hours:d,minutes:c});return u=ze(u,15),s=[...s.slice(0,i),Object.assign(Object.assign({},s[i]),{stop:Le(u)}),Object.assign(Object.assign({},s[i]),{start:Le(u),stop:Le(n),actions:[]}),...s.slice(i+1)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:s})})})})(this.schedule,this.selectedEntry,this.selectedSlot,this.hass))}_removeTimeslot(){null!==this.selectedEntry&&null!==this.selectedSlot&&(this.schedule=((e,t,i)=>{let a=[...e.entries[t].slots];const s=i==a.length-1?i-1:i;return a=[...a.slice(0,s),Object.assign(Object.assign({},a[s+1]),{start:a[s].start,stop:a[s+1].stop}),...a.slice(s+2)],e=Object.assign(Object.assign({},e),{entries:Object.assign(e.entries,{[t]:Object.assign(Object.assign({},e.entries[t]),{slots:a})})})})(this.schedule,this.selectedEntry,this.selectedSlot),this.selectedSlot==this.schedule.entries[this.selectedEntry].slots.length&&this.selectedSlot--)}static get styles(){return r`
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
  }
  .weekdays {
    display: flex;
    flex: 1;
    align-items: center;
  }
  div.actions {
    display: flex;
    align-items: end;
  }
  @media all and (max-width: 450px) {
    div.editor-header {
      flex-direction: column;
    }
    div.actions {
      align-self: flex-end;
    }
  }
  div.slot-placeholder {
    padding: 20px 0px 0px 0px;
  }
    `}};t([de({attribute:!1})],ls.prototype,"hass",void 0),t([de({attribute:!1})],ls.prototype,"config",void 0),t([ce()],ls.prototype,"schedule",void 0),t([ce()],ls.prototype,"selectedEntry",void 0),t([ce()],ls.prototype,"selectedSlot",void 0),t([de({type:Boolean})],ls.prototype,"large",void 0),ls=t([re("scheduler-main-panel")],ls);const ds=["January","February","March","April","May","June","July","August","September","October","November","December"];function cs(e){return e.toISOString().split("T")[0]}function us(e){let t=new Date;const i=(e||"").match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);null!==i&&t.setFullYear(Number(i[1]),Number(i[2])-1,Number(i[3]));const a=(e||"").match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);return null!==a&&t.setHours(Number(a[1]),Number(a[2]),a.length>4?Number(a[4]):t.getSeconds()),t}const ms=(e,t)=>"select"in t&&null!==t.select?((e,t)=>{var i;return((null===(i=t.select)||void 0===i?void 0:i.options)||[]).some(t=>"object"==typeof t?t.value==e:t==e)})(String(e),t):"number"in t&&null!==t.number?((e,t)=>{var i,a;return isNaN(e)||void 0!==(null===(i=t.number)||void 0===i?void 0:i.min)&&e<t.number.min||void 0!==(null===(a=t.number)||void 0===a?void 0:a.max)&&t.number.max,!1})(Number(e),t):!("text"in t)||null===t.text||String(e).length>0;let hs=class extends oe{constructor(){super(...arguments),this._search="",this._filter="",this.timer=0}async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0,this._clearSearch(),this._height=void 0,this._width=void 0}async willUpdate(){this.hass.loadBackendTranslation("title")}render(){return this._params?R`
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
              .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
              .path=${fa}
            ></ha-icon-button>
            <span slot="title">
              ${Bi("ui.panel.options.conditions.add_condition",this.hass)}
            </span>
          </ha-dialog-header>

          <ha-textfield
            dialogInitialFocus
            .placeholder=${this.hass.localize("ui.common.search")}
            aria-label=${this.hass.localize("ui.common.search")}
            @input=${this._handleSearchChange}
            .value=${this._search}
            icon
            .iconTrailing=${this._search}
          >
            <div class="trailing" slot="trailingIcon">
              ${this._search&&R`
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${fa}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>

        <mwc-list
          style=${ja({width:this._width?this._width+"px":"auto",height:this._height?Math.min(468,this._height)+"px":"auto"})}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `:R``}_opened(){var e;const t=null===(e=this.shadowRoot.querySelector("mwc-list"))||void 0===e?void 0:e.getBoundingClientRect();this._width=null==t?void 0:t.width,this._height=null==t?void 0:t.height}_handleSearchChange(e){const t=e.currentTarget.value;this._search=t,clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._filter=this._search},100)}_clearSearch(){this._search="",this._filter=""}_renderOptions(){let e=Aa(this.hass,this._params.cardConfig);return e.sort((e,t)=>Yi(e.name,t.name)),this._filter&&(e=e.filter(e=>{const t=this._filter.toLowerCase().trim().split(" ");return t.every(t=>e.name.toLowerCase().includes(t))||t.every(t=>e.key.toLowerCase().includes(t))})),Object.keys(e).map(t=>R`
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
    `}};t([de({attribute:!1})],hs.prototype,"hass",void 0),t([ce()],hs.prototype,"_params",void 0),t([ce()],hs.prototype,"_search",void 0),t([ce()],hs.prototype,"_filter",void 0),t([ce()],hs.prototype,"_width",void 0),t([ce()],hs.prototype,"_height",void 0),hs=t([re("dialog-select-condition")],hs);var ps=Object.freeze({__proto__:null,get DialogSelectCondition(){return hs}});let _s=class extends oe{constructor(){super(...arguments),this.conditionValid=!0,this.startDate="",this.endDate="",this.tags=[]}async firstUpdated(){var e,t;(await window.loadCardHelpers()).importMoreInfoControl("input_datetime"),this.startDate=(null===(e=this.schedule)||void 0===e?void 0:e.start_date)||cs(new Date),this.endDate=(null===(t=this.schedule)||void 0===t?void 0:t.end_date)||cs(new Date);const i=(await Ra(this.hass)).map(e=>e.name),a=[...this.config.tags].flat();this.tags=[...i,...a.filter(e=>!i.includes(e)&&!["none","disabled","enabled"].includes(e))]}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){const e={select:{options:this.tags,multiple:!0,custom_value:!0}};return R`
      <div class="header first">
        <span>${Bi("ui.panel.options.conditions.header",this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length?R`
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
            ${this.schedule.entries[0].slots[0].conditions.type==pe.Or?R`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Bi("ui.panel.options.conditions.options.logic_or",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon" ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length<2}>
            ${this.schedule.entries[0].slots[0].conditions.type==pe.And?R`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Bi("ui.panel.options.conditions.options.logic_and",this.hass)}
          </mwc-list-item>
          <mwc-list-item graphic="icon">

            ${this.schedule.entries[0].slots[0].conditions.track_changes?R`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`:""}
            ${Bi("ui.panel.options.conditions.options.track_changes",this.hass)}
          </mwc-list-item>
        </ha-button-menu>
        `:""}
        </div>
        <collapsible-group
          ?disabled=${!this.conditionValid}
          @openclose-changed=${this._updateActiveCondition}
          .openedItem=${this.conditionIdx}
        >
        ${this.renderConditions()}
        </collapsible-group>

      <div>
        <mwc-button
          @click=${this._conditionAddClick}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          ${Bi("ui.panel.options.conditions.add_condition",this.hass)}
        </mwc-button>
      </div>


      <span class="header">${Bi("ui.panel.options.period.header",this.hass)}:</span>
      <div class="period">
        <ha-checkbox
          ?checked=${void 0!==this.schedule.start_date}
          @change=${this.toggleEnableDateRange}
        >
        </ha-checkbox>
        <span>${Bi("ui.panel.options.period.start_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${this.hass.localize("ui.components.date-range-picker.start_date")}
          @value-changed=${this._setStartDate}
          ?disabled=${void 0===this.schedule.start_date}
        >
        </ha-date-input>
        <span>${Bi("ui.panel.options.period.end_date",this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${this.hass.localize("ui.components.date-range-picker.end_date")}
          @value-changed=${this._setEndDate}
          ?disabled=${void 0===this.schedule.end_date}
        >
        </ha-date-input>
      </div>

      <span class="header">${this.hass.localize("ui.components.area-picker.add_dialog.name")}:</span>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name||""}
          placeholder=${this.schedule.name?"":this.hass.localize("ui.components.area-picker.add_dialog.name")}
          @input=${this.updateName}
        ></ha-textfield>
      </div>

      <span class="header">${Bi("ui.panel.options.tags",this.hass)}:</span>
      <div>
        <combo-selector
          .hass=${this.hass}
          .config=${e}
          .value=${this.schedule.tags||[]}
          @value-changed=${this.tagsUpdated}
        >
        </combo-selector>
      </div>

      <span class="header">${Bi("ui.panel.options.repeat_type",this.hass)}:</span>
      <mwc-button @click=${this.setRepeatType} value="${ye.Repeat}" ?active=${this.schedule.repeat_type==ye.Repeat}>
        <ha-icon icon="mdi:refresh"></ha-icon>
        ${this.hass.localize("ui.components.calendar.event.repeat.label")}
      </mwc-button>
      <mwc-button @click=${this.setRepeatType} value="${ye.Pause}" ?active=${this.schedule.repeat_type==ye.Pause}>
        <ha-icon icon="mdi:stop"></ha-icon>
        ${this.hass.localize("ui.dialogs.more_info_control.vacuum.stop")}
      </mwc-button>
      <mwc-button @click=${this.setRepeatType}  value="${ye.Single}" ?active=${this.schedule.repeat_type==ye.Single}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this.hass.localize("ui.common.delete")}
      </mwc-button>
    `}renderConditions(){let e=this.schedule.entries[0].slots[0].conditions.items;return this.conditionIdx==e.length&&(e=[...e,{}]),e.map((e,t)=>{const i=this.selectedDomain||Zi(e.entity_id||""),a=za(this.selectedEntity||i,this.hass),s=a&&a.hasOwnProperty("number")?[_e.Above,_e.Below]:[_e.Equal,_e.Unequal],o={[_e.Equal]:"mdi:equal",[_e.Unequal]:"mdi:not-equal-variant",[_e.Above]:"mdi:greater-than",[_e.Below]:"mdi:less-than"},n={[_e.Equal]:"ui.panel.options.conditions.types.equal_to",[_e.Unequal]:"ui.panel.options.conditions.types.unequal_to",[_e.Above]:"ui.panel.options.conditions.types.above",[_e.Below]:"ui.panel.options.conditions.types.below"};return this.conditionIdx!==t||this.selectedMatchType||(this.selectedMatchType=s[0]),R`
      <collapsible-section>
        <span slot="header">
          ${e.entity_id&&void 0!==e.value?R`
          <ha-icon slot="icon" icon="${Ca(e.entity_id,this.hass)}"></ha-icon>
          ${Qi(Bi(n[e.match_type],this.hass,["{entity}","{value}"],[(r=e.entity_id,l=this.hass,(Object.keys(l.states).includes(r)&&l.states[r].attributes.friendly_name?l.states[r].attributes.friendly_name:Wi(r).replace(/_/g," "))||""),e.value||""]))}
          `:"new condition"}
        </span>
        <ha-button-menu
          slot="contextMenu" 
          @action=${e=>this._conditionItemOptionsClick(e,t)}
          @closed=${e=>{e.stopPropagation()}}
          @click=${e=>{e.preventDefault(),e.stopImmediatePropagation()}}
          fixed
          ?disabled=${!this.conditionValid&&this.conditionIdx!==t}
        >
          <ha-icon-button
            slot="trigger"
            .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
            ?disabled=${!this.conditionValid&&this.conditionIdx!==t}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${this.hass.localize("ui.panel.lovelace.editor.card.conditional.change_type")}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${this.hass.localize("ui.common.delete")}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

        <settings-row>
          <span slot="heading">
            ${this.hass.localize("ui.components.selectors.selector.types.entity")}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${i}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx==t?this.selectedEntity:e.entity_id}
          >
          </scheduler-entity-picker>
        </settings-row>

        <settings-row>
          <span slot="heading">
            ${Qi(Bi(n[this.conditionIdx==t?this.selectedMatchType:e.match_type],this.hass,["{entity}","{value}"],["",""]))}
            <ha-button-menu
              @action=${e=>this._selectMatchType(e,s)}
              @closed=${e=>{e.stopPropagation()}}
              fixed
            >
              <ha-icon-button slot="trigger" .path=${ba}>
              </ha-icon-button>
              ${s.map(i=>R`
                <mwc-list-item graphic="icon" ?noninteractive=${this.conditionIdx==t?this.selectedMatchType==i:e.match_type==i}>
                  ${Qi(Bi(n[i],this.hass,["{entity}","{value}"],["",""]))}
                  <ha-icon slot="graphic" icon="${o[i]}"></ha-icon>
                </mwc-list-item>
              `)}
            </ha-button-menu>
          </span>
          <combo-selector
            .hass=${this.hass}
            .config=${a}
            .value=${this.conditionIdx==t?this.conditionValue:e.value}
            @value-changed=${this._conditionValueChanged}
          >
          </combo-selector>
        </settings-row>
        </div>
      </collapsible-section>
    `;var r,l})}_updateActiveCondition(e){const t=e.detail.item;if(t<0)return void(this.conditionIdx=void 0);if(t===this.conditionIdx)return;this.conditionIdx=t;const i=this.schedule.entries[0].slots[0].conditions.items[t];this.selectedEntity=i?i.entity_id:void 0,this.selectedMatchType=i?i.match_type:void 0,this.conditionValue=i?i.value:void 0}_conditionItemOptionsClick(e,t){switch(e.detail.index){case 0:this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=t,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)});break;case 1:const i=this.schedule.entries[0].slots[0].conditions.items.filter((e,i)=>i!==t),a=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})}),s=e=>Object.assign(e,{slots:e.slots.map(a)});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(s)}),t===this.conditionIdx?this.conditionIdx=void 0:void 0!==this.conditionIdx&&t<this.conditionIdx&&(this.conditionIdx=this.conditionIdx-1)}}_selectMatchType(e,t){const i=e.detail.index;t=t.filter(e=>e!=this.selectedMatchType),this.selectedMatchType=t[i],e.preventDefault();const a=e.target;setTimeout(()=>{a.firstElementChild.blur()},50),this._validateCondition()}_conditionValueChanged(e){this.conditionValue=e.detail.value,this._validateCondition()}async _showConditionDialog(e){return new Promise(t=>{const i={cancel:()=>t(null),confirm:e=>t(e),domain:void 0,cardConfig:this.config};va(e.target,"show-dialog",{dialogTag:"dialog-select-condition",dialogImport:()=>Promise.resolve().then((function(){return ps})),dialogParams:i})})}_selectEntity(e){const t=e.detail.value;this.selectedEntity=t,this._validateCondition()}_validateCondition(){if(this.conditionValid=!1,!this.selectedEntity||!this.conditionValue||!this.selectedMatchType||void 0===this.conditionIdx)return;const e=za(this.selectedEntity,this.hass);if(!ms(this.conditionValue,e))return;this.conditionValid=!0;const t={entity_id:this.selectedEntity,match_type:this.selectedMatchType,value:this.conditionValue,attribute:"state"},i=Object.assign(this.schedule.entries[0].slots[0].conditions.items,{[this.conditionIdx]:t}),a=e=>Object.assign(e,{conditions:Object.assign(Object.assign({},e.conditions),{items:i})});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(a)}))})}_conditionAddClick(e){this._showConditionDialog(e).then(e=>{e&&(this.conditionIdx=this.schedule.entries[0].slots[0].conditions.items.length,this.selectedDomain=e,this.selectedEntity=void 0,this.selectedMatchType=void 0,this.conditionValue=void 0,this.conditionValid=!1)})}_conditionConfigOptionsClick(e){let t=Object.assign({},this.schedule.entries[0].slots[0].conditions);switch(e.detail.index){case 0:if(t.type==pe.Or)return;t=Object.assign(Object.assign({},t),{type:pe.Or});break;case 1:if(t.type==pe.And)return;t=Object.assign(Object.assign({},t),{type:pe.And});break;case 2:const e=!this.schedule.entries[0].slots[0].conditions.track_changes;t=Object.assign(Object.assign({},t),{track_changes:e})}const i=e=>Object.assign(e,{conditions:t});this.schedule=Object.assign(Object.assign({},this.schedule),{entries:this.schedule.entries.map(e=>Object.assign(e,{slots:e.slots.map(i)}))})}_setStartDate(e){const t=String(e.detail.value);if(!t)return;us(t)>us(this.endDate)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t}_setEndDate(e){const t=String(e.detail.value);if(!t)return;us(this.startDate)>us(t)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t}toggleEnableDateRange(e){const t=e.target.checked;this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t?this.startDate:void 0,end_date:t?this.endDate:void 0,repeat_type:t?this.schedule.repeat_type==ye.Repeat?ye.Pause:this.schedule.repeat_type:this.schedule.repeat_type==ye.Pause?ye.Repeat:this.schedule.repeat_type})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t.trim()})}tagsUpdated(e){let t=e.detail.value;t=t.map(e=>e.trim()),t=t.filter(e=>!["none","disabled","enabled"].includes(e)),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:t})}setRepeatType(e){const t=e.target.getAttribute("value");this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}static get styles(){return r`
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
      mwc-button ha-icon {
        margin-right: 11px;
      }
      mwc-button[active] {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
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
    `}};t([de({attribute:!1})],_s.prototype,"hass",void 0),t([de({attribute:!1})],_s.prototype,"config",void 0),t([ce()],_s.prototype,"schedule",void 0),t([ce()],_s.prototype,"conditionIdx",void 0),t([ce()],_s.prototype,"selectedDomain",void 0),t([ce()],_s.prototype,"selectedEntity",void 0),t([ce()],_s.prototype,"selectedMatchType",void 0),t([ce()],_s.prototype,"conditionValue",void 0),t([ce()],_s.prototype,"conditionValid",void 0),t([ce()],_s.prototype,"startDate",void 0),t([ce()],_s.prototype,"endDate",void 0),t([de()],_s.prototype,"tags",void 0),_s=t([re("scheduler-options-panel")],_s);let gs=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?R`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${fa}
          ></ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        ${this._params.secondaryButtonLabel?R`
              <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                ${this._params.secondaryButtonLabel}
              </mwc-button>
            `:""}
        <mwc-button
          slot="secondaryAction"
          style="${this._params.primaryButtonCritical?"--mdc-theme-primary: var(--error-color)":""}"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this._params.primaryButtonLabel}
        </mwc-button>
      </ha-dialog>
    `:R``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([de({attribute:!1})],gs.prototype,"hass",void 0),t([ce()],gs.prototype,"_params",void 0),gs=t([re("scheduler-generic-dialog")],gs);var vs=Object.freeze({__proto__:null,get GenericDialog(){return gs}});let ys=class extends oe{constructor(){super(...arguments),this.large=!1,this.selectedEntry=0,this.selectedSlot=0,this._panel="main"}async showDialog(e){this._params=e,this.schedule=e.schedule,this._panel="main",this.large=!1,await this.updateComplete}async closeDialog(){this._params=void 0}willUpdate(){this.hass.loadBackendTranslation("config")}render(){var e;return this._params?R`
      <ha-dialog open @closed=${this.closeDialog} .heading=${!0} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${fa}
          ></ha-icon-button>
          <ha-icon-button
            slot="actionItems"
            .label=""
            .path=${"main"==this._panel?"M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
            @click=${this._toggleOptionsPanel}
          ></ha-icon-button>

          <span slot="title" @click=${()=>this.large=!this.large}>
            ${this._params.editItem?this.schedule.name?null===(e=this.schedule)||void 0===e?void 0:e.name:Bi("ui.panel.common.default_name",this.hass,"{id}",this._params.editItem):Bi("ui.panel.common.new_schedule",this.hass)}
          </span>

        </ha-dialog-header>

        <div class="content">

          ${"main"==this._panel?R`
          <scheduler-main-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
            .large=${this.large}
            @change=${this._updateSchedule}
          >
          </scheduler-main-panel>
            `:R`
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
          <mwc-button @click=${this._handleSaveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
          <mwc-button @click=${this._handleDeleteClick} class="warning">
            ${this.hass.localize("ui.common.delete")}
          </mwc-button>
        </div>
      </ha-dialog>
    `:R``}_updateSchedule(e){let t=e.detail.schedule;t&&(this.schedule=t)}_toggleOptionsPanel(){this._panel="main"==this._panel?"options":"main"}async _handleSaveClick(e){const t=Ua(this.schedule,this.hass,this._params.cardConfig.customize);if(t)await new Promise(i=>{const a={cancel:()=>i(!1),confirm:()=>i(!0),title:this.hass.localize("state_badge.default.error"),description:Bi("ui.panel.editor.validation_errors."+t,this.hass),primaryButtonLabel:this.hass.localize("ui.common.ok")};va(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return vs})),dialogParams:a})});else if(this.schedule.schedule_id){const t=qe(await ga(this.hass,this.schedule.schedule_id),this.hass);if(me(this.schedule,t))return void this.closeDialog();if(!t.enabled){await new Promise(t=>{const i={title:Bi("ui.dialog.enable_schedule.title",this.hass),description:Bi("ui.dialog.enable_schedule.description",this.hass),primaryButtonLabel:this.hass.localize("ui.common.yes"),secondaryButtonLabel:this.hass.localize("ui.common.no"),cancel:()=>{t(!1)},confirm:()=>{t(!0)}};va(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return vs})),dialogParams:i})})&&this.hass.callService("switch","turn_on",{entity_id:t.entity_id})}((e,t)=>{const i=Ba(t);return e.callApi("POST","scheduler/edit",i)})(this.hass,this.schedule).catch(e=>Ja(e,this,this.hass)).then(()=>{this.closeDialog()})}else((e,t)=>{const i=Ba(t);return e.callApi("POST","scheduler/add",i)})(this.hass,this.schedule).catch(e=>Ja(e,this,this.hass)).then(()=>{this.closeDialog()})}async _handleDeleteClick(e){await new Promise(t=>{const i={cancel:()=>t(!1),confirm:()=>t(!0),title:Bi("ui.dialog.confirm_delete.title",this.hass),description:Bi("ui.dialog.confirm_delete.description",this.hass),primaryButtonLabel:this.hass.localize("ui.common.ok"),secondaryButtonLabel:this.hass.localize("ui.common.cancel")};va(e.target,"show-dialog",{dialogTag:"scheduler-generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return vs})),dialogParams:i})}).then(e=>{var t,i;e&&(t=this.hass,i=this._params.editItem,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>Ja(e,this,this.hass)).then(()=>{this.closeDialog()})})}};ys.styles=Ha,t([de({attribute:!1})],ys.prototype,"hass",void 0),t([ce()],ys.prototype,"_params",void 0),t([de({type:Boolean,reflect:!0})],ys.prototype,"large",void 0),t([ce()],ys.prototype,"schedule",void 0),t([ce()],ys.prototype,"selectedEntry",void 0),t([ce()],ys.prototype,"selectedSlot",void 0),t([ce()],ys.prototype,"_panel",void 0),ys=t([re("dialog-scheduler-editor")],ys);var fs=Object.freeze({__proto__:null,get DialogSchedulerEditor(){return ys}}),bs=window&&window.__assign||function(){return(bs=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var s in t=arguments[i])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)};var ks={second:45,minute:45,hour:22,day:5};const ws=(e,t,i)=>{if(i===Ee.am_pm||!i&&t.time_format===Ee.am_pm){const t=Me(e.getHours()).am_pm;return`${Me(e.getHours()).hours}:${String(e.getMinutes()).padStart(2,"0")} ${t}`}return i===Ee.twenty_four||!i&&t.time_format===Ee.twenty_four?`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`:(()=>{try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1})()?e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit",hour12:Te(t)}):Te(t)?ws(e,t,Ee.am_pm):ws(e,t,Ee.twenty_four)};let xs=class extends oe{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const a=i>=0?"past":"future";i=Math.abs(i);const s=Math.round(i);if("future"==a&&s>0){if(i/3600>=6){const i=t.setHours(0,0,0,0),a=Math.floor((e.valueOf()-i.valueOf())/864e5);let s="";a>14?s=function(e,t){const i=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1},a=(e,t)=>{switch(t){case"year":return e.getFullYear();case"month":return ds[e.getMonth()];case"day":return e.getDate()}};return e.getFullYear()==(new Date).getFullYear()?i()?new Intl.DateTimeFormat(t.language,{month:"long",day:"numeric"}).format(e):`${a(e,"month")} ${a(e,"day")}`:i()?new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}).format(e):`${a(e,"month")} ${a(e,"day")}, ${a(e,"year")}`}(e,this._hass.locale):a>7?s=Bi("ui.components.date.next_week_day",this._hass,"{weekday}",ha(e,"long",this._hass)):1==a?s=Bi("ui.components.date.tomorrow",this._hass):a>0&&(s=ha(e,"long",this._hass));let o=Bi("ui.components.time.absolute",this._hass,"{time}",ws(e,this._hass.locale));return 12==e.getHours()&&0==e.getMinutes()?o=Bi("ui.components.time.at_noon",this._hass):0==e.getHours()&&0==e.getMinutes()&&(o=Bi("ui.components.time.at_midnight",this._hass)),String(s+" "+o).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"hour")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"minute",unitDisplay:"long"}).format(e)}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(1,"minute")} ${t} ${Intl.NumberFormat(this._hass.locale.language,{style:"unit",unit:"second",unitDisplay:"long"}).format(e)}`}}const o=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var a=bs(bs({},ks),i||{}),s=(+e-+t)/1e3;if(Math.abs(s)<a.second)return{value:Math.round(s),unit:"second"};var o=s/60;if(Math.abs(o)<a.minute)return{value:Math.round(o),unit:"minute"};var n=s/3600;if(Math.abs(n)<a.hour)return{value:Math.round(n),unit:"hour"};var r=s/86400;if(Math.abs(r)<a.day)return{value:Math.round(r),unit:"day"};var l=new Date(e),d=new Date(t),c=l.getFullYear()-d.getFullYear();if(Math.round(Math.abs(c))>0)return{value:Math.round(c),unit:"year"};var u=12*c+l.getMonth()-d.getMonth();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"month"};var m=s/604800;return{value:Math.round(m),unit:"week"}}(e);return new Intl.RelativeTimeFormat(this._hass.language,{numeric:"auto"}).format(o.value,o.unit)}render(){if(!this._hass||!this.datetime)return R``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),R`
      ${Qi(this.relativeTime(this.datetime))}
    `}};t([de()],xs.prototype,"_hass",void 0),t([de()],xs.prototype,"datetime",void 0),xs=t([re("scheduler-relative-time")],xs);let $s=class extends oe{render(){const e=this.hass.states[this.schedule.entity_id];if(!e)return R``;const t="off"==e.state,i=this.schedule.entries[0].slots[this.schedule.next_entries[0]||0].actions[0];return R`
      <ha-icon
        icon="${Xa(i,this.config.customize)}"
      >
      </ha-icon>

      <div
        class="info ${t?"disabled":""}"
        @click=${this._handleItemClick}
      >
        ${pa(this.schedule,this.config.display_options.primary_info,this.hass,this.config.customize)}
        <div class="secondary">
        ${pa(this.schedule,this.config.display_options.secondary_info,this.hass,this.config.customize)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${e}
        ></ha-entity-toggle>
      </div>

    `}_handleItemClick(e){const t=new CustomEvent("editClick",{detail:{schedule_id:this.schedule_id}});this.dispatchEvent(t)}static get styles(){return r`
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
      state-badge {
        flex: 0 0 40px;
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
      .disabled {
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
    `}};t([de()],$s.prototype,"hass",void 0),t([de()],$s.prototype,"schedule_id",void 0),t([de()],$s.prototype,"schedule",void 0),t([de()],$s.prototype,"config",void 0),$s=t([re("schedule-item-row")],$s),e.SchedulerCard=class extends(je(oe)){constructor(){super(...arguments),this._config=Ie,this.showDiscovered=!1,this.translationsLoaded=!1}setConfig(e){e=(e=>{let t=[];if(He(e,"include")&&!Be(e.include)&&t.push("'include' must be a list of strings"),He(e,"exclude")&&!Be(e.exclude)&&t.push("'exclude' must be a list of strings"),He(e,"discover_existing")&&!Fe(e.discover_existing)&&t.push("'discover_existing' must be a boolean"),!He(e,"title")||Fe(e.title)||Ve(e.title)||t.push("'title' must be a boolean or string"),He(e,"show_header_toggle")&&!Fe(e.show_header_toggle)&&t.push("'show_header_toggle' must be a boolean"),He(e,"show_add_button")&&!Fe(e.show_add_button)&&t.push("'show_add_button' must be a boolean"),He(e,"display_options")&&(Ue(e.display_options)?(!He(e.display_options,"primary_info")||Ve(e.display_options.primary_info)||Be(e.display_options.primary_info)||t.push("in 'display_options': 'primary_info' must be a string or list of strings"),!He(e.display_options,"secondary_info")||Ve(e.display_options.secondary_info)||Be(e.display_options.secondary_info)||t.push("in 'display_options': 'secondary_info' must be a string or list of strings"),He(e.display_options,"icon")&&!Ve(e.display_options.icon)&&t.push("in 'display_options': 'icon' must be a string ")):t.push("'display_options' must be a struct")),!He(e,"sort_by")||Ve(e.sort_by)||Be(e.sort_by)||t.push("'sort_by' must be a string or list of strings"),He(e,"customize")&&!Ue(e.customize)&&t.push("'customize' must be a struct"),!He(e,"tags")||Ve(e.tags)||Be(e.tags)||t.push("'tags' must be a string or list of strings"),!He(e,"exclude_tags")||Ve(e.tags)||Be(e.tags)||t.push("'exclude_tags' must be a string or list of strings"),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`);return e})(e),this._config=Object.assign(Object.assign({},Ie),e)}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider")&&customElements.get("ha-combo-box"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})();document.querySelector("home-assistant")._loadFragmentTranslations(this.hass.language,"config")}willUpdate(){this.hass.loadBackendTranslation("services")}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeMessage(e=>this.handleScheduleItemUpdated(e),{type:"scheduler_updated"})]}shouldUpdate(e){const t=e.get("hass"),i=e.get("_config");if(i&&this._config){Object.keys(i).filter(e=>i[e]!==this._config[e]).some(e=>["tags","discover_existing","sort_by","display_options"].includes(e))&&(async()=>{await this.loadSchedules()})()}return!this.translationsLoaded&&this.hass.localize("component.input_boolean.services.turn_on.name").length&&this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").length?(this.translationsLoaded=!0,!0):!t||1!=e.size||!this.schedules||Object.values(this.schedules).some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this.hass.states[e.entity_id]))}render(){let e=Object.assign({},this.schedules),t=Object.keys(this.schedules||{}).filter(t=>Gi(e[t],this._config));const i=Object.entries(e).filter(([e])=>!!this.showDiscovered||t.includes(e)).some(([,e])=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")});return R`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title?"string"==typeof this._config.title?this._config.title:Bi("ui.panel.common.title",this.hass):""}
          </div>

          ${Object.keys(this.schedules||{}).length&&this._config.show_header_toggle?R`
          <ha-switch
            ?checked=${i}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
          `:""}
        </div>

        <div class="card-content" id="states">
          ${t.map(e=>R`
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${e}
                  .schedule=${this.schedules[e]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `)}

      ${Object.keys(e).length>t.length?this.showDiscovered?R`

          ${Object.keys(e).filter(e=>!t.includes(e)).map(e=>R`
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${e}
                  .schedule=${this.schedules[e]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `)}

              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${Bi("ui.panel.overview.hide_excluded",this.hass)}
                </button>
              </div>
            `:R`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Bi("ui.panel.overview.excluded_items",this.hass,"{number}",Object.keys(e).length-t.length)}
                </button>
              </div>
            `:""}
        </div>

        <div class="card-actions">
          <mwc-button @click=${this._addClick}
            >${this.hass.localize("ui.common.add")}
          </mwc-button>

          <span class="beta">
            ${"v4.0.0.b2"}
          </span>
        </div>
      </ha-card>
    `}async loadSchedules(){var e;(e=this.hass,e.callWS({type:"scheduler"}).then(e=>Object.fromEntries(e.map(e=>[e.schedule_id,xe(e)])))).then(e=>{this.schedules=_a(e,this._config,this.hass),Object.values(e).every(e=>Gi(e,this._config))}).catch(e=>{this.schedules={}})}async handleScheduleItemUpdated(e){"scheduler_item_removed"!=e.event?ga(this.hass,e.schedule_id).then(t=>{const i=this.schedules[e.schedule_id];let a=Object.assign({},this.schedules);t&&(this._config.discover_existing||Gi(t,this._config))?a=i?i.timestamps[i.next_entries[0]||0]==t.timestamps[t.next_entries[0]||0]?Object.assign(Object.assign({},a),{[e.schedule_id]:t}):_a(Object.assign(Object.assign({},a),{[e.schedule_id]:t}),this._config,this.hass):_a(Object.assign(Object.assign({},a),{[e.schedule_id]:t}),this._config,this.hass):i&&(a=Object.fromEntries(Object.entries(a).filter(([t])=>t!=e.schedule_id))),this.schedules=Object.assign({},a)}):this.schedules=Object.fromEntries(Object.entries(this.schedules||{}).filter(([t])=>t!==e.schedule_id))}_handleEditClick(e){if(!this.schedules)return;const t=e.detail.schedule_id,i={schedule:qe(this.schedules[t],this.hass),cardConfig:this._config,editItem:t};va(e.target,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return fs})),dialogParams:i})}_addClick(e){const t=[this._config.tags||[]].flat().filter(e=>!["none","disabled","enabled"].includes(e)),i={schedule:Object.assign(Object.assign({},Ne),{tags:1==t.length?t:[]}),cardConfig:this._config};va(this,"show-dialog",{dialogTag:"dialog-scheduler-editor",dialogImport:()=>Promise.resolve().then((function(){return fs})),dialogParams:i})}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;Object.values(this.schedules).filter(e=>this.showDiscovered||Gi(e,this._config)).forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}static getConfigElement(){return document.createElement("scheduler-card-editor")}},e.SchedulerCard.styles=r`
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
    .beta {
      flex: 1 0 auto;
      align-self: center;
      justify-content: flex-end;
      font-style: italic;
      color: var(--error-color);
    }
  `,t([de({attribute:!1})],e.SchedulerCard.prototype,"hass",void 0),t([de()],e.SchedulerCard.prototype,"_config",void 0),t([ce()],e.SchedulerCard.prototype,"schedules",void 0),t([ce()],e.SchedulerCard.prototype,"showDiscovered",void 0),e.SchedulerCard=t([re("scheduler-card")],e.SchedulerCard),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v4.0.0.b2".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray")}({});
