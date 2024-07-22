"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import style from "./chart.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Swal from "sweetalert2";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartAreaProps {
  name: string;
}

const ChartArea: React.FC<ChartAreaProps> = ({ name }) => {
  const modeFromStore = useSelector((state: RootState) => state.mode);

  const [series, setSeries] = useState([
    {
      name: `${name} in USD`,
      type: "line",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
  ]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "apex-chart-example",
      foreColor: modeFromStore === "dark" ? "#FFFFFF" : "black",
    },
    tooltip: {
      theme: modeFromStore === "dark" ? "dark" : "light",
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      max: 80000,
      min: 2000,
    },
  });

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
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${name}/ohlc?vs_currency=usd&days=1`,
          options
        );
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Please Reload",
            text: "The free version of api has request limit!",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.href = "/";
            }
          });
        }
        console.log("response got");
        const data = await response.json();
        const mainData = data.map((element: any[]) => element[1]);
        const mainData2 = data.map((element: any[]) => {
          const timestamp = element[0];
          const dateObject = new Date(timestamp);
          const formattedDate = dateObject.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });
          return formattedDate;
        });

        setSeries([
          { ...series[0], data: mainData },
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
  }, [name]);

  useEffect(() => {
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

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      yaxis: {
        ...prevOptions.yaxis,
        max: Math.max(...series[0].data),
        min: Math.min(...series[0].data),
      },
    }));
  }, [series]);

  return (
    <main>
      <div className="ml-20 mr-3">
        <div className={style.head}>Historical Data Analytics -</div>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={Math.min(windowSize.height * 0.7, 550)}
          width={Math.min(windowSize.width * 0.5, 1200)}
        />
      </div>
    </main>
  );
};

export default ChartArea;
