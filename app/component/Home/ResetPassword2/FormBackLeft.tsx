import React, { useEffect, useState } from "react";
import "./FormBackLeft.css";
function FormBack() {
  const [String, setString] = useState("");
  useEffect(() => {
    const Interval = setInterval(() => {
      setString((ele) => {
        let num = Math.floor(Math.random() * 3);
        if (num !== 0 && num !== 1) return " " + ele;
        else return num + ele;
      });
    }, Math.random() * 50 + 50);
    return () => clearInterval(Interval);
  }, []);
  return (
    <div className="LeftContainer">
      <div className="LeftContainer2">{String}</div>
    </div>
  );
}

export default FormBack;
