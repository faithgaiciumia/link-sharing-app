export const fetchCsrfToken = async () => {
  const res = await fetch("https://wanlinq-back.onrender.com/auth/csrf", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
};
