import "./ImageCircle.css"

interface ImageCircleProps {
    imgPath: string
    alt: string
    circleSize?:string
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    conditionalColor?: string
}

const ImageCircle: React.FC<ImageCircleProps> = ({imgPath, alt, circleSize, Icon, conditionalColor}) => {
    return (
            <div className='image-circle-container'>
                <div className={`circle ${circleSize ? circleSize : "medium"}`}>
                    {imgPath && <img src={imgPath} alt={alt} className="circle-img"/>} 
                </div>
                {Icon && 
                    <div className={`icon-circle ${conditionalColor}`}>
                        <Icon/>
                    </div>
                }
            </div>
    )
}

export default ImageCircle