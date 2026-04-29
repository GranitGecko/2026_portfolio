import { useState, useEffect } from 'react'
import axios from "axios";
import Coin from "./Coin.jsx";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(function () {
    let savedCoins = localStorage.getItem("coins");

    if (savedCoins) {
      setCoins(JSON.parse(savedCoins));
      return;
    }

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then(function (server_response) {
        setCoins(server_response.data);
        localStorage.setItem("coins", JSON.stringify(server_response.data));
      })
      .catch(function (error) {
        alert("Error fetching data: " + error);
      });
  }, []);

  return (
    <>
      <div className="App">

        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search Crypto" className="coin-input" onChange={handleChange}></input>
          </form>
        </div>

        <div className="center table-headings">
          <div className="coin">
            <p className="coin-symbol">Name</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">Price</p>
            <p className="coin-percent">24h Change</p>
            <p className="coin-volume">24h Volume</p>
            <p className="coin-marketcap">Market Cap</p>
          </div>
        </div>

        <div className="coin-data-display">

          {filteredCoins.length === 0 && (
            <div className="no-search-result">
              <h3>No Results Found</h3>
              <p>
                Check your spelling. This tracker only shows the top 200 cryptocurrencies.
              </p>
            </div>
          )}

          {filteredCoins.length > 0 &&
            filteredCoins.map(function (coin) {
              return (
                <Coin
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  volume={coin.total_volume}
                  priceChange={coin.price_change_percentage_24h}
                  marketCap={coin.market_cap}
                />
              );
            })}

        </div>
      </div>
    </>
  )
}

export default App