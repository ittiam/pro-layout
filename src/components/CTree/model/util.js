/*
 * @Date: 2019-11-19 17:02:04
 * @Version: 0.0.1
 * @Author: chenhengling
 * @Description:
 * @LastEditTime: 2019-11-20 14:10:02
 * @LastEditors: chenhengling
 */
export const NODE_KEY = "$treeNodeId";

export const markNodeData = function(node, data) {
    if (!data || data[NODE_KEY]) return;
    Object.defineProperty(data, NODE_KEY, {
        value: node.id,
        enumerable: false,
        configurable: false,
        writable: false
    });
};

export const getNodeKey = function(key, data) {
    if (!key) return data[NODE_KEY];
    return data[key];
};

export const findNearestComponent = (element, componentName) => {
    let target = element;
    while (target && target.tagName !== "BODY") {
        if (target.__vue__ && target.__vue__.$options.name === componentName) {
            return target.__vue__;
        }
        target = target.parentNode;
    }
    return null;
};

export const merge = function(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};

// TODO: use native Array.find, Array.findIndex when IE support is dropped
export const arrayFindIndex = function(arr, pred) {
    for (let i = 0; i !== arr.length; ++i) {
        if (pred(arr[i])) {
            return i;
        }
    }
    return -1;
};
