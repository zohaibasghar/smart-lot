import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/BrowserRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { apiInstance } from "./api/api";

function App() {
  useEffect(() => {
    apiInstance
      .post("/auth/login", { email: "admin@smart.com", password: "12345678" })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
