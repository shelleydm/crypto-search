import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((res) => {
                setCoins(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="coin-app">
            <h1 className="coin-app-title">
                Crypto search<span className="blinker"></span>
            </h1>
            <div className="coin-search">
                <form>
                    <input
                        type="text"
                        placeholder="Search"
                        className="coin-input"
                        onChange={handleChange}
                    />
                </form>
            </div>

            <div className="coin-container">
                <div className="coin-row">
                    <div className="coin">
                        <h1>Coin</h1>
                    </div>
                    <div className="coin-data">
                        <p className="coin-price bold">Price ($Aud)</p>
                        <p className="coin-volume bold">Volume</p>

                        <p className="coin-percent bold">Price change</p>

                        <p className="coin-marketcap bold">Market cap</p>
                    </div>
                </div>
            </div>

            {filteredCoins.map((coin) => {
                return (
                    <Coin
                        key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.total_volume}
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        marketCap={coin.market_cap}
                    />
                );
            })}
        </div>
    );
}

export default App;
