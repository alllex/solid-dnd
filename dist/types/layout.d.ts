interface Point {
    x: number;
    y: number;
}
interface Transform {
    x: number;
    y: number;
}
declare class Layout {
    x: any;
    y: any;
    width: any;
    height: any;
    constructor(rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    get rect(): {
        x: any;
        y: any;
        width: any;
        height: any;
    };
    get left(): any;
    get top(): any;
    get right(): any;
    get bottom(): any;
    get center(): Point;
    get corners(): {
        topLeft: Point;
        topRight: Point;
        bottomRight: Point;
        bottomLeft: Point;
    };
}
declare const elementLayout: (element: HTMLElement) => Layout;
declare const stripTransformFromLayout: (layout: Layout, transform: string) => Layout;
declare const noopTransform: () => Transform;
declare const transformsAreEqual: (firstTransform: Transform, secondTransform: Transform) => boolean;
declare const transformLayout: (layout: Layout, transform: Transform) => Layout;
declare const distanceBetweenPoints: (firstPoint: Point, secondPoint: Point) => number;
declare const intersectionRatioOfLayouts: (firstLayout: Layout, secondLayout: Layout) => number;
declare const layoutsAreEqual: (firstLayout: Layout, secondLayout: Layout) => boolean;
declare const layoutContainsPoint: (layout: Layout, point: Point) => boolean;
export { Layout, elementLayout, noopTransform, transformsAreEqual, transformLayout, stripTransformFromLayout, distanceBetweenPoints, intersectionRatioOfLayouts, layoutsAreEqual, layoutContainsPoint, };
export type { Point, Transform };
