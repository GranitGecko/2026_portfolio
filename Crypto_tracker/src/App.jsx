import { useState, useEffect } from 'react'
import axios from "axios";

function App() {

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false")
      
      .then((res) => {
        setCoins(res.data);
      })

      .catch((error) => alert("Error with fetching the data, " + error));
  }, []);

  return (
    <>
      <div className="App">
        <h1 className="page_title">Crypto tracker</h1>

        <div className="coin_data_container">
          <div className="coin_data">

            {coins.length == 0 && <p>No coins found</p>}

            {coins.map((coin) => (
              <div id={coin.id} key={coin.id}>
                <img src={coin.image} alt={coin.id} style={{ height: "100px" }} />
                <h3>{coin.name}</h3>
                <p>${coin.current_price}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default App