import axios from 'axios';

export function addcoDriver(codriver){
    fetch("http://localhost:8080/createCoDriver",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(codriver)
        });
}

export async function getcoDrivers(){
    const datafetched =  await axios.get("http://localhost:8080/coDrivers").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}

export async function DeletecoDriver(id){
    await axios.delete(`http://localhost:8080/deleteCoDriver/${id}`);
    window.location.assign("/driver");
}

export const editcoDriver = async (codriver) => {
    await axios.put(`http://localhost:8080/updateCoDriver/${codriver['id']}`,codriver).catch((error) => console.log(error));
}
