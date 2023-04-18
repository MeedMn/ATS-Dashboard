import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import React, { useRef, useEffect } from "react";
import icon from 'leaflet/dist/images/driver.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Driver from "./Driver";
import { useState } from "react";
import { addDriver, getDrivers } from "../data/DriverDB";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow
});
const Dashboard = () => {
  const [drivers,setDrivers] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mapRef = useRef(null);
  
  useEffect( () => {
    const map = L.map(mapRef.current).setView([31.6295, -7.9811], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);
    const marker1 = L.marker([31.6564454,-8.0222897]).addTo(map);
    async function FetchDriver(){
      try {
        const Drivers = await getDrivers();
        setDrivers(Drivers);
        const driverMarkers = Drivers.map((driver) => (
          L.marker([parseFloat(driver.latitude), parseFloat(driver.longitude)]).addTo(map)
        ));
      } catch (error) {
        console.error(error);
      }
    }
  
    FetchDriver();
  
    return () => {
      map.remove();
    };
  }, []);
  
  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 3"
        >
                <div ref={mapRef} style={{ height: "100%" }}></div>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.yellow[100]}
            p="15px"
          >
            <Typography color={colors.yellow[100]} variant="h5" fontWeight="600">
              Parents Reclamation
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.yellow[100]}
            p="15px"
          >
            <Typography color={colors.yellow[100]} variant="h5" fontWeight="600">
              Working Drivers
            </Typography>
          </Box>
          {drivers.map((driver, i) => (
            <Box
              key={`${driver.code}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color="#003f5c"
                  variant="h5"
                  fontWeight="600"
                >
                  {driver.firstname + " "+ driver.lastname}
                </Typography>
                <Typography color="black">
                  {driver.age}
                </Typography>
              </Box>
              <Box color={colors.yellow[100]}>{driver.address}</Box>
              <Box
                backgroundColor="black"
                p="5px 10px"
                borderRadius="4px"
              >
                {driver.code}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
