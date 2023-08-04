export const daysMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
};

export const calendarStyle = (calendarRows) => ({
    display: "grid",
    gridTemplateRows: `repeat(${calendarRows}, 4em)`
});

export const calendarBoxStyle = (numberOfDaysInCurrMonth) => ({
    display: "grid",
    margin: "1px",
    gridColumnGap: "1px",
    gridTemplateColumns: `8em repeat(${numberOfDaysInCurrMonth}, 4em) 5em 5em`

})

export const getNumberOfDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
};

export const getYYYYMM = (date) => {
    let res = date.getFullYear();

    const month = Number(date.getMonth());
    if (month < 10) {
        res = res + "0" + date.getMonth();
    } else {
        res = res + "" + date.getMonth();
    }

    return Number(res);
}