import { useState } from "react";
import moment from "moment";
import "./laundry-week.css";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";


const washingEmojis = ["✨", "💧", "🛁", "🧴", "🧼", "🧽", "🚿", "🧹", "🧤", "🫧"];

const LaundryWeek : React.FC = () => {
  
  const currentWeek = moment().isoWeekday(1).isoWeek();
  const currentEmoji = getEmoji();
  const [isHide, setHide] = useState(false);
  
  let data = { nodes: createLaundryList(42, 51, ["Line", "Pernille", "Finn"]) };

  data = {
    nodes: !isHide
      ? data.nodes.filter((week) => week.week === currentWeek)
      : data.nodes,
  };


  function createLaundryList(startWeek : number, endWeek : number, names : string[]) {
    const records = [];
    const totalNames = names.length;
    
    for (let week = startWeek; week <= endWeek; week++) {
      
      const nameIndex = (week - startWeek) % totalNames;
      records.push({
        week: week,
        name: names[nameIndex]
      });
    }

    return records;
  } 
  
  
  function getEmoji() {
    return washingEmojis[currentWeek % washingEmojis.length];
  }

   
  if (isHide) {
    return (
      <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Washing in week {currentWeek}</h5>
      </div>
      <div className="week-table-header">
      </div>
      {data.nodes.map((week, weekIndex) => {
        return (
          <div className={`week-row expand ${week.week === currentWeek && isHide ? 'highlight' : ''}`} key={weekIndex}>
            <div>{week.week}</div>
            <div>{week.name}</div>
            
          </div>
        )
      })}
      
      <div className="expand-icon" onClick={() => setHide(!isHide)}>
        {!isHide ?  <SlArrowDown /> : <SlArrowUp />} 
      </div>

      <div className="rodt-slogan">
        <img src={"./img/laundry-week/rodt_logo.png"} width={40} height={40} alt="Fordi felleskap fungerer"/>
        <p>Fordi felleskap fungerer</p>
      </div>
    </div>
    );
  }



  return (
    <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Washing in week {currentWeek}</h5>
      </div>
      <div className="week-table-header">
      </div>
      {data.nodes.map((week, weekIndex) => {
        return (
          <div className={`week-row ${week.week === currentWeek && isHide ? 'highlight' : ''}`} key={weekIndex}>
            <div>{week.name} {currentEmoji}</div>
            
          </div>
        )
      })}
      
      <div className="expand-icon" onClick={() => setHide(!isHide)}>
        {!isHide ?  <SlArrowDown /> : <SlArrowUp />} 
      </div>

      <div className="rodt-slogan">
        <img src={"./img/laundry-week/rodt_logo.png"} width={40} height={40} alt="Fordi felleskap fungerer"></img>
        <p>Fordi felleskap fungerer</p>
      </div>
    </div>
  );
}

export default LaundryWeek;
