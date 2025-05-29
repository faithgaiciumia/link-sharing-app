export const fetchCsrfToken = async () => {
  const res = await fetch("http://localhost:4000/auth/csrf", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
};
