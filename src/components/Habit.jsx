import { useState, useEffect } from "react";
import { getNumberOfDaysInMonth, calendarBoxStyle } from "../utils";
import HabitBox from "./HabitBox";
import { useDate } from "../contexts/DateContext";

export default function Habit(props) {
  const [habitRow, setHabitRow] = useState([]);
  const { user_id, routine_name, routine_yyyymm, routine_values } = props;
  const initialBoxState = JSON.parse(routine_values);
  const [boxes, setBoxes] = useState(initialBoxState);
  const { date } = useDate();

  // debounce
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (initialBoxState !== boxes) {
        const body = {
          ...props,
          routine_values: JSON.stringify(boxes),
        };

        try {
          fetch(`http://localhost:5001/${user_id}/routines`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } catch (err) {
          console.log(err);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutID);
  }, [boxes]);

  useEffect(() => {
    let newRow = [];

    newRow.push(<span className="text-column">{routine_name}</span>);

    for (let day = 0; day < boxes.length; day++) {
      newRow.push(
        <HabitBox key={day} id={day} toggle={toggle} checked={boxes[day]} />
      );
    }

    newRow.push(
      <span className="text-column" id="currStreak">
        {getCurrStreak(date)}
      </span>
    );
    newRow.push(
      <span className="text-column" id="maxStreak">
        {getMaxStreak(boxes)}
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

  function getCurrStreak(boxArray) {
    // let streak = 0;

    // // offset 1 because boxArray is 0-indexed
    // let day = props.date.getDate() - 1;

    // while (day >= 0 && boxArray[day--]) {
    //     streak++;
    // }
    // return streak;

    return 0;
  }

  function getMaxStreak(boxArray) {
    let maxStreak = 0;
    let currStreak = 0;

    boxArray.forEach((box) => {
      if (box) {
        currStreak++;
        maxStreak = currStreak > maxStreak ? currStreak : maxStreak;
      } else {
        currStreak = 0;
      }
    });

    return maxStreak;
  }

  return <div style={calendarBoxStyle(boxes.length)}>{habitRow}</div>;
}
