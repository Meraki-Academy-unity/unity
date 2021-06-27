import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/login/index";
import SignUp from "./components/auth/signUp/index";

const App = () => {
  return (
    <div className="App">
      {/* <Login /> */}
      <SignUp />
    </div>
  );
};

export default App;
