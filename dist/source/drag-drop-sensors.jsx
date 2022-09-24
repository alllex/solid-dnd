import { createPointerSensor } from "./create-pointer-sensor";
const DragDropSensors = (props) => {
    createPointerSensor();
    return <>{props.children}</>;
};
export { DragDropSensors };
