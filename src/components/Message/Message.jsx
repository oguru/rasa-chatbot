import React, {useState, useEffect} from "react";
import styles from "./Message.module.scss";
import {useSelector} from 'react-redux';

const Message = ({msg, totalNum, index}) => {
  const [pos, setPos] = useState(50);
  const [init, setInit] = useState(true)
  const [removing, setRemove] = useState(false)

  console.log("----------------------")
  console.log("pos: ", pos)
  console.log("msg: ", msg)
  console.log("init: ", init)
  
  useEffect(() => {
    // console.log("----------------------")
    // console.log("totalNum: ", totalNum)
    // console.log("msg: ", msg)
    // console.log("index: ", index)
    // console.log("----------------------")
    if (init) {
      setTimeout(() => {
        setPos(0);
        setInit(false);
      }, 1);
    } else if (!removing) {
      setPos(-40*(totalNum-index-1))
      console.log("pos: ", pos)
    }

  }, [totalNum, index])

  useEffect(() => {
    setTimeout(() => {
      setRemove(true);
    }, 5000);

    setTimeout(() => {
      setPos(-800);
    }, 5200);
  }, [])

  return (
    <>
     <p style={{transform: `translateY(${pos}px)`}} class={`${styles.message} ${removing ? styles.ghost : ""}`}>{msg}</p>
    </>
  );
};

export default Message;
