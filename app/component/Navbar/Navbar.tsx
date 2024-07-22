"use client";
import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../Images/pngwing.com.png";
import logo2 from "../../Images/temp3.png";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/app/features/CoinSlice";
import { MdOutlineHistory } from "react-icons/md";
import { useRouter } from "next/navigation";
import { setRecentlyUsed } from "@/app/features/CoinSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const recentlyViewed = useSelector((state: any) => state.recentlyViewed);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      dispatch(setMode(window.localStorage.getItem("mode")));
      return window.localStorage.getItem("mode") === "dark";
    }
    return true;
  });
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mode", darkMode ? "dark" : "light");
    dispatch(setMode(darkMode ? "dark" : "light"));
    if (darkMode) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }, [darkMode, dispatch]);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };
  const Router = useRouter();
  const SearchHandler= async()=>{
const url = `https://api.coingecko.com/api/v3/search?query=${searchInput}`;
const options = {method: 'GET', headers: {accept: 'application/json'}};
const res = await fetch(url, options)
const data2 = await res.json();
console.log(data2.coins[0]);
dispatch(setRecentlyUsed(data2.coins[0].id));
Router.push(`detailed/${data2.coins[0].id}`);
  }
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
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <button className={style.button} onClick={SearchHandler}>
                <CiSearch />
              </button>
              {showSuggestions && (
                <div className={style.suggestions}>
                  {recentlyViewed.map((item: string, index: number) => (
                    <div key={index} className={style.suggestionItem} onClick={()=>{Router.push(`/detailed/${item}`)}}>
                      <MdOutlineHistory />
                      {item}
                    </div>
                  ))}
                </div>
              )}
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
