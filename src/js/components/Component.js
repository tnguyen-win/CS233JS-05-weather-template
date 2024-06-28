export default class Component {
    getNodeChildrenEventHandler(target, elem, fn) {
        const children = [...elem.children];
        const container = children.filter(child => child.contains(target))[0];
        const data = container.dataset;

        fn(data);
    }

    delegate = (type, elem, fn) => elem.addEventListener(type, e => this.getNodeChildrenEventHandler(e.target, elem, fn));
}
