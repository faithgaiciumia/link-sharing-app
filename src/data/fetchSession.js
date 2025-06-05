export const fetchSession = async()=>{
    const res = await fetch("https://wanlinq-back.onrender.com/auth/session", {
        credentials:"include"
    });
    if(!res.ok) return null;
    const data = await res.json();
    return data;
}