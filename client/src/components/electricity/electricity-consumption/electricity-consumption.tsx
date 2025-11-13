import { useEffect, useState } from "react"
import ElviaFetcher from "../../../api/elvia-fetcher"
import { ElviaService } from "../../../services/ElviaService"

const ElectricyConsumption: React.FC = () => {
    const [elecService, setElecService] = useState<ElviaService>();

    useEffect(() => {
        const setAndFetcConsumption = async () => {
            setElecService(await ElviaFetcher());
        }
        
        setAndFetcConsumption();
    })
    
    return <>
       
    </>
}

export default ElectricyConsumption