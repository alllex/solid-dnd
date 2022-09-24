const combineRefs = (setRefA, setRefB) => {
    return (ref) => {
        setRefA(ref);
        setRefB(ref);
    };
};
export { combineRefs };
