import axios from "../services/root.service.js";

export async function getData(){
    const res = await axios.get(`/convenios`);
    const data = res.data.data
    console.log('Data from API:', data);
    return data;
}