import { useState } from "react"
import { calendarStyle, calendarBoxStyle, getNumberOfDaysInMonth } from "../utils";
import Habit from "./Habit"

export default function Habits({ date }) {
    const [habits, setHabits] = useState([]);
    const [addingHabit, setAddingHabit] = useState(false);
    const [habitName, setHabitName] = useState("");

    const numberOfDaysInMonth = getNumberOfDaysInMonth(date);

    function toggle() {
        setAddingHabit(prevState => !prevState);
    }

    function handleChange(e) {
        setHabitName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (habitName.trim() !== "") {
            // let newHabit = [];

            // newHabit.push(<span className="calendarBox" id={habitName}>{habitName}</span>)

            // for (let i = 0; i < numberOfDaysInMonth; i++) {
            //     newHabit.push(
            //         <span className="calendarBox" id={i + 1}></span>
            //     )
            // }

            // let newRow = <div key={habits.length} style={calendarBoxStyle(numberOfDaysInMonth)}>{newHabit}</div>
    
            // setHabits(prevHabits => [...prevHabits, newRow]);
            
            let newHabit = <Habit habitName={habitName} date={date} />


            setHabits(prevHabits => [...prevHabits, newHabit]);
            toggle();
        }
    }


    return (
        <>
            <div className="habitCalendar" style={calendarStyle(habits.length)}>
                {habits}
            </div>

            {addingHabit &&
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="New habit" onChange={handleChange} />
                <input type="submit" value="Add"/>
            </form>}    

            {addingHabit && <button onClick={toggle}>Cancel</button>}
            {!addingHabit && <button onClick={toggle}>Add Habit</button>}
        </>
    )
}