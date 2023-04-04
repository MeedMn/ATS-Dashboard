import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { ColorLens } from '@mui/icons-material';
import {addDriver} from '../../data/DriverDB'

const AddDriver = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
        values.age = parseInt(values.age);
        addDriver(values);
        window.location.assign("/driver");
    };
    const initialValues = {
        prenom: "",
        nom: "",
        address: "",
        tele: "",
        age: "",
        permis: "",
    };
    const checkoutSchema = yup.object().shape({
        prenom:yup.string().required("Required"),
        nom:yup.string().required("Required"),
        address:yup.string().required("Required"),
        tele:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        age:yup.number().required(),
        permis:yup.string().required("Required"),
    })


    return (
        <Box m="20px" sx={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
          <Header title="ADD DRIVER" subtitle="Add a new driver !" />
    
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
                    label="Prenom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prenom}
                    name="prenom"
                    error={!!touched.prenom && !!errors.prenom}
                    helperText={touched.prenom && errors.prenom}
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
                    label="Nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom}
                    name="nom"
                    error={!!touched.nom && !!errors.nom}
                    helperText={touched.nom && errors.nom}
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
                    label="Numero Telephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tele}
                    name="tele"
                    error={!!touched.tele && !!errors.tele}
                    helperText={touched.tele && errors.tele}
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
                    label="Permis"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.permis}
                    name="permis"
                    error={!!touched.permis && !!errors.permis}
                    helperText={touched.permis && errors.permis}
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
                    Add New Driver
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default AddDriver