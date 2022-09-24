import { ParentComponent } from "solid-js";
import { Store } from "solid-js/store";
import { CollisionDetector } from "./collision";
import { Layout, Transform } from "./layout";
declare type Id = string | number;
interface Coordinates {
    x: number;
    y: number;
}
declare type SensorActivator<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K], draggableId: Id) => void;
interface Sensor {
    id: Id;
    activators: {
        [K in keyof HTMLElementEventMap]?: SensorActivator<K>;
    };
    coordinates: {
        origin: Coordinates;
        current: Coordinates;
        get delta(): Coordinates;
    };
}
declare type TransformerCallback = (transform: Transform) => Transform;
interface Transformer {
    id: Id;
    order: number;
    callback: TransformerCallback;
}
interface Item {
    id: Id;
    node: HTMLElement;
    layout: Layout;
    data: Record<string, any>;
    transformers: Record<Id, Transformer>;
    get transform(): Transform;
    get transformed(): Layout;
    _pendingCleanup?: boolean;
}
interface Draggable extends Item {
}
interface Droppable extends Item {
}
interface Overlay extends Item {
}
declare type DragEvent = {
    draggable: Draggable;
    droppable?: Droppable | null;
    overlay?: Overlay | null;
};
interface DragDropState {
    draggables: Record<Id, Draggable>;
    droppables: Record<Id, Droppable>;
    sensors: Record<Id, Sensor>;
    active: {
        draggableId: Id | null;
        draggable: Draggable | null;
        droppableId: Id | null;
        droppable: Droppable | null;
        sensorId: Id | null;
        sensor: Sensor | null;
        overlay: Overlay | null;
    };
}
interface DragDropActions {
    addTransformer(type: "draggables" | "droppables", id: Id, transformer: Transformer): void;
    removeTransformer(type: "draggables" | "droppables", id: Id, transformerId: Id): void;
    addDraggable(draggable: Omit<Draggable, "transform" | "transformed" | "transformers">): void;
    removeDraggable(id: Id): void;
    addDroppable(droppable: Omit<Droppable, "transform" | "transformed" | "transformers">): void;
    removeDroppable(id: Id): void;
    addSensor(sensor: Omit<Sensor, "coordinates">): void;
    removeSensor(id: Id): void;
    setOverlay(overlay: Pick<Overlay, "node" | "layout">): void;
    clearOverlay(): void;
    recomputeLayouts(): boolean;
    detectCollisions(): void;
    draggableActivators(draggableId: Id, asHandlers?: boolean): Listeners;
    sensorStart(id: Id, coordinates: Coordinates): void;
    sensorMove(coordinates: Coordinates): void;
    sensorEnd(): void;
    dragStart(draggableId: Id): void;
    dragEnd(): void;
    onDragStart(handler: DragEventHandler): void;
    onDragMove(handler: DragEventHandler): void;
    onDragOver(handler: DragEventHandler): void;
    onDragEnd(handler: DragEventHandler): void;
}
interface DragDropContextProps {
    onDragStart?: DragEventHandler;
    onDragMove?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDragEnd?: DragEventHandler;
    collisionDetector?: CollisionDetector;
}
declare type DragDropContext = [Store<DragDropState>, DragDropActions];
declare type Listeners = Record<string, (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void>;
declare type DragEventHandler = (event: DragEvent) => void;
declare const Context: import("solid-js").Context<DragDropContext>;
declare const DragDropProvider: ParentComponent<DragDropContextProps>;
declare const useDragDropContext: () => DragDropContext | null;
export { Context, DragDropProvider, useDragDropContext };
export type { Id, Coordinates, Listeners, DragEventHandler, DragEvent, DragDropState, Item, Draggable, Droppable, Overlay, SensorActivator, Transformer, };
