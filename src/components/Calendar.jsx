import CalendarHeader from './CalendarHeader';
import Habits from './Habits'

export default function Calendar() {
    return (
        <div className="calendar">
            <CalendarHeader />
            <Habits />
        </div>
    )
}