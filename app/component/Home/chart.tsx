"use client";
import React from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const ChartArea = () => {
  const modeFromStore = useSelector((state: RootState) => state.mode);
  const [series, setSeries] = useState([
    {
      name: "Bitcoin in USD",
      type: "line",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      name: "Ethereum in Mexican Peso",
      type: "line",
      data: [3, 2.2, 2.4, 1.8, 2.4, 2, 3.6, 4.6],
    },
    {
      name: "Litecoin in Chilean Peso",
      type: "line",
      data: [3.1, 2, 2.6, 2.2, 1.8, 3, 3.1, 1],
    },
  ]);
  useEffect(() => {
    const manage = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-m1GB2M2unyufPdMQppNTvHHH",
        },
      };
      try {
        console.log("req sent");
        const responseBitcoin = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1",
          options
        );
        const responseEthereum = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=1",
          options
        );
        const responseLitecoin = await fetch(
          "https://api.coingecko.com/api/v3/coins/litecoin/ohlc?vs_currency=usd&days=1",
          options
        );
        if (
          !responseBitcoin.ok &&
          !responseEthereum.ok &&
          !responseLitecoin.ok
        ) {
          throw new Error(`HTTP error! Status: ${responseBitcoin.status}`);
        }
        console.log("response got");
        const dataBitcoin = await responseBitcoin.json();
        const dataEthereum = await responseEthereum.json();
        const dataLitecoin = await responseLitecoin.json();
        let Min = 0;
        let Max = 100000;
        const mainDataBitcoin = dataBitcoin.map((element: any[]) => element[1]);
        const mainDataEthereum = dataEthereum.map(
          (element: any[]) => element[1] * 18.85
        );
        const mainDataLitecoin = dataLitecoin.map(
          (element: any[]) => element[1] * 890
        );
        const mainData2 = dataBitcoin.map((element: any[]) => {
          const timestamp = element[0];
          const dateObject = new Date(timestamp);
          const formattedDate = dateObject.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });
          return formattedDate;
        });

        setSeries([
          { ...series[0], data: mainDataBitcoin },
          { ...series[1], data: mainDataEthereum },
          { ...series[2], data: mainDataLitecoin },
        ]);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: mainData2,
          },
        }));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    manage();
  }, []);

  useEffect(() => {
    // This effect will run when `mode` changes
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        foreColor: modeFromStore === "dark" ? "#FFFFFF" : "black",
      },
      tooltip: {
        ...prevOptions.tooltip,
        theme: modeFromStore === "dark" ? "dark" : "light",
      },
    }));
  }, [modeFromStore]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "apex-chart-example",
      foreColor: modeFromStore === "dark" ? "#FFFFFF" : "black",
    },
    tooltip: {
      theme: modeFromStore === "dark" ? "dark" : "light", // This will ensure the text is white on a dark background
    },
    xaxis: {
      categories: [
        2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2018, 2020, 2025,
      ],
    },
    yaxis: {
      max: 80000,
      min: 2000,
    },
  });
  useEffect(() => {
    // This effect will run when `series` changes
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      yaxis: {
        ...prevOptions.yaxis,
        max: Math.max(...series[0].data, ...series[1].data, ...series[2].data),
        min: Math.min(...series[0].data, ...series[1].data, ...series[2].data),
      },
    }));
  }, [series]);
  return (
    <main>
      <div>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={550}
          width={1200}
        />
      </div>
    </main>
  );
};

export default ChartArea;
