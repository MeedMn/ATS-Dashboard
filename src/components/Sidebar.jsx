import React,{useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from '@mui/icons-material/Person';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo from "../images/logo.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "black",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    boxShadow: "3px 0 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "0px 50px 50px 0px"
  }}>
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#003f5c !important`,
          borderRadius: "0px 50px 50px 0px"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color:"#F6F1F1"
        },
        "& .pro-inner-item:hover": {
          color: "#00202e !important",
        },
        "& .pro-menu-item.active": {
          color: "#000000 !important",
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            color:"#00202e"
          },
          background: "white",
          borderRadius: "50px 0px 0px 50px"
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.yellow[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Box display="flex" alignItems="center">
                  <img src={logo} alt="bus" width="55" height="55" style={{marginRight: 10+"px"}} />
                  <Typography variant="h3" color="white" fontWeight={500} letterSpacing={10} ml={1} sx={{ fontSize: "28px" }}>
                    ATS
                  </Typography>
                </Box>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <hr />
          <br />
          <br />
          
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <br />
            <Item
              title="Drivers"
              to="/driver"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <br />
            <Item
              title="Bus"
              to="/bus"
              icon={<DirectionsBusIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <br/>
            <Item
              title="Parking"
              to="/parking"
              icon={<LocalParkingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <br/>
            <Item
              title="Clients"
              to="/client"
              icon={<PersonAddAlt1Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <br/>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </Box>
  );
};

export default Sidebar;
