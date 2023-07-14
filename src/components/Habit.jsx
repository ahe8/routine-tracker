import {useState, useEffect} from 'react';
import {getNumberOfDaysInMonth} from "../utils"
import HabitBox from "./HabitBox";

export default function Habit({habitName, date}){
    const [habit, setHabit] = useState({});
    const [habitRow, setHabitRow] = useState([]);

    const month = date.getMonth();
    const year = date.getFullYear();

    const numberOfDaysInMonth = getNumberOfDaysInMonth(date);


    function getCurrStreak(boxArray, date) {
        let streak = 0;

        // offset 1 because boxArray is 0-indexed
        let day = date.getDate() - 1;

        while (day >= 0) {
            if (boxArray[day--]) {
                streak++;
            } else {
                break
            }
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
            } else{
                currStreak = 0;
            }
        })

        return maxStreak;
    }

    // function toggle(month, day) {
    //     setHabit(prevState => {
    //         let updatedArr = prevState[month]
    //         updatedArr[day] = !updatedArr[day]

    //         return {
    //             ...prevState,
    //             month: updatedArr
    //         }
    //     })
    // }

    useEffect(() => {
        let boxes =  new Array(numberOfDaysInMonth).fill(false);
        let MMYY = month + "" + year;
        
        console.log(MMYY);

        setHabit({
            habitName: habitName,
            [MMYY]: boxes
        })

        let newRow = []
        newRow.push(
            <span>{habit.habitName}</span>
        )

        for(let day = 0; day < numberOfDaysInMonth; day++) {
            newRow.push(<HabitBox />)
        }

        newRow.push(getCurrStreak(date))
        newRow.push(getMaxStreak(boxes))
            
        setHabitRow([newRow]);
    }, []) 


    
    return (
        <div>
            {habitRow}
        </div>
    )
}