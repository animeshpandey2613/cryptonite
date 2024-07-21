"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Chart from "../../component/Detailed/chart";
import LeftPart from "../../component/Detailed/LeftPart";
import styles from "./page.module.css";
import Navbar from "../../component/Navbar/Navbar";
import { useParams } from "next/navigation";
import Performance from "@/app/component/Detailed/performance";
import Footer from "../../component/Footer/Footer";
export interface CoinData {
  name: string;
  id: string;
  description: string;
  image: string;
  current_price: number;
  ath_change_percentage: number;
  atl_change_percentage: number;
  ath: number;
  atl: number;
  ath_date: string; // Updated to string
  atl_date: string; // Updated to string
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
}

const CoinDetailPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  const [data, setData] = useState<CoinData | undefined>(undefined);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-m1GB2M2unyufPdMQppNTvHHH",
      },
    };

    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        const Temp = {
          name: data.name,
          id: data.id,
          description: data.description.en,
          image: data.image.large,
          current_price: data.market_data.current_price.usd,
          ath_change_percentage: data.market_data.ath_change_percentage.usd,
          atl_change_percentage: data.market_data.atl_change_percentage.usd,
          ath: data.market_data.ath.usd,
          atl: data.market_data.atl.usd,
          ath_date: data.market_data.ath_date.usd,
          atl_date: data.market_data.atl_date.usd,
          market_cap: data.market_data.market_cap.usd,
          market_cap_rank: data.market_data.market_cap_rank,
          fully_diluted_valuation: data.market_data.fully_diluted_valuation.usd,
          total_volume: data.market_data.total_volume.usd,
          high_24h: data.market_data.high_24h.usd,
          low_24h: data.market_data.low_24h.usd,
          price_change_percentage_24h:
            data.market_data.price_change_percentage_24h,
          price_change_percentage_7d:
            data.market_data.price_change_percentage_7d,
          price_change_percentage_30d:
            data.market_data.price_change_percentage_30d,
          price_change_percentage_1y:
            data.market_data.price_change_percentage_1y,
        };
        setData(Temp);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

const [windowSize, setWindowSize] = useState({
  width:window.innerWidth,
  height:window.innerHeight,
}
)
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
    <>
      <Navbar />
      {!loading && (
        <>
          <div className={styles.Container}>
            <div className={styles.UpperHalf}>
              <LeftPart data={data} />
              {windowSize.width>600 && (data ? <Chart name={data.id} /> : <div>Loading...</div>)}
              
            </div>
            <div className={styles.LowerHalf}>
              <Performance data={data} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CoinDetailPage;
