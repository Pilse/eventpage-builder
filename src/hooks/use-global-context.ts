import { GlobalContext } from "@/domain/context";
import { useRef } from "react";

export const useGlobalContext = () => {
  const globalContext = useRef(new GlobalContext());
  return globalContext.current;
};
