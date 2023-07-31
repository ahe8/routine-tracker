import { useState, useEffect } from 'react';
import { getNumberOfDaysInMonth, calendarBoxStyle } from "../utils"
import HabitBox from "./HabitBox";

export default function Habit(props) {

    const [habitRow, setHabitRow] = useState([]);
    const { routine_id, routine_name, routine_mmyy, routine_mmyy_values } = props;
    const initialBoxState = JSON.parse(routine_mmyy_values);
    const [boxes, setBoxes] = useState(initialBoxState);

    // debounce
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (initialBoxState !== boxes) {
                const body = {
                    ...props,
                    routine_mmyy_values: JSON.stringify(boxes)
                }

                try {
                    fetch(`http://localhost:5000/routines/${routine_id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
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

        newRow.push(
            <span>{routine_name}</span>
        );

        for (let day = 0; day < boxes.length; day++) {
            newRow.push(
                <HabitBox
                    key={day}
                    id={day}
                    toggle={toggle}
                    checked={boxes[day]}
                />)
        };

        newRow.push(<span id="currStreak">{getCurrStreak(props.date)}</span>);
        newRow.push(<span id="maxStreak">{getMaxStreak(boxes)}</span>);

        setHabitRow([newRow]);
    }
        , [boxes])

    function toggle(id) {
        setBoxes(prevBoxes => {
            // copy array
            let newBoxes = prevBoxes.slice();
            newBoxes[id] = !prevBoxes[id];
            return newBoxes;
        });
    }

    function getCurrStreak(boxArray) {
        let streak = 0;

        // offset 1 because boxArray is 0-indexed
        let day = props.date.getDate() - 1;

        while (day >= 0 && boxArray[day--]) {
            streak++;
        }
        return streak;
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
        })

        return maxStreak;
    }



    return (
        <div style={calendarBoxStyle(boxes.length)}>
            {habitRow}
        </div>
    )
}