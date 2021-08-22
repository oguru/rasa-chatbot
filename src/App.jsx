import InputBox from "./components/InputBox/InputBox";
import Messages from "./containers/Messages";
import React from "react";
import styles from "./App.module.scss";

const App = () => {

   return (
      <div className={styles.App}>
         <div className={styles.messengerContainer}>
            <h1>Ghost Messenger</h1>
            <Messages />
            <InputBox />
         </div>
      </div>
   );
};

export default App;
