import { Box, Button, useTheme,Modal,TextField, useMediaQuery,Select,MenuItem,FormControl,InputLabel} from "@mui/material";
import { useState,useEffect} from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import {DeleteBus,addBus,getBusses,getDriverIdByCode,getCoDriverIdByCode,affectDriverCoDriverToBus} from '../data/BusDB'
import * as yup from 'yup';
import { Formik } from "formik";

const Bus = () => {
  const [idP,setIdP] = useState(0)
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      values.seat_number = parseInt(values.seat_number)
      addBus(values);
      window.location.assign("/bus");
    };
    const handleFormSubmitDriverCo = (values) => {
      const d = {
        id_driver:null,
        id_CoDriver:null
      }
      let promise1 = getDriverIdByCode(values.code_driver)
      promise1.then((data)=>{
        d.id_driver = data
      })
      let promise2 = getCoDriverIdByCode(values.code_CoDriver)
      promise2.then((data)=>{
        d.id_CoDriver = data
      })
      setTimeout(() => {
        affectDriverCoDriverToBus(idP,d.id_driver,d.id_CoDriver)
        window.location.assign("/bus");
    }, 2000);
  };
    const initialValues = {
        registration_number: "",
        fuel: "",
        seat_number: ""
    };
    const initialValuesCodes = {
      code_driver: "",
      code_CoDriver: ""
    }
    const checkoutSchema = yup.object().shape({
        registration_number:yup.string().required("Required"),
        fuel:yup.string().required("Required"),
        seat_number:yup.number().required("Required")
    })
    const checkoutSchemaDrivers = yup.object().shape({
      code_driver:yup.string().required("Required"),
      code_CoDriver:yup.string().required("Required")
  })
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenChild = () => {
    setOpenEdit(true);
  };

  const handleCloseChild = () => {
    setOpenEdit(false);
  };
  const ChildModal = (data)=>{
    setIdP(data['id']);
  }
  const body = (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px',  textAlign: 'center',width: "45%",height: "49%", position: 'relative' }}>
  <Box sx={{ textAlign: 'center', marginBottom: '-170px' }}>
  <Box sx={{ position: 'absolute', top: '10px', right: '15px' }}>
  <button onClick={handleClose} style={{ backgroundColor: 'transparent', border: 'none', color: '#000', fontSize: '24px', cursor: 'pointer' }}>X</button>
  </Box>
  <Header title="ADD BUS" subtitle="Add a new Bus !"/>
  </Box>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
              <form onSubmit={handleSubmit} style={{marginTop:"250px"}}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Registration"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.registration_number}
                    name="registration_number"
                    error={!!touched.registration_number && !!errors.registration_number}
                    helpertext={touched.registration_number && errors.registration_number}
                    sx={{ 
                        gridColumn: "span 2",
                        "& label": { color: "black" },
                        "& .MuiInputBase-input": {
                            color: "black"
                          },
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black"},
                        "&:hover fieldset": { borderColor: "green" },
                      },}}
                  />
                      <FormControl fullWidth sx={{ gridColumn: "span 2",  "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "black"},
                                    "&:hover fieldset": { borderColor: "green" },
                                  }}}>
                         <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
                             Fuel
                          </InputLabel>
                        <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.fuel}
                                label="Fuel"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="fuel"
                                variant="outlined"
                                error={!!touched.fuel && !!errors.fuel}
                                helpertext={touched.fuel && errors.fuel}
                                sx={{ 
                                    gridColumn: "span 2",
                                    "& label": { color: "black" },
                                    "& .MuiInputBase-input": {
                                        color: "black"
                                      },
                                    "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "black"},
                                    "&:hover fieldset": { borderColor: "green" },
                                  },}}
                            >
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Essence">Essence</MenuItem>
                        </Select>
                    </FormControl>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Number of Passengers"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.seat_number}
                    name="seat_number"
                    error={!!touched.seat_number && !!errors.seat_number}
                    helpertext={touched.seat_number && errors.seat_number}
                    sx={{ 
                        gridColumn: "span 4",
                        "& label": { color: "black" },
                        "& .MuiInputBase-input": {
                            color: "black"
                          },
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black"},
                        "&:hover fieldset": { borderColor: "green" },
                      },}}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" variant="contained" style={{color:"white",fontWeight:"bold",background:"#146C94"}}>
                    Add New Bus
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  </Box>
  );
  const bodychild = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px',  textAlign: 'center',width: "45%",height: "49%", position: 'relative' }}>
    <Box sx={{ textAlign: 'center', marginBottom: '-170px' }}>
    <Box sx={{ position: 'absolute', top: '10px', right: '15px' }}>
    <button onClick={handleCloseChild} style={{ backgroundColor: 'transparent', border: 'none', color: '#000', fontSize: '24px', cursor: 'pointer' }}>X</button>
    </Box>
    <Header title="AFFECT DRIVER | CODRIVER" subtitle="Add new Driver | CoDriver to the bus"/>
    </Box>
            <Formik onSubmit={handleFormSubmitDriverCo} initialValues={initialValuesCodes} validationSchema={checkoutSchemaDrivers}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
                <form onSubmit={handleSubmit} style={{marginTop:"250px"}}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Driver Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code_driver}
                      name="code_driver"
                      error={!!touched.code_driver && !!errors.code_driver}
                      helperText={touched.code_driver && errors.code_driver}
                      sx={{ 
                          gridColumn: "span 2",
                          "& label": { color: "black" },
                          "& .MuiInputBase-input": {
                              color: "black"
                            },
                          "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black"},
                          "&:hover fieldset": { borderColor: "green" },
                        },}}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="CoDriver Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code_CoDriver}
                      name="code_CoDriver"
                      error={!!touched.code_CoDriver && !!errors.code_CoDriver}
                      helperText={touched.code_CoDriver && errors.code_CoDriver}
                      sx={{ 
                          gridColumn: "span 2",
                          "& label": { color: "black" },
                          "& .MuiInputBase-input": {
                              color: "black"
                            },
                          "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black"},
                          "&:hover fieldset": { borderColor: "green" },
                        },}}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" mt="20px">
                    <Button type="submit" variant="contained" style={{color:"white",fontWeight:"bold",background:"#146C94"}}>
                      Affect Them
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
    </Box>
    );
    const [busses,setBusses] = useState([]);
    // GetData
    useEffect(()=>{
        getBus()
    },[]);
    async function getBus(){
      setBusses(await getBusses())
    }
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID"},
      {
        field: "registration_number",
        headerName: "Registration",
        flex: 1.2,
        cellClassName: "name-column--cell",
      },
      {
        field: "fuel",
        headerName: "Fuel",
        flex: 1,
        cellClassName: "prenom-column--cell",
      },
      {
        field: "seat_number",
        headerName: "Number of Passangers",
        type: "number",
        flex: 1,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "id_driver_code",
        headerName: "Driver Code",
        flex: 1.2,
      },
      {
        field: "id_CoDriver_code",
        headerName: "Co-Driver Code",
        flex: 1.2,
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
              <Button style={{background:"#202020",color:"white",marginRight:"20px",padding:"10px 20px"}} onClick={()=>{ChildModal(onClick());handleOpenChild()}}>Add D/Co</Button>
              <Modal
              open={openEdit}
              onClose={handleCloseChild}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {bodychild}
            </Modal>
              <Button style={{background:"red",color:"white"}} onClick={()=>DeleteBus(onClick()["id"])}>Delete</Button>
            </Box>
          );
        },
      },
    ];
    return (
      <Box m="20px">
        <Header title="Bus" subtitle="Managing the Buses" />
        
        <Box
        width="100%"
        display="flex"
        justifyContent="end"
      >
      <Button onClick={handleOpen} style={{background:"#003f5c",color:"white",fontWeight:"bold",padding:"10px 50px"}}>Add Bus</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {body}
      </Modal>
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
              backgroundColor: "#003f5c",
              borderBottom: "none",
              color: "white",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
              color: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#003f5c",
              color: "white",
            },
            "& .MuiCheckbox-root": {
              color: `${"white"} !important`,
            },
          }}
        >
          <DataGrid disableSelectionOnClick rows={busses} columns={columns} components={{ Toolbar: GridToolbar }}/>
        </Box>
      </Box>
    );
  };
  
  export default Bus;