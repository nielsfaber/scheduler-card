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
    /**
     * True if the custom elements polyfill is in use.
     */
    const isCEPolyfill = typeof window !== 'undefined' &&
        window.customElements != null &&
        window.customElements.polyfillWrapFlushCallback !==
            undefined;
    /**
     * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
     * `container`.
     */
    const removeNodes = (container, start, end = null) => {
        while (start !== end) {
            const n = start.nextSibling;
            container.removeChild(start);
            start = n;
        }
    };
    //# sourceMappingURL=dom.js.map

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
    /**
     * An expression marker with embedded unique key to avoid collision with
     * possible text in templates.
     */
    const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
    /**
     * An expression marker used text-positions, multi-binding attributes, and
     * attributes with markup-like text values.
     */
    const nodeMarker = `<!--${marker}-->`;
    const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
    /**
     * Suffix appended to all bound attribute names.
     */
    const boundAttributeSuffix = '$lit$';
    /**
     * An updatable Template that tracks the location of dynamic parts.
     */
    class Template {
        constructor(result, element) {
            this.parts = [];
            this.element = element;
            const nodesToRemove = [];
            const stack = [];
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            // Keeps track of the last index associated with a part. We try to delete
            // unnecessary nodes, but we never want to associate two different parts
            // to the same index. They must have a constant node between.
            let lastPartIndex = 0;
            let index = -1;
            let partIndex = 0;
            const { strings, values: { length } } = result;
            while (partIndex < length) {
                const node = walker.nextNode();
                if (node === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    continue;
                }
                index++;
                if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        const attributes = node.attributes;
                        const { length } = attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondence between part index and attribute index.
                        let count = 0;
                        for (let i = 0; i < length; i++) {
                            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            const stringForPart = strings[partIndex];
                            // Find the attribute name
                            const name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            const attributeValue = node.getAttribute(attributeLookupName);
                            node.removeAttribute(attributeLookupName);
                            const statics = attributeValue.split(markerRegex);
                            this.parts.push({ type: 'attribute', index, name, strings: statics });
                            partIndex += statics.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                }
                else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    const data = node.data;
                    if (data.indexOf(marker) >= 0) {
                        const parent = node.parentNode;
                        const strings = data.split(markerRegex);
                        const lastIndex = strings.length - 1;
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        for (let i = 0; i < lastIndex; i++) {
                            let insert;
                            let s = strings[i];
                            if (s === '') {
                                insert = createMarker();
                            }
                            else {
                                const match = lastAttributeNameRegex.exec(s);
                                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                    s = s.slice(0, match.index) + match[1] +
                                        match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                                }
                                insert = document.createTextNode(s);
                            }
                            parent.insertBefore(insert, node);
                            this.parts.push({ type: 'node', index: ++index });
                        }
                        // If there's no text, we must insert a comment to mark our place.
                        // Else, we can trust it will stick around after cloning.
                        if (strings[lastIndex] === '') {
                            parent.insertBefore(createMarker(), node);
                            nodesToRemove.push(node);
                        }
                        else {
                            node.data = strings[lastIndex];
                        }
                        // We have a part for each match found
                        partIndex += lastIndex;
                    }
                }
                else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.data === marker) {
                        const parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * The previousSibling is already the start of a previous part
                        if (node.previousSibling === null || index === lastPartIndex) {
                            index++;
                            parent.insertBefore(createMarker(), node);
                        }
                        lastPartIndex = index;
                        this.parts.push({ type: 'node', index });
                        // If we don't have a nextSibling, keep this node so we have an end.
                        // Else, we can remove it to save future costs.
                        if (node.nextSibling === null) {
                            node.data = '';
                        }
                        else {
                            nodesToRemove.push(node);
                            index--;
                        }
                        partIndex++;
                    }
                    else {
                        let i = -1;
                        while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            this.parts.push({ type: 'node', index: -1 });
                            partIndex++;
                        }
                    }
                }
            }
            // Remove text binding nodes after the walk to not disturb the TreeWalker
            for (const n of nodesToRemove) {
                n.parentNode.removeChild(n);
            }
        }
    }
    const endsWith = (str, suffix) => {
        const index = str.length - suffix.length;
        return index >= 0 && str.slice(index) === suffix;
    };
    const isTemplatePartActive = (part) => part.index !== -1;
    // Allows `document.createComment('')` to be renamed for a
    // small manual size-savings.
    const createMarker = () => document.createComment('');
    /**
     * This regex extracts the attribute name preceding an attribute-position
     * expression. It does this by matching the syntax allowed for attributes
     * against the string literal directly preceding the expression, assuming that
     * the expression is in an attribute-value position.
     *
     * See attributes in the HTML spec:
     * https://www.w3.org/TR/html5/syntax.html#elements-attributes
     *
     * " \x09\x0a\x0c\x0d" are HTML space characters:
     * https://www.w3.org/TR/html5/infrastructure.html#space-characters
     *
     * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
     * space character except " ".
     *
     * So an attribute is:
     *  * The name: any character except a control character, space character, ('),
     *    ("), ">", "=", or "/"
     *  * Followed by zero or more space characters
     *  * Followed by "="
     *  * Followed by zero or more space characters
     *  * Followed by:
     *    * Any character except space, ('), ("), "<", ">", "=", (`), or
     *    * (") then any non-("), or
     *    * (') then any non-(')
     */
    const lastAttributeNameRegex = 
    // eslint-disable-next-line no-control-regex
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    //# sourceMappingURL=template.js.map

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
    const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
    /**
     * Removes the list of nodes from a Template safely. In addition to removing
     * nodes from the Template, the Template part indices are updated to match
     * the mutated Template DOM.
     *
     * As the template is walked the removal state is tracked and
     * part indices are adjusted as needed.
     *
     * div
     *   div#1 (remove) <-- start removing (removing node is div#1)
     *     div
     *       div#2 (remove)  <-- continue removing (removing node is still div#1)
     *         div
     * div <-- stop removing since previous sibling is the removing node (div#1,
     * removed 4 nodes)
     */
    function removeNodesFromTemplate(template, nodesToRemove) {
        const { element: { content }, parts } = template;
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let part = parts[partIndex];
        let nodeIndex = -1;
        let removeCount = 0;
        const nodesToRemoveInTemplate = [];
        let currentRemovingNode = null;
        while (walker.nextNode()) {
            nodeIndex++;
            const node = walker.currentNode;
            // End removal if stepped past the removing node
            if (node.previousSibling === currentRemovingNode) {
                currentRemovingNode = null;
            }
            // A node to remove was found in the template
            if (nodesToRemove.has(node)) {
                nodesToRemoveInTemplate.push(node);
                // Track node we're removing
                if (currentRemovingNode === null) {
                    currentRemovingNode = node;
                }
            }
            // When removing, increment count by which to adjust subsequent part indices
            if (currentRemovingNode !== null) {
                removeCount++;
            }
            while (part !== undefined && part.index === nodeIndex) {
                // If part is in a removed node deactivate it by setting index to -1 or
                // adjust the index as needed.
                part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
                // go to the next active part.
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                part = parts[partIndex];
            }
        }
        nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
    }
    const countNodes = (node) => {
        let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
        const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
        while (walker.nextNode()) {
            count++;
        }
        return count;
    };
    const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
        for (let i = startIndex + 1; i < parts.length; i++) {
            const part = parts[i];
            if (isTemplatePartActive(part)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Inserts the given node into the Template, optionally before the given
     * refNode. In addition to inserting the node into the Template, the Template
     * part indices are updated to match the mutated Template DOM.
     */
    function insertNodeIntoTemplate(template, node, refNode = null) {
        const { element: { content }, parts } = template;
        // If there's no refNode, then put node at end of template.
        // No part indices need to be shifted in this case.
        if (refNode === null || refNode === undefined) {
            content.appendChild(node);
            return;
        }
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let insertCount = 0;
        let walkerIndex = -1;
        while (walker.nextNode()) {
            walkerIndex++;
            const walkerNode = walker.currentNode;
            if (walkerNode === refNode) {
                insertCount = countNodes(node);
                refNode.parentNode.insertBefore(node, refNode);
            }
            while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
                // If we've inserted the node, simply adjust all subsequent parts
                if (insertCount > 0) {
                    while (partIndex !== -1) {
                        parts[partIndex].index += insertCount;
                        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                    }
                    return;
                }
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            }
        }
    }
    //# sourceMappingURL=modify-template.js.map

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
    const directives = new WeakMap();
    /**
     * Brands a function as a directive factory function so that lit-html will call
     * the function during template rendering, rather than passing as a value.
     *
     * A _directive_ is a function that takes a Part as an argument. It has the
     * signature: `(part: Part) => void`.
     *
     * A directive _factory_ is a function that takes arguments for data and
     * configuration and returns a directive. Users of directive usually refer to
     * the directive factory as the directive. For example, "The repeat directive".
     *
     * Usually a template author will invoke a directive factory in their template
     * with relevant arguments, which will then return a directive function.
     *
     * Here's an example of using the `repeat()` directive factory that takes an
     * array and a function to render an item:
     *
     * ```js
     * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
     * ```
     *
     * When `repeat` is invoked, it returns a directive function that closes over
     * `items` and the template function. When the outer template is rendered, the
     * return directive function is called with the Part for the expression.
     * `repeat` then performs it's custom logic to render multiple items.
     *
     * @param f The directive factory function. Must be a function that returns a
     * function of the signature `(part: Part) => void`. The returned function will
     * be called with the part object.
     *
     * @example
     *
     * import {directive, html} from 'lit-html';
     *
     * const immutable = directive((v) => (part) => {
     *   if (part.value !== v) {
     *     part.setValue(v)
     *   }
     * });
     */
    const directive = (f) => ((...args) => {
        const d = f(...args);
        directives.set(d, true);
        return d;
    });
    const isDirective = (o) => {
        return typeof o === 'function' && directives.has(o);
    };
    //# sourceMappingURL=directive.js.map

    /**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
    /**
     * A sentinel value that signals that a value was handled by a directive and
     * should not be written to the DOM.
     */
    const noChange = {};
    /**
     * A sentinel value that signals a NodePart to fully clear its content.
     */
    const nothing = {};
    //# sourceMappingURL=part.js.map

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
    /**
     * An instance of a `Template` that can be attached to the DOM and updated
     * with new values.
     */
    class TemplateInstance {
        constructor(template, processor, options) {
            this.__parts = [];
            this.template = template;
            this.processor = processor;
            this.options = options;
        }
        update(values) {
            let i = 0;
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.setValue(values[i]);
                }
                i++;
            }
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.commit();
                }
            }
        }
        _clone() {
            // There are a number of steps in the lifecycle of a template instance's
            // DOM fragment:
            //  1. Clone - create the instance fragment
            //  2. Adopt - adopt into the main document
            //  3. Process - find part markers and create parts
            //  4. Upgrade - upgrade custom elements
            //  5. Update - set node, attribute, property, etc., values
            //  6. Connect - connect to the document. Optional and outside of this
            //     method.
            //
            // We have a few constraints on the ordering of these steps:
            //  * We need to upgrade before updating, so that property values will pass
            //    through any property setters.
            //  * We would like to process before upgrading so that we're sure that the
            //    cloned fragment is inert and not disturbed by self-modifying DOM.
            //  * We want custom elements to upgrade even in disconnected fragments.
            //
            // Given these constraints, with full custom elements support we would
            // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
            //
            // But Safari does not implement CustomElementRegistry#upgrade, so we
            // can not implement that order and still have upgrade-before-update and
            // upgrade disconnected fragments. So we instead sacrifice the
            // process-before-upgrade constraint, since in Custom Elements v1 elements
            // must not modify their light DOM in the constructor. We still have issues
            // when co-existing with CEv0 elements like Polymer 1, and with polyfills
            // that don't strictly adhere to the no-modification rule because shadow
            // DOM, which may be created in the constructor, is emulated by being placed
            // in the light DOM.
            //
            // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
            // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
            // in one step.
            //
            // The Custom Elements v1 polyfill supports upgrade(), so the order when
            // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
            // Connect.
            const fragment = isCEPolyfill ?
                this.template.element.content.cloneNode(true) :
                document.importNode(this.template.element.content, true);
            const stack = [];
            const parts = this.template.parts;
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            let partIndex = 0;
            let nodeIndex = 0;
            let part;
            let node = walker.nextNode();
            // Loop through all the nodes and parts of a template
            while (partIndex < parts.length) {
                part = parts[partIndex];
                if (!isTemplatePartActive(part)) {
                    this.__parts.push(undefined);
                    partIndex++;
                    continue;
                }
                // Progress the tree walker until we find our next part's node.
                // Note that multiple parts may share the same node (attribute parts
                // on a single element), so this loop may not run at all.
                while (nodeIndex < part.index) {
                    nodeIndex++;
                    if (node.nodeName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                    if ((node = walker.nextNode()) === null) {
                        // We've exhausted the content inside a nested template element.
                        // Because we still have parts (the outer for-loop), we know:
                        // - There is a template in the stack
                        // - The walker will find a nextNode outside the template
                        walker.currentNode = stack.pop();
                        node = walker.nextNode();
                    }
                }
                // We've arrived at our part's node.
                if (part.type === 'node') {
                    const part = this.processor.handleTextExpression(this.options);
                    part.insertAfterNode(node.previousSibling);
                    this.__parts.push(part);
                }
                else {
                    this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                }
                partIndex++;
            }
            if (isCEPolyfill) {
                document.adoptNode(fragment);
                customElements.upgrade(fragment);
            }
            return fragment;
        }
    }
    //# sourceMappingURL=template-instance.js.map

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
    /**
     * Our TrustedTypePolicy for HTML which is declared using the html template
     * tag function.
     *
     * That HTML is a developer-authored constant, and is parsed with innerHTML
     * before any untrusted expressions have been mixed in. Therefor it is
     * considered safe by construction.
     */
    const policy = window.trustedTypes &&
        trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
    const commentMarker = ` ${marker} `;
    /**
     * The return type of `html`, which holds a Template and the values from
     * interpolated expressions.
     */
    class TemplateResult {
        constructor(strings, values, type, processor) {
            this.strings = strings;
            this.values = values;
            this.type = type;
            this.processor = processor;
        }
        /**
         * Returns a string of HTML used to create a `<template>` element.
         */
        getHTML() {
            const l = this.strings.length - 1;
            let html = '';
            let isCommentBinding = false;
            for (let i = 0; i < l; i++) {
                const s = this.strings[i];
                // For each binding we want to determine the kind of marker to insert
                // into the template source before it's parsed by the browser's HTML
                // parser. The marker type is based on whether the expression is in an
                // attribute, text, or comment position.
                //   * For node-position bindings we insert a comment with the marker
                //     sentinel as its text content, like <!--{{lit-guid}}-->.
                //   * For attribute bindings we insert just the marker sentinel for the
                //     first binding, so that we support unquoted attribute bindings.
                //     Subsequent bindings can use a comment marker because multi-binding
                //     attributes must be quoted.
                //   * For comment bindings we insert just the marker sentinel so we don't
                //     close the comment.
                //
                // The following code scans the template source, but is *not* an HTML
                // parser. We don't need to track the tree structure of the HTML, only
                // whether a binding is inside a comment, and if not, if it appears to be
                // the first binding in an attribute.
                const commentOpen = s.lastIndexOf('<!--');
                // We're in comment position if we have a comment open with no following
                // comment close. Because <-- can appear in an attribute value there can
                // be false positives.
                isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                    s.indexOf('-->', commentOpen + 1) === -1;
                // Check to see if we have an attribute-like sequence preceding the
                // expression. This can match "name=value" like structures in text,
                // comments, and attribute values, so there can be false-positives.
                const attributeMatch = lastAttributeNameRegex.exec(s);
                if (attributeMatch === null) {
                    // We're only in this branch if we don't have a attribute-like
                    // preceding sequence. For comments, this guards against unusual
                    // attribute values like <div foo="<!--${'bar'}">. Cases like
                    // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                    // below.
                    html += s + (isCommentBinding ? commentMarker : nodeMarker);
                }
                else {
                    // For attributes we use just a marker sentinel, and also append a
                    // $lit$ suffix to the name to opt-out of attribute-specific parsing
                    // that IE and Edge do for style and certain SVG attributes.
                    html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                        attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                        marker;
                }
            }
            html += this.strings[l];
            return html;
        }
        getTemplateElement() {
            const template = document.createElement('template');
            let value = this.getHTML();
            if (policy !== undefined) {
                // this is secure because `this.strings` is a TemplateStringsArray.
                // TODO: validate this when
                // https://github.com/tc39/proposal-array-is-template-object is
                // implemented.
                value = policy.createHTML(value);
            }
            template.innerHTML = value;
            return template;
        }
    }
    //# sourceMappingURL=template-result.js.map

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
    const isPrimitive = (value) => {
        return (value === null ||
            !(typeof value === 'object' || typeof value === 'function'));
    };
    const isIterable = (value) => {
        return Array.isArray(value) ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !!(value && value[Symbol.iterator]);
    };
    /**
     * Writes attribute values to the DOM for a group of AttributeParts bound to a
     * single attribute. The value is only set once even if there are multiple parts
     * for an attribute.
     */
    class AttributeCommitter {
        constructor(element, name, strings) {
            this.dirty = true;
            this.element = element;
            this.name = name;
            this.strings = strings;
            this.parts = [];
            for (let i = 0; i < strings.length - 1; i++) {
                this.parts[i] = this._createPart();
            }
        }
        /**
         * Creates a single part. Override this to create a differnt type of part.
         */
        _createPart() {
            return new AttributePart(this);
        }
        _getValue() {
            const strings = this.strings;
            const l = strings.length - 1;
            const parts = this.parts;
            // If we're assigning an attribute via syntax like:
            //    attr="${foo}"  or  attr=${foo}
            // but not
            //    attr="${foo} ${bar}" or attr="${foo} baz"
            // then we don't want to coerce the attribute value into one long
            // string. Instead we want to just return the value itself directly,
            // so that sanitizeDOMValue can get the actual value rather than
            // String(value)
            // The exception is if v is an array, in which case we do want to smash
            // it together into a string without calling String() on the array.
            //
            // This also allows trusted values (when using TrustedTypes) being
            // assigned to DOM sinks without being stringified in the process.
            if (l === 1 && strings[0] === '' && strings[1] === '') {
                const v = parts[0].value;
                if (typeof v === 'symbol') {
                    return String(v);
                }
                if (typeof v === 'string' || !isIterable(v)) {
                    return v;
                }
            }
            let text = '';
            for (let i = 0; i < l; i++) {
                text += strings[i];
                const part = parts[i];
                if (part !== undefined) {
                    const v = part.value;
                    if (isPrimitive(v) || !isIterable(v)) {
                        text += typeof v === 'string' ? v : String(v);
                    }
                    else {
                        for (const t of v) {
                            text += typeof t === 'string' ? t : String(t);
                        }
                    }
                }
            }
            text += strings[l];
            return text;
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                this.element.setAttribute(this.name, this._getValue());
            }
        }
    }
    /**
     * A Part that controls all or part of an attribute value.
     */
    class AttributePart {
        constructor(committer) {
            this.value = undefined;
            this.committer = committer;
        }
        setValue(value) {
            if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
                this.value = value;
                // If the value is a not a directive, dirty the committer so that it'll
                // call setAttribute. If the value is a directive, it'll dirty the
                // committer if it calls setValue().
                if (!isDirective(value)) {
                    this.committer.dirty = true;
                }
            }
        }
        commit() {
            while (isDirective(this.value)) {
                const directive = this.value;
                this.value = noChange;
                directive(this);
            }
            if (this.value === noChange) {
                return;
            }
            this.committer.commit();
        }
    }
    /**
     * A Part that controls a location within a Node tree. Like a Range, NodePart
     * has start and end locations and can set and update the Nodes between those
     * locations.
     *
     * NodeParts support several value types: primitives, Nodes, TemplateResults,
     * as well as arrays and iterables of those types.
     */
    class NodePart {
        constructor(options) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.options = options;
        }
        /**
         * Appends this part into a container.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendInto(container) {
            this.startNode = container.appendChild(createMarker());
            this.endNode = container.appendChild(createMarker());
        }
        /**
         * Inserts this part after the `ref` node (between `ref` and `ref`'s next
         * sibling). Both `ref` and its next sibling must be static, unchanging nodes
         * such as those that appear in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterNode(ref) {
            this.startNode = ref;
            this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendIntoPart(part) {
            part.__insert(this.startNode = createMarker());
            part.__insert(this.endNode = createMarker());
        }
        /**
         * Inserts this part after the `ref` part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterPart(ref) {
            ref.__insert(this.startNode = createMarker());
            this.endNode = ref.endNode;
            ref.endNode = this.startNode;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            if (this.startNode.parentNode === null) {
                return;
            }
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            const value = this.__pendingValue;
            if (value === noChange) {
                return;
            }
            if (isPrimitive(value)) {
                if (value !== this.value) {
                    this.__commitText(value);
                }
            }
            else if (value instanceof TemplateResult) {
                this.__commitTemplateResult(value);
            }
            else if (value instanceof Node) {
                this.__commitNode(value);
            }
            else if (isIterable(value)) {
                this.__commitIterable(value);
            }
            else if (value === nothing) {
                this.value = nothing;
                this.clear();
            }
            else {
                // Fallback, will render the string representation
                this.__commitText(value);
            }
        }
        __insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
        }
        __commitNode(value) {
            if (this.value === value) {
                return;
            }
            this.clear();
            this.__insert(value);
            this.value = value;
        }
        __commitText(value) {
            const node = this.startNode.nextSibling;
            value = value == null ? '' : value;
            // If `value` isn't already a string, we explicitly convert it here in case
            // it can't be implicitly converted - i.e. it's a symbol.
            const valueAsString = typeof value === 'string' ? value : String(value);
            if (node === this.endNode.previousSibling &&
                node.nodeType === 3 /* Node.TEXT_NODE */) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if this.value is primitive?
                node.data = valueAsString;
            }
            else {
                this.__commitNode(document.createTextNode(valueAsString));
            }
            this.value = value;
        }
        __commitTemplateResult(value) {
            const template = this.options.templateFactory(value);
            if (this.value instanceof TemplateInstance &&
                this.value.template === template) {
                this.value.update(value.values);
            }
            else {
                // Make sure we propagate the template processor from the TemplateResult
                // so that we use its syntax extension, etc. The template factory comes
                // from the render function options so that it can control template
                // caching and preprocessing.
                const instance = new TemplateInstance(template, value.processor, this.options);
                const fragment = instance._clone();
                instance.update(value.values);
                this.__commitNode(fragment);
                this.value = instance;
            }
        }
        __commitIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _value is an array, then the previous render was of an
            // iterable and _value will contain the NodeParts from the previous
            // render. If _value is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this.value)) {
                this.value = [];
                this.clear();
            }
            // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render
            const itemParts = this.value;
            let partIndex = 0;
            let itemPart;
            for (const item of value) {
                // Try to reuse an existing part
                itemPart = itemParts[partIndex];
                // If no existing part, create a new one
                if (itemPart === undefined) {
                    itemPart = new NodePart(this.options);
                    itemParts.push(itemPart);
                    if (partIndex === 0) {
                        itemPart.appendIntoPart(this);
                    }
                    else {
                        itemPart.insertAfterPart(itemParts[partIndex - 1]);
                    }
                }
                itemPart.setValue(item);
                itemPart.commit();
                partIndex++;
            }
            if (partIndex < itemParts.length) {
                // Truncate the parts array so _value reflects the current state
                itemParts.length = partIndex;
                this.clear(itemPart && itemPart.endNode);
            }
        }
        clear(startNode = this.startNode) {
            removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
    }
    /**
     * Implements a boolean attribute, roughly as defined in the HTML
     * specification.
     *
     * If the value is truthy, then the attribute is present with a value of
     * ''. If the value is falsey, the attribute is removed.
     */
    class BooleanAttributePart {
        constructor(element, name, strings) {
            this.value = undefined;
            this.__pendingValue = undefined;
            if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
                throw new Error('Boolean attributes can only contain a single expression');
            }
            this.element = element;
            this.name = name;
            this.strings = strings;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const value = !!this.__pendingValue;
            if (this.value !== value) {
                if (value) {
                    this.element.setAttribute(this.name, '');
                }
                else {
                    this.element.removeAttribute(this.name);
                }
                this.value = value;
            }
            this.__pendingValue = noChange;
        }
    }
    /**
     * Sets attribute values for PropertyParts, so that the value is only set once
     * even if there are multiple parts for a property.
     *
     * If an expression controls the whole property value, then the value is simply
     * assigned to the property under control. If there are string literals or
     * multiple expressions, then the strings are expressions are interpolated into
     * a string first.
     */
    class PropertyCommitter extends AttributeCommitter {
        constructor(element, name, strings) {
            super(element, name, strings);
            this.single =
                (strings.length === 2 && strings[0] === '' && strings[1] === '');
        }
        _createPart() {
            return new PropertyPart(this);
        }
        _getValue() {
            if (this.single) {
                return this.parts[0].value;
            }
            return super._getValue();
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.element[this.name] = this._getValue();
            }
        }
    }
    class PropertyPart extends AttributePart {
    }
    // Detect event listener options support. If the `capture` property is read
    // from the options object, then options are supported. If not, then the third
    // argument to add/removeEventListener is interpreted as the boolean capture
    // value so we should only pass the `capture` property.
    let eventOptionsSupported = false;
    // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
    // blocks right into the body of a module
    (() => {
        try {
            const options = {
                get capture() {
                    eventOptionsSupported = true;
                    return false;
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.addEventListener('test', options, options);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('test', options, options);
        }
        catch (_e) {
            // event options not supported
        }
    })();
    class EventPart {
        constructor(element, eventName, eventContext) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.element = element;
            this.eventName = eventName;
            this.eventContext = eventContext;
            this.__boundHandleEvent = (e) => this.handleEvent(e);
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const newListener = this.__pendingValue;
            const oldListener = this.value;
            const shouldRemoveListener = newListener == null ||
                oldListener != null &&
                    (newListener.capture !== oldListener.capture ||
                        newListener.once !== oldListener.once ||
                        newListener.passive !== oldListener.passive);
            const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
            if (shouldRemoveListener) {
                this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            if (shouldAddListener) {
                this.__options = getOptions(newListener);
                this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            this.value = newListener;
            this.__pendingValue = noChange;
        }
        handleEvent(event) {
            if (typeof this.value === 'function') {
                this.value.call(this.eventContext || this.element, event);
            }
            else {
                this.value.handleEvent(event);
            }
        }
    }
    // We copy options because of the inconsistent behavior of browsers when reading
    // the third argument of add/removeEventListener. IE11 doesn't support options
    // at all. Chrome 41 only reads `capture` if the argument is an object.
    const getOptions = (o) => o &&
        (eventOptionsSupported ?
            { capture: o.capture, passive: o.passive, once: o.once } :
            o.capture);
    //# sourceMappingURL=parts.js.map

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
    /**
     * The default TemplateFactory which caches Templates keyed on
     * result.type and result.strings.
     */
    function templateFactory(result) {
        let templateCache = templateCaches.get(result.type);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(result.type, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        // If the TemplateStringsArray is new, generate a key from the strings
        // This key is shared between all templates with identical content
        const key = result.strings.join(marker);
        // Check if we already have a Template for this key
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            // If we have not seen this key before, create a new Template
            template = new Template(result, result.getTemplateElement());
            // Cache the Template for this key
            templateCache.keyString.set(key, template);
        }
        // Cache all future queries for this TemplateStringsArray
        templateCache.stringsArray.set(result.strings, template);
        return template;
    }
    const templateCaches = new Map();
    //# sourceMappingURL=template-factory.js.map

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
    const parts = new WeakMap();
    /**
     * Renders a template result or other value to a container.
     *
     * To update a container with new values, reevaluate the template literal and
     * call `render` with the new result.
     *
     * @param result Any value renderable by NodePart - typically a TemplateResult
     *     created by evaluating a template tag like `html` or `svg`.
     * @param container A DOM parent to render to. The entire contents are either
     *     replaced, or efficiently updated if the same result type was previous
     *     rendered there.
     * @param options RenderOptions for the entire render tree rendered to this
     *     container. Render options must *not* change between renders to the same
     *     container, as those changes will not effect previously rendered DOM.
     */
    const render = (result, container, options) => {
        let part = parts.get(container);
        if (part === undefined) {
            removeNodes(container, container.firstChild);
            parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
            part.appendInto(container);
        }
        part.setValue(result);
        part.commit();
    };
    //# sourceMappingURL=render.js.map

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
    /**
     * Creates Parts when a template is instantiated.
     */
    class DefaultTemplateProcessor {
        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        handleAttributeExpressions(element, name, strings, options) {
            const prefix = name[0];
            if (prefix === '.') {
                const committer = new PropertyCommitter(element, name.slice(1), strings);
                return committer.parts;
            }
            if (prefix === '@') {
                return [new EventPart(element, name.slice(1), options.eventContext)];
            }
            if (prefix === '?') {
                return [new BooleanAttributePart(element, name.slice(1), strings)];
            }
            const committer = new AttributeCommitter(element, name, strings);
            return committer.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */
        handleTextExpression(options) {
            return new NodePart(options);
        }
    }
    const defaultTemplateProcessor = new DefaultTemplateProcessor();
    //# sourceMappingURL=default-template-processor.js.map

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
    // IMPORTANT: do not change the property name or the assignment expression.
    // This line will be used in regexes to search for lit-html usage.
    // TODO(justinfagnani): inject version number at build time
    if (typeof window !== 'undefined') {
        (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
    }
    /**
     * Interprets a template literal as an HTML template that can efficiently
     * render to and update a container.
     */
    const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
    //# sourceMappingURL=lit-html.js.map

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
    // Get a key to lookup in `templateCaches`.
    const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
    let compatibleShadyCSSVersion = true;
    if (typeof window.ShadyCSS === 'undefined') {
        compatibleShadyCSSVersion = false;
    }
    else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
        console.warn(`Incompatible ShadyCSS version detected. ` +
            `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
            `@webcomponents/shadycss@1.3.1.`);
        compatibleShadyCSSVersion = false;
    }
    /**
     * Template factory which scopes template DOM using ShadyCSS.
     * @param scopeName {string}
     */
    const shadyTemplateFactory = (scopeName) => (result) => {
        const cacheKey = getTemplateCacheKey(result.type, scopeName);
        let templateCache = templateCaches.get(cacheKey);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(cacheKey, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        const key = result.strings.join(marker);
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            const element = result.getTemplateElement();
            if (compatibleShadyCSSVersion) {
                window.ShadyCSS.prepareTemplateDom(element, scopeName);
            }
            template = new Template(result, element);
            templateCache.keyString.set(key, template);
        }
        templateCache.stringsArray.set(result.strings, template);
        return template;
    };
    const TEMPLATE_TYPES = ['html', 'svg'];
    /**
     * Removes all style elements from Templates for the given scopeName.
     */
    const removeStylesFromLitTemplates = (scopeName) => {
        TEMPLATE_TYPES.forEach((type) => {
            const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
            if (templates !== undefined) {
                templates.keyString.forEach((template) => {
                    const { element: { content } } = template;
                    // IE 11 doesn't support the iterable param Set constructor
                    const styles = new Set();
                    Array.from(content.querySelectorAll('style')).forEach((s) => {
                        styles.add(s);
                    });
                    removeNodesFromTemplate(template, styles);
                });
            }
        });
    };
    const shadyRenderSet = new Set();
    /**
     * For the given scope name, ensures that ShadyCSS style scoping is performed.
     * This is done just once per scope name so the fragment and template cannot
     * be modified.
     * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
     * to be scoped and appended to the document
     * (2) removes style elements from all lit-html Templates for this scope name.
     *
     * Note, <style> elements can only be placed into templates for the
     * initial rendering of the scope. If <style> elements are included in templates
     * dynamically rendered to the scope (after the first scope render), they will
     * not be scoped and the <style> will be left in the template and rendered
     * output.
     */
    const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
        shadyRenderSet.add(scopeName);
        // If `renderedDOM` is stamped from a Template, then we need to edit that
        // Template's underlying template element. Otherwise, we create one here
        // to give to ShadyCSS, which still requires one while scoping.
        const templateElement = !!template ? template.element : document.createElement('template');
        // Move styles out of rendered DOM and store.
        const styles = renderedDOM.querySelectorAll('style');
        const { length } = styles;
        // If there are no styles, skip unnecessary work
        if (length === 0) {
            // Ensure prepareTemplateStyles is called to support adding
            // styles via `prepareAdoptedCssText` since that requires that
            // `prepareTemplateStyles` is called.
            //
            // ShadyCSS will only update styles containing @apply in the template
            // given to `prepareTemplateStyles`. If no lit Template was given,
            // ShadyCSS will not be able to update uses of @apply in any relevant
            // template. However, this is not a problem because we only create the
            // template for the purpose of supporting `prepareAdoptedCssText`,
            // which doesn't support @apply at all.
            window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
            return;
        }
        const condensedStyle = document.createElement('style');
        // Collect styles into a single style. This helps us make sure ShadyCSS
        // manipulations will not prevent us from being able to fix up template
        // part indices.
        // NOTE: collecting styles is inefficient for browsers but ShadyCSS
        // currently does this anyway. When it does not, this should be changed.
        for (let i = 0; i < length; i++) {
            const style = styles[i];
            style.parentNode.removeChild(style);
            condensedStyle.textContent += style.textContent;
        }
        // Remove styles from nested templates in this scope.
        removeStylesFromLitTemplates(scopeName);
        // And then put the condensed style into the "root" template passed in as
        // `template`.
        const content = templateElement.content;
        if (!!template) {
            insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
        }
        else {
            content.insertBefore(condensedStyle, content.firstChild);
        }
        // Note, it's important that ShadyCSS gets the template that `lit-html`
        // will actually render so that it can update the style inside when
        // needed (e.g. @apply native Shadow DOM case).
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        const style = content.querySelector('style');
        if (window.ShadyCSS.nativeShadow && style !== null) {
            // When in native Shadow DOM, ensure the style created by ShadyCSS is
            // included in initially rendered output (`renderedDOM`).
            renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
        }
        else if (!!template) {
            // When no style is left in the template, parts will be broken as a
            // result. To fix this, we put back the style node ShadyCSS removed
            // and then tell lit to remove that node from the template.
            // There can be no style in the template in 2 cases (1) when Shady DOM
            // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
            // is in use ShadyCSS removes the style if it contains no content.
            // NOTE, ShadyCSS creates its own style so we can safely add/remove
            // `condensedStyle` here.
            content.insertBefore(condensedStyle, content.firstChild);
            const removes = new Set();
            removes.add(condensedStyle);
            removeNodesFromTemplate(template, removes);
        }
    };
    /**
     * Extension to the standard `render` method which supports rendering
     * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
     * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
     * or when the webcomponentsjs
     * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
     *
     * Adds a `scopeName` option which is used to scope element DOM and stylesheets
     * when native ShadowDOM is unavailable. The `scopeName` will be added to
     * the class attribute of all rendered DOM. In addition, any style elements will
     * be automatically re-written with this `scopeName` selector and moved out
     * of the rendered DOM and into the document `<head>`.
     *
     * It is common to use this render method in conjunction with a custom element
     * which renders a shadowRoot. When this is done, typically the element's
     * `localName` should be used as the `scopeName`.
     *
     * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
     * custom properties (needed only on older browsers like IE11) and a shim for
     * a deprecated feature called `@apply` that supports applying a set of css
     * custom properties to a given location.
     *
     * Usage considerations:
     *
     * * Part values in `<style>` elements are only applied the first time a given
     * `scopeName` renders. Subsequent changes to parts in style elements will have
     * no effect. Because of this, parts in style elements should only be used for
     * values that will never change, for example parts that set scope-wide theme
     * values or parts which render shared style elements.
     *
     * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
     * custom element's `constructor` is not supported. Instead rendering should
     * either done asynchronously, for example at microtask timing (for example
     * `Promise.resolve()`), or be deferred until the first time the element's
     * `connectedCallback` runs.
     *
     * Usage considerations when using shimmed custom properties or `@apply`:
     *
     * * Whenever any dynamic changes are made which affect
     * css custom properties, `ShadyCSS.styleElement(element)` must be called
     * to update the element. There are two cases when this is needed:
     * (1) the element is connected to a new parent, (2) a class is added to the
     * element that causes it to match different custom properties.
     * To address the first case when rendering a custom element, `styleElement`
     * should be called in the element's `connectedCallback`.
     *
     * * Shimmed custom properties may only be defined either for an entire
     * shadowRoot (for example, in a `:host` rule) or via a rule that directly
     * matches an element with a shadowRoot. In other words, instead of flowing from
     * parent to child as do native css custom properties, shimmed custom properties
     * flow only from shadowRoots to nested shadowRoots.
     *
     * * When using `@apply` mixing css shorthand property names with
     * non-shorthand names (for example `border` and `border-width`) is not
     * supported.
     */
    const render$1 = (result, container, options) => {
        if (!options || typeof options !== 'object' || !options.scopeName) {
            throw new Error('The `scopeName` option is required.');
        }
        const scopeName = options.scopeName;
        const hasRendered = parts.has(container);
        const needsScoping = compatibleShadyCSSVersion &&
            container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
            !!container.host;
        // Handle first render to a scope specially...
        const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
        // On first scope render, render into a fragment; this cannot be a single
        // fragment that is reused since nested renders can occur synchronously.
        const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
        render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
        // When performing first scope render,
        // (1) We've rendered into a fragment so that there's a chance to
        // `prepareTemplateStyles` before sub-elements hit the DOM
        // (which might cause them to render based on a common pattern of
        // rendering in a custom element's `connectedCallback`);
        // (2) Scope the template with ShadyCSS one time only for this scope.
        // (3) Render the fragment into the container and make sure the
        // container knows its `part` is the one we just rendered. This ensures
        // DOM will be re-used on subsequent renders.
        if (firstScopeRender) {
            const part = parts.get(renderContainer);
            parts.delete(renderContainer);
            // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
            // that should apply to `renderContainer` even if the rendered value is
            // not a TemplateInstance. However, it will only insert scoped styles
            // into the document if `prepareTemplateStyles` has already been called
            // for the given scope name.
            const template = part.value instanceof TemplateInstance ?
                part.value.template :
                undefined;
            prepareTemplateStyles(scopeName, renderContainer, template);
            removeNodes(container, container.firstChild);
            container.appendChild(renderContainer);
            parts.set(container, part);
        }
        // After elements have hit the DOM, update styling if this is the
        // initial render to this container.
        // This is needed whenever dynamic changes are made so it would be
        // safest to do every render; however, this would regress performance
        // so we leave it up to the user to call `ShadyCSS.styleElement`
        // for dynamic changes.
        if (!hasRendered && needsScoping) {
            window.ShadyCSS.styleElement(container.host);
        }
    };
    //# sourceMappingURL=shady-render.js.map

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
    var _a;
    /**
     * Use this module if you want to create your own base class extending
     * [[UpdatingElement]].
     * @packageDocumentation
     */
    /*
     * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
     * replaced at compile time by the munged name for object[property]. We cannot
     * alias this function, so we have to use a small shim that has the same
     * behavior when not compiling.
     */
    window.JSCompiler_renameProperty =
        (prop, _obj) => prop;
    const defaultConverter = {
        toAttribute(value, type) {
            switch (type) {
                case Boolean:
                    return value ? '' : null;
                case Object:
                case Array:
                    // if the value is `null` or `undefined` pass this through
                    // to allow removing/no change behavior.
                    return value == null ? value : JSON.stringify(value);
            }
            return value;
        },
        fromAttribute(value, type) {
            switch (type) {
                case Boolean:
                    return value !== null;
                case Number:
                    return value === null ? null : Number(value);
                case Object:
                case Array:
                    return JSON.parse(value);
            }
            return value;
        }
    };
    /**
     * Change function that returns true if `value` is different from `oldValue`.
     * This method is used as the default for a property's `hasChanged` function.
     */
    const notEqual = (value, old) => {
        // This ensures (old==NaN, value==NaN) always returns false
        return old !== value && (old === old || value === value);
    };
    const defaultPropertyDeclaration = {
        attribute: true,
        type: String,
        converter: defaultConverter,
        reflect: false,
        hasChanged: notEqual
    };
    const STATE_HAS_UPDATED = 1;
    const STATE_UPDATE_REQUESTED = 1 << 2;
    const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
    const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
    /**
     * The Closure JS Compiler doesn't currently have good support for static
     * property semantics where "this" is dynamic (e.g.
     * https://github.com/google/closure-compiler/issues/3177 and others) so we use
     * this hack to bypass any rewriting by the compiler.
     */
    const finalized = 'finalized';
    /**
     * Base element class which manages element properties and attributes. When
     * properties change, the `update` method is asynchronously called. This method
     * should be supplied by subclassers to render updates as desired.
     * @noInheritDoc
     */
    class UpdatingElement extends HTMLElement {
        constructor() {
            super();
            this.initialize();
        }
        /**
         * Returns a list of attributes corresponding to the registered properties.
         * @nocollapse
         */
        static get observedAttributes() {
            // note: piggy backing on this to ensure we're finalized.
            this.finalize();
            const attributes = [];
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            this._classProperties.forEach((v, p) => {
                const attr = this._attributeNameForProperty(p, v);
                if (attr !== undefined) {
                    this._attributeToPropertyMap.set(attr, p);
                    attributes.push(attr);
                }
            });
            return attributes;
        }
        /**
         * Ensures the private `_classProperties` property metadata is created.
         * In addition to `finalize` this is also called in `createProperty` to
         * ensure the `@property` decorator can add property metadata.
         */
        /** @nocollapse */
        static _ensureClassProperties() {
            // ensure private storage for property declarations.
            if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
                this._classProperties = new Map();
                // NOTE: Workaround IE11 not supporting Map constructor argument.
                const superProperties = Object.getPrototypeOf(this)._classProperties;
                if (superProperties !== undefined) {
                    superProperties.forEach((v, k) => this._classProperties.set(k, v));
                }
            }
        }
        /**
         * Creates a property accessor on the element prototype if one does not exist
         * and stores a PropertyDeclaration for the property with the given options.
         * The property setter calls the property's `hasChanged` property option
         * or uses a strict identity check to determine whether or not to request
         * an update.
         *
         * This method may be overridden to customize properties; however,
         * when doing so, it's important to call `super.createProperty` to ensure
         * the property is setup correctly. This method calls
         * `getPropertyDescriptor` internally to get a descriptor to install.
         * To customize what properties do when they are get or set, override
         * `getPropertyDescriptor`. To customize the options for a property,
         * implement `createProperty` like this:
         *
         * static createProperty(name, options) {
         *   options = Object.assign(options, {myOption: true});
         *   super.createProperty(name, options);
         * }
         *
         * @nocollapse
         */
        static createProperty(name, options = defaultPropertyDeclaration) {
            // Note, since this can be called by the `@property` decorator which
            // is called before `finalize`, we ensure storage exists for property
            // metadata.
            this._ensureClassProperties();
            this._classProperties.set(name, options);
            // Do not generate an accessor if the prototype already has one, since
            // it would be lost otherwise and that would never be the user's intention;
            // Instead, we expect users to call `requestUpdate` themselves from
            // user-defined accessors. Note that if the super has an accessor we will
            // still overwrite it
            if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
                return;
            }
            const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                Object.defineProperty(this.prototype, name, descriptor);
            }
        }
        /**
         * Returns a property descriptor to be defined on the given named property.
         * If no descriptor is returned, the property will not become an accessor.
         * For example,
         *
         *   class MyElement extends LitElement {
         *     static getPropertyDescriptor(name, key, options) {
         *       const defaultDescriptor =
         *           super.getPropertyDescriptor(name, key, options);
         *       const setter = defaultDescriptor.set;
         *       return {
         *         get: defaultDescriptor.get,
         *         set(value) {
         *           setter.call(this, value);
         *           // custom action.
         *         },
         *         configurable: true,
         *         enumerable: true
         *       }
         *     }
         *   }
         *
         * @nocollapse
         */
        static getPropertyDescriptor(name, key, options) {
            return {
                // tslint:disable-next-line:no-any no symbol in index
                get() {
                    return this[key];
                },
                set(value) {
                    const oldValue = this[name];
                    this[key] = value;
                    this
                        .requestUpdateInternal(name, oldValue, options);
                },
                configurable: true,
                enumerable: true
            };
        }
        /**
         * Returns the property options associated with the given property.
         * These options are defined with a PropertyDeclaration via the `properties`
         * object or the `@property` decorator and are registered in
         * `createProperty(...)`.
         *
         * Note, this method should be considered "final" and not overridden. To
         * customize the options for a given property, override `createProperty`.
         *
         * @nocollapse
         * @final
         */
        static getPropertyOptions(name) {
            return this._classProperties && this._classProperties.get(name) ||
                defaultPropertyDeclaration;
        }
        /**
         * Creates property accessors for registered properties and ensures
         * any superclasses are also finalized.
         * @nocollapse
         */
        static finalize() {
            // finalize any superclasses
            const superCtor = Object.getPrototypeOf(this);
            if (!superCtor.hasOwnProperty(finalized)) {
                superCtor.finalize();
            }
            this[finalized] = true;
            this._ensureClassProperties();
            // initialize Map populated in observedAttributes
            this._attributeToPropertyMap = new Map();
            // make any properties
            // Note, only process "own" properties since this element will inherit
            // any properties defined on the superClass, and finalization ensures
            // the entire prototype chain is finalized.
            if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
                const props = this.properties;
                // support symbols in properties (IE11 does not support this)
                const propKeys = [
                    ...Object.getOwnPropertyNames(props),
                    ...(typeof Object.getOwnPropertySymbols === 'function') ?
                        Object.getOwnPropertySymbols(props) :
                        []
                ];
                // This for/of is ok because propKeys is an array
                for (const p of propKeys) {
                    // note, use of `any` is due to TypeSript lack of support for symbol in
                    // index types
                    // tslint:disable-next-line:no-any no symbol in index
                    this.createProperty(p, props[p]);
                }
            }
        }
        /**
         * Returns the property name for the given attribute `name`.
         * @nocollapse
         */
        static _attributeNameForProperty(name, options) {
            const attribute = options.attribute;
            return attribute === false ?
                undefined :
                (typeof attribute === 'string' ?
                    attribute :
                    (typeof name === 'string' ? name.toLowerCase() : undefined));
        }
        /**
         * Returns true if a property should request an update.
         * Called when a property value is set and uses the `hasChanged`
         * option for the property if present or a strict identity check.
         * @nocollapse
         */
        static _valueHasChanged(value, old, hasChanged = notEqual) {
            return hasChanged(value, old);
        }
        /**
         * Returns the property value for the given attribute value.
         * Called via the `attributeChangedCallback` and uses the property's
         * `converter` or `converter.fromAttribute` property option.
         * @nocollapse
         */
        static _propertyValueFromAttribute(value, options) {
            const type = options.type;
            const converter = options.converter || defaultConverter;
            const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
            return fromAttribute ? fromAttribute(value, type) : value;
        }
        /**
         * Returns the attribute value for the given property value. If this
         * returns undefined, the property will *not* be reflected to an attribute.
         * If this returns null, the attribute will be removed, otherwise the
         * attribute will be set to the value.
         * This uses the property's `reflect` and `type.toAttribute` property options.
         * @nocollapse
         */
        static _propertyValueToAttribute(value, options) {
            if (options.reflect === undefined) {
                return;
            }
            const type = options.type;
            const converter = options.converter;
            const toAttribute = converter && converter.toAttribute ||
                defaultConverter.toAttribute;
            return toAttribute(value, type);
        }
        /**
         * Performs element initialization. By default captures any pre-set values for
         * registered properties.
         */
        initialize() {
            this._updateState = 0;
            this._updatePromise =
                new Promise((res) => this._enableUpdatingResolver = res);
            this._changedProperties = new Map();
            this._saveInstanceProperties();
            // ensures first update will be caught by an early access of
            // `updateComplete`
            this.requestUpdateInternal();
        }
        /**
         * Fixes any properties set on the instance before upgrade time.
         * Otherwise these would shadow the accessor and break these properties.
         * The properties are stored in a Map which is played back after the
         * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
         * (<=41), properties created for native platform properties like (`id` or
         * `name`) may not have default values set in the element constructor. On
         * these browsers native properties appear on instances and therefore their
         * default value will overwrite any element default (e.g. if the element sets
         * this.id = 'id' in the constructor, the 'id' will become '' since this is
         * the native platform default).
         */
        _saveInstanceProperties() {
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            this.constructor
                ._classProperties.forEach((_v, p) => {
                if (this.hasOwnProperty(p)) {
                    const value = this[p];
                    delete this[p];
                    if (!this._instanceProperties) {
                        this._instanceProperties = new Map();
                    }
                    this._instanceProperties.set(p, value);
                }
            });
        }
        /**
         * Applies previously saved instance properties.
         */
        _applyInstanceProperties() {
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            // tslint:disable-next-line:no-any
            this._instanceProperties.forEach((v, p) => this[p] = v);
            this._instanceProperties = undefined;
        }
        connectedCallback() {
            // Ensure first connection completes an update. Updates cannot complete
            // before connection.
            this.enableUpdating();
        }
        enableUpdating() {
            if (this._enableUpdatingResolver !== undefined) {
                this._enableUpdatingResolver();
                this._enableUpdatingResolver = undefined;
            }
        }
        /**
         * Allows for `super.disconnectedCallback()` in extensions while
         * reserving the possibility of making non-breaking feature additions
         * when disconnecting at some point in the future.
         */
        disconnectedCallback() {
        }
        /**
         * Synchronizes property values when attributes change.
         */
        attributeChangedCallback(name, old, value) {
            if (old !== value) {
                this._attributeToProperty(name, value);
            }
        }
        _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
            const ctor = this.constructor;
            const attr = ctor._attributeNameForProperty(name, options);
            if (attr !== undefined) {
                const attrValue = ctor._propertyValueToAttribute(value, options);
                // an undefined value does not change the attribute.
                if (attrValue === undefined) {
                    return;
                }
                // Track if the property is being reflected to avoid
                // setting the property again via `attributeChangedCallback`. Note:
                // 1. this takes advantage of the fact that the callback is synchronous.
                // 2. will behave incorrectly if multiple attributes are in the reaction
                // stack at time of calling. However, since we process attributes
                // in `update` this should not be possible (or an extreme corner case
                // that we'd like to discover).
                // mark state reflecting
                this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
                if (attrValue == null) {
                    this.removeAttribute(attr);
                }
                else {
                    this.setAttribute(attr, attrValue);
                }
                // mark state not reflecting
                this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
            }
        }
        _attributeToProperty(name, value) {
            // Use tracking info to avoid deserializing attribute value if it was
            // just set from a property setter.
            if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
                return;
            }
            const ctor = this.constructor;
            // Note, hint this as an `AttributeMap` so closure clearly understands
            // the type; it has issues with tracking types through statics
            // tslint:disable-next-line:no-unnecessary-type-assertion
            const propName = ctor._attributeToPropertyMap.get(name);
            if (propName !== undefined) {
                const options = ctor.getPropertyOptions(propName);
                // mark state reflecting
                this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
                this[propName] =
                    // tslint:disable-next-line:no-any
                    ctor._propertyValueFromAttribute(value, options);
                // mark state not reflecting
                this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
            }
        }
        /**
         * This protected version of `requestUpdate` does not access or return the
         * `updateComplete` promise. This promise can be overridden and is therefore
         * not free to access.
         */
        requestUpdateInternal(name, oldValue, options) {
            let shouldRequestUpdate = true;
            // If we have a property key, perform property update steps.
            if (name !== undefined) {
                const ctor = this.constructor;
                options = options || ctor.getPropertyOptions(name);
                if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                    if (!this._changedProperties.has(name)) {
                        this._changedProperties.set(name, oldValue);
                    }
                    // Add to reflecting properties set.
                    // Note, it's important that every change has a chance to add the
                    // property to `_reflectingProperties`. This ensures setting
                    // attribute + property reflects correctly.
                    if (options.reflect === true &&
                        !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                        if (this._reflectingProperties === undefined) {
                            this._reflectingProperties = new Map();
                        }
                        this._reflectingProperties.set(name, options);
                    }
                }
                else {
                    // Abort the request if the property should not be considered changed.
                    shouldRequestUpdate = false;
                }
            }
            if (!this._hasRequestedUpdate && shouldRequestUpdate) {
                this._updatePromise = this._enqueueUpdate();
            }
        }
        /**
         * Requests an update which is processed asynchronously. This should
         * be called when an element should update based on some state not triggered
         * by setting a property. In this case, pass no arguments. It should also be
         * called when manually implementing a property setter. In this case, pass the
         * property `name` and `oldValue` to ensure that any configured property
         * options are honored. Returns the `updateComplete` Promise which is resolved
         * when the update completes.
         *
         * @param name {PropertyKey} (optional) name of requesting property
         * @param oldValue {any} (optional) old value of requesting property
         * @returns {Promise} A Promise that is resolved when the update completes.
         */
        requestUpdate(name, oldValue) {
            this.requestUpdateInternal(name, oldValue);
            return this.updateComplete;
        }
        /**
         * Sets up the element to asynchronously update.
         */
        async _enqueueUpdate() {
            this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
            try {
                // Ensure any previous update has resolved before updating.
                // This `await` also ensures that property changes are batched.
                await this._updatePromise;
            }
            catch (e) {
                // Ignore any previous errors. We only care that the previous cycle is
                // done. Any error should have been handled in the previous update.
            }
            const result = this.performUpdate();
            // If `performUpdate` returns a Promise, we await it. This is done to
            // enable coordinating updates with a scheduler. Note, the result is
            // checked to avoid delaying an additional microtask unless we need to.
            if (result != null) {
                await result;
            }
            return !this._hasRequestedUpdate;
        }
        get _hasRequestedUpdate() {
            return (this._updateState & STATE_UPDATE_REQUESTED);
        }
        get hasUpdated() {
            return (this._updateState & STATE_HAS_UPDATED);
        }
        /**
         * Performs an element update. Note, if an exception is thrown during the
         * update, `firstUpdated` and `updated` will not be called.
         *
         * You can override this method to change the timing of updates. If this
         * method is overridden, `super.performUpdate()` must be called.
         *
         * For instance, to schedule updates to occur just before the next frame:
         *
         * ```
         * protected async performUpdate(): Promise<unknown> {
         *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
         *   super.performUpdate();
         * }
         * ```
         */
        performUpdate() {
            // Abort any update if one is not pending when this is called.
            // This can happen if `performUpdate` is called early to "flush"
            // the update.
            if (!this._hasRequestedUpdate) {
                return;
            }
            // Mixin instance properties once, if they exist.
            if (this._instanceProperties) {
                this._applyInstanceProperties();
            }
            let shouldUpdate = false;
            const changedProperties = this._changedProperties;
            try {
                shouldUpdate = this.shouldUpdate(changedProperties);
                if (shouldUpdate) {
                    this.update(changedProperties);
                }
                else {
                    this._markUpdated();
                }
            }
            catch (e) {
                // Prevent `firstUpdated` and `updated` from running when there's an
                // update exception.
                shouldUpdate = false;
                // Ensure element can accept additional updates after an exception.
                this._markUpdated();
                throw e;
            }
            if (shouldUpdate) {
                if (!(this._updateState & STATE_HAS_UPDATED)) {
                    this._updateState = this._updateState | STATE_HAS_UPDATED;
                    this.firstUpdated(changedProperties);
                }
                this.updated(changedProperties);
            }
        }
        _markUpdated() {
            this._changedProperties = new Map();
            this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
        }
        /**
         * Returns a Promise that resolves when the element has completed updating.
         * The Promise value is a boolean that is `true` if the element completed the
         * update without triggering another update. The Promise result is `false` if
         * a property was set inside `updated()`. If the Promise is rejected, an
         * exception was thrown during the update.
         *
         * To await additional asynchronous work, override the `_getUpdateComplete`
         * method. For example, it is sometimes useful to await a rendered element
         * before fulfilling this Promise. To do this, first await
         * `super._getUpdateComplete()`, then any subsequent state.
         *
         * @returns {Promise} The Promise returns a boolean that indicates if the
         * update resolved without triggering another update.
         */
        get updateComplete() {
            return this._getUpdateComplete();
        }
        /**
         * Override point for the `updateComplete` promise.
         *
         * It is not safe to override the `updateComplete` getter directly due to a
         * limitation in TypeScript which means it is not possible to call a
         * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
         * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
         * This method should be overridden instead. For example:
         *
         *   class MyElement extends LitElement {
         *     async _getUpdateComplete() {
         *       await super._getUpdateComplete();
         *       await this._myChild.updateComplete;
         *     }
         *   }
         */
        _getUpdateComplete() {
            return this._updatePromise;
        }
        /**
         * Controls whether or not `update` should be called when the element requests
         * an update. By default, this method always returns `true`, but this can be
         * customized to control when to update.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        shouldUpdate(_changedProperties) {
            return true;
        }
        /**
         * Updates the element. This method reflects property values to attributes.
         * It can be overridden to render and keep updated element DOM.
         * Setting properties inside this method will *not* trigger
         * another update.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        update(_changedProperties) {
            if (this._reflectingProperties !== undefined &&
                this._reflectingProperties.size > 0) {
                // Use forEach so this works even if for/of loops are compiled to for
                // loops expecting arrays
                this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
                this._reflectingProperties = undefined;
            }
            this._markUpdated();
        }
        /**
         * Invoked whenever the element is updated. Implement to perform
         * post-updating tasks via DOM APIs, for example, focusing an element.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        updated(_changedProperties) {
        }
        /**
         * Invoked when the element is first updated. Implement to perform one time
         * work on the element after update.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        firstUpdated(_changedProperties) {
        }
    }
    _a = finalized;
    /**
     * Marks class as having finished creating properties.
     */
    UpdatingElement[_a] = true;
    //# sourceMappingURL=updating-element.js.map

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
    const legacyCustomElement = (tagName, clazz) => {
        window.customElements.define(tagName, clazz);
        // Cast as any because TS doesn't recognize the return type as being a
        // subtype of the decorated class when clazz is typed as
        // `Constructor<HTMLElement>` for some reason.
        // `Constructor<HTMLElement>` is helpful to make sure the decorator is
        // applied to elements however.
        // tslint:disable-next-line:no-any
        return clazz;
    };
    const standardCustomElement = (tagName, descriptor) => {
        const { kind, elements } = descriptor;
        return {
            kind,
            elements,
            // This callback is called once the class is otherwise fully defined
            finisher(clazz) {
                window.customElements.define(tagName, clazz);
            }
        };
    };
    /**
     * Class decorator factory that defines the decorated class as a custom element.
     *
     * ```
     * @customElement('my-element')
     * class MyElement {
     *   render() {
     *     return html``;
     *   }
     * }
     * ```
     * @category Decorator
     * @param tagName The name of the custom element to define.
     */
    const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
        legacyCustomElement(tagName, classOrDescriptor) :
        standardCustomElement(tagName, classOrDescriptor);
    const standardProperty = (options, element) => {
        // When decorating an accessor, pass it through and add property metadata.
        // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
        // stomp over the user's accessor.
        if (element.kind === 'method' && element.descriptor &&
            !('value' in element.descriptor)) {
            return Object.assign(Object.assign({}, element), { finisher(clazz) {
                    clazz.createProperty(element.key, options);
                } });
        }
        else {
            // createProperty() takes care of defining the property, but we still
            // must return some kind of descriptor, so return a descriptor for an
            // unused prototype field. The finisher calls createProperty().
            return {
                kind: 'field',
                key: Symbol(),
                placement: 'own',
                descriptor: {},
                // When @babel/plugin-proposal-decorators implements initializers,
                // do this instead of the initializer below. See:
                // https://github.com/babel/babel/issues/9260 extras: [
                //   {
                //     kind: 'initializer',
                //     placement: 'own',
                //     initializer: descriptor.initializer,
                //   }
                // ],
                initializer() {
                    if (typeof element.initializer === 'function') {
                        this[element.key] = element.initializer.call(this);
                    }
                },
                finisher(clazz) {
                    clazz.createProperty(element.key, options);
                }
            };
        }
    };
    const legacyProperty = (options, proto, name) => {
        proto.constructor
            .createProperty(name, options);
    };
    /**
     * A property decorator which creates a LitElement property which reflects a
     * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
     * supplied to configure property features.
     *
     * This decorator should only be used for public fields. Private or protected
     * fields should use the [[`internalProperty`]] decorator.
     *
     * @example
     * ```ts
     * class MyElement {
     *   @property({ type: Boolean })
     *   clicked = false;
     * }
     * ```
     * @category Decorator
     * @ExportDecoratedItems
     */
    function property(options) {
        // tslint:disable-next-line:no-any decorator
        return (protoOrDescriptor, name) => (name !== undefined) ?
            legacyProperty(options, protoOrDescriptor, name) :
            standardProperty(options, protoOrDescriptor);
    }
    /**
     * Declares a private or protected property that still triggers updates to the
     * element when it changes.
     *
     * Properties declared this way must not be used from HTML or HTML templating
     * systems, they're solely for properties internal to the element. These
     * properties may be renamed by optimization tools like closure compiler.
     * @category Decorator
     */
    function internalProperty(options) {
        return property({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
    }
    const standardEventOptions = (options, element) => {
        return Object.assign(Object.assign({}, element), { finisher(clazz) {
                Object.assign(clazz.prototype[element.key], options);
            } });
    };
    const legacyEventOptions = 
    // tslint:disable-next-line:no-any legacy decorator
    (options, proto, name) => {
        Object.assign(proto[name], options);
    };
    /**
     * Adds event listener options to a method used as an event listener in a
     * lit-html template.
     *
     * @param options An object that specifies event listener options as accepted by
     * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
     *
     * Current browsers support the `capture`, `passive`, and `once` options. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
     *
     * @example
     * ```ts
     * class MyElement {
     *   clicked = false;
     *
     *   render() {
     *     return html`
     *       <div @click=${this._onClick}`>
     *         <button></button>
     *       </div>
     *     `;
     *   }
     *
     *   @eventOptions({capture: true})
     *   _onClick(e) {
     *     this.clicked = true;
     *   }
     * }
     * ```
     * @category Decorator
     */
    function eventOptions(options) {
        // Return value typed as any to prevent TypeScript from complaining that
        // standard decorator function signature does not match TypeScript decorator
        // signature
        // TODO(kschaaf): unclear why it was only failing on this decorator and not
        // the others
        return ((protoOrDescriptor, name) => (name !== undefined) ?
            legacyEventOptions(options, protoOrDescriptor, name) :
            standardEventOptions(options, protoOrDescriptor));
    }
    //# sourceMappingURL=decorators.js.map

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
    /**
     * Whether the current browser supports `adoptedStyleSheets`.
     */
    const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
        (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
        ('adoptedStyleSheets' in Document.prototype) &&
        ('replace' in CSSStyleSheet.prototype);
    const constructionToken = Symbol();
    class CSSResult {
        constructor(cssText, safeToken) {
            if (safeToken !== constructionToken) {
                throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
            }
            this.cssText = cssText;
        }
        // Note, this is a getter so that it's lazy. In practice, this means
        // stylesheets are not created until the first element instance is made.
        get styleSheet() {
            if (this._styleSheet === undefined) {
                // Note, if `supportsAdoptingStyleSheets` is true then we assume
                // CSSStyleSheet is constructable.
                if (supportsAdoptingStyleSheets) {
                    this._styleSheet = new CSSStyleSheet();
                    this._styleSheet.replaceSync(this.cssText);
                }
                else {
                    this._styleSheet = null;
                }
            }
            return this._styleSheet;
        }
        toString() {
            return this.cssText;
        }
    }
    /**
     * Wrap a value for interpolation in a [[`css`]] tagged template literal.
     *
     * This is unsafe because untrusted CSS text can be used to phone home
     * or exfiltrate data to an attacker controlled site. Take care to only use
     * this with trusted input.
     */
    const unsafeCSS = (value) => {
        return new CSSResult(String(value), constructionToken);
    };
    const textFromCSSResult = (value) => {
        if (value instanceof CSSResult) {
            return value.cssText;
        }
        else if (typeof value === 'number') {
            return value;
        }
        else {
            throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
        }
    };
    /**
     * Template tag which which can be used with LitElement's [[LitElement.styles |
     * `styles`]] property to set element styles. For security reasons, only literal
     * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
     * may be used inside a template string part.
     */
    const css = (strings, ...values) => {
        const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
        return new CSSResult(cssText, constructionToken);
    };
    //# sourceMappingURL=css-tag.js.map

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
    // IMPORTANT: do not change the property name or the assignment expression.
    // This line will be used in regexes to search for LitElement usage.
    // TODO(justinfagnani): inject version number at build time
    (window['litElementVersions'] || (window['litElementVersions'] = []))
        .push('2.4.0');
    /**
     * Sentinal value used to avoid calling lit-html's render function when
     * subclasses do not implement `render`
     */
    const renderNotImplemented = {};
    /**
     * Base element class that manages element properties and attributes, and
     * renders a lit-html template.
     *
     * To define a component, subclass `LitElement` and implement a
     * `render` method to provide the component's template. Define properties
     * using the [[`properties`]] property or the [[`property`]] decorator.
     */
    class LitElement extends UpdatingElement {
        /**
         * Return the array of styles to apply to the element.
         * Override this method to integrate into a style management system.
         *
         * @nocollapse
         */
        static getStyles() {
            return this.styles;
        }
        /** @nocollapse */
        static _getUniqueStyles() {
            // Only gather styles once per class
            if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
                return;
            }
            // Take care not to call `this.getStyles()` multiple times since this
            // generates new CSSResults each time.
            // TODO(sorvell): Since we do not cache CSSResults by input, any
            // shared styles will generate new stylesheet objects, which is wasteful.
            // This should be addressed when a browser ships constructable
            // stylesheets.
            const userStyles = this.getStyles();
            if (Array.isArray(userStyles)) {
                // De-duplicate styles preserving the _last_ instance in the set.
                // This is a performance optimization to avoid duplicated styles that can
                // occur especially when composing via subclassing.
                // The last item is kept to try to preserve the cascade order with the
                // assumption that it's most important that last added styles override
                // previous styles.
                const addStyles = (styles, set) => styles.reduceRight((set, s) => 
                // Note: On IE set.add() does not return the set
                Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
                // Array.from does not work on Set in IE, otherwise return
                // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
                const set = addStyles(userStyles, new Set());
                const styles = [];
                set.forEach((v) => styles.unshift(v));
                this._styles = styles;
            }
            else {
                this._styles = userStyles === undefined ? [] : [userStyles];
            }
            // Ensure that there are no invalid CSSStyleSheet instances here. They are
            // invalid in two conditions.
            // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
            //     this is impossible to check except via .replaceSync or use
            // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
            //     false)
            this._styles = this._styles.map((s) => {
                if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                    // Flatten the cssText from the passed constructible stylesheet (or
                    // undetectable non-constructible stylesheet). The user might have
                    // expected to update their stylesheets over time, but the alternative
                    // is a crash.
                    const cssText = Array.prototype.slice.call(s.cssRules)
                        .reduce((css, rule) => css + rule.cssText, '');
                    return unsafeCSS(cssText);
                }
                return s;
            });
        }
        /**
         * Performs element initialization. By default this calls
         * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
         * captures any pre-set values for registered properties.
         */
        initialize() {
            super.initialize();
            this.constructor._getUniqueStyles();
            this.renderRoot = this.createRenderRoot();
            // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
            // element's getRootNode(). While this could be done, we're choosing not to
            // support this now since it would require different logic around de-duping.
            if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
                this.adoptStyles();
            }
        }
        /**
         * Returns the node into which the element should render and by default
         * creates and returns an open shadowRoot. Implement to customize where the
         * element's DOM is rendered. For example, to render into the element's
         * childNodes, return `this`.
         * @returns {Element|DocumentFragment} Returns a node into which to render.
         */
        createRenderRoot() {
            return this.attachShadow({ mode: 'open' });
        }
        /**
         * Applies styling to the element shadowRoot using the [[`styles`]]
         * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
         * available and will fallback otherwise. When Shadow DOM is polyfilled,
         * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
         * is available but `adoptedStyleSheets` is not, styles are appended to the
         * end of the `shadowRoot` to [mimic spec
         * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
         */
        adoptStyles() {
            const styles = this.constructor._styles;
            if (styles.length === 0) {
                return;
            }
            // There are three separate cases here based on Shadow DOM support.
            // (1) shadowRoot polyfilled: use ShadyCSS
            // (2) shadowRoot.adoptedStyleSheets available: use it
            // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
            // rendering
            if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
                window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
            }
            else if (supportsAdoptingStyleSheets) {
                this.renderRoot.adoptedStyleSheets =
                    styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
            }
            else {
                // This must be done after rendering so the actual style insertion is done
                // in `update`.
                this._needsShimAdoptedStyleSheets = true;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            // Note, first update/render handles styleElement so we only call this if
            // connected after first update.
            if (this.hasUpdated && window.ShadyCSS !== undefined) {
                window.ShadyCSS.styleElement(this);
            }
        }
        /**
         * Updates the element. This method reflects property values to attributes
         * and calls `render` to render DOM via lit-html. Setting properties inside
         * this method will *not* trigger another update.
         * @param _changedProperties Map of changed properties with old values
         */
        update(changedProperties) {
            // Setting properties in `render` should not trigger an update. Since
            // updates are allowed after super.update, it's important to call `render`
            // before that.
            const templateResult = this.render();
            super.update(changedProperties);
            // If render is not implemented by the component, don't call lit-html render
            if (templateResult !== renderNotImplemented) {
                this.constructor
                    .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
            }
            // When native Shadow DOM is used but adoptedStyles are not supported,
            // insert styling after rendering to ensure adoptedStyles have highest
            // priority.
            if (this._needsShimAdoptedStyleSheets) {
                this._needsShimAdoptedStyleSheets = false;
                this.constructor._styles.forEach((s) => {
                    const style = document.createElement('style');
                    style.textContent = s.cssText;
                    this.renderRoot.appendChild(style);
                });
            }
        }
        /**
         * Invoked on each update to perform rendering tasks. This method may return
         * any value renderable by lit-html's `NodePart` - typically a
         * `TemplateResult`. Setting properties inside this method will *not* trigger
         * the element to update.
         */
        render() {
            return renderNotImplemented;
        }
    }
    /**
     * Ensure this class is marked as `finalized` as an optimization ensuring
     * it will not needlessly try to `finalize`.
     *
     * Note this property name is a string to prevent breaking Closure JS Compiler
     * optimizations. See updating-element.ts for more information.
     */
    LitElement['finalized'] = true;
    /**
     * Reference to the underlying library method used to render the element's
     * DOM. By default, points to the `render` method from lit-html's shady-render
     * module.
     *
     * **Most users will never need to touch this property.**
     *
     * This  property should not be confused with the `render` instance method,
     * which should be overridden to define a template for the element.
     *
     * Advanced users creating a new base class based on LitElement can override
     * this property to point to a custom render method with a signature that
     * matches [shady-render's `render`
     * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
     *
     * @nocollapse
     */
    LitElement.render = render$1;
    //# sourceMappingURL=lit-element.js.map

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
    //# sourceMappingURL=fecha.js.map

    var a=function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")},r=function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")},n=function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};function f(e){return e.substr(0,e.indexOf("."))}function d(e){return e.substr(e.indexOf(".")+1)}function v(e){return f(e.entity_id)}function b(e,t,s){if("unknown"===t.state||"unavailable"===t.state)return e("state.default."+t.state);if(t.attributes.unit_of_measurement)return t.state+" "+t.attributes.unit_of_measurement;var i=v(t);if("input_datetime"===i){var o;if(!t.attributes.has_time)return o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),a(o,s);if(!t.attributes.has_date){var c=new Date;return o=new Date(c.getFullYear(),c.getMonth(),c.getDay(),t.attributes.hour,t.attributes.minute),n(o,s)}return o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),r(o,s)}return t.attributes.device_class&&e("component."+i+".state."+t.attributes.device_class+"."+t.state)||e("component."+i+".state._."+t.state)||t.state}var _="hass:bookmark",q=function(e,t,a,r){r=r||{},a=null==a?{}:a;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,e.dispatchEvent(n),n},L={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function O(e,t){if(e in L)return L[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return "hass:bell-plus";case"armed_night":return "hass:bell-sleep";case"disarmed":return "hass:bell-outline";case"triggered":return "hass:bell-ring";default:return "hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return "closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return "hass:emoticon-dead";case"sleeping":return "hass:sleep";case"initializing":return "hass:timer-sand";default:return "hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),_}}var Z={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},$={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return O("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Z)return Z[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return "hass:battery-unknown";var r=10*Math.round(a/10);return r>=100?"hass:battery":r<=0?"hass:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return "°C"===n||"°F"===n?"hass:thermometer":O("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?O("input_datetime"):"hass:calendar":"hass:clock"}},ee=function(e){if(!e)return _;if(e.attributes.icon)return e.attributes.icon;var t=f(e.entity_id);return t in $?$[t](e):O(t,e.state)};//# sourceMappingURL=index.m.js.map

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
        EDayType["Once"] = "ONCE";
    })(EDayType || (EDayType = {}));
    //# sourceMappingURL=types.js.map

    const CARD_VERSION = 'v2.0.5';
    const DefaultTimeStep = 10;
    const DefaultGroupIcon = 'folder-outline';
    const DefaultEntityIcon = 'folder-outline';
    const DefaultActionIcon = 'flash';
    const DeadEntityName = '(unknown entity)';
    const DeadEntityIcon = 'help-circle-outline';
    const UnitPercent = '%';
    const CreateTimeScheme = 'make_scheme';
    var EViews;
    (function (EViews) {
        EViews["Overview"] = "OVERVIEW";
        EViews["NewSchedule"] = "NEW_SCHEDULE";
        EViews["TimePicker"] = "TIME_PICKER";
        EViews["TimeScheme"] = "TIME_SCHEME";
        EViews["Options"] = "OPTIONS";
    })(EViews || (EViews = {}));
    //# sourceMappingURL=const.js.map

    function stringToTime(string) {
        if (string.match(/^([0-9:]+)$/)) {
            const parts = string.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + parts[2] || 0;
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
    //# sourceMappingURL=time.js.map

    function pick(obj, keys) {
        if (!obj)
            return {};
        return Object.entries(obj)
            .filter(([key]) => keys.includes(key))
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
    }
    function omit(obj, keys) {
        if (!obj)
            return {};
        return Object.entries(obj)
            .filter(([key]) => !keys.includes(key))
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
    }
    function flatten(arr) {
        return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
    }
    function unique(arr) {
        return arr.filter((v, i, a) => a.indexOf(v) === i);
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
    //# sourceMappingURL=helpers.js.map

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
            Optional(action, 'variable', 'object');
            if (Has(action, 'variable') && Type(action.variable, 'object')) {
                tree.push('variable');
                Required(action.variable, 'field', 'string');
                Optional(action.variable, 'name', 'string');
                //list variable
                if (RequiredArrayType(action.variable, 'options', 'object')) {
                    action.variable.options.forEach((option, index) => {
                        tree = baseTree.concat(baseTree, ['variable', index]);
                        Required(option, 'value', 'string');
                        Optional(option, 'name', 'string');
                        Optional(option, 'icon', 'string');
                    });
                }
                //level variable
                else {
                    Optional(action.variable, 'min', 'number');
                    Optional(action.variable, 'max', 'number');
                    Optional(action.variable, 'step', 'number');
                    Optional(action.variable, 'optional', 'boolean');
                    Optional(action.variable, 'unit', 'string');
                }
            }
        };
        Optional(config, 'discover_existing', 'boolean');
        Optional(config, 'standard_configuration', 'boolean');
        Optional(config, 'title', ['boolean', 'string']);
        Optional(config, 'time_step', 'number');
        Optional(config, 'show_header_toggle', 'boolean');
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
                }
            });
        }
        if (errors.length) {
            throw new Error(`Invalid configuration provided (${errors.length} error${errors.length > 1 ? 's' : ''}): ${errors.join(', ')}.`);
        }
    }
    //# sourceMappingURL=config-validation.js.map

    var services = {
    	generic: {
    		parameter_to_value: "{parameter} na {value}",
    		action_with_parameter: "{action} s {parameter}"
    	},
    	climate: {
    		set_temperature: "nastavit teplotu[ na {temperature}]",
    		set_temperature_hvac_mode_heat: "topení[ na {temperature}]",
    		set_temperature_hvac_mode_cool: "chlazení[ na {temperature}]",
    		set_hvac_mode: "nastavit režim[ na {hvac_mode}]",
    		set_preset_mode: "nastavit předvolbu[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "zavřít",
    		open_cover: "otevřít",
    		set_cover_position: "nastavit polohu[ na {position}]"
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
    	light: {
    		turn_on: "zapnout[ na {brightness} jas]"
    	},
    	media_player: {
    		select_source: "vybrat zdroj[ {source}]"
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
    			days_range: "od {startDay} do {endDay}"
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
    			make_scheme: "vytvořit schéma"
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
    			repeat_type: "chování po spuštění"
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
    		set_hvac_mode: "Modus setzen[ auf {hvac_mode}]",
    		set_preset_mode: "Voreinstellung setzen[ auf {preset_mode}]"
    	},
    	cover: {
    		close_cover: "schließen",
    		open_cover: "öffnen",
    		set_cover_position: "Position setzen[ auf {position}]"
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
    	light: {
    		turn_on: "anschalten[ mit {brightness} Helligkeit]"
    	},
    	media_player: {
    		select_source: "Quelle[ {source}] auswählen"
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
    			days_range: "von {startDay} bis {endDay}"
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
    			make_scheme: "Erstelle Zeitplan"
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
    			repeat_type: "Verhalten im Anschluß"
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
    	light: {
    		turn_on: "turn on[ with {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "select source[ {source}]"
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
    			days_range: "from {startDay} to {endDay}"
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
    			repeat_type: "behaviour after triggering"
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
    		set_temperature_hvac_mode_heat: "calefacción [ a {temperature}]",
    		set_temperature_hvac_mode_cool: "frío [ a {temperature}]",
    		set_hvac_mode: "establecer modo[ a {hvac_mode}]",
    		set_preset_mode: "establecer preajuste [ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "cerrado",
    		open_cover: "abierto",
    		set_cover_position: "establecer posición [ a {position}]"
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
    	light: {
    		turn_on: "encender[ con brillo en {brightness}]"
    	},
    	media_player: {
    		select_source: "seleccionar fuente[ {source}]"
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
    			days_range: "de {startDay} a {endDay}"
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
    			excluded_items: "{number} {if number is 1} elemento excluido {else} elementos excluidos",
    			hide_excluded: "ocultar elementos excluidos",
    			additional_tasks: "{number} {if number is 1} tarea adicional {else} tareas adicionales"
    		},
    		entity_picker: {
    			no_groups_defined: "No hay ningún grupo definido",
    			no_group_selected: "selecciona un grupo primero",
    			no_entities_for_group: "no hay ningúna entidad en este grupo",
    			no_entity_selected: "selecciona una entidad primero",
    			no_actions_for_entity: "no hay acciones para esta entidad",
    			make_scheme: "crear planificación"
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
    			repeat_type: "acción después de ejecutar"
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
    	light: {
    		turn_on: "lülita sisse[ heledusega {brightness}]"
    	},
    	media_player: {
    		select_source: "vali sisend[ {source}]"
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
    			days_range: "{startDay} kuni {endDay}"
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
    			repeat_type: "toiming peale käivitumist"
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
    		set_hvac_mode: "ajuster le mode[ à {hvac_mode}]",
    		set_preset_mode: "choisir le pré-réglage[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "fermer",
    		open_cover: "ouvrir",
    		set_cover_position: "ajuster la position[ à {position}]"
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
    	light: {
    		turn_on: "allumer[ avec une luminosité de {brightness}]"
    	},
    	media_player: {
    		select_source: "choisir la source[ {source}]"
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
    			days_range: "de {startDay} à {endDay}"
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
    			make_scheme: "créer un schéma"
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
    			repeat_type: "comportement après déclenchement"
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
    	light: {
    		turn_on: "הדלקה[ בעוצמה של {brightness}]"
    	},
    	media_player: {
    		select_source: "select source[ {source}]"
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
    			days_range: "מ- {startDay} ועד- {endDay}"
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
    			repeat_type: "התנהגות לאחר הפעלה"
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
    		set_hvac_mode: "mód beállítása[ to {hvac_mode}]",
    		set_preset_mode: "preset beállítása[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "zárás",
    		open_cover: "nyitás",
    		set_cover_position: "változtass pozíciót[ to {position}]"
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
    	light: {
    		turn_on: "bekapcsolás[ with {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "forrás kiválasztása[ {source}]"
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
    			days_range: "from {startDay} to {endDay}"
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
    			make_scheme: "make scheme"
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
    			repeat_type: "behaviour after triggering"
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
    		set_hvac_mode: "imposta modalità[ a {hvac_mode}]",
    		set_preset_mode: "imposta programmazione[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "chiuso",
    		open_cover: "aperto",
    		set_cover_position: "imposta posizione[ su {position}]"
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
    	light: {
    		turn_on: "accendi[ con il {brightness} di luminosità]"
    	},
    	media_player: {
    		select_source: "seleziona sorgente[ {source}]"
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
    	cover: "cover",
    	fan: "ventole",
    	group: "gruppi",
    	humidifier: "umidificatori",
    	input_boolean: "input boolean",
    	input_number: "input number",
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
    			days_range: "{if startDay is domenica} dalla domenica {else} dal {startDay} {if endDay is domenica} alla domenica {else} al {endDay}"
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
    			make_scheme: "crea schema"
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
    			repeat_type: "comportamento dopo l'attivazione"
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
    		set_hvac_mode: "modus aanpassen[ naar {hvac_mode}]",
    		set_preset_mode: "programma[ {preset_mode}] instellen"
    	},
    	cover: {
    		close_cover: "sluiten",
    		open_cover: "openen",
    		set_cover_position: "positie instellen[ naar {position}]"
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
    	light: {
    		turn_on: "inschakelen[ met {brightness} helderheid]"
    	},
    	media_player: {
    		select_source: "kies ingang[ {source}]"
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
    			days_range: "van {startDay} tot {endDay}"
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
    			make_scheme: "maak schema"
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
    			repeat_type: "gedrag na activeren"
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
    		parameter_to_value: "{parameter} to {value}",
    		action_with_parameter: "{action} with {parameter}"
    	},
    	climate: {
    		set_temperature: "sett temperatur[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "sett temperatur[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "sett temperatur[ to {temperature}]",
    		set_hvac_mode: "set mode[ to {hvac_mode}]",
    		set_preset_mode: "set preset[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "lukk",
    		open_cover: "åpne",
    		set_cover_position: "sett posisjon[ to {position}]"
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
    	light: {
    		turn_on: "slå på[ with {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "select source[ {source}]"
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
    var domains$a = {
    	alarm_control_panel: "alarm control panel",
    	climate: "klima",
    	cover: "covers",
    	fan: "vifter",
    	group: "groups",
    	humidifier: "humidifiers",
    	input_boolean: "input boolean",
    	input_number: "input number",
    	input_select: "input select",
    	light: "lys",
    	lock: "locks",
    	media_player: "media players",
    	scene: "scenes",
    	script: "scripts",
    	"switch": "brytere",
    	vacuum: "støvsugere",
    	water_heater: "water heaters"
    };
    var ui$a = {
    	components: {
    		date: {
    			day_types_short: {
    				daily: "hver dag",
    				workdays: "ukedager",
    				weekend: "weekend"
    			},
    			day_types_long: {
    				daily: "hver dag",
    				workdays: "ukedager",
    				weekend: "weekend"
    			},
    			days: "Dager",
    			tomorrow: "tomorrow",
    			repeated_days: "every {days}",
    			repeated_days_except: "every day except {excludedDays}",
    			days_range: "from {startDay} to {endDay}"
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
    			title: "Tidsplan"
    		},
    		overview: {
    			no_entries: "Det er ingen definerte tidsplaner å vise",
    			excluded_items: "{number} excluded {if number is 1} item {else} items",
    			hide_excluded: "hide excluded items",
    			additional_tasks: "{number} more {if number is 1} task {else} tasks"
    		},
    		entity_picker: {
    			no_groups_defined: "Ingen grupper definert",
    			no_group_selected: "Velg en gruppe først",
    			no_entities_for_group: "Det finnes ingen entiteter i denne gruppen",
    			no_entity_selected: "Velg en entitet først",
    			no_actions_for_entity: "Det finnes ingen handlinger for denne entiteten",
    			make_scheme: "make scheme"
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
    			repeat_type: "behaviour after triggering"
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
    	light: {
    		turn_on: "zapal[ z jasnością {brightness}]"
    	},
    	media_player: {
    		select_source: "wybierz źródło[ {source}]"
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
    			days_range: "od {startDay} do {endDay}"
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
    			make_scheme: "stwórz schemat"
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
    			repeat_type: "zachowanie po wyzwoleniu"
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
    		set_hvac_mode: "definir modo[ para {hvac_mode}]",
    		set_preset_mode: "definir predefinição[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]"
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
    	light: {
    		turn_on: "ligar[ com {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "selecionar origem[ {source}]"
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
    			days_range: "até {startDay} até {endDay}"
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
    			make_scheme: "criar esquema"
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
    			repeat_type: "comportamento após ativação"
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
    		set_hvac_mode: "definir modo[ para {hvac_mode}]",
    		set_preset_mode: "definir predefinição[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "fechar",
    		open_cover: "abrir",
    		set_cover_position: "definir posição[ para {position}]"
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
    	light: {
    		turn_on: "ligar[ com {brightness} brightness]"
    	},
    	media_player: {
    		select_source: "selecionar origem[ {source}]"
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
    			days_range: "até {startDay} até {endDay}"
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
    			make_scheme: "criar esquema"
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
    			repeat_type: "comportamento após ativação"
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
    		set_hvac_mode: "setare mod[ la {hvac_mode}]",
    		set_preset_mode: "setare preset[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "închidere",
    		open_cover: "deschidere",
    		set_cover_position: "setare poziție[ la {position}]"
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
    	light: {
    		turn_on: "pornire[ cu luminozitate {brightness}]"
    	},
    	media_player: {
    		select_source: "selectare sursă[ {source}]"
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
    			days_range: "din {startDay} până în {endDay}"
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
    			make_scheme: "creare schemă"
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
    			repeat_type: "comportament după declanșare"
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
    		set_hvac_mode: "установить режим[ {hvac_mode}]",
    		set_preset_mode: "выбрать набор настроек[ {preset_mode}]"
    	},
    	cover: {
    		close_cover: "закрыть",
    		open_cover: "открыть",
    		set_cover_position: "установить позицию[ {position}]"
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
    	light: {
    		turn_on: "включить[ с {brightness} яркостью]"
    	},
    	media_player: {
    		select_source: "выбрать источник[ {source}]"
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
    			days_range: "с {startDay} до {endDay}"
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
    			repeat_type: "поведение после срабатывания"
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
    		parameter_to_value: "{parameter} до {value}",
    		action_with_parameter: "{action} з {parameter}"
    	},
    	climate: {
    		set_temperature: "встановити температуру[ to {temperature}]",
    		set_temperature_hvac_mode_heat: "нагрів[ to {temperature}]",
    		set_temperature_hvac_mode_cool: "охолодження[ to {temperature}]",
    		set_hvac_mode: "встановити режим[ to {hvac_mode}]",
    		set_preset_mode: "вибрати пресет[ to {preset_mode}]"
    	},
    	cover: {
    		close_cover: "закрити",
    		open_cover: "відкрити",
    		set_cover_position: "встановити позицію[ to {position}]"
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
    	light: {
    		turn_on: "увімкнути[ з {brightness} якскравістю]"
    	},
    	media_player: {
    		select_source: "вибрати джерело[ {source}]"
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
    var domains$g = {
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
    var ui$g = {
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
    			days_range: "з {startDay} до {endDay}"
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
    			repeat_type: "поведінка після спрацювання"
    		}
    	}
    };
    var uk = {
    	services: services$g,
    	domains: domains$g,
    	ui: ui$g
    };

    var uk$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        services: services$g,
        domains: domains$g,
        ui: ui$g,
        'default': uk
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
        ru: ru$1,
        uk: uk$1,
    };
    function localize(string, lang, search = '', replace = '') {
        let translated;
        try {
            if (lang == 'test')
                return 'TRANSLATED';
            translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
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

    const commonStyle = css `
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
    //# sourceMappingURL=styles.js.map

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
            property({ attribute: false })
        ], SubscribeClass.prototype, "hass", void 0);
        return SubscribeClass;
    };
    //# sourceMappingURL=subscribe-mixin.js.map

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
    // For each part, remember the value that was last rendered to the part by the
    // unsafeHTML directive, and the DocumentFragment that was last set as a value.
    // The DocumentFragment is used as a unique key to check if the last value
    // rendered to the part was with unsafeHTML. If not, we'll always re-render the
    // value passed to unsafeHTML.
    const previousValues = new WeakMap();
    /**
     * Renders the result as HTML, rather than text.
     *
     * Note, this is unsafe to use with any user-provided input that hasn't been
     * sanitized or escaped, as it may lead to cross-site-scripting
     * vulnerabilities.
     */
    const unsafeHTML = directive((value) => (part) => {
        if (!(part instanceof NodePart)) {
            throw new Error('unsafeHTML can only be used in text bindings');
        }
        const previousValue = previousValues.get(part);
        if (previousValue !== undefined && isPrimitive(value) &&
            value === previousValue.value && part.value === previousValue.fragment) {
            return;
        }
        const template = document.createElement('template');
        template.innerHTML = value; // innerHTML casts to string internally
        const fragment = document.importNode(template.content, true);
        part.setValue(fragment);
        previousValues.set(part, { value, fragment });
    });
    //# sourceMappingURL=unsafe-html.js.map

    const weekdayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const formatWeekday = (date, locales, short) => {
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
            return date.toLocaleDateString(locales, {
                weekday: short ? "short" : "long",
            });
        }
        else {
            const weekday = date.getDay();
            return short ? weekdayArray[weekday].substr(0, 3) : weekdayArray[weekday];
        }
    };

    const formatTime = (date, locale, options = {}) => {
        const supportLocaleString = () => {
            try {
                new Date().toLocaleTimeString("i");
            }
            catch (e) {
                return e.name === "RangeError";
            }
            return false;
        };
        if (supportLocaleString()) {
            return date.toLocaleTimeString(undefined, Object.assign(Object.assign({}, options), { hour: "2-digit", minute: "2-digit" }));
        }
        else if (options.hour12) {
            return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
        }
        else {
            return n(date, locale);
        }
    };
    const formatAmPm = (locale) => formatTime(new Date(), locale).includes("M");

    const secondsPerMinute = 60;
    const secondsPerHour = 3600;
    const hoursPerDay = 24;
    const tests = [60, 60, 24, 7];
    const langKey = ['second', 'minute', 'hour', 'day'];
    let MyRelativeTime = class MyRelativeTime extends LitElement {
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
            if (roundedDelta === 0) {
                return this._hass.localize('ui.components.relative_time.just_now');
            }
            if (tense == 'future') {
                if (delta / secondsPerHour >= 6) {
                    const startOfToday = now.setHours(0, 0, 0, 0);
                    const daysFromNow = Math.floor((dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000));
                    let day = '';
                    if (daysFromNow == 1)
                        day = localize('ui.components.date.tomorrow', this._hass.language);
                    else if (daysFromNow > 0)
                        day = formatWeekday(dateObj, this._hass.language);
                    let time = localize('ui.components.time.absolute', this._hass.language, '{time}', formatTime(dateObj, this._hass.language));
                    if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0)
                        time = localize('ui.components.time.at_noon', this._hass.language);
                    else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0)
                        time = localize('ui.components.time.at_midnight', this._hass.language);
                    return String(day + ' ' + time).trim();
                }
                else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
                    const mins = Math.round(delta / secondsPerMinute - 60);
                    const ts2 = this._hass.localize('ui.components.relative_time.duration.minute', 'count', mins);
                    const join = this._hass.localize('ui.common.and');
                    //workaround for missing translation in some languages
                    if (this._hass.localize('ui.components.relative_time.future')) {
                        const ts1 = this._hass.localize('ui.components.relative_time.duration.hour', 'count', 1);
                        return this._hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
                    }
                    else {
                        const ts1 = this._hass.localize('ui.components.relative_time.future_duration.hour', 'count', 1);
                        return `${ts1} ${join} ${ts2}`;
                    }
                }
                else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
                    const seconds = Math.round(delta - 60);
                    const ts2 = this._hass.localize('ui.components.relative_time.duration.second', 'count', seconds);
                    const join = this._hass.localize('ui.common.and');
                    if (this._hass.localize('ui.components.relative_time.future')) {
                        const ts1 = this._hass.localize('ui.components.relative_time.duration.minute', 'count', 1);
                        return this._hass.localize('ui.components.relative_time.future', 'time', `${ts1} ${join} ${ts2}`);
                    }
                    else {
                        const ts1 = this._hass.localize('ui.components.relative_time.future_duration.minute', 'count', 1);
                        return `${ts1} ${join} ${ts2}`;
                    }
                }
            }
            let unit = 'week';
            for (let i = 0; i < tests.length; i++) {
                if (roundedDelta < tests[i]) {
                    unit = langKey[i];
                    break;
                }
                delta /= tests[i];
                roundedDelta = Math.round(delta);
            }
            if (this._hass.localize(`ui.components.relative_time.${tense}`)) {
                const ts = this._hass.localize(`ui.components.relative_time.duration.${unit}`, 'count', roundedDelta);
                return this._hass.localize(`ui.components.relative_time.${tense}`, 'time', ts);
            }
            else {
                return this._hass.localize(`ui.components.relative_time.${tense}_duration.${unit}`, 'count', roundedDelta);
            }
        }
        render() {
            if (!this._hass || !this.datetime)
                return html ``;
            const now = new Date();
            const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
            let updateInterval = 60;
            if (Math.abs(secondsRemaining) <= 150)
                updateInterval = Math.max(Math.ceil(Math.abs(secondsRemaining)) / 10, 2);
            if (this.updateInterval != updateInterval)
                this.startRefreshTimer(updateInterval);
            return html `
      ${capitalize(this.relativeTime(this.datetime))}
    `;
        }
    };
    __decorate([
        property()
    ], MyRelativeTime.prototype, "_hass", void 0);
    __decorate([
        property()
    ], MyRelativeTime.prototype, "datetime", void 0);
    MyRelativeTime = __decorate([
        customElement('my-relative-time')
    ], MyRelativeTime);

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
    const alarmControlPanelStates = (hass, stateObj) => [
        {
            value: 'disarmed',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'disarmed' }), hass.language),
            icon: 'hass:lock-open-variant-outline',
        },
        {
            value: 'armed_away',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'armed_away' }), hass.language),
            icon: 'hass:exit-run',
        },
        {
            value: 'armed_home',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'armed_home' }), hass.language),
            icon: 'hass:home-outline',
        },
        {
            value: 'armed_night',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'armed_night' }), hass.language),
            icon: 'hass:power-sleep',
        },
        {
            value: 'triggered',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'triggered' }), hass.language),
            icon: 'hass:alarm-light-outline',
        },
    ];
    //# sourceMappingURL=alarm_control_panel.js.map

    function levelVariable(config) {
        const output = {
            type: EVariableType.Level,
            field: config.field,
            name: config.name || config.field,
            min: config.min || 0,
            max: config.max || 255,
            step: config.step || 1,
            optional: config.optional || false,
            unit: config.unit || '',
        };
        return output;
    }
    function listVariable(config) {
        const options = [];
        config.options.forEach(e => options.push(Object.assign({}, e)));
        const output = {
            type: EVariableType.List,
            field: config.field,
            name: config.name || config.field,
            options: options.map(e => (e.name ? e : Object.assign(e, { name: PrettyPrintName(e.value) }))),
        };
        return output;
    }
    function computeLevelVariableDisplay(value, config) {
        if (config.unit == '%') {
            const min = config.min;
            const max = config.max;
            const step = config.step;
            const scaleOffset = config.min;
            const scaleGain = (config.max - config.min) / 100;
            let scaledValue = (value - scaleOffset) / scaleGain;
            scaledValue = Math.round(scaledValue / step) * step;
            scaledValue = parseFloat(scaledValue.toPrecision(12));
            if (scaledValue < min)
                scaledValue = min;
            else if (scaledValue > max)
                scaledValue = max;
            return `${scaledValue}${config.unit}`;
        }
        return `${value}${config.unit}`;
    }

    const climateModes = (localizeFunc, stateObj) => {
        const modeList = [
            {
                value: 'off',
                icon: 'hass:power-off',
                name: localizeFunc('state.climate.off'),
            },
            {
                value: 'heat',
                icon: 'hass:fire',
                name: localizeFunc('state.climate.heat'),
            },
            {
                value: 'cool',
                icon: 'hass:snowflake',
                name: localizeFunc('state.climate.cool'),
            },
            {
                value: 'heat_cool',
                icon: 'hass:thermometer',
                name: localizeFunc('state.climate.heat_cool'),
            },
            {
                value: 'auto',
                icon: 'hass:autorenew',
                name: localizeFunc('state_attributes.climate.auto'),
            },
            {
                value: 'dry',
                icon: 'hass:water-percent',
                name: localizeFunc('state.climate.dry'),
            },
            {
                value: 'fan_only',
                icon: 'hass:fan',
                name: localizeFunc('state.climate.fan_only'),
            },
        ];
        if (stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)) {
            return stateObj.attributes.hvac_modes.map(mode => modeList.find(el => el.value == mode) || { value: mode });
        }
        return modeList;
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
        if (stateObj && stateObj.attributes.preset_modes && Array.isArray(stateObj.attributes.preset_modes)) {
            return stateObj.attributes.preset_modes.map(preset => presetList.find(el => el.value == preset) || { value: preset });
        }
        return presetList;
    };
    const climateActions = (hass, stateObj, filterCapabilities) => {
        let hvacModes = climateModes(hass.localize, stateObj);
        if (hvacModes.length == 1)
            hvacModes = [];
        const tempVariable = levelVariable({
            field: 'temperature',
            name: hass.localize('ui.card.weather.attributes.temperature'),
            min: stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp,
            max: stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp,
            step: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step) ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F')
                ? 1
                : 0.5,
            unit: hass.config.unit_system.temperature,
        });
        const actions = [
            {
                service: 'climate.set_preset_mode',
                variable: listVariable({
                    field: 'preset_mode',
                    name: hass.localize('ui.card.climate.preset_mode'),
                    options: climatePresets(hass.localize, stateObj),
                }),
                icon: 'hass:cloud-download-outline',
                name: localize('services.climate.set_preset_mode', hass.language),
                supported_feature: 16,
            },
        ];
        if (!filterCapabilities || hvacModes.find(e => e.value == 'off')) {
            actions.push({
                service: 'climate.set_hvac_mode',
                service_data: { hvac_mode: 'off' },
                icon: 'hass:power',
                name: hass.localize('ui.card.media_player.turn_off'),
            });
            if (filterCapabilities)
                hvacModes = hvacModes.filter(e => e.value != 'off');
        }
        if (!filterCapabilities || !hvacModes.find(e => e.value == 'off')) {
            actions.push({
                service: 'climate.turn_off',
                icon: 'hass:power',
                name: hass.localize('ui.card.media_player.turn_off'),
            });
        }
        if (!filterCapabilities || (!hvacModes.find(e => e.value == 'cool') && !hvacModes.find(e => e.value == 'heat'))) {
            actions.push({
                service: 'climate.set_temperature',
                variable: tempVariable,
                icon: 'hass:thermometer',
                name: localize('services.climate.set_temperature', hass.language),
                supported_feature: 1,
            });
        }
        if (!filterCapabilities || hvacModes.find(e => e.value == 'heat')) {
            actions.push({
                service: 'climate.set_temperature',
                service_data: { hvac_mode: 'heat' },
                variable: tempVariable,
                icon: 'hass:fire',
                name: localize('services.climate.set_temperature_hvac_mode_heat', hass.language),
                supported_feature: 1,
            });
            if (filterCapabilities)
                hvacModes = hvacModes.filter(e => e.value != 'heat');
        }
        if (!filterCapabilities || hvacModes.find(e => e.value == 'cool')) {
            actions.push({
                service: 'climate.set_temperature',
                service_data: { hvac_mode: 'cool' },
                variable: tempVariable,
                icon: 'hass:snowflake',
                name: localize('services.climate.set_temperature_hvac_mode_cool', hass.language),
                supported_feature: 1,
            });
            if (filterCapabilities)
                hvacModes = hvacModes.filter(e => e.value != 'cool');
        }
        actions.push({
            service: 'climate.set_hvac_mode',
            variable: listVariable({
                field: 'hvac_mode',
                name: hass.localize('ui.card.climate.operation'),
                options: hvacModes,
            }),
            icon: 'hass:cog-transfer-outline',
            name: localize('services.climate.set_hvac_mode', hass.language),
        });
        return actions;
    };
    const climateStates = (hass, stateObj) => {
        const modeList = [
            {
                value: 'off',
                icon: 'hass:power-off',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            },
            {
                value: 'heat',
                icon: 'hass:fire',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'heat' }), hass.language),
            },
            {
                value: 'cool',
                icon: 'hass:snowflake',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'cool' }), hass.language),
            },
            {
                value: 'heat_cool',
                icon: 'hass:thermometer',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'heat_cool' }), hass.language),
            },
            {
                value: 'auto',
                icon: 'hass:autorenew',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'auto' }), hass.language),
            },
            {
                value: 'dry',
                icon: 'hass:water-percent',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'dry' }), hass.language),
            },
            {
                value: 'fan_only',
                icon: 'hass:fan',
                name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'fan_only' }), hass.language),
            },
        ];
        if (stateObj && stateObj.attributes.hvac_modes && Array.isArray(stateObj.attributes.hvac_modes)) {
            return modeList.filter(e => stateObj.attributes.hvac_modes.includes(e.value));
        }
        return modeList;
    };

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
            name: localize('services.cover.open_cover', hass.language),
            supported_feature: 1,
        },
        {
            service: 'cover.close_cover',
            icon: coverIcon(stateObj),
            name: localize('services.cover.close_cover', hass.language),
            supported_feature: 2,
        },
        {
            service: 'cover.set_cover_position',
            variable: levelVariable({
                field: 'position',
                name: hass.localize('ui.card.cover.position', hass.language),
                min: 0,
                max: 100,
                step: 1,
                unit: '%',
            }),
            supported_feature: 4,
            icon: 'hass:ray-vertex',
            name: localize('services.cover.set_cover_position', hass.language),
        },
        // {
        //   service: 'cover.open_cover_tilt',
        //   icon: 'hass:valve-open',
        //   name: localize('services.cover.open_cover', hass.language),
        //   supported_feature: 16,
        // },
        // {
        //   service: 'cover.close_cover_tilt',
        //   icon: 'hass:valve-closed',
        //   name: localize('services.cover.close_cover', hass.language),
        //   supported_feature: 32,
        // },
        {
            service: 'cover.set_cover_tilt_position',
            variable: levelVariable({
                field: 'tilt_position',
                name: hass.localize('ui.card.cover.tilt_position', hass.language),
                min: 0,
                max: 100,
                step: 1,
                unit: '%',
            }),
            supported_feature: 128,
            icon: 'hass:valve',
            name: localize('services.cover.set_cover_tilt_position', hass.language),
        },
    ];
    const coverStates = (hass, stateObj) => [
        {
            value: 'closed',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'closed' }), hass.language),
            icon: ee(Object.assign(Object.assign({}, stateObj), { state: 'closed' })),
        },
        {
            value: 'open',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'open' }), hass.language),
            icon: ee(Object.assign(Object.assign({}, stateObj), { state: 'open' })),
        },
    ];

    const fanSpeeds = (localizeFunc, stateObj) => {
        const speedList = [
            {
                value: 'off',
                icon: 'hass:fan-off',
                name: localizeFunc('state.default.off').toLowerCase(),
            },
            {
                value: 'low',
                icon: 'hass:fan-speed-1',
                name: localizeFunc('ui.card.climate.low').toLowerCase(),
            },
            {
                value: 'medium',
                icon: 'hass:fan-speed-2',
            },
            {
                value: 'high',
                icon: 'hass:fan-speed-3',
                name: localizeFunc('ui.card.climate.high').toLowerCase(),
            },
        ];
        if (stateObj && stateObj.attributes.speed_list && Array.isArray(stateObj.attributes.speed_list)) {
            return stateObj.attributes.speed_list.map(speed => speedList.find(el => el.value == speed) || { value: speed });
        }
        return speedList;
    };
    const fanActions = (hass, stateObj) => [
        {
            service: 'fan.turn_on',
            icon: 'hass:power',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
        {
            service: 'fan.turn_off',
            icon: 'hass:power-off',
            name: hass.localize('ui.card.media_player.turn_off'),
        },
        {
            service: 'fan.set_speed',
            variable: listVariable({
                field: 'speed',
                name: hass.localize('ui.card.fan.speed'),
                options: fanSpeeds(hass.localize, stateObj),
            }),
            supported_feature: 1,
            icon: 'hass:weather-windy',
            name: localize('services.fan.set_speed', hass.language),
        },
        {
            service: 'fan.oscillate',
            variable: listVariable({
                field: 'oscillating',
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
                    },
                ],
            }),
            supported_feature: 2,
            icon: 'hass:arrow-left-right',
            name: localize('services.fan.oscillate', hass.language),
        },
        {
            service: 'fan.set_direction',
            variable: listVariable({
                field: 'direction',
                name: hass.localize('ui.card.fan.direction'),
                options: [
                    {
                        value: 'forward',
                        name: hass.localize('ui.card.fan.forward'),
                        icon: 'hass:autorenw',
                    },
                    {
                        value: 'reverse',
                        name: hass.localize('ui.card.fan.reverse'),
                        icon: 'hass:sync',
                    },
                ],
            }),
            supported_feature: 4,
            icon: 'hass:cog-clockwise',
            name: localize('services.fan.set_direction', hass.language),
        },
    ];
    const fanStates = (hass, stateObj) => [
        {
            value: 'off',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            icon: 'hass:power-off',
        },
        {
            value: 'on',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'on' }), hass.language),
            icon: 'hass:power',
        },
    ];

    const humidifierModes = (localizeFunc, stateObj) => {
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
        if (stateObj && stateObj.attributes.available_modes && Array.isArray(stateObj.attributes.available_modes)) {
            return stateObj.attributes.available_modes.map(mode => modeList.find(el => el.value == mode) || { value: mode });
        }
        return modeList;
    };
    const humidifierActions = (hass, stateObj) => [
        {
            service: 'humidifier.turn_on',
            icon: 'hass:power',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
        {
            service: 'turn_off',
            icon: 'hass:power-off',
            name: hass.localize('ui.card.media_player.turn_off'),
        },
        {
            service: 'humidifier.set_humidity',
            variable: levelVariable({
                field: 'humidity',
                name: hass.localize('ui.card.humidifier.humidity'),
                min: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_humidity) || 0,
                max: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_humidity) || 255,
                step: 1,
                unit: '%',
            }),
            icon: 'hass:water-percent',
            name: localize('services.humidifer.set_humidity', hass.language),
        },
        {
            service: 'humidifier.set_mode',
            variable: listVariable({
                field: 'mode',
                name: hass.localize('ui.card.humidifier.mode'),
                options: humidifierModes(hass.localize, stateObj),
            }),
            icon: 'hass:cog-transfer-outline',
            name: localize('services.climate.set_mode', hass.language),
        },
    ];

    const inputNumberActions = (hass, stateObj) => [
        {
            service: 'input_number.set_value',
            variable: levelVariable({
                field: 'value',
                name: hass.localize('ui.panel.config.helpers.types.input_number'),
                min: stateObj && stateObj.attributes.min ? Number(stateObj.attributes.min) : 0,
                max: stateObj && stateObj.attributes.max ? Number(stateObj.attributes.max) : 255,
                step: stateObj && stateObj.attributes.step ? Number(stateObj.attributes.step) : 1,
                unit: stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : '',
            }),
            icon: 'hass:counter',
            name: localize('services.input_number.set_value', hass.language),
        },
    ];

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
            variable: listVariable({
                field: 'option',
                name: hass.localize('ui.components.dialogs.input_select.options'),
                options: inputSelectOptions(hass.localize, stateObj),
            }),
            icon: 'counter',
            name: localize('services.input_select.select_option', hass.language),
        },
    ];
    const inputSelectStates = (hass, stateObj) => inputSelectOptions(hass.localize, stateObj).map(e => Object.assign(e, { name: e.value }));

    const lightActions = (hass, stateObj) => {
        const actions = [
            {
                service: 'light.turn_off',
                icon: 'hass:lightbulb-off',
                name: hass.localize('ui.card.media_player.turn_off'),
            },
        ];
        if (stateObj &&
            stateObj.attributes.supported_features !== undefined &&
            !(stateObj.attributes.supported_features & 1)) {
            actions.push({
                service: 'light.turn_on',
                icon: 'hass:lightbulb-on',
                name: hass.localize('ui.card.media_player.turn_on'),
            });
        }
        else {
            actions.push({
                service: 'light.turn_on',
                variable: levelVariable({
                    field: 'brightness',
                    name: hass.localize('ui.card.light.brightness'),
                    min: 0,
                    max: 255,
                    step: 1,
                    unit: '%',
                    optional: true,
                }),
                icon: 'hass:lightbulb-on',
                name: localize('services.light.turn_on', hass.language),
                supported_feature: 1,
            });
        }
        return actions;
    };
    const lightStates = (hass, stateObj) => [
        {
            value: 'off',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            icon: 'hass:lightbulb-off',
        },
        {
            value: 'on',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'on' }), hass.language),
            icon: 'hass:lightbulb',
        },
    ];

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
    const lockStates = (hass, stateObj) => [
        {
            value: 'unlocked',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'unlocked' }), hass.language),
            icon: 'hass:lock-open-variant-outline',
        },
        {
            value: 'locked',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'locked' }), hass.language),
            icon: 'hass:lock-outline',
        },
    ];
    //# sourceMappingURL=lock.js.map

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
            name: hass.localize('ui.card.media_player.turn_on'),
            supported_feature: 128,
        },
        {
            service: 'media_player.turn_off',
            icon: 'hass:power-off',
            name: hass.localize('ui.card.media_player.turn_off'),
            supported_feature: 256,
        },
        {
            service: 'media_player.select_source',
            variable: listVariable({
                field: 'source',
                name: hass.localize('ui.card.media_player.source'),
                options: mediaPlayerSources(hass.localize, stateObj),
            }),
            icon: 'hass:music-box-multiple-outline',
            name: localize('services.media_player.select_source', hass.language),
            supported_feature: 2048,
        },
    ];

    const scriptActions = (hass, stateObj) => {
        const actions = [
            {
                service: 'script.turn_on',
                icon: 'hass:flash',
                name: hass.localize('ui.card.media_player.turn_on'),
            },
            {
                service: 'script.turn_off',
                icon: 'hass:flash-off',
                name: hass.localize('ui.card.media_player.turn_off'),
            },
        ];
        if (stateObj) {
            actions.push({
                service: 'script' + '.' + d(stateObj.entity_id),
                icon: 'hass:play',
                name: localize('services.script.script', hass.language),
            });
        }
        return actions;
    };

    const vacuumActions = (hass, _stateObj) => [
        {
            service: 'vacuum.turn_on',
            icon: 'hass:power',
            name: hass.localize('ui.card.media_player.turn_on'),
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
            name: localize('services.vacuum.start_pause', hass.language),
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
            variable: levelVariable({
                field: 'temperature',
                name: hass.localize('ui.card.weather.attributes.temperature'),
                min: stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.min_temp,
                max: stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.max_temp,
                step: (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step) ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.target_temp_step : hass.config.unit_system.temperature.includes('F')
                    ? 1
                    : 0.5,
                unit: hass.config.unit_system.temperature,
            }),
            icon: 'hass:thermometer',
            name: localize('services.climate.set_temperature', hass.language),
            supported_feature: 1,
        },
        {
            service: 'water_heater.set_operation_mode',
            variable: listVariable({
                field: 'operation_mode',
                name: hass.localize('ui.card.water_heater.operation'),
                options: waterHeaterModes(hass.localize, stateObj),
            }),
            icon: 'hass:cog-transfer-outline',
            name: localize('services.climate.set_mode', hass.language),
            supported_feature: 2,
        },
        {
            service: 'water_heater.set_away_mode',
            variable: listVariable({
                field: 'mode',
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
            }),
            icon: 'hass:car-traction-control',
            name: localize('services.water_heater.set_away_mode', hass.language),
            supported_feature: 4,
        },
    ];

    function uniqueId(input) {
        const sortObject = e => Object.entries(e)
            .sort((a, b) => (a[0] > b[0] ? 1 : -1))
            .map(([k, v]) => [k, typeof v === 'object' && v !== null ? sortObject(v) : v])
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
        let obj = { service: input.service };
        if (input.service_data && Object.keys(input.service_data).length) {
            obj = Object.assign(Object.assign({}, obj), { service_data: input.service_data });
            obj = sortObject(obj);
        }
        const res = Object.values(obj)
            .map(e => JSON.stringify(e)
            .replace(/[\W]/g, ' ')
            .split(' ')
            .filter(e => e != ' ' && e != '')
            .join('_'))
            .join('_');
        return res;
    }
    function equalAction(source, target) {
        if (uniqueId(source) == uniqueId(target))
            return true;
        else if (source.variable)
            return (uniqueId(source) == uniqueId(Object.assign(Object.assign({}, target), { service_data: omit(target.service_data, [source.variable.field]) })));
        return false;
    }
    //# sourceMappingURL=compute_action_id.js.map

    function groupActions(entity, entityActions) {
        const entities = entity && entity.attributes.entity_id && Array.isArray(entity.attributes.entity_id)
            ? entity.attributes.entity_id
            : [];
        //find matches
        const mixedDomains = entities.map(e => f(e)).filter((v, k, arr) => arr.indexOf(v) === k).length > 1;
        if (mixedDomains) {
            entityActions = entityActions.map(actionList => {
                return actionList.map(action => {
                    if (d(action.service) == 'turn_on' || d(action.service) == 'turn_off') {
                        return Object.assign(Object.assign({}, action), { service: 'homeassistant' + '.' + d(action.service), icon: d(action.service) == 'turn_on' ? 'flash' : 'flash-off' });
                    }
                    return action;
                });
            });
        }
        if (!entityActions.length)
            return [];
        const actions = entityActions[0].filter(action => {
            return entityActions.every(e => {
                return e.map(el => uniqueId(el)).includes(uniqueId(action));
            });
        });
        return actions;
    }
    const groupStates = (_hass, _stateObj, entityStates) => {
        if (!entityStates.length || !Array.isArray(entityStates[0]))
            return [];
        let states = [...entityStates[0]];
        if (!states.length)
            return [];
        entityStates
            .filter(e => Array.isArray(e))
            .forEach(entity => {
            states = states.filter(e => {
                return entity.find(el => el.value == e.value);
            });
        });
        return states;
    };
    //# sourceMappingURL=group.js.map

    const inputBooleanActions = (hass, _stateObj) => [
        {
            service: 'input_boolean.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
        {
            service: 'input_boolean.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.media_player.turn_off'),
        },
    ];
    const inputBooleanStates = (hass, stateObj) => [
        {
            value: 'off',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            icon: 'hass:flash-off',
        },
        {
            value: 'on',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'on' }), hass.language),
            icon: 'hass:flash',
        },
    ];
    //# sourceMappingURL=input_boolean.js.map

    const sceneActions = (hass, _stateObj) => [
        {
            service: 'scene.turn_on',
            icon: 'hass:play',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
    ];
    //# sourceMappingURL=scene.js.map

    const switchActions = (hass, _stateObj) => [
        {
            service: 'switch.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
        {
            service: 'switch.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.media_player.turn_off'),
        },
    ];
    const switchStates = (hass, stateObj) => [
        {
            value: 'off',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            icon: 'hass:flash-off',
        },
        {
            value: 'on',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'on' }), hass.language),
            icon: 'hass:flash',
        },
    ];
    //# sourceMappingURL=switch.js.map

    const automationActions = (hass, _stateObj) => [
        {
            service: 'automation.turn_on',
            icon: 'hass:flash',
            name: hass.localize('ui.card.media_player.turn_on'),
        },
        {
            service: 'automation.turn_off',
            icon: 'hass:flash-off',
            name: hass.localize('ui.card.media_player.turn_off'),
        },
        {
            service: 'automation.trigger',
            icon: 'hass:play',
            name: hass.localize('ui.card.script.run'),
        },
    ];

    function standardActions(entity_id, hass, filterCapabilities = false) {
        try {
            const domain = f(entity_id);
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
                    const entities = stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id)
                        ? stateObj.attributes.entity_id
                        : [];
                    const configs = entities.map(e => standardActions(e, hass));
                    return groupActions(stateObj, configs);
                case 'humidifer':
                    return humidifierActions(hass, stateObj);
                case 'input_boolean':
                    return inputBooleanActions(hass, stateObj);
                case 'input_number':
                    return inputNumberActions(hass, stateObj);
                case 'input_select':
                    return inputSelectActions(hass, stateObj);
                case 'light':
                    return lightActions(hass, stateObj);
                case 'lock':
                    return lockActions(hass, stateObj);
                case 'media_player':
                    return mediaPlayerActions(hass, stateObj);
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

    function matchPattern(pattern, value) {
        let res = false;
        if (pattern.match(/^[a-z0-9_\.]+$/)) {
            if (pattern.includes('.'))
                res = pattern == value;
            else
                res = pattern == f(value);
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
    function applyFilters(value, config) {
        let match = false;
        if (config.include && config.include.find(e => matchPattern(e, value)))
            match = true;
        else if (config.customize && Object.keys(config.customize).find(e => matchPattern(e, value)))
            match = true;
        if (config.exclude && config.exclude.find(e => matchPattern(e, value)))
            match = false;
        return match;
    }
    function entityFilter(entity_id, config) {
        if (!applyFilters(entity_id, config) && (!config.groups || !config.groups.some(e => applyFilters(entity_id, e))))
            return false;
        return true;
    }
    //# sourceMappingURL=filter_entity.js.map

    function computeEntityActionConfig(entity, hass, config) {
        const stateObj = hass.states[entity];
        let actionList = [];
        if (config.standard_configuration === undefined || config.standard_configuration) {
            actionList = standardActions(entity, hass, true);
        }
        if (config.customize) {
            const userConfig = Object.entries(config.customize)
                .filter(([pattern]) => matchPattern(pattern, entity))
                .sort((a, b) => b[0].length - a[0].length);
            //excluded actions
            userConfig
                .filter(([, config]) => config.exclude_actions && config.exclude_actions.length)
                .map(([, config]) => config.exclude_actions)
                .reduce((r, a) => r.concat(a), [])
                .forEach(el => {
                if (el == 'all')
                    actionList = [];
                actionList = actionList.filter(e => !e.name ||
                    !e.name
                        .replace(/_/g, ' ')
                        .trim()
                        .toLowerCase()
                        .includes(el
                        .replace(/_/g, ' ')
                        .trim()
                        .toLowerCase()));
            });
            userConfig
                .filter(([, config]) => config.actions && config.actions.length)
                .map(([, config]) => config.actions)
                .reduce((r, a) => r.concat(a), [])
                .forEach(action => {
                if (!f(action.service).length)
                    action = Object.assign(Object.assign({}, action), { service: f(entity) + '.' + d(action.service) });
                if (action.service_data)
                    action = Object.assign(Object.assign({}, action), { service_data: omit(action.service_data, ['entity_id']) });
                let res = actionList.findIndex(el => equalAction(el, action));
                if (res >= 0 && action.service_data && uniqueId(action) != uniqueId(actionList[res]))
                    res = -1;
                if (res >= 0) {
                    let item = Object.assign(Object.assign({}, actionList[res]), omit(action, ['variable']));
                    if (action.variable)
                        item = Object.assign(Object.assign({}, item), { variable: Object.assign(Object.assign({}, (item.variable || {})), action.variable) });
                    actionList = Object.values(Object.assign(Object.assign({}, actionList), { [res]: item }));
                }
                else
                    actionList.push(action);
            });
        }
        if (stateObj && stateObj.attributes && stateObj.attributes.supported_features) {
            const supportedFeatures = stateObj.attributes.supported_features;
            actionList = actionList.filter(e => !e.supported_feature || e.supported_feature & supportedFeatures);
        }
        actionList = actionList
            .map(action => {
            if (action.variable && action.variable.type == EVariableType.List) {
                const config = action.variable;
                if (!config.options.length)
                    return null;
                else if (config.options.length == 1) {
                    const listOption = config.options[0];
                    const service_data = Object.assign(Object.assign({}, (action.service_data || {})), { [config.field]: listOption.value });
                    return Object.assign(Object.assign({}, action), { icon: listOption.icon || action.icon, service_data: service_data });
                }
            }
            return action;
        })
            .filter(e => e);
        return actionList;
    }
    function actionElement(action) {
        const id = uniqueId(action);
        let item = {
            id: id,
            service: action.service,
            service_data: {},
        };
        item = Object.assign(Object.assign({}, item), omit(action, ['variable']));
        if (!item.name)
            item = Object.assign(Object.assign({}, item), { name: d(action.service) });
        if (!item.icon)
            item = Object.assign(Object.assign({}, item), { icon: DefaultActionIcon });
        if (action.variable) {
            if ('options' in action.variable)
                item = Object.assign(Object.assign({}, item), { variable: listVariable(action.variable) });
            else
                item = Object.assign(Object.assign({}, item), { variable: levelVariable(action.variable) });
        }
        return item;
    }
    function computeEntityActions(entity, hass, config) {
        if (!Array.isArray(entity)) {
            const actionList = computeEntityActionConfig(entity, hass, config);
            return actionList.map(actionElement);
        }
        else {
            const actions = entity.map(el => computeEntityActions(el, hass, config));
            if (!actions.length)
                return [];
            const actionsList = actions[0]
                .filter(action => actions.every(e => e.map(el => el.id).includes(action.id)))
                .map(action => {
                if (action.variable) {
                    if (!actions.every(entityActions => entityActions.find(e => e.id == action.id).variable))
                        return omit(action, ['variable']);
                    else {
                        if (action.variable.type == EVariableType.Level) {
                            return Object.assign(Object.assign({}, action), { variable: Object.assign(Object.assign({}, action.variable), { min: Math.max(...actions.map(entityActions => entityActions.find(e => e.id == action.id).variable.min)), max: Math.min(...actions.map(entityActions => entityActions.find(e => e.id == action.id).variable.max)), step: Math.max(...actions.map(entityActions => entityActions.find(e => e.id == action.id).variable.step)) }) });
                        }
                        else {
                            let options = action.variable.options;
                            actions.forEach(entityActions => {
                                const config = entityActions.find(e => e.id == action.id).variable;
                                options = options.filter(e => config.options.map(e => e.value).includes(e.value));
                            });
                            return Object.assign(Object.assign({}, action), { variable: Object.assign(Object.assign({}, action.variable), { options: options }) });
                        }
                    }
                }
                return action;
            });
            return actionsList;
        }
    }

    function parseAction(action, hass, config, preserveServiceData = false) {
        const entity = action.entity_id;
        const service = action.service;
        const service_data = action.service_data || {};
        const actionList = computeEntityActionConfig(entity, hass, config);
        const id = uniqueId({ service: service, service_data: service_data });
        let match = actionList.find(e => uniqueId(e) == id);
        if (!match) {
            match = actionList.find(e => e.variable &&
                uniqueId(e) == uniqueId(Object.assign(Object.assign({}, action), { service_data: omit(action.service_data, [e.variable.field]) })));
            if (match)
                match = Object.assign(Object.assign({}, match), { service_data: Object.assign(Object.assign({}, (match.service_data || {})), service_data) });
        }
        if (!match) {
            const actionList = standardActions(entity, hass);
            match = actionList.find(el => equalAction(el, action));
            if (match && match.variable && action.service_data && match.variable.field in action.service_data) {
                if (match.variable.type == EVariableType.List) {
                    let variable = match.variable;
                    const value = action.service_data[variable.field];
                    variable = Object.assign(Object.assign({}, variable), { options: [variable.options.find(e => e.value == value) || { value: value }] });
                    match = Object.assign(Object.assign({}, match), { variable: Object.assign({}, variable), service_data: Object.assign(Object.assign({}, match.service_data), { [variable.field]: value }) });
                }
                else if (match.variable.type == EVariableType.Level && preserveServiceData) {
                    const variable = match.variable;
                    const value = action.service_data[variable.field];
                    match = Object.assign(Object.assign({}, match), { service_data: Object.assign(Object.assign({}, match.service_data), { [variable.field]: value }) });
                }
            }
        }
        if (match)
            return actionElement(match);
        const actionCfg = { service: action.service, service_data: action.service_data };
        return actionElement(actionCfg);
    }

    const binarySensorIcon = (stateObj) => {
        if (stateObj)
            return ee(Object.assign(Object.assign({}, stateObj), { state: 'off' })) || 'hass:radiobox-blank';
        else
            return 'hass:radiobox-blank';
    };
    const binarySensorStates = (hass, stateObj) => [
        {
            value: 'off',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'off' }), hass.language),
            icon: ee(Object.assign(Object.assign({}, stateObj), { state: 'off' })),
        },
        {
            value: 'on',
            name: b(hass.localize, Object.assign(Object.assign({}, stateObj), { state: 'on' }), hass.language),
            icon: ee(Object.assign(Object.assign({}, stateObj), { state: 'on' })),
        },
    ];
    //# sourceMappingURL=binary_sensor.js.map

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
    //# sourceMappingURL=sensor.js.map

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
        input_text: 'hass:textbox',
        light: 'hass:lightbulb-outline',
        lock: 'hass:lock-open-outline',
        media_player: 'hass:cast-connected',
        notify: 'hass:comment-alert',
        person: 'hass:account-outline',
        remote: 'hass:remote',
        scene: 'hass:palette-outline',
        script: 'hass:file-document',
        sensor: 'hass:eye',
        switch: 'hass:flash',
        timer: 'hass:timer',
        vacuum: 'hass:robot-vacuum',
        water_heater: 'hass:water-boiler',
    };
    function standardIcon(entity_id, hass) {
        const domain = f(entity_id);
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
    //# sourceMappingURL=standardIcon.js.map

    function parseEntity(entity_id, hass, config) {
        const stateObj = entity_id in hass.states ? hass.states[entity_id] : undefined;
        let entity = {
            id: entity_id,
            name: stateObj ? stateObj.attributes.friendly_name || d(entity_id) : DeadEntityName,
            icon: stateObj ? stateObj.attributes.icon : DeadEntityIcon,
        };
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
    //# sourceMappingURL=parse_entity.js.map

    const wildcardPattern = /\{([^\}]+)\}/;
    const parameterPattern = /\[([^\]]+)\]/;
    function computeActionDisplay(action) {
        let name = action.name;
        if (!name)
            name = d(action.service);
        const res = name.match(parameterPattern);
        if (res) {
            let replacement = '';
            const wildcard = res[1].match(wildcardPattern);
            if (wildcard && action.service_data && wildcard[1] in action.service_data) {
                let value = '';
                if (action.variable && action.variable.field == wildcard[1] && action.variable.type == EVariableType.Level) {
                    value = computeLevelVariableDisplay(action.service_data[action.variable.field], action.variable);
                }
                else {
                    value = action.service_data[wildcard[1]];
                }
                replacement = res[1].replace(wildcard[0], value);
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
        if (weekday.includes('once'))
            return EDayType.Once;
        return EDayType.Custom;
    }
    //# sourceMappingURL=weekday_type.js.map

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
    //# sourceMappingURL=weekday_to_list.js.map

    function stringToDate(timeString) {
        const parts = timeString.split(':').map(Number);
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...parts);
    }
    //# sourceMappingURL=string_to_date.js.map

    const STATE_NOT_RUNNING = "NOT_RUNNING";

    let ScheduleEntityRow = class ScheduleEntityRow extends LitElement {
        set schedule(schedule) {
            this._schedule = schedule;
        }
        set hass(hass) {
            this._hass = hass;
        }
        get hass() {
            return this._hass;
        }
        shouldUpdate(changedProps) {
            if (changedProps.size > 1)
                return true;
            const oldHass = changedProps.get('_hass');
            if (oldHass && this._schedule)
                return (JSON.stringify(oldHass.states[this._schedule.entity_id]) !==
                    JSON.stringify(this._hass.states[this._schedule.entity_id]));
            const oldSchedule = changedProps.get('_schedule');
            if (oldSchedule)
                return JSON.stringify(oldSchedule) !== JSON.stringify(this._schedule);
            else
                return true;
        }
        render() {
            var _a;
            if (!this._schedule.next_entries.length) {
                return this._hass.config.state !== STATE_NOT_RUNNING
                    ? html `
            <hui-warning>
              Defective schedule entity: ${this._schedule.entity_id}
            </hui-warning>
          `
                    : html `
            <hui-warning>
              ${this._hass.localize('ui.panel.lovelace.warning.starting')}
            </hui-warning>
          `;
            }
            const nextEntry = this._schedule.timeslots[this._schedule.next_entries[0]];
            const entities = unique(nextEntry.actions.map(e => e.entity_id)).map(e => parseEntity(e, this._hass, this.config));
            const entityIcon = unique(entities.map(e => e.icon)).length == 1 ? entities[0].icon : standardIcon(entities[0].id, this._hass);
            const entityDomains = unique(entities.map(e => f(e.id)));
            const entityName = entities.length == 1
                ? entities[0].name
                : entityDomains.length == 1
                    ? `${entities.length}x ${localize(`domains.${entityDomains[0]}`, this._hass.language) || entityDomains[0]}`
                    : `${entities.length}x entities`;
            const actionConfig = parseAction(nextEntry.actions[0], this._hass, this.config, true);
            const icon = this.config.display_options && this.config.display_options.icon && this.config.display_options.icon == 'entity'
                ? entityIcon
                : actionConfig.icon;
            const computeDisplayItem = (displayItem) => {
                switch (displayItem) {
                    case 'name':
                        return this._schedule.name || '';
                    case 'relative-time':
                        return `<my-relative-time></my-relative-time>`;
                    case 'additional-tasks':
                        return this._schedule.timeslots.length > 1
                            ? '+' +
                                localize('ui.panel.overview.additional_tasks', this._hass.language, '{number}', String(this._schedule.timeslots.length - 1))
                            : '';
                    case 'time':
                        return capitalize(this.computeTime(this._schedule.timeslots[this._schedule.next_entries[0]]));
                    case 'days':
                        return capitalize(this.computeDays(this._schedule.weekdays));
                    case 'entity':
                        return entityName.length ? capitalize(PrettyPrintName(entityName)) : '';
                    case 'action':
                        return capitalize(computeActionDisplay(actionConfig));
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
                    if (parts.length == 1)
                        return unsafeHTML(input);
                    return html `
          ${parts[0] ? unsafeHTML(parts[0]) : ''}
          <my-relative-time
            .hass=${this._hass}
            .datetime=${new Date(this._schedule.timestamps[this._schedule.next_entries[0]])}
          >
          </my-relative-time>
          ${parts[1] ? unsafeHTML(parts[1]) : ''}
        `;
                };
                return typeof displayItem == 'string'
                    ? replaceRelativeTime(computeDisplayItem(displayItem))
                    : displayItem.map(e => {
                        const string = computeDisplayItem(e);
                        return string
                            ? html `
                  ${replaceRelativeTime(string)}<br />
                `
                            : '';
                    });
            };
            return html `
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
        ?checked=${['on', 'triggered'].includes(((_a = this.hass.states[this._schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '')}
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
                    return localize('ui.components.date.day_types_long.daily', this._hass.language);
                case EDayType.Workday:
                    return localize('ui.components.date.day_types_long.workdays', this._hass.language);
                case EDayType.Weekend:
                    return localize('ui.components.date.day_types_long.weekend', this._hass.language);
                case EDayType.Custom:
                    const list = weekdayToList(weekdays);
                    const seq = findSequence(list);
                    const len = Math.max(...seq);
                    if (list.length == 6) {
                        const missing = [1, 2, 3, 4, 5, 6, 7].filter(e => !list.includes(e));
                        return localize('ui.components.date.repeated_days_except', this._hass.language, '{excludedDays}', formatWeekday(missing.pop(), this._hass.language));
                    }
                    const dayNames = list.map(e => formatWeekday(e, this._hass.language));
                    if (list.length >= 3 && len >= 3) {
                        const start = seq.reduce((obj, e, i) => (e == len ? i : obj), 0);
                        dayNames.splice(start, len, localize('ui.components.date.days_range', this._hass.language, ['{startDay}', '{endDay}'], [dayNames[start], dayNames[start + len - 1]]));
                    }
                    const daysString = dayNames.length > 1
                        ? `${dayNames.slice(0, -1).join(', ')} ${this._hass.localize('ui.common.and')} ${dayNames.pop()}`
                        : `${dayNames.pop()}`;
                    return localize('ui.components.date.repeated_days', this._hass.language, '{days}', daysString);
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
                        return localize('ui.components.time.at_sun_event', this.hass.language, '{sunEvent}', eventString);
                    const signString = res.sign == '-'
                        ? this._hass
                            .localize('ui.panel.config.automation.editor.conditions.type.sun.before')
                            .slice(0, -1)
                            .toLowerCase()
                        : this._hass
                            .localize('ui.panel.config.automation.editor.conditions.type.sun.after')
                            .slice(0, -1)
                            .toLowerCase();
                    const timeStr = formatTime(stringToDate(res.offset), this.hass.language, { hour12: false });
                    return `${timeStr} ${signString} ${eventString}`;
                }
                else {
                    const time = stringToDate(timeString);
                    return localize('ui.components.time.absolute', this._hass.language, '{time}', formatTime(time, this._hass.language));
                }
            }
            else {
                const start = formatTime(stringToDate(entry.start), this._hass.language);
                const end = formatTime(stringToDate(entry.stop), this._hass.language);
                return localize('ui.components.time.interval', this._hass.language, ['{startTime}', '{endTime}'], [start, end]);
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
    ScheduleEntityRow.styles = css `
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
  `;
    __decorate([
        property()
    ], ScheduleEntityRow.prototype, "config", void 0);
    __decorate([
        property()
    ], ScheduleEntityRow.prototype, "_schedule", void 0);
    __decorate([
        property()
    ], ScheduleEntityRow.prototype, "_hass", void 0);
    ScheduleEntityRow = __decorate([
        customElement('scheduler-entity-row')
    ], ScheduleEntityRow);

    const fetchSchedules = (hass) => hass.callWS({
        type: 'scheduler',
    });
    const fetchScheduleItem = (hass, schedule_id) => hass.callWS({
        type: 'scheduler/item',
        schedule_id: schedule_id,
    });
    const saveSchedule = (hass, config) => {
        //console.log('config1: ' + String(config.timeslots[0].date)); //MB
        //console.log('resp1: ' + String(hass.callApi('POST', 'scheduler/add', config)));
        return hass.callApi('POST', 'scheduler/add', config);
    };
    const editSchedule = (hass, config) => {
        //console.log('config20: ' + String(config.timeslots[0].date)); //MB
        return hass.callApi('POST', 'scheduler/edit', config);
    };
    const deleteSchedule = (hass, schedule_id) => {
        return hass.callApi('POST', 'scheduler/remove', { schedule_id: schedule_id });
    };
    function showErrorDialog(target, error) {
        q(target, 'show-dialog', {
            dialogTag: 'dialog-error',
            dialogImport: () => Promise.resolve().then(function () { return dialogError; }),
            dialogParams: { error: error },
        });
    }
    function handleError(err, el) {
        const errorMessage = html `
    <b>Something went wrong!</b><br />
    ${err.body.message}<br /><br />
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/scheduler-card/issues">report</a> the bug.
  `;
        showErrorDialog(el, errorMessage);
    }
    //# sourceMappingURL=websockets.js.map

    let SchedulerEntitiesCard = class SchedulerEntitiesCard extends SubscribeMixin(LitElement) {
        constructor() {
            super(...arguments);
            this.showDiscovered = false;
            this.connectionError = false;
        }
        set hass(hass) {
            this._hass = hass;
        }
        get hass() {
            return this._hass;
        }
        hassSubscribe() {
            this.loadSchedules();
            return this.hass.user.is_admin
                ? [this._hass.connection.subscribeEvents(() => this.loadSchedules(), 'scheduler_updated')]
                : [];
        }
        async loadSchedules() {
            fetchSchedules(this._hass)
                .then(res => {
                let schedules = res;
                if (this.config.discover_existing !== undefined && !this.config.discover_existing) {
                    schedules = schedules.filter(item => item.timeslots.every(slot => slot.actions.every(action => entityFilter(action.entity_id, this.config))));
                }
                schedules.sort((a, b) => {
                    const remainingA = new Date(a.timestamps[a.next_entries[0]]).valueOf();
                    const remainingB = new Date(b.timestamps[b.next_entries[0]]).valueOf();
                    if (remainingA !== null && remainingB !== null) {
                        if (remainingA > remainingB)
                            return 1;
                        else if (remainingA < remainingB)
                            return -1;
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
                this.schedules = schedules;
            })
                .catch(_e => {
                this.schedules = [];
                this.connectionError = true;
            });
        }
        shouldUpdate(changedProps) {
            const oldHass = changedProps.get('_hass');
            if (oldHass && changedProps.size == 1 && this.schedules)
                return this.schedules.some(e => JSON.stringify(oldHass.states[e.entity_id]) !== JSON.stringify(this._hass.states[e.entity_id]));
            else
                return true;
        }
        render() {
            if (!this._hass || !this.config || !this.schedules)
                return html ``;
            return html `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
            ? typeof this.config.title == 'string'
                ? this.config.title
                : ''
            : localize('ui.panel.common.title', this._hass.language)}
          </div>
          ${this.schedules.length && this.config.show_header_toggle
            ? html `
                <ha-switch
                  ?checked=${this.schedules.some(el => { var _a; return ['on', 'triggered'].includes(((_a = this.hass.states[el.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || ''); })}
                  @change=${this.toggleDisableAll}
                >
                </ha-switch>
              `
            : ''}
        </div>
        <div class="card-content">
          ${this.getRows()}
        </div>
        ${this._hass.user.is_admin
            ? html `
              <div class="card-actions">
                <mwc-button @click=${this.newItemClick} ?disabled=${this.connectionError}
                  >${this._hass.localize('ui.components.area-picker.add_dialog.add')}
                </mwc-button>
              </div>
            `
            : ''}
      </ha-card>
    `;
        }
        getRows() {
            if (!this.config || !this._hass || !this.schedules)
                return html ``;
            if (this.connectionError) {
                return html `
        <div>
          <hui-warning>
            ${localize('ui.panel.overview.backend_error', this._hass.language)}
          </hui-warning>
        </div>
      `;
            }
            else if (!Object.keys(this.schedules).length) {
                return html `
        <div>
          ${localize('ui.panel.overview.no_entries', this._hass.language)}
        </div>
      `;
            }
            const includedSchedules = [];
            const excludedEntities = [];
            this.schedules.forEach(schedule => {
                const included = schedule.timeslots.every(timeslot => timeslot.actions.every(action => entityFilter(action.entity_id, this.config)));
                if (included)
                    includedSchedules.push(schedule);
                else
                    excludedEntities.push(schedule);
            });
            return html `
      ${includedSchedules.map(schedule => {
            var _a;
            const state = ((_a = this.hass.states[schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '';
            return html `
          <scheduler-entity-row
            class="${['on', 'triggered'].includes(state) ? '' : 'disabled'} ${this._hass.user.is_admin
                ? ''
                : 'readonly'}"
            .hass=${this._hass}
            .schedule=${schedule}
            .config=${this.config}
            @click=${() => this.editItemClick(schedule.schedule_id)}
          >
          </scheduler-entity-row>
        `;
        })}
      ${Object.keys(excludedEntities).length
            ? !this.showDiscovered
                ? html `
              <div>
                <button
                  class="show-more"
                  @click=${() => {
                    this.showDiscovered = true;
                }}
                >
                  +
                  ${localize('ui.panel.overview.excluded_items', this._hass.language, '{number}', excludedEntities.length)}
                </button>
              </div>
            `
                : html `
              ${excludedEntities.map(schedule => {
                    var _a;
                    const state = ((_a = this.hass.states[schedule.entity_id]) === null || _a === void 0 ? void 0 : _a.state) || '';
                    return html `
                  <scheduler-entity-row
                    class="${['on', 'triggered'].includes(state) ? '' : 'disabled'} ${this._hass.user.is_admin
                        ? ''
                        : 'readonly'}"
                    .hass=${this._hass}
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
                  ${capitalize(localize('ui.panel.overview.hide_excluded', this._hass.language))}
                </button>
              </div>
            `
            : ''}
    `;
        }
        toggleDisableAll(ev) {
            if (!this._hass || !this.schedules)
                return;
            const checked = ev.target.checked;
            this.schedules.forEach(el => {
                this._hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: el.entity_id });
            });
        }
        editItemClick(entity_id) {
            if (!this._hass.user.is_admin)
                return;
            const myEvent = new CustomEvent('editClick', { detail: entity_id });
            this.dispatchEvent(myEvent);
        }
        newItemClick() {
            const myEvent = new CustomEvent('newClick');
            this.dispatchEvent(myEvent);
        }
    };
    SchedulerEntitiesCard.styles = css `
    ${commonStyle}
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
  `;
    __decorate([
        property()
    ], SchedulerEntitiesCard.prototype, "config", void 0);
    __decorate([
        property()
    ], SchedulerEntitiesCard.prototype, "showDiscovered", void 0);
    __decorate([
        property()
    ], SchedulerEntitiesCard.prototype, "schedules", void 0);
    __decorate([
        property()
    ], SchedulerEntitiesCard.prototype, "_hass", void 0);
    SchedulerEntitiesCard = __decorate([
        customElement('scheduler-entities-card')
    ], SchedulerEntitiesCard);

    function entityGroups(entities, config, hass) {
        const groups = [];
        //create groups from user config
        if (config.groups) {
            config.groups.forEach(el => {
                const group = {
                    id: el.name,
                    name: el.name,
                    icon: el.icon || DefaultGroupIcon,
                    entities: entities.filter(e => applyFilters(e, el)),
                };
                groups.push(group);
            });
        }
        const ungroupedEntities = entities.filter(e => !groups.some(g => g.entities.includes(e)));
        const domains = ungroupedEntities.map(f).filter((v, k, arr) => arr.indexOf(v) === k);
        //automatically create groups for ungrouped entities
        domains.forEach(domain => {
            const group = {
                id: domain,
                name: localize(`domains.${domain}`, hass.language) || domain,
                icon: (config.standard_configuration === undefined || config.standard_configuration) && domain in domainIcons
                    ? domainIcons[domain]
                    : DefaultGroupIcon,
                entities: ungroupedEntities.filter(e => applyFilters(e, { include: [domain] })),
            };
            groups.push(group);
        });
        return groups;
    }

    let VariableSlider = class VariableSlider extends LitElement {
        constructor() {
            super(...arguments);
            this.items = [];
        }
        render() {
            if (!this.items.length) {
                return html `
        <div class="text-field">
          <slot></slot>
        </div>
      `;
            }
            return this.items.map(e => this.createButton(e));
        }
        createButton(item) {
            const selection = Array.isArray(this.value) ? this.value : [this.value];
            if (typeof item != 'object')
                item = { name: String(item) };
            const value = item.id !== undefined ? item.id : item.name;
            return html `
      <mwc-button class="${selection.includes(value) ? 'active' : ''}" @click="${() => this.selectItem(value)}">
        ${item.icon
            ? html `
              <ha-icon icon="${PrettyPrintIcon(item.icon)}" class="padded-right"></ha-icon>
            `
            : ''}
        ${PrettyPrintName(item.name)}
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
            const myEvent = new CustomEvent('change');
            this.dispatchEvent(myEvent);
        }
    };
    VariableSlider.styles = commonStyle;
    __decorate([
        property({ type: Array })
    ], VariableSlider.prototype, "items", void 0);
    __decorate([
        property()
    ], VariableSlider.prototype, "value", void 0);
    __decorate([
        property({ type: Number })
    ], VariableSlider.prototype, "min", void 0);
    __decorate([
        property({ type: Boolean })
    ], VariableSlider.prototype, "optional", void 0);
    __decorate([
        property({ type: Boolean })
    ], VariableSlider.prototype, "multiple", void 0);
    VariableSlider = __decorate([
        customElement('button-group')
    ], VariableSlider);
    //# sourceMappingURL=button-group.js.map

    let SchedulerEditorCard = class SchedulerEditorCard extends LitElement {
        constructor() {
            super(...arguments);
            this.selectedEntities = [];
            this.multipleEntity = false;
            this.scheduleEntities = [];
        }
        async firstUpdated() {
            if (this.entities && this.entities.length) {
                const group = this.getGroups().find(group => group.entities.find(e => e == this.entities[0].id));
                if (!group)
                    return;
                this.selectedGroup = group.id;
                this.selectedEntities = [...this.entities.map(e => e.id)];
                this.multipleEntity = this.selectedEntities.length > 1;
            }
            if (this.schedule) {
                if (this.schedule.timeslots.every(e => e.stop))
                    this.selectedAction = CreateTimeScheme;
                else {
                    const actions = unique(flatten(this.schedule.timeslots.map(e => e.actions.map(e => uniqueId(e)))));
                    if (actions.length == 1)
                        this.selectedAction = actions[0];
                }
            }
            this.scheduleEntities = (await fetchSchedules(this.hass)).map(e => e.entity_id);
        }
        getGroups() {
            if (!this.hass || !this.config)
                return [];
            const entities = Object.keys(this.hass.states)
                .filter(e => entityFilter(e, this.config))
                .filter(e => f(e) != 'switch' || !this.scheduleEntities.includes(e))
                .filter(e => computeEntityActions(e, this.hass, this.config).length);
            const groups = entityGroups(entities, this.config, this.hass);
            groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
            return groups;
        }
        getEntitiesForGroup(groupConfig) {
            if (!this.selectedGroup || !this.hass || !this.config)
                return [];
            const entities = groupConfig
                .find(e => e.id == this.selectedGroup)
                .entities.map(e => parseEntity(e, this.hass, this.config));
            entities.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
            return entities;
        }
        getActionsForEntity(_entityConfig) {
            if (!this.hass || !this.config || !this.selectedEntities.length)
                return [];
            const actions = computeEntityActions(this.selectedEntities, this.hass, this.config).map(e => Object.assign(e, { name: computeActionDisplay(e) }));
            actions.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
            return actions;
        }
        render() {
            if (!this.hass || !this.config)
                return html ``;
            const groups = this.getGroups();
            if (groups.length == 1 && this.selectedGroup !== groups[0].id)
                this.selectGroup(groups[0].id);
            const entities = this.getEntitiesForGroup(groups);
            if (entities.length == 1 && this.selectedEntities[0] !== entities[0].id)
                this.selectEntity(entities[0].id);
            const actions = this.getActionsForEntity(entities);
            //if (actions.length == 1 && this.selectedAction !== actions[0].id) this.selectAction(actions[0].id);
            return html `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
            ? typeof this.config.title == 'string'
                ? this.config.title
                : ''
            : localize('ui.panel.common.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>
          <button-group .items=${groups} value=${this.selectedGroup} @change=${this.selectGroup}>
            ${localize('ui.panel.entity_picker.no_groups_defined', this.hass.language)}
          </button-group>

          <div class="header">
            ${this.hass.localize('ui.components.entity.entity-picker.entity')}
            ${entities.length > 1
            ? html `
                  <div class="switch">
                    <ha-switch
                      ?checked=${this.multipleEntity}
                      @change=${(ev) => {
                this.multipleEntity = ev.target.checked;
            }}
                    >
                    </ha-switch>
                    ${localize('ui.panel.entity_picker.multiple', this.hass.language)}
                  </div>
                `
            : ''}
          </div>
          <button-group
            .items=${entities}
            .value=${this.selectedEntities}
            @change=${this.selectEntity}
            ?multiple=${this.multipleEntity}
            ?optional=${true}
          >
            ${!this.selectedGroup
            ? localize('ui.panel.entity_picker.no_group_selected', this.hass.language)
            : localize('ui.panel.entity_picker.no_entities_for_group', this.hass.language)}
          </button-group>

          <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
          <button-group .items=${actions} value=${this.selectedAction} @change=${this.selectAction}>
            ${!this.selectedEntities.length
            ? localize('ui.panel.entity_picker.no_entity_selected', this.hass.language)
            : localize('ui.panel.entity_picker.no_actions_for_entity', this.hass.language)}
          </button-group>
          ${this.makeSchemeButton(actions)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${this.nextClick} ?disabled=${!this.selectedAction}
            >${this.hass.localize('ui.common.next')}</mwc-button
          >
        </div>
      </ha-card>
    `;
        }
        makeSchemeButton(actionConfig) {
            if (!actionConfig.length || !this.hass)
                return html ``;
            return html `
      <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.or.label')}</div>
      <div class="option-list">
        <mwc-button
          class="${this.selectedAction == CreateTimeScheme ? ' active' : ''}"
          @click=${() => {
            this.selectedAction = CreateTimeScheme;
        }}>
          <ha-icon icon="${PrettyPrintIcon('chart-timeline')}" class="padded-right"></ha-icon>
          ${localize('ui.panel.entity_picker.make_scheme', this.hass.language)}
        </mwc-button>
      </div>
    </div>
    `;
        }
        selectGroup(ev) {
            const value = typeof ev == 'string' ? ev : ev.target.value;
            this.selectedGroup = value;
            this.selectedEntities = [];
            this.selectedAction = undefined;
        }
        selectEntity(ev) {
            const value = typeof ev == 'string' ? Array(ev) : ev.target.value;
            this.selectedEntities = value;
            this.selectedAction = undefined;
        }
        selectAction(ev) {
            const value = typeof ev == 'string' ? ev : ev.target.value;
            this.selectedAction = value;
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
                },
            });
            this.dispatchEvent(myEvent);
        }
    };
    SchedulerEditorCard.styles = commonStyle;
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "hass", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "config", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "selectedGroup", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "selectedEntities", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "selectedAction", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "entities", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "schedule", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "multipleEntity", void 0);
    __decorate([
        property()
    ], SchedulerEditorCard.prototype, "scheduleEntities", void 0);
    SchedulerEditorCard = __decorate([
        customElement('scheduler-editor-card')
    ], SchedulerEditorCard);

    let TimePicker = class TimePicker extends LitElement {
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
                maxHours: this.relativeMode ? this.maxOffset : undefined,
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
                : formatTime(stringToDate(timeToString(this.time)), this.hass.language);
            const timeParts = timeString.split(/:|\ /);
            return html `
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
            ? html `
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
                ? html `
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
                return html ``;
            if (!this.hass.states['sun.sun'])
                return html ``;
            return html `
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
    TimePicker.styles = css `
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
        property()
    ], TimePicker.prototype, "hass", void 0);
    __decorate([
        property({ type: Number })
    ], TimePicker.prototype, "stepSize", void 0);
    __decorate([
        property()
    ], TimePicker.prototype, "relativeMode", void 0);
    __decorate([
        property()
    ], TimePicker.prototype, "event", void 0);
    __decorate([
        property()
    ], TimePicker.prototype, "_time", void 0);
    TimePicker = __decorate([
        customElement('time-picker')
    ], TimePicker);

    const secondsPerDay = 86400;
    function Duration(el) {
        const start = stringToTime(el.start);
        let stop = stringToTime(el.stop);
        if (stop < start)
            stop += secondsPerDay;
        return stop - start;
    }
    let TimeslotEditor = class TimeslotEditor extends LitElement {
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
            this.formatAmPm = formatAmPm(this.hass.language);
        }
        render() {
            if (!this.hass)
                return html ``;
            return html `
      <div class="slider-container">
        <div>
          <div class="slider-track">
            ${this.getSlots()}
          </div>
        </div>
        <div class="slider-legend">
          ${this.formatAmPm
            ? html `
                <div class="slider-legend-item wide empty"></div>
                <div class="slider-legend-item wide">04:00 AM</div>
                <div class="slider-legend-item wide">08:00 AM</div>
                <div class="slider-legend-item wide">12:00 PM</div>
                <div class="slider-legend-item wide">04:00 PM</div>
                <div class="slider-legend-item wide">08:00 PM</div>
                <div class="slider-legend-item wide empty"></div>
              `
            : html `
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
                output.push(html `
        <div
          class="slider-slot${this._activeEntry == i ? ' active' : ''}${el.actions ? ' filled' : ''}"
          @click=${(ev) => {
                this._handleSegmentClick(ev, i);
            }}
          style="width: ${(Duration(el) / secondsPerDay) * 100}%"
        >
          <span class="content">${this.getEntryAction(el)}</div>
        </div>
      `);
                if (i < this.entries.length - 1) {
                    const ts = stringToTime(this.entries[i].stop);
                    output.push(html `
          <div
            class="slider-thumb${this._activeThumb == i ? ' active' : ''} ${this._activeEntry == i ||
                    this._activeEntry == i + 1
                    ? ''
                    : 'hidden'}"
          >
            <div
              class="slider-thumb-ripple"
              index="${i}"
              @mousedown=${this._handleTouchStart}
              @touchstart=${this._handleTouchStart}
            >
              <ha-icon icon="hass:unfold-more-vertical"> </ha-icon>
            </div>
            <div
              class="slider-thumb-tooltip ${this.formatAmPm ? 'wide' : ''} ${this._activeEntryMem == i &&
                    this._activeEntryMem != 0
                    ? 'right'
                    : this._activeEntryMem == i + 1 && this._activeEntryMem + 1 != this.entries.length
                        ? 'left'
                        : 'center'}"
              value="time"
              @update="${this._updateMarker}"
            >
              ${formatTime(stringToDate(this.entries[i].stop), this.hass.language)}
            </div>
          </div>
        `);
                }
            });
            return output;
        }
        updated() {
            this.shadowRoot.querySelectorAll('.slider-thumb-tooltip').forEach((el, i) => {
                el.innerText = formatTime(stringToDate(this.entries[i].stop), this.hass.language);
            });
        }
        getEntryAction(entry) {
            if (!this.hass)
                return;
            if (!entry.actions)
                return '';
            return unique(entry.actions.map(action => {
                const actionConfig = this.actions.find(e => equalAction(e, action));
                if (actionConfig.variable && actionConfig.variable.field in action.service_data) {
                    const value = action.service_data[actionConfig.variable.field];
                    if (actionConfig.variable.type == EVariableType.Level) {
                        const variableConfig = actionConfig.variable;
                        if (!isNaN(value))
                            return computeLevelVariableDisplay(Number(value), variableConfig);
                    }
                    else if (actionConfig.variable.type == EVariableType.List) {
                        const config = actionConfig.variable;
                        const listItem = config.options.find(e => e.value == value);
                        return PrettyPrintName(listItem && listItem.name ? listItem.name : String(value));
                    }
                }
                return PrettyPrintName(actionConfig.name || localize(`services.${action.service}`, this.hass.language) || action.service);
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
            const thumb_index = Number(thumbHandle.getAttribute('index'));
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
            const x1 = ((t1 + this.stepSize * 60) / secondsPerDay) * trackWidth;
            const x2 = ((t2 - this.stepSize * 60) / secondsPerDay) * trackWidth;
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
                        [slotIndex + 1]: Object.assign(Object.assign({}, this.entries[slotIndex + 1]), { start: timeToString(newStop), stop: timeToString(startTime + totalDuration) }),
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
            target.innerText = formatTime(ts, this.hass.language);
        }
        _addSlot() {
            const activeSlot = this.entries[this._activeEntry];
            const startTime = stringToTime(activeSlot.start);
            const endTime = stringToTime(activeSlot.stop);
            const newStop = roundTime(startTime + Duration(activeSlot) / 2, this.stepSize);
            const entries = [
                ...this.entries.slice(0, this._activeEntry),
                Object.assign(Object.assign({}, this.entries[this._activeEntry]), { stop: timeToString(newStop) }),
                {
                    start: timeToString(newStop),
                    stop: timeToString(endTime),
                    actions: [],
                },
                ...this.entries.slice(this._activeEntry + 1),
            ];
            const myEvent = new CustomEvent('update', { detail: { entries: entries } });
            this.dispatchEvent(myEvent);
        }
        _removeSlot() {
            const cutIndex = this._activeEntry == this.entries.length - 1 ? this._activeEntry - 1 : this._activeEntry;
            const entries = [
                ...this.entries.slice(0, cutIndex),
                Object.assign(Object.assign({}, this.entries[cutIndex + 1]), { start: this.entries[cutIndex].start, stop: this.entries[cutIndex + 1].stop }),
                ...this.entries.slice(cutIndex + 2),
            ];
            if (this._activeEntry == this.entries.length)
                this._activeEntry--;
            const myEvent = new CustomEvent('update', { detail: { entries: entries } });
            this.dispatchEvent(myEvent);
        }
    };
    TimeslotEditor.styles = css `
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
      background: rgba(var(--rgb-primary-text-color), 0.1);
    }
    div.slider-thumb .slider-thumb-ripple:before {
      content: ' ';
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgba(var(--rgb-primary-text-color), 0.2);
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
    div.slider-thumb.hidden div.slider-thumb-tooltip {
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
        property()
    ], TimeslotEditor.prototype, "hass", void 0);
    __decorate([
        property({ type: Array })
    ], TimeslotEditor.prototype, "entries", void 0);
    __decorate([
        property({ type: Array })
    ], TimeslotEditor.prototype, "actions", void 0);
    __decorate([
        property({ type: Number })
    ], TimeslotEditor.prototype, "stepSize", void 0);
    __decorate([
        property({ type: Number })
    ], TimeslotEditor.prototype, "_activeEntry", void 0);
    __decorate([
        property({ type: Number })
    ], TimeslotEditor.prototype, "_activeThumb", void 0);
    __decorate([
        property({ type: Boolean })
    ], TimeslotEditor.prototype, "formatAmPm", void 0);
    __decorate([
        eventOptions({ passive: true })
    ], TimeslotEditor.prototype, "_handleTouchStart", null);
    TimeslotEditor = __decorate([
        customElement('timeslot-editor')
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

    let VariableSlider$1 = class VariableSlider extends LitElement {
        constructor() {
            super(...arguments);
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.value = 0;
            this.unit = '';
            this.optional = false;
            this.disabled = false;
            this.scaleGain = 1;
            this.scaleOffset = 0;
        }
        firstUpdated() {
            (async () => await loadHaForm())();
            if (this.unit == UnitPercent) {
                this.scaleOffset = this.min;
                this.scaleGain = (this.max - this.min) / 100;
                this.min = 0;
                this.max = 100;
            }
            if (this.disabled && !this.optional)
                this.disabled = false;
            if (isNaN(this.value))
                this.value = this.min;
            this.requestUpdate();
        }
        render() {
            return html `
      <div class="checkbox-container">
        <div class="checkbox">
          ${this.getCheckbox()}
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}">
          ${this.getScaledValue()}${this.unit}
        </div>
      </div>
    `;
        }
        getScaledValue() {
            const value = this.value;
            let scaledValue = (value - this.scaleOffset) / this.scaleGain;
            scaledValue = Math.round(scaledValue / this.step) * this.step;
            scaledValue = parseFloat(scaledValue.toPrecision(12));
            if (scaledValue < this.min)
                scaledValue = this.min;
            else if (scaledValue > this.max)
                scaledValue = this.max;
            return scaledValue;
        }
        getSlider() {
            if (!this.disabled) {
                return html `
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
          @change=${this.updateValue}
        ></ha-slider>
      `;
            }
            else {
                return html `
        <ha-slider
          pin
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.getScaledValue()}
          disabled
        ></ha-slider>
      `;
            }
        }
        getCheckbox() {
            if (!this.optional)
                return html ``;
            return html `
      <ha-checkbox @change="${this.toggleChecked}" ?checked=${!this.disabled}> </ha-checkbox>
    `;
        }
        toggleChecked(e) {
            const checked = e.target.checked;
            this.disabled = !checked;
            const myEvent = new CustomEvent('change');
            this.dispatchEvent(myEvent);
        }
        updateValue(e) {
            const value = Number(e.target.value);
            let unscaledValue = value * this.scaleGain + this.scaleOffset;
            unscaledValue = Math.round(unscaledValue / this.step) * this.step;
            unscaledValue = parseFloat(unscaledValue.toPrecision(12));
            this.value = unscaledValue;
        }
    };
    VariableSlider$1.styles = css `
    ${commonStyle} :host {
      width: 100%;
    }
    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }
  `;
    __decorate([
        property({ type: Number })
    ], VariableSlider$1.prototype, "min", void 0);
    __decorate([
        property({ type: Number })
    ], VariableSlider$1.prototype, "max", void 0);
    __decorate([
        property({ type: Number })
    ], VariableSlider$1.prototype, "step", void 0);
    __decorate([
        property({ type: Number })
    ], VariableSlider$1.prototype, "value", void 0);
    __decorate([
        property({ type: String })
    ], VariableSlider$1.prototype, "unit", void 0);
    __decorate([
        property({ type: Boolean })
    ], VariableSlider$1.prototype, "optional", void 0);
    __decorate([
        property({ type: Boolean })
    ], VariableSlider$1.prototype, "disabled", void 0);
    VariableSlider$1 = __decorate([
        customElement('variable-slider')
    ], VariableSlider$1);

    let DialogDeleteConfirm = class DialogDeleteConfirm extends LitElement {
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
                return html ``;
            return html `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
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
            return css `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        property({ attribute: false })
    ], DialogDeleteConfirm.prototype, "hass", void 0);
    __decorate([
        internalProperty()
    ], DialogDeleteConfirm.prototype, "_params", void 0);
    DialogDeleteConfirm = __decorate([
        customElement('dialog-delete-confirm')
    ], DialogDeleteConfirm);
    //# sourceMappingURL=dialog-delete-confirm.js.map

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

    //const VaadinDatePicker = customElements.get('vaadin-date-picker');
    let SchedulerTimepickerCard = class SchedulerTimepickerCard extends LitElement {
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
            const actions = this.actions.map(e => Object.assign(e, { name: computeActionDisplay(e) }));
            actions.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
            this.actions = actions;
        }
        render() {
            if (!this.hass || !this.config || !this.entities || !this.actions)
                return html ``;
            return html `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
            ? typeof this.config.title == 'string'
                ? this.config.title
                : ''
            : localize('ui.panel.common.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
          ${this.renderSummary()}
          ${!this.timeslots
            ? html `
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
            : html `
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

                <div class="header">${this.hass.localize('ui.panel.config.automation.editor.actions.name')}</div>
                <button-group
                  .items=${this.activeEntry !== null ? this.actions : []}
                  value=${this.activeEntry !== null
                ? this.schedule.timeslots[this.activeEntry].actions.map(a => { var _a; return (_a = this.actions.find(e => equalAction(e, a))) === null || _a === void 0 ? void 0 : _a.id; })
                : ''}
                  optional="true"
                  @change=${this.selectAction}
                >
                  ${localize('ui.panel.time_picker.no_timeslot_selected', this.hass.language)}
                </button-group>

                ${this.getVariableEditor()}
              `}
        </div>
        <div class="card-actions">
          <mwc-button
            @click="${this.saveClick}"
            ?disabled=${weekdayType(this.schedule.weekdays) == EDayType.Once && this.schedule.sdate == ''}
          >
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
          ${this.editItem
            ? html `
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
                return html ``;
            return html `
      <div class="summary">
        <div class="summary-entity" @click=${this.editActionClick}>
          ${this.entities.map(entity => html `
              <div>
                <ha-icon icon="${PrettyPrintIcon(entity.icon)}"> </ha-icon>
                ${capitalize(PrettyPrintName(entity.name || this.hass.states[entity.id].attributes.friendly_name || d(entity.id)))}
              </div>
            `)}
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"> </ha-icon>
        </div>
        <div class="summary-action" @click=${this.editActionClick}>
          ${this.timeslots
            ? html `
                <div>
                  <ha-icon icon="${PrettyPrintIcon('chart-timeline')}"> </ha-icon>
                  ${capitalize(localize('ui.panel.entity_picker.make_scheme', this.hass.language))}
                </div>
              `
            : html `
                <div>
                  <ha-icon icon="${PrettyPrintIcon(this.actions[0].icon || DefaultActionIcon)}"> </ha-icon>
                  ${capitalize(this.actions[0].name || d(this.actions[0].service))}
                </div>
              `}
        </div>
      </div>
    `;
        }
        renderDays() {
            if (!this.hass)
                return html ``;
            let weekdays = Array.from(Array(7).keys());
            const firstWeekday = startOfWeek(this.hass.language);
            const shiftCount = weekdays.length - weekdayArray.findIndex(e => e.substr(0, 3) == firstWeekday);
            const todayDate = new Date().toISOString().slice(0, 10);
            weekdays = [...weekdays.slice(-shiftCount), ...weekdays.slice(0, -shiftCount)];
            const DayOptions = weekdays.map(e => Object({ id: weekdayArray[e].substr(0, 3), name: formatWeekday(e, this.hass.language, true) }));
            const DayTypeOptions = [
                { id: EDayType.Once, name: 'Unique' },
                { id: EDayType.Daily, name: localize('ui.components.date.day_types_short.daily', this.hass.language) },
                { id: EDayType.Workday, name: localize('ui.components.date.day_types_short.workdays', this.hass.language) },
                { id: EDayType.Weekend, name: localize('ui.components.date.day_types_short.weekend', this.hass.language) },
                { id: EDayType.Custom, name: this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.label') },
            ];
            return html `
      <div class="header">${localize('ui.components.date.days', this.hass.language)}</div>
      <button-group .items=${DayTypeOptions} value=${weekdayType(this.schedule.weekdays)} @change=${this.selectDays}>
      </button-group>
      ${weekdayType(this.schedule.weekdays) == EDayType.Custom
            ? html `
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
      ${weekdayType(this.schedule.weekdays) == EDayType.Once
            ? html `
            <div id="date1">
              <ha-date-input .label=${'Date'} .value=${this.schedule.sdate} @change=${this.selectSdate}>
              </ha-date-input>
            </div>
          `
            : ''}
    `;
        }
        updateActiveEntry(data) {
            if (this.activeEntry === null) {
                return;
            }
            //console.log('active entry: ' + this.activeEntry);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: Object.assign([...this.schedule.timeslots], {
                    [this.activeEntry]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry]), data),
                }) });
        }
        updateActiveEntryAction(data, num) {
            if (this.activeEntry === null)
                return;
            if (data) {
                this.updateActiveEntry({
                    actions: Object.assign([...this.schedule.timeslots[this.activeEntry].actions], {
                        [num]: Object.assign(Object.assign({}, this.schedule.timeslots[this.activeEntry].actions[num]), data),
                    }),
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
            const value = ev.target.value;
            if (value) {
                const action = this.actions.find(e => e.id == value);
                this.entities.map(e => e.id).forEach((entity_id, num) => {
                    let service_data = action.service_data || {};
                    if (action.variable && action.variable.type == EVariableType.Level) {
                        const config = action.variable;
                        if (!(config.field in service_data) && !config.optional)
                            service_data = Object.assign(Object.assign({}, service_data), { [config.field]: config.min });
                    }
                    this.updateActiveEntryAction({
                        entity_id: entity_id,
                        service: action.service,
                        service_data: service_data,
                    }, num);
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
                return html ``;
            const actions = unique(this.schedule.timeslots[this.activeEntry].actions.map(a => this.actions.find(e => equalAction(e, a))));
            return actions.map(actionConfig => {
                if (!actionConfig || !actionConfig.variable)
                    return html ``;
                const action = this.schedule.timeslots[this.activeEntry].actions[0];
                if (actionConfig.variable.type == EVariableType.Level) {
                    const config = actionConfig.variable;
                    const value = Number(action.service_data[config.field]) || null;
                    return html `
          <div class="header">
            ${config.name || PrettyPrintName(config.field)}
          </div>
          <variable-slider
            min=${config.min}
            max=${config.max}
            step=${config.step}
            value=${value}
            unit=${config.unit}
            ?optional=${config.optional}
            ?disabled=${value === null}
            @change=${(ev) => {
                    this.entities.forEach((_, num) => {
                        this.updateActiveEntryAction({
                            service_data: {
                                ...action.service_data,
                                [config.field]: Number(ev.target.value),
                            },
                        }, num);
                    });
                }}
          >
          </variable-slider>
        `;
                }
                else {
                    const config = actionConfig.variable;
                    const options = config.options.map(e => Object(Object.assign(Object.assign({}, e), { id: e.value })));
                    const value = String(action.service_data[config.field]) || null;
                    return html `
          <div class="header">
            ${config.name || PrettyPrintName(config.field)}
          </div>
          <button-group
            .items=${options}
            value=${value}
            @change=${(ev) => {
                    this.entities.forEach((_, num) => {
                        this.updateActiveEntryAction({ service_data: { ...action.service_data, [config.field]: ev.target.value } }, num);
                    });
                }}
          >
            ${this.hass.localize('ui.dialogs.helper_settings.input_select.no_options')}
          </button-group>
        `;
                }
            });
        }
        selectSdate(ev) {
            const value = ev.target.value;
            //MB here
            console.log('changed sdate: ' + value);
            this.schedule = Object.assign(Object.assign({}, this.schedule), { sdate: value });
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
                    case EDayType.Once:
                        weekdays = ['once'];
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
            console.log('Save Button clicked');
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
                q(element, 'show-dialog', {
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
    SchedulerTimepickerCard.styles = css `
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
        property()
    ], SchedulerTimepickerCard.prototype, "hass", void 0);
    __decorate([
        property()
    ], SchedulerTimepickerCard.prototype, "config", void 0);
    __decorate([
        property()
    ], SchedulerTimepickerCard.prototype, "schedule", void 0);
    __decorate([
        property()
    ], SchedulerTimepickerCard.prototype, "actions", void 0);
    __decorate([
        property()
    ], SchedulerTimepickerCard.prototype, "entities", void 0);
    __decorate([
        property()
    ], SchedulerTimepickerCard.prototype, "activeEntry", void 0);
    __decorate([
        property({ type: Boolean })
    ], SchedulerTimepickerCard.prototype, "timeslots", void 0);
    __decorate([
        property({ type: Boolean })
    ], SchedulerTimepickerCard.prototype, "editItem", void 0);
    SchedulerTimepickerCard = __decorate([
        customElement('scheduler-timepicker-card')
    ], SchedulerTimepickerCard);

    const personStates = (hass, _stateObj) => [
        {
            value: 'home',
            name: hass.localize('state_badge.person.home', hass.language),
            icon: 'hass:home-outline',
        },
        {
            value: 'not_home',
            name: hass.localize('state_badge.person.not_home', hass.language),
            icon: 'hass:exit-run',
        },
    ];
    //# sourceMappingURL=person.js.map

    const deviceTrackerStates = (hass, _stateObj) => [
        {
            value: 'home',
            name: hass.localize('state_badge.device_tracker.home', hass.language),
            icon: 'hass:home-outline',
        },
        {
            value: 'not_home',
            name: hass.localize('state_badge.device_tracker.not_home', hass.language),
            icon: 'hass:exit-run',
        },
    ];
    //# sourceMappingURL=device_tracker.js.map

    function standardStates(entity_id, hass) {
        try {
            const domain = f(entity_id);
            const stateObj = hass.states[entity_id];
            if (!stateObj)
                return [];
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
                    const entities = stateObj && stateObj.attributes.entity_id && Array.isArray(stateObj.attributes.entity_id)
                        ? stateObj.attributes.entity_id
                        : [];
                    const configs = entities.map(e => standardStates(e, hass));
                    return groupStates(hass, stateObj, configs);
                case 'input_boolean':
                    return inputBooleanStates(hass, stateObj);
                case 'input_select':
                    return inputSelectStates(hass, stateObj);
                case 'switch':
                    return switchStates(hass, stateObj);
                case 'light':
                    return lightStates(hass, stateObj);
                case 'lock':
                    return lockStates(hass, stateObj);
                case 'person':
                    return personStates(hass, stateObj);
                default:
                    return [];
            }
        }
        catch (e) {
            console.error(`Scheduler-card failed to load states for '${entity_id}'. Check if this entity is configured correctly, or open an issue for this in GitHub.`);
            return [];
        }
    }

    let SchedulerOptionsCard = class SchedulerOptionsCard extends LitElement {
        constructor() {
            super(...arguments);
            this.addCondition = false;
            this.matchTypes = {};
        }
        firstUpdated() {
            this.matchTypes = {
                [EConditionMatchType.Above]: {
                    value: EConditionMatchType.Above,
                    name: this.hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.above'),
                    icon: 'hass:greater-than',
                },
                [EConditionMatchType.Below]: {
                    value: EConditionMatchType.Below,
                    name: this.hass.localize('ui.panel.config.automation.editor.triggers.type.numeric_state.below'),
                    icon: 'hass:less-than',
                },
                [EConditionMatchType.Equal]: {
                    value: EConditionMatchType.Equal,
                    name: localize('ui.panel.conditions.equal_to', this.hass.language),
                    icon: 'hass:equal',
                },
                [EConditionMatchType.Unequal]: {
                    value: EConditionMatchType.Unequal,
                    name: localize('ui.panel.conditions.unequal_to', this.hass.language),
                    icon: 'hass:not-equal-variant',
                },
            };
        }
        render() {
            if (!this.hass || !this.config || !this.schedule)
                return html ``;
            const repeatTypes = [
                {
                    name: this.hass.localize('ui.panel.config.automation.editor.actions.type.repeat.label'),
                    id: ERepeatType.Repeat,
                    icon: 'refresh',
                },
                {
                    name: this.hass.localize('ui.dialogs.more_info_control.vacuum.stop'),
                    id: ERepeatType.Pause,
                    icon: 'stop',
                },
                {
                    name: this.hass.localize('ui.common.delete'),
                    id: ERepeatType.Single,
                    icon: 'trash-can-outline',
                },
            ];
            return html `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.config.title !== undefined
            ? typeof this.config.title == 'string'
                ? this.config.title
                : ''
            : localize('ui.panel.common.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${!this.addCondition
            ? html `
                <div class="header">
                  ${this.hass.localize('ui.panel.config.automation.editor.actions.type.choose.conditions')}
                  ${!this.schedule.timeslots[0].conditions || this.schedule.timeslots[0].conditions.length < 2
                ? ''
                : html `
                        <div class="switch">
                          ${localize('ui.panel.conditions.any', this.hass.language)}
                          <ha-switch
                            style="margin: 0px 10px"
                            @change=${this.conditionTypeSwitchClick}
                            ?checked=${this.schedule.timeslots[0].condition_type == EConditionType.All}
                          ></ha-switch>
                          ${localize('ui.panel.conditions.all', this.hass.language)}
                        </div>
                      `}
                </div>
                ${this.renderConditions()}

                <div style="margin-top: 10px">
                  <mwc-button @click=${this.addConditionClick}>
                    <ha-icon icon="hass:plus-circle-outline" class="padded-right"></ha-icon>
                    ${this.hass.localize('ui.dialogs.helper_settings.input_select.add')}
                  </mwc-button>
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

                <div class="header">${localize('ui.panel.options.repeat_type', this.hass.language)}</div>
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
            ? html `
                <mwc-button @click=${this.saveClick}>${this.hass.localize('ui.common.save')}</mwc-button>
                <mwc-button @click=${this.backClick} style="float: right"
                  >${this.hass.localize('ui.common.back')}</mwc-button
                >
              `
            : html `
                <mwc-button
                  @click=${this.confirmConditionClick}
                  ?disabled=${!this.selectedEntity || !this.conditionMatchType || !this.conditionValue}
                  >${this.hass.localize('ui.common.save')}</mwc-button
                >
                ${this.editItem !== undefined
                ? html `
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
                return html ``;
            if (!this.selectedEntity) {
                const hassEntities = Object.keys(this.hass.states)
                    .filter(e => entityFilter(e, this.config))
                    .filter(e => { var _a; return ((_a = standardStates(e, this.hass)) === null || _a === void 0 ? void 0 : _a.length) || ['sensor', 'proximity', 'input_number'].includes(f(e)); });
                const groups = entityGroups(hassEntities, this.config, this.hass);
                groups.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
                let entities = [];
                if (this.selectedGroup) {
                    entities = groups
                        .find(e => e.id == this.selectedGroup)
                        .entities.map(e => parseEntity(e, this.hass, this.config));
                    entities.sort((a, b) => (a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 : 1));
                }
                return html `
        <div class="header">${this.hass.localize('ui.panel.config.users.editor.group')}</div>

        <button-group .items=${groups} value=${this.selectedGroup} @change=${this.selectGroup}>
          ${localize('ui.panel.entity_picker.no_groups_defined', this.hass.language)}
        </button-group>

        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <button-group .items=${entities} value=${this.selectedEntity} @change=${this.selectEntity}>
          ${!this.selectedGroup
                ? localize('ui.panel.entity_picker.no_group_selected', this.hass.language)
                : localize('ui.panel.entity_picker.no_entities_for_group', this.hass.language)}
        </button-group>
      `;
            }
            else {
                const entity = parseEntity(this.selectedEntity, this.hass, this.config);
                const stateObj = this.hass.states[this.selectedEntity];
                const states = standardStates(this.selectedEntity, this.hass);
                const matchTypes = (f(this.selectedEntity) == 'sensor' && !isNaN(Number(stateObj.state))) ||
                    ['proximity', 'input_number'].includes(f(this.selectedEntity))
                    ? Object.entries(pick(this.matchTypes, [EConditionMatchType.Above, EConditionMatchType.Below])).map(([k, v]) => Object.assign(v, { id: k }))
                    : Object.entries(pick(this.matchTypes, [EConditionMatchType.Equal, EConditionMatchType.Unequal])).map(([k, v]) => Object.assign(v, { id: k }));
                return html `
        <div class="header">${this.hass.localize('ui.components.entity.entity-picker.entity')}</div>
        <div style="display: flex; flex-direction: row; align-items: center">
          <mwc-button class="active" disabled style="--mdc-button-disabled-ink-color: var(--text-primary-color)">
            <ha-icon icon="${PrettyPrintIcon(entity.icon || DefaultEntityIcon)}"></ha-icon>
            ${PrettyPrintName(entity.name)}
          </mwc-button>
          <ha-icon-button
            icon="hass:pencil"
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
          .items=${matchTypes}
          value=${this.conditionMatchType}
          @change=${(ev) => (this.conditionMatchType = ev.target.value)}
        >
        </button-group>

        <div class="header">${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}</div>
        ${states && states.length
                ? html `
              <button-group
                .items=${states.map(e => Object.assign(e, { id: e.value }))}
                value=${this.conditionValue}
                @change=${(ev) => {
                    this.conditionValue = ev.target.value;
                }}
              >
              </button-group>
            `
                : html `
              <paper-input
                label="${this.hass.localize('ui.panel.config.automation.editor.conditions.type.state.label')}${stateObj
                    .attributes.unit_of_measurement
                    ? ` [${stateObj.attributes.unit_of_measurement}]`
                    : ''}"
                value=${this.conditionValue ? this.conditionValue : ''}
                @value-changed=${(ev) => {
                    const value = ev.target.value;
                    this.conditionValue = isNaN(Number(value)) ? value : Number(value);
                }}
              >
              </paper-input>
            `}
      `;
            }
        }
        selectGroup(ev) {
            this.selectedGroup = ev.target.value;
            this.selectedEntity = undefined;
        }
        selectEntity(e) {
            const value = e.target.value;
            this.selectedEntity = value;
            this.conditionMatchType = undefined;
            this.conditionValue = undefined;
        }
        renderConditions() {
            if (!this.hass || !this.schedule || !Object.keys(this.matchTypes).length)
                return html ``;
            const conditions = this.schedule.timeslots[0].conditions || [];
            if (!conditions.length)
                return html `
        <div class="text-field">${localize('ui.panel.conditions.no_conditions_defined', this.hass.language)}</div>
      `;
            return conditions.map((item, num) => {
                const entity = parseEntity(item.entity_id, this.hass, this.config);
                const states = standardStates(item.entity_id, this.hass);
                const stateObj = this.hass.states[item.entity_id];
                const state = states === null || states === void 0 ? void 0 : states.find(e => e.value == item.value);
                return html `
        <div class="summary">
          <ha-icon icon="${entity.icon || DefaultEntityIcon}"></ha-icon>
          <span>
            ${PrettyPrintName(entity.name)} ${this.matchTypes[item.match_type].name.toLowerCase()}
            ${state
                ? state.name.toLowerCase()
                : stateObj.attributes.unit_of_measurement
                    ? `${item.value}${stateObj.attributes.unit_of_measurement}`
                    : item.value}
          </span>
          <ha-icon-button
            icon="hass:pencil"
            @click="${() => {
                this.editConditionClick(num);
            }}}"
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
                !this.conditionValue)
                return;
            const condition = {
                entity_id: this.selectedEntity,
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
            var _a;
            if (!this.schedule || !this.schedule.timeslots[0].conditions || !this.hass || !this.config)
                return;
            const item = this.schedule.timeslots[0].conditions[index];
            if (!item)
                return;
            this.editItem = index;
            const hassEntities = Object.keys(this.hass.states)
                .filter(e => entityFilter(e, this.config))
                .filter(e => { var _a; return ((_a = standardStates(e, this.hass)) === null || _a === void 0 ? void 0 : _a.length) || ['sensor', 'proximity', 'input_number'].includes(f(e)); });
            const groups = entityGroups(hassEntities, this.config, this.hass);
            this.selectedGroup = (_a = groups.find(e => e.entities.includes(item.entity_id))) === null || _a === void 0 ? void 0 : _a.id;
            this.selectedEntity = item.entity_id;
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
        updateName(e) {
            const value = e.target.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { name: value });
        }
        updateRepeatType(e) {
            const value = e.target.value;
            this.schedule = Object.assign(Object.assign({}, this.schedule), { repeat_type: value });
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
    SchedulerOptionsCard.styles = css `
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
        property()
    ], SchedulerOptionsCard.prototype, "hass", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "config", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "schedule", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "selectedGroup", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "selectedEntity", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "conditionMatchType", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "conditionValue", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "editItem", void 0);
    __decorate([
        property()
    ], SchedulerOptionsCard.prototype, "addCondition", void 0);
    SchedulerOptionsCard = __decorate([
        customElement('scheduler-options-card')
    ], SchedulerOptionsCard);

    let SchedulerCardEditor = class SchedulerCardEditor extends LitElement {
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
            this.scheduleEntities = (await fetchSchedules(this.hass)).map(e => e.entity_id);
        }
        render() {
            if (!this.hass) {
                return html ``;
            }
            return html `
      <div class="card-config">
        <div class="header">Title of the card</div>
        <button-group
          .items=${['standard', 'hidden', 'custom']}
          value=${this.getTitleOption()}
          @change=${this.updateTitleOption}
        >
        </button-group>
        ${this.titleOption == 'custom'
            ? html `
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
          Disable if you want to use multiple scheduler-cards.
        </div>
        <button-group
          .items=${[
            { id: 'true', name: 'on' },
            { id: 'false', name: 'off' },
        ]}
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
          @change=${this.updateTimeStepOption}
        >
        </variable-slider>

        <div class="header">Included entities</div>
        <div class="text-field">
          Select the entities that you want to control using the scheduler. You can click on a group to open it.<br />
          Note that some entities (such as sensors) can only be used for conditions, not for actions.
        </div>
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
                return localize('ui.panel.common.title', this.hass.language);
            if (this._config.title === undefined)
                return localize('ui.panel.common.title', this.hass.language);
            if (typeof this._config.title == 'string')
                return this._config.title;
            if (this._config.title == false)
                return '';
            else
                return localize('ui.panel.common.title', this.hass.language);
        }
        updateTitleOption(e) {
            const type = e.target.value;
            if (!this._config || !this.hass)
                return;
            this.titleOption = type;
            const config = Object.assign({}, this._config);
            if (type == 'standard') {
                if ('title' in this._config) {
                    delete config.title;
                }
            }
            else if (type == 'hidden') {
                Object.assign(config, { title: false });
            }
            this._config = config;
            q(this, 'config-changed', { config: this._config });
        }
        updateTitle(e) {
            if (!this._config || !this.hass)
                return;
            const config = Object.assign({}, this._config);
            const value = String(e.target.value);
            Object.assign(config, { title: value });
            this._config = config;
            q(this, 'config-changed', { config: this._config });
        }
        getDiscoveryOption() {
            if (!this._config || !this.hass)
                return;
            const discover_existing = this._config.hasOwnProperty('discover_existing') ? this._config.discover_existing : true;
            return discover_existing;
        }
        updateDiscoveryOption(e) {
            const value = e.target.value == 'true';
            if (!this._config || !this.hass)
                return;
            const config = Object.assign({}, this._config);
            if (!value)
                Object.assign(config, { discover_existing: value });
            else if (config.hasOwnProperty('discover_existing'))
                delete config['discover_existing'];
            this._config = config;
            q(this, 'config-changed', { config: this._config });
        }
        getTimeStepOption() {
            if (!this._config || !this.hass)
                return;
            const time_step = this._config.hasOwnProperty('time_step') ? this._config.time_step : DefaultTimeStep;
            return Number(time_step);
        }
        updateTimeStepOption(e) {
            if (!this._config || !this.hass)
                return;
            const config = Object.assign({}, this._config);
            const value = Number(e.target.value);
            if (value == DefaultTimeStep && config.hasOwnProperty('time_step'))
                delete config['time_step'];
            else
                Object.assign(config, { time_step: value });
            this._config = config;
            q(this, 'config-changed', { config: this._config });
        }
        getDomainSwitches() {
            if (!this._config || !this.hass)
                return;
            const entityList = Object.keys(this.hass.states)
                .filter(e => f(e) != 'switch' || !this.scheduleEntities.includes(e))
                .map(e => parseEntity(e, this.hass, { include: ['*'] }))
                .filter(e => { var _a; return ((_a = standardStates(e.id, this.hass)) === null || _a === void 0 ? void 0 : _a.length) || computeEntityActions(e.id, this.hass, {}).length; });
            const domainList = entityList.map(e => f(e.id)).filter((v, k, arr) => arr.indexOf(v) === k);
            domainList.sort((a, b) => (a.trim().toLowerCase() < b.trim().toLowerCase() ? -1 : 1));
            const includedDomains = this._config.include ? [...this._config.include] : [];
            return domainList.map(domain => {
                const count = entityList.filter(e => f(e.id) == domain).length;
                if (!count)
                    return ``;
                return html `
        <div
          class="row"
          @click=${() => {
                this.toggleShowDomain(domain);
            }}
        >
          <ha-icon icon="${PrettyPrintIcon(domainIcons[domain])}"> </ha-icon>

          <div class="info">
            ${domain}
            <div class="secondary">
              ${count} ${count == 1 ? 'entity' : 'entities'}
            </div>
          </div>
          <ha-switch
            @click=${(ev) => {
                ev.stopPropagation();
            }}
            @change="${(ev) => this.toggleSelectDomain(domain, ev.target.checked)}}"
            ?checked=${includedDomains.includes(domain)}
          >
          </ha-switch>
        </div>
        ${this.selectedDomain == domain
                ? html `
              <div class="divider"></div>
              ${this.getEntitySwitches(domain)}
              <div class="divider"></div>
            `
                : ''}
      `;
            });
        }
        getEntitySwitches(domain) {
            if (!this._config || !this.hass)
                return;
            const includedEntities = this._config.include ? [...this._config.include] : [];
            return Object.entries(this.hass.states)
                .filter(([e]) => f(e) == domain)
                .filter(([e]) => domain != 'switch' || !this.scheduleEntities.includes(e))
                .map(([entity_id, cfg]) => {
                const name = cfg.attributes.friendly_name || d(entity_id);
                const enabled = includedEntities.includes(entity_id) || includedEntities.includes(f(entity_id));
                return html `
          <div class="row" @click=${() => this.toggleSelectEntity(entity_id)}>
            <state-badge .hass=${this.hass} .stateObj=${this.hass.states[entity_id]}> </state-badge>
            <div class="info">
              ${name}
              <div class="secondary">
                ${entity_id}
              </div>
            </div>
            <ha-switch ?checked=${enabled} ?disabled=${includedEntities.includes(f(entity_id))}></ha-switch>
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
                includedEntities = includedEntities.filter(e => !e.startsWith(domain));
                includedEntities.push(domain);
            }
            else if (includedEntities.includes(domain) && !enabled)
                includedEntities = includedEntities.filter(e => e != domain);
            else
                return;
            includedEntities.sort();
            this._config = Object.assign(Object.assign({}, this._config), { include: includedEntities });
            q(this, 'config-changed', { config: this._config });
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
            q(this, 'config-changed', { config: this._config });
        }
        static get styles() {
            return css `
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
        property()
    ], SchedulerCardEditor.prototype, "hass", void 0);
    __decorate([
        property()
    ], SchedulerCardEditor.prototype, "_config", void 0);
    __decorate([
        property()
    ], SchedulerCardEditor.prototype, "selectedDomain", void 0);
    __decorate([
        property()
    ], SchedulerCardEditor.prototype, "titleOption", void 0);
    __decorate([
        property()
    ], SchedulerCardEditor.prototype, "scheduleEntities", void 0);
    SchedulerCardEditor = __decorate([
        customElement('scheduler-card-editor')
    ], SchedulerCardEditor);

    let DialogError = class DialogError extends LitElement {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return html ``;
            return html `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
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
            return css `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        property({ attribute: false })
    ], DialogError.prototype, "hass", void 0);
    __decorate([
        internalProperty()
    ], DialogError.prototype, "_params", void 0);
    DialogError = __decorate([
        customElement('dialog-error')
    ], DialogError);
    //# sourceMappingURL=dialog-error.js.map

    var dialogError = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogError () { return DialogError; }
    });

    let DialogDeleteDefective = class DialogDeleteDefective extends LitElement {
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
                return html ``;
            return html `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
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
            return css `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        property({ attribute: false })
    ], DialogDeleteDefective.prototype, "hass", void 0);
    __decorate([
        internalProperty()
    ], DialogDeleteDefective.prototype, "_params", void 0);
    DialogDeleteDefective = __decorate([
        customElement('dialog-delete-defective')
    ], DialogDeleteDefective);
    //# sourceMappingURL=dialog-delete-defective.js.map

    var dialogDeleteDefective = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DialogDeleteDefective () { return DialogDeleteDefective; }
    });

    window.customCards = window.customCards || [];
    window.customCards.push({
        type: 'scheduler-card',
        name: 'Scheduler Card',
        description: 'Card to manage schedule entities made with scheduler-component.',
    });
    console.info(`%c  SCHEDULER-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
    exports.SchedulerCard = class SchedulerCard extends LitElement {
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
        setConfig(config) {
            ValidateConfig(config);
            this._config = config;
        }
        getCardSize() {
            return 9;
        }
        render() {
            if (!this._hass || !this._config || !this.translationsLoaded)
                return html ``;
            if (this._view == EViews.Overview) {
                return html `
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
                return html `
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
                return html `
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
                return html `
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
                return html ``; //shouldnt happen!
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
            const action = ev.detail.action;
            const oldSchedule = this.schedule;
            if (action != CreateTimeScheme) {
                this.actions = [computeEntityActions(entities, this._hass, this._config).find(e => e.id == action)];
                const defaultTimeslot = {
                    start: '12:00:00',
                    actions: flatten(entities.map(e => Object({
                        service: this.actions[0].service,
                        entity_id: e,
                        service_data: this.actions[0].service_data
                    })))
                };
                this.schedule = oldSchedule
                    ? Object.assign(Object.assign({}, oldSchedule), { timeslots: oldSchedule.timeslots.length == 1 && !oldSchedule.timeslots[0].stop
                            ? [Object.assign(Object.assign({}, oldSchedule.timeslots[0]), { actions: defaultTimeslot.actions })]
                            : [defaultTimeslot] }) : {
                    weekdays: ['once'],
                    timeslots: [defaultTimeslot],
                    repeat_type: ERepeatType.Repeat,
                    sdate: ''
                };
                this._view = EViews.TimePicker;
            }
            else {
                this.actions = computeEntityActions(entities, this._hass, this._config);
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
                this.schedule = oldSchedule
                    ? Object.assign(Object.assign({}, oldSchedule), { timeslots: oldSchedule.timeslots.length > 1 && oldSchedule.timeslots.every(e => e.stop)
                            ? oldSchedule.timeslots.map(slot => Object.assign(slot, { actions: [] }))
                            : defaultTimeslots }) : {
                    weekdays: ['daily'],
                    timeslots: defaultTimeslots,
                    repeat_type: ERepeatType.Repeat,
                    sdate: ''
                };
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
                    if (!slot.stop)
                        slot = omit(slot, ['stop']);
                    if (!((_a = slot.conditions) === null || _a === void 0 ? void 0 : _a.length))
                        slot = omit(slot, ['conditions', 'condition_type']);
                    return slot;
                })
                    .filter(e => e) });
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
            const entities = unique(flatten(data.timeslots.map(e => e.actions.map(e => e.entity_id))));
            this.entities = entities.map(e => parseEntity(e, this._hass, this._config));
            let actions = computeEntityActions(entities, this._hass, this._config);
            const usedActions = unique(flatten(data.timeslots.map(e => e.actions)));
            usedActions
                .forEach(e => {
                if (!actions.find(a => equalAction(a, e)))
                    actions.push(parseAction(e, this._hass, this._config));
            });
            this.actions = actions;
            this.schedule = {
                weekdays: data.weekdays,
                timeslots: data.timeslots,
                repeat_type: data.repeat_type,
                sdate: data.sdate,
                name: data.name
            };
            this.editItem = data.schedule_id;
            if (!this.entities.length || !this.schedule.timeslots.length) {
                const result = await new Promise((resolve) => {
                    q(this, 'show-dialog', {
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
                this._view = EViews.TimeScheme;
                this.schedule = Object.assign(Object.assign({}, this.schedule), { timeslots: calculateTimeline(this.schedule.timeslots) });
            }
            else {
                this._view = EViews.TimePicker;
                this.actions = this.actions.filter(e => usedActions.find(a => equalAction(e, a)));
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
        property()
    ], exports.SchedulerCard.prototype, "_hass", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "_view", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "entities", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "actions", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "schedule", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "translationsLoaded", void 0);
    exports.SchedulerCard = __decorate([
        customElement('scheduler-card')
    ], exports.SchedulerCard);

    return exports;

}({}));
