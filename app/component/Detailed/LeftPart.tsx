// LeftPart.tsx
import React, { useState } from "react";
import styles from "./LeftPart.module.css";
import { CoinData } from "@/app/detailed/[id]/page";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

import { FaArrowUp } from "react-icons/fa";

interface LeftPartProps {
  data: CoinData | undefined;
}

const LeftPart: React.FC<LeftPartProps> = ({ data }) => {
  console.log(data);
  const [text, extendText] = useState(false);

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };
  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.dataArea}>
          <div className={styles.headingArea}>
            <div className={styles.heading}>{data.name}</div>
            <Image
              src={data.image}
              alt="coinImage"
              height={50}
              width={50}
              className={styles.imageAnimation}
            />
          </div>
          <div
            className={
              data.price_change_percentage_24h > 0
                ? "text-green-600 flex items-center text-xl mt-5"
                : "text-red-600 flex items-center text-xl mt-5"
            }
          >
            {data.price_change_percentage_24h}%{" ["}
            {data.price_change_percentage_24h > 0 ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            )}
            {"]"}
          </div>
          <div className="flex gap-5 mt-3">
            <div className={styles.subHead}>Total Volume: </div>
            {data.total_volume}
          </div>
          <div className="flex gap-5 mt-3">
            <div className={styles.subHead}>Fully Diluted Valuation: </div>
            {data.fully_diluted_valuation} $
          </div>
          <div className="flex gap-5 mt-3">
            <div className={styles.subHead}>Market Cap:</div>
            {data.market_cap} $
          </div>
          <div className="flex gap-5 mt-3">
            <div className={styles.subHead}>Market Cap Rank</div>
            {data.market_cap_rank}
          </div>
          <div
            className={styles.description}
            onClick={() => {
              extendText((ele) => !ele);
            }}
          >
            <div className={styles.subHead}>Description: </div>
            {text
              ? truncateText(data.description, 1000)
              : truncateText(data.description, 400)}
          </div>

          <div className="flex gap-5 mt-3">
            <div className={styles.subHead}>Percentage Change:</div>
          </div>
          <table className={styles.tableContainer}>
            <thead className=" text-center">
              <tr>
                <td>24 Hr</td>
                <td>7 Days</td>
                <td>30 Days</td>
                <td>1 year</td>
              </tr>
            </thead>
            <tr className="text-center">
              <td className={
              data.price_change_percentage_24h > 0
                ? "text-green-600"
                : "text-red-600"
            }>
                <div className={styles.arrowAdjust}>
                  {data.price_change_percentage_24h}% {"["}
                  {data.price_change_percentage_24h > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}{"]"}
                </div>
              </td>
              <td className={
              data.price_change_percentage_7d > 0
                ? "text-green-600"
                : "text-red-600"
            }>
                <div className={styles.arrowAdjust}>
                  {data.price_change_percentage_7d}% {"["}
                  {data.price_change_percentage_7d > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}{"]"}
                </div>
              </td>
              <td className={
              data.price_change_percentage_30d > 0
                ? "text-green-600"
                : "text-red-600"
            }>
                <div className={styles.arrowAdjust}>
                  {data.price_change_percentage_30d}% {"["}
                  {data.price_change_percentage_30d > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}{"]"}
                </div>
              </td>
              <td className={
              data.price_change_percentage_1y > 0
                ? "text-green-600"
                : "text-red-600"
            }>
                <div className={styles.arrowAdjust}>
                  {data.price_change_percentage_1y}% {"["}
                  {data.price_change_percentage_1y > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}{"]"}
                </div>
              </td>
            </tr>
          </table>
          <div className={styles.PriceArea}><div className={styles.Label}>Current Price:{" "}</div><div className={styles.value}>{data.current_price} {"(in USD)"}</div></div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default LeftPart;
