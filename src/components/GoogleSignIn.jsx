import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

export default function GoogleSignIn() {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  async function signIn() {
    try {
      const userInfo = await googleSignIn();

      await fetch(`http://localhost:5001/register`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return <GoogleButton onClick={signIn} />;
}
