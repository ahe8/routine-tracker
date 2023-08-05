import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <>
            <h1>Welcome to Routine Tracker</h1>
            <span>
                <Link to="/login" state={"register"}>Register</Link> to get started.
            </span>

        </>
    )
}