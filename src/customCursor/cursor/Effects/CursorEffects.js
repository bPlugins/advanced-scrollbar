import { useRef } from "react";
import "./CursorEffect.scss";
import { useClickPosition } from "../../hooks/useClickPosition";
import { useAnimationResetOnChange } from "../../hooks/useAnimationResetOnChange";
import ClickSpark from "./sparkEffect/ClickSpark/ClickSpark";
import SparkSimple from "./sparkEffect/SparkSimple/SparkSimple";
import Starburst from "./sparkEffect/Starburst/Starburst";


const CursorEffects = ({ effect,domEl=document }) => {
  const effectRef = useRef(null);
  const clickPosition = useClickPosition(domEl);
  useAnimationResetOnChange(effectRef, clickPosition, "effect-wrapper");


  return (
    <>
      {effect?.type !== "spark" && <div
        ref={effectRef}
        // className="effect-wrapper"
        style={{
          left: `${clickPosition.x}px`,
          top: `${clickPosition.y}px`,
          pointerEvents: "none"
        }}
      >
        { 
          effect?.type === "sparkSimple" && <SparkSimple {...effect?.sparkSimple} />
        }
        
        {
          effect?.type === 'starburst' && <Starburst {...effect?.starburst} />
        }

      </div>}

      {effect?.type === "spark" && <ClickSpark {...effect?.spark} domEl={domEl} /> }
    </>
  );
};

export default CursorEffects;
