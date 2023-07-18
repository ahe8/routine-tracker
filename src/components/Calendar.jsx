import { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import Habits from './Habits'

export default function Calendar() {
    const date = new Date();

    return (
        <div className="calendar">
            <CalendarHeader date={date} />
            <Habits date={date} />
        </div>
    )
}