import { fetchCsrfToken } from "./fetchCsrfToken";

export const logoutUser = async () => {
  const csrfToken = await fetchCsrfToken();

  const res = await fetch("https://wanlinq-back.onrender.com/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: new URLSearchParams({ csrfToken }),
  });

  return res.ok;
};
