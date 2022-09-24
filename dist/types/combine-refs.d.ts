declare type RefSetter<V> = (value: V) => void;
declare const combineRefs: <V>(setRefA: RefSetter<V>, setRefB: RefSetter<V>) => RefSetter<V>;
export { combineRefs };
export type { RefSetter };
