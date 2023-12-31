import React, {useState} from "react";
import globalStyles from "../../GlobalStyles.module.scss";
import {setLocalUser} from "../../store/userSlice";
import styles from "./LoginBox.module.scss";
import {useDispatch} from "react-redux";
import { TextInputType } from "../../type-definitions";

type SubmitEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const LoginBox = () => {
   const [name, setName] = useState("");
   const dispatch = useDispatch();

   const handleSubmit = (e?: SubmitEvent) => {
      if (e) {
         e.preventDefault();
      }

      if (name.length) {
         dispatch(setLocalUser(name));
      }
   };

   const handleInput = (e: TextInputType) => {
      if (e instanceof KeyboardEvent 
         && e.key === "Enter"
      ) {
         handleSubmit();
      } else {
         setName(e.currentTarget.value);
      }
   };

   return (
      <div className={styles.loginContainer}>
         <form className={styles.loginBox}>
            <h3>Name</h3>
            <p>Please enter a display name</p>
            <div className={
               `${globalStyles.inputCont} 
                ${styles.noBorder}`
            }>
               <input
                  data-test="loginBoxInput"
                  onKeyDown={e => handleInput(e)}
                  onChange={e => handleInput(e)}
               />
               <button
                  data-test="loginBoxButton"
                  onClick={e => handleSubmit(e)}
               >
                  Submit
               </button>
            </div>
         </form>
      </div>
   );
};

export default LoginBox;
