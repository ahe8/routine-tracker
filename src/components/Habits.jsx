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
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedHabitName, setEditedHabitName] = useState("");

  useEffect(() => {
    if (currUser) {
      try {
        // fetch all habits
        fetch(`http://localhost:5000/${currUser.uid}/routines`)
          .then((res) => res.json())
          .then((data) => {
            setHabits(data);
          });

        fetch(`http://localhost:5000/${currUser.uid}/earliest_month`)
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

        await fetch(`http://localhost:5000/${currUser.uid}/routines`, {
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

  async function handleDelete(routineId) {
    try {
      await fetch(`http://localhost:5000/${currUser.uid}/routines`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routine_id: routineId,
        }),
      });

      // Remove the deleted habit from the state
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.routine_id !== routineId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditSave(routineId) {
    try {
      // Send update request to server
      await fetch(`http://localhost:5000/${currUser.uid}/routines`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routine_id: routineId,
          routine_name: editedHabitName,
        }),
      });

      // Update the habit's name in the state
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.routine_id === routineId
            ? { ...habit, routine_name: editedHabitName }
            : habit
        )
      );

      // Reset editing state
      setEditingHabitId(null);
      setEditedHabitName("");
    } catch (err) {
      console.log(err);
    }
  }

  let habitElements = habits
    .filter((habit) => habit["routine_yyyymm"] === getYYYYMM(date))
    .map((habit) => (
      <div key={habit["routine_id"]}>
        {editingHabitId === habit["routine_id"] ? (
          <>
            <input
              type="text"
              value={editedHabitName}
              onChange={(e) => setEditedHabitName(e.target.value)}
            />
            <button onClick={() => handleEditSave(habit["routine_id"])}>
              Save
            </button>
          </>
        ) : (
          <>
            <Habit {...habit} date={date} />
            <button onClick={() => setEditingHabitId(habit["routine_id"])}>
              Edit
            </button>
            <button onClick={() => handleDelete(habit["routine_id"])}>
              Delete
            </button>
          </>
        )}
      </div>
    ));

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
