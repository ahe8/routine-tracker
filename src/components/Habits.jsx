import { useState, useEffect } from "react";
import {
  calendarStyle,
  calendarBoxStyle,
  getNumberOfDaysInMonth,
} from "../utils";
import Habit from "./Habit";
import { useAuth } from "../contexts/AuthContext";

export default function Habits({ date }) {
  const [habits, setHabits] = useState([]);
  const [addingHabit, setAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const currUser = useAuth().currentUser;

  useEffect(() => {
    if (currUser) {
      try {
        fetch(`http://localhost:5000/${currUser.uid}/routines`)
          .then(response => response.json())
          .then(data => {
            setHabits(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [currUser]);

  function toggle() {
    setAddingHabit((prevState) => !prevState);
  }

  function handleChange(e) {
    setNewHabitName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      if (newHabitName.trim() !== "") {
        let MMYY = date.getMonth() + "" + date.getFullYear();
        let boxes = JSON.stringify(new Array(getNumberOfDaysInMonth(date)).fill(false));
 
        const body = {
          user_id: currUser.uid,
          routine_name: newHabitName,
          routine_mmyy: MMYY,
          routine_mmyy_values: boxes
        };
  
        await fetch(`http://localhost:5000/${currUser.uid}/routines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        .then(() => {
          setHabits((prevHabits) => [...prevHabits, body]);
          toggle();
        })
        .catch((err) => console.log(err));
      }
    } catch(err) {
      console.log(err);
    }
  }

  let habitElements = habits.map((habit, i) => <Habit key={i} {...habit} date={date} />);

  return (
    <>
      <div
        className="habitCalendar"
        style={calendarStyle(habitElements.length)}
      >
        {habitElements}
      </div>

      {addingHabit && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="New habit" onChange={handleChange} />
          <input type="submit" value="Add" />
        </form>
      )}

      {addingHabit ? <button onClick={toggle}>Cancel</button> : <button onClick={toggle}>Add Habit</button>}
    </>
  );
}
