import React, {useLayoutEffect, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import {set} from "../../store/messagesSlice";
import styles from "./Messages.module.scss";
import { RootState } from "../../store/store";
import { MessageType } from "../../type-definitions";

const Messages = () => {
   const messages = useSelector((state: RootState) => state.messages);
   const user = useSelector((state: RootState) => state.user.name);
   const lastBounds = useRef<null | DOMRect>(null);
   const messagesContRef = useRef<HTMLDivElement>(null);
   const prevMessagesSize = useRef<number>(messages.length);
   const dispatch = useDispatch();
   const processing = useSelector((state: RootState) => state.botProcessing);

   useEffect(() => {
      if (!user) return;

      const key = `${new Date().getTime().toString()}_${user}`;
      const docs = [
         ...messages, 
         {
            key, 
            message: `Hi ${user}! How can I help you?`, 
            name: "Bot"
         } 
      ]

      dispatch(
         set(docs as MessageType[])
      );
   }, [user])  

   const getInvertedTransform = (
      startBounds: DOMRect, 
      endBounds: DOMRect
   ): number => startBounds.height - endBounds.height;

   // Messages container animation
   useLayoutEffect(() => {
      if (messagesContRef.current === null ) return;

      const bounds = messagesContRef.current.getBoundingClientRect();

      if (lastBounds.current !== bounds &&
         messages.length > prevMessagesSize.current
      ) {
         const invertedTransform = getInvertedTransform(lastBounds.current as DOMRect, bounds);
         
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
            {user ?
               messages.map(({key, message, name}) => (
                  <Message
                     altStyle={name !== user}
                     key={key}
                     message={message}
                     name={name}
                  />
               )) : ""
            }
            {processing && (
               <Message
                  altStyle
                  name="Bot"
               >
                  <div className={styles.spinner}>
                     <div className={styles.bounce1}></div>
                     <div className={styles.bounce2}></div>
                     <div className={styles.bounce3}></div>
                  </div>
               </Message>
            )}
         </div>
      </div>
   );
};

export default Messages;
