import { Setter } from "solid-js";
import { Id, Listeners } from "./drag-drop-context";
import { Transform } from "./layout";
interface Draggable {
    (element: HTMLElement, accessor?: () => {
        skipTransform?: boolean;
    }): void;
    ref: Setter<HTMLElement | null>;
    get isActiveDraggable(): boolean;
    get dragActivators(): Listeners;
    get transform(): Transform;
}
declare const createDraggable: (id: Id, data?: Record<string, any>) => Draggable;
export { createDraggable };
