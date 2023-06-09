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
    window.location.assign("/driver");
}

export const editDriver = async (driver1) => {
    await axios.put(`http://localhost:8080/updateDriver/${driver1['id']}`,driver1).catch((error) => console.log(error));
}
