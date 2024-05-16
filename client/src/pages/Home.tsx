import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import "../styles/Home.css";
import AddToMultipleWatchlistsButton from "../components/AddToWatchlistButton";

interface Stock {
  exchange: string;
  name: string;
  symbol: string;
  type: string;
  regularMarketOpen: number;
  regularMarketChangePercent: number;
  shortName: string;
}

export const Home: React.FC = () => {
  const [trendingStocks, setTrendingStocks] = useState<Stock[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();
  const [watchlists, setWatchlists] = useState<Array<Array<string>>>([
    [],
    [],
    [],
  ]);

  const handleAddToWatchlist = async (
    stockName: string,
    watchlistIndex: number,
    symbol: string
  ) => {
    // Add your logic to add the stock to the watchlist here
    console.log(`Adding ${stockName} to Watchlist ${watchlistIndex + 1}`);

    const userid = localStorage.getItem("userId");
    const watchlistid = watchlistIndex + 1;
    try {
      const inputs = { stockName, symbol };
      const res = await axios.post(
        `http://127.0.0.1:8000/user/${userid}/watchlist/${watchlistid}/add_stock/`,
        inputs
      );
      const Data = res.data;
      console.log(Data);
    } catch (err) {
      console.log(err);
    }
  };

  const optionsTrending = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/co/collections/most_actives",
    params: { start: "0" },
    headers: {
      "X-RapidAPI-Key": "947b801f92msh96b919932628932p1a1413jsncb9cc7188719",
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
    },
  };

  const optionsAll = {
    method: "GET",
    url: "https://twelve-data1.p.rapidapi.com/stocks",
    params: {
      exchange: "NASDAQ",
      format: "json",
    },
    headers: {
      "X-RapidAPI-Key": "947b801f92msh96b919932628932p1a1413jsncb9cc7188719",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchTrending();
    fetchAllStocks();
  }, []);

  const fetchTrending = async () => {
    try {
      const response = await axios.request(optionsTrending);
      setTrendingStocks(response.data.body);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllStocks = async () => {
    try {
      const response = await axios.request(optionsAll);
      setAllStocks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homePage">
      <div className="trending-stocks-container">
        <h2>Trending stocks</h2>
        <div className="trending-stocks">
          {trendingStocks.length === 0 && <CircularProgress />}
          {trendingStocks.map((stock) => (
            <div
              className="trending-stock"
              key={stock.symbol}
              onClick={() => navigate(`/stock/${stock.symbol}`)}
            >
              <span>
                <h5>Stock name</h5>
                <p>{stock.shortName}</p>
              </span>
              <span>
                <h5>Symbol</h5>
                <p>{stock.symbol}</p>
              </span>
              <span>
                <h5>Price</h5>
                <p
                  style={
                    stock.regularMarketChangePercent > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  $ {stock.regularMarketOpen} (
                  {stock.regularMarketChangePercent.toFixed(2)}%)
                </p>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="all-stocks-container">
        <div className="all-stocks-container-head">
          <h2>Search all stocks</h2>
          <div className="all-stocks-container-search">
            <TextField
              type="text"
              placeholder="Enter Stock Symbol...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch id="searchIcon" />
          </div>
        </div>

        <div className="all-stocks">
          {allStocks.length === 0 && <CircularProgress />}
          {search === "" ? (
            <>
              {allStocks.map((stock) => (
                <div className="all-stocks-stock" key={stock.symbol}>
                  <h6>{stock.exchange}</h6>
                  <span>
                    <h5>Stock name</h5>
                    <p>{stock.name}</p>
                  </span>
                  <span>
                    <h5>Symbol</h5>
                    <p>{stock.symbol}</p>
                  </span>
                  <span>
                    <h5>Stock Type</h5>
                    <p>{stock.type}</p>
                  </span>
                  <AddToMultipleWatchlistsButton
                    onAddToWatchlists={handleAddToWatchlist}
                    stockName={stock.name}
                    symbol={stock.name}
                  >
                    Add to Watchlists
                  </AddToMultipleWatchlistsButton>
                </div>
              ))}
            </>
          ) : (
            <>
              {allStocks
                .filter(
                  (stock) =>
                    stock.symbol.includes(search) || stock.name.includes(search)
                )
                .map((stock) => (
                  <div className="all-stocks-stock" key={stock.symbol}>
                    <h6>{stock.exchange}</h6>
                    <span>
                      <h5>Stock name</h5>
                      <p>{stock.name}</p>
                    </span>
                    <span>
                      <h5>Symbol</h5>
                      <p>{stock.symbol}</p>
                    </span>
                    <span>
                      <h5>Stock Type</h5>
                      <p>{stock.type}</p>
                    </span>
                    <AddToMultipleWatchlistsButton
                      onAddToWatchlists={handleAddToWatchlist}
                      stockName={stock.name}
                      symbol={stock.name}
                    >
                      Add to Watchlists
                    </AddToMultipleWatchlistsButton>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
