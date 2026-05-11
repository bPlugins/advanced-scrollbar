import { useEffect } from "react";

/**
 * Resets a CSS animation by toggling a class on the referenced element
 * @param {React.RefObject} ref - The ref to the DOM element
 * @param {any} dependency - The value to watch for changes (e.g. click position)
 * @param {string} className - The class to toggle for animation reset
 */
export function useAnimationResetOnChange(ref, dependency, className = "effect-wrapper") {
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.remove(className);
      void el.offsetWidth;
      el.classList.add(className);
    }
    // eslint-disable-next-line
  }, [ref.current, dependency]);
}