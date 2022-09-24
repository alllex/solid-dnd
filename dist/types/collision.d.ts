import { Draggable, Droppable, Id } from "./drag-drop-context";
declare type CollisionDetector = (draggable: Draggable, droppables: Droppable[], context: {
    activeDroppableId: Id | null;
}) => Droppable | null;
declare const closestCenter: CollisionDetector;
declare const closestCorners: CollisionDetector;
declare const mostIntersecting: CollisionDetector;
export { closestCenter, closestCorners, mostIntersecting };
export type { CollisionDetector };
