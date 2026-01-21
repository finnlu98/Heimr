import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { GridItem } from "./grid/model/grid-models";
import { WidgetEnum } from "../widgets/model/widget-type";
import { v4 as uuidv4 } from "uuid";
import { GridMetaData } from "./grid/model/grid-models";
import { WidgetConfigs } from "../widgets/model/wigets";
import apiClient from "../../api/ApiClient";
import { HomeConfig } from "../../model/HomeConfigState";
import { useAuth } from "../../context/AuthContext";
import { ConfigMigration } from "../../lib/version";
import GridService from "./grid/service/grid-service";

type DashboardActions = {
  setWidgets: (widgets: GridItem[]) => void;
  addWidget: (type: WidgetEnum) => void;
  removeWidget: (id: string) => void;
  updateWidget: (item: GridItem) => void;
  onGridResize: (meta: GridMetaData) => void;
  toggleEditMode: () => void;
  setWidgetConfig: (id: WidgetEnum, cfg: any) => void;
};

type DashboardState = {
  widgets: GridItem[];
  editMode: boolean;
  isDirty: boolean;
  widgetConfigs: Record<WidgetEnum, object>;
  gridMetaData?: GridMetaData;
};

const initialState: DashboardState = {
  widgets: [],
  widgetConfigs: WidgetConfigs,
  editMode: false,
  isDirty: false,
};

interface DashboardContextProps {
  children: React.ReactNode;
}

type DashboardContextValue = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextValue | null>(null);

const DashboardProvider: React.FC<DashboardContextProps> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<DashboardState>(() => {
    try {
      const cachedLayout = localStorage.getItem("heimr-grid-layout");
      const cachedConfig = localStorage.getItem("heimr-widget-config");

      const parsedLayout = cachedLayout ? JSON.parse(cachedLayout) : null;
      const parsedConfig = cachedConfig ? JSON.parse(cachedConfig) : null;

      const widgetLayout = ConfigMigration.migrateLayout(parsedLayout ?? initialState.widgets);
      const widgetConfig = ConfigMigration.migrateConfig(parsedConfig ?? initialState.widgetConfigs);

      return {
        widgets: widgetLayout,
        widgetConfigs: widgetConfig,
        editMode: false,
        isDirty: false,
        gridMetaData: undefined,
      };
    } catch (e) {
      console.warn("Failed to load from localStorage:", e);
      return initialState;
    }
  });

  useEffect(() => {
    if (!user) return;

    const loadFromBackend = async () => {
      const hasLayout = state.widgets && state.widgets.length > 0;
      const hasConfig = state.widgetConfigs && Object.keys(state.widgetConfigs).length > 0;

      if (hasLayout && hasConfig) {
        return;
      }

      try {
        const response = await apiClient.get<HomeConfig>("me/home/config");
        const serverConfig = response.data;

        setState((prev) => ({
          ...prev,
          widgets: ConfigMigration.migrateLayout(serverConfig?.widgetPositions ?? prev.widgets),
          widgetConfigs: ConfigMigration.migrateConfig(serverConfig?.widgetConfig ?? prev.widgetConfigs),
        }));
      } catch (error) {
        console.warn("Failed to fetch from backend:", error);
      }
    };

    loadFromBackend();
  }, [user]);

  function updateConfig() {
    apiClient
      .post("/me/home/config", {
        widgetPositions: ConfigMigration.wrapLayout(state.widgets),
        widgetConfig: ConfigMigration.wrapConfig(state.widgetConfigs),
      })
      .catch((error) => {
        console.error("Failed to save config to backend:", error);
      });
  }

  useEffect(() => {
    try {
      const verisonedLayout = ConfigMigration.wrapLayout(state.widgets);
      localStorage.setItem("heimr-grid-layout", JSON.stringify(verisonedLayout));
    } catch (e) {
      console.warn("Failed to write heimr-grid-layout to localStorage", e);
    }
  }, [state.widgets]);

  useEffect(() => {
    try {
      const versionedConfig = ConfigMigration.wrapConfig(state.widgetConfigs);
      localStorage.setItem("heimr-widget-config", JSON.stringify(versionedConfig));
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

  const setWidgets = (widgets: GridItem[]) => {
    setState((prev) => ({
      ...prev,
      widgets,
      isDirty: true,
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
      isDirty: true,
    }));
  };

  const removeWidget = (id: string) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((w) => w.id !== id),
      isDirty: true,
    }));
  };

  const updateWidget = (updated: GridItem) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.map((w) => (w.id === updated.id ? updated : w)),
      isDirty: true,
    }));
  };

  const toggleEditMode = () => {
    const shouldSave = state.isDirty && state.editMode && user;
    if (shouldSave) {
      updateConfig();
    }

    setState((prev) => ({
      ...prev,
      editMode: !prev.editMode,
      isDirty: false,
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

      const compactedWidgets = GridService.compactLayout(prev.widgets, meta);

      return {
        ...prev,
        widgets: compactedWidgets,
        gridMetaData: meta,
        isDirty: prev.isDirty || prev.widgets.some((w, i) => w.row !== compactedWidgets[i].row),
      };
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setWidgetConfig,
        setWidgets,
        addWidget,
        updateWidget,
        removeWidget,
        toggleEditMode,
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
