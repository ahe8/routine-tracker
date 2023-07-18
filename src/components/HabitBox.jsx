import { useState } from "react";

export default function HabitBox(props) {
    const [isChecked, setIsChecked] = useState(props.checked);
    
    function toggle () {
        setIsChecked(prevState => !prevState);
    }

    return (
        <span 
            className={isChecked ? "on" : "off"} 
            onClick={toggle}>
        </span>
    )
}