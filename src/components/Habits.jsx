import { useState, useEffect } from "react";
import { calendarStyle, getNumberOfDaysInMonth, getYYYYMM } from "../utils";
import Habit from "./Habit";
import { useAuth } from "../contexts/AuthContext";
import { useDate } from "../contexts/DateContext";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

export default function Habits(props) {
  const [habits, setHabits] = useState([]);
  const [addingHabit, setAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitGoal, setNewHabitGoal] = useState(1);
  const currUser = useAuth().currentUser;
  const { setEarliestMonth, date, getPrevMonth } = useDate();

  const [editedHabits, setEditedHabits] = useState({});
  const [editingHabit, setEditingHabit] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currHabitToDelete, setCurrHabitToDelete] = useState();

  async function fetchHabits(userId) {
    const response = await fetch(`http://localhost:5001/${userId}/routines`);
    const habits = await response.json();
    return habits;
  }

  async function fetchEarliestMonth(userId) {
    const response = await fetch(`http://localhost:5001/${userId}/earliest_month`);
    const earliestMonth = await response.json();
    return earliestMonth;
  }


  useEffect(() => {
    let isApiSubscribed = true;
    try {
      fetchHabits(currUser.uid)
        .then(data => {
          if (isApiSubscribed) {
            setHabits(data)
            if (getYYYYMM(date) === getYYYYMM(new Date())) {
              const currHabits = data.filter(habit => habit['routine_yyyymm'] === getYYYYMM(date));
              if (currHabits.length === 0) {
                const prevMonth = getYYYYMM(getPrevMonth(date));
                const prevMonthHabits = data.filter(habit => habit['routine_yyyymm'] === prevMonth);
                generateHabitsForNewMonth(prevMonthHabits);
              }
            }
          }
        })

      fetchEarliestMonth(currUser.uid)
        .then(data => setEarliestMonth(data));

      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };

    } catch (err) {
      console.log(err);
    }

  }, [currUser.uid]);

  async function generateHabitsForNewMonth(prevMonthHabits) {
    let habitsForNewMonth = [];
    prevMonthHabits.forEach(habit =>
      habitsForNewMonth.push(
        {
          ...habit,
          'routine_yyyymm': getYYYYMM(new Date())
        }
      )
    )

    fetch(`http://localhost:5001/${currUser.uid}/routines/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitsForNewMonth),
    })
      .then(() => {
        setHabits(prevHabits => [...prevHabits, ...habitsForNewMonth]);
      })
      .catch(err => console.log(err));
  }

  function toggleAddingHabit() {
    setAddingHabit(prevState => !prevState);
  }

  function toggleEditingHabit() {
    setEditedHabits({});
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

  function handleEditChange(routineId, changeType, updatedValue) {
    setEditedHabits(prevEditedHabits => {
      return {
        ...prevEditedHabits,
        [routineId]: {
          ...prevEditedHabits[routineId],
          [changeType]: updatedValue
        }
      }
    })
  }

  function flattenAndNormalizeObject(obj) {
    let res = [];
    for (let key in obj) {
      res.push({
        "routine_id": Number(key),
        ...obj[key]
      })
    }
    return res;
  }

  async function handleEditSave() {
    try {
      let updateData = flattenAndNormalizeObject(editedHabits);

      await fetch(`http://localhost:5001/${currUser.uid}/routines/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      await fetchHabits(currUser.id)
        .then(data => setHabits(data));

      await fetchEarliestMonth(currUser.id)
        .then(data => setEarliestMonth(data));

      toggleEditingHabit();
    } catch (err) {
      console.log(err);
    }
  }

  function handleDelete(routineId) {
    setShowDeleteDialog(true);
    setCurrHabitToDelete(routineId);
  }

  function handleClose() {
    setShowDeleteDialog(false);
    setCurrHabitToDelete();
  }

  async function deleteHabit() {
    try {
      await fetch(`http://localhost:5001/${currUser.uid}/routines`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routine_id: currHabitToDelete,
        }),
      });

      // Remove the deleted habit from the state
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.routine_id !== currHabitToDelete)
      );

      handleClose();
    } catch (err) {
      console.log(err);
    }
  }


  let habitElements = habits
    .filter((habit) => habit["routine_yyyymm"] === getYYYYMM(date))
    .map((habit) => (
      <Habit
        key={habit["routine_id"]}
        {...habit}
        {...props}
        editing={editingHabit}
        handleEditChange={handleEditChange}
        handleDelete={handleDelete}
      />
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
          <input type="text" placeholder="New habit" onChange={handleNameChange} required />
          <label>Monthly goal</label>
          <input type="number" placeholder="# of days goal" min="1" max={getNumberOfDaysInMonth(date)} onChange={handleGoalChange} required />
          {/* <button>Daily</button><button>Weekly</button><button>4x a Week</button> */}
          <input type="submit" value="Add" />
        </form>
      )}

      <ConfirmDeleteDialog
        showDeleteDialog={showDeleteDialog}
        handleClose={handleClose}
        deleteHabit={deleteHabit}
      />

      {editingHabit ? (
        <div>
          <button className="editHabitButton" onClick={toggleEditingHabit}>
            Discard Changes
          </button>
          <button onClick={handleEditSave}>
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
