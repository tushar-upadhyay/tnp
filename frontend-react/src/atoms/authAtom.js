import { atom } from "jotai";
export const authAtom = atom(localStorage.getItem("token") || null);
