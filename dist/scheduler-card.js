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
const _=new WeakMap,g=e=>"function"==typeof e&&_.has(e),v={},f={};
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),$=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class z{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!$(e))return e}let s="";for(let a=0;a<t;a++){s+=e[a];const t=i[a];if(void 0!==t){const e=t.value;if(x(e)||!$(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===v||x(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=v,e(this)}this.value!==v&&this.committer.commit()}}class j{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=v,e(this)}const e=this.__pendingValue;e!==v&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof k?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):$(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const i=new y(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const a of e)i=t[s],void 0===i&&(i=new j(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(a),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=v,e(this)}if(this.__pendingValue===v)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=v}}class E extends z{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends S{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=v,e(this)}if(this.__pendingValue===v)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=D(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=v}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const D=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function N(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);return i=t.keyString.get(s),void 0===i&&(i=new r(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const M=new Map,P=new WeakMap;
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
class{handleAttributeExpressions(e,t,i,s){const a=t[0];if("."===a){return new E(e,t.slice(1),i).parts}if("@"===a)return[new T(e,t.slice(1),s.eventContext)];if("?"===a)return[new O(e,t.slice(1),i)];return new z(e,t,i).parts}handleTextExpression(e){return new j(e)}};
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
     */,q=(e,t)=>`${e}--${t}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const U=e=>t=>{const i=q(t.type,e);let s=M.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},M.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(a);if(n=s.keyString.get(o),void 0===n){const i=t.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(i,e),n=new r(t,i),s.keyString.set(o,n)}return s.stringsArray.set(t.strings,n),n},H=["html","svg"],R=new Set,W=(e,t,i)=>{R.add(e);const s=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:n}=a;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=a[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{H.forEach(t=>{const i=M.get(q(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),h(e,i)})})})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:a}=e;if(null==i)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let o=m(a),r=0,c=-1;for(;n.nextNode();){c++;for(n.currentNode===i&&(r=p(t),i.parentNode.insertBefore(t,i));-1!==o&&a[o].index===c;){if(r>0){for(;-1!==o;)a[o].index+=r,o=m(a,o);return}o=m(a,o)}}}(i,o,r.firstChild):r.insertBefore(o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const c=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(o,r.firstChild);const e=new Set;e.add(o),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Y={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),G={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:B};class F extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=G){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const a=this[e];this[t]=s,this.requestUpdateInternal(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||G}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=B){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||Y,a="function"==typeof s?s:s.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||Y.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=G){const s=this.constructor,a=s._attributeNameForProperty(e,i);if(void 0!==a){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const a=this.constructor;i=i||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}F.finalized=!0;
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
const J=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),Z=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function K(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Z(e,t)}function Q(e){return K({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}
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
const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol();class te{constructor(e,t){if(t!==ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof te)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new te(i,ee)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const se={};class ae extends F{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!X){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new te(String(t),ee)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==se&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return se}}ae.finalized=!0,ae.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const a=i.scopeName,n=P.has(t),o=V&&11===t.nodeType&&!!t.host,r=o&&!R.has(a),c=r?document.createDocumentFragment():t;if(((e,t,i)=>{let a=P.get(t);void 0===a&&(s(t,t.firstChild),P.set(t,a=new j(Object.assign({templateFactory:N},i))),a.appendInto(t)),a.setValue(e),a.commit()})(e,c,Object.assign({templateFactory:U(a)},i)),r){const e=P.get(c);P.delete(c);const i=e.value instanceof y?e.value.template:void 0;W(a,c,i),s(t,t.firstChild),t.appendChild(c),P.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)};var ne=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,oe="[^\\s]+",re=/\[([^]*?)\]/gm;function ce(e,t){for(var i=[],s=0,a=e.length;s<a;s++)i.push(e[s].substr(0,t));return i}var le=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function de(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var n=a[s];for(var o in n)e[o]=n[o]}return e}var ue=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],he=["January","February","March","April","May","June","July","August","September","October","November","December"],pe=ce(he,3),me={dayNamesShort:ce(ue,3),dayNames:ue,monthNamesShort:pe,monthNames:he,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=de({},me),ge=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ve={D:function(e){return String(e.getDate())},DD:function(e){return ge(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ge(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ge(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ge(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ge(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ge(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ge(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ge(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ge(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ge(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ge(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ge(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ge(Math.floor(Math.abs(t)/60),2)+":"+ge(Math.abs(t)%60,2)}},fe=function(e){return+e-1},ye=[null,"[1-9]\\d?"],be=[null,oe],we=["isPm",oe,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],ke=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],xe=(le("monthNamesShort"),le("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var $e=function(e,t,i){if(void 0===t&&(t=xe.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=xe[t]||t).replace(re,(function(e,t){return s.push(t),"@@@"}));var a=de(de({},_e),i);return(t=t.replace(ne,(function(t){return ve[t](e,a)}))).replace(/@@@/g,(function(){return s.shift()}))},ze=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(e){return $e(e,"mediumDate")},Se=function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(e){return $e(e,"haDateTime")},je=function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(e){return $e(e,"shortTime")};function Oe(e){return e.substr(0,e.indexOf("."))}function Ee(e){return e.substr(e.indexOf(".")+1)}function Ce(e,t,i){if("unknown"===t.state||"unavailable"===t.state)return e("state.default."+t.state);if(t.attributes.unit_of_measurement)return t.state+" "+t.attributes.unit_of_measurement;var s=function(e){return Oe(e.entity_id)}(t);if("input_datetime"===s){var a;if(!t.attributes.has_time)return a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),ze(a,i);if(!t.attributes.has_date){var n=new Date;return a=new Date(n.getFullYear(),n.getMonth(),n.getDay(),t.attributes.hour,t.attributes.minute),je(a,i)}return a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),Se(a,i)}return t.attributes.device_class&&e("component."+s+".state."+t.attributes.device_class+"."+t.state)||e("component."+s+".state._."+t.state)||t.state}var Ae="hass:bookmark",Te=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a},De={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ne(e,t){if(e in De)return De[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Ae}}var Me,Pe,Ie,Le,qe,Ve,Ue={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},He={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ne("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Ue)return Ue[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"hass:battery-unknown";var s=10*Math.round(i/10);return s>=100?"hass:battery":s<=0?"hass:battery-alert":"hass:battery-"+s}var a=e.attributes.unit_of_measurement;return"°C"===a||"°F"===a?"hass:thermometer":Ne("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ne("input_datetime"):"hass:calendar":"hass:clock"}},Re=function(e){if(!e)return Ae;if(e.attributes.icon)return e.attributes.icon;var t=Oe(e.entity_id);return t in He?He[t](e):Ne(t,e.state)};!function(e){e.Repeat="repeat",e.Pause="pause",e.Single="single"}(Me||(Me={})),function(e){e.Level="LEVEL",e.List="LIST"}(Pe||(Pe={})),function(e){e.Equal="is",e.Unequal="not",e.Below="below",e.Above="above"}(Ie||(Ie={})),function(e){e.Any="or",e.All="and"}(Le||(Le={})),function(e){e.Sunrise="sunrise",e.Sunset="sunset"}(qe||(qe={})),function(e){e.Daily="DAILY",e.Workday="WORKDAY",e.Weekend="WEEKEND",e.Custom="CUSTOM"}(Ve||(Ve={}));var We;function Ye(e){if(e.match(/^([0-9:]+)$/)){const t=e.split(":").map(Number);return 3600*t[0]+60*t[1]+t[2]||0}{const t=new Date(e);return 3600*t.getHours()+60*t.getMinutes()+t.getSeconds()}}function Be(e){const t=Math.floor(e/3600);e-=3600*t;const i=Math.floor(e/60);e-=60*i;const s=Math.round(e);return String(t%24).padStart(2,"0")+":"+String(i).padStart(2,"0")+":"+String(s).padStart(2,"0")}function Ge(e,t,i={wrapAround:!0}){let s=e>=0?Math.floor(e/3600):Math.ceil(e/3600),a=Math.floor((e-3600*s)/60);a%t!=0&&(a=Math.round(a/t)*t),a>=60?(s++,a-=60):a<0&&(s--,a+=60),i.wrapAround&&(s>=24?s-=24:s<0&&(s+=24));const n=3600*s+60*a;if(i.maxHours){if(n>3600*i.maxHours)return 3600*i.maxHours;if(n<3600*-i.maxHours)return 3600*-i.maxHours}return n}function Fe(e){const t=e.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);return!!t&&{event:t[1],sign:t[2],offset:t[3]}}function Je(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function Ze(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}function Ke(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?Ke(t):t),[])}function Qe(e){return e.filter((e,t,i)=>i.indexOf(e)===t)}function Xe(e){return e.charAt(0).toUpperCase()+e.slice(1)}function et(e){return"string"!=typeof e&&(e=String(e)),Xe(e.replace(/_/g," "))}function tt(e){if(e)return"string"!=typeof e&&(e=String(e)),e.match(/^[a-z]+:[a-z0-9-]+$/i)?e:"hass:"+e}function it(e){e.sort((e,t)=>Ye(e.start)>Ye(t.start)?1:Ye(e.start)<Ye(t.start)?-1:Ye(e.stop)>Ye(t.stop)?1:-1);let t=0,i=(e=e.map(e=>Ye(e.stop)<Ye(e.start)?Object.assign(Object.assign({},e),{stop:Be(Ye(e.stop)+86400)}):e)).length;for(let s=0;s<i;s++){const a=e[s];Ye(a.start)>t&&(e.splice(s,0,Object.assign(Object.assign({},a),{start:Be(t),stop:a.start,actions:[]})),i++,s++),t=Ye(a.stop)}return t<86400&&t>0&&e.push(Object.assign(Object.assign({},e[0]),{start:Be(t),stop:Be(86400),actions:[]})),e}function st(e){const t=[];let i=[];const s=e=>{e&&t.push(i.length?`in ${i.join("->")}: ${e}`:e)},a=(e,t)=>e.hasOwnProperty(t),n=(e,t)=>Array.isArray(t)?t.some(t=>n(e,t)):"array"==t?Array.isArray(e):typeof e===t,o=(e,t,i)=>{if(a(e,t)){n(e[t],i)||s(`'${t}' must be of type ${i}`)}else s(`missing required property '${t}'`)},r=(e,t,i)=>{if(!a(e,t))return;n(e[t],i)||s(`'${t}' must be of type ${i}`)},c=(e,t,i)=>{let o=!0;return a(e,t)&&n(e[t],"array")?e[t].some(e=>!n(e,i))&&(s(`'${t}' must be an array with items of type ${i}`),o=!1):o=!1,o};if(r(e,"discover_existing","boolean"),r(e,"standard_configuration","boolean"),r(e,"title",["boolean","string"]),r(e,"time_step","number"),r(e,"show_header_toggle","boolean"),r(e,"include","array"),c(e,"include","string"),r(e,"exclude","array"),c(e,"exclude","string"),r(e,"display_options","object"),a(e,"display_options")&&(i.push("display_options"),r(e.display_options,"primary_info",["string","array"]),r(e.display_options,"secondary_info",["string","array"]),r(e.display_options,"icon","string"),c(e.display_options,"primary_info","string"),c(e.display_options,"secondary_info","string")),i=[],r(e,"groups","array"),a(e,"groups")&&n(e.groups,"array")&&(i.push("groups"),e.groups.forEach((e,t)=>{i=["groups",t],o(e,"name","string"),r(e,"icon","string"),o(e,"include","array"),r(e,"exclude","array"),c(e,"include","string"),c(e,"exclude","string")})),i=[],r(e,"customize","object"),a(e,"customize")&&n(e.customize,"object")&&Object.keys(e.customize).forEach(t=>{if(i=["customize"],n(t,"string")||s(t+" is not allowed"),o(e.customize,t,"object"),a(e.customize,t)&&n(e.customize[t],"object")){i.push(t);const l=e.customize[t];r(l,"name","string"),r(l,"icon","string"),r(l,"actions","array"),c(l,"actions","object")&&l.actions.forEach((e,l)=>{i=["customize",t,l],(e=>{const t=i;r(e,"name","string"),r(e,"icon","string"),o(e,"service","string"),r(e,"service_data","object"),c(e,"service_data","string"),a(e,"service_data")&&n(e.service_data,"object")&&Object.keys(e.service_data).some(e=>!n(e,"string"))&&s("service_data items must have string as index type"),r(e,"variable","object"),a(e,"variable")&&n(e.variable,"object")&&(i.push("variable"),o(e.variable,"field","string"),r(e.variable,"name","string"),c(e.variable,"options","object")?e.variable.options.forEach((e,s)=>{i=t.concat(t,["variable",s]),o(e,"value","string"),r(e,"name","string"),r(e,"icon","string")}):(r(e.variable,"min","number"),r(e.variable,"max","number"),r(e.variable,"step","number"),r(e.variable,"optional","boolean"),r(e.variable,"unit","string")))})(e)})}}),t.length)throw new Error(`Invalid configuration provided (${t.length} error${t.length>1?"s":""}): ${t.join(", ")}.`)}!function(e){e.Overview="OVERVIEW",e.NewSchedule="NEW_SCHEDULE",e.TimePicker="TIME_PICKER",e.TimeScheme="TIME_SCHEME",e.Options="OPTIONS"}(We||(We={}));var at={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} s {parameter}"},climate:{set_temperature:"nastavit teplotu[ na {temperature}]",set_temperature_hvac_mode_heat:"topení[ na {temperature}]",set_temperature_hvac_mode_cool:"chlazení[ na {temperature}]",set_hvac_mode:"nastavit režim[ na {hvac_mode}]",set_preset_mode:"nastavit předvolbu[ {preset_mode}]"},cover:{close_cover:"zavřít",open_cover:"otevřít",set_cover_position:"nastavit polohu[ na {position}]"},fan:{set_speed:"nastavit rychlost[ na {speed}]",set_direction:"nastavit směr[ na {direction}]",oscillate:"nastavit oscilaci[ na {oscillate}]"},humidifier:{set_humidity:"nastavit vlhkost[ na {humidity}]"},input_number:{set_value:"nastavit hodnotu[ na {value}]"},input_select:{select_option:"vybrat možnost[ {option}]"},light:{turn_on:"zapnout[ na {brightness} jas]"},media_player:{select_source:"vybrat zdroj[ {source}]"},script:{script:"spustit"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"vypnout režim"}},nt={alarm_control_panel:"poplašný ovládací panel",climate:"klima",cover:"rolety",fan:"ventilátory",group:"skupiny",humidifier:"zvlhčovače",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"světla",lock:"zámky",media_player:"média přehrávače",scene:"scény",script:"skripty",switch:"spínače",vacuum:"vysavače",water_heater:"ohřívače vody"},ot={components:{date:{day_types_short:{daily:"denně",workdays:"pracovní dny",weekend:"víkendy"},day_types_long:{daily:"každý den",workdays:"v pracovní dny",weekend:"o víkendu"},days:"dnů",tomorrow:"zítra",repeated_days:"každý {days}",repeated_days_except:"každý den kromě {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"od {time}",interval:"od {startTime} do {endTime}",at_midnight:"od půlnoc",at_noon:"od poledne",at_sun_event:"na {sunEvent}"}},panel:{common:{title:"Plánovač"},overview:{no_entries:"Nejsou žádné položky k zobrazení",excluded_items:"{number} vyloučeno {if number is 1} položka {else} položek",hide_excluded:"skrýt vyloučené položky",additional_tasks:"{number} a více {if number is 1} úkol {else} úkolů"},entity_picker:{no_groups_defined:"Nejsou definovány žádné skupiny",no_group_selected:"Nejprve vyberte skupinu",no_entities_for_group:"V této skupině nejsou žádné entity",no_entity_selected:"Nejprve vyberte entitu",no_actions_for_entity:"Pro tuto entitu neexistují žádné akce",make_scheme:"vytvořit schéma"},time_picker:{no_timeslot_selected:"Nejprve vyberte časový úsek"},conditions:{equal_to:"je",unequal_to:"není",all:"Vše",any:"žádný",no_conditions_defined:"Nejsou definovány žádné podmínky"},options:{repeat_type:"chování po spuštění"}}},rt={services:at,domains:nt,ui:ot},ct=Object.freeze({__proto__:null,services:at,domains:nt,ui:ot,default:rt}),lt={generic:{parameter_to_value:"{parameter} auf {value}",action_with_parameter:"{action} mit {parameter}"},climate:{set_temperature:"Temperatur einstellen[ auf {temperature}]",set_temperature_hvac_mode_heat:"heizen[ auf {temperature}]",set_temperature_hvac_mode_cool:"kühlen[ auf {temperature}]",set_hvac_mode:"Modus setzen[ auf {hvac_mode}]",set_preset_mode:"Voreinstellung setzen[ auf {preset_mode}]"},cover:{close_cover:"schließen",open_cover:"öffnen",set_cover_position:"Position setzen[ auf {position}]"},fan:{set_speed:"Geschwindigkeit speed[ auf {speed}]",set_direction:"Richtung setzen[ auf {direction}]",oscillate:"Oszillation setzen[ auf {oscillate}]"},humidifier:{set_humidity:"Luftfeuchtigkeit setzen[ auf {humidity}]"},input_number:{set_value:"Wert setzen[ auf {value}]"},input_select:{select_option:"Option[ {option}] auswählen"},light:{turn_on:"anschalten[ mit {brightness} Helligkeit]"},media_player:{select_source:"Quelle[ {source}] auswählen"},script:{script:"ausführen"},vacuum:{start_pause:"Start / Pause"},water_heater:{set_away_mode:"Abwesenheitsmodus setzen"}},dt={alarm_control_panel:"Alarmzentrale",climate:"Heizung",cover:"Beschattung",fan:"Lüfter",group:"Gruppen",humidifier:"Befeuchter",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"Licht",lock:"Schlösser",media_player:"Medienplayer",scene:"Szene",script:"Skripte",switch:"Schalter",vacuum:"Staubsauger",water_heater:"Boiler"},ut={components:{date:{day_types_short:{daily:"täglich",workdays:"Werktags",weekend:"Wochenende"},day_types_long:{daily:"Jeden Tag",workdays:"An Werktagen",weekend:"Am Wochenende"},days:"Tage",tomorrow:"morgen",repeated_days:"jeden {days}",repeated_days_except:"täglich außer {excludedDays}",days_range:"von {startDay} bis {endDay}"},time:{absolute:"um {time}",interval:"von {startTime} bis {endTime}",at_midnight:"um Mitternacht",at_noon:"um Mittag",at_sun_event:"beim {sunEvent}"}},panel:{common:{title:"Zeitplaner"},overview:{no_entries:"Es gibt keine Einträge, die angezeigt werden können",excluded_items:"{number}{if number is 1} ausgeschlossener Eintrag {else} ausgeschlossene Einträge",hide_excluded:"Verstecke ausgeschlossene Einträge",additional_tasks:"{number} weitere {if number is 1} Aufgabe {else} Aufgaben"},entity_picker:{no_groups_defined:"Es gibt keine Gruppe",no_group_selected:"Wähle zuerst eine Gruppe aus",no_entities_for_group:"Es gibt keine Entities in dieser Gruppe",no_entity_selected:"Wähle zuerst eine Entity aus",no_actions_for_entity:"Es gibt keine Aktionen für diese Entity",make_scheme:"Erstelle Zeitplan"},time_picker:{no_timeslot_selected:"Wähle zuerst ein Zeitfenster aus"},conditions:{equal_to:"ist",unequal_to:"ist nicht",all:"alle",any:"keine",no_conditions_defined:"Es sind keine Bedingungen definiert"},options:{repeat_type:"Verhalten im Anschluß"}}},ht={services:lt,domains:dt,ui:ut},pt=Object.freeze({__proto__:null,services:lt,domains:dt,ui:ut,default:ht}),mt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"set temperature[ to {temperature}]",set_temperature_hvac_mode_heat:"heat[ to {temperature}]",set_temperature_hvac_mode_cool:"cool[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ to {preset_mode}]"},cover:{close_cover:"close",open_cover:"open",set_cover_position:"set position[ to {position}]",set_cover_tilt_position:"set tilt position[ to {tilt_position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"turn on[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},_t={alarm_control_panel:"alarm control panel",climate:"climate",cover:"covers",fan:"fans",group:"entity groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lights",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"switches",vacuum:"vacuums",water_heater:"water heaters"},gt={components:{date:{day_types_short:{daily:"daily",workdays:"workdays",weekend:"weekend"},day_types_long:{daily:"every day",workdays:"on workdays",weekend:"in the weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Scheduler"},overview:{no_entries:"There are no items to show",backend_error:"Could not connect with the scheduler component. It needs to be installed as integration before this card can be used.",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"There are no groups defined",no_group_selected:"Select a group first",no_entities_for_group:"There are no entities in this group",no_entity_selected:"Select an entity first",no_actions_for_entity:"There are no actions for this entity",make_scheme:"make scheme",multiple:"Multiple"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},vt={services:mt,domains:_t,ui:gt},ft=Object.freeze({__proto__:null,services:mt,domains:_t,ui:gt,default:vt}),yt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"establecer temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"calefacción [ a {temperature}]",set_temperature_hvac_mode_cool:"frío [ a {temperature}]",set_hvac_mode:"establecer modo[ a {hvac_mode}]",set_preset_mode:"establecer preajuste [ {preset_mode}]"},cover:{close_cover:"cerrado",open_cover:"abierto",set_cover_position:"establecer posición [ a {position}]"},fan:{set_speed:"establecer velocidad [ a {speed}]",set_direction:"establecer dirección[ a {direction}]",oscillate:"establecer oscilación[ a {oscillate}]"},humidifier:{set_humidity:"establecer humedad[ a {humidity}]"},input_number:{set_value:"establecer valor[ a {value}]"},input_select:{select_option:"seleccionar opción[ {option}]"},light:{turn_on:"encender[ con brillo en {brightness}]"},media_player:{select_source:"seleccionar fuente[ {source}]"},script:{script:"ejecutar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"establecer modo fuera de casa"}},bt={alarm_control_panel:"panel de control de alarma",climate:"climatización",cover:"cortinas",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luces",lock:"cerraduras",media_player:"reproductores",scene:"escenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"calentador de agua"},wt={components:{date:{day_types_short:{daily:"a diario",workdays:"días hábiles",weekend:"fin de semana"},day_types_long:{daily:"todos los días",workdays:"en días hábiles",weekend:"en el fin de semana"},days:"días",tomorrow:"mañana",repeated_days:"cada {days}",repeated_days_except:"cada dia excepto {excludedDays}",days_range:"de {startDay} a {endDay}"},time:{absolute:"a las {time}",interval:"desde las {startTime} a las {endTime}",at_midnight:"a la medianoche",at_noon:"a la mediodía",at_sun_event:"a la {sunEvent}"}},panel:{common:{title:"Programador"},overview:{no_entries:"No hay ningún elemento que mostrar",excluded_items:"{number} {if number is 1} elemento excluido {else} elementos excluidos",hide_excluded:"ocultar elementos excluidos",additional_tasks:"{number} {if number is 1} tarea adicional {else} tareas adicionales"},entity_picker:{no_groups_defined:"No hay ningún grupo definido",no_group_selected:"selecciona un grupo primero",no_entities_for_group:"no hay ningúna entidad en este grupo",no_entity_selected:"selecciona una entidad primero",no_actions_for_entity:"no hay acciones para esta entidad",make_scheme:"crear planificación"},time_picker:{no_timeslot_selected:"selecciona un bloque de tiempo primero"},conditions:{equal_to:"igual a",unequal_to:"desigual a",all:"todos",any:"cualquiera",no_conditions_defined:"no hay ninguna condición definida"},options:{repeat_type:"acción después de ejecutar"}}},kt={services:yt,domains:bt,ui:wt},xt=Object.freeze({__proto__:null,services:yt,domains:bt,ui:wt,default:kt}),$t={generic:{parameter_to_value:"{parameter} {value} jaoks",action_with_parameter:"{action} väärtusega {parameter}"},climate:{set_temperature:"vali temperatuur [{temperature}]",set_temperature_hvac_mode_heat:"küte[ @ {temperature}]",set_temperature_hvac_mode_cool:"jahutus [ @ {temperature}]",set_hvac_mode:"vali režiim [{hvac_mode}]",set_preset_mode:"eelseade[ {preset_mode}]"},cover:{close_cover:"sulge",open_cover:"ava",set_cover_position:"sea asendisse[{position}]"},fan:{set_speed:"vali kiirus[ @ {speed}]",set_direction:"vali suund[ @ {direction}]",oscillate:"vali hajutus[ @ {oscillate}]"},humidifier:{set_humidity:"sea niiskus[ {humidity}]"},input_number:{set_value:"vali väärtus[ {value}]"},input_select:{select_option:"valik[ {option}]"},light:{turn_on:"lülita sisse[ heledusega {brightness}]"},media_player:{select_source:"vali sisend[ {source}]"},script:{script:"käivitae"},vacuum:{start_pause:"alusta/ootele"},water_heater:{set_away_mode:"kodust ära"}},zt={alarm_control_panel:"valvepaneel",climate:"kliimaseade",cover:"aknakatted",fan:"ventilaatorid",group:"grupid",humidifier:"niisutajad",input_boolean:"tõeväärtus",input_number:"numbriline valik",input_select:"valikmenüü",light:"valgustid",lock:"lukud",media_player:"meediamängijad",scene:"stseenid",script:"skriptud",switch:"lülitid",vacuum:"tolmuimejad",water_heater:"veeboilerid"},St={components:{date:{day_types_short:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},day_types_long:{daily:"iga päev",workdays:"tööpäevadel",weekend:"nädalavahetusel"},days:"päeva",tomorrow:"homme",repeated_days:"iga {days} järel",repeated_days_except:"iga päev aga mitte {excludedDays}",days_range:"{startDay} kuni {endDay}"},time:{absolute:"{time}",interval:"{startTime} kuni {endTime}",at_midnight:"keskööl",at_noon:"keskpäeval",at_sun_event:"{sunEvent}"}},panel:{common:{title:"Ajastaja"},overview:{no_entries:"Ajastused puuduvad",excluded_items:"välja on jäetud {number}  {if number is 1} ajastus {else} ajastust",hide_excluded:"peida välja jäetud ajastused",additional_tasks:"veel {number} {if number is 1} ajastus {else} ajastust"},entity_picker:{no_groups_defined:"Gruppe pole valitud",no_group_selected:"Vali alustuseks grupid",no_entities_for_group:"Selles grupis puuduvad olemid",no_entity_selected:"Vali alustuseks olem",no_actions_for_entity:"Selle olemi jaoks pole tegevusi",make_scheme:"loo skeem"},time_picker:{no_timeslot_selected:"Alustuseks vali ajavahemik"},conditions:{equal_to:"võrdub",unequal_to:"ei võrdu",all:"kõik",any:"iga",no_conditions_defined:"Tingimusi pole määratud"},options:{repeat_type:"toiming peale käivitumist"}}},jt={services:$t,domains:zt,ui:St},Ot=Object.freeze({__proto__:null,services:$t,domains:zt,ui:St,default:jt}),Et={generic:{parameter_to_value:"{parameter} vers {value}",action_with_parameter:"{action} avec {parameter}"},climate:{set_temperature:"ajuster la température[ à {temperature}]",set_temperature_hvac_mode_heat:"chauffe[ à {temperature}]",set_temperature_hvac_mode_cool:"refroidit[ à {temperature}]",set_hvac_mode:"ajuster le mode[ à {hvac_mode}]",set_preset_mode:"choisir le pré-réglage[ {preset_mode}]"},cover:{close_cover:"fermer",open_cover:"ouvrir",set_cover_position:"ajuster la position[ à {position}]"},fan:{set_speed:"ajuster la vitesse[ à {speed}]",set_direction:"ajuster l'orientation[ vers {direction}]",oscillate:"ajuster l'oscillation[ à {oscillate}]"},humidifier:{set_humidity:"ajuster l'humidité[ à {humidity}]"},input_number:{set_value:"ajuster la valeur[ à {value}]"},input_select:{select_option:"choisir l'option[ {option}]"},light:{turn_on:"allumer[ avec une luminosité de {brightness}]"},media_player:{select_source:"choisir la source[ {source}]"},script:{script:"exécuter"},vacuum:{start_pause:"démarrer / pause"},water_heater:{set_away_mode:"choisir le mode absent"}},Ct={alarm_control_panel:"panneau de contrôle de l'alarme",climate:"thermostat",cover:"volet",fan:"ventilateur",group:"groupe",humidifier:"humidificateur",input_boolean:"entrée booléenne",input_number:"entrée numérique",input_select:"entrée de sélection",light:"lumière",lock:"serrure",media_player:"lecteur multimédia",scene:"scène",script:"script",switch:"interrupteur",vacuum:"aspirateur",water_heater:"chauffe eau"},At={components:{date:{day_types_short:{daily:"quotidien",workdays:"jours de travail",weekend:"weekend"},day_types_long:{daily:"chaque jour",workdays:"en semaine",weekend:"le weekend"},days:"jours",tomorrow:"demain",repeated_days:"chaque {days}",repeated_days_except:"chaque jour sauf {excludedDays}",days_range:"de {startDay} à {endDay}"},time:{absolute:"à {time}",interval:"de {startTime} à {endTime}",at_midnight:"à minuit",at_noon:"à midi",at_sun_event:"au {sunEvent}"}},panel:{common:{title:"Planificateur"},overview:{no_entries:"il n'y a pas d'entrée à montrer",excluded_items:"{number} {if number is 1}entrée exclue{else}entrées exclues",hide_excluded:"cacher les entrées exclues",additional_tasks:"{number} {if number is 1}tâche à venir{else}tâches à venir"},entity_picker:{no_groups_defined:"Aucun groupe défini",no_group_selected:"Choisir un groupe en premier",no_entities_for_group:"Il n'y a pas d'entité dans ce groupe",no_entity_selected:"Choisir une entité en premier",no_actions_for_entity:"Il n'y a pas d'action pour cette entité",make_scheme:"créer un schéma"},time_picker:{no_timeslot_selected:"Choisir d'abord une plage horaire"},conditions:{equal_to:"égal à",unequal_to:"pas égal à",all:"tous",any:"tout",no_conditions_defined:"Il n'y a pas de condition définie"},options:{repeat_type:"comportement après déclenchement"}}},Tt={services:Et,domains:Ct,ui:At},Dt=Object.freeze({__proto__:null,services:Et,domains:Ct,ui:At,default:Tt}),Nt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_heat:"hőmérséklet[ to {temperature}]",set_temperature_hvac_mode_cool:"hőmérséklet[ to {temperature}]",set_hvac_mode:"mód beállítása[ to {hvac_mode}]",set_preset_mode:"preset beállítása[ {preset_mode}]"},cover:{close_cover:"zárás",open_cover:"nyitás",set_cover_position:"változtass pozíciót[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"érték beállítása[ to {value}]"},input_select:{select_option:"opció kiválasztása[ {option}]"},light:{turn_on:"bekapcsolás[ with {brightness} brightness]"},media_player:{select_source:"forrás kiválasztása[ {source}]"},script:{script:"kezdés"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},Mt={alarm_control_panel:"alarm control panel",climate:"termosztát",cover:"redőny",fan:"ventilátor",group:"csoportok",humidifier:"humifiers",input_boolean:"logikai bemenet",input_number:"szám bemenet",input_select:"legördülő bemenet",light:"lámpa",lock:"locks",media_player:"lejátszó",scene:"jelenetek",script:"scripts",switch:"kapcsoló",vacuum:"pórszívó",water_heater:"water heaters"},Pt={components:{date:{day_types_short:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},day_types_long:{daily:"minden nap",workdays:"munkanapokon",weekend:"hétvégén"},days:"Napokon",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"{time}-kor",interval:"{startTime} - {endTime}",at_midnight:"éjfélkor",at_noon:"délben",at_sun_event:"{sunEvent}kor"}},panel:{common:{title:"Időzítések"},overview:{no_entries:"Nincs megjeleníthető elem",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"még {number} feladat"},entity_picker:{no_groups_defined:"Nincsenek deffiniált csoportok",no_group_selected:"Előbb egy csoportot szükséges választani",no_entities_for_group:"Ebben a csoportban nem találhatók entitások",no_entity_selected:"Előbb egy entitást szükséges választani",no_actions_for_entity:"Ehhez az entitáshoz nem tartoznak műveletek",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},It={services:Nt,domains:Mt,ui:Pt},Lt=Object.freeze({__proto__:null,services:Nt,domains:Mt,ui:Pt,default:It}),qt={generic:{parameter_to_value:"{parameter} a {value}",action_with_parameter:"{action} con {parameter}"},climate:{set_temperature:"imposta temperatura[ a {temperature}]",set_temperature_hvac_mode_heat:"riscaldamento[ a {temperature}]",set_temperature_hvac_mode_cool:"raffrescamento[ a {temperature}]",set_hvac_mode:"imposta modalità[ a {hvac_mode}]",set_preset_mode:"imposta programmazione[ {preset_mode}]"},cover:{close_cover:"chiuso",open_cover:"aperto",set_cover_position:"imposta posizione[ su {position}]"},fan:{set_speed:"imposta velocità[ a {speed}]",set_direction:"imposta direzione[ a {direction}]",oscillate:"imposta oscillazione[ a {oscillate}]"},humidifier:{set_humidity:"imposta umidità[ a {humidity}]"},input_number:{set_value:"imposta valore[ a {value}]"},input_select:{select_option:"seleziona opzione[ {option}]"},light:{turn_on:"accendi[ con il {brightness} di luminosità]"},media_player:{select_source:"seleziona sorgente[ {source}]"},script:{script:"esegui"},vacuum:{start_pause:"avvia / pausa"},water_heater:{set_away_mode:"imposta fuori casa"}},Vt={alarm_control_panel:"pannello di controllo allarme",climate:"clima",cover:"cover",fan:"ventole",group:"gruppi",humidifier:"umidificatori",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"luci",lock:"lucchetti",media_player:"media player",scene:"scene",script:"script",switch:"interruttori",vacuum:"aspirapolveri",water_heater:"scaldabagno"},Ut={components:{date:{day_types_short:{daily:"giornaliero",workdays:"giorni lavorativi",weekend:"weekend"},day_types_long:{daily:"ogni giorno",workdays:"nei giorni lavorativi",weekend:"nel weekend"},days:"days",tomorrow:"tomorrow",repeated_days:"ogni {days}",repeated_days_except:"ogni giorno tranne {excludedDays}",days_range:"{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}"},time:{absolute:"alle {time}",interval:"dalle {startTime} alle {endTime}",at_midnight:"a mezzanotte",at_noon:"a mezzogiorno",at_sun_event:"al {sunEvent}"}},panel:{common:{title:"Schedulatore"},overview:{no_entries:"Non ci sono oggetti da visualizzare",excluded_items:"{number} {if number is 1} oggetto escluso {else} oggetti esclusi",hide_excluded:"Nascondi oggetti esclusi",additional_tasks:"{number} attività in più"},entity_picker:{no_groups_defined:"Non ci sono gruppi definiti",no_group_selected:"Seleziona prima un gruppo",no_entities_for_group:"Non ci sono entità in questo gruppo",no_entity_selected:"Seleziona prima un'entità",no_actions_for_entity:"Non ci sono azioni per questa entità",make_scheme:"crea schema"},time_picker:{no_timeslot_selected:"Seleziona prima una fascia oraria"},conditions:{equal_to:"uguale",unequal_to:"non uguale",all:"tutte",any:"qualunque",no_conditions_defined:"Non ci sono condizioni definite"},options:{repeat_type:"comportamento dopo l'attivazione"}}},Ht={services:qt,domains:Vt,ui:Ut},Rt=Object.freeze({__proto__:null,services:qt,domains:Vt,ui:Ut,default:Ht}),Wt={generic:{parameter_to_value:"{parameter} naar {value}",action_with_parameter:"{action} met {parameter}"},climate:{set_temperature:"temperatuur instellen[ naar {temperature}]",set_temperature_hvac_mode_heat:"verwarmen[ naar {temperature}]",set_temperature_hvac_mode_cool:"koelen[ naar {temperature}]",set_hvac_mode:"modus aanpassen[ naar {hvac_mode}]",set_preset_mode:"programma[ {preset_mode}] instellen"},cover:{close_cover:"sluiten",open_cover:"openen",set_cover_position:"positie instellen[ naar {position}]"},fan:{set_speed:"snelheid instellen[ op {speed}]",set_direction:"richting instellen[ naar {direction}]",oscillate:"zet oscillatie[ naar {oscillate}]"},humidifier:{set_humidity:"luchtvochtigheid instellen [ op {humidity}]"},input_number:{set_value:"waarde aanpassen[ naar {value}]"},input_select:{select_option:"selecteer optie[ {option}]"},light:{turn_on:"inschakelen[ met {brightness} helderheid]"},media_player:{select_source:"kies ingang[ {source}]"},script:{script:"uitvoeren"},vacuum:{start_pause:"start / pauzeer"},water_heater:{set_away_mode:"stel afwezigheidsmode in"}},Yt={alarm_control_panel:"alarmsystemen",climate:"verwarming",cover:"zonwering",fan:"ventilatie",group:"groepen",humidifier:"luchtbevochtigers",input_boolean:"input_boolean",input_number:"input_number",input_select:"input_select",light:"verlichting",lock:"sloten",media_player:"mediaspelers",scene:"scènes",script:"scripts",switch:"schakelaars",vacuum:"stofzuigers",water_heater:"waterverwarming"},Bt={components:{date:{day_types_short:{daily:"dagelijks",workdays:"werkdagen",weekend:"weekend"},day_types_long:{daily:"iedere dag",workdays:"doordeweeks",weekend:"in het weekend"},days:"dagen",tomorrow:"morgen",repeated_days:"elke {days}",repeated_days_except:"elke dag behalve {excludedDays}",days_range:"van {startDay} tot {endDay}"},time:{absolute:"om {time}",interval:"van {startTime} tot {endTime}",at_midnight:"om middernacht",at_noon:"om 12:00",at_sun_event:"bij {sunEvent}"}},panel:{common:{title:"Tijdplanner"},overview:{no_entries:"Er zijn geen items aangemaakt",excluded_items:"{number} uitgesloten {if number is 1} item {else} items",hide_excluded:"verberg uitgesloten items",additional_tasks:"{number} overige {if number is 1} taak {else} taken"},entity_picker:{no_group_selected:"Selecteer eerst een groep",no_entity_selected:"Selecteer eerst een entiteit",no_groups_defined:"Er zijn geen groepen gedefinieerd",no_entities_for_group:"Deze groep heeft geen entiteiten",no_actions_for_entity:"Deze entiteit heeft geen acties",make_scheme:"maak schema"},time_picker:{no_timeslot_selected:"Kies eerst een tijdsslot"},conditions:{equal_to:"is",unequal_to:"is niet",all:"en",any:"of",no_conditions_defined:"Er zijn geen voorwaarden gedefinieerd"},options:{repeat_type:"gedrag na activeren"}}},Gt={services:Wt,domains:Yt,ui:Bt},Ft=Object.freeze({__proto__:null,services:Wt,domains:Yt,ui:Bt,default:Gt}),Jt={generic:{parameter_to_value:"{parameter} to {value}",action_with_parameter:"{action} with {parameter}"},climate:{set_temperature:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_heat:"sett temperatur[ to {temperature}]",set_temperature_hvac_mode_cool:"sett temperatur[ to {temperature}]",set_hvac_mode:"set mode[ to {hvac_mode}]",set_preset_mode:"set preset[ {preset_mode}]"},cover:{close_cover:"lukk",open_cover:"åpne",set_cover_position:"sett posisjon[ to {position}]"},fan:{set_speed:"set speed[ to {speed}]",set_direction:"set direction[ to {direction}]",oscillate:"set oscillation[ to {oscillate}]"},humidifier:{set_humidity:"set humidity[ to {humidity}]"},input_number:{set_value:"set value[ to {value}]"},input_select:{select_option:"select option[ {option}]"},light:{turn_on:"slå på[ with {brightness} brightness]"},media_player:{select_source:"select source[ {source}]"},script:{script:"execute"},vacuum:{start_pause:"start / pause"},water_heater:{set_away_mode:"set away mode"}},Zt={alarm_control_panel:"alarm control panel",climate:"klima",cover:"covers",fan:"vifter",group:"groups",humidifier:"humidifiers",input_boolean:"input boolean",input_number:"input number",input_select:"input select",light:"lys",lock:"locks",media_player:"media players",scene:"scenes",script:"scripts",switch:"brytere",vacuum:"støvsugere",water_heater:"water heaters"},Kt={components:{date:{day_types_short:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},day_types_long:{daily:"hver dag",workdays:"ukedager",weekend:"weekend"},days:"Dager",tomorrow:"tomorrow",repeated_days:"every {days}",repeated_days_except:"every day except {excludedDays}",days_range:"from {startDay} to {endDay}"},time:{absolute:"at {time}",interval:"from {startTime} to {endTime}",at_midnight:"at midnight",at_noon:"at noon",at_sun_event:"at {sunEvent}"}},panel:{common:{title:"Tidsplan"},overview:{no_entries:"Det er ingen definerte tidsplaner å vise",excluded_items:"{number} excluded {if number is 1} item {else} items",hide_excluded:"hide excluded items",additional_tasks:"{number} more {if number is 1} task {else} tasks"},entity_picker:{no_groups_defined:"Ingen grupper definert",no_group_selected:"Velg en gruppe først",no_entities_for_group:"Det finnes ingen entiteter i denne gruppen",no_entity_selected:"Velg en entitet først",no_actions_for_entity:"Det finnes ingen handlinger for denne entiteten",make_scheme:"make scheme"},time_picker:{no_timeslot_selected:"Select a timeslot first"},conditions:{equal_to:"is",unequal_to:"is not",all:"all",any:"any",no_conditions_defined:"There are no conditions defined"},options:{repeat_type:"behaviour after triggering"}}},Qt={services:Jt,domains:Zt,ui:Kt},Xt=Object.freeze({__proto__:null,services:Jt,domains:Zt,ui:Kt,default:Qt}),ei={generic:{parameter_to_value:"{parameter} na {value}",action_with_parameter:"{action} z {parameter}"},climate:{set_temperature:"ustaw temperaturę[ na {temperature}]",set_temperature_hvac_mode_heat:"grzej[ do {temperature}]",set_temperature_hvac_mode_cool:"chłodź[ do {temperature}]",set_hvac_mode:"ustaw tryb[ na {hvac_mode}]",set_preset_mode:"ustaw preset[ {preset_mode}]"},cover:{close_cover:"zamknij",open_cover:"otwórz",set_cover_position:"ustaw pozycję[ na {position}]"},fan:{set_speed:"ustaw prędkość[ na {speed}]",set_direction:"ustaw kierunek[ na {direction}]",oscillate:"ustaw oscylacje[ na {oscillate}]"},humidifier:{set_humidity:"ustaw wilgotność[ na {humidity}]"},input_number:{set_value:"ustaw wartość[ na {value}]"},input_select:{select_option:"wybierz opcję[ {option}]"},light:{turn_on:"zapal[ z jasnością {brightness}]"},media_player:{select_source:"wybierz źródło[ {source}]"},script:{script:"wykonaj"},vacuum:{start_pause:"start / pauza"},water_heater:{set_away_mode:"ustaw tryb nieobecności"}},ti={alarm_control_panel:"panel kontrolny alarmu",climate:"klimatyzacja",cover:"rolety",fan:"wentylatory",group:"grupy",humidifier:"nawilżacze",input_boolean:"wejście logiczne",input_number:"wejście liczbowe",input_select:"wybór wejścia",light:"światła",lock:"zamki",media_player:"odtwarzacze",scene:"sceny",script:"skrypty",switch:"przełączniki",vacuum:"odkurzacze",water_heater:"podgrzewacze wody"},ii={components:{date:{day_types_short:{daily:"codziennie",workdays:"robocze",weekend:"weekendy"},day_types_long:{daily:"codziennie",workdays:"w dni robocze",weekend:"podczas weekendu"},days:"dni",tomorrow:"jutro",repeated_days:"co {days} dni",repeated_days_except:"coddziennie z wyjątkiem {excludedDays}",days_range:"od {startDay} do {endDay}"},time:{absolute:"o {time}",interval:"od {startTime} do {endTime}",at_midnight:"o północ",at_noon:"o południe",at_sun_event:"o {sunEvent}"}},panel:{common:{title:"Harmonogram"},overview:{no_entries:"Nie ma elementów do pokazania",excluded_items:"{number} wykluczona {if number is 1} pozycja {else} pozycje",hide_excluded:"ukryj wykluczone pozycje",additional_tasks:"{number} dodatkowe {if number is 1} zadanie {else} zadań(nia)"},entity_picker:{no_groups_defined:"Nie ma zdefiniowanych grup",no_group_selected:"Najpierw wybierz grupę",no_entities_for_group:"Nie ma encji w tej grupie",no_entity_selected:"Najpierw wybierz encję",no_actions_for_entity:"Nie ma akcji dla tej encji",make_scheme:"stwórz schemat"},time_picker:{no_timeslot_selected:"Najpierw wybierz przedział czasowy"},conditions:{equal_to:"jest równe ",unequal_to:"nie jest równe",all:"wszystkie",any:"dowolny",no_conditions_defined:"Nie ma zdefiniowanych warunków"},options:{repeat_type:"zachowanie po wyzwoleniu"}}},si={services:ei,domains:ti,ui:ii},ai={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},ni={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},oi={components:{date:{day_types_short:{daily:"todos",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"Às {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"É necessário selecionar um período horário para escolher uma ação"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},ri={services:ai,domains:ni,ui:oi},ci={generic:{parameter_to_value:"{parameter} para {value}",action_with_parameter:"{action} com {parameter}"},climate:{set_temperature:"definir temperatura[ para {temperature}]",set_temperature_hvac_mode_heat:"aquecimento[ para {temperature}]",set_temperature_hvac_mode_cool:"arrefecimento[ para {temperature}]",set_hvac_mode:"definir modo[ para {hvac_mode}]",set_preset_mode:"definir predefinição[ {preset_mode}]"},cover:{close_cover:"fechar",open_cover:"abrir",set_cover_position:"definir posição[ para {position}]"},fan:{set_speed:"definir velocidade[ para {speed}]",set_direction:"definir direção[ para {direction}]",oscillate:"definir oscilação[ para {oscillate}]"},humidifier:{set_humidity:"definir humidade[ para {humidity}]"},input_number:{set_value:"definir valor[ para {value}]"},input_select:{select_option:"selecionar opção[ {option}]"},light:{turn_on:"ligar[ com {brightness} brightness]"},media_player:{select_source:"selecionar origem[ {source}]"},script:{script:"executar"},vacuum:{start_pause:"iniciar / pausar"},water_heater:{set_away_mode:"definir modo ausente"}},li={alarm_control_panel:"painel de controlo de alarme",climate:"ambiente",cover:"estores",fan:"ventiladores",group:"grupos",humidifier:"humidificadores",input_boolean:"campo booleano",input_number:"campo numérico",input_select:"campo de opção",light:"iluminação",lock:"fechaduras",media_player:"reprodutores de mídia",scene:"cenas",script:"scripts",switch:"interruptores",vacuum:"aspiradores",water_heater:"aquecedores hidráulicos"},di={components:{date:{day_types_short:{daily:"diário",workdays:"semana de trabalho",weekend:"fim-de-semana"},day_types_long:{daily:"todos os dias",workdays:"em dias de semana",weekend:"no fim-de-semana"},days:"dias",tomorrow:"amanhã",repeated_days:"a cada {days}",repeated_days_except:"a cada dia exceto {excludedDays}",days_range:"até {startDay} até {endDay}"},time:{absolute:"à {time}",interval:"das {startTime} às {endTime}",at_midnight:"ao meia-noite",at_noon:"ao meio-dia",at_sun_event:"ao {sunEvent}"}},panel:{common:{title:"Agenda"},overview:{no_entries:"Não existem itens a mostrar",excluded_items:"{number}{if number is 1} item excluído {else} itens excluídos",hide_excluded:"ocultar itens excluídos",additional_tasks:"Mais {number} {if number is 1} tarefa {else} tarefas"},entity_picker:{no_groups_defined:"Não existem grupos definidos",no_group_selected:"Selecione um grupo primeiro",no_entities_for_group:"Não existem entidades neste grupo",no_entity_selected:"Selecione uma entidade primeiro",no_actions_for_entity:"Não existem ações para esta entidade",make_scheme:"criar esquema"},time_picker:{no_timeslot_selected:"Selecionar um período horário primeiro"},conditions:{equal_to:"é",unequal_to:"não é",all:"todos(as)",any:"qualquer",no_conditions_defined:"Não existem condições definidas"},options:{repeat_type:"comportamento após ativação"}}},ui={services:ci,domains:li,ui:di},hi={generic:{parameter_to_value:"{parameter} la {value}",action_with_parameter:"{action} cu {parameter}"},climate:{set_temperature:"setare temperatură[ la {temperature}]",set_temperature_hvac_mode_heat:"încălzire[ la {temperature}]",set_temperature_hvac_mode_cool:"răcire[ la {temperature}]",set_hvac_mode:"setare mod[ la {hvac_mode}]",set_preset_mode:"setare preset[ {preset_mode}]"},cover:{close_cover:"închidere",open_cover:"deschidere",set_cover_position:"setare poziție[ la {position}]"},fan:{set_speed:"setare viteză[ la {speed}]",set_direction:"setare direcție[ la {direction}]",oscillate:"setare oscilare[ la {oscillate}]"},humidifier:{set_humidity:"setare umiditate[ la {humidity}]"},input_number:{set_value:"setare valoare[ la {value}]"},input_select:{select_option:"selectare opțiune[ {option}]"},light:{turn_on:"pornire[ cu luminozitate {brightness}]"},media_player:{select_source:"selectare sursă[ {source}]"},script:{script:"executare"},vacuum:{start_pause:"start / pauză"},water_heater:{set_away_mode:"setare mod plecat"}},pi={alarm_control_panel:"panou control alarmă",climate:"climat",cover:"jaluzele",fan:"ventilatoare",group:"grupuri",humidifier:"umidificatoare",input_boolean:"input boolean",input_number:"input număr",input_select:"input selecție",light:"lumini",lock:"încuietori",media_player:"media playere",scene:"scene",script:"scripturi",switch:"întrerupătoare",vacuum:"aspiratoare",water_heater:"încălzitoare apă"},mi={components:{date:{day_types_short:{daily:"zilnic",workdays:"zile lucrătoare",weekend:"sfârșit de săptămână"},day_types_long:{daily:"zilnic",workdays:"în timpul săptămânii",weekend:"la sfârșit de săptămână"},days:"zile",tomorrow:"mâine",repeated_days:"la fiecare {days} zile",repeated_days_except:"zilnic cu excepția {excludedDays}",days_range:"din {startDay} până în {endDay}"},time:{absolute:"la {time}",interval:"de la {startTime} până la {endTime}",at_midnight:"la miezul nopții",at_noon:"la amiază",at_sun_event:"la {sunEvent}"}},panel:{common:{title:"Planificator"},overview:{no_entries:"Nu există elemente de afișat",excluded_items:"{if number is 1}un element exclus {else}{number} elemente excluse",hide_excluded:"ascunde elementele excluse",additional_tasks:"{if number is 1}o sarcină suplimentară {else}{number} sarcini suplimentare"},entity_picker:{no_groups_defined:"Nu există grupuri definite",no_group_selected:"Prima dată selectați un grup",no_entities_for_group:"Nu există entități definite în acest grup",no_entity_selected:"Prima dată selectați o entitate",no_actions_for_entity:"Nu există acțiuni pentru această entitate",make_scheme:"creare schemă"},time_picker:{no_timeslot_selected:"Prima dată selectați un interval orar"},conditions:{equal_to:"este",unequal_to:"nu este",all:"tot",any:"oricare",no_conditions_defined:"Nu există condiții definite"},options:{repeat_type:"comportament după declanșare"}}},_i={services:hi,domains:pi,ui:mi},gi={generic:{parameter_to_value:"{parameter} к {value}",action_with_parameter:"{action} с {parameter}"},climate:{set_temperature:"установить температуру[ {temperature}]",set_temperature_hvac_mode_heat:"обогрев[ {temperature}]",set_temperature_hvac_mode_cool:"охлаждение[ {temperature}]",set_hvac_mode:"установить режим[ {hvac_mode}]",set_preset_mode:"выбрать набор настроек[ {preset_mode}]"},cover:{close_cover:"закрыть",open_cover:"открыть",set_cover_position:"установить позицию[ {position}]"},fan:{set_speed:"установить скорость[ {speed}]",set_direction:"установить направление[ {direction}]",oscillate:"установить колебание[ {oscillate}]"},humidifier:{set_humidity:"установить влажность[ {humidity}]"},input_number:{set_value:"установить значение[ в {value}]"},input_select:{select_option:"установить опцию[ {option}]"},light:{turn_on:"включить[ с {brightness} яркостью]"},media_player:{select_source:"выбрать источник[ {source}]"},script:{script:"запустить"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_away_mode:"установить режим вне дома"}},vi={alarm_control_panel:"панель управления сигнализацией",climate:"климат",cover:"жалюзи",fan:"вентиляторы",group:"группы",humidifier:"увлажнители",input_boolean:"логические",input_number:"числовые",input_select:"списки",light:"освещение",lock:"замки",media_player:"медиа-плееры",scene:"сцены",script:"скрипты",switch:"розетки",vacuum:"пылесосы",water_heater:"подогреватели воды"},fi={components:{date:{day_types_short:{daily:"ежедневно",workdays:"рабочие дни",weekend:"выходные"},day_types_long:{daily:"каждый день",workdays:"по рабочим дням",weekend:"в выходные"},days:"дни",tomorrow:"завтра",repeated_days:"каждый {days}",repeated_days_except:"каждый день кроме {excludedDays}",days_range:"с {startDay} до {endDay}"},time:{absolute:"в {time}",interval:"с {startTime} до {endTime}",at_midnight:"в полночь",at_noon:"в полдень",at_sun_event:"в {sunEvent}"}},panel:{common:{title:"Планировщик"},overview:{no_entries:"Отсутствуют элементы",excluded_items:"{number} исключено {if number is 1} элемент {else} элементов",hide_excluded:"скрыть исключенные элементы",additional_tasks:"{number} больше {if number is 1} задача {else} задач"},entity_picker:{no_groups_defined:"Не определены группы",no_group_selected:"Выберите группу",no_entities_for_group:"Отсутствуют элементы в группе",no_entity_selected:"Выберите элемент",no_actions_for_entity:"Нет действий для этого элемента",make_scheme:"создать схему"},time_picker:{no_timeslot_selected:"Выберите временной слот"},conditions:{equal_to:"равно",unequal_to:"не равно",all:"все",any:"любое",no_conditions_defined:"Не определены условия"},options:{repeat_type:"поведение после срабатывания"}}},yi={services:gi,domains:vi,ui:fi},bi={generic:{parameter_to_value:"{parameter} до {value}",action_with_parameter:"{action} з {parameter}"},climate:{set_temperature:"встановити температуру[ to {temperature}]",set_temperature_hvac_mode_heat:"нагрів[ to {temperature}]",set_temperature_hvac_mode_cool:"охолодження[ to {temperature}]",set_hvac_mode:"встановити режим[ to {hvac_mode}]",set_preset_mode:"вибрати пресет[ to {preset_mode}]"},cover:{close_cover:"закрити",open_cover:"відкрити",set_cover_position:"встановити позицію[ to {position}]"},fan:{set_speed:"встановити швидкість[ to {speed}]",set_direction:"встановити напрямок[ to {direction}]",oscillate:"встановити коливання[ to {oscillate}]"},humidifier:{set_humidity:"встановити вологість[ to {humidity}]"},input_number:{set_value:"встановити значення[ to {value}]"},input_select:{select_option:"встановити опцію[ {option}]"},light:{turn_on:"увімкнути[ з {brightness} якскравістю]"},media_player:{select_source:"вибрати джерело[ {source}]"},script:{script:"виконати"},vacuum:{start_pause:"старт / пауза"},water_heater:{set_away_mode:"встановити режим Не вдома"}},wi={alarm_control_panel:"панель керування сигналізацією",climate:"клімат",cover:"жалюзі",fan:"вентилятори",group:"групи",humidifier:"зволожувачі",input_boolean:"логічні",input_number:"числові",input_select:"списки",light:"освітлення",lock:"замки",media_player:"медіаплеєри",scene:"сцени",script:"скрипти",switch:"вимикачі",vacuum:"пилососи",water_heater:"водонагрівачі"},ki={components:{date:{day_types_short:{daily:"щоденно",workdays:"робочі дні",weekend:"вихідні"},day_types_long:{daily:"кожного дня",workdays:"в робочі дні",weekend:"по вихідних"},days:"дні",tomorrow:"завтра",repeated_days:"кожні {days}",repeated_days_except:"кожного дня окрім {excludedDays}",days_range:"з {startDay} до {endDay}"},time:{absolute:"о {time}",interval:"з {startTime} до {endTime}",at_midnight:"опівночі",at_noon:"опівдні",at_sun_event:"о {sunEvent}"}},panel:{common:{title:"Планувальник"},overview:{no_entries:"Елементи відсутні",backend_error:"Не вдалося підключитися до компонента планувальника. Перш ніж використовувати цю карту, її потрібно встановити як інтеграцію.",excluded_items:"{number} виключено {if number is 1} елемент {else} елементів",hide_excluded:"сховати виключені елементи",additional_tasks:"{number} більше {if number is 1} завдання {else} завдань"},entity_picker:{no_groups_defined:"Немає визначених груп",no_group_selected:"Спершу виберіть групу",no_entities_for_group:"В даній групі відсутні елементи",no_entity_selected:"Спершу виберіть елемент",no_actions_for_entity:"Немає дій для цього елемента",make_scheme:"створити схему",multiple:"Декілька"},time_picker:{no_timeslot_selected:"Спершу виберіть часовий проміжок"},conditions:{equal_to:"дорівнює",unequal_to:"не рівне",all:"всі",any:"будь-яке",no_conditions_defined:"Не визначені умови"},options:{repeat_type:"поведінка після спрацювання"}}},xi={services:bi,domains:wi,ui:ki};const $i={cs:ct,de:pt,en:ft,es:xt,et:Ot,es_419:xt,fr:Dt,hu:Lt,it:Rt,nb:Xt,nl:Ft,nn:Xt,no:Xt,pl:Object.freeze({__proto__:null,services:ei,domains:ti,ui:ii,default:si}),pt:Object.freeze({__proto__:null,services:ai,domains:ni,ui:oi,default:ri}),pt_BR:Object.freeze({__proto__:null,services:ci,domains:li,ui:di,default:ui}),ro:Object.freeze({__proto__:null,services:hi,domains:pi,ui:mi,default:_i}),ru:Object.freeze({__proto__:null,services:gi,domains:vi,ui:fi,default:yi}),uk:Object.freeze({__proto__:null,services:bi,domains:wi,ui:ki,default:xi})};function zi(e,t,i="",s=""){let a;try{if("test"==t)return"TRANSLATED";a=e.split(".").reduce((e,t)=>e[t],$i[t]),a||(a=e.split(".").reduce((e,t)=>e[t],$i.en))}catch(t){try{a=e.split(".").reduce((e,t)=>e[t],$i.en)}catch(e){a=""}}if(""!==i&&""!==s&&a){Array.isArray(i)||(i=[i]),Array.isArray(s)||(s=[s]);for(let e=0;e<i.length;e++){a=a.replace(String(i[e]),String(s[e]));const t=a.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);if(t&&String(i[e]).replace(/[\{\}']+/g,"")==t[1]){a=String(s[e])==t[2]?a.replace(t[0],t[3]):a.replace(t[0],t[4])}}}return a}const Si=ie`
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
  `,ji=e=>{class i extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([K({attribute:!1})],i.prototype,"hass",void 0),i},Oi=new WeakMap,Ei=(e=>(...t)=>{const i=e(...t);return _.set(i,!0),i})(e=>t=>{if(!(t instanceof j))throw new Error("unsafeHTML can only be used in text bindings");const i=Oi.get(t);if(void 0!==i&&x(e)&&e===i.value&&t.value===i.fragment)return;const s=document.createElement("template");s.innerHTML=e;const a=document.importNode(s.content,!0);t.setValue(a),Oi.set(t,{value:e,fragment:a})});const Ci=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];const Ai=function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}return!1}()?(e,t,i)=>{if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}return e.toLocaleDateString(t,{weekday:i?"short":"long"})}:(e,t,i)=>function(e,t,i){if("object"!=typeof e){let t=new Date(2017,1,26);t.setDate(t.getDate()+e),e=t}let s=e.getDay();return i?Ci[s].substr(0,3):Ci[s]}(e,0,i),Ti=[60,60,24,7],Di=["second","minute","hour","day"];let Ni=class extends ae{constructor(){super(...arguments),this.updateInterval=60,this.timer=0}startRefreshTimer(e){clearInterval(this.timer),this.timer=window.setInterval(()=>{this.requestUpdate()},1e3*e),this.updateInterval=e}set hass(e){this._hass=e,this.startRefreshTimer(this.updateInterval)}relativeTime(e){if(!this._hass)return"";const t=new Date;let i=(t.getTime()-e.getTime())/1e3;const s=i>=0?"past":"future";i=Math.abs(i);let a=Math.round(i);if(0===a)return this._hass.localize("ui.components.relative_time.just_now");if("future"==s){if(i/3600>=6){const i=t.setHours(0,0,0,0),s=Math.floor((e.valueOf()-i.valueOf())/864e5);let a="";1==s?a=zi("ui.components.date.tomorrow",this._hass.language):s>0&&(a=Ai(e,this._hass.language));let n=zi("ui.components.time.absolute",this._hass.language,"{time}",je(e,this._hass.language));return 12==e.getHours()&&0==e.getMinutes()?n=zi("ui.components.time.at_noon",this._hass.language):0==e.getHours()&&0==e.getMinutes()&&(n=zi("ui.components.time.at_midnight",this._hass.language)),String(a+" "+n).trim()}if(Math.round(i/60)>60&&Math.round(i/60)<120){const e=Math.round(i/60-60),t=this._hass.localize("ui.components.relative_time.duration.minute","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.hour","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.hour","count",1)} ${s} ${t}`}if(Math.round(i)>60&&Math.round(i)<120){const e=Math.round(i-60),t=this._hass.localize("ui.components.relative_time.duration.second","count",e),s=this._hass.localize("ui.common.and");if(this._hass.localize("ui.components.relative_time.future")){const e=this._hass.localize("ui.components.relative_time.duration.minute","count",1);return this._hass.localize("ui.components.relative_time.future","time",`${e} ${s} ${t}`)}return`${this._hass.localize("ui.components.relative_time.future_duration.minute","count",1)} ${s} ${t}`}}let n="week";for(let e=0;e<Ti.length;e++){if(a<Ti[e]){n=Di[e];break}i/=Ti[e],a=Math.round(i)}if(this._hass.localize("ui.components.relative_time."+s)){const e=this._hass.localize("ui.components.relative_time.duration."+n,"count",a);return this._hass.localize("ui.components.relative_time."+s,"time",e)}return this._hass.localize(`ui.components.relative_time.${s}_duration.${n}`,"count",a)}render(){if(!this._hass||!this.datetime)return L``;const e=new Date,t=Math.round((this.datetime.valueOf()-e.valueOf())/1e3);let i=60;return Math.abs(t)<=150&&(i=Math.max(Math.ceil(Math.abs(t))/10,2)),this.updateInterval!=i&&this.startRefreshTimer(i),L`
      ${Xe(this.relativeTime(this.datetime))}
    `}};t([K()],Ni.prototype,"_hass",void 0),t([K()],Ni.prototype,"datetime",void 0),Ni=t([J("my-relative-time")],Ni);function Mi(e){return{type:Pe.Level,field:e.field,name:e.name||e.field,min:e.min||0,max:e.max||255,step:e.step||1,optional:e.optional||!1,unit:e.unit||""}}function Pi(e){const t=[];e.options.forEach(e=>t.push(Object.assign({},e)));return{type:Pe.List,field:e.field,name:e.name||e.field,options:t.map(e=>e.name?e:Object.assign(e,{name:et(e.value)}))}}function Ii(e,t){if("%"==t.unit){const i=t.min,s=t.max,a=t.step;let n=(e-t.min)/((t.max-t.min)/100);return n=Math.round(n/a)*a,n<i?n=i:n>s&&(n=s),`${n}${t.unit}`}return`${e}${t.unit}`}const Li=(e,t)=>{const i=[{value:"none",name:e("state_attributes.climate.preset_mode.none"),icon:"hass:cancel"},{value:"eco",name:e("state_attributes.climate.preset_mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.climate.preset_mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.climate.preset_mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.climate.preset_mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.climate.preset_mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.climate.preset_mode.sleep"),icon:"hass:sleep"},{value:"activity",name:e("state_attributes.climate.preset_mode.activity"),icon:"hass:account-alert-outline"}];return t&&t.attributes.preset_modes&&Array.isArray(t.attributes.preset_modes)?t.attributes.preset_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i},qi=(e,t,i)=>{const s=t?t.attributes.hvac_modes:[];let a=((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:e("state.climate.off")},{value:"heat",icon:"hass:fire",name:e("state.climate.heat")},{value:"cool",icon:"hass:snowflake",name:e("state.climate.cool")},{value:"heat_cool",icon:"hass:thermometer",name:e("state.climate.heat_cool")},{value:"auto",icon:"hass:autorenew",name:e("state_attributes.climate.auto")},{value:"dry",icon:"hass:water-percent",name:e("state.climate.dry")},{value:"fan_only",icon:"hass:fan",name:e("state.climate.fan_only")}];return t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i})(e.localize,t);const n=Mi({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:(null==t?void 0:t.attributes.target_temp_step)?null==t?void 0:t.attributes.target_temp_step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),o=[{service:"climate.set_preset_mode",variable:Pi({field:"preset_mode",name:e.localize("ui.card.climate.preset_mode"),options:Li(e.localize,t)}),icon:"hass:cloud-download-outline",name:zi("services.climate.set_preset_mode",e.language),supported_feature:16}];return i&&!s.includes("off")||(o.push({service:"climate.set_hvac_mode",service_data:{hvac_mode:"off"},icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(a=a.filter(e=>"off"!=e.value))),i&&s.includes("off")||o.push({service:"climate.turn_off",icon:"hass:power",name:e.localize("ui.card.media_player.turn_off")}),i&&(s.includes("cool")||s.includes("heat"))||o.push({service:"climate.set_temperature",variable:n,icon:"hass:thermometer",name:zi("services.climate.set_temperature",e.language),supported_feature:1}),i&&!s.includes("heat")||(o.push({service:"climate.set_temperature",service_data:{hvac_mode:"heat"},variable:n,icon:"hass:fire",name:zi("services.climate.set_temperature_hvac_mode_heat",e.language),supported_feature:1}),i&&(a=a.filter(e=>"heat"!=e.value))),i&&!s.includes("cool")||(o.push({service:"climate.set_temperature",service_data:{hvac_mode:"cool"},variable:n,icon:"hass:snowflake",name:zi("services.climate.set_temperature_hvac_mode_cool",e.language),supported_feature:1}),i&&(a=a.filter(e=>"cool"!=e.value))),o.push({service:"climate.set_hvac_mode",variable:Pi({field:"hvac_mode",name:e.localize("ui.card.climate.operation"),options:a}),icon:"hass:cog-transfer-outline",name:zi("services.climate.set_hvac_mode",e.language)}),o},Vi=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage";case"door":return"hass:door-closed";case"shutter":return"hass:window-shutter";case"blind":return"hass:blinds";case"window":return"hass:window-closed";default:return"hass:window-shutter"}},Ui=e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"garage":return"hass:garage-open";case"door":return"hass:door-open";case"shutter":return"hass:window-shutter-open";case"blind":return"hass:blinds-open";case"window":return"hass:window-open";default:return"hass:window-shutter-open"}},Hi=(e,t)=>{const i=[{value:"off",icon:"hass:fan-off",name:e("state.default.off").toLowerCase()},{value:"low",icon:"hass:fan-speed-1",name:e("ui.card.climate.low").toLowerCase()},{value:"medium",icon:"hass:fan-speed-2"},{value:"high",icon:"hass:fan-speed-3",name:e("ui.card.climate.high").toLowerCase()}];return t&&t.attributes.speed_list&&Array.isArray(t.attributes.speed_list)?t.attributes.speed_list.map(e=>i.find(t=>t.value==e)||{value:e}):i},Ri=(e,t)=>{const i=[{value:"normal",name:e("state_attributes.humidifier.mode.normal"),icon:"hass:account-outline"},{value:"eco",name:e("state_attributes.humidifier.mode.eco"),icon:"hass:leaf"},{value:"away",name:e("state_attributes.humidifier.mode.away"),icon:"hass:car-traction-control"},{value:"boost",name:e("state_attributes.humidifier.mode.boost"),icon:"hass:rocket-launch-outline"},{value:"comfort",name:e("state_attributes.humidifier.mode.comfort"),icon:"hass:car-seat-cooler"},{value:"home",name:e("state_attributes.humidifier.mode.home"),icon:"hass:home-outline"},{value:"sleep",name:e("state_attributes.humidifier.mode.sleep"),icon:"hass:account-sleep"},{value:"auto",name:e("state_attributes.humidifier.mode.auto"),icon:"hass:autorenew"},{value:"baby",name:e("state_attributes.humidifier.mode.baby"),icon:"hass:baby-bottle-outline"}];return t&&t.attributes.available_modes&&Array.isArray(t.attributes.available_modes)?t.attributes.available_modes.map(e=>i.find(t=>t.value==e)||{value:e}):i},Wi=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?t.attributes.options.map(e=>({value:String(e)})):[],Yi=(e,t)=>t&&t.attributes.source_list&&Array.isArray(t.attributes.source_list)?Array(t.attributes.source_list).map(e=>({value:String(e)})):[],Bi=(e,t)=>t&&t.attributes.options&&Array.isArray(t.attributes.options)?Array(t.attributes.options).map(e=>({value:String(e)})):[];function Gi(e){const t=e=>Object.entries(e).sort((e,t)=>e[0]>t[0]?1:-1).map(([e,i])=>[e,"object"==typeof i&&null!==i?t(i):i]).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{});let i={service:e.service};e.service_data&&Object.keys(e.service_data).length&&(i=Object.assign(Object.assign({},i),{service_data:e.service_data}),i=t(i));return Object.values(i).map(e=>JSON.stringify(e).replace(/[\W]/g," ").split(" ").filter(e=>" "!=e&&""!=e).join("_")).join("_")}function Fi(e,t){return Gi(e)==Gi(t)||!!e.variable&&Gi(e)==Gi(Object.assign(Object.assign({},t),{service_data:Ze(t.service_data,[e.variable.field])}))}function Ji(e,t,i=!1){try{const n=Oe(e),o=t.states[e];switch(n){case"alarm_control_panel":return((e,t)=>[{service:"alarm_control_panel.alarm_disarm",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.alarm_control_panel.disarm")},{service:"alarm_control_panel.alarm_arm_home",icon:"hass:home-outline",name:e.localize("ui.card.alarm_control_panel.arm_home"),supported_feature:1},{service:"alarm_control_panel.alarm_arm_away",icon:"hass:exit-run",name:e.localize("ui.card.alarm_control_panel.arm_away"),supported_feature:2},{service:"alarm_control_panel.alarm_arm_night",icon:"hass:power-sleep",name:e.localize("ui.card.alarm_control_panel.arm_night"),supported_feature:4},{service:"alarm_control_panel.alarm_arm_custom_bypass",icon:"hass:shield-lock-outline",name:e.localize("ui.card.alarm_control_panel.arm_custom_bypass"),supported_feature:16}])(t);case"climate":return qi(t,o,i);case"cover":return((e,t)=>[{service:"cover.open_cover",icon:Ui(t),name:zi("services.cover.open_cover",e.language),supported_feature:1},{service:"cover.close_cover",icon:Vi(t),name:zi("services.cover.close_cover",e.language),supported_feature:2},{service:"cover.set_cover_position",variable:Mi({field:"position",name:e.localize("ui.card.cover.position",e.language),min:0,max:100,step:1,unit:"%"}),supported_feature:4,icon:"hass:ray-vertex",name:zi("services.cover.set_cover_position",e.language)},{service:"cover.set_cover_tilt_position",variable:Mi({field:"tilt_position",name:e.localize("ui.card.cover.tilt_position",e.language),min:0,max:100,step:1,unit:"%"}),supported_feature:128,icon:"hass:valve",name:zi("services.cover.set_cover_tilt_position",e.language)}])(t,o);case"fan":return((e,t)=>[{service:"fan.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"fan.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"fan.set_speed",variable:Pi({field:"speed",name:e.localize("ui.card.fan.speed"),options:Hi(e.localize,t)}),supported_feature:1,icon:"hass:weather-windy",name:zi("services.fan.set_speed",e.language)},{service:"fan.oscillate",variable:Pi({field:"oscillating",name:e.localize("ui.card.fan.oscillate"),options:[{value:"True",name:e.localize("state.default.on"),icon:"hass:flash"},{value:"False",name:e.localize("state.default.off"),icon:"hass:flash-off"}]}),supported_feature:2,icon:"hass:arrow-left-right",name:zi("services.fan.oscillate",e.language)},{service:"fan.set_direction",variable:Pi({field:"direction",name:e.localize("ui.card.fan.direction"),options:[{value:"forward",name:e.localize("ui.card.fan.forward"),icon:"hass:autorenw"},{value:"reverse",name:e.localize("ui.card.fan.reverse"),icon:"hass:sync"}]}),supported_feature:4,icon:"hass:cog-clockwise",name:zi("services.fan.set_direction",e.language)}])(t,o);case"group":const e=(o&&o.attributes.entity_id&&Array.isArray(o.attributes.entity_id)?o.attributes.entity_id:[]).map(e=>Ji(e,t));return a=e,((s=o)&&s.attributes.entity_id&&Array.isArray(s.attributes.entity_id)?s.attributes.entity_id:[]).map(e=>Oe(e)).filter((e,t,i)=>i.indexOf(e)===t).length>1&&(a=a.map(e=>e.map(e=>"turn_on"==Ee(e.service)||"turn_off"==Ee(e.service)?Object.assign(Object.assign({},e),{service:"homeassistant."+Ee(e.service),icon:"turn_on"==Ee(e.service)?"flash":"flash-off"}):e))),a.length?a[0].filter(e=>a.every(t=>t.map(e=>Gi(e)).includes(Gi(e)))):[];case"humidifer":return((e,t)=>[{service:"humidifier.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on")},{service:"turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off")},{service:"humidifier.set_humidity",variable:Mi({field:"humidity",name:e.localize("ui.card.humidifier.humidity"),min:(null==t?void 0:t.attributes.min_humidity)||0,max:(null==t?void 0:t.attributes.max_humidity)||255,step:1,unit:"%"}),icon:"hass:water-percent",name:zi("services.humidifer.set_humidity",e.language)},{service:"humidifier.set_mode",variable:Pi({field:"mode",name:e.localize("ui.card.humidifier.mode"),options:Ri(e.localize,t)}),icon:"hass:cog-transfer-outline",name:zi("services.climate.set_mode",e.language)}])(t,o);case"input_boolean":return((e,t)=>[{service:"input_boolean.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"input_boolean.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"input_number":return((e,t)=>[{service:"input_number.set_value",variable:Mi({field:"value",name:e.localize("ui.panel.config.helpers.types.input_number"),min:t&&t.attributes.min?Number(t.attributes.min):0,max:t&&t.attributes.max?Number(t.attributes.max):255,step:t&&t.attributes.step?Number(t.attributes.step):1,unit:t&&t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""}),icon:"hass:counter",name:zi("services.input_number.set_value",e.language)}])(t,o);case"input_select":return((e,t)=>[{service:"input_select.select_option",variable:Pi({field:"option",name:e.localize("ui.components.dialogs.input_select.options"),options:Wi(e.localize,t)}),icon:"counter",name:zi("services.input_select.select_option",e.language)}])(t,o);case"light":return((e,t)=>{const i=[{service:"light.turn_off",icon:"hass:lightbulb-off",name:e.localize("ui.card.media_player.turn_off")}];return!t||void 0===t.attributes.supported_features||1&t.attributes.supported_features?i.push({service:"light.turn_on",variable:Mi({field:"brightness",name:e.localize("ui.card.light.brightness"),min:0,max:255,step:1,unit:"%",optional:!0}),icon:"hass:lightbulb-on",name:zi("services.light.turn_on",e.language),supported_feature:1}):i.push({service:"light.turn_on",icon:"hass:lightbulb-on",name:e.localize("ui.card.media_player.turn_on")}),i})(t,o);case"lock":return((e,t)=>[{service:"lock.unlock",icon:"hass:lock-open-variant-outline",name:e.localize("ui.card.lock.unlock")},{service:"lock.lock",icon:"hass:lock-outline",name:e.localize("ui.card.lock.lock")}])(t);case"media_player":return((e,t)=>[{service:"media_player.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:128},{service:"media_player.turn_off",icon:"hass:power-off",name:e.localize("ui.card.media_player.turn_off"),supported_feature:256},{service:"media_player.select_source",variable:Pi({field:"source",name:e.localize("ui.card.media_player.source"),options:Yi(e.localize,t)}),icon:"hass:music-box-multiple-outline",name:zi("services.media_player.select_source",e.language),supported_feature:2048}])(t,o);case"scene":return((e,t)=>[{service:"scene.turn_on",icon:"hass:play",name:e.localize("ui.card.media_player.turn_on")}])(t);case"script":return((e,t)=>{const i=[{service:"script.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"script.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}];return t&&i.push({service:"script."+Ee(t.entity_id),icon:"hass:play",name:zi("services.script.script",e.language)}),i})(t,o);case"switch":return((e,t)=>[{service:"switch.turn_on",icon:"hass:flash",name:e.localize("ui.card.media_player.turn_on")},{service:"switch.turn_off",icon:"hass:flash-off",name:e.localize("ui.card.media_player.turn_off")}])(t);case"vacuum":return((e,t)=>[{service:"vacuum.turn_on",icon:"hass:power",name:e.localize("ui.card.media_player.turn_on"),supported_feature:1},{service:"vacuum.start",icon:"hass:play-circle-outline",name:e.localize("ui.card.vacuum.start_cleaning"),supported_feature:8192},{service:"vacuum.start_pause",icon:"hass:play-circle-outline",name:zi("services.vacuum.start_pause",e.language),supported_feature:4}])(t);case"water_heater":return((e,t)=>[{service:"water_heater.set_temperature",variable:Mi({field:"temperature",name:e.localize("ui.card.weather.attributes.temperature"),min:null==t?void 0:t.attributes.min_temp,max:null==t?void 0:t.attributes.max_temp,step:(null==t?void 0:t.attributes.target_temp_step)?null==t?void 0:t.attributes.target_temp_step:e.config.unit_system.temperature.includes("F")?1:.5,unit:e.config.unit_system.temperature}),icon:"hass:thermometer",name:zi("services.climate.set_temperature",e.language),supported_feature:1},{service:"water_heater.set_operation_mode",variable:Pi({field:"operation_mode",name:e.localize("ui.card.water_heater.operation"),options:Bi(e.localize,t)}),icon:"hass:cog-transfer-outline",name:zi("services.climate.set_mode",e.language),supported_feature:2},{service:"water_heater.set_away_mode",variable:Pi({field:"mode",name:e.localize("ui.card.water_heater.away_mode"),options:[{value:"on",name:e.localize("ui.card.input_boolean.on"),icon:"hass:toggle-switch-outline"},{value:"off",name:e.localize("ui.card.input_boolean.off"),icon:"hass:toggle-switch-off-outline"}]}),icon:"hass:car-traction-control",name:zi("services.water_heater.set_away_mode",e.language),supported_feature:4}])(t,o);default:return[]}}catch(t){return console.error(`Scheduler-card failed to load actions for '${e}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`),[]}var s,a}function Zi(e,t){let i=!1;if(e.match(/^[a-z0-9_\.]+$/))i=e.includes(".")?e==t:e==Oe(t);else try{if(e.startsWith("/")&&e.endsWith("/")||-1!==e.indexOf("*")){e.startsWith("/")||(e=`/^${e=e.replace(/\./g,".").replace(/\*/g,".*")}$/`);i=new RegExp(e.slice(1,-1)).test(t)}}catch(e){}return i}function Ki(e,t){let i=!1;return(t.include&&t.include.find(t=>Zi(t,e))||t.customize&&Object.keys(t.customize).find(t=>Zi(t,e)))&&(i=!0),t.exclude&&t.exclude.find(t=>Zi(t,e))&&(i=!1),i}function Qi(e,t){return!!(Ki(e,t)||t.groups&&t.groups.some(t=>Ki(e,t)))}function Xi(e,t,i){const s=t.states[e];let a=[];if((void 0===i.standard_configuration||i.standard_configuration)&&(a=Ji(e,t,!0)),i.customize){const t=Object.entries(i.customize).filter(([t])=>Zi(t,e)).sort((e,t)=>t[0].length-e[0].length);t.filter(([,e])=>e.exclude_actions&&e.exclude_actions.length).map(([,e])=>e.exclude_actions).reduce((e,t)=>e.concat(t),[]).forEach(e=>{"all"==e&&(a=[]),a=a.filter(t=>!t.name||!t.name.replace(/_/g," ").trim().toLowerCase().includes(e.replace(/_/g," ").trim().toLowerCase()))}),t.filter(([,e])=>e.actions&&e.actions.length).map(([,e])=>e.actions).reduce((e,t)=>e.concat(t),[]).forEach(t=>{Oe(t.service).length||(t=Object.assign(Object.assign({},t),{service:Oe(e)+"."+Ee(t.service)})),t.service_data&&(t=Object.assign(Object.assign({},t),{service_data:Ze(t.service_data,["entity_id"])}));let i=a.findIndex(e=>Fi(e,t));if(i>=0&&t.service_data&&Gi(t)!=Gi(a[i])&&(i=-1),i>=0){let e=Object.assign(Object.assign({},a[i]),Ze(t,["variable"]));t.variable&&(e=Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable||{}),t.variable)})),a=Object.values(Object.assign(Object.assign({},a),{[i]:e}))}else a.push(t)})}if(s&&s.attributes&&s.attributes.supported_features){const e=s.attributes.supported_features;a=a.filter(t=>!t.supported_feature||t.supported_feature&e)}return a=a.map(e=>{if(e.variable&&e.variable.type==Pe.List){const t=e.variable;if(!t.options.length)return null;if(1==t.options.length){const i=t.options[0],s=Object.assign(Object.assign({},e.service_data||{}),{[t.field]:i.value});return Object.assign(Object.assign({},e),{icon:i.icon||e.icon,service_data:s})}}return e}).filter(e=>e),a}function es(e){let t={id:Gi(e),service:e.service,service_data:{}};return t=Object.assign(Object.assign({},t),Ze(e,["variable"])),t.name||(t=Object.assign(Object.assign({},t),{name:Ee(e.service)})),t.icon||(t=Object.assign(Object.assign({},t),{icon:"flash"})),e.variable&&(t="options"in e.variable?Object.assign(Object.assign({},t),{variable:Pi(e.variable)}):Object.assign(Object.assign({},t),{variable:Mi(e.variable)})),t}function ts(e,t,i){if(Array.isArray(e)){const s=e.map(e=>ts(e,t,i));if(!s.length)return[];return s[0].filter(e=>s.every(t=>t.map(e=>e.id).includes(e.id))).map(e=>{if(e.variable){if(s.every(t=>t.find(t=>t.id==e.id).variable)){if(e.variable.type==Pe.Level)return Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable),{min:Math.max(...s.map(t=>t.find(t=>t.id==e.id).variable.min)),max:Math.min(...s.map(t=>t.find(t=>t.id==e.id).variable.max)),step:Math.max(...s.map(t=>t.find(t=>t.id==e.id).variable.step))})});{let t=e.variable.options;return s.forEach(i=>{let s=i.find(t=>t.id==e.id).variable;t=t.filter(e=>s.options.map(e=>e.value).includes(e.value))}),Object.assign(Object.assign({},e),{variable:Object.assign(Object.assign({},e.variable),{options:t})})}}return Ze(e,["variable"])}return e})}return Xi(e,t,i).map(es)}function is(e,t,i,s=!1){const a=e.entity_id,n=e.service,o=e.service_data||{},r=Xi(a,t,i),c=Gi({service:n,service_data:o});let l=r.find(e=>Gi(e)==c);if(l||(l=r.find(t=>t.variable&&Gi(t)==Gi(Object.assign(Object.assign({},e),{service_data:Ze(e.service_data,[t.variable.field])}))),l&&(l=Object.assign(Object.assign({},l),{service_data:Object.assign(Object.assign({},l.service_data||{}),o)}))),!l){if(l=Ji(a,t).find(t=>Fi(t,e)),l&&l.variable&&e.service_data&&l.variable.field in e.service_data)if(l.variable.type==Pe.List){let t=l.variable;const i=e.service_data[t.field];t=Object.assign(Object.assign({},t),{options:[t.options.find(e=>e.value==i)||{value:i}]}),l=Object.assign(Object.assign({},l),{variable:Object.assign({},t),service_data:Object.assign(Object.assign({},l.service_data),{[t.field]:i})})}else if(l.variable.type==Pe.Level&&s){let t=l.variable;const i=e.service_data[t.field];l=Object.assign(Object.assign({},l),{service_data:Object.assign(Object.assign({},l.service_data),{[t.field]:i})})}}if(l)return es(l);return es({service:e.service,service_data:e.service_data})}const ss={alarm_control_panel:"hass:alarm-light-outline",automation:"hass:playlist-play",binary_sensor:"hass:radiobox-blank",camera:"hass:camera",climate:"hass:home-thermometer-outline",cover:"hass:window-shutter",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",humidifier:"hass:air-humidifier",input_boolean:"hass:drawing",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb-outline",lock:"hass:lock-open-outline",media_player:"hass:cast-connected",notify:"hass:comment-alert",person:"hass:account-outline",remote:"hass:remote",scene:"hass:palette-outline",script:"hass:file-document",sensor:"hass:eye",switch:"hass:flash",timer:"hass:timer",vacuum:"hass:robot-vacuum",water_heater:"hass:water-boiler"};function as(e,t){const i=Oe(e),s=t.states[e];switch(i){case"binary_sensor":return(e=>e&&Re(Object.assign(Object.assign({},e),{state:"off"}))||"hass:radiobox-blank")(s);case"cover":return Vi(s);case"sensor":return(e=>{switch(e&&e.attributes.device_class?e.attributes.device_class:null){case"humidity":return"hass:water-percent";case"illuminance":return"hass:brightness-5";case"temperature":return"hass:thermometer";case"power":return"hass:flash";case"pressure":return"hass:gauge";case"signal_strength":return"hass:wifi";default:return"°C"==e.attributes.unit_of_measurement||"°F"==e.attributes.unit_of_measurement?"hass:thermometer":"hass:eye"}})(s);default:return i in ss?ss[i]:"hass:folder-outline"}}function ns(e,t,i){const s=e in t.states?t.states[e]:void 0;let a={id:e,name:s?s.attributes.friendly_name||Ee(e):"(unknown entity)",icon:s?s.attributes.icon:"help-circle-outline"};if(void 0!==i.standard_configuration&&!i.standard_configuration||a.icon?a.icon||(a=Object.assign(Object.assign({},a),{icon:"folder-outline"})):a=Object.assign(Object.assign({},a),{icon:as(e,t)}),i.customize){Object.entries(i.customize).filter(([e])=>Zi(e,a.id)).sort((e,t)=>t[0].length-e[0].length).map(([,e])=>e).forEach(e=>{a=Object.assign(Object.assign({},a),Je(e,["name","icon"]))})}return a}const os=/\{([^\}]+)\}/,rs=/\[([^\]]+)\]/;function cs(e){let t=e.name;t||(t=Ee(e.service));const i=t.match(rs);if(i){let s="";const a=i[1].match(os);if(a&&e.service_data&&a[1]in e.service_data){let n="";return n=e.variable&&e.variable.field==a[1]&&e.variable.type==Pe.Level?Ii(e.service_data[e.variable.field],e.variable):e.service_data[a[1]],s=i[1].replace(a[0],n),t.replace(i[0],s)}return t.replace(i[0],"")}return t||""}function ls(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}function ds(e){const t=e.getHours(),i=e.getMinutes();return String(t).padStart(2,"0")+":"+String(i).padStart(2,"0")}const us=ls()?(e,t)=>e.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"}):e=>ds(e);function hs(e){return e.includes("daily")?Ve.Daily:e.includes("workday")?Ve.Workday:e.includes("weekend")?Ve.Weekend:Ve.Custom}function ps(e){const t=e.split(":").map(Number),i=new Date;return new Date(i.getFullYear(),i.getMonth(),i.getDate(),...t)}let ms=class extends ae{set schedule(e){this._schedule=e}set hass(e){this._hass=e}get hass(){return this._hass}shouldUpdate(e){if(e.size>1)return!0;const t=e.get("_hass");if(t&&this._schedule)return JSON.stringify(t.states[this._schedule.entity_id])!==JSON.stringify(this._hass.states[this._schedule.entity_id]);const i=e.get("_schedule");return!i||JSON.stringify(i)!==JSON.stringify(this._schedule)}render(){var e;if(!this._schedule.next_entries.length)return"NOT_RUNNING"!==this._hass.config.state?L`
        <hui-warning>
          Defective schedule entity: ${this._schedule.entity_id}
        </hui-warning>
      `:L`
        <hui-warning>
        ${this._hass.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `;const t=this._schedule.timeslots[this._schedule.next_entries[0]],i=Qe(t.actions.map(e=>e.entity_id)).map(e=>ns(e,this._hass,this.config)),s=1==Qe(i.map(e=>e.icon)).length?i[0].icon:as(i[0].id,this._hass),a=Qe(i.map(e=>Oe(e.id))),n=1==i.length?i[0].name:1==a.length?`${i.length}x ${zi("domains."+a[0],this._hass.language)||a[0]}`:i.length+"x entities",o=is(t.actions[0],this._hass,this.config,!0),r=this.config.display_options&&this.config.display_options.icon&&"entity"==this.config.display_options.icon?s:o.icon,c=e=>{switch(e){case"name":return this._schedule.name||"";case"relative-time":return"<my-relative-time></my-relative-time>";case"additional-tasks":return this._schedule.timeslots.length>1?"+"+zi("ui.panel.overview.additional_tasks",this._hass.language,"{number}",String(this._schedule.timeslots.length-1)):"";case"time":return Xe(this.computeTime(this._schedule.timeslots[this._schedule.next_entries[0]]));case"days":return Xe(this.computeDays(this._schedule.weekdays));case"entity":return n.length?Xe(et(n)):"";case"action":return Xe(cs(o));default:const t=/\{([^\}]+)\}/;let i;for(;i=t.exec(e);)e=e.replace(i[0],String(c(String(i[1]))));return e}},l=e=>{const t=e=>{const t=e.split("<my-relative-time></my-relative-time>");return 1==t.length?Ei(e):L`
          ${t[0]?Ei(t[0]):""}
          <my-relative-time .hass=${this._hass} .datetime=${new Date(this._schedule.timestamps[this._schedule.next_entries[0]])}> </my-relative-time>
          ${t[1]?Ei(t[1]):""}
        `};return"string"==typeof e?t(c(e)):e.map(e=>{const i=c(e);return i?L`
                  ${t(i)}<br />
                `:""})};return L`
      <ha-icon icon="${tt(r)}"></ha-icon>
      <div class="info">
        ${this.config.display_options&&this.config.display_options.primary_info?l(this.config.display_options.primary_info):l("{entity}: {action}")}
        <div class="secondary">
          ${this.config.display_options&&this.config.display_options.secondary_info?l(this.config.display_options.secondary_info):l(["relative-time","additional-tasks"])}
        </div>
      </div>
      <ha-switch
        ?checked=${["on","triggered"].includes((null===(e=this.hass.states[this._schedule.entity_id])||void 0===e?void 0:e.state)||"")}
        @click=${this.toggleDisabled}
      >
      </ha-switch>
    `}computeDays(e){if(!this._hass)return"";switch(hs(e)){case Ve.Daily:return zi("ui.components.date.day_types_long.daily",this._hass.language);case Ve.Workday:return zi("ui.components.date.day_types_long.workdays",this._hass.language);case Ve.Weekend:return zi("ui.components.date.day_types_long.weekend",this._hass.language);case Ve.Custom:const t=e.map(e=>{switch(e){case"mon":return 1;case"tue":return 2;case"wed":return 3;case"thu":return 4;case"fri":return 5;case"sat":return 6;case"sun":return 7;default:return}}).filter(e=>e),i=function(e){const t=[];for(let i=0;i<e.length-1;i++){let s=i+1;for(;e[s]-e[s-1]==1;)s++;t.push(s-i)}return t}(t),s=Math.max(...i);if(6==t.length){const e=[1,2,3,4,5,6,7].filter(e=>!t.includes(e));return zi("ui.components.date.repeated_days_except",this._hass.language,"{excludedDays}",Ai(e.pop(),this._hass.language))}const a=t.map(e=>Ai(e,this._hass.language));if(t.length>=3&&s>=3){const e=i.reduce((e,t,i)=>t==s?i:e,0);a.splice(e,s,zi("ui.components.date.days_range",this._hass.language,["{startDay}","{endDay}"],[a[e],a[e+s-1]]))}const n=a.length>1?`${a.slice(0,-1).join(", ")} ${this._hass.localize("ui.common.and")} ${a.pop()}`:""+a.pop();return zi("ui.components.date.repeated_days",this._hass.language,"{days}",n);default:return""}}computeTime(e){if(e.stop){const t=us(ps(e.start),this._hass.language),i=us(ps(e.stop),this._hass.language);return zi("ui.components.time.interval",this._hass.language,["{startTime}","{endTime}"],[t,i])}{const t=e.start,i=Fe(t);if(i){const e=i.event==qe.Sunrise?this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunrise").toLowerCase():this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.sunset").toLowerCase();if(Math.abs(Ye(i.offset))<300)return zi("ui.time.at_sun_event","{sunEvent}",e);const t="-"==i.sign?this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1).toLowerCase():this._hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1).toLowerCase();return`${ds(ps(i.offset))} ${t} ${e}`}{const e=ps(t);return zi("ui.components.time.absolute",this._hass.language,"{time}",us(e,this._hass.language))}}}toggleDisabled(e){if(!this._hass||!this._schedule)return;e.stopPropagation();const t=!e.target.checked;this._hass.callService("switch",t?"turn_on":"turn_off",{entity_id:this._schedule.entity_id})}};ms.styles=ie`
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
    hui-warning {
      flex: 1 0 40px;
    }
  `,t([K()],ms.prototype,"config",void 0),t([K()],ms.prototype,"_schedule",void 0),t([K()],ms.prototype,"_hass",void 0),ms=t([J("scheduler-entity-row")],ms);const _s=e=>e.callWS({type:"scheduler"});function gs(e,t){let i=L`
    <b>Something went wrong!</b><br>
    ${e.body.message}<br><br>
    ${e.error}<br><br>
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;Te(t,"show-dialog",{dialogTag:"dialog-error",dialogImport:()=>Promise.resolve().then((function(){return Ds})),dialogParams:{error:i}})}let vs=class extends(ji(ae)){constructor(){super(...arguments),this.showDiscovered=!1,this.connectionError=!1}set hass(e){this._hass=e}get hass(){return this._hass}hassSubscribe(){return this.loadSchedules(),this.hass.user.is_admin?[this._hass.connection.subscribeEvents(()=>this.loadSchedules(),"scheduler_updated")]:[]}async loadSchedules(){_s(this._hass).then(e=>{let t=e;void 0===this.config.discover_existing||this.config.discover_existing||(t=t.filter(e=>e.timeslots.every(e=>e.actions.every(e=>Qi(e.entity_id,this.config))))),t.sort((e,t)=>{const i=new Date(e.timestamps[e.next_entries[0]]).valueOf(),s=new Date(t.timestamps[t.next_entries[0]]).valueOf();return null!==i&&null!==s?i>s?1:i<s?-1:e.entity_id<t.entity_id?1:-1:null!==s?1:null!==i?-1:e.entity_id<t.entity_id?1:-1}),this.schedules=t}).catch(e=>{this.schedules=[],this.connectionError=!0})}shouldUpdate(e){const t=e.get("_hass");return!t||1!=e.size||!this.schedules||this.schedules.some(e=>JSON.stringify(t.states[e.entity_id])!==JSON.stringify(this._hass.states[e.entity_id]))}render(){return this._hass&&this.config&&this.schedules?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":zi("ui.panel.common.title",this._hass.language)}
          </div>
          ${this.schedules.length&&this.config.show_header_toggle?L`
                <ha-switch
                  ?checked=${this.schedules.some(e=>{var t;return["on","triggered"].includes((null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"")})}
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
            ?disabled=${this.connectionError}
          >${this._hass.localize("ui.components.area-picker.add_dialog.add")}
          </mwc-button>
        </div>`:""}
      </ha-card>
    `:L``}getRows(){if(!this.config||!this._hass||!this.schedules)return L``;if(this.connectionError)return L`
        <div>
          <hui-warning>
           ${zi("ui.panel.overview.backend_error",this._hass.language)}
          </hui-warning>
        </div>
      `;if(!Object.keys(this.schedules).length)return L`
        <div>
          ${zi("ui.panel.overview.no_entries",this._hass.language)}
        </div>
      `;let e=[],t=[];return this.schedules.forEach(i=>{i.timeslots.every(e=>e.actions.every(e=>Qi(e.entity_id,this.config)))?e.push(i):t.push(i)}),L`
      ${e.map(e=>{var t;const i=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"";return L`
          <scheduler-entity-row
            class="${["on","triggered"].includes(i)?"":"disabled"} ${this._hass.user.is_admin?"":"readonly"}"
            .hass=${this._hass}
            .schedule=${e}
            .config=${this.config}
            @click=${()=>this.editItemClick(e.schedule_id)}
          >
          </scheduler-entity-row>
        `})}
      ${Object.keys(t).length?this.showDiscovered?L`
              ${t.map(e=>{var t;const i=(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.state)||"";return L`
                  <scheduler-entity-row
                    class="${["on","triggered"].includes(i)?"":"disabled"} ${this._hass.user.is_admin?"":"readonly"}"
                    .hass=${this._hass}
                    .schedule=${e}
                    .config=${this.config}
                    @click=${()=>this.editItemClick(e.schedule_id)}
                  >
                  </scheduler-entity-row>
                `})}
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!1}}
                >
                  ${Xe(zi("ui.panel.overview.hide_excluded",this._hass.language))}
                </button>
              </div>
            `:L`
              <div>
                <button
                  class="show-more"
                  @click=${()=>{this.showDiscovered=!0}}
                >
                  +
                  ${zi("ui.panel.overview.excluded_items",this._hass.language,"{number}",t.length)}
                </button>
              </div>
            `:""}
    `}toggleDisableAll(e){if(!this._hass||!this.schedules)return;const t=e.target.checked;this.schedules.forEach(e=>{this._hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e.entity_id})})}editItemClick(e){if(!this._hass.user.is_admin)return;const t=new CustomEvent("editClick",{detail:e});this.dispatchEvent(t)}newItemClick(){const e=new CustomEvent("newClick");this.dispatchEvent(e)}};function fs(e,t,i){const s=[];t.groups&&t.groups.forEach(t=>{const i={id:t.name,name:t.name,icon:t.icon||"folder-outline",entities:e.filter(e=>Ki(e,t))};s.push(i)});const a=e.filter(e=>!s.some(t=>t.entities.includes(e)));return a.map(Oe).filter((e,t,i)=>i.indexOf(e)===t).forEach(e=>{const n={id:e,name:zi("domains."+e,i.language)||e,icon:(void 0===t.standard_configuration||t.standard_configuration)&&e in ss?ss[e]:"folder-outline",entities:a.filter(t=>Ki(t,{include:[e]}))};s.push(n)}),s}vs.styles=ie`
    ${Si}
    scheduler-entity-row {
      cursor: pointer;
      margin: 20px 0px;
    }
    scheduler-entity-row.disabled {
      --primary-text-color: var(--disabled-text-color);
      --secondary-text-color: var(--disabled-text-color);
      --paper-item-icon-color: var(--disabled-text-color);
    }
    scheduler-entity-row.readonly {
      cursor: default;
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
  `,t([K()],vs.prototype,"config",void 0),t([K()],vs.prototype,"showDiscovered",void 0),t([K()],vs.prototype,"schedules",void 0),t([K()],vs.prototype,"_hass",void 0),vs=t([J("scheduler-entities-card")],vs);let ys=class extends ae{constructor(){super(...arguments),this.items=[]}render(){return this.items.length?this.items.map(e=>this.createButton(e)):L`
        <div class="text-field">
          <slot></slot>
        </div>
      `}createButton(e){const t=Array.isArray(this.value)?this.value:[this.value];"object"!=typeof e&&(e={name:String(e)});const i=void 0!==e.id?e.id:e.name;return L`
      <mwc-button class="${t.includes(i)?"active":""}" @click="${()=>this.selectItem(i)}">
        ${e.icon?L`
              <ha-icon icon="${tt(e.icon)}" class="padded-right"></ha-icon>
            `:""}
        ${et(e.name)}
      </mwc-button>
    `}selectItem(e){if(Array.isArray(this.value))if(this.multiple){let t=Array.isArray(this.value)?[...this.value]:[];if(t.includes(e)){if(void 0!==this.min&&t.length<=this.min)return;t=t.filter(t=>t!=e)}else t.push(e);this.value=t}else this.value=this.value.includes(e)?[]:Array(e);else if(e==this.value){if(!this.optional)return;this.value=null}else this.value=e;const t=new CustomEvent("change");this.dispatchEvent(t)}};ys.styles=Si,t([K({type:Array})],ys.prototype,"items",void 0),t([K()],ys.prototype,"value",void 0),t([K({type:Number})],ys.prototype,"min",void 0),t([K({type:Boolean})],ys.prototype,"optional",void 0),t([K({type:Boolean})],ys.prototype,"multiple",void 0),ys=t([J("button-group")],ys);let bs=class extends ae{constructor(){super(...arguments),this.selectedEntities=[],this.multipleEntity=!1,this.scheduleEntities=[]}async firstUpdated(){if(this.entities&&this.entities.length){const e=this.getGroups().find(e=>e.entities.find(e=>e==this.entities[0].id));if(!e)return;this.selectedGroup=e.id,this.selectedEntities=[...this.entities.map(e=>e.id)],this.multipleEntity=this.selectedEntities.length>1}if(this.schedule)if(this.schedule.timeslots.every(e=>e.stop))this.selectedAction="make_scheme";else{const e=Qe(Ke(this.schedule.timeslots.map(e=>e.actions.map(e=>Gi(e)))));1==e.length&&(this.selectedAction=e[0])}this.scheduleEntities=(await _s(this.hass)).map(e=>e.entity_id)}getGroups(){if(!this.hass||!this.config)return[];const e=fs(Object.keys(this.hass.states).filter(e=>Qi(e,this.config)).filter(e=>"switch"!=Oe(e)||!this.scheduleEntities.includes(e)).filter(e=>ts(e,this.hass,this.config).length),this.config,this.hass);return e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),e}getEntitiesForGroup(e){if(!this.selectedGroup||!this.hass||!this.config)return[];const t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>ns(e,this.hass,this.config));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}getActionsForEntity(e){if(!this.hass||!this.config||!this.selectedEntities.length)return[];const t=ts(this.selectedEntities,this.hass,this.config).map(e=>Object.assign(e,{name:cs(e)}));return t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),t}render(){if(!this.hass||!this.config)return L``;const e=this.getGroups();1==e.length&&this.selectedGroup!==e[0].id&&this.selectGroup(e[0].id);const t=this.getEntitiesForGroup(e);1==t.length&&this.selectedEntities[0]!==t[0].id&&this.selectEntity(t[0].id);const i=this.getActionsForEntity(t);return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":zi("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
          <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${zi("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
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
                  ${zi("ui.panel.entity_picker.multiple",this.hass.language)}          
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
            ${this.selectedGroup?zi("ui.panel.entity_picker.no_entities_for_group",this.hass.language):zi("ui.panel.entity_picker.no_group_selected",this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize("ui.panel.config.automation.editor.actions.name")}</div>
          <button-group .items=${i} value=${this.selectedAction} @change=${this.selectAction}>
            ${this.selectedEntities.length?zi("ui.panel.entity_picker.no_actions_for_entity",this.hass.language):zi("ui.panel.entity_picker.no_entity_selected",this.hass.language)}
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
          <ha-icon icon="${tt("chart-timeline")}" class="padded-right"></ha-icon>
          ${zi("ui.panel.entity_picker.make_scheme",this.hass.language)}
        </mwc-button>
      </div>
    </div>
    `:L``}selectGroup(e){const t="string"==typeof e?e:e.target.value;this.selectedGroup=t,this.selectedEntities=[],this.selectedAction=void 0}selectEntity(e){const t="string"==typeof e?Array(e):e.target.value;this.selectedEntities=t,this.selectedAction=void 0}selectAction(e){const t="string"==typeof e?e:e.target.value;this.selectedAction=t}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}nextClick(){const e=new CustomEvent("nextClick",{detail:{entities:this.selectedEntities,action:this.selectedAction}});this.dispatchEvent(e)}};bs.styles=Si,t([K()],bs.prototype,"hass",void 0),t([K()],bs.prototype,"config",void 0),t([K()],bs.prototype,"selectedGroup",void 0),t([K()],bs.prototype,"selectedEntities",void 0),t([K()],bs.prototype,"selectedAction",void 0),t([K()],bs.prototype,"entities",void 0),t([K()],bs.prototype,"schedule",void 0),t([K()],bs.prototype,"multipleEntity",void 0),bs=t([J("scheduler-editor-card")],bs);let ws=class extends ae{constructor(){super(...arguments),this.stepSize=10,this.relativeMode=!1,this.event=qe.Sunrise,this._time=0,this.maxOffset=2}get time(){return this._time>=0?this._time:Math.abs(this._time)}set time(e){this._time=Ge(e,this.stepSize,{wrapAround:!this.relativeMode,maxHours:this.relativeMode?this.maxOffset:void 0})}firstUpdated(){const e=Fe(this.value);e?(this.relativeMode=!0,this.event=e.event==qe.Sunrise?qe.Sunrise:qe.Sunset,this.time="+"==e.sign?Ye(e.offset):-Ye(e.offset)):this.time=Ye(this.value)}updated(){if(this.relativeMode){const e=this._time>=0?"+":"-",t=Be(this.time);this.value=`${this.event}${e}${t}`}else this.value=Be(this.time);const e=new CustomEvent("change");this.dispatchEvent(e)}render(){const e=(this.relativeMode?Be(this.time):je(ps(Be(this.time)),this.hass.language)).split(/:|\ /);return L`
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
            <ha-icon icon="hass:${this.event==qe.Sunrise?"weather-sunny":"weather-night"}"></ha-icon>
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
    `:L``}getBeforeAfter(){return this.hass?this._time<0?this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.before").slice(0,-1):this.hass.localize("ui.panel.config.automation.editor.conditions.type.sun.after").slice(0,-1):""}toggleAmPm(){this.time=this._time+43200}toggleBeforeAfter(){this.time=-this._time}toggleSunriseSunset(){this.event=this.event==qe.Sunrise?qe.Sunset:qe.Sunrise}toggleMode(){if(!this.hass)return;this.relativeMode=!this.relativeMode;const e=this.hass.states["sun.sun"],t=Ye(e.attributes.next_rising),i=Ye(e.attributes.next_setting);if(this.relativeMode){this.event=Math.abs(this._time-t)<Math.abs(this._time-i)?qe.Sunrise:qe.Sunset;let e=this.event==qe.Sunrise?this._time-t:this._time-i;e>7200?e=7200:e<-7200&&(e=-7200),this.time=e}else this.time=this.event==qe.Sunrise?this._time+t:this._time+i}};ws.styles=ie`
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
  `,t([K()],ws.prototype,"hass",void 0),t([K({type:Number})],ws.prototype,"stepSize",void 0),t([K()],ws.prototype,"relativeMode",void 0),t([K()],ws.prototype,"event",void 0),t([K()],ws.prototype,"_time",void 0),ws=t([J("time-picker")],ws);function ks(e){const t=Ye(e.start);let i=Ye(e.stop);return i<t&&(i+=86400),i-t}let xs=class extends ae{constructor(){super(...arguments),this.entries=[],this.actions=[],this.stepSize=10,this._activeEntry=null,this._activeThumb=null,this.formatAmPm=!1,this._currentTime=null,this._activeEntryMem=null}firstUpdated(){var e;this.formatAmPm=(e=this.hass.language,!!ls()&&(new Date).toLocaleTimeString(e).includes("M"))}render(){return this.hass?L`
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
        <mwc-button @click=${this._removeSlot} ?disabled=${null===this._activeEntry||this.entries.length<=2}>
          <ha-icon icon="hass:minus-circle-outline" class="padded-right"></ha-icon>
          ${this.hass.localize("ui.common.delete")}
        </mwc-button>
      </div>
    `:L``}getSlots(){const e=[];return this.entries.forEach((t,i)=>{if(e.push(L`
        <div
          class="slider-slot${this._activeEntry==i?" active":""}${t.actions?" filled":""}"
          @click=${e=>{this._handleSegmentClick(e,i)}}
          style="width: ${ks(t)/86400*100}%"
        >
          <span class="content">${this.getEntryAction(t)}</div>
        </div>
      `),i<this.entries.length-1){Ye(this.entries[i].stop);e.push(L`
          <div
            class="slider-thumb${this._activeThumb==i?" active":""} ${this._activeEntry==i||this._activeEntry==i+1?"":"hidden"}"
            
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
              class="slider-thumb-tooltip ${this.formatAmPm?"wide":""} ${this._activeEntryMem==i&&0!=this._activeEntryMem?"right":this._activeEntryMem==i+1&&this._activeEntryMem+1!=this.entries.length?"left":"center"}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${us(ps(this.entries[i].stop),this.hass.language)}
            </div>
          </div>
        `)}}),e}updated(){this.shadowRoot.querySelectorAll(".slider-thumb-tooltip").forEach((e,t)=>{e.innerText=us(ps(this.entries[t].stop),this.hass.language)})}getEntryAction(e){if(this.hass)return e.actions?Qe(e.actions.map(e=>{const t=this.actions.find(t=>Fi(t,e));if(t.variable&&t.variable.field in e.service_data){const i=e.service_data[t.variable.field];if(t.variable.type==Pe.Level){const e=t.variable;if(!isNaN(i))return Ii(Number(i),e)}else if(t.variable.type==Pe.List){const e=t.variable.options.find(e=>e.value==i);return et(e&&e.name?e.name:String(i))}}return et(t.name||zi("services."+e.service,this.hass.language)||e.service)})).join(", "):""}_handleSegmentClick(e,t){e.target;this._activeEntry=this._activeEntry==t?null:t,this._activeEntryMem=t;const i=new CustomEvent("update",{detail:{entry:this._activeEntry}});this.dispatchEvent(i)}_handleTouchStart(e){let t=e.target;if(!t)return;"HA-ICON"==t.nodeName&&(t=t.parentElement);const i=Number(t.getAttribute("index")),s=t.parentNode,a=s.parentElement,n=a.getBoundingClientRect(),o=s.previousElementSibling,r=s.nextElementSibling,c=s.querySelector(".slider-thumb-tooltip");this._activeThumb=i;const l=o.offsetWidth+r.offsetWidth,d=n.width,u=Array.from(a.querySelectorAll(".slider-slot")),h=u.map(e=>e.offsetWidth);let p=0,m=-1;u.forEach((e,t)=>{e==o?m=t:-1==m&&(p+=h[t])});const _=Ye(this.entries[m].start),g=Ye(this.entries[m+1].stop)||86400,v=(_+60*this.stepSize)/86400*d,f=(g-60*this.stepSize)/86400*d;let y=e=>{let t;t="undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches[0].pageX:e.pageX;let i=t-n.left;i<v?i=v:i>f&&(i=f),o.style.width=Math.round(i-p)+"px",r.style.width=Math.round(l-(i-p))+"px";let s=i/d*86400;s=Math.round(s)>=86400?86400:Ge(s,this.stepSize),this._currentTime=s,c.dispatchEvent(new CustomEvent("update"))};const b=()=>{if(window.removeEventListener("mousemove",y),window.removeEventListener("touchmove",y),window.removeEventListener("mouseup",b),window.removeEventListener("touchend",b),y=()=>{},null!==this._currentTime){const e=this._currentTime,t=ks(this.entries[m])+ks(this.entries[m+1]),i=Ye(this.entries[m].start),s=Object.assign(this.entries,{[m]:Object.assign(Object.assign({},this.entries[m]),{stop:Be(e)}),[m+1]:Object.assign(Object.assign({},this.entries[m+1]),{start:Be(e),stop:Be(i+t)})}),a=new CustomEvent("update",{detail:{entries:s}});this.dispatchEvent(a)}this._currentTime=null,this._activeThumb=null};window.addEventListener("mouseup",b),window.addEventListener("touchend",b),window.addEventListener("blur",b),window.addEventListener("mousemove",y),window.addEventListener("touchmove",y)}_updateMarker(e){const t=new Date;t.setHours(0,0,0,0);const i=new Date(t.getTime()+1e3*this._currentTime);e.target.innerText=us(i,this.hass.language)}_addSlot(){const e=this.entries[this._activeEntry],t=Ye(e.start),i=Ye(e.stop),s=Ge(t+ks(e)/2,this.stepSize),a=[...this.entries.slice(0,this._activeEntry),Object.assign(Object.assign({},this.entries[this._activeEntry]),{stop:Be(s)}),{start:Be(s),stop:Be(i),actions:[]},...this.entries.slice(this._activeEntry+1)],n=new CustomEvent("update",{detail:{entries:a}});this.dispatchEvent(n)}_removeSlot(){const e=this._activeEntry==this.entries.length-1?this._activeEntry-1:this._activeEntry,t=[...this.entries.slice(0,e),Object.assign(Object.assign({},this.entries[e+1]),{start:this.entries[e].start,stop:this.entries[e+1].stop}),...this.entries.slice(e+2)];this._activeEntry==this.entries.length&&this._activeEntry--;const i=new CustomEvent("update",{detail:{entries:t}});this.dispatchEvent(i)}};var $s;xs.styles=ie`
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
  `,t([K()],xs.prototype,"hass",void 0),t([K({type:Array})],xs.prototype,"entries",void 0),t([K({type:Array})],xs.prototype,"actions",void 0),t([K({type:Number})],xs.prototype,"stepSize",void 0),t([K({type:Number})],xs.prototype,"_activeEntry",void 0),t([K({type:Number})],xs.prototype,"_activeThumb",void 0),t([K({type:Boolean})],xs.prototype,"formatAmPm",void 0),t([($s={passive:!0},(e,t)=>void 0!==t?((e,t,i)=>{Object.assign(t[i],e)})($s,e,t):((e,t)=>Object.assign(Object.assign({},t),{finisher(i){Object.assign(i.prototype[t.key],e)}}))($s,e))],xs.prototype,"_handleTouchStart",null),xs=t([J("timeslot-editor")],xs);let zs=class extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.value=0,this.unit="",this.optional=!1,this.disabled=!1,this.scaleGain=1,this.scaleOffset=0}firstUpdated(){(async()=>{await(async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()})()})(),"%"==this.unit&&(this.scaleOffset=this.min,this.scaleGain=(this.max-this.min)/100,this.min=0,this.max=100),this.disabled&&!this.optional&&(this.disabled=!1),isNaN(this.value)&&(this.value=this.min),this.requestUpdate()}render(){return L`
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
    `:L``}toggleChecked(e){const t=e.target.checked;this.disabled=!t;const i=new CustomEvent("change");this.dispatchEvent(i)}updateValue(e){let t=Number(e.target.value)*this.scaleGain+this.scaleOffset;t=Math.round(t/this.step)*this.step,this.value=t}};zs.styles=ie`
    ${Si} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `,t([K({type:Number})],zs.prototype,"min",void 0),t([K({type:Number})],zs.prototype,"max",void 0),t([K({type:Number})],zs.prototype,"step",void 0),t([K({type:Number})],zs.prototype,"value",void 0),t([K({type:String})],zs.prototype,"unit",void 0),t([K({type:Boolean})],zs.prototype,"optional",void 0),t([K({type:Boolean})],zs.prototype,"disabled",void 0),zs=t([J("variable-slider")],zs);let Ss=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`

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
    `}};t([K({attribute:!1})],Ss.prototype,"hass",void 0),t([Q()],Ss.prototype,"_params",void 0),Ss=t([J("dialog-delete-confirm")],Ss);var js=Object.freeze({__proto__:null,get DialogDeleteConfirm(){return Ss}});let Os=class extends ae{constructor(){super(...arguments),this.activeEntry=null,this.timeslots=!1,this.editItem=!1}firstUpdated(){if(!this.actions||!this.hass)return;this.timeslots||(this.activeEntry=0);const e=this.actions.map(e=>Object.assign(e,{name:cs(e)}));e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1),this.actions=e}render(){return this.hass&&this.config&&this.entities&&this.actions?L`
        <ha-card>
          <div class="card-header">
            <div class="name">
              ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":zi("ui.panel.common.title",this.hass.language)}
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
              value=${null!==this.activeEntry?this.schedule.timeslots[this.activeEntry].actions.map(e=>{var t;return null===(t=this.actions.find(t=>Fi(t,e)))||void 0===t?void 0:t.id}):""}
              optional="true"
              @change=${this.selectAction}
            >
              ${zi("ui.panel.time_picker.no_timeslot_selected",this.hass.language)}
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
      <ha-icon icon="${tt(e.icon)}"> </ha-icon>
      ${Xe(et(e.name||this.hass.states[e.id].attributes.friendly_name||Ee(e.id)))}
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
      <ha-icon icon="${tt("chart-timeline")}"> </ha-icon>
      ${Xe(zi("ui.panel.entity_picker.make_scheme",this.hass.language))}
    </div>
  `:L`
    <div>
      <ha-icon icon="${tt(this.actions[0].icon||"flash")}"> </ha-icon>
      ${Xe(this.actions[0].name||Ee(this.actions[0].service))}
    </div>
    `}
  </div>
  </div>
    `:L``}renderDays(){if(!this.hass)return L``;let e=Array.from(Array(7).keys());const t=function(e){const t=e.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);return function(e,t){const i="AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g),s="AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(/../g),a="amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);return e?s.includes(e)?"sun":i.includes(e)?"sat":"mon":a.includes(t)?"sun":["ar","arq","arz","fa"].includes(t)?"sat":"mon"}(t[4],t[1])}(this.hass.language),i=e.length-Ci.findIndex(e=>e.substr(0,3)==t);e=[...e.slice(-i),...e.slice(0,-i)];const s=e.map(e=>Object({id:Ci[e].substr(0,3),name:Ai(e,this.hass.language,!0)})),a=[{id:Ve.Daily,name:zi("ui.components.date.day_types_short.daily",this.hass.language)},{id:Ve.Workday,name:zi("ui.components.date.day_types_short.workdays",this.hass.language)},{id:Ve.Weekend,name:zi("ui.components.date.day_types_short.weekend",this.hass.language)},{id:Ve.Custom,name:this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.label")}];return L`
      <div class="header">${zi("ui.components.date.days",this.hass.language)}</div>
      <button-group .items=${a} value=${hs(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${hs(this.schedule.weekdays)==Ve.Custom?L`
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
    `}updateActiveEntry(e){null!==this.activeEntry&&(this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:Object.assign([...this.schedule.timeslots],{[this.activeEntry]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry]),e)})}))}updateActiveEntryAction(e,t){null!==this.activeEntry&&(e?this.updateActiveEntry({actions:Object.assign([...this.schedule.timeslots[this.activeEntry].actions],{[t]:Object.assign(Object.assign({},this.schedule.timeslots[this.activeEntry].actions[t]),e)})}):this.updateActiveEntry({actions:[...this.schedule.timeslots[this.activeEntry].actions].filter((e,i)=>i!=t)}))}handlePlannerUpdate(e){if(e.detail.hasOwnProperty("entries")){const t=e.detail.entries;t.length<this.schedule.timeslots.length&&this.activeEntry==this.schedule.timeslots.length-1&&(this.activeEntry=this.schedule.timeslots.length-2),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:[...t]})}else e.detail.hasOwnProperty("entry")&&(null!==e.detail.entry?this.activeEntry=Number(e.detail.entry):this.activeEntry=null)}selectAction(e){if(!this.actions||null===this.activeEntry)return;const t=e.target.value;if(t){const e=this.actions.find(e=>e.id==t);this.entities.map(e=>e.id).forEach((t,i)=>{let s=e.service_data||{};if(e.variable&&e.variable.type==Pe.Level){const t=e.variable;t.field in s||t.optional||(s=Object.assign(Object.assign({},s),{[t.field]:t.min}))}this.updateActiveEntryAction({entity_id:t,service:e.service,service_data:s},i)})}else this.entities.forEach((e,t)=>{this.updateActiveEntryAction(null,t)})}getVariableEditor(){if(null===this.activeEntry||!this.actions)return L``;return Qe(this.schedule.timeslots[this.activeEntry].actions.map(e=>this.actions.find(t=>Fi(t,e)))).map(e=>{if(!e||!e.variable)return L``;const t=this.schedule.timeslots[this.activeEntry].actions[0];if(e.variable.type==Pe.Level){const i=e.variable,s=Number(t.service_data[i.field])||null;return L`
          <div class="header">
            ${i.name||et(i.field)}
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
            ${i.name||et(i.field)}
          </div>
          <button-group
            .items=${s}
            value=${a}
            @change=${e=>{this.entities.forEach((s,a)=>{this.updateActiveEntryAction({service_data:{...t.service_data,[i.field]:e.target.value}},a)})}}
          >
            ${this.hass.localize("ui.dialogs.helper_settings.input_select.no_options")}
          </button-group>
        `}})}selectDays(e){const t=e.target.value;let i=this.schedule.weekdays;if(Object.values(Ve).includes(t))switch(t){case Ve.Daily:i=["daily"];break;case Ve.Workday:i=["workday"];break;case Ve.Weekend:i=["weekend"];break;case Ve.Custom:i=[]}else i=t;this.schedule=Object.assign(Object.assign({},this.schedule),{weekdays:i})}cancelClick(){const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}optionsClick(){const e=new CustomEvent("optionsClick",{detail:this.schedule});this.dispatchEvent(e)}editActionClick(){const e=new CustomEvent("editActionClick",{detail:this.schedule});this.dispatchEvent(e)}async deleteClick(e){const t=e.target;if(await new Promise(e=>{Te(t,"show-dialog",{dialogTag:"dialog-delete-confirm",dialogImport:()=>Promise.resolve().then((function(){return js})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})){const e=new CustomEvent("deleteClick");this.dispatchEvent(e)}}};Os.styles=ie`
    ${Si}
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
  `,t([K()],Os.prototype,"hass",void 0),t([K()],Os.prototype,"config",void 0),t([K()],Os.prototype,"schedule",void 0),t([K()],Os.prototype,"actions",void 0),t([K()],Os.prototype,"entities",void 0),t([K()],Os.prototype,"activeEntry",void 0),t([K({type:Boolean})],Os.prototype,"timeslots",void 0),t([K({type:Boolean})],Os.prototype,"editItem",void 0),Os=t([J("scheduler-timepicker-card")],Os);function Es(e,t){try{const i=Oe(e),s=t.states[e];if(!s)return[];switch(i){case"alarm_control_panel":return((e,t)=>[{value:"disarmed",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"disarmed"}),e.language),icon:"hass:lock-open-variant-outline"},{value:"armed_away",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"armed_away"}),e.language),icon:"hass:exit-run"},{value:"armed_home",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"armed_home"}),e.language),icon:"hass:home-outline"},{value:"armed_night",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"armed_night"}),e.language),icon:"hass:power-sleep"},{value:"triggered",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"triggered"}),e.language),icon:"hass:alarm-light-outline"}])(t,s);case"binary_sensor":return((e,t)=>[{value:"off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:Re(Object.assign(Object.assign({},t),{state:"off"}))},{value:"on",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:Re(Object.assign(Object.assign({},t),{state:"on"}))}])(t,s);case"climate":return((e,t)=>{const i=[{value:"off",icon:"hass:power-off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language)},{value:"heat",icon:"hass:fire",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"heat"}),e.language)},{value:"cool",icon:"hass:snowflake",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"cool"}),e.language)},{value:"heat_cool",icon:"hass:thermometer",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"heat_cool"}),e.language)},{value:"auto",icon:"hass:autorenew",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"auto"}),e.language)},{value:"dry",icon:"hass:water-percent",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"dry"}),e.language)},{value:"fan_only",icon:"hass:fan",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"fan_only"}),e.language)}];return t&&t.attributes.hvac_modes&&Array.isArray(t.attributes.hvac_modes)?i.filter(e=>t.attributes.hvac_modes.includes(e.value)):i})(t,s);case"cover":return((e,t)=>[{value:"closed",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"closed"}),e.language),icon:Re(Object.assign(Object.assign({},t),{state:"closed"}))},{value:"open",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"open"}),e.language),icon:Re(Object.assign(Object.assign({},t),{state:"open"}))}])(t,s);case"device_tracker":return((e,t)=>[{value:"home",name:e.localize("state_badge.device_tracker.home",e.language),icon:"hass:home-outline"},{value:"not_home",name:e.localize("state_badge.device_tracker.not_home",e.language),icon:"hass:exit-run"}])(t);case"fan":return((e,t)=>[{value:"off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:power-off"},{value:"on",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:power"}])(t,s);case"group":const e=s&&s.attributes.entity_id&&Array.isArray(s.attributes.entity_id)?s.attributes.entity_id:[];return((e,t,i)=>{if(!i.length||!Array.isArray(i[0]))return[];let s=[...i[0]];return s.length?(i.filter(e=>Array.isArray(e)).forEach(e=>{s=s.filter(t=>e.find(e=>e.value==t.value))}),s):[]})(0,0,e.map(e=>Es(e,t)));case"input_boolean":return((e,t)=>[{value:"off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:flash-off"},{value:"on",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:flash"}])(t,s);case"input_select":return((e,t)=>Wi(e.localize,t).map(e=>Object.assign(e,{name:e.value})))(t,s);case"switch":return((e,t)=>[{value:"off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:flash-off"},{value:"on",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:flash"}])(t,s);case"light":return((e,t)=>[{value:"off",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"off"}),e.language),icon:"hass:lightbulb-off"},{value:"on",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"on"}),e.language),icon:"hass:lightbulb"}])(t,s);case"lock":return((e,t)=>[{value:"unlocked",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"unlocked"}),e.language),icon:"hass:lock-open-variant-outline"},{value:"locked",name:Ce(e.localize,Object.assign(Object.assign({},t),{state:"locked"}),e.language),icon:"hass:lock-outline"}])(t,s);case"person":return((e,t)=>[{value:"home",name:e.localize("state_badge.person.home",e.language),icon:"hass:home-outline"},{value:"not_home",name:e.localize("state_badge.person.not_home",e.language),icon:"hass:exit-run"}])(t);default:return[]}}catch(t){return console.error(`Scheduler-card failed to load states for '${e}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`),[]}}let Cs=class extends ae{constructor(){super(...arguments),this.addCondition=!1,this.matchTypes={}}firstUpdated(){this.matchTypes={[Ie.Above]:{value:Ie.Above,name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.above"),icon:"hass:greater-than"},[Ie.Below]:{value:Ie.Below,name:this.hass.localize("ui.panel.config.automation.editor.triggers.type.numeric_state.below"),icon:"hass:less-than"},[Ie.Equal]:{value:Ie.Equal,name:zi("ui.panel.conditions.equal_to",this.hass.language),icon:"hass:equal"},[Ie.Unequal]:{value:Ie.Unequal,name:zi("ui.panel.conditions.unequal_to",this.hass.language),icon:"hass:not-equal-variant"}}}render(){if(!this.hass||!this.config||!this.schedule)return L``;const e=[{name:this.hass.localize("ui.panel.config.automation.editor.actions.type.repeat.label"),id:Me.Repeat,icon:"refresh"},{name:this.hass.localize("ui.dialogs.more_info_control.vacuum.stop"),id:Me.Pause,icon:"stop"},{name:this.hass.localize("ui.common.delete"),id:Me.Single,icon:"trash-can-outline"}];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${void 0!==this.config.title?"string"==typeof this.config.title?this.config.title:"":zi("ui.panel.common.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.addCondition?this.renderAddCondition():L`

          <div class="header">
            ${this.hass.localize("ui.panel.config.automation.editor.actions.type.choose.conditions")}
          ${!this.schedule.timeslots[0].conditions||this.schedule.timeslots[0].conditions.length<2?"":L`
            <div class="switch">
            ${zi("ui.panel.conditions.any",this.hass.language)}
            <ha-switch
              style="margin: 0px 10px"
              @change=${this.conditionTypeSwitchClick}
              ?checked=${this.schedule.timeslots[0].condition_type==Le.All}
            ></ha-switch>
            ${zi("ui.panel.conditions.all",this.hass.language)}         
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
            value=${this.schedule.name||""}
            placeholder=${this.schedule.name?"":this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @value-changed=${this.updateName}
          ></paper-input>

          <div class="header">${zi("ui.panel.options.repeat_type",this.hass.language)}</div>
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
    `}renderAddCondition(){if(!this.addCondition||!this.hass||!this.config)return L``;if(this.selectedEntity){const e=ns(this.selectedEntity,this.hass,this.config),t=this.hass.states[this.selectedEntity],i=Es(this.selectedEntity,this.hass),s="sensor"==Oe(this.selectedEntity)&&!isNaN(Number(t.state))||["proximity","input_number"].includes(Oe(this.selectedEntity))?Object.entries(Je(this.matchTypes,[Ie.Above,Ie.Below])).map(([e,t])=>Object.assign(t,{id:e})):Object.entries(Je(this.matchTypes,[Ie.Equal,Ie.Unequal])).map(([e,t])=>Object.assign(t,{id:e}));return L`
      <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
      <div style="display: flex; flex-direction: row; align-items: center">
        <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)"
        >
          <ha-icon icon="${tt(e.icon||"folder-outline")}"></ha-icon>
          ${et(e.name)}
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
        ${i&&i.length?L`
      <button-group
        .items=${i.map(e=>Object.assign(e,{id:e.value}))}
        value=${this.conditionValue}
        @change=${e=>{this.conditionValue=e.target.value}}
        >
      </button-group>
        `:L`
            <paper-input
              label="${this.hass.localize("ui.panel.config.automation.editor.conditions.type.state.label")}${t.attributes.unit_of_measurement?` [${t.attributes.unit_of_measurement}]`:""}"
              value=${this.conditionValue?this.conditionValue:""}
              @value-changed=${e=>{const t=e.target.value;this.conditionValue=isNaN(Number(t))?t:Number(t)}}
            >
            </paper-input>
        `}
      `}{const e=fs(Object.keys(this.hass.states).filter(e=>Qi(e,this.config)).filter(e=>{var t;return(null===(t=Es(e,this.hass))||void 0===t?void 0:t.length)||["sensor","proximity","input_number"].includes(Oe(e))}),this.config,this.hass);e.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1);let t=[];return this.selectedGroup&&(t=e.find(e=>e.id==this.selectedGroup).entities.map(e=>ns(e,this.hass,this.config)),t.sort((e,t)=>e.name.trim().toLowerCase()<t.name.trim().toLowerCase()?-1:1)),L`
      <div class="header">${this.hass.localize("ui.panel.config.users.editor.group")}</div>
      
      <button-group .items=${e} value=${this.selectedGroup} @change=${this.selectGroup}>
        ${zi("ui.panel.entity_picker.no_groups_defined",this.hass.language)}
      </button-group>

      <div class="header">${this.hass.localize("ui.components.entity.entity-picker.entity")}</div>
      <button-group .items=${t} value=${this.selectedEntity} @change=${this.selectEntity}>
        ${this.selectedGroup?zi("ui.panel.entity_picker.no_entities_for_group",this.hass.language):zi("ui.panel.entity_picker.no_group_selected",this.hass.language)}
      </button-group>
    `}}selectGroup(e){this.selectedGroup=e.target.value,this.selectedEntity=void 0}selectEntity(e){const t=e.target.value;this.selectedEntity=t,this.conditionMatchType=void 0,this.conditionValue=void 0}renderConditions(){if(!this.hass||!this.schedule||!Object.keys(this.matchTypes).length)return L``;const e=this.schedule.timeslots[0].conditions||[];return e.length?e.map((e,t)=>{const i=ns(e.entity_id,this.hass,this.config),s=Es(e.entity_id,this.hass),a=this.hass.states[e.entity_id],n=null==s?void 0:s.find(t=>t.value==e.value);return L`
        <div class="summary">
            <ha-icon icon="${i.icon||"folder-outline"}"></ha-icon>
            <span>
              ${et(i.name)}
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
        <div class="text-field">${zi("ui.panel.conditions.no_conditions_defined",this.hass.language)}</div>
      `}addConditionClick(){this.addCondition=!0,this.selectedEntity=void 0,this.selectedGroup=void 0}confirmConditionClick(){var e;if(!(this.selectedEntity&&this.config&&this.hass&&this.schedule&&this.conditionMatchType&&this.conditionValue))return;const t={entity_id:this.selectedEntity,match_type:this.conditionMatchType,value:this.conditionValue,attribute:"state"},i=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[],s=this.schedule.timeslots[0].condition_type?this.schedule.timeslots[0].condition_type:Le.Any;void 0===this.editItem?i.push(t):i.splice(this.editItem,1,t),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:i,condition_type:s}))}),this.addCondition=!1,this.editItem=void 0}cancelConditionClick(){this.addCondition=!1,this.editItem=void 0}editConditionClick(e){var t;if(!(this.schedule&&this.schedule.timeslots[0].conditions&&this.hass&&this.config))return;const i=this.schedule.timeslots[0].conditions[e];if(!i)return;this.editItem=e;const s=fs(Object.keys(this.hass.states).filter(e=>Qi(e,this.config)).filter(e=>{var t;return(null===(t=Es(e,this.hass))||void 0===t?void 0:t.length)||["sensor","proximity","input_number"].includes(Oe(e))}),this.config,this.hass);this.selectedGroup=null===(t=s.find(e=>e.entities.includes(i.entity_id)))||void 0===t?void 0:t.id,this.selectedEntity=i.entity_id,this.conditionMatchType=i.match_type,this.conditionValue=i.value,this.addCondition=!0}deleteConditionClick(){var e;if(!this.config||!this.hass||!this.schedule||void 0===this.editItem)return;const t=(null===(e=this.schedule.timeslots[0].conditions)||void 0===e?void 0:e.length)?[...this.schedule.timeslots[0].conditions]:[];t.splice(this.editItem,1),this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{conditions:t}))}),this.addCondition=!1,this.editItem=void 0}conditionTypeSwitchClick(e){if(!this.schedule)return;const t=e.target.checked?Le.All:Le.Any;this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:this.schedule.timeslots.map(e=>Object.assign(e,{condition_type:t}))})}updateName(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{name:t})}updateRepeatType(e){const t=e.target.value;this.schedule=Object.assign(Object.assign({},this.schedule),{repeat_type:t})}cancelClick(){if(this.addCondition)this.addCondition=!this.addCondition;else{const e=new CustomEvent("cancelClick");this.dispatchEvent(e)}}saveClick(){const e=new CustomEvent("saveClick",{detail:this.schedule});this.dispatchEvent(e)}backClick(){const e=new CustomEvent("backClick",{detail:this.schedule});this.dispatchEvent(e)}};Cs.styles=ie`
    ${Si}
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
  `,t([K()],Cs.prototype,"hass",void 0),t([K()],Cs.prototype,"config",void 0),t([K()],Cs.prototype,"schedule",void 0),t([K()],Cs.prototype,"selectedGroup",void 0),t([K()],Cs.prototype,"selectedEntity",void 0),t([K()],Cs.prototype,"conditionMatchType",void 0),t([K()],Cs.prototype,"conditionValue",void 0),t([K()],Cs.prototype,"editItem",void 0),t([K()],Cs.prototype,"addCondition",void 0),Cs=t([J("scheduler-options-card")],Cs);let As=class extends ae{constructor(){super(...arguments),this.selectedDomain="",this.titleOption="standard",this.scheduleEntities=[]}setConfig(e){this._config=e,this.titleOption=this.getTitleOption()}async firstUpdated(){this.scheduleEntities=(await _s(this.hass)).map(e=>e.entity_id)}render(){return this.hass?L`
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
        <div class="text-field">Select the entities that you want to control using the scheduler. You can click on a group to open it.<br> Note that some entities (such as sensors) can only be used for conditions, not for actions.</div>
        ${this.getDomainSwitches()}
      </div>
    `:L``}getTitleOption(){return this._config&&this.hass?void 0===this._config.title?"standard":"string"==typeof this._config.title?"custom":0==this._config.title?"hidden":"standard":"standard"}getTitle(){return this.hass?this._config&&this.hass?void 0===this._config.title?zi("ui.panel.common.title",this.hass.language):"string"==typeof this._config.title?this._config.title:0==this._config.title?"":zi("ui.panel.common.title",this.hass.language):zi("ui.panel.common.title",this.hass.language):""}updateTitleOption(e){const t=e.target.value;if(!this._config||!this.hass)return;this.titleOption=t;const i=Object.assign({},this._config);"standard"==t?"title"in this._config&&delete i.title:"hidden"==t&&Object.assign(i,{title:!1}),this._config=i,Te(this,"config-changed",{config:this._config})}updateTitle(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=String(e.target.value);Object.assign(t,{title:i}),this._config=t,Te(this,"config-changed",{config:this._config})}getDiscoveryOption(){if(!this._config||!this.hass)return;return!this._config.hasOwnProperty("discover_existing")||this._config.discover_existing}updateDiscoveryOption(e){const t="true"==e.target.value;if(!this._config||!this.hass)return;const i=Object.assign({},this._config);t?i.hasOwnProperty("discover_existing")&&delete i.discover_existing:Object.assign(i,{discover_existing:t}),this._config=i,Te(this,"config-changed",{config:this._config})}getTimeStepOption(){if(!this._config||!this.hass)return;const e=this._config.hasOwnProperty("time_step")?this._config.time_step:10;return Number(e)}updateTimeStepOption(e){if(!this._config||!this.hass)return;const t=Object.assign({},this._config),i=Number(e.target.value);10==i&&t.hasOwnProperty("time_step")?delete t.time_step:Object.assign(t,{time_step:i}),this._config=t,Te(this,"config-changed",{config:this._config})}getDomainSwitches(){if(!this._config||!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>"switch"!=Oe(e)||!this.scheduleEntities.includes(e)).map(e=>ns(e,this.hass,{include:["*"]})).filter(e=>{var t;return(null===(t=Es(e.id,this.hass))||void 0===t?void 0:t.length)||ts(e.id,this.hass,{}).length}),t=e.map(e=>Oe(e.id)).filter((e,t,i)=>i.indexOf(e)===t);t.sort((e,t)=>e.trim().toLowerCase()<t.trim().toLowerCase()?-1:1);const i=this._config.include?[...this._config.include]:[];return t.map(t=>{const s=e.filter(e=>Oe(e.id)==t).length;return s?L`
        <div
          class="row"
          @click=${()=>{this.toggleShowDomain(t)}}
        >
          <ha-icon icon="${tt(ss[t])}"> </ha-icon>

          <div class="info">
            ${t}
            <div class="secondary">
              ${s} ${1==s?"entity":"entities"}
            </div>
          </div>
          <ha-switch
            @click=${e=>{e.stopPropagation()}}
            @change=${e=>this.toggleSelectDomain(t,e.target.checked)}}
            ?checked=${i.includes(t)}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain==t?L`
              <div class="divider"></div>
              ${this.getEntitySwitches(t)}
              <div class="divider"></div>
            `:""}
      `:""})}getEntitySwitches(e){if(!this._config||!this.hass)return;const t=this._config.include?[...this._config.include]:[];return Object.entries(this.hass.states).filter(([t])=>Oe(t)==e).filter(([t])=>"switch"!=e||!this.scheduleEntities.includes(t)).map(([e,i])=>{const s=i.attributes.friendly_name||Ee(e),a=t.includes(e)||t.includes(Oe(e));return L`
          <div class="row" @click=${()=>this.toggleSelectEntity(e)}>
            <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e]}> </state-badge>
            <div class="info">
              ${s}
              <div class="secondary">
                ${e}
              </div>
            </div>
            <ha-switch
              ?checked=${a}
              ?disabled=${t.includes(Oe(e))}
            ></ha-switch>
          </div>
        `})}toggleShowDomain(e){this._config&&this.hass&&(this.selectedDomain!=e?this.selectedDomain=e:this.selectedDomain="")}toggleSelectDomain(e,t){if(!this._config||!this.hass)return;let i=this._config.include?[...this._config.include]:[];if(!i.includes(e)&&t)i=i.filter(t=>!t.startsWith(e)),i.push(e);else{if(!i.includes(e)||t)return;i=i.filter(t=>t!=e)}i.sort(),this._config=Object.assign(Object.assign({},this._config),{include:i}),Te(this,"config-changed",{config:this._config})}toggleSelectEntity(e){if(!this._config||!this.hass)return;let t=this._config.include?[...this._config.include]:[];t.includes(e)?t=t.filter(t=>t!=e):t.push(e),t.sort(),this._config=Object.assign(Object.assign({},this._config),{include:t}),Te(this,"config-changed",{config:this._config})}static get styles(){return ie`
      ${Si}
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
    `}};t([K()],As.prototype,"hass",void 0),t([K()],As.prototype,"_config",void 0),t([K()],As.prototype,"selectedDomain",void 0),t([K()],As.prototype,"titleOption",void 0),t([K()],As.prototype,"scheduleEntities",void 0),As=t([J("scheduler-card-editor")],As);let Ts=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
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
    `}};t([K({attribute:!1})],Ts.prototype,"hass",void 0),t([Q()],Ts.prototype,"_params",void 0),Ts=t([J("dialog-error")],Ts);var Ds=Object.freeze({__proto__:null,get DialogError(){return Ts}});let Ns=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`

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
      
    `:L``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([K({attribute:!1})],Ns.prototype,"hass",void 0),t([Q()],Ns.prototype,"_params",void 0),Ns=t([J("dialog-delete-defective")],Ns);var Ms=Object.freeze({__proto__:null,get DialogDeleteDefective(){return Ns}});window.customCards=window.customCards||[],window.customCards.push({type:"scheduler-card",name:"Scheduler Card",description:"Card to manage schedule entities made with scheduler-component."}),console.info("%c  SCHEDULER-CARD  \n%c  Version: "+"v2.0.5".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),e.SchedulerCard=class extends ae{constructor(){super(...arguments),this._view=We.Overview,this.actions=[],this.translationsLoaded=!1,this.editItem=null}static getConfigElement(){return document.createElement("scheduler-card-editor")}set hass(e){this._hass=e}firstUpdated(){const e=this._hass;if(e.localize("ui.panel.config.automation.editor.actions.name"))this.translationsLoaded=!0;else{document.querySelector("home-assistant")._loadFragmentTranslations(e.language,"config").then(()=>{this._hass.localize})}}shouldUpdate(e){const t=e.get("_hass");return!t||1!=e.size||(t.localize("ui.panel.config.automation.editor.actions.name")?this._view==We.Overview:(this.translationsLoaded=!0,!0))}setConfig(e){st(e),this._config=e}getCardSize(){return 9}render(){return this._hass&&this._config&&this.translationsLoaded?this._view==We.Overview?L`
        <scheduler-entities-card
          .hass=${this._hass}
          .config=${this._config}
          @editClick=${this._editItemClick}
          @newClick=${this._addItemClick}
        >
        </scheduler-entities-card>
      `:this._view==We.NewSchedule?L`
        <scheduler-editor-card
          .hass=${this._hass}
          .config=${this._config}
          .entities=${this.entities}
          .schedule=${this.schedule}
          @nextClick=${this._confirmItemClick}
          @cancelClick=${this._cancelEditClick}
        >
        </scheduler-editor-card>
      `:this._view==We.TimePicker||this._view==We.TimeScheme?L`
        <scheduler-timepicker-card
          .hass=${this._hass}
          .config=${this._config}
          .schedule=${this.schedule}
          .entities=${this.entities}
          .actions=${this.actions}
          ?timeslots=${this._view==We.TimeScheme}
          ?editItem=${null!==this.editItem}
          @cancelClick=${this._cancelEditClick}
          @saveClick=${this._saveItemClick}
          @optionsClick=${this._gotoOptionsClick}
          @deleteClick=${this._deleteItemClick}
          @editActionClick=${this._editActionClick}
        >
        </scheduler-timepicker-card>
      `:this._view==We.Options?L`
      <scheduler-options-card
        .hass=${this._hass}
        .config=${this._config}
        .schedule=${this.schedule}
        @cancelClick=${this._cancelEditClick}
        @saveClick=${this._saveItemClick}
        @backClick=${this._optionsBackClick}
      >
      </scheduler-timescheme-card>
    `:L``:L``}_addItemClick(){this._view=We.NewSchedule,this.editItem=null,this.entities=[],this.actions=[],this.schedule=void 0}_cancelEditClick(){this._view=We.Overview,this.editItem=null}_confirmItemClick(e){if(!this._hass||!this._config)return;const t=e.detail.entities;this.entities=t.map(e=>ns(e,this._hass,this._config));const i=e.detail.action,s=this.schedule;if("make_scheme"!=i){this.actions=[ts(t,this._hass,this._config).find(e=>e.id==i)];const e={start:"12:00:00",actions:Ke(t.map(e=>Object({service:this.actions[0].service,entity_id:e,service_data:this.actions[0].service_data})))};this.schedule=s?Object.assign(Object.assign({},s),{timeslots:1!=s.timeslots.length||s.timeslots[0].stop?[e]:[Object.assign(Object.assign({},s.timeslots[0]),{actions:e.actions})]}):{weekdays:["daily"],timeslots:[e],repeat_type:Me.Repeat},this._view=We.TimePicker}else{this.actions=ts(t,this._hass,this._config);const e=[{start:"00:00:00",stop:"08:00:00",actions:[]},{start:"08:00:00",stop:"16:00:00",actions:[]},{start:"16:00:00",stop:"00:00:00",actions:[]}];this.schedule=s?Object.assign(Object.assign({},s),{timeslots:s.timeslots.length>1&&s.timeslots.every(e=>e.stop)?s.timeslots.map(e=>Object.assign(e,{actions:[]})):e}):{weekdays:["daily"],timeslots:e,repeat_type:Me.Repeat},this._view=We.TimeScheme}}_editActionClick(e){this.schedule=e.detail,this._view=We.NewSchedule}_saveItemClick(e){if(!this._hass)return;let t=e.detail;var i,s,a;t=Object.assign(Object.assign({},t),{timeslots:t.timeslots.map(e=>{var t;return e.actions&&e.actions.length?(e.stop||(e=Ze(e,["stop"])),(null===(t=e.conditions)||void 0===t?void 0:t.length)||(e=Ze(e,["conditions","condition_type"])),e):null}).filter(e=>e)}),this.editItem?((a=t.name)&&null!==a.match(/^Schedule\ #[a-f0-9]{6}/)&&(t=Object.assign(Object.assign({},t),{name:""})),(i=this._hass,s=Object.assign(Object.assign({},t),{schedule_id:this.editItem}),i.callApi("POST","scheduler/edit",s)).catch(e=>gs(e,this)).then(()=>{this.editItem=null,this._view=We.Overview})):((e,t)=>e.callApi("POST","scheduler/add",t))(this._hass,t).catch(e=>gs(e,this)).then(()=>{this._view=We.Overview})}_deleteItemClick(){if(!this.editItem||!this._hass)return;const e=this.editItem;var t,i;(t=this._hass,i=e,t.callApi("POST","scheduler/remove",{schedule_id:i})).catch(e=>gs(e,this)).then(()=>{this.editItem=null,this._view=We.Overview})}async _editItemClick(e){if(!this._hass||!this._config)return;const t=await(i=this._hass,s=e.detail,i.callWS({type:"scheduler/item",schedule_id:s}));var i,s;if(!t)return;const a=Qe(Ke(t.timeslots.map(e=>e.actions.map(e=>e.entity_id))));this.entities=a.map(e=>ns(e,this._hass,this._config));let n=ts(a,this._hass,this._config);const o=Qe(Ke(t.timeslots.map(e=>e.actions)));if(o.forEach(e=>{n.find(t=>Fi(t,e))||n.push(is(e,this._hass,this._config))}),this.actions=n,this.schedule={weekdays:t.weekdays,timeslots:t.timeslots,repeat_type:t.repeat_type,name:t.name},this.editItem=t.schedule_id,this.entities.length&&this.schedule.timeslots.length)this.schedule.timeslots.every(e=>e.stop)?(this._view=We.TimeScheme,this.schedule=Object.assign(Object.assign({},this.schedule),{timeslots:it(this.schedule.timeslots)})):(this._view=We.TimePicker,this.actions=this.actions.filter(e=>o.find(t=>Fi(e,t))));else{await new Promise(e=>{Te(this,"show-dialog",{dialogTag:"dialog-delete-defective",dialogImport:()=>Promise.resolve().then((function(){return Ms})),dialogParams:{cancel:()=>{e(!1)},confirm:()=>{e(!0)}}})})?this._deleteItemClick():this._cancelEditClick()}}_gotoOptionsClick(e){this.schedule=e.detail,this._view=We.Options}_optionsBackClick(e){this.schedule=e.detail,this.schedule.timeslots.every(e=>e.stop)?this._view=We.TimeScheme:this._view=We.TimePicker}},t([K()],e.SchedulerCard.prototype,"_hass",void 0),t([K()],e.SchedulerCard.prototype,"_view",void 0),t([K()],e.SchedulerCard.prototype,"entities",void 0),t([K()],e.SchedulerCard.prototype,"actions",void 0),t([K()],e.SchedulerCard.prototype,"schedule",void 0),t([K()],e.SchedulerCard.prototype,"translationsLoaded",void 0),e.SchedulerCard=t([J("scheduler-card")],e.SchedulerCard)}({});
