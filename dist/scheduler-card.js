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
     */;var c;const u=window,m=u.trustedTypes,h=m?m.emptyScript:"",p=u.reactiveElementPolyfillSupport,_={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v},f="finalized";class y extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Ep(i,t);void 0!==a&&(this._$Ev.set(a,i),e.push(a))}),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const s=this[e];this[t]=a,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var a;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:_).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,s=a._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=a.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:_;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||v)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var b;y[f]=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:y}),(null!==(c=u.reactiveElementVersions)&&void 0!==c?c:u.reactiveElementVersions=[]).push("1.6.3");const k=window,w=k.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,z=`<${j}>`,O=document,S=()=>O.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,C="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,D=/>/g,N=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),U=new WeakMap,H=O.createTreeWalker(O,129,null,!1);function B(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,a=[];let s,o=2===t?"<svg>":"",n=M;for(let t=0;t<i;t++){const i=e[t];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===M?"!--"===l[1]?n=T:void 0!==l[1]?n=D:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=null!=s?s:M,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?N:'"'===l[3]?L:P):n===L||n===P?n=N:n===T||n===D?n=M:(n=N,s=void 0);const u=n===N&&e[t+1].startsWith("/>")?" ":"";o+=n===M?i+z:d>=0?(a.push(r),i.slice(0,d)+"$lit$"+i.slice(d)+$+u):i+$+(-2===d?(a.push(void 0),t):u)}return[B(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),a]};class Z{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,o=0;const n=e.length-1,r=this.parts,[l,d]=F(e,t);if(this.el=Z.createElement(l,i),H.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=H.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith($)){const i=d[o++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?J:"?"===t[1]?Q:"@"===t[1]?ee:K})}else r.push({type:6,index:s})}for(const t of e)a.removeAttribute(t)}if(I.test(a.tagName)){const e=a.textContent.split($),t=e.length-1;if(t>0){a.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],S()),H.nextNode(),r.push({type:2,index:++s});a.append(e[t],S())}}}else if(8===a.nodeType)if(a.data===j)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf($,e+1));)r.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,a){var s,o,n,r;if(t===V)return t;let l=void 0!==a?null===(s=i._$Co)||void 0===s?void 0:s[a]:i._$Cl;const d=E(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(t=Y(e,l._$AS(e,t.values),l,a)),t}class W{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:O).importNode(i,!0);H.currentNode=s;let o=H.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new G(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new te(o,this,e)),this._$AV.push(t),l=a[++r]}n!==(null==l?void 0:l.index)&&(o=H.nextNode(),n++)}return H.currentNode=O,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,a){var s;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(s=null==a?void 0:a.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),E(e)?e===R||null==e||""===e?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==R&&E(this._$AH)?this._$AA.nextSibling.data=e:this.$(O.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,s="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=Z.createElement(B(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new W(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=U.get(e.strings);return void 0===t&&U.set(e.strings,t=new Z(e)),t}T(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new G(this.k(S()),this.k(S()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class K{constructor(e,t,i,a,s){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const s=this.strings;let o=!1;if(void 0===s)e=Y(this,e,t,0),o=!E(e)||e!==this._$AH&&e!==V,o&&(this._$AH=e);else{const a=e;let n,r;for(e=s[0],n=0;n<s.length-1;n++)r=Y(this,a[i+n],t,n),r===V&&(r=this._$AH[n]),o||(o=!E(r)||r!==this._$AH[n]),r===R?e=R:e!==R&&(e+=(null!=r?r:"")+s[n+1]),this._$AH[n]=r}o&&!a&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class J extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}}const X=w?w.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(e){e&&e!==R?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class ee extends K{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Y(this,e,t,0))&&void 0!==i?i:R)===V)return;const a=this._$AH,s=e===R&&a!==R||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==R&&(a===R||s);s&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class te{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const ie=k.litHtmlPolyfillSupport;null==ie||ie(Z,G),(null!==(b=k.litHtmlVersions)&&void 0!==b?b:k.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ae,se;class oe extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var a,s;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new G(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return V}}oe.finalized=!0,oe._$litElement$=!0,null===(ae=globalThis.litElementHydrateSupport)||void 0===ae||ae.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const re=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:a}=t;return{kind:i,elements:a,finisher(t){customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,le=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function de(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):le(e,t)
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
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var me;null===(me=window.HTMLSlotElement)||void 0===me||me.prototype.assignedElements;var he=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,pe="[^\\s]+",_e=/\[([^]*?)\]/gm;function ve(e,t){for(var i=[],a=0,s=e.length;a<s;a++)i.push(e[a].substr(0,t));return i}var ge=function(e){return function(t,i){var a=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return a>-1?a:null}};function fe(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var a=0,s=t;a<s.length;a++){var o=s[a];for(var n in o)e[n]=o[n]}return e}var ye=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],be=["January","February","March","April","May","June","July","August","September","October","November","December"],ke=ve(be,3),we={dayNamesShort:ve(ye,3),dayNames:ye,monthNamesShort:ke,monthNames:be,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},xe=fe({},we),$e=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},je={D:function(e){return String(e.getDate())},DD:function(e){return $e(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return $e(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return $e(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return $e(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return $e(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return $e(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return $e(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return $e(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return $e(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return $e(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return $e(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+$e(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+$e(Math.floor(Math.abs(t)/60),2)+":"+$e(Math.abs(t)%60,2)}},ze=function(e){return+e-1},Oe=[null,"\\d\\d?"],Se=[null,pe],Ee=["isPm",pe,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],Ae=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],Ce=(ge("monthNamesShort"),ge("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"}),Me=function(e,t,i){if(void 0===t&&(t=Ce.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var a=[];t=(t=Ce[t]||t).replace(_e,(function(e,t){return a.push(t),"@@@"}));var s=fe(fe({},xe),i);return(t=t.replace(he,(function(t){return je[t](e,s)}))).replace(/@@@/g,(function(){return a.shift()}))};var Te,De,Ne=Me;(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function Pe(e){return e.substr(0,e.indexOf("."))}function Le(e){return e.substr(e.indexOf(".")+1)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Te||(Te={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(De||(De={}));var Ie=function(e,t,i,a){a=a||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,e.dispatchEvent(s),s},qe={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ve(e,t){if(e in qe)return qe[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"hass:bookmark"}}var Re={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Ue={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ve("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Re)return Re[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"hass:battery-unknown";var a=10*Math.round(i/10);return a>=100?"hass:battery":a<=0?"hass:battery-alert":"hass:battery-"+a}var s=e.attributes.unit_of_measurement;return"°C"===s||"°F"===s?"hass:thermometer":Ve("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ve("input_datetime"):"hass:calendar":"hass:clock"}},He=function(e){if(!e)return"hass:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=Pe(e.entity_id);return t in Ue?Ue[t](e):Ve(t,e.state)};var Be;!function(e){e.Entity="entity",e.Time="time",e.Options="options"}(Be||(Be={}));const Fe={type:"scheduler-card",discover_existing:!0,standard_configuration:!0,include:[],exclude:[],groups:[],customize:{},title:!0,time_step:10,show_header_toggle:!1,display_options:{primary_info:"default",secondary_info:["relative-time","additional-tasks"],icon:"action"},tags:[],sort_by:["relative-time","state"]};function Ze(e,t){if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number);return 3600*t[0]+60*t[1]+(t[2]||0)}const i=Ge(e);if(i){const e=t.states["sun.sun"],a=Ze(e.attributes.next_rising,t),s=Ze(e.attributes.next_setting,t);let o="sunrise"==i.event?a:s;return o="+"==i.sign?o+Ze(i.offset,t):o-Ze(i.offset,t),o}const a=new Date(e);return 3600*a.getHours()+60*a.getMinutes()+a.getSeconds()}function Ye(e){const t=Math.floor(e/3600);e-=3600*t;const i=Math.floor(e/60);e-=60*i;const a=Math.round(e);return String(t%24).padStart(2,"0")+":"+String(i).padStart(2,"0")+":"+String(a).padStart(2,"0")}function We(e,t,i={wrapAround:!0}){let a=e>=0?Math.floor(e/3600):Math.ceil(e/3600),s=Math.floor((e-3600*a)/60);s%t!=0&&(s=Math.round(s/t)*t),s>=60?(a++,s-=60):s<0&&(a--,s+=60),i.wrapAround&&(a>=24?a-=24:a<0&&(a+=24));const o=3600*a+60*s;if(i.maxHours){if(o>3600*i.maxHours)return 3600*i.maxHours;if(o<3600*-i.maxHours)return 3600*-i.maxHours}return o}function Ge(e){const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);return!!t&&{event:t[1],sign:t[2],offset:t[3]}}function Ke(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}const Je=(e,...t)=>{const i={};let a;for(a in e)t.includes(a)||(i[a]=e[a]);return i};function Xe(e){return e.every(e=>!Array.isArray(e))?e.slice():e.reduce((e,t)=>e.concat(Array.isArray(t)?Xe(t):t),[])}function Qe(e){let t=[];return e.forEach(e=>{t.find(t=>"object"==typeof e?tt(t,e):t===e)||t.push(e)}),t}function et(e){return null!=e}function tt(...e){if(!e.length)return!1;const t=e[0];return e.every(e=>t&&e&&"object"==typeof t&&"object"==typeof e?Object.keys(t).length===Object.keys(e).length&&Object.keys(t).reduce((i,a)=>i&&tt(t[a],e[a]),!0):t===e)}function it(e,t){const i=e=>"object"==typeof e?void 0!==e.name?String(e.name).trim().toLowerCase():JSON.stringify(e):String(e).trim().toLowerCase();return i(e)<i(t)?-1:1}function at(e){return e.charAt(0).toUpperCase()+e.slice(1)}function st(e){return"string"!=typeof e&&(e=String(e)),at(e.replace(/_/g," "))}function ot(e){if(e)return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"mdi:"+e}function nt(e,t){(e=(e=e.map(e=>Object(Object.assign(Object.assign({},e),{start:Ze(e.start,t)<0?"00:00:00":e.start,stop:Ze(e.stop,t)>86400?"00:00:00":e.stop})))).map(e=>{const i=Ze(e.stop,t)-Ze(e.start,t);return i<0?0==Ze(e.stop,t)?Object.assign(Object.assign({},e),{stop:Ye(Ze(e.stop,t)+86400)}):Object.assign(Object.assign({},e),{start:e.stop,stop:e.start}):i<60?Object.assign(Object.assign({},e),{start:e.start,stop:Ye(Ze(e.start,t)+60)}):e})).sort((e,i)=>Ze(e.start,t)>Ze(i.start,t)?1:Ze(e.start,t)<Ze(i.start,t)?-1:Ze(e.stop,t)>Ze(i.stop,t)?1:-1);let i="00:00:00",a=e.length;for(let s=0;s<a;s++){const o=e[s];Ze(o.start,t)>Ze(i,t)?(e.splice(s,0,Object.assign(Object.assign({},o),{start:i,stop:o.start,actions:[]})),a++,s++):Ze(o.start,t)<Ze(i,t)&&(e=Object.assign(e,{[s]:Object.assign(Object.assign({},o),{start:i})})),i=o.stop}return Ze(i,t)<86400&&Ze(i,t)>0&&e.push(Object.assign(Object.assign({},e[0]),{start:i,stop:Ye(86400),actions:[]})),e}const rt=e=>e.locale||{language:e.language,number_format:Te.system};function lt(e){return Array.isArray(e)?e:null!=e?[e]:[]}function dt(e){const t=[];let i=[];const a=e=>{e&&t.push(i.length?`in ${i.join("->")}: ${e}`:e)},s=(e,t)=>e.hasOwnProperty(t),o=(e,t)=>Array.isArray(t)?t.some(t=>o(e,t)):"array"==t?Array.isArray(e):"object"==t?typeof e===t&&null!==e:typeof e===t,n=(e,t,i)=>{if(s(e,t)){o(e[t],i)||a(`'${t}' must be of type ${i}`)}else a(`missing required property '${t}'`)},r=(e,t,i)=>{if(!s(e,t))return;o(e[t],i)||a(`'${t}' must be of type ${i}`)},l=(e,t,i)=>{let n=!0;return s(e,t)&&o(e[t],"array")?e[t].some(e=>!o(e,i))&&(a(`'${t}' must be an array with items of type ${i}`),n=!1):n=!1,n};if(r(e,"discover_existing","boolean"),r(e,"standard_configuration","boolean"),r(e,"title",["boolean","string"]),r(e,"time_step","number"),r(e,"show_header_toggle","boolean"),r(e,"show_add_button","boolean"),r(e,"sort_by",["string","array"]),r(e,"include","array"),l(e,"include","string"),r(e,"exclude","array"),l(e,"exclude","string"),r(e,"display_options","object"),s(e,"display_options")&&(i.push("display_options"),r(e.display_options,"primary_info",["string","array"]),r(e.display_options,"secondary_info",["string","array"]),r(e.display_options,"icon","string"),l(e.display_options,"primary_info","string"),l(e.display_options,"secondary_info","string")),i=[],r(e,"groups","array"),s(e,"groups")&&o(e.groups,"array")&&(i.push("groups"),e.groups.forEach((e,t)=>{i=["groups",t],n(e,"name","string"),r(e,"icon","string"),n(e,"include","array"),r(e,"exclude","array"),l(e,"include","string"),l(e,"exclude","string")})),i=[],r(e,"customize","object"),s(e,"customize")&&o(e.customize,"object")&&Object.keys(e.customize).forEach(t=>{if(i=["customize"],o(t,"string")||a(t+" is not allowed"),n(e.customize,t,"object"),s(e.customize,t)&&o(e.customize[t],"object")){i.push(t);const d=e.customize[t];r(d,"name","string"),r(d,"icon","string"),r(d,"actions","array"),l(d,"actions","object")&&d.actions.forEach((e,d)=>{i=["customize",t,d],(e=>{const t=i;r(e,"name","string"),r(e,"icon","string"),n(e,"service","string"),r(e,"service_data","object"),l(e,"service_data","string"),s(e,"service_data")&&o(e.service_data,"object")&&Object.keys(e.service_data).some(e=>!o(e,"string"))&&a("service_data items must have string as index type"),r(e,"variables","object"),s(e,"variables")&&o(e.variables,"object")&&Object.keys(e.variables).forEach(d=>{if(i=t.concat(t,["variables"]),o(d,"string")||a(d+" is not allowed"),n(e.variables,d,"object"),s(e.variables,d)&&o(e.variables[d],"object")){i.push(d);const a=e.variables[d];l(a,"options","object")?a.options.forEach((e,a)=>{i=t.concat(t,["variables",d,"options",a]),n(e,"value","string"),r(e,"name","string"),r(e,"icon","string")}):void 0!==a.min||void 0!==a.max?(r(a,"min","number"),r(a,"max","number"),r(a,"step","number"),r(a,"scale_factor","number"),r(a,"optional","boolean"),r(a,"unit","string")):r(a,"multiline","boolean")}})})(e)}),r(d,"states",["object","array"]),s(d,"states")&&o(d.states,"array")?l(d,"states","string"):s(d,"states")&&o(d.states,"object")&&(n(d.states,"min","number"),n(d.states,"max","number"),r(d.states,"step","number"),r(d.states,"scale_factor","number"),r(d.states,"unit","string"))}}),r(e,"tags",["string","array"]),r(e,"exclude_tags",["string","array"]),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`)}const ct={alarm_control_panel:"mdi:alarm-light-outline",automation:"mdi:playlist-play",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",calendar:"mdi:calendar",camera:"mdi:camera",climate:"mdi:home-thermometer-outline",cover:"mdi:window-shutter",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",humidifier:"mdi:air-humidifier",input_boolean:"mdi:drawing",input_button:"mdi:gesture-tap-button",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",select:"mdi:format-list-bulleted",input_text:"mdi:textbox",lawn_mower:"mdi:robot-mower",light:"mdi:lightbulb-outline",lock:"mdi:lock-open-outline",media_player:"mdi:cast-connected",number:"mdi:ray-vertex",notify:"mdi:message-text-outline",person:"mdi:account-outline",proximity:"mdi:map-marker-distance",remote:"mdi:remote",scene:"mdi:palette-outline",script:"mdi:file-document",sensor:"mdi:eye",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-boiler"},ut=(e,t)=>{const i=Pe(e),a=t.states[e];switch(i){case"binary_sensor":return(e=>e&&He(Object.assign(Object.assign({},e),{state:"off"}))||"mdi:radiobox-blank")(a);case"cover":return((e,t)=>{const i="closed"==t;switch(e.attributes.device_class){case"garage":return i?"mdi:garage":"mdi:garage-open";case"door":return i?"mdi:door-closed":"mdi:door-open";case"blind":return i?"mdi:blinds":"mdi:blinds-open";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:window-shutter":"mdi:window-shutter-open"}})(a);case"sensor":return(e=>{var t;switch(e.attributes.device_class||""){case"humidity":return"mdi:water-percent";case"illuminance":return"mdi:brightness-5";case"temperature":return"mdi:thermometer";case"power":return"mdi:flash";case"pressure":return"mdi:gauge";case"signal_strength":return"mdi:wifi";default:return(null===(t=e.attributes.unit_of_measurement)||void 0===t?void 0:t.includes("°"))?"mdi:thermometer":"mdi:eye"}})(a);default:return i in ct?ct[i]:"mdi:folder-outline"}};function mt(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=!e.includes(".")&&t.includes(".")?e==Pe(t):e==t;else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}function ht(e,t,i){const a=e in t.states?t.states[e]:void 0;let s={id:e,name:a?a.attributes.friendly_name||Le(e):"(unknown entity)",icon:a?a.attributes.icon:"help-circle-outline"};if(!a&&"notify"==Pe(e)){let i=Le(e),a=ut(e,t);if(i.includes("mobile_app_")&&(i=i.split("mobile_app_").pop(),"device_tracker."+i in t.states)){i=t.states["device_tracker."+i].attributes.friendly_name||i,a="hass:cellphone-text"}s=Object.assign(Object.assign({},s),{name:i,icon:a})}if(void 0!==i.standard_configuration&&!i.standard_configuration||s.icon?s.icon||(s=Object.assign(Object.assign({},s),{icon:"folder-outline"})):s=Object.assign(Object.assign({},s),{icon:ut(e,t)}),i.customize){Object.entries(i.customize).filter(([e])=>mt(e,s.id)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e).forEach(e=>{s=Object.assign(Object.assign({},s),Ke(e,["name","icon"]))})}return s}const pt={},_t=e=>{let t=e;for(;t&&t.parentNode&&t.parentNode!==document;){if(t=t.parentNode instanceof DocumentFragment?t.parentNode.host:t.parentNode,"BODY"==t.tagName.toUpperCase())return!1;if("BROWSER-MOD-POPUP"==t.tagName.toUpperCase())return!0}return!1},vt=e=>{let t=e;for(;t&&t.parentNode&&t.parentNode!==document&&(t=t.parentNode instanceof DocumentFragment?t.parentNode.host:t.parentNode,"BODY"!=t.tagName.toUpperCase()););return t},gt=async(e,t,i)=>{const a=i||void 0===i&&_t(e)?vt(e):null;if(null===a)Ie(e,"show-dialog",t);else{if(!(t.dialogTag in pt)){if(!t.dialogImport)return;pt[t.dialogTag]={element:t.dialogImport().then(()=>{const i=document.createElement(t.dialogTag);return e.provideHass(i),i})}}const i=await pt[t.dialogTag].element;a.appendChild(i),i.showDialog(t.dialogParams)}},ft=e=>e.callWS({type:"scheduler"}),yt=(e,t)=>e.callWS({type:"scheduler/item",schedule_id:t}),bt=(e,t)=>e.callApi("POST","scheduler/remove",{schedule_id:t}),kt=e=>e.callWS({type:"scheduler/tags"});function wt(e,t,i,a){!function(e,t,i,a){const s={title:i.localize("state_badge.default.error"),description:t,primaryButtonLabel:i.localize("ui.common.ok"),confirm:()=>{},cancel:()=>{}};gt(e,{dialogTag:"generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:s},a)}(t,q`
    <b>Something went wrong!</b><br />
    ${e.body.message}<br /><br />
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,i,a)}var xt,$t,jt,zt,Ot,St,Et;!function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(xt||(xt={})),function(e){e.Level="LEVEL",e.List="LIST",e.Text="TEXT"}($t||($t={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(jt||(jt={})),function(e){e.Any="or",e.All="and"}(zt||(zt={})),function(e){e.Sunrise="sunrise",e.Sunset="sunset"}(Ot||(Ot={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(St||(St={})),function(e){e.ItemCreated="scheduler_item_created",e.ItemUpdated="scheduler_item_updated",e.ItemRemoved="scheduler_item_removed",e.TimerFinished="scheduler_timer_finished",e.TimerUpdated="scheduler_timer_updated"}(Et||(Et={}));const At=(e,t,i)=>{if("number"==typeof t)return t;if(!et(e)||!et(e.attributes[t]))return i;const a=e.attributes[t];return"number"==typeof a?a:i},Ct=(e,t,i=[])=>{if(!et(e)||!et(e.attributes[t]))return i;const a=e.attributes[t];return Array.isArray(a)?a.map(e=>String(e)):i},Mt=(e,t,i="")=>{if(!et(e)||!et(e.attributes[t]))return i;const a=e.attributes[t];return"string"==typeof a?a:i},Tt=(e,t,i)=>{const a="template"in e&&et(e.template)?Object.assign(Object.assign({},Je(e,"template")),e.template(t,i)):Object.assign({},e);return"options"in a?Dt(a,t):"min"in a&&"max"in a?Nt(a,t):a},Dt=(e,t)=>{if("string"==typeof e.options){return{options:Ct(t,e.options).map(e=>Object({value:e}))}}return Array.isArray(e.options)?{options:e.options.map(e=>Object({value:e}))}:{options:Object.entries(e.options).map(([e,t])=>Object(Object.assign({value:e},t)))}},Nt=(e,t)=>{let i=Ke(e,["unit","optional","scale_factor"]);return et(e.min)&&(i=Object.assign(Object.assign({},i),{min:At(t,e.min)})),et(e.max)&&(i=Object.assign(Object.assign({},i),{max:At(t,e.max)})),et(e.step)&&(i=Object.assign(Object.assign({},i),{step:At(t,e.step)})),et(e.unit)&&"unit_of_measurement"==e.unit&&(i=Object.assign(Object.assign({},i),{unit:Mt(t,e.unit,"")})),i};function Pt(...e){const t=e.map(e=>e.min).filter(et),i=e.map(e=>e.max).filter(et),a=e.map(e=>e.step).filter(et),s=Qe(e.map(e=>e.scale_factor).filter(et)),o=e.map(e=>e.optional).filter(et),n=e.map(e=>e.unit).filter(et),r=e.map(e=>e.name).filter(et),l=a.length?Math.max(...a):1,d=e=>(e=Math.round(e/l)*l,parseFloat(e.toPrecision(12)));return{type:$t.Level,min:d(t.length?Math.min(...t):0),max:d(i.length?Math.max(...i):255),step:l,scale_factor:1==s.length?s[0]:1,optional:o.length&&o.every(e=>e)||!1,unit:n.length?n.reduce((e,t)=>t):"",name:r.length?r.reduce((e,t)=>t):void 0}}function Lt(e,t){let i=Number(e);return isNaN(i)?"":(1!=t.scale_factor&&(i/=t.scale_factor,i=Math.round(i/t.step)*t.step,i=parseFloat(i.toPrecision(12)),i>t.max?i=t.max:i<t.min&&(i=t.min)),`${i}${t.unit}`)}const It=e=>{if(!e)return 0;switch(Pe(e.entity_id)){case"light":return(e=>{if(!e||!Array.isArray(e))return 0;let t=e.map(e=>{switch(e){case"brightness":case"color_temp":case"hs":case"xy":case"rgb":case"rgbw":case"rgbww":return 1;case"unknown":case"onoff":case"white":default:return 0}});return t=Qe(t),t.reduce((e,t)=>e|t,0)})(e.attributes.supported_color_modes);default:return e.attributes.supported_features||0}};var qt=window&&window.__assign||function(){return(qt=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var s in t=arguments[i])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)};var Vt={second:45,minute:45,hour:22,day:5};function Rt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}["angle-degree","area-acre","area-hectare","concentr-percent","digital-bit","digital-byte","digital-gigabit","digital-gigabyte","digital-kilobit","digital-kilobyte","digital-megabit","digital-megabyte","digital-petabyte","digital-terabit","digital-terabyte","duration-day","duration-hour","duration-millisecond","duration-minute","duration-month","duration-second","duration-week","duration-year","length-centimeter","length-foot","length-inch","length-kilometer","length-meter","length-mile-scandinavian","length-mile","length-millimeter","length-yard","mass-gram","mass-kilogram","mass-ounce","mass-pound","mass-stone","temperature-celsius","temperature-fahrenheit","volume-fluid-ounce","volume-gallon","volume-liter","volume-milliliter"].map((function(e){return e.replace(/^(.*?)-/,"")}));const Ut=(e,t)=>{const i=t.config.unit_system.temperature,a=i.includes("F");return Pt({min:At(e,"min_temp",a?45:7),max:At(e,"max_temp",a?95:35),step:At(e,"target_temp_step",a?1:.1),unit:i})},Ht=(e,t)=>et(e)&&Rt(e,"attributes")&&Rt(e.attributes,t),Bt={alarm_control_panel:{alarm_disarm:{},alarm_arm_home:{supported_feature:1},alarm_arm_away:{supported_feature:2},alarm_arm_night:{supported_feature:4},alarm_arm_custom_bypass:{supported_feature:16},alarm_arm_vacation:{supported_feature:32}},automation:{turn_on:{},turn_off:{},trigger:{}},button:{press:{}},climate:{turn_off:{condition:e=>!Ct(e,"hvac_modes").includes("off")},_turn_off:{service:"set_hvac_mode",service_data:{hvac_mode:"off"},condition:e=>Ct(e,"hvac_modes").includes("off")},set_temperature:{variables:{temperature:{}},supported_feature:1,condition:e=>!["heat","cool","heat_cool","auto"].some(t=>Ct(e,"hvac_modes").includes(t))},heat:{service:"set_temperature",service_data:{hvac_mode:"heat"},variables:{temperature:{template:Ut}},condition:e=>Ct(e,"hvac_modes").includes("heat")},cool:{service:"set_temperature",service_data:{hvac_mode:"cool"},variables:{temperature:{template:Ut}},condition:e=>Ct(e,"hvac_modes").includes("cool")},heat_cool:{service:"set_temperature",service_data:{hvac_mode:"heat_cool"},variables:{temperature:{template:Ut}},condition:e=>Ct(e,"hvac_modes").includes("heat_cool")&&Ht(e,"temperature")&&!Ht(e,"target_temp_low")&&!Ht(e,"target_temp_high")},heat_cool_range:{service:"set_temperature",service_data:{hvac_mode:"heat_cool"},variables:{target_temp_low:{template:Ut},target_temp_high:{template:Ut}},condition:e=>Ct(e,"hvac_modes").includes("heat_cool")&&Ht(e,"target_temp_low")&&Ht(e,"target_temp_high")},auto:{service:"set_temperature",service_data:{hvac_mode:"auto"},variables:{temperature:{template:(e,t)=>Pt(Object.assign(Object.assign({},Ut(e,t)),{optional:!0}))}},condition:e=>Ct(e,"hvac_modes").includes("auto")},set_mode:{service:"set_hvac_mode",variables:{hvac_mode:{template:e=>{At(e,"supported_features");let t=Ct(e,"hvac_modes");return t=t.filter(e=>!["heat","cool","heat_cool","auto","off"].includes(e)),{options:t}}}}},set_preset:{service:"set_preset_mode",variables:{preset_mode:{options:"preset_modes"}},supported_feature:16},set_fan_mode:{service:"set_fan_mode",variables:{fan_mode:{options:"fan_modes"}}}},cover:{close:{service:"close_cover",supported_feature:2},open:{service:"open_cover",supported_feature:1},set_position:{service:"set_cover_position",variables:{position:{min:0,max:100,step:1,unit:"%"}},supported_feature:4},set_tilt_position:{service:"set_cover_tilt_position",variables:{tilt_position:{min:0,max:100,step:1,unit:"%"}},supported_feature:128}},fan:{turn_on:{},turn_off:{},set_percentage:{service:"set_percentage",variables:{percentage:{min:0,max:100,step:1,unit:"%"}},supported_feature:1},set_oscillation:{service:"oscillate",variables:{oscillating:{options:["True","False"]}},supported_feature:2},set_direction:{variables:{direction:{options:["forward","reverse"]}},supported_feature:4},set_preset:{service:"set_preset_mode",variables:{preset_mode:{options:"preset_modes"}},supported_feature:8}},humidifier:{turn_on:{},turn_off:{},set_humidity:{variables:{humidity:{min:"min_humidity",max:"max_humidity",step:1,unit:"%"}}},set_mode:{variables:{mode:{options:"available_modes"}},supported_feature:1}},input_boolean:{turn_on:{},turn_off:{}},input_button:{press:{}},input_number:{set_value:{variables:{value:{min:"min",max:"max",step:"step",unit:"unit_of_measurement"}}}},input_select:{select_option:{variables:{option:{options:"options"}}}},lawn_mower:{start_mowing:{supported_feature:1},pause:{supported_feature:2},dock:{supported_feature:4}},light:{turn_on:{condition:e=>0==It(e)},_turn_on:{variables:{brightness:{min:0,max:100,step:1,unit:"%",scale_factor:2.55,optional:!0}},condition:e=>0!=It(e)},turn_off:{}},lock:{lock:{},unlock:{}},media_player:{turn_on:{supported_feature:128},turn_off:{supported_feature:256},select_source:{variables:{source:{options:"source_list"}},supported_feature:2048}},notify:{"{entity_id}":{variables:{title:{},message:{multiline:!0}}}},number:{set_value:{variables:{value:{min:"min",max:"max",step:"step"}}}},scene:{turn_on:{}},script:{turn_on:{},turn_off:{},"{entity_id}":{}},select:{select_option:{variables:{option:{options:"options"}}}},switch:{turn_on:{},turn_off:{}},vacuum:{turn_on:{supported_feature:1},start:{supported_feature:8192},play_pause:{supported_feature:4}},water_heater:{set_temperature:{variables:{temperature:{template:Ut}}},set_mode:{service:"set_operation_mode",variables:{operation_mode:{options:"operation_list"}},supported_feature:2},set_away_mode:{variables:{away_mode:{options:["on","off"]}},supported_feature:4}}};function Ft(...e){const t=e[0].options.map(e=>e.value).filter(t=>e.map(e=>e.options).every(e=>e.map(e=>e.value).includes(t))).map(t=>{const i=e.map(e=>e.options.find(e=>e.value==t)).filter(et).map(e=>e.name).filter(et),a=e.map(e=>e.options.find(e=>e.value==t)).filter(et).map(e=>e.icon).filter(et);return{value:t,name:i.length?i.reduce((e,t)=>t):void 0,icon:a.length?a.reduce((e,t)=>t):void 0}}),i=e.map(e=>e.name).filter(et);return{type:$t.List,name:i.length?i.reduce((e,t)=>t):void 0,options:t}}function Zt(e,t){const i=t.options.find(t=>t.value==e);return i?i.name||i.value:""}function Yt(...e){const t=e.map(e=>e.name).filter(et);return{type:$t.Text,name:t.length?t.reduce((e,t)=>t):void 0,multiline:e.some(e=>e.multiline)}}var Wt={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"topení/chlazení[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"topení/chlazení[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]",set_mode:"nastavit režim[ na {mode}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},notify:{notify:"send notification"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"nastavit režim[ na {operation_mode}]",set_away_mode:"vypnout režim"}},Gt={alarm_control_panel:"poplašný ovládací panel",binary_sensor:"binary sensors",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"světla",lock:"zámky",media_player:"média přehrávače",notify:"notification",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},Kt={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"příští {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončete úpravy",description:"Plán, který byl změněn, je aktuálně zakázán, měl by být povolen?"},confirm_delete:{title:"Odebrat entitu?",description:"Opravdu chcete tuto entitu odebrat?"},confirm_migrate:{title:"Aktualizovat plán",description:"Některá nastavení budou touto změnou ztracena. Chceš pokračovat?"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Nejsou žádné položky k zobrazení",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},entity_picker:{no_groups_defined:"Nejsou definovány žádné skupiny",no_group_selected:"Nejprve vyberte skupinu",no_entities_for_group:"V této skupině nejsou žádné entity",no_entity_selected:"Nejprve vyberte entitu",no_actions_for_entity:"Pro tuto entitu neexistují žádné akce",make_scheme:"vytvořit schéma",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Nejprve vyberte časový úsek",time_scheme:"Schéma",time_input_mode:"Time control mode"},conditions:{equal_to:"je",unequal_to:"není",all:"Vše",any:"žádný",no_conditions_defined:"Nejsou definovány žádné podmínky",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"chování po spuštění",period:"období"}}},Jt={services:Wt,domains:Gt,ui:Kt},Xt=Object.freeze({__proto__:null,services:Wt,domains:Gt,ui:Kt,default:Jt}),Qt={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool:"heizen/kühlen[ auf {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heizen/kühlen[ auf {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]",set_cover_tilt_position:"Tilt Position setzen[ auf {tilt_position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]",set_mode:"Modus setzen[ auf {mode}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},notify:{notify:"Nachricht senden"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_operation_mode:"Modus setzen[ auf {operation_mode}]",set_away_mode:"Abwesenheitsmodus setzen"}},ei={alarm_control_panel:"Alarmzentrale",binary_sensor:"binary sensors",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",notify:"notification",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},ti={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}",next_week_day:"nächsten {weekday}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"um Mittag",at_sun_event:"beim {sunEvent}"}},dialog:{enable_schedule:{title:"Modifikationen beenden",description:"Der geänderte Zeitplan ist derzeit deaktiviert, sollte er aktiviert werden?"},confirm_delete:{title:"Entität entfernen?",description:"Bist du dir sicher, dass du diese Entität löschen möchtest?"},confirm_migrate:{title:"Zeitplan ändern",description:"Einige Einstellungen gehen durch diese Änderung verloren. Möchten Sie fortfahren?"}},panel:{common:{title:"Zeitplaner",new_schedule:"Neuer Zeitplan",default_name:"Zeitplan #{id}"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",backend_error:"Es konnte keine Verbindung mit der Schedulerkomponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",excluded_items:"{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},entity_picker:{no_groups_defined:"Es gibt keine Gruppe",no_group_selected:"Wähle zuerst eine Gruppe aus",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_entity_selected:"Wähle zuerst eine Entity aus",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",make_scheme:"Erstelle Zeitplan",multiple:"mehrere"},time_picker:{no_timeslot_selected:"Wähle zuerst ein Zeitfenster aus",time_scheme:"Zeitplan",time_input_mode:"Time control mode"},conditions:{equal_to:"ist",unequal_to:"ist nicht",all:"alle",any:"eine",no_conditions_defined:"Es sind keine Bedingungen definiert",track_conditions:"Erneut prüfen wenn sich die Zustände ändern"},options:{repeat_type:"Verhalten nach Abschluß",period:"Zeitraum"},card_editor:{tabs:{entities:"Entitäten",other:"Sonstiges"},fields:{title:{heading:"Titel der Karte",options:{standard:"standard",hidden:"versteckt",custom:"benutzerdefiniert"},custom_title:"Benutzerdefinierter Titel"},discover_existing:{heading:"Alle Zeitpläne anzeigen",description:"Hiermit wird der Parameter 'Vorhandenes entdecken' festgelegt. Zuvor erstellte Zeitpläne werden automatisch zur Karte hinzugefügt. "},time_step:{heading:"Zeitschritt",description:"Auflösung (in Minuten) für die Erstellung von Zeitplänen"},sort_by:{heading:"Sortieroptionen",description:"Reihenfolge, in der die Zeitpläne auf der Karte erscheinen",options:{relative_time:"Verbleibende Zeit bis zur nächsten Aktion",title:"Angezeigter Titel des Zeitplans",state:"Aktive Zeitpläne oben anzeigen"}},display_format_primary:{heading:"Angezeigte primäre Info",description:"Konfigurieren Sie, welche Bezeichnung für Zeitpläne in der Übersicht verwendet werden soll",options:{default:"Name des Zeitplans",entity_action:"Zusammenfassung der Aufgabe"}},display_format_secondary:{heading:"Angezeigte sekundäre Infos",description:"Konfigurieren Sie, welche zusätzlichen Eigenschaften in der Übersicht sichtbar sind",options:{relative_time:"Verbleibende Zeit bis zur nächsten Aktion",time:"Konfigurierte Zeit für die nächste Aktion",days:"Wiederholte Wochentage",additional_tasks:"Anzahl der zusätzlichen Aufgaben"}},show_header_toggle:{heading:"Kopfzeilen-Kippschalter anzeigen",description:"Kippschalter am oberen Rand der Karte anzeigen, um alle Einheiten zu aktivieren/deaktivieren"},tags:{heading:"Tags",description:"Tags verwenden, um Zeitpläne auf mehrere Karten aufzuteilen"},entities:{heading:"Enthaltene Entitäten",description:"Wählen Sie die Einheiten aus, die Sie mit dem Scheduler steuern möchten. Sie können auf eine Gruppe klicken, um sie zu öffnen. Beachten Sie, dass einige Objekte (z. B. Sensoren) nur für Bedingungen, nicht aber für Aktionen verwendet werden können.",included_number:"{Anzahl}/{Gesamt} ausgewählt"}}}}},ii={services:Qt,domains:ei,ui:ti},ai=Object.freeze({__proto__:null,services:Qt,domains:ei,ui:ti,default:ii}),si={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"heat/cool[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"heat/cool[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"set mode[ to {mode}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"set mode[ to {operation_mode}]",set_away_mode:"set away mode"}},oi={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"lights",lock:"locks",media_player:"media players",notify:"notification",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},ni={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"next {weekday}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},dialog:{enable_schedule:{title:"Complete modifications",description:"The schedule you have changed is currently disabled, do you want to enable it?"},confirm_delete:{title:"Remove entity?",description:"Are you sure you want to remove this entity?"},confirm_migrate:{title:"Update schedule",description:"Some settings will be lost by this change. Do you want to continue?"}},panel:{common:{title:"Scheduler",new_schedule:"New schedule",default_name:"Schedule #{id}"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"There are no groups defined",no_group_selected:"Select a group first",no_entities_for_group:"There are no entities in this group",no_entity_selected:"Select an entity first",no_actions_for_entity:"There are no actions for this entity",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first",time_scheme:"Scheme",time_input_mode:"Time control mode"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"behaviour after completion",period:"period"},card_editor:{tabs:{entities:"Entities",other:"Other"},fields:{title:{heading:"Title of the card",options:{standard:"standard",hidden:"hidden",custom:"custom"},custom_title:"Custom title"},discover_existing:{heading:"Show all schedules",description:"This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "},time_step:{heading:"Time step",description:"Resolution (in minutes) for creating schedules"},sort_by:{heading:"Sorting options",description:"Order in which the schedules appear in the card",options:{relative_time:"Time remaining until next action",title:"Displayed title of the schedule",state:"Show active schedules on top"}},display_format_primary:{heading:"Displayed primary info",description:"Configure which label is used for schedules in the overview",options:{default:"Schedule name",entity_action:"Summary of task"}},display_format_secondary:{heading:"Displayed secondary info",description:"Configure what additional properties are visible in the overview",options:{relative_time:"Time remaining until next action",time:"Configured time for next action",days:"Repeated days of the week",additional_tasks:"Number of additional tasks"}},show_header_toggle:{heading:"Show header toggle",description:"Show toggle switch at the top of the card for enabling/disabling all entities"},tags:{heading:"Tags",description:"Use tags to divide schedules between multiple cards"},entities:{heading:"Included entities",description:"Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",included_number:"{number}/{total} selected"}}}}},ri={services:si,domains:oi,ui:ni},li=Object.freeze({__proto__:null,services:si,domains:oi,ui:ni,default:ri}),di={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción[ a {temperature}]",set_temperature_hvac_mode_cool:"frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"calefacción/frío[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"calefacción/frío[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automático[ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición[ a {position}]",set_cover_tilt_position:"establecer inclinación[ a {tilt_position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]",set_mode:"establecer modo[ a {mode}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},notify:{notify:"enviar notificación"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"establecer modo[ a {operation_mode}]",set_away_mode:"establecer modo fuera de casa"}},ci={alarm_control_panel:"panel de control de alarma",binary_sensor:"binary sensors",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luces",lock:"cerraduras",media_player:"reproductores",notify:"notification",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},ui={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},dialog:{enable_schedule:{title:"Completa las modificaciones",description:"El horario que se ha cambiado está actualmente deshabilitado, ¿debería habilitarse?"},confirm_delete:{title:"¿Eliminar entidad?",description:"¿Estás seguro de que deseas eliminar esta entidad?"},confirm_migrate:{title:"Modificar horario",description:"Algunas configuraciones se perderán con este cambio. Quieres proceder?"}},panel:{common:{title:"Programador",new_schedule:"Nuevo horario",default_name:"Horario #{id}"},overview:{no_entries:"No hay ningún elemento que mostrar",backend_error:"Fallo de conexión con Scheduler component. Debe ser installado como integración antes de poder usar este panel.",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},entity_picker:{no_groups_defined:"No hay ningún grupo definido",no_group_selected:"selecciona un grupo primero",no_entities_for_group:"no hay ninguna entidad en este grupo",no_entity_selected:"selecciona una entidad primero",no_actions_for_entity:"no hay acciones para esta entidad",make_scheme:"crear planificación",multiple:"Múltiple"},time_picker:{no_timeslot_selected:"selecciona un bloque de tiempo primero",time_scheme:"Planificación",time_input_mode:"Time control mode"},conditions:{equal_to:"igual a",unequal_to:"desigual a",all:"todos",any:"cualquiera",no_conditions_defined:"no hay ninguna condición definida",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"acción después de la finalización",period:"período"}}},mi={services:di,domains:ci,ui:ui},hi=Object.freeze({__proto__:null,services:di,domains:ci,ui:ui,default:mi}),pi={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_temperature_hvac_mode_heat_cool:"küte/jahutus[ @ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"küte/jahutus[ @ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatne[ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]",set_cover_tilt_position:"sea ribide kalle [ asendisse {tilt_position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]",set_mode:"vali režiim [{mode}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},notify:{notify:"send notification"},script:{script:"käivita"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_operation_mode:"vali režiim [{operation_mode}]",set_away_mode:"kodust ära"}},_i={alarm_control_panel:"valvepaneel",binary_sensor:"binary sensors",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",lawn_mower:"lawn mower",light:"valgustid",lock:"lukud",media_player:"meediamängijad",notify:"notification",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},vi={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}",next_week_day:"järgmisel {weekday}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Viige muudatused lõpule",description:"Muudetud ajakava on praegu keelatud, kas see peaks olema lubatud?"},confirm_delete:{title:"Kas eemaldan olemi?",description:"Oled kindel, et soovid selle olemi eemaldada?"},confirm_migrate:{title:"Muutke ajakava",description:"Selle muudatusega lähevad mõned seaded kaotsi. Kas soovite jätkata?"}},panel:{common:{title:"Ajastaja",new_schedule:"Uus ajakava",default_name:"Ajakava #{id}"},overview:{no_entries:"Ajastused puuduvad",backend_error:"Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},entity_picker:{no_groups_defined:"Gruppe pole valitud",no_group_selected:"Vali alustuseks grupid",no_entities_for_group:"Selles grupis puuduvad olemid",no_entity_selected:"Vali alustuseks olem",no_actions_for_entity:"Selle olemi jaoks pole tegevusi",make_scheme:"loo skeem",multiple:"Mitu"},time_picker:{no_timeslot_selected:"Alustuseks vali ajavahemik",time_scheme:"Kkeem",time_input_mode:"Time control mode"},conditions:{equal_to:"võrdub",unequal_to:"ei võrdu",all:"kõik",any:"iga",no_conditions_defined:"Tingimusi pole määratud",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"toiming peale käivitumist",period:"periood"}}},gi={services:pi,domains:_i,ui:vi},fi=Object.freeze({__proto__:null,services:pi,domains:_i,ui:vi,default:gi}),yi={generic:{parameter_to_value:"{parameter} {value}",action_with_parameter:"{action} {parameter}"},climate:{set_temperature:"aseta lämpötilaksi[ {temperature}]",set_temperature_hvac_mode_heat:"lämmitä[ {temperature} asteeseen]",set_temperature_hvac_mode_cool:"jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool:"lämmitä/jäähdytä[ {temperature} asteeseen]",set_temperature_hvac_mode_heat_cool_range:"lämmitä/jäähdytä[ välillä {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automaatilla[ {temperature} asteeseen]",set_hvac_mode:"aseta tilaksi[ {hvac_mode}]",set_preset_mode:"aseta esivalinta[ {preset_mode}]",set_fan_mode:"aseta tuuletus[ {fan_mode}]"},cover:{close_cover:"sulje",open_cover:"avaa",set_cover_position:"aseta sijainniksi[ {position}]",set_cover_tilt_position:"aseta kallistus[ {tilt_position}]"},fan:{set_speed:"aseta nopeus[ {speed}]",set_direction:"asenta suunta[ {direction}]",oscillate:"aseta pyörimisnopeus[ {oscillate}]"},humidifier:{set_humidity:"aseta kosteus[ {humidity}]",set_mode:"aseta tilaksi {mode}"},input_number:{set_value:"aseta arvo {value}"},input_select:{select_option:"valitse[ {option}]"},select:{select_option:"valitse[ {option}]"},light:{turn_on:"kytke päälle[ {brightness} kirkkaudella]"},media_player:{select_source:"valitse lähteeksi[ {source}]"},notify:{notify:"lähetä ilmoitus"},script:{script:"suorita"},vacuum:{start_pause:"aloita / keskeytä"},water_heater:{set_operation_mode:"aseta tilaksi[ {operation_mode}]",set_away_mode:"aseta poissa-tila"}},bi={alarm_control_panel:"hälytyspaneeli",binary_sensor:"binary sensor",climate:"ilmastointi",cover:"kaihdin/tallin ovi",fan:"tuuletin",group:"ryhmä",humidifier:"ilmankosteuttimet",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"valaisin",lock:"lukko",media_player:"mediatoistin",notify:"ilmoitus",switch:"kytkin",vacuum:"imuri",water_heater:"vedenlämmitin"},ki={components:{date:{day_types_short:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},day_types_long:{daily:"päivittäin",workdays:"työpäivisin",weekend:"viikonloppuisin"},days:"päivää",tomorrow:"huomenna",repeated_days:"joka {days}",repeated_days_except:"joka päivä paitsi {excludedDays}",days_range:"{startDay} {endDay}",next_week_day:"seuraava {weekday}"},time:{absolute:"{time}",interval:"{startTime} - {endTime}",at_midnight:"keskiyöllä",at_noon:"keskipäivällä",at_sun_event:"{sunEvent}"}},dialog:{enable_schedule:{title:"Suorita muutokset loppuun",description:"Muutettu aikataulu on tällä hetkellä poissa käytöstä, pitäisikö se ottaa käyttöön?"},confirm_delete:{title:"Poistetaanko kohde?",description:"Haluatko varmasti poistaa tämän kohteen?"},confirm_migrate:{title:"Muokkaa aikataulua",description:"Jotkut asetukset menetetään tämän muutoksen seurauksena. Haluatko edetä?"}},panel:{common:{title:"Ajastin",new_schedule:"Uusi aikataulu",default_name:"Aikataulu #{id}"},overview:{no_entries:"Ei näytettäviä kohteita",backend_error:"Ei voitu yhdistää scheduler komponenttiin. Kortin käyttäminen vaatii scheduler integraation asentamisen.",excluded_items:"{number} {if number is 1} poissuljettu kohde {else} poissuljettua kohdetta",hide_excluded:"piilota poissuljetut kohteet",additional_tasks:"{number} {if number is 1} tehtävä {else} tehtävää"},entity_picker:{no_groups_defined:"Ryhmiä ei ole luotu",no_group_selected:"Valitse ryhmä ensin",no_entities_for_group:"Ryhmässä ei ole kohteita",no_entity_selected:"Valitse kohde ensin",no_actions_for_entity:"Kohteelle ei ole toimintoja",make_scheme:"luo aikataulu",multiple:"Monta kohdetta"},time_picker:{no_timeslot_selected:"Valitse aikaikkuna ensin",time_scheme:"Aikataulu",time_input_mode:"Ajastustapa"},conditions:{equal_to:"yhtä kuin",unequal_to:"ei yhtä kuin",all:"kaikki",any:"mikä tahansa",no_conditions_defined:"Ehtoja ei ole määritetty",track_conditions:"Uudelleentarkista kun ehdot muuttuvat"},options:{repeat_type:"toiminta tapahtuman jälkeen",period:"ajanjakso"},card_editor:{tabs:{entities:"Kohteet",other:"Muu"},fields:{title:{heading:"Kortin otsikko",options:{standard:"normaali",hidden:"piilotettu",custom:"muokattu"},custom_title:"Muokattu otsikko"},discover_existing:{heading:"Näytä kaikki ajoitukset",description:"Tämä kytkee käyttöön 'näytä olemassa olevat -attribuutin'. Aiemmin luodut ajastukset lisätään automaattisesti korttiin. "},time_step:{heading:"Ajastusvälit",description:"Ajastusväli minuutteina ajastusten luontiin"},sort_by:{heading:"Lajitteluasetukset",description:"Järjestys miten ajastukset näkyvät kortissa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",title:"Ajastuksen otsikko",state:"Aktiiviset ajastukset ylhäällä"}},display_format_primary:{heading:"Ensisijainen tieto",description:"Valitse mitä näytetään yhteenvedossa",options:{default:"Ajastuksen nimi",entity_action:"Ajastuksen yhteenveto"}},display_format_secondary:{heading:"Toissijainen tieto",description:"Valitse mitkä lisätiedot näkyvät yhteenvedossa",options:{relative_time:"Aikaa jäljellä seuraavaan toimintoon",time:"Seuraavalle toiminnolle määritetty aika",days:"Toistuvat viikonpäivät",additional_tasks:"Lisätoimintojen määrä"}},show_header_toggle:{heading:"Näytä otsikkokytkin",description:"Näytä kytkin kortin yläreunassa usean ajastuksen päälle/pois kytkemiseen"},tags:{heading:"Tunniste",description:"Käytä tunnisteita ajastusten jakamiseen korttien välillä"},entities:{heading:"Ajastettavat kohteet",description:"Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",included_number:"{number} / {total} valittu"}}}}},wi={services:yi,domains:bi,ui:ki},xi=Object.freeze({__proto__:null,services:yi,domains:bi,ui:ki,default:wi}),$i={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool:"chauffe/refroidit[ à {temperature}]",set_temperature_hvac_mode_heat_cool_range:"chauffe/refroidit[ à {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]",set_fan_mode:"ajuster le mode de ventilation[ à {fan_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]",set_cover_tilt_position:"régler les volets[ à {tilt_position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]",set_mode:"ajuster le mode[ à {mode}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},notify:{notify:"envoyer une notification"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_operation_mode:"ajuster le mode[ à {operation_mode}]",set_away_mode:"choisir le mode absent"}},ji={alarm_control_panel:"panneau de contrôle de l'alarme",binary_sensor:"capteurs binaires",climate:"thermostat",cover:"volet",fan:"ventilateur",group:"groupe",humidifier:"humidificateur",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",lawn_mower:"lawn mower",light:"lumière",lock:"serrure",media_player:"lecteur multimédia",notify:"notification",switch:"interrupteur",vacuum:"aspirateur",water_heater:"chauffe eau"},zi={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}",next_week_day:"{weekday} prochain"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},dialog:{enable_schedule:{title:"Compléter les modifs",description:"Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"},confirm_delete:{title:"Supprimer l'entité ?",description:"Voulez-vous vraiment supprimer cette entité ?"},confirm_migrate:{title:"Modifier l'horaire",description:"Certains paramètres seront perdus par ce changement. Voulez-vous poursuivre?"}},panel:{common:{title:"Planificateur",new_schedule:"Nouvel horaire",default_name:"Horaire #{id}"},overview:{no_entries:"il n'y a pas d'entrée à montrer",backend_error:"Impossible de se connecter au composant du planificateur. Il doit être installé en tant qu'intégration avant que cette carte ne puisse être utilisée.",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},entity_picker:{no_groups_defined:"Aucun groupe défini",no_group_selected:"Choisir un groupe en premier",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_entity_selected:"Choisir une entité en premier",no_actions_for_entity:"Il n'y a pas d'action pour cette entité",make_scheme:"créer un schéma",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Choisir d'abord une plage horaire",time_scheme:"Schéma",time_input_mode:"contrôle temporel"},conditions:{equal_to:"égal à",unequal_to:"pas égal à",all:"toutes",any:"une",no_conditions_defined:"Il n'y a pas de condition définie",track_conditions:"Ré-évaluer lorsque la condition change"},options:{repeat_type:"comportement après l'achèvement",period:"période"}}},Oi={services:$i,domains:ji,ui:zi},Si=Object.freeze({__proto__:null,services:$i,domains:ji,ui:zi,default:Oi}),Ei={generic:{parameter_to_value:"{parameter} ל {value}",action_with_parameter:"{action} עם {parameter}"},climate:{set_temperature:"קבע טמפרטורה[ ל {temperature}]",set_temperature_hvac_mode_heat:"חימום[ ל {temperature}]",set_temperature_hvac_mode_cool:"קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool:"חימום/קירור[ ל {temperature}]",set_temperature_hvac_mode_heat_cool_range:"חימום/קירור[ ל {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"אוטומטי[ ל {temperature}]",set_hvac_mode:"קבע מצב עבודה[ ל {hvac_mode}]",set_preset_mode:"קבע הגדרה[ ל {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"סגירה",open_cover:"פתיחה",set_cover_position:"קבע מיקום[ ל {position}]",set_cover_tilt_position:"קבע הטיה[ ל {tilt_position}]"},fan:{set_speed:"קבע מהירות[ ל {speed}]",set_direction:"קבע כיוון[ ל {direction}]",oscillate:"קבע תנודה[ ל {oscillate}]"},humidifier:{set_humidity:"קבע לחות[ ל {humidity}]",set_mode:"קבע מצב עבודה[ ל {mode}]"},input_number:{set_value:"קבע ערך[ ל {value}]"},input_select:{select_option:"בחר אפשרות[ {option}]"},select:{select_option:"בחר אפשרות[ {option}]"},light:{turn_on:"הדלקה[ בעוצמה של {brightness}]"},media_player:{select_source:"select source[ {source}]"},notify:{notify:"send notification"},script:{script:"בצע"},vacuum:{start_pause:"התחל / הפסק"},water_heater:{set_operation_mode:"קבע מצב עבודה[ ל {operation_mode}]",set_away_mode:"קבע מצב מוץ לבית"}},Ai={alarm_control_panel:"בקרת אזעקה",binary_sensor:"binary sensors",climate:"מזג אוויר",cover:"תריסים",fan:"מאווררים",group:"קבוצות יישויות",humidifier:"מכשירי אדים",input_boolean:"כניסה בוליאנית",input_number:"כניסה מספרית",input_select:"בחירת כניסה",lawn_mower:"lawn mower",light:"תאורה",lock:"מנעולים",media_player:"נגני מדיה",notify:"notification",switch:"מפסקים",vacuum:"שואבי אבק",water_heater:"מחממי מים"},Ci={components:{date:{day_types_short:{daily:"כל יום",workdays:"ימי חול",weekend:"סוף שבוע"},day_types_long:{daily:"כל יום",workdays:"בימי חול",weekend:"בסוף השבוע"},days:"ימים",tomorrow:"מחר",repeated_days:"בכל {days}",repeated_days_except:"בכל יום פרט ל  {excludedDays}",days_range:"מ- {startDay} ועד- {endDay}",next_week_day:"הבא {weekday}"},time:{absolute:"בשעה {time}",interval:"משעה {startTime} עד שעה {endTime}",at_midnight:"בחצות הלילה",at_noon:"בחצות היום",at_sun_event:"ב {sunEvent}"}},dialog:{enable_schedule:{title:"השלם את השינויים",description:"לוח הזמנים ששונה מושבת כעת, האם צריך להפעיל אותו?"},confirm_delete:{title:"להסיר את הישות?",description:"האם בוודאות ברצונך להסיר ישות זו?"},confirm_migrate:{title:"שנה את לוח הזמנים",description:"חלק מההגדרות יאבדו על ידי פעולה זו. האם אתה רוצה להמשיך?"}},panel:{common:{title:"לוח זמנים",new_schedule:"לוח זמנים חדש",default_name:"לוח זמנים #{id}"},overview:{no_entries:"אין פריטים להצגה",backend_error:"אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",excluded_items:"{number} לא נכלל {if number is 1} פריט {else} פריטים",hide_excluded:"הסתר פריטים לא כלולים",additional_tasks:"{number} נוסף {if number is 1} משימה {else} משימות"},entity_picker:{no_groups_defined:"לא הוגדרו קבוצות",no_group_selected:"בחר קבוצה תחילה",no_entities_for_group:"אין יישויות בקבוצה זו",no_entity_selected:"תחילה בחר יישות",no_actions_for_entity:"אין פעולות עבור יישות זאת",make_scheme:"בנה סכימה",multiple:"מספר יישויות"},time_picker:{no_timeslot_selected:"בחר משבצת זמן קודם",time_scheme:"סכימה",time_input_mode:"Time control mode"},conditions:{equal_to:"שווה ל",unequal_to:"שונה מ",all:"כל התנאים",any:"אחד מהתנאים",no_conditions_defined:"לא הוגדרו תנאים",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"התנהגות לאחר הפעלה",period:"פרק זמן"}}},Mi={services:Ei,domains:Ai,ui:Ci},Ti=Object.freeze({__proto__:null,services:Ei,domains:Ai,ui:Ci,default:Mi}),Di={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"melegíteni[ to {temperature}]",set_temperature_hvac_mode_cool:"hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"melegíteni/hűtés[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"melegíteni/hűtés[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatikus[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]",set_mode:"mód beállítása[ to {mode}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},notify:{notify:"send notification"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"mód beállítása[ to {operation_mode}]",set_away_mode:"set away mode"}},Ni={alarm_control_panel:"alarm control panel",binary_sensor:"binary sensors",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",lawn_mower:"lawn mower",light:"lámpa",lock:"locks",media_player:"lejátszó",notify:"notification",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},Pi={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}",next_week_day:"következő {weekday}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},dialog:{enable_schedule:{title:"Végezze el a módosításokat",description:"A módosított ütemezés jelenleg le van tiltva, engedélyezni kell?"},confirm_delete:{title:"Biztos benne, hogy eltávolítja az entitást?",description:"Biztos benne, hogy el szeretné távolítani ezt az entitást?"},confirm_migrate:{title:"Ütemezés módosítása",description:"Ezzel a művelettel bizonyos beállítások elvesznek. Akarod folytatni?"}},panel:{common:{title:"Időzítések",new_schedule:"Új ütemezés",default_name:"Ütemterv #{id}"},overview:{no_entries:"Nincs megjeleníthető elem",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},entity_picker:{no_groups_defined:"Nincsenek deffiniált csoportok",no_group_selected:"Előbb egy csoportot szükséges választani",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_entity_selected:"Előbb egy entitást szükséges választani",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first",time_scheme:"Scheme",time_input_mode:"Time control mode"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"behaviour after triggering",period:"időszak"}}},Li={services:Di,domains:Ni,ui:Pi},Ii=Object.freeze({__proto__:null,services:Di,domains:Ni,ui:Pi,default:Li}),qi={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool:"riscaldamento/raffrescamento[ a {temperature}]",set_temperature_hvac_mode_heat_cool_range:"riscaldamento/raffrescamento[ a {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]",set_cover_tilt_position:"imposta inclinazione[ su {tilt_position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]",set_mode:"imposta modalità[ a {mode}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},notify:{notify:"invia notifica"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_operation_mode:"imposta modalità[ a {operation_mode}]",set_away_mode:"imposta fuori casa"}},Vi={alarm_control_panel:"pannello di controllo allarme",binary_sensor:"binary sensors",climate:"clima",cover:"serrande",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input booleani",input_number:"input numerici",input_select:"input select",lawn_mower:"lawn mower",light:"luci",lock:"lucchetti",media_player:"media player",notify:"notification",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},Ri={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"giorni",tomorrow:"domani",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",next_week_day:"prossimo {weekday}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},dialog:{enable_schedule:{title:"Completa le modifiche",description:"La pianificazione modificata è attualmente disabilitata, dovrebbe essere abilitata?"},confirm_delete:{title:"Vuoi rimuovere l'entità?",description:"Sei sicuro di voler rimuovere questa entità?"},confirm_migrate:{title:"Modifica orario",description:"Alcune impostazioni andranno perse con questa azione. Vuoi procedere?"}},panel:{common:{title:"Schedulatore",new_schedule:"Nuovo orario",default_name:"Orario #{id}"},overview:{no_entries:"Non ci sono oggetti da visualizzare",backend_error:"Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},entity_picker:{no_groups_defined:"Non ci sono gruppi definiti",no_group_selected:"Seleziona prima un gruppo",no_entities_for_group:"Non ci sono entità in questo gruppo",no_entity_selected:"Seleziona prima un'entità",no_actions_for_entity:"Non ci sono azioni per questa entità",make_scheme:"crea schema",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Seleziona prima una fascia oraria",time_scheme:"Schema",time_input_mode:"Time control mode"},conditions:{equal_to:"uguale",unequal_to:"non uguale",all:"tutte",any:"qualunque",no_conditions_defined:"Non ci sono condizioni definite",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportamento dopo il completamento",period:"periodo"}}},Ui={services:qi,domains:Vi,ui:Ri},Hi=Object.freeze({__proto__:null,services:qi,domains:Vi,ui:Ri,default:Ui}),Bi={generic:{parameter_to_value:"{parameter} uz {value}",action_with_parameter:"{action} ar {parameter}"},climate:{set_temperature:"uzstādīt temperatūru[ uz {temperature}]",set_temperature_hvac_mode_heat:"sildīt[ līdz {temperature}]",set_temperature_hvac_mode_cool:"atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool:"sildīt/atdzesēt[ līdz {temperature}]",set_temperature_hvac_mode_heat_cool_range:"sildīt/atdzesēt[ uz {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ uz {temperature}]",set_hvac_mode:"iestatīt[ uz {hvac_mode}]",set_preset_mode:"iestatīt režīmu[ uz {preset_mode}]",set_fan_mode:"iestatīt ventilatora režīmu[ uz {fan_mode}]"},cover:{close_cover:"aizvērt",open_cover:"atvērt",set_cover_position:"uzstādīt pozīciju[ uz {position}]",set_cover_tilt_position:"uzstādīt slīpuma stāvokli[ uz {tilt_position}]"},fan:{set_speed:"iestatīt ātrumu[ uz {speed}]",set_direction:"iestatīt virzienu[ uz {direction}]",oscillate:"iestatīt oscilāciju[ uz {oscillate}]"},humidifier:{set_humidity:"iestatīt mitrumu[ uz {humidity}]",set_mode:"iestatīt režīmu[ uz {mode}]"},input_number:{set_value:"iestatīt vērtību[ uz {value}]"},input_select:{select_option:"izvēlēties opciju[ {option}]"},select:{select_option:"izvēlēties opciju[ {option}]"},light:{turn_on:"ieslēgt[ ar {brightness} spilgtumu]"},media_player:{select_source:"izvēlēties avotu[ {source}]"},notify:{notify:"nosūtīt paziņojumu"},script:{script:"izpildīt"},vacuum:{start_pause:"sākt / pauze"},water_heater:{set_operation_mode:"iestatīt režīmu[ uz {operation_mode}]",set_away_mode:"iestatīt prombūtnes režīmu"}},Fi={alarm_control_panel:"trauksmes kontroles panelis",binary_sensor:"binārie sensori",climate:"klimats",cover:"pārsegi",fan:"ventilatori",group:"vienību grupas",humidifier:"mitrinātāji",input_boolean:"ievades binārais lauks",input_number:"ievades numurs",input_select:"ievades izvēle",lawn_mower:"lawn mower",light:"gaismas",lock:"slēdzene",media_player:"multivides atskaņotāji",notify:"paziņojums",switch:"slēdži",vacuum:"putekļu sūcēji",water_heater:"ūdens sildītāji"},Zi={components:{date:{day_types_short:{daily:"ikdienišķs",workdays:"darba dienas",weekend:"nedēļas nogale"},day_types_long:{daily:"katru dienu",workdays:"darba dienās",weekend:"nedēļas nogalē"},days:"dienas",tomorrow:"rītdiena",repeated_days:"katras {days}",repeated_days_except:"katru dienu, izņemot {excludedDays}",days_range:"no {startDay} līdz {endDay}",next_week_day:"nākošo {weekday}"},time:{absolute:"kad {time}",interval:"no {startTime} līdz {endTime}",at_midnight:"kad midnight",at_noon:"kad noon",at_sun_event:"kad {sunEvent}"}},dialog:{enable_schedule:{title:"Pabeigt modificēšanu",description:"Izmainītais grafiks pašlaik ir atspējots, vai vēlaties to iespējot?"},confirm_delete:{title:"Vai dzēst vienību?",description:"Vai tiešām vēlaties dzēst šo vienību?"},confirm_migrate:{title:"Atjaunināt grafiku",description:"Šīs izmaiņas rezultātā daži iestatījumi tiks zaudēti. Vai vēlaties turpināt?"}},panel:{common:{title:"Plānotājs",new_schedule:"Jauns grafiks",default_name:"Grafiks #{id}"},overview:{no_entries:"Nav parādāmu vienību",backend_error:"Nevar izveidot savienojumu ar plānotāja komponenti. Pirms šīs kartes izmantošanas tā ir jāinstalē kā integrācija.",excluded_items:"{number} izslēgtas {if number is 1} vienība {else} vienības",hide_excluded:"paslēpt izslēgtās vienības",additional_tasks:"{number} papildu {if number is 1} uzdevums {else} uzdevumi"},entity_picker:{no_groups_defined:"Nav definētas grupas",no_group_selected:"Vispirms izvēlieties grupu",no_entities_for_group:"Šajā grupā nav vienību",no_entity_selected:"Vispirms izvēlieties vienību",no_actions_for_entity:"Šai vienībai nav darbību",make_scheme:"izveidot shēmu",multiple:"Vairāki"},time_picker:{no_timeslot_selected:"Vispirms izvēlieties laika slotu",time_scheme:"Shēma",time_input_mode:"Laika kontroles režīms"},conditions:{equal_to:"ir",unequal_to:"nav",all:"visi",any:"jebkuru",no_conditions_defined:"Nav definēti nosacījumi",track_conditions:"Pārvērtēt, kad mainās nosacījumi"},options:{repeat_type:"uzvedība pēc beigām",period:"periods"},card_editor:{tabs:{entities:"Vienības",other:"Cits"},fields:{title:{heading:"Kartes nosaukums",options:{standard:"standarta",hidden:"paslēpts",custom:"pielāgots"},custom_title:"Pielāgots nosaukums"},discover_existing:{heading:"Rādīt visus grafikus",description:"Šis iestata 'atklāt esošo' parametru. Iepriekš izveidotie grafiki automātiski tiks pievienoti kartei."},time_step:{heading:"Laika solis",description:"Izšķirtspēja (minūtēs) grafiku izveidei"},sort_by:{heading:"Kārtošanas opcijas",description:"Kārtība, kādā grafiki parādās kartē",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",title:"Grafika nosaukums",state:"Rādīt aktīvos grafikus augšā"}},display_format_primary:{heading:"Rādītā primārā informācija",description:"Konfigurējiet, kura informācija tiek izmantota grafiku pārskatā",options:{default:"Grafika nosaukums",entity_action:"Uzdevuma kopsavilkums"}},display_format_secondary:{heading:"Rādītā sekundārā informācija",description:"Konfigurējiet, kuras papildu īpašības ir redzamas pārskatā",options:{relative_time:"Atlikušais laiks līdz nākamajai darbībai",time:"Konfigurētais laiks nākamajai darbībai",days:"Atkārtotas nedēļas dienas",additional_tasks:"Papildu uzdevumu skaits"}},show_header_toggle:{heading:"Rādīt galvenes pārslēgšanu",description:"Rādīt pārslēgšanas slēdzi kartes augšdaļā, lai iespējotu/atspējotu visas vienības"},tags:{heading:"Tagi",description:"Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"},entities:{heading:"Iekļautās vienības",description:"Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",included_number:"{number}/{total} izvēlēts"}}}}},Yi={services:Bi,domains:Fi,ui:Zi},Wi=Object.freeze({__proto__:null,services:Bi,domains:Fi,ui:Zi,default:Yi}),Gi={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool:"verwarmen/koelen[ naar {temperature}]",set_temperature_hvac_mode_heat_cool_range:"verwarmen/koelen[ naar {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatisch[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen",set_fan_mode:"ventilatiemodus aanpassen[ naar {fan_mode}]"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]",set_cover_tilt_position:"hellingshoek instellen[ naar {tilt_position}]"},fan:{set_speed:"snelheid instellen[ op {speed}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]",set_mode:"modus aanpassen[ naar {mode}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},notify:{notify:"notificatie sturen"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_operation_mode:"modus aanpassen[ naar {operation_mode}]",set_away_mode:"stel afwezigheidsmode in"}},Ki={alarm_control_panel:"alarmsystemen",binary_sensor:"binaire sensoren",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",select:"select",lawn_mower:"lawn mower",light:"verlichting",lock:"sloten",media_player:"mediaspelers",notify:"notificatie",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},Ji={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}",next_week_day:"volgende week {weekday}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},dialog:{enable_schedule:{title:"Wijzigingen voltooid",description:"Deze planning is momenteel gedeactiveerd. Dient deze te worden ingeschakeld?"},confirm_delete:{title:"Entiteit verwijderen?",description:"Weet je zeker dat je dit item wilt verwijderen?"},confirm_migrate:{title:"Schema bijwerken",description:"Door deze actie gaan vorige instellingen verloren. Wil je doorgaan?"}},panel:{common:{title:"Tijdplanner",new_schedule:"Nieuw schema",default_name:"Schema #{id}"},overview:{no_entries:"Er zijn geen items aangemaakt",backend_error:"Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},entity_picker:{no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",make_scheme:"maak schema",multiple:"Meerdere"},time_picker:{no_timeslot_selected:"Kies eerst een tijdsslot",time_scheme:"Schema",time_input_mode:"Invoermodus voor tijd"},conditions:{equal_to:"is",unequal_to:"is niet",all:"en",any:"of",no_conditions_defined:"Er zijn geen voorwaarden gedefinieerd",track_conditions:"Herevalueer wanneer condities veranderen"},options:{repeat_type:"gedrag na voltooiing",period:"periode"}}},Xi={services:Gi,domains:Ki,ui:Ji},Qi=Object.freeze({__proto__:null,services:Gi,domains:Ki,ui:Ji,default:Xi}),ea={generic:{parameter_to_value:"{parameter} til {value}",action_with_parameter:"{action} med {parameter}"},climate:{set_temperature:"sett temperatur[ til {temperature}]",set_temperature_hvac_mode_heat:"oppvarming[ til {temperature}]",set_temperature_hvac_mode_cool:"kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool:"oppvarming/kjøling[ til {temperature}]",set_temperature_hvac_mode_heat_cool_range:"oppvarming/kjøling[ til {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ til {temperature}]",set_hvac_mode:"sett modus[ til {hvac_mode}]",set_preset_mode:"sett forhåndsvalg[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ til {position}]",set_cover_tilt_position:"sett vippestilling[ til {tilt_position}]"},fan:{set_speed:"sett hastighet[ til {speed}]",set_direction:"sett retning[ til {direction}]",oscillate:"sett svingning[ til {oscillate}]"},humidifier:{set_humidity:"sett luftfuktighet[ til {humidity}]",set_mode:"sett modus[ til {mode}]"},input_number:{set_value:"sett verdi[ til {value}]"},input_select:{select_option:"velg[ {option}]"},select:{select_option:"velg[ {option}]"},light:{turn_on:"slå på[ med {brightness} lysstyrke]"},media_player:{select_source:"velg kilde[ {source}]"},notify:{notify:"send notifikasjon"},script:{script:"utfør"},vacuum:{start_pause:"start / pause"},water_heater:{set_operation_mode:"sett modus[ til {operation_mode}]",set_away_mode:"sett bortemodus"}},ta={alarm_control_panel:"alarmpanel",binary_sensor:"binary sensors",climate:"klima",cover:"solskjerming",fan:"vifter",group:"grupper",humidifier:"luftfuktere",input_boolean:"input boolsk",input_number:"input nummer",input_select:"input valg",lawn_mower:"lawn mower",light:"lys",lock:"låser",media_player:"mediaspillere",notify:"notification",switch:"brytere",vacuum:"støvsugere",water_heater:"varmtvannsberedere"},ia={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"helg"},days:"Dager",tomorrow:"imorgen",repeated_days:"hver {days}",repeated_days_except:"hver dag unntatt {excludedDays}",days_range:"fra {startDay} til {endDay}",next_week_day:"neste {weekday}"},time:{absolute:"kl. {time}",interval:"fra {startTime} til {endTime}",at_midnight:"ved midnatt",at_noon:"kl. 12.00",at_sun_event:"ved {sunEvent}"}},dialog:{enable_schedule:{title:"Fullfør endringene",description:"Tidsplanen som er endret er for øyeblikket deaktivert, bør den være aktivert?"},confirm_delete:{title:"Vil du fjerne entiteten?",description:"Er du sikker på at du vil fjerne denne entiteten?"},confirm_migrate:{title:"Endre tidsplanen",description:"Noen innstillinger vil gå tapt ved denne handlingen. Vil du fortsette?"}},panel:{common:{title:"Tidsplan",new_schedule:"Ny tidsplan",default_name:"Tidsplan #{id}"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",backend_error:"Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",excluded_items:"{number} ekskludert {if number is 1} element {else} elementer",hide_excluded:"skjul ekskluderte elementer",additional_tasks:"{number} flere {if number is 1} oppgaver {else} oppgaver"},entity_picker:{no_groups_defined:"Ingen grupper definert",no_group_selected:"Velg en gruppe først",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_entity_selected:"Velg en entitet først",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",make_scheme:"lag tidsplan",multiple:"Flere"},time_picker:{no_timeslot_selected:"Velg tidsluke først",time_scheme:"Tidsplan",time_input_mode:"Time control mode"},conditions:{equal_to:"er",unequal_to:"er ikke",all:"alle",any:"any",no_conditions_defined:"Ingen vilkår definert",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"oppførsel etter fullføring",period:"periode"}}},aa={services:ea,domains:ta,ui:ia},sa=Object.freeze({__proto__:null,services:ea,domains:ta,ui:ia,default:aa}),oa={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_temperature_hvac_mode_heat_cool:"grzej/chłodź[ do {temperature}]",set_temperature_hvac_mode_heat_cool_range:"grzej/chłodź[ do {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatyczny[ do {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]",set_cover_tilt_position:"ustaw pozycję lameli[ na {tilt_position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]",set_mode:"ustaw tryb[ na {mode}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},notify:{notify:"send notification"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_operation_mode:"ustaw tryb[ na {operation_mode}]",set_away_mode:"ustaw tryb nieobecności"}},na={alarm_control_panel:"panel kontrolny alarmu",binary_sensor:"binary sensors",climate:"klimatyzacja",cover:"rolety",fan:"wentylatory",group:"grupy",humidifier:"nawilżacze",input_boolean:"wejście logiczne",input_number:"wejście liczbowe",input_select:"wybór wejścia",lawn_mower:"lawn mower",light:"światła",lock:"zamki",media_player:"odtwarzacze",notify:"notification",switch:"przełączniki",vacuum:"odkurzacze",water_heater:"podgrzewacze wody"},ra={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"następna {weekday}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północ",at_noon:"o południe",at_sun_event:"o {sunEvent}"}},dialog:{enable_schedule:{title:"Zakończ modyfikacje",description:"Zmieniony harmonogram jest obecnie wyłączony, czy powinien być włączony?"},confirm_delete:{title:"Usunąć encję?",description:"Czy na pewno chcesz usunąć tę encję?"},confirm_migrate:{title:"Zmodyfikuj harmonogram",description:"Ta czynność spowoduje utratę niektórych ustawień. Czy chcesz kontynuować?"}},panel:{common:{title:"Harmonogram",new_schedule:"Nowy harmonogram",default_name:"Harmonogram #{id}"},overview:{no_entries:"Nie ma elementów do pokazania",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},entity_picker:{no_groups_defined:"Nie ma zdefiniowanych grup",no_group_selected:"Najpierw wybierz grupę",no_entities_for_group:"Nie ma encji w tej grupie",no_entity_selected:"Najpierw wybierz encję",no_actions_for_entity:"Nie ma akcji dla tej encji",make_scheme:"stwórz schemat",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Najpierw wybierz przedział czasowy",time_scheme:"Schemat",time_input_mode:"Time control mode"},conditions:{equal_to:"jest równe ",unequal_to:"nie jest równe",all:"wszystkie",any:"dowolny",no_conditions_defined:"Nie ma zdefiniowanych warunków",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"zachowanie po zakończeniu",period:"okres"}}},la={services:oa,domains:na,ui:ra},da=Object.freeze({__proto__:null,services:oa,domains:na,ui:ra,default:la}),ca={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"send notification"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},ua={alarm_control_panel:"painel de controlo de alarme",binary_sensor:"binary sensors",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"lawn mower",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notification",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},ma={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover a entidade?",description:"Tem a certeza que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens a mostrar",backend_error:"Não consegui ligar ao componente de agendamento. Essa integração tem que ser instalada antes da utilização deste cartão.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema",multiple:"multiplos"},time_picker:{no_timeslot_selected:"É necessário selecionar um período horário para escolher uma ação",time_scheme:"Esquema",time_input_mode:"Modo de controlo de tempo"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas",track_conditions:"Revaliar em caso de alterações"},options:{repeat_type:"comportamento após a conclusão",period:"período"}}},ha={services:ca,domains:ua,ui:ma},pa=Object.freeze({__proto__:null,services:ca,domains:ua,ui:ma,default:ha}),_a={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool:"aquecimento/arrefecimento[ para {temperature}]",set_temperature_hvac_mode_heat_cool_range:"aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]",set_fan_mode:"definir modo do ventilador[ para {fan_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]",set_cover_tilt_position:"definir a posição de inclinação[ para {tilt_position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]",set_mode:"definir modo[ para {mode}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},notify:{notify:"enviar notificação"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_operation_mode:"definir modo[ para {operation_mode}]",set_away_mode:"definir modo ausente"}},va={alarm_control_panel:"painel de alarme",binary_sensor:"sensores binários",climate:"ambiente",cover:"persiana",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",lawn_mower:"lawn mower",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",notify:"notificar",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},ga={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"de {startDay} até {endDay}",next_week_day:"próximo {weekday}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},dialog:{enable_schedule:{title:"Conclua as modificações",description:"A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"},confirm_delete:{title:"Remover entidade?",description:"Tem certeza de que deseja remover esta entidade?"},confirm_migrate:{title:"Modificar horário",description:"Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"}},panel:{common:{title:"Agenda",new_schedule:"Novo horário",default_name:"Horário #{id}"},overview:{no_entries:"Não existem itens para mostrar",backend_error:"Não foi possível conectar com o componente agendador. Ele precisa ser instalado como integração antes que este cartão possa ser usado.",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema",multiple:"Múltiplo"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro",time_scheme:"Esquema",time_input_mode:"Modo de controle do tempo"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer um",no_conditions_defined:"Não existem condições definidas",track_conditions:"Reavaliar quando as condições mudarem"},options:{repeat_type:"comportamento após a conclusão",period:"período"}}},fa={services:_a,domains:va,ui:ga},ya=Object.freeze({__proto__:null,services:_a,domains:va,ui:ga,default:fa}),ba={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool:"încălzire/răcire[ la {temperature}]",set_temperature_hvac_mode_heat_cool_range:"încălzire/răcire[ la {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"auto[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]",set_mode:"setare mod[ la {mode}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},notify:{notify:"send notification"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_operation_mode:"setare mod[ la {operation_mode}]",set_away_mode:"setare mod plecat"}},ka={alarm_control_panel:"panou control alarmă",binary_sensor:"binary sensors",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",lawn_mower:"lawn mower",light:"lumini",lock:"încuietori",media_player:"media playere",notify:"notification",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},wa={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}",next_week_day:"{weekday} viitoare"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},dialog:{enable_schedule:{title:"Completați modificările",description:"Programul care a fost modificat este momentan dezactivat, ar trebui activat?"},confirm_delete:{title:"Ștergeți entitatea?",description:"Sigur doriți să eliminați această entitate?"},confirm_migrate:{title:"Modificați programul",description:"Unele setări se vor pierde prin această acțiune. Vrei sa continui?"}},panel:{common:{title:"Planificator",new_schedule:"Noul program",default_name:"Program #{id}"},overview:{no_entries:"Nu există elemente de afișat",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},entity_picker:{no_groups_defined:"Nu există grupuri definite",no_group_selected:"Prima dată selectați un grup",no_entities_for_group:"Nu există entități definite în acest grup",no_entity_selected:"Prima dată selectați o entitate",no_actions_for_entity:"Nu există acțiuni pentru această entitate",make_scheme:"creare schemă",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Prima dată selectați un interval orar",time_scheme:"Schemă",time_input_mode:"Time control mode"},conditions:{equal_to:"este",unequal_to:"nu este",all:"tot",any:"oricare",no_conditions_defined:"Nu există condiții definite",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"comportament după declanșare",period:"perioadă"}}},xa={services:ba,domains:ka,ui:wa},$a=Object.freeze({__proto__:null,services:ba,domains:ka,ui:wa,default:xa}),ja={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool:"обогрев/охлаждение[ {temperature}]",set_temperature_hvac_mode_heat_cool_range:"обогрев/охлаждение[ {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвто[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]",set_cover_tilt_position:"установить наклон[ {tilt_position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]",set_mode:"установить режим[ {mode}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},notify:{notify:"послать сообщение"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"установить режим[ {operation_mode}]",set_away_mode:"установить режим вне дома"}},za={alarm_control_panel:"панель управления сигнализацией",binary_sensor:"binary sensors",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",lawn_mower:"lawn mower",light:"освещение",lock:"замки",media_player:"медиа-плееры",notify:"notification",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},Oa={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}",next_week_day:"в следующую {weekday}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},dialog:{enable_schedule:{title:"Завершите модификации",description:"Расписание, которое было изменено, в настоящее время отключено, следует ли его включить?"},confirm_delete:{title:"Удалить объект?",description:"Вы уверены, что хотите удалить этот объект?"},confirm_migrate:{title:"Изменить расписание",description:"При этом некоторые настройки будут потеряны. Вы хотите продолжить?"}},panel:{common:{title:"Планировщик",new_schedule:"Новое расписание",default_name:"Расписание #{id}"},overview:{no_entries:"Отсутствуют элементы",backend_error:"Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},entity_picker:{no_groups_defined:"Не определены группы",no_group_selected:"Выберите группу",no_entities_for_group:"Отсутствуют элементы в группе",no_entity_selected:"Выберите элемент",no_actions_for_entity:"Нет действий для этого элемента",make_scheme:"создать схему",multiple:"Множественный"},time_picker:{no_timeslot_selected:"Выберите временной слот",time_scheme:"Cхему",time_input_mode:"Time control mode"},conditions:{equal_to:"равно",unequal_to:"не равно",all:"все",any:"любое",no_conditions_defined:"Не определены условия",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"поведение после срабатывания",period:"период"}}},Sa={services:ja,domains:za,ui:Oa},Ea=Object.freeze({__proto__:null,services:ja,domains:za,ui:Oa,default:Sa}),Aa={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastaviť teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"vykurovanie[ na {temperature}]",set_temperature_hvac_mode_cool:"chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"vykurovanie/chladenie[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"vykurovanie/chladenie[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"automatika[ na {temperature}]",set_hvac_mode:"nastaviť režim[ na {hvac_mode}]",set_preset_mode:"nastaviť predvoľbu[ {preset_mode}]",set_fan_mode:"nastaviť režim ventilátora[ to {fan_mode}]"},cover:{close_cover:"zatvoriť",open_cover:"otvoriť",set_cover_position:"nastaviť polohu[ na {position}]",set_cover_tilt_position:"nastaviť naklonenie[ na {tilt_position}]"},fan:{set_speed:"nastaviť rýchlosť[ na {speed}]",set_direction:"nastaviť smer[ na {direction}]",oscillate:"nastaviť osciláciu[ na {oscillate}]"},humidifier:{set_humidity:"nastaviť vlhkosť[ na {humidity}]",set_mode:"nastaviť režim[ na {mode}]"},input_number:{set_value:"nastaviť hodnotu[ na {value}]"},input_select:{select_option:"vybrať možnosť[ {option}]"},select:{select_option:"vybrať možnosť[ {option}]"},light:{turn_on:"zapnúť[ na {brightness} jas]"},media_player:{select_source:"vybrať zdroj[ {source}]"},notify:{notify:"poslať notifikáciu"},script:{script:"spustiť"},vacuum:{start_pause:"štart / pauza"},water_heater:{set_operation_mode:"nastaviť režim[ na {operation_mode}]",set_away_mode:"nastaviť mód neprítomný"}},Ca={alarm_control_panel:"ovládací panel alarmu",binary_sensor:"binárny snímač",climate:"klimatizácia",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"vstup boolean",input_number:"vstup číslo",input_select:"vstup voľba",lawn_mower:"lawn mower",light:"svetlá",lock:"zámky",media_player:"mediálne prehrávače",notify:"notification",switch:"vypínače",vacuum:"vysávače",water_heater:"ohrievače vody"},Ma={components:{date:{day_types_short:{daily:"denne",workdays:"pracovné dni",weekend:"víkend"},day_types_long:{daily:"každý deň",workdays:"cez pracovné dni",weekend:"cez víkend"},days:"dni",tomorrow:"zajtra",repeated_days:"každý {days}",repeated_days_except:"každý deň okrem {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"budúcu {weekday}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od polnoci",at_noon:"od obeda",at_sun_event:"na {sunEvent}"}},dialog:{enable_schedule:{title:"Dokončite úpravy",description:"Plán, ktorý sa zmenil, je momentálne zakázaný, mal by byť povolený?"},confirm_delete:{title:"Odstrániť entitu?",description:"Naozaj chcete odstrániť túto entitu?"},confirm_migrate:{title:"Upravte plán",description:"Touto akciou sa stratia niektoré nastavenia. Chcete pokračovať?"}},panel:{common:{title:"Plánovač",new_schedule:"Nový plán",default_name:"Plán #{id}"},overview:{no_entries:"Žiadne položky k zobrazeniu",backend_error:"Nepodarilo sa pripojiť k Scheduler Component. Musí byť nainštalovaný ako integrácia pred použitím tejto karty.",excluded_items:"Vylúčené položky: {number}",hide_excluded:"skryť vylúčené položky",additional_tasks:"Ďalšie úlohy: {number}"},entity_picker:{no_groups_defined:"Nie sú definované žiadne skupiny",no_group_selected:"Najprv vyberte skupinu",no_entities_for_group:"V tejto skupine nie sú žiadne entity",no_entity_selected:"Najprv vyberte entitu",no_actions_for_entity:"Pre túto entitu neexistujú žiadne akcie",make_scheme:"vytvoriť schému",multiple:"Viacero"},time_picker:{no_timeslot_selected:"Najprv vyberte časový úsek",time_scheme:"Schému",time_input_mode:"Režim ovládania času"},conditions:{equal_to:"je",unequal_to:"nie je",all:"Všetko",any:"žiadny",no_conditions_defined:"Nie sú definované žiadne podmienky",track_conditions:"Prehodnoťte, keď sa zmenia podmienky"},options:{repeat_type:"správanie sa po spustení",period:"obdobie"},card_editor:{tabs:{entities:"Entity",other:"Iné"},fields:{title:{heading:"Názov karty",options:{standard:"štandardné",hidden:"skryté",custom:"vlastné"},custom_title:"Vlastný názov"},discover_existing:{heading:"Zobraziť všetky plány",description:"Tým sa nastaví parameter „objaviť existujúce“. Predtým vytvorené plány sa automaticky pridajú na kartu."},time_step:{heading:"Časový krok",description:"Rozlíšenie (v minútach) pre vytváranie plánov"},sort_by:{heading:"Možnosti triedenia",description:"Poradie, v akom sa rozvrhy zobrazujú na karte",options:{relative_time:"Zostávajúci čas do ďalšej akcie",title:"Zobrazený názov rozvrhu",state:"Zobraziť aktívne plány navrchu"}},display_format_primary:{heading:"Zobrazené primárne informácie",description:"V prehľade nakonfigurujte, ktorý štítok sa použije pre plány",options:{default:"Názov rozvrhu",entity_action:"Zhrnutie úlohy"}},display_format_secondary:{heading:"Zobrazené sekundárne informácie",description:"Nakonfigurujte, ktoré ďalšie vlastnosti sú viditeľné v prehľade",options:{relative_time:"Zostávajúci čas do ďalšej akcie",time:"Nastavený čas pre ďalšiu akciu",days:"Opakované dni v týždni",additional_tasks:"Počet dodatočných úloh"}},show_header_toggle:{heading:"Zobraziť prepínač hlavičky",description:"Zobraziť prepínač v hornej časti karty na povolenie/zakázanie všetkých entít"},tags:{heading:"Tagy",description:"Použite štítky na rozdelenie plánov medzi viacero kariet"},entities:{heading:"Zahrnuté entity",description:"Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",included_number:"{number}/{total} vybraný"}}}}},Ta={services:Aa,domains:Ca,ui:Ma},Da={generic:{parameter_to_value:"{parameter} v {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"nastavi temperaturo[ na {temperature}]",set_temperature_hvac_mode_heat:"ogrej[ na {temperature}]",set_temperature_hvac_mode_cool:"ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool:"ogrej/ohladi[ na {temperature}]",set_temperature_hvac_mode_heat_cool_range:"ogrej/ohladi[ na {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"samodejno[ na {temperature}]",set_hvac_mode:"nastavi način[ na {hvac_mode}]",set_preset_mode:"nastavi preset[ na {preset_mode}]",set_fan_mode:"nastavi ventilator[ na {fan_mode}]"},cover:{close_cover:"zapri",open_cover:"odpri",set_cover_position:"nastavi pozicijo[ na {position}]",set_cover_tilt_position:"nastavi naklon[ na {tilt_position}]"},fan:{set_speed:"nastavi hitrost[ na {speed}]",set_direction:"nastavi smer[ na {direction}]",oscillate:"nastavi obračanje[ na {oscillate}]"},humidifier:{set_humidity:"nastavi vlažnost[ na {humidity}]",set_mode:"nastavi način[ na {mode}]"},input_number:{set_value:"nastavi vrednost[ na {value}]"},input_select:{select_option:"izberi možnost[ {option}]"},select:{select_option:"izberi možnost[ {option}]"},light:{turn_on:"vključi[ z {brightness} brightness]"},media_player:{select_source:"Izberi vir[ {source}]"},notify:{notify:"pošlji sporočilo"},script:{script:"izvedi"},vacuum:{start_pause:"zaženi / ustavi"},water_heater:{set_operation_mode:"nastavi način[ na {operation_mode}]",set_away_mode:"nastavi način odsoten"}},Na={alarm_control_panel:"kontrolna plošča alarma",binary_sensor:"binarni sensorji",climate:"klime",cover:"rolete",fan:"ventilatorji",group:"skupine entitet",humidifier:"vlažilniki",input_boolean:"input boolean",input_number:"input number",input_select:"input select",lawn_mower:"lawn mower",light:"luči",lock:"ključavnice",media_player:"medijsi predvajalniki",notify:"obvestila",switch:"stikala",vacuum:"sesalniki",water_heater:"grelniki vode"},Pa={components:{date:{day_types_short:{daily:"dnevno",workdays:"delovniki",weekend:"vikend"},day_types_long:{daily:"vsak dan",workdays:"ob delovnikih",weekend:"ob vikendih"},days:"dni",tomorrow:"jutri",repeated_days:"vsakih {days}",repeated_days_except:"vsak dan razen {excludedDays}",days_range:"od {startDay} do {endDay}",next_week_day:"naslednji {weekday}"},time:{absolute:"ob {time}",interval:"od {startTime} do {endTime}",at_midnight:"opolnoči",at_noon:"opoldne",at_sun_event:"ob {sunEvent}"}},dialog:{enable_schedule:{title:"Zaključi spremembe",description:"Urnik, katerega ste spremenili je trenutno izključen, ali ga želite omogočiti?"},confirm_delete:{title:"Ali želite odstraniti entiteto?",description:"Ali ste prepričani, da želite odstraniti to entiteto?"},confirm_migrate:{title:"Spremenite urnik",description:"Nekatere nastavitve bodo s tem dejanjem izgubljene. Želite nadaljevati?"}},panel:{common:{title:"Urnik",new_schedule:"Nov urnik",default_name:"Urnik #{id}"},overview:{no_entries:"Ni vpisov za prikaz",backend_error:"Ni povezave s komponento urnika. Komponenta mora biti nameščena kot integracija, preden lahko uporabite to kartico.",excluded_items:"{number}{if number is 1} izločen predmet {else} izločenih predmetov",hide_excluded:"skrij izločene predmete",additional_tasks:"še {number}{if number is 1} opravilo {else} opravil"},entity_picker:{no_groups_defined:"Ni definiranih skupin",no_group_selected:"Najprej izberite skupino",no_entities_for_group:"V tej skupini ni entitet",no_entity_selected:"Najprej izberite entiteto",no_actions_for_entity:"Za to entiteto ni akcij",make_scheme:"izdelaj shemo",multiple:"Večkratno"},time_picker:{no_timeslot_selected:"Najprej izberi časovni okvir",time_scheme:"Shema",time_input_mode:"Način časovnega nadzora"},conditions:{equal_to:"je enako",unequal_to:"ni enako",all:"vse",any:"karkoli",no_conditions_defined:"Ni definiranih pogojev",track_conditions:"Ponovno preglej ko se pogoji spremenijo"},options:{repeat_type:"obnašanje, ko končaš",period:"perioda"},card_editor:{tabs:{entities:"Entitete",other:"Ostalo"},fields:{title:{heading:"Ime kartice",options:{standard:"standardno",hidden:"skrito",custom:"po meri"},custom_title:"Ime po želji"},discover_existing:{heading:"Prikaži vse urnike",description:"Tole nastavi parameter 'discover existing'. Prej kreirani urniki bodo samodejno dodani v kartico. "},time_step:{heading:"Časovni korak",description:"Ločljivost (v minutah) za kreiranje urnikov"},sort_by:{heading:"Možnosti sortiranja",description:"Zaporedje, po katerem se prikažejo urniki na kartici",options:{relative_time:"Preostali čas do naslednje akcije",title:"Prikazano ime urnika",state:"Prikaži aktivne urnike na vrhu"}},display_format_primary:{heading:"Prikazane primarne informacije",description:"Nastavite, kaj se prikazuje v pregledu urnikov",options:{default:"Ime urnika",entity_action:"Povzetek operacije"}},display_format_secondary:{heading:"Prikazane sekundarne informacije",description:"Nastavite, katere dodatne informacije želite imeti prikazane v pregledu",options:{relative_time:"Preostali čas do naslednje akcije",time:"Nastavljen čas za naslednjo akcijo",days:"Katere dni/kdaj se sproži akcija",additional_tasks:"Število dodatnih opravil"}},show_header_toggle:{heading:"Prikaži glavo",description:"Na vrhu prikaže stikalo, s katerim lahko omogočite/izključite vse entitete naenkrat"},tags:{heading:"Tag-i",description:"Uporabite tag-e za ločevanje urnikov med več karticami"},entities:{heading:"Vključene entitete",description:"Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",included_number:"{number}/{total} izbranih"}}}}},La={services:Da,domains:Na,ui:Pa},Ia={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool:"нагрів/охолодження[ to {temperature}]",set_temperature_hvac_mode_heat_cool_range:"нагрів/охолодження[ to {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"aвтоматичний[ to {temperature}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]",set_mode:"встановити режим[ to {mode}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},notify:{notify:"send notification"},script:{script:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_operation_mode:"встановити режим[ to {operation_mode}]",set_away_mode:"встановити режим Не вдома"}},qa={alarm_control_panel:"панель керування сигналізацією",binary_sensor:"binary sensors",climate:"клімат",cover:"жалюзі",fan:"вентилятори",group:"групи",humidifier:"зволожувачі",input_boolean:"логічні",input_number:"числові",input_select:"списки",lawn_mower:"lawn mower",light:"освітлення",lock:"замки",media_player:"медіаплеєри",notify:"notification",switch:"вимикачі",vacuum:"пилососи",water_heater:"водонагрівачі"},Va={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}",next_week_day:"наступної {weekday}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},dialog:{enable_schedule:{title:"Завершіть зміни",description:"Розклад, який було змінено, наразі вимкнено, чи потрібно його ввімкнути?"},confirm_delete:{title:"Видалити сутність?",description:"Ви дійсно бажаєте видалити цю сутність?"},confirm_migrate:{title:"Змінити розклад",description:"У результаті цієї дії деякі налаштування буде втрачено. Ви бажаєте продовжити?"}},panel:{common:{title:"Планувальник",new_schedule:"Новий розклад",default_name:"Розклад #{id}"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань"},entity_picker:{no_groups_defined:"Немає визначених груп",no_group_selected:"Спершу виберіть групу",no_entities_for_group:"В даній групі відсутні елементи",no_entity_selected:"Спершу виберіть елемент",no_actions_for_entity:"Немає дій для цього елемента",make_scheme:"створити схему",multiple:"Декілька"},time_picker:{no_timeslot_selected:"Спершу виберіть часовий проміжок",time_scheme:"Cхему",time_input_mode:"Time control mode"},conditions:{equal_to:"дорівнює",unequal_to:"не рівне",all:"всі",any:"будь-яке",no_conditions_defined:"Не визначені умови",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"поведінка після спрацювання",period:"період"}}},Ra={services:Ia,domains:qa,ui:Va},Ua={generic:{parameter_to_value:"{parameter} 至 {value}",action_with_parameter:"{action} 使用 {parameter}"},climate:{set_temperature:"设定温度[ 至 {temperature}]",set_temperature_hvac_mode_heat:"制热模式[ 至 {temperature}]",set_temperature_hvac_mode_cool:"制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool:"制热模式/制冷模式[ 至 {temperature}]",set_temperature_hvac_mode_heat_cool_range:"制热模式/制冷模式[ 至 {target_temp_low} - {target_temp_high}]",set_temperature_hvac_mode_auto:"自动[ 至 {temperature}]",set_hvac_mode:"设定模式[ 为 {hvac_mode}]",set_preset_mode:"设定预设模式[ 为 {preset_mode}]",set_fan_mode:"set fan mode[ to {fan_mode}]"},cover:{close_cover:"关闭",open_cover:"打开",set_cover_position:"设定位置[ 至 {position}]",set_cover_tilt_position:"设定倾斜位置[ 至 {tilt_position}]"},fan:{set_speed:"设定风速[ 至 {speed}]",set_direction:"设定方向[ 至 {direction}]",oscillate:"设置摇摆[ 至 {oscillate}]"},humidifier:{set_humidity:"设定湿度[ 至 {humidity}]",set_mode:"设定模式[ 为 {mode}]"},input_number:{set_value:"设定数值[ 至 {value}]"},input_select:{select_option:"选择选项[ {option}]"},select:{select_option:"选择选项[ {option}]"},light:{turn_on:"打开[ 并设定亮度为 {brightness}]"},media_player:{select_source:"选择播放源[ {source}]"},notify:{notify:"发送通知"},script:{script:"执行"},vacuum:{start_pause:"开始 / 暂停"},water_heater:{set_operation_mode:"设定模式[ 为 {operation_mode}]",set_away_mode:"设定离开模式"}},Ha={alarm_control_panel:"警戒控制面板",binary_sensor:"binary sensors",climate:"空调/地暖",cover:"窗帘",fan:"风扇/空气净化器",group:"实体组",humidifier:"空气加湿器",input_boolean:"输入二元选择器",input_number:"输入数值",input_select:"输入选择",lawn_mower:"lawn mower",light:"灯具",lock:"门锁",media_player:"媒体播放器",notify:"notification",switch:"开关",vacuum:"扫地机/吸尘器",water_heater:"热水器"},Ba={components:{date:{day_types_short:{daily:"每日",workdays:"工作日",weekend:"周末"},day_types_long:{daily:"每一天",workdays:"在工作日",weekend:"在周末"},days:"天",tomorrow:"明天",repeated_days:"每 {days}",repeated_days_except:"每天，除了 {excludedDays}",days_range:"从 {startDay} 至 {endDay}",next_week_day:"下{weekday}"},time:{absolute:"在 {time}",interval:"从 {startTime} 至 {endTime}",at_midnight:"在午夜",at_noon:"在正午",at_sun_event:"在 {sunEvent}"}},dialog:{enable_schedule:{title:"完成修改",description:"已更改的计划当前已禁用，是否应该启用？"},confirm_delete:{title:"是否删除实体？",description:"您确定要删除此实体吗？"},confirm_migrate:{title:"修改时间表",description:"此操作将丢失某些设置。 你想继续吗？"}},panel:{common:{title:"计划任务",new_schedule:"新时间表",default_name:"日程 #{id}"},overview:{no_entries:"无事项",backend_error:"计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",excluded_items:"{number} 除外 {if number is 1} 事项 {else} 事项",hide_excluded:"隐藏除外事项",additional_tasks:"{number} 更多 {if number is 1} 任务 {else} 任务"},entity_picker:{no_groups_defined:"未添加需执行计划任务的群组",no_group_selected:"请选择群组",no_entities_for_group:"群组不含实体",no_entity_selected:"请选择实体",no_actions_for_entity:"该实体不含可执行的动作",make_scheme:"制定计划",multiple:"多选"},time_picker:{no_timeslot_selected:"请选择时间段",time_scheme:"议程",time_input_mode:"Time control mode"},conditions:{equal_to:"是",unequal_to:"非",all:"全部",any:"任一",no_conditions_defined:"未定义条件",track_conditions:"Re-evaluate when conditions change"},options:{repeat_type:"触发后的行为",period:"时期"}}},Fa={services:Ua,domains:Ha,ui:Ba};const Za={cs:Xt,de:ai,en:li,es:hi,et:fi,es_419:hi,fi:xi,fr:Si,he:Ti,hu:Ii,it:Hi,lv:Wi,nb:sa,nl:Qi,nn:sa,no:sa,pl:da,pt:pa,"pt-BR":ya,ro:$a,sk:Object.freeze({__proto__:null,services:Aa,domains:Ca,ui:Ma,default:Ta}),sl:Object.freeze({__proto__:null,services:Da,domains:Na,ui:Pa,default:La}),ru:Ea,uk:Object.freeze({__proto__:null,services:Ia,domains:qa,ui:Va,default:Ra}),"zh-Hans":Object.freeze({__proto__:null,services:Ua,domains:Ha,ui:Ba,default:Fa})};function Ya(e,t,i="",a=""){let s;try{if("test"==t.language)return"TRANSLATED";s=e.split(".").reduce((e,t)=>e[t],Za[t.language]),s||(s=e.split(".").reduce((e,t)=>e[t],Za.en))}catch(t){try{s=e.split(".").reduce((e,t)=>e[t],Za.en)}catch(e){s=""}}if(""!==i&&""!==a&&s){Array.isArray(i)||(i=[i]),Array.isArray(a)||(a=[a]);for(let e=0;e<i.length;e++){s=s.replace(String(i[e]),String(a[e]));const t=s.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){s=String(a[e])==t[2]?s.replace(t[0],t[3]):s.replace(t[0],t[4])}}}return s}const Wa={alarm_control_panel:{alarm_disarm:"ui.card.alarm_control_panel.disarm",alarm_arm_home:"ui.card.alarm_control_panel.arm_home",alarm_arm_away:"ui.card.alarm_control_panel.arm_away",alarm_arm_night:"ui.card.alarm_control_panel.arm_night",alarm_arm_custom_bypass:"ui.card.alarm_control_panel.arm_custom_bypass",alarm_arm_vacation:"ui.card.alarm_control_panel.arm_vacation"},automation:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off",trigger:"ui.card.script.run"},button:{press:"ui.card.button.press"},climate:{turn_off:"ui.card.vacuum.actions.turn_off",heat:"services.climate.set_temperature_hvac_mode_heat",cool:"services.climate.set_temperature_hvac_mode_cool",heat_cool:"services.climate.set_temperature_hvac_mode_heat_cool",heat_cool_range:"services.climate.set_temperature_hvac_mode_heat_cool_range",auto:"services.climate.set_temperature_hvac_mode_auto",set_temperature:"services.climate.set_temperature",set_mode:"services.climate.set_hvac_mode",set_preset:"services.climate.set_preset_mode",set_fan_mode:"services.climate.set_fan_mode"},cover:{close:"services.cover.close_cover",open:"services.cover.open_cover",set_position:"services.cover.set_cover_position",set_tilt:"services.cover.set_cover_tilt_position"},fan:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off",set_speed:"services.fan.set_speed",set_oscillation:"services.fan.oscillate",set_direction:"services.fan.set_direction",set_preset:"services.climate.set_preset_mode"},humidifier:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off",set_humidity:"services.humidifier.set_humidity",set_mode:"services.humidifier.set_mode"},input_boolean:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off"},input_button:{press:"ui.card.button.press"},input_number:{set_value:"services.input_number.set_value"},input_select:{select_option:"services.input_select.select_option"},lawn_mower:{start_mowing:"ui.card.lawn_mower.actions.start_mowing",pause:"ui.card.timer.actions.pause",dock:"ui.card.lawn_mower.actions.dock"},light:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off"},lock:{lock:"ui.card.lock.lock",unlock:"ui.card.lock.unlock"},media_player:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off",select_source:"services.media_player.select_source"},notify:{"{entity_id}":"services.notify.notify"},number:{set_value:"services.input_number.set_value"},scene:{turn_on:"ui.card.vacuum.actions.turn_on"},script:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off","{entity_id}":"services.script.script"},select:{select_option:"services.input_select.select_option"},switch:{turn_on:"ui.card.vacuum.actions.turn_on",turn_off:"ui.card.vacuum.actions.turn_off"},vacuum:{turn_on:"ui.card.vacuum.actions.turn_on",start:"ui.card.vacuum.start_cleaning",play_pause:"services.vacuum.start_pause"},water_heater:{set_temperature:"services.climate.set_temperature",set_mode:"services.water_heater.set_operation_mode",set_away_mode:"services.water_heater.set_away_mode"}},Ga=(e,t,i)=>{if(e in Wa&&t in Wa[e]){let a=Wa[e][t];return a instanceof Function&&(a=a(t)),a.startsWith("services")?Ya(a,rt(i)):i.localize(a)}return t},Ka=(e,t)=>{const i="close"==e;switch(null==t?void 0:t.attributes.device_class){case"garage":return i?"mdi:garage":"mdi:garage-open";case"door":return i?"mdi:door-closed":"mdi:door-open";case"blind":return i?"mdi:blinds":"mdi:blinds-open";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:window-shutter":"mdi:window-shutter-open"}},Ja={alarm_control_panel:{alarm_disarm:"mdi:lock-open-variant-outline",alarm_arm_home:"mdi:home-outline",alarm_arm_away:"mdi:exit-run",alarm_arm_night:"mdi:power-sleep",alarm_arm_custom_bypass:"mdi:shield-lock-outline",arm_vacation:"mdi:shield-airplane"},automation:{turn_on:"mdi:power",turn_off:"mdi:power-off",trigger:"mdi:play"},button:{press:"mdi:gesture-tap-button"},climate:{turn_off:"mdi:power-off",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:thermometer",heat_cool_range:"mdi:thermometer",set_temperature:"mdi:thermometer",auto:"mdi:autorenew",set_mode:"mdi:cog-transfer-outline",set_preset:"mdi:cloud-download-outline",set_fan_mode:"mdi:fan"},cover:{close:Ka,open:Ka,set_position:"mdi:ray-vertex",set_tilt_position:"mdi:valve"},fan:{turn_on:"mdi:power",turn_off:"mdi:power-off",set_percentage:"mdi:weather-windy",set_oscillation:"mdi:arrow-left-right",set_direction:"mdi:cog-clockwise",set_preset_mode:"mdi:cloud-download-outline"},humidifier:{turn_on:"mdi:power",turn_off:"mdi:power-off",set_humidity:"mdi:water-percent",set_mode:"mdi:cog-transfer-outline"},input_boolean:{turn_on:"mdi:flash",turn_off:"mdi:flash-off"},input_button:{press:"mdi:gesture-tap-button"},input_number:{set_value:"mdi:counter"},input_select:{select_option:"mdi:counter"},lawn_mower:{start_mowing:"mdi:play",pause:"mdi:pause",dock:"mdi:home-import-outline"},light:{turn_on:"mdi:lightbulb",turn_off:"mdi:lightbulb-off"},lock:{lock:"mdi:lock-outline",unlock:"mdi:lock-open-variant-outline"},media_player:{turn_on:"mdi:power",turn_off:"mdi:power-off",select_source:"mdi:music-box-multiple-outline"},notify:{"{entity_id}":"mdi:message-alert"},number:{set_value:"mdi:counter"},scene:{turn_on:"mdi:play"},script:{turn_on:"mdi:flash",turn_off:"mdi:flash-off","{entity_id}":"mdi:play"},select:{select_option:"mdi:counter"},switch:{turn_on:"mdi:flash",turn_off:"mdi:flash-off"},vacuum:{turn_on:"mdi:power",start:"mdi:play-circle-outline",play_pause:"mdi:play-circule-outline"},water_heater:{set_temperature:"mdi:thermometer",set_mode:"mdi:cog-transfer-outline",set_away_mode:"mdi:car-traction-control"}},Xa=(e,t,i)=>{if(e in Ja&&t in Ja[e]){let a=Ja[e][t];return a instanceof Function&&(a=a(t,i)),a}return"flash"},Qa={climate:{temperature:"ui.card.weather.attributes.temperature",target_temp_low:"ui.panel.lovelace.editor.card.generic.minimum",target_temp_high:"ui.panel.lovelace.editor.card.generic.maximum",hvac_mode:"ui.card.climate.operation",preset_mode:"ui.card.climate.preset_mode",fan_mode:"ui.card.climate.fan_mode"},cover:{position:"ui.card.cover.position",tilt_position:"ui.card.cover.tilt_position"},fan:{percentage:"ui.card.fan.speed",oscillating:"ui.card.fan.oscillate",direction:"ui.card.fan.direction",preset_mode:"ui.card.fan.preset_mode"},humidifier:{humidity:"ui.card.humidifier.humidity",mode:"ui.card.humidifier.mode"},input_number:{value:"ui.panel.config.helpers.types.input_number"},input_select:{option:"ui.components.dialogs.input_select.options"},light:{brightness:"ui.card.light.brightness"},media_player:{source:"ui.card.media_player.source"},notify:{title:"ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title",message:"ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message"},number:{value:"ui.panel.config.helpers.types.input_number"},select:{option:"ui.components.dialogs.input_select.options"},water_heater:{temperature:"ui.card.weather.attributes.temperature",operation_mode:"ui.card.water_heater.operation",away_mode:"ui.card.water_heater.away_mode"}},es=(e,t,i)=>e in Qa&&t in Qa[e]?i.localize(Qa[e][t]):t,ts={climate:{hvac_mode:{off:"component.climate.entity_component._.state.off",heat:"component.climate.entity_component._.state.heat",cool:"component.climate.entity_component._.state.cool",heat_cool:"component.climate.entity_component._.state.heat_cool",dry:"component.climate.entity_component._.state.dry",fan_only:"component.climate.entity_component._.state.fan_only"},preset_mode:{activity:"state_attributes.climate.preset_mode.activity",away:"state_attributes.climate.preset_mode.away",boost:"state_attributes.climate.preset_mode.boost",comfort:"state_attributes.climate.preset_mode.comfort",eco:"state_attributes.climate.preset_mode.eco",home:"state_attributes.climate.preset_mode.home",none:"state_attributes.climate.preset_mode.none",sleep:"state_attributes.climate.preset_mode.sleep"}},fan:{direction:{forward:"ui.card.fan.forward",reverse:"ui.card.fan.reverse"},oscillating:{True:"state.default.on",False:"state.default.off"}},humidifier:{mode:{auto:"state_attributes.humidifier.mode.auto",away:"state_attributes.humidifier.mode.away",baby:"state_attributes.humidifier.mode.baby",boost:"state_attributes.humidifier.mode.boost",comfort:"state_attributes.humidifier.mode.comfort",eco:"state_attributes.humidifier.mode.eco",home:"state_attributes.humidifier.mode.home",normal:"state_attributes.humidifier.mode.normal",sleep:"state_attributes.humidifier.mode.sleep"}},water_heater:{operation_mode:{off:"component.water_heater.entity_component._.state.off",eco:"component.water_heater.entity_component._.state.eco",electric:"component.water_heater.entity_component._.state.electric",gas:"component.water_heater.entity_component._.state.gas",heat_pump:"component.water_heater.entity_component._.state.heat_pump",high_demand:"component.water_heater.entity_component._.state.high_demand",performance:"component.water_heater.entity_component._.state.performance"},away_mode:{on:"state.default.on",off:"state.default.off"}}},is=(e,t,i,a)=>e in ts&&t in ts[e]&&i in ts[e][t]?a.localize(ts[e][t][i]):i,as={climate:{hvac_mode:{off:"mdi:power-off",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:thermometer",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"},preset_mode:{activity:"mdi:account-alert-outline",away:"mdi:car-traction-control",boost:"mdi:rocket-launch-outline",comfort:"mdi:car-seat-cooler",eco:"mdi:leaf",home:"mdi:home-outline",none:"mdi:cancel",sleep:"mdi:sleep"}},fan:{direction:{forward:"mdi:autorenew",reverse:"mdi:sync"},oscillating:{True:"mdi:toggle-switch-outline",False:"mdi:toggle-switch-off-outline"}},humidifier:{mode:{auto:"mdi:autorenew",away:"mdi:car-traction-control",baby:"mdi:baby-bottle-outline",boost:"mdi:rocket-launch-outline",comfort:"mdi:car-seat-cooler",eco:"mdi:leaf",home:"mdi:home-outline",normal:"mdi:account-outline",sleep:"mdi:sleep"}},water_heater:{operation_mode:{off:"mdi:power-off",eco:"mdi:leaf",electric:"mdi:lightning-bolt",gas:"mdi:fire",heat_pump:"mdi:hvac",high_demand:"mdi:water-plus-outline",performance:"mdi:rocket-launch-outline"},away_mode:{on:"mdi:toggle-switch-outline",off:"mdi:toggle-switch-off-outline"}}},ss=(e,t,i)=>{if(e in as&&t in as[e]&&i in as[e][t])return as[e][t][i]};function os(e,t,i=!1){const a=(e,t)=>Object.keys(t.variables||{}).includes(e)&&t.variables[e].type==$t.Level&&t.variables[e].optional;if(e.service!==t.service)return!1;const s=Object.keys(e.service_data||{}),o=Object.keys(e.variables||{}),n=Object.keys(t.service_data||{}),r=Object.keys(t.variables||{}),l=[...new Set([...s,...o])],d=[...new Set([...n,...r])];return[...new Set([...l,...d])].every(c=>{if(!l.includes(c))return a(c,t);if(!d.includes(c))return a(c,e);if(s.filter(e=>!o.includes(e)).includes(c)&&n.filter(e=>!r.includes(e)).includes(c))return tt(e.service_data[c],t.service_data[c]);if(o.includes(c)&&r.includes(c))return!0;if(!i)return!1;const u=s.includes(c)?e.service_data[c]:t.service_data[c],m=o.includes(c)?e.variables[c]:t.variables[c];return m.type===$t.List?m.options.some(e=>e.value===u):m.type===$t.Level?!isNaN(u):m.type==$t.Text})}function ns(e){if(Object.keys(e||{}).length)return Object.entries(e).map(([e,t])=>"options"in t?[e,Ft(t)]:"min"in t||"max"in t?[e,Pt(t)]:[e,Yt(t)]).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{})}function rs(...e){const t=Qe(e.map(e=>e.type).filter(et));return t.length?t.length>1?void 0:t[0]==$t.Level?Pt(...e):t[0]==$t.List?Ft(...e):Yt(...e):(e=Object.values(ns(Object.assign({},...e))),rs(...e))}function ls(e){if(1==e.length)return e[0];let t=e[0].filter(t=>e.slice(1).every(e=>e.some(e=>os(t,e))));return t=t.map(t=>{const i=Object.entries(t.variables||{}).map(([i,a])=>{const s=e.map(e=>e.find(e=>os(e,t)));if(!s.every(e=>e&&e.variables&&i in e.variables))return[i,void 0];const o=s.map(e=>e.variables[i]);return o.every(e=>a.type==e.type)?[i,rs(...o)]:[i,void 0]}).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{});if(!Object.values(i).find(e=>e.type==$t.List&&!e.options.length))return t=Object.assign(Object.assign({},t),{variables:i})}).filter(et),t}const ds=(e,t,i=!0)=>{const a=Pe(e);if("group"==a){const a=t.states[e],s=Ct(a,"entity_id");if(!s.length)return[];const o=s.map(e=>ds(e,t,i));return function(e,t,i){const a=t&&t.attributes.entity_id&&Array.isArray(t.attributes.entity_id)?t.attributes.entity_id:[];return i=i.map((t,i)=>{const s=e.states[a[i]],o=It(s);return t=t.filter(e=>!e.supported_feature||e.supported_feature&o).map(e=>Je(e,"supported_feature"))}),[...new Set(a.map(e=>Pe(e)))].length>1&&(i=i.map(e=>e.map(e=>"turn_on"==Le(e.service)||"turn_off"==Le(e.service)?Object.assign(Object.assign({},e),{service:"homeassistant."+Le(e.service),icon:"turn_on"==Le(e.service)?"flash":"flash-off"}):e))),i.length?ls(i):[]}(t,a,o)}return Object.keys(Bt).includes(a)?Object.entries(Bt[a]).map(([a,s])=>cs(a,s,e,t,i)).filter(et):[]},cs=(e,t,i,a,s)=>{const o=Pe(i),n=a.states[i];if(t.condition&&!t.condition(n))return;e.startsWith("_")&&(e=e=e.substring(1));let r={name:"",icon:"flash",service:t.service?`${o}.${t.service}`:`${o}.${e}`,service_data:t.service_data};if(t.supported_feature){const e=t.supported_feature instanceof Function?t.supported_feature(n):t.supported_feature;r=Object.assign(Object.assign({},r),{supported_feature:e})}if(r=Object.assign(Object.assign({},r),{name:Ga(o,e,a),icon:Xa(o,e,n)}),Object.keys(t.variables||{}).forEach(e=>{r=Object.assign(Object.assign({},r),{variables:Object.assign(Object.assign({},r.variables),{[e]:us(o,e,t.variables[e],n,a,s)})})}),Object.values(r.variables||{}).some(e=>e.type==$t.List&&!e.options.length))return;const l=r.service.match(/^[a-z_]+\.(\{entity_id\})$/);return l&&(r=Object.assign(Object.assign({},r),{service:r.service.replace(l[1],Le(i))})),r},us=(e,t,i,a,s,o)=>{let n=Tt(i,a,s);if(n=Object.assign(Object.assign({},n),{name:es(e,t,s)}),"options"in n&&et(n.options)){let i=[...n.options];if(!o){const a=((e,t)=>e in ts&&t in ts[e]?Object.keys(ts[e][t]):[])(e,t).filter(e=>!i.map(e=>e.value).includes(e));i=[...i,...a.map(e=>Object({value:e}))]}return i=i.map(i=>Object.assign(i,{name:i.name?i.name:is(e,t,i.value,s),icon:i.icon?i.icon:ss(e,t,i.value)})),n=Object.assign(Object.assign({},n),{options:i}),Ft(n)}return"min"in n&&et(n.min)&&"max"in n&&et(n.max)?Pt(n):Yt(n)},ms=/\{([^\}]+)\}/,hs=/\[([^\]]+)\]/;function ps(e){let t=e.name;t||(t=st(Le(e.service)));const i=(t,a=0)=>{const s=ms.exec(t);if(!s)return t;const o=s[1];if(!Object.keys(e.service_data||{}).includes(o))return t.replace(s[0],"");let n;return n=Object.keys(e.variables||{}).includes(o)?e.variables[o].type==$t.Level?Lt(e.service_data[o],e.variables[o]):e.variables[o].type==$t.List?Zt(e.service_data[o],e.variables[o]):function(e,t){return String(e)}(e.service_data[o],e.variables[o]):e.service_data[o],t=t.replace(s[0],n),a>=100?t:i(t)},a=(t,s=0)=>{const o=hs.exec(t);if(!o)return t;const n=o[1].match(ms)[1];return t=Object.keys(e.service_data||{}).includes(n)?t.replace(o[0],i(o[1])):t.replace(o[0],""),s>=100?t:a(t)};return t=a(t),t=i(t),t||""}function _s(e,t,i){if(Array.isArray(e)){return ls(e.map(e=>_s(e,t,i)))}const a=t.states[e];let s=i.standard_configuration?ds(e,t):[];const o=Xe(Object.entries(i.customize).filter(([t])=>mt(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.exclude_actions).filter(et));o.length&&(s=s.filter(e=>!o.some(t=>{return(i=ps(e),i.replace(/_/g," ").trim().toLowerCase()).includes(t);var i})));const n=Xe(Object.entries(i.customize).filter(([t])=>mt(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.actions).filter(et));n.length&&n.forEach(a=>{Pe(a.service).length||(a=Object.assign(Object.assign({},a),{service:Pe(e)+"."+Le(a.service)})),a.service_data&&(a=Object.assign(Object.assign({},a),{service_data:Je(a.service_data,"entity_id")}));let o=s.findIndex(e=>os(e,a));if(o<0){const n=(i.standard_configuration?ds(e,t,!1):[]).find(e=>os(e,a));n&&(s=[...s,n],o=s.length-1)}if(o>=0){if(Object.assign(s,{[o]:Object.assign(Object.assign({},s[o]),Je(a,"variables"))}),Object.keys(a.variables||{}).length){let e=s[o].variables||{};e=Object.entries(e).map(([e,t])=>Object.keys(a.variables).includes(e)?[e,Object.assign(Object.assign({},t),a.variables[e])]:[e,a.variables[e]]).reduce((e,[t,i])=>i?Object.assign(e,{[t]:i}):e,{});const t=Object.keys(a.variables).filter(t=>!Object.keys(e).includes(t));e=Object.assign(Object.assign({},e),ns(Ke(a.variables,t))),Object.assign(s,{[o]:Object.assign(Object.assign({},s[o]),{variables:e})})}}else a=Object.assign(Object.assign({},a),{variables:ns(a.variables)}),s.push(a)});const r=It(a);return s=s.filter(e=>!e.supported_feature||e.supported_feature&r),s=s.map(e=>(Object.keys(e.variables||{}).length&&Object.keys(e.variables).forEach(t=>{e.variables[t].type==$t.List&&1==e.variables[t].options.length&&(e=Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{[t]:e.variables[t].options[0].value}),variables:Je(e.variables,t)}))}),e)),s}function vs(e,t){const i=e.entity_id||e.service,a=e.service,s=e.service_data||{},o=Object.keys(s);let n=ds(i,t,!1),r=n.filter(t=>os(e,t,!0));if(1==r.length?n=r:(n=n.filter(e=>e.service==a),n=n.filter(e=>Object.keys(e.service_data||{}).every(e=>o.includes(e)))),n.length>1&&n.sort((e,t)=>{const i=Object.entries(e.service_data||{}).map(([e,t])=>e in s?s[e]==t?1:-1:0).reduce((e,t)=>e+t,0),a=Object.entries(t.service_data||{}).map(([e,t])=>e in s?s[e]==t?1:-1:0).reduce((e,t)=>e+t,0);if(i>a)return-1;if(i<a)return 1;const n=Qe([...Object.keys(e.service_data||{}),...Object.keys(e.variables||{})]),r=Qe([...Object.keys(t.service_data||{}),...Object.keys(t.variables||{})]),l=o.filter(e=>n.includes(e)).length,d=o.filter(e=>r.includes(e)).length;if(l>d)return-1;if(l<d)return 1;const c=n.filter(e=>!o.includes(e)).length,u=r.filter(e=>!o.includes(e)).length;return c>u?1:c<u?-1:0}),n.length){let e=Object.assign({},n[0].variables||{});return Object.entries(s).forEach(([t,i])=>{Object.keys(e||{}).includes(t)&&e[t].type==$t.List&&(e=Object.assign(Object.assign({},e),{[t]:e[t].options.some(e=>e.value==i)?e[t]:Object.assign(Object.assign({},e[t]),{options:[...e[t].options,{value:i}]})}))}),Object.assign(Object.assign({},n[0]),{service_data:Object.assign(Object.assign({},n[0].service_data||{}),s),variables:e})}return{service:a,service_data:e.service_data}}function gs(e,t){var i;const a=(e,t)=>((t.include||[]).some(t=>mt(t,e))||Object.keys(t.customize||{}).some(t=>mt(t,e)))&&!(t.exclude||[]).some(t=>mt(t,e));return(null===(i=t.groups)||void 0===i?void 0:i.some(t=>a(e,t)))||a(e,t)}const fs=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],ys=(e,t,i)=>{if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}if((()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1})())return e.toLocaleDateString(t.language,{weekday:i?"short":"long"});{const t=e.getDay();return i?fs[t].substr(0,3):fs[t]}};function bs(e){return e.includes("daily")?St.Daily:e.includes("workday")?St.Workday:e.includes("weekend")?St.Weekend:St.Custom}var ks;!function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ks||(ks={}));const ws=e=>{if(e.time_format===ks.language||e.time_format===ks.system){const t=e.time_format===ks.language?e.language:void 0,i=(new Date).toLocaleString(t);return i.includes("AM")||i.includes("PM")}return e.time_format===ks.am_pm};function xs(e,t,i){return i===ks.am_pm||!i&&t.time_format===ks.am_pm?Me(e,"h:mm A"):i===ks.twenty_four||!i&&t.time_format===ks.twenty_four?Me(e,"shortTime"):(()=>{try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1})()?e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit",hour12:ws(t)}):ws(t)?xs(e,t,ks.am_pm):xs(e,t,ks.twenty_four)}function $s(e){let t=new Date;const i=(e||"").match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);null!==i&&t.setFullYear(Number(i[1]),Number(i[2])-1,Number(i[3]));const a=(e||"").match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);return null!==a&&t.setHours(Number(a[1]),Number(a[2]),a.length>4?Number(a[4]):t.getSeconds()),t}const js=(e,t,i)=>lt(t.display_options&&t.display_options.primary_info?t.display_options.primary_info:"{entity}: {action}").map(a=>Ss(a,e,t,i)),zs=(e,t,i)=>lt(t.display_options&&t.display_options.secondary_info?t.display_options.secondary_info:["relative-time","additional-tasks"]).map(a=>Ss(a,e,t,i)),Os=(e,t,i)=>{if(t.display_options&&t.display_options.icon&&"entity"==t.display_options.icon){const a=As(e,t,i);return 1==Qe(a.map(e=>e.icon)).length?a[0].icon:ut(a[0].id,i)}return Es(e,t,i).icon},Ss=(e,t,i,a)=>{switch(e){case"default":return Ss("name",t,i,a)||`${Ss("entity",t,i,a)}: ${Ss("action",t,i,a)}`;case"name":return t.name||"";case"relative-time":return"<my-relative-time></my-relative-time>";case"additional-tasks":return t.timeslots.length>1?"+"+Ya("ui.panel.overview.additional_tasks",rt(a),"{number}",String(t.timeslots.length-1)):"";case"time":return at(((e,t)=>{const i=e=>{const i=Ge(e);if(!i)return e;const a=i.event==Ot.Sunrise?"de"==rt(t).language?t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise"):t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").toLowerCase():"de"==rt(t).language?t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset"):t.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset").toLowerCase();if(Math.abs(Ze(i.offset,t))<300)return Ya("ui.components.time.at_sun_event",rt(t),"{sunEvent}",a);const s="-"==i.sign?t.localize("ui.panel.config.automation.editor.conditions.type.sun.before").replace(/[^a-z]/gi,"").toLowerCase():t.localize("ui.panel.config.automation.editor.conditions.type.sun.after").replace(/[^a-z]/gi,"").toLowerCase();return`${xs($s(i.offset),rt(t),De.twenty_four)} ${s} ${a}`};if(e.stop){const a=Ge(e.start)?i(e.start):xs($s(e.start),rt(t)),s=Ge(e.stop)?i(e.stop):xs($s(e.stop),rt(t));return Ya("ui.components.time.interval",rt(t),["{startTime}","{endTime}"],[a,s])}{const a=e.start;if(Ge(a))return i(a);{const e=$s(a);return Ya("ui.components.time.absolute",rt(t),"{time}",xs(e,rt(t)))}}})(t.timeslots[t.next_entries[0]],a));case"days":return at(((e,t)=>{if(!t)return"";switch(bs(e)){case St.Daily:return Ya("ui.components.date.day_types_long.daily",rt(t));case St.Workday:return Ya("ui.components.date.day_types_long.workdays",rt(t));case St.Weekend:return Ya("ui.components.date.day_types_long.weekend",rt(t));case St.Custom:const i=e.map(e=>{switch(e){case"mon":return 1;case"tue":return 2;case"wed":return 3;case"thu":return 4;case"fri":return 5;case"sat":return 6;case"sun":return 7;default:return}}).filter(e=>e),a=function(e){const t=[];for(let i=0;i<e.length-1;i++){let a=i+1;for(;e[a]-e[a-1]==1;)a++;t.push(a-i)}return t}(i),s=Math.max(...a);if(6==i.length){const e=[1,2,3,4,5,6,7].filter(e=>!i.includes(e));return Ya("ui.components.date.repeated_days_except",rt(t),"{excludedDays}",ys(e.pop(),rt(t)))}const o=i.map(e=>ys(e,rt(t)));if(i.length>=3&&s>=3){const e=a.reduce((e,t,i)=>t==s?i:e,0);o.splice(e,s,Ya("ui.components.date.days_range",rt(t),["{startDay}","{endDay}"],[o[e],o[e+s-1]]))}const n=o.length>1?`${o.slice(0,-1).join(", ")} ${t.localize("ui.common.and")} ${o.pop()}`:""+o.pop();return Ya("ui.components.date.repeated_days",rt(t),"{days}",n);default:return""}})(t.weekdays,a));case"entity":const s=As(t,i,a),o=Qe(s.map(e=>Pe(e.id)));return 1==s.length?at(st(s[0].name||"")):1==o.length?`${s.length}x ${Ya("domains."+o[0],rt(a))||o[0]}`:s.length+"x entities";case"action":return at(ps(Es(t,i,a)));case"tags":return(t.tags||[]).map(e=>`<tag>${e}</tag>`).join("");default:const n=/\{([^\}]+)\}/;let r;for(;r=n.exec(e);)e=e.replace(r[0],String(Ss(String(r[1]),t,i,a)));return e}},Es=(e,t,i)=>{const a=e.timeslots[e.next_entries[0]],s=_s(a.actions[0].entity_id||a.actions[0].service,i,t).filter(e=>os(e,a.actions[0],!0)).reduce((e,t)=>t,void 0);return s?Object.assign(Object.assign({},s),{service_data:Object.assign(Object.assign({},s.service_data),Object.entries(a.actions[0].service_data||{}).filter(([e])=>Object.keys(s.variables||{}).includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}))}):vs(a.actions[0],i)},As=(e,t,i)=>Qe(e.timeslots[e.next_entries[0]].actions.map(e=>e.entity_id||e.service)).map(e=>ht(e,i,t)),Cs=e=>{class i extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([de({attribute:!1})],i.prototype,"hass",void 0),i},Ms=2;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class Ts extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){if(super(e),this.et=R,e.type!==Ms)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===R||null==e)return this.ft=void 0,this.et=e;if(e===V)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ts.directiveName="unsafeHTML",Ts.resultType=1;const Ds=(e=>(...t)=>({_$litDirective$:e,values:t}))(Ts),Ns=r`
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

    
    .content {
      padding: 0px 24px 16px 24px;
    }
    .buttons {
      box-sizing: border-box;
      display: flex;
      padding: 24px;
      padding-top: 16px;
      justify-content: space-between;
      padding-bottom: max(env(safe-area-inset-bottom), 24px);
      background-color: var(--mdc-theme-surface, #fff);
      border-top: 1px solid var(--divider-color);
      position: sticky;
      bottom: 0px;
    }
    .buttons.centered {
      flex-wrap: wrap;
      justify-content: center;
    }
  `,Ps=r`
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
    --dialog-content-padding: 0px;
  }
  ha-dialog .form {
    color: var(--primary-text-color);
  }
  a {
    color: var(--primary-color);
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
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  .error {
    color: var(--error-color);
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
  :host([tab='time']) ha-dialog {
    --dialog-content-padding: 0px;
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
  mwc-tab[disabled] {
    --mdc-tab-text-label-color-default: var(--material-disabled-text-color);
    pointer-events: none;
  }
`;var Ls="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Is="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";const qs={alarm_control_panel:"domains.alarm_control_panel",automation:"ui.dialogs.quick-bar.commands.navigation.automation",binary_sensor:"domains.binary_sensor",calendar:"panel.calendar",climate:"domains.climate",cover:"domains.cover",fan:"domains.fan",group:"domains.group",humidifier:"domains.humidifier",input_boolean:"domains.input_boolean",input_number:"domains.input_number",input_select:"domains.input_select",lawn_mower:"domains.lawn_mower",light:"domains.light",lock:"domains.lock",media_player:"domains.media_player",notify:"domains.notify",person:"ui.dialogs.quick-bar.commands.navigation.person",scene:"ui.dialogs.quick-bar.commands.navigation.scene",script:"ui.dialogs.quick-bar.commands.navigation.script",sensor:"ui.panel.config.devices.entities.sensor",sun:"ui.panel.config.automation.editor.conditions.type.sun.label",switch:"domains.switch",vacuum:"domains.vacuum",water_heater:"domains.water_heater"},Vs=(e,t)=>{if(e in qs){const i=qs[e],a=i.startsWith("domains")?Ya(i,rt(t)):t.localize(i);if(a)return a}return e};function Rs(e,t,i){let a=[];t.groups&&t.groups.forEach(t=>{e.find(e=>gs(e,t))&&(a=[...a,{name:t.name,icon:t.icon||"folder-outline",entities:e.filter(e=>gs(e,t))}])});const s=e.filter(e=>!a.some(t=>t.entities.includes(e)));return s.map(Pe).filter((e,t,i)=>i.indexOf(e)===t).forEach(e=>{a=[...a,{name:Vs(e,i),icon:(void 0===t.standard_configuration||t.standard_configuration)&&e in ct?ct[e]:"folder-outline",entities:s.filter(t=>gs(t,{include:[e],exclude:[]}))}]}),a}const Us={options:["on","off"]},Hs={alarm_control_panel:{template:e=>{let t=["disarmed","triggered"];const i=At(e,"supported_features")||0;return 2&i&&(t=[...t,"armed_away"]),1&i&&(t=[...t,"armed_home"]),4&i&&(t=[...t,"armed_night"]),16&i&&(t=[...t,"armed_custom_bypass"]),32&i&&(t=[...t,"armed_vacation"]),{options:t}}},binary_sensor:Us,climate:{options:"hvac_modes"},calendar:Us,cover:{options:["open","closed"]},device_tracker:{options:["home","not_home"]},fan:Us,humidifier:Us,input_boolean:Us,input_number:{min:"min",max:"max",unit:"unit_of_measurement",step:"step"},input_select:{options:"options"},light:Us,lock:{options:["locked","unlocked"]},number:{min:"min",max:"max",step:"step"},person:{template:(e,t)=>{const i=Object.keys(t.states).filter(e=>"zone"==Pe(e)).map(Le);return{options:[...new Set(["home","not_home",...i])]}}},proximity:{unit:"unit_of_measurement"},select:{options:"options"},sensor:{template:e=>e&&!isNaN(Number(e.state))?"%"==Mt(e,"unit_of_measurement")?{min:0,max:100,unit:"%",step:1}:{unit:"unit_of_measurement"}:{}},sun:{options:["below_horizon","above_horizon"]},switch:Us,timer:{options:["active","paused","idle"]},water_heater:{options:"operation_list"}},Bs=(e,t)=>He(Object.assign(Object.assign({},e),{state:t})),Fs=(e,t)=>{const i="closed"==t;switch(e.attributes.device_class){case"garage":return i?"mdi:garage":"mdi:garage-open";case"door":return i?"mdi:door-closed":"mdi:door-open";case"blind":return i?"mdi:blinds":"mdi:blinds-open";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:window-shutter":"mdi:window-shutter-open"}},Zs={alarm_control_panel:{disarmed:"mdi:lock-open-variant-outline",armed_away:"mdi:exit-run",armed_home:"mdi:home-outline",armed_night:"mdi:power-sleep",triggered:"mdi:alarm-light-outline"},binary_sensor:{on:Bs,off:Bs},calendar:{on:"mdi:flash",off:"mdi:flash-off"},climate:{off:"mdi:power-off",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:thermometer",auto:"mdi:autorenew",dry:"mdi:water-percent",fan_only:"mdi:fan"},cover:{closed:Fs,open:Fs},device_tracker:{home:"mdi:home-outline",not_home:"mdi:exit-run"},fan:{on:"mdi:power",off:"mdi:power-off"},humidifier:{on:"mdi:power",off:"mdi:power-off"},input_boolean:{on:"mdi:flash",off:"mdi:flash-off"},light:{on:"mdi:lightbulb",off:"mdi:lightbulb-off"},lock:{unlocked:"mdi:lock-open-variant-outline",locked:"mdi:lock-outline"},person:(e,t,i)=>{const a={home:"mdi:home-outline",not_home:"mdi:exit-run"};return Object.keys(i.states).filter(e=>"zone"==Pe(e)).forEach(e=>{const t=Le(e),s=i.states[e].attributes.icon;s&&(a[t]=s)}),t in a?a[t]:"mdi:flash"},sensor:{unit:"attributes.unit_of_measurement"},sun:{below_horizon:"mdi:weather-sunny-off",above_horizon:"mdi:weather-sunny"},switch:{on:"mdi:flash",off:"mdi:flash-off"},timer:{active:"mdi:play",paused:"mdi:pause",idle:"mdi:sleep"}},Ys=(e,t,i,a)=>{const s=Pe(e.entity_id);if(t||(t=e.state),s in Zs){if(t in Zs[s]){const a=Zs[s][t];return"string"==typeof a?a:a(e,t,i)}if("function"==typeof Zs[s])return Zs[s](e,t,i)}return a||"folder-outline"};function Ws(e,t){const i=Pe(e),a=t.states[e];if(!a)return null;if("group"==i){const i=t.states[e],a=Ct(i,"entity_id");if(!a.length)return null;const o=a.map(e=>Ws(e,t));return o.every(et)?(s=o).length&&s.every(e=>e.type==s[0].type)?s[0].type==$t.List?Ft(...s):s[0].type==$t.Level?Pt(...s):null:null:null}var s;if(!Object.keys(Hs).includes(i))return null;let o=Tt(Hs[i],a,t);if("options"in o&&et(o.options)){let e=[...o.options];return e=e.map(e=>Object.assign(e,{icon:e.icon?e.icon:Ys(a,e.value,t,"flash"),name:e.name?e.name:Gs(a,e.value,t)})),o=Object.assign(Object.assign({},o),{options:e}),e.length?Ft(o):null}return"min"in o&&et(o.min)&&"max"in o&&et(o.max)?Pt(o):Yt(o)}const Gs=(e,t,i)=>{const a=Pe(e.entity_id);return e.attributes.device_class&&i.localize(`component.${a}.entity_component._.${e.attributes.device_class}.state.${t}`)||i.localize(`component.${a}.entity_component._.state.${t}`)||t};function Ks(e,t,i){let a=i.standard_configuration?Ws(e,t):null;const s=Object.entries(i.customize).filter(([t])=>mt(t,e)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e.states).filter(et);return s.length&&s.forEach(e=>{a=Array.isArray(e)?Ft({options:e.map(e=>Object({value:e}))}):Pt(e)}),a}function Js(e,t,i={filterActions:!0,filterStates:!1}){let a=Object.keys(e.states).filter(e=>gs(e,t));return"notify"in e.services&&(a=[...a,...Object.keys(e.services.notify).map(e=>"notify."+e).filter(e=>gs(e,t))]),i.filterActions&&i.filterStates?a=a.filter(i=>_s(i,e,t).length||Ks(i,e,t)):i.filterActions?a=a.filter(i=>_s(i,e,t).length):i.filterStates&&(a=a.filter(i=>Ks(i,e,t))),a}const Xs=(e,t)=>{let i={entity_id:e,service:t.service,service_data:Object.assign({},t.service_data)};return Object.entries(t.variables||{}).forEach(([e,t])=>{Object.keys(i.service_data||{}).includes(e)||(t.type==$t.Level?(t=t,i=Object.assign(Object.assign({},i),{service_data:t.optional?Je(i.service_data||{},e):Object.assign(Object.assign({},i.service_data),{[e]:parseFloat((t.min*t.scale_factor).toPrecision(12))||0})})):t.type==$t.List?(t=t,i=Object.assign(Object.assign({},i),{service_data:Object.assign(Object.assign({},i.service_data),{[e]:t.options.length?t.options[0].value:void 0})})):t.type==$t.Text&&(t=t,i=Object.assign(Object.assign({},i),{service_data:Object.assign(Object.assign({},i.service_data),{[e]:""})})))}),i},Qs=(e,t,i,a)=>{if(!e)return null;const s=vs(e,a);let o=i.find(e=>os(e,s,!0));if(!o)return null;let n=t.map(e=>Xs(e,o));return n=Object.keys(o.variables||{}).filter(t=>Object.keys(e.service_data||{}).includes(t)).reduce((t,i)=>{if(!t)return t;switch(o.variables[i].type){case $t.Level:const a=o.variables[i];let s=Number(e.service_data[i]);return s/=a.scale_factor,s=Math.round(s/a.step)*a.step,s=parseFloat(s.toPrecision(12)),s>a.max?s=a.max:s<a.min&&(s=a.min),s*=a.scale_factor,s=parseFloat(s.toFixed(2)),t.map(e=>Object.assign(e,{service_data:Object.assign(Object.assign({},e.service_data),{[i]:s})}));case $t.List:return o.variables[i].options.some(t=>t.value==e.service_data[i])?t.map(t=>Object.assign(t,{service_data:Object.assign(Object.assign({},t.service_data),{[i]:e.service_data[i]})})):null;case $t.Text:return t.map(t=>Object.assign(t,{service_data:Object.assign(Object.assign({},t.service_data),{[i]:e.service_data[i]})}));default:return t}},n),n};function eo(e,t){return e.id||e.value||t}let to=class extends oe{constructor(){super(...arguments),this.items=[],this.value=null}render(){return this.items.length?this.items.map((e,t)=>this.renderButton(e,t)):q`
        <div class="text-field">
          <slot></slot>
        </div>
      `}renderButton(e,t){const i=Array.isArray(this.value)?this.value:[this.value],a=eo(e,t);return q`
      <mwc-button
        class="${i.includes(a)?"active":""}"
        ?disabled=${e.disabled}
        @click=${()=>this.selectItem(a)}
      >
        ${e.icon?q`
              <ha-icon icon="${ot(e.icon)}" class="padded-right"></ha-icon>
            `:""}
        ${st(function(e){var t;return(null===(t=e.name)||void 0===t?void 0:t.trim())||e.value||e.id||""}(e))}
      </mwc-button>
    `}selectItem(e){if(Array.isArray(this.value))if(this.multiple){let t=Array.isArray(this.value)?[...this.value]:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else this.value=this.value.includes(e)?[]:Array(e);else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;const t=Array.isArray(this.value)?this.value.map(e=>this.items.find((t,i)=>eo(t,i)==e)):null!==this.value?this.items.find((e,t)=>eo(e,t)==this.value):null,i=new CustomEvent("change",{detail:t});this.dispatchEvent(i)}};to.styles=Ns,t([de({type:Array})],to.prototype,"items",void 0),t([de()],to.prototype,"value",void 0),t([de({type:Number})],to.prototype,"min",void 0),t([de({type:Boolean})],to.prototype,"optional",void 0),t([de({type:Boolean})],to.prototype,"multiple",void 0),to=t([re("button-group")],to);let io=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?q`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${Ls}
          ></ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        ${this._params.secondaryButtonLabel?q`
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
    `:q``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return r`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([de({attribute:!1})],io.prototype,"hass",void 0),t([ce()],io.prototype,"_params",void 0),io=t([re("generic-dialog")],io);var ao=Object.freeze({__proto__:null,get GenericDialog(){return io}});const so=[{start:"00:00:00",stop:"08:00:00",actions:[]},{start:"08:00:00",stop:"16:00:00",actions:[]},{start:"16:00:00",stop:"00:00:00",actions:[]}];let oo=class extends oe{constructor(){super(...arguments),this.entities=[],this.multipleEntity=!1,this.scheduleEntities=[],this.timeSchemeSelected=!1,this.editItem=!1}provideHass(e){e.hass=this.hass}async firstUpdated(){if(this.scheduleEntities=(await ft(this.hass)).map(e=>e.entity_id),this.entities&&this.entities.length){const e=this.getGroups().find(e=>e.entities.find(e=>e==this.entities[0]));if(!e)return;this.selectedGroup=e,this.multipleEntity=this.entities.length>1}if(this.schedule)if(this.schedule.timeslots.every(e=>e.stop))this.timeSchemeSelected=!0;else{const e=Qe(Xe(this.schedule.timeslots.map(e=>e.actions))),t=this.getActionsForEntity().filter(t=>e.some(e=>os(e,t,!0)));1==t.length&&(this.selectedAction=t[0])}}getGroups(){if(!this.hass||!this.config)return[];const e=Rs(Js(this.hass,this.config).filter(e=>"switch"!==Pe(e)||!this.scheduleEntities.includes(e)),this.config,this.hass);return e.sort(it),e}getEntitiesForGroup(){if(!this.selectedGroup||!this.hass||!this.config)return[];const e=this.selectedGroup.entities.map(e=>ht(e,this.hass,this.config));return e.sort(it),e}getActionsForEntity(e){if(e||(e=this.entities),!this.hass||!this.config||!e.length)return[];const t=_s(e,this.hass,this.config).map(e=>Object.assign(e,{name:ps(e)}));return t.sort(it),t}render(){var e;if(!this.hass||!this.config)return q``;const t=this.getGroups();1!=t.length||tt(this.selectedGroup,t[0])||this.selectGroup(t[0]);const i=this.getEntitiesForGroup();1==i.length&&this.entities[0]!==i[0].id&&this.selectEntity(i[0].id);const a=this.getActionsForEntity();return q`
      <div class="content">
        <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
        <button-group
          .items=${t}
          .value=${t.findIndex(e=>tt(e,this.selectedGroup))}
          @change=${e=>this.selectGroup(e.detail)}
        >
          ${Ya("ui.panel.entity_picker.no_groups_defined",rt(this.hass))}
        </button-group>

        <div class="header">
          ${this.hass.localize("ui.components.entity.entity-picker.entity")}
          ${i.length>1?q`
                <div class="switch">
                  <ha-switch
                    ?checked=${this.multipleEntity}
                    @change=${e=>{this.multipleEntity=e.target.checked}}
                  >
                  </ha-switch>
                  ${Ya("ui.panel.entity_picker.multiple",rt(this.hass))}
                </div>
              `:""}
        </div>
        <button-group
          .items=${i}
          .value=${this.entities}
          @change=${this.selectEntity}
          ?multiple=${this.multipleEntity}
          ?optional=${!0}
          id="selectedEntity"
        >
          ${this.selectedGroup?Ya("ui.panel.entity_picker.no_entities_for_group",rt(this.hass)):Ya("ui.panel.entity_picker.no_group_selected",rt(this.hass))}
        </button-group>

        <div class="header">
          ${this.hass.localize("ui.panel.config.automation.editor.actions.type.device_id.action")}
        </div>
        <button-group
          .items=${a}
          .value=${a.findIndex(e=>tt(e,this.selectedAction))}
          @change=${this.selectAction}
          id="selectedAction"
        >
          ${this.entities.length?Ya("ui.panel.entity_picker.no_actions_for_entity",rt(this.hass)):Ya("ui.panel.entity_picker.no_entity_selected",rt(this.hass))}
        </button-group>
        ${this.makeSchemeButton(a)}
      </div>
      <div class="buttons ${this.schedule&&this.editItem?"":"centered"}">
        ${this.schedule?q`
              ${this.editItem?q`
                    <mwc-button
                      class="warning"
                      @click=${()=>this.dispatchEvent(new CustomEvent("deleteClick",{detail:this.schedule}))}
                    >
                      ${this.hass.localize("ui.common.delete")}
                    </mwc-button>
                  `:""}
              <mwc-button
                @click=${()=>this.dispatchEvent(new CustomEvent("saveClick",{detail:this.schedule}))}
                ?disabled=${!(null===(e=this.schedule)||void 0===e?void 0:e.timeslots.filter(e=>e.actions.length).length)}
              >
                ${this.hass.localize("ui.common.save")}
              </mwc-button>
            `:q`
              <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction&&!this.timeSchemeSelected}
                >${this.hass.localize("ui.common.next")}</mwc-button
              >
            `}
      </div>
    `}makeSchemeButton(e){return e.length&&this.hass?q`
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.or.label")}</div>
      <div class="option-list">
        <mwc-button
          class="${this.timeSchemeSelected?" active":""}"
          @click=${this.selectTimeScheme}>
          <ha-icon icon="${ot("chart-timeline")}" class="padded-right"></ha-icon>
          ${Ya("ui.panel.entity_picker.make_scheme",rt(this.hass))}
        </mwc-button>
      </div>
    </div>
    `:q``}selectGroup(e){this.selectedGroup=e,this.entities=[],this.selectedAction=void 0}async selectEntity(e){const t=lt("object"==typeof e?e.target.value:e);let i=this.selectedAction;if(i){let e=this.getActionsForEntity(t);this.entities.every(e=>"script"==Pe(e))&&this.entities.includes(i.service)?(i=Object.assign(Object.assign({},i),{service:"script.script"}),e=e.map(e=>t.includes(e.service)?Object.assign(Object.assign({},e),{service:"script.script"}):e),i=e.find(e=>os(e,i)),i=Object.assign(Object.assign({},i),{service:t[0]})):i=e.find(e=>os(e,i))}else i=void 0;if(this.schedule&&t.length&&(this.timeSchemeSelected||this.selectedAction)){const a=await this.migrateSchedule(t,this.timeSchemeSelected?null:i);if(!a)return this.selectedAction=null,"object"==typeof e&&e.stopPropagation(),void(this.shadowRoot.querySelector("#selectedEntity").value=this.entities);this.entities=t,this.selectedAction=i,this.dispatchEvent(new CustomEvent("change",{detail:a}))}else this.entities=t,this.selectedAction=i}async selectAction(e){const t=e.detail;if(this.schedule){const i=await this.migrateSchedule(this.entities,t);if(!i)return this.selectedAction=null,e.stopPropagation(),void(this.shadowRoot.querySelector("#selectedAction").value=null);this.dispatchEvent(new CustomEvent("change",{detail:i}))}this.selectedAction=t,this.timeSchemeSelected=!1}async selectTimeScheme(e){if(this.schedule){const t=await this.migrateSchedule(this.entities,null);if(!t)return void e.stopPropagation();this.dispatchEvent(new CustomEvent("change",{detail:t}))}this.selectedAction=null,this.timeSchemeSelected=!0}nextClick(){if(!this.hass||!this.config||!this.selectedAction&&!this.timeSchemeSelected)return;const e=1==lt(this.config.tags).length?lt(this.config.tags).slice(0,1):[];if(this.timeSchemeSelected)this.actions=_s(this.entities,this.hass,this.config),this.schedule={weekdays:["daily"],timeslots:so,repeat_type:xt.Repeat,tags:e};else{let t=Ze(xs(new Date,rt(this.hass),De.twenty_four),this.hass);t=We(t,this.config.time_step,{wrapAround:!0}),this.actions=[this.selectedAction];const i={start:Ye(t),actions:this.entities.map(e=>Xs(e,this.actions[0]))};this.schedule={weekdays:["daily"],timeslots:[i],repeat_type:xt.Repeat,tags:e}}this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule,entities:this.entities.map(e=>ht(e,this.hass,this.config)),actions:this.actions,tab:Be.Time}}))}migrateSchedule(e,t){let i=!0,a=function e(t){return null==t?t:t instanceof Array?t.reduce((t,i,a)=>(t[a]=e(i),t),[]):t instanceof Object?Object.keys(t).reduce((i,a)=>(i[a]=e(t[a]),i),{}):t}(this.schedule);const s=null!==t?[t]:_s(e,this.hass,this.config);if(this.timeSchemeSelected)if(null!==t){let t=Ze(xs(new Date,rt(this.hass),De.twenty_four),this.hass);t=We(t,this.config.time_step,{wrapAround:!0});const o={start:Ye(t),actions:e.map(e=>Xs(e,s[0]))};a=Object.assign(Object.assign({},a),{timeslots:[o]}),i=!1}else{const t=a.timeslots.map(e=>e.actions[0]),o=t.map(t=>Qs(t,e,s,this.hass));i=t.every((e,t)=>null!==o[t]&&os(e,o[t][0])),a=Object.assign(Object.assign({},a),{timeslots:a.timeslots.map((e,t)=>Object.assign(e,{actions:o[t]||[]}))})}else if(null!==t){const t=Qs(a.timeslots[0].actions[0],e,s,this.hass)||e.map(e=>Xs(e,s[0]));a=Object.assign(Object.assign({},a),{timeslots:[Object.assign(Object.assign({},a.timeslots[0]),{actions:t})]})}else a=Object.assign(Object.assign({},a),{timeslots:so}),i=!1;const o={schedule:a,actions:s,entities:e.map(e=>ht(e,this.hass,this.config))};return new Promise(e=>{if(i)e(o);else{const t={title:Ya("ui.dialog.confirm_migrate.title",rt(this.hass)),description:Ya("ui.dialog.confirm_migrate.description",rt(this.hass)),primaryButtonLabel:this.hass.localize("ui.common.yes"),secondaryButtonLabel:this.hass.localize("ui.common.no"),cancel:()=>{e(!1)},confirm:()=>{e(o)}};gt(this,{dialogTag:"generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:t},this.cardEmbeddedInPopup)}})}};oo.styles=r`
    ${Ns}
  `,t([de()],oo.prototype,"hass",void 0),t([de()],oo.prototype,"config",void 0),t([de()],oo.prototype,"selectedGroup",void 0),t([de()],oo.prototype,"selectedAction",void 0),t([de()],oo.prototype,"entities",void 0),t([de()],oo.prototype,"schedule",void 0),t([de()],oo.prototype,"multipleEntity",void 0),t([de()],oo.prototype,"scheduleEntities",void 0),t([de()],oo.prototype,"timeSchemeSelected",void 0),t([de({type:Boolean})],oo.prototype,"editItem",void 0),oo=t([re("scheduler-editor-entity")],oo);const no=(e,t,i={})=>{const a=Ge(e);if(!a)return e;const s=t.states["sun.sun"],o="sunrise"==a.event?Ze(s.attributes.next_rising,t):Ze(s.attributes.next_setting,t);let n="+"==a.sign?o+Ze(a.offset,t):o-Ze(a.offset,t);return i.stepSize&&(n=We(n,i.stepSize)),Ye(n)},ro=(e,t,i,a={})=>{Ge(e)&&(e=no(e,i));const s=Ze(e,i),o=i.states["sun.sun"],n=Ze(o.attributes.next_rising,i),r=Ze(o.attributes.next_setting,i);t||(t=Math.abs(s-n)<Math.abs(s-r)?Ot.Sunrise:Ot.Sunset);let l=s-(t==Ot.Sunrise?Ze(o.attributes.next_rising,i):Ze(o.attributes.next_setting,i));return a.stepSize&&(l=We(l,a.stepSize,{maxHours:6})),`${t}${l>0?"+":"-"}${Ye(Math.abs(l))}`};let lo=class extends oe{constructor(){super(...arguments),this.stepSize=10,this.relativeMode=!1,this.event=Ot.Sunrise,this.maxOffset=6}get time(){return this._time>=0?this._time:Math.abs(this._time)}set time(e){const t=We(e,this.stepSize,{wrapAround:!this.relativeMode,maxHours:this.relativeMode?this.maxOffset:void 0}),i=t!=this._time&&et(this._time);this._time=t,i&&this.updateValue()}firstUpdated(){const e=Ge(this.value);e?(this.relativeMode=!0,this.event=e.event==Ot.Sunrise?Ot.Sunrise:Ot.Sunset,this.time="+"==e.sign?Ze(e.offset,this.hass):-Ze(e.offset,this.hass)):this.time=Ze(this.value,this.hass)}updateValue(){if(this.relativeMode){const e=this._time>=0?"+":"-",t=Ye(this.time);this.value=`${this.event}${e}${t}`}else this.value=Ye(this.time);const e=new CustomEvent("change");this.dispatchEvent(e)}getTimeParts(){const e=(this.relativeMode?Ye(this.time):xs($s(Ye(this.time)),rt(this.hass))).split(/:|\ /);return e[0]=String(Number(e[0])),e}render(){const e=this.getTimeParts();return q`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${()=>this.time=this._time+3600}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">
          <ha-textfield
            type="number"
            inputmode="numeric"
            .value=${e[0]}
            no-spinner
            outlined
            @input=${t=>this._hoursChanged(t,e.length>2)}
            @focus=${this._onFocus}
            @blur=${t=>this._handleHoursInput(t,e)}
          >
          </ha-textfield>
        </div>
        <div class="hours-down">
          <mwc-button @click=${()=>this.time=this._time-3600}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${()=>this.time=this._time+60*this.stepSize}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">
          <ha-textfield
            type="number"
            inputmode="numeric"
            .value=${e[1]}
            no-spinner
            outlined
            @input=${this._minutesChanged}
            @focus=${this._onFocus}
            @blur=${t=>this._handleMinutesInput(t,e)}
          >
          </ha-textfield>
        </div>
        <div class="minutes-down">
          <mwc-button @click=${()=>this.time=this._time-60*this.stepSize}>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode?q`
              <div class="suffix">
                <mwc-button @click=${this.toggleBeforeAfter}>
                  ${this.getBeforeAfter()}
                </mwc-button>
                <mwc-button @click=${this.toggleSunriseSunset}>
                  <ha-icon icon="mdi:${this.event==Ot.Sunrise?"weather-sunny":"weather-night"}"></ha-icon>
                </mwc-button>
              </div>
            `:e.length>2?q`
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
    `}getSunModeToggle(){return this.hass&&this.hass.states["sun.sun"]?q`
      <mwc-button @click="${this.toggleMode}" class="${this.relativeMode?"active":""}">
        <ha-icon icon="mdi:theme-light-dark"></ha-icon>
      </mwc-button>
    `:q``}getBeforeAfter(){return this.hass?this._time<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").trim():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").trim():""}toggleAmPm(){this.time=this._time+43200}toggleBeforeAfter(){this.time=-this._time,this.updateValue()}toggleSunriseSunset(){this.event=this.event==Ot.Sunrise?Ot.Sunset:Ot.Sunrise,this.updateValue()}toggleMode(){if(!this.hass)return;this.relativeMode=!this.relativeMode;const e=this.hass.states["sun.sun"],t=Ze(e.attributes.next_rising,this.hass),i=Ze(e.attributes.next_setting,this.hass);if(this.relativeMode){this.event=Math.abs(this._time-t)<Math.abs(this._time-i)?Ot.Sunrise:Ot.Sunset;let e=this.event==Ot.Sunrise?this._time-t:this._time-i;e>3600*this.maxOffset?e=3600*this.maxOffset:e<3600*-this.maxOffset&&(e=3600*-this.maxOffset),this.time=e}else this.time=this.event==Ot.Sunrise?this._time+t:this._time+i}_hoursChanged(e,t=!1){const i=e.target,a=i.value;let s=Number(a);const o=this.relativeMode?0:t?1:0,n=this.relativeMode?this.maxOffset:t?12:23;let r=!0;a.length>2&&(r=!1,s=Number(a.substring(0,2))),s<0&&(r=!1,s=-s),s<o&&(r=!1,s=o),s>n&&(r=!1,s=n),r||(i.value=String(s),i.blur())}_minutesChanged(e){const t=e.target,i=t.value;let a=Number(i),s=!0;i.length>2&&(s=!1,a=Number(i.substring(0,2))),a<0&&(s=!1,a=-a),a>59&&(s=!1,a=59),a%this.stepSize!=0&&(a=Math.round(a/this.stepSize)*this.stepSize),s||(t.value=String(a).padStart(2,"0"),t.blur())}_onFocus(e){e.target.value=""}_handleHoursInput(e,t){const i=e.target;let a=Number(i.value);if(!i.value.length)return void(i.value=t[0]);t.length>2&&12==a&&(a=0),t.length>2&&"PM"==t[2]&&(a+=12);const s=Number(t[1]);this.time=this._time>=0?3600*a+60*s:-(3600*a+60*s),i.value=this.getTimeParts()[0]}_handleMinutesInput(e,t){const i=e.target;let a=Number(i.value);if(!i.value.length)return void(i.value=t[1]);a%this.stepSize!=0&&(a=Math.round(a/this.stepSize)*this.stepSize);let s=Number(t[0]);t.length>2&&12==s&&(s=0),t.length>2&&"PM"==t[2]&&(s+=12),this.time=this._time>=0?3600*s+60*a:-(3600*s+60*a),i.value=this.getTimeParts()[1]}};lo.styles=r`
    div.time-picker {
      display: grid;
      grid-template-columns: min-content min-content min-content 1fr min-content;
      grid-template-rows: min-content min-content min-content;
      grid-template-areas:
        'hours-up   .         minutes-up   suffix options'
        'hours      separator minutes      suffix options'
        'hours-down .         minutes-down suffix options';
      grid-gap: 4px 0px;
      align-items: center;
      direction: ltr;
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

    ha-textfield {
      text-align: center;
      --text-field-text-align: center;
      --text-field-padding: 0 4px;
      --mdc-typography-subtitle1-font-size: 42px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
    }
  `,t([de()],lo.prototype,"hass",void 0),t([de({type:Number})],lo.prototype,"stepSize",void 0),t([de()],lo.prototype,"relativeMode",void 0),t([de()],lo.prototype,"event",void 0),t([de()],lo.prototype,"_time",void 0),lo=t([re("time-picker")],lo);let co=class extends oe{constructor(){super(),this.slots=[],this.actions=[],this.stepSize=10,this.isDragging=!1,this.currentTime=0,this.rangeMin=0,this.rangeMax=86400,this.activeSlot=null,this.activeMarker=null,this.previousSlot=null,this.timer=0,this.timeout=0,this.zoomFactor=1,this.large=!1,this.handleResize=this.handleResize.bind(this)}handleResize(e){clearTimeout(this.timeout),this.timeout=window.setTimeout(()=>{this.requestUpdate()},50)}firstUpdated(){window.addEventListener("resize",this.handleResize)}disconnectedCallback(){window.removeEventListener("resize",this.handleResize),clearInterval(this.timer),clearTimeout(this.timeout),super.disconnectedCallback&&super.disconnectedCallback()}render(){if(!this.hass)return q``;const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=86400/(this.rangeMax-this.rangeMin)*e,i=-this.rangeMin/(this.rangeMax-this.rangeMin)*e;return q`
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
        <ha-icon icon="mdi:plus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
      </mwc-button>
      <mwc-button @click=${this._removeSlot} ?disabled=${null===this.activeSlot||this.slots.length<=2}>
        <ha-icon icon="mdi:minus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize("ui.common.delete")}
      </mwc-button>
    `}renderSlots(){const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=86400/(this.rangeMax-this.rangeMin)*e;let i=-this.rangeMin/(this.rangeMax-this.rangeMin)*e;return this.slots.map((a,s)=>{const o=((Ze(a.stop,this.hass)||86400)-Ze(a.start,this.hass))/86400,n=this.computeActionDisplay(a)||"",r=5*(n||"").length+10,l=i<0&&i+o*t>0?5-i:15,d=i+o*t>e&&i<e?o*t-(e-i)+5:15,c=o*t-l-d;i+=o*t;const u=(()=>{if(n&&(c>r/3||c>50)&&c>30)return q`
            <span style="margin-left: ${l.toFixed(2)}px; margin-right: ${d.toFixed(2)}px">
              ${n}
            </span>
          `;const e=this.computeActionIcons(a);return e?q`
            <span style="margin-left: auto; margin-right: auto">
              ${e.map(e=>q`
                    <ha-icon icon="${e}"></ha-icon>
                  `)}
            </span>
          `:""})();return q`
        <div
          class="slot${this.activeSlot==s&&null===this.activeMarker?" active":""} ${o*t<2?"noborder":""}"
          style="width: ${Math.floor(1e4*o)/100}%"
          @click=${this._selectSlot}
          slot="${s}"
        >
          ${s>0&&(this.activeSlot===s||this.activeSlot===s-1)?q`
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
          ${s>0?this.renderTooltip(s):""} ${u}
        </div>
      `})}renderTooltip(e){const t=Ge(this.slots[e].start);return q`
      <div class="tooltip-container center">
        <div class="tooltip ${this.activeMarker==e?"active":""}" @click=${this._selectMarker}>
          ${t?q`
                <ha-icon icon="mdi:${"sunrise"==t.event?"weather-sunny":"weather-night"}"></ha-icon>
                ${t.sign} ${xs($s(t.offset),rt(this.hass),ks.twenty_four)}
              `:xs($s(this.slots[e].start),rt(this.hass))}
        </div>
      </div>
    `}renderTimes(){this._updateTooltips();const e=parseFloat(getComputedStyle(this).getPropertyValue("width")),t=[1,2,3,4,6,8,12],i=ws(rt(this.hass))?55:40;let a=Math.ceil(24/(e/i));for(;!t.includes(a);)a++;return[0,...Array.from(Array(24/a-1).keys()).map(e=>(e+1)*a),24].map(e=>{const t=0==e||24==e,i=t?a/48*100:a/24*100;return q`
        <div style="width: ${Math.floor(100*i)/100}%" class="${t?"":"time"}">
          ${t?"":xs($s(Ye(3600*e)),rt(this.hass))}
        </div>
      `})}computeActionDisplay(e){if(this.hass)return e.actions?Qe(e.actions.map(e=>{const t=this.actions.find(t=>os(t,e,!0));return t?t.variables&&Object.keys(t.variables).some(t=>e.service_data&&t in e.service_data)?Object.entries(t.variables).filter(([t])=>e.service_data&&t in e.service_data).map(([t,i])=>{const a=e.service_data[t];if(i.type==$t.Level)return i=i,Lt(Number(a),i);if(i.type==$t.List){const e=(i=i).options.find(e=>e.value==a);return st(e&&e.name?e.name:String(a))}return""}).join(", "):st(t.name||Ya("services."+e.service,rt(this.hass))||e.service):"???"})).join(", "):""}computeActionIcons(e){if(this.hass&&e.actions)return Qe(e.actions.map(e=>{const t=this.actions.find(t=>os(t,e,!0));return t?t.variables&&Object.keys(t.variables).some(t=>e.service_data&&t in e.service_data)?Object.entries(t.variables).filter(([t])=>e.service_data&&t in e.service_data).map(([t,i])=>{const a=e.service_data[t];if(i.type==$t.List){const e=(i=i).options.find(e=>e.value==a);return null==e?void 0:e.icon}}):[t.icon]:[]}).reduce((e,t)=>[...e,...t],[]).filter(e=>!!e))}_handleTouchStart(e){const t=parseFloat(getComputedStyle(this).getPropertyValue("width")),i=86400/(this.rangeMax-this.rangeMin)*t,a=-(-this.rangeMin/(this.rangeMax-this.rangeMin)*t)/i*86400,s=e.target;let o=s;for(;!o.classList.contains("slot");)o=o.parentElement;const n=o,r=n.previousElementSibling,l=Number(r.getAttribute("slot")),d=l>0?Ze(this.slots[l].start,this.hass)+60*this.stepSize:0,c=l<this.slots.length-2?(Ze(this.slots[l+1].stop,this.hass)||86400)-60*this.stepSize:86400;this.isDragging=!0;const u=n.parentElement.parentElement.getBoundingClientRect();let m=e=>{let s;s="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let o=s-u.left;o>t-10&&(o=t-10),o<10&&(o=10);let n=Math.round(o/i*86400+a);n<d&&(n=d),n>c&&(n=c),this.currentTime=n;const r=Ge(this.slots[l].stop);let m;r?m=ro(Ye(n),r.event,this.hass,{stepSize:this.stepSize}):(n=Math.round(n)>=86400?86400:We(n,this.stepSize),m=Ye(n)),m!=this.slots[l].stop&&(this.slots=Object.assign(this.slots,{[l]:Object.assign(Object.assign({},this.slots[l]),{stop:m}),[l+1]:Object.assign(Object.assign({},this.slots[l+1]),{start:m})}),this.requestUpdate())};const h=()=>{window.removeEventListener("mousemove",m),window.removeEventListener("touchmove",m),window.removeEventListener("mouseup",h),window.removeEventListener("touchend",h),window.removeEventListener("blur",h),m=()=>{},setTimeout(()=>{this.isDragging=!1},100),s.blur();const e=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(e)};window.addEventListener("mouseup",h),window.addEventListener("touchend",h),window.addEventListener("blur",h),window.addEventListener("mousemove",m),window.addEventListener("touchmove",m)}_selectSlot(e){if(this.isDragging)return;let t=e.target;"ha-icon"==t.tagName.toLowerCase()&&(t=t.parentElement),"span"==t.tagName.toLowerCase()&&(t=t.parentElement),t.classList.contains("handle")&&(t=t.parentElement);const i=Number(t.getAttribute("slot"));this.activeSlot==i&&null===this.activeMarker?(this.activeSlot=null,this.previousSlot=null):(this.previousSlot=this.activeSlot,this.activeSlot=i),this.activeMarker=null,this._updateZoom();const a=new CustomEvent("update",{detail:{entry:this.activeSlot}});this.dispatchEvent(a)}_calculateZoom(){const e=Number(this.activeSlot);let t=Ze(this.slots[e].start,this.hass),i=Ze(this.slots[e].stop,this.hass)||86400;t-=(i-t)/3,i+=(i-t)/3,(i-t)/86400*parseFloat(getComputedStyle(this).getPropertyValue("width"))>=100?(t=0,i=86400):(t<0&&(i-=t),i>86400&&(t-=i-86400)),this.rangeMin=t>0?t:0,this.rangeMax=i<86400?i:86400,clearInterval(this.timer),clearTimeout(this.timeout),this.timer=window.setInterval(()=>{this._updateTooltips()},50),this.timeout=window.setTimeout(()=>{clearInterval(this.timer),this._updateTooltips()},230)}_addSlot(){if(null===this.activeSlot)return;const e=this.slots[this.activeSlot],t=Ze(e.start,this.hass);let i=Ze(e.stop,this.hass);i<t&&(i+=86400);const a=We(t+(i-t)/2,this.stepSize);this.slots=[...this.slots.slice(0,this.activeSlot),Object.assign(Object.assign({},this.slots[this.activeSlot]),{stop:Ye(a)}),Object.assign(Object.assign({},this.slots[this.activeSlot]),{start:Ye(a),stop:Ye(i),actions:[]}),...this.slots.slice(this.activeSlot+1)],this._updateZoom();const s=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(s)}_removeSlot(){if(null===this.activeSlot)return;const e=this.activeSlot==this.slots.length-1?this.activeSlot-1:this.activeSlot;this.slots=[...this.slots.slice(0,e),Object.assign(Object.assign({},this.slots[e+1]),{start:this.slots[e].start,stop:this.slots[e+1].stop}),...this.slots.slice(e+2)],this.activeSlot==this.slots.length&&this.activeSlot--,this._updateZoom();const t=new CustomEvent("update",{detail:{entries:this.slots}});this.dispatchEvent(t)}_updateTooltips(){var e;const t=this.offsetLeft,i=parseFloat(getComputedStyle(this).getPropertyValue("width")),a=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".tooltip"),s=e=>{const i=e.offsetWidth,a=e.parentElement.offsetLeft+e.offsetLeft-t;return e.parentElement.classList.contains("left")?[a+i/2,a+3*i/2]:e.parentElement.classList.contains("right")?[a-i/2,a+i/2]:[a,a+i]};null==a||a.forEach((e,o)=>{const n=e.parentElement,r=n.classList.contains("visible"),l=Number(n.parentElement.getAttribute("slot"));if(l!=this.activeSlot&&l-1!=this.activeSlot)r&&n.classList.remove("visible");else{const d=e.parentElement.offsetLeft;if(d<0||d>i+2*t)r&&n.classList.remove("visible");else{r||n.classList.add("visible");const t=n.offsetWidth,d=n.classList.contains("center");let c=s(e)[0],u=i-s(e)[1];if(o>0&&l-1==this.activeSlot)c-=s(a[o-1])[1];else if(o+1<a.length&&l==this.activeSlot){const e=s(a[o+1])[0];u-=e<0?0:i-e}c<u?c<0?d&&u>t/2&&(n.classList.add("right"),n.classList.remove("center"),n.classList.remove("left")):(n.classList.add("center"),n.classList.remove("right"),n.classList.remove("left")):u<0?d&&c>t/2&&(n.classList.add("left"),n.classList.remove("center"),n.classList.remove("right")):(n.classList.add("center"),n.classList.remove("left"),n.classList.remove("right"))}}})}_updateZoom(){clearInterval(this.timer),clearTimeout(this.timeout),this.timer=window.setInterval(()=>{this._updateTooltips()},50),this.timeout=window.setTimeout(()=>{clearInterval(this.timer),this._updateTooltips()},230)}_selectMarker(e,t=!0){e.stopImmediatePropagation();let i=e.target;for(;!i.classList.contains("slot");)i=i.parentElement;const a=Number(i.getAttribute("slot"));t&&this.activeMarker===a?this.activeMarker=null:this.activeMarker=t?a:null;const s=new CustomEvent("update",{detail:{entry:this.activeSlot,marker:this.activeMarker}});this.dispatchEvent(s),this._updateTooltips()}static get styles(){return r`
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
    `}};t([de()],co.prototype,"hass",void 0),t([de({type:Array})],co.prototype,"slots",void 0),t([de({type:Array})],co.prototype,"actions",void 0),t([de({type:Number})],co.prototype,"stepSize",void 0),t([de()],co.prototype,"rangeMin",void 0),t([de()],co.prototype,"rangeMax",void 0),t([de()],co.prototype,"activeSlot",void 0),t([de()],co.prototype,"activeMarker",void 0),t([de({type:Boolean})],co.prototype,"large",void 0),t([function(e){return ue({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */({passive:!0})],co.prototype,"_handleTouchStart",null),co=t([re("timeslot-editor")],co);const uo=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider")&&customElements.get("ha-combo-box"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()};let mo=class extends oe{constructor(){super(...arguments),this.min=0,this.max=255,this.step=1,this.scaleFactor=1,this.unit="",this.optional=!1,this.disabled=!1,this._displayedValue=0}set value(e){e=isNaN(e)?this.min:this._roundedValue(e/this.scaleFactor),this._displayedValue=e}firstUpdated(){(async()=>{await uo()})(),this.disabled&&!this.optional&&(this.disabled=!1,this.requestUpdate())}render(){return q`
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
    `}getSlider(){return this.disabled?q`
        <ha-slider
          labeled
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          disabled
        ></ha-slider>
      `:q`
        <ha-slider
          labeled
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          @change=${this._updateValue}
        ></ha-slider>
      `}getCheckbox(){return this.optional?q`
      <ha-checkbox @change=${this.toggleChecked} ?checked=${!this.disabled}></ha-checkbox>
    `:q``}toggleChecked(e){const t=e.target.checked;this.disabled=!t;const i=this.disabled?null:this._scaledValue(this._displayedValue);Ie(this,"value-changed",{value:i})}_updateValue(e){let t=Number(e.target.value);this._displayedValue=t,t=this._scaledValue(this._displayedValue),Ie(this,"value-changed",{value:t})}_roundedValue(e){return e=Math.round(e/this.step)*this.step,(e=parseFloat(e.toPrecision(12)))>this.max?e=this.max:e<this.min&&(e=this.min),e}_scaledValue(e){return e=this._roundedValue(e),e*=this.scaleFactor,e=parseFloat(e.toFixed(2))}};mo.styles=r`
    ${Ns} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
    }
  `,t([de({type:Number})],mo.prototype,"min",void 0),t([de({type:Number})],mo.prototype,"max",void 0),t([de({type:Number})],mo.prototype,"step",void 0),t([de({type:Number})],mo.prototype,"value",null),t([de({type:Number})],mo.prototype,"scaleFactor",void 0),t([de({type:String})],mo.prototype,"unit",void 0),t([de({type:Boolean})],mo.prototype,"optional",void 0),t([de({type:Boolean})],mo.prototype,"disabled",void 0),t([de({type:Number})],mo.prototype,"_displayedValue",void 0),mo=t([re("variable-slider")],mo);let ho=class extends oe{firstUpdated(){var e;null!==this.value&&void 0!==this.value||(null===(e=this.variable)||void 0===e?void 0:e.type)!=$t.Level||this.variable.optional||this.levelVariableUpdated(this.variable.min)}render(){return this.variable?this.variable.type==$t.Level?this.renderLevelVariable():this.variable.type==$t.List?this.renderListVariable():this.variable.type==$t.Text?this.renderTextVariable():q``:q``}levelVariableUpdated(e){const t="number"==typeof e?e:Number(e.detail.value);this.value=t,Ie(this,"value-changed",{value:t})}renderLevelVariable(){const e=this.variable,t=Number(this.value);return q`
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
    `}listVariableUpdated(e){const t="string"==typeof e?e:String(e.target.value);this.value=t,Ie(this,"value-changed",{value:t})}renderListVariable(){const e=this.variable.options,t=String(this.value)||null;return 1==e.length&&t!=e[0].value&&this.listVariableUpdated(e[0].value),q`
      <button-group .items=${e} value=${t} @change=${this.listVariableUpdated}> </button-group>
    `}renderTextVariable(){const e=this.variable,t=this.value;return q`
      <ha-textfield .value=${t||""} @input=${this.listVariableUpdated} .label=${e.name}> </ha-textfield>
    `}};ho.styles=r`
    ha-textfield {
      width: 100%;
    }
  `,t([de()],ho.prototype,"variable",void 0),t([de()],ho.prototype,"value",void 0),ho=t([re("scheduler-variable-picker")],ho);let po=class extends oe{constructor(){super(...arguments),this.activeEntry=null,this.activeMarker=null,this.timeslots=!1,this.editItem=!1,this.large=!1}firstUpdated(){if(!this.actions||!this.hass)return;this.timeslots||(this.activeEntry=0);const e=this.actions.map(e=>{const t=Object.assign(Object.assign({},e),{service_data:Je(e.service_data||{},...Object.keys(e.variables||{}))});return Object.assign(e,{name:ps(t)})});e.sort(it),this.actions=e}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){return this.hass&&this.config&&this.entities&&this.actions?q`
      <div class="content">
        <div class="header">
          ${this.hass.localize("ui.panel.config.automation.editor.actions.type.device_id.action")}
        </div>
        ${this.renderSummary()}
        ${this.timeslots?q`
              ${this.renderDays()}
              <div class="header">${Ya("ui.panel.time_picker.time_scheme",rt(this.hass))}</div>

              <timeslot-editor
                .hass=${this.hass}
                .actions=${this.actions}
                .slots=${this.schedule.timeslots}
                stepSize=${this.config.time_step||10}
                .large=${this.large}
                @update=${this.handlePlannerUpdate}
              >
              </timeslot-editor>

              ${this.renderMarkerOptions()} ${this.renderActions()} ${this.getVariableEditor()}
            `:q`
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

      <div class="buttons ${this.editItem?"":"centered"}">
        ${this.editItem?q`
              <mwc-button
                class="warning"
                @click=${()=>this.dispatchEvent(new CustomEvent("deleteClick",{detail:this.schedule}))}
              >
                ${this.hass.localize("ui.common.delete")}
              </mwc-button>
            `:""}
        <mwc-button
          @click=${()=>this.dispatchEvent(new CustomEvent("saveClick",{detail:this.schedule}))}
          ?disabled=${!this.schedule.timeslots.filter(e=>e.actions.length).length}
        >
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
      </div>
    `:q``}renderSummary(){return this.entities&&this.actions?q`
      <div class="summary">
        <div class="summary-entity">
          ${this.entities.map(e=>q`
              <div>
                <ha-icon icon="${ot(e.icon)}"> </ha-icon>
                ${at(st(e.name||this.hass.states[e.id].attributes.friendly_name||Le(e.id)))}
              </div>
            `)}
        </div>
        <div class="summary-arrow">
          <ha-icon icon="mdi:arrow-right"> </ha-icon>
        </div>
        <div class="summary-action">
          ${this.timeslots?q`
                <div>
                  <ha-icon icon="${ot("chart-timeline")}"> </ha-icon>
                  ${at(Ya("ui.panel.entity_picker.make_scheme",rt(this.hass)))}
                </div>
              `:q`
                <div>
                  <ha-icon icon="${ot(this.actions[0].icon||"flash")}"> </ha-icon>
                  ${at(this.actions[0].name||Le(this.actions[0].service))}
                </div>
              `}
        </div>
      </div>
    `:q``}renderDays(){if(!this.hass)return q``;let e=Array.from(Array(7).keys());const t=function(e){const t=e.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i),i=t[1],a=t[4],s="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),o="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),n="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);return a?o.includes(a)?"sun":s.includes(a)?"sat":"mon":n.includes(i)?"sun":["ar","arq","arz","fa"].includes(i)?"sat":"mon"}(this.hass.language),i=e.length-fs.findIndex(e=>e.substr(0,3)==t);e=[...e.slice(-i),...e.slice(0,-i)];const a=e.map(e=>Object({value:fs[e].substr(0,3),name:ys(e,rt(this.hass),!0)})),s=[{value:St.Daily,name:Ya("ui.components.date.day_types_short.daily",rt(this.hass))},{value:St.Workday,name:Ya("ui.components.date.day_types_short.workdays",rt(this.hass))},{value:St.Weekend,name:Ya("ui.components.date.day_types_short.weekend",rt(this.hass))},{value:St.Custom,name:this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.label")}];return q`
      <div class="header">${Ya("ui.components.date.days",rt(this.hass))}</div>
      <button-group .items=${s} value=${bs(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${bs(this.schedule.weekdays)==St.Custom?q`
            <div>
              <button-group
                .items=${a}
                .value=${this.schedule.weekdays}
                min="1"
                multiple
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `:""}
    `}renderActions(){var e;if(!this.hass||null!==this.activeMarker)return;const t=null!==this.activeEntry&&this.schedule.timeslots[this.activeEntry].actions.length?this.schedule.timeslots[this.activeEntry].actions[0]:null;return q`
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.type.device_id.action")}</div>
      <button-group
        .items=${null!==this.activeEntry?this.actions:[]}
        .value=${null!==t?null===(e=this.actions)||void 0===e?void 0:e.findIndex(e=>os(e,t,!0)):null}
        optional="true"
        @change=${this.selectAction}
      >
        ${Ya("ui.panel.time_picker.no_timeslot_selected",rt(this.hass))}
      </button-group>
    `}renderMarkerOptions(){if(!this.hass||!this.config||null===this.activeMarker)return;const e=this.schedule.timeslots[this.activeMarker].start,t=Ge(e),i=Ze(e,this.hass)-Ze("sunrise+00:00",this.hass),a=Ze(e,this.hass)-Ze("sunset+00:00",this.hass),s=[{value:"time",name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.time.at"),icon:"mdi:clock-outline"},{value:Ot.Sunrise,name:this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise"),icon:"mdi:weather-sunny",disabled:Math.abs(i)>21600},{value:Ot.Sunset,name:this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset"),icon:"mdi:weather-night",disabled:Math.abs(a)>21600}];return q`
      <div class="header">${Ya("ui.panel.time_picker.time_input_mode",rt(this.hass))}</div>
      <button-group .items=${s} .value=${t?t.event:"time"} @change=${this.updateMarkerSetting}>
      </button-group>
    `}updateMarkerSetting(e){const t=e.target.value,i=this.schedule.timeslots[this.activeMarker].start,a="time"==t?no(i,this.hass,{stepSize:this.config.time_step}):ro(i,t,this.hass,{stepSize:this.config.time_step});let s=[...this.schedule.timeslots];s=Object.assign(s,{[this.activeMarker-1]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeMarker-1]),{stop:a}),[this.activeMarker]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeMarker]),{start:a})}),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...s]})}updateActiveEntry(e){null!==this.activeEntry&&(this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:Object.assign([...this.schedule.timeslots],{[this.activeEntry]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry]),e)})}))}updateActiveEntryAction(e,t){null!==this.activeEntry&&(e&&"service"in e?this.updateActiveEntry({actions:Object.assign([...this.schedule.timeslots[this.activeEntry].actions],{[t]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry].actions[t]),e)})}):e?Object.entries(e).forEach(([e,i])=>{let a=[...this.schedule.timeslots[this.activeEntry].actions],s="object"==typeof i&&e in this.schedule.timeslots[this.activeEntry].actions[t]?Object.assign(Object.assign({},a[t][e]),i):i;const o=Object.keys(s).filter(e=>null===s[e]);o.length&&(s=Je(s,...o)),a=Object.assign(a,{[t]:Object.assign(Object.assign({},a[t]),{[e]:s})}),this.updateActiveEntry({actions:a})}):this.updateActiveEntry({actions:[...this.schedule.timeslots[this.activeEntry].actions].filter((e,i)=>i!=t)}))}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){const t=e.detail.entries;t.length<this.schedule.timeslots.length&&this.activeEntry==this.schedule.timeslots.length-1&&(this.activeEntry=this.schedule.timeslots.length-2),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...t]})}else e.detail.hasOwnProperty("entry")&&(this.activeMarker=null,this.activeEntry=null!==e.detail.entry?Number(e.detail.entry):null);e.detail.hasOwnProperty("marker")&&(this.activeEntry=null,this.activeMarker=null!==e.detail.marker?Number(e.detail.marker):null)}selectAction(e){if(!this.actions||null===this.activeEntry)return;const t=e.detail;t?this.entities.map(e=>e.id).forEach((e,i)=>{this.updateActiveEntryAction(Xs(e,t),i)}):this.entities.forEach((e,t)=>{this.updateActiveEntryAction(null,t)})}getVariableEditor(){if(null===this.activeEntry||!this.actions)return q``;const e=[];return this.schedule.timeslots[this.activeEntry].actions.forEach(t=>{t=Je(t,"entity_id"),this.actions.find(e=>os(e,t,!0)&&Object.keys(e.variables||{}).length)&&(e.some(e=>tt(e,t))||e.push(t))}),e.map(e=>Object.entries(this.actions.find(t=>os(t,e,!0)).variables).map(([t,i])=>q`
            <div class="header">
              ${i.name||st(t)}
            </div>
            <scheduler-variable-picker
              .variable=${i}
              .value=${e.service_data?e.service_data[t]:null}
              @value-changed=${e=>this.entities.forEach((i,a)=>{this.updateActiveEntryAction({service_data:{[t]:e.detail.value}},a)})}
            >
              ${this.hass.localize("ui.dialogs.helper_settings.input_select.no_options")}
            </scheduler-variable-picker>
          `))}selectDays(e){const t=e.target.value;let i=this.schedule.weekdays;if(Object.values(St).includes(t))switch(t){case St.Daily:i=["daily"];break;case St.Workday:i=["workday"];break;case St.Weekend:i=["weekend"];break;case St.Custom:i=[]}else i=t;this.schedule=Object.assign(Object.assign({},this.schedule),{weekdays:i})}};function _o(e,t,i){const a=e.getFullYear()==(new Date).getFullYear(),s=()=>{try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1};return i?Me(e,"isoDate"):a?s()?new Intl.DateTimeFormat(t.language,{month:"long",day:"numeric"}).format(e):Me(e,"MMMM D"):s()?new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}).format(e):Me(e,"MMMM D, YYYY")}po.styles=r`
    ${Ns}
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
  `,t([de()],po.prototype,"hass",void 0),t([de()],po.prototype,"config",void 0),t([de()],po.prototype,"schedule",void 0),t([de()],po.prototype,"actions",void 0),t([de()],po.prototype,"entities",void 0),t([de()],po.prototype,"activeEntry",void 0),t([de()],po.prototype,"activeMarker",void 0),t([de({type:Boolean})],po.prototype,"timeslots",void 0),t([de({type:Boolean})],po.prototype,"editItem",void 0),t([de({type:Boolean})],po.prototype,"large",void 0),po=t([re("scheduler-editor-time")],po);let vo=class extends oe{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.disabled=!1,this.allowCustomValue=!1,this.invalid=!1}disconnectedCallback(){super.disconnectedCallback(),this._overlayMutationObserver&&(this._overlayMutationObserver.disconnect(),this._overlayMutationObserver=void 0)}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}focus(){this.updateComplete.then(()=>{var e,t,i;null===(i=null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t?void 0:t.inputElement)||void 0===i||i.focus()})}shouldUpdate(e){if(e.get("items"))if(tt(this.items,e.get("items"))){if(1==e.size)return!1}else this.firstUpdated();return!0}firstUpdated(){(async()=>{await uo()})(),this._comboBox.items=this.items}render(){return q`
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
        <ha-textfield
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
        >
          ${et(this._value)&&this.items.find(e=>e.value==this._value)?q`
                ${this.icons?q`
                      <ha-icon slot="prefix" icon="${this.items.find(e=>e.value==this._value).icon}"> </ha-icon>
                    `:""}
                ${this.clearable?q`
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} .path=${Ls}>
                      </ha-icon-button>
                    `:""}
              `:""}
        </ha-textfield>
        <ha-svg-icon
          class="toggle-button ${this.items.length?"":"disabled"}"
          .path=${this._opened&&this.items.length?"M7,15L12,10L17,15H7Z":"M7,10L12,15L17,10H7Z"}
          @click=${this._toggleOpen}
        ></ha-svg-icon>
      </vaadin-combo-box-light>
    `}rowRenderer(e,t,i){e.firstElementChild||(e.innerHTML='\n        <mwc-list-item>\n          <span class="name"><span>\n        </mwc-list-item>\n      '),e.querySelector(".name").textContent=i.item.name}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return et(this.value)?this.value:""}_toggleOpen(e){var t,i,a,s,o,n;this.items.length?this._opened?(null===(a=null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("vaadin-combo-box-light"))||void 0===i?void 0:i.inputElement)||void 0===a||a.blur(),e.stopPropagation()):null===(n=null===(o=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector("vaadin-combo-box-light"))||void 0===o?void 0:o.inputElement)||void 0===n||n.focus():e.stopPropagation()}_openedChanged(e){if(this._opened=e.detail.value,this._opened&&"MutationObserver"in window&&!this._overlayMutationObserver){const e=document.querySelector("vaadin-combo-box-overlay");if(!e)return;this._overlayMutationObserver=new MutationObserver(t=>{t.forEach(t=>{var i;"attributes"===t.type&&"inert"===t.attributeName&&!0===e.inert?(e.inert=!1,null===(i=this._overlayMutationObserver)||void 0===i||i.disconnect(),this._overlayMutationObserver=void 0):"childList"===t.type&&t.removedNodes.forEach(e=>{var t;"VAADIN-COMBO-BOX-OVERLAY"===e.nodeName&&(null===(t=this._overlayMutationObserver)||void 0===t||t.disconnect(),this._overlayMutationObserver=void 0)})})}),this._overlayMutationObserver.observe(e,{attributes:!0}),this._overlayMutationObserver.observe(document.body,{childList:!0})}}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{Ie(this,"value-changed",{value:e})},0)}static get styles(){return r`
      :host {
        display: block;
        width: 100%;
      }
      vaadin-combo-box-light {
        position: relative;
      }
      ha-textfield {
        width: 100%;
      }
      ha-textfield > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      ha-svg-icon {
        color: var(--input-dropdown-icon-color);
        position: absolute;
        cursor: pointer;
      }
      ha-svg-icon.disabled {
        cursor: default;
        color: var(--disabled-text-color);
      }
      .toggle-button {
        right: 12px;
        top: -10px;
      }
      :host([opened]) .toggle-button {
        color: var(--primary-color);
      }
    `}};t([de()],vo.prototype,"label",void 0),t([de()],vo.prototype,"value",void 0),t([de()],vo.prototype,"items",void 0),t([de()],vo.prototype,"clearable",void 0),t([de()],vo.prototype,"icons",void 0),t([de({type:Boolean})],vo.prototype,"disabled",void 0),t([ce()],vo.prototype,"_opened",void 0),t([de({attribute:"allow-custom-value",type:Boolean})],vo.prototype,"allowCustomValue",void 0),t([de({type:Boolean})],vo.prototype,"invalid",void 0),t([function(e,t){return ue({descriptor:i=>{const a={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;a.get=function(){var i,a;return void 0===this[t]&&(this[t]=null!==(a=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==a?a:null),this[t]}}return a}})}("vaadin-combo-box-light",!0)],vo.prototype,"_comboBox",void 0),vo=t([re("scheduler-select")],vo);let go=class extends oe{constructor(){super(...arguments),this.items=[],this.value=[],this.label="",this.invalid=!1}shouldUpdate(e){return e.get("items")&&(tt(this.items,e.get("items"))||this.firstUpdated()),!0}firstUpdated(){this.value.some(e=>!this.items.map(e=>e.value).includes(e))&&(this.value=this.value.filter(e=>this.items.map(e=>e.value).includes(e)),Ie(this,"value-changed",{value:this.value}))}render(){return q`
      <div class="chip-set">
        ${this.value.length?this.value.map(e=>this.items.find(t=>t.value==e)).filter(et).map(e=>q`
          <div class="chip">
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="mdi:close" @click=${()=>this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `):""}
      </div>

      <scheduler-select
        .items=${this.items.filter(e=>!this.value.includes(e.value))}
        label=${this.label}
        .icons=${!1}
        .allowCustomValue=${!0}
        @value-changed=${this._addClick}
        ?invalid=${this.invalid&&this.value.length!=this.items.length}
      >
      </scheduler-select>
    `}_removeClick(e){this.value=this.value.filter(t=>t!==e),Ie(this,"value-changed",{value:this.value})}_addClick(e){e.stopPropagation();const t=e.target,i=t.value;this.value.includes(i)||(this.value=[...this.value,i]),t.value="",Ie(this,"value-changed",{value:[...this.value]})}static get styles(){return r`
      div.chip-set {
        margin: 0px -4px;
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
    `}};t([de()],go.prototype,"items",void 0),t([de({type:Array})],go.prototype,"value",void 0),t([de()],go.prototype,"label",void 0),t([de({type:Boolean})],go.prototype,"invalid",void 0),go=t([re("scheduler-selector")],go);const fo=(e,t)=>{let i={};return(null==t?void 0:t.length)&&!t.includes(jt.Above)||(i=Object.assign(Object.assign({},i),{[jt.Above]:{value:jt.Above,name:e.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.above"),icon:"mdi:greater-than"}})),(null==t?void 0:t.length)&&!t.includes(jt.Below)||(i=Object.assign(Object.assign({},i),{[jt.Below]:{value:jt.Below,name:e.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.below"),icon:"mdi:less-than"}})),(null==t?void 0:t.length)&&!t.includes(jt.Equal)||(i=Object.assign(Object.assign({},i),{[jt.Equal]:{value:jt.Equal,name:Ya("ui.panel.conditions.equal_to",rt(e)),icon:"mdi:equal"}})),(null==t?void 0:t.length)&&!t.includes(jt.Unequal)||(i=Object.assign(Object.assign({},i),{[jt.Unequal]:{value:jt.Unequal,name:Ya("ui.panel.conditions.unequal_to",rt(e)),icon:"mdi:not-equal-variant"}})),i};let yo=class extends oe{constructor(){super(...arguments),this.editItem=!1,this.addCondition=!1,this.tags=[],this.startDate="",this.endDate=""}async firstUpdated(){var e,t,i;if(null===(e=this.config)||void 0===e?void 0:e.tags){(async()=>{await uo()})();const e=(await kt(this.hass)).map(e=>e.name),t=lt(this.config.tags);this.tags=[...e,...t.filter(t=>!e.includes(t)&&!["none","disabled","enabled"].includes(t))]}(await window.loadCardHelpers()).importMoreInfoControl("input_datetime"),this.startDate=(null===(t=this.schedule)||void 0===t?void 0:t.start_date)||_o(new Date,rt(this.hass),!0),this.endDate=(null===(i=this.schedule)||void 0===i?void 0:i.end_date)||_o(new Date,rt(this.hass),!0)}shouldUpdate(e){return e.get("schedule")&&this.dispatchEvent(new CustomEvent("change",{detail:{schedule:this.schedule}})),!0}render(){var e,t;if(!this.hass||!this.config||!this.schedule)return q``;let i=[{name:this.hass.localize("ui.panel.config.automation.editor.actions.type.repeat.label"),value:xt.Repeat,icon:"refresh"},{name:this.hass.localize("ui.dialogs.more_info_control.vacuum.stop"),value:xt.Pause,icon:"stop"},{name:this.hass.localize("ui.common.delete"),value:xt.Single,icon:"trash-can-outline"}];return et(this.schedule.start_date)&&(i=i.filter(e=>e.value!=xt.Repeat)),q`
        <div class="content">
          ${this.addCondition?this.renderAddCondition():q`
                  <div class="header">
                    ${this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.conditions")}
                    ${!this.schedule.timeslots[0].conditions||this.schedule.timeslots[0].conditions.length<2?"":q`
                          <div class="switch">
                            ${Ya("ui.panel.conditions.any",rt(this.hass))}
                            <ha-switch
                              style="margin: 0px 10px"
                              @change=${this.conditionTypeSwitchClick}
                              ?checked=${this.schedule.timeslots[0].condition_type==zt.All}
                            ></ha-switch>
                            ${Ya("ui.panel.conditions.all",rt(this.hass))}
                          </div>
                        `}
                  </div>
                  ${this.renderConditions()}

                  <div class="condition-options">
                    <div style="flex: 1">
                      <mwc-button @click=${this.addConditionClick}>
                        <ha-icon icon="mdi:plus-circle-outline" class="padded-right"></ha-icon>
                        ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
                      </mwc-button>
                    </div>
                    <div class="track-conditions">
                      ${this.schedule.timeslots[0].stop&&this.schedule.timeslots[0].conditions&&this.schedule.timeslots[0].conditions.length>0?q`
                            <ha-checkbox
                              id="track_conditions"
                              ?checked=${this.schedule.timeslots[0].track_conditions}
                              @change=${this.trackConditionsClick}
                            ></ha-checkbox>
                            <span
                              @click=${()=>this.shadowRoot.querySelector("#track_conditions").click()}
                            >
                              ${Ya("ui.panel.conditions.track_conditions",rt(this.hass))}
                            </span>
                          `:""}
                    </div>
                  </div>

                  <div class="header">${Ya("ui.panel.options.period",rt(this.hass))}</div>
                  <div class="checkbox-container">
                    <div class="checkbox">
                      <ha-checkbox
                        ?checked=${et(this.schedule.start_date)}
                        @change=${this.toggleEnableDateRange}
                      >
                      </ha-checkbox>
                    </div>
                    <div class="slider date-range">
                      <div>
                        <span>
                          ${st((null===(e=Ya("ui.components.date.days_range",rt(this.hass)).split("{").shift())||void 0===e?void 0:e.trim())||"")}
                        </span>
                        <ha-date-input
                          .locale=${this.hass.locale}
                          value=${this.startDate}
                          .label=${this.hass.localize("ui.components.date-range-picker.start_date")}
                          @value-changed=${this._setStartDate}
                          ?disabled=${!et(this.schedule.start_date)}
                        >
                        </ha-date-input>
                      </div>

                      <div>
                        <span>
                          ${st((null===(t=Ya("ui.components.date.days_range",rt(this.hass)).split("}")[1].split("{").shift())||void 0===t?void 0:t.trim())||"")}
                        </span>
                        <ha-date-input
                          .locale=${this.hass.locale}
                          value=${this.endDate}
                          .label=${this.hass.localize("ui.components.date-range-picker.end_date")}
                          @value-changed=${this._setEndDate}
                          ?disabled=${!et(this.schedule.start_date)}
                        >
                        </ha-date-input>
                      </div>
                    </div>
                  </div>

                  <div class="header">${this.hass.localize("ui.components.area-picker.add_dialog.name")}</div>
                  <ha-textfield
                    value=${this.schedule.name||""}
                    placeholder=${this.schedule.name?"":this.hass.localize("ui.components.area-picker.add_dialog.name")}
                    @input=${this.updateName}
                  ></ha-textfield>

                  ${this.config.tags?q`
                        <div class="header">${this.hass.localize("ui.panel.config.tag.caption")}</div>
                        <scheduler-selector
                          .items=${this.getTagOptions()}
                          .value=${this.schedule.tags||[]}
                          @value-changed=${this.updateTags}
                          label=${this.hass.localize("ui.panel.config.tag.add_tag")}
                        >
                        </scheduler-selector>
                      `:""}

                  <div class="header">${Ya("ui.panel.options.repeat_type",rt(this.hass))}</div>
                  <button-group
                    .items=${i}
                    value="${this.schedule.repeat_type}"
                    @change=${this.updateRepeatType}
                  >
                  </button-group>
                `}
        </div>
        <div class="buttons ${this.addCondition||this.editItem?"":"centered"}">
          ${this.addCondition?q`
                  <mwc-button
                    @click=${this.confirmConditionClick}
                    ?disabled=${!this.selectedEntity||!this.conditionMatchType||!et(this.conditionValue)||"string"==typeof this.conditionValue&&!this.conditionValue.trim().length}
                    >${this.hass.localize("ui.common.save")}</mwc-button
                  >
                  ${void 0!==this.editConditionItem?q`
                        <mwc-button class="warning" @click=${this.deleteConditionClick}
                          >${this.hass.localize("ui.common.delete")}</mwc-button
                        >
                      `:""}
                  <mwc-button @click=${this.cancelConditionClick} style="float: right"
                    >${this.hass.localize("ui.common.cancel")}</mwc-button
                  >
                `:q`
                  ${this.editItem?q`
                        <mwc-button
                          class="warning"
                          @click=${()=>this.dispatchEvent(new CustomEvent("deleteClick",{detail:this.schedule}))}
                        >
                          ${this.hass.localize("ui.common.delete")}
                        </mwc-button>
                      `:""}
                  <mwc-button
                    @click=${()=>this.dispatchEvent(new CustomEvent("saveClick",{detail:this.schedule}))}
                    ?disabled=${!this.schedule.timeslots.filter(e=>e.actions.length).length}
                  >
                    ${this.hass.localize("ui.common.save")}
                  </mwc-button>
                `}
        </div>
      </ha-card>
    `}renderAddCondition(){if(!this.addCondition||!this.hass||!this.config)return q``;if(this.selectedEntity){const e=this.selectedEntity,t=Ks(e.id,this.hass,this.config);let i;if((null==t?void 0:t.type)==$t.Level)i=[jt.Above,jt.Below];else if((null==t?void 0:t.type)==$t.List)i=[jt.Equal,jt.Unequal];else{const t=e.id in this.hass.states?this.hass.states[e.id].state:null;i=!t||["unavailable","unknown"].includes(t)?[jt.Equal,jt.Unequal,jt.Above,jt.Below]:isNaN(Number(t))?[jt.Equal,jt.Unequal]:[jt.Above,jt.Below]}const a=fo(this.hass,i);return q`
        <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
        <div style="display: flex; flex-direction: row; align-items: center">
          <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)">
            <ha-icon icon="${ot(e.icon||"folder-outline")}"></ha-icon>
            ${st(e.name)}
          </mwc-button>
          <ha-icon-button
            .path=${Is}
            style="margin-left: 10px"
            @click=${()=>{this.selectedEntity=void 0}}
          >
          </ha-icon-button>
        </div>

        <div class="header">
          ${this.hass.localize("ui.panel.config.automation.editor.conditions.type.device.condition")}
        </div>
        <button-group
          .items=${Object.values(a)}
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
      `}{const e=Rs(Js(this.hass,this.config,{filterActions:!1,filterStates:!0}),this.config,this.hass);e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1);let t=[];return this.selectedGroup&&(t=e.find(e=>tt(e,this.selectedGroup)).entities.map(e=>ht(e,this.hass,this.config)),t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1)),q`
        <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>

        <button-group
          .items=${e}
          .value=${e.findIndex(e=>tt(e,this.selectedGroup))}
          @change=${this.selectGroup}
        >
          ${Ya("ui.panel.entity_picker.no_groups_defined",rt(this.hass))}
        </button-group>

        <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
        <button-group
          .items=${t}
          .value=${t.findIndex(e=>tt(e,this.selectedEntity))}
          @change=${this.selectEntity}
        >
          ${this.selectedGroup?Ya("ui.panel.entity_picker.no_entities_for_group",rt(this.hass)):Ya("ui.panel.entity_picker.no_group_selected",rt(this.hass))}
        </button-group>
      `}}selectGroup(e){this.selectedGroup=e.detail,this.selectedEntity=void 0}selectEntity(e){this.selectedEntity=e.detail,this.conditionMatchType=void 0,this.conditionValue=void 0}renderConditions(){if(!this.hass||!this.schedule)return q``;const e=this.schedule.timeslots[0].conditions||[];return e.length?e.map((e,t)=>{const i=ht(e.entity_id,this.hass,this.config),a=Ks(e.entity_id,this.hass,this.config);return q`
        <div class="summary">
          <ha-icon icon="${i.icon||"folder-outline"}"></ha-icon>
          <span>
            ${st(i.name)} ${fo(this.hass)[e.match_type].name.toLowerCase()}
            ${a?a.type==$t.List?Zt(e.value,a):a.type==$t.Level?Lt(e.value,a):e.value:""}
          </span>
          <ha-icon-button
            .path=${Is}
            @click=${()=>{this.editConditionClick(t)}}
          >
          </ha-icon-button>
        </div>
      `}):q`
        <div class="text-field">${Ya("ui.panel.conditions.no_conditions_defined",rt(this.hass))}</div>
      `}addConditionClick(){this.addCondition=!0,this.selectedEntity=void 0,this.selectedGroup=void 0}confirmConditionClick(){var e;if(!(this.selectedEntity&&this.config&&this.hass&&this.schedule&&this.conditionMatchType&&et(this.conditionValue)))return;const t={entity_id:this.selectedEntity.id,match_type:this.conditionMatchType,value:this.conditionValue,attribute:"state"},i=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[],a=this.schedule.timeslots[0].condition_type?this.schedule.timeslots[0].condition_type:zt.Any;void 0===this.editConditionItem?i.push(t):i.splice(this.editConditionItem,1,t),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:i,condition_type:a}))}),this.addCondition=!1,this.editConditionItem=void 0}cancelConditionClick(){this.addCondition=!1,this.editConditionItem=void 0}editConditionClick(e){if(!(this.schedule&&this.schedule.timeslots[0].conditions&&this.hass&&this.config))return;const t=this.schedule.timeslots[0].conditions[e];if(!t)return;this.editConditionItem=e;const i=Rs(Js(this.hass,this.config,{filterActions:!1,filterStates:!0}),this.config,this.hass);this.selectedGroup=i.find(e=>e.entities.includes(t.entity_id)),this.selectedEntity=ht(t.entity_id,this.hass,this.config),this.conditionMatchType=t.match_type,this.conditionValue=t.value,this.addCondition=!0}deleteConditionClick(){var e;if(!this.config||!this.hass||!this.schedule||void 0===this.editConditionItem)return;const t=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[];t.splice(this.editConditionItem,1),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:t}))}),this.addCondition=!1,this.editConditionItem=void 0}conditionTypeSwitchClick(e){if(!this.schedule)return;const t=e.target.checked?zt.All:zt.Any;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{condition_type:t}))})}trackConditionsClick(e){if(!this.schedule)return;const t=e.target.checked;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object(Object.assign(Object.assign({},e),{track_conditions:t})))})}_setStartDate(e){const t=String(e.detail.value);if(!t)return;$s(t)>$s(this.endDate)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t}_setEndDate(e){const t=String(e.detail.value);if(!t)return;$s(this.startDate)>$s(t)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t}),this.startDate=t),this.schedule=Object.assign(Object.assign({},this.schedule),{end_date:t}),this.endDate=t}toggleEnableDateRange(e){const t=e.target.checked;this.shadowRoot.querySelectorAll("ha-date-input");this.schedule=Object.assign(Object.assign({},this.schedule),{start_date:t?this.startDate:void 0,end_date:t?this.endDate:void 0,repeat_type:t?this.schedule.repeat_type==xt.Repeat?xt.Pause:this.schedule.repeat_type:this.schedule.repeat_type==xt.Pause?xt.Repeat:this.schedule.repeat_type})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t})}updateRepeatType(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}getTagOptions(){var e;let t=[...this.tags];return(null===(e=this.schedule)||void 0===e?void 0:e.tags.length)&&(t=[...t,...this.schedule.tags.filter(e=>!t.includes(e))]),t.sort(it),t.map(e=>Object({name:e,value:e}))}updateTags(e){let t=e.target.value;t=t.map(e=>e.trim()),t=t.filter(e=>!["none","disabled","enabled"].includes(e)),t.sort(it),this.schedule=Object.assign(Object.assign({},this.schedule),{tags:t})}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}deleteClick(){const e=new CustomEvent("deleteClick",{detail:this.schedule});this.dispatchEvent(e)}};yo.styles=r`
    ${Ns}
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
      flex-shrink: 0;
      flex-grow: 1;
      flex-basis: 160px;
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
    ha-textfield {
      width: 100%;
    }
  `,t([de()],yo.prototype,"hass",void 0),t([de()],yo.prototype,"config",void 0),t([de()],yo.prototype,"schedule",void 0),t([de()],yo.prototype,"selectedGroup",void 0),t([de()],yo.prototype,"selectedEntity",void 0),t([de()],yo.prototype,"conditionMatchType",void 0),t([de()],yo.prototype,"conditionValue",void 0),t([de()],yo.prototype,"editConditionItem",void 0),t([de({type:Boolean})],yo.prototype,"editItem",void 0),t([de()],yo.prototype,"addCondition",void 0),t([de()],yo.prototype,"tags",void 0),t([ce()],yo.prototype,"startDate",void 0),t([ce()],yo.prototype,"endDate",void 0),yo=t([re("scheduler-editor-options")],yo);let bo=class extends oe{constructor(){super(...arguments),this.actions=[],this.editItem=null,this.large=!1,this._currTab=Be.Entity,this._tabs=[Be.Entity,Be.Time,Be.Options]}provideHass(e){e.hass=this.hass}async showDialog(e){this._params=e,this._config=e.config,this.entities=e.entities,this.actions=e.actions,this.schedule=e.schedule,this.editItem=e.editItem,this.cardEmbeddedInPopup=e.cardEmbeddedInPopup,this._currTab=null!==this.editItem?Be.Time:Be.Entity,await this.updateComplete}async closeDialog(){this._params=void 0,this.large=!1}render(){var e,t,i,a;const s=null===(e=this.schedule)||void 0===e?void 0:e.timeslots.every(e=>e.stop),o=e=>e==Be.Entity?this.hass.localize("ui.components.entity.entity-picker.entity"):e==Be.Time?this.hass.localize("ui.dialogs.helper_settings.input_datetime.time"):e==Be.Options?this.hass.localize("ui.dialogs.helper_settings.input_select.options"):e;return this._params?q`
      <ha-dialog open @closed=${this.closeDialog} .heading=${!0} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.dialogs.more_info_control.dismiss")}
            .path=${Ls}
          ></ha-icon-button>
          <span slot="title" @click=${this._enlarge}>
            ${this.editItem?(null===(t=this.schedule)||void 0===t?void 0:t.name)?null===(i=this.schedule)||void 0===i?void 0:i.name:Ya("ui.panel.common.default_name",rt(this.hass),"{id}",this.editItem):Ya("ui.panel.common.new_schedule",rt(this.hass))}
          </span>
        </ha-dialog-header>
        <sl-tab-group
          @sl-tab-show=${this._handleTabChanged}
        >
          ${this._tabs.map(e=>q`
              <sl-tab
                slot="nav"
                ?disabled=${e!=Be.Entity&&!this.schedule}
                panel="${e}"
                .active=${this._currTab===e}
              >
                ${o(e)}
              </sl-tab>
            `)}
        </sl-tab-group>
        ${this._currTab==Be.Entity?q`
              <scheduler-editor-entity
                .hass=${this.hass}
                .config=${this._params.config}
                .entities=${null===(a=this.entities)||void 0===a?void 0:a.map(e=>e.id)}
                .schedule=${this.schedule}
                .actions=${this.actions}
                .cardEmbeddedInPopup=${this.cardEmbeddedInPopup}
                ?editItem=${null!==this.editItem}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-entity>
            `:this._currTab==Be.Time?q`
              <scheduler-editor-time
                .hass=${this.hass}
                .config=${this._params.config}
                .schedule=${this.schedule}
                .entities=${this.entities}
                .actions=${this.actions}
                ?timeslots=${s}
                ?editItem=${null!==this.editItem}
                .large=${this.large}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-time>
            `:this._currTab==Be.Options?q`
              <scheduler-editor-options
                .hass=${this.hass}
                .config=${this._config}
                .schedule=${this.schedule}
                ?editItem=${null!==this.editItem}
                @change=${this._handleUpdateParams}
                @saveClick=${this._handleSaveClick}
                @deleteClick=${this._handleDeleteClick}
              >
              </scheduler-editor-options>
            `:""}
      </ha-dialog>
    `:q``}_handleUpdateParams(e){const t=e.detail;t.schedule&&(this.schedule=t.schedule),t.actions&&(this.actions=t.actions),t.entities&&(this.entities=t.entities),t.tab&&(this._currTab=t.tab)}_handleTabChanged(e){const t=this._currTab,i=e.detail.name;i==Be.Time||this.schedule?i!==t&&(this._currTab=i):e.preventDefault()}_enlarge(){this.large=!this.large}async _handleSaveClick(){if(!this.hass)return;let e=Object.assign({},this.schedule);if(e=Object.assign(Object.assign({},e),{timeslots:e.timeslots.map(e=>{var t;return e.actions&&e.actions.length?(e.actions.some(e=>!e.entity_id||"notify"==Pe(e.entity_id||""))&&(e=Object.assign(Object.assign({},e),{actions:e.actions.map(e=>e.entity_id&&"notify"!=Pe(e.entity_id||"")?e:Je(e,"entity_id"))})),e.stop||(e=Je(e,"stop")),(null===(t=e.conditions)||void 0===t?void 0:t.length)||(e=Je(e,"conditions","condition_type")),e):null}).filter(et)}),this.editItem){const a=await yt(this.hass,this.editItem);if(tt(Je(e,"timeslots"),Je(Ke(a,Object.keys(e)),"timeslots"))&&e.timeslots.length==a.timeslots.length&&e.timeslots.every((e,t)=>tt(e,a.timeslots[t])));else{if(!a.enabled){await new Promise(e=>{const t={title:Ya("ui.dialog.enable_schedule.title",rt(this.hass)),description:Ya("ui.dialog.enable_schedule.description",rt(this.hass)),primaryButtonLabel:this.hass.localize("ui.common.yes"),secondaryButtonLabel:this.hass.localize("ui.common.no"),cancel:()=>{e(!1)},confirm:()=>{e(!0)}};gt(this,{dialogTag:"generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:t},this.cardEmbeddedInPopup)})&&this.hass.callService("switch","turn_on",{entity_id:a.entity_id})}(function(e){return!!e&&null!==e.match(/^Schedule\ #[a-f0-9]{6}/)})(e.name)&&(e=Object.assign(Object.assign({},e),{name:""})),(t=this.hass,i=Object.assign(Object.assign({},e),{schedule_id:this.editItem}),t.callApi("POST","scheduler/edit",i)).catch(e=>wt(e,this,this.hass,this.cardEmbeddedInPopup)).then(()=>{this.closeDialog()})}}else((e,t)=>e.callApi("POST","scheduler/add",t))(this.hass,e).catch(e=>wt(e,this,this.hass,this.cardEmbeddedInPopup)).then(()=>{this.closeDialog()});var t,i}async _handleDeleteClick(e){if(console.log(this.hass.localize("ui.common.ok")),!this.editItem)return;e.target;await new Promise(e=>{const t={title:Ya("ui.dialog.confirm_delete.title",rt(this.hass)),description:Ya("ui.dialog.confirm_delete.description",rt(this.hass)),primaryButtonLabel:this.hass.localize("ui.common.ok"),secondaryButtonLabel:this.hass.localize("ui.common.cancel"),cancel:()=>{e(!1)},confirm:()=>{e(!0)}};gt(this,{dialogTag:"generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:t},this.cardEmbeddedInPopup)})&&bt(this.hass,this.editItem).catch(e=>wt(e,this,this.hass,this.cardEmbeddedInPopup)).then(()=>{this.closeDialog()})}static get styles(){return r`
      ${Ps}
      sl-tab {
        flex: 1;
        text-align: center;
      }
    `}};t([de()],bo.prototype,"_config",void 0),t([ce()],bo.prototype,"_params",void 0),t([de()],bo.prototype,"editItem",void 0),t([de({type:Boolean,reflect:!0})],bo.prototype,"large",void 0),t([ce()],bo.prototype,"_currTab",void 0),bo=t([re("scheduler-editor-dialog")],bo);var ko=Object.freeze({__proto__:null,get SchedulerEditorDialog(){return bo}});let wo=class extends oe{constructor(){super(...arguments),this.scheduleEntities=[],this._cardTab=0,this.selectedDomain=""}setConfig(e){this._config=e}async firstUpdated(){await uo(),this.scheduleEntities=(await ft(this.hass)).map(e=>e.entity_id);const e=(await kt(this.hass)).map(e=>e.name);e.sort(it),this.tagOptions=e}render(){return this.hass&&this._config?q`
      <sl-tab-group .selected=${this._cardTab?1:0} @iron-activate=${this._selectTab}>
        <sl-tab
          slot="nav"
          panel="0"
          .active=${0===this._cardTab}
        >
          ${Ya("ui.panel.card_editor.tabs.entities",rt(this.hass))}
        </sl-tab>
        <sl-tab
          slot="nav"
          panel="0"
          .active=${1===this._cardTab}
        >
          ${Ya("ui.panel.card_editor.tabs.other",rt(this.hass))}
        </sl-tab>
      </sl-tab-group>

      <div class="card-config">
        ${this._cardTab?q`
              <div class="header">${Ya("ui.panel.card_editor.fields.title.heading",rt(this.hass))}</div>
              <button-group
                .items=${[{name:Ya("ui.panel.card_editor.fields.title.options.standard",rt(this.hass)),value:"standard"},{name:Ya("ui.panel.card_editor.fields.title.options.hidden",rt(this.hass)),value:"hidden"},{name:Ya("ui.panel.card_editor.fields.title.options.custom",rt(this.hass)),value:"custom"}]}
                value=${this.getTitleOption()}
                @change=${e=>this._setTitleFormatOption(e.target.value)}
              >
              </button-group>
              ${"string"==typeof this._config.title?q`
                    <ha-textfield
                      label=${Ya("ui.panel.card_editor.fields.title.custom_title",rt(this.hass))}
                      .value=${this._config.title}
                      @input=${e=>{this._updateConfig({title:String(e.target.value)})}}
                    ></ha-textfield>
                  `:""}

              <div class="header">
                ${Ya("ui.panel.card_editor.fields.discover_existing.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.discover_existing.description",rt(this.hass))}
              </div>
              <ha-switch
                ?checked=${!1!==this._config.discover_existing}
                @change=${e=>{this._updateConfig({discover_existing:e.target.checked})}}
              >
              </ha-switch>

              <div class="header">
                ${Ya("ui.panel.card_editor.fields.time_step.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.time_step.description",rt(this.hass))}
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
                ${Ya("ui.panel.card_editor.fields.sort_by.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.sort_by.description",rt(this.hass))}
              </div>

              <div>
                <ha-formfield
                  label=${Ya("ui.panel.card_editor.fields.sort_by.options.relative_time",rt(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${lt(this._config.sort_by||Fe.sort_by).includes("relative-time")}
                    value="relative-time"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
                <ha-formfield
                  label=${Ya("ui.panel.card_editor.fields.sort_by.options.title",rt(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${lt(this._config.sort_by||Fe.sort_by).includes("title")}
                    value="title"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
              </div>

              <div>
                <ha-formfield
                  label=${Ya("ui.panel.card_editor.fields.sort_by.options.state",rt(this.hass))}
                >
                  <ha-checkbox
                    ?checked=${lt(this._config.sort_by||Fe.sort_by).includes("state")}
                    value="state"
                    @change=${this._setSortBy}
                  ></ha-checkbox>
                </ha-formfield>
              </div>

              <div class="header">
                ${Ya("ui.panel.card_editor.fields.display_format_primary.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.display_format_primary.description",rt(this.hass))}
              </div>

              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_primary.options.default",rt(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${"default"==(this._config.display_options||Fe.display_options).primary_info}
                  value="default"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>
              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_primary.options.entity_action",rt(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${"{entity}: {action}"==(this._config.display_options||Fe.display_options).primary_info}
                  value="{entity}: {action}"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>

              <div class="header">
                ${Ya("ui.panel.card_editor.fields.display_format_secondary.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.display_format_secondary.description",rt(this.hass))}
              </div>

              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_secondary.options.relative_time",rt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${lt((this._config.display_options||Fe.display_options).secondary_info).includes("relative-time")}
                  value="relative-time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_secondary.options.time",rt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${lt((this._config.display_options||Fe.display_options).secondary_info).includes("time")}
                  value="time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_secondary.options.days",rt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${lt((this._config.display_options||Fe.display_options).secondary_info).includes("days")}
                  value="days"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${Ya("ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks",rt(this.hass))}
              >
                <ha-checkbox
                  ?checked=${lt((this._config.display_options||Fe.display_options).secondary_info).includes("additional-tasks")}
                  value="additional-tasks"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <div class="header">
                ${Ya("ui.panel.card_editor.fields.show_header_toggle.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.show_header_toggle.description",rt(this.hass))}
              </div>
              <ha-switch
                ?checked=${this._config.show_header_toggle}
                @change=${e=>{this._updateConfig({show_header_toggle:e.target.checked})}}
              >
              </ha-switch>

              ${void 0!==this.tagOptions?q`
                    <div class="header">
                      ${Ya("ui.panel.card_editor.fields.tags.heading",rt(this.hass))}
                    </div>
                    <div class="text-field">
                      ${Ya("ui.panel.card_editor.fields.tags.description",rt(this.hass))}
                    </div>
                    <scheduler-selector
                      .items=${this.getTagOptions()}
                      .value=${lt(this._config.tags)}
                      @value-changed=${this.updateTags}
                      label=${this.hass.localize("ui.panel.config.tag.add_tag")}
                    >
                    </scheduler-selector>
                  `:""}
            `:q`
              <div class="header">
                ${Ya("ui.panel.card_editor.fields.entities.heading",rt(this.hass))}
              </div>
              <div class="text-field">
                ${Ya("ui.panel.card_editor.fields.entities.description",rt(this.hass))}
              </div>
              ${this.getDomainSwitches()}
            `}
      </div>
    `:q``}_selectTab(e){this._cardTab=parseInt(e.detail.name)}_updateConfig(e){this._config&&(this._config=Object.assign(Object.assign({},this._config),e),Ie(this,"config-changed",{config:this._config}))}_setTitleFormatOption(e){var t;this.hass&&("standard"==e?this._updateConfig({title:!0}):"hidden"==e?this._updateConfig({title:!1}):this._updateConfig({title:"string"==typeof(null===(t=this._config)||void 0===t?void 0:t.title)?this._config.title:Ya("ui.panel.common.title",rt(this.hass))}))}getTitleOption(){return this.hass&&this._config?"string"==typeof this._config.title?"custom":this._config.title?"standard":"hidden":""}updateTags(e){if(!this._config||!this.hass)return;let t=e.target.value;t=t.map(e=>e.trim()),t.sort(it),this._updateConfig({tags:t})}getTagOptions(){if(!this._config||!this.hass)return[];let e=this.tagOptions||[];if(this._config.tags){const t=lt(this._config.tags);e=[...e,...t.filter(t=>!e.includes(t))]}return e.map(e=>Object({name:e,value:e}))}_setSortBy(e){var t;const i=e.target.checked,a=e.target.value;let s=lt((null===(t=this._config)||void 0===t?void 0:t.sort_by)||Fe.sort_by);"state"!=a&&i&&(s=s.filter(e=>"state"==e)),!s.includes(a)&&i&&(s=[...s,a]),s.includes(a)&&!i&&(s=s.filter(e=>e!=a)),this._updateConfig({sort_by:s})}_setDisplayOptionsPrimary(e){var t;const i=e.target.value,a=Object.assign(Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||Fe.display_options),{primary_info:i});this._updateConfig({display_options:a})}_setDisplayOptionsSecondary(e){var t;const i=e.target.value,a=e.target.checked;let s=Object.assign({},(null===(t=this._config)||void 0===t?void 0:t.display_options)||Fe.display_options),o=lt(s.secondary_info||[]);o=a?Array.from(new Set([...o,i])):o.filter(e=>e!==i),o.sort((e,t)=>{const i={"relative-time":1,time:o.includes("relative-time")?3:2,days:o.includes("relative-time")?2:3,"additional-tasks":4},a=Object.keys(i).includes(e)?i[e]:5,s=Object.keys(i).includes(t)?i[t]:5;return a>s?1:a<s?-1:0}),s=Object.assign(Object.assign({},s),{secondary_info:[...o]}),this._updateConfig({display_options:s})}getDomainSwitches(){if(!this._config||!this.hass)return;const e=Js(this.hass,Object.assign(Object.assign({},Fe),{include:["*"]}),{filterActions:!0,filterStates:!0}).filter(e=>"switch"!==Pe(e)||!this.scheduleEntities.includes(e)).map(e=>ht(e,this.hass,{include:["*"]})).filter(e=>Ws(e.id,this.hass)||_s(e.id,this.hass,Fe)),t=e.map(e=>Pe(e.id)).filter((e,t,i)=>i.indexOf(e)===t);return t.sort((e,t)=>e.trim().toLowerCase()<t.trim().toLowerCase()?-1:1),t.map(t=>{var i;const a=e.filter(e=>Pe(e.id)==t).length,s=e.filter(e=>Pe(e.id)==t),o=s.filter(e=>gs(e.id,this._config)).length;return a?q`
        <div class="row" @click=${()=>this.toggleShowDomain(t)}>
          <ha-icon icon="${ot(ct[t])}"> </ha-icon>

          <div class="info">
            ${t}
            <div class="secondary">
              ${Ya("ui.panel.card_editor.fields.entities.included_number",rt(this.hass),["{number}","{total}"],[o,a])}
            </div>
          </div>
          <ha-switch
            @click=${e=>e.stopPropagation()}
            @change=${e=>this.toggleSelectEntity(t,e.target.checked)}
            ?checked=${gs(t,this._config)}
            ?disabled=${gs(t,{groups:null===(i=this._config)||void 0===i?void 0:i.groups})}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain==t?q`
              <div class="divider"></div>
              ${s.map(e=>{var i,a;return q`
                  <div class="row" @click=${()=>this.toggleSelectEntity(e.id)}>
                    <ha-icon icon="${e.icon}"></ha-icon>
                    <div class="info">
                      ${e.name}
                      <div class="secondary">
                        ${e.id}
                      </div>
                    </div>
                    <ha-switch
                      ?checked=${gs(e.id,this._config)}
                      ?disabled=${gs(e.id,{groups:null===(i=this._config)||void 0===i?void 0:i.groups})||gs(t,{groups:null===(a=this._config)||void 0===a?void 0:a.groups})}
                    ></ha-switch>
                  </div>
                `})}
              <div class="divider"></div>
            `:""}
      `:""})}toggleShowDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectEntity(e,t){if(!this._config||!this.hass)return;const i=gs(e,this._config);void 0===t&&(t=!i);const a=Pe(e);let s=[...this._config.include||[]],o=[...this._config.exclude||[]];if(!i&&t)o.includes(e)&&(o=o.filter(t=>t!=e)),s.includes(e)||(s=[...s,e]);else{if(!i||t)return;(a&&s.includes(a)||gs(e,{customize:this._config.customize})||a&&gs(a,{customize:this._config.customize}))&&(o=[...o,e]),s.includes(e)&&(s=s.filter(t=>t!=e))}s.sort(it),o.sort(it),this._updateConfig({include:s,exclude:o})}static get styles(){return r`
      ${Ns}
      sl-tab {
        flex: 1;
        text-align: center;
      }
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
        color: var(--state-icon-color);
      }
      div.row state-badge {
        flex: 0 0 40px;
      }
      div.row ha-switch {
        padding: 13px 5px;
      }
      ha-textfield {
        width: 100%;
      }
    `}};t([de()],wo.prototype,"hass",void 0),t([de()],wo.prototype,"_config",void 0),t([de()],wo.prototype,"scheduleEntities",void 0),t([de()],wo.prototype,"tagOptions",void 0),t([ce()],wo.prototype,"_cardTab",void 0),t([de()],wo.prototype,"selectedDomain",void 0),wo=t([re("scheduler-card-editor")],wo);let xo=class extends oe{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const a=i>=0?"past":"future";i=Math.abs(i);const s=Math.round(i);if("future"==a&&s>0){if(i/3600>=6){const i=t.setHours(0,0,0,0),a=Math.floor((e.valueOf()-i.valueOf())/864e5);let s="";a>14?s=_o(e,rt(this._hass)):a>7?s=Ya("ui.components.date.next_week_day",rt(this._hass),"{weekday}",ys(e,rt(this._hass))):1==a?s=Ya("ui.components.date.tomorrow",rt(this._hass)):a>0&&(s=ys(e,rt(this._hass)));let o=Ya("ui.components.time.absolute",rt(this._hass),"{time}",xs(e,rt(this._hass)));return 12==e.getHours()&&0==e.getMinutes()?o=Ya("ui.components.time.at_noon",rt(this._hass)):0==e.getHours()&&0==e.getMinutes()&&(o=Ya("ui.components.time.at_midnight",rt(this._hass))),String(s+" "+o).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(rt(this._hass).language,{numeric:"auto"}).format(1,"hour")} ${t} ${Intl.NumberFormat(rt(this._hass).language,{style:"unit",unit:"minute",unitDisplay:"long"}).format(e)}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.common.and");return`${new Intl.RelativeTimeFormat(rt(this._hass).language,{numeric:"auto"}).format(1,"minute")} ${t} ${Intl.NumberFormat(rt(this._hass).language,{style:"unit",unit:"second",unitDisplay:"long"}).format(e)}`}}const o=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var a=qt(qt({},Vt),i||{}),s=(+e-+t)/1e3;if(Math.abs(s)<a.second)return{value:Math.round(s),unit:"second"};var o=s/60;if(Math.abs(o)<a.minute)return{value:Math.round(o),unit:"minute"};var n=s/3600;if(Math.abs(n)<a.hour)return{value:Math.round(n),unit:"hour"};var r=s/86400;if(Math.abs(r)<a.day)return{value:Math.round(r),unit:"day"};var l=new Date(e),d=new Date(t),c=l.getFullYear()-d.getFullYear();if(Math.round(Math.abs(c))>0)return{value:Math.round(c),unit:"year"};var u=12*c+l.getMonth()-d.getMonth();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"month"};var m=s/604800;return{value:Math.round(m),unit:"week"}}(e);return new Intl.RelativeTimeFormat(rt(this._hass).language,{numeric:"auto"}).format(o.value,o.unit)}render(){if(!this._hass||!this.datetime)return q``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),q`
      ${at(this.relativeTime(this.datetime))}
    `}};t([de()],xo.prototype,"_hass",void 0),t([de()],xo.prototype,"datetime",void 0),xo=t([re("my-relative-time")],xo),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v3.2.15".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");const $o=e=>new Date(e.timestamps[e.next_entries[0]]).valueOf(),jo=(e,t)=>{var i,a;if(!e.timeslots.every(e=>e.actions.every(e=>gs(e.entity_id||e.service,t))))return!1;let s=!0;const o=lt(t.tags);o.length&&(s=!1,((e.tags||[]).some(e=>o.includes(e))||o.includes("none")&&!(null===(i=e.tags)||void 0===i?void 0:i.length)||o.includes("enabled")&&e.enabled||o.includes("disabled")&&!e.enabled)&&(s=!0));const n=lt(t.exclude_tags);return n.length&&s&&((e.tags||[]).some(e=>n.includes(e))||n.includes("none")&&!(null===(a=e.tags)||void 0===a?void 0:a.length)||n.includes("enabled")&&e.enabled||n.includes("disabled")&&!e.enabled)&&(s=!1),s},zo=(e,t)=>!!t.discover_existing||!!e&&jo(e,t),Oo=(e,t,i)=>({primaryInfo:js(e,t,i),secondaryInfo:zs(e,t,i),icon:Os(e,t,i)});e.SchedulerCard=class extends(Cs(oe)){constructor(){super(...arguments),this.showDiscovered=!1,this.translationsLoaded=!1,this.scheduleDisplayInfo={},this.connectionError=!1}static getConfigElement(){return document.createElement("scheduler-card-editor")}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeMessage(e=>this.updateScheduleItem(e),{type:"scheduler_updated"})]}firstUpdated(){const e=this.hass;if(e.localize("ui.panel.config.automation.editor.actions.type.device_id.action"))this.translationsLoaded=!0;else{document.querySelector("home-assistant")._loadFragmentTranslations(e.language,"config").then(()=>{this.hass.localize})}}provideHass(e){e.hass=this.hass}async updateScheduleItem(e){var t;"scheduler_item_removed"!=e.event?yt(this.hass,e.schedule_id).then(t=>{var i;const a=null===(i=this.schedules)||void 0===i?void 0:i.find(t=>t.schedule_id==e.schedule_id);let s=[...this.schedules||[]];try{this.scheduleDisplayInfo=Object.assign(Object.assign({},this.scheduleDisplayInfo),{[t.schedule_id]:Oo(t,this._config,this.hass)})}catch(e){}t&&zo(t,this._config)?s=a?$o(a)==$o(t)?s.map(e=>e.schedule_id==t.schedule_id?t:e):this.sortSchedules(s.map(e=>e.schedule_id==t.schedule_id?t:e)):this.sortSchedules([...s,t]):a&&(s=s.filter(t=>t.schedule_id!=e.schedule_id)),this.schedules=[...s]}):this.schedules=null===(t=this.schedules)||void 0===t?void 0:t.filter(t=>t.schedule_id!=e.schedule_id)}async loadSchedules(){ft(this.hass).then(e=>{const t=e.filter(e=>zo(e,this._config));let i={};Object.keys(t).forEach(e=>{try{i=Object.assign(Object.assign({},i),{[t[e].schedule_id]:Oo(t[e],this._config,this.hass)})}catch(e){}}),this.scheduleDisplayInfo=i,this.schedules=this.sortSchedules(t)}).catch(e=>{this.schedules=[],this.connectionError=!0})}shouldUpdate(e){const t=e.get("hass"),i=e.get("_config");if(t&&1==e.size&&!this.translationsLoaded&&(t.localize("ui.panel.config.automation.editor.actions.type.device_id.action")||(this.translationsLoaded=!0)),i&&this._config){Object.keys(i).filter(e=>i[e]!==this._config[e]).some(e=>["tags","discover_existing","sort_by","display_options"].includes(e))&&(async()=>{await this.loadSchedules()})()}return!t||1!=e.size||!this.schedules||this.schedules.some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this.hass.states[e.entity_id]))}setConfig(e){dt(e);const t=Object.assign(Object.assign({},Fe),e);this._config=t}async getCardSize(){return new Promise(e=>{let t=0;const i=setInterval(()=>{if(t++,!this._config||!this.schedules&&!this.connectionError&&t<50)return;let a=this._config.title||this._config.show_header_toggle?3:1;this._config.show_add_button&&(a+=1);const s=((lt(this._config.display_options.secondary_info||[]).length||2)+1)/2;this.schedules&&(a+=this.showDiscovered?this.schedules.length*s:this.schedules.filter(e=>jo(e,this._config)).length*s),clearInterval(i),e(Math.round(a))},50)})}render(){return this.hass&&this._config&&this.schedules?q`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title?"string"==typeof this._config.title?this._config.title:Ya("ui.panel.common.title",rt(this.hass)):""}
          </div>
          ${this.schedules.length&&this._config.show_header_toggle?q`
                <ha-switch ?checked=${this.computeHeaderToggleState()} @change=${this.toggleDisableAll}> </ha-switch>
              `:""}
        </div>
        <div class="card-content">
          ${this.renderRows()}
        </div>
        ${!1!==this._config.show_add_button?q`
              <div class="card-actions">
                ${this.connectionError?q`
                      <mwc-button @click=${this._retryConnection}
                        >${this.hass.localize("ui.common.refresh")}
                      </mwc-button>
                    `:q`
                      <mwc-button @click=${this._addItemClick}
                        >${this.hass.localize("ui.common.add")}
                      </mwc-button>
                    `}
              </div>
            `:""}
      </ha-card>
    `:q``}renderRows(){if(!this._config||!this.hass||!this.schedules)return q``;if(this.connectionError)return q`
        <div>
          <hui-warning>
            ${Ya("ui.panel.overview.backend_error",rt(this.hass))}
          </hui-warning>
        </div>
      `;if(!Object.keys(this.schedules).length)return q`
        <div>
          ${Ya("ui.panel.overview.no_entries",rt(this.hass))}
        </div>
      `;const e=this.schedules.filter(e=>jo(e,this._config)),t=this.schedules.filter(e=>!jo(e,this._config));return q`
      ${e.map(e=>this.renderScheduleRow(e))}
      ${Object.keys(t).length?this.showDiscovered?q`
              ${t.map(e=>this.renderScheduleRow(e))}
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${at(Ya("ui.panel.overview.hide_excluded",rt(this.hass)))}
                </button>
              </div>
            `:q`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Ya("ui.panel.overview.excluded_items",rt(this.hass),"{number}",t.length)}
                </button>
              </div>
            `:""}
    `}renderScheduleRow(e){var t,i,a;if(!this.hass)return q``;if(!e||!e.next_entries.length||!Object.keys(this.scheduleDisplayInfo).includes(e.schedule_id))return"NOT_RUNNING"!==this.hass.config.state?q`
            <hui-warning>
              Defective schedule entity: ${e.entity_id}
            </hui-warning>
          `:q`
            <hui-warning>
              ${this.hass.localize("ui.panel.lovelace.warning.starting")}
            </hui-warning>
          `;const s=this.scheduleDisplayInfo[e.schedule_id],o=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"";return q`
      <div class="schedule-row ${["on","triggered"].includes(o)?"":"disabled"}">
        <ha-icon
          icon="${ot(s.icon)}"
          @click=${t=>Ie(t.target,"hass-more-info",{entityId:e.entity_id})}
        ></ha-icon>
        <div class="info" @click=${()=>this._editItemClick(e.schedule_id)}>
          ${this.renderDisplayItems(e,s.primaryInfo)}
          <div class="secondary">
            ${this.renderDisplayItems(e,s.secondaryInfo)}
          </div>
        </div>
        <ha-switch
          ?checked=${["on","triggered"].includes((null===(i=this.hass.states[e.entity_id])||void 0===i?void 0:i.state)||"")}
          ?disabled=${"completed"==(null===(a=this.hass.states[e.entity_id])||void 0===a?void 0:a.state)}
          @click=${t=>this.toggleDisabled(t,e.entity_id)}
        >
        </ha-switch>
      </div>
    `}renderDisplayItems(e,t){const i=t=>{const i=t.split("<my-relative-time></my-relative-time>");if(i.length>1)return q`
          ${i[0]?Ds(i[0]):""}
          <my-relative-time .hass=${this.hass} .datetime=${new Date(e.timestamps[e.next_entries[0]])}>
          </my-relative-time>
          ${i[1]?Ds(i[1]):""}
        `;const a=t.split(/(<tag>[^<]*<\/tag>)/g);return a.length>1?a.filter(e=>e.length).map(e=>{const t=e.match(/<tag>([^<]*)<\/tag>/g);return t?Ds(`<span class="filter-tag">${t[0]}</span>`):e}):Ds(t)};return t.filter(et).map(e=>q`
          ${i(e)}<br />
        `)}sortSchedules(e){var t;const i=lt(null===(t=this._config)||void 0===t?void 0:t.sort_by);if(i.includes("relative-time")&&(e=(e=>{const t=[...e];return t.sort((e,t)=>{const i=$o(e),a=$o(t),s=(new Date).valueOf(),o=i<s&&a<s;return null!==i&&null!==a?i<s&&a>=s?1:i>=s&&a<s?-1:i>a?o?-1:1:i<a?o?1:-1:e.entity_id<t.entity_id?1:-1:null!==a?1:null!==i?-1:e.entity_id<t.entity_id?1:-1}),t})(e)),i.includes("title")&&(e=((e,t)=>{const i=[...e];return i.sort((e,i)=>{if(!t[e.schedule_id])return t[i.schedule_id]?1:-1;return it(t[e.schedule_id].primaryInfo.join(""),t[i.schedule_id].primaryInfo.join(""))}),i})(e,this.scheduleDisplayInfo)),i.includes("state")){const t=i.includes("relative-time");e=((e,t,i)=>{const a=[...e];return a.sort((e,a)=>{var s,o;const n=null===(s=t.states[e.entity_id])||void 0===s?void 0:s.state,r=null===(o=t.states[a.entity_id])||void 0===o?void 0:o.state,l=["on","triggered"].includes(n),d=["on","triggered"].includes(r);if(l&&!d)return-1;if(!l&&d)return 1;if(i){if("off"!=n&&"off"==r)return 1;if("off"==n&&"off"!=r)return-1}return 0}),a})(e,this.hass,t)}return e}toggleDisabled(e,t){if(!this.hass||!t)return;e.stopPropagation();const i=!e.target.checked;this.hass.callService("switch",i?"turn_on":"turn_off",{entity_id:t})}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;this.schedules.filter(e=>this.showDiscovered?zo(e,this._config):jo(e,this._config)).forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}computeHeaderToggleState(){if(!this.schedules)return!1;return this.schedules.filter(e=>this.showDiscovered?zo(e,this._config):jo(e,this._config)).some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")})}_addItemClick(){gt(this,{dialogTag:"scheduler-editor-dialog",dialogImport:()=>Promise.resolve().then((function(){return ko})),dialogParams:{config:this._config,editItem:null,entities:[],actions:[],schedule:void 0}})}async _editItemClick(e){if(!this.hass||!this._config)return;const t=await yt(this.hass,e);if(!t)return;const i=Qe(Xe(t.timeslots.map(e=>e.actions.map(e=>e.entity_id||e.service)))),a=i.map(e=>ht(e,this.hass,this._config));let s=_s(i,this.hass,this._config);const o=Qe(Xe(t.timeslots.map(e=>e.actions))),n=o.filter(e=>!s.some(t=>os(t,e,!0)));n.length&&Qe(n).forEach(e=>s.push(vs(e,this.hass)));let r={weekdays:t.weekdays,timeslots:t.timeslots,repeat_type:t.repeat_type,name:t.name,tags:t.tags||[],start_date:t.start_date,end_date:t.end_date};if(a.length&&r.timeslots.length){if(r.timeslots.every(e=>e.stop)){if(r=Object.assign(Object.assign({},r),{timeslots:nt(r.timeslots,this.hass)}),!s.length)return wt({error:"",body:{message:`Could not compute actions for the schedule #${e}.`}},this,this.hass)}else if(s=s.filter(e=>o.find(t=>os(e,t,!0))).reduce((e,t)=>[t],[]),!s.length)return wt({error:"",body:{message:`Could not compute actions for schedule #${e}.`}},this,this.hass);gt(this,{dialogTag:"scheduler-editor-dialog",dialogImport:()=>Promise.resolve().then((function(){return ko})),dialogParams:{config:this._config,editItem:t.schedule_id,actions:s,entities:a,schedule:r,cardEmbeddedInPopup:_t(this)}})}else{await new Promise(e=>{const t={title:"Defective entity",description:"This schedule is defective and cannot be edited with the card. Consider to delete the item and recreate it. If the problem persists, please report the issue on GitHub.",primaryButtonLabel:this.hass.localize("ui.common.delete"),primaryButtonCritical:!0,secondaryButtonLabel:this.hass.localize("ui.common.cancel"),cancel:()=>{e(!1)},confirm:()=>{e(!0)}};gt(this,{dialogTag:"generic-dialog",dialogImport:()=>Promise.resolve().then((function(){return ao})),dialogParams:t})})&&bt(this.hass,t.schedule_id).catch(e=>wt(e,this,this.hass))}}_retryConnection(){setTimeout(async()=>{await this.loadSchedules()},100),this.connectionError=!1,this.requestUpdate()}},e.SchedulerCard.styles=r`
    ${Ns}
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

    div.schedule-row {
      display: flex;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      margin: 20px 0px;
    }
    div.schedule-row .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    div.schedule-row .info,
    div.schedule-row .info > * {
      color: var(--primary-text-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row .secondary {
      display: block;
      color: var(--secondary-text-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row ha-icon {
      flex: 0 0 40px;
      color: var(--state-icon-color);
      transition: color 0.2s ease-in-out;
    }
    div.schedule-row ha-switch {
      padding: 13px 5px;
    }
    div.schedule-row hui-warning {
      flex: 1 0 40px;
    }
    div.schedule-row span.filter-tag {
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
    div.schedule-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --state-icon-color: var(--disabled-text-color);
    }
    div.schedule-row span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.3);
    }
  `,t([de()],e.SchedulerCard.prototype,"_config",void 0),t([de()],e.SchedulerCard.prototype,"showDiscovered",void 0),t([de()],e.SchedulerCard.prototype,"schedules",void 0),t([de()],e.SchedulerCard.prototype,"translationsLoaded",void 0),e.SchedulerCard=t([re("scheduler-card")],e.SchedulerCard)}({});
