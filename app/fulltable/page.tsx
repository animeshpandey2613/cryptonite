"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import Table from "../component/fullTable/Table";
import Navbar from "../component/Navbar/Navbar";
import Blocks from "../component/Home/Blocks";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        console.log(windowSize, "hello");
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
