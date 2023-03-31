import { Box,Typography, useTheme } from "@mui/material";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome Back {User} !" />
      </Box>
    </Box>
  );
};

export default Dashboard;
