import React, {useRef} from "react";
const App = () => {
    const inputRef = useRef(null);
    const clickButton = () => {
      inputRef.current.focus();
    };
    return (
      <>
        <input ref={inputRef} type="text" />
        <button onClick={clickButton}>Haz clic para centrarse en la entrada</button>
      </>
    );
  }
  export default App
