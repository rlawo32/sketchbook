import { atom } from "jotai";
import { testAtom } from "./testAtoms";

// test
export const testAction1 = atom((get) => get(testAtom) + 1);
export const testAction2 = atom((get) => get(testAtom), (get, set) => {
    const val = get(testAtom);
    const res = val + 100;
    set(testAtom, res);
});
export const testAction3 = atom(null, (get, set) => {
    const val = get(testAtom);
    const res = val + 200;
    set(testAtom, res);
});
// test
