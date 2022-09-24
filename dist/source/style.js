import { noopTransform, transformsAreEqual } from "./layout";
const layoutStyle = (layout) => {
    return {
        top: `${layout.y}px`,
        left: `${layout.x}px`,
        width: `${layout.width}px`,
        height: `${layout.height}px`,
    };
};
const transformStyle = (transform) => {
    return { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` };
};
const maybeTransformStyle = (transform) => {
    return transformsAreEqual(transform, noopTransform())
        ? {}
        : transformStyle(transform);
};
export { layoutStyle, transformStyle, maybeTransformStyle };
