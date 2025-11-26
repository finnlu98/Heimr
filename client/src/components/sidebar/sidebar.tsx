import { useDashboard } from "../dashboard/dashboard-context";
import { Widget, widgetMap } from "../widgets/model/wigets"
import { IoAddCircle } from "react-icons/io5";
import "./sidebar.css"

const Sidebar: React.FC = () => {
    const {editMode, addWidget} = useDashboard()

    return (
        <>
            <div className={`sidebar ${editMode ? "edit-mode" : ""}`}>
                {editMode && <div className="widget-menu-row">Widget menu</div>}
                {widgetMap && editMode &&
                    Object.entries(widgetMap).map(([key, value]) => (
                        <div key={key} className="widget-menu-row" onClick={() => addWidget(key as Widget)}>
                            <div className="item">
                                {key}
                            </div>
                            <div className="item">
                                <IoAddCircle />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar