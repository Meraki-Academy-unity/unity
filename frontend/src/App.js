import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/login/index";
import SignUp from "./components/auth/signUp/index";
import AddActivities from "./components/Activities/addActivities";
import AddTravelPlans from "./components/travel_Plans";
const App = () => {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <SignUp /> */}
	  {/* <AddActivities/> */}
    <AddTravelPlans />
    </div>
  );
};

export default App;
