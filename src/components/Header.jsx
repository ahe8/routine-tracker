import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <h3>Routine Tracker</h3>
            <Link to="/login">Login</Link>
        </header>
    )
}