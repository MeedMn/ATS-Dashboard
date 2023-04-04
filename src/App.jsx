import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import './app.css';
import Driver from "./pages/Driver";
import AddDriver from "./pages/CruidPages/AddDriver";
import ModifyDriver from "./pages/CruidPages/ModifyDriver";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/adddriver" element={<AddDriver />} />
              <Route path='/edit/:id' element={<ModifyDriver />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;