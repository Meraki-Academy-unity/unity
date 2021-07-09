import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PerferencesLocation from "../Api/perferencesLocation";
import moment from 'moment';
import axios from "axios";

const AddFriend = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            id: state.id.id,
        };
    });

    const add = () => {

    }
    return (
        <>
            <button onClick={add}>Add Friend</button>
        </>
    );
};

export default AddFriend;
