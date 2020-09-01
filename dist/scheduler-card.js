!function(t){"use strict";
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
    ***************************************************************************** */function e(t,e,i,n){var r,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(s<3?r(o):s>3?r(e,i,o):r(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */}const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},r=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${r}--\x3e`,o=new RegExp(`${r}|${s}`);class a{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],s=document.createTreeWalker(e.content,133,null,!1);let a=0,u=-1,h=0;const{strings:p,values:{length:f}}=t;for(;h<f;){const t=s.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)c(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=p[h],i=l.exec(e)[2],n=i.toLowerCase()+"$lit$",r=t.getAttribute(n);t.removeAttribute(n);const s=r.split(o);this.parts.push({type:"attribute",index:u,name:i,strings:s}),h+=s.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const n=t.parentNode,r=e.split(o),s=r.length-1;for(let e=0;e<s;e++){let i,s=r[e];if(""===s)i=d();else{const t=l.exec(s);null!==t&&c(t[2],"$lit$")&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(s)}n.insertBefore(i,t),this.parts.push({type:"node",index:++u})}""===r[s]?(n.insertBefore(d(),t),i.push(t)):t.data=r[s],h+=s}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&u!==a||(u++,e.insertBefore(d(),t)),a=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(i.push(t),u--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),h++}}else s.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const c=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},u=t=>-1!==t.index,d=()=>document.createComment(""),l=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(t,e){const{element:{content:i},parts:n}=t,r=document.createTreeWalker(i,133,null,!1);let s=f(n),o=n[s],a=-1,c=0;const u=[];let d=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(u.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,s=f(n,s),o=n[s]}u.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},f=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(u(e))return i}return-1};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const v=new WeakMap,m=t=>"function"==typeof t&&v.has(t),y={},g={};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class b{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,o=0,a=0,c=r.nextNode();for(;o<n.length;)if(s=n[o],u(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=e.pop(),c=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const _=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),w=` ${r} `;class j{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const a=l.exec(t);e+=null===a?t+(i?w:s):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+r}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==_&&(e=_.createHTML(e)),t.innerHTML=e,t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const x=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class ${constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new O(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!S(t))return t}let n="";for(let r=0;r<e;r++){n+=t[r];const e=i[r];if(void 0!==e){const t=e.value;if(x(t)||!S(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===y||x(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=y,t(this)}this.value!==y&&this.committer.commit()}}class A{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}const t=this.__pendingValue;t!==y&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof j?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const i=new b(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const r of t)i=e[n],void 0===i&&(i=new A(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(r),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=y}}class C extends ${constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends O{}let P=!1;(()=>{try{const t={get capture(){return P=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class N{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=y}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(P?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */;function I(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(r);return i=e.keyString.get(n),void 0===i&&(i=new a(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,z=new WeakMap;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const U=new
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class{handleAttributeExpressions(t,e,i,n){const r=e[0];if("."===r){return new C(t,e.slice(1),i).parts}if("@"===r)return[new N(t,e.slice(1),n.eventContext)];if("?"===r)return[new k(t,e.slice(1),i)];return new $(t,e,i).parts}handleTextExpression(t){return new A(t)}};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(t,...e)=>new j(t,e,"html",U)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,R=(t,e)=>`${t}--${e}`;let D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);const F=t=>e=>{const i=R(e.type,t);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let s=n.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(r);if(s=n.keyString.get(o),void 0===s){const i=e.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(i,t),s=new a(e,i),n.keyString.set(o,s)}return n.stringsArray.set(e.strings,s),s},G=["html","svg"],L=new Set,q=(t,e,i)=>{L.add(t);const n=i?i.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,t);const o=document.createElement("style");for(let t=0;t<s;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{G.forEach(e=>{const i=M.get(R(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),h(t,i)})})})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:r}=t;if(null==i)return void n.appendChild(e);const s=document.createTreeWalker(n,133,null,!1);let o=f(r),a=0,c=-1;for(;s.nextNode();){c++;for(s.currentNode===i&&(a=p(e),i.parentNode.insertBefore(e,i));-1!==o&&r[o].index===c;){if(a>0){for(;-1!==o;)r[o].index+=a,o=f(r,o);return}o=f(r,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),h(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdateInternal(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||H,r="function"==typeof n?n:n.fromAttribute;return r?r(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||H.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=W){const n=this.constructor,r=n._attributeNameForProperty(t,i);if(void 0!==r){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const r=this.constructor;i=i||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J.finalized=!0;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function K(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Z(t,e)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class Y{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const tt={};class et extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),n=[];i.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Y(String(e),X)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==tt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return tt}}et.finalized=!0,et.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,s=z.has(e),o=D&&11===e.nodeType&&!!e.host,a=o&&!L.has(r),c=a?document.createDocumentFragment():e;if(((t,e,i)=>{let r=z.get(e);void 0===r&&(n(e,e.firstChild),z.set(e,r=new A(Object.assign({templateFactory:I},i))),r.appendInto(e)),r.setValue(t),r.commit()})(t,c,Object.assign({templateFactory:F(r)},i)),a){const t=z.get(c);z.delete(c);const i=t.value instanceof b?t.value.template:void 0;q(r,c,i),n(e,e.firstChild),e.appendChild(c),z.set(e,t)}!s&&o&&window.ShadyCSS.styleElement(e.host)};var it="object"==typeof global&&global&&global.Object===Object&&global,nt="object"==typeof self&&self&&self.Object===Object&&self,rt=it||nt||Function("return this")(),st=rt.Symbol,ot=Object.prototype,at=ot.hasOwnProperty,ct=ot.toString,ut=st?st.toStringTag:void 0;var dt=Object.prototype.toString;var lt=st?st.toStringTag:void 0;function ht(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":lt&&lt in Object(t)?function(t){var e=at.call(t,ut),i=t[ut];try{t[ut]=void 0;var n=!0}catch(t){}var r=ct.call(t);return n&&(e?t[ut]=i:delete t[ut]),r}(t):function(t){return dt.call(t)}(t)}function pt(t){return null!=t&&"object"==typeof t}function ft(t){return"symbol"==typeof t||pt(t)&&"[object Symbol]"==ht(t)}function vt(t,e){for(var i=-1,n=null==t?0:t.length,r=Array(n);++i<n;)r[i]=e(t[i],i,t);return r}var mt=Array.isArray,yt=st?st.prototype:void 0,gt=yt?yt.toString:void 0;function bt(t){if("string"==typeof t)return t;if(mt(t))return vt(t,bt)+"";if(ft(t))return gt?gt.call(t):"";var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}function _t(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var wt=/^\s+|\s+$/g,jt=/^[-+]0x[0-9a-f]+$/i,xt=/^0b[01]+$/i,St=/^0o[0-7]+$/i,$t=parseInt;function Ot(t){return t?(t=function(t){if("number"==typeof t)return t;if(ft(t))return NaN;if(_t(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=_t(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(wt,"");var i=xt.test(t);return i||St.test(t)?$t(t.slice(2),i?2:8):jt.test(t)?NaN:+t}(t))===1/0||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}function At(t){return t}function kt(t){if(!_t(t))return!1;var e=ht(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}var Ct,Et=rt["__core-js_shared__"],Pt=(Ct=/[^.]+$/.exec(Et&&Et.keys&&Et.keys.IE_PROTO||""))?"Symbol(src)_1."+Ct:"";var Nt=Function.prototype.toString;function Tt(t){if(null!=t){try{return Nt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var It=/^\[object .+?Constructor\]$/,Mt=Function.prototype,zt=Object.prototype,Ut=Mt.toString,Vt=zt.hasOwnProperty,Rt=RegExp("^"+Ut.call(Vt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Dt(t){return!(!_t(t)||(e=t,Pt&&Pt in e))&&(kt(t)?Rt:It).test(Tt(t));var e}function Ft(t,e){var i=function(t,e){return null==t?void 0:t[e]}(t,e);return Dt(i)?i:void 0}var Gt=Ft(rt,"WeakMap"),Lt=Object.create,qt=function(){function t(){}return function(e){if(!_t(e))return{};if(Lt)return Lt(e);t.prototype=e;var i=new t;return t.prototype=void 0,i}}();function Ht(t,e,i){switch(i.length){case 0:return t.call(e);case 1:return t.call(e,i[0]);case 2:return t.call(e,i[0],i[1]);case 3:return t.call(e,i[0],i[1],i[2])}return t.apply(e,i)}function Bt(t,e){var i=-1,n=t.length;for(e||(e=Array(n));++i<n;)e[i]=t[i];return e}var Wt=Date.now;var Jt,Zt,Kt,Qt=function(){try{var t=Ft(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),Xt=(Jt=Qt?function(t,e){return Qt(t,"toString",{configurable:!0,enumerable:!1,value:(i=e,function(){return i}),writable:!0});var i}:At,Zt=0,Kt=0,function(){var t=Wt(),e=16-(t-Kt);if(Kt=t,e>0){if(++Zt>=800)return arguments[0]}else Zt=0;return Jt.apply(void 0,arguments)});function Yt(t,e){for(var i=-1,n=null==t?0:t.length;++i<n&&!1!==e(t[i],i,t););return t}function te(t,e,i,n){for(var r=t.length,s=i+(n?1:-1);n?s--:++s<r;)if(e(t[s],s,t))return s;return-1}function ee(t){return t!=t}function ie(t,e,i){return e==e?function(t,e,i){for(var n=i-1,r=t.length;++n<r;)if(t[n]===e)return n;return-1}(t,e,i):te(t,ee,i)}var ne=/^(?:0|[1-9]\d*)$/;function re(t,e){var i=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==i||"symbol"!=i&&ne.test(t))&&t>-1&&t%1==0&&t<e}function se(t,e,i){"__proto__"==e&&Qt?Qt(t,e,{configurable:!0,enumerable:!0,value:i,writable:!0}):t[e]=i}function oe(t,e){return t===e||t!=t&&e!=e}var ae=Object.prototype.hasOwnProperty;function ce(t,e,i){var n=t[e];ae.call(t,e)&&oe(n,i)&&(void 0!==i||e in t)||se(t,e,i)}function ue(t,e,i,n){var r=!i;i||(i={});for(var s=-1,o=e.length;++s<o;){var a=e[s],c=n?n(i[a],t[a],a,i,t):void 0;void 0===c&&(c=t[a]),r?se(i,a,c):ce(i,a,c)}return i}var de=Math.max;function le(t,e,i){return e=de(void 0===e?t.length-1:e,0),function(){for(var n=arguments,r=-1,s=de(n.length-e,0),o=Array(s);++r<s;)o[r]=n[e+r];r=-1;for(var a=Array(e+1);++r<e;)a[r]=n[r];return a[e]=i(o),Ht(t,this,a)}}function he(t,e){return Xt(le(t,e,At),t+"")}function pe(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}function fe(t){return null!=t&&pe(t.length)&&!kt(t)}function ve(t,e,i){if(!_t(i))return!1;var n=typeof e;return!!("number"==n?fe(i)&&re(e,i.length):"string"==n&&e in i)&&oe(i[e],t)}var me=Object.prototype;function ye(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||me)}function ge(t){return pt(t)&&"[object Arguments]"==ht(t)}var be=Object.prototype,_e=be.hasOwnProperty,we=be.propertyIsEnumerable,je=ge(function(){return arguments}())?ge:function(t){return pt(t)&&_e.call(t,"callee")&&!we.call(t,"callee")};var xe="object"==typeof t&&t&&!t.nodeType&&t,Se=xe&&"object"==typeof module&&module&&!module.nodeType&&module,$e=Se&&Se.exports===xe?rt.Buffer:void 0,Oe=($e?$e.isBuffer:void 0)||function(){return!1},Ae={};function ke(t){return function(e){return t(e)}}Ae["[object Float32Array]"]=Ae["[object Float64Array]"]=Ae["[object Int8Array]"]=Ae["[object Int16Array]"]=Ae["[object Int32Array]"]=Ae["[object Uint8Array]"]=Ae["[object Uint8ClampedArray]"]=Ae["[object Uint16Array]"]=Ae["[object Uint32Array]"]=!0,Ae["[object Arguments]"]=Ae["[object Array]"]=Ae["[object ArrayBuffer]"]=Ae["[object Boolean]"]=Ae["[object DataView]"]=Ae["[object Date]"]=Ae["[object Error]"]=Ae["[object Function]"]=Ae["[object Map]"]=Ae["[object Number]"]=Ae["[object Object]"]=Ae["[object RegExp]"]=Ae["[object Set]"]=Ae["[object String]"]=Ae["[object WeakMap]"]=!1;var Ce="object"==typeof t&&t&&!t.nodeType&&t,Ee=Ce&&"object"==typeof module&&module&&!module.nodeType&&module,Pe=Ee&&Ee.exports===Ce&&it.process,Ne=function(){try{var t=Ee&&Ee.require&&Ee.require("util").types;return t||Pe&&Pe.binding&&Pe.binding("util")}catch(t){}}(),Te=Ne&&Ne.isTypedArray,Ie=Te?ke(Te):function(t){return pt(t)&&pe(t.length)&&!!Ae[ht(t)]},Me=Object.prototype.hasOwnProperty;function ze(t,e){var i=mt(t),n=!i&&je(t),r=!i&&!n&&Oe(t),s=!i&&!n&&!r&&Ie(t),o=i||n||r||s,a=o?function(t,e){for(var i=-1,n=Array(t);++i<t;)n[i]=e(i);return n}(t.length,String):[],c=a.length;for(var u in t)!e&&!Me.call(t,u)||o&&("length"==u||r&&("offset"==u||"parent"==u)||s&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||re(u,c))||a.push(u);return a}function Ue(t,e){return function(i){return t(e(i))}}var Ve=Ue(Object.keys,Object),Re=Object.prototype.hasOwnProperty;function De(t){if(!ye(t))return Ve(t);var e=[];for(var i in Object(t))Re.call(t,i)&&"constructor"!=i&&e.push(i);return e}function Fe(t){return fe(t)?ze(t):De(t)}var Ge=Object.prototype.hasOwnProperty;function Le(t){if(!_t(t))return function(t){var e=[];if(null!=t)for(var i in Object(t))e.push(i);return e}(t);var e=ye(t),i=[];for(var n in t)("constructor"!=n||!e&&Ge.call(t,n))&&i.push(n);return i}function qe(t){return fe(t)?ze(t,!0):Le(t)}var He,Be=(He=function(t,e){ue(e,qe(e),t)},he((function(t,e){var i=-1,n=e.length,r=n>1?e[n-1]:void 0,s=n>2?e[2]:void 0;for(r=He.length>3&&"function"==typeof r?(n--,r):void 0,s&&ve(e[0],e[1],s)&&(r=n<3?void 0:r,n=1),t=Object(t);++i<n;){var o=e[i];o&&He(t,o,i,r)}return t}))),We=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Je=/^\w*$/;function Ze(t,e){if(mt(t))return!1;var i=typeof t;return!("number"!=i&&"symbol"!=i&&"boolean"!=i&&null!=t&&!ft(t))||(Je.test(t)||!We.test(t)||null!=e&&t in Object(e))}var Ke=Ft(Object,"create");var Qe=Object.prototype.hasOwnProperty;var Xe=Object.prototype.hasOwnProperty;function Ye(t){var e=-1,i=null==t?0:t.length;for(this.clear();++e<i;){var n=t[e];this.set(n[0],n[1])}}function ti(t,e){for(var i=t.length;i--;)if(oe(t[i][0],e))return i;return-1}Ye.prototype.clear=function(){this.__data__=Ke?Ke(null):{},this.size=0},Ye.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Ye.prototype.get=function(t){var e=this.__data__;if(Ke){var i=e[t];return"__lodash_hash_undefined__"===i?void 0:i}return Qe.call(e,t)?e[t]:void 0},Ye.prototype.has=function(t){var e=this.__data__;return Ke?void 0!==e[t]:Xe.call(e,t)},Ye.prototype.set=function(t,e){var i=this.__data__;return this.size+=this.has(t)?0:1,i[t]=Ke&&void 0===e?"__lodash_hash_undefined__":e,this};var ei=Array.prototype.splice;function ii(t){var e=-1,i=null==t?0:t.length;for(this.clear();++e<i;){var n=t[e];this.set(n[0],n[1])}}ii.prototype.clear=function(){this.__data__=[],this.size=0},ii.prototype.delete=function(t){var e=this.__data__,i=ti(e,t);return!(i<0)&&(i==e.length-1?e.pop():ei.call(e,i,1),--this.size,!0)},ii.prototype.get=function(t){var e=this.__data__,i=ti(e,t);return i<0?void 0:e[i][1]},ii.prototype.has=function(t){return ti(this.__data__,t)>-1},ii.prototype.set=function(t,e){var i=this.__data__,n=ti(i,t);return n<0?(++this.size,i.push([t,e])):i[n][1]=e,this};var ni=Ft(rt,"Map");function ri(t,e){var i,n,r=t.__data__;return("string"==(n=typeof(i=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==i:null===i)?r["string"==typeof e?"string":"hash"]:r.map}function si(t){var e=-1,i=null==t?0:t.length;for(this.clear();++e<i;){var n=t[e];this.set(n[0],n[1])}}si.prototype.clear=function(){this.size=0,this.__data__={hash:new Ye,map:new(ni||ii),string:new Ye}},si.prototype.delete=function(t){var e=ri(this,t).delete(t);return this.size-=e?1:0,e},si.prototype.get=function(t){return ri(this,t).get(t)},si.prototype.has=function(t){return ri(this,t).has(t)},si.prototype.set=function(t,e){var i=ri(this,t),n=i.size;return i.set(t,e),this.size+=i.size==n?0:1,this};function oi(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var i=function(){var n=arguments,r=e?e.apply(this,n):n[0],s=i.cache;if(s.has(r))return s.get(r);var o=t.apply(this,n);return i.cache=s.set(r,o)||s,o};return i.cache=new(oi.Cache||si),i}oi.Cache=si;var ai=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ci=/\\(\\)?/g,ui=function(t){var e=oi(t,(function(t){return 500===i.size&&i.clear(),t})),i=e.cache;return e}((function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(ai,(function(t,i,n,r){e.push(n?r.replace(ci,"$1"):i||t)})),e}));function di(t,e){return mt(t)?t:Ze(t,e)?[t]:ui(function(t){return null==t?"":bt(t)}(t))}function li(t){if("string"==typeof t||ft(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}function hi(t,e){for(var i=0,n=(e=di(e,t)).length;null!=t&&i<n;)t=t[li(e[i++])];return i&&i==n?t:void 0}function pi(t,e){for(var i=-1,n=e.length,r=t.length;++i<n;)t[r+i]=e[i];return t}var fi=st?st.isConcatSpreadable:void 0;function vi(t){return mt(t)||je(t)||!!(fi&&t&&t[fi])}function mi(t){return(null==t?0:t.length)?function t(e,i,n,r,s){var o=-1,a=e.length;for(n||(n=vi),s||(s=[]);++o<a;){var c=e[o];i>0&&n(c)?i>1?t(c,i-1,n,r,s):pi(s,c):r||(s[s.length]=c)}return s}(t,1):[]}function yi(t){return Xt(le(t,void 0,mi),t+"")}var gi=Ue(Object.getPrototypeOf,Object),bi=Function.prototype,_i=Object.prototype,wi=bi.toString,ji=_i.hasOwnProperty,xi=wi.call(Object);var Si=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");function $i(t){var e=this.__data__=new ii(t);this.size=e.size}$i.prototype.clear=function(){this.__data__=new ii,this.size=0},$i.prototype.delete=function(t){var e=this.__data__,i=e.delete(t);return this.size=e.size,i},$i.prototype.get=function(t){return this.__data__.get(t)},$i.prototype.has=function(t){return this.__data__.has(t)},$i.prototype.set=function(t,e){var i=this.__data__;if(i instanceof ii){var n=i.__data__;if(!ni||n.length<199)return n.push([t,e]),this.size=++i.size,this;i=this.__data__=new si(n)}return i.set(t,e),this.size=i.size,this};var Oi="object"==typeof t&&t&&!t.nodeType&&t,Ai=Oi&&"object"==typeof module&&module&&!module.nodeType&&module,ki=Ai&&Ai.exports===Oi?rt.Buffer:void 0,Ci=ki?ki.allocUnsafe:void 0;function Ei(t,e){for(var i=-1,n=null==t?0:t.length,r=0,s=[];++i<n;){var o=t[i];e(o,i,t)&&(s[r++]=o)}return s}function Pi(){return[]}var Ni=Object.prototype.propertyIsEnumerable,Ti=Object.getOwnPropertySymbols,Ii=Ti?function(t){return null==t?[]:(t=Object(t),Ei(Ti(t),(function(e){return Ni.call(t,e)})))}:Pi;var Mi=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)pi(e,Ii(t)),t=gi(t);return e}:Pi;function zi(t,e,i){var n=e(t);return mt(t)?n:pi(n,i(t))}function Ui(t){return zi(t,Fe,Ii)}function Vi(t){return zi(t,qe,Mi)}var Ri=Ft(rt,"DataView"),Di=Ft(rt,"Promise"),Fi=Ft(rt,"Set"),Gi=Tt(Ri),Li=Tt(ni),qi=Tt(Di),Hi=Tt(Fi),Bi=Tt(Gt),Wi=ht;(Ri&&"[object DataView]"!=Wi(new Ri(new ArrayBuffer(1)))||ni&&"[object Map]"!=Wi(new ni)||Di&&"[object Promise]"!=Wi(Di.resolve())||Fi&&"[object Set]"!=Wi(new Fi)||Gt&&"[object WeakMap]"!=Wi(new Gt))&&(Wi=function(t){var e=ht(t),i="[object Object]"==e?t.constructor:void 0,n=i?Tt(i):"";if(n)switch(n){case Gi:return"[object DataView]";case Li:return"[object Map]";case qi:return"[object Promise]";case Hi:return"[object Set]";case Bi:return"[object WeakMap]"}return e});var Ji=Wi,Zi=Object.prototype.hasOwnProperty;var Ki=rt.Uint8Array;function Qi(t){var e=new t.constructor(t.byteLength);return new Ki(e).set(new Ki(t)),e}var Xi=/\w*$/;var Yi=st?st.prototype:void 0,tn=Yi?Yi.valueOf:void 0;function en(t,e,i){var n,r,s,o=t.constructor;switch(e){case"[object ArrayBuffer]":return Qi(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,e){var i=e?Qi(t.buffer):t.buffer;return new t.constructor(i,t.byteOffset,t.byteLength)}(t,i);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,e){var i=e?Qi(t.buffer):t.buffer;return new t.constructor(i,t.byteOffset,t.length)}(t,i);case"[object Map]":return new o;case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return(s=new(r=t).constructor(r.source,Xi.exec(r))).lastIndex=r.lastIndex,s;case"[object Set]":return new o;case"[object Symbol]":return n=t,tn?Object(tn.call(n)):{}}}var nn=Ne&&Ne.isMap,rn=nn?ke(nn):function(t){return pt(t)&&"[object Map]"==Ji(t)};var sn=Ne&&Ne.isSet,on=sn?ke(sn):function(t){return pt(t)&&"[object Set]"==Ji(t)},an={};function cn(t,e,i,n,r,s){var o,a=1&e,c=2&e,u=4&e;if(i&&(o=r?i(t,n,r,s):i(t)),void 0!==o)return o;if(!_t(t))return t;var d=mt(t);if(d){if(o=function(t){var e=t.length,i=new t.constructor(e);return e&&"string"==typeof t[0]&&Zi.call(t,"index")&&(i.index=t.index,i.input=t.input),i}(t),!a)return Bt(t,o)}else{var l=Ji(t),h="[object Function]"==l||"[object GeneratorFunction]"==l;if(Oe(t))return function(t,e){if(e)return t.slice();var i=t.length,n=Ci?Ci(i):new t.constructor(i);return t.copy(n),n}(t,a);if("[object Object]"==l||"[object Arguments]"==l||h&&!r){if(o=c||h?{}:function(t){return"function"!=typeof t.constructor||ye(t)?{}:qt(gi(t))}(t),!a)return c?function(t,e){return ue(t,Mi(t),e)}(t,function(t,e){return t&&ue(e,qe(e),t)}(o,t)):function(t,e){return ue(t,Ii(t),e)}(t,function(t,e){return t&&ue(e,Fe(e),t)}(o,t))}else{if(!an[l])return r?t:{};o=en(t,l,a)}}s||(s=new $i);var p=s.get(t);if(p)return p;s.set(t,o),on(t)?t.forEach((function(n){o.add(cn(n,e,i,n,t,s))})):rn(t)&&t.forEach((function(n,r){o.set(r,cn(n,e,i,r,t,s))}));var f=u?c?Vi:Ui:c?keysIn:Fe,v=d?void 0:f(t);return Yt(v||t,(function(n,r){v&&(n=t[r=n]),ce(o,r,cn(n,e,i,r,t,s))})),o}an["[object Arguments]"]=an["[object Array]"]=an["[object ArrayBuffer]"]=an["[object DataView]"]=an["[object Boolean]"]=an["[object Date]"]=an["[object Float32Array]"]=an["[object Float64Array]"]=an["[object Int8Array]"]=an["[object Int16Array]"]=an["[object Int32Array]"]=an["[object Map]"]=an["[object Number]"]=an["[object Object]"]=an["[object RegExp]"]=an["[object Set]"]=an["[object String]"]=an["[object Symbol]"]=an["[object Uint8Array]"]=an["[object Uint8ClampedArray]"]=an["[object Uint16Array]"]=an["[object Uint32Array]"]=!0,an["[object Error]"]=an["[object Function]"]=an["[object WeakMap]"]=!1;function un(t){var e=-1,i=null==t?0:t.length;for(this.__data__=new si;++e<i;)this.add(t[e])}function dn(t,e){for(var i=-1,n=null==t?0:t.length;++i<n;)if(e(t[i],i,t))return!0;return!1}un.prototype.add=un.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},un.prototype.has=function(t){return this.__data__.has(t)};function ln(t,e,i,n,r,s){var o=1&i,a=t.length,c=e.length;if(a!=c&&!(o&&c>a))return!1;var u=s.get(t);if(u&&s.get(e))return u==e;var d=-1,l=!0,h=2&i?new un:void 0;for(s.set(t,e),s.set(e,t);++d<a;){var p=t[d],f=e[d];if(n)var v=o?n(f,p,d,e,t,s):n(p,f,d,t,e,s);if(void 0!==v){if(v)continue;l=!1;break}if(h){if(!dn(e,(function(t,e){if(o=e,!h.has(o)&&(p===t||r(p,t,i,n,s)))return h.push(e);var o}))){l=!1;break}}else if(p!==f&&!r(p,f,i,n,s)){l=!1;break}}return s.delete(t),s.delete(e),l}function hn(t){var e=-1,i=Array(t.size);return t.forEach((function(t,n){i[++e]=[n,t]})),i}function pn(t){var e=-1,i=Array(t.size);return t.forEach((function(t){i[++e]=t})),i}var fn=st?st.prototype:void 0,vn=fn?fn.valueOf:void 0;var mn=Object.prototype.hasOwnProperty;var yn=Object.prototype.hasOwnProperty;function gn(t,e,i,n,r,s){var o=mt(t),a=mt(e),c=o?"[object Array]":Ji(t),u=a?"[object Array]":Ji(e),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),l="[object Object]"==(u="[object Arguments]"==u?"[object Object]":u),h=c==u;if(h&&Oe(t)){if(!Oe(e))return!1;o=!0,d=!1}if(h&&!d)return s||(s=new $i),o||Ie(t)?ln(t,e,i,n,r,s):function(t,e,i,n,r,s,o){switch(i){case"[object DataView]":if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case"[object ArrayBuffer]":return!(t.byteLength!=e.byteLength||!s(new Ki(t),new Ki(e)));case"[object Boolean]":case"[object Date]":case"[object Number]":return oe(+t,+e);case"[object Error]":return t.name==e.name&&t.message==e.message;case"[object RegExp]":case"[object String]":return t==e+"";case"[object Map]":var a=hn;case"[object Set]":var c=1&n;if(a||(a=pn),t.size!=e.size&&!c)return!1;var u=o.get(t);if(u)return u==e;n|=2,o.set(t,e);var d=ln(a(t),a(e),n,r,s,o);return o.delete(t),d;case"[object Symbol]":if(vn)return vn.call(t)==vn.call(e)}return!1}(t,e,c,i,n,r,s);if(!(1&i)){var p=d&&yn.call(t,"__wrapped__"),f=l&&yn.call(e,"__wrapped__");if(p||f){var v=p?t.value():t,m=f?e.value():e;return s||(s=new $i),r(v,m,i,n,s)}}return!!h&&(s||(s=new $i),function(t,e,i,n,r,s){var o=1&i,a=Ui(t),c=a.length;if(c!=Ui(e).length&&!o)return!1;for(var u=c;u--;){var d=a[u];if(!(o?d in e:mn.call(e,d)))return!1}var l=s.get(t);if(l&&s.get(e))return l==e;var h=!0;s.set(t,e),s.set(e,t);for(var p=o;++u<c;){var f=t[d=a[u]],v=e[d];if(n)var m=o?n(v,f,d,e,t,s):n(f,v,d,t,e,s);if(!(void 0===m?f===v||r(f,v,i,n,s):m)){h=!1;break}p||(p="constructor"==d)}if(h&&!p){var y=t.constructor,g=e.constructor;y==g||!("constructor"in t)||!("constructor"in e)||"function"==typeof y&&y instanceof y&&"function"==typeof g&&g instanceof g||(h=!1)}return s.delete(t),s.delete(e),h}(t,e,i,n,r,s))}function bn(t,e,i,n,r){return t===e||(null==t||null==e||!pt(t)&&!pt(e)?t!=t&&e!=e:gn(t,e,i,n,bn,r))}function _n(t){return t==t&&!_t(t)}function wn(t,e){return function(i){return null!=i&&(i[t]===e&&(void 0!==e||t in Object(i)))}}function jn(t){var e=function(t){for(var e=Fe(t),i=e.length;i--;){var n=e[i],r=t[n];e[i]=[n,r,_n(r)]}return e}(t);return 1==e.length&&e[0][2]?wn(e[0][0],e[0][1]):function(i){return i===t||function(t,e,i,n){var r=i.length,s=r,o=!n;if(null==t)return!s;for(t=Object(t);r--;){var a=i[r];if(o&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++r<s;){var c=(a=i[r])[0],u=t[c],d=a[1];if(o&&a[2]){if(void 0===u&&!(c in t))return!1}else{var l=new $i;if(n)var h=n(u,d,c,t,e,l);if(!(void 0===h?bn(d,u,3,n,l):h))return!1}}return!0}(i,t,e)}}function xn(t,e){return null!=t&&e in Object(t)}function Sn(t,e,i){for(var n=-1,r=(e=di(e,t)).length,s=!1;++n<r;){var o=li(e[n]);if(!(s=null!=t&&i(t,o)))break;t=t[o]}return s||++n!=r?s:!!(r=null==t?0:t.length)&&pe(r)&&re(o,r)&&(mt(t)||je(t))}function $n(t,e){return null!=t&&Sn(t,e,xn)}function On(t,e){return Ze(t)&&_n(e)?wn(li(t),e):function(i){var n=function(t,e,i){var n=null==t?void 0:hi(t,e);return void 0===n?i:n}(i,t);return void 0===n&&n===e?$n(i,t):bn(e,n,3)}}function An(t){return function(e){return null==e?void 0:e[t]}}function kn(t){return Ze(t)?An(li(t)):function(t){return function(e){return hi(e,t)}}(t)}function Cn(t){return"function"==typeof t?t:null==t?At:"object"==typeof t?mt(t)?On(t[0],t[1]):jn(t):kn(t)}function En(t,e,i,n){for(var r=-1,s=null==t?0:t.length;++r<s;){var o=t[r];e(n,o,i(o),t)}return n}var Pn,Nn=function(t,e,i){for(var n=-1,r=Object(t),s=i(t),o=s.length;o--;){var a=s[Pn?o:++n];if(!1===e(r[a],a,r))break}return t};function Tn(t,e){return t&&Nn(t,e,Fe)}var In=function(t,e){return function(i,n){if(null==i)return i;if(!fe(i))return t(i,n);for(var r=i.length,s=e?r:-1,o=Object(i);(e?s--:++s<r)&&!1!==n(o[s],s,o););return i}}(Tn);function Mn(t,e,i,n){return In(t,(function(t,r,s){e(n,t,i(t),s)})),n}var zn=Object.prototype,Un=zn.hasOwnProperty,Vn=he((function(t,e){t=Object(t);var i=-1,n=e.length,r=n>2?e[2]:void 0;for(r&&ve(e[0],e[1],r)&&(n=1);++i<n;)for(var s=e[i],o=qe(s),a=-1,c=o.length;++a<c;){var u=o[a],d=t[u];(void 0===d||oe(d,zn[u])&&!Un.call(t,u))&&(t[u]=s[u])}return t}));function Rn(t,e){var i;return(mt(t)?Yt:In)(t,"function"==typeof(i=e)?i:At)}function Dn(t,e){var i=[];return In(t,(function(t,n,r){e(t,n,r)&&i.push(t)})),i}function Fn(t,e){return(mt(t)?Ei:Dn)(t,Cn(e))}var Gn=Math.max;var Ln,qn=(Ln=function(t,e,i){var n=null==t?0:t.length;if(!n)return-1;var r,s,o=null==i?0:(r=Ot(i),s=r%1,r==r?s?r-s:r:0);return o<0&&(o=Gn(n+o,0)),te(t,Cn(e),o)},function(t,e,i){var n=Object(t);if(!fe(t)){var r=Cn(e);t=Fe(t),e=function(t){return r(n[t],t,n)}}var s=Ln(t,e,i);return s>-1?n[r?t[s]:s]:void 0});function Hn(t,e){var i=-1,n=fe(t)?Array(t.length):[];return In(t,(function(t,r,s){n[++i]=e(t,r,s)})),n}function Bn(t,e){return(mt(t)?vt:Hn)(t,Cn(e))}var Wn=Object.prototype.hasOwnProperty;function Jn(t,e){return null!=t&&Wn.call(t,e)}function Zn(t){return null==t?[]:function(t,e){return vt(e,(function(e){return t[e]}))}(t,Fe(t))}function Kn(t,e){return e.length<2?t:hi(t,function(t,e,i){var n=-1,r=t.length;e<0&&(e=-e>r?0:r+e),(i=i>r?r:i)<0&&(i+=r),r=e>i?0:i-e>>>0,e>>>=0;for(var s=Array(r);++n<r;)s[n]=t[n+e];return s}(e,0,-1))}var Qn,Xn,Yn=(Qn=function(t,e,i){se(t,i,e)},function(t,e){var i=mt(t)?En:Mn,n=Xn?Xn():{};return i(t,Qn,Cn(e),n)});function tr(t,e){var i={};return e=Cn(e),Tn(t,(function(t,n,r){se(i,n,e(t,n,r))})),i}function er(t,e){return null==(t=Kn(t,e=di(e,t)))||delete t[li((i=e,n=null==i?0:i.length,n?i[n-1]:void 0))];var i,n}function ir(t){return function(t){if(!pt(t)||"[object Object]"!=ht(t))return!1;var e=gi(t);if(null===e)return!0;var i=ji.call(e,"constructor")&&e.constructor;return"function"==typeof i&&i instanceof i&&wi.call(i)==xi}(t)?void 0:t}var nr=yi((function(t,e){var i={};if(null==t)return i;var n=!1;e=vt(e,(function(e){return e=di(e,t),n||(n=e.length>1),e})),ue(t,Vi(t),i),n&&(i=cn(i,7,ir));for(var r=e.length;r--;)er(i,e[r]);return i}));function rr(t,e,i,n){if(!_t(t))return t;for(var r=-1,s=(e=di(e,t)).length,o=s-1,a=t;null!=a&&++r<s;){var c=li(e[r]),u=i;if(r!=o){var d=a[c];void 0===(u=n?n(d,c,a):void 0)&&(u=_t(d)?d:re(e[r+1])?[]:{})}ce(a,c,u),a=a[c]}return t}function sr(t,e,i){for(var n=-1,r=e.length,s={};++n<r;){var o=e[n],a=hi(t,o);i(a,o)&&rr(s,di(o,t),a)}return s}var or=An("length"),ar="[\\ud800-\\udfff]",cr="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",ur="\\ud83c[\\udffb-\\udfff]",dr="[^\\ud800-\\udfff]",lr="(?:\\ud83c[\\udde6-\\uddff]){2}",hr="[\\ud800-\\udbff][\\udc00-\\udfff]",pr="(?:"+cr+"|"+ur+")"+"?",fr="[\\ufe0e\\ufe0f]?"+pr+("(?:\\u200d(?:"+[dr,lr,hr].join("|")+")[\\ufe0e\\ufe0f]?"+pr+")*"),vr="(?:"+[dr+cr+"?",cr,lr,hr,ar].join("|")+")",mr=RegExp(ur+"(?="+ur+")|"+vr+fr,"g");function yr(t){return function(t){return Si.test(t)}(t)?function(t){for(var e=mr.lastIndex=0;mr.test(t);)++e;return e}(t):or(t)}var gr=yi((function(t,e){return null==t?{}:function(t,e){return sr(t,e,(function(e,i){return $n(t,i)}))}(t,e)}));function br(t,e,i,n){for(var r=i-1,s=t.length;++r<s;)if(n(t[r],e))return r;return-1}var _r=Array.prototype.splice;var wr=he((function(t,e){return t&&t.length&&e&&e.length?function(t,e,i,n){var r=n?br:ie,s=-1,o=e.length,a=t;for(t===e&&(e=Bt(e)),i&&(a=vt(t,ke(i)));++s<o;)for(var c=0,u=e[s],d=i?i(u):u;(c=r(a,d,c,n))>-1;)a!==t&&_r.call(a,c,1),_r.call(t,c,1);return t}(t,e):t}));function jr(t){if(null==t)return 0;if(fe(t))return"string"==typeof(e=t)||!mt(e)&&pt(e)&&"[object String]"==ht(e)?yr(t):t.length;var e,i=Ji(t);return"[object Map]"==i||"[object Set]"==i?t.size:De(t).length}var xr={add:"add item",cancel:"cancel",next:"next",save:"save",delete:"delete"},Sr={no_group_selected:"Select a group first",no_entity_selected:"Select an entity first",no_groups_defined:"There are no groups defined",no_entities_for_group:"There are no entities in this group",no_actions_for_entity:"There are no actions for this entity",no_entries_defined:"There are no items to show"},$r={group:"Group",entity:"Entity",action:"Action",days:"Days",time:"Time",options:"Options",day_type_daily:"every day",day_type_weekdays:"weekdays",day_type_custom:"custom"},Or={mon:"mon",tue:"tue",wed:"wed",thu:"thu",fri:"fri",sat:"sat",sun:"sun"},Ar={mon:"monday",tue:"tuesday",wed:"wednesday",thu:"thursday",fri:"friday",sat:"saturday",sun:"sunday"},kr={on:"on",every:"every",and:"and",at:"at",before:"before",after:"after",sunrise:"sunrise",sunset:"sunset"},Cr={turn_on:"turn on",turn_off:"turn off",close_cover:"close",open_cover:"open",set_temperature:"set to"},Er={climate:"climate",cover:"covers",fan:"fans",light:"lights",switch:"switches",vacuum:"vacuum"},Pr={actions:xr,instructions:Sr,fields:$r,days_short:Or,days_long:Ar,words:kr,services:Cr,domains:Er},Nr={add:"Nieuw item",cancel:"annuleren",next:"verder",save:"opslaan",delete:"verwijder"},Tr={no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",no_entries_defined:"Er zijn geen items aangemaakt"},Ir={group:"Groep",entity:"Entiteit",action:"Actie",days:"Dagen",time:"Tijdstip",options:"Opties",day_type_daily:"Dagelijks",day_type_weekdays:"Werkdagen",day_type_custom:"Anders"},Mr={mon:"ma",tue:"di",wed:"wo",thu:"do",fri:"vr",sat:"za",sun:"zo"},zr={mon:"maandag",tue:"dinsdag",wed:"woensdag",thu:"donderdag",fri:"vrijdag",sat:"zaterdag",sun:"zondag"},Ur={on:"op",every:"elke",and:"en",at:"om",before:"voor",after:"na",sunrise:"zonsopgang",sunset:"zonsondergang"},Vr={turn_on:"aanzetten",turn_off:"uitzetten",close_cover:"sluiten",open_cover:"openen",set_temperature:"Zet op"},Rr={climate:"verwarming",cover:"zonwering",fan:"ventilatie",light:"verlichting",switch:"schakelaars",vacuum:"stofzuiger"},Dr={actions:Nr,instructions:Tr,fields:Ir,days_short:Mr,days_long:zr,words:Ur,services:Vr,domains:Rr},Fr={en:Object.freeze({__proto__:null,actions:xr,instructions:Sr,fields:$r,days_short:Or,days_long:Ar,words:kr,services:Cr,domains:Er,default:Pr}),nl:Object.freeze({__proto__:null,actions:Nr,instructions:Tr,fields:Ir,days_short:Mr,days_long:zr,words:Ur,services:Vr,domains:Rr,default:Dr})};function Gr(t,e="",i=""){const n=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var r;try{r=t.split(".").reduce((t,e)=>t[e],Fr[n])}catch(e){r=t.split(".").reduce((t,e)=>t[e],Fr.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],Fr.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}const Lr={light:{actions:[{service:"turn_on",icon:"lightbulb-outline",name:Gr("services.turn_on")},{service:"turn_off",icon:"lightbulb-off-outline",name:Gr("services.turn_off")}]},switch:{actions:[{service:"turn_on",name:Gr("services.turn_on")},{service:"turn_off",name:Gr("services.turn_off")}]},cover:{actions:[{service:"open_cover",name:Gr("services.open_cover")},{service:"close_cover",name:Gr("services.close_cover")}]},climate:{actions:[{service:"set_temperature",service_data:{temperature:10},name:Gr("services.set_temperature")+" 10C",icon:"thermometer-chevron-down"},{service:"set_temperature",service_data:{temperature:22},name:Gr("services.set_temperature")+" 22C",icon:"thermometer-chevron-up"}]}},qr={group:"",entity:"",action:"",newItem:!1,actionConfirmed:!1,editItem:"",timeHours:"12",timeMinutes:"00",days:[],daysType:"daily",sun:!1};function Hr(t){var e={automation:"robot",camera:"camera",climate:"home-thermometer-outline",cover:"window-shutter",fan:"fan",input_number:"sort-numeric-variant",input_select:"form-select",input_text:"form-textbox",input_time:"clock",light:"lightbulb-outline",media_player:"speaker",script:"script-text",switch:"flash",vacuum:"robot-vacuum"};return t in e?e[t]:"folder-outline"}function Br(t){return"turn_on"==t?"toggle-switch-outline":"turn_off"==t?"toggle-switch-off-outline":"open_cover"==t?"window-shutter-open":"close_cover"==t?"window-shutter":"set_temperature"==t?"thermometer":"flash"}const Wr=/^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/,Jr=/^(A([0-9]+))+$/,Zr=/^([0-9]{4})?(S[SR])([0-9]{4})?$/,Kr=/^([0-9]{2})([0-9]{2})$/,Qr=/^([\+\-]{1})([0-9]{2}):([0-9]{2})$/;function Xr(t){let e=Kr.exec(t);return e?e[1]+":"+e[2]:null}function Yr(t){if(-1===t.indexOf("."))return"";return String(t.split(".").shift())}function ts(t){let e=Fe(t);e=e.sort();let i={};return e.forEach(e=>i[e]=t[e]),JSON.stringify(Zn(i)).replace(/\W/g," ")}function es(t){return t.match(/^switch.schedule_[0-9a-f]{6}$/)}function is(t){return!t||!t.length||1==t.length&&0==t[0]?"daily":5!=t.length||t.includes(6)||t.includes(7)?"custom":"weekdays"}function ns(t){return t.replace("_"," ")}class rs{constructor(t){this.entities={},this.groups={},t.entities||t.domains||void 0!==t.standardConfiguration&&!t.standardConfiguration?this.userConfig=t:this.userConfig={domains:Lr},t.groups&&Rn(t.groups,this.CreateGroup.bind(this)),this.discoverExisting=void 0===t.discoverExisting||t.discoverExisting}CreateGroup(t,e){let i=Object.assign({},t);var n;this.groups[e]||(Vn(i,{name:(n=e,"climate"==n?Gr("domains.climate"):"cover"==n?Gr("domains.cover"):"fan"==n?Gr("domains.fan"):"light"==n?Gr("domains.light"):"switch"==n?Gr("domains.switches"):"vacuum"==n?Gr("domains.vacuum"):n),domains:[],entities:[]}),this.groups[e]=i)}FindGroupForEntity(t){let e=Yr(t);return!!qn(this.groups,i=>!!(i.domains&&Array.isArray(i.domains)&&i.domains.includes(e))||!!(i.entities&&Array.isArray(i.entities)&&i.entities.includes(t)))}AddEntityToGroup(t){let e=Yr(t);if(this.groups[e]){let i=[...this.groups[e].entities];i.push(t),this.groups[e].entities=i}else this.CreateGroup({entities:[t],icon:Hr(e)},e)}AddEntityInfo(t,e){if(this.entities[t])Object.assign(this.entities[t],nr(Object.assign({},e),"actions")),n="actions",null!=(i=e)&&Sn(i,n,Jn)&&Rn(e.actions,e=>{if(qn(this.entities[t].actions,t=>ts(gr(t,["service","service_data"]))==ts(gr(e,["service","service_data"]))))return;let i=[...this.entities[t].actions];i.push(e),this.entities[t].actions=i});else{let i=Object.assign(Object.assign({},e),{id:t});Vn(i,{actions:[]}),this.entities[t]=i}var i,n;this.FindGroupForEntity(t)||this.AddEntityToGroup(t)}LoadEntities(t){if(Rn(t,t=>{let e=t.entity_id,i=Yr(e);es(e)||(this.userConfig.domains&&i in this.userConfig.domains&&this.AddEntityInfo(e,this.userConfig.domains[i]),this.userConfig.entities&&e in this.userConfig.entities&&this.AddEntityInfo(e,this.userConfig.entities[e]))}),this.discoverExisting){let e=Fn(t,t=>es(t.entity_id));e=Bn(e,t=>t.attributes.actions),e=mi(e),Rn(e,t=>{let e=Object.assign({},t);Yr(e.entity)||(e.entity=Yr(e.service)+"."+e.entity,e.service=e.service.split(".").pop());let i=nr(e,["entity","service"]);i?this.AddEntityInfo(e.entity,{actions:[{service:e.service,service_data:i}]}):this.AddEntityInfo(e.entity,{actions:[gr(e,"service")]})})}Rn(this.entities,(e,i)=>{Vn(e,{name:t[i].attributes.friendly_name,icon:Hr(Yr(i))}),Object.assign(e,{actions:Bn(e.actions,t=>{let e=Object.assign({},t);var i;return Vn(e,{name:(i=t.service,"turn_on"==i?Gr("services.turn_on"):"turn_off"==i?Gr("services.turn_off"):"open_cover"==i?Gr("services.open_cover"):"close_cover"==i?Gr("services.close_cover"):i),icon:Br(t.service)}),Object.assign(e,{id:ts(gr(t,["service","service_data"]))}),e})})}),t["sun.sun"]&&(this.next_sunrise=new Date(t["sun.sun"].attributes.next_rising),this.next_sunset=new Date(t["sun.sun"].attributes.next_setting))}GetGroups(){return tr(this.groups,t=>gr(t,["name","icon"]))}GetEntities(t){let e={};if(t){let i=this.groups[t];e=function(t,e){if(null==t)return{};var i=vt(Vi(t),(function(t){return[t]}));return e=Cn(e),sr(t,i,(function(t,i){return e(t,i[0])}))}(this.entities,(t,e)=>{let n=Yr(e);return!(!i.domains||!i.domains.includes(n))||!(!i.entities||!i.entities.includes(e))})}else e=this.entities;return tr(e,t=>gr(t,["name","icon"]))}GetEntity(t){return this.entities[t]}GetActions(t){let e=this.entities[t];return tr(Yn(e.actions,"id"),t=>gr(t,["name","icon"]))}GetAction(t,e){let i=this.entities[t];if(!i)return null;let n=qn(i.actions,{id:e});return n||null}}const ss=((t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof Y)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new Y(i,X)})`
      /* list view */

      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        grid-template-rows: min-content min-content min-content min-content;
        grid-template-areas: "icon name switch"
                             "icon action switch"
                             "icon days switch"
                             "icon time switch";
        grid-gap: 2px 20px;
        background: var(--list-item-background-color);
        cursor: pointer;
        padding: 10px 20px;
      }

      div.list-item:hover {
        
      }

      div.list-item-icon {
        grid-area: icon;
        color: var(--state-icon-color);
      }

      div.list-item-icon ha-icon {
        width: 24px;
        height: 24px;
      }

      div.list-item-icon.enabled {
        color: var(--state-icon-active-color);
      }

      div.list-item-switch {
        grid-area: switch;
      }

      div.list-item-switch ha-switch {
        margin-top: 3px;
      }

      div.list-item-name {
        grid-area: name;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-action {
        grid-area: action;
        color: var(--secondary-text-color);
      }

      div.list-item-days {
        grid-area: days;
        color: var(--secondary-text-color);
      }

      div.list-item-time {
        grid-area: time;
        color: var(--secondary-text-color);
      }

      div.list-item-name:first-letter, div.list-item-action:first-letter, div.list-item-days:first-letter, div.list-item-time:first-letter {
        text-transform: capitalize;
      }

      div.disabled div.list-item-icon, div.disabled div.list-item-name, div.disabled div.list-item-action, div.disabled div.list-item-days, div.disabled div.list-item-time {
        color: var(--disabled-text-color);
      }

      /* add/edit view */
   
      div.header {
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        margin: 0px 0px 0px 0px;
      }

      div.card-section {
        padding: 10px 10px;
      }

      div.card-section.first {
        padding-top: 0px;
      }
      
      div.card-section.last {
        padding-bottom: 10px;
      }

      div.text-field {
        color: var(--disabled-text-color);
      }

      div.summary {
        display: grid;
        grid-template-columns: 1fr max-content 1fr;
        grid-template-areas: "entity arrow action";
        grid-auto-flow: column;
        grid-gap: 5px;
      }

      div.summary-entity { grid-area: entity; }
      div.summary-action { grid-area: action; }
      div.summary-text { grid-area: text; }
      div.summary-icon { grid-area: icon; }
      div.summary-arrow {
        grid-area: arrow;
        color: var(--secondary-text-color);
        display: flex;
        justify-content:center;
        align-items:center;
      }

      div.summary-entity, div.summary-action {
        color: var(--dark-primary-color);
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        --mdc-icon-size: 20px;
        position: relative;
        display: flex;
        justify-content:center;
        align-items:center;
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-areas: "icon text";
        grid-auto-flow: column;
        grid-gap: 10px;
      }

       div.summary-entity:before, div.summary-action:before  {
        content: " ";
        background: var(--primary-color);
        opacity: 0.15;
        border-radius: 4px;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
       }

       div.summary-text::first-letter {
        text-transform: uppercase;
       }

      div.time-picker {
        display: grid;
        grid-template-columns: min-content min-content min-content;
        grid-template-rows: min-content min-content min-content;
        grid-template-areas: "hours-up   .         minutes-up"
                             "hours      separator minutes"
                             "hours-down .         minutes-down";
        grid-gap: 10px 0px;
        align-items: center;
      }

      div.time-picker-hours-up { grid-area: hours-up; }
      div.time-picker-hours { grid-area: hours; }
      div.time-picker-hours-down { grid-area: hours-down; }
      div.time-picker-separator { grid-area: separator; }
      div.time-picker-minutes-up { grid-area: minutes-up; }
      div.time-picker-minutes { grid-area: minutes; }
      div.time-picker-minutes-down { grid-area: minutes-down; }
      div.time-picker-hours-up, div.time-picker-hours-down, div.time-picker-minutes-up, div.time-picker-minutes-down {
        --mdc-icon-size: 42px;
      }

      div.time-picker-hours, div.time-picker-minutes {
        font-size: 42px;
        text-align: center;
      }

      div.time-picker-separator {
        font-size: 36px;
      }

      div#day-list-custom.closed {
        display: none;
      }
      
      div#day-list-custom {
        overflow: hidden;
        max-height: 100px; /* approximate max height */
        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      }

      mwc-button {
        margin: 2px 0px;
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }
      
      div.option-item {
        padding: 2px 5px;
      }
      
      .padded-right {
        margin-right: 11px;
      }
