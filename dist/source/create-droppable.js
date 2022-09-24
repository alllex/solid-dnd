import { createEffect, createSignal, onCleanup, onMount, } from "solid-js";
import { useDragDropContext } from "./drag-drop-context";
import { elementLayout, noopTransform, transformsAreEqual, } from "./layout";
import { transformStyle } from "./style";
const createDroppable = (id, data = {}) => {
    const [state, { addDroppable, removeDroppable }] = useDragDropContext();
    const [node, setNode] = createSignal(null);
    onMount(() => {
        const resolvedNode = node();
        if (resolvedNode) {
            addDroppable({
                id,
                node: resolvedNode,
                layout: elementLayout(resolvedNode),
                data,
            });
        }
    });
    onCleanup(() => removeDroppable(id));
    const isActiveDroppable = () => state.active.droppableId === id;
    const transform = () => {
        return state.droppables[id]?.transform || noopTransform();
    };
    const droppable = Object.defineProperties((element, accessor) => {
        const config = accessor ? accessor() : {};
        setNode(element);
        if (!config.skipTransform) {
            createEffect(() => {
                const resolvedTransform = transform();
                if (!transformsAreEqual(resolvedTransform, noopTransform())) {
                    const style = transformStyle(transform());
                    element.style.setProperty("transform", style.transform);
                }
                else {
                    element.style.removeProperty("transform");
                }
            });
        }
    }, {
        ref: {
            enumerable: true,
            value: setNode,
        },
        isActiveDroppable: {
            enumerable: true,
            get: isActiveDroppable,
        },
        transform: {
            enumerable: true,
            get: transform,
        },
    });
    return droppable;
};
export { createDroppable };
