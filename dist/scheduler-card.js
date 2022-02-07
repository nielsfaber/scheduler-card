(function (exports) {
    'use strict';

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
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol();class s{constructor(t,s){if(s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n=new Map,o=t=>{let o=n.get(t);return void 0===o&&n.set(t,o=new s(t,e)),o},r=t=>o("string"==typeof t?t:t+""),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof s)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o(n)},S=(e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},u=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$1,e$1,h,r$1;const o$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$1=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:o$1,reflect:!1,hasChanged:n$1};class a extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(u(i));}else void 0!==i&&s.push(u(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$1.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$1.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$1)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(e$1=(s$1=globalThis).reactiveElementPlatformSupport)||void 0===e$1||e$1.call(s$1,{ReactiveElement:a}),(null!==(h=(r$1=globalThis).reactiveElementVersions)&&void 0!==h?h:r$1.reactiveElementVersions=[]).push("1.0.0-rc.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$1,i$1,s$2,e$2;const o$2=globalThis.trustedTypes,l$1=o$2?o$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$2=`lit$${(Math.random()+"").slice(9)}$`,h$1="?"+n$2,r$2=`<${h$1}>`,u$1=document,c=(t="")=>u$1.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$1=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c(),t),t,void 0,s);}return n.I(t),n},E=u$1.createTreeWalker(u$1,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$2+a):s+n$2+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$1?l$1.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$2)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$2),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$2),i=t.length-1;if(i>0){e.textContent=o$2?o$2.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c());}}}else if(8===e.nodeType)if(e.data===h$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$2,t+1));)d.push({type:7,index:l}),t+=n$2.length-1;}l++;}}static createElement(t,i){const s=u$1.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$1).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$1(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$1.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c()),this.k(c()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}null===(i$1=(t$1=globalThis).litHtmlPlatformSupport)||void 0===i$1||i$1.call(t$1,N,C),(null!==(s$2=(e$2=globalThis).litHtmlVersions)&&void 0!==s$2?s$2:e$2.litHtmlVersions=[]).push("2.0.0-rc.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i$2,l$2,o$3,s$3,n$3,a$2;(null!==(i$2=(a$2=globalThis).litElementVersions)&&void 0!==i$2?i$2:a$2.litElementVersions=[]).push("3.0.0-rc.2");class h$2 extends a{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h$2.finalized=!0,h$2._$litElement$=!0,null===(o$3=(l$2=globalThis).litElementHydrateSupport)||void 0===o$3||o$3.call(l$2,{LitElement:h$2}),null===(n$3=(s$3=globalThis).litElementPlatformSupport)||void 0===n$3||n$3.call(s$3,{LitElement:h$2});

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const n$4=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$3(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$3(e,n)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function r$3(r){return e$3({...r,state:!0,attribute:!1})}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const o$4=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function e$4(e){return o$4({finisher:(r,t)=>{Object.assign(r.prototype[t],e);}})}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function o$5(o,r){return o$4({descriptor:t=>{const i={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)},enumerable:!0,configurable:!0};if(r){const r="symbol"==typeof t?Symbol():"__"+t;i.get=function(){var t;return void 0===this[r]&&(this[r]=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)),this[r]};}return i}})}

    var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
    var twoDigitsOptional = "[1-9]\\d?";
    var twoDigits = "\\d\\d";
    var threeDigits = "\\d{3}";
    var fourDigits = "\\d{4}";
    var word = "[^\\s]+";
    var literal = /\[([^]*?)\]/gm;
    function shorten(arr, sLen) {
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i].substr(0, sLen));
        }
        return newArr;
    }
    var monthUpdate = function (arrName) { return function (v, i18n) {
        var lowerCaseArr = i18n[arrName].map(function (v) { return v.toLowerCase(); });
        var index = lowerCaseArr.indexOf(v.toLowerCase());
        if (index > -1) {
            return index;
        }
        return null;
    }; };
    function assign(origObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var obj = args_1[_a];
            for (var key in obj) {
                // @ts-ignore ex
                origObj[key] = obj[key];
            }
        }
        return origObj;
    }
    var dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var monthNamesShort = shorten(monthNames, 3);
    var dayNamesShort = shorten(dayNames, 3);
    var defaultI18n = {
        dayNamesShort: dayNamesShort,
        dayNames: dayNames,
        monthNamesShort: monthNamesShort,
        monthNames: monthNames,
        amPm: ["am", "pm"],
        DoFn: function (dayOfMonth) {
            return (dayOfMonth +
                ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3
                    ? 0
                    : ((dayOfMonth - (dayOfMonth % 10) !== 10 ? 1 : 0) * dayOfMonth) % 10]);
        }
    };
    var globalI18n = assign({}, defaultI18n);
    var setGlobalDateI18n = function (i18n) {
        return (globalI18n = assign(globalI18n, i18n));
    };
    var regexEscape = function (str) {
        return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
    };
    var pad = function (val, len) {
        if (len === void 0) { len = 2; }
        val = String(val);
        while (val.length < len) {
            val = "0" + val;
        }
        return val;
    };
    var formatFlags = {
        D: function (dateObj) { return String(dateObj.getDate()); },
        DD: function (dateObj) { return pad(dateObj.getDate()); },
        Do: function (dateObj, i18n) {
            return i18n.DoFn(dateObj.getDate());
        },
        d: function (dateObj) { return String(dateObj.getDay()); },
        dd: function (dateObj) { return pad(dateObj.getDay()); },
        ddd: function (dateObj, i18n) {
            return i18n.dayNamesShort[dateObj.getDay()];
        },
        dddd: function (dateObj, i18n) {
            return i18n.dayNames[dateObj.getDay()];
        },
        M: function (dateObj) { return String(dateObj.getMonth() + 1); },
        MM: function (dateObj) { return pad(dateObj.getMonth() + 1); },
        MMM: function (dateObj, i18n) {
            return i18n.monthNamesShort[dateObj.getMonth()];
        },
        MMMM: function (dateObj, i18n) {
            return i18n.monthNames[dateObj.getMonth()];
        },
        YY: function (dateObj) {
            return pad(String(dateObj.getFullYear()), 4).substr(2);
        },
        YYYY: function (dateObj) { return pad(dateObj.getFullYear(), 4); },
        h: function (dateObj) { return String(dateObj.getHours() % 12 || 12); },
        hh: function (dateObj) { return pad(dateObj.getHours() % 12 || 12); },
        H: function (dateObj) { return String(dateObj.getHours()); },
        HH: function (dateObj) { return pad(dateObj.getHours()); },
        m: function (dateObj) { return String(dateObj.getMinutes()); },
        mm: function (dateObj) { return pad(dateObj.getMinutes()); },
        s: function (dateObj) { return String(dateObj.getSeconds()); },
        ss: function (dateObj) { return pad(dateObj.getSeconds()); },
        S: function (dateObj) {
            return String(Math.round(dateObj.getMilliseconds() / 100));
        },
        SS: function (dateObj) {
            return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
        },
        SSS: function (dateObj) { return pad(dateObj.getMilliseconds(), 3); },
        a: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
        },
        A: function (dateObj, i18n) {
            return dateObj.getHours() < 12
                ? i18n.amPm[0].toUpperCase()
                : i18n.amPm[1].toUpperCase();
        },
        ZZ: function (dateObj) {
            var offset = dateObj.getTimezoneOffset();
            return ((offset > 0 ? "-" : "+") +
                pad(Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60), 4));
        },
        Z: function (dateObj) {
            var offset = dateObj.getTimezoneOffset();
            return ((offset > 0 ? "-" : "+") +
                pad(Math.floor(Math.abs(offset) / 60), 2) +
                ":" +
                pad(Math.abs(offset) % 60, 2));
        }
    };
    var monthParse = function (v) { return +v - 1; };
    var emptyDigits = [null, twoDigitsOptional];
    var emptyWord = [null, word];
    var amPm = [
        "isPm",
        word,
        function (v, i18n) {
            var val = v.toLowerCase();
            if (val === i18n.amPm[0]) {
                return 0;
            }
            else if (val === i18n.amPm[1]) {
                return 1;
            }
            return null;
        }
    ];
    var timezoneOffset = [
        "timezoneOffset",
        "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
        function (v) {
            var parts = (v + "").match(/([+-]|\d\d)/gi);
            if (parts) {
                var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
                return parts[0] === "+" ? minutes : -minutes;
            }
            return 0;
        }
    ];
    var parseFlags = {
        D: ["day", twoDigitsOptional],
        DD: ["day", twoDigits],
        Do: ["day", twoDigitsOptional + word, function (v) { return parseInt(v, 10); }],
        M: ["month", twoDigitsOptional, monthParse],
        MM: ["month", twoDigits, monthParse],
        YY: [
            "year",
            twoDigits,
            function (v) {
                var now = new Date();
                var cent = +("" + now.getFullYear()).substr(0, 2);
                return +("" + (+v > 68 ? cent - 1 : cent) + v);
            }
        ],
        h: ["hour", twoDigitsOptional, undefined, "isPm"],
        hh: ["hour", twoDigits, undefined, "isPm"],
        H: ["hour", twoDigitsOptional],
        HH: ["hour", twoDigits],
        m: ["minute", twoDigitsOptional],
        mm: ["minute", twoDigits],
        s: ["second", twoDigitsOptional],
        ss: ["second", twoDigits],
        YYYY: ["year", fourDigits],
        S: ["millisecond", "\\d", function (v) { return +v * 100; }],
        SS: ["millisecond", twoDigits, function (v) { return +v * 10; }],
        SSS: ["millisecond", threeDigits],
        d: emptyDigits,
        dd: emptyDigits,
        ddd: emptyWord,
        dddd: emptyWord,
        MMM: ["month", word, monthUpdate("monthNamesShort")],
        MMMM: ["month", word, monthUpdate("monthNames")],
        a: amPm,
        A: amPm,
        ZZ: timezoneOffset,
        Z: timezoneOffset
    };
    // Some common format strings
    var globalMasks = {
        default: "ddd MMM DD YYYY HH:mm:ss",
        shortDate: "M/D/YY",
        mediumDate: "MMM D, YYYY",
        longDate: "MMMM D, YYYY",
        fullDate: "dddd, MMMM D, YYYY",
        isoDate: "YYYY-MM-DD",
        isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
        shortTime: "HH:mm",
        mediumTime: "HH:mm:ss",
        longTime: "HH:mm:ss.SSS"
    };
    var setGlobalDateMasks = function (masks) { return assign(globalMasks, masks); };
    /***
     * Format a date
     * @method format
     * @param {Date|number} dateObj
     * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
     * @returns {string} Formatted date string
     */
    var format = function (dateObj, mask, i18n) {
        if (mask === void 0) { mask = globalMasks["default"]; }
        if (i18n === void 0) { i18n = {}; }
        if (typeof dateObj === "number") {
            dateObj = new Date(dateObj);
        }
        if (Object.prototype.toString.call(dateObj) !== "[object Date]" ||
            isNaN(dateObj.getTime())) {
            throw new Error("Invalid Date pass to format");
        }
        mask = globalMasks[mask] || mask;
        var literals = [];
        // Make literals inactive by replacing them with @@@
        mask = mask.replace(literal, function ($0, $1) {
            literals.push($1);
            return "@@@";
        });
        var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
        // Apply formatting rules
        mask = mask.replace(token, function ($0) {
            return formatFlags[$0](dateObj, combinedI18nSettings);
        });
        // Inline literal values back into the formatted value
        return mask.replace(/@@@/g, function () { return literals.shift(); });
    };
    /**
     * Parse a date string into a Javascript Date object /
     * @method parse
     * @param {string} dateStr Date string
     * @param {string} format Date parse format
     * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
     * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
     */
    function parse(dateStr, format, i18n) {
        if (i18n === void 0) { i18n = {}; }
        if (typeof format !== "string") {
            throw new Error("Invalid format in fecha parse");
        }
        // Check to see if the format is actually a mask
        format = globalMasks[format] || format;
        // Avoid regular expression denial of service, fail early for really long strings
        // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
        if (dateStr.length > 1000) {
            return null;
        }
        // Default to the beginning of the year.
        var today = new Date();
        var dateInfo = {
            year: today.getFullYear(),
            month: 0,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            isPm: null,
            timezoneOffset: null
        };
        var parseInfo = [];
        var literals = [];
        // Replace all the literals with @@@. Hopefully a string that won't exist in the format
        var newFormat = format.replace(literal, function ($0, $1) {
            literals.push(regexEscape($1));
            return "@@@";
        });
        var specifiedFields = {};
        var requiredFields = {};
        // Change every token that we find into the correct regex
        newFormat = regexEscape(newFormat).replace(token, function ($0) {
            var info = parseFlags[$0];
            var field = info[0], regex = info[1], requiredField = info[3];
            // Check if the person has specified the same field twice. This will lead to confusing results.
            if (specifiedFields[field]) {
                throw new Error("Invalid format. " + field + " specified twice in format");
            }
            specifiedFields[field] = true;
            // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
            if (requiredField) {
                requiredFields[requiredField] = true;
            }
            parseInfo.push(info);
            return "(" + regex + ")";
        });
        // Check all the required fields are present
        Object.keys(requiredFields).forEach(function (field) {
            if (!specifiedFields[field]) {
                throw new Error("Invalid format. " + field + " is required in specified format");
            }
        });
        // Add back all the literals after
        newFormat = newFormat.replace(/@@@/g, function () { return literals.shift(); });
        // Check if the date string matches the format. If it doesn't return null
        var matches = dateStr.match(new RegExp(newFormat, "i"));
        if (!matches) {
            return null;
        }
        var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
        // For each match, call the parser function for that date part
        for (var i = 1; i < matches.length; i++) {
            var _a = parseInfo[i - 1], field = _a[0], parser = _a[2];
            var value = parser
                ? parser(matches[i], combinedI18nSettings)
                : +matches[i];
            // If the parser can't make sense of the value, return null
            if (value == null) {
                return null;
            }
            dateInfo[field] = value;
        }
        if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
            dateInfo.hour = +dateInfo.hour + 12;
        }
        else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
            dateInfo.hour = 0;
        }
        var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
        var validateFields = [
            ["month", "getMonth"],
            ["day", "getDate"],
            ["hour", "getHours"],
            ["minute", "getMinutes"],
            ["second", "getSeconds"]
        ];
        for (var i = 0, len = validateFields.length; i < len; i++) {
            // Check to make sure the date field is within the allowed range. Javascript dates allows values
            // outside the allowed range. If the values don't match the value was invalid
            if (specifiedFields[validateFields[i][0]] &&
                dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()) {
                return null;
            }
        }
        if (dateInfo.timezoneOffset == null) {
            return dateWithoutTZ;
        }
        return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
    }
    var fecha = {
        format: format,
        parse: parse,
        defaultI18n: defaultI18n,
        setGlobalDateI18n: setGlobalDateI18n,
        setGlobalDateMasks: setGlobalDateMasks
    };

    var a$3=function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleDateString(t.language,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")},r$4=function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleString(t.language,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")},n$5=function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};var m$1,f$1;function g$1(e){return e.substr(0,e.indexOf("."))}function b$1(e){return e.substr(e.indexOf(".")+1)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(m$1||(m$1={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(f$1||(f$1={}));var A$1=function(e,t,a,r){r=r||{},a=null==a?{}:a;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,e.dispatchEvent(n),n},U={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function B(e,t){if(e in U)return U[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return "hass:bell-plus";case"armed_night":return "hass:bell-sleep";case"disarmed":return "hass:bell-outline";case"triggered":return "hass:bell-ring";default:return "hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return "closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return "hass:emoticon-dead";case"sleeping":return "hass:sleep";case"initializing":return "hass:timer-sand";default:return "hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"hass:bookmark"}}var te={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},ae={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return B("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in te)return te[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return "hass:battery-unknown";var r=10*Math.round(a/10);return r>=100?"hass:battery":r<=0?"hass:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return "°C"===n||"°F"===n?"hass:thermometer":B("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?B("input_datetime"):"hass:calendar":"hass:clock"}},re=function(e){if(!e)return "hass:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=g$1(e.entity_id);return t in ae?ae[t](e):B(t,e.state)};

    var ERepeatType;
    (function (ERepeatType) {
        ERepeatType["Repeat"] = "repeat";
        ERepeatType["Pause"] = "pause";
        ERepeatType["Single"] = "single";
    })(ERepeatType || (ERepeatType = {}));
    /* action variables */
    var EVariableType;
    (function (EVariableType) {
        EVariableType["Level"] = "LEVEL";
        EVariableType["List"] = "LIST";
        EVariableType["Text"] = "TEXT";
    })(EVariableType || (EVariableType = {}));
    /* other */
    var EConditionMatchType;
    (function (EConditionMatchType) {
        EConditionMatchType["Equal"] = "is";
        EConditionMatchType["Unequal"] = "not";
        EConditionMatchType["Below"] = "below";
        EConditionMatchType["Above"] = "above";
    })(EConditionMatchType || (EConditionMatchType = {}));
    var EConditionType;
    (function (EConditionType) {
        EConditionType["Any"] = "or";
        EConditionType["All"] = "and";
    })(EConditionType || (EConditionType = {}));
    var ETimeEvent;
    (function (ETimeEvent) {
        ETimeEvent["Sunrise"] = "sunrise";
        ETimeEvent["Sunset"] = "sunset";
    })(ETimeEvent || (ETimeEvent = {}));
    var EDayType;
    (function (EDayType) {
        EDayType["Daily"] = "DAILY";
        EDayType["Workday"] = "WORKDAY";
        EDayType["Weekend"] = "WEEKEND";
        EDayType["Custom"] = "CUSTOM";
    })(EDayType || (EDayType = {}));
    var SchedulerEvent;
    (function (SchedulerEvent) {
        SchedulerEvent["ItemCreated"] = "scheduler_item_created";
        SchedulerEvent["ItemUpdated"] = "scheduler_item_updated";
        SchedulerEvent["ItemRemoved"] = "scheduler_item_removed";
        SchedulerEvent["TimerFinished"] = "scheduler_timer_finished";
        SchedulerEvent["TimerUpdated"] = "scheduler_timer_updated";
    })(SchedulerEvent || (SchedulerEvent = {}));

    const CARD_VERSION = 'v2.3.3';
    const DefaultTimeStep = 10;
    const DefaultGroupIcon = 'folder-outline';
    const DefaultEntityIcon = 'folder-outline';
    const DefaultActionIcon = 'flash';
    const DeadEntityName = '(unknown entity)';
    const DeadEntityIcon = 'help-circle-outline';
    const NotifyDomain = 'notify';
    var EViews;
    (function (EViews) {
        EViews["Overview"] = "OVERVIEW";
        EViews["NewSchedule"] = "NEW_SCHEDULE";
        EViews["TimePicker"] = "TIME_PICKER";
        EViews["TimeScheme"] = "TIME_SCHEME";
        EViews["Options"] = "OPTIONS";
    })(EViews || (EViews = {}));
    const DefaultCardConfig = {
        type: 'scheduler-card',
        discover_existing: true,
        standard_configuration: true,
        include: [],
        exclude: [],
        groups: [],
        customize: {},
        title: true,
        time_step: 10,
        show_header_toggle: false,
        display_options: {
            primary_info: 'default',
            secondary_info: ['relative-time', 'additional-tasks'],
            icon: 'action',
        },
        tags: [],
        sort_by: ['relative-time', 'state'],
    };
    const WebsocketEvent = 'scheduler_updated';

    function stringToTime(string, hass) {
        if (string.match(/^([0-9:]+)$/)) {
            const parts = string.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
        }
        const res = parseRelativeTime(string);
        if (res) {
            const sunEntity = hass.states['sun.sun'];
            const ts_sunrise = stringToTime(sunEntity.attributes.next_rising, hass);
            const ts_sunset = stringToTime(sunEntity.attributes.next_setting, hass);
            let ts = res.event == 'sunrise' ? ts_sunrise : ts_sunset;
            ts = res.sign == '+' ? ts + stringToTime(res.offset, hass) : ts - stringToTime(res.offset, hass);
            return ts;
        }
        const ts = new Date(string);
        return ts.getHours() * 3600 + ts.getMinutes() * 60 + ts.getSeconds();
    }
    function timeToString(time) {
        const hours = Math.floor(time / 3600);
        time -= hours * 3600;
        const minutes = Math.floor(time / 60);
        time -= minutes * 60;
        const seconds = Math.round(time);
        return (String(hours % 24).padStart(2, '0') +
            ':' +
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0'));
    }
    function roundTime(value, stepSize, options = { wrapAround: true }) {
        let hours = value >= 0 ? Math.floor(value / 3600) : Math.ceil(value / 3600);
        let minutes = Math.floor((value - hours * 3600) / 60);
        if (minutes % stepSize != 0)
            minutes = Math.round(minutes / stepSize) * stepSize;
        if (minutes >= 60) {
            hours++;
            minutes -= 60;
        }
        else if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        if (options.wrapAround) {
            if (hours >= 24)
                hours -= 24;
            else if (hours < 0)
                hours += 24;
        }
        const time = hours * 3600 + minutes * 60;
        if (options.maxHours) {
            if (time > options.maxHours * 3600)
                return options.maxHours * 3600;
            if (time < -options.maxHours * 3600)
                return -options.maxHours * 3600;
        }
        return time;
    }
    function parseRelativeTime(time) {
        const match = time.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);
        if (!match)
            return false;
        return {
            event: match[1],
            sign: match[2],
            offset: match[3],
        };
    }

    function pick(obj, keys) {
        if (!obj)
            return {};
        return Object.entries(obj)
            .filter(([key]) => keys.includes(key))
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
    }
    const omit = (obj, ...keys) => {
        const ret = {};
        let key;
        for (key in obj) {
            if (!keys.includes(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    };
    // export function omit<TValue>(obj: Dictionary<TValue>, keys: string[]): Dictionary<TValue> {
    //   if (!obj) return {};
    //   return Object.entries(obj)
    //     .filter(([key]) => !keys.includes(key))
    //     .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
    // }
    function flatten(arr) {
        if (arr.every(val => !Array.isArray(val))) {
            return arr.slice();
        }
        return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
    }
    function unique(arr) {
        let res = [];
        arr.forEach(item => {
            if (!res.find(e => (typeof item === 'object' ? isEqual(e, item) : e === item)))
                res.push(item);
        });
        return res;
    }
    function isDefined(value) {
        return value !== null && value !== undefined;
    }
    function isEqual(...arr) {
        if (!arr.length)
            return false;
        const firstItem = arr[0];
        return arr.every(item => {
            return firstItem && item && typeof firstItem === 'object' && typeof item === 'object'
                ? Object.keys(firstItem).length === Object.keys(item).length &&
                    Object.keys(firstItem).reduce((res, key) => res && isEqual(firstItem[key], item[key]), true)
                : firstItem === item;
        });
    }
    function sortAlphabetically(a, b) {
        const stringVal = (a) => {
            if (typeof a === 'object') {
                return a.name !== undefined
                    ? String(a.name)
                        .trim()
                        .toLowerCase()
                    : JSON.stringify(a);
            }
            else
                return String(a)
                    .trim()
                    .toLowerCase();
        };
        return stringVal(a) < stringVal(b) ? -1 : 1;
    }
    function capitalize(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    function PrettyPrintName(input) {
        if (typeof input != typeof 'x')
            input = String(input);
        return capitalize(input.replace(/_/g, ' '));
    }
    function PrettyPrintIcon(input) {
        if (!input)
            return;
        if (typeof input != typeof 'x')
            input = String(input);
        if (input.match(/^[a-z]+:[a-z0-9-]+$/i))
            return input;
        return `hass:${input}`;
    }
    function calculateTimeline(entries, hass) {
        //correct timeslots which are outside of 00:00:00 - 23:59:00 window
        entries = entries.map(e => Object(Object.assign(Object.assign({}, e), { start: stringToTime(e.start, hass) < 0 ? '00:00:00' : e.start, stop: stringToTime(e.stop, hass) > 3600 * 24 ? '00:00:00' : e.stop })));
        entries = entries.map(e => {
            const duration = stringToTime(e.stop, hass) - stringToTime(e.start, hass);
            if (duration < 0) {
                if (stringToTime(e.stop, hass) == 0)
                    //if stop time is 00:00:00, this should be mapped as the end of the day
                    return Object.assign(Object.assign({}, e), { stop: timeToString(stringToTime(e.stop, hass) + 3600 * 24) });
                //correct timeslots who have their start and stop point flipped
                else
                    return Object.assign(Object.assign({}, e), { start: e.stop, stop: e.start });
            }
            else if (duration < 60) {
                //correct timeslots which have a duration shorter than 1 minute
                return Object.assign(Object.assign({}, e), { start: e.start, stop: timeToString(stringToTime(e.start, hass) + 60) });
            }
            return e;
        });
        //sort chronological
        entries.sort((a, b) => {
            if (stringToTime(a.start, hass) > stringToTime(b.start, hass))
                return 1;
            else if (stringToTime(a.start, hass) < stringToTime(b.start, hass))
                return -1;
            else
                return stringToTime(a.stop, hass) > stringToTime(b.stop, hass) ? 1 : -1;
        });
        let startTime = '00:00:00';
        let len = entries.length;
        //insert empty timeslots where needed
        for (let i = 0; i < len; i++) {
            const entry = entries[i];
            if (stringToTime(entry.start, hass) > stringToTime(startTime, hass)) {
                entries.splice(i, 0, Object.assign(Object.assign({}, entry), {
                    start: startTime,
                    stop: entry.start,
                    actions: [],
                }));
                len++;
                i++;
            }
            else if (stringToTime(entry.start, hass) < stringToTime(startTime, hass)) {
                //move timeslot if it is overlapping with previous
                entries = Object.assign(entries, { [i]: Object.assign(Object.assign({}, entry), { start: startTime }) });
            }
            startTime = entry.stop;
        }
        const endOfDay = 24 * 3600;
        //insert empty timeslots at the end when needed
        if (stringToTime(startTime, hass) < endOfDay && stringToTime(startTime, hass) > 0) {
            entries.push(Object.assign(Object.assign({}, entries[0]), {
                start: startTime,
                stop: timeToString(endOfDay),
                actions: [],
            }));
        }
        return entries;
    }
    function IsDefaultName(name) {
        if (!name)
            return false;
        return name.match(/^Schedule\ #[a-f0-9]{6}/) !== null;
    }
    const getLocale = (hass) => hass.locale || {
        language: hass.language,
        number_format: m$1.system,
    };
    function AsArray(value) {
        if (Array.isArray(value))
            return value;
        else if (value !== null && value !== undefined)
            return [value];
        else
            return [];
    }

    function ValidateConfig(config) {
        const errors = [];
        let tree = [];
        const addError = (err) => {
            if (!err)
                return;
            errors.push(tree.length ? `in ${tree.join('->')}: ${err}` : err);
        };
        const Has = (object, key) => {
            return object.hasOwnProperty(key);
        };
        const Type = (input, type) => {
            if (Array.isArray(type))
                return type.some(e => Type(input, e));
            else if (type == 'array')
                return Array.isArray(input);
            else if (type == 'object')
                return typeof input === type && input !== null;
            else
                return typeof input === type;
        };
        const Required = (obj, key, type) => {
            if (!Has(obj, key))
                addError(`missing required property '${key}'`);
            else {
                const res = Type(obj[key], type);
                if (!res)
                    addError(`'${key}' must be of type ${type}`);
            }
        };
        const Optional = (obj, key, type) => {
            if (!Has(obj, key))
                return;
            const res = Type(obj[key], type);
            if (!res)
                addError(`'${key}' must be of type ${type}`);
        };
        const RequiredArrayType = (obj, key, type) => {
            let res = true;
            if (Has(obj, key) && Type(obj[key], 'array')) {
                if (obj[key].some(e => !Type(e, type))) {
                    addError(`'${key}' must be an array with items of type ${type}`);
                    res = false;
                }
            }
            else {
                res = false;
            }
            return res;
        };
        const validateActionConfig = (action) => {
            const baseTree = tree;
            Optional(action, 'name', 'string');
            Optional(action, 'icon', 'string');
            Required(action, 'service', 'string');
            Optional(action, 'service_data', 'object');
            RequiredArrayType(action, 'service_data', 'string');
            if (Has(action, 'service_data') && Type(action.service_data, 'object')) {
                if (Object.keys(action.service_data).some(e => !Type(e, 'string')))
                    addError('service_data items must have string as index type');
            }
            Optional(action, 'variables', 'object');
            if (Has(action, 'variables') && Type(action.variables, 'object')) {
                Object.keys(action.variables).forEach(key => {
                    tree = baseTree.concat(baseTree, ['variables']);
                    if (!Type(key, 'string'))
                        addError(`${key} is not allowed`);
                    Required(action.variables, key, 'object');
                    if (Has(action.variables, key) && Type(action.variables[key], 'object')) {
                        tree.push(key);
                        const variableCfg = action.variables[key];
                        //list variable
                        if (RequiredArrayType(variableCfg, 'options', 'object')) {
                            variableCfg.options.forEach((option, index) => {
                                tree = baseTree.concat(baseTree, ['variables', key, 'options', index]);
                                Required(option, 'value', 'string');
                                Optional(option, 'name', 'string');
                                Optional(option, 'icon', 'string');
                            });
                        }
                        //level variable
                        else if (variableCfg.min !== undefined || variableCfg.max !== undefined) {
                            Optional(variableCfg, 'min', 'number');
                            Optional(variableCfg, 'max', 'number');
                            Optional(variableCfg, 'step', 'number');
                            Optional(variableCfg, 'scale_factor', 'number');
                            Optional(variableCfg, 'optional', 'boolean');
                            Optional(variableCfg, 'unit', 'string');
                        }
                        //text variable
                        else {
                            Optional(variableCfg, 'multiline', 'boolean');
                        }
                    }
                });
            }
        };
        Optional(config, 'discover_existing', 'boolean');
        Optional(config, 'standard_configuration', 'boolean');
        Optional(config, 'title', ['boolean', 'string']);
        Optional(config, 'time_step', 'number');
        Optional(config, 'show_header_toggle', 'boolean');
        Optional(config, 'show_add_button', 'boolean');
        Optional(config, 'sort_by', ['string', 'array']);
        Optional(config, 'include', 'array');
        RequiredArrayType(config, 'include', 'string');
        Optional(config, 'exclude', 'array');
        RequiredArrayType(config, 'exclude', 'string');
        Optional(config, 'display_options', 'object');
        if (Has(config, 'display_options')) {
            tree.push('display_options');
            Optional(config.display_options, 'primary_info', ['string', 'array']);
            Optional(config.display_options, 'secondary_info', ['string', 'array']);
            Optional(config.display_options, 'icon', 'string');
            RequiredArrayType(config.display_options, 'primary_info', 'string');
            RequiredArrayType(config.display_options, 'secondary_info', 'string');
        }
        tree = [];
        Optional(config, 'groups', 'array');
        if (Has(config, 'groups') && Type(config.groups, 'array')) {
            tree.push('groups');
            config.groups.forEach((group, index) => {
                tree = ['groups', index];
                Required(group, 'name', 'string');
                Optional(group, 'icon', 'string');
                Required(group, 'include', 'array');
                Optional(group, 'exclude', 'array');
                RequiredArrayType(group, 'include', 'string');
                RequiredArrayType(group, 'exclude', 'string');
            });
        }
        tree = [];
        Optional(config, 'customize', 'object');
        if (Has(config, 'customize') && Type(config.customize, 'object')) {
            Object.keys(config.customize).forEach(key => {
                tree = ['customize'];
                if (!Type(key, 'string'))
                    addError(`${key} is not allowed`);
                Required(config.customize, key, 'object');
                if (Has(config.customize, key) && Type(config.customize[key], 'object')) {
                    tree.push(key);
                    const entryObj = config.customize[key];
                    Optional(entryObj, 'name', 'string');
                    Optional(entryObj, 'icon', 'string');
                    Optional(entryObj, 'actions', 'array');
                    if (RequiredArrayType(entryObj, 'actions', 'object')) {
                        entryObj.actions.forEach((action, index) => {
                            tree = ['customize', key, index];
                            validateActionConfig(action);
                        });
                    }
                    Optional(entryObj, 'states', ['object', 'array']);
                    if (Has(entryObj, 'states') && Type(entryObj.states, 'array')) {
                        RequiredArrayType(entryObj, 'states', 'string');
                    }
                    else if (Has(entryObj, 'states') && Type(entryObj.states, 'object')) {
                        Required(entryObj.states, 'min', 'number');
                        Required(entryObj.states, 'max', 'number');
                        Optional(entryObj.states, 'step', 'number');
                        Optional(entryObj.states, 'scale_factor', 'number');
                        Optional(entryObj.states, 'unit', 'string');
                    }
                }
            });
        }
        Optional(config, 'tags', ['string', 'array']);
        if (errors.length) {
            throw new Error(`Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i$4=t=>(...i)=>({_$litDirective$:t,values:i});class s$4{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class n$6 extends s$4{constructor(i){if(super(i),this.vt=A,i.type!==t$2.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n$6.directiveName="unsafeHTML",n$6.resultType=1;const o$6=i$4(n$6);

    const STATE_NOT_RUNNING = "NOT_RUNNING";

    var services = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} s {parameter}"
    	},
    	climate: {
    		set_temperature: "nastavit teplotu[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "topení[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chlazení[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "nastavit režim[ na {hvac_mode}]",
    		set_preset_mode: "nastavit předvolbu[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "zavřít",
    		open_cover: "otevřít",
    		set_cover_position: "nastavit polohu[ na {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "nastavit rychlost[ na {speed}]",
    		set_direction: "nastavit směr[ na {direction}]",
    		oscillate: "nastavit oscilaci[ na {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "nastavit vlhkost[ na {humidity}]",
    		set_mode: "nastavit režim[ na {mode}]"
    	},
    	input_number: {
    		set_value: "nastavit hodnotu[ na {value}]"
    	},
    	input_select: {
    		select_option: "vybrat možnost[ {option}]"
    	},
    	select: {
    		select_option: "vybrat možnost[ {option}]"
    	},
    	light: {
    		turn_on: "zapnout[ na {brightness} jas]"
    	},
    	media_player: {
    		select_source: "vybrat zdroj[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "spustit"
    	},
    	vacuum: {
    		start_pause: "start / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "nastavit režim[ na {operation_mode}]",
    		set_away_mode: "vypnout režim"
    	}
    };
    var domains = {
    	alarm_control_panel: "poplašný ovládací panel",
    	binary_sensor: "binary sensors",
    	climate: "klima",
    	cover: "rolety",
    	fan: "ventilátory",
    	group: "skupiny",
    	humidifier: "zvlhčovače",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "světla",
    	lock: "zámky",
    	media_player: "média přehrávače",
    	notify: "notification",
    	"switch": "spínače",
    	vacuum: "vysavače",
    	water_heater: "ohřívače vody"
    };
    var ui = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "denně",
    				workdays: "pracovní dny",
    				weekend: "víkendy"
    			},
    			day_types_long: {
    				daily: "každý den",
    				workdays: "v pracovní dny",
    				weekend: "o víkendu"
    			},
    			days: "dnů",
    			tomorrow: "zítra",
    			repeated_days: "každý {days}",
    			repeated_days_except: "každý den kromě {excludedDays}",
    			days_range: "od {startDay} do {endDay}",
    			next_week_day: "příští {weekday}"
    		},
    		time: {
    			absolute: "od {time}",
    			interval: "od {startTime} do {endTime}",
    			at_midnight: "od půlnoc",
    			at_noon: "od poledne",
    			at_sun_event: "na {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plánovač"
    		},
    		overview: {
    			no_entries: "Nejsou žádné položky k zobrazení",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number} vyloučeno {if number is 1} položka {else} položek",
    			hide_excluded: "skrýt vyloučené položky",
    			additional_tasks: "{number} a více {if number is 1} úkol {else} úkolů"
    		},
    		entity_picker: {
    			no_groups_defined: "Nejsou definovány žádné skupiny",
    			no_group_selected: "Nejprve vyberte skupinu",
    			no_entities_for_group: "V této skupině nejsou žádné entity",
    			no_entity_selected: "Nejprve vyberte entitu",
    			no_actions_for_entity: "Pro tuto entitu neexistují žádné akce",
    			make_scheme: "vytvořit schéma",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Nejprve vyberte časový úsek",
    			time_scheme: "Schéma",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "je",
    			unequal_to: "není",
    			all: "Vše",
    			any: "žádný",
    			no_conditions_defined: "Nejsou definovány žádné podmínky",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "chování po spuštění",
    			period: "období"
    		}
    	}
    };
    var cs = {
    	services: services,
    	domains: domains,
    	ui: ui
    };

    var cs$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services,
        domains: domains,
        ui: ui,
        'default': cs
    });

    var services$1 = {
    	generic: {
    		parameter_to_value: "{parameter} auf {value}",
    		action_with_parameter: "{action} mit {parameter}"
    	},
    	climate: {
    		set_temperature: "Temperatur einstellen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat: "heizen[ auf {temperature}]",
    		set_temperature_hvac_mode_cool: "kühlen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulieren[ auf {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "Modus setzen[ auf {hvac_mode}]",
    		set_preset_mode: "Voreinstellung setzen[ auf {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "schließen",
    		open_cover: "öffnen",
    		set_cover_position: "Position setzen[ auf {position}]",
    		set_cover_tilt_position: "Tilt Position setzen[ auf {tilt_position}]"
    	},
    	fan: {
    		set_speed: "Geschwindigkeit speed[ auf {speed}]",
    		set_direction: "Richtung setzen[ auf {direction}]",
    		oscillate: "Oszillation setzen[ auf {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "Luftfeuchtigkeit setzen[ auf {humidity}]",
    		set_mode: "Modus setzen[ auf {mode}]"
    	},
    	input_number: {
    		set_value: "Wert setzen[ auf {value}]"
    	},
    	input_select: {
    		select_option: "Option[ {option}] auswählen"
    	},
    	select: {
    		select_option: "Option[ {option}] auswählen"
    	},
    	light: {
    		turn_on: "anschalten[ mit {brightness} Helligkeit]"
    	},
    	media_player: {
    		select_source: "Quelle[ {source}] auswählen"
    	},
    	notify: {
    		notify: "Nachricht senden"
    	},
    	script: {
    		script: "ausführen"
    	},
    	vacuum: {
    		start_pause: "Start / Pause"
    	},
    	water_heater: {
    		set_operation_mode: "Modus setzen[ auf {operation_mode}]",
    		set_away_mode: "Abwesenheitsmodus setzen"
    	}
    };
    var domains$1 = {
    	alarm_control_panel: "Alarmzentrale",
    	binary_sensor: "binary sensors",
    	climate: "Heizung",
    	cover: "Beschattung",
    	fan: "Lüfter",
    	group: "Gruppen",
    	humidifier: "Befeuchter",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "Licht",
    	lock: "Schlösser",
    	media_player: "Medienplayer",
    	notify: "notification",
    	"switch": "Schalter",
    	vacuum: "Staubsauger",
    	water_heater: "Boiler"
    };
    var ui$1 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "täglich",
    				workdays: "Werktags",
    				weekend: "Wochenende"
    			},
    			day_types_long: {
    				daily: "Jeden Tag",
    				workdays: "An Werktagen",
    				weekend: "Am Wochenende"
    			},
    			days: "Tage",
    			tomorrow: "morgen",
    			repeated_days: "jeden {days}",
    			repeated_days_except: "täglich außer {excludedDays}",
    			days_range: "von {startDay} bis {endDay}",
    			next_week_day: "nächsten {weekday}"
    		},
    		time: {
    			absolute: "um {time}",
    			interval: "von {startTime} bis {endTime}",
    			at_midnight: "um Mitternacht",
    			at_noon: "um Mittag",
    			at_sun_event: "beim {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Zeitplaner"
    		},
    		overview: {
    			no_entries: "Es gibt keine Einträge, die angezeigt werden können",
    			backend_error: "Es konnte keine Verbindung mit der Schedulerkomponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",
    			excluded_items: "{number}{if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",
    			hide_excluded: "Verstecke ausgeschlossene Einträge",
    			additional_tasks: "{number} weitere {if number is 1} Aufgabe {else} Aufgaben"
    		},
    		entity_picker: {
    			no_groups_defined: "Es gibt keine Gruppe",
    			no_group_selected: "Wähle zuerst eine Gruppe aus",
    			no_entities_for_group: "Es gibt keine Entities in dieser Gruppe",
    			no_entity_selected: "Wähle zuerst eine Entity aus",
    			no_actions_for_entity: "Es gibt keine Aktionen für diese Entity",
    			make_scheme: "Erstelle Zeitplan",
    			multiple: "mehrere"
    		},
    		time_picker: {
    			no_timeslot_selected: "Wähle zuerst ein Zeitfenster aus",
    			time_scheme: "Zeitplan",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "ist",
    			unequal_to: "ist nicht",
    			all: "alle",
    			any: "keine",
    			no_conditions_defined: "Es sind keine Bedingungen definiert",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "Verhalten nach Abschluß",
    			period: "Term"
    		}
    	}
    };
    var de = {
    	services: services$1,
    	domains: domains$1,
    	ui: ui$1
    };

    var de$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$1,
        domains: domains$1,
        ui: ui$1,
        'default': de
    });

    var services$2 = {
    	generic: {
    		parameter_to_value: "{parameter} to {value}",
    		action_with_parameter: "{action} with {parameter}"
    	},
    	climate: {
    		set_temperature: "set temperature[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "heat[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "cool[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "set mode[ to {hvac_mode}]",
    		set_preset_mode: "set preset[ to {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "close",
    		open_cover: "open",
    		set_cover_position: "set position[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "set speed[ to {speed}]",
    		set_direction: "set direction[ to {direction}]",
    		oscillate: "set oscillation[ to {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "set humidity[ to {humidity}]",
    		set_mode: "set mode[ to {mode}]"
    	},
    	input_number: {
    		set_value: "set value[ to {value}]"
    	},
    	input_select: {
    		select_option: "select option[ {option}]"
    	},
    	select: {
    		select_option: "select option[ {option}]"
    	},
    	light: {
    		turn_on: "turn on[ with {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "select source[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "execute"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "set mode[ to {operation_mode}]",
    		set_away_mode: "set away mode"
    	}
    };
    var domains$2 = {
    	alarm_control_panel: "alarm control panel",
    	binary_sensor: "binary sensors",
    	climate: "climate",
    	cover: "covers",
    	fan: "fans",
    	group: "entity groups",
    	humidifier: "humidifiers",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "lights",
    	lock: "locks",
    	media_player: "media players",
    	notify: "notification",
    	"switch": "switches",
    	vacuum: "vacuums",
    	water_heater: "water heaters"
    };
    var ui$2 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "daily",
    				workdays: "workdays",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "every day",
    				workdays: "on workdays",
    				weekend: "in the weekend"
    			},
    			days: "days",
    			tomorrow: "tomorrow",
    			repeated_days: "every {days}",
    			repeated_days_except: "every day except {excludedDays}",
    			days_range: "from {startDay} to {endDay}",
    			next_week_day: "next {weekday}"
    		},
    		time: {
    			absolute: "at {time}",
    			interval: "from {startTime} to {endTime}",
    			at_midnight: "at midnight",
    			at_noon: "at noon",
    			at_sun_event: "at {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Scheduler"
    		},
    		overview: {
    			no_entries: "There are no items to show",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number} excluded {if number is 1} item {else} items",
    			hide_excluded: "hide excluded items",
    			additional_tasks: "{number} more {if number is 1} task {else} tasks"
    		},
    		entity_picker: {
    			no_groups_defined: "There are no groups defined",
    			no_group_selected: "Select a group first",
    			no_entities_for_group: "There are no entities in this group",
    			no_entity_selected: "Select an entity first",
    			no_actions_for_entity: "There are no actions for this entity",
    			make_scheme: "make scheme",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Select a timeslot first",
    			time_scheme: "Scheme",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is not",
    			all: "all",
    			any: "any",
    			no_conditions_defined: "There are no conditions defined",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "behaviour after completion",
    			period: "period"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Entities",
    				other: "Other"
    			},
    			fields: {
    				title: {
    					heading: "Title of the card",
    					options: {
    						standard: "standard",
    						hidden: "hidden",
    						custom: "custom"
    					},
    					custom_title: "Custom title"
    				},
    				discover_existing: {
    					heading: "Show all schedules",
    					description: "This sets the 'discover existing' parameter. Previously created schedules will be automatically added to the card. "
    				},
    				time_step: {
    					heading: "Time step",
    					description: "Resolution (in minutes) for creating schedules"
    				},
    				sort_by: {
    					heading: "Sorting options",
    					description: "Order in which the schedules appear in the card",
    					options: {
    						relative_time: "Time remaining until next action",
    						title: "Displayed title of the schedule",
    						state: "Show active schedules on top"
    					}
    				},
    				display_format_primary: {
    					heading: "Displayed primary info",
    					description: "Configure which label is used for schedules in the overview",
    					options: {
    						"default": "Schedule name",
    						entity_action: "Summary of task"
    					}
    				},
    				display_format_secondary: {
    					heading: "Displayed secondary info",
    					description: "Configure what additional properties are visible in the overview",
    					options: {
    						relative_time: "Time remaining until next action",
    						time: "Configured time for next action",
    						days: "Repeated days of the week",
    						additional_tasks: "Number of additional tasks"
    					}
    				},
    				show_header_toggle: {
    					heading: "Show header toggle",
    					description: "Show toggle switch at the top of the card for enabling/enabling all entities"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var en = {
    	services: services$2,
    	domains: domains$2,
    	ui: ui$2
    };

    var en$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$2,
        domains: domains$2,
        ui: ui$2,
        'default': en
    });

    var services$3 = {
    	generic: {
    		parameter_to_value: "{parameter} a {value}",
    		action_with_parameter: "{action} con {parameter}"
    	},
    	climate: {
    		set_temperature: "establecer temperatura[ a {temperature}]",
    		set_temperature_hvac_mode_heat: "calefacción[ a {temperature}]",
    		set_temperature_hvac_mode_cool: "frío[ a {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regular[ entre {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "establecer modo[ a {hvac_mode}]",
    		set_preset_mode: "establecer preajuste[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "cerrado",
    		open_cover: "abierto",
    		set_cover_position: "establecer posición[ a {position}]",
    		set_cover_tilt_position: "establecer inclinación[ a {tilt_position}]"
    	},
    	fan: {
    		set_speed: "establecer velocidad [ a {speed}]",
    		set_direction: "establecer dirección[ a {direction}]",
    		oscillate: "establecer oscilación[ a {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "establecer humedad[ a {humidity}]",
    		set_mode: "establecer modo[ a {mode}]"
    	},
    	input_number: {
    		set_value: "establecer valor[ a {value}]"
    	},
    	input_select: {
    		select_option: "seleccionar opción[ {option}]"
    	},
    	select: {
    		select_option: "seleccionar opción[ {option}]"
    	},
    	light: {
    		turn_on: "encender[ con brillo en {brightness}]"
    	},
    	media_player: {
    		select_source: "seleccionar fuente[ {source}]"
    	},
    	notify: {
    		notify: "enviar notificación"
    	},
    	script: {
    		script: "ejecutar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "establecer modo[ a {operation_mode}]",
    		set_away_mode: "establecer modo fuera de casa"
    	}
    };
    var domains$3 = {
    	alarm_control_panel: "panel de control de alarma",
    	binary_sensor: "binary sensors",
    	climate: "climatización",
    	cover: "cortinas",
    	fan: "ventiladores",
    	group: "grupos",
    	humidifier: "humidificadores",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "luces",
    	lock: "cerraduras",
    	media_player: "reproductores",
    	notify: "notification",
    	"switch": "interruptores",
    	vacuum: "aspiradores",
    	water_heater: "calentador de agua"
    };
    var ui$3 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "a diario",
    				workdays: "días hábiles",
    				weekend: "fin de semana"
    			},
    			day_types_long: {
    				daily: "todos los días",
    				workdays: "en días hábiles",
    				weekend: "en el fin de semana"
    			},
    			days: "días",
    			tomorrow: "mañana",
    			repeated_days: "cada {days}",
    			repeated_days_except: "cada dia excepto {excludedDays}",
    			days_range: "de {startDay} a {endDay}",
    			next_week_day: "próximo {weekday}"
    		},
    		time: {
    			absolute: "a las {time}",
    			interval: "desde las {startTime} a las {endTime}",
    			at_midnight: "a la medianoche",
    			at_noon: "a la mediodía",
    			at_sun_event: "a la {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Programador"
    		},
    		overview: {
    			no_entries: "No hay ningún elemento que mostrar",
    			backend_error: "Fallo de conexión con Scheduler component. Debe ser installado como integración antes de poder usar este panel.",
    			excluded_items: "{number} {if number is 1} elemento excluido {else} elementos excluidos",
    			hide_excluded: "ocultar elementos excluidos",
    			additional_tasks: "{number} {if number is 1} tarea adicional {else} tareas adicionales"
    		},
    		entity_picker: {
    			no_groups_defined: "No hay ningún grupo definido",
    			no_group_selected: "selecciona un grupo primero",
    			no_entities_for_group: "no hay ninguna entidad en este grupo",
    			no_entity_selected: "selecciona una entidad primero",
    			no_actions_for_entity: "no hay acciones para esta entidad",
    			make_scheme: "crear planificación",
    			multiple: "Múltiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "selecciona un bloque de tiempo primero",
    			time_scheme: "Planificación",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "igual a",
    			unequal_to: "desigual a",
    			all: "todos",
    			any: "cualquiera",
    			no_conditions_defined: "no hay ninguna condición definida",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "acción después de la finalización",
    			period: "período"
    		}
    	}
    };
    var es = {
    	services: services$3,
    	domains: domains$3,
    	ui: ui$3
    };

    var es$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$3,
        domains: domains$3,
        ui: ui$3,
        'default': es
    });

    var services$4 = {
    	generic: {
    		parameter_to_value: "{parameter} {value} jaoks",
    		action_with_parameter: "{action} väärtusega {parameter}"
    	},
    	climate: {
    		set_temperature: "vali temperatuur [{temperature}]",
    		set_temperature_hvac_mode_heat: "küte[ @ {temperature}]",
    		set_temperature_hvac_mode_cool: "jahutus [ @ {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "vali režiim [{hvac_mode}]",
    		set_preset_mode: "eelseade[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "sulge",
    		open_cover: "ava",
    		set_cover_position: "sea asendisse[{position}]",
    		set_cover_tilt_position: "sea ribide kalle [ asendisse {tilt_position}]"
    	},
    	fan: {
    		set_speed: "vali kiirus[ @ {speed}]",
    		set_direction: "vali suund[ @ {direction}]",
    		oscillate: "vali hajutus[ @ {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "sea niiskus[ {humidity}]",
    		set_mode: "vali režiim [{mode}]"
    	},
    	input_number: {
    		set_value: "vali väärtus[ {value}]"
    	},
    	input_select: {
    		select_option: "valik[ {option}]"
    	},
    	select: {
    		select_option: "valik[ {option}]"
    	},
    	light: {
    		turn_on: "lülita sisse[ heledusega {brightness}]"
    	},
    	media_player: {
    		select_source: "vali sisend[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "käivita"
    	},
    	vacuum: {
    		start_pause: "alusta/ootele"
    	},
    	water_heater: {
    		set_operation_mode: "vali režiim [{operation_mode}]",
    		set_away_mode: "kodust ära"
    	}
    };
    var domains$4 = {
    	alarm_control_panel: "valvepaneel",
    	binary_sensor: "binary sensors",
    	climate: "kliimaseade",
    	cover: "aknakatted",
    	fan: "ventilaatorid",
    	group: "grupid",
    	humidifier: "niisutajad",
    	input_boolean: "tõeväärtus",
    	input_number: "numbriline valik",
    	input_select: "valikmenüü",
    	light: "valgustid",
    	lock: "lukud",
    	media_player: "meediamängijad",
    	notify: "notification",
    	"switch": "lülitid",
    	vacuum: "tolmuimejad",
    	water_heater: "veeboilerid"
    };
    var ui$4 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "iga päev",
    				workdays: "tööpäevadel",
    				weekend: "nädalavahetusel"
    			},
    			day_types_long: {
    				daily: "iga päev",
    				workdays: "tööpäevadel",
    				weekend: "nädalavahetusel"
    			},
    			days: "päeva",
    			tomorrow: "homme",
    			repeated_days: "iga {days} järel",
    			repeated_days_except: "iga päev aga mitte {excludedDays}",
    			days_range: "{startDay} kuni {endDay}",
    			next_week_day: "järgmisel {weekday}"
    		},
    		time: {
    			absolute: "{time}",
    			interval: "{startTime} kuni {endTime}",
    			at_midnight: "keskööl",
    			at_noon: "keskpäeval",
    			at_sun_event: "{sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Ajastaja"
    		},
    		overview: {
    			no_entries: "Ajastused puuduvad",
    			backend_error: "Ajastaja sidumine puudub. Sidumine tuleb luua enne selle kaardi kasutamist.",
    			excluded_items: "välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",
    			hide_excluded: "peida välja jäetud ajastused",
    			additional_tasks: "veel {number} {if number is 1} ajastus {else} ajastust"
    		},
    		entity_picker: {
    			no_groups_defined: "Gruppe pole valitud",
    			no_group_selected: "Vali alustuseks grupid",
    			no_entities_for_group: "Selles grupis puuduvad olemid",
    			no_entity_selected: "Vali alustuseks olem",
    			no_actions_for_entity: "Selle olemi jaoks pole tegevusi",
    			make_scheme: "loo skeem",
    			multiple: "Mitu"
    		},
    		time_picker: {
    			no_timeslot_selected: "Alustuseks vali ajavahemik",
    			time_scheme: "Kkeem",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "võrdub",
    			unequal_to: "ei võrdu",
    			all: "kõik",
    			any: "iga",
    			no_conditions_defined: "Tingimusi pole määratud",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "toiming peale käivitumist",
    			period: "periood"
    		}
    	}
    };
    var et = {
    	services: services$4,
    	domains: domains$4,
    	ui: ui$4
    };

    var et$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$4,
        domains: domains$4,
        ui: ui$4,
        'default': et
    });

    var services$5 = {
    	generic: {
    		parameter_to_value: "{parameter} vers {value}",
    		action_with_parameter: "{action} avec {parameter}"
    	},
    	climate: {
    		set_temperature: "ajuster la température[ à {temperature}]",
    		set_temperature_hvac_mode_heat: "chauffe[ à {temperature}]",
    		set_temperature_hvac_mode_cool: "refroidit[ à {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "régler[ à {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "ajuster le mode[ à {hvac_mode}]",
    		set_preset_mode: "choisir le pré-réglage[ {preset_mode}]",
    		set_fan_mode: "ajuster le mode de ventilation[ à {fan_mode}]"
    	},
    	cover: {
    		close_cover: "fermer",
    		open_cover: "ouvrir",
    		set_cover_position: "ajuster la position[ à {position}]",
    		set_cover_tilt_position: "régler les volets[ à {tilt_position}]"
    	},
    	fan: {
    		set_speed: "ajuster la vitesse[ à {speed}]",
    		set_direction: "ajuster l'orientation[ vers {direction}]",
    		oscillate: "ajuster l'oscillation[ à {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "ajuster l'humidité[ à {humidity}]",
    		set_mode: "ajuster le mode[ à {mode}]"
    	},
    	input_number: {
    		set_value: "ajuster la valeur[ à {value}]"
    	},
    	input_select: {
    		select_option: "choisir l'option[ {option}]"
    	},
    	select: {
    		select_option: "choisir l'option[ {option}]"
    	},
    	light: {
    		turn_on: "allumer[ avec une luminosité de {brightness}]"
    	},
    	media_player: {
    		select_source: "choisir la source[ {source}]"
    	},
    	notify: {
    		notify: "envoyer une notification"
    	},
    	script: {
    		script: "exécuter"
    	},
    	vacuum: {
    		start_pause: "démarrer / pause"
    	},
    	water_heater: {
    		set_operation_mode: "ajuster le mode[ à {operation_mode}]",
    		set_away_mode: "choisir le mode absent"
    	}
    };
    var domains$5 = {
    	alarm_control_panel: "panneau de contrôle de l'alarme",
    	binary_sensor: "capteurs binaires",
    	climate: "thermostat",
    	cover: "volet",
    	fan: "ventilateur",
    	group: "groupe",
    	humidifier: "humidificateur",
    	input_boolean: "entrée booléenne",
    	input_number: "entrée numérique",
    	input_select: "entrée de sélection",
    	light: "lumière",
    	lock: "serrure",
    	media_player: "lecteur multimédia",
    	notify: "notification",
    	"switch": "interrupteur",
    	vacuum: "aspirateur",
    	water_heater: "chauffe eau"
    };
    var ui$5 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "quotidien",
    				workdays: "jours de travail",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "chaque jour",
    				workdays: "en semaine",
    				weekend: "le weekend"
    			},
    			days: "jours",
    			tomorrow: "demain",
    			repeated_days: "chaque {days}",
    			repeated_days_except: "chaque jour sauf {excludedDays}",
    			days_range: "de {startDay} à {endDay}",
    			next_week_day: "{weekday} prochain"
    		},
    		time: {
    			absolute: "à {time}",
    			interval: "de {startTime} à {endTime}",
    			at_midnight: "à minuit",
    			at_noon: "à midi",
    			at_sun_event: "au {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Planificateur"
    		},
    		overview: {
    			no_entries: "il n'y a pas d'entrée à montrer",
    			backend_error: "Impossible de se connecter au composant du planificateur. Elle doit être installée en tant qu'intégration avant que cette carte puisse être utilisée.",
    			excluded_items: "{number} {if number is 1}entrée exclue{else}entrées exclues",
    			hide_excluded: "cacher les entrées exclues",
    			additional_tasks: "{number} {if number is 1}tâche à venir{else}tâches à venir"
    		},
    		entity_picker: {
    			no_groups_defined: "Aucun groupe défini",
    			no_group_selected: "Choisir un groupe en premier",
    			no_entities_for_group: "Il n'y a pas d'entité dans ce groupe",
    			no_entity_selected: "Choisir une entité en premier",
    			no_actions_for_entity: "Il n'y a pas d'action pour cette entité",
    			make_scheme: "créer un schéma",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Choisir d'abord une plage horaire",
    			time_scheme: "Schéma",
    			time_input_mode: "contrôle temporel"
    		},
    		conditions: {
    			equal_to: "égal à",
    			unequal_to: "pas égal à",
    			all: "tous",
    			any: "tout",
    			no_conditions_defined: "Il n'y a pas de condition définie",
    			track_conditions: "Ré-évaluer lorsque la condition change"
    		},
    		options: {
    			repeat_type: "comportement après l'achèvement",
    			period: "période"
    		}
    	}
    };
    var fr = {
    	services: services$5,
    	domains: domains$5,
    	ui: ui$5
    };

    var fr$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$5,
        domains: domains$5,
        ui: ui$5,
        'default': fr
    });

    var services$6 = {
    	generic: {
    		parameter_to_value: "{parameter} ל {value}",
    		action_with_parameter: "{action} עם {parameter}"
    	},
    	climate: {
    		set_temperature: "קבע טמפרטורה[ ל {temperature}]",
    		set_temperature_hvac_mode_heat: "חימום[ ל {temperature}]",
    		set_temperature_hvac_mode_cool: "קירור[ ל {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "קבע מצב עבודה[ ל {hvac_mode}]",
    		set_preset_mode: "קבע הגדרה[ ל {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "סגירה",
    		open_cover: "פתיחה",
    		set_cover_position: "קבע מיקום[ ל {position}]",
    		set_cover_tilt_position: "קבע הטיה[ ל {tilt_position}]"
    	},
    	fan: {
    		set_speed: "קבע מהירות[ ל {speed}]",
    		set_direction: "קבע כיוון[ ל {direction}]",
    		oscillate: "קבע תנודה[ ל {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "קבע לחות[ ל {humidity}]",
    		set_mode: "קבע מצב עבודה[ ל {mode}]"
    	},
    	input_number: {
    		set_value: "קבע ערך[ ל {value}]"
    	},
    	input_select: {
    		select_option: "בחר אפשרות[ {option}]"
    	},
    	select: {
    		select_option: "בחר אפשרות[ {option}]"
    	},
    	light: {
    		turn_on: "הדלקה[ בעוצמה של {brightness}]"
    	},
    	media_player: {
    		select_source: "select source[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "בצע"
    	},
    	vacuum: {
    		start_pause: "התחל / הפסק"
    	},
    	water_heater: {
    		set_operation_mode: "קבע מצב עבודה[ ל {operation_mode}]",
    		set_away_mode: "קבע מצב מוץ לבית"
    	}
    };
    var domains$6 = {
    	alarm_control_panel: "בקרת אזעקה",
    	binary_sensor: "binary sensors",
    	climate: "מזג אוויר",
    	cover: "תריסים",
    	fan: "מאווררים",
    	group: "קבוצות יישויות",
    	humidifier: "מכשירי אדים",
    	input_boolean: "כניסה בוליאנית",
    	input_number: "כניסה מספרית",
    	input_select: "בחירת כניסה",
    	light: "תאורה",
    	lock: "מנעולים",
    	media_player: "נגני מדיה",
    	notify: "notification",
    	"switch": "מפסקים",
    	vacuum: "שואבי אבק",
    	water_heater: "מחממי מים"
    };
    var ui$6 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "כל יום",
    				workdays: "ימי חול",
    				weekend: "סוף שבוע"
    			},
    			day_types_long: {
    				daily: "כל יום",
    				workdays: "בימי חול",
    				weekend: "בסוף השבוע"
    			},
    			days: "ימים",
    			tomorrow: "מחר",
    			repeated_days: "בכל {days}",
    			repeated_days_except: "בכל יום פרט ל  {excludedDays}",
    			days_range: "מ- {startDay} ועד- {endDay}",
    			next_week_day: "הבא {weekday}"
    		},
    		time: {
    			absolute: "בשעה {time}",
    			interval: "משעה {startTime} עד שעה {endTime}",
    			at_midnight: "בחצות הלילה",
    			at_noon: "בחצות היום",
    			at_sun_event: "ב {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "לוח זמנים"
    		},
    		overview: {
    			no_entries: "אין פריטים להצגה",
    			backend_error: "אין אפשרות להתחבר לרכיב התזמונים. נדרש להתקין את הרכיב באינטגרציה לפני השימוש בכרטיס.",
    			excluded_items: "{number} לא נכלל {if number is 1} פריט {else} פריטים",
    			hide_excluded: "הסתר פריטים לא כלולים",
    			additional_tasks: "{number} נוסף {if number is 1} משימה {else} משימות"
    		},
    		entity_picker: {
    			no_groups_defined: "לא הוגדרו קבוצות",
    			no_group_selected: "בחר קבוצה תחילה",
    			no_entities_for_group: "אין יישויות בקבוצה זו",
    			no_entity_selected: "תחילה בחר יישות",
    			no_actions_for_entity: "אין פעולות עבור יישות זאת",
    			make_scheme: "בנה סכימה",
    			multiple: "מספר יישויות"
    		},
    		time_picker: {
    			no_timeslot_selected: "בחר משבצת זמן קודם",
    			time_scheme: "סכימה",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "שווה ל",
    			unequal_to: "שונה מ",
    			all: "כל התנאים",
    			any: "אחד מהתנאים",
    			no_conditions_defined: "לא הוגדרו תנאים",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "התנהגות לאחר הפעלה",
    			period: "פרק זמן"
    		}
    	}
    };
    var he = {
    	services: services$6,
    	domains: domains$6,
    	ui: ui$6
    };

    var he$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$6,
        domains: domains$6,
        ui: ui$6,
        'default': he
    });

    var services$7 = {
    	generic: {
    		parameter_to_value: "{parameter} to {value}",
    		action_with_parameter: "{action} with {parameter}"
    	},
    	climate: {
    		set_temperature: "hőmérséklet[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "hőmérséklet[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "hőmérséklet[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "mód beállítása[ to {hvac_mode}]",
    		set_preset_mode: "preset beállítása[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "zárás",
    		open_cover: "nyitás",
    		set_cover_position: "változtass pozíciót[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "set speed[ to {speed}]",
    		set_direction: "set direction[ to {direction}]",
    		oscillate: "set oscillation[ to {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "set humidity[ to {humidity}]",
    		set_mode: "mód beállítása[ to {mode}]"
    	},
    	input_number: {
    		set_value: "érték beállítása[ to {value}]"
    	},
    	input_select: {
    		select_option: "opció kiválasztása[ {option}]"
    	},
    	select: {
    		select_option: "opció kiválasztása[ {option}]"
    	},
    	light: {
    		turn_on: "bekapcsolás[ with {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "forrás kiválasztása[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "kezdés"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "mód beállítása[ to {operation_mode}]",
    		set_away_mode: "set away mode"
    	}
    };
    var domains$7 = {
    	alarm_control_panel: "alarm control panel",
    	binary_sensor: "binary sensors",
    	climate: "termosztát",
    	cover: "redőny",
    	fan: "ventilátor",
    	group: "csoportok",
    	humidifier: "humifiers",
    	input_boolean: "logikai bemenet",
    	input_number: "szám bemenet",
    	input_select: "legördülő bemenet",
    	light: "lámpa",
    	lock: "locks",
    	media_player: "lejátszó",
    	notify: "notification",
    	"switch": "kapcsoló",
    	vacuum: "pórszívó",
    	water_heater: "water heaters"
    };
    var ui$7 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "minden nap",
    				workdays: "munkanapokon",
    				weekend: "hétvégén"
    			},
    			day_types_long: {
    				daily: "minden nap",
    				workdays: "munkanapokon",
    				weekend: "hétvégén"
    			},
    			days: "Napokon",
    			tomorrow: "tomorrow",
    			repeated_days: "every {days}",
    			repeated_days_except: "every day except {excludedDays}",
    			days_range: "from {startDay} to {endDay}",
    			next_week_day: "következő {weekday}"
    		},
    		time: {
    			absolute: "{time}-kor",
    			interval: "{startTime} - {endTime}",
    			at_midnight: "éjfélkor",
    			at_noon: "délben",
    			at_sun_event: "{sunEvent}kor"
    		}
    	},
    	panel: {
    		common: {
    			title: "Időzítések"
    		},
    		overview: {
    			no_entries: "Nincs megjeleníthető elem",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number} excluded {if number is 1} item {else} items",
    			hide_excluded: "hide excluded items",
    			additional_tasks: "még {number} feladat"
    		},
    		entity_picker: {
    			no_groups_defined: "Nincsenek deffiniált csoportok",
    			no_group_selected: "Előbb egy csoportot szükséges választani",
    			no_entities_for_group: "Ebben a csoportban nem találhatók entitások",
    			no_entity_selected: "Előbb egy entitást szükséges választani",
    			no_actions_for_entity: "Ehhez az entitáshoz nem tartoznak műveletek",
    			make_scheme: "make scheme",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Select a timeslot first",
    			time_scheme: "Scheme",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is not",
    			all: "all",
    			any: "any",
    			no_conditions_defined: "There are no conditions defined",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "behaviour after triggering",
    			period: "időszak"
    		}
    	}
    };
    var hu = {
    	services: services$7,
    	domains: domains$7,
    	ui: ui$7
    };

    var hu$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$7,
        domains: domains$7,
        ui: ui$7,
        'default': hu
    });

    var services$8 = {
    	generic: {
    		parameter_to_value: "{parameter} a {value}",
    		action_with_parameter: "{action} con {parameter}"
    	},
    	climate: {
    		set_temperature: "imposta temperatura[ a {temperature}]",
    		set_temperature_hvac_mode_heat: "riscaldamento[ a {temperature}]",
    		set_temperature_hvac_mode_cool: "raffrescamento[ a {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regola[ a {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "imposta modalità[ a {hvac_mode}]",
    		set_preset_mode: "imposta programmazione[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "chiuso",
    		open_cover: "aperto",
    		set_cover_position: "imposta posizione[ su {position}]",
    		set_cover_tilt_position: "imposta inclinazione[ su {tilt_position}]"
    	},
    	fan: {
    		set_speed: "imposta velocità[ a {speed}]",
    		set_direction: "imposta direzione[ a {direction}]",
    		oscillate: "imposta oscillazione[ a {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "imposta umidità[ a {humidity}]",
    		set_mode: "imposta modalità[ a {mode}]"
    	},
    	input_number: {
    		set_value: "imposta valore[ a {value}]"
    	},
    	input_select: {
    		select_option: "seleziona opzione[ {option}]"
    	},
    	select: {
    		select_option: "seleziona opzione[ {option}]"
    	},
    	light: {
    		turn_on: "accendi[ con il {brightness} di luminosità]"
    	},
    	media_player: {
    		select_source: "seleziona sorgente[ {source}]"
    	},
    	notify: {
    		notify: "invia notifica"
    	},
    	script: {
    		script: "esegui"
    	},
    	vacuum: {
    		start_pause: "avvia / pausa"
    	},
    	water_heater: {
    		set_operation_mode: "imposta modalità[ a {operation_mode}]",
    		set_away_mode: "imposta fuori casa"
    	}
    };
    var domains$8 = {
    	alarm_control_panel: "pannello di controllo allarme",
    	binary_sensor: "binary sensors",
    	climate: "clima",
    	cover: "serrande",
    	fan: "ventole",
    	group: "gruppi",
    	humidifier: "umidificatori",
    	input_boolean: "input booleani",
    	input_number: "input numerici",
    	input_select: "input select",
    	light: "luci",
    	lock: "lucchetti",
    	media_player: "media player",
    	notify: "notification",
    	"switch": "interruttori",
    	vacuum: "aspirapolveri",
    	water_heater: "scaldabagno"
    };
    var ui$8 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "giornaliero",
    				workdays: "giorni lavorativi",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "ogni giorno",
    				workdays: "nei giorni lavorativi",
    				weekend: "nel weekend"
    			},
    			days: "giorni",
    			tomorrow: "domani",
    			repeated_days: "ogni {days}",
    			repeated_days_except: "ogni giorno tranne {excludedDays}",
    			days_range: "{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}",
    			next_week_day: "prossimo {weekday}"
    		},
    		time: {
    			absolute: "alle {time}",
    			interval: "dalle {startTime} alle {endTime}",
    			at_midnight: "a mezzanotte",
    			at_noon: "a mezzogiorno",
    			at_sun_event: "al {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Schedulatore"
    		},
    		overview: {
    			no_entries: "Non ci sono oggetti da visualizzare",
    			backend_error: "Impossibile connettersi con il componente scheduler. Deve essere installato come integrazione prima di poter utilizzare questa card.",
    			excluded_items: "{number} {if number is 1} oggetto escluso {else} oggetti esclusi",
    			hide_excluded: "Nascondi oggetti esclusi",
    			additional_tasks: "{number} attività in più"
    		},
    		entity_picker: {
    			no_groups_defined: "Non ci sono gruppi definiti",
    			no_group_selected: "Seleziona prima un gruppo",
    			no_entities_for_group: "Non ci sono entità in questo gruppo",
    			no_entity_selected: "Seleziona prima un'entità",
    			no_actions_for_entity: "Non ci sono azioni per questa entità",
    			make_scheme: "crea schema",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Seleziona prima una fascia oraria",
    			time_scheme: "Schema",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "uguale",
    			unequal_to: "non uguale",
    			all: "tutte",
    			any: "qualunque",
    			no_conditions_defined: "Non ci sono condizioni definite",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "comportamento dopo il completamento",
    			period: "periodo"
    		}
    	}
    };
    var it = {
    	services: services$8,
    	domains: domains$8,
    	ui: ui$8
    };

    var it$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$8,
        domains: domains$8,
        ui: ui$8,
        'default': it
    });

    var services$9 = {
    	generic: {
    		parameter_to_value: "{parameter} naar {value}",
    		action_with_parameter: "{action} met {parameter}"
    	},
    	climate: {
    		set_temperature: "temperatuur instellen[ naar {temperature}]",
    		set_temperature_hvac_mode_heat: "verwarmen[ naar {temperature}]",
    		set_temperature_hvac_mode_cool: "koelen[ naar {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "reguleren[ naar {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "modus aanpassen[ naar {hvac_mode}]",
    		set_preset_mode: "programma[ {preset_mode}] instellen",
    		set_fan_mode: "ventilatiemodus aanpassen[ naar {fan_mode}]"
    	},
    	cover: {
    		close_cover: "sluiten",
    		open_cover: "openen",
    		set_cover_position: "positie instellen[ naar {position}]",
    		set_cover_tilt_position: "hellingshoek instellen[ naar {tilt_position}]"
    	},
    	fan: {
    		set_speed: "snelheid instellen[ op {speed}]",
    		set_direction: "richting instellen[ naar {direction}]",
    		oscillate: "zet oscillatie[ naar {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "luchtvochtigheid instellen [ op {humidity}]",
    		set_mode: "modus aanpassen[ naar {mode}]"
    	},
    	input_number: {
    		set_value: "waarde aanpassen[ naar {value}]"
    	},
    	input_select: {
    		select_option: "selecteer optie[ {option}]"
    	},
    	select: {
    		select_option: "selecteer optie[ {option}]"
    	},
    	light: {
    		turn_on: "inschakelen[ met {brightness} helderheid]"
    	},
    	media_player: {
    		select_source: "kies ingang[ {source}]"
    	},
    	notify: {
    		notify: "notificatie sturen"
    	},
    	script: {
    		script: "uitvoeren"
    	},
    	vacuum: {
    		start_pause: "start / pauzeer"
    	},
    	water_heater: {
    		set_operation_mode: "modus aanpassen[ naar {operation_mode}]",
    		set_away_mode: "stel afwezigheidsmode in"
    	}
    };
    var domains$9 = {
    	alarm_control_panel: "alarmsystemen",
    	binary_sensor: "binaire sensoren",
    	climate: "verwarming",
    	cover: "zonwering",
    	fan: "ventilatie",
    	group: "groepen",
    	humidifier: "luchtbevochtigers",
    	input_boolean: "input_boolean",
    	input_number: "input_number",
    	input_select: "input_select",
    	select: "select",
    	light: "verlichting",
    	lock: "sloten",
    	media_player: "mediaspelers",
    	notify: "notificatie",
    	"switch": "schakelaars",
    	vacuum: "stofzuigers",
    	water_heater: "waterverwarming"
    };
    var ui$9 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "dagelijks",
    				workdays: "werkdagen",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "iedere dag",
    				workdays: "doordeweeks",
    				weekend: "in het weekend"
    			},
    			days: "dagen",
    			tomorrow: "morgen",
    			repeated_days: "elke {days}",
    			repeated_days_except: "elke dag behalve {excludedDays}",
    			days_range: "van {startDay} tot {endDay}",
    			next_week_day: "volgende week {weekday}"
    		},
    		time: {
    			absolute: "om {time}",
    			interval: "van {startTime} tot {endTime}",
    			at_midnight: "om middernacht",
    			at_noon: "om 12:00",
    			at_sun_event: "bij {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Tijdplanner"
    		},
    		overview: {
    			no_entries: "Er zijn geen items aangemaakt",
    			backend_error: "Er kon geen verbinding worden gemaakt met het Scheduler component. Deze moet als integratie zijn geinstalleerd voordat deze kaart gebruikt kan worden.",
    			excluded_items: "{number} uitgesloten {if number is 1} item {else} items",
    			hide_excluded: "verberg uitgesloten items",
    			additional_tasks: "{number} overige {if number is 1} taak {else} taken"
    		},
    		entity_picker: {
    			no_group_selected: "Selecteer eerst een groep",
    			no_entity_selected: "Selecteer eerst een entiteit",
    			no_groups_defined: "Er zijn geen groepen gedefinieerd",
    			no_entities_for_group: "Deze groep heeft geen entiteiten",
    			no_actions_for_entity: "Deze entiteit heeft geen acties",
    			make_scheme: "maak schema",
    			multiple: "Meerdere"
    		},
    		time_picker: {
    			no_timeslot_selected: "Kies eerst een tijdsslot",
    			time_scheme: "Schema",
    			time_input_mode: "Invoermodus voor tijd"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is niet",
    			all: "en",
    			any: "of",
    			no_conditions_defined: "Er zijn geen voorwaarden gedefinieerd",
    			track_conditions: "Herevalueer wanneer condities veranderen"
    		},
    		options: {
    			repeat_type: "gedrag na voltooiing",
    			period: "periode"
    		}
    	}
    };
    var nl = {
    	services: services$9,
    	domains: domains$9,
    	ui: ui$9
    };

    var nl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$9,
        domains: domains$9,
        ui: ui$9,
        'default': nl
    });

    var services$a = {
    	generic: {
    		parameter_to_value: "{parameter} til {value}",
    		action_with_parameter: "{action} med {parameter}"
    	},
    	climate: {
    		set_temperature: "sett temperatur[ til {temperature}]",
    		set_temperature_hvac_mode_heat: "sett temperatur[ til {temperature}]",
    		set_temperature_hvac_mode_cool: "sett temperatur[ til {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "reguler[ til {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "sett modus[ til {hvac_mode}]",
    		set_preset_mode: "sett forhåndsvalg[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "lukk",
    		open_cover: "åpne",
    		set_cover_position: "sett posisjon[ til {position}]",
    		set_cover_tilt_position: "sett vippestilling[ til {tilt_position}]"
    	},
    	fan: {
    		set_speed: "sett hastighet[ til {speed}]",
    		set_direction: "sett retning[ til {direction}]",
    		oscillate: "sett svingning[ til {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "sett luftfuktighet[ til {humidity}]",
    		set_mode: "sett modus[ til {mode}]"
    	},
    	input_number: {
    		set_value: "sett verdi[ til {value}]"
    	},
    	input_select: {
    		select_option: "velg[ {option}]"
    	},
    	select: {
    		select_option: "velg[ {option}]"
    	},
    	light: {
    		turn_on: "slå på[ med {brightness} lysstyrke]"
    	},
    	media_player: {
    		select_source: "velg kilde[ {source}]"
    	},
    	notify: {
    		notify: "send notifikasjon"
    	},
    	script: {
    		script: "utfør"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "sett modus[ til {operation_mode}]",
    		set_away_mode: "sett bortemodus"
    	}
    };
    var domains$a = {
    	alarm_control_panel: "alarmpanel",
    	binary_sensor: "binary sensors",
    	climate: "klima",
    	cover: "solskjerming",
    	fan: "vifter",
    	group: "grupper",
    	humidifier: "luftfuktere",
    	input_boolean: "input boolsk",
    	input_number: "input nummer",
    	input_select: "input valg",
    	light: "lys",
    	lock: "låser",
    	media_player: "mediaspillere",
    	notify: "notification",
    	"switch": "brytere",
    	vacuum: "støvsugere",
    	water_heater: "varmtvannsberedere"
    };
    var ui$a = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "hver dag",
    				workdays: "ukedager",
    				weekend: "helg"
    			},
    			day_types_long: {
    				daily: "hver dag",
    				workdays: "ukedager",
    				weekend: "helg"
    			},
    			days: "Dager",
    			tomorrow: "imorgen",
    			repeated_days: "hver {days}",
    			repeated_days_except: "hver dag unntatt {excludedDays}",
    			days_range: "fra {startDay} til {endDay}",
    			next_week_day: "neste {weekday}"
    		},
    		time: {
    			absolute: "kl. {time}",
    			interval: "fra {startTime} til {endTime}",
    			at_midnight: "ved midnatt",
    			at_noon: "kl. 12.00",
    			at_sun_event: "ved {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Tidsplan"
    		},
    		overview: {
    			no_entries: "Det er ingen definerte tidsplaner å vise",
    			backend_error: "Kunne ikke koble til tidsplankomponenten. Den må installeres som en integrasjon før dette kortet kan benyttes.",
    			excluded_items: "{number} ekskludert {if number is 1} element {else} elementer",
    			hide_excluded: "skjul ekskluderte elementer",
    			additional_tasks: "{number} flere {if number is 1} oppgaver {else} oppgaver"
    		},
    		entity_picker: {
    			no_groups_defined: "Ingen grupper definert",
    			no_group_selected: "Velg en gruppe først",
    			no_entities_for_group: "Det finnes ingen entiteter i denne gruppen",
    			no_entity_selected: "Velg en entitet først",
    			no_actions_for_entity: "Det finnes ingen handlinger for denne entiteten",
    			make_scheme: "lag tidsplan",
    			multiple: "Flere"
    		},
    		time_picker: {
    			no_timeslot_selected: "Velg tidsluke først",
    			time_scheme: "Tidsplan",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "er",
    			unequal_to: "er ikke",
    			all: "alle",
    			any: "any",
    			no_conditions_defined: "Ingen vilkår definert",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "oppførsel etter fullføring",
    			period: "periode"
    		}
    	}
    };
    var no = {
    	services: services$a,
    	domains: domains$a,
    	ui: ui$a
    };

    var no$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$a,
        domains: domains$a,
        ui: ui$a,
        'default': no
    });

    var services$b = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} z {parameter}"
    	},
    	climate: {
    		set_temperature: "ustaw temperaturę[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "grzej[ do {temperature}]",
    		set_temperature_hvac_mode_cool: "chłodź[ do {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "ustaw tryb[ na {hvac_mode}]",
    		set_preset_mode: "ustaw preset[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "zamknij",
    		open_cover: "otwórz",
    		set_cover_position: "ustaw pozycję[ na {position}]",
    		set_cover_tilt_position: "ustaw pozycję lameli[ na {tilt_position}]"
    	},
    	fan: {
    		set_speed: "ustaw prędkość[ na {speed}]",
    		set_direction: "ustaw kierunek[ na {direction}]",
    		oscillate: "ustaw oscylacje[ na {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "ustaw wilgotność[ na {humidity}]",
    		set_mode: "ustaw tryb[ na {mode}]"
    	},
    	input_number: {
    		set_value: "ustaw wartość[ na {value}]"
    	},
    	input_select: {
    		select_option: "wybierz opcję[ {option}]"
    	},
    	select: {
    		select_option: "wybierz opcję[ {option}]"
    	},
    	light: {
    		turn_on: "zapal[ z jasnością {brightness}]"
    	},
    	media_player: {
    		select_source: "wybierz źródło[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "wykonaj"
    	},
    	vacuum: {
    		start_pause: "start / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "ustaw tryb[ na {operation_mode}]",
    		set_away_mode: "ustaw tryb nieobecności"
    	}
    };
    var domains$b = {
    	alarm_control_panel: "panel kontrolny alarmu",
    	binary_sensor: "binary sensors",
    	climate: "klimatyzacja",
    	cover: "rolety",
    	fan: "wentylatory",
    	group: "grupy",
    	humidifier: "nawilżacze",
    	input_boolean: "wejście logiczne",
    	input_number: "wejście liczbowe",
    	input_select: "wybór wejścia",
    	light: "światła",
    	lock: "zamki",
    	media_player: "odtwarzacze",
    	notify: "notification",
    	"switch": "przełączniki",
    	vacuum: "odkurzacze",
    	water_heater: "podgrzewacze wody"
    };
    var ui$b = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "codziennie",
    				workdays: "robocze",
    				weekend: "weekendy"
    			},
    			day_types_long: {
    				daily: "codziennie",
    				workdays: "w dni robocze",
    				weekend: "podczas weekendu"
    			},
    			days: "dni",
    			tomorrow: "jutro",
    			repeated_days: "co {days} dni",
    			repeated_days_except: "coddziennie z wyjątkiem {excludedDays}",
    			days_range: "od {startDay} do {endDay}",
    			next_week_day: "następna {weekday}"
    		},
    		time: {
    			absolute: "o {time}",
    			interval: "od {startTime} do {endTime}",
    			at_midnight: "o północ",
    			at_noon: "o południe",
    			at_sun_event: "o {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Harmonogram"
    		},
    		overview: {
    			no_entries: "Nie ma elementów do pokazania",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number} wykluczona {if number is 1} pozycja {else} pozycje",
    			hide_excluded: "ukryj wykluczone pozycje",
    			additional_tasks: "{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"
    		},
    		entity_picker: {
    			no_groups_defined: "Nie ma zdefiniowanych grup",
    			no_group_selected: "Najpierw wybierz grupę",
    			no_entities_for_group: "Nie ma encji w tej grupie",
    			no_entity_selected: "Najpierw wybierz encję",
    			no_actions_for_entity: "Nie ma akcji dla tej encji",
    			make_scheme: "stwórz schemat",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Najpierw wybierz przedział czasowy",
    			time_scheme: "Schemat",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "jest równe ",
    			unequal_to: "nie jest równe",
    			all: "wszystkie",
    			any: "dowolny",
    			no_conditions_defined: "Nie ma zdefiniowanych warunków",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "zachowanie po zakończeniu",
    			period: "okres"
    		}
    	}
    };
    var pl = {
    	services: services$b,
    	domains: domains$b,
    	ui: ui$b
    };

    var pl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$b,
        domains: domains$b,
        ui: ui$b,
        'default': pl
    });

    var services$c = {
    	generic: {
    		parameter_to_value: "{parameter} para {value}",
    		action_with_parameter: "{action} com {parameter}"
    	},
    	climate: {
    		set_temperature: "definir temperatura[ para {temperature}]",
    		set_temperature_hvac_mode_heat: "aquecimento[ para {temperature}]",
    		set_temperature_hvac_mode_cool: "arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "definir modo[ para {hvac_mode}]",
    		set_preset_mode: "definir predefinição[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "definir velocidade[ para {speed}]",
    		set_direction: "definir direção[ para {direction}]",
    		oscillate: "definir oscilação[ para {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "definir humidade[ para {humidity}]",
    		set_mode: "definir modo[ para {mode}]"
    	},
    	input_number: {
    		set_value: "definir valor[ para {value}]"
    	},
    	input_select: {
    		select_option: "selecionar opção[ {option}]"
    	},
    	select: {
    		select_option: "selecionar opção[ {option}]"
    	},
    	light: {
    		turn_on: "ligar[ com {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "selecionar origem[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "executar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "definir modo[ para {operation_mode}]",
    		set_away_mode: "definir modo ausente"
    	}
    };
    var domains$c = {
    	alarm_control_panel: "painel de controlo de alarme",
    	binary_sensor: "binary sensors",
    	climate: "ambiente",
    	cover: "estores",
    	fan: "ventiladores",
    	group: "grupos",
    	humidifier: "humidificadores",
    	input_boolean: "campo booleano",
    	input_number: "campo numérico",
    	input_select: "campo de opção",
    	light: "iluminação",
    	lock: "fechaduras",
    	media_player: "reprodutores de mídia",
    	notify: "notification",
    	"switch": "interruptores",
    	vacuum: "aspiradores",
    	water_heater: "aquecedores hidráulicos"
    };
    var ui$c = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "todos",
    				workdays: "semana de trabalho",
    				weekend: "fim-de-semana"
    			},
    			day_types_long: {
    				daily: "todos os dias",
    				workdays: "em dias de semana",
    				weekend: "no fim-de-semana"
    			},
    			days: "dias",
    			tomorrow: "amanhã",
    			repeated_days: "a cada {days}",
    			repeated_days_except: "a cada dia exceto {excludedDays}",
    			days_range: "até {startDay} até {endDay}",
    			next_week_day: "próximo {weekday}"
    		},
    		time: {
    			absolute: "Às {time}",
    			interval: "das {startTime} às {endTime}",
    			at_midnight: "ao meia-noite",
    			at_noon: "ao meio-dia",
    			at_sun_event: "ao {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Agenda"
    		},
    		overview: {
    			no_entries: "Não existem itens a mostrar",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number}{if number is 1} item excluído {else} itens excluídos",
    			hide_excluded: "ocultar itens excluídos",
    			additional_tasks: "Mais {number} {if number is 1} tarefa {else} tarefas"
    		},
    		entity_picker: {
    			no_groups_defined: "Não existem grupos definidos",
    			no_group_selected: "Selecione um grupo primeiro",
    			no_entities_for_group: "Não existem entidades neste grupo",
    			no_entity_selected: "Selecione uma entidade primeiro",
    			no_actions_for_entity: "Não existem ações para esta entidade",
    			make_scheme: "criar esquema",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "É necessário selecionar um período horário para escolher uma ação",
    			time_scheme: "Esquema",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer",
    			no_conditions_defined: "Não existem condições definidas",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "comportamento após a conclusão",
    			period: "período"
    		}
    	}
    };
    var pt = {
    	services: services$c,
    	domains: domains$c,
    	ui: ui$c
    };

    var pt$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$c,
        domains: domains$c,
        ui: ui$c,
        'default': pt
    });

    var services$d = {
    	generic: {
    		parameter_to_value: "{parameter} para {value}",
    		action_with_parameter: "{action} com {parameter}"
    	},
    	climate: {
    		set_temperature: "definir temperatura[ para {temperature}]",
    		set_temperature_hvac_mode_heat: "aquecimento[ para {temperature}]",
    		set_temperature_hvac_mode_cool: "arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "definir modo[ para {hvac_mode}]",
    		set_preset_mode: "definir predefinição[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "definir velocidade[ para {speed}]",
    		set_direction: "definir direção[ para {direction}]",
    		oscillate: "definir oscilação[ para {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "definir humidade[ para {humidity}]",
    		set_mode: "definir modo[ para {mode}]"
    	},
    	input_number: {
    		set_value: "definir valor[ para {value}]"
    	},
    	input_select: {
    		select_option: "selecionar opção[ {option}]"
    	},
    	select: {
    		select_option: "selecionar opção[ {option}]"
    	},
    	light: {
    		turn_on: "ligar[ com {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "selecionar origem[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "executar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "definir modo[ para {operation_mode}]",
    		set_away_mode: "definir modo ausente"
    	}
    };
    var domains$d = {
    	alarm_control_panel: "painel de controlo de alarme",
    	binary_sensor: "binary sensors",
    	climate: "ambiente",
    	cover: "estores",
    	fan: "ventiladores",
    	group: "grupos",
    	humidifier: "humidificadores",
    	input_boolean: "campo booleano",
    	input_number: "campo numérico",
    	input_select: "campo de opção",
    	light: "iluminação",
    	lock: "fechaduras",
    	media_player: "reprodutores de mídia",
    	notify: "notification",
    	"switch": "interruptores",
    	vacuum: "aspiradores",
    	water_heater: "aquecedores hidráulicos"
    };
    var ui$d = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "diário",
    				workdays: "semana de trabalho",
    				weekend: "fim-de-semana"
    			},
    			day_types_long: {
    				daily: "todos os dias",
    				workdays: "em dias de semana",
    				weekend: "no fim-de-semana"
    			},
    			days: "dias",
    			tomorrow: "amanhã",
    			repeated_days: "a cada {days}",
    			repeated_days_except: "a cada dia exceto {excludedDays}",
    			days_range: "até {startDay} até {endDay}",
    			next_week_day: "próximo {weekday}"
    		},
    		time: {
    			absolute: "à {time}",
    			interval: "das {startTime} às {endTime}",
    			at_midnight: "ao meia-noite",
    			at_noon: "ao meio-dia",
    			at_sun_event: "ao {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Agenda"
    		},
    		overview: {
    			no_entries: "Não existem itens a mostrar",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number}{if number is 1} item excluído {else} itens excluídos",
    			hide_excluded: "ocultar itens excluídos",
    			additional_tasks: "Mais {number} {if number is 1} tarefa {else} tarefas"
    		},
    		entity_picker: {
    			no_groups_defined: "Não existem grupos definidos",
    			no_group_selected: "Selecione um grupo primeiro",
    			no_entities_for_group: "Não existem entidades neste grupo",
    			no_entity_selected: "Selecione uma entidade primeiro",
    			no_actions_for_entity: "Não existem ações para esta entidade",
    			make_scheme: "criar esquema",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Selecionar um período horário primeiro",
    			time_scheme: "Esquema",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer",
    			no_conditions_defined: "Não existem condições definidas",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "comportamento após a conclusão",
    			period: "período"
    		}
    	}
    };
    var ptBr = {
    	services: services$d,
    	domains: domains$d,
    	ui: ui$d
    };

    var pt_br = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$d,
        domains: domains$d,
        ui: ui$d,
        'default': ptBr
    });

    var services$e = {
    	generic: {
    		parameter_to_value: "{parameter} la {value}",
    		action_with_parameter: "{action} cu {parameter}"
    	},
    	climate: {
    		set_temperature: "setare temperatură[ la {temperature}]",
    		set_temperature_hvac_mode_heat: "încălzire[ la {temperature}]",
    		set_temperature_hvac_mode_cool: "răcire[ la {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "setare mod[ la {hvac_mode}]",
    		set_preset_mode: "setare preset[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "închidere",
    		open_cover: "deschidere",
    		set_cover_position: "setare poziție[ la {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "setare viteză[ la {speed}]",
    		set_direction: "setare direcție[ la {direction}]",
    		oscillate: "setare oscilare[ la {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "setare umiditate[ la {humidity}]",
    		set_mode: "setare mod[ la {mode}]"
    	},
    	input_number: {
    		set_value: "setare valoare[ la {value}]"
    	},
    	input_select: {
    		select_option: "selectare opțiune[ {option}]"
    	},
    	select: {
    		select_option: "selectare opțiune[ {option}]"
    	},
    	light: {
    		turn_on: "pornire[ cu luminozitate {brightness}]"
    	},
    	media_player: {
    		select_source: "selectare sursă[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "executare"
    	},
    	vacuum: {
    		start_pause: "start / pauză"
    	},
    	water_heater: {
    		set_operation_mode: "setare mod[ la {operation_mode}]",
    		set_away_mode: "setare mod plecat"
    	}
    };
    var domains$e = {
    	alarm_control_panel: "panou control alarmă",
    	binary_sensor: "binary sensors",
    	climate: "climat",
    	cover: "jaluzele",
    	fan: "ventilatoare",
    	group: "grupuri",
    	humidifier: "umidificatoare",
    	input_boolean: "input boolean",
    	input_number: "input număr",
    	input_select: "input selecție",
    	light: "lumini",
    	lock: "încuietori",
    	media_player: "media playere",
    	notify: "notification",
    	"switch": "întrerupătoare",
    	vacuum: "aspiratoare",
    	water_heater: "încălzitoare apă"
    };
    var ui$e = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "zilnic",
    				workdays: "zile lucrătoare",
    				weekend: "sfârșit de săptămână"
    			},
    			day_types_long: {
    				daily: "zilnic",
    				workdays: "în timpul săptămânii",
    				weekend: "la sfârșit de săptămână"
    			},
    			days: "zile",
    			tomorrow: "mâine",
    			repeated_days: "la fiecare {days} zile",
    			repeated_days_except: "zilnic cu excepția {excludedDays}",
    			days_range: "din {startDay} până în {endDay}",
    			next_week_day: "{weekday} viitoare"
    		},
    		time: {
    			absolute: "la {time}",
    			interval: "de la {startTime} până la {endTime}",
    			at_midnight: "la miezul nopții",
    			at_noon: "la amiază",
    			at_sun_event: "la {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Planificator"
    		},
    		overview: {
    			no_entries: "Nu există elemente de afișat",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{if number is 1}un element exclus {else}{number} elemente excluse",
    			hide_excluded: "ascunde elementele excluse",
    			additional_tasks: "{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"
    		},
    		entity_picker: {
    			no_groups_defined: "Nu există grupuri definite",
    			no_group_selected: "Prima dată selectați un grup",
    			no_entities_for_group: "Nu există entități definite în acest grup",
    			no_entity_selected: "Prima dată selectați o entitate",
    			no_actions_for_entity: "Nu există acțiuni pentru această entitate",
    			make_scheme: "creare schemă",
    			multiple: "Multiple"
    		},
    		time_picker: {
    			no_timeslot_selected: "Prima dată selectați un interval orar",
    			time_scheme: "Schemă",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "este",
    			unequal_to: "nu este",
    			all: "tot",
    			any: "oricare",
    			no_conditions_defined: "Nu există condiții definite",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "comportament după declanșare",
    			period: "perioadă"
    		}
    	}
    };
    var ro = {
    	services: services$e,
    	domains: domains$e,
    	ui: ui$e
    };

    var ro$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$e,
        domains: domains$e,
        ui: ui$e,
        'default': ro
    });

    var services$f = {
    	generic: {
    		parameter_to_value: "{parameter} к {value}",
    		action_with_parameter: "{action} с {parameter}"
    	},
    	climate: {
    		set_temperature: "установить температуру[ {temperature}]",
    		set_temperature_hvac_mode_heat: "обогрев[ {temperature}]",
    		set_temperature_hvac_mode_cool: "охлаждение[ {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "регулировать[ в пределах {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "установить режим[ {hvac_mode}]",
    		set_preset_mode: "выбрать набор настроек[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "закрыть",
    		open_cover: "открыть",
    		set_cover_position: "установить позицию[ {position}]",
    		set_cover_tilt_position: "установить наклон[ {tilt_position}]"
    	},
    	fan: {
    		set_speed: "установить скорость[ {speed}]",
    		set_direction: "установить направление[ {direction}]",
    		oscillate: "установить колебание[ {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "установить влажность[ {humidity}]",
    		set_mode: "установить режим[ {mode}]"
    	},
    	input_number: {
    		set_value: "установить значение[ в {value}]"
    	},
    	input_select: {
    		select_option: "установить опцию[ {option}]"
    	},
    	select: {
    		select_option: "установить опцию[ {option}]"
    	},
    	light: {
    		turn_on: "включить[ с {brightness} яркостью]"
    	},
    	media_player: {
    		select_source: "выбрать источник[ {source}]"
    	},
    	notify: {
    		notify: "послать сообщение"
    	},
    	script: {
    		script: "запустить"
    	},
    	vacuum: {
    		start_pause: "старт / пауза"
    	},
    	water_heater: {
    		set_operation_mode: "установить режим[ {operation_mode}]",
    		set_away_mode: "установить режим вне дома"
    	}
    };
    var domains$f = {
    	alarm_control_panel: "панель управления сигнализацией",
    	binary_sensor: "binary sensors",
    	climate: "климат",
    	cover: "жалюзи",
    	fan: "вентиляторы",
    	group: "группы",
    	humidifier: "увлажнители",
    	input_boolean: "логические",
    	input_number: "числовые",
    	input_select: "списки",
    	light: "освещение",
    	lock: "замки",
    	media_player: "медиа-плееры",
    	notify: "notification",
    	"switch": "розетки",
    	vacuum: "пылесосы",
    	water_heater: "подогреватели воды"
    };
    var ui$f = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "ежедневно",
    				workdays: "рабочие дни",
    				weekend: "выходные"
    			},
    			day_types_long: {
    				daily: "каждый день",
    				workdays: "по рабочим дням",
    				weekend: "в выходные"
    			},
    			days: "дни",
    			tomorrow: "завтра",
    			repeated_days: "каждый {days}",
    			repeated_days_except: "каждый день кроме {excludedDays}",
    			days_range: "с {startDay} до {endDay}",
    			next_week_day: "в следующую {weekday}"
    		},
    		time: {
    			absolute: "в {time}",
    			interval: "с {startTime} до {endTime}",
    			at_midnight: "в полночь",
    			at_noon: "в полдень",
    			at_sun_event: "в {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Планировщик"
    		},
    		overview: {
    			no_entries: "Отсутствуют элементы",
    			backend_error: "Нет соединенияс scheduler component. Scheduler component должен быть установлен до применения этой карты.",
    			excluded_items: "{number} исключено {if number is 1} элемент {else} элементов",
    			hide_excluded: "скрыть исключенные элементы",
    			additional_tasks: "{number} больше {if number is 1} задача {else} задач"
    		},
    		entity_picker: {
    			no_groups_defined: "Не определены группы",
    			no_group_selected: "Выберите группу",
    			no_entities_for_group: "Отсутствуют элементы в группе",
    			no_entity_selected: "Выберите элемент",
    			no_actions_for_entity: "Нет действий для этого элемента",
    			make_scheme: "создать схему",
    			multiple: "Множественный"
    		},
    		time_picker: {
    			no_timeslot_selected: "Выберите временной слот",
    			time_scheme: "Cхему",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "равно",
    			unequal_to: "не равно",
    			all: "все",
    			any: "любое",
    			no_conditions_defined: "Не определены условия",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "поведение после срабатывания",
    			period: "период"
    		}
    	}
    };
    var ru = {
    	services: services$f,
    	domains: domains$f,
    	ui: ui$f
    };

    var ru$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$f,
        domains: domains$f,
        ui: ui$f,
        'default': ru
    });

    var services$g = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} s {parameter}"
    	},
    	climate: {
    		set_temperature: "nastaviť teplotu[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "vykurovanie[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chladenie[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "nastaviť režim[ na {hvac_mode}]",
    		set_preset_mode: "nastaviť predvoľbu[ {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "zatvoriť",
    		open_cover: "otvoriť",
    		set_cover_position: "nastaviť polohu[ na {position}]",
    		set_cover_tilt_position: "nastaviť naklonenie[ na {tilt_position}]"
    	},
    	fan: {
    		set_speed: "nastaviť rýchlosť[ na {speed}]",
    		set_direction: "nastaviť smer[ na {direction}]",
    		oscillate: "nastaviť osciláciu[ na {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "nastaviť vlhkosť[ na {humidity}]",
    		set_mode: "nastaviť režim[ na {mode}]"
    	},
    	input_number: {
    		set_value: "nastaviť hodnotu[ na {value}]"
    	},
    	input_select: {
    		select_option: "vybrať možnosť[ {option}]"
    	},
    	select: {
    		select_option: "vybrať možnosť[ {option}]"
    	},
    	light: {
    		turn_on: "zapnúť[ na {brightness} jas]"
    	},
    	media_player: {
    		select_source: "vybrať zdroj[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "spustiť"
    	},
    	vacuum: {
    		start_pause: "štart / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "nastaviť režim[ na {operation_mode}]",
    		set_away_mode: "nastaviť mód neprítomný"
    	}
    };
    var domains$g = {
    	alarm_control_panel: "ovládací panel alarmu",
    	binary_sensor: "binary sensors",
    	climate: "klimatizácia",
    	cover: "rolety",
    	fan: "ventilátory",
    	group: "skupiny",
    	humidifier: "zvlhčovače",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "svetlá",
    	lock: "zámky",
    	media_player: "mediálne prehrávače",
    	notify: "notification",
    	"switch": "vypínače",
    	vacuum: "vysávače",
    	water_heater: "ohrievače vody"
    };
    var ui$g = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "denne",
    				workdays: "pracovné dni",
    				weekend: "víkend"
    			},
    			day_types_long: {
    				daily: "každý deň",
    				workdays: "cez pracovné dni",
    				weekend: "cez víkend"
    			},
    			days: "dni",
    			tomorrow: "zajtra",
    			repeated_days: "každý {days}",
    			repeated_days_except: "každý deň okrem {excludedDays}",
    			days_range: "od {startDay} do {endDay}",
    			next_week_day: "budúcu {weekday}"
    		},
    		time: {
    			absolute: "od {time}",
    			interval: "od {startTime} do {endTime}",
    			at_midnight: "od polnoci",
    			at_noon: "od obeda",
    			at_sun_event: "na {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plánovač"
    		},
    		overview: {
    			no_entries: "Žiadne položky k zobrazeniu",
    			backend_error: "Nepodarilo sa pripojiť k Scheduler Component. Musí byť nainštalovaný ako integrácia pred použitím tejto karty.",
    			excluded_items: "Vylúčené položky: {number}",
    			hide_excluded: "skryť vylúčené položky",
    			additional_tasks: "Ďalšie úlohy: {number}"
    		},
    		entity_picker: {
    			no_groups_defined: "Nie sú definované žiadne skupiny",
    			no_group_selected: "Najprv vyberte skupinu",
    			no_entities_for_group: "V tejto skupine nie sú žiadne entity",
    			no_entity_selected: "Najprv vyberte entitu",
    			no_actions_for_entity: "Pre túto entitu neexistujú žiadne akcie",
    			make_scheme: "vytvoriť schému",
    			multiple: "Viacero"
    		},
    		time_picker: {
    			no_timeslot_selected: "Najprv vyberte časový úsek",
    			time_scheme: "Schému",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "je",
    			unequal_to: "nie je",
    			all: "Všetko",
    			any: "žiadny",
    			no_conditions_defined: "Nie sú definované žiadne podmienky",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "správanie sa po spustení",
    			period: "obdobie"
    		}
    	}
    };
    var sk = {
    	services: services$g,
    	domains: domains$g,
    	ui: ui$g
    };

    var sk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$g,
        domains: domains$g,
        ui: ui$g,
        'default': sk
    });

    var services$h = {
    	generic: {
    		parameter_to_value: "{parameter} до {value}",
    		action_with_parameter: "{action} з {parameter}"
    	},
    	climate: {
    		set_temperature: "встановити температуру[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "нагрів[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "охолодження[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "встановити режим[ to {hvac_mode}]",
    		set_preset_mode: "вибрати пресет[ to {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "закрити",
    		open_cover: "відкрити",
    		set_cover_position: "встановити позицію[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "встановити швидкість[ to {speed}]",
    		set_direction: "встановити напрямок[ to {direction}]",
    		oscillate: "встановити коливання[ to {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "встановити вологість[ to {humidity}]",
    		set_mode: "встановити режим[ to {mode}]"
    	},
    	input_number: {
    		set_value: "встановити значення[ to {value}]"
    	},
    	input_select: {
    		select_option: "встановити опцію[ {option}]"
    	},
    	select: {
    		select_option: "встановити опцію[ {option}]"
    	},
    	light: {
    		turn_on: "увімкнути[ з {brightness} якскравістю]"
    	},
    	media_player: {
    		select_source: "вибрати джерело[ {source}]"
    	},
    	notify: {
    		notify: "send notification"
    	},
    	script: {
    		script: "виконати"
    	},
    	vacuum: {
    		start_pause: "старт / пауза"
    	},
    	water_heater: {
    		set_operation_mode: "встановити режим[ to {operation_mode}]",
    		set_away_mode: "встановити режим Не вдома"
    	}
    };
    var domains$h = {
    	alarm_control_panel: "панель керування сигналізацією",
    	binary_sensor: "binary sensors",
    	climate: "клімат",
    	cover: "жалюзі",
    	fan: "вентилятори",
    	group: "групи",
    	humidifier: "зволожувачі",
    	input_boolean: "логічні",
    	input_number: "числові",
    	input_select: "списки",
    	light: "освітлення",
    	lock: "замки",
    	media_player: "медіаплеєри",
    	notify: "notification",
    	"switch": "вимикачі",
    	vacuum: "пилососи",
    	water_heater: "водонагрівачі"
    };
    var ui$h = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "щоденно",
    				workdays: "робочі дні",
    				weekend: "вихідні"
    			},
    			day_types_long: {
    				daily: "кожного дня",
    				workdays: "в робочі дні",
    				weekend: "по вихідних"
    			},
    			days: "дні",
    			tomorrow: "завтра",
    			repeated_days: "кожні {days}",
    			repeated_days_except: "кожного дня окрім {excludedDays}",
    			days_range: "з {startDay} до {endDay}",
    			next_week_day: "наступної {weekday}"
    		},
    		time: {
    			absolute: "о {time}",
    			interval: "з {startTime} до {endTime}",
    			at_midnight: "опівночі",
    			at_noon: "опівдні",
    			at_sun_event: "о {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "Планувальник"
    		},
    		overview: {
    			no_entries: "Елементи відсутні",
    			backend_error: "Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",
    			excluded_items: "{number} виключено {if number is 1} елемент {else} елементів",
    			hide_excluded: "сховати виключені елементи",
    			additional_tasks: "{number} більше {if number is 1} завдання {else} завдань"
    		},
    		entity_picker: {
    			no_groups_defined: "Немає визначених груп",
    			no_group_selected: "Спершу виберіть групу",
    			no_entities_for_group: "В даній групі відсутні елементи",
    			no_entity_selected: "Спершу виберіть елемент",
    			no_actions_for_entity: "Немає дій для цього елемента",
    			make_scheme: "створити схему",
    			multiple: "Декілька"
    		},
    		time_picker: {
    			no_timeslot_selected: "Спершу виберіть часовий проміжок",
    			time_scheme: "Cхему",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "дорівнює",
    			unequal_to: "не рівне",
    			all: "всі",
    			any: "будь-яке",
    			no_conditions_defined: "Не визначені умови",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "поведінка після спрацювання",
    			period: "період"
    		}
    	}
    };
    var uk = {
    	services: services$h,
    	domains: domains$h,
    	ui: ui$h
    };

    var uk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$h,
        domains: domains$h,
        ui: ui$h,
        'default': uk
    });

    var services$i = {
    	generic: {
    		parameter_to_value: "{parameter} 至 {value}",
    		action_with_parameter: "{action} 使用 {parameter}"
    	},
    	climate: {
    		set_temperature: "设定温度[ 至 {temperature}]",
    		set_temperature_hvac_mode_heat: "制热模式[ 至 {temperature}]",
    		set_temperature_hvac_mode_cool: "制冷模式[ 至 {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "调节[ 至 {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "设定模式[ 为 {hvac_mode}]",
    		set_preset_mode: "设定预设模式[ 为 {preset_mode}]",
    		set_fan_mode: "set fan mode[ to {fan_mode}]"
    	},
    	cover: {
    		close_cover: "关闭",
    		open_cover: "打开",
    		set_cover_position: "设定位置[ 至 {position}]",
    		set_cover_tilt_position: "设定倾斜位置[ 至 {tilt_position}]"
    	},
    	fan: {
    		set_speed: "设定风速[ 至 {speed}]",
    		set_direction: "设定方向[ 至 {direction}]",
    		oscillate: "设置摇摆[ 至 {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "设定湿度[ 至 {humidity}]",
    		set_mode: "设定模式[ 为 {mode}]"
    	},
    	input_number: {
    		set_value: "设定数值[ 至 {value}]"
    	},
    	input_select: {
    		select_option: "选择选项[ {option}]"
    	},
    	select: {
    		select_option: "选择选项[ {option}]"
    	},
    	light: {
    		turn_on: "打开[ 并设定亮度为 {brightness}]"
    	},
    	media_player: {
    		select_source: "选择播放源[ {source}]"
    	},
    	notify: {
    		notify: "发送通知"
    	},
    	script: {
    		script: "执行"
    	},
    	vacuum: {
    		start_pause: "开始 / 暂停"
    	},
    	water_heater: {
    		set_operation_mode: "设定模式[ 为 {operation_mode}]",
    		set_away_mode: "设定离开模式"
    	}
    };
    var domains$i = {
    	alarm_control_panel: "警戒控制面板",
    	binary_sensor: "binary sensors",
    	climate: "空调/地暖",
    	cover: "窗帘",
    	fan: "风扇/空气净化器",
    	group: "实体组",
    	humidifier: "空气加湿器",
    	input_boolean: "输入二元选择器",
    	input_number: "输入数值",
    	input_select: "输入选择",
    	light: "灯具",
    	lock: "门锁",
    	media_player: "媒体播放器",
    	notify: "notification",
    	"switch": "开关",
    	vacuum: "扫地机/吸尘器",
    	water_heater: "热水器"
    };
    var ui$i = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "每日",
    				workdays: "工作日",
    				weekend: "周末"
    			},
    			day_types_long: {
    				daily: "每一天",
    				workdays: "在工作日",
    				weekend: "在周末"
    			},
    			days: "天",
    			tomorrow: "明天",
    			repeated_days: "每 {days}",
    			repeated_days_except: "每天，除了 {excludedDays}",
    			days_range: "从 {startDay} 至 {endDay}",
    			next_week_day: "下{weekday}"
    		},
    		time: {
    			absolute: "在 {time}",
    			interval: "从 {startTime} 至 {endTime}",
    			at_midnight: "在午夜",
    			at_noon: "在正午",
    			at_sun_event: "在 {sunEvent}"
    		}
    	},
    	panel: {
    		common: {
    			title: "计划任务"
    		},
    		overview: {
    			no_entries: "无事项",
    			backend_error: "计划任务组件关联失败。本卡片使用前，需先安装计划任务组件和集成.",
    			excluded_items: "{number} 除外 {if number is 1} 事项 {else} 事项",
    			hide_excluded: "隐藏除外事项",
    			additional_tasks: "{number} 更多 {if number is 1} 任务 {else} 任务"
    		},
    		entity_picker: {
    			no_groups_defined: "未添加需执行计划任务的群组",
    			no_group_selected: "请选择群组",
    			no_entities_for_group: "群组不含实体",
    			no_entity_selected: "请选择实体",
    			no_actions_for_entity: "该实体不含可执行的动作",
    			make_scheme: "制定计划",
    			multiple: "多选"
    		},
    		time_picker: {
    			no_timeslot_selected: "请选择时间段",
    			time_scheme: "议程",
    			time_input_mode: "Time control mode"
    		},
    		conditions: {
    			equal_to: "是",
    			unequal_to: "非",
    			all: "全部",
    			any: "任一",
    			no_conditions_defined: "未定义条件",
    			track_conditions: "Re-evaluate when conditions change"
    		},
    		options: {
    			repeat_type: "触发后的行为",
    			period: "时期"
    		}
    	}
    };
    var zhHans = {
    	services: services$i,
    	domains: domains$i,
    	ui: ui$i
    };

    var zh_Hans = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$i,
        domains: domains$i,
        ui: ui$i,
        'default': zhHans
    });

    const languages = {
        cs: cs$1,
        de: de$1,
        en: en$1,
        es: es$1,
        et: et$1,
        es_419: es$1,
        fr: fr$1,
        he: he$1,
        hu: hu$1,
        it: it$1,
        nb: no$1,
        nl: nl$1,
        nn: no$1,
        no: no$1,
        pl: pl$1,
        pt: pt$1,
        pt_BR: pt_br,
        ro: ro$1,
        sk: sk$1,
        ru: ru$1,
        uk: uk$1,
        'zh-Hans': zh_Hans,
    };
    function localize(string, locale, search = '', replace = '') {
        let translated;
        try {
            if (locale.language == 'test')
                return 'TRANSLATED';
            translated = string.split('.').reduce((o, i) => o[i], languages[locale.language]);
            if (!translated)
                translated = string.split('.').reduce((o, i) => o[i], languages['en']);
        }
        catch (e) {
            try {
                translated = string.split('.').reduce((o, i) => o[i], languages['en']);
            }
            catch (e) {
                translated = '';
            }
        }
        if (search !== '' && replace !== '' && translated) {
            if (!Array.isArray(search))
                search = [search];
            if (!Array.isArray(replace))
                replace = [replace];
            for (let i = 0; i < search.length; i++) {
                translated = translated.replace(String(search[i]), String(replace[i]));
                const res = translated.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);
                if (res && String(search[i]).replace(/[\{\}']+/g, '') == res[1]) {
                    const is_match = String(replace[i]) == res[2];
                    if (is_match)
                        translated = translated.replace(res[0], res[3]);
                    else
                        translated = translated.replace(res[0], res[4]);
                }
            }
        }
        // if (!translated) {
        //   console.log(`missing translation for ${string}`);
        // }
        return translated;
    }

    const commonStyle = i `
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
  `;

    const SubscribeMixin = (superClass) => {
        class SubscribeClass extends superClass {
            connectedCallback() {
                super.connectedCallback();
                this.__checkSubscribed();
            }
            disconnectedCallback() {
                super.disconnectedCallback();
                if (this.__unsubs) {
                    while (this.__unsubs.length) {
                        const unsub = this.__unsubs.pop();
                        if (unsub instanceof Promise) {
                            unsub.then(unsubFunc => unsubFunc());
                        }
                        else {
                            unsub();
                        }
                    }
                    this.__unsubs = undefined;
                }
            }
            updated(changedProps) {
                super.updated(changedProps);
                if (changedProps.has('hass')) {
                    this.__checkSubscribed();
                }
            }
            hassSubscribe() {
                return [];
            }
            __checkSubscribed() {
                if (this.__unsubs !== undefined || !this.isConnected || this.hass === undefined) {
                    return;
                }
                this.__unsubs = this.hassSubscribe();
            }
        }
        __decorate([
            e$3({ attribute: false })
        ], SubscribeClass.prototype, "hass", void 0);
        return SubscribeClass;
    };

    const fetchSchedules = (hass) => hass.callWS({
        type: 'scheduler',
    });
    const fetchScheduleItem = (hass, schedule_id) => hass.callWS({
        type: 'scheduler/item',
        schedule_id: schedule_id,
    });
    const saveSchedule = (hass, config) => {
        return hass.callApi('POST', 'scheduler/add', config);
    };
    const editSchedule = (hass, config) => {
        return hass.callApi('POST', 'scheduler/edit', config);
    };
    const deleteSchedule = (hass, schedule_id) => {
        return hass.callApi('POST', 'scheduler/remove', { schedule_id: schedule_id });
    };
    const fetchTags = (hass) => hass.callWS({
        type: 'scheduler/tags',
    });
    function showErrorDialog(target, error) {
        A$1(target, 'show-dialog', {
            dialogTag: 'dialog-error',
            dialogImport: () => Promise.resolve().then(function () { return dialogError; }),
            dialogParams: { error: error },
        });
    }
    function handleError(err, el) {
        const errorMessage = T `
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;
        showErrorDialog(el, errorMessage);
    }

    function matchPattern(pattern, value) {
        let res = false;
        if (pattern.match(/^[a-z0-9_\.]+$/)) {
            res = !pattern.includes('.') && value.includes('.') ? pattern == g$1(value) : pattern == value;
        }
        else {
            try {
                if ((pattern.startsWith('/') && pattern.endsWith('/')) || pattern.indexOf('*') !== -1) {
                    if (!pattern.startsWith('/')) {
                        pattern = pattern.replace(/\./g, '.').replace(/\*/g, '.*');
                        pattern = `/^${pattern}$/`;
                    }
                    const regex = new RegExp(pattern.slice(1, -1));
                    res = regex.test(value);
                }
            }
            catch (e) { }
        }
        return res;
    }

    function entityFilter(entity_id, config) {
        var _a;
        const applyFilter = (value, filter) => {
            return (((filter.include || []).some(e => matchPattern(e, value)) ||
                Object.keys(filter.customize || {}).some(e => matchPattern(e, value))) &&
                !(filter.exclude || []).some(e => matchPattern(e, value)));
        };
        return ((_a = config.groups) === null || _a === void 0 ? void 0 : _a.some(group => applyFilter(entity_id, group))) || applyFilter(entity_id, config);
    }

    const binarySensorIcon = (stateObj) => {
        if (stateObj)
            return re(Object.assign(Object.assign({}, stateObj), { state: 'off' })) || 'mdi:radiobox-blank';
        else
            return 'mdi:radiobox-blank';
    };
    const sensorIcon = (stateObj) => {
        var _a;
        const deviceClass = stateObj.attributes.device_class || '';
        switch (deviceClass) {
            case 'humidity':
                return 'mdi:water-percent';
            case 'illuminance':
                return 'mdi:brightness-5';
            case 'temperature':
                return 'mdi:thermometer';
            case 'power':
                return 'mdi:flash';
            case 'pressure':
                return 'mdi:gauge';
            case 'signal_strength':
                return 'mdi:wifi';
            default:
                return ((_a = stateObj.attributes.unit_of_measurement) === null || _a === void 0 ? void 0 : _a.includes('°')) ? 'mdi:thermometer' : 'mdi:eye';
        }
    };
    const coverIcon = (stateObj, state) => {
        const closedState = state == 'closed';
        switch (stateObj.attributes.device_class) {
            case 'garage':
                return closedState ? 'mdi:garage' : 'mdi:garage-open';
            case 'door':
                return closedState ? 'mdi:door-closed' : 'mdi:door-open';
            case 'blind':
                return closedState ? 'mdi:blinds' : 'mdi:blinds-open';
            case 'window':
                return closedState ? 'mdi:window-closed' : 'mdi:window-open';
            default:
                return closedState ? 'mdi:window-shutter' : 'mdi:window-shutter-open';
        }
    };
    const domainIcons = {
        alarm_control_panel: 'hass:alarm-light-outline',
        automation: 'hass:playlist-play',
        binary_sensor: 'hass:radiobox-blank',
        calendar: 'hass:calendar',
        camera: 'hass:camera',
        climate: 'hass:home-thermometer-outline',
        cover: 'hass:window-shutter',
        device_tracker: 'hass:account',
        fan: 'hass:fan',
        group: 'hass:google-circles-communities',
        humidifier: 'hass:air-humidifier',
        input_boolean: 'hass:drawing',
        input_number: 'hass:ray-vertex',
        input_select: 'hass:format-list-bulleted',
        select: 'hass:format-list-bulleted',
        input_text: 'hass:textbox',
        light: 'hass:lightbulb-outline',
        lock: 'hass:lock-open-outline',
        media_player: 'hass:cast-connected',
        number: 'hass:ray-vertex',
        notify: 'hass:message-text-outline',
        person: 'hass:account-outline',
        proximity: 'hass:map-marker-distance',
        remote: 'hass:remote',
        scene: 'hass:palette-outline',
        script: 'hass:file-document',
        sensor: 'hass:eye',
        sun: 'hass:white-balance-sunny',
        switch: 'hass:flash',
        timer: 'hass:timer',
        vacuum: 'hass:robot-vacuum',
        water_heater: 'hass:water-boiler',
    };
    const standardIcon = (entity_id, hass) => {
        const domain = g$1(entity_id);
        const stateObj = hass.states[entity_id];
        switch (domain) {
            case 'binary_sensor':
                return binarySensorIcon(stateObj);
            case 'cover':
                return coverIcon(stateObj);
            case 'sensor':
                return sensorIcon(stateObj);
            default:
                if (domain in domainIcons)
                    return domainIcons[domain];
                return 'hass:folder-outline';
        }
    };

    function compareActions(actionA, actionB, allowVars = false) {
        const isOptional = (variable, action) => {
            return (Object.keys(action.variables || {}).includes(variable) &&
                action.variables[variable].type == EVariableType.Level &&
                action.variables[variable].optional);
        };
        //actions should have the same service
        if (actionA.service !== actionB.service)
            return false;
        const serviceDataA = Object.keys(actionA.service_data || {});
        const variablesA = Object.keys(actionA.variables || {});
        const serviceDataB = Object.keys(actionB.service_data || {});
        const variablesB = Object.keys(actionB.variables || {});
        const argsA = [...new Set([...serviceDataA, ...variablesA])];
        const argsB = [...new Set([...serviceDataB, ...variablesB])];
        const allArgs = [...new Set([...argsA, ...argsB])];
        return allArgs.every(arg => {
            // both actions must have the parameter in common
            if (!argsA.includes(arg))
                return isOptional(arg, actionB);
            if (!argsB.includes(arg))
                return isOptional(arg, actionA);
            // if its a fixed parameter it must be equal
            if (serviceDataA.filter(e => !variablesA.includes(e)).includes(arg) &&
                serviceDataB.filter(e => !variablesB.includes(e)).includes(arg))
                return actionA.service_data[arg] === actionB.service_data[arg];
            // if both are variables they are assumed to be equal
            if (variablesA.includes(arg) && variablesB.includes(arg))
                return true;
            if (!allowVars)
                return false;
            // compare a fixed value with variable
            const value = serviceDataA.includes(arg) ? actionA.service_data[arg] : actionB.service_data[arg];
            const variable = variablesA.includes(arg) ? actionA.variables[arg] : actionB.variables[arg];
            if (variable.type === EVariableType.List) {
                return variable.options.some(e => e.value === value);
            }
            else if (variable.type === EVariableType.Level)
                return !isNaN(value);
            else if (variable.type == EVariableType.Text)
                return true;
            return false;
        });
    }

    const numericAttribute = (stateObj, attribute, fallback) => {
        if (typeof attribute == 'number')
            return attribute;
        if (!isDefined(stateObj) || !isDefined(stateObj.attributes[attribute]))
            return fallback;
        const val = stateObj.attributes[attribute];
        if (typeof val == 'number')
            return val;
        return fallback;
    };
    const listAttribute = (stateObj, attribute, initializer = []) => {
        if (!isDefined(stateObj) || !isDefined(stateObj.attributes[attribute]))
            return initializer;
        const val = stateObj.attributes[attribute];
        if (Array.isArray(val))
            return val.map(e => String(e));
        return initializer;
    };
    const stringAttribute = (stateObj, attribute, initializer = '') => {
        if (!isDefined(stateObj) || !isDefined(stateObj.attributes[attribute]))
            return initializer;
        const val = stateObj.attributes[attribute];
        if (typeof val == 'string')
            return val;
        return initializer;
    };

    const parseVariable = (config, stateObj, hass) => {
        const res = 'template' in config && isDefined(config.template)
            ? Object.assign(Object.assign({}, omit(config, 'template')), config.template(stateObj, hass)) : Object.assign({}, config);
        if ('options' in res) {
            return parseListVariable(res, stateObj);
        }
        else if ('min' in res && 'max' in res) {
            return parseLevelVariable(res, stateObj);
        }
        else {
            return res;
        }
    };
    const parseListVariable = (config, stateObj) => {
        if (typeof config.options == 'string') {
            let res = listAttribute(stateObj, config.options);
            return {
                options: res.map(e => Object({ value: e })),
            };
        }
        else if (Array.isArray(config.options)) {
            return {
                options: config.options.map(e => Object({ value: e })),
            };
        }
        else {
            return {
                options: Object.entries(config.options).map(([k, v]) => Object(Object.assign({ value: k }, v))),
            };
        }
    };
    const parseLevelVariable = (config, stateObj) => {
        let result = pick(config, ['unit', 'optional', 'scale_factor']);
        if (isDefined(config.min))
            result = Object.assign(Object.assign({}, result), { min: numericAttribute(stateObj, config.min) });
        if (isDefined(config.max))
            result = Object.assign(Object.assign({}, result), { max: numericAttribute(stateObj, config.max) });
        if (isDefined(config.step))
            result = Object.assign(Object.assign({}, result), { step: numericAttribute(stateObj, config.step) });
        if (isDefined(config.unit) && config.unit == 'unit_of_measurement')
            result = Object.assign(Object.assign({}, result), { unit: stringAttribute(stateObj, config.unit, '') });
        return result;
    };

    function levelVariable(...config) {
        //factory function to create LevelVariable from configuration
        const min = config.map(e => e.min).filter(isDefined);
        const max = config.map(e => e.max).filter(isDefined);
        const step = config.map(e => e.step).filter(isDefined);
        const scale_factor = unique(config.map(e => e.scale_factor).filter(isDefined));
        const optional = config.map(e => e.optional).filter(isDefined);
        const unit = config.map(e => e.unit).filter(isDefined);
        const name = config.map(e => e.name).filter(isDefined);
        const stepSize = step.length ? Math.max(...step) : 1;
        const round = (val) => {
            val = Math.round(val / stepSize) * stepSize;
            return parseFloat(val.toPrecision(12));
        };
        const variable = {
            type: EVariableType.Level,
            min: round(min.length ? Math.min(...min) : 0),
            max: round(max.length ? Math.max(...max) : 255),
            step: stepSize,
            scale_factor: scale_factor.length == 1 ? scale_factor[0] : 1,
            optional: (optional.length && optional.every(e => e)) || false,
            unit: unit.length ? unit.reduce((_acc, val) => val) : '',
            name: name.length ? name.reduce((_acc, val) => val) : undefined,
        };
        return variable;
    }
    function levelVariableDisplay(value, variable) {
        let val = Number(value);
        if (isNaN(val))
            return '';
        if (variable.scale_factor != 1) {
            val = val / variable.scale_factor;
            val = Math.round(val / variable.step) * variable.step;
            val = parseFloat(val.toPrecision(12));
            if (val > variable.max)
                val = variable.max;
            else if (val < variable.min)
                val = variable.min;
        }
        return `${val}${variable.unit}`;
    }

    const colorModesToSupportedFeatures = (colorModes) => {
        if (!colorModes || !Array.isArray(colorModes))
            return 0;
        let features = colorModes.map(mode => {
            switch (mode) {
                case 'brightness':
                case 'color_temp':
                case 'hs':
                case 'xy':
                case 'rgb':
                case 'rgbw':
                case 'rgbww':
                    return 1;
                case 'unknown':
                case 'onoff':
                case 'white':
                default:
                    return 0;
            }
        });
        features = unique(features);
        return features.reduce((acc, val) => acc | val, 0);
    };
    const computeSupportedFeatures = (stateObj) => {
        if (!stateObj)
            return 0;
        const domain = g$1(stateObj.entity_id);
        switch (domain) {
            case 'light':
                return colorModesToSupportedFeatures(stateObj.attributes.supported_color_modes);
            default:
                return stateObj.attributes.supported_features || 0;
        }
    };

    const temperatureVariable = (stateObj, hass) => {
        const tempUnit = hass.config.unit_system.temperature;
        const isFahrenHeit = tempUnit.includes('F');
        return levelVariable({
            min: numericAttribute(stateObj, 'min_temp', isFahrenHeit ? 45 : 7),
            max: numericAttribute(stateObj, 'max_temp', isFahrenHeit ? 95 : 35),
            step: numericAttribute(stateObj, 'target_temp_step', isFahrenHeit ? 1 : 0.1),
            unit: tempUnit,
        });
    };
    const actionList = {
        alarm_control_panel: {
            alarm_disarm: {},
            alarm_arm_home: {
                supported_feature: 1,
            },
            alarm_arm_away: {
                supported_feature: 2,
            },
            alarm_arm_night: {
                supported_feature: 4,
            },
            alarm_arm_custom_bypass: {
                supported_feature: 16,
            },
        },
        automation: {
            turn_on: {},
            turn_off: {},
            trigger: {},
        },
        climate: {
            turn_off: {
                condition: stateObj => !listAttribute(stateObj, 'hvac_modes').includes('off'),
            },
            _turn_off: {
                service: 'set_hvac_mode',
                service_data: {
                    hvac_mode: 'off',
                },
                condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('off'),
            },
            set_temperature: {
                variables: {
                    temperature: {},
                },
                supported_feature: 1,
                condition: stateObj => !['heat', 'cool', 'heat_cool'].some(e => listAttribute(stateObj, 'hvac_modes').includes(e)),
            },
            heat: {
                service: 'set_temperature',
                service_data: {
                    hvac_mode: 'heat',
                },
                variables: {
                    temperature: {
                        template: temperatureVariable,
                    },
                },
                supported_feature: 1,
                condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('heat'),
            },
            cool: {
                service: 'set_temperature',
                service_data: {
                    hvac_mode: 'cool',
                },
                variables: {
                    temperature: {
                        template: temperatureVariable,
                    },
                },
                supported_feature: 1,
                condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('cool'),
            },
            regulate: {
                service: 'set_temperature',
                service_data: {
                    hvac_mode: 'heat_cool',
                },
                variables: {
                    target_temp_low: {
                        template: temperatureVariable,
                    },
                    target_temp_high: {
                        template: temperatureVariable,
                    },
                },
                supported_feature: 1,
                condition: stateObj => listAttribute(stateObj, 'hvac_modes').includes('heat_cool'),
            },
            set_mode: {
                service: 'set_hvac_mode',
                variables: {
                    hvac_mode: {
                        template: stateObj => {
                            const supportedFeatures = numericAttribute(stateObj, 'supported_features') || 0;
                            let modes = listAttribute(stateObj, 'hvac_modes');
                            if (supportedFeatures & 1)
                                modes = modes.filter(e => !['heat', 'cool', 'heat_cool', 'off'].includes(e));
                            return { options: modes };
                        },
                    },
                },
            },
            set_preset: {
                service: 'set_preset_mode',
                variables: {
                    preset_mode: {
                        options: 'preset_modes',
                    },
                },
                supported_feature: 16,
            },
            set_fan_mode: {
                service: 'set_fan_mode',
                variables: {
                    fan_mode: {
                        options: 'fan_modes',
                    },
                },
            },
        },
        cover: {
            close: {
                service: 'close_cover',
                supported_feature: 2,
            },
            open: {
                service: 'open_cover',
                supported_feature: 1,
            },
            set_position: {
                service: 'set_cover_position',
                variables: {
                    position: {
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%',
                    },
                },
                supported_feature: 4,
            },
            set_tilt_position: {
                service: 'set_cover_tilt_position',
                variables: {
                    tilt_position: {
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%',
                    },
                },
                supported_feature: 128,
            },
        },
        fan: {
            turn_on: {},
            turn_off: {},
            set_percentage: {
                service: 'set_percentage',
                variables: {
                    percentage: {
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%',
                    },
                },
                supported_feature: 1,
            },
            set_oscillation: {
                service: 'oscillate',
                variables: {
                    oscillating: {
                        options: ['True', 'False'],
                    },
                },
                supported_feature: 2,
            },
            set_direction: {
                variables: {
                    direction: {
                        options: ['forward', 'reverse'],
                    },
                },
                supported_feature: 4,
            },
            set_preset: {
                service: 'set_preset_mode',
                variables: {
                    preset_mode: {
                        options: 'preset_modes',
                    },
                },
                supported_feature: 8,
            },
        },
        humidifier: {
            turn_on: {},
            turn_off: {},
            set_humidity: {
                variables: {
                    humidity: {
                        min: 'min_humidity',
                        max: 'max_humidity',
                        step: 1,
                        unit: '%',
                    },
                },
            },
            set_mode: {
                variables: {
                    mode: {
                        options: 'available_modes',
                    },
                },
                supported_feature: 1,
            },
        },
        input_boolean: {
            turn_on: {},
            turn_off: {},
        },
        input_number: {
            set_value: {
                variables: {
                    value: {
                        min: 'min',
                        max: 'max',
                        step: 'step',
                        unit: 'unit_of_measurement',
                    },
                },
            },
        },
        input_select: {
            select_option: {
                variables: {
                    option: {
                        options: 'options',
                    },
                },
            },
        },
        light: {
            turn_on: {
                condition: stateObj => computeSupportedFeatures(stateObj) == 0,
            },
            _turn_on: {
                variables: {
                    brightness: {
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%',
                        scale_factor: 2.55,
                        optional: true,
                    },
                },
                condition: stateObj => computeSupportedFeatures(stateObj) != 0,
            },
            turn_off: {},
        },
        lock: {
            lock: {},
            unlock: {},
        },
        media_player: {
            turn_on: { supported_feature: 128 },
            turn_off: { supported_feature: 256 },
            select_source: {
                variables: {
                    source: {
                        options: 'source_list',
                    },
                },
                supported_feature: 2048,
            },
        },
        notify: {
            '{entity_id}': {
                variables: {
                    title: {},
                    message: {
                        multiline: true,
                    },
                },
            },
        },
        number: {
            set_value: {
                variables: {
                    value: {
                        min: 'min',
                        max: 'max',
                        step: 'step',
                    },
                },
            },
        },
        scene: {
            turn_on: {},
        },
        script: {
            turn_on: {},
            turn_off: {},
            '{entity_id}': {},
        },
        select: {
            select_option: {
                variables: {
                    option: {
                        options: 'options',
                    },
                },
            },
        },
        switch: {
            turn_on: {},
            turn_off: {},
        },
        vacuum: {
            turn_on: { supported_feature: 1 },
            start: {
                supported_feature: 8192,
            },
            play_pause: {
                supported_feature: 4,
            },
        },
        water_heater: {
            set_temperature: {
                variables: {
                    temperature: {
                        template: temperatureVariable,
                    },
                },
            },
            set_mode: {
                service: 'set_operation_mode',
                variables: {
                    operation_mode: {
                        options: 'operation_list',
                    },
                },
                supported_feature: 2,
            },
            set_away_mode: {
                variables: {
                    away_mode: {
                        options: ['on', 'off'],
                    },
                },
                supported_feature: 4,
            },
        },
    };

    function listVariable(...config) {
        //factory function to create ListVariable from configuration
        const commonOptions = config[0].options
            .map(e => e.value)
            .filter(option => config.map(e => e.options).every(list => list.map(e => e.value).includes(option)));
        const options = commonOptions.map(val => {
            const name = config
                .map(e => e.options.find(o => o.value == val))
                .filter(isDefined)
                .map(e => e.name)
                .filter(isDefined);
            const icon = config
                .map(e => e.options.find(o => o.value == val))
                .filter(isDefined)
                .map(e => e.icon)
                .filter(isDefined);
            let item = {
                value: val,
                name: name.length ? name.reduce((_acc, val) => val) : undefined,
                icon: icon.length ? icon.reduce((_acc, val) => val) : undefined,
            };
            return item;
        });
        const name = config.map(e => e.name).filter(isDefined);
        const variable = {
            type: EVariableType.List,
            name: name.length ? name.reduce((_acc, val) => val) : undefined,
            options: options,
        };
        return variable;
    }
    function listVariableDisplay(value, variable) {
        const option = variable.options.find(e => e.value == value);
        return option ? option.name || option.value : '';
    }

    function textVariable(...config) {
        //factory function to create ListVariable from configuration
        const name = config.map(e => e.name).filter(isDefined);
        const variable = {
            type: EVariableType.Text,
            name: name.length ? name.reduce((_acc, val) => val) : undefined,
            multiline: config.some(e => e.multiline),
        };
        return variable;
    }
    function textVariableDisplay(value, _variable) {
        return String(value);
    }

    const actionNamesList = {
        alarm_control_panel: {
            alarm_disarm: 'ui.card.alarm_control_panel.disarm',
            alarm_arm_home: 'ui.card.alarm_control_panel.arm_home',
            alarm_arm_away: 'ui.card.alarm_control_panel.arm_away',
            alarm_arm_night: 'ui.card.alarm_control_panel.arm_night',
            alarm_arm_custom_bypass: 'ui.card.alarm_control_panel.arm_custom_bypass',
        },
        automation: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
            trigger: 'ui.card.script.run',
        },
        climate: {
            turn_off: 'ui.card.vacuum.actions.turn_off',
            heat: 'services.climate.set_temperature_hvac_mode_heat',
            cool: 'services.climate.set_temperature_hvac_mode_cool',
            regulate: 'services.climate.set_temperature_hvac_mode_heat_cool',
            set_temperature: 'services.climate.set_temperature',
            set_mode: 'services.climate.set_hvac_mode',
            set_preset: 'services.climate.set_preset_mode',
            set_fan_mode: 'services.climate.set_fan_mode',
        },
        cover: {
            close: 'services.cover.close_cover',
            open: 'services.cover.open_cover',
            set_position: 'services.cover.set_cover_position',
            set_tilt: 'services.cover.set_cover_tilt_position',
        },
        fan: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
            set_speed: 'services.fan.set_speed',
            set_oscillation: 'services.fan.oscillate',
            set_direction: 'services.fan.set_direction',
            set_preset: 'services.climate.set_preset_mode',
        },
        humidifier: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
            set_humidity: 'services.humidifier.set_humidity',
            set_mode: 'services.humidifier.set_mode',
        },
        input_boolean: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
        },
        input_number: {
            set_value: 'services.input_number.set_value',
        },
        input_select: {
            select_option: 'services.input_select.select_option',
        },
        light: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
        },
        lock: {
            lock: 'ui.card.lock.lock',
            unlock: 'ui.card.lock.unlock',
        },
        media_player: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
            select_source: 'services.media_player.select_source',
        },
        notify: {
            '{entity_id}': 'services.notify.notify',
        },
        number: {
            set_value: 'services.input_number.set_value',
        },
        scene: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
        },
        script: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
            '{entity_id}': 'services.script.script',
        },
        select: {
            select_option: 'services.input_select.select_option',
        },
        switch: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            turn_off: 'ui.card.vacuum.actions.turn_off',
        },
        vacuum: {
            turn_on: 'ui.card.vacuum.actions.turn_on',
            start: 'ui.card.vacuum.start_cleaning',
            play_pause: 'services.vacuum.start_pause',
        },
        water_heater: {
            set_temperature: 'services.climate.set_temperature',
            set_mode: 'services.water_heater.set_operation_mode',
            set_away_mode: 'services.water_heater.set_away_mode',
        },
    };
    const actionName = (domain, action, hass) => {
        if (domain in actionNamesList && action in actionNamesList[domain]) {
            let item = actionNamesList[domain][action];
            if (item instanceof Function) {
                item = item(action);
            }
            return item.startsWith('services') ? localize(item, getLocale(hass)) : hass.localize(item);
        }
        return action;
    };

    const coverIcon$1 = (action, stateObj) => {
        const closedState = action == 'close';
        switch (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.device_class) {
            case 'garage':
                return closedState ? 'mdi:garage' : 'mdi:garage-open';
            case 'door':
                return closedState ? 'mdi:door-closed' : 'mdi:door-open';
            case 'blind':
                return closedState ? 'mdi:blinds' : 'mdi:blinds-open';
            case 'window':
                return closedState ? 'mdi:window-closed' : 'mdi:window-open';
            default:
                return closedState ? 'mdi:window-shutter' : 'mdi:window-shutter-open';
        }
    };
    const actionIcons = {
        alarm_control_panel: {
            alarm_disarm: 'mdi:lock-open-variant-outline',
            alarm_arm_home: 'mdi:home-outline',
            alarm_arm_away: 'mdi:exit-run',
            alarm_arm_night: 'mdi:power-sleep',
            alarm_arm_custom_bypass: 'mdi:shield-lock-outline',
        },
        automation: {
            turn_on: 'mdi:power',
            turn_off: 'mdi:power-off',
            trigger: 'mdi:play',
        },
        climate: {
            turn_off: 'mdi:power-off',
            heat: 'mdi:fire',
            cool: 'mdi:snowflake',
            regulate: 'mdi:thermometer',
            set_temperature: 'mdi:thermometer',
            set_mode: 'mdi:cog-transfer-outline',
            set_preset: 'mdi:cloud-download-outline',
            set_fan_mode: 'mdi:fan',
        },
        cover: {
            close: coverIcon$1,
            open: coverIcon$1,
            set_position: 'mdi:ray-vertex',
            set_tilt_position: 'mdi:valve',
        },
        fan: {
            turn_on: 'mdi:power',
            turn_off: 'mdi:power-off',
            set_percentage: 'mdi:weather-windy',
            set_oscillation: 'mdi:arrow-left-right',
            set_direction: 'mdi:cog-clockwise',
            set_preset_mode: 'mdi:cloud-download-outline',
        },
        humidifier: {
            turn_on: 'mdi:power',
            turn_off: 'mdi:power-off',
            set_humidity: 'mdi:water-percent',
            set_mode: 'mdi:cog-transfer-outline',
        },
        input_boolean: {
            turn_on: 'mdi:flash',
            turn_off: 'mdi:flash-off',
        },
        input_number: {
            set_value: 'mdi:counter',
        },
        input_select: {
            select_option: 'mdi:counter',
        },
        light: {
            turn_on: 'mdi:lightbulb',
            turn_off: 'mdi:lightbulb-off',
        },
        lock: {
            lock: 'mdi:lock-outline',
            unlock: 'mdi:lock-open-variant-outline',
        },
        media_player: {
            turn_on: 'mdi:power',
            turn_off: 'mdi:power-off',
            select_source: 'hass:music-box-multiple-outline',
        },
        notify: {
            '{entity_id}': 'mdi:message-alert',
        },
        number: {
            set_value: 'mdi:counter',
        },
        scene: {
            turn_on: 'mdi:play',
        },
        script: {
            turn_on: 'mdi:flash',
            turn_off: 'mdi:flash-off',
            '{entity_id}': 'mdi:play',
        },
        select: {
            select_option: 'mdi:counter',
        },
        switch: {
            turn_on: 'mdi:flash',
            turn_off: 'mdi:flash-off',
        },
        vacuum: {
            turn_on: 'mdi:power',
            start: 'mdi:play-circle-outline',
            play_pause: 'mdi:play-circule-outline',
        },
        water_heater: {
            set_temperature: 'mdi:thermometer',
            set_mode: 'mdi:cog-transfer-outline',
            set_away_mode: 'mdi:car-traction-control',
        },
    };
    const actionIcon = (domain, action, stateObj) => {
        if (domain in actionIcons && action in actionIcons[domain]) {
            let item = actionIcons[domain][action];
            if (item instanceof Function) {
                item = item(action, stateObj);
            }
            return item;
        }
        return DefaultActionIcon;
    };

    const variableList = {
        climate: {
            temperature: 'ui.card.weather.attributes.temperature',
            target_temp_low: 'ui.panel.lovelace.editor.card.generic.minimum',
            target_temp_high: 'ui.panel.lovelace.editor.card.generic.maximum',
            hvac_mode: 'ui.card.climate.operation',
            preset_mode: 'ui.card.climate.preset_mode',
            fan_mode: 'ui.card.climate.fan_mode',
        },
        cover: {
            position: 'ui.card.cover.position',
            tilt_position: 'ui.card.cover.tilt_position',
        },
        fan: {
            percentage: 'ui.card.fan.speed',
            oscillating: 'ui.card.fan.oscillate',
            direction: 'ui.card.fan.direction',
            preset_mode: 'ui.card.fan.preset_mode',
        },
        humidifier: {
            humidity: 'ui.card.humidifier.humidity',
            mode: 'ui.card.humidifier.mode',
        },
        input_number: {
            value: 'ui.panel.config.helpers.types.input_number',
        },
        input_select: {
            option: 'ui.components.dialogs.input_select.options',
        },
        light: {
            brightness: 'ui.card.light.brightness',
        },
        media_player: {
            source: 'ui.card.media_player.source',
        },
        notify: {
            title: 'ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title',
            message: 'ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message',
        },
        number: {
            value: 'ui.panel.config.helpers.types.input_number',
        },
        select: {
            option: 'ui.components.dialogs.input_select.options',
        },
        water_heater: {
            temperature: 'ui.card.weather.attributes.temperature',
            operation_mode: 'ui.card.water_heater.operation',
            away_mode: 'ui.card.water_heater.away_mode',
        },
    };
    const getVariableName = (domain, variable, hass) => {
        if (domain in variableList && variable in variableList[domain]) {
            return hass.localize(variableList[domain][variable]);
        }
        return variable;
    };

    const variableOptions = {
        climate: {
            hvac_mode: {
                off: 'component.climate.state._.off',
                heat: 'component.climate.state._.heat',
                cool: 'component.climate.state._.cool',
                heat_cool: 'component.climate.state._.heat_cool',
                dry: 'component.climate.state._.dry',
                fan_only: 'component.climate.state._.fan_only',
            },
            preset_mode: {
                activity: 'state_attributes.climate.preset_mode.activity',
                away: 'state_attributes.climate.preset_mode.away',
                boost: 'state_attributes.climate.preset_mode.boost',
                comfort: 'state_attributes.climate.preset_mode.comfort',
                eco: 'state_attributes.climate.preset_mode.eco',
                home: 'state_attributes.climate.preset_mode.home',
                none: 'state_attributes.climate.preset_mode.none',
                sleep: 'state_attributes.climate.preset_mode.sleep',
            },
        },
        fan: {
            direction: {
                forward: 'ui.card.fan.forward',
                reverse: 'ui.card.fan.reverse',
            },
            oscillating: {
                True: 'state.default.on',
                False: 'state.default.off',
            },
        },
        humidifier: {
            mode: {
                auto: 'state_attributes.humidifier.mode.auto',
                away: 'state_attributes.humidifier.mode.away',
                baby: 'state_attributes.humidifier.mode.baby',
                boost: 'state_attributes.humidifier.mode.boost',
                comfort: 'state_attributes.humidifier.mode.comfort',
                eco: 'state_attributes.humidifier.mode.eco',
                home: 'state_attributes.humidifier.mode.home',
                normal: 'state_attributes.humidifier.mode.normal',
                sleep: 'state_attributes.humidifier.mode.sleep',
            },
        },
        water_heater: {
            operation_mode: {
                off: 'component.water_heater.state._.off',
                eco: 'component.water_heater.state._.eco',
                electric: 'component.water_heater.state._.electric',
                gas: 'component.water_heater.state._.gas',
                heat_pump: 'component.water_heater.state._.heat_pump',
                high_demand: 'component.water_heater.state._.high_demand',
                performance: 'component.water_heater.state._.performance',
            },
            away_mode: {
                on: 'state.default.on',
                off: 'state.default.off',
            },
        },
    };
    const getVariableOptions = (domain, variable) => {
        if (domain in variableOptions && variable in variableOptions[domain])
            return Object.keys(variableOptions[domain][variable]);
        return [];
    };
    const getVariableOptionName = (domain, variable, option, hass) => {
        if (domain in variableOptions && variable in variableOptions[domain] && option in variableOptions[domain][variable])
            return hass.localize(variableOptions[domain][variable][option]);
        return option;
    };

    const actionIcons$1 = {
        climate: {
            hvac_mode: {
                off: 'mdi:power-off',
                heat: 'mdi:fire',
                cool: 'mdi:snowflake',
                heat_cool: 'mdi:thermometer',
                auto: 'mdi:autorenew',
                dry: 'mdi:water-percent',
                fan_only: 'mdi:fan',
            },
            preset_mode: {
                activity: 'mdi:account-alert-outline',
                away: 'mdi:car-traction-control',
                boost: 'mdi:rocket-launch-outline',
                comfort: 'mdi:car-seat-cooler',
                eco: 'mdi:leaf',
                home: 'mdi:home-outline',
                none: 'mdi:cancel',
                sleep: 'mdi:sleep',
            },
        },
        fan: {
            direction: {
                forward: 'mdi:autorenew',
                reverse: 'mdi:sync',
            },
            oscillating: {
                True: 'mdi:toggle-switch-outline',
                False: 'mdi:toggle-switch-off-outline',
            },
        },
        humidifier: {
            mode: {
                auto: 'mdi:autorenew',
                away: 'mdi:car-traction-control',
                baby: 'mdi:baby-bottle-outline',
                boost: 'mdi:rocket-launch-outline',
                comfort: 'mdi:car-seat-cooler',
                eco: 'mdi:leaf',
                home: 'mdi:home-outline',
                normal: 'mdi:account-outline',
                sleep: 'mdi:sleep',
            },
        },
        water_heater: {
            operation_mode: {
                off: 'mdi:power-off',
                eco: 'mdi:leaf',
                electric: 'mdi:lightning-bolt',
                gas: 'mdi:fire',
                heat_pump: 'mdi:hvac',
                high_demand: 'mdi:water-plus-outline',
                performance: 'mdi:rocket-launch-outline',
            },
            away_mode: {
                on: 'mdi:toggle-switch-outline',
                off: 'mdi:toggle-switch-off-outline',
            },
        },
    };
    const getVariableOptionIcon = (domain, variable, option) => {
        if (domain in actionIcons$1 && variable in actionIcons$1[domain] && option in actionIcons$1[domain][variable])
            return actionIcons$1[domain][variable][option];
        return;
    };

    function computeVariables(variables) {
        if (!Object.keys(variables || {}).length)
            return undefined;
        return Object.entries(variables)
            .map(([field, variable]) => {
            if ('options' in variable) {
                return [field, listVariable(variable)];
            }
            else if ('min' in variable || 'max' in variable) {
                return [field, levelVariable(variable)];
            }
            else {
                return [field, textVariable(variable)];
            }
        })
            .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key]: val }) : obj), {});
    }

    function computeMergedVariable(...variables) {
        const types = unique(variables.map(e => e.type).filter(isDefined));
        if (!types.length) {
            variables = Object.values(computeVariables(Object.assign({}, ...variables)));
            return computeMergedVariable(...variables);
        }
        if (types.length > 1)
            return undefined;
        if (types[0] == EVariableType.Level) {
            return levelVariable(...variables);
        }
        else if (types[0] == EVariableType.List) {
            return listVariable(...variables);
        }
        else
            return textVariable(...variables);
    }

    function computeCommonActions(actionLists) {
        //calculate actions that are in common for all
        if (actionLists.length == 1)
            return actionLists[0];
        let commonActions = actionLists[0].filter(action => actionLists.slice(1).every(list => list.some(e => compareActions(action, e))));
        commonActions = commonActions
            .map(action => {
            const mergedVariables = Object.entries(action.variables || {})
                .map(([field, variable]) => {
                //compute action per entity
                const actions = actionLists.map(e => e.find(k => compareActions(k, action)));
                //remove the variable if it is not in common
                if (!actions.every(e => e && e.variables && field in e.variables)) {
                    return [field, undefined];
                }
                const variables = actions.map(e => e.variables[field]);
                if (!variables.every(e => variable.type == e.type))
                    return [field, undefined];
                //compute intersection of variables
                return [field, computeMergedVariable(...variables)];
            })
                .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key]: val }) : obj), {});
            if (Object.values(mergedVariables).find(e => e.type == EVariableType.List && !e.options.length))
                return undefined;
            action = Object.assign(Object.assign({}, action), { variables: mergedVariables });
            return action;
        })
            .filter(isDefined);
        return commonActions;
    }

    function groupActions(hass, entity, entityActions) {
        const entities = entity && entity.attributes.entity_id && Array.isArray(entity.attributes.entity_id)
            ? entity.attributes.entity_id
            : [];
        entityActions = entityActions.map((actions, i) => {
            //filter by supported_features
            const stateObj = hass.states[entities[i]];
            const supportedFeatures = computeSupportedFeatures(stateObj);
            actions = actions
                .filter(e => !e.supported_feature || e.supported_feature & supportedFeatures)
                .map(action => omit(action, 'supported_feature'));
            return actions;
        });
        //find matches
        const mixedDomains = [...new Set(entities.map(e => g$1(e)))].length > 1;
        if (mixedDomains) {
            entityActions = entityActions.map(actionList => {
                return actionList.map(action => {
                    if (b$1(action.service) == 'turn_on' || b$1(action.service) == 'turn_off') {
                        return Object.assign(Object.assign({}, action), { service: 'homeassistant' + '.' + b$1(action.service), icon: b$1(action.service) == 'turn_on' ? 'flash' : 'flash-off' });
                    }
                    return action;
                });
            });
        }
        if (!entityActions.length)
            return [];
        const commonActions = computeCommonActions(entityActions);
        return commonActions;
    }
    const groupStates = (_hass, _stateObj, entityStates) => {
        if (!entityStates.length)
            return null;
        if (!entityStates.every(e => e.type == entityStates[0].type))
            return null;
        if (entityStates[0].type == EVariableType.List)
            return listVariable(...entityStates);
        else if (entityStates[0].type == EVariableType.Level)
            return levelVariable(...entityStates);
        else
            return null;
    };

    const standardActions = (entity_id, hass, filterCapabilities = true) => {
        const domain = g$1(entity_id);
        if (domain == 'group') {
            const stateObj = hass.states[entity_id];
            const subEntities = listAttribute(stateObj, 'entity_id');
            if (!subEntities.length)
                return [];
            const subActions = subEntities.map(e => standardActions(e, hass, filterCapabilities));
            return groupActions(hass, stateObj, subActions);
        }
        //not supported by standard configuration
        if (!Object.keys(actionList).includes(domain))
            return [];
        return Object.entries(actionList[domain])
            .map(([id, config]) => parseAction(id, config, entity_id, hass, filterCapabilities))
            .filter(isDefined);
    };
    const parseAction = (id, config, entity_id, hass, filterCapabilities) => {
        const domain = g$1(entity_id);
        const stateObj = hass.states[entity_id];
        if (config.condition && !config.condition(stateObj))
            return;
        if (id.startsWith('_'))
            id = id = id.substring(1);
        let action = {
            name: '',
            icon: DefaultActionIcon,
            service: config.service ? `${domain}.${config.service}` : `${domain}.${id}`,
            service_data: config.service_data,
        };
        if (config.supported_feature) {
            const supportedFeature = config.supported_feature instanceof Function ? config.supported_feature(stateObj) : config.supported_feature;
            action = Object.assign(Object.assign({}, action), { supported_feature: supportedFeature });
        }
        action = Object.assign(Object.assign({}, action), { name: actionName(domain, id, hass), icon: actionIcon(domain, id, stateObj) });
        Object.keys(config.variables || {}).forEach(key => {
            action = Object.assign(Object.assign({}, action), { variables: Object.assign(Object.assign({}, action.variables), { [key]: parseActionVariable(domain, key, config.variables[key], stateObj, hass, filterCapabilities) }) });
        });
        //strip actions having no selectable options
        if (Object.values(action.variables || {}).some(e => e.type == EVariableType.List && !e.options.length))
            return;
        //insert entity ID for services notify / script
        const match = action.service.match(/^[a-z_]+\.(\{entity_id\})$/);
        if (match)
            action = Object.assign(Object.assign({}, action), { service: action.service.replace(match[1], b$1(entity_id)) });
        return action;
    };
    const parseActionVariable = (domain, variable, variableConfig, stateObj, hass, filterCapabilities) => {
        let config = parseVariable(variableConfig, stateObj, hass);
        config = Object.assign(Object.assign({}, config), { name: getVariableName(domain, variable, hass) });
        if ('options' in config && isDefined(config.options)) {
            let options = [...config.options];
            if (!filterCapabilities) {
                const extraOptions = getVariableOptions(domain, variable).filter(k => !options.map(e => e.value).includes(k));
                options = [...options, ...extraOptions.map(e => Object({ value: e }))];
            }
            options = options.map(e => Object.assign(e, {
                name: e.name ? e.name : getVariableOptionName(domain, variable, e.value, hass),
                icon: e.icon ? e.icon : getVariableOptionIcon(domain, variable, e.value),
            }));
            config = Object.assign(Object.assign({}, config), { options: options });
            return listVariable(config);
        }
        else if ('min' in config && isDefined(config.min) && 'max' in config && isDefined(config.max)) {
            return levelVariable(config);
        }
        else {
            return textVariable(config);
        }
    };

    const wildcardPattern = /\{[^\}]+\}/g;
    const parameterPattern = /\[([^\]]+)\]/;
    function computeActionDisplay(action) {
        let name = action.name;
        if (!name)
            name = PrettyPrintName(b$1(action.service));
        const res = name.match(parameterPattern);
        if (res) {
            let replacement = res[1];
            const matches = res[1].match(wildcardPattern);
            if (matches &&
                matches.length &&
                matches.every(wildcard => {
                    const field = wildcard.substring(1, wildcard.length - 1);
                    if (!Object.keys(action.service_data || {}).includes(field))
                        return false;
                    let value = '';
                    if (Object.keys(action.variables || {}).includes(field)) {
                        if (action.variables[field].type == EVariableType.Level)
                            value = levelVariableDisplay(action.service_data[field], action.variables[field]);
                        else if (action.variables[field].type == EVariableType.List)
                            value = listVariableDisplay(action.service_data[field], action.variables[field]);
                        else
                            value = textVariableDisplay(action.service_data[field], action.variables[field]);
                    }
                    else {
                        value = action.service_data[field];
                    }
                    replacement = replacement.replace(wildcard, value);
                    return true;
                })) {
                return name.replace(res[0], replacement);
            }
            else {
                return name.replace(res[0], '');
            }
        }
        return name || '';
    }

    function parseString(str) {
        return str
            .replace(/_/g, ' ')
            .trim()
            .toLowerCase();
    }
    function computeActions(entity_id, hass, config) {
        if (Array.isArray(entity_id)) {
            let actions = entity_id.map(e => computeActions(e, hass, config));
            return computeCommonActions(actions);
        }
        const stateObj = hass.states[entity_id];
        //fetch standard actions for entity
        let actions = config.standard_configuration ? standardActions(entity_id, hass) : [];
        //get excluded actions for entity
        const excludedActions = flatten(Object.entries(config.customize)
            .filter(([a]) => matchPattern(a, entity_id))
            .sort((a, b) => b[0].length - a[0].length)
            .map(([, b]) => b.exclude_actions)
            .filter(isDefined));
        if (excludedActions.length) {
            actions = actions.filter(e => !excludedActions.some(a => parseString(computeActionDisplay(e)).includes(a)));
        }
        //get customizations for entity
        const customizedActions = flatten(Object.entries(config.customize)
            .filter(([a]) => matchPattern(a, entity_id))
            .sort((a, b) => b[0].length - a[0].length)
            .map(([, b]) => b.actions)
            .filter(isDefined));
        if (customizedActions.length) {
            customizedActions.forEach(action => {
                //ensure services have domain prefixed
                if (!g$1(action.service).length)
                    action = Object.assign(Object.assign({}, action), { service: g$1(entity_id) + '.' + b$1(action.service) });
                //ensure service call has no entity_id
                if (action.service_data)
                    action = Object.assign(Object.assign({}, action), { service_data: omit(action.service_data, 'entity_id') });
                let res = actions.findIndex(e => compareActions(e, action));
                if (res < 0) {
                    //try to find it in unfiltered list of built-in actions
                    let allActions = config.standard_configuration ? standardActions(entity_id, hass, false) : [];
                    const match = allActions.find(e => compareActions(e, action));
                    if (match) {
                        actions = [...actions, match];
                        res = actions.length - 1;
                    }
                }
                if (res >= 0) {
                    //standard action should be overwritten
                    Object.assign(actions, {
                        [res]: Object.assign(Object.assign({}, actions[res]), omit(action, 'variables')),
                    });
                    if (Object.keys(action.variables || {}).length) {
                        let variableConfig = actions[res].variables || {};
                        //merge variable config
                        variableConfig = Object.entries(variableConfig)
                            .map(([field, variable]) => {
                            return Object.keys(action.variables).includes(field)
                                ? [field, Object.assign(Object.assign({}, variable), action.variables[field])]
                                : [field, action.variables[field]];
                        })
                            .reduce((obj, [key, val]) => (val ? Object.assign(obj, { [key]: val }) : obj), {});
                        //add new variables
                        const newVariables = Object.keys(action.variables).filter(e => !Object.keys(variableConfig).includes(e));
                        variableConfig = Object.assign(Object.assign({}, variableConfig), computeVariables(pick(action.variables, newVariables)));
                        Object.assign(actions, {
                            [res]: Object.assign(Object.assign({}, actions[res]), { variables: variableConfig }),
                        });
                    }
                }
                else {
                    //add a new action
                    action = Object.assign(Object.assign({}, action), { variables: computeVariables(action.variables) });
                    actions.push(action);
                }
            });
        }
        //filter by supported_features
        const supportedFeatures = computeSupportedFeatures(stateObj);
        actions = actions.filter(e => !e.supported_feature || e.supported_feature & supportedFeatures);
        //list variable with 1 option is not really a variable
        actions = actions.map(action => {
            if (Object.keys(action.variables || {}).length) {
                Object.keys(action.variables).forEach(field => {
                    if (action.variables[field].type == EVariableType.List &&
                        action.variables[field].options.length == 1) {
                        action = Object.assign(Object.assign({}, action), { service_data: Object.assign(Object.assign({}, action.service_data), { [field]: action.variables[field].options[0].value }), variables: omit(action.variables, field) });
                    }
                });
            }
            return action;
        });
        return actions;
    }

    function importAction(action, hass) {
        const id = action.entity_id || action.service;
        const service = action.service;
        const serviceData = action.service_data || {};
        const serviceArgs = Object.keys(serviceData);
        let actions = standardActions(id, hass, false);
        let matches = actions.filter(e => compareActions(action, e, true));
        if (matches.length == 1)
            actions = matches;
        else {
            //only find actions with matching service name
            actions = actions.filter(e => e.service == service);
            // if action has a fixed argument, it should be provided to be a match
            actions = actions.filter(e => Object.keys(e.service_data || {}).every(k => serviceArgs.includes(k)));
        }
        if (actions.length > 1) {
            //the match is ambiguous, check service_data to find the action with best overlap
            actions.sort((a, b) => {
                const fixedArgsOverlapA = Object.entries(a.service_data || {})
                    .map(([k, v]) => (k in serviceData ? (serviceData[k] == v ? 1 : -1) : 0))
                    .reduce((sum, e) => sum + e, 0);
                const fixedArgsOverlapB = Object.entries(b.service_data || {})
                    .map(([k, v]) => (k in serviceData ? (serviceData[k] == v ? 1 : -1) : 0))
                    .reduce((sum, e) => sum + e, 0);
                //if one of the services has more fixed serviceArgs in common, it is preferred
                if (fixedArgsOverlapA > fixedArgsOverlapB)
                    return -1;
                if (fixedArgsOverlapA < fixedArgsOverlapB)
                    return 1;
                const serviceDataA = unique([...Object.keys(a.service_data || {}), ...Object.keys(a.variables || {})]);
                const serviceDataB = unique([...Object.keys(b.service_data || {}), ...Object.keys(b.variables || {})]);
                const overlapA = serviceArgs.filter(e => serviceDataA.includes(e)).length;
                const overlapB = serviceArgs.filter(e => serviceDataB.includes(e)).length;
                //if one of the services has more variable serviceArgs in common, it is preferred
                if (overlapA > overlapB)
                    return -1;
                if (overlapA < overlapB)
                    return 1;
                const extraKeysA = serviceDataA.filter(e => !serviceArgs.includes(e)).length;
                const extraKeysB = serviceDataB.filter(e => !serviceArgs.includes(e)).length;
                //if one of the services has less extra serviceArgs, it is preferred
                if (extraKeysA > extraKeysB)
                    return 1;
                if (extraKeysA < extraKeysB)
                    return -1;
                return 0;
            });
        }
        if (actions.length) {
            // add option to the list if it is not existing
            let variables = Object.assign({}, (actions[0].variables || {}));
            Object.entries(serviceData).forEach(([key, val]) => {
                if (!Object.keys(variables || {}).includes(key))
                    return;
                if (variables[key].type != EVariableType.List)
                    return;
                variables = Object.assign(Object.assign({}, variables), { [key]: variables[key].options.some(e => e.value == val)
                        ? variables[key]
                        : Object.assign(Object.assign({}, variables[key]), { options: [...variables[key].options, { value: val }] }) });
            });
            return Object.assign(Object.assign({}, actions[0]), { service_data: Object.assign(Object.assign({}, (actions[0].service_data || {})), serviceData), variables: variables });
        }
        else {
            //unknown action, add from config
            return {
                service: service,
                service_data: action.service_data,
            };
        }
    }

    function parseEntity(entity_id, hass, config) {
        const stateObj = entity_id in hass.states ? hass.states[entity_id] : undefined;
        let entity = {
            id: entity_id,
            name: stateObj ? stateObj.attributes.friendly_name || b$1(entity_id) : DeadEntityName,
            icon: stateObj ? stateObj.attributes.icon : DeadEntityIcon,
        };
        if (!stateObj && g$1(entity_id) == NotifyDomain) {
            let name = b$1(entity_id);
            let icon = standardIcon(entity_id, hass);
            if (name.includes('mobile_app_')) {
                name = name.split('mobile_app_').pop();
                if (`device_tracker.${name}` in hass.states) {
                    const deviceTracker = hass.states[`device_tracker.${name}`];
                    name = deviceTracker.attributes.friendly_name || name;
                    icon = 'hass:cellphone-text';
                }
            }
            entity = Object.assign(Object.assign({}, entity), { name: name, icon: icon });
        }
        if ((config.standard_configuration === undefined || config.standard_configuration) && !entity.icon) {
            entity = Object.assign(Object.assign({}, entity), { icon: standardIcon(entity_id, hass) });
        }
        else if (!entity.icon) {
            entity = Object.assign(Object.assign({}, entity), { icon: DefaultEntityIcon });
        }
        if (config.customize) {
            const customize = Object.entries(config.customize)
                .filter(([pattern]) => matchPattern(pattern, entity.id))
                .sort((a, b) => b[0].length - a[0].length)
                .map(([, v]) => v)
                .forEach(el => {
                entity = Object.assign(Object.assign({}, entity), pick(el, ['name', 'icon']));
            });
        }
        return entity;
    }

    const weekdayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const formatWeekday = (date, locale, short) => {
        const supportLocaleString = () => {
            try {
                new Date().toLocaleDateString('i');
            }
            catch (e) {
                return e.name === 'RangeError';
            }
            return false;
        };
        if (typeof date !== 'object') {
            let _date = new Date(2017, 1, 26);
            _date.setDate(_date.getDate() + date);
            date = _date;
        }
        if (supportLocaleString()) {
            return date.toLocaleDateString(locale.language, {
                weekday: short ? 'short' : 'long',
            });
        }
        else {
            const weekday = date.getDay();
            return short ? weekdayArray[weekday].substr(0, 3) : weekdayArray[weekday];
        }
    };

    function weekdayToList(weekday) {
        let list = weekday
            .map(e => {
            switch (e) {
                case 'mon':
                    return 1;
                case 'tue':
                    return 2;
                case 'wed':
                    return 3;
                case 'thu':
                    return 4;
                case 'fri':
                    return 5;
                case 'sat':
                    return 6;
                case 'sun':
                    return 7;
                default:
                    return;
            }
        })
            .filter(e => e);
        return list;
    }

    function weekdayType(weekday) {
        if (weekday.includes('daily'))
            return EDayType.Daily;
        if (weekday.includes('workday'))
            return EDayType.Workday;
        if (weekday.includes('weekend'))
            return EDayType.Weekend;
        return EDayType.Custom;
    }

    const computeDaysDisplay = (weekdays, hass) => {
        function findSequence(list) {
            const len = [];
            for (let i = 0; i < list.length - 1; i++) {
                let j = i + 1;
                while (list[j] - list[j - 1] == 1)
                    j++;
                len.push(j - i);
            }
            return len;
        }
        if (!hass)
            return '';
        switch (weekdayType(weekdays)) {
            case EDayType.Daily:
                return localize('ui.components.date.day_types_long.daily', getLocale(hass));
            case EDayType.Workday:
                return localize('ui.components.date.day_types_long.workdays', getLocale(hass));
            case EDayType.Weekend:
                return localize('ui.components.date.day_types_long.weekend', getLocale(hass));
            case EDayType.Custom:
                const list = weekdayToList(weekdays);
                const seq = findSequence(list);
                const len = Math.max(...seq);
                if (list.length == 6) {
                    const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !list.includes(e));
                    return localize('ui.components.date.repeated_days_except', getLocale(hass), '{excludedDays}', formatWeekday(missing.pop(), getLocale(hass)));
                }
                const dayNames = list.map(e => formatWeekday(e, getLocale(hass)));
                if (list.length >= 3 && len >= 3) {
                    const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
                    dayNames.splice(start, len, localize('ui.components.date.days_range', getLocale(hass), ['{startDay}', '{endDay}'], [dayNames[start], dayNames[start + len - 1]]));
                }
                const daysString = dayNames.length > 1
                    ? `${dayNames.slice(0, -1).join(', ')} ${hass.localize('ui.common.and')} ${dayNames.pop()}`
                    : `${dayNames.pop()}`;
                return localize('ui.components.date.repeated_days', getLocale(hass), '{days}', daysString);
            default:
                return '';
        }
    };

    var TimeFormat;
    (function (TimeFormat) {
        TimeFormat["language"] = "language";
        TimeFormat["system"] = "system";
        TimeFormat["am_pm"] = "12";
        TimeFormat["twenty_four"] = "24";
    })(TimeFormat || (TimeFormat = {}));
    const formatAmPm = (locale) => {
        if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
            const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
            const test = new Date().toLocaleString(testLanguage);
            return test.includes('AM') || test.includes('PM');
        }
        return locale.time_format === TimeFormat.am_pm;
    };
    function formatTime(dateObj, locale, formatOption) {
        const supportLocaleString = () => {
            try {
                new Date().toLocaleTimeString('i');
            }
            catch (e) {
                return e.name === 'RangeError';
            }
            return false;
        };
        if (formatOption === TimeFormat.am_pm || (!formatOption && locale.time_format === TimeFormat.am_pm)) {
            return format(dateObj, 'h:mm A'); // '5:30 AM'
        }
        if (formatOption === TimeFormat.twenty_four || (!formatOption && locale.time_format === TimeFormat.twenty_four)) {
            return format(dateObj, 'shortTime'); // '05:30'
        }
        if (supportLocaleString()) {
            return dateObj.toLocaleTimeString(locale.language, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: formatAmPm(locale),
            });
        }
        return formatAmPm(locale)
            ? formatTime(dateObj, locale, TimeFormat.am_pm)
            : formatTime(dateObj, locale, TimeFormat.twenty_four);
    }

    function stringToDate(dateTimeString) {
        let date = new Date();
        const dateMatch = (dateTimeString || '').match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
        if (dateMatch !== null)
            date.setFullYear(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
        const timeMatch = (dateTimeString || '').match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);
        if (timeMatch !== null)
            date.setHours(Number(timeMatch[1]), Number(timeMatch[2]), timeMatch.length > 4 ? Number(timeMatch[4]) : date.getSeconds());
        return date;
    }

    const computeTimeDisplay = (entry, hass) => {
        const computeRelativeTimeString = (timeString) => {
            const res = parseRelativeTime(timeString);
            if (!res)
                return timeString;
            const eventString = res.event == ETimeEvent.Sunrise
                ? hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').toLowerCase()
                : hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset').toLowerCase();
            if (Math.abs(stringToTime(res.offset, hass)) < 5 * 60)
                return localize('ui.components.time.at_sun_event', getLocale(hass), '{sunEvent}', eventString);
            const signString = res.sign == '-'
                ? hass
                    .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
                    .slice(0, -1)
                    .toLowerCase()
                : hass
                    .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
                    .slice(0, -1)
                    .toLowerCase();
            const timeStr = formatTime(stringToDate(res.offset), getLocale(hass), f$1.twenty_four);
            return `${timeStr} ${signString} ${eventString}`;
        };
        if (!entry.stop) {
            const timeString = entry.start;
            if (parseRelativeTime(timeString))
                return computeRelativeTimeString(timeString);
            else {
                const time = stringToDate(timeString);
                return localize('ui.components.time.absolute', getLocale(hass), '{time}', formatTime(time, getLocale(hass)));
            }
        }
        else {
            const start = parseRelativeTime(entry.start)
                ? computeRelativeTimeString(entry.start)
                : formatTime(stringToDate(entry.start), getLocale(hass));
            const end = parseRelativeTime(entry.stop)
                ? computeRelativeTimeString(entry.stop)
                : formatTime(stringToDate(entry.stop), getLocale(hass));
            return localize('ui.components.time.interval', getLocale(hass), ['{startTime}', '{endTime}'], [start, end]);
        }
    };

    const computeScheduleHeader = (schedule, config, hass) => {
        const primaryInfo = AsArray(!config.display_options || !config.display_options.primary_info
            ? '{entity}: {action}'
            : config.display_options.primary_info);
        return primaryInfo.map(e => computeItemDisplay(e, schedule, config, hass));
    };
    const computeScheduleInfo = (schedule, config, hass) => {
        const primaryInfo = AsArray(!config.display_options || !config.display_options.secondary_info
            ? ['relative-time', 'additional-tasks']
            : config.display_options.secondary_info);
        return primaryInfo.map(e => computeItemDisplay(e, schedule, config, hass));
    };
    const computeScheduleIcon = (schedule, config, hass) => {
        if (config.display_options && config.display_options.icon && config.display_options.icon == 'entity') {
            const entities = computeEntities(schedule, config, hass);
            return unique(entities.map(e => e.icon)).length == 1 ? entities[0].icon : standardIcon(entities[0].id, hass);
        }
        else {
            const action = computeAction(schedule, config, hass);
            return action.icon;
        }
    };
    const computeItemDisplay = (displayItem, schedule, config, hass) => {
        switch (displayItem) {
            case 'default':
                return (computeItemDisplay('name', schedule, config, hass) ||
                    `${computeItemDisplay('entity', schedule, config, hass)}: ${computeItemDisplay('action', schedule, config, hass)}`);
            case 'name':
                return schedule.name || '';
            case 'relative-time':
                return `<my-relative-time></my-relative-time>`;
            case 'additional-tasks':
                return schedule.timeslots.length > 1
                    ? '+' +
                        localize('ui.panel.overview.additional_tasks', getLocale(hass), '{number}', String(schedule.timeslots.length - 1))
                    : '';
            case 'time':
                return capitalize(computeTimeDisplay(schedule.timeslots[schedule.next_entries[0]], hass));
            case 'days':
                return capitalize(computeDaysDisplay(schedule.weekdays, hass));
            case 'entity':
                const entities = computeEntities(schedule, config, hass);
                const entityDomains = unique(entities.map(e => g$1(e.id)));
                return entities.length == 1
                    ? capitalize(PrettyPrintName(entities[0].name || ''))
                    : entityDomains.length == 1
                        ? `${entities.length}x ${localize(`domains.${entityDomains[0]}`, getLocale(hass)) || entityDomains[0]}`
                        : `${entities.length}x entities`;
            case 'action':
                const action = computeAction(schedule, config, hass);
                return capitalize(computeActionDisplay(action));
            case 'tags':
                return (schedule.tags || []).map(e => `<tag>${e}</tag>`).join('');
            default:
                const regex = /\{([^\}]+)\}/;
                let res;
                while ((res = regex.exec(displayItem))) {
                    displayItem = displayItem.replace(res[0], String(computeItemDisplay(String(res[1]), schedule, config, hass)));
                }
                return displayItem;
        }
    };
    const computeAction = (schedule, config, hass) => {
        const nextEntry = schedule.timeslots[schedule.next_entries[0]];
        const match = computeActions(nextEntry.actions[0].entity_id || nextEntry.actions[0].service, hass, config)
            .filter(e => compareActions(e, nextEntry.actions[0], true))
            .reduce((_acc, e) => e, undefined);
        return match
            ? Object.assign(Object.assign({}, match), { service_data: Object.assign(Object.assign({}, match.service_data), Object.entries(nextEntry.actions[0].service_data || {})
                    .filter(([k]) => Object.keys(match.variables || {}).includes(k))
                    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})) }) : importAction(nextEntry.actions[0], hass);
    };
    const computeEntities = (schedule, config, hass) => {
        const nextEntry = schedule.timeslots[schedule.next_entries[0]];
        const entities = unique(nextEntry.actions.map(e => e.entity_id || e.service)).map(e => parseEntity(e, hass, config));
        return entities;
    };

    function formatDate(dateObj, locale, isoFormat) {
        const isCurrentYear = dateObj.getFullYear() == new Date().getFullYear();
        const supportLocaleDateString = () => {
            try {
                new Date().toLocaleDateString('i');
            }
            catch (e) {
                return e.name === 'RangeError';
            }
            return false;
        };
        if (isoFormat)
            return format(dateObj, 'isoDate');
        if (isCurrentYear) {
            if (supportLocaleDateString()) {
                return new Intl.DateTimeFormat(locale.language, {
                    month: 'long',
                    day: 'numeric',
                }).format(dateObj);
            }
            else
                return format(dateObj, 'MMMM D');
        }
        else {
            if (supportLocaleDateString()) {
                return new Intl.DateTimeFormat(locale.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(dateObj);
            }
            else
                return format(dateObj, 'MMMM D, YYYY');
        }
    }

    var __assign = (window && window.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var MS_PER_SECOND = 1e3;
    var SECS_PER_MIN = 60;
    var SECS_PER_HOUR = SECS_PER_MIN * 60;
    var SECS_PER_DAY = SECS_PER_HOUR * 24;
    var SECS_PER_WEEK = SECS_PER_DAY * 7;
    function selectUnit(from, to, thresholds) {
        if (to === void 0) { to = Date.now(); }
        if (thresholds === void 0) { thresholds = {}; }
        var resolvedThresholds = __assign(__assign({}, DEFAULT_THRESHOLDS), (thresholds || {}));
        var secs = (+from - +to) / MS_PER_SECOND;
        if (Math.abs(secs) < resolvedThresholds.second) {
            return {
                value: Math.round(secs),
                unit: 'second',
            };
        }
        var mins = secs / SECS_PER_MIN;
        if (Math.abs(mins) < resolvedThresholds.minute) {
            return {
                value: Math.round(mins),
                unit: 'minute',
            };
        }
        var hours = secs / SECS_PER_HOUR;
        if (Math.abs(hours) < resolvedThresholds.hour) {
            return {
                value: Math.round(hours),
                unit: 'hour',
            };
        }
        var days = secs / SECS_PER_DAY;
        if (Math.abs(days) < resolvedThresholds.day) {
            return {
                value: Math.round(days),
                unit: 'day',
            };
        }
        var fromDate = new Date(from);
        var toDate = new Date(to);
        var years = fromDate.getFullYear() - toDate.getFullYear();
        if (Math.round(Math.abs(years)) > 0) {
            return {
                value: Math.round(years),
                unit: 'year',
            };
        }
        var months = years * 12 + fromDate.getMonth() - toDate.getMonth();
        if (Math.round(Math.abs(months)) > 0) {
            return {
                value: Math.round(months),
                unit: 'month',
            };
        }
        var weeks = secs / SECS_PER_WEEK;
        return {
            value: Math.round(weeks),
            unit: 'week',
        };
    }
    var DEFAULT_THRESHOLDS = {
        second: 45,
        minute: 45,
        hour: 22,
        day: 5,
    };

    const secondsPerMinute = 60;
    const secondsPerHour = 3600;
    const hoursPerDay = 24;
    let MyRelativeTime = class MyRelativeTime extends h$2 {
        constructor() {
            super(...arguments);
            this.updateInterval = 60;
            this.timer = 0;
        }
        startRefreshTimer(updateInterval) {
            clearInterval(this.timer);
            this.timer = window.setInterval(() => {
                this.requestUpdate();
            }, updateInterval * 1000);
            this.updateInterval = updateInterval;
        }
        set hass(hass) {
            this._hass = hass;
            this.startRefreshTimer(this.updateInterval); //restart
        }
        relativeTime(dateObj) {
            if (!this._hass)
                return '';
            const now = new Date();
            let delta = (now.getTime() - dateObj.getTime()) / 1000;
            const tense = delta >= 0 ? 'past' : 'future';
            delta = Math.abs(delta);
            const roundedDelta = Math.round(delta);
            if (tense == 'future' && roundedDelta > 0) {
                if (delta / secondsPerHour >= 6) {
                    const startOfToday = now.setHours(0, 0, 0, 0);
                    const daysFromNow = Math.floor((dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000));
                    let day = '';
                    if (daysFromNow > 14) {
                        //October 12
                        day = formatDate(dateObj, getLocale(this._hass));
                    }
                    else if (daysFromNow > 7) {
                        //Next Friday
                        day = localize('ui.components.date.next_week_day', getLocale(this._hass), '{weekday}', formatWeekday(dateObj, getLocale(this._hass)));
                    }
                    else if (daysFromNow == 1) {
                        //Tomorrow
                        day = localize('ui.components.date.tomorrow', getLocale(this._hass));
                    }
                    else if (daysFromNow > 0) {
                        //Friday
                        day = formatWeekday(dateObj, getLocale(this._hass));
                    }
                    let time = localize('ui.components.time.absolute', getLocale(this._hass), '{time}', formatTime(dateObj, getLocale(this._hass)));
                    if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0) {
                        time = localize('ui.components.time.at_noon', getLocale(this._hass));
                    }
                    else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0) {
                        time = localize('ui.components.time.at_midnight', getLocale(this._hass));
                    }
                    return String(day + ' ' + time).trim();
                }
                else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
                    // in 1 hour and 52 minutes
                    const mins = Math.round(delta / secondsPerMinute - 60);
                    const join = this._hass.localize('ui.common.and');
                    // @ts-expect-error
                    const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(1, 'hour');
                    const text2 = Intl.NumberFormat(getLocale(this._hass).language, {
                        style: 'unit',
                        // @ts-expect-error
                        unit: 'minute',
                        unitDisplay: 'long',
                    }).format(mins);
                    return `${text1} ${join} ${text2}`;
                }
                else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
                    // in 1 minute and 52 seconds
                    const seconds = Math.round(delta - 60);
                    const join = this._hass.localize('ui.common.and');
                    // @ts-expect-error
                    const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(1, 'minute');
                    const text2 = Intl.NumberFormat(getLocale(this._hass).language, {
                        style: 'unit',
                        // @ts-expect-error
                        unit: 'second',
                        unitDisplay: 'long',
                    }).format(seconds);
                    return `${text1} ${join} ${text2}`;
                }
            }
            // in 5 minutes/hours/seconds (or now)
            const diff = selectUnit(dateObj);
            // @ts-expect-error
            return new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: 'auto' }).format(diff.value, diff.unit);
        }
        render() {
            if (!this._hass || !this.datetime)
                return T ``;
            const now = new Date();
            const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
            let updateInterval = 60;
            if (Math.abs(secondsRemaining) <= 150)
                updateInterval = Math.max(Math.ceil(Math.abs(secondsRemaining)) / 10, 2);
            if (this.updateInterval != updateInterval)
                this.startRefreshTimer(updateInterval);
            return T `
      ${capitalize(this.relativeTime(this.datetime))}
    `;
        }
    };
    __decorate([
        e$3()
    ], MyRelativeTime.prototype, "_hass", void 0);
    __decorate([
        e$3()
    ], MyRelativeTime.prototype, "datetime", void 0);
    MyRelativeTime = __decorate([
        n$4('my-relative-time')
    ], MyRelativeTime);

    const computeScheduleTimestamp = (schedule) => new Date(schedule.timestamps[schedule.next_entries[0]]).valueOf();
    const sortByRelativeTime = (schedules) => {
        const output = [...schedules];
        output.sort((a, b) => {
            const remainingA = computeScheduleTimestamp(a);
            const remainingB = computeScheduleTimestamp(b);
            const now = new Date().valueOf();
            const reverse = remainingA < now && remainingB < now;
            if (remainingA !== null && remainingB !== null) {
                if (remainingA < now && remainingB >= now)
                    return 1;
                else if (remainingA >= now && remainingB < now)
                    return -1;
                else if (remainingA > remainingB)
                    return reverse ? -1 : 1;
                else if (remainingA < remainingB)
                    return reverse ? 1 : -1;
                else
                    return a.entity_id < b.entity_id ? 1 : -1;
            }
            else if (remainingB !== null)
                return 1;
            else if (remainingA !== null)
                return -1;
            else
                return a.entity_id < b.entity_id ? 1 : -1;
        });
        return output;
    };
    const sortByTitle = (schedules, displayInfo) => {
        const output = [...schedules];
        output.sort((a, b) => {
            const titleA = displayInfo[a.schedule_id].primaryInfo.join('');
            const titleB = displayInfo[b.schedule_id].primaryInfo.join('');
            return sortAlphabetically(titleA, titleB);
        });
        return output;
    };
    const sortByState = (schedules, hass, expiredSchedulesLast) => {
        const output = [...schedules];
        output.sort((a, b) => {
            var _a, _b;
            const stateA = (_a = hass.states[a.entity_id]) === null || _a === void 0 ? void 0 : _a.state;
            const stateB = (_b = hass.states[b.entity_id]) === null || _b === void 0 ? void 0 : _b.state;
            const scheduleA_active = ['on', 'triggered'].includes(stateA);
            const scheduleB_active = ['on', 'triggered'].includes(stateB);
            if (scheduleA_active && !scheduleB_active)
                return -1;
            else if (!scheduleA_active && scheduleB_active)
                return 1;
            if (expiredSchedulesLast) {
                if (stateA != 'off' && stateB == 'off')
                    return 1;
                else if (stateA == 'off' && stateB != 'off')
                    return -1;
            }
            return 0;
        });
        return output;
    };
    //check whether entities and tags of schedule are included in configuration
    const isIncluded = (schedule, config) => {
        var _a;
        if (!schedule.timeslots.every(timeslot => timeslot.actions.every(action => entityFilter(action.entity_id || action.service, config))))
            return false;
        const filters = AsArray(config.tags);
        if (filters.length) {
            if ((schedule.tags || []).some(e => filters.includes(e)))
                return true;
            else if (filters.includes('none') && !((_a = schedule.tags) === null || _a === void 0 ? void 0 : _a.length))
                return true;
            return false;
        }
        return true;
    };
    //check whether entities and tags of schedule are included in configuration OR they should be discovered
    const isIncludedOrExcluded = (schedule, config) => {
        if (config.discover_existing)
            return true;
        else if (!schedule)
            return false;
        else
            return isIncluded(schedule, config);
    };
    const getScheduleDisplayInfo = (schedule, config, hass) => {
        const info = {
            primaryInfo: computeScheduleHeader(schedule, config, hass),
            secondaryInfo: computeScheduleInfo(schedule, config, hass),
            icon: computeScheduleIcon(schedule, config, hass),
        };
        return info;
    };
    let SchedulerEntitiesCard = class SchedulerEntitiesCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.showDiscovered = false;
            this.scheduleDisplayInfo = {};
            this.connectionError = false;
        }
        hassSubscribe() {
            this.loadSchedules();
            return [
                this.hass.connection.subscribeMessage((ev) => this.updateScheduleItem(ev), {
                    type: WebsocketEvent,
                }),
            ];
        }
        async updateScheduleItem(ev) {
            //only update single schedule
            fetchScheduleItem(this.hass, ev.schedule_id).then(schedule => {
                var _a;
                const oldSchedule = (_a = this.schedules) === null || _a === void 0 ? void 0 : _a.find(e => e.schedule_id == ev.schedule_id);
                let schedules = [...(this.schedules || [])];
                this.scheduleDisplayInfo = Object.assign(Object.assign({}, this.scheduleDisplayInfo), { [schedule.schedule_id]: getScheduleDisplayInfo(schedule, this.config, this.hass) });
                if (!schedule || !isIncludedOrExcluded(schedule, this.config)) {
                    //schedule is not in the list, remove if it was in the list
                    if (oldSchedule) {
                        schedules = schedules.filter(e => e.schedule_id != ev.schedule_id);
                    }
                }
                else if (!oldSchedule) {
                    //add a new schedule and sort the list
                    schedules = this.sortSchedules([...schedules, schedule]);
                }
                else if (computeScheduleTimestamp(oldSchedule) == computeScheduleTimestamp(schedule)) {
                    //only overwrite the existing schedule
                    schedules = schedules.map(e => (e.schedule_id == schedule.schedule_id ? schedule : e));
                }
                else {
                    //overwrite the existing schedule and sort
                    schedules = this.sortSchedules(schedules.map(e => (e.schedule_id == schedule.schedule_id ? schedule : e)));
                }
                this.schedules = [...schedules];
            });
        }
        async loadSchedules() {
            //load all schedules
            fetchSchedules(this.hass)
                .then(res => {
                let schedules = res.filter(e => isIncludedOrExcluded(e, this.config));
                let scheduleInfo = {};
                Object.keys(schedules).forEach(e => {
                    scheduleInfo = Object.assign(Object.assign({}, scheduleInfo), { [schedules[e].schedule_id]: getScheduleDisplayInfo(schedules[e], this.config, this.hass) });
                });
                this.scheduleDisplayInfo = scheduleInfo;
                this.schedules = this.sortSchedules(schedules);
            })
                .catch(_e => {
                this.schedules = [];
                this.connectionError = true;
            });
        }
        shouldUpdate(changedProps) {
            const oldHass = changedProps.get('hass');
            const oldConfig = changedProps.get('config');
            if (oldHass && changedProps.size == 1 && this.schedules)
                return this.schedules.some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass.states[e.entity_id]));
            else if (oldConfig &&
                this.config &&
                (oldConfig.discover_existing !== this.config.discover_existing || oldConfig.tags !== this.config.tags))
                (async () => await this.loadSchedules())();
            return true;
        }
        render() {
            if (!this.hass || !this.config || !this.schedules)
                return T ``;
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title
            ? typeof this.config.title == 'string'
                ? this.config.title
                : localize('ui.panel.common.title', getLocale(this.hass))
            : ''}
          </div>
          ${this.schedules.length && this.config.show_header_toggle
            ? T `
                <ha-switch ?checked=${this.computeHeaderToggleState()} @change=${this.toggleDisableAll}> </ha-switch>
              `
            : ''}
        </div>
        <div class="card-content">
          ${this.renderRows()}
        </div>
        ${this.config.show_add_button !== false
            ? T `
              <div class="card-actions">
                <mwc-button @click=${this.newItemClick} ?disabled=${this.connectionError}
                  >${this.hass.localize('ui.components.area-picker.add_dialog.add')}
                </mwc-button>
              </div>
            `
            : ''}
      </ha-card>
    `;
        }
        renderRows() {
            if (!this.config || !this.hass || !this.schedules)
                return T ``;
            if (this.connectionError) {
                return T `
        <div>
          <hui-warning>
            ${localize('ui.panel.overview.backend_error', getLocale(this.hass))}
          </hui-warning>
        </div>
      `;
            }
            else if (!Object.keys(this.schedules).length) {
                return T `
        <div>
          ${localize('ui.panel.overview.no_entries', getLocale(this.hass))}
        </div>
      `;
            }
            const includedSchedules = this.schedules.filter(e => isIncluded(e, this.config));
            const excludedEntities = this.schedules.filter(e => !isIncluded(e, this.config));
            return T `
      ${includedSchedules.map(schedule => this.renderScheduleRow(schedule))}
      ${Object.keys(excludedEntities).length
            ? !this.showDiscovered
                ? T `
              <div>
                <button
                  class="show-more"
                  @click=${() => {
                    this.showDiscovered = true;
                }}
                >
                  +
                  ${localize('ui.panel.overview.excluded_items', getLocale(this.hass), '{number}', excludedEntities.length)}
                </button>
              </div>
            `
                : T `
              ${excludedEntities.map(schedule => this.renderScheduleRow(schedule))}
              <div>
                <button
                  class="show-more"
                  @click=${() => {
                    this.showDiscovered = false;
                }}
                >
                  ${capitalize(localize('ui.panel.overview.hide_excluded', getLocale(this.hass)))}
                </button>
              </div>
            `
            : ''}
    `;
        }
        renderScheduleRow(schedule) {
            var _a, _b, _c;
            if (!this.hass)
                return T ``;
            if (!schedule ||
                !schedule.next_entries.length ||
                !Object.keys(this.scheduleDisplayInfo).includes(schedule.schedule_id)) {
                return this.hass.config.state !== STATE_NOT_RUNNING
                    ? T `
            <hui-warning>
              Defective schedule entity: ${schedule.entity_id}
            </hui-warning>
          `
                    : T `
            <hui-warning>
              ${this.hass.localize('ui.panel.lovelace.warning.starting')}
            </hui-warning>
          `;
            }
            const displayInfo = this.scheduleDisplayInfo[schedule.schedule_id];
            const state = ((_a = this.hass.states[schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '';
            return T `
      <div
        class="schedule-row ${['on', 'triggered'].includes(state) ? '' : 'disabled'}"
        @click=${() => this.editItemClick(schedule.schedule_id)}
      >
        <ha-icon icon="${PrettyPrintIcon(displayInfo.icon)}"></ha-icon>
        <div class="info">
          ${this.renderDisplayItems(schedule, displayInfo.primaryInfo)}
          <div class="secondary">
            ${this.renderDisplayItems(schedule, displayInfo.secondaryInfo)}
          </div>
        </div>
        <ha-switch
          ?checked=${['on', 'triggered'].includes(((_b = this.hass.states[schedule.entity_id]) === null || _b === void 0 ? void 0 : _b.state) || '')}
          ?disabled=${((_c = this.hass.states[schedule.entity_id]) === null || _c === void 0 ? void 0 : _c.state) == 'completed'}
          @click=${(ev) => this.toggleDisabled(ev, schedule.entity_id)}
        >
        </ha-switch>
      </div>
    `;
        }
        renderDisplayItems(schedule, displayItem) {
            const replaceReservedTags = (input) => {
                const parts = input.split('<my-relative-time></my-relative-time>');
                if (parts.length > 1)
                    return T `
          ${parts[0] ? o$6(parts[0]) : ''}
          <my-relative-time .hass=${this.hass} .datetime=${new Date(schedule.timestamps[schedule.next_entries[0]])}>
          </my-relative-time>
          ${parts[1] ? o$6(parts[1]) : ''}
        `;
                const parts2 = input.split(/(<tag>[^<]*<\/tag>)/g);
                if (parts2.length > 1)
                    return parts2
                        .filter(e => e.length)
                        .map(e => {
                        let res = e.match(/<tag>([^<]*)<\/tag>/g);
                        return res ? o$6(`<span class="filter-tag">${res[0]}</span>`) : e;
                    });
                return o$6(input);
            };
            return displayItem.filter(isDefined).map(e => T `
          ${replaceReservedTags(e)}<br />
        `);
        }
        sortSchedules(schedules) {
            var _a;
            const sortingOptions = AsArray((_a = this.config) === null || _a === void 0 ? void 0 : _a.sort_by);
            if (sortingOptions.includes('relative-time'))
                schedules = sortByRelativeTime(schedules);
            if (sortingOptions.includes('title'))
                schedules = sortByTitle(schedules, this.scheduleDisplayInfo);
            if (sortingOptions.includes('state')) {
                const expiredSchedulesLast = sortingOptions.includes('relative-time');
                schedules = sortByState(schedules, this.hass, expiredSchedulesLast);
            }
            return schedules;
        }
        toggleDisabled(ev, entity_id) {
            if (!this.hass || !entity_id)
                return;
            ev.stopPropagation();
            const checked = !ev.target.checked;
            this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: entity_id });
        }
        toggleDisableAll(ev) {
            if (!this.hass || !this.schedules)
                return;
            const checked = ev.target.checked;
            const items = this.schedules.filter(e => this.showDiscovered ? isIncludedOrExcluded(e, this.config) : isIncluded(e, this.config));
            items.forEach(el => {
                this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
            });
        }
        computeHeaderToggleState() {
            if (!this.schedules)
                return false;
            const items = this.schedules.filter(e => this.showDiscovered ? isIncludedOrExcluded(e, this.config) : isIncluded(e, this.config));
            return items.some(el => { var _a; return ['on', 'triggered'].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); });
        }
        editItemClick(entity_id) {
            const myEvent = new CustomEvent('editClick', { detail: entity_id });
            this.dispatchEvent(myEvent);
        }
        newItemClick() {
            const myEvent = new CustomEvent('newClick');
            this.dispatchEvent(myEvent);
        }
    };
    SchedulerEntitiesCard.styles = i `
    ${commonStyle}
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
      --paper-item-icon-color: var(--disabled-text-color);
      --state-icon-color: var(--disabled-text-color);
    }
    div.schedule-row span.filter-tag {
      background: rgba(var(--rgb-primary-color), 0.3);
    }
  `;
    __decorate([
        e$3()
    ], SchedulerEntitiesCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], SchedulerEntitiesCard.prototype, "showDiscovered", void 0);
    __decorate([
        e$3()
    ], SchedulerEntitiesCard.prototype, "schedules", void 0);
    SchedulerEntitiesCard = __decorate([
        n$4('scheduler-entities-card')
    ], SchedulerEntitiesCard);

    // Material Design Icons v6.4.95
    var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
    var mdiMenuDown = "M7,10L12,15L17,10H7Z";
    var mdiMenuUp = "M7,15L12,10L17,15H7Z";
    var mdiPencil = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
    var mdiUnfoldMoreVertical = "M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z";

    const domainNames = {
        alarm_control_panel: 'domains.alarm_control_panel',
        automation: 'ui.dialogs.quick-bar.commands.navigation.automation',
        binary_sensor: 'domains.binary_sensor',
        calendar: 'panel.calendar',
        climate: 'domains.climate',
        cover: 'domains.cover',
        fan: 'domains.fan',
        group: 'domains.group',
        humidifier: 'domains.humidifier',
        input_boolean: 'domains.input_boolean',
        input_number: 'domains.input_number',
        input_select: 'domains.input_select',
        light: 'domains.light',
        lock: 'domains.lock',
        media_player: 'domains.media_player',
        notify: 'domains.notify',
        person: 'ui.dialogs.quick-bar.commands.navigation.person',
        scene: 'ui.dialogs.quick-bar.commands.navigation.scene',
        script: 'ui.dialogs.quick-bar.commands.navigation.script',
        sensor: 'ui.panel.config.devices.entities.sensor',
        sun: 'ui.panel.config.automation.editor.conditions.type.sun.label',
        switch: 'domains.switch',
        vacuum: 'domains.vacuum',
        water_heater: 'domains.water_heater',
    };
    const standardGroupNames = (domain, hass) => {
        if (domain in domainNames) {
            const translationKey = domainNames[domain];
            const domainTranslation = translationKey.startsWith('domains')
                ? localize(translationKey, getLocale(hass))
                : hass.localize(translationKey);
            if (domainTranslation)
                return domainTranslation;
        }
        return domain;
    };

    function entityGroups(entities, config, hass) {
        let groups = [];
        //create groups from user config
        if (config.groups) {
            config.groups.forEach(el => {
                if (!entities.find(e => entityFilter(e, el)))
                    return;
                groups = [
                    ...groups,
                    {
                        name: el.name,
                        icon: el.icon || DefaultGroupIcon,
                        entities: entities.filter(e => entityFilter(e, el)),
                    },
                ];
            });
        }
        const ungroupedEntities = entities.filter(e => !groups.some(g => g.entities.includes(e)));
        const domains = ungroupedEntities.map(g$1).filter((v, k, arr) => arr.indexOf(v) === k);
        //automatically create groups for ungrouped entities
        domains.forEach(domain => {
            groups = [
                ...groups,
                {
                    name: standardGroupNames(domain, hass),
                    icon: (config.standard_configuration === undefined || config.standard_configuration) && domain in domainIcons
                        ? domainIcons[domain]
                        : DefaultGroupIcon,
                    entities: ungroupedEntities.filter(e => entityFilter(e, { include: [domain], exclude: [] })),
                },
            ];
        });
        return groups;
    }

    const onOffType = { options: ['on', 'off'] };
    const statesList = {
        alarm_control_panel: {
            template: stateObj => {
                let modes = ['disarmed', 'triggered'];
                const supported = numericAttribute(stateObj, 'supported_features') || 0;
                if (supported & 2)
                    modes = [...modes, 'armed_away'];
                if (supported & 1)
                    modes = [...modes, 'armed_home'];
                if (supported & 4)
                    modes = [...modes, 'armed_night'];
                if (supported & 16)
                    modes = [...modes, 'armed_custom_bypass'];
                return { options: modes };
            },
        },
        binary_sensor: onOffType,
        climate: {
            options: 'hvac_modes',
        },
        calendar: onOffType,
        cover: { options: ['open', 'closed'] },
        device_tracker: { options: ['home', 'not_home'] },
        fan: onOffType,
        humidifier: onOffType,
        input_boolean: onOffType,
        input_number: {
            min: 'min',
            max: 'max',
            unit: 'unit_of_measurement',
            step: 'step',
        },
        input_select: {
            options: 'options',
        },
        light: onOffType,
        lock: { options: ['locked', 'unlocked'] },
        number: {
            min: 'min',
            max: 'max',
            step: 'step',
        },
        person: {
            template: (_stateObj, hass) => {
                let modes = ['home', 'not_home'];
                let zones = Object.keys(hass.states)
                    .filter(e => g$1(e) == 'zone')
                    .map(b$1);
                return { options: [...new Set([...modes, ...zones])] };
            },
        },
        proximity: {
            unit: 'unit_of_measurement',
        },
        select: {
            options: 'options',
        },
        sensor: {
            template: stateObj => stateObj && !isNaN(Number(stateObj.state))
                ? stringAttribute(stateObj, 'unit_of_measurement') == '%'
                    ? {
                        min: 0,
                        max: 100,
                        unit: '%',
                        step: 1,
                    }
                    : { unit: 'unit_of_measurement' }
                : {},
        },
        sun: { options: ['below_horizon', 'above_horizon'] },
        switch: onOffType,
        water_heater: {
            options: 'operation_list',
        },
    };

    const binarySensorIcon$1 = (stateObj, state) => {
        return re(Object.assign(Object.assign({}, stateObj), { state: state }));
    };
    const coverIcon$2 = (stateObj, state) => {
        const closedState = state == 'closed';
        switch (stateObj.attributes.device_class) {
            case 'garage':
                return closedState ? 'mdi:garage' : 'mdi:garage-open';
            case 'door':
                return closedState ? 'mdi:door-closed' : 'mdi:door-open';
            case 'blind':
                return closedState ? 'mdi:blinds' : 'mdi:blinds-open';
            case 'window':
                return closedState ? 'mdi:window-closed' : 'mdi:window-open';
            default:
                return closedState ? 'mdi:window-shutter' : 'mdi:window-shutter-open';
        }
    };
    const personIcon = (_stateObj, state, hass) => {
        let stateIcons = {
            home: 'mdi:home-outline',
            not_home: 'mdi:exit-run',
        };
        Object.keys(hass.states)
            .filter(e => g$1(e) == 'zone')
            .forEach(e => {
            const name = b$1(e);
            const icon = hass.states[e].attributes.icon;
            if (!icon)
                return;
            stateIcons[name] = icon;
        });
        return state in stateIcons ? stateIcons[state] : 'mdi:flash';
    };
    const stateIcons = {
        alarm_control_panel: {
            disarmed: 'mdi:lock-open-variant-outline',
            armed_away: 'mdi:exit-run',
            armed_home: 'mdi:home-outline',
            armed_night: 'mdi:power-sleep',
            triggered: 'mdi:alarm-light-outline',
        },
        binary_sensor: {
            on: binarySensorIcon$1,
            off: binarySensorIcon$1,
        },
        calendar: {
            on: 'mdi:flash',
            off: 'mdi:flash-off',
        },
        climate: {
            off: 'mdi:power-off',
            heat: 'mdi:fire',
            cool: 'mdi:snowflake',
            heat_cool: 'mdi:thermometer',
            auto: 'mdi:autorenew',
            dry: 'mdi:water-percent',
            fan_only: 'mdi:fan',
        },
        cover: {
            closed: coverIcon$2,
            open: coverIcon$2,
        },
        device_tracker: {
            home: 'mdi:home-outline',
            not_home: 'mdi:exit-run',
        },
        fan: {
            on: 'mdi:power',
            off: 'mdi:power-off',
        },
        humidifier: {
            on: 'mdi:power',
            off: 'mdi:power-off',
        },
        input_boolean: {
            on: 'mdi:flash',
            off: 'mdi:flash-off',
        },
        light: {
            on: 'mdi:lightbulb',
            off: 'mdi:lightbulb-off',
        },
        lock: {
            unlocked: 'mdi:lock-outline',
            locked: 'mdi:lock-open-variant-outline',
        },
        person: personIcon,
        sensor: {
            unit: 'attributes.unit_of_measurement',
        },
        sun: {
            below_horizon: 'mdi:weather-sunny-off',
            above_horizon: 'mdi:weather-sunny',
        },
        switch: {
            on: 'mdi:flash',
            off: 'mdi:flash-off',
        },
    };
    const stateIcon = (stateObj, state, hass, fallback) => {
        const domain = g$1(stateObj.entity_id);
        if (!state)
            state = stateObj.state;
        if (domain in stateIcons) {
            if (state in stateIcons[domain]) {
                const entry = stateIcons[domain][state];
                return typeof entry == 'string' ? entry : entry(stateObj, state, hass);
            }
            else if (typeof stateIcons[domain] == 'function') {
                return stateIcons[domain](stateObj, state, hass);
            }
        }
        return fallback || DefaultEntityIcon;
    };

    function standardStates(entity_id, hass) {
        const domain = g$1(entity_id);
        const stateObj = hass.states[entity_id];
        if (!stateObj)
            return null;
        if (domain == 'group') {
            const stateObj = hass.states[entity_id];
            const subEntities = listAttribute(stateObj, 'entity_id');
            if (!subEntities.length)
                return null;
            const subStates = subEntities.map(e => standardStates(e, hass));
            return subStates.every(isDefined) ? groupStates(hass, stateObj, subStates) : null;
        }
        if (!Object.keys(statesList).includes(domain))
            return null;
        let stateConfig = parseVariable(statesList[domain], stateObj, hass);
        if ('options' in stateConfig && isDefined(stateConfig.options)) {
            let options = [...stateConfig.options];
            options = options.map(e => Object.assign(e, {
                icon: e.icon ? e.icon : stateIcon(stateObj, e.value, hass, DefaultActionIcon),
                name: e.name ? e.name : getStateName(stateObj, e.value, hass),
            }));
            stateConfig = Object.assign(Object.assign({}, stateConfig), { options: options });
            if (!options.length)
                return null;
            return listVariable(stateConfig);
        }
        else if ('min' in stateConfig && isDefined(stateConfig.min) && 'max' in stateConfig && isDefined(stateConfig.max)) {
            return levelVariable(stateConfig);
        }
        else {
            return textVariable(stateConfig);
        }
    }
    const getStateName = (stateObj, state, hass) => {
        const domain = g$1(stateObj.entity_id);
        return ((stateObj.attributes.device_class &&
            hass.localize(`component.${domain}.state.${stateObj.attributes.device_class}.${state}`)) ||
            hass.localize(`component.${domain}.state._.${state}`) ||
            state);
    };

    function computeStates(entity_id, hass, config) {
        //fetch standard states for entity
        let stateConfig = config.standard_configuration ? standardStates(entity_id, hass) : null;
        //get customizations for entity
        const customizedStates = Object.entries(config.customize)
            .filter(([a]) => matchPattern(a, entity_id))
            .sort((a, b) => b[0].length - a[0].length)
            .map(([, b]) => b.states)
            .filter(isDefined);
        if (customizedStates.length) {
            customizedStates.forEach(userConfig => {
                if (Array.isArray(userConfig)) {
                    stateConfig = listVariable({ options: userConfig.map(e => Object({ value: e })) });
                }
                else {
                    stateConfig = levelVariable(userConfig);
                }
            });
        }
        return stateConfig;
    }

    function computeEntities$1(hass, config, options = { filterActions: true, filterStates: false }) {
        let entities = Object.keys(hass.states).filter(e => entityFilter(e, config));
        if ('notify' in hass.services) {
            entities = [
                ...entities,
                ...Object.keys(hass.services['notify'])
                    .map(e => `notify.${e}`)
                    .filter(e => entityFilter(e, config)),
            ];
        }
        if (options.filterActions && options.filterStates)
            entities = entities.filter(e => computeActions(e, hass, config).length || computeStates(e, hass, config));
        else if (options.filterActions)
            entities = entities.filter(e => computeActions(e, hass, config).length);
        else if (options.filterStates)
            entities = entities.filter(e => computeStates(e, hass, config));
        return entities;
    }

    function name(item) {
        var _a;
        return ((_a = item.name) === null || _a === void 0 ? void 0 : _a.trim()) || item.value || item.id || '';
    }
    function value(item, index) {
        return item.id || item.value || index;
    }
    let ButtonGroup = class ButtonGroup extends h$2 {
        constructor() {
            super(...arguments);
            this.items = [];
            this.value = null;
        }
        render() {
            if (!this.items.length) {
                return T `
        <div class="text-field">
          <slot></slot>
        </div>
      `;
            }
            return this.items.map((val, key) => this.renderButton(val, key));
        }
        renderButton(item, index) {
            const selection = Array.isArray(this.value) ? this.value : [this.value];
            const id = value(item, index);
            return T `
      <mwc-button
        class="${selection.includes(id) ? 'active' : ''}"
        ?disabled=${item.disabled}
        @click=${() => this.selectItem(id)}
      >
        ${item.icon
            ? T `
              <ha-icon icon="${PrettyPrintIcon(item.icon)}" class="padded-right"></ha-icon>
            `
            : ''}
        ${PrettyPrintName(name(item))}
      </mwc-button>
    `;
        }
        selectItem(val) {
            if (!Array.isArray(this.value)) {
                if (val == this.value) {
                    if (this.optional)
                        this.value = null;
                    else
                        return;
                }
                else
                    this.value = val;
            }
            else if (!this.multiple) {
                this.value = this.value.includes(val) ? [] : Array(val);
            }
            else {
                let value = Array.isArray(this.value) ? [...this.value] : [];
                if (value.includes(val)) {
                    if (this.min !== undefined && value.length <= this.min)
                        return;
                    value = value.filter(e => e != val);
                }
                else
                    value.push(val);
                this.value = value;
            }
            const selection = Array.isArray(this.value)
                ? this.value.map(e => this.items.find((v, k) => value(v, k) == e))
                : this.value !== null
                    ? this.items.find((v, k) => value(v, k) == this.value)
                    : null;
            const myEvent = new CustomEvent('change', { detail: selection });
            this.dispatchEvent(myEvent);
        }
    };
    ButtonGroup.styles = commonStyle;
    __decorate([
        e$3({ type: Array })
    ], ButtonGroup.prototype, "items", void 0);
    __decorate([
        e$3()
    ], ButtonGroup.prototype, "value", void 0);
    __decorate([
        e$3({ type: Number })
    ], ButtonGroup.prototype, "min", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], ButtonGroup.prototype, "optional", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], ButtonGroup.prototype, "multiple", void 0);
    ButtonGroup = __decorate([
        n$4('button-group')
    ], ButtonGroup);

    let SchedulerEditorCard = class SchedulerEditorCard extends h$2 {
        constructor() {
            super(...arguments);
            this.selectedEntities = [];
            this.multipleEntity = false;
            this.scheduleEntities = [];
            this.timeSchemeSelected = false;
        }
        async firstUpdated() {
            this.scheduleEntities = (await fetchSchedules(this.hass)).map(e => e.entity_id);
            if (this.entities && this.entities.length) {
                const group = this.getGroups().find(group => group.entities.find(e => e == this.entities[0].id));
                if (!group)
                    return;
                this.selectedGroup = group;
                this.selectedEntities = [...this.entities.map(e => e.id)];
                this.multipleEntity = this.selectedEntities.length > 1;
            }
            if (this.schedule) {
                if (this.schedule.timeslots.every(e => e.stop))
                    this.timeSchemeSelected = true;
                else {
                    const actions = unique(flatten(this.schedule.timeslots.map(e => e.actions)));
                    const matchedActions = this.getActionsForEntity().filter(e => actions.some(a => compareActions(a, e, true)));
                    if (matchedActions.length == 1)
                        this.selectedAction = matchedActions[0];
                }
            }
        }
        getGroups() {
            if (!this.hass || !this.config)
                return [];
            const entities = computeEntities$1(this.hass, this.config).filter(e => g$1(e) !== 'switch' || !this.scheduleEntities.includes(e));
            const groups = entityGroups(entities, this.config, this.hass);
            groups.sort(sortAlphabetically);
            return groups;
        }
        getEntitiesForGroup() {
            if (!this.selectedGroup || !this.hass || !this.config)
                return [];
            const entities = this.selectedGroup.entities.map(e => parseEntity(e, this.hass, this.config));
            entities.sort(sortAlphabetically);
            return entities;
        }
        getActionsForEntity() {
            if (!this.hass || !this.config || !this.selectedEntities.length)
                return [];
            const actions = computeActions(this.selectedEntities, this.hass, this.config).map(e => Object.assign(e, { name: computeActionDisplay(e) }));
            actions.sort(sortAlphabetically);
            return actions;
        }
        render() {
            if (!this.hass || !this.config)
                return T ``;
            const groups = this.getGroups();
            if (groups.length == 1 && !isEqual(this.selectedGroup, groups[0]))
                this.selectGroup(groups[0]);
            const entities = this.getEntitiesForGroup();
            if (entities.length == 1 && this.selectedEntities[0] !== entities[0].id)
                this.selectEntity(entities[0].id);
            const actions = this.getActionsForEntity();
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title
            ? typeof this.config.title == 'string'
                ? this.config.title
                : localize('ui.panel.common.title', getLocale(this.hass))
            : ''}
          </div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>
          <button-group
            .items=${groups}
            .value=${groups.findIndex(e => isEqual(e, this.selectedGroup))}
            @change=${(ev) => this.selectGroup(ev.detail)}
          >
            ${localize('ui.panel.entity_picker.no_groups_defined', getLocale(this.hass))}
          </button-group>

          <div class="header">
            ${this.hass.localize('ui.components.entity.entity-picker.entity')}
            ${entities.length > 1
            ? T `
                  <div class="switch">
                    <ha-switch
                      ?checked=${this.multipleEntity}
                      @change=${(ev) => {
                this.multipleEntity = ev.target.checked;
            }}
                    >
                    </ha-switch>
                    ${localize('ui.panel.entity_picker.multiple', getLocale(this.hass))}
                  </div>
                `
            : ''}
          </div>
          <button-group
            .items=${entities}
            .value=${this.selectedEntities}
            @change=${(ev) => this.selectEntity(ev.target.value)}
            ?multiple=${this.multipleEntity}
            ?optional=${true}
          >
            ${!this.selectedGroup
            ? localize('ui.panel.entity_picker.no_group_selected', getLocale(this.hass))
            : localize('ui.panel.entity_picker.no_entities_for_group', getLocale(this.hass))}
          </button-group>

          <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
          <button-group
            .items=${actions}
            .value=${actions.findIndex(e => isEqual(e, this.selectedAction))}
            @change=${(ev) => this.selectAction(ev.detail)}
          >
            ${!this.selectedEntities.length
            ? localize('ui.panel.entity_picker.no_entity_selected', getLocale(this.hass))
            : localize('ui.panel.entity_picker.no_actions_for_entity', getLocale(this.hass))}
          </button-group>
          ${this.makeSchemeButton(actions)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction && !this.timeSchemeSelected}
            >${this.hass.localize('ui.common.next')}</mwc-button
          >
        </div>
      </ha-card>
    `;
        }
        makeSchemeButton(actionConfig) {
            if (!actionConfig.length || !this.hass)
                return T ``;
            return T `
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.or.label')}</div>
      <div class="option-list">
        <mwc-button
          class="${this.timeSchemeSelected ? ' active' : ''}"
          @click=${() => this.selectTimeScheme()}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass))}
        </mwc-button>
      </div>
    </div>
    `;
        }
        selectGroup(val) {
            this.selectedGroup = val;
            this.selectedEntities = [];
            this.selectedAction = undefined;
        }
        selectEntity(value) {
            this.selectedEntities = Array.isArray(value) ? value : [value];
            if (this.selectedAction) {
                const availableActions = this.getActionsForEntity();
                this.selectedAction = availableActions.find(e => compareActions(e, this.selectedAction));
            }
            else
                this.selectedAction = undefined;
        }
        selectAction(val) {
            this.selectedAction = val;
            this.timeSchemeSelected = false;
        }
        selectTimeScheme() {
            this.selectedAction = null;
            this.timeSchemeSelected = true;
        }
        cancelClick() {
            const myEvent = new CustomEvent('cancelClick');
            this.dispatchEvent(myEvent);
        }
        nextClick() {
            const myEvent = new CustomEvent('nextClick', {
                detail: {
                    entities: this.selectedEntities,
                    action: this.selectedAction,
                    timeSchemeSelected: this.timeSchemeSelected,
                },
            });
            this.dispatchEvent(myEvent);
        }
    };
    SchedulerEditorCard.styles = commonStyle;
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "selectedGroup", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "selectedEntities", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "selectedAction", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "entities", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "schedule", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "multipleEntity", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "scheduleEntities", void 0);
    __decorate([
        e$3()
    ], SchedulerEditorCard.prototype, "timeSchemeSelected", void 0);
    SchedulerEditorCard = __decorate([
        n$4('scheduler-editor-card')
    ], SchedulerEditorCard);

    let TimePicker = class TimePicker extends h$2 {
        constructor() {
            super(...arguments);
            this.stepSize = DefaultTimeStep;
            this.relativeMode = false;
            this.event = ETimeEvent.Sunrise;
            this.maxOffset = 2;
        }
        get time() {
            if (this._time >= 0)
                return this._time;
            return Math.abs(this._time);
        }
        set time(value) {
            const newTime = roundTime(value, this.stepSize, {
                wrapAround: !this.relativeMode,
                maxHours: this.relativeMode ? this.maxOffset : undefined,
            });
            const timeUpdated = newTime != this._time && isDefined(this._time);
            this._time = newTime;
            if (timeUpdated)
                this.updateValue();
        }
        firstUpdated() {
            const res = parseRelativeTime(this.value);
            if (!res)
                this.time = stringToTime(this.value, this.hass);
            else {
                this.relativeMode = true;
                this.event = res.event == ETimeEvent.Sunrise ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
                this.time = res.sign == '+' ? stringToTime(res.offset, this.hass) : -stringToTime(res.offset, this.hass);
            }
        }
        updateValue() {
            if (this.relativeMode) {
                const sign = this._time >= 0 ? '+' : '-';
                const offset = timeToString(this.time);
                this.value = `${this.event}${sign}${offset}`;
            }
            else {
                this.value = timeToString(this.time);
            }
            const myEvent = new CustomEvent('change');
            this.dispatchEvent(myEvent);
        }
        render() {
            const timeString = this.relativeMode
                ? timeToString(this.time)
                : formatTime(stringToDate(timeToString(this.time)), getLocale(this.hass));
            const timeParts = timeString.split(/:|\ /);
            return T `
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${() => (this.time = this._time + 3600)}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${timeParts[0].padStart(2, '0')}</div>
        <div class="hours-down">
          <mwc-button @click=${() => (this.time = this._time - 3600)}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${() => (this.time = this._time + this.stepSize * 60)}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${timeParts[1]}</div>
        <div class="minutes-down">
          <mwc-button @click=${() => (this.time = this._time - this.stepSize * 60)}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode
            ? T `
              <div class="suffix">
                <mwc-button @click=${this.toggleBeforeAfter}>
                  ${this.getBeforeAfter()}
                </mwc-button>
                <mwc-button @click=${this.toggleSunriseSunset}>
                  <ha-icon
                    icon="hass:${this.event == ETimeEvent.Sunrise ? 'weather-sunny' : 'weather-night'}"
                  ></ha-icon>
                </mwc-button>
              </div>
            `
            : timeParts.length > 2
                ? T `
              <div class="suffix">
                <mwc-button @click=${this.toggleAmPm}>
                  ${timeParts[2]}
                </mwc-button>
              </div>
            `
                : ''}
        <div class="options">
          ${this.getSunModeToggle()}
        </div>
      </div>
    `;
        }
        getSunModeToggle() {
            if (!this.hass)
                return T ``;
            if (!this.hass.states['sun.sun'])
                return T ``;
            return T `
      <mwc-button @click="${this.toggleMode}" class="${this.relativeMode ? 'active' : ''}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `;
        }
        getBeforeAfter() {
            if (!this.hass)
                return '';
            return this._time < 0
                ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.before').slice(0, -1)
                : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.after').slice(0, -1);
        }
        toggleAmPm() {
            this.time = this._time + 12 * 3600;
        }
        toggleBeforeAfter() {
            this.time = -this._time;
        }
        toggleSunriseSunset() {
            this.event = this.event == ETimeEvent.Sunrise ? ETimeEvent.Sunset : ETimeEvent.Sunrise;
        }
        toggleMode() {
            if (!this.hass)
                return;
            this.relativeMode = !this.relativeMode;
            const sunEntity = this.hass.states['sun.sun'];
            const ts_sunrise = stringToTime(sunEntity.attributes.next_rising, this.hass);
            const ts_sunset = stringToTime(sunEntity.attributes.next_setting, this.hass);
            if (this.relativeMode) {
                this.event =
                    Math.abs(this._time - ts_sunrise) < Math.abs(this._time - ts_sunset) ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
                let offset = this.event == ETimeEvent.Sunrise ? this._time - ts_sunrise : this._time - ts_sunset;
                if (offset > 7200)
                    offset = 7200;
                else if (offset < -7200)
                    offset = -7200;
                this.time = offset;
            }
            else {
                this.time = this.event == ETimeEvent.Sunrise ? this._time + ts_sunrise : this._time + ts_sunset;
            }
        }
    };
    TimePicker.styles = i `
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
  `;
    __decorate([
        e$3()
    ], TimePicker.prototype, "hass", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimePicker.prototype, "stepSize", void 0);
    __decorate([
        e$3()
    ], TimePicker.prototype, "relativeMode", void 0);
    __decorate([
        e$3()
    ], TimePicker.prototype, "event", void 0);
    __decorate([
        e$3()
    ], TimePicker.prototype, "_time", void 0);
    TimePicker = __decorate([
        n$4('time-picker')
    ], TimePicker);

    const relToAbsTime = (timeStr, hass, options = {}) => {
        const res = parseRelativeTime(timeStr);
        if (!res)
            return timeStr;
        const sunEntity = hass.states['sun.sun'];
        const ts_ref = res.event == 'sunrise'
            ? stringToTime(sunEntity.attributes.next_rising, hass)
            : stringToTime(sunEntity.attributes.next_setting, hass);
        let ts = res.sign == '+' ? ts_ref + stringToTime(res.offset, hass) : ts_ref - stringToTime(res.offset, hass);
        if (options.stepSize)
            ts = roundTime(ts, options.stepSize);
        return timeToString(ts);
    };
    const absToRelTime = (timeStr, event, hass, options = {}) => {
        const res = parseRelativeTime(timeStr);
        if (res)
            return timeStr;
        const ts = stringToTime(timeStr, hass);
        const sunEntity = hass.states['sun.sun'];
        const ts_sunrise = stringToTime(sunEntity.attributes.next_rising, hass);
        const ts_sunset = stringToTime(sunEntity.attributes.next_setting, hass);
        if (!event)
            event = Math.abs(ts - ts_sunrise) < Math.abs(ts - ts_sunset) ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
        const ts_ref = event == ETimeEvent.Sunrise
            ? stringToTime(sunEntity.attributes.next_rising, hass)
            : stringToTime(sunEntity.attributes.next_setting, hass);
        let offset = ts - ts_ref;
        if (options.stepSize)
            offset = roundTime(offset, options.stepSize, { maxHours: 2 });
        return `${event}${offset > 0 ? '+' : '-'}${timeToString(Math.abs(offset))}`;
    };

    const SEC_PER_DAY = 86400;
    const SEC_PER_HOUR = 3600;
    let TimeslotEditor = class TimeslotEditor extends h$2 {
        constructor() {
            super(...arguments);
            this.slots = [];
            this.actions = [];
            this.stepSize = 10;
            this.isDragging = false;
            this.currentTime = 0;
            this.rangeMin = 0; //lower bound of zoomed timeframe
            this.rangeMax = SEC_PER_DAY; //upper bound of zoomed timeframe
            this.activeSlot = null;
            this.activeMarker = null;
            this.previousSlot = null;
            this.timer = 0;
            this.timeout = 0;
            this.zoomFactor = 1;
        }
        firstUpdated() {
            window.addEventListener('resize', () => {
                clearTimeout(this.timeout);
                this.timeout = window.setTimeout(() => {
                    this.requestUpdate();
                }, 50);
            });
        }
        render() {
            if (!this.hass)
                return T ``;
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
            const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
            return T `
      <div class="outer">
        <div
          class="wrapper ${this.isDragging ? '' : 'selectable'}"
          style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px"
        >
          ${this.renderSlots()}
        </div>
      </div>
      <div class="outer">
        <div
          class="time-wrapper"
          style="width: ${width.toFixed(2)}px; margin-left: ${left.toFixed(2)}px"
        >
          ${this.renderTimes()}
        </div>
      </div>
      <mwc-button
        @click=${this._addSlot}
        ?disabled=${this.activeSlot === null || this.slots.length >= 24}
      >
        <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
      </mwc-button>
      <mwc-button
        @click=${this._removeSlot}
        ?disabled=${this.activeSlot === null || this.slots.length <= 2}
      >
        <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
        ${this.hass.localize('ui.common.delete')}
      </mwc-button>
    `;
        }
        renderSlots() {
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
            const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
            let start = left;
            return this.slots.map((e, i) => {
                const w = ((stringToTime(e.stop, this.hass) || SEC_PER_DAY) -
                    stringToTime(e.start, this.hass)) /
                    SEC_PER_DAY;
                const actionText = this.computeActionDisplay(e) || '';
                const textWidth = (actionText || '').length * 5 + 10;
                const leftMargin = start < 0 && start + w * width > 0 ? -start + 5 : 15;
                const rightMargin = start + w * width > fullWidth && start < fullWidth
                    ? w * width - (fullWidth - start) + 5
                    : 15;
                const availableWidth = w * width - leftMargin - rightMargin;
                start += w * width;
                return T `
        <div
          class="slot${this.activeSlot == i && this.activeMarker === null
                ? ' active'
                : ''} ${w * width < 2 ? 'noborder' : ''}"
          style="width: ${Math.floor(w * 10000) / 100}%"
          @click=${this._selectSlot}
          slot="${i}"
        >
          ${i > 0 && (this.activeSlot === i || this.activeSlot === i - 1)
                ? T `
                <div class="handle">
                  <div class="button-holder">
                    <ha-icon-button
                      .path=${mdiUnfoldMoreVertical}
                      @mousedown=${this._handleTouchStart}
                      @touchstart=${this._handleTouchStart}
                    >
                    </ha-icon-button>
                  </div>
                </div>
              `
                : ''}
          ${i > 0 ? this.renderTooltip(i) : ''}

          <span
            style="margin-left: ${leftMargin.toFixed(2)}px; margin-right: ${rightMargin.toFixed(2)}px"
          >
            ${actionText &&
                (availableWidth > textWidth / 3 || availableWidth > 50) &&
                availableWidth > 30
                ? actionText
                : ''}
          </span>
        </div>
      `;
            });
        }
        renderTooltip(i) {
            const res = parseRelativeTime(this.slots[i].start);
            return T `
      <div class="tooltip-container center">
        <div
          class="tooltip ${this.activeMarker == i ? 'active' : ''}"
          @click=${this._selectMarker}
        >
          ${res
            ? T `
                <ha-icon
                  icon="hass:${res.event == 'sunrise'
                ? 'weather-sunny'
                : 'weather-night'}"
                ></ha-icon>
                ${res.sign}
                ${formatTime(stringToDate(res.offset), getLocale(this.hass), TimeFormat.twenty_four)}
              `
            : formatTime(stringToDate(this.slots[i].start), getLocale(this.hass))}
        </div>
      </div>
    `;
        }
        renderTimes() {
            this._updateTooltips();
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const allowedStepSizes = [1, 2, 3, 4, 6, 8, 12];
            const segmentWidth = formatAmPm(getLocale(this.hass)) ? 55 : 40;
            let stepSize = Math.ceil(24 / (fullWidth / segmentWidth));
            while (!allowedStepSizes.includes(stepSize))
                stepSize++;
            const nums = [
                0,
                ...Array.from(Array(24 / stepSize - 1).keys()).map(e => (e + 1) * stepSize),
                24,
            ];
            return nums.map(e => {
                const isSpacer = e == 0 || e == 24;
                const w = isSpacer ? (stepSize / 48) * 100 : (stepSize / 24) * 100;
                return T `
        <div
          style="width: ${Math.floor(w * 100) / 100}%"
          class="${isSpacer ? '' : 'time'}"
        >
          ${!isSpacer
                ? formatTime(stringToDate(timeToString(e * SEC_PER_HOUR)), getLocale(this.hass))
                : ''}
        </div>
      `;
            });
        }
        computeActionDisplay(entry) {
            if (!this.hass)
                return;
            if (!entry.actions)
                return '';
            return unique(entry.actions.map(action => {
                const actionConfig = this.actions.find(e => compareActions(e, action, true));
                if (!actionConfig)
                    return '???';
                if (actionConfig.variables &&
                    Object.keys(actionConfig.variables).some(field => action.service_data && field in action.service_data)) {
                    return Object.entries(actionConfig.variables)
                        .filter(([field]) => action.service_data && field in action.service_data)
                        .map(([field, variable]) => {
                        const value = action.service_data[field];
                        if (variable.type == EVariableType.Level) {
                            variable = variable;
                            return levelVariableDisplay(Number(value), variable);
                        }
                        else if (variable.type == EVariableType.List) {
                            variable = variable;
                            const listItem = variable.options.find(e => e.value == value);
                            return PrettyPrintName(listItem && listItem.name ? listItem.name : String(value));
                        }
                        else
                            return '';
                    })
                        .join(', ');
                }
                return PrettyPrintName(actionConfig.name ||
                    localize(`services.${action.service}`, getLocale(this.hass)) ||
                    action.service);
            })).join(', ');
        }
        _handleTouchStart(ev) {
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const width = (SEC_PER_DAY / (this.rangeMax - this.rangeMin)) * fullWidth;
            const left = (-this.rangeMin / (this.rangeMax - this.rangeMin)) * fullWidth;
            const Toffset = (-left / width) * SEC_PER_DAY;
            const marker = ev.target;
            let el = marker;
            while (!el.classList.contains('slot'))
                el = el.parentElement;
            const rightSlot = el;
            const leftSlot = rightSlot.previousElementSibling;
            const i = Number(leftSlot.getAttribute('slot'));
            const Tmin = i > 0 ? stringToTime(this.slots[i].start, this.hass) + 60 * this.stepSize : 0;
            const Tmax = i < this.slots.length - 2
                ? (stringToTime(this.slots[i + 1].stop, this.hass) || SEC_PER_DAY) -
                    60 * this.stepSize
                : SEC_PER_DAY;
            this.isDragging = true;
            const trackElement = rightSlot.parentElement
                .parentElement;
            const trackCoords = trackElement.getBoundingClientRect();
            let mouseMoveHandler = (ev) => {
                let startDragX;
                if (typeof TouchEvent !== 'undefined') {
                    if (ev instanceof TouchEvent)
                        startDragX = ev.changedTouches[0].pageX;
                    else
                        startDragX = ev.pageX;
                }
                else
                    startDragX = ev.pageX;
                let x = startDragX - trackCoords.left;
                if (x > fullWidth - 10)
                    x = fullWidth - 10;
                if (x < 10)
                    x = 10;
                let time = Math.round((x / width) * SEC_PER_DAY + Toffset);
                if (time < Tmin)
                    time = Tmin;
                if (time > Tmax)
                    time = Tmax;
                this.currentTime = time;
                const relTime = parseRelativeTime(this.slots[i].stop);
                let timeString;
                if (relTime)
                    timeString = absToRelTime(timeToString(time), relTime.event, this.hass, {
                        stepSize: this.stepSize,
                    });
                else {
                    time =
                        Math.round(time) >= SEC_PER_DAY ? SEC_PER_DAY : roundTime(time, this.stepSize);
                    timeString = timeToString(time);
                }
                if (timeString == this.slots[i].stop)
                    return;
                this.slots = Object.assign(this.slots, {
                    [i]: Object.assign(Object.assign({}, this.slots[i]), { stop: timeString }),
                    [i + 1]: Object.assign(Object.assign({}, this.slots[i + 1]), { start: timeString }),
                });
                this.requestUpdate();
            };
            const mouseUpHandler = () => {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('touchmove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
                window.removeEventListener('touchend', mouseUpHandler);
                mouseMoveHandler = () => {
                    /**/
                };
                setTimeout(() => {
                    this.isDragging = false;
                }, 100);
                marker.blur();
                const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
                this.dispatchEvent(myEvent);
            };
            window.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('touchend', mouseUpHandler);
            window.addEventListener('blur', mouseUpHandler);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('touchmove', mouseMoveHandler);
        }
        _selectSlot(ev) {
            if (this.isDragging)
                return;
            let el = ev.target;
            if (el.tagName.toLowerCase() == 'span')
                el = el.parentElement;
            if (el.classList.contains('handle'))
                el = el.parentElement;
            const slot = Number(el.getAttribute('slot'));
            if (this.activeSlot == slot && this.activeMarker === null) {
                this.activeSlot = null;
                //this.rangeMin = 0;
                //this.rangeMax = SEC_PER_DAY;
                this.previousSlot = null;
            }
            else {
                this.previousSlot = this.activeSlot;
                this.activeSlot = slot;
                //this._calculateZoom();
            }
            this.activeMarker = null;
            this._updateZoom();
            const myEvent = new CustomEvent('update', { detail: { entry: this.activeSlot } });
            this.dispatchEvent(myEvent);
        }
        _calculateZoom() {
            const slot = Number(this.activeSlot);
            let min = stringToTime(this.slots[slot].start, this.hass);
            let max = stringToTime(this.slots[slot].stop, this.hass) || SEC_PER_DAY;
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            min -= (max - min) / 3;
            max += (max - min) / 3;
            if (((max - min) / SEC_PER_DAY) * fullWidth >= 100) {
                min = 0;
                max = SEC_PER_DAY;
            }
            else {
                if (min < 0)
                    max -= min;
                if (max > SEC_PER_DAY)
                    min -= max - SEC_PER_DAY;
            }
            this.rangeMin = min > 0 ? min : 0;
            this.rangeMax = max < SEC_PER_DAY ? max : SEC_PER_DAY;
            clearInterval(this.timer);
            clearTimeout(this.timeout);
            this.timer = window.setInterval(() => {
                this._updateTooltips();
            }, 50);
            this.timeout = window.setTimeout(() => {
                clearInterval(this.timer);
                this._updateTooltips();
            }, 230);
        }
        _addSlot() {
            if (this.activeSlot === null)
                return;
            const activeSlot = this.slots[this.activeSlot];
            const startTime = stringToTime(activeSlot.start, this.hass);
            let endTime = stringToTime(activeSlot.stop, this.hass);
            if (endTime < startTime)
                endTime += SEC_PER_DAY;
            const newStop = roundTime(startTime + (endTime - startTime) / 2, this.stepSize);
            this.slots = [
                ...this.slots.slice(0, this.activeSlot),
                Object.assign(Object.assign({}, this.slots[this.activeSlot]), { stop: timeToString(newStop) }),
                Object.assign(Object.assign({}, this.slots[this.activeSlot]), { start: timeToString(newStop), stop: timeToString(endTime), actions: [] }),
                ...this.slots.slice(this.activeSlot + 1),
            ];
            this._updateZoom();
            const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
            this.dispatchEvent(myEvent);
        }
        _removeSlot() {
            if (this.activeSlot === null)
                return;
            const cutIndex = this.activeSlot == this.slots.length - 1 ? this.activeSlot - 1 : this.activeSlot;
            this.slots = [
                ...this.slots.slice(0, cutIndex),
                Object.assign(Object.assign({}, this.slots[cutIndex + 1]), { start: this.slots[cutIndex].start, stop: this.slots[cutIndex + 1].stop }),
                ...this.slots.slice(cutIndex + 2),
            ];
            if (this.activeSlot == this.slots.length)
                this.activeSlot--;
            this._updateZoom();
            const myEvent = new CustomEvent('update', { detail: { entries: this.slots } });
            this.dispatchEvent(myEvent);
        }
        _updateTooltips() {
            var _a;
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const tooltips = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.tooltip');
            const getBounds = (el) => {
                const width = el.offsetWidth;
                const left = el.parentElement.offsetLeft + el.offsetLeft - 15;
                if (el.parentElement.classList.contains('left'))
                    return [left + width / 2, left + (3 * width) / 2];
                else if (el.parentElement.classList.contains('right'))
                    return [left - width / 2, left + width / 2];
                return [left, left + width];
            };
            tooltips === null || tooltips === void 0 ? void 0 : tooltips.forEach((tooltip, i) => {
                const container = tooltip.parentElement;
                const visible = container.classList.contains('visible');
                const slot = Number(container.parentElement.getAttribute('slot'));
                if (slot != this.activeSlot && slot - 1 != this.activeSlot) {
                    if (visible)
                        container.classList.remove('visible');
                }
                else {
                    const left = tooltip.parentElement.offsetLeft;
                    if (left < 0 || left > fullWidth + 15) {
                        if (visible)
                            container.classList.remove('visible');
                    }
                    else {
                        if (!visible)
                            container.classList.add('visible');
                        const width = container.offsetWidth;
                        const isCenter = container.classList.contains('center');
                        let marginLeft = getBounds(tooltip)[0], marginRight = fullWidth - getBounds(tooltip)[1];
                        if (i > 0 && slot - 1 == this.activeSlot)
                            marginLeft -= getBounds(tooltips[i - 1])[1];
                        else if (i + 1 < tooltips.length && slot == this.activeSlot) {
                            const w = getBounds(tooltips[i + 1])[0];
                            marginRight -= w < 0 ? 0 : fullWidth - w;
                        }
                        //console.log(`tooltip ${i} marginLeft ${marginLeft} marginRight ${marginRight}`);
                        if (marginLeft < marginRight) {
                            if (marginLeft < 0) {
                                if (isCenter && marginRight > width / 2) {
                                    container.classList.add('right');
                                    container.classList.remove('center');
                                    container.classList.remove('left');
                                }
                            }
                            else {
                                container.classList.add('center');
                                container.classList.remove('right');
                                container.classList.remove('left');
                            }
                        }
                        else {
                            if (marginRight < 0) {
                                if (isCenter && marginLeft > width / 2) {
                                    container.classList.add('left');
                                    container.classList.remove('center');
                                    container.classList.remove('right');
                                }
                            }
                            else {
                                container.classList.add('center');
                                container.classList.remove('left');
                                container.classList.remove('right');
                            }
                        }
                    }
                }
            });
        }
        _updateZoom() {
            // let center = SEC_PER_DAY / 2;
            // if (this.activeSlot !== null) {
            //   const activeSlot = this.slots[this.activeSlot];
            //   let min = stringToTime(activeSlot.start, this.hass!);
            //   let max = stringToTime(activeSlot.stop!, this.hass!) || SEC_PER_DAY;
            //   center = Math.round((max + min) / 2);
            // }
            // let timeSpan = SEC_PER_DAY;
            // if (this.zoomFactor == 2) timeSpan = SEC_PER_DAY / 2;
            // else if (this.zoomFactor == 3) timeSpan = SEC_PER_DAY / 4;
            // else if (this.zoomFactor == 4) timeSpan = SEC_PER_DAY / 8;
            // let min = center - Math.round(timeSpan / 2);
            // let max = center + Math.round(timeSpan / 2);
            // if (min < 0) {
            //   max += -min;
            //   min = 0;
            //   if (max > SEC_PER_DAY) max = SEC_PER_DAY;
            // } else if (max > SEC_PER_DAY) {
            //   min -= max - SEC_PER_DAY;
            //   max = SEC_PER_DAY;
            //   if (min < 0) min = 0;
            // }
            // this.rangeMin = min;
            // this.rangeMax = max;
            clearInterval(this.timer);
            clearTimeout(this.timeout);
            this.timer = window.setInterval(() => {
                this._updateTooltips();
            }, 50);
            this.timeout = window.setTimeout(() => {
                clearInterval(this.timer);
                this._updateTooltips();
            }, 230);
        }
        // private _zoomIn() {
        //   this.zoomFactor++;
        //   this._updateZoom();
        // }
        // private _zoomOut() {
        //   this.zoomFactor--;
        //   this._updateZoom();
        // }
        _selectMarker(ev, enable = true) {
            ev.stopImmediatePropagation();
            let el = ev.target;
            while (!el.classList.contains('slot'))
                el = el.parentElement;
            const slot = Number(el.getAttribute('slot'));
            if (enable && this.activeMarker === slot)
                this.activeMarker = null;
            else
                this.activeMarker = enable ? slot : null;
            const myEvent = new CustomEvent('update', {
                detail: { entry: this.activeSlot, marker: this.activeMarker },
            });
            this.dispatchEvent(myEvent);
            this._updateTooltips();
        }
        static get styles() {
            return i `
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
        transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67),
          margin 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
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
    `;
        }
    };
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "hass", void 0);
    __decorate([
        e$3({ type: Array })
    ], TimeslotEditor.prototype, "slots", void 0);
    __decorate([
        e$3({ type: Array })
    ], TimeslotEditor.prototype, "actions", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeslotEditor.prototype, "stepSize", void 0);
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "rangeMin", void 0);
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "rangeMax", void 0);
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "activeSlot", void 0);
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "activeMarker", void 0);
    __decorate([
        e$4({ passive: true })
    ], TimeslotEditor.prototype, "_handleTouchStart", null);
    TimeslotEditor = __decorate([
        n$4('timeslot-editor')
    ], TimeslotEditor);

    const loadHaForm = async () => {
      if (customElements.get("ha-checkbox") && customElements.get("ha-slider")) return;
      await customElements.whenDefined("partial-panel-resolver");
      const ppr = document.createElement('partial-panel-resolver');
      ppr.hass = {
        panels: [{
          url_path: "tmp",
          component_name: "config"
        }]
      };

      ppr._updateRoutes();

      await ppr.routerOptions.routes.tmp.load();
      await customElements.whenDefined("ha-panel-config");
      const cpr = document.createElement("ha-panel-config");
      await cpr.routerOptions.routes.automation.load();
    };

    let VariableSlider = class VariableSlider extends h$2 {
        constructor() {
            super(...arguments);
            this.min = 0;
            this.max = 255;
            this.step = 1;
            this.scaleFactor = 1;
            this.unit = '';
            this.optional = false;
            this.disabled = false;
            this._displayedValue = 0;
        }
        //raw value
        set value(value) {
            value = isNaN(value) ? this.min : this._roundedValue(value / this.scaleFactor);
            this._displayedValue = value;
        }
        firstUpdated() {
            (async () => await loadHaForm())();
            if (this.disabled && !this.optional) {
                this.disabled = false;
                this.requestUpdate();
            }
        }
        render() {
            return T `
      <div class="checkbox-container">
        <div class="checkbox">
          ${this.getCheckbox()}
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}">
          ${this._displayedValue}${this.unit}
        </div>
      </div>
    `;
        }
        getSlider() {
            if (!this.disabled) {
                return T `
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          @change=${this._updateValue}
        ></ha-slider>
      `;
            }
            else {
                return T `
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this._displayedValue}
          disabled
        ></ha-slider>
      `;
            }
        }
        getCheckbox() {
            if (!this.optional)
                return T ``;
            return T `
      <ha-checkbox @change=${this.toggleChecked} ?checked=${!this.disabled}></ha-checkbox>
    `;
        }
        toggleChecked(e) {
            const checked = e.target.checked;
            this.disabled = !checked;
            const value = this.disabled ? null : this._scaledValue(this._displayedValue);
            A$1(this, 'value-changed', { value: value });
        }
        _updateValue(e) {
            let value = Number(e.target.value);
            this._displayedValue = value;
            value = this._scaledValue(this._displayedValue);
            A$1(this, 'value-changed', { value: value });
        }
        _roundedValue(value) {
            value = Math.round(value / this.step) * this.step;
            value = parseFloat(value.toPrecision(12));
            if (value > this.max)
                value = this.max;
            else if (value < this.min)
                value = this.min;
            return value;
        }
        _scaledValue(value) {
            value = this._roundedValue(value);
            value = value * this.scaleFactor;
            value = parseFloat(value.toFixed(2));
            return value;
        }
    };
    VariableSlider.styles = i `
    ${commonStyle} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `;
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "min", void 0);
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "max", void 0);
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "step", void 0);
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "value", null);
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "scaleFactor", void 0);
    __decorate([
        e$3({ type: String })
    ], VariableSlider.prototype, "unit", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], VariableSlider.prototype, "optional", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], VariableSlider.prototype, "disabled", void 0);
    __decorate([
        e$3({ type: Number })
    ], VariableSlider.prototype, "_displayedValue", void 0);
    VariableSlider = __decorate([
        n$4('variable-slider')
    ], VariableSlider);

    let SchedulerVariablePicker = class SchedulerVariablePicker extends h$2 {
        firstUpdated() {
            var _a;
            if ((this.value === null || this.value === undefined) &&
                ((_a = this.variable) === null || _a === void 0 ? void 0 : _a.type) == EVariableType.Level &&
                !this.variable.optional)
                this.levelVariableUpdated(this.variable.min);
        }
        render() {
            if (!this.variable)
                return T ``;
            else if (this.variable.type == EVariableType.Level)
                return this.renderLevelVariable();
            else if (this.variable.type == EVariableType.List)
                return this.renderListVariable();
            else if (this.variable.type == EVariableType.Text)
                return this.renderTextVariable();
            else
                return T ``;
        }
        levelVariableUpdated(ev) {
            const value = typeof ev == 'number' ? ev : Number(ev.detail.value);
            this.value = value;
            A$1(this, 'value-changed', { value: value });
        }
        renderLevelVariable() {
            const variable = this.variable;
            const value = Number(this.value);
            return T `
      <variable-slider
        min=${variable.min}
        max=${variable.max}
        step=${variable.step}
        scaleFactor=${variable.scale_factor}
        value=${value}
        .unit=${variable.unit}
        ?optional=${variable.optional}
        ?disabled=${isNaN(value)}
        @value-changed=${this.levelVariableUpdated}
      >
      </variable-slider>
    `;
        }
        listVariableUpdated(ev) {
            const value = typeof ev == 'string' ? ev : String(ev.target.value);
            this.value = value;
            A$1(this, 'value-changed', { value: value });
        }
        renderListVariable() {
            const variable = this.variable;
            const options = variable.options;
            const value = String(this.value) || null;
            if (options.length == 1 && value != options[0].value)
                this.listVariableUpdated(options[0].value);
            return T `
      <button-group .items=${options} value=${value} @change=${this.listVariableUpdated}> </button-group>
    `;
        }
        renderTextVariable() {
            const variable = this.variable;
            const value = this.value;
            return T `
      <paper-input
        no-label-float
        .value=${value || ''}
        @value-changed=${this.listVariableUpdated}
        .label=${variable.name}
      >
      </paper-input>
    `;
        }
    };
    __decorate([
        e$3()
    ], SchedulerVariablePicker.prototype, "variable", void 0);
    __decorate([
        e$3()
    ], SchedulerVariablePicker.prototype, "value", void 0);
    SchedulerVariablePicker = __decorate([
        n$4('scheduler-variable-picker')
    ], SchedulerVariablePicker);

    let DialogDeleteConfirm = class DialogDeleteConfirm extends h$2 {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.cancel();
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}> </ha-icon-button>
            <span slot="title">
              ${this.hass.localize('ui.dialogs.more_info_control.restored.confirm_remove_title')}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this.hass.localize('ui.dialogs.more_info_control.restored.confirm_remove_text')}
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.cancel')}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        confirmClick() {
            this._params.confirm();
        }
        cancelClick() {
            this._params.cancel();
        }
        static get styles() {
            return i `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], DialogDeleteConfirm.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], DialogDeleteConfirm.prototype, "_params", void 0);
    DialogDeleteConfirm = __decorate([
        n$4('dialog-delete-confirm')
    ], DialogDeleteConfirm);

    var dialogDeleteConfirm = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogDeleteConfirm () { return DialogDeleteConfirm; }
    });

    function startOfWeek(locale) {
        const parts = locale.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);
        const language = parts[1];
        const region = parts[4];
        const regionSat = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g);
        const regionSun = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g);
        const languageSat = ['ar', 'arq', 'arz', 'fa'];
        const languageSun = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g);
        if (region)
            return regionSun.includes(region) ? 'sun' : regionSat.includes(region) ? 'sat' : 'mon';
        else
            return languageSun.includes(language) ? 'sun' : languageSat.includes(language) ? 'sat' : 'mon';
    }

    const assignAction = (entity_id, action) => {
        let output = {
            entity_id: entity_id,
            service: action.service,
            service_data: Object.assign({}, action.service_data),
        };
        Object.entries(action.variables || {}).forEach(([key, config]) => {
            const serviceArgs = Object.keys(output.service_data || {});
            if (serviceArgs.includes(key))
                return;
            if (config.type == EVariableType.Level) {
                config = config;
                output = Object.assign(Object.assign({}, output), { service_data: config.optional
                        ? omit(output.service_data || {}, key)
                        : Object.assign(Object.assign({}, output.service_data), { [key]: parseFloat((config.min * config.scale_factor).toPrecision(12)) || 0 }) });
            }
            else if (config.type == EVariableType.List) {
                config = config;
                output = Object.assign(Object.assign({}, output), { service_data: Object.assign(Object.assign({}, output.service_data), { [key]: config.options.length ? config.options[0].value : undefined }) });
            }
            else if (config.type == EVariableType.Text) {
                config = config;
                output = Object.assign(Object.assign({}, output), { service_data: Object.assign(Object.assign({}, output.service_data), { [key]: '' }) });
            }
        });
        return output;
    };

    let SchedulerTimepickerCard = class SchedulerTimepickerCard extends h$2 {
        constructor() {
            super(...arguments);
            this.activeEntry = null;
            this.activeMarker = null;
            this.timeslots = false;
            this.editItem = false;
        }
        firstUpdated() {
            if (!this.actions || !this.hass)
                return;
            if (!this.timeslots)
                this.activeEntry = 0;
            const actions = this.actions.map(e => {
                const action = Object.assign(Object.assign({}, e), { service_data: omit(e.service_data || {}, ...Object.keys(e.variables || {})) });
                return Object.assign(e, {
                    name: computeActionDisplay(action),
                });
            });
            actions.sort(sortAlphabetically);
            this.actions = actions;
        }
        render() {
            if (!this.hass || !this.config || !this.entities || !this.actions)
                return T ``;
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title
            ? typeof this.config.title == 'string'
                ? this.config.title
                : localize('ui.panel.common.title', getLocale(this.hass))
            : ''}
          </div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
          ${this.renderSummary()}
          ${!this.timeslots
            ? T `
                ${this.getVariableEditor()} ${this.renderDays()}
                <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
                <time-picker
                  .hass=${this.hass}
                  .value=${this.schedule.timeslots[0].start}
                  stepSize=${this.config.time_step || DefaultTimeStep}
                  @change=${(ev) => this.updateActiveEntry({ start: ev.target.value })}
                >
                </time-picker>
              `
            : T `
                ${this.renderDays()}
                <div class="header">${localize('ui.panel.time_picker.time_scheme', getLocale(this.hass))}</div>

                <timeslot-editor
                  .hass=${this.hass}
                  .actions=${this.actions}
                  .slots=${this.schedule.timeslots}
                  stepSize=${this.config.time_step || DefaultTimeStep}
                  @update=${this.handlePlannerUpdate}
                >
                </timeslot-editor>

                ${this.renderMarkerOptions()} ${this.renderActions()} ${this.getVariableEditor()}
              `}
        </div>
        <div class="card-actions">
          <mwc-button
            @click=${this.saveClick}
            ?disabled=${!this.schedule.timeslots.filter(e => e.actions.length).length}
          >
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
          ${this.editItem
            ? T `
                <mwc-button class="warning" @click=${this.deleteClick}
                  >${this.hass.localize('ui.common.delete')}</mwc-button
                >
              `
            : ''}
          <mwc-button @click="${this.optionsClick}" style="float: right"
            >${this.hass.localize('ui.dialogs.helper_settings.input_select.options')}</mwc-button
          >
        </div>
      </ha-card>
    `;
        }
        renderSummary() {
            if (!this.entities || !this.actions)
                return T ``;
            return T `
      <div class="summary">
        <div class="summary-entity" @click=${this.editActionClick}>
          ${this.entities.map(entity => T `
              <div>
                <ha-icon icon="${PrettyPrintIcon(entity.icon)}"> </ha-icon>
                ${capitalize(PrettyPrintName(entity.name || this.hass.states[entity.id].attributes.friendly_name || b$1(entity.id)))}
              </div>
            `)}
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"> </ha-icon>
        </div>
        <div class="summary-action" @click=${this.editActionClick}>
          ${this.timeslots
            ? T `
                <div>
                  <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
                  ${capitalize(localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass)))}
                </div>
              `
            : T `
                <div>
                  <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}"> </ha-icon>
                  ${capitalize(this.actions[0].name || b$1(this.actions[0].service))}
                </div>
              `}
        </div>
      </div>
    `;
        }
        renderDays() {
            if (!this.hass)
                return T ``;
            let weekdays = Array.from(Array(7).keys());
            const firstWeekday = startOfWeek(this.hass.language);
            const shiftCount = weekdays.length - weekdayArray.findIndex(e => e.substr(0, 3) == firstWeekday);
            weekdays = [...weekdays.slice(-shiftCount), ...weekdays.slice(0, -shiftCount)];
            const DayOptions = weekdays.map(e => Object({ value: weekdayArray[e].substr(0, 3), name: formatWeekday(e, getLocale(this.hass), true) }));
            const DayTypeOptions = [
                { value: EDayType.Daily, name: localize('ui.components.date.day_types_short.daily', getLocale(this.hass)) },
                { value: EDayType.Workday, name: localize('ui.components.date.day_types_short.workdays', getLocale(this.hass)) },
                { value: EDayType.Weekend, name: localize('ui.components.date.day_types_short.weekend', getLocale(this.hass)) },
                {
                    value: EDayType.Custom,
                    name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label'),
                },
            ];
            return T `
      <div class="header">${localize('ui.components.date.days', getLocale(this.hass))}</div>
      <button-group .items=${DayTypeOptions} value=${weekdayType(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${weekdayType(this.schedule.weekdays) == EDayType.Custom
            ? T `
            <div>
              <button-group
                .items=${DayOptions}
                .value=${this.schedule.weekdays}
                min="1"
                multiple
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `
            : ''}
    `;
        }
        renderActions() {
            var _a;
            if (!this.hass || this.activeMarker !== null)
                return;
            const selectedAction = this.activeEntry !== null && this.schedule.timeslots[this.activeEntry].actions.length
                ? this.schedule.timeslots[this.activeEntry].actions[0]
                : null;
            return T `
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
      <button-group
        .items=${this.activeEntry !== null ? this.actions : []}
        .value=${selectedAction !== null
            ? (_a = this.actions) === null || _a === void 0 ? void 0 : _a.findIndex(e => compareActions(e, selectedAction, true)) : null}
        optional="true"
        @change=${this.selectAction}
      >
        ${localize('ui.panel.time_picker.no_timeslot_selected', getLocale(this.hass))}
      </button-group>
    `;
        }
        renderMarkerOptions() {
            if (!this.hass || !this.config || this.activeMarker === null)
                return;
            const value = this.schedule.timeslots[this.activeMarker].start;
            const res = parseRelativeTime(value);
            const deltaSunrise = stringToTime(value, this.hass) - stringToTime('sunrise+00:00', this.hass), deltaSunset = stringToTime(value, this.hass) - stringToTime('sunset+00:00', this.hass);
            const markerOptions = [
                {
                    value: 'time',
                    name: this.hass.localize('ui.panel.config.automation.editor.triggers.type.time.at'),
                    icon: 'hass:clock-outline',
                },
                {
                    value: ETimeEvent.Sunrise,
                    name: this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise'),
                    icon: 'hass:weather-sunny',
                    disabled: Math.abs(deltaSunrise) > 7200,
                },
                {
                    value: ETimeEvent.Sunset,
                    name: this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset'),
                    icon: 'hass:weather-night',
                    disabled: Math.abs(deltaSunset) > 7200,
                },
            ];
            return T `
      <div class="header">${localize('ui.panel.time_picker.time_input_mode', getLocale(this.hass))}</div>
      <button-group .items=${markerOptions} .value=${res ? res.event : 'time'} @change=${this.updateMarkerSetting}>
      </button-group>
    `;
        }
        updateMarkerSetting(ev) {
            const value = ev.target.value;
            const ts = this.schedule.timeslots[this.activeMarker].start;
            const res = value == 'time'
                ? relToAbsTime(ts, this.hass, { stepSize: this.config.time_step })
                : absToRelTime(ts, value, this.hass, { stepSize: this.config.time_step });
            let timeslots = [...this.schedule.timeslots];
            timeslots = Object.assign(timeslots, {
                [this.activeMarker - 1]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeMarker - 1]), { stop: res }),
                [this.activeMarker]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeMarker]), { start: res }),
            });
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: [...timeslots] });
        }
        updateActiveEntry(data) {
            if (this.activeEntry === null)
                return;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: Object.assign([...this.schedule.timeslots], {
                    [this.activeEntry]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry]), data),
                }) });
        }
        updateActiveEntryAction(data, num) {
            if (this.activeEntry === null)
                return;
            if (data && 'service' in data) {
                this.updateActiveEntry({
                    actions: Object.assign([...this.schedule.timeslots[this.activeEntry].actions], {
                        [num]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry].actions[num]), data),
                    }),
                });
            }
            else if (data) {
                //update service_data
                Object.entries(data).forEach(([key, val]) => {
                    let actionConfig = [...this.schedule.timeslots[this.activeEntry].actions];
                    let serviceData = typeof val == 'object' && key in this.schedule.timeslots[this.activeEntry].actions[num]
                        ? Object.assign(Object.assign({}, actionConfig[num][key]), val) : val;
                    const invalidParams = Object.keys(serviceData).filter(e => serviceData[e] === null);
                    if (invalidParams.length)
                        serviceData = omit(serviceData, ...invalidParams);
                    actionConfig = Object.assign(actionConfig, {
                        [num]: Object.assign(Object.assign({}, actionConfig[num]), { [key]: serviceData }),
                    });
                    this.updateActiveEntry({ actions: actionConfig });
                });
            }
            else {
                this.updateActiveEntry({
                    actions: [...this.schedule.timeslots[this.activeEntry].actions].filter((_, i) => i != num),
                });
            }
        }
        handlePlannerUpdate(ev) {
            if (ev.detail.hasOwnProperty('entries')) {
                const entries = ev.detail.entries;
                if (entries.length < this.schedule.timeslots.length && this.activeEntry == this.schedule.timeslots.length - 1)
                    this.activeEntry = this.schedule.timeslots.length - 2;
                this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: [...entries] });
            }
            else if (ev.detail.hasOwnProperty('entry')) {
                this.activeMarker = null;
                this.activeEntry = ev.detail.entry !== null ? Number(ev.detail.entry) : null;
            }
            if (ev.detail.hasOwnProperty('marker')) {
                this.activeEntry = null;
                this.activeMarker = ev.detail.marker !== null ? Number(ev.detail.marker) : null;
            }
        }
        selectAction(ev) {
            if (!this.actions || this.activeEntry === null)
                return;
            const action = ev.detail;
            if (action) {
                this.entities.map(e => e.id).forEach((entity_id, num) => {
                    this.updateActiveEntryAction(assignAction(entity_id, action), num);
                });
            }
            else {
                this.entities.forEach((_, num) => {
                    this.updateActiveEntryAction(null, num);
                });
            }
        }
        getVariableEditor() {
            if (this.activeEntry === null || !this.actions)
                return T ``;
            const actions = [];
            this.schedule.timeslots[this.activeEntry].actions.forEach(action => {
                action = omit(action, 'entity_id');
                if (!this.actions.find(e => compareActions(e, action, true) && Object.keys(e.variables || {}).length))
                    return;
                if (!actions.some(e => isEqual(e, action)))
                    actions.push(action);
            });
            return actions.map(action => {
                return Object.entries(this.actions.find(e => compareActions(e, action, true)).variables).map(([field, variable]) => {
                    return T `
            <div class="header">
              ${variable.name || PrettyPrintName(field)}
            </div>
            <scheduler-variable-picker
              .variable=${variable}
              .value=${action.service_data ? action.service_data[field] : null}
              @value-changed=${(ev) => this.entities.forEach((_, num) => {
                    this.updateActiveEntryAction({
                        service_data: { [field]: ev.detail.value },
                    }, num);
                })}
            >
              ${this.hass.localize('ui.dialogs.helper_settings.input_select.no_options')}
            </scheduler-variable-picker>
          `;
                });
            });
        }
        selectDays(ev) {
            const value = ev.target.value;
            let weekdays = this.schedule.weekdays;
            if (Object.values(EDayType).includes(value)) {
                switch (value) {
                    case EDayType.Daily:
                        weekdays = ['daily'];
                        break;
                    case EDayType.Workday:
                        weekdays = ['workday'];
                        break;
                    case EDayType.Weekend:
                        weekdays = ['weekend'];
                        break;
                    case EDayType.Custom:
                        weekdays = [];
                        break;
                }
            }
            else {
                weekdays = value;
            }
            this.schedule = Object.assign(Object.assign({}, this.schedule), { weekdays: weekdays });
        }
        cancelClick() {
            const myEvent = new CustomEvent('cancelClick');
            this.dispatchEvent(myEvent);
        }
        saveClick() {
            const myEvent = new CustomEvent('saveClick', { detail: this.schedule });
            this.dispatchEvent(myEvent);
        }
        optionsClick() {
            const myEvent = new CustomEvent('optionsClick', { detail: this.schedule });
            this.dispatchEvent(myEvent);
        }
        editActionClick() {
            const myEvent = new CustomEvent('editActionClick', { detail: this.schedule });
            this.dispatchEvent(myEvent);
        }
        async deleteClick(ev) {
            const element = ev.target;
            const result = await new Promise(resolve => {
                A$1(element, 'show-dialog', {
                    dialogTag: 'dialog-delete-confirm',
                    dialogImport: () => Promise.resolve().then(function () { return dialogDeleteConfirm; }),
                    dialogParams: {
                        cancel: () => {
                            resolve(false);
                        },
                        confirm: () => {
                            resolve(true);
                        },
                    },
                });
            });
            if (result) {
                const myEvent = new CustomEvent('deleteClick');
                this.dispatchEvent(myEvent);
            }
        }
    };
    SchedulerTimepickerCard.styles = i `
    ${commonStyle}
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
  `;
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "schedule", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "actions", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "entities", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "activeEntry", void 0);
    __decorate([
        e$3()
    ], SchedulerTimepickerCard.prototype, "activeMarker", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerTimepickerCard.prototype, "timeslots", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerTimepickerCard.prototype, "editItem", void 0);
    SchedulerTimepickerCard = __decorate([
        n$4('scheduler-timepicker-card')
    ], SchedulerTimepickerCard);

    let SchedulerSelect = class SchedulerSelect extends h$2 {
        constructor() {
            super(...arguments);
            this.label = '';
            this.items = [];
            this.clearable = false;
            this.icons = false;
            this.disabled = false;
            this.allowCustomValue = false;
            this.invalid = false;
            this.rowRenderer = (root, _owner, entry) => {
                if (!root.firstElementChild && this.icons) {
                    root.innerHTML = `
        <style>
          paper-icon-item {
              margin: -10px;
              padding: 0;
          }
          ha-icon {
              display: flex;
              flex: 0 0 40px;
              color: var(--state-icon-color);
          }
        </style>
        <paper-icon-item>
          <ha-icon icon="" slot="item-icon"></ha-icon>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-icon-item>
        `;
                    root.querySelector('.name').textContent = entry.item.name;
                    root.querySelector('[secondary]').textContent = entry.item.description || '';
                    root.querySelector('ha-icon').icon = entry.item.icon;
                }
                else if (!root.firstElementChild) {
                    root.innerHTML = `
        <style>
          paper-item {
              margin: -10px;
              padding: 0;
          }
        </style>
        <paper-item>
          <paper-item-body>
            ${entry.item.name}
          </paper-item-body>
        </paper-item>
        `;
                }
            };
        }
        open() {
            this.updateComplete.then(() => {
                var _a, _b;
                (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('vaadin-combo-box-light')) === null || _b === void 0 ? void 0 : _b.open();
            });
        }
        focus() {
            this.updateComplete.then(() => {
                var _a;
                ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('paper-input')).focus();
            });
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('items')) {
                if (!isEqual(this.items, changedProps.get('items')))
                    this.firstUpdated();
                else if (changedProps.size == 1)
                    return false;
            }
            return true;
        }
        firstUpdated() {
            (async () => await loadHaForm())();
            this._comboBox.items = this.items;
        }
        render() {
            return T `
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
          ${isDefined(this._value) && this.items.find(e => e.value == this._value)
            ? T `
                ${this.icons
                ? T `
                      <ha-icon slot="prefix" icon="${this.items.find(e => e.value == this._value).icon}"> </ha-icon>
                    `
                : ''}
                ${this.clearable
                ? T `
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} .path=${mdiClose}>
                      </ha-icon-button>
                    `
                : ''}
              `
            : ''}
          <ha-icon-button slot="suffix" class="toggle-button" .path=${this._opened ? mdiMenuUp : mdiMenuDown}>
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `;
        }
        _clearValue(ev) {
            ev.stopPropagation();
            this._setValue('');
        }
        get _value() {
            return isDefined(this.value) ? this.value : '';
        }
        _openedChanged(ev) {
            this._opened = ev.detail.value;
        }
        _valueChanged(ev) {
            const newValue = ev.detail.value;
            if (newValue !== this._value) {
                this._setValue(newValue);
            }
        }
        _setValue(value) {
            this.value = value;
            setTimeout(() => {
                A$1(this, 'value-changed', { value });
            }, 0);
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        e$3()
    ], SchedulerSelect.prototype, "label", void 0);
    __decorate([
        e$3()
    ], SchedulerSelect.prototype, "value", void 0);
    __decorate([
        e$3()
    ], SchedulerSelect.prototype, "items", void 0);
    __decorate([
        e$3()
    ], SchedulerSelect.prototype, "clearable", void 0);
    __decorate([
        e$3()
    ], SchedulerSelect.prototype, "icons", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerSelect.prototype, "disabled", void 0);
    __decorate([
        r$3()
    ], SchedulerSelect.prototype, "_opened", void 0);
    __decorate([
        e$3({ attribute: 'allow-custom-value', type: Boolean })
    ], SchedulerSelect.prototype, "allowCustomValue", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerSelect.prototype, "invalid", void 0);
    __decorate([
        o$5('vaadin-combo-box-light', true)
    ], SchedulerSelect.prototype, "_comboBox", void 0);
    SchedulerSelect = __decorate([
        n$4('scheduler-select')
    ], SchedulerSelect);

    let SchedulerSelector = class SchedulerSelector extends h$2 {
        constructor() {
            super(...arguments);
            this.items = [];
            this.value = [];
            this.label = '';
            this.invalid = false;
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('items')) {
                if (!isEqual(this.items, changedProps.get('items')))
                    this.firstUpdated();
            }
            return true;
        }
        firstUpdated() {
            //remove items from selection which are not in the list (anymore)
            if (this.value.some(e => !this.items.map(v => v.value).includes(e))) {
                this.value = this.value.filter(e => this.items.map(v => v.value).includes(e));
                A$1(this, 'value-changed', { value: this.value });
            }
        }
        render() {
            return T `
      <div class="chip-set">
        ${this.value.length
            ? this.value
                .map(val => this.items.find(e => e.value == val))
                .filter(isDefined)
                .map(e => T `
          <div class="chip">
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="hass:close" @click=${() => this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `)
            : ''}
        <scheduler-select
          .items=${this.items.filter(e => !this.value.includes(e.value))}
          label=${this.label}
          .icons=${false}
          .allowCustomValue=${true}
          @value-changed=${this._addClick}
          ?invalid=${this.invalid && this.value.length != this.items.length}
        >
        </scheduler-select>
      </div>
    `;
        }
        _removeClick(value) {
            this.value = this.value.filter(e => e !== value);
            A$1(this, 'value-changed', { value: this.value });
        }
        _addClick(ev) {
            ev.stopPropagation();
            const target = ev.target;
            const value = target.value;
            if (!this.value.includes(value))
                this.value = [...this.value, value];
            target.value = '';
            A$1(this, 'value-changed', { value: [...this.value] });
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        e$3()
    ], SchedulerSelector.prototype, "items", void 0);
    __decorate([
        e$3({ type: Array })
    ], SchedulerSelector.prototype, "value", void 0);
    __decorate([
        e$3()
    ], SchedulerSelector.prototype, "label", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerSelector.prototype, "invalid", void 0);
    SchedulerSelector = __decorate([
        n$4('scheduler-selector')
    ], SchedulerSelector);

    const getMatchTypes = (hass, filter) => {
        let output = {};
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Above))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Above]: {
                    value: EConditionMatchType.Above,
                    name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.above'),
                    icon: 'hass:greater-than',
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Below))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Below]: {
                    value: EConditionMatchType.Below,
                    name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.below'),
                    icon: 'hass:less-than',
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Equal))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Equal]: {
                    value: EConditionMatchType.Equal,
                    name: localize('ui.panel.conditions.equal_to', getLocale(hass)),
                    icon: 'hass:equal',
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Unequal))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Unequal]: {
                    value: EConditionMatchType.Unequal,
                    name: localize('ui.panel.conditions.unequal_to', getLocale(hass)),
                    icon: 'hass:not-equal-variant',
                } });
        return output;
    };
    let SchedulerOptionsCard = class SchedulerOptionsCard extends h$2 {
        constructor() {
            super(...arguments);
            this.addCondition = false;
            this.tags = [];
            this.startDate = '';
            this.endDate = '';
        }
        async firstUpdated() {
            var _a, _b, _c;
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.tags) {
                (async () => await loadHaForm())();
                const tagEntries = await fetchTags(this.hass);
                const existingTags = tagEntries.map(e => e.name);
                const configTags = AsArray(this.config.tags);
                this.tags = [...existingTags, ...configTags.filter(e => !existingTags.includes(e) && e != 'none')];
            }
            (await window.loadCardHelpers()).importMoreInfoControl('input_datetime');
            this.startDate = ((_b = this.schedule) === null || _b === void 0 ? void 0 : _b.start_date) || formatDate(new Date(), getLocale(this.hass), true);
            this.endDate = ((_c = this.schedule) === null || _c === void 0 ? void 0 : _c.end_date) || formatDate(new Date(), getLocale(this.hass), true);
        }
        render() {
            var _a, _b;
            if (!this.hass || !this.config || !this.schedule)
                return T ``;
            let repeatTypes = [
                {
                    name: this.hass.localize('ui.panel.config.automation.editor.actions.type.repeat.label'),
                    value: ERepeatType.Repeat,
                    icon: 'refresh',
                },
                {
                    name: this.hass.localize('ui.dialogs.more_info_control.vacuum.stop'),
                    value: ERepeatType.Pause,
                    icon: 'stop',
                },
                {
                    name: this.hass.localize('ui.common.delete'),
                    value: ERepeatType.Single,
                    icon: 'trash-can-outline',
                },
            ];
            if (isDefined(this.schedule.start_date)) {
                repeatTypes = repeatTypes.filter(e => e.value != ERepeatType.Repeat);
            }
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title
            ? typeof this.config.title == 'string'
                ? this.config.title
                : localize('ui.panel.common.title', getLocale(this.hass))
            : ''}
          </div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${!this.addCondition
            ? T `
                <div class="header">
                  ${this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.conditions')}
                  ${!this.schedule.timeslots[0].conditions || this.schedule.timeslots[0].conditions.length < 2
                ? ''
                : T `
                        <div class="switch">
                          ${localize('ui.panel.conditions.any', getLocale(this.hass))}
                          <ha-switch
                            style="margin: 0px 10px"
                            @change=${this.conditionTypeSwitchClick}
                            ?checked=${this.schedule.timeslots[0].condition_type == EConditionType.All}
                          ></ha-switch>
                          ${localize('ui.panel.conditions.all', getLocale(this.hass))}
                        </div>
                      `}
                </div>
                ${this.renderConditions()}

                <div class="condition-options">
                  <div style="flex: 1">
                    <mwc-button @click=${this.addConditionClick}>
                      <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
                      ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
                    </mwc-button>
                  </div>
                  <div class="track-conditions">
                    ${this.schedule.timeslots[0].stop &&
                this.schedule.timeslots[0].conditions &&
                this.schedule.timeslots[0].conditions.length > 0
                ? T `
                          <ha-checkbox
                            id="track_conditions"
                            ?checked=${this.schedule.timeslots[0].track_conditions}
                            @change=${this.trackConditionsClick}
                          ></ha-checkbox>
                          <span
                            @click=${() => this.shadowRoot.querySelector('#track_conditions').click()}
                          >
                            ${localize('ui.panel.conditions.track_conditions', getLocale(this.hass))}
                          </span>
                        `
                : ''}
                  </div>
                </div>

                <div class="header">${localize('ui.panel.options.period', getLocale(this.hass))}</div>
                <div class="checkbox-container">
                  <div class="checkbox">
                    <ha-checkbox ?checked=${isDefined(this.schedule.start_date)} @change=${this.toggleEnableDateRange}>
                    </ha-checkbox>
                  </div>
                  <div class="slider date-range">
                    <div>
                      <span>
                        ${PrettyPrintName(((_a = localize('ui.components.date.days_range', getLocale(this.hass))
                .split('{')
                .shift()) === null || _a === void 0 ? void 0 : _a.trim()) || '')}
                      </span>
                      <ha-date-input
                        value=${this.startDate}
                        .label=${this.hass.localize('ui.components.date-range-picker.start_date')}
                        @value-changed=${this._setStartDate}
                        ?disabled=${!isDefined(this.schedule.start_date)}
                      >
                      </ha-date-input>
                    </div>

                    <div>
                      <span>
                        ${PrettyPrintName(((_b = localize('ui.components.date.days_range', getLocale(this.hass))
                .split('}')[1]
                .split('{')
                .shift()) === null || _b === void 0 ? void 0 : _b.trim()) || '')}
                      </span>
                      <ha-date-input
                        value=${this.endDate}
                        .label=${this.hass.localize('ui.components.date-range-picker.end_date')}
                        @value-changed=${this._setEndDate}
                        ?disabled=${!isDefined(this.schedule.start_date)}
                      >
                      </ha-date-input>
                    </div>
                  </div>
                </div>

                <div class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}</div>
                <paper-input
                  no-label-float
                  value=${this.schedule.name || ''}
                  placeholder=${this.schedule.name
                ? ''
                : this.hass.localize('ui.components.area-picker.add_dialog.name')}
                  @value-changed=${this.updateName}
                ></paper-input>

                ${this.config.tags
                ? T `
                      <div class="header">${this.hass.localize('ui.panel.config.tag.caption')}</div>
                      <scheduler-selector
                        .items=${this.getTagOptions()}
                        .value=${this.schedule.tags || []}
                        @value-changed=${this.updateTags}
                        label=${this.hass.localize('ui.panel.config.tag.add_tag')}
                      >
                      </scheduler-selector>
                    `
                : ''}

                <div class="header">${localize('ui.panel.options.repeat_type', getLocale(this.hass))}</div>
                <button-group
                  .items=${repeatTypes}
                  value="${this.schedule.repeat_type}"
                  @change=${this.updateRepeatType}
                >
                </button-group>
              `
            : this.renderAddCondition()}
        </div>
        <div class="card-actions">
          ${!this.addCondition
            ? T `
                <mwc-button
                  @click=${this.saveClick}
                  ?disabled=${!this.schedule.timeslots.filter(e => e.actions.length).length}
                >
                  ${this.hass.localize('ui.common.save')}
                </mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize('ui.common.back')}</mwc-button
                >
              `
            : T `
                <mwc-button
                  @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity || !this.conditionMatchType || !isDefined(this.conditionValue)}
                  >${this.hass.localize('ui.common.save')}</mwc-button
                >
                ${this.editItem !== undefined
                ? T `
                      <mwc-button class="warning" @click=${this.deleteConditionClick}
                        >${this.hass.localize('ui.common.delete')}</mwc-button
                      >
                    `
                : ''}
                <mwc-button @click=${this.cancelConditionClick} style="float: right"
                  >${this.hass.localize('ui.common.cancel')}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `;
        }
        renderAddCondition() {
            if (!this.addCondition || !this.hass || !this.config)
                return T ``;
            if (!this.selectedEntity) {
                const hassEntities = computeEntities$1(this.hass, this.config, { filterActions: false, filterStates: true });
                const groups = entityGroups(hassEntities, this.config, this.hass);
                groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
                let entities = [];
                if (this.selectedGroup) {
                    entities = groups
                        .find(e => isEqual(e, this.selectedGroup))
                        .entities.map(e => parseEntity(e, this.hass, this.config));
                    entities.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
                }
                return T `
        <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>

        <button-group
          .items=${groups}
          .value=${groups.findIndex(e => isEqual(e, this.selectedGroup))}
          @change=${this.selectGroup}
        >
          ${localize('ui.panel.entity_picker.no_groups_defined', getLocale(this.hass))}
        </button-group>

        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <button-group
          .items=${entities}
          .value=${entities.findIndex(e => isEqual(e, this.selectedEntity))}
          @change=${this.selectEntity}
        >
          ${!this.selectedGroup
                ? localize('ui.panel.entity_picker.no_group_selected', getLocale(this.hass))
                : localize('ui.panel.entity_picker.no_entities_for_group', getLocale(this.hass))}
        </button-group>
      `;
            }
            else {
                const entity = this.selectedEntity;
                const states = computeStates(entity.id, this.hass, this.config);
                let availableMatchTypes;
                if ((states === null || states === void 0 ? void 0 : states.type) == EVariableType.Level)
                    availableMatchTypes = [EConditionMatchType.Above, EConditionMatchType.Below];
                else if ((states === null || states === void 0 ? void 0 : states.type) == EVariableType.List)
                    availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal];
                else {
                    const currentState = entity.id in this.hass.states ? this.hass.states[entity.id].state : null;
                    if (!currentState || ['unavailable', 'unknown'].includes(currentState))
                        availableMatchTypes = [
                            EConditionMatchType.Equal,
                            EConditionMatchType.Unequal,
                            EConditionMatchType.Above,
                            EConditionMatchType.Below,
                        ];
                    else if (!isNaN(Number(currentState)))
                        availableMatchTypes = [EConditionMatchType.Above, EConditionMatchType.Below];
                    else
                        availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal];
                }
                const matchTypes = getMatchTypes(this.hass, availableMatchTypes);
                return T `
        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <div style="display: flex; flex-direction: row; align-items: center">
          <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)">
            <ha-icon icon="${PrettyPrintIcon(entity.icon || DefaultEntityIcon)}"></ha-icon>
            ${PrettyPrintName(entity.name)}
          </mwc-button>
          <ha-icon-button
            .path=${mdiPencil}
            style="margin-left: 10px"
            @click=${() => {
                this.selectedEntity = undefined;
            }}
          >
          </ha-icon-button>
        </div>

        <div class="header">
          ${this.hass.localize('ui.panel.config.automation.editor.conditions.type.device.condition')}
        </div>
        <button-group
          .items=${Object.values(matchTypes)}
          value=${this.conditionMatchType}
          @change=${(ev) => (this.conditionMatchType = ev.target.value)}
        >
        </button-group>

        <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}</div>
        <scheduler-variable-picker
          .variable=${states}
          .value=${this.conditionValue}
          @value-changed=${(ev) => (this.conditionValue = ev.detail.value)}
        >
        </scheduler-variable-picker>
      `;
            }
        }
        selectGroup(ev) {
            this.selectedGroup = ev.detail;
            this.selectedEntity = undefined;
        }
        selectEntity(ev) {
            this.selectedEntity = ev.detail;
            this.conditionMatchType = undefined;
            this.conditionValue = undefined;
        }
        renderConditions() {
            if (!this.hass || !this.schedule)
                return T ``;
            const conditions = this.schedule.timeslots[0].conditions || [];
            if (!conditions.length)
                return T `
        <div class="text-field">${localize('ui.panel.conditions.no_conditions_defined', getLocale(this.hass))}</div>
      `;
            return conditions.map((item, num) => {
                const entity = parseEntity(item.entity_id, this.hass, this.config);
                const states = computeStates(item.entity_id, this.hass, this.config);
                return T `
        <div class="summary">
          <ha-icon icon="${entity.icon || DefaultEntityIcon}"></ha-icon>
          <span>
            ${PrettyPrintName(entity.name)} ${getMatchTypes(this.hass)[item.match_type].name.toLowerCase()}
            ${states
                ? states.type == EVariableType.List
                    ? listVariableDisplay(item.value, states)
                    : states.type == EVariableType.Level
                        ? levelVariableDisplay(item.value, states)
                        : ''
                : ''}
          </span>
          <ha-icon-button
            .path=${mdiPencil}
            @click=${() => {
                this.editConditionClick(num);
            }}
          >
          </ha-icon-button>
        </div>
      `;
            });
        }
        addConditionClick() {
            this.addCondition = true;
            this.selectedEntity = undefined;
            this.selectedGroup = undefined;
        }
        confirmConditionClick() {
            var _a;
            if (!this.selectedEntity ||
                !this.config ||
                !this.hass ||
                !this.schedule ||
                !this.conditionMatchType ||
                !isDefined(this.conditionValue))
                return;
            const condition = {
                entity_id: this.selectedEntity.id,
                match_type: this.conditionMatchType,
                value: this.conditionValue,
                attribute: 'state',
            };
            const conditions = ((_a = this.schedule.timeslots[0].conditions) === null || _a === void 0 ? void 0 : _a.length) ? [...this.schedule.timeslots[0].conditions] : [];
            const type = this.schedule.timeslots[0].condition_type
                ? this.schedule.timeslots[0].condition_type
                : EConditionType.Any;
            if (this.editItem === undefined)
                conditions.push(condition);
            else
                conditions.splice(this.editItem, 1, condition);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: this.schedule.timeslots.map(e => Object.assign(e, {
                    conditions: conditions,
                    condition_type: type,
                })) });
            this.addCondition = false;
            this.editItem = undefined;
        }
        cancelConditionClick() {
            this.addCondition = false;
            this.editItem = undefined;
        }
        editConditionClick(index) {
            if (!this.schedule || !this.schedule.timeslots[0].conditions || !this.hass || !this.config)
                return;
            const item = this.schedule.timeslots[0].conditions[index];
            if (!item)
                return;
            this.editItem = index;
            const hassEntities = computeEntities$1(this.hass, this.config, { filterActions: false, filterStates: true });
            const groups = entityGroups(hassEntities, this.config, this.hass);
            this.selectedGroup = groups.find(e => e.entities.includes(item.entity_id));
            this.selectedEntity = parseEntity(item.entity_id, this.hass, this.config);
            this.conditionMatchType = item.match_type;
            this.conditionValue = item.value;
            this.addCondition = true;
        }
        deleteConditionClick() {
            var _a;
            if (!this.config || !this.hass || !this.schedule || this.editItem === undefined)
                return;
            const conditions = ((_a = this.schedule.timeslots[0].conditions) === null || _a === void 0 ? void 0 : _a.length) ? [...this.schedule.timeslots[0].conditions] : [];
            conditions.splice(this.editItem, 1);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: this.schedule.timeslots.map(e => Object.assign(e, {
                    conditions: conditions,
                })) });
            this.addCondition = false;
            this.editItem = undefined;
        }
        conditionTypeSwitchClick(e) {
            if (!this.schedule)
                return;
            const checked = e.target.checked;
            const type = checked ? EConditionType.All : EConditionType.Any;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: this.schedule.timeslots.map(e => Object.assign(e, {
                    condition_type: type,
                })) });
        }
        trackConditionsClick(e) {
            if (!this.schedule)
                return;
            const checked = e.target.checked;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: this.schedule.timeslots.map(e => Object(Object.assign(Object.assign({}, e), { track_conditions: checked }))) });
        }
        _setStartDate(ev) {
            const value = String(ev.detail.value);
            if (!value)
                return;
            const startDate = stringToDate(value);
            const endDate = stringToDate(this.endDate);
            if (startDate > endDate) {
                this.schedule = Object.assign(Object.assign({}, this.schedule), { end_date: value });
                this.endDate = value;
            }
            this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: value });
            this.startDate = value;
        }
        _setEndDate(ev) {
            const value = String(ev.detail.value);
            if (!value)
                return;
            const startDate = stringToDate(this.startDate);
            const endDate = stringToDate(value);
            if (startDate > endDate) {
                this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: value });
                this.startDate = value;
            }
            this.schedule = Object.assign(Object.assign({}, this.schedule), { end_date: value });
            this.endDate = value;
        }
        toggleEnableDateRange(ev) {
            const checked = ev.target.checked;
            const datePickers = this.shadowRoot.querySelectorAll('ha-date-input');
            this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: checked ? this.startDate : undefined, end_date: checked ? this.endDate : undefined, repeat_type: checked
                    ? this.schedule.repeat_type == ERepeatType.Repeat
                        ? ERepeatType.Pause
                        : this.schedule.repeat_type
                    : this.schedule.repeat_type == ERepeatType.Pause
                        ? ERepeatType.Repeat
                        : this.schedule.repeat_type });
        }
        updateName(e) {
            const value = e.target.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { name: value });
        }
        updateRepeatType(e) {
            const value = e.target.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { repeat_type: value });
        }
        getTagOptions() {
            var _a;
            let output = [...this.tags];
            if ((_a = this.schedule) === null || _a === void 0 ? void 0 : _a.tags.length)
                output = [...output, ...this.schedule.tags.filter(e => !output.includes(e))];
            output.sort(sortAlphabetically);
            return output.map(e => Object({ name: e, value: e }));
        }
        updateTags(ev) {
            let value = ev.target.value;
            value = value.map(e => e.trim());
            value = value.filter(e => e != 'none');
            value.sort(sortAlphabetically);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { tags: value });
        }
        cancelClick() {
            if (this.addCondition) {
                this.addCondition = !this.addCondition;
            }
            else {
                const myEvent = new CustomEvent('cancelClick');
                this.dispatchEvent(myEvent);
            }
        }
        saveClick() {
            const myEvent = new CustomEvent('saveClick', {
                detail: this.schedule,
            });
            this.dispatchEvent(myEvent);
        }
        backClick() {
            const myEvent = new CustomEvent('backClick', {
                detail: this.schedule,
            });
            this.dispatchEvent(myEvent);
        }
    };
    SchedulerOptionsCard.styles = i `
    ${commonStyle}
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
  `;
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "schedule", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "selectedGroup", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "selectedEntity", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "conditionMatchType", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "conditionValue", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "editItem", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "addCondition", void 0);
    __decorate([
        e$3()
    ], SchedulerOptionsCard.prototype, "tags", void 0);
    __decorate([
        r$3()
    ], SchedulerOptionsCard.prototype, "startDate", void 0);
    __decorate([
        r$3()
    ], SchedulerOptionsCard.prototype, "endDate", void 0);
    SchedulerOptionsCard = __decorate([
        n$4('scheduler-options-card')
    ], SchedulerOptionsCard);

    let SchedulerCardEditor = class SchedulerCardEditor extends h$2 {
        constructor() {
            super(...arguments);
            this.scheduleEntities = [];
            this._cardTab = false;
            this.selectedDomain = '';
        }
        setConfig(config) {
            this._config = config;
        }
        async firstUpdated() {
            await loadHaForm();
            this.scheduleEntities = (await fetchSchedules(this.hass)).map(e => e.entity_id);
            const tagOptions = (await fetchTags(this.hass)).map(e => e.name);
            tagOptions.sort(sortAlphabetically);
            this.tagOptions = tagOptions;
        }
        render() {
            if (!this.hass || !this._config) {
                return T ``;
            }
            return T `
      <mwc-tab-bar .activeIndex=${this._cardTab ? 1 : 0} @MDCTabBar:activated=${this._selectTab}>
        <mwc-tab .label=${localize('ui.panel.card_editor.tabs.entities', getLocale(this.hass))}></mwc-tab>
        <mwc-tab .label=${localize('ui.panel.card_editor.tabs.other', getLocale(this.hass))}></mwc-tab>
      </mwc-tab-bar>

      <div class="card-config">
        ${!this._cardTab
            ? T `
              <div class="header">
                ${localize('ui.panel.card_editor.fields.entities.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.entities.description', getLocale(this.hass))}
              </div>
              ${this.getDomainSwitches()}
            `
            : T `
              <div class="header">${localize('ui.panel.card_editor.fields.title.heading', getLocale(this.hass))}</div>
              <button-group
                .items=${[
                {
                    name: localize('ui.panel.card_editor.fields.title.options.standard', getLocale(this.hass)),
                    value: 'standard',
                },
                {
                    name: localize('ui.panel.card_editor.fields.title.options.hidden', getLocale(this.hass)),
                    value: 'hidden',
                },
                {
                    name: localize('ui.panel.card_editor.fields.title.options.custom', getLocale(this.hass)),
                    value: 'custom',
                },
            ]}
                value=${this.getTitleOption()}
                @change=${(ev) => this._setTitleFormatOption(ev.target.value)}
              >
              </button-group>
              ${typeof this._config.title == 'string'
                ? T `
                    <paper-input
                      label=${localize('ui.panel.card_editor.fields.title.custom_title', getLocale(this.hass))}
                      .value=${this._config.title}
                      @value-changed=${(ev) => {
                    this._updateConfig({ title: String(ev.target.value) });
                }}
                    ></paper-input>
                  `
                : ''}

              <div class="header">
                ${localize('ui.panel.card_editor.fields.discover_existing.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.discover_existing.description', getLocale(this.hass))}
              </div>
              <ha-switch
                ?checked=${this._config.discover_existing !== false}
                @change=${(ev) => {
                this._updateConfig({ discover_existing: ev.target.checked });
            }}
              >
              </ha-switch>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.time_step.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.time_step.description', getLocale(this.hass))}
              </div>
              <variable-slider
                min="1"
                max="30"
                step="1"
                value=${this._config.time_step || DefaultTimeStep}
                unit=" min"
                ?optional=${false}
                ?disabled=${false}
                @value-changed=${(ev) => {
                this._updateConfig({ time_step: Number(ev.detail.value) });
            }}
              >
              </variable-slider>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.sort_by.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.sort_by.description', getLocale(this.hass))}
              </div>

              <div>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.relative_time', getLocale(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('relative-time')}
                    value="relative-time"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.title', getLocale(this.hass))}
                >
                  <ha-radio
                    name="sort_by"
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('title')}
                    value="title"
                    @change=${this._setSortBy}
                  ></ha-radio>
                </ha-formfield>
              </div>

              <div>
                <ha-formfield
                  label=${localize('ui.panel.card_editor.fields.sort_by.options.state', getLocale(this.hass))}
                >
                  <ha-checkbox
                    ?checked=${AsArray(this._config.sort_by || DefaultCardConfig.sort_by).includes('state')}
                    value="state"
                    @change=${this._setSortBy}
                  ></ha-checkbox>
                </ha-formfield>
              </div>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.display_format_primary.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.display_format_primary.description', getLocale(this.hass))}
              </div>

              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_primary.options.default', getLocale(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${(this._config.display_options || DefaultCardConfig.display_options).primary_info ==
                'default'}
                  value="default"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>
              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_primary.options.entity_action', getLocale(this.hass))}
              >
                <ha-radio
                  name="primary_info"
                  ?checked=${(this._config.display_options || DefaultCardConfig.display_options).primary_info ==
                '{entity}: {action}'}
                  value="{entity}: {action}"
                  @change=${this._setDisplayOptionsPrimary}
                ></ha-radio>
              </ha-formfield>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.display_format_secondary.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.display_format_secondary.description', getLocale(this.hass))}
              </div>

              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_secondary.options.relative_time', getLocale(this.hass))}
              >
                <ha-checkbox
                  ?checked=${AsArray((this._config.display_options || DefaultCardConfig.display_options).secondary_info).includes('relative-time')}
                  value="relative-time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_secondary.options.time', getLocale(this.hass))}
              >
                <ha-checkbox
                  ?checked=${AsArray((this._config.display_options || DefaultCardConfig.display_options).secondary_info).includes('time')}
                  value="time"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_secondary.options.days', getLocale(this.hass))}
              >
                <ha-checkbox
                  ?checked=${AsArray((this._config.display_options || DefaultCardConfig.display_options).secondary_info).includes('days-tasks')}
                  value="days"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <ha-formfield
                label=${localize('ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks', getLocale(this.hass))}
              >
                <ha-checkbox
                  ?checked=${AsArray((this._config.display_options || DefaultCardConfig.display_options).secondary_info).includes('additional-tasks')}
                  value="additional-tasks"
                  @change=${this._setDisplayOptionsSecondary}
                ></ha-checkbox>
              </ha-formfield>

              <div class="header">
                ${localize('ui.panel.card_editor.fields.show_header_toggle.heading', getLocale(this.hass))}
              </div>
              <div class="text-field">
                ${localize('ui.panel.card_editor.fields.show_header_toggle.description', getLocale(this.hass))}
              </div>
              <ha-switch
                ?checked=${this._config.show_header_toggle}
                @change=${(ev) => {
                this._updateConfig({ show_header_toggle: ev.target.checked });
            }}
              >
              </ha-switch>

              ${this.tagOptions !== undefined
                ? T `
                    <div class="header">
                      ${localize('ui.panel.card_editor.fields.tags.heading', getLocale(this.hass))}
                    </div>
                    <div class="text-field">
                      ${localize('ui.panel.card_editor.fields.tags.description', getLocale(this.hass))}
                    </div>
                    <scheduler-selector
                      .items=${this.getTagOptions()}
                      .value=${AsArray(this._config.tags)}
                      @value-changed=${this.updateTags}
                      label=${this.hass.localize('ui.panel.config.tag.add_tag')}
                    >
                    </scheduler-selector>
                  `
                : ''}
            `}
      </div>
    `;
        }
        _selectTab(ev) {
            this._cardTab = ev.detail.index === 1;
        }
        _updateConfig(changes) {
            if (!this._config)
                return;
            this._config = Object.assign(Object.assign({}, this._config), changes);
            A$1(this, 'config-changed', { config: this._config });
        }
        _setTitleFormatOption(option) {
            var _a;
            if (!this.hass)
                return;
            if (option == 'standard')
                this._updateConfig({ title: true });
            else if (option == 'hidden')
                this._updateConfig({ title: false });
            else
                this._updateConfig({
                    title: typeof ((_a = this._config) === null || _a === void 0 ? void 0 : _a.title) === 'string'
                        ? this._config.title
                        : localize('ui.panel.common.title', getLocale(this.hass)),
                });
        }
        getTitleOption() {
            if (!this.hass || !this._config)
                return '';
            if (typeof this._config.title == 'string')
                return 'custom';
            return this._config.title ? 'standard' : 'hidden';
        }
        updateTags(ev) {
            if (!this._config || !this.hass)
                return;
            let value = ev.target.value;
            value = value.map(e => e.trim());
            value.sort(sortAlphabetically);
            this._updateConfig({ tags: value });
        }
        getTagOptions() {
            if (!this._config || !this.hass)
                return [];
            let options = this.tagOptions || [];
            if (this._config.tags) {
                const configTags = AsArray(this._config.tags);
                options = [...options, ...configTags.filter(e => !options.includes(e))];
            }
            return options.map(e => Object({ name: e, value: e }));
        }
        _setSortBy(ev) {
            var _a;
            const checked = ev.target.checked;
            const value = ev.target.value;
            let config = AsArray(((_a = this._config) === null || _a === void 0 ? void 0 : _a.sort_by) || DefaultCardConfig.sort_by);
            if (value != 'state' && checked)
                config = config.filter(e => e == 'state');
            if (!config.includes(value) && checked)
                config = [...config, value];
            if (config.includes(value) && !checked)
                config = config.filter(e => e != value);
            this._updateConfig({ sort_by: config });
        }
        _setDisplayOptionsPrimary(ev) {
            var _a;
            const value = ev.target.value;
            const displayOptions = Object.assign(Object.assign({}, (((_a = this._config) === null || _a === void 0 ? void 0 : _a.display_options) || DefaultCardConfig.display_options)), { primary_info: value });
            this._updateConfig({ display_options: displayOptions });
        }
        _setDisplayOptionsSecondary(ev) {
            var _a;
            const value = ev.target.value;
            const checked = ev.target.checked;
            let displayOptions = Object.assign({}, (((_a = this._config) === null || _a === void 0 ? void 0 : _a.display_options) || DefaultCardConfig.display_options));
            let secondaryInfo = AsArray(displayOptions.secondary_info || []);
            secondaryInfo = checked ? Array.from(new Set([...secondaryInfo, value])) : secondaryInfo.filter(e => e !== value);
            secondaryInfo.sort((a, b) => {
                const ranking = {
                    'relative-time': 1,
                    time: secondaryInfo.includes('relative-time') ? 3 : 2,
                    days: secondaryInfo.includes('relative-time') ? 2 : 3,
                    'additional-tasks': 4,
                };
                const rankA = Object.keys(ranking).includes(a) ? ranking[a] : 5;
                const rankB = Object.keys(ranking).includes(b) ? ranking[b] : 5;
                if (rankA > rankB)
                    return 1;
                if (rankA < rankB)
                    return -1;
                return 0;
            });
            displayOptions = Object.assign(Object.assign({}, displayOptions), { secondary_info: [...secondaryInfo] });
            this._updateConfig({ display_options: displayOptions });
        }
        getDomainSwitches() {
            if (!this._config || !this.hass)
                return;
            const entities = computeEntities$1(this.hass, Object.assign(Object.assign({}, DefaultCardConfig), { include: ['*'] }), { filterActions: true, filterStates: true })
                .filter(e => g$1(e) !== 'switch' || !this.scheduleEntities.includes(e))
                .map(e => parseEntity(e, this.hass, { include: ['*'] }))
                .filter(e => standardStates(e.id, this.hass) || computeActions(e.id, this.hass, DefaultCardConfig));
            const domainList = entities.map(e => g$1(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);
            domainList.sort((a, b) => (a.trim().toLowerCase() < b.trim().toLowerCase() ? -1 : 1));
            return domainList.map(domain => {
                var _a;
                const count = entities.filter(e => g$1(e.id) == domain).length;
                const domainEntities = entities.filter(e => g$1(e.id) == domain);
                const includedCount = domainEntities.filter(e => entityFilter(e.id, this._config)).length;
                if (!count)
                    return ``;
                return T `
        <div class="row" @click=${() => this.toggleShowDomain(domain)}>
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${localize('ui.panel.card_editor.fields.entities.included_number', getLocale(this.hass), ['{number}', '{total}'], [includedCount, count])}
            </div>
          </div>
          <ha-switch
            @click=${(ev) => ev.stopPropagation()}
            @change=${(ev) => this.toggleSelectEntity(domain, ev.target.checked)}
            ?checked=${entityFilter(domain, this._config)}
            ?disabled=${entityFilter(domain, { groups: (_a = this._config) === null || _a === void 0 ? void 0 : _a.groups })}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain == domain
                ? T `
              <div class="divider"></div>
              ${domainEntities.map(entity => {
                    var _a, _b;
                    return T `
                  <div class="row" @click=${() => this.toggleSelectEntity(entity.id)}>
                    <ha-icon icon="${entity.icon}"></ha-icon>
                    <div class="info">
                      ${entity.name}
                      <div class="secondary">
                        ${entity.id}
                      </div>
                    </div>
                    <ha-switch
                      ?checked=${entityFilter(entity.id, this._config)}
                      ?disabled=${entityFilter(entity.id, { groups: (_a = this._config) === null || _a === void 0 ? void 0 : _a.groups }) ||
                        entityFilter(domain, { groups: (_b = this._config) === null || _b === void 0 ? void 0 : _b.groups })}
                    ></ha-switch>
                  </div>
                `;
                })}
              <div class="divider"></div>
            `
                : ''}
      `;
            });
        }
        toggleShowDomain(domain) {
            if (!this._config || !this.hass)
                return;
            if (this.selectedDomain != domain) {
                this.selectedDomain = domain;
            }
            else {
                this.selectedDomain = '';
            }
        }
        toggleSelectEntity(entity_id, newValue) {
            if (!this._config || !this.hass)
                return;
            const isIncluded = entityFilter(entity_id, this._config);
            if (newValue === undefined)
                newValue = !isIncluded;
            const entityDomain = g$1(entity_id);
            let include = [...(this._config.include || [])];
            let exclude = [...(this._config.exclude || [])];
            if (!isIncluded && newValue) {
                if (exclude.includes(entity_id))
                    exclude = exclude.filter(e => e != entity_id);
                if (!include.includes(entity_id))
                    include = [...include, entity_id];
            }
            else if (isIncluded && !newValue) {
                if ((entityDomain && include.includes(entityDomain)) ||
                    entityFilter(entity_id, { customize: this._config.customize }) ||
                    (entityDomain && entityFilter(entityDomain, { customize: this._config.customize })))
                    exclude = [...exclude, entity_id];
                if (include.includes(entity_id))
                    include = include.filter(e => e != entity_id);
            }
            else
                return;
            include.sort(sortAlphabetically);
            exclude.sort(sortAlphabetically);
            this._updateConfig({ include: include, exclude: exclude });
        }
        static get styles() {
            return i `
      ${commonStyle}
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
    `;
        }
    };
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "_config", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "scheduleEntities", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "tagOptions", void 0);
    __decorate([
        r$3()
    ], SchedulerCardEditor.prototype, "_cardTab", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "selectedDomain", void 0);
    SchedulerCardEditor = __decorate([
        n$4('scheduler-card-editor')
    ], SchedulerCardEditor);

    let DialogError = class DialogError extends h$2 {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}> </ha-icon-button>
            <span slot="title">
              ${this.hass.localize('state_badge.default.error')}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.error || ''}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        static get styles() {
            return i `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], DialogError.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], DialogError.prototype, "_params", void 0);
    DialogError = __decorate([
        n$4('dialog-error')
    ], DialogError);

    var dialogError = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogError () { return DialogError; }
    });

    let DialogDeleteDefective = class DialogDeleteDefective extends h$2 {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.cancel();
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}> </ha-icon-button>
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
          ${this.hass.localize('ui.dialogs.generic.cancel')}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left; --mdc-theme-primary: var(--error-color)"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this.hass.localize('ui.common.delete')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        confirmClick() {
            this._params.confirm();
        }
        cancelClick() {
            this._params.cancel();
        }
        static get styles() {
            return i `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], DialogDeleteDefective.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], DialogDeleteDefective.prototype, "_params", void 0);
    DialogDeleteDefective = __decorate([
        n$4('dialog-delete-defective')
    ], DialogDeleteDefective);

    var dialogDeleteDefective = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogDeleteDefective () { return DialogDeleteDefective; }
    });

    const migrateActionConfig = (config, entities, actions, hass) => {
        if (!config)
            return null;
        const action = importAction(config, hass);
        let match = actions.find(e => compareActions(e, action, true));
        if (!match)
            return null;
        let output = entities.map(e => assignAction(e, match));
        output = Object.keys(match.variables || {})
            .filter(k => Object.keys(config.service_data || {}).includes(k))
            .reduce((output, variable) => {
            if (!output)
                return output;
            switch (match.variables[variable].type) {
                case EVariableType.Level:
                    //keep the selected level variable while maintaining min/max/step size/scale factor
                    const levelVariable = match.variables[variable];
                    let val = Number(config.service_data[variable]);
                    val = val / levelVariable.scale_factor;
                    val = Math.round(val / levelVariable.step) * levelVariable.step;
                    val = parseFloat(val.toPrecision(12));
                    if (val > levelVariable.max)
                        val = levelVariable.max;
                    else if (val < levelVariable.min)
                        val = levelVariable.min;
                    val = val * levelVariable.scale_factor;
                    val = parseFloat(val.toFixed(2));
                    return output.map(e => Object.assign(e, { service_data: Object.assign(Object.assign({}, e.service_data), { [variable]: val }) }));
                case EVariableType.List:
                    const listVariable = match.variables[variable];
                    if (listVariable.options.some(e => e.value == config.service_data[variable]))
                        //keep the selected list variable if it is in common
                        return output.map(e => Object.assign(e, { service_data: Object.assign(Object.assign({}, e.service_data), { [variable]: config.service_data[variable] }) }));
                    else
                        return null;
                case EVariableType.Text:
                    //keep the selected text variable
                    return output.map(e => Object.assign(e, { service_data: Object.assign(Object.assign({}, e.service_data), { [variable]: config.service_data[variable] }) }));
                default:
                    return output;
            }
        }, output);
        return output;
    };

    window.customCards = window.customCards || [];
    window.customCards.push({
        type: 'scheduler-card',
        name: 'Scheduler Card',
        description: 'Card to manage schedule entities made with scheduler-component.',
    });
    console.info(`%c  SCHEDULER-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
    exports.SchedulerCard = class SchedulerCard extends h$2 {
        constructor() {
            super(...arguments);
            this._view = EViews.Overview;
            this.actions = [];
            this.translationsLoaded = false;
            this.editItem = null;
        }
        static getConfigElement() {
            return document.createElement('scheduler-card-editor');
        }
        set hass(hass) {
            this._hass = hass;
        }
        firstUpdated() {
            const hass = this._hass;
            if (hass.localize('ui.panel.config.automation.editor.actions.name'))
                this.translationsLoaded = true;
            else {
                const el = document.querySelector('home-assistant');
                el._loadFragmentTranslations(hass.language, 'config').then(() => {
                    this._hass.localize;
                });
            }
        }
        shouldUpdate(changedProps) {
            const oldHass = changedProps.get('_hass');
            if (oldHass && changedProps.size == 1) {
                if (!oldHass.localize('ui.panel.config.automation.editor.actions.name')) {
                    this.translationsLoaded = true;
                    return true;
                }
                else if (this._view == EViews.Overview)
                    return true;
                return false;
            }
            return true;
        }
        setConfig(userConfig) {
            ValidateConfig(userConfig);
            const config = Object.assign(Object.assign({}, DefaultCardConfig), userConfig);
            this._config = config;
        }
        getCardSize() {
            return 9;
        }
        render() {
            if (!this._hass || !this._config || !this.translationsLoaded)
                return T ``;
            if (this._view == EViews.Overview) {
                return T `
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `;
            }
            else if (this._view == EViews.NewSchedule) {
                return T `
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entities=${this.entities}
          .schedule=${this.schedule}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `;
            }
            else if (this._view == EViews.TimePicker || this._view == EViews.TimeScheme) {
                return T `
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .schedule=${this.schedule}
          .entities=${this.entities}
          .actions=${this.actions}
          ?timeslots=${this._view == EViews.TimeScheme}
          ?editItem=${this.editItem !== null}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `;
            }
            else if (this._view == EViews.Options) {
                return T `
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .schedule=${this.schedule}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${this._saveItemClick}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `;
            }
            else
                return T ``; //shouldnt happen!
        }
        _addItemClick() {
            this._view = EViews.NewSchedule;
            this.editItem = null;
            this.entities = [];
            this.actions = [];
            this.schedule = undefined;
        }
        _cancelEditClick() {
            this._view = EViews.Overview;
            this.editItem = null;
        }
        _confirmItemClick(ev) {
            if (!this._hass || !this._config)
                return;
            const entities = ev.detail.entities;
            this.entities = entities.map(e => parseEntity(e, this._hass, this._config));
            const timeSchemeSelected = Boolean(ev.detail.timeSchemeSelected);
            const action = ev.detail.action;
            const oldSchedule = this.schedule;
            const defaultTags = AsArray(this._config.tags).length == 1 ? AsArray(this._config.tags).slice(0, 1) : [];
            if (!timeSchemeSelected) {
                this.actions = [action];
                const defaultTimeslot = {
                    start: '12:00:00',
                    actions: entities.map(e => assignAction(e, this.actions[0])),
                };
                this.schedule = oldSchedule
                    ? Object.assign(Object.assign({}, oldSchedule), { timeslots: oldSchedule.timeslots.length == 1 && !oldSchedule.timeslots[0].stop
                            ? [
                                Object.assign(Object.assign({}, oldSchedule.timeslots[0]), { actions: migrateActionConfig(oldSchedule.timeslots[0].actions[0], entities, this.actions, this._hass) ||
                                        defaultTimeslot.actions }),
                            ]
                            : [defaultTimeslot] }) : {
                    weekdays: ['daily'],
                    timeslots: [defaultTimeslot],
                    repeat_type: ERepeatType.Repeat,
                    tags: defaultTags,
                };
                this._view = EViews.TimePicker;
            }
            else {
                this.actions = computeActions(entities, this._hass, this._config);
                const defaultTimeslots = [
                    {
                        start: '00:00:00',
                        stop: '08:00:00',
                        actions: [],
                    },
                    {
                        start: '08:00:00',
                        stop: '16:00:00',
                        actions: [],
                    },
                    {
                        start: '16:00:00',
                        stop: '00:00:00',
                        actions: [],
                    },
                ];
                if (oldSchedule) {
                    //migrate existing schedule
                    const actions = oldSchedule.timeslots
                        .map(e => e.actions[0])
                        .map(v => migrateActionConfig(v, entities, this.actions, this._hass));
                    this.schedule = Object.assign(Object.assign({}, oldSchedule), { timeslots: oldSchedule.timeslots.length > 1 && oldSchedule.timeslots.every(e => e.stop)
                            ? oldSchedule.timeslots.map((slot, i) => Object.assign(slot, { actions: actions[i] || [] }))
                            : defaultTimeslots });
                }
                else {
                    this.schedule = {
                        weekdays: ['daily'],
                        timeslots: defaultTimeslots,
                        repeat_type: ERepeatType.Repeat,
                        tags: defaultTags,
                    };
                }
                this._view = EViews.TimeScheme;
            }
        }
        _editActionClick(ev) {
            this.schedule = ev.detail;
            this._view = EViews.NewSchedule;
        }
        async _saveItemClick(ev) {
            if (!this._hass)
                return;
            let schedule = ev.detail;
            schedule = Object.assign(Object.assign({}, schedule), { timeslots: schedule.timeslots
                    .map(slot => {
                    var _a;
                    if (!slot.actions || !slot.actions.length)
                        return null;
                    if (slot.actions.some(e => !e.entity_id || g$1(e.entity_id || '') == 'notify')) {
                        slot = Object.assign(Object.assign({}, slot), { actions: slot.actions.map(action => !action.entity_id || g$1(action.entity_id || '') == 'notify'
                                ? omit(action, 'entity_id')
                                : action) });
                    }
                    if (!slot.stop)
                        slot = omit(slot, 'stop');
                    if (!((_a = slot.conditions) === null || _a === void 0 ? void 0 : _a.length))
                        slot = omit(slot, 'conditions', 'condition_type');
                    return slot;
                })
                    .filter(isDefined) });
            if (this.editItem) {
                const oldSchedule = await fetchScheduleItem(this._hass, this.editItem);
                if (isEqual(omit(schedule, 'timeslots'), omit(pick(oldSchedule, Object.keys(schedule)), 'timeslots')) &&
                    schedule.timeslots.length == oldSchedule.timeslots.length &&
                    schedule.timeslots.every((slot, i) => isEqual(slot, oldSchedule.timeslots[i]))) {
                    // don't save if there are no changes
                    this.editItem = null;
                    this._view = EViews.Overview;
                }
                else {
                    if (!oldSchedule.enabled)
                        this._hass.callService('switch', 'turn_on', { entity_id: oldSchedule.entity_id });
                    if (IsDefaultName(schedule.name))
                        schedule = Object.assign(Object.assign({}, schedule), { name: '' });
                    editSchedule(this._hass, Object.assign(Object.assign({}, schedule), { schedule_id: this.editItem }))
                        .catch(e => handleError(e, this))
                        .then(() => {
                        this.editItem = null;
                        this._view = EViews.Overview;
                    });
                }
            }
            else {
                saveSchedule(this._hass, schedule)
                    .catch(e => handleError(e, this))
                    .then(() => {
                    this._view = EViews.Overview;
                });
            }
        }
        _deleteItemClick() {
            if (!this.editItem || !this._hass)
                return;
            const entity_id = this.editItem;
            deleteSchedule(this._hass, entity_id)
                .catch(e => handleError(e, this))
                .then(() => {
                this.editItem = null;
                this._view = EViews.Overview;
            });
        }
        async _editItemClick(ev) {
            if (!this._hass || !this._config)
                return;
            const data = await fetchScheduleItem(this._hass, ev.detail);
            if (!data)
                return;
            const entities = unique(flatten(data.timeslots.map(e => e.actions.map(e => e.entity_id || e.service))));
            this.entities = entities.map(e => parseEntity(e, this._hass, this._config));
            let actions = computeActions(entities, this._hass, this._config);
            const usedActions = unique(flatten(data.timeslots.map(e => e.actions)));
            let extraActions = usedActions.filter(e => !actions.some(a => compareActions(a, e, true)));
            if (extraActions.length) {
                //actions that are not in the card
                unique(extraActions).forEach(e => actions.push(importAction(e, this._hass)));
            }
            this.actions = actions;
            this.schedule = {
                weekdays: data.weekdays,
                timeslots: data.timeslots,
                repeat_type: data.repeat_type,
                name: data.name,
                tags: data.tags || [],
                start_date: data.start_date,
                end_date: data.end_date,
            };
            this.editItem = data.schedule_id;
            if (!this.entities.length || !this.schedule.timeslots.length) {
                const result = await new Promise(resolve => {
                    A$1(this, 'show-dialog', {
                        dialogTag: 'dialog-delete-defective',
                        dialogImport: () => Promise.resolve().then(function () { return dialogDeleteDefective; }),
                        dialogParams: {
                            cancel: () => {
                                resolve(false);
                            },
                            confirm: () => {
                                resolve(true);
                            },
                        },
                    });
                });
                if (result)
                    this._deleteItemClick();
                else
                    this._cancelEditClick();
                return;
            }
            if (this.schedule.timeslots.every(e => e.stop)) {
                this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: calculateTimeline(this.schedule.timeslots, this._hass) });
                if (!this.actions.length)
                    handleError({ error: '', body: { message: `Could not compute actions for the schedule #${ev.detail}.` } }, this);
                else
                    this._view = EViews.TimeScheme;
            }
            else {
                this.actions = this.actions
                    .filter(e => usedActions.find(a => compareActions(e, a, true)))
                    .reduce((_acc, e) => [e], []);
                if (!this.actions.length)
                    handleError({ error: '', body: { message: `Could not compute actions for schedule #${ev.detail}.` } }, this);
                else
                    this._view = EViews.TimePicker;
            }
        }
        _gotoOptionsClick(ev) {
            this.schedule = ev.detail;
            this._view = EViews.Options;
        }
        _optionsBackClick(ev) {
            this.schedule = ev.detail;
            if (this.schedule.timeslots.every(e => e.stop))
                this._view = EViews.TimeScheme;
            else
                this._view = EViews.TimePicker;
        }
    };
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "_config", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "_hass", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "_view", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "entities", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "actions", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "schedule", void 0);
    __decorate([
        e$3()
    ], exports.SchedulerCard.prototype, "translationsLoaded", void 0);
    exports.SchedulerCard = __decorate([
        n$4('scheduler-card')
    ], exports.SchedulerCard);

    return exports;

}({}));
