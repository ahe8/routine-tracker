import { useState, useEffect } from "react";
import { getYYYYMM, calendarBoxStyle, getNumberOfDaysInMonth } from "../utils";
import HabitBox from "./HabitBox";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDate } from "../contexts/DateContext";


export default function Habit(props) {
  const [habitRow, setHabitRow] = useState([]);
  const { user_id, routine_id, routine_name, routine_yyyymm, routine_values, goal, handleEditChange, handleDelete, editing, bounds, numberOfColumns } = props;
  const [tempBoxState, setTempBoxState] = useState(JSON.parse(routine_values));
  const [boxes, setBoxes] = useState(JSON.parse(routine_values));

  const { date } = useDate();


  useEffect(() => {
    // debounce
    const timeoutID = setTimeout(() => {
      if (JSON.stringify(tempBoxState) !== JSON.stringify(boxes)) {
        const body = {
          ...props,
          routine_values: JSON.stringify(boxes),
        };
        try {
          fetch(`http://localhost:5001/${user_id}/routines/values`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }).then(() => {
            setTempBoxState(boxes);
          })
        } catch (err) {
          console.log(err);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutID);
  }, [boxes]);

  useEffect(() => {
    let newRow = [];

    newRow.push(
      <DeleteIcon key="deleteIcon" className="deleteIcon" onClick={() => handleDelete(routine_id)} style={{ "visibility": (editing ? "visible" : "hidden") }} />
    )

    newRow.push(
      editing ?
        <input key="routine_name" type="text" defaultValue={routine_name} name="routine_name" onChange={handleGoalChange} />
        :
        <span key="routine_name" className="text-column">{routine_name}</span>
    );

    const today = new Date();
    const currentMonth = getYYYYMM(today);

    let tempList = [];
    // push all to list then use array slice to render which ones
    for (let day = 0; day < boxes.length; day++) {
      if (routine_yyyymm === currentMonth && day > today.getDate() - 1) {
        tempList.push(
          <HabitBox key={day} id={day} toggle={toggle} checked={boxes[day]} disabled={true} />
        );
      } else {
        tempList.push(
          <HabitBox key={day} id={day} toggle={toggle} checked={boxes[day]} disabled={false} />
        );
      }
    }

    let [leftBound, rightBound] = bounds;

    newRow = newRow.concat(
      tempList.slice(leftBound - 1, rightBound)
    );

    newRow.push(
      <span key="achievedHeaderColumn" className="text-column" id="achievedHeaderColumn">
        {boxes.filter(Boolean).length}
      </span>
    );

    newRow.push(
      editing ?
        <input key="goalHeaderColumn" type="number" defaultValue={goal} min="1" max={getNumberOfDaysInMonth(date)} name="goal" onChange={handleGoalChange} />
        :
        <span key="goalHeaderColumn" className="text-column" id="goalHeaderColumn">
          {goal}
        </span>
    );

    setHabitRow([newRow]);
  }, [boxes, editing, bounds]);

  function handleGoalChange(e) {
    if (e.target.name === 'goal') {
      handleEditChange(routine_id, e.target.name, Number(e.target.value));
    } else {
      handleEditChange(routine_id, e.target.name, e.target.value);
    }
  }

  function toggle(id) {
    setBoxes((prevBoxes) => {
      // copy array
      let newBoxes = prevBoxes.slice();
      newBoxes[id] = !prevBoxes[id];
      return newBoxes;
    });
  }

  // function achievedGoal() {
  //   return boxArray.filter(Boolean).length;
  // }


  return (
    <div style={calendarBoxStyle(numberOfColumns)}>
      {habitRow}
    </div>
  );
}
