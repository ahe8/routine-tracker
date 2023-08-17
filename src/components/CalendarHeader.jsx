import { useEffect, useState } from 'react';
import { daysMap, calendarBoxStyle } from '../utils';
import { Button } from "@mui/material";
import { useDate } from "../contexts/DateContext";


export default function CalendarHeader(props) {
    const [calendarHeaders, setCalendarHeaders] = useState([]);

    const { date, prevMonth, nextMonth, changeToPrevMonth, changeToNextMonth } = useDate();
    const { bounds, numberOfColumns, shiftBoundsLeft, shiftBoundsRight, leftButton, rightButton } = props;

    const year = date.getFullYear();
    const month = date.getMonth();

    useEffect(() => {
        let daysOfWeek = [];
        let daysInMonth = [];

        const [leftBound, rightBound] = bounds;

        for (let day = leftBound; day <= rightBound; day++) {
            let currDate = new Date(year, month, day).getDay();
            daysOfWeek.push(<small key={day} className="calendarBox">{daysMap[currDate]}</small>)
            daysInMonth.push(<p key={day} className="calendarBox">{day}</p>)
        }

        let daysOfWeekRow =
            <div key="0" style={calendarBoxStyle(numberOfColumns)}>
                <span></span>
                <Button onClick={shiftBoundsLeft} disabled={!leftButton} size="small">&lt;</Button>
                {daysOfWeek}
                <Button onClick={shiftBoundsRight} disabled={!rightButton} size="small">&gt;</Button>
                <span></span>
            </div>

        let daysInMonthRow =
            <div key="1" id="headers" style={calendarBoxStyle(numberOfColumns)}>
                <span></span>
                <h4>Habit</h4>
                {daysInMonth}
                <h4>Achieved</h4>
                <h4>Monthly Goal</h4>
            </div>
        setCalendarHeaders([daysOfWeekRow, daysInMonthRow]);
    }, [date, bounds, leftButton, rightButton])

    return (
        <>
            <h1>Calendar</h1>

            <div className="month">
                <Button variant="outlined" size="small" disabled={prevMonth} onClick={changeToPrevMonth}>{"<<"}</Button>
                <h3>{date.toLocaleString('default', { month: 'long' })} {year}</h3>
                <Button variant="outlined" size="small" disabled={nextMonth} onClick={changeToNextMonth}>{">>"}</Button>
            </div>

            {calendarHeaders}
        </>
    )
}