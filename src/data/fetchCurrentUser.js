export const fetchCurrentUser = async () => {
  try {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getCurrentUser {
              _id
              email
              name
              username
              bio
              imageURL
               links {
                 _id
                siteName
                siteLink
              }
            }
          }
        `,
      }),
    });

    const { data, errors } = await res.json();

    if (errors) {
      console.error("GraphQL getCurrentUser Errors:", errors);
      return null;
    }

    return data.getCurrentUser;
  } catch (err) {
    console.error("Try again Error:", err);
    return null;
  }
};
