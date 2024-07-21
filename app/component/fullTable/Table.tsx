"use client";
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

interface CoinData {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_30d_in_currency: number;
  ath:number,
  atl:number,
}
const Table = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [pgno, setPgno] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=${pgno}&per_page=15&price_change_percentage=30d`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-m1GB2M2unyufPdMQppNTvHHH",
      },
    };

    const manage = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    manage();
  }, [pgno]);

  const clickHandler = (id: string) => {
    router.push(`/detailed/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headPart}>
        <div className={styles.heading}>All Coins</div>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <td>Token</td>
            <td>Symbol</td>
            <td>Current Price {"(in USD)"}</td>
            <td>24Hr Change</td>
            <td>30 Days Change</td> <td>Market Cap</td><td>All time high</td><td>All time low</td>
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
              </td>{" "}
              <td
                className={
                  ele.price_change_percentage_30d_in_currency > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                <div className={styles.symbolManage}>
                  {ele.price_change_percentage_30d_in_currency.toFixed(5)}
                  {ele.price_change_percentage_30d_in_currency > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </div>
              </td>
              <td>{ele.market_cap} $</td>
              <td>{ele.ath} $</td>
              <td>{ele.atl} $</td>
            </tr>
          );
        })}
      </table>
      <div className={styles.pgnoContainer}>
        <div className={styles.pgnoSubContainer}>
          {pgno > 1 && (
            <div
              onClick={() => setPgno(pgno - 1)}
              className="text-5xl cursor-pointer"
            >
              <CiCircleChevLeft />
            </div>
          )}
          <div className={styles.numberArea}>
            {pgno > 1 && (
              <div
                className={styles.currentNumber}
                onClick={() => setPgno(pgno - 1)}
              >
                {pgno - 1}
              </div>
            )}
            <div className={styles.currentNumber}>{pgno}</div>
            {pgno < 150 && (
              <div
                className={styles.currentNumber}
                onClick={() => setPgno(pgno + 1)}
              >
                {pgno + 1}
              </div>
            )}
            {pgno < 149 && (
              <div
                className={styles.currentNumber}
                onClick={() => setPgno(pgno + 1)}
              >
                {pgno + 2}
              </div>
            )}
            {pgno !== 150 && (
              <>
                <div>{". . . . . ."}</div>
                <div
                  className={styles.currentNumber}
                  onClick={() => setPgno(150)}
                >
                  150
                </div>
              </>
            )}
          </div>
          {pgno < 150 && (
            <div
              onClick={() => setPgno(pgno + 1)}
              className=" text-5xl cursor-pointer"
            >
              <CiCircleChevRight />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;