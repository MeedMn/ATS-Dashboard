import { Box, Button, useTheme,Modal,TextField, useMediaQuery} from "@mui/material";
import { useState,useEffect} from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import {getParents,DeleteParent,addParent,editParent,getLongitudeLatitude} from '../data/ParentDB'
import {addStudent} from "../data/StudentDB"
import * as yup from 'yup';
import { Formik } from "formik";

const Parent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (parent) => {
        let values = parent
        const promise = getLongitudeLatitude(values.address);
        promise.then(data => {
            values.longitude=''+data.data[0]["longitude"]
            values.latitude=''+data.data[0]["latitude"]
        });
        setTimeout(() => {
            addParent(values);
            window.location.assign("/parent");
        }, 2000);
        
    };
    const handleFormSubmitChild = (student) => {
        student.age = parseInt(student.age)
        addStudent(student,idP);
        //window.location.assign("/parent");
    };
    const initialValues = {
      firstname: "",
      lastname: "",
      address: "",
      numberphone: "",
      longitude:"",
      latitude:""
    };
    const initialValuesStudent = {
      firstname: "",
      lastname: "",
      grade:"",
      age:""
    }
    const checkoutSchema = yup.object().shape({
        firstname:yup.string().required("Required"),
        lastname:yup.string().required("Required"),
        age:yup.number().required(),
        grade:yup.string().required("Required"),
        address:yup.string().required("Required"),
        numberphone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
    })
    const checkoutSchemaChild = yup.object().shape({
        firstname:yup.string().required("Required"),
        lastname:yup.string().required("Required"),
        age:yup.number().required(),
        grade:yup.string().required("Required")
    })
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idP,setIdP] = useState(0)
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
  <Header title="ADD PARENT" subtitle="Add a new parent !"/>
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                    error={!!touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
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
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
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
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
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
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numberphone}
                    name="numberphone"
                    error={!!touched.numberphone && !!errors.numberphone}
                    helperText={touched.numberphone && errors.numberphone}
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
                    Add New parent
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  </Box>
  );
  const bodychild = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px',  textAlign: 'center',width: "45%",height: "49%", position: 'relative' }}>
    <Box sx={{ textAlign: 'center', marginBottom: '-170px' }}>
    <Box sx={{ position: 'absolute', top: '10px', right: '15px' }}>
    <button onClick={handleCloseChild} style={{ backgroundColor: 'transparent', border: 'none', color: '#000', fontSize: '24px', cursor: 'pointer' }}>X</button>
    </Box>
    <Header title="ADD STUDENT" subtitle="Add a new student !"/>
    </Box>
            <Formik onSubmit={handleFormSubmitChild} initialValues={initialValuesStudent} validationSchema={checkoutSchemaChild}>
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
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      name="firstname"
                      error={!!touched.firstname && !!errors.firstname}
                      helperText={touched.firstname && errors.firstname}
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
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      name="lastname"
                      error={!!touched.lastname && !!errors.lastname}
                      helperText={touched.lastname && errors.lastname}
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
                    label="Age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.age}
                    name="age"
                    error={!!touched.age && !!errors.age}
                    helperText={touched.age && errors.age}
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
                      label="Grade"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.grade}
                      name="grade"
                      error={!!touched.grade && !!errors.grade}
                      helperText={touched.grade && errors.grade}
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
                      Add New student
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
    </Box>
    );
    const [parents,setparents] = useState([]);
    // GetData
    useEffect(()=>{
        getParent()
    },[]);
    async function getParent(){
        setparents(await getParents())
    }
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID"},
      {
        field: "lastname",
        headerName: "Last Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "firstname",
        headerName: "First Name",
        flex: 1,
        cellClassName: "firstname-column--cell",
      },
      
      {
        field: "address",
        headerName: "Address",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "numberphone",
        headerName: "Phone Number",
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
              <Button style={{background:"#202020",color:"white",marginRight:"20px",padding:"10px 20px"}} onClick={()=>{ChildModal(onClick());handleOpenChild()}}>Add Child</Button>
              <Modal
              open={openEdit}
              onClose={handleCloseChild}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {bodychild}
            </Modal>
              <Button style={{background:"red",color:"white"}} onClick={()=>DeleteParent(onClick()["id"])}>Delete</Button>
            </Box>
          );
        },
      },
    ];
    return (
      <Box m="20px">
        <Header title="PARENTS" subtitle="Managing the parents" />
        
        <Box
        width="100%"
        display="flex"
        justifyContent="end"
      >
      <Button onClick={handleOpen} style={{background:"#003f5c",color:"white",fontWeight:"bold",padding:"10px 50px"}}>Add parent</Button>
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
          <DataGrid disableSelectionOnClick rows={parents} columns={columns} components={{ Toolbar: GridToolbar }}/>
        </Box>
      </Box>
    );
  };
  
  export default Parent;
  