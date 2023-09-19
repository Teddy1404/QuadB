import React from "react";
import "./App.css";
import Home from "./components/Home";
function App() {
  // const [cryptoData, setCryptoData] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the backend
  //   fetch("/crypto-data")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCryptoData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from backend:", error);
  //     });
  // }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
