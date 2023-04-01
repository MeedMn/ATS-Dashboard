import axios from 'axios';

export function addDriver(driver){
    fetch("http://localhost:8080/createDriver",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(driver)
        });
    console.log("Added")
}

export async function getDrivers(){
    const datafetched =  await axios.get("http://localhost:8080/drivers").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}