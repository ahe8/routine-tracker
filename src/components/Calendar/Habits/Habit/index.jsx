import { useState, useEffect } from 'react';
import { getNumberOfDaysInMonth } from "../../../../utils"
import HabitBox from "./HabitBox";
import { calendarBoxStyle } from "../../../../utils";

export default function Habit(props) {
    const [habit, setHabit] = useState({});
    const [habitRow, setHabitRow] = useState([]);

    const month = props.date.getMonth();
    const year = props.date.getFullYear();

    const MMYY = month + "" + year;

    const numberOfDaysInMonth = getNumberOfDaysInMonth(props.date);

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

    useEffect(() => {
        let boxes = new Array(numberOfDaysInMonth).fill(false);;
        if (props.habitStates && props.habitStates[MMYY]) {
            boxes = props.habitStates[MMYY];
        }

        let newRow = []

        newRow.push(
            <span>{props.habitName}</span>
        )

        for (let day = 0; day < numberOfDaysInMonth; day++) {
            newRow.push(
                <HabitBox
                    key={day}
                    id={day}
                    // toggle={toggle} 
                    checked={boxes[day]}
                />)
        }

        newRow.push(<span id="currStreak">{getCurrStreak(props.date)}</span>)
        newRow.push(<span id="maxStreak">{getMaxStreak(boxes)}</span>)

        setHabitRow([newRow]);
    }, [habit])


    return (
        <div style={calendarBoxStyle(numberOfDaysInMonth)}>
            {habitRow}
        </div>
    )
}