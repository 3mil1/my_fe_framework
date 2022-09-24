export function render(virtualDom, realDomRoot) {
    const evaluatedVirtualDom = evaluate(virtualDom)

    const virtualDomRoot = {
        type: realDomRoot.tagName.toLowerCase(),
        props: {
            id: realDomRoot.id,
            children: [
                evaluatedVirtualDom
            ]
        },
    }

    sync(virtualDomRoot, realDomRoot)
}

function evaluate(virtualNode) {
    if (typeof virtualNode !== 'object') {
        return virtualNode
    }

    if (typeof virtualNode.type === 'function') {
        return evaluate((virtualNode.type)(virtualNode.props))
    }

    const props = virtualNode.props || {}

    return {
        ...virtualNode,
        props: {
            ...props,
            children: Array.isArray(props.children) ? props.children.map(evaluate) : [evaluate(props.children)]
        }
    }
}


function sync(virtualNode, realNode) {
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'key' || name === 'children') {
                return
            }
            if (realNode[name] !== value) {
                realNode[name] = value
            }
        })
    }
    if (virtualNode.key) {
        realNode.dataset.key = virtualNode.key
    }
    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = virtualNode
    }

    // Sync child nodes
    const virtualChildren = virtualNode.props ? virtualNode.props.children || [] : []
    const realChildren = realNode.childNodes

    for (let i = 0; i < virtualChildren.length || i < realChildren.length; i++) {
        // if (typeof virtualChildren[i] == 'object' && typeof realChildren[i] == 'object') {
        //     if (virtualChildren[i].props !== undefined && realChildren[i].props !== undefined && virtualChildren[i].props.children[0].key !== null) {
        //         let [v, r] = compare_keys(virtualChildren[i].props.children, realChildren[i].props.children)
        //         virtualChildren[i].props.children = v;
        //         realChildren[i].props.children = r;
        //     }
        // }

        const virtual = virtualChildren[i]
        const real = realChildren[i]

        // Remove
        if (virtual === undefined && real !== undefined) {
            realNode.remove(real)
        }

        // Update
        if (virtual !== undefined && real !== undefined && (virtual.type || '') === (real.tagName || '').toLowerCase()) {
            sync(virtual, real)
        }

        // Replace
        if (virtual !== undefined && real !== undefined && (virtual.type || '') !== (real.tagName || '').toLowerCase()) {
            const newReal = createRealNodeByVirtual(virtual)
            sync(virtual, newReal)
            realNode.replaceChild(newReal, real)
        }

        // Add
        if (virtual !== undefined && real === undefined) {
            const newReal = createRealNodeByVirtual(virtual)
            addEventListeners(newReal, virtual.props)
            sync(virtual, newReal)
            console.log(virtual)
            realNode.appendChild(newReal)
        }
    }
}

function compare_keys(virtualNode, realNode) {
    let setOfKeys = new Set()
    for (const node in virtualNode) {
        setOfKeys.add(node.key)
    }

    for (const node in realNode) {
        if (!setOfKeys.has(node.key)) {
            realNode.remove(node)
        }
    }

    return [virtualNode, realNode]
}


function createRealNodeByVirtual(virtual) {
    if (typeof virtual !== 'object') {
        return document.createTextNode('')
    }
    return document.createElement(virtual.type)
}

function addEventListeners($target, props) {
    if (props !== undefined) {
        Object.keys(props).forEach(name => {
            if (isEventProp(name)) {
                $target.removeEventListener(extractEventName(name), props[name])
                $target.addEventListener(
                    extractEventName(name),
                    props[name]
                );
            }
        });
    }
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function isEventProp(name) {
    return /^on/.test(name);
}


