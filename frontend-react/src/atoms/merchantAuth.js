import {atom} from "jotai";
export const mauthAtom = atom(localStorage.getItem('mtoken')||null);