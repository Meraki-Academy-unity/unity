import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setEmoji } from "../../reducers/emoji";
import Picker from 'emoji-picker-react';

const Emoji = () => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const dispatch = useDispatch();
    const onEmojiClick = (event, emojiObject) => {
        dispatch(setEmoji(emojiObject.emoji));
    };
    const state = useSelector((state) => {
        return {
            emoji: state.emoji.emoji
        };
    });
    return (
        <div>

            {chosenEmoji ? (
                <span>You chose: {chosenEmoji && chosenEmoji.emoji}</span>
            ) : (
                <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    );
};
export default Emoji