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


const isEvent = key => key.startsWith("on");

function sync(virtualNode, realNode) {
    // Sync element
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'key' || name === 'children') {
                return
            }
            // console.log("isEvent",  isEvent(name));
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

    // for (let i = 0; i < virtualChildren.length || i < realChildren.length; i++) {
    //     const virtual = virtualChildren[i]
    //     const real = realChildren[i]
    // delete in array
    if (virtualChildren !== undefined && realChildren !== undefined) {
        if (realChildren[0] !== undefined && realChildren[0].dataset !== undefined && virtualChildren[0] !== undefined) {
            if (virtualChildren[0].key !== null && realChildren[0].dataset.key !== undefined) {
                let virtualArr = [];
                virtualChildren.forEach(el => {
                    virtualArr.push(el.key)
                })

                let realArr = [];
                realChildren.forEach(el => {
                    realArr.push(el.dataset.key)
                })

                const diff = realArr.filter(x => !virtualArr.includes(+x));

                for (const [key, value] of Object.entries(realChildren)) {
                    for (const d of diff) {
                        if (value.dataset.key === d) {
                            realNode.removeChild(value)
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < Math.max(virtualChildren.length, realChildren.length); i++) {
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
            sync(virtual, newReal)
            realNode.appendChild(newReal)
        }
    }
}

function createRealNodeByVirtual(virtual) {
    if (typeof virtual !== 'object') {
        return document.createTextNode('')
    }
    return document.createElement(virtual.type)
}

// ##########################