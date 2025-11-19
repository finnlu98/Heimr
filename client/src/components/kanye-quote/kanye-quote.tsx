import { useEffect, useState } from "react"
import FetchKanyeQuote from "../../api/kanye-fetcher"
import "./kanye-quote.css"

const KanyeQoute: React.FC = () => {
    const [quote, setQuote] = useState<string>()

    useEffect(() =>  {
        const setAndFetchQoute = async () => setQuote(await FetchKanyeQuote());

        setAndFetchQoute();
        
    }, [])
    
    return <div className="quote">{quote}</div>
}

export default KanyeQoute;