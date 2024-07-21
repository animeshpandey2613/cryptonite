"use client";
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
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
        // console.log(data7);
        setData(data7);
      } catch (err) {
        console.log(err);
      }
    };
    manage();
  }, []);

  const clickHandler = (id: string) => {
    router.push(`/detailed/${id}`);
  };


  return (
    <div className={styles.container}>
      <div className={styles.headPart}>
        <div className={styles.heading}>Trending Market</div>
        <div className={styles.viewMoreButton} onClick={()=>(router.push("fulltable"))}>View More</div>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <td>Token</td>
            <td>Symbol</td>
            <td>Last Price {"(in USD)"}</td>
            <td>24Hr Change</td> <td>Market Cap</td>
          </tr>
        </thead>
        {data.map((ele, index) => {
          return (
            <tr
              key={index}
              className={styles.tableDataArea}
              onClick={() => {
                clickHandler(ele.id);
              }}
            >
              <td>{ele.name}</td>
              <td>
                <div className={styles.symbolManage}>
                  <Image
                    src={ele.image}
                    alt="coin image"
                    width={30}
                    height={30}
                  />
                </div>
              </td>
              <td>{ele.current_price}$</td>
              <td
                className={
                  ele.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
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
              <td>{ele.market_cap}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
