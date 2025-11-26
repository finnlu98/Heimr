import React from "react"
import LaundryWeek from "../laundry-week/laundry-week"
import Stocks from "../stocks/stocks"
import News from "../news/news"
import Dailyweather from "../weather/daily-weather"
import HomeActionButtons from "../home/components/home-action-buttons"
import ElectricyConsumption from "../electricity/components/electricity-consumption/electricity-consumption"
import CityBike from "../city-bike/city-bike"
import Calender from "../calender/calender"
import TravelCard from "../bus-cards/components/travel-card"


export enum Widget {
    weather = "Weather",
    stocks = "Stocks",
    news = "News",
    laundryWeek = "Laundry Week",
    home = "Home",
    electricity = "Electricity",
    cityBike = "City Bike",
    calender = "Calender",
    busCards = "Bus Cards"
}


export const widgetMap: Record<Widget, React.ReactNode> = {
    [Widget.weather]: <Dailyweather />,
    [Widget.stocks]: <Stocks />,
    [Widget.news]: <News />,
    [Widget.laundryWeek]: <LaundryWeek />,
    [Widget.home]: <HomeActionButtons />,
    [Widget.electricity]: <ElectricyConsumption />,
    [Widget.cityBike]: <CityBike />,
    [Widget.calender]: <Calender />,
    [Widget.busCards]: <TravelCard />
}


