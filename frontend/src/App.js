import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/login/index";
import SignUp from "./components/auth/signUp/index";
import AddActivities from "./components/Activities/addActivities";

const App = () => {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <SignUp /> */}
	  <AddActivities/>
    </div>
  );
};

export default App;
