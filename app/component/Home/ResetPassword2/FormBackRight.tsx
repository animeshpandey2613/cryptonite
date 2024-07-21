import React, { useEffect, useState } from "react";
import "./FormBackRight.css";
function FormBack() {
  const [String, setString] = useState("");
  useEffect(() => {
    const Interval = setInterval(() => {
      setString((ele) => {
        return ele+Math.floor(Math.random() * 2);
      });
    }, (Math.random()*50+50));
    return () => clearInterval(Interval);
  }, []);
  return (
    <div className="RightContainer">
      <div className="RightContainer2">{String}</div>
    </div>
  );
}

export default FormBack;
