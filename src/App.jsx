import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import jwt_decode from "jwt-decode";
import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";
import { getDesignTokens } from "./theme";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice";
import { useEffect } from "react";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const cursorRef = React.useRef(null);
  const dispatch=useDispatch()
  const [mode, setMode] = React.useState(
    localStorage.getItem("currentMode") || "light"
  );

  React.useEffect(() => {
    const cursor = cursorRef.current;
    document.body.addEventListener("mousemove", function (event) {
      cursor.style.top = `${event.clientY}px`;
      cursor.style.left = `${event.clientX}px`;
    });
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      // const decodedToken = jwt_decode(token);
      // const userId = decodedToken.userId;
      dispatch(fetchUser());
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/login" && (
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <TopBar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              setMode={setMode}
            />
            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Outlet />
            </Box>
          </Box>
        )}
      </ThemeProvider>
      {location.pathname === "/login" && <Outlet />}
      <div className="mouseTracker" ref={cursorRef}></div>
    </>
  );
}
