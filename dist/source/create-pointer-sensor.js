import { onCleanup, onMount } from "solid-js";
import { useDragDropContext, } from "./drag-drop-context";
const createPointerSensor = (id = "pointer-sensor") => {
    const [state, { addSensor, removeSensor, sensorStart, sensorMove, sensorEnd, dragStart, dragEnd, },] = useDragDropContext();
    const activationDelay = 250; // milliseconds
    const activationDistance = 10; // pixels
    onMount(() => {
        addSensor({ id, activators: { pointerdown: attach } });
    });
    onCleanup(() => {
        removeSensor(id);
    });
    const isActiveSensor = () => state.active.sensorId === id;
    const initialCoordinates = { x: 0, y: 0 };
    let activationDelayTimeoutId = null;
    let activationDraggableId = null;
    const attach = (event, draggableId) => {
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        activationDraggableId = draggableId;
        initialCoordinates.x = event.clientX;
        initialCoordinates.y = event.clientY;
        activationDelayTimeoutId = window.setTimeout(onActivate, activationDelay);
    };
    const detach = () => {
        if (activationDelayTimeoutId) {
            clearTimeout(activationDelayTimeoutId);
            activationDelayTimeoutId = null;
        }
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("selectionchange", clearSelection);
    };
    const onActivate = () => {
        if (!state.active.sensor) {
            sensorStart(id, initialCoordinates);
            dragStart(activationDraggableId);
            clearSelection();
            document.addEventListener("selectionchange", clearSelection);
        }
        else if (!isActiveSensor()) {
            detach();
        }
    };
    const onPointerMove = (event) => {
        const coordinates = { x: event.clientX, y: event.clientY };
        if (!state.active.sensor) {
            const transform = {
                x: coordinates.x - initialCoordinates.x,
                y: coordinates.y - initialCoordinates.y,
            };
            if (Math.sqrt(transform.x ** 2 + transform.y ** 2) > activationDistance) {
                onActivate();
            }
        }
        if (isActiveSensor()) {
            event.preventDefault();
            sensorMove(coordinates);
        }
    };
    const onPointerUp = (event) => {
        detach();
        if (isActiveSensor()) {
            event.preventDefault();
            dragEnd();
            sensorEnd();
        }
    };
    const clearSelection = () => {
        window.getSelection()?.removeAllRanges();
    };
};
export { createPointerSensor };
