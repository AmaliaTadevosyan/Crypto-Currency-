import React from "react";
import { API_URL } from "../../config";
import { handleResponse, renderChangePercent } from "../../helpers";
import "./Detail.css";
import Loading from "../common/Loading/Loading";

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currency: [],
      error: null,
    };
  }

  fetchCurrency(currencyId) {
    this.setState({ lodaing: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({
          lodaing: false,
          currency,
        });
      })

      .catch((error) => {
        this.setState({
          lodaing: false,
          error: error.errorMessage,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    const currencyId = nextProps.match.params.id;
    this.fetchCurrency(currencyId);
  }

  componentDidMount() {
    const currencyId = this.props.match.params.id;
    this.fetchCurrency(currencyId);
  }

  render() {
    const {
      currency: {
        id,
        marketCap,
        name,
        rank,
        price,
        totalSupply,
        volume24h,
        percentChange24h,
        symbol,
      },
      loading,
      error,
    } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <h3>{error}</h3>
        </div>
      );
    }
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {name} ({symbol})
        </h1>
        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">${price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{rank}</span>
          </div>
          <div className="Detail-item">
            24H Change
            <span className="Detail-value">
              {renderChangePercent(percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market Cap</span>
            <span className="Detail-dollar">$</span>
            {marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total Supply</span>

            {totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
