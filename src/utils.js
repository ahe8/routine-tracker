export const daysMap = {
    0:"S",
    1:"M",
    2:"T",
    3:"W",
    4:"T",
    5:"F",
    6:"S"
};

export const calendarStyle = (calendarRows) => ({
    display: "grid",
    gridTemplateRows: `repeat(${calendarRows.length}, 3em)`
});

export const calendarBoxStyle = (numberOfDaysInCurrMonth) => ({
    display: "grid",
    gridTemplateColumns: `5em repeat(${numberOfDaysInCurrMonth}, 3em) 5em 5em`

})

export const getNumberOfDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
};