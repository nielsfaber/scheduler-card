!function(e){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function t(e,t,r,i){var a,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(s<3?a(n):s>3?a(t,r,n):a(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n
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
     */}const r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},a=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${a}--\x3e`,n=new RegExp(`${a}|${s}`);class o{constructor(e,t){this.parts=[],this.element=t;const r=[],i=[],s=document.createTreeWalker(t.content,133,null,!1);let o=0,c=-1,h=0;const{strings:p,values:{length:m}}=e;for(;h<m;){const e=s.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let i=0;for(let e=0;e<r;e++)l(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=p[h],r=u.exec(t)[2],i=r.toLowerCase()+"$lit$",a=e.getAttribute(i);e.removeAttribute(i);const s=a.split(n);this.parts.push({type:"attribute",index:c,name:r,strings:s}),h+=s.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),s.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const i=e.parentNode,a=t.split(n),s=a.length-1;for(let t=0;t<s;t++){let r,s=a[t];if(""===s)r=d();else{const e=u.exec(s);null!==e&&l(e[2],"$lit$")&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),r=document.createTextNode(s)}i.insertBefore(r,e),this.parts.push({type:"node",index:++c})}""===a[s]?(i.insertBefore(d(),e),r.push(e)):e.data=a[s],h+=s}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&c!==o||(c++,t.insertBefore(d(),e)),o=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(r.push(e),c--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),h++}}else s.currentNode=i.pop()}for(const e of r)e.parentNode.removeChild(e)}}const l=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},c=e=>-1!==e.index,d=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:r},parts:i}=e,a=document.createTreeWalker(r,133,null,!1);let s=m(i),n=i[s],o=-1,l=0;const c=[];let d=null;for(;a.nextNode();){o++;const e=a.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==n&&n.index===o;)n.index=null!==d?-1:n.index-l,s=m(i,s),n=i[s]}c.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},m=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(c(t))return r}return-1};
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
const v=new WeakMap,f=e=>"function"==typeof e&&v.has(e),g={},y={};
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
class _{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let s,n=0,o=0,l=a.nextNode();for(;n<i.length;)if(s=i[n],c(s)){for(;o<s.index;)o++,"TEMPLATE"===l.nodeName&&(t.push(l),a.currentNode=l.content),null===(l=a.nextNode())&&(a.currentNode=t.pop(),l=a.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));n++}else this.__parts.push(void 0),n++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${a} `;class P{constructor(e,t,r,i){this.strings=e,this.values=t,this.type=r,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let i=0;i<e;i++){const e=this.strings[i],n=e.lastIndexOf("\x3c!--");r=(n>-1||r)&&-1===e.indexOf("--\x3e",n+1);const o=u.exec(e);t+=null===o?e+(r?w:s):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}
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
     */const E=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!S(e))return e}let i="";for(let a=0;a<t;a++){i+=e[a];const t=r[a];if(void 0!==t){const e=t.value;if(E(e)||!S(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||E(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(E(e)?e!==this.value&&this.__commitText(e):e instanceof P?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===y?(this.value=y,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof _&&this.value.template===t)this.value.update(e.values);else{const r=new _(t,e.processor,this.options),i=r._clone();r.update(e.values),this.__commitNode(i),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,i=0;for(const a of e)r=t[i],void 0===r&&(r=new k(this.options),t.push(r),0===i?r.appendIntoPart(this):r.insertAfterPart(t[i-1])),r.setValue(a),r.commit(),i++;i<t.length&&(t.length=i,this.clear(r&&r.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class j extends x{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends ${}let D=!1;(()=>{try{const e={get capture(){return D=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=T(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(D?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function F(e){let t=z.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},z.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const i=e.strings.join(a);return r=t.keyString.get(i),void 0===r&&(r=new o(e,e.getTemplateElement()),t.keyString.set(i,r)),t.stringsArray.set(e.strings,r),r}const z=new Map,N=new WeakMap;
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
     */const R=new
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
class{handleAttributeExpressions(e,t,r,i){const a=t[0];if("."===a){return new j(e,t.slice(1),r).parts}if("@"===a)return[new A(e,t.slice(1),i.eventContext)];if("?"===a)return[new O(e,t.slice(1),r)];return new x(e,t,r).parts}handleTextExpression(e){return new k(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(e,...t)=>new P(e,t,"html",R)
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
     */,M=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const U=e=>t=>{const r=M(t.type,e);let i=z.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},z.set(r,i));let s=i.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(a);if(s=i.keyString.get(n),void 0===s){const r=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(r,e),s=new o(t,r),i.keyString.set(n,s)}return i.stringsArray.set(t.strings,s),s},V=["html","svg"],q=new Set,H=(e,t,r)=>{q.add(e);const i=r?r.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:s}=a;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,e);const n=document.createElement("style");for(let e=0;e<s;e++){const t=a[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{V.forEach(t=>{const r=z.get(M(t,e));void 0!==r&&r.keyString.forEach(e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{r.add(e)}),h(e,r)})})})(e);const o=i.content;r?function(e,t,r=null){const{element:{content:i},parts:a}=e;if(null==r)return void i.appendChild(t);const s=document.createTreeWalker(i,133,null,!1);let n=m(a),o=0,l=-1;for(;s.nextNode();){l++;for(s.currentNode===r&&(o=p(t),r.parentNode.insertBefore(t,r));-1!==n&&a[n].index===l;){if(o>0){for(;-1!==n;)a[n].index+=o,n=m(a,n);return}n=m(a,n)}}}(r,n,o.firstChild):o.insertBefore(n,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(r){o.insertBefore(n,o.firstChild);const e=new Set;e.add(n),h(r,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const G={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Q=(e,t)=>t!==e&&(t==t||e==e),B={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:Q};class K extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,r)=>{const i=this._attributeNameForProperty(r,t);void 0!==i&&(this._attributeToPropertyMap.set(i,r),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=B){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const a=this[e];this[t]=i,this.requestUpdateInternal(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||B}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=Q){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,i=t.converter||G,a="function"==typeof i?i:i.fromAttribute;return a?a(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,i=t.converter;return(i&&i.toAttribute||G.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=B){const i=this.constructor,a=i._attributeNameForProperty(e,r);if(void 0!==a){const e=i._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,i=r._attributeToPropertyMap.get(e);if(void 0!==i){const e=r.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let i=!0;if(void 0!==e){const a=this.constructor;r=r||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}K.finalized=!0;
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
const W=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:i}=t;return{kind:r,elements:i,finisher(t){window.customElements.define(e,t)}}})(e,t),Y=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function J(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):Y(e,t)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const Z=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const r=t.reduce((t,r,i)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[i+1],e[0]);return new ee(r,X)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const re={};class ie extends K{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e),r),r=t(e,new Set),i=[];r.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Z){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Z?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==re&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return re}}var ae,se,ne;ie.finalized=!0,ie.render=(e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const a=r.scopeName,s=N.has(t),n=L&&11===t.nodeType&&!!t.host,o=n&&!q.has(a),l=o?document.createDocumentFragment():t;if(((e,t,r)=>{let a=N.get(t);void 0===a&&(i(t,t.firstChild),N.set(t,a=new k(Object.assign({templateFactory:F},r))),a.appendInto(t)),a.setValue(e),a.commit()})(e,l,Object.assign({templateFactory:U(a)},r)),o){const e=N.get(l);N.delete(l);const r=e.value instanceof _?e.value.template:void 0;H(a,l,r),i(t,t.firstChild),t.appendChild(l),N.set(t,e)}!s&&n&&window.ShadyCSS.styleElement(t.host)},function(e){e.Level="LEVEL",e.List="LIST"}(ae||(ae={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(se||(se={})),function(e){e.Any="or",e.All="and"}(ne||(ne={}));var oe={add:"hinzufügen",cancel:"abbrechen",next:"weiter",save:"speichern",delete:"löschen"},le={no_group_selected:"Wähle zuerst eine Gruppe aus",no_entity_selected:"Wähle zuerst eine Entity aus",no_groups_defined:"Es gibt keine Gruppe",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",no_entries_defined:"Es gibt keine Einträge"},ce={group:"Gruppe",entity:"Entity",action:"Aktion",days:"Tage",time:"Zeit",options:"Optionen",day_type_daily:"jeden Tag",day_type_workday:"Werktags",day_type_weelemd:"Wochenende",day_type_custom:"benutzerdefiniert"},de={mon:"Mo",tue:"Di",wed:"Mi",thu:"Do",fri:"Fr",sat:"Sa",sun:"So"},ue={mon:"Montag",tue:"Dienstag",wed:"Mittwoch",thu:"Donnerstag",fri:"Freitag",sat:"Samstag",sun:"Sonntag"},he={and:"und",before:"vor",after:"nach"},pe={turn_on:"anschalten",turn_off:"ausschalten",close_cover:"schließen",open_cover:"öffnen",set_temperature:"Temperatur einstellen",set_to:"setzen auf",set_position:"Position setzen",set_hvac_mode:"Modus setzen",set_preset_mode:"Voreinstellung setzen",set_value:"Wert setzen",select_option:"Option auswählen",select_source:"Quelle auswählen",start:"Start"},me={brightness:"Helligkeit",temperature:"Temperatur",position:"Position",hvac_mode:"Modus",preset:"Voreinstellung"},ve={camera:"Kameras",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"Licht",media_player:"Media Player",scene:"Szene",switch:"Schalter",vacuum:"Staubsauger"},fe={tomorrow:"morgen",daily:"täglich",daily_except_days:"täglich außer {days}",working_days:"Werktags",weekend:"Wochenende",interval:"{startDay} bis {endDay}"},ge={absolute:"um {time}",relative:"in {time}",interval:"von {startTime} bis {endTime}",seconds:"{seconds} Sekunden",hour:"1 Stunde",hours:"{hours} Stunden",minute:"1 Minute",minutes:"{minutes} Minuten",now:"jetzt",midnight:"Mitternacht",noon:"Mittag",at_sun_event:"am {sunEvent}",sun_event_sunrise:"Sonnenaufgang",sun_event_sunset:"Sonnenuntergang"},ye={one_additional_task:"1 more task",x_additional_tasks:"{count} more tasks"},_e={scheduler:"Zeitplaner",actions:oe,instructions:le,fields:ce,days_short:de,days_long:ue,words:he,services:pe,service_parameters:me,domains:ve,days:fe,time:ge,misc:ye},be=Object.freeze({__proto__:null,scheduler:"Zeitplaner",actions:oe,instructions:le,fields:ce,days_short:de,days_long:ue,words:he,services:pe,service_parameters:me,domains:ve,days:fe,time:ge,misc:ye,default:_e}),we={add:"add item",cancel:"cancel",next:"next",save:"save",delete:"delete"},Pe={no_group_selected:"Select a group first",no_entity_selected:"Select an entity first",no_groups_defined:"There are no groups defined",no_entities_for_group:"There are no entities in this group",no_actions_for_entity:"There are no actions for this entity",no_entries_defined:"There are no items to show"},Ee={group:"Group",entity:"Entity",action:"Action",days:"Days",time:"Time",options:"Options",day_type_daily:"daily",day_type_workday:"workdays",day_type_weekend:"weekend",day_type_custom:"custom"},Se={mon:"mon",tue:"tue",wed:"wed",thu:"thu",fri:"fri",sat:"sat",sun:"sun"},xe={mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"},$e={and:"and",before:"before",after:"after"},ke={turn_on:"turn on",turn_off:"turn off",close_cover:"close",open_cover:"open",set_temperature:"set temperature",set_to:"set to",set_position:"set position",set_hvac_mode:"set mode",set_preset_mode:"set preset",set_value:"set value",select_option:"select option",select_source:"select source",start:"start"},Oe={brightness:"brightness",temperature:"temperature",position:"position",hvac_mode:"mode",preset:"preset"},je={camera:"cameras",climate:"climate",cover:"covers",fan:"fans",group:"groups",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"lights",media_player:"media players",scene:"scenes",switch:"switches",vacuum:"vacuum"},Ce={tomorrow:"tomorrow",daily:"daily",daily_except_days:"every day except {days}",working_days:"working days",weekend:"weekend",interval:"{startDay} to {endDay}"},De={absolute:"at {time}",relative:"in {time}",interval:"from {startTime} to {endTime}",seconds:"{seconds} seconds",hour:"1 hour",hours:"{hours} hours",minute:"1 minute",minutes:"{minutes} minutes",now:"now",midnight:"midnight",noon:"noon",at_sun_event:"at {sunEvent}",sun_event_sunrise:"sunrise",sun_event_sunset:"sunset"},Ae={one_additional_task:"1 more task",x_additional_tasks:"{count} more tasks"},Te={scheduler:"Scheduler",actions:we,instructions:Pe,fields:Ee,days_short:Se,days_long:xe,words:$e,services:ke,service_parameters:Oe,domains:je,days:Ce,time:De,misc:Ae},Fe=Object.freeze({__proto__:null,scheduler:"Scheduler",actions:we,instructions:Pe,fields:Ee,days_short:Se,days_long:xe,words:$e,services:ke,service_parameters:Oe,domains:je,days:Ce,time:De,misc:Ae,default:Te}),ze={add:"Agregar",cancel:"cancelar",next:"siguiente",save:"guardar",delete:"borrar"},Ne={no_group_selected:"Selecciona un grupo primero",no_entity_selected:"Selecciona una entidad primero",no_groups_defined:"No hay grupos definidos",no_entities_for_group:"No hay entidades en este grupo",no_actions_for_entity:"No hay acciones para esta entidad",no_entries_defined:"No hay dispositivos definidos"},Re={group:"Grupo",entity:"Entidad",action:"Acción",days:"Días",time:"Hora",options:"Opciones",day_type_daily:"cada día",day_type_weekdays:"dias semanales",day_type_custom:"personalizado",shift_with_sun:"ajusta automaticamente la hora al amanecer/atardecer",brightness:"Brillo",temperature:"Temperatura",position:"Posición"},Ie={mon:"lun",tue:"mar",wed:"mie",thu:"jue",fri:"vie",sat:"sab",sun:"dom"},Me={mon:"lunes",tue:"martes",wed:"miércoles",thu:"jueves",fri:"viernes",sat:"sábado",sun:"domingo"},Le={on:"en",every:"cada",and:"y",at:"a las",before:"antes",after:"después",sunrise:"amanecer",sunset:"atardecer"},Ue={turn_on:"encender",turn_off:"apagar",close_cover:"cerrar",open_cover:"abrir",set_cover_position:"Establecer Posición",set_temperature:"establecer temperatura",set_to:"establecer a",set_position:"establecer posición",set_hvac_mode:"establecer modo de A/A",set_preset_mode:"establecer modo",set_value:"establecer valor",select_option:"seleccionar opción",select_source:"seleccionar fuente",start:"empezar"},Ve={camera:"cámaras",climate:"climatización",cover:"persiana",fan:"ventilador",group:"grupo",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"luces",media_player:"reproductor multimedia",scene:"escena",switch:"interruptor",vacuum:"aspirador"},qe={scheduler:"Programador",actions:ze,instructions:Ne,fields:Re,days_short:Ie,days_long:Me,words:Le,services:Ue,domains:Ve},He=Object.freeze({__proto__:null,scheduler:"Programador",actions:ze,instructions:Ne,fields:Re,days_short:Ie,days_long:Me,words:Le,services:Ue,domains:Ve,default:qe}),Ge={add:"lisa",cancel:"loobu",next:"edasi",save:"salvesta",delete:"kustuta"},Qe={no_group_selected:"Vali grupp",no_entity_selected:"Vali olem",no_groups_defined:"Gruppe pole määratud",no_entities_for_group:"Antud grupis puuduvad olemid",no_actions_for_entity:"Selles olemis puuduvad tegevused",no_entries_defined:"Pole midagi kuvada"},Be={group:"Grupp",entity:"Olem",action:"Tegevus",days:"Päevad",time:"Aeg",options:"Suvandid",day_type_daily:"iga päev",day_type_weekdays:"tööpäevadel",day_type_weekend:"nädalavahetus",day_type_custom:"valikuline"},Ke={mon:"E",tue:"T",wed:"K",thu:"N",fri:"R",sat:"L",sun:"P"},We={mon:"Esmaspäev",tue:"Teisipäev",wed:"Kolmapäev",thu:"Neljapäev",fri:"Reede",sat:"Laupäev",sun:"Pühapäev"},Ye={and:"ja",before:"enne",after:"pärast"},Je={turn_on:"lülita sisse",turn_off:"lülita välja",close_cover:"sulge",open_cover:"ava",set_temperature:"määra temperatuur",set_to:"määra väärtus",set_position:"seadista asendisse",set_hvac_mode:"vali töörežiim",set_preset_mode:"eelseadistatud",set_value:"määra väärtus",select_option:"valikud",select_source:"vali allikas",start:"alusta"},Ze={brightness:"heledus",temperature:"temperatuur",position:"asend",hvac_mode:"töörežiim",preset:"eelseadistus"},Xe={camera:"kaamerad",climate:"kliimaseade",cover:"(akna)katted",fan:"ventilaatorid",group:"grupid",input_boolean:"binaarsisestus",input_number:"arvsisestus",input_select:"sisendivalik",light:"valgustid",media_player:"media players",scene:"stseenid",switch:"lülitid",vacuum:"tolmuimejad"},et={tomorrow:"homme",daily:"iga päev",daily_except_days:"iga päev välja arvatud {days}",working_days:"tööpäevadel",weekend:"nädalavahetusel",interval:"{startDay} kuni {endDay}"},tt={absolute:"kell {time}",relative:"{time} pärast",interval:"alates {startTime} kuni {endTime}",seconds:"{seconds} sekundit",hour:"1 tund",hours:"{hours} tundi",minute:"1 minut",minutes:"{minutes} minutit",now:"kohe",midnight:"keskööl",noon:"keskpäeval",at_sun_event:"{sunEvent}",sun_event_sunrise:"päikesetõusu",sun_event_sunset:"loojangut"},rt={one_additional_task:"veel 1 ajastus",x_additional_tasks:"{count} ajastust"},it={scheduler:"Ajastaja",actions:Ge,instructions:Qe,fields:Be,days_short:Ke,days_long:We,words:Ye,services:Je,service_parameters:Ze,domains:Xe,days:et,time:tt,misc:rt},at=Object.freeze({__proto__:null,scheduler:"Ajastaja",actions:Ge,instructions:Qe,fields:Be,days_short:Ke,days_long:We,words:Ye,services:Je,service_parameters:Ze,domains:Xe,days:et,time:tt,misc:rt,default:it}),st={add:"ajouter un item",cancel:"annuler",next:"suivant",save:"sauvegarder",delete:"effacer"},nt={no_group_selected:"Sélectionner un groupe en premier",no_entity_selected:"Sélectionner une entité en premier",no_groups_defined:"Il n'y a pas de groupe défini",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_actions_for_entity:"Il n'y a pas d'action pour cette entité",no_entries_defined:"Il n'y a pas d'item à afficher"},ot={group:"Groupe",entity:"Entité",action:"Action",days:"Jours",time:"Temps",options:"Options",day_type_daily:"chaque jour",day_type_weekdays:"en semaine",day_type_custom:"sur mesure",shift_with_sun:"ajuster automatiquement l'heure au lever/coucher du soleil",brightness:"Luminosité",temperature:"Température",position:"Position"},lt={mon:"lun",tue:"mar",wed:"mer",thu:"jeu",fri:"ven",sat:"sam",sun:"dim"},ct={mon:"lundi",tue:"mardi",wed:"mercredi",thu:"jeudi",fri:"vendredi",sat:"samedi",sun:"dimanche"},dt={on:"marche",every:"tout",and:"et",at:"à",before:"avant",after:"après",sunrise:"lever du soleil",sunset:"coucher du soleil"},ut={turn_on:"allumer",turn_off:"éteindre",close_cover:"fermer",open_cover:"ouvrir",set_temperature:"régler la température",set_to:"défini à",set_position:"position définie",set_hvac_mode:"set mode",set_preset_mode:"set preset",set_value:"set value",select_option:"select option",select_source:"select source",start:"start"},ht={camera:"cameras",climate:"climat",cover:"contrôleur",fan:"ventilateur",group:"groups",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"lumière",media_player:"media players",scene:"scenes",switch:"interrupteurs",vacuum:"aspirateur"},pt={scheduler:"Planificateur",actions:st,instructions:nt,fields:ot,days_short:lt,days_long:ct,words:dt,services:ut,domains:ht},mt=Object.freeze({__proto__:null,scheduler:"Planificateur",actions:st,instructions:nt,fields:ot,days_short:lt,days_long:ct,words:dt,services:ut,domains:ht,default:pt}),vt={add:"új időzítés",cancel:"mégse",next:"tovább",save:"mentés",delete:"törlés"},ft={no_group_selected:"Előbb egy csoportot szükséges választani",no_entity_selected:"Előbb egy entitást szükséges választani",no_groups_defined:"Nincsenek deffiniált csoportok",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",no_entries_defined:"Nincs megjeleníthető elem"},gt={group:"Csoport",entity:"Entitás",action:"Művelet",days:"Napokon",time:"Időpontban",options:"Opciók",day_type_daily:"minden nap",day_type_workday:"munkanapokon",day_type_weekend:"hétvégén",day_type_custom:"egyedi"},yt={mon:"hét",tue:"ked",wed:"sze",thu:"csü",fri:"pén",sat:"szo",sun:"vas"},_t={mon:"hétfő",tue:"kedd",wed:"szerda",thu:"csütörtök",fri:"péntek",sat:"szombat",sun:"vasárnap"},bt={and:"és",before:"előtt",after:"után"},wt={turn_on:"bekapcsolás",turn_off:"kikapcsolás",close_cover:"zárás",open_cover:"nyitás",set_temperature:"hőmérséklet",set_to:"beállítva",set_position:"változtass pozíciót",set_hvac_mode:"mód beállítása",set_preset_mode:"preset beállítása",set_value:"érték beállítása",select_option:"opció kiválasztása",select_source:"forrás kiválasztása",start:"kezdés"},Pt={brightness:"világosság",temperature:"hőmérséklet",position:"pozíció",hvac_mode:"mód",preset:"preset"},Et={camera:"kamera",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",light:"lámpa",media_player:"lejátszó",scene:"jelenetek",switch:"kapcsoló",vacuum:"pórszívó"},St={tomorrow:"holnap",daily:"minden nap",daily_except_days:"minden nap, kivéve {days}",working_days:"munkanapokon",weekend:"hétvégén",interval:"{startDay} - {endDay}"},xt={absolute:"{time}-kor",relative:"{time} múlva",interval:"{startTime} - {endTime}",seconds:"{seconds} másodperc",hour:"1 óra",hours:"{hours} óra",minute:"1 perc",minutes:"{minutes} perc",now:"most",midnight:"éjfél",noon:"dél",at_sun_event:"{sunEvent}kor",sun_event_sunrise:"napfelkelte",sun_event_sunset:"napnyugta"},$t={one_additional_task:"még egy feladat",x_additional_tasks:"még {count} feladat"},kt={scheduler:"Időzítések",actions:vt,instructions:ft,fields:gt,days_short:yt,days_long:_t,words:bt,services:wt,service_parameters:Pt,domains:Et,days:St,time:xt,misc:$t},Ot=Object.freeze({__proto__:null,scheduler:"Időzítések",actions:vt,instructions:ft,fields:gt,days_short:yt,days_long:_t,words:bt,services:wt,service_parameters:Pt,domains:Et,days:St,time:xt,misc:$t,default:kt}),jt={add:"aggiungi oggetto",cancel:"annulla",next:"avanti",save:"salva",delete:"cancella"},Ct={no_group_selected:"Seleziona prima un gruppo",no_entity_selected:"Seleziona prima un'entità",no_groups_defined:"Non ci sono gruppi definiti",no_entities_for_group:"Non ci sono entità in questo gruppo",no_actions_for_entity:"Non ci sono azioni per questa entità",no_entries_defined:"Non ci sono oggetti da visualizzare"},Dt={group:"Gruppo",entity:"Entità",action:"Azione",days:"Giorni",time:"Ora",options:"Opzioni",day_type_daily:"giornaliero",day_type_workday:"giorni lavorativi",day_type_weekend:"weekend",day_type_custom:"personalizzato"},At={mon:"lun",tue:"mar",wed:"mer",thu:"gio",fri:"ven",sat:"sab",sun:"dom"},Tt={mon:"Lunedì",tue:"Martedì",wed:"Mercoledì",thu:"Giovedì",fri:"Venerdì",sat:"Sabato",sun:"Domenica"},Ft={and:"e",before:"prima",after:"dopo"},zt={turn_on:"accendi",turn_off:"spegni",close_cover:"chiudi",open_cover:"apri",set_temperature:"imposta temperatura",set_to:"imposta a",set_position:"imposta posizione",set_hvac_mode:"imposta modalità",set_preset_mode:"imposta programmazione",set_value:"imposta valore",select_option:"seleziona opzione",select_source:"seleziona sorgente",start:"start"},Nt={brightness:"luminosità",temperature:"temperatura",position:"posizione",hvac_mode:"modalità",preset:"programmazione"},Rt={camera:"telecamere",climate:"clima",cover:"cover",fan:"ventole",group:"gruppi",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"luci",media_player:"media player",scene:"scene",switch:"interruttori",vacuum:"aspirapolveri"},It={tomorrow:"domani",daily:"giornaliero",daily_except_days:"tutti i giorni eccetto {giorni}",working_days:"giorni lavorativi",weekend:"weekend",interval:"{giornoInizio} a {giornoFine}"},Mt={absolute:"alle {ora}",relative:"entro {ora}",interval:"dalle {oraInizio} alle {oraFine}",seconds:"{secondi} second1",hour:"1 ora",hours:"{ore} ore",minute:"1 minuto",minutes:"{minuti} minuti",now:"ora",midnight:"mezzanotte",noon:"noon",at_sun_event:"all' {eventoSole}",sun_event_sunrise:"alba",sun_event_sunset:"tramonto"},Lt={one_additional_task:"1 altro task",x_additional_tasks:"{contatore} altri task"},Ut={scheduler:"Schedulatore",actions:jt,instructions:Ct,fields:Dt,days_short:At,days_long:Tt,words:Ft,services:zt,service_parameters:Nt,domains:Rt,days:It,time:Mt,misc:Lt},Vt=Object.freeze({__proto__:null,scheduler:"Schedulatore",actions:jt,instructions:Ct,fields:Dt,days_short:At,days_long:Tt,words:Ft,services:zt,service_parameters:Nt,domains:Rt,days:It,time:Mt,misc:Lt,default:Ut}),qt={add:"Nieuw item",cancel:"annuleren",next:"verder",save:"opslaan",delete:"verwijder"},Ht={no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",no_entries_defined:"Er zijn geen items aangemaakt"},Gt={group:"Groep",entity:"Entiteit",action:"Actie",days:"Dagen",time:"Tijdstip",options:"Opties",day_type_daily:"dagelijks",day_type_workday:"werkdagen",day_type_weekend:"weekend",day_type_custom:"anders"},Qt={mon:"ma",tue:"di",wed:"wo",thu:"do",fri:"vr",sat:"za",sun:"zo"},Bt={mon:"maandag",tue:"dinsdag",wed:"woensdag",thu:"donderdag",fri:"vrijdag",sat:"zaterdag",sun:"zondag"},Kt={and:"en",before:"voor",after:"na"},Wt={turn_on:"aanzetten",turn_off:"uitzetten",close_cover:"sluiten",open_cover:"openen",set_temperature:"temperatuur instellen",set_to:"Zet op",set_position:"positie instellen",set_hvac_mode:"stand aanpassen",set_preset_mode:"voorinstelling kiezen",set_value:"waarde instellen",select_option:"optie selecteren",select_source:"ingang selecteren",start:"starten"},Yt={brightness:"helderheid",temperature:"temperatuur",position:"positie",hvac_mode:"stand",preset:"voorinstelling"},Jt={camera:"cameras",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"verlichting",media_player:"mediaspelers",scene:"scènes",switch:"schakelaars",vacuum:"stofzuigers"},Zt={tomorrow:"morgen",daily:"dagelijks",daily_except_days:"elke dag behalve {days}",working_days:"op werkdagen",weekend:"in het weekend",interval:"{startDay} t/m {endDay}"},Xt={absolute:"om {time}",relative:"over {time}",interval:"van {startTime} tot {endTime}",seconds:"{seconds} seconden",hour:"1 uur",hours:"{hours} uur",minute:"1 minuut",minutes:"{minutes} minuten",now:"nu",midnight:"middernacht",noon:"12 uur",at_sun_event:"bij {sunEvent}",sun_event_sunrise:"zonsopgang",sun_event_sunset:"zonsondergang"},er={one_additional_task:"1 overige taak",x_additional_tasks:"{count} overige taken"},tr={scheduler:"Tijdplanner",actions:qt,instructions:Ht,fields:Gt,days_short:Qt,days_long:Bt,words:Kt,services:Wt,service_parameters:Yt,domains:Jt,days:Zt,time:Xt,misc:er},rr=Object.freeze({__proto__:null,scheduler:"Tijdplanner",actions:qt,instructions:Ht,fields:Gt,days_short:Qt,days_long:Bt,words:Kt,services:Wt,service_parameters:Yt,domains:Jt,days:Zt,time:Xt,misc:er,default:tr}),ir={add:"legg til",cancel:"avbryt",next:"neste",save:"lagre",delete:"slett"},ar={no_group_selected:"Velg en gruppe først",no_entity_selected:"Velg en entitet først",no_groups_defined:"Ingen grupper definert",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",no_entries_defined:"Det er ingen definerte tidsplaner å vise"},sr={group:"Gruppe",entity:"Entitet",action:"Handling",days:"Dager",time:"Tid",options:"Valg",day_type_daily:"hver dag",day_type_weekdays:"ukedager",day_type_custom:"egendefinert",shift_with_sun:"automatisk juster tid for soloppgang/solnedgang",brightness:"Lysstyrke",temperature:"Temperatur",position:"Posisjon"},nr={mon:"man",tue:"tir",wed:"ons",thu:"tor",fri:"fre",sat:"lør",sun:"søn"},or={mon:"mandag",tue:"tirsdag",wed:"onsdag",thu:"torsdag",fri:"fredag",sat:"lørdag",sun:"søndag"},lr={on:"den",every:"hver",and:"og",at:"på",before:"før",after:"etter",sunrise:"soloppgang",sunset:"solnedgang"},cr={turn_on:"slå på",turn_off:"slå av",close_cover:"lukk",open_cover:"åpne",set_temperature:"sett temperatur",set_to:"sett til",set_position:"sett posisjon",set_hvac_mode:"set mode",set_preset_mode:"set preset",set_value:"set value",select_option:"select option",select_source:"select source",start:"start"},dr={camera:"cameras",climate:"klima",cover:"cover",fan:"vifter",group:"groups",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",media_player:"media players",scene:"scenes",light:"lys",switch:"brytere",vacuum:"støvsugere"},ur={scheduler:"Tidsplan",actions:ir,instructions:ar,fields:sr,days_short:nr,days_long:or,words:lr,services:cr,domains:dr},hr=Object.freeze({__proto__:null,scheduler:"Tidsplan",actions:ir,instructions:ar,fields:sr,days_short:nr,days_long:or,words:lr,services:cr,domains:dr,default:ur}),pr={add:"dodaj",cancel:"anuluj",next:"dalej",save:"zapisz",delete:"usuń"},mr={no_group_selected:"Najpierw wybierz grupę",no_entity_selected:"Najpierw wybierz encję",no_groups_defined:"Nie ma zdefiniowanych grup",no_entities_for_group:"Nie ma encji w tej grupie",no_actions_for_entity:"Nie ma akcji dla tej encji",no_entries_defined:"Nie ma elementów do pokazania"},vr={group:"Grupa",entity:"Encja",action:"Akcja",days:"Dni",time:"Czas",options:"Opcje",day_type_daily:"codziennie",day_type_weekdays:"dni tygodnia",day_type_custom:"niestandardowy",shift_with_sun:"automatycznie dopasuj czas do wschodów/zachodów",brightness:"Jasność",temperature:"Temperatura",position:"Pozycję"},fr={mon:"pon",tue:"wt",wed:"śr",thu:"czw",fri:"pt",sat:"sob",sun:"niedz"},gr={mon:"poniedziałek",tue:"wtorek",wed:"środa",thu:"czwartek",fri:"piątek",sat:"sobota",sun:"niedziela"},yr={on:"w",every:"każdy",and:"oraz",at:"o",before:"przed",after:"po",sunrise:"wschód",sunset:"zachodów"},_r={turn_on:"włącz",turn_off:"wyłącz",close_cover:"zamknij",open_cover:"otwórz",set_temperature:"Ustaw temperaturę",set_to:"ustaw na",set_position:"Ustaw pozycję",set_hvac_mode:"set mode",set_preset_mode:"set preset",set_value:"set value",select_option:"select option",select_source:"select source",start:"start"},br={camera:"cameras",climate:"termostat",cover:"roleta",fan:"wiatrak",group:"groups",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",media_player:"media players",scene:"scenes",light:"światło",switch:"włącznik",vacuum:"odkurzacz"},wr={scheduler:"Harmonogram",actions:pr,instructions:mr,fields:vr,days_short:fr,days_long:gr,words:yr,services:_r,domains:br},Pr=Object.freeze({__proto__:null,scheduler:"Harmonogram",actions:pr,instructions:mr,fields:vr,days_short:fr,days_long:gr,words:yr,services:_r,domains:br,default:wr}),Er={add:"adicionar item",cancel:"cancelar",next:"próximo",save:"gravar",delete:"apagar"},Sr={no_group_selected:"Selecione um grupo primeiro",no_entity_selected:"Selecione uma entidade primeiro",no_groups_defined:"Não tem grupo definido",no_entities_for_group:"Não tem entidade no grupo",no_actions_for_entity:"Não há ações para esta entidade",no_entries_defined:"Não tem item pra mostar"},xr={group:"Grupo",entity:"Entidade",action:"Ação",days:"Dias",time:"Hora",options:"Opções",day_type_daily:"todos os dias",day_type_weekdays:"dias da semana",day_type_custom:"personalizado",shift_with_sun:"automaticamente ajusta hora pelo nascer do sol/pôr do sol",brightness:"Brilho",temperature:"Temperatura",position:"Posição"},$r={mon:"seg",tue:"ter",wed:"qua",thu:"qui",fri:"sex",sat:"sab",sun:"dom"},kr={mon:"segunda",tue:"terça",wed:"quarta",thu:"quinta",fri:"sexta",sat:"sabádo",sun:"domingo"},Or={on:"on",every:"cada",and:"e",at:"às",before:"antes",after:"depois",sunrise:"nascer do sol",sunset:"pôr do sol"},jr={turn_on:"ligar",turn_off:"desligar",close_cover:"fechar",open_cover:"abrir",set_temperature:"ajustar temperatura",set_to:"ajustar para",set_position:"ajustar posição",set_hvac_mode:"set mode",set_preset_mode:"set preset",set_value:"set value",select_option:"select option",select_source:"select source",start:"start"},Cr={camera:"cameras",climate:"ar condicionado",cover:"persiana",fan:"ventilador",group:"groups",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",media_player:"media players",scene:"scenes",light:"luz",switch:"interruptor",vacuum:"aspirador"},Dr={scheduler:"Agenda",actions:Er,instructions:Sr,fields:xr,days_short:$r,days_long:kr,words:Or,services:jr,domains:Cr},Ar=Object.freeze({__proto__:null,scheduler:"Agenda",actions:Er,instructions:Sr,fields:xr,days_short:$r,days_long:kr,words:Or,services:jr,domains:Cr,default:Dr}),Tr={add:"adaugă element",cancel:"abandon",next:"următorul",save:"salvează",delete:"șterge"},Fr={no_group_selected:"Prima dată selectați un grup",no_entity_selected:"Prima dată selectați o entitate",no_groups_defined:"Nu există grupuri definite",no_entities_for_group:"Nu există entități definite în acest grup",no_actions_for_entity:"Nu există acțiuni pentru această entitate",no_entries_defined:"Nu există elemente de afișat",no_timeslot_selected:"Prima dată selectați un interval orar"},zr={group:"Grup",entity:"Entitate",action:"Acțiune",days:"Zile",time:"Timp",options:"Opțiuni",day_type_daily:"zilnic",day_type_workday:"zile lucrătoare",day_type_weekend:"sfârșit de săptămână",day_type_custom:"personalizat"},Nr={mon:"lun",tue:"mar",wed:"mie",thu:"joi",fri:"vin",sat:"sâm",sun:"dum"},Rr={mon:"Luni",tue:"Marți",wed:"Miercuri",thu:"Joi",fri:"Vineri",sat:"Sâmbătă",sun:"Duminică"},Ir={and:"și",or:"sau",before:"înainte",after:"după"},Mr={turn_on:"pornire",turn_off:"oprire",close_cover:"închidere",open_cover:"deschidere",set_temperature:"setare temperatură",set_to:"setare la",set_position:"setare poziție",set_hvac_mode:"setare mod",set_preset_mode:"setare preset",set_value:"setare valoare",select_option:"selectare opțiune",select_source:"selectare sursă",start:"start"},Lr={brightness:"intensitate luminoasă",temperature:"temperatură",position:"poziție",hvac_mode:"mod",preset:"preset"},Ur={camera:"camere",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"lumini",media_player:"media playere",scene:"scene",switch:"întrerupătpare",vacuum:"aspiratoare"},Vr={tomorrow:"mâine",daily:"zilnic",daily_except_days:"zilnic cu excepția {days}",working_days:"zile lucrătoare",weekend:"sfârșit de săptămână",interval:"{startDay} până la {endDay}"},qr={absolute:"la {time}",relative:"în {time}",interval:"de la {startTime} la {endTime}",seconds:"{seconds} secunde",hour:"1 oră",hours:"{hours} ore",minute:"1 minut",minutes:"{minutes} minute",now:"acum",midnight:"miezul nopții",noon:"amiază",at_sun_event:"la {sunEvent}",sun_event_sunrise:"răsărit",sun_event_sunset:"apus"},Hr={one_additional_task:"încă o sarcină",x_additional_tasks:"încă {count} sarcini"},Gr={scheduler:"Planificator",actions:Tr,instructions:Fr,fields:zr,days_short:Nr,days_long:Rr,words:Ir,services:Mr,service_parameters:Lr,domains:Ur,days:Vr,time:qr,misc:Hr},Qr={add:"добавить",cancel:"отменить",next:"далее",save:"сохранить",delete:"удалить"},Br={no_group_selected:"Необходимо выбрать группу",no_entity_selected:"Необходимо выбрать объект",no_groups_defined:"Ни одной группы не создано",no_entities_for_group:"В этой группе нет объектов",no_actions_for_entity:"Для этого объекта нет действий",no_entries_defined:"Объекты отсутствуют"},Kr={group:"Группа",entity:"Объект",action:"Действие",days:"Дни",time:"Время",options:"Опции",day_type_daily:"ежедневно",day_type_weekdays:"по будням",day_type_custom:"выбрать дни",shift_with_sun:"автоматически настраивать время на восход / закат",brightness:"Яркость",temperature:"Температура",position:"Позицию"},Wr={mon:"пн",tue:"вт",wed:"ср",thu:"чт",fri:"пт",sat:"сб",sun:"вс"},Yr={mon:"понедельник",tue:"вторник",wed:"среда",thu:"четверг",fri:"пятница",sat:"суббота",sun:"воскресенье"},Jr={on:"по",every:"каждый",and:"и",at:"в",before:"до",after:"после",sunrise:"восхода",sunset:"заката"},Zr={turn_on:"включить",turn_off:"выключить",close_cover:"закрыть",open_cover:"открыть",set_temperature:"задать температуру",set_to:"установить",set_position:"установить позицию",set_hvac_mode:"установить режим",set_preset_mode:"выбрать набор настроек",set_value:"установить значение",select_option:"выбрать вариант",select_source:"выбрать источник",start:"запуск"},Xr={camera:"Камеры",climate:"Климат",cover:"Жалюзи",fan:"Вентиляторы",group:"Группы",input_boolean:"Переключатели",input_number:"Числа",input_select:"Списки",media_player:"Медиаплееры",scene:"Сцены",light:"Освещение",switch:"Выключатели",vacuum:"Пылесосы"},ei={scheduler:"Планирование",actions:Qr,instructions:Br,fields:Kr,days_short:Wr,days_long:Yr,words:Jr,services:Zr,domains:Xr},ti={de:be,en:Fe,es:He,et:at,es_419:He,fr:mt,hu:Ot,it:Vt,nb:hr,nl:rr,nn:hr,no:hr,pl:Pr,pt:Ar,pt_BR:Ar,ro:Object.freeze({__proto__:null,scheduler:"Planificator",actions:Tr,instructions:Fr,fields:zr,days_short:Nr,days_long:Rr,words:Ir,services:Mr,service_parameters:Lr,domains:Ur,days:Vr,time:qr,misc:Hr,default:Gr}),ru:Object.freeze({__proto__:null,scheduler:"Планирование",actions:Qr,instructions:Br,fields:Kr,days_short:Wr,days_long:Yr,words:Jr,services:Zr,domains:Xr,default:ei})};function ri(e,t="",r=""){const i=ii();var a;try{if("test"==i)return"TRANSLATED";a=e.split(".").reduce((e,t)=>e[t],ti[i])}catch(t){a=e.split(".").reduce((e,t)=>e[t],ti.en)}if(void 0===a&&(a=e.split(".").reduce((e,t)=>e[t],ti.en)),""!==t&&""!==r)if(Array.isArray(t)||Array.isArray(r))for(var s=0;s<t.length;s++)a=a.replace(t[s],r[s]);else a=a.replace(t,r);return a}function ii(){var e;let t=null===(e=localStorage.getItem("selectedLanguage"))||void 0===e?void 0:e.replace(/['"]+/g,"").replace("-","_");if(!t||"null"==t){const e=document.querySelector("home-assistant").hass;t=e.selectedLanguage||e.language||"en"}return String(t)}const ai={turn_on:"services.turn_on",turn_off:"services.turn_off",open_cover:"services.open_cover",close_cover:"services.close_cover",set_temperature:"services.set_temperature",set_cover_position:"services.set_position",set_hvac_mode:"services.set_hvac_mode",set_preset_mode:"services.set_preset_mode",set_value:"services.set_value",select_option:"services.select_option",select_source:"services.select_source",start:"services.start"},si={camera:"domains.camera",climate:"domains.climate",cover:"domains.cover",fan:"domains.fan",group:"domains.group",input_boolean:"domains.input_boolean",input_number:"domains.input_number",input_select:"domains.input_select",light:"domains.light",media_player:"domains.media_player",scene:"domains.scene",switch:"domains.switch",vacuum:"domains.vacuum"},ni={brightness:"service_parameters.brightness",position:"service_parameters.position",temperature:"service_parameters.temperature",hvac_mode:"service_parameters.hvac_mode",preset:"service_parameters.preset"};var oi,li;function ci(e,t){let r=e>=0?Math.floor(e/60):Math.ceil(e/60),i=e-60*r;return i%t!=0&&(i=Math.round(i/t)*t),i>=60&&(r++,i-=60),r>=24&&(r-=24),60*r+i}function di(e,t={}){let r=!!t.amPm&&t.amPm,i=!!t.absolute&&t.absolute;e>=1440&&(e-=1440);let a=e>=0?Math.floor(e/60):Math.ceil(e/60),s=e-60*a,n="";r&&(n=a>=12?"PM":"AM",(a>12||12==a&&s>0)&&(a-=12));let o=String(Math.abs(a)).padStart(2,"0"),l=String(Math.abs(s)).padStart(2,"0"),c=a<0||s<0;return{hours:o,minutes:l,time:`${c&&!i?"-":""}${o}:${l}${r?" "+n:""}`,signed:c,amPm:n}}function ui(e,t={}){let r=t.stepSize?t.stepSize:1,i=!!t.signed&&t.signed,a=t.max?t.max:1440,s=ci(e,r);return s<0&&!i?e+=1440:s>=1440&&(e-=1440),s<-a?-a:s>a?a:e}function hi(e){let t,r,i;if(null!==(i=/^([0-9]{2}):([0-9]{2})$/.exec(e)))[t,r]=[Number(i[1]),Number(i[2])];else if(null!==(i=/^([0-9]{2})([0-9]{2})$/.exec(e)))[t,r]=[Number(i[1]),Number(i[2])];else{if(null!==(i=/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[\+|\-][0-9]{2}:[0-9]{2}$/.exec(e))){let e=new Date(i[0]);return hi(`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`)}console.log(`failed to parse timestamp '${e}'`)}return 60*t+r}function pi(e){return e.type==li.Daily?[1,2,3,4,5,6,7]:e.type==li.Workday?[1,2,3,4,5]:e.type==li.Weekend?[6,7]:e.type==li.Custom?e.custom_days:[]}function mi(e){return e==oi.Sunrise?"sunrise":"sunset"}function vi(e){switch(e){case 1:return ri("days_long.mon");case 2:return ri("days_long.tue");case 3:return ri("days_long.wed");case 4:return ri("days_long.thu");case 5:return ri("days_long.fri");case 6:return ri("days_long.sat");case 7:return ri("days_long.sun");default:return""}}function fi(e){let t=e.getDay();return 0==t&&(t=7),t}function gi(e){if(e){let t=new Date(e),r=new Date,i=(t.valueOf()-r.valueOf())/1e3;return Math.round(i)}return null}!function(e){e.Sunrise="SUNRISE",e.Sunset="SUNSET"}(oi||(oi={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(li||(li={}));const yi={sunrise:null,sunset:null,title:!0,am_pm:!1,time_step:10,temperature_unit:"",is_admin:!0},_i={time:{value:hi("12:00")},days:{type:li.Daily},action:"",entity:""},bi=[{time:{value:hi("00:00")},endTime:{value:hi("08:00")},days:{type:li.Daily},action:"",entity:""},{time:{value:hi("08:00")},endTime:{value:hi("16:00")},days:{type:li.Daily},action:"",entity:""},{time:{value:hi("16:00")},endTime:{value:1440},days:{type:li.Daily},action:"",entity:""}],wi={type:ae.Level,field:"",unit:"",name:"level",min:0,max:255,step:1,optional:!1},Pi={type:ae.List,field:"",name:"option",options:[]},Ei=[{id:1,name:ri("days_short.mon")},{id:2,name:ri("days_short.tue")},{id:3,name:ri("days_short.wed")},{id:4,name:ri("days_short.thu")},{id:5,name:ri("days_short.fri")},{id:6,name:ri("days_short.sat")},{id:7,name:ri("days_short.sun")}],Si=[{id:li.Daily,name:ri("fields.day_type_daily")},{id:li.Workday,name:ri("fields.day_type_workday")},{id:li.Weekend,name:ri("fields.day_type_weekend")},{id:li.Custom,name:ri("fields.day_type_custom")}];var xi;function $i(e,t,r={}){let i=Array.isArray(e)?[...e]:Object.assign({},e);return null===e&&(i=Array.isArray(t)?[]:{}),null==t?e:(Object.keys(t).forEach(e=>{let a=t[e];if(void 0!==a)if(null===a&&r.compact)void 0!==i[e]&&delete i[e];else if(Array.isArray(a)&&Array.isArray(i[e])&&!r.overwrite?a=$i(i[e],a,r):"object"!=typeof a||null===a||"object"!=typeof i[e]||r.overwrite||(a=$i(i[e],a,r)),Array.isArray(t))null!==a&&(r.overwrite?i=a:i.push(a));else{if((Array.isArray(a)||"object"==typeof a)&&null!==a&&!Object.keys(a).length&&r.compact)return void delete i[e];Object.assign(i,{[e]:a})}}),i)}function ki(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,r])=>Object.assign(e,{[t]:r}),{}):{}}function Oi(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,r])=>Object.assign(e,{[t]:r}),{}):{}}function ji(e,t){return Object.entries(e).map(([e,r])=>[e,t(r,e)]).filter(([,e])=>null!=e).reduce((e,[t,r])=>Object.assign(e,{[t]:r}),{})}function Ci(e,t){return e.reduce((e,r)=>Object.assign(e,{[t(r)]:r}),{})}function Di(e){if(-1===e.indexOf("."))return"";return String(e.split(".").shift())}function Ai(e){if(-1===e.indexOf("."))return e;return String(e.split(".").pop())}function Ti(e){return"string"!=typeof e&&(e=String(e)),Ni(e.replace(/_/g," "))}function Fi(e){return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"hass:"+e}function zi(e,t,r){if(e.type==ae.Level){let i="unit"in(t=t)?t.unit:"";i.length||"temperature"!=t.field||(i=r.temperature_unit);let a=Number(e.value);return"%"==t.unit&&(a=Math.round((a-t.min)/(t.max-t.min)*100),a<t.min?a=t.min:a>t.max&&(a=t.max)),`${a}${i}`}return Ti(String(e.value))}function Ni(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Ri(e,t){if(Array.isArray(e)&&Array.isArray(t)){let i=[...e].sort(),a=[...t].sort();if(i.length!=i.length)return!1;for(var r=0;r<i.length;r++)if(i[r]!==a[r])return!1;return!0}if("object"==typeof e&&"object"==typeof t){let r=Object.assign({},e),i=Object.assign({},t);const a=Object.keys(r),s=Object.keys(i);if(a.length!==s.length)return!1;for(const e of a){const t=r[e],a=i[e],s="object"==typeof t&&"object"==typeof a&&null!==t&&null!==a;if(s&&!Ri(t,a)||!s&&t!==a)return!1}return!0}return!1}function Ii(e,t){let r=!1;if(e.match(/^[a-z0-9_\.]+$/))r=e.includes(".")?e==t:e==Di(t);else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`),r=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return r}!function(e){e.Overview="OVERVIEW",e.NewSchedule="NEW_SCHEDULE",e.TimePicker="TIME_PICKER",e.TimeScheme="TIME_SCHEME",e.Options="OPTIONS"}(xi||(xi={}));var Mi={alarm_control_panel:{icon:"alarm-light-outline",actions:[{service:"alarm_arm_home",name:"arm home",icon:"home-outline",supported_feature:1},{service:"alarm_arm_away",name:"arm away",icon:"exit-run",supported_feature:2},{service:"alarm_arm_night",name:"arm night",icon:"power-sleep",supported_feature:4},{service:"alarm_arm_custom_bypass",name:"arm custom bypass",icon:"shield-lock-outline",supported_feature:8},{service:"alarm_disarm",name:"disarm",icon:"lock-open-variant-outline"}],states:["disarmed","armed_away","armed_home","armed_night"]},binary_sensor:{icon:"eye",states:["on","off"]},camera:{icon:"camera"},climate:{icon:"home-thermometer-outline",actions:[{service:"turn_off",icon:"thermometer-off"},{service:"set_temperature",icon:"thermometer",supported_feature:1,variable:{field:"temperature",min:"attribute:min_temp",max:"attribute:max_temp",step:.5}},{service:"set_hvac_mode",icon:"cog-transfer-outline",variable:{field:"hvac_mode",options:[{value:"attribute:hvac_modes:auto",icon:"autorenew"},{value:"attribute:hvac_modes:off",icon:"power"},{value:"attribute:hvac_modes:cool",icon:"snowflake"},{value:"attribute:hvac_modes:heat",icon:"fire"},{value:"attribute:hvac_modes:dry",icon:"water-percent"},{value:"attribute:hvac_modes:fan_only",icon:"fan"}]}},{service:"set_preset_mode",icon:"cloud-download-outline",supported_feature:16,variable:{field:"preset_mode",options:[{value:"attribute:preset_modes:none",icon:"account-outline"},{value:"attribute:preset_modes:eco",icon:"leaf"},{value:"attribute:preset_modes:away",icon:"car-traction-control"},{value:"attribute:preset_modes:boost",icon:"rocket-launch-outline"},{value:"attribute:preset_modes:comfort",icon:"car-seat-cooler"},{value:"attribute:preset_modes:home",icon:"home-outline"},{value:"attribute:preset_modes:sleep",icon:"sleep"},{value:"attribute:preset_modes:activity",icon:"motion-sensor"}]}}]},cover:{icon:"window-shutter",actions:[{service:"open_cover",icon:"window-shutter-open"},{service:"close_cover",icon:"window-shutter"},{service:"set_cover_position",icon:"window-shutter",supported_feature:4,variable:{field:"position",unit:"%",min:0,max:100}}],states:["open","closed"]},fan:{icon:"fan",actions:[{service:"turn_on",icon:"fan"},{service:"turn_off",icon:"fan-off"},{service:"set_speed",supported_feature:1,variable:{field:"speed",options:"attribute:speed_list"}},{service:"oscillate",icon:"arrow-left-right",supported_feature:2,variable:{field:"oscillating",options:[{value:"True"},{value:"False"}]}},{service:"set_direction",icon:"autorenew",supported_feature:4,variable:{field:"direction",options:[{value:"forward",icon:"rotate-right"},{value:"reverse",icon:"rotate-left"}]}}]},humidifier:{icon:"air-humidifier",actions:[{service:"set_humidity",icon:"water-percent",variable:{field:"humidity",min:"attribute:min_humidity",max:"attribute:max_humidity",unit:"%",step:1}},{service:"turn_on",icon:"air-humidifier"},{service:"turn_off",icon:"air-humidifier-off"},{service:"set_mode",icon:"cog-transfer-outline",supported_feature:1,variable:{field:"mode",options:[{value:"attribute:available_modes:normal",icon:"account-outline"},{value:"attribute:available_modes:eco",icon:"leaf"},{value:"attribute:available_modes:away",icon:"car-traction-control"},{value:"attribute:available_modes:boost",icon:"rocket-launch-outline"},{value:"attribute:available_modes:comfort",icon:"car-seat-cooler"},{value:"attribute:available_modes:home",icon:"home-outline"},{value:"attribute:available_modes:sleep",icon:"sleep"},{value:"attribute:available_modes:auto",icon:"autorenew"},{value:"attribute:available_modes:baby",icon:"baby-bottle-outline"}]}}]},group:{icon:"expand-all-outline"},input_boolean:{icon:"flash",condition:!0,actions:[{service:"turn_on",icon:"toggle-switch-outline"},{service:"turn_off",icon:"toggle-switch-off-outline"}]},input_number:{icon:"sort-numeric-variant",actions:[{service:"set_value",icon:"counter",variable:{field:"value",min:"attribute:min",max:"attribute:max",step:"attribute:step"}}]},input_select:{icon:"form-select",actions:[{service:"select_option",icon:"counter",variable:{field:"option",options:"attribute:options"}}]},light:{icon:"lightbulb-outline",actions:[{service:"turn_on",icon:"lightbulb-on-outline",variable:{field:"brightness",unit:"%",supported_feature:1,optional:!0}},{service:"turn_off",icon:"lightbulb-off-outline"}]},lock:{icon:"lock-open-outline",actions:[{service:"unlock",icon:"lock-open-variant-outline"},{service:"lock",icon:"lock-outline"}]},media_player:{icon:"speaker",actions:[{service:"turn_on",icon:"power",supported_feature:128},{service:"turn_off",icon:"power-off",supported_feature:256},{service:"select_source",icon:"music-box-multiple-outline",supported_feature:2048,variable:{field:"source",options:"attribute:source_list"}}]},person:{icon:"account-outline",states:["home","not_home"]},scene:{icon:"lightbulb-group-outline",actions:[{service:"turn_on",icon:"play"}]},script:{icon:"script-text",actions:[{service:"turn_on",icon:"power"},{service:"turn_off",icon:"power-off"},{service:"attribute:entity_id",icon:"play",name:"run"}]},sensor:{icon:"eye"},switch:{icon:"flash",actions:[{service:"turn_on",icon:"toggle-switch-outline"},{service:"turn_off",icon:"toggle-switch-off-outline"}],states:["on","off"]},vacuum:{icon:"robot-vacuum",actions:[{service:"turn_on",icon:"power",supported_feature:1},{service:"start",icon:"play-circle-outline",supported_feature:8192},{service:"start_pause",icon:"play-circle-outline",supported_feature:4}]},water_heater:{icon:"water-boiler",actions:[{service:"set_temperature",icon:"thermometer",supported_feature:1,variable:{field:"temperature",min:"attribute:min_temp",max:"attribute:max_temp",step:.5}},{service:"set_operation_mode",icon:"cog-transfer-outline",variable:{field:"operation_mode",options:[{value:"attribute:operation_list:eco",icon:"leaf"},{value:"attribute:operation_list:electric",icon:"flash"},{value:"attribute:operation_list:performance",icon:"rocket-launch-outline"},{value:"attribute:operation_list:high_demand",icon:"water-plus-outline"},{value:"attribute:operation_list:heat_pump",icon:"pump"},{value:"attribute:operation_list:gas",icon:"flame"}]}},{service:"set_away_mode",icon:"car-traction-control",supported_feature:4,variable:{field:"mode",options:[{value:"on",icon:"toggle-switch-outline"},{value:"off",icon:"toggle-switch-off-outline"}]}}]}};function Li(e){let t={id:"",name:e.service in ai?ri(ai[e.service]):Ai(e.service),icon:"flash",service:"",routine:!1};return t=$i(t,e),t=$i(t,{id:Gi(t)}),t}function Ui(e,t){let r=Object.assign({},e),i=Di(t.entity_id);return Di(r.service)==i&&(r=$i(r,{service:Ai(r.service)})),r=ji(r,e=>Vi(e,t)),r=function(e,t){var r;if(e.supported_feature&&0==(t&e.supported_feature))return null;(null===(r=e.variable)||void 0===r?void 0:r.supported_feature)&&0==(t&e.variable.supported_feature)&&(e=$i(e,{variable:null},{compact:!0}));return e}(r,t.attributes.supported_features),(null==r?void 0:r.variable)&&(r=function(e,t){let r=Object.assign({},e),i=e.variable;i.name||(i=$i(i,{name:i.field}));if(i=ji(i,e=>Vi(e,t)),"options"in i){let e=[...i.options],a=Object.values(e).map(e=>"object"==typeof e?e.value.match(/^attribute:(\w+):\w+$/):null).find(e=>e);if(e=e.map(e=>"object"!=typeof e?{value:e}:$i(e,{value:Vi(e.value,t)})).filter(e=>e.value),a){let r=t.attributes[a[1]].filter(t=>Object.values(e).every(e=>e.value!=t)).map(e=>({value:e}));e=e.concat(r)}e.sort((e,t)=>(e.name?e.name:e.value)>(t.name?t.name:t.value)?1:-1),i=$i(i,{options:e},{overwrite:!0});let s=$i(Pi,i);r=$i(r,{variable:s},{overwrite:!0})}else{let e=$i(wi,i);r=$i(r,{variable:e})}return r}(r,t)),r}function Vi(e,t){if("string"!=typeof e)return e;let r=String(e).match(/^attribute:(\w+):?(\w+)?$/);return null===r?e:"entity_id"==r[1]?t.entity_id:r[1]in t.attributes?void 0!==r[2]?Array.isArray(t.attributes[r[1]])&&t.attributes[r[1]].includes(r[2])?r[2]:null:t.attributes[r[1]]:null}function qi(e){let t=e.entity,r=e.service,i=Di(t),a=Di(r);i&&a?i==a&&(r=Ai(r)):i||(t=a+"."+t,r=Ai(r));let s=Oi(e,["service","entity","service_data"]),n=$i({},{entity:t,service:r,service_data:Object.keys(s).length?s:null},{compact:!0});return n=$i(n,ki(e,["service_data"])),n}function Hi(e,t){let r=qi(e),i=t.find(e=>{let t=Gi(e);return e.service==r.service&&(t==Gi(r)||(e.variable&&r.service_data&&Object.keys(r.service_data).includes(e.variable.field)?t==Gi($i(r,{service_data:{[e.variable.field]:null}},{compact:!0})):t==Gi($i(r,{service_data:{entity_id:r.entity}}))))});return i||null}function Gi(e){let t=e=>Object.entries(e).sort((e,t)=>e[0]>t[0]?1:-1).map(([e,r])=>[e,"object"==typeof r&&null!==r?t(r):r]).reduce((e,[t,r])=>Object.assign(e,{[t]:r}),{}),r=ki(e,["service","service_data"]);return r=t(r),Object.values(r).map(e=>JSON.stringify(e).replace(/[\W]/g," ").split(" ").filter(e=>" "!=e&&""!=e).join("_")).join("_")}function Qi(e){return e.match(/^switch.schedule_[0-9a-f]{6}$/)}class Bi{constructor(){this.entities=[],this.include=[],this.exclude=[],this.customize={},this.standard_configuration=!0}SetConfig(e){this.standard_configuration=e.standard_configuration,this.include=e.include||[],this.exclude=e.exclude||[],this.customize=e.customize||{}}InConfig(e){return!Qi(e)&&(!!this.include.find(t=>Ii(t,e))&&!this.exclude.find(t=>Ii(t,e)))}Find(e){return this.entities.find(t=>t.id==e)}Get(e=[]){let t=[];if(e&&e.length){(Array.isArray(e)?e:[e]).filter(e=>void 0!==this.Find(e)).forEach(e=>t.push(Object.assign({},this.entities[e])))}else t=[...this.entities];return t.sort((e,t)=>e.name>t.name?1:-1),t}Add(e,t){if(this.Find(e))return;let r={id:e,name:Ai(e),icon:"folder-outline",actions:[]};r=$i(r,Oi(t,["actions"])),this.entities.push(r)}Set(e,t){if(!this.Find(e))throw`Entity '${e}' does not exist`;for(var r=0;r<this.entities.length;r++)if(this.entities[r].id==e){let e=this.entities[r];return Object.assign(e,t),void(this.entities[r]=e)}}GetConfig(e){var t;let r=e.entity_id,i=Di(r),a={actions:[]},s={},n={};return Mi[i]&&this.standard_configuration&&(a=$i(a,Oi(Mi[i],["actions"])),(null===(t=Mi[i])||void 0===t?void 0:t.actions)&&(s=$i(s,Ci(Mi[i].actions,Gi)))),a=$i(a,{name:e.attributes.friendly_name,icon:e.attributes.icon}),Object.entries(this.customize).forEach(([e,t])=>{Ii(e,r)&&(a=$i(a,Oi(t,["actions"])),t.actions&&(n=$i(n,Ci(t.actions,Gi))))}),Object.keys(n).length&&(s=$i(s,n)),a=$i(a,{actions:Object.values(s)}),a}AddAction(e,t){let r=this.Find(e);if(!r)throw Error(`Entity '${e}' must be created before actions can be assigned`);if(r.actions.find(e=>e.id==t.id))return;let i=[...r.actions];i.push(t),this.Set(e,{actions:i})}}function Ki(e){return e.toLowerCase().trim().replace(/\s+/g,"_").replace(/_+/g,"_")}class Wi{constructor(){this.groupConfig=[],this.groups=[],this.standard_configuration=!0}SetConfig(e){this.groupConfig=e.groups||[],this.standard_configuration=e.standard_configuration}Find(e){return this.groups.find(t=>t.id==e)}Get(){let e=[...this.groups].filter(e=>"discovered"!=e.id);return e.sort((e,t)=>e.name>t.name?1:-1),this.Find("discovered")&&e.push(Object.assign({},this.Find("discovered"))),e}Add(e,t){if(this.Find(e))return;let r={id:e,name:e in si?ri(si[e]):e,icon:"folder-outline",entities:[]};r=$i(r,t),this.groups.push(r)}Set(e,t){if(!this.Find(e))throw`Group '${e}' does not exist`;for(var r=0;r<this.groups.length;r++)if(this.groups[r].id==e){let e=this.groups[r];return Object.assign(e,t),void(this.groups[r]=e)}}GroupHasEntity(e,t){var r;let i=this.Find(e);if(!i)return!1;if(i.entities.includes(t))return!0;let a=this.groupConfig.find(t=>Ki(t.name)==e);return!!a&&(!!a.include.find(e=>Ii(e,t))&&!(null===(r=a.exclude)||void 0===r?void 0:r.find(e=>Ii(e,t))))}InConfig(e){return void 0!==this.groupConfig.find(t=>{var r;return!!t.include.find(t=>Ii(t,e))&&(!(null===(r=t.exclude)||void 0===r?void 0:r.find(t=>Ii(t,e)))&&!Qi(e))})}InGroup(e){return void 0!==this.groups.find(t=>t.entities.includes(e))}CreateGroups(e){this.groupConfig.forEach(e=>this.Add(Ki(e.name),ki(e,["name","icon"]))),e.forEach(e=>{var t,r;if(this.InConfig(e)||this.InGroup(e))return;let i=Di(e),a=this.Find(i);if(a){let t=[...a.entities];t.push(e),this.Set(i,{entities:t})}else{let a={entities:[e]};(null===(t=Mi[i])||void 0===t?void 0:t.icon)&&this.standard_configuration&&Object.assign(a,{icon:Mi[i].icon}),(null===(r=Mi[i])||void 0===r?void 0:r.states)&&this.standard_configuration&&Object.assign(a,{states:Mi[i].states}),this.Add(i,a)}})}}class Yi{constructor(){this.discover_existing=!0,this.standard_configuration=!0,this.entities=new Bi,this.groups=new Wi}setUserConfig(e){void 0!==e.discover_existing&&(this.discover_existing=e.discover_existing),void 0!==e.standard_configuration&&(this.standard_configuration=e.standard_configuration),this.entities.SetConfig({include:e.include,exclude:e.exclude,customize:e.customize,standard_configuration:this.standard_configuration}),this.groups.SetConfig({groups:e.groups,standard_configuration:this.standard_configuration})}GetGroups(e=!1){let t=this.groups.Get();return t=t.filter(t=>this.GetEntitiesForGroup(t.id,e).length>0),t}GetEntitiesForGroup(e,t=!1){if(!this.groups.Find(e))return[];let r=this.entities.Get().filter(t=>this.groups.GroupHasEntity(e,t.id));return r=t?r.filter(e=>void 0!==e.states):r.filter(e=>e.actions.length>0),r}FindEntity(e){if(!e)return null;let t=this.entities.Find(e);return t||null}FindAction(e,t){if(!e||!t)return null;let r=this.entities.Find(e);return r?r.actions.find(e=>e.id==t):null}GetActionsForEntity(e){if(!e)return[];let t=this.entities.Find(e);if(!t)return[];let r=[...t.actions];return r.sort((e,t)=>e.name>t.name?1:-1),r}GetEntityConfig(e){return this.entities.GetConfig(e)}LoadEntities(e){if(Object.keys(e).filter(e=>!!this.entities.InConfig(e)||!!this.groups.InConfig(e)).forEach(t=>{let r=e[t],i=this.GetEntityConfig(r);if(this.entities.Add(t,i),i.actions){i.actions.map(e=>Ui(e,r)).filter(e=>e).map(Li).forEach(e=>this.entities.AddAction(t,e))}}),this.groups.CreateGroups(this.entities.Get().map(e=>e.id)),!this.discover_existing)return;let t=[];if(Object.entries(e).filter(([e])=>Qi(e)).forEach(([r,i])=>{let a=i.attributes.actions;a&&a.forEach(r=>{let i=(Di(r.entity)||Di(r.service))+"."+r.entity.split(".").pop();if(!(i in e))return;let a=e[i],s=this.GetEntityConfig(a);this.entities.Find(i)||(this.entities.Add(i,s),t.push(i));let n=s.actions?Hi(r,s.actions):null;n||(n=ki(qi(r),["service","service_data"]));let o=Li(n);this.entities.AddAction(i,o)})}),t.length){let e={entities:t,icon:"reload-alert"};this.groups.Add("discovered",e)}}}const Ji=te`
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
        background: none;
        cursor: pointer;
        padding: 10px 20px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        background: var(--list-item-background-color);
        opacity: 0.1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
       }

      div.list-item:hover:before {
          background: var(--primary-color);
          border-radius: 4px;
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
        display: flex;
        align-items: center;
      }
      
      .padded-right {
        margin-right: 11px;
      }

      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
`;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function Zi(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&r.path)}},r.exports),r.exports}var Xi=Zi((function(e,t){
/** @license URI.js v4.4.0 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
!function(e){function t(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];if(t.length>1){t[0]=t[0].slice(0,-1);for(var i=t.length-1,a=1;a<i;++a)t[a]=t[a].slice(1,-1);return t[i]=t[i].slice(1),t.join("")}return t[0]}function r(e){return"(?:"+e+")"}function i(e){return void 0===e?"undefined":null===e?"null":Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase()}function a(e){return e.toUpperCase()}function s(e){var i=t("[0-9]","[A-Fa-f]"),a=r(r("%[EFef]"+i+"%"+i+i+"%"+i+i)+"|"+r("%[89A-Fa-f]"+i+"%"+i+i)+"|"+r("%"+i+i)),s="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",n=t("[\\:\\/\\?\\#\\[\\]\\@]",s),o=e?"[\\uE000-\\uF8FF]":"[]",l=t("[A-Za-z]","[0-9]","[\\-\\.\\_\\~]",e?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]"),c=(r("[A-Za-z]"+t("[A-Za-z]","[0-9]","[\\+\\-\\.]")+"*"),r(r(a+"|"+t(l,s,"[\\:]"))+"*"),r(r("25[0-5]")+"|"+r("2[0-4][0-9]")+"|"+r("1[0-9][0-9]")+"|"+r("0?[1-9][0-9]")+"|0?0?[0-9]")),d=r(c+"\\."+c+"\\."+c+"\\."+c),u=r(i+"{1,4}"),h=r(r(u+"\\:"+u)+"|"+d),p=r(r(u+"\\:")+"{6}"+h),m=r("\\:\\:"+r(u+"\\:")+"{5}"+h),v=r(r(u)+"?\\:\\:"+r(u+"\\:")+"{4}"+h),f=r(r(r(u+"\\:")+"{0,1}"+u)+"?\\:\\:"+r(u+"\\:")+"{3}"+h),g=r(r(r(u+"\\:")+"{0,2}"+u)+"?\\:\\:"+r(u+"\\:")+"{2}"+h),y=r(r(r(u+"\\:")+"{0,3}"+u)+"?\\:\\:"+u+"\\:"+h),_=r(r(r(u+"\\:")+"{0,4}"+u)+"?\\:\\:"+h),b=r(r(r(u+"\\:")+"{0,5}"+u)+"?\\:\\:"+u),w=r(r(r(u+"\\:")+"{0,6}"+u)+"?\\:\\:"),P=r([p,m,v,f,g,y,_,b,w].join("|")),E=r(r(l+"|"+a)+"+"),S=(r("[vV]"+i+"+\\."+t(l,s,"[\\:]")+"+"),r(r(a+"|"+t(l,s))+"*"),r(a+"|"+t(l,s,"[\\:\\@]")));return r(r(a+"|"+t(l,s,"[\\@]"))+"+"),r(r(S+"|"+t("[\\/\\?]",o))+"*"),{NOT_SCHEME:new RegExp(t("[^]","[A-Za-z]","[0-9]","[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(t("[^\\%\\:]",l,s),"g"),NOT_HOST:new RegExp(t("[^\\%\\[\\]\\:]",l,s),"g"),NOT_PATH:new RegExp(t("[^\\%\\/\\:\\@]",l,s),"g"),NOT_PATH_NOSCHEME:new RegExp(t("[^\\%\\/\\@]",l,s),"g"),NOT_QUERY:new RegExp(t("[^\\%]",l,s,"[\\:\\@\\/\\?]",o),"g"),NOT_FRAGMENT:new RegExp(t("[^\\%]",l,s,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(t("[^]",l,s),"g"),UNRESERVED:new RegExp(l,"g"),OTHER_CHARS:new RegExp(t("[^\\%]",l,n),"g"),PCT_ENCODED:new RegExp(a,"g"),IPV4ADDRESS:new RegExp("^("+d+")$"),IPV6ADDRESS:new RegExp("^\\[?("+P+")"+r(r("\\%25|\\%(?!"+i+"{2})")+"("+E+")")+"?\\]?$")}}var n=s(!1),o=s(!0),l=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],i=!0,a=!1,s=void 0;try{for(var n,o=e[Symbol.iterator]();!(i=(n=o.next()).done)&&(r.push(n.value),!t||r.length!==t);i=!0);}catch(e){a=!0,s=e}finally{try{!i&&o.return&&o.return()}finally{if(a)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},c=2147483647,d=/^xn--/,u=/[^\0-\x7E]/,h=/[\x2E\u3002\uFF0E\uFF61]/g,p={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},m=Math.floor,v=String.fromCharCode;function f(e){throw new RangeError(p[e])}function g(e,t){var r=e.split("@"),i="";r.length>1&&(i=r[0]+"@",e=r[1]);var a=function(e,t){for(var r=[],i=e.length;i--;)r[i]=t(e[i]);return r}((e=e.replace(h,".")).split("."),t).join(".");return i+a}function y(e){for(var t=[],r=0,i=e.length;r<i;){var a=e.charCodeAt(r++);if(a>=55296&&a<=56319&&r<i){var s=e.charCodeAt(r++);56320==(64512&s)?t.push(((1023&a)<<10)+(1023&s)+65536):(t.push(a),r--)}else t.push(a)}return t}var _=function(e,t){return e+22+75*(e<26)-((0!=t)<<5)},b=function(e,t,r){var i=0;for(e=r?m(e/700):e>>1,e+=m(e/t);e>455;i+=36)e=m(e/35);return m(i+36*e/(e+38))},w=function(e){var t,r=[],i=e.length,a=0,s=128,n=72,o=e.lastIndexOf("-");o<0&&(o=0);for(var l=0;l<o;++l)e.charCodeAt(l)>=128&&f("not-basic"),r.push(e.charCodeAt(l));for(var d=o>0?o+1:0;d<i;){for(var u=a,h=1,p=36;;p+=36){d>=i&&f("invalid-input");var v=(t=e.charCodeAt(d++))-48<10?t-22:t-65<26?t-65:t-97<26?t-97:36;(v>=36||v>m((c-a)/h))&&f("overflow"),a+=v*h;var g=p<=n?1:p>=n+26?26:p-n;if(v<g)break;var y=36-g;h>m(c/y)&&f("overflow"),h*=y}var _=r.length+1;n=b(a-u,_,0==u),m(a/_)>c-s&&f("overflow"),s+=m(a/_),a%=_,r.splice(a++,0,s)}return String.fromCodePoint.apply(String,r)},P=function(e){var t=[],r=(e=y(e)).length,i=128,a=0,s=72,n=!0,o=!1,l=void 0;try{for(var d,u=e[Symbol.iterator]();!(n=(d=u.next()).done);n=!0){var h=d.value;h<128&&t.push(v(h))}}catch(e){o=!0,l=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw l}}var p=t.length,g=p;for(p&&t.push("-");g<r;){var w=c,P=!0,E=!1,S=void 0;try{for(var x,$=e[Symbol.iterator]();!(P=(x=$.next()).done);P=!0){var k=x.value;k>=i&&k<w&&(w=k)}}catch(e){E=!0,S=e}finally{try{!P&&$.return&&$.return()}finally{if(E)throw S}}var O=g+1;w-i>m((c-a)/O)&&f("overflow"),a+=(w-i)*O,i=w;var j=!0,C=!1,D=void 0;try{for(var A,T=e[Symbol.iterator]();!(j=(A=T.next()).done);j=!0){var F=A.value;if(F<i&&++a>c&&f("overflow"),F==i){for(var z=a,N=36;;N+=36){var R=N<=s?1:N>=s+26?26:N-s;if(z<R)break;var I=z-R,M=36-R;t.push(v(_(R+I%M,0))),z=m(I/M)}t.push(v(_(z,0))),s=b(a,O,g==p),a=0,++g}}}catch(e){C=!0,D=e}finally{try{!j&&T.return&&T.return()}finally{if(C)throw D}}++a,++i}return t.join("")},E=function(e){return g(e,(function(e){return u.test(e)?"xn--"+P(e):e}))},S=function(e){return g(e,(function(e){return d.test(e)?w(e.slice(4).toLowerCase()):e}))},x={};function $(e){var t=e.charCodeAt(0);return t<16?"%0"+t.toString(16).toUpperCase():t<128?"%"+t.toString(16).toUpperCase():t<2048?"%"+(t>>6|192).toString(16).toUpperCase()+"%"+(63&t|128).toString(16).toUpperCase():"%"+(t>>12|224).toString(16).toUpperCase()+"%"+(t>>6&63|128).toString(16).toUpperCase()+"%"+(63&t|128).toString(16).toUpperCase()}function k(e){for(var t="",r=0,i=e.length;r<i;){var a=parseInt(e.substr(r+1,2),16);if(a<128)t+=String.fromCharCode(a),r+=3;else if(a>=194&&a<224){if(i-r>=6){var s=parseInt(e.substr(r+4,2),16);t+=String.fromCharCode((31&a)<<6|63&s)}else t+=e.substr(r,6);r+=6}else if(a>=224){if(i-r>=9){var n=parseInt(e.substr(r+4,2),16),o=parseInt(e.substr(r+7,2),16);t+=String.fromCharCode((15&a)<<12|(63&n)<<6|63&o)}else t+=e.substr(r,9);r+=9}else t+=e.substr(r,3),r+=3}return t}function O(e,t){function r(e){var r=k(e);return r.match(t.UNRESERVED)?r:e}return e.scheme&&(e.scheme=String(e.scheme).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_SCHEME,"")),void 0!==e.userinfo&&(e.userinfo=String(e.userinfo).replace(t.PCT_ENCODED,r).replace(t.NOT_USERINFO,$).replace(t.PCT_ENCODED,a)),void 0!==e.host&&(e.host=String(e.host).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_HOST,$).replace(t.PCT_ENCODED,a)),void 0!==e.path&&(e.path=String(e.path).replace(t.PCT_ENCODED,r).replace(e.scheme?t.NOT_PATH:t.NOT_PATH_NOSCHEME,$).replace(t.PCT_ENCODED,a)),void 0!==e.query&&(e.query=String(e.query).replace(t.PCT_ENCODED,r).replace(t.NOT_QUERY,$).replace(t.PCT_ENCODED,a)),void 0!==e.fragment&&(e.fragment=String(e.fragment).replace(t.PCT_ENCODED,r).replace(t.NOT_FRAGMENT,$).replace(t.PCT_ENCODED,a)),e}function j(e){return e.replace(/^0*(.*)/,"$1")||"0"}function C(e,t){var r=e.match(t.IPV4ADDRESS)||[],i=l(r,2)[1];return i?i.split(".").map(j).join("."):e}function D(e,t){var r=e.match(t.IPV6ADDRESS)||[],i=l(r,3),a=i[1],s=i[2];if(a){for(var n=a.toLowerCase().split("::").reverse(),o=l(n,2),c=o[0],d=o[1],u=d?d.split(":").map(j):[],h=c.split(":").map(j),p=t.IPV4ADDRESS.test(h[h.length-1]),m=p?7:8,v=h.length-m,f=Array(m),g=0;g<m;++g)f[g]=u[g]||h[v+g]||"";p&&(f[m-1]=C(f[m-1],t));var y=f.reduce((function(e,t,r){if(!t||"0"===t){var i=e[e.length-1];i&&i.index+i.length===r?i.length++:e.push({index:r,length:1})}return e}),[]).sort((function(e,t){return t.length-e.length}))[0],_=void 0;if(y&&y.length>1){var b=f.slice(0,y.index),w=f.slice(y.index+y.length);_=b.join(":")+"::"+w.join(":")}else _=f.join(":");return s&&(_+="%"+s),_}return e}var A=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,T=void 0==="".match(/(){0}/)[1];function F(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={},i=!1!==t.iri?o:n;"suffix"===t.reference&&(e=(t.scheme?t.scheme+":":"")+"//"+e);var a=e.match(A);if(a){T?(r.scheme=a[1],r.userinfo=a[3],r.host=a[4],r.port=parseInt(a[5],10),r.path=a[6]||"",r.query=a[7],r.fragment=a[8],isNaN(r.port)&&(r.port=a[5])):(r.scheme=a[1]||void 0,r.userinfo=-1!==e.indexOf("@")?a[3]:void 0,r.host=-1!==e.indexOf("//")?a[4]:void 0,r.port=parseInt(a[5],10),r.path=a[6]||"",r.query=-1!==e.indexOf("?")?a[7]:void 0,r.fragment=-1!==e.indexOf("#")?a[8]:void 0,isNaN(r.port)&&(r.port=e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?a[4]:void 0)),r.host&&(r.host=D(C(r.host,i),i)),void 0!==r.scheme||void 0!==r.userinfo||void 0!==r.host||void 0!==r.port||r.path||void 0!==r.query?void 0===r.scheme?r.reference="relative":void 0===r.fragment?r.reference="absolute":r.reference="uri":r.reference="same-document",t.reference&&"suffix"!==t.reference&&t.reference!==r.reference&&(r.error=r.error||"URI is not a "+t.reference+" reference.");var s=x[(t.scheme||r.scheme||"").toLowerCase()];if(t.unicodeSupport||s&&s.unicodeSupport)O(r,i);else{if(r.host&&(t.domainHost||s&&s.domainHost))try{r.host=E(r.host.replace(i.PCT_ENCODED,k).toLowerCase())}catch(e){r.error=r.error||"Host's domain name can not be converted to ASCII via punycode: "+e}O(r,n)}s&&s.parse&&s.parse(r,t)}else r.error=r.error||"URI can not be parsed.";return r}function z(e,t){var r=!1!==t.iri?o:n,i=[];return void 0!==e.userinfo&&(i.push(e.userinfo),i.push("@")),void 0!==e.host&&i.push(D(C(String(e.host),r),r).replace(r.IPV6ADDRESS,(function(e,t,r){return"["+t+(r?"%25"+r:"")+"]"}))),"number"!=typeof e.port&&"string"!=typeof e.port||(i.push(":"),i.push(String(e.port))),i.length?i.join(""):void 0}var N=/^\.\.?\//,R=/^\/\.(\/|$)/,I=/^\/\.\.(\/|$)/,M=/^\/?(?:.|\n)*?(?=\/|$)/;function L(e){for(var t=[];e.length;)if(e.match(N))e=e.replace(N,"");else if(e.match(R))e=e.replace(R,"/");else if(e.match(I))e=e.replace(I,"/"),t.pop();else if("."===e||".."===e)e="";else{var r=e.match(M);if(!r)throw new Error("Unexpected dot segment condition");var i=r[0];e=e.slice(i.length),t.push(i)}return t.join("")}function U(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.iri?o:n,i=[],a=x[(t.scheme||e.scheme||"").toLowerCase()];if(a&&a.serialize&&a.serialize(e,t),e.host)if(r.IPV6ADDRESS.test(e.host));else if(t.domainHost||a&&a.domainHost)try{e.host=t.iri?S(e.host):E(e.host.replace(r.PCT_ENCODED,k).toLowerCase())}catch(r){e.error=e.error||"Host's domain name can not be converted to "+(t.iri?"Unicode":"ASCII")+" via punycode: "+r}O(e,r),"suffix"!==t.reference&&e.scheme&&(i.push(e.scheme),i.push(":"));var s=z(e,t);if(void 0!==s&&("suffix"!==t.reference&&i.push("//"),i.push(s),e.path&&"/"!==e.path.charAt(0)&&i.push("/")),void 0!==e.path){var l=e.path;t.absolutePath||a&&a.absolutePath||(l=L(l)),void 0===s&&(l=l.replace(/^\/\//,"/%2F")),i.push(l)}return void 0!==e.query&&(i.push("?"),i.push(e.query)),void 0!==e.fragment&&(i.push("#"),i.push(e.fragment)),i.join("")}function V(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments[3],a={};return i||(e=F(U(e,r),r),t=F(U(t,r),r)),!(r=r||{}).tolerant&&t.scheme?(a.scheme=t.scheme,a.userinfo=t.userinfo,a.host=t.host,a.port=t.port,a.path=L(t.path||""),a.query=t.query):(void 0!==t.userinfo||void 0!==t.host||void 0!==t.port?(a.userinfo=t.userinfo,a.host=t.host,a.port=t.port,a.path=L(t.path||""),a.query=t.query):(t.path?("/"===t.path.charAt(0)?a.path=L(t.path):(void 0===e.userinfo&&void 0===e.host&&void 0===e.port||e.path?e.path?a.path=e.path.slice(0,e.path.lastIndexOf("/")+1)+t.path:a.path=t.path:a.path="/"+t.path,a.path=L(a.path)),a.query=t.query):(a.path=e.path,void 0!==t.query?a.query=t.query:a.query=e.query),a.userinfo=e.userinfo,a.host=e.host,a.port=e.port),a.scheme=e.scheme),a.fragment=t.fragment,a}function q(e,t){return e&&e.toString().replace(t&&t.iri?o.PCT_ENCODED:n.PCT_ENCODED,k)}var H={scheme:"http",domainHost:!0,parse:function(e,t){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,t){var r="https"===String(e.scheme).toLowerCase();return e.port!==(r?443:80)&&""!==e.port||(e.port=void 0),e.path||(e.path="/"),e}},G={scheme:"https",domainHost:H.domainHost,parse:H.parse,serialize:H.serialize};function Q(e){return"boolean"==typeof e.secure?e.secure:"wss"===String(e.scheme).toLowerCase()}var B={scheme:"ws",domainHost:!0,parse:function(e,t){var r=e;return r.secure=Q(r),r.resourceName=(r.path||"/")+(r.query?"?"+r.query:""),r.path=void 0,r.query=void 0,r},serialize:function(e,t){if(e.port!==(Q(e)?443:80)&&""!==e.port||(e.port=void 0),"boolean"==typeof e.secure&&(e.scheme=e.secure?"wss":"ws",e.secure=void 0),e.resourceName){var r=e.resourceName.split("?"),i=l(r,2),a=i[0],s=i[1];e.path=a&&"/"!==a?a:void 0,e.query=s,e.resourceName=void 0}return e.fragment=void 0,e}},K={scheme:"wss",domainHost:B.domainHost,parse:B.parse,serialize:B.serialize},W={},Y="[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]",J="[0-9A-Fa-f]",Z=r(r("%[EFef]"+J+"%"+J+J+"%"+J+J)+"|"+r("%[89A-Fa-f]"+J+"%"+J+J)+"|"+r("%"+J+J)),X=t("[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",'[\\"\\\\]'),ee=new RegExp(Y,"g"),te=new RegExp(Z,"g"),re=new RegExp(t("[^]","[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]","[\\.]",'[\\"]',X),"g"),ie=new RegExp(t("[^]",Y,"[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"),"g"),ae=ie;function se(e){var t=k(e);return t.match(ee)?t:e}var ne={scheme:"mailto",parse:function(e,t){var r=e,i=r.to=r.path?r.path.split(","):[];if(r.path=void 0,r.query){for(var a=!1,s={},n=r.query.split("&"),o=0,l=n.length;o<l;++o){var c=n[o].split("=");switch(c[0]){case"to":for(var d=c[1].split(","),u=0,h=d.length;u<h;++u)i.push(d[u]);break;case"subject":r.subject=q(c[1],t);break;case"body":r.body=q(c[1],t);break;default:a=!0,s[q(c[0],t)]=q(c[1],t)}}a&&(r.headers=s)}r.query=void 0;for(var p=0,m=i.length;p<m;++p){var v=i[p].split("@");if(v[0]=q(v[0]),t.unicodeSupport)v[1]=q(v[1],t).toLowerCase();else try{v[1]=E(q(v[1],t).toLowerCase())}catch(e){r.error=r.error||"Email address's domain name can not be converted to ASCII via punycode: "+e}i[p]=v.join("@")}return r},serialize:function(e,t){var r,i=e,s=null!=(r=e.to)?r instanceof Array?r:"number"!=typeof r.length||r.split||r.setInterval||r.call?[r]:Array.prototype.slice.call(r):[];if(s){for(var n=0,o=s.length;n<o;++n){var l=String(s[n]),c=l.lastIndexOf("@"),d=l.slice(0,c).replace(te,se).replace(te,a).replace(re,$),u=l.slice(c+1);try{u=t.iri?S(u):E(q(u,t).toLowerCase())}catch(e){i.error=i.error||"Email address's domain name can not be converted to "+(t.iri?"Unicode":"ASCII")+" via punycode: "+e}s[n]=d+"@"+u}i.path=s.join(",")}var h=e.headers=e.headers||{};e.subject&&(h.subject=e.subject),e.body&&(h.body=e.body);var p=[];for(var m in h)h[m]!==W[m]&&p.push(m.replace(te,se).replace(te,a).replace(ie,$)+"="+h[m].replace(te,se).replace(te,a).replace(ae,$));return p.length&&(i.query=p.join("&")),i}},oe=/^([^\:]+)\:(.*)/,le={scheme:"urn",parse:function(e,t){var r=e.path&&e.path.match(oe),i=e;if(r){var a=t.scheme||i.scheme||"urn",s=r[1].toLowerCase(),n=r[2],o=a+":"+(t.nid||s),l=x[o];i.nid=s,i.nss=n,i.path=void 0,l&&(i=l.parse(i,t))}else i.error=i.error||"URN can not be parsed.";return i},serialize:function(e,t){var r=t.scheme||e.scheme||"urn",i=e.nid,a=r+":"+(t.nid||i),s=x[a];s&&(e=s.serialize(e,t));var n=e,o=e.nss;return n.path=(i||t.nid)+":"+o,n}},ce=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,de={scheme:"urn:uuid",parse:function(e,t){var r=e;return r.uuid=r.nss,r.nss=void 0,t.tolerant||r.uuid&&r.uuid.match(ce)||(r.error=r.error||"UUID is not valid."),r},serialize:function(e,t){var r=e;return r.nss=(e.uuid||"").toLowerCase(),r}};x[H.scheme]=H,x[G.scheme]=G,x[B.scheme]=B,x[K.scheme]=K,x[ne.scheme]=ne,x[le.scheme]=le,x[de.scheme]=de,e.SCHEMES=x,e.pctEncChar=$,e.pctDecChars=k,e.parse=F,e.removeDotSegments=L,e.serialize=U,e.resolveComponents=V,e.resolve=function(e,t,r){var i=function(e,t){var r=e;if(t)for(var i in t)r[i]=t[i];return r}({scheme:"null"},r);return U(V(F(e,i),F(t,i),i,!0),i)},e.normalize=function(e,t){return"string"==typeof e?e=U(F(e,t),t):"object"===i(e)&&(e=F(U(e,t),t)),e},e.equal=function(e,t,r){return"string"==typeof e?e=U(F(e,r),r):"object"===i(e)&&(e=U(e,r)),"string"==typeof t?t=U(F(t,r),r):"object"===i(t)&&(t=U(t,r)),e===t},e.escapeComponent=function(e,t){return e&&e.toString().replace(t&&t.iri?o.ESCAPE:n.ESCAPE,$)},e.unescapeComponent=q,Object.defineProperty(e,"__esModule",{value:!0})}(t)})),ea=function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){if(t.constructor!==r.constructor)return!1;var i,a,s;if(Array.isArray(t)){if((i=t.length)!=r.length)return!1;for(a=i;0!=a--;)if(!e(t[a],r[a]))return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if((i=(s=Object.keys(t)).length)!==Object.keys(r).length)return!1;for(a=i;0!=a--;)if(!Object.prototype.hasOwnProperty.call(r,s[a]))return!1;for(a=i;0!=a--;){var n=s[a];if(!e(t[n],r[n]))return!1}return!0}return t!=t&&r!=r},ta={copy:function(e,t){for(var r in t=t||{},e)t[r]=e[r];return t},checkDataType:ra,checkDataTypes:function(e,t,r){switch(e.length){case 1:return ra(e[0],t,r,!0);default:var i="",a=aa(e);for(var s in a.array&&a.object&&(i=a.null?"(":"(!"+t+" || ",i+="typeof "+t+' !== "object")',delete a.null,delete a.array,delete a.object),a.number&&delete a.integer,a)i+=(i?" && ":"")+ra(s,t,r,!0);return i}},coerceToTypes:function(e,t){if(Array.isArray(t)){for(var r=[],i=0;i<t.length;i++){var a=t[i];(ia[a]||"array"===e&&"array"===a)&&(r[r.length]=a)}if(r.length)return r}else{if(ia[t])return[t];if("array"===e&&"array"===t)return["array"]}},toHash:aa,getProperty:oa,escapeQuotes:la,equal:ea,ucs2length:function(e){for(var t,r=0,i=e.length,a=0;a<i;)r++,(t=e.charCodeAt(a++))>=55296&&t<=56319&&a<i&&56320==(64512&(t=e.charCodeAt(a)))&&a++;return r},varOccurences:function(e,t){t+="[^0-9]";var r=e.match(new RegExp(t,"g"));return r?r.length:0},varReplace:function(e,t,r){return t+="([^0-9])",r=r.replace(/\$/g,"$$$$"),e.replace(new RegExp(t,"g"),r+"$1")},schemaHasRules:function(e,t){if("boolean"==typeof e)return!e;for(var r in e)if(t[r])return!0},schemaHasRulesExcept:function(e,t,r){if("boolean"==typeof e)return!e&&"not"!=r;for(var i in e)if(i!=r&&t[i])return!0},schemaUnknownRules:function(e,t){if("boolean"==typeof e)return;for(var r in e)if(!t[r])return r},toQuotedString:ca,getPathExpr:function(e,t,r,i){return ha(e,r?"'/' + "+t+(i?"":".replace(/~/g, '~0').replace(/\\//g, '~1')"):i?"'[' + "+t+" + ']'":"'[\\'' + "+t+" + '\\']'")},getPath:function(e,t,r){var i=ca(r?"/"+pa(t):oa(t));return ha(e,i)},getData:function(e,t,r){var i,a,s,n;if(""===e)return"rootData";if("/"==e[0]){if(!da.test(e))throw new Error("Invalid JSON-pointer: "+e);a=e,s="rootData"}else{if(!(n=e.match(ua)))throw new Error("Invalid JSON-pointer: "+e);if(i=+n[1],"#"==(a=n[2])){if(i>=t)throw new Error("Cannot access property/index "+i+" levels up, current level is "+t);return r[t-i]}if(i>t)throw new Error("Cannot access data "+i+" levels up, current level is "+t);if(s="data"+(t-i||""),!a)return s}for(var o=s,l=a.split("/"),c=0;c<l.length;c++){var d=l[c];d&&(s+=oa(ma(d)),o+=" && "+s)}return o},unescapeFragment:function(e){return ma(decodeURIComponent(e))},unescapeJsonPointer:ma,escapeFragment:function(e){return encodeURIComponent(pa(e))},escapeJsonPointer:pa};function ra(e,t,r,i){var a=i?" !== ":" === ",s=i?" || ":" && ",n=i?"!":"",o=i?"":"!";switch(e){case"null":return t+a+"null";case"array":return n+"Array.isArray("+t+")";case"object":return"("+n+t+s+"typeof "+t+a+'"object"'+s+o+"Array.isArray("+t+"))";case"integer":return"(typeof "+t+a+'"number"'+s+o+"("+t+" % 1)"+s+t+a+t+(r?s+n+"isFinite("+t+")":"")+")";case"number":return"(typeof "+t+a+'"'+e+'"'+(r?s+n+"isFinite("+t+")":"")+")";default:return"typeof "+t+a+'"'+e+'"'}}var ia=aa(["string","number","integer","boolean","null"]);function aa(e){for(var t={},r=0;r<e.length;r++)t[e[r]]=!0;return t}var sa=/^[a-z$_][a-z$_0-9]*$/i,na=/'|\\/g;function oa(e){return"number"==typeof e?"["+e+"]":sa.test(e)?"."+e:"['"+la(e)+"']"}function la(e){return e.replace(na,"\\$&").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\f/g,"\\f").replace(/\t/g,"\\t")}function ca(e){return"'"+la(e)+"'"}var da=/^\/(?:[^~]|~0|~1)*$/,ua=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function ha(e,t){return'""'==e?t:(e+" + "+t).replace(/([^\\])' \+ '/g,"$1")}function pa(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function ma(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")}var va=function(e){ta.copy(e,this)};var fa=Zi((function(e){var t=e.exports=function(e,r,i){"function"==typeof r&&(i=r,r={}),function e(r,i,a,s,n,o,l,c,d,u){if(s&&"object"==typeof s&&!Array.isArray(s)){for(var h in i(s,n,o,l,c,d,u),s){var p=s[h];if(Array.isArray(p)){if(h in t.arrayKeywords)for(var m=0;m<p.length;m++)e(r,i,a,p[m],n+"/"+h+"/"+m,o,n,h,s,m)}else if(h in t.propsKeywords){if(p&&"object"==typeof p)for(var v in p)e(r,i,a,p[v],n+"/"+h+"/"+v.replace(/~/g,"~0").replace(/\//g,"~1"),o,n,h,s,v)}else(h in t.keywords||r.allKeys&&!(h in t.skipKeywords))&&e(r,i,a,p,n+"/"+h,o,n,h,s)}a(s,n,o,l,c,d,u)}}(r,"function"==typeof(i=r.cb||i)?i:i.pre||function(){},i.post||function(){},e,"",e)};t.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0},t.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0},t.propsKeywords={definitions:!0,properties:!0,patternProperties:!0,dependencies:!0},t.skipKeywords={default:!0,enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0}})),ga=ya;function ya(e,t,r){var i=this._refs[r];if("string"==typeof i){if(!this._refs[i])return ya.call(this,e,t,i);i=this._refs[i]}if((i=i||this._schemas[r])instanceof va)return Sa(i.schema,this._opts.inlineRefs)?i.schema:i.validate||this._compile(i);var a,s,n,o=_a.call(this,t,r);return o&&(a=o.schema,t=o.root,n=o.baseId),a instanceof va?s=a.validate||e.call(this,a.schema,t,void 0,n):void 0!==a&&(s=Sa(a,this._opts.inlineRefs)?a:e.call(this,a,t,void 0,n)),s}function _a(e,t){var r=Xi.parse(t),i=$a(r),a=xa(this._getId(e.schema));if(0===Object.keys(e.schema).length||i!==a){var s=Oa(i),n=this._refs[s];if("string"==typeof n)return ba.call(this,e,n,r);if(n instanceof va)n.validate||this._compile(n),e=n;else{if(!((n=this._schemas[s])instanceof va))return;if(n.validate||this._compile(n),s==Oa(t))return{schema:n,root:e,baseId:a};e=n}if(!e.schema)return;a=xa(this._getId(e.schema))}return Pa.call(this,r,a,e.schema,e)}function ba(e,t,r){var i=_a.call(this,e,t);if(i){var a=i.schema,s=i.baseId;e=i.root;var n=this._getId(a);return n&&(s=ja(s,n)),Pa.call(this,r,s,a,e)}}ya.normalizeId=Oa,ya.fullPath=xa,ya.url=ja,ya.ids=function(e){var t=Oa(this._getId(e)),r={"":t},i={"":xa(t,!1)},a={},s=this;return fa(e,{allKeys:!0},(function(e,t,n,o,l,c,d){if(""!==t){var u=s._getId(e),h=r[o],p=i[o]+"/"+l;if(void 0!==d&&(p+="/"+("number"==typeof d?d:ta.escapeFragment(d))),"string"==typeof u){u=h=Oa(h?Xi.resolve(h,u):u);var m=s._refs[u];if("string"==typeof m&&(m=s._refs[m]),m&&m.schema){if(!ea(e,m.schema))throw new Error('id "'+u+'" resolves to more than one schema')}else if(u!=Oa(p))if("#"==u[0]){if(a[u]&&!ea(e,a[u]))throw new Error('id "'+u+'" resolves to more than one schema');a[u]=e}else s._refs[u]=p}r[t]=h,i[t]=p}})),a},ya.inlineRef=Sa,ya.schema=_a;var wa=ta.toHash(["properties","patternProperties","enum","dependencies","definitions"]);function Pa(e,t,r,i){if(e.fragment=e.fragment||"","/"==e.fragment.slice(0,1)){for(var a=e.fragment.split("/"),s=1;s<a.length;s++){var n=a[s];if(n){if(void 0===(r=r[n=ta.unescapeFragment(n)]))break;var o;if(!wa[n]&&((o=this._getId(r))&&(t=ja(t,o)),r.$ref)){var l=ja(t,r.$ref),c=_a.call(this,i,l);c&&(r=c.schema,i=c.root,t=c.baseId)}}}return void 0!==r&&r!==i.schema?{schema:r,root:i,baseId:t}:void 0}}var Ea=ta.toHash(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum"]);function Sa(e,t){return!1!==t&&(void 0===t||!0===t?function e(t){var r;if(Array.isArray(t)){for(var i=0;i<t.length;i++)if("object"==typeof(r=t[i])&&!e(r))return!1}else for(var a in t){if("$ref"==a)return!1;if("object"==typeof(r=t[a])&&!e(r))return!1}return!0}(e):t?function e(t){var r,i=0;if(Array.isArray(t)){for(var a=0;a<t.length;a++)if("object"==typeof(r=t[a])&&(i+=e(r)),i==1/0)return 1/0}else for(var s in t){if("$ref"==s)return 1/0;if(Ea[s])i++;else if("object"==typeof(r=t[s])&&(i+=e(r)+1),i==1/0)return 1/0}return i}(e)<=t:void 0)}function xa(e,t){return!1!==t&&(e=Oa(e)),$a(Xi.parse(e))}function $a(e){return Xi.serialize(e).split("#")[0]+"#"}var ka=/#\/?$/;function Oa(e){return e?e.replace(ka,""):""}function ja(e,t){return t=Oa(t),Xi.resolve(e,t)}var Ca={Validation:Aa((function(e){this.message="validation failed",this.errors=e,this.ajv=this.validation=!0})),MissingRef:Aa(Da)};function Da(e,t,r){this.message=r||Da.message(e,t),this.missingRef=ga.url(e,t),this.missingSchema=ga.normalizeId(ga.fullPath(this.missingRef))}function Aa(e){return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Da.message=function(e,t){return"can't resolve reference "+t+" from id "+e};var Ta=function(e,t){t||(t={}),"function"==typeof t&&(t={cmp:t});var r,i="boolean"==typeof t.cycles&&t.cycles,a=t.cmp&&(r=t.cmp,function(e){return function(t,i){var a={key:t,value:e[t]},s={key:i,value:e[i]};return r(a,s)}}),s=[];return function e(t){if(t&&t.toJSON&&"function"==typeof t.toJSON&&(t=t.toJSON()),void 0!==t){if("number"==typeof t)return isFinite(t)?""+t:"null";if("object"!=typeof t)return JSON.stringify(t);var r,n;if(Array.isArray(t)){for(n="[",r=0;r<t.length;r++)r&&(n+=","),n+=e(t[r])||"null";return n+"]"}if(null===t)return"null";if(-1!==s.indexOf(t)){if(i)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var o=s.push(t)-1,l=Object.keys(t).sort(a&&a(t));for(n="",r=0;r<l.length;r++){var c=l[r],d=e(t[c]);d&&(n&&(n+=","),n+=JSON.stringify(c)+":"+d)}return s.splice(o,1),"{"+n+"}"}}(e)},Fa=function(e,t,r){var i="",a=!0===e.schema.$async,s=e.util.schemaHasRulesExcept(e.schema,e.RULES.all,"$ref"),n=e.self._getId(e.schema);if(e.opts.strictKeywords){var o=e.util.schemaUnknownRules(e.schema,e.RULES.keywords);if(o){var l="unknown keyword: "+o;if("log"!==e.opts.strictKeywords)throw new Error(l);e.logger.warn(l)}}if(e.isTop&&(i+=" var validate = ",a&&(e.async=!0,i+="async "),i+="function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ",n&&(e.opts.sourceCode||e.opts.processCode)&&(i+=" /*# sourceURL="+n+" */ ")),"boolean"==typeof e.schema||!s&&!e.schema.$ref){var c=e.level,d=e.dataLevel,u=e.schema["false schema"],h=e.schemaPath+e.util.getProperty("false schema"),p=e.errSchemaPath+"/false schema",m=!e.opts.allErrors,v="data"+(d||""),f="valid"+c;if(!1===e.schema){e.isTop?m=!0:i+=" var "+f+" = false; ",(Y=Y||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'false schema' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(p)+" , params: {} ",!1!==e.opts.messages&&(i+=" , message: 'boolean schema is false' "),e.opts.verbose&&(i+=" , schema: false , parentSchema: validate.schema"+e.schemaPath+" , data: "+v+" "),i+=" } "):i+=" {} ";var g=i;i=Y.pop(),!e.compositeRule&&m?e.async?i+=" throw new ValidationError(["+g+"]); ":i+=" validate.errors = ["+g+"]; return false; ":i+=" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}else e.isTop?i+=a?" return data; ":" validate.errors = null; return true; ":i+=" var "+f+" = true; ";return e.isTop&&(i+=" }; return validate; "),i}if(e.isTop){var y=e.isTop;c=e.level=0,d=e.dataLevel=0,v="data";if(e.rootId=e.resolve.fullPath(e.self._getId(e.root.schema)),e.baseId=e.baseId||e.rootId,delete e.isTop,e.dataPathArr=[void 0],void 0!==e.schema.default&&e.opts.useDefaults&&e.opts.strictDefaults){var _="default is ignored in the schema root";if("log"!==e.opts.strictDefaults)throw new Error(_);e.logger.warn(_)}i+=" var vErrors = null; ",i+=" var errors = 0;     ",i+=" if (rootData === undefined) rootData = data; "}else{c=e.level,v="data"+((d=e.dataLevel)||"");if(n&&(e.baseId=e.resolve.url(e.baseId,n)),a&&!e.async)throw new Error("async schema in sync schema");i+=" var errs_"+c+" = errors;"}f="valid"+c,m=!e.opts.allErrors;var b="",w="",P=e.schema.type,E=Array.isArray(P);if(P&&e.opts.nullable&&!0===e.schema.nullable&&(E?-1==P.indexOf("null")&&(P=P.concat("null")):"null"!=P&&(P=[P,"null"],E=!0)),E&&1==P.length&&(P=P[0],E=!1),e.schema.$ref&&s){if("fail"==e.opts.extendRefs)throw new Error('$ref: validation keywords used in schema at path "'+e.errSchemaPath+'" (see option extendRefs)');!0!==e.opts.extendRefs&&(s=!1,e.logger.warn('$ref: keywords ignored in schema at path "'+e.errSchemaPath+'"'))}if(e.schema.$comment&&e.opts.$comment&&(i+=" "+e.RULES.all.$comment.code(e,"$comment")),P){if(e.opts.coerceTypes)var S=e.util.coerceToTypes(e.opts.coerceTypes,P);var x=e.RULES.types[P];if(S||E||!0===x||x&&!J(x)){h=e.schemaPath+".type",p=e.errSchemaPath+"/type",h=e.schemaPath+".type",p=e.errSchemaPath+"/type";var $=E?"checkDataTypes":"checkDataType";if(i+=" if ("+e.util[$](P,v,e.opts.strictNumbers,!0)+") { ",S){var k="dataType"+c,O="coerced"+c;i+=" var "+k+" = typeof "+v+"; var "+O+" = undefined; ","array"==e.opts.coerceTypes&&(i+=" if ("+k+" == 'object' && Array.isArray("+v+") && "+v+".length == 1) { "+v+" = "+v+"[0]; "+k+" = typeof "+v+"; if ("+e.util.checkDataType(e.schema.type,v,e.opts.strictNumbers)+") "+O+" = "+v+"; } "),i+=" if ("+O+" !== undefined) ; ";var j=S;if(j)for(var C,D=-1,A=j.length-1;D<A;)"string"==(C=j[D+=1])?i+=" else if ("+k+" == 'number' || "+k+" == 'boolean') "+O+" = '' + "+v+"; else if ("+v+" === null) "+O+" = ''; ":"number"==C||"integer"==C?(i+=" else if ("+k+" == 'boolean' || "+v+" === null || ("+k+" == 'string' && "+v+" && "+v+" == +"+v+" ","integer"==C&&(i+=" && !("+v+" % 1)"),i+=")) "+O+" = +"+v+"; "):"boolean"==C?i+=" else if ("+v+" === 'false' || "+v+" === 0 || "+v+" === null) "+O+" = false; else if ("+v+" === 'true' || "+v+" === 1) "+O+" = true; ":"null"==C?i+=" else if ("+v+" === '' || "+v+" === 0 || "+v+" === false) "+O+" = null; ":"array"==e.opts.coerceTypes&&"array"==C&&(i+=" else if ("+k+" == 'string' || "+k+" == 'number' || "+k+" == 'boolean' || "+v+" == null) "+O+" = ["+v+"]; ");i+=" else {   ",(Y=Y||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'type' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(p)+" , params: { type: '",i+=E?""+P.join(","):""+P,i+="' } ",!1!==e.opts.messages&&(i+=" , message: 'should be ",i+=E?""+P.join(","):""+P,i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+h+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+v+" "),i+=" } "):i+=" {} ";g=i;i=Y.pop(),!e.compositeRule&&m?e.async?i+=" throw new ValidationError(["+g+"]); ":i+=" validate.errors = ["+g+"]; return false; ":i+=" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } if ("+O+" !== undefined) {  ";var T=d?"data"+(d-1||""):"parentData";i+=" "+v+" = "+O+"; ",d||(i+="if ("+T+" !== undefined)"),i+=" "+T+"["+(d?e.dataPathArr[d]:"parentDataProperty")+"] = "+O+"; } "}else{(Y=Y||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'type' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(p)+" , params: { type: '",i+=E?""+P.join(","):""+P,i+="' } ",!1!==e.opts.messages&&(i+=" , message: 'should be ",i+=E?""+P.join(","):""+P,i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+h+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+v+" "),i+=" } "):i+=" {} ";g=i;i=Y.pop(),!e.compositeRule&&m?e.async?i+=" throw new ValidationError(["+g+"]); ":i+=" validate.errors = ["+g+"]; return false; ":i+=" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}i+=" } "}}if(e.schema.$ref&&!s)i+=" "+e.RULES.all.$ref.code(e,"$ref")+" ",m&&(i+=" } if (errors === ",i+=y?"0":"errs_"+c,i+=") { ",w+="}");else{var F=e.RULES;if(F)for(var z=-1,N=F.length-1;z<N;)if(J(x=F[z+=1])){if(x.type&&(i+=" if ("+e.util.checkDataType(x.type,v,e.opts.strictNumbers)+") { "),e.opts.useDefaults)if("object"==x.type&&e.schema.properties){u=e.schema.properties;var R=Object.keys(u);if(R)for(var I,M=-1,L=R.length-1;M<L;){if(void 0!==(q=u[I=R[M+=1]]).default){var U=v+e.util.getProperty(I);if(e.compositeRule){if(e.opts.strictDefaults){_="default is ignored for: "+U;if("log"!==e.opts.strictDefaults)throw new Error(_);e.logger.warn(_)}}else i+=" if ("+U+" === undefined ","empty"==e.opts.useDefaults&&(i+=" || "+U+" === null || "+U+" === '' "),i+=" ) "+U+" = ","shared"==e.opts.useDefaults?i+=" "+e.useDefault(q.default)+" ":i+=" "+JSON.stringify(q.default)+" ",i+="; "}}}else if("array"==x.type&&Array.isArray(e.schema.items)){var V=e.schema.items;if(V){D=-1;for(var q,H=V.length-1;D<H;)if(void 0!==(q=V[D+=1]).default){U=v+"["+D+"]";if(e.compositeRule){if(e.opts.strictDefaults){_="default is ignored for: "+U;if("log"!==e.opts.strictDefaults)throw new Error(_);e.logger.warn(_)}}else i+=" if ("+U+" === undefined ","empty"==e.opts.useDefaults&&(i+=" || "+U+" === null || "+U+" === '' "),i+=" ) "+U+" = ","shared"==e.opts.useDefaults?i+=" "+e.useDefault(q.default)+" ":i+=" "+JSON.stringify(q.default)+" ",i+="; "}}}var G=x.rules;if(G)for(var Q,B=-1,K=G.length-1;B<K;)if(Z(Q=G[B+=1])){var W=Q.code(e,Q.keyword,x.type);W&&(i+=" "+W+" ",m&&(b+="}"))}if(m&&(i+=" "+b+" ",b=""),x.type&&(i+=" } ",P&&P===x.type&&!S)){i+=" else { ";var Y;h=e.schemaPath+".type",p=e.errSchemaPath+"/type";(Y=Y||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'type' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(p)+" , params: { type: '",i+=E?""+P.join(","):""+P,i+="' } ",!1!==e.opts.messages&&(i+=" , message: 'should be ",i+=E?""+P.join(","):""+P,i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+h+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+v+" "),i+=" } "):i+=" {} ";g=i;i=Y.pop(),!e.compositeRule&&m?e.async?i+=" throw new ValidationError(["+g+"]); ":i+=" validate.errors = ["+g+"]; return false; ":i+=" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } "}m&&(i+=" if (errors === ",i+=y?"0":"errs_"+c,i+=") { ",w+="}")}}function J(e){for(var t=e.rules,r=0;r<t.length;r++)if(Z(t[r]))return!0}function Z(t){return void 0!==e.schema[t.keyword]||t.implements&&function(t){for(var r=t.implements,i=0;i<r.length;i++)if(void 0!==e.schema[r[i]])return!0}(t)}return m&&(i+=" "+w+" "),y?(a?(i+=" if (errors === 0) return data;           ",i+=" else throw new ValidationError(vErrors); "):(i+=" validate.errors = vErrors; ",i+=" return errors === 0;       "),i+=" }; return validate;"):i+=" var "+f+" = errors === errs_"+c+";",i},za=ta.ucs2length,Na=Ca.Validation,Ra=function e(t,r,i,a){var s=this,n=this._opts,o=[void 0],l={},c=[],d={},u=[],h={},p=[];r=r||{schema:t,refVal:o,refs:l};var m=Ia.call(this,t,r,a),v=this._compilations[m.index];if(m.compiling)return v.callValidate=function e(){var t=v.validate,r=t.apply(this,arguments);return e.errors=t.errors,r};var f=this._formats,g=this.RULES;try{var y=b(t,r,i,a);v.validate=y;var _=v.callValidate;return _&&(_.schema=y.schema,_.errors=null,_.refs=y.refs,_.refVal=y.refVal,_.root=y.root,_.$async=y.$async,n.sourceCode&&(_.source=y.source)),y}finally{Ma.call(this,t,r,a)}function b(t,i,a,d){var h=!i||i&&i.schema==t;if(i.schema!=r.schema)return e.call(s,t,i,a,d);var m,v=!0===t.$async,y=Fa({isTop:!0,schema:t,isRoot:h,baseId:d,root:i,schemaPath:"",errSchemaPath:"#",errorPath:'""',MissingRefError:Ca.MissingRef,RULES:g,validate:Fa,util:ta,resolve:ga,resolveRef:w,usePattern:S,useDefault:x,useCustomRule:$,opts:n,formats:f,logger:s.logger,self:s});y=Ga(o,qa)+Ga(c,Ua)+Ga(u,Va)+Ga(p,Ha)+y,n.processCode&&(y=n.processCode(y,t));try{m=new Function("self","RULES","formats","root","refVal","defaults","customRules","equal","ucs2length","ValidationError",y)(s,g,f,r,o,u,p,ea,za,Na),o[0]=m}catch(e){throw s.logger.error("Error compiling schema, function code:",y),e}return m.schema=t,m.errors=null,m.refs=l,m.refVal=o,m.root=h?m:i,v&&(m.$async=!0),!0===n.sourceCode&&(m.source={code:y,patterns:c,defaults:u}),m}function w(t,a,c){a=ga.url(t,a);var d,u,h=l[a];if(void 0!==h)return E(d=o[h],u="refVal["+h+"]");if(!c&&r.refs){var p=r.refs[a];if(void 0!==p)return E(d=r.refVal[p],u=P(a,d))}u=P(a);var m=ga.call(s,b,r,a);if(void 0===m){var v=i&&i[a];v&&(m=ga.inlineRef(v,n.inlineRefs)?v:e.call(s,v,r,i,t))}if(void 0!==m)return function(e,t){var r=l[e];o[r]=t}(a,m),E(m,u);!function(e){delete l[e]}(a)}function P(e,t){var r=o.length;return o[r]=t,l[e]=r,"refVal"+r}function E(e,t){return"object"==typeof e||"boolean"==typeof e?{code:t,schema:e,inline:!0}:{code:t,$async:e&&!!e.$async}}function S(e){var t=d[e];return void 0===t&&(t=d[e]=c.length,c[t]=e),"pattern"+t}function x(e){switch(typeof e){case"boolean":case"number":return""+e;case"string":return ta.toQuotedString(e);case"object":if(null===e)return"null";var t=Ta(e),r=h[t];return void 0===r&&(r=h[t]=u.length,u[r]=e),"default"+r}}function $(e,t,r,i){if(!1!==s._opts.validateSchema){var a=e.definition.dependencies;if(a&&!a.every((function(e){return Object.prototype.hasOwnProperty.call(r,e)})))throw new Error("parent schema must have all required keywords: "+a.join(","));var o=e.definition.validateSchema;if(o)if(!o(t)){var l="keyword schema is invalid: "+s.errorsText(o.errors);if("log"!=s._opts.validateSchema)throw new Error(l);s.logger.error(l)}}var c,d=e.definition.compile,u=e.definition.inline,h=e.definition.macro;if(d)c=d.call(s,t,r,i);else if(h)c=h.call(s,t,r,i),!1!==n.validateSchema&&s.validateSchema(c,!0);else if(u)c=u.call(s,i,e.keyword,t,r);else if(!(c=e.definition.validate))return;if(void 0===c)throw new Error('custom keyword "'+e.keyword+'"failed to compile');var m=p.length;return p[m]=c,{code:"customRule"+m,validate:c}}};function Ia(e,t,r){var i=La.call(this,e,t,r);return i>=0?{index:i,compiling:!0}:(i=this._compilations.length,this._compilations[i]={schema:e,root:t,baseId:r},{index:i,compiling:!1})}function Ma(e,t,r){var i=La.call(this,e,t,r);i>=0&&this._compilations.splice(i,1)}function La(e,t,r){for(var i=0;i<this._compilations.length;i++){var a=this._compilations[i];if(a.schema==e&&a.root==t&&a.baseId==r)return i}return-1}function Ua(e,t){return"var pattern"+e+" = new RegExp("+ta.toQuotedString(t[e])+");"}function Va(e){return"var default"+e+" = defaults["+e+"];"}function qa(e,t){return void 0===t[e]?"":"var refVal"+e+" = refVal["+e+"];"}function Ha(e){return"var customRule"+e+" = customRules["+e+"];"}function Ga(e,t){if(!e.length)return"";for(var r="",i=0;i<e.length;i++)r+=t(i,e);return r}var Qa=Zi((function(e){var t=e.exports=function(){this._cache={}};t.prototype.put=function(e,t){this._cache[e]=t},t.prototype.get=function(e){return this._cache[e]},t.prototype.del=function(e){delete this._cache[e]},t.prototype.clear=function(){this._cache={}}})),Ba=/^(\d\d\d\d)-(\d\d)-(\d\d)$/,Ka=[0,31,28,31,30,31,30,31,31,30,31,30,31],Wa=/^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i,Ya=/^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,Ja=/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,Za=/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,Xa=/^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,es=/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,ts=/^(?:\/(?:[^~/]|~0|~1)*)*$/,rs=/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,is=/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,as=ss;function ss(e){return e="full"==e?"full":"fast",ta.copy(ss[e])}function ns(e){var t=e.match(Ba);if(!t)return!1;var r=+t[1],i=+t[2],a=+t[3];return i>=1&&i<=12&&a>=1&&a<=(2==i&&function(e){return e%4==0&&(e%100!=0||e%400==0)}(r)?29:Ka[i])}function os(e,t){var r=e.match(Wa);if(!r)return!1;var i=r[1],a=r[2],s=r[3],n=r[5];return(i<=23&&a<=59&&s<=59||23==i&&59==a&&60==s)&&(!t||n)}ss.fast={date:/^\d\d\d\d-[0-1]\d-[0-3]\d$/,time:/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,"date-time":/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,uri:/^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,"uri-reference":/^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,"uri-template":Za,url:Xa,email:/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,hostname:Ya,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,ipv6:/^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,regex:us,uuid:es,"json-pointer":ts,"json-pointer-uri-fragment":rs,"relative-json-pointer":is},ss.full={date:ns,time:os,"date-time":function(e){var t=e.split(ls);return 2==t.length&&ns(t[0])&&os(t[1],!0)},uri:function(e){return cs.test(e)&&Ja.test(e)},"uri-reference":/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,"uri-template":Za,url:Xa,email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,hostname:Ya,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,ipv6:/^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,regex:us,uuid:es,"json-pointer":ts,"json-pointer-uri-fragment":rs,"relative-json-pointer":is};var ls=/t|\s/i;var cs=/\/|:/;var ds=/[^\\]\\Z/;function us(e){if(ds.test(e))return!1;try{return new RegExp(e),!0}catch(e){return!1}}var hs=function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o;var p="maximum"==t,m=p?"exclusiveMaximum":"exclusiveMinimum",v=e.schema[m],f=e.opts.$data&&v&&v.$data,g=p?"<":">",y=p?">":"<",_=void 0;if(!h&&"number"!=typeof o&&void 0!==o)throw new Error(t+" must be number");if(!f&&void 0!==v&&"number"!=typeof v&&"boolean"!=typeof v)throw new Error(m+" must be number or boolean");if(f){var b=e.util.getData(v.$data,n,e.dataPathArr),w="exclusive"+s,P="exclType"+s,E="exclIsNumber"+s,S="' + "+(k="op"+s)+" + '";a+=" var schemaExcl"+s+" = "+b+"; ",a+=" var "+w+"; var "+P+" = typeof "+(b="schemaExcl"+s)+"; if ("+P+" != 'boolean' && "+P+" != 'undefined' && "+P+" != 'number') { ";var x;_=m;(x=x||[]).push(a),a="",!1!==e.createErrors?(a+=" { keyword: '"+(_||"_exclusiveLimit")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: {} ",!1!==e.opts.messages&&(a+=" , message: '"+m+" should be boolean' "),e.opts.verbose&&(a+=" , schema: validate.schema"+l+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var $=a;a=x.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+$+"]); ":a+=" validate.errors = ["+$+"]; return false; ":a+=" var err = "+$+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } else if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),a+=" "+P+" == 'number' ? ( ("+w+" = "+i+" === undefined || "+b+" "+g+"= "+i+") ? "+u+" "+y+"= "+b+" : "+u+" "+y+" "+i+" ) : ( ("+w+" = "+b+" === true) ? "+u+" "+y+"= "+i+" : "+u+" "+y+" "+i+" ) || "+u+" !== "+u+") { var op"+s+" = "+w+" ? '"+g+"' : '"+g+"='; ",void 0===o&&(_=m,c=e.errSchemaPath+"/"+m,i=b,h=f)}else{S=g;if((E="number"==typeof v)&&h){var k="'"+S+"'";a+=" if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),a+=" ( "+i+" === undefined || "+v+" "+g+"= "+i+" ? "+u+" "+y+"= "+v+" : "+u+" "+y+" "+i+" ) || "+u+" !== "+u+") { "}else{E&&void 0===o?(w=!0,_=m,c=e.errSchemaPath+"/"+m,i=v,y+="="):(E&&(i=Math[p?"min":"max"](v,o)),v===(!E||i)?(w=!0,_=m,c=e.errSchemaPath+"/"+m,y+="="):(w=!1,S+="="));k="'"+S+"'";a+=" if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),a+=" "+u+" "+y+" "+i+" || "+u+" !== "+u+") { "}}_=_||t,(x=x||[]).push(a),a="",!1!==e.createErrors?(a+=" { keyword: '"+(_||"_limit")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { comparison: "+k+", limit: "+i+", exclusive: "+w+" } ",!1!==e.opts.messages&&(a+=" , message: 'should be "+S+" ",a+=h?"' + "+i:i+"'"),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";$=a;return a=x.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+$+"]); ":a+=" validate.errors = ["+$+"]; return false; ":a+=" var err = "+$+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } ",d&&(a+=" else { "),a},ps=function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;if(h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,!h&&"number"!=typeof o)throw new Error(t+" must be number");a+="if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),a+=" "+u+".length "+("maxItems"==t?">":"<")+" "+i+") { ";var p=t,m=m||[];m.push(a),a="",!1!==e.createErrors?(a+=" { keyword: '"+(p||"_limitItems")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { limit: "+i+" } ",!1!==e.opts.messages&&(a+=" , message: 'should NOT have ",a+="maxItems"==t?"more":"fewer",a+=" than ",a+=h?"' + "+i+" + '":""+o,a+=" items' "),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var v=a;return a=m.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+v+"]); ":a+=" validate.errors = ["+v+"]; return false; ":a+=" var err = "+v+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+="} ",d&&(a+=" else { "),a},ms=function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;if(h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,!h&&"number"!=typeof o)throw new Error(t+" must be number");var p="maxLength"==t?">":"<";a+="if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),!1===e.opts.unicode?a+=" "+u+".length ":a+=" ucs2length("+u+") ",a+=" "+p+" "+i+") { ";var m=t,v=v||[];v.push(a),a="",!1!==e.createErrors?(a+=" { keyword: '"+(m||"_limitLength")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { limit: "+i+" } ",!1!==e.opts.messages&&(a+=" , message: 'should NOT be ",a+="maxLength"==t?"longer":"shorter",a+=" than ",a+=h?"' + "+i+" + '":""+o,a+=" characters' "),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var f=a;return a=v.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+f+"]); ":a+=" validate.errors = ["+f+"]; return false; ":a+=" var err = "+f+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+="} ",d&&(a+=" else { "),a},vs=function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;if(h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,!h&&"number"!=typeof o)throw new Error(t+" must be number");a+="if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'number') || "),a+=" Object.keys("+u+").length "+("maxProperties"==t?">":"<")+" "+i+") { ";var p=t,m=m||[];m.push(a),a="",!1!==e.createErrors?(a+=" { keyword: '"+(p||"_limitProperties")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { limit: "+i+" } ",!1!==e.opts.messages&&(a+=" , message: 'should NOT have ",a+="maxProperties"==t?"more":"fewer",a+=" than ",a+=h?"' + "+i+" + '":""+o,a+=" properties' "),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var v=a;return a=m.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+v+"]); ":a+=" validate.errors = ["+v+"]; return false; ":a+=" var err = "+v+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+="} ",d&&(a+=" else { "),a},fs={$ref:function(e,t,r){var i,a,s=" ",n=e.level,o=e.dataLevel,l=e.schema[t],c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(o||""),h="valid"+n;if("#"==l||"#/"==l)e.isRoot?(i=e.async,a="validate"):(i=!0===e.root.schema.$async,a="root.refVal[0]");else{var p=e.resolveRef(e.baseId,l,e.isRoot);if(void 0===p){var m=e.MissingRefError.message(e.baseId,l);if("fail"==e.opts.missingRefs){e.logger.error(m),(y=y||[]).push(s),s="",!1!==e.createErrors?(s+=" { keyword: '$ref' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { ref: '"+e.util.escapeQuotes(l)+"' } ",!1!==e.opts.messages&&(s+=" , message: 'can\\'t resolve reference "+e.util.escapeQuotes(l)+"' "),e.opts.verbose&&(s+=" , schema: "+e.util.toQuotedString(l)+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),s+=" } "):s+=" {} ";var v=s;s=y.pop(),!e.compositeRule&&d?e.async?s+=" throw new ValidationError(["+v+"]); ":s+=" validate.errors = ["+v+"]; return false; ":s+=" var err = "+v+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",d&&(s+=" if (false) { ")}else{if("ignore"!=e.opts.missingRefs)throw new e.MissingRefError(e.baseId,l,m);e.logger.warn(m),d&&(s+=" if (true) { ")}}else if(p.inline){var f=e.util.copy(e);f.level++;var g="valid"+f.level;f.schema=p.schema,f.schemaPath="",f.errSchemaPath=l,s+=" "+e.validate(f).replace(/validate\.schema/g,p.code)+" ",d&&(s+=" if ("+g+") { ")}else i=!0===p.$async||e.async&&!1!==p.$async,a=p.code}if(a){var y;(y=y||[]).push(s),s="",e.opts.passContext?s+=" "+a+".call(this, ":s+=" "+a+"( ",s+=" "+u+", (dataPath || '')",'""'!=e.errorPath&&(s+=" + "+e.errorPath);var _=s+=" , "+(o?"data"+(o-1||""):"parentData")+" , "+(o?e.dataPathArr[o]:"parentDataProperty")+", rootData)  ";if(s=y.pop(),i){if(!e.async)throw new Error("async schema referenced by sync schema");d&&(s+=" var "+h+"; "),s+=" try { await "+_+"; ",d&&(s+=" "+h+" = true; "),s+=" } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ",d&&(s+=" "+h+" = false; "),s+=" } ",d&&(s+=" if ("+h+") { ")}else s+=" if (!"+_+") { if (vErrors === null) vErrors = "+a+".errors; else vErrors = vErrors.concat("+a+".errors); errors = vErrors.length; } ",d&&(s+=" else { ")}return s},allOf:function(e,t,r){var i=" ",a=e.schema[t],s=e.schemaPath+e.util.getProperty(t),n=e.errSchemaPath+"/"+t,o=!e.opts.allErrors,l=e.util.copy(e),c="";l.level++;var d="valid"+l.level,u=l.baseId,h=!0,p=a;if(p)for(var m,v=-1,f=p.length-1;v<f;)m=p[v+=1],(e.opts.strictKeywords?"object"==typeof m&&Object.keys(m).length>0:e.util.schemaHasRules(m,e.RULES.all))&&(h=!1,l.schema=m,l.schemaPath=s+"["+v+"]",l.errSchemaPath=n+"/"+v,i+="  "+e.validate(l)+" ",l.baseId=u,o&&(i+=" if ("+d+") { ",c+="}"));return o&&(i+=h?" if (true) { ":" "+c.slice(0,-1)+" "),i},anyOf:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h="errs__"+a,p=e.util.copy(e),m="";p.level++;var v="valid"+p.level;if(n.every((function(t){return e.opts.strictKeywords?"object"==typeof t&&Object.keys(t).length>0:e.util.schemaHasRules(t,e.RULES.all)}))){var f=p.baseId;i+=" var "+h+" = errors; var "+u+" = false;  ";var g=e.compositeRule;e.compositeRule=p.compositeRule=!0;var y=n;if(y)for(var _,b=-1,w=y.length-1;b<w;)_=y[b+=1],p.schema=_,p.schemaPath=o+"["+b+"]",p.errSchemaPath=l+"/"+b,i+="  "+e.validate(p)+" ",p.baseId=f,i+=" "+u+" = "+u+" || "+v+"; if (!"+u+") { ",m+="}";e.compositeRule=p.compositeRule=g,i+=" "+m+" if (!"+u+") {   var err =   ",!1!==e.createErrors?(i+=" { keyword: 'anyOf' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(i+=" , message: 'should match some schema in anyOf' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&c&&(e.async?i+=" throw new ValidationError(vErrors); ":i+=" validate.errors = vErrors; return false; "),i+=" } else {  errors = "+h+"; if (vErrors !== null) { if ("+h+") vErrors.length = "+h+"; else vErrors = null; } ",e.opts.allErrors&&(i+=" } ")}else c&&(i+=" if (true) { ");return i},$comment:function(e,t,r){var i=" ",a=e.schema[t],s=e.errSchemaPath+"/"+t,n=(e.opts.allErrors,e.util.toQuotedString(a));return!0===e.opts.$comment?i+=" console.log("+n+");":"function"==typeof e.opts.$comment&&(i+=" self._opts.$comment("+n+", "+e.util.toQuotedString(s)+", validate.root.schema);"),i},const:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h=e.opts.$data&&n&&n.$data;h&&(i+=" var schema"+a+" = "+e.util.getData(n.$data,s,e.dataPathArr)+"; "),h||(i+=" var schema"+a+" = validate.schema"+o+";"),i+="var "+u+" = equal("+d+", schema"+a+"); if (!"+u+") {   ";var p=p||[];p.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'const' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { allowedValue: schema"+a+" } ",!1!==e.opts.messages&&(i+=" , message: 'should be equal to constant' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var m=i;return i=p.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+m+"]); ":i+=" validate.errors = ["+m+"]; return false; ":i+=" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" }",c&&(i+=" else { "),i},contains:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h="errs__"+a,p=e.util.copy(e);p.level++;var m="valid"+p.level,v="i"+a,f=p.dataLevel=e.dataLevel+1,g="data"+f,y=e.baseId,_=e.opts.strictKeywords?"object"==typeof n&&Object.keys(n).length>0:e.util.schemaHasRules(n,e.RULES.all);if(i+="var "+h+" = errors;var "+u+";",_){var b=e.compositeRule;e.compositeRule=p.compositeRule=!0,p.schema=n,p.schemaPath=o,p.errSchemaPath=l,i+=" var "+m+" = false; for (var "+v+" = 0; "+v+" < "+d+".length; "+v+"++) { ",p.errorPath=e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers,!0);var w=d+"["+v+"]";p.dataPathArr[f]=v;var P=e.validate(p);p.baseId=y,e.util.varOccurences(P,g)<2?i+=" "+e.util.varReplace(P,g,w)+" ":i+=" var "+g+" = "+w+"; "+P+" ",i+=" if ("+m+") break; }  ",e.compositeRule=p.compositeRule=b,i+="  if (!"+m+") {"}else i+=" if ("+d+".length == 0) {";var E=E||[];E.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'contains' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(i+=" , message: 'should contain a valid item' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var S=i;return i=E.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+S+"]); ":i+=" validate.errors = ["+S+"]; return false; ":i+=" var err = "+S+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } else { ",_&&(i+="  errors = "+h+"; if (vErrors !== null) { if ("+h+") vErrors.length = "+h+"; else vErrors = null; } "),e.opts.allErrors&&(i+=" } "),i},dependencies:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="errs__"+a,h=e.util.copy(e),p="";h.level++;var m="valid"+h.level,v={},f={},g=e.opts.ownProperties;for(w in n)if("__proto__"!=w){var y=n[w],_=Array.isArray(y)?f:v;_[w]=y}i+="var "+u+" = errors;";var b=e.errorPath;for(var w in i+="var missing"+a+";",f)if((_=f[w]).length){if(i+=" if ( "+d+e.util.getProperty(w)+" !== undefined ",g&&(i+=" && Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(w)+"') "),c){i+=" && ( ";var P=_;if(P)for(var E=-1,S=P.length-1;E<S;){C=P[E+=1],E&&(i+=" || "),i+=" ( ( "+(F=d+(T=e.util.getProperty(C)))+" === undefined ",g&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(C)+"') "),i+=") && (missing"+a+" = "+e.util.toQuotedString(e.opts.jsonPointers?C:T)+") ) "}i+=")) {  ";var x="missing"+a,$="' + "+x+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.opts.jsonPointers?e.util.getPathExpr(b,x,!0):b+" + "+x);var k=k||[];k.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'dependencies' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { property: '"+e.util.escapeQuotes(w)+"', missingProperty: '"+$+"', depsCount: "+_.length+", deps: '"+e.util.escapeQuotes(1==_.length?_[0]:_.join(", "))+"' } ",!1!==e.opts.messages&&(i+=" , message: 'should have ",1==_.length?i+="property "+e.util.escapeQuotes(_[0]):i+="properties "+e.util.escapeQuotes(_.join(", ")),i+=" when property "+e.util.escapeQuotes(w)+" is present' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var O=i;i=k.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+O+"]); ":i+=" validate.errors = ["+O+"]; return false; ":i+=" var err = "+O+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}else{i+=" ) { ";var j=_;if(j)for(var C,D=-1,A=j.length-1;D<A;){C=j[D+=1];var T=e.util.getProperty(C),F=($=e.util.escapeQuotes(C),d+T);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(b,C,e.opts.jsonPointers)),i+=" if ( "+F+" === undefined ",g&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(C)+"') "),i+=") {  var err =   ",!1!==e.createErrors?(i+=" { keyword: 'dependencies' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { property: '"+e.util.escapeQuotes(w)+"', missingProperty: '"+$+"', depsCount: "+_.length+", deps: '"+e.util.escapeQuotes(1==_.length?_[0]:_.join(", "))+"' } ",!1!==e.opts.messages&&(i+=" , message: 'should have ",1==_.length?i+="property "+e.util.escapeQuotes(_[0]):i+="properties "+e.util.escapeQuotes(_.join(", ")),i+=" when property "+e.util.escapeQuotes(w)+" is present' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "}}i+=" }   ",c&&(p+="}",i+=" else { ")}e.errorPath=b;var z=h.baseId;for(var w in v){y=v[w];(e.opts.strictKeywords?"object"==typeof y&&Object.keys(y).length>0:e.util.schemaHasRules(y,e.RULES.all))&&(i+=" "+m+" = true; if ( "+d+e.util.getProperty(w)+" !== undefined ",g&&(i+=" && Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(w)+"') "),i+=") { ",h.schema=y,h.schemaPath=o+e.util.getProperty(w),h.errSchemaPath=l+"/"+e.util.escapeFragment(w),i+="  "+e.validate(h)+" ",h.baseId=z,i+=" }  ",c&&(i+=" if ("+m+") { ",p+="}"))}return c&&(i+="   "+p+" if ("+u+" == errors) {"),i},enum:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h=e.opts.$data&&n&&n.$data;h&&(i+=" var schema"+a+" = "+e.util.getData(n.$data,s,e.dataPathArr)+"; ");var p="i"+a,m="schema"+a;h||(i+=" var "+m+" = validate.schema"+o+";"),i+="var "+u+";",h&&(i+=" if (schema"+a+" === undefined) "+u+" = true; else if (!Array.isArray(schema"+a+")) "+u+" = false; else {"),i+=u+" = false;for (var "+p+"=0; "+p+"<"+m+".length; "+p+"++) if (equal("+d+", "+m+"["+p+"])) { "+u+" = true; break; }",h&&(i+="  }  "),i+=" if (!"+u+") {   ";var v=v||[];v.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'enum' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { allowedValues: schema"+a+" } ",!1!==e.opts.messages&&(i+=" , message: 'should be equal to one of the allowed values' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var f=i;return i=v.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+f+"]); ":i+=" validate.errors = ["+f+"]; return false; ":i+=" var err = "+f+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" }",c&&(i+=" else { "),i},format:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||"");if(!1===e.opts.format)return c&&(i+=" if (true) { "),i;var u,h=e.opts.$data&&n&&n.$data;h?(i+=" var schema"+a+" = "+e.util.getData(n.$data,s,e.dataPathArr)+"; ",u="schema"+a):u=n;var p=e.opts.unknownFormats,m=Array.isArray(p);if(h){i+=" var "+(v="format"+a)+" = formats["+u+"]; var "+(f="isObject"+a)+" = typeof "+v+" == 'object' && !("+v+" instanceof RegExp) && "+v+".validate; var "+(g="formatType"+a)+" = "+f+" && "+v+".type || 'string'; if ("+f+") { ",e.async&&(i+=" var async"+a+" = "+v+".async; "),i+=" "+v+" = "+v+".validate; } if (  ",h&&(i+=" ("+u+" !== undefined && typeof "+u+" != 'string') || "),i+=" (","ignore"!=p&&(i+=" ("+u+" && !"+v+" ",m&&(i+=" && self._opts.unknownFormats.indexOf("+u+") == -1 "),i+=") || "),i+=" ("+v+" && "+g+" == '"+r+"' && !(typeof "+v+" == 'function' ? ",e.async?i+=" (async"+a+" ? await "+v+"("+d+") : "+v+"("+d+")) ":i+=" "+v+"("+d+") ",i+=" : "+v+".test("+d+"))))) {"}else{var v;if(!(v=e.formats[n])){if("ignore"==p)return e.logger.warn('unknown format "'+n+'" ignored in schema at path "'+e.errSchemaPath+'"'),c&&(i+=" if (true) { "),i;if(m&&p.indexOf(n)>=0)return c&&(i+=" if (true) { "),i;throw new Error('unknown format "'+n+'" is used in schema at path "'+e.errSchemaPath+'"')}var f,g=(f="object"==typeof v&&!(v instanceof RegExp)&&v.validate)&&v.type||"string";if(f){var y=!0===v.async;v=v.validate}if(g!=r)return c&&(i+=" if (true) { "),i;if(y){if(!e.async)throw new Error("async format in sync schema");i+=" if (!(await "+(_="formats"+e.util.getProperty(n)+".validate")+"("+d+"))) { "}else{i+=" if (! ";var _="formats"+e.util.getProperty(n);f&&(_+=".validate"),i+="function"==typeof v?" "+_+"("+d+") ":" "+_+".test("+d+") ",i+=") { "}}var b=b||[];b.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'format' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { format:  ",i+=h?""+u:""+e.util.toQuotedString(n),i+="  } ",!1!==e.opts.messages&&(i+=" , message: 'should match format \"",i+=h?"' + "+u+" + '":""+e.util.escapeQuotes(n),i+="\"' "),e.opts.verbose&&(i+=" , schema:  ",i+=h?"validate.schema"+o:""+e.util.toQuotedString(n),i+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var w=i;return i=b.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+w+"]); ":i+=" validate.errors = ["+w+"]; return false; ":i+=" var err = "+w+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } ",c&&(i+=" else { "),i},if:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h="errs__"+a,p=e.util.copy(e);p.level++;var m="valid"+p.level,v=e.schema.then,f=e.schema.else,g=void 0!==v&&(e.opts.strictKeywords?"object"==typeof v&&Object.keys(v).length>0:e.util.schemaHasRules(v,e.RULES.all)),y=void 0!==f&&(e.opts.strictKeywords?"object"==typeof f&&Object.keys(f).length>0:e.util.schemaHasRules(f,e.RULES.all)),_=p.baseId;if(g||y){var b;p.createErrors=!1,p.schema=n,p.schemaPath=o,p.errSchemaPath=l,i+=" var "+h+" = errors; var "+u+" = true;  ";var w=e.compositeRule;e.compositeRule=p.compositeRule=!0,i+="  "+e.validate(p)+" ",p.baseId=_,p.createErrors=!0,i+="  errors = "+h+"; if (vErrors !== null) { if ("+h+") vErrors.length = "+h+"; else vErrors = null; }  ",e.compositeRule=p.compositeRule=w,g?(i+=" if ("+m+") {  ",p.schema=e.schema.then,p.schemaPath=e.schemaPath+".then",p.errSchemaPath=e.errSchemaPath+"/then",i+="  "+e.validate(p)+" ",p.baseId=_,i+=" "+u+" = "+m+"; ",g&&y?i+=" var "+(b="ifClause"+a)+" = 'then'; ":b="'then'",i+=" } ",y&&(i+=" else { ")):i+=" if (!"+m+") { ",y&&(p.schema=e.schema.else,p.schemaPath=e.schemaPath+".else",p.errSchemaPath=e.errSchemaPath+"/else",i+="  "+e.validate(p)+" ",p.baseId=_,i+=" "+u+" = "+m+"; ",g&&y?i+=" var "+(b="ifClause"+a)+" = 'else'; ":b="'else'",i+=" } "),i+=" if (!"+u+") {   var err =   ",!1!==e.createErrors?(i+=" { keyword: 'if' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { failingKeyword: "+b+" } ",!1!==e.opts.messages&&(i+=" , message: 'should match \"' + "+b+" + '\" schema' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&c&&(e.async?i+=" throw new ValidationError(vErrors); ":i+=" validate.errors = vErrors; return false; "),i+=" }   ",c&&(i+=" else { ")}else c&&(i+=" if (true) { ");return i},items:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h="errs__"+a,p=e.util.copy(e),m="";p.level++;var v="valid"+p.level,f="i"+a,g=p.dataLevel=e.dataLevel+1,y="data"+g,_=e.baseId;if(i+="var "+h+" = errors;var "+u+";",Array.isArray(n)){var b=e.schema.additionalItems;if(!1===b){i+=" "+u+" = "+d+".length <= "+n.length+"; ";var w=l;l=e.errSchemaPath+"/additionalItems",i+="  if (!"+u+") {   ";var P=P||[];P.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'additionalItems' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { limit: "+n.length+" } ",!1!==e.opts.messages&&(i+=" , message: 'should NOT have more than "+n.length+" items' "),e.opts.verbose&&(i+=" , schema: false , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var E=i;i=P.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+E+"]); ":i+=" validate.errors = ["+E+"]; return false; ":i+=" var err = "+E+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } ",l=w,c&&(m+="}",i+=" else { ")}var S=n;if(S)for(var x,$=-1,k=S.length-1;$<k;)if(x=S[$+=1],e.opts.strictKeywords?"object"==typeof x&&Object.keys(x).length>0:e.util.schemaHasRules(x,e.RULES.all)){i+=" "+v+" = true; if ("+d+".length > "+$+") { ";var O=d+"["+$+"]";p.schema=x,p.schemaPath=o+"["+$+"]",p.errSchemaPath=l+"/"+$,p.errorPath=e.util.getPathExpr(e.errorPath,$,e.opts.jsonPointers,!0),p.dataPathArr[g]=$;var j=e.validate(p);p.baseId=_,e.util.varOccurences(j,y)<2?i+=" "+e.util.varReplace(j,y,O)+" ":i+=" var "+y+" = "+O+"; "+j+" ",i+=" }  ",c&&(i+=" if ("+v+") { ",m+="}")}if("object"==typeof b&&(e.opts.strictKeywords?"object"==typeof b&&Object.keys(b).length>0:e.util.schemaHasRules(b,e.RULES.all))){p.schema=b,p.schemaPath=e.schemaPath+".additionalItems",p.errSchemaPath=e.errSchemaPath+"/additionalItems",i+=" "+v+" = true; if ("+d+".length > "+n.length+") {  for (var "+f+" = "+n.length+"; "+f+" < "+d+".length; "+f+"++) { ",p.errorPath=e.util.getPathExpr(e.errorPath,f,e.opts.jsonPointers,!0);O=d+"["+f+"]";p.dataPathArr[g]=f;j=e.validate(p);p.baseId=_,e.util.varOccurences(j,y)<2?i+=" "+e.util.varReplace(j,y,O)+" ":i+=" var "+y+" = "+O+"; "+j+" ",c&&(i+=" if (!"+v+") break; "),i+=" } }  ",c&&(i+=" if ("+v+") { ",m+="}")}}else if(e.opts.strictKeywords?"object"==typeof n&&Object.keys(n).length>0:e.util.schemaHasRules(n,e.RULES.all)){p.schema=n,p.schemaPath=o,p.errSchemaPath=l,i+="  for (var "+f+" = 0; "+f+" < "+d+".length; "+f+"++) { ",p.errorPath=e.util.getPathExpr(e.errorPath,f,e.opts.jsonPointers,!0);O=d+"["+f+"]";p.dataPathArr[g]=f;j=e.validate(p);p.baseId=_,e.util.varOccurences(j,y)<2?i+=" "+e.util.varReplace(j,y,O)+" ":i+=" var "+y+" = "+O+"; "+j+" ",c&&(i+=" if (!"+v+") break; "),i+=" }"}return c&&(i+=" "+m+" if ("+h+" == errors) {"),i},maximum:hs,minimum:hs,maxItems:ps,minItems:ps,maxLength:ms,minLength:ms,maxProperties:vs,minProperties:vs,multipleOf:function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;if(h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,!h&&"number"!=typeof o)throw new Error(t+" must be number");a+="var division"+s+";if (",h&&(a+=" "+i+" !== undefined && ( typeof "+i+" != 'number' || "),a+=" (division"+s+" = "+u+" / "+i+", ",e.opts.multipleOfPrecision?a+=" Math.abs(Math.round(division"+s+") - division"+s+") > 1e-"+e.opts.multipleOfPrecision+" ":a+=" division"+s+" !== parseInt(division"+s+") ",a+=" ) ",h&&(a+="  )  "),a+=" ) {   ";var p=p||[];p.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'multipleOf' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { multipleOf: "+i+" } ",!1!==e.opts.messages&&(a+=" , message: 'should be multiple of ",a+=h?"' + "+i:i+"'"),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var m=a;return a=p.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+m+"]); ":a+=" validate.errors = ["+m+"]; return false; ":a+=" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+="} ",d&&(a+=" else { "),a},not:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="errs__"+a,h=e.util.copy(e);h.level++;var p="valid"+h.level;if(e.opts.strictKeywords?"object"==typeof n&&Object.keys(n).length>0:e.util.schemaHasRules(n,e.RULES.all)){h.schema=n,h.schemaPath=o,h.errSchemaPath=l,i+=" var "+u+" = errors;  ";var m,v=e.compositeRule;e.compositeRule=h.compositeRule=!0,h.createErrors=!1,h.opts.allErrors&&(m=h.opts.allErrors,h.opts.allErrors=!1),i+=" "+e.validate(h)+" ",h.createErrors=!0,m&&(h.opts.allErrors=m),e.compositeRule=h.compositeRule=v,i+=" if ("+p+") {   ";var f=f||[];f.push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'not' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(i+=" , message: 'should NOT be valid' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var g=i;i=f.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+g+"]); ":i+=" validate.errors = ["+g+"]; return false; ":i+=" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } else {  errors = "+u+"; if (vErrors !== null) { if ("+u+") vErrors.length = "+u+"; else vErrors = null; } ",e.opts.allErrors&&(i+=" } ")}else i+="  var err =   ",!1!==e.createErrors?(i+=" { keyword: 'not' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(i+=" , message: 'should NOT be valid' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",c&&(i+=" if (false) { ");return i},oneOf:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h="errs__"+a,p=e.util.copy(e),m="";p.level++;var v="valid"+p.level,f=p.baseId,g="prevValid"+a,y="passingSchemas"+a;i+="var "+h+" = errors , "+g+" = false , "+u+" = false , "+y+" = null; ";var _=e.compositeRule;e.compositeRule=p.compositeRule=!0;var b=n;if(b)for(var w,P=-1,E=b.length-1;P<E;)w=b[P+=1],(e.opts.strictKeywords?"object"==typeof w&&Object.keys(w).length>0:e.util.schemaHasRules(w,e.RULES.all))?(p.schema=w,p.schemaPath=o+"["+P+"]",p.errSchemaPath=l+"/"+P,i+="  "+e.validate(p)+" ",p.baseId=f):i+=" var "+v+" = true; ",P&&(i+=" if ("+v+" && "+g+") { "+u+" = false; "+y+" = ["+y+", "+P+"]; } else { ",m+="}"),i+=" if ("+v+") { "+u+" = "+g+" = true; "+y+" = "+P+"; }";return e.compositeRule=p.compositeRule=_,i+=m+"if (!"+u+") {   var err =   ",!1!==e.createErrors?(i+=" { keyword: 'oneOf' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { passingSchemas: "+y+" } ",!1!==e.opts.messages&&(i+=" , message: 'should match exactly one schema in oneOf' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&c&&(e.async?i+=" throw new ValidationError(vErrors); ":i+=" validate.errors = vErrors; return false; "),i+="} else {  errors = "+h+"; if (vErrors !== null) { if ("+h+") vErrors.length = "+h+"; else vErrors = null; }",e.opts.allErrors&&(i+=" } "),i},pattern:function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h=e.opts.$data&&o&&o.$data;h?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,a+="if ( ",h&&(a+=" ("+i+" !== undefined && typeof "+i+" != 'string') || "),a+=" !"+(h?"(new RegExp("+i+"))":e.usePattern(o))+".test("+u+") ) {   ";var p=p||[];p.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'pattern' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { pattern:  ",a+=h?""+i:""+e.util.toQuotedString(o),a+="  } ",!1!==e.opts.messages&&(a+=" , message: 'should match pattern \"",a+=h?"' + "+i+" + '":""+e.util.escapeQuotes(o),a+="\"' "),e.opts.verbose&&(a+=" , schema:  ",a+=h?"validate.schema"+l:""+e.util.toQuotedString(o),a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var m=a;return a=p.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+m+"]); ":a+=" validate.errors = ["+m+"]; return false; ":a+=" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+="} ",d&&(a+=" else { "),a},properties:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="errs__"+a,h=e.util.copy(e),p="";h.level++;var m="valid"+h.level,v="key"+a,f="idx"+a,g=h.dataLevel=e.dataLevel+1,y="data"+g,_="dataProperties"+a,b=Object.keys(n||{}).filter(T),w=e.schema.patternProperties||{},P=Object.keys(w).filter(T),E=e.schema.additionalProperties,S=b.length||P.length,x=!1===E,$="object"==typeof E&&Object.keys(E).length,k=e.opts.removeAdditional,O=x||$||k,j=e.opts.ownProperties,C=e.baseId,D=e.schema.required;if(D&&(!e.opts.$data||!D.$data)&&D.length<e.opts.loopRequired)var A=e.util.toHash(D);function T(e){return"__proto__"!==e}if(i+="var "+u+" = errors;var "+m+" = true;",j&&(i+=" var "+_+" = undefined;"),O){if(i+=j?" "+_+" = "+_+" || Object.keys("+d+"); for (var "+f+"=0; "+f+"<"+_+".length; "+f+"++) { var "+v+" = "+_+"["+f+"]; ":" for (var "+v+" in "+d+") { ",S){if(i+=" var isAdditional"+a+" = !(false ",b.length)if(b.length>8)i+=" || validate.schema"+o+".hasOwnProperty("+v+") ";else{var F=b;if(F)for(var z=-1,N=F.length-1;z<N;)W=F[z+=1],i+=" || "+v+" == "+e.util.toQuotedString(W)+" "}if(P.length){var R=P;if(R)for(var I=-1,M=R.length-1;I<M;)se=R[I+=1],i+=" || "+e.usePattern(se)+".test("+v+") "}i+=" ); if (isAdditional"+a+") { "}if("all"==k)i+=" delete "+d+"["+v+"]; ";else{var L=e.errorPath,U="' + "+v+" + '";if(e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers)),x)if(k)i+=" delete "+d+"["+v+"]; ";else{i+=" "+m+" = false; ";var V=l;l=e.errSchemaPath+"/additionalProperties",(re=re||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'additionalProperties' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { additionalProperty: '"+U+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is an invalid additional property":i+="should NOT have additional properties",i+="' "),e.opts.verbose&&(i+=" , schema: false , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var q=i;i=re.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+q+"]); ":i+=" validate.errors = ["+q+"]; return false; ":i+=" var err = "+q+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",l=V,c&&(i+=" break; ")}else if($)if("failing"==k){i+=" var "+u+" = errors;  ";var H=e.compositeRule;e.compositeRule=h.compositeRule=!0,h.schema=E,h.schemaPath=e.schemaPath+".additionalProperties",h.errSchemaPath=e.errSchemaPath+"/additionalProperties",h.errorPath=e.opts._errorDataPathProperty?e.errorPath:e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers);var G=d+"["+v+"]";h.dataPathArr[g]=v;var Q=e.validate(h);h.baseId=C,e.util.varOccurences(Q,y)<2?i+=" "+e.util.varReplace(Q,y,G)+" ":i+=" var "+y+" = "+G+"; "+Q+" ",i+=" if (!"+m+") { errors = "+u+"; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete "+d+"["+v+"]; }  ",e.compositeRule=h.compositeRule=H}else{h.schema=E,h.schemaPath=e.schemaPath+".additionalProperties",h.errSchemaPath=e.errSchemaPath+"/additionalProperties",h.errorPath=e.opts._errorDataPathProperty?e.errorPath:e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers);G=d+"["+v+"]";h.dataPathArr[g]=v;Q=e.validate(h);h.baseId=C,e.util.varOccurences(Q,y)<2?i+=" "+e.util.varReplace(Q,y,G)+" ":i+=" var "+y+" = "+G+"; "+Q+" ",c&&(i+=" if (!"+m+") break; ")}e.errorPath=L}S&&(i+=" } "),i+=" }  ",c&&(i+=" if ("+m+") { ",p+="}")}var B=e.opts.useDefaults&&!e.compositeRule;if(b.length){var K=b;if(K)for(var W,Y=-1,J=K.length-1;Y<J;){var Z=n[W=K[Y+=1]];if(e.opts.strictKeywords?"object"==typeof Z&&Object.keys(Z).length>0:e.util.schemaHasRules(Z,e.RULES.all)){var X=e.util.getProperty(W),ee=(G=d+X,B&&void 0!==Z.default);h.schema=Z,h.schemaPath=o+X,h.errSchemaPath=l+"/"+e.util.escapeFragment(W),h.errorPath=e.util.getPath(e.errorPath,W,e.opts.jsonPointers),h.dataPathArr[g]=e.util.toQuotedString(W);Q=e.validate(h);if(h.baseId=C,e.util.varOccurences(Q,y)<2){Q=e.util.varReplace(Q,y,G);var te=G}else{te=y;i+=" var "+y+" = "+G+"; "}if(ee)i+=" "+Q+" ";else{if(A&&A[W]){i+=" if ( "+te+" === undefined ",j&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(W)+"') "),i+=") { "+m+" = false; ";L=e.errorPath,V=l;var re,ie=e.util.escapeQuotes(W);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(L,W,e.opts.jsonPointers)),l=e.errSchemaPath+"/required",(re=re||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+ie+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+ie+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";q=i;i=re.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+q+"]); ":i+=" validate.errors = ["+q+"]; return false; ":i+=" var err = "+q+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",l=V,e.errorPath=L,i+=" } else { "}else c?(i+=" if ( "+te+" === undefined ",j&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(W)+"') "),i+=") { "+m+" = true; } else { "):(i+=" if ("+te+" !== undefined ",j&&(i+=" &&   Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(W)+"') "),i+=" ) { ");i+=" "+Q+" } "}}c&&(i+=" if ("+m+") { ",p+="}")}}if(P.length){var ae=P;if(ae)for(var se,ne=-1,oe=ae.length-1;ne<oe;){Z=w[se=ae[ne+=1]];if(e.opts.strictKeywords?"object"==typeof Z&&Object.keys(Z).length>0:e.util.schemaHasRules(Z,e.RULES.all)){h.schema=Z,h.schemaPath=e.schemaPath+".patternProperties"+e.util.getProperty(se),h.errSchemaPath=e.errSchemaPath+"/patternProperties/"+e.util.escapeFragment(se),i+=j?" "+_+" = "+_+" || Object.keys("+d+"); for (var "+f+"=0; "+f+"<"+_+".length; "+f+"++) { var "+v+" = "+_+"["+f+"]; ":" for (var "+v+" in "+d+") { ",i+=" if ("+e.usePattern(se)+".test("+v+")) { ",h.errorPath=e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers);G=d+"["+v+"]";h.dataPathArr[g]=v;Q=e.validate(h);h.baseId=C,e.util.varOccurences(Q,y)<2?i+=" "+e.util.varReplace(Q,y,G)+" ":i+=" var "+y+" = "+G+"; "+Q+" ",c&&(i+=" if (!"+m+") break; "),i+=" } ",c&&(i+=" else "+m+" = true; "),i+=" }  ",c&&(i+=" if ("+m+") { ",p+="}")}}}return c&&(i+=" "+p+" if ("+u+" == errors) {"),i},propertyNames:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="errs__"+a,h=e.util.copy(e);h.level++;var p="valid"+h.level;if(i+="var "+u+" = errors;",e.opts.strictKeywords?"object"==typeof n&&Object.keys(n).length>0:e.util.schemaHasRules(n,e.RULES.all)){h.schema=n,h.schemaPath=o,h.errSchemaPath=l;var m="key"+a,v="idx"+a,f="i"+a,g="' + "+m+" + '",y="data"+(h.dataLevel=e.dataLevel+1),_="dataProperties"+a,b=e.opts.ownProperties,w=e.baseId;b&&(i+=" var "+_+" = undefined; "),i+=b?" "+_+" = "+_+" || Object.keys("+d+"); for (var "+v+"=0; "+v+"<"+_+".length; "+v+"++) { var "+m+" = "+_+"["+v+"]; ":" for (var "+m+" in "+d+") { ",i+=" var startErrs"+a+" = errors; ";var P=m,E=e.compositeRule;e.compositeRule=h.compositeRule=!0;var S=e.validate(h);h.baseId=w,e.util.varOccurences(S,y)<2?i+=" "+e.util.varReplace(S,y,P)+" ":i+=" var "+y+" = "+P+"; "+S+" ",e.compositeRule=h.compositeRule=E,i+=" if (!"+p+") { for (var "+f+"=startErrs"+a+"; "+f+"<errors; "+f+"++) { vErrors["+f+"].propertyName = "+m+"; }   var err =   ",!1!==e.createErrors?(i+=" { keyword: 'propertyNames' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { propertyName: '"+g+"' } ",!1!==e.opts.messages&&(i+=" , message: 'property name \\'"+g+"\\' is invalid' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&c&&(e.async?i+=" throw new ValidationError(vErrors); ":i+=" validate.errors = vErrors; return false; "),c&&(i+=" break; "),i+=" } }"}return c&&(i+="  if ("+u+" == errors) {"),i},required:function(e,t,r){var i=" ",a=e.level,s=e.dataLevel,n=e.schema[t],o=e.schemaPath+e.util.getProperty(t),l=e.errSchemaPath+"/"+t,c=!e.opts.allErrors,d="data"+(s||""),u="valid"+a,h=e.opts.$data&&n&&n.$data;h&&(i+=" var schema"+a+" = "+e.util.getData(n.$data,s,e.dataPathArr)+"; ");var p="schema"+a;if(!h)if(n.length<e.opts.loopRequired&&e.schema.properties&&Object.keys(e.schema.properties).length){var m=[],v=n;if(v)for(var f,g=-1,y=v.length-1;g<y;){f=v[g+=1];var _=e.schema.properties[f];_&&(e.opts.strictKeywords?"object"==typeof _&&Object.keys(_).length>0:e.util.schemaHasRules(_,e.RULES.all))||(m[m.length]=f)}}else m=n;if(h||m.length){var b=e.errorPath,w=h||m.length>=e.opts.loopRequired,P=e.opts.ownProperties;if(c)if(i+=" var missing"+a+"; ",w){h||(i+=" var "+p+" = validate.schema"+o+"; ");var E="' + "+(j="schema"+a+"["+($="i"+a)+"]")+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(b,j,e.opts.jsonPointers)),i+=" var "+u+" = true; ",h&&(i+=" if (schema"+a+" === undefined) "+u+" = true; else if (!Array.isArray(schema"+a+")) "+u+" = false; else {"),i+=" for (var "+$+" = 0; "+$+" < "+p+".length; "+$+"++) { "+u+" = "+d+"["+p+"["+$+"]] !== undefined ",P&&(i+=" &&   Object.prototype.hasOwnProperty.call("+d+", "+p+"["+$+"]) "),i+="; if (!"+u+") break; } ",h&&(i+="  }  "),i+="  if (!"+u+") {   ",(O=O||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+E+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+E+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";var S=i;i=O.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+S+"]); ":i+=" validate.errors = ["+S+"]; return false; ":i+=" var err = "+S+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } else { "}else{i+=" if ( ";var x=m;if(x)for(var $=-1,k=x.length-1;$<k;){D=x[$+=1],$&&(i+=" || "),i+=" ( ( "+(z=d+(F=e.util.getProperty(D)))+" === undefined ",P&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(D)+"') "),i+=") && (missing"+a+" = "+e.util.toQuotedString(e.opts.jsonPointers?D:F)+") ) "}i+=") {  ";var O;E="' + "+(j="missing"+a)+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.opts.jsonPointers?e.util.getPathExpr(b,j,!0):b+" + "+j),(O=O||[]).push(i),i="",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+E+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+E+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ";S=i;i=O.pop(),!e.compositeRule&&c?e.async?i+=" throw new ValidationError(["+S+"]); ":i+=" validate.errors = ["+S+"]; return false; ":i+=" var err = "+S+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",i+=" } else { "}else if(w){h||(i+=" var "+p+" = validate.schema"+o+"; ");var j;E="' + "+(j="schema"+a+"["+($="i"+a)+"]")+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(b,j,e.opts.jsonPointers)),h&&(i+=" if ("+p+" && !Array.isArray("+p+")) {  var err =   ",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+E+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+E+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if ("+p+" !== undefined) { "),i+=" for (var "+$+" = 0; "+$+" < "+p+".length; "+$+"++) { if ("+d+"["+p+"["+$+"]] === undefined ",P&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", "+p+"["+$+"]) "),i+=") {  var err =   ",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+E+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+E+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ",h&&(i+="  }  ")}else{var C=m;if(C)for(var D,A=-1,T=C.length-1;A<T;){D=C[A+=1];var F=e.util.getProperty(D),z=(E=e.util.escapeQuotes(D),d+F);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(b,D,e.opts.jsonPointers)),i+=" if ( "+z+" === undefined ",P&&(i+=" || ! Object.prototype.hasOwnProperty.call("+d+", '"+e.util.escapeQuotes(D)+"') "),i+=") {  var err =   ",!1!==e.createErrors?(i+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+E+"' } ",!1!==e.opts.messages&&(i+=" , message: '",e.opts._errorDataPathProperty?i+="is a required property":i+="should have required property \\'"+E+"\\'",i+="' "),e.opts.verbose&&(i+=" , schema: validate.schema"+o+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),i+=" } "):i+=" {} ",i+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "}}e.errorPath=b}else c&&(i+=" if (true) {");return i},uniqueItems:function(e,t,r){var i,a=" ",s=e.level,n=e.dataLevel,o=e.schema[t],l=e.schemaPath+e.util.getProperty(t),c=e.errSchemaPath+"/"+t,d=!e.opts.allErrors,u="data"+(n||""),h="valid"+s,p=e.opts.$data&&o&&o.$data;if(p?(a+=" var schema"+s+" = "+e.util.getData(o.$data,n,e.dataPathArr)+"; ",i="schema"+s):i=o,(o||p)&&!1!==e.opts.uniqueItems){p&&(a+=" var "+h+"; if ("+i+" === false || "+i+" === undefined) "+h+" = true; else if (typeof "+i+" != 'boolean') "+h+" = false; else { "),a+=" var i = "+u+".length , "+h+" = true , j; if (i > 1) { ";var m=e.schema.items&&e.schema.items.type,v=Array.isArray(m);if(!m||"object"==m||"array"==m||v&&(m.indexOf("object")>=0||m.indexOf("array")>=0))a+=" outer: for (;i--;) { for (j = i; j--;) { if (equal("+u+"[i], "+u+"[j])) { "+h+" = false; break outer; } } } ";else{a+=" var itemIndices = {}, item; for (;i--;) { var item = "+u+"[i]; ";var f="checkDataType"+(v?"s":"");a+=" if ("+e.util[f](m,"item",e.opts.strictNumbers,!0)+") continue; ",v&&(a+=" if (typeof item == 'string') item = '\"' + item; "),a+=" if (typeof itemIndices[item] == 'number') { "+h+" = false; j = itemIndices[item]; break; } itemIndices[item] = i; } "}a+=" } ",p&&(a+="  }  "),a+=" if (!"+h+") {   ";var g=g||[];g.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'uniqueItems' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { i: i, j: j } ",!1!==e.opts.messages&&(a+=" , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "),e.opts.verbose&&(a+=" , schema:  ",a+=p?"validate.schema"+l:""+o,a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+u+" "),a+=" } "):a+=" {} ";var y=a;a=g.pop(),!e.compositeRule&&d?e.async?a+=" throw new ValidationError(["+y+"]); ":a+=" validate.errors = ["+y+"]; return false; ":a+=" var err = "+y+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } ",d&&(a+=" else { ")}else d&&(a+=" if (true) { ");return a},validate:Fa},gs=ta.toHash,ys=["multipleOf","maximum","exclusiveMaximum","minimum","exclusiveMinimum","maxLength","minLength","pattern","additionalItems","maxItems","minItems","uniqueItems","maxProperties","minProperties","required","additionalProperties","enum","format","const"],_s=function(e,t){for(var r=0;r<t.length;r++){e=JSON.parse(JSON.stringify(e));var i,a=t[r].split("/"),s=e;for(i=1;i<a.length;i++)s=s[a[i]];for(i=0;i<ys.length;i++){var n=ys[i],o=s[n];o&&(s[n]={anyOf:[o,{$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"}]})}}return e},bs=Ca.MissingRef,ws=function e(t,r,i){var a=this;if("function"!=typeof this._opts.loadSchema)throw new Error("options.loadSchema should be a function");"function"==typeof r&&(i=r,r=void 0);var s=n(t).then((function(){var e=a._addSchema(t,void 0,r);return e.validate||function e(t){try{return a._compile(t)}catch(e){if(e instanceof bs)return i(e);throw e}function i(i){var s=i.missingSchema;if(c(s))throw new Error("Schema "+s+" is loaded but "+i.missingRef+" cannot be resolved");var o=a._loadingSchemas[s];return o||(o=a._loadingSchemas[s]=a._opts.loadSchema(s)).then(l,l),o.then((function(e){if(!c(s))return n(e).then((function(){c(s)||a.addSchema(e,s,void 0,r)}))})).then((function(){return e(t)}));function l(){delete a._loadingSchemas[s]}function c(e){return a._refs[e]||a._schemas[e]}}}(e)}));i&&s.then((function(e){i(null,e)}),i);return s;function n(t){var r=t.$schema;return r&&!a.getSchema(r)?e.call(a,{$ref:r},!0):Promise.resolve()}};var Ps=function(e,t,r){var i,a,s=" ",n=e.level,o=e.dataLevel,l=e.schema[t],c=e.schemaPath+e.util.getProperty(t),d=e.errSchemaPath+"/"+t,u=!e.opts.allErrors,h="data"+(o||""),p="valid"+n,m="errs__"+n,v=e.opts.$data&&l&&l.$data;v?(s+=" var schema"+n+" = "+e.util.getData(l.$data,o,e.dataPathArr)+"; ",a="schema"+n):a=l;var f,g,y,_,b,w="definition"+n,P=this.definition,E="";if(v&&P.$data){b="keywordValidate"+n;var S=P.validateSchema;s+=" var "+w+" = RULES.custom['"+t+"'].definition; var "+b+" = "+w+".validate;"}else{if(!(_=e.useCustomRule(this,l,e.schema,e)))return;a="validate.schema"+c,b=_.code,f=P.compile,g=P.inline,y=P.macro}var x=b+".errors",$="i"+n,k="ruleErr"+n,O=P.async;if(O&&!e.async)throw new Error("async keyword in sync schema");if(g||y||(s+=x+" = null;"),s+="var "+m+" = errors;var "+p+";",v&&P.$data&&(E+="}",s+=" if ("+a+" === undefined) { "+p+" = true; } else { ",S&&(E+="}",s+=" "+p+" = "+w+".validateSchema("+a+"); if ("+p+") { ")),g)P.statements?s+=" "+_.validate+" ":s+=" "+p+" = "+_.validate+"; ";else if(y){var j=e.util.copy(e);E="";j.level++;var C="valid"+j.level;j.schema=_.validate,j.schemaPath="";var D=e.compositeRule;e.compositeRule=j.compositeRule=!0;var A=e.validate(j).replace(/validate\.schema/g,b);e.compositeRule=j.compositeRule=D,s+=" "+A}else{(N=N||[]).push(s),s="",s+="  "+b+".call( ",e.opts.passContext?s+="this":s+="self",f||!1===P.schema?s+=" , "+h+" ":s+=" , "+a+" , "+h+" , validate.schema"+e.schemaPath+" ",s+=" , (dataPath || '')",'""'!=e.errorPath&&(s+=" + "+e.errorPath);var T=o?"data"+(o-1||""):"parentData",F=o?e.dataPathArr[o]:"parentDataProperty",z=s+=" , "+T+" , "+F+" , rootData )  ";s=N.pop(),!1===P.errors?(s+=" "+p+" = ",O&&(s+="await "),s+=z+"; "):s+=O?" var "+(x="customErrors"+n)+" = null; try { "+p+" = await "+z+"; } catch (e) { "+p+" = false; if (e instanceof ValidationError) "+x+" = e.errors; else throw e; } ":" "+x+" = null; "+p+" = "+z+"; "}if(P.modifying&&(s+=" if ("+T+") "+h+" = "+T+"["+F+"];"),s+=""+E,P.valid)u&&(s+=" if (true) { ");else{var N;s+=" if ( ",void 0===P.valid?(s+=" !",s+=y?""+C:""+p):s+=" "+!P.valid+" ",s+=") { ",i=this.keyword,(N=N||[]).push(s),s="",(N=N||[]).push(s),s="",!1!==e.createErrors?(s+=" { keyword: '"+(i||"custom")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(d)+" , params: { keyword: '"+this.keyword+"' } ",!1!==e.opts.messages&&(s+=" , message: 'should pass \""+this.keyword+"\" keyword validation' "),e.opts.verbose&&(s+=" , schema: validate.schema"+c+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var R=s;s=N.pop(),!e.compositeRule&&u?e.async?s+=" throw new ValidationError(["+R+"]); ":s+=" validate.errors = ["+R+"]; return false; ":s+=" var err = "+R+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";var I=s;s=N.pop(),g?P.errors?"full"!=P.errors&&(s+="  for (var "+$+"="+m+"; "+$+"<errors; "+$+"++) { var "+k+" = vErrors["+$+"]; if ("+k+".dataPath === undefined) "+k+".dataPath = (dataPath || '') + "+e.errorPath+"; if ("+k+".schemaPath === undefined) { "+k+'.schemaPath = "'+d+'"; } ',e.opts.verbose&&(s+=" "+k+".schema = "+a+"; "+k+".data = "+h+"; "),s+=" } "):!1===P.errors?s+=" "+I+" ":(s+=" if ("+m+" == errors) { "+I+" } else {  for (var "+$+"="+m+"; "+$+"<errors; "+$+"++) { var "+k+" = vErrors["+$+"]; if ("+k+".dataPath === undefined) "+k+".dataPath = (dataPath || '') + "+e.errorPath+"; if ("+k+".schemaPath === undefined) { "+k+'.schemaPath = "'+d+'"; } ',e.opts.verbose&&(s+=" "+k+".schema = "+a+"; "+k+".data = "+h+"; "),s+=" } } "):y?(s+="   var err =   ",!1!==e.createErrors?(s+=" { keyword: '"+(i||"custom")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(d)+" , params: { keyword: '"+this.keyword+"' } ",!1!==e.opts.messages&&(s+=" , message: 'should pass \""+this.keyword+"\" keyword validation' "),e.opts.verbose&&(s+=" , schema: validate.schema"+c+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ",s+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&u&&(e.async?s+=" throw new ValidationError(vErrors); ":s+=" validate.errors = vErrors; return false; ")):!1===P.errors?s+=" "+I+" ":(s+=" if (Array.isArray("+x+")) { if (vErrors === null) vErrors = "+x+"; else vErrors = vErrors.concat("+x+"); errors = vErrors.length;  for (var "+$+"="+m+"; "+$+"<errors; "+$+"++) { var "+k+" = vErrors["+$+"]; if ("+k+".dataPath === undefined) "+k+".dataPath = (dataPath || '') + "+e.errorPath+";  "+k+'.schemaPath = "'+d+'";  ',e.opts.verbose&&(s+=" "+k+".schema = "+a+"; "+k+".data = "+h+"; "),s+=" } } else { "+I+" } "),s+=" } ",u&&(s+=" else { ")}return s},Es={$schema:"http://json-schema.org/draft-07/schema#",$id:"http://json-schema.org/draft-07/schema#",title:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},type:["object","boolean"],properties:{$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},$comment:{type:"string"},title:{type:"string"},description:{type:"string"},default:!0,readOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},propertyNames:{format:"regex"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{type:"array",items:!0,minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},contentMediaType:{type:"string"},contentEncoding:{type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},default:!0},Ss={$id:"https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js",definitions:{simpleTypes:Es.definitions.simpleTypes},type:"object",dependencies:{schema:["validate"],$data:["validate"],statements:["inline"],valid:{not:{required:["macro"]}}},properties:{type:Es.properties.type,schema:{type:"boolean"},statements:{type:"boolean"},dependencies:{type:"array",items:{type:"string"}},metaSchema:{type:"object"},modifying:{type:"boolean"},valid:{type:"boolean"},$data:{type:"boolean"},async:{type:"boolean"},errors:{anyOf:[{type:"boolean"},{const:"full"}]}}},xs=/^[a-z_$][a-z0-9_$-]*$/i,$s=function(e,t){var r=this.RULES;if(r.keywords[e])throw new Error("Keyword "+e+" is already defined");if(!xs.test(e))throw new Error("Keyword "+e+" is not a valid identifier");if(t){this.validateKeyword(t,!0);var i=t.type;if(Array.isArray(i))for(var a=0;a<i.length;a++)n(e,i[a],t);else n(e,i,t);var s=t.metaSchema;s&&(t.$data&&this._opts.$data&&(s={anyOf:[s,{$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"}]}),t.validateSchema=this.compile(s,!0))}function n(e,t,i){for(var a,s=0;s<r.length;s++){var n=r[s];if(n.type==t){a=n;break}}a||(a={type:t,rules:[]},r.push(a));var o={keyword:e,definition:i,custom:!0,code:Ps,implements:i.implements};a.rules.push(o),r.custom[e]=o}return r.keywords[e]=r.all[e]=!0,this},ks=function(e){var t=this.RULES.custom[e];return t?t.definition:this.RULES.keywords[e]||!1},Os=function(e){var t=this.RULES;delete t.keywords[e],delete t.all[e],delete t.custom[e];for(var r=0;r<t.length;r++)for(var i=t[r].rules,a=0;a<i.length;a++)if(i[a].keyword==e){i.splice(a,1);break}return this},js=function e(t,r){e.errors=null;var i=this._validateKeyword=this._validateKeyword||this.compile(Ss,!0);if(i(t))return!0;if(e.errors=i.errors,r)throw new Error("custom keyword definition is invalid: "+this.errorsText(i.errors));return!1};var Cs={$schema:"http://json-schema.org/draft-07/schema#",$id:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON Schema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1},Ds=zs;zs.prototype.validate=function(e,t){var r;if("string"==typeof e){if(!(r=this.getSchema(e)))throw new Error('no schema with key or ref "'+e+'"')}else{var i=this._addSchema(e);r=i.validate||this._compile(i)}var a=r(t);!0!==r.$async&&(this.errors=r.errors);return a},zs.prototype.compile=function(e,t){var r=this._addSchema(e,void 0,t);return r.validate||this._compile(r)},zs.prototype.addSchema=function(e,t,r,i){if(Array.isArray(e)){for(var a=0;a<e.length;a++)this.addSchema(e[a],void 0,r,i);return this}var s=this._getId(e);if(void 0!==s&&"string"!=typeof s)throw new Error("schema id must be string");return Us(this,t=ga.normalizeId(t||s)),this._schemas[t]=this._addSchema(e,r,i,!0),this},zs.prototype.addMetaSchema=function(e,t,r){return this.addSchema(e,t,r,!0),this},zs.prototype.validateSchema=function(e,t){var r=e.$schema;if(void 0!==r&&"string"!=typeof r)throw new Error("$schema must be a string");if(!(r=r||this._opts.defaultMeta||function(e){var t=e._opts.meta;return e._opts.defaultMeta="object"==typeof t?e._getId(t)||t:e.getSchema(As)?As:void 0,e._opts.defaultMeta}(this)))return this.logger.warn("meta-schema not available"),this.errors=null,!0;var i=this.validate(r,e);if(!i&&t){var a="schema is invalid: "+this.errorsText();if("log"!=this._opts.validateSchema)throw new Error(a);this.logger.error(a)}return i},zs.prototype.getSchema=function(e){var t=Ns(this,e);switch(typeof t){case"object":return t.validate||this._compile(t);case"string":return this.getSchema(t);case"undefined":return function(e,t){var r=ga.schema.call(e,{schema:{}},t);if(r){var i=r.schema,a=r.root,s=r.baseId,n=Ra.call(e,i,a,void 0,s);return e._fragments[t]=new va({ref:t,fragment:!0,schema:i,root:a,baseId:s,validate:n}),n}}(this,e)}},zs.prototype.removeSchema=function(e){if(e instanceof RegExp)return Rs(this,this._schemas,e),Rs(this,this._refs,e),this;switch(typeof e){case"undefined":return Rs(this,this._schemas),Rs(this,this._refs),this._cache.clear(),this;case"string":var t=Ns(this,e);return t&&this._cache.del(t.cacheKey),delete this._schemas[e],delete this._refs[e],this;case"object":var r=this._opts.serialize,i=r?r(e):e;this._cache.del(i);var a=this._getId(e);a&&(a=ga.normalizeId(a),delete this._schemas[a],delete this._refs[a])}return this},zs.prototype.addFormat=function(e,t){"string"==typeof t&&(t=new RegExp(t));return this._formats[e]=t,this},zs.prototype.errorsText=function(e,t){if(!(e=e||this.errors))return"No errors";for(var r=void 0===(t=t||{}).separator?", ":t.separator,i=void 0===t.dataVar?"data":t.dataVar,a="",s=0;s<e.length;s++){var n=e[s];n&&(a+=i+n.dataPath+" "+n.message+r)}return a.slice(0,-r.length)},zs.prototype._addSchema=function(e,t,r,i){if("object"!=typeof e&&"boolean"!=typeof e)throw new Error("schema should be object or boolean");var a=this._opts.serialize,s=a?a(e):e,n=this._cache.get(s);if(n)return n;i=i||!1!==this._opts.addUsedSchema;var o=ga.normalizeId(this._getId(e));o&&i&&Us(this,o);var l,c=!1!==this._opts.validateSchema&&!t;c&&!(l=o&&o==ga.normalizeId(e.$schema))&&this.validateSchema(e,!0);var d=ga.ids.call(this,e),u=new va({id:o,schema:e,localRefs:d,cacheKey:s,meta:r});"#"!=o[0]&&i&&(this._refs[o]=u);this._cache.put(s,u),c&&l&&this.validateSchema(e,!0);return u},zs.prototype._compile=function(e,t){if(e.compiling)return e.validate=a,a.schema=e.schema,a.errors=null,a.root=t||a,!0===e.schema.$async&&(a.$async=!0),a;var r,i;e.compiling=!0,e.meta&&(r=this._opts,this._opts=this._metaOpts);try{i=Ra.call(this,e.schema,t,e.localRefs)}catch(t){throw delete e.validate,t}finally{e.compiling=!1,e.meta&&(this._opts=r)}return e.validate=i,e.refs=i.refs,e.refVal=i.refVal,e.root=i.root,i;function a(){var t=e.validate,r=t.apply(this,arguments);return a.errors=t.errors,r}},zs.prototype.compileAsync=ws,zs.prototype.addKeyword=$s,zs.prototype.getKeyword=ks,zs.prototype.removeKeyword=Os,zs.prototype.validateKeyword=js,zs.ValidationError=Ca.Validation,zs.MissingRefError=Ca.MissingRef,zs.$dataMetaSchema=_s;var As="http://json-schema.org/draft-07/schema",Ts=["removeAdditional","useDefaults","coerceTypes","strictDefaults"],Fs=["/properties"];function zs(e){if(!(this instanceof zs))return new zs(e);var t,r;e=this._opts=ta.copy(e)||{},function(e){var t=e._opts.logger;if(!1===t)e.logger={log:Vs,warn:Vs,error:Vs};else{if(void 0===t&&(t=console),!("object"==typeof t&&t.log&&t.warn&&t.error))throw new Error("logger must implement log, warn and error methods");e.logger=t}}(this),this._schemas={},this._refs={},this._fragments={},this._formats=as(e.format),this._cache=e.cache||new Qa,this._loadingSchemas={},this._compilations=[],this.RULES=((t=[{type:"number",rules:[{maximum:["exclusiveMaximum"]},{minimum:["exclusiveMinimum"]},"multipleOf","format"]},{type:"string",rules:["maxLength","minLength","pattern","format"]},{type:"array",rules:["maxItems","minItems","items","contains","uniqueItems"]},{type:"object",rules:["maxProperties","minProperties","required","dependencies","propertyNames",{properties:["additionalProperties","patternProperties"]}]},{rules:["$ref","const","enum","not","anyOf","oneOf","allOf","if"]}]).all=gs(r=["type","$comment"]),t.types=gs(["number","integer","string","array","object","boolean","null"]),t.forEach((function(e){e.rules=e.rules.map((function(e){var i;if("object"==typeof e){var a=Object.keys(e)[0];i=e[a],e=a,i.forEach((function(e){r.push(e),t.all[e]=!0}))}return r.push(e),t.all[e]={keyword:e,code:fs[e],implements:i}})),t.all.$comment={keyword:"$comment",code:fs.$comment},e.type&&(t.types[e.type]=e)})),t.keywords=gs(r.concat(["$schema","$id","id","$data","$async","title","description","default","definitions","examples","readOnly","writeOnly","contentMediaType","contentEncoding","additionalItems","then","else"])),t.custom={},t),this._getId=function(e){switch(e.schemaId){case"auto":return Ls;case"id":return Is;default:return Ms}}(e),e.loopRequired=e.loopRequired||1/0,"property"==e.errorDataPath&&(e._errorDataPathProperty=!0),void 0===e.serialize&&(e.serialize=Ta),this._metaOpts=function(e){for(var t=ta.copy(e._opts),r=0;r<Ts.length;r++)delete t[Ts[r]];return t}(this),e.formats&&function(e){for(var t in e._opts.formats){var r=e._opts.formats[t];e.addFormat(t,r)}}(this),e.keywords&&function(e){for(var t in e._opts.keywords){var r=e._opts.keywords[t];e.addKeyword(t,r)}}(this),function(e){var t;e._opts.$data&&(t=Cs,e.addMetaSchema(t,t.$id,!0));if(!1===e._opts.meta)return;var r=Es;e._opts.$data&&(r=_s(r,Fs));e.addMetaSchema(r,As,!0),e._refs["http://json-schema.org/schema"]=As}(this),"object"==typeof e.meta&&this.addMetaSchema(e.meta),e.nullable&&this.addKeyword("nullable",{metaSchema:{type:"boolean"}}),function(e){var t=e._opts.schemas;if(!t)return;if(Array.isArray(t))e.addSchema(t);else for(var r in t)e.addSchema(t[r],r)}(this)}function Ns(e,t){return t=ga.normalizeId(t),e._schemas[t]||e._refs[t]||e._fragments[t]}function Rs(e,t,r){for(var i in t){var a=t[i];a.meta||r&&!r.test(i)||(e._cache.del(a.cacheKey),delete t[i])}}function Is(e){return e.$id&&this.logger.warn("schema $id ignored",e.$id),e.id}function Ms(e){return e.id&&this.logger.warn("schema id ignored",e.id),e.$id}function Ls(e){if(e.$id&&e.id&&e.$id!=e.id)throw new Error("schema $id is different from id");return e.$id||e.id}function Us(e,t){if(e._schemas[t]||e._refs[t])throw new Error('schema with key or id "'+t+'" already exists')}function Vs(){}var qs={type:"object",properties:{type:{type:"string"},style:{},discover_existing:{type:"boolean"},standard_configuration:{type:"boolean"},title:{type:["boolean","string"]},am_pm:{type:"boolean"},time_step:{type:"integer",minimum:1,maximum:60},include:{type:"array",items:{type:"string"}},exclude:{type:"array",items:{type:"string"}},groups:{type:"array",items:{type:"object",properties:{name:{type:"string"},icon:{type:"string"},include:{type:"array",items:{type:"string"}},exclude:{type:"array",items:{type:"string"}}},required:["name"],additionalProperties:!1}},customize:{type:"object",additionalProperties:{type:["object"],properties:{icon:{type:"string"},name:{type:"string"},actions:{type:"array",items:{type:"object",properties:{icon:{type:"string"},name:{type:"string"},service:{type:"string"},service_data:{type:"object"},variable:{type:"object",oneOf:[{properties:{field:{type:"string"},name:{type:"string"},unit:{type:"string"},min:{type:"number",minimum:0},max:{type:"number",minimum:1},step:{type:"number",minimum:.1},optional:{type:"boolean"}},required:["field"],additionalProperties:!1},{properties:{field:{type:"string"},name:{type:"string"},options:{type:"array",items:{type:"object",properties:{value:{type:"string"},name:{type:"string"},icon:{type:"string"}},required:["value"],additionalProperties:!1}}},required:["field"],additionalProperties:!1}]}},required:["service"],additionalProperties:!1}},states:{oneOf:[{type:"array",items:{type:"string"}},{type:"object",properties:{min:{type:"number"},max:{type:"number"},step:{type:"number"},unit:{type:"string"}},required:["min","max"],additionalProperties:!1}]}},additionalProperties:!1}}},additionalProperties:!1};const Hs=new Ds({allErrors:!0,jsonPointers:!0});function Gs(e){let t=Hs.validate(qs,e),r=[];if(t||Hs.errors.forEach(e=>{let t="",i=e.dataPath.substr(1).split("/"),a=i.pop();i.length&&(t+=`in ${i.join("/")} `),"type"==e.keyword&&(t+="type of "),a?a&&(t+=(isNaN(+a)?`'${a}'`:`[item ${a}]`)+" "):t+="card ",t+=e.message,e.params.hasOwnProperty("additionalProperty")&&(t+=` '${e.params.additionalProperty}'`),r.push(t.charAt(0).toUpperCase()+t.slice(1)+".")}),e.groups&&Array.isArray(e.groups)&&e.groups.forEach(e=>{e.name&&"string"==typeof e.name&&function(e){let t=Ki(e);return"discovered"==t||!!Object.keys(Mi).map(Ki).find(e=>e==t)}(e.name)&&r.push(`Group '${e.name}' is a reserved group.`)}),r.length)throw new Error(`Invalid configuration provided (${r.length} error(s)). ${r.join(" ")}`)}const Qs=/^([0-9]+)?D([0-7]+)?T([0-9SRDUW]+)T?([0-9SRDUW]+)?A([A0-9]+)+(C([C0-9]+))?(F([F0-9]+))?$/,Bs=/^([0-9]{4})?([SRDUW]{2})([0-9]{4})?$/;let Ks=class extends ie{constructor(){super(...arguments),this._val=0,this.event=null,this.formatAmPm="false",this.stepSize=10,this.sunrise=0,this.sunset=0,this.maxOffset=2}set value(e){let t=this.value;this._val=e,this.requestUpdate("value",t)}get value(){return ci(this._val,this.stepSize)}updated(){let e=new CustomEvent("change",{detail:{event:this.event}});this.dispatchEvent(e)}firstUpdated(){"undefined"==this.event&&(this.event=null);let e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=ui(this.value,e)}render(){return I`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click="${this.hoursUp}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${this.getHours()}</div>
        <div class="hours-down">
          <mwc-button @click="${this.hoursDown}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click="${this.minutesUp}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${this.getMinutes()}</div>
        <div class="minutes-down">
          <mwc-button @click="${this.minutesDown}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.getSuffix()}
        <div class="options">
          ${this.getSunModeToggle()}
        </div>
      </div>
    `}getHours(){return di(this.value,{amPm:"true"==this.formatAmPm}).hours}getMinutes(){return di(this.value,{amPm:"true"==this.formatAmPm}).minutes}hoursUp(){let e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=ui(this._val+60,e)}hoursDown(){let e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=ui(this._val-60,e)}minutesUp(){let e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=ui(this._val+this.stepSize,e)}minutesDown(){let e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=ui(this._val-this.stepSize,e)}getSunModeToggle(){return isNaN(this.sunrise)||isNaN(this.sunset)?I``:I`
          <mwc-button @click="${this.toggleMode}" class="${this.event?"active":""}">
            <ha-icon icon="hass:theme-light-dark"></ha-icon>
          </mwc-button>
      `}getAmPm(){return di(this._val,{amPm:"true"==this.formatAmPm}).amPm}getBeforeAfter(){return this.value<0?ri("words.before"):ri("words.after")}getSuffix(){return this.event?I`
      <div class="suffix">
        <mwc-button @click="${this.toggleBeforeAfter}">
          ${this.getBeforeAfter()}
        </mwc-button>
        <mwc-button @click="${this.toggleSunriseSunset}">
          <ha-icon icon="hass:${"sunrise"==this.event?"weather-sunny":"weather-night"}"></ha-icon>
        </mwc-button>
      </div>
    `:"true"==this.formatAmPm?I`
      <div class="suffix">
        <mwc-button @click="${this.toggleAmPm}">
          ${this.getAmPm()}
        </mwc-button>
      </div>
    `:I``}toggleAmPm(){this._val<720?this.value=ui(this._val+720):this.value=ui(this._val-720)}toggleBeforeAfter(){this.value=-this._val}toggleSunriseSunset(){this.event="sunrise"==this.event?"sunset":"sunrise",this.value=this._val}toggleMode(){let e=this.value;if(this.event){let t="sunrise"==this.event?this.sunrise:this.sunset;this.event=null,this.value=e+t}else{let t;Math.abs(e-this.sunrise)<Math.abs(e-this.sunset)?(t=this.sunrise,this.event="sunrise"):(t=this.sunset,this.event="sunset"),this.value=e-t,this.value>60*this.maxOffset?this.value=60*this.maxOffset:this.value<60*-this.maxOffset&&(this.value=60*-this.maxOffset)}}};Ks.styles=te`
      div.time-picker {
        display: grid;
        grid-template-columns: min-content min-content min-content 1fr min-content;
        grid-template-rows: min-content min-content min-content;
        grid-template-areas: "hours-up   .         minutes-up   suffix options"
                             "hours      separator minutes      suffix options"
                             "hours-down .         minutes-down suffix options";
        grid-gap: 10px 0px;
        align-items: center;
      }

      div.hours-up { grid-area: hours-up; }
      div.hours { grid-area: hours; }
      div.hours-down { grid-area: hours-down; }
      div.separator { grid-area: separator; }
      div.minutes-up { grid-area: minutes-up; }
      div.minutes { grid-area: minutes; }
      div.minutes-down { grid-area: minutes-down; }
      div.suffix { grid-area: suffix; flex-grow: 1; }
      div.options { grid-area: options; }

      div.hours-up, div.hours-down, div.minutes-up, div.minutes-down {
        --mdc-icon-size: 42px;
      }

      div.hours, div.minutes {
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
  `,t([J({type:Number})],Ks.prototype,"value",null),t([J({type:String})],Ks.prototype,"event",void 0),t([J({type:String})],Ks.prototype,"formatAmPm",void 0),t([J({type:Number})],Ks.prototype,"stepSize",void 0),t([J({type:Number})],Ks.prototype,"sunrise",void 0),t([J({type:Number})],Ks.prototype,"sunset",void 0),Ks=t([W("time-picker")],Ks);function Ws(e){return"true"==e||"false"!=e&&!!e.length}let Ys=class extends ie{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.value=0,this.unit="",this.optional="false",this.disabled="false",this.scaleGain=1,this.scaleOffset=0}updated(){}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})(),"%"==this.unit&&(this.scaleOffset=this.min,this.scaleGain=(this.max-this.min)/100,this.min=0,this.max=100),Ws(this.disabled)&&!Ws(this.optional)&&(this.disabled="false"),isNaN(this.value)&&(this.value=this.min),this.requestUpdate()}render(){return I`
      <div class="container">
        <div class="checkbox">
        ${this.getCheckbox()}
        </div>
        <div class="slider">
        ${this.getSlider()}
        </div>
        <div class="value${Ws(this.disabled)?" disabled":""}">
        ${this.getScaledValue()}${this.unit}
        </div>
    `}getScaledValue(){let e=(this.value-this.scaleOffset)/this.scaleGain;return e=Math.round(e/this.step)*this.step,e<this.min?e=this.min:e>this.max&&(e=this.max),e}getSlider(){return Ws(this.disabled)?I`
        <ha-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.getScaledValue()}
        disabled
        ></ha-slider>`:I`
        <ha-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.getScaledValue()}
        @change=${this.updateValue}
        ></ha-slider>`}getCheckbox(){return Ws(this.optional)?Ws(this.disabled)?I`<ha-checkbox @change="${this.toggleChecked}"></ha-checkbox>`:I`<ha-checkbox @change="${this.toggleChecked}" checked></ha-checkbox>`:I``}toggleChecked(e){let t=e.target.checked;this.disabled=t?"false":"true";let r=new CustomEvent("change");this.dispatchEvent(r)}updateValue(e){let t=Number(e.target.value)*this.scaleGain+this.scaleOffset;t=Math.round(t/this.step)*this.step,this.value=t}};function Js(e){return e.endTime.value-e.time.value}Ys.styles=te`

      :host {
        width: 100%;
      }

      div.container {
        display: grid;
        grid-template-columns: min-content 1fr max-content;
        grid-template-rows: min-content;
        grid-template-areas: "checkbox slider value";
      }

      div.checkbox {
        grid-area: checkbox;
        display: flex;
        align-items: center;
      }

      div.slider {
        grid-area: slider;
        display: flex;
        align-items: center;
      }

      div.value {
        grid-area: value;
        min-width: 40px;
        display: flex;
        align-items: center;
      }

      ha-slider {
        width: 100%;
        --paper-slider-pin-start-color: var(--primary-color);
      }
      
       .disabled {
        color: var(--disabled-text-color);
      }
  `,t([J({type:Number})],Ys.prototype,"min",void 0),t([J({type:Number})],Ys.prototype,"max",void 0),t([J({type:Number})],Ys.prototype,"step",void 0),t([J({type:Number})],Ys.prototype,"value",void 0),t([J({type:String})],Ys.prototype,"unit",void 0),t([J({type:String})],Ys.prototype,"optional",void 0),t([J({type:String})],Ys.prototype,"disabled",void 0),Ys=t([W("variable-slider")],Ys);let Zs=class extends ie{constructor(){super(...arguments),this.entries=[],this.actions=[],this.stepSize=10,this._activeEntry=null,this.temperatureUnit="",this._activeThumb=null}render(){return I`
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          <div class="slider-legend-item empty"></div>
          <div class="slider-legend-item">03:00</div>
          <div class="slider-legend-item">06:00</div>
          <div class="slider-legend-item">09:00</div>
          <div class="slider-legend-item">12:00</div>
          <div class="slider-legend-item">15:00</div>
          <div class="slider-legend-item">18:00</div>
          <div class="slider-legend-item">21:00</div>
          <div class="slider-legend-item empty"></div>
        </div>
      </div>
      <div>
        ${null!==this._activeEntry&&this.entries.length<10?I`
        <mwc-button @click="${this._addSlot}">
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          Add
        </mwc-button>
        `:I`
        <mwc-button disabled>
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          Add
        </mwc-button>
        `}
        ${null!==this._activeEntry&&this.entries.length>3?I`
        <mwc-button @click="${this._removeSlot}">
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          Remove
        </mwc-button>
        `:I`
        <mwc-button disabled>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          Remove
        </mwc-button>
        `}
      </div>
    `}getSlots(){let e=[];return this.entries.forEach((t,r)=>{if(e.push(I`
        <div class="slider-slot${this._activeEntry==r?" active":""}${t.action?" filled":""}" @click="${this._handleSegmentClick}" index="${r}" style="width: ${Js(t)/1440*100}%">
          ${this.getEntryAction(t)}
        </div>
      `),r<this.entries.length-1){let t=this.entries[r].endTime.value;e.push(I`
        <div class="slider-thumb${this._activeThumb==r?" active":""}" index=${r}>
          <ha-icon icon="hass:unfold-more-vertical"  @mousedown="${this._handleTouchStart}" @touchstart="${this._handleTouchStart}"></ha-icon>
          <div class="slider-thumb-tooltip" value="time" @update="${this._updateMarker}">
            ${di(t).time}
          </div>
        </div>`)}}),e}updated(){this.shadowRoot.querySelectorAll(".slider-thumb-tooltip").forEach((e,t)=>{let r=this.entries[t].endTime.value;e.innerText=di(r).time})}getEntryAction(e){if(!e.action)return"";let t=this.actions.find(t=>t.id==e.action);if(e.variable&&e.variable.type==ae.Level){let r=e.variable,i=t.variable;if(r.enabled)return zi(r,i,{temperature_unit:this.temperatureUnit})}else if(e.variable&&e.variable.type==ae.List){return zi(e.variable,t.variable,{temperature_unit:this.temperatureUnit})}return"turn_on"==t.service?Ti("on"):"turn_off"==t.service?Ti("off"):t.name in ai?ri(ai[t.name]):Ti(t.name)}_handleSegmentClick(e){let t=e.target,r=Number(t.getAttribute("index"));this._activeEntry=this._activeEntry==r?null:r;let i=new CustomEvent("update",{detail:{entry:this._activeEntry}});this.dispatchEvent(i)}_handleTouchStart(e){let t;if(t=e.target,!t)return;let r=t.parentNode,i=r.parentElement,a=i.getBoundingClientRect(),s=r.previousElementSibling,n=r.nextElementSibling,o=r.querySelector(".slider-thumb-tooltip");this._activeThumb=Number(r.getAttribute("index"));const l=s.offsetWidth+n.offsetWidth,c=a.width;let d=Array.from(i.querySelectorAll(".slider-slot")),u=d.map(e=>e.offsetWidth),h=0,p=-1;d.forEach((e,t)=>{e==s?p=t:-1==p&&(h+=u[t])});var m=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let r=t-a.left;r<0?r=0:r>a.width&&(r=a.width),r>l+h&&(r=l+h),r<h&&(r=h),s.style.width=Math.round(r-h)+"px",n.style.width=Math.round(l-(r-h))+"px";let i=r/c*1440;i=i>=1440?i=1440:ci(i,this.stepSize),o.dispatchEvent(new CustomEvent("update",{detail:{time:i}}))},v=()=>{window.removeEventListener("mousemove",m),window.removeEventListener("touchmove",m),window.removeEventListener("mouseup",v),window.removeEventListener("touchend",v),m=()=>{};let e=hi(o.innerText),t=Js(this.entries[p])+Js(this.entries[p+1]),r=this.entries[p].time.value,i=[...this.entries];Object.assign(i[p],{endTime:{value:e}}),Object.assign(i[p+1],{time:{value:e},endTime:{value:r+t}}),this._activeThumb=null;let a=new CustomEvent("update",{detail:{entries:i}});this.dispatchEvent(a)};window.addEventListener("mouseup",v),window.addEventListener("touchend",v),window.addEventListener("mousemove",m),window.addEventListener("touchmove",m)}_updateMarker(e){let t=e.detail,r=Number(t.time);1440==r&&(r-=1),e.target.innerText=di(r).time}_addSlot(){let e=this.entries[this._activeEntry],t=e.time.value,r=e.endTime.value,i=ci(t+Js(e)/2,this.stepSize),a=Object.assign({time:{value:i},endTime:{value:r},action:""},ki(e,["entity","days"])),s=[...this.entries];Object.assign(s[this._activeEntry],{endTime:{value:i}}),s.splice(this._activeEntry+1,0,a);let n=new CustomEvent("update",{detail:{entries:s}});this.dispatchEvent(n)}_removeSlot(){let e=this._activeEntry==this.entries.length-1?this._activeEntry-1:this._activeEntry,t=Object.assign({},this.entries[e]);Object.assign(t,{endTime:this.entries[e+1].endTime});let r=[...this.entries];r.splice(e,2,t),this._activeEntry==this.entries.length&&this._activeEntry--;let i=new CustomEvent("update",{detail:{entries:r}});this.dispatchEvent(i)}};Zs.styles=te`

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

      div.slider-slot:before  {
        content: " ";
        background: var(--primary-color);
        opacity: 0.3;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
       }

      div.slider-slot:hover:before  {
        opacity: 0.6;
       }


      div.slider-slot.filled:before  {
        opacity: 0.8;
       }

      div.slider-slot.filled:hover:before  {
        opacity: 1;
       }

      div.slider-slot.active:before {
        opacity: 0.85;
        background: var(--accent-color);
      }
      // div.slider-slot:hover, div.slider-slot.active:hover {
      //   opacity: 1;
      // }
      
      div.slider-track div.slider-slot:first-of-type:before {
        border-radius: 4px 0px 0px 4px;
      }
      div.slider-track div.slider-slot:last-of-type:before {
        border-radius: 0px 4px 4px 0px;
      }
      div.slider-thumb {
        height: 100%;
        width: 2px;
        background: var(--card-background-color);
        display: flex;
        cursor: pointer;
        z-index: 5;
        margin: 0px -1px;
      }
      div.slider-thumb.active {
        z-index: 100;
      }
      div.slider-thumb ha-icon {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        width: 28px;
        height: 28px;
        --mdc-icon-size: 28px;
        border-radius: 100%;
        margin-left: -13px;
        margin-top: 12px;
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

      div.slider-legend-item:before {
        content: " ";
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
      }

      div.slider-thumb-tooltip:before {
        content: " ";
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

      div.slider-thumb.active div.slider-thumb-tooltip {
        background: var(--accent-color);
        z-index: 10;
      }
      div.slider-thumb.active div.slider-thumb-tooltip:before {
        background: var(--accent-color);
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
  `,t([J({type:Array})],Zs.prototype,"entries",void 0),t([J({type:Array})],Zs.prototype,"actions",void 0),t([J({type:Number})],Zs.prototype,"stepSize",void 0),t([J({type:Number})],Zs.prototype,"_activeEntry",void 0),t([J({type:String})],Zs.prototype,"temperatureUnit",void 0),t([J({type:Number})],Zs.prototype,"_activeThumb",void 0),Zs=t([W("timeslot-editor")],Zs);var Xs=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,en="[^\\s]+",tn=/\[([^]*?)\]/gm;function rn(e,t){for(var r=[],i=0,a=e.length;i<a;i++)r.push(e[i].substr(0,t));return r}var an=function(e){return function(t,r){var i=r[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return i>-1?i:null}};function sn(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var i=0,a=t;i<a.length;i++){var s=a[i];for(var n in s)e[n]=s[n]}return e}var nn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],on=["January","February","March","April","May","June","July","August","September","October","November","December"],ln=rn(on,3),cn={dayNamesShort:rn(nn,3),dayNames:nn,monthNamesShort:ln,monthNames:on,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},dn=sn({},cn),un=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},hn={D:function(e){return String(e.getDate())},DD:function(e){return un(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return un(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return un(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return un(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return un(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return un(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return un(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return un(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return un(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return un(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return un(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+un(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+un(Math.floor(Math.abs(t)/60),2)+":"+un(Math.abs(t)%60,2)}},pn=function(e){return+e-1},mn=[null,"[1-9]\\d?"],vn=[null,en],fn=["isPm",en,function(e,t){var r=e.toLowerCase();return r===t.amPm[0]?0:r===t.amPm[1]?1:null}],gn=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var r=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?r:-r}return 0}],yn=(an("monthNamesShort"),an("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var _n=function(e,t,r){if(void 0===t&&(t=yn.default),void 0===r&&(r={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];t=(t=yn[t]||t).replace(tn,(function(e,t){return i.push(t),"@@@"}));var a=sn(sn({},dn),r);return(t=t.replace(Xs,(function(t){return hn[t](e,a)}))).replace(/@@@/g,(function(){return i.shift()}))},bn=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e,t,r,i){i=i||{},r=null==r?{}:r;var a=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return a.detail=r,e.dispatchEvent(a),a});let wn=class extends ie{constructor(){super(...arguments),this.selectedDomain="",this.titleOption="standard"}setConfig(e){this._config=e,this.titleOption=this.getTitleOption()}render(){if(!this.hass)return I``;let e="custom"==this.titleOption?I`
        <div>
          <paper-input
            label="Custom title"
            .value=${this.getTitle()}
            .configValue=${"name"}
            @value-changed=${this.updateTitle}
          ></paper-input>
        </div>
      `:"";return I`
      <div class="card-section first">
        <div><b>Title of the card</b></div>
        <div>
          <button-group
            .items=${["standard","hidden","custom"]}
            value=${this.getTitleOption()}
            @change=${this.updateTitleOption}
          >
          </button-group>
        </div>
        ${e}
      </div>
      <div class="card-section">
        <div><b>Show all schedules</b></div>
        <div class="text-field">This sets the 'discover existing' parameter.<br> Disable if you want to use multiple scheduler-cards.</div>
        <div>
          <button-group
            .items=${[{id:"true",name:"on"},{id:"false",name:"off"}]}
            value=${this.getDiscoveryOption()}
            @change=${this.updateDiscoveryOption}
          >
          </button-group>
        </div>
      </div>
      <div class="card-section">
        <div><b>Time display</b></div>
        <div>
          <button-group
            .items=${[{id:"false",name:"24 hours"},{id:"true",name:"AM/PM"}]}
            value=${this.getAmPmOption()}
            @change=${this.updateAmPmOption}
          >
          </button-group>
        </div>
      </div>
      <div class="card-section">
        <div><b>Time step</b></div>
        <div class="text-field">Resolution (in minutes) for creating schedules</div>
        <div>
          <variable-slider
            min=1
            max=30
            step=1
            value=${this.getTimeStepOption()}      
            unit=" min"
            optional=false
            disabled=false
            @change=${this.updateTimeStepOption}
          >
          </variable-slider>
        </div>
      </div>
      <div class="card-section">
        <div><b>Included entities</b></div>
        <div class="text-field">Click on a group to open it.</div>
      </div>
      ${this.getDomainSwitches()}
    `}getTitleOption(){return this._config&&this.hass?void 0===this._config.title?"standard":"string"==typeof this._config.title?"custom":0==this._config.title?"hidden":"standard":"standard"}getTitle(){return this._config&&this.hass?void 0===this._config.title?ri("scheduler"):"string"==typeof this._config.title?this._config.title:0==this._config.title?"":ri("scheduler"):ri("scheduler")}updateTitleOption(e){let t=e.target.value;if(!this._config||!this.hass)return;this.titleOption=t;let r=Object.assign({},this._config);"standard"==t?"title"in this._config&&delete r.title:"hidden"==t&&Object.assign(r,{title:!1}),this._config=r,bn(this,"config-changed",{config:this._config})}updateTitle(e){if(!this._config||!this.hass)return;let t=Object.assign({},this._config),r=String(e.target.value);Object.assign(t,{title:r}),this._config=t,bn(this,"config-changed",{config:this._config})}getDiscoveryOption(){if(!this._config||!this.hass)return;return!this._config.hasOwnProperty("discover_existing")||this._config.discover_existing}updateDiscoveryOption(e){let t="true"==e.target.value;if(!this._config||!this.hass)return;let r=Object.assign({},this._config);t?r.hasOwnProperty("discover_existing")&&delete r.discover_existing:Object.assign(r,{discover_existing:t}),this._config=r,bn(this,"config-changed",{config:this._config})}getAmPmOption(){if(!this._config||!this.hass)return;return!!this._config.hasOwnProperty("am_pm")&&this._config.am_pm}updateAmPmOption(e){let t="true"==e.target.value;if(!this._config||!this.hass)return;let r=Object.assign({},this._config);t?Object.assign(r,{am_pm:t}):r.hasOwnProperty("am_pm")&&delete r.am_pm,this._config=r,bn(this,"config-changed",{config:this._config})}getTimeStepOption(){if(!this._config||!this.hass)return;let e=this._config.hasOwnProperty("time_step")?this._config.time_step:yi.time_step;return Number(e)}updateTimeStepOption(e){if(!this._config||!this.hass)return;let t=Object.assign({},this._config),r=Number(e.target.value);r==yi.time_step&&t.hasOwnProperty("time_step")?delete t.time_step:Object.assign(t,{time_step:r}),this._config=t,bn(this,"config-changed",{config:this._config})}getDomainSwitches(){if(!this._config||!this.hass)return;this._config.include&&this._config.include;return Object.entries(Mi).filter(([,e])=>e.hasOwnProperty("actions")).map(([e,t])=>{let r=Object.keys(this.hass.states).filter(t=>Di(t)==e&&!Qi(t)).length;return r?I`
          <div class="list-item" @click="${()=>{this.toggleSelectDomain(e)}}">
            <div class="list-item-icon">
              ${t.icon?I`<ha-icon icon="${Fi(t.icon)}"></ha-icon>`:""}
            </div>
            <div class="list-item-name">
              ${e}
            </div>
            <div class="list-item-summary">
              ${r} ${1==r?"entity":"entities"}
            </div>
            <div class="list-item-switch">
              ${this.selectedDomain==e?I`<ha-icon-button icon="mdi:chevron-down"></ha-icon-button>`:I`<ha-icon-button icon="mdi:chevron-right"></ha-icon-button>`}
            </div>
          </div>
          ${this.selectedDomain==e?this.getEntitySwitches(e):""}
      `:""})}getEntitySwitches(e){if(!this._config||!this.hass)return;let t=this._config.include?[...this._config.include]:[];return Object.entries(this.hass.states).filter(([t])=>Di(t)==e&&!Qi(t)).map(([e,r])=>{let i=r.attributes.friendly_name||Ai(e),a=t.includes(e);return I`
          <div class="list-item" @click="${()=>this.toggleSelectEntity(e)}">
            <div class="list-item-icon">
              
            </div>
            <div class="list-item-name">
              ${i}
            </div>
            <div class="list-item-summary">
              ${e}
            </div>
            <div class="list-item-switch">
              ${a?I`<ha-switch checked="checked"></ha-switch>`:I`<ha-switch></ha-switch>`}
            </div>
          </div>
      `})}toggleSelectDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectEntity(e){if(!this._config||!this.hass)return;let t=this._config.include?[...this._config.include]:[];t.includes(e)?t=t.filter(t=>t!=e):t.push(e),t.sort(),this._config=Object.assign(Object.assign({},this._config),{include:t}),bn(this,"config-changed",{config:this._config})}static get styles(){return te`

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


      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        grid-template-rows: min-content min-content;
        grid-template-areas: "icon name switch"
                             "icon summary switch";
        grid-gap: 2px 20px;
        background: none;
        cursor: pointer;
        padding: 10px 20px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        background: var(--list-item-background-color);
        opacity: 0.1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
       }

      div.list-item:hover:before {
          background: var(--primary-color);
          border-radius: 4px;
      }

      div.list-item-icon {
        grid-area: icon;
        color: var(--state-icon-color);
      }

      div.list-item-icon ha-icon {
        width: 24px;
        height: 24px;
      }

      div.list-item-name {
        grid-area: name;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-summary {
        grid-area: summary;
        color: var(--secondary-text-color);
      }

      div.list-item-switch {
        grid-area: switch;
      }

      div.list-item-switch ha-switch {
        margin-top: 3px;
      }
    `}};t([J()],wn.prototype,"hass",void 0),t([J()],wn.prototype,"_config",void 0),t([J()],wn.prototype,"selectedDomain",void 0),t([J()],wn.prototype,"titleOption",void 0),wn=t([W("scheduler-card-editor")],wn);const Pn="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class En extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Pn?"100px":"50px",height:Pn?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1});const r=e=>{let t,r;this.held=!1,e.touches?(t=e.touches[0].pageX,r=e.touches[0].pageY):(t=e.pageX,r=e.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(t,r),this.held=!0},this.holdTime)},i=r=>{r.preventDefault(),["touchend","touchcancel"].includes(r.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?bn(e,"action",{action:"hold"}):t.hasDoubleClick?"click"===r.type&&r.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,bn(e,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,bn(e,"action",{action:"double_tap"})):bn(e,"action",{action:"tap"}))};e.addEventListener("touchstart",r,{passive:!0}),e.addEventListener("touchend",i),e.addEventListener("touchcancel",i),e.addEventListener("mousedown",r,{passive:!0}),e.addEventListener("click",i),e.addEventListener("keyup",e=>{13===e.keyCode&&i(e)})}startAnimation(e,t){Object.assign(this.style,{left:e+"px",top:t+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-scheduler",En);const Sn=(e,t)=>{const r=(()=>{const e=document.body;if(e.querySelector("action-handler-scheduler"))return e.querySelector("action-handler-scheduler");const t=document.createElement("action-handler-scheduler");return e.appendChild(t),t})();r&&r.bind(e,t)},xn=($n=(e={})=>t=>{Sn(t.committer.element,e)},(...e)=>{const t=$n(...e);return v.set(t,!0),t});var $n;let kn=class extends ie{render(){if(!this.config||!this.userConfig)return I``;let e=this.calculateNext(this.schedule.entries),t=this.schedule.entries[e[0].entry],r=this.config.FindEntity(t.entity),i=this.config.FindAction(t.entity,t.action);return I`
      <div
        class="list-item${this.schedule.enabled?"":" disabled"}"
        .actionHandler=${xn({hasDoubleClick:!1,hasHold:!0})}
      >
        <div class="list-item-icon">
          <ha-icon icon="${Fi(r.icon)}"></ha-icon>
        </div>
        <div class="list-item-name">
          ${Ti(r.name)} - ${function(e,t,r){let i=Ti(t.name);if(e.hasOwnProperty("variable")&&e.variable&&t.variable){if(e.variable.type==ae.Level&&!e.variable.enabled)return Ni(i);let a=zi(e.variable,t.variable,r);i=`${ri("services.set_to")} ${a}`}return i}(t,i,{temperature_unit:this.userConfig.temperature_unit})}
        </div>
        <div class="list-item-friendly_name">
          ${this.getFriendlyName()}
        </div>
        <div class="list-item-summary">
          ${Ni(function(e,t){let r=!!t.amPm&&t.amPm;if(!e.event)return t.endTime?ri("time.interval",["{startTime}","{endTime}"],[di(e.value,{amPm:r}).time,di(t.endTime.value,{amPm:r}).time]):ri("time.absolute","{time}",di(e.value,{amPm:r}).time);let i="unknown",a="";return e.event===oi.Sunrise&&null!==t.sunrise?(i=di(e.value,{absolute:!0}).time,a=ri("time.sun_event_sunrise")):e.event==oi.Sunset&&null!==t.sunset&&(i=di(e.value,{absolute:!0}).time,a=ri("time.sun_event_sunset")),0==Math.abs(e.value)?ri("time.at_sun_event","{sunEvent}",a):`${i} ${di(e.value).signed?ri("words.before"):ri("words.after")} ${a}`}(t.time,{amPm:this.userConfig.am_pm,sunrise:this.userConfig.sunrise,sunset:this.userConfig.sunset,endTime:t.endTime}))}, ${this.showDays(t.days)}${1==this.schedule.entries.length?"":", "+(2==this.schedule.entries.length?ri("misc.one_additional_task"):ri("misc.x_additional_tasks","{count}",String(this.schedule.entries.length-1)))}
        </div>
        <div class="list-item-counter">
          ${Ni(this.showRelativeTime())}
        </div>
      </div>
    `}calculateNext(e){function t(e,t){let r=[...e].map((e,r)=>{let i=Math.floor(e.time.value/60),a=e.time.value-60*i,s=new Date;s.setHours(i),s.setMinutes(a),s.setSeconds(0);let n=pi(e.days);for(;s.valueOf()<=t.valueOf()||!n.includes(fi(s));)s.setDate(s.getDate()+1);return{entry:r,ts:s}});return r.sort((e,t)=>e.ts.valueOf()>t.ts.valueOf()?1:-1),r.shift()}let r=[],i=new Date;for(var a=0;a<2;a++){let a=t(e,i);r.push(a),i=a.ts}return r}showRelativeTime(){let e=this.schedule.next_trigger;if(!e)return"-";let t=new Date(e),r=new Date,i=Math.round((t.valueOf()-r.valueOf())/1e3);if(i<5)return ri("time.now");if(i<60)return ri("time.relative","{time}",ri("time.seconds","{seconds}",String(i)));if(i<3300){let e=i%60,t=Math.round(i/60);if(e<5||e>55)return ri("time.relative","{time}",1==t?ri("time.minute"):ri("time.minutes","{minutes}",String(t)));if(1==Math.floor(i/60)){let e=Math.round(i-60);return ri("time.relative","{time}",`${ri("time.minute")} ${ri("words.and")} ${ri("time.seconds","{seconds}",String(e))}`)}return ri("time.relative","{time}",ri("time.minutes","{minutes}",String(t)))}if(1==Math.floor(i/3600)){let e=Math.round(i/60-60);return ri("time.relative","{time}",`${ri("time.hour")} ${ri("words.and")} ${ri("time.minutes","{minutes}",String(e))}`)}let a=Math.round(i/3600);if(a<=6)return ri("time.relative","{time}",1==a?ri("time.hour"):ri("time.hours","{hours}",String(a)));let s=new Date;s.setHours(0,0,0,0);let n=Math.floor((t.valueOf()-s.valueOf())/864e5),o=""+di(hi(e),{amPm:this.userConfig.am_pm}).time;return 0==n?ri("time.absolute","{time}",o):1==n?0==t.getHours()&&0==t.getMinutes()?ri("time.absolute","{time}",ri("time.midnight")):12==t.getHours()&&0==t.getMinutes()?ri("time.absolute","{time}",ri("time.noon")):`${ri("days.tomorrow")} ${ri("time.absolute","{time}",o)}`:`${vi(fi(t))} ${ri("time.absolute","{time}",o)}`}showDays(e){function t(e){let t=[];for(var r=0;r<e.length-1;r++){for(var i=r+1;e[i]-e[i-1]==1;)i++;t.push(i-r)}return t}if(e.type==li.Daily)return ri("days.daily");if(e.type==li.Workday)return ri("days.working_days");if(e.type==li.Weekend)return ri("days.weekend");{let r=e.custom_days||[];r.sort();let i=r.map(vi),a=t(r),s=Math.max(...a);if(6==r.length){return ri("days.daily_except_days","{days}",vi([1,2,3,4,5,6,7].filter(e=>!r.includes(e)).pop()))}if(r.length>=3&&s>=3){let e=t(r).reduce((e,t,r)=>t==s?r:e,0);i.splice(e,s,ri("days.interval",["{startDay}","{endDay}"],[i[e],i[e+s-1]]))}return i.length>1?`${i.slice(0,-1).join(", ")} ${ri("words.and")} ${i.pop()}`:""+i.pop()}}getFriendlyName(){let e=this.schedule.name;return e?e.match(/^schedule\ #[0-9a-f]{6}$/i)?"":Ni(e):""}};kn.styles=te`
      div.list-item {
        display: grid;
        grid-template-columns: min-content 1fr 30%;
        grid-template-rows: min-content min-content min-content;
        grid-template-areas: "icon name counter"
                             "icon fname counter";
                             "icon summary counter";
        grid-gap: 0px 20px;
        background: none;
        cursor: pointer;
        padding: 15px 10px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        background: var(--list-item-background-color);
        opacity: 0.1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      div.list-item:hover:before {
          background: var(--primary-color);
          border-radius: 4px;
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

      div.list-item-summary {
        grid-area: summary;
        grid-column-start: 2;
        grid-column-end: 3;
        padding-top: 4px;
        color: var(--secondary-text-color);
        display: flex;
      }

      div.list-item-name {
        grid-area: name;
        grid-column-start: 2;
        grid-column-end: 3;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      div.list-item-counter {
        grid-area: counter;
        justify-content: flex-end;
        text-align: right;
        font-weight: 500;
      }

      div.list-item-friendly_name {
        grid-area: fname;
        grid-column-start: 2;
        grid-column-end: 3;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      div.disabled div.list-item-icon, div.disabled div.list-item-name, div.disabled div.list-item-summary, div.disabled div.list-item-counter, div.disabled div.list-item-friendly_name {
        color: var(--disabled-text-color);
      }


  `,t([J({type:Object})],kn.prototype,"schedule",void 0),t([J({attribute:!1})],kn.prototype,"config",void 0),t([J({attribute:!1})],kn.prototype,"userConfig",void 0),kn=t([W("schedule-entity-row")],kn);let On=class extends ie{constructor(){super(...arguments),this.items=[]}render(){return this.items.length?this.items.map(e=>this.createButton(e)):I`
        <div class="text-field">
          <slot></slot>
        </div>
      `}createButton(e){let t=Array.isArray(this.value)?this.value:[this.value];"object"!=typeof e&&(e={name:String(e)});let r=void 0!==e.id?e.id:e.name;return I`
      <mwc-button class="${t.includes(r)?"active":""}" @click="${()=>this.selectItem(r)}">
        ${e.icon?I`<ha-icon icon="${Fi(e.icon)}" class="padded-right"></ha-icon>`:""}
        ${Ti(e.name)}
      </mwc-button>
    `}selectItem(e){if(Array.isArray(this.value)){let t=Array.isArray(this.value)?this.value:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;let t=new CustomEvent("change");this.dispatchEvent(t)}};On.styles=te`

      div.text-field {
        color: var(--disabled-text-color);
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
      

  `,t([J({type:Array})],On.prototype,"items",void 0),t([J()],On.prototype,"value",void 0),t([J({type:Number})],On.prototype,"min",void 0),t([J({type:Boolean})],On.prototype,"optional",void 0),On=t([W("button-group")],On);let jn=class extends ie{constructor(){super(...arguments),this.selected=!1,this.editMode=!1}render(){var e,t;let r=null===(e=this.Config)||void 0===e?void 0:e.FindEntity(null===(t=this.item)||void 0===t?void 0:t.entity);return this.item&&r?I`
      <div class="list-item">
        <mwc-button @click="${this.entityButtonClick}" class="${this.selected?"active":""}">
          <ha-icon icon="${Fi(r.icon)}"></ha-icon>
          ${Ti(r.name)}
        </mwc-button>
          ${this.getMatchTypeButton()}
          ${this.getStateButton()}
        </div>
      </div>
    `:I``}entityButtonClick(){this.selected=!this.selected,this.fireEvent()}getMatchTypeButton(){if(!this.item)return I``;let e,t=this.item.match_type;return t==se.Equal?e="is":t==se.Unequal?e="is not":t==se.Below?e="below":t==se.Above&&(e="above"),I`
      <mwc-button @click="${this.matchTypeButtonClick}">
        ${e}
      </mwc-button>
    `}matchTypeButtonClick(){if(this.selected=!1,this.editMode=!1,!this.item)return;let e,t=this.item.match_type;"string"==typeof this.item.state?t==se.Equal?e=se.Unequal:t==se.Unequal&&(e=se.Equal):t==se.Equal?e=se.Unequal:t==se.Unequal?e=se.Below:t==se.Below?e=se.Above:t==se.Above&&(e=se.Equal),this.item=Object.assign(Object.assign({},this.item),{match_type:e}),this.fireEvent()}getStateButton(){return this.item?"string"==typeof this.item.state?I`
        <mwc-button @click="${this.stateButtonClick}">
          ${Ti(this.item.state)}
        </mwc-button>
      `:this.editMode?I`
        <div class="button-container">
          <div class="button-left">
            <mwc-button class="arrow-button"
              @mousedown="${()=>this.stateDecrement()}"
              @touchstart="${()=>this.stateDecrement()}"
              @mouseup="${this.stateUpdateStop}"
              @mouseout="${this.stateUpdateStop}"
              @touchend="${this.stateUpdateStop}"
              @touchcancel="${this.stateUpdateStop}"
              @blur="${this.stateUpdateStop}"
            >
              <ha-icon icon="hass:chevron-left"></ha-icon>
            </mwc-button>
          </div>
          <div class="value">
            <mwc-button class="button" @click="${this.toggleEditMode}">
              ${this.getState()}
            </mwc-button>
          </div>
          <div class="button-right">
            <mwc-button class="arrow-button"
              @mousedown="${()=>this.stateIncrement()}"
              @touchstart="${()=>this.stateIncrement()}"
              @mouseup="${this.stateUpdateStop}"
              @mouseout="${this.stateUpdateStop}"
              @touchend="${this.stateUpdateStop}"
              @touchcancel="${this.stateUpdateStop}"
              @blur="${this.stateUpdateStop}"
            >
              <ha-icon icon="hass:chevron-right"></ha-icon>
            </mwc-button>
          </div>
        </div>
      `:I`
        <mwc-button class="button" @click="${this.toggleEditMode}">
          ${this.getState()}
        </mwc-button>
      `:I``}stateButtonClick(){var e;if(this.selected=!1,!this.item||!this.Config)return;let t=null===(e=this.item)||void 0===e?void 0:e.state,r=this.Config.FindEntity(this.item.entity).states;if(!r||!Array.isArray(r))return;let i=0;for(i=0;i<r.length&&r[i]!=t;i++);let a=i<r.length-1?r[i+1]:r[0];this.item=Object.assign(Object.assign({},this.item),{state:a}),this.fireEvent()}stateDecrement(e=null){if(clearTimeout(this.timer),!this.item||!this.Config)return;let t=Number(this.item.state),r=this.Config.FindEntity(this.item.entity).states;if(Array.isArray(r))return;let i=r.step||1;t-=i,t<r.min&&(t=r.min),t=Number((Math.round(t/i)*i).toPrecision(5)),this.item=Object.assign(Object.assign({},this.item),{state:t});let a=null!==e?Number(.9*e):300;a<50&&(a=50),this.timer=setTimeout(()=>{this.stateDecrement(a)},a)}stateIncrement(e=null){if(clearTimeout(this.timer),!this.item||!this.Config)return;let t=Number(this.item.state),r=this.Config.FindEntity(this.item.entity).states;if(Array.isArray(r))return;let i=r.step||1;t+=i,t>r.max&&(t=r.max),t=Number((Math.round(t/i)*i).toPrecision(5)),this.item=Object.assign(Object.assign({},this.item),{state:t});let a=null!==e?Number(.9*e):300;a<50&&(a=50),this.timer=setTimeout(()=>{this.stateIncrement(a)},a)}stateUpdateStop(){clearTimeout(this.timer),this.fireEvent()}toggleEditMode(){this.editMode=!this.editMode}getState(){if(!this.item||!this.Config)return;let e=this.item.state,t=this.Config.FindEntity(this.item.entity).states;return!Array.isArray(t)&&t.unit?`${e}${t.unit}`:e}fireEvent(){let e={item:this.item,selected:this.selected},t=new CustomEvent("change",{detail:e});this.dispatchEvent(t)}};jn.styles=te`
      div.list-item {
        background: none;
        cursor: pointer;
        padding: 2px 10px;
        margin: 5px 0px;
        position: relative;
        z-index: 1;
      }

      div.list-item:before  {
        content: " ";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-radius: 4px;
        background: none;
        opacity: 0.1;
      }

      mwc-button ha-icon {
        margin-right: 11px;
      }

      mwc-button {
        margin: 2px 0px;
        --mdc-button-disabled-ink-color: var(--primary-color);
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }

      div.button-container {
        display: grid;
        grid-template-columns: min-content min-content min-content;
        grid-template-areas: "button-left value button-right";      
      }

      div.button-container .button-left {grid-area: button-left}
      div.button-container .value {grid-area:value}
      div.button-container .button-right {grid-area: button-right}

      mwc-button.arrow-button {
        padding: 0px;
        margin: 0px;
        --mdc-button-horizontal-padding: 0px;
      }

      .mdc-button {
        min-width: 20px !important;
      }
  `,t([J()],jn.prototype,"item",void 0),t([J()],jn.prototype,"Config",void 0),t([J()],jn.prototype,"selected",void 0),t([J()],jn.prototype,"editMode",void 0),jn=t([W("condition-entity-row")],jn);let Cn=class extends ie{constructor(){super(...arguments),this.group="",this.entity="",this.selectedItem=null,this.editItem=null,this.addCondition=!1}render(){return this.Config?I`
        <div class="card-section first">
          <div class="header">Conditions</div>
          <div style="float: right; margin-top: -1em">
            ${this.getConditionTypeSwitch()}
          </div>
          <div class="option-list" style="clear: both">
            ${this.renderConditions()}
          </div>
        </div>
        <div class="card-section">
          ${this.getAddButton()}
          ${this.getRemoveButton()}
        </div>
        ${this.renderAddCondition()}
        ${this.renderOptions()}
      `:I``}getConditionTypeSwitch(){var e;return I`
      Any
      <ha-switch style="margin: 0px 10px" @change=${this.conditionTypeSwitchClick} ?disabled=${!this.conditions||this.conditions.items.length<2} ?checked=${(null===(e=this.conditions)||void 0===e?void 0:e.type)==ne.All}></ha-switch>
      All`}renderAddCondition(){return this.Config&&this.addCondition?I`
        <div class="card-section">
          <div class="header">${ri("fields.group")}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetGroups(!0)}
              value=${this.group}
              @change=${this.selectGroup}
            >
              ${ri("instructions.no_groups_defined")}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          <div class="header">${ri("fields.entity")}</div>
          <div class="option-list">
            <button-group
              .items=${this.Config.GetEntitiesForGroup(this.group,!0)}
              value=${this.entity}
              @change=${this.selectEntity}
            >
              ${this.group?ri("instructions.no_entities_for_group"):ri("instructions.no_group_selected")}
            </button-group>
          </div>
        </div>
        <div class="card-section">
          ${this.getConfirmButton()}
        </div>
    `:I``}renderOptions(){return!this.Config||this.addCondition?I``:I`
        <div class="card-section">
          <div class="header">Friendly name</div>
          <div class="option-list">
            <paper-input no-label-float
              .value=${this.friendlyName||""}
              .configValue=${""}
              @value-changed=${this.updateName}
            ></paper-input>
          </div>
        </div>
        <div class="card-section">
          <div class="header">Other</div>
          <div class="option-item checkbox-container">
            <div class="checkbox">
              <ha-switch @change="${this.updateRunOnce}" ?checked=${this.options&&"run_once"in this.options&&this.options.run_once}></ha-switch>
            </div>
            <div class="label">
              Disable automatically after triggering
            </div>
          </div>
        </div>
    `}getAddButton(){return I`
      <mwc-button @click="${this.addConditionClick}" class="${this.addCondition?"active":""}">
        <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
        Add
      </mwc-button>
    `}getRemoveButton(){return null!==this.selectedItem?I`
          <mwc-button @click="${this.removeConditionClick}">
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            Remove
          </mwc-button>
      `:I`
          <mwc-button disabled>
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            Remove
          </mwc-button>
      `}getConfirmButton(){return this.entity?I`
        <mwc-button @click="${this.confirmConditionClick}">
          <ha-icon icon="hass:check-circle-outline" class="padded-right"></ha-icon>
          Confirm
        </mwc-button>
    `:I`
        <mwc-button disabled>
          <ha-icon icon="hass:check-circle-outline" class="padded-right"></ha-icon>
          Confirm
        </mwc-button>
    `}renderConditions(){var e;if(!this.Config)return I``;let t=(null===(e=this.conditions)||void 0===e?void 0:e.items)||[];return t=t.filter(e=>{var t,r;return null===(r=null===(t=this.Config)||void 0===t?void 0:t.FindEntity(e.entity))||void 0===r?void 0:r.states}),t.length?t.map((e,t)=>I`
        <condition-entity-row
          .item=${e}
          .Config=${this.Config}
          .selected=${this.selectedItem===t}
          .editMode=${this.editItem===t}
          @change="${e=>this.updateCondition(e,t)}"
        >
        </condition-entity-row>
      `):I`<div class="text-field">No conditions yet</div>`}updateCondition(e,t){if(e.detail.selected)this.selectedItem=t,this.editItem=null;else{this.selectedItem==t&&(this.selectedItem=null),this.editItem!=t&&(this.editItem=t);let r=[...this.conditions.items];r[t]=Object.assign({},e.detail.item),Object.assign(this.conditions,{items:r}),this.fireEvent()}}selectGroup(e){this.selectedItem=null,this.editItem=null;let t=e.target.value;this.group=t,this.entity=""}selectEntity(e){this.selectedItem=null,this.editItem=null;let t=e.target.value;this.entity=t}addConditionClick(){this.addCondition=!this.addCondition,this.editItem=null,this.selectedItem=null}confirmConditionClick(){var e,t;if(!this.entity||!this.Config)return;let r=this.Config.FindEntity(this.entity).states,i=Array.isArray(r)?1:r.step||1,a=Array.isArray(r)?r[0]:Number((Math.round((r.min+r.max)/2/i)*i).toPrecision(5)),s={entity:this.entity,match_type:se.Equal,state:a},n=(null===(e=this.conditions)||void 0===e?void 0:e.items.length)?[...this.conditions.items]:[],o=(null===(t=this.conditions)||void 0===t?void 0:t.type)?this.conditions.type:ne.Any;n.push(s),this.conditions={items:n,type:o},this.group="",this.entity="",this.selectedItem=null,this.addCondition=!1,this.fireEvent()}removeConditionClick(){if(null===this.selectedItem)return;let e=[...this.conditions.items];e.splice(this.selectedItem,1),Object.assign(this.conditions,{items:e}),this.selectedItem=null,this.fireEvent()}conditionTypeSwitchClick(e){let t=e.target.checked?ne.All:ne.Any;Object.assign(this.conditions,{type:t}),this.fireEvent()}updateName(e){let t=e.target.value;t!=this.friendlyName&&(this.friendlyName=t,this.fireEvent())}updateRunOnce(e){let t=e.target.checked,r=Object.assign({},this.options);t?Object.assign(r,{run_once:!0}):"run_once"in r&&delete r.run_once,this.options=r,this.fireEvent()}fireEvent(){let e={conditions:this.conditions,options:this.options,friendly_name:this.friendlyName},t=new CustomEvent("change",{detail:e});this.dispatchEvent(t)}};Cn.styles=te`

      .header {
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
      
      div.option-item {
        padding: 2px 5px;
        display: flex;
        align-items: center;
      }

      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }

      
      div.checkbox-container {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: min-content;
        grid-template-areas: "checkbox label";
        grid-gap: 0px 20px;
        margin: 5px;
      }

      div.checkbox-container .checkbox {
        grid-area: checkbox;
        display: flex;
        align-items: center;
      }

      div.checkbox-container .label {
        grid-area: label;
        display: flex;
        align-items: center;
      }

  `,t([J()],Cn.prototype,"Config",void 0),t([J()],Cn.prototype,"group",void 0),t([J()],Cn.prototype,"entity",void 0),t([J()],Cn.prototype,"conditions",void 0),t([J()],Cn.prototype,"options",void 0),t([J()],Cn.prototype,"friendlyName",void 0),t([J()],Cn.prototype,"selectedItem",void 0),t([J()],Cn.prototype,"editItem",void 0),t([J()],Cn.prototype,"addCondition",void 0),Cn=t([W("options-panel")],Cn),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info(`%c   SCHEDULER-CARD   \n%c   Version: ${"1.7.5".padEnd(8," ")}\n%c   Language: ${ii().padEnd(7," ")}`,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray","color: white; font-weight: bold; background: dimgray"),e.SchedulerCard=class extends ie{constructor(){super(...arguments),this._config=yi,this.Config=new Yi,this._entities={},this.schedules=[],this._view=xi.Overview,this.newItem=!1,this.editItem=null,this._entries=[],this._activeEntry=null,this._entry=Object.assign({},_i),this._selectedGroup="",this._addCondition=!1,this._friendlyName=void 0}static async getConfigElement(){return document.createElement("scheduler-card-editor")}static get styles(){return Ji}set hass(e){this._hass||this.init(e),this.updateScheduleList(e),this._hass=e}init(e){void 0!==e.states["sun.sun"]&&(this._config=Object.assign(Object.assign({},this._config),{sunrise:hi(e.states["sun.sun"].attributes.next_rising),sunset:hi(e.states["sun.sun"].attributes.next_setting)})),e.config.unit_system&&e.config.unit_system.temperature&&(this._config=Object.assign(Object.assign({},this._config),{temperature_unit:e.config.unit_system.temperature})),e.user.is_admin||(this._config=Object.assign(Object.assign({},this._config),{is_admin:!1})),this.Config.LoadEntities(e.states)}updateScheduleList(e){let t=(r=e.states,i=(e,t)=>Qi(t),Object.entries(r).filter(([e,t])=>i(t,e)).reduce((e,[t,r])=>Object.assign(e,{[t]:r}),{}));var r,i;Ri(t,this._entities)||(this._entities=t,this.schedules=Object.values(t).map(e=>function(e,t){if(!e.attributes.actions||!e.attributes.entries)return null;let r=e.attributes.actions.map(e=>{let r=qi(e);if(!t.FindEntity(r.entity))return null;let i=Hi(r,t.GetActionsForEntity(r.entity));if(!i)return null;let a={entity:r.entity,action:i.id};if(i.variable&&i.variable.type==ae.Level){if(i.variable.type==ae.Level){let e;e=r.service_data&&i.variable.field in r.service_data?{type:ae.Level,value:Number(r.service_data[i.variable.field]),enabled:!0}:{type:ae.Level,value:null,enabled:!1},a=$i(a,{variable:e})}}else if(i.variable&&i.variable.type==ae.List){let e;e=r.service_data&&i.variable.field in r.service_data?{type:ae.List,value:String(r.service_data[i.variable.field])}:{type:ae.List,value:null},a=$i(a,{variable:e})}return a}),i=e.attributes.conditions||[],a=e.attributes.options||{},s=[];return e.attributes.entries.forEach(e=>{let t=Qs.exec(e),n={};if(t[1]){let e=t[1];"0"==e?Object.assign(n,{days:{type:li.Daily}}):"15"==e?Object.assign(n,{days:{type:li.Workday}}):"67"==e?Object.assign(n,{days:{type:li.Weekend}}):Object.assign(n,{days:{type:li.Daily}})}else{let e=t[2].split("").map(Number);e.sort(),1==e.length&&0==e[0]?Object.assign(n,{days:{type:li.Daily}}):Object.assign(n,{days:{type:li.Custom,custom_days:e.filter(e=>0!=e)}})}let o=Bs.exec(t[3]);if(o?Object.assign(n,{time:{event:"SR"==o[2]?oi.Sunrise:oi.Sunset,value:o[1]?-hi(o[1]):hi(o[3])}}):Object.assign(n,{time:{value:hi(t[3])}}),t[4]&&(o=Bs.exec(t[4]),o?Object.assign(n,{endTime:{event:"SR"==o[2]?oi.Sunrise:oi.Sunset,value:o[1]?-hi(o[1]):hi(o[3])}}):Object.assign(n,{endTime:{value:hi(t[4])}})),t[6]){let e=[],r=ne.Any,a=t[6].match(/C[0-9]+/g);null==a||a.forEach(t=>{e=e.concat(t.substring(1).split("").map(Number)),t.length>2&&(r=ne.All)}),Object.assign(n,{conditions:{type:r,items:e.filter(e=>i.length>=e-1).map(e=>i[e])}})}if(t[8]){let e=t[8].match(/F[0-9]+/g),r=null==e?void 0:e.map(e=>Number(e.substring(1))).reduce((e,t)=>Object.assign(e,ki(a,[Object.keys(a)[t]])),{});Object.assign(n,{options:r})}return String(t[5]).split("A").map(Number).filter(e=>null!==e&&r[e]).forEach(e=>{s.push($i(r[e],n))})}),s.length?{entries:s,id:e.entity_id,name:e.attributes.friendly_name,enabled:"off"!=e.state,next_trigger:e.attributes.next_trigger}:null}(e,this.Config)).filter(e=>e).filter(e=>e))}setConfig(e){Gs(e);this._config=Object.assign(Object.assign({},this._config),ki(e,Object.keys(this._config))),this.Config.setUserConfig(ki(e,["discover_existing","standard_configuration","include","exclude","groups","customize"]))}getCardSize(){return this._hass&&this.schedules.length?6+2*this.schedules.length:6}render(){return this._view==xi.Overview?this.renderOverview():this._view==xi.NewSchedule?this.renderNewItemView():this._view==xi.TimePicker?this.renderTimePickerView():this._view==xi.TimeScheme?this.renderTimeSchemeView():this._view==xi.Options?this.renderOptionsView():I``}renderOverview(){return I`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
        ${this.renderScheduleList()}
        </div>
        ${this._config.is_admin?I`
        <div class="card-section last">
          <mwc-button outlined @click="${this._addItemClick}">${ri("actions.add")}</mwc-button>
        </div>`:""}
      </ha-card>
    `}renderNewItemView(){let e=this._entry&&this._entry.entity&&this.Config.GetActionsForEntity(this._entry.entity).length?I`
        <div class="card-section first">
          <div class="header">or</div>
          <div class="option-list">
            <mwc-button class="${"make_scheme"==this._entry.action?" active":""}" @click="${()=>{this.selectAction("make_scheme")}}">
              <ha-icon icon="${Fi("chart-timeline")}" class="padded-right"></ha-icon>
              ${Ti("make_scheme")}
            </mwc-button>
          </div>
        </div>
    `:"";return I`
        <ha-card>
          ${this.renderTitle()}
          <div class="card-section first">
            <div class="header">${ri("fields.group")}</div>
            <div class="option-list">
              <button-group
                .items=${this.Config.GetGroups()}
                value=${this._selectedGroup}
                @change=${this.selectGroup}
              >
                ${ri("instructions.no_groups_defined")}
              </button-group>
            </div>
          </div>
          <div class="card-section">
            <div class="header">${ri("fields.entity")}</div>
            <div class="option-list">
              <button-group
                .items=${this.Config.GetEntitiesForGroup(this._selectedGroup)}
                value=${this._entry.entity}
                @change=${this.selectEntity}
              >
                ${this._selectedGroup?ri("instructions.no_entities_for_group"):ri("instructions.no_group_selected")}
              </button-group>
            </div>
          </div>
          <div class="card-section">
            <div class="header">${ri("fields.action")}</div>
            <div class="option-list">
              <button-group
                .items=${this.Config.GetActionsForEntity(this._entry.entity)}
                value=${this._entry.action}
                @change=${this.selectAction}
              >
                ${this._entry&&this._entry.entity?ri("instructions.no_actions_for_entity"):ri("instructions.no_entity_selected")}
              </button-group>
            </div>
          </div>
          ${e}
          <div class="card-section last">
            <mwc-button outlined @click="${this._cancelEditClick}">${ri("actions.cancel")}</mwc-button>
            ${this._entry.action?I`<mwc-button outlined @click="${this._confirmItemClick}">${ri("actions.next")}</mwc-button>`:I`<mwc-button outlined disabled>${ri("actions.next")}</mwc-button>`}
          </div>
        </ha-card>`}renderTimePickerView(){let e=this.Config.FindEntity(this._entry.entity),t=this.Config.FindAction(this._entry.entity,this._entry.action);return e&&t?I`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
          <div class="header">${ri("fields.action")}</div>
          <div class="summary">
            <div class="summary-entity">
              <div class="summary-icon">
                ${e.icon?I`<ha-icon icon="${Fi(e.icon)}"></ha-icon>`:""}
              </div>
              <div class="summary-text">
                ${Ti(e.name)}
              </div>
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right"></ha-icon>
            </div>
            <div class="summary-action">
              <div class="summary-icon">
                ${t.icon?I`<ha-icon icon="${Fi(t.icon)}"></ha-icon>`:""}
              </div>
              <div class="summary-text">
                ${Ti(t.name)}
              </div>
            </div>
          </div>
        </div>
        ${t.variable&&t.variable.type==ae.Level?this.renderLevelPanel(t.variable):""}
        ${t.variable&&t.variable.type==ae.List?this.renderListPanel(t.variable):""}
        ${this.renderDayPicker()}
          
        <div class="card-section">
          <div class="header">${ri("fields.time")}</div>
          <time-picker value=${this._entry.time.value} event=${this._entry.time.event} stepSize="${this._config.time_step}" formatAmPm="${this._config.am_pm}" sunrise="${this._config.sunrise}" sunset="${this._config.sunset}" @change="${this.updateTime}"></timepicker>
        </div>
        ${this.newItem||!this._config.is_admin?"":I`
        <div class="card-section">
          <mwc-button outlined @click="${this._deleteItemClick}" class="warning">${ri("actions.delete")}</mwc-button>
        </div>`}
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${ri("actions.cancel")}</mwc-button>
          <mwc-button outlined @click="${this._saveItemClick}">${ri("actions.save")}</mwc-button>
          <mwc-button outlined @click="${this._gotoOptionsClick}" style="float: right">${ri("fields.options")} <ha-icon icon="hass:chevron-right"></ha-icon></mwc-button>
          <div style="clear: both"></div>
        </div>
      </ha-card>
      `:I``}renderTimeSchemeView(){let e=this.Config.FindEntity(this._entries[0].entity);if(!e)return I``;let t=this.Config.GetActionsForEntity(e.id),r=null!==this._activeEntry?this.Config.FindAction(this._entry.entity,this._entry.action):null;return I`
      <ha-card>
        ${this.renderTitle()}
        <div class="card-section first">
          <div class="header">${ri("fields.action")}</div>
          <div class="summary">
            <div class="summary-entity">
              <div class="summary-icon">
                ${e.icon?I`<ha-icon icon="${Fi(e.icon)}"></ha-icon>`:""}
              </div>
              <div class="summary-text">
                ${Ti(e.name)}
              </div>
            </div>
            <div class="summary-arrow">
              <ha-icon icon="hass:arrow-right"></ha-icon>
            </div>
            <div class="summary-action">
              <div class="summary-icon">
                <ha-icon icon="${Fi("chart-timeline")}"></ha-icon>
              </div>
              <div class="summary-text">
                ${Ti("make_scheme")}
              </div>
            </div>
          </div>
          <div style="margin-top: 10px"><i>This feature is still in development. Use it at your own risk. Please leave your feedback in the <a href="https://community.home-assistant.io/t/scheduler-card-custom-component/217458">HA forum</a>.</i></div>
        </div>
        ${this.renderDayPicker()}
          
        <div class="card-section" style="margin-top: 15px">
          <div class="header">${ri("fields.time")}</div>
          <timeslot-editor
            actions=${JSON.stringify(t)}
            @update=${this.handlePlannerUpdate}
            temperatureunit=${this._config.temperature_unit}
            entries=${JSON.stringify(this._entries)}
          >
          </timeslot-editor>
        </div>
        <div class="card-section">
          <div class="header">${ri("fields.action")}</div>
          <div class="option-item">
          <button-group
            .items=${this.Config.GetActionsForEntity(this._entry.entity)}
            value=${this._entry.action}
            optional="true"
            @change=${this.selectAction}
          >
            Select a timeslot first
          </button-group>
          </div>
        </div>
        ${r&&this._entry.variable&&this._entry.variable.type==ae.Level?this.renderLevelPanel(r.variable,!0):""}
        ${r&&this._entry.variable&&this._entry.variable.type==ae.List?this.renderListPanel(r.variable,!0):""}
        ${this.newItem||!this._config.is_admin?"":I`
        <div class="card-section">
          <mwc-button outlined @click="${this._deleteItemClick}" class="warning">${ri("actions.delete")}</mwc-button>
        </div>`}
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${ri("actions.cancel")}</mwc-button>
          ${this.newItem||!this._config.is_admin?"":I`<mwc-button outlined @click="${this._deleteItemClick}">${ri("actions.delete")}</mwc-button>`}
          <mwc-button outlined @click="${this._gotoOptionsClick}" style="float: right">${ri("fields.options")} <ha-icon icon="hass:chevron-right"></ha-icon></mwc-button>
          <div style="clear: both"></div>
        </div>
      </ha-card>
    `}renderOptionsView(){return I`
      <ha-card>
        ${this.renderTitle()}
        <options-panel
          .Config=${this.Config}
          .conditions=${this._entry.conditions}
          .options=${this._entry.options}
          .friendlyName=${this._friendlyName}
          @change=${this.optionsUpdated}
        >
        </options-panel>
        <div class="card-section last">
          <mwc-button outlined @click="${this._cancelEditClick}">${ri("actions.cancel")}</mwc-button>
          ${this._entries.find(e=>e.action)?I`<mwc-button outlined @click="${this._saveItemClick}">${ri("actions.save")}</mwc-button>`:I`<mwc-button outlined disabled>${ri("actions.save")}</mwc-button>`}
          <mwc-button outlined @click="${this._optionsBackClick}" style="float: right"><ha-icon icon="hass:chevron-left"></ha-icon> back</mwc-button>
          <div style="clear: both"></div>
        </div>
      </ha-card>
    `}renderTitle(){return"string"==typeof this._config.title?I`<div class="card-header">${this._config.title}</div>`:this._config.title?I`<div class="card-header">${ri("scheduler")}</div>`:I``}renderScheduleList(){if(!this.schedules.length)return I`
      <div class="text-field">
        ${ri("instructions.no_entries_defined")}
      </div>
    `;let e=this.schedules;return e.sort((e,t)=>{let r=gi(e.next_trigger),i=gi(t.next_trigger);return null!==r&&null!==i?r>i?1:r<i?-1:e.id<t.id?1:-1:null!==i?1:null!==r?-1:e.id<t.id?1:-1}),e.map(e=>I`
        <schedule-entity-row
          .config=${this.Config}
          .userConfig=${this._config}
          .schedule=${e}
          @action=${t=>this._handleScheduleClick(t,e.id)}
        >
        </schedule-entity-row>
      `)}renderDayPicker(){let e=this._entry.days.type==li.Custom?I`
      <div class="day-list" id="day-list-custom">
        <button-group
          .items=${Ei}
          .value=${this._entry.days.custom_days}
          min="1"
          @change=${this.selectDays}
        >
        </button-group>
      </div>`:"";return I`
    <div class="card-section">
      <div class="header">${ri("fields.days")}</div>
      <div class="day-list">
        <button-group
          .items=${Si}
          value=${this._entry.days.type}
          @change=${this.selectDays}
        >
        </button-group>
      </div>
      ${e}
    </div>`}renderLevelPanel(e,t=!1){e.unit.length||"temperature"!=e.field||(e=Object.assign(Object.assign({},e),{unit:this._config.temperature_unit}));let r=this._entry.variable;return I`
    <div class="card-section">
      <div class="header">${e.name in ni?ri(ni[e.name]):Ti(e.name)}</div>
      <div class="option-item">
        <variable-slider
          min=${e.min}
          max=${e.max}
          step=${e.step}
          value=${r.value}      
          unit=${e.unit}
          optional=${e.optional}
          disabled=${!r.enabled}
          @change="${e=>{this.updateLevel(e,t)}}"
        >
        </variable-slider>
      </div>
     </div>`}renderListPanel(e,t=!1){var r;return I`
    <div class="card-section">
      <div class="header">${e.name in ni?ri(ni[e.name]):Ti(e.name)}</div>
      <div class="option-item">
      <button-group
        .items=${e.options.map(e=>Object.assign(e,{name:e.value}))}
        value=${null===(r=this._entry.variable)||void 0===r?void 0:r.value}
        @change=${e=>this.selectListItem(e,t)}
      >
        ${ri("instructions.no_entries_defined")}
      </button-group>
      </div>
     </div>`}selectGroup(e){let t="string"==typeof e?e:e.target.value;this._selectedGroup=t,1==this.Config.GetEntitiesForGroup(t).length?this.selectEntity(this.Config.GetEntitiesForGroup(t)[0].id):this._entry=Object.assign({},_i)}selectEntity(e){let t="string"==typeof e?e:e.target.value;this._entry=Object.assign(Object.assign({},this._entry),{entity:t,action:""}),1==this.Config.GetActionsForEntity(t).length&&this.selectAction(this.Config.GetActionsForEntity(t)[0].id)}selectAction(e){let t="string"==typeof e?e:e.target.value,r=this.Config.FindAction(this._entry.entity,t),i=Object.assign({},this._entry);r||"make_scheme"!=t?(null===t?Object.assign(i,{action:""}):Object.assign(i,{action:t}),r&&r.variable?r.variable.type==ae.Level?Object.assign(i,{variable:{type:ae.Level,value:r.variable.min,enabled:!r.variable.optional}}):r.variable.type==ae.List&&Object.assign(i,{variable:{type:ae.List,value:r.variable.options[0].value}}):i.variable&&delete i.variable,this._entry=i,this._entries[this._activeEntry]=this._entry):this._entry=Object.assign(Object.assign({},this._entry),{action:"make_scheme"})}updateTime(e){let t=e.target,r=Number(t.value),i="sunrise"==e.detail.event?oi.Sunrise:oi.Sunset;Object.assign(this._entry,{time:e.detail.event?{event:i,value:r}:{value:r}})}selectDays(e){let t=e.target.value,r=Object.assign({},this._entry.days);if(Object.values(li).includes(t)){let e=t;Object.assign(r,{type:e}),e!=li.Custom||r.custom_days||Object.assign(r,{custom_days:pi(this._entry.days)})}else Object.assign(r,{custom_days:[...t]});this._entry=Object.assign(Object.assign({},this._entry),{days:r}),this._view==xi.TimeScheme&&(this._entries=this._entries.map(e=>Object.assign(e,{days:r})))}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){let t=e.detail.entries;t.length<this._entries.length&&this._activeEntry==this._entries.length-1&&(this._activeEntry=this._entries.length-2),this._entries=[...t],null!==this._activeEntry&&(this._entry=this._entries[this._activeEntry]),this._entry=Object.assign({},this._entry)}else if(e.detail.hasOwnProperty("entry"))if(null!==this._activeEntry&&(this._entries[this._activeEntry]=this._entry),null!==e.detail.entry){let t=Number(e.detail.entry);this._activeEntry=t,this._entry=this._entries[t]}else this._activeEntry=null,this._entry=Object.assign({},this._entry)}updateLevel(e,t){let r=e.target,i={type:ae.Level,value:Number(r.value),enabled:"false"==String(r.disabled)};Object.assign(this._entry,{variable:i}),t&&this.requestUpdate()}selectListItem(e,t){let r=e.target.value,i={type:ae.List,value:r};Object.assign(this._entry,{variable:i}),t&&this.requestUpdate()}optionsUpdated(e){let t=e.detail;t.conditions&&(t.conditions.items.length?(this._entry=Object.assign(Object.assign({},this._entry),{conditions:t.conditions}),this._entries=this._entries.map(e=>Object.assign(e,{conditions:t.conditions}))):(this._entry=$i(this._entry,{conditions:null},{compact:!0}),this._entries=this._entries.map(e=>Object.assign(e,$i(e,{conditions:null},{compact:!0}))))),t.options&&(Object.keys(t.options).length?(this._entry=Object.assign(Object.assign({},this._entry),{options:t.options}),this._entries=this._entries.map(e=>Object.assign(e,{options:t.options}))):(this._entry=$i(this._entry,{options:null},{compact:!0}),this._entries=this._entries.map(e=>Object.assign(e,$i(e,{options:null},{compact:!0}))))),void 0!==t.friendly_name&&(this._friendlyName=t.friendly_name)}_addItemClick(){this.newItem=!0,this._entry=Object.assign({},_i);let e=this.Config.GetGroups();1==e.length&&(this.selectGroup(e[0].id),this._entry.action&&this._confirmItemClick()),this._friendlyName=void 0,this._view=xi.NewSchedule}_cancelEditClick(){this.newItem=!1,this.editItem=null,this._view=xi.Overview}_confirmItemClick(){this.Config.FindAction(this._entry.entity,this._entry.action)?(this._entries=[this._entry],this._activeEntry=0,this._view=xi.TimePicker):"make_scheme"==this._entry.action&&(this._entries=[...bi].map(e=>Object.assign(e,{entity:this._entry.entity})),this._entry=Object.assign({},_i),this._activeEntry=null,this._view=xi.TimeScheme)}_saveItemClick(){let e=this._entries;null!==this._activeEntry&&(e[this._activeEntry]=this._entry);let t=function(e,t,r){let i=[],a=[],s=[],n={};e.forEach(e=>{var r;let o=t.FindAction(e.entity,e.action);if(!o)return;let l={entity:e.entity,service:Di(o.service)?o.service:`${Di(e.entity)}.${o.service}`,service_data:{}};var c,d;o.hasOwnProperty("service_data")&&Object.assign(l,{service_data:o.service_data}),"variable"in e&&"variable"in o&&Object.assign(l,{service_data:(c=e.variable,d=o.variable,c.type==ae.Level?c.enabled?{[d.field]:Number(c.value)}:{}:c.type==ae.List?{[d.field]:String(c.value)}:{})});let u=a.findIndex(e=>Ri(e,l));u<0&&(u=a.push(l)-1);let h={actions:[u]};e.time.event?e.time.event&&Object.assign(h,{time:{event:mi(e.time.event),offset:di(e.time.value).time}}):Object.assign(h,{time:di(e.time.value).time}),e.endTime&&(e.time.event?e.time.event&&Object.assign(h,{end_time:{event:mi(e.endTime.event),offset:di(e.endTime.value).time}}):Object.assign(h,{end_time:di(e.endTime.value).time}));let p="daily";if(e.days.type==li.Workday?p="workday":e.days.type==li.Weekend?p="weekend":e.days.type==li.Custom&&(p="custom"),e.days.type==li.Custom?Object.assign(h,{days:{type:p,list:e.days.custom_days}}):Object.assign(h,{days:{type:p}}),"conditions"in e){let t=[];null===(r=e.conditions)||void 0===r||r.items.forEach(e=>{let r=s.findIndex(t=>Ri(t,e));r<0&&(r=s.push(e)-1),t.push(r)}),Object.assign(h,{conditions:{list:t,type:e.conditions.type}})}if(e.options){let t=[];Object.entries(e.options).forEach(([e,r])=>{let i=Object.entries(s).findIndex(([t,i])=>Ri({[e]:r},{[t]:i}));i<0&&(Object.assign(n,{[e]:r}),i=Object.keys(n).length-1),t.push(i)}),Object.assign(h,{options:t})}i.push(h)});let o={actions:a,entries:i};return s.length&&Object.assign(o,{conditions:s}),r&&void 0!==r&&Object.assign(o,{name:r}),Object.keys(n).length&&Object.assign(o,{options:n}),o}(e,this.Config,this._friendlyName);this.newItem?this._hass.callService("scheduler","add",t):this.editItem&&this._hass.callService("scheduler","edit",Object.assign(t,{entity_id:this.editItem})),this.newItem=!1,this.editItem=null,this._view=xi.Overview}_deleteItemClick(){let e=this.editItem;this._hass.callService("scheduler","remove",{entity_id:e}),this.newItem=!1,this.editItem=null,this._view=xi.Overview}_handleScheduleClick(e,t){"tap"==e.detail.action?this._editItemClick(t):this._toggleDisable(t)}_editItemClick(e){let t=this.schedules.find(t=>t.id==e);if(!t)return;let r=[...t.entries];t.entries.every(e=>e.endTime)?(r=function(e){e.sort((e,t)=>e.time.value>t.time.value?1:-1),e=e.map(e=>e.endTime.value<e.time.value?Object.assign(e,{endTime:{value:e.endTime.value+1440}}):e);let t=0;for(var r=0;r<e.length;r++){let i=e[r];i.time.value>t&&e.splice(r,0,Object.assign({time:{value:t},endTime:{value:i.time.value}},ki(i,["entity","days"]))),t=i.endTime.value}return t<1440&&e.push(Object.assign({time:{value:t},endTime:{value:1440}},ki(e[0],["entity","days"]))),e}(r),this._entry=Object.assign(Object.assign({},_i),ki(r[0],["entity","days"])),this._activeEntry=null,this._view=xi.TimeScheme):(this._entry=r[0],this._activeEntry=0,this._view=xi.TimePicker),this._entries=r,this.editItem=e,this._friendlyName=t.name}_toggleDisable(e){let t=this.schedules.find(t=>t.id==e);t&&(t.enabled?this._hass.callService("switch","turn_off",{entity_id:e}):this._hass.callService("switch","turn_on",{entity_id:e}))}_gotoOptionsClick(){this._view=xi.Options}_optionsBackClick(){this._entries.every(e=>e.endTime)?this._view=xi.TimeScheme:this._view=xi.TimePicker}},t([J({type:Array})],e.SchedulerCard.prototype,"schedules",void 0),t([J()],e.SchedulerCard.prototype,"_view",void 0),t([J({type:Object})],e.SchedulerCard.prototype,"_entry",void 0),t([J({type:String})],e.SchedulerCard.prototype,"_selectedGroup",void 0),t([J({type:Boolean})],e.SchedulerCard.prototype,"_addCondition",void 0),e.SchedulerCard=t([W("scheduler-card")],e.SchedulerCard)}({});
