import { useState, useEffect } from "react";
import {
  calendarStyle,
  calendarBoxStyle,
  getNumberOfDaysInMonth,
} from "../utils";
import Habit from "./Habit";
import mockdata from "/mockdata";

export default function Habits({ date }) {
  const [habits, setHabits] = useState([]);
  const [addingHabit, setAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");

  useEffect(() => {
    let testUserID = 1;

    let user = mockdata.find((data) => data["userID"] == testUserID);
    if (user) {
      setHabits(user["habits"]);
    }
  }, []);

  function toggle() {
    setAddingHabit((prevState) => !prevState);
  }

  function handleChange(e) {
    setNewHabitName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (newHabitName.trim() !== "") {
      let MMYY = date.getMonth() + "" + date.getFullYear();
      let boxes = new Array(getNumberOfDaysInMonth(date)).fill(false);

      let newHabit = {
        habitName: newHabitName,
        [MMYY]: boxes,
      };

      setHabits((prevHabits) => [...prevHabits, newHabit]);
      toggle();
    }
  }

  let habitElements = habits.map((habit) => <Habit {...habit} date={date} />);

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

      {addingHabit && <button onClick={toggle}>Cancel</button>}
      {!addingHabit && <button onClick={toggle}>Add Habit</button>}
    </>
  );
}
