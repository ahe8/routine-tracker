import { useEffect, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import Habits from './Habits'
import { useWindowWidth } from '@react-hook/window-size'
import { getNumberOfDaysInMonth, getMaxBoxes, getBounds } from '../utils';
import { useDate } from '../contexts/DateContext';

export default function Calendar() {
    const [bounds, setBounds] = useState([]);
    const [leftButton, setLeftButton] = useState(false);
    const [rightButton, setRightButton] = useState(false);

    const { date } = useDate();
    const windowWidth = useWindowWidth();

    const numberOfDaysInMonth = getNumberOfDaysInMonth(date);
    const maxBoxes = getMaxBoxes(windowWidth);
    const numberOfColumns = Math.min(maxBoxes, numberOfDaysInMonth);

    useEffect(() => {
        const [leftBound, rightBound] = getBounds(date, maxBoxes, numberOfDaysInMonth);
        setBounds([leftBound, rightBound]);

        setLeftButton(leftBound === 1 ? false : true);
        setRightButton(rightBound === numberOfDaysInMonth ? false : true);
    }, [date, windowWidth]);

    useEffect(() => {
        const [leftBound, rightBound] = bounds;

        setLeftButton(leftBound === 1 ? false : true);
        setRightButton(rightBound === numberOfDaysInMonth ? false : true);
    }, [bounds]);

    function shiftBoundsLeft() {
        let [leftBound, rightBound] = bounds;

        if (leftBound - maxBoxes > 1) {
            leftBound = leftBound - maxBoxes;
            rightBound = rightBound - maxBoxes;
        } else {
            leftBound = 1;
            rightBound = maxBoxes;
        }

        setBounds([leftBound, rightBound]);

        if (leftBound === 1) {
            setLeftButton(false);
        }
    };

    function shiftBoundsRight() {
        let [leftBound, rightBound] = bounds;

        if (rightBound + maxBoxes >= numberOfDaysInMonth) {
            leftBound = numberOfDaysInMonth - maxBoxes + 1;
            rightBound = numberOfDaysInMonth;
        } else {
            leftBound = leftBound + maxBoxes;
            rightBound = rightBound + maxBoxes;
        }

        setBounds([leftBound, rightBound]);

        if (rightBound === numberOfDaysInMonth) {
            setRightButton(false);
        }
    };

    const headerProps = {
        bounds,
        setBounds,
        leftButton,
        rightButton,
        shiftBoundsLeft,
        shiftBoundsRight,
        numberOfColumns
    };

    const habitsProps = {
        bounds,
        numberOfColumns
    };


    return (
        <div className="calendar">
            <CalendarHeader {...headerProps} />
            <Habits {...habitsProps} />
        </div>
    )
}