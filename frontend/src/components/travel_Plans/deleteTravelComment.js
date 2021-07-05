import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteTravelComments = ({ comment_id }) => {
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });

    const deleteComment = () => {
        axios.delete(`http://localhost:5000/travelPlans/comment/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err)
        })
    }
    return <>
        <button onClick={deleteComment}>delete</button>
    </>
}


export default DeleteTravelComments;