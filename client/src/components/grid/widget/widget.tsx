import "./widget.css"

interface WidgetProps {
  id: string;
  children: React.ReactNode
}

const Widget: React.FC<WidgetProps> = ({id, children}) => {
    

    return (
        <div className="widget-container">
            {children}
            <div className="resize-handle"></div>
        </div>
    )
}

export default Widget;