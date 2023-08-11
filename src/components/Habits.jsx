import { useState, useEffect } from "react";
import { calendarStyle, getNumberOfDaysInMonth, getYYYYMM } from "../utils";
import Habit from "./Habit";
import { useAuth } from "../contexts/AuthContext";
import { useDate } from "../contexts/DateContext";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [addingHabit, setAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitGoal, setNewHabitGoal] = useState(1);
  const currUser = useAuth().currentUser;
  const { setEarliestMonth, date } = useDate();
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedHabitName, setEditedHabitName] = useState("");
  const [editingHabit, setEditingHabit] = useState(false);

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

  function toggleAddingHabit() {
    setAddingHabit(prevState => !prevState);
  }

  function toggleEditingHabit() {
    setEditingHabit(prevState => !prevState);
  }

  function handleNameChange(e) {
    setNewHabitName(e.target.value);
  }

  function handleGoalChange(e) {
    setNewHabitGoal(e.target.value);
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
          goal: newHabitGoal
        };

        await fetch(`http://localhost:5001/${currUser.uid}/routines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(() => {
          setHabits((prevHabits) => [...prevHabits, body]);
          toggleAddingHabit();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(routineId) {
    try {
      await fetch(`http://localhost:5001/${currUser.uid}/routines`, {
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
      await fetch(`http://localhost:5001/${currUser.uid}/routines/name`, {
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
            <Habit key={habit["routine_id"]} {...habit} editing={editingHabit} handleDelete={handleDelete}/>
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
        <form className="addHabitForm" onSubmit={handleSubmit}>
          <label>Habit name</label>
          <input type="text" placeholder="New habit" onChange={handleNameChange} required/>
          <label>Monthly goal</label>
          <input type="number" placeholder="# of days goal" min="1" max={getNumberOfDaysInMonth(date)} onChange={handleGoalChange} required/>
          {/* <button>Daily</button><button>Weekly</button><button>4x a Week</button> */}
          <input type="submit" value="Add" />
        </form>
      )}

      {editingHabit ? (
        <div>
          <button className="editHabitButton" onClick={toggleEditingHabit}>
            Discard Changes
          </button>
          <button>
            Save Changes
          </button>
        </div>
      ) : (
        <button onClick={toggleEditingHabit}>
          Edit
        </button>
      )}

      {addingHabit ? (
        <button className="newHabitButton" onClick={toggleAddingHabit}>
          Cancel
        </button>
      ) : (
        getYYYYMM(new Date()) === getYYYYMM(date) && (
          <button className="newHabitButton" onClick={toggleAddingHabit}>
            Add Habit
          </button>
        )
      )}
    </>
  );
}
