"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import Table from "../component/fullTable/Table";
import Navbar from "../component/Navbar/Navbar";
import Blocks from "../component/Home/Blocks";
const Page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
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
    <div>
      <Navbar />
      {!loading && (
        <div className={style.Container}>
          <Table />
          {windowSize.width > 800 && <Blocks />}
        </div>
      )}
    </div>
  );
};

export default Page;
