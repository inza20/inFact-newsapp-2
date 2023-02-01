import { render } from "@testing-library/react";
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country : 'in',
    pageSize : 6,
    category : 'general'
  }

  static propTypes={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
  // articles = [
  //   {
  //     source: {
  //       id: "bbc-sport",
  //       name: "BBC Sport",
  //     },
  //     author: null,
  //     title: "English cricket loses key sponsorship deals",
  //     description:
  //       "Car retailer Cazoo and insurance firm LV= both opt against renewing sponsorship deals with English cricket.",
  //     url: "http://www.bbc.co.uk/sport/cricket/64345417",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/DBE7/production/_128359265_trentrocketsmencelebrate.jpg",
  //     publishedAt: "2023-01-20T11:07:22.8240301Z",
  //     content:
  //       "Cazoo sponsored the first two years of The Hundred\r\nCar retailer Cazoo and insurance firm LV= have both opted against renewing sponsorship deals with English cricket.\r\nCazoo was the title sponsor of … [+1868 chars]",
  //   }
  // ];

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    document.title=`${this.capitalizeFirstLetter(this.props.category)}`;
    // console.log("Constructor from Newsitem");
    this.state = {
      articles: [],
      // loading: false, // for prev & next buttons
      loading : true, // for infinite scroll
      page: 1,
      totalResults: 0
    }
  }

  

  async updateNews(){
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({loading: true});
    {this.props.setProgress(10)}
    let data = await fetch(url);
    {this.props.setProgress(50)}
    let parsedData = await data.json();
    {this.props.setProgress(100)}
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    // console.log("cdm");
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    // });
    this.updateNews();
  }

  fetchMoreData = async() => {    
    
    this.setState({page : this.state.page=1});
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
 
};

  prevClickHandler = async () => {
    // console.log("prev");

  //   if(!this.state.page > Math.ceil(this.state.pageSize)){
  //     // then do nothing
  //   } else {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

  //   this.setState({loading: true})

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({ page: this.state.page - 1, 
  //     articles: parsedData.articles,
  //     loading : false });
  // }
    this.setState({page: this.state.page -1})
    this.updateNews();
  };

  nextClickHandler = async () => {    
    this.setState({page: this.state.page +1})
    this.updateNews();
  };

  render() {
    return (
      <>
      {/* <div className="container my-3" style={{ positon: "center" }}> */}
        <h2 style={{ textAlign: "center", margin: "20px 0px 40px 0px" }}>
          {" "}
          InFact - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h2>

        {this.state.loading && <Spinner/>}        
        {/* <Spinner/> */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

          <div className="row ">
            {/* with prev & next buttons , use-> {!this.state.loading && this.state.articles?.map((element) => */}
            {/* for infinite scroll -> remove loading condition :  */}
            { this.state.articles?.map((element) => {
              return (
                <div  className="col-md-4" key={element.url} style={{ margin: "1rem 0rem" }}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 100) : ""}
                    imageUrl={ element.urlToImage ? element.urlToImage : "https://i.ytimg.com/vi/pvj2RpLpaWI/maxresdefault.jpg" }
                    newsUrl={element.url? element.url : "https://nypost.com/2023/01/25/bristol-palin-reveals-9th-breast-reconstruction-very-self-conscious/"} author={element.author?element.author:"unknown author"} date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>

        </div>
        </InfiniteScroll>

        {/* <div className="row">
          <div className="d-flex justify-content-between">
            <button
              type="button" className="btn btn-success" onClick={this.prevClickHandler} href="/" disabled={this.state.page <= 1} > {" "} &larr; Prev 
            </button>
            <button
              type="button" className="btn btn-success" onClick={this.nextClickHandler} href="/" 
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}> Next &rarr;
            </button>
          </div>
          
        </div> */}
      {/* </div> */}
      </>
    );
  }
}

// News.defaultProps = {
//   pageSize: 15,
//   country: "us",
//   category: "science"
// };

// News.propTypes = {
//   pageSize: PropTypes.number,
//   country : PropTypes.string

// };

export default News;
