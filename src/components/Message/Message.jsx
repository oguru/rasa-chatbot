import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import ghost1 from "../../assets/ghost-1.png";
import ghost2 from "../../assets/ghost-2.png";
import styles from "./Message.module.scss";

const Message = ({altStyle, message, name}) => {
   const [pos, setPos] = useState("35px");
   const [removing, setRemove] = useState(false);

   useEffect(() => {
      setPos("0px");

      const messageOutTimeout = setTimeout(() => {
         setRemove(true);
         setPos("-100vh");
      }, 5000);

      return () => clearTimeout(messageOutTimeout)
   }, []);

   return (
      <>
         <div
            className={`
               ${styles.messageCont} 
               ${removing ? styles.disappear : ""} 
               ${altStyle ? styles.leftPos : ""}`}
            style={{transform: `translateY(${pos})`}}
         >
            <p>{message}</p>
            {altStyle && (
               <p className={`
                  ${styles.username}`
               }>
                  {name}
               </p>)}
         </div>
         <img
            alt="ghost"
            className={altStyle ? styles.leftPos : ""}
            src={Math.random() > 0.5 ? ghost1 : ghost2}
         />
      </>
   );
};

Message.propTypes = {
   altStyle: PropTypes.bool,
   message: PropTypes.string,
   name: PropTypes.string
};

export default Message;
