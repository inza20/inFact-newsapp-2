// import { render } from "@testing-library/react";
import React, {  useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) { 

  
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

  const [articles, setArticles] = useState([ ])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title=capitalizeFirstLetter(props.category);  

  const updateNews = async()=> {
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    props.setProgress(10);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(75);
    // console.log(parsedData);
    
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => { 
      updateNews();
  }, [])
  

  const fetchMoreData = async() => {    
    
    setPage(page=1);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
};

  const prevClickHandler = async () => {
    
    setPage(page -1);
    updateNews();
  };

  const nextClickHandler = async () => {    
    setPage(page +1);
    updateNews();
  };

  
    return (
      <>
      {/* <div className="container my-3" style={{ positon: "center" }}> */}
        <h2 style={{ textAlign: "center", margin: "20px 0px 40px 0px" }}>
          {" "}
          InFact - Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>

        {loading && <Spinner/>}        
        {/* <Spinner/> */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

          <div className="row ">
            {/* with prev & next buttons , use-> {!loading && articles?.map((element) => */}
            {/* for infinite scroll -> remove loading condition :  */}
            { articles?.map((element) => {
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
              type="button" className="btn btn-success" onClick={prevClickHandler} href="/" disabled={page <= 1} > {" "} &larr; Prev 
            </button>
            <button
              type="button" className="btn btn-success" onClick={nextClickHandler} href="/" 
              disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}> Next &rarr;
            </button>
          </div>
          
        </div> */}
      {/* </div> */}
      </>
    );
  }


News.defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'
};

News.propTypes = {
   country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string

};

// export default News;
