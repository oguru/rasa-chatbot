import React, {useEffect, useState} from "react";
import {add, remove} from "../../store/messagesSlice.js";
import styles from "./InputBox.module.scss";
import {useDebouncedCallback} from "use-debounce";
import {useDispatch} from "react-redux";

const InputBox = () => {

   const [message, setMessage] = useState("");
   const [windowWidth, setWindowWidth] = useState();
   const [maxChars, setMaxChars] = useState(40);

   const handleResize = useDebouncedCallback(
      () => setWindowWidth(window.innerWidth),
      100
   );

   useEffect(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
   }, []);

   useEffect(() => {
      if (windowWidth < 450) {
         setMaxChars(35);
      } else if (windowWidth < 768) {
         setMaxChars(50);
      } else if (windowWidth < 1024) {
         setMaxChars(65);
      } else {
         setMaxChars(90);
      }
   }, [windowWidth]);

   const dispatch = useDispatch();

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
