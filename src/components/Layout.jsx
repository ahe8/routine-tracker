import Calendar from "./Calendar"
import Header from "./Header"
import NavBar from './NavBar'

export default function Layout() {
    return (
        <>
        <NavBar/>
            <Header />
            <Calendar />
        </>
    )
}