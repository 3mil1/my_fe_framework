const VDom = {
    createElement: (type, config, ...children) => {
        const key = config ? (config.key || null) : null
        const props = config || {}

        if (children.length === 1) {
            props.children = children[0]
        } else {
            props.children = children
        }

        return {
            type,
            key,
            props
        }
    }
}

export default VDom