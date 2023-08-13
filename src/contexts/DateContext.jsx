import React, { useState, createContext, useContext, useEffect } from 'react';
import { getYYYYMM } from "../utils";

const DateContext = createContext();

export function useDate() {
    return useContext(DateContext);
}

export function DateProvider({ children }) {
    const [date, setDate] = useState(new Date);
    const [prevMonth, setPrevMonth] = useState(false);
    const [nextMonth, setNextMonth] = useState(false);
    const [earliestMonth, setEarliestMonth] = useState();

    useEffect(() => {
        const currentMonth = getYYYYMM(date);

        if (getYYYYMM(new Date()) === currentMonth) {
            setNextMonth(true);
        } else {
            setNextMonth(false);
        }

        if (!earliestMonth || earliestMonth === currentMonth) {
            setPrevMonth(true);
        } else {
            setPrevMonth(false);
        }
    }, [date, earliestMonth]);

    function getPrevMonth(currDate) {
        const month = currDate.getMonth();
        const year = currDate.getFullYear();

        let newDate;

        if (month === 0) {
            newDate = new Date(year - 1, 11);
        } else {
            newDate = new Date(year, month - 1);
        }
        return newDate;
    }

    function changeToPrevMonth() {
        setDate(getPrevMonth(date));
    }

    function getNextMonth(currDate) {
        const month = currDate.getMonth();
        const year = currDate.getFullYear();

        let newDate;

        if (month === 11) {
            newDate = new Date(year + 1, 0);
        } else {
            newDate = new Date(year, month + 1)
        }
        return newDate;
    }

    function changeToNextMonth() {
        setDate(getNextMonth(date));
    }

    const value = {
        date,
        changeToPrevMonth,
        changeToNextMonth,
        prevMonth,
        nextMonth,
        getPrevMonth,
        getNextMonth,
        setEarliestMonth
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    )
}