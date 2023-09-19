import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaRupeeSign, FaPercent } from "react-icons/fa";
import logo from "../images/HODLINFO.8f78fc06.png";
import { BiLogoTelegram } from "react-icons/bi";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:8080/crypto-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) =>
        console.error("Error fetching data from backend:", error)
      );
  }, []);

  return (
    <div className="container-fluid">
      <div className="home">
        {/* Header */}
        <div className="row p-4 d-flex">
          {/* Logo */}
          <div className="col-md-4">
            <div className="b1">
              <img src={logo} alt="" className="img-fluid" />
            </div>
          </div>
          {/* Currency Info */}
          <div className="col-md-4">
            <div className="row d-flex">
              <div className="col-md-4 b2">
                <p>INR</p>
              </div>
              <div className="col-md-4 b2">
                <p>BTC</p>
              </div>
              <div className="col-md-4 b2">
                <p>BUY BTC</p>
              </div>
            </div>
          </div>
          {/* Telegram Button */}
          <div className="col-md-4">
            <h1 className="b3">
              <button className="btn">
                <BiLogoTelegram style={{ marginRight: "5px" }} />
                Connect Telegram
              </button>
            </h1>
          </div>
        </div>

        {/* Price Info */}
        <div className="row r2 text-center">
          <h1>Best Price To Trade</h1>
        </div>
        <div className="row">
          <div className="col-md-2 a1">
            <h2>0.9 %</h2>
            <h6>5 Mins</h6>
          </div>
          <div className="col-md-2 a1">
            <h2>1.19 %</h2>
            <h6>1 Hour</h6>
          </div>
          <div className="col-md-4 a2">
            <span>₹ 24,43,749</span>
            <h6>Average BTC/INR net price including commission</h6>
          </div>
          <div className="col-md-2 a1">
            <h2>4.68 %</h2>
            <h6>1 Day</h6>
          </div>
          <div className="col-md-2 a1">
            <h2>8.68 %</h2>
            <h6>7 Day</h6>
          </div>
        </div>

        {/* Cryptocurrency Data Table */}
        <div className="row heading">
          <div className="col-md-2">#</div>
          <div className="col-md-2">Platform</div>
          <div className="col-md-2">Last Traded Price</div>
          <div className="col-md-2">Buy / Sell Price</div>
          <div className="col-md-2">Difference</div>
          <div className="col-md-2">Savings</div>
        </div>
        {data.map((i, index) => {
          const sno = index + 1;

          return (
            <div className="row heading2" key={index}>
              <div className="col-md-2 h-2">{sno}</div>
              <div className="col-md-2 h-2">{i.name}</div>
              <div className="col-md-2 h-2">{i.last}</div>
              <div className="col-md-2 sell h-2">
                <FaRupeeSign style={{ marginLeft: "5px" }} />
                {i.buy} / {i.sell}
              </div>
              <div className="col-md-2 h-2">
                {i.volume}
                <FaPercent style={{ marginLeft: "5px" }} />
              </div>
              <div className="col-md-2 h-2">
                <FaRupeeSign style={{ marginLeft: "5px" }} />
                {i.at}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
