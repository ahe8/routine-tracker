import Calendar from "./Calendar";
import Header from "./Header";
import NavBar from "./NavBar";
import Notes from "./Notes";
import { useAuth } from "../contexts/AuthContext";

//Style
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LandingPage from "./LandingPage";

export default function Layout() {
  const theme = useTheme();
  const currUser = useAuth().currentUser;

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.primary.background,
            color: theme.primary.font,
          },
        }}
      />
      {currUser && <NavBar />}
      <Header />
      {
      currUser ? 
        <>
          <Calendar />
          <Notes />
        </>
      :
        <LandingPage/>
      }
    </>
  );
}
