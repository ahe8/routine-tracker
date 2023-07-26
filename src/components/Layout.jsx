import Calendar from "./Calendar"
import Header from "./Header"
import NavBar from './NavBar'
import Notes from './Notes'

export default function Layout() {
    return (
        <>
        <NavBar/>
            <Header />
            <Calendar />
            <Notes/>    
        </>
    )
}