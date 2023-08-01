import Calendar from "./Calendar";
import Header from "./Header";
import NavBar from "./NavBar";
import Notes from "./Notes";

//Style
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Layout() {
  const theme = useTheme();

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
      <NavBar />
      <Header />
      <Calendar />
      <Notes />
    </>
  );
}
