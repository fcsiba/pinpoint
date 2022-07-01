import axios from "axios";

const PinPoint_API_BASE_URL = "http://localhost:9191/api/v1/employees";
const PinPoint_API_GetStudent_URL = "http://localhost:8000/api/student/get";
const PinPoint_API_GetDriver_URL = "http://localhost:8000/api/driver/get";
const PinPoint_API_Parent_URL = "http://localhost:8000/api/parent/get";
const PinPoint_API_Create_Student_BASE_URL = "http://localhost:8000/api/student/create";
const PinPoint_API_Driver_Student_BASE_URL = "http://localhost:8000/api/driver/create";
const PinPoint_API_Create_Parent_BASE_URL = "http://localhost:8000/api/parent/create";
class PinPointService{

    getStudent(){
        return axios.get(PinPoint_API_GetStudent_URL);
    }

    getDrivers(){
        return axios.get(PinPoint_API_GetDriver_URL);
    }

    getDriversbyId(id){
        return axios.get(`http://localhost:8000/api/driver/getById/${id}`);
    }

    getParentbyId(id){
        return axios.get(`http://localhost:8000/api/parent/getById/${id}`);
    }

    getParents(){
        return axios.get(PinPoint_API_Parent_URL);
    }
    
    createStudent(student){
        return axios.post(PinPoint_API_Create_Student_BASE_URL, student);
    }

    createDriver(driver){
        return axios.post(PinPoint_API_Driver_Student_BASE_URL, driver);
    }
    createParent(parent){
        return axios.post(PinPoint_API_Create_Parent_BASE_URL, parent);
    }

}

export default new PinPointService()