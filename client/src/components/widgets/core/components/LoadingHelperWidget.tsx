import LoadingOverlay from "../../../../feedback/components/Loading/LoadingOverlay";
import { useLoading } from "../../../../feedback/hooks/useLoading";
import { WidgetEnum } from "../../model/widget-type";
import EditWidget from "./EditWidget";

interface LoadingHelperWidgetProps {
  widgetKey: WidgetEnum;
  children: React.ReactNode;
  loadingKeys?: string[];
  showConfig?: () => boolean;
}

const LoadingHelperWidget: React.FC<LoadingHelperWidgetProps> = ({ widgetKey, children, loadingKeys, showConfig }) => {
  const { isLoading: checkLoading } = useLoading();
  const loading = loadingKeys ? loadingKeys.some((key) => checkLoading(key)) : false;
  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : showConfig && showConfig() ? (
        <EditWidget widgetKey={widgetKey} />
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default LoadingHelperWidget;
