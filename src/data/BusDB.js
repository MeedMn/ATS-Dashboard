import axios from 'axios';

export function addBus(Bus,driver,codriver){
    fetch(`http://localhost:8080/createTransport/${driver}/${codriver}`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(Bus)
        });
}

export async function getBusses(){
    const datafetched =  await axios.get("http://localhost:8080/transports").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}

export async function DeleteBus(id){
    await axios.delete(`http://localhost:8080/deleteTransport/${id}`);
    window.location.assign("/driver");
}

export const editBus = async (Bus) => {
    await axios.put(`http://localhost:8080/updateTransport/${Bus['id']}`,Bus).catch((error) => console.log(error));
}
