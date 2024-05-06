(function (exports) {
    'use strict';

    /******************************************************************************
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

    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(s,t));}return t}toString(){return this.cssText}}const r=t=>new o("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o(n,t,s)},S=(s,n)=>{e?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$1;const e$1=window,r$1=e$1.trustedTypes,h=r$1?r$1.emptyScript:"",o$1=e$1.reactiveElementPolyfillSupport,n$1={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:n$1,reflect:!1,hasChanged:a},d="finalized";class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty(d))return !1;this[d]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c(i));}else void 0!==i&&s.push(c(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$1).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$1;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u[d]=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==o$1||o$1({ReactiveElement:u}),(null!==(s$1=e$1.reactiveElementVersions)&&void 0!==s$1?s$1:e$1.reactiveElementVersions=[]).push("1.6.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$1;const i$1=window,s$2=i$1.trustedTypes,e$2=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$2=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$2,h$1=`<${l$1}>`,r$2=document,u$1=()=>r$2.createComment(""),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$2.createTreeWalker(r$2,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h$1:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$2+w):s+n$2+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$2)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$2),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$2),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$1()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$1());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$2,t+1));)v.push({type:7,index:r}),t+=n$2.length-1;}r++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S$1(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$2).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$2,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S$1(this,t,i),d$1(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$2.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$1()),this.k(u$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S$1(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S$1(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$2?s$2.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S$1(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l$2,o$3;class s$3 extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s$3.finalized=!0,s$3._$litElement$=!0,null===(l$2=globalThis.litElementHydrateSupport)||void 0===l$2||l$2.call(globalThis,{LitElement:s$3});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$3});(null!==(o$3=globalThis.litElementVersions)&&void 0!==o$3?o$3:globalThis.litElementVersions=[]).push("3.3.3");

    const loadHaForm = async () => {
      if (customElements.get("ha-checkbox") && customElements.get("ha-slider") && customElements.get("ha-combo-box")) return;

      await customElements.whenDefined("partial-panel-resolver");
      const ppr = document.createElement('partial-panel-resolver');
      ppr.hass = {
        panels: [{
          url_path: "tmp",
          component_name: "config",
        }]
      };
      ppr._updateRoutes();
      await ppr.routerOptions.routes.tmp.load();

      await customElements.whenDefined("ha-panel-config");
      const cpr = document.createElement("ha-panel-config");
      await cpr.routerOptions.routes.automation.load();
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const e$3=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$4=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$4(n){return (t,o)=>void 0!==o?e$4(n,t,o):i$2(n,t)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function t$2(t){return n$4({...t,state:!0})}

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
     */function e$5(e){return o$4({finisher:(r,t)=>{Object.assign(r.prototype[t],e);}})}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var n$5;const e$6=null!=(null===(n$5=window.HTMLSlotElement)||void 0===n$5?void 0:n$5.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

    var TWeekday;
    (function (TWeekday) {
        TWeekday["Daily"] = "Daily";
        TWeekday["Workday"] = "Workday";
        TWeekday["Weekend"] = "Weekend";
        TWeekday["Monday"] = "Monday";
        TWeekday["Tuesday"] = "Tuesday";
        TWeekday["Wednesday"] = "Wednesday";
        TWeekday["Thursday"] = "Thursday";
        TWeekday["Friday"] = "Friday";
        TWeekday["Saturday"] = "Saturday";
        TWeekday["Sunday"] = "Sunday";
    })(TWeekday || (TWeekday = {}));
    var TConditionLogicType;
    (function (TConditionLogicType) {
        TConditionLogicType["Any"] = "or";
        TConditionLogicType["All"] = "and";
    })(TConditionLogicType || (TConditionLogicType = {}));
    var TConditionMatchType;
    (function (TConditionMatchType) {
        TConditionMatchType["Equal"] = "is";
        TConditionMatchType["Unequal"] = "not";
        TConditionMatchType["Below"] = "below";
        TConditionMatchType["Above"] = "above";
    })(TConditionMatchType || (TConditionMatchType = {}));
    var DisplayItem;
    (function (DisplayItem) {
        DisplayItem["Name"] = "name";
        DisplayItem["RelativeTime"] = "relative-time";
        DisplayItem["AdditionalTasks"] = "additional-tasks";
        DisplayItem["Time"] = "time";
        DisplayItem["Days"] = "days";
        DisplayItem["Entity"] = "entity";
        DisplayItem["Action"] = "action";
        DisplayItem["Tags"] = "tags";
        DisplayItem["Default"] = "default";
    })(DisplayItem || (DisplayItem = {}));
    // export enum SelectorType {
    //   Select = 'Select',
    //   Number = 'Number'
    // }
    // export interface SelectOption {
    //   value: string;
    //   label?: string;
    //   icons?: string;
    // }
    // interface SelectSelector {
    //   type: SelectorType.Select,
    //   options: SelectOption[],
    //   default?: string
    // }
    // interface NumberSelector {
    //   type: SelectorType.Number,
    //   min: number,
    //   max: number,
    //   step: number,
    //   default: number
    // }
    // export type Selector =
    //   | SelectSelector
    //   | NumberSelector
    var SchedulerEvent;
    (function (SchedulerEvent) {
        SchedulerEvent["ItemCreated"] = "scheduler_item_created";
        SchedulerEvent["ItemUpdated"] = "scheduler_item_updated";
        SchedulerEvent["ItemRemoved"] = "scheduler_item_removed";
        SchedulerEvent["TimerFinished"] = "scheduler_timer_finished";
        SchedulerEvent["TimerUpdated"] = "scheduler_timer_updated";
    })(SchedulerEvent || (SchedulerEvent = {}));
    var TRepeatType;
    (function (TRepeatType) {
        TRepeatType["Repeat"] = "repeat";
        TRepeatType["Pause"] = "pause";
        TRepeatType["Single"] = "single";
    })(TRepeatType || (TRepeatType = {}));
    var TimeMode;
    (function (TimeMode) {
        TimeMode["Fixed"] = "fixed";
        TimeMode["Sunrise"] = "sunrise";
        TimeMode["Sunset"] = "sunset";
    })(TimeMode || (TimeMode = {}));

    var ERepeatType;
    (function (ERepeatType) {
        ERepeatType["Repeat"] = "repeat";
        ERepeatType["Pause"] = "pause";
        ERepeatType["Single"] = "single";
    })(ERepeatType || (ERepeatType = {}));
    const parseAction = (input) => {
        return {
            service: input.service,
            service_data: input.service_data,
            target: {
                entity_id: input.entity_id
            }
        };
    };
    const parseTimeslot = (input) => {
        return {
            start: input.start,
            stop: input.stop,
            actions: input.actions.map(parseAction),
            conditions: {
                type: input.condition_type == 'and' ? TConditionLogicType.All : TConditionLogicType.Any,
                items: (input.conditions || [])
            }
        };
    };
    const parseWeekdays = (input) => {
        switch (input) {
            case 'mon':
                return TWeekday.Monday;
            case 'tue':
                return TWeekday.Tuesday;
            case 'wed':
                return TWeekday.Wednesday;
            case 'thu':
                return TWeekday.Thursday;
            case 'fri':
                return TWeekday.Friday;
            case 'sat':
                return TWeekday.Saturday;
            case 'sun':
                return TWeekday.Sunday;
            case 'workday':
                return TWeekday.Workday;
            case 'weekend':
                return TWeekday.Weekend;
            default:
                return TWeekday.Daily;
        }
    };
    const convertLegacySchedule = (input) => {
        return {
            entries: [
                {
                    slots: input.timeslots.map(parseTimeslot),
                    weekdays: input.weekdays.map(parseWeekdays),
                }
            ],
            entity_id: input.entity_id,
            next_entries: input.next_entries,
            timestamps: input.timestamps
        };
    };

    const fetchItems = (hass) => hass.callWS({
        type: 'scheduler',
    })
        .then(res => {
        return Object.fromEntries(res.map(el => [el.schedule_id, convertLegacySchedule(el)]));
    });

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
            n$4({ attribute: false })
        ], SubscribeClass.prototype, "hass", void 0);
        return SubscribeClass;
    };

    const addTimeOffset = (time, offsetTime) => {
        let offsetHours = offsetTime.hours || 0;
        let offsetMinutes = offsetTime.minutes || 0;
        if (offsetHours < 0 || offsetMinutes < 0) {
            offsetHours = -Math.abs(offsetHours);
            offsetMinutes = -Math.abs(offsetMinutes);
        }
        let hours = time.hours + offsetHours;
        let minutes = time.minutes + offsetMinutes;
        if (minutes > 60) {
            hours = hours + 1;
            minutes -= 60;
        }
        else if (minutes < 0) {
            hours = hours - 1;
            minutes += 60;
        }
        if (hours < 0) {
            hours += 24;
        }
        else if (hours > 24) {
            hours += 24;
        }
        return {
            mode: TimeMode.Fixed,
            hours: hours,
            minutes: minutes
        };
    };

    const roundTime = (time, stepSize = 1) => {
        let ts = Math.abs(time.hours) * 3600 + Math.abs(time.minutes) * 60 + (time.seconds || 0);
        const sign = (time.hours < 0 || time.minutes < 0) ? -1 : 1;
        let hours = Math.floor(ts / 3600);
        let minutes = Math.round((ts - hours * 3600) / 60);
        if (minutes % stepSize != 0)
            minutes = Math.round(minutes / stepSize) * stepSize;
        if (minutes >= 60) {
            hours++;
            minutes -= 60;
        }
        if (sign < 0) {
            if (hours > 0)
                hours = -hours;
            else
                minutes = -minutes;
        }
        return Object.assign(Object.assign({}, time), { hours: hours, minutes: minutes });
    };

    const parseTimeString = (string) => {
        if (string.match(/^([0-9:]+)$/)) {
            const parts = string.split(':').map(Number);
            const time = roundTime({ hours: parts[0], minutes: parts[1], seconds: parts[2] });
            return {
                mode: TimeMode.Fixed,
                hours: time.hours,
                minutes: time.minutes,
            };
        }
        const match = string.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);
        if (match) {
            let parts = match[3].split(':').map(Number);
            const time = roundTime({ hours: parts[0], minutes: parts[1], seconds: parts[2] });
            let hours = time.hours;
            let minutes = time.minutes;
            if (match[2] == '-') {
                if (hours > 0)
                    hours = -hours;
                else
                    minutes = -minutes;
            }
            return {
                mode: match[1] == 'sunrise' ? TimeMode.Sunrise : TimeMode.Sunset,
                hours: hours,
                minutes: minutes,
            };
        }
        const ts = new Date(string);
        const time = roundTime({ hours: ts.getHours(), minutes: ts.getMinutes(), seconds: ts.getSeconds() });
        return {
            mode: TimeMode.Fixed,
            hours: time.hours,
            minutes: time.minutes
        };
    };

    const computeTimestamp = (time, hass) => {
        if (typeof time == 'string') {
            time = parseTimeString(time);
        }
        if (time.mode == TimeMode.Fixed) {
            return time.hours * 3600 + time.minutes * 60;
        }
        else if (time.mode == TimeMode.Sunrise) {
            const ts_reference = parseTimeString(hass.states['sun.sun'].attributes['next_rising']);
            const ts = addTimeOffset(ts_reference, time);
            return ts.hours * 3600 + ts.minutes * 60;
        }
        else {
            const ts_reference = parseTimeString(hass.states['sun.sun'].attributes['next_setting']);
            const ts = addTimeOffset(ts_reference, time);
            return ts.hours * 3600 + ts.minutes * 60;
        }
    };

    var NumberFormat;
    (function (NumberFormat) {
        NumberFormat["language"] = "language";
        NumberFormat["system"] = "system";
        NumberFormat["comma_decimal"] = "comma_decimal";
        NumberFormat["decimal_comma"] = "decimal_comma";
        NumberFormat["space_comma"] = "space_comma";
        NumberFormat["none"] = "none";
    })(NumberFormat || (NumberFormat = {}));
    var TimeFormat;
    (function (TimeFormat) {
        TimeFormat["language"] = "language";
        TimeFormat["system"] = "system";
        TimeFormat["am_pm"] = "12";
        TimeFormat["twenty_four"] = "24";
    })(TimeFormat || (TimeFormat = {}));

    const useAmPm = (locale) => {
        if (locale.time_format === TimeFormat.language ||
            locale.time_format === TimeFormat.system) {
            const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
            const test = new Date("January 1, 2023 22:00:00").toLocaleString(testLanguage);
            return test.includes("10");
        }
        return locale.time_format === TimeFormat.am_pm;
    };
    var AmPmFormat;
    (function (AmPmFormat) {
        AmPmFormat["AM"] = "AM";
        AmPmFormat["PM"] = "PM";
    })(AmPmFormat || (AmPmFormat = {}));
    const convertTo12Hour = (hours) => {
        const amPm = hours >= 12 ? AmPmFormat.PM : AmPmFormat.AM;
        const hours12 = (hours % 12) || 12;
        return { am_pm: amPm, hours: hours12 };
    };
    const convertTo24Hour = (hours12, amPm) => {
        if (amPm == AmPmFormat.AM) {
            return hours12 == 12 ? 0 : hours12;
        }
        else {
            return hours12 == 12 ? 0 : (hours12 + 12);
        }
    };

    const timeToString = (input, formatOptions = { seconds: true }) => {
        let output = '';
        if (input.hours >= 24)
            input.hours -= 24;
        if (input.mode == TimeMode.Fixed && formatOptions.am_pm) {
            const amPm = convertTo12Hour(input.hours).am_pm;
            const hours12 = convertTo12Hour(input.hours).hours;
            output = String(hours12).padStart(2, '0') + ':' + String(input.minutes).padStart(2, '0');
            if (formatOptions.seconds)
                output += ':00';
            output += " " + (amPm === AmPmFormat.AM ? 'am' : 'pm');
        }
        else if (input.mode == TimeMode.Fixed) {
            output = String(input.hours).padStart(2, '0') + ':' + String(input.minutes).padStart(2, '0');
            if (formatOptions.seconds)
                output += ':00';
        }
        else {
            output = input.mode
                + ((input.hours < 0 || input.minutes < 0) ? '-' : '+')
                + String(Math.abs(input.hours)).padStart(2, '0')
                + ':'
                + String(Math.abs(input.minutes)).padStart(2, '0');
            if (formatOptions.seconds)
                output += ':00';
        }
        return output;
    };

    const parseTimeBar = (schedule, hass) => {
        const processSlots = (slots) => {
            //correct timeslots which are outside of 00:00:00 - 23:59:00 window
            slots = slots.map(e => Object(Object.assign(Object.assign({}, e), { start: computeTimestamp(e.start, hass) < 0 ? '00:00:00' : e.start, stop: e.stop
                    ? computeTimestamp(e.stop, hass) > 3600 * 24 ? '00:00:00' : e.stop
                    : undefined })));
            slots = slots.map(slot => {
                //correct timeslots who have their start and stop point flipped
                if (slot.stop && computeTimestamp(slot.start, hass) > computeTimestamp(slot.stop, hass)) {
                    if (computeTimestamp(slot.stop, hass) == 0)
                        //if stop time is 00:00:00, this should be mapped as the end of the day
                        return Object.assign(Object.assign({}, slot), { stop: timeToString(addTimeOffset(parseTimeString(slot.stop), { hours: 24 })) });
                    //correct timeslots who have their start and stop point flipped
                    else
                        slot = Object.assign(Object.assign({}, slot), { start: slot.stop, stop: slot.start });
                }
                //correct timeslots which have a duration shorter than 1 minute
                if (slot.stop && (computeTimestamp(slot.stop, hass) - computeTimestamp(slot.start, hass)) < 60) {
                    slot = Object.assign(Object.assign({}, slot), { stop: timeToString(addTimeOffset(parseTimeString(slot.start), { minutes: 1 })) });
                }
                return slot;
            });
            slots.sort((a, b) => {
                if (computeTimestamp(a.start, hass) > computeTimestamp(b.start, hass))
                    return 1;
                else if (computeTimestamp(a.start, hass) < computeTimestamp(b.start, hass))
                    return -1;
                else
                    return computeTimestamp(a.stop || a.start, hass) > computeTimestamp(b.stop || b.start, hass) ? 1 : -1;
            });
            let startTime = '00:00:00';
            let len = slots.length;
            //insert empty timeslots where needed
            for (let i = 0; i < len; i++) {
                const slot = slots[i];
                if (computeTimestamp(slot.start, hass) > computeTimestamp(startTime, hass)) {
                    slots.splice(i, 0, Object.assign(Object.assign({}, slot), {
                        start: startTime,
                        stop: slot.start,
                        actions: [],
                        conditions: slot.conditions
                    }));
                    len++;
                    i++;
                }
                else if (computeTimestamp(slot.start, hass) < computeTimestamp(startTime, hass)) {
                    //move timeslot if it is overlapping with previous
                    slots = Object.assign(slots, { [i]: Object.assign(Object.assign({}, slot), { start: startTime }) });
                }
                startTime = slot.stop;
            }
            const endOfDay = 24 * 3600;
            //insert empty timeslots at the end when needed
            if (computeTimestamp(startTime, hass) < endOfDay && computeTimestamp(startTime, hass) > 0) {
                slots.push({
                    start: startTime,
                    stop: timeToString({ mode: TimeMode.Fixed, hours: 24, minutes: 0 }),
                    actions: [],
                    conditions: slots[0].conditions
                });
            }
            return slots;
        };
        schedule = Object.assign(Object.assign({}, schedule), { entries: schedule.entries.map(entry => Object(Object.assign(Object.assign({}, entry), { slots: processSlots(entry.slots) }))) });
        return schedule;
    };

    const CARD_VERSION = 'v4.0.0b';
    const DefaultCardConfig = {
        include: [],
        exclude: [],
        discover_existing: true,
        title: true,
        show_header_toggle: false,
        display_options: {
            primary_info: 'default',
            secondary_info: ['relative-time', 'additional-tasks'],
        },
        sort_by: ['relative-time', 'state'],
        customize: {}
    };
    const defaultSlotConfig = {
        actions: [],
        conditions: {
            type: TConditionLogicType.Any,
            items: []
        }
    };
    const defaultScheduleConfig = {
        entries: [
            {
                weekdays: [TWeekday.Daily],
                slots: [
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '00:00:00', stop: '08:00:00' }),
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '08:00:00', stop: '16:00:00' }),
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '16:00:00', stop: '00:00:00' })
                ]
            }
        ],
        repeat_type: TRepeatType.Repeat,
        next_entries: [],
        timestamps: []
    };

    const hasKey = (obj, key) => Object.keys(obj).includes(key);
    const isTypeBoolean = (obj) => typeof obj == 'boolean';
    const isTypeString = (obj) => typeof obj == 'string';
    const isTypeObject = (obj) => typeof obj == 'object' && !Array.isArray(obj);
    const isTypeListOfStrings = (obj) => Array.isArray(obj) && obj.every(e => typeof e == 'string');
    const validateConfig = (config) => {
        let errors = [];
        if (hasKey(config, 'include') && !isTypeListOfStrings(config.include)) {
            errors.push(`'include' must be a list of strings`);
        }
        if (hasKey(config, 'exclude') && !isTypeListOfStrings(config.exclude)) {
            errors.push(`'exclude' must be a list of strings`);
        }
        if (hasKey(config, 'discover_existing') && !isTypeBoolean(config.discover_existing)) {
            errors.push(`'discover_existing' must be a boolean`);
        }
        if (hasKey(config, 'title') && !isTypeBoolean(config.title) && !isTypeString(config.title)) {
            errors.push(`'title' must be a boolean or string`);
        }
        if (hasKey(config, 'show_header_toggle') && !isTypeBoolean(config.show_header_toggle)) {
            errors.push(`'show_header_toggle' must be a boolean`);
        }
        if (hasKey(config, 'show_add_button') && !isTypeBoolean(config.show_add_button)) {
            errors.push(`'show_add_button' must be a boolean`);
        }
        if (hasKey(config, 'display_options')) {
            if (!isTypeObject(config.display_options)) {
                errors.push(`'display_options' must be a struct`);
            }
            else {
                if (hasKey(config.display_options, 'primary_info')
                    && !isTypeString(config.display_options.primary_info)
                    && !isTypeListOfStrings(config.display_options.primary_info)) {
                    errors.push(`in 'display_options': 'primary_info' must be a string or list of strings`);
                }
                if (hasKey(config.display_options, 'secondary_info')
                    && !isTypeString(config.display_options.secondary_info)
                    && !isTypeListOfStrings(config.display_options.secondary_info)) {
                    errors.push(`in 'display_options': 'secondary_info' must be a string or list of strings`);
                }
                if (hasKey(config.display_options, 'icon') && !isTypeString(config.display_options.icon)) {
                    errors.push(`in 'display_options': 'icon' must be a string `);
                }
            }
        }
        if (hasKey(config, 'sort_by')
            && !isTypeString(config.sort_by)
            && !isTypeListOfStrings(config.sort_by)) {
            errors.push(`'sort_by' must be a string or list of strings`);
        }
        if (hasKey(config, 'customize') && !isTypeObject(config.customize)) {
            errors.push(`'customize' must be a struct`);
        }
        if (errors.length) {
            throw new Error(`Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`);
        }
        return config;
    };

    var services = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} s {parameter}"
    	},
    	climate: {
    		set_temperature: "nastavit teplotu[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "topení[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chlazení[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "topení/chlazení[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "topení/chlazení[ na {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatika[ na {temperature}]",
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
    	lawn_mower: "lawn mower",
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
    	dialog: {
    		enable_schedule: {
    			title: "Dokončete úpravy",
    			description: "Plán, který byl změněn, je aktuálně zakázán, měl by být povolen?"
    		},
    		confirm_delete: {
    			title: "Odebrat entitu?",
    			description: "Opravdu chcete tuto entitu odebrat?"
    		},
    		confirm_migrate: {
    			title: "Aktualizovat plán",
    			description: "Některá nastavení budou touto změnou ztracena. Chceš pokračovat?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plánovač",
    			new_schedule: "Nový plán",
    			default_name: "Plán #{id}"
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
    		set_temperature_hvac_mode_heat_cool: "heizen/kühlen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "heizen/kühlen[ auf {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatisch[ auf {temperature}]",
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
    	lawn_mower: "lawn mower",
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
    	dialog: {
    		enable_schedule: {
    			title: "Modifikationen beenden",
    			description: "Der geänderte Zeitplan ist derzeit deaktiviert, sollte er aktiviert werden?"
    		},
    		confirm_delete: {
    			title: "Entität entfernen?",
    			description: "Bist du dir sicher, dass du diese Entität löschen möchtest?"
    		},
    		confirm_migrate: {
    			title: "Zeitplan ändern",
    			description: "Einige Einstellungen gehen durch diese Änderung verloren. Möchten Sie fortfahren?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Zeitplaner",
    			new_schedule: "Neuer Zeitplan",
    			default_name: "Zeitplan #{id}"
    		},
    		overview: {
    			no_entries: "Es gibt keine Einträge, die angezeigt werden können",
    			backend_error: "Es konnte keine Verbindung mit der Schedulerkomponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",
    			excluded_items: "{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",
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
    			any: "eine",
    			no_conditions_defined: "Es sind keine Bedingungen definiert",
    			track_conditions: "Erneut prüfen wenn sich die Zustände ändern"
    		},
    		options: {
    			repeat_type: "Verhalten nach Abschluß",
    			period: "Zeitraum"
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
    		set_temperature_hvac_mode_heat_cool: "heat/cool[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "heat/cool[ to {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ to {temperature}]",
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
    	lawn_mower: "lawn mower",
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
    	dialog: {
    		enable_schedule: {
    			title: "Complete modifications",
    			description: "The schedule you have changed is currently disabled, do you want to enable it?"
    		},
    		confirm_delete: {
    			title: "Remove entity?",
    			description: "Are you sure you want to remove this entity?"
    		},
    		confirm_migrate: {
    			title: "Update schedule",
    			description: "Some settings will be lost by this change. Do you want to continue?"
    		},
    		entity_picker: {
    			title: "Choose entities"
    		},
    		action_picker: {
    			title: "Choose action"
    		}
    	},
    	panel: {
    		common: {
    			title: "Scheduler",
    			new_schedule: "New schedule",
    			default_name: "Schedule #{id}"
    		},
    		overview: {
    			no_entries: "There are no items to show",
    			backend_error: "Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",
    			excluded_items: "{number} excluded {if number is 1} item {else} items",
    			hide_excluded: "hide excluded items",
    			additional_tasks: "{number} more {if number is 1} task {else} tasks"
    		},
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			add_condition: "Add condition",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
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
    			is: "Equal to",
    			not: "Unequal to",
    			above: "Above",
    			below: "Below",
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
    					description: "Show toggle switch at the top of the card for enabling/disabling all entities"
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
    		set_temperature_hvac_mode_heat_cool: "calefacción/frío[ a {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "calefacción/frío[ a {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automático[ a {temperature}]",
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
    	lawn_mower: "lawn mower",
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
    	dialog: {
    		enable_schedule: {
    			title: "Completa las modificaciones",
    			description: "El horario que se ha cambiado está actualmente deshabilitado, ¿debería habilitarse?"
    		},
    		confirm_delete: {
    			title: "¿Eliminar entidad?",
    			description: "¿Estás seguro de que deseas eliminar esta entidad?"
    		},
    		confirm_migrate: {
    			title: "Modificar horario",
    			description: "Algunas configuraciones se perderán con este cambio. Quieres proceder?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Programador",
    			new_schedule: "Nuevo horario",
    			default_name: "Horario #{id}"
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
    		set_temperature_hvac_mode_heat_cool: "küte/jahutus[ @ {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "küte/jahutus[ @ {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automaatne[ @ {temperature}]",
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
    	lawn_mower: "lawn mower",
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
    	dialog: {
    		enable_schedule: {
    			title: "Viige muudatused lõpule",
    			description: "Muudetud ajakava on praegu keelatud, kas see peaks olema lubatud?"
    		},
    		confirm_delete: {
    			title: "Kas eemaldan olemi?",
    			description: "Oled kindel, et soovid selle olemi eemaldada?"
    		},
    		confirm_migrate: {
    			title: "Muutke ajakava",
    			description: "Selle muudatusega lähevad mõned seaded kaotsi. Kas soovite jätkata?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Ajastaja",
    			new_schedule: "Uus ajakava",
    			default_name: "Ajakava #{id}"
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
    		parameter_to_value: "{parameter} {value}",
    		action_with_parameter: "{action} {parameter}"
    	},
    	climate: {
    		set_temperature: "aseta lämpötilaksi[ {temperature}]",
    		set_temperature_hvac_mode_heat: "lämmitä[ {temperature} asteeseen]",
    		set_temperature_hvac_mode_cool: "jäähdytä[ {temperature} asteeseen]",
    		set_temperature_hvac_mode_heat_cool: "lämmitä/jäähdytä[ {temperature} asteeseen]",
    		set_temperature_hvac_mode_heat_cool_range: "lämmitä/jäähdytä[ välillä {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automaatilla[ {temperature} asteeseen]",
    		set_hvac_mode: "aseta tilaksi[ {hvac_mode}]",
    		set_preset_mode: "aseta esivalinta[ {preset_mode}]",
    		set_fan_mode: "aseta tuuletus[ {fan_mode}]"
    	},
    	cover: {
    		close_cover: "sulje",
    		open_cover: "avaa",
    		set_cover_position: "aseta sijainniksi[ {position}]",
    		set_cover_tilt_position: "aseta kallistus[ {tilt_position}]"
    	},
    	fan: {
    		set_speed: "aseta nopeus[ {speed}]",
    		set_direction: "asenta suunta[ {direction}]",
    		oscillate: "aseta pyörimisnopeus[ {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "aseta kosteus[ {humidity}]",
    		set_mode: "aseta tilaksi {mode}"
    	},
    	input_number: {
    		set_value: "aseta arvo {value}"
    	},
    	input_select: {
    		select_option: "valitse[ {option}]"
    	},
    	select: {
    		select_option: "valitse[ {option}]"
    	},
    	light: {
    		turn_on: "kytke päälle[ {brightness} kirkkaudella]"
    	},
    	media_player: {
    		select_source: "valitse lähteeksi[ {source}]"
    	},
    	notify: {
    		notify: "lähetä ilmoitus"
    	},
    	script: {
    		script: "suorita"
    	},
    	vacuum: {
    		start_pause: "aloita / keskeytä"
    	},
    	water_heater: {
    		set_operation_mode: "aseta tilaksi[ {operation_mode}]",
    		set_away_mode: "aseta poissa-tila"
    	}
    };
    var domains$5 = {
    	alarm_control_panel: "hälytyspaneeli",
    	binary_sensor: "binary sensor",
    	climate: "ilmastointi",
    	cover: "kaihdin/tallin ovi",
    	fan: "tuuletin",
    	group: "ryhmä",
    	humidifier: "ilmankosteuttimet",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	lawn_mower: "lawn mower",
    	light: "valaisin",
    	lock: "lukko",
    	media_player: "mediatoistin",
    	notify: "ilmoitus",
    	"switch": "kytkin",
    	vacuum: "imuri",
    	water_heater: "vedenlämmitin"
    };
    var ui$5 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "päivittäin",
    				workdays: "työpäivisin",
    				weekend: "viikonloppuisin"
    			},
    			day_types_long: {
    				daily: "päivittäin",
    				workdays: "työpäivisin",
    				weekend: "viikonloppuisin"
    			},
    			days: "päivää",
    			tomorrow: "huomenna",
    			repeated_days: "joka {days}",
    			repeated_days_except: "joka päivä paitsi {excludedDays}",
    			days_range: "{startDay} {endDay}",
    			next_week_day: "seuraava {weekday}"
    		},
    		time: {
    			absolute: "{time}",
    			interval: "{startTime} - {endTime}",
    			at_midnight: "keskiyöllä",
    			at_noon: "keskipäivällä",
    			at_sun_event: "{sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Suorita muutokset loppuun",
    			description: "Muutettu aikataulu on tällä hetkellä poissa käytöstä, pitäisikö se ottaa käyttöön?"
    		},
    		confirm_delete: {
    			title: "Poistetaanko kohde?",
    			description: "Haluatko varmasti poistaa tämän kohteen?"
    		},
    		confirm_migrate: {
    			title: "Muokkaa aikataulua",
    			description: "Jotkut asetukset menetetään tämän muutoksen seurauksena. Haluatko edetä?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Ajastin",
    			new_schedule: "Uusi aikataulu",
    			default_name: "Aikataulu #{id}"
    		},
    		overview: {
    			no_entries: "Ei näytettäviä kohteita",
    			backend_error: "Ei voitu yhdistää scheduler komponenttiin. Kortin käyttäminen vaatii scheduler integraation asentamisen.",
    			excluded_items: "{number} {if number is 1} poissuljettu kohde {else} poissuljettua kohdetta",
    			hide_excluded: "piilota poissuljetut kohteet",
    			additional_tasks: "{number} {if number is 1} tehtävä {else} tehtävää"
    		},
    		entity_picker: {
    			no_groups_defined: "Ryhmiä ei ole luotu",
    			no_group_selected: "Valitse ryhmä ensin",
    			no_entities_for_group: "Ryhmässä ei ole kohteita",
    			no_entity_selected: "Valitse kohde ensin",
    			no_actions_for_entity: "Kohteelle ei ole toimintoja",
    			make_scheme: "luo aikataulu",
    			multiple: "Monta kohdetta"
    		},
    		time_picker: {
    			no_timeslot_selected: "Valitse aikaikkuna ensin",
    			time_scheme: "Aikataulu",
    			time_input_mode: "Ajastustapa"
    		},
    		conditions: {
    			equal_to: "yhtä kuin",
    			unequal_to: "ei yhtä kuin",
    			all: "kaikki",
    			any: "mikä tahansa",
    			no_conditions_defined: "Ehtoja ei ole määritetty",
    			track_conditions: "Uudelleentarkista kun ehdot muuttuvat"
    		},
    		options: {
    			repeat_type: "toiminta tapahtuman jälkeen",
    			period: "ajanjakso"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Kohteet",
    				other: "Muu"
    			},
    			fields: {
    				title: {
    					heading: "Kortin otsikko",
    					options: {
    						standard: "normaali",
    						hidden: "piilotettu",
    						custom: "muokattu"
    					},
    					custom_title: "Muokattu otsikko"
    				},
    				discover_existing: {
    					heading: "Näytä kaikki ajoitukset",
    					description: "Tämä kytkee käyttöön 'näytä olemassa olevat -attribuutin'. Aiemmin luodut ajastukset lisätään automaattisesti korttiin. "
    				},
    				time_step: {
    					heading: "Ajastusvälit",
    					description: "Ajastusväli minuutteina ajastusten luontiin"
    				},
    				sort_by: {
    					heading: "Lajitteluasetukset",
    					description: "Järjestys miten ajastukset näkyvät kortissa",
    					options: {
    						relative_time: "Aikaa jäljellä seuraavaan toimintoon",
    						title: "Ajastuksen otsikko",
    						state: "Aktiiviset ajastukset ylhäällä"
    					}
    				},
    				display_format_primary: {
    					heading: "Ensisijainen tieto",
    					description: "Valitse mitä näytetään yhteenvedossa",
    					options: {
    						"default": "Ajastuksen nimi",
    						entity_action: "Ajastuksen yhteenveto"
    					}
    				},
    				display_format_secondary: {
    					heading: "Toissijainen tieto",
    					description: "Valitse mitkä lisätiedot näkyvät yhteenvedossa",
    					options: {
    						relative_time: "Aikaa jäljellä seuraavaan toimintoon",
    						time: "Seuraavalle toiminnolle määritetty aika",
    						days: "Toistuvat viikonpäivät",
    						additional_tasks: "Lisätoimintojen määrä"
    					}
    				},
    				show_header_toggle: {
    					heading: "Näytä otsikkokytkin",
    					description: "Näytä kytkin kortin yläreunassa usean ajastuksen päälle/pois kytkemiseen"
    				},
    				tags: {
    					heading: "Tunniste",
    					description: "Käytä tunnisteita ajastusten jakamiseen korttien välillä"
    				},
    				entities: {
    					heading: "Ajastettavat kohteet",
    					description: "Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",
    					included_number: "{number} / {total} valittu"
    				}
    			}
    		}
    	}
    };
    var fi = {
    	services: services$5,
    	domains: domains$5,
    	ui: ui$5
    };

    var fi$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$5,
        domains: domains$5,
        ui: ui$5,
        'default': fi
    });

    var services$6 = {
    	generic: {
    		parameter_to_value: "{parameter} vers {value}",
    		action_with_parameter: "{action} avec {parameter}"
    	},
    	climate: {
    		set_temperature: "ajuster la température[ à {temperature}]",
    		set_temperature_hvac_mode_heat: "chauffe[ à {temperature}]",
    		set_temperature_hvac_mode_cool: "refroidit[ à {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "chauffe/refroidit[ à {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "chauffe/refroidit[ à {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ à {temperature}]",
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
    var domains$6 = {
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
    	lawn_mower: "lawn mower",
    	light: "lumière",
    	lock: "serrure",
    	media_player: "lecteur multimédia",
    	notify: "notification",
    	"switch": "interrupteur",
    	vacuum: "aspirateur",
    	water_heater: "chauffe eau"
    };
    var ui$6 = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Compléter les modifs",
    			description: "Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"
    		},
    		confirm_delete: {
    			title: "Supprimer l'entité ?",
    			description: "Voulez-vous vraiment supprimer cette entité ?"
    		},
    		confirm_migrate: {
    			title: "Modifier l'horaire",
    			description: "Certains paramètres seront perdus par ce changement. Voulez-vous poursuivre?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Planificateur",
    			new_schedule: "Nouvel horaire",
    			default_name: "Horaire #{id}"
    		},
    		overview: {
    			no_entries: "il n'y a pas d'entrée à montrer",
    			backend_error: "Impossible de se connecter au composant du planificateur. Il doit être installé en tant qu'intégration avant que cette carte ne puisse être utilisée.",
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
    			all: "toutes",
    			any: "une",
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
    	services: services$6,
    	domains: domains$6,
    	ui: ui$6
    };

    var fr$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$6,
        domains: domains$6,
        ui: ui$6,
        'default': fr
    });

    var services$7 = {
    	generic: {
    		parameter_to_value: "{parameter} ל {value}",
    		action_with_parameter: "{action} עם {parameter}"
    	},
    	climate: {
    		set_temperature: "קבע טמפרטורה[ ל {temperature}]",
    		set_temperature_hvac_mode_heat: "חימום[ ל {temperature}]",
    		set_temperature_hvac_mode_cool: "קירור[ ל {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "חימום/קירור[ ל {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "חימום/קירור[ ל {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "אוטומטי[ ל {temperature}]",
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
    var domains$7 = {
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
    	lawn_mower: "lawn mower",
    	light: "תאורה",
    	lock: "מנעולים",
    	media_player: "נגני מדיה",
    	notify: "notification",
    	"switch": "מפסקים",
    	vacuum: "שואבי אבק",
    	water_heater: "מחממי מים"
    };
    var ui$7 = {
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
    	dialog: {
    		enable_schedule: {
    			title: "השלם את השינויים",
    			description: "לוח הזמנים ששונה מושבת כעת, האם צריך להפעיל אותו?"
    		},
    		confirm_delete: {
    			title: "להסיר את הישות?",
    			description: "האם בוודאות ברצונך להסיר ישות זו?"
    		},
    		confirm_migrate: {
    			title: "שנה את לוח הזמנים",
    			description: "חלק מההגדרות יאבדו על ידי פעולה זו. האם אתה רוצה להמשיך?"
    		}
    	},
    	panel: {
    		common: {
    			title: "לוח זמנים",
    			new_schedule: "לוח זמנים חדש",
    			default_name: "לוח זמנים #{id}"
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
    	services: services$7,
    	domains: domains$7,
    	ui: ui$7
    };

    var he$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$7,
        domains: domains$7,
        ui: ui$7,
        'default': he
    });

    var services$8 = {
    	generic: {
    		parameter_to_value: "{parameter} to {value}",
    		action_with_parameter: "{action} with {parameter}"
    	},
    	climate: {
    		set_temperature: "hőmérséklet[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "melegíteni[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "hűtés[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "melegíteni/hűtés[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "melegíteni/hűtés[ to {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatikus[ to {temperature}]",
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
    var domains$8 = {
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
    	lawn_mower: "lawn mower",
    	light: "lámpa",
    	lock: "locks",
    	media_player: "lejátszó",
    	notify: "notification",
    	"switch": "kapcsoló",
    	vacuum: "pórszívó",
    	water_heater: "water heaters"
    };
    var ui$8 = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Végezze el a módosításokat",
    			description: "A módosított ütemezés jelenleg le van tiltva, engedélyezni kell?"
    		},
    		confirm_delete: {
    			title: "Biztos benne, hogy eltávolítja az entitást?",
    			description: "Biztos benne, hogy el szeretné távolítani ezt az entitást?"
    		},
    		confirm_migrate: {
    			title: "Ütemezés módosítása",
    			description: "Ezzel a művelettel bizonyos beállítások elvesznek. Akarod folytatni?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Időzítések",
    			new_schedule: "Új ütemezés",
    			default_name: "Ütemterv #{id}"
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
    	services: services$8,
    	domains: domains$8,
    	ui: ui$8
    };

    var hu$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$8,
        domains: domains$8,
        ui: ui$8,
        'default': hu
    });

    var services$9 = {
    	generic: {
    		parameter_to_value: "{parameter} a {value}",
    		action_with_parameter: "{action} con {parameter}"
    	},
    	climate: {
    		set_temperature: "imposta temperatura[ a {temperature}]",
    		set_temperature_hvac_mode_heat: "riscaldamento[ a {temperature}]",
    		set_temperature_hvac_mode_cool: "raffrescamento[ a {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "riscaldamento/raffrescamento[ a {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "riscaldamento/raffrescamento[ a {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ a {temperature}]",
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
    var domains$9 = {
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
    	lawn_mower: "lawn mower",
    	light: "luci",
    	lock: "lucchetti",
    	media_player: "media player",
    	notify: "notification",
    	"switch": "interruttori",
    	vacuum: "aspirapolveri",
    	water_heater: "scaldabagno"
    };
    var ui$9 = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Completa le modifiche",
    			description: "La pianificazione modificata è attualmente disabilitata, dovrebbe essere abilitata?"
    		},
    		confirm_delete: {
    			title: "Vuoi rimuovere l'entità?",
    			description: "Sei sicuro di voler rimuovere questa entità?"
    		},
    		confirm_migrate: {
    			title: "Modifica orario",
    			description: "Alcune impostazioni andranno perse con questa azione. Vuoi procedere?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Schedulatore",
    			new_schedule: "Nuovo orario",
    			default_name: "Orario #{id}"
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
    	services: services$9,
    	domains: domains$9,
    	ui: ui$9
    };

    var it$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$9,
        domains: domains$9,
        ui: ui$9,
        'default': it
    });

    var services$a = {
    	generic: {
    		parameter_to_value: "{parameter} uz {value}",
    		action_with_parameter: "{action} ar {parameter}"
    	},
    	climate: {
    		set_temperature: "uzstādīt temperatūru[ uz {temperature}]",
    		set_temperature_hvac_mode_heat: "sildīt[ līdz {temperature}]",
    		set_temperature_hvac_mode_cool: "atdzesēt[ līdz {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "sildīt/atdzesēt[ līdz {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "sildīt/atdzesēt[ uz {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ uz {temperature}]",
    		set_hvac_mode: "iestatīt[ uz {hvac_mode}]",
    		set_preset_mode: "iestatīt režīmu[ uz {preset_mode}]",
    		set_fan_mode: "iestatīt ventilatora režīmu[ uz {fan_mode}]"
    	},
    	cover: {
    		close_cover: "aizvērt",
    		open_cover: "atvērt",
    		set_cover_position: "uzstādīt pozīciju[ uz {position}]",
    		set_cover_tilt_position: "uzstādīt slīpuma stāvokli[ uz {tilt_position}]"
    	},
    	fan: {
    		set_speed: "iestatīt ātrumu[ uz {speed}]",
    		set_direction: "iestatīt virzienu[ uz {direction}]",
    		oscillate: "iestatīt oscilāciju[ uz {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "iestatīt mitrumu[ uz {humidity}]",
    		set_mode: "iestatīt režīmu[ uz {mode}]"
    	},
    	input_number: {
    		set_value: "iestatīt vērtību[ uz {value}]"
    	},
    	input_select: {
    		select_option: "izvēlēties opciju[ {option}]"
    	},
    	select: {
    		select_option: "izvēlēties opciju[ {option}]"
    	},
    	light: {
    		turn_on: "ieslēgt[ ar {brightness} spilgtumu]"
    	},
    	media_player: {
    		select_source: "izvēlēties avotu[ {source}]"
    	},
    	notify: {
    		notify: "nosūtīt paziņojumu"
    	},
    	script: {
    		script: "izpildīt"
    	},
    	vacuum: {
    		start_pause: "sākt / pauze"
    	},
    	water_heater: {
    		set_operation_mode: "iestatīt režīmu[ uz {operation_mode}]",
    		set_away_mode: "iestatīt prombūtnes režīmu"
    	}
    };
    var domains$a = {
    	alarm_control_panel: "trauksmes kontroles panelis",
    	binary_sensor: "binārie sensori",
    	climate: "klimats",
    	cover: "pārsegi",
    	fan: "ventilatori",
    	group: "vienību grupas",
    	humidifier: "mitrinātāji",
    	input_boolean: "ievades binārais lauks",
    	input_number: "ievades numurs",
    	input_select: "ievades izvēle",
    	lawn_mower: "lawn mower",
    	light: "gaismas",
    	lock: "slēdzene",
    	media_player: "multivides atskaņotāji",
    	notify: "paziņojums",
    	"switch": "slēdži",
    	vacuum: "putekļu sūcēji",
    	water_heater: "ūdens sildītāji"
    };
    var ui$a = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "ikdienišķs",
    				workdays: "darba dienas",
    				weekend: "nedēļas nogale"
    			},
    			day_types_long: {
    				daily: "katru dienu",
    				workdays: "darba dienās",
    				weekend: "nedēļas nogalē"
    			},
    			days: "dienas",
    			tomorrow: "rītdiena",
    			repeated_days: "katras {days}",
    			repeated_days_except: "katru dienu, izņemot {excludedDays}",
    			days_range: "no {startDay} līdz {endDay}",
    			next_week_day: "nākošo {weekday}"
    		},
    		time: {
    			absolute: "kad {time}",
    			interval: "no {startTime} līdz {endTime}",
    			at_midnight: "kad midnight",
    			at_noon: "kad noon",
    			at_sun_event: "kad {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Pabeigt modificēšanu",
    			description: "Izmainītais grafiks pašlaik ir atspējots, vai vēlaties to iespējot?"
    		},
    		confirm_delete: {
    			title: "Vai dzēst vienību?",
    			description: "Vai tiešām vēlaties dzēst šo vienību?"
    		},
    		confirm_migrate: {
    			title: "Atjaunināt grafiku",
    			description: "Šīs izmaiņas rezultātā daži iestatījumi tiks zaudēti. Vai vēlaties turpināt?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plānotājs",
    			new_schedule: "Jauns grafiks",
    			default_name: "Grafiks #{id}"
    		},
    		overview: {
    			no_entries: "Nav parādāmu vienību",
    			backend_error: "Nevar izveidot savienojumu ar plānotāja komponenti. Pirms šīs kartes izmantošanas tā ir jāinstalē kā integrācija.",
    			excluded_items: "{number} izslēgtas {if number is 1} vienība {else} vienības",
    			hide_excluded: "paslēpt izslēgtās vienības",
    			additional_tasks: "{number} papildu {if number is 1} uzdevums {else} uzdevumi"
    		},
    		entity_picker: {
    			no_groups_defined: "Nav definētas grupas",
    			no_group_selected: "Vispirms izvēlieties grupu",
    			no_entities_for_group: "Šajā grupā nav vienību",
    			no_entity_selected: "Vispirms izvēlieties vienību",
    			no_actions_for_entity: "Šai vienībai nav darbību",
    			make_scheme: "izveidot shēmu",
    			multiple: "Vairāki"
    		},
    		time_picker: {
    			no_timeslot_selected: "Vispirms izvēlieties laika slotu",
    			time_scheme: "Shēma",
    			time_input_mode: "Laika kontroles režīms"
    		},
    		conditions: {
    			equal_to: "ir",
    			unequal_to: "nav",
    			all: "visi",
    			any: "jebkuru",
    			no_conditions_defined: "Nav definēti nosacījumi",
    			track_conditions: "Pārvērtēt, kad mainās nosacījumi"
    		},
    		options: {
    			repeat_type: "uzvedība pēc beigām",
    			period: "periods"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Vienības",
    				other: "Cits"
    			},
    			fields: {
    				title: {
    					heading: "Kartes nosaukums",
    					options: {
    						standard: "standarta",
    						hidden: "paslēpts",
    						custom: "pielāgots"
    					},
    					custom_title: "Pielāgots nosaukums"
    				},
    				discover_existing: {
    					heading: "Rādīt visus grafikus",
    					description: "Šis iestata 'atklāt esošo' parametru. Iepriekš izveidotie grafiki automātiski tiks pievienoti kartei."
    				},
    				time_step: {
    					heading: "Laika solis",
    					description: "Izšķirtspēja (minūtēs) grafiku izveidei"
    				},
    				sort_by: {
    					heading: "Kārtošanas opcijas",
    					description: "Kārtība, kādā grafiki parādās kartē",
    					options: {
    						relative_time: "Atlikušais laiks līdz nākamajai darbībai",
    						title: "Grafika nosaukums",
    						state: "Rādīt aktīvos grafikus augšā"
    					}
    				},
    				display_format_primary: {
    					heading: "Rādītā primārā informācija",
    					description: "Konfigurējiet, kura informācija tiek izmantota grafiku pārskatā",
    					options: {
    						"default": "Grafika nosaukums",
    						entity_action: "Uzdevuma kopsavilkums"
    					}
    				},
    				display_format_secondary: {
    					heading: "Rādītā sekundārā informācija",
    					description: "Konfigurējiet, kuras papildu īpašības ir redzamas pārskatā",
    					options: {
    						relative_time: "Atlikušais laiks līdz nākamajai darbībai",
    						time: "Konfigurētais laiks nākamajai darbībai",
    						days: "Atkārtotas nedēļas dienas",
    						additional_tasks: "Papildu uzdevumu skaits"
    					}
    				},
    				show_header_toggle: {
    					heading: "Rādīt galvenes pārslēgšanu",
    					description: "Rādīt pārslēgšanas slēdzi kartes augšdaļā, lai iespējotu/atspējotu visas vienības"
    				},
    				tags: {
    					heading: "Tagi",
    					description: "Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"
    				},
    				entities: {
    					heading: "Iekļautās vienības",
    					description: "Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",
    					included_number: "{number}/{total} izvēlēts"
    				}
    			}
    		}
    	}
    };
    var lv = {
    	services: services$a,
    	domains: domains$a,
    	ui: ui$a
    };

    var lv$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$a,
        domains: domains$a,
        ui: ui$a,
        'default': lv
    });

    var services$b = {
    	generic: {
    		parameter_to_value: "{parameter} naar {value}",
    		action_with_parameter: "{action} met {parameter}"
    	},
    	climate: {
    		set_temperature: "temperatuur instellen[ naar {temperature}]",
    		set_temperature_hvac_mode_heat: "verwarmen[ naar {temperature}]",
    		set_temperature_hvac_mode_cool: "koelen[ naar {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "verwarmen/koelen[ naar {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "verwarmen/koelen[ naar {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatisch[ naar {temperature}]",
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
    var domains$b = {
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
    	lawn_mower: "lawn mower",
    	light: "verlichting",
    	lock: "sloten",
    	media_player: "mediaspelers",
    	notify: "notificatie",
    	"switch": "schakelaars",
    	vacuum: "stofzuigers",
    	water_heater: "waterverwarming"
    };
    var ui$b = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Wijzigingen voltooid",
    			description: "Deze planning is momenteel gedeactiveerd. Dient deze te worden ingeschakeld?"
    		},
    		confirm_delete: {
    			title: "Entiteit verwijderen?",
    			description: "Weet je zeker dat je dit item wilt verwijderen?"
    		},
    		confirm_migrate: {
    			title: "Schema bijwerken",
    			description: "Door deze actie gaan vorige instellingen verloren. Wil je doorgaan?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Tijdplanner",
    			new_schedule: "Nieuw schema",
    			default_name: "Schema #{id}"
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
    	services: services$b,
    	domains: domains$b,
    	ui: ui$b
    };

    var nl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$b,
        domains: domains$b,
        ui: ui$b,
        'default': nl
    });

    var services$c = {
    	generic: {
    		parameter_to_value: "{parameter} til {value}",
    		action_with_parameter: "{action} med {parameter}"
    	},
    	climate: {
    		set_temperature: "sett temperatur[ til {temperature}]",
    		set_temperature_hvac_mode_heat: "oppvarming[ til {temperature}]",
    		set_temperature_hvac_mode_cool: "kjøling[ til {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "oppvarming/kjøling[ til {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "oppvarming/kjøling[ til {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ til {temperature}]",
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
    var domains$c = {
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
    	lawn_mower: "lawn mower",
    	light: "lys",
    	lock: "låser",
    	media_player: "mediaspillere",
    	notify: "notification",
    	"switch": "brytere",
    	vacuum: "støvsugere",
    	water_heater: "varmtvannsberedere"
    };
    var ui$c = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Fullfør endringene",
    			description: "Tidsplanen som er endret er for øyeblikket deaktivert, bør den være aktivert?"
    		},
    		confirm_delete: {
    			title: "Vil du fjerne entiteten?",
    			description: "Er du sikker på at du vil fjerne denne entiteten?"
    		},
    		confirm_migrate: {
    			title: "Endre tidsplanen",
    			description: "Noen innstillinger vil gå tapt ved denne handlingen. Vil du fortsette?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Tidsplan",
    			new_schedule: "Ny tidsplan",
    			default_name: "Tidsplan #{id}"
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
    	services: services$c,
    	domains: domains$c,
    	ui: ui$c
    };

    var no$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$c,
        domains: domains$c,
        ui: ui$c,
        'default': no
    });

    var services$d = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} z {parameter}"
    	},
    	climate: {
    		set_temperature: "ustaw temperaturę[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "grzej[ do {temperature}]",
    		set_temperature_hvac_mode_cool: "chłodź[ do {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "grzej/chłodź[ do {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "grzej/chłodź[ do {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatyczny[ do {temperature}]",
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
    var domains$d = {
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
    	lawn_mower: "lawn mower",
    	light: "światła",
    	lock: "zamki",
    	media_player: "odtwarzacze",
    	notify: "notification",
    	"switch": "przełączniki",
    	vacuum: "odkurzacze",
    	water_heater: "podgrzewacze wody"
    };
    var ui$d = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Zakończ modyfikacje",
    			description: "Zmieniony harmonogram jest obecnie wyłączony, czy powinien być włączony?"
    		},
    		confirm_delete: {
    			title: "Usunąć encję?",
    			description: "Czy na pewno chcesz usunąć tę encję?"
    		},
    		confirm_migrate: {
    			title: "Zmodyfikuj harmonogram",
    			description: "Ta czynność spowoduje utratę niektórych ustawień. Czy chcesz kontynuować?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Harmonogram",
    			new_schedule: "Nowy harmonogram",
    			default_name: "Harmonogram #{id}"
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
    	services: services$d,
    	domains: domains$d,
    	ui: ui$d
    };

    var pl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$d,
        domains: domains$d,
        ui: ui$d,
        'default': pl
    });

    var services$e = {
    	generic: {
    		parameter_to_value: "{parameter} para {value}",
    		action_with_parameter: "{action} com {parameter}"
    	},
    	climate: {
    		set_temperature: "definir temperatura[ para {temperature}]",
    		set_temperature_hvac_mode_heat: "aquecimento[ para {temperature}]",
    		set_temperature_hvac_mode_cool: "arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "aquecimento/arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ para {temperature}]",
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
    var domains$e = {
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
    	lawn_mower: "lawn mower",
    	light: "iluminação",
    	lock: "fechaduras",
    	media_player: "reprodutores de mídia",
    	notify: "notification",
    	"switch": "interruptores",
    	vacuum: "aspiradores",
    	water_heater: "aquecedores hidráulicos"
    };
    var ui$e = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Conclua as modificações",
    			description: "A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"
    		},
    		confirm_delete: {
    			title: "Remover a entidade?",
    			description: "Tem a certeza que deseja remover esta entidade?"
    		},
    		confirm_migrate: {
    			title: "Modificar horário",
    			description: "Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Agenda",
    			new_schedule: "Novo horário",
    			default_name: "Horário #{id}"
    		},
    		overview: {
    			no_entries: "Não existem itens a mostrar",
    			backend_error: "Não consegui ligar ao componente de agendamento. Essa integração tem que ser instalada antes da utilização deste cartão.",
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
    			multiple: "multiplos"
    		},
    		time_picker: {
    			no_timeslot_selected: "É necessário selecionar um período horário para escolher uma ação",
    			time_scheme: "Esquema",
    			time_input_mode: "Modo de controlo de tempo"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer",
    			no_conditions_defined: "Não existem condições definidas",
    			track_conditions: "Revaliar em caso de alterações"
    		},
    		options: {
    			repeat_type: "comportamento após a conclusão",
    			period: "período"
    		}
    	}
    };
    var pt = {
    	services: services$e,
    	domains: domains$e,
    	ui: ui$e
    };

    var pt$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$e,
        domains: domains$e,
        ui: ui$e,
        'default': pt
    });

    var services$f = {
    	generic: {
    		parameter_to_value: "{parameter} para {value}",
    		action_with_parameter: "{action} com {parameter}"
    	},
    	climate: {
    		set_temperature: "definir temperatura[ para {temperature}]",
    		set_temperature_hvac_mode_heat: "aquecimento[ para {temperature}]",
    		set_temperature_hvac_mode_cool: "arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "aquecimento/arrefecimento[ para {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "aquecimento/arrefecimento[ para {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ para {temperature}]",
    		set_hvac_mode: "definir modo[ para {hvac_mode}]",
    		set_preset_mode: "definir predefinição[ {preset_mode}]",
    		set_fan_mode: "definir modo do ventilador[ para {fan_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]",
    		set_cover_tilt_position: "definir a posição de inclinação[ para {tilt_position}]"
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
    		notify: "enviar notificação"
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
    var domains$f = {
    	alarm_control_panel: "painel de alarme",
    	binary_sensor: "sensores binários",
    	climate: "ambiente",
    	cover: "persiana",
    	fan: "ventiladores",
    	group: "grupos",
    	humidifier: "humidificadores",
    	input_boolean: "campo booleano",
    	input_number: "campo numérico",
    	input_select: "campo de opção",
    	lawn_mower: "lawn mower",
    	light: "iluminação",
    	lock: "fechaduras",
    	media_player: "reprodutores de mídia",
    	notify: "notificar",
    	"switch": "interruptores",
    	vacuum: "aspiradores",
    	water_heater: "aquecedores hidráulicos"
    };
    var ui$f = {
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
    			days_range: "de {startDay} até {endDay}",
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
    	dialog: {
    		enable_schedule: {
    			title: "Conclua as modificações",
    			description: "A programação que foi alterada está atualmente desabilitada, deveria ser habilitada?"
    		},
    		confirm_delete: {
    			title: "Remover entidade?",
    			description: "Tem certeza de que deseja remover esta entidade?"
    		},
    		confirm_migrate: {
    			title: "Modificar horário",
    			description: "Algumas configurações serão perdidas por esta ação. Você quer prosseguir?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Agenda",
    			new_schedule: "Novo horário",
    			default_name: "Horário #{id}"
    		},
    		overview: {
    			no_entries: "Não existem itens para mostrar",
    			backend_error: "Não foi possível conectar com o componente agendador. Ele precisa ser instalado como integração antes que este cartão possa ser usado.",
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
    			multiple: "Múltiplo"
    		},
    		time_picker: {
    			no_timeslot_selected: "Selecionar um período horário primeiro",
    			time_scheme: "Esquema",
    			time_input_mode: "Modo de controle do tempo"
    		},
    		conditions: {
    			equal_to: "é",
    			unequal_to: "não é",
    			all: "todos(as)",
    			any: "qualquer um",
    			no_conditions_defined: "Não existem condições definidas",
    			track_conditions: "Reavaliar quando as condições mudarem"
    		},
    		options: {
    			repeat_type: "comportamento após a conclusão",
    			period: "período"
    		}
    	}
    };
    var ptBR = {
    	services: services$f,
    	domains: domains$f,
    	ui: ui$f
    };

    var pt_br = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$f,
        domains: domains$f,
        ui: ui$f,
        'default': ptBR
    });

    var services$g = {
    	generic: {
    		parameter_to_value: "{parameter} la {value}",
    		action_with_parameter: "{action} cu {parameter}"
    	},
    	climate: {
    		set_temperature: "setare temperatură[ la {temperature}]",
    		set_temperature_hvac_mode_heat: "încălzire[ la {temperature}]",
    		set_temperature_hvac_mode_cool: "răcire[ la {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "încălzire/răcire[ la {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "încălzire/răcire[ la {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ la {temperature}]",
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
    var domains$g = {
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
    	lawn_mower: "lawn mower",
    	light: "lumini",
    	lock: "încuietori",
    	media_player: "media playere",
    	notify: "notification",
    	"switch": "întrerupătoare",
    	vacuum: "aspiratoare",
    	water_heater: "încălzitoare apă"
    };
    var ui$g = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Completați modificările",
    			description: "Programul care a fost modificat este momentan dezactivat, ar trebui activat?"
    		},
    		confirm_delete: {
    			title: "Ștergeți entitatea?",
    			description: "Sigur doriți să eliminați această entitate?"
    		},
    		confirm_migrate: {
    			title: "Modificați programul",
    			description: "Unele setări se vor pierde prin această acțiune. Vrei sa continui?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Planificator",
    			new_schedule: "Noul program",
    			default_name: "Program #{id}"
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
    	services: services$g,
    	domains: domains$g,
    	ui: ui$g
    };

    var ro$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$g,
        domains: domains$g,
        ui: ui$g,
        'default': ro
    });

    var services$h = {
    	generic: {
    		parameter_to_value: "{parameter} к {value}",
    		action_with_parameter: "{action} с {parameter}"
    	},
    	climate: {
    		set_temperature: "установить температуру[ {temperature}]",
    		set_temperature_hvac_mode_heat: "обогрев[ {temperature}]",
    		set_temperature_hvac_mode_cool: "охлаждение[ {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "обогрев/охлаждение[ {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "обогрев/охлаждение[ {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "aвто[ {temperature}]",
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
    var domains$h = {
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
    	lawn_mower: "lawn mower",
    	light: "освещение",
    	lock: "замки",
    	media_player: "медиа-плееры",
    	notify: "notification",
    	"switch": "розетки",
    	vacuum: "пылесосы",
    	water_heater: "подогреватели воды"
    };
    var ui$h = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Завершите модификации",
    			description: "Расписание, которое было изменено, в настоящее время отключено, следует ли его включить?"
    		},
    		confirm_delete: {
    			title: "Удалить объект?",
    			description: "Вы уверены, что хотите удалить этот объект?"
    		},
    		confirm_migrate: {
    			title: "Изменить расписание",
    			description: "При этом некоторые настройки будут потеряны. Вы хотите продолжить?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Планировщик",
    			new_schedule: "Новое расписание",
    			default_name: "Расписание #{id}"
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
    	services: services$h,
    	domains: domains$h,
    	ui: ui$h
    };

    var ru$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$h,
        domains: domains$h,
        ui: ui$h,
        'default': ru
    });

    var services$i = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} s {parameter}"
    	},
    	climate: {
    		set_temperature: "nastaviť teplotu[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "vykurovanie[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chladenie[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "vykurovanie/chladenie[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "vykurovanie/chladenie[ na {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "automatika[ na {temperature}]",
    		set_hvac_mode: "nastaviť režim[ na {hvac_mode}]",
    		set_preset_mode: "nastaviť predvoľbu[ {preset_mode}]",
    		set_fan_mode: "nastaviť režim ventilátora[ to {fan_mode}]"
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
    		notify: "poslať notifikáciu"
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
    var domains$i = {
    	alarm_control_panel: "ovládací panel alarmu",
    	binary_sensor: "binárny snímač",
    	climate: "klimatizácia",
    	cover: "rolety",
    	fan: "ventilátory",
    	group: "skupiny",
    	humidifier: "zvlhčovače",
    	input_boolean: "vstup boolean",
    	input_number: "vstup číslo",
    	input_select: "vstup voľba",
    	lawn_mower: "lawn mower",
    	light: "svetlá",
    	lock: "zámky",
    	media_player: "mediálne prehrávače",
    	notify: "notification",
    	"switch": "vypínače",
    	vacuum: "vysávače",
    	water_heater: "ohrievače vody"
    };
    var ui$i = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Dokončite úpravy",
    			description: "Plán, ktorý sa zmenil, je momentálne zakázaný, mal by byť povolený?"
    		},
    		confirm_delete: {
    			title: "Odstrániť entitu?",
    			description: "Naozaj chcete odstrániť túto entitu?"
    		},
    		confirm_migrate: {
    			title: "Upravte plán",
    			description: "Touto akciou sa stratia niektoré nastavenia. Chcete pokračovať?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plánovač",
    			new_schedule: "Nový plán",
    			default_name: "Plán #{id}"
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
    			time_input_mode: "Režim ovládania času"
    		},
    		conditions: {
    			equal_to: "je",
    			unequal_to: "nie je",
    			all: "Všetko",
    			any: "žiadny",
    			no_conditions_defined: "Nie sú definované žiadne podmienky",
    			track_conditions: "Prehodnoťte, keď sa zmenia podmienky"
    		},
    		options: {
    			repeat_type: "správanie sa po spustení",
    			period: "obdobie"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Entity",
    				other: "Iné"
    			},
    			fields: {
    				title: {
    					heading: "Názov karty",
    					options: {
    						standard: "štandardné",
    						hidden: "skryté",
    						custom: "vlastné"
    					},
    					custom_title: "Vlastný názov"
    				},
    				discover_existing: {
    					heading: "Zobraziť všetky plány",
    					description: "Tým sa nastaví parameter „objaviť existujúce“. Predtým vytvorené plány sa automaticky pridajú na kartu."
    				},
    				time_step: {
    					heading: "Časový krok",
    					description: "Rozlíšenie (v minútach) pre vytváranie plánov"
    				},
    				sort_by: {
    					heading: "Možnosti triedenia",
    					description: "Poradie, v akom sa rozvrhy zobrazujú na karte",
    					options: {
    						relative_time: "Zostávajúci čas do ďalšej akcie",
    						title: "Zobrazený názov rozvrhu",
    						state: "Zobraziť aktívne plány navrchu"
    					}
    				},
    				display_format_primary: {
    					heading: "Zobrazené primárne informácie",
    					description: "V prehľade nakonfigurujte, ktorý štítok sa použije pre plány",
    					options: {
    						"default": "Názov rozvrhu",
    						entity_action: "Zhrnutie úlohy"
    					}
    				},
    				display_format_secondary: {
    					heading: "Zobrazené sekundárne informácie",
    					description: "Nakonfigurujte, ktoré ďalšie vlastnosti sú viditeľné v prehľade",
    					options: {
    						relative_time: "Zostávajúci čas do ďalšej akcie",
    						time: "Nastavený čas pre ďalšiu akciu",
    						days: "Opakované dni v týždni",
    						additional_tasks: "Počet dodatočných úloh"
    					}
    				},
    				show_header_toggle: {
    					heading: "Zobraziť prepínač hlavičky",
    					description: "Zobraziť prepínač v hornej časti karty na povolenie/zakázanie všetkých entít"
    				},
    				tags: {
    					heading: "Tagy",
    					description: "Použite štítky na rozdelenie plánov medzi viacero kariet"
    				},
    				entities: {
    					heading: "Zahrnuté entity",
    					description: "Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",
    					included_number: "{number}/{total} vybraný"
    				}
    			}
    		}
    	}
    };
    var sk = {
    	services: services$i,
    	domains: domains$i,
    	ui: ui$i
    };

    var sk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$i,
        domains: domains$i,
        ui: ui$i,
        'default': sk
    });

    var services$j = {
    	generic: {
    		parameter_to_value: "{parameter} v {value}",
    		action_with_parameter: "{action} z {parameter}"
    	},
    	climate: {
    		set_temperature: "nastavi temperaturo[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "ogrej[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "ohladi[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "ogrej/ohladi[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "ogrej/ohladi[ na {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "samodejno[ na {temperature}]",
    		set_hvac_mode: "nastavi način[ na {hvac_mode}]",
    		set_preset_mode: "nastavi preset[ na {preset_mode}]",
    		set_fan_mode: "nastavi ventilator[ na {fan_mode}]"
    	},
    	cover: {
    		close_cover: "zapri",
    		open_cover: "odpri",
    		set_cover_position: "nastavi pozicijo[ na {position}]",
    		set_cover_tilt_position: "nastavi naklon[ na {tilt_position}]"
    	},
    	fan: {
    		set_speed: "nastavi hitrost[ na {speed}]",
    		set_direction: "nastavi smer[ na {direction}]",
    		oscillate: "nastavi obračanje[ na {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "nastavi vlažnost[ na {humidity}]",
    		set_mode: "nastavi način[ na {mode}]"
    	},
    	input_number: {
    		set_value: "nastavi vrednost[ na {value}]"
    	},
    	input_select: {
    		select_option: "izberi možnost[ {option}]"
    	},
    	select: {
    		select_option: "izberi možnost[ {option}]"
    	},
    	light: {
    		turn_on: "vključi[ z {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "Izberi vir[ {source}]"
    	},
    	notify: {
    		notify: "pošlji sporočilo"
    	},
    	script: {
    		script: "izvedi"
    	},
    	vacuum: {
    		start_pause: "zaženi / ustavi"
    	},
    	water_heater: {
    		set_operation_mode: "nastavi način[ na {operation_mode}]",
    		set_away_mode: "nastavi način odsoten"
    	}
    };
    var domains$j = {
    	alarm_control_panel: "kontrolna plošča alarma",
    	binary_sensor: "binarni sensorji",
    	climate: "klime",
    	cover: "rolete",
    	fan: "ventilatorji",
    	group: "skupine entitet",
    	humidifier: "vlažilniki",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	lawn_mower: "lawn mower",
    	light: "luči",
    	lock: "ključavnice",
    	media_player: "medijsi predvajalniki",
    	notify: "obvestila",
    	"switch": "stikala",
    	vacuum: "sesalniki",
    	water_heater: "grelniki vode"
    };
    var ui$j = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "dnevno",
    				workdays: "delovniki",
    				weekend: "vikend"
    			},
    			day_types_long: {
    				daily: "vsak dan",
    				workdays: "ob delovnikih",
    				weekend: "ob vikendih"
    			},
    			days: "dni",
    			tomorrow: "jutri",
    			repeated_days: "vsakih {days}",
    			repeated_days_except: "vsak dan razen {excludedDays}",
    			days_range: "od {startDay} do {endDay}",
    			next_week_day: "naslednji {weekday}"
    		},
    		time: {
    			absolute: "ob {time}",
    			interval: "od {startTime} do {endTime}",
    			at_midnight: "opolnoči",
    			at_noon: "opoldne",
    			at_sun_event: "ob {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Zaključi spremembe",
    			description: "Urnik, katerega ste spremenili je trenutno izključen, ali ga želite omogočiti?"
    		},
    		confirm_delete: {
    			title: "Ali želite odstraniti entiteto?",
    			description: "Ali ste prepričani, da želite odstraniti to entiteto?"
    		},
    		confirm_migrate: {
    			title: "Spremenite urnik",
    			description: "Nekatere nastavitve bodo s tem dejanjem izgubljene. Želite nadaljevati?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Urnik",
    			new_schedule: "Nov urnik",
    			default_name: "Urnik #{id}"
    		},
    		overview: {
    			no_entries: "Ni vpisov za prikaz",
    			backend_error: "Ni povezave s komponento urnika. Komponenta mora biti nameščena kot integracija, preden lahko uporabite to kartico.",
    			excluded_items: "{number}{if number is 1} izločen predmet {else} izločenih predmetov",
    			hide_excluded: "skrij izločene predmete",
    			additional_tasks: "še {number}{if number is 1} opravilo {else} opravil"
    		},
    		entity_picker: {
    			no_groups_defined: "Ni definiranih skupin",
    			no_group_selected: "Najprej izberite skupino",
    			no_entities_for_group: "V tej skupini ni entitet",
    			no_entity_selected: "Najprej izberite entiteto",
    			no_actions_for_entity: "Za to entiteto ni akcij",
    			make_scheme: "izdelaj shemo",
    			multiple: "Večkratno"
    		},
    		time_picker: {
    			no_timeslot_selected: "Najprej izberi časovni okvir",
    			time_scheme: "Shema",
    			time_input_mode: "Način časovnega nadzora"
    		},
    		conditions: {
    			equal_to: "je enako",
    			unequal_to: "ni enako",
    			all: "vse",
    			any: "karkoli",
    			no_conditions_defined: "Ni definiranih pogojev",
    			track_conditions: "Ponovno preglej ko se pogoji spremenijo"
    		},
    		options: {
    			repeat_type: "obnašanje, ko končaš",
    			period: "perioda"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Entitete",
    				other: "Ostalo"
    			},
    			fields: {
    				title: {
    					heading: "Ime kartice",
    					options: {
    						standard: "standardno",
    						hidden: "skrito",
    						custom: "po meri"
    					},
    					custom_title: "Ime po želji"
    				},
    				discover_existing: {
    					heading: "Prikaži vse urnike",
    					description: "Tole nastavi parameter 'discover existing'. Prej kreirani urniki bodo samodejno dodani v kartico. "
    				},
    				time_step: {
    					heading: "Časovni korak",
    					description: "Ločljivost (v minutah) za kreiranje urnikov"
    				},
    				sort_by: {
    					heading: "Možnosti sortiranja",
    					description: "Zaporedje, po katerem se prikažejo urniki na kartici",
    					options: {
    						relative_time: "Preostali čas do naslednje akcije",
    						title: "Prikazano ime urnika",
    						state: "Prikaži aktivne urnike na vrhu"
    					}
    				},
    				display_format_primary: {
    					heading: "Prikazane primarne informacije",
    					description: "Nastavite, kaj se prikazuje v pregledu urnikov",
    					options: {
    						"default": "Ime urnika",
    						entity_action: "Povzetek operacije"
    					}
    				},
    				display_format_secondary: {
    					heading: "Prikazane sekundarne informacije",
    					description: "Nastavite, katere dodatne informacije želite imeti prikazane v pregledu",
    					options: {
    						relative_time: "Preostali čas do naslednje akcije",
    						time: "Nastavljen čas za naslednjo akcijo",
    						days: "Katere dni/kdaj se sproži akcija",
    						additional_tasks: "Število dodatnih opravil"
    					}
    				},
    				show_header_toggle: {
    					heading: "Prikaži glavo",
    					description: "Na vrhu prikaže stikalo, s katerim lahko omogočite/izključite vse entitete naenkrat"
    				},
    				tags: {
    					heading: "Tag-i",
    					description: "Uporabite tag-e za ločevanje urnikov med več karticami"
    				},
    				entities: {
    					heading: "Vključene entitete",
    					description: "Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",
    					included_number: "{number}/{total} izbranih"
    				}
    			}
    		}
    	}
    };
    var sl = {
    	services: services$j,
    	domains: domains$j,
    	ui: ui$j
    };

    var sl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$j,
        domains: domains$j,
        ui: ui$j,
        'default': sl
    });

    var services$k = {
    	generic: {
    		parameter_to_value: "{parameter} до {value}",
    		action_with_parameter: "{action} з {parameter}"
    	},
    	climate: {
    		set_temperature: "встановити температуру[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "нагрів[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "охолодження[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "нагрів/охолодження[ to {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "нагрів/охолодження[ to {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "aвтоматичний[ to {temperature}]",
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
    var domains$k = {
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
    	lawn_mower: "lawn mower",
    	light: "освітлення",
    	lock: "замки",
    	media_player: "медіаплеєри",
    	notify: "notification",
    	"switch": "вимикачі",
    	vacuum: "пилососи",
    	water_heater: "водонагрівачі"
    };
    var ui$k = {
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
    	dialog: {
    		enable_schedule: {
    			title: "Завершіть зміни",
    			description: "Розклад, який було змінено, наразі вимкнено, чи потрібно його ввімкнути?"
    		},
    		confirm_delete: {
    			title: "Видалити сутність?",
    			description: "Ви дійсно бажаєте видалити цю сутність?"
    		},
    		confirm_migrate: {
    			title: "Змінити розклад",
    			description: "У результаті цієї дії деякі налаштування буде втрачено. Ви бажаєте продовжити?"
    		}
    	},
    	panel: {
    		common: {
    			title: "Планувальник",
    			new_schedule: "Новий розклад",
    			default_name: "Розклад #{id}"
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
    	services: services$k,
    	domains: domains$k,
    	ui: ui$k
    };

    var uk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$k,
        domains: domains$k,
        ui: ui$k,
        'default': uk
    });

    var services$l = {
    	generic: {
    		parameter_to_value: "{parameter} 至 {value}",
    		action_with_parameter: "{action} 使用 {parameter}"
    	},
    	climate: {
    		set_temperature: "设定温度[ 至 {temperature}]",
    		set_temperature_hvac_mode_heat: "制热模式[ 至 {temperature}]",
    		set_temperature_hvac_mode_cool: "制冷模式[ 至 {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "制热模式/制冷模式[ 至 {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "制热模式/制冷模式[ 至 {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "自动[ 至 {temperature}]",
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
    var domains$l = {
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
    	lawn_mower: "lawn mower",
    	light: "灯具",
    	lock: "门锁",
    	media_player: "媒体播放器",
    	notify: "notification",
    	"switch": "开关",
    	vacuum: "扫地机/吸尘器",
    	water_heater: "热水器"
    };
    var ui$l = {
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
    	dialog: {
    		enable_schedule: {
    			title: "完成修改",
    			description: "已更改的计划当前已禁用，是否应该启用？"
    		},
    		confirm_delete: {
    			title: "是否删除实体？",
    			description: "您确定要删除此实体吗？"
    		},
    		confirm_migrate: {
    			title: "修改时间表",
    			description: "此操作将丢失某些设置。 你想继续吗？"
    		}
    	},
    	panel: {
    		common: {
    			title: "计划任务",
    			new_schedule: "新时间表",
    			default_name: "日程 #{id}"
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
    	services: services$l,
    	domains: domains$l,
    	ui: ui$l
    };

    var zh_Hans = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$l,
        domains: domains$l,
        ui: ui$l,
        'default': zhHans
    });

    const languages = {
        cs: cs$1,
        de: de$1,
        en: en$1,
        es: es$1,
        et: et$1,
        es_419: es$1,
        fi: fi$1,
        fr: fr$1,
        he: he$1,
        hu: hu$1,
        it: it$1,
        lv: lv$1,
        nb: no$1,
        nl: nl$1,
        nn: no$1,
        no: no$1,
        pl: pl$1,
        pt: pt$1,
        'pt-BR': pt_br,
        ro: ro$1,
        sk: sk$1,
        sl: sl$1,
        ru: ru$1,
        uk: uk$1,
        'zh-Hans': zh_Hans,
    };
    function localize(string, hass, search = [], replace = []) {
        let translated;
        try {
            translated = string.split('.').reduce((o, i) => o[i], languages[hass.locale.language]);
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
        search = [search || []].flat();
        replace = [replace || []].flat();
        if (search.length && replace.length && translated) {
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
        const res = /\[([^\]]+)\]/.exec(translated);
        if (res) {
            const hasUnassignedWildcards = /\{([^\}]+)\}/.exec(res[1]);
            if (hasUnassignedWildcards)
                translated = translated.replace(res[0], '');
            else
                translated = translated.replace(res[0], res[1]);
        }
        if (!translated) {
            console.log(`missing translation for ${string}`);
        }
        return translated;
    }

    const computeEntity = (entityId) => entityId.split(".")[1] || "";
    const computeDomain = (entityId) => entityId.split(".")[0] || "";
    const friendlyName = (entityId, attributes) => {
        var _a;
        return attributes.friendly_name === undefined
            ? computeEntity(entityId).replace(/_/g, " ")
            : ((_a = attributes.friendly_name) !== null && _a !== void 0 ? _a : "").toString();
    };

    function matchPattern(pattern, value) {
        let res = false;
        if (pattern.match(/^[a-z0-9_\.]+$/)) {
            res = !pattern.includes('.') && value.includes('.') ? pattern == computeDomain(value) : pattern == value;
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

    const isIncludedSchedule = (schedule, config) => {
        let entityList = [];
        schedule.entries.forEach(entry => {
            entry.slots.forEach(slot => {
                slot.actions.forEach(action => {
                    let entities = action.target.entity_id ? [action.target.entity_id].flat() : action.service;
                    entityList = [...entityList, ...entities];
                });
            });
        });
        return entityList.every(entityId => ((config.include || []).some(e => matchPattern(e, entityId)) ||
            Object.keys(config.customize || {}).some(e => matchPattern(e, entityId))) &&
            !(config.exclude || []).some(e => matchPattern(e, entityId)));
    };

    const sortByName = (nameA, nameB) => {
        const stringCompare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        return stringCompare(nameA.toLowerCase(), nameB.toLowerCase());
    };

    const computeTimeDisplay = (startTime, stopTime) => {
        return `${startTime} - ${stopTime}`;
    };

    const supportedActions = {
        alarm_control_panel: {
            alarm_disarm: {
                target: {}
            },
            alarm_arm_home: {
                target: {}
            },
            alarm_arm_away: {
                target: {}
            },
            alarm_arm_night: {
                target: {}
            },
            alarm_arm_custom_bypass: {
                target: {}
            },
            alarm_arm_vacation: {
                target: {}
            },
        },
        automation: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            },
            trigger: {
                target: {}
            },
        },
        button: {
            press: {
                target: {}
            },
        },
        climate: {
            turn_off: {
                target: {}
            },
            set_hvac_mode: {
                fields: {
                    hvac_mode: {}
                }
            },
            set_temperature: {
                translation_key: [
                    'services.climate.set_temperature',
                    'services.climate.set_temperature_hvac_mode_heat',
                    'services.climate.set_temperature_hvac_mode_cool',
                    'services.climate.set_temperature_hvac_mode_heat_cool'
                ],
                target: {},
                fields: {
                    temperature: {
                        supported_features: 1
                    },
                    target_temp_high: {
                        supported_features: 2
                    },
                    target_temp_low: {
                        supported_features: 2
                    },
                    hvac_mode: {
                        optional: true
                    }
                }
            },
            set_preset_mode: {
                target: {},
                fields: {
                    preset_mode: {}
                }
            },
            set_fan_mode: {
                target: {},
                fields: {
                    fan_mode: {}
                }
            },
        },
        cover: {
            close_cover: {
                target: {}
            },
            open_cover: {
                target: {}
            },
            set_position: {
                target: {},
                fields: {
                    position: {}
                }
            },
            set_tilt_position: {
                target: {},
                fields: {
                    tilt_position: {}
                }
            },
        },
        fan: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            },
            set_percentage: {
                target: {},
                fields: {
                    percentage: {}
                }
            },
            oscillate: {
                target: {},
                fields: {
                    oscillating: {}
                }
            },
            set_direction: {
                target: {},
                fields: {
                    direction: {}
                }
            },
            set_preset_mode: {
                target: {},
                fields: {
                    preset_mode: {}
                }
            },
        },
        humidifier: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            },
            set_humidity: {
                target: {},
                fields: {
                    humidity: {}
                }
            },
            set_mode: {
                target: {},
                fields: {
                    mode: {}
                }
            },
        },
        input_boolean: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            }
        },
        input_button: {
            press: {
                target: {}
            },
        },
        input_number: {
            set_value: {
                target: {},
            }
        },
        input_select: {
            select_option: {
                target: {},
                fields: {
                    option: {}
                }
            },
        },
        light: {
            turn_on: {
                target: {},
                fields: {
                    brightness: {
                        optional: true
                    }
                }
            },
            turn_off: {
                target: {}
            }
        },
        lock: {
            lock: {
                target: {}
            },
            unlock: {
                target: {}
            },
        },
        media_player: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            },
            select_source: {
                target: {},
                fields: {
                    source: {}
                }
            },
        },
        notify: {
            '{any}': {
                fields: {
                    title: {},
                    message: {}
                }
            },
        },
        number: {
            set_value: {
                target: {},
                fields: {
                    value: {}
                }
            },
        },
        scene: {
            turn_on: {
                target: {}
            },
        },
        script: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            },
            '{entity_id}': {},
        },
        select: {
            select_option: {
                target: {},
                fields: {
                    option: {}
                }
            },
        },
        switch: {
            turn_on: {
                target: {}
            },
            turn_off: {
                target: {}
            }
        },
        vacuum: {
            turn_on: {
                target: {}
            },
            start: {
                target: {}
            },
            play_pause: {
                target: {}
            },
        },
        water_heater: {
            set_temperature: {
                target: {},
                fields: {
                    temperature: {}
                }
            },
            set_operation_mode: {
                target: {},
                fields: {
                    operation_mode: {}
                }
            },
            set_away_mode: {
                target: {},
                fields: {
                    away_mode: {}
                }
            }
        }
    };

    const actionConfig = (service) => {
        const domain = computeDomain(service);
        const domainService = computeEntity(service);
        if (!Object.keys(supportedActions).includes(domain))
            return;
        if (!Object.keys(supportedActions[domain]).includes(domainService))
            return;
        return supportedActions[domain][domainService];
    };

    const listSelector = (input) => {
        let cfg = {
            select: {
                options: input.options,
            }
        };
        if (input.translation_key)
            cfg = Object.assign(Object.assign({}, cfg), { select: Object.assign(Object.assign({}, cfg.select), { translation_key: input.translation_key }) });
        return cfg;
    };

    const numericSelector = (input) => {
        let cfg = {
            number: {}
        };
        if (Object.keys(input).includes('min') && !isNaN(Number(input.min)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { min: Number(input.min) }) });
        if (Object.keys(input).includes('max') && !isNaN(Number(input.max)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { max: Number(input.max) }) });
        if (Object.keys(input).includes('step') && !isNaN(Number(input.step)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { step: Number(input.step) }) });
        if (Object.keys(input).includes('mode') && ['box', 'slider'].includes(input.mode))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { mode: input.mode }) });
        if (Object.keys(input).includes('unit_of_measurement') && input.unit_of_measurement)
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { unit_of_measurement: input.unit_of_measurement }) });
        return cfg;
    };

    const selectorConfig = (_service, entityId, field, hass) => {
        const entityIds = [entityId || []].flat();
        let loadedCfg = entityIds.map(e => selectorConfigFromEntity(e, field, hass));
        let selector = mergeSelectors(loadedCfg);
        return selector;
    };
    const selectorConfigFromEntity = (entityId, field, hass) => {
        if (!Object.keys(hass.states).includes(entityId))
            return null;
        const stateObj = hass.states[entityId];
        const attr = stateObj.attributes;
        const domain = computeDomain(entityId);
        const searchKey = `${domain}.${field}`;
        switch (searchKey) {
            case 'climate.temperature':
            case 'climate.target_temp_low':
            case 'climate.target_temp_high':
                return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: attr.target_temp_step, unit_of_measurement: `${hass.config.unit_system.temperature}` });
            case 'climate.hvac_mode':
                return listSelector({ options: attr.hvac_modes, translation_key: 'component.climate.entity_component._.state.${value}' });
            case 'climate.preset_mode':
                return listSelector({ options: attr.preset_modes, translation_key: 'state_attributes.climate.preset_mode.${value}' });
            case 'climate.fan_mode':
                return listSelector({ options: attr.fan_modes });
            case 'cover.position':
            case 'cover.tilt_position':
            case 'fan.percentage':
                return numericSelector({ min: 0, max: 100, step: 1, unit_of_measurement: '%' });
            case 'fan.oscillating':
                return { boolean: {} };
            case 'fan.direction':
                return listSelector({ options: ['forward', 'reverse'], translation_key: 'ui.card.fan.${value}' });
            case 'fan.preset_mode':
                return listSelector({ options: attr.preset_modes });
            case 'humdifier.humidity':
                return numericSelector({ min: attr.min_humidity, max: attr.max_humidity, step: 1, unit_of_measurement: '%' });
            case 'humidity.mode':
                return listSelector({ options: attr.available_modes });
            case 'input_number.value':
            case 'number.value':
                return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit_of_measurement: attr.unit_of_measurement });
            case 'input_select.option':
            case 'select.option':
                return listSelector({ options: attr.options });
            case 'light.brightness':
                return numericSelector({ min: 0, max: 255, step: 1 });
            case 'media_player.source':
            case 'notify.title':
            case 'notify.message':
                return { text: {} };
            case 'water_heater.temperature':
                return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: 0.1, unit_of_measurement: '${hass.config.unit_system.temperature}' });
            case 'water_heater.operation_mode':
                return listSelector({ options: attr.operation_list });
            case 'water_heater.away_mode':
                return { boolean: {} };
        }
        return null;
    };
    const mergeSelectors = (input) => {
        const isUnique = (input) => new Set(input).size == input.length;
        if (input.some(e => e === null) || !input.length)
            return null;
        if (input.every(e => e.hasOwnProperty('select'))) {
            const optionsLists = input.map(e => e.select.options).filter(e => e !== undefined);
            const commonOptions = optionsLists.length ? optionsLists.reduce((a, b) => a.filter(c => b.includes(c))) : [];
            const translationKeyLists = input.map(e => e.select.translation_key).filter(e => e !== undefined);
            return {
                select: {
                    options: commonOptions.length ? commonOptions : undefined,
                    translation_key: translationKeyLists.length && isUnique(translationKeyLists) ? translationKeyLists[0] : undefined
                }
            };
        }
        else if (input.every(e => e.hasOwnProperty('number'))) {
            const minList = input.map(e => e.number.min).filter(e => e !== undefined);
            const maxList = input.map(e => e.number.max).filter(e => e !== undefined);
            const stepList = input.map(e => e.number.step).filter(e => e !== undefined);
            const modeList = input.map(e => e.number.mode).filter(e => e !== undefined);
            const uomList = input.map(e => e.number.unit_of_measurement).filter(e => e !== undefined);
            return {
                number: {
                    min: minList.length ? Math.max(...minList) : undefined,
                    max: maxList.length ? Math.min(...maxList) : undefined,
                    step: stepList.length ? Math.max(...stepList) : undefined,
                    mode: modeList.length && isUnique(modeList) ? modeList[0] : undefined,
                    unit_of_measurement: uomList.length && isUnique(uomList) ? uomList[0] : undefined,
                }
            };
        }
        else if (input.every(e => e.hasOwnProperty('boolean'))) {
            return {
                boolean: {}
            };
        }
        else if (input.every(e => e.hasOwnProperty('text'))) {
            return {
                text: {}
            };
        }
        return null;
    };

    const formatSelectorDisplay = (action, hass) => {
        return Object.fromEntries(Object.entries(action.service_data).map(([field, value]) => {
            const selector = selectorConfig(action.service, action.target.entity_id, field, hass);
            if (!selector)
                return [field, value];
            if (Object.keys(selector).includes('number') && selector.number) {
                const config = selector.number;
                if (config === null || config === void 0 ? void 0 : config.unit_of_measurement)
                    return [field, `${value}${config.unit_of_measurement}`];
            }
            return [field, value];
        }));
    };

    const formatActionDisplay = (action, hass, formatShort = false) => {
        const config = actionConfig(action.service);
        let actionDisplay = '';
        if (config === null || config === void 0 ? void 0 : config.translation_key) {
            const translationKey = Array.isArray(config.translation_key)
                ? config.translation_key.filter(e => {
                    const sections = e.split(".").slice(4);
                    const props = Object.fromEntries(sections.map((el, i) => i % 2 == 0 ? [el, sections[i + 1]] : []).filter(el => el.length));
                    return Object.keys(props).every(e => Object.keys(action.service_data).includes(e) && action.service_data[e] == props[e]);
                }).reduce((a, b) => a.length > b.length ? a : b)
                : config.translation_key;
            let attributes = formatSelectorDisplay(action, hass);
            actionDisplay = localize(translationKey, hass, Object.keys(attributes).map(e => `{${e}}`), Object.values(attributes));
            if (formatShort) {
                if (Object.keys(attributes).length > 1) {
                    const sortAttributes = (fieldA, fieldB) => {
                        const configA = config.fields[fieldA];
                        const configB = config.fields[fieldB];
                        if (configA.optional && !configB.optional)
                            return 1;
                        if (configB.optional && !configA.optional)
                            return -1;
                        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
                    };
                    attributes = Object.fromEntries(Object.entries(attributes).sort(([a,], [b,]) => sortAttributes(a, b)));
                }
                return Object.values(attributes).shift();
            }
        }
        else {
            const domain = computeDomain(action.service);
            const service = computeEntity(action.service);
            actionDisplay = hass.localize(`component.${domain}.services.${service}.name`) ||
                hass.services[domain][service].name ||
                service.replace(/_/g, ' ');
        }
        return actionDisplay;
    };

    const supportLocaleString = () => {
        try {
            new Date().toLocaleDateString('i');
        }
        catch (e) {
            return e.name === 'RangeError';
        }
        return false;
    };
    const weekdayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const computeDaysDisplay = (weekdays, hass) => {
        const computeDayDisplay = (weekday) => {
            switch (weekday) {
                case TWeekday.Daily:
                    return localize('card.days.daily', hass);
                case TWeekday.Workday:
                    return localize('card.days.workdays', hass);
                case TWeekday.Weekend:
                    return localize('card.days.weekend', hass);
                case TWeekday.Monday:
                case TWeekday.Tuesday:
                case TWeekday.Wednesday:
                case TWeekday.Thursday:
                case TWeekday.Friday:
                case TWeekday.Saturday:
                case TWeekday.Sunday:
                    let date = new Date(2017, 1, 26);
                    let dayNumber = weekdayList.findIndex(e => e == weekday);
                    if (!supportLocaleString())
                        return weekdayList[dayNumber];
                    date.setDate(date.getDate() + dayNumber);
                    return date.toLocaleDateString(hass.locale.language);
                default:
                    return '';
            }
        };
        return weekdays.map(computeDayDisplay);
    };

    const computeScheduleDisplay = (schedule, config, hass) => {
        const computeDisplay = (item) => {
            switch (item) {
                case DisplayItem.Action:
                    const action = schedule.entries[0].slots[schedule.next_entries[0]].actions[0];
                    return formatActionDisplay(action, hass);
                case DisplayItem.Days:
                    return computeDaysDisplay(schedule.entries[0].weekdays, hass);
                case DisplayItem.Name:
                    return schedule.name || '';
                case DisplayItem.AdditionalTasks:
                    return schedule.entries[0].slots.length > 1
                        ? '+' +
                            localize('ui.panel.overview.additional_tasks', hass, '{number}', String(schedule.entries[0].slots.length - 1))
                        : '';
                case DisplayItem.Entity:
                    const nextAction = schedule.entries[0].slots[schedule.next_entries[0]].actions[0];
                    const entityIds = [nextAction.target.entity_id || []].flat();
                    const entityDisplay = entityIds.map(e => friendlyName(e, hass.states[e].attributes)).join(", ");
                    return entityDisplay;
                case DisplayItem.RelativeTime:
                    const ts = schedule.timestamps[schedule.next_entries[0]];
                    return x `
          <ha-relative-time
            .hass=${hass}
            .datetime=${ts}
          >
          </ha-relative-time>`;
                case DisplayItem.Tags:
                    return '';
                case DisplayItem.Time:
                    const slot = schedule.entries[0].slots[schedule.next_entries[0]];
                    return computeTimeDisplay(slot.start, slot.stop);
                case DisplayItem.Default:
                    return computeDisplay(DisplayItem.Name) || `${computeDisplay(DisplayItem.Entity)}: ${computeDisplay(DisplayItem.Action)}`;
                default:
                    const regex = /(\{[a-z\-]+\})/g;
                    if (item.match(regex)) {
                        let output = item.split(regex).map(e => {
                            let res = e.match(/^\{([a-z\-]+)\}$/);
                            if (res)
                                return computeDisplay(res[1]);
                            return e;
                        });
                        return output;
                    }
                    else
                        return item;
            }
        };
        return [...[config].flat()].map(e => {
            let result = computeDisplay(e);
            if (!result)
                return;
            return x `
    ${result}
          <br/>
            `;
        });
    };

    const sortByRelativeTime = (scheduleA, scheduleB) => {
        const remainingA = new Date(scheduleA.timestamps[scheduleA.next_entries[0]]).valueOf();
        const remainingB = new Date(scheduleB.timestamps[scheduleB.next_entries[0]]).valueOf();
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
                return scheduleA.entity_id < scheduleB.entity_id ? 1 : -1;
        }
        else if (remainingB !== null)
            return 1;
        else if (remainingA !== null)
            return -1;
        else
            return scheduleA.entity_id < scheduleB.entity_id ? 1 : -1;
    };
    const sortByTitle = (scheduleA, scheduleB, displayFormat, hass) => {
        //if (!displayInfo[.schedule_id!]) return displayInfo[b.schedule_id!] ? 1 : -1;
        const titleA = computeScheduleDisplay(scheduleA, displayFormat, hass).join();
        const titleB = computeScheduleDisplay(scheduleB, displayFormat, hass).join();
        return sortByName(titleA, titleB);
    };
    const sortByState = (scheduleA, scheduleB, hass, expiredSchedulesLast) => {
        var _a, _b;
        const stateA = (_a = hass.states[scheduleA.entity_id]) === null || _a === void 0 ? void 0 : _a.state;
        const stateB = (_b = hass.states[scheduleB.entity_id]) === null || _b === void 0 ? void 0 : _b.state;
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
    };
    const sortSchedules = (schedules, config, hass) => {
        const sortingOptions = [config.sort_by].flat();
        if (sortingOptions.includes('relative-time')) {
            schedules = Object.entries(schedules)
                .sort(([, a], [, b]) => sortByRelativeTime(a, b))
                .reduce((r, [k, v]) => (Object.assign(Object.assign({}, r), { [k]: v })), {});
        }
        if (sortingOptions.includes('title')) {
            schedules = Object.entries(schedules)
                .sort(([, a], [, b]) => sortByTitle(a, b, config.display_options.primary_info, hass))
                .reduce((r, [k, v]) => (Object.assign(Object.assign({}, r), { [k]: v })), {});
        }
        if (sortingOptions.includes('state')) {
            schedules = Object.entries(schedules)
                .sort(([, a], [, b]) => sortByState(a, b, hass, sortingOptions.includes('relative-time')))
                .reduce((r, [k, v]) => (Object.assign(Object.assign({}, r), { [k]: v })), {});
        }
        return schedules;
    };

    const fetchScheduleItem = (hass, schedule_id) => hass.callWS({
        type: 'scheduler/item',
        schedule_id: schedule_id,
    })
        .then(res => {
        return convertLegacySchedule(res);
    });

    const fireEvent = (node, type, detail, options) => {
        options = options || {};
        // @ts-ignore
        detail = detail === null || detail === undefined ? {} : detail;
        const event = new Event(type, {
            bubbles: options.bubbles === undefined ? true : options.bubbles,
            cancelable: Boolean(options.cancelable),
            composed: options.composed === undefined ? true : options.composed
        });
        event.detail = detail;
        node.dispatchEvent(event);
        return event;
    };

    // Material Design Icons v7.4.47
    var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
    var mdiArrowRight = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";
    var mdiChevronLeft = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
    var mdiClockOutline = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
    var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
    var mdiDotsVertical = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
    var mdiPencil = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
    var mdiUnfoldMoreVertical = "M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z";
    var mdiWeatherSunsetDown = "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z";
    var mdiWeatherSunsetUp = "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z";

    const domainIcons = {
        alarm_control_panel: 'mdi:alarm-light-outline',
        air_quality: 'mdi:air-filter',
        alert: 'mdi:alert',
        automation: 'mdi:robot',
        binary_sensor: 'mdi:radiobox-blank',
        button: 'mdi:gesture-tap-button',
        camera: 'mdi:camera',
        calendar: 'mdi:calendar',
        cover: 'mdi:window-shutter',
        climate: 'mdi:thermostat',
        configurator: 'mdi:cog',
        conversation: 'mdi:microphone-message',
        counter: 'mdi:counter',
        date: 'mdi:calendar',
        datetime: 'mdi:calendar-clock',
        demo: 'mdi:home-assistant',
        device_tracker: 'mdi:account',
        fan: 'mdi:fan',
        google_assistant: 'mdi:google-assistant',
        group: 'mdi:google-circles-communities',
        homeassistant: 'mdi:home-assistant',
        homekit: 'mdi:home-automation',
        humidifier: 'mdi:air-humidifier',
        image_processing: 'mdi:image-filter-frames',
        image: 'mdi:image',
        input_boolean: 'mdi:toggle-switch',
        input_button: 'mdi:button-pointer',
        input_datetime: 'mdi:calendar-clock',
        input_number: 'mdi:ray-vertex',
        input_select: 'mdi:format-list-bulleted',
        input_text: 'mdi:form-textbox',
        lawn_mower: 'mdi:robot-mower',
        light: 'mdi:lightbulb',
        lock: 'mdi:lock-open-outline',
        media_player: 'mdi:cast-connected',
        mailbox: 'mdi:mailbox',
        notify: 'mdi:comment-alert',
        number: 'mdi:ray-vertex',
        persistent_notification: 'mdi-bell',
        person: 'mdi:account',
        plant: 'mdi:flower',
        proximity: 'mdi:apple-safari',
        remote: 'mdi:remote',
        scene: 'mdi:palette',
        schedule: 'mdi:calendar-clock',
        script: 'mdi:script-text',
        select: 'mdi:format-list-bulleted',
        sensor: 'mdi:eye',
        simple_alarm: 'mdi:bell',
        siren: 'mdi:bullhorn',
        stt: 'mdi:microphone-message',
        sun: 'mdi:white-balance-sunny',
        switch: 'mdi:flash',
        text: 'mdi:form-textbox',
        time: 'mdi:clock',
        timer: 'mdi:timer-outline',
        todo: 'mdi:clipboard-list',
        tts: 'mdi:speaker-message',
        vacuum: 'mdi:robot-vacuum',
        wake_word: 'mdi:chat-sleep',
        water_heater: 'mdi:water-boiler',
        weather: 'mdi:weather-partly-cloudy',
        zone: 'mdi:map-marker-radius',
    };
    const domainIcon = (domain) => {
        return Object.keys(domainIcons).includes(domain)
            ? domainIcons[domain]
            : 'mdi:help';
    };

    const isSupportedDomain = (domain) => {
        const res = Object.keys(supportedActions).includes(domain);
        // if(!res) {
        //   console.log(`Domain ${domain} is not supported.`);
        // }
        return res;
    };
    const computeActionDomains = (hass, config) => {
        let domains = Object.keys(hass.services).filter(isSupportedDomain);
        domains = domains.filter(domain => {
            return ((config.include || []).some(e => matchPattern(e, domain)) ||
                Object.keys(config.customize || {}).some(e => matchPattern(e, domain))) &&
                !(config.exclude || []).some(e => matchPattern(e, domain));
        });
        let actionList = domains.map(e => Object({
            key: e,
            name: hass.localize(`component.${e}.title`) || e.replace(/_/g, " "),
            description: "",
            icon: domainIcon(e)
        }));
        return actionList;
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$3={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$7=t=>(...e)=>({_$litDirective$:t,values:e});class i$3{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i$4="important",n$6=" !"+i$4,o$5=e$7(class extends i$3{constructor(t){var e;if(super(t),t.type!==t$3.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n$6);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i$4:""):s[t]=e;}}return T}});

    const SUPPORTED_CONDITION_DOMAINS = [
        'alarm_control_panel',
        'binary_sensor',
        'climate',
        'calendar',
        'cover',
        'device_tracker',
        'fan',
        'humidifier',
        'input_boolean',
        'input_number',
        'input_select',
        'light',
        'lock',
        'number',
        'person',
        'proximity',
        'select',
        'sensor',
        'sun',
        'switch',
        'timer',
        'water_heater'
    ];
    const computeStatesForEntity = (entityId, hass) => {
        const stateObj = Object.keys(hass.states).includes(entityId) ? hass.states[entityId] : undefined;
        const domain = computeDomain(entityId);
        const attr = (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes) || {};
        switch (domain) {
            case 'alarm_control_panel':
                let modes = ['disarmed', 'triggered'];
                if ((attr.supported_features || 0) & 2)
                    modes = [...modes, 'armed_away'];
                if ((attr.supported_features || 0) & 1)
                    modes = [...modes, 'armed_home'];
                if ((attr.supported_features || 0) & 4)
                    modes = [...modes, 'armed_night'];
                if ((attr.supported_features || 0) & 16)
                    modes = [...modes, 'armed_custom_bypass'];
                if ((attr.supported_features || 0) & 32)
                    modes = [...modes, 'armed_vacation'];
                return listSelector({ options: modes, translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'binary_sensor':
                return listSelector({ options: ['on', 'off'], translation_key: 'component.${domain}.entity_component.${deviceClass}.state.${value}' });
            case 'climate':
                return listSelector({ options: attr.hvac_modes, translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'calendar':
            case 'fan':
            case 'humidifier':
            case 'input_boolean':
            case 'light':
            case 'switch':
                return listSelector({ options: ['on', 'off'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'cover':
                return listSelector({ options: ['open', 'closed'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'device_tracker':
                return listSelector({ options: ['home', 'not_home'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'input_number':
            case 'number':
                return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit_of_measurement: attr.unit_of_measurement });
            case 'input_select':
            case 'select':
                return listSelector({ options: attr.options });
            case 'lock':
                return listSelector({ options: ['locked', 'unlocked'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'person':
                const zones = Object.keys(hass.states).filter(e => computeDomain(e) == 'zone').map(computeEntity);
                return listSelector({ options: [...new Set(['home', 'not_home', ...zones])] });
            case 'proximity':
                return numericSelector({ mode: 'box', unit_of_measurement: attr.unit_of_measurement });
            case 'sensor':
                return !isNaN(Number(stateObj === null || stateObj === void 0 ? void 0 : stateObj.state))
                    ? numericSelector({ mode: 'box', unit_of_measurement: attr.unit_of_measurement })
                    : { text: {} };
            case 'sun':
                return listSelector({ options: ['above_horizon', 'below_horizon'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'timer':
                return listSelector({ options: ['active', 'paused', 'idle'], translation_key: 'component.${domain}.entity_component._.state.${value}' });
            case 'water_heater':
            case 'climate':
                return listSelector({ options: attr.operation_list, translation_key: 'component.${domain}.entity_component._.state.${value}' });
            default:
                return { text: {} };
        }
    };

    const isSupportedDomain$1 = (domain) => {
        return SUPPORTED_CONDITION_DOMAINS.includes(domain);
    };
    const computeConditionDomains = (hass) => {
        const domains = Object.keys(hass.states)
            .map(e => computeDomain(e))
            .reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
            .filter(isSupportedDomain$1);
        let actionList = domains.map(e => Object({
            key: e,
            name: hass.localize(`component.${e}.title`) || e.replace(/_/g, " "),
            description: "",
            icon: domainIcon(e)
        }));
        return actionList;
    };

    const FALLBACK_ICON = 'mdi:help';
    const computeEntityIcon = (entityId, hass) => {
        if (!Object.keys(hass.states).includes(entityId)) {
            return FALLBACK_ICON;
        }
        const stateObj = hass.states[entityId];
        if (stateObj.attributes.icon)
            return stateObj.attributes.icon;
        const domain = computeDomain(entityId);
        return domainIcon(domain);
    };

    const computeDomains = (hass) => {
        let domains = computeActionDomains(hass, {});
        let conditionDomains = computeConditionDomains(hass);
        conditionDomains = conditionDomains.filter(e => !domains.map(f => f.key).includes(e.key));
        return [...domains, ...conditionDomains];
    };
    const computeEntitiesForDomain = (domain, hass) => {
        const entities = Object.keys(hass.states).filter(e => computeDomain(e) == domain);
        let entityList = entities.map(e => Object({
            key: e,
            name: friendlyName(e, hass.states[e].attributes),
            description: "",
            icon: computeEntityIcon(e, hass)
        }));
        return entityList;
    };
    let DialogSelectEntities = class DialogSelectEntities extends s$3 {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
        }
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.confirm({ domains: this._params.domains, entities: this._params.entities });
            this._params = undefined;
            this._clearSearch();
            this._height = undefined;
            this._width = undefined;
        }
        render() {
            if (!this._params)
                return x ``;
            return x `
      <ha-dialog
        open
        .heading=${true}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            ${this.selectedDomain
            ? x `
            <ha-icon-button
              slot="navigationIcon"
              .label=${this.hass.localize('ui.common.back')}
              .path=${mdiChevronLeft}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `
            : x `
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
              .path=${mdiClose}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${localize('ui.dialog.entity_picker.title', this.hass)}
              ${this.selectedDomain
            ? x `
                - 
                ${computeDomains(this.hass).find(e => e.key == this.selectedDomain).name}
              ` : ''}
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
              ${this._search &&
            x `
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${o$5({
            width: this._width ? `${this._width}px` : "auto",
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("mwc-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            this._width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width;
            this._height = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.height;
        }
        _handleSearchChange(ev) {
            const newFilter = ev.currentTarget.value;
            this._search = newFilter;
            clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this._filter = this._search;
            }, 100);
        }
        _renderOptions() {
            if (!this.selectedDomain) {
                let domains = computeDomains(this.hass);
                domains.sort((a, b) => sortByName(a.name, b.name));
                if (this._filter) {
                    domains = domains.filter(e => {
                        const tokens = this._filter.toLowerCase().trim().split(" ");
                        return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                            tokens.every(token => e.key.toLowerCase().includes(token)));
                    });
                }
                return (Object.keys(domains)).map((key) => {
                    var _a, _b;
                    const domain = domains[key].key;
                    const entities = computeEntitiesForDomain(domain, this.hass);
                    const domainIncluded = (_a = this._params) === null || _a === void 0 ? void 0 : _a.domains.includes(domain);
                    return x `
      <mwc-list-item
        graphic="icon"
        hasMeta
        @click=${() => this._handleDomainClick(domain)}
        twoline
      >
        <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>

        <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
        <span>${domains[key].name}</span>
        <span slot="secondary">${domainIncluded ? entities.length : 0}/${entities.length} entities selected</span>
        <mwc-button 
          @click=${(ev) => this._toggleIncludeDomain(ev, domain)}
        >
          ${((_b = this._params) === null || _b === void 0 ? void 0 : _b.domains.includes(domain))
                    ? 'deselect all'
                    : 'select all'}
        </mwc-button>
      </mwc-list-item>
  `;
                });
            }
            else {
                const domain = this.selectedDomain;
                let entities = computeEntitiesForDomain(domain, this.hass);
                entities.sort((a, b) => sortByName(a.name, b.name));
                if (this._filter) {
                    entities = entities.filter(e => {
                        const tokens = this._filter.toLowerCase().trim().split(" ");
                        return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                            tokens.every(token => e.key.toLowerCase().includes(token)));
                    });
                }
                return (Object.keys(entities)).map((key) => {
                    var _a;
                    const entity = entities[key].key;
                    const entityIncluded = (_a = this._params) === null || _a === void 0 ? void 0 : _a.entities.includes(entity);
                    return x `
        <mwc-list-item
          graphic="icon"
          hasMeta
          twoline
          @click=${() => this.toggleIncludeEntity(entity)}
        >
          <ha-icon slot="graphic" icon="${entities[key].icon}"></ha-icon>
          <ha-switch
            slot="meta"
            ?checked=${entityIncluded}
          ></ha-switch>
          <span>${entities[key].name}</span>
          <span slot="secondary">${entities[key].key}</span>
        </mwc-list-item>
    `;
                });
            }
        }
        toggleIncludeDomain(ev, domain) {
            var _a;
            ev.stopImmediatePropagation();
            if ((_a = this._params) === null || _a === void 0 ? void 0 : _a.domains.includes(domain)) {
                this._params = Object.assign(Object.assign({}, this._params), { domains: this._params.domains.filter(e => e != domain) });
            }
            else {
                this._params = Object.assign(Object.assign({}, this._params), { domains: [...this._params.domains, domain] });
            }
        }
        toggleIncludeEntity(entity) {
            var _a;
            if ((_a = this._params) === null || _a === void 0 ? void 0 : _a.entities.includes(entity)) {
                this._params = Object.assign(Object.assign({}, this._params), { entities: this._params.entities.filter(e => e != entity) });
            }
            else {
                this._params = Object.assign(Object.assign({}, this._params), { entities: [...this._params.entities, entity] });
            }
        }
        _toggleIncludeDomain(ev, domain) {
            var _a;
            ev.stopImmediatePropagation();
            if ((_a = this._params) === null || _a === void 0 ? void 0 : _a.domains.includes(domain)) {
                this._params = Object.assign(Object.assign({}, this._params), { domains: this._params.domains.filter(e => e != domain) });
            }
            else {
                this._params = Object.assign(Object.assign({}, this._params), { domains: [...this._params.domains, domain] });
            }
        }
        _handleDomainClick(domain) {
            this.selectedDomain = domain;
        }
        _clearDomain() {
            this.selectedDomain = undefined;
            this._clearSearch();
        }
        _clearSearch() {
            this._search = "";
            this._filter = "";
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], DialogSelectEntities.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "_params", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "_search", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "_filter", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "_width", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "_height", void 0);
    __decorate([
        t$2()
    ], DialogSelectEntities.prototype, "selectedDomain", void 0);
    DialogSelectEntities = __decorate([
        e$3('dialog-select-entities')
    ], DialogSelectEntities);

    var dialogSelectEntities = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectEntities () { return DialogSelectEntities; }
    });

    let SchedulerEntityPicker = class SchedulerEntityPicker extends s$3 {
        constructor() {
            super(...arguments);
            this.valueMultiple = [];
            this.multiple = false;
            this.rowRenderer = (item) => x `
      <mwc-list-item graphic="avatar" twoline>
        <state-badge
          slot="graphic"
          .stateObj=${item}
          .hass=${this.hass}
        ></state-badge>
        <span>${item.friendly_name}</span>
        <span slot="secondary">${item.entity_id}</span>
      </mwc-list-item>
    `;
            this._filteredItems = () => {
                let entityIds = Object.keys(this.hass.states);
                if (this.domain) {
                    entityIds = entityIds.filter(e => computeDomain(e) == this.domain);
                }
                if (this.valueMultiple.length) {
                    entityIds = entityIds.filter(e => !this.valueMultiple.includes(e));
                }
                if (this.config) {
                    entityIds = entityIds.filter(entityId => {
                        return ((this.config.include || []).some(e => matchPattern(e, entityId)) ||
                            Object.keys(this.config.customize || {}).some(e => matchPattern(e, entityId))) &&
                            !(this.config.exclude || []).some(e => matchPattern(e, entityId));
                    });
                }
                let entities = entityIds.map(e => Object(Object.assign(Object.assign({}, this.hass.states[e]), { friendly_name: friendlyName(e, this.hass.states[e].attributes) })));
                entities.sort((a, b) => sortByName(a.friendly_name, b.friendly_name));
                return entities;
            };
            this._removeValue = (value) => {
                this.valueMultiple = this.valueMultiple.filter(e => e != value);
            };
        }
        render() {
            return x `
      ${this.renderChips()}
      <ha-combo-box
        .hass=${this.hass}
        label=${this.hass.localize("ui.components.entity.entity-picker.entity")}
        item-value-path="entity_id"
        item-label-path="friendly_name"
        .renderer=${this.rowRenderer}
        .filteredItems=${this._filteredItems()}
        @filter-changed=${this._filterChanged}
        @value-changed=${this._valueChanged}
        .value=${this.value || ""}
      >
      </ha-combo-box>
    `;
        }
        renderChips() {
            if (!this.multiple)
                return x ``;
            const renderChip = (entityId) => {
                const stateObj = this.hass.states[entityId];
                return x `
        <div class="chip">
          <ha-state-icon
            .stateObj=${stateObj}
            .hass=${this.hass}
          ></ha-state-icon>
          <span class="label">${friendlyName(entityId, this.hass.states[entityId].attributes)}</span>
          <ha-icon icon="mdi:close" @click=${() => this._removeValue(entityId)} ></ha-icon>
        </div>
      `;
            };
            return x `
      <div class="chips">
        ${this.valueMultiple.map(renderChip)}
      </div>
    `;
        }
        _filterChanged(ev) {
            this._filter = ev.detail.value.toLowerCase();
        }
        _valueChanged(ev) {
            if (this.multiple) {
                this.valueMultiple = [...this.valueMultiple, ev.detail.value];
                ev.target.setInputValue(undefined);
            }
            else {
                this.value = ev.detail.value;
                fireEvent(this, "value-changed", { value: this.value });
            }
        }
    };
    SchedulerEntityPicker.styles = i `
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
    div.chip ha-state-icon {
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
  `;
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "hass", void 0);
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "domain", void 0);
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "config", void 0);
    __decorate([
        t$2()
    ], SchedulerEntityPicker.prototype, "_filter", void 0);
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "value", void 0);
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "valueMultiple", void 0);
    __decorate([
        n$4()
    ], SchedulerEntityPicker.prototype, "multiple", void 0);
    SchedulerEntityPicker = __decorate([
        e$3("scheduler-entity-picker")
    ], SchedulerEntityPicker);

    let CollapsibleSection = class CollapsibleSection extends s$3 {
        constructor() {
            super(...arguments);
            this.expanded = false;
            this.disabled = false;
            this.openClose = new CustomEvent('open-close', {
                detail: {},
                bubbles: true,
                composed: true,
            });
        }
        render() {
            return x `
      <div
        class="header ${this.expanded ? 'expanded' : ''}"
        @click=${this._toggleContent}
        @focus=${this._focusChanged}
        @blur=${this._focusChanged}
        role="button"
        tabindex="0"
        aria-expanded=${this.expanded}
        aria-controls="sect1"
      >
        ${this.disabled
            ? ''
            : x `
        <ha-icon
          icon="mdi:chevron-down"
          class="chevron ${this.expanded ? 'expanded' : ''}"
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
    `;
        }
        _toggleContent() {
            if (this.disabled)
                return;
            this.dispatchEvent(this.openClose);
        }
        attributeChangedCallback(name, oldval, newval) {
            let container = undefined;
            if (this.shadowRoot !== null) {
                for (const child of this.shadowRoot.children) {
                    if (child.className == "container") {
                        container = child;
                        break;
                    }
                }
            }
            if (container) {
                if (this.hasAttribute('expanded')) {
                    const scrollHeight = container.scrollHeight;
                    container.style.height = `${scrollHeight}px`;
                }
                else {
                    container.style.height = `0px`;
                }
            }
            super.attributeChangedCallback(name, oldval, newval);
        }
        _focusChanged(ev) {
            if (this.disabled)
                return;
            this.shadowRoot.querySelector(".header").classList.toggle("focused", ev.type === "focus");
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CollapsibleSection.prototype, "expanded", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], CollapsibleSection.prototype, "disabled", void 0);
    __decorate([
        n$4({ type: CustomEvent })
    ], CollapsibleSection.prototype, "openClose", void 0);
    CollapsibleSection = __decorate([
        e$3('collapsible-section')
    ], CollapsibleSection);
    let CollapsibleGroup = class CollapsibleGroup extends s$3 {
        set openedItem(value) {
            if (value === this._openedItem || value === undefined)
                return;
            setTimeout(() => {
                this.updateOpenedItem(value);
            }, 50);
        }
        constructor() {
            super();
            this.disabled = false;
            this._openedItem = -1;
            this._numItems = 0;
            this.addEventListener('open-close', this.toggleActiveSection);
        }
        firstUpdated() {
            const sections = this.querySelectorAll('collapsible-section');
            this._numItems = sections.length;
        }
        toggleActiveSection(ev) {
            if (this.disabled)
                return;
            const el = ev.target;
            const sections = this.querySelectorAll('collapsible-section');
            let idx = -1;
            sections.forEach(function (item, i) {
                if (item === el && !item.getAttribute('expanded'))
                    idx = i;
            });
            this.updateOpenedItem(idx);
        }
        updateOpenedItem(idx) {
            const sections = this.querySelectorAll('collapsible-section');
            sections.forEach(function (item, i) {
                if (i != idx && item.getAttribute('expanded'))
                    item.removeAttribute('expanded');
                else if (i == idx && !item.getAttribute('expanded'))
                    item.setAttribute('expanded', 'true');
            });
            this._openedItem = idx;
            const myEvent = new CustomEvent('openclose-changed', { detail: { item: idx } });
            this.dispatchEvent(myEvent);
        }
        render() {
            return x `
      <slot></slot>
    `;
        }
    };
    __decorate([
        n$4()
    ], CollapsibleGroup.prototype, "disabled", void 0);
    __decorate([
        t$2()
    ], CollapsibleGroup.prototype, "_openedItem", void 0);
    __decorate([
        t$2()
    ], CollapsibleGroup.prototype, "_numItems", void 0);
    CollapsibleGroup = __decorate([
        e$3('collapsible-group')
    ], CollapsibleGroup);

    let SchedulerCardEditor = class SchedulerCardEditor extends s$3 {
        constructor() {
            super(...arguments);
            this._config = DefaultCardConfig;
            this.title = "";
        }
        setConfig(config) {
            this._config = Object.assign(Object.assign({}, DefaultCardConfig), config);
        }
        firstUpdated() {
            this.title = typeof this._config.title == "string"
                ? this._config.title
                : "";
        }
        render() {
            return x `
      <div class="card-config">

        <mwc-button @click=${this._showIncludedEntitiesDialog}>
          Configure included entities
        </mwc-button>

        <settings-row ?showPrefix=${true}>
          <ha-checkbox
            slot="prefix"
            ?checked=${this._config.title !== false}
            @change=${this._setEnableTitle}
          >
          </ha-checkbox>
          <span slot="heading">${localize('ui.panel.card_editor.fields.title.heading', this.hass)}</span>

          <ha-textfield
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${localize('ui.panel.common.title', this.hass)}
            ?disabled=${this._config.title === false}
          ></ha-textfield>

        </settings-row>

        <div class="two-columns" style="margin: 10px 0px 15px 0px">
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.discover_existing.heading', this.hass)}">
            <ha-switch
              ?checked=${this._config.discover_existing !== false}
              @change=${(ev) => {
            this._updateConfig({ discover_existing: ev.target.checked });
        }}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.show_header_toggle.heading', this.hass)}">
            <ha-switch
              ?checked=${this._config.show_header_toggle}
              @change=${(ev) => {
            this._updateConfig({ show_header_toggle: ev.target.checked });
        }}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

          <span slot="heading">${localize('ui.panel.card_editor.fields.sort_by.heading', this.hass)}</span>

        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.sort_by.options.relative_time', this.hass)}">
            <ha-radio
              name="sort_by"
              value="relative-time"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes('relative-time')}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.sort_by.options.title', this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes('title')}
            ></ha-radio>
          </ha-formfield>
        </div>
        </div>


          <span>${localize('ui.panel.card_editor.fields.display_format_primary.heading', this.hass)}</span>


        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_primary.options.default', this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="default"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes('default')}
            >
            </ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_primary.options.entity_action', this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="{entity}: {action}"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes('{entity}: {action}')}
            >
            </ha-radio>
          </ha-formfield>

        </div>

        </div>

          <span>${localize('ui.panel.card_editor.fields.display_format_secondary.heading', this.hass)}</span>

        <div class="two-columns">
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.relative_time', this.hass)}">
            <ha-checkbox
              value="relative-time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('relative-time')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.time', this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('time')}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.days', this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('days')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks', this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('additional-tasks')}
            >
            </ha-checkbox>
          </ha-formfield>


        </div>

        </div>

      </div>
    `;
        }
        _setEnableTitle(ev) {
            const checked = ev.target.checked;
            if (!checked)
                this._updateConfig({ title: false });
            else if (this.title.length)
                this._updateConfig({ title: this.title });
            else
                this._updateConfig({ title: true });
        }
        _setTitle(ev) {
            const value = ev.target.value;
            this.title = value;
            if (value !== localize('ui.panel.common.title', this.hass) && value.length)
                this._updateConfig({ title: value });
            else
                this._updateConfig({ title: true });
        }
        _setSortBy(ev) {
            var _a;
            const value = ev.target.value;
            let config = [((_a = this._config) === null || _a === void 0 ? void 0 : _a.sort_by) || DefaultCardConfig.sort_by].flat();
            config = config.filter(e => e == 'state');
            if (!config.includes(value))
                config = [...config, value];
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
            let secondaryInfo = [displayOptions.secondary_info || []].flat();
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
        async _showIncludedEntitiesDialog(ev) {
            await new Promise(resolve => {
                const params = {
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out),
                    domains: [],
                    entities: []
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'dialog-select-entities',
                    dialogImport: () => Promise.resolve().then(function () { return dialogSelectEntities; }),
                    dialogParams: params,
                });
            })
                .then((res) => {
                if (!res)
                    return;
                this._updateConfig({ include: [...res.domains, ...res.entities] });
            });
        }
        _updateConfig(changes) {
            if (!this._config)
                return;
            this._config = Object.assign(Object.assign({}, this._config), changes);
            fireEvent(this, 'config-changed', { config: this._config });
        }
    };
    SchedulerCardEditor.styles = i `
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
  `;
    __decorate([
        n$4({ attribute: false })
    ], SchedulerCardEditor.prototype, "hass", void 0);
    __decorate([
        n$4()
    ], SchedulerCardEditor.prototype, "_config", void 0);
    __decorate([
        n$4()
    ], SchedulerCardEditor.prototype, "title", void 0);
    SchedulerCardEditor = __decorate([
        e$3("scheduler-card-editor")
    ], SchedulerCardEditor);

    const EditorDialogStyles = i `
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

`;
    const styles = i `
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


`;

    var ValidationError;
    (function (ValidationError) {
        ValidationError["OverlappingTime"] = "overlapping_time";
        ValidationError["MissingTargetEntity"] = "missing_target_entity";
        ValidationError["MissingServiceParameter"] = "missing_service_parameter";
        ValidationError["MissingAction"] = "missing_action";
    })(ValidationError || (ValidationError = {}));
    const validateTimebar = (slots, hass) => {
        const res = slots.every((e, i) => {
            const startTime = computeTimestamp(e.start, hass);
            const stopTime = e.stop === undefined ? startTime : computeTimestamp(e.stop, hass) || 24 * 3600;
            if (startTime > stopTime)
                return false;
            return slots.every((s, j) => {
                if (j <= i)
                    return true;
                const start = computeTimestamp(s.start, hass);
                return start >= stopTime;
            });
        });
        if (!res)
            return ValidationError.OverlappingTime;
        return null;
    };
    const validateAction = (action) => {
        const config = actionConfig(action.service);
        if (config === null || config === void 0 ? void 0 : config.target) {
            if (!action.target.entity_id)
                return ValidationError.MissingTargetEntity;
        }
        if (config === null || config === void 0 ? void 0 : config.fields) {
            if (!Object.entries(config.fields).every(([field, fieldConfig]) => {
                if (!Object.keys(action.service_data).includes(field) && !fieldConfig.optional)
                    return false;
                return null;
            }))
                return ValidationError.MissingServiceParameter;
        }
        return null;
    };
    const validateSchedule = (schedule, hass) => {
        let errors = [];
        errors = [...errors, ...schedule.entries.map(e => validateTimebar(e.slots, hass)).filter(e => e !== null)];
        let actions = schedule.entries.map(e => e.slots.map(f => f.actions)).flat().flat();
        if (!actions.length)
            errors = [...errors, ValidationError.MissingAction];
        errors = [...errors, ...actions.map(e => validateAction(e)).filter(e => e !== null)];
        if (errors.length)
            return errors.shift();
        else
            return null;
    };

    const saveSchedule = (hass, schedule) => {
        const config = exportSchedule(schedule);
        return hass.callApi('POST', 'scheduler/add', config);
    };
    const exportSchedule = (schedule) => {
        const convertSlot = (slot) => {
            if (!slot.actions.length)
                return null;
            if (!slot.stop)
                slot = Object.fromEntries(Object.entries(slot).filter(([key,]) => key != 'stop'));
            if (!slot.conditions.items.length)
                slot = Object.fromEntries(Object.entries(slot).filter(([key,]) => key != 'conditions'));
            return slot;
        };
        const convertEntry = (entry) => {
            return Object.assign(Object.assign({}, entry), { slots: entry.slots.map(convertSlot).filter(e => e !== null) });
        };
        schedule = Object.assign(Object.assign({}, schedule), { entries: schedule.entries.map(convertEntry) });
        let output = {
            weekdays: schedule.entries[0].weekdays.map(parseWeekdays$1),
            timeslots: schedule.entries[0].slots.map(parseTimeslot$1),
            name: schedule.name,
            start_date: schedule.start_date,
            end_date: schedule.end_date,
            repeat_type: ERepeatType.Repeat, //TBD
            tags: [], //TBD
        };
        return output;
    };
    const parseWeekdays$1 = (input) => {
        switch (input) {
            case TWeekday.Monday:
                return 'mon';
            case TWeekday.Tuesday:
                return 'tue';
            case TWeekday.Wednesday:
                return 'wed';
            case TWeekday.Thursday:
                return 'thu';
            case TWeekday.Friday:
                return 'fri';
            case TWeekday.Saturday:
                return 'sat';
            case TWeekday.Sunday:
                return 'sun';
            case TWeekday.Workday:
                return 'workday';
            case TWeekday.Weekend:
                return 'weekend';
            default:
                return 'daily';
        }
    };
    const parseTimeslot$1 = (input) => {
        return {
            start: input.start,
            stop: input.stop,
            actions: input.actions.map(parseAction$1),
            condition_type: input.conditions.items.length
                ? input.conditions.type == TConditionLogicType.All ? 'and' : 'or'
                : undefined,
            conditions: input.conditions.items.length
                ? input.conditions.items
                : undefined
        };
    };
    const parseAction$1 = (input) => {
        return {
            service: input.service,
            service_data: input.service_data,
            entity_id: input.target.entity_id
        };
    };

    const handleWebsocketError = (err, el, hass) => {
        const params = {
            title: hass.localize('state_badge.default.error'),
            description: x `
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,
            primaryButtonLabel: hass.localize('ui.dialogs.generic.ok'),
            confirm: () => { },
            cancel: () => { },
        };
        fireEvent(el, 'show-dialog', {
            dialogTag: 'scheduler-generic-dialog',
            dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
            dialogParams: params,
        });
    };

    const deleteSchedule = (hass, schedule_id) => {
        return hass.callApi('POST', 'scheduler/remove', { schedule_id: schedule_id });
    };

    const supportLocaleString$1 = () => {
        try {
            new Date().toLocaleDateString('i');
        }
        catch (e) {
            return e.name === 'RangeError';
        }
        return false;
    };
    const computeStartOfWeek = (hass) => {
        let startOfWeekSetting = hass.locale.first_weekday;
        if (!startOfWeekSetting || startOfWeekSetting == 'language') {
            // @ts-ignore
            if ("weekInfo" in Intl.Locale.prototype) {
                // @ts-ignore
                return new Intl.Locale(hass.locale.language).weekInfo.firstDay % 7;
            }
            else {
                const regionSat = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g);
                const regionSun = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g);
                const languageSat = ['ar', 'arq', 'arz', 'fa'];
                const languageSun = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g);
                const parts = hass.locale.language.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);
                return parts[1] ? (regionSun.includes(parts[4]) ? 0 :
                    regionSat.includes(parts[4]) ? 6 : 1) : (languageSun.includes(parts[1]) ? 0 :
                    languageSat.includes(parts[1]) ? 6 : 1);
            }
        }
        else {
            return weekdayList$1.map(e => e.toLowerCase()).findIndex(e => e == startOfWeekSetting);
        }
    };
    const findSequences = (list) => {
        const len = [];
        for (let i = 0; i < list.length - 1; i++) {
            let j = i + 1;
            while (list[j] - list[j - 1] == 1)
                j++;
            len.push(j - i);
        }
        return len;
    };
    const weekdayList$1 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday.
    const formatWeekdayDisplay = (weekdays, hass) => {
        const computeDayDisplay = (weekday) => {
            switch (weekday) {
                case TWeekday.Daily:
                    return localize('ui.components.date.day_types_long.daily', hass);
                case TWeekday.Workday:
                    return localize('ui.components.date.day_types_long.workdays', hass);
                case TWeekday.Weekend:
                    return localize('ui.components.date.day_types_long.weekend', hass);
                case TWeekday.Monday:
                case TWeekday.Tuesday:
                case TWeekday.Wednesday:
                case TWeekday.Thursday:
                case TWeekday.Friday:
                case TWeekday.Saturday:
                case TWeekday.Sunday:
                    let date = new Date(2017, 1, 26);
                    let dayNumber = weekdayList$1.findIndex(e => e == weekday);
                    if (!supportLocaleString$1())
                        return weekdayList$1[dayNumber];
                    date.setDate(date.getDate() + dayNumber);
                    return date.toLocaleDateString(hass.locale.language, { weekday: 'long' });
                default:
                    return '';
            }
        };
        const startOfWeek = computeStartOfWeek(hass);
        const rotateArray = (arr, k) => arr.concat(arr).slice(k, k + arr.length);
        let weekdayListOrdered = rotateArray(weekdayList$1, startOfWeek);
        weekdays.sort((a, b) => {
            let indA = weekdayListOrdered.findIndex(e => e == a);
            let indB = weekdayListOrdered.findIndex(e => e == b);
            return indA - indB;
        });
        const weekdayNums = weekdays.filter(e => weekdayListOrdered.includes(e)).map(e => weekdayListOrdered.findIndex(f => f == e));
        const seq = findSequences(weekdayNums);
        const longestSequence = Math.max(...seq);
        if (weekdayNums.length) {
            if (weekdayNums.length == 6) {
                const missing = [0, 1, 2, 3, 4, 5, 6].filter(e => !weekdayNums.includes(e));
                const missingDay = computeDayDisplay(weekdayListOrdered[missing.pop()]);
                return localize('ui.components.date.repeated_days_except', hass, 'excludedDays', missingDay);
            }
            const dayNames = weekdayNums.map(e => computeDayDisplay(weekdayListOrdered[e]));
            if (weekdayNums.length >= 3 && longestSequence >= 3) {
                const start = seq.reduce((obj, e, i) => (e == longestSequence ? i : obj), 0);
                dayNames.splice(start, longestSequence, localize('ui.components.date.days_range', hass, ['startDay', 'endDay'], [dayNames[start], dayNames[start + longestSequence - 1]]));
            }
            const daysString = dayNames.length > 1
                ? `${dayNames.slice(0, -1).join(', ')} ${hass.localize('ui.common.and')} ${dayNames.pop()}`
                : `${dayNames.pop()}`;
            return localize('ui.components.date.repeated_days', hass, 'days', daysString);
        }
        return weekdays.map(computeDayDisplay).join(', ');
    };

    const defaultSelectorValue = (selector) => {
        if (Object.keys(selector).includes('select') && selector.select) {
            const options = selector.select.options;
            return options.length ? options[0] : '';
        }
        else if (Object.keys(selector).includes('number') && selector.number) {
            const min = selector.number.min;
            return min !== undefined ? min : 0;
        }
        else if (Object.keys(selector).includes('boolean') && selector.boolean) {
            return false;
        }
        else if (Object.keys(selector).includes('text') && selector.text) {
            return '';
        }
        else
            return '';
    };

    const isSupportedSelector = (service, entityId, field, hass) => {
        const config = actionConfig(service);
        if (!config || !config.fields || !Object.keys(config.fields).includes(field))
            return false;
        const fieldConfig = config.fields[field];
        if (selectorConfig(service, entityId, field, hass) === null)
            return false;
        if (fieldConfig.supported_features) {
            const entityIds = [entityId || []].flat();
            if (!entityIds.every(e => {
                if (!Object.keys(hass.states).includes(e))
                    return false;
                const stateObj = hass.states[e];
                if ((!((stateObj.attributes.supported_features || 0) & fieldConfig.supported_features)))
                    return false;
                return true;
            }))
                return false;
        }
        return true;
    };

    const insertTimeslot = (schedule, entry, slotIdx, hass) => {
        let slots = [...schedule.entries[entry].slots];
        let startTime = parseTimeString(slots[slotIdx].start);
        let stopTime = slots[slotIdx].stop === undefined ? startTime : parseTimeString(slots[slotIdx].stop);
        //convert 00:00 to 24:00 for stoptime
        if (stopTime.mode === TimeMode.Fixed && !stopTime.hours && !stopTime.minutes) {
            stopTime = Object.assign(Object.assign({}, stopTime), { hours: 24 });
        }
        //convert start time to fixed time if needed
        if ([TimeMode.Sunrise, TimeMode.Sunset].includes(startTime.mode)) {
            const referenceTime = startTime.mode == TimeMode.Sunrise
                ? hass.states['sun.sun'].attributes['next_rising']
                : hass.states['sun.sun'].attributes['next_setting'];
            let refTime = parseTimeString(referenceTime);
            startTime = addTimeOffset(refTime, { hours: startTime.hours, minutes: startTime.minutes });
        }
        const tsA = computeTimestamp(startTime, hass);
        const tsB = computeTimestamp(stopTime, hass);
        const offset = (tsB - tsA) / 2;
        const offsetHours = Math.floor(offset / 3600);
        const offsetMinutes = Math.round((offset - offsetHours * 3600) / 60);
        let newStop = addTimeOffset(startTime, { hours: offsetHours, minutes: offsetMinutes });
        newStop = roundTime(newStop, 15);
        slots = [
            ...slots.slice(0, slotIdx),
            Object.assign(Object.assign({}, slots[slotIdx]), { stop: timeToString(newStop) }),
            Object.assign(Object.assign({}, slots[slotIdx]), { start: timeToString(newStop), stop: timeToString(stopTime), actions: [] }),
            ...slots.slice(slotIdx + 1),
        ];
        schedule = Object.assign(Object.assign({}, schedule), { entries: Object.assign(schedule.entries, {
                [entry]: Object.assign(Object.assign({}, schedule.entries[entry]), { slots: slots })
            }) });
        return schedule;
    };

    const removeTimeslot = (schedule, entry, slotIdx) => {
        let slots = [...schedule.entries[entry].slots];
        const cutIndex = slotIdx == (slots.length - 1) ? slotIdx - 1 : slotIdx;
        slots = [
            ...slots.slice(0, cutIndex),
            Object.assign(Object.assign({}, slots[cutIndex + 1]), { start: slots[cutIndex].start, stop: slots[cutIndex + 1].stop }),
            ...slots.slice(cutIndex + 2),
        ];
        schedule = Object.assign(Object.assign({}, schedule), { entries: Object.assign(schedule.entries, {
                [entry]: Object.assign(Object.assign({}, schedule.entries[entry]), { slots: slots })
            }) });
        return schedule;
    };

    const formatFieldDisplay = (service, field, hass) => {
        const domain = computeDomain(service);
        const domainService = computeEntity(service);
        return hass.localize(`component.${domain}.services.${domainService}.fields.${field}.name`)
            || hass.services[domain][service].fields[field].name
            || field.replace(/_/g, ' ');
    };

    const serviceIcons = {
        alarm_control_panel: {
            services: {
                alarm_arm_away: 'mdi:shield-lock',
                alarm_arm_home: 'mdi:shield-home',
                alarm_arm_night: 'mdi:shield-moon',
                alarm_custom_bypass: 'mdi:security',
                alarm_disarm: 'mdi:shield-off',
                alarm_trigger: 'mdi:bell-ring',
                alarm_arm_vacation: 'mdi:shield-airplane'
            }
        },
        automation: {
            services: {
                turn_on: 'mdi:robot',
                turn_off: 'mdi:robot-off',
                trigger: 'mdi:play',
            }
        },
        button: {
            services: {
                press: 'mdi:gesture-tap-button'
            }
        },
        climate: {
            services: {
                set_temperature: 'mdi:thermometer',
                set_hvac_mode: 'mdi:cog-transfer-outline',
                set_preset_mode: 'mdi:cloud-download-outline',
                set_fan_mode: 'mdi:fan',
                set_humidity: 'mdi:water-percent',
                set_swing_mode: 'mdi:arrow-oscillating'
            },
            attributes: {
                hvac_mode: {
                    cool: 'mdi:snowflake',
                    dry: 'mdi:water-percent',
                    fan_only: 'mdi:fan',
                    heat: 'mdi:fire',
                    heat_cool: 'mdi:thermometer',
                    off: 'mdi:power',
                },
                preset_mode: {
                    activity: 'mdi:motion-sensor',
                    away: 'mdi:account-arrow-right',
                    boost: 'mdi:rocket-launch',
                    comfort: 'mdi:sofa',
                    eco: 'mdi:leaf',
                    home: 'mdi:home',
                    sleep: 'mdi:bed'
                },
                fan_mode: {
                    diffuse: 'mdi:weather-windy',
                    focus: 'mdi:target',
                    high: 'mdi:speedometer',
                    low: 'mdi:speedometer-slow',
                    medium: 'mdi:speedometer-medium',
                    middle: 'mdi:speedometer-medium',
                    off: 'mdi:fan-off',
                    on: 'mdi:fan'
                },
                swing_mode: {
                    both: 'mdi:arrow-all',
                    horizontal: 'mdi:arrow-left-right',
                    off: 'mdi:arrow-oscillating-off',
                    on: 'mdi:arrow-oscillating',
                    vertical: 'mdi:arrow-up-down'
                }
            }
        },
        cover: {
            services: {
                close_cover: 'mdi:arrow-down-box',
                close_cover_tilt: 'mdi:arrow-bottom-left',
                open_cover: 'mdi:arrow-up-box',
                open_cover_tilt: 'mdi:arrow-top-right',
                set_cover_position: 'mdi:arrow-down-box',
                set_cover_tilt_position: 'mdi:arrow-top-right'
            }
        },
        fan: {
            services: {
                oscillate: 'mdi:arrow-oscillating',
                set_percentage: 'mdi:fan',
                set_preset_mode: 'mdi:fan-auto',
                turn_off: 'mdi:fan-off',
                turn_on: 'mdi:fan'
            }
        },
        humidifier: {
            services: {
                set_humidity: 'mdi:water-percent',
                set_mode: 'mdi:air-humidifier',
                turn_off: 'mdi:air-humidifier-off',
                turn_on: 'mdi:air-humidifier'
            },
            attributes: {
                mode: {
                    auto: 'mdi:refresh-auto',
                    away: 'mdi:account-arrow-right',
                    baby: 'mdi:baby-carriage',
                    boost: 'mdi:rocket-launch',
                    comfort: 'mdi:sofa',
                    eco: 'mdi:leaf',
                    home: 'mdi:home',
                    normal: 'mdi:water-percent',
                    sleep: 'mdi:power-sleep'
                }
            }
        },
        input_boolean: {
            services: {
                turn_off: 'mdi:toggle-switch-off',
                turn_on: 'mdi:toggle-switch',
            }
        },
        input_button: {
            services: {
                press: 'mdi:gesture-tap-button'
            }
        },
        input_number: {
            services: {
                set_value: 'mdi:counter'
            }
        },
        input_select: {
            services: {
                select_option: 'mdi:counter'
            }
        },
        lawn_mower: {
            services: {
                dock: 'mdi:home-import-outline',
                start_mowing: 'mdi:play'
            }
        },
        light: {
            services: {
                turn_off: 'mdi:lightbulb-off',
                turn_on: 'mdi:lightbulb-on'
            }
        },
        lock: {
            services: {
                lock: 'mdi:lock',
                unlock: 'mdi:lock-open'
            }
        },
        media_player: {
            services: {
                media_play: 'mdi:play',
                media_stop: 'mdi:stop',
                play_media: 'mdi:play',
                select_source: 'mdi:import',
                turn_off: 'mdi:power',
                turn_on: 'mdi:power',
            }
        },
        notify: {
            services: {
                '{entity_id}': 'mdi:message-alert'
            }
        },
        scene: {
            services: {
                turn_on: 'mdi:play'
            }
        },
        script: {
            services: {
                turn_on: 'mdi:flash',
                turn_off: 'mdi:flash-off',
                '{entity_id}': 'mdi:play',
            }
        },
        select: {
            services: {
                select_option: 'mdi:counter'
            }
        },
        switch: {
            services: {
                turn_off: 'mdi:toggle-switch-variant-off',
                turn_on: 'mdi:toggle-switch-variant'
            }
        },
        vacuum: {
            services: {
                send_command: 'mdi:send',
                start: 'mdi:play',
                turn_off: 'mdi:stop',
                turn_on: 'mdi:play'
            }
        },
        water_heater: {
            services: {
                set_away_mode: 'mdi:account-arrow-right',
                set_operation_mode: 'mdi:water-boiler',
                set_temperature: 'mdi:thermometer',
                turn_off: 'mdi:water-boiler-off',
                turn_on: 'mdi:water-boiler'
            },
            attributes: {
                operation_mode: {
                    eco: 'mdi:leaf',
                    electric: 'mdi:lightning-bolt',
                    gas: 'mdi:fire-circle',
                    heat_pump: 'mdi:heat-wave',
                    high_demand: 'mdi:finance',
                    off: 'mdi:power',
                    performance: 'mdi:rocket-launch'
                }
            }
        }
    };

    const FALLBACK_ICON$1 = 'mdi:flash';
    const computeActionIcon = (action, _hass) => {
        const domain = computeDomain(action.service);
        const domainService = computeEntity(action.service);
        if (!Object.keys(serviceIcons).includes(domain) || !Object.keys(serviceIcons[domain].services).includes(domainService))
            return FALLBACK_ICON$1;
        if (serviceIcons[domain].attributes !== undefined) {
            let config = serviceIcons[domain].attributes;
            const key = Object.keys(config).find(e => Object.keys(action.service_data).includes(e));
            if (key && Object.keys(config[key]).includes(action.service_data[key])) {
                return config[key][action.service_data[key]];
            }
        }
        return serviceIcons[domain].services[domainService];
    };

    const computeTimeOffset = (time, referenceTime) => {
        const reference = new Date(referenceTime);
        const tsReference = reference.getHours() * 3600 + reference.getMinutes() * 60 + reference.getSeconds();
        let offset = (time.hours * 3600 + time.minutes * 60) - tsReference;
        const sign = offset < 0 ? -1 : 1;
        offset = Math.abs(offset);
        let hours = Math.floor(offset / 3600);
        let minutes = Math.round((offset - hours * 3600) / 60);
        if (sign < 0) {
            if (hours > 0)
                hours = -hours;
            else
                minutes = -minutes;
        }
        return roundTime({ hours: hours, minutes: minutes });
    };

    const SEC_PER_DAY = 24 * 3600;
    let SchedulerTimeslotEditor = class SchedulerTimeslotEditor extends s$3 {
        constructor() {
            super();
            this.selectedSlot = null;
            this.timeout = 0;
            this.large = false;
            this.handleResize = this.handleResize.bind(this);
        }
        handleResize(_event) {
            clearTimeout(this.timeout);
            this.timeout = window.setTimeout(() => {
                this.requestUpdate();
            }, 50);
        }
        firstUpdated() {
            window.addEventListener('resize', this.handleResize);
        }
        render() {
            return x `
      <div class="bar">
        ${this.renderTimeslots()}
      </div>
      <div class="time-bar">
        ${this.renderTimebar()}
      </div>
    `;
        }
        renderTimebar() {
            const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
            const allowedStepSizes = [1, 2, 3, 4, 6, 8, 12];
            const amPm = useAmPm(this.hass.locale);
            const segmentWidth = amPm ? 130 : 100;
            let stepSize = Math.ceil(24 / (fullWidth / segmentWidth));
            while (!allowedStepSizes.includes(stepSize))
                stepSize++;
            const nums = [0, ...Array.from(Array(24 / stepSize - 1).keys()).map(e => (e + 1) * stepSize), 24];
            return nums.map((e, i) => {
                let w = (stepSize / 24) * 100;
                w = Math.floor(w * 100) / 100;
                let time = { mode: TimeMode.Fixed, hours: e, minutes: 0 };
                //if (e == 24) time = { ...time, hours: 23, minutes: 59 };
                if (i == 0)
                    return x `
        <span class="left" style=${o$5({ width: `${w / 2}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
                else if (i == (nums.length - 1))
                    return x `
        <span class="right" style=${o$5({ width: `${w / 2}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
                else
                    return x `
        <span style=${o$5({ width: `${w}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
            });
        }
        renderTimeslots() {
            const slots = this.schedule.slots;
            return slots.map((slot, i) => {
                let ts_start = computeTimestamp(slot.start, this.hass);
                let ts_stop = computeTimestamp(slot.stop || slot.start, this.hass);
                if (!ts_stop && ts_start)
                    ts_stop = SEC_PER_DAY;
                const width = (ts_stop - ts_start) / SEC_PER_DAY * 100;
                const actionText = slot.actions.length ? formatActionDisplay(slot.actions[0], this.hass, true) : '';
                const fullWidth = parseFloat(getComputedStyle(this).getPropertyValue('width'));
                const textWidth = actionText.length * 5 + 10;
                const leftMargin = i > 0 ? 15 : 0;
                const rightMargin = i < (slots.length - 1) ? 15 : 0;
                const slotWidth = width * fullWidth / 100 - leftMargin - rightMargin;
                return x `
        <div
          class="slot ${this.selectedSlot == i ? 'selected' : ''} ${slot.actions.length ? '' : 'empty'}"
          style="${o$5({ width: `${Math.floor(width * 100) / 100}%` })}"
          @click=${this._toggleSelectTimeslot}
          idx="${i}"
        >
          ${slot.stop ? '' : x `<div class="marker"></div>`}
          ${slot.actions.length
                ? actionText && (slotWidth > textWidth / 3 || slotWidth > 50) && slotWidth > 30
                    ? x `<span style="margin-left: ${leftMargin}px; margin-right: ${rightMargin}px">${actionText}</span>`
                    : x `<ha-icon icon="${computeActionIcon(slot.actions[0], this.hass)}"></ha-icon>`
                : ''}
        </div>
        ${i < (slots.length - 1) ? x `
        <div idx="${i}" class="handle ${this.selectedSlot == (i + 1) || this.selectedSlot == i ? '' : 'hidden'}">
          <span>
            <ha-icon-button
              .path=${mdiUnfoldMoreVertical}
              @mousedown=${this._handleDragStart}
              @touchstart=${this._handleDragStart}
            >
            </ha-icon-button>
          </span>
        </div>
        ` : ''}
      `;
            });
        }
        _toggleSelectTimeslot(ev) {
            let slot = ev.target;
            if (slot.tagName.toLowerCase() != 'div')
                slot = slot.parentElement;
            const num = Number(slot.getAttribute("idx"));
            this.selectedSlot = this.selectedSlot !== num ? num : null;
            const myEvent = new CustomEvent('update', { detail: { selectedSlot: this.selectedSlot } });
            this.dispatchEvent(myEvent);
        }
        _handleDragStart(ev) {
            let el = ev.target;
            while (el.tagName !== 'DIV')
                el = el.parentElement;
            const trackElement = el.parentElement;
            const trackBounds = trackElement.getBoundingClientRect();
            const slotIdx = Number(el.getAttribute("idx"));
            let ts_min = slotIdx > 0
                ? computeTimestamp(this.schedule.slots[slotIdx - 1].start, this.hass)
                : 15 * 60;
            let ts_max = computeTimestamp(this.schedule.slots[slotIdx + 1].stop || this.schedule.slots[slotIdx + 1].start, this.hass) || (SEC_PER_DAY - 15 * 60);
            const timeInputMode = parseTimeString(this.schedule.slots[slotIdx + 1].start).mode;
            if ([TimeMode.Sunrise, TimeMode.Sunset].includes(timeInputMode)) {
                let time = parseTimeString(this.schedule.slots[slotIdx + 1].start);
                let maxOffsetTime = computeTimestamp(Object.assign(Object.assign({}, time), { hours: 4, minutes: 0 }), this.hass);
                let minOffsetTime = computeTimestamp(Object.assign(Object.assign({}, time), { hours: -4, minutes: 0 }), this.hass);
                if (minOffsetTime > ts_min)
                    ts_min = minOffsetTime;
                if (maxOffsetTime < ts_max)
                    ts_max = maxOffsetTime;
            }
            let mouseMoveHandler = (ev) => {
                let mouseX;
                if (typeof TouchEvent !== 'undefined') {
                    if (ev instanceof TouchEvent)
                        mouseX = ev.changedTouches[0].pageX;
                    else
                        mouseX = ev.pageX;
                }
                else
                    mouseX = ev.pageX;
                mouseX -= trackBounds.left;
                if (mouseX > trackBounds.width)
                    mouseX = trackBounds.width;
                if (mouseX < 0)
                    mouseX = 0;
                let ts = Math.round((mouseX / trackBounds.width) * SEC_PER_DAY);
                if (ts < ts_min)
                    ts = ts_min;
                else if (ts > ts_max)
                    ts = ts_max;
                const hours = Math.floor(ts / 3600);
                const minutes = Math.round((ts - hours * 3600) / 60);
                let time = { mode: TimeMode.Fixed, hours: hours, minutes: minutes };
                if ([TimeMode.Sunrise, TimeMode.Sunset].includes(timeInputMode)) {
                    const referenceTime = timeInputMode == TimeMode.Sunrise
                        ? this.hass.states['sun.sun'].attributes['next_rising']
                        : this.hass.states['sun.sun'].attributes['next_setting'];
                    const offset = computeTimeOffset(time, referenceTime);
                    time = { mode: timeInputMode, hours: offset.hours, minutes: offset.minutes };
                }
                time = roundTime(time, 15);
                const timeStr = timeToString(time);
                let slots = [...this.schedule.slots];
                slots = Object.assign(slots, {
                    [slotIdx]: Object.assign(Object.assign({}, slots[slotIdx]), { stop: timeStr }),
                    [slotIdx + 1]: Object.assign(Object.assign({}, slots[slotIdx + 1]), { start: timeStr })
                });
                this.schedule = Object.assign(Object.assign({}, this.schedule), { slots: slots });
                const myEvent = new CustomEvent('update', { detail: { slots: slots } });
                this.dispatchEvent(myEvent);
            };
            const mouseUpHandler = () => {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('touchmove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
                window.removeEventListener('touchend', mouseUpHandler);
                window.removeEventListener('blur', mouseUpHandler);
                mouseMoveHandler = () => {
                    /**/
                };
            };
            window.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('touchend', mouseUpHandler);
            window.addEventListener('blur', mouseUpHandler);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('touchmove', mouseMoveHandler);
        }
        static get styles() {
            return i `
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
        border: 1px solid var(--card-background-color);
        box-sizing: border-box; 
        cursor: pointer;
        background: rgba(var(--rgb-primary-color), 0.7);
        color: var(--text-primary-color);
        font-weight: 500;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        white-space: normal;
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
      .marker {
        width: 24px;
        height: 24px;
        background: rgba(var(--rgb-primary-color), 1);
        margin-top: -80px;
        position: absolute;
        transform: rotate(45deg);
        border-radius: 12px 12px 0px 12px;
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
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], SchedulerTimeslotEditor.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], SchedulerTimeslotEditor.prototype, "schedule", void 0);
    __decorate([
        t$2()
    ], SchedulerTimeslotEditor.prototype, "selectedSlot", void 0);
    __decorate([
        n$4({ type: Boolean })
    ], SchedulerTimeslotEditor.prototype, "large", void 0);
    __decorate([
        e$5({ passive: true })
    ], SchedulerTimeslotEditor.prototype, "_handleDragStart", null);
    SchedulerTimeslotEditor = __decorate([
        e$3('scheduler-timeslot-editor')
    ], SchedulerTimeslotEditor);

    let SchedulerTimePicker = class SchedulerTimePicker extends s$3 {
        constructor() {
            super(...arguments);
            this.hours = 0;
            this.minutes = 0;
            this.mode = TimeMode.Fixed;
            this.autoValidate = true;
            this.required = true;
            this.disabled = false;
            this.label = "";
            this.useAmPm = false;
        }
        set time(value) {
            this.hours = Number(value.split(":")[0]);
            this.minutes = Number(value.split(":")[1]);
            const time = parseTimeString(value);
            this.mode = time.mode;
            this.hours = time.hours;
            this.minutes = time.minutes;
        }
        firstUpdated() {
            this.useAmPm = useAmPm(this.hass.locale);
        }
        render() {
            return x `
      <div class="time-input-wrap">

        ${this._renderTimeModeOptions()}

        <div class="column">

          <span class="label">${this.label}</span>
          <div class="input">
        <ha-textfield
          id="hour"
          type="number"
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
          max=${this.mode == TimeMode.Fixed ? this.useAmPm ? 12 : 23 : 4}
          min=${this.mode == TimeMode.Fixed ? 0 : -4}
          .disabled=${this.disabled}
          suffix=":"
          class="hasSuffix"
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
        ${!this.useAmPm || this.mode != TimeMode.Fixed
            ? ""
            : x `
          <ha-select
            .required=${this.required}
            .value=${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"}
            .disabled=${this.disabled}
            name="amPm"
            naturalMenuWidth
            fixedMenuPosition
            @selected=${this._amPmChanged}
            @closed=${(ev) => { ev.stopPropagation(); }}
          >
            <mwc-list-item value="AM">AM</mwc-list-item>
            <mwc-list-item value="PM">PM</mwc-list-item>
          </ha-select>
        `}
          </div>
        </div>
      </div>
    `;
        }
        convertTimeMode(convertedMode) {
            let absTime = { mode: TimeMode.Fixed, hours: this.hours, minutes: this.minutes };
            if ([TimeMode.Sunrise, TimeMode.Sunset].includes(this.mode)) {
                const referenceTime = this.mode == TimeMode.Sunrise
                    ? this.hass.states['sun.sun'].attributes['next_rising']
                    : this.hass.states['sun.sun'].attributes['next_setting'];
                let time = parseTimeString(referenceTime);
                time = addTimeOffset(time, { hours: this.hours, minutes: this.minutes });
                absTime = Object.assign(Object.assign({}, absTime), { hours: time.hours, minutes: time.minutes });
            }
            if ([TimeMode.Sunrise, TimeMode.Sunset].includes(convertedMode)) {
                const referenceTime = convertedMode == TimeMode.Sunrise
                    ? this.hass.states['sun.sun'].attributes['next_rising']
                    : this.hass.states['sun.sun'].attributes['next_setting'];
                const offset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, referenceTime);
                return { mode: convertedMode, hours: offset.hours, minutes: offset.minutes };
            }
            else
                return absTime;
        }
        _renderTimeModeOptions() {
            if (!this.hass.states['sun.sun'])
                return x ``;
            let modeOptions = [
                TimeMode.Fixed,
                TimeMode.Sunrise,
                TimeMode.Sunset,
            ];
            const modeOptionLabels = {
                [TimeMode.Fixed]: 'Time',
                [TimeMode.Sunrise]: 'Sunrise',
                [TimeMode.Sunset]: 'Sunset'
            };
            //this.hass.localize('ui.panel.config.automation.editor.triggers.type.sun.sunrise')}
            const modeOptionIcons = {
                [TimeMode.Fixed]: 'mdi:clock-outline',
                [TimeMode.Sunrise]: 'mdi:weather-sunset-up',
                [TimeMode.Sunset]: 'mdi:weather-sunset-down'
            };
            const buttonIcons = {
                [TimeMode.Fixed]: mdiClockOutline,
                [TimeMode.Sunrise]: mdiWeatherSunsetUp,
                [TimeMode.Sunset]: mdiWeatherSunsetDown
            };
            const isDisabled = (mode) => {
                if (mode == TimeMode.Fixed)
                    return false;
                const offsetTime = this.convertTimeMode(mode);
                return (Math.abs(offsetTime.hours * 60) + Math.abs(offsetTime.minutes)) > 240;
            };
            return x `
      <ha-button-menu
        @action=${(ev) => this._handleMenuAction(ev, modeOptions)}
        @closed=${(ev) => { ev.stopPropagation(); }}
        fixed
        ?disabled=${this.disabled}
      >
        <ha-icon-button
          slot="trigger"
          .path=${buttonIcons[this.mode]}
          ?disabled=${this.disabled}
        >
        </ha-icon-button>
        ${modeOptions.map(e => x `
        <mwc-list-item graphic="icon" ?noninteractive=${this.mode == e} ?disabled=${isDisabled(e)}>
          ${modeOptionLabels[e]}
          <ha-icon
            slot="graphic"
            icon="${modeOptionIcons[e]}"
          ></ha-icon>
        </mwc-list-item>
        
        `)}
      </ha-button-menu>
    `;
        }
        _hoursChanged(ev) {
            let value = Number(ev.target.value);
            if (this.useAmPm) {
                const amPm = convertTo12Hour(this.hours).am_pm;
                value = convertTo24Hour(value, amPm);
            }
            this.hours = value;
            this._valueChanged();
        }
        _minutesChanged(ev) {
            const value = Number(ev.target.value);
            this.minutes = value;
            this._valueChanged();
        }
        _amPmChanged(ev) {
            const value = ev.target.value;
            const hours12 = convertTo12Hour(this.hours).hours;
            this.hours = convertTo24Hour(hours12, value == 'AM' ? AmPmFormat.AM : AmPmFormat.PM);
            this._valueChanged();
        }
        _valueChanged() {
            const value = {
                mode: this.mode,
                hours: this.hours,
                minutes: this.minutes,
            };
            fireEvent(this, "value-changed", {
                value,
            });
        }
        _onFocus(ev) {
            ev.currentTarget.select();
        }
        formatHours() {
            const isNegative = this.hours < 0 || this.minutes < 0;
            let hours = this.useAmPm && this.mode == TimeMode.Fixed ? convertTo12Hour(this.hours).hours : this.hours;
            if (isNegative)
                return '-' + Math.abs(hours).toFixed();
            else
                return hours.toFixed();
        }
        formatMinutes() {
            return Math.abs(this.minutes).toString().padStart(2, "0");
        }
        _handleMenuAction(ev, options) {
            const index = ev.detail.index;
            options = options.filter(e => e != this.mode);
            const newMode = options[index];
            const newTime = this.convertTimeMode(newMode);
            this.hours = newTime.hours;
            this.minutes = newTime.minutes;
            this.mode = newMode;
            ev.preventDefault();
            const el = ev.target;
            setTimeout(() => {
                el.firstElementChild.blur();
            }, 50);
            const value = {
                mode: this.mode,
                hours: this.hours,
                minutes: this.minutes,
            };
            fireEvent(this, "value-changed", {
                value,
            });
        }
    };
    SchedulerTimePicker.styles = i `
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
      flex-direction: column;
      gap: 4px;
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
  `;
    __decorate([
        n$4({ attribute: false })
    ], SchedulerTimePicker.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], SchedulerTimePicker.prototype, "hours", void 0);
    __decorate([
        t$2()
    ], SchedulerTimePicker.prototype, "minutes", void 0);
    __decorate([
        t$2()
    ], SchedulerTimePicker.prototype, "mode", void 0);
    __decorate([
        n$4({ type: Boolean })
    ], SchedulerTimePicker.prototype, "autoValidate", void 0);
    __decorate([
        n$4({ type: Boolean })
    ], SchedulerTimePicker.prototype, "required", void 0);
    __decorate([
        n$4({ type: Boolean })
    ], SchedulerTimePicker.prototype, "disabled", void 0);
    __decorate([
        n$4({ type: String })
    ], SchedulerTimePicker.prototype, "label", void 0);
    __decorate([
        t$2()
    ], SchedulerTimePicker.prototype, "useAmPm", void 0);
    SchedulerTimePicker = __decorate([
        e$3("scheduler-time-picker")
    ], SchedulerTimePicker);

    var WeekdayOptions;
    (function (WeekdayOptions) {
        WeekdayOptions["Daily"] = "daily";
        WeekdayOptions["Workday"] = "workday";
        WeekdayOptions["Weekend"] = "weekend";
        WeekdayOptions["Monday"] = "mon";
        WeekdayOptions["Tuesday"] = "tue";
        WeekdayOptions["Wednesday"] = "wed";
        WeekdayOptions["Thursday"] = "thu";
        WeekdayOptions["Friday"] = "fri";
        WeekdayOptions["Saturday"] = "sat";
        WeekdayOptions["Sunday"] = "sun";
    })(WeekdayOptions || (WeekdayOptions = {}));
    let WeekdayPicker = class WeekdayPicker extends s$3 {
        constructor() {
            super(...arguments);
            this.value = [];
            this._renderItems = () => {
                return Object.keys(WeekdayOptions).map(key => {
                    return x `
        <span
          idx="${key}"
          @click=${this._toggleSelectItem}
          class="${this.value.includes(key) ? "selected" : ""}"
        >
          ${WeekdayOptions[key]}
        </span>`;
                });
            };
        }
        render() {
            return x `
      <div class="container">
       ${this._renderItems()}
      </div>
    `;
        }
        _toggleSelectItem(ev) {
            const key = ev.target.getAttribute("idx");
            if (this.value.includes(key)) {
                this.value = this.value.filter(e => e != key);
            }
            else {
                this.value = [...this.value, key];
            }
        }
    };
    WeekdayPicker.styles = i `
    .container {
      display: flex;
      row-gap: 4px;
      column-gap: 4px;
      flex-wrap: wrap;
    }
    span {
      display: flex;
      background: rgba(var(--rgb-primary-color), 0.54);
      color: var(--text-primary-color);
      border-radius: 8px;
      padding: 2px 8px;
      cursor: pointer;
    }
    span:hover {
      background: rgba(var(--rgb-primary-color), 0.75);
    }
    span.selected {
      background: var(--primary-color);
    }
  `;
    __decorate([
        n$4()
    ], WeekdayPicker.prototype, "hass", void 0);
    __decorate([
        n$4()
    ], WeekdayPicker.prototype, "value", void 0);
    WeekdayPicker = __decorate([
        e$3("my-weekday-picker")
    ], WeekdayPicker);

    let DialogSelectWeekdays = class DialogSelectWeekdays extends s$3 {
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
                return x ``;
            return x `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
            .path=${mdiClose}
          ></ha-icon-button>
          <span slot="title">
            Select days for schedule
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <mwc-list>
          ${this._renderWeekdayOptions()}
          </mwc-list>
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                Cancel
              </mwc-button>
        <mwc-button
          slot="secondaryAction"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          OK
        </mwc-button>
      </ha-dialog>
    `;
        }
        _renderWeekdayOptions() {
            return Object.keys(TWeekday).map((key) => {
                var _a;
                return x `
        <mwc-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${key}"
        >
          ${((_a = this._params) === null || _a === void 0 ? void 0 : _a.weekdays.includes(key))
                ? x `<ha-icon slot="graphic" icon="mdi:check"></ha-icon>`
                : ''}
          ${TWeekday[key]}
        </mwc-list-item>
    `;
            });
        }
        _toggleSelectOption(ev) {
            const option = ev.target.getAttribute("option");
            let weekdays = [...this._params.weekdays];
            if (weekdays.includes(option)) {
                weekdays = weekdays.filter(e => e != option || weekdays.length == 1);
            }
            else {
                if ([TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(option)) {
                    weekdays = [option];
                }
                else {
                    weekdays = weekdays.filter(e => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
                    weekdays = [...weekdays, option];
                }
            }
            this._params = Object.assign(this._params, { weekdays: weekdays });
            this.requestUpdate();
        }
        confirmClick() {
            this._params.confirm(this._params.weekdays);
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
        n$4({ attribute: false })
    ], DialogSelectWeekdays.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays.prototype, "_params", void 0);
    DialogSelectWeekdays = __decorate([
        e$3('dialog-select-weekdays')
    ], DialogSelectWeekdays);

    var dialogSelectWeekdays = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectWeekdays () { return DialogSelectWeekdays; }
    });

    const serviceByEntityId = (hass, domain, action) => {
        return (Object.keys(hass.services).includes(domain) &&
            Object.keys(hass.services[domain]).includes(action) &&
            Object.keys(hass.states).includes(`${domain}.${action}`));
    };
    const computeActionsForDomain = (hass, domain) => {
        const isSupportedAction = (action) => {
            if (!Object.keys(supportedActions).includes(domain))
                return false;
            let res = Object.keys(supportedActions[domain]).includes(action);
            if (!res && serviceByEntityId(hass, domain, action)) {
                // allow script services by entity_id
                res = Object.keys(supportedActions[domain]).includes('{entity_id}');
            }
            if (!res && Object.keys(supportedActions[domain]).includes('{any}')) {
                // allow all notify services
                res = true;
            }
            // if(!res) {
            //   console.log(`Action ${domain}.${action} is not supported.`);
            // }
            return res;
        };
        const services = Object.keys(hass.services).includes(domain)
            ? Object.keys(hass.services[domain]).filter(isSupportedAction)
            : [];
        const domainName = (domain) => hass.localize(`component.${domain}.title`) || domain.replace(/_/g, " ");
        const serviceName = (service) => hass.localize(`component.${domain}.services.${service}.name`) ||
            hass.services[domain][service].name ||
            service.replace(/_/g, ' ');
        const serviceDescription = (service) => hass.localize(`component.${domain}.services.${service}.description`) || hass.services[domain][service].description;
        let actionList = services.map(e => Object({
            key: e,
            name: `${domainName(domain)}: ${serviceName(e)}`,
            description: serviceDescription(e),
            icon: domainIcon(domain)
        }));
        return actionList;
    };

    let DialogSelectWeekdays$1 = class DialogSelectWeekdays extends s$3 {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
        }
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.cancel();
            this._params = undefined;
            this._clearSearch();
            this._height = undefined;
            this._width = undefined;
        }
        async willUpdate() {
            this.hass.loadBackendTranslation("title");
            this.hass.loadBackendTranslation("services");
        }
        render() {
            if (!this._params)
                return x ``;
            return x `
      <ha-dialog
        open
        .heading=${true}
        @opened=${this._opened}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        hideActions
      >
        <div slot="heading">
          <ha-dialog-header>
            ${this._params.domain !== undefined
            ? x `
            <ha-icon-button
              slot="navigationIcon"
              .label=${this.hass.localize('ui.common.back')}
              .path=${mdiChevronLeft}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `
            : x `
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
              .path=${mdiClose}
            ></ha-icon-button>
            `}
            <span slot="title">
              ${localize('ui.dialog.action_picker.title', this.hass)}
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
              ${this._search &&
            x `
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>
        
        <mwc-list
          style=${o$5({
            width: this._width ? `${this._width}px` : "auto",
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("mwc-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            this._width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width;
            this._height = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.height;
        }
        _handleSearchChange(ev) {
            const newFilter = ev.currentTarget.value;
            this._search = newFilter;
            clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this._filter = this._search;
            }, 100);
        }
        _renderOptions() {
            var _a;
            if (!((_a = this._params) === null || _a === void 0 ? void 0 : _a.domain)) {
                let domains = computeActionDomains(this.hass, this._params.cardConfig);
                domains.sort((a, b) => sortByName(a.name, b.name));
                if (this._filter) {
                    domains = domains.filter(e => {
                        const tokens = this._filter.toLowerCase().trim().split(" ");
                        return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                            tokens.every(token => e.key.toLowerCase().includes(token)));
                    });
                }
                let fillers = [];
                for (var i = domains.length; i < 7; i++) {
                    fillers.push(0);
                }
                return x `
      ${(Object.keys(domains)).map((key) => x `
        <mwc-list-item
          graphic="icon"
          hasMeta
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
          <span>${domains[key].name}</span>
        </mwc-list-item>`)}
        ${fillers.map(_e => x `
        <mwc-list-item
          graphic="icon"
          hasMeta
          noninteractive
        >
        </mwc-list-item>
        `)}
      `;
            }
            else {
                let result = computeActionsForDomain(this.hass, this._params.domain);
                return (Object.keys(result)).map((key) => x `
        <mwc-list-item
          graphic="icon"
          @click=${() => this._handleActionClick(result[key].key)}
          twoline
        >
          <ha-icon slot="graphic" icon="${result[key].icon}"></ha-icon>
          <span>${result[key].name}</span>
          <span slot="secondary">${result[key].description}</span>
        </mwc-list-item>
    `);
            }
        }
        _handleDomainClick(key) {
            this._params = Object.assign(Object.assign({}, this._params), { domain: key });
            this._clearSearch();
        }
        _clearDomain() {
            this._params = Object.assign(Object.assign({}, this._params), { domain: undefined });
            this._clearSearch();
        }
        _handleActionClick(key) {
            this._params.confirm(`${this._params.domain}.${key}`);
            this._params = undefined;
            this._clearSearch();
        }
        _clearSearch() {
            this._search = "";
            this._filter = "";
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], DialogSelectWeekdays$1.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays$1.prototype, "_params", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays$1.prototype, "_search", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays$1.prototype, "_filter", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays$1.prototype, "_width", void 0);
    __decorate([
        t$2()
    ], DialogSelectWeekdays$1.prototype, "_height", void 0);
    DialogSelectWeekdays$1 = __decorate([
        e$3('dialog-select-action')
    ], DialogSelectWeekdays$1);

    var dialogSelectAction = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectWeekdays () { return DialogSelectWeekdays$1; }
    });

    let SettingsRow = class SettingsRow extends s$3 {
        constructor() {
            super(...arguments);
            this.showPrefix = false;
        }
        render() {
            return x `
      ${this.showPrefix
            ? x `
      <div class="prefix-wrap">
        <div class="prefix"><slot name="prefix"></slot></div>
        <div class="body">
          <div class="heading"><slot name="heading"></slot></div>
          <div class="secondary"><slot name="description"></slot></div>
        </div>
      </div>
      ` : x `
      <div class="body">
        <div class="heading"><slot name="heading"></slot></div>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      `}
      <div class="content"><slot></slot></div>
    `;
        }
        static get styles() {
            return i `

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
      display: var(--layout-vertical_-_display);
      flex-direction: var(--layout-vertical_-_flex-direction);
      justify-content: var(--layout-center-justified_-_justify-content);
      flex: var(--layout-flex_-_flex);
      flex-basis: var(--layout-flex_-_flex-basis);
    }
    .body > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: contents;
      display: var(--settings-row-content-display, flex);
      justify-content: flex-end;
      flex: 1;
      padding: 8px 0;
    }
    .content ::slotted(*) {
      width: var(--settings-row-content-width);
    }
    .prefix-wrap {
      display: contents;
    }
    .prefix {
      display: flex;
      width: 48px;
    }
    .heading, .heading ::slotted(*) {
      display: flex;
      align-items: center;
    }
    `;
        }
    };
    __decorate([
        n$4({ type: Boolean })
    ], SettingsRow.prototype, "showPrefix", void 0);
    SettingsRow = __decorate([
        e$3('settings-row')
    ], SettingsRow);

    let ComboSelector = class ComboSelector extends s$3 {
        constructor() {
            super(...arguments);
            this.disabled = false;
            this.rowRenderer = (item) => x `
      <mwc-list-item graphic="icon">
        <span>${typeof item == 'object' ? item.label : item}</span>
      </mwc-list-item>
    `;
        }
        render() {
            if (this.config.select) {
                const config = this.config.select;
                return x `
        <ha-combo-box
          .hass=${this.hass}
          label=""
          .renderer=${this.rowRenderer}
          .filteredItems=${config === null || config === void 0 ? void 0 : config.options}
          @value-changed=${this._valueChanged}
          .value=${this.value || ""}
          ?disabled=${this.disabled}
        >
        </ha-combo-box>
      `;
            }
            else if (this.config.number) {
                const config = this.config.number;
                return x `
        <ha-slider
          labeled
          .min=${config.min}
          .max=${config.max}
          .step=${config.step}
          .value=${this.value || config.min}
          @change=${this._valueChanged}
          ?disabled=${this.disabled}
        ></ha-slider>
      `;
            }
            return x ``;
        }
        _valueChanged(ev) {
            if (ev.detail) {
                this.value = ev.detail.value;
            }
            else {
                this.value = ev.target.value;
            }
            ev.stopPropagation();
            fireEvent(this, "value-changed", { value: this.value });
        }
    };
    ComboSelector.styles = i `

  `;
    __decorate([
        n$4({ attribute: false })
    ], ComboSelector.prototype, "hass", void 0);
    __decorate([
        n$4({ attribute: false })
    ], ComboSelector.prototype, "config", void 0);
    __decorate([
        n$4()
    ], ComboSelector.prototype, "value", void 0);
    __decorate([
        n$4()
    ], ComboSelector.prototype, "disabled", void 0);
    ComboSelector = __decorate([
        e$3("combo-selector")
    ], ComboSelector);

    let SchedulerMainPanel = class SchedulerMainPanel extends s$3 {
        constructor() {
            super(...arguments);
            this.selectedEntry = 0;
            this.selectedSlot = 0;
            this.large = false;
        }
        render() {
            return x `
    ${this.schedule.entries.map((entry, num) => x `

      <div class="editor-header">
      <div class="weekdays">
        ${localize('ui.panel.editor.repeated_days', this.hass)}:
        ${formatWeekdayDisplay(entry.weekdays, this.hass)}
        <ha-icon-button .path=${mdiPencil} @click=${(ev) => this._showWeekdayDialog(ev, num)}></ha-icon-button>
      </div>

      ${this.renderActionButtons()}

      </div>

      <scheduler-timeslot-editor
        .hass=${this.hass}
        .schedule=${entry}
        .selectedSlot=${this.selectedSlot}
        @update=${(ev) => this._handleUpdate(ev, num)}
        .large=${this.large}
      >
      </scheduler-timeslot-editor>
    `)}

    ${this.renderSlot()}
    `;
        }
        renderActionButtons() {
            if (this.selectedSlot === null || this.selectedEntry === null)
                return x ``;
            const startTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start;
            const stopTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].stop || startTime;
            const tsA = computeTimestamp(startTime, this.hass);
            const tsB = computeTimestamp(stopTime, this.hass) || 24 * 3600;
            const delta = tsB - tsA;
            return x `
      <div class="actions">
        <mwc-button @click=${this._addTimeslot} ?disabled=${delta < 1800}>
          <ha-icon icon="mdi:plus"></ha-icon>
          ${this.hass.localize('ui.common.add')}
        </mwc-button>
        <mwc-button @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length <= 2}>
          <ha-icon icon="mdi:minus"></ha-icon>
          ${this.hass.localize('ui.common.remove')}
        </mwc-button>
      </div>
    `;
        }
        renderSlot() {
            if (this.selectedEntry === null || this.selectedSlot === null)
                return;
            const slot = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];
            // <mwc-checkbox
            //   ?checked=${slot.stop !== undefined}
            //   @change=${this._toggleStopTime}
            // >
            // </mwc-checkbox>
            return x `

      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.start_time', this.hass)}:"
            ?disabled=${this.selectedSlot == 0}
            .time=${slot.start}
            @value-changed=${this._startTimeChanged}
          >
          </scheduler-time-picker>
        </div>
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.stop_time', this.hass)}:"
            ?disabled=${slot.stop === undefined || this.selectedSlot == (this.schedule.entries[this.selectedEntry].slots.length - 1)}
            .time=${slot.stop || slot.start}
            @value-changed=${this._stopTimeChanged}
          >
          </scheduler-time-picker>
        </div>
      </div>

      ${localize('ui.panel.editor.action', this.hass)}:
      ${this._renderActionConfig()}
    `;
        }
        _renderActionConfig() {
            const slot = Object.assign({}, this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);
            const action = slot.actions.length ? slot.actions[0] : undefined;
            if (!action)
                return x `
      <div>
        <mwc-button
          @click=${this._showActionDialog}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.editor.add_action', this.hass)}
        </mwc-button>
      </div>
    `;
            const domain = computeDomain(action.service);
            const key = computeEntity(action.service);
            const hassConfig = this.hass.services[domain][key];
            const config = actionConfig(action.service);
            if (config === undefined)
                return x ``;
            //if (!config || !config.fields) return html``;
            const fields = Object.keys(config.fields || {}).filter(e => isSupportedSelector(action.service, action.target.entity_id, e, this.hass));
            return x `
      <collapsible-section
        ?expanded=${true}
        ?disabled=${true}
      >
        <span slot="header">
          <ha-icon slot="icon" icon="${computeActionIcon(action, this.hass)}"></ha-icon>
          ${formatActionDisplay(action, this.hass)}
        </span>
        <ha-icon-button slot="contextMenu" .path=${mdiClose} @click=${this._removeAction}></ha-icon-button>
        <div slot="content">

          <settings-row>
            <span slot="heading">${this.hass.localize("ui.components.entity.entity-picker.entity")}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${domain}
              @value-changed=${this._selectEntity}
              .value=${Array.isArray(action.target.entity_id) ? undefined : action.target.entity_id}
            >
            </scheduler-entity-picker>

          </settings-row>

          ${fields.map(field => {
            const selector = selectorConfig(action.service, action.target.entity_id, field, this.hass);
            if (selector === null)
                return '';
            const checked = config.fields[field].optional ? Object.keys(action.service_data).includes(field) : true;
            return x `
            <settings-row>
              ${config.fields[field].optional ? x `
                <ha-checkbox
                  slot="prefix"
                  ?checked=${checked}
                  @change=${(ev) => this._toggleOptionalField(ev, field, selector)}
                >
                </ha-checkbox>
              ` : ''}
              <span slot="heading">
                ${formatFieldDisplay(action.service, field, this.hass)}
              </span>
              <combo-selector
                .hass=${this.hass}
                .config=${selector}
                ?disabled=${!checked}
                .value=${Object.keys(action.service_data).includes(field) ? action.service_data[field] : undefined}
                @value-changed=${(ev) => this._selectField(field, ev)}
              >
              </combo-selector>
            </settings-row>
          `;
        })}
        </div>
      </collapsible-section>
    `;
        }
        _selectField(field, ev) {
            const value = ev.detail.value;
            const slot = Object.assign({}, this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);
            let action = value !== undefined
                ? Object.assign(Object.assign({}, slot.actions[0]), { service_data: Object.assign(Object.assign({}, slot.actions[0].service_data), { [field]: value }) }) : Object.assign(Object.assign({}, slot.actions[0]), { service_data: Object.fromEntries(Object.entries(slot.actions[0].service_data).filter(([key]) => key != field)) });
            this._updateSlot({ actions: [action] });
        }
        _toggleOptionalField(ev, field, selector) {
            const checked = ev.target.checked;
            const value = checked ? defaultSelectorValue(selector) : undefined;
            this._selectField(field, new CustomEvent('value-changed', { detail: { value: value } }));
        }
        _selectEntity(ev) {
            const entity = ev.detail.value;
            this.schedule.entries[this.selectedEntry].slots.forEach((slot, idx) => {
                if (!slot.actions.length)
                    return;
                let action = Object.assign(Object.assign({}, slot.actions[0]), { target: {
                        entity_id: entity
                    } });
                this._updateSlot({ actions: [action] }, idx);
            });
        }
        _handleUpdate(ev, entry) {
            this.selectedEntry = entry;
            if (ev.detail.hasOwnProperty('selectedSlot')) {
                this.selectedSlot = ev.detail.selectedSlot;
            }
            else if (ev.detail.hasOwnProperty('slots')) {
                this._updateEntry({ slots: ev.detail.slots });
            }
        }
        _updateEntry(update) {
            let entry = Object.assign({}, this.schedule.entries[this.selectedEntry]);
            entry = Object.assign(Object.assign({}, entry), update);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: Object.assign(this.schedule.entries, {
                    [this.selectedEntry]: entry
                }) });
        }
        _updateSlot(update, slotIdx = this.selectedSlot) {
            let slot = Object.assign({}, this.schedule.entries[this.selectedEntry].slots[slotIdx]);
            slot = Object.assign(Object.assign({}, slot), update);
            this._updateEntry({
                slots: Object.assign(this.schedule.entries[this.selectedEntry].slots, {
                    [slotIdx]: slot
                })
            });
        }
        async _showWeekdayDialog(ev, entry) {
            this.selectedEntry = entry;
            await new Promise(resolve => {
                const params = {
                    weekdays: [...this.schedule.entries[entry].weekdays],
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out)
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'dialog-select-weekdays',
                    dialogImport: () => Promise.resolve().then(function () { return dialogSelectWeekdays; }),
                    dialogParams: params,
                });
            })
                .then((res) => {
                if (!res)
                    return;
                this._updateEntry({ weekdays: res });
            });
        }
        async _showActionDialog(ev) {
            const filteredDomains = this.schedule.entries.map(e => e.slots.map(f => f.actions.map(g => g.service.split(".")[0])).flat()).flat();
            await new Promise(resolve => {
                const params = {
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out),
                    domain: filteredDomains.length ? filteredDomains[0] : undefined,
                    cardConfig: this.config
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'dialog-select-action',
                    dialogImport: () => Promise.resolve().then(function () { return dialogSelectAction; }),
                    dialogParams: params,
                });
            })
                .then((res) => {
                if (!res)
                    return;
                const slot = Object.assign({}, this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);
                const target = this.schedule.entries[this.selectedEntry].slots.find(e => e.actions.length ? e.actions[0].target.entity_id : undefined);
                const action = {
                    service: res,
                    service_data: {},
                    target: target ? target.actions[0].target : {}
                };
                this._updateSlot({ actions: [action] });
            });
        }
        _removeAction() {
            this._updateSlot({ actions: [] });
        }
        _stopTimeChanged(ev) {
            const value = ev.detail.value;
            const time = timeToString(value);
            const slotIdx = Number(this.selectedSlot);
            let slots = [...this.schedule.entries[this.selectedEntry].slots];
            slots = Object.assign(slots, {
                [slotIdx]: Object.assign(Object.assign({}, slots[slotIdx]), { stop: time })
            });
            if (slotIdx < (slots.length - 1)) {
                slots = Object.assign(slots, {
                    [slotIdx + 1]: Object.assign(Object.assign({}, slots[slotIdx + 1]), { start: time })
                });
            }
            this._updateEntry({ slots: slots });
        }
        _startTimeChanged(ev) {
            const value = ev.detail.value;
            const time = timeToString(value);
            const slotIdx = Number(this.selectedSlot);
            let slots = [...this.schedule.entries[this.selectedEntry].slots];
            slots = Object.assign(slots, {
                [slotIdx]: Object.assign(Object.assign({}, slots[slotIdx]), { start: time })
            });
            if (slotIdx > 0) {
                slots = Object.assign(slots, {
                    [slotIdx - 1]: Object.assign(Object.assign({}, slots[slotIdx - 1]), { stop: time })
                });
            }
            this._updateEntry({ slots: slots });
        }
        _toggleStopTime(ev) {
            const checked = ev.target.checked;
            const slotIdx = Number(this.selectedSlot);
            let slots = [...this.schedule.entries[this.selectedEntry].slots];
            if (checked) {
                let nextSlot = slotIdx + 1;
                let stopTime = slots[slotIdx].start;
                if (!slots[slotIdx + 1].actions.length) {
                    stopTime = slots[slotIdx + 1].stop;
                    nextSlot = slotIdx + 2;
                }
                slots = [
                    ...slots.slice(0, slotIdx),
                    Object.assign(Object.assign({}, slots[slotIdx]), { stop: stopTime }),
                    ...slots.slice(nextSlot)
                ];
            }
            else {
                const stopTime = addTimeOffset(parseTimeString(slots[slotIdx].start), { minutes: 1 });
                slots = [
                    ...slots.slice(0, slotIdx),
                    Object.assign(Object.assign({}, slots[slotIdx]), { stop: undefined }),
                    {
                        start: timeToString(stopTime),
                        stop: slots[slotIdx].stop,
                        actions: [],
                        conditions: slots[slotIdx - 1].conditions
                    },
                    ...slots.slice(slotIdx + 1)
                ];
            }
            this._updateEntry({ slots: slots });
        }
        _addTimeslot() {
            if (this.selectedEntry === null || this.selectedSlot === null)
                return;
            this.schedule = insertTimeslot(this.schedule, this.selectedEntry, this.selectedSlot, this.hass);
        }
        _removeTimeslot() {
            if (this.selectedEntry === null || this.selectedSlot === null)
                return;
            this.schedule = removeTimeslot(this.schedule, this.selectedEntry, this.selectedSlot);
            if (this.selectedSlot == this.schedule.entries[this.selectedEntry].slots.length)
                this.selectedSlot--;
        }
        static get styles() {
            return i `
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
    padding: 12px 0px;
    align-items: end;
  }
  .weekdays ha-icon-button {
    height: 32px;
    --mdc-icon-size: 20px;
    margin-top: -12px;
  }
  div.actions {
    display: flex;
    align-items: end;
  }
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], SchedulerMainPanel.prototype, "hass", void 0);
    __decorate([
        n$4({ attribute: false })
    ], SchedulerMainPanel.prototype, "config", void 0);
    __decorate([
        t$2()
    ], SchedulerMainPanel.prototype, "schedule", void 0);
    __decorate([
        t$2()
    ], SchedulerMainPanel.prototype, "selectedEntry", void 0);
    __decorate([
        t$2()
    ], SchedulerMainPanel.prototype, "selectedSlot", void 0);
    __decorate([
        n$4({ type: Boolean })
    ], SchedulerMainPanel.prototype, "large", void 0);
    SchedulerMainPanel = __decorate([
        e$3('scheduler-main-panel')
    ], SchedulerMainPanel);

    const computeEntityDisplay = (entityId, hass) => {
        if (Object.keys(hass.states).includes(entityId) &&
            hass.states[entityId].attributes.friendly_name)
            return hass.states[entityId].attributes.friendly_name;
        return computeEntity(entityId).replace(/_/g, " ");
    };

    var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
    var literal = /\[([^]*?)\]/gm;
    function shorten(arr, sLen) {
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i].substr(0, sLen));
        }
        return newArr;
    }
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

    function formatIsoDate(dateObj) {
        return format(dateObj, 'isoDate');
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

    const validateSelectSelectorValue = (value, selector) => {
        var _a;
        return (((_a = selector.select) === null || _a === void 0 ? void 0 : _a.options) || []).some((e) => {
            return typeof e === "object"
                ? e.value == value
                : e == value;
        });
    };
    const validateNumberSelectorValue = (value, selector) => {
        var _a, _b;
        if (isNaN(value))
            return false;
        if (((_a = selector.number) === null || _a === void 0 ? void 0 : _a.min) !== undefined && value < selector.number.min)
            return false;
        if (((_b = selector.number) === null || _b === void 0 ? void 0 : _b.max) !== undefined && value > selector.number.max)
            return false;
        return false;
    };
    const validateSelectorValue = (value, selector) => {
        if ('select' in selector && selector.select !== null) {
            return validateSelectSelectorValue(String(value), selector);
        }
        else if ('number' in selector && selector.number !== null) {
            return validateNumberSelectorValue(Number(value), selector);
        }
        else if ('text' in selector && selector.text !== null) {
            return String(value).length > 0;
        }
        return true;
    };

    let DialogSelectCondition = class DialogSelectCondition extends s$3 {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
        }
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.cancel();
            this._params = undefined;
            this._clearSearch();
            this._height = undefined;
            this._width = undefined;
        }
        async willUpdate() {
            this.hass.loadBackendTranslation("title");
        }
        render() {
            if (!this._params)
                return x ``;
            return x `
      <ha-dialog
        open
        .heading=${true}
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
              .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
              .path=${mdiClose}
            ></ha-icon-button>
            <span slot="title">
              ${localize('ui.panel.editor.add_condition', this.hass)}
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
              ${this._search &&
            x `
                <ha-icon-button
                  @click=${this._clearSearch}
                  .label=${this.hass.localize("ui.common.clear")}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-textfield>
        </div>

        <mwc-list
          style=${o$5({
            width: this._width ? `${this._width}px` : "auto",
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </mwc-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("mwc-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            this._width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width;
            this._height = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.height;
        }
        _handleSearchChange(ev) {
            const newFilter = ev.currentTarget.value;
            this._search = newFilter;
            clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this._filter = this._search;
            }, 100);
        }
        _clearSearch() {
            this._search = "";
            this._filter = "";
        }
        _renderOptions() {
            //if (!this._params?.domain) {
            let domains = computeConditionDomains(this.hass);
            domains.sort((a, b) => sortByName(a.name, b.name));
            if (this._filter) {
                domains = domains.filter(e => {
                    const tokens = this._filter.toLowerCase().trim().split(" ");
                    return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                        tokens.every(token => e.key.toLowerCase().includes(token)));
                });
            }
            return (Object.keys(domains)).map((key) => x `
        <mwc-list-item
          graphic="icon"
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <span>${domains[key].name}</span>
        </mwc-list-item>
    `);
        }
        _handleDomainClick(key) {
            this._params = Object.assign(Object.assign({}, this._params), { domain: key });
            this._params.confirm(key);
            this._params = undefined;
            this._clearSearch();
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], DialogSelectCondition.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], DialogSelectCondition.prototype, "_params", void 0);
    __decorate([
        t$2()
    ], DialogSelectCondition.prototype, "_search", void 0);
    __decorate([
        t$2()
    ], DialogSelectCondition.prototype, "_filter", void 0);
    __decorate([
        t$2()
    ], DialogSelectCondition.prototype, "_width", void 0);
    __decorate([
        t$2()
    ], DialogSelectCondition.prototype, "_height", void 0);
    DialogSelectCondition = __decorate([
        e$3('dialog-select-condition')
    ], DialogSelectCondition);

    var dialogSelectCondition = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectCondition () { return DialogSelectCondition; }
    });

    let SchedulerOptionsPanel = class SchedulerOptionsPanel extends s$3 {
        constructor() {
            super(...arguments);
            this.conditionValid = true;
            this.startDate = '';
            this.endDate = '';
        }
        async firstUpdated() {
            var _a, _b;
            (await window.loadCardHelpers()).importMoreInfoControl('input_datetime');
            this.startDate = ((_a = this.schedule) === null || _a === void 0 ? void 0 : _a.start_date) || formatIsoDate(new Date());
            this.endDate = ((_b = this.schedule) === null || _b === void 0 ? void 0 : _b.end_date) || formatIsoDate(new Date());
        }
        render() {
            return x `
      Conditions:
        <collapsible-group
          ?disabled=${!this.conditionValid}
          @openclose-changed=${this._updateActiveCondition}
          .openedItem=${this.conditionIdx}
        >
        ${this.renderConditions()}
        </collapsible-group>

      <mwc-button
        @click=${this._conditionAddClick}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        ${localize('ui.panel.editor.add_condition', this.hass)}
      </mwc-button>


      <div>Period:</div>
      <div class="period">
        <ha-checkbox
          ?checked=${this.schedule.start_date !== undefined}
          @change=${this.toggleEnableDateRange}
        >
        </ha-checkbox>
        <span>From</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${this.hass.localize('ui.components.date-range-picker.start_date')}
          @value-changed=${this._setStartDate}
          ?disabled=${this.schedule.start_date === undefined}
        >
        </ha-date-input>
        <span>To</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${this.hass.localize('ui.components.date-range-picker.end_date')}
          @value-changed=${this._setEndDate}
          ?disabled=${this.schedule.end_date === undefined}
        >
        </ha-date-input>
      </div>

      <div>${this.hass.localize('ui.components.area-picker.add_dialog.name')}:</div>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name || ''}
          placeholder=${this.schedule.name
            ? ''
            : this.hass.localize('ui.components.area-picker.add_dialog.name')}
          @input=${this.updateName}
        ></ha-textfield>
      </div>
    `;
        }
        renderConditions() {
            let conditions = this.schedule.entries[0].slots[0].conditions.items;
            if (this.conditionIdx == conditions.length)
                conditions = [...conditions, {}];
            return conditions.map((condition, i) => {
                const domain = this.selectedDomain || computeDomain(condition.entity_id || "");
                const selector = computeStatesForEntity(this.selectedEntity || domain, this.hass);
                const matchTypes = selector && selector.hasOwnProperty('number')
                    ? [TConditionMatchType.Above, TConditionMatchType.Below]
                    : [TConditionMatchType.Equal, TConditionMatchType.Unequal];
                const matchTypeIcons = {
                    [TConditionMatchType.Equal]: 'mdi:equal',
                    [TConditionMatchType.Unequal]: 'mdi:not-equal-variant',
                    [TConditionMatchType.Above]: 'mdi:greater-than',
                    [TConditionMatchType.Below]: 'mdi:less-than',
                };
                if (this.conditionIdx === i && !this.selectedMatchType)
                    this.selectedMatchType = matchTypes[0];
                return x `
      <collapsible-section>
        <span slot="header">
          ${condition.entity_id && condition.value !== undefined ? x `
          <ha-icon slot="icon" icon="${computeEntityIcon(condition.entity_id, this.hass)}"></ha-icon>
          ${computeEntityDisplay(condition.entity_id, this.hass)}
          ${localize(`card.condition.${condition.match_type}`, this.hass)}
          ${condition.value}
          ` : 'new condition'}
        </span>
        <ha-button-menu
          slot="contextMenu" 
          @action=${(ev) => this._conditionItemOptionsClick(ev, i)}
          @closed=${(ev) => { ev.stopPropagation(); }}
          @click=${(ev) => { ev.preventDefault(); ev.stopImmediatePropagation(); }}
          fixed
          ?disabled=${!this.conditionValid && this.conditionIdx !== i}
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiDotsVertical}
            ?disabled=${!this.conditionValid && this.conditionIdx !== i}
          >
          </ha-icon-button>
          <mwc-list-item graphic="icon">
            ${this.hass.localize('ui.panel.lovelace.editor.card.conditional.change_type')}
            <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
          </mwc-list-item>
          <mwc-list-item graphic="icon" class="warning">
            ${this.hass.localize('ui.common.delete')}
            <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
          </mwc-list-item>
        </ha-button-menu>

        <div slot="content">

        <settings-row>
          <span slot="heading">
            ${this.hass.localize('ui.components.selectors.selector.types.entity')}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${domain}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx == i ? this.selectedEntity : condition.entity_id}
          >
          </scheduler-entity-picker>
        </settings-row>

        <settings-row>
          <span slot="heading">
            ${localize(`ui.panel.conditions.${this.conditionIdx == i ? this.selectedMatchType : condition.match_type}`, this.hass)}
            <ha-button-menu
              @action=${(ev) => this._selectMatchType(ev, matchTypes)}
              @closed=${(ev) => { ev.stopPropagation(); }}
              fixed
            >
              <ha-icon-button slot="trigger" .path=${mdiPencil}>
              </ha-icon-button>
              ${matchTypes.map(e => x `
                <mwc-list-item graphic="icon" ?noninteractive=${this.conditionIdx == i ? this.selectedMatchType == e : condition.match_type == e}>
                  ${localize(`ui.panel.conditions.${e}`, this.hass)}
                  <ha-icon slot="graphic" icon="${matchTypeIcons[e]}"></ha-icon>
                </mwc-list-item>
              `)}
            </ha-button-menu>
          </span>
          <combo-selector
            .hass=${this.hass}
            .config=${selector}
            .value=${this.conditionIdx == i ? this.conditionValue : condition.value}
            @value-changed=${this._conditionValueChanged}
          >
          </combo-selector>
        </settings-row>
        </div>
      </collapsible-section>
    `;
            });
        }
        _updateActiveCondition(ev) {
            const idx = ev.detail.item;
            if (idx < 0) {
                this.conditionIdx = undefined;
                return;
            }
            if (idx === this.conditionIdx)
                return;
            this.conditionIdx = idx;
            const condition = this.schedule.entries[0].slots[0].conditions.items[idx];
            this.selectedEntity = condition ? condition.entity_id : undefined;
            this.selectedMatchType = condition ? condition.match_type : undefined;
            this.conditionValue = condition ? condition.value : undefined;
        }
        _conditionItemOptionsClick(ev, idx) {
            const option = ev.detail.index;
            switch (option) {
                case 0:
                    this._showConditionDialog(ev)
                        .then(res => {
                        if (!res)
                            return;
                        this.conditionIdx = idx;
                        this.selectedDomain = res;
                        this.selectedEntity = undefined;
                        this.selectedMatchType = undefined;
                        this.conditionValue = undefined;
                        this.conditionValid = false;
                    });
                    break;
                case 1:
                    const conditions = this.schedule.entries[0].slots[0].conditions.items.filter((_e, i) => i !== idx);
                    const updateSlots = (e) => Object.assign(e, { conditions: Object.assign(Object.assign({}, e.conditions), { items: conditions }) });
                    const updateEntries = (e) => Object.assign(e, { slots: e.slots.map(updateSlots) });
                    this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(updateEntries) });
                    if (idx === this.conditionIdx)
                        this.conditionIdx = undefined;
                    else if (this.conditionIdx !== undefined && idx < this.conditionIdx)
                        this.conditionIdx = this.conditionIdx - 1;
                    break;
            }
        }
        _selectMatchType(ev, options) {
            const index = ev.detail.index;
            options = options.filter(e => e != this.selectedMatchType);
            this.selectedMatchType = options[index];
            ev.preventDefault();
            const el = ev.target;
            setTimeout(() => {
                el.firstElementChild.blur();
            }, 50);
            this._validateCondition();
        }
        _conditionValueChanged(ev) {
            this.conditionValue = ev.detail.value;
            this._validateCondition();
        }
        async _showConditionDialog(ev) {
            return new Promise(resolve => {
                const params = {
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out),
                    domain: undefined
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'dialog-select-condition',
                    dialogImport: () => Promise.resolve().then(function () { return dialogSelectCondition; }),
                    dialogParams: params,
                });
            });
        }
        _selectEntity(ev) {
            const entity = ev.detail.value;
            this.selectedEntity = entity;
            this._validateCondition();
        }
        _validateCondition() {
            this.conditionValid = false;
            if (!this.selectedEntity || !this.conditionValue || !this.selectedMatchType || this.conditionIdx === undefined)
                return;
            const selector = computeStatesForEntity(this.selectedEntity, this.hass);
            if (!validateSelectorValue(this.conditionValue, selector))
                return;
            this.conditionValid = true;
            const condition = {
                entity_id: this.selectedEntity,
                match_type: this.selectedMatchType,
                value: this.conditionValue,
                attribute: 'state'
            };
            const conditions = Object.assign(this.schedule.entries[0].slots[0].conditions.items, { [this.conditionIdx]: condition });
            const updateSlots = (e) => Object.assign(e, { conditions: Object.assign(Object.assign({}, e.conditions), { items: conditions }) });
            const updateEntries = (e) => Object.assign(e, { slots: e.slots.map(updateSlots) });
            this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(updateEntries) });
        }
        _conditionAddClick(ev) {
            this._showConditionDialog(ev)
                .then(res => {
                if (!res)
                    return;
                this.conditionIdx = this.schedule.entries[0].slots[0].conditions.items.length;
                this.selectedDomain = res;
                this.selectedEntity = undefined;
                this.selectedMatchType = undefined;
                this.conditionValue = undefined;
                this.conditionValid = false;
            });
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
            this.schedule = Object.assign(Object.assign({}, this.schedule), { start_date: checked ? this.startDate : undefined, end_date: checked ? this.endDate : undefined, repeat_type: checked
                    ? this.schedule.repeat_type == TRepeatType.Repeat
                        ? TRepeatType.Pause
                        : this.schedule.repeat_type
                    : this.schedule.repeat_type == TRepeatType.Pause
                        ? TRepeatType.Repeat
                        : this.schedule.repeat_type });
        }
        updateName(ev) {
            const value = ev.target.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { name: value });
        }
        static get styles() {
            return i `
      ha-icon-button {
        align-self: center;
      }
      mwc-list-item.warning, mwc-list-item.warning ha-icon {
        color: var(--error-color);
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
    `;
        }
    };
    __decorate([
        n$4({ attribute: false })
    ], SchedulerOptionsPanel.prototype, "hass", void 0);
    __decorate([
        n$4({ attribute: false })
    ], SchedulerOptionsPanel.prototype, "config", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "schedule", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "conditionIdx", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "selectedDomain", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "selectedEntity", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "selectedMatchType", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "conditionValue", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "conditionValid", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "startDate", void 0);
    __decorate([
        t$2()
    ], SchedulerOptionsPanel.prototype, "endDate", void 0);
    SchedulerOptionsPanel = __decorate([
        e$3('scheduler-options-panel')
    ], SchedulerOptionsPanel);

    let GenericDialog = class GenericDialog extends s$3 {
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
                return x ``;
            return x `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
            .path=${mdiClose}
          ></ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        ${this._params.secondaryButtonLabel
            ? x `
              <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
                ${this._params.secondaryButtonLabel}
              </mwc-button>
            `
            : ''}
        <mwc-button
          slot="secondaryAction"
          style="${this._params.primaryButtonCritical ? '--mdc-theme-primary: var(--error-color)' : ''}"
          @click=${this.confirmClick}
          dialogAction="close"
        >
          ${this._params.primaryButtonLabel}
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
        n$4({ attribute: false })
    ], GenericDialog.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], GenericDialog.prototype, "_params", void 0);
    GenericDialog = __decorate([
        e$3('scheduler-generic-dialog')
    ], GenericDialog);

    var genericDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get GenericDialog () { return GenericDialog; }
    });

    let DialogSchedulerEditor = class DialogSchedulerEditor extends s$3 {
        constructor() {
            super(...arguments);
            this.large = false;
            this.selectedEntry = 0;
            this.selectedSlot = 0;
            this._panel = "main";
        }
        async showDialog(params) {
            this._params = params;
            this.schedule = params.schedule;
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        willUpdate() {
            this.hass.loadBackendTranslation("config");
        }
        render() {
            var _a;
            if (!this._params)
                return x ``;
            return x `
      <ha-dialog open @closed=${this.closeDialog} .heading=${true} hideActions scrimClickAction="">
        <ha-dialog-header slot="heading">
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize('ui.dialogs.more_info_control.dismiss')}
            .path=${mdiClose}
          ></ha-icon-button>
          <ha-icon-button
            slot="actionItems"
            .label=""
            .path=${this._panel == "main" ? mdiArrowRight : mdiArrowLeft}
            @click=${this._toggleOptionsPanel}
          ></ha-icon-button>

          <span slot="title" @click=${() => this.large = !this.large}>
            ${this._params.editItem
            ? this.schedule.name
                ? (_a = this.schedule) === null || _a === void 0 ? void 0 : _a.name
                : localize('ui.panel.common.default_name', this.hass, '{id}', this._params.editItem)
            : localize('ui.panel.common.new_schedule', this.hass)}
          </span>

        </ha-dialog-header>

        <div class="content">

          ${this._panel == "main"
            ? x `
          <scheduler-main-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
            .large=${this.large}
          >
          </scheduler-main-panel>
            `
            : x `
          <scheduler-options-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
          >
          </scheduler-options-panel>
        `}
        </div>


        <div class="buttons">
          <mwc-button @click=${this._handleSaveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
          <mwc-button @click=${this._handleDeleteClick} class="warning">
            ${this.hass.localize('ui.common.delete')}
          </mwc-button>
        </div>
      </ha-dialog>
    `;
        }
        _toggleOptionsPanel() {
            this._panel = this._panel == "main" ? "options" : "main";
        }
        async _handleSaveClick(ev) {
            const error = validateSchedule(this.schedule, this.hass);
            if (error) {
                await new Promise(resolve => {
                    const params = {
                        cancel: () => resolve(false),
                        confirm: () => resolve(true),
                        title: this.hass.localize('state_badge.default.error'),
                        description: localize(`ui.panel.editor.validation_errors.${error}`, this.hass),
                        primaryButtonLabel: this.hass.localize('ui.common.ok')
                    };
                    fireEvent(ev.target, 'show-dialog', {
                        dialogTag: 'scheduler-generic-dialog',
                        dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
                        dialogParams: params,
                    });
                });
            }
            else {
                saveSchedule(this.hass, this.schedule)
                    .catch(e => handleWebsocketError(e, this, this.hass))
                    .then(() => {
                    this.closeDialog();
                });
            }
        }
        async _handleDeleteClick(ev) {
            await new Promise(resolve => {
                const params = {
                    cancel: () => resolve(false),
                    confirm: () => resolve(true),
                    title: localize('ui.dialog.confirm_delete.title', this.hass),
                    description: localize('ui.dialog.confirm_delete.description', this.hass),
                    primaryButtonLabel: this.hass.localize('ui.dialogs.generic.ok'),
                    secondaryButtonLabel: this.hass.localize('ui.dialogs.generic.cancel'),
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'scheduler-generic-dialog',
                    dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
                    dialogParams: params,
                });
            })
                .then(res => {
                if (!res)
                    return;
                deleteSchedule(this.hass, this._params.editItem)
                    .catch(e => handleWebsocketError(e, this, this.hass))
                    .then(() => {
                    this.closeDialog();
                });
            });
        }
    };
    DialogSchedulerEditor.styles = EditorDialogStyles;
    __decorate([
        n$4({ attribute: false })
    ], DialogSchedulerEditor.prototype, "hass", void 0);
    __decorate([
        t$2()
    ], DialogSchedulerEditor.prototype, "_params", void 0);
    __decorate([
        n$4({ type: Boolean, reflect: true })
    ], DialogSchedulerEditor.prototype, "large", void 0);
    __decorate([
        t$2()
    ], DialogSchedulerEditor.prototype, "schedule", void 0);
    __decorate([
        t$2()
    ], DialogSchedulerEditor.prototype, "selectedEntry", void 0);
    __decorate([
        t$2()
    ], DialogSchedulerEditor.prototype, "selectedSlot", void 0);
    __decorate([
        t$2()
    ], DialogSchedulerEditor.prototype, "_panel", void 0);
    DialogSchedulerEditor = __decorate([
        e$3('dialog-scheduler-editor')
    ], DialogSchedulerEditor);

    var dialogSchedulerEditor = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSchedulerEditor () { return DialogSchedulerEditor; }
    });

    let ScheduleItemRow = class ScheduleItemRow extends s$3 {
        render() {
            const stateObj = this.hass.states[this.schedule.entity_id];
            const disabled = stateObj.state == 'off';
            const nextAction = this.schedule.entries[0].slots[this.schedule.next_entries[0]].actions[0];
            return x `
      <ha-icon
        icon="${computeActionIcon(nextAction, this.hass)}"
      >
      </ha-icon>

      <div
        class="info ${disabled ? 'disabled' : ''}"
        @click=${this._handleItemClick}
      >
        ${computeScheduleDisplay(this.schedule, this.config.display_options.primary_info, this.hass)}
        <div class="secondary">
        ${computeScheduleDisplay(this.schedule, this.config.display_options.secondary_info, this.hass)}
        </div>
      </div>
      <div class="state">
        <ha-entity-toggle
          .hass=${this.hass}
          .stateObj=${stateObj}
        ></ha-entity-toggle>
      </div>

    `;
        }
        _handleItemClick(_ev) {
            const myEvent = new CustomEvent('editClick', { detail: { schedule_id: this.schedule_id } });
            this.dispatchEvent(myEvent);
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        n$4()
    ], ScheduleItemRow.prototype, "hass", void 0);
    __decorate([
        n$4()
    ], ScheduleItemRow.prototype, "schedule_id", void 0);
    __decorate([
        n$4()
    ], ScheduleItemRow.prototype, "schedule", void 0);
    __decorate([
        n$4()
    ], ScheduleItemRow.prototype, "config", void 0);
    ScheduleItemRow = __decorate([
        e$3("schedule-item-row")
    ], ScheduleItemRow);

    exports.SchedulerCard = class SchedulerCard extends SubscribeMixin(s$3) {
        constructor() {
            super(...arguments);
            this._config = DefaultCardConfig;
            this.showDiscovered = false;
        }
        setConfig(userConfig) {
            userConfig = validateConfig(userConfig);
            this._config = Object.assign(Object.assign({}, DefaultCardConfig), userConfig);
        }
        firstUpdated() {
            (async () => await loadHaForm())();
        }
        willUpdate() {
            this.hass.loadBackendTranslation("services");
        }
        hassSubscribe() {
            this.loadSchedules();
            return [
                this.hass.connection.subscribeMessage((ev) => this.handleScheduleItemUpdated(ev), {
                    type: 'scheduler_updated',
                }),
            ];
        }
        shouldUpdate(changedProps) {
            const oldHass = changedProps.get('hass');
            const oldConfig = changedProps.get('_config');
            // if (oldHass && changedProps.size == 1 && !this.translationsLoaded) {
            //   if (!oldHass.localize('ui.panel.config.automation.editor.actions.type.device_id.action')) {
            //     this.translationsLoaded = true;
            //   }
            // }
            if (oldConfig && this._config) {
                const changedKeys = Object.keys(oldConfig).filter(e => oldConfig[e] !== this._config[e]);
                if (changedKeys.some(e => ['tags', 'discover_existing', 'sort_by', 'display_options'].includes(e)))
                    (async () => await this.loadSchedules())();
            }
            //only reload card if a schedule entity has changed
            if (oldHass && changedProps.size == 1 && this.schedules)
                return Object.values(this.schedules).some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass.states[e.entity_id]));
            return true;
        }
        render() {
            let items = Object.assign({}, this.schedules);
            let includedItems = Object.keys(this.schedules || {}).filter(e => isIncludedSchedule((items)[e], this._config));
            const headerToggleState = Object.entries(items)
                .filter(([key]) => this.showDiscovered ? true : includedItems.includes(key))
                .some(([, el]) => { var _a; return ['on', 'triggered'].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); });
            return x `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this._config.title
            ? typeof this._config.title == 'string'
                ? this._config.title
                : localize('ui.panel.common.title', this.hass)
            : ''}
          </div>

          ${Object.keys(this.schedules || {}).length && this._config.show_header_toggle
            ? x `
          <ha-switch
            ?checked=${headerToggleState}
            @change=${this.toggleDisableAll}
          >
          </ha-switch>
          `
            : ''}
        </div>

        <div class="card-content" id="states">
          ${includedItems.map(scheduleId => x `
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${scheduleId}
                  .schedule=${this.schedules[scheduleId]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `)}

      ${Object.keys(items).length > includedItems.length
            ? !this.showDiscovered
                ? x `
              <div>
                <button
                  class="show-more"
                  @click=${() => {
                    this.showDiscovered = true;
                }}
                >
                  +
                  ${localize('ui.panel.overview.excluded_items', this.hass, '{number}', Object.keys(items).length - includedItems.length)}
                </button>
              </div>
            `
                : x `

          ${Object.keys(items).filter(e => !includedItems.includes(e)).map(scheduleId => x `
                <schedule-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${scheduleId}
                  .schedule=${this.schedules[scheduleId]}
                  @editClick=${this._handleEditClick}
                >
                </schedule-item-row>
              `)}

              <div>
                <button
                  class="show-more"
                  @click=${() => {
                    this.showDiscovered = false;
                }}
                >
                  ${localize('ui.panel.overview.hide_excluded', this.hass)}
                </button>
              </div>
            `
            : ''}
        </div>

        <div class="card-actions">
          <mwc-button @click=${this._addClick}
            >${this.hass.localize('ui.common.add')}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        async loadSchedules() {
            fetchItems(this.hass)
                .then(res => {
                this.schedules = sortSchedules(res, this._config, this.hass);
                Object.values(res).every(e => isIncludedSchedule(e, this._config));
            })
                .catch(_e => {
                this.schedules = {};
            });
        }
        async handleScheduleItemUpdated(ev) {
            //only update single schedule
            if (ev.event == 'scheduler_item_removed') {
                this.schedules = Object.fromEntries(Object.entries(this.schedules || {}).filter(([k,]) => k !== ev.schedule_id));
                return;
            }
            fetchScheduleItem(this.hass, ev.schedule_id).then(schedule => {
                const oldSchedule = this.schedules[ev.schedule_id];
                let schedules = Object.assign({}, this.schedules);
                if (!schedule || (!this._config.discover_existing && !isIncludedSchedule(schedule, this._config))) {
                    //schedule is not in the list, remove if it was in the list
                    if (oldSchedule) {
                        schedules = Object.fromEntries(Object.entries(schedules).filter(([k,]) => k != ev.schedule_id));
                    }
                }
                else if (!oldSchedule) {
                    //add a new schedule and sort the list
                    schedules = sortSchedules(Object.assign(Object.assign({}, schedules), { [ev.schedule_id]: schedule }), this._config, this.hass);
                }
                else if (oldSchedule.timestamps[oldSchedule.next_entries[0]] == schedule.timestamps[schedule.next_entries[0]]) {
                    //only overwrite the existing schedule
                    schedules = Object.assign(Object.assign({}, schedules), { [ev.schedule_id]: schedule });
                }
                else {
                    //overwrite the existing schedule and sort
                    schedules = sortSchedules(Object.assign(Object.assign({}, schedules), { [ev.schedule_id]: schedule }), this._config, this.hass);
                }
                this.schedules = Object.assign({}, schedules);
            });
        }
        _handleEditClick(ev) {
            if (!this.schedules)
                return;
            const scheduleId = ev.detail.schedule_id;
            const params = {
                schedule: parseTimeBar(this.schedules[scheduleId], this.hass),
                cardConfig: this._config,
                editItem: scheduleId
            };
            fireEvent(ev.target, 'show-dialog', {
                dialogTag: 'dialog-scheduler-editor',
                dialogImport: () => Promise.resolve().then(function () { return dialogSchedulerEditor; }),
                dialogParams: params,
            });
        }
        _addClick(_ev) {
            const params = {
                schedule: defaultScheduleConfig,
                cardConfig: this._config
            };
            fireEvent(this, 'show-dialog', {
                dialogTag: 'dialog-scheduler-editor',
                dialogImport: () => Promise.resolve().then(function () { return dialogSchedulerEditor; }),
                dialogParams: params,
            });
        }
        toggleDisableAll(ev) {
            if (!this.hass || !this.schedules)
                return;
            const checked = ev.target.checked;
            const items = Object.values(this.schedules).filter(el => this.showDiscovered ? true : isIncludedSchedule(el, this._config));
            items.forEach(el => {
                this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
            });
        }
        // card configuration
        static getConfigElement() {
            return document.createElement('scheduler-card-editor');
        }
    };
    exports.SchedulerCard.styles = i `
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
  `;
    __decorate([
        n$4({ attribute: false })
    ], exports.SchedulerCard.prototype, "hass", void 0);
    __decorate([
        n$4()
    ], exports.SchedulerCard.prototype, "_config", void 0);
    __decorate([
        t$2()
    ], exports.SchedulerCard.prototype, "schedules", void 0);
    __decorate([
        t$2()
    ], exports.SchedulerCard.prototype, "showDiscovered", void 0);
    exports.SchedulerCard = __decorate([
        e$3('scheduler-card')
    ], exports.SchedulerCard);
    window.customCards = window.customCards || [];
    window.customCards.push({
        type: 'scheduler-card',
        name: 'Scheduler Card',
        description: 'Card to manage schedule entities made with scheduler-component.',
    });
    console.info(`%c  SCHEDULER-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');

    return exports;

}({}));
