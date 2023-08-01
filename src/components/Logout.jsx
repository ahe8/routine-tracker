import { getAuth, signOut } from "firebase/auth";

export default function Logout() {
    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            window.location.reload();
            console.log("signed out");
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <button onClick={logout}>
            Logout
        </button>
    )
}