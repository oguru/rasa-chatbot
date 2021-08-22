import React, {useState} from "react";
import {add, remove} from "../../store/messagesSlice.js";
import styles from "./InputBox.module.scss";
import {useDispatch} from "react-redux";

const InputBox = () => {

   const [message, setMessage] = useState("");

   //  let input;
   const dispatch = useDispatch();
   const maxChars = 50;

   const sendMessage = () => {
      if (message) {
         const key = new Date().getTime();
         dispatch(add({
            msg: message,
            key
         }));
         setMessage("");
         setTimeout(() => {
            dispatch(remove());
         }, 7000);
      }
   };

   const handleInput = (e) => {
      if (e.key === "Enter") {
         sendMessage();
      } else {
         setMessage(e.target.value);
      }
   };

   return (
      <div className={styles.inputCont}>
         <input
            maxLength={maxChars}
            value={message}
            type="text"
            onKeyDown={e => handleInput(e)}
            onChange={e => handleInput(e)}
         />
         <span className={styles.chars}>
            {message ? maxChars - message.length : maxChars}
         </span>
         <button onClick={() => sendMessage()}>
            Send
         </button>
      </div>
   );
};

export default InputBox;
