import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Logout";

export default function Header() {
  return (
    <header>
      <h3>Routine Tracker</h3>
      {useAuth().currentUser ? "" : <Link to="/login">Login</Link>}
    </header>
  );
}
