import axios from 'axios';


export async function addBus(Bus){
    fetch("http://localhost:8080/createTransport",{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Bus)
    }).then((response)=>{return response.json()}).then((data)=> console.log(data)).catch((error)=>console.log(error));
}

export async function getBusses() {
    const datafetched = await axios
      .get("http://localhost:8080/transports")
      .catch((error) => console.log(error));
  
    let data = datafetched.data.map((item) => {
      return {
        id: item.id,
        registration_number: item.registration_number,
        fuel: item.fuel,
        seat_number: item.seat_number,
        id_driver_code: item.id_driver ? item.id_driver.code : null,
        id_CoDriver_code: item.id_CoDriver ? item.id_CoDriver.code : null,
      };
    });
      return data;
}
export async function affectDriverCoDriverToBus(idBus,idDriver,idCoDriver){
    await axios.post(`http://localhost:8080/affectDrvierCoDriver/${idBus}/${idDriver}/${idCoDriver}`)
}
export async function getDriverIdByCode(code){
    const datafetched = await axios
      .get(`http://localhost:8080/driver/code/${code}`)
      .catch((error) => console.log(error));
    return datafetched.data
}
export async function getCoDriverIdByCode(code){
    const datafetched = await axios
      .get(`http://localhost:8080/coDriver/code/${code}`)
      .catch((error) => console.log(error));
    return datafetched.data
}
export async function DeleteBus(id){
    await axios.delete(`http://localhost:8080/deleteTransport/${id}`);
    window.location.assign("/bus");
}
