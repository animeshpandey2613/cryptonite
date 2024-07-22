"use client";
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Image from "next/image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDispatch, UseDispatch } from "react-redux";
import { setRecentlyUsed } from "@/app/features/CoinSlice";

interface CoinData {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const Table = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const url7 =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&price_change_percentage=7d";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-m1GB2M2unyufPdMQppNTvHHH",
      },
    };

    const manage = async () => {
      try {
        const res7 = await fetch(url7, options);
        const data7 = await res7.json();
        setData(data7);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Please Reload",
          text: "The free version of api has request limit!",
        });
      }
    };
    manage();
  }, []);

  const clickHandler = (id: string) => {
    dispatch(setRecentlyUsed(id));
    router.push(`/detailed/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headPart}>
        <div className={styles.heading}>Trending Market</div>
        <div
          className={styles.viewMoreButton}
          onClick={() => router.push("fulltable")}
        >
          View More
        </div>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <td>Token</td>
            <td>Symbol</td>
            <td>Last Price {"(in USD)"}</td>
            <td className={styles.hideOnMobile}>24Hr Change</td>
            <td className={styles.hideOnMobile}>Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr
              key={index}
              className={styles.tableDataArea}
              onClick={() => clickHandler(ele.id)}
            >
              <td>{ele.name}</td>
              <td>
                <div className={styles.symbolManage}>
                  <Image src={ele.image} alt="coin image" width={30} height={30} />
                </div>
              </td>
              <td>{ele.current_price}$</td>
              <td
                className={`${styles.hideOnMobile} ${
                  ele.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <div className={styles.symbolManage}>
                  {ele.price_change_percentage_24h}
                  {ele.price_change_percentage_24h > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </div>
              </td>
              <td className={styles.hideOnMobile}>{ele.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