`;function os(t){return Array.isArray(t)?"array":typeof t==typeof{}?"object":"string"==typeof t?"string":"boolean"==typeof t?"boolean":"number"==typeof t?"number":"unknown"}function as(t,e){return os(t)==e}function cs(t,e,i){return!(!t||!t.hasOwnProperty(e))&&as(t[e],i)}function us(t,e,i){return!t||!t.hasOwnProperty(e)||as(t[e],i)}var ds;console.info("%c  SCHEDULER-CARD  \n%c  Version 1.2.2   ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),t.SchedulerCard=class extends et{constructor(){super(...arguments),this.entries=[],this.selection=Object.assign({},qr),this.count=0,this.await_update=!0}static get styles(){return ss}set hass(t){this.await_update&&this.Config&&(this._hass||this.Config.LoadEntities(t.states),this.update_entries(t),this._hass=t)}update_entries(t){let e=Fn(t.states,t=>es(t.entity_id)).map(t=>function(t,e){let i=t.attributes.entries.map(t=>{let i=Wr.exec(t),n=Jr.exec(i[3]),r={days:i[1].split("").map(Number),actions:n.map(Number).filter(t=>!isNaN(t))},s=Zr.exec(i[2]);if(null!==Xr(i[2]))Object.assign(r,{time:Xr(i[2])});else if(s){let t;if(t="SR"==s[2]?e.next_sunrise.getHours()+e.next_sunrise.getMinutes()/60:e.next_sunset.getHours()+e.next_sunset.getMinutes()/60,s[1]){let e=t-(Number(s[1].substr(0,2))+Number(s[1].substr(2))/60);Object.assign(r,{event:"SR"==s[2]?"sunrise":"sunset",offset:"-"+Xr(s[1]),time:`${String(Math.floor(e)).padStart(2,"0")}:${String(10*Math.round(6*(e-Math.floor(e)))).padStart(2,"0")}`})}else if(s[3]){let e=t+(Number(s[3].substr(0,2))+Number(s[3].substr(2))/60);Object.assign(r,{event:"SR"==s[2]?"sunrise":"sunset",offset:"+"+Xr(s[3]),time:`${String(Math.floor(e)).padStart(2,"0")}:${String(10*Math.round(6*(e-Math.floor(e)))).padStart(2,"0")}`})}}return r}),n=t.attributes.actions.map(t=>{let i=Yr(t.entity)?t.entity:Yr(t.service)+"."+t.entity,n=t.service,r=nr(t,["service","entity"]);if(Yr(i)==Yr(n)&&(n=n.split(".").pop()),!e.GetEntity(i))return;let s=ts(r?Object.assign({service:n,service_data:r}):Object.assign({service:n}));return e.GetAction(i,s)?{entity:i,action:s}:void 0});return{id:t.entity_id,enabled:"off"!=t.state,entries:i,actions:n}}(t,this.Config)).filter(t=>void 0!==t.actions[0]);e!=this.entries&&(this.entries=e,this.await_update=!1,this.requestUpdate())}awaitUpdate(){this.await_update=!0}render(){return this.selection.newItem||this.selection.editItem?this.selection.newItem&&!this.selection.actionConfirmed?V`
        <ha-card>
          <div class="card-header">Scheduler</div>
          <div class="card-section first">
            <div class="header">${Gr("fields.group")}</div>
            <div class="option-list">
            ${this.getGroups()}
            </div>
            <div class="header">${Gr("fields.entity")}</div>
            <div class="option-list">
            ${this.getEntities()}
            </div>
            <div class="header">${Gr("fields.action")}</div>
            <div class="option-list">
            ${this.getActions()}
            </div>
          </div>
          <div class="card-section last">
            <mwc-button outlined @click="${()=>this.editItemCancel()}">${Gr("actions.cancel")}</mwc-button>
            ${this.selection.action?V`<mwc-button outlined @click="${()=>this.newItemConfirm()}">${Gr("actions.next")}</mwc-button>`:V`<mwc-button outlined disabled>${Gr("actions.next")}</mwc-button>`}
          </div>
        </ha-card>
      `:V`
      <ha-card>
        <div class="card-header">Scheduler</div>
        ${this.showEditor()}
      </ha-card>
      `:V`
      <ha-card>
        <div class="card-header">Scheduler</div>
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${()=>{this.newItem()}}">${Gr("actions.add")}</mwc-button>
        </div>
      </ha-card>
      `}newItem(){this.selection=Be(Object.assign({},qr),{newItem:!0}),this.requestUpdate()}editItemCancel(){this.selection=Object.assign({},qr),this.requestUpdate()}newItemConfirm(){this.selection=Be(Object.assign({},qr),{newItem:!0,actionConfirmed:!0,entity:this.selection.entity,action:this.selection.action}),this.requestUpdate()}getEntries(){return this.entries&&this.entries.length?this.entries.map(t=>{if(!t.actions[0])return V``;let e=this.Config.GetEntity(t.actions[0].entity),i=this.Config.GetAction(t.actions[0].entity,t.actions[0].action);return V`
      <div class="list-item${t.enabled?"":" disabled"}" @click="${()=>this.editItem(t.id)}">
        <div class="list-item-icon">
          ${e.icon?V`<ha-icon icon="hass:${e.icon}"></ha-icon>`:""}
        </div>
        <div class="list-item-name">
          ${ns(e.name)}
        </div>
        <div class="list-item-action">
          ${ns(i.name)}
        </div>
        <div class="list-item-days">
          ${function(t){if("daily"==is(t))return Gr("fields.day_type_daily");if("weekdays"==is(t))return`${Gr("words.on")} ${Gr("fields.day_type_weekdays")}`;{let i=Array();t.includes(1)&&i.push(Gr("days_long.mon")),t.includes(2)&&i.push(Gr("days_long.tue")),t.includes(3)&&i.push(Gr("days_long.wed")),t.includes(4)&&i.push(Gr("days_long.thu")),t.includes(5)&&i.push(Gr("days_long.fri")),t.includes(6)&&i.push(Gr("days_long.sat")),t.includes(7)&&i.push(Gr("days_long.sun"));let n=i.join(", ");var e=n.lastIndexOf(", ");return e&&(n=n.slice(0,e)+n.slice(e).replace(", ",` ${Gr("words.and")} `)),`${Gr("words.every")} ${n}`}}(t.entries[0].days)}
        </div>
        <div class="list-item-time">
          ${function(t){if(t.event){let e=Qr.exec(t.offset),i=Number(e[2])+Number(e[3])/60;return Math.abs(i)<1/6?`${Gr("words.at")} ${t.event} (${t.time})`:`${e[2]}:${e[3]} ${"+"==e[1]?Gr("words.after"):Gr("words.before")} ${Gr("words."+t.event)} (${t.time})`}return`${Gr("words.at")} ${t.time}`}(gr(t.entries[0],["time","event","offset"]))}
        </div>
        <div class="list-item-switch">
          ${t.enabled?V`<ha-switch checked="checked" @click="${e=>this.toggleDisable(t.id,e)}"></ha-switch>`:V`<ha-switch @click="${e=>this.toggleDisable(t.id,e)}"></ha-switch>`}
        </div>
      </div>
      `}):[V`
      <div class="text-field">
        ${Gr("instructions.no_entries_defined")}
      </div>
    `]}toggleDisable(t,e){e.stopPropagation(),!e.target.checked?this._hass.callService("switch","turn_on",{entity_id:t}):this._hass.callService("switch","turn_off",{entity_id:t}),this.awaitUpdate()}editItem(t){let e=qn(this.entries,{id:t});this.selection=Be(Object.assign({},qr),{editItem:t,entity:e.actions[0].entity,action:e.actions[0].action,timeHours:e.entries[0].time.split(":").shift(),timeMinutes:e.entries[0].time.split(":").pop(),days:e.entries[0].days,daysType:is(e.entries[0].days),sun:void 0!==e.entries[0].event}),this.requestUpdate()}getGroups(){let t=this.Config.GetGroups();return jr(t)?Bn(t,(t,e)=>V`
        <mwc-button class="${this.selection.group==e?" active":""}" @click="${()=>{this.selectGroup(e)}}">
          ${t.icon?V`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ns(t.name)}
        </mwc-button>
      `):[V`<div class="text-field">${Gr("instructions.no_groups_defined")}</div>`]}selectGroup(t){Object.assign(this.selection,{group:t,entity:null,action:null}),this.requestUpdate()}getEntities(){if(!this.selection.group)return[V`<div class="text-field">${Gr("instructions.no_group_selected")}</div>`];let t=this.Config.GetEntities(this.selection.group);return jr(t)?Bn(t,(t,e)=>V`
        <mwc-button class="${this.selection.entity==e?" active":""}" @click="${()=>{this.selectEntity(e)}}">
          ${t.icon?V`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ns(t.name)}
        </mwc-button>
      `):[V`<div class="text-field">${Gr("instructions.no_entities_for_group")}</div>`]}selectEntity(t){Object.assign(this.selection,{entity:t,action:null}),this.requestUpdate()}getActions(){if(!this.selection.entity)return[V`<div class="text-field">${Gr("instructions.no_entity_selected")}</div>`];let t=this.Config.GetActions(this.selection.entity);return jr(t)?Bn(t,(t,e)=>V`
        <mwc-button class="${this.selection.action==e?" active":""}" @click="${()=>{this.selectAction(e)}}">
          ${t.icon?V`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ns(t.name)}
        </mwc-button>
      `):[V`<div class="text-field">${Gr("instructions.no_actions_for_entity")}</div>`]}selectAction(t){Object.assign(this.selection,{action:t}),this.requestUpdate()}setConfig(t){!function(t){if(void 0!==t.entities)try{if(!cs(t,"entities","object"))throw`Configuration for 'entities' should be of type 'object', but got '${os(t.entities)}'.`;Rn(t.entities,(t,e)=>{if(!as(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${os(t)}'.`;if(!us(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${os(t.name)}'.`;if(!us(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${os(t.icon)}'.`;if(!us(t,"actions","array"))throw`In ${e} at 'actions: (...)': expected type 'array', but got '${os(t.actions)}'.`;t&&Rn(t.actions,t=>{if(!cs(t,"service","string"))throw`In ${e}->actions at 'service: ${t.service}': expected type 'string', but got '${os(t.service)}'.`;if(!us(t,"name","string"))throw`In ${e}->actions at 'name: ${t.name}': expected type 'string', but got '${os(t.name)}'.`;if(!us(t,"icon","string"))throw`In ${e}->actions at 'icon: ${t.icon}': expected type 'string', but got '${os(t.icon)}'.`;if(!us(t,"service_data","object"))throw`In ${e}->actions at 'service_data: ${t.service_data}': expected type 'object', but got '${os(t.service_data)}'.`})})}catch(t){throw new Error("Invalid configuration provided for 'entities'. "+t)}if(void 0!==t.domains)try{if(!cs(t,"domains","object"))throw`Configuration for 'domains' should be of type 'object', but got '${os(t.domains)}'.`;Rn(t.domains,(t,e)=>{if(!as(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${os(t)}'.`;if(!us(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${os(t.name)}'.`;if(!us(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${os(t.icon)}'.`;if(!us(t,"actions","array"))throw`In ${e} at 'actions: (...)': expected type 'array', but got '${os(t.actions)}'.`;t&&Rn(t.actions,t=>{if(!cs(t,"service","string"))throw`In ${e}->actions at 'service: ${t.service}': expected type 'string', but got '${os(t.service)}'.`;if(!us(t,"name","string"))throw`In ${e}->actions at 'name: ${t.name}': expected type 'string', but got '${os(t.name)}'.`;if(!us(t,"icon","string"))throw`In ${e}->actions at 'icon: ${t.icon}': expected type 'string', but got '${os(t.icon)}'.`;if(!us(t,"service_data","object"))throw`In ${e}->actions at 'service_data: ${t.service_data}': expected type 'object', but got '${os(t.service_data)}'.`})})}catch(t){throw new Error("Invalid configuration provided for 'domains'. "+t)}if(void 0!==t.groups)try{if(!cs(t,"groups","object"))throw`Configuration for 'domains' should be of type 'object', but got '${os(t.groups)}'.`;Rn(t.groups,(t,e)=>{if(!as(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${os(t)}'.`;if(!us(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${os(t.name)}'.`;if(!us(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${os(t.icon)}'.`;if(!us(t,"entities","array"))throw`In ${e} at 'icon: ${t.entities}': expected type 'array', but got '${os(t.entities)}'.`;if(!us(t,"domains","array"))throw`In ${e} at 'icon: ${t.domains}': expected type 'array', but got '${os(t.domains)}'.`;t&&(Rn(t.entities,t=>{if(!as(t,"string"))throw`In ${e}->entities at '${t}': expected type 'string', but got '${os(t)}'.`}),Rn(t.domains,t=>{if(!as(t,"string"))throw`In ${e}->domains at '${t}': expected type 'string', but got '${os(t)}'.`}))})}catch(t){throw new Error("Invalid configuration provided for 'groups'. "+t)}if(!us(t,"discoverExisting","boolean"))throw new Error(`Invalid configuration provided for 'discoverExisting': expected type 'boolean', but got '${os(t.discoverExisting)}'.`);if(!us(t,"standardConfiguration","boolean"))throw new Error(`Invalid configuration provided for 'standardConfiguration': expected type 'boolean', but got '${os(t.standardConfiguration)}'.`)}(t),this.Config=new rs(t)}showEditor(){let t=this.Config.GetEntity(this.selection.entity),e=this.Config.GetAction(this.selection.entity,this.selection.action);return V`
    <div class="card-section first">
      <div class="header">${Gr("fields.action")}</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${t.icon?V`<ha-icon icon="hass:${t.icon}"></ha-icon>`:""}
          </div>
          <div class="summary-text">
            ${ns(t.name)}
          </div>
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"></ha-icon>
        </div>
        <div class="summary-action">
          <div class="summary-icon">
            ${e.icon?V`<ha-icon icon="hass:${e.icon}"></ha-icon>`:""}
          </div>
          <div class="summary-text">
            ${ns(e.name)}
          </div>
        </div>
      </div>
     </div>
    <div class="card-section">
      <div class="header">${Gr("fields.days")}</div>
      <div class="day-list">
        <mwc-button class="day-item${"daily"==this.selection.daysType?" active":""}" index="daily" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("fields.day_type_daily")}</mwc-button>
        <mwc-button class="day-item${"weekdays"==this.selection.daysType?" active":""}" index="weekdays" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("fields.day_type_weekdays")}</mwc-button>
        <mwc-button class="day-item${"custom"==this.selection.daysType?" active":""}" index="custom" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("fields.day_type_custom")}</mwc-button>
      </div>
      <div class="day-list${"custom"==this.selection.daysType?"":" closed"}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.days.includes(1)?" active":""}" index="1" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.mon")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(2)?" active":""}" index="2" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.tue")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(3)?" active":""}" index="3" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.wed")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(4)?" active":""}" index="4" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.thu")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(5)?" active":""}" index="5" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.fri")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(6)?" active":""}" index="6" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.sat")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(7)?" active":""}" index="7" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Gr("days_short.sun")}</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">${Gr("fields.time")}</div>
      <div class="time-picker">
        <div class="time-picker-hours-up">
          <mwc-button @click="${()=>this.updateTime("time-hours-up")}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-hours" id="time-hours">
        ${this.selection.timeHours}
        </div>
        <div class="time-picker-hours-down">
          <mwc-button @click="${()=>this.updateTime("time-hours-down")}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-separator">
        :
        </div>
        <div class="time-picker-minutes-up">
          <mwc-button @click="${()=>this.updateTime("time-minutes-up")}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-minutes" id="time-minutes">
        ${this.selection.timeMinutes}
        </div>
        <div class="time-picker-minutes-down">
          <mwc-button @click="${()=>this.updateTime("time-minutes-down")}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
      </div>
    </div>
    <div class="card-section">
      <div class="header">${Gr("fields.options")}</div>
        <div class="option-item">
          ${this.selection.sun?V`<paper-checkbox checked name="option-item-sun" @change="${t=>this.toggleSun(t.target.checked)}">automatically adjust time to sunrise/sunset</paper-checkbox>`:V`<paper-checkbox name="option-item-sun" @change="${t=>this.toggleSun(t.target)}">automatically adjust time to sunrise/sunset</paper-checkbox>`}
        </div>
      </div>
    </div>
    <div class="card-section last">
      <mwc-button outlined @click="${()=>this.editItemCancel()}">${Gr("actions.cancel")}</mwc-button>
      ${void 0===this.selection.editItem?"":V`<mwc-button outlined @click="${()=>this.editItemDelete()}">${Gr("actions.delete")}</mwc-button>`}
      <mwc-button outlined @click="${()=>this.editItemSave()}">${Gr("actions.save")}</mwc-button>
    </div>
    `}updateDays(t){var e=Array("daily","weekdays","custom");e.includes(t)?this.selection.daysType=t:(this.selection.days.includes(Number(t))?wr(this.selection.days,Number(t)):this.selection.days.push(Number(t)),this.selection.daysType="custom"),this.shadowRoot.querySelectorAll(".day-item").forEach(t=>{let i=String(t.getAttribute("index"));e.includes(i)?this.selection.daysType==i?t.classList.add("active"):t.classList.remove("active"):this.selection.days.includes(Number(i))?t.classList.add("active"):t.classList.remove("active")}),"custom"==this.selection.daysType?this.shadowRoot.querySelector("#day-list-custom").classList.remove("closed"):this.shadowRoot.querySelector("#day-list-custom").classList.add("closed")}updateTime(t){let e=Number(this.selection.timeHours),i=Number(this.selection.timeMinutes);"time-hours-up"==t?e++:"time-hours-down"==t?e--:"time-minutes-up"==t?i+=10:"time-minutes-down"==t&&(i-=10),e<0?e=23:e>23?e=0:i<0?i=50:i>50&&(i=0);let n=String(e).padStart(2,"0"),r=String(i).padStart(2,"0");this.shadowRoot.querySelector("#time-hours").innerHTML=n,this.shadowRoot.querySelector("#time-minutes").innerHTML=r,this.selection.timeHours=n,this.selection.timeMinutes=r}editItemSave(){var t=function(t,e){let i=e.GetEntity(t.entity),n=e.GetAction(t.entity,t.action),r=gr(n,["service","service_data"]);Object.assign(r,{entity:i.id}),Yr(r.service)||(r.service=Yr(r.entity)+"."+r.service);let s={actions:[0]};if(t.sun){if(e.next_sunrise&&e.next_sunset){let i,n=Number(t.timeHours)+Number(t.timeMinutes)/60,r=e.next_sunrise.getHours()+e.next_sunrise.getMinutes()/60,o=e.next_sunset.getHours()+e.next_sunset.getMinutes()/60;Math.abs(n-r)<Math.abs(n-o)?(Object.assign(s,{event:"sunrise"}),i=n-r):(Object.assign(s,{event:"sunset"}),i=n-o);let a=i>0?Math.abs(Math.floor(i)):Math.abs(Math.ceil(i)),c=i>0?Math.round(60*(i-a)):-Math.round(60*(i+a));Object.assign(s,{offset:`${i>0?"+":"-"}${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}`})}}else Object.assign(s,{time:t.timeHours+":"+t.timeMinutes});return"weekdays"==t.daysType?Object.assign(s,{days:[1,2,3,4,5]}):"custom"==t.daysType&&Object.assign(s,{days:t.days.sort().filter(t=>0!=t)}),{actions:[r],entries:[s]}}(this.selection,this.Config);this.selection.newItem?this._hass.callService("scheduler","add",t):this.selection.editItem&&this._hass.callService("scheduler","edit",Object.assign(t,{entity_id:this.selection.editItem})),this.selection=Object.assign({},qr),this.awaitUpdate()}editItemDelete(){let t=this.selection.editItem;this._hass.callService("scheduler","remove",{entity_id:t}),this.selection=Object.assign({},qr),this.awaitUpdate()}toggleSun(t){this.selection.sun=t}},e([K()],t.SchedulerCard.prototype,"Config",void 0),e([K({type:Number})],t.SchedulerCard.prototype,"count",void 0),e([K()],t.SchedulerCard.prototype,"_hass",void 0),t.SchedulerCard=e([(ds="scheduler-card",t=>"function"==typeof t?((t,e)=>(window.customElements.define(t,e),e))(ds,t):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(ds,t))],t.SchedulerCard)}({});
