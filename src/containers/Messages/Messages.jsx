import React, {useState} from "react";
import styles from "./Messages.module.scss";
import Message from "../../components/Message";
import {useSelector} from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <section className={styles.background}>
      <h1>Ghost Messenger</h1>
      <div className={styles.messages}>
        {
          messages.map(({msg, key}, index) => {
            // const key = generateKey()
            if (msg) {
              return <Message 
              index={index}
              msg={msg}
              totalNum={messages.length}
              key={key}
              />
            }
            return "";
          })
        }
      </div>
    </section>
  );
};

export default Messages;
