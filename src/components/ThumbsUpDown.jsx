import { useState } from 'react';
import {getThumbs} from "../helpers/getThumbs.js";

function ThumbsUpDown() {
    const [isLiked, setIsLiked] = useState(true);  // Example state

    const handleToggleLike = () => {
        setIsLiked(prev => !prev);
    };

    return (
        <div>
            <p>{getThumbs(isLiked)}</p>
            <button type={"button"} onClick={handleToggleLike}>Toggle Like</button>
        </div>
    );
};

export default ThumbsUpDown;
