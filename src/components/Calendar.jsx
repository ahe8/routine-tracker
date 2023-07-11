import { useState, useEffect } from 'react';

export default function Calendar() {
    const [calendarRows, setCalendarRows] = useState([]);

    const daysMap = {
        0:"S",
        1:"M",
        2:"T",
        3:"W",
        4:"T",
        5:"F",
        6:"S"
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    const numberOfDaysInCurrMonth = new Date(year, month + 1, 0).getDate();

    let calendarStyle = {
        display: "grid",
        gridTemplateRows: `repeat(${calendarRows.length}, 3em)`
    }

    let calendarBoxStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfDaysInCurrMonth + 1}, 3em)`
        
    }

    useEffect(() => {
        let calendar = [];

        for (let i = 0; i < numberOfDaysInCurrMonth; i++) {
            calendar.push(
                <span className="calendarBox" id={i + 1}>{i + 1}</span>
            )
        }

        let daysOfWeek = []

        for (let day = 1; day <= numberOfDaysInCurrMonth; day++) {
            let currDate = new Date(year, month, day).getDay();
            daysOfWeek.push(
                <span className="calendarBox" id={day + 1}>{daysMap[currDate]}</span>
            )
        }

        let daysOfWeekInit = 
        <div key="0" style={calendarBoxStyle}>
            <h3>Day</h3>
            {daysOfWeek}
        </div>

        let calendarInit = 
            <div key="1" style={calendarBoxStyle}>
                <h3>Habit</h3>
                {calendar}
            </div>

        setCalendarRows([daysOfWeekInit, calendarInit]);
    }, [])


    function addRow() {
        let newRow = [];

        for (let i = 0; i <= numberOfDaysInCurrMonth; i++) {
            newRow.push(
                <span className="calendarBox" id={i + 1}></span>
            )
        }

        let row = <div key={calendarRows.length} style={calendarBoxStyle}>{newRow}</div>

        setCalendarRows(prevRows => [...prevRows, row])
    }

    return (
        <>
            <h1>Calendar</h1>
            <h3>{date.toLocaleString('default', { month: 'long' })} {year}</h3>
            <div className="calendar" style={calendarStyle}>
                {calendarRows}
            </div>
            <button onClick={addRow}>Add Row</button>
        </>
    )
}