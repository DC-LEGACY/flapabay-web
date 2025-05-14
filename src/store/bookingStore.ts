// bookingStore.ts - Handles booking state (mode, guests)
import { atom } from "jotai";

export const modeAtom = atom(
  true, // initial value: true = Hosting, false = Travelling
  (get, set, newValue: boolean) => {
    set(modeAtom, newValue);
  }
);

export const guestAtom = atom({
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
}); 