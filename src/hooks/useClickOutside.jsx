import { useAppStore } from "@/store/store";
import { useEffect, RefObject, useRef } from "react";

function useClickOutside(isScheduleBar = false) {
  const { setSelectionType, setShowScheduleBar } = useAppStore();
  const containerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (!isScheduleBar) {
          setSelectionType(undefined);
        } else {
          setShowScheduleBar();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, setSelectionType]);
  return [containerRef];
}

export default useClickOutside;
