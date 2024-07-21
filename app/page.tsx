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

  return (
    <main>
      <div className={style.hider}>
        <Form />
      </div>
      <Navbar />
      {!loading && (
        <>
          <div className={style.mainArea}>
            <div className={style.leftArea}>
              <Chart />
              <Table />
            </div>
            <div className={style.hider}>
              <Blocks />
            </div>
          </div>
          <Footer />
        </>
      )}
    </main>
  );
};

export default HomePage;
