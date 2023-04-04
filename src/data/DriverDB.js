import axios from 'axios';

export function addDriver(driver){
    fetch("http://localhost:8080/createDriver",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(driver)
        });
}

export async function getDrivers(){
    const datafetched =  await axios.get("http://localhost:8080/drivers").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}

export async function DeleteDriver(id){
    await axios.delete(`http://localhost:8080/deleteDriver/${id}`);
}

export const editDriver = async (id,driver) => {
    console.log(driver)
    await axios.put(`http://localhost:8080/updateDriver/${id}`,driver).catch((error) => console.log(error));
}

