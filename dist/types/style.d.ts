import { JSX } from "solid-js/jsx-runtime";
import { Layout, Transform } from "./layout";
declare const layoutStyle: (layout: Layout) => JSX.CSSProperties;
declare const transformStyle: (transform: Transform) => JSX.CSSProperties;
declare const maybeTransformStyle: (transform: Transform) => JSX.CSSProperties;
export { layoutStyle, transformStyle, maybeTransformStyle };
