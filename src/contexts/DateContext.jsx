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

    useEffect(() => {
        if (getYYYYMM(new Date()) === getYYYYMM(date)) {
            setNextMonth(true);
        } else {
            setNextMonth(false);
        }
    }, [date]);

    // function getPrevMonth() {

    // }

    // function getNextMonth() {

    // }

    function changeToPrevMonth() {
        const month = date.getMonth();
        const year = date.getFullYear();

        let newDate;

        if (month === 0) {
            newDate = new Date(year - 1, 11);
        } else {
            newDate = new Date(year, month - 1);
        }
        setDate(newDate);
    }

    function changeToNextMonth() {
        const month = date.getMonth();
        const year = date.getFullYear();

        let newDate;

        if (month === 11) {
            newDate = new Date(year + 1, 0);
        } else {
            newDate = new Date(year, month + 1)
        }

        setDate(newDate);
    }

    const value = {
        date,
        changeToPrevMonth,
        changeToNextMonth,
        prevMonth,
        nextMonth
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    )
}