import { RefSetter } from "./combine-refs";
import { Id, Listeners } from "./drag-drop-context";
import { Transform } from "./layout";
interface Sortable {
    (element: HTMLElement): void;
    ref: RefSetter<HTMLElement | null>;
    get transform(): Transform;
    get dragActivators(): Listeners;
    get isActiveDraggable(): boolean;
    get isActiveDroppable(): boolean;
}
declare const createSortable: (id: Id, data?: Record<string, any>) => Sortable;
export { createSortable };
