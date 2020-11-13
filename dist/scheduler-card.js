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
    ***************************************************************************** */function t(e,t,i,s){var a,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(o=(n<3?a(o):n>3?a(t,i,o):a(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o
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
     */}const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},a=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${a}--\x3e`,o=new RegExp(`${a}|${n}`);class r{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],n=document.createTreeWalker(t.content,133,null,!1);let r=0,l=-1,h=0;const{strings:m,values:{length:p}}=e;for(;h<p;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)c(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=m[h],i=u.exec(t)[2],s=i.toLowerCase()+"$lit$",a=e.getAttribute(s);e.removeAttribute(s);const n=a.split(o);this.parts.push({type:"attribute",index:l,name:i,strings:n}),h+=n.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const s=e.parentNode,a=t.split(o),n=a.length-1;for(let t=0;t<n;t++){let i,n=a[t];if(""===n)i=d();else{const e=u.exec(n);null!==e&&c(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++l})}""===a[n]?(s.insertBefore(d(),e),i.push(e)):e.data=a[n],h+=n}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&l!==r||(l++,t.insertBefore(d(),e)),r=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(i.push(e),l--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),h++}}else n.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const c=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:s}=e,a=document.createTreeWalker(i,133,null,!1);let n=p(s),o=s[n],r=-1,c=0;const l=[];let d=null;for(;a.nextNode();){r++;const e=a.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==o&&o.index===r;)o.index=null!==d?-1:o.index-c,n=p(s,n),o=s[n]}l.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},p=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1};
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
const _=new WeakMap,v=e=>"function"==typeof e&&_.has(e),g={},f={};
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
class y{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let n,o=0,r=0,c=a.nextNode();for(;o<s.length;)if(n=s[o],l(n)){for(;r<n.index;)r++,"TEMPLATE"===c.nodeName&&(t.push(c),a.currentNode=c.content),null===(c=a.nextNode())&&(a.currentNode=t.pop(),c=a.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return i&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${a} `;class k{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],o=e.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===e.indexOf("--\x3e",o+1);const r=u.exec(e);t+=null===r?e+(i?w:n):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class ${constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new z(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!S(e))return e}let s="";for(let a=0;a<t;a++){s+=e[a];const t=i[a];if(void 0!==t){const e=t.value;if(x(e)||!S(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class z{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||x(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof k?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const i=new y(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const a of e)i=t[s],void 0===i&&(i=new j(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(a),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class O extends ${constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends z{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=N(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const N=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function D(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);return i=t.keyString.get(s),void 0===i&&(i=new r(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const M=new Map,P=new WeakMap;
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
     */const I=new
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
class{handleAttributeExpressions(e,t,i,s){const a=t[0];if("."===a){return new O(e,t.slice(1),i).parts}if("@"===a)return[new A(e,t.slice(1),s.eventContext)];if("?"===a)return[new E(e,t.slice(1),i)];return new $(e,t,i).parts}handleTextExpression(e){return new j(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const L=(e,...t)=>new k(e,t,"html",I)
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
     */,q=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const V=e=>t=>{const i=q(t.type,e);let s=M.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},M.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(a);if(n=s.keyString.get(o),void 0===n){const i=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,e),n=new r(t,i),s.keyString.set(o,n)}return s.stringsArray.set(t.strings,n),n},R=["html","svg"],H=new Set,B=(e,t,i)=>{H.add(e);const s=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:n}=a;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=a[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{R.forEach(t=>{const i=M.get(q(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),h(e,i)})})})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:a}=e;if(null==i)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let o=p(a),r=0,c=-1;for(;n.nextNode();){c++;for(n.currentNode===i&&(r=m(t),i.parentNode.insertBefore(t,i));-1!==o&&a[o].index===c;){if(r>0){for(;-1!==o;)a[o].index+=r,o=p(a,o);return}o=p(a,o)}}}(i,o,r.firstChild):r.insertBefore(o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const c=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(o,r.firstChild);const e=new Set;e.add(o),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const W={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Y=(e,t)=>t!==e&&(t==t||e==e),G={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:Y};class F extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=G){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const a=this[e];this[t]=s,this.requestUpdateInternal(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||G}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=Y){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||W,a="function"==typeof s?s:s.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||W.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=G){const s=this.constructor,a=s._attributeNameForProperty(e,i);if(void 0!==a){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const a=this.constructor;i=i||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}F.finalized=!0;
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
const Z=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),J=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function K(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):J(e,t)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ee(i,X)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ie={};class se extends F{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Q){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}var ae,ne,oe,re,ce;se.finalized=!0,se.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const a=i.scopeName,n=P.has(t),o=U&&11===t.nodeType&&!!t.host,r=o&&!H.has(a),c=r?document.createDocumentFragment():t;if(((e,t,i)=>{let a=P.get(t);void 0===a&&(s(t,t.firstChild),P.set(t,a=new j(Object.assign({templateFactory:D},i))),a.appendInto(t)),a.setValue(e),a.commit()})(e,c,Object.assign({templateFactory:V(a)},i)),r){const e=P.get(c);P.delete(c);const i=e.value instanceof y?e.value.template:void 0;B(a,c,i),s(t,t.firstChild),t.appendChild(c),P.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)},function(e){e.Level="LEVEL",e.List="LIST"}(ae||(ae={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(ne||(ne={})),function(e){e.Any="or",e.All="and"}(oe||(oe={})),function(e){e.Sunrise="SUNRISE",e.Sunset="SUNSET"}(re||(re={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(ce||(ce={}));var le;!function(e){e.Overview="OVERVIEW",e.NewSchedule="NEW_SCHEDULE",e.TimePicker="TIME_PICKER",e.TimeScheme="TIME_SCHEME",e.Options="OPTIONS"}(le||(le={}));function de(e,t,i=!0){let s=e>=0?Math.floor(e/60):Math.ceil(e/60),a=e-60*s;return a%t!=0&&(a=Math.round(a/t)*t),a>=60&&(s++,a-=60),s>=24&&i&&(s-=24),60*s+a}function ue(e,t={}){const i=!!t.amPm&&t.amPm,s=!!t.absolute&&t.absolute;e>=1440&&(e-=1440);let a=e>=0?Math.floor(e/60):Math.ceil(e/60);const n=e-60*a;let o="";i&&(o=a>=12?"PM":"AM",a>12?a-=12:0==a&&(a+=12));const r=String(Math.abs(a)).padStart(2,"0"),c=String(Math.abs(n)).padStart(2,"0"),l=a<0||n<0;return{hours:r,minutes:c,time:`${l&&!s?"-":""}${r}:${c}${i?" "+o:""}`,signed:l,amPm:o}}function he(e,t={}){const i=t.stepSize?t.stepSize:1,s=!!t.signed&&t.signed,a=t.max?t.max:1440,n=de(e,i);return n<0&&!s?e+=1440:n>=1440&&(e-=1440),n<-a?-a:n>a?a:e}function me(e){let t,i,s;if("object"==typeof e)return me(`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`);if(null!==(s=/^([0-9]{2}):([0-9]{2})$/.exec(e)))[t,i]=[Number(s[1]),Number(s[2])];else if(null!==(s=/^([0-9]{2}):([0-9]{2})\ (AM|PM)$/.exec(e)))[t,i]=[Number(s[1]),Number(s[2])],12==t&&"AM"==s[3]?t-=12:"PM"==s[3]&&12!=t&&(t+=12);else if(null!==(s=/^([0-9]{2})([0-9]{2})$/.exec(e)))[t,i]=[Number(s[1]),Number(s[2])];else{if(null!==(s=/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[\+|\-][0-9]{2}:[0-9]{2}$/.exec(e))){const e=new Date(s[0]);return me(`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`)}console.log(`failed to parse timestamp '${e}'`)}return 60*t+i}function pe(e){return e==re.Sunrise?"sunrise":"sunset"}const _e=/^([0-9]+)?D([0-7]+)?T([0-9SRDUW]+)T?([0-9SRDUW]+)?(A[A0-9]+)+(C([C0-9]+))?(F([F0-9]+))?$/,ve=/^([0-9]{4})?([SRDUW]{2})([0-9]{4})?$/;function ge(e){var t,i,s;const a=_e.exec(e),n={time:{value:0},days:{type:ce.Daily},actions:[]};if(a[1])"15"==a[1]?Object.assign(n,{days:{type:ce.Workday}}):"67"==a[1]&&Object.assign(n,{days:{type:ce.Weekend}});else{const e=a[2].split("").map(Number);e.sort(),1==e.length&&0==e[0]||Object.assign(n,{days:{type:ce.Custom,custom_days:e.filter(e=>0!=e)}})}const o=ve.exec(a[3]);if(o?Object.assign(n,{time:{event:"SR"==o[2]?re.Sunrise:re.Sunset,value:o[1]?-me(o[1]):me(o[3])}}):Object.assign(n,{time:{value:me(a[3])}}),a[4]){const e=ve.exec(a[4]);e?Object.assign(n,{endTime:{event:"SR"==e[2]?re.Sunrise:re.Sunset,value:e[1]?-me(e[1]):me(e[4])}}):Object.assign(n,{endTime:{value:me(a[4])}})}const r=null===(t=a[5].match(/A[0-9]+/g))||void 0===t?void 0:t.map(e=>Number(e.substring(1)));if(Object.assign(n,{actions:r}),a[6]){let e=null===(i=a[6].match(/C[0-9]+/g))||void 0===i?void 0:i.map(e=>Number(e.substring(1)));1==(null==e?void 0:e.length)&&a[7].length>1?(e=a[7].split("").map(Number),Object.assign(n,{conditions:{type:oe.All,items:e}})):Object.assign(n,{conditions:{type:oe.Any,items:e}})}if(a[8]){const e=null===(s=a[8].match(/F[0-9]+/g))||void 0===s?void 0:s.map(e=>Number(e.substring(1)));Object.assign(n,{options:e})}return n}function fe(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function ye(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function be(e){return e.charAt(0).toUpperCase()+e.slice(1)}function we(e){return"string"!=typeof e&&(e=String(e)),be(e.replace(/_/g," "))}function ke(e){if(e)return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"hass:"+e}function xe(e){return{type:ae.Level,field:e.field,name:e.name||e.field,min:e.min||0,max:e.max||255,step:e.step||1,optional:e.optional||!1,unit:e.unit||""}}function Se(e){const t=[];e.options.forEach(e=>t.push(Object.assign({},e)));return{type:ae.List,field:e.field,name:e.name||e.field,options:t.map(e=>e.name?e:Object.assign(e,{name:we(e.value)}))}}function $e(e,t){if("%"==t.unit){const i=t.min,s=t.max,a=t.step;let n=(e-t.min)/((t.max-t.min)/100);return n=Math.round(n/a)*a,n<i?n=i:n>s&&(n=s),`${n}${t.unit}`}return`${e}${t.unit}`}function ze(e){const t=[];let i=[];const s=e=>{e&&t.push(i.length?`in ${i.join("->")}: ${e}`:e)},a=(e,t)=>e.hasOwnProperty(t),n=(e,t)=>Array.isArray(t)?t.some(t=>n(e,t)):"array"==t?Array.isArray(e):typeof e===t,o=(e,t,i)=>{if(a(e,t)){n(e[t],i)||s(`'${t}' must be of type ${i}`)}else s(`missing required property '${t}'`)},r=(e,t,i)=>{if(!a(e,t))return;n(e[t],i)||s(`'${t}' must be of type ${i}`)},c=(e,t,i)=>{let o=!0;return a(e,t)&&n(e[t],"array")?e[t].some(e=>!n(e,i))&&(s(`'${t}' must be an array with items of type ${i}`),o=!1):o=!1,o};if(r(e,"discover_existing","boolean"),r(e,"standard_configuration","boolean"),r(e,"title",["boolean","string"]),r(e,"time_step","number"),r(e,"show_header_toggle","boolean"),r(e,"include","array"),c(e,"include","string"),r(e,"exclude","array"),c(e,"exclude","string"),r(e,"display_options","object"),a(e,"display_options")&&(i.push("display_options"),r(e.display_options,"primary_info",["string","array"]),r(e.display_options,"secondary_info",["string","array"]),r(e.display_options,"icon","string"),c(e.display_options,"primary_info","string"),c(e.display_options,"secondary_info","string")),i=[],r(e,"groups","array"),a(e,"groups")&&n(e.groups,"array")&&(i.push("groups"),e.groups.forEach((e,t)=>{i=["groups",t],o(e,"name","string"),r(e,"icon","string"),o(e,"include","array"),r(e,"exclude","array"),c(e,"include","string"),c(e,"exclude","string")})),i=[],r(e,"customize","object"),a(e,"customize")&&n(e.customize,"object")&&Object.keys(e.customize).forEach(t=>{if(i=["customize"],n(t,"string")||s(t+" is not allowed"),o(e.customize,t,"object"),a(e.customize,t)&&n(e.customize[t],"object")){i.push(t);const l=e.customize[t];r(l,"name","string"),r(l,"icon","string"),r(l,"actions","array"),c(l,"actions","object")&&l.actions.forEach((e,l)=>{i=["customize",t,l],(e=>{const t=i;r(e,"name","string"),r(e,"icon","string"),o(e,"service","string"),r(e,"service_data","object"),c(e,"service_data","string"),a(e,"service_data")&&n(e.service_data,"object")&&Object.keys(e.service_data).some(e=>!n(e,"string"))&&s("service_data items must have string as index type"),r(e,"variable","object"),a(e,"variable")&&n(e.variable,"object")&&(i.push("variable"),o(e.variable,"field","string"),r(e.variable,"name","string"),c(e.variable,"options","object")?e.variable.options.forEach((e,s)=>{i=t.concat(t,["variable",s]),o(e,"value","string"),r(e,"name","string"),r(e,"icon","string")}):(r(e.variable,"min","number"),r(e.variable,"max","number"),r(e.variable,"step","number"),r(e.variable,"optional","boolean"),r(e.variable,"unit","string")))})(e)}),i=["customize",t],r(l,"states",["array","object"]),c(l,"states","string"),a(l,"states")&&n(l.states[t],"object")&&(c(l,"states","string"),a(l,"states")&&n(l.states,"object")&&(i.push("states"),o(l.states,"min","number"),o(l.states,"max","number"),r(l.states,"step","number"),r(l.states,"unit","string")))}}),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`)}var je={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"vypnout režim"}},Ee={alarm_control_panel:"poplašný ovládací panel",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"světla",lock:"zámky",media_player:"média přehrávače",scene:"scény",script:"skripty",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},Oe={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",midnight:"půlnoc",noon:"poledne",at_sun_event:"na {sunEvent}"}},panel:{common:{title:"Plánovač"},overview:{no_entries:"Nejsou žádné položky k zobrazení",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},entity_picker:{no_groups_defined:"Nejsou definovány žádné skupiny",no_group_selected:"Nejprve vyberte skupinu",no_entities_for_group:"V této skupině nejsou žádné entity",no_entity_selected:"Nejprve vyberte entitu",no_actions_for_entity:"Pro tuto entitu neexistují žádné akce",make_scheme:"vytvořit schéma"},time_picker:{no_timeslot_selected:"Nejprve vyberte časový úsek"},conditions:{equal_to:"je",unequal_to:"není",all:"Vše",any:"žádný",no_conditions_defined:"Nejsou definovány žádné podmínky"},options:{repeat_type:"chování po spuštění"}}},Ce={services:je,domains:Ee,ui:Oe},Te=Object.freeze({__proto__:null,services:je,domains:Ee,ui:Oe,default:Ce}),Ae={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_away_mode:"Abwesenheitsmodus setzen"}},Ne={alarm_control_panel:"Alarmzentrale",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",scene:"Szene",script:"Skripte",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},De={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",midnight:"Mitternacht",noon:"Mittag",at_sun_event:"beim {sunEvent}"}},panel:{common:{title:"Zeitplaner"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",excluded_items:"{number}{if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},entity_picker:{no_groups_defined:"Es gibt keine Gruppe",no_group_selected:"Wähle zuerst eine Gruppe aus",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_entity_selected:"Wähle zuerst eine Entity aus",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",make_scheme:"Erstelle Zeitplan"},time_picker:{no_timeslot_selected:"Wähle zuerst ein Zeitfenster aus"},conditions:{equal_to:"ist",unequal_to:"ist nicht",all:"alle",any:"keine",no_conditions_defined:"Es sind keine Bedingungen definiert"},options:{repeat_type:"Verhalten im Anschluß"}}},Me={services:Ae,domains:Ne,ui:De},Pe=Object.freeze({__proto__:null,services:Ae,domains:Ne,ui:De,default:Me}),Ie={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ {preset_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},Le={alarm_control_panel:"alarm control panel",climate:"climate",cover:"covers",fan:"fans",group:"groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lights",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},qe={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",midnight:"midnight",noon:"noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Scheduler"},overview:{no_entries:"There are no items to show",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"There are no groups defined",no_group_selected:"Select a group first",no_entities_for_group:"There are no entities in this group",no_entity_selected:"Select an entity first",no_actions_for_entity:"There are no actions for this entity",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},Ue={services:Ie,domains:Le,ui:qe},Ve=Object.freeze({__proto__:null,services:Ie,domains:Le,ui:qe,default:Ue}),Re={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción [ a {temperature}]",set_temperature_hvac_mode_cool:"frío [ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste [ {preset_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición [ a {position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"establecer modo fuera de casa"}},He={alarm_control_panel:"panel de control de alarma",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luces",lock:"cerraduras",media_player:"reproductores",scene:"escenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},Be={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",midnight:"medianoche",noon:"mediodía",at_sun_event:"a la {sunEvent}"}},panel:{common:{title:"Programador"},overview:{no_entries:"No hay ningún elemento que mostrar",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},entity_picker:{no_groups_defined:"No hay ningún grupo definido",no_group_selected:"selecciona un grupo primero",no_entities_for_group:"no hay ningúna entidad en este grupo",no_entity_selected:"selecciona una entidad primero",no_actions_for_entity:"no hay acciones para esta entidad",make_scheme:"crear planificación"},time_picker:{no_timeslot_selected:"selecciona un bloque de tiempo primero"},conditions:{equal_to:"igual a",unequal_to:"desigual a",all:"todos",any:"cualquiera",no_conditions_defined:"no hay ninguna condición definida"},options:{repeat_type:"acción después de ejecutar"}}},We={services:Re,domains:He,ui:Be},Ye=Object.freeze({__proto__:null,services:Re,domains:He,ui:Be,default:We}),Ge={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},script:{script:"käivitae"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_away_mode:"kodust ära"}},Fe={alarm_control_panel:"valvepaneel",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",light:"valgustid",lock:"lukud",media_player:"meediamängijad",scene:"stseenid",script:"skriptud",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},Ze={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",midnight:"keskööl",noon:"keskpäeval",at_sun_event:"{sunEvent}"}},panel:{common:{title:"Ajastaja"},overview:{no_entries:"Ajastused puuduvad",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},entity_picker:{no_groups_defined:"Gruppe pole valitud",no_group_selected:"Vali alustuseks grupid",no_entities_for_group:"Selles grupis puuduvad olemid",no_entity_selected:"Vali alustuseks olem",no_actions_for_entity:"Selle olemi jaoks pole tegevusi",make_scheme:"loo skeem"},time_picker:{no_timeslot_selected:"Alustuseks vali ajavahemik"},conditions:{equal_to:"võrdub",unequal_to:"ei võrdu",all:"kõik",any:"iga",no_conditions_defined:"Tingimusi pole määratud"},options:{repeat_type:"toiming peale käivitumist"}}},Je={services:Ge,domains:Fe,ui:Ze},Ke=Object.freeze({__proto__:null,services:Ge,domains:Fe,ui:Ze,default:Je}),Qe={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidi[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"alumer[ avec {brightness} luminosité]"},media_player:{select_source:"choisir la source[ {source}]"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_away_mode:"ajuster au mode absent"}},Xe={alarm_control_panel:"panneau de contrôle de l'alarme",climate:"climat",cover:"connecteurs",fan:"ventilateurs",group:"groupes",humidifier:"humidificateurs",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",light:"lumière",lock:"serrure",media_player:"lecteurs multimédias",scene:"scènes",script:"scripts",switch:"interrupteurs",vacuum:"aspirateur",water_heater:"chauffe eau"},et={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"fin de semaine"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"en fin de semaine"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",midnight:"minuit",noon:"midi",at_sun_event:"au {sunEvent}"}},panel:{common:{title:"Planificateur"},overview:{no_entries:"il n'y a pas d'item a montrer",excluded_items:"{number} exclu(s) {if number is 1} item {else} items",hide_excluded:"cacher les items exclus",additional_tasks:"{number} de plus {if number is 1} tâche {else} tâches"},entity_picker:{no_groups_defined:"Aucun groupe défini",no_group_selected:"Choisir un groupe en premier",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_entity_selected:"Choisir une entité en premier",no_actions_for_entity:"Il n'y a pas d'action pour cet entité",make_scheme:"faire un schéma"},time_picker:{no_timeslot_selected:"Choisir une plage horaire en premier"},conditions:{equal_to:"égal à",unequal_to:"inégal à",all:"tous",any:"tout",no_conditions_defined:"Il n'y a pas de condition définie"},options:{repeat_type:"comportement après déclenchement"}}},tt={services:Qe,domains:Xe,ui:et},it=Object.freeze({__proto__:null,services:Qe,domains:Xe,ui:et,default:tt}),st={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_cool:"hőmérséklet[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},at={alarm_control_panel:"alarm control panel",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",light:"lámpa",lock:"locks",media_player:"lejátszó",scene:"jelenetek",script:"scripts",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},nt={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",midnight:"éjfél",noon:"dél",at_sun_event:"{sunEvent}kor"}},panel:{common:{title:"Időzítések"},overview:{no_entries:"Nincs megjeleníthető elem",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},entity_picker:{no_groups_defined:"Nincsenek deffiniált csoportok",no_group_selected:"Előbb egy csoportot szükséges választani",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_entity_selected:"Előbb egy entitást szükséges választani",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},ot={services:st,domains:at,ui:nt},rt=Object.freeze({__proto__:null,services:st,domains:at,ui:nt,default:ot}),ct={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_away_mode:"imposta fuori casa"}},lt={alarm_control_panel:"pannello di controllo allarme",climate:"clima",cover:"cover",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luci",lock:"lucchetti",media_player:"media player",scene:"scene",script:"script",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},dt={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",midnight:"mezzanotte",noon:"mezzogiorno",at_sun_event:"al {sunEvent}"}},panel:{common:{title:"Schedulatore"},overview:{no_entries:"Non ci sono oggetti da visualizzare",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},entity_picker:{no_groups_defined:"Non ci sono gruppi definiti",no_group_selected:"Seleziona prima un gruppo",no_entities_for_group:"Non ci sono entità in questo gruppo",no_entity_selected:"Seleziona prima un'entità",no_actions_for_entity:"Non ci sono azioni per questa entità",make_scheme:"crea schema"},time_picker:{no_timeslot_selected:"Seleziona prima una fascia oraria"},conditions:{equal_to:"uguale",unequal_to:"non uguale",all:"tutte",any:"qualunque",no_conditions_defined:"Non ci sono condizioni definite"},options:{repeat_type:"comportamento dopo l'attivazione"}}},ut={services:ct,domains:lt,ui:dt},ht=Object.freeze({__proto__:null,services:ct,domains:lt,ui:dt,default:ut}),mt={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]"},fan:{set_speed:"snelheid instellen[ op {speed}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_away_mode:"stel afwezigheidsmode in"}},pt={alarm_control_panel:"alarmsystemen",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"verlichting",lock:"sloten",media_player:"mediaspelers",scene:"scènes",script:"scripts",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},_t={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",midnight:"middernacht",noon:"12:00",at_sun_event:"bij {sunEvent}"}},panel:{common:{title:"Tijdplanner"},overview:{no_entries:"Er zijn geen items aangemaakt",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},entity_picker:{no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",make_scheme:"maak schema"},time_picker:{no_timeslot_selected:"Kies eerst een tijdsslot"},conditions:{equal_to:"is",unequal_to:"is niet",all:"en",any:"of",no_conditions_defined:"Er zijn geen voorwaarden gedefinieerd"},options:{repeat_type:"gedrag na activeren"}}},vt={services:mt,domains:pt,ui:_t},gt=Object.freeze({__proto__:null,services:mt,domains:pt,ui:_t,default:vt}),ft={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_heat:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_cool:"sett temperatur[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ {preset_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"slå på[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},yt={alarm_control_panel:"alarm control panel",climate:"klima",cover:"covers",fan:"vifter",group:"groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lys",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"brytere",vacuum:"støvsugere",water_heater:"water heaters"},bt={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},days:"Dager",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",midnight:"midnight",noon:"noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Tidsplan"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"Ingen grupper definert",no_group_selected:"Velg en gruppe først",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_entity_selected:"Velg en entitet først",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},wt={services:ft,domains:yt,ui:bt},kt=Object.freeze({__proto__:null,services:ft,domains:yt,ui:bt,default:wt}),xt={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"ustaw tryb nieobecności"}},St={alarm_control_panel:"panel kontrolny alarmu",climate:"klimatyzacja",cover:"rolety",fan:"wentylatory",group:"grupy",humidifier:"nawilżacze",input_boolean:"wejście logiczne",input_number:"wejście liczbowe",input_select:"wybór wejścia",light:"światła",lock:"zamki",media_player:"odtwarzacze",scene:"sceny",script:"skrypty",switch:"przełączniki",vacuum:"odkurzacze",water_heater:"podgrzewacze wody"},$t={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",midnight:"północ",noon:"południe",at_sun_event:"o {sunEvent}"}},panel:{common:{title:"Harmonogram"},overview:{no_entries:"Nie ma elementów do pokazania",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},entity_picker:{no_groups_defined:"Nie ma zdefiniowanych grup",no_group_selected:"Najpierw wybierz grupę",no_entities_for_group:"Nie ma encji w tej grupie",no_entity_selected:"Najpierw wybierz encję",no_actions_for_entity:"Nie ma akcji dla tej encji",make_scheme:"stwórz schemat"},time_picker:{no_timeslot_selected:"Najpierw wybierz przedział czasowy"},conditions:{equal_to:"jest równe ",unequal_to:"nie jest równe",all:"wszystkie",any:"dowolny",no_conditions_defined:"Nie ma zdefiniowanych warunków"},options:{repeat_type:"zachowanie po wyzwoleniu"}}},zt={services:xt,domains:St,ui:$t},jt={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},Et={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},Ot={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",midnight:"meia-noite",noon:"meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},Ct={services:jt,domains:Et,ui:Ot},Tt={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},At={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},Nt={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",midnight:"meia-noite",noon:"meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},Dt={services:Tt,domains:At,ui:Nt},Mt={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_away_mode:"setare mod plecat"}},Pt={alarm_control_panel:"panou control alarmă",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",light:"lumini",lock:"încuietori",media_player:"media playere",scene:"scene",script:"scripturi",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},It={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",midnight:"miezul nopții",noon:"amiază",at_sun_event:"la {sunEvent}"}},panel:{common:{title:"Planificator"},overview:{no_entries:"Nu există elemente de afișat",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},entity_picker:{no_groups_defined:"Nu există grupuri definite",no_group_selected:"Prima dată selectați un grup",no_entities_for_group:"Nu există entități definite în acest grup",no_entity_selected:"Prima dată selectați o entitate",no_actions_for_entity:"Nu există acțiuni pentru această entitate",make_scheme:"creare schemă"},time_picker:{no_timeslot_selected:"Prima dată selectați un interval orar"},conditions:{equal_to:"este",unequal_to:"nu este",all:"tot",any:"oricare",no_conditions_defined:"Nu există condiții definite"},options:{repeat_type:"comportament după declanșare"}}},Lt={services:Mt,domains:Pt,ui:It},qt={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_away_mode:"установить режим вне дома"}},Ut={alarm_control_panel:"панель управления сигнализацией",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",light:"освещение",lock:"замки",media_player:"медиа-плееры",scene:"сцены",script:"скрипты",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},Vt={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",midnight:"полночь",noon:"полдень",at_sun_event:"в {sunEvent}"}},panel:{common:{title:"Планировщик"},overview:{no_entries:"Отсутствуют элементы",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},entity_picker:{no_groups_defined:"Не определены группы",no_group_selected:"Выберите группу",no_entities_for_group:"Отсутствуют элементы в группе",no_entity_selected:"Выберите элемент",no_actions_for_entity:"Нет действий для этого элемента",make_scheme:"создать схему"},time_picker:{no_timeslot_selected:"Выберите временной слот"},conditions:{equal_to:"равно",unequal_to:"не равно",all:"все",any:"любое",no_conditions_defined:"Не определены условия"},options:{repeat_type:"поведение после срабатывания"}}},Rt={services:qt,domains:Ut,ui:Vt};const Ht={cs:Te,de:Pe,en:Ve,es:Ye,et:Ke,es_419:Ye,fr:it,hu:rt,it:ht,nb:kt,nl:gt,nn:kt,no:kt,pl:Object.freeze({__proto__:null,services:xt,domains:St,ui:$t,default:zt}),pt:Object.freeze({__proto__:null,services:jt,domains:Et,ui:Ot,default:Ct}),pt_BR:Object.freeze({__proto__:null,services:Tt,domains:At,ui:Nt,default:Dt}),ro:Object.freeze({__proto__:null,services:Mt,domains:Pt,ui:It,default:Lt}),ru:Object.freeze({__proto__:null,services:qt,domains:Ut,ui:Vt,default:Rt})};function Bt(e,t,i="",s=""){let a;try{if("test"==t)return"TRANSLATED";a=e.split(".").reduce((e,t)=>e[t],Ht[t]),a||(a=e.split(".").reduce((e,t)=>e[t],Ht.en))}catch(t){try{a=e.split(".").reduce((e,t)=>e[t],Ht.en)}catch(e){a=""}}if(""!==i&&""!==s&&a){Array.isArray(i)||(i=[i]),Array.isArray(s)||(s=[s]);for(let e=0;e<i.length;e++){a=a.replace(String(i[e]),String(s[e]));const t=a.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){a=String(s[e])==t[2]?a.replace(t[0],t[3]):a.replace(t[0],t[4])}}}return a}const Wt=te`
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
  `,Yt=new WeakMap,Gt=(e=>(...t)=>{const i=e(...t);return _.set(i,!0),i})(e=>t=>{if(!(t instanceof j))throw new Error("unsafeHTML can only be used in text bindings");const i=Yt.get(t);if(void 0!==i&&x(e)&&e===i.value&&t.value===i.fragment)return;const s=document.createElement("template");s.innerHTML=e;const a=document.importNode(s.content,!0);t.setValue(a),Yt.set(t,{value:e,fragment:a})});
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
     */var Ft=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,Zt="[^\\s]+",Jt=/\[([^]*?)\]/gm;function Kt(e,t){for(var i=[],s=0,a=e.length;s<a;s++)i.push(e[s].substr(0,t));return i}var Qt=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function Xt(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var n=a[s];for(var o in n)e[o]=n[o]}return e}var ei=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ti=["January","February","March","April","May","June","July","August","September","October","November","December"],ii=Kt(ti,3),si={dayNamesShort:Kt(ei,3),dayNames:ei,monthNamesShort:ii,monthNames:ti,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},ai=Xt({},si),ni=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},oi={D:function(e){return String(e.getDate())},DD:function(e){return ni(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ni(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ni(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ni(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ni(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ni(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ni(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ni(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ni(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ni(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ni(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ni(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ni(Math.floor(Math.abs(t)/60),2)+":"+ni(Math.abs(t)%60,2)}},ri=function(e){return+e-1},ci=[null,"[1-9]\\d?"],li=[null,Zt],di=["isPm",Zt,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],ui=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],hi=(Qt("monthNamesShort"),Qt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var mi=function(e,t,i){if(void 0===t&&(t=hi.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=hi[t]||t).replace(Jt,(function(e,t){return s.push(t),"@@@"}));var a=Xt(Xt({},ai),i);return(t=t.replace(Ft,(function(t){return oi[t](e,a)}))).replace(/@@@/g,(function(){return s.shift()}))},pi=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(e){return mi(e,"shortTime")});function _i(e){return e.substr(0,e.indexOf("."))}function vi(e){return e.substr(e.indexOf(".")+1)}var gi=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a};const fi=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];const yi=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?(e,t,i)=>{if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}return e.toLocaleDateString(t,{weekday:i?"short":"long"})}:(e,t,i)=>function(e,t,i){if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}let s=e.getDay();return i?fi[s].substr(0,3):fi[s]}(e,0,i),bi=[60,60,24,7],wi=["second","minute","hour","day"];let ki=class extends se{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const s=i>=0?"past":"future";i=Math.abs(i);let a=Math.round(i);if(0===a)return this._hass.localize("ui.components.relative_time.just_now");if("future"==s){if(i/3600>=6){const i=t.setHours(0,0,0,0),s=Math.floor((e.valueOf()-i.valueOf())/864e5);let a="";1==s&&0==e.getHours()&&0==e.getMinutes()?a=Bt("ui.components.date.tomorrow",this._hass.language):s>0&&(a=yi(e,this._hass.language));let n=pi(e,this._hass.language);return 12==e.getHours()&&0==e.getMinutes()?n=Bt("ui.components.time.noon",this._hass.language):0==e.getHours()&&0==e.getMinutes()&&(n=Bt("ui.components.time.midnight",this._hass.language)),String(a+" "+Bt("ui.components.time.absolute",this._hass.language,"{time}",n)).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.components.relative_time.duration.minute","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.hour","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.hour","count",1)} ${s} ${t}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.components.relative_time.duration.second","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.minute","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.minute","count",1)} ${s} ${t}`}}let n="week";for(let e=0;e<bi.length;e++){if(a<bi[e]){n=wi[e];break}i/=bi[e],a=Math.round(i)}if(this._hass.localize("ui.components.relative_time."+s)){const e=this._hass.localize("ui.components.relative_time.duration."+n,"count",a);return this._hass.localize("ui.components.relative_time."+s,"time",e)}return this._hass.localize(`ui.components.relative_time.${s}_duration.${n}`,"count",a)}render(){if(!this._hass||!this.datetime)return L``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),L`
      ${be(this.relativeTime(this.datetime))}
    `}};t([K()],ki.prototype,"_hass",void 0),t([K()],ki.prototype,"datetime",void 0),ki=t([Z("my-relative-time")],ki);const xi=["disarmed","armed_away","armed_home","armed_night"],Si=(e,t)=>{const i=[{value:"none",name:e("state_attributes.climate.preset_mode.none"),icon:"hass:cancel"},{value:"eco",name:e("state_attributes.climate.preset_mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.climate.preset_mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.climate.preset_mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.climate.preset_mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.climate.preset_mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.climate.preset_mode.sleep"),icon:"hass:sleep"},{value:"activity",name:e("state_attributes.climate.preset_mode.activity"),icon:"hass:account-alert-outline"}];return t&&t.attributes.preset_list&&Array.isArray(t.attributes.preset_list)?t.attributes.preset_list.map(e=>i.find(t=>t.value==e)||{value:e}):i},$i=(e,t,i)=>{const s=t?t.attributes.hvac_modes:[];let a=((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:e("state.climate.off")},{value:"heat",icon:"hass:fire",name:e("state.climate.heat")},{value:"cool",icon:"hass:snowflake",name:e("state.climate.cool")},{value:"heat_cool",icon:"hass:thermometer",name:e("state.climate.heat_cool")},{value:"auto",icon:"hass:autorenew",name:e("state_attributes.climate.auto")},{value:"dry",icon:"hass:water-percent",name:e("state.climate.dry")},{value:"fan_only",icon:"hass:fan",name:e("state.climate.fan_only")}];return t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i})(e.localize,t);const n=[{service:"climate.set_preset_mode",variable:Se({field:"preset_mode",name:e.localize("ui.card.climate.preset_mode"),options:Si(e.localize,t)}),icon:"hass:cloud-download-outline",name:Bt("services.climate.set_preset_mode",e.language),supported_feature:16}];return i&&!s.includes("off")||(n.push({service:"climate.set_hvac_mode",service_data:{hvac_mode:"off"},icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(a=a.filter(e=>"off"!=e.value))),i&&s.includes("off")||n.push({service:"climate.turn_off",icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(s.includes("cool")||s.includes("heat"))||n.push({service:"climate.set_temperature",variable:xe({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:thermometer",name:Bt("services.climate.set_temperature",e.language),supported_feature:1}),i&&!s.includes("heat")||(n.push({service:"climate.set_temperature",service_data:{hvac_mode:"heat"},variable:xe({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:fire",name:Bt("services.climate.set_temperature_hvac_mode_heat",e.language),supported_feature:1}),i&&(a=a.filter(e=>"heat"!=e.value))),i&&!s.includes("cool")||(n.push({service:"climate.set_temperature",service_data:{hvac_mode:"cool"},variable:xe({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:snowflake",name:Bt("services.climate.set_temperature_hvac_mode_cool",e.language),supported_feature:1}),i&&(a=a.filter(e=>"cool"!=e.value))),n.push({service:"climate.set_hvac_mode",variable:Se({field:"hvac_mode",name:e.localize("ui.card.climate.operation"),options:a}),icon:"hass:cog-transfer-outline",name:Bt("services.climate.set_hvac_mode",e.language)}),n},zi=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage";case"door":return"hass:door-closed";case"shutter":return"hass:window-shutter";case"blind":return"hass:blinds";case"window":return"hass:window-closed";default:return"hass:window-shutter"}},ji=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage-open";case"door":return"hass:door-open";case"shutter":return"hass:window-shutter-open";case"blind":return"hass:blinds-open";case"window":return"hass:window-open";default:return"hass:window-shutter-open"}},Ei=["open","closed"],Oi=(e,t)=>{const i=[{value:"off",icon:"hass:fan-off",name:e("state.default.off").toLowerCase()},{value:"low",icon:"hass:fan-speed-1",name:e("ui.card.climate.low").toLowerCase()},{value:"medium",icon:"hass:fan-speed-2"},{value:"high",icon:"hass:fan-speed-3",name:e("ui.card.climate.high").toLowerCase()}];return t&&t.attributes.speed_list&&Array.isArray(t.attributes.speed_list)?t.attributes.speed_list.map(e=>i.find(t=>t.value==e)||{value:e}):i},Ci=(e,t)=>{const i=[{value:"normal",name:e("state_attributes.humidifier.mode.normal"),icon:"hass:account-outline"},{value:"eco",name:e("state_attributes.humidifier.mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.humidifier.mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.humidifier.mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.humidifier.mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.humidifier.mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.humidifier.mode.sleep"),icon:"hass:account-sleep"},{value:"auto",name:e("state_attributes.humidifier.mode.auto"),icon:"hass:autorenew"},{value:"baby",name:e("state_attributes.humidifier.mode.baby"),icon:"hass:baby-bottle-outline"}];return t&&t.attributes.available_modes&&Array.isArray(t.attributes.available_modes)?t.attributes.available_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i},Ti=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?t.attributes.options.map(e=>({value:String(e)})):[],Ai=["locked","unlocked"],Ni=(e,t)=>t&&t.attributes.source_list&&Array.isArray(t.attributes.source_list)?Array(t.attributes.source_list).map(e=>({value:String(e)})):[],Di=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?Array(t.attributes.options).map(e=>({value:String(e)})):[];function Mi(e){const t=e=>Object.entries(e).sort((e,t)=>e[0]>t[0]?1:-1).map(([e,i])=>[e,"object"==typeof i&&null!==i?t(i):i]).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{});let i={service:e.service};e.service_data&&Object.keys(e.service_data).length&&(i=Object.assign(Object.assign({},i),{service_data:e.service_data}),i=t(i));return Object.values(i).map(e=>JSON.stringify(e).replace(/[\W]/g," ").split(" ").filter(e=>" "!=e&&""!=e).join("_")).join("_")}function Pi(e,t){return Mi(e)==Mi(t)||!!e.variable&&Mi(e)==Mi(Object.assign(Object.assign({},t),{service_data:ye(t.service_data,[e.variable.field])}))}function Ii(e,t,i=!1){const s=_i(e),a=t.states[e];switch(s){case"alarm_control_panel":return((e,t)=>[{service:"alarm_control_panel.alarm_disarm",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.alarm_control_panel.disarm")},{service:"alarm_control_panel.alarm_arm_home",icon:"hass:home-outline",name:e.localize("ui.card.alarm_control_panel.arm_home"),supported_feature:1},{service:"alarm_control_panel.alarm_arm_away",icon:"hass:exit-run",name:e.localize("ui.card.alarm_control_panel.arm_away"),supported_feature:2},{service:"alarm_control_panel.alarm_arm_night",icon:"hass:power-sleep",name:e.localize("ui.card.alarm_control_panel.arm_night"),supported_feature:4},{service:"alarm_control_panel.alarm_arm_custom_bypass",icon:"hass:shield-lock-outline",name:e.localize("ui.card.alarm_control_panel.arm_custom_bypass"),supported_feature:16}])(t);case"climate":return $i(t,a,i);case"cover":return((e,t)=>[{service:"cover.open_cover",icon:ji(t),name:Bt("services.cover.open_cover",e.language)},{service:"cover.close_cover",icon:zi(t),name:Bt("services.cover.close_cover",e.language)},{service:"cover.set_cover_position",variable:xe({field:"position",name:e.localize("ui.card.cover.position",e.language),min:0,max:100,step:1,unit:"%"}),supported_feature:4,icon:"hass:ray-vertex",name:Bt("services.cover.set_cover_position",e.language)}])(t,a);case"fan":return((e,t)=>[{service:"fan.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"fan.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"fan.set_speed",variable:Se({field:"speed",name:e.localize("ui.card.fan.speed"),options:Oi(e.localize,t)}),supported_feature:1,icon:"hass:weather-windy",name:Bt("services.fan.set_speed",e.language)},{service:"fan.oscillate",variable:Se({field:"oscillating",name:e.localize("ui.card.fan.oscillate"),options:[{value:"True",name:e.localize("state.default.on"),icon:"hass:flash"},{value:"False",name:e.localize("state.default.off"),icon:"hass:flash-off"}]}),supported_feature:2,icon:"hass:arrow-left-right",name:Bt("services.fan.oscillate",e.language)},{service:"fan.set_direction",variable:Se({field:"direction",name:e.localize("ui.card.fan.direction"),options:[{value:"forward",name:e.localize("ui.card.fan.forward"),icon:"hass:autorenw"},{value:"reverse",name:e.localize("ui.card.fan.reverse"),icon:"hass:sync"}]}),supported_feature:4,icon:"hass:cog-clockwise",name:Bt("services.fan.set_direction",e.language)}])(t,a);case"group":const e=(a.attributes.entity_id||[]).map(e=>Ii(e,t));return o=e,((n=a)&&n.attributes.entity_id&&Array.isArray(n.attributes.entity_id)?n.attributes.entity_id:[]).map(e=>_i(e)).filter((e,t,i)=>i.indexOf(e)===t).length>1&&(o=o.map(e=>e.map(e=>"turn_on"==vi(e.service)||"turn_off"==vi(e.service)?Object.assign(Object.assign({},e),{service:"homeassistant."+vi(e.service),icon:"turn_on"==vi(e.service)?"flash":"flash-off"}):e))),o[0].filter(e=>o.every(t=>t.map(e=>Mi(e)).includes(Mi(e))));case"humidifer":return((e,t)=>[{service:"humidifier.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"humidifier.set_humidity",variable:xe({field:"humidity",name:e.localize("ui.card.humidifier.humidity"),min:(null==t?void 0:t.attributes.min_humidity)||0,max:(null==t?void 0:t.attributes.max_humidity)||255,step:1,unit:"%"}),icon:"hass:water-percent",name:Bt("services.humidifer.set_humidity",e.language)},{service:"humidifier.set_mode",variable:Se({field:"mode",name:e.localize("ui.card.humidifier.mode"),options:Ci(e.localize,t)}),icon:"hass:cog-transfer-outline",name:Bt("services.climate.set_mode",e.language)}])(t,a);case"input_boolean":return((e,t)=>[{service:"input_boolean.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"input_boolean.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"input_number":return((e,t)=>[{service:"input_number.set_value",variable:xe({field:"value",name:e.localize("ui.panel.config.helpers.types.input_number"),min:t&&t.attributes.min?Number(t.attributes.min):0,max:t&&t.attributes.max?Number(t.attributes.max):255,step:t&&t.attributes.step?Number(t.attributes.step):1,unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}),icon:"hass:counter",name:Bt("services.input_number.set_value",e.language)}])(t,a);case"input_select":return((e,t)=>[{service:"input_select.select_option",variable:Se({field:"mode",name:e.localize("ui.card.humidifier.mode"),options:Ti(e.localize,t)}),icon:"counter",name:Bt("services.input_select.select_option",e.language)}])(t,a);case"light":return((e,t)=>{const i=[{service:"light.turn_off",icon:"hass:lightbulb-off",name:e.localize("ui.card.media_player.turn_off")}];return!t||!t.attributes.supported_features||1&t.attributes.supported_features?i.push({service:"light.turn_on",variable:xe({field:"brightness",name:e.localize("ui.card.light.brightness"),min:0,max:255,step:1,unit:"%",optional:!0}),icon:"hass:lightbulb-on",name:Bt("services.light.turn_on",e.language),supported_feature:1}):i.push({service:"light.turn_on",icon:"hass:lightbulb-on",name:e.localize("ui.card.media_player.turn_on")}),i})(t,a);case"lock":return((e,t)=>[{service:"lock.unlock",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.lock.unlock")},{service:"lock.lock",icon:"hass:lock-outline",name:e.localize("ui.card.lock.lock")}])(t);case"media_player":return((e,t)=>[{service:"media_player.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:128},{service:"media_player.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off"),supported_feature:256},{service:"media_player.select_source",variable:Se({field:"source",name:e.localize("ui.card.media_player.source"),options:Ni(e.localize,t)}),icon:"hass:music-box-multiple-outline",name:Bt("services.media_player.select_source",e.language),supported_feature:2048}])(t,a);case"scene":return((e,t)=>[{service:"scene.turn_on",icon:"hass:play",name:e.localize("ui.card.media_player.turn_on")}])(t);case"script":return((e,t)=>{const i=[{service:"script.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"script.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}];return t&&i.push({service:"script."+vi(t.entity_id),icon:"hass:play",name:Bt("services.script.script",e.language)}),i})(t,a);case"switch":return((e,t)=>[{service:"switch.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"switch.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"vacuum":return((e,t)=>[{service:"vacuum.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:1},{service:"vacuum.start",icon:"hass:play-circle-outline",name:e.localize("ui.card.vacuum.start_cleaning"),supported_feature:8192},{service:"vacuum.start_pause",icon:"hass:play-circle-outline",name:Bt("services.vacuum.start_pause",e.language),supported_feature:4}])(t);case"water_heater":return((e,t)=>[{service:"water_heater.set_temperature",variable:xe({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:thermometer",name:Bt("services.climate.set_temperature",e.language),supported_feature:1},{service:"water_heater.set_operation_mode",variable:Se({field:"operation_mode",name:e.localize("ui.card.water_heater.operation"),options:Di(e.localize,t)}),icon:"hass:cog-transfer-outline",name:Bt("services.climate.set_mode",e.language),supported_feature:2},{service:"water_heater.set_away_mode",variable:Se({field:"mode",name:e.localize("ui.card.water_heater.away_mode"),options:[{value:"on",name:e.localize("ui.card.input_boolean.on"),icon:"hass:toggle-switch-outline"},{value:"off",name:e.localize("ui.card.input_boolean.off"),icon:"hass:toggle-switch-off-outline"}]}),icon:"hass:car-traction-control",name:Bt("services.water_heater.set_away_mode",e.language),supported_feature:4}])(t,a);default:return[]}var n,o}function Li(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=e.includes(".")?e==t:e==_i(t);else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}function qi(e,t){let i=!1;return(t.include&&t.include.find(t=>Li(t,e))||t.customize&&Object.keys(t.customize).find(t=>Li(t,e)))&&(i=!0),t.exclude&&t.exclude.find(t=>Li(t,e))&&(i=!1),i}function Ui(e){return e.match(/^switch.schedule_[0-9a-f]{6}$/)}function Vi(e,t){return!Ui(e)&&!!(qi(e,t)||t.groups&&t.groups.some(t=>qi(e,t)))}function Ri(e,t,i){const s=t.states[e];let a=[];if((void 0===i.standard_configuration||i.standard_configuration)&&(a=Ii(e,t,!0)),i.customize){const t=Object.entries(i.customize).filter(([t])=>Li(t,e)).sort((e,t)=>t[0].length-e[0].length);t.filter(([,e])=>e.exclude_actions&&e.exclude_actions.length).map(([,e])=>e.exclude_actions).reduce((e,t)=>e.concat(t),[]).forEach(e=>{"all"==e&&(a=[]),a=a.filter(t=>!t.name||!t.name.replace(/_/g," ").trim().toLowerCase().includes(e.replace(/_/g," ").trim().toLowerCase()))}),t.filter(([,e])=>e.actions&&e.actions.length).map(([,e])=>e.actions).reduce((e,t)=>e.concat(t),[]).forEach(t=>{_i(t.service).length||(t=Object.assign(Object.assign({},t),{service:_i(e)+"."+vi(t.service)}));let i=a.findIndex(e=>Pi(e,t));if(i>=0&&t.service_data&&Mi(t)!=Mi(a[i])&&(i=-1),i>=0){let e=Object.assign(Object.assign({},a[i]),ye(t,["variable"]));t.variable&&(e=Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable||{}),t.variable)})),a=Object.values(Object.assign(Object.assign({},a),{[i]:e}))}else a.push(t)})}if(s&&s.attributes&&s.attributes.supported_features){const e=s.attributes.supported_features;a=a.filter(t=>!t.supported_feature||t.supported_feature&e)}return a=a.map(e=>{if(e.variable&&e.variable.type==ae.List){const t=e.variable;if(!t.options.length)return null;if(1==t.options.length){const i=t.options[0],s=Object.assign(Object.assign({},e.service_data||{}),{[t.field]:i.value});return Object.assign(Object.assign({},e),{icon:i.icon||e.icon,service_data:s})}}return e}).filter(e=>e),a}function Hi(e){let t={id:Mi(e),service:e.service};return t=Object.assign(Object.assign({},t),ye(e,["variable"])),t.name||(t=Object.assign(Object.assign({},t),{name:vi(e.service)})),t.icon||(t=Object.assign(Object.assign({},t),{icon:"flash"})),e.variable&&(t="options"in e.variable?Object.assign(Object.assign({},t),{variable:Se(e.variable)}):Object.assign(Object.assign({},t),{variable:xe(e.variable)})),t}function Bi(e,t,i){return Ri(e,t,i).map(Hi)}function Wi(e,t,i){const s=e.entity,a=e.service,n=e.service_data||{},o=Ri(s,t,i),r=Mi({service:a,service_data:n});let c=o.find(e=>Mi(e)==r);if(c||(c=o.find(t=>t.variable&&Mi(t)==Mi(Object.assign(Object.assign({},e),{service_data:ye(e.service_data,[t.variable.field])}))),c&&(c=Object.assign(Object.assign({},c),{service_data:Object.assign(Object.assign({},c.service_data||{}),n)}))),!c){if(c=Ii(s,t).find(t=>Pi(t,e)),c&&c.variable&&e.service_data&&c.variable.field in e.service_data&&c.variable.type==ae.List){let t=c.variable;const i=e.service_data[t.field];t=Object.assign(Object.assign({},t),{options:[t.options.find(e=>e.value==i)||{value:i}]}),c=Object.assign(Object.assign({},c),{variable:Object.assign({},t),service_data:Object.assign(Object.assign({},c.service_data),{[t.field]:i})})}}if(c)return Hi(c);return Hi({service:e.service,service_data:e.service_data})}const Yi={alarm_control_panel:"hass:alarm-light-outline",automation:"hass:playlist-play",binary_sensor:"hass:radiobox-blank",camera:"hass:camera",climate:"hass:home-thermometer-outline",cover:"hass:window-shutter",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",humidifier:"hass:air-humidifier",input_boolean:"hass:drawing",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb-outline",lock:"hass:lock-open-outline",media_player:"hass:cast-connected",notify:"hass:comment-alert",person:"hass:account-outline",remote:"hass:remote",scene:"hass:palette-outline",script:"hass:file-document",sensor:"hass:eye",switch:"hass:flash",timer:"hass:timer",vacuum:"hass:robot-vacuum",water_heater:"hass:water-boiler"};function Gi(e,t){const i=_i(e),s=t.states[e];switch(i){case"binary_sensor":return(e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"battery":return"hass:battery-outline";case"cold":return"hass:snowflake";case"connectivity":return"hass:server-network";case"door":return"hass:door-closed";case"garage_door":return"hass:garage";case"gas":case"power":case"problem":case"safety":case"smoke":return"hass:shield-check";case"heat":return"hass:fire";case"light":return"hass:brightness-5";case"lock":return"hass:lock";case"moisture":return"hass:water";case"motion":return"hass:walk";case"occupancy":case"presence":return"hass:home-outline";case"opening":return"hass:square";case"plug":return"hass:power-plug-outline";case"sound":return"hass:music-note";case"vibration":return"hass:vibrate";case"window":return"hass:window-closed";default:return"hass:radiobox-blank"}})(s);case"cover":return zi(s);case"sensor":return(e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"humidity":return"hass:water-percent";case"illuminance":return"hass:brightness-5";case"temperature":return"hass:thermometer";case"power":return"hass:flash";case"pressure":return"hass:gauge";case"signal_strength":return"hass:wifi";default:return"°C"==e.attributes.unit_of_measurement||"°F"==e.attributes.unit_of_measurement?"hass:thermometer":"hass:eye"}})(s);default:return i in Yi?Yi[i]:"hass:folder-outline"}}function Fi(e,t,i){const s=e in t.states?t.states[e]:void 0;let a={id:e,name:s?s.attributes.friendly_name||vi(e):"(unknown entity)",icon:s?s.attributes.icon:"help-circle-outline"};if(void 0!==i.standard_configuration&&!i.standard_configuration||a.icon?a.icon||(a=Object.assign(Object.assign({},a),{icon:"folder-outline"})):a=Object.assign(Object.assign({},a),{icon:Gi(e,t)}),i.customize){Object.entries(i.customize).filter(([e])=>Li(e,a.id)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e).forEach(e=>{a=Object.assign(Object.assign({},a),fe(e,["name","icon"]))})}return a}function Zi(e){const t=_i(e.entity).length?e.entity:_i(e.service)+"."+vi(e.entity),i=_i(e.service).length?e.service:_i(e.entity)+"."+vi(e.service),s=Object.assign(Object.assign({},ye(e,["entity","service","service_data"])),e.service_data);let a={entity:t,service:i};return s&&Object.keys(s).length&&(a=Object.assign(Object.assign({},a),{service_data:s})),a}const Ji=/\{([^\}]+)\}/,Ki=/\[([^\]]+)\]/;function Qi(e){let t=e.name;t||(t=vi(e.service));const i=t.match(Ki);if(i){let s="";const a=i[1].match(Ji);if(a&&e.service_data&&a[1]in e.service_data){let n="";return n=e.variable&&e.variable.field==a[1]&&e.variable.type==ae.Level?$e(e.service_data[e.variable.field],e.variable):e.service_data[a[1]],s=i[1].replace(a[0],n),t.replace(i[0],s)}return t.replace(i[0],"")}return t||""}function Xi(e){let t=e.getDay();return 0==t&&(t=7),t}function es(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}es();const ts=e=>!!es()&&(new Date).toLocaleTimeString(e).includes("M");let is=class extends se{shouldUpdate(e){const t=e.get("hass");return!t||1!=e.size||!this.schedule_entity||t.states[this.schedule_entity]!==this.hass.states[this.schedule_entity]}render(){if(!this.config||!this.hass||!this.schedule_entity)return L``;const e=this.hass.states[this.schedule_entity];if(!e)return L`
        <hui-warning>
          ${this.hass.localize("state_badge.default.entity_not_found")}: '${this.schedule_entity}'
        </hui-warning>
      `;const t=e.attributes.entries.map(ge),i=this.computeNextEntry(t),s=Zi(i.actions.map(t=>e.attributes.actions[t])[0]),a=Wi(s,this.hass,this.config),n=Fi(s.entity,this.hass,this.config),o=n.name,r=this.config.display_options&&this.config.display_options.icon&&"entity"==this.config.display_options.icon?n.icon:a.icon,c=s=>{var n;switch(s){case"name":return(null===(n=e.attributes.friendly_name)||void 0===n?void 0:n.match(/^schedule\ #[0-9a-f]{6}$/i))?"":be(e.attributes.friendly_name);case"relative-time":return"<my-relative-time></my-relative-time>";case"additional-tasks":return t.length>1?"+"+Bt("ui.panel.overview.additional_tasks",this.hass.language,"{number}",String(t.length-1)):"";case"time":return be(this.computeTime(i));case"days":return be(this.computeDays(i.days));case"entity":return o.length?be(we(o)):"";case"action":return be(Qi(a));default:const r=/\{([^\}]+)\}/;let l;for(;l=r.exec(s);)s=s.replace(l[0],String(c(String(l[1]))));return s}},l=e=>{const t=e=>{const t=e.split("<my-relative-time></my-relative-time>");return 1==t.length?Gt(e):L`
          ${t[0]?Gt(t[0]):""}
          <my-relative-time .hass=${this.hass} .datetime=${this.computeTimestamp(i)}> </my-relative-time>
          ${t[1]?Gt(t[1]):""}
        `};return"string"==typeof e?t(c(e)):e.map(e=>{const i=c(e);return i?L`
                  ${t(i)}<br />
                `:""})};return L`
      <state-badge .hass=${this.hass} .stateObj=${e} .overrideIcon=${ke(r)}> </state-badge>
      <div class="info">
        ${this.config.display_options&&this.config.display_options.primary_info?l(this.config.display_options.primary_info):l("{entity}: {action}")}
        <div class="secondary">
          ${this.config.display_options&&this.config.display_options.secondary_info?l(this.config.display_options.secondary_info):l(["relative-time","additional-tasks"])}
        </div>
      </div>
      <ha-switch ?checked=${"waiting"==e.state||"triggered"==e.state} @click=${this.toggleDisabled}>
      </ha-switch>
    `}computeTimestamp(e){const t=new Date,i=new Date;i.setSeconds(0);let s=e.time.value;if(e.time.event){const t=this.hass.states["sun.sun"];if(!t)return new Date(0);s=(e.time.event==re.Sunrise?me(t.attributes.next_rising):me(t.attributes.next_setting))+e.time.value}const a=Math.floor(s/60),n=s-60*a;i.setHours(a),i.setMinutes(n);const o=this.hass.states["binary_sensor.workday_sensor"];function r(t){if(!o)return!1;const i=new Date;i.setHours(0,0,0,0);return 0==Math.floor((t.valueOf()-i.valueOf())/864e5)&&(e.days.type==ce.Workday?"on"!=o.state:e.days.type==ce.Weekend&&"on"==o.state)}const c=function(e){switch(e.type){case ce.Daily:return[1,2,3,4,5,6,7];case ce.Workday:return o?o.attributes.workdays.map(e=>fi.findIndex(t=>t.substr(0,3)==e)).map(e=>(e+6)%7+1):[1,2,3,4,5];case ce.Weekend:if(o){const e=o.attributes.workdays.map(e=>fi.findIndex(t=>t.substr(0,3)==e));return fi.map((t,i)=>e.includes(i)?null:i).filter(e=>null!==e).map(e=>(e+6)%7+1)}return[6,7];case ce.Custom:return e.custom_days;default:return[]}}(e.days);for(;i.valueOf()<=t.valueOf()||!c.includes(Xi(i))||r(i);)i.setDate(i.getDate()+1);return i}computeNextEntry(e){const t=e.map(e=>this.computeTimestamp(e));let i=-1,s=-1;return t.forEach((e,t)=>{(-1===i||e.valueOf()<i)&&(i=e.valueOf(),s=t)}),e[s]}computeDays(e){if(!this.hass)return"";switch(e.type){case ce.Daily:return Bt("ui.components.date.day_types_long.daily",this.hass.language);case ce.Workday:return Bt("ui.components.date.day_types_long.workdays",this.hass.language);case ce.Weekend:return Bt("ui.components.date.day_types_long.weekend",this.hass.language);case ce.Custom:const t=e.custom_days||[];t.sort();const i=function(e){const t=[];for(let i=0;i<e.length-1;i++){let s=i+1;for(;e[s]-e[s-1]==1;)s++;t.push(s-i)}return t}(t),s=Math.max(...i);if(6==t.length){const e=[1,2,3,4,5,6,7].filter(e=>!t.includes(e));return Bt("ui.components.date.repeated_days_except",this.hass.language,"{excludedDays}",yi(e.pop(),this.hass.language))}const a=t.map(e=>yi(e,this.hass.language));if(t.length>=3&&s>=3){const e=i.reduce((e,t,i)=>t==s?i:e,0);a.splice(e,s,Bt("ui.components.date.days_range",this.hass.language,["{startDay}","{endDay}"],[a[e],a[e+s-1]]))}const n=a.length>1?`${a.slice(0,-1).join(", ")} ${this.hass.localize("ui.common.and")} ${a.pop()}`:""+a.pop();return Bt("ui.components.date.repeated_days",this.hass.language,"{days}",n);default:return""}}computeTime(e){if(!this.hass)return"";if(e.endTime){const t=ue(e.time.value,{amPm:ts(this.hass.language)}).time,i=ue(e.endTime.value,{amPm:ts(this.hass.language)}).time;return Bt("ui.components.time.interval",this.hass.language,["{startTime}","{endTime}"],[t,i])}{const t=e.time;if(t.event){const e=t.event==re.Sunrise?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset").toLowerCase();if(Math.abs(t.value)<5)return Bt("ui.time.at_sun_event","{sunEvent}",e);const i=t.value<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1).toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1).toLowerCase();return`${ue(t.value,{absolute:!0}).time} ${i} ${e}`}return Bt("ui.components.time.absolute",this.hass.language,"{time}",ue(t.value,{amPm:ts(this.hass.language)}).time)}}toggleDisabled(e){if(!this.hass||!this.schedule_entity)return;e.stopPropagation();const t=!e.target.checked;this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:this.schedule_entity})}};is.styles=te`
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
    state-badge {
      flex: 0 0 40px;
    }
    ha-switch {
      padding: 13px 5px;
    }
  `,t([K()],is.prototype,"hass",void 0),t([K()],is.prototype,"schedule_entity",void 0),t([K()],is.prototype,"config",void 0),is=t([Z("scheduler-entity-row")],is);let ss=class extends se{constructor(){super(...arguments),this.showDiscovered=!1,this.schedules=[],this.scheduleEntities=[]}loadSchedules(){if(!this._hass||!this.config)return;let e=Object.entries(this._hass.states).filter(([e])=>Ui(e)).map(([,e])=>e);void 0===this.config.discover_existing||this.config.discover_existing||(e=e.filter(e=>e.attributes.actions.map(Zi).map(e=>e.entity).every(e=>this._hass.states[e]&&Vi(e,this.config)))),e.sort((e,t)=>{const i=e.attributes.next_trigger?new Date(e.attributes.next_trigger).valueOf():null,s=t.attributes.next_trigger?new Date(t.attributes.next_trigger).valueOf():null;return null!==i&&null!==s?i>s?1:i<s?-1:e.entity_id<t.entity_id?1:-1:null!==s?1:null!==i?-1:e.entity_id<t.entity_id?1:-1}),this.schedules=e}shouldUpdate(e){const t=e.get("_hass");if(t&&1==e.size){const e=Object.keys(t.states).filter(e=>Ui(e));return e.length!==this.scheduleEntities.length?(this.loadSchedules(),!0):!!e.some((e,t)=>e!==this.scheduleEntities[t])||!!e.some(e=>t.states[e]!==this._hass.states[e])}return this.loadSchedules(),!0}set hass(e){this.scheduleEntities=Object.keys(e.states).filter(e=>Ui(e)),this._hass=e}render(){return this._hass&&this.config&&this.schedules?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Bt("ui.panel.common.title",this._hass.language)}
          </div>
          ${this.schedules.length&&this.config.show_header_toggle?L`
                <ha-switch
                  ?checked=${this.schedules.some(e=>"waiting"==e.state||"triggered"==e.state)}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `:""}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this._hass.user.is_admin?L`
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
          >${this._hass.localize("ui.components.area-picker.add_dialog.add")}
          </mwc-button>
        </div>
      </ha-card>
      `:""}
      </ha-card>
    `:L``}getRows(){if(!this.config||!this._hass||!this.schedules)return L``;if(!this.schedules.length)return L`
        <div>
          ${Bt("ui.panel.overview.no_entries",this._hass.language)}
        </div>
      `;const e=[],t=[];return this.schedules.map(e=>e.entity_id).forEach(i=>{const s=this._hass.states[i];!s.attributes.actions.map(Zi).every(e=>Vi(e.entity,this.config))?t.push(s):e.push(s)}),L`
      ${e.map(e=>L`
          <scheduler-entity-row
            class="${"waiting"==e.state||"triggered"==e.state?"":"disabled"}"
            .hass=${this._hass}
            .schedule_entity=${e.entity_id}
            .config=${this.config}
            @click=${()=>this.editItemClick(e.entity_id)}
          >
          </scheduler-entity-row>
        `)}
      ${t.length?this.showDiscovered?L`
              ${t.map(e=>L`
                  <scheduler-entity-row
                    class="${"waiting"==e.state||"triggered"==e.state?"":"disabled"}"
                    .hass=${this._hass}
                    .schedule_entity=${e.entity_id}
                    .config=${this.config}
                    @click=${()=>this.editItemClick(e.entity_id)}
                  >
                  </scheduler-entity-row>
                `)}
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${be(Bt("ui.panel.overview.hide_excluded",this._hass.language))}
                </button>
              </div>
            `:L`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Bt("ui.panel.overview.excluded_items",this._hass.language,"{number}",t.length)}
                </button>
              </div>
            `:""}
    `}toggleDisableAll(e){if(!this._hass||!this.schedules)return;const t=e.target.checked;this.schedules.forEach(e=>{this._hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}editItemClick(e){const t=new CustomEvent("editClick",{detail:e});this.dispatchEvent(t)}newItemClick(){const e=new CustomEvent("newClick");this.dispatchEvent(e)}};function as(e,t,i){const s=[];t.groups&&t.groups.forEach(t=>{const i={id:t.name,name:t.name,icon:t.icon||"folder-outline",entities:e.filter(e=>qi(e,t))};s.push(i)});const a=e.filter(e=>!s.some(t=>t.entities.includes(e)));return a.map(_i).filter((e,t,i)=>i.indexOf(e)===t).forEach(e=>{const n={id:e,name:Bt("domains."+e,i.language)||e,icon:(void 0===t.standard_configuration||t.standard_configuration)&&e in Yi?Yi[e]:"folder-outline",entities:a.filter(t=>qi(t,{include:[e]}))};s.push(n)}),s}ss.styles=te`
    ${Wt}
    scheduler-entity-row {
      cursor: pointer;
      margin: 20px 0px;
    }
    scheduler-entity-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --paper-item-icon-color: var(--disabled-text-color);
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
  `,t([K()],ss.prototype,"_hass",void 0),t([K()],ss.prototype,"config",void 0),t([K()],ss.prototype,"showDiscovered",void 0),ss=t([Z("scheduler-entities-card")],ss);let ns=class extends se{constructor(){super(...arguments),this.items=[]}render(){return this.items.length?this.items.map(e=>this.createButton(e)):L`
        <div class="text-field">
          <slot></slot>
        </div>
      `}createButton(e){const t=Array.isArray(this.value)?this.value:[this.value];"object"!=typeof e&&(e={name:String(e)});const i=void 0!==e.id?e.id:e.name;return L`
      <mwc-button class="${t.includes(i)?"active":""}" @click="${()=>this.selectItem(i)}">
        ${e.icon?L`
              <ha-icon icon="${ke(e.icon)}" class="padded-right"></ha-icon>
            `:""}
        ${we(e.name)}
      </mwc-button>
    `}selectItem(e){if(Array.isArray(this.value)){let t=Array.isArray(this.value)?this.value:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;const t=new CustomEvent("change");this.dispatchEvent(t)}};ns.styles=Wt,t([K({type:Array})],ns.prototype,"items",void 0),t([K()],ns.prototype,"value",void 0),t([K({type:Number})],ns.prototype,"min",void 0),t([K({type:Boolean})],ns.prototype,"optional",void 0),ns=t([Z("button-group")],ns);let os=class extends se{firstUpdated(){if(this.entity){const e=this.getGroups().find(e=>e.entities.find(e=>e==this.entity.id));if(!e)return;this.selectedGroup=e.id,this.selectedEntity=this.entity.id}}getGroups(){if(!this.hass||!this.config)return[];const e=as(Object.keys(this.hass.states).filter(e=>Vi(e,this.config)).filter(e=>Bi(e,this.hass,this.config).length),this.config,this.hass);return e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),e}getEntitiesForGroup(e){if(!this.selectedGroup||!this.hass||!this.config)return[];const t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>Fi(e,this.hass,this.config));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}getActionsForEntity(e){if(!this.selectedEntity||!this.hass||!this.config)return[];const t=Bi(this.selectedEntity,this.hass,this.config).map(e=>Object.assign(e,{name:Qi(e)}));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}render(){if(!this.hass||!this.config)return L``;const e=this.getGroups();1==e.length&&this.selectedGroup!==e[0].id&&this.selectGroup(e[0].id);const t=this.getEntitiesForGroup(e);1==t.length&&this.selectedEntity!==t[0].id&&this.selectEntity(t[0].id);const i=this.getActionsForEntity(t);return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Bt("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
          <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${Bt("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
          <button-group .items=${t} value=${this.selectedEntity} @change=${this.selectEntity}>
            ${this.selectedGroup?Bt("ui.panel.entity_picker.no_entities_for_group",this.hass.language):Bt("ui.panel.entity_picker.no_group_selected",this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
          <button-group .items=${i} value=${this.selectedAction} @change=${this.selectAction}>
            ${this.selectedEntity?Bt("ui.panel.entity_picker.no_actions_for_entity",this.hass.language):Bt("ui.panel.entity_picker.no_entity_selected",this.hass.language)}
          </button-group>
          ${this.makeSchemeButton(i)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction}
            >${this.hass.localize("ui.common.next")}</mwc-button
          >
        </div>
      </ha-card>
    `}makeSchemeButton(e){return e.length&&this.hass?L`
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.or.label")}</div>
      <div class="option-list">
        <mwc-button
          class="${"make_scheme"==this.selectedAction?" active":""}"
          @click=${()=>{this.selectedAction="make_scheme"}}>
          <ha-icon icon="${ke("chart-timeline")}" class="padded-right"></ha-icon>
          ${Bt("ui.panel.entity_picker.make_scheme",this.hass.language)}
        </mwc-button>
      </div>
    </div>
    `:L``}selectGroup(e){const t="string"==typeof e?e:e.target.value;this.selectedGroup=t,this.selectedEntity=void 0,this.selectedAction=void 0}selectEntity(e){const t="string"==typeof e?e:e.target.value;this.selectedEntity=t,this.selectedAction=void 0}selectAction(e){const t="string"==typeof e?e:e.target.value;this.selectedAction=t}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}nextClick(){const e=new CustomEvent("nextClick",{detail:{entity:this.selectedEntity,action:this.selectedAction}});this.dispatchEvent(e)}};os.styles=Wt,t([K()],os.prototype,"hass",void 0),t([K()],os.prototype,"config",void 0),t([K()],os.prototype,"selectedGroup",void 0),t([K()],os.prototype,"selectedEntity",void 0),t([K()],os.prototype,"selectedAction",void 0),t([K()],os.prototype,"entity",void 0),os=t([Z("scheduler-editor-card")],os);let rs=class extends se{constructor(){super(...arguments),this._val=0,this.formatAmPm=!1,this.stepSize=10,this.maxOffset=2}set value(e){const t=this.value;this._val=e,this.requestUpdate("value",t)}get value(){return de(this._val,this.stepSize)}updated(){const e=new CustomEvent("change",{detail:{event:this.event}});this.dispatchEvent(e)}firstUpdated(){const e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=he(this.value,e),this.formatAmPm=ts(this.hass.language)}render(){return L`
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
    `}getHours(){return ue(this.value,{amPm:this.formatAmPm&&!this.event}).hours}getMinutes(){return ue(this.value,{amPm:this.formatAmPm&&!this.event}).minutes}hoursUp(){const e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=he(this._val+60,e)}hoursDown(){const e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=he(this._val-60,e)}minutesUp(){const e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=he(this._val+this.stepSize,e)}minutesDown(){const e=this.event?{stepSize:this.stepSize,signed:!0,max:60*this.maxOffset}:{stepSize:this.stepSize};this.value=he(this._val-this.stepSize,e)}getSunModeToggle(){return this.hass&&this.hass.states["sun.sun"]?L`
      <mwc-button @click="${this.toggleMode}" class="${this.event?"active":""}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `:L``}getAmPm(){return ue(this._val,{amPm:this.formatAmPm}).amPm}getBeforeAfter(){return this.hass?this.value<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1):this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1):""}getSuffix(){return this.event?L`
        <div class="suffix">
          <mwc-button @click="${this.toggleBeforeAfter}">
            ${this.getBeforeAfter()}
          </mwc-button>
          <mwc-button @click="${this.toggleSunriseSunset}">
            <ha-icon icon="hass:${this.event==re.Sunrise?"weather-sunny":"weather-night"}"></ha-icon>
          </mwc-button>
        </div>
      `:this.formatAmPm?L`
        <div class="suffix">
          <mwc-button @click="${this.toggleAmPm}">
            ${this.getAmPm()}
          </mwc-button>
        </div>
      `:L``}toggleAmPm(){this._val<720?this.value=he(this._val+720):this.value=he(this._val-720)}toggleBeforeAfter(){this.value=-this._val}toggleSunriseSunset(){this.event=this.event==re.Sunrise?re.Sunset:re.Sunrise,this.value=this._val}toggleMode(){if(!this.hass)return;const e=this.hass.states["sun.sun"],t=me(e.attributes.next_rising),i=me(e.attributes.next_setting),s=this.value;if(this.event){const e=this.event==re.Sunrise?t:i;this.event=void 0,this.value=s+e}else{let e;Math.abs(s-t)<Math.abs(s-i)?(e=t,this.event=re.Sunrise):(e=i,this.event=re.Sunset),this.value=s-e,this.value>60*this.maxOffset?this.value=60*this.maxOffset:this.value<60*-this.maxOffset&&(this.value=60*-this.maxOffset)}}};function cs(e){return e.endTime.value-e.time.value}rs.styles=te`
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
  `,t([K({type:Number})],rs.prototype,"value",null),t([K()],rs.prototype,"hass",void 0),t([K({type:String})],rs.prototype,"event",void 0),t([K({type:Boolean})],rs.prototype,"formatAmPm",void 0),t([K({type:Number})],rs.prototype,"stepSize",void 0),rs=t([Z("time-picker")],rs);let ls=class extends se{constructor(){super(...arguments),this.entries=[],this.actions=[],this.stepSize=10,this._activeEntry=null,this._activeThumb=null,this.formatAmPm=!1}firstUpdated(){this.formatAmPm=ts(this.hass.language)}render(){return this.hass?L`
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          ${this.formatAmPm?L`
                <div class="slider-legend-item wide empty"></div>
                <div class="slider-legend-item wide">04:00 AM</div>
                <div class="slider-legend-item wide">08:00 AM</div>
                <div class="slider-legend-item wide">12:00 PM</div>
                <div class="slider-legend-item wide">04:00 PM</div>
                <div class="slider-legend-item wide">08:00 PM</div>
                <div class="slider-legend-item wide empty"></div>
              `:L`
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
        <mwc-button @click=${this._addSlot} ?disabled=${null===this._activeEntry||this.entries.length>=10}>
          <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
        </mwc-button>
        <mwc-button @click=${this._removeSlot} ?disabled=${null===this._activeEntry||this.entries.length<=3}>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize("ui.common.delete")}
        </mwc-button>
      </div>
    `:L``}getSlots(){const e=[];return this.entries.forEach((t,i)=>{if(e.push(L`
        <div
          class="slider-slot${this._activeEntry==i?" active":""}${t.action?" filled":""}"
          @click="${this._handleSegmentClick}"
          index="${i}"
          style="width: ${cs(t)/1440*100}%"
        >
          ${this.getEntryAction(t)}
        </div>
      `),i<this.entries.length-1){const t=this.entries[i].endTime.value;e.push(L`
          <div class="slider-thumb${this._activeThumb==i?" active":""}" index=${i}>
            <ha-icon
              icon="hass:unfold-more-vertical"
              @mousedown="${this._handleTouchStart}"
              @touchstart="${this._handleTouchStart}"
            ></ha-icon>
            <div
              class="slider-thumb-tooltip ${this.formatAmPm?"wide":""}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${ue(t,{amPm:this.formatAmPm}).time}
            </div>
          </div>
        `)}}),e}updated(){this.shadowRoot.querySelectorAll(".slider-thumb-tooltip").forEach((e,t)=>{const i=this.entries[t].endTime.value;e.innerText=ue(i,{amPm:this.formatAmPm}).time})}getEntryAction(e){if(!this.hass)return;if(!e.action)return"";const t=this.actions.find(t=>t.id==e.action);if(e.variable&&e.variable.type==ae.Level&&t.variable){if(e.variable.enabled)return $e(Number(e.variable.value),t.variable)}else if(e.variable&&e.variable.type==ae.List){const i=t.variable.options.find(t=>t.value==e.variable.value);return we(i&&i.name?i.name:String(e.variable.value))}const i=t.service;return we(t.name||Bt("services."+i,this.hass.language)||i)}_handleSegmentClick(e){const t=e.target,i=Number(t.getAttribute("index"));this._activeEntry=this._activeEntry==i?null:i;const s=new CustomEvent("update",{detail:{entry:this._activeEntry}});this.dispatchEvent(s)}_handleTouchStart(e){const t=e.target;if(!t)return;const i=t.parentNode,s=i.parentElement,a=s.getBoundingClientRect(),n=i.previousElementSibling,o=i.nextElementSibling,r=i.querySelector(".slider-thumb-tooltip");this._activeThumb=Number(i.getAttribute("index"));const c=n.offsetWidth+o.offsetWidth,l=a.width,d=Array.from(s.querySelectorAll(".slider-slot")),u=d.map(e=>e.offsetWidth);let h=0,m=-1;d.forEach((e,t)=>{e==n?m=t:-1==m&&(h+=u[t])});let p=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let i=t-a.left;i<0?i=0:i>a.width&&(i=a.width),i>c+h&&(i=c+h),i<h&&(i=h),n.style.width=Math.round(i-h)+"px",o.style.width=Math.round(c-(i-h))+"px";let s=i/l*1440;s=Math.round(s)>=1440?1440:de(s,this.stepSize,!1),r.dispatchEvent(new CustomEvent("update",{detail:{time:s}}))};const _=()=>{window.removeEventListener("mousemove",p),window.removeEventListener("touchmove",p),window.removeEventListener("mouseup",_),window.removeEventListener("touchend",_),p=()=>{};const e=me(r.innerText),t=cs(this.entries[m])+cs(this.entries[m+1]),i=this.entries[m].time.value,s=[...this.entries];Object.assign(s[m],{endTime:{value:e}}),Object.assign(s[m+1],{time:{value:e},endTime:{value:i+t}}),this._activeThumb=null;const a=new CustomEvent("update",{detail:{entries:s}});this.dispatchEvent(a)};window.addEventListener("mouseup",_),window.addEventListener("touchend",_),window.addEventListener("mousemove",p),window.addEventListener("touchmove",p)}_updateMarker(e){const t=e.detail;let i=Number(t.time);1440==i&&(i-=1);e.target.innerText=ue(i,{amPm:this.formatAmPm}).time}_addSlot(){const e=this.entries[this._activeEntry],t=e.time.value,i=e.endTime.value,s=de(t+cs(e)/2,this.stepSize),a=Object.assign({time:{value:s},endTime:{value:i},action:""},fe(e,["entity","days"])),n=[...this.entries];Object.assign(n[this._activeEntry],{endTime:{value:s}}),n.splice(this._activeEntry+1,0,a);const o=new CustomEvent("update",{detail:{entries:n}});this.dispatchEvent(o)}_removeSlot(){const e=this._activeEntry==this.entries.length-1?this._activeEntry-1:this._activeEntry,t=Object.assign({},this.entries[e+1]);Object.assign(t,{time:this.entries[e].time,endTime:this.entries[e+1].endTime});const i=[...this.entries];i.splice(e,2,t),this._activeEntry==this.entries.length&&this._activeEntry--;const s=new CustomEvent("update",{detail:{entries:i}});this.dispatchEvent(s)}};ls.styles=te`
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
    }
    div.slider-thumb-tooltip.wide {
      width: 70px;
      margin-left: -35px;
    }
    div.slider-thumb-tooltip:before {
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
  `,t([K()],ls.prototype,"hass",void 0),t([K({type:Array})],ls.prototype,"entries",void 0),t([K({type:Array})],ls.prototype,"actions",void 0),t([K({type:Number})],ls.prototype,"stepSize",void 0),t([K({type:Number})],ls.prototype,"_activeEntry",void 0),t([K({type:Number})],ls.prototype,"_activeThumb",void 0),t([K({type:Boolean})],ls.prototype,"formatAmPm",void 0),ls=t([Z("timeslot-editor")],ls);let ds=class extends se{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.value=0,this.unit="",this.optional=!1,this.disabled=!1,this.scaleGain=1,this.scaleOffset=0}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})(),"%"==this.unit&&(this.scaleOffset=this.min,this.scaleGain=(this.max-this.min)/100,this.min=0,this.max=100),this.disabled&&!this.optional&&(this.disabled=!1),isNaN(this.value)&&(this.value=this.min),this.requestUpdate()}render(){return L`
      <div class="checkbox-container">
        <div class="checkbox">
          ${this.getCheckbox()}
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled?" disabled":""}">
          ${this.getScaledValue()}${this.unit}
        </div>
      </div>
    `}getScaledValue(){let e=(this.value-this.scaleOffset)/this.scaleGain;return e=Math.round(e/this.step)*this.step,e<this.min?e=this.min:e>this.max&&(e=this.max),e}getSlider(){return this.disabled?L`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
          disabled
        ></ha-slider>
      `:L`
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
          @change=${this.updateValue}
        ></ha-slider>
      `}getCheckbox(){return this.optional?L`
      <ha-checkbox @change="${this.toggleChecked}" ?checked=${!this.disabled}> </ha-checkbox>
    `:L``}toggleChecked(e){const t=e.target.checked;this.disabled=!t;const i=new CustomEvent("change");this.dispatchEvent(i)}updateValue(e){let t=Number(e.target.value)*this.scaleGain+this.scaleOffset;t=Math.round(t/this.step)*this.step,this.value=t}};ds.styles=te`
    ${Wt} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `,t([K({type:Number})],ds.prototype,"min",void 0),t([K({type:Number})],ds.prototype,"max",void 0),t([K({type:Number})],ds.prototype,"step",void 0),t([K({type:Number})],ds.prototype,"value",void 0),t([K({type:String})],ds.prototype,"unit",void 0),t([K({type:Boolean})],ds.prototype,"optional",void 0),t([K({type:Boolean})],ds.prototype,"disabled",void 0),ds=t([Z("variable-slider")],ds);let us=class extends se{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`

      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
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
      
    `:L``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return te`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};var hs;t([K({attribute:!1})],us.prototype,"hass",void 0),t([K({attribute:!1,hasChanged:null==hs?void 0:hs.hasChanged})],us.prototype,"_params",void 0),us=t([Z("dialog-confirm-delete")],us);var ms=Object.freeze({__proto__:null,get DialogConfirmDelete(){return us}});let ps=class extends se{constructor(){super(...arguments),this.entries=[],this.activeEntry=null,this.timeslots=!1,this.editItem=!1}firstUpdated(){if(!this.actions||!this.hass)return;this.timeslots||(this.activeEntry=0);const e=this.actions.map(e=>Object.assign(e,{name:Qi(e)}));e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),this.actions=e}render(){if(!(this.hass&&this.config&&this.entries&&this.entity&&this.actions))return L``;let e=Array.from(Array(7).keys());const t=function(e){const t=e.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return function(e,t){const i="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),s="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),a="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);return e?s.includes(e)?"sun":i.includes(e)?"sat":"mon":a.includes(t)?"sun":["ar","arq","arz","fa"].includes(t)?"sat":"mon"}(t[4],t[1])}(this.hass.language),i=e.length-fi.findIndex(e=>e.substr(0,3)==t);e=[...e.slice(-i),...e.slice(0,-i)];const s=e.map(e=>Object({id:(e+6)%7+1,name:yi(e,this.hass.language,!0)})),a=[{id:ce.Daily,name:Bt("ui.components.date.day_types_short.daily",this.hass.language)},{id:ce.Workday,name:Bt("ui.components.date.day_types_short.workdays",this.hass.language)},{id:ce.Weekend,name:Bt("ui.components.date.day_types_short.weekend",this.hass.language)},{id:ce.Custom,name:this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.label")}];return this.timeslots?L`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Bt("ui.panel.common.title",this.hass.language)}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
            <div class="summary">
              <div
                class="summary-entity"
                @click=${this.editActionClick}
              >
                <ha-icon icon="${ke(this.entity.icon)}"> </ha-icon>
                ${be(we(this.entity.name||this.hass.states[this.entity.id].attributes.friendly_name||vi(this.entity.id)))}
              </div>
              <div class="summary-arrow">
                <ha-icon icon="hass:arrow-right"> </ha-icon>
              </div>
              <div
                class="summary-action"
                @click=${this.editActionClick}
              >
                <ha-icon icon="${ke("chart-timeline")}"> </ha-icon>
                ${be(Bt("ui.panel.entity_picker.make_scheme",this.hass.language))}
              </div>
            </div>

            <div class="header">${Bt("ui.components.date.days",this.hass.language)}</div>
            <button-group .items=${a} value=${this.entries[0].days.type} @change=${this.selectDays}>
            </button-group>
            ${this.entries[0].days.type==ce.Custom?L`
                  <div>
                    <button-group
                      .items=${s}
                      .value=${this.entries[0].days.custom_days}
                      min="1"
                      @change=${this.selectDays}
                    >
                    </button-group>
                  </div>
                `:""}

            <div class="header">${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}</div>
            <timeslot-editor
              .hass=${this.hass}
              .actions=${this.actions}
              .entries=${this.entries}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor>

            <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
            <button-group
              .items=${null!==this.activeEntry?this.actions:[]}
              value=${null!==this.activeEntry?this.entries[this.activeEntry].action:""}
              optional="true"
              @change=${this.selectAction}
            >
              ${Bt("ui.panel.time_picker.no_timeslot_selected",this.hass.language)}
            </button-group>

            ${this.getVariableEditor()}
          </div>
          <div class="card-actions">
            <mwc-button @click=${this.saveClick} ?disabled=${!this.entries.some(e=>e.action)}
              >${this.hass.localize("ui.common.save")}</mwc-button
            >
            ${this.hass.user.is_admin&&this.editItem?L`
                  <mwc-button class="warning" @click=${this.deleteClick}
                    >${this.hass.localize("ui.common.delete")}</mwc-button
                  >
                `:""}
            <mwc-button @click=${this.optionsClick} style="float: right"
              >${this.hass.localize("ui.dialogs.helper_settings.input_select.options")}</mwc-button
            >
          </div>
        </ha-card>
      `:L`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Bt("ui.panel.common.title",this.hass.language)}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
            <div class="summary">
              <div
                class="summary-entity"
                @click=${this.editActionClick}
              >
                <ha-icon icon="${ke(this.entity.icon)}"> </ha-icon>
                ${be(we(this.entity.name||this.hass.states[this.entity.id].attributes.friendly_name||vi(this.entity.id)))}
              </div>
              <div class="summary-arrow">
                <ha-icon icon="hass:arrow-right"> </ha-icon>
              </div>
              <div
                class="summary-action"
                @click=${this.editActionClick}
              >
                <ha-icon icon="${ke(this.actions[0].icon||"flash")}"> </ha-icon>
                ${be(this.actions[0].name||vi(this.actions[0].service))}
              </div>
            </div>

            ${this.getVariableEditor()}

            <div class="header">${Bt("ui.components.date.days",this.hass.language)}</div>
            <button-group .items=${a} value=${this.entries[0].days.type} @change=${this.selectDays}>
            </button-group>
            ${this.entries[0].days.type==ce.Custom?L`
                  <div>
                    <button-group
                      .items=${s}
                      .value=${this.entries[0].days.custom_days}
                      min="1"
                      @change=${this.selectDays}
                    >
                    </button-group>
                  </div>
                `:""}

            <div class="header">${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}</div>
            <time-picker
              .hass=${this.hass}
              .value=${this.entries[0].time.value}
              .event=${this.entries[0].time.event}
              stepSize=${this.config.time_step||10}
              @change=${this.updateTime}
            >
            </time-picker>
          </div>
          <div class="card-actions">
            <mwc-button @click="${this.saveClick}">${this.hass.localize("ui.common.save")}</mwc-button>
            ${this.hass.user.is_admin&&this.editItem?L`
                  <mwc-button class="warning" @click=${this.deleteClick}
                    >${this.hass.localize("ui.common.delete")}</mwc-button
                  >
                `:""}
            <mwc-button @click="${this.optionsClick}" style="float: right"
              >${this.hass.localize("ui.dialogs.helper_settings.input_select.options")}</mwc-button
            >
          </div>
        </ha-card>
      `}updateActiveEntry(e){if(null===this.activeEntry)return;const t=[...this.entries];Object.assign(t[this.activeEntry],e),this.entries=t}updateTime(e){const t=e.target,i=Number(t.value),s=e.detail.event;this.updateActiveEntry({time:e.detail.event?{event:s,value:i}:{value:i}})}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){const t=e.detail.entries;t.length<this.entries.length&&this.activeEntry==this.entries.length-1&&(this.activeEntry=this.entries.length-2),this.entries=[...t]}else e.detail.hasOwnProperty("entry")&&(null!==e.detail.entry?this.activeEntry=Number(e.detail.entry):this.activeEntry=null)}selectAction(e){if(!this.actions||!this.entries||null===this.activeEntry)return;const t=e.target.value;this.updateActiveEntry({action:t,variable:void 0})}getVariableEditor(){if(!this.hass||!this.actions||null===this.activeEntry||!this.entries[this.activeEntry].action)return L``;const e=this.actions.find(e=>e.id==this.entries[this.activeEntry].action);if(!e.variable)return L``;if(e.variable.type==ae.Level){const t=e.variable;this.entries[this.activeEntry].variable||this.updateActiveEntry({variable:{type:ae.Level,value:t.min,enabled:!t.optional}});const i=this.entries[this.activeEntry].variable;return L`
        <div class="header">
          ${t.name||we(t.field)}
        </div>
        <variable-slider
          min=${t.min}
          max=${t.max}
          step=${t.step}
          value=${i.value}
          unit=${t.unit}
          ?optional=${t.optional}
          ?disabled=${!i.enabled}
          @change=${this.updateLevelValue}
        >
        </variable-slider>
      `}if(e.variable.type==ae.List){const t=e.variable;this.entries[this.activeEntry].variable||this.updateActiveEntry({variable:{type:ae.List,value:t.options[0].value}});const i=this.entries[this.activeEntry].variable,s=t.options.map(e=>Object.assign(Object.assign({},e),{id:e.value}));return t.options.length<=1?L``:L`
        <div class="header">
          ${t.name||we(t.field)}
        </div>
        <button-group .items=${s} value=${i.value} @change=${this.updateListValue}>
          ${this.hass.localize("ui.dialogs.helper_settings.input_select.no_options")}
        </button-group>
      `}return L``}updateLevelValue(e){if(null===this.activeEntry)return;const t=e.target;this.updateActiveEntry({variable:{type:ae.Level,value:Number(t.value),enabled:"false"==String(t.disabled)}})}updateListValue(e){if(null===this.activeEntry)return;const t=e.target.value;this.updateActiveEntry({variable:{type:ae.List,value:t}})}selectDays(e){const t=Object.assign({},this.entries[0].days),i=e.target.value;Object.values(ce).includes(i)?(i!=ce.Custom||t.custom_days||Object.assign(t,{custom_days:[]}),Object.assign(t,{type:i})):Object.assign(t,{custom_days:[...i]}),this.entries=this.entries.map(e=>Object.assign(e,{days:t}))}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}saveClick(){const e=new CustomEvent("saveClick",{detail:this.entries});this.dispatchEvent(e)}optionsClick(){const e=new CustomEvent("optionsClick",{detail:this.entries});this.dispatchEvent(e)}editActionClick(){const e=new CustomEvent("editActionClick",{detail:this.entries});this.dispatchEvent(e)}async deleteClick(e){const t=e.target;if(await new Promise(e=>{gi(t,"show-dialog",{dialogTag:"dialog-confirm-delete",dialogImport:()=>Promise.resolve().then((function(){return ms})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})){const e=new CustomEvent("deleteClick");this.dispatchEvent(e)}}};ps.styles=te`
    ${Wt}
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
      padding: 10px;
      font-size: 14px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-template-areas: 'icon text';
      grid-auto-flow: column;
      grid-gap: 10px;
      cursor: pointer;
    }

    div.summary-entity:before,
    div.summary-action:before {
      content: ' ';
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
  `,t([K()],ps.prototype,"hass",void 0),t([K()],ps.prototype,"config",void 0),t([K()],ps.prototype,"entries",void 0),t([K()],ps.prototype,"actions",void 0),t([K()],ps.prototype,"entity",void 0),t([K()],ps.prototype,"activeEntry",void 0),t([K({type:Boolean})],ps.prototype,"timeslots",void 0),t([K({type:Boolean})],ps.prototype,"editItem",void 0),ps=t([Z("scheduler-timepicker-card")],ps);function _s(e,t,i){let s=(e=>{switch(_i(e.entity_id)){case"alarm_control_panel":return xi;case"binary_sensor":case"cover":return Ei;case"input_boolean":case"switch":return["on","off"];case"lock":return Ai;case"person":return["home","not_home"];default:return}})(t.states[e]);if(i.customize){Object.entries(i.customize).filter(([t])=>Li(t,e)).sort((e,t)=>t[0].length-e[0].length).filter(([,e])=>e.states).map(([,e])=>e.states).forEach(e=>{s=e})}return s}let vs=class extends se{constructor(){super(...arguments),this.selected=!1,this.editMode=!1}firstUpdated(){this.hass&&this.config&&this.item&&(this.entity=Fi(this.item.entity,this.hass,this.config),this.states=_s(this.item.entity,this.hass,this.config))}render(){if(!this.item||!this.hass||!this.config)return L``;const e=this.hass.states[this.item.entity];return this.entity&&e?L`
      <div class="list-item">
        <mwc-button @click="${this.entityButtonClick}" class="${this.selected?"active":""}">
          <ha-icon icon="${ke(this.entity.icon||"folder-outline")}"></ha-icon>
          ${we(this.entity.name||e.attributes.friendly_name||vi(e.entity_id))}
        </mwc-button>
          ${this.getMatchTypeButton()}
          ${this.getStateButton()}
        </div>
      </div>
    `:L`
        <hui-warning>
          ${this.hass.localize("state_badge.default.entity_not_found")}: '${this.item.entity}'
        </hui-warning>
      `}entityButtonClick(){this.selected=!this.selected,this.fireEvent()}getMatchTypeButton(){if(!this.item||!this.hass)return L``;let e;const t=this.item.match_type;return t==ne.Equal||t==ne.Unequal?e=Bt("ui.panel.conditions.equal_to",this.hass.language):t==ne.Below?e=this.hass.localize("ui.panel.config.automation.editor.conditions.numeric_state.below"):t==ne.Above&&(e=this.hass.localize("ui.panel.config.automation.editor.conditions.numeric_state.above")),L`
      <mwc-button @click="${this.matchTypeButtonClick}">
        ${e}
      </mwc-button>
    `}matchTypeButtonClick(){if(this.selected=!1,this.editMode=!1,!this.item)return;const e=this.item.match_type;let t;"string"==typeof this.item.state?e==ne.Equal?t=ne.Unequal:e==ne.Unequal&&(t=ne.Equal):e==ne.Equal?t=ne.Unequal:e==ne.Unequal?t=ne.Below:e==ne.Below?t=ne.Above:e==ne.Above&&(t=ne.Equal),this.item=Object.assign(Object.assign({},this.item),{match_type:t}),this.fireEvent()}getStateButton(){return this.item?"string"==typeof this.item.state?L`
        <mwc-button @click="${this.stateButtonClick}">
          ${we(this.item.state)}
        </mwc-button>
      `:this.editMode?L`
        <div class="button-container">
          <div class="button-left">
            <mwc-button
              class="arrow-button"
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
            <mwc-button
              class="arrow-button"
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
      `:L`
        <mwc-button class="button" @click="${this.toggleEditMode}">
          ${this.getState()}
        </mwc-button>
      `:L``}stateButtonClick(){if(!this.item||!this.entity||!this.states)return;this.selected=!1;const e=this.item.state;if(!this.states||!Array.isArray(this.states))return;let t=0;for(t=0;t<this.states.length&&this.states[t]!=e;t++);const i=t<this.states.length-1?this.states[t+1]:this.states[0];this.item=Object.assign(Object.assign({},this.item),{state:i}),this.fireEvent()}stateDecrement(e=null){if(!this.item||!this.states||Array.isArray(this.states))return;clearTimeout(this.timer);let t=Number(this.item.state);const i=this.states;if(Array.isArray(i))return;const s=i.step||1;t-=s,t<i.min&&(t=i.min),t=Number((Math.round(t/s)*s).toPrecision(5)),this.item=Object.assign(Object.assign({},this.item),{state:t});let a=null!==e?Number(.9*e):300;a<50&&(a=50),this.timer=setTimeout(()=>{this.stateDecrement(a)},a)}stateIncrement(e=null){if(!this.item||!this.states||Array.isArray(this.states))return;clearTimeout(this.timer);let t=Number(this.item.state);const i=this.states;if(!i||Array.isArray(i))return;const s=i.step||1;t+=s,t>i.max&&(t=i.max),t=Number((Math.round(t/s)*s).toPrecision(5)),this.item=Object.assign(Object.assign({},this.item),{state:t});let a=null!==e?Number(.9*e):300;a<50&&(a=50),this.timer=setTimeout(()=>{this.stateIncrement(a)},a)}stateUpdateStop(){clearTimeout(this.timer),this.fireEvent()}toggleEditMode(){this.editMode=!this.editMode}getState(){if(!this.item||!this.states)return;const e=this.item.state,t=this.states;return!Array.isArray(t)&&t.unit?`${e}${t.unit}`:e}fireEvent(){const e={item:this.item,selected:this.selected},t=new CustomEvent("change",{detail:e});this.dispatchEvent(t)}};vs.styles=te`
    div.list-item {
      background: none;
      cursor: pointer;
      padding: 2px 10px;
      margin: 5px 0px;
      position: relative;
      z-index: 1;
    }

    div.list-item:before {
      content: ' ';
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
      grid-template-areas: 'button-left value button-right';
    }

    div.button-container .button-left {
      grid-area: button-left;
    }
    div.button-container .value {
      grid-area: value;
    }
    div.button-container .button-right {
      grid-area: button-right;
    }

    mwc-button.arrow-button {
      padding: 0px;
      margin: 0px;
      --mdc-button-horizontal-padding: 0px;
    }

    .mdc-button {
      min-width: 20px !important;
    }
  `,t([K()],vs.prototype,"hass",void 0),t([K()],vs.prototype,"config",void 0),t([K()],vs.prototype,"item",void 0),t([K()],vs.prototype,"selected",void 0),t([K()],vs.prototype,"entity",void 0),t([K()],vs.prototype,"states",void 0),t([K()],vs.prototype,"editMode",void 0),vs=t([Z("condition-entity-row")],vs);let gs=class extends se{constructor(){super(...arguments),this.entries=[],this.editItem=null,this.selectedItem=null,this.addCondition=!1}render(){var e;if(!this.hass||!this.config)return L``;const t=[{name:this.hass.localize("ui.panel.config.automation.editor.actions.type.repeat.label"),id:"repeat",icon:"refresh"},{name:this.hass.localize("ui.dialogs.more_info_control.vacuum.stop"),id:"run_once",icon:"stop"}];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Bt("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.addCondition?L`
                ${this.renderAddCondition()}
              `:L`
          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.conditions")}</div>
          ${!this.entries[0].conditions||this.entries[0].conditions.items.length<2?"":L`
                  <div style="float: right; margin-top: -1em">
                    ${Bt("ui.panel.conditions.any",this.hass.language)}
                    <ha-switch
                      style="margin: 0px 10px"
                      @change=${this.conditionTypeSwitchClick}
                      ?checked=${(null===(e=this.entries[0].conditions)||void 0===e?void 0:e.type)==oe.All}
                    ></ha-switch>
                    ${Bt("ui.panel.conditions.all",this.hass.language)}
                  </div>
                `}
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
          <mwc-button @click=${this.addConditionClick}>
            <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
            ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
          </mwc-button>
          <mwc-button @click="${this.removeConditionClick}" ?disabled=${null===this.selectedItem}>
            <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
            ${this.hass.localize("ui.common.delete")}
          </mwc-button>
          </div>

          <div class="header">${this.hass.localize("ui.components.area-picker.add_dialog.name")}</div>
          <paper-input no-label-float
            .value=${this.friendlyName||""}
            .configValue=${""}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">${Bt("ui.panel.options.repeat_type",this.hass.language)}</div>
          <button-group
            .items=${t}
            value="${this.entries[0].options&&"run_once"in this.entries[0].options&&this.entries[0].options.run_once?"run_once":"repeat"}"
            @change=${this.updateRepeatType}>
          </button-group>
          
        `}
        </div>
        <div class="card-actions">
          ${this.addCondition?L`
                <mwc-button @click=${this.confirmConditionClick} ?disabled=${!this.selectedEntity}
                  >${this.hass.localize("ui.common.continue")}</mwc-button
                >
              `:L`
                <mwc-button @click=${this.saveClick}>${this.hass.localize("ui.common.save")}</mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize("ui.common.back")}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `}renderAddCondition(){if(!this.addCondition||!this.hass||!this.config)return L``;const e=as(Object.keys(this.hass.states).filter(e=>Vi(e,this.config)).filter(e=>_s(e,this.hass,this.config)),this.config,this.hass);e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1);let t=[];return this.selectedGroup&&(t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>Fi(e,this.hass,this.config)),t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1)),L`
      <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
      <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
        ${Bt("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
      </button-group>

      <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
      <button-group .items=${t} value=${this.selectedEntity} @change=${this.selectEntity}>
        ${this.selectedGroup?Bt("ui.panel.entity_picker.no_entities_for_group",this.hass.language):Bt("ui.panel.entity_picker.no_group_selected",this.hass.language)}
      </button-group>
    `}selectGroup(e){this.selectedItem=null,this.editItem=null,this.selectedGroup=e.target.value,this.selectedEntity=void 0}selectEntity(e){this.selectedItem=null,this.editItem=null,this.selectedEntity=e.target.value}renderConditions(){var e;if(!this.hass)return L``;const t=(null===(e=this.entries[0].conditions)||void 0===e?void 0:e.items)||[];return t.length?t.map((e,t)=>L`
        <condition-entity-row
          .item=${e}
          .hass=${this.hass}
          .config=${this.config}
          .selected=${this.selectedItem===t}
          .editMode=${this.editItem===t}
          @change="${e=>this.updateCondition(e,t)}"
        >
        </condition-entity-row>
      `):L`
        <div class="text-field">${Bt("ui.panel.conditions.no_conditions_defined",this.hass.language)}</div>
      `}updateCondition(e,t){if(e.detail.selected)this.selectedItem=t,this.editItem=null;else{this.selectedItem==t&&(this.selectedItem=null),this.editItem!=t&&(this.editItem=t);const i=[...this.entries[0].conditions.items];i[t]=Object.assign({},e.detail.item),this.entries=this.entries.map(e=>Object.assign(e,{conditions:Object.assign(e.conditions,{items:i})}))}}addConditionClick(){this.addCondition=!this.addCondition,this.editItem=null,this.selectedItem=null}confirmConditionClick(){var e,t;if(!this.selectedEntity||!this.config||!this.hass)return;const i=_s(this.selectedEntity,this.hass,this.config),s=Array.isArray(i)?1:i.step||1,a=Array.isArray(i)?i[0]:Number((Math.round((i.min+i.max)/2/s)*s).toPrecision(5)),n={entity:this.selectedEntity,match_type:ne.Equal,state:a},o=(null===(e=this.entries[0].conditions)||void 0===e?void 0:e.items.length)?[...this.entries[0].conditions.items]:[],r=(null===(t=this.entries[0].conditions)||void 0===t?void 0:t.type)?this.entries[0].conditions.type:oe.Any;o.push(n),this.entries=this.entries.map(e=>Object.assign(e,{conditions:{items:o,type:r}})),this.selectedEntity=void 0,this.selectedGroup=void 0,this.selectedItem=null,this.addCondition=!1}removeConditionClick(){if(null===this.selectedItem)return;const e=[...this.entries[0].conditions.items];e.splice(this.selectedItem,1),this.entries=this.entries.map(t=>Object.assign(t,{conditions:Object.assign(t.conditions,{items:e})})),this.selectedItem=null}conditionTypeSwitchClick(e){const t=e.target.checked?oe.All:oe.Any;this.entries=this.entries.map(e=>Object.assign(e,{conditions:Object.assign(e.conditions,{type:t})}))}updateName(e){const t=e.target.value;t!=this.friendlyName&&(this.friendlyName=t)}updateRepeatType(e){const t=e.target.value,i=Object.assign({},this.entries[0].options);"run_once"==t?Object.assign(i,{run_once:!0}):"run_once"in i&&delete i.run_once,this.entries=this.entries.map(e=>Object.assign(e,{options:i}))}cancelClick(){if(this.addCondition)this.addCondition=!this.addCondition,this.editItem=null,this.selectedItem=null;else{const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}}saveClick(){const e=new CustomEvent("saveClick",{detail:{entries:this.entries,friendlyName:this.friendlyName}});this.dispatchEvent(e)}backClick(){const e=new CustomEvent("backClick",{detail:{entries:this.entries,friendlyName:this.friendlyName}});this.dispatchEvent(e)}};gs.styles=Wt,t([K()],gs.prototype,"hass",void 0),t([K()],gs.prototype,"config",void 0),t([K()],gs.prototype,"entries",void 0),t([K()],gs.prototype,"friendlyName",void 0),t([K()],gs.prototype,"selectedGroup",void 0),t([K()],gs.prototype,"selectedEntity",void 0),t([K()],gs.prototype,"editItem",void 0),t([K()],gs.prototype,"selectedItem",void 0),t([K()],gs.prototype,"addCondition",void 0),gs=t([Z("scheduler-options-card")],gs);let fs=class extends se{constructor(){super(...arguments),this.selectedDomain="",this.titleOption="standard"}setConfig(e){this._config=e,this.titleOption=this.getTitleOption()}render(){return this.hass?L`
      <div class="card-config">
        <div class="header">Title of the card</div>
        <button-group
          .items=${["standard","hidden","custom"]}
          value=${this.getTitleOption()}
          @change=${this.updateTitleOption}
        >
        </button-group>
        ${"custom"==this.titleOption?L`
              <paper-input
                label="Custom title"
                .value=${this.getTitle()}
                .configValue=${"name"}
                @value-changed=${this.updateTitle}
              ></paper-input>
            `:""}

        <div class="header">Show all schedules</div>
        <div class="text-field">
          This sets the 'discover existing' parameter.<br />
          Disable if you want to use multiple scheduler-cards.
        </div>
        <button-group
          .items=${[{id:"true",name:"on"},{id:"false",name:"off"}]}
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
          ?optional=${!1}
          ?disabled=${!1}
          @change=${this.updateTimeStepOption}
        >
        </variable-slider>

        <div class="header">Included entities</div>
        <div class="text-field">Click on a group to open it.</div>
        ${this.getDomainSwitches()}
      </div>
    `:L``}getTitleOption(){return this._config&&this.hass?void 0===this._config.title?"standard":"string"==typeof this._config.title?"custom":0==this._config.title?"hidden":"standard":"standard"}getTitle(){return this.hass?this._config&&this.hass?void 0===this._config.title?Bt("ui.panel.common.title",this.hass.language):"string"==typeof this._config.title?this._config.title:0==this._config.title?"":Bt("ui.panel.common.title",this.hass.language):Bt("ui.panel.common.title",this.hass.language):""}updateTitleOption(e){const t=e.target.value;if(!this._config||!this.hass)return;this.titleOption=t;const i=Object.assign({},this._config);"standard"==t?"title"in this._config&&delete i.title:"hidden"==t&&Object.assign(i,{title:!1}),this._config=i,gi(this,"config-changed",{config:this._config})}updateTitle(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=String(e.target.value);Object.assign(t,{title:i}),this._config=t,gi(this,"config-changed",{config:this._config})}getDiscoveryOption(){if(!this._config||!this.hass)return;return!this._config.hasOwnProperty("discover_existing")||this._config.discover_existing}updateDiscoveryOption(e){const t="true"==e.target.value;if(!this._config||!this.hass)return;const i=Object.assign({},this._config);t?i.hasOwnProperty("discover_existing")&&delete i.discover_existing:Object.assign(i,{discover_existing:t}),this._config=i,gi(this,"config-changed",{config:this._config})}getTimeStepOption(){if(!this._config||!this.hass)return;const e=this._config.hasOwnProperty("time_step")?this._config.time_step:10;return Number(e)}updateTimeStepOption(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=Number(e.target.value);10==i&&t.hasOwnProperty("time_step")?delete t.time_step:Object.assign(t,{time_step:i}),this._config=t,gi(this,"config-changed",{config:this._config})}getDomainSwitches(){if(!this._config||!this.hass)return;this._config.include&&this._config.include;const e=Object.keys(this.hass.states).filter(e=>!Ui(e)).map(e=>Fi(e,this.hass,{include:["*"]})).filter(e=>Bi(e.id,this.hass,{}).length);return e.map(e=>_i(e.id)).filter((e,t,i)=>i.indexOf(e)===t).map(t=>{const i=e.filter(e=>_i(e.id)==t).length;return i?L`
        <div
          class="row"
          @click=${()=>{this.toggleSelectDomain(t)}}
        >
          <ha-icon icon="${ke(Yi[t])}"> </ha-icon>

          <div class="info">
            ${t}
            <div class="secondary">
              ${i} ${1==i?"entity":"entities"}
            </div>
          </div>
          <ha-icon-button icon="${this.selectedDomain==t?"mdi:chevron-down":"mdi:chevron-right"}">
          </ha-icon-button>
        </div>
        ${this.selectedDomain==t?L`
              <div class="divider"></div>
              ${this.getEntitySwitches(t)}
              <div class="divider"></div>
            `:""}
      `:""})}getEntitySwitches(e){if(!this._config||!this.hass)return;const t=this._config.include?[...this._config.include]:[];return Object.entries(this.hass.states).filter(([t])=>_i(t)==e&&!Ui(t)).map(([e,i])=>{const s=i.attributes.friendly_name||vi(e),a=t.includes(e);return L`
          <div class="row" @click=${()=>this.toggleSelectEntity(e)}>
            <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e]}> </state-badge>
            <div class="info">
              ${s}
              <div class="secondary">
                ${e}
              </div>
            </div>
            <ha-switch ?checked=${a}> </ha-switch>
          </div>
        `})}toggleSelectDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectEntity(e){if(!this._config||!this.hass)return;let t=this._config.include?[...this._config.include]:[];t.includes(e)?t=t.filter(t=>t!=e):t.push(e),t.sort(),this._config=Object.assign(Object.assign({},this._config),{include:t}),gi(this,"config-changed",{config:this._config})}static get styles(){return te`
      ${Wt}
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
    `}};t([K()],fs.prototype,"hass",void 0),t([K()],fs.prototype,"_config",void 0),t([K()],fs.prototype,"selectedDomain",void 0),t([K()],fs.prototype,"titleOption",void 0),fs=t([Z("scheduler-card-editor")],fs),window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"1.9.5".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),e.SchedulerCard=class extends se{constructor(){super(...arguments),this._view=le.Overview,this.entries=[],this.actions=[],this.translationsLoaded=!1,this.editItem=null,this.scheduleEntities=[]}static getConfigElement(){return document.createElement("scheduler-card-editor")}set hass(e){this.scheduleEntities=Object.keys(e.states).filter(e=>Ui(e)),this._hass=e}firstUpdated(){const e=this._hass;if(e.localize("ui.panel.config.automation.editor.actions.name"))this.translationsLoaded=!0;else{document.querySelector("home-assistant")._loadFragmentTranslations(e.language,"config").then(()=>{this._hass.localize})}}shouldUpdate(e){const t=e.get("_hass");if(t&&1==e.size){if(!t.localize("ui.panel.config.automation.editor.actions.name"))return this.translationsLoaded=!0,!0;const e=Object.keys(t.states).filter(e=>Ui(e));return e.length!==this.scheduleEntities.length||(!!e.some((e,t)=>e!==this.scheduleEntities[t])||!!e.some(e=>t.states[e]!==this._hass.states[e]))}return!0}setConfig(e){ze(e),this._config=e}getCardSize(){return this._hass&&this.scheduleEntities.length?6+this.scheduleEntities.length:6}render(){return this._hass&&this._config&&this.translationsLoaded?this._view==le.Overview?L`
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `:this._view==le.NewSchedule?L`
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entity=${this.entity}
          .selectedAction=${this.entries?this.entries.every(e=>e.endTime)?"make_scheme":this.actions[0].id:void 0}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `:this._view==le.TimePicker||this._view==le.TimeScheme?L`
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .entries=${this.entries}
          .entity=${this.entity}
          .actions=${this.actions}
          ?timeslots=${this._view==le.TimeScheme}
          ?editItem=${null!==this.editItem}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `:this._view==le.Options?L`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .entries=${this.entries}
        .friendlyName=${this.friendlyName}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${e=>this._optionsBackClick(e,!0)}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `:L``:L``}_addItemClick(){this._view=le.NewSchedule,this.editItem=null,this.friendlyName=void 0,this.entity=void 0,this.actions=[],this.entries=[]}_cancelEditClick(){this._view=le.Overview,this.editItem=null}_confirmItemClick(e){if(!this._hass||!this._config)return;const t=String(e.detail.entity);this.entity=Fi(t,this._hass,this._config);const i=String(e.detail.action);if("make_scheme"!=i){if(this.entries&&1==this.entries.length){let e=this.entries[0];t!=e.entity&&(e=Object.assign(Object.assign({},e),{entity:t})),i!=e.action&&(e=Object.assign(Object.assign({},e),{action:i,variable:void 0})),this.entries=[e]}else this.entries=[{entity:t,action:i,time:{value:me("12:00")},days:{type:ce.Daily}}];this._view=le.TimePicker,this.actions=[Bi(t,this._hass,this._config).find(e=>e.id==i)]}else{if(this.actions=Bi(t,this._hass,this._config),this.entries&&this.entries.length>1){let e=this.entries;this.entries=e.map(e=>(t!=e.entity&&(e=Object.assign(Object.assign({},e),{entity:t})),e.action&&!this.actions.find(t=>e.action==t.id)&&(e=Object.assign(Object.assign({},e),{action:"",variable:void 0})),e))}else this.entries=[{entity:e.detail.entity,action:"",time:{value:me("00:00")},endTime:{value:me("08:00")},days:{type:ce.Daily}},{entity:e.detail.entity,action:"",time:{value:me("08:00")},endTime:{value:me("16:00")},days:{type:ce.Daily}},{entity:e.detail.entity,action:"",time:{value:me("16:00")},endTime:{value:1440},days:{type:ce.Daily}}];this._view=le.TimeScheme}}_editActionClick(e){this.entries=e.detail,this._view=le.NewSchedule}_saveItemClick(e){if(!this._hass||!this._config)return;e&&(this.entries=e.detail);const t=[],i=[],s=[],a={};this.entries.forEach(e=>{var n,o;if(!e.action||!e.entity)return;const r=this.actions.find(t=>t.id==e.action),c=function(e,t){return t.variable&&e.variable?t.variable.type==ae.Level&&e.variable.type==ae.Level?t.variable.enabled?{[e.variable.field]:Number(t.variable.value)}:{}:{[e.variable.field]:String(t.variable.value)}:{}}(r,e),l={entity:e.entity,service:r.service,service_data:Object.assign(Object.assign({},r.service_data||{}),c)};let d=t.findIndex(e=>Mi(e)==Mi(l));-1==d&&(d=t.push(l)-1);const u={actions:[d]};e.time.event?e.time.event&&Object.assign(u,{time:{event:pe(e.time.event),offset:ue(e.time.value).time}}):Object.assign(u,{time:ue(e.time.value).time}),e.endTime&&(e.time.event?e.time.event&&Object.assign(u,{end_time:{event:pe(e.endTime.event),offset:ue(e.endTime.value).time}}):Object.assign(u,{end_time:ue(e.endTime.value).time}));let h="daily";if(e.days.type==ce.Workday?h="workday":e.days.type==ce.Weekend?h="weekend":e.days.type==ce.Custom&&(h="custom"),e.days.type==ce.Custom?Object.assign(u,{days:{type:h,list:e.days.custom_days}}):Object.assign(u,{days:{type:h}}),"conditions"in e&&(null===(n=e.conditions)||void 0===n?void 0:n.items.length)){const t=[];null===(o=e.conditions)||void 0===o||o.items.forEach(e=>{let i=s.findIndex(t=>t===e);i<0&&(i=s.push(e)-1),t.push(i)}),Object.assign(u,{conditions:{list:t,type:e.conditions.type}})}if(e.options&&Object.keys(e.options).length){const t=[];Object.entries(e.options).forEach(([e,i])=>{let s=Object.entries(a).findIndex(([t,s])=>({[e]:i}==={[t]:s}));s<0&&(Object.assign(a,{[e]:i}),s=Object.keys(a).length-1),t.push(s)}),Object.assign(u,{options:t})}i.push(u)});const n={entries:i,actions:t};s.length&&Object.assign(n,{conditions:s}),this.friendlyName&&Object.assign(n,{name:this.friendlyName}),Object.keys(a).length&&Object.assign(n,{options:a}),this.editItem?this._hass.callService("scheduler","edit",Object.assign(n,{entity_id:this.editItem})):this._hass.callService("scheduler","add",n),this.editItem=null,this._view=le.Overview}_deleteItemClick(){const e=this.editItem;this._hass.callService("scheduler","remove",{entity_id:e}),this.editItem=null,this._view=le.Overview}_editItemClick(e){if(!this._hass||!this._config)return;const t=this._hass.states[e.detail],i=t.attributes.entries.map(ge),s=Zi(t.attributes.actions[0]),a=Fi(s.entity,this._hass,this._config);this.entity=a,this.actions=Bi(s.entity,this._hass,this._config);const n=t.attributes.conditions||[],o=t.attributes.options||{};this.entries=i.map(e=>{const i=e.actions.filter(e=>e<t.attributes.actions.length).map(e=>Zi(t.attributes.actions[e])).shift(),s=Wi(i,this._hass,this._config),a=this.actions.find(e=>Pi(e,s));if(!a){const e=[...this.actions];e.push(s),this.actions=e}let r={time:e.time,endTime:e.endTime,days:e.days,entity:this.entity.id,action:a?a.id:s.id};if(s.variable&&i.service_data&&s.variable.field in i.service_data)if(s.variable.type==ae.Level){const e={type:ae.Level,value:Number(i.service_data[s.variable.field]),enabled:!0};r=Object.assign(Object.assign({},r),{variable:e})}else{const e={type:ae.List,value:String(i.service_data[s.variable.field])};r=Object.assign(Object.assign({},r),{variable:e})}return e.conditions&&e.conditions.items.length&&Object.assign(r,{conditions:{type:e.conditions.type,items:e.conditions.items.filter(e=>n.length>=e-1).map(e=>n[e])}}),e.options&&Object.keys(e.options).length&&Object.assign(r,{options:e.options.reduce((e,t)=>Object.assign(e,fe(o,[Object.keys(o)[t]])),{})}),r}),this.editItem=t.entity_id,this.friendlyName=t.attributes.friendly_name,this.entries.every(e=>e.endTime)?(this._view=le.TimeScheme,this.entries=function(e){e.sort((e,t)=>e.time.value>t.time.value?1:-1),e=e.map(e=>e.endTime.value<e.time.value?Object.assign(e,{endTime:{value:e.endTime.value+1440}}):e);let t=0;for(let i=0;i<e.length;i++){const s=e[i];s.time.value>t&&e.splice(i,0,Object.assign({time:{value:t},endTime:{value:s.time.value}},fe(s,["entity","days","conditions","options"]))),t=s.endTime.value}return t<1440&&e.push(Object.assign({time:{value:t},endTime:{value:1440}},fe(e[0],["entity","days","conditions","options"]))),e}(this.entries)):(this.actions=this.actions.filter(e=>e.id==this.entries[0].action),this._view=le.TimePicker)}_gotoOptionsClick(e){this.entries=e.detail,this._view=le.Options}_optionsBackClick(e,t){this.entries=e.detail.entries,this.friendlyName=e.detail.friendlyName,this.entries.every(e=>e.endTime)?this._view=le.TimeScheme:this._view=le.TimePicker,t&&this._saveItemClick()}},t([K()],e.SchedulerCard.prototype,"_hass",void 0),t([K()],e.SchedulerCard.prototype,"_view",void 0),t([K()],e.SchedulerCard.prototype,"entries",void 0),t([K()],e.SchedulerCard.prototype,"entity",void 0),t([K()],e.SchedulerCard.prototype,"actions",void 0),t([K()],e.SchedulerCard.prototype,"friendlyName",void 0),t([K()],e.SchedulerCard.prototype,"translationsLoaded",void 0),e.SchedulerCard=t([Z("scheduler-card")],e.SchedulerCard)}({});
