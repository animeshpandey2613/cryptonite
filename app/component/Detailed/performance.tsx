import React, { useEffect, useState } from "react";
import { CoinData } from "@/app/detailed/[id]/page";
import style from "./performance.module.css";
import { useRef } from "react";

import { FaCaretUp } from "react-icons/fa";
interface PerformanceProps {
  data: CoinData | undefined;
}
const Performance: React.FC<PerformanceProps> = ({ data }) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelRef2 = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  useEffect(() => {
    if (data?.high_24h && data.low_24h) {
      setPercentage(
        ((data.current_price - data.low_24h) / (data.high_24h - data.low_24h)) *
          100
      );
    }

    if (labelRef.current) {
      labelRef.current.style.transform = `translateX(${percentage}%)`;
    }
    if (data?.ath && data.atl) {
      setPercentage2(
        ((data.current_price - data.atl) / (data.ath - data.atl)) * 100
      );
    }

    if (labelRef2.current) {
      labelRef2.current.style.transform = `translateX(${percentage2}%)`;
    }
  }, [data, percentage, percentage2]);
  return (
    <div className={style.container}>
      <div className={style.heading}>Performance:</div>
      <div className={style.barArea}>
        <div className={style.barHead}>24 hour comparision</div>
        <div className={style.barLine}>
          <div className={style.leftLabel}>
            {data?.low_24h} {"(in USD)"}
          </div>
          <div className={style.barArea}>
            <div className={style.bar}></div>
            <div className={style.downLabel} ref={labelRef}>
            <div className={style.arrowUpdate}>
              <FaCaretUp />
            </div>
              <div className="relative right-4">{percentage.toFixed(2)}%</div>
            </div>
          </div>
          <div className={style.rightLabel}>
            {data?.high_24h}
            {"(in USD)"}
          </div>
        </div>
      </div>
      <div className={style.barArea}>
        <div className={style.barHead}>All Time High comparision</div>
        <div className={style.barLine}>
          <div className={style.leftLabel}>
            {data?.atl} {"(in USD)"}
          </div>
          <div className={style.barArea}>
            <div className={style.bar}></div>
            <div className={style.downLabel} ref={labelRef2}>
              <div className={style.arrowUpdate}>

                <FaCaretUp />
              </div>
                <div className=" relative right-4">
                  {percentage2.toFixed(2)}%
                </div>
            </div>
          </div>
          <div className={style.rightLabel}>
            {data?.ath}
            {"(in USD)"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
