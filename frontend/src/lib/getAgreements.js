export async function getData(){
    const res = await fetch('http://localhost:1611/api/convenios');
    const data = await res.json();
    // console.log('Data from API:', data);
    return data.data;
}