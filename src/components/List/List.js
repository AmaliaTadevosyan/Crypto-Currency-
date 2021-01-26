import React, { Component } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../common/Loading/Loading";
import "./Table.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      perPage: 10,
      totalPages: 0,
      loading: false,
      currencies: [],
      error: null,
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  fetchCurrencies() {
    this.setState({
      loading: true,
    });

    const { page } = this.state;
    fetch(`${API_URL}/cryptocurrencies/?page=${page}&perPage=10`)
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;
        this.setState({
          loading: false,
          currencies,
          totalPages,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage,
        });
      });
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState(
      {
        page: nextPage,
      },
      () => {
        this.fetchCurrencies();
      }
    );
  }

  render() {
    const { loading, currencies, error, page, totalPages } = this.state;
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
          <h2>{error}</h2>
        </div>
      );
    }

    return (
      <div>
        <Table currencies={currencies} />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
