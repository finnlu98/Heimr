import './daily-weather-row.css'


interface DailyweatherRowProps {
    time: string
    icon: string
    degree: number
    rain: number
}

const DailyweatherRow: React.FC<DailyweatherRowProps> = ({time, icon, degree, rain}) => {
    
    return <div className='secondary-row'> 
            <div className='time-column'>{time}</div>
            <img src={`./img/weather/icons/${icon}.svg`} alt="Logo" className='secondary-icon'></img>   
            <div className='temp-column'>{degree}°</div>
            <div className='rain-column'>{rain} mm</div>
          </div>
}

export default DailyweatherRow