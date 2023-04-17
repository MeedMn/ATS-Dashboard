import axios from 'axios';

export async function addStudent(student,idP){
    try{
        const datafetched = await axios.post("http://localhost:8080/createStudent",student);
        affectChildToParent(datafetched.data['id'],idP)
    }catch(error){
        console.error(error)
    }
}

export async function affectChildToParent(idStudent,idParent){
  await axios.post(`http://localhost:8080/affectChildToParent/${idStudent}/${idParent}`)
}

export async function getStudents(){
    const datafetched =  await axios.get("http://localhost:8080/students").catch((error) => console.log(error));
    let data = datafetched.data
    return data;  
}

export async function DeleteStudent(id){
    await axios.delete(`http://localhost:8080/deleteStudent/${id}`);
    window.location.assign("/student");
}

export const editStudent = async (student) => {
    await axios.put(`http://localhost:8080/updateStudent/${student['id']}`,student).catch((error) => console.log(error));
}
