import React, {useState} from "react";
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "../../services/firebase";
import styles from "../../GlobalStyles.module.scss";
import {useSelector} from "react-redux";

const InputBox = () => {
   const [message, setMessage] = useState("");
   const user = useSelector((state) => state.user.name);

   const sendMessage = () => {
      if (message && user) {
         const key = `${new Date().getTime().toString()}_${user}`;

         setDoc(doc(db, "messages", key), {
            // name: user,
            message
         });
         setMessage("");
         setTimeout(() => {
            deleteDoc(doc(db, "messages", key));
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
            value={message}
            type="text"
            onKeyDown={(e) => handleInput(e)}
            onChange={(e) => handleInput(e)}
         />
         <button onClick={() => sendMessage()}>Send</button>
      </div>
   );
};

export default InputBox;
