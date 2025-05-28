export const fetchSession = async()=>{
    const res = await fetch("http://localhost:4000/auth/session", {
        credentials:"include"
    });
    if(!res.ok) return null;
    const data = await res.json();
    return data;
}