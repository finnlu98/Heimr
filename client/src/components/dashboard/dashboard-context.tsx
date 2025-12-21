import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { GridItem } from "./grid/model/grid-models";
import { WidgetEnum } from "../widgets/model/widget-type";
import { v4 as uuidv4 } from "uuid";
import { GridMetaData } from "./grid/model/grid-models";
import { WidgetConfigs } from "../widgets/model/wigets";

type DashboardActions = {
  addWidget: (type: WidgetEnum) => void;
  removeWidget: (id: string) => void;
  updateWidget: (item: GridItem) => void;
  setEditMode: (on: boolean) => void;
  onGridResize: (meta: GridMetaData) => void;
  toggleEditMode: () => void;
  setWidgetConfig: (id: WidgetEnum, cfg: any) => void;
};

type DashboardState = {
  widgets: GridItem[];
  editMode: boolean;
  widgetConfigs: Record<WidgetEnum, object>;
  gridMetaData?: GridMetaData;
};

const initialState: DashboardState = {
  widgets: [
    {
      id: "box-1",
      col: 0,
      row: 0,
      colSpan: 3,
      rowSpan: 3,
      widget: WidgetEnum.busCards,
    },
    {
      id: "box-2",
      col: 0,
      row: 0,
      colSpan: 6,
      rowSpan: 4,
      widget: WidgetEnum.home,
    },
    {
      id: "box-3",
      col: 0,
      row: 0,
      colSpan: 3,
      rowSpan: 1,
      widget: WidgetEnum.weather,
    },
  ],
  widgetConfigs: WidgetConfigs,
  editMode: false,
};

interface DashboardContextProps {
  children: React.ReactNode;
}

type DashboardContextValue = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextValue | null>(null);

const DashboardProvider: React.FC<DashboardContextProps> = ({ children }) => {
  const [state, setState] = useState<DashboardState>(() => {
    try {
      const cachedLayout = localStorage.getItem("heimr-grid-layout");
      const cachedConfig = localStorage.getItem("heimr-widget-config");

      const parsedLayout = cachedLayout ? JSON.parse(cachedLayout) : null;
      const parsedConfig: Record<WidgetEnum, object> | null = cachedConfig
        ? JSON.parse(cachedConfig)
        : null;

      return {
        widgets: Array.isArray(parsedLayout)
          ? (parsedLayout as GridItem[])
          : [],
        widgetConfigs: parsedConfig ?? WidgetConfigs,
        editMode: false,
        gridMetaData: undefined,
      };
    } catch (e) {
      console.warn("Failed to load Heimr config/layout:", e);

      return initialState;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("heimr-grid-layout", JSON.stringify(state.widgets));
    } catch (e) {
      console.warn("Failed to write heimr-grid-layout to localStorage", e);
    }
  }, [state.widgets]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "heimr-widget-config",
        JSON.stringify(state.widgetConfigs),
      );
    } catch (e) {
      console.warn("Failed to write heimr-widget-config to localStorage", e);
    }
  }, [state.widgetConfigs]);

  const setWidgetConfig = (id: WidgetEnum, cfg: any) => {
    setState((prev) => ({
      ...prev,
      widgetConfigs: {
        ...prev.widgetConfigs,
        [id]: cfg,
      },
    }));
  };

  const addWidget = (item: WidgetEnum) => {
    const newItem: GridItem = {
      id: uuidv4(),
      col: 0,
      row: 0,
      colSpan: 6,
      rowSpan: 4,
      widget: item,
    };

    setState((prev) => ({
      ...prev,
      widgets: [...prev.widgets, newItem],
    }));
  };

  const removeWidget = (id: string) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((w) => w.id !== id),
    }));
  };

  const setEditMode = (on: boolean) => {
    setState((prev) => ({
      ...prev,
      editMode: on,
    }));
  };

  const toggleEditMode = () => {
    setState((prev) => {
      return {
        ...prev,
        editMode: !prev.editMode,
      };
    });
  };

  const updateWidget = (updated: GridItem) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.map((w) => (w.id === updated.id ? updated : w)),
    }));
  };

  const onGridResize = useCallback((meta: GridMetaData) => {
    setState((prev) => {
      const prevMeta = prev.gridMetaData;

      if (
        prevMeta &&
        prevMeta.width === meta.width &&
        prevMeta.height === meta.height &&
        prevMeta.colWidth === meta.colWidth &&
        prevMeta.colHeight === meta.colHeight &&
        prevMeta.columns === meta.columns &&
        prevMeta.gap === meta.gap
      ) {
        return prev;
      }

      return {
        ...prev,
        gridMetaData: meta,
      };
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setWidgetConfig,
        addWidget,
        updateWidget,
        removeWidget,
        toggleEditMode,
        setEditMode,
        onGridResize,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside <DashboardProvider>");
  }
  return ctx;
};

export default DashboardProvider;
