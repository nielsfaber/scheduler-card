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
    const isDirective = (o) => {
        return typeof o === 'function' && directives.has(o);
    };

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

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Built-in value references. */
    var Symbol$1 = root.Symbol;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0,
        MAX_INTEGER = 1.7976931348623157e+308;

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY$1 || value === -INFINITY$1) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /* Built-in method references that are verified to be native. */
    var WeakMap$1 = getNative(root, 'WeakMap');

    /** Built-in value references. */
    var objectCreate = Object.create;

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      return value === value
        ? strictIndexOf(array, value, fromIndex)
        : baseFindIndex(array, baseIsNaN, fromIndex);
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
    }

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

      return value === proto;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$3.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag$1 = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /** Detect free variable `exports`. */
    var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports$1 && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$4.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn$1(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn$1(source), object);
    });

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/;

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
    }

    /** Used for built-in method references. */
    var objectProto$a = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$8.call(data, key);
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /* Built-in method references that are verified to be native. */
    var Map$1 = getNative(root, 'Map');

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map$1 || ListCache),
        'string': new Hash
      };
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /** Error message constants. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /** Used as references for various `Number` constants. */
    var INFINITY$2 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /** Built-in value references. */
    var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    /** `Object#toString` result references. */
    var objectTag$1 = '[object Object]';

    /** Used for built-in method references. */
    var funcProto$2 = Function.prototype,
        objectProto$b = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$2 = funcProto$2.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString$2.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$9.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString$2.call(Ctor) == objectCtorString;
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn$1(source), object);
    }

    /** Detect free variable `exports`. */
    var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

    /** Built-in value references. */
    var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
        allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /** Used for built-in method references. */
    var objectProto$c = Object.prototype;

    /** Built-in value references. */
    var propertyIsEnumerable$1 = objectProto$c.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable$1.call(object, symbol);
      });
    };

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
    }

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView');

    /* Built-in method references that are verified to be native. */
    var Promise$1 = getNative(root, 'Promise');

    /* Built-in method references that are verified to be native. */
    var Set$1 = getNative(root, 'Set');

    /** `Object#toString` result references. */
    var mapTag$1 = '[object Map]',
        objectTag$2 = '[object Object]',
        promiseTag = '[object Promise]',
        setTag$1 = '[object Set]',
        weakMapTag$1 = '[object WeakMap]';

    var dataViewTag$1 = '[object DataView]';

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map$1),
        promiseCtorString = toSource(Promise$1),
        setCtorString = toSource(Set$1),
        weakMapCtorString = toSource(WeakMap$1);

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
        (Map$1 && getTag(new Map$1) != mapTag$1) ||
        (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
        (Set$1 && getTag(new Set$1) != setTag$1) ||
        (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag$1)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag$2 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag$1;
            case mapCtorString: return mapTag$1;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag$1;
            case weakMapCtorString: return weakMapTag$1;
          }
        }
        return result;
      };
    }

    var getTag$1 = getTag;

    /** Used for built-in method references. */
    var objectProto$d = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$a = objectProto$d.hasOwnProperty;

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty$a.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /** Built-in value references. */
    var Uint8Array = root.Uint8Array;

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /** `Object#toString` result references. */
    var boolTag$1 = '[object Boolean]',
        dateTag$1 = '[object Date]',
        mapTag$2 = '[object Map]',
        numberTag$1 = '[object Number]',
        regexpTag$1 = '[object RegExp]',
        setTag$2 = '[object Set]',
        stringTag$1 = '[object String]',
        symbolTag$1 = '[object Symbol]';

    var arrayBufferTag$1 = '[object ArrayBuffer]',
        dataViewTag$2 = '[object DataView]',
        float32Tag$1 = '[object Float32Array]',
        float64Tag$1 = '[object Float64Array]',
        int8Tag$1 = '[object Int8Array]',
        int16Tag$1 = '[object Int16Array]',
        int32Tag$1 = '[object Int32Array]',
        uint8Tag$1 = '[object Uint8Array]',
        uint8ClampedTag$1 = '[object Uint8ClampedArray]',
        uint16Tag$1 = '[object Uint16Array]',
        uint32Tag$1 = '[object Uint32Array]';

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag$1:
          return cloneArrayBuffer(object);

        case boolTag$1:
        case dateTag$1:
          return new Ctor(+object);

        case dataViewTag$2:
          return cloneDataView(object, isDeep);

        case float32Tag$1: case float64Tag$1:
        case int8Tag$1: case int16Tag$1: case int32Tag$1:
        case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
          return cloneTypedArray(object, isDeep);

        case mapTag$2:
          return new Ctor;

        case numberTag$1:
        case stringTag$1:
          return new Ctor(object);

        case regexpTag$1:
          return cloneRegExp(object);

        case setTag$2:
          return new Ctor;

        case symbolTag$1:
          return cloneSymbol(object);
      }
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /** `Object#toString` result references. */
    var mapTag$3 = '[object Map]';

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag$1(value) == mapTag$3;
    }

    /* Node.js helper references. */
    var nodeIsMap = nodeUtil && nodeUtil.isMap;

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /** `Object#toString` result references. */
    var setTag$3 = '[object Set]';

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag$1(value) == setTag$3;
    }

    /* Node.js helper references. */
    var nodeIsSet = nodeUtil && nodeUtil.isSet;

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG = 4;

    /** `Object#toString` result references. */
    var argsTag$2 = '[object Arguments]',
        arrayTag$1 = '[object Array]',
        boolTag$2 = '[object Boolean]',
        dateTag$2 = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag$2 = '[object Function]',
        genTag$1 = '[object GeneratorFunction]',
        mapTag$4 = '[object Map]',
        numberTag$2 = '[object Number]',
        objectTag$3 = '[object Object]',
        regexpTag$2 = '[object RegExp]',
        setTag$4 = '[object Set]',
        stringTag$2 = '[object String]',
        symbolTag$2 = '[object Symbol]',
        weakMapTag$2 = '[object WeakMap]';

    var arrayBufferTag$2 = '[object ArrayBuffer]',
        dataViewTag$3 = '[object DataView]',
        float32Tag$2 = '[object Float32Array]',
        float64Tag$2 = '[object Float64Array]',
        int8Tag$2 = '[object Int8Array]',
        int16Tag$2 = '[object Int16Array]',
        int32Tag$2 = '[object Int32Array]',
        uint8Tag$2 = '[object Uint8Array]',
        uint8ClampedTag$2 = '[object Uint8ClampedArray]',
        uint16Tag$2 = '[object Uint16Array]',
        uint32Tag$2 = '[object Uint32Array]';

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
    cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
    cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
    cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
    cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
    cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
    cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
    cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
    cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
    cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
    cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
    cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
    cloneableTags[weakMapTag$2] = false;

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag$1(value),
            isFunc = tag == funcTag$2 || tag == genTag$1;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag$3 || tag == argsTag$2 || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED$2);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$1 = 1,
        COMPARE_UNORDERED_FLAG$1 = 2;

    /** `Object#toString` result references. */
    var boolTag$3 = '[object Boolean]',
        dateTag$3 = '[object Date]',
        errorTag$2 = '[object Error]',
        mapTag$5 = '[object Map]',
        numberTag$3 = '[object Number]',
        regexpTag$3 = '[object RegExp]',
        setTag$5 = '[object Set]',
        stringTag$3 = '[object String]',
        symbolTag$3 = '[object Symbol]';

    var arrayBufferTag$3 = '[object ArrayBuffer]',
        dataViewTag$4 = '[object DataView]';

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag$4:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag$3:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag$3:
        case dateTag$3:
        case numberTag$3:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag$2:
          return object.name == other.name && object.message == other.message;

        case regexpTag$3:
        case stringTag$3:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag$5:
          var convert = mapToArray;

        case setTag$5:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG$1;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag$3:
          if (symbolValueOf$1) {
            return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
          }
      }
      return false;
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$2 = 1;

    /** Used for built-in method references. */
    var objectProto$e = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$b = objectProto$e.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty$b.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$3 = 1;

    /** `Object#toString` result references. */
    var argsTag$3 = '[object Arguments]',
        arrayTag$2 = '[object Array]',
        objectTag$4 = '[object Object]';

    /** Used for built-in method references. */
    var objectProto$f = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$c = objectProto$f.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag$2 : getTag$1(object),
          othTag = othIsArr ? arrayTag$2 : getTag$1(other);

      objTag = objTag == argsTag$3 ? objectTag$4 : objTag;
      othTag = othTag == argsTag$3 ? objectTag$4 : othTag;

      var objIsObj = objTag == objectTag$4,
          othIsObj = othTag == objectTag$4,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
        var objIsWrapped = objIsObj && hasOwnProperty$c.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty$c.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$4 = 1,
        COMPARE_UNORDERED_FLAG$2 = 2;

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$5 = 1,
        COMPARE_UNORDERED_FLAG$3 = 2;

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
      };
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property$1(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property$1(value);
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, castFunction(iteratee));
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, baseIteratee(predicate));
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = baseIteratee(predicate);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax$1 = Math.max;

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax$1(length + index, 0);
      }
      return baseFindIndex(array, baseIteratee(predicate), index);
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, baseIteratee(iteratee));
    }

    /** Used for built-in method references. */
    var objectProto$g = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$d = objectProto$g.hasOwnProperty;

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty$d.call(object, key);
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /** `Object#toString` result references. */
    var mapTag$6 = '[object Map]',
        setTag$6 = '[object Set]';

    /** Used for built-in method references. */
    var objectProto$h = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$e = objectProto$h.hasOwnProperty;

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag$1(value);
      if (tag == mapTag$6 || tag == setTag$6) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty$e.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = baseIteratee(iteratee);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /** Error message constants. */
    var FUNC_ERROR_TEXT$1 = 'Expected a function';

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG$1 = 1,
        CLONE_FLAT_FLAG$1 = 2,
        CLONE_SYMBOLS_FLAG$1 = 4;

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG$1 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$1, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = baseIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(baseIteratee(predicate)));
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define the
     * sort order of `array` and replaces criteria objects with their corresponding
     * values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * This function is like `baseIndexOf` except that it accepts a comparator.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto$1 = Array.prototype;

    /** Built-in value references. */
    var splice$1 = arrayProto$1.splice;

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice$1.call(seen, fromIndex, 1);
          }
          splice$1.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    var scheduler = "Scheduler";
    var actions = {
    	add: "add item",
    	cancel: "cancel",
    	next: "next",
    	save: "save",
    	"delete": "delete"
    };
    var instructions = {
    	no_group_selected: "Select a group first",
    	no_entity_selected: "Select an entity first",
    	no_groups_defined: "There are no groups defined",
    	no_entities_for_group: "There are no entities in this group",
    	no_actions_for_entity: "There are no actions for this entity",
    	no_entries_defined: "There are no items to show"
    };
    var fields = {
    	group: "Group",
    	entity: "Entity",
    	action: "Action",
    	days: "Days",
    	time: "Time",
    	options: "Options",
    	day_type_daily: "every day",
    	day_type_weekdays: "weekdays",
    	day_type_custom: "custom",
    	shift_with_sun: "automatically adjust time to sunrise/sunset",
    	brightness: "Brightness",
    	temperature: "Temperature"
    };
    var days_short = {
    	mon: "mon",
    	tue: "tue",
    	wed: "wed",
    	thu: "thu",
    	fri: "fri",
    	sat: "sat",
    	sun: "sun"
    };
    var days_long = {
    	mon: "monday",
    	tue: "tuesday",
    	wed: "wednesday",
    	thu: "thursday",
    	fri: "friday",
    	sat: "saturday",
    	sun: "sunday"
    };
    var words = {
    	on: "on",
    	every: "every",
    	and: "and",
    	at: "at",
    	before: "before",
    	after: "after",
    	sunrise: "sunrise",
    	sunset: "sunset"
    };
    var services = {
    	turn_on: "turn on",
    	turn_off: "turn off",
    	close_cover: "close",
    	open_cover: "open",
    	set_to: "set to"
    };
    var domains = {
    	climate: "climate",
    	cover: "covers",
    	fan: "fans",
    	light: "lights",
    	"switch": "switches",
    	vacuum: "vacuum"
    };
    var en = {
    	scheduler: scheduler,
    	actions: actions,
    	instructions: instructions,
    	fields: fields,
    	days_short: days_short,
    	days_long: days_long,
    	words: words,
    	services: services,
    	domains: domains
    };

    var en$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        scheduler: scheduler,
        actions: actions,
        instructions: instructions,
        fields: fields,
        days_short: days_short,
        days_long: days_long,
        words: words,
        services: services,
        domains: domains,
        'default': en
    });

    var scheduler$1 = "Tijdplanner";
    var actions$1 = {
    	add: "Nieuw item",
    	cancel: "annuleren",
    	next: "verder",
    	save: "opslaan",
    	"delete": "verwijder"
    };
    var instructions$1 = {
    	no_group_selected: "Selecteer eerst een groep",
    	no_entity_selected: "Selecteer eerst een entiteit",
    	no_groups_defined: "Er zijn geen groepen gedefinieerd",
    	no_entities_for_group: "Deze groep heeft geen entiteiten",
    	no_actions_for_entity: "Deze entiteit heeft geen acties",
    	no_entries_defined: "Er zijn geen items aangemaakt"
    };
    var fields$1 = {
    	group: "Groep",
    	entity: "Entiteit",
    	action: "Actie",
    	days: "Dagen",
    	time: "Tijdstip",
    	options: "Opties",
    	day_type_daily: "Dagelijks",
    	day_type_weekdays: "werkdagen",
    	day_type_custom: "Anders",
    	shift_with_sun: "Automatisch aanpassen aan zonsopgang/zonsondergang",
    	brightness: "Helderheid",
    	temperature: "Temperatuur"
    };
    var days_short$1 = {
    	mon: "ma",
    	tue: "di",
    	wed: "wo",
    	thu: "do",
    	fri: "vr",
    	sat: "za",
    	sun: "zo"
    };
    var days_long$1 = {
    	mon: "maandag",
    	tue: "dinsdag",
    	wed: "woensdag",
    	thu: "donderdag",
    	fri: "vrijdag",
    	sat: "zaterdag",
    	sun: "zondag"
    };
    var words$1 = {
    	on: "op",
    	every: "elke",
    	and: "en",
    	at: "om",
    	before: "voor",
    	after: "na",
    	sunrise: "zonsopgang",
    	sunset: "zonsondergang"
    };
    var services$1 = {
    	turn_on: "aanzetten",
    	turn_off: "uitzetten",
    	close_cover: "sluiten",
    	open_cover: "openen",
    	set_to: "Zet op"
    };
    var domains$1 = {
    	climate: "verwarming",
    	cover: "zonwering",
    	fan: "ventilatie",
    	light: "verlichting",
    	"switch": "schakelaars",
    	vacuum: "stofzuiger"
    };
    var nl = {
    	scheduler: scheduler$1,
    	actions: actions$1,
    	instructions: instructions$1,
    	fields: fields$1,
    	days_short: days_short$1,
    	days_long: days_long$1,
    	words: words$1,
    	services: services$1,
    	domains: domains$1
    };

    var nl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        scheduler: scheduler$1,
        actions: actions$1,
        instructions: instructions$1,
        fields: fields$1,
        days_short: days_short$1,
        days_long: days_long$1,
        words: words$1,
        services: services$1,
        domains: domains$1,
        'default': nl
    });

    var scheduler$2 = "Zeitplaner";
    var actions$2 = {
    	add: "hinzufügen",
    	cancel: "abbrechen",
    	next: "weiter",
    	save: "speichern",
    	"delete": "löschen"
    };
    var instructions$2 = {
    	no_group_selected: "Wähle zuerst eine Gruppe aus",
    	no_entity_selected: "Wähle zuerst eine Entity aus",
    	no_groups_defined: "Es gibt keine Gruppe",
    	no_entities_for_group: "Es gibt keine Entities in dieser Gruppe",
    	no_actions_for_entity: "Es gibt keine Aktionen für diese Entity",
    	no_entries_defined: "Es gibt keine Einträge"
    };
    var fields$2 = {
    	group: "Gruppe",
    	entity: "Entity",
    	action: "Aktion",
    	days: "Tage",
    	time: "Zeit",
    	options: "Optionen",
    	day_type_daily: "jeden Tag",
    	day_type_weekdays: "Werktags",
    	day_type_custom: "benutzerdefiniert",
    	shift_with_sun: "Zeit automatisch an Sonnenauf- bzw. Sonnenuntergang anpassen",
    	brightness: "Helligkeit",
    	temperature: "Temperatur"
    };
    var days_short$2 = {
    	mon: "Mo",
    	tue: "Di",
    	wed: "Mi",
    	thu: "Do",
    	fri: "Fr",
    	sat: "Sa",
    	sun: "So"
    };
    var days_long$2 = {
    	mon: "Montag",
    	tue: "Dienstag",
    	wed: "Mittwoch",
    	thu: "Donnerstag",
    	fri: "Freitag",
    	sat: "Samstag",
    	sun: "Sonntag"
    };
    var words$2 = {
    	on: "An",
    	every: "jeden",
    	and: "und",
    	at: "um",
    	before: "vor",
    	after: "nach",
    	sunrise: "Sonnenaufgang",
    	sunset: "Sonnenuntergang"
    };
    var services$2 = {
    	turn_on: "anschalten",
    	turn_off: "ausschalten",
    	close_cover: "schließen",
    	open_cover: "öffnen",
    	set_to: "setzen auf"
    };
    var domains$2 = {
    	climate: "Heizung",
    	cover: "Beschattung",
    	fan: "Lüfter",
    	light: "Licht",
    	"switch": "Schalter",
    	vacuum: "Staubsauger"
    };
    var de = {
    	scheduler: scheduler$2,
    	actions: actions$2,
    	instructions: instructions$2,
    	fields: fields$2,
    	days_short: days_short$2,
    	days_long: days_long$2,
    	words: words$2,
    	services: services$2,
    	domains: domains$2
    };

    var de$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        scheduler: scheduler$2,
        actions: actions$2,
        instructions: instructions$2,
        fields: fields$2,
        days_short: days_short$2,
        days_long: days_long$2,
        words: words$2,
        services: services$2,
        domains: domains$2,
        'default': de
    });

    var scheduler$3 = "Planificateur";
    var actions$3 = {
    	add: "ajouter un item",
    	cancel: "canceller",
    	next: "suivant",
    	save: "sauvegarder",
    	"delete": "effacer"
    };
    var instructions$3 = {
    	no_group_selected: "Sélectionner un groupe en premier",
    	no_entity_selected: "Sélectionner une entité en premier",
    	no_groups_defined: "Il n'y a pas de groupe défini",
    	no_entities_for_group: "Il n'y a pas d'entité dans ce groupe",
    	no_actions_for_entity: "Il n'y a pas d'action pour cette entité",
    	no_entries_defined: "Il n'y a pas d'item à afficher"
    };
    var fields$3 = {
    	group: "Groupe",
    	entity: "Entité",
    	action: "Action",
    	days: "DJours",
    	time: "Temps",
    	options: "Options",
    	day_type_daily: "chaque jour",
    	day_type_weekdays: "en semaine",
    	day_type_custom: "sur mesure",
    	shift_with_sun: "ajuster automatiquement l'heure au lever/coucher du soleil",
    	brightness: "Luminosité",
    	temperature: "Température"
    };
    var days_short$3 = {
    	mon: "lun",
    	tue: "mar",
    	wed: "mer",
    	thu: "jeu",
    	fri: "ven",
    	sat: "sam",
    	sun: "dim"
    };
    var days_long$3 = {
    	mon: "lundi",
    	tue: "mardi",
    	wed: "mercredi",
    	thu: "jeudi",
    	fri: "vendredi",
    	sat: "samedi",
    	sun: "dimanche"
    };
    var words$3 = {
    	on: "marche",
    	every: "tout",
    	and: "et",
    	at: "à",
    	before: "avant",
    	after: "après",
    	sunrise: "lever du soleil",
    	sunset: "coucher du soleil"
    };
    var services$3 = {
    	turn_on: "allumer",
    	turn_off: "éteindre",
    	close_cover: "fermer",
    	open_cover: "ouvrir",
    	set_to: "défini à"
    };
    var domains$3 = {
    	climate: "climat",
    	cover: "contrôleur",
    	fan: "ventilateur",
    	light: "lumière",
    	"switch": "interrupteurs",
    	vacuum: "aspirateur"
    };
    var fr = {
    	scheduler: scheduler$3,
    	actions: actions$3,
    	instructions: instructions$3,
    	fields: fields$3,
    	days_short: days_short$3,
    	days_long: days_long$3,
    	words: words$3,
    	services: services$3,
    	domains: domains$3
    };

    var fr$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        scheduler: scheduler$3,
        actions: actions$3,
        instructions: instructions$3,
        fields: fields$3,
        days_short: days_short$3,
        days_long: days_long$3,
        words: words$3,
        services: services$3,
        domains: domains$3,
        'default': fr
    });

    var scheduler$4 = "Harmonogram";
    var actions$4 = {
    	add: "dodaj",
    	cancel: "anuluj",
    	next: "dalej",
    	save: "zapisz",
    	"delete": "usuń"
    };
    var instructions$4 = {
    	no_group_selected: "Najpierw wybierz grupę",
    	no_entity_selected: "Najpierw wybierz encję",
    	no_groups_defined: "Nie ma zdefiniowanych grup",
    	no_entities_for_group: "Nie ma encji w tej grupie",
    	no_actions_for_entity: "Nie ma akcji dla tej encji",
    	no_entries_defined: "Nie ma elementów do pokazania"
    };
    var fields$4 = {
    	group: "Grupa",
    	entity: "Encja",
    	action: "Akcja",
    	days: "Dni",
    	time: "Czas",
    	options: "Opcje",
    	day_type_daily: "codziennie",
    	day_type_weekdays: "dni tygodnia",
    	day_type_custom: "niestandardowy",
    	shift_with_sun: "automatycznie dopasuj czas do wschodów/zachodów",
    	brightness: "Jasność",
    	temperature: "Temperatura"
    };
    var days_short$4 = {
    	mon: "pon",
    	tue: "wt",
    	wed: "śr",
    	thu: "czw",
    	fri: "pt",
    	sat: "sob",
    	sun: "niedz"
    };
    var days_long$4 = {
    	mon: "poniedziałek",
    	tue: "wtorek",
    	wed: "środa",
    	thu: "czwartek",
    	fri: "piątek",
    	sat: "sobota",
    	sun: "niedziela"
    };
    var words$4 = {
    	on: "w",
    	every: "każdy",
    	and: "oraz",
    	at: "o",
    	before: "przed",
    	after: "po",
    	sunrise: "wschód",
    	sunset: "zachodów"
    };
    var services$4 = {
    	turn_on: "włącz",
    	turn_off: "wyłącz",
    	close_cover: "zamknij",
    	open_cover: "otwórz",
    	set_to: "ustaw na"
    };
    var domains$4 = {
    	climate: "termostat",
    	cover: "roleta",
    	fan: "wiatrak",
    	light: "światło",
    	"switch": "włącznik",
    	vacuum: "odkurzacz"
    };
    var pl = {
    	scheduler: scheduler$4,
    	actions: actions$4,
    	instructions: instructions$4,
    	fields: fields$4,
    	days_short: days_short$4,
    	days_long: days_long$4,
    	words: words$4,
    	services: services$4,
    	domains: domains$4
    };

    var pl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        scheduler: scheduler$4,
        actions: actions$4,
        instructions: instructions$4,
        fields: fields$4,
        days_short: days_short$4,
        days_long: days_long$4,
        words: words$4,
        services: services$4,
        domains: domains$4,
        'default': pl
    });

    var languages = {
        en: en$1,
        nl: nl$1,
        de: de$1,
        fr: fr$1,
        pl: pl$1,
    };
    function localize(string, search = '', replace = '') {
        const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
        var translated;
        try {
            translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
        }
        catch (e) {
            translated = string.split('.').reduce((o, i) => o[i], languages['en']);
        }
        if (translated === undefined)
            translated = string.split('.').reduce((o, i) => o[i], languages['en']);
        if (search !== '' && replace !== '') {
            translated = translated.replace(search, replace);
        }
        return translated;
    }

    const defaultDomainConfig = {
        light: {
            actions: [
                {
                    service: "turn_on",
                    icon: "lightbulb-on-outline",
                    name: localize('services.turn_on'),
                    variable: {
                        field: "brightness",
                        name: localize('fields.brightness')
                    }
                },
                {
                    service: "turn_off",
                    icon: "lightbulb-off-outline",
                    name: localize('services.turn_off')
                }
            ]
        },
        switch: {
            actions: [
                {
                    service: "turn_on",
                    name: localize('services.turn_on')
                },
                {
                    service: "turn_off",
                    name: localize('services.turn_off')
                }
            ]
        },
        cover: {
            actions: [
                {
                    service: "open_cover",
                    name: localize('services.open_cover')
                },
                {
                    service: "close_cover",
                    name: localize('services.close_cover')
                },
            ]
        },
        climate: {
            actions: [
                {
                    service: "set_temperature",
                    variable: {
                        field: "temperature",
                        name: localize('fields.temperature')
                    },
                    icon: "thermometer"
                },
                {
                    service: "turn_off",
                    icon: "thermometer-off"
                }
            ]
        }
    };
    const DefaultUserSelection = {
        group: '',
        entity: '',
        action: '',
        newItem: false,
        actionConfirmed: false,
        editItem: '',
        timeHours: '12',
        timeMinutes: '00',
        days: [],
        daysType: 'daily',
        sun: false,
        levelEnabled: false,
        level: 0
    };
    function getIconForDomain(domain) {
        var map = {
            'automation': 'robot',
            'camera': 'camera',
            'climate': 'home-thermometer-outline',
            'cover': 'window-shutter',
            'fan': 'fan',
            'input_number': 'sort-numeric-variant',
            'input_select': 'form-select',
            'input_text': 'form-textbox',
            'input_time': 'clock',
            'light': 'lightbulb-outline',
            'media_player': 'speaker',
            'script': 'script-text',
            'switch': 'flash',
            'vacuum': 'robot-vacuum'
        };
        if (domain in map)
            return map[domain];
        return 'folder-outline';
    }
    function getNameForDomain(domain) {
        let result = null;
        if (domain == 'climate')
            result = localize('domains.climate');
        else if (domain == 'cover')
            result = localize('domains.cover');
        else if (domain == 'fan')
            result = localize('domains.fan');
        else if (domain == 'light')
            result = localize('domains.light');
        else if (domain == 'switch')
            result = localize('domains.switch');
        else if (domain == 'vacuum')
            result = localize('domains.vacuum');
        if (result)
            return result;
        else
            return domain;
    }
    function getIconForAction(action) {
        if (action == 'turn_on')
            return 'toggle-switch-outline';
        else if (action == 'turn_off')
            return 'toggle-switch-off-outline';
        else if (action == 'open_cover')
            return 'window-shutter-open';
        else if (action == 'close_cover')
            return 'window-shutter';
        else if (action == 'set_temperature')
            return 'thermometer';
        return 'flash';
    }
    function getNameForService(service) {
        if (service == 'turn_on')
            return localize('services.turn_on');
        else if (service == 'turn_off')
            return localize('services.turn_off');
        else if (service == 'open_cover')
            return localize('services.open_cover');
        else if (service == 'close_cover')
            return localize('services.close_cover');
        if (service.indexOf('.') !== -1)
            return service.split('.').pop();
        return service;
    }
    function getDefaultActionVariableConfig(field_name) {
        const defaultConfig = {
            brightness: {
                name: "brightness",
                unit: "",
                min: 0,
                max: 255,
                step: 2.55,
                optional: true,
                showPercentage: true
            },
            temperature: {
                name: "temperature",
                unit: "°C",
                min: 10,
                max: 30,
                step: 1,
                optional: false,
                showPercentage: false
            },
            default: {
                name: field_name,
                unit: "",
                min: 0,
                max: 255,
                step: 1,
                optional: false,
                showPercentage: false
            }
        };
        if (defaultConfig[field_name] !== undefined)
            return Object.assign({}, defaultConfig[field_name]);
        else
            return Object.assign({}, defaultConfig['default']);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

    var slugify = createCommonjsModule(function (module, exports) {
    (function (name, root, factory) {
      {
        module.exports = factory();
        module.exports['default'] = factory();
      }
    }('slugify', commonjsGlobal, function () {
      var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');
      var locales = JSON.parse('{"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue"},"vi":{"Đ":"D","đ":"d"}}');

      function replace (string, options) {
        if (typeof string !== 'string') {
          throw new Error('slugify: string argument expected')
        }

        options = (typeof options === 'string')
          ? {replacement: options}
          : options || {};

        var locale = locales[options.locale] || {};

        var replacement = options.replacement === undefined ? '-' : options.replacement;

        var slug = string.split('')
          // replace characters based on charMap
          .reduce(function (result, ch) {
            return result + (locale[ch] || charMap[ch] || ch)
              // remove not allowed characters
              .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
          }, '')
          // trim leading/trailing spaces
          .trim()
          // convert spaces to replacement character
          // also remove duplicates of the replacement character
          .replace(new RegExp('[\\s' + replacement + ']+', 'g'), replacement);

        if (options.lower) {
          slug = slug.toLowerCase();
        }

        if (options.strict) {
          // remove anything besides letters, numbers, and the replacement char
          slug = slug
            .replace(new RegExp('[^a-zA-Z0-9' + replacement + ']', 'g'), '')
            // remove duplicates of the replacement character
            .replace(new RegExp('[\\s' + replacement + ']+', 'g'), replacement);
        }

        return slug
      }

      replace.extend = function (customMap) {
        for (var key in customMap) {
          charMap[key] = customMap[key];
        }
      };

      return replace
    }));
    });

    const EntryPattern = /^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/;
    const ActionPattern = /^(A([0-9]+))+$/;
    const SunTimePattern = /^([0-9]{4})?(S[SR])([0-9]{4})?$/;
    const FixedTimePattern = /^([0-9]{2})([0-9]{2})$/;
    const TimeOffsetPattern = /^([\+\-]{1})([0-9]{2}):([0-9]{2})$/;
    function ExportToHass(userData, configData) {
        let actionCfg = configData.FindAction(userData.entity, userData.action);
        let action = pick(actionCfg, ['service', 'service_data']);
        Object.assign(action, { entity: userData.entity });
        if (!getDomainFromEntityId(action['service']))
            action['service'] = getDomainFromEntityId(action['entity']) + "." + action['service'];
        if (userData.hasOwnProperty('levelEnabled') && userData['levelEnabled']) {
            let key = actionCfg['variable']['field'];
            let val = userData['level'];
            let service_data = action.hasOwnProperty('service_data') ? action['service_data'] : {};
            Object.assign(action, { service_data: Object.assign(service_data, { [key]: val }) });
        }
        let entry = {
            actions: [0]
        };
        if (!userData.sun) {
            Object.assign(entry, { time: userData['timeHours'] + ':' + userData['timeMinutes'] });
        }
        else if (configData.next_sunrise && configData.next_sunset) {
            let timestamp = Number(userData.timeHours) + Number(userData.timeMinutes) / 60;
            let timestamp_sunrise = configData.next_sunrise.getHours() + configData.next_sunrise.getMinutes() / 60;
            let timestamp_sunset = configData.next_sunset.getHours() + configData.next_sunset.getMinutes() / 60;
            let timestamp_offset;
            if (Math.abs(timestamp - timestamp_sunrise) < Math.abs(timestamp - timestamp_sunset)) {
                Object.assign(entry, { event: 'sunrise' });
                timestamp_offset = timestamp - timestamp_sunrise;
            }
            else {
                Object.assign(entry, { event: 'sunset' });
                timestamp_offset = timestamp - timestamp_sunset;
            }
            let offset_hours = (timestamp_offset > 0) ? Math.abs(Math.floor(timestamp_offset)) : Math.abs(Math.ceil(timestamp_offset));
            let offset_mins = (timestamp_offset > 0) ? Math.round((timestamp_offset - offset_hours) * 60) : -Math.round((timestamp_offset + offset_hours) * 60);
            Object.assign(entry, { offset: `${timestamp_offset > 0 ? '+' : '-'}${String(offset_hours).padStart(2, '0')}:${String(offset_mins).padStart(2, '0')}` });
        }
        if (userData.daysType == 'weekdays')
            Object.assign(entry, { days: [1, 2, 3, 4, 5] });
        else if (userData.daysType == 'custom')
            Object.assign(entry, { days: userData.days.sort().filter(e => e != 0) });
        return {
            actions: [action],
            entries: [entry]
        };
    }
    function NumberToTime(e) {
        let res = FixedTimePattern.exec(e);
        if (!res)
            return null;
        return res[1] + ":" + res[2];
    }
    function getDomainFromEntityId(entity_id) {
        if (entity_id.indexOf('.') === -1)
            return '';
        let res = String(entity_id.split('.').shift());
        return res;
    }
    function CreateSlug(input) {
        let props = keys(input);
        props = props.sort();
        let obj = {};
        props.forEach(prop => obj[prop] = input[prop]);
        return slugify(JSON.stringify(values(obj)).replace(/\W/g, ' '), '_');
    }
    function IsSchedulerEntity(entity_id) {
        return entity_id.match(/^switch.schedule_[0-9a-f]{6}$/);
    }
    function ImportFromHass(hassData, configData) {
        let entries = hassData.attributes['entries'].map(entry => {
            let res = EntryPattern.exec(entry);
            let actions = ActionPattern.exec(res[3]);
            let data = {
                days: res[1].split("").map(Number),
                actions: actions.map(Number).filter(e => { return !isNaN(e); })
            };
            let is_sun_time = SunTimePattern.exec(res[2]);
            if (NumberToTime(res[2]) !== null) {
                Object.assign(data, { time: NumberToTime(res[2]) });
            }
            else if (is_sun_time) {
                let timestamp_reference;
                if (is_sun_time[2] == "SR")
                    timestamp_reference = configData.next_sunrise.getHours() + configData.next_sunrise.getMinutes() / 60;
                else
                    timestamp_reference = configData.next_sunset.getHours() + configData.next_sunset.getMinutes() / 60;
                if (is_sun_time[1]) {
                    let timestamp_offset = Number(is_sun_time[1].substr(0, 2)) + Number(is_sun_time[1].substr(2)) / 60;
                    let timestamp = timestamp_reference - timestamp_offset;
                    Object.assign(data, {
                        event: (is_sun_time[2] == "SR") ? "sunrise" : "sunset",
                        offset: "-" + NumberToTime(is_sun_time[1]),
                        time: `${String(Math.floor(timestamp)).padStart(2, '0')}:${String(Math.round((timestamp - Math.floor(timestamp)) * 6) * 10).padStart(2, '0')}`
                    });
                }
                else if (is_sun_time[3]) {
                    let timestamp_offset = Number(is_sun_time[3].substr(0, 2)) + Number(is_sun_time[3].substr(2)) / 60;
                    let timestamp = timestamp_reference + timestamp_offset;
                    Object.assign(data, {
                        event: (is_sun_time[2] == "SR") ? "sunrise" : "sunset",
                        offset: "+" + NumberToTime(is_sun_time[3]),
                        time: `${String(Math.floor(timestamp)).padStart(2, '0')}:${String(Math.round((timestamp - Math.floor(timestamp)) * 6) * 10).padStart(2, '0')}`
                    });
                }
            }
            return data;
        });
        let actions = hassData.attributes['actions'].map(action => {
            let output = {};
            let entity_id = getDomainFromEntityId(action['entity']) ? action['entity'] : getDomainFromEntityId(action['service']) + "." + action['entity'];
            let service = action['service'];
            let service_data = omit(action, ['service', 'entity']);
            if (getDomainFromEntityId(entity_id) == getDomainFromEntityId(service))
                service = service.split(".").pop();
            if (!configData.FindEntity(entity_id)) {
                //console.log(`failed to find entity ${entity_id}!`);
                return;
            }
            Object.assign(output, { entity: entity_id });
            let action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));
            if (!configData.FindAction(entity_id, action_id)) {
                let action = configData.GetActionsForEntity(entity_id).find(e => {
                    if (!e.hasOwnProperty('variable'))
                        return false;
                    if (service_data.hasOwnProperty(e['variable']['field']))
                        return true;
                    else
                        return false;
                });
                if (action) {
                    let field_name = action['variable']['field'];
                    Object.assign(output, { level: Number(service_data[field_name]) });
                    service_data = omit(service_data, field_name);
                    action_id = (service_data) ? CreateSlug(Object.assign({ service: service, service_data: service_data })) : CreateSlug(Object.assign({ service: service }));
                }
                else {
                    //console.log(`failed to find action ${action_id} for entity ${entity_id}!`);
                    return;
                }
            }
            Object.assign(output, { action: action_id });
            return output;
        });
        return {
            id: hassData.entity_id,
            enabled: hassData.state != 'off',
            entries: entries,
            actions: actions,
        };
    }
    function ComputeDaysType(dayArray) {
        if (!dayArray || !dayArray.length || dayArray.length == 1 && dayArray[0] == 0)
            return 'daily';
        else if (dayArray.length == 5 && !dayArray.includes(6) && !dayArray.includes(7))
            return 'weekdays';
        else
            return 'custom';
    }
    function PrettyPrintDays(dayArray) {
        if (ComputeDaysType(dayArray) == 'daily')
            return localize('fields.day_type_daily');
        else if (ComputeDaysType(dayArray) == 'weekdays')
            return `${localize('words.on')} ${localize('fields.day_type_weekdays')}`;
        else {
            let output = Array();
            if (dayArray.includes(1))
                output.push(localize('days_long.mon'));
            if (dayArray.includes(2))
                output.push(localize('days_long.tue'));
            if (dayArray.includes(3))
                output.push(localize('days_long.wed'));
            if (dayArray.includes(4))
                output.push(localize('days_long.thu'));
            if (dayArray.includes(5))
                output.push(localize('days_long.fri'));
            if (dayArray.includes(6))
                output.push(localize('days_long.sat'));
            if (dayArray.includes(7))
                output.push(localize('days_long.sun'));
            let output_str = output.join(', ');
            var n = output_str.lastIndexOf(', ');
            if (n)
                output_str = output_str.slice(0, n) + output_str.slice(n).replace(', ', ` ${localize('words.and')} `);
            return `${localize('words.every')} ${output_str}`;
        }
    }
    function PrettyPrintTime(timeData) {
        if (timeData.event) {
            let res = TimeOffsetPattern.exec(timeData.offset);
            let offset = Number(res[2]) + Number(res[3]) / 60;
            if (Math.abs(offset) < 1 / 6)
                return `${localize('words.at')} ${timeData.event} (${timeData.time})`;
            else
                return `${res[2]}:${res[3]} ${res[1] == '+' ? localize('words.after') : localize('words.before')} ${localize(`words.${timeData.event}`)} (${timeData.time})`;
        }
        else {
            return `${localize('words.at')} ${timeData.time}`;
        }
    }
    function PrettyPrintName(input) {
        if (typeof input != typeof "x")
            input = String(input);
        return input.replace(/_/g, ' ');
    }
    function PrettyPrintIcon(input) {
        if (typeof input != typeof "x")
            input = String(input);
        if (input.match(/^[a-z]+:[a-z0-9-]+$/i))
            return input;
        return `hass:${input}`;
    }

    class Config {
        constructor() {
            this.entities = [];
            this.groups = [];
            this.userConfig = {
                groups: {},
                domains: {},
                entities: {},
                discoverExisting: true,
                standardConfiguration: true
            };
        }
        setUserConfig(userConfig) {
            Object.assign(this.userConfig, pick(userConfig, ['entities', 'groups', 'discoverExisting', 'standardConfiguration']));
            if (this.userConfig.standardConfiguration)
                Object.assign(this.userConfig, { domains: defaultDomainConfig });
            if (userConfig.domains) {
                forEach(userConfig.domains, (cfg, domain) => {
                    let domainCfg = Object.assign({}, this.userConfig.domains);
                    Object.assign(domainCfg, { [domain]: cfg });
                    this.userConfig.domains = domainCfg;
                });
            }
            if (this.userConfig.groups) {
                forEach(userConfig.groups, this.AddGroup.bind(this));
            }
        }
        /* Groups functions */
        AddGroup(cfg, id) {
            if (this.FindGroup(id))
                return;
            let data = Object.assign({
                id: id,
                icon: 'folder-outline',
                domains: [],
                entities: [],
                name: getNameForDomain(id)
            }, omitBy(Object.assign({}, cfg), isUndefined));
            this.groups.push(data);
        }
        FindGroup(id) {
            let res = find(this.groups, { id: id });
            if (res)
                return res;
            else
                return null;
        }
        AddEntityToGroup(entity_id) {
            let domain = getDomainFromEntityId(entity_id);
            let group = find(this.groups, group => {
                return (group.domains.includes(domain) || group.entities.includes(entity_id));
            });
            if (group)
                return; //nothing to be done
            group = this.FindGroup(domain);
            if (!group) {
                this.AddGroup({
                    icon: getIconForDomain(domain),
                    entities: [entity_id]
                }, domain);
            }
            else {
                let list = [...group['entities']];
                list.push(entity_id);
                this.groups.forEach((group, i) => {
                    if (group['id'] == domain)
                        this.groups[i].entities = list;
                });
            }
        }
        GetGroups() {
            let output = [...this.groups];
            output = sortBy(output, 'name');
            return output;
        }
        /* Entities functions */
        AddEntity(cfg, id) {
            if (this.FindEntity(id))
                return;
            let data = Object.assign({
                id: id,
                name: id.split('.').pop(),
                icon: getIconForDomain(getDomainFromEntityId(id))
            }, omitBy(Object.assign({}, cfg), isUndefined));
            this.entities.push(data);
            this.AddEntityToGroup(id);
        }
        FindEntity(id) {
            let res = find(this.entities, { id: id });
            if (res)
                return res;
            else
                return null;
        }
        GetEntitiesForGroup(group_id) {
            let output = [...this.entities];
            if (group_id) {
                let group = this.FindGroup(group_id);
                if (!group)
                    return [];
                output = output.filter(e => {
                    let domain = getDomainFromEntityId(e.id);
                    return ((group === null || group === void 0 ? void 0 : group.entities.includes(e.id)) || (group === null || group === void 0 ? void 0 : group.domains.includes(domain)));
                });
            }
            output = sortBy(output, 'name');
            return output;
        }
        AddActionToEntity(entity_id, new_action) {
            if (!this.FindEntity(entity_id))
                throw Error(`Entity '${entity_id}' must be created before actions can be assigned`);
            if (this.FindAction(entity_id, new_action.id))
                return;
            let actions = [...this.GetActionsForEntity(entity_id)];
            actions.push(new_action);
            this.entities.forEach((entity, i) => {
                if (entity['id'] == entity_id)
                    this.entities[i].actions = actions;
            });
        }
        /* Actions functions */
        CreateAction(cfg) {
            let id = CreateSlug(pick(cfg, ['service', 'service_data']));
            let data = {
                id: id,
                name: getNameForService(cfg['service']),
                icon: getIconForAction(cfg['service']),
                service: cfg['service']
            };
            if (has(cfg, 'service_data') && !isEmpty(cfg))
                Object.assign(data, pick(cfg, 'service_data'));
            if (has(cfg, 'icon'))
                Object.assign(data, pick(cfg, 'icon'));
            if (has(cfg, 'name'))
                Object.assign(data, pick(cfg, 'name'));
            if (has(cfg, 'variable'))
                Object.assign(data, { variable: Object.assign(getDefaultActionVariableConfig(cfg['variable']['field']), cfg['variable']) });
            return data;
        }
        FindAction(entity_id, action_id) {
            let actions = this.GetActionsForEntity(entity_id);
            let action = find(actions, { id: action_id });
            if (action)
                return action;
            else
                return null;
        }
        GetActionsForEntity(entity_id) {
            let entity = this.FindEntity(entity_id);
            if (!entity)
                return [];
            let output = [...entity.actions];
            output = sortBy(output, 'name');
            return output;
        }
        LoadEntities(entityList) {
            //load the entities from configuration
            forEach(entityList, entity => {
                let entity_id = entity.entity_id;
                let domain = getDomainFromEntityId(entity_id);
                if (IsSchedulerEntity(entity_id))
                    return; //filter schedule items
                if (domain in this.userConfig.domains || entity_id in this.userConfig.entities) {
                    let entityActions = [];
                    let cfg = {
                        actions: [],
                        name: entityList[entity_id].attributes['friendly_name'],
                        icon: entityList[entity_id].attributes['icon']
                    };
                    let skip_entity = false;
                    if (domain in this.userConfig.domains) {
                        if (has(this.userConfig.domains[domain], 'include') && !this.userConfig.domains[domain]['include'].includes(entity_id))
                            skip_entity = true;
                        if (has(this.userConfig.domains[domain], 'exclude') && this.userConfig.domains[domain]['exclude'].includes(entity_id))
                            skip_entity = true;
                        Object.assign(cfg, omit(this.userConfig.domains[domain], 'actions'));
                        if (has(this.userConfig.domains[domain], 'actions') && !skip_entity) {
                            let actions = mapValues(this.userConfig.domains[domain]['actions'], this.CreateAction);
                            forEach(actions, e => entityActions.push(e));
                        }
                    }
                    if (entity_id in this.userConfig.entities) {
                        Object.assign(cfg, omit(this.userConfig.entities[entity_id], 'actions'));
                        if (has(this.userConfig.entities[entity_id], 'actions')) {
                            let actions = mapValues(this.userConfig.entities[entity_id]['actions'], this.CreateAction);
                            forEach(actions, e => entityActions.push(e));
                        }
                        skip_entity = false;
                    }
                    if (skip_entity)
                        return;
                    this.AddEntity(cfg, entity_id);
                    forEach(entityActions, e => this.AddActionToEntity(entity_id, e));
                }
            });
            if (this.userConfig.discoverExisting) {
                let res = filter(entityList, e => IsSchedulerEntity(e.entity_id));
                res = map(res, e => { return e.attributes['actions']; });
                res = flatten(res);
                forEach(res, item => {
                    let config = Object.assign({}, item);
                    let entity_id = config['entity'];
                    let service = config['service'];
                    if (!getDomainFromEntityId(entity_id)) {
                        entity_id = getDomainFromEntityId(service) + "." + entity_id;
                        service = service.split('.').pop();
                    }
                    let action = this.CreateAction({
                        service: service,
                        service_data: omit(config, ['entity', 'service']),
                    });
                    //add the entity if it does not exist
                    if (!this.FindEntity(entity_id)) {
                        if (!entityList[entity_id])
                            return; //entity is not in HA (corrupt schedule!)
                        let entityCfg = {
                            actions: [],
                            name: entityList[entity_id].attributes['friendly_name'],
                            icon: entityList[entity_id].attributes['icon']
                        };
                        this.AddEntity(entityCfg, entity_id);
                    }
                    this.AddActionToEntity(entity_id, action);
                });
            }
            if (entityList['sun.sun']) {
                this.next_sunrise = new Date(entityList['sun.sun'].attributes.next_rising);
                this.next_sunset = new Date(entityList['sun.sun'].attributes.next_setting);
            }
        }
    }

    const styles = css `
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
        display: flex;
        align-items: center;
      }

      div.option-item ha-paper-slider {
        flex-grow: 1;
        --paper-slider-pin-start-color: var(--primary-color);
      }
      
      .padded-right {
        margin-right: 11px;
      }
`;

    var uri_all = createCommonjsModule(function (module, exports) {
    /** @license URI.js v4.4.0 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
    (function (global, factory) {
    	 factory(exports) ;
    }(commonjsGlobal, (function (exports) {
    function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
            sets[_key] = arguments[_key];
        }

        if (sets.length > 1) {
            sets[0] = sets[0].slice(0, -1);
            var xl = sets.length - 1;
            for (var x = 1; x < xl; ++x) {
                sets[x] = sets[x].slice(1, -1);
            }
            sets[xl] = sets[xl].slice(1);
            return sets.join('');
        } else {
            return sets[0];
        }
    }
    function subexp(str) {
        return "(?:" + str + ")";
    }
    function typeOf(o) {
        return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
    }
    function toUpperCase(str) {
        return str.toUpperCase();
    }
    function toArray(obj) {
        return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
    }
    function assign(target, source) {
        var obj = target;
        if (source) {
            for (var key in source) {
                obj[key] = source[key];
            }
        }
        return obj;
    }

    function buildExps(isIRI) {
        var ALPHA$$ = "[A-Za-z]",
            DIGIT$$ = "[0-9]",
            HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
            PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
            //expanded
        GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
            SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
            RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
            UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
            //subset, excludes bidi control characters
        IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
            //subset
        UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
            SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
            USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
            DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
            //relaxed parsing rules
        IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
            H16$ = subexp(HEXDIG$$ + "{1,4}"),
            LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
            IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
            //                           6( h16 ":" ) ls32
        IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
            //                      "::" 5( h16 ":" ) ls32
        IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
            //[               h16 ] "::" 4( h16 ":" ) ls32
        IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
            //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
        IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
            //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
        IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
            //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
        IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
            //[ *4( h16 ":" ) h16 ] "::"              ls32
        IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
            //[ *5( h16 ":" ) h16 ] "::"              h16
        IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
            //[ *6( h16 ":" ) h16 ] "::"
        IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
            ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
            //RFC 6874, with relaxed parsing rules
        IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
            //RFC 6874
        REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
            PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
            SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
            QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
        return {
            NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
            NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
            NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
            ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            UNRESERVED: new RegExp(UNRESERVED$$, "g"),
            OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
            PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
            IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
            IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
        };
    }
    var URI_PROTOCOL = buildExps(false);

    var IRI_PROTOCOL = buildExps(true);

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();













    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    /** Highest positive signed 32-bit float value */

    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'

    /** Regular expressions */
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

    /** Error messages */
    var errors = {
    	'overflow': 'Overflow: input needs wider integers to process',
    	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    	'invalid-input': 'Invalid input'
    };

    /** Convenience shortcuts */
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error$1(type) {
    	throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
    	var result = [];
    	var length = array.length;
    	while (length--) {
    		result[length] = fn(array[length]);
    	}
    	return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
    	var parts = string.split('@');
    	var result = '';
    	if (parts.length > 1) {
    		// In email addresses, only the domain name should be punycoded. Leave
    		// the local part (i.e. everything up to `@`) intact.
    		result = parts[0] + '@';
    		string = parts[1];
    	}
    	// Avoid `split(regex)` for IE8 compatibility. See #17.
    	string = string.replace(regexSeparators, '\x2E');
    	var labels = string.split('.');
    	var encoded = map(labels, fn).join('.');
    	return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
    	var output = [];
    	var counter = 0;
    	var length = string.length;
    	while (counter < length) {
    		var value = string.charCodeAt(counter++);
    		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
    			// It's a high surrogate, and there is a next character.
    			var extra = string.charCodeAt(counter++);
    			if ((extra & 0xFC00) == 0xDC00) {
    				// Low surrogate.
    				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
    			} else {
    				// It's an unmatched surrogate; only append this code unit, in case the
    				// next code unit is the high surrogate of a surrogate pair.
    				output.push(value);
    				counter--;
    			}
    		} else {
    			output.push(value);
    		}
    	}
    	return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    var ucs2encode = function ucs2encode(array) {
    	return String.fromCodePoint.apply(String, toConsumableArray(array));
    };

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    var basicToDigit = function basicToDigit(codePoint) {
    	if (codePoint - 0x30 < 0x0A) {
    		return codePoint - 0x16;
    	}
    	if (codePoint - 0x41 < 0x1A) {
    		return codePoint - 0x41;
    	}
    	if (codePoint - 0x61 < 0x1A) {
    		return codePoint - 0x61;
    	}
    	return base;
    };

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    var digitToBasic = function digitToBasic(digit, flag) {
    	//  0..25 map to ASCII a..z or A..Z
    	// 26..35 map to ASCII 0..9
    	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    var adapt = function adapt(delta, numPoints, firstTime) {
    	var k = 0;
    	delta = firstTime ? floor(delta / damp) : delta >> 1;
    	delta += floor(delta / numPoints);
    	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
    		delta = floor(delta / baseMinusTMin);
    	}
    	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    var decode = function decode(input) {
    	// Don't use UCS-2.
    	var output = [];
    	var inputLength = input.length;
    	var i = 0;
    	var n = initialN;
    	var bias = initialBias;

    	// Handle the basic code points: let `basic` be the number of input code
    	// points before the last delimiter, or `0` if there is none, then copy
    	// the first basic code points to the output.

    	var basic = input.lastIndexOf(delimiter);
    	if (basic < 0) {
    		basic = 0;
    	}

    	for (var j = 0; j < basic; ++j) {
    		// if it's not a basic code point
    		if (input.charCodeAt(j) >= 0x80) {
    			error$1('not-basic');
    		}
    		output.push(input.charCodeAt(j));
    	}

    	// Main decoding loop: start just after the last delimiter if any basic code
    	// points were copied; start at the beginning otherwise.

    	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

    		// `index` is the index of the next character to be consumed.
    		// Decode a generalized variable-length integer into `delta`,
    		// which gets added to `i`. The overflow checking is easier
    		// if we increase `i` as we go, then subtract off its starting
    		// value at the end to obtain `delta`.
    		var oldi = i;
    		for (var w = 1, k = base;; /* no condition */k += base) {

    			if (index >= inputLength) {
    				error$1('invalid-input');
    			}

    			var digit = basicToDigit(input.charCodeAt(index++));

    			if (digit >= base || digit > floor((maxInt - i) / w)) {
    				error$1('overflow');
    			}

    			i += digit * w;
    			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

    			if (digit < t) {
    				break;
    			}

    			var baseMinusT = base - t;
    			if (w > floor(maxInt / baseMinusT)) {
    				error$1('overflow');
    			}

    			w *= baseMinusT;
    		}

    		var out = output.length + 1;
    		bias = adapt(i - oldi, out, oldi == 0);

    		// `i` was supposed to wrap around from `out` to `0`,
    		// incrementing `n` each time, so we'll fix that now:
    		if (floor(i / out) > maxInt - n) {
    			error$1('overflow');
    		}

    		n += floor(i / out);
    		i %= out;

    		// Insert `n` at position `i` of the output.
    		output.splice(i++, 0, n);
    	}

    	return String.fromCodePoint.apply(String, output);
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    var encode = function encode(input) {
    	var output = [];

    	// Convert the input in UCS-2 to an array of Unicode code points.
    	input = ucs2decode(input);

    	// Cache the length.
    	var inputLength = input.length;

    	// Initialize the state.
    	var n = initialN;
    	var delta = 0;
    	var bias = initialBias;

    	// Handle the basic code points.
    	var _iteratorNormalCompletion = true;
    	var _didIteratorError = false;
    	var _iteratorError = undefined;

    	try {
    		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    			var _currentValue2 = _step.value;

    			if (_currentValue2 < 0x80) {
    				output.push(stringFromCharCode(_currentValue2));
    			}
    		}
    	} catch (err) {
    		_didIteratorError = true;
    		_iteratorError = err;
    	} finally {
    		try {
    			if (!_iteratorNormalCompletion && _iterator.return) {
    				_iterator.return();
    			}
    		} finally {
    			if (_didIteratorError) {
    				throw _iteratorError;
    			}
    		}
    	}

    	var basicLength = output.length;
    	var handledCPCount = basicLength;

    	// `handledCPCount` is the number of code points that have been handled;
    	// `basicLength` is the number of basic code points.

    	// Finish the basic string with a delimiter unless it's empty.
    	if (basicLength) {
    		output.push(delimiter);
    	}

    	// Main encoding loop:
    	while (handledCPCount < inputLength) {

    		// All non-basic code points < n have been handled already. Find the next
    		// larger one:
    		var m = maxInt;
    		var _iteratorNormalCompletion2 = true;
    		var _didIteratorError2 = false;
    		var _iteratorError2 = undefined;

    		try {
    			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    				var currentValue = _step2.value;

    				if (currentValue >= n && currentValue < m) {
    					m = currentValue;
    				}
    			}

    			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    			// but guard against overflow.
    		} catch (err) {
    			_didIteratorError2 = true;
    			_iteratorError2 = err;
    		} finally {
    			try {
    				if (!_iteratorNormalCompletion2 && _iterator2.return) {
    					_iterator2.return();
    				}
    			} finally {
    				if (_didIteratorError2) {
    					throw _iteratorError2;
    				}
    			}
    		}

    		var handledCPCountPlusOne = handledCPCount + 1;
    		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
    			error$1('overflow');
    		}

    		delta += (m - n) * handledCPCountPlusOne;
    		n = m;

    		var _iteratorNormalCompletion3 = true;
    		var _didIteratorError3 = false;
    		var _iteratorError3 = undefined;

    		try {
    			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    				var _currentValue = _step3.value;

    				if (_currentValue < n && ++delta > maxInt) {
    					error$1('overflow');
    				}
    				if (_currentValue == n) {
    					// Represent delta as a generalized variable-length integer.
    					var q = delta;
    					for (var k = base;; /* no condition */k += base) {
    						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
    						if (q < t) {
    							break;
    						}
    						var qMinusT = q - t;
    						var baseMinusT = base - t;
    						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
    						q = floor(qMinusT / baseMinusT);
    					}

    					output.push(stringFromCharCode(digitToBasic(q, 0)));
    					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
    					delta = 0;
    					++handledCPCount;
    				}
    			}
    		} catch (err) {
    			_didIteratorError3 = true;
    			_iteratorError3 = err;
    		} finally {
    			try {
    				if (!_iteratorNormalCompletion3 && _iterator3.return) {
    					_iterator3.return();
    				}
    			} finally {
    				if (_didIteratorError3) {
    					throw _iteratorError3;
    				}
    			}
    		}

    		++delta;
    		++n;
    	}
    	return output.join('');
    };

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    var toUnicode = function toUnicode(input) {
    	return mapDomain(input, function (string) {
    		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    	});
    };

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    var toASCII = function toASCII(input) {
    	return mapDomain(input, function (string) {
    		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    	});
    };

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    var punycode = {
    	/**
      * A string representing the current Punycode.js version number.
      * @memberOf punycode
      * @type String
      */
    	'version': '2.1.0',
    	/**
      * An object of methods to convert from JavaScript's internal character
      * representation (UCS-2) to Unicode code points, and back.
      * @see <https://mathiasbynens.be/notes/javascript-encoding>
      * @memberOf punycode
      * @type Object
      */
    	'ucs2': {
    		'decode': ucs2decode,
    		'encode': ucs2encode
    	},
    	'decode': decode,
    	'encode': encode,
    	'toASCII': toASCII,
    	'toUnicode': toUnicode
    };

    /**
     * URI.js
     *
     * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/uri-js
     */
    /**
     * Copyright 2011 Gary Court. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification, are
     * permitted provided that the following conditions are met:
     *
     *    1. Redistributions of source code must retain the above copyright notice, this list of
     *       conditions and the following disclaimer.
     *
     *    2. Redistributions in binary form must reproduce the above copyright notice, this list
     *       of conditions and the following disclaimer in the documentation and/or other materials
     *       provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
     * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
     * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     * The views and conclusions contained in the software and documentation are those of the
     * authors and should not be interpreted as representing official policies, either expressed
     * or implied, of Gary Court.
     */
    var SCHEMES = {};
    function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
    }
    function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
            var c = parseInt(str.substr(i + 1, 2), 16);
            if (c < 128) {
                newStr += String.fromCharCode(c);
                i += 3;
            } else if (c >= 194 && c < 224) {
                if (il - i >= 6) {
                    var c2 = parseInt(str.substr(i + 4, 2), 16);
                    newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
                } else {
                    newStr += str.substr(i, 6);
                }
                i += 6;
            } else if (c >= 224) {
                if (il - i >= 9) {
                    var _c = parseInt(str.substr(i + 4, 2), 16);
                    var c3 = parseInt(str.substr(i + 7, 2), 16);
                    newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
                } else {
                    newStr += str.substr(i, 9);
                }
                i += 9;
            } else {
                newStr += str.substr(i, 3);
                i += 3;
            }
        }
        return newStr;
    }
    function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved(str) {
            var decStr = pctDecChars(str);
            return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
    }

    function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
    }
    function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];

        var _matches = slicedToArray(matches, 2),
            address = _matches[1];

        if (address) {
            return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
            return host;
        }
    }
    function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];

        var _matches2 = slicedToArray(matches, 3),
            address = _matches2[1],
            zone = _matches2[2];

        if (address) {
            var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
                _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
                last = _address$toLowerCase$2[0],
                first = _address$toLowerCase$2[1];

            var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
            var lastFields = last.split(":").map(_stripLeadingZeros);
            var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
            var fieldCount = isLastFieldIPv4Address ? 7 : 8;
            var lastFieldsStart = lastFields.length - fieldCount;
            var fields = Array(fieldCount);
            for (var x = 0; x < fieldCount; ++x) {
                fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
            }
            if (isLastFieldIPv4Address) {
                fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
            }
            var allZeroFields = fields.reduce(function (acc, field, index) {
                if (!field || field === "0") {
                    var lastLongest = acc[acc.length - 1];
                    if (lastLongest && lastLongest.index + lastLongest.length === index) {
                        lastLongest.length++;
                    } else {
                        acc.push({ index: index, length: 1 });
                    }
                }
                return acc;
            }, []);
            var longestZeroFields = allZeroFields.sort(function (a, b) {
                return b.length - a.length;
            })[0];
            var newHost = void 0;
            if (longestZeroFields && longestZeroFields.length > 1) {
                var newFirst = fields.slice(0, longestZeroFields.index);
                var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
                newHost = newFirst.join(":") + "::" + newLast.join(":");
            } else {
                newHost = fields.join(":");
            }
            if (zone) {
                newHost += "%" + zone;
            }
            return newHost;
        } else {
            return host;
        }
    }
    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
    function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
            if (NO_MATCH_IS_UNDEFINED) {
                //store each component
                components.scheme = matches[1];
                components.userinfo = matches[3];
                components.host = matches[4];
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = matches[7];
                components.fragment = matches[8];
                //fix port number
                if (isNaN(components.port)) {
                    components.port = matches[5];
                }
            } else {
                //IE FIX for improper RegExp matching
                //store each component
                components.scheme = matches[1] || undefined;
                components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
                components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
                components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
                //fix port number
                if (isNaN(components.port)) {
                    components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
                }
            }
            if (components.host) {
                //normalize IP hosts
                components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
            }
            //determine reference type
            if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
                components.reference = "same-document";
            } else if (components.scheme === undefined) {
                components.reference = "relative";
            } else if (components.fragment === undefined) {
                components.reference = "absolute";
            } else {
                components.reference = "uri";
            }
            //check for reference errors
            if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
                components.error = components.error || "URI is not a " + options.reference + " reference.";
            }
            //find scheme handler
            var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
            //check if scheme can't handle IRIs
            if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
                //if host component is a domain name
                if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                    }
                }
                //convert IRI -> URI
                _normalizeComponentEncoding(components, URI_PROTOCOL);
            } else {
                //normalize encodings
                _normalizeComponentEncoding(components, protocol);
            }
            //perform scheme specific parsing
            if (schemeHandler && schemeHandler.parse) {
                schemeHandler.parse(components, options);
            }
        } else {
            components.error = components.error || "URI can not be parsed.";
        }
        return components;
    }

    function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== undefined) {
            uriTokens.push(components.userinfo);
            uriTokens.push("@");
        }
        if (components.host !== undefined) {
            //normalize IP hosts, add brackets and escape zone separator for IPv6
            uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
                return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
            }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
            uriTokens.push(":");
            uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : undefined;
    }

    var RDS1 = /^\.\.?\//;
    var RDS2 = /^\/\.(\/|$)/;
    var RDS3 = /^\/\.\.(\/|$)/;
    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
    function removeDotSegments(input) {
        var output = [];
        while (input.length) {
            if (input.match(RDS1)) {
                input = input.replace(RDS1, "");
            } else if (input.match(RDS2)) {
                input = input.replace(RDS2, "/");
            } else if (input.match(RDS3)) {
                input = input.replace(RDS3, "/");
                output.pop();
            } else if (input === "." || input === "..") {
                input = "";
            } else {
                var im = input.match(RDS5);
                if (im) {
                    var s = im[0];
                    input = input.slice(s.length);
                    output.push(s);
                } else {
                    throw new Error("Unexpected dot segment condition");
                }
            }
        }
        return output.join("");
    }

    function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //perform scheme specific serialization
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
        if (components.host) {
            //if host component is an IPv6 address
            if (protocol.IPV6ADDRESS.test(components.host)) ;
            //TODO: normalize IPv6 address as per RFC 5952

            //if host component is a domain name
            else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                    //convert IDN via punycode
                    try {
                        components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                }
        }
        //normalize encoding
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
            uriTokens.push(components.scheme);
            uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== undefined) {
            if (options.reference !== "suffix") {
                uriTokens.push("//");
            }
            uriTokens.push(authority);
            if (components.path && components.path.charAt(0) !== "/") {
                uriTokens.push("/");
            }
        }
        if (components.path !== undefined) {
            var s = components.path;
            if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
                s = removeDotSegments(s);
            }
            if (authority === undefined) {
                s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
            }
            uriTokens.push(s);
        }
        if (components.query !== undefined) {
            uriTokens.push("?");
            uriTokens.push(components.query);
        }
        if (components.fragment !== undefined) {
            uriTokens.push("#");
            uriTokens.push(components.fragment);
        }
        return uriTokens.join(""); //merge tokens into a string
    }

    function resolveComponents(base, relative) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var skipNormalization = arguments[3];

        var target = {};
        if (!skipNormalization) {
            base = parse(serialize(base, options), options); //normalize base components
            relative = parse(serialize(relative, options), options); //normalize relative components
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
            target.scheme = relative.scheme;
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
                //target.authority = relative.authority;
                target.userinfo = relative.userinfo;
                target.host = relative.host;
                target.port = relative.port;
                target.path = removeDotSegments(relative.path || "");
                target.query = relative.query;
            } else {
                if (!relative.path) {
                    target.path = base.path;
                    if (relative.query !== undefined) {
                        target.query = relative.query;
                    } else {
                        target.query = base.query;
                    }
                } else {
                    if (relative.path.charAt(0) === "/") {
                        target.path = removeDotSegments(relative.path);
                    } else {
                        if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                            target.path = "/" + relative.path;
                        } else if (!base.path) {
                            target.path = relative.path;
                        } else {
                            target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                        }
                        target.path = removeDotSegments(target.path);
                    }
                    target.query = relative.query;
                }
                //target.authority = base.authority;
                target.userinfo = base.userinfo;
                target.host = base.host;
                target.port = base.port;
            }
            target.scheme = base.scheme;
        }
        target.fragment = relative.fragment;
        return target;
    }

    function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: 'null' }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
    }

    function normalize(uri, options) {
        if (typeof uri === "string") {
            uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
            uri = parse(serialize(uri, options), options);
        }
        return uri;
    }

    function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
            uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
            uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
            uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
            uriB = serialize(uriB, options);
        }
        return uriA === uriB;
    }

    function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
    }

    function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
    }

    var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse(components, options) {
            //report missing host
            if (!components.host) {
                components.error = components.error || "HTTP URIs must have a host.";
            }
            return components;
        },
        serialize: function serialize(components, options) {
            var secure = String(components.scheme).toLowerCase() === "https";
            //normalize the default port
            if (components.port === (secure ? 443 : 80) || components.port === "") {
                components.port = undefined;
            }
            //normalize the empty path
            if (!components.path) {
                components.path = "/";
            }
            //NOTE: We do not parse query strings for HTTP URIs
            //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
            //and not the HTTP spec.
            return components;
        }
    };

    var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
    };

    function isSecure(wsComponents) {
        return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
    }
    //RFC 6455
    var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse(components, options) {
            var wsComponents = components;
            //indicate if the secure flag is set
            wsComponents.secure = isSecure(wsComponents);
            //construct resouce name
            wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
            wsComponents.path = undefined;
            wsComponents.query = undefined;
            return wsComponents;
        },
        serialize: function serialize(wsComponents, options) {
            //normalize the default port
            if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
                wsComponents.port = undefined;
            }
            //ensure scheme matches secure flag
            if (typeof wsComponents.secure === 'boolean') {
                wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
                wsComponents.secure = undefined;
            }
            //reconstruct path from resource name
            if (wsComponents.resourceName) {
                var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                    _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                    path = _wsComponents$resourc2[0],
                    query = _wsComponents$resourc2[1];

                wsComponents.path = path && path !== '/' ? path : undefined;
                wsComponents.query = query;
                wsComponents.resourceName = undefined;
            }
            //forbid fragment component
            wsComponents.fragment = undefined;
            return wsComponents;
        }
    };

    var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
    };

    var O = {};
    //RFC 3986
    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + ( "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" ) + "]";
    var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
    //RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
    //const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
    //const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
    //const VCHAR$$ = "[\\x21-\\x7E]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
    //const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
    //const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
    //const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
    var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
    var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
    var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
    var NOT_HFVALUE = NOT_HFNAME;
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
    }
    var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
            var mailtoComponents = components;
            var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
            mailtoComponents.path = undefined;
            if (mailtoComponents.query) {
                var unknownHeaders = false;
                var headers = {};
                var hfields = mailtoComponents.query.split("&");
                for (var x = 0, xl = hfields.length; x < xl; ++x) {
                    var hfield = hfields[x].split("=");
                    switch (hfield[0]) {
                        case "to":
                            var toAddrs = hfield[1].split(",");
                            for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                                to.push(toAddrs[_x]);
                            }
                            break;
                        case "subject":
                            mailtoComponents.subject = unescapeComponent(hfield[1], options);
                            break;
                        case "body":
                            mailtoComponents.body = unescapeComponent(hfield[1], options);
                            break;
                        default:
                            unknownHeaders = true;
                            headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                            break;
                    }
                }
                if (unknownHeaders) mailtoComponents.headers = headers;
            }
            mailtoComponents.query = undefined;
            for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
                var addr = to[_x2].split("@");
                addr[0] = unescapeComponent(addr[0]);
                if (!options.unicodeSupport) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                    } catch (e) {
                        mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                    }
                } else {
                    addr[1] = unescapeComponent(addr[1], options).toLowerCase();
                }
                to[_x2] = addr.join("@");
            }
            return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
            var components = mailtoComponents;
            var to = toArray(mailtoComponents.to);
            if (to) {
                for (var x = 0, xl = to.length; x < xl; ++x) {
                    var toAddr = String(to[x]);
                    var atIdx = toAddr.lastIndexOf("@");
                    var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                    var domain = toAddr.slice(atIdx + 1);
                    //convert IDN via punycode
                    try {
                        domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                    } catch (e) {
                        components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                    to[x] = localPart + "@" + domain;
                }
                components.path = to.join(",");
            }
            var headers = mailtoComponents.headers = mailtoComponents.headers || {};
            if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
            if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
            var fields = [];
            for (var name in headers) {
                if (headers[name] !== O[name]) {
                    fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
                }
            }
            if (fields.length) {
                components.query = fields.join("&");
            }
            return components;
        }
    };

    var URN_PARSE = /^([^\:]+)\:(.*)/;
    //RFC 2141
    var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
            var matches = components.path && components.path.match(URN_PARSE);
            var urnComponents = components;
            if (matches) {
                var scheme = options.scheme || urnComponents.scheme || "urn";
                var nid = matches[1].toLowerCase();
                var nss = matches[2];
                var urnScheme = scheme + ":" + (options.nid || nid);
                var schemeHandler = SCHEMES[urnScheme];
                urnComponents.nid = nid;
                urnComponents.nss = nss;
                urnComponents.path = undefined;
                if (schemeHandler) {
                    urnComponents = schemeHandler.parse(urnComponents, options);
                }
            } else {
                urnComponents.error = urnComponents.error || "URN can not be parsed.";
            }
            return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = urnComponents.nid;
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            if (schemeHandler) {
                urnComponents = schemeHandler.serialize(urnComponents, options);
            }
            var uriComponents = urnComponents;
            var nss = urnComponents.nss;
            uriComponents.path = (nid || options.nid) + ":" + nss;
            return uriComponents;
        }
    };

    var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
    //RFC 4122
    var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse(urnComponents, options) {
            var uuidComponents = urnComponents;
            uuidComponents.uuid = uuidComponents.nss;
            uuidComponents.nss = undefined;
            if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
                uuidComponents.error = uuidComponents.error || "UUID is not valid.";
            }
            return uuidComponents;
        },
        serialize: function serialize(uuidComponents, options) {
            var urnComponents = uuidComponents;
            //normalize UUID
            urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
            return urnComponents;
        }
    };

    SCHEMES[handler.scheme] = handler;
    SCHEMES[handler$1.scheme] = handler$1;
    SCHEMES[handler$2.scheme] = handler$2;
    SCHEMES[handler$3.scheme] = handler$3;
    SCHEMES[handler$4.scheme] = handler$4;
    SCHEMES[handler$5.scheme] = handler$5;
    SCHEMES[handler$6.scheme] = handler$6;

    exports.SCHEMES = SCHEMES;
    exports.pctEncChar = pctEncChar;
    exports.pctDecChars = pctDecChars;
    exports.parse = parse;
    exports.removeDotSegments = removeDotSegments;
    exports.serialize = serialize;
    exports.resolveComponents = resolveComponents;
    exports.resolve = resolve;
    exports.normalize = normalize;
    exports.equal = equal;
    exports.escapeComponent = escapeComponent;
    exports.unescapeComponent = unescapeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

    })));

    });

    // do not edit .js files directly - edit src/index.jst



    var fastDeepEqual = function equal(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;

        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0;)
            if (!equal(a[i], b[i])) return false;
          return true;
        }



        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0;)
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = length; i-- !== 0;) {
          var key = keys[i];

          if (!equal(a[key], b[key])) return false;
        }

        return true;
      }

      // true if both NaN, false otherwise
      return a!==a && b!==b;
    };

    // https://mathiasbynens.be/notes/javascript-encoding
    // https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
    var ucs2length = function ucs2length(str) {
      var length = 0
        , len = str.length
        , pos = 0
        , value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
          // high surrogate, and there is a next character
          value = str.charCodeAt(pos);
          if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
        }
      }
      return length;
    };

    var util = {
      copy: copy,
      checkDataType: checkDataType,
      checkDataTypes: checkDataTypes,
      coerceToTypes: coerceToTypes,
      toHash: toHash,
      getProperty: getProperty,
      escapeQuotes: escapeQuotes,
      equal: fastDeepEqual,
      ucs2length: ucs2length,
      varOccurences: varOccurences,
      varReplace: varReplace,
      schemaHasRules: schemaHasRules,
      schemaHasRulesExcept: schemaHasRulesExcept,
      schemaUnknownRules: schemaUnknownRules,
      toQuotedString: toQuotedString,
      getPathExpr: getPathExpr,
      getPath: getPath,
      getData: getData,
      unescapeFragment: unescapeFragment,
      unescapeJsonPointer: unescapeJsonPointer,
      escapeFragment: escapeFragment,
      escapeJsonPointer: escapeJsonPointer
    };


    function copy(o, to) {
      to = to || {};
      for (var key in o) to[key] = o[key];
      return to;
    }


    function checkDataType(dataType, data, strictNumbers, negate) {
      var EQUAL = negate ? ' !== ' : ' === '
        , AND = negate ? ' || ' : ' && '
        , OK = negate ? '!' : ''
        , NOT = negate ? '' : '!';
      switch (dataType) {
        case 'null': return data + EQUAL + 'null';
        case 'array': return OK + 'Array.isArray(' + data + ')';
        case 'object': return '(' + OK + data + AND +
                              'typeof ' + data + EQUAL + '"object"' + AND +
                              NOT + 'Array.isArray(' + data + '))';
        case 'integer': return '(typeof ' + data + EQUAL + '"number"' + AND +
                               NOT + '(' + data + ' % 1)' +
                               AND + data + EQUAL + data +
                               (strictNumbers ? (AND + OK + 'isFinite(' + data + ')') : '') + ')';
        case 'number': return '(typeof ' + data + EQUAL + '"' + dataType + '"' +
                              (strictNumbers ? (AND + OK + 'isFinite(' + data + ')') : '') + ')';
        default: return 'typeof ' + data + EQUAL + '"' + dataType + '"';
      }
    }


    function checkDataTypes(dataTypes, data, strictNumbers) {
      switch (dataTypes.length) {
        case 1: return checkDataType(dataTypes[0], data, strictNumbers, true);
        default:
          var code = '';
          var types = toHash(dataTypes);
          if (types.array && types.object) {
            code = types.null ? '(': '(!' + data + ' || ';
            code += 'typeof ' + data + ' !== "object")';
            delete types.null;
            delete types.array;
            delete types.object;
          }
          if (types.number) delete types.integer;
          for (var t in types)
            code += (code ? ' && ' : '' ) + checkDataType(t, data, strictNumbers, true);

          return code;
      }
    }


    var COERCE_TO_TYPES = toHash([ 'string', 'number', 'integer', 'boolean', 'null' ]);
    function coerceToTypes(optionCoerceTypes, dataTypes) {
      if (Array.isArray(dataTypes)) {
        var types = [];
        for (var i=0; i<dataTypes.length; i++) {
          var t = dataTypes[i];
          if (COERCE_TO_TYPES[t]) types[types.length] = t;
          else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
        }
        if (types.length) return types;
      } else if (COERCE_TO_TYPES[dataTypes]) {
        return [dataTypes];
      } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
        return ['array'];
      }
    }


    function toHash(arr) {
      var hash = {};
      for (var i=0; i<arr.length; i++) hash[arr[i]] = true;
      return hash;
    }


    var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var SINGLE_QUOTE = /'|\\/g;
    function getProperty(key) {
      return typeof key == 'number'
              ? '[' + key + ']'
              : IDENTIFIER.test(key)
                ? '.' + key
                : "['" + escapeQuotes(key) + "']";
    }


    function escapeQuotes(str) {
      return str.replace(SINGLE_QUOTE, '\\$&')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\f/g, '\\f')
                .replace(/\t/g, '\\t');
    }


    function varOccurences(str, dataVar) {
      dataVar += '[^0-9]';
      var matches = str.match(new RegExp(dataVar, 'g'));
      return matches ? matches.length : 0;
    }


    function varReplace(str, dataVar, expr) {
      dataVar += '([^0-9])';
      expr = expr.replace(/\$/g, '$$$$');
      return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
    }


    function schemaHasRules(schema, rules) {
      if (typeof schema == 'boolean') return !schema;
      for (var key in schema) if (rules[key]) return true;
    }


    function schemaHasRulesExcept(schema, rules, exceptKeyword) {
      if (typeof schema == 'boolean') return !schema && exceptKeyword != 'not';
      for (var key in schema) if (key != exceptKeyword && rules[key]) return true;
    }


    function schemaUnknownRules(schema, rules) {
      if (typeof schema == 'boolean') return;
      for (var key in schema) if (!rules[key]) return key;
    }


    function toQuotedString(str) {
      return '\'' + escapeQuotes(str) + '\'';
    }


    function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
      var path = jsonPointers // false by default
                  ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')')
                  : (isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'');
      return joinPaths(currentPath, path);
    }


    function getPath(currentPath, prop, jsonPointers) {
      var path = jsonPointers // false by default
                  ? toQuotedString('/' + escapeJsonPointer(prop))
                  : toQuotedString(getProperty(prop));
      return joinPaths(currentPath, path);
    }


    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, lvl, paths) {
      var up, jsonPointer, data, matches;
      if ($data === '') return 'rootData';
      if ($data[0] == '/') {
        if (!JSON_POINTER.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
        jsonPointer = $data;
        data = 'rootData';
      } else {
        matches = $data.match(RELATIVE_JSON_POINTER);
        if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
        up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer == '#') {
          if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
          return paths[lvl - up];
        }

        if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
        data = 'data' + ((lvl - up) || '');
        if (!jsonPointer) return data;
      }

      var expr = data;
      var segments = jsonPointer.split('/');
      for (var i=0; i<segments.length; i++) {
        var segment = segments[i];
        if (segment) {
          data += getProperty(unescapeJsonPointer(segment));
          expr += ' && ' + data;
        }
      }
      return expr;
    }


    function joinPaths (a, b) {
      if (a == '""') return b;
      return (a + ' + ' + b).replace(/([^\\])' \+ '/g, '$1');
    }


    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }


    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }


    function escapeJsonPointer(str) {
      return str.replace(/~/g, '~0').replace(/\//g, '~1');
    }


    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, '/').replace(/~0/g, '~');
    }

    var schema_obj = SchemaObject;

    function SchemaObject(obj) {
      util.copy(obj, this);
    }

    var jsonSchemaTraverse = createCommonjsModule(function (module) {

    var traverse = module.exports = function (schema, opts, cb) {
      // Legacy support for v0.3.1 and earlier.
      if (typeof opts == 'function') {
        cb = opts;
        opts = {};
      }

      cb = opts.cb || cb;
      var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
      var post = cb.post || function() {};

      _traverse(opts, pre, post, schema, '', schema);
    };


    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true
    };

    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };

    traverse.propsKeywords = {
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };

    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };


    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i=0; i<sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == 'object') {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
            _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }


    function escapeJsonPtr(str) {
      return str.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    });

    var resolve_1 = resolve;

    resolve.normalizeId = normalizeId;
    resolve.fullPath = getFullPath;
    resolve.url = resolveUrl;
    resolve.ids = resolveIds;
    resolve.inlineRef = inlineRef;
    resolve.schema = resolveSchema;

    /**
     * [resolve and compile the references ($ref)]
     * @this   Ajv
     * @param  {Function} compile reference to schema compilation funciton (localCompile)
     * @param  {Object} root object with information about the root schema for the current schema
     * @param  {String} ref reference to resolve
     * @return {Object|Function} schema object (if the schema can be inlined) or validation function
     */
    function resolve(compile, root, ref) {
      /* jshint validthis: true */
      var refVal = this._refs[ref];
      if (typeof refVal == 'string') {
        if (this._refs[refVal]) refVal = this._refs[refVal];
        else return resolve.call(this, compile, root, refVal);
      }

      refVal = refVal || this._schemas[ref];
      if (refVal instanceof schema_obj) {
        return inlineRef(refVal.schema, this._opts.inlineRefs)
                ? refVal.schema
                : refVal.validate || this._compile(refVal);
      }

      var res = resolveSchema.call(this, root, ref);
      var schema, v, baseId;
      if (res) {
        schema = res.schema;
        root = res.root;
        baseId = res.baseId;
      }

      if (schema instanceof schema_obj) {
        v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
      } else if (schema !== undefined) {
        v = inlineRef(schema, this._opts.inlineRefs)
            ? schema
            : compile.call(this, schema, root, undefined, baseId);
      }

      return v;
    }


    /**
     * Resolve schema, its root and baseId
     * @this Ajv
     * @param  {Object} root root object with properties schema, refVal, refs
     * @param  {String} ref  reference to resolve
     * @return {Object} object with properties schema, root, baseId
     */
    function resolveSchema(root, ref) {
      /* jshint validthis: true */
      var p = uri_all.parse(ref)
        , refPath = _getFullPath(p)
        , baseId = getFullPath(this._getId(root.schema));
      if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
        var id = normalizeId(refPath);
        var refVal = this._refs[id];
        if (typeof refVal == 'string') {
          return resolveRecursive.call(this, root, refVal, p);
        } else if (refVal instanceof schema_obj) {
          if (!refVal.validate) this._compile(refVal);
          root = refVal;
        } else {
          refVal = this._schemas[id];
          if (refVal instanceof schema_obj) {
            if (!refVal.validate) this._compile(refVal);
            if (id == normalizeId(ref))
              return { schema: refVal, root: root, baseId: baseId };
            root = refVal;
          } else {
            return;
          }
        }
        if (!root.schema) return;
        baseId = getFullPath(this._getId(root.schema));
      }
      return getJsonPointer.call(this, p, baseId, root.schema, root);
    }


    /* @this Ajv */
    function resolveRecursive(root, ref, parsedRef) {
      /* jshint validthis: true */
      var res = resolveSchema.call(this, root, ref);
      if (res) {
        var schema = res.schema;
        var baseId = res.baseId;
        root = res.root;
        var id = this._getId(schema);
        if (id) baseId = resolveUrl(baseId, id);
        return getJsonPointer.call(this, parsedRef, baseId, schema, root);
      }
    }


    var PREVENT_SCOPE_CHANGE = util.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
    /* @this Ajv */
    function getJsonPointer(parsedRef, baseId, schema, root) {
      /* jshint validthis: true */
      parsedRef.fragment = parsedRef.fragment || '';
      if (parsedRef.fragment.slice(0,1) != '/') return;
      var parts = parsedRef.fragment.split('/');

      for (var i = 1; i < parts.length; i++) {
        var part = parts[i];
        if (part) {
          part = util.unescapeFragment(part);
          schema = schema[part];
          if (schema === undefined) break;
          var id;
          if (!PREVENT_SCOPE_CHANGE[part]) {
            id = this._getId(schema);
            if (id) baseId = resolveUrl(baseId, id);
            if (schema.$ref) {
              var $ref = resolveUrl(baseId, schema.$ref);
              var res = resolveSchema.call(this, root, $ref);
              if (res) {
                schema = res.schema;
                root = res.root;
                baseId = res.baseId;
              }
            }
          }
        }
      }
      if (schema !== undefined && schema !== root.schema)
        return { schema: schema, root: root, baseId: baseId };
    }


    var SIMPLE_INLINED = util.toHash([
      'type', 'format', 'pattern',
      'maxLength', 'minLength',
      'maxProperties', 'minProperties',
      'maxItems', 'minItems',
      'maximum', 'minimum',
      'uniqueItems', 'multipleOf',
      'required', 'enum'
    ]);
    function inlineRef(schema, limit) {
      if (limit === false) return false;
      if (limit === undefined || limit === true) return checkNoRef(schema);
      else if (limit) return countKeys(schema) <= limit;
    }


    function checkNoRef(schema) {
      var item;
      if (Array.isArray(schema)) {
        for (var i=0; i<schema.length; i++) {
          item = schema[i];
          if (typeof item == 'object' && !checkNoRef(item)) return false;
        }
      } else {
        for (var key in schema) {
          if (key == '$ref') return false;
          item = schema[key];
          if (typeof item == 'object' && !checkNoRef(item)) return false;
        }
      }
      return true;
    }


    function countKeys(schema) {
      var count = 0, item;
      if (Array.isArray(schema)) {
        for (var i=0; i<schema.length; i++) {
          item = schema[i];
          if (typeof item == 'object') count += countKeys(item);
          if (count == Infinity) return Infinity;
        }
      } else {
        for (var key in schema) {
          if (key == '$ref') return Infinity;
          if (SIMPLE_INLINED[key]) {
            count++;
          } else {
            item = schema[key];
            if (typeof item == 'object') count += countKeys(item) + 1;
            if (count == Infinity) return Infinity;
          }
        }
      }
      return count;
    }


    function getFullPath(id, normalize) {
      if (normalize !== false) id = normalizeId(id);
      var p = uri_all.parse(id);
      return _getFullPath(p);
    }


    function _getFullPath(p) {
      return uri_all.serialize(p).split('#')[0] + '#';
    }


    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
    }


    function resolveUrl(baseId, id) {
      id = normalizeId(id);
      return uri_all.resolve(baseId, id);
    }


    /* @this Ajv */
    function resolveIds(schema) {
      var schemaId = normalizeId(this._getId(schema));
      var baseIds = {'': schemaId};
      var fullPaths = {'': getFullPath(schemaId, false)};
      var localRefs = {};
      var self = this;

      jsonSchemaTraverse(schema, {allKeys: true}, function(sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
        if (jsonPtr === '') return;
        var id = self._getId(sch);
        var baseId = baseIds[parentJsonPtr];
        var fullPath = fullPaths[parentJsonPtr] + '/' + parentKeyword;
        if (keyIndex !== undefined)
          fullPath += '/' + (typeof keyIndex == 'number' ? keyIndex : util.escapeFragment(keyIndex));

        if (typeof id == 'string') {
          id = baseId = normalizeId(baseId ? uri_all.resolve(baseId, id) : id);

          var refVal = self._refs[id];
          if (typeof refVal == 'string') refVal = self._refs[refVal];
          if (refVal && refVal.schema) {
            if (!fastDeepEqual(sch, refVal.schema))
              throw new Error('id "' + id + '" resolves to more than one schema');
          } else if (id != normalizeId(fullPath)) {
            if (id[0] == '#') {
              if (localRefs[id] && !fastDeepEqual(sch, localRefs[id]))
                throw new Error('id "' + id + '" resolves to more than one schema');
              localRefs[id] = sch;
            } else {
              self._refs[id] = fullPath;
            }
          }
        }
        baseIds[jsonPtr] = baseId;
        fullPaths[jsonPtr] = fullPath;
      });

      return localRefs;
    }

    var error_classes = {
      Validation: errorSubclass(ValidationError),
      MissingRef: errorSubclass(MissingRefError)
    };


    function ValidationError(errors) {
      this.message = 'validation failed';
      this.errors = errors;
      this.ajv = this.validation = true;
    }


    MissingRefError.message = function (baseId, ref) {
      return 'can\'t resolve reference ' + ref + ' from id ' + baseId;
    };


    function MissingRefError(baseId, ref, message) {
      this.message = message || MissingRefError.message(baseId, ref);
      this.missingRef = resolve_1.url(baseId, ref);
      this.missingSchema = resolve_1.normalizeId(resolve_1.fullPath(this.missingRef));
    }


    function errorSubclass(Subclass) {
      Subclass.prototype = Object.create(Error.prototype);
      Subclass.prototype.constructor = Subclass;
      return Subclass;
    }

    var fastJsonStableStringify = function (data, opts) {
        if (!opts) opts = {};
        if (typeof opts === 'function') opts = { cmp: opts };
        var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

        var cmp = opts.cmp && (function (f) {
            return function (node) {
                return function (a, b) {
                    var aobj = { key: a, value: node[a] };
                    var bobj = { key: b, value: node[b] };
                    return f(aobj, bobj);
                };
            };
        })(opts.cmp);

        var seen = [];
        return (function stringify (node) {
            if (node && node.toJSON && typeof node.toJSON === 'function') {
                node = node.toJSON();
            }

            if (node === undefined) return;
            if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
            if (typeof node !== 'object') return JSON.stringify(node);

            var i, out;
            if (Array.isArray(node)) {
                out = '[';
                for (i = 0; i < node.length; i++) {
                    if (i) out += ',';
                    out += stringify(node[i]) || 'null';
                }
                return out + ']';
            }

            if (node === null) return 'null';

            if (seen.indexOf(node) !== -1) {
                if (cycles) return JSON.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }

            var seenIndex = seen.push(node) - 1;
            var keys = Object.keys(node).sort(cmp && cmp(node));
            out = '';
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node[key]);

                if (!value) continue;
                if (out) out += ',';
                out += JSON.stringify(key) + ':' + value;
            }
            seen.splice(seenIndex, 1);
            return '{' + out + '}';
        })(data);
    };

    var validate = function generate_validate(it, $keyword, $ruleType) {
      var out = '';
      var $async = it.schema.$async === true,
        $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'),
        $id = it.self._getId(it.schema);
      if (it.opts.strictKeywords) {
        var $unknownKwd = it.util.schemaUnknownRules(it.schema, it.RULES.keywords);
        if ($unknownKwd) {
          var $keywordsMsg = 'unknown keyword: ' + $unknownKwd;
          if (it.opts.strictKeywords === 'log') it.logger.warn($keywordsMsg);
          else throw new Error($keywordsMsg);
        }
      }
      if (it.isTop) {
        out += ' var validate = ';
        if ($async) {
          it.async = true;
          out += 'async ';
        }
        out += 'function(data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; ';
        if ($id && (it.opts.sourceCode || it.opts.processCode)) {
          out += ' ' + ('/\*# sourceURL=' + $id + ' */') + ' ';
        }
      }
      if (typeof it.schema == 'boolean' || !($refKeywords || it.schema.$ref)) {
        var $keyword = 'false schema';
        var $lvl = it.level;
        var $dataLvl = it.dataLevel;
        var $schema = it.schema[$keyword];
        var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
        var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
        var $breakOnError = !it.opts.allErrors;
        var $errorKeyword;
        var $data = 'data' + ($dataLvl || '');
        var $valid = 'valid' + $lvl;
        if (it.schema === false) {
          if (it.isTop) {
            $breakOnError = true;
          } else {
            out += ' var ' + ($valid) + ' = false; ';
          }
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = ''; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ($errorKeyword || 'false schema') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
            if (it.opts.messages !== false) {
              out += ' , message: \'boolean schema is false\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError([' + (__err) + ']); ';
            } else {
              out += ' validate.errors = [' + (__err) + ']; return false; ';
            }
          } else {
            out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          }
        } else {
          if (it.isTop) {
            if ($async) {
              out += ' return data; ';
            } else {
              out += ' validate.errors = null; return true; ';
            }
          } else {
            out += ' var ' + ($valid) + ' = true; ';
          }
        }
        if (it.isTop) {
          out += ' }; return validate; ';
        }
        return out;
      }
      if (it.isTop) {
        var $top = it.isTop,
          $lvl = it.level = 0,
          $dataLvl = it.dataLevel = 0,
          $data = 'data';
        it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
        it.baseId = it.baseId || it.rootId;
        delete it.isTop;
        it.dataPathArr = [undefined];
        if (it.schema.default !== undefined && it.opts.useDefaults && it.opts.strictDefaults) {
          var $defaultMsg = 'default is ignored in the schema root';
          if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
          else throw new Error($defaultMsg);
        }
        out += ' var vErrors = null; ';
        out += ' var errors = 0;     ';
        out += ' if (rootData === undefined) rootData = data; ';
      } else {
        var $lvl = it.level,
          $dataLvl = it.dataLevel,
          $data = 'data' + ($dataLvl || '');
        if ($id) it.baseId = it.resolve.url(it.baseId, $id);
        if ($async && !it.async) throw new Error('async schema in sync schema');
        out += ' var errs_' + ($lvl) + ' = errors;';
      }
      var $valid = 'valid' + $lvl,
        $breakOnError = !it.opts.allErrors,
        $closingBraces1 = '',
        $closingBraces2 = '';
      var $errorKeyword;
      var $typeSchema = it.schema.type,
        $typeIsArray = Array.isArray($typeSchema);
      if ($typeSchema && it.opts.nullable && it.schema.nullable === true) {
        if ($typeIsArray) {
          if ($typeSchema.indexOf('null') == -1) $typeSchema = $typeSchema.concat('null');
        } else if ($typeSchema != 'null') {
          $typeSchema = [$typeSchema, 'null'];
          $typeIsArray = true;
        }
      }
      if ($typeIsArray && $typeSchema.length == 1) {
        $typeSchema = $typeSchema[0];
        $typeIsArray = false;
      }
      if (it.schema.$ref && $refKeywords) {
        if (it.opts.extendRefs == 'fail') {
          throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
        } else if (it.opts.extendRefs !== true) {
          $refKeywords = false;
          it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
        }
      }
      if (it.schema.$comment && it.opts.$comment) {
        out += ' ' + (it.RULES.all.$comment.code(it, '$comment'));
      }
      if ($typeSchema) {
        if (it.opts.coerceTypes) {
          var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
        }
        var $rulesGroup = it.RULES.types[$typeSchema];
        if ($coerceToTypes || $typeIsArray || $rulesGroup === true || ($rulesGroup && !$shouldUseGroup($rulesGroup))) {
          var $schemaPath = it.schemaPath + '.type',
            $errSchemaPath = it.errSchemaPath + '/type';
          var $schemaPath = it.schemaPath + '.type',
            $errSchemaPath = it.errSchemaPath + '/type',
            $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
          out += ' if (' + (it.util[$method]($typeSchema, $data, it.opts.strictNumbers, true)) + ') { ';
          if ($coerceToTypes) {
            var $dataType = 'dataType' + $lvl,
              $coerced = 'coerced' + $lvl;
            out += ' var ' + ($dataType) + ' = typeof ' + ($data) + '; var ' + ($coerced) + ' = undefined; ';
            if (it.opts.coerceTypes == 'array') {
              out += ' if (' + ($dataType) + ' == \'object\' && Array.isArray(' + ($data) + ') && ' + ($data) + '.length == 1) { ' + ($data) + ' = ' + ($data) + '[0]; ' + ($dataType) + ' = typeof ' + ($data) + '; if (' + (it.util.checkDataType(it.schema.type, $data, it.opts.strictNumbers)) + ') ' + ($coerced) + ' = ' + ($data) + '; } ';
            }
            out += ' if (' + ($coerced) + ' !== undefined) ; ';
            var arr1 = $coerceToTypes;
            if (arr1) {
              var $type, $i = -1,
                l1 = arr1.length - 1;
              while ($i < l1) {
                $type = arr1[$i += 1];
                if ($type == 'string') {
                  out += ' else if (' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\') ' + ($coerced) + ' = \'\' + ' + ($data) + '; else if (' + ($data) + ' === null) ' + ($coerced) + ' = \'\'; ';
                } else if ($type == 'number' || $type == 'integer') {
                  out += ' else if (' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' === null || (' + ($dataType) + ' == \'string\' && ' + ($data) + ' && ' + ($data) + ' == +' + ($data) + ' ';
                  if ($type == 'integer') {
                    out += ' && !(' + ($data) + ' % 1)';
                  }
                  out += ')) ' + ($coerced) + ' = +' + ($data) + '; ';
                } else if ($type == 'boolean') {
                  out += ' else if (' + ($data) + ' === \'false\' || ' + ($data) + ' === 0 || ' + ($data) + ' === null) ' + ($coerced) + ' = false; else if (' + ($data) + ' === \'true\' || ' + ($data) + ' === 1) ' + ($coerced) + ' = true; ';
                } else if ($type == 'null') {
                  out += ' else if (' + ($data) + ' === \'\' || ' + ($data) + ' === 0 || ' + ($data) + ' === false) ' + ($coerced) + ' = null; ';
                } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
                  out += ' else if (' + ($dataType) + ' == \'string\' || ' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' == null) ' + ($coerced) + ' = [' + ($data) + ']; ';
                }
              }
            }
            out += ' else {   ';
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
              if ($typeIsArray) {
                out += '' + ($typeSchema.join(","));
              } else {
                out += '' + ($typeSchema);
              }
              out += '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should be ';
                if ($typeIsArray) {
                  out += '' + ($typeSchema.join(","));
                } else {
                  out += '' + ($typeSchema);
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
            out += ' } if (' + ($coerced) + ' !== undefined) {  ';
            var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
              $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
            out += ' ' + ($data) + ' = ' + ($coerced) + '; ';
            if (!$dataLvl) {
              out += 'if (' + ($parentData) + ' !== undefined)';
            }
            out += ' ' + ($parentData) + '[' + ($parentDataProperty) + '] = ' + ($coerced) + '; } ';
          } else {
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
              if ($typeIsArray) {
                out += '' + ($typeSchema.join(","));
              } else {
                out += '' + ($typeSchema);
              }
              out += '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should be ';
                if ($typeIsArray) {
                  out += '' + ($typeSchema.join(","));
                } else {
                  out += '' + ($typeSchema);
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
          }
          out += ' } ';
        }
      }
      if (it.schema.$ref && !$refKeywords) {
        out += ' ' + (it.RULES.all.$ref.code(it, '$ref')) + ' ';
        if ($breakOnError) {
          out += ' } if (errors === ';
          if ($top) {
            out += '0';
          } else {
            out += 'errs_' + ($lvl);
          }
          out += ') { ';
          $closingBraces2 += '}';
        }
      } else {
        var arr2 = it.RULES;
        if (arr2) {
          var $rulesGroup, i2 = -1,
            l2 = arr2.length - 1;
          while (i2 < l2) {
            $rulesGroup = arr2[i2 += 1];
            if ($shouldUseGroup($rulesGroup)) {
              if ($rulesGroup.type) {
                out += ' if (' + (it.util.checkDataType($rulesGroup.type, $data, it.opts.strictNumbers)) + ') { ';
              }
              if (it.opts.useDefaults) {
                if ($rulesGroup.type == 'object' && it.schema.properties) {
                  var $schema = it.schema.properties,
                    $schemaKeys = Object.keys($schema);
                  var arr3 = $schemaKeys;
                  if (arr3) {
                    var $propertyKey, i3 = -1,
                      l3 = arr3.length - 1;
                    while (i3 < l3) {
                      $propertyKey = arr3[i3 += 1];
                      var $sch = $schema[$propertyKey];
                      if ($sch.default !== undefined) {
                        var $passData = $data + it.util.getProperty($propertyKey);
                        if (it.compositeRule) {
                          if (it.opts.strictDefaults) {
                            var $defaultMsg = 'default is ignored for: ' + $passData;
                            if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
                            else throw new Error($defaultMsg);
                          }
                        } else {
                          out += ' if (' + ($passData) + ' === undefined ';
                          if (it.opts.useDefaults == 'empty') {
                            out += ' || ' + ($passData) + ' === null || ' + ($passData) + ' === \'\' ';
                          }
                          out += ' ) ' + ($passData) + ' = ';
                          if (it.opts.useDefaults == 'shared') {
                            out += ' ' + (it.useDefault($sch.default)) + ' ';
                          } else {
                            out += ' ' + (JSON.stringify($sch.default)) + ' ';
                          }
                          out += '; ';
                        }
                      }
                    }
                  }
                } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
                  var arr4 = it.schema.items;
                  if (arr4) {
                    var $sch, $i = -1,
                      l4 = arr4.length - 1;
                    while ($i < l4) {
                      $sch = arr4[$i += 1];
                      if ($sch.default !== undefined) {
                        var $passData = $data + '[' + $i + ']';
                        if (it.compositeRule) {
                          if (it.opts.strictDefaults) {
                            var $defaultMsg = 'default is ignored for: ' + $passData;
                            if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
                            else throw new Error($defaultMsg);
                          }
                        } else {
                          out += ' if (' + ($passData) + ' === undefined ';
                          if (it.opts.useDefaults == 'empty') {
                            out += ' || ' + ($passData) + ' === null || ' + ($passData) + ' === \'\' ';
                          }
                          out += ' ) ' + ($passData) + ' = ';
                          if (it.opts.useDefaults == 'shared') {
                            out += ' ' + (it.useDefault($sch.default)) + ' ';
                          } else {
                            out += ' ' + (JSON.stringify($sch.default)) + ' ';
                          }
                          out += '; ';
                        }
                      }
                    }
                  }
                }
              }
              var arr5 = $rulesGroup.rules;
              if (arr5) {
                var $rule, i5 = -1,
                  l5 = arr5.length - 1;
                while (i5 < l5) {
                  $rule = arr5[i5 += 1];
                  if ($shouldUseRule($rule)) {
                    var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
                    if ($code) {
                      out += ' ' + ($code) + ' ';
                      if ($breakOnError) {
                        $closingBraces1 += '}';
                      }
                    }
                  }
                }
              }
              if ($breakOnError) {
                out += ' ' + ($closingBraces1) + ' ';
                $closingBraces1 = '';
              }
              if ($rulesGroup.type) {
                out += ' } ';
                if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
                  out += ' else { ';
                  var $schemaPath = it.schemaPath + '.type',
                    $errSchemaPath = it.errSchemaPath + '/type';
                  var $$outStack = $$outStack || [];
                  $$outStack.push(out);
                  out = ''; /* istanbul ignore else */
                  if (it.createErrors !== false) {
                    out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
                    if ($typeIsArray) {
                      out += '' + ($typeSchema.join(","));
                    } else {
                      out += '' + ($typeSchema);
                    }
                    out += '\' } ';
                    if (it.opts.messages !== false) {
                      out += ' , message: \'should be ';
                      if ($typeIsArray) {
                        out += '' + ($typeSchema.join(","));
                      } else {
                        out += '' + ($typeSchema);
                      }
                      out += '\' ';
                    }
                    if (it.opts.verbose) {
                      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                    }
                    out += ' } ';
                  } else {
                    out += ' {} ';
                  }
                  var __err = out;
                  out = $$outStack.pop();
                  if (!it.compositeRule && $breakOnError) {
                    /* istanbul ignore if */
                    if (it.async) {
                      out += ' throw new ValidationError([' + (__err) + ']); ';
                    } else {
                      out += ' validate.errors = [' + (__err) + ']; return false; ';
                    }
                  } else {
                    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
                  }
                  out += ' } ';
                }
              }
              if ($breakOnError) {
                out += ' if (errors === ';
                if ($top) {
                  out += '0';
                } else {
                  out += 'errs_' + ($lvl);
                }
                out += ') { ';
                $closingBraces2 += '}';
              }
            }
          }
        }
      }
      if ($breakOnError) {
        out += ' ' + ($closingBraces2) + ' ';
      }
      if ($top) {
        if ($async) {
          out += ' if (errors === 0) return data;           ';
          out += ' else throw new ValidationError(vErrors); ';
        } else {
          out += ' validate.errors = vErrors; ';
          out += ' return errors === 0;       ';
        }
        out += ' }; return validate;';
      } else {
        out += ' var ' + ($valid) + ' = errors === errs_' + ($lvl) + ';';
      }

      function $shouldUseGroup($rulesGroup) {
        var rules = $rulesGroup.rules;
        for (var i = 0; i < rules.length; i++)
          if ($shouldUseRule(rules[i])) return true;
      }

      function $shouldUseRule($rule) {
        return it.schema[$rule.keyword] !== undefined || ($rule.implements && $ruleImplementsSomeKeyword($rule));
      }

      function $ruleImplementsSomeKeyword($rule) {
        var impl = $rule.implements;
        for (var i = 0; i < impl.length; i++)
          if (it.schema[impl[i]] !== undefined) return true;
      }
      return out;
    };

    /**
     * Functions below are used inside compiled validations function
     */

    var ucs2length$1 = util.ucs2length;


    // this error is thrown by async schemas to return validation errors via exception
    var ValidationError$1 = error_classes.Validation;

    var compile_1 = compile;


    /**
     * Compiles schema to validation function
     * @this   Ajv
     * @param  {Object} schema schema object
     * @param  {Object} root object with information about the root schema for this schema
     * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
     * @param  {String} baseId base ID for IDs in the schema
     * @return {Function} validation function
     */
    function compile(schema, root, localRefs, baseId) {
      /* jshint validthis: true, evil: true */
      /* eslint no-shadow: 0 */
      var self = this
        , opts = this._opts
        , refVal = [ undefined ]
        , refs = {}
        , patterns = []
        , patternsHash = {}
        , defaults = []
        , defaultsHash = {}
        , customRules = [];

      root = root || { schema: schema, refVal: refVal, refs: refs };

      var c = checkCompiling.call(this, schema, root, baseId);
      var compilation = this._compilations[c.index];
      if (c.compiling) return (compilation.callValidate = callValidate);

      var formats = this._formats;
      var RULES = this.RULES;

      try {
        var v = localCompile(schema, root, localRefs, baseId);
        compilation.validate = v;
        var cv = compilation.callValidate;
        if (cv) {
          cv.schema = v.schema;
          cv.errors = null;
          cv.refs = v.refs;
          cv.refVal = v.refVal;
          cv.root = v.root;
          cv.$async = v.$async;
          if (opts.sourceCode) cv.source = v.source;
        }
        return v;
      } finally {
        endCompiling.call(this, schema, root, baseId);
      }

      /* @this   {*} - custom context, see passContext option */
      function callValidate() {
        /* jshint validthis: true */
        var validate = compilation.validate;
        var result = validate.apply(this, arguments);
        callValidate.errors = validate.errors;
        return result;
      }

      function localCompile(_schema, _root, localRefs, baseId) {
        var isRoot = !_root || (_root && _root.schema == _schema);
        if (_root.schema != root.schema)
          return compile.call(self, _schema, _root, localRefs, baseId);

        var $async = _schema.$async === true;

        var sourceCode = validate({
          isTop: true,
          schema: _schema,
          isRoot: isRoot,
          baseId: baseId,
          root: _root,
          schemaPath: '',
          errSchemaPath: '#',
          errorPath: '""',
          MissingRefError: error_classes.MissingRef,
          RULES: RULES,
          validate: validate,
          util: util,
          resolve: resolve_1,
          resolveRef: resolveRef,
          usePattern: usePattern,
          useDefault: useDefault,
          useCustomRule: useCustomRule,
          opts: opts,
          formats: formats,
          logger: self.logger,
          self: self
        });

        sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode)
                       + vars(defaults, defaultCode) + vars(customRules, customRuleCode)
                       + sourceCode;

        if (opts.processCode) sourceCode = opts.processCode(sourceCode, _schema);
        // console.log('\n\n\n *** \n', JSON.stringify(sourceCode));
        var validate$1;
        try {
          var makeValidate = new Function(
            'self',
            'RULES',
            'formats',
            'root',
            'refVal',
            'defaults',
            'customRules',
            'equal',
            'ucs2length',
            'ValidationError',
            sourceCode
          );

          validate$1 = makeValidate(
            self,
            RULES,
            formats,
            root,
            refVal,
            defaults,
            customRules,
            fastDeepEqual,
            ucs2length$1,
            ValidationError$1
          );

          refVal[0] = validate$1;
        } catch(e) {
          self.logger.error('Error compiling schema, function code:', sourceCode);
          throw e;
        }

        validate$1.schema = _schema;
        validate$1.errors = null;
        validate$1.refs = refs;
        validate$1.refVal = refVal;
        validate$1.root = isRoot ? validate$1 : _root;
        if ($async) validate$1.$async = true;
        if (opts.sourceCode === true) {
          validate$1.source = {
            code: sourceCode,
            patterns: patterns,
            defaults: defaults
          };
        }

        return validate$1;
      }

      function resolveRef(baseId, ref, isRoot) {
        ref = resolve_1.url(baseId, ref);
        var refIndex = refs[ref];
        var _refVal, refCode;
        if (refIndex !== undefined) {
          _refVal = refVal[refIndex];
          refCode = 'refVal[' + refIndex + ']';
          return resolvedRef(_refVal, refCode);
        }
        if (!isRoot && root.refs) {
          var rootRefId = root.refs[ref];
          if (rootRefId !== undefined) {
            _refVal = root.refVal[rootRefId];
            refCode = addLocalRef(ref, _refVal);
            return resolvedRef(_refVal, refCode);
          }
        }

        refCode = addLocalRef(ref);
        var v = resolve_1.call(self, localCompile, root, ref);
        if (v === undefined) {
          var localSchema = localRefs && localRefs[ref];
          if (localSchema) {
            v = resolve_1.inlineRef(localSchema, opts.inlineRefs)
                ? localSchema
                : compile.call(self, localSchema, root, localRefs, baseId);
          }
        }

        if (v === undefined) {
          removeLocalRef(ref);
        } else {
          replaceLocalRef(ref, v);
          return resolvedRef(v, refCode);
        }
      }

      function addLocalRef(ref, v) {
        var refId = refVal.length;
        refVal[refId] = v;
        refs[ref] = refId;
        return 'refVal' + refId;
      }

      function removeLocalRef(ref) {
        delete refs[ref];
      }

      function replaceLocalRef(ref, v) {
        var refId = refs[ref];
        refVal[refId] = v;
      }

      function resolvedRef(refVal, code) {
        return typeof refVal == 'object' || typeof refVal == 'boolean'
                ? { code: code, schema: refVal, inline: true }
                : { code: code, $async: refVal && !!refVal.$async };
      }

      function usePattern(regexStr) {
        var index = patternsHash[regexStr];
        if (index === undefined) {
          index = patternsHash[regexStr] = patterns.length;
          patterns[index] = regexStr;
        }
        return 'pattern' + index;
      }

      function useDefault(value) {
        switch (typeof value) {
          case 'boolean':
          case 'number':
            return '' + value;
          case 'string':
            return util.toQuotedString(value);
          case 'object':
            if (value === null) return 'null';
            var valueStr = fastJsonStableStringify(value);
            var index = defaultsHash[valueStr];
            if (index === undefined) {
              index = defaultsHash[valueStr] = defaults.length;
              defaults[index] = value;
            }
            return 'default' + index;
        }
      }

      function useCustomRule(rule, schema, parentSchema, it) {
        if (self._opts.validateSchema !== false) {
          var deps = rule.definition.dependencies;
          if (deps && !deps.every(function(keyword) {
            return Object.prototype.hasOwnProperty.call(parentSchema, keyword);
          }))
            throw new Error('parent schema must have all required keywords: ' + deps.join(','));

          var validateSchema = rule.definition.validateSchema;
          if (validateSchema) {
            var valid = validateSchema(schema);
            if (!valid) {
              var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
              if (self._opts.validateSchema == 'log') self.logger.error(message);
              else throw new Error(message);
            }
          }
        }

        var compile = rule.definition.compile
          , inline = rule.definition.inline
          , macro = rule.definition.macro;

        var validate;
        if (compile) {
          validate = compile.call(self, schema, parentSchema, it);
        } else if (macro) {
          validate = macro.call(self, schema, parentSchema, it);
          if (opts.validateSchema !== false) self.validateSchema(validate, true);
        } else if (inline) {
          validate = inline.call(self, it, rule.keyword, schema, parentSchema);
        } else {
          validate = rule.definition.validate;
          if (!validate) return;
        }

        if (validate === undefined)
          throw new Error('custom keyword "' + rule.keyword + '"failed to compile');

        var index = customRules.length;
        customRules[index] = validate;

        return {
          code: 'customRule' + index,
          validate: validate
        };
      }
    }


    /**
     * Checks if the schema is currently compiled
     * @this   Ajv
     * @param  {Object} schema schema to compile
     * @param  {Object} root root object
     * @param  {String} baseId base schema ID
     * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
     */
    function checkCompiling(schema, root, baseId) {
      /* jshint validthis: true */
      var index = compIndex.call(this, schema, root, baseId);
      if (index >= 0) return { index: index, compiling: true };
      index = this._compilations.length;
      this._compilations[index] = {
        schema: schema,
        root: root,
        baseId: baseId
      };
      return { index: index, compiling: false };
    }


    /**
     * Removes the schema from the currently compiled list
     * @this   Ajv
     * @param  {Object} schema schema to compile
     * @param  {Object} root root object
     * @param  {String} baseId base schema ID
     */
    function endCompiling(schema, root, baseId) {
      /* jshint validthis: true */
      var i = compIndex.call(this, schema, root, baseId);
      if (i >= 0) this._compilations.splice(i, 1);
    }


    /**
     * Index of schema compilation in the currently compiled list
     * @this   Ajv
     * @param  {Object} schema schema to compile
     * @param  {Object} root root object
     * @param  {String} baseId base schema ID
     * @return {Integer} compilation index
     */
    function compIndex(schema, root, baseId) {
      /* jshint validthis: true */
      for (var i=0; i<this._compilations.length; i++) {
        var c = this._compilations[i];
        if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
      }
      return -1;
    }


    function patternCode(i, patterns) {
      return 'var pattern' + i + ' = new RegExp(' + util.toQuotedString(patterns[i]) + ');';
    }


    function defaultCode(i) {
      return 'var default' + i + ' = defaults[' + i + '];';
    }


    function refValCode(i, refVal) {
      return refVal[i] === undefined ? '' : 'var refVal' + i + ' = refVal[' + i + '];';
    }


    function customRuleCode(i) {
      return 'var customRule' + i + ' = customRules[' + i + '];';
    }


    function vars(arr, statement) {
      if (!arr.length) return '';
      var code = '';
      for (var i=0; i<arr.length; i++)
        code += statement(i, arr);
      return code;
    }

    var cache = createCommonjsModule(function (module) {


    var Cache = module.exports = function Cache() {
      this._cache = {};
    };


    Cache.prototype.put = function Cache_put(key, value) {
      this._cache[key] = value;
    };


    Cache.prototype.get = function Cache_get(key) {
      return this._cache[key];
    };


    Cache.prototype.del = function Cache_del(key) {
      delete this._cache[key];
    };


    Cache.prototype.clear = function Cache_clear() {
      this._cache = {};
    };
    });

    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    // uri-template: https://tools.ietf.org/html/rfc6570
    var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    // @todo Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
    // var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
    var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
    var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    var JSON_POINTER$1 = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
    var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
    var RELATIVE_JSON_POINTER$1 = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;


    var formats_1 = formats;

    function formats(mode) {
      mode = mode == 'full' ? 'full' : 'fast';
      return util.copy(formats[mode]);
    }


    formats.fast = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
      'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,
      'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      'uri-template': URITEMPLATE,
      url: URL,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
      hostname: HOSTNAME,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
      ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
      regex: regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: UUID,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      'json-pointer': JSON_POINTER$1,
      'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      'relative-json-pointer': RELATIVE_JSON_POINTER$1
    };


    formats.full = {
      date: date,
      time: time,
      'date-time': date_time,
      uri: uri,
      'uri-reference': URIREF,
      'uri-template': URITEMPLATE,
      url: URL,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: HOSTNAME,
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
      regex: regex,
      uuid: UUID,
      'json-pointer': JSON_POINTER$1,
      'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
      'relative-json-pointer': RELATIVE_JSON_POINTER$1
    };


    function isLeapYear(year) {
      // https://tools.ietf.org/html/rfc3339#appendix-C
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }


    function date(str) {
      // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
      var matches = str.match(DATE);
      if (!matches) return false;

      var year = +matches[1];
      var month = +matches[2];
      var day = +matches[3];

      return month >= 1 && month <= 12 && day >= 1 &&
              day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }


    function time(str, full) {
      var matches = str.match(TIME);
      if (!matches) return false;

      var hour = matches[1];
      var minute = matches[2];
      var second = matches[3];
      var timeZone = matches[5];
      return ((hour <= 23 && minute <= 59 && second <= 59) ||
              (hour == 23 && minute == 59 && second == 60)) &&
             (!full || timeZone);
    }


    var DATE_TIME_SEPARATOR = /t|\s/i;
    function date_time(str) {
      // http://tools.ietf.org/html/rfc3339#section-5.6
      var dateTime = str.split(DATE_TIME_SEPARATOR);
      return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
    }


    var NOT_URI_FRAGMENT = /\/|:/;
    function uri(str) {
      // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }


    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str)) return false;
      try {
        new RegExp(str);
        return true;
      } catch(e) {
        return false;
      }
    }

    var ref = function generate_ref(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $async, $refCode;
      if ($schema == '#' || $schema == '#/') {
        if (it.isRoot) {
          $async = it.async;
          $refCode = 'validate';
        } else {
          $async = it.root.schema.$async === true;
          $refCode = 'root.refVal[0]';
        }
      } else {
        var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
        if ($refVal === undefined) {
          var $message = it.MissingRefError.message(it.baseId, $schema);
          if (it.opts.missingRefs == 'fail') {
            it.logger.error($message);
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('$ref') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { ref: \'' + (it.util.escapeQuotes($schema)) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: ' + (it.util.toQuotedString($schema)) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
            if ($breakOnError) {
              out += ' if (false) { ';
            }
          } else if (it.opts.missingRefs == 'ignore') {
            it.logger.warn($message);
            if ($breakOnError) {
              out += ' if (true) { ';
            }
          } else {
            throw new it.MissingRefError(it.baseId, $schema, $message);
          }
        } else if ($refVal.inline) {
          var $it = it.util.copy(it);
          $it.level++;
          var $nextValid = 'valid' + $it.level;
          $it.schema = $refVal.schema;
          $it.schemaPath = '';
          $it.errSchemaPath = $schema;
          var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
          out += ' ' + ($code) + ' ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
          }
        } else {
          $async = $refVal.$async === true || (it.async && $refVal.$async !== false);
          $refCode = $refVal.code;
        }
      }
      if ($refCode) {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = '';
        if (it.opts.passContext) {
          out += ' ' + ($refCode) + '.call(this, ';
        } else {
          out += ' ' + ($refCode) + '( ';
        }
        out += ' ' + ($data) + ', (dataPath || \'\')';
        if (it.errorPath != '""') {
          out += ' + ' + (it.errorPath);
        }
        var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
          $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
        out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ', rootData)  ';
        var __callValidate = out;
        out = $$outStack.pop();
        if ($async) {
          if (!it.async) throw new Error('async schema referenced by sync schema');
          if ($breakOnError) {
            out += ' var ' + ($valid) + '; ';
          }
          out += ' try { await ' + (__callValidate) + '; ';
          if ($breakOnError) {
            out += ' ' + ($valid) + ' = true; ';
          }
          out += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ';
          if ($breakOnError) {
            out += ' ' + ($valid) + ' = false; ';
          }
          out += ' } ';
          if ($breakOnError) {
            out += ' if (' + ($valid) + ') { ';
          }
        } else {
          out += ' if (!' + (__callValidate) + ') { if (vErrors === null) vErrors = ' + ($refCode) + '.errors; else vErrors = vErrors.concat(' + ($refCode) + '.errors); errors = vErrors.length; } ';
          if ($breakOnError) {
            out += ' else { ';
          }
        }
      }
      return out;
    };

    var allOf = function generate_allOf(it, $keyword, $ruleType) {
      var out = ' ';
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $currentBaseId = $it.baseId,
        $allSchemasEmpty = true;
      var arr1 = $schema;
      if (arr1) {
        var $sch, $i = -1,
          l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
            $allSchemasEmpty = false;
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + '[' + $i + ']';
            $it.errSchemaPath = $errSchemaPath + '/' + $i;
            out += '  ' + (it.validate($it)) + ' ';
            $it.baseId = $currentBaseId;
            if ($breakOnError) {
              out += ' if (' + ($nextValid) + ') { ';
              $closingBraces += '}';
            }
          }
        }
      }
      if ($breakOnError) {
        if ($allSchemasEmpty) {
          out += ' if (true) { ';
        } else {
          out += ' ' + ($closingBraces.slice(0, -1)) + ' ';
        }
      }
      return out;
    };

    var anyOf = function generate_anyOf(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $noEmptySchema = $schema.every(function($sch) {
        return (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all));
      });
      if ($noEmptySchema) {
        var $currentBaseId = $it.baseId;
        out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = false;  ';
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var arr1 = $schema;
        if (arr1) {
          var $sch, $i = -1,
            l1 = arr1.length - 1;
          while ($i < l1) {
            $sch = arr1[$i += 1];
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + '[' + $i + ']';
            $it.errSchemaPath = $errSchemaPath + '/' + $i;
            out += '  ' + (it.validate($it)) + ' ';
            $it.baseId = $currentBaseId;
            out += ' ' + ($valid) + ' = ' + ($valid) + ' || ' + ($nextValid) + '; if (!' + ($valid) + ') { ';
            $closingBraces += '}';
          }
        }
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' ' + ($closingBraces) + ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('anyOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should match some schema in anyOf\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError(vErrors); ';
          } else {
            out += ' validate.errors = vErrors; return false; ';
          }
        }
        out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
        if (it.opts.allErrors) {
          out += ' } ';
        }
      } else {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      }
      return out;
    };

    var comment = function generate_comment(it, $keyword, $ruleType) {
      var out = ' ';
      var $schema = it.schema[$keyword];
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $comment = it.util.toQuotedString($schema);
      if (it.opts.$comment === true) {
        out += ' console.log(' + ($comment) + ');';
      } else if (typeof it.opts.$comment == 'function') {
        out += ' self._opts.$comment(' + ($comment) + ', ' + (it.util.toQuotedString($errSchemaPath)) + ', validate.root.schema);';
      }
      return out;
    };

    var _const = function generate_const(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $isData = it.opts.$data && $schema && $schema.$data;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
      }
      if (!$isData) {
        out += ' var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ';';
      }
      out += 'var ' + ($valid) + ' = equal(' + ($data) + ', schema' + ($lvl) + '); if (!' + ($valid) + ') {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('const') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValue: schema' + ($lvl) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should be equal to constant\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' }';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var contains = function generate_contains(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $idx = 'i' + $lvl,
        $dataNxt = $it.dataLevel = it.dataLevel + 1,
        $nextData = 'data' + $dataNxt,
        $currentBaseId = it.baseId,
        $nonEmptySchema = (it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all));
      out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
      if ($nonEmptySchema) {
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        $it.schema = $schema;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += ' var ' + ($nextValid) + ' = false; for (var ' + ($idx) + ' = 0; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + '[' + $idx + ']';
        $it.dataPathArr[$dataNxt] = $idx;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
        } else {
          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
        }
        out += ' if (' + ($nextValid) + ') break; }  ';
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' ' + ($closingBraces) + ' if (!' + ($nextValid) + ') {';
      } else {
        out += ' if (' + ($data) + '.length == 0) {';
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('contains') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should contain a valid item\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } else { ';
      if ($nonEmptySchema) {
        out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
      }
      if (it.opts.allErrors) {
        out += ' } ';
      }
      return out;
    };

    var dependencies = function generate_dependencies(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $schemaDeps = {},
        $propertyDeps = {},
        $ownProperties = it.opts.ownProperties;
      for ($property in $schema) {
        if ($property == '__proto__') continue;
        var $sch = $schema[$property];
        var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
        $deps[$property] = $sch;
      }
      out += 'var ' + ($errs) + ' = errors;';
      var $currentErrorPath = it.errorPath;
      out += 'var missing' + ($lvl) + ';';
      for (var $property in $propertyDeps) {
        $deps = $propertyDeps[$property];
        if ($deps.length) {
          out += ' if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
          if ($ownProperties) {
            out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
          }
          if ($breakOnError) {
            out += ' && ( ';
            var arr1 = $deps;
            if (arr1) {
              var $propertyKey, $i = -1,
                l1 = arr1.length - 1;
              while ($i < l1) {
                $propertyKey = arr1[$i += 1];
                if ($i) {
                  out += ' || ';
                }
                var $prop = it.util.getProperty($propertyKey),
                  $useData = $data + $prop;
                out += ' ( ( ' + ($useData) + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
              }
            }
            out += ')) {  ';
            var $propertyPath = 'missing' + $lvl,
              $missingProperty = '\' + ' + $propertyPath + ' + \'';
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
            }
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should have ';
                if ($deps.length == 1) {
                  out += 'property ' + (it.util.escapeQuotes($deps[0]));
                } else {
                  out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
                }
                out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
          } else {
            out += ' ) { ';
            var arr2 = $deps;
            if (arr2) {
              var $propertyKey, i2 = -1,
                l2 = arr2.length - 1;
              while (i2 < l2) {
                $propertyKey = arr2[i2 += 1];
                var $prop = it.util.getProperty($propertyKey),
                  $missingProperty = it.util.escapeQuotes($propertyKey),
                  $useData = $data + $prop;
                if (it.opts._errorDataPathProperty) {
                  it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                }
                out += ' if ( ' + ($useData) + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ') {  var err =   '; /* istanbul ignore else */
                if (it.createErrors !== false) {
                  out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
                  if (it.opts.messages !== false) {
                    out += ' , message: \'should have ';
                    if ($deps.length == 1) {
                      out += 'property ' + (it.util.escapeQuotes($deps[0]));
                    } else {
                      out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
                    }
                    out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
                  }
                  if (it.opts.verbose) {
                    out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                  }
                  out += ' } ';
                } else {
                  out += ' {} ';
                }
                out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
              }
            }
          }
          out += ' }   ';
          if ($breakOnError) {
            $closingBraces += '}';
            out += ' else { ';
          }
        }
      }
      it.errorPath = $currentErrorPath;
      var $currentBaseId = $it.baseId;
      for (var $property in $schemaDeps) {
        var $sch = $schemaDeps[$property];
        if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
          out += ' ' + ($nextValid) + ' = true; if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
          if ($ownProperties) {
            out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
          }
          out += ') { ';
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + it.util.getProperty($property);
          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
          out += '  ' + (it.validate($it)) + ' ';
          $it.baseId = $currentBaseId;
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
        }
      }
      if ($breakOnError) {
        out += '   ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
      }
      return out;
    };

    var _enum = function generate_enum(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $isData = it.opts.$data && $schema && $schema.$data;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
      }
      var $i = 'i' + $lvl,
        $vSchema = 'schema' + $lvl;
      if (!$isData) {
        out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + ';';
      }
      out += 'var ' + ($valid) + ';';
      if ($isData) {
        out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
      }
      out += '' + ($valid) + ' = false;for (var ' + ($i) + '=0; ' + ($i) + '<' + ($vSchema) + '.length; ' + ($i) + '++) if (equal(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + '])) { ' + ($valid) + ' = true; break; }';
      if ($isData) {
        out += '  }  ';
      }
      out += ' if (!' + ($valid) + ') {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('enum') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValues: schema' + ($lvl) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should be equal to one of the allowed values\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' }';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var format = function generate_format(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      if (it.opts.format === false) {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      }
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      var $unknownFormats = it.opts.unknownFormats,
        $allowUnknown = Array.isArray($unknownFormats);
      if ($isData) {
        var $format = 'format' + $lvl,
          $isObject = 'isObject' + $lvl,
          $formatType = 'formatType' + $lvl;
        out += ' var ' + ($format) + ' = formats[' + ($schemaValue) + ']; var ' + ($isObject) + ' = typeof ' + ($format) + ' == \'object\' && !(' + ($format) + ' instanceof RegExp) && ' + ($format) + '.validate; var ' + ($formatType) + ' = ' + ($isObject) + ' && ' + ($format) + '.type || \'string\'; if (' + ($isObject) + ') { ';
        if (it.async) {
          out += ' var async' + ($lvl) + ' = ' + ($format) + '.async; ';
        }
        out += ' ' + ($format) + ' = ' + ($format) + '.validate; } if (  ';
        if ($isData) {
          out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
        }
        out += ' (';
        if ($unknownFormats != 'ignore') {
          out += ' (' + ($schemaValue) + ' && !' + ($format) + ' ';
          if ($allowUnknown) {
            out += ' && self._opts.unknownFormats.indexOf(' + ($schemaValue) + ') == -1 ';
          }
          out += ') || ';
        }
        out += ' (' + ($format) + ' && ' + ($formatType) + ' == \'' + ($ruleType) + '\' && !(typeof ' + ($format) + ' == \'function\' ? ';
        if (it.async) {
          out += ' (async' + ($lvl) + ' ? await ' + ($format) + '(' + ($data) + ') : ' + ($format) + '(' + ($data) + ')) ';
        } else {
          out += ' ' + ($format) + '(' + ($data) + ') ';
        }
        out += ' : ' + ($format) + '.test(' + ($data) + '))))) {';
      } else {
        var $format = it.formats[$schema];
        if (!$format) {
          if ($unknownFormats == 'ignore') {
            it.logger.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');
            if ($breakOnError) {
              out += ' if (true) { ';
            }
            return out;
          } else if ($allowUnknown && $unknownFormats.indexOf($schema) >= 0) {
            if ($breakOnError) {
              out += ' if (true) { ';
            }
            return out;
          } else {
            throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
          }
        }
        var $isObject = typeof $format == 'object' && !($format instanceof RegExp) && $format.validate;
        var $formatType = $isObject && $format.type || 'string';
        if ($isObject) {
          var $async = $format.async === true;
          $format = $format.validate;
        }
        if ($formatType != $ruleType) {
          if ($breakOnError) {
            out += ' if (true) { ';
          }
          return out;
        }
        if ($async) {
          if (!it.async) throw new Error('async format in sync schema');
          var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
          out += ' if (!(await ' + ($formatRef) + '(' + ($data) + '))) { ';
        } else {
          out += ' if (! ';
          var $formatRef = 'formats' + it.util.getProperty($schema);
          if ($isObject) $formatRef += '.validate';
          if (typeof $format == 'function') {
            out += ' ' + ($formatRef) + '(' + ($data) + ') ';
          } else {
            out += ' ' + ($formatRef) + '.test(' + ($data) + ') ';
          }
          out += ') { ';
        }
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('format') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { format:  ';
        if ($isData) {
          out += '' + ($schemaValue);
        } else {
          out += '' + (it.util.toQuotedString($schema));
        }
        out += '  } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should match format "';
          if ($isData) {
            out += '\' + ' + ($schemaValue) + ' + \'';
          } else {
            out += '' + (it.util.escapeQuotes($schema));
          }
          out += '"\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + (it.util.toQuotedString($schema));
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var _if = function generate_if(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $thenSch = it.schema['then'],
        $elseSch = it.schema['else'],
        $thenPresent = $thenSch !== undefined && (it.opts.strictKeywords ? typeof $thenSch == 'object' && Object.keys($thenSch).length > 0 : it.util.schemaHasRules($thenSch, it.RULES.all)),
        $elsePresent = $elseSch !== undefined && (it.opts.strictKeywords ? typeof $elseSch == 'object' && Object.keys($elseSch).length > 0 : it.util.schemaHasRules($elseSch, it.RULES.all)),
        $currentBaseId = $it.baseId;
      if ($thenPresent || $elsePresent) {
        var $ifClause;
        $it.createErrors = false;
        $it.schema = $schema;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = true;  ';
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        out += '  ' + (it.validate($it)) + ' ';
        $it.baseId = $currentBaseId;
        $it.createErrors = true;
        out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }  ';
        it.compositeRule = $it.compositeRule = $wasComposite;
        if ($thenPresent) {
          out += ' if (' + ($nextValid) + ') {  ';
          $it.schema = it.schema['then'];
          $it.schemaPath = it.schemaPath + '.then';
          $it.errSchemaPath = it.errSchemaPath + '/then';
          out += '  ' + (it.validate($it)) + ' ';
          $it.baseId = $currentBaseId;
          out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
          if ($thenPresent && $elsePresent) {
            $ifClause = 'ifClause' + $lvl;
            out += ' var ' + ($ifClause) + ' = \'then\'; ';
          } else {
            $ifClause = '\'then\'';
          }
          out += ' } ';
          if ($elsePresent) {
            out += ' else { ';
          }
        } else {
          out += ' if (!' + ($nextValid) + ') { ';
        }
        if ($elsePresent) {
          $it.schema = it.schema['else'];
          $it.schemaPath = it.schemaPath + '.else';
          $it.errSchemaPath = it.errSchemaPath + '/else';
          out += '  ' + (it.validate($it)) + ' ';
          $it.baseId = $currentBaseId;
          out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
          if ($thenPresent && $elsePresent) {
            $ifClause = 'ifClause' + $lvl;
            out += ' var ' + ($ifClause) + ' = \'else\'; ';
          } else {
            $ifClause = '\'else\'';
          }
          out += ' } ';
        }
        out += ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('if') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { failingKeyword: ' + ($ifClause) + ' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should match "\' + ' + ($ifClause) + ' + \'" schema\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError(vErrors); ';
          } else {
            out += ' validate.errors = vErrors; return false; ';
          }
        }
        out += ' }   ';
        if ($breakOnError) {
          out += ' else { ';
        }
      } else {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      }
      return out;
    };

    var items = function generate_items(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $idx = 'i' + $lvl,
        $dataNxt = $it.dataLevel = it.dataLevel + 1,
        $nextData = 'data' + $dataNxt,
        $currentBaseId = it.baseId;
      out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
      if (Array.isArray($schema)) {
        var $additionalItems = it.schema.additionalItems;
        if ($additionalItems === false) {
          out += ' ' + ($valid) + ' = ' + ($data) + '.length <= ' + ($schema.length) + '; ';
          var $currErrSchemaPath = $errSchemaPath;
          $errSchemaPath = it.errSchemaPath + '/additionalItems';
          out += '  if (!' + ($valid) + ') {   ';
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = ''; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ('additionalItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schema.length) + ' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError([' + (__err) + ']); ';
            } else {
              out += ' validate.errors = [' + (__err) + ']; return false; ';
            }
          } else {
            out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          }
          out += ' } ';
          $errSchemaPath = $currErrSchemaPath;
          if ($breakOnError) {
            $closingBraces += '}';
            out += ' else { ';
          }
        }
        var arr1 = $schema;
        if (arr1) {
          var $sch, $i = -1,
            l1 = arr1.length - 1;
          while ($i < l1) {
            $sch = arr1[$i += 1];
            if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
              out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($i) + ') { ';
              var $passData = $data + '[' + $i + ']';
              $it.schema = $sch;
              $it.schemaPath = $schemaPath + '[' + $i + ']';
              $it.errSchemaPath = $errSchemaPath + '/' + $i;
              $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
              $it.dataPathArr[$dataNxt] = $i;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
              } else {
                out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
              }
              out += ' }  ';
              if ($breakOnError) {
                out += ' if (' + ($nextValid) + ') { ';
                $closingBraces += '}';
              }
            }
          }
        }
        if (typeof $additionalItems == 'object' && (it.opts.strictKeywords ? typeof $additionalItems == 'object' && Object.keys($additionalItems).length > 0 : it.util.schemaHasRules($additionalItems, it.RULES.all))) {
          $it.schema = $additionalItems;
          $it.schemaPath = it.schemaPath + '.additionalItems';
          $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
          out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($schema.length) + ') {  for (var ' + ($idx) + ' = ' + ($schema.length) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
          $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
          var $passData = $data + '[' + $idx + ']';
          $it.dataPathArr[$dataNxt] = $idx;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
          } else {
            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + ($nextValid) + ') break; ';
          }
          out += ' } }  ';
          if ($breakOnError) {
            out += ' if (' + ($nextValid) + ') { ';
            $closingBraces += '}';
          }
        }
      } else if ((it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all))) {
        $it.schema = $schema;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += '  for (var ' + ($idx) + ' = ' + (0) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + '[' + $idx + ']';
        $it.dataPathArr[$dataNxt] = $idx;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
        } else {
          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
        }
        if ($breakOnError) {
          out += ' if (!' + ($nextValid) + ') break; ';
        }
        out += ' }';
      }
      if ($breakOnError) {
        out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
      }
      return out;
    };

    var _limit = function generate__limit(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      var $isMax = $keyword == 'maximum',
        $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
        $schemaExcl = it.schema[$exclusiveKeyword],
        $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data,
        $op = $isMax ? '<' : '>',
        $notOp = $isMax ? '>' : '<',
        $errorKeyword = undefined;
      if (!($isData || typeof $schema == 'number' || $schema === undefined)) {
        throw new Error($keyword + ' must be number');
      }
      if (!($isDataExcl || $schemaExcl === undefined || typeof $schemaExcl == 'number' || typeof $schemaExcl == 'boolean')) {
        throw new Error($exclusiveKeyword + ' must be number or boolean');
      }
      if ($isDataExcl) {
        var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
          $exclusive = 'exclusive' + $lvl,
          $exclType = 'exclType' + $lvl,
          $exclIsNumber = 'exclIsNumber' + $lvl,
          $opExpr = 'op' + $lvl,
          $opStr = '\' + ' + $opExpr + ' + \'';
        out += ' var schemaExcl' + ($lvl) + ' = ' + ($schemaValueExcl) + '; ';
        $schemaValueExcl = 'schemaExcl' + $lvl;
        out += ' var ' + ($exclusive) + '; var ' + ($exclType) + ' = typeof ' + ($schemaValueExcl) + '; if (' + ($exclType) + ' != \'boolean\' && ' + ($exclType) + ' != \'undefined\' && ' + ($exclType) + ' != \'number\') { ';
        var $errorKeyword = $exclusiveKeyword;
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
          if (it.opts.messages !== false) {
            out += ' , message: \'' + ($exclusiveKeyword) + ' should be boolean\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else if ( ';
        if ($isData) {
          out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
        }
        out += ' ' + ($exclType) + ' == \'number\' ? ( (' + ($exclusive) + ' = ' + ($schemaValue) + ' === undefined || ' + ($schemaValueExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ') ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValueExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) : ( (' + ($exclusive) + ' = ' + ($schemaValueExcl) + ' === true) ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValue) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { var op' + ($lvl) + ' = ' + ($exclusive) + ' ? \'' + ($op) + '\' : \'' + ($op) + '=\'; ';
        if ($schema === undefined) {
          $errorKeyword = $exclusiveKeyword;
          $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
          $schemaValue = $schemaValueExcl;
          $isData = $isDataExcl;
        }
      } else {
        var $exclIsNumber = typeof $schemaExcl == 'number',
          $opStr = $op;
        if ($exclIsNumber && $isData) {
          var $opExpr = '\'' + $opStr + '\'';
          out += ' if ( ';
          if ($isData) {
            out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
          }
          out += ' ( ' + ($schemaValue) + ' === undefined || ' + ($schemaExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ' ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { ';
        } else {
          if ($exclIsNumber && $schema === undefined) {
            $exclusive = true;
            $errorKeyword = $exclusiveKeyword;
            $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
            $schemaValue = $schemaExcl;
            $notOp += '=';
          } else {
            if ($exclIsNumber) $schemaValue = Math[$isMax ? 'min' : 'max']($schemaExcl, $schema);
            if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
              $exclusive = true;
              $errorKeyword = $exclusiveKeyword;
              $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
              $notOp += '=';
            } else {
              $exclusive = false;
              $opStr += '=';
            }
          }
          var $opExpr = '\'' + $opStr + '\'';
          out += ' if ( ';
          if ($isData) {
            out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
          }
          out += ' ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' || ' + ($data) + ' !== ' + ($data) + ') { ';
        }
      }
      $errorKeyword = $errorKeyword || $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { comparison: ' + ($opExpr) + ', limit: ' + ($schemaValue) + ', exclusive: ' + ($exclusive) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should be ' + ($opStr) + ' ';
          if ($isData) {
            out += '\' + ' + ($schemaValue);
          } else {
            out += '' + ($schemaValue) + '\'';
          }
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + ($schema);
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var _limitItems = function generate__limitItems(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      if (!($isData || typeof $schema == 'number')) {
        throw new Error($keyword + ' must be number');
      }
      var $op = $keyword == 'maxItems' ? '>' : '<';
      out += 'if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
      }
      out += ' ' + ($data) + '.length ' + ($op) + ' ' + ($schemaValue) + ') { ';
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT have ';
          if ($keyword == 'maxItems') {
            out += 'more';
          } else {
            out += 'fewer';
          }
          out += ' than ';
          if ($isData) {
            out += '\' + ' + ($schemaValue) + ' + \'';
          } else {
            out += '' + ($schema);
          }
          out += ' items\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + ($schema);
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += '} ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var _limitLength = function generate__limitLength(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      if (!($isData || typeof $schema == 'number')) {
        throw new Error($keyword + ' must be number');
      }
      var $op = $keyword == 'maxLength' ? '>' : '<';
      out += 'if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
      }
      if (it.opts.unicode === false) {
        out += ' ' + ($data) + '.length ';
      } else {
        out += ' ucs2length(' + ($data) + ') ';
      }
      out += ' ' + ($op) + ' ' + ($schemaValue) + ') { ';
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT be ';
          if ($keyword == 'maxLength') {
            out += 'longer';
          } else {
            out += 'shorter';
          }
          out += ' than ';
          if ($isData) {
            out += '\' + ' + ($schemaValue) + ' + \'';
          } else {
            out += '' + ($schema);
          }
          out += ' characters\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + ($schema);
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += '} ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var _limitProperties = function generate__limitProperties(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      if (!($isData || typeof $schema == 'number')) {
        throw new Error($keyword + ' must be number');
      }
      var $op = $keyword == 'maxProperties' ? '>' : '<';
      out += 'if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
      }
      out += ' Object.keys(' + ($data) + ').length ' + ($op) + ' ' + ($schemaValue) + ') { ';
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT have ';
          if ($keyword == 'maxProperties') {
            out += 'more';
          } else {
            out += 'fewer';
          }
          out += ' than ';
          if ($isData) {
            out += '\' + ' + ($schemaValue) + ' + \'';
          } else {
            out += '' + ($schema);
          }
          out += ' properties\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + ($schema);
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += '} ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var multipleOf = function generate_multipleOf(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      if (!($isData || typeof $schema == 'number')) {
        throw new Error($keyword + ' must be number');
      }
      out += 'var division' + ($lvl) + ';if (';
      if ($isData) {
        out += ' ' + ($schemaValue) + ' !== undefined && ( typeof ' + ($schemaValue) + ' != \'number\' || ';
      }
      out += ' (division' + ($lvl) + ' = ' + ($data) + ' / ' + ($schemaValue) + ', ';
      if (it.opts.multipleOfPrecision) {
        out += ' Math.abs(Math.round(division' + ($lvl) + ') - division' + ($lvl) + ') > 1e-' + (it.opts.multipleOfPrecision) + ' ';
      } else {
        out += ' division' + ($lvl) + ' !== parseInt(division' + ($lvl) + ') ';
      }
      out += ' ) ';
      if ($isData) {
        out += '  )  ';
      }
      out += ' ) {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('multipleOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { multipleOf: ' + ($schemaValue) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should be multiple of ';
          if ($isData) {
            out += '\' + ' + ($schemaValue);
          } else {
            out += '' + ($schemaValue) + '\'';
          }
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + ($schema);
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += '} ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var not = function generate_not(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      if ((it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all))) {
        $it.schema = $schema;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += ' var ' + ($errs) + ' = errors;  ';
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        $it.createErrors = false;
        var $allErrorsOption;
        if ($it.opts.allErrors) {
          $allErrorsOption = $it.opts.allErrors;
          $it.opts.allErrors = false;
        }
        out += ' ' + (it.validate($it)) + ' ';
        $it.createErrors = true;
        if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' if (' + ($nextValid) + ') {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should NOT be valid\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
        if (it.opts.allErrors) {
          out += ' } ';
        }
      } else {
        out += '  var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should NOT be valid\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        if ($breakOnError) {
          out += ' if (false) { ';
        }
      }
      return out;
    };

    var oneOf = function generate_oneOf(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $currentBaseId = $it.baseId,
        $prevValid = 'prevValid' + $lvl,
        $passingSchemas = 'passingSchemas' + $lvl;
      out += 'var ' + ($errs) + ' = errors , ' + ($prevValid) + ' = false , ' + ($valid) + ' = false , ' + ($passingSchemas) + ' = null; ';
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      var arr1 = $schema;
      if (arr1) {
        var $sch, $i = -1,
          l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + '[' + $i + ']';
            $it.errSchemaPath = $errSchemaPath + '/' + $i;
            out += '  ' + (it.validate($it)) + ' ';
            $it.baseId = $currentBaseId;
          } else {
            out += ' var ' + ($nextValid) + ' = true; ';
          }
          if ($i) {
            out += ' if (' + ($nextValid) + ' && ' + ($prevValid) + ') { ' + ($valid) + ' = false; ' + ($passingSchemas) + ' = [' + ($passingSchemas) + ', ' + ($i) + ']; } else { ';
            $closingBraces += '}';
          }
          out += ' if (' + ($nextValid) + ') { ' + ($valid) + ' = ' + ($prevValid) + ' = true; ' + ($passingSchemas) + ' = ' + ($i) + '; }';
        }
      }
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += '' + ($closingBraces) + 'if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('oneOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { passingSchemas: ' + ($passingSchemas) + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should match exactly one schema in oneOf\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError(vErrors); ';
        } else {
          out += ' validate.errors = vErrors; return false; ';
        }
      }
      out += '} else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }';
      if (it.opts.allErrors) {
        out += ' } ';
      }
      return out;
    };

    var pattern = function generate_pattern(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
      out += 'if ( ';
      if ($isData) {
        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
      }
      out += ' !' + ($regexp) + '.test(' + ($data) + ') ) {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ('pattern') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { pattern:  ';
        if ($isData) {
          out += '' + ($schemaValue);
        } else {
          out += '' + (it.util.toQuotedString($schema));
        }
        out += '  } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should match pattern "';
          if ($isData) {
            out += '\' + ' + ($schemaValue) + ' + \'';
          } else {
            out += '' + (it.util.escapeQuotes($schema));
          }
          out += '"\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema:  ';
          if ($isData) {
            out += 'validate.schema' + ($schemaPath);
          } else {
            out += '' + (it.util.toQuotedString($schema));
          }
          out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + (__err) + ']); ';
        } else {
          out += ' validate.errors = [' + (__err) + ']; return false; ';
        }
      } else {
        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += '} ';
      if ($breakOnError) {
        out += ' else { ';
      }
      return out;
    };

    var properties = function generate_properties(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      var $key = 'key' + $lvl,
        $idx = 'idx' + $lvl,
        $dataNxt = $it.dataLevel = it.dataLevel + 1,
        $nextData = 'data' + $dataNxt,
        $dataProperties = 'dataProperties' + $lvl;
      var $schemaKeys = Object.keys($schema || {}).filter(notProto),
        $pProperties = it.schema.patternProperties || {},
        $pPropertyKeys = Object.keys($pProperties).filter(notProto),
        $aProperties = it.schema.additionalProperties,
        $someProperties = $schemaKeys.length || $pPropertyKeys.length,
        $noAdditional = $aProperties === false,
        $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
        $removeAdditional = it.opts.removeAdditional,
        $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
        $ownProperties = it.opts.ownProperties,
        $currentBaseId = it.baseId;
      var $required = it.schema.required;
      if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) {
        var $requiredHash = it.util.toHash($required);
      }

      function notProto(p) {
        return p !== '__proto__';
      }
      out += 'var ' + ($errs) + ' = errors;var ' + ($nextValid) + ' = true;';
      if ($ownProperties) {
        out += ' var ' + ($dataProperties) + ' = undefined;';
      }
      if ($checkAdditional) {
        if ($ownProperties) {
          out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
        } else {
          out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
        }
        if ($someProperties) {
          out += ' var isAdditional' + ($lvl) + ' = !(false ';
          if ($schemaKeys.length) {
            if ($schemaKeys.length > 8) {
              out += ' || validate.schema' + ($schemaPath) + '.hasOwnProperty(' + ($key) + ') ';
            } else {
              var arr1 = $schemaKeys;
              if (arr1) {
                var $propertyKey, i1 = -1,
                  l1 = arr1.length - 1;
                while (i1 < l1) {
                  $propertyKey = arr1[i1 += 1];
                  out += ' || ' + ($key) + ' == ' + (it.util.toQuotedString($propertyKey)) + ' ';
                }
              }
            }
          }
          if ($pPropertyKeys.length) {
            var arr2 = $pPropertyKeys;
            if (arr2) {
              var $pProperty, $i = -1,
                l2 = arr2.length - 1;
              while ($i < l2) {
                $pProperty = arr2[$i += 1];
                out += ' || ' + (it.usePattern($pProperty)) + '.test(' + ($key) + ') ';
              }
            }
          }
          out += ' ); if (isAdditional' + ($lvl) + ') { ';
        }
        if ($removeAdditional == 'all') {
          out += ' delete ' + ($data) + '[' + ($key) + ']; ';
        } else {
          var $currentErrorPath = it.errorPath;
          var $additionalProperty = '\' + ' + $key + ' + \'';
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          }
          if ($noAdditional) {
            if ($removeAdditional) {
              out += ' delete ' + ($data) + '[' + ($key) + ']; ';
            } else {
              out += ' ' + ($nextValid) + ' = false; ';
              var $currErrSchemaPath = $errSchemaPath;
              $errSchemaPath = it.errSchemaPath + '/additionalProperties';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('additionalProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { additionalProperty: \'' + ($additionalProperty) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'';
                  if (it.opts._errorDataPathProperty) {
                    out += 'is an invalid additional property';
                  } else {
                    out += 'should NOT have additional properties';
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) {
                /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + (__err) + ']); ';
                } else {
                  out += ' validate.errors = [' + (__err) + ']; return false; ';
                }
              } else {
                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              $errSchemaPath = $currErrSchemaPath;
              if ($breakOnError) {
                out += ' break; ';
              }
            }
          } else if ($additionalIsSchema) {
            if ($removeAdditional == 'failing') {
              out += ' var ' + ($errs) + ' = errors;  ';
              var $wasComposite = it.compositeRule;
              it.compositeRule = $it.compositeRule = true;
              $it.schema = $aProperties;
              $it.schemaPath = it.schemaPath + '.additionalProperties';
              $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
              $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + '[' + $key + ']';
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
              } else {
                out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
              }
              out += ' if (!' + ($nextValid) + ') { errors = ' + ($errs) + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + ($data) + '[' + ($key) + ']; }  ';
              it.compositeRule = $it.compositeRule = $wasComposite;
            } else {
              $it.schema = $aProperties;
              $it.schemaPath = it.schemaPath + '.additionalProperties';
              $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
              $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + '[' + $key + ']';
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
              } else {
                out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
              }
              if ($breakOnError) {
                out += ' if (!' + ($nextValid) + ') break; ';
              }
            }
          }
          it.errorPath = $currentErrorPath;
        }
        if ($someProperties) {
          out += ' } ';
        }
        out += ' }  ';
        if ($breakOnError) {
          out += ' if (' + ($nextValid) + ') { ';
          $closingBraces += '}';
        }
      }
      var $useDefaults = it.opts.useDefaults && !it.compositeRule;
      if ($schemaKeys.length) {
        var arr3 = $schemaKeys;
        if (arr3) {
          var $propertyKey, i3 = -1,
            l3 = arr3.length - 1;
          while (i3 < l3) {
            $propertyKey = arr3[i3 += 1];
            var $sch = $schema[$propertyKey];
            if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
              var $prop = it.util.getProperty($propertyKey),
                $passData = $data + $prop,
                $hasDefault = $useDefaults && $sch.default !== undefined;
              $it.schema = $sch;
              $it.schemaPath = $schemaPath + $prop;
              $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
              $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
              $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                $code = it.util.varReplace($code, $nextData, $passData);
                var $useData = $passData;
              } else {
                var $useData = $nextData;
                out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ';
              }
              if ($hasDefault) {
                out += ' ' + ($code) + ' ';
              } else {
                if ($requiredHash && $requiredHash[$propertyKey]) {
                  out += ' if ( ' + ($useData) + ' === undefined ';
                  if ($ownProperties) {
                    out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                  }
                  out += ') { ' + ($nextValid) + ' = false; ';
                  var $currentErrorPath = it.errorPath,
                    $currErrSchemaPath = $errSchemaPath,
                    $missingProperty = it.util.escapeQuotes($propertyKey);
                  if (it.opts._errorDataPathProperty) {
                    it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                  }
                  $errSchemaPath = it.errSchemaPath + '/required';
                  var $$outStack = $$outStack || [];
                  $$outStack.push(out);
                  out = ''; /* istanbul ignore else */
                  if (it.createErrors !== false) {
                    out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
                    if (it.opts.messages !== false) {
                      out += ' , message: \'';
                      if (it.opts._errorDataPathProperty) {
                        out += 'is a required property';
                      } else {
                        out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                      }
                      out += '\' ';
                    }
                    if (it.opts.verbose) {
                      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                    }
                    out += ' } ';
                  } else {
                    out += ' {} ';
                  }
                  var __err = out;
                  out = $$outStack.pop();
                  if (!it.compositeRule && $breakOnError) {
                    /* istanbul ignore if */
                    if (it.async) {
                      out += ' throw new ValidationError([' + (__err) + ']); ';
                    } else {
                      out += ' validate.errors = [' + (__err) + ']; return false; ';
                    }
                  } else {
                    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
                  }
                  $errSchemaPath = $currErrSchemaPath;
                  it.errorPath = $currentErrorPath;
                  out += ' } else { ';
                } else {
                  if ($breakOnError) {
                    out += ' if ( ' + ($useData) + ' === undefined ';
                    if ($ownProperties) {
                      out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                    }
                    out += ') { ' + ($nextValid) + ' = true; } else { ';
                  } else {
                    out += ' if (' + ($useData) + ' !== undefined ';
                    if ($ownProperties) {
                      out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                    }
                    out += ' ) { ';
                  }
                }
                out += ' ' + ($code) + ' } ';
              }
            }
            if ($breakOnError) {
              out += ' if (' + ($nextValid) + ') { ';
              $closingBraces += '}';
            }
          }
        }
      }
      if ($pPropertyKeys.length) {
        var arr4 = $pPropertyKeys;
        if (arr4) {
          var $pProperty, i4 = -1,
            l4 = arr4.length - 1;
          while (i4 < l4) {
            $pProperty = arr4[i4 += 1];
            var $sch = $pProperties[$pProperty];
            if ((it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all))) {
              $it.schema = $sch;
              $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
              $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);
              if ($ownProperties) {
                out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
              } else {
                out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
              }
              out += ' if (' + (it.usePattern($pProperty)) + '.test(' + ($key) + ')) { ';
              $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + '[' + $key + ']';
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
              } else {
                out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
              }
              if ($breakOnError) {
                out += ' if (!' + ($nextValid) + ') break; ';
              }
              out += ' } ';
              if ($breakOnError) {
                out += ' else ' + ($nextValid) + ' = true; ';
              }
              out += ' }  ';
              if ($breakOnError) {
                out += ' if (' + ($nextValid) + ') { ';
                $closingBraces += '}';
              }
            }
          }
        }
      }
      if ($breakOnError) {
        out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
      }
      return out;
    };

    var propertyNames = function generate_propertyNames(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $errs = 'errs__' + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = '';
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      out += 'var ' + ($errs) + ' = errors;';
      if ((it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all))) {
        $it.schema = $schema;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        var $key = 'key' + $lvl,
          $idx = 'idx' + $lvl,
          $i = 'i' + $lvl,
          $invalidName = '\' + ' + $key + ' + \'',
          $dataNxt = $it.dataLevel = it.dataLevel + 1,
          $nextData = 'data' + $dataNxt,
          $dataProperties = 'dataProperties' + $lvl,
          $ownProperties = it.opts.ownProperties,
          $currentBaseId = it.baseId;
        if ($ownProperties) {
          out += ' var ' + ($dataProperties) + ' = undefined; ';
        }
        if ($ownProperties) {
          out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
        } else {
          out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
        }
        out += ' var startErrs' + ($lvl) + ' = errors; ';
        var $passData = $key;
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
        } else {
          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
        }
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' if (!' + ($nextValid) + ') { for (var ' + ($i) + '=startErrs' + ($lvl) + '; ' + ($i) + '<errors; ' + ($i) + '++) { vErrors[' + ($i) + '].propertyName = ' + ($key) + '; }   var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('propertyNames') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { propertyName: \'' + ($invalidName) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'property name \\\'' + ($invalidName) + '\\\' is invalid\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError(vErrors); ';
          } else {
            out += ' validate.errors = vErrors; return false; ';
          }
        }
        if ($breakOnError) {
          out += ' break; ';
        }
        out += ' } }';
      }
      if ($breakOnError) {
        out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
      }
      return out;
    };

    var required = function generate_required(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $isData = it.opts.$data && $schema && $schema.$data;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
      }
      var $vSchema = 'schema' + $lvl;
      if (!$isData) {
        if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
          var $required = [];
          var arr1 = $schema;
          if (arr1) {
            var $property, i1 = -1,
              l1 = arr1.length - 1;
            while (i1 < l1) {
              $property = arr1[i1 += 1];
              var $propertySch = it.schema.properties[$property];
              if (!($propertySch && (it.opts.strictKeywords ? typeof $propertySch == 'object' && Object.keys($propertySch).length > 0 : it.util.schemaHasRules($propertySch, it.RULES.all)))) {
                $required[$required.length] = $property;
              }
            }
          }
        } else {
          var $required = $schema;
        }
      }
      if ($isData || $required.length) {
        var $currentErrorPath = it.errorPath,
          $loopRequired = $isData || $required.length >= it.opts.loopRequired,
          $ownProperties = it.opts.ownProperties;
        if ($breakOnError) {
          out += ' var missing' + ($lvl) + '; ';
          if ($loopRequired) {
            if (!$isData) {
              out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
            }
            var $i = 'i' + $lvl,
              $propertyPath = 'schema' + $lvl + '[' + $i + ']',
              $missingProperty = '\' + ' + $propertyPath + ' + \'';
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
            }
            out += ' var ' + ($valid) + ' = true; ';
            if ($isData) {
              out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
            }
            out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { ' + ($valid) + ' = ' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] !== undefined ';
            if ($ownProperties) {
              out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
            }
            out += '; if (!' + ($valid) + ') break; } ';
            if ($isData) {
              out += '  }  ';
            }
            out += '  if (!' + ($valid) + ') {   ';
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
            out += ' } else { ';
          } else {
            out += ' if ( ';
            var arr2 = $required;
            if (arr2) {
              var $propertyKey, $i = -1,
                l2 = arr2.length - 1;
              while ($i < l2) {
                $propertyKey = arr2[$i += 1];
                if ($i) {
                  out += ' || ';
                }
                var $prop = it.util.getProperty($propertyKey),
                  $useData = $data + $prop;
                out += ' ( ( ' + ($useData) + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
              }
            }
            out += ') {  ';
            var $propertyPath = 'missing' + $lvl,
              $missingProperty = '\' + ' + $propertyPath + ' + \'';
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
            }
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = ''; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              /* istanbul ignore if */
              if (it.async) {
                out += ' throw new ValidationError([' + (__err) + ']); ';
              } else {
                out += ' validate.errors = [' + (__err) + ']; return false; ';
              }
            } else {
              out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
            }
            out += ' } else { ';
          }
        } else {
          if ($loopRequired) {
            if (!$isData) {
              out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
            }
            var $i = 'i' + $lvl,
              $propertyPath = 'schema' + $lvl + '[' + $i + ']',
              $missingProperty = '\' + ' + $propertyPath + ' + \'';
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
            }
            if ($isData) {
              out += ' if (' + ($vSchema) + ' && !Array.isArray(' + ($vSchema) + ')) {  var err =   '; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'';
                  if (it.opts._errorDataPathProperty) {
                    out += 'is a required property';
                  } else {
                    out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + ($vSchema) + ' !== undefined) { ';
            }
            out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { if (' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
            }
            out += ') {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';
            if ($isData) {
              out += '  }  ';
            }
          } else {
            var arr3 = $required;
            if (arr3) {
              var $propertyKey, i3 = -1,
                l3 = arr3.length - 1;
              while (i3 < l3) {
                $propertyKey = arr3[i3 += 1];
                var $prop = it.util.getProperty($propertyKey),
                  $missingProperty = it.util.escapeQuotes($propertyKey),
                  $useData = $data + $prop;
                if (it.opts._errorDataPathProperty) {
                  it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                }
                out += ' if ( ' + ($useData) + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
                }
                out += ') {  var err =   '; /* istanbul ignore else */
                if (it.createErrors !== false) {
                  out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
                  if (it.opts.messages !== false) {
                    out += ' , message: \'';
                    if (it.opts._errorDataPathProperty) {
                      out += 'is a required property';
                    } else {
                      out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
                    }
                    out += '\' ';
                  }
                  if (it.opts.verbose) {
                    out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
                  }
                  out += ' } ';
                } else {
                  out += ' {} ';
                }
                out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
              }
            }
          }
        }
        it.errorPath = $currentErrorPath;
      } else if ($breakOnError) {
        out += ' if (true) {';
      }
      return out;
    };

    var uniqueItems = function generate_uniqueItems(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      if (($schema || $isData) && it.opts.uniqueItems !== false) {
        if ($isData) {
          out += ' var ' + ($valid) + '; if (' + ($schemaValue) + ' === false || ' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'boolean\') ' + ($valid) + ' = false; else { ';
        }
        out += ' var i = ' + ($data) + '.length , ' + ($valid) + ' = true , j; if (i > 1) { ';
        var $itemType = it.schema.items && it.schema.items.type,
          $typeIsArray = Array.isArray($itemType);
        if (!$itemType || $itemType == 'object' || $itemType == 'array' || ($typeIsArray && ($itemType.indexOf('object') >= 0 || $itemType.indexOf('array') >= 0))) {
          out += ' outer: for (;i--;) { for (j = i; j--;) { if (equal(' + ($data) + '[i], ' + ($data) + '[j])) { ' + ($valid) + ' = false; break outer; } } } ';
        } else {
          out += ' var itemIndices = {}, item; for (;i--;) { var item = ' + ($data) + '[i]; ';
          var $method = 'checkDataType' + ($typeIsArray ? 's' : '');
          out += ' if (' + (it.util[$method]($itemType, 'item', it.opts.strictNumbers, true)) + ') continue; ';
          if ($typeIsArray) {
            out += ' if (typeof item == \'string\') item = \'"\' + item; ';
          }
          out += ' if (typeof itemIndices[item] == \'number\') { ' + ($valid) + ' = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ';
        }
        out += ' } ';
        if ($isData) {
          out += '  }  ';
        }
        out += ' if (!' + ($valid) + ') {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ('uniqueItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { i: i, j: j } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema:  ';
            if ($isData) {
              out += 'validate.schema' + ($schemaPath);
            } else {
              out += '' + ($schema);
            }
            out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } ';
        if ($breakOnError) {
          out += ' else { ';
        }
      } else {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      }
      return out;
    };

    //all requires must be explicit because browserify won't work with dynamic requires
    var dotjs = {
      '$ref': ref,
      allOf: allOf,
      anyOf: anyOf,
      '$comment': comment,
      const: _const,
      contains: contains,
      dependencies: dependencies,
      'enum': _enum,
      format: format,
      'if': _if,
      items: items,
      maximum: _limit,
      minimum: _limit,
      maxItems: _limitItems,
      minItems: _limitItems,
      maxLength: _limitLength,
      minLength: _limitLength,
      maxProperties: _limitProperties,
      minProperties: _limitProperties,
      multipleOf: multipleOf,
      not: not,
      oneOf: oneOf,
      pattern: pattern,
      properties: properties,
      propertyNames: propertyNames,
      required: required,
      uniqueItems: uniqueItems,
      validate: validate
    };

    var toHash$1 = util.toHash;

    var rules = function rules() {
      var RULES = [
        { type: 'number',
          rules: [ { 'maximum': ['exclusiveMaximum'] },
                   { 'minimum': ['exclusiveMinimum'] }, 'multipleOf', 'format'] },
        { type: 'string',
          rules: [ 'maxLength', 'minLength', 'pattern', 'format' ] },
        { type: 'array',
          rules: [ 'maxItems', 'minItems', 'items', 'contains', 'uniqueItems' ] },
        { type: 'object',
          rules: [ 'maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames',
                   { 'properties': ['additionalProperties', 'patternProperties'] } ] },
        { rules: [ '$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if' ] }
      ];

      var ALL = [ 'type', '$comment' ];
      var KEYWORDS = [
        '$schema', '$id', 'id', '$data', '$async', 'title',
        'description', 'default', 'definitions',
        'examples', 'readOnly', 'writeOnly',
        'contentMediaType', 'contentEncoding',
        'additionalItems', 'then', 'else'
      ];
      var TYPES = [ 'number', 'integer', 'string', 'array', 'object', 'boolean', 'null' ];
      RULES.all = toHash$1(ALL);
      RULES.types = toHash$1(TYPES);

      RULES.forEach(function (group) {
        group.rules = group.rules.map(function (keyword) {
          var implKeywords;
          if (typeof keyword == 'object') {
            var key = Object.keys(keyword)[0];
            implKeywords = keyword[key];
            keyword = key;
            implKeywords.forEach(function (k) {
              ALL.push(k);
              RULES.all[k] = true;
            });
          }
          ALL.push(keyword);
          var rule = RULES.all[keyword] = {
            keyword: keyword,
            code: dotjs[keyword],
            implements: implKeywords
          };
          return rule;
        });

        RULES.all.$comment = {
          keyword: '$comment',
          code: dotjs.$comment
        };

        if (group.type) RULES.types[group.type] = group;
      });

      RULES.keywords = toHash$1(ALL.concat(KEYWORDS));
      RULES.custom = {};

      return RULES;
    };

    var KEYWORDS = [
      'multipleOf',
      'maximum',
      'exclusiveMaximum',
      'minimum',
      'exclusiveMinimum',
      'maxLength',
      'minLength',
      'pattern',
      'additionalItems',
      'maxItems',
      'minItems',
      'uniqueItems',
      'maxProperties',
      'minProperties',
      'required',
      'additionalProperties',
      'enum',
      'format',
      'const'
    ];

    var data = function (metaSchema, keywordsJsonPointers) {
      for (var i=0; i<keywordsJsonPointers.length; i++) {
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        var segments = keywordsJsonPointers[i].split('/');
        var keywords = metaSchema;
        var j;
        for (j=1; j<segments.length; j++)
          keywords = keywords[segments[j]];

        for (j=0; j<KEYWORDS.length; j++) {
          var key = KEYWORDS[j];
          var schema = keywords[key];
          if (schema) {
            keywords[key] = {
              anyOf: [
                schema,
                { $ref: 'https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#' }
              ]
            };
          }
        }
      }

      return metaSchema;
    };

    var MissingRefError$1 = error_classes.MissingRef;

    var async = compileAsync;


    /**
     * Creates validating function for passed schema with asynchronous loading of missing schemas.
     * `loadSchema` option should be a function that accepts schema uri and returns promise that resolves with the schema.
     * @this  Ajv
     * @param {Object}   schema schema object
     * @param {Boolean}  meta optional true to compile meta-schema; this parameter can be skipped
     * @param {Function} callback an optional node-style callback, it is called with 2 parameters: error (or null) and validating function.
     * @return {Promise} promise that resolves with a validating function.
     */
    function compileAsync(schema, meta, callback) {
      /* eslint no-shadow: 0 */
      /* global Promise */
      /* jshint validthis: true */
      var self = this;
      if (typeof this._opts.loadSchema != 'function')
        throw new Error('options.loadSchema should be a function');

      if (typeof meta == 'function') {
        callback = meta;
        meta = undefined;
      }

      var p = loadMetaSchemaOf(schema).then(function () {
        var schemaObj = self._addSchema(schema, undefined, meta);
        return schemaObj.validate || _compileAsync(schemaObj);
      });

      if (callback) {
        p.then(
          function(v) { callback(null, v); },
          callback
        );
      }

      return p;


      function loadMetaSchemaOf(sch) {
        var $schema = sch.$schema;
        return $schema && !self.getSchema($schema)
                ? compileAsync.call(self, { $ref: $schema }, true)
                : Promise.resolve();
      }


      function _compileAsync(schemaObj) {
        try { return self._compile(schemaObj); }
        catch(e) {
          if (e instanceof MissingRefError$1) return loadMissingSchema(e);
          throw e;
        }


        function loadMissingSchema(e) {
          var ref = e.missingSchema;
          if (added(ref)) throw new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved');

          var schemaPromise = self._loadingSchemas[ref];
          if (!schemaPromise) {
            schemaPromise = self._loadingSchemas[ref] = self._opts.loadSchema(ref);
            schemaPromise.then(removePromise, removePromise);
          }

          return schemaPromise.then(function (sch) {
            if (!added(ref)) {
              return loadMetaSchemaOf(sch).then(function () {
                if (!added(ref)) self.addSchema(sch, ref, undefined, meta);
              });
            }
          }).then(function() {
            return _compileAsync(schemaObj);
          });

          function removePromise() {
            delete self._loadingSchemas[ref];
          }

          function added(ref) {
            return self._refs[ref] || self._schemas[ref];
          }
        }
      }
    }

    var custom = function generate_custom(it, $keyword, $ruleType) {
      var out = ' ';
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = 'data' + ($dataLvl || '');
      var $valid = 'valid' + $lvl;
      var $errs = 'errs__' + $lvl;
      var $isData = it.opts.$data && $schema && $schema.$data,
        $schemaValue;
      if ($isData) {
        out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
        $schemaValue = 'schema' + $lvl;
      } else {
        $schemaValue = $schema;
      }
      var $rule = this,
        $definition = 'definition' + $lvl,
        $rDef = $rule.definition,
        $closingBraces = '';
      var $compile, $inline, $macro, $ruleValidate, $validateCode;
      if ($isData && $rDef.$data) {
        $validateCode = 'keywordValidate' + $lvl;
        var $validateSchema = $rDef.validateSchema;
        out += ' var ' + ($definition) + ' = RULES.custom[\'' + ($keyword) + '\'].definition; var ' + ($validateCode) + ' = ' + ($definition) + '.validate;';
      } else {
        $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
        if (!$ruleValidate) return;
        $schemaValue = 'validate.schema' + $schemaPath;
        $validateCode = $ruleValidate.code;
        $compile = $rDef.compile;
        $inline = $rDef.inline;
        $macro = $rDef.macro;
      }
      var $ruleErrs = $validateCode + '.errors',
        $i = 'i' + $lvl,
        $ruleErr = 'ruleErr' + $lvl,
        $asyncKeyword = $rDef.async;
      if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');
      if (!($inline || $macro)) {
        out += '' + ($ruleErrs) + ' = null;';
      }
      out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
      if ($isData && $rDef.$data) {
        $closingBraces += '}';
        out += ' if (' + ($schemaValue) + ' === undefined) { ' + ($valid) + ' = true; } else { ';
        if ($validateSchema) {
          $closingBraces += '}';
          out += ' ' + ($valid) + ' = ' + ($definition) + '.validateSchema(' + ($schemaValue) + '); if (' + ($valid) + ') { ';
        }
      }
      if ($inline) {
        if ($rDef.statements) {
          out += ' ' + ($ruleValidate.validate) + ' ';
        } else {
          out += ' ' + ($valid) + ' = ' + ($ruleValidate.validate) + '; ';
        }
      } else if ($macro) {
        var $it = it.util.copy(it);
        var $closingBraces = '';
        $it.level++;
        var $nextValid = 'valid' + $it.level;
        $it.schema = $ruleValidate.validate;
        $it.schemaPath = '';
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += ' ' + ($code);
      } else {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = '';
        out += '  ' + ($validateCode) + '.call( ';
        if (it.opts.passContext) {
          out += 'this';
        } else {
          out += 'self';
        }
        if ($compile || $rDef.schema === false) {
          out += ' , ' + ($data) + ' ';
        } else {
          out += ' , ' + ($schemaValue) + ' , ' + ($data) + ' , validate.schema' + (it.schemaPath) + ' ';
        }
        out += ' , (dataPath || \'\')';
        if (it.errorPath != '""') {
          out += ' + ' + (it.errorPath);
        }
        var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
          $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
        out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ' , rootData )  ';
        var def_callRuleValidate = out;
        out = $$outStack.pop();
        if ($rDef.errors === false) {
          out += ' ' + ($valid) + ' = ';
          if ($asyncKeyword) {
            out += 'await ';
          }
          out += '' + (def_callRuleValidate) + '; ';
        } else {
          if ($asyncKeyword) {
            $ruleErrs = 'customErrors' + $lvl;
            out += ' var ' + ($ruleErrs) + ' = null; try { ' + ($valid) + ' = await ' + (def_callRuleValidate) + '; } catch (e) { ' + ($valid) + ' = false; if (e instanceof ValidationError) ' + ($ruleErrs) + ' = e.errors; else throw e; } ';
          } else {
            out += ' ' + ($ruleErrs) + ' = null; ' + ($valid) + ' = ' + (def_callRuleValidate) + '; ';
          }
        }
      }
      if ($rDef.modifying) {
        out += ' if (' + ($parentData) + ') ' + ($data) + ' = ' + ($parentData) + '[' + ($parentDataProperty) + '];';
      }
      out += '' + ($closingBraces);
      if ($rDef.valid) {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      } else {
        out += ' if ( ';
        if ($rDef.valid === undefined) {
          out += ' !';
          if ($macro) {
            out += '' + ($nextValid);
          } else {
            out += '' + ($valid);
          }
        } else {
          out += ' ' + (!$rDef.valid) + ' ';
        }
        out += ') { ';
        $errorKeyword = $rule.keyword;
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = '';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + (__err) + ']); ';
          } else {
            out += ' validate.errors = [' + (__err) + ']; return false; ';
          }
        } else {
          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        var def_customError = out;
        out = $$outStack.pop();
        if ($inline) {
          if ($rDef.errors) {
            if ($rDef.errors != 'full') {
              out += '  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
              if (it.opts.verbose) {
                out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
              }
              out += ' } ';
            }
          } else {
            if ($rDef.errors === false) {
              out += ' ' + (def_customError) + ' ';
            } else {
              out += ' if (' + ($errs) + ' == errors) { ' + (def_customError) + ' } else {  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
              if (it.opts.verbose) {
                out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
              }
              out += ' } } ';
            }
          }
        } else if ($macro) {
          out += '   var err =   '; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          if (!it.compositeRule && $breakOnError) {
            /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError(vErrors); ';
            } else {
              out += ' validate.errors = vErrors; return false; ';
            }
          }
        } else {
          if ($rDef.errors === false) {
            out += ' ' + (def_customError) + ' ';
          } else {
            out += ' if (Array.isArray(' + ($ruleErrs) + ')) { if (vErrors === null) vErrors = ' + ($ruleErrs) + '; else vErrors = vErrors.concat(' + ($ruleErrs) + '); errors = vErrors.length;  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + ';  ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '";  ';
            if (it.opts.verbose) {
              out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
            }
            out += ' } } else { ' + (def_customError) + ' } ';
          }
        }
        out += ' } ';
        if ($breakOnError) {
          out += ' else { ';
        }
      }
      return out;
    };

    var $schema = "http://json-schema.org/draft-07/schema#";
    var $id = "http://json-schema.org/draft-07/schema#";
    var title = "Core schema meta-schema";
    var definitions = {
    	schemaArray: {
    		type: "array",
    		minItems: 1,
    		items: {
    			$ref: "#"
    		}
    	},
    	nonNegativeInteger: {
    		type: "integer",
    		minimum: 0
    	},
    	nonNegativeIntegerDefault0: {
    		allOf: [
    			{
    				$ref: "#/definitions/nonNegativeInteger"
    			},
    			{
    				"default": 0
    			}
    		]
    	},
    	simpleTypes: {
    		"enum": [
    			"array",
    			"boolean",
    			"integer",
    			"null",
    			"number",
    			"object",
    			"string"
    		]
    	},
    	stringArray: {
    		type: "array",
    		items: {
    			type: "string"
    		},
    		uniqueItems: true,
    		"default": [
    		]
    	}
    };
    var type = [
    	"object",
    	"boolean"
    ];
    var properties$1 = {
    	$id: {
    		type: "string",
    		format: "uri-reference"
    	},
    	$schema: {
    		type: "string",
    		format: "uri"
    	},
    	$ref: {
    		type: "string",
    		format: "uri-reference"
    	},
    	$comment: {
    		type: "string"
    	},
    	title: {
    		type: "string"
    	},
    	description: {
    		type: "string"
    	},
    	"default": true,
    	readOnly: {
    		type: "boolean",
    		"default": false
    	},
    	examples: {
    		type: "array",
    		items: true
    	},
    	multipleOf: {
    		type: "number",
    		exclusiveMinimum: 0
    	},
    	maximum: {
    		type: "number"
    	},
    	exclusiveMaximum: {
    		type: "number"
    	},
    	minimum: {
    		type: "number"
    	},
    	exclusiveMinimum: {
    		type: "number"
    	},
    	maxLength: {
    		$ref: "#/definitions/nonNegativeInteger"
    	},
    	minLength: {
    		$ref: "#/definitions/nonNegativeIntegerDefault0"
    	},
    	pattern: {
    		type: "string",
    		format: "regex"
    	},
    	additionalItems: {
    		$ref: "#"
    	},
    	items: {
    		anyOf: [
    			{
    				$ref: "#"
    			},
    			{
    				$ref: "#/definitions/schemaArray"
    			}
    		],
    		"default": true
    	},
    	maxItems: {
    		$ref: "#/definitions/nonNegativeInteger"
    	},
    	minItems: {
    		$ref: "#/definitions/nonNegativeIntegerDefault0"
    	},
    	uniqueItems: {
    		type: "boolean",
    		"default": false
    	},
    	contains: {
    		$ref: "#"
    	},
    	maxProperties: {
    		$ref: "#/definitions/nonNegativeInteger"
    	},
    	minProperties: {
    		$ref: "#/definitions/nonNegativeIntegerDefault0"
    	},
    	required: {
    		$ref: "#/definitions/stringArray"
    	},
    	additionalProperties: {
    		$ref: "#"
    	},
    	definitions: {
    		type: "object",
    		additionalProperties: {
    			$ref: "#"
    		},
    		"default": {
    		}
    	},
    	properties: {
    		type: "object",
    		additionalProperties: {
    			$ref: "#"
    		},
    		"default": {
    		}
    	},
    	patternProperties: {
    		type: "object",
    		additionalProperties: {
    			$ref: "#"
    		},
    		propertyNames: {
    			format: "regex"
    		},
    		"default": {
    		}
    	},
    	dependencies: {
    		type: "object",
    		additionalProperties: {
    			anyOf: [
    				{
    					$ref: "#"
    				},
    				{
    					$ref: "#/definitions/stringArray"
    				}
    			]
    		}
    	},
    	propertyNames: {
    		$ref: "#"
    	},
    	"const": true,
    	"enum": {
    		type: "array",
    		items: true,
    		minItems: 1,
    		uniqueItems: true
    	},
    	type: {
    		anyOf: [
    			{
    				$ref: "#/definitions/simpleTypes"
    			},
    			{
    				type: "array",
    				items: {
    					$ref: "#/definitions/simpleTypes"
    				},
    				minItems: 1,
    				uniqueItems: true
    			}
    		]
    	},
    	format: {
    		type: "string"
    	},
    	contentMediaType: {
    		type: "string"
    	},
    	contentEncoding: {
    		type: "string"
    	},
    	"if": {
    		$ref: "#"
    	},
    	then: {
    		$ref: "#"
    	},
    	"else": {
    		$ref: "#"
    	},
    	allOf: {
    		$ref: "#/definitions/schemaArray"
    	},
    	anyOf: {
    		$ref: "#/definitions/schemaArray"
    	},
    	oneOf: {
    		$ref: "#/definitions/schemaArray"
    	},
    	not: {
    		$ref: "#"
    	}
    };
    var require$$2 = {
    	$schema: $schema,
    	$id: $id,
    	title: title,
    	definitions: definitions,
    	type: type,
    	properties: properties$1,
    	"default": true
    };

    var definition_schema = {
      $id: 'https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js',
      definitions: {
        simpleTypes: require$$2.definitions.simpleTypes
      },
      type: 'object',
      dependencies: {
        schema: ['validate'],
        $data: ['validate'],
        statements: ['inline'],
        valid: {not: {required: ['macro']}}
      },
      properties: {
        type: require$$2.properties.type,
        schema: {type: 'boolean'},
        statements: {type: 'boolean'},
        dependencies: {
          type: 'array',
          items: {type: 'string'}
        },
        metaSchema: {type: 'object'},
        modifying: {type: 'boolean'},
        valid: {type: 'boolean'},
        $data: {type: 'boolean'},
        async: {type: 'boolean'},
        errors: {
          anyOf: [
            {type: 'boolean'},
            {const: 'full'}
          ]
        }
      }
    };

    var IDENTIFIER$1 = /^[a-z_$][a-z0-9_$-]*$/i;



    var keyword = {
      add: addKeyword,
      get: getKeyword,
      remove: removeKeyword,
      validate: validateKeyword
    };


    /**
     * Define custom keyword
     * @this  Ajv
     * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
     * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
     * @return {Ajv} this for method chaining
     */
    function addKeyword(keyword, definition) {
      /* jshint validthis: true */
      /* eslint no-shadow: 0 */
      var RULES = this.RULES;
      if (RULES.keywords[keyword])
        throw new Error('Keyword ' + keyword + ' is already defined');

      if (!IDENTIFIER$1.test(keyword))
        throw new Error('Keyword ' + keyword + ' is not a valid identifier');

      if (definition) {
        this.validateKeyword(definition, true);

        var dataType = definition.type;
        if (Array.isArray(dataType)) {
          for (var i=0; i<dataType.length; i++)
            _addRule(keyword, dataType[i], definition);
        } else {
          _addRule(keyword, dataType, definition);
        }

        var metaSchema = definition.metaSchema;
        if (metaSchema) {
          if (definition.$data && this._opts.$data) {
            metaSchema = {
              anyOf: [
                metaSchema,
                { '$ref': 'https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#' }
              ]
            };
          }
          definition.validateSchema = this.compile(metaSchema, true);
        }
      }

      RULES.keywords[keyword] = RULES.all[keyword] = true;


      function _addRule(keyword, dataType, definition) {
        var ruleGroup;
        for (var i=0; i<RULES.length; i++) {
          var rg = RULES[i];
          if (rg.type == dataType) {
            ruleGroup = rg;
            break;
          }
        }

        if (!ruleGroup) {
          ruleGroup = { type: dataType, rules: [] };
          RULES.push(ruleGroup);
        }

        var rule = {
          keyword: keyword,
          definition: definition,
          custom: true,
          code: custom,
          implements: definition.implements
        };
        ruleGroup.rules.push(rule);
        RULES.custom[keyword] = rule;
      }

      return this;
    }


    /**
     * Get keyword
     * @this  Ajv
     * @param {String} keyword pre-defined or custom keyword.
     * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
     */
    function getKeyword(keyword) {
      /* jshint validthis: true */
      var rule = this.RULES.custom[keyword];
      return rule ? rule.definition : this.RULES.keywords[keyword] || false;
    }


    /**
     * Remove keyword
     * @this  Ajv
     * @param {String} keyword pre-defined or custom keyword.
     * @return {Ajv} this for method chaining
     */
    function removeKeyword(keyword) {
      /* jshint validthis: true */
      var RULES = this.RULES;
      delete RULES.keywords[keyword];
      delete RULES.all[keyword];
      delete RULES.custom[keyword];
      for (var i=0; i<RULES.length; i++) {
        var rules = RULES[i].rules;
        for (var j=0; j<rules.length; j++) {
          if (rules[j].keyword == keyword) {
            rules.splice(j, 1);
            break;
          }
        }
      }
      return this;
    }


    /**
     * Validate keyword definition
     * @this  Ajv
     * @param {Object} definition keyword definition object.
     * @param {Boolean} throwError true to throw exception if definition is invalid
     * @return {boolean} validation result
     */
    function validateKeyword(definition, throwError) {
      validateKeyword.errors = null;
      var v = this._validateKeyword = this._validateKeyword
                                      || this.compile(definition_schema, true);

      if (v(definition)) return true;
      validateKeyword.errors = v.errors;
      if (throwError)
        throw new Error('custom keyword definition is invalid: '  + this.errorsText(v.errors));
      else
        return false;
    }

    var $schema$1 = "http://json-schema.org/draft-07/schema#";
    var $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
    var description = "Meta-schema for $data reference (JSON Schema extension proposal)";
    var type$1 = "object";
    var required$1 = [
    	"$data"
    ];
    var properties$2 = {
    	$data: {
    		type: "string",
    		anyOf: [
    			{
    				format: "relative-json-pointer"
    			},
    			{
    				format: "json-pointer"
    			}
    		]
    	}
    };
    var additionalProperties = false;
    var require$$1 = {
    	$schema: $schema$1,
    	$id: $id$1,
    	description: description,
    	type: type$1,
    	required: required$1,
    	properties: properties$2,
    	additionalProperties: additionalProperties
    };

    var ajv = Ajv;

    Ajv.prototype.validate = validate$1;
    Ajv.prototype.compile = compile$1;
    Ajv.prototype.addSchema = addSchema;
    Ajv.prototype.addMetaSchema = addMetaSchema;
    Ajv.prototype.validateSchema = validateSchema;
    Ajv.prototype.getSchema = getSchema;
    Ajv.prototype.removeSchema = removeSchema;
    Ajv.prototype.addFormat = addFormat;
    Ajv.prototype.errorsText = errorsText;

    Ajv.prototype._addSchema = _addSchema;
    Ajv.prototype._compile = _compile;

    Ajv.prototype.compileAsync = async;

    Ajv.prototype.addKeyword = keyword.add;
    Ajv.prototype.getKeyword = keyword.get;
    Ajv.prototype.removeKeyword = keyword.remove;
    Ajv.prototype.validateKeyword = keyword.validate;


    Ajv.ValidationError = error_classes.Validation;
    Ajv.MissingRefError = error_classes.MissingRef;
    Ajv.$dataMetaSchema = data;

    var META_SCHEMA_ID = 'http://json-schema.org/draft-07/schema';

    var META_IGNORE_OPTIONS = [ 'removeAdditional', 'useDefaults', 'coerceTypes', 'strictDefaults' ];
    var META_SUPPORT_DATA = ['/properties'];

    /**
     * Creates validator instance.
     * Usage: `Ajv(opts)`
     * @param {Object} opts optional options
     * @return {Object} ajv instance
     */
    function Ajv(opts) {
      if (!(this instanceof Ajv)) return new Ajv(opts);
      opts = this._opts = util.copy(opts) || {};
      setLogger(this);
      this._schemas = {};
      this._refs = {};
      this._fragments = {};
      this._formats = formats_1(opts.format);

      this._cache = opts.cache || new cache;
      this._loadingSchemas = {};
      this._compilations = [];
      this.RULES = rules();
      this._getId = chooseGetId(opts);

      opts.loopRequired = opts.loopRequired || Infinity;
      if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
      if (opts.serialize === undefined) opts.serialize = fastJsonStableStringify;
      this._metaOpts = getMetaSchemaOptions(this);

      if (opts.formats) addInitialFormats(this);
      if (opts.keywords) addInitialKeywords(this);
      addDefaultMetaSchema(this);
      if (typeof opts.meta == 'object') this.addMetaSchema(opts.meta);
      if (opts.nullable) this.addKeyword('nullable', {metaSchema: {type: 'boolean'}});
      addInitialSchemas(this);
    }



    /**
     * Validate data using schema
     * Schema will be compiled and cached (using serialized JSON as key. [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize.
     * @this   Ajv
     * @param  {String|Object} schemaKeyRef key, ref or schema object
     * @param  {Any} data to be validated
     * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
     */
    function validate$1(schemaKeyRef, data) {
      var v;
      if (typeof schemaKeyRef == 'string') {
        v = this.getSchema(schemaKeyRef);
        if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
      } else {
        var schemaObj = this._addSchema(schemaKeyRef);
        v = schemaObj.validate || this._compile(schemaObj);
      }

      var valid = v(data);
      if (v.$async !== true) this.errors = v.errors;
      return valid;
    }


    /**
     * Create validating function for passed schema.
     * @this   Ajv
     * @param  {Object} schema schema object
     * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
     * @return {Function} validating function
     */
    function compile$1(schema, _meta) {
      var schemaObj = this._addSchema(schema, undefined, _meta);
      return schemaObj.validate || this._compile(schemaObj);
    }


    /**
     * Adds schema to the instance.
     * @this   Ajv
     * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
     * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
     * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
     * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
     * @return {Ajv} this for method chaining
     */
    function addSchema(schema, key, _skipValidation, _meta) {
      if (Array.isArray(schema)){
        for (var i=0; i<schema.length; i++) this.addSchema(schema[i], undefined, _skipValidation, _meta);
        return this;
      }
      var id = this._getId(schema);
      if (id !== undefined && typeof id != 'string')
        throw new Error('schema id must be string');
      key = resolve_1.normalizeId(key || id);
      checkUnique(this, key);
      this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
      return this;
    }


    /**
     * Add schema that will be used to validate other schemas
     * options in META_IGNORE_OPTIONS are alway set to false
     * @this   Ajv
     * @param {Object} schema schema object
     * @param {String} key optional schema key
     * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
     * @return {Ajv} this for method chaining
     */
    function addMetaSchema(schema, key, skipValidation) {
      this.addSchema(schema, key, skipValidation, true);
      return this;
    }


    /**
     * Validate schema
     * @this   Ajv
     * @param {Object} schema schema to validate
     * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
     * @return {Boolean} true if schema is valid
     */
    function validateSchema(schema, throwOrLogError) {
      var $schema = schema.$schema;
      if ($schema !== undefined && typeof $schema != 'string')
        throw new Error('$schema must be a string');
      $schema = $schema || this._opts.defaultMeta || defaultMeta(this);
      if (!$schema) {
        this.logger.warn('meta-schema not available');
        this.errors = null;
        return true;
      }
      var valid = this.validate($schema, schema);
      if (!valid && throwOrLogError) {
        var message = 'schema is invalid: ' + this.errorsText();
        if (this._opts.validateSchema == 'log') this.logger.error(message);
        else throw new Error(message);
      }
      return valid;
    }


    function defaultMeta(self) {
      var meta = self._opts.meta;
      self._opts.defaultMeta = typeof meta == 'object'
                                ? self._getId(meta) || meta
                                : self.getSchema(META_SCHEMA_ID)
                                  ? META_SCHEMA_ID
                                  : undefined;
      return self._opts.defaultMeta;
    }


    /**
     * Get compiled schema from the instance by `key` or `ref`.
     * @this   Ajv
     * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
     * @return {Function} schema validating function (with property `schema`).
     */
    function getSchema(keyRef) {
      var schemaObj = _getSchemaObj(this, keyRef);
      switch (typeof schemaObj) {
        case 'object': return schemaObj.validate || this._compile(schemaObj);
        case 'string': return this.getSchema(schemaObj);
        case 'undefined': return _getSchemaFragment(this, keyRef);
      }
    }


    function _getSchemaFragment(self, ref) {
      var res = resolve_1.schema.call(self, { schema: {} }, ref);
      if (res) {
        var schema = res.schema
          , root = res.root
          , baseId = res.baseId;
        var v = compile_1.call(self, schema, root, undefined, baseId);
        self._fragments[ref] = new schema_obj({
          ref: ref,
          fragment: true,
          schema: schema,
          root: root,
          baseId: baseId,
          validate: v
        });
        return v;
      }
    }


    function _getSchemaObj(self, keyRef) {
      keyRef = resolve_1.normalizeId(keyRef);
      return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
    }


    /**
     * Remove cached schema(s).
     * If no parameter is passed all schemas but meta-schemas are removed.
     * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
     * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
     * @this   Ajv
     * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
     * @return {Ajv} this for method chaining
     */
    function removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        _removeAllSchemas(this, this._schemas, schemaKeyRef);
        _removeAllSchemas(this, this._refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case 'undefined':
          _removeAllSchemas(this, this._schemas);
          _removeAllSchemas(this, this._refs);
          this._cache.clear();
          return this;
        case 'string':
          var schemaObj = _getSchemaObj(this, schemaKeyRef);
          if (schemaObj) this._cache.del(schemaObj.cacheKey);
          delete this._schemas[schemaKeyRef];
          delete this._refs[schemaKeyRef];
          return this;
        case 'object':
          var serialize = this._opts.serialize;
          var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
          this._cache.del(cacheKey);
          var id = this._getId(schemaKeyRef);
          if (id) {
            id = resolve_1.normalizeId(id);
            delete this._schemas[id];
            delete this._refs[id];
          }
      }
      return this;
    }


    function _removeAllSchemas(self, schemas, regex) {
      for (var keyRef in schemas) {
        var schemaObj = schemas[keyRef];
        if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
          self._cache.del(schemaObj.cacheKey);
          delete schemas[keyRef];
        }
      }
    }


    /* @this   Ajv */
    function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
      if (typeof schema != 'object' && typeof schema != 'boolean')
        throw new Error('schema should be object or boolean');
      var serialize = this._opts.serialize;
      var cacheKey = serialize ? serialize(schema) : schema;
      var cached = this._cache.get(cacheKey);
      if (cached) return cached;

      shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;

      var id = resolve_1.normalizeId(this._getId(schema));
      if (id && shouldAddSchema) checkUnique(this, id);

      var willValidate = this._opts.validateSchema !== false && !skipValidation;
      var recursiveMeta;
      if (willValidate && !(recursiveMeta = id && id == resolve_1.normalizeId(schema.$schema)))
        this.validateSchema(schema, true);

      var localRefs = resolve_1.ids.call(this, schema);

      var schemaObj = new schema_obj({
        id: id,
        schema: schema,
        localRefs: localRefs,
        cacheKey: cacheKey,
        meta: meta
      });

      if (id[0] != '#' && shouldAddSchema) this._refs[id] = schemaObj;
      this._cache.put(cacheKey, schemaObj);

      if (willValidate && recursiveMeta) this.validateSchema(schema, true);

      return schemaObj;
    }


    /* @this   Ajv */
    function _compile(schemaObj, root) {
      if (schemaObj.compiling) {
        schemaObj.validate = callValidate;
        callValidate.schema = schemaObj.schema;
        callValidate.errors = null;
        callValidate.root = root ? root : callValidate;
        if (schemaObj.schema.$async === true)
          callValidate.$async = true;
        return callValidate;
      }
      schemaObj.compiling = true;

      var currentOpts;
      if (schemaObj.meta) {
        currentOpts = this._opts;
        this._opts = this._metaOpts;
      }

      var v;
      try { v = compile_1.call(this, schemaObj.schema, root, schemaObj.localRefs); }
      catch(e) {
        delete schemaObj.validate;
        throw e;
      }
      finally {
        schemaObj.compiling = false;
        if (schemaObj.meta) this._opts = currentOpts;
      }

      schemaObj.validate = v;
      schemaObj.refs = v.refs;
      schemaObj.refVal = v.refVal;
      schemaObj.root = v.root;
      return v;


      /* @this   {*} - custom context, see passContext option */
      function callValidate() {
        /* jshint validthis: true */
        var _validate = schemaObj.validate;
        var result = _validate.apply(this, arguments);
        callValidate.errors = _validate.errors;
        return result;
      }
    }


    function chooseGetId(opts) {
      switch (opts.schemaId) {
        case 'auto': return _get$IdOrId;
        case 'id': return _getId;
        default: return _get$Id;
      }
    }

    /* @this   Ajv */
    function _getId(schema) {
      if (schema.$id) this.logger.warn('schema $id ignored', schema.$id);
      return schema.id;
    }

    /* @this   Ajv */
    function _get$Id(schema) {
      if (schema.id) this.logger.warn('schema id ignored', schema.id);
      return schema.$id;
    }


    function _get$IdOrId(schema) {
      if (schema.$id && schema.id && schema.$id != schema.id)
        throw new Error('schema $id is different from id');
      return schema.$id || schema.id;
    }


    /**
     * Convert array of error message objects to string
     * @this   Ajv
     * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
     * @param  {Object} options optional options with properties `separator` and `dataVar`.
     * @return {String} human readable string with all errors descriptions
     */
    function errorsText(errors, options) {
      errors = errors || this.errors;
      if (!errors) return 'No errors';
      options = options || {};
      var separator = options.separator === undefined ? ', ' : options.separator;
      var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;

      var text = '';
      for (var i=0; i<errors.length; i++) {
        var e = errors[i];
        if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
      }
      return text.slice(0, -separator.length);
    }


    /**
     * Add custom format
     * @this   Ajv
     * @param {String} name format name
     * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
     * @return {Ajv} this for method chaining
     */
    function addFormat(name, format) {
      if (typeof format == 'string') format = new RegExp(format);
      this._formats[name] = format;
      return this;
    }


    function addDefaultMetaSchema(self) {
      var $dataSchema;
      if (self._opts.$data) {
        $dataSchema = require$$1;
        self.addMetaSchema($dataSchema, $dataSchema.$id, true);
      }
      if (self._opts.meta === false) return;
      var metaSchema = require$$2;
      if (self._opts.$data) metaSchema = data(metaSchema, META_SUPPORT_DATA);
      self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
      self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
    }


    function addInitialSchemas(self) {
      var optsSchemas = self._opts.schemas;
      if (!optsSchemas) return;
      if (Array.isArray(optsSchemas)) self.addSchema(optsSchemas);
      else for (var key in optsSchemas) self.addSchema(optsSchemas[key], key);
    }


    function addInitialFormats(self) {
      for (var name in self._opts.formats) {
        var format = self._opts.formats[name];
        self.addFormat(name, format);
      }
    }


    function addInitialKeywords(self) {
      for (var name in self._opts.keywords) {
        var keyword = self._opts.keywords[name];
        self.addKeyword(name, keyword);
      }
    }


    function checkUnique(self, id) {
      if (self._schemas[id] || self._refs[id])
        throw new Error('schema with key or id "' + id + '" already exists');
    }


    function getMetaSchemaOptions(self) {
      var metaOpts = util.copy(self._opts);
      for (var i=0; i<META_IGNORE_OPTIONS.length; i++)
        delete metaOpts[META_IGNORE_OPTIONS[i]];
      return metaOpts;
    }


    function setLogger(self) {
      var logger = self._opts.logger;
      if (logger === false) {
        self.logger = {log: noop, warn: noop, error: noop};
      } else {
        if (logger === undefined) logger = console;
        if (!(typeof logger == 'object' && logger.log && logger.warn && logger.error))
          throw new Error('logger must implement log, warn and error methods');
        self.logger = logger;
      }
    }


    function noop() {}

    const ajv$1 = new ajv({ allErrors: true, jsonPointers: true });
    const ConfigSchema = {
        type: "object",
        properties: {
            discoverExisting: { type: "boolean" },
            standardConfiguration: { type: "boolean" },
            domains: {
                type: "object",
                additionalProperties: {
                    type: ["object", "null"],
                    properties: {
                        icon: { type: "string" },
                        actions: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    icon: { type: "string" },
                                    name: { type: "string" },
                                    service: { type: "string" },
                                    service_data: { type: "object" },
                                    variable: {
                                        type: "object",
                                        properties: {
                                            field: { type: "string" },
                                            name: { type: "string" },
                                            unit: { type: "string" },
                                            min: { type: "number" },
                                            max: { type: "number" },
                                            step: { type: "number" },
                                            optional: { type: "boolean" },
                                            showPercentage: { type: "boolean" }
                                        },
                                        required: ['field'],
                                        additionalProperties: false
                                    }
                                },
                                required: ['service'],
                                additionalProperties: false
                            },
                        },
                        include: {
                            type: "array",
                            "items": { type: "string" }
                        },
                        exclude: {
                            type: "array",
                            "items": { type: "string" }
                        }
                    },
                    additionalProperties: false
                }
            },
            entities: {
                type: "object",
                additionalProperties: {
                    type: ["object", "null"],
                    properties: {
                        name: { type: "string" },
                        icon: { type: "string" },
                        actions: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    icon: { type: "string" },
                                    name: { type: "string" },
                                    service: { type: "string" },
                                    service_data: { type: "object" },
                                    variable: {
                                        type: "object",
                                        properties: {
                                            field: { type: "string" },
                                            name: { type: "string" },
                                            unit: { type: "string" },
                                            min: { type: "number" },
                                            max: { type: "number" },
                                            step: { type: "number" },
                                            optional: { type: "boolean" },
                                            showPercentage: { type: "boolean" }
                                        },
                                        required: ['field'],
                                        additionalProperties: false
                                    }
                                },
                                required: ["service"],
                                additionalProperties: false
                            },
                        }
                    },
                    additionalProperties: false
                }
            },
            groups: {
                type: "object",
                additionalProperties: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        icon: { type: "string" },
                        entities: { type: "array", items: { type: "string" } },
                        domains: { type: "array", items: { type: "string" } },
                    },
                    additionalProperties: false,
                    oneOf: [
                        {
                            required: ["entities"]
                        },
                        {
                            required: ["domains"]
                        }
                    ]
                }
            }
        }
    };
    function ValidateConfig(config) {
        let result = ajv$1.validate(ConfigSchema, config);
        if (!result) {
            let errors = ajv$1.errors.map(e => {
                let output = "";
                let path = e.dataPath.substr(1).split('/');
                let item = path.pop();
                if (path.length)
                    output += `in '${path.join('->')}' `;
                if (e.keyword == 'type')
                    output += 'type of ';
                if (!item)
                    output += 'card ';
                else if (item)
                    output += `${isNaN(+item) ? `'${item}'` : `[item ${item}]`} `;
                output += e.message;
                if (e.params.hasOwnProperty("additionalProperty"))
                    output += ` '${e.params['additionalProperty']}'`;
                return `${output.charAt(0).toUpperCase() + output.slice(1)}.`;
            });
            throw new Error(`Invalid configuration provided. ${errors.map((e, i) => { return `(${i + 1}) ${e}`; }).join(` `)}`);
        }
    }

    const CARD_VERSION = "1.2.6";

    console.info(`%c  SCHEDULER-CARD  \n%c  Version ${CARD_VERSION}   `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
    window.customCards = window.customCards || [];
    window.customCards.push({
        type: 'scheduler-card',
        name: 'Scheduler Card',
        description: 'Card to manage schedule entities made with scheduler-component.',
    });
    exports.SchedulerCard = class SchedulerCard extends LitElement {
        constructor() {
            super(...arguments);
            this.Config = new Config;
            this.entries = [];
            this.selection = Object.assign({}, DefaultUserSelection);
            this.count = 0;
            this.await_update = true;
        }
        static get styles() {
            return styles;
        }
        set hass(hass) {
            if (!this.await_update)
                return;
            if (!this.Config)
                return;
            if (!this._hass)
                this.Config.LoadEntities(hass.states);
            this.update_entries(hass);
            this._hass = hass;
        }
        update_entries(hass) {
            let entries = filter(hass.states, entity => IsSchedulerEntity(entity.entity_id))
                .map(e => ImportFromHass(e, this.Config))
                .filter(e => { return e.actions[0] !== undefined; });
            if (entries != this.entries) {
                this.entries = entries;
                this.await_update = false;
                this.requestUpdate();
            }
        }
        awaitUpdate() {
            this.await_update = true;
        }
        render() {
            if (!this.selection.newItem && !this.selection.editItem) {
                return html `
      <ha-card>
        <div class="card-header">${localize('scheduler')}</div>
        <div class="card-section first">
        ${this.getEntries()}
        </div>
        <div class="card-section last">
          <mwc-button outlined @click="${() => { this.newItem(); }}">${localize('actions.add')}</mwc-button>
        </div>
      </ha-card>
      `;
            }
            else if (this.selection.newItem && !this.selection.actionConfirmed) {
                return html `
        <ha-card>
          <div class="card-header">${localize('scheduler')}</div>
          <div class="card-section first">
            <div class="header">${localize('fields.group')}</div>
            <div class="option-list">
            ${this.getGroups()}
            </div>
            <div class="header">${localize('fields.entity')}</div>
            <div class="option-list">
            ${this.getEntities()}
            </div>
            <div class="header">${localize('fields.action')}</div>
            <div class="option-list">
            ${this.getActions()}
            </div>
          </div>
          <div class="card-section last">
            <mwc-button outlined @click="${() => this.editItemCancel()}">${localize('actions.cancel')}</mwc-button>
            ${this.selection.action ? html `<mwc-button outlined @click="${() => this.newItemConfirm()}">${localize('actions.next')}</mwc-button>` : html `<mwc-button outlined disabled>${localize('actions.next')}</mwc-button>`}
          </div>
        </ha-card>
      `;
            }
            else {
                return html `
      <ha-card>
        <div class="card-header">${localize('scheduler')}</div>
        ${this.showEditor()}
      </ha-card>
      `;
            }
        }
        newItem() {
            this.selection = assignIn(Object.assign({}, DefaultUserSelection), {
                newItem: true,
            });
            this.requestUpdate();
        }
        editItemCancel() {
            this.selection = Object.assign({}, DefaultUserSelection);
            this.requestUpdate();
        }
        newItemConfirm() {
            this.selection = assignIn(Object.assign({}, DefaultUserSelection), {
                newItem: true,
                actionConfirmed: true,
                entity: this.selection.entity,
                action: this.selection.action
            });
            this.requestUpdate();
        }
        getEntries() {
            if (!this.entries || !this.entries.length)
                return [html `
      <div class="text-field">
        ${localize('instructions.no_entries_defined')}
      </div>
    `];
            return this.entries.map(entry => {
                if (!entry.actions[0])
                    return html ``;
                let entity = this.Config.FindEntity(entry.actions[0].entity);
                let action = this.Config.FindAction(entry.actions[0].entity, entry.actions[0].action);
                if (!entity || !action)
                    return html ``;
                let action_string = PrettyPrintName(action.name);
                if (entry.actions[0].hasOwnProperty('level')) {
                    let cfg = action['variable'];
                    let value = entry.actions[0].level;
                    let unit = cfg.hasOwnProperty('unit') ? cfg.unit : "";
                    if (cfg.showPercentage) {
                        value = Math.round(((value - cfg.min) / (cfg.max - cfg.min)) * 100);
                        if (value < cfg.min)
                            value = cfg.min;
                        else if (value > cfg.max)
                            value = cfg.max;
                        unit = "%";
                    }
                    action_string = `${localize('services.set_to')} ${value}${unit}`;
                }
                return html `
      <div class="list-item${entry['enabled'] ? '' : ' disabled'}" @click="${() => this.editItem(entry.id)}">
        <div class="list-item-icon">
          ${entity.icon ? html `<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
        </div>
        <div class="list-item-name">
          ${PrettyPrintName(entity.name)}
        </div>
        <div class="list-item-action">
          ${action_string}
        </div>
        <div class="list-item-days">
          ${PrettyPrintDays(entry.entries[0].days)}
        </div>
        <div class="list-item-time">
          ${PrettyPrintTime(pick(entry.entries[0], ['time', 'event', 'offset']))}
        </div>
        <div class="list-item-switch">
          ${entry['enabled'] ? html `<ha-switch checked="checked" @click="${(e) => this.toggleDisable(entry.id, e)}"></ha-switch>` : html `<ha-switch @click="${(e) => this.toggleDisable(entry.id, e)}"></ha-switch>`}
        </div>
      </div>
      `;
            });
        }
        toggleDisable(entity_id, evt) {
            evt.stopPropagation();
            let enabled = !evt.target.checked;
            if (enabled) {
                this._hass.callService('switch', 'turn_on', { entity_id: entity_id });
            }
            else {
                this._hass.callService('switch', 'turn_off', { entity_id: entity_id });
            }
            this.awaitUpdate();
        }
        editItem(entity_id) {
            let data = find(this.entries, { id: entity_id });
            this.selection = assignIn(Object.assign({}, DefaultUserSelection), {
                editItem: entity_id,
                entity: data['actions'][0].entity,
                action: data['actions'][0].action,
                timeHours: data['entries'][0].time.split(':').shift(),
                timeMinutes: data['entries'][0].time.split(':').pop(),
                days: data['entries'][0].days,
                daysType: ComputeDaysType(data['entries'][0].days),
                sun: (data['entries'][0].event !== undefined)
            });
            if (data['actions'][0].level !== undefined) {
                Object.assign(this.selection, {
                    levelEnabled: true,
                    level: data['actions'][0].level
                });
            }
            this.requestUpdate();
        }
        getGroups() {
            let groups = this.Config.GetGroups();
            if (!groups.length)
                return [html `<div class="text-field">${localize('instructions.no_groups_defined')}</div>`];
            return groups.map((el) => {
                return html `
        <mwc-button class="${this.selection.group == el.id ? ' active' : ''}" @click="${() => { this.selectGroup(el.id); }}">
          ${el.icon ? html `<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
            });
        }
        selectGroup(group) {
            Object.assign(this.selection, {
                group: group,
                entity: null,
                action: null
            });
            this.requestUpdate();
        }
        getEntities() {
            if (!this.selection.group)
                return [html `<div class="text-field">${localize('instructions.no_group_selected')}</div>`];
            let entities = this.Config.GetEntitiesForGroup(this.selection.group);
            if (!entities.length)
                return [html `<div class="text-field">${localize('instructions.no_entities_for_group')}</div>`];
            return entities.map((el) => {
                return html `
        <mwc-button class="${this.selection.entity == el.id ? ' active' : ''}" @click="${() => { this.selectEntity(el.id); }}">
          ${el.icon ? html `<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
            });
        }
        selectEntity(entity) {
            Object.assign(this.selection, {
                entity: entity,
                action: null
            });
            this.requestUpdate();
        }
        getActions() {
            if (!this.selection.entity)
                return [html `<div class="text-field">${localize('instructions.no_entity_selected')}</div>`];
            let actions = this.Config.GetActionsForEntity(this.selection.entity);
            if (!actions.length)
                return [html `<div class="text-field">${localize('instructions.no_actions_for_entity')}</div>`];
            return actions.map((el) => {
                return html `
        <mwc-button class="${this.selection.action == el.id ? ' active' : ''}" @click="${() => { this.selectAction(el.id); }}">
          ${el.icon ? html `<ha-icon icon="${PrettyPrintIcon(el.icon)}" class="padded-right"></ha-icon>` : ''}
          ${PrettyPrintName(el.name)}
        </mwc-button>
      `;
            });
        }
        selectAction(action) {
            Object.assign(this.selection, {
                action: action
            });
            this.requestUpdate();
        }
        setConfig(config) {
            ValidateConfig(config);
            this.Config.setUserConfig(config);
        }
        showEditor() {
            let entity = this.Config.FindEntity(this.selection.entity);
            let action = this.Config.FindAction(this.selection.entity, this.selection.action);
            if (!entity || !action)
                return html ``;
            return html `
    <div class="card-section first">
      <div class="header">${localize('fields.action')}</div>
      <div class="summary">
        <div class="summary-entity">
          <div class="summary-icon">
            ${entity.icon ? html `<ha-icon icon="${PrettyPrintIcon(entity.icon)}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(entity.name)}
          </div>
        </div>
        <div class="summary-arrow">
          <ha-icon icon="hass:arrow-right"></ha-icon>
        </div>
        <div class="summary-action">
          <div class="summary-icon">
            ${action.icon ? html `<ha-icon icon="${PrettyPrintIcon(action.icon)}"></ha-icon>` : ''}
          </div>
          <div class="summary-text">
            ${PrettyPrintName(action.name)}
          </div>
        </div>
      </div>
     </div>
     ${action.hasOwnProperty('variable') ? this.getLevelPanel(action['variable']) : ''}
    <div class="card-section">
      <div class="header">${localize('fields.days')}</div>
      <div class="day-list">
        <mwc-button class="day-item${this.selection.daysType == 'daily' ? ' active' : ''}" index="daily" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_daily')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'weekdays' ? ' active' : ''}" index="weekdays" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_weekdays')}</mwc-button>
        <mwc-button class="day-item${this.selection.daysType == 'custom' ? ' active' : ''}" index="custom" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('fields.day_type_custom')}</mwc-button>
      </div>
      <div class="day-list${this.selection.daysType == 'custom' ? '' : ' closed'}" id="day-list-custom">
        <mwc-button class="day-item${this.selection.days.includes(1) ? ' active' : ''}" index="1" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.mon')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(2) ? ' active' : ''}" index="2" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.tue')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(3) ? ' active' : ''}" index="3" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.wed')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(4) ? ' active' : ''}" index="4" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.thu')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(5) ? ' active' : ''}" index="5" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.fri')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(6) ? ' active' : ''}" index="6" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sat')}</mwc-button>
        <mwc-button class="day-item${this.selection.days.includes(7) ? ' active' : ''}" index="7" @click="${(e) => this.updateDays(e.target.getAttribute('index'))}">${localize('days_short.sun')}</mwc-button>
      </div>
    </div>
      
    <div class="card-section">
      <div class="header">${localize('fields.time')}</div>
      <div class="time-picker">
        <div class="time-picker-hours-up">
          <mwc-button @click="${() => this.updateTime('time-hours-up')}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-hours" id="time-hours">
        ${this.selection.timeHours}
        </div>
        <div class="time-picker-hours-down">
          <mwc-button @click="${() => this.updateTime('time-hours-down')}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-separator">
        :
        </div>
        <div class="time-picker-minutes-up">
          <mwc-button @click="${() => this.updateTime('time-minutes-up')}">
            <ha-icon icon="hass:chevron-up"></ha-icon>
          </mwc-button>
        </div>
        <div class="time-picker-minutes" id="time-minutes">
        ${this.selection.timeMinutes}
        </div>
        <div class="time-picker-minutes-down">
          <mwc-button @click="${() => this.updateTime('time-minutes-down')}">
            <ha-icon icon="hass:chevron-down"></ha-icon>
          </mwc-button>
        </div>
      </div>
    </div>
    <div class="card-section">
      <div class="header">${localize('fields.options')}</div>
        <div class="option-item">
          ${this.selection.sun ? html `<paper-checkbox checked name="option-item-sun" @change="${(e) => this.toggleSun(e.target.checked)}">${localize('fields.shift_with_sun')}</paper-checkbox>` : html `<paper-checkbox name="option-item-sun" @change="${(e) => this.toggleSun(e.target)}">${localize('fields.shift_with_sun')}</paper-checkbox>`}
        </div>
      </div>
    </div>
    <div class="card-section last">
      <mwc-button outlined @click="${() => this.editItemCancel()}">${localize('actions.cancel')}</mwc-button>
      ${this.selection.editItem === undefined ? '' : html `<mwc-button outlined @click="${() => this.editItemDelete()}">${localize('actions.delete')}</mwc-button>`}
      <mwc-button outlined @click="${() => this.editItemSave()}">${localize('actions.save')}</mwc-button>
    </div>
    `;
        }
        getLevelPanel(cfg) {
            let min = cfg.min, max = cfg.max, step = cfg.step, unit = cfg.unit;
            let value = this.selection.level;
            if (cfg.showPercentage) {
                value = Math.round(((value - min) / (max - min)) * 100);
                step = 1;
                min = 0;
                max = 100;
                if (value < min)
                    value = min;
                else if (value > max)
                    value = max;
                unit = '%';
            }
            if (!cfg['optional'] && !this.selection.levelEnabled)
                Object.assign(this.selection, { levelEnabled: true });
            return html `
    <div class="card-section">
      <div class="header">${cfg['name']} ${unit ? `in ${unit}` : ''}</div>
      <div class="option-item">
        ${cfg['optional'] ? (this.selection.levelEnabled ? html `<paper-checkbox checked @change="${this._toggleEnableLevel}"></paper-checkbox>` : html `<paper-checkbox @change="${this._toggleEnableLevel}"></paper-checkbox>`) : ``}
        ${this.selection.levelEnabled ? html `<ha-paper-slider id="level" pin min=${min} max=${max} step=${step} value=${value} @change=${this._updateLevel}></ha-paper-slider>` : html `<ha-paper-slider id="level" pin min=${min} max=${max} step=${step} value=${value} @change=${this._updateLevel} disabled></ha-paper-slider>`}
      </div>
     </div>`;
        }
        _toggleEnableLevel(e) {
            let checked = e.target.checked;
            let target = this.shadowRoot.querySelector("#level");
            target.disabled = !checked;
            this.selection.levelEnabled = checked;
        }
        _updateLevel(e) {
            let action = this.Config.FindAction(this.selection.entity, this.selection.action);
            let cfg = action['variable'];
            if (!cfg)
                return;
            let min = cfg.min, max = cfg.max, step = cfg.step;
            let value = Number(e.target.value);
            if (cfg.showPercentage) {
                value = Math.round((value / 100) * (max - min) + min);
            }
            if (value < min)
                value = min;
            else if (value > max)
                value = max;
            this.selection.level = value;
        }
        updateDays(action) {
            var daysTypes = Array('daily', 'weekdays', 'custom');
            if (daysTypes.includes(action))
                this.selection.daysType = action;
            else {
                if (!this.selection.days.includes(Number(action)))
                    this.selection.days.push(Number(action));
                else
                    pull(this.selection.days, Number(action));
                this.selection.daysType = 'custom';
            }
            this.shadowRoot.querySelectorAll(".day-item").forEach(el => {
                let index = String(el.getAttribute('index'));
                if (daysTypes.includes(index)) {
                    if (this.selection.daysType == index)
                        el.classList.add("active");
                    else
                        el.classList.remove("active");
                }
                else if (this.selection.days.includes(Number(index)))
                    el.classList.add("active");
                else
                    el.classList.remove("active");
            });
            if (this.selection.daysType == 'custom')
                this.shadowRoot.querySelector('#day-list-custom').classList.remove('closed');
            else
                this.shadowRoot.querySelector('#day-list-custom').classList.add('closed');
        }
        updateTime(action) {
            let hours = Number(this.selection.timeHours);
            let minutes = Number(this.selection.timeMinutes);
            if (action == 'time-hours-up')
                hours++;
            else if (action == 'time-hours-down')
                hours--;
            else if (action == 'time-minutes-up')
                minutes += 10;
            else if (action == 'time-minutes-down')
                minutes -= 10;
            if (hours < 0)
                hours = 23;
            else if (hours > 23)
                hours = 0;
            else if (minutes < 0)
                minutes = 50;
            else if (minutes > 50)
                minutes = 0;
            let hours_string = String(hours).padStart(2, '0');
            let minutes_string = String(minutes).padStart(2, '0');
            this.shadowRoot.querySelector('#time-hours').innerHTML = hours_string;
            this.shadowRoot.querySelector('#time-minutes').innerHTML = minutes_string;
            this.selection.timeHours = hours_string;
            this.selection.timeMinutes = minutes_string;
        }
        editItemSave() {
            var data = ExportToHass(this.selection, this.Config);
            if (this.selection.newItem) {
                this._hass.callService('scheduler', 'add', data);
            }
            else if (this.selection.editItem) {
                this._hass.callService('scheduler', 'edit', Object.assign(data, { entity_id: this.selection.editItem }));
            }
            this.selection = Object.assign({}, DefaultUserSelection);
            this.awaitUpdate();
        }
        editItemDelete() {
            let entity_id = this.selection.editItem;
            this._hass.callService('scheduler', 'remove', { entity_id: entity_id });
            this.selection = Object.assign({}, DefaultUserSelection);
            this.awaitUpdate();
        }
        toggleSun(selected) {
            this.selection.sun = selected;
        }
    };
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "Config", void 0);
    __decorate([
        property({ type: Number })
    ], exports.SchedulerCard.prototype, "count", void 0);
    __decorate([
        property()
    ], exports.SchedulerCard.prototype, "_hass", void 0);
    exports.SchedulerCard = __decorate([
        customElement('scheduler-card')
    ], exports.SchedulerCard);

    return exports;

}({}));
