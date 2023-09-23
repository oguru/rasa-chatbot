import InputBox from "./components/InputBox/InputBox";
import LoginBox from "./components/LoginBox/LoginBox";
import Messages from "./containers/Messages";
import React from "react";
import styles from "./App.module.scss";
import {useSelector} from "react-redux";
import "./GlobalStyles.module.scss";

const App = () => {
   const user = useSelector((state) => state.user.name);

   return (
      <div className={styles.App}>
         {!user && <LoginBox />}
         <div className={styles.messengerContainer}>
            <h1>Ghost Messenger</h1>
            <Messages />
            <InputBox />
         </div>
      </div>
   );
};

export default App;
