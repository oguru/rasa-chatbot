import React from "react";
import styles from "./InputBox.module.scss";
import {useDispatch} from 'react-redux';
import { add, remove } from "../../store/messagesSlice.js";

const InputBox = () => {
  let input;
  const dispatch = useDispatch();

  const sendMessage = () => {
    const key = new Date().getTime();
    dispatch(add({msg: input.value, key}));
    input.value = "";
    setTimeout(() => {
        dispatch(remove());
    }, 7000);
  }

  const handleInput = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className={styles.inputCont}>
      <input value={input} type="text" ref={(node) => {input = node}} onKeyPress={(e) => {handleInput(e)}} />
      {/* <input onChange={(e) => setInputTxt(e.target.value)} /> */}
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
};

export default InputBox;
