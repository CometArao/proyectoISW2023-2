export async function getData(){
    const res = await fetch('http://localhost:5000/api/convenios');
    const data = await res.json();
    console.log('Data from API:', data);
    return data.data;
}