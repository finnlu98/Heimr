import PopupButton from "../../../../shared/popup/Popup"
import Options from "./options";
import HomeActionButton from "../home-action-button/home-action-button"

interface HomeActionPopupButtonProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    event: string
    options: Record<string, string>;
}

const HomeActionPopupButton: React.FC<HomeActionPopupButtonProps> = ({Icon, event, options}) => {

    return (
        <PopupButton closePopupSeconds={10}>
                <HomeActionButton Icon={Icon} event={event} callOnClick={false} />
                <Options event={event} options={options} />
        </PopupButton>
    )
}

export default HomeActionPopupButton;