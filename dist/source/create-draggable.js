import { createEffect, createSignal, onCleanup, onMount, } from "solid-js";
import { useDragDropContext } from "./drag-drop-context";
import { elementLayout, noopTransform, transformsAreEqual, } from "./layout";
import { transformStyle } from "./style";
const createDraggable = (id, data = {}) => {
    const [state, { addDraggable, removeDraggable, draggableActivators }] = useDragDropContext();
    const [node, setNode] = createSignal(null);
    onMount(() => {
        const resolvedNode = node();
        if (resolvedNode) {
            addDraggable({
                id,
                node: resolvedNode,
                layout: elementLayout(resolvedNode),
                data,
            });
        }
    });
    onCleanup(() => removeDraggable(id));
    const isActiveDraggable = () => state.active.draggableId === id;
    const transform = () => {
        return state.draggables[id]?.transform || noopTransform();
    };
    const draggable = Object.defineProperties((element, accessor) => {
        const config = accessor ? accessor() : {};
        createEffect(() => {
            const resolvedNode = node();
            const activators = draggableActivators(id);
            if (resolvedNode) {
                for (const key in activators) {
                    resolvedNode.addEventListener(key, activators[key]);
                }
            }
            onCleanup(() => {
                if (resolvedNode) {
                    for (const key in activators) {
                        resolvedNode.removeEventListener(key, activators[key]);
                    }
                }
            });
        });
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
        isActiveDraggable: {
            enumerable: true,
            get: isActiveDraggable,
        },
        dragActivators: {
            enumerable: true,
            get: () => {
                return draggableActivators(id, true);
            },
        },
        transform: {
            enumerable: true,
            get: transform,
        },
    });
    return draggable;
};
export { createDraggable };
