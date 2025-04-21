// src/routes.js
const routes = {
    home: "/",
    add: "/add",
    edit: (id = ":id") => `/edit/${id}`
  };
  
  export default routes;
  