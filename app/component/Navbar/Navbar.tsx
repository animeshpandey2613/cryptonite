"use client";
import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../Images/pngwing.com.png";
import logo2 from "../../Images/temp3.png";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setMode } from "@/app/features/CoinSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setLoading(false);
    }, 6000)
  })
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      dispatch(setMode(window.localStorage.getItem("mode")));
      return window.localStorage.getItem("mode") === "dark";
    }
    return true;
  });
  useEffect(() => {
    window.localStorage.setItem("mode", darkMode ? "dark" : "light");
    dispatch(setMode(darkMode ? "dark" : "light"));
    if (darkMode) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }, [darkMode, dispatch]);
  return (
    <>
      {loading ? (
        <>
          <div className={style.container}>
            <div className={style.container2}>
              <div className={style.logoArea}>
                <Image
                  src={darkMode ? logo : logo2}
                  alt="logo image"
                  height={50}
                  width={50}
                  className={style.imageAni}
                ></Image>
              </div>
              <div className={style.name2}>
                <div className={style.overlay}>ryptonite</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={style.container}>
          <div className={style.container2}>
            <div className={style.logoArea}>
              <Image
                src={darkMode ? logo : logo2}
                alt="logo image"
                height={50}
                width={50}
              ></Image>
            </div>
            <div className={style.name}>ryptonite</div>
            <div className={style.searchBar}>
              <input type="text" placeholder="Search" />
              <button className={style.button}>
                <CiSearch />
              </button>
            </div>
            <div
              className={style.DarkModeSwitch}
              onClick={() => setDarkMode((ele) => !ele)}
            >
              {darkMode ? <MdDarkMode /> : <MdLightMode />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
