import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import ghost1 from "../../assets/ghost-1.png";
import ghost2 from "../../assets/ghost-2.png";
import styles from "./Message.module.scss";

const Message = ({altStyle, message}) => {

   Message.propTypes = {
      altStyle: PropTypes.string,
      message: PropTypes.string
   };

   const [pos, setPos] = useState("35px");
   const [removing, setRemove] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setPos("0px");
      }, 2);
   }, []);

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
               ${styles[altStyle]}
               ${removing ? styles.disappear : ""}`
            }
         >
            {message}
         </p>
         <img
            alt="ghost"
            className={styles[altStyle]}
            src={Math.random() > 0.5 ? ghost1 : ghost2}
         />
      </>
   );
};

export default Message;
