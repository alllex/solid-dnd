import { distanceBetweenPoints, intersectionRatioOfLayouts } from "./layout";
const closestCenter = (draggable, droppables, context) => {
    const point1 = draggable.transformed.center;
    const collision = { distance: Infinity, droppable: null };
    for (const droppable of droppables) {
        const distance = distanceBetweenPoints(point1, droppable.layout.center);
        if (distance < collision.distance) {
            collision.distance = distance;
            collision.droppable = droppable;
        }
        else if (distance === collision.distance &&
            droppable.id === context.activeDroppableId) {
            collision.droppable = droppable;
        }
    }
    return collision.droppable;
};
const closestCorners = (draggable, droppables, context) => {
    const draggableCorners = draggable.transformed.corners;
    const collision = { distance: Infinity, droppable: null };
    for (const droppable of droppables) {
        const droppableCorners = droppable.layout.corners;
        const distance = distanceBetweenPoints(droppableCorners.topLeft, draggableCorners.topLeft) +
            distanceBetweenPoints(droppableCorners.topRight, draggableCorners.topRight) +
            distanceBetweenPoints(droppableCorners.bottomRight, draggableCorners.bottomRight) +
            distanceBetweenPoints(droppableCorners.bottomLeft, draggableCorners.bottomLeft);
        if (distance < collision.distance) {
            collision.distance = distance;
            collision.droppable = droppable;
        }
        else if (distance === collision.distance &&
            droppable.id === context.activeDroppableId) {
            collision.droppable = droppable;
        }
    }
    return collision.droppable;
};
const mostIntersecting = (draggable, droppables, context) => {
    const draggableLayout = draggable.transformed;
    const collision = { ratio: 0, droppable: null };
    for (const droppable of droppables) {
        const ratio = intersectionRatioOfLayouts(draggableLayout, droppable.layout);
        if (ratio > collision.ratio) {
            collision.ratio = ratio;
            collision.droppable = droppable;
        }
        else if (ratio > 0 &&
            ratio === collision.ratio &&
            droppable.id === context.activeDroppableId) {
            collision.droppable = droppable;
        }
    }
    return collision.droppable;
};
export { closestCenter, closestCorners, mostIntersecting };
