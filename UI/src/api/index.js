export const mainRoute = "http://localhost:8081";

export const postRequest = async ({ currentRoute, headers, body }) => {
  const route = mainRoute + currentRoute;
  const data = await fetch(route, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return {
        error: true,
        message: error.message,
      };
    });
  return data;
};
