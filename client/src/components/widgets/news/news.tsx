import { useEffect, useState } from "react"
import NewsFetcher from "./api/news-fetcher"
import { NewsResponse } from "./model/NewsResponse"
import "./news.css"

const News: React.FC = () => {
    
    const [news, setNews] = useState<NewsResponse>()

    useEffect(() => {
        const fetchAndSetNews = async () => setNews(await NewsFetcher());
        
        fetchAndSetNews()
    }, [])

    useEffect(() => {
          const updateInterval = setInterval(() => {
            updateNewsData();
          }, 10 * 60 * 1000);
      
          return () => clearInterval(updateInterval);
        }, []);

    async function updateNewsData() {
        try {
            const updatedNewsData = await NewsFetcher();
            setNews(updatedNewsData);
        } catch (error) {
             console.error("Can't update data:", error);
        }
    }
    
    return (
        <div className="news-container">
            <div className="widget-title">
                <div>Current news 📰</div>
            </div>
            <div>
                {news && news.rss.channel.item.slice(0, 2).map((newsItem) => {
                    return (
                        <div key={newsItem.title} className="standard-rows news-item">
                            <div className="news-text">{newsItem.title}</div>
                                <div className="news-img-container">
                                    <img
                                        className="news-img"
                                        src={newsItem?.media_content?.url ? `${newsItem.media_content.url}` : "./img/news/newspaper.png" }
                                        alt="news-image"
                                        />
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default News