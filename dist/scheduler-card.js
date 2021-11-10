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

    var a$3=function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleDateString(t.language,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")},r$4=function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleString(t.language,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")},n$5=function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleTimeString(t.language,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};var m$1;function p$1(e){return e.substr(0,e.indexOf("."))}function g$1(e){return e.substr(e.indexOf(".")+1)}function _$1(e){return p$1(e.entity_id)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(m$1||(m$1={}));var y$1=function(e,t,a){var r;switch(null==t?void 0:t.number_format){case m$1.comma_decimal:r=["en-US","en"];break;case m$1.decimal_comma:r=["de","es","it"];break;case m$1.space_comma:r=["fr","sv","cs"];break;case m$1.system:r=void 0;break;default:r=null==t?void 0:t.language;}if(Number.isNaN=Number.isNaN||function e(t){return "number"==typeof t&&e(t)},!Number.isNaN(Number(e))&&Intl&&(null==t?void 0:t.number_format)!==m$1.none)try{return new Intl.NumberFormat(r,w$1(e,a)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,w$1(e,a)).format(Number(e))}return e?e.toString():""},w$1=function(e,t){var a=t||{};if("string"!=typeof e)return a;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var r=e.indexOf(".")>-1?e.split(".")[1].length:0;a.minimumFractionDigits=r,a.maximumFractionDigits=r;}return a};function k$1(e,t,s,i){var o=void 0!==i?i:t.state;if("unknown"===o||"unavailable"===o)return e("state.default."+o);if(t.attributes.unit_of_measurement)return y$1(o,s)+" "+t.attributes.unit_of_measurement;var c=_$1(t);if("input_datetime"===c){var u;if(!t.attributes.has_time)return u=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),a$3(u,s);if(!t.attributes.has_date){var l=new Date;return u=new Date(l.getFullYear(),l.getMonth(),l.getDay(),t.attributes.hour,t.attributes.minute),n$5(u,s)}return u=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),r$4(u,s)}return "humidifier"===c&&"on"===o&&t.attributes.humidity?t.attributes.humidity+" %":"counter"===c||"number"===c?y$1(o,s):t.attributes.device_class&&e("component."+c+".state."+t.attributes.device_class+"."+t.state)||e("component."+c+".state._."+t.state)||t.state}var R$1=function(e,t,a,r){r=r||{},a=null==a?{}:a;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,e.dispatchEvent(n),n},z$1={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function U(e,t){if(e in z$1)return z$1[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return "hass:bell-plus";case"armed_night":return "hass:bell-sleep";case"disarmed":return "hass:bell-outline";case"triggered":return "hass:bell-ring";default:return "hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return "closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return "hass:emoticon-dead";case"sleeping":return "hass:sleep";case"initializing":return "hass:timer-sand";default:return "hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"hass:bookmark"}}var ee={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},te={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return U("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in ee)return ee[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return "hass:battery-unknown";var r=10*Math.round(a/10);return r>=100?"hass:battery":r<=0?"hass:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return "°C"===n||"°F"===n?"hass:thermometer":U("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?U("input_datetime"):"hass:calendar":"hass:clock"}},ae=function(e){if(!e)return "hass:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=p$1(e.entity_id);return t in te?te[t](e):U(t,e.state)};

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

    const CARD_VERSION = 'v2.2.2';
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
        type: "scheduler-card",
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
            primary_info: "{entity}: {action}",
            secondary_info: "relative-time",
            icon: "action"
        },
        tags: []
    };
    const WebsocketEvent = "scheduler_updated";

    function stringToTime(string) {
        if (string.match(/^([0-9:]+)$/)) {
            const parts = string.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
        }
        else {
            const ts = new Date(string);
            return ts.getHours() * 3600
                + ts.getMinutes() * 60
                + ts.getSeconds();
        }
    }
    function timeToString(time) {
        const hours = Math.floor(time / 3600);
        time -= hours * 3600;
        const minutes = Math.floor(time / 60);
        time -= minutes * 60;
        const seconds = Math.round(time);
        return String(hours % 24).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
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
            offset: match[3]
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
            if (!(keys.includes(key))) {
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
        if (arr.every((val) => !Array.isArray(val))) {
            return arr.slice();
        }
        return arr
            .reduce((acc, val) => acc
            .concat(Array.isArray(val) ? flatten(val) : val), []);
    }
    function unique(arr) {
        let res = [];
        arr.forEach(item => {
            if (!res.find(e => typeof item === "object" ? isEqual(e, item) : e === item))
                res.push(item);
        });
        return res;
    }
    function isDefined(value) {
        return value !== null && value !== undefined;
    }
    function isEqual(...arr) {
        return arr.every(e => JSON.stringify(e) === JSON.stringify(arr[0]));
    }
    function sortAlphabetically(a, b) {
        const stringVal = (a) => {
            if (typeof a === "object") {
                return a.name !== undefined
                    ? String(a.name).trim().toLowerCase()
                    : JSON.stringify(a);
            }
            else
                return String(a).trim().toLowerCase();
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
    function calculateTimeline(entries) {
        //TBD implementation for sun
        entries.sort((a, b) => {
            if (stringToTime(a.start) > stringToTime(b.start))
                return 1;
            else if (stringToTime(a.start) < stringToTime(b.start))
                return -1;
            else
                return stringToTime(a.stop) > stringToTime(b.stop) ? 1 : -1;
        });
        entries = entries.map(e => stringToTime(e.stop) < stringToTime(e.start)
            ? Object.assign(Object.assign({}, e), { stop: timeToString(stringToTime(e.stop) + 3600 * 24) }) : e);
        let startTime = 0;
        let len = entries.length;
        for (let i = 0; i < len; i++) {
            const entry = entries[i];
            if (stringToTime(entry.start) > startTime) {
                entries.splice(i, 0, Object.assign(Object.assign({}, entry), {
                    start: timeToString(startTime),
                    stop: entry.start,
                    actions: []
                }));
                len++;
                i++;
            }
            startTime = stringToTime(entry.stop);
        }
        const endOfDay = 24 * 3600;
        if (startTime < endOfDay && startTime > 0) {
            entries.push(Object.assign(Object.assign({}, entries[0]), {
                start: timeToString(startTime),
                stop: timeToString(endOfDay),
                actions: []
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
        number_format: m$1.system
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
    		set_preset_mode: "nastavit předvolbu[ {preset_mode}]"
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
    		set_humidity: "nastavit vlhkost[ na {humidity}]"
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
    		set_away_mode: "vypnout režim"
    	}
    };
    var domains = {
    	alarm_control_panel: "poplašný ovládací panel",
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
    	scene: "scény",
    	script: "skripty",
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
    			no_timeslot_selected: "Nejprve vyberte časový úsek"
    		},
    		conditions: {
    			equal_to: "je",
    			unequal_to: "není",
    			all: "Vše",
    			any: "žádný",
    			no_conditions_defined: "Nejsou definovány žádné podmínky"
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
    		set_preset_mode: "Voreinstellung setzen[ auf {preset_mode}]"
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
    		set_humidity: "Luftfeuchtigkeit setzen[ auf {humidity}]"
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
    		set_away_mode: "Abwesenheitsmodus setzen"
    	}
    };
    var domains$1 = {
    	alarm_control_panel: "Alarmzentrale",
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
    	scene: "Szene",
    	script: "Skripte",
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
    			no_timeslot_selected: "Wähle zuerst ein Zeitfenster aus"
    		},
    		conditions: {
    			equal_to: "ist",
    			unequal_to: "ist nicht",
    			all: "alle",
    			any: "keine",
    			no_conditions_defined: "Es sind keine Bedingungen definiert"
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
    		set_preset_mode: "set preset[ to {preset_mode}]"
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
    		set_humidity: "set humidity[ to {humidity}]"
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
    		set_away_mode: "set away mode"
    	}
    };
    var domains$2 = {
    	alarm_control_panel: "alarm control panel",
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
    	scene: "scenes",
    	script: "scripts",
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
    			no_timeslot_selected: "Select a timeslot first"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is not",
    			all: "all",
    			any: "any",
    			no_conditions_defined: "There are no conditions defined"
    		},
    		options: {
    			repeat_type: "behaviour after completion",
    			period: "period"
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
    		set_preset_mode: "establecer preajuste[ {preset_mode}]"
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
    		set_humidity: "establecer humedad[ a {humidity}]"
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
    		set_away_mode: "establecer modo fuera de casa"
    	}
    };
    var domains$3 = {
    	alarm_control_panel: "panel de control de alarma",
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
    	automation: "automatizaciones",
    	scene: "escenas",
    	script: "scripts",
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
    			no_timeslot_selected: "selecciona un bloque de tiempo primero"
    		},
    		conditions: {
    			equal_to: "igual a",
    			unequal_to: "desigual a",
    			all: "todos",
    			any: "cualquiera",
    			no_conditions_defined: "no hay ninguna condición definida"
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
    		set_preset_mode: "eelseade[ {preset_mode}]"
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
    		set_humidity: "sea niiskus[ {humidity}]"
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
    		set_away_mode: "kodust ära"
    	}
    };
    var domains$4 = {
    	alarm_control_panel: "valvepaneel",
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
    	scene: "stseenid",
    	script: "skriptud",
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
    			no_timeslot_selected: "Alustuseks vali ajavahemik"
    		},
    		conditions: {
    			equal_to: "võrdub",
    			unequal_to: "ei võrdu",
    			all: "kõik",
    			any: "iga",
    			no_conditions_defined: "Tingimusi pole määratud"
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
    		set_temperature_hvac_mode_heat_cool: "regulate[ to {target_temp_low} - {target_temp_high}]",
    		set_hvac_mode: "ajuster le mode[ à {hvac_mode}]",
    		set_preset_mode: "choisir le pré-réglage[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "fermer",
    		open_cover: "ouvrir",
    		set_cover_position: "ajuster la position[ à {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_speed: "ajuster la vitesse[ à {speed}]",
    		set_direction: "ajuster l'orientation[ vers {direction}]",
    		oscillate: "ajuster l'oscillation[ à {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "ajuster l'humidité[ à {humidity}]"
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
    		notify: "send notification"
    	},
    	script: {
    		script: "exécuter"
    	},
    	vacuum: {
    		start_pause: "démarrer / pause"
    	},
    	water_heater: {
    		set_away_mode: "choisir le mode absent"
    	}
    };
    var domains$5 = {
    	alarm_control_panel: "panneau de contrôle de l'alarme",
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
    	scene: "scène",
    	script: "script",
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
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
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
    			no_timeslot_selected: "Choisir d'abord une plage horaire"
    		},
    		conditions: {
    			equal_to: "égal à",
    			unequal_to: "pas égal à",
    			all: "tous",
    			any: "tout",
    			no_conditions_defined: "Il n'y a pas de condition définie"
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
    		set_preset_mode: "קבע הגדרה[ ל {preset_mode}]"
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
    		set_humidity: "קבע לחות[ ל {humidity}]"
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
    		set_away_mode: "קבע מצב מוץ לבית"
    	}
    };
    var domains$6 = {
    	alarm_control_panel: "בקרת אזעקה",
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
    	scene: "תרחישים",
    	script: "סקריפטים",
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
    			no_timeslot_selected: "בחר משבצת זמן קודם"
    		},
    		conditions: {
    			equal_to: "שווה ל",
    			unequal_to: "שונה מ",
    			all: "כל התנאים",
    			any: "אחד מהתנאים",
    			no_conditions_defined: "לא הוגדרו תנאים"
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
    		set_preset_mode: "preset beállítása[ {preset_mode}]"
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
    		set_humidity: "set humidity[ to {humidity}]"
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
    		set_away_mode: "set away mode"
    	}
    };
    var domains$7 = {
    	alarm_control_panel: "alarm control panel",
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
    	scene: "jelenetek",
    	script: "scripts",
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
    			no_timeslot_selected: "Select a timeslot first"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is not",
    			all: "all",
    			any: "any",
    			no_conditions_defined: "There are no conditions defined"
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
    		set_preset_mode: "imposta programmazione[ {preset_mode}]"
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
    		set_humidity: "imposta umidità[ a {humidity}]"
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
    		set_away_mode: "imposta fuori casa"
    	}
    };
    var domains$8 = {
    	alarm_control_panel: "pannello di controllo allarme",
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
    	scene: "scene",
    	script: "script",
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
    			no_timeslot_selected: "Seleziona prima una fascia oraria"
    		},
    		conditions: {
    			equal_to: "uguale",
    			unequal_to: "non uguale",
    			all: "tutte",
    			any: "qualunque",
    			no_conditions_defined: "Non ci sono condizioni definite"
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
    		set_preset_mode: "programma[ {preset_mode}] instellen"
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
    		set_humidity: "luchtvochtigheid instellen [ op {humidity}]"
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
    		set_away_mode: "stel afwezigheidsmode in"
    	}
    };
    var domains$9 = {
    	alarm_control_panel: "alarmsystemen",
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
    	scene: "scènes",
    	script: "scripts",
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
    			no_timeslot_selected: "Kies eerst een tijdsslot"
    		},
    		conditions: {
    			equal_to: "is",
    			unequal_to: "is niet",
    			all: "en",
    			any: "of",
    			no_conditions_defined: "Er zijn geen voorwaarden gedefinieerd"
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
    		set_preset_mode: "sett forhåndsvalg[ {preset_mode}]"
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
    		set_humidity: "sett luftfuktighet[ til {humidity}]"
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
    		set_away_mode: "sett bortemodus"
    	}
    };
    var domains$a = {
    	alarm_control_panel: "alarmpanel",
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
    	scene: "scener",
    	script: "skript",
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
    			no_timeslot_selected: "Velg tidsluke først"
    		},
    		conditions: {
    			equal_to: "er",
    			unequal_to: "er ikke",
    			all: "alle",
    			any: "any",
    			no_conditions_defined: "Ingen vilkår definert"
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
    		set_preset_mode: "ustaw preset[ {preset_mode}]"
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
    		set_humidity: "ustaw wilgotność[ na {humidity}]"
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
    		set_away_mode: "ustaw tryb nieobecności"
    	}
    };
    var domains$b = {
    	alarm_control_panel: "panel kontrolny alarmu",
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
    	scene: "sceny",
    	script: "skrypty",
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
    			no_timeslot_selected: "Najpierw wybierz przedział czasowy"
    		},
    		conditions: {
    			equal_to: "jest równe ",
    			unequal_to: "nie jest równe",
    			all: "wszystkie",
    			any: "dowolny",
    			no_conditions_defined: "Nie ma zdefiniowanych warunków"
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
    		set_preset_mode: "definir predefinição[ {preset_mode}]"
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
    		set_humidity: "definir humidade[ para {humidity}]"
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
    		set_away_mode: "definir modo ausente"
    	}
    };
    var domains$c = {
    	alarm_control_panel: "painel de controlo de alarme",
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
    	scene: "cenas",
    	script: "scripts",
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
    			no_timeslot_selected: "É necessário selecionar um período horário para escolher uma ação"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer",
    			no_conditions_defined: "Não existem condições definidas"
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
    		set_preset_mode: "definir predefinição[ {preset_mode}]"
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
    		set_humidity: "definir humidade[ para {humidity}]"
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
    		set_away_mode: "definir modo ausente"
    	}
    };
    var domains$d = {
    	alarm_control_panel: "painel de controlo de alarme",
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
    	scene: "cenas",
    	script: "scripts",
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
    			no_timeslot_selected: "Selecionar um período horário primeiro"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer",
    			no_conditions_defined: "Não existem condições definidas"
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
    		set_preset_mode: "setare preset[ {preset_mode}]"
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
    		set_humidity: "setare umiditate[ la {humidity}]"
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
    		set_away_mode: "setare mod plecat"
    	}
    };
    var domains$e = {
    	alarm_control_panel: "panou control alarmă",
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
    	scene: "scene",
    	script: "scripturi",
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
    			no_timeslot_selected: "Prima dată selectați un interval orar"
    		},
    		conditions: {
    			equal_to: "este",
    			unequal_to: "nu este",
    			all: "tot",
    			any: "oricare",
    			no_conditions_defined: "Nu există condiții definite"
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
    		set_preset_mode: "выбрать набор настроек[ {preset_mode}]"
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
    		set_humidity: "установить влажность[ {humidity}]"
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
    		set_away_mode: "установить режим вне дома"
    	}
    };
    var domains$f = {
    	alarm_control_panel: "панель управления сигнализацией",
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
    	scene: "сцены",
    	script: "скрипты",
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
    			no_timeslot_selected: "Выберите временной слот"
    		},
    		conditions: {
    			equal_to: "равно",
    			unequal_to: "не равно",
    			all: "все",
    			any: "любое",
    			no_conditions_defined: "Не определены условия"
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
    		set_preset_mode: "nastaviť predvoľbu[ {preset_mode}]"
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
    		set_humidity: "nastaviť vlhkosť[ na {humidity}]"
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
    		set_away_mode: "nastaviť mód neprítomný"
    	}
    };
    var domains$g = {
    	alarm_control_panel: "ovládací panel alarmu",
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
    	scene: "scény",
    	script: "skripty",
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
    			no_timeslot_selected: "Najprv vyberte časový úsek"
    		},
    		conditions: {
    			equal_to: "je",
    			unequal_to: "nie je",
    			all: "Všetko",
    			any: "žiadny",
    			no_conditions_defined: "Nie sú definované žiadne podmienky"
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
    		set_preset_mode: "вибрати пресет[ to {preset_mode}]"
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
    		set_humidity: "встановити вологість[ to {humidity}]"
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
    		set_away_mode: "встановити режим Не вдома"
    	}
    };
    var domains$h = {
    	alarm_control_panel: "панель керування сигналізацією",
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
    	scene: "сцени",
    	script: "скрипти",
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
    			no_timeslot_selected: "Спершу виберіть часовий проміжок"
    		},
    		conditions: {
    			equal_to: "дорівнює",
    			unequal_to: "не рівне",
    			all: "всі",
    			any: "будь-яке",
    			no_conditions_defined: "Не визначені умови"
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
    		set_preset_mode: "设定预设模式[ 为 {preset_mode}]"
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
    		set_humidity: "设定湿度[ 至 {humidity}]"
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
    		set_away_mode: "设定离开模式"
    	}
    };
    var domains$i = {
    	alarm_control_panel: "警戒控制面板",
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
    	scene: "场景",
    	script: "脚本",
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
    			no_timeslot_selected: "请选择时间段"
    		},
    		conditions: {
    			equal_to: "是",
    			unequal_to: "非",
    			all: "全部",
    			any: "任一",
    			no_conditions_defined: "未定义条件"
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
                            unsub.then((unsubFunc) => unsubFunc());
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
                if (changedProps.has("hass")) {
                    this.__checkSubscribed();
                }
            }
            hassSubscribe() {
                return [];
            }
            __checkSubscribed() {
                if (this.__unsubs !== undefined ||
                    !this.isConnected ||
                    this.hass === undefined) {
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

    const weekdayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const formatWeekday = (date, locale, short) => {
        const supportLocaleString = () => {
            try {
                new Date().toLocaleDateString("i");
            }
            catch (e) {
                return e.name === "RangeError";
            }
            return false;
        };
        if (typeof date !== "object") {
            let _date = new Date(2017, 1, 26);
            _date.setDate(_date.getDate() + date);
            date = _date;
        }
        if (supportLocaleString()) {
            return date.toLocaleDateString(locale.language, {
                weekday: short ? "short" : "long",
            });
        }
        else {
            const weekday = date.getDay();
            return short ? weekdayArray[weekday].substr(0, 3) : weekdayArray[weekday];
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
            const testLanguage = locale.time_format === TimeFormat.language
                ? locale.language
                : undefined;
            const test = new Date().toLocaleString(testLanguage);
            return test.includes("AM") || test.includes("PM");
        }
        return locale.time_format === TimeFormat.am_pm;
    };
    function formatTime(dateObj, locale, formatOption) {
        const supportLocaleString = () => {
            try {
                new Date().toLocaleTimeString("i");
            }
            catch (e) {
                return e.name === "RangeError";
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
                hour: "numeric",
                minute: "2-digit",
                hour12: formatAmPm(locale),
            });
        }
        return formatAmPm(locale)
            ? formatTime(dateObj, locale, TimeFormat.am_pm)
            : formatTime(dateObj, locale, TimeFormat.twenty_four);
    }

    function formatDate(dateObj, locale, isoFormat) {
        const isCurrentYear = dateObj.getFullYear() == new Date().getFullYear();
        const supportLocaleDateString = () => {
            try {
                new Date().toLocaleDateString("i");
            }
            catch (e) {
                return e.name === "RangeError";
            }
            return false;
        };
        if (isoFormat)
            return format(dateObj, 'isoDate');
        if (isCurrentYear) {
            if (supportLocaleDateString()) {
                return new Intl.DateTimeFormat(locale.language, {
                    month: "long",
                    day: "numeric",
                }).format(dateObj);
            }
            else
                return format(dateObj, 'MMMM D');
        }
        else {
            if (supportLocaleDateString()) {
                return new Intl.DateTimeFormat(locale.language, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
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
            let roundedDelta = Math.round(delta);
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
                    const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: "auto" }).format(1, 'hour');
                    // @ts-expect-error
                    const text2 = Intl.NumberFormat(getLocale(this._hass).language, { style: "unit", unit: 'minute', unitDisplay: "long" }).format(mins);
                    return `${text1} ${join} ${text2}`;
                }
                else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
                    // in 1 minute and 52 seconds
                    const seconds = Math.round(delta - 60);
                    const join = this._hass.localize('ui.common.and');
                    // @ts-expect-error
                    const text1 = new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: "auto" }).format(1, 'minute');
                    // @ts-expect-error
                    const text2 = Intl.NumberFormat(getLocale(this._hass).language, { style: "unit", unit: 'second', unitDisplay: "long" }).format(seconds);
                    return `${text1} ${join} ${text2}`;
                }
            }
            // in 5 minutes/hours/seconds (or now)
            const diff = selectUnit(dateObj);
            // @ts-expect-error
            return new Intl.RelativeTimeFormat(getLocale(this._hass).language, { numeric: "auto" }).format(diff.value, diff.unit);
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

    function listVariable(...config) {
        //factory function to create ListVariable from configuration
        const commonOptions = config[0].options.map(e => e.value)
            .filter(option => config.map(e => e.options)
            .every(list => list.map(e => e.value).includes(option)));
        const options = commonOptions.map(val => {
            const name = config.map(e => e.options.find(o => o.value == val)).filter(isDefined).map(e => e.name).filter(isDefined);
            const icon = config.map(e => e.options.find(o => o.value == val)).filter(isDefined).map(e => e.icon).filter(isDefined);
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
            options: options
        };
        return variable;
    }
    function listVariableDisplay(value, variable) {
        const option = variable.options.find(e => e.value == value);
        return option
            ? option.name || option.value
            : '';
    }

    const binarySensorIcon = (stateObj) => {
        if (stateObj)
            return ae(Object.assign(Object.assign({}, stateObj), { state: "off" })) || "hass:radiobox-blank";
        else
            return "hass:radiobox-blank";
    };
    const binarySensorStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "off",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
                icon: ae(Object.assign(Object.assign({}, stateObj), { state: "off" }))
            },
            {
                value: "on",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "on" }), getLocale(hass)),
                icon: ae(Object.assign(Object.assign({}, stateObj), { state: "on" }))
            }
        ]
    });

    function levelVariable(...config) {
        //factory function to create LevelVariable from configuration
        const min = config.map(e => e.min).filter(isDefined);
        const max = config.map(e => e.max).filter(isDefined);
        const step = config.map(e => e.step).filter(isDefined);
        const scale_factor = unique(config.map(e => e.scale_factor).filter(isDefined));
        const optional = config.map(e => e.optional).filter(isDefined);
        const unit = config.map(e => e.unit).filter(isDefined);
        const name = config.map(e => e.name).filter(isDefined);
        const variable = {
            type: EVariableType.Level,
            min: min.length ? Math.min(...min) : 0,
            max: max.length ? Math.max(...max) : 255,
            step: step.length ? Math.max(...step) : 1,
            scale_factor: scale_factor.length == 1 ? scale_factor[0] : 1,
            optional: optional.length && optional.every(e => e) || false,
            unit: unit.length ? unit.reduce((_acc, val) => val) : '',
            name: name.length ? name.reduce((_acc, val) => val) : undefined
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

    const coverIcon = (stateObj) => {
        const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
        switch (deviceClass) {
            case 'garage':
                return 'hass:garage';
            case 'door':
                return 'hass:door-closed';
            case 'shutter':
                return 'hass:window-shutter';
            case 'blind':
                return 'hass:blinds';
            case 'window':
                return 'hass:window-closed';
            default:
                return 'hass:window-shutter';
        }
    };
    const coverIconOpen = (stateObj) => {
        const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
        switch (deviceClass) {
            case 'garage':
                return 'hass:garage-open';
            case 'door':
                return 'hass:door-open';
            case 'shutter':
                return 'hass:window-shutter-open';
            case 'blind':
                return 'hass:blinds-open';
            case 'window':
                return 'hass:window-open';
            default:
                return 'hass:window-shutter-open';
        }
    };
    const coverActions = (hass, stateObj) => [
        {
            service: 'cover.open_cover',
            icon: coverIconOpen(stateObj),
            name: localize('services.cover.open_cover', getLocale(hass)),
            supported_feature: 1
        },
        {
            service: 'cover.close_cover',
            icon: coverIcon(stateObj),
            name: localize('services.cover.close_cover', getLocale(hass)),
            supported_feature: 2,
        },
        {
            service: 'cover.set_cover_position',
            variables: {
                position: levelVariable({
                    name: hass.localize('ui.card.cover.position', getLocale(hass)),
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: '%',
                })
            },
            supported_feature: 4,
            icon: 'hass:ray-vertex',
            name: localize('services.cover.set_cover_position', getLocale(hass)),
        },
        // {
        //   service: 'cover.open_cover_tilt',
        //   icon: 'hass:valve-open',
        //   name: localize('services.cover.open_cover', getLocale(hass)),
        //   supported_feature: 16,
        // },
        // {
        //   service: 'cover.close_cover_tilt',
        //   icon: 'hass:valve-closed',
        //   name: localize('services.cover.close_cover', getLocale(hass)),
        //   supported_feature: 32,
        // },
        {
            service: 'cover.set_cover_tilt_position',
            variables: {
                tilt_position: levelVariable({
                    name: hass.localize('ui.card.cover.tilt_position', getLocale(hass)),
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: '%',
                })
            },
            supported_feature: 128,
            icon: 'hass:valve',
            name: localize('services.cover.set_cover_tilt_position', getLocale(hass)),
        },
    ];
    const coverStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "closed",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "closed" }), getLocale(hass)),
                icon: ae(Object.assign(Object.assign({}, stateObj), { state: "closed" }))
            },
            {
                value: "open",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "open" }), getLocale(hass)),
                icon: ae(Object.assign(Object.assign({}, stateObj), { state: "open" }))
            }
        ]
    });

    function textVariable(...config) {
        //factory function to create ListVariable from configuration
        const name = config.map(e => e.name).filter(isDefined);
        const variable = {
            type: EVariableType.Text,
            name: name.length ? name.reduce((_acc, val) => val) : undefined,
            multiline: config.some(e => e.multiline)
        };
        return variable;
    }
    function textVariableDisplay(value, _variable) {
        return String(value);
    }

    const sensorIcon = (stateObj) => {
        const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
        switch (deviceClass) {
            case 'humidity':
                return 'hass:water-percent';
            case 'illuminance':
                return 'hass:brightness-5';
            case 'temperature':
                return 'hass:thermometer';
            case 'power':
                return 'hass:flash';
            case 'pressure':
                return 'hass:gauge';
            case 'signal_strength':
                return 'hass:wifi';
            default:
                if (stateObj.attributes.unit_of_measurement == '°C')
                    return 'hass:thermometer';
                if (stateObj.attributes.unit_of_measurement == '°F')
                    return 'hass:thermometer';
                return 'hass:eye';
        }
    };
    const sensorStates = (_hass, stateObj) => {
        if (stateObj && !isNaN(Number(stateObj.state))) {
            const unit = stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '';
            return levelVariable({
                unit: unit,
                min: unit == '%' ? 0 : undefined,
                max: unit == '%' ? 100 : undefined,
                step: unit == '%' ? 1 : undefined,
            });
        }
        else {
            return textVariable();
        }
    };

    const domainIcons = {
        alarm_control_panel: 'hass:alarm-light-outline',
        automation: 'hass:playlist-play',
        binary_sensor: 'hass:radiobox-blank',
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
        notify: 'hass:message-text-outline',
        person: 'hass:account-outline',
        proximity: 'hass:map-marker-distancenb ',
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
    function standardIcon(entity_id, hass) {
        const domain = p$1(entity_id);
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
    }

    function matchPattern(pattern, value) {
        let res = false;
        if (pattern.match(/^[a-z0-9_\.]+$/)) {
            if (pattern.includes('.'))
                res = pattern == value;
            else
                res = pattern == p$1(value);
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

    function parseEntity(entity_id, hass, config) {
        const stateObj = entity_id in hass.states ? hass.states[entity_id] : undefined;
        let entity = {
            id: entity_id,
            name: stateObj ? stateObj.attributes.friendly_name || g$1(entity_id) : DeadEntityName,
            icon: stateObj ? stateObj.attributes.icon : DeadEntityIcon,
        };
        if (!stateObj && p$1(entity_id) == NotifyDomain) {
            let name = g$1(entity_id);
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

    const wildcardPattern = /\{[^\}]+\}/g;
    const parameterPattern = /\[([^\]]+)\]/;
    function computeActionDisplay(action) {
        let name = action.name;
        if (!name)
            name = PrettyPrintName(g$1(action.service));
        const res = name.match(parameterPattern);
        if (res) {
            let replacement = res[1];
            const matches = res[1].match(wildcardPattern);
            if (matches && matches.length && matches.every(wildcard => {
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

    function weekdayType(weekday) {
        if (weekday.includes('daily'))
            return EDayType.Daily;
        if (weekday.includes('workday'))
            return EDayType.Workday;
        if (weekday.includes('weekend'))
            return EDayType.Weekend;
        return EDayType.Custom;
    }

    function weekdayToList(weekday) {
        let list = weekday.map(e => {
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

    function stringToDate(dateTimeString) {
        let date = new Date();
        const dateMatch = (dateTimeString || '').match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
        if (dateMatch !== null)
            date.setFullYear(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
        const timeMatch = (dateTimeString || '').match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);
        if (timeMatch !== null)
            date.setHours(Number(timeMatch[1]), Number(timeMatch[2]), (timeMatch.length > 4) ? Number(timeMatch[4]) : date.getSeconds());
        return date;
    }

    const STATE_NOT_RUNNING = "NOT_RUNNING";

    const alarmControlPanelActions = (hass, _stateObj) => [
        {
            service: 'alarm_control_panel.alarm_disarm',
            icon: 'hass:lock-open-variant-outline',
            name: hass.localize('ui.card.alarm_control_panel.disarm'),
        },
        {
            service: 'alarm_control_panel.alarm_arm_home',
            icon: 'hass:home-outline',
            name: hass.localize('ui.card.alarm_control_panel.arm_home'),
            supported_feature: 1,
        },
        {
            service: 'alarm_control_panel.alarm_arm_away',
            icon: 'hass:exit-run',
            name: hass.localize('ui.card.alarm_control_panel.arm_away'),
            supported_feature: 2,
        },
        {
            service: 'alarm_control_panel.alarm_arm_night',
            icon: 'hass:power-sleep',
            name: hass.localize('ui.card.alarm_control_panel.arm_night'),
            supported_feature: 4,
        },
        {
            service: 'alarm_control_panel.alarm_arm_custom_bypass',
            icon: 'hass:shield-lock-outline',
            name: hass.localize('ui.card.alarm_control_panel.arm_custom_bypass'),
            supported_feature: 16,
        },
    ];
    const alarmControlPanelStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "disarmed",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "disarmed" }), getLocale(hass)),
                icon: 'hass:lock-open-variant-outline',
            },
            {
                value: "armed_away",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "armed_away" }), getLocale(hass)),
                icon: 'hass:exit-run',
            },
            {
                value: "armed_home",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "armed_home" }), getLocale(hass)),
                icon: 'hass:home-outline',
            },
            {
                value: "armed_night",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "armed_night" }), getLocale(hass)),
                icon: 'hass:power-sleep',
            },
            {
                value: "triggered",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "triggered" }), getLocale(hass)),
                icon: 'hass:alarm-light-outline',
            },
        ]
    });

    const climateModes = (localizeFunc, stateObj, filterCapabilities) => {
        const modeList = [
            {
                value: 'off',
                icon: 'hass:power-off',
                name: localizeFunc('state_attributes.climate.hvac_action.off'),
            },
            {
                value: 'heat',
                icon: 'hass:fire',
                name: localizeFunc('state_attributes.climate.hvac_action.heating'),
            },
            {
                value: 'cool',
                icon: 'hass:snowflake',
                name: localizeFunc('state_attributes.climate.hvac_action.cooling'),
            },
            {
                value: 'heat_cool',
                icon: 'hass:thermometer',
            },
            {
                value: 'auto',
                icon: 'hass:autorenew',
            },
            {
                value: 'dry',
                icon: 'hass:water-percent',
                name: localizeFunc('state_attributes.climate.hvac_action.drying'),
            },
            {
                value: 'fan_only',
                icon: 'hass:fan',
                name: localizeFunc('state_attributes.climate.hvac_action.fan'),
            },
        ];
        const supportedModes = stateObj && Array.isArray(stateObj.attributes.hvac_modes) ? stateObj.attributes.hvac_modes : [];
        return filterCapabilities
            ? modeList.filter(e => supportedModes.find(m => m === e.value))
            : modeList;
    };
    const climatePresets = (localizeFunc, stateObj) => {
        const presetList = [
            {
                value: 'none',
                name: localizeFunc('state_attributes.climate.preset_mode.none'),
                icon: 'hass:cancel',
            },
            {
                value: 'eco',
                name: localizeFunc('state_attributes.climate.preset_mode.eco'),
                icon: 'hass:leaf',
            },
            {
                value: 'away',
                name: localizeFunc('state_attributes.climate.preset_mode.away'),
                icon: 'hass:car-traction-control',
            },
            {
                value: 'boost',
                name: localizeFunc('state_attributes.climate.preset_mode.boost'),
                icon: 'hass:rocket-launch-outline',
            },
            {
                value: 'comfort',
                name: localizeFunc('state_attributes.climate.preset_mode.comfort'),
                icon: 'hass:car-seat-cooler',
            },
            {
                value: 'home',
                name: localizeFunc('state_attributes.climate.preset_mode.home'),
                icon: 'hass:home-outline',
            },
            {
                value: 'sleep',
                name: localizeFunc('state_attributes.climate.preset_mode.sleep'),
                icon: 'hass:sleep',
            },
            {
                value: 'activity',
                name: localizeFunc('state_attributes.climate.preset_mode.activity'),
                icon: 'hass:account-alert-outline',
            },
        ];
        const supportedPresets = stateObj && Array.isArray(stateObj.attributes.preset_modes) ? stateObj.attributes.preset_modes : [];
        return supportedPresets.map(e => presetList.find(m => m.value === e) || { value: e });
    };
    const climateActions = (hass, stateObj, filterCapabilities) => {
        let hvacModes = climateModes(hass.localize, stateObj, filterCapabilities);
        if (hvacModes.length == 1 && filterCapabilities)
            hvacModes = [];
        const supportedModes = hvacModes.map(e => e.value);
        const supportedPresets = climatePresets(hass.localize, stateObj);
        const tempVariable = levelVariable({
            name: hass.localize('ui.card.weather.attributes.temperature'),
            min: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp) !== undefined
                ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp : hass.config.unit_system.temperature.includes('F')
                ? 50
                : 10,
            max: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp) !== undefined
                ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp : hass.config.unit_system.temperature.includes('F')
                ? 90
                : 30,
            step: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step) ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F')
                ? 1
                : 0.5,
            unit: hass.config.unit_system.temperature,
        });
        const actions = [];
        if (supportedPresets.length)
            actions.push({
                service: 'climate.set_preset_mode',
                variables: {
                    preset_mode: listVariable({
                        name: hass.localize('ui.card.climate.preset_mode'),
                        options: supportedPresets,
                    })
                },
                icon: 'hass:cloud-download-outline',
                name: localize('services.climate.set_preset_mode', getLocale(hass)),
                supported_feature: 16,
            });
        if (supportedModes.includes('off') || !filterCapabilities)
            actions.push({
                service: 'climate.set_hvac_mode',
                service_data: { hvac_mode: 'off' },
                icon: 'hass:power',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            });
        if (!supportedModes.includes('off') || !filterCapabilities)
            actions.push({
                service: 'climate.turn_off',
                icon: 'hass:power',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            });
        if (supportedModes.includes('heat') || !filterCapabilities)
            actions.push({
                service: 'climate.set_temperature',
                service_data: { hvac_mode: 'heat' },
                variables: {
                    temperature: tempVariable,
                },
                icon: 'hass:fire',
                name: localize('services.climate.set_temperature_hvac_mode_heat', getLocale(hass)),
                supported_feature: 1,
            });
        if (supportedModes.includes('cool') || !filterCapabilities)
            actions.push({
                service: 'climate.set_temperature',
                service_data: { hvac_mode: 'cool' },
                variables: {
                    temperature: tempVariable,
                },
                icon: 'hass:snowflake',
                name: localize('services.climate.set_temperature_hvac_mode_cool', getLocale(hass)),
                supported_feature: 1,
            });
        if ((!supportedModes.includes('cool') && !supportedModes.includes('heat')) || !filterCapabilities)
            actions.push({
                service: 'climate.set_temperature',
                variables: {
                    temperature: tempVariable
                },
                icon: 'hass:thermometer',
                name: localize('services.climate.set_temperature', getLocale(hass)),
                supported_feature: 1,
            });
        if (supportedModes.includes('heat_cool') || !filterCapabilities)
            actions.push({
                service: 'climate.set_temperature',
                service_data: { hvac_mode: 'heat_cool' },
                variables: {
                    target_temp_low: levelVariable(tempVariable, { name: hass.localize('ui.panel.lovelace.editor.card.generic.minimum') }),
                    target_temp_high: levelVariable(tempVariable, { name: hass.localize('ui.panel.lovelace.editor.card.generic.maximum') }),
                },
                icon: 'hass:fire',
                name: localize('services.climate.set_temperature_hvac_mode_heat_cool', getLocale(hass)),
                supported_feature: 2,
            });
        if (filterCapabilities)
            hvacModes = hvacModes.filter(e => !['off', 'heat', 'cool', 'heat_cool'].includes(e.value));
        if (hvacModes.length)
            actions.push({
                service: 'climate.set_hvac_mode',
                variables: {
                    hvac_mode: listVariable({
                        name: hass.localize('ui.card.climate.operation'),
                        options: hvacModes,
                    })
                },
                icon: 'hass:cog-transfer-outline',
                name: localize('services.climate.set_hvac_mode', getLocale(hass)),
            });
        return actions;
    };
    const climateStates = (hass, stateObj) => {
        const modeList = [
            {
                value: 'off',
                icon: 'hass:power-off',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
            },
            {
                value: 'heat',
                icon: 'hass:fire',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "heat" }), getLocale(hass)),
            },
            {
                value: 'cool',
                icon: 'hass:snowflake',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "cool" }), getLocale(hass)),
            },
            {
                value: 'heat_cool',
                icon: 'hass:thermometer',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "heat_cool" }), getLocale(hass)),
            },
            {
                value: 'auto',
                icon: 'hass:autorenew',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "auto" }), getLocale(hass)),
            },
            {
                value: 'dry',
                icon: 'hass:water-percent',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "dry" }), getLocale(hass)),
            },
            {
                value: 'fan_only',
                icon: 'hass:fan',
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "fan_only" }), getLocale(hass)),
            },
        ];
        return listVariable({
            options: stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)
                ? modeList.filter(e => stateObj.attributes.hvac_modes.includes(e.value))
                : modeList
        });
    };

    const fanActions = (hass, stateObj) => {
        let actions = [
            {
                service: 'fan.turn_on',
                icon: 'hass:power',
                name: hass.localize('ui.card.vacuum.actions.turn_on'),
            },
            {
                service: 'fan.turn_off',
                icon: 'hass:power-off',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            },
            {
                service: 'fan.set_percentage',
                variables: {
                    percentage: levelVariable({
                        name: hass.localize('ui.card.fan.speed'),
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%'
                    }),
                },
                supported_feature: 1,
                icon: 'hass:weather-windy',
                name: localize('services.fan.set_speed', getLocale(hass)),
            },
            {
                service: 'fan.oscillate',
                variables: {
                    oscillating: listVariable({
                        name: hass.localize('ui.card.fan.oscillate'),
                        options: [
                            {
                                value: 'True',
                                name: hass.localize('state.default.on'),
                                icon: 'hass:flash',
                            },
                            {
                                value: 'False',
                                name: hass.localize('state.default.off'),
                                icon: 'hass:flash-off',
                            }
                        ]
                    })
                },
                supported_feature: 2,
                icon: 'hass:arrow-left-right',
                name: localize('services.fan.oscillate', getLocale(hass)),
            },
            {
                service: 'fan.set_direction',
                variables: {
                    direction: listVariable({
                        name: hass.localize('ui.card.fan.direction'),
                        options: [
                            {
                                value: 'forward',
                                name: hass.localize('ui.card.fan.forward'),
                                icon: 'hass:autorenew',
                            },
                            {
                                value: 'reverse',
                                name: hass.localize('ui.card.fan.reverse'),
                                icon: 'hass:sync',
                            },
                        ],
                    })
                },
                supported_feature: 4,
                icon: 'hass:cog-clockwise',
                name: localize('services.fan.set_direction', getLocale(hass)),
            }
        ];
        const supportedPresets = stateObj && Array.isArray(stateObj.attributes.preset_modes)
            ? stateObj.attributes.preset_modes
            : [];
        if (supportedPresets.length)
            actions.push({
                service: 'fan.set_preset_mode',
                variables: {
                    preset_mode: listVariable({
                        name: hass.localize('ui.card.fan.preset_mode'),
                        options: supportedPresets.map(e => Object({ value: e }))
                    })
                },
                supported_feature: 8,
                icon: 'hass:cloud-download-outline',
                name: localize('services.climate.set_preset_mode', getLocale(hass)),
            });
        return actions;
    };
    const fanStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "off",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
                icon: "hass:power-off"
            },
            {
                value: "on",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "on" }), getLocale(hass)),
                icon: "hass:power"
            }
        ]
    });

    const humidifierModes = (localizeFunc, stateObj, filterCapabilities) => {
        const modeList = [
            {
                value: 'normal',
                name: localizeFunc('state_attributes.humidifier.mode.normal'),
                icon: 'hass:account-outline',
            },
            {
                value: 'eco',
                name: localizeFunc('state_attributes.humidifier.mode.eco'),
                icon: 'hass:leaf',
            },
            {
                value: 'away',
                name: localizeFunc('state_attributes.humidifier.mode.away'),
                icon: 'hass:car-traction-control',
            },
            {
                value: 'boost',
                name: localizeFunc('state_attributes.humidifier.mode.boost'),
                icon: 'hass:rocket-launch-outline',
            },
            {
                value: 'comfort',
                name: localizeFunc('state_attributes.humidifier.mode.comfort'),
                icon: 'hass:car-seat-cooler',
            },
            {
                value: 'home',
                name: localizeFunc('state_attributes.humidifier.mode.home'),
                icon: 'hass:home-outline',
            },
            {
                value: 'sleep',
                name: localizeFunc('state_attributes.humidifier.mode.sleep'),
                icon: 'hass:account-sleep',
            },
            {
                value: 'auto',
                name: localizeFunc('state_attributes.humidifier.mode.auto'),
                icon: 'hass:autorenew',
            },
            {
                value: 'baby',
                name: localizeFunc('state_attributes.humidifier.mode.baby'),
                icon: 'hass:baby-bottle-outline',
            },
        ];
        const supportedModes = stateObj && Array.isArray(stateObj.attributes.available_modes) ? stateObj.attributes.available_modes : [];
        return filterCapabilities
            ? modeList.filter(e => supportedModes.find(m => m === e.value))
            : modeList;
    };
    const humidifierActions = (hass, stateObj, filterCapabilities) => {
        const supportedModes = humidifierModes(hass.localize, stateObj, filterCapabilities);
        let actions = [
            {
                service: 'humidifier.turn_on',
                icon: 'hass:power',
                name: hass.localize('ui.card.vacuum.actions.turn_on'),
            },
            {
                service: 'turn_off',
                icon: 'hass:power-off',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            },
            {
                service: 'humidifier.set_humidity',
                variables: {
                    humidity: levelVariable({
                        name: hass.localize('ui.card.humidifier.humidity'),
                        min: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_humidity) !== undefined
                            ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_humidity : 0,
                        max: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_humidity) !== undefined
                            ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_humidity : 100,
                        step: 1,
                        unit: '%',
                    }),
                },
                icon: 'hass:water-percent',
                name: localize('services.humidifer.set_humidity', getLocale(hass)),
            }
        ];
        if (supportedModes.length > 1) {
            actions.push({
                service: 'humidifier.set_mode',
                variables: {
                    mode: listVariable({
                        name: hass.localize('ui.card.humidifier.mode'),
                        options: supportedModes,
                    })
                },
                icon: 'hass:cog-transfer-outline',
                name: localize('services.climate.set_mode', getLocale(hass)),
            });
        }
        return actions;
    };

    const inputNumberActions = (hass, stateObj) => [
        {
            service: 'input_number.set_value',
            variables: {
                value: levelVariable({
                    name: hass.localize('ui.panel.config.helpers.types.input_number'),
                    min: stateObj && stateObj.attributes.min ? Number(stateObj.attributes.min) : 0,
                    max: stateObj && stateObj.attributes.max ? Number(stateObj.attributes.max) : 255,
                    step: stateObj && stateObj.attributes.step ? Number(stateObj.attributes.step) : 1,
                    unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '',
                })
            },
            icon: 'hass:counter',
            name: localize('services.input_number.set_value', getLocale(hass)),
        },
    ];
    const inputNumberStates = (hass, stateObj) => levelVariable({
        name: hass.localize('ui.panel.config.helpers.types.input_number'),
        min: stateObj && stateObj.attributes.min ? Number(stateObj.attributes.min) : 0,
        max: stateObj && stateObj.attributes.max ? Number(stateObj.attributes.max) : 255,
        step: stateObj && stateObj.attributes.step ? Number(stateObj.attributes.step) : 1,
        unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : ''
    });

    const inputSelectOptions = (_localize, stateObj) => {
        if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
            return stateObj.attributes.options.map(val => {
                return { value: String(val) };
            });
        }
        return [];
    };
    const inputSelectActions = (hass, stateObj) => [
        {
            service: 'input_select.select_option',
            variables: {
                option: listVariable({
                    name: hass.localize('ui.components.dialogs.input_select.options'),
                    options: inputSelectOptions(hass.localize, stateObj),
                })
            },
            icon: 'counter',
            name: localize('services.input_select.select_option', getLocale(hass)),
        },
    ];
    const inputSelectStates = (hass, stateObj) => listVariable({
        options: inputSelectOptions(hass.localize, stateObj)
            .map(e => Object.assign(e, { name: e.value }))
    });

    const selectOptions = (_localize, stateObj) => {
        if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
            return stateObj.attributes.options.map(val => {
                return { value: String(val) };
            });
        }
        return [];
    };
    const selectActions = (hass, stateObj) => [
        {
            service: 'select.select_option',
            variables: {
                option: listVariable({
                    name: hass.localize('ui.components.dialogs.select.options'),
                    options: selectOptions(hass.localize, stateObj),
                })
            },
            icon: 'counter',
            name: localize('services.select.select_option', getLocale(hass)),
        },
    ];
    const selectStates = (hass, stateObj) => listVariable({
        options: selectOptions(hass.localize, stateObj)
            .map(e => Object.assign(e, { name: e.value }))
    });

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
        const domain = p$1(stateObj.entity_id);
        switch (domain) {
            case 'light':
                return colorModesToSupportedFeatures(stateObj.attributes.supported_color_modes);
            default:
                return stateObj.attributes.supported_features || 0;
        }
    };

    const lightActions = (hass, stateObj) => {
        const actions = [
            {
                service: 'light.turn_off',
                icon: 'hass:lightbulb-off',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            },
        ];
        const supportedFeatures = computeSupportedFeatures(stateObj);
        if (supportedFeatures & 1)
            actions.push({
                service: 'light.turn_on',
                variables: {
                    brightness: levelVariable({
                        name: hass.localize('ui.card.light.brightness'),
                        min: 0,
                        max: 100,
                        scale_factor: 2.55,
                        step: 1,
                        unit: '%',
                        optional: true,
                    })
                },
                icon: 'hass:lightbulb-on',
                name: localize('services.light.turn_on', getLocale(hass)),
                supported_feature: 1,
            });
        else
            actions.push({
                service: 'light.turn_on',
                icon: 'hass:lightbulb-on',
                name: hass.localize('ui.card.vacuum.actions.turn_on'),
            });
        return actions;
    };
    const lightStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "off",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
                icon: "hass:lightbulb-off"
            },
            {
                value: "on",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "on" }), getLocale(hass)),
                icon: "hass:lightbulb"
            }
        ]
    });

    const lockActions = (hass, _stateObj) => [
        {
            service: 'lock.unlock',
            icon: 'hass:lock-open-variant-outline',
            name: hass.localize('ui.card.lock.unlock'),
        },
        {
            service: 'lock.lock',
            icon: 'hass:lock-outline',
            name: hass.localize('ui.card.lock.lock'),
        },
    ];
    const lockStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "unlocked",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "unlocked" }), getLocale(hass)),
                icon: 'hass:lock-open-variant-outline',
            },
            {
                value: "locked",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "locked" }), getLocale(hass)),
                icon: 'hass:lock-outline'
            }
        ]
    });

    const mediaPlayerSources = (_localize, stateObj) => {
        if (stateObj && stateObj.attributes.source_list && Array.isArray(stateObj.attributes.source_list)) {
            return Array(stateObj.attributes.source_list).map(val => {
                return { value: String(val) };
            });
        }
        return [];
    };
    const mediaPlayerActions = (hass, stateObj) => [
        {
            service: 'media_player.turn_on',
            icon: 'hass:power',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
            supported_feature: 128,
        },
        {
            service: 'media_player.turn_off',
            icon: 'hass:power-off',
            name: hass.localize('ui.card.vacuum.actions.turn_off'),
            supported_feature: 256,
        },
        {
            service: 'media_player.select_source',
            variables: {
                source: listVariable({
                    name: hass.localize('ui.card.media_player.source'),
                    options: mediaPlayerSources(hass.localize, stateObj),
                })
            },
            icon: 'hass:music-box-multiple-outline',
            name: localize('services.media_player.select_source', getLocale(hass)),
            supported_feature: 2048,
        },
    ];

    const scriptActions = (hass, stateObj) => {
        const actions = [
            {
                service: 'script.turn_on',
                icon: 'hass:flash',
                name: hass.localize('ui.card.vacuum.actions.turn_on'),
            },
            {
                service: 'script.turn_off',
                icon: 'hass:flash-off',
                name: hass.localize('ui.card.vacuum.actions.turn_off'),
            },
        ];
        if (stateObj) {
            actions.push({
                service: 'script' + '.' + g$1(stateObj.entity_id),
                icon: 'hass:play',
                name: localize('services.script.script', getLocale(hass)),
            });
        }
        return actions;
    };

    const vacuumActions = (hass, _stateObj) => [
        {
            service: 'vacuum.turn_on',
            icon: 'hass:power',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
            supported_feature: 1,
        },
        {
            service: 'vacuum.start',
            icon: 'hass:play-circle-outline',
            name: hass.localize('ui.card.vacuum.start_cleaning'),
            supported_feature: 8192,
        },
        {
            service: 'vacuum.start_pause',
            icon: 'hass:play-circle-outline',
            name: localize('services.vacuum.start_pause', getLocale(hass)),
            supported_feature: 4,
        },
    ];

    const waterHeaterModes = (_localize, stateObj) => {
        if (stateObj && stateObj.attributes.options && Array.isArray(stateObj.attributes.options)) {
            return Array(stateObj.attributes.options).map(val => {
                return { value: String(val) };
            });
        }
        return [];
    };
    const waterHeaterActions = (hass, stateObj) => [
        {
            service: 'water_heater.set_temperature',
            variables: {
                temperature: levelVariable({
                    name: hass.localize('ui.card.weather.attributes.temperature'),
                    min: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp) !== undefined
                        ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp : hass.config.unit_system.temperature.includes('F')
                        ? 50
                        : 10,
                    max: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp) !== undefined
                        ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp : hass.config.unit_system.temperature.includes('F')
                        ? 90
                        : 30,
                    step: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step) ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F')
                        ? 1
                        : 0.5,
                    unit: hass.config.unit_system.temperature,
                })
            },
            icon: 'hass:thermometer',
            name: localize('services.climate.set_temperature', getLocale(hass)),
            supported_feature: 1,
        },
        {
            service: 'water_heater.set_operation_mode',
            variables: {
                operation_mode: listVariable({
                    name: hass.localize('ui.card.water_heater.operation'),
                    options: waterHeaterModes(hass.localize, stateObj),
                })
            },
            icon: 'hass:cog-transfer-outline',
            name: localize('services.climate.set_mode', getLocale(hass)),
            supported_feature: 2,
        },
        {
            service: 'water_heater.set_away_mode',
            variables: {
                mode: listVariable({
                    name: hass.localize('ui.card.water_heater.away_mode'),
                    options: [
                        {
                            value: 'on',
                            name: hass.localize('ui.card.input_boolean.on'),
                            icon: 'hass:toggle-switch-outline',
                        },
                        {
                            value: 'off',
                            name: hass.localize('ui.card.input_boolean.off'),
                            icon: 'hass:toggle-switch-off-outline',
                        },
                    ],
                })
            },
            icon: 'hass:car-traction-control',
            name: localize('services.water_heater.set_away_mode', getLocale(hass)),
            supported_feature: 4,
        },
    ];

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
        const argsA = [
            ...new Set([...serviceDataA, ...variablesA])
        ];
        const argsB = [
            ...new Set([...serviceDataB, ...variablesB])
        ];
        const allArgs = [
            ...new Set([...argsA, ...argsB])
        ];
        return allArgs.every(arg => {
            // both actions must have the parameter in common
            if (!argsA.includes(arg))
                return isOptional(arg, actionB);
            if (!argsB.includes(arg))
                return isOptional(arg, actionA);
            // if its a fixed parameter it must be equal
            if (serviceDataA
                .filter(e => !variablesA.includes(e))
                .includes(arg) &&
                serviceDataB
                    .filter(e => !variablesB.includes(e))
                    .includes(arg))
                return actionA.service_data[arg] === actionB.service_data[arg];
            // if both are variables they are assumed to be equal
            if (variablesA.includes(arg) &&
                variablesB.includes(arg))
                return true;
            if (!allowVars)
                return false;
            // compare a fixed value with variable
            const value = serviceDataA.includes(arg)
                ? actionA.service_data[arg]
                : actionB.service_data[arg];
            const variable = variablesA.includes(arg)
                ? actionA.variables[arg]
                : actionB.variables[arg];
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

    function computeVariables(variables) {
        if (!Object.keys(variables || {}).length)
            return undefined;
        return Object.entries(variables).map(([field, variable]) => {
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
            .reduce((obj, [key, val]) => val ? Object.assign(obj, { [key]: val }) : obj, {});
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
        commonActions = commonActions.map(action => {
            const mergedVariables = Object.entries(action.variables || {}).map(([field, variable]) => {
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
                .reduce((obj, [key, val]) => val ? Object.assign(obj, { [key]: val }) : obj, {});
            if (Object.values(mergedVariables).find(e => e.type == EVariableType.List && !e.options.length))
                return undefined;
            action = Object.assign(Object.assign({}, action), { variables: mergedVariables });
            return action;
        }).filter(isDefined);
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
        const mixedDomains = [
            ...new Set(entities.map(e => p$1(e)))
        ].length > 1;
        if (mixedDomains) {
            entityActions = entityActions.map(actionList => {
                return actionList.map(action => {
                    if (g$1(action.service) == 'turn_on' || g$1(action.service) == 'turn_off') {
                        return Object.assign(Object.assign({}, action), { service: 'homeassistant' + '.' + g$1(action.service), icon: g$1(action.service) == 'turn_on' ? 'flash' : 'flash-off' });
                    }
                    return action;
                });
            });
        }
        if (!entityActions.length)
            return [];
        let commonActions = computeCommonActions(entityActions);
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

    const inputBooleanActions = (hass, _stateObj) => [
        {
            service: 'input_boolean.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
        },
        {
            service: 'input_boolean.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.vacuum.actions.turn_off'),
        },
    ];
    const inputBooleanStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "off",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
                icon: "hass:flash-off"
            },
            {
                value: "on",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "on" }), getLocale(hass)),
                icon: "hass:flash"
            }
        ]
    });

    const sceneActions = (hass, _stateObj) => [
        {
            service: 'scene.turn_on',
            icon: 'hass:play',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
        },
    ];

    const switchActions = (hass, _stateObj) => [
        {
            service: 'switch.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
        },
        {
            service: 'switch.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.vacuum.actions.turn_off'),
        },
    ];
    const switchStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "off",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "off" }), getLocale(hass)),
                icon: "hass:flash-off"
            },
            {
                value: "on",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "on" }), getLocale(hass)),
                icon: "hass:flash"
            }
        ]
    });

    const automationActions = (hass, _stateObj) => [
        {
            service: 'automation.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.vacuum.actions.turn_on'),
        },
        {
            service: 'automation.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.vacuum.actions.turn_off'),
        },
        {
            service: 'automation.trigger',
            icon: 'hass:play',
            name: hass.localize('ui.card.script.run'),
        },
    ];

    const notifyActions = (hass, service_id) => {
        let action = {
            service: service_id,
            icon: 'hass:message-alert',
            name: localize('services.notify.notify', getLocale(hass)),
            variables: {
                title: textVariable({
                    name: hass.localize('ui.panel.config.automation.editor.actions.type.device_id.extra_fields.title'),
                }),
                message: textVariable({
                    name: hass.localize('ui.panel.config.automation.editor.actions.type.device_id.extra_fields.message'),
                    multiline: true
                }),
            }
        };
        return [action];
    };

    function standardActions(entity_id, hass, filterCapabilities = true) {
        try {
            const domain = p$1(entity_id);
            const stateObj = hass.states[entity_id];
            switch (domain) {
                case 'alarm_control_panel':
                    return alarmControlPanelActions(hass, stateObj);
                case 'automation':
                    return automationActions(hass, stateObj);
                case 'climate':
                    return climateActions(hass, stateObj, filterCapabilities);
                case 'cover':
                    return coverActions(hass, stateObj);
                case 'fan':
                    return fanActions(hass, stateObj);
                case 'group':
                    const entities = stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id) ? stateObj.attributes.entity_id : [];
                    const configs = entities.map(e => standardActions(e, hass, filterCapabilities));
                    return groupActions(hass, stateObj, configs);
                case 'humidifier':
                    return humidifierActions(hass, stateObj, filterCapabilities);
                case 'input_boolean':
                    return inputBooleanActions(hass, stateObj);
                case 'input_number':
                    return inputNumberActions(hass, stateObj);
                case 'input_select':
                    return inputSelectActions(hass, stateObj);
                case 'select':
                    return selectActions(hass, stateObj);
                case 'light':
                    return lightActions(hass, stateObj);
                case 'lock':
                    return lockActions(hass, stateObj);
                case 'media_player':
                    return mediaPlayerActions(hass, stateObj);
                case 'notify':
                    return notifyActions(hass, entity_id);
                case 'scene':
                    return sceneActions(hass, stateObj);
                case 'script':
                    return scriptActions(hass, stateObj);
                case 'switch':
                    return switchActions(hass, stateObj);
                case 'vacuum':
                    return vacuumActions(hass, stateObj);
                case 'water_heater':
                    return waterHeaterActions(hass, stateObj);
                default:
                    return [];
            }
        }
        catch (e) {
            console.error(`Scheduler-card failed to load actions for '${entity_id}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`);
            return [];
        }
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
                    .map(([k, v]) => k in serviceData ? serviceData[k] == v ? 1 : -1 : 0)
                    .reduce((sum, e) => sum + e, 0);
                const fixedArgsOverlapB = Object.entries(b.service_data || {})
                    .map(([k, v]) => k in serviceData ? serviceData[k] == v ? 1 : -1 : 0)
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
            let variables = Object.assign({}, actions[0].variables || {});
            Object.entries(serviceData).forEach(([key, val]) => {
                if (!Object.keys(variables || {}).includes(key))
                    return;
                if (variables[key].type != EVariableType.List)
                    return;
                variables = Object.assign(Object.assign({}, variables), { [key]: variables[key].options.some(e => e.value == val)
                        ? variables[key]
                        : Object.assign(Object.assign({}, variables[key]), { options: [...variables[key].options, { value: val }] }) });
            });
            return Object.assign(Object.assign({}, actions[0]), { service_data: Object.assign(Object.assign({}, actions[0].service_data || {}), serviceData), variables: variables });
        }
        else {
            //unknown action, add from config
            return {
                service: service,
                service_data: action.service_data
            };
        }
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
                if (!p$1(action.service).length)
                    action = Object.assign(Object.assign({}, action), { service: p$1(entity_id) + '.' + g$1(action.service) });
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
                        [res]: Object.assign(Object.assign({}, actions[res]), omit(action, 'variables'))
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
                            .reduce((obj, [key, val]) => val ? Object.assign(obj, { [key]: val }) : obj, {});
                        //add new variables
                        const newVariables = Object.keys(action.variables).filter(e => !Object.keys(variableConfig).includes(e));
                        variableConfig = Object.assign(Object.assign({}, variableConfig), computeVariables(pick(action.variables, newVariables)));
                        Object.assign(actions, {
                            [res]: Object.assign(Object.assign({}, actions[res]), { variables: variableConfig })
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
                    if (action.variables[field].type == EVariableType.List && action.variables[field].options.length == 1) {
                        action = Object.assign(Object.assign({}, action), { service_data: Object.assign(Object.assign({}, action.service_data), { [field]: action.variables[field].options[0].value }), variables: omit(action.variables, field) });
                    }
                });
            }
            return action;
        });
        return actions;
    }

    let ScheduleEntityRow = class ScheduleEntityRow extends h$2 {
        set schedule(schedule) {
            this._schedule = schedule;
        }
        set hass(hass) { this._hass = hass; }
        get hass() { return this._hass; }
        shouldUpdate(changedProps) {
            if (changedProps.size > 1)
                return true;
            const oldHass = changedProps.get('_hass');
            if (oldHass && this._schedule)
                return JSON.stringify(oldHass.states[this._schedule.entity_id]) !== JSON.stringify(this._hass.states[this._schedule.entity_id]);
            const oldSchedule = changedProps.get("_schedule");
            if (oldSchedule)
                return JSON.stringify(oldSchedule) !== JSON.stringify(this._schedule);
            else
                return true;
        }
        render() {
            var _a, _b;
            if (!this._schedule.next_entries.length) {
                return this._hass.config.state !== STATE_NOT_RUNNING
                    ? T `
        <hui-warning>
          Defective schedule entity: ${this._schedule.entity_id}
        </hui-warning>
      `
                    : T `
        <hui-warning>
        ${this._hass.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `;
            }
            const nextEntry = this._schedule.timeslots[this._schedule.next_entries[0]];
            const entities = unique(nextEntry.actions.map(e => e.entity_id || e.service)).map(e => parseEntity(e, this._hass, this.config));
            const entityIcon = unique(entities.map(e => e.icon)).length == 1
                ? entities[0].icon
                : standardIcon(entities[0].id, this._hass);
            const entityDomains = unique(entities.map(e => p$1(e.id)));
            const entityName = entities.length == 1
                ? entities[0].name
                : entityDomains.length == 1
                    ? `${entities.length}x ${localize(`domains.${entityDomains[0]}`, getLocale(this._hass)) || entityDomains[0]}`
                    : `${entities.length}x entities`;
            const match = computeActions(nextEntry.actions[0].entity_id || nextEntry.actions[0].service, this._hass, this.config)
                .filter(e => compareActions(e, nextEntry.actions[0], true))
                .reduce((_acc, e) => e, undefined);
            const action = match
                ? Object.assign(Object.assign({}, match), { service_data: Object.assign(Object.assign({}, match.service_data), Object.entries(nextEntry.actions[0].service_data || {})
                        .filter(([k,]) => Object.keys(match.variables || {}).includes(k))
                        .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})) }) : importAction(nextEntry.actions[0], this._hass);
            const icon = this.config.display_options && this.config.display_options.icon && this.config.display_options.icon == 'entity'
                ? entityIcon
                : action.icon;
            const computeDisplayItem = (displayItem) => {
                switch (displayItem) {
                    case 'name':
                        return this._schedule.name || '';
                    case 'relative-time':
                        return `<my-relative-time></my-relative-time>`;
                    case 'additional-tasks':
                        return this._schedule.timeslots.length > 1
                            ? '+' + localize('ui.panel.overview.additional_tasks', getLocale(this._hass), '{number}', String(this._schedule.timeslots.length - 1))
                            : '';
                    case 'time':
                        return capitalize(this.computeTime(this._schedule.timeslots[this._schedule.next_entries[0]]));
                    case 'days':
                        return capitalize(this.computeDays(this._schedule.weekdays));
                    case 'entity':
                        return entityName.length ? capitalize(PrettyPrintName(entityName)) : '';
                    case 'action':
                        return capitalize(computeActionDisplay(action));
                    case 'tags':
                        return (this._schedule.tags || []).map(e => `<tag>${e}</tag>`).join('');
                    default:
                        const regex = /\{([^\}]+)\}/;
                        let res;
                        while ((res = regex.exec(displayItem))) {
                            displayItem = displayItem.replace(res[0], String(computeDisplayItem(String(res[1]))));
                        }
                        return displayItem;
                }
            };
            const renderDisplayItems = (displayItem) => {
                const replaceRelativeTime = (input) => {
                    const parts = input.split('<my-relative-time></my-relative-time>');
                    if (parts.length > 1)
                        return T `
          ${parts[0] ? o$6(parts[0]) : ''}
          <my-relative-time .hass=${this._hass} .datetime=${new Date(this._schedule.timestamps[this._schedule.next_entries[0]])}> </my-relative-time>
          ${parts[1] ? o$6(parts[1]) : ''}
        `;
                    const parts2 = input.split(/<tag>(.*?)<\/tag>/g);
                    if (parts2.length > 1) {
                        return parts2.filter(e => e.length).map(e => o$6(`<span class="filter-tag">${e}</span>`));
                    }
                    return o$6(input);
                };
                return typeof displayItem == 'string'
                    ? replaceRelativeTime(computeDisplayItem(displayItem))
                    : displayItem.map(e => {
                        const string = computeDisplayItem(e);
                        return string
                            ? T `
                  ${replaceRelativeTime(string)}<br />
                `
                            : '';
                    });
            };
            return T `
      <ha-icon icon="${PrettyPrintIcon(icon)}"></ha-icon>
      <div class="info">
        ${!this.config.display_options || !this.config.display_options.primary_info
            ? renderDisplayItems('{entity}: {action}')
            : renderDisplayItems(this.config.display_options.primary_info)}
        <div class="secondary">
          ${!this.config.display_options || !this.config.display_options.secondary_info
            ? renderDisplayItems(['relative-time', 'additional-tasks'])
            : renderDisplayItems(this.config.display_options.secondary_info)}
        </div>
      </div>
      <ha-switch
        ?checked=${["on", "triggered"].includes(((_a = this.hass.states[this._schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '')}
        ?disabled=${((_b = this.hass.states[this._schedule.entity_id]) === null || _b === void 0 ? void 0 : _b.state) == "completed"}
        @click=${this.toggleDisabled}
      >
      </ha-switch>
    `;
        }
        computeDays(weekdays) {
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
            if (!this._hass)
                return '';
            switch (weekdayType(weekdays)) {
                case EDayType.Daily:
                    return localize('ui.components.date.day_types_long.daily', getLocale(this._hass));
                case EDayType.Workday:
                    return localize('ui.components.date.day_types_long.workdays', getLocale(this._hass));
                case EDayType.Weekend:
                    return localize('ui.components.date.day_types_long.weekend', getLocale(this._hass));
                case EDayType.Custom:
                    const list = weekdayToList(weekdays);
                    const seq = findSequence(list);
                    const len = Math.max(...seq);
                    if (list.length == 6) {
                        const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !list.includes(e));
                        return localize('ui.components.date.repeated_days_except', getLocale(this._hass), '{excludedDays}', formatWeekday(missing.pop(), getLocale(this._hass)));
                    }
                    const dayNames = list.map(e => formatWeekday(e, getLocale(this._hass)));
                    if (list.length >= 3 && len >= 3) {
                        const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
                        dayNames.splice(start, len, localize('ui.components.date.days_range', getLocale(this._hass), ['{startDay}', '{endDay}'], [dayNames[start], dayNames[start + len - 1]]));
                    }
                    const daysString = dayNames.length > 1
                        ? `${dayNames.slice(0, -1).join(', ')} ${this._hass.localize('ui.common.and')} ${dayNames.pop()}`
                        : `${dayNames.pop()}`;
                    return localize('ui.components.date.repeated_days', getLocale(this._hass), '{days}', daysString);
                default:
                    return '';
            }
        }
        computeTime(entry) {
            if (!entry.stop) {
                const timeString = entry.start;
                const res = parseRelativeTime(timeString);
                if (res) {
                    const eventString = res.event == ETimeEvent.Sunrise
                        ? this._hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunrise').toLowerCase()
                        : this._hass.localize('ui.panel.config.automation.editor.conditions.type.sun.sunset').toLowerCase();
                    if (Math.abs(stringToTime(res.offset)) < 5 * 60)
                        return localize('ui.components.time.at_sun_event', getLocale(this.hass), '{sunEvent}', eventString);
                    const signString = res.sign == '-'
                        ? this._hass
                            .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
                            .slice(0, -1)
                            .toLowerCase()
                        : this._hass
                            .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
                            .slice(0, -1)
                            .toLowerCase();
                    const timeStr = formatTime(stringToDate(res.offset), getLocale(this.hass), TimeFormat.twenty_four);
                    return `${timeStr} ${signString} ${eventString}`;
                }
                else {
                    const time = stringToDate(timeString);
                    return localize('ui.components.time.absolute', getLocale(this.hass), '{time}', formatTime(time, getLocale(this.hass)));
                }
            }
            else {
                const start = formatTime(stringToDate(entry.start), getLocale(this.hass));
                const end = formatTime(stringToDate(entry.stop), getLocale(this.hass));
                return localize('ui.components.time.interval', getLocale(this.hass), ['{startTime}', '{endTime}'], [start, end]);
            }
        }
        toggleDisabled(ev) {
            if (!this._hass || !this._schedule)
                return;
            ev.stopPropagation();
            const checked = !ev.target.checked;
            this._hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this._schedule.entity_id });
        }
    };
    ScheduleEntityRow.styles = i `
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
      background: rgba(var(--rgb-primary-color), 0.30);
    }
  `;
    __decorate([
        e$3()
    ], ScheduleEntityRow.prototype, "config", void 0);
    __decorate([
        e$3()
    ], ScheduleEntityRow.prototype, "_schedule", void 0);
    __decorate([
        e$3()
    ], ScheduleEntityRow.prototype, "_hass", void 0);
    ScheduleEntityRow = __decorate([
        n$4('scheduler-entity-row')
    ], ScheduleEntityRow);

    const fetchSchedules = (hass) => hass.callWS({
        type: "scheduler",
    });
    const fetchScheduleItem = (hass, schedule_id) => hass.callWS({
        type: "scheduler/item",
        schedule_id: schedule_id
    });
    const saveSchedule = (hass, config) => {
        return hass
            .callApi("POST", "scheduler/add", config);
    };
    const editSchedule = (hass, config) => {
        return hass
            .callApi("POST", "scheduler/edit", config);
    };
    const deleteSchedule = (hass, schedule_id) => {
        return hass
            .callApi("POST", "scheduler/remove", { schedule_id: schedule_id });
    };
    const fetchTags = (hass) => hass.callWS({
        type: "scheduler/tags",
    });
    function showErrorDialog(target, error) {
        R$1(target, 'show-dialog', {
            dialogTag: 'dialog-error',
            dialogImport: () => Promise.resolve().then(function () { return dialogError; }),
            dialogParams: { error: error }
        });
    }
    function handleError(err, el) {
        let errorMessage = T `
    <b>Something went wrong!</b><br>
    ${err.body.message}<br><br>
    ${err.error}<br><br>
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;
        showErrorDialog(el, errorMessage);
    }

    function entityFilter(entity_id, config) {
        var _a;
        const applyFilter = (value, filter) => {
            return (((filter.include || []).some(e => matchPattern(e, value)) ||
                (Object.keys(filter.customize || {}).some(e => matchPattern(e, value)))) && !(filter.exclude || []).some(e => matchPattern(e, value)));
        };
        return (((_a = config.groups) === null || _a === void 0 ? void 0 : _a.some(group => applyFilter(entity_id, group))) ||
            applyFilter(entity_id, config));
    }

    const computeScheduleTimestamp = (schedule) => new Date(schedule.timestamps[schedule.next_entries[0]]).valueOf();
    const sortSchedules = (schedules, hass) => {
        let output = [...schedules];
        output.sort((a, b) => {
            var _a, _b;
            const stateA = (_a = hass.states[a.entity_id]) === null || _a === void 0 ? void 0 : _a.state;
            const stateB = (_b = hass.states[b.entity_id]) === null || _b === void 0 ? void 0 : _b.state;
            if (['on', 'triggered', 'off'].includes(stateA) && !['on', 'triggered', 'off'].includes(stateB))
                return -1;
            else if (!['on', 'triggered', 'off'].includes(stateA) && ['on', 'triggered', 'off'].includes(stateB))
                return 1;
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
    let SchedulerEntitiesCard = class SchedulerEntitiesCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.showDiscovered = false;
            this.connectionError = false;
        }
        hassSubscribe() {
            this.loadSchedules();
            return [
                this.hass.connection.subscribeMessage((ev) => this.updateScheduleItem(ev), { type: WebsocketEvent })
            ];
        }
        async updateScheduleItem(ev) {
            //only update single schedule
            fetchScheduleItem(this.hass, ev.schedule_id)
                .then(schedule => {
                var _a;
                const oldSchedule = (_a = this.schedules) === null || _a === void 0 ? void 0 : _a.find(e => e.schedule_id == ev.schedule_id);
                let schedules = [...this.schedules || []];
                if (!schedule || !this.filterIncludedSchedule(schedule)) {
                    //schedule is not in the list, remove if it was in the list
                    if (oldSchedule) {
                        schedules = schedules.filter(e => e.schedule_id != ev.schedule_id);
                    }
                }
                else if (!oldSchedule) {
                    //add a new schedule and sort the list
                    schedules = sortSchedules([...schedules, schedule], this.hass);
                }
                else if (oldSchedule.enabled == schedule.enabled &&
                    computeScheduleTimestamp(oldSchedule) == computeScheduleTimestamp(schedule)) {
                    //only overwrite the existing schedule
                    schedules = schedules.map(e => e.schedule_id == schedule.schedule_id ? schedule : e);
                }
                else {
                    //overwrite the existing schedule and sort
                    schedules = sortSchedules(schedules.map(e => e.schedule_id == schedule.schedule_id ? schedule : e), this.hass);
                }
                this.schedules = [...schedules];
            });
        }
        async loadSchedules() {
            //load all schedules
            fetchSchedules(this.hass)
                .then(res => {
                let schedules = res;
                schedules = schedules.filter(e => this.filterIncludedSchedule(e));
                this.schedules = sortSchedules(schedules, this.hass);
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
            else if (oldConfig && this.config && (oldConfig.discover_existing !== this.config.discover_existing || oldConfig.tags !== this.config.tags))
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
                <ha-switch
                  ?checked=${this.schedules.some(el => { var _a; return ["on", "triggered"].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); })}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `
            : ''}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this.config.show_add_button !== false
            ? T `
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
            ?disabled=${this.connectionError}
          >${this.hass.localize('ui.components.area-picker.add_dialog.add')}
          </mwc-button>
        </div>` : ''}
      </ha-card>
    `;
        }
        getRows() {
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
            let includedSchedules = [];
            let excludedEntities = [];
            this.schedules
                .forEach(schedule => {
                const included = schedule.timeslots
                    .every(timeslot => timeslot.actions
                    .every(action => entityFilter(action.entity_id || action.service, this.config)));
                if (!included)
                    excludedEntities.push(schedule);
                else if (!this.filterByTags(schedule))
                    excludedEntities.push(schedule);
                else
                    includedSchedules.push(schedule);
            });
            return T `
      ${includedSchedules.map(schedule => {
            var _a;
            const state = ((_a = this.hass.states[schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '';
            return T `
          <scheduler-entity-row
            ?disabled=${!["on", "triggered"].includes(state)}
            .hass=${this.hass}
            .schedule=${schedule}
            .config=${this.config}
            @click=${() => this.editItemClick(schedule.schedule_id)}
          >
          </scheduler-entity-row>
        `;
        })}
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
                  + ${localize('ui.panel.overview.excluded_items', getLocale(this.hass), '{number}', excludedEntities.length)}
                </button>
              </div>
            `
                : T `
              ${excludedEntities.map(schedule => {
                    var _a;
                    const state = ((_a = this.hass.states[schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '';
                    return T `
                  <scheduler-entity-row
                    ?disabled=${!["on", "triggered"].includes(state)}
                    .hass=${this.hass}
                    .schedule=${schedule}
                    .config=${this.config}
                    @click=${() => this.editItemClick(schedule.schedule_id)}
                  >
                  </scheduler-entity-row>
                `;
                })}
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
        toggleDisableAll(ev) {
            if (!this.hass || !this.schedules)
                return;
            const checked = ev.target.checked;
            this.schedules.forEach(el => {
                this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
            });
        }
        editItemClick(entity_id) {
            const myEvent = new CustomEvent('editClick', { detail: entity_id });
            this.dispatchEvent(myEvent);
        }
        newItemClick() {
            const myEvent = new CustomEvent('newClick');
            this.dispatchEvent(myEvent);
        }
        filterIncludedSchedule(schedule) {
            if (this.config.discover_existing) {
                return true;
            }
            else if (!schedule) {
                return false;
            }
            else if (!schedule.timeslots.every(slot => slot.actions.every(action => entityFilter(action.entity_id || action.service, this.config)))) {
                return false;
            }
            else
                return this.filterByTags(schedule);
        }
        filterByTags(schedule) {
            var _a;
            const filters = AsArray(this.config.tags);
            if (filters.length) {
                if ((schedule.tags || []).some(e => filters.includes(e)))
                    return true;
                else if (filters.includes('none') && !((_a = schedule.tags) === null || _a === void 0 ? void 0 : _a.length))
                    return true;
                return false;
            }
            return true;
        }
    };
    SchedulerEntitiesCard.styles = i `
    ${commonStyle}
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

    function entityGroups(entities, config, hass) {
        let groups = [];
        //create groups from user config
        if (config.groups) {
            config.groups.forEach(el => {
                const group = {
                    name: el.name,
                    icon: el.icon || DefaultGroupIcon,
                    entities: entities.filter(e => entityFilter(e, el)),
                };
                groups.push(group);
            });
        }
        const ungroupedEntities = entities.filter(e => !groups.some(g => g.entities.includes(e)));
        const domains = ungroupedEntities.map(p$1).filter((v, k, arr) => arr.indexOf(v) === k);
        //automatically create groups for ungrouped entities
        domains.forEach(domain => {
            const group = {
                name: localize(`domains.${domain}`, getLocale(hass)) || domain,
                icon: (config.standard_configuration === undefined || config.standard_configuration) && domain in domainIcons
                    ? domainIcons[domain]
                    : DefaultGroupIcon,
                entities: ungroupedEntities.filter(e => entityFilter(e, { include: [domain], exclude: [] })),
            };
            groups.push(group);
        });
        return groups;
    }

    const personStates = (hass, _stateObj) => listVariable({
        options: [
            {
                value: "home",
                name: hass.localize("state_badge.person.home", getLocale(hass)),
                icon: 'hass:home-outline',
            },
            {
                value: "not_home",
                name: hass.localize("state_badge.person.not_home", getLocale(hass)),
                icon: 'hass:exit-run'
            }
        ]
    });

    const deviceTrackerStates = (hass, _stateObj) => listVariable({
        options: [
            {
                value: "home",
                name: hass.localize("state_badge.device_tracker.home", getLocale(hass)),
                icon: 'hass:home-outline',
            },
            {
                value: "not_home",
                name: hass.localize("state_badge.device_tracker.not_home", getLocale(hass)),
                icon: 'hass:exit-run'
            }
        ]
    });

    const proximityStates = (_hass, stateObj) => levelVariable({
        unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : ''
    });

    const sunStates = (hass, stateObj) => listVariable({
        options: [
            {
                value: "below_horizon",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "below_horizon" }), getLocale(hass)),
                icon: "hass:weather-sunny-off"
            },
            {
                value: "above_horizon",
                name: k$1(hass.localize, Object.assign(Object.assign({}, stateObj), { state: "above_horizon" }), getLocale(hass)),
                icon: "hass:weather-sunny"
            },
        ]
    });

    function standardStates(entity_id, hass) {
        try {
            const domain = p$1(entity_id);
            const stateObj = hass.states[entity_id];
            if (!stateObj)
                return null;
            switch (domain) {
                case 'alarm_control_panel':
                    return alarmControlPanelStates(hass, stateObj);
                case 'binary_sensor':
                    return binarySensorStates(hass, stateObj);
                case 'climate':
                    return climateStates(hass, stateObj);
                case 'cover':
                    return coverStates(hass, stateObj);
                case 'device_tracker':
                    return deviceTrackerStates(hass, stateObj);
                case 'fan':
                    return fanStates(hass, stateObj);
                case 'group':
                    const entities = stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id) ? stateObj.attributes.entity_id : [];
                    const configs = entities.map(e => standardStates(e, hass)).filter(isDefined);
                    return groupStates(hass, stateObj, configs);
                case 'input_boolean':
                    return inputBooleanStates(hass, stateObj);
                case 'input_number':
                    return inputNumberStates(hass, stateObj);
                case 'input_select':
                    return inputSelectStates(hass, stateObj);
                case 'select':
                    return selectStates(hass, stateObj);
                case 'proximity':
                    return proximityStates(hass, stateObj);
                case 'sensor':
                    return sensorStates(hass, stateObj);
                case 'sun':
                    return sunStates(hass, stateObj);
                case 'switch':
                    return switchStates(hass, stateObj);
                case 'light':
                    return lightStates(hass, stateObj);
                case 'lock':
                    return lockStates(hass, stateObj);
                case 'person':
                    return personStates(hass, stateObj);
                default:
                    return null;
            }
        }
        catch (e) {
            console.error(`Scheduler-card failed to load states for '${entity_id}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`);
            return null;
        }
    }

    function computeStates(entity_id, hass, config) {
        //fetch standard states for entity
        let stateConfig = config.standard_configuration
            ? standardStates(entity_id, hass)
            : null;
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

    function computeEntities(hass, config, options = { filterActions: true, filterStates: false }) {
        let entities = Object.keys(hass.states)
            .filter(e => entityFilter(e, config));
        if ('notify' in hass.services) {
            entities = [
                ...entities,
                ...Object.keys(hass.services['notify'])
                    .map(e => `notify.${e}`)
                    .filter(e => entityFilter(e, config))
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
        return ((_a = item.name) === null || _a === void 0 ? void 0 : _a.trim()) || item.value || item.id || "";
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
        @click=${() => this.selectItem(id)}
      >
        ${item.icon
            ? T `<ha-icon icon="${PrettyPrintIcon(item.icon)}" class="padded-right"></ha-icon>`
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
                    const matchedActions = this.getActionsForEntity()
                        .filter(e => actions.some(a => compareActions(a, e, true)));
                    if (matchedActions.length == 1)
                        this.selectedAction = matchedActions[0];
                }
            }
        }
        getGroups() {
            if (!this.hass || !this.config)
                return [];
            const entities = computeEntities(this.hass, this.config)
                .filter(e => p$1(e) !== "switch" || !this.scheduleEntities.includes(e));
            let groups = entityGroups(entities, this.config, this.hass);
            groups.sort(sortAlphabetically);
            return groups;
        }
        getEntitiesForGroup() {
            if (!this.selectedGroup || !this.hass || !this.config)
                return [];
            let entities = this.selectedGroup.entities.map(e => parseEntity(e, this.hass, this.config));
            entities.sort(sortAlphabetically);
            return entities;
        }
        getActionsForEntity() {
            if (!this.hass || !this.config || !this.selectedEntities.length)
                return [];
            let actions = computeActions(this.selectedEntities, this.hass, this.config).map(e => Object.assign(e, { name: computeActionDisplay(e) }));
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
                    @change=${(ev) => { this.multipleEntity = ev.target.checked; }}
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
                    timeSchemeSelected: this.timeSchemeSelected
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
            this._time = 0;
            this.maxOffset = 2;
        }
        get time() {
            if (this._time >= 0)
                return this._time;
            return Math.abs(this._time);
        }
        set time(value) {
            this._time = roundTime(value, this.stepSize, {
                wrapAround: !this.relativeMode,
                maxHours: this.relativeMode ? this.maxOffset : undefined
            });
        }
        firstUpdated() {
            const res = parseRelativeTime(this.value);
            if (!res)
                this.time = stringToTime(this.value);
            else {
                this.relativeMode = true;
                this.event = res.event == ETimeEvent.Sunrise ? ETimeEvent.Sunrise : ETimeEvent.Sunset;
                this.time = res.sign == '+' ? stringToTime(res.offset) : -stringToTime(res.offset);
            }
        }
        updated() {
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
          <mwc-button @click=${() => this.time = this._time + 3600}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${timeParts[0].padStart(2, '0')}</div>
        <div class="hours-down">
          <mwc-button @click=${() => this.time = this._time - 3600}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${() => this.time = this._time + this.stepSize * 60}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${timeParts[1]}</div>
        <div class="minutes-down">
          <mwc-button @click=${() => this.time = this._time - this.stepSize * 60}>
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
            <ha-icon icon="hass:${this.event == ETimeEvent.Sunrise ? 'weather-sunny' : 'weather-night'}"></ha-icon>
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
      ` : ''}    
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
            const ts_sunrise = stringToTime(sunEntity.attributes.next_rising);
            const ts_sunset = stringToTime(sunEntity.attributes.next_setting);
            if (this.relativeMode) {
                this.event = Math.abs(this._time - ts_sunrise) < Math.abs(this._time - ts_sunset)
                    ? ETimeEvent.Sunrise
                    : ETimeEvent.Sunset;
                let offset = this.event == ETimeEvent.Sunrise
                    ? this._time - ts_sunrise
                    : this._time - ts_sunset;
                if (offset > 7200)
                    offset = 7200;
                else if (offset < -7200)
                    offset = -7200;
                this.time = offset;
            }
            else {
                this.time = this.event == ETimeEvent.Sunrise
                    ? this._time + ts_sunrise
                    : this._time + ts_sunset;
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

    const secondsPerDay = 86400;
    function Duration(el) {
        const start = stringToTime(el.start);
        let stop = stringToTime(el.stop);
        if (stop < start)
            stop += secondsPerDay;
        return stop - start;
    }
    let TimeslotEditor = class TimeslotEditor extends h$2 {
        constructor() {
            super(...arguments);
            this.entries = [];
            this.actions = [];
            this.stepSize = 10;
            this._activeEntry = null;
            this._activeThumb = null;
            this.formatAmPm = false;
            this._currentTime = null;
            this._activeEntryMem = null;
        }
        firstUpdated() {
            this.formatAmPm = formatAmPm(getLocale(this.hass));
        }
        render() {
            if (!this.hass)
                return T ``;
            return T `
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          ${this.formatAmPm
            ? T `
                <div class="slider-legend-item wide empty"></div>
                <div class="slider-legend-item wide">04:00 AM</div>
                <div class="slider-legend-item wide">08:00 AM</div>
                <div class="slider-legend-item wide">12:00 PM</div>
                <div class="slider-legend-item wide">04:00 PM</div>
                <div class="slider-legend-item wide">08:00 PM</div>
                <div class="slider-legend-item wide empty"></div>
              `
            : T `
                <div class="slider-legend-item empty"></div>
                <div class="slider-legend-item">03:00</div>
                <div class="slider-legend-item">06:00</div>
                <div class="slider-legend-item">09:00</div>
                <div class="slider-legend-item">12:00</div>
                <div class="slider-legend-item">15:00</div>
                <div class="slider-legend-item">18:00</div>
                <div class="slider-legend-item">21:00</div>
                <div class="slider-legend-item empty"></div>
              `}
        </div>
      </div>
      <div>
        <mwc-button @click=${this._addSlot} ?disabled=${this._activeEntry === null || this.entries.length >= 24}>
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
        </mwc-button>
        <mwc-button @click=${this._removeSlot} ?disabled=${this._activeEntry === null || this.entries.length <= 2}>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize('ui.common.delete')}
        </mwc-button>
      </div>
    `;
        }
        getSlots() {
            const output = [];
            this.entries.forEach((el, i) => {
                output.push(T `
        <div
          class="slider-slot${this._activeEntry == i ? ' active' : ''}${el.actions ? ' filled' : ''}"
          @click=${(ev) => { this._handleSegmentClick(ev, i); }}
          style="width: ${(Duration(el) / secondsPerDay) * 100}%"
        >
          <span class="content">${this.getEntryAction(el)}</div>
        </div>
      `);
                if (i < this.entries.length - 1) {
                    const ts = stringToTime(this.entries[i].stop);
                    output.push(T `
          <div
            class="slider-thumb${this._activeThumb == i ? ' active' : ''} ${this._activeEntry == i || this._activeEntry == (i + 1) ? '' : 'hidden'}"
            
          >
            <div
              class="slider-thumb-ripple"
              index="${i}"
              @mousedown=${this._handleTouchStart}
              @touchstart=${this._handleTouchStart}
            >
              <ha-icon
                icon="hass:unfold-more-vertical"
              >
              </ha-icon>
            </div>
            <div
              class="slider-thumb-tooltip ${this.formatAmPm ? 'wide' : ''} ${this._activeEntryMem == i && this._activeEntryMem != 0 ? 'right' : this._activeEntryMem == (i + 1) && (this._activeEntryMem + 1) != this.entries.length ? 'left' : 'center'}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${formatTime(stringToDate(this.entries[i].stop), getLocale(this.hass))}
            </div>
          </div>
        `);
                }
            });
            return output;
        }
        updated() {
            this.shadowRoot.querySelectorAll('.slider-thumb-tooltip').forEach((el, i) => {
                //cannot assign text to element directly in Lit 2
                //el.innerText = formatTime(stringToDate(this.entries[i].stop!), this.hass!.language);
                el.childNodes[2].textContent = formatTime(stringToDate(this.entries[i].stop), getLocale(this.hass));
            });
        }
        getEntryAction(entry) {
            if (!this.hass)
                return;
            if (!entry.actions)
                return '';
            return unique(entry.actions.map(action => {
                const actionConfig = this.actions.find(e => compareActions(e, action, true));
                if (!actionConfig)
                    return '???';
                if (actionConfig.variables && Object.keys(actionConfig.variables).some(field => action.service_data && field in action.service_data)) {
                    return Object.entries(actionConfig.variables)
                        .filter(([field,]) => action.service_data && field in action.service_data)
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
                            return "";
                    }).join(", ");
                }
                return PrettyPrintName(actionConfig.name || localize(`services.${action.service}`, getLocale(this.hass)) || action.service);
            })).join(', ');
        }
        _handleSegmentClick(e, entry_id) {
            const el = e.target;
            this._activeEntry = this._activeEntry == entry_id ? null : entry_id;
            this._activeEntryMem = entry_id;
            const myEvent = new CustomEvent('update', { detail: { entry: this._activeEntry } });
            this.dispatchEvent(myEvent);
        }
        _handleTouchStart(e) {
            let thumbHandle = e.target;
            if (!thumbHandle)
                return;
            if (thumbHandle.nodeName == 'HA-ICON')
                thumbHandle = thumbHandle.parentElement;
            const thumb_index = Number(thumbHandle.getAttribute("index"));
            const thumbElement = thumbHandle.parentNode;
            const trackElement = thumbElement.parentElement;
            const trackCoords = trackElement.getBoundingClientRect();
            const firstSlot = thumbElement.previousElementSibling;
            const secondSlot = thumbElement.nextElementSibling;
            const toolTip = thumbElement.querySelector('.slider-thumb-tooltip');
            this._activeThumb = thumb_index;
            const availableWidth = firstSlot.offsetWidth + secondSlot.offsetWidth;
            const trackWidth = trackCoords.width;
            const slots = Array.from(trackElement.querySelectorAll('.slider-slot'));
            const slotWidths = slots.map(e => e.offsetWidth);
            let xStart = 0;
            let slotIndex = -1;
            slots.forEach((e, i) => {
                if (e == firstSlot) {
                    slotIndex = i;
                }
                else if (slotIndex == -1) {
                    xStart = xStart + slotWidths[i];
                }
            });
            const t1 = stringToTime(this.entries[slotIndex].start);
            const t2 = stringToTime(this.entries[slotIndex + 1].stop) || secondsPerDay;
            const x1 = (t1 + this.stepSize * 60) / secondsPerDay * trackWidth;
            const x2 = (t2 - this.stepSize * 60) / secondsPerDay * trackWidth;
            let mouseMoveHandler = (e) => {
                let startDragX;
                if (typeof TouchEvent !== 'undefined') {
                    if (e instanceof TouchEvent)
                        startDragX = e.changedTouches[0].pageX;
                    else
                        startDragX = e.pageX;
                }
                else
                    startDragX = e.pageX;
                let x = startDragX - trackCoords.left;
                if (x < x1)
                    x = x1;
                else if (x > x2)
                    x = x2;
                firstSlot.style.width = `${Math.round(x - xStart)}px`;
                secondSlot.style.width = `${Math.round(availableWidth - (x - xStart))}px`;
                let time = (x / trackWidth) * secondsPerDay;
                time = Math.round(time) >= secondsPerDay ? secondsPerDay : roundTime(time, this.stepSize);
                this._currentTime = time;
                toolTip.dispatchEvent(new CustomEvent('update'));
            };
            const mouseUpHandler = () => {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('touchmove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
                window.removeEventListener('touchend', mouseUpHandler);
                mouseMoveHandler = () => {
                    /**/
                };
                if (this._currentTime !== null) {
                    const newStop = this._currentTime;
                    const totalDuration = Duration(this.entries[slotIndex]) + Duration(this.entries[slotIndex + 1]);
                    const startTime = stringToTime(this.entries[slotIndex].start);
                    const entries = Object.assign(this.entries, {
                        [slotIndex]: Object.assign(Object.assign({}, this.entries[slotIndex]), { stop: timeToString(newStop) }),
                        [slotIndex + 1]: Object.assign(Object.assign({}, this.entries[slotIndex + 1]), { start: timeToString(newStop), stop: timeToString(startTime + totalDuration) })
                    });
                    const myEvent = new CustomEvent('update', { detail: { entries: entries } });
                    this.dispatchEvent(myEvent);
                }
                this._currentTime = null;
                this._activeThumb = null;
            };
            window.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('touchend', mouseUpHandler);
            window.addEventListener('blur', mouseUpHandler);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('touchmove', mouseMoveHandler);
        }
        _updateMarker(ev) {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const ts = new Date(startOfDay.getTime() + this._currentTime * 1000);
            const target = ev.target;
            //cannot assign text to element directly in Lit 2
            //target.innerText = formatTime(ts, this.hass!.language);
            target.childNodes[2].textContent = formatTime(ts, getLocale(this.hass));
        }
        _addSlot() {
            const activeSlot = this.entries[this._activeEntry];
            const startTime = stringToTime(activeSlot.start);
            const endTime = stringToTime(activeSlot.stop);
            const newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);
            const entries = [
                ...this.entries.slice(0, this._activeEntry),
                Object.assign(Object.assign({}, this.entries[this._activeEntry]), { stop: timeToString(newStop) }),
                Object.assign(Object.assign({}, this.entries[this._activeEntry]), { start: timeToString(newStop), stop: timeToString(endTime), actions: [] }),
                ...this.entries.slice(this._activeEntry + 1)
            ];
            const myEvent = new CustomEvent('update', { detail: { entries: entries } });
            this.dispatchEvent(myEvent);
        }
        _removeSlot() {
            const cutIndex = this._activeEntry == this.entries.length - 1 ? this._activeEntry - 1 : this._activeEntry;
            const entries = [
                ...this.entries.slice(0, cutIndex),
                Object.assign(Object.assign({}, this.entries[cutIndex + 1]), { start: this.entries[cutIndex].start, stop: this.entries[cutIndex + 1].stop }),
                ...this.entries.slice(cutIndex + 2)
            ];
            if (this._activeEntry == this.entries.length)
                this._activeEntry--;
            const myEvent = new CustomEvent('update', { detail: { entries: entries } });
            this.dispatchEvent(myEvent);
        }
    };
    TimeslotEditor.styles = i `
    div.slider-track {
      height: 50px;
      width: 100%;
      display: flex;
    }
    div.slider-slot {
      height: calc(100%);
      width: 50%;
      display: flex;
      background: var(--primary-color);
      opacity: 0.85;
      z-index: 1;
      cursor: pointer;
      color: var(--text-primary-color);
      justify-content: center;
      align-items: center;
      background: none;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
    div.slider-slot:before {
      content: ' ';
      background: var(--primary-color);
      opacity: 0.3;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    div.slider-slot:hover:before {
      opacity: 0.6;
    }
    div.slider-slot.filled:before {
      opacity: 0.8;
    }
    div.slider-slot.filled:hover:before {
      opacity: 1;
    }
    div.slider-slot.active:before {
      opacity: 0.85;
      background: var(--accent-color);
    }
    div.slider-track div.slider-slot:first-of-type:before {
      border-radius: 4px 0px 0px 4px;
    }
    div.slider-track div.slider-slot:last-of-type:before {
      border-radius: 0px 4px 4px 0px;
    }
    div.slider-slot .content {
      display: inline-block;
      margin: 0px 2px;
      word-break: break-all;
      overflow: hidden;
      line-height: 1em;
      max-height: 3em;
      text-overflow: ellipsis;
    }
    div.slider-track div.slider-slot:first-of-type .content {
      margin-left: 2px;
    }
    div.slider-track div.slider-slot:last-of-type .content {
      margin-right: 2px;
    }
    div.slider-thumb {
      height: 100%;
      width: 2px;
      background: var(--card-background-color);
      display: flex;
      cursor: pointer;
      z-index: 5;
      margin: 0px -1px;
      position: relative;
    }
    div.slider-thumb.active {
      z-index: 100;
    }
    div.slider-thumb-ripple {
      background: none;
      width: 36px;
      height: 36px;
      display: flex;
      flex: 1 0 36px;
      position: relative;
      border-radius: 50%;
      margin-left: -18px;
      margin-top: 7px;
    }
    div.slider-thumb-ripple:hover {
      background: rgba(var(--rgb-primary-text-color), 0.10);
    }
    div.slider-thumb .slider-thumb-ripple:before {
      content: ' ';
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgba(var(--rgb-primary-text-color), 0.20);
      z-index: -1;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      transform: scale(0);
    }
    div.slider-thumb.active .slider-thumb-ripple:before {
      transform: scale(1);
    }
    div.slider-thumb ha-icon {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      width: 24px;
      height: 24px;
      margin-top: 6px;
      margin-left: 6px;
      --mdc-icon-size: 24px;
      border-radius: 50%;
    }
    div.slider-thumb.hidden .slider-thumb-ripple {
      display: none;
    }
    div.slider-legend {
      display: flex;
      width: 100%;
    }
    div.slider-legend-item {
      width: calc(100% / 8);
      font-size: 0.9em;
      line-height: 25px;
      display: flex;
      justify-content: center;
      position: relative;
    }
    div.slider-legend-item.wide {
      width: calc(100% / 6);
    }
    div.slider-legend-item:before {
      content: ' ';
      background: var(--disabled-text-color);
      position: absolute;
      left: 0px;
      top: 0px;
      width: 1px;
      height: 8px;
      margin-left: 50%;
      margin-top: -4px;
    }
    div.slider-legend-item.empty {
      width: calc(100% / 16);
      display: flex;
    }
    div.slider-legend-item.empty.wide {
      width: calc(100% / 12);
    }
    div.slider-legend-item.empty:before {
      display: none;
    }
    div.slider-thumb-tooltip {
      background: var(--primary-color);
      border-radius: 5px;
      color: var(--text-primary-color);
      font-size: 1em;
      position: absolute;
      height: 26px;
      width: 50px;
      margin-top: -28px;
      margin-left: -25px;
      text-align: center;
      line-height: 26px;
      z-index: 1;
      transition: all 0.1s ease-in-out;
      transform-origin: center bottom;
    }
    div.slider-thumb-tooltip.wide {
      width: 70px;
      margin-left: -35px;
    }
    div.slider-thumb-tooltip.center:before {
      content: ' ';
      background: var(--primary-color);
      transform: rotate(-45deg);
      transform-origin: center;
      opacity: 1;
      position: absolute;
      margin-top: 20px;
      margin-left: 21px;
      left: 0px;
      top: 0px;
      width: 10px;
      height: 10px;
      z-index: -1;
    }
    div.slider-thumb-tooltip.wide:before {
      margin-left: 31px;
    }
    div.slider-thumb.active div.slider-thumb-tooltip {
      z-index: 10;
    }
    div.slider-thumb-tooltip.left {
      margin-left: -49px;
      transform-origin: right bottom;
    }
    div.slider-thumb-tooltip.wide.left {
      margin-left: -69px;
    }
    div.slider-thumb-tooltip.left:before {
      content: ' ';
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent; 
      border-right: 8px solid var(--primary-color);
      opacity: 1;
      position: absolute;
      margin-top: 15px;
      margin-left: 42px;
      left: 0px;
      top: 0px;
      width: 0px;
      height: 0px;
      z-index: -1;
    }
    div.slider-thumb-tooltip.wide.left:before {
      margin-left: 62px;
    }
    div.slider-thumb-tooltip.right {
      margin-left: 1px;
      transform-origin: left bottom;
    }
    div.slider-thumb-tooltip.right:before {
      content: ' ';
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent; 
      border-left: 8px solid var(--primary-color); 
      opacity: 1;
      position: absolute;
      margin-top: 15px;
      margin-left: 0px;
      left: 0px;
      top: 0px;
      width: 0px;
      height: 0px;
      z-index: -1;
    }
    div.slider-thumb.hidden div.slider-thumb-tooltip  {
      transform: scale(0);
    }
    .padded-right {
      margin-right: 11px;
    }
    mwc-button {
      margin: 2px 0px;
    }
    mwc-button.active {
      background: var(--primary-color);
      --mdc-theme-primary: var(--text-primary-color);
      border-radius: 4px;
    }
  `;
    __decorate([
        e$3()
    ], TimeslotEditor.prototype, "hass", void 0);
    __decorate([
        e$3({ type: Array })
    ], TimeslotEditor.prototype, "entries", void 0);
    __decorate([
        e$3({ type: Array })
    ], TimeslotEditor.prototype, "actions", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeslotEditor.prototype, "stepSize", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeslotEditor.prototype, "_activeEntry", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeslotEditor.prototype, "_activeThumb", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], TimeslotEditor.prototype, "formatAmPm", void 0);
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
            value = isNaN(value)
                ? this.min
                : this._roundedValue(value / this.scaleFactor);
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
      <ha-checkbox
        @change=${this.toggleChecked}
        ?checked=${!this.disabled}
      ></ha-checkbox>
    `;
        }
        toggleChecked(e) {
            const checked = e.target.checked;
            this.disabled = !checked;
            let value = this.disabled
                ? null
                : this._scaledValue(this._displayedValue);
            R$1(this, 'value-changed', { value: value });
        }
        _updateValue(e) {
            let value = Number(e.target.value);
            this._displayedValue = value;
            value = this._scaledValue(this._displayedValue);
            R$1(this, 'value-changed', { value: value });
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
            this.value = ev.detail.value;
            R$1(this, 'value-changed', { value: ev.detail.value });
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
            R$1(this, 'value-changed', { value: value });
        }
        renderListVariable() {
            const variable = this.variable;
            const options = variable.options;
            const value = String(this.value) || null;
            if (options.length == 1 && value != options[0].value)
                this.listVariableUpdated(options[0].value);
            return T `
      <button-group
        .items=${options}
        value=${value}
        @change=${this.listVariableUpdated}
      >
      </button-group>
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

      <ha-dialog
        open
        .heading=${true}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .path=${mdiClose}
          >
          </ha-icon-button>
          <span slot="title">
        ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_title")}
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        ${this.hass.localize("ui.dialogs.more_info_control.restored.confirm_remove_text")}
      </div>
    
        <mwc-button
          slot="primaryAction"
          @click=${this.cancelClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left"
          @click=${this.confirmClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.ok")}
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
            return regionSun.includes(region)
                ? 'sun'
                : regionSat.includes(region)
                    ? 'sat'
                    : 'mon';
        else
            return languageSun.includes(language)
                ? 'sun'
                : languageSat.includes(language)
                    ? 'sat'
                    : 'mon';
    }

    const assignAction = (entity_id, action) => {
        let output = {
            entity_id: entity_id,
            service: action.service,
            service_data: Object.assign({}, action.service_data)
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
                output = Object.assign(Object.assign({}, output), { service_data: Object.assign(Object.assign({}, output.service_data), { [key]: config.options.length
                            ? config.options[0].value
                            : undefined }) });
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
            this.timeslots = false;
            this.editItem = false;
        }
        firstUpdated() {
            if (!this.actions || !this.hass)
                return;
            if (!this.timeslots)
                this.activeEntry = 0;
            const actions = this.actions.map(e => {
                let action = Object.assign(Object.assign({}, e), { service_data: omit(e.service_data || {}, ...Object.keys(e.variables || {})) });
                return Object.assign(e, {
                    name: computeActionDisplay(action)
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
            ?
                T `
            ${this.getVariableEditor()}
            ${this.renderDays()}
            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <time-picker
              .hass=${this.hass}
              .value=${this.schedule.timeslots[0].start}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @change=${(ev) => this.updateActiveEntry({ start: ev.target.value })}
            >
            </time-picker>
            `
            :
                T `
            ${this.renderDays()}
            <div class="header">${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}</div>
            <timeslot-editor
              .hass=${this.hass}
              .actions=${this.actions}
              .entries=${this.schedule.timeslots}
              stepSize=${this.config.time_step || DefaultTimeStep}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor>

            ${this.renderActions()}
            ${this.getVariableEditor()}
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
  <div
    class="summary-entity"
    @click=${this.editActionClick}
  >
  ${this.entities.map(entity => T `
    <div>
      <ha-icon icon="${PrettyPrintIcon(entity.icon)}"> </ha-icon>
      ${capitalize(PrettyPrintName(entity.name ||
            this.hass.states[entity.id].attributes.friendly_name ||
            g$1(entity.id)))}
    </div>
`)}
  </div>
  <div class="summary-arrow">
    <ha-icon icon="hass:arrow-right"> </ha-icon>
  </div>
  <div
    class="summary-action"
    @click=${this.editActionClick}
  >
  ${this.timeslots
            ?
                T `
    <div>
      <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
      ${capitalize(localize('ui.panel.entity_picker.make_scheme', getLocale(this.hass)))}
    </div>
  ` : T `
    <div>
      <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}"> </ha-icon>
      ${capitalize(this.actions[0].name || g$1(this.actions[0].service))}
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
                { value: EDayType.Custom, name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label') },
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
            if (!this.hass)
                return;
            const selectedAction = this.activeEntry !== null && this.schedule.timeslots[this.activeEntry].actions.length
                ? this.schedule.timeslots[this.activeEntry].actions[0]
                : null;
            return T `
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
      <button-group
        .items=${this.activeEntry !== null ? this.actions : []}
        .value=${selectedAction !== null ? (_a = this.actions) === null || _a === void 0 ? void 0 : _a.findIndex(e => compareActions(e, selectedAction, true)) : null}
        optional="true"
        @change=${this.selectAction}
      >
        ${localize('ui.panel.time_picker.no_timeslot_selected', getLocale(this.hass))}
      </button-group>
    `;
        }
        updateActiveEntry(data) {
            if (this.activeEntry === null)
                return;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: Object.assign([...this.schedule.timeslots], { [this.activeEntry]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry]), data) }) });
        }
        updateActiveEntryAction(data, num) {
            if (this.activeEntry === null)
                return;
            if (data && 'service' in data) {
                this.updateActiveEntry({
                    actions: Object.assign([...this.schedule.timeslots[this.activeEntry].actions], { [num]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry].actions[num]), data) })
                });
            }
            else if (data) {
                //update service_data
                Object.entries(data).forEach(([key, val]) => {
                    let actionConfig = [...this.schedule.timeslots[this.activeEntry].actions];
                    let serviceData = typeof val == "object" && key in this.schedule.timeslots[this.activeEntry].actions[num]
                        ? Object.assign(Object.assign({}, actionConfig[num][key]), val) : val;
                    const invalidParams = Object.keys(serviceData).filter(e => serviceData[e] === null);
                    if (invalidParams.length)
                        serviceData = omit(serviceData, ...invalidParams);
                    actionConfig = Object.assign(actionConfig, {
                        [num]: Object.assign(Object.assign({}, actionConfig[num]), { [key]: serviceData })
                    });
                    this.updateActiveEntry({ actions: actionConfig });
                });
            }
            else {
                this.updateActiveEntry({
                    actions: [...this.schedule.timeslots[this.activeEntry].actions]
                        .filter((_, i) => i != num)
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
                if (ev.detail.entry !== null) {
                    this.activeEntry = Number(ev.detail.entry);
                }
                else {
                    this.activeEntry = null;
                }
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
                        service_data: { [field]: ev.detail.value }
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
            const result = await new Promise((resolve) => {
                R$1(element, 'show-dialog', {
                    dialogTag: 'dialog-delete-confirm',
                    dialogImport: () => Promise.resolve().then(function () { return dialogDeleteConfirm; }),
                    dialogParams: {
                        cancel: () => {
                            resolve(false);
                        },
                        confirm: () => {
                            resolve(true);
                        },
                    }
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
                    root.querySelector('[secondary]').textContent = entry.item.description || "";
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
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            .path=${this._opened ? mdiMenuUp : mdiMenuDown}
          >
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
                R$1(this, 'value-changed', { value });
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
        e$3({ attribute: "allow-custom-value", type: Boolean })
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

    let schedulerSelector = class schedulerSelector extends h$2 {
        constructor() {
            super(...arguments);
            this.items = [];
            this.value = [];
            this.label = "";
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
                this.value = this.value
                    .filter(e => this.items.map(v => v.value).includes(e));
                R$1(this, 'value-changed', { value: this.value });
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
            R$1(this, 'value-changed', { value: this.value });
        }
        _addClick(ev) {
            ev.stopPropagation();
            const target = ev.target;
            const value = target.value;
            if (!this.value.includes(value))
                this.value = [...this.value, value];
            target.value = "";
            R$1(this, 'value-changed', { value: [...this.value] });
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
    ], schedulerSelector.prototype, "items", void 0);
    __decorate([
        e$3({ type: Array })
    ], schedulerSelector.prototype, "value", void 0);
    __decorate([
        e$3()
    ], schedulerSelector.prototype, "label", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], schedulerSelector.prototype, "invalid", void 0);
    schedulerSelector = __decorate([
        n$4('scheduler-selector')
    ], schedulerSelector);

    const getMatchTypes = (hass, filter) => {
        let output = {};
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Above))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Above]: {
                    value: EConditionMatchType.Above,
                    name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.above'),
                    icon: "hass:greater-than"
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Below))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Below]: {
                    value: EConditionMatchType.Below,
                    name: hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.below'),
                    icon: "hass:less-than"
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Equal))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Equal]: {
                    value: EConditionMatchType.Equal,
                    name: localize('ui.panel.conditions.equal_to', getLocale(hass)),
                    icon: "hass:equal"
                } });
        if (!(filter === null || filter === void 0 ? void 0 : filter.length) || filter.includes(EConditionMatchType.Unequal))
            output = Object.assign(Object.assign({}, output), { [EConditionMatchType.Unequal]: {
                    value: EConditionMatchType.Unequal,
                    name: localize('ui.panel.conditions.unequal_to', getLocale(hass)),
                    icon: "hass:not-equal-variant"
                } });
        return output;
    };
    let SchedulerOptionsCard = class SchedulerOptionsCard extends h$2 {
        constructor() {
            super(...arguments);
            this.addCondition = false;
            this.tags = [];
        }
        async firstUpdated() {
            var _a;
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.tags) {
                (async () => await loadHaForm())();
                const tagEntries = await fetchTags(this.hass);
                const existingTags = tagEntries.map(e => e.name);
                const configTags = AsArray(this.config.tags);
                this.tags = [...existingTags, ...configTags.filter(e => !existingTags.includes(e) && e != 'none')];
            }
        }
        render() {
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
            </div>`}
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
            <mwc-button @click=${this.addConditionClick}>
              <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
              ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
            </mwc-button>
          </div>

          <div class="header">${localize('ui.panel.options.period', getLocale(this.hass))}</div>
          <div class="checkbox-container">
            <div class="checkbox">
              <ha-checkbox
                ?checked=${isDefined(this.schedule.start_date)}
                @change=${this.toggleEnableDateRange}
              >
              </ha-checkbox>
            </div>
            <div class="slider">
              <scheduler-date-picker
                .hass=${this.hass}
                ?disabled=${!isDefined(this.schedule.start_date)}
                startDate=${this.schedule.start_date}
                endDate=${this.schedule.end_date}
                @value-changed=${this.selectDateRange}
              >
              </scheduler-date-picker>
            </div>
          </div>

          <div class="header">${this.hass.localize('ui.components.area-picker.add_dialog.name')}</div>
          <paper-input no-label-float
            value=${this.schedule.name || ''}
            placeholder=${this.schedule.name ? "" : this.hass.localize('ui.components.area-picker.add_dialog.name')}
            @value-changed=${this.updateName}
          ></paper-input>

          ${this.config.tags ? T `          
          <div class="header">${this.hass.localize('ui.panel.config.tag.caption')}</div>
          <scheduler-selector
            .items=${this.getTagOptions()}
            .value=${this.schedule.tags || []}
            @value-changed=${this.updateTags}
            label=${this.hass.localize('ui.panel.config.tag.add_tag')}
          >
          </scheduler-selector>
          ` : ''}

          <div class="header">${localize('ui.panel.options.repeat_type', getLocale(this.hass))}</div>
          <button-group
            .items=${repeatTypes}
            value="${this.schedule.repeat_type}"
            @change=${this.updateRepeatType}>
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
                <mwc-button @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity || !this.conditionMatchType || !this.conditionValue}
                  >${this.hass.localize('ui.common.save')}</mwc-button
                >
                ${this.editItem !== undefined
                ? T `
                <mwc-button class="warning" @click=${this.deleteConditionClick}
                    >${this.hass.localize('ui.common.delete')}</mwc-button>`
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
                const hassEntities = computeEntities(this.hass, this.config, { filterActions: false, filterStates: true });
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
                    const currentState = entity.id in this.hass.states
                        ? this.hass.states[entity.id].state
                        : null;
                    if (!currentState || ['unavailable', 'unknown'].includes(currentState))
                        availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal, EConditionMatchType.Above, EConditionMatchType.Below];
                    else if (!isNaN(Number(currentState)))
                        availableMatchTypes = [EConditionMatchType.Above, EConditionMatchType.Below];
                    else
                        availableMatchTypes = [EConditionMatchType.Equal, EConditionMatchType.Unequal];
                }
                const matchTypes = getMatchTypes(this.hass, availableMatchTypes);
                return T `
      <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
      <div style="display: flex; flex-direction: row; align-items: center">
        <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)"
        >
          <ha-icon icon="${PrettyPrintIcon(entity.icon || DefaultEntityIcon)}"></ha-icon>
          ${PrettyPrintName(entity.name)}
        </mwc-button>
        <ha-icon-button
          .path=${mdiPencil}
          style="margin-left: 10px"
          @click=${() => { this.selectedEntity = undefined; }}
        >
        </ha-icon-button>
      </div>

      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.device.condition')}</div>
      <button-group
        .items=${Object.values(matchTypes)} 
        value=${this.conditionMatchType}
        @change=${(ev) => this.conditionMatchType = ev.target.value}
      >
      </button-group>
      
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}</div>
      <scheduler-variable-picker
        .variable=${states}
        .value=${this.conditionValue}
        @value-changed=${(ev) => this.conditionValue = ev.detail.value}
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
              ${PrettyPrintName(entity.name)}
              ${getMatchTypes(this.hass)[item.match_type].name.toLowerCase()}
              ${states
                ?
                    states.type == EVariableType.List
                        ? listVariableDisplay(item.value, states)
                        : states.type == EVariableType.Level
                            ? levelVariableDisplay(item.value, states)
                            : ''
                : ''}
            </span>
          <ha-icon-button
            .path=${mdiPencil}
            @click=${() => { this.editConditionClick(num); }}
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
            if (!this.selectedEntity || !this.config || !this.hass || !this.schedule || !this.conditionMatchType || !this.conditionValue)
                return;
            const condition = {
                entity_id: this.selectedEntity.id,
                match_type: this.conditionMatchType,
                value: this.conditionValue,
                attribute: "state"
            };
            const conditions = ((_a = this.schedule.timeslots[0].conditions) === null || _a === void 0 ? void 0 : _a.length) ? [...this.schedule.timeslots[0].conditions] : [];
            const type = this.schedule.timeslots[0].condition_type ? this.schedule.timeslots[0].condition_type : EConditionType.Any;
            if (this.editItem === undefined)
                conditions.push(condition);
            else
                conditions.splice(this.editItem, 1, condition);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: this.schedule.timeslots.map(e => Object.assign(e, {
                    conditions: conditions,
                    condition_type: type
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
            const hassEntities = computeEntities(this.hass, this.config, { filterActions: false, filterStates: true });
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
                    conditions: conditions
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
        selectDateRange(ev) {
            const value = ev.detail.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: value.startDate, end_date: value.endDate });
        }
        toggleEnableDateRange(ev) {
            const checked = ev.target.checked;
            const dateRangePicker = this.shadowRoot.querySelector("scheduler-date-picker");
            this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: checked ? dateRangePicker.startDate : undefined, end_date: checked ? dateRangePicker.endDate : undefined, repeat_type: checked
                    ? this.schedule.repeat_type == ERepeatType.Repeat ? ERepeatType.Pause : this.schedule.repeat_type
                    : this.schedule.repeat_type == ERepeatType.Pause ? ERepeatType.Repeat : this.schedule.repeat_type });
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
                detail: this.schedule
            });
            this.dispatchEvent(myEvent);
        }
        backClick() {
            const myEvent = new CustomEvent('backClick', {
                detail: this.schedule
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
    SchedulerOptionsCard = __decorate([
        n$4('scheduler-options-card')
    ], SchedulerOptionsCard);

    let SchedulerCardEditor = class SchedulerCardEditor extends h$2 {
        constructor() {
            super(...arguments);
            this.selectedDomain = '';
            this.titleOption = 'standard';
            this.scheduleEntities = [];
        }
        setConfig(config) {
            this._config = config;
            this.titleOption = this.getTitleOption();
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
      <div class="card-config">
        <div class="header">Title of the card</div>
        <button-group
          .items=${[{ value: 'standard' }, { value: 'hidden' }, { value: 'custom' }]}
          value=${this.getTitleOption()}
          @change=${this.updateTitleOption}
        >
        </button-group>
        ${this.titleOption == 'custom'
            ? T `
              <paper-input
                label="Custom title"
                .value=${this.getTitle()}
                .configValue=${'name'}
                @value-changed=${this.updateTitle}
              ></paper-input>
            `
            : ''}

        <div class="header">Show all schedules</div>
        <div class="text-field">
          This sets the 'discover existing' parameter.<br />
          Previously created schedules will be automatically added to the card. 
        </div>
        <button-group
          .items=${[{ value: 'on' }, { value: 'off' }]}
          value=${this.getDiscoveryOption()}
          @change=${this.updateDiscoveryOption}
        >
        </button-group>

        <div class="header">Time step</div>
        <div class="text-field">Resolution (in minutes) for creating schedules</div>
        <variable-slider
          min="1"
          max="30"
          step="1"
          value=${this.getTimeStepOption()}
          unit=" min"
          ?optional=${false}
          ?disabled=${false}
          @value-changed=${this.updateTimeStepOption}
        >
        </variable-slider>

        ${this.tagOptions !== undefined ? T `
        <div class="header">Tags</div>
        <div class="text-field">Use tags to sort schedules between multiple cards</div>
        <scheduler-selector
          .items=${this.getTagOptions()}
          .value=${this.getTagValue()}
          @value-changed=${this.updateTags}
          label=${this.hass.localize('ui.panel.config.tag.add_tag')}
        >
        </scheduler-selector>` : ''}

        <div class="header">Included entities</div>
        <div class="text-field">Select the entities that you want to control using the scheduler. You can click on a group to open it.<br> Note that some entities (such as sensors) can only be used for conditions, not for actions.</div>
        ${this.getDomainSwitches()}
      </div>
    `;
        }
        getTitleOption() {
            if (!this._config || !this.hass)
                return 'standard';
            if (this._config.title === undefined)
                return 'standard';
            if (typeof this._config.title == 'string')
                return 'custom';
            if (this._config.title == false)
                return 'hidden';
            else
                return 'standard';
        }
        getTitle() {
            if (!this.hass)
                return '';
            if (!this._config || !this.hass)
                return localize('ui.panel.common.title', getLocale(this.hass));
            if (this._config.title === undefined)
                return localize('ui.panel.common.title', getLocale(this.hass));
            if (typeof this._config.title == 'string')
                return this._config.title;
            if (this._config.title == false)
                return '';
            else
                return localize('ui.panel.common.title', getLocale(this.hass));
        }
        updateTitleOption(e) {
            const type = e.target.value;
            if (!this._config || !this.hass)
                return;
            this.titleOption = type;
            this._config = Object.assign(Object.assign({}, this._config), { title: type == 'standard'
                    ? true
                    : type == 'hidden'
                        ? false
                        : this._config.title });
            R$1(this, 'config-changed', { config: this._config });
        }
        updateTitle(ev) {
            if (!this._config || !this.hass)
                return;
            const value = String(ev.target.value);
            this._config = Object.assign(Object.assign({}, this._config), { title: value });
            R$1(this, 'config-changed', { config: this._config });
        }
        getDiscoveryOption() {
            if (!this._config || !this.hass)
                return;
            const discover_existing = this._config.hasOwnProperty('discover_existing') ? this._config.discover_existing : true;
            return discover_existing ? 'on' : 'off';
        }
        updateDiscoveryOption(ev) {
            const value = ev.target.value == 'on';
            if (!this._config || !this.hass)
                return;
            this._config = Object.assign(Object.assign({}, this._config), { discover_existing: value });
            R$1(this, 'config-changed', { config: this._config });
        }
        getTimeStepOption() {
            if (!this._config || !this.hass)
                return;
            const time_step = this._config.hasOwnProperty('time_step') && !isNaN(this._config.time_step) ? this._config.time_step : DefaultTimeStep;
            return Number(time_step);
        }
        updateTimeStepOption(ev) {
            if (!this._config || !this.hass)
                return;
            const value = Number(ev.detail.value);
            this._config = Object.assign(Object.assign({}, this._config), { time_step: value });
            R$1(this, 'config-changed', { config: this._config });
        }
        getTagValue() {
            return AsArray(this._config.tags);
        }
        updateTags(ev) {
            if (!this._config || !this.hass)
                return;
            let value = ev.target.value;
            value = value.map(e => e.trim());
            value.sort(sortAlphabetically);
            this._config = Object.assign(Object.assign({}, this._config), { tags: value });
            R$1(this, 'config-changed', { config: this._config });
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
        getDomainSwitches() {
            if (!this._config || !this.hass)
                return;
            const entities = computeEntities(this.hass, Object.assign(Object.assign({}, DefaultCardConfig), { include: ['*'] }), { filterActions: true, filterStates: true })
                .filter(e => p$1(e) !== "switch" || !this.scheduleEntities.includes(e))
                .map(e => parseEntity(e, this.hass, { include: ['*'] }))
                .filter(e => standardStates(e.id, this.hass) || computeActions(e.id, this.hass, DefaultCardConfig));
            const domainList = entities.map(e => p$1(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);
            domainList.sort((a, b) => (a.trim().toLowerCase() < b.trim().toLowerCase() ? -1 : 1));
            const includedDomains = this._config.include ? [...this._config.include] : [];
            return domainList.map(domain => {
                const count = entities.filter(e => p$1(e.id) == domain).length;
                if (!count)
                    return ``;
                return T `
        <div
          class="row"
          @click=${() => { this.toggleShowDomain(domain); }}
        >
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
          </div>
          <ha-switch
            @click=${(ev) => { ev.stopPropagation(); }}
            @change=${(ev) => this.toggleSelectDomain(domain, ev.target.checked)}
            ?checked=${includedDomains.includes(domain)}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain == domain
                ? T `
              <div class="divider"></div>
              ${this.getEntitySwitches(entities.filter(e => p$1(e.id) == domain))}
              <div class="divider"></div>
            `
                : ''}
      `;
            });
        }
        getEntitySwitches(entities) {
            if (!this._config || !this.hass)
                return;
            const includedEntities = this._config.include ? [...this._config.include] : [];
            return entities
                .map(entity => {
                const enabled = includedEntities.includes(entity.id) || includedEntities.includes(p$1(entity.id));
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
              ?checked=${enabled}
              ?disabled=${includedEntities.includes(p$1(entity.id))}
            ></ha-switch>
          </div>
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
        toggleSelectDomain(domain, enabled) {
            if (!this._config || !this.hass)
                return;
            let includedEntities = this._config.include ? [...this._config.include] : [];
            if (!includedEntities.includes(domain) && enabled) {
                includedEntities = includedEntities.filter(e => p$1(e) != domain);
                includedEntities.push(domain);
            }
            else if (includedEntities.includes(domain) && !enabled)
                includedEntities = includedEntities.filter(e => e != domain);
            else
                return;
            includedEntities.sort();
            this._config = Object.assign(Object.assign({}, this._config), { include: includedEntities });
            R$1(this, 'config-changed', { config: this._config });
        }
        toggleSelectEntity(entity_id) {
            if (!this._config || !this.hass)
                return;
            let includedEntities = this._config.include ? [...this._config.include] : [];
            if (!includedEntities.includes(entity_id))
                includedEntities.push(entity_id);
            else
                includedEntities = includedEntities.filter(e => e != entity_id);
            includedEntities.sort();
            this._config = Object.assign(Object.assign({}, this._config), { include: includedEntities });
            R$1(this, 'config-changed', { config: this._config });
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
    ], SchedulerCardEditor.prototype, "selectedDomain", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "titleOption", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "scheduleEntities", void 0);
    __decorate([
        e$3()
    ], SchedulerCardEditor.prototype, "tagOptions", void 0);
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
      <ha-dialog
        open
        .heading=${true}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .path=${mdiClose}
          >
          </ha-icon-button>
          <span slot="title">
        ${this.hass.localize("state_badge.default.error")}
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        ${this._params.error || ""}
      </div>
    
        <mwc-button
          slot="primaryAction"
          style="float: left"
          @click=${this.closeDialog}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.ok")}
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

      <ha-dialog
        open
        .heading=${true}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .path=${mdiClose}
          >
          </ha-icon-button>
          <span slot="title">
            Defective entity
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        This schedule is defective and cannot be edited with the card. 
        Consider to delete the item and recreate it.
        If the problem persists, please report the issue on GitHub.
      </div>
    
        <mwc-button
          slot="primaryAction"
          @click=${this.cancelClick}
          dialogAction="close"
        >
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

    const camelizeRE = /-(\w)/g;
    const camelize = str => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
    };

    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = str => {
      return str.replace(hyphenateRE, '-$1').toLowerCase()
    };

    function getInitialProps (propsList) {
      const res = {};
      propsList.forEach(key => {
        res[key] = undefined;
      });
      return res
    }

    function injectHook (options, key, hook) {
      options[key] = [].concat(options[key] || []);
      options[key].unshift(hook);
    }

    function callHooks (vm, hook) {
      if (vm) {
        const hooks = vm.$options[hook] || [];
        hooks.forEach(hook => {
          hook.call(vm);
        });
      }
    }

    function createCustomEvent (name, args) {
      return new CustomEvent(name, {
        bubbles: false,
        cancelable: false,
        detail: args
      })
    }

    const isBoolean = val => /function Boolean/.test(String(val));
    const isNumber = val => /function Number/.test(String(val));

    function convertAttributeValue (value, name, { type } = {}) {
      if (isBoolean(type)) {
        if (value === 'true' || value === 'false') {
          return value === 'true'
        }
        if (value === '' || value === name || value != null) {
          return true
        }
        return value
      } else if (isNumber(type)) {
        const parsed = parseFloat(value, 10);
        return isNaN(parsed) ? value : parsed
      } else {
        return value
      }
    }

    function toVNodes (h, children) {
      const res = [];
      for (let i = 0, l = children.length; i < l; i++) {
        res.push(toVNode(h, children[i]));
      }
      return res
    }

    function toVNode (h, node) {
      if (node.nodeType === 3) {
        return node.data.trim() ? node.data : null
      } else if (node.nodeType === 1) {
        const data = {
          attrs: getAttributes(node),
          domProps: {
            innerHTML: node.innerHTML
          }
        };
        if (data.attrs.slot) {
          data.slot = data.attrs.slot;
          delete data.attrs.slot;
        }
        return h(node.tagName, data)
      } else {
        return null
      }
    }

    function getAttributes (node) {
      const res = {};
      for (let i = 0, l = node.attributes.length; i < l; i++) {
        const attr = node.attributes[i];
        res[attr.nodeName] = attr.nodeValue;
      }
      return res
    }

    function wrap (Vue, Component) {
      const isAsync = typeof Component === 'function' && !Component.cid;
      let isInitialized = false;
      let hyphenatedPropsList;
      let camelizedPropsList;
      let camelizedPropsMap;

      function initialize (Component) {
        if (isInitialized) return

        const options = typeof Component === 'function'
          ? Component.options
          : Component;

        // extract props info
        const propsList = Array.isArray(options.props)
          ? options.props
          : Object.keys(options.props || {});
        hyphenatedPropsList = propsList.map(hyphenate);
        camelizedPropsList = propsList.map(camelize);
        const originalPropsAsObject = Array.isArray(options.props) ? {} : options.props || {};
        camelizedPropsMap = camelizedPropsList.reduce((map, key, i) => {
          map[key] = originalPropsAsObject[propsList[i]];
          return map
        }, {});

        // proxy $emit to native DOM events
        injectHook(options, 'beforeCreate', function () {
          const emit = this.$emit;
          this.$emit = (name, ...args) => {
            this.$root.$options.customElement.dispatchEvent(createCustomEvent(name, args));
            return emit.call(this, name, ...args)
          };
        });

        injectHook(options, 'created', function () {
          // sync default props values to wrapper on created
          camelizedPropsList.forEach(key => {
            this.$root.props[key] = this[key];
          });
        });

        // proxy props as Element properties
        camelizedPropsList.forEach(key => {
          Object.defineProperty(CustomElement.prototype, key, {
            get () {
              return this._wrapper.props[key]
            },
            set (newVal) {
              this._wrapper.props[key] = newVal;
            },
            enumerable: false,
            configurable: true
          });
        });

        isInitialized = true;
      }

      function syncAttribute (el, key) {
        const camelized = camelize(key);
        const value = el.hasAttribute(key) ? el.getAttribute(key) : undefined;
        el._wrapper.props[camelized] = convertAttributeValue(
          value,
          key,
          camelizedPropsMap[camelized]
        );
      }

      class CustomElement extends HTMLElement {
        constructor () {
          const self = super();
          self.attachShadow({ mode: 'open' });

          const wrapper = self._wrapper = new Vue({
            name: 'shadow-root',
            customElement: self,
            shadowRoot: self.shadowRoot,
            data () {
              return {
                props: {},
                slotChildren: []
              }
            },
            render (h) {
              return h(Component, {
                ref: 'inner',
                props: this.props
              }, this.slotChildren)
            }
          });

          // Use MutationObserver to react to future attribute & slot content change
          const observer = new MutationObserver(mutations => {
            let hasChildrenChange = false;
            for (let i = 0; i < mutations.length; i++) {
              const m = mutations[i];
              if (isInitialized && m.type === 'attributes' && m.target === self) {
                syncAttribute(self, m.attributeName);
              } else {
                hasChildrenChange = true;
              }
            }
            if (hasChildrenChange) {
              wrapper.slotChildren = Object.freeze(toVNodes(
                wrapper.$createElement,
                self.childNodes
              ));
            }
          });
          observer.observe(self, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
          });
        }

        get vueComponent () {
          return this._wrapper.$refs.inner
        }

        connectedCallback () {
          const wrapper = this._wrapper;
          if (!wrapper._isMounted) {
            // initialize attributes
            const syncInitialAttributes = () => {
              wrapper.props = getInitialProps(camelizedPropsList);
              hyphenatedPropsList.forEach(key => {
                syncAttribute(this, key);
              });
            };

            if (isInitialized) {
              syncInitialAttributes();
            } else {
              // async & unresolved
              Component().then(resolved => {
                if (resolved.__esModule || resolved[Symbol.toStringTag] === 'Module') {
                  resolved = resolved.default;
                }
                initialize(resolved);
                syncInitialAttributes();
              });
            }
            // initialize children
            wrapper.slotChildren = Object.freeze(toVNodes(
              wrapper.$createElement,
              this.childNodes
            ));
            wrapper.$mount();
            this.shadowRoot.appendChild(wrapper.$el);
          } else {
            callHooks(this.vueComponent, 'activated');
          }
        }

        disconnectedCallback () {
          callHooks(this.vueComponent, 'deactivated');
        }
      }

      if (!isAsync) {
        initialize(Component);
      }

      return CustomElement
    }

    /*!
     * Vue.js v2.6.14
     * (c) 2014-2021 Evan You
     * Released under the MIT License.
     */
    /*  */

    var emptyObject = Object.freeze({});

    // These helpers produce better VM code in JS engines due to their
    // explicitness and function inlining.
    function isUndef (v) {
      return v === undefined || v === null
    }

    function isDef (v) {
      return v !== undefined && v !== null
    }

    function isTrue (v) {
      return v === true
    }

    function isFalse (v) {
      return v === false
    }

    /**
     * Check if value is primitive.
     */
    function isPrimitive (value) {
      return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean'
      )
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */
    function isObject (obj) {
      return obj !== null && typeof obj === 'object'
    }

    /**
     * Get the raw type string of a value, e.g., [object Object].
     */
    var _toString = Object.prototype.toString;

    function toRawType (value) {
      return _toString.call(value).slice(8, -1)
    }

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    function isPlainObject (obj) {
      return _toString.call(obj) === '[object Object]'
    }

    function isRegExp (v) {
      return _toString.call(v) === '[object RegExp]'
    }

    /**
     * Check if val is a valid array index.
     */
    function isValidArrayIndex (val) {
      var n = parseFloat(String(val));
      return n >= 0 && Math.floor(n) === n && isFinite(val)
    }

    function isPromise (val) {
      return (
        isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
      )
    }

    /**
     * Convert a value to a string that is actually rendered.
     */
    function toString (val) {
      return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
          ? JSON.stringify(val, null, 2)
          : String(val)
    }

    /**
     * Convert an input value to a number for persistence.
     * If the conversion fails, return original string.
     */
    function toNumber (val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n
    }

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     */
    function makeMap (
      str,
      expectsLowerCase
    ) {
      var map = Object.create(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase
        ? function (val) { return map[val.toLowerCase()]; }
        : function (val) { return map[val]; }
    }

    /**
     * Check if a tag is a built-in tag.
     */
    var isBuiltInTag = makeMap('slot,component', true);

    /**
     * Check if an attribute is a reserved attribute.
     */
    var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

    /**
     * Remove an item from an array.
     */
    function remove (arr, item) {
      if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
          return arr.splice(index, 1)
        }
      }
    }

    /**
     * Check whether an object has the property.
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn (obj, key) {
      return hasOwnProperty.call(obj, key)
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached (fn) {
      var cache = Object.create(null);
      return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
      })
    }

    /**
     * Camelize a hyphen-delimited string.
     */
    var camelizeRE$1 = /-(\w)/g;
    var camelize$1 = cached(function (str) {
      return str.replace(camelizeRE$1, function (_, c) { return c ? c.toUpperCase() : ''; })
    });

    /**
     * Capitalize a string.
     */
    var capitalize$1 = cached(function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    });

    /**
     * Hyphenate a camelCase string.
     */
    var hyphenateRE$1 = /\B([A-Z])/g;
    var hyphenate$1 = cached(function (str) {
      return str.replace(hyphenateRE$1, '-$1').toLowerCase()
    });

    /**
     * Simple bind polyfill for environments that do not support it,
     * e.g., PhantomJS 1.x. Technically, we don't need this anymore
     * since native bind is now performant enough in most browsers.
     * But removing it would mean breaking code that was able to run in
     * PhantomJS 1.x, so this must be kept for backward compatibility.
     */

    /* istanbul ignore next */
    function polyfillBind (fn, ctx) {
      function boundFn (a) {
        var l = arguments.length;
        return l
          ? l > 1
            ? fn.apply(ctx, arguments)
            : fn.call(ctx, a)
          : fn.call(ctx)
      }

      boundFn._length = fn.length;
      return boundFn
    }

    function nativeBind (fn, ctx) {
      return fn.bind(ctx)
    }

    var bind = Function.prototype.bind
      ? nativeBind
      : polyfillBind;

    /**
     * Convert an Array-like object to a real Array.
     */
    function toArray (list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
        ret[i] = list[i + start];
      }
      return ret
    }

    /**
     * Mix properties into target object.
     */
    function extend (to, _from) {
      for (var key in _from) {
        to[key] = _from[key];
      }
      return to
    }

    /**
     * Merge an Array of Objects into a single Object.
     */
    function toObject (arr) {
      var res = {};
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          extend(res, arr[i]);
        }
      }
      return res
    }

    /* eslint-disable no-unused-vars */

    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
     */
    function noop (a, b, c) {}

    /**
     * Always return false.
     */
    var no$2 = function (a, b, c) { return false; };

    /* eslint-enable no-unused-vars */

    /**
     * Return the same value.
     */
    var identity = function (_) { return _; };

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     */
    function looseEqual (a, b) {
      if (a === b) { return true }
      var isObjectA = isObject(a);
      var isObjectB = isObject(b);
      if (isObjectA && isObjectB) {
        try {
          var isArrayA = Array.isArray(a);
          var isArrayB = Array.isArray(b);
          if (isArrayA && isArrayB) {
            return a.length === b.length && a.every(function (e, i) {
              return looseEqual(e, b[i])
            })
          } else if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime()
          } else if (!isArrayA && !isArrayB) {
            var keysA = Object.keys(a);
            var keysB = Object.keys(b);
            return keysA.length === keysB.length && keysA.every(function (key) {
              return looseEqual(a[key], b[key])
            })
          } else {
            /* istanbul ignore next */
            return false
          }
        } catch (e) {
          /* istanbul ignore next */
          return false
        }
      } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
      } else {
        return false
      }
    }

    /**
     * Return the first index at which a loosely equal value can be
     * found in the array (if value is a plain object, the array must
     * contain an object of the same shape), or -1 if it is not present.
     */
    function looseIndexOf (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) { return i }
      }
      return -1
    }

    /**
     * Ensure a function is called only once.
     */
    function once (fn) {
      var called = false;
      return function () {
        if (!called) {
          called = true;
          fn.apply(this, arguments);
        }
      }
    }

    var SSR_ATTR = 'data-server-rendered';

    var ASSET_TYPES = [
      'component',
      'directive',
      'filter'
    ];

    var LIFECYCLE_HOOKS = [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'activated',
      'deactivated',
      'errorCaptured',
      'serverPrefetch'
    ];

    /*  */



    var config = ({
      /**
       * Option merge strategies (used in core/util/options)
       */
      // $flow-disable-line
      optionMergeStrategies: Object.create(null),

      /**
       * Whether to suppress warnings.
       */
      silent: false,

      /**
       * Show production mode tip message on boot?
       */
      productionTip: "production" !== 'production',

      /**
       * Whether to enable devtools
       */
      devtools: "production" !== 'production',

      /**
       * Whether to record perf
       */
      performance: false,

      /**
       * Error handler for watcher errors
       */
      errorHandler: null,

      /**
       * Warn handler for watcher warns
       */
      warnHandler: null,

      /**
       * Ignore certain custom elements
       */
      ignoredElements: [],

      /**
       * Custom user key aliases for v-on
       */
      // $flow-disable-line
      keyCodes: Object.create(null),

      /**
       * Check if a tag is reserved so that it cannot be registered as a
       * component. This is platform-dependent and may be overwritten.
       */
      isReservedTag: no$2,

      /**
       * Check if an attribute is reserved so that it cannot be used as a component
       * prop. This is platform-dependent and may be overwritten.
       */
      isReservedAttr: no$2,

      /**
       * Check if a tag is an unknown element.
       * Platform-dependent.
       */
      isUnknownElement: no$2,

      /**
       * Get the namespace of an element
       */
      getTagNamespace: noop,

      /**
       * Parse the real tag name for the specific platform.
       */
      parsePlatformTagName: identity,

      /**
       * Check if an attribute must be bound using property, e.g. value
       * Platform-dependent.
       */
      mustUseProp: no$2,

      /**
       * Perform updates asynchronously. Intended to be used by Vue Test Utils
       * This will significantly reduce performance if set to false.
       */
      async: true,

      /**
       * Exposed for legacy reasons
       */
      _lifecycleHooks: LIFECYCLE_HOOKS
    });

    /*  */

    /**
     * unicode letters used for parsing html tags, component names and property paths.
     * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
     * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
     */
    var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

    /**
     * Check if a string starts with $ or _
     */
    function isReserved (str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5F
    }

    /**
     * Define a property.
     */
    function def (obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
      });
    }

    /**
     * Parse simple path.
     */
    var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
    function parsePath (path) {
      if (bailRE.test(path)) {
        return
      }
      var segments = path.split('.');
      return function (obj) {
        for (var i = 0; i < segments.length; i++) {
          if (!obj) { return }
          obj = obj[segments[i]];
        }
        return obj
      }
    }

    /*  */

    // can we use __proto__?
    var hasProto = '__proto__' in {};

    // Browser environment sniffing
    var inBrowser = typeof window !== 'undefined';
    var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
    var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && /msie|trident/.test(UA);
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    var isEdge = UA && UA.indexOf('edge/') > 0;
    var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
    var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
    var isPhantomJS = UA && /phantomjs/.test(UA);
    var isFF = UA && UA.match(/firefox\/(\d+)/);

    // Firefox has a "watch" function on Object.prototype...
    var nativeWatch = ({}).watch;

    var supportsPassive = false;
    if (inBrowser) {
      try {
        var opts = {};
        Object.defineProperty(opts, 'passive', ({
          get: function get () {
            /* istanbul ignore next */
            supportsPassive = true;
          }
        })); // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
      } catch (e) {}
    }

    // this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer;
    var isServerRendering = function () {
      if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && !inWeex && typeof global !== 'undefined') {
          // detect presence of vue-server-renderer and avoid
          // Webpack shimming the process
          _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
        } else {
          _isServer = false;
        }
      }
      return _isServer
    };

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    /* istanbul ignore next */
    function isNative (Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }

    var hasSymbol =
      typeof Symbol !== 'undefined' && isNative(Symbol) &&
      typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

    var _Set;
    /* istanbul ignore if */ // $flow-disable-line
    if (typeof Set !== 'undefined' && isNative(Set)) {
      // use native Set when available.
      _Set = Set;
    } else {
      // a non-standard Set polyfill that only works with primitive keys.
      _Set = /*@__PURE__*/(function () {
        function Set () {
          this.set = Object.create(null);
        }
        Set.prototype.has = function has (key) {
          return this.set[key] === true
        };
        Set.prototype.add = function add (key) {
          this.set[key] = true;
        };
        Set.prototype.clear = function clear () {
          this.set = Object.create(null);
        };

        return Set;
      }());
    }

    /*  */

    var warn = noop;

    /*  */

    var uid = 0;

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */
    var Dep = function Dep () {
      this.id = uid++;
      this.subs = [];
    };

    Dep.prototype.addSub = function addSub (sub) {
      this.subs.push(sub);
    };

    Dep.prototype.removeSub = function removeSub (sub) {
      remove(this.subs, sub);
    };

    Dep.prototype.depend = function depend () {
      if (Dep.target) {
        Dep.target.addDep(this);
      }
    };

    Dep.prototype.notify = function notify () {
      // stabilize the subscriber list first
      var subs = this.subs.slice();
      for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
      }
    };

    // The current target watcher being evaluated.
    // This is globally unique because only one watcher
    // can be evaluated at a time.
    Dep.target = null;
    var targetStack = [];

    function pushTarget (target) {
      targetStack.push(target);
      Dep.target = target;
    }

    function popTarget () {
      targetStack.pop();
      Dep.target = targetStack[targetStack.length - 1];
    }

    /*  */

    var VNode = function VNode (
      tag,
      data,
      children,
      text,
      elm,
      context,
      componentOptions,
      asyncFactory
    ) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = undefined;
      this.context = context;
      this.fnContext = undefined;
      this.fnOptions = undefined;
      this.fnScopeId = undefined;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = undefined;
      this.parent = undefined;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = undefined;
      this.isAsyncPlaceholder = false;
    };

    var prototypeAccessors = { child: { configurable: true } };

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    prototypeAccessors.child.get = function () {
      return this.componentInstance
    };

    Object.defineProperties( VNode.prototype, prototypeAccessors );

    var createEmptyVNode = function (text) {
      if ( text === void 0 ) text = '';

      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node
    };

    function createTextVNode (val) {
      return new VNode(undefined, undefined, undefined, String(val))
    }

    // optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode (vnode) {
      var cloned = new VNode(
        vnode.tag,
        vnode.data,
        // #7975
        // clone children array to avoid mutating original in case of cloning
        // a child.
        vnode.children && vnode.children.slice(),
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
      );
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.fnContext = vnode.fnContext;
      cloned.fnOptions = vnode.fnOptions;
      cloned.fnScopeId = vnode.fnScopeId;
      cloned.asyncMeta = vnode.asyncMeta;
      cloned.isCloned = true;
      return cloned
    }

    /*
     * not type checking this file because flow doesn't play well with
     * dynamically accessing methods on Array prototype
     */

    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto);

    var methodsToPatch = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
    ];

    /**
     * Intercept mutating methods and emit events
     */
    methodsToPatch.forEach(function (method) {
      // cache original method
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var result = original.apply(this, args);
        var ob = this.__ob__;
        var inserted;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break
          case 'splice':
            inserted = args.slice(2);
            break
        }
        if (inserted) { ob.observeArray(inserted); }
        // notify change
        ob.dep.notify();
        return result
      });
    });

    /*  */

    var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

    /**
     * In some cases we may want to disable observation inside a component's
     * update computation.
     */
    var shouldObserve = true;

    function toggleObserving (value) {
      shouldObserve = value;
    }

    /**
     * Observer class that is attached to each observed
     * object. Once attached, the observer converts the target
     * object's property keys into getter/setters that
     * collect dependencies and dispatch updates.
     */
    var Observer = function Observer (value) {
      this.value = value;
      this.dep = new Dep();
      this.vmCount = 0;
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
        if (hasProto) {
          protoAugment(value, arrayMethods);
        } else {
          copyAugment(value, arrayMethods, arrayKeys);
        }
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    };

    /**
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk (obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i]);
      }
    };

    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function observeArray (items) {
      for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
      }
    };

    // helpers

    /**
     * Augment a target Object or Array by intercepting
     * the prototype chain using __proto__
     */
    function protoAugment (target, src) {
      /* eslint-disable no-proto */
      target.__proto__ = src;
      /* eslint-enable no-proto */
    }

    /**
     * Augment a target Object or Array by defining
     * hidden properties.
     */
    /* istanbul ignore next */
    function copyAugment (target, src, keys) {
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        def(target, key, src[key]);
      }
    }

    /**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     */
    function observe (value, asRootData) {
      if (!isObject(value) || value instanceof VNode) {
        return
      }
      var ob;
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
      } else if (
        shouldObserve &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
      ) {
        ob = new Observer(value);
      }
      if (asRootData && ob) {
        ob.vmCount++;
      }
      return ob
    }

    /**
     * Define a reactive property on an Object.
     */
    function defineReactive$$1 (
      obj,
      key,
      val,
      customSetter,
      shallow
    ) {
      var dep = new Dep();

      var property = Object.getOwnPropertyDescriptor(obj, key);
      if (property && property.configurable === false) {
        return
      }

      // cater for pre-defined getter/setters
      var getter = property && property.get;
      var setter = property && property.set;
      if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
      }

      var childOb = !shallow && observe(val);
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
          var value = getter ? getter.call(obj) : val;
          if (Dep.target) {
            dep.depend();
            if (childOb) {
              childOb.dep.depend();
              if (Array.isArray(value)) {
                dependArray(value);
              }
            }
          }
          return value
        },
        set: function reactiveSetter (newVal) {
          var value = getter ? getter.call(obj) : val;
          /* eslint-disable no-self-compare */
          if (newVal === value || (newVal !== newVal && value !== value)) {
            return
          }
          // #7981: for accessor properties without setter
          if (getter && !setter) { return }
          if (setter) {
            setter.call(obj, newVal);
          } else {
            val = newVal;
          }
          childOb = !shallow && observe(newVal);
          dep.notify();
        }
      });
    }

    /**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     */
    function set (target, key, val) {
      if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val
      }
      if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val
      }
      var ob = (target).__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
        return val
      }
      if (!ob) {
        target[key] = val;
        return val
      }
      defineReactive$$1(ob.value, key, val);
      ob.dep.notify();
      return val
    }

    /**
     * Delete a property and trigger change if necessary.
     */
    function del (target, key) {
      if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return
      }
      var ob = (target).__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
        return
      }
      if (!hasOwn(target, key)) {
        return
      }
      delete target[key];
      if (!ob) {
        return
      }
      ob.dep.notify();
    }

    /**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     */
    function dependArray (value) {
      for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
          dependArray(e);
        }
      }
    }

    /*  */

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */
    var strats = config.optionMergeStrategies;

    /**
     * Helper that recursively merges two data objects together.
     */
    function mergeData (to, from) {
      if (!from) { return to }
      var key, toVal, fromVal;

      var keys = hasSymbol
        ? Reflect.ownKeys(from)
        : Object.keys(from);

      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__') { continue }
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
          set(to, key, fromVal);
        } else if (
          toVal !== fromVal &&
          isPlainObject(toVal) &&
          isPlainObject(fromVal)
        ) {
          mergeData(toVal, fromVal);
        }
      }
      return to
    }

    /**
     * Data
     */
    function mergeDataOrFn (
      parentVal,
      childVal,
      vm
    ) {
      if (!vm) {
        // in a Vue.extend merge, both should be functions
        if (!childVal) {
          return parentVal
        }
        if (!parentVal) {
          return childVal
        }
        // when parentVal & childVal are both present,
        // we need to return a function that returns the
        // merged result of both functions... no need to
        // check if parentVal is a function here because
        // it has to be a function to pass previous merges.
        return function mergedDataFn () {
          return mergeData(
            typeof childVal === 'function' ? childVal.call(this, this) : childVal,
            typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
          )
        }
      } else {
        return function mergedInstanceDataFn () {
          // instance merge
          var instanceData = typeof childVal === 'function'
            ? childVal.call(vm, vm)
            : childVal;
          var defaultData = typeof parentVal === 'function'
            ? parentVal.call(vm, vm)
            : parentVal;
          if (instanceData) {
            return mergeData(instanceData, defaultData)
          } else {
            return defaultData
          }
        }
      }
    }

    strats.data = function (
      parentVal,
      childVal,
      vm
    ) {
      if (!vm) {
        if (childVal && typeof childVal !== 'function') {

          return parentVal
        }
        return mergeDataOrFn(parentVal, childVal)
      }

      return mergeDataOrFn(parentVal, childVal, vm)
    };

    /**
     * Hooks and props are merged as arrays.
     */
    function mergeHook (
      parentVal,
      childVal
    ) {
      var res = childVal
        ? parentVal
          ? parentVal.concat(childVal)
          : Array.isArray(childVal)
            ? childVal
            : [childVal]
        : parentVal;
      return res
        ? dedupeHooks(res)
        : res
    }

    function dedupeHooks (hooks) {
      var res = [];
      for (var i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
          res.push(hooks[i]);
        }
      }
      return res
    }

    LIFECYCLE_HOOKS.forEach(function (hook) {
      strats[hook] = mergeHook;
    });

    /**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */
    function mergeAssets (
      parentVal,
      childVal,
      vm,
      key
    ) {
      var res = Object.create(parentVal || null);
      if (childVal) {
        return extend(res, childVal)
      } else {
        return res
      }
    }

    ASSET_TYPES.forEach(function (type) {
      strats[type + 's'] = mergeAssets;
    });

    /**
     * Watchers.
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */
    strats.watch = function (
      parentVal,
      childVal,
      vm,
      key
    ) {
      // work around Firefox's Object.prototype.watch...
      if (parentVal === nativeWatch) { parentVal = undefined; }
      if (childVal === nativeWatch) { childVal = undefined; }
      /* istanbul ignore if */
      if (!childVal) { return Object.create(parentVal || null) }
      if (!parentVal) { return childVal }
      var ret = {};
      extend(ret, parentVal);
      for (var key$1 in childVal) {
        var parent = ret[key$1];
        var child = childVal[key$1];
        if (parent && !Array.isArray(parent)) {
          parent = [parent];
        }
        ret[key$1] = parent
          ? parent.concat(child)
          : Array.isArray(child) ? child : [child];
      }
      return ret
    };

    /**
     * Other object hashes.
     */
    strats.props =
    strats.methods =
    strats.inject =
    strats.computed = function (
      parentVal,
      childVal,
      vm,
      key
    ) {
      if (childVal && "production" !== 'production') {
        assertObjectType(key, childVal);
      }
      if (!parentVal) { return childVal }
      var ret = Object.create(null);
      extend(ret, parentVal);
      if (childVal) { extend(ret, childVal); }
      return ret
    };
    strats.provide = mergeDataOrFn;

    /**
     * Default strategy.
     */
    var defaultStrat = function (parentVal, childVal) {
      return childVal === undefined
        ? parentVal
        : childVal
    };

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     */
    function normalizeProps (options, vm) {
      var props = options.props;
      if (!props) { return }
      var res = {};
      var i, val, name;
      if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
          val = props[i];
          if (typeof val === 'string') {
            name = camelize$1(val);
            res[name] = { type: null };
          }
        }
      } else if (isPlainObject(props)) {
        for (var key in props) {
          val = props[key];
          name = camelize$1(key);
          res[name] = isPlainObject(val)
            ? val
            : { type: val };
        }
      }
      options.props = res;
    }

    /**
     * Normalize all injections into Object-based format
     */
    function normalizeInject (options, vm) {
      var inject = options.inject;
      if (!inject) { return }
      var normalized = options.inject = {};
      if (Array.isArray(inject)) {
        for (var i = 0; i < inject.length; i++) {
          normalized[inject[i]] = { from: inject[i] };
        }
      } else if (isPlainObject(inject)) {
        for (var key in inject) {
          var val = inject[key];
          normalized[key] = isPlainObject(val)
            ? extend({ from: key }, val)
            : { from: val };
        }
      }
    }

    /**
     * Normalize raw function directives into object format.
     */
    function normalizeDirectives (options) {
      var dirs = options.directives;
      if (dirs) {
        for (var key in dirs) {
          var def$$1 = dirs[key];
          if (typeof def$$1 === 'function') {
            dirs[key] = { bind: def$$1, update: def$$1 };
          }
        }
      }
    }

    function assertObjectType (name, value, vm) {
      if (!isPlainObject(value)) {
        warn(
          "Invalid value for option \"" + name + "\": expected an Object, " +
          "but got " + (toRawType(value)) + ".");
      }
    }

    /**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     */
    function mergeOptions (
      parent,
      child,
      vm
    ) {

      if (typeof child === 'function') {
        child = child.options;
      }

      normalizeProps(child);
      normalizeInject(child);
      normalizeDirectives(child);

      // Apply extends and mixins on the child options,
      // but only if it is a raw options object that isn't
      // the result of another mergeOptions call.
      // Only merged options has the _base property.
      if (!child._base) {
        if (child.extends) {
          parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
          for (var i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i], vm);
          }
        }
      }

      var options = {};
      var key;
      for (key in parent) {
        mergeField(key);
      }
      for (key in child) {
        if (!hasOwn(parent, key)) {
          mergeField(key);
        }
      }
      function mergeField (key) {
        var strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
      }
      return options
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     */
    function resolveAsset (
      options,
      type,
      id,
      warnMissing
    ) {
      /* istanbul ignore if */
      if (typeof id !== 'string') {
        return
      }
      var assets = options[type];
      // check local registration variations first
      if (hasOwn(assets, id)) { return assets[id] }
      var camelizedId = camelize$1(id);
      if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
      var PascalCaseId = capitalize$1(camelizedId);
      if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
      // fallback to prototype chain
      var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
      return res
    }

    /*  */



    function validateProp (
      key,
      propOptions,
      propsData,
      vm
    ) {
      var prop = propOptions[key];
      var absent = !hasOwn(propsData, key);
      var value = propsData[key];
      // boolean casting
      var booleanIndex = getTypeIndex(Boolean, prop.type);
      if (booleanIndex > -1) {
        if (absent && !hasOwn(prop, 'default')) {
          value = false;
        } else if (value === '' || value === hyphenate$1(key)) {
          // only cast empty string / same name to boolean if
          // boolean has higher priority
          var stringIndex = getTypeIndex(String, prop.type);
          if (stringIndex < 0 || booleanIndex < stringIndex) {
            value = true;
          }
        }
      }
      // check default value
      if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
        // since the default value is a fresh copy,
        // make sure to observe it.
        var prevShouldObserve = shouldObserve;
        toggleObserving(true);
        observe(value);
        toggleObserving(prevShouldObserve);
      }
      return value
    }

    /**
     * Get the default value of a prop.
     */
    function getPropDefaultValue (vm, prop, key) {
      // no default, return undefined
      if (!hasOwn(prop, 'default')) {
        return undefined
      }
      var def = prop.default;
      // the raw prop value was also undefined from previous render,
      // return previous default value to avoid unnecessary watcher trigger
      if (vm && vm.$options.propsData &&
        vm.$options.propsData[key] === undefined &&
        vm._props[key] !== undefined
      ) {
        return vm._props[key]
      }
      // call factory function for non-Function types
      // a value is Function if its prototype is function even across different execution context
      return typeof def === 'function' && getType(prop.type) !== 'Function'
        ? def.call(vm)
        : def
    }

    var functionTypeCheckRE = /^\s*function (\w+)/;

    /**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     */
    function getType (fn) {
      var match = fn && fn.toString().match(functionTypeCheckRE);
      return match ? match[1] : ''
    }

    function isSameType (a, b) {
      return getType(a) === getType(b)
    }

    function getTypeIndex (type, expectedTypes) {
      if (!Array.isArray(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1
      }
      for (var i = 0, len = expectedTypes.length; i < len; i++) {
        if (isSameType(expectedTypes[i], type)) {
          return i
        }
      }
      return -1
    }

    /*  */

    function handleError$1 (err, vm, info) {
      // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
      // See: https://github.com/vuejs/vuex/issues/1505
      pushTarget();
      try {
        if (vm) {
          var cur = vm;
          while ((cur = cur.$parent)) {
            var hooks = cur.$options.errorCaptured;
            if (hooks) {
              for (var i = 0; i < hooks.length; i++) {
                try {
                  var capture = hooks[i].call(cur, err, vm, info) === false;
                  if (capture) { return }
                } catch (e) {
                  globalHandleError(e, cur, 'errorCaptured hook');
                }
              }
            }
          }
        }
        globalHandleError(err, vm, info);
      } finally {
        popTarget();
      }
    }

    function invokeWithErrorHandling (
      handler,
      context,
      args,
      vm,
      info
    ) {
      var res;
      try {
        res = args ? handler.apply(context, args) : handler.call(context);
        if (res && !res._isVue && isPromise(res) && !res._handled) {
          res.catch(function (e) { return handleError$1(e, vm, info + " (Promise/async)"); });
          // issue #9511
          // avoid catch triggering multiple times when nested calls
          res._handled = true;
        }
      } catch (e) {
        handleError$1(e, vm, info);
      }
      return res
    }

    function globalHandleError (err, vm, info) {
      if (config.errorHandler) {
        try {
          return config.errorHandler.call(null, err, vm, info)
        } catch (e) {
          // if the user intentionally throws the original error in the handler,
          // do not log it twice
          if (e !== err) {
            logError(e);
          }
        }
      }
      logError(err);
    }

    function logError (err, vm, info) {
      /* istanbul ignore else */
      if ((inBrowser || inWeex) && typeof console !== 'undefined') {
        console.error(err);
      } else {
        throw err
      }
    }

    /*  */

    var isUsingMicroTask = false;

    var callbacks = [];
    var pending = false;

    function flushCallbacks () {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }

    // Here we have async deferring wrappers using microtasks.
    // In 2.5 we used (macro) tasks (in combination with microtasks).
    // However, it has subtle problems when state is changed right before repaint
    // (e.g. #6813, out-in transitions).
    // Also, using (macro) tasks in event handler would cause some weird behaviors
    // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
    // So we now use microtasks everywhere, again.
    // A major drawback of this tradeoff is that there are some scenarios
    // where microtasks have too high a priority and fire in between supposedly
    // sequential events (e.g. #4521, #6690, which have workarounds)
    // or even between bubbling of the same event (#6566).
    var timerFunc;

    // The nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore next, $flow-disable-line */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p$2 = Promise.resolve();
      timerFunc = function () {
        p$2.then(flushCallbacks);
        // In problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS) { setTimeout(noop); }
      };
      isUsingMicroTask = true;
    } else if (!isIE && typeof MutationObserver !== 'undefined' && (
      isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
      // Use MutationObserver where native Promise is not available,
      // e.g. PhantomJS, iOS7, Android 4.4
      // (#6466 MutationObserver is unreliable in IE11)
      var counter = 1;
      var observer = new MutationObserver(flushCallbacks);
      var textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true
      });
      timerFunc = function () {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
      };
      isUsingMicroTask = true;
    } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      // Fallback to setImmediate.
      // Technically it leverages the (macro) task queue,
      // but it is still a better choice than setTimeout.
      timerFunc = function () {
        setImmediate(flushCallbacks);
      };
    } else {
      // Fallback to setTimeout.
      timerFunc = function () {
        setTimeout(flushCallbacks, 0);
      };
    }

    function nextTick (cb, ctx) {
      var _resolve;
      callbacks.push(function () {
        if (cb) {
          try {
            cb.call(ctx);
          } catch (e) {
            handleError$1(e, ctx, 'nextTick');
          }
        } else if (_resolve) {
          _resolve(ctx);
        }
      });
      if (!pending) {
        pending = true;
        timerFunc();
      }
      // $flow-disable-line
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
          _resolve = resolve;
        })
      }
    }

    /*  */

    var seenObjects = new _Set();

    /**
     * Recursively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     */
    function traverse (val) {
      _traverse(val, seenObjects);
      seenObjects.clear();
    }

    function _traverse (val, seen) {
      var i, keys;
      var isA = Array.isArray(val);
      if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
        return
      }
      if (val.__ob__) {
        var depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
          return
        }
        seen.add(depId);
      }
      if (isA) {
        i = val.length;
        while (i--) { _traverse(val[i], seen); }
      } else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--) { _traverse(val[keys[i]], seen); }
      }
    }

    /*  */

    var normalizeEvent = cached(function (name) {
      var passive = name.charAt(0) === '&';
      name = passive ? name.slice(1) : name;
      var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
      name = once$$1 ? name.slice(1) : name;
      var capture = name.charAt(0) === '!';
      name = capture ? name.slice(1) : name;
      return {
        name: name,
        once: once$$1,
        capture: capture,
        passive: passive
      }
    });

    function createFnInvoker (fns, vm) {
      function invoker () {
        var arguments$1 = arguments;

        var fns = invoker.fns;
        if (Array.isArray(fns)) {
          var cloned = fns.slice();
          for (var i = 0; i < cloned.length; i++) {
            invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
          }
        } else {
          // return handler return value for single handlers
          return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
        }
      }
      invoker.fns = fns;
      return invoker
    }

    function updateListeners (
      on,
      oldOn,
      add,
      remove$$1,
      createOnceHandler,
      vm
    ) {
      var name, def$$1, cur, old, event;
      for (name in on) {
        def$$1 = cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isUndef(cur)) ; else if (isUndef(old)) {
          if (isUndef(cur.fns)) {
            cur = on[name] = createFnInvoker(cur, vm);
          }
          if (isTrue(event.once)) {
            cur = on[name] = createOnceHandler(event.name, cur, event.capture);
          }
          add(event.name, cur, event.capture, event.passive, event.params);
        } else if (cur !== old) {
          old.fns = cur;
          on[name] = old;
        }
      }
      for (name in oldOn) {
        if (isUndef(on[name])) {
          event = normalizeEvent(name);
          remove$$1(event.name, oldOn[name], event.capture);
        }
      }
    }

    /*  */

    function mergeVNodeHook (def, hookKey, hook) {
      if (def instanceof VNode) {
        def = def.data.hook || (def.data.hook = {});
      }
      var invoker;
      var oldHook = def[hookKey];

      function wrappedHook () {
        hook.apply(this, arguments);
        // important: remove merged hook to ensure it's called only once
        // and prevent memory leak
        remove(invoker.fns, wrappedHook);
      }

      if (isUndef(oldHook)) {
        // no existing hook
        invoker = createFnInvoker([wrappedHook]);
      } else {
        /* istanbul ignore if */
        if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
          // already a merged invoker
          invoker = oldHook;
          invoker.fns.push(wrappedHook);
        } else {
          // existing plain hook
          invoker = createFnInvoker([oldHook, wrappedHook]);
        }
      }

      invoker.merged = true;
      def[hookKey] = invoker;
    }

    /*  */

    function extractPropsFromVNodeData (
      data,
      Ctor,
      tag
    ) {
      // we are only extracting raw values here.
      // validation and default values are handled in the child
      // component itself.
      var propOptions = Ctor.options.props;
      if (isUndef(propOptions)) {
        return
      }
      var res = {};
      var attrs = data.attrs;
      var props = data.props;
      if (isDef(attrs) || isDef(props)) {
        for (var key in propOptions) {
          var altKey = hyphenate$1(key);
          checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
        }
      }
      return res
    }

    function checkProp (
      res,
      hash,
      key,
      altKey,
      preserve
    ) {
      if (isDef(hash)) {
        if (hasOwn(hash, key)) {
          res[key] = hash[key];
          if (!preserve) {
            delete hash[key];
          }
          return true
        } else if (hasOwn(hash, altKey)) {
          res[key] = hash[altKey];
          if (!preserve) {
            delete hash[altKey];
          }
          return true
        }
      }
      return false
    }

    /*  */

    // The template compiler attempts to minimize the need for normalization by
    // statically analyzing the template at compile time.
    //
    // For plain HTML markup, normalization can be completely skipped because the
    // generated render function is guaranteed to return Array<VNode>. There are
    // two cases where extra normalization is needed:

    // 1. When the children contains components - because a functional component
    // may return an Array instead of a single root. In this case, just a simple
    // normalization is needed - if any child is an Array, we flatten the whole
    // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
    // because functional components already normalize their own children.
    function simpleNormalizeChildren (children) {
      for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
          return Array.prototype.concat.apply([], children)
        }
      }
      return children
    }

    // 2. When the children contains constructs that always generated nested Arrays,
    // e.g. <template>, <slot>, v-for, or when the children is provided by user
    // with hand-written render functions / JSX. In such cases a full normalization
    // is needed to cater to all possible types of children values.
    function normalizeChildren (children) {
      return isPrimitive(children)
        ? [createTextVNode(children)]
        : Array.isArray(children)
          ? normalizeArrayChildren(children)
          : undefined
    }

    function isTextNode (node) {
      return isDef(node) && isDef(node.text) && isFalse(node.isComment)
    }

    function normalizeArrayChildren (children, nestedIndex) {
      var res = [];
      var i, c, lastIndex, last;
      for (i = 0; i < children.length; i++) {
        c = children[i];
        if (isUndef(c) || typeof c === 'boolean') { continue }
        lastIndex = res.length - 1;
        last = res[lastIndex];
        //  nested
        if (Array.isArray(c)) {
          if (c.length > 0) {
            c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
            // merge adjacent text nodes
            if (isTextNode(c[0]) && isTextNode(last)) {
              res[lastIndex] = createTextVNode(last.text + (c[0]).text);
              c.shift();
            }
            res.push.apply(res, c);
          }
        } else if (isPrimitive(c)) {
          if (isTextNode(last)) {
            // merge adjacent text nodes
            // this is necessary for SSR hydration because text nodes are
            // essentially merged when rendered to HTML strings
            res[lastIndex] = createTextVNode(last.text + c);
          } else if (c !== '') {
            // convert primitive to vnode
            res.push(createTextVNode(c));
          }
        } else {
          if (isTextNode(c) && isTextNode(last)) {
            // merge adjacent text nodes
            res[lastIndex] = createTextVNode(last.text + c.text);
          } else {
            // default key for nested array children (likely generated by v-for)
            if (isTrue(children._isVList) &&
              isDef(c.tag) &&
              isUndef(c.key) &&
              isDef(nestedIndex)) {
              c.key = "__vlist" + nestedIndex + "_" + i + "__";
            }
            res.push(c);
          }
        }
      }
      return res
    }

    /*  */

    function initProvide (vm) {
      var provide = vm.$options.provide;
      if (provide) {
        vm._provided = typeof provide === 'function'
          ? provide.call(vm)
          : provide;
      }
    }

    function initInjections (vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
        toggleObserving(false);
        Object.keys(result).forEach(function (key) {
          /* istanbul ignore else */
          {
            defineReactive$$1(vm, key, result[key]);
          }
        });
        toggleObserving(true);
      }
    }

    function resolveInject (inject, vm) {
      if (inject) {
        // inject is :any because flow is not smart enough to figure out cached
        var result = Object.create(null);
        var keys = hasSymbol
          ? Reflect.ownKeys(inject)
          : Object.keys(inject);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          // #6574 in case the inject object is observed...
          if (key === '__ob__') { continue }
          var provideKey = inject[key].from;
          var source = vm;
          while (source) {
            if (source._provided && hasOwn(source._provided, provideKey)) {
              result[key] = source._provided[provideKey];
              break
            }
            source = source.$parent;
          }
          if (!source) {
            if ('default' in inject[key]) {
              var provideDefault = inject[key].default;
              result[key] = typeof provideDefault === 'function'
                ? provideDefault.call(vm)
                : provideDefault;
            }
          }
        }
        return result
      }
    }

    /*  */



    /**
     * Runtime helper for resolving raw children VNodes into a slot object.
     */
    function resolveSlots (
      children,
      context
    ) {
      if (!children || !children.length) {
        return {}
      }
      var slots = {};
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        var data = child.data;
        // remove slot attribute if the node is resolved as a Vue slot node
        if (data && data.attrs && data.attrs.slot) {
          delete data.attrs.slot;
        }
        // named slots should only be respected if the vnode was rendered in the
        // same context.
        if ((child.context === context || child.fnContext === context) &&
          data && data.slot != null
        ) {
          var name = data.slot;
          var slot = (slots[name] || (slots[name] = []));
          if (child.tag === 'template') {
            slot.push.apply(slot, child.children || []);
          } else {
            slot.push(child);
          }
        } else {
          (slots.default || (slots.default = [])).push(child);
        }
      }
      // ignore slots that contains only whitespace
      for (var name$1 in slots) {
        if (slots[name$1].every(isWhitespace)) {
          delete slots[name$1];
        }
      }
      return slots
    }

    function isWhitespace (node) {
      return (node.isComment && !node.asyncFactory) || node.text === ' '
    }

    /*  */

    function isAsyncPlaceholder (node) {
      return node.isComment && node.asyncFactory
    }

    /*  */

    function normalizeScopedSlots (
      slots,
      normalSlots,
      prevSlots
    ) {
      var res;
      var hasNormalSlots = Object.keys(normalSlots).length > 0;
      var isStable = slots ? !!slots.$stable : !hasNormalSlots;
      var key = slots && slots.$key;
      if (!slots) {
        res = {};
      } else if (slots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return slots._normalized
      } else if (
        isStable &&
        prevSlots &&
        prevSlots !== emptyObject &&
        key === prevSlots.$key &&
        !hasNormalSlots &&
        !prevSlots.$hasNormal
      ) {
        // fast path 2: stable scoped slots w/ no normal slots to proxy,
        // only need to normalize once
        return prevSlots
      } else {
        res = {};
        for (var key$1 in slots) {
          if (slots[key$1] && key$1[0] !== '$') {
            res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
          }
        }
      }
      // expose normal slots on scopedSlots
      for (var key$2 in normalSlots) {
        if (!(key$2 in res)) {
          res[key$2] = proxyNormalSlot(normalSlots, key$2);
        }
      }
      // avoriaz seems to mock a non-extensible $scopedSlots object
      // and when that is passed down this would cause an error
      if (slots && Object.isExtensible(slots)) {
        (slots)._normalized = res;
      }
      def(res, '$stable', isStable);
      def(res, '$key', key);
      def(res, '$hasNormal', hasNormalSlots);
      return res
    }

    function normalizeScopedSlot(normalSlots, key, fn) {
      var normalized = function () {
        var res = arguments.length ? fn.apply(null, arguments) : fn({});
        res = res && typeof res === 'object' && !Array.isArray(res)
          ? [res] // single vnode
          : normalizeChildren(res);
        var vnode = res && res[0];
        return res && (
          !vnode ||
          (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) // #9658, #10391
        ) ? undefined
          : res
      };
      // this is a slot using the new v-slot syntax without scope. although it is
      // compiled as a scoped slot, render fn users would expect it to be present
      // on this.$slots because the usage is semantically a normal slot.
      if (fn.proxy) {
        Object.defineProperty(normalSlots, key, {
          get: normalized,
          enumerable: true,
          configurable: true
        });
      }
      return normalized
    }

    function proxyNormalSlot(slots, key) {
      return function () { return slots[key]; }
    }

    /*  */

    /**
     * Runtime helper for rendering v-for lists.
     */
    function renderList (
      val,
      render
    ) {
      var ret, i, l, keys, key;
      if (Array.isArray(val) || typeof val === 'string') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
          ret[i] = render(val[i], i);
        }
      } else if (typeof val === 'number') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
          ret[i] = render(i + 1, i);
        }
      } else if (isObject(val)) {
        if (hasSymbol && val[Symbol.iterator]) {
          ret = [];
          var iterator = val[Symbol.iterator]();
          var result = iterator.next();
          while (!result.done) {
            ret.push(render(result.value, ret.length));
            result = iterator.next();
          }
        } else {
          keys = Object.keys(val);
          ret = new Array(keys.length);
          for (i = 0, l = keys.length; i < l; i++) {
            key = keys[i];
            ret[i] = render(val[key], key, i);
          }
        }
      }
      if (!isDef(ret)) {
        ret = [];
      }
      (ret)._isVList = true;
      return ret
    }

    /*  */

    /**
     * Runtime helper for rendering <slot>
     */
    function renderSlot (
      name,
      fallbackRender,
      props,
      bindObject
    ) {
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      if (scopedSlotFn) {
        // scoped slot
        props = props || {};
        if (bindObject) {
          props = extend(extend({}, bindObject), props);
        }
        nodes =
          scopedSlotFn(props) ||
          (typeof fallbackRender === 'function' ? fallbackRender() : fallbackRender);
      } else {
        nodes =
          this.$slots[name] ||
          (typeof fallbackRender === 'function' ? fallbackRender() : fallbackRender);
      }

      var target = props && props.slot;
      if (target) {
        return this.$createElement('template', { slot: target }, nodes)
      } else {
        return nodes
      }
    }

    /*  */

    /**
     * Runtime helper for resolving filters
     */
    function resolveFilter (id) {
      return resolveAsset(this.$options, 'filters', id) || identity
    }

    /*  */

    function isKeyNotMatch (expect, actual) {
      if (Array.isArray(expect)) {
        return expect.indexOf(actual) === -1
      } else {
        return expect !== actual
      }
    }

    /**
     * Runtime helper for checking keyCodes from config.
     * exposed as Vue.prototype._k
     * passing in eventKeyName as last argument separately for backwards compat
     */
    function checkKeyCodes (
      eventKeyCode,
      key,
      builtInKeyCode,
      eventKeyName,
      builtInKeyName
    ) {
      var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
      if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
        return isKeyNotMatch(builtInKeyName, eventKeyName)
      } else if (mappedKeyCode) {
        return isKeyNotMatch(mappedKeyCode, eventKeyCode)
      } else if (eventKeyName) {
        return hyphenate$1(eventKeyName) !== key
      }
      return eventKeyCode === undefined
    }

    /*  */

    /**
     * Runtime helper for merging v-bind="object" into a VNode's data.
     */
    function bindObjectProps (
      data,
      tag,
      value,
      asProp,
      isSync
    ) {
      if (value) {
        if (!isObject(value)) ; else {
          if (Array.isArray(value)) {
            value = toObject(value);
          }
          var hash;
          var loop = function ( key ) {
            if (
              key === 'class' ||
              key === 'style' ||
              isReservedAttribute(key)
            ) {
              hash = data;
            } else {
              var type = data.attrs && data.attrs.type;
              hash = asProp || config.mustUseProp(tag, type, key)
                ? data.domProps || (data.domProps = {})
                : data.attrs || (data.attrs = {});
            }
            var camelizedKey = camelize$1(key);
            var hyphenatedKey = hyphenate$1(key);
            if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
              hash[key] = value[key];

              if (isSync) {
                var on = data.on || (data.on = {});
                on[("update:" + key)] = function ($event) {
                  value[key] = $event;
                };
              }
            }
          };

          for (var key in value) loop( key );
        }
      }
      return data
    }

    /*  */

    /**
     * Runtime helper for rendering static trees.
     */
    function renderStatic (
      index,
      isInFor
    ) {
      var cached = this._staticTrees || (this._staticTrees = []);
      var tree = cached[index];
      // if has already-rendered static tree and not inside v-for,
      // we can reuse the same tree.
      if (tree && !isInFor) {
        return tree
      }
      // otherwise, render a fresh tree.
      tree = cached[index] = this.$options.staticRenderFns[index].call(
        this._renderProxy,
        null,
        this // for render fns generated for functional component templates
      );
      markStatic(tree, ("__static__" + index), false);
      return tree
    }

    /**
     * Runtime helper for v-once.
     * Effectively it means marking the node as static with a unique key.
     */
    function markOnce (
      tree,
      index,
      key
    ) {
      markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
      return tree
    }

    function markStatic (
      tree,
      key,
      isOnce
    ) {
      if (Array.isArray(tree)) {
        for (var i = 0; i < tree.length; i++) {
          if (tree[i] && typeof tree[i] !== 'string') {
            markStaticNode(tree[i], (key + "_" + i), isOnce);
          }
        }
      } else {
        markStaticNode(tree, key, isOnce);
      }
    }

    function markStaticNode (node, key, isOnce) {
      node.isStatic = true;
      node.key = key;
      node.isOnce = isOnce;
    }

    /*  */

    function bindObjectListeners (data, value) {
      if (value) {
        if (!isPlainObject(value)) ; else {
          var on = data.on = data.on ? extend({}, data.on) : {};
          for (var key in value) {
            var existing = on[key];
            var ours = value[key];
            on[key] = existing ? [].concat(existing, ours) : ours;
          }
        }
      }
      return data
    }

    /*  */

    function resolveScopedSlots (
      fns, // see flow/vnode
      res,
      // the following are added in 2.6
      hasDynamicKeys,
      contentHashKey
    ) {
      res = res || { $stable: !hasDynamicKeys };
      for (var i = 0; i < fns.length; i++) {
        var slot = fns[i];
        if (Array.isArray(slot)) {
          resolveScopedSlots(slot, res, hasDynamicKeys);
        } else if (slot) {
          // marker for reverse proxying v-slot without scope on this.$slots
          if (slot.proxy) {
            slot.fn.proxy = true;
          }
          res[slot.key] = slot.fn;
        }
      }
      if (contentHashKey) {
        (res).$key = contentHashKey;
      }
      return res
    }

    /*  */

    function bindDynamicKeys (baseObj, values) {
      for (var i = 0; i < values.length; i += 2) {
        var key = values[i];
        if (typeof key === 'string' && key) {
          baseObj[values[i]] = values[i + 1];
        }
      }
      return baseObj
    }

    // helper to dynamically append modifier runtime markers to event names.
    // ensure only append when value is already string, otherwise it will be cast
    // to string and cause the type check to miss.
    function prependModifier (value, symbol) {
      return typeof value === 'string' ? symbol + value : value
    }

    /*  */

    function installRenderHelpers (target) {
      target._o = markOnce;
      target._n = toNumber;
      target._s = toString;
      target._l = renderList;
      target._t = renderSlot;
      target._q = looseEqual;
      target._i = looseIndexOf;
      target._m = renderStatic;
      target._f = resolveFilter;
      target._k = checkKeyCodes;
      target._b = bindObjectProps;
      target._v = createTextVNode;
      target._e = createEmptyVNode;
      target._u = resolveScopedSlots;
      target._g = bindObjectListeners;
      target._d = bindDynamicKeys;
      target._p = prependModifier;
    }

    /*  */

    function FunctionalRenderContext (
      data,
      props,
      children,
      parent,
      Ctor
    ) {
      var this$1 = this;

      var options = Ctor.options;
      // ensure the createElement function in functional components
      // gets a unique context - this is necessary for correct named slot check
      var contextVm;
      if (hasOwn(parent, '_uid')) {
        contextVm = Object.create(parent);
        // $flow-disable-line
        contextVm._original = parent;
      } else {
        // the context vm passed in is a functional context as well.
        // in this case we want to make sure we are able to get a hold to the
        // real context instance.
        contextVm = parent;
        // $flow-disable-line
        parent = parent._original;
      }
      var isCompiled = isTrue(options._compiled);
      var needNormalization = !isCompiled;

      this.data = data;
      this.props = props;
      this.children = children;
      this.parent = parent;
      this.listeners = data.on || emptyObject;
      this.injections = resolveInject(options.inject, parent);
      this.slots = function () {
        if (!this$1.$slots) {
          normalizeScopedSlots(
            data.scopedSlots,
            this$1.$slots = resolveSlots(children, parent)
          );
        }
        return this$1.$slots
      };

      Object.defineProperty(this, 'scopedSlots', ({
        enumerable: true,
        get: function get () {
          return normalizeScopedSlots(data.scopedSlots, this.slots())
        }
      }));

      // support for compiled functional template
      if (isCompiled) {
        // exposing $options for renderStatic()
        this.$options = options;
        // pre-resolve slots for renderSlot()
        this.$slots = this.slots();
        this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
      }

      if (options._scopeId) {
        this._c = function (a, b, c, d) {
          var vnode = createElement(contextVm, a, b, c, d, needNormalization);
          if (vnode && !Array.isArray(vnode)) {
            vnode.fnScopeId = options._scopeId;
            vnode.fnContext = parent;
          }
          return vnode
        };
      } else {
        this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
      }
    }

    installRenderHelpers(FunctionalRenderContext.prototype);

    function createFunctionalComponent (
      Ctor,
      propsData,
      data,
      contextVm,
      children
    ) {
      var options = Ctor.options;
      var props = {};
      var propOptions = options.props;
      if (isDef(propOptions)) {
        for (var key in propOptions) {
          props[key] = validateProp(key, propOptions, propsData || emptyObject);
        }
      } else {
        if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
        if (isDef(data.props)) { mergeProps(props, data.props); }
      }

      var renderContext = new FunctionalRenderContext(
        data,
        props,
        children,
        contextVm,
        Ctor
      );

      var vnode = options.render.call(null, renderContext._c, renderContext);

      if (vnode instanceof VNode) {
        return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
      } else if (Array.isArray(vnode)) {
        var vnodes = normalizeChildren(vnode) || [];
        var res = new Array(vnodes.length);
        for (var i = 0; i < vnodes.length; i++) {
          res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
        }
        return res
      }
    }

    function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
      // #7817 clone node before setting fnContext, otherwise if the node is reused
      // (e.g. it was from a cached normal slot) the fnContext causes named slots
      // that should not be matched to match.
      var clone = cloneVNode(vnode);
      clone.fnContext = contextVm;
      clone.fnOptions = options;
      if (data.slot) {
        (clone.data || (clone.data = {})).slot = data.slot;
      }
      return clone
    }

    function mergeProps (to, from) {
      for (var key in from) {
        to[camelize$1(key)] = from[key];
      }
    }

    /*  */

    /*  */

    /*  */

    /*  */

    // inline hooks to be invoked on component VNodes during patch
    var componentVNodeHooks = {
      init: function init (vnode, hydrating) {
        if (
          vnode.componentInstance &&
          !vnode.componentInstance._isDestroyed &&
          vnode.data.keepAlive
        ) {
          // kept-alive components, treat as a patch
          var mountedNode = vnode; // work around flow
          componentVNodeHooks.prepatch(mountedNode, mountedNode);
        } else {
          var child = vnode.componentInstance = createComponentInstanceForVnode(
            vnode,
            activeInstance
          );
          child.$mount(hydrating ? vnode.elm : undefined, hydrating);
        }
      },

      prepatch: function prepatch (oldVnode, vnode) {
        var options = vnode.componentOptions;
        var child = vnode.componentInstance = oldVnode.componentInstance;
        updateChildComponent(
          child,
          options.propsData, // updated props
          options.listeners, // updated listeners
          vnode, // new parent vnode
          options.children // new children
        );
      },

      insert: function insert (vnode) {
        var context = vnode.context;
        var componentInstance = vnode.componentInstance;
        if (!componentInstance._isMounted) {
          componentInstance._isMounted = true;
          callHook(componentInstance, 'mounted');
        }
        if (vnode.data.keepAlive) {
          if (context._isMounted) {
            // vue-router#1212
            // During updates, a kept-alive component's child components may
            // change, so directly walking the tree here may call activated hooks
            // on incorrect children. Instead we push them into a queue which will
            // be processed after the whole patch process ended.
            queueActivatedComponent(componentInstance);
          } else {
            activateChildComponent(componentInstance, true /* direct */);
          }
        }
      },

      destroy: function destroy (vnode) {
        var componentInstance = vnode.componentInstance;
        if (!componentInstance._isDestroyed) {
          if (!vnode.data.keepAlive) {
            componentInstance.$destroy();
          } else {
            deactivateChildComponent(componentInstance, true /* direct */);
          }
        }
      }
    };

    var hooksToMerge = Object.keys(componentVNodeHooks);

    function createComponent (
      Ctor,
      data,
      context,
      children,
      tag
    ) {
      if (isUndef(Ctor)) {
        return
      }

      var baseCtor = context.$options._base;

      // plain options object: turn it into a constructor
      if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
      }

      // if at this stage it's not a constructor or an async component factory,
      // reject.
      if (typeof Ctor !== 'function') {
        return
      }

      // async component
      var asyncFactory;
      if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
        if (Ctor === undefined) {
          // return a placeholder node for async component, which is rendered
          // as a comment node but preserves all the raw information for the node.
          // the information will be used for async server-rendering and hydration.
          return createAsyncPlaceholder(
            asyncFactory,
            data,
            context,
            children,
            tag
          )
        }
      }

      data = data || {};

      // resolve constructor options in case global mixins are applied after
      // component constructor creation
      resolveConstructorOptions(Ctor);

      // transform component v-model data into props & events
      if (isDef(data.model)) {
        transformModel(Ctor.options, data);
      }

      // extract props
      var propsData = extractPropsFromVNodeData(data, Ctor);

      // functional component
      if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children)
      }

      // extract listeners, since these needs to be treated as
      // child component listeners instead of DOM listeners
      var listeners = data.on;
      // replace with listeners with .native modifier
      // so it gets processed during parent component patch.
      data.on = data.nativeOn;

      if (isTrue(Ctor.options.abstract)) {
        // abstract components do not keep anything
        // other than props & listeners & slot

        // work around flow
        var slot = data.slot;
        data = {};
        if (slot) {
          data.slot = slot;
        }
      }

      // install component management hooks onto the placeholder node
      installComponentHooks(data);

      // return a placeholder vnode
      var name = Ctor.options.name || tag;
      var vnode = new VNode(
        ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
        data, undefined, undefined, undefined, context,
        { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
        asyncFactory
      );

      return vnode
    }

    function createComponentInstanceForVnode (
      // we know it's MountedComponentVNode but flow doesn't
      vnode,
      // activeInstance in lifecycle state
      parent
    ) {
      var options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent: parent
      };
      // check inline-template render functions
      var inlineTemplate = vnode.data.inlineTemplate;
      if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
      }
      return new vnode.componentOptions.Ctor(options)
    }

    function installComponentHooks (data) {
      var hooks = data.hook || (data.hook = {});
      for (var i = 0; i < hooksToMerge.length; i++) {
        var key = hooksToMerge[i];
        var existing = hooks[key];
        var toMerge = componentVNodeHooks[key];
        if (existing !== toMerge && !(existing && existing._merged)) {
          hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
        }
      }
    }

    function mergeHook$1 (f1, f2) {
      var merged = function (a, b) {
        // flow complains about extra args which is why we use any
        f1(a, b);
        f2(a, b);
      };
      merged._merged = true;
      return merged
    }

    // transform component v-model info (value and callback) into
    // prop and event handler respectively.
    function transformModel (options, data) {
      var prop = (options.model && options.model.prop) || 'value';
      var event = (options.model && options.model.event) || 'input'
      ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
      var on = data.on || (data.on = {});
      var existing = on[event];
      var callback = data.model.callback;
      if (isDef(existing)) {
        if (
          Array.isArray(existing)
            ? existing.indexOf(callback) === -1
            : existing !== callback
        ) {
          on[event] = [callback].concat(existing);
        }
      } else {
        on[event] = callback;
      }
    }

    /*  */

    var SIMPLE_NORMALIZE = 1;
    var ALWAYS_NORMALIZE = 2;

    // wrapper function for providing a more flexible interface
    // without getting yelled at by flow
    function createElement (
      context,
      tag,
      data,
      children,
      normalizationType,
      alwaysNormalize
    ) {
      if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children;
        children = data;
        data = undefined;
      }
      if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE;
      }
      return _createElement(context, tag, data, children, normalizationType)
    }

    function _createElement (
      context,
      tag,
      data,
      children,
      normalizationType
    ) {
      if (isDef(data) && isDef((data).__ob__)) {
        return createEmptyVNode()
      }
      // object syntax in v-bind
      if (isDef(data) && isDef(data.is)) {
        tag = data.is;
      }
      if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode()
      }
      // support single function children as default scoped slot
      if (Array.isArray(children) &&
        typeof children[0] === 'function'
      ) {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
      }
      if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
      } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
      }
      var vnode, ns;
      if (typeof tag === 'string') {
        var Ctor;
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
        if (config.isReservedTag(tag)) {
          vnode = new VNode(
            config.parsePlatformTagName(tag), data, children,
            undefined, undefined, context
          );
        } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
          // component
          vnode = createComponent(Ctor, data, context, children, tag);
        } else {
          // unknown or unlisted namespaced elements
          // check at runtime because it may get assigned a namespace when its
          // parent normalizes children
          vnode = new VNode(
            tag, data, children,
            undefined, undefined, context
          );
        }
      } else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children);
      }
      if (Array.isArray(vnode)) {
        return vnode
      } else if (isDef(vnode)) {
        if (isDef(ns)) { applyNS(vnode, ns); }
        if (isDef(data)) { registerDeepBindings(data); }
        return vnode
      } else {
        return createEmptyVNode()
      }
    }

    function applyNS (vnode, ns, force) {
      vnode.ns = ns;
      if (vnode.tag === 'foreignObject') {
        // use default namespace inside foreignObject
        ns = undefined;
        force = true;
      }
      if (isDef(vnode.children)) {
        for (var i = 0, l = vnode.children.length; i < l; i++) {
          var child = vnode.children[i];
          if (isDef(child.tag) && (
            isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
            applyNS(child, ns, force);
          }
        }
      }
    }

    // ref #5318
    // necessary to ensure parent re-render when deep bindings like :style and
    // :class are used on slot nodes
    function registerDeepBindings (data) {
      if (isObject(data.style)) {
        traverse(data.style);
      }
      if (isObject(data.class)) {
        traverse(data.class);
      }
    }

    /*  */

    function initRender (vm) {
      vm._vnode = null; // the root of the child tree
      vm._staticTrees = null; // v-once cached trees
      var options = vm.$options;
      var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
      var renderContext = parentVnode && parentVnode.context;
      vm.$slots = resolveSlots(options._renderChildren, renderContext);
      vm.$scopedSlots = emptyObject;
      // bind the createElement fn to this instance
      // so that we get proper render context inside it.
      // args order: tag, data, children, normalizationType, alwaysNormalize
      // internal version is used by render functions compiled from templates
      vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
      // normalization is always applied for the public version, used in
      // user-written render functions.
      vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

      // $attrs & $listeners are exposed for easier HOC creation.
      // they need to be reactive so that HOCs using them are always updated
      var parentData = parentVnode && parentVnode.data;

      /* istanbul ignore else */
      {
        defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
        defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
      }
    }

    var currentRenderingInstance = null;

    function renderMixin (Vue) {
      // install runtime convenience helpers
      installRenderHelpers(Vue.prototype);

      Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this)
      };

      Vue.prototype._render = function () {
        var vm = this;
        var ref = vm.$options;
        var render = ref.render;
        var _parentVnode = ref._parentVnode;

        if (_parentVnode) {
          vm.$scopedSlots = normalizeScopedSlots(
            _parentVnode.data.scopedSlots,
            vm.$slots,
            vm.$scopedSlots
          );
        }

        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode;
        // render self
        var vnode;
        try {
          // There's no need to maintain a stack because all render fns are called
          // separately from one another. Nested component's render fns are called
          // when parent component is patched.
          currentRenderingInstance = vm;
          vnode = render.call(vm._renderProxy, vm.$createElement);
        } catch (e) {
          handleError$1(e, vm, "render");
          // return error render result,
          // or previous vnode to prevent render error causing blank component
          /* istanbul ignore else */
          {
            vnode = vm._vnode;
          }
        } finally {
          currentRenderingInstance = null;
        }
        // if the returned array contains only a single node, allow it
        if (Array.isArray(vnode) && vnode.length === 1) {
          vnode = vnode[0];
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
          vnode = createEmptyVNode();
        }
        // set parent
        vnode.parent = _parentVnode;
        return vnode
      };
    }

    /*  */

    function ensureCtor (comp, base) {
      if (
        comp.__esModule ||
        (hasSymbol && comp[Symbol.toStringTag] === 'Module')
      ) {
        comp = comp.default;
      }
      return isObject(comp)
        ? base.extend(comp)
        : comp
    }

    function createAsyncPlaceholder (
      factory,
      data,
      context,
      children,
      tag
    ) {
      var node = createEmptyVNode();
      node.asyncFactory = factory;
      node.asyncMeta = { data: data, context: context, children: children, tag: tag };
      return node
    }

    function resolveAsyncComponent (
      factory,
      baseCtor
    ) {
      if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp
      }

      if (isDef(factory.resolved)) {
        return factory.resolved
      }

      var owner = currentRenderingInstance;
      if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
        // already pending
        factory.owners.push(owner);
      }

      if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp
      }

      if (owner && !isDef(factory.owners)) {
        var owners = factory.owners = [owner];
        var sync = true;
        var timerLoading = null;
        var timerTimeout = null

        ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

        var forceRender = function (renderCompleted) {
          for (var i = 0, l = owners.length; i < l; i++) {
            (owners[i]).$forceUpdate();
          }

          if (renderCompleted) {
            owners.length = 0;
            if (timerLoading !== null) {
              clearTimeout(timerLoading);
              timerLoading = null;
            }
            if (timerTimeout !== null) {
              clearTimeout(timerTimeout);
              timerTimeout = null;
            }
          }
        };

        var resolve = once(function (res) {
          // cache resolved
          factory.resolved = ensureCtor(res, baseCtor);
          // invoke callbacks only if this is not a synchronous resolve
          // (async resolves are shimmed as synchronous during SSR)
          if (!sync) {
            forceRender(true);
          } else {
            owners.length = 0;
          }
        });

        var reject = once(function (reason) {
          if (isDef(factory.errorComp)) {
            factory.error = true;
            forceRender(true);
          }
        });

        var res = factory(resolve, reject);

        if (isObject(res)) {
          if (isPromise(res)) {
            // () => Promise
            if (isUndef(factory.resolved)) {
              res.then(resolve, reject);
            }
          } else if (isPromise(res.component)) {
            res.component.then(resolve, reject);

            if (isDef(res.error)) {
              factory.errorComp = ensureCtor(res.error, baseCtor);
            }

            if (isDef(res.loading)) {
              factory.loadingComp = ensureCtor(res.loading, baseCtor);
              if (res.delay === 0) {
                factory.loading = true;
              } else {
                timerLoading = setTimeout(function () {
                  timerLoading = null;
                  if (isUndef(factory.resolved) && isUndef(factory.error)) {
                    factory.loading = true;
                    forceRender(false);
                  }
                }, res.delay || 200);
              }
            }

            if (isDef(res.timeout)) {
              timerTimeout = setTimeout(function () {
                timerTimeout = null;
                if (isUndef(factory.resolved)) {
                  reject(
                     null
                  );
                }
              }, res.timeout);
            }
          }
        }

        sync = false;
        // return in case resolved synchronously
        return factory.loading
          ? factory.loadingComp
          : factory.resolved
      }
    }

    /*  */

    function getFirstComponentChild (children) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          var c = children[i];
          if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
            return c
          }
        }
      }
    }

    /*  */

    /*  */

    function initEvents (vm) {
      vm._events = Object.create(null);
      vm._hasHookEvent = false;
      // init parent attached events
      var listeners = vm.$options._parentListeners;
      if (listeners) {
        updateComponentListeners(vm, listeners);
      }
    }

    var target;

    function add (event, fn) {
      target.$on(event, fn);
    }

    function remove$1 (event, fn) {
      target.$off(event, fn);
    }

    function createOnceHandler (event, fn) {
      var _target = target;
      return function onceHandler () {
        var res = fn.apply(null, arguments);
        if (res !== null) {
          _target.$off(event, onceHandler);
        }
      }
    }

    function updateComponentListeners (
      vm,
      listeners,
      oldListeners
    ) {
      target = vm;
      updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
      target = undefined;
    }

    function eventsMixin (Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function (event, fn) {
        var vm = this;
        if (Array.isArray(event)) {
          for (var i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn);
          }
        } else {
          (vm._events[event] || (vm._events[event] = [])).push(fn);
          // optimize hook:event cost by using a boolean flag marked at registration
          // instead of a hash lookup
          if (hookRE.test(event)) {
            vm._hasHookEvent = true;
          }
        }
        return vm
      };

      Vue.prototype.$once = function (event, fn) {
        var vm = this;
        function on () {
          vm.$off(event, on);
          fn.apply(vm, arguments);
        }
        on.fn = fn;
        vm.$on(event, on);
        return vm
      };

      Vue.prototype.$off = function (event, fn) {
        var vm = this;
        // all
        if (!arguments.length) {
          vm._events = Object.create(null);
          return vm
        }
        // array of events
        if (Array.isArray(event)) {
          for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
            vm.$off(event[i$1], fn);
          }
          return vm
        }
        // specific event
        var cbs = vm._events[event];
        if (!cbs) {
          return vm
        }
        if (!fn) {
          vm._events[event] = null;
          return vm
        }
        // specific handler
        var cb;
        var i = cbs.length;
        while (i--) {
          cb = cbs[i];
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break
          }
        }
        return vm
      };

      Vue.prototype.$emit = function (event) {
        var vm = this;
        var cbs = vm._events[event];
        if (cbs) {
          cbs = cbs.length > 1 ? toArray(cbs) : cbs;
          var args = toArray(arguments, 1);
          var info = "event handler for \"" + event + "\"";
          for (var i = 0, l = cbs.length; i < l; i++) {
            invokeWithErrorHandling(cbs[i], vm, args, vm, info);
          }
        }
        return vm
      };
    }

    /*  */

    var activeInstance = null;

    function setActiveInstance(vm) {
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      return function () {
        activeInstance = prevActiveInstance;
      }
    }

    function initLifecycle (vm) {
      var options = vm.$options;

      // locate first non-abstract parent
      var parent = options.parent;
      if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
          parent = parent.$parent;
        }
        parent.$children.push(vm);
      }

      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;

      vm.$children = [];
      vm.$refs = {};

      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
    }

    function lifecycleMixin (Vue) {
      Vue.prototype._update = function (vnode, hydrating) {
        var vm = this;
        var prevEl = vm.$el;
        var prevVnode = vm._vnode;
        var restoreActiveInstance = setActiveInstance(vm);
        vm._vnode = vnode;
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        if (!prevVnode) {
          // initial render
          vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
        } else {
          // updates
          vm.$el = vm.__patch__(prevVnode, vnode);
        }
        restoreActiveInstance();
        // update __vue__ reference
        if (prevEl) {
          prevEl.__vue__ = null;
        }
        if (vm.$el) {
          vm.$el.__vue__ = vm;
        }
        // if parent is an HOC, update its $el as well
        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
          vm.$parent.$el = vm.$el;
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
      };

      Vue.prototype.$forceUpdate = function () {
        var vm = this;
        if (vm._watcher) {
          vm._watcher.update();
        }
      };

      Vue.prototype.$destroy = function () {
        var vm = this;
        if (vm._isBeingDestroyed) {
          return
        }
        callHook(vm, 'beforeDestroy');
        vm._isBeingDestroyed = true;
        // remove self from parent
        var parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
          remove(parent.$children, vm);
        }
        // teardown watchers
        if (vm._watcher) {
          vm._watcher.teardown();
        }
        var i = vm._watchers.length;
        while (i--) {
          vm._watchers[i].teardown();
        }
        // remove reference from data ob
        // frozen object may not have observer.
        if (vm._data.__ob__) {
          vm._data.__ob__.vmCount--;
        }
        // call the last hook...
        vm._isDestroyed = true;
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null);
        // fire destroyed hook
        callHook(vm, 'destroyed');
        // turn off all instance listeners.
        vm.$off();
        // remove __vue__ reference
        if (vm.$el) {
          vm.$el.__vue__ = null;
        }
        // release circular reference (#6759)
        if (vm.$vnode) {
          vm.$vnode.parent = null;
        }
      };
    }

    function mountComponent (
      vm,
      el,
      hydrating
    ) {
      vm.$el = el;
      if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode;
      }
      callHook(vm, 'beforeMount');

      var updateComponent;
      /* istanbul ignore if */
      {
        updateComponent = function () {
          vm._update(vm._render(), hydrating);
        };
      }

      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      new Watcher(vm, updateComponent, noop, {
        before: function before () {
          if (vm._isMounted && !vm._isDestroyed) {
            callHook(vm, 'beforeUpdate');
          }
        }
      }, true /* isRenderWatcher */);
      hydrating = false;

      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook(vm, 'mounted');
      }
      return vm
    }

    function updateChildComponent (
      vm,
      propsData,
      listeners,
      parentVnode,
      renderChildren
    ) {

      // determine whether component has slot children
      // we need to do this before overwriting $options._renderChildren.

      // check if there are dynamic scopedSlots (hand-written or compiled but with
      // dynamic slot names). Static scoped slots compiled from template has the
      // "$stable" marker.
      var newScopedSlots = parentVnode.data.scopedSlots;
      var oldScopedSlots = vm.$scopedSlots;
      var hasDynamicScopedSlot = !!(
        (newScopedSlots && !newScopedSlots.$stable) ||
        (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
        (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
        (!newScopedSlots && vm.$scopedSlots.$key)
      );

      // Any static slot children from the parent may have changed during parent's
      // update. Dynamic scoped slots may also have changed. In such cases, a forced
      // update is necessary to ensure correctness.
      var needsForceUpdate = !!(
        renderChildren ||               // has new static slots
        vm.$options._renderChildren ||  // has old static slots
        hasDynamicScopedSlot
      );

      vm.$options._parentVnode = parentVnode;
      vm.$vnode = parentVnode; // update vm's placeholder node without re-render

      if (vm._vnode) { // update child tree's parent
        vm._vnode.parent = parentVnode;
      }
      vm.$options._renderChildren = renderChildren;

      // update $attrs and $listeners hash
      // these are also reactive so they may trigger child update if the child
      // used them during render
      vm.$attrs = parentVnode.data.attrs || emptyObject;
      vm.$listeners = listeners || emptyObject;

      // update props
      if (propsData && vm.$options.props) {
        toggleObserving(false);
        var props = vm._props;
        var propKeys = vm.$options._propKeys || [];
        for (var i = 0; i < propKeys.length; i++) {
          var key = propKeys[i];
          var propOptions = vm.$options.props; // wtf flow?
          props[key] = validateProp(key, propOptions, propsData, vm);
        }
        toggleObserving(true);
        // keep a copy of raw propsData
        vm.$options.propsData = propsData;
      }

      // update listeners
      listeners = listeners || emptyObject;
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);

      // resolve slots + force update if has children
      if (needsForceUpdate) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
      }
    }

    function isInInactiveTree (vm) {
      while (vm && (vm = vm.$parent)) {
        if (vm._inactive) { return true }
      }
      return false
    }

    function activateChildComponent (vm, direct) {
      if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
          return
        }
      } else if (vm._directInactive) {
        return
      }
      if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (var i = 0; i < vm.$children.length; i++) {
          activateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'activated');
      }
    }

    function deactivateChildComponent (vm, direct) {
      if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
          return
        }
      }
      if (!vm._inactive) {
        vm._inactive = true;
        for (var i = 0; i < vm.$children.length; i++) {
          deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'deactivated');
      }
    }

    function callHook (vm, hook) {
      // #7573 disable dep collection when invoking lifecycle hooks
      pushTarget();
      var handlers = vm.$options[hook];
      var info = hook + " hook";
      if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
          invokeWithErrorHandling(handlers[i], vm, null, vm, info);
        }
      }
      if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
      }
      popTarget();
    }

    var queue = [];
    var activatedChildren = [];
    var has = {};
    var waiting = false;
    var flushing = false;
    var index = 0;

    /**
     * Reset the scheduler's state.
     */
    function resetSchedulerState () {
      index = queue.length = activatedChildren.length = 0;
      has = {};
      waiting = flushing = false;
    }

    // Async edge case #6566 requires saving the timestamp when event listeners are
    // attached. However, calling performance.now() has a perf overhead especially
    // if the page has thousands of event listeners. Instead, we take a timestamp
    // every time the scheduler flushes and use that for all event listeners
    // attached during that flush.
    var currentFlushTimestamp = 0;

    // Async edge case fix requires storing an event listener's attach timestamp.
    var getNow = Date.now;

    // Determine what event timestamp the browser is using. Annoyingly, the
    // timestamp can either be hi-res (relative to page load) or low-res
    // (relative to UNIX epoch), so in order to compare time we have to use the
    // same timestamp type when saving the flush timestamp.
    // All IE versions use low-res event timestamps, and have problematic clock
    // implementations (#9632)
    if (inBrowser && !isIE) {
      var performance = window.performance;
      if (
        performance &&
        typeof performance.now === 'function' &&
        getNow() > document.createEvent('Event').timeStamp
      ) {
        // if the event timestamp, although evaluated AFTER the Date.now(), is
        // smaller than it, it means the event is using a hi-res timestamp,
        // and we need to use the hi-res version for event listener timestamps as
        // well.
        getNow = function () { return performance.now(); };
      }
    }

    /**
     * Flush both queues and run the watchers.
     */
    function flushSchedulerQueue () {
      currentFlushTimestamp = getNow();
      flushing = true;
      var watcher, id;

      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child)
      // 2. A component's user watchers are run before its render watcher (because
      //    user watchers are created before the render watcher)
      // 3. If a component is destroyed during a parent component's watcher run,
      //    its watchers can be skipped.
      queue.sort(function (a, b) { return a.id - b.id; });

      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        if (watcher.before) {
          watcher.before();
        }
        id = watcher.id;
        has[id] = null;
        watcher.run();
      }

      // keep copies of post queues before resetting state
      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();

      resetSchedulerState();

      // call component updated and activated hooks
      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);

      // devtool hook
      /* istanbul ignore if */
      if (devtools && config.devtools) {
        devtools.emit('flush');
      }
    }

    function callUpdatedHooks (queue) {
      var i = queue.length;
      while (i--) {
        var watcher = queue[i];
        var vm = watcher.vm;
        if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'updated');
        }
      }
    }

    /**
     * Queue a kept-alive component that was activated during patch.
     * The queue will be processed after the entire tree has been patched.
     */
    function queueActivatedComponent (vm) {
      // setting _inactive to false here so that a render function can
      // rely on checking whether it's in an inactive tree (e.g. router-view)
      vm._inactive = false;
      activatedChildren.push(vm);
    }

    function callActivatedHooks (queue) {
      for (var i = 0; i < queue.length; i++) {
        queue[i]._inactive = true;
        activateChildComponent(queue[i], true /* true */);
      }
    }

    /**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     */
    function queueWatcher (watcher) {
      var id = watcher.id;
      if (has[id] == null) {
        has[id] = true;
        if (!flushing) {
          queue.push(watcher);
        } else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          var i = queue.length - 1;
          while (i > index && queue[i].id > watcher.id) {
            i--;
          }
          queue.splice(i + 1, 0, watcher);
        }
        // queue the flush
        if (!waiting) {
          waiting = true;
          nextTick(flushSchedulerQueue);
        }
      }
    }

    /*  */



    var uid$2 = 0;

    /**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     */
    var Watcher = function Watcher (
      vm,
      expOrFn,
      cb,
      options,
      isRenderWatcher
    ) {
      this.vm = vm;
      if (isRenderWatcher) {
        vm._watcher = this;
      }
      vm._watchers.push(this);
      // options
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
        this.before = options.before;
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$2; // uid for batching
      this.active = true;
      this.dirty = this.lazy; // for lazy watchers
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression =  '';
      // parse expression for getter
      if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath(expOrFn);
        if (!this.getter) {
          this.getter = noop;
        }
      }
      this.value = this.lazy
        ? undefined
        : this.get();
    };

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function get () {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        if (this.user) {
          handleError$1(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
        } else {
          throw e
        }
      } finally {
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value
    };

    /**
     * Add a dependency to this directive.
     */
    Watcher.prototype.addDep = function addDep (dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    };

    /**
     * Clean up for dependency collection.
     */
    Watcher.prototype.cleanupDeps = function cleanupDeps () {
      var i = this.deps.length;
      while (i--) {
        var dep = this.deps[i];
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this);
        }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    };

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    Watcher.prototype.update = function update () {
      /* istanbul ignore else */
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    };

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    Watcher.prototype.run = function run () {
      if (this.active) {
        var value = this.get();
        if (
          value !== this.value ||
          // Deep watchers and watchers on Object/Arrays should fire even
          // when the value is the same, because the value may
          // have mutated.
          isObject(value) ||
          this.deep
        ) {
          // set new value
          var oldValue = this.value;
          this.value = value;
          if (this.user) {
            var info = "callback for watcher \"" + (this.expression) + "\"";
            invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
          } else {
            this.cb.call(this.vm, value, oldValue);
          }
        }
      }
    };

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    Watcher.prototype.evaluate = function evaluate () {
      this.value = this.get();
      this.dirty = false;
    };

    /**
     * Depend on all deps collected by this watcher.
     */
    Watcher.prototype.depend = function depend () {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].depend();
      }
    };

    /**
     * Remove self from all dependencies' subscriber list.
     */
    Watcher.prototype.teardown = function teardown () {
      if (this.active) {
        // remove self from vm's watcher list
        // this is a somewhat expensive operation so we skip it
        // if the vm is being destroyed.
        if (!this.vm._isBeingDestroyed) {
          remove(this.vm._watchers, this);
        }
        var i = this.deps.length;
        while (i--) {
          this.deps[i].removeSub(this);
        }
        this.active = false;
      }
    };

    /*  */

    var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop,
      set: noop
    };

    function proxy (target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
      };
      sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val;
      };
      Object.defineProperty(target, key, sharedPropertyDefinition);
    }

    function initState (vm) {
      vm._watchers = [];
      var opts = vm.$options;
      if (opts.props) { initProps(vm, opts.props); }
      if (opts.methods) { initMethods(vm, opts.methods); }
      if (opts.data) {
        initData(vm);
      } else {
        observe(vm._data = {}, true /* asRootData */);
      }
      if (opts.computed) { initComputed(vm, opts.computed); }
      if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
      }
    }

    function initProps (vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = vm._props = {};
      // cache prop keys so that future props updates can iterate using Array
      // instead of dynamic object key enumeration.
      var keys = vm.$options._propKeys = [];
      var isRoot = !vm.$parent;
      // root instance props should be converted
      if (!isRoot) {
        toggleObserving(false);
      }
      var loop = function ( key ) {
        keys.push(key);
        var value = validateProp(key, propsOptions, propsData, vm);
        /* istanbul ignore else */
        {
          defineReactive$$1(props, key, value);
        }
        // static props are already proxied on the component's prototype
        // during Vue.extend(). We only need to proxy props defined at
        // instantiation here.
        if (!(key in vm)) {
          proxy(vm, "_props", key);
        }
      };

      for (var key in propsOptions) loop( key );
      toggleObserving(true);
    }

    function initData (vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {};
      if (!isPlainObject(data)) {
        data = {};
      }
      // proxy data on instance
      var keys = Object.keys(data);
      var props = vm.$options.props;
      var methods = vm.$options.methods;
      var i = keys.length;
      while (i--) {
        var key = keys[i];
        if (props && hasOwn(props, key)) ; else if (!isReserved(key)) {
          proxy(vm, "_data", key);
        }
      }
      // observe data
      observe(data, true /* asRootData */);
    }

    function getData (data, vm) {
      // #7573 disable dep collection when invoking data getters
      pushTarget();
      try {
        return data.call(vm, vm)
      } catch (e) {
        handleError$1(e, vm, "data()");
        return {}
      } finally {
        popTarget();
      }
    }

    var computedWatcherOptions = { lazy: true };

    function initComputed (vm, computed) {
      // $flow-disable-line
      var watchers = vm._computedWatchers = Object.create(null);
      // computed properties are just getters during SSR
      var isSSR = isServerRendering();

      for (var key in computed) {
        var userDef = computed[key];
        var getter = typeof userDef === 'function' ? userDef : userDef.get;

        if (!isSSR) {
          // create internal watcher for the computed property.
          watchers[key] = new Watcher(
            vm,
            getter || noop,
            noop,
            computedWatcherOptions
          );
        }

        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        if (!(key in vm)) {
          defineComputed(vm, key, userDef);
        }
      }
    }

    function defineComputed (
      target,
      key,
      userDef
    ) {
      var shouldCache = !isServerRendering();
      if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = shouldCache
          ? createComputedGetter(key)
          : createGetterInvoker(userDef);
        sharedPropertyDefinition.set = noop;
      } else {
        sharedPropertyDefinition.get = userDef.get
          ? shouldCache && userDef.cache !== false
            ? createComputedGetter(key)
            : createGetterInvoker(userDef.get)
          : noop;
        sharedPropertyDefinition.set = userDef.set || noop;
      }
      Object.defineProperty(target, key, sharedPropertyDefinition);
    }

    function createComputedGetter (key) {
      return function computedGetter () {
        var watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
          if (watcher.dirty) {
            watcher.evaluate();
          }
          if (Dep.target) {
            watcher.depend();
          }
          return watcher.value
        }
      }
    }

    function createGetterInvoker(fn) {
      return function computedGetter () {
        return fn.call(this, this)
      }
    }

    function initMethods (vm, methods) {
      var props = vm.$options.props;
      for (var key in methods) {
        vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
      }
    }

    function initWatch (vm, watch) {
      for (var key in watch) {
        var handler = watch[key];
        if (Array.isArray(handler)) {
          for (var i = 0; i < handler.length; i++) {
            createWatcher(vm, key, handler[i]);
          }
        } else {
          createWatcher(vm, key, handler);
        }
      }
    }

    function createWatcher (
      vm,
      expOrFn,
      handler,
      options
    ) {
      if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
      }
      if (typeof handler === 'string') {
        handler = vm[handler];
      }
      return vm.$watch(expOrFn, handler, options)
    }

    function stateMixin (Vue) {
      // flow somehow has problems with directly declared definition object
      // when using Object.defineProperty, so we have to procedurally build up
      // the object here.
      var dataDef = {};
      dataDef.get = function () { return this._data };
      var propsDef = {};
      propsDef.get = function () { return this._props };
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);

      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;

      Vue.prototype.$watch = function (
        expOrFn,
        cb,
        options
      ) {
        var vm = this;
        if (isPlainObject(cb)) {
          return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {};
        options.user = true;
        var watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
          var info = "callback for immediate watcher \"" + (watcher.expression) + "\"";
          pushTarget();
          invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
          popTarget();
        }
        return function unwatchFn () {
          watcher.teardown();
        }
      };
    }

    /*  */

    var uid$3 = 0;

    function initMixin (Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        // a uid
        vm._uid = uid$3++;

        // a flag to avoid this being observed
        vm._isVue = true;
        // merge options
        if (options && options._isComponent) {
          // optimize internal component instantiation
          // since dynamic options merging is pretty slow, and none of the
          // internal component options needs special treatment.
          initInternalComponent(vm, options);
        } else {
          vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
          );
        }
        /* istanbul ignore else */
        {
          vm._renderProxy = vm;
        }
        // expose real self
        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        initInjections(vm); // resolve injections before data/props
        initState(vm);
        initProvide(vm); // resolve provide after data/props
        callHook(vm, 'created');

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };
    }

    function initInternalComponent (vm, options) {
      var opts = vm.$options = Object.create(vm.constructor.options);
      // doing this because it's faster than dynamic enumeration.
      var parentVnode = options._parentVnode;
      opts.parent = options.parent;
      opts._parentVnode = parentVnode;

      var vnodeComponentOptions = parentVnode.componentOptions;
      opts.propsData = vnodeComponentOptions.propsData;
      opts._parentListeners = vnodeComponentOptions.listeners;
      opts._renderChildren = vnodeComponentOptions.children;
      opts._componentTag = vnodeComponentOptions.tag;

      if (options.render) {
        opts.render = options.render;
        opts.staticRenderFns = options.staticRenderFns;
      }
    }

    function resolveConstructorOptions (Ctor) {
      var options = Ctor.options;
      if (Ctor.super) {
        var superOptions = resolveConstructorOptions(Ctor.super);
        var cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
          // super option changed,
          // need to resolve new options.
          Ctor.superOptions = superOptions;
          // check if there are any late-modified/attached options (#4976)
          var modifiedOptions = resolveModifiedOptions(Ctor);
          // update base extend options
          if (modifiedOptions) {
            extend(Ctor.extendOptions, modifiedOptions);
          }
          options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
          if (options.name) {
            options.components[options.name] = Ctor;
          }
        }
      }
      return options
    }

    function resolveModifiedOptions (Ctor) {
      var modified;
      var latest = Ctor.options;
      var sealed = Ctor.sealedOptions;
      for (var key in latest) {
        if (latest[key] !== sealed[key]) {
          if (!modified) { modified = {}; }
          modified[key] = latest[key];
        }
      }
      return modified
    }

    function Vue (options) {
      this._init(options);
    }

    initMixin(Vue);
    stateMixin(Vue);
    eventsMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);

    /*  */

    function initUse (Vue) {
      Vue.use = function (plugin) {
        var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
        if (installedPlugins.indexOf(plugin) > -1) {
          return this
        }

        // additional parameters
        var args = toArray(arguments, 1);
        args.unshift(this);
        if (typeof plugin.install === 'function') {
          plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
          plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this
      };
    }

    /*  */

    function initMixin$1 (Vue) {
      Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this
      };
    }

    /*  */

    function initExtend (Vue) {
      /**
       * Each instance constructor, including Vue, has a unique
       * cid. This enables us to create wrapped "child
       * constructors" for prototypal inheritance and cache them.
       */
      Vue.cid = 0;
      var cid = 1;

      /**
       * Class inheritance
       */
      Vue.extend = function (extendOptions) {
        extendOptions = extendOptions || {};
        var Super = this;
        var SuperId = Super.cid;
        var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
        if (cachedCtors[SuperId]) {
          return cachedCtors[SuperId]
        }

        var name = extendOptions.name || Super.options.name;

        var Sub = function VueComponent (options) {
          this._init(options);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.cid = cid++;
        Sub.options = mergeOptions(
          Super.options,
          extendOptions
        );
        Sub['super'] = Super;

        // For props and computed properties, we define the proxy getters on
        // the Vue instances at extension time, on the extended prototype. This
        // avoids Object.defineProperty calls for each instance created.
        if (Sub.options.props) {
          initProps$1(Sub);
        }
        if (Sub.options.computed) {
          initComputed$1(Sub);
        }

        // allow further extension/mixin/plugin usage
        Sub.extend = Super.extend;
        Sub.mixin = Super.mixin;
        Sub.use = Super.use;

        // create asset registers, so extended classes
        // can have their private assets too.
        ASSET_TYPES.forEach(function (type) {
          Sub[type] = Super[type];
        });
        // enable recursive self-lookup
        if (name) {
          Sub.options.components[name] = Sub;
        }

        // keep a reference to the super options at extension time.
        // later at instantiation we can check if Super's options have
        // been updated.
        Sub.superOptions = Super.options;
        Sub.extendOptions = extendOptions;
        Sub.sealedOptions = extend({}, Sub.options);

        // cache constructor
        cachedCtors[SuperId] = Sub;
        return Sub
      };
    }

    function initProps$1 (Comp) {
      var props = Comp.options.props;
      for (var key in props) {
        proxy(Comp.prototype, "_props", key);
      }
    }

    function initComputed$1 (Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
      }
    }

    /*  */

    function initAssetRegisters (Vue) {
      /**
       * Create asset registration methods.
       */
      ASSET_TYPES.forEach(function (type) {
        Vue[type] = function (
          id,
          definition
        ) {
          if (!definition) {
            return this.options[type + 's'][id]
          } else {
            if (type === 'component' && isPlainObject(definition)) {
              definition.name = definition.name || id;
              definition = this.options._base.extend(definition);
            }
            if (type === 'directive' && typeof definition === 'function') {
              definition = { bind: definition, update: definition };
            }
            this.options[type + 's'][id] = definition;
            return definition
          }
        };
      });
    }

    /*  */





    function getComponentName (opts) {
      return opts && (opts.Ctor.options.name || opts.tag)
    }

    function matches (pattern, name) {
      if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
      } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
      } else if (isRegExp(pattern)) {
        return pattern.test(name)
      }
      /* istanbul ignore next */
      return false
    }

    function pruneCache (keepAliveInstance, filter) {
      var cache = keepAliveInstance.cache;
      var keys = keepAliveInstance.keys;
      var _vnode = keepAliveInstance._vnode;
      for (var key in cache) {
        var entry = cache[key];
        if (entry) {
          var name = entry.name;
          if (name && !filter(name)) {
            pruneCacheEntry(cache, key, keys, _vnode);
          }
        }
      }
    }

    function pruneCacheEntry (
      cache,
      key,
      keys,
      current
    ) {
      var entry = cache[key];
      if (entry && (!current || entry.tag !== current.tag)) {
        entry.componentInstance.$destroy();
      }
      cache[key] = null;
      remove(keys, key);
    }

    var patternTypes = [String, RegExp, Array];

    var KeepAlive = {
      name: 'keep-alive',
      abstract: true,

      props: {
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number]
      },

      methods: {
        cacheVNode: function cacheVNode() {
          var ref = this;
          var cache = ref.cache;
          var keys = ref.keys;
          var vnodeToCache = ref.vnodeToCache;
          var keyToCache = ref.keyToCache;
          if (vnodeToCache) {
            var tag = vnodeToCache.tag;
            var componentInstance = vnodeToCache.componentInstance;
            var componentOptions = vnodeToCache.componentOptions;
            cache[keyToCache] = {
              name: getComponentName(componentOptions),
              tag: tag,
              componentInstance: componentInstance,
            };
            keys.push(keyToCache);
            // prune oldest entry
            if (this.max && keys.length > parseInt(this.max)) {
              pruneCacheEntry(cache, keys[0], keys, this._vnode);
            }
            this.vnodeToCache = null;
          }
        }
      },

      created: function created () {
        this.cache = Object.create(null);
        this.keys = [];
      },

      destroyed: function destroyed () {
        for (var key in this.cache) {
          pruneCacheEntry(this.cache, key, this.keys);
        }
      },

      mounted: function mounted () {
        var this$1 = this;

        this.cacheVNode();
        this.$watch('include', function (val) {
          pruneCache(this$1, function (name) { return matches(val, name); });
        });
        this.$watch('exclude', function (val) {
          pruneCache(this$1, function (name) { return !matches(val, name); });
        });
      },

      updated: function updated () {
        this.cacheVNode();
      },

      render: function render () {
        var slot = this.$slots.default;
        var vnode = getFirstComponentChild(slot);
        var componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
          // check pattern
          var name = getComponentName(componentOptions);
          var ref = this;
          var include = ref.include;
          var exclude = ref.exclude;
          if (
            // not included
            (include && (!name || !matches(include, name))) ||
            // excluded
            (exclude && name && matches(exclude, name))
          ) {
            return vnode
          }

          var ref$1 = this;
          var cache = ref$1.cache;
          var keys = ref$1.keys;
          var key = vnode.key == null
            // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
            : vnode.key;
          if (cache[key]) {
            vnode.componentInstance = cache[key].componentInstance;
            // make current key freshest
            remove(keys, key);
            keys.push(key);
          } else {
            // delay setting the cache until update
            this.vnodeToCache = vnode;
            this.keyToCache = key;
          }

          vnode.data.keepAlive = true;
        }
        return vnode || (slot && slot[0])
      }
    };

    var builtInComponents = {
      KeepAlive: KeepAlive
    };

    /*  */

    function initGlobalAPI (Vue) {
      // config
      var configDef = {};
      configDef.get = function () { return config; };
      Object.defineProperty(Vue, 'config', configDef);

      // exposed util methods.
      // NOTE: these are not considered part of the public API - avoid relying on
      // them unless you are aware of the risk.
      Vue.util = {
        warn: warn,
        extend: extend,
        mergeOptions: mergeOptions,
        defineReactive: defineReactive$$1
      };

      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;

      // 2.6 explicit observable API
      Vue.observable = function (obj) {
        observe(obj);
        return obj
      };

      Vue.options = Object.create(null);
      ASSET_TYPES.forEach(function (type) {
        Vue.options[type + 's'] = Object.create(null);
      });

      // this is used to identify the "base" constructor to extend all plain-object
      // components with in Weex's multi-instance scenarios.
      Vue.options._base = Vue;

      extend(Vue.options.components, builtInComponents);

      initUse(Vue);
      initMixin$1(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
    }

    initGlobalAPI(Vue);

    Object.defineProperty(Vue.prototype, '$isServer', {
      get: isServerRendering
    });

    Object.defineProperty(Vue.prototype, '$ssrContext', {
      get: function get () {
        /* istanbul ignore next */
        return this.$vnode && this.$vnode.ssrContext
      }
    });

    // expose FunctionalRenderContext for ssr runtime helper installation
    Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
    });

    Vue.version = '2.6.14';

    /*  */

    // these are reserved for web because they are directly compiled away
    // during template compilation
    var isReservedAttr = makeMap('style,class');

    // attributes that should be using props for binding
    var acceptValue = makeMap('input,textarea,option,select,progress');
    var mustUseProp = function (tag, type, attr) {
      return (
        (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
        (attr === 'selected' && tag === 'option') ||
        (attr === 'checked' && tag === 'input') ||
        (attr === 'muted' && tag === 'video')
      )
    };

    var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

    var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

    var convertEnumeratedValue = function (key, value) {
      return isFalsyAttrValue(value) || value === 'false'
        ? 'false'
        // allow arbitrary string value for contenteditable
        : key === 'contenteditable' && isValidContentEditableValue(value)
          ? value
          : 'true'
    };

    var isBooleanAttr = makeMap(
      'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
      'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
      'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
      'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
      'required,reversed,scoped,seamless,selected,sortable,' +
      'truespeed,typemustmatch,visible'
    );

    var xlinkNS = 'http://www.w3.org/1999/xlink';

    var isXlink = function (name) {
      return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
    };

    var getXlinkProp = function (name) {
      return isXlink(name) ? name.slice(6, name.length) : ''
    };

    var isFalsyAttrValue = function (val) {
      return val == null || val === false
    };

    /*  */

    function genClassForVnode (vnode) {
      var data = vnode.data;
      var parentNode = vnode;
      var childNode = vnode;
      while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data) {
          data = mergeClassData(childNode.data, data);
        }
      }
      while (isDef(parentNode = parentNode.parent)) {
        if (parentNode && parentNode.data) {
          data = mergeClassData(data, parentNode.data);
        }
      }
      return renderClass(data.staticClass, data.class)
    }

    function mergeClassData (child, parent) {
      return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class)
          ? [child.class, parent.class]
          : parent.class
      }
    }

    function renderClass (
      staticClass,
      dynamicClass
    ) {
      if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass))
      }
      /* istanbul ignore next */
      return ''
    }

    function concat (a, b) {
      return a ? b ? (a + ' ' + b) : a : (b || '')
    }

    function stringifyClass (value) {
      if (Array.isArray(value)) {
        return stringifyArray(value)
      }
      if (isObject(value)) {
        return stringifyObject(value)
      }
      if (typeof value === 'string') {
        return value
      }
      /* istanbul ignore next */
      return ''
    }

    function stringifyArray (value) {
      var res = '';
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          if (res) { res += ' '; }
          res += stringified;
        }
      }
      return res
    }

    function stringifyObject (value) {
      var res = '';
      for (var key in value) {
        if (value[key]) {
          if (res) { res += ' '; }
          res += key;
        }
      }
      return res
    }

    /*  */

    var namespaceMap = {
      svg: 'http://www.w3.org/2000/svg',
      math: 'http://www.w3.org/1998/Math/MathML'
    };

    var isHTMLTag = makeMap(
      'html,body,base,head,link,meta,style,title,' +
      'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
      'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
      'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
      's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
      'embed,object,param,source,canvas,script,noscript,del,ins,' +
      'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
      'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
      'output,progress,select,textarea,' +
      'details,dialog,menu,menuitem,summary,' +
      'content,element,shadow,template,blockquote,iframe,tfoot'
    );

    // this map is intentionally selective, only covering SVG elements that may
    // contain child elements.
    var isSVG = makeMap(
      'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
      'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
      'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
      true
    );

    var isReservedTag = function (tag) {
      return isHTMLTag(tag) || isSVG(tag)
    };

    function getTagNamespace (tag) {
      if (isSVG(tag)) {
        return 'svg'
      }
      // basic support for MathML
      // note it doesn't support other MathML elements being component roots
      if (tag === 'math') {
        return 'math'
      }
    }

    var unknownElementCache = Object.create(null);
    function isUnknownElement (tag) {
      /* istanbul ignore if */
      if (!inBrowser) {
        return true
      }
      if (isReservedTag(tag)) {
        return false
      }
      tag = tag.toLowerCase();
      /* istanbul ignore if */
      if (unknownElementCache[tag] != null) {
        return unknownElementCache[tag]
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
        // http://stackoverflow.com/a/28210364/1070244
        return (unknownElementCache[tag] = (
          el.constructor === window.HTMLUnknownElement ||
          el.constructor === window.HTMLElement
        ))
      } else {
        return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
      }
    }

    var isTextInputType = makeMap('text,number,password,search,email,tel,url');

    /*  */

    /**
     * Query an element selector if it's not an element already.
     */
    function query (el) {
      if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
          return document.createElement('div')
        }
        return selected
      } else {
        return el
      }
    }

    /*  */

    function createElement$1 (tagName, vnode) {
      var elm = document.createElement(tagName);
      if (tagName !== 'select') {
        return elm
      }
      // false or null will remove the attribute but undefined will not
      if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple');
      }
      return elm
    }

    function createElementNS (namespace, tagName) {
      return document.createElementNS(namespaceMap[namespace], tagName)
    }

    function createTextNode (text) {
      return document.createTextNode(text)
    }

    function createComment (text) {
      return document.createComment(text)
    }

    function insertBefore (parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
    }

    function removeChild (node, child) {
      node.removeChild(child);
    }

    function appendChild (node, child) {
      node.appendChild(child);
    }

    function parentNode (node) {
      return node.parentNode
    }

    function nextSibling (node) {
      return node.nextSibling
    }

    function tagName (node) {
      return node.tagName
    }

    function setTextContent (node, text) {
      node.textContent = text;
    }

    function setStyleScope (node, scopeId) {
      node.setAttribute(scopeId, '');
    }

    var nodeOps = /*#__PURE__*/Object.freeze({
      createElement: createElement$1,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      setStyleScope: setStyleScope
    });

    /*  */

    var ref = {
      create: function create (_, vnode) {
        registerRef(vnode);
      },
      update: function update (oldVnode, vnode) {
        if (oldVnode.data.ref !== vnode.data.ref) {
          registerRef(oldVnode, true);
          registerRef(vnode);
        }
      },
      destroy: function destroy (vnode) {
        registerRef(vnode, true);
      }
    };

    function registerRef (vnode, isRemoval) {
      var key = vnode.data.ref;
      if (!isDef(key)) { return }

      var vm = vnode.context;
      var ref = vnode.componentInstance || vnode.elm;
      var refs = vm.$refs;
      if (isRemoval) {
        if (Array.isArray(refs[key])) {
          remove(refs[key], ref);
        } else if (refs[key] === ref) {
          refs[key] = undefined;
        }
      } else {
        if (vnode.data.refInFor) {
          if (!Array.isArray(refs[key])) {
            refs[key] = [ref];
          } else if (refs[key].indexOf(ref) < 0) {
            // $flow-disable-line
            refs[key].push(ref);
          }
        } else {
          refs[key] = ref;
        }
      }
    }

    /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/paldepind/snabbdom/blob/master/LICENSE
     *
     * modified by Evan You (@yyx990803)
     *
     * Not type-checking this because this file is perf-critical and the cost
     * of making flow understand it is not worth it.
     */

    var emptyNode = new VNode('', {}, []);

    var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

    function sameVnode (a, b) {
      return (
        a.key === b.key &&
        a.asyncFactory === b.asyncFactory && (
          (
            a.tag === b.tag &&
            a.isComment === b.isComment &&
            isDef(a.data) === isDef(b.data) &&
            sameInputType(a, b)
          ) || (
            isTrue(a.isAsyncPlaceholder) &&
            isUndef(b.asyncFactory.error)
          )
        )
      )
    }

    function sameInputType (a, b) {
      if (a.tag !== 'input') { return true }
      var i;
      var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
      var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
      return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
    }

    function createKeyToOldIdx (children, beginIdx, endIdx) {
      var i, key;
      var map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) { map[key] = i; }
      }
      return map
    }

    function createPatchFunction (backend) {
      var i, j;
      var cbs = {};

      var modules = backend.modules;
      var nodeOps = backend.nodeOps;

      for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
          if (isDef(modules[j][hooks[i]])) {
            cbs[hooks[i]].push(modules[j][hooks[i]]);
          }
        }
      }

      function emptyNodeAt (elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
      }

      function createRmCb (childElm, listeners) {
        function remove$$1 () {
          if (--remove$$1.listeners === 0) {
            removeNode(childElm);
          }
        }
        remove$$1.listeners = listeners;
        return remove$$1
      }

      function removeNode (el) {
        var parent = nodeOps.parentNode(el);
        // element may have already been removed due to v-html / v-text
        if (isDef(parent)) {
          nodeOps.removeChild(parent, el);
        }
      }

      function createElm (
        vnode,
        insertedVnodeQueue,
        parentElm,
        refElm,
        nested,
        ownerArray,
        index
      ) {
        if (isDef(vnode.elm) && isDef(ownerArray)) {
          // This vnode was used in a previous render!
          // now it's used as a new node, overwriting its elm would cause
          // potential patch errors down the road when it's used as an insertion
          // reference node. Instead, we clone the node on-demand before creating
          // associated DOM element for it.
          vnode = ownerArray[index] = cloneVNode(vnode);
        }

        vnode.isRootInsert = !nested; // for transition enter check
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
          return
        }

        var data = vnode.data;
        var children = vnode.children;
        var tag = vnode.tag;
        if (isDef(tag)) {

          vnode.elm = vnode.ns
            ? nodeOps.createElementNS(vnode.ns, tag)
            : nodeOps.createElement(tag, vnode);
          setScope(vnode);

          /* istanbul ignore if */
          {
            createChildren(vnode, children, insertedVnodeQueue);
            if (isDef(data)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
            }
            insert(parentElm, vnode.elm, refElm);
          }
        } else if (isTrue(vnode.isComment)) {
          vnode.elm = nodeOps.createComment(vnode.text);
          insert(parentElm, vnode.elm, refElm);
        } else {
          vnode.elm = nodeOps.createTextNode(vnode.text);
          insert(parentElm, vnode.elm, refElm);
        }
      }

      function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        var i = vnode.data;
        if (isDef(i)) {
          var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
          if (isDef(i = i.hook) && isDef(i = i.init)) {
            i(vnode, false /* hydrating */);
          }
          // after calling the init hook, if the vnode is a child component
          // it should've created a child instance and mounted it. the child
          // component also has set the placeholder vnode's elm.
          // in that case we can just return the element and be done.
          if (isDef(vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue);
            insert(parentElm, vnode.elm, refElm);
            if (isTrue(isReactivated)) {
              reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
            }
            return true
          }
        }
      }

      function initComponent (vnode, insertedVnodeQueue) {
        if (isDef(vnode.data.pendingInsert)) {
          insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
          vnode.data.pendingInsert = null;
        }
        vnode.elm = vnode.componentInstance.$el;
        if (isPatchable(vnode)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
          setScope(vnode);
        } else {
          // empty component root.
          // skip all element-related modules except for ref (#3455)
          registerRef(vnode);
          // make sure to invoke the insert hook
          insertedVnodeQueue.push(vnode);
        }
      }

      function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        var i;
        // hack for #4339: a reactivated component with inner transition
        // does not trigger because the inner node's created hooks are not called
        // again. It's not ideal to involve module-specific logic in here but
        // there doesn't seem to be a better way to do it.
        var innerNode = vnode;
        while (innerNode.componentInstance) {
          innerNode = innerNode.componentInstance._vnode;
          if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
            for (i = 0; i < cbs.activate.length; ++i) {
              cbs.activate[i](emptyNode, innerNode);
            }
            insertedVnodeQueue.push(innerNode);
            break
          }
        }
        // unlike a newly created component,
        // a reactivated keep-alive component doesn't insert itself
        insert(parentElm, vnode.elm, refElm);
      }

      function insert (parent, elm, ref$$1) {
        if (isDef(parent)) {
          if (isDef(ref$$1)) {
            if (nodeOps.parentNode(ref$$1) === parent) {
              nodeOps.insertBefore(parent, elm, ref$$1);
            }
          } else {
            nodeOps.appendChild(parent, elm);
          }
        }
      }

      function createChildren (vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
          }
        } else if (isPrimitive(vnode.text)) {
          nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
        }
      }

      function isPatchable (vnode) {
        while (vnode.componentInstance) {
          vnode = vnode.componentInstance._vnode;
        }
        return isDef(vnode.tag)
      }

      function invokeCreateHooks (vnode, insertedVnodeQueue) {
        for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
          cbs.create[i$1](emptyNode, vnode);
        }
        i = vnode.data.hook; // Reuse variable
        if (isDef(i)) {
          if (isDef(i.create)) { i.create(emptyNode, vnode); }
          if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
        }
      }

      // set scope id attribute for scoped CSS.
      // this is implemented as a special case to avoid the overhead
      // of going through the normal attribute patching process.
      function setScope (vnode) {
        var i;
        if (isDef(i = vnode.fnScopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        } else {
          var ancestor = vnode;
          while (ancestor) {
            if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
              nodeOps.setStyleScope(vnode.elm, i);
            }
            ancestor = ancestor.parent;
          }
        }
        // for slot content they should also get the scopeId from the host instance.
        if (isDef(i = activeInstance) &&
          i !== vnode.context &&
          i !== vnode.fnContext &&
          isDef(i = i.$options._scopeId)
        ) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
      }

      function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
          createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
        }
      }

      function invokeDestroyHook (vnode) {
        var i, j;
        var data = vnode.data;
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
          for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
        }
        if (isDef(i = vnode.children)) {
          for (j = 0; j < vnode.children.length; ++j) {
            invokeDestroyHook(vnode.children[j]);
          }
        }
      }

      function removeVnodes (vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
          var ch = vnodes[startIdx];
          if (isDef(ch)) {
            if (isDef(ch.tag)) {
              removeAndInvokeRemoveHook(ch);
              invokeDestroyHook(ch);
            } else { // Text node
              removeNode(ch.elm);
            }
          }
        }
      }

      function removeAndInvokeRemoveHook (vnode, rm) {
        if (isDef(rm) || isDef(vnode.data)) {
          var i;
          var listeners = cbs.remove.length + 1;
          if (isDef(rm)) {
            // we have a recursively passed down rm callback
            // increase the listeners count
            rm.listeners += listeners;
          } else {
            // directly removing
            rm = createRmCb(vnode.elm, listeners);
          }
          // recursively invoke hooks on child component root node
          if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
            removeAndInvokeRemoveHook(i, rm);
          }
          for (i = 0; i < cbs.remove.length; ++i) {
            cbs.remove[i](vnode, rm);
          }
          if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
            i(vnode, rm);
          } else {
            rm();
          }
        } else {
          removeNode(vnode.elm);
        }
      }

      function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        var oldStartIdx = 0;
        var newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        var canMove = !removeOnly;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
          } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
          } else {
            if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
            idxInOld = isDef(newStartVnode.key)
              ? oldKeyToIdx[newStartVnode.key]
              : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
            if (isUndef(idxInOld)) { // New element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            } else {
              vnodeToMove = oldCh[idxInOld];
              if (sameVnode(vnodeToMove, newStartVnode)) {
                patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                oldCh[idxInOld] = undefined;
                canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
              } else {
                // same key but different element. treat as new element
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
              }
            }
            newStartVnode = newCh[++newStartIdx];
          }
        }
        if (oldStartIdx > oldEndIdx) {
          refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
          addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
          removeVnodes(oldCh, oldStartIdx, oldEndIdx);
        }
      }

      function findIdxInOld (node, oldCh, start, end) {
        for (var i = start; i < end; i++) {
          var c = oldCh[i];
          if (isDef(c) && sameVnode(node, c)) { return i }
        }
      }

      function patchVnode (
        oldVnode,
        vnode,
        insertedVnodeQueue,
        ownerArray,
        index,
        removeOnly
      ) {
        if (oldVnode === vnode) {
          return
        }

        if (isDef(vnode.elm) && isDef(ownerArray)) {
          // clone reused vnode
          vnode = ownerArray[index] = cloneVNode(vnode);
        }

        var elm = vnode.elm = oldVnode.elm;

        if (isTrue(oldVnode.isAsyncPlaceholder)) {
          if (isDef(vnode.asyncFactory.resolved)) {
            hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
          } else {
            vnode.isAsyncPlaceholder = true;
          }
          return
        }

        // reuse element for static trees.
        // note we only do this if the vnode is cloned -
        // if the new node is not cloned it means the render functions have been
        // reset by the hot-reload-api and we need to do a proper re-render.
        if (isTrue(vnode.isStatic) &&
          isTrue(oldVnode.isStatic) &&
          vnode.key === oldVnode.key &&
          (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
        ) {
          vnode.componentInstance = oldVnode.componentInstance;
          return
        }

        var i;
        var data = vnode.data;
        if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
          i(oldVnode, vnode);
        }

        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (isDef(data) && isPatchable(vnode)) {
          for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
          if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
        }
        if (isUndef(vnode.text)) {
          if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
          } else if (isDef(oldCh)) {
            removeVnodes(oldCh, 0, oldCh.length - 1);
          } else if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '');
          }
        } else if (oldVnode.text !== vnode.text) {
          nodeOps.setTextContent(elm, vnode.text);
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
        }
      }

      function invokeInsertHook (vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) && isDef(vnode.parent)) {
          vnode.parent.data.pendingInsert = queue;
        } else {
          for (var i = 0; i < queue.length; ++i) {
            queue[i].data.hook.insert(queue[i]);
          }
        }
      }
      // list of modules that can skip create hook during hydration because they
      // are already rendered on the client or has no need for initialization
      // Note: style is excluded because it relies on initial clone for future
      // deep updates (#7063).
      var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

      // Note: this is a browser-only function so we can assume elms are DOM nodes.
      function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
        var i;
        var tag = vnode.tag;
        var data = vnode.data;
        var children = vnode.children;
        inVPre = inVPre || (data && data.pre);
        vnode.elm = elm;

        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
          vnode.isAsyncPlaceholder = true;
          return true
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
          if (isDef(i = vnode.componentInstance)) {
            // child component. it should have hydrated its own tree.
            initComponent(vnode, insertedVnodeQueue);
            return true
          }
        }
        if (isDef(tag)) {
          if (isDef(children)) {
            // empty element, allow client to pick up and populate children
            if (!elm.hasChildNodes()) {
              createChildren(vnode, children, insertedVnodeQueue);
            } else {
              // v-html and domProps: innerHTML
              if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
                if (i !== elm.innerHTML) {
                  return false
                }
              } else {
                // iterate and compare children lists
                var childrenMatch = true;
                var childNode = elm.firstChild;
                for (var i$1 = 0; i$1 < children.length; i$1++) {
                  if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                    childrenMatch = false;
                    break
                  }
                  childNode = childNode.nextSibling;
                }
                // if childNode is not null, it means the actual childNodes list is
                // longer than the virtual children list.
                if (!childrenMatch || childNode) {
                  return false
                }
              }
            }
          }
          if (isDef(data)) {
            var fullInvoke = false;
            for (var key in data) {
              if (!isRenderedModule(key)) {
                fullInvoke = true;
                invokeCreateHooks(vnode, insertedVnodeQueue);
                break
              }
            }
            if (!fullInvoke && data['class']) {
              // ensure collecting deps for deep class bindings for future updates
              traverse(data['class']);
            }
          }
        } else if (elm.data !== vnode.text) {
          elm.data = vnode.text;
        }
        return true
      }

      return function patch (oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) {
          if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
          return
        }

        var isInitialPatch = false;
        var insertedVnodeQueue = [];

        if (isUndef(oldVnode)) {
          // empty mount (likely as component), create new root element
          isInitialPatch = true;
          createElm(vnode, insertedVnodeQueue);
        } else {
          var isRealElement = isDef(oldVnode.nodeType);
          if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // patch existing root node
            patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
          } else {
            if (isRealElement) {
              // mounting to a real element
              // check if this is server-rendered content and if we can perform
              // a successful hydration.
              if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                oldVnode.removeAttribute(SSR_ATTR);
                hydrating = true;
              }
              if (isTrue(hydrating)) {
                if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                  invokeInsertHook(vnode, insertedVnodeQueue, true);
                  return oldVnode
                }
              }
              // either not server-rendered, or hydration failed.
              // create an empty node and replace it
              oldVnode = emptyNodeAt(oldVnode);
            }

            // replacing existing element
            var oldElm = oldVnode.elm;
            var parentElm = nodeOps.parentNode(oldElm);

            // create new node
            createElm(
              vnode,
              insertedVnodeQueue,
              // extremely rare edge case: do not insert if old element is in a
              // leaving transition. Only happens when combining transition +
              // keep-alive + HOCs. (#4590)
              oldElm._leaveCb ? null : parentElm,
              nodeOps.nextSibling(oldElm)
            );

            // update parent placeholder node element, recursively
            if (isDef(vnode.parent)) {
              var ancestor = vnode.parent;
              var patchable = isPatchable(vnode);
              while (ancestor) {
                for (var i = 0; i < cbs.destroy.length; ++i) {
                  cbs.destroy[i](ancestor);
                }
                ancestor.elm = vnode.elm;
                if (patchable) {
                  for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                    cbs.create[i$1](emptyNode, ancestor);
                  }
                  // #6513
                  // invoke insert hooks that may have been merged by create hooks.
                  // e.g. for directives that uses the "inserted" hook.
                  var insert = ancestor.data.hook.insert;
                  if (insert.merged) {
                    // start at index 1 to avoid re-invoking component mounted hook
                    for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                      insert.fns[i$2]();
                    }
                  }
                } else {
                  registerRef(ancestor);
                }
                ancestor = ancestor.parent;
              }
            }

            // destroy old node
            if (isDef(parentElm)) {
              removeVnodes([oldVnode], 0, 0);
            } else if (isDef(oldVnode.tag)) {
              invokeDestroyHook(oldVnode);
            }
          }
        }

        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm
      }
    }

    /*  */

    var directives = {
      create: updateDirectives,
      update: updateDirectives,
      destroy: function unbindDirectives (vnode) {
        updateDirectives(vnode, emptyNode);
      }
    };

    function updateDirectives (oldVnode, vnode) {
      if (oldVnode.data.directives || vnode.data.directives) {
        _update(oldVnode, vnode);
      }
    }

    function _update (oldVnode, vnode) {
      var isCreate = oldVnode === emptyNode;
      var isDestroy = vnode === emptyNode;
      var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
      var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

      var dirsWithInsert = [];
      var dirsWithPostpatch = [];

      var key, oldDir, dir;
      for (key in newDirs) {
        oldDir = oldDirs[key];
        dir = newDirs[key];
        if (!oldDir) {
          // new directive, bind
          callHook$1(dir, 'bind', vnode, oldVnode);
          if (dir.def && dir.def.inserted) {
            dirsWithInsert.push(dir);
          }
        } else {
          // existing directive, update
          dir.oldValue = oldDir.value;
          dir.oldArg = oldDir.arg;
          callHook$1(dir, 'update', vnode, oldVnode);
          if (dir.def && dir.def.componentUpdated) {
            dirsWithPostpatch.push(dir);
          }
        }
      }

      if (dirsWithInsert.length) {
        var callInsert = function () {
          for (var i = 0; i < dirsWithInsert.length; i++) {
            callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
          }
        };
        if (isCreate) {
          mergeVNodeHook(vnode, 'insert', callInsert);
        } else {
          callInsert();
        }
      }

      if (dirsWithPostpatch.length) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          for (var i = 0; i < dirsWithPostpatch.length; i++) {
            callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
          }
        });
      }

      if (!isCreate) {
        for (key in oldDirs) {
          if (!newDirs[key]) {
            // no longer present, unbind
            callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
          }
        }
      }
    }

    var emptyModifiers = Object.create(null);

    function normalizeDirectives$1 (
      dirs,
      vm
    ) {
      var res = Object.create(null);
      if (!dirs) {
        // $flow-disable-line
        return res
      }
      var i, dir;
      for (i = 0; i < dirs.length; i++) {
        dir = dirs[i];
        if (!dir.modifiers) {
          // $flow-disable-line
          dir.modifiers = emptyModifiers;
        }
        res[getRawDirName(dir)] = dir;
        dir.def = resolveAsset(vm.$options, 'directives', dir.name);
      }
      // $flow-disable-line
      return res
    }

    function getRawDirName (dir) {
      return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
    }

    function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
      var fn = dir.def && dir.def[hook];
      if (fn) {
        try {
          fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
        } catch (e) {
          handleError$1(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
        }
      }
    }

    var baseModules = [
      ref,
      directives
    ];

    /*  */

    function updateAttrs (oldVnode, vnode) {
      var opts = vnode.componentOptions;
      if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
        return
      }
      if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
        return
      }
      var key, cur, old;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs || {};
      var attrs = vnode.data.attrs || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(attrs.__ob__)) {
        attrs = vnode.data.attrs = extend({}, attrs);
      }

      for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
          setAttr(elm, key, cur, vnode.data.pre);
        }
      }
      // #4391: in IE9, setting type can reset value for input[type=radio]
      // #6666: IE/Edge forces progress value down to 1 before setting a max
      /* istanbul ignore if */
      if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
        setAttr(elm, 'value', attrs.value);
      }
      for (key in oldAttrs) {
        if (isUndef(attrs[key])) {
          if (isXlink(key)) {
            elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
          } else if (!isEnumeratedAttr(key)) {
            elm.removeAttribute(key);
          }
        }
      }
    }

    function setAttr (el, key, value, isInPre) {
      if (isInPre || el.tagName.indexOf('-') > -1) {
        baseSetAttr(el, key, value);
      } else if (isBooleanAttr(key)) {
        // set attribute for blank value
        // e.g. <option disabled>Select one</option>
        if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
        } else {
          // technically allowfullscreen is a boolean attribute for <iframe>,
          // but Flash expects a value of "true" when used on <embed> tag
          value = key === 'allowfullscreen' && el.tagName === 'EMBED'
            ? 'true'
            : key;
          el.setAttribute(key, value);
        }
      } else if (isEnumeratedAttr(key)) {
        el.setAttribute(key, convertEnumeratedValue(key, value));
      } else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
          el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else {
          el.setAttributeNS(xlinkNS, key, value);
        }
      } else {
        baseSetAttr(el, key, value);
      }
    }

    function baseSetAttr (el, key, value) {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // #7138: IE10 & 11 fires input event when setting placeholder on
        // <textarea>... block the first input event and remove the blocker
        // immediately.
        /* istanbul ignore if */
        if (
          isIE && !isIE9 &&
          el.tagName === 'TEXTAREA' &&
          key === 'placeholder' && value !== '' && !el.__ieph
        ) {
          var blocker = function (e) {
            e.stopImmediatePropagation();
            el.removeEventListener('input', blocker);
          };
          el.addEventListener('input', blocker);
          // $flow-disable-line
          el.__ieph = true; /* IE placeholder patched */
        }
        el.setAttribute(key, value);
      }
    }

    var attrs = {
      create: updateAttrs,
      update: updateAttrs
    };

    /*  */

    function updateClass (oldVnode, vnode) {
      var el = vnode.elm;
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (
        isUndef(data.staticClass) &&
        isUndef(data.class) && (
          isUndef(oldData) || (
            isUndef(oldData.staticClass) &&
            isUndef(oldData.class)
          )
        )
      ) {
        return
      }

      var cls = genClassForVnode(vnode);

      // handle transition classes
      var transitionClass = el._transitionClasses;
      if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
      }

      // set the class
      if (cls !== el._prevClass) {
        el.setAttribute('class', cls);
        el._prevClass = cls;
      }
    }

    var klass = {
      create: updateClass,
      update: updateClass
    };

    /*  */

    /*  */

    /*  */

    /*  */

    // in some cases, the event used has to be determined at runtime
    // so we used some reserved tokens during compile.
    var RANGE_TOKEN = '__r';
    var CHECKBOX_RADIO_TOKEN = '__c';

    /*  */

    // normalize v-model event tokens that can only be determined at runtime.
    // it's important to place the event as the first in the array because
    // the whole point is ensuring the v-model callback gets called before
    // user-attached handlers.
    function normalizeEvents (on) {
      /* istanbul ignore if */
      if (isDef(on[RANGE_TOKEN])) {
        // IE input[type=range] only supports `change` event
        var event = isIE ? 'change' : 'input';
        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
        delete on[RANGE_TOKEN];
      }
      // This was originally intended to fix #4521 but no longer necessary
      // after 2.5. Keeping it for backwards compat with generated code from < 2.4
      /* istanbul ignore if */
      if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
        delete on[CHECKBOX_RADIO_TOKEN];
      }
    }

    var target$1;

    function createOnceHandler$1 (event, handler, capture) {
      var _target = target$1; // save current target element in closure
      return function onceHandler () {
        var res = handler.apply(null, arguments);
        if (res !== null) {
          remove$2(event, onceHandler, capture, _target);
        }
      }
    }

    // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
    // implementation and does not fire microtasks in between event propagation, so
    // safe to exclude.
    var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

    function add$1 (
      name,
      handler,
      capture,
      passive
    ) {
      // async edge case #6566: inner click event triggers patch, event handler
      // attached to outer element during patch, and triggered again. This
      // happens because browsers fire microtask ticks between event propagation.
      // the solution is simple: we save the timestamp when a handler is attached,
      // and the handler would only fire if the event passed to it was fired
      // AFTER it was attached.
      if (useMicrotaskFix) {
        var attachedTimestamp = currentFlushTimestamp;
        var original = handler;
        handler = original._wrapper = function (e) {
          if (
            // no bubbling, should always fire.
            // this is just a safety net in case event.timeStamp is unreliable in
            // certain weird environments...
            e.target === e.currentTarget ||
            // event is fired after handler attachment
            e.timeStamp >= attachedTimestamp ||
            // bail for environments that have buggy event.timeStamp implementations
            // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
            // #9681 QtWebEngine event.timeStamp is negative value
            e.timeStamp <= 0 ||
            // #9448 bail if event is fired in another document in a multi-page
            // electron/nw.js app, since event.timeStamp will be using a different
            // starting reference
            e.target.ownerDocument !== document
          ) {
            return original.apply(this, arguments)
          }
        };
      }
      target$1.addEventListener(
        name,
        handler,
        supportsPassive
          ? { capture: capture, passive: passive }
          : capture
      );
    }

    function remove$2 (
      name,
      handler,
      capture,
      _target
    ) {
      (_target || target$1).removeEventListener(
        name,
        handler._wrapper || handler,
        capture
      );
    }

    function updateDOMListeners (oldVnode, vnode) {
      if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
        return
      }
      var on = vnode.data.on || {};
      var oldOn = oldVnode.data.on || {};
      target$1 = vnode.elm;
      normalizeEvents(on);
      updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
      target$1 = undefined;
    }

    var events = {
      create: updateDOMListeners,
      update: updateDOMListeners
    };

    /*  */

    var svgContainer;

    function updateDOMProps (oldVnode, vnode) {
      if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
        return
      }
      var key, cur;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(props.__ob__)) {
        props = vnode.data.domProps = extend({}, props);
      }

      for (key in oldProps) {
        if (!(key in props)) {
          elm[key] = '';
        }
      }

      for (key in props) {
        cur = props[key];
        // ignore children if the node has textContent or innerHTML,
        // as these will throw away existing DOM nodes and cause removal errors
        // on subsequent patches (#3360)
        if (key === 'textContent' || key === 'innerHTML') {
          if (vnode.children) { vnode.children.length = 0; }
          if (cur === oldProps[key]) { continue }
          // #6601 work around Chrome version <= 55 bug where single textNode
          // replaced by innerHTML/textContent retains its parentNode property
          if (elm.childNodes.length === 1) {
            elm.removeChild(elm.childNodes[0]);
          }
        }

        if (key === 'value' && elm.tagName !== 'PROGRESS') {
          // store value as _value as well since
          // non-string values will be stringified
          elm._value = cur;
          // avoid resetting cursor position when value is the same
          var strCur = isUndef(cur) ? '' : String(cur);
          if (shouldUpdateValue(elm, strCur)) {
            elm.value = strCur;
          }
        } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
          // IE doesn't support innerHTML for SVG elements
          svgContainer = svgContainer || document.createElement('div');
          svgContainer.innerHTML = "<svg>" + cur + "</svg>";
          var svg = svgContainer.firstChild;
          while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
          }
          while (svg.firstChild) {
            elm.appendChild(svg.firstChild);
          }
        } else if (
          // skip the update if old and new VDOM state is the same.
          // `value` is handled separately because the DOM value may be temporarily
          // out of sync with VDOM state due to focus, composition and modifiers.
          // This  #4521 by skipping the unnecessary `checked` update.
          cur !== oldProps[key]
        ) {
          // some property updates can throw
          // e.g. `value` on <progress> w/ non-finite value
          try {
            elm[key] = cur;
          } catch (e) {}
        }
      }
    }

    // check platforms/web/util/attrs.js acceptValue


    function shouldUpdateValue (elm, checkVal) {
      return (!elm.composing && (
        elm.tagName === 'OPTION' ||
        isNotInFocusAndDirty(elm, checkVal) ||
        isDirtyWithModifiers(elm, checkVal)
      ))
    }

    function isNotInFocusAndDirty (elm, checkVal) {
      // return true when textbox (.number and .trim) loses focus and its value is
      // not equal to the updated value
      var notInFocus = true;
      // #6157
      // work around IE bug when accessing document.activeElement in an iframe
      try { notInFocus = document.activeElement !== elm; } catch (e) {}
      return notInFocus && elm.value !== checkVal
    }

    function isDirtyWithModifiers (elm, newVal) {
      var value = elm.value;
      var modifiers = elm._vModifiers; // injected by v-model runtime
      if (isDef(modifiers)) {
        if (modifiers.number) {
          return toNumber(value) !== toNumber(newVal)
        }
        if (modifiers.trim) {
          return value.trim() !== newVal.trim()
        }
      }
      return value !== newVal
    }

    var domProps = {
      create: updateDOMProps,
      update: updateDOMProps
    };

    /*  */

    var parseStyleText = cached(function (cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
          var tmp = item.split(propertyDelimiter);
          tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return res
    });

    // merge static and dynamic style data on the same vnode
    function normalizeStyleData (data) {
      var style = normalizeStyleBinding(data.style);
      // static style is pre-processed into an object during compilation
      // and is always a fresh object, so it's safe to merge into it
      return data.staticStyle
        ? extend(data.staticStyle, style)
        : style
    }

    // normalize possible array / string values into Object
    function normalizeStyleBinding (bindingStyle) {
      if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle)
      }
      if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle)
      }
      return bindingStyle
    }

    /**
     * parent component style should be after child's
     * so that parent component's style could override it
     */
    function getStyle (vnode, checkChild) {
      var res = {};
      var styleData;

      if (checkChild) {
        var childNode = vnode;
        while (childNode.componentInstance) {
          childNode = childNode.componentInstance._vnode;
          if (
            childNode && childNode.data &&
            (styleData = normalizeStyleData(childNode.data))
          ) {
            extend(res, styleData);
          }
        }
      }

      if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData);
      }

      var parentNode = vnode;
      while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
          extend(res, styleData);
        }
      }
      return res
    }

    /*  */

    var cssVarRE = /^--/;
    var importantRE = /\s*!important$/;
    var setProp = function (el, name, val) {
      /* istanbul ignore if */
      if (cssVarRE.test(name)) {
        el.style.setProperty(name, val);
      } else if (importantRE.test(val)) {
        el.style.setProperty(hyphenate$1(name), val.replace(importantRE, ''), 'important');
      } else {
        var normalizedName = normalize(name);
        if (Array.isArray(val)) {
          // Support values array created by autoprefixer, e.g.
          // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
          // Set them one by one, and the browser will only set those it can recognize
          for (var i = 0, len = val.length; i < len; i++) {
            el.style[normalizedName] = val[i];
          }
        } else {
          el.style[normalizedName] = val;
        }
      }
    };

    var vendorNames = ['Webkit', 'Moz', 'ms'];

    var emptyStyle;
    var normalize = cached(function (prop) {
      emptyStyle = emptyStyle || document.createElement('div').style;
      prop = camelize$1(prop);
      if (prop !== 'filter' && (prop in emptyStyle)) {
        return prop
      }
      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = 0; i < vendorNames.length; i++) {
        var name = vendorNames[i] + capName;
        if (name in emptyStyle) {
          return name
        }
      }
    });

    function updateStyle (oldVnode, vnode) {
      var data = vnode.data;
      var oldData = oldVnode.data;

      if (isUndef(data.staticStyle) && isUndef(data.style) &&
        isUndef(oldData.staticStyle) && isUndef(oldData.style)
      ) {
        return
      }

      var cur, name;
      var el = vnode.elm;
      var oldStaticStyle = oldData.staticStyle;
      var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

      // if static style exists, stylebinding already merged into it when doing normalizeStyleData
      var oldStyle = oldStaticStyle || oldStyleBinding;

      var style = normalizeStyleBinding(vnode.data.style) || {};

      // store normalized style under a different key for next diff
      // make sure to clone it if it's reactive, since the user likely wants
      // to mutate it.
      vnode.data.normalizedStyle = isDef(style.__ob__)
        ? extend({}, style)
        : style;

      var newStyle = getStyle(vnode, true);

      for (name in oldStyle) {
        if (isUndef(newStyle[name])) {
          setProp(el, name, '');
        }
      }
      for (name in newStyle) {
        cur = newStyle[name];
        if (cur !== oldStyle[name]) {
          // ie9 setting to null has no effect, must use empty string
          setProp(el, name, cur == null ? '' : cur);
        }
      }
    }

    var style = {
      create: updateStyle,
      update: updateStyle
    };

    /*  */

    var whitespaceRE = /\s+/;

    /**
     * Add class with compatibility for SVG since classList is not supported on
     * SVG elements in IE
     */
    function addClass (el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
        return
      }

      /* istanbul ignore else */
      if (el.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
        } else {
          el.classList.add(cls);
        }
      } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        if (cur.indexOf(' ' + cls + ' ') < 0) {
          el.setAttribute('class', (cur + cls).trim());
        }
      }
    }

    /**
     * Remove class with compatibility for SVG since classList is not supported on
     * SVG elements in IE
     */
    function removeClass (el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
        return
      }

      /* istanbul ignore else */
      if (el.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
        } else {
          el.classList.remove(cls);
        }
        if (!el.classList.length) {
          el.removeAttribute('class');
        }
      } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        var tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
          cur = cur.replace(tar, ' ');
        }
        cur = cur.trim();
        if (cur) {
          el.setAttribute('class', cur);
        } else {
          el.removeAttribute('class');
        }
      }
    }

    /*  */

    function resolveTransition (def$$1) {
      if (!def$$1) {
        return
      }
      /* istanbul ignore else */
      if (typeof def$$1 === 'object') {
        var res = {};
        if (def$$1.css !== false) {
          extend(res, autoCssTransition(def$$1.name || 'v'));
        }
        extend(res, def$$1);
        return res
      } else if (typeof def$$1 === 'string') {
        return autoCssTransition(def$$1)
      }
    }

    var autoCssTransition = cached(function (name) {
      return {
        enterClass: (name + "-enter"),
        enterToClass: (name + "-enter-to"),
        enterActiveClass: (name + "-enter-active"),
        leaveClass: (name + "-leave"),
        leaveToClass: (name + "-leave-to"),
        leaveActiveClass: (name + "-leave-active")
      }
    });

    var hasTransition = inBrowser && !isIE9;
    var TRANSITION = 'transition';
    var ANIMATION = 'animation';

    // Transition property/event sniffing
    var transitionProp = 'transition';
    var transitionEndEvent = 'transitionend';
    var animationProp = 'animation';
    var animationEndEvent = 'animationend';
    if (hasTransition) {
      /* istanbul ignore if */
      if (window.ontransitionend === undefined &&
        window.onwebkittransitionend !== undefined
      ) {
        transitionProp = 'WebkitTransition';
        transitionEndEvent = 'webkitTransitionEnd';
      }
      if (window.onanimationend === undefined &&
        window.onwebkitanimationend !== undefined
      ) {
        animationProp = 'WebkitAnimation';
        animationEndEvent = 'webkitAnimationEnd';
      }
    }

    // binding to window is necessary to make hot reload work in IE in strict mode
    var raf = inBrowser
      ? window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : setTimeout
      : /* istanbul ignore next */ function (fn) { return fn(); };

    function nextFrame (fn) {
      raf(function () {
        raf(fn);
      });
    }

    function addTransitionClass (el, cls) {
      var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
      if (transitionClasses.indexOf(cls) < 0) {
        transitionClasses.push(cls);
        addClass(el, cls);
      }
    }

    function removeTransitionClass (el, cls) {
      if (el._transitionClasses) {
        remove(el._transitionClasses, cls);
      }
      removeClass(el, cls);
    }

    function whenTransitionEnds (
      el,
      expectedType,
      cb
    ) {
      var ref = getTransitionInfo(el, expectedType);
      var type = ref.type;
      var timeout = ref.timeout;
      var propCount = ref.propCount;
      if (!type) { return cb() }
      var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function () {
        el.removeEventListener(event, onEnd);
        cb();
      };
      var onEnd = function (e) {
        if (e.target === el) {
          if (++ended >= propCount) {
            end();
          }
        }
      };
      setTimeout(function () {
        if (ended < propCount) {
          end();
        }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
    }

    var transformRE = /\b(transform|all)(,|$)/;

    function getTransitionInfo (el, expectedType) {
      var styles = window.getComputedStyle(el);
      // JSDOM may return undefined for transition properties
      var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
      var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
      var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
      var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
      var animationTimeout = getTimeout(animationDelays, animationDurations);

      var type;
      var timeout = 0;
      var propCount = 0;
      /* istanbul ignore if */
      if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
          type = TRANSITION;
          timeout = transitionTimeout;
          propCount = transitionDurations.length;
        }
      } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
          type = ANIMATION;
          timeout = animationTimeout;
          propCount = animationDurations.length;
        }
      } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type = timeout > 0
          ? transitionTimeout > animationTimeout
            ? TRANSITION
            : ANIMATION
          : null;
        propCount = type
          ? type === TRANSITION
            ? transitionDurations.length
            : animationDurations.length
          : 0;
      }
      var hasTransform =
        type === TRANSITION &&
        transformRE.test(styles[transitionProp + 'Property']);
      return {
        type: type,
        timeout: timeout,
        propCount: propCount,
        hasTransform: hasTransform
      }
    }

    function getTimeout (delays, durations) {
      /* istanbul ignore next */
      while (delays.length < durations.length) {
        delays = delays.concat(delays);
      }

      return Math.max.apply(null, durations.map(function (d, i) {
        return toMs(d) + toMs(delays[i])
      }))
    }

    // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
    // in a locale-dependent way, using a comma instead of a dot.
    // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
    // as a floor function) causing unexpected behaviors
    function toMs (s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000
    }

    /*  */

    function enter (vnode, toggleDisplay) {
      var el = vnode.elm;

      // call leave callback now
      if (isDef(el._leaveCb)) {
        el._leaveCb.cancelled = true;
        el._leaveCb();
      }

      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
        return
      }

      /* istanbul ignore if */
      if (isDef(el._enterCb) || el.nodeType !== 1) {
        return
      }

      var css = data.css;
      var type = data.type;
      var enterClass = data.enterClass;
      var enterToClass = data.enterToClass;
      var enterActiveClass = data.enterActiveClass;
      var appearClass = data.appearClass;
      var appearToClass = data.appearToClass;
      var appearActiveClass = data.appearActiveClass;
      var beforeEnter = data.beforeEnter;
      var enter = data.enter;
      var afterEnter = data.afterEnter;
      var enterCancelled = data.enterCancelled;
      var beforeAppear = data.beforeAppear;
      var appear = data.appear;
      var afterAppear = data.afterAppear;
      var appearCancelled = data.appearCancelled;
      var duration = data.duration;

      // activeInstance will always be the <transition> component managing this
      // transition. One edge case to check is when the <transition> is placed
      // as the root node of a child component. In that case we need to check
      // <transition>'s parent for appear check.
      var context = activeInstance;
      var transitionNode = activeInstance.$vnode;
      while (transitionNode && transitionNode.parent) {
        context = transitionNode.context;
        transitionNode = transitionNode.parent;
      }

      var isAppear = !context._isMounted || !vnode.isRootInsert;

      if (isAppear && !appear && appear !== '') {
        return
      }

      var startClass = isAppear && appearClass
        ? appearClass
        : enterClass;
      var activeClass = isAppear && appearActiveClass
        ? appearActiveClass
        : enterActiveClass;
      var toClass = isAppear && appearToClass
        ? appearToClass
        : enterToClass;

      var beforeEnterHook = isAppear
        ? (beforeAppear || beforeEnter)
        : beforeEnter;
      var enterHook = isAppear
        ? (typeof appear === 'function' ? appear : enter)
        : enter;
      var afterEnterHook = isAppear
        ? (afterAppear || afterEnter)
        : afterEnter;
      var enterCancelledHook = isAppear
        ? (appearCancelled || enterCancelled)
        : enterCancelled;

      var explicitEnterDuration = toNumber(
        isObject(duration)
          ? duration.enter
          : duration
      );

      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(enterHook);

      var cb = el._enterCb = once(function () {
        if (expectsCSS) {
          removeTransitionClass(el, toClass);
          removeTransitionClass(el, activeClass);
        }
        if (cb.cancelled) {
          if (expectsCSS) {
            removeTransitionClass(el, startClass);
          }
          enterCancelledHook && enterCancelledHook(el);
        } else {
          afterEnterHook && afterEnterHook(el);
        }
        el._enterCb = null;
      });

      if (!vnode.data.show) {
        // remove pending leave element on enter by injecting an insert hook
        mergeVNodeHook(vnode, 'insert', function () {
          var parent = el.parentNode;
          var pendingNode = parent && parent._pending && parent._pending[vnode.key];
          if (pendingNode &&
            pendingNode.tag === vnode.tag &&
            pendingNode.elm._leaveCb
          ) {
            pendingNode.elm._leaveCb();
          }
          enterHook && enterHook(el, cb);
        });
      }

      // start enter transition
      beforeEnterHook && beforeEnterHook(el);
      if (expectsCSS) {
        addTransitionClass(el, startClass);
        addTransitionClass(el, activeClass);
        nextFrame(function () {
          removeTransitionClass(el, startClass);
          if (!cb.cancelled) {
            addTransitionClass(el, toClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitEnterDuration)) {
                setTimeout(cb, explicitEnterDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }

      if (vnode.data.show) {
        toggleDisplay && toggleDisplay();
        enterHook && enterHook(el, cb);
      }

      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }

    function leave (vnode, rm) {
      var el = vnode.elm;

      // call enter callback now
      if (isDef(el._enterCb)) {
        el._enterCb.cancelled = true;
        el._enterCb();
      }

      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data) || el.nodeType !== 1) {
        return rm()
      }

      /* istanbul ignore if */
      if (isDef(el._leaveCb)) {
        return
      }

      var css = data.css;
      var type = data.type;
      var leaveClass = data.leaveClass;
      var leaveToClass = data.leaveToClass;
      var leaveActiveClass = data.leaveActiveClass;
      var beforeLeave = data.beforeLeave;
      var leave = data.leave;
      var afterLeave = data.afterLeave;
      var leaveCancelled = data.leaveCancelled;
      var delayLeave = data.delayLeave;
      var duration = data.duration;

      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(leave);

      var explicitLeaveDuration = toNumber(
        isObject(duration)
          ? duration.leave
          : duration
      );

      var cb = el._leaveCb = once(function () {
        if (el.parentNode && el.parentNode._pending) {
          el.parentNode._pending[vnode.key] = null;
        }
        if (expectsCSS) {
          removeTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveActiveClass);
        }
        if (cb.cancelled) {
          if (expectsCSS) {
            removeTransitionClass(el, leaveClass);
          }
          leaveCancelled && leaveCancelled(el);
        } else {
          rm();
          afterLeave && afterLeave(el);
        }
        el._leaveCb = null;
      });

      if (delayLeave) {
        delayLeave(performLeave);
      } else {
        performLeave();
      }

      function performLeave () {
        // the delayed leave may have already been cancelled
        if (cb.cancelled) {
          return
        }
        // record leaving element
        if (!vnode.data.show && el.parentNode) {
          (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
        }
        beforeLeave && beforeLeave(el);
        if (expectsCSS) {
          addTransitionClass(el, leaveClass);
          addTransitionClass(el, leaveActiveClass);
          nextFrame(function () {
            removeTransitionClass(el, leaveClass);
            if (!cb.cancelled) {
              addTransitionClass(el, leaveToClass);
              if (!userWantsControl) {
                if (isValidDuration(explicitLeaveDuration)) {
                  setTimeout(cb, explicitLeaveDuration);
                } else {
                  whenTransitionEnds(el, type, cb);
                }
              }
            }
          });
        }
        leave && leave(el, cb);
        if (!expectsCSS && !userWantsControl) {
          cb();
        }
      }
    }

    function isValidDuration (val) {
      return typeof val === 'number' && !isNaN(val)
    }

    /**
     * Normalize a transition hook's argument length. The hook may be:
     * - a merged hook (invoker) with the original in .fns
     * - a wrapped component method (check ._length)
     * - a plain function (.length)
     */
    function getHookArgumentsLength (fn) {
      if (isUndef(fn)) {
        return false
      }
      var invokerFns = fn.fns;
      if (isDef(invokerFns)) {
        // invoker
        return getHookArgumentsLength(
          Array.isArray(invokerFns)
            ? invokerFns[0]
            : invokerFns
        )
      } else {
        return (fn._length || fn.length) > 1
      }
    }

    function _enter (_, vnode) {
      if (vnode.data.show !== true) {
        enter(vnode);
      }
    }

    var transition = inBrowser ? {
      create: _enter,
      activate: _enter,
      remove: function remove$$1 (vnode, rm) {
        /* istanbul ignore else */
        if (vnode.data.show !== true) {
          leave(vnode, rm);
        } else {
          rm();
        }
      }
    } : {};

    var platformModules = [
      attrs,
      klass,
      events,
      domProps,
      style,
      transition
    ];

    /*  */

    // the directive module should be applied last, after all
    // built-in modules have been applied.
    var modules = platformModules.concat(baseModules);

    var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

    /**
     * Not type checking this file because flow doesn't like attaching
     * properties to Elements.
     */

    /* istanbul ignore if */
    if (isIE9) {
      // http://www.matts411.com/post/internet-explorer-9-oninput/
      document.addEventListener('selectionchange', function () {
        var el = document.activeElement;
        if (el && el.vmodel) {
          trigger(el, 'input');
        }
      });
    }

    var directive = {
      inserted: function inserted (el, binding, vnode, oldVnode) {
        if (vnode.tag === 'select') {
          // #6903
          if (oldVnode.elm && !oldVnode.elm._vOptions) {
            mergeVNodeHook(vnode, 'postpatch', function () {
              directive.componentUpdated(el, binding, vnode);
            });
          } else {
            setSelected(el, binding, vnode.context);
          }
          el._vOptions = [].map.call(el.options, getValue);
        } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
          el._vModifiers = binding.modifiers;
          if (!binding.modifiers.lazy) {
            el.addEventListener('compositionstart', onCompositionStart);
            el.addEventListener('compositionend', onCompositionEnd);
            // Safari < 10.2 & UIWebView doesn't fire compositionend when
            // switching focus before confirming composition choice
            // this also fixes the issue where some browsers e.g. iOS Chrome
            // fires "change" instead of "input" on autocomplete.
            el.addEventListener('change', onCompositionEnd);
            /* istanbul ignore if */
            if (isIE9) {
              el.vmodel = true;
            }
          }
        }
      },

      componentUpdated: function componentUpdated (el, binding, vnode) {
        if (vnode.tag === 'select') {
          setSelected(el, binding, vnode.context);
          // in case the options rendered by v-for have changed,
          // it's possible that the value is out-of-sync with the rendered options.
          // detect such cases and filter out values that no longer has a matching
          // option in the DOM.
          var prevOptions = el._vOptions;
          var curOptions = el._vOptions = [].map.call(el.options, getValue);
          if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
            // trigger change event if
            // no matching option found for at least one value
            var needReset = el.multiple
              ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
              : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
            if (needReset) {
              trigger(el, 'change');
            }
          }
        }
      }
    };

    function setSelected (el, binding, vm) {
      actuallySetSelected(el, binding);
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(function () {
          actuallySetSelected(el, binding);
        }, 0);
      }
    }

    function actuallySetSelected (el, binding, vm) {
      var value = binding.value;
      var isMultiple = el.multiple;
      if (isMultiple && !Array.isArray(value)) {
        return
      }
      var selected, option;
      for (var i = 0, l = el.options.length; i < l; i++) {
        option = el.options[i];
        if (isMultiple) {
          selected = looseIndexOf(value, getValue(option)) > -1;
          if (option.selected !== selected) {
            option.selected = selected;
          }
        } else {
          if (looseEqual(getValue(option), value)) {
            if (el.selectedIndex !== i) {
              el.selectedIndex = i;
            }
            return
          }
        }
      }
      if (!isMultiple) {
        el.selectedIndex = -1;
      }
    }

    function hasNoMatchingOption (value, options) {
      return options.every(function (o) { return !looseEqual(o, value); })
    }

    function getValue (option) {
      return '_value' in option
        ? option._value
        : option.value
    }

    function onCompositionStart (e) {
      e.target.composing = true;
    }

    function onCompositionEnd (e) {
      // prevent triggering an input event for no reason
      if (!e.target.composing) { return }
      e.target.composing = false;
      trigger(e.target, 'input');
    }

    function trigger (el, type) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, true, true);
      el.dispatchEvent(e);
    }

    /*  */

    // recursively search for possible transition defined inside the component root
    function locateNode (vnode) {
      return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
        ? locateNode(vnode.componentInstance._vnode)
        : vnode
    }

    var show = {
      bind: function bind (el, ref, vnode) {
        var value = ref.value;

        vnode = locateNode(vnode);
        var transition$$1 = vnode.data && vnode.data.transition;
        var originalDisplay = el.__vOriginalDisplay =
          el.style.display === 'none' ? '' : el.style.display;
        if (value && transition$$1) {
          vnode.data.show = true;
          enter(vnode, function () {
            el.style.display = originalDisplay;
          });
        } else {
          el.style.display = value ? originalDisplay : 'none';
        }
      },

      update: function update (el, ref, vnode) {
        var value = ref.value;
        var oldValue = ref.oldValue;

        /* istanbul ignore if */
        if (!value === !oldValue) { return }
        vnode = locateNode(vnode);
        var transition$$1 = vnode.data && vnode.data.transition;
        if (transition$$1) {
          vnode.data.show = true;
          if (value) {
            enter(vnode, function () {
              el.style.display = el.__vOriginalDisplay;
            });
          } else {
            leave(vnode, function () {
              el.style.display = 'none';
            });
          }
        } else {
          el.style.display = value ? el.__vOriginalDisplay : 'none';
        }
      },

      unbind: function unbind (
        el,
        binding,
        vnode,
        oldVnode,
        isDestroy
      ) {
        if (!isDestroy) {
          el.style.display = el.__vOriginalDisplay;
        }
      }
    };

    var platformDirectives = {
      model: directive,
      show: show
    };

    /*  */

    var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
    };

    // in case the child is also an abstract component, e.g. <keep-alive>
    // we want to recursively retrieve the real component to be rendered
    function getRealChild (vnode) {
      var compOptions = vnode && vnode.componentOptions;
      if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children))
      } else {
        return vnode
      }
    }

    function extractTransitionData (comp) {
      var data = {};
      var options = comp.$options;
      // props
      for (var key in options.propsData) {
        data[key] = comp[key];
      }
      // events.
      // extract listeners and pass them directly to the transition methods
      var listeners = options._parentListeners;
      for (var key$1 in listeners) {
        data[camelize$1(key$1)] = listeners[key$1];
      }
      return data
    }

    function placeholder (h, rawChild) {
      if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
          props: rawChild.componentOptions.propsData
        })
      }
    }

    function hasParentTransition (vnode) {
      while ((vnode = vnode.parent)) {
        if (vnode.data.transition) {
          return true
        }
      }
    }

    function isSameChild (child, oldChild) {
      return oldChild.key === child.key && oldChild.tag === child.tag
    }

    var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

    var isVShowDirective = function (d) { return d.name === 'show'; };

    var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,

      render: function render (h) {
        var this$1 = this;

        var children = this.$slots.default;
        if (!children) {
          return
        }

        // filter out text nodes (possible whitespaces)
        children = children.filter(isNotTextNode);
        /* istanbul ignore if */
        if (!children.length) {
          return
        }

        var mode = this.mode;

        var rawChild = children[0];

        // if this is a component root node and the component's
        // parent container node also has transition, skip.
        if (hasParentTransition(this.$vnode)) {
          return rawChild
        }

        // apply transition data to child
        // use getRealChild() to ignore abstract components e.g. keep-alive
        var child = getRealChild(rawChild);
        /* istanbul ignore if */
        if (!child) {
          return rawChild
        }

        if (this._leaving) {
          return placeholder(h, rawChild)
        }

        // ensure a key that is unique to the vnode type and to this transition
        // component instance. This key will be used to remove pending leaving nodes
        // during entering.
        var id = "__transition-" + (this._uid) + "-";
        child.key = child.key == null
          ? child.isComment
            ? id + 'comment'
            : id + child.tag
          : isPrimitive(child.key)
            ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
            : child.key;

        var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
        var oldRawChild = this._vnode;
        var oldChild = getRealChild(oldRawChild);

        // mark v-show
        // so that the transition module can hand over the control to the directive
        if (child.data.directives && child.data.directives.some(isVShowDirective)) {
          child.data.show = true;
        }

        if (
          oldChild &&
          oldChild.data &&
          !isSameChild(child, oldChild) &&
          !isAsyncPlaceholder(oldChild) &&
          // #6687 component root is a comment node
          !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
        ) {
          // replace old child transition data with fresh one
          // important for dynamic transitions!
          var oldData = oldChild.data.transition = extend({}, data);
          // handle transition mode
          if (mode === 'out-in') {
            // return placeholder node and queue update when leave finishes
            this._leaving = true;
            mergeVNodeHook(oldData, 'afterLeave', function () {
              this$1._leaving = false;
              this$1.$forceUpdate();
            });
            return placeholder(h, rawChild)
          } else if (mode === 'in-out') {
            if (isAsyncPlaceholder(child)) {
              return oldRawChild
            }
            var delayedLeave;
            var performLeave = function () { delayedLeave(); };
            mergeVNodeHook(data, 'afterEnter', performLeave);
            mergeVNodeHook(data, 'enterCancelled', performLeave);
            mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
          }
        }

        return rawChild
      }
    };

    /*  */

    var props = extend({
      tag: String,
      moveClass: String
    }, transitionProps);

    delete props.mode;

    var TransitionGroup = {
      props: props,

      beforeMount: function beforeMount () {
        var this$1 = this;

        var update = this._update;
        this._update = function (vnode, hydrating) {
          var restoreActiveInstance = setActiveInstance(this$1);
          // force removing pass
          this$1.__patch__(
            this$1._vnode,
            this$1.kept,
            false, // hydrating
            true // removeOnly (!important, avoids unnecessary moves)
          );
          this$1._vnode = this$1.kept;
          restoreActiveInstance();
          update.call(this$1, vnode, hydrating);
        };
      },

      render: function render (h) {
        var tag = this.tag || this.$vnode.data.tag || 'span';
        var map = Object.create(null);
        var prevChildren = this.prevChildren = this.children;
        var rawChildren = this.$slots.default || [];
        var children = this.children = [];
        var transitionData = extractTransitionData(this);

        for (var i = 0; i < rawChildren.length; i++) {
          var c = rawChildren[i];
          if (c.tag) {
            if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
              children.push(c);
              map[c.key] = c
              ;(c.data || (c.data = {})).transition = transitionData;
            }
          }
        }

        if (prevChildren) {
          var kept = [];
          var removed = [];
          for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
            var c$1 = prevChildren[i$1];
            c$1.data.transition = transitionData;
            c$1.data.pos = c$1.elm.getBoundingClientRect();
            if (map[c$1.key]) {
              kept.push(c$1);
            } else {
              removed.push(c$1);
            }
          }
          this.kept = h(tag, null, kept);
          this.removed = removed;
        }

        return h(tag, null, children)
      },

      updated: function updated () {
        var children = this.prevChildren;
        var moveClass = this.moveClass || ((this.name || 'v') + '-move');
        if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
          return
        }

        // we divide the work into three loops to avoid mixing DOM reads and writes
        // in each iteration - which helps prevent layout thrashing.
        children.forEach(callPendingCbs);
        children.forEach(recordPosition);
        children.forEach(applyTranslation);

        // force reflow to put everything in position
        // assign to this to avoid being removed in tree-shaking
        // $flow-disable-line
        this._reflow = document.body.offsetHeight;

        children.forEach(function (c) {
          if (c.data.moved) {
            var el = c.elm;
            var s = el.style;
            addTransitionClass(el, moveClass);
            s.transform = s.WebkitTransform = s.transitionDuration = '';
            el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
              if (e && e.target !== el) {
                return
              }
              if (!e || /transform$/.test(e.propertyName)) {
                el.removeEventListener(transitionEndEvent, cb);
                el._moveCb = null;
                removeTransitionClass(el, moveClass);
              }
            });
          }
        });
      },

      methods: {
        hasMove: function hasMove (el, moveClass) {
          /* istanbul ignore if */
          if (!hasTransition) {
            return false
          }
          /* istanbul ignore if */
          if (this._hasMove) {
            return this._hasMove
          }
          // Detect whether an element with the move class applied has
          // CSS transitions. Since the element may be inside an entering
          // transition at this very moment, we make a clone of it and remove
          // all other transition classes applied to ensure only the move class
          // is applied.
          var clone = el.cloneNode();
          if (el._transitionClasses) {
            el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
          }
          addClass(clone, moveClass);
          clone.style.display = 'none';
          this.$el.appendChild(clone);
          var info = getTransitionInfo(clone);
          this.$el.removeChild(clone);
          return (this._hasMove = info.hasTransform)
        }
      }
    };

    function callPendingCbs (c) {
      /* istanbul ignore if */
      if (c.elm._moveCb) {
        c.elm._moveCb();
      }
      /* istanbul ignore if */
      if (c.elm._enterCb) {
        c.elm._enterCb();
      }
    }

    function recordPosition (c) {
      c.data.newPos = c.elm.getBoundingClientRect();
    }

    function applyTranslation (c) {
      var oldPos = c.data.pos;
      var newPos = c.data.newPos;
      var dx = oldPos.left - newPos.left;
      var dy = oldPos.top - newPos.top;
      if (dx || dy) {
        c.data.moved = true;
        var s = c.elm.style;
        s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
        s.transitionDuration = '0s';
      }
    }

    var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
    };

    /*  */

    // install platform specific utils
    Vue.config.mustUseProp = mustUseProp;
    Vue.config.isReservedTag = isReservedTag;
    Vue.config.isReservedAttr = isReservedAttr;
    Vue.config.getTagNamespace = getTagNamespace;
    Vue.config.isUnknownElement = isUnknownElement;

    // install platform runtime directives & components
    extend(Vue.options.directives, platformDirectives);
    extend(Vue.options.components, platformComponents);

    // install platform patch function
    Vue.prototype.__patch__ = inBrowser ? patch : noop;

    // public mount method
    Vue.prototype.$mount = function (
      el,
      hydrating
    ) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating)
    };

    // devtools global hook
    /* istanbul ignore next */
    if (inBrowser) {
      setTimeout(function () {
        if (config.devtools) {
          if (devtools) {
            devtools.emit('init', Vue);
          }
        }
      }, 0);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    		path: basedir,
    		exports: {},
    		require: function (path, base) {
    			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    		}
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    var vue2DaterangePicker_umd_min = createCommonjsModule(function (module, exports) {
    (function(t,e){module.exports=e();})("undefined"!==typeof self?self:commonjsGlobal,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r});},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"00ee":function(t,e,n){var r=n("b622"),a=r("toStringTag"),i={};i[a]="z",t.exports="[object z]"===String(i);},"057f":function(t,e,n){var r=n("fc6a"),a=n("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return a(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?s(t):a(r(t))};},"06cf":function(t,e,n){var r=n("83ab"),a=n("d1e7"),i=n("5c6c"),o=n("fc6a"),s=n("c04e"),c=n("5135"),u=n("0cfb"),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=o(t),e=s(e,!0),u)try{return l(t,e)}catch(n){}if(c(t,e))return i(!a.f.call(t,e),t[e])};},"0cfb":function(t,e,n){var r=n("83ab"),a=n("d039"),i=n("cc12");t.exports=!r&&!a((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}));},"0e58":function(t,e,n){var r=n("beb7"),a=n.n(r);a.a;},"14c3":function(t,e,n){var r=n("c6b6"),a=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)};},"159b":function(t,e,n){var r=n("da84"),a=n("fdbc"),i=n("17c2"),o=n("9112");for(var s in a){var c=r[s],u=c&&c.prototype;if(u&&u.forEach!==i)try{o(u,"forEach",i);}catch(l){u.forEach=i;}}},"17c2":function(t,e,n){var r=n("b727").forEach,a=n("b301");t.exports=a("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach;},"1be4":function(t,e,n){var r=n("d066");t.exports=r("document","documentElement");},"1c0b":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t};},"1c7e":function(t,e,n){var r=n("b622"),a=r("iterator"),i=!1;try{var o=0,s={next:function(){return {done:!!o++}},return:function(){i=!0;}};s[a]=function(){return this},Array.from(s,(function(){throw 2}));}catch(c){}t.exports=function(t,e){if(!e&&!i)return !1;var n=!1;try{var r={};r[a]=function(){return {next:function(){return {done:n=!0}}}},t(r);}catch(c){}return n};},"1d80":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t};},"1dde":function(t,e,n){var r=n("d039"),a=n("b622"),i=n("60ae"),o=a("species");t.exports=function(t){return i>=51||!r((function(){var e=[],n=e.constructor={};return n[o]=function(){return {foo:1}},1!==e[t](Boolean).foo}))};},"23cb":function(t,e,n){var r=n("a691"),a=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?a(n+e,0):i(n,e)};},"23e7":function(t,e,n){var r=n("da84"),a=n("06cf").f,i=n("9112"),o=n("6eeb"),s=n("ce4e"),c=n("e893"),u=n("94ca");t.exports=function(t,e){var n,l,f,d,h,p,m=t.target,v=t.global,g=t.stat;if(l=v?r:g?r[m]||s(m,{}):(r[m]||{}).prototype,l)for(f in e){if(h=e[f],t.noTargetGet?(p=a(l,f),d=p&&p.value):d=l[f],n=u(v?f:m+(g?".":"#")+f,t.forced),!n&&void 0!==d){if(typeof h===typeof d)continue;c(h,d);}(t.sham||d&&d.sham)&&i(h,"sham",!0),o(l,f,h,t);}};},"241c":function(t,e,n){var r=n("ca84"),a=n("7839"),i=a.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)};},"25f0":function(t,e,n){var r=n("6eeb"),a=n("825a"),i=n("d039"),o=n("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=i((function(){return "/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=s;(l||f)&&r(RegExp.prototype,s,(function(){var t=a(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?o.call(t):n);return "/"+e+"/"+r}),{unsafe:!0});},"2ade":function(t,e,n){},"35a1":function(t,e,n){var r=n("f5df"),a=n("3f8c"),i=n("b622"),o=i("iterator");t.exports=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||a[r(t)]};},"37e8":function(t,e,n){var r=n("83ab"),a=n("9bf2"),i=n("825a"),o=n("df75");t.exports=r?Object.defineProperties:function(t,e){i(t);var n,r=o(e),s=r.length,c=0;while(s>c)a.f(t,n=r[c++],e[n]);return t};},"3bbe":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t};},"3ca3":function(t,e,n){var r=n("6547").charAt,a=n("69f3"),i=n("7dd0"),o="String Iterator",s=a.set,c=a.getterFor(o);i(String,"String",(function(t){s(this,{type:o,string:String(t),index:0});}),(function(){var t,e=c(this),n=e.string,a=e.index;return a>=n.length?{value:void 0,done:!0}:(t=r(n,a),e.index+=t.length,{value:t,done:!1})}));},"3f8c":function(t,e){t.exports={};},"428f":function(t,e,n){var r=n("da84");t.exports=r;},"44ad":function(t,e,n){var r=n("d039"),a=n("c6b6"),i="".split;t.exports=r((function(){return !Object("z").propertyIsEnumerable(0)}))?function(t){return "String"==a(t)?i.call(t,""):Object(t)}:Object;},"44d2":function(t,e,n){var r=n("b622"),a=n("7c73"),i=n("9112"),o=r("unscopables"),s=Array.prototype;void 0==s[o]&&i(s,o,a(null)),t.exports=function(t){s[o][t]=!0;};},"466d":function(t,e,n){var r=n("d784"),a=n("825a"),i=n("50c4"),o=n("1d80"),s=n("8aa5"),c=n("14c3");r("match",1,(function(t,e,n){return [function(e){var n=o(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,t,this);if(r.done)return r.value;var o=a(t),u=String(this);if(!o.global)return c(o,u);var l=o.unicode;o.lastIndex=0;var f,d=[],h=0;while(null!==(f=c(o,u))){var p=String(f[0]);d[h]=p,""===p&&(o.lastIndex=s(u,i(o.lastIndex),l)),h++;}return 0===h?null:d}]}));},4930:function(t,e,n){var r=n("d039");t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return !String(Symbol())}));},"4d64":function(t,e,n){var r=n("fc6a"),a=n("50c4"),i=n("23cb"),o=function(t){return function(e,n,o){var s,c=r(e),u=a(c.length),l=i(o,u);if(t&&n!=n){while(u>l)if(s=c[l++],s!=s)return !0}else for(;u>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return !t&&-1}};t.exports={includes:o(!0),indexOf:o(!1)};},"4de4":function(t,e,n){var r=n("23e7"),a=n("b727").filter,i=n("d039"),o=n("1dde"),s=o("filter"),c=s&&!i((function(){[].filter.call({length:-1,0:1},(function(t){throw t}));}));r({target:"Array",proto:!0,forced:!s||!c},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}});},"4df4":function(t,e,n){var r=n("f8c2"),a=n("7b0b"),i=n("9bdd"),o=n("e95a"),s=n("50c4"),c=n("8418"),u=n("35a1");t.exports=function(t){var e,n,l,f,d,h=a(t),p="function"==typeof this?this:Array,m=arguments.length,v=m>1?arguments[1]:void 0,g=void 0!==v,y=0,b=u(h);if(g&&(v=r(v,m>2?arguments[2]:void 0,2)),void 0==b||p==Array&&o(b))for(e=s(h.length),n=new p(e);e>y;y++)c(n,y,g?v(h[y],y):h[y]);else for(f=b.call(h),d=f.next,n=new p;!(l=d.call(f)).done;y++)c(n,y,g?i(f,v,[l.value,y],!0):l.value);return n.length=y,n};},"50c4":function(t,e,n){var r=n("a691"),a=Math.min;t.exports=function(t){return t>0?a(r(t),9007199254740991):0};},5135:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)};},5319:function(t,e,n){var r=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),s=n("a691"),c=n("1d80"),u=n("8aa5"),l=n("14c3"),f=Math.max,d=Math.min,h=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,m=/\$([$&'`]|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n){return [function(n,r){var a=c(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):e.call(String(a),n,r)},function(t,i){var c=n(e,t,this,i);if(c.done)return c.value;var h=a(t),p=String(this),m="function"===typeof i;m||(i=String(i));var g=h.global;if(g){var y=h.unicode;h.lastIndex=0;}var b=[];while(1){var D=l(h,p);if(null===D)break;if(b.push(D),!g)break;var w=String(D[0]);""===w&&(h.lastIndex=u(p,o(h.lastIndex),y));}for(var x="",S=0,k=0;k<b.length;k++){D=b[k];for(var M=String(D[0]),_=f(d(s(D.index),p.length),0),O=[],C=1;C<D.length;C++)O.push(v(D[C]));var T=D.groups;if(m){var P=[M].concat(O,_,p);void 0!==T&&P.push(T);var j=String(i.apply(void 0,P));}else j=r(M,p,_,O,T,i);_>=S&&(x+=p.slice(S,_)+j,S=_+M.length);}return x+p.slice(S)}];function r(t,n,r,a,o,s){var c=r+t.length,u=a.length,l=m;return void 0!==o&&(o=i(o),l=p),e.call(s,l,(function(e,i){var s;switch(i.charAt(0)){case"$":return "$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":s=o[i.slice(1,-1)];break;default:var l=+i;if(0===l)return e;if(l>u){var f=h(l/10);return 0===f?e:f<=u?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):e}s=a[l-1];}return void 0===s?"":s}))}}));},"53ca":function(t,e,n){n.d(e,"a",(function(){return a}));n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function r(t){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t){return a="function"===typeof Symbol&&"symbol"===r(Symbol.iterator)?function(t){return r(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t)},a(t)}},5692:function(t,e,n){var r=n("c430"),a=n("c6cd");(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.5.0",mode:r?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"});},"56ef":function(t,e,n){var r=n("d066"),a=n("241c"),i=n("7418"),o=n("825a");t.exports=r("Reflect","ownKeys")||function(t){var e=a.f(o(t)),n=i.f;return n?e.concat(n(t)):e};},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff";},"58a8":function(t,e,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(o,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)};},"5c6c":function(t,e){t.exports=function(t,e){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}};},"60ae":function(t,e,n){var r,a,i=n("da84"),o=n("b39a"),s=i.process,c=s&&s.versions,u=c&&c.v8;u?(r=u.split("."),a=r[0]+r[1]):o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(a=r[1]))),t.exports=a&&+a;},6547:function(t,e,n){var r=n("a691"),a=n("1d80"),i=function(t){return function(e,n){var i,o,s=String(a(e)),c=r(n),u=s.length;return c<0||c>=u?t?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===u||(o=s.charCodeAt(c+1))<56320||o>57343?t?s.charAt(c):i:t?s.slice(c,c+2):o-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)};},"65f0":function(t,e,n){var r=n("861d"),a=n("e8b5"),i=n("b622"),o=i("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[o],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)};},"69f3":function(t,e,n){var r,a,i,o=n("7f9a"),s=n("da84"),c=n("861d"),u=n("9112"),l=n("5135"),f=n("f772"),d=n("d012"),h=s.WeakMap,p=function(t){return i(t)?a(t):r(t,{})},m=function(t){return function(e){var n;if(!c(e)||(n=a(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}};if(o){var v=new h,g=v.get,y=v.has,b=v.set;r=function(t,e){return b.call(v,t,e),e},a=function(t){return g.call(v,t)||{}},i=function(t){return y.call(v,t)};}else {var D=f("state");d[D]=!0,r=function(t,e){return u(t,D,e),e},a=function(t){return l(t,D)?t[D]:{}},i=function(t){return l(t,D)};}t.exports={set:r,get:a,has:i,enforce:p,getterFor:m};},"6eeb":function(t,e,n){var r=n("da84"),a=n("9112"),i=n("5135"),o=n("ce4e"),s=n("8925"),c=n("69f3"),u=c.get,l=c.enforce,f=String(String).split("String");(t.exports=function(t,e,n,s){var c=!!s&&!!s.unsafe,u=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||a(n,"name",e),l(n).source=f.join("string"==typeof e?e:"")),t!==r?(c?!d&&t[e]&&(u=!0):delete t[e],u?t[e]=n:a(t,e,n)):u?t[e]=n:o(e,n);})(Function.prototype,"toString",(function(){return "function"==typeof this&&u(this).source||s(this)}));},7156:function(t,e,n){var r=n("861d"),a=n("d2bb");t.exports=function(t,e,n){var i,o;return a&&"function"==typeof(i=e.constructor)&&i!==n&&r(o=i.prototype)&&o!==n.prototype&&a(t,o),t};},7418:function(t,e){e.f=Object.getOwnPropertySymbols;},"746f":function(t,e,n){var r=n("428f"),a=n("5135"),i=n("c032"),o=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});a(e,t)||o(e,t,{value:i.f(t)});};},"76b6":function(t,e,n){var r=n("2ade"),a=n.n(r);a.a;},7839:function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"];},"7a50":function(t,e,n){n.r(e);n("a4d3"),n("4de4"),n("d81d"),n("fb6a"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=(n("d3b7"),n("466d"),n("5319"),n("53ca")),i=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g;return function(r,a,l,f){if(1!==arguments.length||"string"!==u(r)||/\d/.test(r)||(a=r,r=void 0),r=r||new Date,r instanceof Date||(r=new Date(r)),isNaN(r))throw TypeError("Invalid date");a=String(i.masks[a]||a||i.masks["default"]);var d=a.slice(0,4);"UTC:"!==d&&"GMT:"!==d||(a=a.slice(4),l=!0,"GMT:"===d&&(f=!0));var h=l?"getUTC":"get",p=r[h+"Date"](),m=r[h+"Day"](),v=r[h+"Month"](),g=r[h+"FullYear"](),y=r[h+"Hours"](),b=r[h+"Minutes"](),D=r[h+"Seconds"](),w=r[h+"Milliseconds"](),x=l?0:r.getTimezoneOffset(),S=s(r),k=c(r),M={d:p,dd:o(p),ddd:i.i18n.dayNames[m],dddd:i.i18n.dayNames[m+7],m:v+1,mm:o(v+1),mmm:i.i18n.monthNames[v],mmmm:i.i18n.monthNames[v+12],yy:String(g).slice(2),yyyy:g,h:y%12||12,hh:o(y%12||12),H:y,HH:o(y),M:b,MM:o(b),s:D,ss:o(D),l:o(w,3),L:o(Math.round(w/10)),t:y<12?i.i18n.timeNames[0]:i.i18n.timeNames[1],tt:y<12?i.i18n.timeNames[2]:i.i18n.timeNames[3],T:y<12?i.i18n.timeNames[4]:i.i18n.timeNames[5],TT:y<12?i.i18n.timeNames[6]:i.i18n.timeNames[7],Z:f?"GMT":l?"UTC":(String(r).match(e)||[""]).pop().replace(n,""),o:(x>0?"-":"+")+o(100*Math.floor(Math.abs(x)/60)+Math.abs(x)%60,4),S:["th","st","nd","rd"][p%10>3?0:(p%100-p%10!=10)*p%10],W:S,N:k};return a.replace(t,(function(t){return t in M?M[t]:t.slice(1,t.length-1)}))}}();function o(t,e){t=String(t),e=e||2;while(t.length<e)t="0"+t;return t}function s(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()-(e.getDay()+6)%7+3);var n=new Date(e.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);var r=e.getTimezoneOffset()-n.getTimezoneOffset();e.setHours(e.getHours()-r);var a=(e-n)/6048e5;return 1+Math.floor(a)}function c(t){var e=t.getDay();return 0===e&&(e=7),e}function u(t){return null===t?"null":void 0===t?"undefined":"object"!==Object(a["a"])(t)?Object(a["a"])(t):Array.isArray(t)?"array":{}.toString.call(t).slice(8,-1).toLowerCase()}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r);}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e));}));}return t}i.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},i.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var d={isSame:function(t,e,n){var r=new Date(t),a=new Date(e);return "date"===n&&(r.setHours(0,0,0,0),a.setHours(0,0,0,0)),r.getTime()===a.getTime()},daysInMonth:function(t,e){return new Date(t,e,0).getDate()},weekNumber:function(t){return s(t)},format:function(t,e){return i(t,e)},nextMonth:function(t){var e=new Date(t.getTime());return e.setDate(1),e.setMonth(e.getMonth()+1),e},prevMonth:function(t){var e=new Date(t.getTime());return e.setDate(1),e.setMonth(e.getMonth()-1),e},validateDateRange:function(t,e,n){var r=new Date(n),a=new Date(e);return n&&t.getTime()>r.getTime()?r:e&&t.getTime()<a.getTime()?a:t},localeData:function(t){var e={direction:"ltr",format:"mm/dd/yyyy",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:i.i18n.dayNames.slice(0,7).map((function(t){return t.substring(0,2)})),monthNames:i.i18n.monthNames.slice(0,12),firstDay:0};return f({},e,{},t)},yearMonth:function(t){var e=t.getMonth()+1;return t.getFullYear()+(e<10?"0":"")+e},isValidDate:function(t){return t instanceof Date&&!isNaN(t)}};e["default"]=d;},"7b0b":function(t,e,n){var r=n("1d80");t.exports=function(t){return Object(r(t))};},"7c73":function(t,e,n){var r=n("825a"),a=n("37e8"),i=n("7839"),o=n("d012"),s=n("1be4"),c=n("cc12"),u=n("f772"),l=u("IE_PROTO"),f="prototype",d=function(){},h=function(){var t,e=c("iframe"),n=i.length,r="<",a="script",o=">",u="java"+a+":";e.style.display="none",s.appendChild(e),e.src=String(u),t=e.contentWindow.document,t.open(),t.write(r+a+o+"document.F=Object"+r+"/"+a+o),t.close(),h=t.F;while(n--)delete h[f][i[n]];return h()};t.exports=Object.create||function(t,e){var n;return null!==t?(d[f]=r(t),n=new d,d[f]=null,n[l]=t):n=h(),void 0===e?n:a(n,e)},o[l]=!0;},"7db0":function(t,e,n){var r=n("23e7"),a=n("b727").find,i=n("44d2"),o="find",s=!0;o in[]&&Array(1)[o]((function(){s=!1;})),r({target:"Array",proto:!0,forced:s},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(o);},"7dd0":function(t,e,n){var r=n("23e7"),a=n("9ed3"),i=n("e163"),o=n("d2bb"),s=n("d44e"),c=n("9112"),u=n("6eeb"),l=n("b622"),f=n("c430"),d=n("3f8c"),h=n("ae93"),p=h.IteratorPrototype,m=h.BUGGY_SAFARI_ITERATORS,v=l("iterator"),g="keys",y="values",b="entries",D=function(){return this};t.exports=function(t,e,n,l,h,w,x){a(n,e,l);var S,k,M,_=function(t){if(t===h&&j)return j;if(!m&&t in T)return T[t];switch(t){case g:return function(){return new n(this,t)};case y:return function(){return new n(this,t)};case b:return function(){return new n(this,t)}}return function(){return new n(this)}},O=e+" Iterator",C=!1,T=t.prototype,P=T[v]||T["@@iterator"]||h&&T[h],j=!m&&P||_(h),A="Array"==e&&T.entries||P;if(A&&(S=i(A.call(new t)),p!==Object.prototype&&S.next&&(f||i(S)===p||(o?o(S,p):"function"!=typeof S[v]&&c(S,v,D)),s(S,O,!0,!0),f&&(d[O]=D))),h==y&&P&&P.name!==y&&(C=!0,j=function(){return P.call(this)}),f&&!x||T[v]===j||c(T,v,j),d[e]=j,h)if(k={values:_(y),keys:w?j:_(g),entries:_(b)},x)for(M in k)!m&&!C&&M in T||u(T,M,k[M]);else r({target:e,proto:!0,forced:m||C},k);return k};},"7f9a":function(t,e,n){var r=n("da84"),a=n("8925"),i=r.WeakMap;t.exports="function"===typeof i&&/native code/.test(a(i));},"825a":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t};},"83ab":function(t,e,n){var r=n("d039");t.exports=!r((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}));},8418:function(t,e,n){var r=n("c04e"),a=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var o=r(e);o in t?a.f(t,o,i(0,n)):t[o]=n;};},"861d":function(t,e){t.exports=function(t){return "object"===typeof t?null!==t:"function"===typeof t};},8925:function(t,e,n){var r=n("c6cd"),a=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return a.call(t)}),t.exports=r.inspectSource;},"8aa5":function(t,e,n){var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)};},"90e3":function(t,e){var n=0,r=Math.random();t.exports=function(t){return "Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)};},9112:function(t,e,n){var r=n("83ab"),a=n("9bf2"),i=n("5c6c");t.exports=r?function(t,e,n){return a.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t};},9263:function(t,e,n){var r=n("ad6d"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,s=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=void 0!==/()??/.exec("")[1],u=s||c;u&&(o=function(t){var e,n,o,u,l=this;return c&&(n=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),s&&(e=l.lastIndex),o=a.call(l,t),s&&o&&(l.lastIndex=l.global?o.index+o[0].length:e),c&&o&&o.length>1&&i.call(o[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0);})),o}),t.exports=o;},"94ca":function(t,e,n){var r=n("d039"),a=/#|\.prototype\./,i=function(t,e){var n=s[o(t)];return n==u||n!=c&&("function"==typeof e?r(e):!!e)},o=i.normalize=function(t){return String(t).replace(a,".").toLowerCase()},s=i.data={},c=i.NATIVE="N",u=i.POLYFILL="P";t.exports=i;},"9b47":function(t,e,n){var r=n("ef45"),a=n.n(r);a.a;},"9bdd":function(t,e,n){var r=n("825a");t.exports=function(t,e,n,a){try{return a?e(r(n)[0],n[1]):e(n)}catch(o){var i=t["return"];throw void 0!==i&&r(i.call(t)),o}};},"9bf2":function(t,e,n){var r=n("83ab"),a=n("0cfb"),i=n("825a"),o=n("c04e"),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(i(t),e=o(e,!0),i(n),a)try{return s(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return "value"in n&&(t[e]=n.value),t};},"9ed3":function(t,e,n){var r=n("ae93").IteratorPrototype,a=n("7c73"),i=n("5c6c"),o=n("d44e"),s=n("3f8c"),c=function(){return this};t.exports=function(t,e,n){var u=e+" Iterator";return t.prototype=a(r,{next:i(1,n)}),o(t,u,!1,!0),s[u]=c,t};},a4d3:function(t,e,n){var r=n("23e7"),a=n("da84"),i=n("d066"),o=n("c430"),s=n("83ab"),c=n("4930"),u=n("fdbf"),l=n("d039"),f=n("5135"),d=n("e8b5"),h=n("861d"),p=n("825a"),m=n("7b0b"),v=n("fc6a"),g=n("c04e"),y=n("5c6c"),b=n("7c73"),D=n("df75"),w=n("241c"),x=n("057f"),S=n("7418"),k=n("06cf"),M=n("9bf2"),_=n("d1e7"),O=n("9112"),C=n("6eeb"),T=n("5692"),P=n("f772"),j=n("d012"),A=n("90e3"),R=n("b622"),N=n("c032"),$=n("746f"),E=n("d44e"),F=n("69f3"),U=n("b727").forEach,I=P("hidden"),L="Symbol",H="prototype",B=R("toPrimitive"),Y=F.set,W=F.getterFor(L),V=Object[H],G=a.Symbol,z=i("JSON","stringify"),J=k.f,Z=M.f,X=x.f,q=_.f,K=T("symbols"),Q=T("op-symbols"),tt=T("string-to-symbol-registry"),et=T("symbol-to-string-registry"),nt=T("wks"),rt=a.QObject,at=!rt||!rt[H]||!rt[H].findChild,it=s&&l((function(){return 7!=b(Z({},"a",{get:function(){return Z(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=J(V,e);r&&delete V[e],Z(t,e,n),r&&t!==V&&Z(V,e,r);}:Z,ot=function(t,e){var n=K[t]=b(G[H]);return Y(n,{type:L,tag:t,description:e}),s||(n.description=e),n},st=c&&"symbol"==typeof G.iterator?function(t){return "symbol"==typeof t}:function(t){return Object(t)instanceof G},ct=function(t,e,n){t===V&&ct(Q,e,n),p(t);var r=g(e,!0);return p(n),f(K,r)?(n.enumerable?(f(t,I)&&t[I][r]&&(t[I][r]=!1),n=b(n,{enumerable:y(0,!1)})):(f(t,I)||Z(t,I,y(1,{})),t[I][r]=!0),it(t,r,n)):Z(t,r,n)},ut=function(t,e){p(t);var n=v(e),r=D(n).concat(pt(n));return U(r,(function(e){s&&!ft.call(n,e)||ct(t,e,n[e]);})),t},lt=function(t,e){return void 0===e?b(t):ut(b(t),e)},ft=function(t){var e=g(t,!0),n=q.call(this,e);return !(this===V&&f(K,e)&&!f(Q,e))&&(!(n||!f(this,e)||!f(K,e)||f(this,I)&&this[I][e])||n)},dt=function(t,e){var n=v(t),r=g(e,!0);if(n!==V||!f(K,r)||f(Q,r)){var a=J(n,r);return !a||!f(K,r)||f(n,I)&&n[I][r]||(a.enumerable=!0),a}},ht=function(t){var e=X(v(t)),n=[];return U(e,(function(t){f(K,t)||f(j,t)||n.push(t);})),n},pt=function(t){var e=t===V,n=X(e?Q:v(t)),r=[];return U(n,(function(t){!f(K,t)||e&&!f(V,t)||r.push(K[t]);})),r};if(c||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=A(t),n=function(t){this===V&&n.call(Q,t),f(this,I)&&f(this[I],e)&&(this[I][e]=!1),it(this,e,y(1,t));};return s&&at&&it(V,e,{configurable:!0,set:n}),ot(e,t)},C(G[H],"toString",(function(){return W(this).tag})),_.f=ft,M.f=ct,k.f=dt,w.f=x.f=ht,S.f=pt,s&&(Z(G[H],"description",{configurable:!0,get:function(){return W(this).description}}),o||C(V,"propertyIsEnumerable",ft,{unsafe:!0}))),u||(N.f=function(t){return ot(R(t),t)}),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:G}),U(D(nt),(function(t){$(t);})),r({target:L,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=G(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0;},useSimple:function(){at=!1;}}),r({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:ht,getOwnPropertySymbols:pt}),r({target:"Object",stat:!0,forced:l((function(){S.f(1);}))},{getOwnPropertySymbols:function(t){return S.f(m(t))}}),z){var mt=!c||l((function(){var t=G();return "[null]"!=z([t])||"{}"!=z({a:t})||"{}"!=z(Object(t))}));r({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,n){var r,a=[t],i=1;while(arguments.length>i)a.push(arguments[i++]);if(r=e,(h(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!st(e))return e}),a[1]=e,z.apply(null,a)}});}G[H][B]||O(G[H],B,G[H].valueOf),E(G,L),j[I]=!0;},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(t){}));r({target:"Array",stat:!0,forced:o},{from:a});},a691:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)};},a6da:function(t,e,n){var r={"./native":"7a50","./native.js":"7a50"};function a(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}a.keys=function(){return Object.keys(r)},a.resolve=i,t.exports=a,a.id="a6da";},a9e3:function(t,e,n){var r=n("83ab"),a=n("da84"),i=n("94ca"),o=n("6eeb"),s=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),h=n("241c").f,p=n("06cf").f,m=n("9bf2").f,v=n("58a8").trim,g="Number",y=a[g],b=y.prototype,D=c(d(b))==g,w=function(t){var e,n,r,a,i,o,s,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=v(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return +u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,r)}return +u};if(i(g,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var x,S=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof S&&(D?f((function(){b.valueOf.call(n);})):c(n)!=g)?u(new y(w(e)),n,S):w(e)},k=r?h(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),M=0;k.length>M;M++)s(y,x=k[M])&&!s(S,x)&&m(S,x,p(y,x));S.prototype=b,b.constructor=S,o(a,g,S);}},ad6d:function(t,e,n){var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e};},ade3:function(t,e,n){function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}));},ae93:function(t,e,n){var r,a,i,o=n("e163"),s=n("9112"),c=n("5135"),u=n("b622"),l=n("c430"),f=u("iterator"),d=!1,h=function(){return this};[].keys&&(i=[].keys(),"next"in i?(a=o(o(i)),a!==Object.prototype&&(r=a)):d=!0),void 0==r&&(r={}),l||c(r,f)||s(r,f,h),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:d};},b041:function(t,e,n){var r=n("00ee"),a=n("f5df");t.exports=r?{}.toString:function(){return "[object "+a(this)+"]"};},b301:function(t,e,n){var r=n("d039");t.exports=function(t,e){var n=[][t];return !n||!r((function(){n.call(null,e||function(){throw 1},1);}))};},b39a:function(t,e,n){var r=n("d066");t.exports=r("navigator","userAgent")||"";},b622:function(t,e,n){var r=n("da84"),a=n("5692"),i=n("5135"),o=n("90e3"),s=n("4930"),c=n("fdbf"),u=a("wks"),l=r.Symbol,f=c?l:o;t.exports=function(t){return i(u,t)||(s&&i(l,t)?u[t]=l[t]:u[t]=f("Symbol."+t)),u[t]};},b64b:function(t,e,n){var r=n("23e7"),a=n("7b0b"),i=n("df75"),o=n("d039"),s=o((function(){i(1);}));r({target:"Object",stat:!0,forced:s},{keys:function(t){return i(a(t))}});},b727:function(t,e,n){var r=n("f8c2"),a=n("44ad"),i=n("7b0b"),o=n("50c4"),s=n("65f0"),c=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,d=5==t||f;return function(h,p,m,v){for(var g,y,b=i(h),D=a(b),w=r(p,m,3),x=o(D.length),S=0,k=v||s,M=e?k(h,x):n?k(h,0):void 0;x>S;S++)if((d||S in D)&&(g=D[S],y=w(g,S,b),t))if(e)M[S]=y;else if(y)switch(t){case 3:return !0;case 5:return g;case 6:return S;case 2:c.call(M,g);}else if(l)return !1;return f?-1:u||l?l:M}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)};},beb7:function(t,e,n){},c032:function(t,e,n){var r=n("b622");e.f=r;},c04e:function(t,e,n){var r=n("861d");t.exports=function(t,e){if(!r(t))return t;var n,a;if(e&&"function"==typeof(n=t.toString)&&!r(a=n.call(t)))return a;if("function"==typeof(n=t.valueOf)&&!r(a=n.call(t)))return a;if(!e&&"function"==typeof(n=t.toString)&&!r(a=n.call(t)))return a;throw TypeError("Can't convert object to primitive value")};},c430:function(t,e){t.exports=!1;},c6b6:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)};},c6cd:function(t,e,n){var r=n("da84"),a=n("ce4e"),i="__core-js_shared__",o=r[i]||a(i,{});t.exports=o;},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")();}catch(r){"object"===typeof window&&(n=window);}t.exports=n;},ca84:function(t,e,n){var r=n("5135"),a=n("fc6a"),i=n("4d64").indexOf,o=n("d012");t.exports=function(t,e){var n,s=a(t),c=0,u=[];for(n in s)!r(o,n)&&r(s,n)&&u.push(n);while(e.length>c)r(s,n=e[c++])&&(~i(u,n)||u.push(n));return u};},cc12:function(t,e,n){var r=n("da84"),a=n("861d"),i=r.document,o=a(i)&&a(i.createElement);t.exports=function(t){return o?i.createElement(t):{}};},ce4e:function(t,e,n){var r=n("da84"),a=n("9112");t.exports=function(t,e){try{a(r,t,e);}catch(n){r[t]=e;}return e};},d012:function(t,e){t.exports={};},d039:function(t,e){t.exports=function(t){try{return !!t()}catch(e){return !0}};},d066:function(t,e,n){var r=n("428f"),a=n("da84"),i=function(t){return "function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(a[t]):r[t]&&r[t][e]||a[t]&&a[t][e]};},d1e7:function(t,e,n){var r={}.propertyIsEnumerable,a=Object.getOwnPropertyDescriptor,i=a&&!r.call({1:2},1);e.f=i?function(t){var e=a(this,t);return !!e&&e.enumerable}:r;},d28b:function(t,e,n){var r=n("746f");r("iterator");},d2bb:function(t,e,n){var r=n("825a"),a=n("3bbe");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,t.call(n,[]),e=n instanceof Array;}catch(i){}return function(n,i){return r(n),a(i),e?t.call(n,i):n.__proto__=i,n}}():void 0);},d3b7:function(t,e,n){var r=n("00ee"),a=n("6eeb"),i=n("b041");r||a(Object.prototype,"toString",i,{unsafe:!0});},d44e:function(t,e,n){var r=n("9bf2").f,a=n("5135"),i=n("b622"),o=i("toStringTag");t.exports=function(t,e,n){t&&!a(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e});};},d784:function(t,e,n){var r=n("9112"),a=n("6eeb"),i=n("d039"),o=n("b622"),s=n("9263"),c=o("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var d=o(t),h=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),p=h&&!i((function(){var e=!1,n=/a/;return "split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return e=!0,null},n[d](""),!e}));if(!h||!p||"replace"===t&&!u||"split"===t&&!l){var m=/./[d],v=n(d,""[t],(function(t,e,n,r,a){return e.exec===s?h&&!a?{done:!0,value:m.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),g=v[0],y=v[1];a(String.prototype,t,g),a(RegExp.prototype,d,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)}),f&&r(RegExp.prototype[d],"sham",!0);}};},d81d:function(t,e,n){var r=n("23e7"),a=n("b727").map,i=n("d039"),o=n("1dde"),s=o("map"),c=s&&!i((function(){[].map.call({length:-1,0:1},(function(t){throw t}));}));r({target:"Array",proto:!0,forced:!s||!c},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}});},da84:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")();}).call(this,n("c8ba"));},dbb4:function(t,e,n){var r=n("23e7"),a=n("83ab"),i=n("56ef"),o=n("fc6a"),s=n("06cf"),c=n("8418");r({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,n,r=o(t),a=s.f,u=i(r),l={},f=0;while(u.length>f)n=a(r,e=u[f++]),void 0!==n&&c(l,e,n);return l}});},ddb0:function(t,e,n){var r=n("da84"),a=n("fdbc"),i=n("e260"),o=n("9112"),s=n("b622"),c=s("iterator"),u=s("toStringTag"),l=i.values;for(var f in a){var d=r[f],h=d&&d.prototype;if(h){if(h[c]!==l)try{o(h,c,l);}catch(m){h[c]=l;}if(h[u]||o(h,u,f),a[f])for(var p in i)if(h[p]!==i[p])try{o(h,p,i[p]);}catch(m){h[p]=i[p];}}}},df75:function(t,e,n){var r=n("ca84"),a=n("7839");t.exports=Object.keys||function(t){return r(t,a)};},e01a:function(t,e,n){var r=n("23e7"),a=n("83ab"),i=n("da84"),o=n("5135"),s=n("861d"),c=n("9bf2").f,u=n("e893"),l=i.Symbol;if(a&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new l(t):void 0===t?l():l(t);return ""===t&&(f[e]=!0),e};u(d,l);var h=d.prototype=l.prototype;h.constructor=d;var p=h.toString,m="Symbol(test)"==String(l("test")),v=/^Symbol\((.*)\)[^)]+$/;c(h,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=p.call(t);if(o(f,t))return "";var n=m?e.slice(7,-1):e.replace(v,"$1");return ""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d});}},e163:function(t,e,n){var r=n("5135"),a=n("7b0b"),i=n("f772"),o=n("e177"),s=i("IE_PROTO"),c=Object.prototype;t.exports=o?Object.getPrototypeOf:function(t){return t=a(t),r(t,s)?t[s]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null};},e177:function(t,e,n){var r=n("d039");t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}));},e260:function(t,e,n){var r=n("fc6a"),a=n("44d2"),i=n("3f8c"),o=n("69f3"),s=n("7dd0"),c="Array Iterator",u=o.set,l=o.getterFor(c);t.exports=s(Array,"Array",(function(t,e){u(this,{type:c,target:r(t),index:0,kind:e});}),(function(){var t=l(this),e=t.target,n=t.kind,r=t.index++;return !e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values"),i.Arguments=i.Array,a("keys"),a("values"),a("entries");},e439:function(t,e,n){var r=n("23e7"),a=n("d039"),i=n("fc6a"),o=n("06cf").f,s=n("83ab"),c=a((function(){o(1);})),u=!s||c;r({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return o(i(t),e)}});},e893:function(t,e,n){var r=n("5135"),a=n("56ef"),i=n("06cf"),o=n("9bf2");t.exports=function(t,e){for(var n=a(e),s=o.f,c=i.f,u=0;u<n.length;u++){var l=n[u];r(t,l)||s(t,l,c(e,l));}};},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return "Array"==r(t)};},e95a:function(t,e,n){var r=n("b622"),a=n("3f8c"),i=r("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||o[i]===t)};},ef45:function(t,e,n){},f5df:function(t,e,n){var r=n("00ee"),a=n("c6b6"),i=n("b622"),o=i("toStringTag"),s="Arguments"==a(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(n){}};t.exports=r?a:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=c(e=Object(t),o))?n:s?a(e):"Object"==(r=a(e))&&"function"==typeof e.callee?"Arguments":r};},f6fd:function(t,e){(function(t){var e="currentScript",n=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(r){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(r.stack)||[!1])[1];for(t in n)if(n[t].src==e||"interactive"==n[t].readyState)return n[t];return null}}});})(document);},f772:function(t,e,n){var r=n("5692"),a=n("90e3"),i=r("keys");t.exports=function(t){return i[t]||(i[t]=a(t))};},f8c2:function(t,e,n){var r=n("1c0b");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,a){return t.call(e,n,r,a)}}return function(){return t.apply(e,arguments)}};},fb15:function(t,e,n){var r;(n.r(e),"undefined"!==typeof window)&&(n("f6fd"),(r=window.document.currentScript)&&(r=r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(n.p=r[1]));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-daterange-picker",class:{inline:"inline"===t.opens}},[n("div",{ref:"toggle",class:t.controlContainerClass,on:{click:t.onClickPicker}},[t._t("input",[n("i",{staticClass:"glyphicon glyphicon-calendar fa fa-calendar"}),t._v(" "),n("span",[t._v(t._s(t.rangeText))]),n("b",{staticClass:"caret"})],{startDate:t.start,endDate:t.end,ranges:t.ranges,rangeText:t.rangeText})],2),n("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[t.open||"inline"===t.opens?n("div",{directives:[{name:"append-to-body",rawName:"v-append-to-body"}],ref:"dropdown",staticClass:"daterangepicker ltr",class:t.pickerStyles},[t._t("header",null,{rangeText:t.rangeText,locale:t.locale,clickCancel:t.clickCancel,clickApply:t.clickedApply,in_selection:t.in_selection,autoApply:t.autoApply}),n("div",{staticClass:"calendars"},[t.showRanges?t._t("ranges",[n("calendar-ranges",{staticClass:"col-12 col-md-auto",attrs:{"always-show-calendars":t.alwaysShowCalendars,"locale-data":t.locale,ranges:t.ranges,selected:{startDate:t.start,endDate:t.end}},on:{clickRange:t.clickRange,showCustomRange:function(e){t.showCustomRangeCalendars=!0;}}})],{startDate:t.start,endDate:t.end,ranges:t.ranges,clickRange:t.clickRange}):t._e(),t.showCalendars?n("div",{staticClass:"calendars-container"},[n("div",{staticClass:"drp-calendar col left",class:{single:t.singleDatePicker}},[t._e(),n("div",{staticClass:"calendar-table"},[n("calendar",{attrs:{monthDate:t.monthDate,"locale-data":t.locale,start:t.start,end:t.end,minDate:t.min,maxDate:t.max,"show-dropdowns":t.showDropdowns,"date-format":t.dateFormatFn,showWeekNumbers:t.showWeekNumbers},on:{"change-month":t.changeLeftMonth,dateClick:t.dateClick,hoverDate:t.hoverDate},scopedSlots:t._u([{key:"date-slot",fn:function(e){return t._t("date",null,null,e)}}],null,!0)})],1),t.timePicker&&t.start?n("calendar-time",{attrs:{"miniute-increment":t.timePickerIncrement,hour24:t.timePicker24Hour,"second-picker":t.timePickerSeconds,"current-time":t.start,readonly:t.readonly},on:{update:t.onUpdateStartTime}}):t._e()],1),t.singleDatePicker?t._e():n("div",{staticClass:"drp-calendar col right"},[t._e(),n("div",{staticClass:"calendar-table"},[n("calendar",{attrs:{monthDate:t.nextMonthDate,"locale-data":t.locale,start:t.start,end:t.end,minDate:t.min,maxDate:t.max,"show-dropdowns":t.showDropdowns,"date-format":t.dateFormatFn,showWeekNumbers:t.showWeekNumbers},on:{"change-month":t.changeRightMonth,dateClick:t.dateClick,hoverDate:t.hoverDate},scopedSlots:t._u([{key:"date-slot",fn:function(e){return t._t("date",null,null,e)}}],null,!0)})],1),t.timePicker&&t.end?n("calendar-time",{attrs:{"miniute-increment":t.timePickerIncrement,hour24:t.timePicker24Hour,"second-picker":t.timePickerSeconds,"current-time":t.end,readonly:t.readonly},on:{update:t.onUpdateEndTime}}):t._e()],1)]):t._e()],2),t._t("footer",[t.autoApply?t._e():n("div",{staticClass:"drp-buttons"},[t.showCalendars?n("span",{staticClass:"drp-selected"},[t._v(t._s(t.rangeText))]):t._e(),t.readonly?t._e():n("button",{staticClass:"cancelBtn btn btn-sm btn-secondary",attrs:{type:"button"},on:{click:t.clickCancel}},[t._v(t._s(t.locale.cancelLabel)+" ")]),t.readonly?t._e():n("button",{staticClass:"applyBtn btn btn-sm btn-success",attrs:{disabled:t.in_selection,type:"button"},on:{click:t.clickedApply}},[t._v(t._s(t.locale.applyLabel)+" ")])])],{rangeText:t.rangeText,locale:t.locale,clickCancel:t.clickCancel,clickApply:t.clickedApply,in_selection:t.in_selection,autoApply:t.autoApply})],2):t._e()])],1)},i=[],o=(n("a4d3"),n("4de4"),n("7db0"),n("a9e3"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("53ca"));function s(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){return s(t)||c(t)||u()}var f=n("ade3"),d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"native";return t instanceof Object?t:"string"===typeof t||t instanceof String?n("a6da")("./"+t).default:void 0},h={props:{dateUtil:{type:[Object,String],default:"native"}},created:function(){this.$dateUtil=d("native");}},p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"table-condensed"},[n("thead",[n("tr",[n("th",{staticClass:"prev available",attrs:{tabindex:"0"},on:{click:t.prevMonthClick}},[n("span")]),t.showDropdowns?n("th",{staticClass:"month",attrs:{colspan:t.showWeekNumbers?6:5}},[n("div",{staticClass:"row mx-1"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.month,expression:"month"}],staticClass:"monthselect col",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.month=e.target.multiple?n:n[0];}}},t._l(t.months,(function(e){return n("option",{key:e.value,domProps:{value:e.value+1}},[t._v(t._s(e.label))])})),0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.year,expression:"year"}],ref:"yearSelect",staticClass:"yearselect col",attrs:{type:"number"},domProps:{value:t.year},on:{blur:t.checkYear,input:function(e){e.target.composing||(t.year=e.target.value);}}})])]):n("th",{staticClass:"month",attrs:{colspan:t.showWeekNumbers?6:5}},[t._v(t._s(t.monthName)+" "+t._s(t.year))]),n("th",{staticClass:"next available",attrs:{tabindex:"0"},on:{click:t.nextMonthClick}},[n("span")])])]),n("tbody",[n("tr",[t.showWeekNumbers?n("th",{staticClass:"week"},[t._v(t._s(t.locale.weekLabel))]):t._e(),t._l(t.locale.daysOfWeek,(function(e){return n("th",{key:e},[t._v(t._s(e))])}))],2),t._l(t.calendar,(function(e,r){return n("tr",{key:r},[t.showWeekNumbers&&(r%7||0===r)?n("td",{staticClass:"week"},[t._v(" "+t._s(t.$dateUtil.weekNumber(e[0]))+" ")]):t._e(),t._l(e,(function(e,r){return n("td",{key:r,class:t.dayClass(e),on:{click:function(n){return t.$emit("dateClick",e)},mouseover:function(n){return t.$emit("hoverDate",e)}}},[t._t("date-slot",[t._v(" "+t._s(e.getDate())+" ")],{date:e})],2)}))],2)}))],2)])},m=[],v=(n("d81d"),{mixins:[h],name:"calendar",props:{monthDate:Date,localeData:Object,start:Date,end:Date,minDate:Date,maxDate:Date,showDropdowns:{type:Boolean,default:!1},showWeekNumbers:{type:Boolean,default:!1},dateFormat:{type:Function,default:null}},data:function(){var t=this.monthDate||this.start||new Date;return {currentMonthDate:t,year_text:t.getFullYear()}},methods:{prevMonthClick:function(){this.changeMonthDate(this.$dateUtil.prevMonth(this.currentMonthDate));},nextMonthClick:function(){this.changeMonthDate(this.$dateUtil.nextMonth(this.currentMonthDate));},changeMonthDate:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$dateUtil.yearMonth(this.currentMonthDate);this.currentMonthDate=this.$dateUtil.validateDateRange(t,this.minDate,this.maxDate),e&&n!==this.$dateUtil.yearMonth(this.currentMonthDate)&&this.$emit("change-month",{month:this.currentMonthDate.getMonth()+1,year:this.currentMonthDate.getFullYear()}),this.checkYear();},dayClass:function(t){var e=new Date(t);e.setHours(0,0,0,0);var n=new Date(this.start);n.setHours(0,0,0,0);var r=new Date(this.end);r.setHours(0,0,0,0);var a={off:t.getMonth()+1!==this.month,weekend:6===t.getDay()||0===t.getDay(),today:e.setHours(0,0,0,0)==(new Date).setHours(0,0,0,0),active:e.setHours(0,0,0,0)==new Date(this.start).setHours(0,0,0,0)||e.setHours(0,0,0,0)==new Date(this.end).setHours(0,0,0,0),"in-range":e>=n&&e<=r,"start-date":e.getTime()===n.getTime(),"end-date":e.getTime()===r.getTime(),disabled:this.minDate&&e.getTime()<this.minDate.getTime()||this.maxDate&&e.getTime()>this.maxDate.getTime()};return this.dateFormat?this.dateFormat(a,t):a},checkYear:function(){var t=this;this.$refs.yearSelect!==document.activeElement&&this.$nextTick((function(){t.year_text=t.monthDate.getFullYear();}));}},computed:{monthName:function(){return this.locale.monthNames[this.currentMonthDate.getMonth()]},year:{get:function(){return this.year_text},set:function(t){this.year_text=t;var e=this.$dateUtil.validateDateRange(new Date(t,this.month,1),this.minDate,this.maxDate);this.$dateUtil.isValidDate(e)&&this.$emit("change-month",{month:e.getMonth(),year:e.getFullYear()});}},month:{get:function(){return this.currentMonthDate.getMonth()+1},set:function(t){var e=this.$dateUtil.validateDateRange(new Date(this.year,t-1,1),this.minDate,this.maxDate);this.$emit("change-month",{month:e.getMonth()+1,year:e.getFullYear()});}},calendar:function(){for(var t=this.month,e=this.currentMonthDate.getFullYear(),n=new Date(e,t-1,1),r=this.$dateUtil.prevMonth(n).getMonth()+1,a=this.$dateUtil.prevMonth(n).getFullYear(),i=new Date(a,t-1,0).getDate(),o=n.getDay(),s=[],c=0;c<6;c++)s[c]=[];var u=i-o+this.locale.firstDay+1;u>i&&(u-=7),o===this.locale.firstDay&&(u=i-6);for(var l=new Date(a,r-1,u,12,0,0),f=0,d=0,h=0;f<42;f++,d++,l.setDate(l.getDate()+1))f>0&&d%7===0&&(d=0,h++),s[h][d]=new Date(l.getTime());return s},months:function(){var t=this.locale.monthNames.map((function(t,e){return {label:t,value:e}}));if(this.maxDate&&this.minDate){var e=this.maxDate.getFullYear()-this.minDate.getFullYear();if(e<2){var n=[];if(e<1)for(var r=this.minDate.getMonth();r<=this.maxDate.getMonth();r++)n.push(r);else {for(var a=0;a<=this.maxDate.getMonth();a++)n.push(a);for(var i=this.minDate.getMonth();i<12;i++)n.push(i);}if(n.length>0)return t.filter((function(t){return n.find((function(e){return t.value===e}))>-1}))}}return t},locale:function(){return this.$dateUtil.localeData(this.localeData)}},watch:{monthDate:function(t){this.currentMonthDate.getTime()!==t.getTime()&&this.changeMonthDate(t,!1);}}}),g=v;n("76b6");function y(t,e,n,r,a,i,o,s){var c,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o);},u._ssrRegister=c):a&&(c=s?function(){a.call(this,this.$root.$options.shadowRoot);}:a),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)};}else {var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c];}return {exports:t,options:u}}var b=y(g,p,m,!1,null,"155e681b",null),D=b.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"calendar-time"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.hour,expression:"hour"}],staticClass:"hourselect form-control mr-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.hour=e.target.multiple?n:n[0];}}},t._l(t.hours,(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(t._f("formatNumber")(e)))])})),0),t._v(" :"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.minute,expression:"minute"}],staticClass:"minuteselect form-control ml-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.minute=e.target.multiple?n:n[0];}}},t._l(t.minutes,(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(t._f("formatNumber")(e)))])})),0),t.secondPicker?[t._v(" :"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.second,expression:"second"}],staticClass:"secondselect form-control ml-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.second=e.target.multiple?n:n[0];}}},t._l(60,(function(e){return n("option",{key:e-1,domProps:{value:e-1}},[t._v(t._s(t._f("formatNumber")(e-1)))])})),0)]:t._e(),t.hour24?t._e():n("select",{directives:[{name:"model",rawName:"v-model",value:t.ampm,expression:"ampm"}],staticClass:"ampmselect",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.ampm=e.target.multiple?n:n[0];}}},[n("option",{attrs:{value:"AM"}},[t._v("AM")]),n("option",{attrs:{value:"PM"}},[t._v("PM")])])],2)},x=[],S={filters:{formatNumber:function(t){return t<10?"0"+t.toString():t.toString()}},props:{miniuteIncrement:{type:Number,default:5},hour24:{type:Boolean,default:!0},secondPicker:{type:Boolean,default:!1},currentTime:{default:function(){return new Date}},readonly:{type:Boolean,default:!1}},data:function(){var t=this.currentTime?this.currentTime:new Date,e=t.getHours();return {hour:this.hour24?e:e%12||12,minute:t.getMinutes()-t.getMinutes()%this.miniuteIncrement,second:t.getSeconds(),ampm:e<12?"AM":"PM"}},computed:{hours:function(){for(var t=[],e=this.hour24?24:12,n=0;n<e;n++)t.push(this.hour24?n:n+1);return t},minutes:function(){for(var t=[],e=60,n=0;n<e;n+=this.miniuteIncrement)t.push(n);return t}},watch:{hour:function(){this.onChange();},minute:function(){this.onChange();},second:function(){this.onChange();},ampm:function(){this.onChange();}},methods:{getHour:function(){return this.hour24?this.hour:12===this.hour?"AM"===this.ampm?0:12:this.hour+("PM"===this.ampm?12:0)},onChange:function(){this.$emit("update",{hours:this.getHour(),minutes:this.minute,seconds:this.second});}}},k=S,M=y(k,w,x,!1,null,null,null),_=M.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ranges"},[t.ranges?n("ul",[t._l(t.listedRanges,(function(e){return n("li",{key:e.label,class:t.range_class(e),attrs:{"data-range-key":e.label,tabindex:"0"},on:{click:function(n){return t.clickRange(e.value)}}},[t._v(t._s(e.label)+" ")])})),t.showCustomRangeLabel?n("li",{class:{active:t.customRangeActive||!t.selectedRange},attrs:{tabindex:"0"},on:{click:t.clickCustomRange}},[t._v(" "+t._s(t.localeData.customRangeLabel)+" ")]):t._e()],2):t._e()])},C=[],T={mixins:[h],props:{ranges:Object,selected:Object,localeData:Object,alwaysShowCalendars:Boolean},data:function(){return {customRangeActive:!1}},methods:{clickRange:function(t){this.customRangeActive=!1,this.$emit("clickRange",t);},clickCustomRange:function(){this.customRangeActive=!0,this.$emit("showCustomRange");},range_class:function(t){return {active:!0===t.selected}}},computed:{listedRanges:function(){var t=this;return !!this.ranges&&Object.keys(this.ranges).map((function(e){return {label:e,value:t.ranges[e],selected:t.$dateUtil.isSame(t.selected.startDate,t.ranges[e][0])&&t.$dateUtil.isSame(t.selected.endDate,t.ranges[e][1])}}))},selectedRange:function(){return this.listedRanges.find((function(t){return !0===t.selected}))},showCustomRangeLabel:function(){return !this.alwaysShowCalendars}}},P=T,j=y(P,O,C,!1,null,null,null),A=j.exports,R={inserted:function(t,e,n){var r=n.context;if(r.appendToBody){var a=r.$refs.toggle.getBoundingClientRect(),i=a.height,o=a.top,s=a.left,c=a.width,u=a.right;t.unbindPosition=r.calculatePosition(t,r,{width:c,top:window.scrollY+o+i,left:window.scrollX+s,right:u}),document.body.appendChild(t);}else r.$el.appendChild(t);},unbind:function(t,e,n){var r=n.context;r.appendToBody&&(t.unbindPosition&&"function"===typeof t.unbindPosition&&t.unbindPosition(),t.parentNode&&t.parentNode.removeChild(t));}};function N(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r);}return n}function $(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?N(Object(n),!0).forEach((function(e){Object(f["a"])(t,e,n[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e));}));}return t}var E={inheritAttrs:!1,components:{Calendar:D,CalendarTime:_,CalendarRanges:A},mixins:[h],directives:{appendToBody:R},model:{prop:"dateRange",event:"update"},props:{minDate:{type:[String,Date],default:function(){return null}},maxDate:{type:[String,Date],default:function(){return null}},showWeekNumbers:{type:Boolean,default:!1},linkedCalendars:{type:Boolean,default:!0},singleDatePicker:{type:[Boolean,String],default:!1},showDropdowns:{type:Boolean,default:!1},timePicker:{type:Boolean,default:!1},timePickerIncrement:{type:Number,default:5},timePicker24Hour:{type:Boolean,default:!0},timePickerSeconds:{type:Boolean,default:!1},autoApply:{type:Boolean,default:!1},localeData:{type:Object,default:function(){return {}}},dateRange:{type:[Object],default:null,required:!0},ranges:{type:[Object,Boolean],default:function(){var t=new Date;t.setHours(0,0,0,0);var e=new Date;e.setHours(11,59,59,999);var n=new Date;n.setDate(t.getDate()-1),n.setHours(0,0,0,0);var r=new Date;r.setDate(t.getDate()-1),r.setHours(11,59,59,999);var a=new Date(t.getFullYear(),t.getMonth(),1),i=new Date(t.getFullYear(),t.getMonth()+1,0,11,59,59,999);return {Today:[t,e],Yesterday:[n,r],"This month":[a,i],"This year":[new Date(t.getFullYear(),0,1),new Date(t.getFullYear(),11,31,11,59,59,999)],"Last month":[new Date(t.getFullYear(),t.getMonth()-1,1),new Date(t.getFullYear(),t.getMonth(),0,11,59,59,999)]}}},opens:{type:String,default:"center"},dateFormat:Function,alwaysShowCalendars:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},controlContainerClass:{type:[Object,String],default:"form-control reportrange-text"},appendToBody:{type:Boolean,default:!1},calculatePosition:{type:Function,default:function(t,e,n){var r=n.width,a=n.top,i=n.left,o=n.right;"center"===e.opens?t.style.left=i+r/2+"px":"left"===e.opens?t.style.right=window.innerWidth-o+"px":"right"===e.opens&&(t.style.left=i+"px"),t.style.top=a+"px";}},closeOnEsc:{type:Boolean,default:!0},readonly:{type:Boolean}},data:function(){var t=d(),e={locale:t.localeData($({},this.localeData))},n=this.dateRange.startDate||null,r=this.dateRange.endDate||null;if(e.monthDate=n?new Date(n):new Date,e.nextMonthDate=t.nextMonth(e.monthDate),e.start=n?new Date(n):null,this.singleDatePicker&&"range"!==this.singleDatePicker?e.end=e.start:e.end=r?new Date(r):null,e.in_selection=!1,e.open=!1,e.showCustomRangeCalendars=!1,0!==e.locale.firstDay){var a=e.locale.firstDay,i=l(e.locale.daysOfWeek);while(a>0)i.push(i.shift()),a--;e.locale.daysOfWeek=i;}return e},methods:{dateFormatFn:function(t,e){var n=new Date(e);n.setHours(0,0,0,0);var r=new Date(this.start);r.setHours(0,0,0,0);var a=new Date(this.end);return a.setHours(0,0,0,0),t["in-range"]=n>=r&&n<=a,this.dateFormat?this.dateFormat(t,e):t},changeLeftMonth:function(t){var e=new Date(t.year,t.month-1,1);this.monthDate=e,(this.linkedCalendars||this.$dateUtil.yearMonth(this.monthDate)>=this.$dateUtil.yearMonth(this.nextMonthDate))&&(this.nextMonthDate=this.$dateUtil.validateDateRange(this.$dateUtil.nextMonth(e),this.minDate,this.maxDate),this.singleDatePicker&&"range"!==this.singleDatePicker||this.$dateUtil.yearMonth(this.monthDate)!==this.$dateUtil.yearMonth(this.nextMonthDate)||(this.monthDate=this.$dateUtil.validateDateRange(this.$dateUtil.prevMonth(this.monthDate),this.minDate,this.maxDate))),this.$emit("change-month",this.monthDate,0);},changeRightMonth:function(t){var e=new Date(t.year,t.month-1,1);this.nextMonthDate=e,(this.linkedCalendars||this.$dateUtil.yearMonth(this.nextMonthDate)<=this.$dateUtil.yearMonth(this.monthDate))&&(this.monthDate=this.$dateUtil.validateDateRange(this.$dateUtil.prevMonth(e),this.minDate,this.maxDate),this.$dateUtil.yearMonth(this.monthDate)===this.$dateUtil.yearMonth(this.nextMonthDate)&&(this.nextMonthDate=this.$dateUtil.validateDateRange(this.$dateUtil.nextMonth(this.nextMonthDate),this.minDate,this.maxDate))),this.$emit("change-month",this.monthDate,1);},normalizeDatetime:function(t,e){var n=new Date(t);return this.timePicker&&e&&(n.setHours(e.getHours()),n.setMinutes(e.getMinutes()),n.setSeconds(e.getSeconds()),n.setMilliseconds(e.getMilliseconds())),n},dateClick:function(t){if(this.readonly)return !1;this.in_selection?(this.in_selection=!1,this.end=this.normalizeDatetime(t,this.end),this.end<this.start&&(this.in_selection=!0,this.start=this.normalizeDatetime(t,this.start),this.$emit("startSelection",this.start)),this.in_selection||(this.$emit("finishSelection",this.end),this.onSelect(),this.autoApply&&this.clickedApply())):(this.start=this.normalizeDatetime(t,this.start),this.end=this.normalizeDatetime(t,this.end),this.singleDatePicker&&"range"!==this.singleDatePicker?(this.onSelect(),this.autoApply&&this.clickedApply()):(this.in_selection=!0,this.$emit("startSelection",this.start)));},hoverDate:function(t){if(this.readonly)return !1;var e=this.normalizeDatetime(t,this.end);this.in_selection&&e>=this.start&&(this.end=e),this.$emit("hoverDate",t);},onClickPicker:function(){this.disabled||this.togglePicker(null,!0);},togglePicker:function(t,e){this.open="boolean"===typeof t?t:!this.open,!0===e&&this.$emit("toggle",this.open,this.togglePicker);},clickedApply:function(){this.togglePicker(!1,!0),this.$emit("update",{startDate:this.start,endDate:this.singleDatePicker&&"range"!==this.singleDatePicker?this.start:this.end});},clickCancel:function(){if(this.open){var t=this.dateRange.startDate,e=this.dateRange.endDate;this.start=t?new Date(t):null,this.end=e?new Date(e):null,this.in_selection=!1,this.togglePicker(!1,!0);}},onSelect:function(){this.$emit("select",{startDate:this.start,endDate:this.end});},clickAway:function(t){t&&t.target&&!this.$el.contains(t.target)&&this.$refs.dropdown&&!this.$refs.dropdown.contains(t.target)&&this.clickCancel();},clickRange:function(t){this.in_selection=!1,this.$dateUtil.isValidDate(t[0])&&this.$dateUtil.isValidDate(t[1])?(this.start=this.$dateUtil.validateDateRange(new Date(t[0]),this.minDate,this.maxDate),this.end=this.$dateUtil.validateDateRange(new Date(t[1]),this.minDate,this.maxDate),this.changeLeftMonth({month:this.start.getMonth()+1,year:this.start.getFullYear()})):(this.start=null,this.end=null),this.onSelect(),this.autoApply&&this.clickedApply();},onUpdateStartTime:function(t){var e=new Date(this.start);e.setHours(t.hours),e.setMinutes(t.minutes),e.setSeconds(t.seconds),this.start=this.$dateUtil.validateDateRange(e,this.minDate,this.maxDate),this.autoApply&&this.$emit("update",{startDate:this.start,endDate:this.singleDatePicker&&"range"!==this.singleDatePicker?this.start:this.end});},onUpdateEndTime:function(t){var e=new Date(this.end);e.setHours(t.hours),e.setMinutes(t.minutes),e.setSeconds(t.seconds),this.end=this.$dateUtil.validateDateRange(e,this.minDate,this.maxDate),this.autoApply&&this.$emit("update",{startDate:this.start,endDate:this.end});},handleEscape:function(t){this.open&&27===t.keyCode&&this.closeOnEsc&&this.clickCancel();}},computed:{showRanges:function(){return !1!==this.ranges&&!this.readonly},showCalendars:function(){return this.alwaysShowCalendars||this.showCustomRangeCalendars},startText:function(){return null===this.start?"":this.$dateUtil.format(this.start,this.locale.format)},endText:function(){return null===this.end?"":this.$dateUtil.format(this.end,this.locale.format)},rangeText:function(){var t=this.startText;return this.singleDatePicker&&"range"!==this.singleDatePicker||(t+=this.locale.separator+this.endText),t},min:function(){return this.minDate?new Date(this.minDate):null},max:function(){return this.maxDate?new Date(this.maxDate):null},pickerStyles:function(){var t;return t={"show-calendar":this.open||"inline"===this.opens,"show-ranges":this.showRanges,"show-weeknumbers":this.showWeekNumbers,single:this.singleDatePicker},Object(f["a"])(t,"opens"+this.opens,!0),Object(f["a"])(t,"linked",this.linkedCalendars),Object(f["a"])(t,"hide-calendars",!this.showCalendars),t},isClear:function(){return !this.dateRange.startDate||!this.dateRange.endDate},isDirty:function(){var t=new Date(this.dateRange.startDate),e=new Date(this.dateRange.endDate);return !this.isClear&&(this.start.getTime()!==t.getTime()||this.end.getTime()!==e.getTime())}},watch:{minDate:function(){var t=this.$dateUtil.validateDateRange(this.monthDate,this.minDate||new Date,this.maxDate);this.changeLeftMonth({year:t.getFullYear(),month:t.getMonth()+1});},maxDate:function(){var t=this.$dateUtil.validateDateRange(this.nextMonthDate,this.minDate,this.maxDate||new Date);this.changeRightMonth({year:t.getFullYear(),month:t.getMonth()+1});},"dateRange.startDate":function(t){this.$dateUtil.isValidDate(new Date(t))&&(this.start=t&&!this.isClear&&this.$dateUtil.isValidDate(new Date(t))?new Date(t):null,this.isClear?(this.start=null,this.end=null):(this.start=new Date(this.dateRange.startDate),this.end=new Date(this.dateRange.endDate)));},"dateRange.endDate":function(t){this.$dateUtil.isValidDate(new Date(t))&&(this.end=t&&!this.isClear?new Date(t):null,this.isClear?(this.start=null,this.end=null):(this.start=new Date(this.dateRange.startDate),this.end=new Date(this.dateRange.endDate)));},open:{handler:function(t){var e=this;"object"===("undefined"===typeof document?"undefined":Object(o["a"])(document))&&this.$nextTick((function(){t?document.body.addEventListener("click",e.clickAway):document.body.removeEventListener("click",e.clickAway),t?document.addEventListener("keydown",e.handleEscape):document.removeEventListener("keydown",e.handleEscape),!e.alwaysShowCalendars&&e.ranges&&(e.showCustomRangeCalendars=!Object.keys(e.ranges).find((function(t){return e.$dateUtil.isSame(e.start,e.ranges[t][0],"date")&&e.$dateUtil.isSame(e.end,e.ranges[t][1],"date")})));}));},immediate:!0}}},F=E,U=(n("0e58"),n("9b47"),y(F,a,i,!1,null,"4391f606",null)),I=U.exports,L=I;e["default"]=L;},fb6a:function(t,e,n){var r=n("23e7"),a=n("861d"),i=n("e8b5"),o=n("23cb"),s=n("50c4"),c=n("fc6a"),u=n("8418"),l=n("1dde"),f=n("b622"),d=f("species"),h=[].slice,p=Math.max;r({target:"Array",proto:!0,forced:!l("slice")},{slice:function(t,e){var n,r,l,f=c(this),m=s(f.length),v=o(t,m),g=o(void 0===e?m:e,m);if(i(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?a(n)&&(n=n[d],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(f,v,g);for(r=new(void 0===n?Array:n)(p(g-v,0)),l=0;v<g;v++,l++)v in f&&u(r,l,f[v]);return r.length=l,r}});},fc6a:function(t,e,n){var r=n("44ad"),a=n("1d80");t.exports=function(t){return r(a(t))};},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0};},fdbf:function(t,e,n){var r=n("4930");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol();}})}));

    });

    var DateRangePicker = /*@__PURE__*/getDefaultExportFromCjs(vue2DaterangePicker_umd_min);

    var dateRangePickerStyles = "td[data-v-155e681b],th[data-v-155e681b]{padding:2px;background-color:#fff}td.today[data-v-155e681b]{font-weight:700}td.disabled[data-v-155e681b]{pointer-events:none;background-color:#eee;border-radius:0;opacity:.6}.fa[data-v-155e681b]{display:inline-block;width:100%;height:100%;background:transparent no-repeat 50%;background-size:100% 100%;fill:#ccc}.next[data-v-155e681b]:hover,.prev[data-v-155e681b]:hover{background-color:transparent!important}.next .fa[data-v-155e681b]:hover,.prev .fa[data-v-155e681b]:hover{opacity:.6}.chevron-left[data-v-155e681b]{width:16px;height:16px;display:block;background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 10 10'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\")}.chevron-right[data-v-155e681b]{width:16px;height:16px;display:block;background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 10 10'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\")}.yearselect[data-v-155e681b]{padding-right:1px;border:none;-webkit-appearance:menulist;-moz-appearance:menulist;appearance:menulist}.monthselect[data-v-155e681b]{border:none}.daterangepicker .ranges{text-align:left;margin:0;width:100%}.daterangepicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.daterangepicker .ranges li{font-size:12px;padding:8px 12px;cursor:pointer}.daterangepicker .ranges li:hover{background-color:#eee;color:#000}.daterangepicker .ranges li.active{background-color:#08c;color:#fff}.daterangepicker .monthselect,.daterangepicker .yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default;width:calc(50% - 1rem)}.daterangepicker .monthselect{margin-right:1rem}.daterangepicker .calendar-time{text-align:center;margin:4px auto 0 auto;line-height:30px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.daterangepicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.daterangepicker select.ampmselect,.daterangepicker select.hourselect,.daterangepicker select.minuteselect,.daterangepicker select.secondselect{width:50px;margin:2px;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.daterangepicker .drp-buttons .btn{margin-left:8px;font-size:12px;font-weight:700;padding:4px 8px}.daterangepicker .btn{display:inline-block;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent}.daterangepicker .btn-primary,.daterangepicker .btn-success{background-color:#28a745;color:#fff}.daterangepicker .btn-secondary{background-color:#6c757d;color:#fff}.vue-daterange-picker *,.vue-daterange-picker :after,.vue-daterange-picker :before{-webkit-box-sizing:border-box;box-sizing:border-box}.drp-calendar .col .left{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.daterangepicker.hide-calendars.show-ranges .ranges,.daterangepicker.hide-calendars.show-ranges .ranges ul{width:100%}.daterangepicker .calendars-container{display:-webkit-box;display:-ms-flexbox;display:flex}.daterangepicker[readonly]{pointer-events:none}.daterangepicker{position:absolute;color:inherit;background-color:#fff;border-radius:4px;border:1px solid #ddd;width:278px;max-width:none;padding:0;margin-top:7px;top:100px;left:20px;z-index:3001;display:none;font-size:15px;line-height:1em}.daterangepicker:after,.daterangepicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.daterangepicker:before{top:-7px;border-right:7px solid transparent;border-left:7px solid transparent;border-bottom:7px solid #ccc}.daterangepicker:after{top:-6px;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent}.daterangepicker.opensleft:before{right:9px}.daterangepicker.opensleft:after{right:10px}.daterangepicker.openscenter:after,.daterangepicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.daterangepicker.opensright:before{left:9px}.daterangepicker.opensright:after{left:10px}.daterangepicker.drop-up{margin-top:-7px}.daterangepicker.drop-up:before{top:auto;bottom:-7px;border-bottom:initial;border-top:7px solid #ccc}.daterangepicker.drop-up:after{top:auto;bottom:-6px;border-bottom:initial;border-top:6px solid #fff}.daterangepicker.single .drp-selected{display:none}.daterangepicker.show-calendar .drp-buttons,.daterangepicker.show-calendar .drp-calendar{display:block}.daterangepicker.auto-apply .drp-buttons{display:none}.daterangepicker .drp-calendar{display:none;max-width:270px;width:270px}.daterangepicker .drp-calendar.left{padding:8px 0 8px 8px}.daterangepicker .drp-calendar.right{padding:8px}.daterangepicker .drp-calendar.single .calendar-table{border:none}.daterangepicker .calendar-table .next span,.daterangepicker .calendar-table .prev span{color:#fff;border:solid #000;border-width:0 2px 2px 0;border-radius:0;display:inline-block;padding:3px}.daterangepicker .calendar-table .next span{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.daterangepicker .calendar-table .prev span{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.daterangepicker .calendar-table td,.daterangepicker .calendar-table th{white-space:nowrap;text-align:center;vertical-align:middle;min-width:32px;width:32px;height:24px;line-height:24px;font-size:12px;border-radius:4px;border:1px solid transparent;cursor:pointer}.daterangepicker .calendar-table{border:1px solid #fff;border-radius:4px;background-color:#fff}.daterangepicker .calendar-table table{width:100%;margin:0;border-spacing:0;border-collapse:collapse;display:table}.daterangepicker td.available:hover,.daterangepicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit}.daterangepicker td.week,.daterangepicker th.week{font-size:80%;color:#ccc}.daterangepicker td.off,.daterangepicker td.off.end-date,.daterangepicker td.off.in-range,.daterangepicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.daterangepicker td.in-range{background-color:#ebf4f8;border-color:transparent;color:#000;border-radius:0}.daterangepicker td.start-date{border-radius:4px 0 0 4px}.daterangepicker td.end-date{border-radius:0 4px 4px 0}.daterangepicker td.start-date.end-date{border-radius:4px}.daterangepicker td.active,.daterangepicker td.active:hover{background-color:#357ebd;border-color:transparent;color:#fff}.daterangepicker th.month{width:auto}.daterangepicker option.disabled,.daterangepicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.daterangepicker select.yearselect{width:40%}.daterangepicker .drp-buttons{clear:both;text-align:right;padding:8px;border-top:1px solid #ddd;display:none;line-height:12px;vertical-align:middle}.daterangepicker .drp-selected{display:inline-block;font-size:12px;padding-right:8px}.daterangepicker.show-ranges .drp-calendar.left{border-left:1px solid #ddd}.daterangepicker.show-calendar .ranges{margin-top:8px;width:auto}@media (min-width:564px){.daterangepicker{width:auto}.daterangepicker .ranges ul{width:140px}.daterangepicker.single .ranges ul{width:100%}.daterangepicker.single .drp-calendar.left{clear:none}.daterangepicker.ltr{direction:ltr;text-align:left}.daterangepicker.ltr .drp-calendar.left{clear:left;margin-right:0}.daterangepicker.ltr .drp-calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.ltr .drp-calendar.right{margin-left:0}.daterangepicker.ltr .drp-calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.ltr .drp-calendar.left .calendar-table{padding-right:8px}.daterangepicker.rtl{direction:rtl;text-align:right}.daterangepicker.rtl .drp-calendar.left{clear:right;margin-left:0}.daterangepicker.rtl .drp-calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.rtl .drp-calendar.right{margin-right:0}.daterangepicker.rtl .drp-calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.rtl .drp-calendar.left .calendar-table{padding-left:12px}.daterangepicker.rtl .drp-calendar,.daterangepicker.rtl .ranges{text-align:right}}@media (min-width:730px){.daterangepicker .drp-calendar.left{clear:none!important}}.calendars[data-v-4391f606]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.reportrange-text[data-v-4391f606]{background:#fff;cursor:pointer;padding:5px 10px;border:1px solid #ccc;width:100%}.daterangepicker[data-v-4391f606]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-ms-flexbox;display:flex;width:auto}@media screen and (max-width:768px){.daterangepicker.show-ranges .drp-calendar.left[data-v-4391f606]{border-left:0}.daterangepicker.show-ranges .ranges[data-v-4391f606]{border-bottom:1px solid #ddd;width:100%}.daterangepicker.show-ranges .ranges[data-v-4391f606] ul{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;width:auto}}@media screen and (max-width:541px){.daterangepicker .calendars-container[data-v-4391f606]{-ms-flex-wrap:wrap;flex-wrap:wrap}}@media screen and (min-width:540px){.daterangepicker.show-weeknumbers[data-v-4391f606],.daterangepicker[data-v-4391f606]{min-width:486px}}@media screen and (min-width:768px){.daterangepicker.show-ranges.show-weeknumbers[data-v-4391f606],.daterangepicker.show-ranges[data-v-4391f606]{min-width:682px}}@media screen and (max-width:340px){.daterangepicker.single.show-weeknumbers[data-v-4391f606],.daterangepicker.single[data-v-4391f606]{min-width:250px}}@media screen and (min-width:339px){.daterangepicker.single[data-v-4391f606]{min-width:auto}.daterangepicker.single.show-ranges.show-weeknumbers[data-v-4391f606],.daterangepicker.single.show-ranges[data-v-4391f606]{min-width:356px}.daterangepicker.single.show-ranges .drp-calendar.left[data-v-4391f606]{border-left:1px solid #ddd}.daterangepicker.single.show-ranges .ranges[data-v-4391f606]{max-width:none;-ms-flex-preferred-size:auto;flex-basis:auto;border-bottom:0}.daterangepicker.single.show-ranges .ranges[data-v-4391f606] ul{display:block;width:100%}}.daterangepicker.show-calendar[data-v-4391f606]{display:block;top:auto}.daterangepicker.opensleft[data-v-4391f606]{right:10px;left:auto}.daterangepicker.openscenter[data-v-4391f606]{right:auto;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.daterangepicker.opensright[data-v-4391f606]{left:10px;right:auto}.slide-fade-enter-active[data-v-4391f606]{-webkit-transition:all .2s ease;transition:all .2s ease}.slide-fade-leave-active[data-v-4391f606]{-webkit-transition:all .1s cubic-bezier(1,.5,.8,1);transition:all .1s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-4391f606],.slide-fade-leave-to[data-v-4391f606]{-webkit-transform:translateX(10px);transform:translateX(10px);opacity:0}.vue-daterange-picker[data-v-4391f606]{position:relative;display:inline-block;min-width:60px}.vue-daterange-picker .show-ranges.hide-calendars[data-v-4391f606]{width:150px;min-width:150px}.inline .daterangepicker[data-v-4391f606]{position:static}.inline .daterangepicker[data-v-4391f606]:after,.inline .daterangepicker[data-v-4391f606]:before{display:none}";

    const Component = Vue.extend({
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            startDate: {
                type: [String, Date],
                default() {
                    return new Date();
                },
            },
            endDate: {
                type: [String, Date],
                default() {
                    return new Date();
                },
            },
        },
        render(createElement) {
            // @ts-ignore
            return createElement(DateRangePicker, {
                props: {
                    "time-picker": false,
                    "auto-apply": false,
                    opens: "right",
                    "show-dropdowns": false,
                    // @ts-ignore
                    disabled: this.disabled,
                    // @ts-ignore
                    ranges: this.ranges ? {} : false,
                },
                model: {
                    value: {
                        // @ts-ignore
                        startDate: this.startDate,
                        // @ts-ignore
                        endDate: this.endDate,
                    },
                    callback: (value) => {
                        // @ts-ignore
                        R$1(this.$el, "change", value);
                    },
                    expression: "dateRange",
                },
                scopedSlots: {
                    input() {
                        return createElement("slot", {
                            domProps: { name: "input" },
                        });
                    },
                    header() {
                        return createElement("slot", {
                            domProps: { name: "header" },
                        });
                    },
                    footer() {
                        return createElement("slot", {
                            domProps: { name: "footer" },
                        });
                    },
                },
            });
        },
    });
    // @ts-ignore
    const WrappedElement = wrap(Vue, Component);
    let VueDatePicker = class VueDatePicker extends WrappedElement {
        constructor() {
            super();
            const style = document.createElement("style");
            style.innerHTML = `
          ${dateRangePickerStyles}
          .calendars {
            display: flex;
          }
          .daterangepicker {
            left: 0px !important;
            top: auto;
            background-color: var(--card-background-color);
            border: none;
            border-radius: var(--ha-card-border-radius, 4px);
            box-shadow: var(
              --ha-card-box-shadow,
              0px 2px 1px -1px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 1px 3px 0px rgba(0, 0, 0, 0.12)
            );
            color: var(--primary-text-color);
            min-width: initial !important;
          }
          .daterangepicker:after {
            border-bottom: 6px solid var(--card-background-color);
          }
          .daterangepicker .calendar-table {
            background-color: var(--card-background-color);
            border: none;
          }
          .daterangepicker .calendar-table td,
          .daterangepicker .calendar-table th {
            background-color: transparent;
            color: var(--secondary-text-color);
            border-radius: 0;
            outline: none;
            width: 32px;
            height: 32px;
          }
          .daterangepicker td.off,
          .daterangepicker td.off.end-date,
          .daterangepicker td.off.in-range,
          .daterangepicker td.off.start-date {
            background-color: var(--secondary-background-color);
            color: var(--disabled-text-color);
          }
          .daterangepicker td.in-range {
            background-color: var(--light-primary-color);
            color: var(--text-light-primary-color, var(--primary-text-color));
          }
          .daterangepicker td.active,
          .daterangepicker td.active:hover {
            background-color: var(--primary-color);
            color: var(--text-primary-color);
          }
          .daterangepicker td.start-date.end-date {
            border-radius: 50%;
          }
          .daterangepicker td.start-date {
            border-radius: 50% 0 0 50%;
          }
          .daterangepicker td.end-date {
            border-radius: 0 50% 50% 0;
          }
          .reportrange-text {
            background: none !important;
            padding: 0 !important;
            border: none !important;
          }
          .daterangepicker .calendar-table .next span,
          .daterangepicker .calendar-table .prev span {
            border: solid var(--primary-text-color);
            border-width: 0 2px 2px 0;
          }
          .daterangepicker .ranges li {
            outline: none;
          }
          .daterangepicker .ranges li:hover {
            background-color: var(--secondary-background-color);
          }
          .daterangepicker .ranges li.active {
            background-color: var(--primary-color);
            color: var(--text-primary-color);
          }
          .daterangepicker select.ampmselect,
          .daterangepicker select.hourselect,
          .daterangepicker select.minuteselect,
          .daterangepicker select.secondselect {
            background: transparent;
            border: 1px solid var(--divider-color);
            color: var(--primary-color);
          }
          .daterangepicker .drp-buttons .btn {
            border: 1px solid var(--primary-color);
            background-color: transparent;
            color: var(--primary-color);
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
          }
          .calendars-container {
            flex-direction: column;
            align-items: center;
          }
          .drp-calendar.col.right .calendar-table {
            display: none;
          }
          .daterangepicker.show-ranges .drp-calendar.left {
            border-left: 0px;
          }
          .daterangepicker .drp-calendar.left {
            padding: 8px;
          }
          .daterangepicker.show-calendar .ranges {
            margin-top: 0;
            padding-top: 8px;
            border-right: 1px solid var(--divider-color);
          }
          @media only screen and (max-width: 800px) {
            .calendars {
              flex-direction: column;
            }
          }
          .calendar-table {
            padding: 0 !important;
          }
        `;
            const shadowRoot = this.shadowRoot;
            shadowRoot.appendChild(style);
            // Stop click events from reaching the document, otherwise it will close the picker immediately.
            shadowRoot.addEventListener("click", (ev) => ev.stopPropagation());
        }
    };
    VueDatePicker = __decorate([
        n$4('vue-date-picker')
    ], VueDatePicker);
    let SchedulerDatePicker = class SchedulerDatePicker extends h$2 {
        constructor() {
            super(...arguments);
            this._startDate = new Date();
            this._endDate = new Date();
            this.disabled = false;
        }
        set startDate(value) {
            this._startDate = stringToDate(value);
        }
        get startDate() {
            return formatDate(this._startDate, getLocale(this.hass), true);
        }
        set endDate(value) {
            this._endDate = stringToDate(value);
        }
        get endDate() {
            return formatDate(this._endDate, getLocale(this.hass), true);
        }
        render() {
            return T `
      <vue-date-picker
        ?disabled=${this.disabled}
        start-date=${this.startDate}
        end-date=${this.endDate}
        @change=${this._handleUpdate}
      >
        <div slot="input" class="date-range-inputs">
          <paper-input
            .value=${formatDate(this._startDate, getLocale(this.hass))}
            .label=${this.hass.localize("ui.components.date-range-picker.start_date")}
            .disabled=${this.disabled}
            @click=${this._handleInputClick}
            readonly
          ></paper-input>
          <paper-input
            .value=${formatDate(this._endDate, getLocale(this.hass))}
            label=${this.hass.localize("ui.components.date-range-picker.end_date")}
            .disabled=${this.disabled}
            @click=${this._handleInputClick}
            readonly
          ></paper-input>
        </div>
        <div slot="footer" class="date-range-footer">
          <mwc-button @click=${this._cancelDateRange}>
            ${this.hass.localize("ui.common.cancel")}
          </mwc-button>
          <mwc-button @click=${this._applyDateRange}>
            ${this.hass.localize("ui.components.date-range-picker.select")}
          </mwc-button>
        </div>
      </vue-date-picker>
    `;
        }
        _cancelDateRange() {
            this._dateRangePicker.clickCancel();
        }
        _applyDateRange() {
            this._dateRangePicker.clickedApply();
        }
        get _dateRangePicker() {
            const dateRangePicker = this.shadowRoot.querySelector("vue-date-picker");
            return dateRangePicker.vueComponent.$children[0];
        }
        _handleInputClick() {
            // close the date picker, so it will open again on the click event
            if (this._dateRangePicker.open) {
                this._dateRangePicker.open = false;
            }
        }
        _handleUpdate(ev) {
            const value = ev.detail;
            this._startDate = value.startDate;
            this._endDate = value.endDate;
            R$1(this, 'value-changed', {
                value: {
                    startDate: this.startDate,
                    endDate: this.endDate,
                }
            });
        }
        static get styles() {
            return i `
      ha-svg-icon {
        margin-right: 8px;
      }
      .date-range-inputs {
        display: flex;
        align-items: center;
      }
      .date-range-ranges {
        border-right: 1px solid var(--divider-color);
      }
      .date-range-footer {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }
      paper-input {
        display: inline-block;
        max-width: 250px;
      }
      paper-input:last-child {
        margin-left: 8px;
      }
      @media only screen and (max-width: 800px) {
        .date-range-ranges {
          border-right: none;
          border-bottom: 1px solid var(--divider-color);
        }
      }
      @media only screen and (max-width: 500px) {
        paper-input {
          min-width: inherit;
        }
        ha-svg-icon {
          display: none;
        }
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], SchedulerDatePicker.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SchedulerDatePicker.prototype, "startDate", null);
    __decorate([
        e$3()
    ], SchedulerDatePicker.prototype, "_startDate", void 0);
    __decorate([
        e$3()
    ], SchedulerDatePicker.prototype, "endDate", null);
    __decorate([
        e$3()
    ], SchedulerDatePicker.prototype, "_endDate", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SchedulerDatePicker.prototype, "disabled", void 0);
    SchedulerDatePicker = __decorate([
        n$4("scheduler-date-picker")
    ], SchedulerDatePicker);

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
                    actions: entities.map(e => assignAction(e, this.actions[0]))
                };
                this.schedule = oldSchedule
                    ? Object.assign(Object.assign({}, oldSchedule), { timeslots: oldSchedule.timeslots.length == 1 && !oldSchedule.timeslots[0].stop
                            ? [
                                Object.assign(Object.assign({}, oldSchedule.timeslots[0]), { actions: migrateActionConfig(oldSchedule.timeslots[0].actions[0], entities, this.actions, this._hass) || defaultTimeslot.actions })
                            ]
                            : [defaultTimeslot] }) : {
                    weekdays: ['daily'],
                    timeslots: [defaultTimeslot],
                    repeat_type: ERepeatType.Repeat,
                    tags: defaultTags
                };
                this._view = EViews.TimePicker;
            }
            else {
                this.actions = computeActions(entities, this._hass, this._config);
                const defaultTimeslots = [
                    {
                        start: '00:00:00',
                        stop: '08:00:00',
                        actions: []
                    },
                    {
                        start: '08:00:00',
                        stop: '16:00:00',
                        actions: []
                    },
                    {
                        start: '16:00:00',
                        stop: '00:00:00',
                        actions: []
                    }
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
                        tags: defaultTags
                    };
                }
                this._view = EViews.TimeScheme;
            }
        }
        _editActionClick(ev) {
            this.schedule = ev.detail;
            this._view = EViews.NewSchedule;
        }
        _saveItemClick(ev) {
            if (!this._hass)
                return;
            let schedule = ev.detail;
            schedule = Object.assign(Object.assign({}, schedule), { timeslots: schedule.timeslots.map(slot => {
                    var _a;
                    if (!slot.actions || !slot.actions.length)
                        return null;
                    if (slot.actions.some(e => !e.entity_id || p$1(e.entity_id || "") == "notify")) {
                        slot = Object.assign(Object.assign({}, slot), { actions: slot.actions.map(action => !action.entity_id || p$1(action.entity_id || "") == "notify"
                                ? omit(action, "entity_id")
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
                if (IsDefaultName(schedule.name))
                    schedule = Object.assign(Object.assign({}, schedule), { name: "" });
                editSchedule(this._hass, Object.assign(Object.assign({}, schedule), { schedule_id: this.editItem }))
                    .catch(e => handleError(e, this))
                    .then(() => {
                    this.editItem = null;
                    this._view = EViews.Overview;
                });
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
                const result = await new Promise((resolve) => {
                    R$1(this, 'show-dialog', {
                        dialogTag: 'dialog-delete-defective',
                        dialogImport: () => Promise.resolve().then(function () { return dialogDeleteDefective; }),
                        dialogParams: {
                            cancel: () => {
                                resolve(false);
                            },
                            confirm: () => {
                                resolve(true);
                            },
                        }
                    });
                });
                if (result)
                    this._deleteItemClick();
                else
                    this._cancelEditClick();
                return;
            }
            if (this.schedule.timeslots.every(e => e.stop)) {
                this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: calculateTimeline(this.schedule.timeslots) });
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
