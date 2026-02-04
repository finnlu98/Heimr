import { AlertProvider } from "./alert/provider/AltertProvider";
import { LoadingProvider } from "./loading/providers/LoadingProvider";

interface FeedBackProviderProps {
  children?: React.ReactNode;
}

const FeedBackProvider: React.FC<FeedBackProviderProps> = ({ children }) => {
  return (
    <AlertProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AlertProvider>
  );
};
export default FeedBackProvider;
