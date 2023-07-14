import {useState} from "react";

export default function HabitBox() {
    const [isChecked, setIsChecked] = useState(false);

    function toggle() {
        setIsChecked(prevState => !prevState);
    }

    return(
        <span className={isChecked ? "on" : "off"} onClick={toggle}></span>
    )
}