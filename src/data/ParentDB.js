import axios from 'axios';

export function addParent(parent){
    fetch("http://localhost:8080/createParent",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(parent)
        });
}
export async function getLongitudeLatitude(address) {
    const params = {
      access_key: '037e372f46f719a44c3f85119ffd0c85',
      query: `${address}`,
      limit: 1
    };
  
    const datafetched =  await axios.get('http://api.positionstack.com/v1/forward', { params }).catch(error => {
        console.log(error);
      });
    let data = datafetched.data
    return data
  }

export async function getParents(){
    const datafetched =  await axios.get("http://localhost:8080/parents").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}

export async function DeleteParent(id){
    await axios.delete(`http://localhost:8080/deletePatient/${id}`);
    window.location.assign("/parent");
}

export const editParent = async (parent) => {
    alert(JSON.stringify(parent))
    alert(parent['id'])
    await axios.put(`http://localhost:8080/updateParent/${parent['id']}`,parent).catch((error) => console.log(error));
}
