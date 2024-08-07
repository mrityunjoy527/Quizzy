import { create } from "zustand";

const useRegister = create((set) => ({
  wantToRegister: false,
  toggleRegister: () =>
    set((state) => { 
        console.log("Clicked");
        return {wantToRegister: !state.wantToRegister} 
    }),
}));

export default useRegister;
