import React, {useState, useEffect} from "react";
import styles from "./Message.module.scss";
import ghost1 from "../../assets/ghost-1.png";
import ghost2 from "../../assets/ghost-2.png";

const Message = ({msg, totalNum, index}) => {
   const [pos, setPos] = useState("50px");
   const [init, setInit] = useState(true);
   const [removing, setRemove] = useState(false);

   useEffect(() => {
      if (init) {
         setTimeout(() => {
            setPos("0px");
            setInit(false);
         }, 1);
      } else if (!removing) {
         setPos(`${-40 * (totalNum - index - 1)}px`);
      }

   }, [totalNum]);

   useEffect(() => {
      setTimeout(() => {
         setRemove(true);
         setPos("-100vh");

      }, 5000);
   }, []);

   return (
      <>
         <p
            style={{transform: `translateY(${pos})`}}
            className={`
          ${styles.message} 
          ${removing ? styles.disappear : ""}`
            }>
            {msg}
         </p>
         <img
            alt="ghost"
            src={Math.random() > 0.5 ? ghost1 : ghost2}
         ></img>
      </>
   );
};

export default Message;
