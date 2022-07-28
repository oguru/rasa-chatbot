import React, {useLayoutEffect, useEffect, useRef} from "react";
import {collection, deleteDoc, doc, onSnapshot} from "@firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import {db} from "../../services/firebase";
import {set} from "../../store/messagesSlice.js";
import styles from "./Messages.module.scss";

const Messages = () => {
   const messages = useSelector((state) => state.messages);
   const user = useSelector((state) => state.user.name);
   const lastBounds = useRef(null);
   const messagesContRef = useRef(null);
   const prevMessagesSize = useRef(messages.length);
   const dispatch = useDispatch();

   // Set up Firestore messages listener
   useEffect(() => onSnapshot(collection(db, "messages"), snapshot => {
      dispatch(set(snapshot.docs.map(document => {
         // remove messages from db that are older than 5s
         if (Number(document.id) + 5000 < new Date().getTime()) {
            deleteDoc(doc(db, "messages", document.id));
            return null;
         }

         return {
            ...document.data(),
            key: document.id
         };

      }).filter(val => val)));
   }), []);

   const getInvertedTransform = (startBounds, endBounds) => startBounds.height - endBounds.height;

   // Messages container animation
   useLayoutEffect(() => {
      const bounds = messagesContRef.current.getBoundingClientRect();

      // If more than 1 message is present and a message has been added
      if (lastBounds.current !== bounds &&
         messages.length > prevMessagesSize.current
      ) {
         const invertedTransform = getInvertedTransform(lastBounds.current, bounds);
         lastBounds.current = bounds;

         messagesContRef.current.animate(
            [
               {transform: `translateY(${-invertedTransform}px)`},
               {transform: `translateY(0px)`}
            ],
            500
         );
      }

      prevMessagesSize.current = messages.length;
      lastBounds.current = bounds;
   }, [messages]);

   return (
      <div className={styles.messagesBg}>
         <div
            className={`messagesCont ${styles.messagesCont}`}
            ref={messagesContRef}
         >
            { user ?
               messages.map(({key, message, name}) => (
                  <Message
                     altStyle={name === user ? "" : "leftPos"}
                     key={key}
                     message={message}
                  />
               )) : ""
            }
         </div>
      </div>
   );
};

export default Messages;
