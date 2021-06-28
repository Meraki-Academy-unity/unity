import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/login/index";
import SignUp from "./components/auth/signUp/index";
import AddActivities from "./components/Activities/addActivities";
import AddTravelPlans from "./components/travel_Plans";
import AddPerferences from "./components/preferences/addPreferences";
const App = () => {
	return (
		<div className="App">
			{/* <Login /> */}
			{/* <SignUp /> */}
			{/* <AddActivities/> */}
			{/* <AddTravelPlans /> */}
			<AddPerferences />
		</div>
	);
};

export default App;
