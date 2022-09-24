import { ParentComponent } from "solid-js";
import { Store } from "solid-js/store";
import { Id } from "./drag-drop-context";
interface SortableContextState {
    initialIds: Array<Id>;
    sortedIds: Array<Id>;
}
interface SortableContextProps {
    ids: Array<Id>;
}
declare type SortableContext = [Store<SortableContextState>, {}];
declare const Context: import("solid-js").Context<SortableContext>;
declare const SortableProvider: ParentComponent<SortableContextProps>;
declare const useSortableContext: () => SortableContext | null;
export { Context, SortableProvider, useSortableContext };
