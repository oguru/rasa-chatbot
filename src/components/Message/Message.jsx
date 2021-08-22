import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import ghost1 from "../../assets/ghost-1.png";
import ghost2 from "../../assets/ghost-2.png";
import styles from "./Message.module.scss";

const Message = ({index, msg, totalNum}) => {

   Message.propTypes = {
      index: PropTypes.number,
      msg: PropTypes.string,
      totalNum: PropTypes.number
   };

   const [pos, setPos] = useState("50px");
   const [init, setInit] = useState(true);
   const [removing, setRemove] = useState(false);

   useEffect(() => {
      if (init) {
         setTimeout(() => {
            setPos("0px");
            setInit(false);
         }, 2);
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
         <p style={{transform: `translateY(${pos})`}}
            className={`
               ${styles.message} 
               ${removing ? styles.disappear : ""}`
            }
         >
            {msg}
         </p>
         <img
            alt="ghost"
            src={Math.random() > 0.5 ? ghost1 : ghost2}
         />
      </>
   );
};

export default Message;
