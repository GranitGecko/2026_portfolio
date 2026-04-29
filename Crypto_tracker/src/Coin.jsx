const Coin = ({
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketCap,
}) => {
  return (
    <div>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <img src={image} alt="crypto" />
            <p className="coin-symbol">{symbol}</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">${price}</p>
            <p className="coin-percent">{priceChange}%</p>
            <p className="coin-volume">${volume.toLocaleString()}</p>
            <p className="coin-marketcap">${marketCap.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;