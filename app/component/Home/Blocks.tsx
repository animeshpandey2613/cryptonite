"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Blocks.module.css";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { setRecentlyUsed } from "@/app/features/CoinSlice";
import { useDispatch } from "react-redux";

interface CoinData {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const Blocks = () => {
  const router = useRouter();
  const [data, setData] = useState<CoinData[]>([]);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20litecoin&price_change_percentage=24h";
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
        const dataa = await res.json();
        // console.log(data7);
        const totalData: CoinData[] = [];
        dataa.map((ele: CoinData) => {
          const temp = {
            id: ele.id,
            name: ele.name,
            image: ele.image,
            current_price: ele.current_price,
            market_cap: ele.market_cap,
            price_change_percentage_24h: ele.price_change_percentage_24h,
          };
          totalData.push(temp);
        });
        setData(totalData);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Please Reload",
          text: "The free version of api has request limit!",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            setTimeout(()=>{
              window.location.href = "/";
            }, 3000);
          }
        });
      }
    };
    manage();
  }, []);

  const HoverHandlerEnter = (index: number) => {
    console.log(index);
    if (cardRef1.current && index === 0) {
      cardRef1.current.style.transform = "translateY(-100%)";
    }
    if (cardRef2.current && index === 1) {
      cardRef2.current.style.transform = "translateY(-100%)";
    }
    if (cardRef3.current && index === 2) {
      cardRef3.current.style.transform = "translateY(-100%)";
    }
  };
  const HoverHandlerLeave = (index: number) => {
    console.log(index);
    if (cardRef1.current && index === 0) {
      cardRef1.current.style.transform = "translateY(0%)";
    }
    if (cardRef2.current && index === 1) {
      cardRef2.current.style.transform = "translateY(0%)";
    }
    if (cardRef3.current && index === 2) {
      cardRef3.current.style.transform = "translateY(0%)";
    }
  };
  return (
    <div className={styles.mainContainer}>
      {data.map((ele, index: number) => {
        return (
          <div
            className={styles.container}
            key={index}
            onMouseEnter={() => {
              HoverHandlerEnter(index);
            }}
            onMouseLeave={() => {
              HoverHandlerLeave(index);
            }}
            onClick={()=>{dispatch(setRecentlyUsed(ele.id)); router.push(`/detailed/${ele.id}`);}}
          >
            <div
              className={
                ele.price_change_percentage_24h > 0
                  ? "text-green-600 flex underline items-center"
                  : "text-red-600 flex underline items-center"
              }
            >
              {ele.price_change_percentage_24h}
               {ele.price_change_percentage_24h > 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
            </div>
            <div className={styles.image}>
              <Image
                src={ele.image}
                alt="crypto Image"
                height={80}
                width={80}
              />
            </div>
            <div className={styles.nameArea}>
              <div className={styles.name}>{ele.name}</div>
              <div className={styles.price}>
                Current Price :{ele.current_price} $
              </div>
            </div>
            <div
              className={styles.overlay}
              ref={index === 0 ? cardRef1 : index === 1 ? cardRef2 : cardRef3}
            >
              <div>
                {index === 0
                  ? "Bitcoin is valuable because it has all the essential properties of paper money: acceptability, divisibility, durability, fungibility (interchangeability), portability, and scarcity."
                  : index === 1
                  ? "Ethereum is designed to be scalable, programmable, secure, and decentralized—to create any secured digital technology. Its token is designed to pay for work done supporting the blockchain, but participants can also use it to pay for tangible goods and services if accepted."
                  : "Litecoin is designed to produce four times as many blocks as Bitcoin (1 new block every 2.5 minutes to Bitcoin's 10), and it also allows for 4x the coin limit, making its main appeal speed and ease of acquisition."}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blocks;
