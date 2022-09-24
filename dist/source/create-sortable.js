import { createEffect, onCleanup, onMount } from "solid-js";
import { createDraggable } from "./create-draggable";
import { createDroppable } from "./create-droppable";
import { combineRefs } from "./combine-refs";
import { useSortableContext } from "./sortable-context";
import { useDragDropContext, } from "./drag-drop-context";
import { noopTransform, transformsAreEqual } from "./layout";
import { transformStyle } from "./style";
const createSortable = (id, data = {}) => {
    const [dndState, { addTransformer, removeTransformer }] = useDragDropContext();
    const [sortableState] = useSortableContext();
    const draggable = createDraggable(id, data);
    const droppable = createDroppable(id, data);
    const setNode = combineRefs(draggable.ref, droppable.ref);
    const initialIndex = () => sortableState.initialIds.indexOf(id);
    const currentIndex = () => sortableState.sortedIds.indexOf(id);
    const layoutById = (id) => dndState.droppables[id]?.layout || null;
    const sortedTransform = () => {
        const delta = noopTransform();
        const resolvedInitialIndex = initialIndex();
        const resolvedCurrentIndex = currentIndex();
        if (resolvedCurrentIndex !== resolvedInitialIndex) {
            const currentLayout = layoutById(id);
            const targetLayout = layoutById(sortableState.initialIds[resolvedCurrentIndex]);
            if (currentLayout && targetLayout) {
                delta.x = targetLayout.x - currentLayout.x;
                delta.y = targetLayout.y - currentLayout.y;
            }
        }
        return delta;
    };
    const transformer = {
        id: "sortableOffset",
        order: 100,
        callback: (transform) => {
            const delta = sortedTransform();
            return { x: transform.x + delta.x, y: transform.y + delta.y };
        },
    };
    onMount(() => addTransformer("droppables", id, transformer));
    onCleanup(() => removeTransformer("droppables", id, transformer.id));
    const transform = () => {
        return ((id === dndState.active.draggableId && !dndState.active.overlay
            ? dndState.draggables[id]?.transform
            : dndState.droppables[id]?.transform) || noopTransform());
    };
    const sortable = Object.defineProperties((element) => {
        draggable(element, () => ({ skipTransform: true }));
        droppable(element, () => ({ skipTransform: true }));
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
    }, {
        ref: {
            enumerable: true,
            value: setNode,
        },
        transform: {
            enumerable: true,
            get: transform,
        },
        isActiveDraggable: {
            enumerable: true,
            get: () => draggable.isActiveDraggable,
        },
        dragActivators: {
            enumerable: true,
            get: () => draggable.dragActivators,
        },
        isActiveDroppable: {
            enumerable: true,
            get: () => droppable.isActiveDroppable,
        },
    });
    return sortable;
};
export { createSortable };
