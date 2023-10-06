import React, {useEffect, useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useDispatch, useSelector} from "react-redux";
import inputBoxStyles from "./InputBox.module.scss";
import Microphone from "../../assets/mic-icon-black.svg";
import styles from "../../GlobalStyles.module.scss";
import { RootState } from "../../store/store";
import { MessageType, TextInputType } from "../../type-definitions";
import { set } from "../../store/messagesSlice";
import { setProcessing } from "../../store/botProcessingSlice";
import getBotRes from "../../services/botApi";

const makeKey = (user: string) => `${new Date().getTime().toString()}_${user}`

const InputBox = () => {
   const [message, setMessage] = useState("");
   const [isListening, setIsListening] = useState(false);
   const messages = useSelector((state: RootState) => state.messages);
   const user = useSelector((state: RootState) => state.user.name);
   const dispatch = useDispatch();
   const {
     transcript,
     listening,
     resetTranscript,
     browserSupportsSpeechRecognition
   } = useSpeechRecognition();

   useEffect(() => {
      if (!listening && transcript) {
        setMessage(transcript);
      }

      setIsListening(listening);
    }, [transcript, listening]);

   const sendMessage = async () => {
      if (!message || !user) return;

      let docs = [
         ...messages, 
         {
            key: makeKey(user), 
            message, 
            name: user
         } 
      ]

      dispatch(set(docs as MessageType[]));
      dispatch(setProcessing(true));

      const botRes = await getBotRes({message, user});

      docs = [
         ...docs, 
         {
            key: makeKey("bot"), 
            message: botRes[0].text, 
            name: "Bot"
         } 
      ]

      dispatch(set(docs as MessageType[]));
      dispatch(setProcessing(false));
      setMessage("");
   };

   const handleInput = (e: TextInputType) => {
      const isKeyboardEvent = (
         e: TextInputType): e is React.KeyboardEvent<HTMLInputElement> => {
         return 'key' in e;
      }

      if (isKeyboardEvent(e) && e.key === "Enter") {
         sendMessage();
      } else {
         setMessage(e.currentTarget.value);
      }
   };

   const handleAudioInput = () => {
      if (isListening) {
         SpeechRecognition.stopListening();
         resetTranscript();
      } else {
         SpeechRecognition.startListening();
      }
   }

   return (
      <div className={styles.inputCont}>
         <input
            aria-label="Message input field"
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
               onClick={() => handleAudioInput()}
            >
               <img src={Microphone} alt="Microphone Icon" />
            </button>
         )}
         <button onClick={() => sendMessage()}>Send</button>
      </div>
   );
};

export default InputBox;
