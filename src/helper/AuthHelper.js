import { API } from "../backend";

// export const login = (user) => {
//   return fetch(`${API}/login`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (!data.error) {
//         localStorage.setItem("loggedIn", JSON.stringify(data));
//         M.toast({
//           html: "Login Successful",
//           classes: "#43a047 green darken-1",
//         });
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 250);
//       } else {
//         M.toast({
//           html: data.error,
//           classes: "#c62828 red darken-2",
//         });
//       }
//     })
//     .catch((error) => console.log(error));
// };

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("loggedIn")) {
    return JSON.parse(localStorage.getItem("loggedIn"));
  } else {
    return false;
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedIn");
    next();

    return fetch(`${API}/logout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Successs"))

      .catch((error) => console.log(error));
  }
};
