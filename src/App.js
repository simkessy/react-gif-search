import React, { Component } from "react";
import "./App.scss";
import SearchBox from "./Components/SearchBox";
import Header from "./Components/Header";
import Results from "./Components/Results";
import debounce from "lodash/debounce";

export default class App extends Component {
  state = {
    search: "puppies",
    results: []
  };

  textInput = React.createRef();

  async search(text) {
    const giphy = {
      baseURL: "https://api.giphy.com/v1/gifs/search",
      apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
      tag: text
    };

    let giphyURL = encodeURI(
      giphy.baseURL + "?api_key=" + giphy.apiKey + "&q=" + giphy.tag
    );

    let data = await fetch(giphyURL);
    return data.json();
  }

  async componentDidMount() {
    // get default search
    this.onSearch(this.state.text);
    this.textInput.current && this.textInput.current.focus();
  }

  /*   componentDidUpdate(prevProps, prevState) {
    console.log(this.state.search, prevState.search);
    if (this.state.search !== prevProps.search) this.onSearch(this.state.text);
  }
 */
  delayedSearch = debounce(this.onSearch, 500);

  setSearch = e => {
    this.setState({ search: e.target.value });

    this.delayedSearch(this.state.search);
  };

  async onSearch(text) {
    try {
      let response = await this.search(this.state.search);

      let data = response.data.reduce((t, { title, id, images }) => {
        t.push({ title, id, url: images.downsized_medium.url });
        return t;
      }, []);
      this.setState({ results: data });
    } catch (e) {
      console.error("Failed Fetch", e.toString());
    }
  }

  render() {
    return (
      <main className="app">
        <Header>Header</Header>
        <nav className="navbar">
          <SearchBox
            onSearch={this.setSearch}
            value={this.state.search}
            inputRef={this.textInput}
          />
        </nav>
        <aside className="sidebar">Sidebar Bar</aside>
        <section className="results">
          <Results results={this.state.results} />
        </section>
        <footer className="footer">
          <p className="footer-text">Copyright @funssies 2019</p>
        </footer>
      </main>
    );
  }
}
