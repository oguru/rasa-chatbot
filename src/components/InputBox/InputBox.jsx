import React, {useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "../../services/firebase";
import {useSelector} from "react-redux";
import inputBoxStyles from "./InputBox.module.scss";
import Microphone from "../../assets/mic-icon-black.svg";
import styles from "../../GlobalStyles.module.scss";

const InputBox = () => {
   const [message, setMessage] = useState("");
   const [isListening, setIsListening] = useState(false);
   const user = useSelector((state) => state.user.name);
   const {
     transcript,
     listening,
     resetTranscript,
     browserSupportsSpeechRecognition
   } = useSpeechRecognition();

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
         }, 8000);
      }
   };

   const handleInput = (e) => {
      if (e.key === "Enter") {
         sendMessage();
      } else {
         setMessage(e.target.value);
      }
   };

   const activateMicrophone = ( ) => {

      console.log("Submit")
   
      //Add microphone access
   
      //create a WebSocket connection
   }

   return (
      <div className={styles.inputCont}>
         <input
            value={message}
            type="text"
            onKeyDown={(e) => handleInput(e)}
            onChange={(e) => handleInput(e)}
         />
         {browserSupportsSpeechRecognition && (
            <button 
               className={`
                  ${isListening && inputBoxStyles.micBtnListening} 
                  ${inputBoxStyles.micBtn}
               `} 
               onClick={() => setIsListening((curr) => !curr)}
            >
               <img src={Microphone} alt="Microphone Icon" />
            </button>
         )}
         <button onClick={() => sendMessage()}>Send</button>
      </div>
   );
};

export default InputBox;
