import Message from "../../components/Message";
import React from "react";
import styles from "./Messages.module.scss";
import {useSelector} from "react-redux";

const Messages = () => {
   const messages = useSelector((state) => state.messages);

   return (
      <section className={styles.background}>
         <div className={styles.messages}>
            {
               messages.map(({msg, key}, index) => (
                  <Message
                     index={index}
                     msg={msg}
                     totalNum={messages.length}
                     key={key}
                  />
               ))
            }
         </div>
      </section>
   );
};

export default Messages;
