import { createContext, createEffect, untrack, useContext, } from "solid-js";
import { createStore } from "solid-js/store";
import { useDragDropContext } from "./drag-drop-context";
import { moveArrayItem } from "./move-array-item";
const Context = createContext();
const SortableProvider = (props) => {
    const [dndState] = useDragDropContext();
    const [state, setState] = createStore({
        initialIds: [],
        sortedIds: [],
    });
    const isValidIndex = (index) => {
        return index >= 0 && index < state.initialIds.length;
    };
    createEffect(() => {
        setState("initialIds", [...props.ids]);
        setState("sortedIds", [...props.ids]);
    });
    createEffect(() => {
        if (dndState.active.draggableId && dndState.active.droppableId) {
            untrack(() => {
                const fromIndex = state.sortedIds.indexOf(dndState.active.draggableId);
                const toIndex = state.initialIds.indexOf(dndState.active.droppableId);
                if (!isValidIndex(fromIndex) || !isValidIndex(toIndex)) {
                    setState("sortedIds", [...props.ids]);
                }
                else if (fromIndex !== toIndex) {
                    const resorted = moveArrayItem(state.sortedIds, fromIndex, toIndex);
                    setState("sortedIds", resorted);
                }
            });
        }
        else {
            setState("sortedIds", [...props.ids]);
        }
    });
    const actions = {};
    const context = [state, actions];
    return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
const useSortableContext = () => {
    return useContext(Context) || null;
};
export { Context, SortableProvider, useSortableContext };
