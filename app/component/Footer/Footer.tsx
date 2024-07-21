"use client";
import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import { BiLogoTwitter, BiLogoFacebook } from "react-icons/bi";
const Footer = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
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
  return (
    <div className={style.FooterContainer}>
      <div className={style.Footercol1}>
        <div className={style.Footerheader}>Cryptonite</div>
        <div className={style.FootersmallMenu}>
          <div className={style.Footermenu}>About Us</div>
          <div className={style.Footermenu}>Careers</div>
        </div>
        <div className={style.FooterRightsArea}>
          <div className={style.Footerrights}>
            {" "}
            ⓒ 2024 AnimeshPandeyCompany. All Rights Reserved.
          </div>
          <div className={style.FooterDocuments}>
            <div className={style.Footerparts}>Terms Of Use</div>
            <div className={style.Footerparts}>Privacy Policy</div>
            <div className={style.Footerparts}>FAQ</div>
          </div>
        </div>
      </div>
      {windowSize.width > 800 && (
        <>
          <div className={style.Footercol2}>
            <div className={style.Footerheader}>View Website in</div>
            <div className={style.FootersmallMenu}>English</div>
          </div>
          <div className={style.Footercol3}>
            <div className={style.Footerheader}>Need Help?</div>
            <div className={style.FootersmallMenu}>
              <div className={style.Footermenu}>Visit Help Center</div>
              <div className={style.Footermenu}>Share Feedback</div>
            </div>
          </div>
          <div className={style.Footercol4}>
            <div className={style.Footerheader}>Connect with Us</div>
            <div className={style.FootersocialIcons}>
              <div className={style.Footerfb}>
                <BiLogoTwitter />
              </div>
              <div className={style.Footertw}>
                <BiLogoFacebook />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
