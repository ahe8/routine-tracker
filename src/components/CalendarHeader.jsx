import { useEffect, useState } from 'react';
import { daysMap, calendarBoxStyle, getNumberOfDaysInMonth } from '../utils'

export default function CalendarHeader({ date }) {
    const [calendarHeaders, setCalendarHeaders] = useState([]);

    const numberOfDaysInMonth = getNumberOfDaysInMonth(date);

    const year = date.getFullYear();
    const month = date.getMonth();

    useEffect(() => {
        let daysInMonth = [];
        let daysOfWeek = []

        for (let day = 1; day <= numberOfDaysInMonth; day++) {
            let currDate = new Date(year, month, day).getDay();
            daysOfWeek.push(<span className="calendarBox" id={day + 1}>{daysMap[currDate]}</span>)

            daysInMonth.push(<span className="calendarBox" id={day}>{day}</span>)
        }

        let daysOfWeekInit =
            <div key="0" style={calendarBoxStyle(numberOfDaysInMonth)}>
                <h3>Day</h3>
                {daysOfWeek}
                <h4>Current Streak</h4>
                <h4>Max Streak</h4>
            </div>

        let calendarInit =
            <div key="1" style={calendarBoxStyle(numberOfDaysInMonth)}>
                <h3>Habit</h3>
                {daysInMonth}
            </div>

        setCalendarHeaders([daysOfWeekInit, calendarInit]);
    }, [])

    return (
        <>
            <h1>Calendar</h1>
            <h3>{date.toLocaleString('default', { month: 'long' })} {year}</h3>
            {calendarHeaders}
        </>
    )
}