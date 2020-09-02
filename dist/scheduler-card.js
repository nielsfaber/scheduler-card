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
    ***************************************************************************** */function e(t,e,n,i){var r,s=arguments.length,o=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(s<3?r(o):s>3?r(e,n,o):r(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o
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
     */}const n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},r=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${r}--\x3e`,o=new RegExp(`${r}|${s}`);class a{constructor(t,e){this.parts=[],this.element=e;const n=[],i=[],s=document.createTreeWalker(e.content,133,null,!1);let a=0,u=-1,h=0;const{strings:p,values:{length:f}}=t;for(;h<f;){const t=s.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let i=0;for(let t=0;t<n;t++)c(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[h],n=l.exec(e)[2],i=n.toLowerCase()+"$lit$",r=t.getAttribute(i);t.removeAttribute(i);const s=r.split(o);this.parts.push({type:"attribute",index:u,name:n,strings:s}),h+=s.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const i=t.parentNode,r=e.split(o),s=r.length-1;for(let e=0;e<s;e++){let n,s=r[e];if(""===s)n=d();else{const t=l.exec(s);null!==t&&c(t[2],"$lit$")&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(s)}i.insertBefore(n,t),this.parts.push({type:"node",index:++u})}""===r[s]?(i.insertBefore(d(),t),n.push(t)):t.data=r[s],h+=s}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&u!==a||(u++,e.insertBefore(d(),t)),a=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(n.push(t),u--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),h++}}else s.currentNode=i.pop()}for(const t of n)t.parentNode.removeChild(t)}}const c=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},u=t=>-1!==t.index,d=()=>document.createComment(""),l=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(t,e){const{element:{content:n},parts:i}=t,r=document.createTreeWalker(n,133,null,!1);let s=f(i),o=i[s],a=-1,c=0;const u=[];let d=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(u.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,s=f(i,s),o=i[s]}u.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},f=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(u(e))return n}return-1};
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
const m=new WeakMap,v=t=>"function"==typeof t&&m.has(t),y={},g={};
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
class _{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,o=0,a=0,c=r.nextNode();for(;o<i.length;)if(s=i[o],u(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=e.pop(),c=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
     */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),w=` ${r} `;class j{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let i=0;i<t;i++){const t=this.strings[i],o=t.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===t.indexOf("--\x3e",o+1);const a=l.exec(t);e+=null===a?t+(n?w:s):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+r}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==b&&(e=b.createHTML(e)),t.innerHTML=e,t}}
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
     */const x=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class ${constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new O(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!S(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=n[r];if(void 0!==e){const t=e.value;if(x(t)||!S(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===y||x(t)&&t===this.value||(this.value=t,v(t)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const t=this.value;this.value=y,t(this)}this.value!==y&&this.committer.commit()}}class A{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}const t=this.__pendingValue;t!==y&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof j?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const n=new _(e,t.processor,this.options),i=n._clone();n.update(t.values),this.__commitNode(i),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const r of t)n=e[i],void 0===n&&(n=new A(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(r),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=y}}class E extends ${constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends O{}let P=!1;(()=>{try{const t={get capture(){return P=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class N{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=I(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=y}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const I=t=>t&&(P?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
     */;function T(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(r);return n=e.keyString.get(i),void 0===n&&(n=new a(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const z=new Map,U=new WeakMap;
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
     */const M=new
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
class{handleAttributeExpressions(t,e,n,i){const r=e[0];if("."===r){return new E(t,e.slice(1),n).parts}if("@"===r)return[new N(t,e.slice(1),i.eventContext)];if("?"===r)return[new k(t,e.slice(1),n)];return new $(t,e,n).parts}handleTextExpression(t){return new A(t)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const D=(t,...e)=>new j(t,e,"html",M)
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
     */,R=(t,e)=>`${t}--${e}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const G=t=>e=>{const n=R(e.type,t);let i=z.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},z.set(n,i));let s=i.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(r);if(s=i.keyString.get(o),void 0===s){const n=e.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(n,t),s=new a(e,n),i.keyString.set(o,s)}return i.stringsArray.set(e.strings,s),s},L=["html","svg"],q=new Set,F=(t,e,n)=>{q.add(t);const i=n?n.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<s;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{L.forEach(e=>{const n=z.get(R(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),h(t,n)})})})(t);const a=i.content;n?function(t,e,n=null){const{element:{content:i},parts:r}=t;if(null==n)return void i.appendChild(e);const s=document.createTreeWalker(i,133,null,!1);let o=f(r),a=0,c=-1;for(;s.nextNode();){c++;for(s.currentNode===n&&(a=p(e),n.parentNode.insertBefore(e,n));-1!==o&&r[o].index===c;){if(a>0){for(;-1!==o;)r[o].index+=a,o=f(r,o);return}o=f(r,o)}}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),h(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const i=this._attributeNameForProperty(n,e);void 0!==i&&(this._attributeToPropertyMap.set(i,n),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=B){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,i=e.converter||H,r="function"==typeof i?i:i.fromAttribute;return r?r(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,i=e.converter;return(i&&i.toAttribute||H.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=W){const i=this.constructor,r=i._attributeNameForProperty(t,n);if(void 0!==r){const t=i._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,i=n._attributeToPropertyMap.get(t);if(void 0!==i){const t=n.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let i=!0;if(void 0!==t){const r=this.constructor;n=n||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J.finalized=!0;
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
const Y=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(n){n.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function Z(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):Y(t,e)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class Q{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const tt={};class et extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t),n),n=e(t,new Set),i=[];n.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!K){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Q(String(e),X)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==tt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return tt}}et.finalized=!0,et.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,s=U.has(e),o=V&&11===e.nodeType&&!!e.host,a=o&&!q.has(r),c=a?document.createDocumentFragment():e;if(((t,e,n)=>{let r=U.get(e);void 0===r&&(i(e,e.firstChild),U.set(e,r=new A(Object.assign({templateFactory:T},n))),r.appendInto(e)),r.setValue(t),r.commit()})(t,c,Object.assign({templateFactory:G(r)},n)),a){const t=U.get(c);U.delete(c);const n=t.value instanceof _?t.value.template:void 0;F(r,c,n),i(e,e.firstChild),e.appendChild(c),U.set(e,t)}!s&&o&&window.ShadyCSS.styleElement(e.host)};var nt="object"==typeof global&&global&&global.Object===Object&&global,it="object"==typeof self&&self&&self.Object===Object&&self,rt=nt||it||Function("return this")(),st=rt.Symbol,ot=Object.prototype,at=ot.hasOwnProperty,ct=ot.toString,ut=st?st.toStringTag:void 0;var dt=Object.prototype.toString;var lt=st?st.toStringTag:void 0;function ht(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":lt&&lt in Object(t)?function(t){var e=at.call(t,ut),n=t[ut];try{t[ut]=void 0;var i=!0}catch(t){}var r=ct.call(t);return i&&(e?t[ut]=n:delete t[ut]),r}(t):function(t){return dt.call(t)}(t)}function pt(t){return null!=t&&"object"==typeof t}function ft(t){return"symbol"==typeof t||pt(t)&&"[object Symbol]"==ht(t)}function mt(t,e){for(var n=-1,i=null==t?0:t.length,r=Array(i);++n<i;)r[n]=e(t[n],n,t);return r}var vt=Array.isArray,yt=st?st.prototype:void 0,gt=yt?yt.toString:void 0;function _t(t){if("string"==typeof t)return t;if(vt(t))return mt(t,_t)+"";if(ft(t))return gt?gt.call(t):"";var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}function bt(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var wt=/^\s+|\s+$/g,jt=/^[-+]0x[0-9a-f]+$/i,xt=/^0b[01]+$/i,St=/^0o[0-7]+$/i,$t=parseInt;function Ot(t){return t?(t=function(t){if("number"==typeof t)return t;if(ft(t))return NaN;if(bt(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=bt(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(wt,"");var n=xt.test(t);return n||St.test(t)?$t(t.slice(2),n?2:8):jt.test(t)?NaN:+t}(t))===1/0||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}function At(t){return t}function kt(t){if(!bt(t))return!1;var e=ht(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}var Et,Ct=rt["__core-js_shared__"],Pt=(Et=/[^.]+$/.exec(Ct&&Ct.keys&&Ct.keys.IE_PROTO||""))?"Symbol(src)_1."+Et:"";var Nt=Function.prototype.toString;function It(t){if(null!=t){try{return Nt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var Tt=/^\[object .+?Constructor\]$/,zt=Function.prototype,Ut=Object.prototype,Mt=zt.toString,Dt=Ut.hasOwnProperty,Rt=RegExp("^"+Mt.call(Dt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Vt(t){return!(!bt(t)||(e=t,Pt&&Pt in e))&&(kt(t)?Rt:Tt).test(It(t));var e}function Gt(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return Vt(n)?n:void 0}var Lt=Gt(rt,"WeakMap"),qt=Object.create,Ft=function(){function t(){}return function(e){if(!bt(e))return{};if(qt)return qt(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();function Ht(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}function Bt(t,e){var n=-1,i=t.length;for(e||(e=Array(i));++n<i;)e[n]=t[n];return e}var Wt=Date.now;var Jt,Yt,Zt,Kt=function(){try{var t=Gt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),Xt=(Jt=Kt?function(t,e){return Kt(t,"toString",{configurable:!0,enumerable:!1,value:(n=e,function(){return n}),writable:!0});var n}:At,Yt=0,Zt=0,function(){var t=Wt(),e=16-(t-Zt);if(Zt=t,e>0){if(++Yt>=800)return arguments[0]}else Yt=0;return Jt.apply(void 0,arguments)});function Qt(t,e){for(var n=-1,i=null==t?0:t.length;++n<i&&!1!==e(t[n],n,t););return t}function te(t,e,n,i){for(var r=t.length,s=n+(i?1:-1);i?s--:++s<r;)if(e(t[s],s,t))return s;return-1}function ee(t){return t!=t}function ne(t,e,n){return e==e?function(t,e,n){for(var i=n-1,r=t.length;++i<r;)if(t[i]===e)return i;return-1}(t,e,n):te(t,ee,n)}var ie=/^(?:0|[1-9]\d*)$/;function re(t,e){var n=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==n||"symbol"!=n&&ie.test(t))&&t>-1&&t%1==0&&t<e}function se(t,e,n){"__proto__"==e&&Kt?Kt(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}function oe(t,e){return t===e||t!=t&&e!=e}var ae=Object.prototype.hasOwnProperty;function ce(t,e,n){var i=t[e];ae.call(t,e)&&oe(i,n)&&(void 0!==n||e in t)||se(t,e,n)}function ue(t,e,n,i){var r=!n;n||(n={});for(var s=-1,o=e.length;++s<o;){var a=e[s],c=i?i(n[a],t[a],a,n,t):void 0;void 0===c&&(c=t[a]),r?se(n,a,c):ce(n,a,c)}return n}var de=Math.max;function le(t,e,n){return e=de(void 0===e?t.length-1:e,0),function(){for(var i=arguments,r=-1,s=de(i.length-e,0),o=Array(s);++r<s;)o[r]=i[e+r];r=-1;for(var a=Array(e+1);++r<e;)a[r]=i[r];return a[e]=n(o),Ht(t,this,a)}}function he(t,e){return Xt(le(t,e,At),t+"")}function pe(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}function fe(t){return null!=t&&pe(t.length)&&!kt(t)}function me(t,e,n){if(!bt(n))return!1;var i=typeof e;return!!("number"==i?fe(n)&&re(e,n.length):"string"==i&&e in n)&&oe(n[e],t)}var ve=Object.prototype;function ye(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||ve)}function ge(t){return pt(t)&&"[object Arguments]"==ht(t)}var _e=Object.prototype,be=_e.hasOwnProperty,we=_e.propertyIsEnumerable,je=ge(function(){return arguments}())?ge:function(t){return pt(t)&&be.call(t,"callee")&&!we.call(t,"callee")};var xe="object"==typeof t&&t&&!t.nodeType&&t,Se=xe&&"object"==typeof module&&module&&!module.nodeType&&module,$e=Se&&Se.exports===xe?rt.Buffer:void 0,Oe=($e?$e.isBuffer:void 0)||function(){return!1},Ae={};function ke(t){return function(e){return t(e)}}Ae["[object Float32Array]"]=Ae["[object Float64Array]"]=Ae["[object Int8Array]"]=Ae["[object Int16Array]"]=Ae["[object Int32Array]"]=Ae["[object Uint8Array]"]=Ae["[object Uint8ClampedArray]"]=Ae["[object Uint16Array]"]=Ae["[object Uint32Array]"]=!0,Ae["[object Arguments]"]=Ae["[object Array]"]=Ae["[object ArrayBuffer]"]=Ae["[object Boolean]"]=Ae["[object DataView]"]=Ae["[object Date]"]=Ae["[object Error]"]=Ae["[object Function]"]=Ae["[object Map]"]=Ae["[object Number]"]=Ae["[object Object]"]=Ae["[object RegExp]"]=Ae["[object Set]"]=Ae["[object String]"]=Ae["[object WeakMap]"]=!1;var Ee="object"==typeof t&&t&&!t.nodeType&&t,Ce=Ee&&"object"==typeof module&&module&&!module.nodeType&&module,Pe=Ce&&Ce.exports===Ee&&nt.process,Ne=function(){try{var t=Ce&&Ce.require&&Ce.require("util").types;return t||Pe&&Pe.binding&&Pe.binding("util")}catch(t){}}(),Ie=Ne&&Ne.isTypedArray,Te=Ie?ke(Ie):function(t){return pt(t)&&pe(t.length)&&!!Ae[ht(t)]},ze=Object.prototype.hasOwnProperty;function Ue(t,e){var n=vt(t),i=!n&&je(t),r=!n&&!i&&Oe(t),s=!n&&!i&&!r&&Te(t),o=n||i||r||s,a=o?function(t,e){for(var n=-1,i=Array(t);++n<t;)i[n]=e(n);return i}(t.length,String):[],c=a.length;for(var u in t)!e&&!ze.call(t,u)||o&&("length"==u||r&&("offset"==u||"parent"==u)||s&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||re(u,c))||a.push(u);return a}function Me(t,e){return function(n){return t(e(n))}}var De=Me(Object.keys,Object),Re=Object.prototype.hasOwnProperty;function Ve(t){return fe(t)?Ue(t):function(t){if(!ye(t))return De(t);var e=[];for(var n in Object(t))Re.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}var Ge=Object.prototype.hasOwnProperty;function Le(t){if(!bt(t))return function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}(t);var e=ye(t),n=[];for(var i in t)("constructor"!=i||!e&&Ge.call(t,i))&&n.push(i);return n}function qe(t){return fe(t)?Ue(t,!0):Le(t)}var Fe,He=(Fe=function(t,e){ue(e,qe(e),t)},he((function(t,e){var n=-1,i=e.length,r=i>1?e[i-1]:void 0,s=i>2?e[2]:void 0;for(r=Fe.length>3&&"function"==typeof r?(i--,r):void 0,s&&me(e[0],e[1],s)&&(r=i<3?void 0:r,i=1),t=Object(t);++n<i;){var o=e[n];o&&Fe(t,o,n,r)}return t}))),Be=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,We=/^\w*$/;function Je(t,e){if(vt(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!ft(t))||(We.test(t)||!Be.test(t)||null!=e&&t in Object(e))}var Ye=Gt(Object,"create");var Ze=Object.prototype.hasOwnProperty;var Ke=Object.prototype.hasOwnProperty;function Xe(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}function Qe(t,e){for(var n=t.length;n--;)if(oe(t[n][0],e))return n;return-1}Xe.prototype.clear=function(){this.__data__=Ye?Ye(null):{},this.size=0},Xe.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Xe.prototype.get=function(t){var e=this.__data__;if(Ye){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return Ze.call(e,t)?e[t]:void 0},Xe.prototype.has=function(t){var e=this.__data__;return Ye?void 0!==e[t]:Ke.call(e,t)},Xe.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Ye&&void 0===e?"__lodash_hash_undefined__":e,this};var tn=Array.prototype.splice;function en(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}en.prototype.clear=function(){this.__data__=[],this.size=0},en.prototype.delete=function(t){var e=this.__data__,n=Qe(e,t);return!(n<0)&&(n==e.length-1?e.pop():tn.call(e,n,1),--this.size,!0)},en.prototype.get=function(t){var e=this.__data__,n=Qe(e,t);return n<0?void 0:e[n][1]},en.prototype.has=function(t){return Qe(this.__data__,t)>-1},en.prototype.set=function(t,e){var n=this.__data__,i=Qe(n,t);return i<0?(++this.size,n.push([t,e])):n[i][1]=e,this};var nn=Gt(rt,"Map");function rn(t,e){var n,i,r=t.__data__;return("string"==(i=typeof(n=e))||"number"==i||"symbol"==i||"boolean"==i?"__proto__"!==n:null===n)?r["string"==typeof e?"string":"hash"]:r.map}function sn(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}sn.prototype.clear=function(){this.size=0,this.__data__={hash:new Xe,map:new(nn||en),string:new Xe}},sn.prototype.delete=function(t){var e=rn(this,t).delete(t);return this.size-=e?1:0,e},sn.prototype.get=function(t){return rn(this,t).get(t)},sn.prototype.has=function(t){return rn(this,t).has(t)},sn.prototype.set=function(t,e){var n=rn(this,t),i=n.size;return n.set(t,e),this.size+=n.size==i?0:1,this};function on(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var n=function(){var i=arguments,r=e?e.apply(this,i):i[0],s=n.cache;if(s.has(r))return s.get(r);var o=t.apply(this,i);return n.cache=s.set(r,o)||s,o};return n.cache=new(on.Cache||sn),n}on.Cache=sn;var an=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,cn=/\\(\\)?/g,un=function(t){var e=on(t,(function(t){return 500===n.size&&n.clear(),t})),n=e.cache;return e}((function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(an,(function(t,n,i,r){e.push(i?r.replace(cn,"$1"):n||t)})),e}));function dn(t,e){return vt(t)?t:Je(t,e)?[t]:un(function(t){return null==t?"":_t(t)}(t))}function ln(t){if("string"==typeof t||ft(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}function hn(t,e){for(var n=0,i=(e=dn(e,t)).length;null!=t&&n<i;)t=t[ln(e[n++])];return n&&n==i?t:void 0}function pn(t,e){for(var n=-1,i=e.length,r=t.length;++n<i;)t[r+n]=e[n];return t}var fn=st?st.isConcatSpreadable:void 0;function mn(t){return vt(t)||je(t)||!!(fn&&t&&t[fn])}function vn(t,e,n,i,r){var s=-1,o=t.length;for(n||(n=mn),r||(r=[]);++s<o;){var a=t[s];e>0&&n(a)?e>1?vn(a,e-1,n,i,r):pn(r,a):i||(r[r.length]=a)}return r}function yn(t){return(null==t?0:t.length)?vn(t,1):[]}function gn(t){return Xt(le(t,void 0,yn),t+"")}var _n=Me(Object.getPrototypeOf,Object),bn=Function.prototype,wn=Object.prototype,jn=bn.toString,xn=wn.hasOwnProperty,Sn=jn.call(Object);function $n(t){var e=this.__data__=new en(t);this.size=e.size}$n.prototype.clear=function(){this.__data__=new en,this.size=0},$n.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},$n.prototype.get=function(t){return this.__data__.get(t)},$n.prototype.has=function(t){return this.__data__.has(t)},$n.prototype.set=function(t,e){var n=this.__data__;if(n instanceof en){var i=n.__data__;if(!nn||i.length<199)return i.push([t,e]),this.size=++n.size,this;n=this.__data__=new sn(i)}return n.set(t,e),this.size=n.size,this};var On="object"==typeof t&&t&&!t.nodeType&&t,An=On&&"object"==typeof module&&module&&!module.nodeType&&module,kn=An&&An.exports===On?rt.Buffer:void 0,En=kn?kn.allocUnsafe:void 0;function Cn(t,e){for(var n=-1,i=null==t?0:t.length,r=0,s=[];++n<i;){var o=t[n];e(o,n,t)&&(s[r++]=o)}return s}function Pn(){return[]}var Nn=Object.prototype.propertyIsEnumerable,In=Object.getOwnPropertySymbols,Tn=In?function(t){return null==t?[]:(t=Object(t),Cn(In(t),(function(e){return Nn.call(t,e)})))}:Pn;var zn=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)pn(e,Tn(t)),t=_n(t);return e}:Pn;function Un(t,e,n){var i=e(t);return vt(t)?i:pn(i,n(t))}function Mn(t){return Un(t,Ve,Tn)}function Dn(t){return Un(t,qe,zn)}var Rn=Gt(rt,"DataView"),Vn=Gt(rt,"Promise"),Gn=Gt(rt,"Set"),Ln=It(Rn),qn=It(nn),Fn=It(Vn),Hn=It(Gn),Bn=It(Lt),Wn=ht;(Rn&&"[object DataView]"!=Wn(new Rn(new ArrayBuffer(1)))||nn&&"[object Map]"!=Wn(new nn)||Vn&&"[object Promise]"!=Wn(Vn.resolve())||Gn&&"[object Set]"!=Wn(new Gn)||Lt&&"[object WeakMap]"!=Wn(new Lt))&&(Wn=function(t){var e=ht(t),n="[object Object]"==e?t.constructor:void 0,i=n?It(n):"";if(i)switch(i){case Ln:return"[object DataView]";case qn:return"[object Map]";case Fn:return"[object Promise]";case Hn:return"[object Set]";case Bn:return"[object WeakMap]"}return e});var Jn=Wn,Yn=Object.prototype.hasOwnProperty;var Zn=rt.Uint8Array;function Kn(t){var e=new t.constructor(t.byteLength);return new Zn(e).set(new Zn(t)),e}var Xn=/\w*$/;var Qn=st?st.prototype:void 0,ti=Qn?Qn.valueOf:void 0;function ei(t,e,n){var i,r,s,o=t.constructor;switch(e){case"[object ArrayBuffer]":return Kn(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,e){var n=e?Kn(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,n);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,e){var n=e?Kn(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,n);case"[object Map]":return new o;case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return(s=new(r=t).constructor(r.source,Xn.exec(r))).lastIndex=r.lastIndex,s;case"[object Set]":return new o;case"[object Symbol]":return i=t,ti?Object(ti.call(i)):{}}}var ni=Ne&&Ne.isMap,ii=ni?ke(ni):function(t){return pt(t)&&"[object Map]"==Jn(t)};var ri=Ne&&Ne.isSet,si=ri?ke(ri):function(t){return pt(t)&&"[object Set]"==Jn(t)},oi={};function ai(t,e,n,i,r,s){var o,a=1&e,c=2&e,u=4&e;if(n&&(o=r?n(t,i,r,s):n(t)),void 0!==o)return o;if(!bt(t))return t;var d=vt(t);if(d){if(o=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&Yn.call(t,"index")&&(n.index=t.index,n.input=t.input),n}(t),!a)return Bt(t,o)}else{var l=Jn(t),h="[object Function]"==l||"[object GeneratorFunction]"==l;if(Oe(t))return function(t,e){if(e)return t.slice();var n=t.length,i=En?En(n):new t.constructor(n);return t.copy(i),i}(t,a);if("[object Object]"==l||"[object Arguments]"==l||h&&!r){if(o=c||h?{}:function(t){return"function"!=typeof t.constructor||ye(t)?{}:Ft(_n(t))}(t),!a)return c?function(t,e){return ue(t,zn(t),e)}(t,function(t,e){return t&&ue(e,qe(e),t)}(o,t)):function(t,e){return ue(t,Tn(t),e)}(t,function(t,e){return t&&ue(e,Ve(e),t)}(o,t))}else{if(!oi[l])return r?t:{};o=ei(t,l,a)}}s||(s=new $n);var p=s.get(t);if(p)return p;s.set(t,o),si(t)?t.forEach((function(i){o.add(ai(i,e,n,i,t,s))})):ii(t)&&t.forEach((function(i,r){o.set(r,ai(i,e,n,r,t,s))}));var f=u?c?Dn:Mn:c?keysIn:Ve,m=d?void 0:f(t);return Qt(m||t,(function(i,r){m&&(i=t[r=i]),ce(o,r,ai(i,e,n,r,t,s))})),o}oi["[object Arguments]"]=oi["[object Array]"]=oi["[object ArrayBuffer]"]=oi["[object DataView]"]=oi["[object Boolean]"]=oi["[object Date]"]=oi["[object Float32Array]"]=oi["[object Float64Array]"]=oi["[object Int8Array]"]=oi["[object Int16Array]"]=oi["[object Int32Array]"]=oi["[object Map]"]=oi["[object Number]"]=oi["[object Object]"]=oi["[object RegExp]"]=oi["[object Set]"]=oi["[object String]"]=oi["[object Symbol]"]=oi["[object Uint8Array]"]=oi["[object Uint8ClampedArray]"]=oi["[object Uint16Array]"]=oi["[object Uint32Array]"]=!0,oi["[object Error]"]=oi["[object Function]"]=oi["[object WeakMap]"]=!1;function ci(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new sn;++e<n;)this.add(t[e])}function ui(t,e){for(var n=-1,i=null==t?0:t.length;++n<i;)if(e(t[n],n,t))return!0;return!1}ci.prototype.add=ci.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},ci.prototype.has=function(t){return this.__data__.has(t)};function di(t,e,n,i,r,s){var o=1&n,a=t.length,c=e.length;if(a!=c&&!(o&&c>a))return!1;var u=s.get(t);if(u&&s.get(e))return u==e;var d=-1,l=!0,h=2&n?new ci:void 0;for(s.set(t,e),s.set(e,t);++d<a;){var p=t[d],f=e[d];if(i)var m=o?i(f,p,d,e,t,s):i(p,f,d,t,e,s);if(void 0!==m){if(m)continue;l=!1;break}if(h){if(!ui(e,(function(t,e){if(o=e,!h.has(o)&&(p===t||r(p,t,n,i,s)))return h.push(e);var o}))){l=!1;break}}else if(p!==f&&!r(p,f,n,i,s)){l=!1;break}}return s.delete(t),s.delete(e),l}function li(t){var e=-1,n=Array(t.size);return t.forEach((function(t,i){n[++e]=[i,t]})),n}function hi(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}var pi=st?st.prototype:void 0,fi=pi?pi.valueOf:void 0;var mi=Object.prototype.hasOwnProperty;var vi=Object.prototype.hasOwnProperty;function yi(t,e,n,i,r,s){var o=vt(t),a=vt(e),c=o?"[object Array]":Jn(t),u=a?"[object Array]":Jn(e),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),l="[object Object]"==(u="[object Arguments]"==u?"[object Object]":u),h=c==u;if(h&&Oe(t)){if(!Oe(e))return!1;o=!0,d=!1}if(h&&!d)return s||(s=new $n),o||Te(t)?di(t,e,n,i,r,s):function(t,e,n,i,r,s,o){switch(n){case"[object DataView]":if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case"[object ArrayBuffer]":return!(t.byteLength!=e.byteLength||!s(new Zn(t),new Zn(e)));case"[object Boolean]":case"[object Date]":case"[object Number]":return oe(+t,+e);case"[object Error]":return t.name==e.name&&t.message==e.message;case"[object RegExp]":case"[object String]":return t==e+"";case"[object Map]":var a=li;case"[object Set]":var c=1&i;if(a||(a=hi),t.size!=e.size&&!c)return!1;var u=o.get(t);if(u)return u==e;i|=2,o.set(t,e);var d=di(a(t),a(e),i,r,s,o);return o.delete(t),d;case"[object Symbol]":if(fi)return fi.call(t)==fi.call(e)}return!1}(t,e,c,n,i,r,s);if(!(1&n)){var p=d&&vi.call(t,"__wrapped__"),f=l&&vi.call(e,"__wrapped__");if(p||f){var m=p?t.value():t,v=f?e.value():e;return s||(s=new $n),r(m,v,n,i,s)}}return!!h&&(s||(s=new $n),function(t,e,n,i,r,s){var o=1&n,a=Mn(t),c=a.length;if(c!=Mn(e).length&&!o)return!1;for(var u=c;u--;){var d=a[u];if(!(o?d in e:mi.call(e,d)))return!1}var l=s.get(t);if(l&&s.get(e))return l==e;var h=!0;s.set(t,e),s.set(e,t);for(var p=o;++u<c;){var f=t[d=a[u]],m=e[d];if(i)var v=o?i(m,f,d,e,t,s):i(f,m,d,t,e,s);if(!(void 0===v?f===m||r(f,m,n,i,s):v)){h=!1;break}p||(p="constructor"==d)}if(h&&!p){var y=t.constructor,g=e.constructor;y==g||!("constructor"in t)||!("constructor"in e)||"function"==typeof y&&y instanceof y&&"function"==typeof g&&g instanceof g||(h=!1)}return s.delete(t),s.delete(e),h}(t,e,n,i,r,s))}function gi(t,e,n,i,r){return t===e||(null==t||null==e||!pt(t)&&!pt(e)?t!=t&&e!=e:yi(t,e,n,i,gi,r))}function _i(t){return t==t&&!bt(t)}function bi(t,e){return function(n){return null!=n&&(n[t]===e&&(void 0!==e||t in Object(n)))}}function wi(t){var e=function(t){for(var e=Ve(t),n=e.length;n--;){var i=e[n],r=t[i];e[n]=[i,r,_i(r)]}return e}(t);return 1==e.length&&e[0][2]?bi(e[0][0],e[0][1]):function(n){return n===t||function(t,e,n,i){var r=n.length,s=r,o=!i;if(null==t)return!s;for(t=Object(t);r--;){var a=n[r];if(o&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++r<s;){var c=(a=n[r])[0],u=t[c],d=a[1];if(o&&a[2]){if(void 0===u&&!(c in t))return!1}else{var l=new $n;if(i)var h=i(u,d,c,t,e,l);if(!(void 0===h?gi(d,u,3,i,l):h))return!1}}return!0}(n,t,e)}}function ji(t,e){return null!=t&&e in Object(t)}function xi(t,e,n){for(var i=-1,r=(e=dn(e,t)).length,s=!1;++i<r;){var o=ln(e[i]);if(!(s=null!=t&&n(t,o)))break;t=t[o]}return s||++i!=r?s:!!(r=null==t?0:t.length)&&pe(r)&&re(o,r)&&(vt(t)||je(t))}function Si(t,e){return null!=t&&xi(t,e,ji)}function $i(t,e){return Je(t)&&_i(e)?bi(ln(t),e):function(n){var i=function(t,e,n){var i=null==t?void 0:hn(t,e);return void 0===i?n:i}(n,t);return void 0===i&&i===e?Si(n,t):gi(e,i,3)}}function Oi(t){return Je(t)?(e=ln(t),function(t){return null==t?void 0:t[e]}):function(t){return function(e){return hn(e,t)}}(t);var e}function Ai(t){return"function"==typeof t?t:null==t?At:"object"==typeof t?vt(t)?$i(t[0],t[1]):wi(t):Oi(t)}function ki(t,e,n,i){for(var r=-1,s=null==t?0:t.length;++r<s;){var o=t[r];e(i,o,n(o),t)}return i}var Ei,Ci=function(t,e,n){for(var i=-1,r=Object(t),s=n(t),o=s.length;o--;){var a=s[Ei?o:++i];if(!1===e(r[a],a,r))break}return t};function Pi(t,e){return t&&Ci(t,e,Ve)}var Ni=function(t,e){return function(n,i){if(null==n)return n;if(!fe(n))return t(n,i);for(var r=n.length,s=e?r:-1,o=Object(n);(e?s--:++s<r)&&!1!==i(o[s],s,o););return n}}(Pi);function Ii(t,e,n,i){return Ni(t,(function(t,r,s){e(i,t,n(t),s)})),i}var Ti=Object.prototype,zi=Ti.hasOwnProperty,Ui=he((function(t,e){t=Object(t);var n=-1,i=e.length,r=i>2?e[2]:void 0;for(r&&me(e[0],e[1],r)&&(i=1);++n<i;)for(var s=e[n],o=qe(s),a=-1,c=o.length;++a<c;){var u=o[a],d=t[u];(void 0===d||oe(d,Ti[u])&&!zi.call(t,u))&&(t[u]=s[u])}return t}));function Mi(t,e){var n;return(vt(t)?Qt:Ni)(t,"function"==typeof(n=e)?n:At)}function Di(t,e){var n=[];return Ni(t,(function(t,i,r){e(t,i,r)&&n.push(t)})),n}function Ri(t,e){return(vt(t)?Cn:Di)(t,Ai(e))}var Vi=Math.max;var Gi,Li=(Gi=function(t,e,n){var i=null==t?0:t.length;if(!i)return-1;var r,s,o=null==n?0:(r=Ot(n),s=r%1,r==r?s?r-s:r:0);return o<0&&(o=Vi(i+o,0)),te(t,Ai(e),o)},function(t,e,n){var i=Object(t);if(!fe(t)){var r=Ai(e);t=Ve(t),e=function(t){return r(i[t],t,i)}}var s=Gi(t,e,n);return s>-1?i[r?t[s]:s]:void 0});function qi(t,e){var n=-1,i=fe(t)?Array(t.length):[];return Ni(t,(function(t,r,s){i[++n]=e(t,r,s)})),i}function Fi(t,e){return(vt(t)?mt:qi)(t,Ai(e))}var Hi=Object.prototype.hasOwnProperty;function Bi(t,e){return null!=t&&Hi.call(t,e)}function Wi(t){return null==t?[]:function(t,e){return mt(e,(function(e){return t[e]}))}(t,Ve(t))}function Ji(t,e){return e.length<2?t:hn(t,function(t,e,n){var i=-1,r=t.length;e<0&&(e=-e>r?0:r+e),(n=n>r?r:n)<0&&(n+=r),r=e>n?0:n-e>>>0,e>>>=0;for(var s=Array(r);++i<r;)s[i]=t[i+e];return s}(e,0,-1))}var Yi,Zi,Ki=(Yi=function(t,e,n){se(t,n,e)},function(t,e){var n=vt(t)?ki:Ii,i=Zi?Zi():{};return n(t,Yi,Ai(e),i)});function Xi(t,e){var n={};return e=Ai(e),Pi(t,(function(t,i,r){se(n,i,e(t,i,r))})),n}function Qi(t,e){return null==(t=Ji(t,e=dn(e,t)))||delete t[ln((n=e,i=null==n?0:n.length,i?n[i-1]:void 0))];var n,i}function tr(t){return function(t){if(!pt(t)||"[object Object]"!=ht(t))return!1;var e=_n(t);if(null===e)return!0;var n=xn.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&jn.call(n)==Sn}(t)?void 0:t}var er=gn((function(t,e){var n={};if(null==t)return n;var i=!1;e=mt(e,(function(e){return e=dn(e,t),i||(i=e.length>1),e})),ue(t,Dn(t),n),i&&(n=ai(n,7,tr));for(var r=e.length;r--;)Qi(n,e[r]);return n}));function nr(t,e,n,i){if(!bt(t))return t;for(var r=-1,s=(e=dn(e,t)).length,o=s-1,a=t;null!=a&&++r<s;){var c=ln(e[r]),u=n;if(r!=o){var d=a[c];void 0===(u=i?i(d,c,a):void 0)&&(u=bt(d)?d:re(e[r+1])?[]:{})}ce(a,c,u),a=a[c]}return t}function ir(t,e,n){for(var i=-1,r=e.length,s={};++i<r;){var o=e[i],a=hn(t,o);n(a,o)&&nr(s,dn(o,t),a)}return s}function rr(t,e){if(t!==e){var n=void 0!==t,i=null===t,r=t==t,s=ft(t),o=void 0!==e,a=null===e,c=e==e,u=ft(e);if(!a&&!u&&!s&&t>e||s&&o&&c&&!a&&!u||i&&o&&c||!n&&c||!r)return 1;if(!i&&!s&&!u&&t<e||u&&n&&r&&!i&&!s||a&&n&&r||!o&&r||!c)return-1}return 0}function sr(t,e,n){var i=-1;return e=mt(e.length?e:[At],ke(Ai)),function(t,e){var n=t.length;for(t.sort(e);n--;)t[n]=t[n].value;return t}(qi(t,(function(t,n,r){return{criteria:mt(e,(function(e){return e(t)})),index:++i,value:t}})),(function(t,e){return function(t,e,n){for(var i=-1,r=t.criteria,s=e.criteria,o=r.length,a=n.length;++i<o;){var c=rr(r[i],s[i]);if(c)return i>=a?c:c*("desc"==n[i]?-1:1)}return t.index-e.index}(t,e,n)}))}var or=gn((function(t,e){return null==t?{}:function(t,e){return ir(t,e,(function(e,n){return Si(t,n)}))}(t,e)}));function ar(t,e,n,i){for(var r=n-1,s=t.length;++r<s;)if(i(t[r],e))return r;return-1}var cr=Array.prototype.splice;var ur=he((function(t,e){return t&&t.length&&e&&e.length?function(t,e,n,i){var r=i?ar:ne,s=-1,o=e.length,a=t;for(t===e&&(e=Bt(e)),n&&(a=mt(t,ke(n)));++s<o;)for(var c=0,u=e[s],d=n?n(u):u;(c=r(a,d,c,i))>-1;)a!==t&&cr.call(a,c,1),cr.call(t,c,1);return t}(t,e):t})),dr=he((function(t,e){if(null==t)return[];var n=e.length;return n>1&&me(t,e[0],e[1])?e=[]:n>2&&me(e[0],e[1],e[2])&&(e=[e[0]]),sr(t,vn(e,1),[])})),lr={add:"add item",cancel:"cancel",next:"next",save:"save",delete:"delete"},hr={no_group_selected:"Select a group first",no_entity_selected:"Select an entity first",no_groups_defined:"There are no groups defined",no_entities_for_group:"There are no entities in this group",no_actions_for_entity:"There are no actions for this entity",no_entries_defined:"There are no items to show"},pr={group:"Group",entity:"Entity",action:"Action",days:"Days",time:"Time",options:"Options",day_type_daily:"every day",day_type_weekdays:"weekdays",day_type_custom:"custom",shift_with_sun:"automatically adjust time to sunrise/sunset"},fr={mon:"mon",tue:"tue",wed:"wed",thu:"thu",fri:"fri",sat:"sat",sun:"sun"},mr={mon:"monday",tue:"tuesday",wed:"wednesday",thu:"thursday",fri:"friday",sat:"saturday",sun:"sunday"},vr={on:"on",every:"every",and:"and",at:"at",before:"before",after:"after",sunrise:"sunrise",sunset:"sunset"},yr={turn_on:"turn on",turn_off:"turn off",close_cover:"close",open_cover:"open",set_temperature:"set to"},gr={climate:"climate",cover:"covers",fan:"fans",light:"lights",switch:"switches",vacuum:"vacuum"},_r={scheduler:"Scheduler",actions:lr,instructions:hr,fields:pr,days_short:fr,days_long:mr,words:vr,services:yr,domains:gr},br={add:"Nieuw item",cancel:"annuleren",next:"verder",save:"opslaan",delete:"verwijder"},wr={no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",no_entries_defined:"Er zijn geen items aangemaakt"},jr={group:"Groep",entity:"Entiteit",action:"Actie",days:"Dagen",time:"Tijdstip",options:"Opties",day_type_daily:"Dagelijks",day_type_weekdays:"Werkdagen",day_type_custom:"Anders",shift_with_sun:"Automatisch aanpassen aan zonsopgang/zonsondergang"},xr={mon:"ma",tue:"di",wed:"wo",thu:"do",fri:"vr",sat:"za",sun:"zo"},Sr={mon:"maandag",tue:"dinsdag",wed:"woensdag",thu:"donderdag",fri:"vrijdag",sat:"zaterdag",sun:"zondag"},$r={on:"op",every:"elke",and:"en",at:"om",before:"voor",after:"na",sunrise:"zonsopgang",sunset:"zonsondergang"},Or={turn_on:"aanzetten",turn_off:"uitzetten",close_cover:"sluiten",open_cover:"openen",set_temperature:"Zet op"},Ar={climate:"verwarming",cover:"zonwering",fan:"ventilatie",light:"verlichting",switch:"schakelaars",vacuum:"stofzuiger"},kr={scheduler:"Tijdplanner",actions:br,instructions:wr,fields:jr,days_short:xr,days_long:Sr,words:$r,services:Or,domains:Ar},Er={add:"hinzufügen",cancel:"abbrechen",next:"weiter",save:"speichern",delete:"löschen"},Cr={no_group_selected:"Wähle zuerst eine Gruppe aus",no_entity_selected:"Wähle zuerst eine Entity aus",no_groups_defined:"Es gibt keine Gruppe",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",no_entries_defined:"Es gibt keine Einträge"},Pr={group:"Gruppe",entity:"Entity",action:"Aktion",days:"Tage",time:"Zeit",options:"Optionen",day_type_daily:"jeden Tag",day_type_weekdays:"Werktags",day_type_custom:"benutzerdefiniert",shift_with_sun:"Zeit automatisch an Sonnenauf- bzw. Sonnenuntergang anpassen"},Nr={mon:"Mo",tue:"Di",wed:"Mi",thu:"Do",fri:"Fr",sat:"Sa",sun:"So"},Ir={mon:"Montag",tue:"Dienstag",wed:"Mittwoch",thu:"Donnerstag",fri:"Freitag",sat:"Samstag",sun:"Sonntag"},Tr={on:"An",every:"jeden",and:"und",at:"um",before:"vor",after:"nach",sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang"},zr={turn_on:"anschalten",turn_off:"ausschalten",close_cover:"schließen",open_cover:"öffnen",set_temperature:"setzen auf"},Ur={climate:"Heizung",cover:"Beschattung",fan:"Lüfter",light:"Licht",switch:"Schalter",vacuum:"Staubsauger"},Mr={scheduler:"Zeitplaner",actions:Er,instructions:Cr,fields:Pr,days_short:Nr,days_long:Ir,words:Tr,services:zr,domains:Ur},Dr={add:"ajouter un item",cancel:"canceller",next:"suivant",save:"sauvegarder",delete:"effacer"},Rr={no_group_selected:"Sélectionner un groupe en premier",no_entity_selected:"Sélectionner une entité en premier",no_groups_defined:"Il n'y a pas de groupe défini",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_actions_for_entity:"Il n'y a pas d'action pour cette entité",no_entries_defined:"Il n'y a pas d'item à afficher"},Vr={group:"Groupe",entity:"Entité",action:"Action",days:"DJours",time:"Temps",options:"Options",day_type_daily:"chaque jour",day_type_weekdays:"en semaine",day_type_custom:"sur mesure",shift_with_sun:"ajuster automatiquement l'heure au lever/coucher du soleil"},Gr={mon:"lun",tue:"mar",wed:"mer",thu:"jeu",fri:"ven",sat:"sam",sun:"dim"},Lr={mon:"lundi",tue:"mardi",wed:"mercredi",thu:"jeudi",fri:"vendredi",sat:"samedi",sun:"dimanche"},qr={on:"marche",every:"tout",and:"et",at:"à",before:"avant",after:"après",sunrise:"lever du soleil",sunset:"coucher du soleil"},Fr={turn_on:"allumer",turn_off:"éteindre",close_cover:"fermer",open_cover:"ouvrir",set_temperature:"défini à"},Hr={climate:"climat",cover:"contrôleur",fan:"ventilateur",light:"lumière",switch:"interrupteurs",vacuum:"aspirateur"},Br={scheduler:"Planificateur",actions:Dr,instructions:Rr,fields:Vr,days_short:Gr,days_long:Lr,words:qr,services:Fr,domains:Hr},Wr={en:Object.freeze({__proto__:null,scheduler:"Scheduler",actions:lr,instructions:hr,fields:pr,days_short:fr,days_long:mr,words:vr,services:yr,domains:gr,default:_r}),nl:Object.freeze({__proto__:null,scheduler:"Tijdplanner",actions:br,instructions:wr,fields:jr,days_short:xr,days_long:Sr,words:$r,services:Or,domains:Ar,default:kr}),de:Object.freeze({__proto__:null,scheduler:"Zeitplaner",actions:Er,instructions:Cr,fields:Pr,days_short:Nr,days_long:Ir,words:Tr,services:zr,domains:Ur,default:Mr}),fr:Object.freeze({__proto__:null,scheduler:"Planificateur",actions:Dr,instructions:Rr,fields:Vr,days_short:Gr,days_long:Lr,words:qr,services:Fr,domains:Hr,default:Br})};function Jr(t,e="",n=""){const i=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var r;try{r=t.split(".").reduce((t,e)=>t[e],Wr[i])}catch(e){r=t.split(".").reduce((t,e)=>t[e],Wr.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],Wr.en)),""!==e&&""!==n&&(r=r.replace(e,n)),r}const Yr={light:{actions:[{service:"turn_on",icon:"lightbulb-outline",name:Jr("services.turn_on")},{service:"turn_off",icon:"lightbulb-off-outline",name:Jr("services.turn_off")}]},switch:{actions:[{service:"turn_on",name:Jr("services.turn_on")},{service:"turn_off",name:Jr("services.turn_off")}]},cover:{actions:[{service:"open_cover",name:Jr("services.open_cover")},{service:"close_cover",name:Jr("services.close_cover")}]},climate:{actions:[{service:"set_temperature",service_data:{temperature:10},name:Jr("services.set_temperature")+" 10C",icon:"thermometer-chevron-down"},{service:"set_temperature",service_data:{temperature:22},name:Jr("services.set_temperature")+" 22C",icon:"thermometer-chevron-up"}]}},Zr={group:"",entity:"",action:"",newItem:!1,actionConfirmed:!1,editItem:"",timeHours:"12",timeMinutes:"00",days:[],daysType:"daily",sun:!1};function Kr(t){var e={automation:"robot",camera:"camera",climate:"home-thermometer-outline",cover:"window-shutter",fan:"fan",input_number:"sort-numeric-variant",input_select:"form-select",input_text:"form-textbox",input_time:"clock",light:"lightbulb-outline",media_player:"speaker",script:"script-text",switch:"flash",vacuum:"robot-vacuum"};return t in e?e[t]:"folder-outline"}function Xr(t){return"turn_on"==t?"toggle-switch-outline":"turn_off"==t?"toggle-switch-off-outline":"open_cover"==t?"window-shutter-open":"close_cover"==t?"window-shutter":"set_temperature"==t?"thermometer":"flash"}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var Qr=function(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}((function(t,e){var n;n=function(){var t=JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\"","”":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}'),e=JSON.parse('{"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue"},"vi":{"Đ":"D","đ":"d"}}');function n(n,i){if("string"!=typeof n)throw new Error("slugify: string argument expected");var r=e[(i="string"==typeof i?{replacement:i}:i||{}).locale]||{},s=void 0===i.replacement?"-":i.replacement,o=n.split("").reduce((function(e,n){return e+(r[n]||t[n]||n).replace(i.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")}),"").trim().replace(new RegExp("[\\s"+s+"]+","g"),s);return i.lower&&(o=o.toLowerCase()),i.strict&&(o=o.replace(new RegExp("[^a-zA-Z0-9"+s+"]","g"),"").replace(new RegExp("[\\s"+s+"]+","g"),s)),o}return n.extend=function(e){for(var n in e)t[n]=e[n]},n},t.exports=n(),t.exports.default=n()}));const ts=/^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/,es=/^(A([0-9]+))+$/,ns=/^([0-9]{4})?(S[SR])([0-9]{4})?$/,is=/^([0-9]{2})([0-9]{2})$/,rs=/^([\+\-]{1})([0-9]{2}):([0-9]{2})$/;function ss(t){let e=is.exec(t);return e?e[1]+":"+e[2]:null}function os(t){if(-1===t.indexOf("."))return"";return String(t.split(".").shift())}function as(t){let e=Ve(t);e=e.sort();let n={};return e.forEach(e=>n[e]=t[e]),Qr(JSON.stringify(Wi(n)).replace(/\W/g," "),"_")}function cs(t){return t.match(/^switch.schedule_[0-9a-f]{6}$/)}function us(t){return!t||!t.length||1==t.length&&0==t[0]?"daily":5!=t.length||t.includes(6)||t.includes(7)?"custom":"weekdays"}function ds(t){return t.replace("_"," ")}class ls{constructor(t){this.entities={},this.groups={},t.entities||t.domains||void 0!==t.standardConfiguration&&!t.standardConfiguration?this.userConfig=t:this.userConfig={domains:Yr},t.groups&&Mi(t.groups,this.CreateGroup.bind(this)),this.discoverExisting=void 0===t.discoverExisting||t.discoverExisting}CreateGroup(t,e){let n=Object.assign({},t);var i;this.groups[e]||(Ui(n,{name:(i=e,"climate"==i?Jr("domains.climate"):"cover"==i?Jr("domains.cover"):"fan"==i?Jr("domains.fan"):"light"==i?Jr("domains.light"):"switch"==i?Jr("domains.switch"):"vacuum"==i?Jr("domains.vacuum"):i),domains:[],entities:[]}),this.groups[e]=n)}FindGroupForEntity(t){let e=os(t);return!!Li(this.groups,n=>!!(n.domains&&Array.isArray(n.domains)&&n.domains.includes(e))||!!(n.entities&&Array.isArray(n.entities)&&n.entities.includes(t)))}AddEntityToGroup(t){let e=os(t);if(this.groups[e]){let n=[...this.groups[e].entities];n.push(t),this.groups[e].entities=n}else this.CreateGroup({entities:[t],icon:Kr(e)},e)}AddEntityInfo(t,e){if(this.entities[t])Object.assign(this.entities[t],er(Object.assign({},e),"actions")),i="actions",null!=(n=e)&&xi(n,i,Bi)&&Mi(e.actions,e=>{if(Li(this.entities[t].actions,t=>as(or(t,["service","service_data"]))==as(or(e,["service","service_data"]))))return;let n=[...this.entities[t].actions];n.push(e),this.entities[t].actions=n});else{let n=Object.assign(Object.assign({},e),{id:t});Ui(n,{actions:[]}),this.entities[t]=n}var n,i;this.FindGroupForEntity(t)||this.AddEntityToGroup(t)}LoadEntities(t){if(Mi(t,t=>{let e=t.entity_id,n=os(e);cs(e)||(this.userConfig.domains&&n in this.userConfig.domains&&this.AddEntityInfo(e,this.userConfig.domains[n]),this.userConfig.entities&&e in this.userConfig.entities&&this.AddEntityInfo(e,this.userConfig.entities[e]))}),this.discoverExisting){let e=Ri(t,t=>cs(t.entity_id));e=Fi(e,t=>t.attributes.actions),e=yn(e),Mi(e,t=>{let e=Object.assign({},t);os(e.entity)||(e.entity=os(e.service)+"."+e.entity,e.service=e.service.split(".").pop());let n=er(e,["entity","service"]);n?this.AddEntityInfo(e.entity,{actions:[{service:e.service,service_data:n}]}):this.AddEntityInfo(e.entity,{actions:[or(e,"service")]})})}Mi(this.entities,(e,n)=>{Ui(e,{name:t[n].attributes.friendly_name,icon:Kr(os(n))}),Object.assign(e,{actions:Fi(e.actions,t=>{let e=Object.assign({},t);var n;return Ui(e,{name:(n=t.service,"turn_on"==n?Jr("services.turn_on"):"turn_off"==n?Jr("services.turn_off"):"open_cover"==n?Jr("services.open_cover"):"close_cover"==n?Jr("services.close_cover"):n),icon:Xr(t.service)}),Object.assign(e,{id:as(or(t,["service","service_data"]))}),e})})}),t["sun.sun"]&&(this.next_sunrise=new Date(t["sun.sun"].attributes.next_rising),this.next_sunset=new Date(t["sun.sun"].attributes.next_setting))}GetGroups(){let t=Xi(this.groups,t=>or(t,["name","icon"]));return Mi(t,(t,e)=>{Object.assign(t,{key:e})}),t=dr(t,"name"),t}GetEntities(t){let e={};if(t){let n=this.groups[t];e=function(t,e){if(null==t)return{};var n=mt(Dn(t),(function(t){return[t]}));return e=Ai(e),ir(t,n,(function(t,n){return e(t,n[0])}))}(this.entities,(t,e)=>{let i=os(e);return!(!n.domains||!n.domains.includes(i))||!(!n.entities||!n.entities.includes(e))})}else e=this.entities;let n=Xi(e,t=>or(t,["name","icon"]));return Mi(n,(t,e)=>{Object.assign(t,{key:e})}),n=dr(n,"name"),n}GetEntity(t){return this.entities[t]}GetActions(t){let e=this.entities[t],n=Xi(Ki(e.actions,"id"),t=>or(t,["name","icon"]));return Mi(n,(t,e)=>{Object.assign(t,{key:e})}),n=dr(n,"name"),n}GetAction(t,e){let n=this.entities[t];if(!n)return null;let i=Li(n.actions,{id:e});return i||null}}const hs=((t,...e)=>{const n=e.reduce((e,n,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[i+1],t[0]);return new Q(n,X)})`
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
`;function ps(t){return Array.isArray(t)?"array":typeof t==typeof{}?"object":"string"==typeof t?"string":"boolean"==typeof t?"boolean":"number"==typeof t?"number":"unknown"}function fs(t,e){return ps(t)==e}function ms(t,e,n){return!(!t||!t.hasOwnProperty(e))&&fs(t[e],n)}function vs(t,e,n){return!t||!t.hasOwnProperty(e)||fs(t[e],n)}var ys;console.info("%c  SCHEDULER-CARD  \n%c  Version 1.2.3   ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),t.SchedulerCard=class extends et{constructor(){super(...arguments),this.entries=[],this.selection=Object.assign({},Zr),this.count=0,this.await_update=!0}static get styles(){return hs}set hass(t){this.await_update&&this.Config&&(this._hass||this.Config.LoadEntities(t.states),this.update_entries(t),this._hass=t)}update_entries(t){let e=Ri(t.states,t=>cs(t.entity_id)).map(t=>function(t,e){let n=t.attributes.entries.map(t=>{let n=ts.exec(t),i=es.exec(n[3]),r={days:n[1].split("").map(Number),actions:i.map(Number).filter(t=>!isNaN(t))},s=ns.exec(n[2]);if(null!==ss(n[2]))Object.assign(r,{time:ss(n[2])});else if(s){let t;if(t="SR"==s[2]?e.next_sunrise.getHours()+e.next_sunrise.getMinutes()/60:e.next_sunset.getHours()+e.next_sunset.getMinutes()/60,s[1]){let e=t-(Number(s[1].substr(0,2))+Number(s[1].substr(2))/60);Object.assign(r,{event:"SR"==s[2]?"sunrise":"sunset",offset:"-"+ss(s[1]),time:`${String(Math.floor(e)).padStart(2,"0")}:${String(10*Math.round(6*(e-Math.floor(e)))).padStart(2,"0")}`})}else if(s[3]){let e=t+(Number(s[3].substr(0,2))+Number(s[3].substr(2))/60);Object.assign(r,{event:"SR"==s[2]?"sunrise":"sunset",offset:"+"+ss(s[3]),time:`${String(Math.floor(e)).padStart(2,"0")}:${String(10*Math.round(6*(e-Math.floor(e)))).padStart(2,"0")}`})}}return r}),i=t.attributes.actions.map(t=>{let n=os(t.entity)?t.entity:os(t.service)+"."+t.entity,i=t.service,r=er(t,["service","entity"]);if(os(n)==os(i)&&(i=i.split(".").pop()),!e.GetEntity(n))return;let s=as(r?Object.assign({service:i,service_data:r}):Object.assign({service:i}));return e.GetAction(n,s)?{entity:n,action:s}:void 0});return{id:t.entity_id,enabled:"off"!=t.state,entries:n,actions:i}}(t,this.Config)).filter(t=>void 0!==t.actions[0]);e!=this.entries&&(this.entries=e,this.await_update=!1,this.requestUpdate())}awaitUpdate(){this.await_update=!0}render(){return this.selection.newItem||this.selection.editItem?this.selection.newItem&&!this.selection.actionConfirmed?D`
        <ha-card>
          <div class="card-header">${Jr("scheduler")}</div>
          <div class="card-section first">
            <div class="header">${Jr("fields.group")}</div>
            <div class="option-list">
            ${this.getGroups()}
            </div>
            <div class="header">${Jr("fields.entity")}</div>
            <div class="option-list">
            ${this.getEntities()}
            </div>
            <div class="header">${Jr("fields.action")}</div>
            <div class="option-list">
            ${this.getActions()}
            </div>
          </div>
          <div class="card-section last">
            <mwc-button outlined @click="${()=>this.editItemCancel()}">${Jr("actions.cancel")}</mwc-button>
            ${this.selection.action?D`<mwc-button outlined @click="${()=>this.newItemConfirm()}">${Jr("actions.next")}</mwc-button>`:D`<mwc-button outlined disabled>${Jr("actions.next")}</mwc-button>`}
          </div>
        </ha-card>
      `:D`
      <ha-card>
        <div class="card-header">${Jr("scheduler")}</div>
        ${this.showEditor()}
      </ha-card>
      `:D`
      <ha-card>
        <div class="card-header">${Jr("scheduler")}</div>
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${()=>{this.newItem()}}">${Jr("actions.add")}</mwc-button>
        </div>
      </ha-card>
      `}newItem(){this.selection=He(Object.assign({},Zr),{newItem:!0}),this.requestUpdate()}editItemCancel(){this.selection=Object.assign({},Zr),this.requestUpdate()}newItemConfirm(){this.selection=He(Object.assign({},Zr),{newItem:!0,actionConfirmed:!0,entity:this.selection.entity,action:this.selection.action}),this.requestUpdate()}getEntries(){return this.entries&&this.entries.length?this.entries.map(t=>{if(!t.actions[0])return D``;let e=this.Config.GetEntity(t.actions[0].entity),n=this.Config.GetAction(t.actions[0].entity,t.actions[0].action);return D`
      <div class="list-item${t.enabled?"":" disabled"}" @click="${()=>this.editItem(t.id)}">
        <div class="list-item-icon">
          ${e.icon?D`<ha-icon icon="hass:${e.icon}"></ha-icon>`:""}
        </div>
        <div class="list-item-name">
          ${ds(e.name)}
        </div>
        <div class="list-item-action">
          ${ds(n.name)}
        </div>
        <div class="list-item-days">
          ${function(t){if("daily"==us(t))return Jr("fields.day_type_daily");if("weekdays"==us(t))return`${Jr("words.on")} ${Jr("fields.day_type_weekdays")}`;{let n=Array();t.includes(1)&&n.push(Jr("days_long.mon")),t.includes(2)&&n.push(Jr("days_long.tue")),t.includes(3)&&n.push(Jr("days_long.wed")),t.includes(4)&&n.push(Jr("days_long.thu")),t.includes(5)&&n.push(Jr("days_long.fri")),t.includes(6)&&n.push(Jr("days_long.sat")),t.includes(7)&&n.push(Jr("days_long.sun"));let i=n.join(", ");var e=i.lastIndexOf(", ");return e&&(i=i.slice(0,e)+i.slice(e).replace(", ",` ${Jr("words.and")} `)),`${Jr("words.every")} ${i}`}}(t.entries[0].days)}
        </div>
        <div class="list-item-time">
          ${function(t){if(t.event){let e=rs.exec(t.offset),n=Number(e[2])+Number(e[3])/60;return Math.abs(n)<1/6?`${Jr("words.at")} ${t.event} (${t.time})`:`${e[2]}:${e[3]} ${"+"==e[1]?Jr("words.after"):Jr("words.before")} ${Jr("words."+t.event)} (${t.time})`}return`${Jr("words.at")} ${t.time}`}(or(t.entries[0],["time","event","offset"]))}
        </div>
        <div class="list-item-switch">
          ${t.enabled?D`<ha-switch checked="checked" @click="${e=>this.toggleDisable(t.id,e)}"></ha-switch>`:D`<ha-switch @click="${e=>this.toggleDisable(t.id,e)}"></ha-switch>`}
        </div>
      </div>
      `}):[D`
      <div class="text-field">
        ${Jr("instructions.no_entries_defined")}
      </div>
    `]}toggleDisable(t,e){e.stopPropagation(),!e.target.checked?this._hass.callService("switch","turn_on",{entity_id:t}):this._hass.callService("switch","turn_off",{entity_id:t}),this.awaitUpdate()}editItem(t){let e=Li(this.entries,{id:t});this.selection=He(Object.assign({},Zr),{editItem:t,entity:e.actions[0].entity,action:e.actions[0].action,timeHours:e.entries[0].time.split(":").shift(),timeMinutes:e.entries[0].time.split(":").pop(),days:e.entries[0].days,daysType:us(e.entries[0].days),sun:void 0!==e.entries[0].event}),this.requestUpdate()}getGroups(){let t=this.Config.GetGroups();return t.length?t.map(t=>D`
        <mwc-button class="${this.selection.group==t.key?" active":""}" @click="${()=>{this.selectGroup(t.key)}}">
          ${t.icon?D`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ds(t.name)}
        </mwc-button>
      `):[D`<div class="text-field">${Jr("instructions.no_groups_defined")}</div>`]}selectGroup(t){Object.assign(this.selection,{group:t,entity:null,action:null}),this.requestUpdate()}getEntities(){if(!this.selection.group)return[D`<div class="text-field">${Jr("instructions.no_group_selected")}</div>`];let t=this.Config.GetEntities(this.selection.group);return t.length?t.map(t=>D`
        <mwc-button class="${this.selection.entity==t.key?" active":""}" @click="${()=>{this.selectEntity(t.key)}}">
          ${t.icon?D`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ds(t.name)}
        </mwc-button>
      `):[D`<div class="text-field">${Jr("instructions.no_entities_for_group")}</div>`]}selectEntity(t){Object.assign(this.selection,{entity:t,action:null}),this.requestUpdate()}getActions(){if(!this.selection.entity)return[D`<div class="text-field">${Jr("instructions.no_entity_selected")}</div>`];let t=this.Config.GetActions(this.selection.entity);return t.length?t.map(t=>D`
        <mwc-button class="${this.selection.action==t.key?" active":""}" @click="${()=>{this.selectAction(t.key)}}">
          ${t.icon?D`<ha-icon icon="hass:${t.icon}" class="padded-right"></ha-icon>`:""}
          ${ds(t.name)}
        </mwc-button>
      `):[D`<div class="text-field">${Jr("instructions.no_actions_for_entity")}</div>`]}selectAction(t){Object.assign(this.selection,{action:t}),this.requestUpdate()}setConfig(t){!function(t){if(void 0!==t.entities)try{if(!ms(t,"entities","object"))throw`Configuration for 'entities' should be of type 'object', but got '${ps(t.entities)}'.`;Mi(t.entities,(t,e)=>{if(!fs(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${ps(t)}'.`;if(!vs(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${ps(t.name)}'.`;if(!vs(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${ps(t.icon)}'.`;if(!vs(t,"actions","array"))throw`In ${e} at 'actions: (...)': expected type 'array', but got '${ps(t.actions)}'.`;t&&Mi(t.actions,t=>{if(!ms(t,"service","string"))throw`In ${e}->actions at 'service: ${t.service}': expected type 'string', but got '${ps(t.service)}'.`;if(!vs(t,"name","string"))throw`In ${e}->actions at 'name: ${t.name}': expected type 'string', but got '${ps(t.name)}'.`;if(!vs(t,"icon","string"))throw`In ${e}->actions at 'icon: ${t.icon}': expected type 'string', but got '${ps(t.icon)}'.`;if(!vs(t,"service_data","object"))throw`In ${e}->actions at 'service_data: ${t.service_data}': expected type 'object', but got '${ps(t.service_data)}'.`})})}catch(t){throw new Error("Invalid configuration provided for 'entities'. "+t)}if(void 0!==t.domains)try{if(!ms(t,"domains","object"))throw`Configuration for 'domains' should be of type 'object', but got '${ps(t.domains)}'.`;Mi(t.domains,(t,e)=>{if(!fs(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${ps(t)}'.`;if(!vs(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${ps(t.name)}'.`;if(!vs(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${ps(t.icon)}'.`;if(!vs(t,"actions","array"))throw`In ${e} at 'actions: (...)': expected type 'array', but got '${ps(t.actions)}'.`;t&&Mi(t.actions,t=>{if(!ms(t,"service","string"))throw`In ${e}->actions at 'service: ${t.service}': expected type 'string', but got '${ps(t.service)}'.`;if(!vs(t,"name","string"))throw`In ${e}->actions at 'name: ${t.name}': expected type 'string', but got '${ps(t.name)}'.`;if(!vs(t,"icon","string"))throw`In ${e}->actions at 'icon: ${t.icon}': expected type 'string', but got '${ps(t.icon)}'.`;if(!vs(t,"service_data","object"))throw`In ${e}->actions at 'service_data: ${t.service_data}': expected type 'object', but got '${ps(t.service_data)}'.`})})}catch(t){throw new Error("Invalid configuration provided for 'domains'. "+t)}if(void 0!==t.groups)try{if(!ms(t,"groups","object"))throw`Configuration for 'domains' should be of type 'object', but got '${ps(t.groups)}'.`;Mi(t.groups,(t,e)=>{if(!fs(t,"object"))throw`In '${e}: (...)': expected type 'object', but got '${ps(t)}'.`;if(!vs(t,"name","string"))throw`In ${e} at 'name: ${t.name}': expected type 'string', but got '${ps(t.name)}'.`;if(!vs(t,"icon","string"))throw`In ${e} at 'icon: ${t.icon}': expected type 'string', but got '${ps(t.icon)}'.`;if(!vs(t,"entities","array"))throw`In ${e} at 'icon: ${t.entities}': expected type 'array', but got '${ps(t.entities)}'.`;if(!vs(t,"domains","array"))throw`In ${e} at 'icon: ${t.domains}': expected type 'array', but got '${ps(t.domains)}'.`;t&&(Mi(t.entities,t=>{if(!fs(t,"string"))throw`In ${e}->entities at '${t}': expected type 'string', but got '${ps(t)}'.`}),Mi(t.domains,t=>{if(!fs(t,"string"))throw`In ${e}->domains at '${t}': expected type 'string', but got '${ps(t)}'.`}))})}catch(t){throw new Error("Invalid configuration provided for 'groups'. "+t)}if(!vs(t,"discoverExisting","boolean"))throw new Error(`Invalid configuration provided for 'discoverExisting': expected type 'boolean', but got '${ps(t.discoverExisting)}'.`);if(!vs(t,"standardConfiguration","boolean"))throw new Error(`Invalid configuration provided for 'standardConfiguration': expected type 'boolean', but got '${ps(t.standardConfiguration)}'.`)}(t),this.Config=new ls(t)}showEditor(){let t=this.Config.GetEntity(this.selection.entity),e=this.Config.GetAction(this.selection.entity,this.selection.action);return D`
    <div class="card-section first">
      <div class="header">${Jr("fields.action")}</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${t.icon?D`<ha-icon icon="hass:${t.icon}"></ha-icon>`:""}
          </div>
          <div class="summary-text">
            ${ds(t.name)}
          </div>
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"></ha-icon>
        </div>
        <div class="summary-action">
          <div class="summary-icon">
            ${e.icon?D`<ha-icon icon="hass:${e.icon}"></ha-icon>`:""}
          </div>
          <div class="summary-text">
            ${ds(e.name)}
          </div>
        </div>
      </div>
     </div>
    <div class="card-section">
      <div class="header">${Jr("fields.days")}</div>
      <div class="day-list">
        <mwc-button class="day-item${"daily"==this.selection.daysType?" active":""}" index="daily" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("fields.day_type_daily")}</mwc-button>
        <mwc-button class="day-item${"weekdays"==this.selection.daysType?" active":""}" index="weekdays" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("fields.day_type_weekdays")}</mwc-button>
        <mwc-button class="day-item${"custom"==this.selection.daysType?" active":""}" index="custom" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("fields.day_type_custom")}</mwc-button>
      </div>
      <div class="day-list${"custom"==this.selection.daysType?"":" closed"}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.days.includes(1)?" active":""}" index="1" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.mon")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(2)?" active":""}" index="2" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.tue")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(3)?" active":""}" index="3" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.wed")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(4)?" active":""}" index="4" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.thu")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(5)?" active":""}" index="5" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.fri")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(6)?" active":""}" index="6" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.sat")}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(7)?" active":""}" index="7" @click="${t=>this.updateDays(t.target.getAttribute("index"))}">${Jr("days_short.sun")}</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">${Jr("fields.time")}</div>
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
      <div class="header">${Jr("fields.options")}</div>
        <div class="option-item">
          ${this.selection.sun?D`<paper-checkbox checked name="option-item-sun" @change="${t=>this.toggleSun(t.target.checked)}">${Jr("fields.shift_with_sun")}</paper-checkbox>`:D`<paper-checkbox name="option-item-sun" @change="${t=>this.toggleSun(t.target)}">${Jr("fields.shift_with_sun")}</paper-checkbox>`}
        </div>
      </div>
    </div>
    <div class="card-section last">
      <mwc-button outlined @click="${()=>this.editItemCancel()}">${Jr("actions.cancel")}</mwc-button>
      ${void 0===this.selection.editItem?"":D`<mwc-button outlined @click="${()=>this.editItemDelete()}">${Jr("actions.delete")}</mwc-button>`}
      <mwc-button outlined @click="${()=>this.editItemSave()}">${Jr("actions.save")}</mwc-button>
    </div>
    `}updateDays(t){var e=Array("daily","weekdays","custom");e.includes(t)?this.selection.daysType=t:(this.selection.days.includes(Number(t))?ur(this.selection.days,Number(t)):this.selection.days.push(Number(t)),this.selection.daysType="custom"),this.shadowRoot.querySelectorAll(".day-item").forEach(t=>{let n=String(t.getAttribute("index"));e.includes(n)?this.selection.daysType==n?t.classList.add("active"):t.classList.remove("active"):this.selection.days.includes(Number(n))?t.classList.add("active"):t.classList.remove("active")}),"custom"==this.selection.daysType?this.shadowRoot.querySelector("#day-list-custom").classList.remove("closed"):this.shadowRoot.querySelector("#day-list-custom").classList.add("closed")}updateTime(t){let e=Number(this.selection.timeHours),n=Number(this.selection.timeMinutes);"time-hours-up"==t?e++:"time-hours-down"==t?e--:"time-minutes-up"==t?n+=10:"time-minutes-down"==t&&(n-=10),e<0?e=23:e>23?e=0:n<0?n=50:n>50&&(n=0);let i=String(e).padStart(2,"0"),r=String(n).padStart(2,"0");this.shadowRoot.querySelector("#time-hours").innerHTML=i,this.shadowRoot.querySelector("#time-minutes").innerHTML=r,this.selection.timeHours=i,this.selection.timeMinutes=r}editItemSave(){var t=function(t,e){let n=e.GetEntity(t.entity),i=e.GetAction(t.entity,t.action),r=or(i,["service","service_data"]);Object.assign(r,{entity:n.id}),os(r.service)||(r.service=os(r.entity)+"."+r.service);let s={actions:[0]};if(t.sun){if(e.next_sunrise&&e.next_sunset){let n,i=Number(t.timeHours)+Number(t.timeMinutes)/60,r=e.next_sunrise.getHours()+e.next_sunrise.getMinutes()/60,o=e.next_sunset.getHours()+e.next_sunset.getMinutes()/60;Math.abs(i-r)<Math.abs(i-o)?(Object.assign(s,{event:"sunrise"}),n=i-r):(Object.assign(s,{event:"sunset"}),n=i-o);let a=n>0?Math.abs(Math.floor(n)):Math.abs(Math.ceil(n)),c=n>0?Math.round(60*(n-a)):-Math.round(60*(n+a));Object.assign(s,{offset:`${n>0?"+":"-"}${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}`})}}else Object.assign(s,{time:t.timeHours+":"+t.timeMinutes});return"weekdays"==t.daysType?Object.assign(s,{days:[1,2,3,4,5]}):"custom"==t.daysType&&Object.assign(s,{days:t.days.sort().filter(t=>0!=t)}),{actions:[r],entries:[s]}}(this.selection,this.Config);this.selection.newItem?this._hass.callService("scheduler","add",t):this.selection.editItem&&this._hass.callService("scheduler","edit",Object.assign(t,{entity_id:this.selection.editItem})),this.selection=Object.assign({},Zr),this.awaitUpdate()}editItemDelete(){let t=this.selection.editItem;this._hass.callService("scheduler","remove",{entity_id:t}),this.selection=Object.assign({},Zr),this.awaitUpdate()}toggleSun(t){this.selection.sun=t}},e([Z()],t.SchedulerCard.prototype,"Config",void 0),e([Z({type:Number})],t.SchedulerCard.prototype,"count",void 0),e([Z()],t.SchedulerCard.prototype,"_hass",void 0),t.SchedulerCard=e([(ys="scheduler-card",t=>"function"==typeof t?((t,e)=>(window.customElements.define(t,e),e))(ys,t):((t,e)=>{const{kind:n,elements:i}=e;return{kind:n,elements:i,finisher(e){window.customElements.define(t,e)}}})(ys,t))],t.SchedulerCard)}({});
