import React from "react";
import Axios from "axios";
import "./style.css";

export default class App extends React.Component {
  // set the state
  state = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,

    countries: []
  };
  // Loads the data in the component
  componentDidMount() {
    this.getData();
  }

  // fetch the data from the api and set the state
  async getData() {
    const res = await Axios.get("https://souravcovid19api.herokuapp.com/total");
    const countries = await Axios.get(
      "https://covid19.mathdro.id/api/countries"
    );
    console.log(res);

    this.setState({
      confirmed: res.data.Confirmed,
      recovered: res.data.Cured,
      deaths: res.data.Death,

      countries: countries
    });
  }
  async getCountriesData() {
    const resCountries = await Axios.get(
      "https://covid19.mathdro.id/api/countries"
    );
    const countries = [];
    for (var i = 0; i < resCountries.data.countries.length; i++) {
      countries.push(resCountries.data.countries[i].name);
    }
  }

  //   renderCountryOptions() {
  //     return this.state.countries.map((country, i) => {
  //       return <option key={i}>{country} </option>;
  //     });
  //   }

  render() {
    return (
      <div className="container">
        <h1>Covid-19 Daily Update</h1>

        <div className="box confirmed">
          <h3>Confirmed cases</h3>
          <h4>{this.state.confirmed}</h4>
        </div>

        <div className="box deaths">
          <h3>Death cases</h3>
          <h4>{this.state.deaths}</h4>
        </div>

        <div className="box recovered">
          <h3>Recovered cases</h3>
          <h4>{this.state.recovered}</h4>
        </div>
      </div>
    );
  }
}
