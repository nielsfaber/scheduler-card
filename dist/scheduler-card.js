!function(e){"use strict";
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
     */}const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},a=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${a}--\x3e`,o=new RegExp(`${a}|${n}`);class r{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],n=document.createTreeWalker(t.content,133,null,!1);let r=0,l=-1,h=0;const{strings:p,values:{length:m}}=e;for(;h<m;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)c(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=p[h],i=u.exec(t)[2],s=i.toLowerCase()+"$lit$",a=e.getAttribute(s);e.removeAttribute(s);const n=a.split(o);this.parts.push({type:"attribute",index:l,name:i,strings:n}),h+=n.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const s=e.parentNode,a=t.split(o),n=a.length-1;for(let t=0;t<n;t++){let i,n=a[t];if(""===n)i=d();else{const e=u.exec(n);null!==e&&c(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++l})}""===a[n]?(s.insertBefore(d(),e),i.push(e)):e.data=a[n],h+=n}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&l!==r||(l++,t.insertBefore(d(),e)),r=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(i.push(e),l--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),h++}}else n.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const c=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:s}=e,a=document.createTreeWalker(i,133,null,!1);let n=m(s),o=s[n],r=-1,c=0;const l=[];let d=null;for(;a.nextNode();){r++;const e=a.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==o&&o.index===r;)o.index=null!==d?-1:o.index-c,n=m(s,n),o=s[n]}l.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},m=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1};
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),$=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new z(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!$(e))return e}let s="";for(let a=0;a<t;a++){s+=e[a];const t=i[a];if(void 0!==t){const e=t.value;if(x(e)||!$(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class z{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||x(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof k?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):$(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const i=new y(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const a of e)i=t[s],void 0===i&&(i=new j(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(a),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class O extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends z{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=D(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const D=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function M(e){let t=N.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},N.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);return i=t.keyString.get(s),void 0===i&&(i=new r(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const N=new Map,P=new WeakMap;
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
class{handleAttributeExpressions(e,t,i,s){const a=t[0];if("."===a){return new O(e,t.slice(1),i).parts}if("@"===a)return[new A(e,t.slice(1),s.eventContext)];if("?"===a)return[new E(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new j(e)}};
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
     */,q=(e,t)=>`${e}--${t}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const R=e=>t=>{const i=q(t.type,e);let s=N.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},N.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(a);if(n=s.keyString.get(o),void 0===n){const i=t.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(i,e),n=new r(t,i),s.keyString.set(o,n)}return s.stringsArray.set(t.strings,n),n},U=["html","svg"],H=new Set,W=(e,t,i)=>{H.add(e);const s=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:n}=a;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=a[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{U.forEach(t=>{const i=N.get(q(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),h(e,i)})})})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:a}=e;if(null==i)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let o=m(a),r=0,c=-1;for(;n.nextNode();){c++;for(n.currentNode===i&&(r=p(t),i.parentNode.insertBefore(t,i));-1!==o&&a[o].index===c;){if(r>0){for(;-1!==o;)a[o].index+=r,o=m(a,o);return}o=m(a,o)}}}(i,o,r.firstChild):r.insertBefore(o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const c=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(o,r.firstChild);const e=new Set;e.add(o),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const B={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Y=(e,t)=>t!==e&&(t==t||e==e),G={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:Y};class F extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=G){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const a=this[e];this[t]=s,this.requestUpdateInternal(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||G}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=Y){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||B,a="function"==typeof s?s:s.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||B.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=G){const s=this.constructor,a=s._attributeNameForProperty(e,i);if(void 0!==a){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const a=this.constructor;i=i||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}F.finalized=!0;
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
const Z=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),J=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function K(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):J(e,t)}function Q(e){return K({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol();class te{constructor(e,t){if(t!==ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof te)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new te(i,ee)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const se={};class ae extends F{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!X){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new te(String(t),ee)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==se&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return se}}var ne,oe,re,ce,le,de;ae.finalized=!0,ae.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const a=i.scopeName,n=P.has(t),o=V&&11===t.nodeType&&!!t.host,r=o&&!H.has(a),c=r?document.createDocumentFragment():t;if(((e,t,i)=>{let a=P.get(t);void 0===a&&(s(t,t.firstChild),P.set(t,a=new j(Object.assign({templateFactory:M},i))),a.appendInto(t)),a.setValue(e),a.commit()})(e,c,Object.assign({templateFactory:R(a)},i)),r){const e=P.get(c);P.delete(c);const i=e.value instanceof y?e.value.template:void 0;W(a,c,i),s(t,t.firstChild),t.appendChild(c),P.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)},function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(ne||(ne={})),function(e){e.Level="LEVEL",e.List="LIST"}(oe||(oe={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(re||(re={})),function(e){e.Any="or",e.All="and"}(ce||(ce={})),function(e){e.Sunrise="sunrise",e.Sunset="sunset"}(le||(le={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(de||(de={}));var ue;function he(e){if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number);return 3600*t[0]+60*t[1]+t[2]||0}{const t=new Date(e);return 3600*t.getHours()+60*t.getMinutes()+t.getSeconds()}}function pe(e){const t=Math.floor(e/3600);e-=3600*t;const i=Math.floor(e/60);e-=60*i;const s=Math.round(e);return String(t%24).padStart(2,"0")+":"+String(i).padStart(2,"0")+":"+String(s).padStart(2,"0")}function me(e,t,i={wrapAround:!0}){let s=e>=0?Math.floor(e/3600):Math.ceil(e/3600),a=Math.floor((e-3600*s)/60);a%t!=0&&(a=Math.round(a/t)*t),a>=60?(s++,a-=60):a<0&&(s--,a+=60),i.wrapAround&&(s>=24?s-=24:s<0&&(s+=24));const n=3600*s+60*a;if(i.maxHours){if(n>3600*i.maxHours)return 3600*i.maxHours;if(n<3600*-i.maxHours)return 3600*-i.maxHours}return n}function _e(e){const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);return!!t&&{event:t[1],sign:t[2],offset:t[3]}}function ve(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function ge(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function fe(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?fe(t):t),[])}function ye(e){return e.filter((e,t,i)=>i.indexOf(e)===t)}function be(e){return e.charAt(0).toUpperCase()+e.slice(1)}function we(e){return"string"!=typeof e&&(e=String(e)),be(e.replace(/_/g," "))}function ke(e){if(e)return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"hass:"+e}function xe(e){e.sort((e,t)=>he(e.start)>he(t.start)?1:-1),e=e.map(e=>he(e.stop)<he(e.start)?Object.assign(Object.assign({},e),{stop:pe(he(e.stop)+86400)}):e);let t=0;for(let i=0;i<e.length;i++){const s=e[i];he(s.start)>t&&e.splice(i,0,Object({start:pe(t),stop:s.start,actions:[]})),t=he(s.stop)}return t<86400&&t>0&&e.push(Object({start:pe(t),stop:pe(86400),actions:[]})),e}function $e(e){const t=[];let i=[];const s=e=>{e&&t.push(i.length?`in ${i.join("->")}: ${e}`:e)},a=(e,t)=>e.hasOwnProperty(t),n=(e,t)=>Array.isArray(t)?t.some(t=>n(e,t)):"array"==t?Array.isArray(e):typeof e===t,o=(e,t,i)=>{if(a(e,t)){n(e[t],i)||s(`'${t}' must be of type ${i}`)}else s(`missing required property '${t}'`)},r=(e,t,i)=>{if(!a(e,t))return;n(e[t],i)||s(`'${t}' must be of type ${i}`)},c=(e,t,i)=>{let o=!0;return a(e,t)&&n(e[t],"array")?e[t].some(e=>!n(e,i))&&(s(`'${t}' must be an array with items of type ${i}`),o=!1):o=!1,o};if(r(e,"discover_existing","boolean"),r(e,"standard_configuration","boolean"),r(e,"title",["boolean","string"]),r(e,"time_step","number"),r(e,"show_header_toggle","boolean"),r(e,"include","array"),c(e,"include","string"),r(e,"exclude","array"),c(e,"exclude","string"),r(e,"display_options","object"),a(e,"display_options")&&(i.push("display_options"),r(e.display_options,"primary_info",["string","array"]),r(e.display_options,"secondary_info",["string","array"]),r(e.display_options,"icon","string"),c(e.display_options,"primary_info","string"),c(e.display_options,"secondary_info","string")),i=[],r(e,"groups","array"),a(e,"groups")&&n(e.groups,"array")&&(i.push("groups"),e.groups.forEach((e,t)=>{i=["groups",t],o(e,"name","string"),r(e,"icon","string"),o(e,"include","array"),r(e,"exclude","array"),c(e,"include","string"),c(e,"exclude","string")})),i=[],r(e,"customize","object"),a(e,"customize")&&n(e.customize,"object")&&Object.keys(e.customize).forEach(t=>{if(i=["customize"],n(t,"string")||s(t+" is not allowed"),o(e.customize,t,"object"),a(e.customize,t)&&n(e.customize[t],"object")){i.push(t);const l=e.customize[t];r(l,"name","string"),r(l,"icon","string"),r(l,"actions","array"),c(l,"actions","object")&&l.actions.forEach((e,l)=>{i=["customize",t,l],(e=>{const t=i;r(e,"name","string"),r(e,"icon","string"),o(e,"service","string"),r(e,"service_data","object"),c(e,"service_data","string"),a(e,"service_data")&&n(e.service_data,"object")&&Object.keys(e.service_data).some(e=>!n(e,"string"))&&s("service_data items must have string as index type"),r(e,"variable","object"),a(e,"variable")&&n(e.variable,"object")&&(i.push("variable"),o(e.variable,"field","string"),r(e.variable,"name","string"),c(e.variable,"options","object")?e.variable.options.forEach((e,s)=>{i=t.concat(t,["variable",s]),o(e,"value","string"),r(e,"name","string"),r(e,"icon","string")}):(r(e.variable,"min","number"),r(e.variable,"max","number"),r(e.variable,"step","number"),r(e.variable,"optional","boolean"),r(e.variable,"unit","string")))})(e)})}}),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`)}!function(e){e.Overview="OVERVIEW",e.NewSchedule="NEW_SCHEDULE",e.TimePicker="TIME_PICKER",e.TimeScheme="TIME_SCHEME",e.Options="OPTIONS"}(ue||(ue={}));var Se={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"vypnout režim"}},ze={alarm_control_panel:"poplašný ovládací panel",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"světla",lock:"zámky",media_player:"média přehrávače",scene:"scény",script:"skripty",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},je={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},panel:{common:{title:"Plánovač"},overview:{no_entries:"Nejsou žádné položky k zobrazení",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},entity_picker:{no_groups_defined:"Nejsou definovány žádné skupiny",no_group_selected:"Nejprve vyberte skupinu",no_entities_for_group:"V této skupině nejsou žádné entity",no_entity_selected:"Nejprve vyberte entitu",no_actions_for_entity:"Pro tuto entitu neexistují žádné akce",make_scheme:"vytvořit schéma"},time_picker:{no_timeslot_selected:"Nejprve vyberte časový úsek"},conditions:{equal_to:"je",unequal_to:"není",all:"Vše",any:"žádný",no_conditions_defined:"Nejsou definovány žádné podmínky"},options:{repeat_type:"chování po spuštění"}}},Ee={services:Se,domains:ze,ui:je},Oe=Object.freeze({__proto__:null,services:Se,domains:ze,ui:je,default:Ee}),Ce={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_away_mode:"Abwesenheitsmodus setzen"}},Te={alarm_control_panel:"Alarmzentrale",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",scene:"Szene",script:"Skripte",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},Ae={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"um Mittag",at_sun_event:"beim {sunEvent}"}},panel:{common:{title:"Zeitplaner"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",excluded_items:"{number}{if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},entity_picker:{no_groups_defined:"Es gibt keine Gruppe",no_group_selected:"Wähle zuerst eine Gruppe aus",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_entity_selected:"Wähle zuerst eine Entity aus",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",make_scheme:"Erstelle Zeitplan"},time_picker:{no_timeslot_selected:"Wähle zuerst ein Zeitfenster aus"},conditions:{equal_to:"ist",unequal_to:"ist nicht",all:"alle",any:"keine",no_conditions_defined:"Es sind keine Bedingungen definiert"},options:{repeat_type:"Verhalten im Anschluß"}}},De={services:Ce,domains:Te,ui:Ae},Me=Object.freeze({__proto__:null,services:Ce,domains:Te,ui:Ae,default:De}),Ne={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},Pe={alarm_control_panel:"alarm control panel",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lights",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},Ie={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Scheduler"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"There are no groups defined",no_group_selected:"Select a group first",no_entities_for_group:"There are no entities in this group",no_entity_selected:"Select an entity first",no_actions_for_entity:"There are no actions for this entity",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},Le={services:Ne,domains:Pe,ui:Ie},qe=Object.freeze({__proto__:null,services:Ne,domains:Pe,ui:Ie,default:Le}),Ve={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción [ a {temperature}]",set_temperature_hvac_mode_cool:"frío [ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste [ {preset_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición [ a {position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"establecer modo fuera de casa"}},Re={alarm_control_panel:"panel de control de alarma",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luces",lock:"cerraduras",media_player:"reproductores",scene:"escenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},Ue={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},panel:{common:{title:"Programador"},overview:{no_entries:"No hay ningún elemento que mostrar",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},entity_picker:{no_groups_defined:"No hay ningún grupo definido",no_group_selected:"selecciona un grupo primero",no_entities_for_group:"no hay ningúna entidad en este grupo",no_entity_selected:"selecciona una entidad primero",no_actions_for_entity:"no hay acciones para esta entidad",make_scheme:"crear planificación"},time_picker:{no_timeslot_selected:"selecciona un bloque de tiempo primero"},conditions:{equal_to:"igual a",unequal_to:"desigual a",all:"todos",any:"cualquiera",no_conditions_defined:"no hay ninguna condición definida"},options:{repeat_type:"acción después de ejecutar"}}},He={services:Ve,domains:Re,ui:Ue},We=Object.freeze({__proto__:null,services:Ve,domains:Re,ui:Ue,default:He}),Be={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},script:{script:"käivitae"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_away_mode:"kodust ära"}},Ye={alarm_control_panel:"valvepaneel",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",light:"valgustid",lock:"lukud",media_player:"meediamängijad",scene:"stseenid",script:"skriptud",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},Ge={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},panel:{common:{title:"Ajastaja"},overview:{no_entries:"Ajastused puuduvad",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},entity_picker:{no_groups_defined:"Gruppe pole valitud",no_group_selected:"Vali alustuseks grupid",no_entities_for_group:"Selles grupis puuduvad olemid",no_entity_selected:"Vali alustuseks olem",no_actions_for_entity:"Selle olemi jaoks pole tegevusi",make_scheme:"loo skeem"},time_picker:{no_timeslot_selected:"Alustuseks vali ajavahemik"},conditions:{equal_to:"võrdub",unequal_to:"ei võrdu",all:"kõik",any:"iga",no_conditions_defined:"Tingimusi pole määratud"},options:{repeat_type:"toiming peale käivitumist"}}},Fe={services:Be,domains:Ye,ui:Ge},Ze=Object.freeze({__proto__:null,services:Be,domains:Ye,ui:Ge,default:Fe}),Je={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidi[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec {brightness} luminosité]"},media_player:{select_source:"choisir la source[ {source}]"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_away_mode:"choisir le mode absent"}},Ke={alarm_control_panel:"panneau de contrôle de l'alarme",climate:"thermostat",cover:"couvertures",fan:"ventilateurs",group:"groupes",humidifier:"humidificateurs",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",light:"lumière",lock:"serrure",media_player:"lecteurs multimédias",scene:"scènes",script:"scripts",switch:"interrupteurs",vacuum:"aspirateur",water_heater:"chauffe eau"},Qe={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},panel:{common:{title:"Planificateur"},overview:{no_entries:"il n'y a pas d'entrée à montrer",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},entity_picker:{no_groups_defined:"Aucun groupe défini",no_group_selected:"Choisir un groupe en premier",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_entity_selected:"Choisir une entité en premier",no_actions_for_entity:"Il n'y a pas d'action pour cet entité",make_scheme:"créer un schéma"},time_picker:{no_timeslot_selected:"Choisir une plage horaire en premier"},conditions:{equal_to:"égal à",unequal_to:"pas égal à",all:"tous",any:"tout",no_conditions_defined:"Il n'y a pas de condition définie"},options:{repeat_type:"comportement après déclenchement"}}},Xe={services:Je,domains:Ke,ui:Qe},et=Object.freeze({__proto__:null,services:Je,domains:Ke,ui:Qe,default:Xe}),tt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_cool:"hőmérséklet[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},it={alarm_control_panel:"alarm control panel",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",light:"lámpa",lock:"locks",media_player:"lejátszó",scene:"jelenetek",script:"scripts",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},st={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},panel:{common:{title:"Időzítések"},overview:{no_entries:"Nincs megjeleníthető elem",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},entity_picker:{no_groups_defined:"Nincsenek deffiniált csoportok",no_group_selected:"Előbb egy csoportot szükséges választani",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_entity_selected:"Előbb egy entitást szükséges választani",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},at={services:tt,domains:it,ui:st},nt=Object.freeze({__proto__:null,services:tt,domains:it,ui:st,default:at}),ot={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_away_mode:"imposta fuori casa"}},rt={alarm_control_panel:"pannello di controllo allarme",climate:"clima",cover:"cover",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luci",lock:"lucchetti",media_player:"media player",scene:"scene",script:"script",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},ct={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},panel:{common:{title:"Schedulatore"},overview:{no_entries:"Non ci sono oggetti da visualizzare",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},entity_picker:{no_groups_defined:"Non ci sono gruppi definiti",no_group_selected:"Seleziona prima un gruppo",no_entities_for_group:"Non ci sono entità in questo gruppo",no_entity_selected:"Seleziona prima un'entità",no_actions_for_entity:"Non ci sono azioni per questa entità",make_scheme:"crea schema"},time_picker:{no_timeslot_selected:"Seleziona prima una fascia oraria"},conditions:{equal_to:"uguale",unequal_to:"non uguale",all:"tutte",any:"qualunque",no_conditions_defined:"Non ci sono condizioni definite"},options:{repeat_type:"comportamento dopo l'attivazione"}}},lt={services:ot,domains:rt,ui:ct},dt=Object.freeze({__proto__:null,services:ot,domains:rt,ui:ct,default:lt}),ut={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]"},fan:{set_speed:"snelheid instellen[ op {speed}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_away_mode:"stel afwezigheidsmode in"}},ht={alarm_control_panel:"alarmsystemen",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"verlichting",lock:"sloten",media_player:"mediaspelers",scene:"scènes",script:"scripts",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},pt={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},panel:{common:{title:"Tijdplanner"},overview:{no_entries:"Er zijn geen items aangemaakt",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},entity_picker:{no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",make_scheme:"maak schema"},time_picker:{no_timeslot_selected:"Kies eerst een tijdsslot"},conditions:{equal_to:"is",unequal_to:"is niet",all:"en",any:"of",no_conditions_defined:"Er zijn geen voorwaarden gedefinieerd"},options:{repeat_type:"gedrag na activeren"}}},mt={services:ut,domains:ht,ui:pt},_t=Object.freeze({__proto__:null,services:ut,domains:ht,ui:pt,default:mt}),vt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_heat:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_cool:"sett temperatur[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ {preset_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"slå på[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},gt={alarm_control_panel:"alarm control panel",climate:"klima",cover:"covers",fan:"vifter",group:"groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lys",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"brytere",vacuum:"støvsugere",water_heater:"water heaters"},ft={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},days:"Dager",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Tidsplan"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"Ingen grupper definert",no_group_selected:"Velg en gruppe først",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_entity_selected:"Velg en entitet først",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},yt={services:vt,domains:gt,ui:ft},bt=Object.freeze({__proto__:null,services:vt,domains:gt,ui:ft,default:yt}),wt={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"ustaw tryb nieobecności"}},kt={alarm_control_panel:"panel kontrolny alarmu",climate:"klimatyzacja",cover:"rolety",fan:"wentylatory",group:"grupy",humidifier:"nawilżacze",input_boolean:"wejście logiczne",input_number:"wejście liczbowe",input_select:"wybór wejścia",light:"światła",lock:"zamki",media_player:"odtwarzacze",scene:"sceny",script:"skrypty",switch:"przełączniki",vacuum:"odkurzacze",water_heater:"podgrzewacze wody"},xt={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północ",at_noon:"o południe",at_sun_event:"o {sunEvent}"}},panel:{common:{title:"Harmonogram"},overview:{no_entries:"Nie ma elementów do pokazania",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},entity_picker:{no_groups_defined:"Nie ma zdefiniowanych grup",no_group_selected:"Najpierw wybierz grupę",no_entities_for_group:"Nie ma encji w tej grupie",no_entity_selected:"Najpierw wybierz encję",no_actions_for_entity:"Nie ma akcji dla tej encji",make_scheme:"stwórz schemat"},time_picker:{no_timeslot_selected:"Najpierw wybierz przedział czasowy"},conditions:{equal_to:"jest równe ",unequal_to:"nie jest równe",all:"wszystkie",any:"dowolny",no_conditions_defined:"Nie ma zdefiniowanych warunków"},options:{repeat_type:"zachowanie po wyzwoleniu"}}},$t={services:wt,domains:kt,ui:xt},St={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},zt={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},jt={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"É necessário selecionar um período horário para escolher uma ação"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},Et={services:St,domains:zt,ui:jt},Ot={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},Ct={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},Tt={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},At={services:Ot,domains:Ct,ui:Tt},Dt={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_away_mode:"setare mod plecat"}},Mt={alarm_control_panel:"panou control alarmă",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",light:"lumini",lock:"încuietori",media_player:"media playere",scene:"scene",script:"scripturi",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},Nt={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},panel:{common:{title:"Planificator"},overview:{no_entries:"Nu există elemente de afișat",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},entity_picker:{no_groups_defined:"Nu există grupuri definite",no_group_selected:"Prima dată selectați un grup",no_entities_for_group:"Nu există entități definite în acest grup",no_entity_selected:"Prima dată selectați o entitate",no_actions_for_entity:"Nu există acțiuni pentru această entitate",make_scheme:"creare schemă"},time_picker:{no_timeslot_selected:"Prima dată selectați un interval orar"},conditions:{equal_to:"este",unequal_to:"nu este",all:"tot",any:"oricare",no_conditions_defined:"Nu există condiții definite"},options:{repeat_type:"comportament după declanșare"}}},Pt={services:Dt,domains:Mt,ui:Nt},It={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_away_mode:"установить режим вне дома"}},Lt={alarm_control_panel:"панель управления сигнализацией",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",light:"освещение",lock:"замки",media_player:"медиа-плееры",scene:"сцены",script:"скрипты",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},qt={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},panel:{common:{title:"Планировщик"},overview:{no_entries:"Отсутствуют элементы",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},entity_picker:{no_groups_defined:"Не определены группы",no_group_selected:"Выберите группу",no_entities_for_group:"Отсутствуют элементы в группе",no_entity_selected:"Выберите элемент",no_actions_for_entity:"Нет действий для этого элемента",make_scheme:"создать схему"},time_picker:{no_timeslot_selected:"Выберите временной слот"},conditions:{equal_to:"равно",unequal_to:"не равно",all:"все",any:"любое",no_conditions_defined:"Не определены условия"},options:{repeat_type:"поведение после срабатывания"}}},Vt={services:It,domains:Lt,ui:qt};const Rt={cs:Oe,de:Me,en:qe,es:We,et:Ze,es_419:We,fr:et,hu:nt,it:dt,nb:bt,nl:_t,nn:bt,no:bt,pl:Object.freeze({__proto__:null,services:wt,domains:kt,ui:xt,default:$t}),pt:Object.freeze({__proto__:null,services:St,domains:zt,ui:jt,default:Et}),pt_BR:Object.freeze({__proto__:null,services:Ot,domains:Ct,ui:Tt,default:At}),ro:Object.freeze({__proto__:null,services:Dt,domains:Mt,ui:Nt,default:Pt}),ru:Object.freeze({__proto__:null,services:It,domains:Lt,ui:qt,default:Vt})};function Ut(e,t,i="",s=""){let a;try{if("test"==t)return"TRANSLATED";a=e.split(".").reduce((e,t)=>e[t],Rt[t]),a||(a=e.split(".").reduce((e,t)=>e[t],Rt.en))}catch(t){try{a=e.split(".").reduce((e,t)=>e[t],Rt.en)}catch(e){a=""}}if(""!==i&&""!==s&&a){Array.isArray(i)||(i=[i]),Array.isArray(s)||(s=[s]);for(let e=0;e<i.length;e++){a=a.replace(String(i[e]),String(s[e]));const t=a.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){a=String(s[e])==t[2]?a.replace(t[0],t[3]):a.replace(t[0],t[4])}}}return a}const Ht=ie`
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
  `,Wt=e=>{class i extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([K({attribute:!1})],i.prototype,"hass",void 0),i},Bt=new WeakMap,Yt=(e=>(...t)=>{const i=e(...t);return _.set(i,!0),i})(e=>t=>{if(!(t instanceof j))throw new Error("unsafeHTML can only be used in text bindings");const i=Bt.get(t);if(void 0!==i&&x(e)&&e===i.value&&t.value===i.fragment)return;const s=document.createElement("template");s.innerHTML=e;const a=document.importNode(s.content,!0);t.setValue(a),Bt.set(t,{value:e,fragment:a})});var Gt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,Ft="[^\\s]+",Zt=/\[([^]*?)\]/gm;function Jt(e,t){for(var i=[],s=0,a=e.length;s<a;s++)i.push(e[s].substr(0,t));return i}var Kt=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function Qt(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var n=a[s];for(var o in n)e[o]=n[o]}return e}var Xt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ei=["January","February","March","April","May","June","July","August","September","October","November","December"],ti=Jt(ei,3),ii={dayNamesShort:Jt(Xt,3),dayNames:Xt,monthNamesShort:ti,monthNames:ei,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},si=Qt({},ii),ai=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ni={D:function(e){return String(e.getDate())},DD:function(e){return ai(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ai(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ai(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ai(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ai(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ai(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ai(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ai(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ai(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ai(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ai(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ai(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ai(Math.floor(Math.abs(t)/60),2)+":"+ai(Math.abs(t)%60,2)}},oi=function(e){return+e-1},ri=[null,"[1-9]\\d?"],ci=[null,Ft],li=["isPm",Ft,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],di=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],ui=(Kt("monthNamesShort"),Kt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var hi=function(e,t,i){if(void 0===t&&(t=ui.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=ui[t]||t).replace(Zt,(function(e,t){return s.push(t),"@@@"}));var a=Qt(Qt({},si),i);return(t=t.replace(Gt,(function(t){return ni[t](e,a)}))).replace(/@@@/g,(function(){return s.shift()}))},pi=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(e){return hi(e,"mediumDate")},mi=function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(e){return hi(e,"haDateTime")},_i=function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(e){return hi(e,"shortTime")};function vi(e){return e.substr(0,e.indexOf("."))}function gi(e){return e.substr(e.indexOf(".")+1)}function fi(e,t,i){if("unknown"===t.state||"unavailable"===t.state)return e("state.default."+t.state);if(t.attributes.unit_of_measurement)return t.state+" "+t.attributes.unit_of_measurement;var s=function(e){return vi(e.entity_id)}(t);if("input_datetime"===s){var a;if(!t.attributes.has_time)return a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),pi(a,i);if(!t.attributes.has_date){var n=new Date;return a=new Date(n.getFullYear(),n.getMonth(),n.getDay(),t.attributes.hour,t.attributes.minute),_i(a,i)}return a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),mi(a,i)}return t.attributes.device_class&&e("component."+s+".state."+t.attributes.device_class+"."+t.state)||e("component."+s+".state._."+t.state)||t.state}var yi="hass:bookmark",bi=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a},wi={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function ki(e,t){if(e in wi)return wi[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),yi}}var xi={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},$i={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return ki("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in xi)return xi[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"hass:battery-unknown";var s=10*Math.round(i/10);return s>=100?"hass:battery":s<=0?"hass:battery-alert":"hass:battery-"+s}var a=e.attributes.unit_of_measurement;return"°C"===a||"°F"===a?"hass:thermometer":ki("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?ki("input_datetime"):"hass:calendar":"hass:clock"}},Si=function(e){if(!e)return yi;if(e.attributes.icon)return e.attributes.icon;var t=vi(e.entity_id);return t in $i?$i[t](e):ki(t,e.state)};const zi=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];const ji=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?(e,t,i)=>{if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}return e.toLocaleDateString(t,{weekday:i?"short":"long"})}:(e,t,i)=>function(e,t,i){if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}let s=e.getDay();return i?zi[s].substr(0,3):zi[s]}(e,0,i),Ei=[60,60,24,7],Oi=["second","minute","hour","day"];let Ci=class extends ae{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const s=i>=0?"past":"future";i=Math.abs(i);let a=Math.round(i);if(0===a)return this._hass.localize("ui.components.relative_time.just_now");if("future"==s){if(i/3600>=6){const i=t.setHours(0,0,0,0),s=Math.floor((e.valueOf()-i.valueOf())/864e5);let a="";1==s&&0==e.getHours()&&0==e.getMinutes()?a=Ut("ui.components.date.tomorrow",this._hass.language):s>0&&(a=ji(e,this._hass.language));let n=Ut("ui.components.time.absolute",this._hass.language,"{time}",_i(e,this._hass.language));return 12==e.getHours()&&0==e.getMinutes()?n=Ut("ui.components.time.at_noon",this._hass.language):0==e.getHours()&&0==e.getMinutes()&&(n=Ut("ui.components.time.at_midnight",this._hass.language)),String(a+" "+n).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.components.relative_time.duration.minute","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.hour","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.hour","count",1)} ${s} ${t}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.components.relative_time.duration.second","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.minute","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.minute","count",1)} ${s} ${t}`}}let n="week";for(let e=0;e<Ei.length;e++){if(a<Ei[e]){n=Oi[e];break}i/=Ei[e],a=Math.round(i)}if(this._hass.localize("ui.components.relative_time."+s)){const e=this._hass.localize("ui.components.relative_time.duration."+n,"count",a);return this._hass.localize("ui.components.relative_time."+s,"time",e)}return this._hass.localize(`ui.components.relative_time.${s}_duration.${n}`,"count",a)}render(){if(!this._hass||!this.datetime)return L``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),L`
      ${be(this.relativeTime(this.datetime))}
    `}};t([K()],Ci.prototype,"_hass",void 0),t([K()],Ci.prototype,"datetime",void 0),Ci=t([Z("my-relative-time")],Ci);function Ti(e){return{type:oe.Level,field:e.field,name:e.name||e.field,min:e.min||0,max:e.max||255,step:e.step||1,optional:e.optional||!1,unit:e.unit||""}}function Ai(e){const t=[];e.options.forEach(e=>t.push(Object.assign({},e)));return{type:oe.List,field:e.field,name:e.name||e.field,options:t.map(e=>e.name?e:Object.assign(e,{name:we(e.value)}))}}function Di(e,t){if("%"==t.unit){const i=t.min,s=t.max,a=t.step;let n=(e-t.min)/((t.max-t.min)/100);return n=Math.round(n/a)*a,n<i?n=i:n>s&&(n=s),`${n}${t.unit}`}return`${e}${t.unit}`}const Mi=(e,t)=>{const i=[{value:"none",name:e("state_attributes.climate.preset_mode.none"),icon:"hass:cancel"},{value:"eco",name:e("state_attributes.climate.preset_mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.climate.preset_mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.climate.preset_mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.climate.preset_mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.climate.preset_mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.climate.preset_mode.sleep"),icon:"hass:sleep"},{value:"activity",name:e("state_attributes.climate.preset_mode.activity"),icon:"hass:account-alert-outline"}];return t&&t.attributes.preset_modes&&Array.isArray(t.attributes.preset_modes)?t.attributes.preset_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i},Ni=(e,t,i)=>{const s=t?t.attributes.hvac_modes:[];let a=((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:e("state.climate.off")},{value:"heat",icon:"hass:fire",name:e("state.climate.heat")},{value:"cool",icon:"hass:snowflake",name:e("state.climate.cool")},{value:"heat_cool",icon:"hass:thermometer",name:e("state.climate.heat_cool")},{value:"auto",icon:"hass:autorenew",name:e("state_attributes.climate.auto")},{value:"dry",icon:"hass:water-percent",name:e("state.climate.dry")},{value:"fan_only",icon:"hass:fan",name:e("state.climate.fan_only")}];return t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i})(e.localize,t);const n=Ti({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:(null==t?void 0:t.attributes.target_temp_step)||e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),o=[{service:"climate.set_preset_mode",variable:Ai({field:"preset_mode",name:e.localize("ui.card.climate.preset_mode"),options:Mi(e.localize,t)}),icon:"hass:cloud-download-outline",name:Ut("services.climate.set_preset_mode",e.language),supported_feature:16}];return i&&!s.includes("off")||(o.push({service:"climate.set_hvac_mode",service_data:{hvac_mode:"off"},icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(a=a.filter(e=>"off"!=e.value))),i&&s.includes("off")||o.push({service:"climate.turn_off",icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(s.includes("cool")||s.includes("heat"))||o.push({service:"climate.set_temperature",variable:n,icon:"hass:thermometer",name:Ut("services.climate.set_temperature",e.language),supported_feature:1}),i&&!s.includes("heat")||(o.push({service:"climate.set_temperature",service_data:{hvac_mode:"heat"},variable:n,icon:"hass:fire",name:Ut("services.climate.set_temperature_hvac_mode_heat",e.language),supported_feature:1}),i&&(a=a.filter(e=>"heat"!=e.value))),i&&!s.includes("cool")||(o.push({service:"climate.set_temperature",service_data:{hvac_mode:"cool"},variable:n,icon:"hass:snowflake",name:Ut("services.climate.set_temperature_hvac_mode_cool",e.language),supported_feature:1}),i&&(a=a.filter(e=>"cool"!=e.value))),o.push({service:"climate.set_hvac_mode",variable:Ai({field:"hvac_mode",name:e.localize("ui.card.climate.operation"),options:a}),icon:"hass:cog-transfer-outline",name:Ut("services.climate.set_hvac_mode",e.language)}),o},Pi=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage";case"door":return"hass:door-closed";case"shutter":return"hass:window-shutter";case"blind":return"hass:blinds";case"window":return"hass:window-closed";default:return"hass:window-shutter"}},Ii=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage-open";case"door":return"hass:door-open";case"shutter":return"hass:window-shutter-open";case"blind":return"hass:blinds-open";case"window":return"hass:window-open";default:return"hass:window-shutter-open"}},Li=(e,t)=>{const i=[{value:"off",icon:"hass:fan-off",name:e("state.default.off").toLowerCase()},{value:"low",icon:"hass:fan-speed-1",name:e("ui.card.climate.low").toLowerCase()},{value:"medium",icon:"hass:fan-speed-2"},{value:"high",icon:"hass:fan-speed-3",name:e("ui.card.climate.high").toLowerCase()}];return t&&t.attributes.speed_list&&Array.isArray(t.attributes.speed_list)?t.attributes.speed_list.map(e=>i.find(t=>t.value==e)||{value:e}):i},qi=(e,t)=>{const i=[{value:"normal",name:e("state_attributes.humidifier.mode.normal"),icon:"hass:account-outline"},{value:"eco",name:e("state_attributes.humidifier.mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.humidifier.mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.humidifier.mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.humidifier.mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.humidifier.mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.humidifier.mode.sleep"),icon:"hass:account-sleep"},{value:"auto",name:e("state_attributes.humidifier.mode.auto"),icon:"hass:autorenew"},{value:"baby",name:e("state_attributes.humidifier.mode.baby"),icon:"hass:baby-bottle-outline"}];return t&&t.attributes.available_modes&&Array.isArray(t.attributes.available_modes)?t.attributes.available_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i},Vi=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?t.attributes.options.map(e=>({value:String(e)})):[],Ri=(e,t)=>t&&t.attributes.source_list&&Array.isArray(t.attributes.source_list)?Array(t.attributes.source_list).map(e=>({value:String(e)})):[],Ui=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?Array(t.attributes.options).map(e=>({value:String(e)})):[];function Hi(e){const t=e=>Object.entries(e).sort((e,t)=>e[0]>t[0]?1:-1).map(([e,i])=>[e,"object"==typeof i&&null!==i?t(i):i]).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{});let i={service:e.service};e.service_data&&Object.keys(e.service_data).length&&(i=Object.assign(Object.assign({},i),{service_data:e.service_data}),i=t(i));return Object.values(i).map(e=>JSON.stringify(e).replace(/[\W]/g," ").split(" ").filter(e=>" "!=e&&""!=e).join("_")).join("_")}function Wi(e,t){return Hi(e)==Hi(t)||!!e.variable&&Hi(e)==Hi(Object.assign(Object.assign({},t),{service_data:ge(t.service_data,[e.variable.field])}))}function Bi(e,t,i=!1){const s=vi(e),a=t.states[e];switch(s){case"alarm_control_panel":return((e,t)=>[{service:"alarm_control_panel.alarm_disarm",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.alarm_control_panel.disarm")},{service:"alarm_control_panel.alarm_arm_home",icon:"hass:home-outline",name:e.localize("ui.card.alarm_control_panel.arm_home"),supported_feature:1},{service:"alarm_control_panel.alarm_arm_away",icon:"hass:exit-run",name:e.localize("ui.card.alarm_control_panel.arm_away"),supported_feature:2},{service:"alarm_control_panel.alarm_arm_night",icon:"hass:power-sleep",name:e.localize("ui.card.alarm_control_panel.arm_night"),supported_feature:4},{service:"alarm_control_panel.alarm_arm_custom_bypass",icon:"hass:shield-lock-outline",name:e.localize("ui.card.alarm_control_panel.arm_custom_bypass"),supported_feature:16}])(t);case"climate":return Ni(t,a,i);case"cover":return((e,t)=>[{service:"cover.open_cover",icon:Ii(t),name:Ut("services.cover.open_cover",e.language)},{service:"cover.close_cover",icon:Pi(t),name:Ut("services.cover.close_cover",e.language)},{service:"cover.set_cover_position",variable:Ti({field:"position",name:e.localize("ui.card.cover.position",e.language),min:0,max:100,step:1,unit:"%"}),supported_feature:4,icon:"hass:ray-vertex",name:Ut("services.cover.set_cover_position",e.language)}])(t,a);case"fan":return((e,t)=>[{service:"fan.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"fan.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"fan.set_speed",variable:Ai({field:"speed",name:e.localize("ui.card.fan.speed"),options:Li(e.localize,t)}),supported_feature:1,icon:"hass:weather-windy",name:Ut("services.fan.set_speed",e.language)},{service:"fan.oscillate",variable:Ai({field:"oscillating",name:e.localize("ui.card.fan.oscillate"),options:[{value:"True",name:e.localize("state.default.on"),icon:"hass:flash"},{value:"False",name:e.localize("state.default.off"),icon:"hass:flash-off"}]}),supported_feature:2,icon:"hass:arrow-left-right",name:Ut("services.fan.oscillate",e.language)},{service:"fan.set_direction",variable:Ai({field:"direction",name:e.localize("ui.card.fan.direction"),options:[{value:"forward",name:e.localize("ui.card.fan.forward"),icon:"hass:autorenw"},{value:"reverse",name:e.localize("ui.card.fan.reverse"),icon:"hass:sync"}]}),supported_feature:4,icon:"hass:cog-clockwise",name:Ut("services.fan.set_direction",e.language)}])(t,a);case"group":const e=(a&&a.attributes.entity_id&&Array.isArray(a.attributes.entity_id)?a.attributes.entity_id:[]).map(e=>Bi(e,t));return o=e,((n=a)&&n.attributes.entity_id&&Array.isArray(n.attributes.entity_id)?n.attributes.entity_id:[]).map(e=>vi(e)).filter((e,t,i)=>i.indexOf(e)===t).length>1&&(o=o.map(e=>e.map(e=>"turn_on"==gi(e.service)||"turn_off"==gi(e.service)?Object.assign(Object.assign({},e),{service:"homeassistant."+gi(e.service),icon:"turn_on"==gi(e.service)?"flash":"flash-off"}):e))),o[0].filter(e=>o.every(t=>t.map(e=>Hi(e)).includes(Hi(e))));case"humidifer":return((e,t)=>[{service:"humidifier.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"humidifier.set_humidity",variable:Ti({field:"humidity",name:e.localize("ui.card.humidifier.humidity"),min:(null==t?void 0:t.attributes.min_humidity)||0,max:(null==t?void 0:t.attributes.max_humidity)||255,step:1,unit:"%"}),icon:"hass:water-percent",name:Ut("services.humidifer.set_humidity",e.language)},{service:"humidifier.set_mode",variable:Ai({field:"mode",name:e.localize("ui.card.humidifier.mode"),options:qi(e.localize,t)}),icon:"hass:cog-transfer-outline",name:Ut("services.climate.set_mode",e.language)}])(t,a);case"input_boolean":return((e,t)=>[{service:"input_boolean.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"input_boolean.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"input_number":return((e,t)=>[{service:"input_number.set_value",variable:Ti({field:"value",name:e.localize("ui.panel.config.helpers.types.input_number"),min:t&&t.attributes.min?Number(t.attributes.min):0,max:t&&t.attributes.max?Number(t.attributes.max):255,step:t&&t.attributes.step?Number(t.attributes.step):1,unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}),icon:"hass:counter",name:Ut("services.input_number.set_value",e.language)}])(t,a);case"input_select":return((e,t)=>[{service:"input_select.select_option",variable:Ai({field:"option",name:e.localize("ui.components.dialogs.input_select.options"),options:Vi(e.localize,t)}),icon:"counter",name:Ut("services.input_select.select_option",e.language)}])(t,a);case"light":return((e,t)=>{const i=[{service:"light.turn_off",icon:"hass:lightbulb-off",name:e.localize("ui.card.media_player.turn_off")}];return!t||void 0===t.attributes.supported_features||1&t.attributes.supported_features?i.push({service:"light.turn_on",variable:Ti({field:"brightness",name:e.localize("ui.card.light.brightness"),min:0,max:255,step:1,unit:"%",optional:!0}),icon:"hass:lightbulb-on",name:Ut("services.light.turn_on",e.language),supported_feature:1}):i.push({service:"light.turn_on",icon:"hass:lightbulb-on",name:e.localize("ui.card.media_player.turn_on")}),i})(t,a);case"lock":return((e,t)=>[{service:"lock.unlock",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.lock.unlock")},{service:"lock.lock",icon:"hass:lock-outline",name:e.localize("ui.card.lock.lock")}])(t);case"media_player":return((e,t)=>[{service:"media_player.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:128},{service:"media_player.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off"),supported_feature:256},{service:"media_player.select_source",variable:Ai({field:"source",name:e.localize("ui.card.media_player.source"),options:Ri(e.localize,t)}),icon:"hass:music-box-multiple-outline",name:Ut("services.media_player.select_source",e.language),supported_feature:2048}])(t,a);case"scene":return((e,t)=>[{service:"scene.turn_on",icon:"hass:play",name:e.localize("ui.card.media_player.turn_on")}])(t);case"script":return((e,t)=>{const i=[{service:"script.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"script.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}];return t&&i.push({service:"script."+gi(t.entity_id),icon:"hass:play",name:Ut("services.script.script",e.language)}),i})(t,a);case"switch":return((e,t)=>[{service:"switch.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"switch.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"vacuum":return((e,t)=>[{service:"vacuum.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:1},{service:"vacuum.start",icon:"hass:play-circle-outline",name:e.localize("ui.card.vacuum.start_cleaning"),supported_feature:8192},{service:"vacuum.start_pause",icon:"hass:play-circle-outline",name:Ut("services.vacuum.start_pause",e.language),supported_feature:4}])(t);case"water_heater":return((e,t)=>[{service:"water_heater.set_temperature",variable:Ti({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:(null==t?void 0:t.attributes.target_temp_step)||e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:thermometer",name:Ut("services.climate.set_temperature",e.language),supported_feature:1},{service:"water_heater.set_operation_mode",variable:Ai({field:"operation_mode",name:e.localize("ui.card.water_heater.operation"),options:Ui(e.localize,t)}),icon:"hass:cog-transfer-outline",name:Ut("services.climate.set_mode",e.language),supported_feature:2},{service:"water_heater.set_away_mode",variable:Ai({field:"mode",name:e.localize("ui.card.water_heater.away_mode"),options:[{value:"on",name:e.localize("ui.card.input_boolean.on"),icon:"hass:toggle-switch-outline"},{value:"off",name:e.localize("ui.card.input_boolean.off"),icon:"hass:toggle-switch-off-outline"}]}),icon:"hass:car-traction-control",name:Ut("services.water_heater.set_away_mode",e.language),supported_feature:4}])(t,a);default:return[]}var n,o}function Yi(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=e.includes(".")?e==t:e==vi(t);else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}function Gi(e,t){let i=!1;return(t.include&&t.include.find(t=>Yi(t,e))||t.customize&&Object.keys(t.customize).find(t=>Yi(t,e)))&&(i=!0),t.exclude&&t.exclude.find(t=>Yi(t,e))&&(i=!1),i}function Fi(e,t){return!!(Gi(e,t)||t.groups&&t.groups.some(t=>Gi(e,t)))}function Zi(e,t,i){const s=t.states[e];let a=[];if((void 0===i.standard_configuration||i.standard_configuration)&&(a=Bi(e,t,!0)),i.customize){const t=Object.entries(i.customize).filter(([t])=>Yi(t,e)).sort((e,t)=>t[0].length-e[0].length);t.filter(([,e])=>e.exclude_actions&&e.exclude_actions.length).map(([,e])=>e.exclude_actions).reduce((e,t)=>e.concat(t),[]).forEach(e=>{"all"==e&&(a=[]),a=a.filter(t=>!t.name||!t.name.replace(/_/g," ").trim().toLowerCase().includes(e.replace(/_/g," ").trim().toLowerCase()))}),t.filter(([,e])=>e.actions&&e.actions.length).map(([,e])=>e.actions).reduce((e,t)=>e.concat(t),[]).forEach(t=>{vi(t.service).length||(t=Object.assign(Object.assign({},t),{service:vi(e)+"."+gi(t.service)})),t.service_data&&(t=Object.assign(Object.assign({},t),{service_data:ge(t.service_data,["entity_id"])}));let i=a.findIndex(e=>Wi(e,t));if(i>=0&&t.service_data&&Hi(t)!=Hi(a[i])&&(i=-1),i>=0){let e=Object.assign(Object.assign({},a[i]),ge(t,["variable"]));t.variable&&(e=Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable||{}),t.variable)})),a=Object.values(Object.assign(Object.assign({},a),{[i]:e}))}else a.push(t)})}if(s&&s.attributes&&s.attributes.supported_features){const e=s.attributes.supported_features;a=a.filter(t=>!t.supported_feature||t.supported_feature&e)}return a=a.map(e=>{if(e.variable&&e.variable.type==oe.List){const t=e.variable;if(!t.options.length)return null;if(1==t.options.length){const i=t.options[0],s=Object.assign(Object.assign({},e.service_data||{}),{[t.field]:i.value});return Object.assign(Object.assign({},e),{icon:i.icon||e.icon,service_data:s})}}return e}).filter(e=>e),a}function Ji(e){let t={id:Hi(e),service:e.service,service_data:{}};return t=Object.assign(Object.assign({},t),ge(e,["variable"])),t.name||(t=Object.assign(Object.assign({},t),{name:gi(e.service)})),t.icon||(t=Object.assign(Object.assign({},t),{icon:"flash"})),e.variable&&(t="options"in e.variable?Object.assign(Object.assign({},t),{variable:Ai(e.variable)}):Object.assign(Object.assign({},t),{variable:Ti(e.variable)})),t}function Ki(e,t,i){if(Array.isArray(e)){const s=e.map(e=>Ki(e,t,i));return s[0].filter(e=>s.every(t=>t.map(e=>e.id).includes(e.id))).map(e=>{if(e.variable){if(s.every(t=>t.find(t=>t.id==e.id).variable)){if(e.variable.type==oe.Level)return Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable),{min:Math.max(...s.map(t=>t.find(t=>t.id==e.id).variable.min)),max:Math.min(...s.map(t=>t.find(t=>t.id==e.id).variable.max)),step:Math.max(...s.map(t=>t.find(t=>t.id==e.id).variable.step))})});{let t=e.variable.options;return s.forEach(i=>{let s=i.find(t=>t.id==e.id).variable;t=t.filter(e=>s.options.map(e=>e.value).includes(e.value))}),Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable),{options:t})})}}return ge(e,["variable"])}return e})}return Zi(e,t,i).map(Ji)}function Qi(e,t,i){const s=e.entity_id,a=e.service,n=e.service_data||{},o=Zi(s,t,i),r=Hi({service:a,service_data:n});let c=o.find(e=>Hi(e)==r);if(c||(c=o.find(t=>t.variable&&Hi(t)==Hi(Object.assign(Object.assign({},e),{service_data:ge(e.service_data,[t.variable.field])}))),c&&(c=Object.assign(Object.assign({},c),{service_data:Object.assign(Object.assign({},c.service_data||{}),n)}))),!c){if(c=Bi(s,t).find(t=>Wi(t,e)),c&&c.variable&&e.service_data&&c.variable.field in e.service_data&&c.variable.type==oe.List){let t=c.variable;const i=e.service_data[t.field];t=Object.assign(Object.assign({},t),{options:[t.options.find(e=>e.value==i)||{value:i}]}),c=Object.assign(Object.assign({},c),{variable:Object.assign({},t),service_data:Object.assign(Object.assign({},c.service_data),{[t.field]:i})})}}if(c)return Ji(c);return Ji({service:e.service,service_data:e.service_data})}const Xi={alarm_control_panel:"hass:alarm-light-outline",automation:"hass:playlist-play",binary_sensor:"hass:radiobox-blank",camera:"hass:camera",climate:"hass:home-thermometer-outline",cover:"hass:window-shutter",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",humidifier:"hass:air-humidifier",input_boolean:"hass:drawing",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb-outline",lock:"hass:lock-open-outline",media_player:"hass:cast-connected",notify:"hass:comment-alert",person:"hass:account-outline",remote:"hass:remote",scene:"hass:palette-outline",script:"hass:file-document",sensor:"hass:eye",switch:"hass:flash",timer:"hass:timer",vacuum:"hass:robot-vacuum",water_heater:"hass:water-boiler"};function es(e,t){const i=vi(e),s=t.states[e];switch(i){case"binary_sensor":return(e=>e&&Si(Object.assign(Object.assign({},e),{state:"off"}))||"hass:radiobox-blank")(s);case"cover":return Pi(s);case"sensor":return(e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"humidity":return"hass:water-percent";case"illuminance":return"hass:brightness-5";case"temperature":return"hass:thermometer";case"power":return"hass:flash";case"pressure":return"hass:gauge";case"signal_strength":return"hass:wifi";default:return"°C"==e.attributes.unit_of_measurement||"°F"==e.attributes.unit_of_measurement?"hass:thermometer":"hass:eye"}})(s);default:return i in Xi?Xi[i]:"hass:folder-outline"}}function ts(e,t,i){const s=e in t.states?t.states[e]:void 0;let a={id:e,name:s?s.attributes.friendly_name||gi(e):"(unknown entity)",icon:s?s.attributes.icon:"help-circle-outline"};if(void 0!==i.standard_configuration&&!i.standard_configuration||a.icon?a.icon||(a=Object.assign(Object.assign({},a),{icon:"folder-outline"})):a=Object.assign(Object.assign({},a),{icon:es(e,t)}),i.customize){Object.entries(i.customize).filter(([e])=>Yi(e,a.id)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e).forEach(e=>{a=Object.assign(Object.assign({},a),ve(e,["name","icon"]))})}return a}const is=/\{([^\}]+)\}/,ss=/\[([^\]]+)\]/;function as(e){let t=e.name;t||(t=gi(e.service));const i=t.match(ss);if(i){let s="";const a=i[1].match(is);if(a&&e.service_data&&a[1]in e.service_data){let n="";return n=e.variable&&e.variable.field==a[1]&&e.variable.type==oe.Level?Di(e.service_data[e.variable.field],e.variable):e.service_data[a[1]],s=i[1].replace(a[0],n),t.replace(i[0],s)}return t.replace(i[0],"")}return t||""}function ns(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}function os(e){const t=e.getHours(),i=e.getMinutes();return String(t).padStart(2,"0")+":"+String(i).padStart(2,"0")}const rs=ns()?(e,t)=>e.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"}):e=>os(e);function cs(e){return e.includes("daily")?de.Daily:e.includes("workday")?de.Workday:e.includes("weekend")?de.Weekend:de.Custom}function ls(e){const t=e.split(":").map(Number),i=new Date;return new Date(i.getFullYear(),i.getMonth(),i.getDate(),...t)}let ds=class extends ae{render(){const e=this.schedule.timeslots[this.schedule.next_entries[0]],t=ye(e.actions.map(e=>e.entity_id)).map(e=>ts(e,this.hass,this.config)),i=1==ye(t.map(e=>e.icon)).length?t[0].icon:es(t[0].id,this.hass),s=ye(t.map(e=>vi(e.id))),a=1==t.length?t[0].name:1==s.length?`${t.length}x ${Ut("domains."+s[0],this.hass.language)||s[0]}`:t.length+"x entities",n=Qi(e.actions[0],this.hass,this.config),o=(ts(e.actions[0].entity_id,this.hass,this.config),this.config.display_options&&this.config.display_options.icon&&"entity"==this.config.display_options.icon?i:n.icon),r=e=>{switch(e){case"name":return this.schedule.name||"";case"relative-time":return"<my-relative-time></my-relative-time>";case"additional-tasks":return this.schedule.timeslots.length>1?"+"+Ut("ui.panel.overview.additional_tasks",this.hass.language,"{number}",String(this.schedule.timeslots.length-1)):"";case"time":return be(this.computeTime(this.schedule.timeslots[this.schedule.next_entries[0]]));case"days":return be(this.computeDays(this.schedule.weekdays));case"entity":return a.length?be(we(a)):"";case"action":return be(as(n));default:const t=/\{([^\}]+)\}/;let i;for(;i=t.exec(e);)e=e.replace(i[0],String(r(String(i[1]))));return e}},c=e=>{const t=e=>{const t=e.split("<my-relative-time></my-relative-time>");return 1==t.length?Yt(e):L`
          ${t[0]?Yt(t[0]):""}
          <my-relative-time .hass=${this.hass} .datetime=${new Date(this.schedule.timestamps[this.schedule.next_entries[0]])}> </my-relative-time>
          ${t[1]?Yt(t[1]):""}
        `};return"string"==typeof e?t(r(e)):e.map(e=>{const i=r(e);return i?L`
                  ${t(i)}<br />
                `:""})};return L`
      <ha-icon icon="${ke(o)}"></ha-icon>
      <div class="info">
        ${this.config.display_options&&this.config.display_options.primary_info?c(this.config.display_options.primary_info):c("{entity}: {action}")}
        <div class="secondary">
          ${this.config.display_options&&this.config.display_options.secondary_info?c(this.config.display_options.secondary_info):c(["relative-time","additional-tasks"])}
        </div>
      </div>
      <ha-switch ?checked=${this.schedule.enabled} @click=${this.toggleDisabled}>
      </ha-switch>
    `}computeDays(e){if(!this.hass)return"";switch(cs(e)){case de.Daily:return Ut("ui.components.date.day_types_long.daily",this.hass.language);case de.Workday:return Ut("ui.components.date.day_types_long.workdays",this.hass.language);case de.Weekend:return Ut("ui.components.date.day_types_long.weekend",this.hass.language);case de.Custom:const t=e.map(e=>{switch(e){case"mon":return 1;case"tue":return 2;case"wed":return 3;case"thu":return 4;case"fri":return 5;case"sat":return 6;case"sun":return 7;default:return}}).filter(e=>e),i=function(e){const t=[];for(let i=0;i<e.length-1;i++){let s=i+1;for(;e[s]-e[s-1]==1;)s++;t.push(s-i)}return t}(t),s=Math.max(...i);if(6==t.length){const e=[1,2,3,4,5,6,7].filter(e=>!t.includes(e));return Ut("ui.components.date.repeated_days_except",this.hass.language,"{excludedDays}",ji(e.pop(),this.hass.language))}const a=t.map(e=>ji(e,this.hass.language));if(t.length>=3&&s>=3){const e=i.reduce((e,t,i)=>t==s?i:e,0);a.splice(e,s,Ut("ui.components.date.days_range",this.hass.language,["{startDay}","{endDay}"],[a[e],a[e+s-1]]))}const n=a.length>1?`${a.slice(0,-1).join(", ")} ${this.hass.localize("ui.common.and")} ${a.pop()}`:""+a.pop();return Ut("ui.components.date.repeated_days",this.hass.language,"{days}",n);default:return""}}computeTime(e){if(e.stop){const t=rs(ls(e.start),this.hass.language),i=rs(ls(e.stop),this.hass.language);return Ut("ui.components.time.interval",this.hass.language,["{startTime}","{endTime}"],[t,i])}{const t=e.start,i=_e(t);if(i){const e=i.event==le.Sunrise?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset").toLowerCase();if(Math.abs(he(i.offset))<300)return Ut("ui.time.at_sun_event","{sunEvent}",e);const t="-"==i.sign?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1).toLowerCase():this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1).toLowerCase();return`${os(ls(i.offset))} ${t} ${e}`}{const e=ls(t);return Ut("ui.components.time.absolute",this.hass.language,"{time}",rs(e,this.hass.language))}}}toggleDisabled(e){if(!this.hass||!this.schedule)return;e.stopPropagation();const t=!e.target.checked;this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:this.schedule.entity_id})}};ds.styles=ie`
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
    }
    ha-switch {
      padding: 13px 5px;
    }
  `,t([K()],ds.prototype,"hass",void 0),t([K()],ds.prototype,"schedule",void 0),t([K()],ds.prototype,"config",void 0),ds=t([Z("scheduler-entity-row")],ds);const us=e=>e.callWS({type:"scheduler"});function hs(e,t){let i=L`
    <b>Something went wrong!</b><br>
    ${e.body.message}<br><br>
    ${e.error}<br><br>
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;bi(t,"show-dialog",{dialogTag:"dialog-error",dialogImport:()=>Promise.resolve().then((function(){return Es})),dialogParams:{error:i}})}let ps=class extends(Wt(ae)){constructor(){super(...arguments),this.showDiscovered=!1,this.connectionError=!1}hassSubscribe(){return this.loadSchedules(),[this.hass.connection.subscribeEvents(()=>this.loadSchedules(),"scheduler_updated")]}async loadSchedules(){us(this.hass).then(e=>{let t=e;void 0===this.config.discover_existing||this.config.discover_existing||(t=t.filter(e=>e.timeslots.every(e=>e.actions.every(e=>Fi(e.entity_id,this.config))))),t.sort((e,t)=>{const i=new Date(e.timestamps[e.next_entries[0]]).valueOf(),s=new Date(t.timestamps[t.next_entries[0]]).valueOf();return null!==i&&null!==s?i>s?1:i<s?-1:e.entity_id<t.entity_id?1:-1:null!==s?1:null!==i?-1:e.entity_id<t.entity_id?1:-1}),this.schedules=t}).catch(e=>{this.schedules=[],this.connectionError=!0})}render(){return this.hass&&this.config&&this.schedules?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Ut("ui.panel.common.title",this.hass.language)}
          </div>
          ${this.schedules.length&&this.config.show_header_toggle?L`
                <ha-switch
                  ?checked=${this.schedules.some(e=>e.enabled)}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `:""}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        <div class="card-actions">
          <mwc-button
            @click=${this.newItemClick}
            ?disabled=${this.connectionError}
          >${this.hass.localize("ui.components.area-picker.add_dialog.add")}
          </mwc-button>
        </div>
      </ha-card>
    `:L``}getRows(){if(!this.config||!this.hass||!this.schedules)return L``;if(this.connectionError)return L`
        <div>
          <hui-warning>
           ${Ut("ui.panel.overview.backend_error",this.hass.language)}
          </hui-warning>
        </div>
      `;if(!Object.keys(this.schedules).length)return L`
        <div>
          ${Ut("ui.panel.overview.no_entries",this.hass.language)}
        </div>
      `;let e=[],t=[];return this.schedules.forEach(i=>{i.timeslots.every(e=>e.actions.every(e=>Fi(e.entity_id,this.config)))?e.push(i):t.push(i)}),L`
      ${e.map(e=>L`
          <scheduler-entity-row
            class="${e.enabled?"":"disabled"}"
            .hass=${this.hass}
            .schedule=${e}
            .config=${this.config}
            @click=${()=>this.editItemClick(e.schedule_id)}
          >
          </scheduler-entity-row>
        `)}
      ${Object.keys(t).length?this.showDiscovered?L`
              ${t.map(e=>L`
                  <scheduler-entity-row
                    class="${e.enabled?"":"disabled"}"
                    .hass=${this.hass}
                    .schedule=${e}
                    .config=${this.config}
                    @click=${()=>this.editItemClick(e.schedule_id)}
                  >
                  </scheduler-entity-row>
                `)}
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${be(Ut("ui.panel.overview.hide_excluded",this.hass.language))}
                </button>
              </div>
            `:L`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${Ut("ui.panel.overview.excluded_items",this.hass.language,"{number}",t.length)}
                </button>
              </div>
            `:""}
    `}toggleDisableAll(e){if(!this.hass||!this.schedules)return;const t=e.target.checked;this.schedules.forEach(e=>{this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}editItemClick(e){const t=new CustomEvent("editClick",{detail:e});this.dispatchEvent(t)}newItemClick(){const e=new CustomEvent("newClick");this.dispatchEvent(e)}};function ms(e,t,i){const s=[];t.groups&&t.groups.forEach(t=>{const i={id:t.name,name:t.name,icon:t.icon||"folder-outline",entities:e.filter(e=>Gi(e,t))};s.push(i)});const a=e.filter(e=>!s.some(t=>t.entities.includes(e)));return a.map(vi).filter((e,t,i)=>i.indexOf(e)===t).forEach(e=>{const n={id:e,name:Ut("domains."+e,i.language)||e,icon:(void 0===t.standard_configuration||t.standard_configuration)&&e in Xi?Xi[e]:"folder-outline",entities:a.filter(t=>Gi(t,{include:[e]}))};s.push(n)}),s}ps.styles=ie`
    ${Ht}
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
  `,t([K()],ps.prototype,"hass",void 0),t([K()],ps.prototype,"config",void 0),t([K()],ps.prototype,"showDiscovered",void 0),t([K()],ps.prototype,"schedules",void 0),ps=t([Z("scheduler-entities-card")],ps);let _s=class extends ae{constructor(){super(...arguments),this.items=[]}render(){return this.items.length?this.items.map(e=>this.createButton(e)):L`
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
    `}selectItem(e){if(Array.isArray(this.value))if(this.multiple){let t=Array.isArray(this.value)?[...this.value]:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else this.value=this.value.includes(e)?[]:Array(e);else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;const t=new CustomEvent("change");this.dispatchEvent(t)}};_s.styles=Ht,t([K({type:Array})],_s.prototype,"items",void 0),t([K()],_s.prototype,"value",void 0),t([K({type:Number})],_s.prototype,"min",void 0),t([K({type:Boolean})],_s.prototype,"optional",void 0),t([K({type:Boolean})],_s.prototype,"multiple",void 0),_s=t([Z("button-group")],_s);let vs=class extends ae{constructor(){super(...arguments),this.selectedEntities=[],this.multipleEntity=!1,this.scheduleEntities=[]}async firstUpdated(){if(this.entities&&this.entities.length){const e=this.getGroups().find(e=>e.entities.find(e=>e==this.entities[0].id));if(!e)return;this.selectedGroup=e.id,this.selectedEntities=[...this.entities.map(e=>e.id)],this.multipleEntity=this.selectedEntities.length>1}if(this.schedule)if(this.schedule.timeslots.every(e=>e.stop))this.selectedAction="make_scheme";else{const e=ye(fe(this.schedule.timeslots.map(e=>e.actions.map(e=>Hi(e)))));1==e.length&&(this.selectedAction=e[0])}this.scheduleEntities=(await us(this.hass)).map(e=>e.entity_id)}getGroups(){if(!this.hass||!this.config)return[];const e=ms(Object.keys(this.hass.states).filter(e=>Fi(e,this.config)).filter(e=>"switch"!=vi(e)||!this.scheduleEntities.includes(e)).filter(e=>Ki(e,this.hass,this.config).length),this.config,this.hass);return e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),e}getEntitiesForGroup(e){if(!this.selectedGroup||!this.hass||!this.config)return[];const t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>ts(e,this.hass,this.config));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}getActionsForEntity(e){if(!this.hass||!this.config||!this.selectedEntities.length)return[];const t=Ki(this.selectedEntities,this.hass,this.config).map(e=>Object.assign(e,{name:as(e)}));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}render(){if(!this.hass||!this.config)return L``;const e=this.getGroups();1==e.length&&this.selectedGroup!==e[0].id&&this.selectGroup(e[0].id);const t=this.getEntitiesForGroup(e);1==t.length&&this.selectedEntities[0]!==t[0].id&&this.selectEntity(t[0].id);const i=this.getActionsForEntity(t);return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Ut("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
          <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${Ut("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
          </button-group>

          <div class="header">
            ${this.hass.localize("ui.components.entity.entity-picker.entity")}
            ${t.length>1?L`
                <div class="switch">
                  <ha-switch
                    ?checked=${this.multipleEntity}
                    @change=${e=>{this.multipleEntity=e.target.checked}}
                  >
                  </ha-switch>
                  ${Ut("ui.panel.entity_picker.multiple",this.hass.language)}          
                </div>
              `:""}
          </div>
          <button-group
            .items=${t}
            .value=${this.selectedEntities}
            @change=${this.selectEntity}
            ?multiple=${this.multipleEntity}
            ?optional=${!0}
          >
            ${this.selectedGroup?Ut("ui.panel.entity_picker.no_entities_for_group",this.hass.language):Ut("ui.panel.entity_picker.no_group_selected",this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
          <button-group .items=${i} value=${this.selectedAction} @change=${this.selectAction}>
            ${this.selectedEntities.length?Ut("ui.panel.entity_picker.no_actions_for_entity",this.hass.language):Ut("ui.panel.entity_picker.no_entity_selected",this.hass.language)}
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
          ${Ut("ui.panel.entity_picker.make_scheme",this.hass.language)}
        </mwc-button>
      </div>
    </div>
    `:L``}selectGroup(e){const t="string"==typeof e?e:e.target.value;this.selectedGroup=t,this.selectedEntities=[],this.selectedAction=void 0}selectEntity(e){const t="string"==typeof e?Array(e):e.target.value;this.selectedEntities=t,this.selectedAction=void 0}selectAction(e){const t="string"==typeof e?e:e.target.value;this.selectedAction=t}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}nextClick(){const e=new CustomEvent("nextClick",{detail:{entities:this.selectedEntities,action:this.selectedAction}});this.dispatchEvent(e)}};vs.styles=Ht,t([K()],vs.prototype,"hass",void 0),t([K()],vs.prototype,"config",void 0),t([K()],vs.prototype,"selectedGroup",void 0),t([K()],vs.prototype,"selectedEntities",void 0),t([K()],vs.prototype,"selectedAction",void 0),t([K()],vs.prototype,"entities",void 0),t([K()],vs.prototype,"schedule",void 0),t([K()],vs.prototype,"multipleEntity",void 0),vs=t([Z("scheduler-editor-card")],vs);let gs=class extends ae{constructor(){super(...arguments),this.stepSize=10,this.relativeMode=!1,this.event=le.Sunrise,this._time=0,this.maxOffset=2}get time(){return this._time>=0?this._time:Math.abs(this._time)}set time(e){this._time=me(e,this.stepSize,{wrapAround:!this.relativeMode,maxHours:this.relativeMode?this.maxOffset:void 0})}firstUpdated(){const e=_e(this.value);e?(this.relativeMode=!0,this.event=e.event==le.Sunrise?le.Sunrise:le.Sunset,this.time="+"==e.sign?he(e.offset):-he(e.offset)):this.time=he(this.value)}updated(){if(this.relativeMode){const e=this._time>=0?"+":"-",t=pe(this.time);this.value=`${this.event}${e}${t}`}else this.value=pe(this.time);const e=new CustomEvent("change");this.dispatchEvent(e)}render(){const e=(this.relativeMode?pe(this.time):_i(ls(pe(this.time)),this.hass.language)).split(/:|\ /);return L`
      <div class="time-picker">
        <div class="hours-up">
          <mwc-button @click=${()=>this.time=this._time+3600}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="hours">${e[0].padStart(2,"0")}</div>
        <div class="hours-down">
          <mwc-button @click=${()=>this.time=this._time-3600}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="separator">:</div>
        <div class="minutes-up">
          <mwc-button @click=${()=>this.time=this._time+60*this.stepSize}>
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="minutes">${e[1]}</div>
        <div class="minutes-down">
          <mwc-button @click=${()=>this.time=this._time-60*this.stepSize}>
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        ${this.relativeMode?L`
        <div class="suffix">
          <mwc-button @click=${this.toggleBeforeAfter}>
            ${this.getBeforeAfter()}
          </mwc-button>
          <mwc-button @click=${this.toggleSunriseSunset}>
            <ha-icon icon="hass:${this.event==le.Sunrise?"weather-sunny":"weather-night"}"></ha-icon>
          </mwc-button>
        </div>
          `:e.length>2?L`
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
    `}getSunModeToggle(){return this.hass&&this.hass.states["sun.sun"]?L`
      <mwc-button @click="${this.toggleMode}" class="${this.relativeMode?"active":""}">
        <ha-icon icon="hass:theme-light-dark"></ha-icon>
      </mwc-button>
    `:L``}getBeforeAfter(){return this.hass?this._time<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1):this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1):""}toggleAmPm(){this.time=this._time+43200}toggleBeforeAfter(){this.time=-this._time}toggleSunriseSunset(){this.event=this.event==le.Sunrise?le.Sunset:le.Sunrise}toggleMode(){if(!this.hass)return;this.relativeMode=!this.relativeMode;const e=this.hass.states["sun.sun"],t=he(e.attributes.next_rising),i=he(e.attributes.next_setting);if(this.relativeMode){this.event=Math.abs(this._time-t)<Math.abs(this._time-i)?le.Sunrise:le.Sunset;let e=this.event==le.Sunrise?this._time-t:this._time-i;e>7200?e=7200:e<-7200&&(e=-7200),this.time=e}else this.time=this.event==le.Sunrise?this._time+t:this._time+i}};gs.styles=ie`
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
  `,t([K()],gs.prototype,"hass",void 0),t([K({type:Number})],gs.prototype,"stepSize",void 0),t([K()],gs.prototype,"relativeMode",void 0),t([K()],gs.prototype,"event",void 0),t([K()],gs.prototype,"_time",void 0),gs=t([Z("time-picker")],gs);function fs(e){const t=he(e.start);let i=he(e.stop);return i<t&&(i+=86400),i-t}let ys=class extends ae{constructor(){super(...arguments),this.entries=[],this.actions=[],this.stepSize=10,this._activeEntry=null,this._activeThumb=null,this.formatAmPm=!1,this._currentTime=null,this._activeEntryMem=null}firstUpdated(){var e;this.formatAmPm=(e=this.hass.language,!!ns()&&(new Date).toLocaleTimeString(e).includes("M"))}render(){return this.hass?L`
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
        <mwc-button @click=${this._addSlot} ?disabled=${null===this._activeEntry||this.entries.length>=24}>
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
          class="slider-slot${this._activeEntry==i?" active":""}${t.actions?" filled":""}"
          @click=${e=>{this._handleSegmentClick(e,i)}}
          style="width: ${fs(t)/86400*100}%"
        >
          <span class="content">${this.getEntryAction(t)}</div>
        </div>
      `),i<this.entries.length-1){he(this.entries[i].stop);e.push(L`
          <div
            class="slider-thumb${this._activeThumb==i?" active":""} ${this._activeEntry==i||this._activeEntry==i+1?"":"hidden"}"
            
          >
            <div
              class="slider-thumb-ripple"
                @mousedown="${e=>{this._handleTouchStart(e,i)}}"
                @touchstart="${e=>{this._handleTouchStart(e,i)}}"
            >
              <ha-icon
                icon="hass:unfold-more-vertical"
              >
              </ha-icon>
            </div>
            <div
              class="slider-thumb-tooltip ${this.formatAmPm?"wide":""} ${this._activeEntryMem==i&&0!=this._activeEntryMem?"right":this._activeEntryMem==i+1&&this._activeEntryMem+1!=this.entries.length?"left":"center"}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${rs(ls(this.entries[i].stop),this.hass.language)}
            </div>
          </div>
        `)}}),e}updated(){this.shadowRoot.querySelectorAll(".slider-thumb-tooltip").forEach((e,t)=>{e.innerText=rs(ls(this.entries[t].stop),this.hass.language)})}getEntryAction(e){if(this.hass)return e.actions?ye(e.actions.map(e=>{const t=this.actions.find(t=>Wi(t,e));if(t.variable&&t.variable.field in e.service_data){const i=e.service_data[t.variable.field];if(t.variable.type==oe.Level){const e=t.variable;if(!isNaN(i))return Di(Number(i),e)}else if(t.variable.type==oe.List){const e=t.variable.options.find(e=>e.value==i);return we(e&&e.name?e.name:String(i))}}return we(t.name||Ut("services."+e.service,this.hass.language)||e.service)})).join(", "):""}_handleSegmentClick(e,t){e.target;this._activeEntry=this._activeEntry==t?null:t,this._activeEntryMem=t;const i=new CustomEvent("update",{detail:{entry:this._activeEntry}});this.dispatchEvent(i)}_handleTouchStart(e,t){let i=e.target;if(!i)return;"HA-ICON"==i.nodeName&&(i=i.parentElement);const s=i.parentNode,a=s.parentElement,n=a.getBoundingClientRect(),o=s.previousElementSibling,r=s.nextElementSibling,c=s.querySelector(".slider-thumb-tooltip");this._activeThumb=t;const l=o.offsetWidth+r.offsetWidth,d=n.width,u=Array.from(a.querySelectorAll(".slider-slot")),h=u.map(e=>e.offsetWidth);let p=0,m=-1;u.forEach((e,t)=>{e==o?m=t:-1==m&&(p+=h[t])});let _=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let i=t-n.left;i<0?i=0:i>n.width&&(i=n.width),i>l+p&&(i=l+p),i<p&&(i=p),o.style.width=Math.round(i-p)+"px",r.style.width=Math.round(l-(i-p))+"px";let s=i/d*86400;s=Math.round(s)>=86400?86400:me(s,this.stepSize),this._currentTime=s,c.dispatchEvent(new CustomEvent("update"))};const v=()=>{if(window.removeEventListener("mousemove",_),window.removeEventListener("touchmove",_),window.removeEventListener("mouseup",v),window.removeEventListener("touchend",v),_=()=>{},null!==this._currentTime){const e=this._currentTime,t=fs(this.entries[m])+fs(this.entries[m+1]),i=he(this.entries[m].start),s=Object.assign(this.entries,{[m]:Object.assign(Object.assign({},this.entries[m]),{stop:pe(e)}),[m+1]:Object.assign(Object.assign({},this.entries[m+1]),{start:pe(e),stop:pe(i+t)})}),a=new CustomEvent("update",{detail:{entries:s}});this.dispatchEvent(a)}this._currentTime=null,this._activeThumb=null};window.addEventListener("mouseup",v),window.addEventListener("touchend",v),window.addEventListener("blur",v),window.addEventListener("mousemove",_),window.addEventListener("touchmove",_)}_updateMarker(e){const t=new Date;t.setHours(0,0,0,0);const i=new Date(t.getTime()+1e3*this._currentTime);e.target.innerText=rs(i,this.hass.language)}_addSlot(){const e=this.entries[this._activeEntry],t=he(e.start),i=he(e.stop),s=me(t+fs(e)/2,this.stepSize),a=[...this.entries.slice(0,this._activeEntry),Object.assign(Object.assign({},this.entries[this._activeEntry]),{stop:pe(s)}),{start:pe(s),stop:pe(i),actions:[]},...this.entries.slice(this._activeEntry+1)],n=new CustomEvent("update",{detail:{entries:a}});this.dispatchEvent(n)}_removeSlot(){const e=this._activeEntry==this.entries.length-1?this._activeEntry-1:this._activeEntry,t=[...this.entries.slice(0,e),Object.assign(Object.assign({},this.entries[e+1]),{start:this.entries[e].start,stop:this.entries[e+1].stop}),...this.entries.slice(e+2)];this._activeEntry==this.entries.length&&this._activeEntry--;const i=new CustomEvent("update",{detail:{entries:t}});this.dispatchEvent(i)}};ys.styles=ie`
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
      margin: 0px 12px;
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
  `,t([K()],ys.prototype,"hass",void 0),t([K({type:Array})],ys.prototype,"entries",void 0),t([K({type:Array})],ys.prototype,"actions",void 0),t([K({type:Number})],ys.prototype,"stepSize",void 0),t([K({type:Number})],ys.prototype,"_activeEntry",void 0),t([K({type:Number})],ys.prototype,"_activeThumb",void 0),t([K({type:Boolean})],ys.prototype,"formatAmPm",void 0),ys=t([Z("timeslot-editor")],ys);let bs=class extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.value=0,this.unit="",this.optional=!1,this.disabled=!1,this.scaleGain=1,this.scaleOffset=0}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})(),"%"==this.unit&&(this.scaleOffset=this.min,this.scaleGain=(this.max-this.min)/100,this.min=0,this.max=100),this.disabled&&!this.optional&&(this.disabled=!1),isNaN(this.value)&&(this.value=this.min),this.requestUpdate()}render(){return L`
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
    `:L``}toggleChecked(e){const t=e.target.checked;this.disabled=!t;const i=new CustomEvent("change");this.dispatchEvent(i)}updateValue(e){let t=Number(e.target.value)*this.scaleGain+this.scaleOffset;t=Math.round(t/this.step)*this.step,this.value=t}};bs.styles=ie`
    ${Ht} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `,t([K({type:Number})],bs.prototype,"min",void 0),t([K({type:Number})],bs.prototype,"max",void 0),t([K({type:Number})],bs.prototype,"step",void 0),t([K({type:Number})],bs.prototype,"value",void 0),t([K({type:String})],bs.prototype,"unit",void 0),t([K({type:Boolean})],bs.prototype,"optional",void 0),t([K({type:Boolean})],bs.prototype,"disabled",void 0),bs=t([Z("variable-slider")],bs);let ws=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`

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
      
    `:L``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([K({attribute:!1})],ws.prototype,"hass",void 0),t([Q()],ws.prototype,"_params",void 0),ws=t([Z("dialog-confirm-delete")],ws);var ks=Object.freeze({__proto__:null,get DialogConfirmDelete(){return ws}});let xs=class extends ae{constructor(){super(...arguments),this.activeEntry=null,this.timeslots=!1,this.editItem=!1}firstUpdated(){if(!this.actions||!this.hass)return;this.timeslots||(this.activeEntry=0);const e=this.actions.map(e=>Object.assign(e,{name:as(e)}));e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),this.actions=e}render(){return this.hass&&this.config&&this.entities&&this.actions?L`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Ut("ui.panel.common.title",this.hass.language)}
            </div>
            <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
          </div>
          <div class="card-content">
            <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
            ${this.renderSummary()}

       ${this.timeslots?L`
            ${this.renderDays()}
            <div class="header">${this.hass.localize("ui.dialogs.helper_settings.input_datetime.time")}</div>
            <timeslot-editor
              .hass=${this.hass}
              .actions=${this.actions}
              .entries=${this.schedule.timeslots}
              stepSize=${this.config.time_step||10}
              @update=${this.handlePlannerUpdate}
            >
            </timeslot-editor>

            <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
            <button-group
              .items=${null!==this.activeEntry?this.actions:[]}
              value=${null!==this.activeEntry?this.schedule.timeslots[this.activeEntry].actions.map(e=>{var t;return null===(t=this.actions.find(t=>Wi(t,e)))||void 0===t?void 0:t.id}):""}
              optional="true"
              @change=${this.selectAction}
            >
              ${Ut("ui.panel.time_picker.no_timeslot_selected",this.hass.language)}
            </button-group>

            ${this.getVariableEditor()}
            `:L`
            ${this.getVariableEditor()}
            ${this.renderDays()}
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
          <div class="card-actions">
            <mwc-button @click="${this.saveClick}">${this.hass.localize("ui.common.save")}</mwc-button>
            ${this.editItem?L`
                  <mwc-button class="warning" @click=${this.deleteClick}
                    >${this.hass.localize("ui.common.delete")}</mwc-button
                  >
                `:""}
            <mwc-button @click="${this.optionsClick}" style="float: right"
              >${this.hass.localize("ui.dialogs.helper_settings.input_select.options")}</mwc-button
            >
          </div>
        </ha-card>
      `:L``}renderSummary(){return this.entities&&this.actions?L`
<div class="summary">
  <div
    class="summary-entity"
    @click=${this.editActionClick}
  >
  ${this.entities.map(e=>L`
    <div>
      <ha-icon icon="${ke(e.icon)}"> </ha-icon>
      ${be(we(e.name||this.hass.states[e.id].attributes.friendly_name||gi(e.id)))}
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
  ${this.timeslots?L`
    <div>
      <ha-icon icon="${ke("chart-timeline")}"> </ha-icon>
      ${be(Ut("ui.panel.entity_picker.make_scheme",this.hass.language))}
    </div>
  `:L`
    <div>
      <ha-icon icon="${ke(this.actions[0].icon||"flash")}"> </ha-icon>
      ${be(this.actions[0].name||gi(this.actions[0].service))}
    </div>
    `}
  </div>
  </div>
    `:L``}renderDays(){if(!this.hass)return L``;let e=Array.from(Array(7).keys());const t=function(e){const t=e.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return function(e,t){const i="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),s="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),a="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);return e?s.includes(e)?"sun":i.includes(e)?"sat":"mon":a.includes(t)?"sun":["ar","arq","arz","fa"].includes(t)?"sat":"mon"}(t[4],t[1])}(this.hass.language),i=e.length-zi.findIndex(e=>e.substr(0,3)==t);e=[...e.slice(-i),...e.slice(0,-i)];const s=e.map(e=>Object({id:zi[e].substr(0,3),name:ji(e,this.hass.language,!0)})),a=[{id:de.Daily,name:Ut("ui.components.date.day_types_short.daily",this.hass.language)},{id:de.Workday,name:Ut("ui.components.date.day_types_short.workdays",this.hass.language)},{id:de.Weekend,name:Ut("ui.components.date.day_types_short.weekend",this.hass.language)},{id:de.Custom,name:this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.label")}];return L`
      <div class="header">${Ut("ui.components.date.days",this.hass.language)}</div>
      <button-group .items=${a} value=${cs(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${cs(this.schedule.weekdays)==de.Custom?L`
            <div>
              <button-group
                .items=${s}
                .value=${this.schedule.weekdays}
                min="1"
                multiple
                @change=${this.selectDays}
              >
              </button-group>
            </div>
          `:""}
    `}updateActiveEntry(e){null!==this.activeEntry&&(this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:Object.assign([...this.schedule.timeslots],{[this.activeEntry]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry]),e)})}))}updateActiveEntryAction(e,t){null!==this.activeEntry&&(e?this.updateActiveEntry({actions:Object.assign([...this.schedule.timeslots[this.activeEntry].actions],{[t]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry].actions[t]),e)})}):this.updateActiveEntry({actions:[...this.schedule.timeslots[this.activeEntry].actions].filter((e,i)=>i!=t)}))}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){const t=e.detail.entries;t.length<this.schedule.timeslots.length&&this.activeEntry==this.schedule.timeslots.length-1&&(this.activeEntry=this.schedule.timeslots.length-2),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...t]})}else e.detail.hasOwnProperty("entry")&&(null!==e.detail.entry?this.activeEntry=Number(e.detail.entry):this.activeEntry=null)}selectAction(e){if(!this.actions||null===this.activeEntry)return;const t=e.target.value;if(t){const e=this.actions.find(e=>e.id==t);this.entities.map(e=>e.id).forEach((t,i)=>{let s=e.service_data||{};if(e.variable&&e.variable.type==oe.Level){const t=e.variable;t.field in s||t.optional||(s=Object.assign(Object.assign({},s),{[t.field]:t.min}))}this.updateActiveEntryAction({entity_id:t,service:e.service,service_data:s},i)})}else this.entities.forEach((e,t)=>{this.updateActiveEntryAction(null,t)})}getVariableEditor(){if(null===this.activeEntry||!this.actions)return L``;return ye(this.schedule.timeslots[this.activeEntry].actions.map(e=>this.actions.find(t=>Wi(t,e)))).map(e=>{if(!e||!e.variable)return L``;const t=this.schedule.timeslots[this.activeEntry].actions[0];if(e.variable.type==oe.Level){const i=e.variable,s=Number(t.service_data[i.field])||null;return L`
          <div class="header">
            ${i.name||we(i.field)}
          </div>
          <variable-slider
            min=${i.min}
            max=${i.max}
            step=${i.step}
            value=${s}
            unit=${i.unit}
            ?optional=${i.optional}
            ?disabled=${null===s}
            @change=${e=>{this.entities.forEach((s,a)=>{this.updateActiveEntryAction({service_data:{...t.service_data,[i.field]:Number(e.target.value)}},a)})}}
          >
          </variable-slider>
        `}{const i=e.variable,s=i.options.map(e=>Object(Object.assign(Object.assign({},e),{id:e.value}))),a=String(t.service_data[i.field])||null;return L`
          <div class="header">
            ${i.name||we(i.field)}
          </div>
          <button-group
            .items=${s}
            value=${a}
            @change=${e=>{this.entities.forEach((s,a)=>{this.updateActiveEntryAction({service_data:{...t.service_data,[i.field]:e.target.value}},a)})}}
          >
            ${this.hass.localize("ui.dialogs.helper_settings.input_select.no_options")}
          </button-group>
        `}})}selectDays(e){const t=e.target.value;let i=this.schedule.weekdays;if(Object.values(de).includes(t))switch(t){case de.Daily:i=["daily"];break;case de.Workday:i=["workday"];break;case de.Weekend:i=["weekend"];break;case de.Custom:i=[]}else i=t;this.schedule=Object.assign(Object.assign({},this.schedule),{weekdays:i})}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}optionsClick(){const e=new CustomEvent("optionsClick",{detail:this.schedule});this.dispatchEvent(e)}editActionClick(){const e=new CustomEvent("editActionClick",{detail:this.schedule});this.dispatchEvent(e)}async deleteClick(e){const t=e.target;if(await new Promise(e=>{bi(t,"show-dialog",{dialogTag:"dialog-confirm-delete",dialogImport:()=>Promise.resolve().then((function(){return ks})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})){const e=new CustomEvent("deleteClick");this.dispatchEvent(e)}}};xs.styles=ie`
    ${Ht}
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
    }
    div.summary-entity div,
    div.summary-action div {
      display: flex;
      flex-grow: 1;
      margin: 5px;
    }
    div.summary-entity ha-icon,
    div.summary-action ha-icon {
      display: flex;
      flex: 0 0 30px;
    }
  `,t([K()],xs.prototype,"hass",void 0),t([K()],xs.prototype,"config",void 0),t([K()],xs.prototype,"schedule",void 0),t([K()],xs.prototype,"actions",void 0),t([K()],xs.prototype,"entities",void 0),t([K()],xs.prototype,"activeEntry",void 0),t([K({type:Boolean})],xs.prototype,"timeslots",void 0),t([K({type:Boolean})],xs.prototype,"editItem",void 0),xs=t([Z("scheduler-timepicker-card")],xs);function $s(e,t){const i=vi(e),s=t.states[e];switch(i){case"alarm_control_panel":return((e,t)=>[{value:"disarmed",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"disarmed"}),e.language),icon:"hass:lock-open-variant-outline"},{value:"armed_away",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"armed_away"}),e.language),icon:"hass:exit-run"},{value:"armed_home",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"armed_home"}),e.language),icon:"hass:home-outline"},{value:"armed_night",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"armed_night"}),e.language),icon:"hass:power-sleep"},{value:"triggered",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"triggered"}),e.language),icon:"hass:alarm-light-outline"}])(t,s);case"binary_sensor":return((e,t)=>[{value:"off",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:Si(Object.assign(Object.assign({},t),{state:"off"}))},{value:"on",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:Si(Object.assign(Object.assign({},t),{state:"on"}))}])(t,s);case"cover":return((e,t)=>[{value:"closed",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"closed"}),e.language),icon:Si(Object.assign(Object.assign({},t),{state:"closed"}))},{value:"open",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"open"}),e.language),icon:Si(Object.assign(Object.assign({},t),{state:"open"}))}])(t,s);case"fan":return((e,t)=>[{value:"off",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:power-off"},{value:"on",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:power"}])(t,s);case"input_boolean":case"switch":return((e,t)=>[{value:"off",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:flash-off"},{value:"on",name:fi(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:flash"}])(t,s);case"lock":return((e,t)=>[{value:"unlocked",name:e.localize("state.lock.unlocked",e.language),icon:"hass:lock-open-variant-outline"},{value:"locked",name:e.localize("state.input_boolean.locked",e.language),icon:"hass:lock-outline"}])(t);case"person":return((e,t)=>[{value:"home",name:e.localize("state_badge.person.home",e.language),icon:"hass:home-outline"},{value:"not_home",name:e.localize("state_badge.person.not_home",e.language),icon:"hass:exit-run"}])(t);default:return}}let Ss=class extends ae{constructor(){super(...arguments),this.addCondition=!1,this.matchTypes={}}firstUpdated(){this.matchTypes={[re.Above]:{value:re.Above,name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.above"),icon:"hass:greater-than"},[re.Below]:{value:re.Below,name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.below"),icon:"hass:less-than"},[re.Equal]:{value:re.Equal,name:Ut("ui.panel.conditions.equal_to",this.hass.language),icon:"hass:equal"},[re.Unequal]:{value:re.Unequal,name:Ut("ui.panel.conditions.unequal_to",this.hass.language),icon:"hass:not-equal-variant"}}}render(){if(!this.hass||!this.config||!this.schedule)return L``;const e=[{name:this.hass.localize("ui.panel.config.automation.editor.actions.type.repeat.label"),id:ne.Repeat,icon:"refresh"},{name:this.hass.localize("ui.dialogs.more_info_control.vacuum.stop"),id:ne.Pause,icon:"stop"},{name:this.hass.localize("ui.common.delete"),id:ne.Single,icon:"trash-can-outline"}];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":Ut("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.addCondition?this.renderAddCondition():L`

          <div class="header">
            ${this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.conditions")}
          ${!this.schedule.timeslots[0].conditions||this.schedule.timeslots[0].conditions.length<2?"":L`
            <div class="switch">
            ${Ut("ui.panel.conditions.any",this.hass.language)}
            <ha-switch
              style="margin: 0px 10px"
              @change=${this.conditionTypeSwitchClick}
              ?checked=${this.schedule.timeslots[0].condition_type==ce.All}
            ></ha-switch>
            ${Ut("ui.panel.conditions.all",this.hass.language)}         
            </div>`}
          </div>
          ${this.renderConditions()}
          
          <div style="margin-top: 10px">
            <mwc-button @click=${this.addConditionClick}>
              <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
              ${this.hass.localize("ui.dialogs.helper_settings.input_select.add")}
            </mwc-button>
          </div>

          <div class="header">${this.hass.localize("ui.components.area-picker.add_dialog.name")}</div>
          <paper-input no-label-float
            value=${this.schedule.name}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">${Ut("ui.panel.options.repeat_type",this.hass.language)}</div>
          <button-group
            .items=${e}
            value="${this.schedule.repeat_type}"
            @change=${this.updateRepeatType}>
          </button-group>
          
        `}
        </div>
        <div class="card-actions">
          ${this.addCondition?L`
                <mwc-button @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity||!this.conditionMatchType||!this.conditionValue}
                  >${this.hass.localize("ui.common.save")}</mwc-button
                >
                ${void 0!==this.editItem?L`
                <mwc-button class="warning" @click=${this.deleteConditionClick}
                    >${this.hass.localize("ui.common.delete")}</mwc-button>`:""}              
                <mwc-button @click=${this.cancelConditionClick} style="float: right"
                  >${this.hass.localize("ui.common.cancel")}</mwc-button
                >
              `:L`
                <mwc-button @click=${this.saveClick}>${this.hass.localize("ui.common.save")}</mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize("ui.common.back")}</mwc-button
                >
              `}
        </div>
      </ha-card>
    `}renderAddCondition(){if(!this.addCondition||!this.hass||!this.config)return L``;if(this.selectedEntity){const e=ts(this.selectedEntity,this.hass,this.config),t=this.hass.states[this.selectedEntity],i=$s(this.selectedEntity,this.hass),s="sensor"!=vi(this.selectedEntity)||isNaN(Number(t.state))?Object.entries(ve(this.matchTypes,[re.Equal,re.Unequal])).map(([e,t])=>Object.assign(t,{id:e})):Object.entries(ve(this.matchTypes,[re.Above,re.Below])).map(([e,t])=>Object.assign(t,{id:e}));return L`
      <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
      <div style="display: flex; flex-direction: row; align-items: center">
        <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)"
        >
          <ha-icon icon="${ke(e.icon||"folder-outline")}"></ha-icon>
          ${we(e.name)}
        </mwc-button>
        <ha-icon-button
          icon="hass:pencil"
          style="margin-left: 10px"
          @click=${()=>{this.selectedEntity=void 0}}
        >
        </ha-icon-button>
      </div>

      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.device.condition")}</div>
      <button-group
        .items=${s} 
        value=${this.conditionMatchType}
        @change=${e=>this.conditionMatchType=e.target.value}
      >
      </button-group>
      
      <div class="header">${this.hass.localize("ui.panel.config.automation.editor.conditions.type.state.label")}</div>
        ${i?L`
      <button-group
        .items=${i.map(e=>Object.assign(e,{id:e.value}))}
        value=${this.conditionValue}
        @change=${e=>{this.conditionValue=e.target.value}}
        >
      </button-group>
        `:L`
            <paper-input
              label="${this.hass.localize("ui.panel.config.automation.editor.conditions.type.state.label")}${t.attributes.unit_of_measurement?` (${t.attributes.unit_of_measurement})`:""}"
              value=${this.conditionValue?this.conditionValue:""}
              @value-changed=${e=>{const t=e.target.value;this.conditionValue=isNaN(Number(t))?t:Number(t)}}
            >
            </paper-input>
        `}
      `}{const e=ms(Object.keys(this.hass.states).filter(e=>Fi(e,this.config)).filter(e=>{var t;return(null===(t=$s(e,this.hass))||void 0===t?void 0:t.length)||"sensor"==vi(e)}),this.config,this.hass);e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1);let t=[];return this.selectedGroup&&(t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>ts(e,this.hass,this.config)),t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1)),L`
      <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
      
      <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
        ${Ut("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
      </button-group>

      <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
      <button-group .items=${t} value=${this.selectedEntity} @change=${this.selectEntity}>
        ${this.selectedGroup?Ut("ui.panel.entity_picker.no_entities_for_group",this.hass.language):Ut("ui.panel.entity_picker.no_group_selected",this.hass.language)}
      </button-group>
    `}}selectGroup(e){this.selectedGroup=e.target.value,this.selectedEntity=void 0}selectEntity(e){const t=e.target.value;this.selectedEntity=t,this.conditionMatchType=void 0,this.conditionValue=void 0}renderConditions(){if(!this.hass||!this.schedule||!Object.keys(this.matchTypes).length)return L``;const e=this.schedule.timeslots[0].conditions||[];return e.length?e.map((e,t)=>{const i=ts(e.entity_id,this.hass,this.config),s=$s(e.entity_id,this.hass),a=this.hass.states[e.entity_id],n=null==s?void 0:s.find(t=>t.value==e.value);return L`
        <div class="summary">
            <ha-icon icon="${i.icon||"folder-outline"}"></ha-icon>
            <span>
              ${we(i.name)}
              ${this.matchTypes[e.match_type].name.toLowerCase()}
              ${n?n.name.toLowerCase():a.attributes.unit_of_measurement?`${e.value}${a.attributes.unit_of_measurement}`:e.value}
            </span>
          <ha-icon-button
            icon="hass:pencil"
            @click=${()=>{this.editConditionClick(t)}}}
          >
          </ha-icon-button>
        </div>
      `}):L`
        <div class="text-field">${Ut("ui.panel.conditions.no_conditions_defined",this.hass.language)}</div>
      `}addConditionClick(){this.addCondition=!0,this.selectedEntity=void 0,this.selectedGroup=void 0}confirmConditionClick(){var e;if(!(this.selectedEntity&&this.config&&this.hass&&this.schedule&&this.conditionMatchType&&this.conditionValue))return;const t={entity_id:this.selectedEntity,match_type:this.conditionMatchType,value:this.conditionValue,attribute:"state"},i=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[],s=this.schedule.timeslots[0].condition_type?this.schedule.timeslots[0].condition_type:ce.Any;void 0===this.editItem?i.push(t):i.splice(this.editItem,1,t),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:i,condition_type:s}))}),this.addCondition=!1,this.editItem=void 0}cancelConditionClick(){this.addCondition=!1,this.editItem=void 0}editConditionClick(e){var t;if(!(this.schedule&&this.schedule.timeslots[0].conditions&&this.hass&&this.config))return;const i=this.schedule.timeslots[0].conditions[e];if(!i)return;this.editItem=e;const s=ms(Object.keys(this.hass.states).filter(e=>Fi(e,this.config)).filter(e=>{var t;return(null===(t=$s(e,this.hass))||void 0===t?void 0:t.length)||"sensor"==vi(e)}),this.config,this.hass);this.selectedGroup=null===(t=s.find(e=>e.entities.includes(i.entity_id)))||void 0===t?void 0:t.id,this.selectedEntity=i.entity_id,this.conditionMatchType=i.match_type,this.conditionValue=i.value,this.addCondition=!0}deleteConditionClick(){var e;if(!this.config||!this.hass||!this.schedule||void 0===this.editItem)return;const t=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[];t.splice(this.editItem,1),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:t}))}),this.addCondition=!1,this.editItem=void 0}conditionTypeSwitchClick(e){if(!this.schedule)return;const t=e.target.checked?ce.All:ce.Any;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{type:t}))})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t})}updateRepeatType(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}cancelClick(){if(this.addCondition)this.addCondition=!this.addCondition;else{const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}backClick(){const e=new CustomEvent("backClick",{detail:this.schedule});this.dispatchEvent(e)}};Ss.styles=ie`
    ${Ht}
    div.summary {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 0px;
      background: rgba(var(--rgb-primary-text-color), 0.08);
      border-radius: 8px;
      margin: 2px 0px;
      font-weight: 400;
    }
    div.summary ha-icon {
      flex: 0 0 48px;
      justify-content: center;
      display: flex;
      color: var(--state-icon-color);
    }
    div.summary span {
      flex: 1 0 60px;
      display: flex;
    }
    div.summary ha-icon-button {
      margin: -8px 0px;
    }
  `,t([K()],Ss.prototype,"hass",void 0),t([K()],Ss.prototype,"config",void 0),t([K()],Ss.prototype,"schedule",void 0),t([K()],Ss.prototype,"selectedGroup",void 0),t([K()],Ss.prototype,"selectedEntity",void 0),t([K()],Ss.prototype,"conditionMatchType",void 0),t([K()],Ss.prototype,"conditionValue",void 0),t([K()],Ss.prototype,"editItem",void 0),t([K()],Ss.prototype,"addCondition",void 0),Ss=t([Z("scheduler-options-card")],Ss);let zs=class extends ae{constructor(){super(...arguments),this.selectedDomain="",this.titleOption="standard",this.scheduleEntities=[]}setConfig(e){this._config=e,this.titleOption=this.getTitleOption()}async firstUpdated(){this.scheduleEntities=(await us(this.hass)).map(e=>e.entity_id)}render(){return this.hass?L`
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
    `:L``}getTitleOption(){return this._config&&this.hass?void 0===this._config.title?"standard":"string"==typeof this._config.title?"custom":0==this._config.title?"hidden":"standard":"standard"}getTitle(){return this.hass?this._config&&this.hass?void 0===this._config.title?Ut("ui.panel.common.title",this.hass.language):"string"==typeof this._config.title?this._config.title:0==this._config.title?"":Ut("ui.panel.common.title",this.hass.language):Ut("ui.panel.common.title",this.hass.language):""}updateTitleOption(e){const t=e.target.value;if(!this._config||!this.hass)return;this.titleOption=t;const i=Object.assign({},this._config);"standard"==t?"title"in this._config&&delete i.title:"hidden"==t&&Object.assign(i,{title:!1}),this._config=i,bi(this,"config-changed",{config:this._config})}updateTitle(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=String(e.target.value);Object.assign(t,{title:i}),this._config=t,bi(this,"config-changed",{config:this._config})}getDiscoveryOption(){if(!this._config||!this.hass)return;return!this._config.hasOwnProperty("discover_existing")||this._config.discover_existing}updateDiscoveryOption(e){const t="true"==e.target.value;if(!this._config||!this.hass)return;const i=Object.assign({},this._config);t?i.hasOwnProperty("discover_existing")&&delete i.discover_existing:Object.assign(i,{discover_existing:t}),this._config=i,bi(this,"config-changed",{config:this._config})}getTimeStepOption(){if(!this._config||!this.hass)return;const e=this._config.hasOwnProperty("time_step")?this._config.time_step:10;return Number(e)}updateTimeStepOption(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=Number(e.target.value);10==i&&t.hasOwnProperty("time_step")?delete t.time_step:Object.assign(t,{time_step:i}),this._config=t,bi(this,"config-changed",{config:this._config})}getDomainSwitches(){if(!this._config||!this.hass)return;this._config.include&&this._config.include;const e=Object.keys(this.hass.states).filter(e=>"switch"!=vi(e)||!this.scheduleEntities.includes(e)).map(e=>ts(e,this.hass,{include:["*"]})).filter(e=>Ki(e.id,this.hass,{}).length);return e.map(e=>vi(e.id)).filter((e,t,i)=>i.indexOf(e)===t).map(t=>{const i=e.filter(e=>vi(e.id)==t).length;return i?L`
        <div
          class="row"
          @click=${()=>{this.toggleSelectDomain(t)}}
        >
          <ha-icon icon="${ke(Xi[t])}"> </ha-icon>

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
      `:""})}getEntitySwitches(e){if(!this._config||!this.hass)return;const t=this._config.include?[...this._config.include]:[];return Object.entries(this.hass.states).filter(([t])=>vi(t)==e).filter(([t])=>"switch"!=e||!this.scheduleEntities.includes(t)).map(([e,i])=>{const s=i.attributes.friendly_name||gi(e),a=t.includes(e);return L`
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
        `})}toggleSelectDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectEntity(e){if(!this._config||!this.hass)return;let t=this._config.include?[...this._config.include]:[];t.includes(e)?t=t.filter(t=>t!=e):t.push(e),t.sort(),this._config=Object.assign(Object.assign({},this._config),{include:t}),bi(this,"config-changed",{config:this._config})}static get styles(){return ie`
      ${Ht}
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
    `}};t([K()],zs.prototype,"hass",void 0),t([K()],zs.prototype,"_config",void 0),t([K()],zs.prototype,"selectedDomain",void 0),t([K()],zs.prototype,"titleOption",void 0),t([K()],zs.prototype,"scheduleEntities",void 0),zs=t([Z("scheduler-card-editor")],zs);let js=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
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
        ${this.hass.localize("state_badge.default.error")}
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        ${this._params.error||""}
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
      
    `:L``}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([K({attribute:!1})],js.prototype,"hass",void 0),t([Q()],js.prototype,"_params",void 0),js=t([Z("dialog-error")],js);var Es=Object.freeze({__proto__:null,get DialogError(){return js}});window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v2.0.0".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),e.SchedulerCard=class extends ae{constructor(){super(...arguments),this._view=ue.Overview,this.actions=[],this.translationsLoaded=!1,this.editItem=null}static getConfigElement(){return document.createElement("scheduler-card-editor")}set hass(e){this._hass=e}firstUpdated(){const e=this._hass;if(e.localize("ui.panel.config.automation.editor.actions.name"))this.translationsLoaded=!0;else{document.querySelector("home-assistant")._loadFragmentTranslations(e.language,"config").then(()=>{this._hass.localize})}}shouldUpdate(e){const t=e.get("_hass");return!t||1!=e.size||!t.localize("ui.panel.config.automation.editor.actions.name")&&(this.translationsLoaded=!0,!0)}setConfig(e){$e(e),this._config=e}getCardSize(){return 9}render(){return this._hass&&this._config&&this.translationsLoaded?this._view==ue.Overview?L`
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `:this._view==ue.NewSchedule?L`
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entities=${this.entities}
          .schedule=${this.schedule}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `:this._view==ue.TimePicker||this._view==ue.TimeScheme?L`
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .schedule=${this.schedule}
          .entities=${this.entities}
          .actions=${this.actions}
          ?timeslots=${this._view==ue.TimeScheme}
          ?editItem=${null!==this.editItem}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `:this._view==ue.Options?L`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .schedule=${this.schedule}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${this._saveItemClick}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `:L``:L``}_addItemClick(){this._view=ue.NewSchedule,this.editItem=null,this.entities=[],this.actions=[],this.schedule=void 0}_cancelEditClick(){this._view=ue.Overview,this.editItem=null}_confirmItemClick(e){if(!this._hass||!this._config)return;const t=e.detail.entities;this.entities=t.map(e=>ts(e,this._hass,this._config));const i=e.detail.action,s=this.schedule;if("make_scheme"!=i){this.actions=[Ki(t,this._hass,this._config).find(e=>e.id==i)];const e={start:"12:00:00",actions:fe(t.map(e=>Object({service:this.actions[0].service,entity_id:e,service_data:this.actions[0].service_data})))};this.schedule=s?Object.assign(Object.assign({},s),{timeslots:1!=s.timeslots.length||s.timeslots[0].stop?[e]:[Object.assign(Object.assign({},s.timeslots[0]),{actions:e.actions})]}):{weekdays:["daily"],timeslots:[e],repeat_type:ne.Repeat},this._view=ue.TimePicker}else{this.actions=Ki(t,this._hass,this._config);const e=[{start:"00:00:00",stop:"08:00:00",actions:[]},{start:"08:00:00",stop:"16:00:00",actions:[]},{start:"16:00:00",stop:"00:00:00",actions:[]}];this.schedule=s?Object.assign(Object.assign({},s),{timeslots:s.timeslots.length>1&&s.timeslots.every(e=>e.stop)?s.timeslots.map(e=>Object.assign(e,{actions:[]})):e}):{weekdays:["daily"],timeslots:e,repeat_type:ne.Repeat},this._view=ue.TimeScheme}}_editActionClick(e){this.schedule=e.detail,this._view=ue.NewSchedule}_saveItemClick(e){if(!this._hass)return;let t=e.detail;var i,s,a;t=Object.assign(Object.assign({},t),{timeslots:t.timeslots.map(e=>{var t;return e.actions&&e.actions.length?(e.stop||(e=ge(e,["stop"])),(null===(t=e.conditions)||void 0===t?void 0:t.length)||(e=ge(e,["conditions","condition_type"])),e):null}).filter(e=>e)}),this.editItem?((a=t.name)&&null!==a.match(/^Schedule\ #[a-f0-9]{6}/)&&(t=Object.assign(Object.assign({},t),{name:""})),(i=this._hass,s=Object.assign(Object.assign({},t),{schedule_id:this.editItem}),i.callApi("POST","scheduler/edit",s)).catch(e=>hs(e,this)).then(()=>{this.editItem=null,this._view=ue.Overview})):((e,t)=>e.callApi("POST","scheduler/add",t))(this._hass,t).catch(e=>hs(e,this)).then(()=>{this._view=ue.Overview})}_deleteItemClick(){if(!this.editItem||!this._hass)return;const e=this.editItem;var t,i;(t=this._hass,i=e,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>hs(e,this)).then(()=>{this.editItem=null,this._view=ue.Overview})}async _editItemClick(e){if(!this._hass||!this._config)return;const t=await(i=this._hass,s=e.detail,i.callWS({type:"scheduler/item",schedule_id:s}));var i,s;if(!t)return;const a=ye(fe(t.timeslots.map(e=>e.actions.map(e=>e.entity_id))));this.entities=a.map(e=>ts(e,this._hass,this._config));let n=Ki(a,this._hass,this._config);const o=ye(fe(t.timeslots.map(e=>e.actions)));o.filter(e=>!n.find(t=>Wi(t,e))).forEach(e=>{n.push(Qi(e,this._hass,this._config))}),this.actions=n,this.schedule={weekdays:t.weekdays,timeslots:t.timeslots,repeat_type:t.repeat_type,name:t.name},this.editItem=t.schedule_id,this.schedule.timeslots.every(e=>e.stop)?(this._view=ue.TimeScheme,this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:xe(this.schedule.timeslots)})):(this._view=ue.TimePicker,this.actions=this.actions.filter(e=>o.find(t=>Wi(e,t))))}_gotoOptionsClick(e){this.schedule=e.detail,this._view=ue.Options}_optionsBackClick(e){this.schedule=e.detail,this.schedule.timeslots.every(e=>e.stop)?this._view=ue.TimeScheme:this._view=ue.TimePicker}},t([K()],e.SchedulerCard.prototype,"_hass",void 0),t([K()],e.SchedulerCard.prototype,"_view",void 0),t([K()],e.SchedulerCard.prototype,"entities",void 0),t([K()],e.SchedulerCard.prototype,"actions",void 0),t([K()],e.SchedulerCard.prototype,"schedule",void 0),t([K()],e.SchedulerCard.prototype,"translationsLoaded",void 0),e.SchedulerCard=t([Z("scheduler-card")],e.SchedulerCard)}({});
