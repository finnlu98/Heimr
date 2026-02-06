import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { GridItem } from "./grid/model/grid-models";
import { v4 as uuidv4 } from "uuid";
import { GridMetaData } from "./grid/model/grid-models";
import apiClient from "../../api/ApiClient";
import { HomeConfig, HomeConfigUtils } from "../../model/HomeConfigState";
import { useAuth } from "../../context/AuthContext";
import { ConfigMigration } from "../../lib/version";
import GridService from "./grid/service/grid-service";
import { EditingKey, EditModeState } from "./model/EditMode";
import LoadServerConfig from "./loadServerConfig/load-server-config";
import { isDefaultView } from "./util/isDefaultView";
import { useAlert } from "../../feedback/alert/provider/AltertProvider";
import { AlertVariant } from "../../feedback/alert/model/AlertTypes";
import { WidgetDefinition, WidgetEnum } from "../widgets/core/model/widget-type";
import { WidgetConfigs, Widgets } from "../widgets/core/model/wigets";

type DashboardActions = {
  setWidgets: (widgets: GridItem[]) => void;
  addWidget: (type: WidgetEnum) => void;
  removeWidget: (id: string) => void;
  updateWidget: (item: GridItem) => void;
  onGridResize: (meta: GridMetaData) => void;
  toggleEditMode: (editKey?: EditingKey) => void;
  setEditingKey: (key: EditingKey | null) => void;
  setWidgetConfig: (id: WidgetEnum, cfg: any) => void;
};

type DashboardState = {
  widgets: GridItem[];
  editMode: EditModeState;
  isDirty: boolean;
  widgetConfigs: Record<WidgetEnum, object>;
  gridMetaData?: GridMetaData;
};

const initialState: DashboardState = {
  widgets: [{ widget: WidgetEnum.header, id: uuidv4(), col: 0, row: 0, colSpan: 24, rowSpan: 3 }],
  widgetConfigs: WidgetConfigs,
  editMode: { editMode: false, editingWidgetKey: null },
  isDirty: false,
};

interface DashboardContextProps {
  children: React.ReactNode;
}

type DashboardContextValue = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextValue | null>(null);

const DashboardProvider: React.FC<DashboardContextProps> = ({ children }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [serverConfig, setServerConfig] = useState<HomeConfig | null>(null);

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
        editMode: { editMode: false, editingWidgetKey: null },
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
      const hasLayout = isDefaultView(state.widgets);
      const hasConfig = state.widgetConfigs && Object.keys(state.widgetConfigs).length > 0;

      try {
        const response = await apiClient.get<HomeConfig>("me/home/config");
        const serverConfig = response.data;

        if (!hasLayout && !hasConfig) {
          setState((prev) => ({
            ...prev,
            widgets: ConfigMigration.migrateLayout(serverConfig?.widgetPositions ?? prev.widgets),
            widgetConfigs: ConfigMigration.migrateConfig(serverConfig?.widgetConfig ?? prev.widgetConfigs),
          }));
          return;
        }

        const localConfig: HomeConfig = {
          widgetPositions: state.widgets,
          widgetConfig: state.widgetConfigs,
        };

        const serverConfigObj: HomeConfig = {
          widgetPositions: ConfigMigration.migrateLayout(serverConfig?.widgetPositions) || [],
          widgetConfig: ConfigMigration.migrateConfig(serverConfig?.widgetConfig) || {},
        };

        if (!HomeConfigUtils.equals(localConfig, serverConfigObj)) {
          setServerConfig(serverConfig);
        }
      } catch (error) {
        console.warn("Failed to fetch from backend:", error);
      }
    };

    loadFromBackend();
  }, [user]);

  function handleLoadServerConfig() {
    if (serverConfig) {
      setState((prev) => ({
        ...prev,
        widgets: ConfigMigration.migrateLayout(serverConfig.widgetPositions),
        widgetConfigs: ConfigMigration.migrateConfig(serverConfig.widgetConfig),
      }));
    }
  }

  function updateConfig() {
    try {
      apiClient.post("/me/home/config", {
        widgetPositions: ConfigMigration.wrapLayout(state.widgets),
        widgetConfig: ConfigMigration.wrapConfig(state.widgetConfigs),
      });
      showAlert("Dashboard configuration saved successfully.", AlertVariant.SUCCESS);
    } catch (error) {
      console.error("Failed to initiate config save to backend:", error);
      return;
    }
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
      row: 3,
      colSpan: (Widgets[item] as WidgetDefinition<any>)?.defaultColSpan ?? 12,
      rowSpan: (Widgets[item] as WidgetDefinition<any>)?.defaultRowSpan ?? 6,
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

  const toggleEditMode = (editKey?: EditingKey) => {
    const shouldSave = state.isDirty && state.editMode.editMode && user;
    if (state.isDirty && state.editMode.editMode && !user) {
      showAlert(
        "Your changes have not been saved to your profile since you are not logged in. Go to home settings and log in to save your changes.",
        AlertVariant.INFO,
        10000,
      );
    }

    if (shouldSave) {
      updateConfig();
    }

    setState((prev) => ({
      ...prev,
      editMode: {
        editMode: !prev.editMode.editMode,
        editingWidgetKey: !prev.editMode.editMode ? (editKey ?? null) : null,
      },
      isDirty: false,
    }));
  };

  const setEditingKey = (key: EditingKey | null) => {
    setState((prev) => ({
      ...prev,
      editMode: {
        ...prev.editMode,
        editingWidgetKey: key,
      },
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
        setEditingKey,
        onGridResize,
      }}
    >
      <LoadServerConfig
        isOpen={!!serverConfig}
        onClose={() => setServerConfig(null)}
        onConfirm={handleLoadServerConfig}
      />
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
