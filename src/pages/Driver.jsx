import { Box, Button, useTheme } from "@mui/material";
import { useState,useEffect} from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import {getDrivers,DeleteDriver} from '../data/DriverDB'

const Driver = () => {
    const [drivers,setDrivers] = useState([]);
    // GetData
    useEffect(()=>{
        getDriver()
    },[]);
    async function getDriver(){
        setDrivers(await getDrivers())
    }
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID"},
      {
        field: "nom",
        headerName: "Nom",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "prenom",
        headerName: "Prenom",
        flex: 1,
        cellClassName: "prenom-column--cell",
      },
      {
        field: "address",
        headerName: "Address",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "tele",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "permis",
        headerName: "Permis",
        flex: 1,
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => {
            const onClick = (e) => {          
                const api = params.api;
                const thisRow = {};
                api.getAllColumns()
                  .filter(c => c.field !== "__check__" && !!c)
                  .forEach(c => {thisRow[c.field] = params.row[c.field]});
                
                return thisRow;
              };
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="space-between"
              borderRadius="4px"
            >
            <Link style={{textDecoration:"none"}} to={{pathname:`/edit/${onClick()["id"]}`, state: { data: onClick() },}}>
                  <Button style={{background:"green",color:"white",marginRight:"20px",padding:"10px 20px"}}>Edit</Button>
              </Link>
              <Button style={{background:"red",color:"white"}} onClick={()=>DeleteDriver(onClick()["id"])}>Delete</Button>
            </Box>
          );
        },
      },
    ];
    return (
      <Box m="20px">
        <Header title="Drivers" subtitle="Managing the drivers" />
        <Box
        width="100%"
        display="flex"
        justifyContent="end"
      >
        <Link style={{textDecoration:"none"}} to="/adddriver" >
            <Button style={{background:"#146C94",color:"white",fontWeight:"bold",padding:"10px 50px"}}>Add Driver</Button>
        </Link>
      </Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              color: "black",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid black",
              color: "black",
              
            },
            "& .name-column--cell": {
              color: "black",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#146C94",
              borderBottom: "none",
              color: "white",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
              color: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#146C94",
              color: "white",
            },
            "& .MuiCheckbox-root": {
              color: `${"white"} !important`,
            },
          }}
        >
          <DataGrid disableSelectionOnClick rows={drivers} columns={columns} components={{ Toolbar: GridToolbar }}/>
        </Box>
      </Box>
    );
  };
  
  export default Driver;
  