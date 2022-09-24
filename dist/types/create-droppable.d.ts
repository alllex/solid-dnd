import { Setter } from "solid-js";
import { Id } from "./drag-drop-context";
import { Transform } from "./layout";
interface Droppable {
    (element: HTMLElement, accessor?: () => {
        skipTransform?: boolean;
    }): void;
    ref: Setter<HTMLElement | null>;
    get isActiveDroppable(): boolean;
    get transform(): Transform;
}
declare const createDroppable: (id: Id, data?: Record<string, any>) => Droppable;
export { createDroppable };
