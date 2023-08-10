import { useState, useEffect } from "react";
import { getYYYYMM, calendarBoxStyle } from "../utils";
import HabitBox from "./HabitBox";

export default function Habit(props) {
  const [habitRow, setHabitRow] = useState([]);
  const { user_id, routine_name, routine_yyyymm, routine_values, goal } = props;
  const initialBoxState = JSON.parse(routine_values);
  const [boxes, setBoxes] = useState(initialBoxState);
  
  // debounce
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (initialBoxState !== boxes) {
        const body = {
          ...props,
          routine_values: JSON.stringify(boxes),
        };

        try {
          fetch(`http://localhost:5001/${user_id}/routines/values`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          console.log(body);
        } catch (err) {
          console.log(err);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutID);
  }, [boxes]);

  useEffect(() => {
    let newRow = [];

    newRow.push(<span key="routine_name" className="text-column">{routine_name}</span>);

    const today = new Date();
    const currentMonth = getYYYYMM(today);

    for (let day = 0; day < boxes.length; day++) {
      if (routine_yyyymm === currentMonth && day > today.getDate() - 1){
        newRow.push(
          <HabitBox key={day} id={day} toggle={toggle} checked={boxes[day]} disabled={true}/>
        );
      } else {
        newRow.push(
          <HabitBox key={day} id={day} toggle={toggle} checked={boxes[day]} disabled={false}/>
        );
      }
    }

    newRow.push(
      <span key="achievedHeaderColumn" className="text-column" id="achievedHeaderColumn">
        {boxes.filter(Boolean).length}
      </span>
    );
    newRow.push(
      <span key="goalHeaderColumn" className="text-column" id="goalHeaderColumn">
        {goal}
      </span>
    );

    setHabitRow([newRow]);
  }, [boxes]);

  function toggle(id) {
    setBoxes((prevBoxes) => {
      // copy array
      let newBoxes = prevBoxes.slice();
      newBoxes[id] = !prevBoxes[id];
      return newBoxes;
    });
  }

  function achievedGoal() {
    return boxArray.filter(Boolean).length;
  }


  return <div style={calendarBoxStyle(boxes.length)}>{habitRow}</div>;
}
