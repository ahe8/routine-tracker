import { useEffect, useState } from 'react';
import { daysMap, calendarBoxStyle, getNumberOfDaysInMonth, getYYYYMM } from '../utils';
import { Button } from "@mui/material";
import { useDate } from "../contexts/DateContext";
import { useWindowWidth } from '@react-hook/window-size'
import { getMaxBoxes, getBounds } from '../utils';

export default function CalendarHeader() {
    const [calendarHeaders, setCalendarHeaders] = useState([]);

    const { date, prevMonth, nextMonth, changeToPrevMonth, changeToNextMonth } = useDate();
    const windowWidth = useWindowWidth();

    const numberOfDaysInMonth = getNumberOfDaysInMonth(date);
    const maxBoxes = getMaxBoxes(windowWidth);
    const numberOfColumns = Math.min(maxBoxes, numberOfDaysInMonth);

    const year = date.getFullYear();
    const month = date.getMonth();

    useEffect(() => {
        let daysOfWeek = [];
        let daysInMonth = [];

        let bounds = getBounds(date, maxBoxes, numberOfDaysInMonth);

        for (let day = bounds[0]; day <= bounds[1]; day++) {
            let currDate = new Date(year, month, day).getDay();
            daysOfWeek.push(<small key={day} className="calendarBox">{daysMap[currDate]}</small>)
            daysInMonth.push(<p key={day} className="calendarBox">{day}</p>)
        }

        let daysOfWeekRow =
            <div key="0" style={calendarBoxStyle(numberOfColumns)}>
                <span></span>
                <span></span>
                {daysOfWeek}
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
    }, [date, windowWidth])

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