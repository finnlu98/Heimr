import "./travel-card-configuration.css"
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { TravelCardConfig, TravelRoute } from "../../TravelCardWidget";
import { WidgetEnum } from "../../../model/widget-type";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import ImageCircle from "../../../../shared/imageCirlce/ImageCircle";


const defaultConfig = {numRows: 3, minFilter: 3}
const defaultColors = {general: 10, green: 7, yellow: 5}

const TravelCardConfiguration: React.FC = () => {
    const { widgetConfigs, setWidgetConfig } = useDashboard()
    const config = (widgetConfigs[WidgetEnum.busCards] as TravelCardConfig) ?? {travelRoutes: []};
    const [travelRoute, setTravelRoute] = useState<TravelRoute>({imgIdentifier: "", startPlace: "", stopPlace: "", configCard: defaultConfig, configColor: defaultColors})
    
    
    function removeTravelRoute(startPlace: string, stopPlace: string) {
        var updatedRoutes = config.travelRoutes.filter(t => t.startPlace !== startPlace && t.stopPlace !== stopPlace)
        var updatedConfig = {
            ...config,
            travelRoutes: updatedRoutes
        }
        
        setWidgetConfig(WidgetEnum.busCards, updatedConfig);
        
    }
    
    function addTravelRoute(travelRoute: TravelRoute) {
        config.travelRoutes.push(travelRoute);

        setWidgetConfig(WidgetEnum.busCards, config)
        setTravelRoute({imgIdentifier: "", startPlace: "", stopPlace: "", configCard: defaultConfig, configColor: defaultColors})
    }

    function setImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
            reader.onloadend = () => {
            const dataUrl = reader.result as string;

                setTravelRoute((prev) => {
                    return {
                        ...prev,
                        imgIdentifier: dataUrl
                    }
                });
            };

        reader.readAsDataURL(file);
    }

    return (
        <div className="travel-config">
                <div className="travel-header">Image</div>
                <div className="travel-header">Start stop</div>
                <div className="travel-header">End stop</div>
                <div></div>
                
            {config && config.travelRoutes.map(route => {
                return (
                    <>
                        <div><ImageCircle imgPath={route.imgIdentifier} alt="prev-img"/> </div>
                        <div>{route.startPlace}</div>
                        <div> {route.stopPlace}</div>
                        <div className="travel-action-button" onClick={() => removeTravelRoute(route.startPlace, route.stopPlace)}>
                            <MdDelete size={20}/>
                        </div>
                    </>
                )
            })}
                <label className="circle medium circle-upload">
                    {
                        travelRoute.imgIdentifier === "" ? (
                            <>
                                <input type="file" accept="image/*" onChange={setImage} />
                                <IoMdAdd />
                            </>
                        ) : (
                            <>
                                <input type="file" accept="image/*" onChange={setImage} />
                                <ImageCircle imgPath={travelRoute.imgIdentifier} alt="prev-img" />
                            </>
                        )
                    }
                </label>
                
                <input 
                    className="travel-input"
                    placeholder="Start stop ID" 
                    value={travelRoute.startPlace ?? ""}
                    onChange={(e) => setTravelRoute(prev => ({...prev, startPlace: e.target.value })) }/>
                <input 
                    className="travel-input"
                    placeholder="End stop ID" 
                    value={travelRoute.stopPlace ?? ""}
                    onChange={(e) => setTravelRoute(prev => ({...prev, stopPlace: e.target.value })) }/>
                <div className="travel-action-button" onClick={() => addTravelRoute(travelRoute)}>
                    <IoAddCircle size={20}/>
                </div>
        </div>
    )
}

export default TravelCardConfiguration;