import React, { useState, useEffect } from 'react';
import "./home-avatar.css"
import HomeFetcher from '../../api/home-fetcher';
import { HomeStatus } from '../../model/Deziarilize/HomeStatus';
import { FaHome } from "react-icons/fa";
interface HomeAvatarProps  {
    name : string
} 

const HomeAvatar: React.FC<HomeAvatarProps> = ({name}) =>  {
    const [avatarImg, setAvatarImg] = useState("")
    const [homeStatus, setHomeStatus] = useState<HomeStatus>()
    
    useEffect(() => {
        const SetHomeStatus = async () => {
            var homeStatus = await HomeFetcher(name);
            setHomeStatus(homeStatus)
        }
        SetHomeStatus()
    }, [])

    useEffect(() => {
        setAvatarImg(findImg(name)) 
    }, [name])

    function findImg(name : string) : string {
        return `./img/${name.toLowerCase()}.jpg` 
    }

    return (
        <div className='avatar-container'>
            <div className="circle">
                <img src={avatarImg} alt="Avatar" className="avatar-img"/>
            </div>
            <div className={`icon-circle ${homeStatus?.state}`}>
                <FaHome/>
            </div>
        </div>
        
    )
}

export default HomeAvatar;