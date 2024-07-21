"use client";
import React, { useEffect, useState } from "react";
import Chart from "./component/Home/chart";
import Table from "./component/Home/Table";
import Form from "./component/Home/ResetPassword2/Form";
import style from "./page.module.css";
import Blocks from "./component/Home/Blocks";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log(windowSize, "hello");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return (
    <main>
      <Form />
      <Navbar />
      {!loading && (
        <>
          <div className={style.mainArea}>
            <div className={style.leftArea}>
              <Chart />
              <Table />
            </div>
            {windowSize.width>800 && (<Blocks />)}
            
          </div>
          <Footer />
        </>
      )}
    </main>
  );
};

export default HomePage;
