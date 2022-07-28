import React, {useState} from "react";
import globalStyles from "../../GlobalStyles.module.scss";
import {setLocalUser} from "../../store/userSlice";
import styles from "./LoginBox.module.scss";
import {useDispatch} from "react-redux";

const LoginBox = () => {
   const [name, setName] = useState("");

   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      if (e) {
         e.preventDefault();
      }

      if (name.length) {
         dispatch(setLocalUser(name));
      }
   };

   const handleInput = (e) => {
      if (e.key === "Enter") {
         handleSubmit();
      } else {
         setName(e.target.value);
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
                  onKeyDown={e => handleInput(e)}
                  onChange={e => handleInput(e)}
               />
               <button onClick={(e) => handleSubmit(e)}>
              Submit
               </button>
            </div>
         </form>
      </div>
   );
};

export default LoginBox;
