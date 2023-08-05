import { useState, useEffect } from "react";
import { calendarStyle, getNumberOfDaysInMonth, getYYYYMM } from "../utils";
import Habit from "./Habit";
import { useAuth } from "../contexts/AuthContext";
import { useDate } from "../contexts/DateContext";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [addingHabit, setAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const currUser = useAuth().currentUser;
  const { setEarliestMonth, date } = useDate();

  useEffect(() => {
    if (currUser) {
      try {
        // fetch all habits
        fetch(`http://localhost:5001/${currUser.uid}/routines`)
          .then((res) => res.json())
          .then((data) => {
            setHabits(data);
          });

        fetch(`http://localhost:5001/${currUser.uid}/earliest_month`)
          .then((res) => res.json())
          .then((data) => setEarliestMonth(data));
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
        let boxes = JSON.stringify(
          new Array(getNumberOfDaysInMonth(date)).fill(false)
        );

        const body = {
          user_id: currUser.uid,
          routine_name: newHabitName,
          routine_yyyymm: getYYYYMM(date),
          routine_values: boxes,
        };

        await fetch(`http://localhost:5001/${currUser.uid}/routines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(() => {
          setHabits((prevHabits) => [...prevHabits, body]);
          toggle();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  let habitElements = habits
    .filter((habit) => habit["routine_yyyymm"] === getYYYYMM(date))
    .map((habit) => <Habit key={habit["routine_id"]} {...habit} date={date} />);

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

      {addingHabit ? (
        <button className="newHabitButton" onClick={toggle}>
          Cancel
        </button>
      ) : (
        getYYYYMM(new Date()) === getYYYYMM(date) && (
          <button className="newHabitButton" onClick={toggle}>
            Add Habit
          </button>
        )
      )}
    </>
  );
}
