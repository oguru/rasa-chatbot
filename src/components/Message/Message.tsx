import React, {useState, useEffect} from "react";
import ghost1 from "../../assets/ghost-1.png";
import ghost2 from "../../assets/ghost-2.png";
import styles from "./Message.module.scss";

type MessageProps = {
   altStyle: boolean;
   message?: string;
   name: string;
   children?: React.ReactNode;
};

const Message = ({altStyle, message, name, children}: MessageProps) => {
   const [pos, setPos] = useState("35px");
       
   useEffect(() => {
      const timeout = setTimeout(() => { 
         setPos("0px") 
      }, 60);

      return () => {
         clearTimeout(timeout);
      }
   }, []);

   return (
      <>
         <div
            className={`
               ${styles.messageCont} 
               ${altStyle ? styles.leftPos : ""}`}
            style={{transform: `translateY(${pos})`}}
         >  
            {children || (
               <p>{message}</p>
            )}
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

export default Message;
