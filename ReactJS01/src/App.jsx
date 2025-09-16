import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./utils/axios.customize"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";


function App() {
  const { appLoading } = useContext(AuthContext);
  if (appLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;