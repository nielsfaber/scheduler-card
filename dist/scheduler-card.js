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
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$3=window,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$6=new WeakMap;let o$5 = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$5("string"==typeof t?t:t+"",void 0,s$3),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$5(n,t,s$3)},S$1=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$2;const e$5=window,r$1=e$5.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$4=e$5.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:true,type:String,converter:n$5,reflect:false,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return  false;this[d$1]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=true,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$4||o$4({ReactiveElement:u$1}),(null!==(s$2=e$5.reactiveElementVersions)&&void 0!==s$2?s$2:e$5.reactiveElementVersions=[]).push("1.6.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$2;const i$3=window,s$1=i$3.trustedTypes,e$4=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$4=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$4,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$4?e$4.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$3+s.slice(v)+n$4+w):s+n$4+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$4)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$4),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$4),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$4,t+1));)v.push({type:7,index:r}),t+=n$4.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$3.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l,o$2;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}}s.finalized=true,s._$litElement$=true,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s});(null!==(o$2=globalThis.litElementVersions)&&void 0!==o$2?o$2:globalThis.litElementVersions=[]).push("3.3.3");

    const loadHaForm = async () => {
      if (customElements.get("ha-checkbox") && customElements.get("ha-slider") && customElements.get("ha-generic-picker")) return;

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
    const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$2=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$2(n){return (t,o)=>void 0!==o?e$2(n,t,o):i$2(n,t)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function t$1(t){return n$2({...t,state:true})}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

    const deepCompare = (objA, objB) => {
        if (typeof objA != typeof objB)
            return false;
        if (typeof objA === 'object' && typeof objB === 'object' && objA !== null && objB !== null) {
            const keys = [...new Set([...Object.keys(objA), ...Object.keys(objB)])];
            if (!keys.every(key => Object.keys(objA).includes(key) && Object.keys(objB).includes(key)))
                return false;
            return keys.every(key => deepCompare(objA[key], objB[key]));
        }
        return objA === objB;
    };

    var EditorMode;
    (function (EditorMode) {
        EditorMode["Single"] = "single";
        EditorMode["Scheme"] = "scheme";
    })(EditorMode || (EditorMode = {}));
    var TWeekday;
    (function (TWeekday) {
        TWeekday["Daily"] = "daily";
        TWeekday["Workday"] = "workday";
        TWeekday["Weekend"] = "weekend";
        TWeekday["Monday"] = "monday";
        TWeekday["Tuesday"] = "tuesday";
        TWeekday["Wednesday"] = "wednesday";
        TWeekday["Thursday"] = "thursday";
        TWeekday["Friday"] = "friday";
        TWeekday["Saturday"] = "saturday";
        TWeekday["Sunday"] = "sunday";
    })(TWeekday || (TWeekday = {}));
    var TConditionLogicType;
    (function (TConditionLogicType) {
        TConditionLogicType["Or"] = "or";
        TConditionLogicType["And"] = "and";
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

    const parseAction$1 = (input) => {
        return {
            service: input.service,
            service_data: input.service_data,
            target: {
                entity_id: input.entity_id ? input.entity_id : undefined
            }
        };
    };
    const parseTimeslot$1 = (input) => {
        return {
            start: input.start,
            stop: input.stop,
            actions: computeUniqueActions(input.actions.map(parseAction$1)),
            conditions: {
                type: input.condition_type == 'and' ? TConditionLogicType.And : TConditionLogicType.Or,
                items: (input.conditions || []),
                track_changes: Boolean(input.track_conditions)
            }
        };
    };
    const parseWeekdays$1 = (input) => {
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
        return Object.assign(Object.assign({}, Object.fromEntries(Object.entries(input).filter(([key]) => !['slots', 'weekdays', ''].includes(key)))), { entries: [
                {
                    slots: input.timeslots.map(parseTimeslot$1),
                    weekdays: input.weekdays.map(parseWeekdays$1),
                }
            ] });
    };
    const computeUniqueActions = (actions) => {
        //combine entityIds of different actions
        if (actions.length == 1)
            return actions;
        if (actions.every(e => deepCompare(Object.assign(Object.assign({}, e), { target: undefined }), Object.assign(Object.assign({}, actions[0]), { target: undefined })))) {
            const entityIds = [...new Set(actions.map(e => { var _a; return (_a = e.target) === null || _a === void 0 ? void 0 : _a.entity_id; }).filter(e => e !== undefined))];
            let output = Object.assign(Object.assign({}, actions[0]), { target: { entity_id: entityIds.length ? entityIds : undefined } });
            return [output];
        }
        return actions;
    };

    const fetchItems = (hass) => hass.callWS({
        type: 'scheduler',
    })
        .then(res => {
        return res.map(convertLegacySchedule);
    });

    const addTimeOffset = (time, offsetTime) => {
        let offsetHours = offsetTime.hours || 0;
        let offsetMinutes = offsetTime.minutes || 0;
        if (offsetHours < 0 || offsetMinutes < 0) {
            offsetHours = -Math.abs(offsetHours);
            offsetMinutes = -Math.abs(offsetMinutes);
        }
        let hours = time.hours;
        let minutes = time.minutes;
        if (hours < 0 && minutes > 0)
            minutes = -minutes;
        hours += offsetHours;
        minutes += offsetMinutes;
        if (minutes >= 60 || (minutes > 0 && hours < 0 && time.mode != TimeMode.Fixed)) {
            hours = hours + 1;
            minutes -= 60;
        }
        else if (minutes <= -60) {
            hours = hours - 1;
            minutes += 60;
        }
        else if ((minutes < 0 && time.mode == TimeMode.Fixed) || (minutes < 0 && hours > 0 && time.mode != TimeMode.Fixed)) {
            hours = hours - 1;
            minutes += 60;
        }
        if (hours < 0 && time.mode == TimeMode.Fixed) {
            hours += 24;
        }
        else if (hours >= 24 && time.mode == TimeMode.Fixed) {
            hours -= 24;
        }
        return {
            mode: time.mode,
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
            return hours12 == 12 ? 12 : (hours12 + 12);
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
            slots = slots.map((e) => (Object.assign(Object.assign({}, e), { start: computeTimestamp(e.start, hass) < 0 ? '00:00:00' : e.start, stop: e.stop
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
                // For checkpoint slots (no stop), advance startTime by 1 minute rather than
                // keeping it at slot.start.  A checkpoint occupies only an instant, so the
                // next filler must start 1 minute later; otherwise the filler and the checkpoint
                // share the same start position and appear as an extra bar in the UI.
                startTime = slot.stop !== undefined
                    ? slot.stop
                    : timeToString(addTimeOffset(parseTimeString(slot.start), { minutes: 1 }));
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
        schedule = Object.assign(Object.assign({}, schedule), { entries: schedule.entries.map((entry) => (Object.assign(Object.assign({}, entry), { slots: processSlots(entry.slots) }))) });
        return schedule;
    };

    const CARD_VERSION = 'v4.0.17';
    const DEFAULT_TIME_STEP = 15;
    const DEFAULT_SORT_BY = ['relative-time', 'state'];
    const DEFAULT_PRIMARY_INFO_DISPLAY = 'default';
    const DEFAULT_SECONDARY_INFO_DISPLAY = ['relative-time', 'additional-tasks'];
    const DEFAULT_INCLUDED_DOMAINS = ['*'];
    // export const DefaultCardConfig: CardConfig = {
    //   include: [],
    //   exclude: [],
    //   discover_existing: true,
    //   title: true,
    //   show_header_toggle: false,
    //   time_step: 15,
    //   default_editor: EditorMode.Single,
    //   display_options: {
    //     primary_info: 'default',
    //     secondary_info: ['relative-time', 'additional-tasks'],
    //     icon: 'action'
    //   },
    //   sort_by: ['relative-time', 'state'],
    //   customize: {},
    //   tags: [],
    //   exclude_tags: []
    // };
    const defaultSlotConfig = {
        actions: [],
        conditions: {
            type: TConditionLogicType.Or,
            items: [],
            track_changes: false
        }
    };
    const defaultTimeSchemeConfig = {
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
        timestamps: [],
        enabled: true
    };
    const defaultSingleTimerConfig = Object.assign(Object.assign({}, defaultTimeSchemeConfig), { entries: [
            {
                weekdays: [TWeekday.Daily],
                slots: [
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '00:00:00', stop: '12:00:00' }),
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '12:00:00' }),
                    Object.assign(Object.assign({}, defaultSlotConfig), { start: '12:01:00', stop: '00:00:00' })
                ]
            }
        ] });

    function isDefined(value) {
        return value !== null && value !== undefined;
    }

    const hasKey = (obj, key) => Object.keys(obj).includes(key);
    const isTypeBoolean = (obj) => typeof obj == 'boolean';
    const isTypeNumber = (obj) => typeof obj == 'number';
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
        if (hasKey(config, 'time_step') && (!isTypeNumber(config.time_step) || Number(config.time_step) < 1 || Number(config.time_step) > 30)) {
            errors.push(`'time_step' must be a number between 1 and 30`);
        }
        if (hasKey(config, 'show_header_toggle') && !isTypeBoolean(config.show_header_toggle)) {
            errors.push(`'show_header_toggle' must be a boolean`);
        }
        if (hasKey(config, 'show_add_button') && !isTypeBoolean(config.show_add_button)) {
            errors.push(`'show_add_button' must be a boolean`);
        }
        if (hasKey(config, 'show_toggle_switches') && !isTypeBoolean(config.show_toggle_switches)) {
            errors.push(`'show_toggle_switches' must be a boolean`);
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
                if (hasKey(config.display_options, 'icon') && (!isTypeString(config.display_options.icon) || !['action', 'entity'].includes(config.display_options.icon))) {
                    errors.push(`in 'display_options': 'icon' must be a set to either 'action' or 'entity' `);
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
        else if (hasKey(config, 'customize')) {
            let customizeErrors = Object.entries(config.customize).map(([key, val]) => validateCustomConfig(key, val)).filter(isDefined);
            if (customizeErrors.length)
                errors.push(...customizeErrors);
        }
        if (hasKey(config, 'tags') && !isTypeString(config.tags) && !isTypeListOfStrings(config.tags)) {
            errors.push(`'tags' must be a string or list of strings`);
        }
        if (hasKey(config, 'exclude_tags') && !isTypeString(config.tags) && !isTypeListOfStrings(config.tags)) {
            errors.push(`'exclude_tags' must be a string or list of strings`);
        }
        if (errors.length) {
            throw new Error(`Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`);
        }
        return config;
    };
    const validateCustomConfig = (key, val) => {
        //TBD: complete validation for customize input
        if (!isTypeObject(val)) {
            return `'In customize, ${key}' must be a struct`;
        }
        if (hasKey(val, 'states')) {
            if (!isTypeListOfStrings(val.states) &&
                (!isTypeObject(val.states) ||
                    !(hasKey(val.states, 'min') &&
                        isTypeNumber(val.states.min) &&
                        hasKey(val.states, 'max') &&
                        isTypeNumber(val.states.max)))) {
                return `In 'customize' [${key}].states' must be a list of strings or a range of numbers`;
            }
        }
        return;
    };

    var services$p = {
    	generic: {
    		turn_on: "Включи",
    		turn_off: "изключи",
    		parameter_to_value: "{parameter} на {value}",
    		action_with_parameter: "{action} с {parameter}"
    	},
    	climate: {
    		set_temperature: "задай температура[ на {temperature}]",
    		set_temperature_hvac_mode_heat: "отопление[ на {temperature}]",
    		set_temperature_hvac_mode_cool: "охлаждане[ на {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "отопление/охлаждане[ на {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "отопление/охлаждане[ на {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "автоматично[ на {temperature}]",
    		set_hvac_mode: "задай режим[ на {hvac_mode}]",
    		set_preset_mode: "задай предварителна настройка[ на {preset_mode}]",
    		set_fan_mode: "задай режим на вентилатор[ на {fan_mode}]",
    		set_swing_mode: "задай режим на въртене[ на {swing_mode}]"
    	},
    	cover: {
    		close_cover: "затвори",
    		open_cover: "отвори",
    		set_cover_position: "задай позиция[ на {position}]",
    		set_cover_tilt_position: "задай позиция на наклон[ на {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "задай скорост[ на {percentage}]",
    		set_direction: "задай посока[ на {direction}]",
    		oscillate: "задай осцилация[ на {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "задай влажност[ на {humidity}]",
    		set_mode: "задай режим[ на {mode}]"
    	},
    	input_number: {
    		set_value: "задай стойност[ на {value}]"
    	},
    	input_select: {
    		select_option: "избери опция[ {option}]"
    	},
    	select: {
    		select_option: "избери опция[ {option}]"
    	},
    	light: {
    		turn_on: "включи[ с {brightness} яркост]"
    	},
    	media_player: {
    		select_source: "избери източник[ {source}]"
    	},
    	notify: {
    		send_message: "изпрати известие"
    	},
    	script: {
    		execute: "изпълни"
    	},
    	vacuum: {
    		start_pause: "старт / пауза"
    	},
    	water_heater: {
    		set_operation_mode: "задай режим[ на {operation_mode}]",
    		set_away_mode: "задай режим 'не съм вкъщи'"
    	}
    };
    var ui$p = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "дневно",
    				workdays: "работни дни",
    				weekend: "уикенд"
    			},
    			day_types_long: {
    				daily: "всеки ден",
    				workdays: "в работни дни",
    				weekend: "през уикенда"
    			},
    			days: "дни",
    			tomorrow: "утре",
    			repeated_days: "всеки {days}",
    			repeated_days_except: "всеки ден освен {excludedDays}",
    			days_range: "от {startDay} до {endDay}",
    			next_week_day: "следващ {weekday}"
    		},
    		time: {
    			absolute: "в {time}",
    			interval: "от {startTime} до {endTime}",
    			at_midnight: "в полунощ",
    			at_noon: "на обяд",
    			at_sun_event: "при {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Завърши промените",
    			description: "Графикът, който сте променили, е деактивиран. Искате ли да го активирате?"
    		},
    		confirm_delete: {
    			title: "Премахни обект?",
    			description: "Сигурни ли сте, че искате да премахнете този обект?"
    		},
    		confirm_migrate: {
    			title: "Актуализирай графика",
    			description: "Някои настройки ще бъдат загубени при тази промяна. Искате ли да продължите?"
    		},
    		weekday_picker: {
    			title: "Повтарящи се дни за графика",
    			choose: "Избери..."
    		},
    		entity_picker: {
    			title: "Изберете обекти",
    			choose: "Избери...",
    			no_results: "Няма намерени съвпадения"
    		},
    		action_picker: {
    			title: "Изберете действие",
    			show_all: "Показване на всички поддържани обекти"
    		}
    	},
    	panel: {
    		common: {
    			title: "Планировчик",
    			new_schedule: "Нов график",
    			default_name: "График #{id}"
    		},
    		overview: {
    			no_entries: "Няма елементи за показване",
    			backend_error: "Не може да се свърже с компонента за планиране. Той трябва да бъде инсталиран като интеграция, преди тази карта да може да се използва.",
    			excluded_items: "{number} изключен {if number is 1} елемент {else} елемента",
    			hide_excluded: "скрий изключените елементи",
    			additional_tasks: "{number} още {if number is 1} задача {else} задачи"
    		},
    		editor: {
    			repeated_days: "Повтарящи се дни",
    			start_time: "Начален час",
    			stop_time: "Краен час",
    			action: "Действие",
    			add_action: "Добави действие",
    			select_timeslot: "Изберете времеви слот",
    			toggle_single_mode: "В единичен режим",
    			toggle_scheme_mode: "В режим на схема",
    			validation_errors: {
    				overlapping_time: "Графикът има припокриващи се времеви слотове",
    				missing_target_entity: "Едно или повече действия нямат целеви обект",
    				missing_service_parameter: "Едно или повече действия нямат задължителна настройка",
    				missing_action: "Графикът няма действия"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Условия",
    				add_condition: "Добави условие",
    				new_condition: "Нов условие",
    				types: {
    					equal_to: "{entity} е равно на {value}",
    					unequal_to: "{entity} не е равно на {value}",
    					above: "{entity} е над {value}",
    					below: "{entity} е под {value}"
    				},
    				options: {
    					logic_and: "Всички условия трябва да са изпълнени",
    					logic_or: "Поне едно условие трябва да е изпълнено",
    					track_changes: "Преоценка при промяна на условията"
    				}
    			},
    			period: {
    				header: "Период",
    				start_date: "От",
    				end_date: "До"
    			},
    			repeat_type: "поведение след завършване",
    			tags: "Етикети"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Обекти",
    				other: "Други"
    			},
    			fields: {
    				title: {
    					heading: "Заглавие на картата",
    					options: {
    						standard: "стандартно",
    						hidden: "скрито",
    						custom: "персонализирано"
    					},
    					custom_title: "Персонализирано заглавие"
    				},
    				discover_existing: {
    					heading: "Покажи всички графици",
    					description: "Това задава параметъра 'discover existing'. Предварително създадени графици ще бъдат автоматично добавени към картата. "
    				},
    				time_step: {
    					heading: "Времева стъпка",
    					description: "Резолюция (в минути) за създаване на графици",
    					unit_minutes: "мин"
    				},
    				default_editor: {
    					heading: "Редактор по подразбиране",
    					options: {
    						single: "Режим на единичен график",
    						scheme: "Режим на времева схема"
    					}
    				},
    				sort_by: {
    					heading: "Опции за сортиране",
    					description: "Ред, в който се показват графиците в картата",
    					options: {
    						relative_time: "Оставащо време до следващото действие",
    						title: "Показано заглавие на графика",
    						state: "Покажи активните графици отгоре"
    					}
    				},
    				display_format_primary: {
    					heading: "Показана основна информация",
    					description: "Конфигурирайте кой етикет се използва за графиците в прегледа",
    					options: {
    						"default": "Име на графика",
    						entity_action: "Резюме на задачата"
    					}
    				},
    				display_format_secondary: {
    					heading: "Показана допълнителна информация",
    					description: "Конфигурирайте какви допълнителни свойства са видими в прегледа",
    					options: {
    						relative_time: "Оставащо време до следващото действие",
    						time: "Конфигуриран час за следващо действие",
    						days: "Повтарящи се дни от седмицата",
    						additional_tasks: "Брой допълнителни задачи"
    					}
    				},
    				show_header_toggle: {
    					heading: "Покажи превключвател в заглавието",
    					description: "Покажи превключвател в горната част на картата за активиране/деактивиране на всички обекти"
    				},
    				show_toggle_switches: {
    					heading: "Покажи превключватели",
    					description: "Покажи превключвател за всяко отделно задание в картата"
    				},
    				tags: {
    					heading: "Етикети",
    					description: "Използвайте етикети за разделяне на графиците между множество карти"
    				},
    				entities: {
    					button_label: "Конфигурирай включени обекти",
    					heading: "Включени обекти",
    					description: "Изберете обектите, които искате да контролирате чрез планировчика. Можете да кликнете на група, за да я отворите. Имайте предвид, че някои обекти (като сензори) могат да се използват само за условия, не и за действия.",
    					included_number: "{number}/{total} избрани"
    				}
    			}
    		}
    	}
    };
    var bg = {
    	services: services$p,
    	ui: ui$p
    };

    var bg$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: bg,
        services: services$p,
        ui: ui$p
    });

    var services$o = {
    	generic: {
    		turn_on: "Zapnout",
    		turn_off: "Vypnout",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "zavřít",
    		open_cover: "otevřít",
    		set_cover_position: "nastavit polohu[ na {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "nastavit rychlost[ na {speed}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "spustit"
    	},
    	vacuum: {
    		start_pause: "start / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "nastavit režim[ na {operation_mode}]",
    		set_away_mode: "vypnout režim"
    	}
    };
    var ui$o = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Nejprve vyberte časový úsek",
    			toggle_single_mode: "Do režimu jednoho",
    			toggle_scheme_mode: "Do režimu schématu",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Období",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "behaviour after completion",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var cs = {
    	services: services$o,
    	ui: ui$o
    };

    var cs$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: cs,
        services: services$o,
        ui: ui$o
    });

    var services$n = {
    	generic: {
    		turn_on: "Einschalten",
    		turn_off: "Ausschalten",
    		parameter_to_value: "{parameter} auf {value}",
    		action_with_parameter: "{action} mit {parameter}"
    	},
    	climate: {
    		set_temperature: "Temperatur einstellen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat: "Heizen[ auf {temperature}]",
    		set_temperature_hvac_mode_cool: "Kühlen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "Heizen/Kühlen[ auf {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "Heizen/Kühlen[ auf {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "Automatisch[ auf {temperature}]",
    		set_hvac_mode: "Modus setzen[ auf {hvac_mode}]",
    		set_preset_mode: "Voreinstellung setzen[ auf {preset_mode}]",
    		set_fan_mode: "Lüftermodus einstellen[ auf {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "Schließen",
    		open_cover: "Öffnen",
    		set_cover_position: "Position setzen[ auf {position}]",
    		set_cover_tilt_position: "Neigungsposition setzen[ auf {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "Geschwindigkeit setzen[ auf {speed}]",
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
    		turn_on: "Anschalten[ mit {brightness} Helligkeit]"
    	},
    	media_player: {
    		select_source: "Quelle[ {source}] auswählen"
    	},
    	notify: {
    		send_message: "Nachricht senden"
    	},
    	script: {
    		execute: "Ausführen"
    	},
    	vacuum: {
    		start_pause: "Start/Pause"
    	},
    	water_heater: {
    		set_operation_mode: "Modus setzen[ auf {operation_mode}]",
    		set_away_mode: "Abwesenheitsmodus setzen"
    	}
    };
    var ui$n = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "Täglich",
    				workdays: "Werktags",
    				weekend: "Wochenende"
    			},
    			day_types_long: {
    				daily: "Jeden Tag",
    				workdays: "An Werktagen",
    				weekend: "Am Wochenende"
    			},
    			days: "Tage",
    			tomorrow: "Morgen",
    			repeated_days: "Jeden {days}",
    			repeated_days_except: "Täglich außer {excludedDays}",
    			days_range: "von {startDay} bis {endDay}",
    			next_week_day: "nächsten {weekday}"
    		},
    		time: {
    			absolute: "um {time}",
    			interval: "von {startTime} bis {endTime}",
    			at_midnight: "um Mitternacht",
    			at_noon: "zum Mittag",
    			at_sun_event: "beim {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Modifikationen beenden",
    			description: "Der geänderte Zeitplan ist derzeit deaktiviert, soll er aktiviert werden?"
    		},
    		confirm_delete: {
    			title: "Entität entfernen?",
    			description: "Bist du dir sicher, dass du diese Entität löschen möchtest?"
    		},
    		confirm_migrate: {
    			title: "Zeitplan ändern",
    			description: "Einige Einstellungen gehen durch diese Änderung verloren. Möchtest du fortfahren?"
    		},
    		weekday_picker: {
    			title: "Wiederholungen für den Zeitplan",
    			choose: "Auswahl..."
    		},
    		entity_picker: {
    			title: "Entitäten auswählen",
    			choose: "Auswahl...",
    			no_results: "Keine passenden Elemente gefunden"
    		},
    		action_picker: {
    			title: "Aktion auswählen",
    			show_all: "Alle unterstützten Entitäten anzeigen"
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
    			backend_error: "Es konnte keine Verbindung mit der Scheduler-Komponente hergestellt werden. Es muss als Integration installiert werden, bevor diese Karte verwendet werden kann.",
    			excluded_items: "{number} {if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",
    			hide_excluded: "Verstecke ausgeschlossene Einträge",
    			additional_tasks: "{number} weitere {if number is 1} Aufgabe {else} Aufgaben"
    		},
    		editor: {
    			repeated_days: "Wiederholen",
    			start_time: "Startzeit",
    			stop_time: "Endzeit",
    			action: "Aktion",
    			add_action: "Aktion hinzufügen",
    			select_timeslot: "Wähle ein Zeitfenster aus",
    			toggle_single_mode: "Zum Einzelmodus",
    			toggle_scheme_mode: "Zum Schemamodus",
    			validation_errors: {
    				overlapping_time: "Der Zeitplan weist Überschneidungen auf.",
    				missing_target_entity: "Bei einer oder mehreren Aktionen fehlt eine Zielentität.",
    				missing_service_parameter: "Bei einer oder mehreren Aktionen fehlt eine erforderliche Einstellung.",
    				missing_action: "Zeitplan enthält keine Aktionen"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Bedingungen",
    				add_condition: "Bedingung hinzufügen",
    				new_condition: "Neuer Zustand",
    				types: {
    					equal_to: "{entity} ist {value}",
    					unequal_to: "{entity} ist nicht {value}",
    					above: "{entity} ist über {value}",
    					below: "{entity} ist unter {value}"
    				},
    				options: {
    					logic_and: "Alle Bedingungen müssen zutreffen.",
    					logic_or: "Eine Bedingung muss zutreffen.",
    					track_changes: "Erneut prüfen wenn sich die Zustände ändern"
    				}
    			},
    			period: {
    				header: "Zeitraum",
    				start_date: "Von",
    				end_date: "Bis"
    			},
    			repeat_type: "Verhalten nach Abschluss",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var de = {
    	services: services$n,
    	ui: ui$n
    };

    var de$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: de,
        services: services$n,
        ui: ui$n
    });

    var services$m = {
    	generic: {
    		turn_on: "Ενεργοποίηση",
    		turn_off: "Απενεργοποίηση",
    		parameter_to_value: "{parameter} σε {value}",
    		action_with_parameter: "{action} με {parameter}"
    	},
    	climate: {
    		set_temperature: "ορισμός θερμοκρασίας[ σε {temperature}]",
    		set_temperature_hvac_mode_heat: "θέρμανση[ σε {temperature}]",
    		set_temperature_hvac_mode_cool: "ψύξη[ σε {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "θέρμανση/ψύξη[ σε {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "θέρμανση/ψύξη[ σε {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ σε {temperature}]",
    		set_hvac_mode: "ορισμός λειτουργίας[ σε {hvac_mode}]",
    		set_preset_mode: "ορισμός προκαθορισμένης ρύθμισης[ σε {preset_mode}]",
    		set_fan_mode: "όρισμός ανεμιστήρα[ σε {fan_mode}]",
    		set_swing_mode: "ορισμός κατεύθυνσης[ σε {swing_mode}]"
    	},
    	cover: {
    		close_cover: "κλείσιμο",
    		open_cover: "άνοιγμα",
    		set_cover_position: "ορισμός θέσησ[ σε {position}]",
    		set_cover_tilt_position: "ορισμός κλίσης[ σε {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "ορισμός ταχύτητας[ σε {percentage}]",
    		set_direction: "ορισμός κατεύθυνσης[ σε {direction}]",
    		oscillate: "ορισμός ταλάντωσης[ σε {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "ορισμός υγρασίας[ σε {humidity}]",
    		set_mode: "ορισμός λειτουργίας[ σε {mode}]"
    	},
    	input_number: {
    		set_value: "ορισμός τιμής[ σε {value}]"
    	},
    	input_select: {
    		select_option: "επιλογή παραμέτρου[ {option}]"
    	},
    	select: {
    		select_option: "επιλογή παραμέτρου[ {option}]"
    	},
    	light: {
    		turn_on: "άναμα[ με φωτεινότητα {brightness} ]"
    	},
    	media_player: {
    		select_source: "επιλογή πηγής[ {source}]"
    	},
    	notify: {
    		send_message: "αποστολή ειδοποίησης"
    	},
    	script: {
    		execute: "εκτέλεση"
    	},
    	vacuum: {
    		start_pause: "έναρξη / παύση"
    	},
    	water_heater: {
    		set_operation_mode: "ορισμός λειτουργίας[ σε {operation_mode}]",
    		set_away_mode: "ορισμός λειτουργίας απουσίας"
    	}
    };
    var ui$m = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "ημερήσια",
    				workdays: "εργάσιμες",
    				weekend: "σαββατοκύριακο"
    			},
    			day_types_long: {
    				daily: "κάθε μέρα",
    				workdays: "τις καθημερινές",
    				weekend: "το σαββατοκύριακο"
    			},
    			days: "ημέρες",
    			tomorrow: "αύριο",
    			repeated_days: "κάθε {days}",
    			repeated_days_except: "κάθε μέρα εκτός {excludedDays}",
    			days_range: "από {startDay} έως {endDay}",
    			next_week_day: "επόμενη/-ο {weekday}"
    		},
    		time: {
    			absolute: "στις {time}",
    			interval: "από {startTime} ως {endTime}",
    			at_midnight: "τα μεσάνυχτα",
    			at_noon: "το μεσημέρι",
    			at_sun_event: "το {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Ολοκλήρωση τροποποιήσεων",
    			description: "Το πρόγραμμα που τροποποιήθηκε είναι απενεργοποιημένο, επιθυμείτε να το ενεργοποιήσετε;"
    		},
    		confirm_delete: {
    			title: "Αφαίρεση οντότητας",
    			description: "Είστε σίγουροι ότι θέλετε να αφαιρεθεί αυτή η οντότητα;"
    		},
    		confirm_migrate: {
    			title: "Ενημέρωση προγράμματος",
    			description: "Κάποιες ρυθμίσεις θα χαθούν από αυτή την αλλαγή. Θέλετε να συνεχίσετε;"
    		},
    		weekday_picker: {
    			title: "Επαναλαμβανόμενες ημέρες για το πρόγραμμα",
    			choose: "Επιλογή ημερών..."
    		},
    		entity_picker: {
    			title: "Επιλογή οντοτήτων",
    			choose: "Επιλογή...",
    			no_results: "Δεν βρέθηκε οντότητα"
    		},
    		action_picker: {
    			title: "Επιλογή ενέργειας",
    			show_all: "Εμφάνιση όλων των υποστηριζόμενων οντοτήτων"
    		}
    	},
    	panel: {
    		common: {
    			title: "Χρονοπρογραμματισμός",
    			new_schedule: "Νέο Πρόγραμμα",
    			default_name: "Πρόγραμμα #{id}"
    		},
    		overview: {
    			no_entries: "Δεν βρέθηκαν καταχωρήσεις προς προβολή",
    			backend_error: "Δεν είναι δυνατή η σύνδεη με το scheduler component. Πρέπει να εγκατασταθεί σαν integration πριν την χρήση αυτής της κάρτας.",
    			excluded_items: "{number} {if number is 1} εξαιρούμενο αντικείμενο {else} εξαιρούμενα αντικείμενα",
    			hide_excluded: "απόκρυψη εξαιρούμενων αντικειμένων",
    			additional_tasks: "{number} επιπλέον {if number is 1} εργασία {else} εργασίες"
    		},
    		editor: {
    			repeated_days: "Επαναλαμβανόμενες ημέρες",
    			start_time: "Ώρα έναρξης",
    			stop_time: "Ώρα ολοκλήρωσης",
    			action: "Ενέργεια",
    			add_action: "Προσθήκη ενέργειας",
    			select_timeslot: "Επιλογή μιας ώρας",
    			toggle_single_mode: "Μεμονωμένη λειτουργία",
    			toggle_scheme_mode: "Λειτουργία προγραμματισμού",
    			validation_errors: {
    				overlapping_time: "Το πρόγραμμα παρουσιάζει αλληλοεπικαλύψεις ώρας",
    				missing_target_entity: "Μια ή περισσότερες ενέργειες δεν διαθέτουν οντότητα - στόχο",
    				missing_service_parameter: "Μια ή περισσότερες ενέργειες δεν διαθέτουν μια απαιτούμενη ρύθμιση",
    				missing_action: "Το πρόγραμμα δεν διαθέτει ενέργειες"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Συνθήκες",
    				add_condition: "Προσθήκη συνθήκης",
    				new_condition: "Νέα συνθήκη",
    				types: {
    					equal_to: "{entity} ισούται με {value}",
    					unequal_to: "{entity} δεν ισούται με {value}",
    					above: "{entity} είναι περισσότερο από {value}",
    					below: "{entity} είναι λιγότερο από {value}"
    				},
    				options: {
    					logic_and: "Όλες οι συνθήκες πρέπει να αληθεύουν",
    					logic_or: "Οποιαδήποτε συνθήκη πρέπει να αληθεύει",
    					track_changes: "Επαναξιολόγηση όταν οι συνθήκες αλλάξουν"
    				}
    			},
    			period: {
    				header: "Περίοδος",
    				start_date: "Από",
    				end_date: "Έως"
    			},
    			repeat_type: "συμπεριφορά μετά την ολοκλήρωση",
    			tags: "Tags"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Οντότητες",
    				other: "Λοιπά"
    			},
    			fields: {
    				title: {
    					heading: "Τίτλος της κάρτας",
    					options: {
    						standard: "τυπικό",
    						hidden: "κρυφό",
    						custom: "προσαρμοσμένο"
    					},
    					custom_title: "Προσαρμοσμενος τίτλος"
    				},
    				discover_existing: {
    					heading: "Προβολή όλων των προγραμμάτων",
    					description: "Αυτό ρυθμίζει την παράμμετρο 'ανακάλυψη υπαρχόντων'. Τα ήδη δημιουργημένα προγράμματα θα προστεθούν αυτόματα στην κάρτα. "
    				},
    				time_step: {
    					heading: "Βήμα χρόνου",
    					description: "Ανάλυση (σε λεπτά) για τη δημιουργία προγραμμάτων",
    					unit_minutes: "λεπτά"
    				},
    				default_editor: {
    					heading: "Προεπιλεγμένος επεξεργαστής χρόνου",
    					options: {
    						single: "Λειτουργία μονής χρονικής περιόδου",
    						scheme: "Λειτουργία χρονικού σχήματος"
    					}
    				},
    				sort_by: {
    					heading: "Επιλογές ταξινόμησης",
    					description: "Σειρά με την οποία εμφανίζονται τα προγράμματα στην κάρτα",
    					options: {
    						relative_time: "Υπολειπόμενος χρόνος έως την επόμενη ενέργεια",
    						title: "Εμφανιζόμενος τίτλος του προγράμματος",
    						state: "Εμφάνιση των ενεργών προγραμμάτων στην κορυφή"
    					}
    				},
    				display_format_primary: {
    					heading: "Προβαλλόμενη κύρια πληροφορία",
    					description: "Ρυθμίστε ποια ετικέτα χρησιμοποιείται για τα προγράμματα στην επισκόπηση",
    					options: {
    						"default": "Όνομα προγράμματος",
    						entity_action: "Σύνοψη ενέργειας"
    					}
    				},
    				display_format_secondary: {
    					heading: "Προβαλλόμενη δευτερεύουσα πληροφορία",
    					description: "Ρυθμίστε ποιες πρόσθετες ιδιότητες εμφανίζονται στην επισκόπηση",
    					options: {
    						relative_time: "Υπολειπόμενος χρόνος μέχρι την επόμενη ενέργεια",
    						time: "Προγραμματισμένη ώρα για την επόμενη ενέργεια",
    						days: "Επαναλαμβανόμενες ημέρες της εβδομάδας",
    						additional_tasks: "Αριθμός πρόσθετων εργασιών"
    					}
    				},
    				show_header_toggle: {
    					heading: "Εμφάνιση διακόπτη κεφαλίδας",
    					description: "Εμφάνιση διακόπτη στο επάνω μέρος της κάρτας για ενεργοποίηση/απενεργοποίηση όλων των οντοτήτων"
    				},
    				show_toggle_switches: {
    					heading: "Εμφάνιση διακοπτών εναλλαγής",
    					description: "Εμφάνιση διακόπτη εναλλαγής για κάθε μεμονωμένο πρόγραμμα στην κάρτα"
    				},
    				tags: {
    					heading: "Ετικέτες",
    					description: "Χρησιμοποιήστε ετικέτες για να χωρίσετε τα προγράμματα μεταξύ πολλών καρτών"
    				},
    				entities: {
    					button_label: "Ρύθμιση συμπεριλαμβανόμενων οντοτήτων",
    					heading: "Συμπεριλαμβανόμενες οντότητες",
    					description: "Επιλέξτε τις οντότητες που θέλετε να ελέγχετε μέσω του χρονοπρογραμματιστή. Μπορείτε να κάνετε κλικ σε μια ομάδα για να την ανοίξετε. Λάβετε υπόψη ότι ορισμένες οντότητες (όπως αισθητήρες) μπορούν να χρησιμοποιηθούν μόνο για συνθήκες και όχι για ενέργειες.",
    					included_number: "{number}/{total} επιλεγμένες"
    				}
    			}
    		}
    	}
    };
    var el = {
    	services: services$m,
    	ui: ui$m
    };

    var el$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: el,
        services: services$m,
        ui: ui$m
    });

    var services$l = {
    	generic: {
    		turn_on: "Turn on",
    		turn_off: "Turn off",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "close",
    		open_cover: "open",
    		set_cover_position: "set position[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "set speed[ to {percentage}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "execute"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "set mode[ to {operation_mode}]",
    		set_away_mode: "set away mode"
    	}
    };
    var ui$l = {
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
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    			select_timeslot: "Select a timeslot",
    			toggle_single_mode: "To single mode",
    			toggle_scheme_mode: "To scheme mode",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Period",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "behaviour after completion",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var en = {
    	services: services$l,
    	ui: ui$l
    };

    var en$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: en,
        services: services$l,
        ui: ui$l
    });

    var services$k = {
    	generic: {
    		turn_on: "Encender",
    		turn_off: "Apagar",
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
    		set_fan_mode: "establecer ventilador[ a {fan_mode}]",
    		set_swing_mode: "establecer oscilación[ a {swing_mode}]"
    	},
    	cover: {
    		close_cover: "cerrado",
    		open_cover: "abierto",
    		set_cover_position: "establecer posición[ a {position}]",
    		set_cover_tilt_position: "establecer inclinación[ a {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "establecer velocidad[ a {speed}]",
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
    		select_option: "seleccionar opción[ a {option}]"
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
    		send_message: "enviar notificación"
    	},
    	script: {
    		execute: "ejecutar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "establecer modo[ a {operation_mode}]",
    		set_away_mode: "establecer modo fuera de casa"
    	}
    };
    var ui$k = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "todos los días",
    				workdays: "días hábiles",
    				weekend: "fin de semana"
    			},
    			day_types_long: {
    				daily: "todos los días",
    				workdays: "días hábiles",
    				weekend: "fin de semana"
    			},
    			days: "días",
    			tomorrow: "mañana",
    			repeated_days: "cada {days}",
    			repeated_days_except: "cada dia excepto {excludedDays}",
    			days_range: "de {startDay} a {endDay}",
    			next_week_day: "próximo {weekday}"
    		},
    		time: {
    			absolute: "a la(s) {time}",
    			interval: "desde la(s) {startTime} hasta la(s) {endTime}",
    			at_midnight: "a la medianoche",
    			at_noon: "al mediodía",
    			at_sun_event: "al {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Completar modificaciones",
    			description: "El horario que ha modificado está actualmente deshabilitado, ¿Desea habilitarlo?"
    		},
    		confirm_delete: {
    			title: "¿Eliminar entidad?",
    			description: "¿Está seguro de que deseas eliminar esta entidad?"
    		},
    		confirm_migrate: {
    			title: "Modificar horario",
    			description: "Algunas configuraciones se perderán con este cambio. ¿Desea proceder?"
    		},
    		weekday_picker: {
    			title: "Días repetidos para el horario",
    			choose: "Elegir..."
    		},
    		entity_picker: {
    			title: "Elegir entidades",
    			choose: "Elegir...",
    			no_results: "No se encontraron artículos coincidentes"
    		},
    		action_picker: {
    			title: "Elija Acción",
    			show_all: "Mostrar todas las entidades admitidas"
    		}
    	},
    	panel: {
    		common: {
    			title: "Planificador",
    			new_schedule: "Nuevo horario",
    			default_name: "Horario #{id}"
    		},
    		overview: {
    			no_entries: "No hay ningún elemento que mostrar",
    			backend_error: "Fallo de conexión con el componente planificador (Scheduler component). Debe ser instalado como integración antes de poder usar este panel.",
    			excluded_items: "{number} {if number is 1} elemento excluido {else} elementos excluidos",
    			hide_excluded: "ocultar elementos excluidos",
    			additional_tasks: "{number} {if number is 1} tarea adicional {else} tareas adicionales"
    		},
    		editor: {
    			repeated_days: "Días repetidos",
    			start_time: "Inicio",
    			stop_time: "Finalización",
    			action: "Acción",
    			add_action: "Agregar acción",
    			select_timeslot: "Seleccione un bloque de tiempo",
    			toggle_single_mode: "Al modo simple",
    			toggle_scheme_mode: "Al modo esquema",
    			validation_errors: {
    				overlapping_time: "El esquema tiene bloques de tiempo sobrepuestos",
    				missing_target_entity: "Una o más acciones carecen de una entidad asociada",
    				missing_service_parameter: "Una o más acciones carecen de una configuración requerida",
    				missing_action: "El horario no tiene acciones"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Condiciones",
    				add_condition: "Agregar condición",
    				new_condition: "Nueva condición",
    				types: {
    					equal_to: "{entity} es igual a {value}",
    					unequal_to: "{entity} es diferente a {value}",
    					above: "{entity} es mayor que {value}",
    					below: "{entity} es menor que {value}"
    				},
    				options: {
    					logic_and: "Todas las condiciones deben ser válidas",
    					logic_or: "Cualquier condición debe ser válida",
    					track_changes: "Reevaluar si una condición cambia"
    				}
    			},
    			period: {
    				header: "Período",
    				start_date: "De",
    				end_date: "A"
    			},
    			repeat_type: "comportamiento despues de finalizar ",
    			tags: "Etiquetas"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Entidades",
    				other: "Otros"
    			},
    			fields: {
    				title: {
    					heading: "Títujo de la tarjeta",
    					options: {
    						standard: "estándar",
    						hidden: "oculta",
    						custom: "personalizada"
    					},
    					custom_title: "Título personalizado"
    				},
    				discover_existing: {
    					heading: "Mostrar todos los horarios",
    					description: "Esto ajustará el parámetro 'descubrir existentes (discover existing)'. Los horarios creados anteriormente deberán de ser agregados automáticamente a la tarjeta."
    				},
    				time_step: {
    					heading: "Paso de tiempo",
    					description: "Resolución (en minutos) para la creación de horarios.",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Editor de tiempo por defecto",
    					options: {
    						single: "Modo de horario sencillo",
    						scheme: "Modo de esquema de tiempo"
    					}
    				},
    				sort_by: {
    					heading: "Opciones de clasificación",
    					description: "Orden en que los horarios aparecen en la tarjeta",
    					options: {
    						relative_time: "Tiempo restante hasta la siguiente acción",
    						title: "Título mostrado del horario",
    						state: "Mostrar los horarios activos primero"
    					}
    				},
    				display_format_primary: {
    					heading: "Mostrar información primaria",
    					description: "Configura que etiqueta se utiliza para los horarios en la vista principal",
    					options: {
    						"default": "Nombre del horario",
    						entity_action: "Resumen de la tarea"
    					}
    				},
    				display_format_secondary: {
    					heading: "Mostrar información secundaria",
    					description: "Configura que propiedades adicionales son visibles en la vista principal",
    					options: {
    						relative_time: "Tiempo restante hasta la siguiente acción",
    						time: "Tiempo configurado para la siguiente acción",
    						days: "Días repetidos de la semana",
    						additional_tasks: "Número de tareas adicionales"
    					}
    				},
    				show_header_toggle: {
    					heading: "Mostrar el interruptor del encabezado",
    					description: "Muestra el interruptor en la parte alta de la tarjeta para habilitar/desabilitar todas las entidades Show toggle switch at the top of the card for enabling/disabling all entities"
    				},
    				show_toggle_switches: {
    					heading: "Mostrar interruptores",
    					description: "Mostrar el interruptor para cada programación individual en la tarjeta"
    				},
    				tags: {
    					heading: "Etiquetas",
    					description: "Use etiquetas para dividir los horarios entre múltiples tarjetas"
    				},
    				entities: {
    					button_label: "Configurar entidades incluidas",
    					heading: "Entidades incluidas",
    					description: "Seleccione las entidades que desea controlar usando el planificador. Puede hacer click en un grupo para abrirlo. Note que algunas entidades (como los sensores) solo pueden ser usados para condiciones, no para acciones.",
    					included_number: "{number}/{total} seleccionados"
    				}
    			}
    		}
    	}
    };
    var es = {
    	services: services$k,
    	ui: ui$k
    };

    var es$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: es,
        services: services$k,
        ui: ui$k
    });

    var services$j = {
    	generic: {
    		turn_on: "Lülita sisse",
    		turn_off: "Lülita välja",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "sulge",
    		open_cover: "ava",
    		set_cover_position: "sea asendisse[{position}]",
    		set_cover_tilt_position: "sea ribide kalle [ asendisse {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "vali kiirus[ @ {speed}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "käivita"
    	},
    	vacuum: {
    		start_pause: "alusta/ootele"
    	},
    	water_heater: {
    		set_operation_mode: "vali režiim [{operation_mode}]",
    		set_away_mode: "kodust ära"
    	}
    };
    var ui$j = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Alustuseks vali ajavahemik",
    			toggle_single_mode: "Üksikrežiimile",
    			toggle_scheme_mode: "Skeemirežiimile",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Periood",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "toiming peale käivitumist",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var et = {
    	services: services$j,
    	ui: ui$j
    };

    var et$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: et,
        services: services$j,
        ui: ui$j
    });

    var services$i = {
    	generic: {
    		turn_on: "Laita päälle",
    		turn_off: "Sammuta",
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
    		set_fan_mode: "aseta tuuletus[ {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "sulje",
    		open_cover: "avaa",
    		set_cover_position: "aseta sijainniksi[ {position}]",
    		set_cover_tilt_position: "aseta kallistus[ {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "aseta nopeus[ {speed}]",
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
    		send_message: "lähetä ilmoitus"
    	},
    	script: {
    		execute: "suorita"
    	},
    	vacuum: {
    		start_pause: "aloita / keskeytä"
    	},
    	water_heater: {
    		set_operation_mode: "aseta tilaksi[ {operation_mode}]",
    		set_away_mode: "aseta poissa-tila"
    	}
    };
    var ui$i = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Valitse aikaikkuna ensin",
    			toggle_single_mode: "To single mode",
    			toggle_scheme_mode: "To scheme mode",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Ajanjakso",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "toiminta tapahtuman jälkeen",
    			tags: "Tags"
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
    					description: "Ajastusväli minuutteina ajastusten luontiin",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Yksittäistilaan",
    						scheme: "Kaaviotilaan"
    					}
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
    				show_toggle_switches: {
    					heading: "Näytä kytkimet",
    					description: "Näytä kytkin jokaiselle yksittäiselle ajastukselle kortissa"
    				},
    				tags: {
    					heading: "Tunniste",
    					description: "Käytä tunnisteita ajastusten jakamiseen korttien välillä"
    				},
    				entities: {
    					button_label: "Sisällytettyjen entiteettien määrittäminen",
    					heading: "Ajastettavat kohteet",
    					description: "Valitse kohteet, joille haluat luoda ajastuksia. Voit klikata ryhmään laajentaaksesi sen. Huom: joitain kohteita voi käyttää vain ehtoina (esim. sensorit), ei toimintoihin",
    					included_number: "{number} / {total} valittu"
    				}
    			}
    		}
    	}
    };
    var fi = {
    	services: services$i,
    	ui: ui$i
    };

    var fi$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: fi,
        services: services$i,
        ui: ui$i
    });

    var services$h = {
    	generic: {
    		turn_on: "Allumer",
    		turn_off: "Éteindre",
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
    		set_fan_mode: "ajuster le mode de ventilation[ à {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "fermer",
    		open_cover: "ouvrir",
    		set_cover_position: "ajuster la position[ à {position}]",
    		set_cover_tilt_position: "régler les volets[ à {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "ajuster la vitesse[ à {speed}]",
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
    		send_message: "envoyer une notification"
    	},
    	script: {
    		execute: "exécuter"
    	},
    	vacuum: {
    		start_pause: "démarrer / pause"
    	},
    	water_heater: {
    		set_operation_mode: "ajuster le mode[ à {operation_mode}]",
    		set_away_mode: "choisir le mode absent"
    	}
    };
    var ui$h = {
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
    			title: "Compléter les modifications",
    			description: "Le planning qui a été modifié est actuellement désactivé, doit-il être activé ?"
    		},
    		confirm_delete: {
    			title: "Supprimer l'entité ?",
    			description: "Voulez-vous vraiment supprimer cette entité ?"
    		},
    		confirm_migrate: {
    			title: "Modifier l'horaire",
    			description: "Certains paramètres seront perdus par ce changement. Voulez-vous poursuivre?"
    		},
    		weekday_picker: {
    			title: "Jours de répétition",
    			choose: "Choisir les jours..."
    		},
    		entity_picker: {
    			title: "Choisir les entités",
    			choose: "Choisir...",
    			no_results: "Aucune entité trouvée"
    		},
    		action_picker: {
    			title: "Choisir une action",
    			show_all: "Afficher toutes les entités prises en charge"
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
    		editor: {
    			repeated_days: "Jours de répétition",
    			start_time: "Heure de début",
    			stop_time: "Heure de fin",
    			action: "Action",
    			add_action: "Ajouter une action",
    			select_timeslot: "Choisir d'abord une plage horaire",
    			toggle_single_mode: "Vers mode simple",
    			toggle_scheme_mode: "Vers mode schéma",
    			validation_errors: {
    				overlapping_time: "Certaines plages horaires se chevauchent",
    				missing_target_entity: "Certaines actions n'ont pas d'entité sélectionnée",
    				missing_service_parameter: "Certaines actions ne sont pas totalement configurées",
    				missing_action: "Le planning n'a aucune action définie"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Ajouter une condition",
    				new_condition: "Nouvelle condition",
    				types: {
    					equal_to: "{entity} est égal à {value}",
    					unequal_to: "{entity} n'est pas égal à {value}",
    					above: "{entity} est supérieur à {value}",
    					below: "{entity} est inférieur à {value}"
    				},
    				options: {
    					logic_and: "Toutes les conditions doivent être valides",
    					logic_or: "Au moins une condition doit être valide",
    					track_changes: "Ré-évaluer lorsque la condition change"
    				}
    			},
    			period: {
    				header: "Période",
    				start_date: "Du",
    				end_date: "Au"
    			},
    			repeat_type: "Comportement après l'achèvement",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var fr = {
    	services: services$h,
    	ui: ui$h
    };

    var fr$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: fr,
        services: services$h,
        ui: ui$h
    });

    var services$g = {
    	generic: {
    		turn_on: "הפעלה",
    		turn_off: "כיבוי",
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
    		set_fan_mode: "הגדר מצב מאוורר[ ל {fan_mode}]",
    		set_swing_mode: "הגדר מצב תנודת תריס[ ל {swing_mode}]"
    	},
    	cover: {
    		close_cover: "סגירה",
    		open_cover: "פתיחה",
    		set_cover_position: "קבע מיקום[ ל {position}]",
    		set_cover_tilt_position: "קבע הטיה[ ל {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "קבע מהירות[ ל {speed}]",
    		set_direction: "קבע כיוון[ ל {direction}]",
    		oscillate: "קבע תנודת תריס[ ל {oscillate}]"
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
    		select_source: "בחר מקור[ {source}]"
    	},
    	notify: {
    		send_message: "שלח התראה"
    	},
    	script: {
    		execute: "בצע"
    	},
    	vacuum: {
    		start_pause: "התחל / הפסק"
    	},
    	water_heater: {
    		set_operation_mode: "קבע מצב עבודה[ ל {operation_mode}]",
    		set_away_mode: "קבע מצב מוץ לבית"
    	}
    };
    var ui$g = {
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
    		},
    		weekday_picker: {
    			title: "ימים לחזרה עבור לוח זמנים",
    			choose: "בחר..."
    		},
    		entity_picker: {
    			title: "בחר ישויות",
    			choose: "בחר...",
    			no_results: "לא נמצאו פריטים תואמים"
    		},
    		action_picker: {
    			title: "בחר פעולה",
    			show_all: "הצג את כל הישויות הנתמכות"
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
    		editor: {
    			repeated_days: "ימים לחזרה",
    			start_time: "זמן התחלה",
    			stop_time: "זמן סיום",
    			action: "פעולה",
    			add_action: "הוספת פעולה",
    			select_timeslot: "בחר משבצת זמן קודם",
    			toggle_single_mode: "למצב פשוט",
    			toggle_scheme_mode: "למצב דיאגרמה",
    			validation_errors: {
    				overlapping_time: "לוח הזמנים כולל משבצות זמן חופפות",
    				missing_target_entity: "אחת או יותר מהפעולות חסרות ישות יעד",
    				missing_service_parameter: "אחת או יותר מהפעולות חסרות הגדרה נדרשת",
    				missing_action: "לוח הזמנים אינו כולל פעולות"
    			}
    		},
    		options: {
    			conditions: {
    				header: "תנאים",
    				add_condition: "הוספת תנאי",
    				new_condition: "תנאי חדש",
    				types: {
    					equal_to: "{entity} שווה ל-{value}",
    					unequal_to: "{entity} לא שווה ל-{value}",
    					above: "{entity} מעל {value}",
    					below: "{entity} מתחת {value}"
    				},
    				options: {
    					logic_and: "כל התנאים חייבים להיות נכונים",
    					logic_or: "כל תנאי חייב להיות נכון",
    					track_changes: "הערכה מחדש כאשר התנאים משתנים"
    				}
    			},
    			period: {
    				header: "פרק זמן",
    				start_date: "מ",
    				end_date: "ל"
    			},
    			repeat_type: "התנהגות לאחר הפעלה",
    			tags: "תגים"
    		},
    		card_editor: {
    			tabs: {
    				entities: "ישויות",
    				other: "אחר"
    			},
    			fields: {
    				title: {
    					heading: "כותרת הכרטיס",
    					options: {
    						standard: "רגילה",
    						hidden: "מוסתרת",
    						custom: "מותאמת אישית"
    					},
    					custom_title: "כותרת מותאמת אישית"
    				},
    				discover_existing: {
    					heading: "הצג את כל לוחות הזמנים",
    					description: "הגדרה זו קובעת את הפרמטר 'discover existing'. לוחות זמנים שנוצרו בעבר יתווספו אוטומטית לכרטיס"
    				},
    				time_step: {
    					heading: "מרווח זמן",
    					description: "רזולוציה (בדקות) ליצירת לוחות זמנים",
    					unit_minutes: "דק'"
    				},
    				default_editor: {
    					heading: "עורך זמן ברירת מחדל",
    					options: {
    						single: "מצב לוח זמנים בודד",
    						scheme: "מצב תבנית זמנים"
    					}
    				},
    				sort_by: {
    					heading: "אפשרויות מיון",
    					description: "סדר הופעת לוחות הזמנים בכרטיס",
    					options: {
    						relative_time: "זמן שנותר עד הפעולה הבאה",
    						title: "כותרת לוח הזמנים המוצגת",
    						state: "הצג לוחות זמנים פעילים בראש"
    					}
    				},
    				display_format_primary: {
    					heading: "מידע ראשי מוצג",
    					description: "הגדר איזו תווית תשמש עבור לוחות הזמנים בסקירה הכללית",
    					options: {
    						"default": "שם לוח הזמנים",
    						entity_action: "סיכום המשימה"
    					}
    				},
    				display_format_secondary: {
    					heading: "מידע משני מוצג",
    					description: "הגדר אילו מאפיינים נוספים יהיו גלויים בסקירה הכללית",
    					options: {
    						relative_time: "זמן שנותר עד הפעולה הבאה",
    						time: "זמן מוגדר לפעולה הבאה",
    						days: "ימים חוזרים בשבוע",
    						additional_tasks: "מספר משימות נוספות"
    					}
    				},
    				show_header_toggle: {
    					heading: "הצג מתג בכותרת",
    					description: "הצג מתג הפעלה/כיבוי בראש הכרטיס להפעלה/השבתה של כל הישויות"
    				},
    				show_toggle_switches: {
    					heading: "הצג מתגים",
    					description: "הצג מתג עבור כל לוח זמנים בודד בכרטיס"
    				},
    				tags: {
    					heading: "תגיות",
    					description: "השתמש בתגיות כדי לחלק לוחות זמנים בין כרטיסים שונים"
    				},
    				entities: {
    					button_label: "הגדר ישויות כלולות",
    					heading: "ישויות כלולות",
    					description: "בחר את הישויות שברצונך לשלוט בהן באמצעות המתזמן. ניתן ללחוץ על קבוצה כדי לפתוח אותה. שים לב שחלק מהישויות (כמו חיישנים) יכולות לשמש רק לתנאים, ולא לפעולות.",
    					included_number: "{number}/{total} נבחרו"
    				}
    			}
    		}
    	}
    };
    var he = {
    	services: services$g,
    	ui: ui$g
    };

    var he$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: he,
        services: services$g,
        ui: ui$g
    });

    var services$f = {
    	generic: {
    		turn_on: "Bekapcsolás",
    		turn_off: "Kikapcsolás",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "zárás",
    		open_cover: "nyitás",
    		set_cover_position: "változtass pozíciót[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "set speed[ to {speed}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "kezdés"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "mód beállítása[ to {operation_mode}]",
    		set_away_mode: "set away mode"
    	}
    };
    var ui$f = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Select a timeslot",
    			toggle_single_mode: "Egyszerű módba",
    			toggle_scheme_mode: "Diagram módba",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Időszak",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "behaviour after completion",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var hu = {
    	services: services$f,
    	ui: ui$f
    };

    var hu$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: hu,
        services: services$f,
        ui: ui$f
    });

    var services$e = {
    	generic: {
    		turn_on: "Accendi",
    		turn_off: "Spegni",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "chiuso",
    		open_cover: "aperto",
    		set_cover_position: "imposta posizione[ su {position}]",
    		set_cover_tilt_position: "imposta inclinazione[ su {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "imposta velocità[ a {speed}]",
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
    		send_message: "invia notifica"
    	},
    	script: {
    		execute: "esegui"
    	},
    	vacuum: {
    		start_pause: "avvia / pausa"
    	},
    	water_heater: {
    		set_operation_mode: "imposta modalità[ a {operation_mode}]",
    		set_away_mode: "imposta fuori casa"
    	}
    };
    var ui$e = {
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
    		},
    		weekday_picker: {
    			title: "Giorni ripetuti per la pianificazione",
    			choose: "Scegli..."
    		},
    		entity_picker: {
    			title: "Scegli entità",
    			choose: "Scegli...",
    			no_results: "Nessun elemento corrispondente trovato"
    		},
    		action_picker: {
    			title: "Scegli azione",
    			show_all: "Mostra tutte le entità supportate"
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
    		editor: {
    			repeated_days: "Giorni ripetuti",
    			start_time: "Ora di inizio",
    			stop_time: "Ora di fine",
    			action: "Azione",
    			add_action: "Aggiungi azione",
    			select_timeslot: "Seleziona una fascia oraria",
    			toggle_single_mode: "Alla modo semplice",
    			toggle_scheme_mode: "Alla modo schema",
    			validation_errors: {
    				overlapping_time: "Il programma ha fasce orarie sovrapposte",
    				missing_target_entity: "Una o più azioni mancano di un'entità target",
    				missing_service_parameter: "Una o più azioni mancano di un'impostazione richiesta",
    				missing_action: "Il programma non ha azioni"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Condizioni",
    				add_condition: "Aggiungi condizione",
    				new_condition: "Nuova condizione",
    				types: {
    					equal_to: "{entity} è uguale a {value}",
    					unequal_to: "{entity} è diverso da {value}",
    					above: "{entity} è superiore a {value}",
    					below: "{entity} è inferiore a {value}"
    				},
    				options: {
    					logic_and: "Tutte le condizioni devono essere vere",
    					logic_or: "Qualsiasi condizione deve essere vera",
    					track_changes: "Rivaluta quando cambiano le condizioni"
    				}
    			},
    			period: {
    				header: "Periodo",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "comportamento dopo il completamento",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var it = {
    	services: services$e,
    	ui: ui$e
    };

    var it$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: it,
        services: services$e,
        ui: ui$e
    });

    var services$d = {
    	generic: {
    		turn_on: "Įjungti",
    		turn_off: "Išjungti",
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
    		set_fan_mode: "iestatīt ventilatora režīmu[ uz {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "aizvērt",
    		open_cover: "atvērt",
    		set_cover_position: "uzstādīt pozīciju[ uz {position}]",
    		set_cover_tilt_position: "uzstādīt slīpuma stāvokli[ uz {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "iestatīt ātrumu[ uz {speed}]",
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
    		send_message: "nosūtīt paziņojumu"
    	},
    	script: {
    		execute: "izpildīt"
    	},
    	vacuum: {
    		start_pause: "sākt / pauze"
    	},
    	water_heater: {
    		set_operation_mode: "iestatīt režīmu[ uz {operation_mode}]",
    		set_away_mode: "iestatīt prombūtnes režīmu"
    	}
    };
    var ui$d = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Vispirms izvēlieties laika slotu",
    			toggle_single_mode: "Uz vienkāršo režīmu",
    			toggle_scheme_mode: "Uz shēmas režīmu",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Pārvērtēt, kad mainās nosacījumi"
    				}
    			},
    			period: {
    				header: "Periods",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "uzvedība pēc beigām",
    			tags: "Tags"
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
    					description: "Izšķirtspēja (minūtēs) grafiku izveidei",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Rādīt pārslēgšanas slēdžus",
    					description: "Rādīt pārslēgšanas slēdzi katram atsevišķam grafikam kartē"
    				},
    				tags: {
    					heading: "Tagi",
    					description: "Izmantojiet tagus, lai sadalītu grafikus starp vairākām kartēm"
    				},
    				entities: {
    					button_label: "Iekļauto elementu konfigurēšana",
    					heading: "Iekļautās vienības",
    					description: "Izvēlieties vienības, kuras vēlaties kontrolēt, izmantojot plānotāju. Jūs varat noklikšķināt uz grupas, lai to atvērtu. Ņemiet vērā, ka dažas vienības (piemēram, sensori) var tikt izmantotas tikai nosacījumiem, nevis darbībām.",
    					included_number: "{number}/{total} izvēlēts"
    				}
    			}
    		}
    	}
    };
    var lv = {
    	services: services$d,
    	ui: ui$d
    };

    var lv$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: lv,
        services: services$d,
        ui: ui$d
    });

    var services$c = {
    	generic: {
    		turn_on: "Aanzetten",
    		turn_off: "Uitzetten",
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
    		set_fan_mode: "ventilatiemodus aanpassen[ naar {fan_mode}]",
    		set_swing_mode: "oscillatiemodus aanpassen[ naar {swing_mode}]"
    	},
    	cover: {
    		close_cover: "sluiten",
    		open_cover: "openen",
    		set_cover_position: "positie instellen[ naar {position}]",
    		set_cover_tilt_position: "hellingshoek instellen[ naar {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "snelheid instellen[ op {percentage}]",
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
    		send_message: "notificatie sturen"
    	},
    	script: {
    		execute: "uitvoeren"
    	},
    	vacuum: {
    		start_pause: "start / pauzeer"
    	},
    	water_heater: {
    		set_operation_mode: "modus aanpassen[ naar {operation_mode}]",
    		set_away_mode: "stel afwezigheidsmode in"
    	}
    };
    var ui$c = {
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
    		},
    		weekday_picker: {
    			title: "Herhaalde dagen voor tijdschema",
    			choose: "Kies..."
    		},
    		entity_picker: {
    			title: "Kies entiteiten",
    			choose: "Kies...",
    			no_results: "Geen overeenkomstige items gevonden"
    		},
    		action_picker: {
    			title: "Kies actie",
    			show_all: "Toon alle ondersteunde entiteiten"
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
    		editor: {
    			repeated_days: "Herhaling",
    			start_time: "Starttijd",
    			stop_time: "Eindtijd",
    			action: "Actie",
    			add_action: "Actie toevoegen",
    			select_timeslot: "Selecteer een tijdslot...",
    			toggle_single_mode: "Naar enkele modus",
    			toggle_scheme_mode: "Naar schema modus",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Condities",
    				add_condition: "Conditie toevoegen",
    				new_condition: "Nieuwe conditie",
    				types: {
    					equal_to: "{entity} is gelijk aan {value}",
    					unequal_to: "{entity} is ongelijk aan {value}",
    					above: "{entity} is hoger dan {value}",
    					below: "{entity} is lager dan {value}"
    				},
    				options: {
    					logic_and: "Alle condities moeten zijn voldaan",
    					logic_or: "Een van de condities moet zijn voldaan",
    					track_changes: "Herevalueer als de condities veranderen"
    				}
    			},
    			period: {
    				header: "Periode",
    				start_date: "Vanaf",
    				end_date: "Tot"
    			},
    			repeat_type: "Gedrag na voltooiing",
    			tags: "Tags"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Entiteiten",
    				other: "Overig"
    			},
    			fields: {
    				title: {
    					heading: "Titel van de kaart",
    					options: {
    						standard: "standaard",
    						hidden: "verborgen",
    						custom: "anders"
    					},
    					custom_title: "Eigen titel"
    				},
    				discover_existing: {
    					heading: "Alle schema's tonen",
    					description: "Hiermee wordt de 'discover existing' instelling geactiveerd. Eerder aangemaakte schema's zullen automatisch worden weergegeven."
    				},
    				time_step: {
    					heading: "Stapgrootte voor tijd",
    					description: "Resolutie (in minuten)",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Standaardmodus voor tijdsinvoer",
    					options: {
    						single: "Enkele modus",
    						scheme: "Tijdschema-modus"
    					}
    				},
    				sort_by: {
    					heading: "Sorteer-opties",
    					description: "Volgorde waarin de schema's worden weergegeven in de kaart",
    					options: {
    						relative_time: "Resterende tijd tot volgende actie",
    						title: "Weergegeven titel van de schema's",
    						state: "Actieve schema's eerst"
    					}
    				},
    				display_format_primary: {
    					heading: "Weergegeven primaire info",
    					description: "Kies welk label wordt gebruikt in de weergave",
    					options: {
    						"default": "Schema naam",
    						entity_action: "Samenvatting van de actie"
    					}
    				},
    				display_format_secondary: {
    					heading: "Weergegeven secondaire info",
    					description: "Kies welke aanvullende informatie zichtbaar is in de weergave",
    					options: {
    						relative_time: "Resterende tijd tot volgende actie",
    						time: "Ingestelde tijd voor de volgende actie",
    						days: "Herhaalde dagen van de week",
    						additional_tasks: "Aantal resterende acties"
    					}
    				},
    				show_header_toggle: {
    					heading: "Hoofdschakelaar weergeven",
    					description: "Schakelaar weergeven bovenin de kaart om alle schema's te (de)activeren"
    				},
    				show_toggle_switches: {
    					heading: "Schakelknoppen weergeven",
    					description: "Schakelknop weergeven voor elk individueel schema in de kaart"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Tags kunnen gebruikt worden om schema's te verdelen over meerdere kaarten"
    				},
    				entities: {
    					button_label: "Configureer zichtbare entiteiten",
    					heading: "Zichtbare entiteiten",
    					description: "Kies de entiteiten die je wilt bedienen vanuit schema's. Klik op een categorie om deze te openen. Merk op dat sommige entiteiten gebruikt worden om condities toe te wijzen.",
    					included_number: "{number}/{total} geselecteerd"
    				}
    			}
    		}
    	}
    };
    var nl = {
    	services: services$c,
    	ui: ui$c
    };

    var nl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: nl,
        services: services$c,
        ui: ui$c
    });

    var services$b = {
    	generic: {
    		turn_on: "Skru på",
    		turn_off: "Slå av",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "lukk",
    		open_cover: "åpne",
    		set_cover_position: "sett posisjon[ til {position}]",
    		set_cover_tilt_position: "sett vippestilling[ til {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "sett hastighet[ til {speed}]",
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
    		send_message: "send notifikasjon"
    	},
    	script: {
    		execute: "utfør"
    	},
    	vacuum: {
    		start_pause: "start / pause"
    	},
    	water_heater: {
    		set_operation_mode: "sett modus[ til {operation_mode}]",
    		set_away_mode: "sett bortemodus"
    	}
    };
    var ui$b = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Velg tidsluke",
    			toggle_single_mode: "Til enkel modus",
    			toggle_scheme_mode: "Til skjemamodus",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Periode",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "oppførsel etter fullføring",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var no = {
    	services: services$b,
    	ui: ui$b
    };

    var no$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: no,
        services: services$b,
        ui: ui$b
    });

    var services$a = {
    	generic: {
    		turn_on: "Włącz",
    		turn_off: "Wyłącz",
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} z parametrem {parameter}"
    	},
    	climate: {
    		set_temperature: "ustaw temperaturę[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "ogrzewanie[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chłodzenie[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "ogrzewanie/chłodzenie[ na {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "ogrzewanie/chłodzenie[ {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ na {temperature}]",
    		set_hvac_mode: "ustaw tryb[ na {hvac_mode}]",
    		set_preset_mode: "ustaw tryb[ na {preset_mode}]",
    		set_fan_mode: "ustaw tryb wentylatora[ na {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "zamknij",
    		open_cover: "otwórz",
    		set_cover_position: "ustaw pozycję[ na {position}]",
    		set_cover_tilt_position: "ustaw kąt nachylenia[ na {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "ustaw prędkość[ na {percentage}]",
    		set_direction: "ustaw kierunek[ na {direction}]",
    		oscillate: "ustaw oscylację[ na {oscillate}]"
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
    		turn_on: "włącz[ z jasnością {brightness}]"
    	},
    	media_player: {
    		select_source: "wybierz źródło[ {source}]"
    	},
    	notify: {
    		send_message: "wyślij powiadomienie"
    	},
    	script: {
    		execute: "wykonaj"
    	},
    	vacuum: {
    		start_pause: "start / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "ustaw tryb[ na {operation_mode}]",
    		set_away_mode: "ustaw tryb poza domem"
    	}
    };
    var ui$a = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "codziennie",
    				workdays: "dni robocze",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "każdego dnia",
    				workdays: "w dni robocze",
    				weekend: "w weekend"
    			},
    			days: "dni",
    			tomorrow: "jutro",
    			repeated_days: "każde {days}",
    			repeated_days_except: "każdego dnia oprócz {excludedDays}",
    			days_range: "od {startDay} do {endDay}",
    			next_week_day: "w {weekday}"
    		},
    		time: {
    			absolute: "o {time}",
    			interval: "od {startTime} do {endTime}",
    			at_midnight: "o północy",
    			at_noon: "w południe",
    			at_sun_event: "o {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Zakończ modyfikacje",
    			description: "Harmonogram, który zmieniłeś, jest obecnie wyłączony. Czy chcesz go włączyć?"
    		},
    		confirm_delete: {
    			title: "Usunąć encję?",
    			description: "Czy na pewno chcesz usunąć tę encję?"
    		},
    		confirm_migrate: {
    			title: "Aktualizuj harmonogram",
    			description: "Niektóre ustawienia zostaną utracone przy tej zmianie. Czy chcesz kontynuować?"
    		},
    		weekday_picker: {
    			title: "Dni powtórzeń dla harmonogramu",
    			choose: "Wybierz..."
    		},
    		entity_picker: {
    			title: "Wybierz encje",
    			choose: "Wybierz...",
    			no_results: "Nie znaleziono pasujących elementów"
    		},
    		action_picker: {
    			title: "Wybierz akcję",
    			show_all: "Pokaż wszystkie obsługiwane jednostki"
    		}
    	},
    	panel: {
    		common: {
    			title: "Harmonogram",
    			new_schedule: "Nowy harmonogram",
    			default_name: "Harmonogram #{id}"
    		},
    		overview: {
    			no_entries: "Brak elementów do wyświetlenia",
    			backend_error: "Nie można połączyć się z komponentem harmonogramu. Musi być zainstalowany jako integracja, zanim ta karta będzie mogła być używana.",
    			excluded_items: "{number} wykluczonych {if number is 1} element {else} elementów",
    			hide_excluded: "ukryj wykluczone elementy",
    			additional_tasks: "{number} dodatkowych {if number is 1} zadanie {else} zadań"
    		},
    		editor: {
    			repeated_days: "Powtarzane dni",
    			start_time: "Czas rozpoczęcia",
    			stop_time: "Czas zakończenia",
    			action: "Akcja",
    			add_action: "Dodaj akcję",
    			select_timeslot: "Wybierz przedział czasowy",
    			toggle_single_mode: "Do trybu prostego",
    			toggle_scheme_mode: "Do trybu schematu",
    			validation_errors: {
    				overlapping_time: "Harmonogram ma nachodzące na siebie przedziały czasowe",
    				missing_target_entity: "Jednej lub więcej akcji brakuje docelowej encji",
    				missing_service_parameter: "Jednej lub więcej akcji brakuje wymaganego parametru",
    				missing_action: "Harmonogram nie ma żadnych akcji"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Warunki",
    				add_condition: "Dodaj warunek",
    				new_condition: "Nowy warunek",
    				types: {
    					equal_to: "{entity} równa się {value}",
    					unequal_to: "{entity} różni się od {value}",
    					above: "{entity} jest powyżej {value}",
    					below: "{entity} jest poniżej {value}"
    				},
    				options: {
    					logic_and: "Wszystkie warunki muszą być spełnione",
    					logic_or: "Dowolny warunek musi być spełniony",
    					track_changes: "Ponownie sprawdzaj przy zmianie warunków"
    				}
    			},
    			period: {
    				header: "Okres",
    				start_date: "Od",
    				end_date: "Do"
    			},
    			repeat_type: "zachowanie po zakończeniu",
    			tags: "Tagi"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Encje",
    				other: "Inne"
    			},
    			fields: {
    				title: {
    					heading: "Tytuł karty",
    					options: {
    						standard: "standardowy",
    						hidden: "ukryty",
    						custom: "niestandardowy"
    					},
    					custom_title: "Niestandardowy tytuł"
    				},
    				discover_existing: {
    					heading: "Pokaż wszystkie harmonogramy",
    					description: "Ustawia parametr 'discover existing'. Wcześniej utworzone harmonogramy będą automatycznie dodane do karty."
    				},
    				time_step: {
    					heading: "Krok czasu",
    					description: "Rozdzielczość (w minutach) przy tworzeniu harmonogramów",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Domyślny edytor czasu",
    					options: {
    						single: "Tryb prostego harmonogramu",
    						scheme: "Tryb schematu czasu"
    					}
    				},
    				sort_by: {
    					heading: "Opcje sortowania",
    					description: "Kolejność, w jakiej harmonogramy pojawiają się na karcie",
    					options: {
    						relative_time: "Czas do następnej akcji",
    						title: "Wyświetlana nazwa harmonogramu",
    						state: "Pokaż aktywne harmonogramy na górze"
    					}
    				},
    				display_format_primary: {
    					heading: "Wyświetlana główna informacja",
    					description: "Określ, która etykieta jest używana dla harmonogramów w podglądzie",
    					options: {
    						"default": "Nazwa harmonogramu",
    						entity_action: "Podsumowanie zadania"
    					}
    				},
    				display_format_secondary: {
    					heading: "Wyświetlana dodatkowa informacja",
    					description: "Skonfiguruj, które dodatkowe właściwości są widoczne w podglądzie",
    					options: {
    						relative_time: "Czas do następnej akcji",
    						time: "Skonfigurowany czas następnej akcji",
    						days: "Powtarzane dni tygodnia",
    						additional_tasks: "Liczba dodatkowych zadań"
    					}
    				},
    				show_header_toggle: {
    					heading: "Pokaż przełącznik w nagłówku",
    					description: "Pokaż przełącznik w nagłówku karty do włączania/wyłączania wszystkich encji"
    				},
    				show_toggle_switches: {
    					heading: "Pokaż przełączniki",
    					description: "Pokaż przełącznik dla każdego harmonogramu w karcie"
    				},
    				tags: {
    					heading: "Tagi",
    					description: "Używaj tagów do podziału harmonogramów pomiędzy wieloma kartami"
    				},
    				entities: {
    					button_label: "Konfiguruj zawarte encje",
    					heading: "Zawarte encje",
    					description: "Wybierz encje, którymi chcesz sterować za pomocą harmonogramu. Możesz kliknąć na grupę, aby ją otworzyć. Zauważ, że niektóre encje (np. sensory) mogą być używane tylko jako warunki, a nie akcje.",
    					included_number: "{number}/{total} wybrano"
    				}
    			}
    		}
    	}
    };
    var pl = {
    	services: services$a,
    	ui: ui$a
    };

    var pl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: pl,
        services: services$a,
        ui: ui$a
    });

    var services$9 = {
    	generic: {
    		turn_on: "Ligar",
    		turn_off: "Desligar",
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
    		set_fan_mode: "definir modo ventoinha[ para {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]",
    		set_cover_tilt_position: "definir inclinação[ como {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "definir velocidade[ para {speed}]",
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
    		send_message: "enviar notificação"
    	},
    	script: {
    		execute: "executar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "definir modo[ para {operation_mode}]",
    		set_away_mode: "definir modo ausente"
    	}
    };
    var ui$9 = {
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
    		},
    		weekday_picker: {
    			title: "Repetições semanais",
    			choose: "Escolha..."
    		},
    		entity_picker: {
    			title: "Escolha entidades",
    			choose: "Escolha...",
    			no_results: "Sem resultados"
    		},
    		action_picker: {
    			title: "Escolha a acção",
    			show_all: "Mostrar todas as entidades suportadas"
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
    		editor: {
    			repeated_days: "Repetições semanais",
    			start_time: "Hora início",
    			stop_time: "Hora fim",
    			action: "Acção",
    			add_action: "Acrescentar acção",
    			select_timeslot: "Selecionar um período horário",
    			toggle_single_mode: "Para modo simples",
    			toggle_scheme_mode: "Para modo esquema",
    			validation_errors: {
    				overlapping_time: "O Horário tem sobreposições",
    				missing_target_entity: "Uma ou mais acções sem entidade definida",
    				missing_service_parameter: "Unma ou mais acções sem uma definição obrigatória",
    				missing_action: "O Horário não tem acções"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Condições",
    				add_condition: "Acrescentar condição",
    				new_condition: "Nova condição",
    				types: {
    					equal_to: "{entity} igual a {value}",
    					unequal_to: "{entity} diferente de {value}",
    					above: "{entity} acima de {value}",
    					below: "{entity} abaixo de {value}"
    				},
    				options: {
    					logic_and: "Todas as condições têm de ser verdadeiras",
    					logic_or: "Uma das condições tem de ser verdadeira",
    					track_changes: "Reavaliar em caso de alterações"
    				}
    			},
    			period: {
    				header: "Período",
    				start_date: "Desde",
    				end_date: "Até"
    			},
    			repeat_type: "Comportamento após a conclusão",
    			tags: "Etiquetas"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var pt = {
    	services: services$9,
    	ui: ui$9
    };

    var pt$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: pt,
        services: services$9,
        ui: ui$9
    });

    var services$8 = {
    	generic: {
    		turn_on: "Ligar",
    		turn_off: "Desligar",
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
    		set_fan_mode: "definir modo do ventilador[ para {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]",
    		set_cover_tilt_position: "definir a posição de inclinação[ para {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "definir velocidade[ para {speed}]",
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
    		send_message: "enviar notificação"
    	},
    	script: {
    		execute: "executar"
    	},
    	vacuum: {
    		start_pause: "iniciar / pausar"
    	},
    	water_heater: {
    		set_operation_mode: "definir modo[ para {operation_mode}]",
    		set_away_mode: "definir modo ausente"
    	}
    };
    var ui$8 = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Selecionar um período horário",
    			toggle_single_mode: "Para modo simples",
    			toggle_scheme_mode: "Para modo esquema",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Reavaliar quando as condições mudarem"
    				}
    			},
    			period: {
    				header: "Período",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "comportamento após a conclusão",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var ptBR = {
    	services: services$8,
    	ui: ui$8
    };

    var pt_br = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: ptBR,
        services: services$8,
        ui: ui$8
    });

    var services$7 = {
    	generic: {
    		turn_on: "Pornește",
    		turn_off: "Oprește",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "închidere",
    		open_cover: "deschidere",
    		set_cover_position: "setare poziție[ la {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "setare viteză[ la {speed}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "executare"
    	},
    	vacuum: {
    		start_pause: "start / pauză"
    	},
    	water_heater: {
    		set_operation_mode: "setare mod[ la {operation_mode}]",
    		set_away_mode: "setare mod plecat"
    	}
    };
    var ui$7 = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Selectați un interval orar",
    			toggle_single_mode: "Te lokho modo",
    			toggle_scheme_mode: "Te sxeme modo",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "Perioadă",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "comportament după declanșare",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var ro = {
    	services: services$7,
    	ui: ui$7
    };

    var ro$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: ro,
        services: services$7,
        ui: ui$7
    });

    var services$6 = {
    	generic: {
    		turn_on: "Включить",
    		turn_off: "Выключить",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "закрыть",
    		open_cover: "открыть",
    		set_cover_position: "установить позицию[ {position}]",
    		set_cover_tilt_position: "установить наклон[ {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "установить скорость[ {speed}]",
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
    		send_message: "послать сообщение"
    	},
    	script: {
    		execute: "запустить"
    	},
    	vacuum: {
    		start_pause: "старт / пауза"
    	},
    	water_heater: {
    		set_operation_mode: "установить режим[ {operation_mode}]",
    		set_away_mode: "установить режим вне дома"
    	}
    };
    var ui$6 = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Выберите временной слот",
    			toggle_single_mode: "В простой режим",
    			toggle_scheme_mode: "В режим схемы",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "период",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "поведение после срабатывания",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var ru = {
    	services: services$6,
    	ui: ui$6
    };

    var ru$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: ru,
        services: services$6,
        ui: ui$6
    });

    var services$5 = {
    	generic: {
    		turn_on: "Zapnúť",
    		turn_off: "Vypnúť",
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
    		set_fan_mode: "nastaviť režim ventilátora[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "zatvoriť",
    		open_cover: "otvoriť",
    		set_cover_position: "nastaviť polohu[ na {position}]",
    		set_cover_tilt_position: "nastaviť naklonenie[ na {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "nastaviť rýchlosť[ na {speed}]",
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
    		send_message: "poslať notifikáciu"
    	},
    	script: {
    		execute: "spustiť"
    	},
    	vacuum: {
    		start_pause: "štart / pauza"
    	},
    	water_heater: {
    		set_operation_mode: "nastaviť režim[ na {operation_mode}]",
    		set_away_mode: "nastaviť režim neprítomnosti"
    	}
    };
    var ui$5 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "denne",
    				workdays: "pracovné dni",
    				weekend: "víkendy"
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
    			description: "Plán, ktorý sa zmenil, je momentálne zakázaný, chcete ho povoliť?"
    		},
    		confirm_delete: {
    			title: "Odstrániť entitu?",
    			description: "Naozaj chcete odstrániť túto entitu?"
    		},
    		confirm_migrate: {
    			title: "Aktualizovať plán",
    			description: "Touto akciou sa stratia niektoré nastavenia. Chcete pokračovať?"
    		},
    		weekday_picker: {
    			title: "Dni opakovania pre plán",
    			choose: "Vyberte..."
    		},
    		entity_picker: {
    			title: "Vyberte entity",
    			choose: "Vyberte...",
    			no_results: "Žiadne vyhovujúce položky neboli nájdené"
    		},
    		action_picker: {
    			title: "Vyberte akciu",
    			show_all: "Zobraziť všetky podporované entity"
    		}
    	},
    	panel: {
    		common: {
    			title: "Plánovač",
    			new_schedule: "Nový plán",
    			default_name: "Plán #{id}"
    		},
    		overview: {
    			no_entries: "Žiadne položky na zobrazenie",
    			backend_error: "Nepodarilo sa pripojiť ku komponentu Scheduler. Pred tým, ako použijete túto kartu ho musíte nainštalovať ako integráciu.",
    			excluded_items: "Vylúčené položky: {number}",
    			hide_excluded: "skryť vylúčené položky",
    			additional_tasks: "Ďalšie úlohy: {number}"
    		},
    		editor: {
    			repeated_days: "Dni opakovania",
    			start_time: "Čas začiatku",
    			stop_time: "Čas konca",
    			action: "Akcia",
    			add_action: "Pridať akciu",
    			select_timeslot: "Najprv vyberte časový úsek",
    			toggle_single_mode: "Do režimu jedného",
    			toggle_scheme_mode: "Do režimu schémy",
    			validation_errors: {
    				overlapping_time: "Plán obsahuje prekrývajúce sa časové intervaly",
    				missing_target_entity: "Pre aspoň jednu akciu nie je zadaná cieľová entita",
    				missing_service_parameter: "Pre aspoň jednu akciu nie je zadané vyžadované nastavenie",
    				missing_action: "Plán neobsahuje žiadne akcie"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Podmienky",
    				add_condition: "Pridať podmienku",
    				new_condition: "Nová podmienka",
    				types: {
    					equal_to: "{entity} sa rovná {value}",
    					unequal_to: "{entity} sa nerovná {value}",
    					above: "{entity} je nad {value}",
    					below: "{entity} je pod {value}"
    				},
    				options: {
    					logic_and: "Všetky podmienky musia platiť",
    					logic_or: "Akákoľvek podmienka musí platiť",
    					track_changes: "Prehodnoťte, keď sa zmenia podmienky"
    				}
    			},
    			period: {
    				header: "Obdobie",
    				start_date: "Od",
    				end_date: "Do"
    			},
    			repeat_type: "správanie sa po spustení",
    			tags: "Štítky"
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
    					description: "Rozlíšenie (v minútach) pre vytváranie plánov",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Predvolený editor času",
    					options: {
    						single: "Režim jedného plánu",
    						scheme: "Režim schémy"
    					}
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
    				show_toggle_switches: {
    					heading: "Zobraziť prepínače",
    					description: "Zobraziť prepínač pre každý jednotlivý harmonogram na karte"
    				},
    				tags: {
    					heading: "Štítky",
    					description: "Použite štítky na rozdelenie plánov medzi viacero kariet"
    				},
    				entities: {
    					button_label: "Konfigurácia zahrnutých entít",
    					heading: "Zahrnuté entity",
    					description: "Vyberte entity, ktoré chcete ovládať pomocou plánovača. Kliknutím na skupinu ju otvoríte. Upozorňujeme, že niektoré entity (napríklad senzory) možno použiť iba na podmienky, nie na akcie.",
    					included_number: "{number}/{total} vybraný"
    				}
    			}
    		}
    	}
    };
    var sk = {
    	services: services$5,
    	ui: ui$5
    };

    var sk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: sk,
        services: services$5,
        ui: ui$5
    });

    var services$4 = {
    	generic: {
    		turn_on: "Vklopi",
    		turn_off: "Izklopi",
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
    		set_fan_mode: "nastavi ventilator[ na {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "zapri",
    		open_cover: "odpri",
    		set_cover_position: "nastavi pozicijo[ na {position}]",
    		set_cover_tilt_position: "nastavi naklon[ na {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "nastavi hitrost[ na {speed}]",
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
    		send_message: "pošlji sporočilo"
    	},
    	script: {
    		execute: "izvedi"
    	},
    	vacuum: {
    		start_pause: "zaženi / ustavi"
    	},
    	water_heater: {
    		set_operation_mode: "nastavi način[ na {operation_mode}]",
    		set_away_mode: "nastavi način odsoten"
    	}
    };
    var ui$4 = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Najprej izberi časovni okvir",
    			toggle_single_mode: "To single mode",
    			toggle_scheme_mode: "To scheme mode",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Ponovno preglej ko se pogoji spremenijo"
    				}
    			},
    			period: {
    				header: "Perioda",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "obnašanje, ko končaš",
    			tags: "Tags"
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
    					description: "Ločljivost (v minutah) za kreiranje urnikov",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "V enojni način",
    						scheme: "V shematski način"
    					}
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
    				show_toggle_switches: {
    					heading: "Prikaži stikala",
    					description: "Prikaži stikalo za vsak posamezen urnik na kartici"
    				},
    				tags: {
    					heading: "Tag-i",
    					description: "Uporabite tag-e za ločevanje urnikov med več karticami"
    				},
    				entities: {
    					button_label: "Konfiguriraj vključene entitete",
    					heading: "Vključene entitete",
    					description: "Izberite entitete, katere želike krmiliti s tem urnikom. Lahko kliknete na skupino, da jo odprete. Vedite, da lahko nekatere entitete (npr. senzorje) uporabite samo v pogojih, ne pa za akcije.",
    					included_number: "{number}/{total} izbranih"
    				}
    			}
    		}
    	}
    };
    var sl = {
    	services: services$4,
    	ui: ui$4
    };

    var sl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: sl,
        services: services$4,
        ui: ui$4
    });

    var services$3 = {
    	generic: {
    		turn_on: "Slå på",
    		turn_off: "Stäng av",
    		parameter_to_value: "{parameter} till {value}",
    		action_with_parameter: "{action} med {parameter}"
    	},
    	climate: {
    		set_temperature: "ställ in temperaturen[ på {temperature}]",
    		set_temperature_hvac_mode_heat: "värma[ till {temperature}]",
    		set_temperature_hvac_mode_cool: "kyla[ till {temperature}]",
    		set_temperature_hvac_mode_heat_cool: "värma/kyla[ till {temperature}]",
    		set_temperature_hvac_mode_heat_cool_range: "värma/kyla[ till {target_temp_low} - {target_temp_high}]",
    		set_temperature_hvac_mode_auto: "auto[ till {temperature}]",
    		set_hvac_mode: "ställ in läget[ till {hvac_mode}]",
    		set_preset_mode: "ställ in förinställningen[ till {preset_mode}]",
    		set_fan_mode: "ställ in fläktläge[ till {fan_mode}]",
    		set_swing_mode: "ställ in svängningsläge[ till {swing_mode}]"
    	},
    	cover: {
    		close_cover: "stäng",
    		open_cover: "öppna",
    		set_cover_position: "ställ in positionen[ till {position}]",
    		set_cover_tilt_position: "ställ in lutningsposition[ till {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "ställ in hastighet[ till {percentage}]",
    		set_direction: "ställ in riktning[ till {direction}]",
    		oscillate: "ställ in oscillation[ till {oscillate}]"
    	},
    	humidifier: {
    		set_humidity: "ställ in luftfuktighet[ till {humidity}]",
    		set_mode: "ställ in läge[ till {mode}]"
    	},
    	input_number: {
    		set_value: "ställ in den[ till {value}]"
    	},
    	input_select: {
    		select_option: "välj alternativ[ {option}]"
    	},
    	select: {
    		select_option: "välj alternativ[ {option}]"
    	},
    	light: {
    		turn_on: "slå på[ med {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "välj källa[ {source}]"
    	},
    	notify: {
    		send_message: "send notification"
    	},
    	script: {
    		execute: "utföra"
    	},
    	vacuum: {
    		start_pause: "starta / pausa"
    	},
    	water_heater: {
    		set_operation_mode: "ställ in läget[ till {operation_mode}]",
    		set_away_mode: "ställ in borta läget"
    	}
    };
    var ui$3 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "daglig",
    				workdays: "arbetsdagar",
    				weekend: "helgen"
    			},
    			day_types_long: {
    				daily: "varje dag",
    				workdays: "på arbetsdagar",
    				weekend: "i helgen"
    			},
    			days: "dagar",
    			tomorrow: "imorgon",
    			repeated_days: "varje {days}",
    			repeated_days_except: "varje dag utom {excludedDays}",
    			days_range: "från {startDay} till {endDay}",
    			next_week_day: "nästa {weekday}"
    		},
    		time: {
    			absolute: "kl. {time}",
    			interval: "från {startTime} till {endTime}",
    			at_midnight: "vid midnatt",
    			at_noon: "vid middagstid",
    			at_sun_event: "vid {sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "Slutför modifieringar",
    			description: "Schemat du har ändrat är för närvarande inaktiverat, vill du aktivera den?"
    		},
    		confirm_delete: {
    			title: "Ta bort enheten?",
    			description: "Är du säker på att du vill ta bort den här enheten?"
    		},
    		confirm_migrate: {
    			title: "Uppdatera schema",
    			description: "Vissa inställningar kommer att gå förlorade genom den här ändringen. Vill du fortsätta?"
    		},
    		weekday_picker: {
    			title: "Upprepade dagar för schema",
    			choose: "Välj..."
    		},
    		entity_picker: {
    			title: "Välj enheter",
    			choose: "Välj...",
    			no_results: "Inga matchande objekt hittades"
    		},
    		action_picker: {
    			title: "Välj åtgärd",
    			show_all: "Visa alla enheter som stöds"
    		}
    	},
    	panel: {
    		common: {
    			title: "Schemaläggare",
    			new_schedule: "Ny schema",
    			default_name: "Schema #{id}"
    		},
    		overview: {
    			no_entries: "Det finns inga objekt att visa",
    			backend_error: "Kunde inte ansluta till schemaläggarkomponenten. Den måste installeras som integration innan det här kortet kan användas.",
    			excluded_items: "{number} utesluten {if number is 1} artikel {else} artiklar",
    			hide_excluded: "dölj uteslutna objekt",
    			additional_tasks: "{number} mer {if number is 1} uppgift {else} uppgifter"
    		},
    		editor: {
    			repeated_days: "Upprepade dagar",
    			start_time: "Starttid",
    			stop_time: "Sluttid",
    			action: "Åtgärd",
    			add_action: "Lägg till åtgärd",
    			select_timeslot: "Välj en tidslucka",
    			toggle_single_mode: "Till enkelläge",
    			toggle_scheme_mode: "Till schemaläge",
    			validation_errors: {
    				overlapping_time: "Schemat har överlappande tidsluckor",
    				missing_target_entity: "En eller flera åtgärder saknar en målentitet",
    				missing_service_parameter: "En eller flera åtgärder saknar en obligatorisk inställning",
    				missing_action: "Schemat har inga åtgärder"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Villkor",
    				add_condition: "Lägg till villkor",
    				new_condition: "Nytt villkor",
    				types: {
    					equal_to: "{entity} är lika med {value}",
    					unequal_to: "{entity} är ojämlik med {value}",
    					above: "{entity} är över {value}",
    					below: "{entity} är under {value}"
    				},
    				options: {
    					logic_and: "Alla villkor måste vara sanna",
    					logic_or: "Något av villkoren måste vara sant",
    					track_changes: "Omvärdera när förutsättningarna förändras"
    				}
    			},
    			period: {
    				header: "Period",
    				start_date: "Från",
    				end_date: "Till"
    			},
    			repeat_type: "beteende efter avslutad",
    			tags: "Taggar"
    		},
    		card_editor: {
    			tabs: {
    				entities: "Enheter",
    				other: "Andra"
    			},
    			fields: {
    				title: {
    					heading: "Kortets titel",
    					options: {
    						standard: "standard",
    						hidden: "dold",
    						custom: "anpassad"
    					},
    					custom_title: "Anpassad titel"
    				},
    				discover_existing: {
    					heading: "Visa alla scheman",
    					description: "Detta ställer in parametern ''upptäck befintliga''. Tidigare skapade scheman läggs automatiskt till på kortet."
    				},
    				time_step: {
    					heading: "Tidssteg",
    					description: "Upplösning (i minuter) för att skapa scheman",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Standard tidsredigerare",
    					options: {
    						single: "Enkelt schemalagt läge",
    						scheme: "Tidschemaläge"
    					}
    				},
    				sort_by: {
    					heading: "Sorteringsalternativ",
    					description: "Ordning i vilken scheman visas på kortet",
    					options: {
    						relative_time: "Tid kvar till nästa åtgärd",
    						title: "Visad titel på schemat",
    						state: "Visa aktiva scheman överst"
    					}
    				},
    				display_format_primary: {
    					heading: "Visad primär information",
    					description: "Konfigurera vilken etikett som används för scheman i översikten",
    					options: {
    						"default": "Schemanamn",
    						entity_action: "Sammanfattning av uppgiften"
    					}
    				},
    				display_format_secondary: {
    					heading: "Visad sekundär information",
    					description: "Konfigurera vilka ytterligare egenskaper som ska synas i översikten",
    					options: {
    						relative_time: "Tid kvar till nästa åtgärd",
    						time: "Konfigurerad tid för nästa åtgärd",
    						days: "Upprepade dagar i veckan",
    						additional_tasks: "Antal ytterligare uppgifter"
    					}
    				},
    				show_header_toggle: {
    					heading: "Visa rubrikväxling",
    					description: "Visa växlingsknappen högst upp på kortet för att aktivera/inaktivera alla enheter"
    				},
    				show_toggle_switches: {
    					heading: "Visa växlingsknappar",
    					description: "Visa växlingsknappen för varje enskilt schema i kortet"
    				},
    				tags: {
    					heading: "Taggar",
    					description: "Använd taggar för att dela upp scheman mellan flera kort"
    				},
    				entities: {
    					button_label: "Konfigurera inkluderade entiteter",
    					heading: "Inkluderade enheter",
    					description: "Välj de enheter som du vill styra med hjälp av schemaläggaren. Du kan klicka på en grupp för att öppna den. Observera att vissa enheter (t.ex. sensorer) bara kan användas för villkor, inte för åtgärder.",
    					included_number: "{number}/{total} vald"
    				}
    			}
    		}
    	}
    };
    var sv = {
    	services: services$3,
    	ui: ui$3
    };

    var sv$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: sv,
        services: services$3,
        ui: ui$3
    });

    var services$2 = {
    	generic: {
    		turn_on: "Ввімкнути",
    		turn_off: "Вимкнути",
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
    		set_fan_mode: "set fan mode[ to {fan_mode}]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "закрити",
    		open_cover: "відкрити",
    		set_cover_position: "встановити позицію[ to {position}]",
    		set_cover_tilt_position: "set tilt position[ to {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "встановити швидкість[ to {speed}]",
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
    		send_message: "send notification"
    	},
    	script: {
    		execute: "виконати"
    	},
    	vacuum: {
    		start_pause: "старт / пауза"
    	},
    	water_heater: {
    		set_operation_mode: "встановити режим[ to {operation_mode}]",
    		set_away_mode: "встановити режим Не вдома"
    	}
    };
    var ui$2 = {
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
    		},
    		weekday_picker: {
    			title: "Repeated days for schedule",
    			choose: "Choose..."
    		},
    		entity_picker: {
    			title: "Choose entities",
    			choose: "Choose...",
    			no_results: "No matching items found"
    		},
    		action_picker: {
    			title: "Choose action",
    			show_all: "Show all supported entities"
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
    		editor: {
    			repeated_days: "Repeated days",
    			start_time: "Start time",
    			stop_time: "End time",
    			action: "Action",
    			add_action: "Add action",
    			select_timeslot: "Спершу виберіть часовий проміжок",
    			toggle_single_mode: "До одиночного режиму",
    			toggle_scheme_mode: "До схемного режиму",
    			validation_errors: {
    				overlapping_time: "Schedule has overlapping timeslots",
    				missing_target_entity: "One or more actions are missing a target entity",
    				missing_service_parameter: "One or more actions are missing a required setting",
    				missing_action: "Schedule has no actions"
    			}
    		},
    		options: {
    			conditions: {
    				header: "Conditions",
    				add_condition: "Add condition",
    				new_condition: "New condition",
    				types: {
    					equal_to: "{entity} is equal to {value}",
    					unequal_to: "{entity} is unequal to {value}",
    					above: "{entity} is above {value}",
    					below: "{entity} is below {value}"
    				},
    				options: {
    					logic_and: "All conditions must be true",
    					logic_or: "Any condition must be true",
    					track_changes: "Re-evaluate when conditions change"
    				}
    			},
    			period: {
    				header: "період",
    				start_date: "From",
    				end_date: "To"
    			},
    			repeat_type: "поведінка після спрацювання",
    			tags: "Tags"
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
    					description: "Resolution (in minutes) for creating schedules",
    					unit_minutes: "min"
    				},
    				default_editor: {
    					heading: "Default time editor",
    					options: {
    						single: "Single schedule mode",
    						scheme: "Time scheme mode"
    					}
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
    				show_toggle_switches: {
    					heading: "Show toggle switches",
    					description: "Show toggle switch for each individual schedule in the card"
    				},
    				tags: {
    					heading: "Tags",
    					description: "Use tags to divide schedules between multiple cards"
    				},
    				entities: {
    					button_label: "Configure included entities",
    					heading: "Included entities",
    					description: "Select the entities that you want to control using the scheduler. You can click on a group to open it. Note that some entities (such as sensors) can only be used for conditions, not for actions.",
    					included_number: "{number}/{total} selected"
    				}
    			}
    		}
    	}
    };
    var uk = {
    	services: services$2,
    	ui: ui$2
    };

    var uk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: uk,
        services: services$2,
        ui: ui$2
    });

    var services$1 = {
    	generic: {
    		turn_on: "پر سوئچ کریں",
    		turn_off: "بند کر دیں",
    		parameter_to_value: "{parameter} کو {value} پر سیٹ کریں",
    		action_with_parameter: "{parameter} کے ساتھ {action}"
    	},
    	climate: {
    		set_temperature: "درجہ حرارت سیٹ کریں[ {temperature} پر]",
    		set_temperature_hvac_mode_heat: "ہیٹ[ {temperature} پر]",
    		set_temperature_hvac_mode_cool: "کول[ {temperature} پر]",
    		set_temperature_hvac_mode_heat_cool: "ہیٹ/کول[ {temperature} پر]",
    		set_temperature_hvac_mode_heat_cool_range: "ہیٹ/کول[ {target_temp_low} سے {target_temp_high} تک]",
    		set_temperature_hvac_mode_auto: "آٹو[ {temperature} پر]",
    		set_hvac_mode: "موڈ سیٹ کریں[ {hvac_mode} پر]",
    		set_preset_mode: "پری سیٹ موڈ سیٹ کریں[ {preset_mode} پر]",
    		set_fan_mode: "فین موڈ سیٹ کریں[ {fan_mode} پر]",
    		set_swing_mode: "set swing mode[ to {swing_mode}]"
    	},
    	cover: {
    		close_cover: "بند کریں",
    		open_cover: "کھولیں",
    		set_cover_position: "پوزیشن سیٹ کریں[ {position} پر]",
    		set_cover_tilt_position: "جھکاؤ پوزیشن سیٹ کریں[ {tilt_position} پر]"
    	},
    	fan: {
    		set_percentage: "رفتار سیٹ کریں[ {percentage} پر]",
    		set_direction: "سمت سیٹ کریں[ {direction} پر]",
    		oscillate: "آسیلیشن سیٹ کریں[ {oscillate} پر]"
    	},
    	humidifier: {
    		set_humidity: "نمی سیٹ کریں[ {humidity} پر]",
    		set_mode: "موڈ سیٹ کریں[ {mode} پر]"
    	},
    	input_number: {
    		set_value: "ویلیو سیٹ کریں[ {value} پر]"
    	},
    	input_select: {
    		select_option: "آپشن منتخب کریں[ {option}]"
    	},
    	select: {
    		select_option: "آپشن منتخب کریں[ {option}]"
    	},
    	light: {
    		turn_on: "آن کریں[ {brightness} چمک کے ساتھ]"
    	},
    	media_player: {
    		select_source: "سورس منتخب کریں[ {source}]"
    	},
    	notify: {
    		send_message: "نوٹیفکیشن بھیجیں"
    	},
    	script: {
    		execute: "چلائیں"
    	},
    	vacuum: {
    		start_pause: "شروع / روکیں"
    	},
    	water_heater: {
    		set_operation_mode: "موڈ سیٹ کریں[ {operation_mode} پر]",
    		set_away_mode: "غیر موجودگی کا موڈ سیٹ کریں"
    	}
    };
    var ui$1 = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "روزانہ",
    				workdays: "کام کے دن",
    				weekend: "ہفتہ اختتام"
    			},
    			day_types_long: {
    				daily: "ہر دن",
    				workdays: "کام کے دنوں میں",
    				weekend: "ہفتے کے آخر میں"
    			},
    			days: "دن",
    			tomorrow: "کل",
    			repeated_days: "ہر {days}",
    			repeated_days_except: "ہر دن سوائے {excludedDays}",
    			days_range: "{startDay} سے {endDay} تک",
    			next_week_day: "اگلا {weekday}"
    		},
    		time: {
    			absolute: "{time} پر",
    			interval: "{startTime} سے {endTime} تک",
    			at_midnight: "آدھی رات کو",
    			at_noon: "دوپہر کو",
    			at_sun_event: "{sunEvent} کے وقت"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "ترمیم مکمل کریں",
    			description: "جو شیڈول آپ نے بدلا ہے وہ اس وقت غیر فعال ہے، کیا آپ اسے فعال کرنا چاہتے ہیں؟"
    		},
    		confirm_delete: {
    			title: "اینٹیٹی حذف کریں؟",
    			description: "کیا آپ واقعی اس اینٹیٹی کو حذف کرنا چاہتے ہیں؟"
    		},
    		confirm_migrate: {
    			title: "شیڈول اپ ڈیٹ کریں",
    			description: "اس تبدیلی سے کچھ سیٹنگز ضائع ہو سکتی ہیں۔ کیا آپ جاری رکھنا چاہتے ہیں؟"
    		},
    		weekday_picker: {
    			title: "شیڈول کے لیے دہرائے گئے دن",
    			choose: "منتخب کریں..."
    		},
    		entity_picker: {
    			title: "اینٹیٹیز منتخب کریں",
    			choose: "منتخب کریں...",
    			no_results: "کوئی مماثل آئٹمز نہیں ملے"
    		},
    		action_picker: {
    			title: "عمل منتخب کریں",
    			show_all: "تمام تعاون یافتہ اداروں کو دکھائیں۔"
    		}
    	},
    	panel: {
    		common: {
    			title: "شیڈولر",
    			new_schedule: "نیا شیڈول",
    			default_name: "شیڈول #{id}"
    		},
    		overview: {
    			no_entries: "دکھانے کے لیے کوئی آئٹمز نہیں ہیں",
    			backend_error: "شیڈولر کمپوننٹ سے کنکشن نہیں ہو سکا۔ اسے کارڈ استعمال کرنے سے پہلے انٹیگریشن کے طور پر انسٹال کرنا ضروری ہے۔",
    			excluded_items: "{number} خارج شدہ {if number is 1} آئٹم {else} آئٹمز",
    			hide_excluded: "خارج شدہ آئٹمز چھپائیں",
    			additional_tasks: "{number} مزید {if number is 1} کام {else} کام"
    		},
    		editor: {
    			repeated_days: "دہرائے گئے دن",
    			start_time: "آغاز کا وقت",
    			stop_time: "اختتامی وقت",
    			action: "عمل",
    			add_action: "عمل شامل کریں",
    			select_timeslot: "ٹائم سلاٹ منتخب کریں",
    			toggle_single_mode: "سنگل موڈ پر جائیں",
    			toggle_scheme_mode: "اسکیم موڈ پر جائیں",
    			validation_errors: {
    				overlapping_time: "شیڈول میں وقتوں کا اوورلیپ ہے",
    				missing_target_entity: "ایک یا زیادہ اعمال میں ہدف اینٹیٹی غائب ہے",
    				missing_service_parameter: "ایک یا زیادہ اعمال میں مطلوبہ سیٹنگ غائب ہے",
    				missing_action: "شیڈول میں کوئی عمل موجود نہیں"
    			}
    		},
    		options: {
    			conditions: {
    				header: "شرائط",
    				add_condition: "شرط شامل کریں",
    				new_condition: "نئی شرط",
    				types: {
    					equal_to: "{entity} {value} کے برابر ہے",
    					unequal_to: "{entity} {value} کے برابر نہیں ہے",
    					above: "{entity} {value} سے زیادہ ہے",
    					below: "{entity} {value} سے کم ہے"
    				},
    				options: {
    					logic_and: "تمام شرائط درست ہونی چاہئیں",
    					logic_or: "کوئی ایک شرط درست ہونی چاہیے",
    					track_changes: "جب شرائط بدلیں تو دوبارہ جانچ کریں"
    				}
    			},
    			period: {
    				header: "مدت",
    				start_date: "سے",
    				end_date: "تک"
    			},
    			repeat_type: "مکمل ہونے کے بعد کا برتاؤ",
    			tags: "ٹیگز"
    		},
    		card_editor: {
    			tabs: {
    				entities: "اینٹیٹیز",
    				other: "دیگر"
    			},
    			fields: {
    				title: {
    					heading: "کارڈ کا عنوان",
    					options: {
    						standard: "معیاری",
    						hidden: "چھپا ہوا",
    						custom: "حسبِ ضرورت"
    					},
    					custom_title: "اپنا عنوان"
    				},
    				discover_existing: {
    					heading: "تمام شیڈولز دکھائیں",
    					description: "یہ 'discover existing' پیرامیٹر سیٹ کرتا ہے۔ پہلے سے بنائے گئے شیڈولز خود بخود کارڈ میں شامل ہو جائیں گے۔"
    				},
    				time_step: {
    					heading: "وقت کا وقفہ",
    					description: "شیڈول بنانے کے لیے وقت کی ریزولوشن (منٹ میں)",
    					unit_minutes: "منٹ"
    				},
    				default_editor: {
    					heading: "ڈیفالٹ ٹائم ایڈیٹر",
    					options: {
    						single: "سنگل شیڈول موڈ",
    						scheme: "ٹائم اسکیم موڈ"
    					}
    				},
    				sort_by: {
    					heading: "ترتیب کے اختیارات",
    					description: "کارڈ میں شیڈولز کی ترتیب",
    					options: {
    						relative_time: "اگلے عمل تک باقی وقت",
    						title: "شیڈول کا دکھایا گیا عنوان",
    						state: "فعال شیڈولز اوپر دکھائیں"
    					}
    				},
    				display_format_primary: {
    					heading: "مرکزی معلومات کی نمائش",
    					description: "اوورویو میں شیڈولز کے لیے لیبل کنفیگر کریں",
    					options: {
    						"default": "شیڈول کا نام",
    						entity_action: "کام کا خلاصہ"
    					}
    				},
    				display_format_secondary: {
    					heading: "ثانوی معلومات کی نمائش",
    					description: "اوورویو میں اضافی خصوصیات دکھانے کا انتخاب کریں",
    					options: {
    						relative_time: "اگلے عمل تک باقی وقت",
    						time: "اگلے عمل کا وقت",
    						days: "ہفتے کے دہرائے گئے دن",
    						additional_tasks: "اضافی کاموں کی تعداد"
    					}
    				},
    				show_header_toggle: {
    					heading: "ہیڈر ٹوگل دکھائیں",
    					description: "کارڈ کے اوپر تمام اینٹیٹیز کو فعال/غیر فعال کرنے کے لیے سوئچ دکھائیں"
    				},
    				show_toggle_switches: {
    					heading: "ٹوگل سوئچز دکھائیں",
    					description: "کارڈ میں ہر انفرادی شیڈول کے لیے ٹوگل سوئچ دکھائیں"
    				},
    				tags: {
    					heading: "ٹیگز",
    					description: "شیڈولز کو مختلف کارڈز میں تقسیم کرنے کے لیے ٹیگز استعمال کریں"
    				},
    				entities: {
    					button_label: "شامل اینٹیٹیز ترتیب دیں",
    					heading: "شامل اینٹیٹیز",
    					description: "وہ اینٹیٹیز منتخب کریں جنہیں آپ شیڈولر کے ذریعے کنٹرول کرنا چاہتے ہیں۔ آپ گروپ پر کلک کر کے اسے کھول سکتے ہیں۔ یاد رکھیں کہ کچھ اینٹیٹیز (جیسے سینسرز) صرف شرائط کے لیے استعمال ہو سکتی ہیں، اعمال کے لیے نہیں۔",
    					included_number: "{number}/{total} منتخب شدہ"
    				}
    			}
    		}
    	}
    };
    var ur = {
    	services: services$1,
    	ui: ui$1
    };

    var ur$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: ur,
        services: services$1,
        ui: ui$1
    });

    var services = {
    	generic: {
    		turn_on: "打开",
    		turn_off: "关闭",
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
    		set_fan_mode: "设置风扇模式[ 为 {fan_mode}]",
    		set_swing_mode: "设置摆动模式[ 为 {swing_mode}]"
    	},
    	cover: {
    		close_cover: "关闭",
    		open_cover: "打开",
    		set_cover_position: "设置位置[ 为 {position}]",
    		set_cover_tilt_position: "设置倾斜位置[ 为 {tilt_position}]"
    	},
    	fan: {
    		set_percentage: "设定风速[ 为 {speed}]",
    		set_direction: "设定方向[ 为 {direction}]",
    		oscillate: "设置摇摆[ 为 {oscillate}]"
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
    		send_message: "发送通知"
    	},
    	script: {
    		execute: "执行"
    	},
    	vacuum: {
    		start_pause: "开始 / 暂停"
    	},
    	water_heater: {
    		set_operation_mode: "设定模式[ 为 {operation_mode}]",
    		set_away_mode: "设定离开模式"
    	}
    };
    var ui = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "每天",
    				workdays: "工作日",
    				weekend: "周末"
    			},
    			day_types_long: {
    				daily: "每天",
    				workdays: "工作日",
    				weekend: "周末"
    			},
    			days: "天",
    			tomorrow: "明天",
    			repeated_days: "每 {days}",
    			repeated_days_except: "每天，除了 {excludedDays}",
    			days_range: "从 {startDay} 至 {endDay}",
    			next_week_day: "下{weekday}"
    		},
    		time: {
    			absolute: "{time}",
    			interval: "从 {startTime} 至 {endTime}",
    			at_midnight: "午夜",
    			at_noon: "中午",
    			at_sun_event: "{sunEvent}"
    		}
    	},
    	dialog: {
    		enable_schedule: {
    			title: "完成修改",
    			description: "您修改的计划任务当前已禁用，是否需要启用？"
    		},
    		confirm_delete: {
    			title: "是否删除实体？",
    			description: "您确定要删除此实体吗？"
    		},
    		confirm_migrate: {
    			title: "修改任务",
    			description: "此操作将丢失某些设置。 你想继续吗？"
    		},
    		weekday_picker: {
    			title: "重复周期",
    			choose: "选择..."
    		},
    		entity_picker: {
    			title: "选择实体",
    			choose: "选择...",
    			no_results: "未找到匹配项"
    		},
    		action_picker: {
    			title: "选择动作",
    			show_all: "显示所有受支持的实体"
    		}
    	},
    	panel: {
    		common: {
    			title: "计划任务",
    			new_schedule: "新建任务",
    			default_name: "任务 #{id}"
    		},
    		overview: {
    			no_entries: "无事项",
    			backend_error: "计划任务组件关联失败。使用本卡片前，需先安装计划任务组件（Scheduler component）集成.",
    			excluded_items: "其他{number}项{if number is 1}任务{else}任务",
    			hide_excluded: "隐藏其他任务",
    			additional_tasks: "另有{number}项{if number is 1}任务{else}任务"
    		},
    		editor: {
    			repeated_days: "重复周期",
    			start_time: "开始时间",
    			stop_time: "结束时间",
    			action: "动作",
    			add_action: "添加动作",
    			select_timeslot: "选择时间段",
    			toggle_single_mode: "切换为单次模式",
    			toggle_scheme_mode: "切换为方案模式",
    			validation_errors: {
    				overlapping_time: "计划任务存在重叠的时间段",
    				missing_target_entity: "一个或多个动作缺少目标实体",
    				missing_service_parameter: "一个或多个操作缺少必要设置",
    				missing_action: "计划任务未设置任何动作"
    			}
    		},
    		options: {
    			conditions: {
    				header: "条件",
    				add_condition: "添加条件",
    				new_condition: "新建条件",
    				types: {
    					equal_to: "{entity} 等于 {value}",
    					unequal_to: "{entity} 不等于 {value}",
    					above: "{entity} 大于 {value}",
    					below: "{entity} 小于 {value}"
    				},
    				options: {
    					logic_and: "所有条件必须同时满足（AND）",
    					logic_or: "任意一个条件满足（OR）",
    					track_changes: "当条件变化时重新判断"
    				}
    			},
    			period: {
    				header: "生效时段",
    				start_date: "从",
    				end_date: "到"
    			},
    			repeat_type: "任务完成后的行为",
    			tags: "标签"
    		},
    		card_editor: {
    			tabs: {
    				entities: "实体",
    				other: "其他"
    			},
    			fields: {
    				title: {
    					heading: "卡片标题",
    					options: {
    						standard: "标准",
    						hidden: "隐藏",
    						custom: "自定义"
    					},
    					custom_title: "自定义标题"
    				},
    				discover_existing: {
    					heading: "显示所有计划任务",
    					description: "这将设置‘发现已有任务(discover existing)’参数。已创建的任务会自动添加到卡片中。 "
    				},
    				time_step: {
    					heading: "时间调整步长",
    					description: "创建计划任务时，时间选择器每次点击增加或减少的分钟数",
    					unit_minutes: "分钟"
    				},
    				default_editor: {
    					heading: "新建任务默认模式",
    					options: {
    						single: "单次任务模式",
    						scheme: "时间方案模式"
    					}
    				},
    				sort_by: {
    					heading: "排序方式",
    					description: "计划任务在卡片中的显示顺序",
    					options: {
    						relative_time: "按距离下次执行时间排序",
    						title: "按任务标题排序",
    						state: "优先显示已启用的任务"
    					}
    				},
    				display_format_primary: {
    					heading: "显示的主要信息",
    					description: "设置卡片中显示任务的主要信息",
    					options: {
    						"default": "任务名称",
    						entity_action: "任务概要"
    					}
    				},
    				display_format_secondary: {
    					heading: "显示的次要信息",
    					description: "设置卡片中显示任务的次要信息",
    					options: {
    						relative_time: "下次执行的剩余时间",
    						time: "下次执行的设定时间",
    						days: "重复周期（星期）",
    						additional_tasks: "额外任务数量"
    					}
    				},
    				show_header_toggle: {
    					heading: "显示标题开关",
    					description: "在卡片顶部显示切换开关，用于启用/禁用所有实体"
    				},
    				show_toggle_switches: {
    					heading: "显示切换开关",
    					description: "为卡片中的每个单独计划显示切换开关"
    				},
    				tags: {
    					heading: "标签",
    					description: "使用标签可将不同的计划任务分配到多个卡片中"
    				},
    				entities: {
    					button_label: "配置包含的实体（配置后未选择的实体相关任务将会隐藏）",
    					heading: "包含的实体",
    					description: "选择您希望通过计划任务控制的实体。您可以点击一个分组将其展开。请注意，部分实体（例如传感器）只能用作触发条件，而不能作为执行动作。",
    					included_number: "已选择 {number}/{total}"
    				}
    			}
    		}
    	}
    };
    var zhHans = {
    	services: services,
    	ui: ui
    };

    var zh_Hans = /*#__PURE__*/Object.freeze({
        __proto__: null,
        default: zhHans,
        services: services,
        ui: ui
    });

    const languages = {
        bg: bg$1,
        cs: cs$1,
        de: de$1,
        el: el$1,
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
        sv: sv$1,
        ru: ru$1,
        uk: uk$1,
        ur: ur$1,
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
        return (attributes === null || attributes === void 0 ? void 0 : attributes.friendly_name) === undefined
            ? computeEntity(entityId).replace(/_/g, " ")
            : ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.friendly_name) !== null && _a !== void 0 ? _a : "").toString();
    };

    function matchPattern(pattern, value) {
        let res = false;
        if (!value)
            return false;
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

    const entityIncludedByConfig = (entityOrDomain, config) => {
        return entityOrDomain.includes('.')
            ? ((config.include || DEFAULT_INCLUDED_DOMAINS).some(e => matchPattern(e, entityOrDomain)) ||
                Object.keys(config.customize || {}).some(e => matchPattern(e, entityOrDomain))) &&
                !(config.exclude || []).some(e => matchPattern(e, entityOrDomain))
            : ((config.include || DEFAULT_INCLUDED_DOMAINS).map(computeDomain).some(e => matchPattern(e, entityOrDomain)) ||
                Object.keys(config.customize || {}).map(computeDomain).some(e => matchPattern(e, entityOrDomain))) &&
                !(config.exclude || []).some(e => matchPattern(e, entityOrDomain));
    };

    const isIncludedSchedule = (schedule, config) => {
        var _a, _b;
        let entityList = [];
        let res = true;
        schedule.entries.forEach(entry => {
            entry.slots.forEach(slot => {
                slot.actions.forEach(action => {
                    var _a;
                    let entities = ((_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id) ? [action.target.entity_id].flat() : [action.service];
                    entityList = [...entityList, ...entities];
                });
            });
        });
        if (![...new Set(entityList)].every(entityId => entityIncludedByConfig(entityId, config)))
            return false;
        //filter items by tags
        const filterTags = [config.tags || []].flat();
        if (filterTags.length) {
            res = false;
            if ((schedule.tags || []).some(e => filterTags.includes(e)))
                res = true;
            else if (filterTags.includes('none') && !((_a = schedule.tags) === null || _a === void 0 ? void 0 : _a.length))
                res = true;
            else if (filterTags.includes('enabled') && schedule.enabled)
                res = true;
            else if (filterTags.includes('disabled') && !schedule.enabled)
                res = true;
        }
        //filter items by exclude_tags
        const excludeFilters = [config.exclude_tags || []].flat();
        if (excludeFilters.length && res) {
            if ((schedule.tags || []).some(e => excludeFilters.includes(e)))
                res = false;
            else if (excludeFilters.includes('none') && !((_b = schedule.tags) === null || _b === void 0 ? void 0 : _b.length))
                res = false;
            else if (excludeFilters.includes('enabled') && schedule.enabled)
                res = false;
            else if (excludeFilters.includes('disabled') && !schedule.enabled)
                res = false;
        }
        return res;
    };

    const sortByName = (nameA, nameB) => {
        const stringCompare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        return stringCompare(nameA.toLowerCase(), nameB.toLowerCase());
    };

    const capitalizeFirstLetter = (input) => {
        let output = input.trim();
        return output.charAt(0).toUpperCase() + output.slice(1);
    };

    const hassLocalize = (searchString, hass, usePlaceholder = true) => {
        let translation = hass.localize(searchString);
        if (translation || !usePlaceholder)
            return translation;
        let placeholder = `{${searchString.split(".").pop()}}`;
        //console.log(`Scheduler-card failed to fetch HA translation '${searchString}'`);
        return placeholder;
    };

    const formatRelativeTimeString = (input, hass) => {
        let eventString = input.mode == TimeMode.Sunrise
            ? hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.sunrise', hass)
            : hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.sunset', hass);
        if (hass.language != 'de')
            eventString = eventString.toLowerCase();
        const offset = input.hours * 3600 + input.minutes * 60;
        if (Math.abs(offset) <= 60)
            return localize('ui.components.time.at_sun_event', hass, '{sunEvent}', eventString);
        let signString = offset < 0
            ? hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.before', hass)
            : hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.after', hass);
        signString = signString.replace(/[^a-z]/gi, '').toLowerCase();
        let timeString = timeToString(input, { seconds: false }).split(/\+|\-/).pop();
        return `${timeString} ${signString} ${eventString}`;
    };
    const computeTimeDisplay = (startTime, stopTime, hass) => {
        const amPmFormat = useAmPm(hass.locale);
        if (stopTime) {
            const ts_start = parseTimeString(startTime);
            const ts_stop = parseTimeString(stopTime);
            const startTimeString = ts_start.mode == TimeMode.Fixed
                ? timeToString(ts_start, { am_pm: amPmFormat })
                : formatRelativeTimeString(ts_start, hass);
            const stopTimeString = ts_stop.mode == TimeMode.Fixed
                ? timeToString(ts_stop, { am_pm: amPmFormat })
                : formatRelativeTimeString(ts_stop, hass);
            return capitalizeFirstLetter(localize('ui.components.time.interval', hass, ['{startTime}', '{endTime}'], [startTimeString, stopTimeString]));
        }
        else {
            const ts_start = parseTimeString(startTime);
            const startTimeString = ts_start.mode == TimeMode.Fixed
                ? timeToString(ts_start, { am_pm: amPmFormat })
                : formatRelativeTimeString(ts_start, hass);
            return capitalizeFirstLetter(localize('ui.components.time.absolute', hass, '{time}', startTimeString));
        }
    };

    const supportedActions = {
        alarm_control_panel: {
            alarm_disarm: {
                target: {}
            },
            alarm_arm_home: {
                supported_features: 1,
                target: {}
            },
            alarm_arm_away: {
                supported_features: 2,
                target: {}
            },
            alarm_arm_night: {
                supported_features: 4,
                target: {}
            },
            alarm_arm_custom_bypass: {
                supported_features: 16,
                target: {}
            },
            alarm_arm_vacation: {
                supported_features: 32,
                target: {}
            },
        },
        automation: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
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
                translation_key: 'services.generic.turn_off',
                target: {},
                supported_features: 128
            },
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {},
                supported_features: 256
            },
            set_hvac_mode: {
                translation_key: 'services.climate.set_hvac_mode',
                target: {},
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
                translation_key: 'services.climate.set_preset_mode',
                supported_features: 16,
                target: {},
                fields: {
                    preset_mode: {}
                }
            },
            set_fan_mode: {
                translation_key: 'services.climate.set_fan_mode',
                supported_features: 8,
                target: {},
                fields: {
                    fan_mode: {}
                }
            },
            set_swing_mode: {
                translation_key: 'services.climate.set_swing_mode',
                supported_features: 32,
                target: {},
                fields: {
                    swing_mode: {}
                }
            }
        },
        cover: {
            close_cover: {
                translation_key: 'services.cover.close_cover',
                supported_features: 2,
                target: {}
            },
            open_cover: {
                translation_key: 'services.cover.open_cover',
                supported_features: 1,
                target: {}
            },
            set_cover_position: {
                translation_key: 'services.cover.set_cover_position',
                supported_features: 4,
                target: {},
                fields: {
                    position: {}
                }
            },
            set_cover_tilt_position: {
                translation_key: 'services.cover.set_cover_tilt_position',
                supported_features: 128,
                target: {},
                fields: {
                    tilt_position: {}
                }
            },
        },
        fan: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
                target: {}
            },
            set_percentage: {
                translation_key: 'services.fan.set_percentage',
                supported_features: 1,
                target: {},
                fields: {
                    percentage: {}
                }
            },
            oscillate: {
                translation_key: 'services.fan.oscillate',
                supported_features: 2,
                target: {},
                fields: {
                    oscillating: {}
                }
            },
            set_direction: {
                translation_key: 'services.fan.set_direction',
                supported_features: 4,
                target: {},
                fields: {
                    direction: {}
                }
            },
            set_preset_mode: {
                translation_key: 'services.climate.set_preset_mode',
                supported_features: 8,
                target: {},
                fields: {
                    preset_mode: {}
                }
            },
        },
        humidifier: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
                target: {}
            },
            set_humidity: {
                translation_key: 'services.humidifier.set_humidity',
                target: {},
                fields: {
                    humidity: {}
                }
            },
            set_mode: {
                translation_key: 'services.humidifier.set_mode',
                supported_features: 1,
                target: {},
                fields: {
                    mode: {}
                }
            },
        },
        input_boolean: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
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
                translation_key: 'services.input_number.set_value',
                target: {},
                fields: {
                    value: {}
                }
            }
        },
        input_select: {
            select_option: {
                translation_key: 'services.input_select.select_option',
                target: {},
                fields: {
                    option: {}
                }
            },
        },
        lawn_mower: {
            start_mowing: {
                target: {},
                supported_features: 1
            },
            pause: {
                target: {},
                supported_features: 2
            },
            dock: {
                target: {},
                supported_features: 4
            }
        },
        light: {
            turn_on: {
                translation_key: 'services.light.turn_on',
                target: {},
                fields: {
                    brightness: {
                        optional: true
                    }
                }
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
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
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
                target: {}
            },
            select_source: {
                translation_key: 'services.media_player.select_source',
                supported_features: 2048,
                target: {},
                fields: {
                    source: {}
                }
            },
        },
        notify: {
            '{entity_id}': {
                translation_key: 'services.notify.send_message',
                fields: {
                    title: {
                        optional: true
                    },
                    message: {}
                }
            },
        },
        number: {
            set_value: {
                translation_key: 'services.input_number.set_value',
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
            '{entity_id}': {
                translation_key: 'services.script.execute',
            },
        },
        select: {
            select_option: {
                translation_key: 'services.input_select.select_option',
                target: {},
                fields: {
                    option: {}
                }
            },
        },
        switch: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                target: {}
            },
            turn_off: {
                translation_key: 'services.generic.turn_off',
                target: {}
            }
        },
        vacuum: {
            turn_on: {
                translation_key: 'services.generic.turn_on',
                supported_features: 1,
                target: {}
            },
            start: {
                supported_features: 8192,
                target: {}
            },
            play_pause: {
                target: {}
            },
        },
        valve: {
            open_valve: {
                supported_features: 1,
                target: {}
            },
            close_valve: {
                supported_features: 2,
                target: {}
            },
            set_valve_position: {
                translation_key: 'services.cover.set_cover_position',
                supported_features: 4,
                target: {},
                fields: {
                    position: {}
                }
            },
        },
        water_heater: {
            set_temperature: {
                translation_key: 'services.climate.set_temperature',
                supported_features: 1,
                target: {},
                fields: {
                    temperature: {}
                }
            },
            set_operation_mode: {
                translation_key: 'services.water_heater.set_operation_mode',
                supported_features: 2,
                target: {},
                fields: {
                    operation_mode: {}
                }
            },
            set_away_mode: {
                translation_key: 'services.water_heater.set_away_mode',
                supported_features: 4,
                target: {},
                fields: {
                    away_mode: {}
                }
            },
            turn_off: {
                translation_key: 'services.generic.turn_on',
                target: {},
                supported_features: 8
            },
            turn_on: {
                translation_key: 'services.generic.turn_off',
                target: {},
                supported_features: 8
            },
        }
    };

    const parseListSelectorOption = (input) => {
        if (typeof input !== 'object')
            return null;
        if (!Object.keys(input).length || !Object.keys(input).every(e => typeof e === 'string'))
            return null;
        let cfg = {
            value: '',
            label: ''
        };
        if (Object.keys(input).includes('name'))
            cfg = Object.assign(Object.assign({}, cfg), { label: String(input.name) });
        else if (Object.keys(input).includes('label'))
            cfg = Object.assign(Object.assign({}, cfg), { label: String(input.label) });
        else if (Object.keys(input).includes('value'))
            cfg = Object.assign(Object.assign({}, cfg), { label: String(input.value) });
        if (Object.keys(input).includes('value'))
            cfg = Object.assign(Object.assign({}, cfg), { value: String(input.value) });
        else if (Object.keys(input).includes('name'))
            cfg = Object.assign(Object.assign({}, cfg), { value: String(input.name) });
        else if (Object.keys(input).includes('label'))
            cfg = Object.assign(Object.assign({}, cfg), { value: String(input.label) });
        if (Object.keys(input).includes('icon') && isDefined(input.icon))
            cfg = Object.assign(Object.assign({}, cfg), { icon: String(input.icon) });
        if (!cfg.value.length || !cfg.label.length)
            return null;
        return cfg;
    };
    const listSelector = (input) => {
        let cfg = {
            select: {
                options: Array.isArray(input.options)
                    ? input.options.every(e => typeof e === 'string')
                        ? input.options
                        : input.options.map(parseListSelectorOption).filter(isDefined)
                    : [],
            }
        };
        if (input.translation_key)
            cfg = Object.assign(Object.assign({}, cfg), { select: Object.assign(Object.assign({}, cfg.select), { translation_key: input.translation_key }) });
        return cfg;
    };

    const compareActions = (actionA, actionB) => {
        if (actionA.hasOwnProperty('service') && actionA.service !== actionB.service)
            return false;
        const serviceDataA = actionA.service_data || {};
        const serviceDataB = actionB.service_data || {};
        const variablesA = actionA.hasOwnProperty('variables')
            ? actionA.variables || {}
            : actionA.hasOwnProperty('fields')
                ? actionA.fields || {}
                : {};
        let serviceArgs = [...new Set([...Object.keys(serviceDataA), ...Object.keys(serviceDataB), ...Object.keys(variablesA)])];
        serviceArgs = serviceArgs.filter(e => e != 'entity_id');
        if (!serviceArgs.every(key => {
            var _a;
            if (Object.keys(serviceDataA).includes(key) && Object.keys(serviceDataB).includes(key)) {
                return deepCompare(serviceDataA[key], serviceDataB[key]);
            }
            if (Object.keys(variablesA).includes(key)) {
                let variableConfig = variablesA[key];
                let value = serviceDataB[key];
                if (Object.keys(variableConfig).includes('options')) {
                    let selector = listSelector({ options: variableConfig.options });
                    return isDefined(value) ? (_a = selector.select) === null || _a === void 0 ? void 0 : _a.options.find(e => typeof e == 'string' ? e == value : e.value == value) : true;
                    //allow no value set for option (user needs to pick it )
                }
                else if (Object.keys(variableConfig).includes('min') && Object.keys(variableConfig).includes('max')) {
                    if (!isDefined(value) && Object.keys(variableConfig).includes('optional') && variableConfig.optional)
                        return true;
                    else
                        return typeof value == 'number';
                }
                else {
                    return true;
                }
            }
            return false;
        }))
            return false;
        return true;
    };

    const parseCustomActions = (customize, entityOrDomainFilter) => {
        let actionConfig = [];
        Object.keys(customize)
            .filter(key => { var _a; return (_a = customize[key].actions) === null || _a === void 0 ? void 0 : _a.length; })
            .filter(key => !entityOrDomainFilter
            || (!entityOrDomainFilter.includes('.') && matchPattern(computeDomain(key), entityOrDomainFilter))
            || matchPattern(key, entityOrDomainFilter)
            || (computeDomain(entityOrDomainFilter) == 'script' && customize[key].actions.find(e => e.service == entityOrDomainFilter)))
            .forEach(key => {
            Object.values(customize[key].actions).forEach(config => {
                if (!config.service.includes('.'))
                    config = Object.assign(Object.assign({}, config), { service: `${computeDomain(key)}.${config.service}` });
                //if (key.includes('.') && !Object.keys(config.service_data).includes('entity_id')) config = { ...config, service_data: { ...config.service_data || {}, entity_id: key }, target: { entity_id: key } };
                if (key.includes('.') && computeDomain(key) != 'script')
                    config = Object.assign(Object.assign({}, config), { target: { entity_id: key } });
                if (computeDomain(key) != 'script' && computeDomain(entityOrDomainFilter || '') == 'script') {
                    //allow custom script actions under any domain
                    if (config.service != entityOrDomainFilter && (entityOrDomainFilter === null || entityOrDomainFilter === void 0 ? void 0 : entityOrDomainFilter.includes('.')))
                        return;
                    config = Object.assign(Object.assign({}, config), { target: Object.assign(Object.assign({}, config.target), { domain: key }) });
                }
                actionConfig.push({
                    service: config.service,
                    service_data: config.service_data || {},
                    target: config.target ? config.target : undefined,
                    name: config.name || "",
                    icon: config.icon || "",
                    variables: config.variables
                });
            });
        });
        return actionConfig;
    };
    const parseExcludedActions = (customize, entityOrDomainFilter) => {
        return Object.keys(customize)
            .filter(key => { var _a; return (_a = customize[key].exclude_actions) === null || _a === void 0 ? void 0 : _a.length; })
            .filter(key => !entityOrDomainFilter
            || (!entityOrDomainFilter.includes('.') && matchPattern(computeDomain(key), entityOrDomainFilter))
            || matchPattern(key, entityOrDomainFilter))
            .map(e => customize[e].exclude_actions)
            .flat()
            .filter(isDefined);
    };

    const actionConfig = (action, customize) => {
        var _a;
        const domain = computeDomain(action.service);
        const domainService = computeEntity(action.service);
        let config = {};
        if (Object.keys(supportedActions).includes(domain)) {
            if (Object.keys(supportedActions[domain]).includes(domainService)) {
                config = Object.assign(Object.assign({}, config), supportedActions[domain][domainService]);
            }
            else if (Object.keys(supportedActions[domain]).includes('{entity_id}')) {
                config = Object.assign(Object.assign({}, config), supportedActions[domain]['{entity_id}']);
            }
        }
        if (!customize)
            return config;
        let entity;
        if (['script', 'notify'].includes(domain))
            entity = action.service;
        else
            entity = (_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id;
        if (!entity)
            entity = domain;
        const actionConfig = parseCustomActions(customize, [entity].flat().pop());
        if (actionConfig.length) {
            let res = actionConfig.map(customConfig => {
                const match = compareActions(customConfig, action);
                if (!match)
                    return null;
                let item = {}; //start with empty config
                Object.keys(customConfig.variables || {}).forEach(key => {
                    item = Object.assign(Object.assign({}, item), { fields: Object.assign(Object.assign({}, item.fields || {}), { [key]: {} }) });
                });
                return Object.assign(Object.assign({}, item), { name: customConfig.name || config.name, icon: customConfig.icon || config.icon, target: customConfig.target || config.target });
            }).filter(isDefined);
            if (res.length && !compareActions(config, action))
                return res[0];
        }
        return config;
    };

    const MAX_DECIMALS = 5;
    const roundFloat = (val) => {
        const pow = Math.pow(10, MAX_DECIMALS);
        val = Math.round(val * pow) / pow;
        return val;
    };

    const formatSelectorDisplay = (value, selector, hass) => {
        if (!selector)
            return value;
        if (Object.keys(selector).includes('select') && selector.select) {
            const config = selector.select;
            let options = config.options.map(e => typeof e == 'string' ? Object({ value: e, label: e }) : e);
            let match = options === null || options === void 0 ? void 0 : options.find(e => e.value == value);
            if (config.translation_key)
                value = hassLocalize(config.translation_key.replace('${value}', value), hass, false) || match ? match === null || match === void 0 ? void 0 : match.label : value;
            else if (match)
                value = match.label;
        }
        if (Object.keys(selector).includes('number') && selector.number) {
            const config = selector.number;
            value = Number(value);
            if (typeof (config === null || config === void 0 ? void 0 : config.scale_factor) === 'number')
                value = value / config.scale_factor;
            if (typeof (config === null || config === void 0 ? void 0 : config.step) === 'number')
                value = Math.round(value / config.step) * config.step;
            value = roundFloat(value);
            if (config === null || config === void 0 ? void 0 : config.unit)
                return `${value}${config.unit}`;
        }
        if (Object.keys(selector).includes('boolean') && selector.boolean) {
            value = Boolean(value) ? 'True' : 'False';
        }
        return value;
    };

    const numericSelector = (input) => {
        let cfg = {
            number: {}
        };
        if (Object.keys(input).includes('min') && !isNaN(Number(input.min)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { min: Number(input.min) }) });
        if (Object.keys(input).includes('max') && !isNaN(Number(input.max)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { max: Number(input.max) }) });
        if (Object.keys(input).includes('step') && !isNaN(Number(input.step)) && input.step > 0)
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { step: Number(input.step) }) });
        if (Object.keys(input).includes('mode') && ['box', 'slider'].includes(input.mode))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { mode: input.mode }) });
        if (Object.keys(input).includes('unit') && input.unit)
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { unit: input.unit }) });
        if (Object.keys(input).includes('optional'))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { optional: Boolean(input.optional) }) });
        if (Object.keys(input).includes('scale_factor') && !isNaN(Number(input.scale_factor)))
            cfg = Object.assign(Object.assign({}, cfg), { number: Object.assign(Object.assign({}, cfg.number), { scale_factor: Number(input.scale_factor) }) });
        return cfg;
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
                    auto: 'mdi:autorenew',
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
                start_mowing: 'mdi:play',
                pause: 'mdi:pause'
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
        valve: {
            services: {
                open_valve: 'mdi:valve-open',
                close_valve: 'mdi:valve-closed',
                set_valve_position: 'mdi:valve'
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

    const selectorConfig = (service, entityId, field, hass, customize) => {
        const domain = computeDomain(service);
        const entityIds = ['script', 'notify'].includes(domain) ? [service] : [entityId || []].flat();
        let loadedCfg = entityIds.map(e => selectorConfigFromEntity(e, field, hass));
        let selector = mergeSelectors(loadedCfg);
        let customCfg = entityIds.map(e => selectorConfigFromCustomConfig(service, e, field, customize));
        let customSelector = mergeSelectors(customCfg);
        return customSelector || selector;
    };
    const selectorConfigFromEntity = (entityId, field, hass) => {
        const stateObj = Object.keys(hass.states).includes(entityId) ? hass.states[entityId] : null;
        const attr = (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes) || {};
        const domain = computeDomain(entityId);
        const searchKey = `${domain}.${field}`;
        const computeOptionIcons = (options) => {
            var _a, _b;
            const iconConfig = (_b = (_a = serviceIcons[domain]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b[field];
            const useIcons = !!iconConfig && (options || []).every(e => e in iconConfig);
            return (options || []).map(e => ({
                value: e,
                label: e,
                icon: useIcons ? iconConfig[e] : undefined,
            }));
        };
        switch (searchKey) {
            case 'climate.temperature':
            case 'climate.target_temp_low':
            case 'climate.target_temp_high': {
                const isOptional = searchKey == 'climate.temperature' ? ((attr.supported_features || 0) & 2) > 0 : ((attr.supported_features || 0) & 1) > 0;
                const fallbackStep = hass.config.unit_system.temperature.includes('F') ? 1 : 0.5;
                return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: attr.target_temp_step || fallbackStep, unit: `${hass.config.unit_system.temperature}`, optional: isOptional });
            }
            case 'climate.hvac_mode':
                return listSelector({ options: computeOptionIcons(attr.hvac_modes), translation_key: 'component.climate.entity_component._.state.${value}' });
            case 'climate.preset_mode':
                return listSelector({ options: computeOptionIcons(attr.preset_modes), translation_key: 'state_attributes.climate.preset_mode.${value}' });
            case 'climate.fan_mode':
                return listSelector({ options: computeOptionIcons(attr.fan_modes) });
            case 'climate.swing_mode':
                return listSelector({ options: computeOptionIcons(attr.swing_modes) });
            case 'cover.position':
            case 'cover.tilt_position':
            case 'fan.percentage':
            case 'valve.position':
                return numericSelector({ min: 0, max: 100, step: 1, unit: '%' });
            case 'fan.oscillating':
                return { boolean: {} };
            case 'fan.direction':
                return listSelector({ options: computeOptionIcons(['forward', 'reverse']), translation_key: 'ui.card.fan.${value}' });
            case 'fan.preset_mode':
                return listSelector({ options: computeOptionIcons(attr.preset_modes) });
            case 'humidifier.humidity':
                return numericSelector({ min: attr.min_humidity, max: attr.max_humidity, step: 1, unit: '%' });
            case 'humidifier.mode':
                return listSelector({ options: computeOptionIcons(attr.available_modes), translation_key: 'component.humidifier.entity_component._.state_attributes.mode.state.${value}' });
            case 'input_number.value':
            case 'number.value':
                return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit: attr.unit_of_measurement });
            case 'input_select.option':
            case 'select.option':
                return listSelector({ options: computeOptionIcons(attr.options) });
            case 'light.brightness':
                return numericSelector({ min: 0, max: 100, step: 1, unit: '%', scale_factor: 2.55 });
            case 'media_player.source':
            case 'notify.title':
                return { text: {} };
            case 'notify.message':
                return { text: {} };
            case 'water_heater.temperature': {
                const fallbackStep = hass.config.unit_system.temperature.includes('F') ? 1 : 0.5;
                return numericSelector({ min: attr.min_temp, max: attr.max_temp, step: attr.target_temp_step || fallbackStep, unit: `${hass.config.unit_system.temperature}` });
            }
            case 'water_heater.operation_mode':
                return listSelector({ options: computeOptionIcons(attr.operation_list) });
            case 'water_heater.away_mode':
                return { boolean: {} };
        }
        return null;
    };
    const selectorConfigFromCustomConfig = (service, entityId, field, customize) => {
        const actionConfig = parseCustomActions(customize || {}, entityId);
        if (actionConfig.length) {
            let res = actionConfig.map(customConfig => {
                if (customConfig.service != service || !Object.keys(customConfig.variables || {}).includes(field))
                    return null;
                let variableConfig = (customConfig.variables || {})[field];
                return parseCustomVariable(variableConfig);
            })
                .filter(e => e !== undefined);
            return mergeSelectors(res);
        }
        return null;
    };
    const parseCustomVariable = (config) => {
        if (Object.keys(config).includes('options')) {
            return listSelector({ options: config.options });
        }
        else if (Object.keys(config).includes('min') && Object.keys(config).includes('max')) {
            return numericSelector(config);
        }
        else {
            return { text: {} };
        }
    };
    const mergeSelectors = (input) => {
        const isUnique = (input) => new Set(input).size == 1;
        if (input.some(e => e === null) || !input.length)
            return null;
        if (input.every(e => e.hasOwnProperty('select'))) {
            const optionsLists = input.map(e => e.select.options).filter(e => e !== undefined);
            let commonOptions = [];
            if (optionsLists.every(e => e.every(f => typeof f === 'string'))) {
                commonOptions = optionsLists.length ? optionsLists.reduce((a, b) => a.filter(c => b.includes(c))) : [];
            }
            else {
                let convertedOptionsLists = optionsLists.map(list => list.map(e => parseListSelectorOption(typeof e === 'object' ? e : { value: e })).filter(isDefined));
                commonOptions = convertedOptionsLists.length ? convertedOptionsLists.reduce((a, b) => a.filter(c => b.find(el => el.value === c.value))) : [];
            }
            const translationKeyLists = input.map(e => e.select.translation_key).filter(e => e !== undefined);
            return {
                select: {
                    options: commonOptions.length ? commonOptions : [],
                    translation_key: translationKeyLists.length && isUnique(translationKeyLists) ? translationKeyLists[0] : undefined
                }
            };
        }
        else if (input.every(e => e.hasOwnProperty('number'))) {
            const minList = input.map(e => e.number.min).filter(e => e !== undefined);
            const maxList = input.map(e => e.number.max).filter(e => e !== undefined);
            const stepList = input.map(e => e.number.step).filter(e => e !== undefined);
            const modeList = input.map(e => e.number.mode).filter(e => e !== undefined);
            const unitList = input.map(e => e.number.unit).filter(e => e !== undefined);
            const optionalList = input.map(e => e.number.optional);
            const scaleFactorList = input.map(e => e.number.scale_factor).filter(e => e !== undefined);
            let res = {
                number: {
                    min: minList.length ? Math.max(...minList) : undefined,
                    max: maxList.length ? Math.min(...maxList) : undefined,
                    step: stepList.length ? Math.max(...stepList) : undefined,
                    mode: modeList.length && isUnique(modeList) ? modeList[0] : undefined,
                    unit: unitList.length && isUnique(unitList) ? unitList[0] : undefined,
                    optional: optionalList.every(e => e),
                    scale_factor: scaleFactorList.length && isUnique(scaleFactorList) ? scaleFactorList[0] : undefined
                }
            };
            return res;
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

    const subStringPattern = /\[([^\]]+)\]/;
    const wildCardPattern = /\{([^\}]+)\}/;
    const MAX_RECURSION_DEPTH = 100;
    const translationKeyOverlap = (key, action) => {
        const serviceName = computeEntity(action.service);
        if (key.indexOf(serviceName) != -1)
            key = key.substring(key.indexOf(serviceName) + serviceName.length + 1);
        return Object.keys(action.service_data).reduce((acc, arg) => {
            if (key.indexOf(arg) == -1)
                return acc;
            let subKey = key.substring(key.indexOf(arg) + arg.length + 1);
            if (subKey == action.service_data[arg])
                return acc + key.length + subKey.length + 1;
            return acc;
        }, 0);
    };
    const formatActionDisplay = (action, hass, customize, formatShort = false, eraseHtmlTags = false) => {
        const config = actionConfig(action, customize);
        let actionDisplay = config.name || '';
        let attributes = Object.fromEntries(Object.entries(action.service_data)
            .filter(([_, value]) => isDefined(value))
            .map(([field, value]) => {
            var _a;
            const selector = selectorConfig(action.service, (_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id, field, hass, customize);
            if (!selector)
                return [field, null];
            return [field, formatSelectorDisplay(value, selector, hass)];
        })
            .filter(([_, value]) => isDefined(value)));
        if (formatShort) {
            // only for timeslot editor
            if (Object.keys(attributes).length > 1) {
                const sortAttributes = (fieldA, fieldB) => {
                    const configA = !!config.fields && config.fields[fieldA] || {};
                    const configB = !!config.fields && config.fields[fieldB] || {};
                    if ((configA === null || configA === void 0 ? void 0 : configA.optional) && !configB.optional)
                        return 1;
                    if ((configB === null || configB === void 0 ? void 0 : configB.optional) && !configA.optional)
                        return -1;
                    return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
                };
                attributes = Object.fromEntries(Object.entries(attributes).sort(([a,], [b,]) => sortAttributes(a, b)));
                return Object.values(attributes).join(', ');
            }
            else if (Object.keys(attributes).length) {
                return Object.values(attributes)[0];
            }
        }
        if ((config === null || config === void 0 ? void 0 : config.translation_key) && !actionDisplay) {
            let translationKey = "";
            if (Array.isArray(config.translation_key)) {
                let translations = config.translation_key;
                translations.sort((a, b) => {
                    let overlapA = translationKeyOverlap(a, action);
                    let overlapB = translationKeyOverlap(b, action);
                    if (overlapA != overlapB)
                        return overlapB - overlapA;
                    return a.length - b.length;
                });
                translationKey = translations[0];
            }
            else
                translationKey = config.translation_key;
            actionDisplay = localize(translationKey, hass, Object.keys(attributes).map(e => `{${e}}`), Object.values(attributes));
        }
        else {
            const domain = computeDomain(action.service);
            const service = computeEntity(action.service);
            if (!actionDisplay)
                actionDisplay = hassLocalize(`component.${domain}.services.${service}.name`, hass, false);
            if (!actionDisplay && Object.keys(hass.services[domain] || {}).includes(service))
                actionDisplay = hass.services[domain][service].name || '';
            if (!actionDisplay)
                actionDisplay = service.replace(/_/g, ' ');
        }
        let matchedSubString;
        let it = 0;
        while ((matchedSubString = subStringPattern.exec(actionDisplay)) && it < MAX_RECURSION_DEPTH) {
            it++;
            let matchedWildCard = matchedSubString[1].match(wildCardPattern);
            if (matchedWildCard && Object.keys(action.service_data || {}).includes(matchedWildCard[1]) && Object.keys(attributes).includes(matchedWildCard[1])) {
                actionDisplay = actionDisplay.replace(matchedSubString[0], matchedSubString[1].replace(matchedWildCard[0], attributes[matchedWildCard[1]]));
            }
            else {
                actionDisplay = actionDisplay.replace(matchedSubString[0], '');
            }
        }
        let matchedWildCard;
        it = 0;
        while ((matchedWildCard = wildCardPattern.exec(actionDisplay)) && it < MAX_RECURSION_DEPTH) {
            it++;
            if (Object.keys(attributes).includes(matchedWildCard[1])) {
                actionDisplay = actionDisplay.replace(matchedWildCard[0], attributes[matchedWildCard[1]]);
            }
            else {
                actionDisplay = actionDisplay.replace(matchedWildCard[0], '');
            }
        }
        if (eraseHtmlTags && /<.+?>/g.exec(actionDisplay) !== null) {
            let htmlContent = new DOMParser().parseFromString(actionDisplay, 'text/html');
            actionDisplay = htmlContent.body.textContent || '';
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
    const weekdayList$1 = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const computeDayDisplay = (input, formatType, hass) => {
        let weekday;
        if (input instanceof Date) {
            input.getDay();
            weekday = TWeekday.Friday;
            if (supportLocaleString()) {
                return input.toLocaleDateString(hass.locale.language, { weekday: formatType });
            }
            else {
                input.getDay();
                weekday = TWeekday.Friday;
            }
        }
        else {
            weekday = input;
        }
        switch (weekday) {
            case TWeekday.Daily:
                return localize(`ui.components.date.day_types_${formatType}.daily`, hass);
            case TWeekday.Workday:
                return localize(`ui.components.date.day_types_${formatType}.workdays`, hass);
            case TWeekday.Weekend:
                return localize(`ui.components.date.day_types_${formatType}.weekend`, hass);
            case TWeekday.Monday:
            case TWeekday.Tuesday:
            case TWeekday.Wednesday:
            case TWeekday.Thursday:
            case TWeekday.Friday:
            case TWeekday.Saturday:
            case TWeekday.Sunday:
                let date = new Date(2017, 1, 26);
                let dayNumber = weekdayList$1.findIndex(e => e == weekday);
                if (!supportLocaleString())
                    return weekdayList$1[dayNumber];
                date.setDate(date.getDate() + dayNumber);
                return date.toLocaleDateString(hass.locale.language, { weekday: formatType });
            default:
                return '';
        }
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
            return weekdayList.map(e => e.toLowerCase()).findIndex(e => e == startOfWeekSetting);
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
    //const weekdayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayList = [
        TWeekday.Sunday,
        TWeekday.Monday,
        TWeekday.Tuesday,
        TWeekday.Wednesday,
        TWeekday.Thursday,
        TWeekday.Friday,
        TWeekday.Saturday,
    ];
    // 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday.
    const formatWeekdayDisplay = (weekdays, formatType, hass) => {
        let output = '';
        const startOfWeek = computeStartOfWeek(hass);
        const rotateArray = (arr, k) => arr.concat(arr).slice(k, k + arr.length);
        let weekdayListOrdered = rotateArray(weekdayList, startOfWeek);
        weekdays.sort((a, b) => {
            let indA = weekdayListOrdered.findIndex(e => e == a);
            let indB = weekdayListOrdered.findIndex(e => e == b);
            return indA - indB;
        });
        const weekdayNums = weekdays.filter(e => weekdayListOrdered.includes(e)).map(e => weekdayListOrdered.findIndex(f => f == e));
        const seq = findSequences(weekdayNums);
        const longestSequence = Math.max(...seq);
        if (weekdayNums.length) {
            if (weekdays.length > weekdayNums.length) {
                output += weekdays.filter(e => !weekdayListOrdered.includes(e)).map(e => computeDayDisplay(e, formatType, hass)).join(', ');
                output += ', ';
            }
            if (weekdayNums.length == 6) {
                const missing = [0, 1, 2, 3, 4, 5, 6].filter(e => !weekdayNums.includes(e));
                const missingDay = computeDayDisplay(weekdayListOrdered[missing.pop()], formatType, hass);
                output += localize('ui.components.date.repeated_days_except', hass, '{excludedDays}', missingDay);
            }
            else {
                const dayNames = weekdayNums.map(e => computeDayDisplay(weekdayListOrdered[e], formatType, hass));
                if (weekdayNums.length >= 3 && longestSequence >= 3) {
                    const start = seq.reduce((obj, e, i) => (e == longestSequence ? i : obj), 0);
                    dayNames.splice(start, longestSequence, localize('ui.components.date.days_range', hass, ['{startDay}', '{endDay}'], [dayNames[start], dayNames[start + longestSequence - 1]]));
                }
                const daysString = dayNames.length > 1
                    ? `${dayNames.slice(0, -1).join(', ')} ${hassLocalize('ui.common.and', hass)} ${dayNames.pop()}`
                    : `${dayNames.pop()}`;
                output += weekdayNums.length >= 3 && longestSequence >= 3
                    ? daysString
                    : localize('ui.components.date.repeated_days', hass, '{days}', daysString);
            }
            return output;
        }
        return weekdays.map(e => computeDayDisplay(e, formatType, hass)).join(', ');
    };

    const computeEntityDisplay = (entityId, hass, customize) => {
        const customNameConfig = Object.entries(customize || {}).filter(([k, v]) => matchPattern(k, entityId) && v.name).map(([_k, v]) => v.name);
        if (customNameConfig.filter(isDefined).length)
            return customNameConfig.filter(isDefined)[0];
        else if (Object.keys(hass.states).includes(entityId) &&
            hass.states[entityId].attributes.friendly_name)
            return hass.states[entityId].attributes.friendly_name;
        return computeEntity(entityId).replace(/_/g, " ");
    };

    const computeScheduleDisplay = (schedule, config, hass, customize) => {
        const computeDisplay = (item) => {
            var _a, _b;
            switch (item) {
                case DisplayItem.Action:
                    const action = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
                    return capitalizeFirstLetter(formatActionDisplay(action, hass, customize));
                case DisplayItem.Days:
                    return capitalizeFirstLetter(formatWeekdayDisplay(schedule.entries[0].weekdays, 'long', hass));
                case DisplayItem.Name:
                    return capitalizeFirstLetter(schedule.name || '');
                case DisplayItem.AdditionalTasks:
                    return schedule.entries[0].slots.length > 1
                        ? '+' +
                            localize('ui.panel.overview.additional_tasks', hass, '{number}', String(schedule.entries[0].slots.length - 1))
                        : '';
                case DisplayItem.Entity:
                    const nextAction = schedule.entries[0].slots[schedule.next_entries[0] || 0].actions[0];
                    let entityIds = [((_a = nextAction.target) === null || _a === void 0 ? void 0 : _a.entity_id) || []].flat();
                    if (!entityIds.length && ['script', 'notify'].includes(computeDomain(nextAction.service)))
                        entityIds = [nextAction.service];
                    const entityDisplay = entityIds.map(e => computeEntityDisplay(e, hass, customize)).join(", ");
                    return capitalizeFirstLetter(entityDisplay);
                case DisplayItem.RelativeTime:
                    return '<relative-time></relative-time>';
                case DisplayItem.Tags:
                    return (_b = schedule.tags) === null || _b === void 0 ? void 0 : _b.map(e => `<tag>${e}</tag>`).join('');
                case DisplayItem.Time:
                    const slot = schedule.entries[0].slots[schedule.next_entries[0] || 0];
                    return capitalizeFirstLetter(computeTimeDisplay(slot.start, slot.stop, hass));
                case DisplayItem.Default:
                    const nameDisplay = computeDisplay(DisplayItem.Name);
                    return nameDisplay
                        ? nameDisplay
                        : `${computeDisplay(DisplayItem.Entity)}: ${computeDisplay(DisplayItem.Action)}`;
                default:
                    const regex = /\{([^\}]+)\}/;
                    let res;
                    while ((res = regex.exec(item))) {
                        item = item.replace(res[0], String(computeDisplay(String(res[1]))));
                    }
                    return item;
            }
        };
        return [...[config].flat()].map(e => {
            let result = computeDisplay(e);
            if (!result)
                return '';
            return result;
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
    const sortByTitle = (scheduleA, scheduleB, displayFormat, hass, customize) => {
        try {
            const titleA = computeScheduleDisplay(scheduleA, displayFormat, hass, customize).join();
            const titleB = computeScheduleDisplay(scheduleB, displayFormat, hass, customize).join();
            return sortByName(titleA, titleB);
        }
        catch (e) {
            return 0;
        }
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
            schedules = schedules.sort(sortByRelativeTime);
        }
        if (sortingOptions.includes('title')) {
            schedules = schedules.sort((a, b) => { var _a; return sortByTitle(a, b, ((_a = config.display_options) === null || _a === void 0 ? void 0 : _a.primary_info) || DEFAULT_PRIMARY_INFO_DISPLAY, hass, config.customize); });
        }
        if (sortingOptions.includes('state')) {
            schedules = schedules.sort((a, b) => sortByState(a, b, hass, sortingOptions.includes('relative-time')));
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

    const computeConfigItem = (registryData) => {
        let output = {};
        const serviceId = `${registryData.platform}.${registryData.unique_id}`;
        if (registryData.name)
            output = Object.assign(Object.assign({}, output), { name: registryData.name });
        if (registryData.icon)
            output = Object.assign(Object.assign({}, output), { icon: registryData.icon });
        return [serviceId, output];
    };
    const loadConfigFromEntityRegistry = async (hass) => {
        let output = {};
        const filteredEntities = Object.keys(hass.states).filter(e => computeDomain(e) == 'script');
        if (filteredEntities.length) {
            await hass.callWS({
                type: "config/entity_registry/get_entries",
                entity_ids: filteredEntities
            })
                .then(res => {
                output = Object.fromEntries(Object.entries(res).map(([, v]) => computeConfigItem(v))
                    .filter(([, v]) => Object.keys(v).length));
            });
        }
        return output;
    };

    const fetchTags = (hass) => hass.callWS({
        type: 'scheduler/tags',
    });

    // Material Design Icons v7.4.47
    var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
    var mdiArrowRight = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";
    var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
    var mdiChevronLeft = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
    var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
    var mdiChevronUp = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
    var mdiClockOutline = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
    var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
    var mdiCog = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
    var mdiCogOutline = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";
    var mdiDotsVertical = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
    var mdiPencil = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";
    var mdiShape = "M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z";
    var mdiShapeRectanglePlus = "M19,6H22V8H19V11H17V8H14V6H17V3H19V6M17,17V14H19V19H3V6H11V8H5V17H17Z";
    var mdiTrashCanOutline = "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";
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
        valve: 'mdi:valve-closed',
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

    const isSupportedDomain$1 = (domain, customConfig) => {
        let res = Object.keys(supportedActions).includes(domain);
        if (!res && customConfig) {
            return Object.keys(customConfig).map(computeDomain).includes(domain);
        }
        // if(!res) {
        //   console.log(`Domain ${domain} is not supported.`);
        // }
        return res;
    };
    const computeActionDomains = (hass, config) => {
        let domains = Object.keys(hass.services).filter(e => isSupportedDomain$1(e, config.customize));
        domains = domains.filter(domain => entityIncludedByConfig(domain, config));
        let actionList = domains.map((e) => ({
            key: e,
            name: hassLocalize(`component.${e}.title`, hass, false) || e.replace(/_/g, " "),
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
    const t={ATTRIBUTE:1,CHILD:2},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i="important",n=" !"+i,o$1=e$1(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return T}});

    const stateIcons = {
        alarm_control_panel: {
            disarmed: 'mdi:lock-open-variant-outline',
            armed_away: 'mdi:exit-run',
            armed_home: 'mdi:home-outline',
            armed_night: 'mdi:power-sleep',
            armed_custom_bypass: 'mdi:security',
            armed_vacation: 'mdi:shield-airplane',
            triggered: 'mdi:alarm-light-outline',
        },
        binary_sensor: {
            battery: {
                on: 'mdi:battery-outline',
                off: 'mdi:battery',
            },
            battery_charging: {
                on: 'mdi:battery-charging',
                off: 'mdi:battery',
            },
            cold: {
                on: 'mdi:snowflake',
                off: 'mdi:thermometer',
            },
            connectivity: {
                on: 'mdi:server-network',
                off: 'mdi:server-network-off',
            },
            door: {
                on: 'mdi:door-open',
                off: 'mdi:door-closed',
            },
            garage_door: {
                on: 'mdi:garage-open',
                off: 'mdi:garage',
            },
            power: {
                on: 'mdi:power-plug',
                off: 'mdi:power-plug-off',
            },
            gas: {
                on: 'mdi:alert-circle',
                off: 'mdi:check-circle',
            },
            problem: {
                on: 'mdi:alert-circle',
                off: 'mdi:check-circle',
            },
            safety: {
                on: 'mdi:alert-circle',
                off: 'mdi:check-circle',
            },
            tamper: {
                on: 'mdi:alert-circle',
                off: 'mdi:check-circle',
            },
            smoke: {
                on: 'mdi:smoke',
                off: 'mdi:check-circle',
            },
            heat: {
                on: 'mdi:fire',
                off: 'mdi:thermometer',
            },
            light: {
                on: 'mdi:brightness-7',
                off: 'mdi:brightness-5',
            },
            lock: {
                on: 'mdi:lock-open',
                off: 'mdi:lock',
            },
            moisture: {
                on: 'mdi:water',
                off: 'mdi:water-off',
            },
            motion: {
                on: 'mdi:run',
                off: 'mdi:walk',
            },
            occupancy: {
                on: 'mdi:home',
                off: 'mdi:home-outline',
            },
            opening: {
                on: 'mdi:square-outline',
                off: 'mdi:square',
            },
            plug: {
                on: 'mdi:power-plug',
                off: 'mdi:power-plug-off',
            },
            presence: {
                on: 'mdi:home',
                off: 'mdi:home-outline',
            },
            running: {
                on: 'mdi:play',
                off: 'mdi:stop',
            },
            sound: {
                on: 'mdi:music-note',
                off: 'mdi:music-note-off',
            },
            update: {
                on: 'mdi:package-up',
                off: 'mdi:package',
            },
            vibration: {
                on: 'mdi:vibrate',
                off: 'mdi:crop-portrait',
            },
            window: {
                on: 'mdi:window-open',
                off: 'mdi:window-closed',
            },
            _: {
                on: 'mdi:checkbox-marked-circle',
                off: 'mdi:radiobox-blank',
            },
        },
        calendar: {
            on: 'mdi:flash',
            off: 'mdi:flash-off',
        },
        cover: {
            garage: {
                closed: 'mdi:garage',
                open: 'mdi:garage-open'
            },
            door: {
                closed: 'mdi:door-closed',
                open: 'mdi:door-open'
            },
            blind: {
                closed: 'mdi:blinds',
                open: 'mdi:blinds-open'
            },
            window: {
                closed: 'mdi:window-closed',
                open: 'mdi:window-open'
            },
            _: {
                closed: 'mdi:window-shutter',
                open: 'mdi:window-shutter-open'
            }
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
        lawn_mower: {
            mowing: 'mdi:play',
            paused: 'mdi:pause',
            docked: 'mdi:home-import-outline'
        },
        lock: {
            unlocked: 'mdi:lock-open-variant-outline',
            locked: 'mdi:lock-outline',
        },
        person: {
            home: 'mdi:home-outline',
            not_home: 'mdi:exit-run',
        },
        sun: {
            below_horizon: 'mdi:weather-sunny-off',
            above_horizon: 'mdi:weather-sunny',
        },
        switch: {
            on: 'mdi:flash',
            off: 'mdi:flash-off',
        },
        timer: {
            active: 'mdi:play',
            paused: 'mdi:pause',
            idle: 'mdi:sleep',
        },
        valve: {
            open: 'mdi:valve-open',
            closed: 'mdi:valve-closed'
        },
        weather: {
            'clear-night': 'mdi:weather-night',
            cloudy: 'mdi:weather-cloudy',
            exceptional: 'mdi:alert-circle-outline',
            fog: 'mdi:weather-fog',
            hail: 'mdi:weather-hail',
            lightning: 'mdi:weather-lightning',
            'lightning-rainy': 'mdi:weather-lightning-rainy',
            partlycloudy: 'mdi:weather-partly-cloudy',
            pouring: 'mdi:weather-pouring',
            rainy: 'mdi:weather-rainy',
            snowy: 'mdi:weather-snowy',
            'snowy-rainy': 'mdi:weather-snowy-rainy',
            sunny: 'mdi:weather-sunny',
            windy: 'mdi:weather-windy',
            'windy-variant': 'mdi:weather-windy-variant',
        },
        water_heater: {
            off: 'mdi:power-off',
            eco: 'mdi:leaf',
            electric: 'mdi:lightning-bolt',
            gas: 'mdi:fire',
            heat_pump: 'mdi:hvac',
            high_demand: 'mdi:water-plus-outline',
            performance: 'mdi:rocket-launch-outline'
        }
    };
    const stateIcon = (entityId, state, hass) => {
        const domain = computeDomain(entityId);
        if (!Object.keys(stateIcons).includes(domain))
            return;
        let iconList = stateIcons[domain];
        const isRecursiveList = typeof Object.values(iconList)[0] === 'object';
        if (isRecursiveList) {
            const stateObj = hass.states[entityId];
            const deviceClass = stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.device_class;
            if (deviceClass && Object.keys(iconList).includes(deviceClass)) {
                iconList = iconList[deviceClass];
            }
            else {
                iconList = iconList._;
            }
        }
        if (!Object.keys(iconList).includes(state))
            return;
        return iconList[state];
    };

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
        'lawn_mower',
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
        'valve',
        'weather',
        'water_heater'
    ];
    const WEATHER_CONDITION_STATES = [
        'clear-night',
        'cloudy',
        'exceptional',
        'fog',
        'hail',
        'lightning',
        'lightning-rainy',
        'partlycloudy',
        'pouring',
        'rainy',
        'snowy',
        'snowy-rainy',
        'sunny',
        'windy',
        'windy-variant',
    ];
    const standardStatesForEntity = (entityId, hass) => {
        const stateObj = Object.keys(hass.states).includes(entityId) ? hass.states[entityId] : undefined;
        const domain = computeDomain(entityId);
        const attr = (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes) || {};
        const computeStateIcons = (states) => {
            return states === null || states === void 0 ? void 0 : states.map(state => Object({
                value: state,
                icon: stateIcon(entityId, state, hass)
            }));
        };
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
                return listSelector({ options: computeStateIcons(modes), translation_key: 'component.alarm_control_panel.entity_component._.state.${value}' });
            case 'binary_sensor':
                return listSelector({ options: computeStateIcons(['on', 'off']), translation_key: 'component.binary_sensor.entity_component.${deviceClass}.state.${value}' });
            case 'climate':
                return listSelector({ options: computeStateIcons(attr.hvac_modes), translation_key: 'component.climate.entity_component._.state.${value}' });
            case 'calendar':
            case 'fan':
            case 'humidifier':
            case 'input_boolean':
            case 'light':
            case 'switch':
                return listSelector({ options: computeStateIcons(['on', 'off']), translation_key: 'component.switch.entity_component._.state.${value}' });
            case 'cover':
                return listSelector({ options: computeStateIcons(['open', 'closed']), translation_key: 'component.cover.entity_component._.state.${value}' });
            case 'device_tracker':
                return listSelector({ options: computeStateIcons(['home', 'not_home']), translation_key: 'component.device_tracker.entity_component._.state.${value}' });
            case 'input_number':
            case 'number':
                return numericSelector({ min: attr.min, max: attr.max, step: attr.step, mode: attr.mode, unit: attr.unit_of_measurement });
            case 'input_select':
            case 'select':
                return listSelector({ options: attr.options });
            case 'lawn_mower':
                return listSelector({ options: computeStateIcons(['mowing', 'paused', 'docked']), translation_key: 'component.lawn_mower.entity_component._.state.${value}' });
            case 'lock':
                return listSelector({ options: computeStateIcons(['locked', 'unlocked']), translation_key: 'component.lock.entity_component._.state.${value}' });
            case 'person':
                const zones = Object.keys(hass.states).filter(e => computeDomain(e) == 'zone').map(computeEntity);
                return listSelector({ options: [...new Set(['home', 'not_home', ...zones])] });
            case 'proximity':
                return numericSelector({ mode: 'box', unit: attr.unit_of_measurement });
            case 'sensor':
                return !isNaN(Number(stateObj === null || stateObj === void 0 ? void 0 : stateObj.state)) || isDefined(attr.unit_of_measurement)
                    ? numericSelector({
                        mode: 'box',
                        unit: attr.unit_of_measurement,
                        min: attr.unit_of_measurement == '%' ? 0 : undefined,
                        max: attr.unit_of_measurement == '%' ? 100 : undefined
                    })
                    : { text: {} };
            case 'sun':
                return listSelector({ options: computeStateIcons(['above_horizon', 'below_horizon']), translation_key: 'component.sun.entity_component._.state.${value}' });
            case 'timer':
                return listSelector({ options: computeStateIcons(['active', 'paused', 'idle']), translation_key: 'component.timer.entity_component._.state.${value}' });
            case 'valve':
                return listSelector({ options: computeStateIcons(['open', 'closed']), translation_key: 'component.valve.entity_component._.state.${value}' });
            case 'weather':
                return listSelector({ options: computeStateIcons(WEATHER_CONDITION_STATES), translation_key: 'component.weather.entity_component._.state.${value}' });
            case 'water_heater':
            case 'climate':
                return listSelector({ options: computeStateIcons(attr.operation_list), translation_key: 'component.climate.entity_component._.state.${value}' });
            default:
                return { text: {} };
        }
    };
    const computeStatesForEntity = (entityId, hass, customize) => {
        let stateConfig = standardStatesForEntity(entityId, hass);
        let customStateConfig = Object.keys(customize || {})
            .filter(key => matchPattern(key, computeDomain(entityId)) || matchPattern(key, entityId))
            .filter(e => Object.keys(customize[e]).includes('states'))
            .sort((a, b) => a.length - b.length)
            .map(e => customize[e].states)
            .shift();
        if (customStateConfig) {
            if (Array.isArray(customStateConfig)) {
                stateConfig = listSelector({ options: customStateConfig });
            }
            else if (typeof customStateConfig == 'object' && 'min' in customStateConfig && 'max' in customStateConfig) {
                stateConfig = numericSelector(customStateConfig);
            }
        }
        return stateConfig;
    };

    const isSupportedDomain = (domain, customConfig) => {
        let res = SUPPORTED_CONDITION_DOMAINS.includes(domain);
        if (!res && customConfig) {
            return Object.keys(customConfig).map(computeDomain).includes(domain);
        }
        return res;
    };
    const computeConditionDomains = (hass, config) => {
        let domains = Object.keys(hass.states)
            .map(e => computeDomain(e))
            .reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
            .filter(e => isSupportedDomain(e, config.customize || {}));
        domains = domains.filter(domain => entityIncludedByConfig(domain, config));
        let actionList = domains.map((e) => ({
            key: e,
            name: hassLocalize(`component.${e}.title`, hass, false) || e.replace(/_/g, " "),
            description: "",
            icon: domainIcon(e)
        }));
        return actionList;
    };

    const FALLBACK_ICON$1 = 'mdi:help';
    const checkIconPrefix$1 = (icon) => {
        if (icon.match(/^[a-z]+\:[a-zA-Z\-]+$/))
            return icon;
        return `mdi:${icon}`;
    };
    const computeEntityIcon = (entityId, customize, hass) => {
        let customConfig = Object.entries(customize || {}).filter(([k, v]) => matchPattern(k, entityId) && v.icon).map(([_k, v]) => v);
        if (customConfig.length) {
            return customConfig.map(e => checkIconPrefix$1(e.icon)).shift();
        }
        if (!Object.keys(hass.states).includes(entityId)) {
            return FALLBACK_ICON$1;
        }
        const stateObj = hass.states[entityId];
        if (stateObj.attributes.icon)
            return stateObj.attributes.icon;
        const domain = computeDomain(entityId);
        return domainIcon(domain);
    };

    const computeDomains = (hass) => {
        let domains = computeActionDomains(hass, { include: ['*'] });
        let conditionDomains = computeConditionDomains(hass, { include: ['*'] });
        conditionDomains = conditionDomains.filter(e => !domains.map(f => f.key).includes(e.key));
        domains = [...domains, ...conditionDomains];
        domains.sort((a, b) => sortByName(a.name, b.name));
        return domains;
    };
    const computeEntitiesForDomain = (domain, customize, hass) => {
        if (['script', 'notify'].includes(domain)) {
            let entities = Object.keys(hass.services[domain]);
            if (domain == 'script')
                entities = entities.filter(e => !['turn_on', 'turn_off', 'reload', 'toggle', 'test'].includes(e));
            let entityList = entities.map((e) => ({
                key: `${domain}.${e}`,
                name: computeEntityDisplay(`${domain}.${e}`, hass, customize),
                description: "",
                icon: computeEntityIcon(`${domain}.${e}`, customize, hass)
            }));
            entityList.sort((a, b) => sortByName(a.name, b.name));
            return entityList;
        }
        else {
            const entities = Object.keys(hass.states).filter(e => computeDomain(e) == domain);
            let entityList = entities.map((e) => {
                var _a;
                return ({
                    key: e,
                    name: friendlyName(e, (_a = hass.states[e]) === null || _a === void 0 ? void 0 : _a.attributes),
                    description: "",
                    icon: computeEntityIcon(e, customize, hass)
                });
            });
            entityList.sort((a, b) => sortByName(a.name, b.name));
            return entityList;
        }
    };
    const filteredResult = (obj, tokens) => {
        return (tokens.every(token => obj.name.toLowerCase().includes(token)) ||
            tokens.every(token => obj.key.toLowerCase().includes(token)));
    };
    let DialogSelectEntities = class DialogSelectEntities extends s {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
            this.expandedGroups = [];
            this.scheduleEntities = [];
        }
        async showDialog(params) {
            this._params = params;
            this.loadOptions();
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
        loadOptions() {
            if (!this._params)
                return;
            let domains = computeDomains(this.hass);
            this.options = domains.map((item) => (Object.assign(Object.assign({}, item), { entities: computeEntitiesForDomain(item.key, this._params.cardConfig.customize, this.hass) })))
                .filter(e => e.entities.length);
        }
        shouldUpdate(changedProps) {
            if (changedProps.has('_params')
                || changedProps.has('expandedGroups')
                || changedProps.has('_filter')
                || changedProps.has('scheduleEntities'))
                return true;
            return false;
        }
        async firstUpdated() {
            this.scheduleEntities = Object.entries(await fetchItems(this.hass)).map(([, val]) => val.entity_id);
        }
        async willUpdate() {
            var _a;
            if (!this._width || !this._height) {
                const boundingRect = (_a = this.shadowRoot.querySelector("ha-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                this._width = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.width;
                this._height = boundingRect === null || boundingRect === void 0 ? void 0 : boundingRect.height;
            }
        }
        render() {
            if (!this._params)
                return x ``;
            return x `
      <ha-dialog
        open
        @closed=${this.closeDialog}
        @wa-after-show=${this._opened}
      >
        <div slot="header">
          <ha-dialog-header>
            <ha-icon-button
              slot="navigationIcon"
              data-dialog="close"
              .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
              .path=${mdiClose}
            ></ha-icon-button>
            <div slot="title">
              ${localize('ui.dialog.entity_picker.title', this.hass)}
            </div>
          </ha-dialog-header>

          <ha-input
            dialogInitialFocus
            .placeholder=${hassLocalize("ui.common.search", this.hass)}
            aria-label=${hassLocalize("ui.common.search", this.hass)}
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
                  .label=${hassLocalize("ui.common.clear", this.hass)}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-input>
        </div>
        
        <ha-list
          style=${o$1({
            minWidth: `${this._width}px`,
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </ha-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("ha-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
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
        _toggleSelectEntity(ev) {
            let listItem = ev.target;
            while (listItem.tagName != 'HA-LIST-ITEM')
                listItem = listItem.parentElement;
            listItem.querySelector("ha-checkbox");
            const key = listItem.getAttribute("key");
            if (this._params.entities.includes(key)) {
                this._params = Object.assign(Object.assign({}, this._params), { entities: this._params.entities.filter(e => e != key) });
            }
            else {
                this._params = Object.assign(Object.assign({}, this._params), { entities: [...this._params.entities, key] });
            }
        }
        _toggleSelectDomain(ev, isSelected) {
            var _a;
            let listItem = ev.target;
            while (listItem.tagName != 'HA-LIST-ITEM')
                listItem = listItem.parentElement;
            const key = listItem.getAttribute("key");
            const entitiesInDomain = (_a = this.options) === null || _a === void 0 ? void 0 : _a.find(e => e.key == key).entities.map(e => e.key);
            if (isSelected) {
                this._params = Object.assign(Object.assign({}, this._params), { domains: this._params.domains.filter(e => e != key), entities: this._params.entities.filter(e => !(entitiesInDomain === null || entitiesInDomain === void 0 ? void 0 : entitiesInDomain.includes(e))) });
            }
            else {
                this._params = Object.assign(Object.assign({}, this._params), { domains: [...this._params.domains, key] });
            }
            ev.stopPropagation();
        }
        closeGroupByKey(key) {
            const menu = this.shadowRoot.querySelector("ha-list");
            menu.childNodes.forEach(e => {
                if (e.nodeType != Node.ELEMENT_NODE)
                    return;
                if (e.tagName != 'HA-LIST-ITEM')
                    return;
                if (e.getAttribute("key") == key) {
                    const listItem = e;
                    const container = listItem.nextElementSibling;
                    const button = listItem.querySelector("ha-icon-button");
                    container.style.height = '0px';
                    listItem.removeAttribute('expanded');
                    button.classList.remove('expanded');
                }
            });
        }
        async _toggleExpandGroup(ev) {
            let listItem = ev.target;
            while (listItem.tagName != 'HA-LIST-ITEM')
                listItem = listItem.parentElement;
            const button = listItem.querySelector("ha-icon-button");
            const key = listItem.getAttribute("key");
            if (!this.expandedGroups.includes(key)) {
                this.expandedGroups.forEach(e => this.closeGroupByKey(e));
                this.expandedGroups = [key];
                await this.requestUpdate();
            }
            const container = listItem.nextElementSibling;
            const scrollHeight = container.scrollHeight;
            if (listItem.hasAttribute('expanded')) {
                listItem.removeAttribute('expanded');
                button.classList.remove('expanded');
                container.style.height = '0px';
                setTimeout(() => {
                    this.expandedGroups = this.expandedGroups.filter(e => e != key);
                }, 300);
            }
            else {
                listItem.setAttribute('expanded', 'true');
                button.classList.add('expanded');
                container.style.height = `${scrollHeight}px`;
            }
        }
        _renderOptions() {
            if (!this.options)
                return;
            let filteredOptions = [...this.options];
            const filterApplied = this._filter && this._filter.trim().length;
            if (filterApplied) {
                const tokens = this._filter.toLowerCase().trim().split(" ");
                filteredOptions = filteredOptions.map(item => {
                    let res = filteredResult(item, tokens);
                    if (res)
                        return item;
                    item = Object.assign(Object.assign({}, item), { entities: (item.entities || []).filter(subitem => filteredResult(subitem, tokens)) });
                    if (!item.entities.length)
                        return;
                    return item;
                })
                    .filter(e => e !== undefined);
            }
            if (!filteredOptions.length) {
                return x `
        <ha-list-item disabled>
          ${hassLocalize('ui.components.entity.entity-picker.no_match', this.hass)}
        </ha-list-item>
      `;
            }
            return (Object.keys(filteredOptions)).map((key) => {
                var _a, _b;
                const domain = filteredOptions[key].key;
                const domainIncluded = (_a = this._params) === null || _a === void 0 ? void 0 : _a.domains.includes(domain);
                let entities = [...filteredOptions[key].entities];
                if (domain == 'switch')
                    entities = entities.filter(e => !this.scheduleEntities.includes(e.key));
                const numIncludedEntities = domainIncluded
                    ? entities.length
                    : entities.filter((e) => { var _a; return (_a = this._params) === null || _a === void 0 ? void 0 : _a.entities.includes(e.key); }).length;
                const isSelectedDomain = ((_b = this._params) === null || _b === void 0 ? void 0 : _b.domains.includes(domain)) || filteredOptions[key].entities.every(e => { var _a; return (_a = this._params) === null || _a === void 0 ? void 0 : _a.entities.includes(e.key); });
                return x `
        <ha-list-item
          graphic="icon"
          twoline
          hasMeta
          @click=${this._toggleExpandGroup}
          key="${domain}"
        >
          <ha-icon slot="graphic" icon="${filteredOptions[key].icon}"></ha-icon>
          <div slot="meta" class="meta">
            <ha-button
              appearance="plain"
              @click=${(ev) => this._toggleSelectDomain(ev, isSelectedDomain)}
              size="small"
            >
              ${isSelectedDomain
                ? hassLocalize('ui.components.media-browser.file_management.deselect_all', this.hass)
                : hassLocalize('ui.components.subpage-data-table.select_all', this.hass)}
            </ha-button>
            <ha-icon-button .path="${mdiChevronDown}" @click=${(ev) => { ev.target.blur(); }} class="chevron"></ha-icon-button>
          </div>
          <span>${filteredOptions[key].name}</span>
          <span slot="secondary">${localize('ui.panel.card_editor.fields.entities.included_number', this.hass, ['{number}', '{total}'], [numIncludedEntities, entities.length])}</span>
        </ha-list-item>
        ${this.expandedGroups.includes(domain) || filterApplied ? x `
        <div class="group ${filterApplied ? 'open' : ''}">
          <li role="divider"></li>
        ${entities.map(e => {
                var _a, _b;
                return x `
          <ha-list-item
            graphic="icon"
            twoline
            hasMeta
            @click=${this._toggleSelectEntity}
            class="nested"
            key="${e.key}"
          >
            ${Object.keys(this.hass.states).includes(e.key)
                    ? x `<ha-state-icon .stateObj=${this.hass.states[e.key]} .hass=${this.hass} slot="graphic"></ha-state-icon>`
                    : x `<ha-icon slot="graphic" icon="${e.icon}"></ha-icon>`}
            <ha-checkbox
              slot="meta"
              ?checked=${((_a = this._params) === null || _a === void 0 ? void 0 : _a.entities.includes(e.key)) || ((_b = this._params) === null || _b === void 0 ? void 0 : _b.domains.includes(domain))}
            ></ha-checkbox>

            <span>${e.name}</span>
            <span slot="secondary">${e.key}</span>
          </ha-list-item>
        `;
            })}
          <li role="divider"></li>
        </div>
      ` : ''}
      `;
            });
        }
        static get styles() {
            return i$4 `
      ha-dialog {
        --dialog-content-padding: 0;
        --ha-dialog-width-md: 480px;
      }
      ha-input {
        display: block;
        margin: 0 16px;
      }
      ha-list {
        min-height: 300px;
      }
      ha-list-item {
        --mdc-ripple-hover-opacity: 0.04;
        --mdc-ripple-focus-opacity: 0.04;
        --mdc-ripple-press-opacity: 0.12;
        --mdc-list-item-meta-size: 180px;
      }
      ha-list-item.nested {
        --mdc-list-item-meta-size: 48px;
        --mdc-list-side-padding: 32px;
      }
      ha-list-item.nested ha-icon {
        display: flex;
        justify-content: flex-end;
      }
      ha-list-item ha-checkbox, ha-list-item ha-icon-button, ha-list-item ha-button {
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
      ha-list-item .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      ha-list-item .chevron.expanded {
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
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], DialogSelectEntities.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "_params", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "_search", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "_filter", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "_width", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "_height", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "expandedGroups", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "options", void 0);
    __decorate([
        t$1()
    ], DialogSelectEntities.prototype, "scheduleEntities", void 0);
    DialogSelectEntities = __decorate([
        e$3('dialog-select-entities')
    ], DialogSelectEntities);

    var dialogSelectEntities = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectEntities () { return DialogSelectEntities; }
    });

    let SchedulerChip = class SchedulerChip extends s {
        constructor() {
            super(...arguments);
            this.active = false;
        }
        render() {
            return x `
      <div class="chip ${this.active ? 'active' : ''}" @click=${this._handleClick}>
        <div class="overlay"></div>
        ${this.renderIcon()}
        <span class="value"><slot></slot></span>
        ${this.renderTrailingIcon()}
      </div>
    `;
        }
        renderIcon() {
            if (!this.icon && !this.toggleable && !this.useStateIcon)
                return A;
            if (this.toggleable) {
                return x `
        <div class="icon">
          <ha-icon
            icon="mdi:check"
          ></ha-icon>
        </div>
      `;
            }
            if (this.useStateIcon) {
                let stateObj = this.hass.states[this.value || ''];
                return x `
          <div class="icon filled">
            ${stateObj
                ? x `<ha-state-icon .stateObj=${stateObj} .hass=${this.hass}></ha-state-icon>`
                : x `<ha-icon icon="mdi:help-circle-outline"></ha-icon>
            `}
          </div>
        `;
            }
            return x `
        <div class="icon filled">
          <ha-icon
            .icon=${this.icon}
          ></ha-icon>
        </div>
      `;
        }
        renderTrailingIcon() {
            const uniqueId = `icn_${Math.random().toString(36).substring(2, 9)}`;
            if (!this.removable && !this.badge)
                return A;
            if (this.badge) {
                return x `
        <div class="badge">
          ${this.badge}
        </div>
      `;
            }
            return x `
        <div class="trailing-icon" @click=${this._iconClick}>
          <ha-icon icon="mdi:close" id="${uniqueId}"></ha-icon>
          ${!this.disabled
            ? x `<ha-tooltip for="${uniqueId}">${hassLocalize('ui.common.remove', this.hass)}</ha-tooltip>`
            : A}
        </div>
      `;
        }
        _handleClick(ev) {
            if (this.disabled)
                return;
            if (this.toggleable) {
                this.active = !this.active;
                const myEvent = new CustomEvent('click', {
                    detail: {
                        active: this.active,
                        value: this.value,
                    }
                });
                this.dispatchEvent(myEvent);
            }
            else if (this.selectable) {
                const myEvent = new CustomEvent('click', {
                    detail: {
                        value: this.value,
                    }
                });
                this.dispatchEvent(myEvent);
            }
            ev.stopPropagation();
        }
        _iconClick(ev) {
            ev.stopPropagation();
            if (this.disabled)
                return;
            const myEvent = new CustomEvent('icon-clicked', {
                detail: {
                    value: this.value,
                }
            });
            this.dispatchEvent(myEvent);
        }
        static get styles() {
            return i$4 `
      :host {
        margin: 4px;
      }
      .chip {
        display: inline-flex;
        position: relative;
        height: var(--chip-height, 32px);
        background: none;
        user-select: none;
        z-index: 0;
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
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], SchedulerChip.prototype, "hass", void 0);
    __decorate([
        n$2({ type: String })
    ], SchedulerChip.prototype, "icon", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "useStateIcon", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "selectable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "removable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "toggleable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "active", void 0);
    __decorate([
        n$2({ type: String })
    ], SchedulerChip.prototype, "badge", void 0);
    __decorate([
        n$2({ type: String })
    ], SchedulerChip.prototype, "value", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChip.prototype, "disabled", void 0);
    SchedulerChip = __decorate([
        e$3('scheduler-chip')
    ], SchedulerChip);

    let SchedulerChipSet = class SchedulerChipSet extends s {
        constructor() {
            super(...arguments);
            this.value = [];
        }
        render() {
            if (!this.items)
                return x ``;
            return x `
      ${Object.values(this.items).map(e => this.renderChipitem(e))}
    `;
        }
        renderChipitem(item) {
            const isInvalidEntity = item.useStateIcon && !Object.keys(this.hass.states).includes(item.value || '');
            return x `
      <scheduler-chip
        .hass=${this.hass}
        .value=${item.value || item.name}
        .icon=${item.icon}
        ?useStateIcon=${item.useStateIcon}
        ?active=${this.value.includes(item.value || item.name)}
        .badge=${item.badge !== undefined ? String(item.badge) : undefined}
        ?selectable=${this.selectable}
        ?toggleable=${this.toggleable}
        ?removable=${this.removable}
        @click=${this._handleClick}
        @icon-clicked=${this._handleClick}
        ?disabled=${this.disabled}
        style="${isInvalidEntity ? 'text-decoration: line-through' : ''}"
      >
        ${item.name}
      </scheduler-chip>
      `;
        }
        _handleClick(ev) {
            if (this.disabled)
                return;
            if (this.toggleable) {
                const value = ev.detail.value;
                const active = ev.detail.active;
                if (this.value.includes(value) && !active)
                    this.value = this.value.filter(e => e != value);
                else if (!this.value.includes(value) && value)
                    this.value = [...this.value, value];
                const myEvent = new CustomEvent('value-changed', { detail: this.value });
                this.dispatchEvent(myEvent);
            }
            else {
                const myEvent = new CustomEvent('value-changed', { detail: ev.detail.value });
                this.dispatchEvent(myEvent);
            }
        }
        static get styles() {
            return i$4 `
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
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], SchedulerChipSet.prototype, "hass", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerChipSet.prototype, "items", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerChipSet.prototype, "value", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChipSet.prototype, "selectable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChipSet.prototype, "toggleable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChipSet.prototype, "removable", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerChipSet.prototype, "disabled", void 0);
    SchedulerChipSet = __decorate([
        e$3('scheduler-chip-set')
    ], SchedulerChipSet);

    const SEARCH_KEYS = [
        { name: "primary", weight: 10 },
        { name: "secondary", weight: 8 }
    ];
    let SchedulerEntityPicker = class SchedulerEntityPicker extends s {
        constructor() {
            super(...arguments);
            this.value = [];
            this.multiple = false;
            this.disabled = false;
            this.multipleMode = false;
            this.scheduleEntities = [];
            this._valueRenderer = (value) => {
                if (Array.isArray(value))
                    value = value.length ? [...value].pop() : "";
                const entityId = value || "";
                const stateObj = this.hass.states[entityId];
                if (!stateObj) {
                    return x `
        <ha-svg-icon
          slot="start"
          .path=${mdiShape}
          style="margin: 0 4px"
        ></ha-svg-icon>
        <span slot="headline">${entityId}</span>
      `;
                }
                const item = this._parseEntityItem(entityId);
                return x `
      ${item.icon
                ? x `
        <ha-icon
          slot="start"
          icon="${item.icon}"
        ></ha-icon>
       `
                : x `
      <state-badge
        .hass=${this.hass}
        .stateObj=${stateObj}
        slot="start"
        color="var(--icon-primary-color)"
      ></state-badge>
      `}
      <span slot="headline">${item.primary}</span>
      <span slot="supporting-text">${item.secondary}</span>
    `;
            };
            this._rowRenderer = (item) => {
                const entityId = item.id || "";
                const stateObj = this.hass.states[entityId];
                return x `
      <ha-combo-box-item type="button" compact>
        ${item.icon ? x `
          <ha-icon
            slot="start"
            icon="${item.icon}"
          ></ha-icon>
        ` : stateObj
                ? x `
          <state-badge
            .hass=${this.hass}
            .stateObj=${stateObj}
            slot="start"
            color="var(--icon-primary-color)"
          ></state-badge>
        ` : x `
          <ha-svg-icon
            slot="start"
            .path=${mdiShape}
          ></ha-svg-icon>
        `}
        <span slot="headline">${item.primary}</span>
        ${item.secondary
                ? x `<span slot="supporting-text">${item.secondary}</span>`
                : A}
      </ha-combo-box-item>
    `;
            };
            this._filteredItems = () => {
                let entityIds = Object.keys(this.hass.states);
                if (this.domain) {
                    entityIds = entityIds.filter(e => computeDomain(e) == this.domain);
                }
                if (this.multiple) {
                    entityIds = entityIds.filter(e => { var _a; return !((_a = this.value) === null || _a === void 0 ? void 0 : _a.includes(e)); });
                }
                if (this.config) {
                    entityIds = entityIds.filter(entityId => {
                        return ((this.config.include || DEFAULT_INCLUDED_DOMAINS).some(e => matchPattern(e, entityId)) ||
                            Object.keys(this.config.customize || {}).some(e => matchPattern(e, entityId))) &&
                            !(this.config.exclude || []).some(e => matchPattern(e, entityId));
                    });
                }
                entityIds = entityIds.filter(e => !this.scheduleEntities.includes(e));
                if (this.filterFunc)
                    entityIds = entityIds.filter(e => this.filterFunc(this.hass.states[e]));
                // if (this.initialValue && !entityIds.includes(this.initialValue) && !this.valueMultiple.includes(this.initialValue)) {
                //   entityIds = [...entityIds, this.initialValue];
                // }
                let entities = entityIds.map(e => this._parseEntityItem(e));
                return entities;
            };
        }
        async firstUpdated() {
            this.scheduleEntities = Object.entries(await fetchItems(this.hass)).map(([, val]) => val.entity_id);
            if (this.domain && this.config && !entityIncludedByConfig(this.domain, this.config)) {
                this.config = Object.assign(Object.assign({}, this.config), { include: [...(this.config.include || []), this.domain], exclude: [...(this.config.exclude || []).filter(e => !e.startsWith(this.domain))] });
            }
            this._autoSelectIfSingleEntity();
        }
        updated(changedProps) {
            super.updated(changedProps);
            // Relevant for type change in conditions
            if (changedProps.has("domain")) {
                this._autoSelectIfSingleEntity();
            }
        }
        _autoSelectIfSingleEntity() {
            if (this.value && this.value.length > 0)
                return;
            const items = this._filteredItems();
            if (items.length === 1) {
                this.value = [items[0].id];
                fireEvent(this, "value-changed", { value: this.value });
            }
        }
        render() {
            var _a, _b;
            return x `
      ${this.renderChips()}

      ${!((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) || this.multipleMode || !this.multiple ?
            x `

      <ha-generic-picker
        .label=${((_b = this.value) === null || _b === void 0 ? void 0 : _b.length) ? "" : hassLocalize("ui.components.entity.entity-picker.choose_entity", this.hass)}
        .hass=${this.hass}
        .autofocus=${this.autofocus}
        .notFoundLabel=${hassLocalize("ui.components.combo-box.no_match", this.hass)}
        .value=${this.multiple ? "" : this.value}
        .valueRenderer=${this._valueRenderer}
        .rowRenderer=${this._rowRenderer}
        .disabled=${this.disabled}
        .getItems=${this._filteredItems}
        .searchKeys=${SEARCH_KEYS}
        .searchLabel=${hassLocalize("ui.dialogs.quick-bar.filter_placeholder", this.hass)}
        @value-changed=${this._valueChanged}
        hide-clear-icon
        allow-custom-value
      >
      </ha-generic-picker>
      ` : A}
    `;
        }
        renderChips() {
            if (!this.multiple)
                return A;
            let items = (this.value || []).map(entityId => {
                const item = this._parseEntityItem(entityId);
                return {
                    name: item.primary,
                    value: entityId,
                    useStateIcon: item.icon ? false : true,
                    icon: item.icon
                };
            });
            return x `
      <div class="wrapper">
      <scheduler-chip-set
        .hass=${this.hass}
        .items=${items}
        removable
        @value-changed=${this._removeClick}
        ?disabled=${this.disabled}
      >
      </scheduler-chip-set>
      <div class="column-right">
      ${items.length ? x `
      <ha-icon-button
        @click=${(ev) => { this.multipleMode = !this.multipleMode; ev.target.blur(); }}
        .path=${this.multipleMode ? mdiChevronUp : mdiChevronDown}
        slot="end"
      ></ha-icon-button>
      ` : A}
      </div>
      </div>
      `;
        }
        _valueChanged(ev) {
            let value = ev.detail.value;
            const target = ev.currentTarget;
            if (!value)
                return;
            this.value = [...(this.value || []), value];
            if (this.multiple) {
                target.value = "";
            }
            fireEvent(this, "value-changed", { value: this.value });
            ev.stopPropagation();
        }
        _removeClick(ev) {
            const value = ev.detail;
            this.value = (this.value || []).filter(e => e !== value);
            fireEvent(this, 'value-changed', { value: this.value });
        }
        _parseEntityItem(entityId) {
            var _a, _b, _c, _d;
            const customConfig = Object.entries(((_a = this.config) === null || _a === void 0 ? void 0 : _a.customize) || {}).filter(([k, _v]) => matchPattern(k, entityId)).map(([_k, v]) => v);
            const customEntityName = (_b = customConfig.find(e => 'name' in e)) === null || _b === void 0 ? void 0 : _b.name;
            const customEntityIcon = (_c = customConfig.find(e => 'icon' in e)) === null || _c === void 0 ? void 0 : _c.icon;
            return {
                id: entityId,
                primary: customEntityName || friendlyName(entityId, (_d = this.hass.states[entityId]) === null || _d === void 0 ? void 0 : _d.attributes),
                secondary: entityId,
                icon: customEntityIcon
            };
        }
    };
    SchedulerEntityPicker.styles = i$4 `
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
  `;
    __decorate([
        n$2({ attribute: false })
    ], SchedulerEntityPicker.prototype, "hass", void 0);
    __decorate([
        n$2()
    ], SchedulerEntityPicker.prototype, "domain", void 0);
    __decorate([
        n$2()
    ], SchedulerEntityPicker.prototype, "config", void 0);
    __decorate([
        n$2({ type: Array })
    ], SchedulerEntityPicker.prototype, "value", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerEntityPicker.prototype, "multiple", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerEntityPicker.prototype, "disabled", void 0);
    __decorate([
        t$1()
    ], SchedulerEntityPicker.prototype, "multipleMode", void 0);
    __decorate([
        t$1()
    ], SchedulerEntityPicker.prototype, "scheduleEntities", void 0);
    SchedulerEntityPicker = __decorate([
        e$3("scheduler-entity-picker")
    ], SchedulerEntityPicker);

    let SchedulerCollapsibleSection = class SchedulerCollapsibleSection extends s {
        constructor() {
            super(...arguments);
            this.expanded = false;
            this.disabled = false;
            this.idx = -1;
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
            return i$4 `
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
    `;
        }
    };
    __decorate([
        n$2({ type: Boolean, reflect: true })
    ], SchedulerCollapsibleSection.prototype, "expanded", void 0);
    __decorate([
        n$2({ type: Boolean, reflect: true })
    ], SchedulerCollapsibleSection.prototype, "disabled", void 0);
    __decorate([
        n$2({ attribute: true })
    ], SchedulerCollapsibleSection.prototype, "idx", void 0);
    __decorate([
        n$2({ type: CustomEvent })
    ], SchedulerCollapsibleSection.prototype, "openClose", void 0);
    SchedulerCollapsibleSection = __decorate([
        e$3('scheduler-collapsible-section')
    ], SchedulerCollapsibleSection);
    let SchedulerCollapsibleGroup = class SchedulerCollapsibleGroup extends s {
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
            const sections = this.querySelectorAll('scheduler-collapsible-section');
            this._numItems = sections.length;
        }
        toggleActiveSection(ev) {
            if (this.disabled)
                return;
            const el = ev.target;
            const itemIdx = Number(el.getAttribute('idx'));
            const expanded = el.getAttribute("expanded") === "true";
            if (!expanded)
                this.updateOpenedItem(itemIdx);
            else
                this.updateOpenedItem(-1);
        }
        updateOpenedItem(idx) {
            const sections = this.querySelectorAll('scheduler-collapsible-section');
            sections.forEach(function (item) {
                const itemIdx = Number(item.getAttribute('idx'));
                if (itemIdx !== idx && item.getAttribute('expanded'))
                    item.removeAttribute('expanded');
                else if (itemIdx === idx && !item.getAttribute('expanded'))
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
        n$2()
    ], SchedulerCollapsibleGroup.prototype, "disabled", void 0);
    __decorate([
        t$1()
    ], SchedulerCollapsibleGroup.prototype, "_openedItem", void 0);
    __decorate([
        t$1()
    ], SchedulerCollapsibleGroup.prototype, "_numItems", void 0);
    SchedulerCollapsibleGroup = __decorate([
        e$3('scheduler-collapsible-group')
    ], SchedulerCollapsibleGroup);

    const NONE = "__NONE_OPTION__";
    let SchedulerComboSelector = class SchedulerComboSelector extends s {
        constructor() {
            super(...arguments);
            this.disabled = false;
        }
        render() {
            var _a;
            if (this.config.select) {
                const config = this.config.select;
                const values = [...[this.value || []]].flat().map(String);
                const removeClick = (ev) => {
                    const value = ev.detail;
                    this.value = values.filter(e => e != value);
                    fireEvent(this, "value-changed", { value: this.value });
                };
                const renderChips = () => {
                    let items = values.map(value => Object({
                        name: value,
                        value: value
                    }));
                    return x `
        <scheduler-chip-set
          .hass=${this.hass}
          .items=${items}
          removable
          @value-changed=${removeClick}
        >
        </scheduler-chip-set>`;
                };
                const computeItemLabel = (value) => {
                    var _a;
                    let translationKey = (_a = this.config.select) === null || _a === void 0 ? void 0 : _a.translation_key;
                    let label = '';
                    if (translationKey)
                        label = hassLocalize(translationKey.replace('${value}', value), this.hass, false);
                    if (!label)
                        label = value;
                    return label;
                };
                const comboBoxOption = (option) => {
                    if (typeof option === 'object') {
                        return {
                            id: option.value,
                            primary: computeItemLabel(option.label),
                            icon: option.icon
                        };
                    }
                    else {
                        return {
                            id: option,
                            primary: computeItemLabel(option)
                        };
                    }
                };
                let options = [...config === null || config === void 0 ? void 0 : config.options].map(comboBoxOption);
                let selectedValue = [this.value || []].flat().map(String);
                options = [...options, ...selectedValue.filter(e => !options.find(f => f.id == e)).map(comboBoxOption)];
                if (Array.isArray(this.value))
                    options = options.filter(e => typeof e === 'object' ? !values.includes(e.id) : !values.includes(e));
                const renderOptions = () => {
                    if (!options.length)
                        return x `
          <ha-dropdown-item .value=${NONE}>
            ${this.hass.localize("ui.components.combo-box.no_match")}
          </ha-dropdown-item>
        `;
                    options.some(e => e.icon);
                    return options.map(option => x `
          <ha-dropdown-item
            .value=${option.id}
          >
            ${option.icon ? x `<ha-icon slot="icon" .icon=${option.icon}></ha-icon>` : A}
            <span>${option.primary}</span>
          </ha-dropdown-item>
        `);
                };
                const _handleShow = (ev) => {
                    let dropdown = ev.target;
                    let picker = dropdown.querySelector('ha-picker-field');
                    this.style.setProperty("--select-menu-width", `${picker.offsetWidth}px`);
                    dropdown.classList.add("opened");
                };
                const _handleHide = (ev) => {
                    let dropdown = ev.target;
                    dropdown.classList.remove("opened");
                };
                const _handleSelect = (ev) => {
                    const value = ev.detail.item.value;
                    if (value == NONE || Array.isArray(this.value)) {
                        ev.target.value = undefined;
                        if (value == NONE)
                            return;
                    }
                    this._valueChanged(new CustomEvent('value-changed', { detail: { value: value } }));
                };
                const _clearValue = () => {
                    this._valueChanged(new CustomEvent('value-changed', { detail: { value: undefined } }));
                };
                const selectedOption = isDefined(this.value) && !Array.isArray(this.value)
                    ? options.find(e => e.id === this.value)
                    : undefined;
                const value = selectedOption
                    ? selectedOption.primary || selectedOption.id
                    : isDefined(this.value) && !Array.isArray(this.value)
                        ? this.value
                        : undefined;
                return x `
        <div class="select-wrapper">
          ${config.multiple ? x `
          <div class="chips">
          ${renderChips()}
          </div>
          ` : ''}
          <ha-dropdown
            placement="bottom"
            @wa-select=${_handleSelect}
            @wa-show=${_handleShow}
            @wa-hide=${_handleHide}
          >
            <ha-picker-field
              slot="trigger"
              type="button"
              compact
              @clear=${_clearValue}
              .disabled=${this.disabled}
              .hideClearIcon=${this.disabled || !isDefined(this.value) || (Array.isArray(this.value) && !this.value.length)}
              .value=${value}
              .icon=${selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.icon}
            >
            </ha-picker-field>
            ${renderOptions()}
          </ha-dropdown>
        </div>
      `;
            }
            else if (this.config.number) {
                const config = this.config.number;
                const boxMode = config.mode == 'box' || !isDefined(config.min) || !isDefined(config.max);
                let value = this.value;
                if (!boxMode && typeof value !== 'number')
                    value = config.min;
                if (typeof config.scale_factor == 'number')
                    value = (Number(value) / config.scale_factor);
                if (typeof (config === null || config === void 0 ? void 0 : config.step) === 'number')
                    value = Math.round(Number(value) / config.step) * config.step;
                if (isDefined(value))
                    value = roundFloat(Number(value));
                const sliderValueChanged = (ev) => {
                    let value = Number(ev.target.value);
                    if (typeof config.scale_factor == 'number')
                        value = value * config.scale_factor;
                    if (typeof (config === null || config === void 0 ? void 0 : config.step) === 'number')
                        value = Math.round(value / config.step) * config.step;
                    value = roundFloat(value);
                    this._valueChanged(new CustomEvent('value-changed', { detail: { value: value } }));
                    ev.stopPropagation();
                };
                const boxValueChanged = (ev) => {
                    ev.stopPropagation();
                    let input = ev.target.value;
                    const value = input === "" || isNaN(Number(input)) ? undefined : Number(input);
                    this._valueChanged(new CustomEvent('value-changed', { detail: { value: value } }));
                };
                const validateBoxInput = (value, _nativeValidity) => {
                    let valid = config.step && Number(config.step) % 1 == 0
                        ? value.match(/^-?\d+$/) !== null
                        : value.match(/^[+-]?\d+([.,]\d+)?$/) !== null;
                    if (valid && isDefined(config.min))
                        valid = Number(value) >= config.min;
                    if (valid && isDefined(config.max))
                        valid = Number(value) <= config.max;
                    return {
                        valid: valid,
                        customError: !valid
                    };
                };
                return x `
        <div class="slider-wrapper">
        ${boxMode
                ? x `
        <ha-input
          .inputMode=${config.step && Number(config.step) % 1 == 0 ? "numeric" : "decimal"}
          .min=${config.min}
          .max=${config.max}
          .value=${value || ""}
          .step=${(_a = config.step) !== null && _a !== void 0 ? _a : 1}
          .disabled=${this.disabled}
          .required=${true}
          .suffix=${config.unit}
          type="number"
          autoValidate
          .validityTransform=${validateBoxInput}
          @input=${boxValueChanged}
        >
        </ha-input>
        `
                : x `
        <ha-slider
          .min=${config.min}
          .max=${config.max}
          .step=${config.step || 1}
          .value=${value}
          @change=${sliderValueChanged}
          ?disabled=${this.disabled}
        ></ha-slider>
        <span class="value">${value} ${config.unit || ''}</span>
        `}
        </div>
      `;
            }
            else if (this.config.text) {
                this.config.text;
                return x `
        <div class="textfield-wrapper">
          <ha-input
            .value=${this.value || ""}
            @input=${this._valueChanged}
            .placeholder=""
            ?disabled=${this.disabled}
          ></ha-input> 
        </div>     
      `;
            }
            else if (this.config.boolean) {
                let selector = {
                    select: {
                        options: [
                            {
                                value: 'true',
                                label: 'True',
                                icon: 'mdi:check'
                            },
                            {
                                value: 'false',
                                label: 'False',
                                icon: 'mdi:close'
                            }
                        ]
                    }
                };
                const valueChanged = (ev) => {
                    let value = isDefined(ev.detail.value) ? ev.detail.value === 'true' : undefined;
                    ev.stopPropagation();
                    this._valueChanged(new CustomEvent('value-changed', { detail: { value: value } }));
                };
                return x `
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${selector}
          .value=${typeof this.value == 'boolean' ? this.value ? 'true' : 'false' : undefined}
          @value-changed=${valueChanged}
          ?disabled=${this.disabled}
        >
        </scheduler-combo-selector>
      `;
            }
            return x ``;
        }
        _valueChanged(ev) {
            ev.stopPropagation();
            if (Array.isArray(this.value)) {
                let value = ev.detail.value;
                if (!value)
                    return;
                this.value = [...this.value, value];
            }
            else if (ev.detail) {
                let value = ev.detail.value;
                if (value === undefined)
                    value = null;
                this.value = value;
            }
            else {
                this.value = ev.target.value;
            }
            fireEvent(this, "value-changed", { value: this.value });
        }
    };
    SchedulerComboSelector.styles = i$4 `
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
      div.slider-wrapper ha-input {
        --ha-input-input-width: 100px;
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
      div.textfield-wrapper ha-input {
        display: flex;
        width: 100%;
      }
      ha-dropdown::part(menu) {
        min-width: var(--select-menu-width);
      }
  `;
    __decorate([
        n$2({ attribute: false })
    ], SchedulerComboSelector.prototype, "hass", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerComboSelector.prototype, "config", void 0);
    __decorate([
        n$2()
    ], SchedulerComboSelector.prototype, "value", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerComboSelector.prototype, "disabled", void 0);
    SchedulerComboSelector = __decorate([
        e$3("scheduler-combo-selector")
    ], SchedulerComboSelector);

    let SchedulerCardEditor = class SchedulerCardEditor extends s {
        constructor() {
            super(...arguments);
            this._config = {};
            this.title = "";
            this.tagOptions = [];
            this.customTagValue = '';
        }
        setConfig(config) {
            this._config = Object.assign({}, config);
        }
        async firstUpdated() {
            this.title = typeof this._config.title == "string"
                ? this._config.title
                : "";
            const tagOptions = (await fetchTags(this.hass)).map(e => e.name);
            tagOptions.sort(sortByName);
            this.tagOptions = tagOptions;
        }
        render() {
            var _a, _b, _c, _d, _e, _f;
            const timeStepSelector = {
                number: {
                    min: 0,
                    max: 30,
                    step: 1,
                    unit_of_measurement: localize('ui.panel.card_editor.fields.time_step.unit_minutes', this.hass)
                }
            };
            const tagSelector = {
                select: {
                    options: this.tagOptions,
                    multiple: true,
                    custom_value: true
                }
            };
            return x `
      <div class="card-config">

        <ha-button @click=${this._showIncludedEntitiesDialog} outlined>
          ${localize('ui.panel.card_editor.fields.entities.button_label', this.hass)}
          <ha-svg-icon
            slot="trailingIcon"
            .path=${mdiArrowRight}
          ></ha-svg-icon>
        </ha-button>

        <scheduler-settings-row ?showPrefix=${true}>
          <ha-checkbox
            slot="prefix"
            ?checked=${this._config.title !== false}
            @change=${this._setEnableTitle}
          >
          </ha-checkbox>
          <span slot="heading">${localize('ui.panel.card_editor.fields.title.heading', this.hass)}</span>

          <ha-input
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${localize('ui.panel.common.title', this.hass)}
            ?disabled=${this._config.title === false}
          ></ha-input>

        </scheduler-settings-row>

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
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.show_toggle_switches.heading', this.hass)}">
            <ha-switch
              ?checked=${this._config.show_toggle_switches !== false}
              @change=${(ev) => {
            this._updateConfig({ show_toggle_switches: ev.target.checked });
        }}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

        <scheduler-settings-row>
          <span slot="heading">${localize('ui.panel.card_editor.fields.time_step.heading', this.hass)}</span>

          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${timeStepSelector}
            .value=${this._config.time_step || DEFAULT_TIME_STEP}
            @value-changed=${(ev) => { this._updateConfig({ time_step: ev.detail.value }); }}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>

        <span>${localize('ui.panel.card_editor.fields.default_editor.heading', this.hass)}</span>
        <div class="two-columns">
          <div class="column">
            <ha-formfield label="${localize('ui.panel.card_editor.fields.default_editor.options.single', this.hass)}">
              <ha-radio
                name="default_editor"
                value="${EditorMode.Single}"
                @change=${() => { this._updateConfig({ default_editor: EditorMode.Single }); }}
                ?checked=${this._config.default_editor != EditorMode.Scheme}
              >
              </ha-radio>
            </ha-formfield>
          </div>
          <div class="column">
            <ha-formfield label="${localize('ui.panel.card_editor.fields.default_editor.options.scheme', this.hass)}">
              <ha-radio
                name="default_editor"
                value="${EditorMode.Scheme}"
                @change=${() => { this._updateConfig({ default_editor: EditorMode.Scheme }); }}
                ?checked=${this._config.default_editor == EditorMode.Scheme}
              >
              </ha-radio>
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
              ?checked=${[this._config.sort_by || DEFAULT_SORT_BY].flat().includes('relative-time')}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.sort_by.options.title', this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by || DEFAULT_SORT_BY].flat().includes('title')}
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
              ?checked=${[((_a = this._config.display_options) === null || _a === void 0 ? void 0 : _a.primary_info) || DEFAULT_PRIMARY_INFO_DISPLAY].flat().includes('default')}
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
              ?checked=${[((_b = this._config.display_options) === null || _b === void 0 ? void 0 : _b.primary_info) || DEFAULT_PRIMARY_INFO_DISPLAY].flat().includes('{entity}: {action}')}
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
              ?checked=${[((_c = this._config.display_options) === null || _c === void 0 ? void 0 : _c.secondary_info) || DEFAULT_SECONDARY_INFO_DISPLAY].flat().includes('relative-time')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.time', this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[((_d = this._config.display_options) === null || _d === void 0 ? void 0 : _d.secondary_info) || DEFAULT_SECONDARY_INFO_DISPLAY].flat().includes('time')}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.days', this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[((_e = this._config.display_options) === null || _e === void 0 ? void 0 : _e.secondary_info) || DEFAULT_SECONDARY_INFO_DISPLAY].flat().includes('days')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks', this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[((_f = this._config.display_options) === null || _f === void 0 ? void 0 : _f.secondary_info) || DEFAULT_SECONDARY_INFO_DISPLAY].flat().includes('additional-tasks')}
            >
            </ha-checkbox>
          </ha-formfield>
        </div>

        </div>

        <scheduler-settings-row>
          <span slot="heading">${localize('ui.panel.card_editor.fields.tags.heading', this.hass)}</span>
          <div style="display: flex; flex: 1; flex-direction: column">
            <scheduler-combo-selector
              .hass=${this.hass}
              .config=${tagSelector}
              .value=${[this._config.tags || []].flat()}
              @value-changed=${(ev) => { this._updateConfig({ tags: ev.detail.value }); }}
            >
            </scheduler-combo-selector>
              
            <ha-dropdown
              @wa-after-hide=${(ev) => { ev.stopPropagation(); ev.target.querySelector("ha-button").blur(); }}
              @click=${(ev) => { ev.preventDefault(); ev.stopImmediatePropagation(); }}
              @wa-after-show=${(ev) => { ev.target.querySelector("ha-input").focus(); }}
              placement="bottom-start"
            >
              <ha-button appearance="plain" slot="trigger">
                <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                ${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
              </ha-button>

              <div style="display: flex; align-items: center; padding: 0x 2px 0px 8px">
                <ha-input
                  .value=${this.customTagValue}
                  .label=${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
                  @input=${(ev) => { this.customTagValue = ev.currentTarget.value; }}
                  .placeholder=""
                ></ha-input> 
                <ha-button
                  appearance="plain"
                  @click=${this._customTagConfirmClick}
                >
                  ${hassLocalize('ui.common.ok', this.hass)}
                </ha-button>
              </div>
            </ha-dropdown>
          </div>
        </scheduler-settings-row>

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
            let config = [((_a = this._config) === null || _a === void 0 ? void 0 : _a.sort_by) || DEFAULT_SORT_BY].flat();
            config = config.filter(e => e == 'state');
            if (!config.includes(value))
                config = [...config, value];
            this._updateConfig({ sort_by: config });
        }
        _setDisplayOptionsPrimary(ev) {
            var _a;
            const value = ev.target.value;
            const displayOptions = Object.assign(Object.assign({}, (_a = this._config) === null || _a === void 0 ? void 0 : _a.display_options), { primary_info: value });
            this._updateConfig({ display_options: displayOptions });
        }
        _setDisplayOptionsSecondary(ev) {
            var _a;
            const value = ev.target.value;
            const checked = ev.target.checked;
            let displayOptions = Object.assign({}, (_a = this._config) === null || _a === void 0 ? void 0 : _a.display_options);
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
            let domains = (this._config.include || []).filter(e => !e.includes('.'));
            let entities = (this._config.include || []).filter(e => e.includes('.'));
            const extraConfig = await loadConfigFromEntityRegistry(this.hass);
            let config = Object.assign(Object.assign({}, this._config), { customize: Object.assign(Object.assign({}, extraConfig), (this._config.customize || {})) });
            await new Promise(resolve => {
                const params = {
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out),
                    domains: domains,
                    entities: entities,
                    cardConfig: config
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
        _customTagConfirmClick(ev) {
            let target = ev.target;
            target = target.parentElement;
            target = target.parentElement;
            const triggerBtn = target.querySelector("ha-button");
            triggerBtn.click();
            let value = String(this.customTagValue).trim();
            if (value.length) {
                let tags = [this._config.tags || []].flat();
                tags = [...new Set([...tags, value])];
                this._updateConfig({ tags: tags });
            }
            this.customTagValue = "";
        }
        _updateConfig(changes) {
            if (!this._config)
                return;
            this._config = Object.assign(Object.assign({}, this._config), changes);
            fireEvent(this, 'config-changed', { config: this._config });
        }
    };
    SchedulerCardEditor.styles = i$4 `
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

    ha-input {
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
    ha-dropdown {
      display: block;
    }
  `;
    __decorate([
        n$2({ attribute: false })
    ], SchedulerCardEditor.prototype, "hass", void 0);
    __decorate([
        n$2()
    ], SchedulerCardEditor.prototype, "_config", void 0);
    __decorate([
        n$2()
    ], SchedulerCardEditor.prototype, "title", void 0);
    __decorate([
        n$2()
    ], SchedulerCardEditor.prototype, "tagOptions", void 0);
    __decorate([
        t$1()
    ], SchedulerCardEditor.prototype, "customTagValue", void 0);
    SchedulerCardEditor = __decorate([
        e$3("scheduler-card-editor")
    ], SchedulerCardEditor);

    const EditorDialogStyles = i$4 `
  ha-dialog {
    --justify-action-buttons: space-between;
    --dialog-container-padding: var(--safe-area-inset-top, 0)
      var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
      var(--safe-area-inset-left, 0);
    --dialog-surface-padding: 0px;
    --dialog-content-padding: 0px;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --dialog-container-padding: 0px;
      --dialog-surface-padding: var(--safe-area-inset-top, 0)
        var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
        var(--safe-area-inset-left, 0);
      --vertical-align-dialog: flex-end;
      --ha-dialog-border-radius: var(--ha-border-radius-square);
    }
  }
  @media all and (min-width: 600px) and (min-height: 501px) {
    ha-dialog {
      --dialog-surface-margin-top: 40px;
      --vertical-align-dialog: flex-start;
    }
  }
  .buttons {
    box-sizing: border-box;
    display: flex;
    padding: 16px 24px;
    justify-content: space-between;
    background-color: var(--mdc-theme-surface, #fff);
    border-top: 1px solid var(--divider-color);
  }
  .content {
    padding: 0px 24px 16px 24px;
  }
`;
    i$4 `
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

    const isSupportedSelector = (action, field, hass, customize) => {
        var _a;
        const service = action.service;
        const entityId = (_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id;
        const config = actionConfig(action, customize);
        if (!config || !config.fields || !Object.keys(config.fields).includes(field))
            return false;
        const fieldConfig = config.fields[field];
        if (selectorConfig(service, entityId, field, hass, customize) === null)
            return false;
        if (Object.keys(action.service_data || {}).includes(field)) {
            //allow modifying a previously set parameter 
            return true;
        }
        if (fieldConfig.supported_features) {
            const entityIds = [entityId || []].flat();
            if (!entityIds.every(e => {
                if (!Object.keys(hass.states).includes(e))
                    return false;
                const stateObj = hass.states[e];
                return ((stateObj.attributes.supported_features || 0) & fieldConfig.supported_features) > 0;
            }))
                return false;
        }
        if (computeDomain(service) == 'light') {
            //for light entities use color_modes for determining whether dimming is supported
            if (![entityId || []].flat().every(e => {
                if (!Object.keys(hass.states).includes(e))
                    return false;
                const stateObj = hass.states[e];
                const colorModes = stateObj.attributes.supported_color_modes || [];
                if (field == 'brightness')
                    return colorModes.filter(e => e != 'onoff').length;
                else
                    return true;
            }))
                return false;
        }
        return true;
    };

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
    const validateAction = (action, hass, customize) => {
        var _a;
        const config = actionConfig(action, customize);
        if (config === null || config === void 0 ? void 0 : config.target) {
            if (!((_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id))
                return ValidationError.MissingTargetEntity;
        }
        if (config === null || config === void 0 ? void 0 : config.fields) {
            if (!Object.entries(config.fields)
                .filter(([field]) => isSupportedSelector(action, field, hass, customize))
                .every(([field, fieldConfig]) => {
                var _a, _b;
                let selector = selectorConfig(action.service, (_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id, field, hass, customize);
                const isOptional = selector.number && ((_b = selector.number) === null || _b === void 0 ? void 0 : _b.optional)
                    ? true
                    : fieldConfig.optional;
                if (!Object.keys(action.service_data).includes(field) && !isOptional)
                    return false;
                else if (!isDefined(action.service_data[field]) && !isOptional)
                    return false;
                return true;
            }))
                return ValidationError.MissingServiceParameter;
        }
        return null;
    };
    const validateSchedule = (schedule, hass, customize) => {
        let errors = [];
        errors = [...errors, ...schedule.entries.map(e => validateTimebar(e.slots, hass)).filter(e => e !== null)];
        let actions = schedule.entries.map(e => e.slots.map(f => f.actions)).flat().flat();
        if (!actions.length)
            errors = [...errors, ValidationError.MissingAction];
        errors = [...errors, ...actions.map(e => validateAction(e, hass, customize)).filter(e => e !== null)];
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
            // if (!slot.conditions.items.length) slot = <Timeslot>Object.fromEntries(
            //   Object.entries(slot).filter(([key,]) => key != 'conditions')
            // );
            return slot;
        };
        const convertEntry = (entry) => {
            return Object.assign(Object.assign({}, entry), { slots: entry.slots.map(convertSlot).filter(e => e !== null) });
        };
        schedule = Object.assign(Object.assign({}, schedule), { entries: schedule.entries.map(convertEntry) });
        let output = {
            weekdays: schedule.entries[0].weekdays.map(parseWeekdays),
            timeslots: schedule.entries[0].slots.map(parseTimeslot),
            name: schedule.name,
            start_date: schedule.start_date,
            end_date: schedule.end_date,
            repeat_type: schedule.repeat_type,
            tags: schedule.tags || []
        };
        if (schedule.schedule_id)
            output = Object.assign(Object.assign({}, output), { schedule_id: schedule.schedule_id });
        return output;
    };
    const parseWeekdays = (input) => {
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
    const parseTimeslot = (input) => {
        return {
            start: input.start,
            stop: input.stop,
            actions: input.actions.map(e => parseAction(e)).flat(),
            condition_type: input.conditions.items.length
                ? input.conditions.type == TConditionLogicType.And ? 'and' : 'or'
                : undefined,
            conditions: input.conditions.items.length
                ? input.conditions.items
                : undefined,
            track_conditions: input.conditions.track_changes
        };
    };
    const parseAction = (input) => {
        var _a, _b;
        const parseServiceData = (service_data) => {
            return Object.keys(service_data)
                .filter((key => isDefined(service_data[key])))
                .reduce((res, key) => (res[key] = service_data[key], res), {});
        };
        if (!input.target) {
            let output = {
                service: input.service,
                service_data: parseServiceData(input.service_data)
            };
            return output;
        }
        else if (!Array.isArray((_a = input.target) === null || _a === void 0 ? void 0 : _a.entity_id)) {
            let output = {
                service: input.service,
                service_data: parseServiceData(input.service_data),
                entity_id: (_b = input.target) === null || _b === void 0 ? void 0 : _b.entity_id
            };
            return output;
        }
        else {
            let output = input === null || input === void 0 ? void 0 : input.target.entity_id.map((e) => ({
                service: input.service,
                service_data: parseServiceData(input.service_data),
                entity_id: e
            }));
            return output;
        }
    };

    const handleWebsocketError = (err, el, hass) => {
        const params = {
            title: hassLocalize('state_badge.default.error', hass),
            description: x `
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `,
            primaryButtonLabel: hassLocalize('ui.common.ok', hass),
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

    const updateSchedule = (hass, schedule) => {
        const config = exportSchedule(schedule);
        return hass.callApi('POST', 'scheduler/edit', config);
    };

    const convertSchemeToSingle = (schedule) => {
        const convertSlots = (slots) => {
            let idx = slots.findIndex(e => e.actions.length);
            if (idx < 0)
                idx = Math.floor(slots.length / 2);
            let currSlot = Object.assign(Object.assign({}, slots[idx]), { stop: undefined });
            const conditions = currSlot.conditions;
            const startTime = currSlot.start;
            const stopTime = timeToString(addTimeOffset(parseTimeString(startTime), { minutes: 1 }));
            slots = [
                { start: '00:00:00', stop: startTime, actions: [], conditions: conditions },
                currSlot,
                { start: stopTime, stop: '00:00:00', actions: [], conditions: conditions }
            ];
            return slots;
        };
        schedule = Object.assign(Object.assign({}, schedule), { entries: schedule.entries.map(e => Object(Object.assign(Object.assign({}, e), { slots: convertSlots(e.slots) }))) });
        return schedule;
    };

    const defaultSelectorValue = (selector) => {
        if (Object.keys(selector).includes('select') && selector.select) {
            selector.select.options;
            return;
            // return options.length
            //   ? typeof options[0] === 'string' ? options[0] : options[0].value
            //   : '';
        }
        else if (Object.keys(selector).includes('number') && selector.number) {
            const min = selector.number.min;
            return min !== undefined ? min : 0;
        }
        else if (Object.keys(selector).includes('boolean') && selector.boolean) {
            return; // false;
        }
        else if (Object.keys(selector).includes('text') && selector.text) {
            return '';
        }
        else
            return '';
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

    const formatFieldDisplay = (action, field, hass, customize) => {
        var _a;
        const domain = computeDomain(action.service);
        const domainService = computeEntity(action.service);
        let name = hassLocalize(`component.${domain}.services.${domainService}.fields.${field}.name`, hass, false);
        if (!name &&
            hass.services[domain] &&
            hass.services[domain][action.service] &&
            hass.services[domain][action.service].fields &&
            hass.services[domain][action.service].fields[field])
            name = String(hass.services[domain][action.service].fields[field].name);
        const entityIds = ['script', 'notify'].includes(domain) ? [action.service] : [((_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id) || []].flat();
        let actionConfig = parseCustomActions(customize || {}, entityIds.length ? entityIds[0] : domain);
        if (actionConfig.length) {
            let res = actionConfig.map(customConfig => {
                if (customConfig.service != action.service || !Object.keys(customConfig.variables || {}).includes(field))
                    return null;
                let variableConfig = (customConfig.variables || {})[field];
                return variableConfig.name;
            })
                .filter(isDefined);
            if (res.length)
                return res[0];
        }
        if (!name)
            name = field.replace(/_/g, ' ');
        return name;
    };

    const FALLBACK_ICON = 'mdi:flash';
    const checkIconPrefix = (icon) => {
        if (icon.match(/^[a-z]+\:[a-zA-Z\-]+$/))
            return icon;
        return `mdi:${icon}`;
    };
    const computeActionIcon = (action, customize) => {
        const config = actionConfig(action, customize);
        const domain = computeDomain(action.service);
        const domainService = computeEntity(action.service);
        if (config.icon) {
            return checkIconPrefix(config.icon);
        }
        else if (Object.keys(serviceIcons).includes(domain) && Object.keys(serviceIcons[domain].services).includes(domainService)) {
            if (serviceIcons[domain].attributes !== undefined) {
                let config = serviceIcons[domain].attributes;
                const key = Object.keys(config).find(e => Object.keys(action.service_data).includes(e));
                if (key && Object.keys(config[key]).includes(action.service_data[key])) {
                    return config[key][action.service_data[key]];
                }
            }
            return serviceIcons[domain].services[domainService];
        }
        else if (Object.keys(serviceIcons).includes(domain) && Object.keys(serviceIcons[domain].services).includes('{entity_id}')) {
            return serviceIcons[domain].services['{entity_id}'];
        }
        else {
            return FALLBACK_ICON;
        }
    };

    const computeDuration = (timeA, timeB, hass) => {
        let tsA = typeof timeA == 'string'
            ? computeTimestamp(parseTimeString(timeA), hass)
            : computeTimestamp(timeA, hass);
        let tsB = typeof timeB == 'string'
            ? computeTimestamp(parseTimeString(timeB), hass)
            : computeTimestamp(timeB, hass);
        if (tsB > tsA)
            return 1;
        else if (tsB < tsA)
            return -1;
        else
            return 0;
    };
    const startTime = (s) => parseTimeString(s.start);
    const stopTime = (s) => {
        if (isDefined(s.stop)) {
            const time = parseTimeString(s.stop);
            if (time.hours == 0 && time.minutes == 0 && time.mode == TimeMode.Fixed)
                return Object.assign(Object.assign({}, time), { hours: 24 });
            return time;
        }
        else {
            return addTimeOffset(startTime(s), { minutes: 1 });
        }
    };
    const moveTimeslot = (slots, slotIdx, update, hass) => {
        let slotIdxOut = slotIdx;
        if (isDefined(update.stop)) {
            [slots, slotIdxOut] = moveTimeslot(slots, slotIdx + 1, { start: update.stop }, hass);
            return [slots, slotIdxOut - 1];
        }
        if (!isDefined(update.start))
            return [slots, slotIdxOut];
        let oldTime = startTime(slots[slotIdx]);
        let newTime = update.start;
        let lowerLimit = startTime(slots[slotIdx]);
        for (let i = slotIdx - 1; i >= 0; i--) { //walk through all slots prior to modified one
            if (slots[i].actions.length) {
                lowerLimit = i == (slotIdx - 1)
                    ? addTimeOffset(startTime(slots[i]), { minutes: 1 })
                    : stopTime(slots[i]);
                break;
            }
            lowerLimit = startTime(slots[i]);
        }
        let upperLimit = addTimeOffset(stopTime(slots[slotIdx]), { minutes: -1 });
        if (!isDefined(slots[slotIdx].stop)) {
            for (let i = slotIdx + 1; i < slots.length; i++) { //walk through all slots after the modified one
                if (slots[i].actions.length) {
                    upperLimit = i == (slotIdx + 1)
                        ? addTimeOffset(stopTime(slots[i]), { minutes: -1 })
                        : startTime(slots[i]);
                    break;
                }
                upperLimit = stopTime(slots[i]);
            }
        }
        if (computeDuration(lowerLimit, newTime, hass) < 0) {
            newTime = lowerLimit; //cap time to the limit (user entered an illegal value)
        }
        if (computeDuration(upperLimit, newTime, hass) > 0 && computeTimestamp(upperLimit, hass) > 0) {
            newTime = upperLimit; //cap time to the limit (user entered an illegal value)
        }
        slots = Object.assign(slots, { [slotIdx]: Object.assign(Object.assign({}, slots[slotIdx]), { start: timeToString(newTime) }) });
        if (computeDuration(oldTime, newTime, hass) <= 0) { //time is moved backwards or kept the same
            for (let i = slotIdx - 1; i >= 0; i--) { //walk through all slots prior to modified one
                let d1 = computeDuration(startTime(slots[i]), newTime, hass);
                let d2 = computeDuration(stopTime(slots[i]), newTime, hass);
                if (d1 > 0 && d2 <= 0) {
                    //timeslot has partial overlap with the new time point, it should be shortened.
                    slots = Object.assign(slots, { [i]: Object.assign(Object.assign({}, slots[i]), { stop: timeToString(newTime) }) });
                    break;
                }
                else if (d2 >= 0) {
                    //timeslot slot ends before the new time point, stop iterating
                    break;
                }
                else if (d1 <= 0) {
                    //new time point causes timeslot to be fully overlapped, erase it
                    slots = Object.assign(slots, { [i]: null });
                    slotIdxOut = slotIdxOut - 1;
                }
            }
        }
        if (computeDuration(oldTime, newTime, hass) < 0 && !isDefined(slots[slotIdx].stop)) {
            //slot has no stop time, so moving the start point to the left requires the next slot to be made longer
            if (isDefined(slots[slotIdx + 1].stop) && !slots[slotIdx + 1].actions.length) {
                //stretch next slot
                slots = Object.assign(slots, { [slotIdx + 1]: Object.assign(Object.assign({}, slots[slotIdx + 1]), { start: timeToString(stopTime(slots[slotIdx])) }) });
            }
            else {
                //insert new filler behind
                slots = [
                    ...slots.slice(0, slotIdx + 1),
                    Object.assign(Object.assign({}, slots[slotIdx]), { start: timeToString(stopTime(slots[slotIdx])), stop: timeToString(startTime(slots[slotIdx + 1])), actions: [] }),
                    ...slots.slice(slotIdx + 1),
                ];
            }
        }
        if (computeDuration(oldTime, newTime, hass) >= 0) { //time is moved forward or kept the same
            for (let i = (slotIdxOut + 1); i < slots.length; i++) { //walk through all slots after the modified one
                let newStopTime = stopTime(slots[slotIdxOut]);
                let d1 = computeDuration(startTime(slots[i]), newStopTime, hass);
                let d2 = computeDuration(stopTime(slots[i]), newStopTime, hass);
                if (d1 >= 0 && d2 < 0) {
                    //timeslot has partial overlap with the new time point, it should be shortened.
                    slots = Object.assign(slots, { [i]: Object.assign(Object.assign({}, slots[i]), { start: timeToString(newStopTime) }) });
                }
                else if (d1 < 0) {
                    //timeslot slot ends before the new time point, stop iterating
                    break;
                }
                else if (d2 >= 0) {
                    //new time point causes timeslot to be fully overlapped, erase it
                    slots = Object.assign(slots, { [i]: null });
                }
            }
        }
        if (computeDuration(oldTime, newTime, hass) > 0) { //time is moved forward
            if (slotIdx > 0 && isDefined(slots[slotIdx - 1].stop)) {
                //stretch previous slot
                slots = Object.assign(slots, { [slotIdx - 1]: Object.assign(Object.assign({}, slots[slotIdx - 1]), { stop: timeToString(newTime) }) });
            }
            else {
                //insert new filler before
                slots = [
                    ...slots.slice(0, slotIdx),
                    Object.assign(Object.assign({}, slots[slotIdx]), { start: slotIdx > 0 ? timeToString(stopTime(slots[slotIdx - 1])) : '00:00:00', stop: timeToString(newTime), actions: [] }),
                    ...slots.slice(slotIdx),
                ];
                slotIdxOut = slotIdx + 1;
            }
        }
        slots = slots.filter(isDefined); //remove null slots if created during loop
        return [slots, slotIdxOut];
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
            minutes = -minutes;
        }
        return roundTime({ hours: hours, minutes: minutes });
    };

    const SEC_PER_DAY = 24 * 3600;
    let SchedulerTimeslotEditor = class SchedulerTimeslotEditor extends s {
        constructor() {
            super(...arguments);
            this.selectedSlot = null;
            this._width = 0;
            this.large = false;
        }
        connectedCallback() {
            super.connectedCallback();
            this._resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const width = entry.contentRect.width;
                    if (width !== this._width) {
                        this._width = width;
                    }
                }
            });
            this._resizeObserver.observe(this);
        }
        disconnectedCallback() {
            var _a;
            super.disconnectedCallback();
            (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
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
            const fullWidth = this._width;
            const allowedStepSizes = [1, 2, 3, 4, 6, 8, 12];
            const amPm = useAmPm(this.hass.locale);
            const segmentWidth = amPm ? 130 : 100;
            if (!fullWidth)
                return x ``;
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
        <span class="left" style=${o$1({ width: `${w / 2}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
                else if (i == (nums.length - 1))
                    return x `
        <span class="right" style=${o$1({ width: `${w / 2}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
                else
                    return x `
        <span style=${o$1({ width: `${w}%` })}>${timeToString(time, { seconds: false, am_pm: amPm })}</span>
      `;
            });
        }
        renderTimeslots() {
            //TODO: handle overlapping of tiemslots due to sun offset
            const slots = this.schedule.slots;
            const slotWidths = this.computeSlotWidths();
            return slots.map((slot, i) => {
                const actionText = slot.actions.length ? formatActionDisplay(slot.actions[0], this.hass, this.config.customize, true, true) : '';
                const textWidth = actionText.length * 5 + 10;
                const leftMargin = i > 0 ? 15 : 0;
                const rightMargin = i < (slots.length - 1) ? 15 : 0;
                const slotWidth = slotWidths[i] - leftMargin - rightMargin;
                const nextSlot = slots[i + 1];
                return x `
        <div
          class="slot ${this.selectedSlot == i ? 'selected' : ''} ${slot.actions.length ? '' : 'empty'} ${slot.stop === undefined ? 'short' : ''}"
          style="${o$1({ width: `${slotWidths[i]}px` })}"
          @click=${this._toggleSelectTimeslot}
          idx="${i}"
        >
          ${slot.stop || 1 == 1 ? '' : x `
            <div
              class="marker"
              @click=${this._toggleSelectTimeslot}
              idx="${i}"
            >
            </div>`}
          ${slot.actions.length
                ? actionText && (slotWidth > textWidth / 3 || slotWidth > 50) && slotWidth > 30
                    ? x `<span style="margin-left: ${leftMargin}px; margin-right: ${rightMargin}px">${actionText}</span>`
                    : slotWidth > 16
                        ? x `<ha-icon icon="${computeActionIcon(slot.actions[0], this.config.customize)}"></ha-icon>`
                        : ''
                : ''}
        </div>
        ${i < (slots.length - 1) && slot.stop ? x `
        <div idx="${i}" class="handle ${this.selectedSlot == (i + 1) || this.selectedSlot == i ? '' : 'hidden'} ${nextSlot && !nextSlot.stop ? 'center' : ''}">
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
        computeSlotWidths() {
            const fullWidth = this._width;
            const slots = this.schedule.slots;
            const totalWidth = fullWidth - (slots.length - 1) * 3;
            const widthPct = slots.map((e, i) => {
                const ts_start = computeTimestamp(e.start, this.hass);
                let ts_stop;
                if (e.stop !== undefined) {
                    ts_stop = computeTimestamp(e.stop, this.hass);
                    if (!ts_stop && ts_start)
                        ts_stop = SEC_PER_DAY;
                }
                else {
                    // Slot without a stop time: visually span to the next slot's start
                    const nextSlot = slots[i + 1];
                    ts_stop = nextSlot
                        ? (computeTimestamp(nextSlot.start, this.hass) || SEC_PER_DAY)
                        : SEC_PER_DAY;
                }
                return (ts_stop - ts_start) / SEC_PER_DAY;
            });
            const minWidth = 5;
            const minPct = minWidth / totalWidth;
            const smallSlotCount = widthPct.filter(e => e < minPct).length;
            const availableWidth = totalWidth - smallSlotCount * minWidth;
            const slotWidths = widthPct.map(e => {
                if (e < minPct)
                    return minWidth;
                return e * availableWidth;
            });
            return slotWidths;
        }
        _toggleSelectTimeslot(ev) {
            let slot = ev.target;
            if (slot.tagName.toLowerCase() != 'div')
                slot = slot.parentElement;
            const num = Number(slot.getAttribute("idx"));
            this.selectedSlot = this.selectedSlot !== num ? num : null;
            const myEvent = new CustomEvent('update', { detail: { selectedSlot: this.selectedSlot } });
            this.dispatchEvent(myEvent);
            ev.stopPropagation();
        }
        _handleDragStart(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            let el = ev.target;
            while (el.tagName !== 'DIV')
                el = el.parentElement;
            const trackElement = el.parentElement;
            const trackBounds = trackElement.getBoundingClientRect();
            const slotIdx = Number(el.getAttribute("idx"));
            const stepSize = this.config.time_step || DEFAULT_TIME_STEP;
            const stepSec = stepSize * 60;
            let ts_min = slotIdx > 0
                ? computeTimestamp(this.schedule.slots[slotIdx - 1].stop || this.schedule.slots[slotIdx - 1].start, this.hass) + stepSec
                : stepSec;
            let ts_max = (computeTimestamp(this.schedule.slots[slotIdx + 1].stop || this.schedule.slots[slotIdx + 1].start, this.hass) || SEC_PER_DAY) - stepSec;
            if (this.schedule.slots[slotIdx + 1].stop === undefined) {
                ts_max = (computeTimestamp(this.schedule.slots[slotIdx + 2].stop || this.schedule.slots[slotIdx + 2].start, this.hass) || SEC_PER_DAY) - stepSec;
            }
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
                ev.preventDefault();
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
                time = roundTime(time, stepSize);
                const timeStr = timeToString(time);
                let slots = [...this.schedule.slots];
                slots = Object.assign(slots, {
                    [slotIdx]: Object.assign(Object.assign({}, slots[slotIdx]), { stop: timeStr }),
                    [slotIdx + 1]: Object.assign(Object.assign({}, slots[slotIdx + 1]), { start: timeToString(time) })
                });
                if (slots[slotIdx + 1].stop === undefined) {
                    const timeStrNext = timeToString(addTimeOffset(time, { minutes: 1 }));
                    slots = Object.assign(slots, {
                        [slotIdx + 2]: Object.assign(Object.assign({}, slots[slotIdx + 2]), { start: timeStrNext }),
                    });
                }
                this.schedule = Object.assign(Object.assign({}, this.schedule), { slots: slots });
                const myEvent = new CustomEvent('update', { detail: { slots: slots } });
                this.dispatchEvent(myEvent);
            };
            const dragStartHandler = (ev) => {
                ev.preventDefault();
            };
            const mouseUpHandler = () => {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('touchmove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
                window.removeEventListener('touchend', mouseUpHandler);
                window.removeEventListener('blur', mouseUpHandler);
                window.removeEventListener('dragstart', dragStartHandler);
                mouseMoveHandler = () => {
                    /**/
                };
            };
            window.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('touchend', mouseUpHandler);
            window.addEventListener('blur', mouseUpHandler);
            window.addEventListener('dragstart', dragStartHandler);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('touchmove', mouseMoveHandler);
        }
        static get styles() {
            return i$4 `
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
        margin-top: -12px;
        margin-left: -12px;
      }
      .handle.center span {
        margin-right: -2px;
      }
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], SchedulerTimeslotEditor.prototype, "config", void 0);
    __decorate([
        t$1()
    ], SchedulerTimeslotEditor.prototype, "schedule", void 0);
    __decorate([
        t$1()
    ], SchedulerTimeslotEditor.prototype, "selectedSlot", void 0);
    __decorate([
        t$1()
    ], SchedulerTimeslotEditor.prototype, "_width", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimeslotEditor.prototype, "large", void 0);
    SchedulerTimeslotEditor = __decorate([
        e$3('scheduler-timeslot-editor')
    ], SchedulerTimeslotEditor);

    const MAX_OFFFSET_HOURS = 4;
    const limitOffset = (time) => {
        let offsetTime = time.hours * 60 + time.minutes;
        if (offsetTime > MAX_OFFFSET_HOURS * 60)
            time = Object.assign(Object.assign({}, time), { hours: MAX_OFFFSET_HOURS, minutes: 0 });
        else if (offsetTime < -MAX_OFFFSET_HOURS * 60)
            time = Object.assign(Object.assign({}, time), { hours: -MAX_OFFFSET_HOURS, minutes: 0 });
        return time;
    };
    let SchedulerTimePicker = class SchedulerTimePicker extends s {
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
            this.large = false;
            this.stepSize = 10;
        }
        set time(value) {
            const time = parseTimeString(value);
            this.mode = time.mode;
            this.hours = time.hours;
            this.minutes = time.minutes;
        }
        render() {
            const _validateHourInput = (value, _nativeValidity) => {
                let valid = value.match(/^[1|2]?[0-9]$/) !== null;
                return {
                    valid: valid,
                    customError: !valid
                };
            };
            const _validateMinuteInput = (value, _nativeValidity) => {
                let valid = value.match(/^[0-5]?[0-9]$/) !== null;
                return {
                    valid: valid,
                    customError: !valid
                };
            };
            return x `
      <div class="time-input-wrap">
        <div class="input">
          ${this.label ? x `<span class="label">${this.label}</span>` : A}
          ${this.large ? A : this._renderTimeMode()}
          <div class="hours">
            ${this.large ? x `
            <ha-button
              appearance="plain"
              @click=${() => this._addTimeOffset({ hours: 1 })}
              ?disabled=${this.mode != TimeMode.Fixed && this.hours == MAX_OFFFSET_HOURS}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            ` : A}
            <ha-input
              id="hour"
              inputmode="numeric"
              .value=${this.formatHours()}
              label=""
              name="hours"
              @change=${this._hoursChanged}
              @focusin=${this._onFocus}
              .required=${this.required}
              .autoValidate=${this.autoValidate}
              maxlength="2"
              max=${this.mode == TimeMode.Fixed ? this.useAmPm ? 12 : 23 : MAX_OFFFSET_HOURS}
              min=${this.mode != TimeMode.Fixed && !this.large ? -MAX_OFFFSET_HOURS : 0}
              .disabled=${this.disabled}
              .validityTransform=${_validateHourInput}
            >
            </ha-input>
            ${this.large ? x `
            <ha-button
              appearance="plain"
              @click=${() => this._addTimeOffset({ hours: -1 })}
              ?disabled=${this.mode != TimeMode.Fixed && this.hours == -MAX_OFFFSET_HOURS}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            ` : A}
          </div>
          <div class="time-separator">:</div>
          <div class="minutes">
            ${this.large ? x `
            <ha-button
              appearance="plain"
              @click=${() => this._addTimeOffset({ minutes: this.stepSize })}
              ?disabled=${this.mode != TimeMode.Fixed && this.hours == MAX_OFFFSET_HOURS}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </ha-button>
            ` : A}
            <ha-input
              id="min"
              inputmode="numeric"
              .value=${this.formatMinutes()}
              label=""
              @change=${this._minutesChanged}
              @focusin=${this._onFocus}
              name="minutes"
              .required=${this.required}
              .autoValidate=${this.autoValidate}
              maxlength="2"
              max="59"
              min="0"
              .disabled=${this.disabled}
              .validityTransform=${_validateMinuteInput}
            >
            </ha-input>
            ${this.large ? x `
            <ha-button
              appearance="plain"
              @click=${() => this._addTimeOffset({ minutes: -this.stepSize })}
              ?disabled=${this.mode != TimeMode.Fixed && this.hours == -MAX_OFFFSET_HOURS}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </ha-button>
            ` : A}
          </div>
          ${this._renderSuffix()}
          ${this.large ? this._renderTimeMode() : A}
        </div>
      </div>
    `;
        }
        _renderTimeMode() {
            if (!this.hass.states['sun.sun'])
                return A;
            if (this.large) {
                const _toggleTimeMode = () => {
                    let newTime = this._convertTimeMode();
                    if (newTime.mode != TimeMode.Fixed)
                        newTime = limitOffset(newTime);
                    this.mode = newTime.mode;
                    this.hours = newTime.hours;
                    this.minutes = newTime.minutes;
                    this._valueChanged();
                };
                return x `
        <div class="mode">
          ${this.hass.states['sun.sun']
                ? x `
          <ha-button
            appearance="${this.mode == TimeMode.Fixed ? 'plain' : 'accent'}"
            variant="${this.mode == TimeMode.Fixed ? 'neutral' : 'brand'}"
            @click=${_toggleTimeMode}
          >
            <ha-icon icon="mdi:theme-light-dark"></ha-icon>
          </ha-button>
          `
                : A}
        </div>
      `;
            }
            else {
                let modeOptions = [
                    TimeMode.Fixed,
                    TimeMode.Sunrise,
                    TimeMode.Sunset,
                ];
                const modeOptionLabels = {
                    [TimeMode.Fixed]: hassLocalize('ui.components.selectors.selector.types.time', this.hass),
                    [TimeMode.Sunrise]: hassLocalize('ui.panel.config.automation.editor.triggers.type.sun.sunrise', this.hass),
                    [TimeMode.Sunset]: hassLocalize('ui.panel.config.automation.editor.triggers.type.sun.sunset', this.hass),
                };
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
                    const offsetTime = this._convertTimeMode(mode);
                    return Math.abs(offsetTime.hours * 60 + offsetTime.minutes) > (MAX_OFFFSET_HOURS * 60);
                };
                const _handleMenuAction = (ev) => {
                    const newMode = ev.detail.item.value;
                    if (this.mode == newMode)
                        return;
                    const newTime = this._convertTimeMode(newMode);
                    this.hours = newTime.hours;
                    this.minutes = newTime.minutes;
                    this.mode = newMode;
                    this._valueChanged();
                };
                return x `
      <ha-dropdown
        @wa-select=${_handleMenuAction}
        @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
        ?disabled=${this.disabled}
      >
        <ha-icon-button
          slot="trigger"
          .path=${buttonIcons[this.mode]}
          ?disabled=${this.disabled}
        >
        </ha-icon-button>
        ${modeOptions.map(e => x `
        <ha-dropdown-item
          ?noninteractive=${this.mode == e}
          ?disabled=${isDisabled(e) && this.mode != e}
          value="${e}"
        >
          <ha-icon
            icon="${modeOptionIcons[e]}"
          ></ha-icon>
          ${modeOptionLabels[e]}
        </ha-dropdown-item>
        `)}
      </ha-dropdown>
    `;
            }
        }
        _renderSuffix() {
            if (this.large) {
                const _toggleAmPmClick = () => {
                    let value = convertTo12Hour(this.hours).am_pm;
                    const hours12 = convertTo12Hour(this.hours).hours;
                    this.hours = convertTo24Hour(hours12, value == 'AM' ? AmPmFormat.PM : AmPmFormat.AM);
                    this._valueChanged();
                };
                const _toggleBeforeAfterClick = () => {
                    if (this.hours != 0)
                        this.hours = -this.hours;
                    else
                        this.minutes = -this.minutes;
                    this._valueChanged();
                };
                const _toggleSunriseSunsetClick = () => {
                    this.mode = this.mode == TimeMode.Sunrise ? TimeMode.Sunset : TimeMode.Sunrise;
                    this._valueChanged();
                };
                return x `
        <div class="suffix">
        ${this.useAmPm && this.mode == TimeMode.Fixed
                ? x `
            <ha-button appearance="plain" @click=${_toggleAmPmClick}>
              <span class="large">
                ${convertTo12Hour(this.hours).am_pm == AmPmFormat.AM ? "AM" : "PM"}
              </span>
            </ha-button>
          ` : A}
        ${this.mode != TimeMode.Fixed
                ? x `
            <ha-button appearance="plain" size="large" @click=${_toggleBeforeAfterClick}>
              <span class="large">
              ${this.hours < 0 || this.minutes < 0
                    ? this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.before').trim().toLowerCase()
                    : this.hass.localize('ui.panel.config.automation.editor.conditions.type.sun.after').trim().toLowerCase()}
              </span>
            </ha-button>
            <ha-button appearance="plain" @click=${_toggleSunriseSunsetClick}>
              <ha-icon icon="${this.mode == TimeMode.Sunrise ? 'mdi:weather-sunny' : 'mdi:weather-night'}"></ha-icon>
            </ha-button>
         ` : A}
        </div>
      `;
            }
            else {
                if (!this.useAmPm || this.mode != TimeMode.Fixed)
                    return A;
                return x `
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
          <ha-dropdown-item value="AM">AM</ha-dropdown-item>
          <ha-dropdown-item value="PM">PM</ha-dropdown-item>
        </ha-select>
      `;
            }
        }
        _convertTimeMode(newMode) {
            const tsSunrise = this.hass.states['sun.sun'].attributes['next_rising'];
            const tsSunset = this.hass.states['sun.sun'].attributes['next_setting'];
            if ((newMode && newMode != TimeMode.Fixed) || this.mode == TimeMode.Fixed) {
                const sunriseOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunrise);
                const sunsetOffset = computeTimeOffset({ hours: this.hours, minutes: this.minutes }, tsSunset);
                const offsetMinsSunrise = sunriseOffset.hours * 60 + sunriseOffset.minutes;
                const offsetMinsSunset = sunsetOffset.hours * 60 + sunsetOffset.minutes;
                let mode = newMode
                    ? newMode
                    : Math.abs(offsetMinsSunrise) <= Math.abs(offsetMinsSunset) ? TimeMode.Sunrise : TimeMode.Sunset;
                let offsetTime = mode == TimeMode.Sunrise ? sunriseOffset : sunsetOffset;
                return {
                    mode: mode,
                    hours: offsetTime.hours,
                    minutes: offsetTime.minutes
                };
            }
            else {
                let fixedTime = this.mode == TimeMode.Sunrise ? parseTimeString(tsSunrise) : parseTimeString(tsSunset);
                fixedTime = addTimeOffset(fixedTime, { hours: this.hours, minutes: this.minutes });
                return {
                    mode: TimeMode.Fixed,
                    hours: fixedTime.hours,
                    minutes: fixedTime.minutes
                };
            }
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
            const value = ev.detail.value;
            const oldValue = convertTo12Hour(this.hours).am_pm;
            if (oldValue == value)
                return;
            const hours12 = convertTo12Hour(this.hours).hours;
            this.hours = convertTo24Hour(hours12, value == 'AM' ? AmPmFormat.AM : AmPmFormat.PM);
            this._valueChanged();
        }
        _addTimeOffset(offset) {
            let time = { mode: this.mode, hours: this.hours, minutes: this.minutes };
            time = addTimeOffset(time, offset);
            if (offset.minutes)
                time = roundTime(time, this.stepSize);
            if (this.mode != TimeMode.Fixed)
                time = limitOffset(time);
            this.hours = time.hours;
            this.minutes = time.minutes;
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
            if (isNegative && !this.large)
                return '-' + Math.abs(hours).toFixed();
            else if (this.mode != TimeMode.Fixed && !this.large)
                return '+' + Math.abs(hours).toFixed();
            else if (this.large)
                return Math.abs(hours);
            else
                return hours.toFixed();
        }
        formatMinutes() {
            return Math.abs(this.minutes).toString().padStart(2, "0");
        }
    };
    SchedulerTimePicker.styles = i$4 `
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
    .time-separator {
      background-color: var(--ha-color-form-background);
      color: var(--ha-color-text-secondary);
      border-bottom: 1px solid var(--ha-color-border-neutral-loud);
      box-sizing: border-box;
      height: 56px;
      width: 9px;
      display: flex;
      align-items: center;
      align-self: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
    }
    :host([disabled]) .time-separator {
      background-color: var(--ha-color-form-background-disabled);
      opacity: 0.5;
    }
    :host([large]) .time-separator {
      background: none;
      border: none;
      font-size: 36px;
    }
    ha-input {
      width: 40px;
      --mdc-shape-small: 0;
      --text-field-appearance: none;
      --text-field-padding-top: 0;
      --text-field-padding-bottom: 0;
      --text-field-padding-start: 4px;
      --text-field-padding-end: 4px;
      --text-field-suffix-padding-left: 2px;
      --text-field-suffix-padding-right: 0;
      --ha-input-text-align: center;
      --ha-input-padding-top: 0px;
      --ha-input-padding-bottom: 0px;
    }
    ha-input::part(wa-input) {
      text-align: center;
    }
    ha-input::part(wa-hint) {
      height: 0;
    }
    ha-input::part(wa-base) {
      padding: var(--ha-space-1);
    }
    ha-input#hour::part(wa-base) {
      border-top-right-radius: 0px;
    }
    ha-input#min::part(wa-base) {
      border-top-left-radius: 0px;
    }
    :host([large]) ha-input#hour::part(wa-base),
    :host([large]) ha-input#min::part(wa-base) {
      border-top-right-radius: var(--ha-border-radius-sm);
      border-top-left-radius: var(--ha-border-radius-sm);
    }
    :host([large]) ha-input {
      width: 75px;
      --wa-form-control-value-font-size: 42px;
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
      width: 90px;
    }
    .label {
      display: flex;
      justify-content: center;
      align-self: center;
      white-space: nowrap;
    }
    ha-dropdown-menu {
      display: flex;
      align-items: flex-end;
      margin-right: 4px;
      padding-bottom: 4px;
    }
    ha-dropdown-menu ha-icon-button {
      color: var(--secondary-text-color);
    }
    ha-dropdown-item[disabled] ha-icon {
      color: var(--disabled-text-color);
    }
    ha-dropdown-item[noninteractive] {
      background-color: rgba(var(--rgb-primary-color), 0.12);
      color: var(--sidebar-selected-text-color);
    }
    ha-dropdown-item[noninteractive] ha-icon {
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
  `;
    __decorate([
        n$2({ attribute: false })
    ], SchedulerTimePicker.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], SchedulerTimePicker.prototype, "hours", void 0);
    __decorate([
        t$1()
    ], SchedulerTimePicker.prototype, "minutes", void 0);
    __decorate([
        t$1()
    ], SchedulerTimePicker.prototype, "mode", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimePicker.prototype, "autoValidate", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimePicker.prototype, "required", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimePicker.prototype, "disabled", void 0);
    __decorate([
        n$2({ type: String })
    ], SchedulerTimePicker.prototype, "label", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimePicker.prototype, "useAmPm", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerTimePicker.prototype, "large", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerTimePicker.prototype, "stepSize", void 0);
    SchedulerTimePicker = __decorate([
        e$3("scheduler-time-picker")
    ], SchedulerTimePicker);

    const WeekdayTypeCustom = "Custom";
    let DialogSelectWeekdays = class DialogSelectWeekdays extends s {
        constructor() {
            super(...arguments);
            this.weekdayTypeCustomSelected = false;
            this.selectedWeekdays = [];
        }
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
            this.selectedWeekdays = this._params.weekdays.filter(e => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
            this.weekdayTypeCustomSelected = this.selectedWeekdays.length > 0 && this._params.weekdays.length == this.selectedWeekdays.length;
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
      <ha-dialog
        open
        @closed=${this.closeDialog}
        width="small"
      >
        <ha-dialog-header slot="header">
          ${this.weekdayTypeCustomSelected
            ? x `
          <ha-icon-button
            slot="navigationIcon"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiChevronLeft}
            @click=${this.backClick}
          ></ha-icon-button>
            `
            : x `
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiClose}
          ></ha-icon-button>
          `};
          <div slot="title">
              ${localize('ui.dialog.weekday_picker.title', this.hass)}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          <ha-list>
          ${this._renderWeekdayOptions()}
          </ha-list>
        </div>

        <ha-dialog-footer slot="footer">
          <ha-button
            appearance="plain"
            slot="secondaryAction"
            @click=${this.cancelClick}
            data-dialog="close"
          >
            ${hassLocalize('ui.common.cancel', this.hass)}
          </ha-button>
          <ha-button
            appearance="accent"
            slot="primaryAction"
            @click=${this.confirmClick}
            data-dialog="close"
            ?disabled=${!this._params.weekdays.length}
          >
            ${hassLocalize('ui.common.ok', this.hass)}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
        }
        _renderWeekdayOptions() {
            let listOptions = [];
            if (!this.weekdayTypeCustomSelected) {
                listOptions = [
                    TWeekday.Daily,
                    TWeekday.Workday,
                    TWeekday.Weekend,
                    WeekdayTypeCustom
                ];
            }
            else {
                listOptions = [
                    TWeekday.Sunday,
                    TWeekday.Monday,
                    TWeekday.Tuesday,
                    TWeekday.Wednesday,
                    TWeekday.Thursday,
                    TWeekday.Friday,
                    TWeekday.Saturday,
                ];
                const startOfWeek = computeStartOfWeek(this.hass);
                const rotateArray = (arr, k) => arr.concat(arr).slice(k, k + arr.length);
                listOptions = rotateArray(listOptions, startOfWeek);
            }
            const isSelectedOption = (item) => {
                var _a, _b;
                if (item == WeekdayTypeCustom)
                    return (_a = this._params) === null || _a === void 0 ? void 0 : _a.weekdays.some(e => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
                return (_b = this._params) === null || _b === void 0 ? void 0 : _b.weekdays.includes(item);
            };
            return listOptions.map((key) => {
                return x `
        <ha-list-item
          graphic="icon"
          @click=${this._toggleSelectOption}
          option="${key}"
          ?hasMeta=${key == WeekdayTypeCustom}
        >
          ${isSelectedOption(key)
                ? x `<ha-icon slot="graphic" icon="mdi:check"></ha-icon>`
                : ''}
          ${key == WeekdayTypeCustom
                ? x `
            ${capitalizeFirstLetter(localize('ui.dialog.weekday_picker.choose', this.hass))}
            ${this.selectedWeekdays.length ? x `<span class="badge">${this.selectedWeekdays.length}</span>` : ''}
            `
                : capitalizeFirstLetter(computeDayDisplay(key, 'long', this.hass))}

          ${key == WeekdayTypeCustom
                ? x `<ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>`
                : ''}
        </ha-list-item>
    `;
            });
        }
        _toggleSelectOption(ev) {
            const option = ev.target.getAttribute("option");
            let weekdays = [...this._params.weekdays];
            if (option == WeekdayTypeCustom) {
                weekdays = this.selectedWeekdays;
                this.weekdayTypeCustomSelected = true;
            }
            else if ([TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(option)) {
                if (!weekdays.includes(option))
                    weekdays = [option];
                else if (weekdays.length > 1)
                    weekdays = weekdays.filter(e => e != option);
                this.weekdayTypeCustomSelected = false;
            }
            else if (weekdays.includes(option)) {
                weekdays = weekdays.filter(e => e != option);
            }
            else {
                weekdays = [...weekdays, option];
            }
            this._params = Object.assign(this._params, { weekdays: weekdays });
            ev.target.blur();
            this.requestUpdate();
        }
        confirmClick() {
            const input = Array.from(new Set(this._params.weekdays));
            this._params.confirm(input);
        }
        cancelClick() {
            this._params.cancel();
        }
        backClick() {
            this.weekdayTypeCustomSelected = false;
            this.selectedWeekdays = this._params.weekdays.filter(e => ![TWeekday.Daily, TWeekday.Weekend, TWeekday.Workday].includes(e));
        }
        static get styles() {
            return i$4 `
      div.wrapper {
        color: var(--primary-text-color);
        padding: 0px 12px;
      }
      ha-list {
        --mdc-list-vertical-padding: 0px;
      }
      ha-list-item[disabled] {
        color: var(--disabled-text-color);
      }
      ha-list-item.nested {
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
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], DialogSelectWeekdays.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], DialogSelectWeekdays.prototype, "_params", void 0);
    __decorate([
        t$1()
    ], DialogSelectWeekdays.prototype, "weekdayTypeCustomSelected", void 0);
    __decorate([
        t$1()
    ], DialogSelectWeekdays.prototype, "selectedWeekdays", void 0);
    DialogSelectWeekdays = __decorate([
        e$3('dialog-select-weekdays')
    ], DialogSelectWeekdays);

    var dialogSelectWeekdays = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectWeekdays () { return DialogSelectWeekdays; }
    });

    const caseInsensitiveStringCompare = (a, b) => {
        const stringCompare = (a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        };
        return stringCompare(a.toLowerCase(), b.toLowerCase());
    };

    const computeActionsForDomain = (hass, domain, config) => {
        const isSupportedAction = (action) => {
            if (!Object.keys(supportedActions).includes(domain))
                return false;
            let res = Object.keys(supportedActions[domain]).includes(action);
            if (!res && Object.keys(supportedActions[domain]).includes('{entity_id}')) {
                if (domain == 'script' && ['turn_on', 'turn_off', 'reload', 'toggle', 'test'].includes(action))
                    return false;
                res = entityIncludedByConfig(`${domain}.${action}`, config);
            }
            return res;
        };
        const services = Object.keys(hass.services).includes(domain)
            ? Object.keys(hass.services[domain]).filter(isSupportedAction)
            : [];
        const domainName = (domain) => hassLocalize(`component.${domain}.title`, hass, false) || domain.replace(/_/g, " ");
        const serviceName = (service) => {
            let action = {
                service: `${domain}.${service}`,
                service_data: {},
            };
            let serviceName = capitalizeFirstLetter(formatActionDisplay(action, hass, config.customize));
            if (domain == 'script') {
                if (Object.keys(config.customize || {}).includes(`${domain}.${service}`) && isDefined(config.customize[`${domain}.${service}`].name))
                    return config.customize[`${domain}.${service}`].name;
                else
                    return `${capitalizeFirstLetter(computeEntityDisplay(`${domain}.${service}`, hass, config.customize))}: ${serviceName}`;
            }
            return `${domainName(domain)}: ${serviceName}`;
        };
        const serviceDescription = (service) => {
            let description = hassLocalize(`component.${domain}.services.${service}.description`, hass, false);
            if (!description)
                description = hass.services[domain][service].description;
            if (!description && domain == 'script')
                description = hassLocalize(`component.${domain}.services.turn_on.description`, hass, false);
            return description;
        };
        const serviceIcon = (service) => {
            if (domain == 'script'
                && Object.keys(config.customize || {}).includes(`${domain}.${service}`)
                && isDefined(config.customize[`${domain}.${service}`].icon)) {
                return config.customize[`${domain}.${service}`].icon;
            }
            return Object.keys(serviceIcons).includes(domain) && Object.keys(serviceIcons[domain].services).includes(service)
                ? serviceIcons[domain].services[service]
                : domainIcon(domain);
        };
        let actionList = services.map((e) => ({
            key: e,
            name: serviceName(e),
            description: serviceDescription(e),
            icon: serviceIcon(e),
            action: {
                service: e.includes('.') ? e : `${domain}.${e}`,
                service_data: {},
                target: hass.services[domain][e].target ? {} : undefined
            }
        }));
        //get excluded actions for entity
        let excludedActions = parseExcludedActions(config.customize || {}, domain);
        if (excludedActions.length) {
            actionList = actionList.filter(e => !excludedActions.some(a => {
                return caseInsensitiveStringCompare(computeEntity(e.action.service), a) > 0
                    || caseInsensitiveStringCompare(formatActionDisplay(e.action, hass, config.customize), a) > 0;
            }));
        }
        let customActions = parseCustomActions(config.customize || {}, domain);
        customActions.forEach(action => {
            let key = action.service;
            while (actionList.find(e => e.key == key))
                key += '_2';
            if (action.variables) {
                Object.entries(action.variables).forEach(([field, config]) => {
                    let selector = parseCustomVariable(config);
                    let defaultValue = defaultSelectorValue(selector);
                    if (!isDefined(action.service_data[field]) && isDefined(defaultValue))
                        action = Object.assign(Object.assign({}, action), { service_data: Object.assign(Object.assign({}, action.service_data), { [field]: defaultValue }) });
                    else if (!isDefined(action.service_data[field]))
                        action = Object.assign(Object.assign({}, action), { service_data: Object.assign(Object.assign({}, action.service_data), { [field]: null }) });
                });
            }
            actionList.push({
                key: key,
                name: `${domainName(domain)}: ${sanitizeTagsAndWildcards(action.name || serviceName(computeEntity(action.service)))}`,
                description: sanitizeTagsAndWildcards(action.name || ""),
                icon: action.icon || domainIcon(domain),
                action: {
                    service: action.service.includes('.') ? action.service : `${domain}.${action.service}`,
                    service_data: action.service_data || {},
                    target: action.target ? action.target : undefined,
                    name: action.name,
                    icon: action.icon
                }
            });
        });
        return actionList;
    };
    const sanitizeTagsAndWildcards = (input) => {
        if (/<.+?>/g.exec(input) !== null) {
            let htmlContent = new DOMParser().parseFromString(input, 'text/html');
            input = htmlContent.body.textContent || '';
        }
        let res;
        while (res = /\[([^\]]+)\]/.exec(input))
            input = input.replace(res[0], '');
        while (res = /\{([^\}]+)\}/.exec(input))
            input = input.replace(res[0], '');
        return input;
    };

    let DialogSelectAction = class DialogSelectAction extends s {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
            this.lockDomain = false;
            this.showAll = false;
        }
        async showDialog(params) {
            this._params = params;
            this.lockDomain = params.domainFilter !== undefined;
            this.showAll = false;
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
        @closed=${this.closeDialog}
        @wa-after-show=${this._opened}
      >
        <div slot="header">
          <ha-dialog-header>
            ${this._params.domainFilter !== undefined && !this.lockDomain
            ? x `
            <ha-icon-button
              slot="navigationIcon"
              .label=${hassLocalize('ui.common.back', this.hass)}
              .path=${mdiChevronLeft}
              @click=${this._clearDomain}
            ></ha-icon-button>
            `
            : x `
            <ha-icon-button
              slot="navigationIcon"
               data-dialog="close"
              .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
              .path=${mdiClose}
            ></ha-icon-button>
            `}
            <div slot="title">
              ${localize('ui.dialog.action_picker.title', this.hass)}
            </div>
            ${!this.lockDomain && isDefined(this._params.cardConfig.include) ? x `
            <ha-dropdown
              placement="bottom-end"
              slot="actionItems"
              @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
            >
              <ha-icon-button slot="trigger" .label=${this.hass.localize('ui.common.menu')} .path=${mdiDotsVertical}>
              </ha-icon-button>
              <ha-dropdown-item @click=${this._toggleShowAll}>
                <ha-icon
                  icon="mdi:check"
                  style="${this.showAll ? '' : 'visibility: hidden'}"
                ></ha-icon>
                ${localize('ui.dialog.action_picker.show_all', this.hass)}
              </ha-dropdown-item>
            </ha-dropdown>`
            : ''}
          </ha-dialog-header>

          <ha-input
            dialogInitialFocus
            .placeholder=${hassLocalize("ui.common.search", this.hass)}
            aria-label=${hassLocalize("ui.common.search", this.hass)}
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
                  .label=${hassLocalize("ui.common.clear", this.hass)}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-input>
        </div>
        
        <ha-list
          style=${o$1({
            minWidth: `${this._width}px`,
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </ha-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("ha-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
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
            var _a, _b;
            if ((_a = this._params) === null || _a === void 0 ? void 0 : _a.domainFilter) {
                return this._renderDomainActions();
            }
            let cardConfig = Object.assign({}, (_b = this._params) === null || _b === void 0 ? void 0 : _b.cardConfig);
            if (this.showAll)
                cardConfig = Object.assign(Object.assign({}, cardConfig), { include: undefined, exclude: undefined });
            const domains = computeActionDomains(this.hass, cardConfig);
            if (domains.length === 1) {
                // force single domain into domainFilter to render actions directly
                this._params = Object.assign(Object.assign({}, this._params), { domainFilter: [domains[0].key] });
                return this._renderDomainActions();
            }
            return this._renderDomainList(domains);
        }
        _renderDomainList(domains) {
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
            if (!Object.keys(domains).length) {
                return x `
          <ha-list-item disabled>
            ${hassLocalize('ui.components.combo-box.no_match', this.hass)}
          </ha-list-item>
        `;
            }
            return x `
      ${(Object.keys(domains)).map((key) => x `
        <ha-list-item
          graphic="icon"
          hasMeta
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
          <span>${domains[key].name}</span>
        </ha-list-item>`)}
        ${fillers.map(_e => x `
        <ha-list-item
          graphic="icon"
          hasMeta
          noninteractive
        >
        </ha-list-item>
        `)}
      `;
        }
        _renderDomainActions() {
            var _a, _b;
            let cardConfig = Object.assign({}, (_a = this._params) === null || _a === void 0 ? void 0 : _a.cardConfig);
            if (this.showAll)
                cardConfig = Object.assign(Object.assign({}, cardConfig), { include: undefined, exclude: undefined });
            let result = this._params.domainFilter.map(e => computeActionsForDomain(this.hass, e, cardConfig)).flat();
            if ((_b = this._params.entityFilter) === null || _b === void 0 ? void 0 : _b.length) {
                result = result.filter(item => {
                    var _a;
                    return (_a = this._params.entityFilter) === null || _a === void 0 ? void 0 : _a.every(entity => {
                        const config = actionConfig(item.action, this._params.cardConfig.customize);
                        const stateObj = this.hass.states[entity];
                        if (config.supported_features && !((stateObj.attributes.supported_features || 0) & config.supported_features))
                            return false;
                        else if (Object.keys(item.action.service_data).includes('entity_id') && item.action.service_data.entity_id != entity)
                            return false;
                        else if (Object.keys(item.action.target || {}).includes('entity_id') && (item.action.target || {}).entity_id != entity)
                            return false;
                        else
                            return true;
                    });
                });
            }
            if (this._filter) {
                result = result.filter(e => {
                    const tokens = this._filter.toLowerCase().trim().split(" ");
                    return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                        tokens.every(token => e.key.toLowerCase().includes(token)));
                });
            }
            if (!Object.keys(result).length) {
                return x `
          <ha-list-item disabled>
            ${hassLocalize('ui.components.combo-box.no_match', this.hass)}
          </ha-list-item>
        `;
            }
            return (Object.keys(result)).map((key) => x `
        <ha-list-item
          graphic="icon"
          @click=${() => this._handleActionClick(result[key])}
          twoline
        >
          <ha-icon slot="graphic" icon="${result[key].icon}"></ha-icon>
          <span>${result[key].name}</span>
          <span slot="secondary">${result[key].description}</span>
        </ha-list-item>
    `);
        }
        _handleDomainClick(key) {
            this._params = Object.assign(Object.assign({}, this._params), { domainFilter: [key] });
            this._clearSearch();
        }
        _clearDomain() {
            this._params = Object.assign(Object.assign({}, this._params), { domainFilter: undefined });
            this._clearSearch();
        }
        _handleActionClick(item) {
            this._params.confirm(item.action);
            this._params = undefined;
            this._clearSearch();
        }
        _clearSearch() {
            this._search = "";
            this._filter = "";
        }
        _toggleShowAll() {
            if (this.showAll) {
                this.showAll = false;
            }
            else {
                this.showAll = true;
                if (!this.lockDomain)
                    this._clearDomain();
            }
        }
        static get styles() {
            return i$4 `
      ha-dialog {
        --dialog-content-padding: 0;
        --ha-dialog-width-md: 480px;
      }
      ha-input {
        display: block;
        margin: 0 16px;
      }
      ha-list {
        min-height: 300px;
      }
      ha-list-item:not([twoline]) {
        height: 56px;
      }
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], DialogSelectAction.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "_params", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "_search", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "_filter", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "_width", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "_height", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "lockDomain", void 0);
    __decorate([
        t$1()
    ], DialogSelectAction.prototype, "showAll", void 0);
    DialogSelectAction = __decorate([
        e$3('dialog-select-action')
    ], DialogSelectAction);

    var dialogSelectAction = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectAction () { return DialogSelectAction; }
    });

    let SchedulerSettingsRow = class SchedulerSettingsRow extends s {
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
            return i$4 `

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
    `;
        }
    };
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerSettingsRow.prototype, "showPrefix", void 0);
    SchedulerSettingsRow = __decorate([
        e$3('scheduler-settings-row')
    ], SchedulerSettingsRow);

    let SchedulerMainPanel = class SchedulerMainPanel extends s {
        constructor() {
            super(...arguments);
            this.selectedSlot = null;
            this.large = false;
            this.selectedEntry = 0;
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('schedule')) {
                this.dispatchEvent(new CustomEvent('change', { detail: { schedule: this.schedule } }));
            }
            return true;
        }
        render() {
            return x `
    ${this.schedule.entries.map((entry, num) => x `
      
      <div class="editor-header">
        <div class="weekdays">
          <span>
            ${localize('ui.panel.editor.repeated_days', this.hass)}:
            ${formatWeekdayDisplay(entry.weekdays, 'short', this.hass)}
          </span>
          <ha-icon-button .path=${mdiPencil} @click=${(ev) => this._showWeekdayDialog(ev, num)}></ha-icon-button>
        </div>
        <div class="weekdays-actions">
        <ha-button appearance="plain" size="small" @click=${this.toggleViewMode}>
          ${this.viewMode == EditorMode.Scheme
            ? localize('ui.panel.editor.toggle_single_mode', this.hass)
            : localize('ui.panel.editor.toggle_scheme_mode', this.hass)}
          <ha-icon slot="end" icon="mdi:swap-horizontal"></ha-icon>
        </ha-button>
        </div>
      </div>

      ${this.viewMode == EditorMode.Scheme ? x `
      <div class="editor-header">
        <div class="weekdays">
          ${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}:
        </div>
        ${this.renderActionButtons()}
      </div>
      <scheduler-timeslot-editor
        .hass=${this.hass}
        .config=${this.config}
        .schedule=${entry}
        .selectedSlot=${this.selectedSlot}
        @update=${(ev) => this._handleUpdate(ev, num)}
        .large=${this.large}
      >
      </scheduler-timeslot-editor>
      ` :
            x `
          ${this.hass.localize('ui.dialogs.helper_settings.input_datetime.time')}:
          <scheduler-time-picker
            .hass=${this.hass}
            .time=${this.schedule.entries[this.selectedEntry].slots[this.selectedSlot].start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
            .stepSize=${this.config.time_step || DEFAULT_TIME_STEP}
            large
          >
          </scheduler-time-picker>
      `}
    `)}

    ${this.renderSlot()}
    `;
        }
        toggleViewMode() {
            const newViewMode = this.viewMode == EditorMode.Scheme ? EditorMode.Single : EditorMode.Scheme;
            this.dispatchEvent(new CustomEvent('setViewMode', { detail: newViewMode }));
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
        <ha-icon-button .path=${mdiChevronLeft} @click=${(ev) => { this._updateSelectedSlot(this.selectedSlot - 1); ev.target.blur(); }} ?disabled=${this.selectedSlot === null || this.selectedSlot < 1}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiChevronRight} @click=${(ev) => { this._updateSelectedSlot(this.selectedSlot + 1); ev.target.blur(); }} ?disabled=${this.selectedSlot === null || this.selectedSlot > (this.schedule.entries[this.selectedEntry].slots.length - 2)}>
        </ha-icon-button> 
        <ha-icon-button .path=${mdiShapeRectanglePlus} @click=${this._addTimeslot} ?disabled=${delta < 1800}>
        </ha-icon-button>
        <ha-icon-button .path=${mdiTrashCanOutline} @click=${this._removeTimeslot} ?disabled=${this.schedule.entries[this.selectedEntry].slots.length <= 2}>
        </ha-icon-button> 
      </div>
    `;
        }
        renderSlot() {
            if (this.selectedEntry === null || this.selectedSlot === null) {
                return x `
        <div class="slot-placeholder"> 
          ${localize('ui.panel.editor.select_timeslot', this.hass)}
        </div>
      `;
            }
            const slot = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot];
            const isLastSlot = this.selectedSlot === this.schedule.entries[this.selectedEntry].slots.length - 1;
            let endTime = slot.stop;
            if (!endTime && (this.selectedSlot < this.schedule.entries[this.selectedEntry].slots.length - 1))
                endTime = this.schedule.entries[this.selectedEntry].slots[this.selectedSlot + 1].start;
            if (!endTime)
                endTime = slot.start;
            return x `
      ${this.viewMode == EditorMode.Scheme ? x `
      <div class="two-column">
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.start_time', this.hass)}:"
            ?disabled=${this.selectedSlot == 0}
            .time=${slot.start}
            @value-changed=${this._startTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
          >
          </scheduler-time-picker>
        </div>
        <div class="column">
          <scheduler-time-picker
            .hass=${this.hass}
            label="${localize('ui.panel.editor.stop_time', this.hass)}:"
            ?disabled=${isLastSlot}
            .time=${endTime}
            @value-changed=${this._stopTimeChanged}
            ?useAmPm=${useAmPm(this.hass.locale)}
          >
          </scheduler-time-picker>
        </div>
      </div>`
            : ''}

      ${localize('ui.panel.editor.action', this.hass)}:
      ${this._renderActionConfig()}
    `;
        }
        _renderActionConfig() {
            var _a, _b, _c, _d;
            const slot = Object.assign({}, this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);
            const action = slot.actions.length ? slot.actions[0] : undefined;
            if (!action)
                return x `
      <div>
        <ha-button appearance="plain"
          @click=${this._showActionDialog}
        >
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${localize('ui.panel.editor.add_action', this.hass)}
        </ha-button>
      </div>
    `;
            const config = actionConfig(action, this.config.customize);
            const domain = ((_a = config.target) === null || _a === void 0 ? void 0 : _a.domain) || computeDomain(action.service);
            const hasFixedEntity = isDefined((_b = config === null || config === void 0 ? void 0 : config.target) === null || _b === void 0 ? void 0 : _b.entity_id) || this.schedule.entries[this.selectedEntry].slots.some(e => { var _a, _b; return e.actions.length && isDefined((_b = (_a = actionConfig(e.actions[0], this.config.customize)) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.entity_id); });
            if (config === undefined)
                return x ``;
            //if (!config || !config.fields) return html``;
            const fields = Object.keys(config.fields || {}).filter(e => isSupportedSelector(action, e, this.hass, this.config.customize));
            let heading = '';
            let entityIds = [((_c = action.target) === null || _c === void 0 ? void 0 : _c.entity_id) || []].flat();
            if (!entityIds.length && ['notify', 'script'].includes(domain))
                entityIds = [action.service];
            if (entityIds.length) {
                heading += entityIds.map(e => computeEntityDisplay(e, this.hass, this.config.customize)).join(", ");
                heading += ': ';
            }
            heading += formatActionDisplay(action, this.hass, this.config.customize, false, true);
            return x `
      <scheduler-collapsible-section
        ?expanded=${true}
        ?disabled=${true}
      >
        <div slot="header" class="header">
          <ha-icon slot="icon" icon="${computeActionIcon(action, this.config.customize)}"></ha-icon>
          <span>${capitalizeFirstLetter(heading)}</span>
        </div>

        <ha-dropdown
          slot="contextMenu" 
          @wa-select=${this._actionItemOptionsClick}
          @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
          placement="bottom-end"
        >
          <ha-icon-button slot="trigger" .path=${mdiDotsVertical}>
          </ha-icon-button>
          <ha-dropdown-item value="change_type">
            <ha-icon icon="mdi:pencil"></ha-icon>
            ${hassLocalize('ui.panel.lovelace.editor.card.conditional.change_type', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item variant="danger" value="delete">
            <ha-icon icon="mdi:delete"></ha-icon>
            ${hassLocalize('ui.common.delete', this.hass)}
          </ha-dropdown-item>
        </ha-dropdown>

        <div slot="content">

          ${config.target ? x `
          <scheduler-settings-row>
            <span slot="heading">${hassLocalize("ui.components.entity.entity-picker.entity", this.hass)}</span>
            <scheduler-entity-picker
              .hass=${this.hass}
              .config=${this.config}
              .domain=${domain}
              .filterFunc=${(stateObj) => config.supported_features ? ((stateObj.attributes.supported_features || 0) & config.supported_features) > 0 : true}
              @value-changed=${this._selectEntity}
              .value=${[((_d = action.target) === null || _d === void 0 ? void 0 : _d.entity_id) || []].flat()}
              ?multiple=${true}
              ?disabled=${hasFixedEntity}
            >
            </scheduler-entity-picker>
          </scheduler-settings-row>
          `
            : ''}

          ${fields.map(field => {
            var _a;
            const selector = selectorConfig(action.service, (_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id, field, this.hass, this.config.customize);
            if (selector === null)
                return '';
            let optional = config.fields[field].optional || (selector.number || {}).optional;
            const checked = optional ? Object.keys(action.service_data).includes(field) : true;
            return x `
            <scheduler-settings-row ?showPrefix=${optional}>
              ${optional ? x `
                <ha-checkbox
                  slot="prefix"
                  ?checked=${checked}
                  @change=${(ev) => this._toggleOptionalField(ev, field, selector)}
                >
                </ha-checkbox>
              ` : ''}
              <span slot="heading">
                ${formatFieldDisplay(action, field, this.hass, this.config.customize)}
              </span>
              <scheduler-combo-selector
                .hass=${this.hass}
                .config=${selector}
                ?disabled=${!checked}
                .value=${Object.keys(action.service_data).includes(field) ? action.service_data[field] : undefined}
                @value-changed=${(ev) => this._selectField(field, ev)}
              >
              </scheduler-combo-selector>
            </scheduler-settings-row>
          `;
        })}
        </div>
      </scheduler-collapsible-section>
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
            if (checked) {
                this._selectField(field, new CustomEvent('value-changed', { detail: { value: isDefined(value) ? value : null } }));
            }
            else {
                this._selectField(field, new CustomEvent('value-changed', { detail: { value: undefined } }));
            }
        }
        _selectEntity(ev) {
            const entity = ev.detail.value;
            if (!entity)
                return;
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
                this._updateSelectedSlot(ev.detail.selectedSlot);
                this.selectedSlot = ev.detail.selectedSlot;
            }
            else if (ev.detail.hasOwnProperty('slots')) {
                this._updateEntry({ slots: ev.detail.slots });
            }
        }
        _updateSelectedSlot(slot) {
            this.dispatchEvent(new CustomEvent('change', { detail: { selectedSlot: slot } }));
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
            let filteredDomains = [];
            let filteredEntities = [];
            this.schedule.entries.forEach(entry => {
                entry.slots.forEach(slot => {
                    slot.actions.forEach(action => {
                        var _a, _b;
                        filteredEntities = [...filteredEntities, ...[((_a = action.target) === null || _a === void 0 ? void 0 : _a.entity_id) || []].flat()];
                        filteredDomains = [...filteredDomains, ...[computeDomain(action.service), ...[((_b = action.target) === null || _b === void 0 ? void 0 : _b.entity_id) || []].flat()].map(computeDomain)];
                    });
                });
            });
            filteredDomains = [...new Set(filteredDomains)];
            filteredEntities = [...new Set(filteredEntities)];
            await new Promise(resolve => {
                const params = {
                    cancel: () => resolve(null),
                    confirm: (out) => resolve(out),
                    domainFilter: filteredDomains.length ? filteredDomains : undefined,
                    entityFilter: filteredEntities.length ? filteredEntities : undefined,
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
                Object.assign({}, this.schedule.entries[this.selectedEntry].slots[this.selectedSlot]);
                const target = this.schedule.entries[this.selectedEntry].slots.find(e => { var _a; return e.actions.length ? (_a = e.actions[0].target) === null || _a === void 0 ? void 0 : _a.entity_id : undefined; });
                let action = Object.assign({}, res);
                if (target && action.target)
                    action = Object.assign(Object.assign({}, action), { target: target.actions[0].target });
                this._updateSlot({ actions: [action] });
            });
        }
        _actionItemOptionsClick(ev) {
            const option = ev.detail.item.value;
            switch (option) {
                case 'change_type':
                    this._showActionDialog(ev);
                    break;
                case 'delete':
                    this._updateSlot({ actions: [] });
                    break;
            }
        }
        _stopTimeChanged(ev) {
            let value = ev.detail.value;
            let [slots, slotIdxOut] = moveTimeslot([...this.schedule.entries[this.selectedEntry].slots], Number(this.selectedSlot), { stop: value }, this.hass);
            this._updateEntry({ slots: slots });
            if (slotIdxOut != this.selectedSlot)
                this._updateSelectedSlot(slotIdxOut);
        }
        _startTimeChanged(ev) {
            let value = ev.detail.value;
            let [slots, slotIdxOut] = moveTimeslot([...this.schedule.entries[this.selectedEntry].slots], Number(this.selectedSlot), { start: value }, this.hass);
            this._updateEntry({ slots: slots });
            if (slotIdxOut != this.selectedSlot)
                this._updateSelectedSlot(slotIdxOut);
        }
        _addTimeslot(ev) {
            if (this.selectedEntry === null || this.selectedSlot === null)
                return;
            this.schedule = insertTimeslot(this.schedule, this.selectedEntry, this.selectedSlot, this.hass);
            ev.target.blur();
        }
        _removeTimeslot(ev) {
            if (this.selectedEntry === null || this.selectedSlot === null)
                return;
            this.schedule = removeTimeslot(this.schedule, this.selectedEntry, this.selectedSlot);
            if (this.selectedSlot >= this.schedule.entries[this.selectedEntry].slots.length)
                this.selectedSlot = this.schedule.entries[this.selectedEntry].slots.length - 1;
            ev.target.blur();
        }
        static get styles() {
            return i$4 `
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
  ha-list-item.warning, ha-list-item.warning ha-icon {
    color: var(--error-color);
  }
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], SchedulerMainPanel.prototype, "hass", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerMainPanel.prototype, "config", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerMainPanel.prototype, "viewMode", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerMainPanel.prototype, "selectedSlot", void 0);
    __decorate([
        n$2({ type: Boolean })
    ], SchedulerMainPanel.prototype, "large", void 0);
    __decorate([
        t$1()
    ], SchedulerMainPanel.prototype, "schedule", void 0);
    __decorate([
        t$1()
    ], SchedulerMainPanel.prototype, "selectedEntry", void 0);
    SchedulerMainPanel = __decorate([
        e$3('scheduler-main-panel')
    ], SchedulerMainPanel);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    function formatDate(dateObj, locale) {
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
        const formatDateLegacy = (dateObj, format) => {
            switch (format) {
                case 'year':
                    return dateObj.getFullYear();
                case 'month':
                    return monthNames[dateObj.getMonth()];
                case 'day':
                    return dateObj.getDate();
            }
        };
        if (isCurrentYear) {
            if (supportLocaleDateString()) {
                return new Intl.DateTimeFormat(locale.language, {
                    month: 'long',
                    day: 'numeric',
                }).format(dateObj);
            }
            else
                return `${formatDateLegacy(dateObj, 'month')} ${formatDateLegacy(dateObj, 'day')}`;
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
                return `${formatDateLegacy(dateObj, 'month')} ${formatDateLegacy(dateObj, 'day')}, ${formatDateLegacy(dateObj, 'year')}`;
        }
    }
    function formatIsoDate(dateObj) {
        return dateObj.toISOString().split('T')[0];
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
        return true;
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

    const asArray = (value) => {
        if (value === undefined || value === null || Array.isArray(value)) {
            return value;
        }
        return [value];
    };

    let DialogSelectCondition = class DialogSelectCondition extends s {
        constructor() {
            super(...arguments);
            this._search = "";
            this._filter = "";
            this.timer = 0;
            this.showAll = false;
        }
        async showDialog(params) {
            this._params = params;
            this.showAll = false;
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
        @closed=${this.closeDialog}
        @wa-after-show=${this._opened}
      >
        <div slot="header">
          <ha-dialog-header>
            <ha-icon-button
              slot="navigationIcon"
              data-dialog="close"
              .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
              .path=${mdiClose}
            ></ha-icon-button>
            <div slot="title">
              ${localize('ui.panel.options.conditions.add_condition', this.hass)}
            </div>
            ${!isDefined(this._params.domain) ? x `
            <ha-dropdown
              placement="bottom-end"
              slot="actionItems"
              @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
            >
              <ha-icon-button slot="trigger" .label=${this.hass.localize('ui.common.menu')} .path=${mdiDotsVertical}>
              </ha-icon-button>
              <ha-dropdown-item @click=${this._toggleShowAll}>
                <ha-icon
                  icon="mdi:check"
                  style="${this.showAll ? '' : 'visibility: hidden'}"
                ></ha-icon>
                ${localize('ui.dialog.action_picker.show_all', this.hass)}
              </ha-dropdown-item>
            </ha-dropdown>`
            : ''}
          </ha-dialog-header>

          <ha-input
            dialogInitialFocus
            .placeholder=${hassLocalize("ui.common.search", this.hass)}
            aria-label=${hassLocalize("ui.common.search", this.hass)}
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
                  .label=${hassLocalize("ui.common.clear", this.hass)}
                  .path=${mdiClose}
                  class="clear-button"
                ></ha-icon-button>
              `}
              <slot name="suffix"></slot>
            </div>
          </ha-input>
        </div>

        <ha-list
          style=${o$1({
            minWidth: `${this._width}px`,
            height: this._height ? `${Math.min(468, this._height)}px` : "auto",
        })}
        >
          ${this._renderOptions()}
        </ha-list>
      </ha-dialog>
    `;
        }
        _opened() {
            var _a;
            // Store the width and height so that when we search, box doesn't jump
            const boundingRect = (_a = this.shadowRoot.querySelector("ha-list")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
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
            var _a;
            let cardConfig = Object.assign({}, (_a = this._params) === null || _a === void 0 ? void 0 : _a.cardConfig);
            if (this.showAll)
                cardConfig = Object.assign(Object.assign({}, cardConfig), { include: undefined, exclude: undefined });
            let domains = computeConditionDomains(this.hass, cardConfig);
            domains.sort((a, b) => sortByName(a.name, b.name));
            if (this._filter) {
                domains = domains.filter(e => {
                    const tokens = this._filter.toLowerCase().trim().split(" ");
                    return (tokens.every(token => e.name.toLowerCase().includes(token)) ||
                        tokens.every(token => e.key.toLowerCase().includes(token)));
                });
            }
            return (Object.keys(domains)).map((key) => x `
        <ha-list-item
          graphic="icon"
          @click=${() => this._handleDomainClick(domains[key].key)}
        >
          <ha-icon slot="graphic" icon="${domains[key].icon}"></ha-icon>
          <span>${domains[key].name}</span>
        </ha-list-item>
    `);
        }
        _handleDomainClick(key) {
            this._params = Object.assign(Object.assign({}, this._params), { domain: key });
            this._params.confirm(key);
            this._params = undefined;
            this._clearSearch();
        }
        _toggleShowAll() {
            if (this.showAll) {
                this.showAll = false;
            }
            else {
                this.showAll = true;
            }
        }
        static get styles() {
            return i$4 `
      ha-dialog {
        --dialog-content-padding: 0;
        --ha-dialog-width-md: 480px;
      }
      ha-input {
        display: block;
        margin: 0 16px;
      }
      ha-list {
        min-height: 300px;
      }
      ha-list-item:not([twoline]) {
        height: 56px;
      }
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], DialogSelectCondition.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "_params", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "_search", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "_filter", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "_width", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "_height", void 0);
    __decorate([
        t$1()
    ], DialogSelectCondition.prototype, "showAll", void 0);
    DialogSelectCondition = __decorate([
        e$3('dialog-select-condition')
    ], DialogSelectCondition);

    var dialogSelectCondition = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSelectCondition () { return DialogSelectCondition; }
    });

    let SchedulerOptionsPanel = class SchedulerOptionsPanel extends s {
        constructor() {
            super(...arguments);
            this.conditionIdx = -1;
            this.conditionValid = true;
            this.startDate = '';
            this.endDate = '';
            this.tags = [];
            this.customTagValue = '';
        }
        async firstUpdated() {
            var _a, _b;
            (await window.loadCardHelpers()).importMoreInfoControl('input_datetime');
            this.startDate = ((_a = this.schedule) === null || _a === void 0 ? void 0 : _a.start_date) || formatIsoDate(new Date());
            this.endDate = ((_b = this.schedule) === null || _b === void 0 ? void 0 : _b.end_date) || formatIsoDate(new Date());
            const tagEntries = await fetchTags(this.hass);
            const storedTags = tagEntries.map(e => e.name);
            const configTags = [this.config.tags || []].flat();
            this.tags = [...new Set([
                    ...storedTags,
                    ...configTags.filter(e => !storedTags.includes(e) && !['none', 'disabled', 'enabled'].includes(e)),
                ])];
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('schedule')) {
                this.dispatchEvent(new CustomEvent('change', { detail: { schedule: this.schedule } }));
            }
            return true;
        }
        render() {
            const tagSelector = {
                select: {
                    options: this.tags,
                    multiple: true,
                    custom_value: true
                }
            };
            return x `
      <div class="header first">
        <span>${localize('ui.panel.options.conditions.header', this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length
            ? x `
        <ha-dropdown
          @wa-select=${this._conditionConfigOptionsClick}
          @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
          placement="bottom-end"
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiCog}
          >
          </ha-icon-button>
          <ha-dropdown-item
            ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
            value="or"
          >
            <ha-icon
              icon="mdi:check"
              style="${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.Or ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.logic_or', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item
            ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
            value="and"
          >
            <ha-icon
              icon="mdi:check"
              style="${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.And ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.logic_and', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item value="track_changes">
            <ha-icon 
              icon="mdi:check" 
              style="${this.schedule.entries[0].slots[0].conditions.track_changes ? '' : 'visibility: hidden'}"
            ></ha-icon>
            ${localize('ui.panel.options.conditions.options.track_changes', this.hass)}
          </ha-dropdown-item>
        </ha-dropdown>
        `
            : ''}
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
          ${localize('ui.panel.options.conditions.add_condition', this.hass)}
        </ha-button>
      </div>


      <span class="header">${localize('ui.panel.options.period.header', this.hass)}:</span>
      <div class="period">
        <div>
          <ha-checkbox
            ?checked=${typeof this.schedule.start_date === 'string'}
            @change=${this.toggleEnableDateRange}
          >
          </ha-checkbox>
        </div>
        <div>
          <span>${localize('ui.panel.options.period.start_date', this.hass)}</span>
        </div>
        <div class="input">
          <ha-date-input
            .locale=${this.hass.locale}
            value=${this.startDate}
            .label=${hassLocalize('ui.components.date-range-picker.start_date', this.hass)}
            @value-changed=${this._setStartDate}
            ?disabled=${!this.schedule.start_date}
          >
          </ha-date-input>
        </div>
        <div>
          <span>${localize('ui.panel.options.period.end_date', this.hass)}</span>
        </div>
        <div class="input">
          <ha-date-input
            .locale=${this.hass.locale}
            value=${this.endDate}
            .label=${hassLocalize('ui.components.date-range-picker.end_date', this.hass)}
            @value-changed=${this._setEndDate}
            ?disabled=${!this.schedule.end_date}
          >
          </ha-date-input>
        </div>
      </div>

      <span class="header">${hassLocalize('ui.common.name', this.hass)}:</span>
      <div class="period">
        <ha-input
          value=${this.schedule.name || ''}
          placeholder=${this.schedule.name
            ? ''
            : hassLocalize('ui.common.name', this.hass)}
          @input=${this.updateName}
        ></ha-input>
      </div>

      <span class="header">${localize('ui.panel.options.tags', this.hass)}:</span>
      <div>
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${tagSelector}
          .value=${this.schedule.tags || []}
          @value-changed=${this.tagsUpdated}
        >
        </scheduler-combo-selector>

        <ha-dropdown
          @wa-after-hide=${(ev) => { ev.stopPropagation(); ev.target.querySelector("ha-button").blur(); }}
          @click=${(ev) => { ev.preventDefault(); ev.stopImmediatePropagation(); }}
          @wa-after-show=${(ev) => { ev.target.querySelector("ha-input").focus(); }}
          placement="bottom-start"
        >
          <ha-button appearance="plain" slot="trigger">
            <ha-icon slot="start" icon="mdi:plus"></ha-icon>
            ${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
          </ha-button>

          <div style="display: flex; align-items: center; padding: 0px 2px 0px 8px">
            <ha-input
              .value=${this.customTagValue}
              .label=${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
              @input=${(ev) => { this.customTagValue = ev.currentTarget.value; }}
              @keydown=${(ev) => { if (ev.key === 'Enter')
            this._customTagConfirmClick(ev); }}
              .placeholder=""
            ></ha-input> 
            <ha-button
              appearance="plain"
              @click=${this._customTagConfirmClick}
            >
              ${hassLocalize('ui.common.ok', this.hass)}
            </ha-button>
          </div>
        </ha-dropdown>
      </div>

      <span class="header">${localize('ui.panel.options.repeat_type', this.hass)}:</span>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Repeat ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Repeat ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Repeat}"
      >
        <ha-icon slot="start" icon="mdi:refresh"></ha-icon>
        ${hassLocalize('ui.components.calendar.event.repeat.label', this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Pause ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Pause ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Pause}"
      >
        <ha-icon slot="start" icon="mdi:stop"></ha-icon>
        ${hassLocalize('ui.dialogs.more_info_control.vacuum.stop', this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Single ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Single ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Single}"
      >
        <ha-icon slot="start" icon="mdi:trash-can-outline"></ha-icon>
        ${hassLocalize('ui.common.delete', this.hass)}
      </ha-button>
    `;
        }
        renderConditions() {
            let conditions = this.schedule.entries[0].slots[0].conditions.items;
            if (this.conditionIdx == conditions.length)
                conditions = [...conditions, {}];
            return conditions.map((condition, i) => {
                var _a;
                const entityId = this.conditionIdx == i ? this.selectedEntity || condition.entity_id || "" : condition.entity_id || "";
                const domain = this.conditionIdx == i ? this.selectedDomain || computeDomain(entityId) : computeDomain(entityId);
                const selector = computeStatesForEntity(entityId || domain, this.hass, this.config.customize);
                const matchTypes = selector && selector.hasOwnProperty('number')
                    ? [TConditionMatchType.Above, TConditionMatchType.Below]
                    : [TConditionMatchType.Equal, TConditionMatchType.Unequal];
                const matchTypeIcons = {
                    [TConditionMatchType.Equal]: 'mdi:equal',
                    [TConditionMatchType.Unequal]: 'mdi:not-equal-variant',
                    [TConditionMatchType.Above]: 'mdi:greater-than',
                    [TConditionMatchType.Below]: 'mdi:less-than',
                };
                const matchTypeValue = {
                    [TConditionMatchType.Equal]: 'ui.panel.options.conditions.types.equal_to',
                    [TConditionMatchType.Unequal]: 'ui.panel.options.conditions.types.unequal_to',
                    [TConditionMatchType.Above]: 'ui.panel.options.conditions.types.above',
                    [TConditionMatchType.Below]: 'ui.panel.options.conditions.types.below',
                };
                if (this.conditionIdx === i && !this.selectedMatchType)
                    this.selectedMatchType = matchTypes[0];
                return x `
      <scheduler-collapsible-section idx="${i}">
        <div slot="header">
          ${condition.entity_id && condition.value !== undefined ? x `
          <ha-icon slot="icon" icon="${computeEntityIcon(condition.entity_id, this.config.customize, this.hass)}"></ha-icon>
          ${capitalizeFirstLetter(localize(matchTypeValue[condition.match_type], this.hass, ['{entity}', '{value}'], [computeEntityDisplay(condition.entity_id, this.hass, this.config.customize) || '', (_a = formatSelectorDisplay(condition.value, selector, this.hass)) !== null && _a !== void 0 ? _a : '']))}
          ` : localize('ui.panel.options.conditions.add_condition', this.hass)}
        </div>
        <ha-dropdown
          slot="contextMenu"
          @wa-select=${(ev) => this._conditionItemOptionsClick(ev, i)}
          ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
          placement="bottom-end"
        >
          <ha-icon-button
            slot="trigger"
            .path=${mdiDotsVertical}
            ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
          >
          </ha-icon-button>
          <ha-dropdown-item value="change_type">
            <ha-icon icon="mdi:pencil"></ha-icon>
            ${hassLocalize('ui.panel.lovelace.editor.card.conditional.change_type', this.hass)}
          </ha-dropdown-item>
          <ha-dropdown-item variant="danger" value="delete">
            <ha-icon icon="mdi:delete"></ha-icon>
            ${hassLocalize('ui.common.delete', this.hass)}
          </ha-dropdown-item>
        </ha-dropdown>

        <div slot="content">

        <scheduler-settings-row>
          <span slot="heading">
            ${hassLocalize('ui.components.selectors.selector.types.entity', this.hass)}
          </span>
          <scheduler-entity-picker
            .hass=${this.hass}
            .config=${this.config}
            .domain=${domain}
            @value-changed=${this._selectEntity}
            .value=${this.conditionIdx == i ? asArray(this.selectedEntity) : asArray(condition.entity_id)}
            ?multiple=${false}
          >
          </scheduler-entity-picker>
        </scheduler-settings-row>

        <scheduler-settings-row>
          <span slot="heading">
            ${capitalizeFirstLetter(localize(matchTypeValue[this.conditionIdx == i ? this.selectedMatchType : condition.match_type], this.hass, ['{entity}', '{value}'], ['', '']))}
            <ha-dropdown
              @wa-select=${this._selectMatchType}
              @wa-after-hide=${(ev) => { ev.target.firstElementChild.blur(); }}
            >
              <ha-icon-button slot="trigger" .path=${mdiPencil}>
              </ha-icon-button>
              ${matchTypes.map(e => x `
                <ha-dropdown-item 
                  ?noninteractive=${this.conditionIdx == i ? this.selectedMatchType == e : condition.match_type == e}
                  value="${e}"
                >
                  <ha-icon icon="${matchTypeIcons[e]}"></ha-icon>
                  ${capitalizeFirstLetter(localize(matchTypeValue[e], this.hass, ['{entity}', '{value}'], ['', '']))}
                </ha-dropdown-item>
              `)}
            </ha-dropdown>
          </span>
          <scheduler-combo-selector
            .hass=${this.hass}
            .config=${selector}
            .value=${this.conditionIdx == i ? this.conditionValue : condition.value}
            @value-changed=${this._conditionValueChanged}
          >
          </scheduler-combo-selector>
        </scheduler-settings-row>
        </div>
      </scheduler-collapsible-section>
    `;
            });
        }
        _updateActiveCondition(ev) {
            const idx = ev.detail.item;
            if (idx < 0) {
                this.conditionIdx = -1;
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
            const option = ev.detail.item.value;
            switch (option) {
                case "change_type":
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
                case "delete":
                    const conditions = this.schedule.entries[0].slots[0].conditions.items.filter((_e, i) => i !== idx);
                    const updateSlots = (e) => Object.assign(e, { conditions: Object.assign(Object.assign({}, e.conditions), { items: conditions }) });
                    const updateEntries = (e) => Object.assign(e, { slots: e.slots.map(updateSlots) });
                    this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(updateEntries) });
                    if (idx === this.conditionIdx)
                        this.conditionIdx = -1;
                    else if (this.conditionIdx !== undefined && idx < this.conditionIdx)
                        this.conditionIdx = this.conditionIdx - 1;
                    this.conditionValid = true;
                    break;
            }
        }
        _selectMatchType(ev) {
            const value = ev.detail.item.value;
            this.selectedMatchType = value;
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
                    domain: undefined,
                    cardConfig: this.config
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
            this.selectedEntity = entity ? entity.pop() : undefined;
            if (this.selectedEntity) {
                const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
                const matchTypes = selector && selector.hasOwnProperty('number')
                    ? [TConditionMatchType.Above, TConditionMatchType.Below]
                    : [TConditionMatchType.Equal, TConditionMatchType.Unequal];
                if (!this.selectedMatchType || !matchTypes.includes(this.selectedMatchType))
                    this.selectedMatchType = matchTypes[0];
            }
            this._validateCondition();
        }
        _validateCondition() {
            this.conditionValid = false;
            if (!this.selectedEntity || !isDefined(this.conditionValue) || !this.selectedMatchType || this.conditionIdx === undefined)
                return;
            const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
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
        _conditionConfigOptionsClick(ev) {
            let conditionConfig = Object.assign({}, this.schedule.entries[0].slots[0].conditions);
            const option = ev.detail.item.value;
            switch (option) {
                case 'or':
                    if (conditionConfig.type == TConditionLogicType.Or)
                        return;
                    conditionConfig = Object.assign(Object.assign({}, conditionConfig), { type: TConditionLogicType.Or });
                    break;
                case 'and':
                    if (conditionConfig.type == TConditionLogicType.And)
                        return;
                    conditionConfig = Object.assign(Object.assign({}, conditionConfig), { type: TConditionLogicType.And });
                    break;
                case 'track_changes':
                    const newValue = !this.schedule.entries[0].slots[0].conditions.track_changes;
                    conditionConfig = Object.assign(Object.assign({}, conditionConfig), { track_changes: newValue });
                    break;
            }
            const updateSlots = (e) => Object.assign(e, { conditions: conditionConfig });
            const updateEntries = (e) => Object.assign(e, { slots: e.slots.map(updateSlots) });
            this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(updateEntries) });
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
            this.schedule = Object.assign(Object.assign({}, this.schedule), { name: value.trim() });
        }
        tagsUpdated(ev) {
            let value = ev.detail.value;
            value = value.map(e => e.trim());
            value = value.filter(e => !['none', 'disabled', 'enabled'].includes(e));
            this.schedule = Object.assign(Object.assign({}, this.schedule), { tags: value });
        }
        _customTagConfirmClick(ev) {
            let target = ev.target;
            target = target.parentElement;
            target = target.parentElement;
            const triggerBtn = target.querySelector("ha-button");
            triggerBtn.click();
            ev.preventDefault();
            let value = String(this.customTagValue).trim();
            if (value.length) {
                let tags = this.schedule.tags || [];
                tags = [...new Set([...tags, value])];
                tags = tags.filter(e => !['none', 'disabled', 'enabled'].includes(e));
                this.schedule = Object.assign(Object.assign({}, this.schedule), { tags: tags });
            }
            this.customTagValue = "";
        }
        setRepeatType(ev) {
            const value = ev.target.getAttribute("value");
            this.schedule = Object.assign(Object.assign({}, this.schedule), { repeat_type: value });
        }
        static get styles() {
            return i$4 `
      ha-icon-button {
        align-self: center;
      }
      ha-dropdown-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      ha-dropdown-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      ha-dropdown-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      div.period {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
      div.period > div {
        display: flex;
      }
      div.period > div.input {
        position: relative;
        overflow: hidden;
        flex: 1;
      }
      ha-date-input, ha-input {
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
      .header ha-dropdown {
        margin-bottom: -10px;
      }
    `;
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], SchedulerOptionsPanel.prototype, "hass", void 0);
    __decorate([
        n$2({ attribute: false })
    ], SchedulerOptionsPanel.prototype, "config", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "schedule", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "conditionIdx", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "selectedDomain", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "selectedEntity", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "selectedMatchType", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "conditionValue", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "conditionValid", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "startDate", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "endDate", void 0);
    __decorate([
        n$2()
    ], SchedulerOptionsPanel.prototype, "tags", void 0);
    __decorate([
        t$1()
    ], SchedulerOptionsPanel.prototype, "customTagValue", void 0);
    SchedulerOptionsPanel = __decorate([
        e$3('scheduler-options-panel')
    ], SchedulerOptionsPanel);

    let GenericDialog = class GenericDialog extends s {
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
      <ha-dialog
        open
        @closed=${this.closeDialog}
        width="small"
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiClose}
          ></ha-icon-button>
          <div slot="title">
            ${this._params.title}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        <ha-dialog-footer slot="footer">
          ${this._params.secondaryButtonLabel
            ? x `
            <ha-button
              appearance="plain"
              slot="secondaryAction"
              @click=${this.cancelClick}
              data-dialog="close"
            >
              ${this._params.secondaryButtonLabel}
            </ha-button>
              `
            : ''}
          <ha-button
            appearance="accent"
            slot="primaryAction"
            @click=${this.confirmClick}
            data-dialog="close"
          >
            ${this._params.primaryButtonLabel}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
        }
        confirmClick() {
            this._params.confirm();
        }
        cancelClick() {
            this._params.cancel();
        }
    };
    __decorate([
        n$2({ attribute: false })
    ], GenericDialog.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], GenericDialog.prototype, "_params", void 0);
    GenericDialog = __decorate([
        e$3('scheduler-generic-dialog')
    ], GenericDialog);

    var genericDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get GenericDialog () { return GenericDialog; }
    });

    let DialogSchedulerEditor = class DialogSchedulerEditor extends s {
        constructor() {
            super(...arguments);
            this.large = false;
            this.selectedEntry = 0;
            this.selectedSlot = null;
            this._panel = "main";
            this._viewMode = EditorMode.Single;
        }
        set viewMode(mode) {
            this._viewMode = mode;
            if (mode == EditorMode.Single) {
                let slotIdx = this.schedule.entries[this.selectedEntry].slots.findIndex(e => e.actions.length);
                this.selectedSlot = slotIdx >= 0 ? slotIdx : 1;
            }
        }
        shouldUpdate(changedProps) {
            if (changedProps.size == 1 && changedProps.has('hass') && isDefined(this.hass))
                return false;
            return true;
        }
        async showDialog(params) {
            var _a;
            this._params = params;
            this.schedule = params.schedule;
            this._panel = "main";
            this.large = false;
            const isTimeSchemeType = this.schedule.entries[this.selectedEntry].slots.filter(e => e.actions.length && isDefined(e.stop)).length > 0
                || this.schedule.entries[this.selectedEntry].slots.filter(e => e.actions.length).length > 1
                || this.schedule.entries[this.selectedEntry].slots.length > 3;
            let slotIdx = this.schedule.entries[this.selectedEntry].slots.findIndex(e => e.actions.length);
            this.selectedSlot = slotIdx >= 0 ? slotIdx : null;
            this.viewMode = isTimeSchemeType
                ? EditorMode.Scheme
                : ((_a = this._params) === null || _a === void 0 ? void 0 : _a.cardConfig.default_editor) || EditorMode.Single;
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
      <ha-dialog
        open
        @closed=${this.closeDialog}
        width="${this.large ? 'full' : 'medium'}"
        prevent-scrim-close
      >
        <ha-dialog-header slot="header">
          ${this._panel == "main"
            ? x `
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiClose}
          ></ha-icon-button>
          <ha-icon-button
            slot="actionItems"
            .label=""
            .path=${mdiCogOutline}
            @click=${() => { this._panel = "options"; }}
          ></ha-icon-button>
          `
            : x `
          <ha-icon-button
            slot="navigationIcon"
            .label=${hassLocalize('ui.dialogs.more_info_control.dismiss', this.hass)}
            .path=${mdiArrowLeft}
            @click=${() => { this._panel = "main"; }}
          ></ha-icon-button>
          `}
          <div slot="title" @click=${() => this.large = !this.large}>
            ${this._params.editItem
            ? this.schedule.name
                ? (_a = this.schedule) === null || _a === void 0 ? void 0 : _a.name
                : localize('ui.panel.common.default_name', this.hass, '{id}', this._params.editItem)
            : localize('ui.panel.common.new_schedule', this.hass)}
          </div>
        </ha-dialog-header>

        <div class="content">

          ${this._panel == "main"
            ? x `
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
            `
            : x `
          <scheduler-options-panel
            .hass=${this.hass}
            .config=${this._params.cardConfig}
            .schedule=${this.schedule}
            @change=${this._updateSchedule}
          >
          </scheduler-options-panel>
        `}
        </div>

          <div class="buttons" slot="footer">
            <ha-button appearance="plain" @click=${this._handleDeleteClick} variant="danger" ?disabled=${!this.schedule.entity_id}>
              ${hassLocalize('ui.common.delete', this.hass)}
            </ha-button>
            <ha-button appearance="plain" @click=${this._handleSaveClick}>
              ${hassLocalize('ui.common.save', this.hass)}
            </ha-button>
          </div>
      </ha-dialog>
    `;
        }
        _updateSchedule(ev) {
            let changedProps = Object.keys(ev.detail);
            if (changedProps.includes('schedule')) {
                let schedule = ev.detail.schedule;
                this.schedule = schedule;
            }
            if (changedProps.includes('selectedSlot')) {
                this.selectedSlot = ev.detail.selectedSlot;
            }
        }
        async _handleSaveClick(ev) {
            const error = validateSchedule(this.schedule, this.hass, this._params.cardConfig.customize);
            if (error) {
                await new Promise(resolve => {
                    const params = {
                        cancel: () => resolve(false),
                        confirm: () => resolve(true),
                        title: hassLocalize('state_badge.default.error', this.hass),
                        description: localize(`ui.panel.editor.validation_errors.${error}`, this.hass),
                        primaryButtonLabel: hassLocalize('ui.common.ok', this.hass)
                    };
                    fireEvent(ev.target, 'show-dialog', {
                        dialogTag: 'scheduler-generic-dialog',
                        dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
                        dialogParams: params,
                    });
                });
            }
            else if (this.schedule.schedule_id) {
                const oldSchedule = parseTimeBar(await fetchScheduleItem(this.hass, this.schedule.schedule_id), this.hass);
                //do not save if there are no changes made
                if (deepCompare(this.schedule, oldSchedule)) {
                    this.closeDialog();
                    return;
                }
                if (!oldSchedule.enabled) {
                    const result = await new Promise(resolve => {
                        const params = {
                            title: localize('ui.dialog.enable_schedule.title', this.hass),
                            description: localize('ui.dialog.enable_schedule.description', this.hass),
                            primaryButtonLabel: hassLocalize('ui.common.yes', this.hass),
                            secondaryButtonLabel: hassLocalize('ui.common.no', this.hass),
                            cancel: () => {
                                resolve(false);
                            },
                            confirm: () => {
                                resolve(true);
                            },
                        };
                        fireEvent(ev.target, 'show-dialog', {
                            dialogTag: 'scheduler-generic-dialog',
                            dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
                            dialogParams: params,
                        });
                    });
                    if (result)
                        this.hass.callService('switch', 'turn_on', { entity_id: oldSchedule.entity_id });
                }
                updateSchedule(this.hass, this.schedule)
                    .catch(e => handleWebsocketError(e, this, this.hass))
                    .then(() => {
                    this.closeDialog();
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
                    primaryButtonLabel: hassLocalize('ui.common.ok', this.hass),
                    secondaryButtonLabel: hassLocalize('ui.common.cancel', this.hass),
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
        _setViewMode(ev) {
            let viewMode = ev.detail;
            const multipleActionsDefined = this.schedule.entries[this.selectedEntry].slots.filter(e => e.actions.length).length > 1;
            if (viewMode == EditorMode.Scheme) {
                this.viewMode = viewMode;
                const isDefaultSchedule = deepCompare([...this.schedule.entries], [...defaultSingleTimerConfig.entries]);
                if (isDefaultSchedule) {
                    this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: [...defaultTimeSchemeConfig.entries] });
                }
                else {
                    // Convert any checkpoint slots (stop === undefined, used by single-timer mode) to
                    // duration slots so they display correctly in the scheme editor, which no longer
                    // has a checkbox to toggle checkpoint mode.
                    const hasCheckpoints = this.schedule.entries.some(e => e.slots.some(s => s.stop === undefined));
                    if (hasCheckpoints) {
                        this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(entry => (Object.assign(Object.assign({}, entry), { slots: entry.slots.map((slot, idx, arr) => {
                                    if (slot.stop !== undefined)
                                        return slot;
                                    // Use next slot's start as stop; fall back to '00:00:00' which,
                                    // when used as a stop time, is treated as the end of the 24-hour day.
                                    const nextSlot = arr[idx + 1];
                                    return Object.assign(Object.assign({}, slot), { stop: nextSlot ? nextSlot.start : '00:00:00' });
                                }) }))) });
                    }
                }
                return;
            }
            else if (viewMode == EditorMode.Single && !multipleActionsDefined) {
                const isDefaultSchedule = deepCompare([...this.schedule.entries], [...defaultTimeSchemeConfig.entries]);
                if (isDefaultSchedule) {
                    this.schedule = Object.assign(Object.assign({}, this.schedule), { entries: [...defaultSingleTimerConfig.entries] });
                }
                else {
                    let schedule = Object.assign(Object.assign({}, this.schedule), { entries: this.schedule.entries.map(e => {
                            let idx = e.slots.findIndex(e => e.actions.length);
                            if (idx < 0)
                                idx = Math.floor(e.slots.length / 2);
                            return Object.assign(Object.assign({}, e), { slots: e.slots.map((e, i) => i == idx ? Object.assign(Object.assign({}, e), { stop: undefined }) : null).filter(isDefined) });
                        }) });
                    this.schedule = parseTimeBar(schedule, this.hass);
                }
                this.viewMode = viewMode;
                return;
            }
            new Promise(resolve => {
                const params = {
                    title: localize('ui.dialog.confirm_migrate.title', this.hass),
                    description: localize('ui.dialog.confirm_migrate.description', this.hass),
                    primaryButtonLabel: this.hass.localize('ui.common.yes'),
                    secondaryButtonLabel: this.hass.localize('ui.common.no'),
                    cancel: () => {
                        resolve(false);
                    },
                    confirm: () => {
                        resolve(true);
                    },
                };
                fireEvent(ev.target, 'show-dialog', {
                    dialogTag: 'scheduler-generic-dialog',
                    dialogImport: () => Promise.resolve().then(function () { return genericDialog; }),
                    dialogParams: params,
                });
            })
                .then((res) => {
                if (!res)
                    return;
                this.schedule = convertSchemeToSingle(this.schedule);
                this.viewMode = viewMode;
            });
        }
    };
    DialogSchedulerEditor.styles = EditorDialogStyles;
    __decorate([
        n$2({ attribute: false })
    ], DialogSchedulerEditor.prototype, "hass", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "_params", void 0);
    __decorate([
        n$2({ type: Boolean, reflect: true })
    ], DialogSchedulerEditor.prototype, "large", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "schedule", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "selectedEntry", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "selectedSlot", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "_panel", void 0);
    __decorate([
        t$1()
    ], DialogSchedulerEditor.prototype, "_viewMode", void 0);
    DialogSchedulerEditor = __decorate([
        e$3('dialog-scheduler-editor')
    ], DialogSchedulerEditor);

    var dialogSchedulerEditor = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogSchedulerEditor () { return DialogSchedulerEditor; }
    });

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class e extends i$1{constructor(i){if(super(i),this.et=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this.ft=void 0,this.et=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

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
    const formatTime = (dateObj, locale, formatOption) => {
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
            const amPm = convertTo12Hour(dateObj.getHours()).am_pm;
            const hours12 = convertTo12Hour(dateObj.getHours()).hours;
            return `${hours12}:${String(dateObj.getMinutes()).padStart(2, '0')} ${amPm}`;
        }
        if (formatOption === TimeFormat.twenty_four || (!formatOption && locale.time_format === TimeFormat.twenty_four)) {
            return `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
        }
        if (supportLocaleString()) {
            return dateObj.toLocaleTimeString(locale.language, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: useAmPm(locale),
            });
        }
        return useAmPm(locale)
            ? formatTime(dateObj, locale, TimeFormat.am_pm)
            : formatTime(dateObj, locale, TimeFormat.twenty_four);
    };
    let SchedulerRelativeTime = class SchedulerRelativeTime extends s {
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
                        day = formatDate(dateObj, this._hass.locale);
                    }
                    else if (daysFromNow > 7) {
                        //Next Friday
                        day = localize('ui.components.date.next_week_day', this._hass, '{weekday}', computeDayDisplay(dateObj, 'long', this._hass));
                    }
                    else if (daysFromNow == 1) {
                        //Tomorrow
                        day = localize('ui.components.date.tomorrow', this._hass);
                    }
                    else if (daysFromNow > 0) {
                        //Friday
                        day = computeDayDisplay(dateObj, 'long', this._hass);
                    }
                    let time = localize('ui.components.time.absolute', this._hass, '{time}', formatTime(dateObj, this._hass.locale));
                    if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0) {
                        time = localize('ui.components.time.at_noon', this._hass);
                    }
                    else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0) {
                        time = localize('ui.components.time.at_midnight', this._hass);
                    }
                    return String(day + ' ' + time).trim();
                }
                else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
                    // in 1 hour and 52 minutes
                    const mins = Math.round(delta / secondsPerMinute - 60);
                    const join = hassLocalize('ui.common.and', this._hass);
                    const text1 = new Intl.RelativeTimeFormat(this._hass.language, { numeric: 'auto' }).format(1, 'hour');
                    const text2 = Intl.NumberFormat(this._hass.locale.language, {
                        style: 'unit',
                        unit: 'minute',
                        unitDisplay: 'long',
                    }).format(mins);
                    return `${text1} ${join} ${text2}`;
                }
                else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
                    // in 1 minute and 52 seconds
                    const seconds = Math.round(delta - 60);
                    const join = hassLocalize('ui.common.and', this._hass);
                    const text1 = new Intl.RelativeTimeFormat(this._hass.language, { numeric: 'auto' }).format(1, 'minute');
                    const text2 = Intl.NumberFormat(this._hass.locale.language, {
                        style: 'unit',
                        unit: 'second',
                        unitDisplay: 'long',
                    }).format(seconds);
                    return `${text1} ${join} ${text2}`;
                }
            }
            // in 5 minutes/hours/seconds (or now)
            const diff = selectUnit(dateObj);
            return new Intl.RelativeTimeFormat(this._hass.language, { numeric: 'auto' }).format(diff.value, diff.unit);
        }
        render() {
            if (!this._hass || !this.datetime)
                return x ``;
            const now = new Date();
            const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
            let updateInterval = 60;
            if (Math.abs(secondsRemaining) <= 150)
                updateInterval = Math.max(Math.ceil(Math.abs(secondsRemaining)) / 10, 2);
            if (this.updateInterval != updateInterval)
                this.startRefreshTimer(updateInterval);
            return x `
      ${capitalizeFirstLetter(this.relativeTime(this.datetime))}
    `;
        }
    };
    __decorate([
        n$2()
    ], SchedulerRelativeTime.prototype, "_hass", void 0);
    __decorate([
        n$2()
    ], SchedulerRelativeTime.prototype, "datetime", void 0);
    SchedulerRelativeTime = __decorate([
        e$3('scheduler-relative-time')
    ], SchedulerRelativeTime);

    let SchedulerItemRow = class SchedulerItemRow extends s {
        render() {
            var _a, _b, _c, _d, _e;
            try {
                const stateObj = this.hass.states[this.schedule.entity_id];
                if (!stateObj)
                    return x ``;
                const disabled = ['off', 'completed'].includes(stateObj.state);
                const nextAction = this.schedule.entries[0].slots[this.schedule.next_entries[0] || 0].actions[0];
                let icon = computeActionIcon(nextAction, this.config.customize);
                if (((_a = this.config.display_options) === null || _a === void 0 ? void 0 : _a.icon) == 'entity') {
                    let entityId = [((_b = nextAction.target) === null || _b === void 0 ? void 0 : _b.entity_id) || []].flat().shift();
                    if (['script', 'notify'].includes(computeDomain(nextAction.service)))
                        entityId = nextAction.service;
                    if (entityId)
                        icon = computeEntityIcon(entityId, this.config.customize, this.hass);
                }
                const hasRemovedEntity = !([((_c = nextAction.target) === null || _c === void 0 ? void 0 : _c.entity_id) || []].flat()).every(entity_id => Object.keys(this.hass.states).includes(entity_id));
                if (hasRemovedEntity)
                    icon = 'mdi:help';
                return x `
      <ha-icon
        icon="${icon}"
        @click=${this._handleIconClick}
        class="${disabled ? 'disabled' : ''}"
      ></ha-icon>

      <div
        class="info ${disabled ? 'disabled' : ''} ${hasRemovedEntity ? 'defective' : ''}"
        @click=${this._handleItemClick}
      >
        ${this.renderDisplayItem(((_d = this.config.display_options) === null || _d === void 0 ? void 0 : _d.primary_info) || DEFAULT_PRIMARY_INFO_DISPLAY)}
        <div class="secondary">
        ${this.renderDisplayItem(((_e = this.config.display_options) === null || _e === void 0 ? void 0 : _e.secondary_info) || DEFAULT_SECONDARY_INFO_DISPLAY)}
        </div>
      </div>
      <div class="state">
        ${this.config.show_toggle_switches !== false
                ? x `<ha-switch
              ?checked=${['on', 'triggered'].includes(stateObj.state || '')}
              ?disabled=${stateObj.state == 'completed'}
              @click=${this._toggleEnableDisable}
            ></ha-switch>`
                : ''}
      </div>

    `;
            }
            catch (e) {
                return x `
        <hui-warning .hass=${this.hass} @click=${this._handleItemClick}>
          <span style="white-space: normal">
            Failed to display schedule ${this.schedule.entity_id}.
            Reason: ${e}
          </span>
        </hui-warning>
      `;
            }
        }
        renderDisplayItem(displayItem) {
            const replacePreservedTags = (input) => {
                const parts = input.split('<relative-time></relative-time>');
                if (parts.length > 1) {
                    const ts = this.schedule.timestamps[this.schedule.next_entries[0] || 0];
                    return x `
          ${parts[0] ? o(parts[0]) : ''}
          <scheduler-relative-time
            .hass=${this.hass}
            .datetime=${new Date(ts)}
          >
          </scheduler-relative-time>
          ${parts[1] ? o(parts[1]) : ''}
        `;
                }
                const res = input.match(/^(<tag>[^<]*<\/tag>)+$/);
                if (res !== null) {
                    let tags = input.split(/<tag>([^<]*)<\/tag>/).filter(e => e);
                    return x `
          <div class="tags">
            ${tags === null || tags === void 0 ? void 0 : tags.map(e => x `<span class="tag">${e}</span>`)}
          </div>`;
                }
                return o(input);
            };
            return computeScheduleDisplay(this.schedule, displayItem, this.hass, this.config.customize)
                .filter(e => e.length)
                .map(e => x `${replacePreservedTags(e)}<br/>`);
        }
        _handleItemClick(_ev) {
            const myEvent = new CustomEvent('editClick', { detail: { schedule_id: this.schedule_id } });
            this.dispatchEvent(myEvent);
        }
        _handleIconClick(_ev) {
            const myEvent = new CustomEvent('editClick', { detail: { schedule_id: this.schedule_id } });
            this.dispatchEvent(myEvent);
        }
        _toggleEnableDisable(ev) {
            ev.stopPropagation();
            const checked = !ev.target.checked;
            this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: this.schedule.entity_id });
        }
        static get styles() {
            return i$4 `
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
        line-height: var(--ha-line-height-normal);
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
    `;
        }
    };
    __decorate([
        n$2()
    ], SchedulerItemRow.prototype, "hass", void 0);
    __decorate([
        n$2()
    ], SchedulerItemRow.prototype, "schedule_id", void 0);
    __decorate([
        n$2()
    ], SchedulerItemRow.prototype, "schedule", void 0);
    __decorate([
        n$2()
    ], SchedulerItemRow.prototype, "config", void 0);
    SchedulerItemRow = __decorate([
        e$3("scheduler-item-row")
    ], SchedulerItemRow);

    exports.SchedulerCard = class SchedulerCard extends s {
        constructor() {
            super(...arguments);
            this._config = {};
            this.showDiscovered = false;
            this.translationsLoaded = false;
            this.connectionError = false;
        }
        async setConfig(userConfig) {
            userConfig = validateConfig(userConfig);
            this._config = Object.assign({}, userConfig);
        }
        async firstUpdated() {
            await loadHaForm();
            const el = document.querySelector('home-assistant');
            el._loadFragmentTranslations(this.hass.language, 'config');
            await loadConfigFromEntityRegistry(this.hass)
                .then(extraConfig => {
                extraConfig = Object.fromEntries(Object.entries(extraConfig).filter(([k]) => entityIncludedByConfig(k, this._config)));
                this._config = Object.assign(Object.assign({}, this._config), { customize: Object.assign(Object.assign({}, extraConfig), (this._config.customize || {})) });
            });
        }
        willUpdate() {
            this.hass.loadBackendTranslation("services");
        }
        __checkSubscribed() {
            if (this.__unsubs !== undefined || !this.isConnected || this.hass === undefined) {
                return;
            }
            this.__unsubs = this.hassSubscribe();
        }
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
            if (oldConfig && this._config) {
                const changedKeys = Object.keys(oldConfig).filter(e => oldConfig[e] !== this._config[e]);
                if (changedKeys.some(e => ['tags', 'discover_existing', 'sort_by', 'display_options'].includes(e)))
                    (async () => await this.loadSchedules())();
            }
            if (!this.translationsLoaded
                && hassLocalize(`component.input_boolean.services.turn_on.name`, this.hass, false).length
                && hassLocalize('ui.panel.config.automation.editor.conditions.type.sun.sunrise', this.hass, false).length) {
                this.translationsLoaded = true;
                return true;
            }
            //only reload card if a schedule entity has changed
            if (oldHass && changedProps.size == 1 && this.schedules) {
                return Object.values(this.schedules).some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this.hass.states[e.entity_id]));
            }
            return true;
        }
        render() {
            let items = [...this.schedules || []];
            let includedItems = items.filter(e => isIncludedSchedule(e, this._config));
            let excludedItems = items.filter(e => !isIncludedSchedule(e, this._config));
            const headerToggleState = this.showDiscovered
                ? items.some(el => { var _a; return ['on', 'triggered'].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); })
                : includedItems.some(el => { var _a; return ['on', 'triggered'].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); });
            return x `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${!isDefined(this._config.title) || (typeof this._config.title === 'boolean' && this._config.title)
            ? localize('ui.panel.common.title', this.hass)
            : typeof this._config.title == 'boolean'
                ? ''
                : this._config.title}
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

    ${this.connectionError
            ? x `
        <div>
          <hui-warning .hass=${this.hass}>
            <span style="white-space: normal">
              ${localize('ui.panel.overview.backend_error', this.hass)}
            </span>
          </hui-warning>
        </div>
      `
            : !Object.keys(items).length
                ? x `
        <div>
          ${localize('ui.panel.overview.no_entries', this.hass)}
        </div>
        `
                : includedItems.map(scheduleItem => x `
            <scheduler-item-row
              .hass=${this.hass}
              .config=${this._config}
              .schedule_id=${scheduleItem.schedule_id}
              .schedule=${scheduleItem}
              @editClick=${(ev) => { this._handleEditClick(ev, scheduleItem); }}
            >
            </scheduler-item-row>
          `)}

      ${Object.keys(items).length > includedItems.length && this._config.discover_existing !== false
            ? !this.showDiscovered
                ? x `
              <div>
                <ha-button
                  appearance="plain"
                  @click=${() => {
                    this.showDiscovered = true;
                }}
                >
                  +
                  ${localize('ui.panel.overview.excluded_items', this.hass, '{number}', Object.keys(items).length - includedItems.length)}
                </ha-button>
              </div>
            `
                : x `

          ${excludedItems.map(scheduleItem => x `
                <scheduler-item-row
                  .hass=${this.hass}
                  .config=${this._config}
                  .schedule_id=${scheduleItem.schedule_id}
                  .schedule=${scheduleItem}
              @editClick=${(ev) => { this._handleEditClick(ev, scheduleItem); }}
                >
                </scheduler-item-row>
              `)}

              <div>
                <ha-button
                  appearance="plain"
                  @click=${() => {
                    this.showDiscovered = false;
                }}
                >
                  ${localize('ui.panel.overview.hide_excluded', this.hass)}
                </ha-button>
              </div>
            `
            : ''}
        </div>
        ${this._config.show_add_button !== false ? x `
        <div class="card-actions">
          ${this.connectionError
            ? x `
          <ha-button appearance="plain" variant="warning" @click=${this._retryConnection}
            >${hassLocalize('ui.common.refresh', this.hass)}
          </ha-button>
            `
            : x `
          <ha-button appearance="plain" @click=${this._addClick}
            >${hassLocalize('ui.common.add', this.hass)}
          </ha-button>
          `}
        </div>` : ''}
      </ha-card>
    `;
        }
        async loadSchedules() {
            fetchItems(this.hass)
                .then(res => {
                this.schedules = sortSchedules(res, this._config, this.hass);
            })
                .catch(_e => {
                this.schedules = [];
                this.connectionError = true;
            });
        }
        async getCardSize() {
            return new Promise(res => {
                let retries = 0;
                const wait = setInterval(() => {
                    var _a;
                    retries++;
                    if (!this._config || (!this.schedules && !this.connectionError && retries < 50))
                        return;
                    let cardSize = this._config.title || this._config.show_header_toggle ? 3 : 1;
                    if (this._config.show_add_button)
                        cardSize += 1;
                    const rowSize = (([((_a = this._config.display_options) === null || _a === void 0 ? void 0 : _a.secondary_info) || []].flat().length || 2) + 1) / 2;
                    if (this.schedules)
                        cardSize += this.showDiscovered
                            ? Object.keys(this.schedules).length * rowSize
                            : Object.values(this.schedules).filter(e => isIncludedSchedule(e, this._config)).length * rowSize;
                    clearInterval(wait);
                    res(Math.round(cardSize));
                }, 50);
            });
        }
        _retryConnection() {
            setTimeout(async () => {
                await this.loadSchedules();
            }, 100);
            this.connectionError = false;
            this.requestUpdate();
        }
        async handleScheduleItemUpdated(ev) {
            //only update single schedule
            if (ev.event == 'scheduler_item_removed') {
                this.schedules = (this.schedules || []).filter(e => e.schedule_id !== ev.schedule_id);
                return;
            }
            fetchScheduleItem(this.hass, ev.schedule_id).then(schedule => {
                const oldScheduleIdx = this.schedules.findIndex(e => e.schedule_id == ev.schedule_id);
                const oldSchedule = oldScheduleIdx >= 0 ? this.schedules[oldScheduleIdx] : null;
                let schedules = [...(this.schedules || [])];
                if (!schedule || (this._config.discover_existing === false && !isIncludedSchedule(schedule, this._config))) {
                    //schedule is not in the list, remove if it was in the list
                    if (oldSchedule) {
                        schedules = schedules.filter(e => e.schedule_id !== ev.schedule_id);
                    }
                }
                else if (!oldSchedule) {
                    //add a new schedule and sort the list
                    schedules = sortSchedules([...schedules, schedule], this._config, this.hass);
                }
                else if (oldSchedule.timestamps[oldSchedule.next_entries[0] || 0] == schedule.timestamps[schedule.next_entries[0] || 0]) {
                    //only overwrite the existing schedule
                    schedules = Object.assign(schedules, { [oldScheduleIdx]: schedule });
                }
                else {
                    //overwrite the existing schedule and sort
                    schedules = Object.assign(schedules, { [oldScheduleIdx]: schedule });
                    schedules = sortSchedules(schedules, this._config, this.hass);
                }
                this.schedules = [...schedules];
            });
        }
        _handleEditClick(ev, item) {
            if (!this.schedules)
                return;
            const params = {
                schedule: parseTimeBar(item, this.hass),
                cardConfig: this._config,
                editItem: item.schedule_id
            };
            fireEvent(ev.target, 'show-dialog', {
                dialogTag: 'dialog-scheduler-editor',
                dialogImport: () => Promise.resolve().then(function () { return dialogSchedulerEditor; }),
                dialogParams: params,
            });
        }
        _addClick(_ev) {
            const defaultTags = [this._config.tags || []].flat().filter(e => !['none', 'disabled', 'enabled'].includes(e));
            let clonedConfig = this._config.default_editor == EditorMode.Scheme
                ? JSON.parse(JSON.stringify(defaultTimeSchemeConfig))
                : JSON.parse(JSON.stringify(defaultSingleTimerConfig));
            const params = {
                schedule: Object.assign(Object.assign({}, clonedConfig), { tags: defaultTags.length == 1 ? defaultTags : [] }),
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
            const items = Object.values(this.schedules).filter(el => this.showDiscovered || isIncludedSchedule(el, this._config));
            items.forEach(el => {
                this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
            });
        }
        // card configuration
        static getConfigElement() {
            return document.createElement('scheduler-card-editor');
        }
    };
    exports.SchedulerCard.styles = i$4 `
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
  `;
    __decorate([
        n$2({ attribute: false })
    ], exports.SchedulerCard.prototype, "hass", void 0);
    __decorate([
        n$2()
    ], exports.SchedulerCard.prototype, "_config", void 0);
    __decorate([
        t$1()
    ], exports.SchedulerCard.prototype, "schedules", void 0);
    __decorate([
        t$1()
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

})({});
