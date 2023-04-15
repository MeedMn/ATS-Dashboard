import axios from 'axios';


export async function addBus(Bus,driver,codriver){
    const datafetched1 =  await axios.get(`http://localhost:8080/driver/code/${driver}`).catch((error) => console.log(error));
    Bus['driver'] = datafetched1.data
    const datafetched =  await axios.get(`http://localhost:8080/coDriver/code/${codriver}`).catch((error) => console.log(error));
    Bus['codriver'] = datafetched.data
    // fetch(`http://localhost:8080/createTransport`,{
    //         method:'POST',
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(Bus)
    // });
    axios.post("http://localhost:8080/createTransport",{
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Bus)
    }).catch((error) => console.log(error)).then((data) => console.log(data));
}

// export async function getBusses(){
//     const datafetched =  await axios.get("http://localhost:8080/transports").catch((error) => console.log(error));
//     let data = datafetched.data
//     return data;  
// }

export async function DeleteBus(id){
    await axios.delete(`http://localhost:8080/deleteTransport/${id}`);
    window.location.assign("/driver");
}

export const editBus = async (Bus) => {
    await axios.put(`http://localhost:8080/updateTransport/${Bus['id']}`,Bus).catch((error) => console.log(error));
}
