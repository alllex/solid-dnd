import { JSX, ParentComponent } from "solid-js";
import { Draggable } from "./drag-drop-context";
interface DragOverlayProps {
    children: JSX.Element | Element | ((activeDraggable: Draggable | null) => (JSX.Element | Element));
    class?: string;
    style?: JSX.CSSProperties;
}
declare const DragOverlay: ParentComponent<DragOverlayProps>;
export { DragOverlay };
