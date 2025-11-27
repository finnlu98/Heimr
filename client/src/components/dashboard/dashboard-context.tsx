import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { GridItem } from "../grid/model/grid-models";
import { Widget } from "../widgets/model/wigets";
import { v4 as uuidv4 } from 'uuid';
import { GridMetaData } from "../grid/model/grid-models";
import GridService from "../grid/service/grid-service";

type DashboardActions = {
  addWidget: (type: Widget) => void;
  removeWidget: (id: string) => void;
  updateWidget: (item: GridItem) => void;
  setEditMode: (on: boolean) => void;
  onGridResize: (meta: GridMetaData) => void;
  toggleEditMode: () => void
};

type DashboardState = {
  widgets: GridItem[];
  editMode: boolean;
  gridMetaData?: GridMetaData; 
};

const initialState: DashboardState = {
  widgets: [
            { id: "box-1", col: 0, row: 0, colSpan: 3, rowSpan: 3 , widget: Widget.laundryWeek },
            { id: "box-2", col: 0, row: 0, colSpan: 6, rowSpan: 4, widget: Widget.weather },
            { id: "box-3", col: 0, row: 0, colSpan: 3, rowSpan: 1, widget: Widget.home },
        ],
  editMode: false,
};

interface DashboardContextProps {
    children: React.ReactNode
}

type DashboardContextValue = DashboardState & DashboardActions;

const DashboardContext = createContext<DashboardContextValue | null>(null);

const DashboardProvider: React.FC<DashboardContextProps> = ({children}) =>{
     const [state, setState] = useState<DashboardState>(() => {
        try {
        const cached = localStorage.getItem("heimr-grid-layout");
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              return {
                  widgets: parsed as GridItem[],
                  editMode: false,
                  gridMetaData: undefined
              };
            }
        }
        } catch (e) {
            console.warn("Failed to read heimr-grid-layout from localStorage", e);
        }

        // Fallback: initial layout
        return initialState
    });

    useEffect(() => {
        try {
          localStorage.setItem("heimr-grid-layout", JSON.stringify(state.widgets));
        } catch (e) {
          console.warn("Failed to write heimr-grid-layout to localStorage", e);
        }
    }, [state.widgets]);


    const addWidget = (item: Widget) => {
        const newItem: GridItem = { id: uuidv4(), col: 0, row: 0, colSpan: 6, rowSpan: 4, widget: item}
        
        setState(prev => ({
        ...prev,
        widgets: [...prev.widgets, newItem],
        }));
    };

     const removeWidget = (id: string) => {
        setState(prev => ({
        ...prev,
        widgets: prev.widgets.filter(w => w.id !== id),
        }));
    };

    const setEditMode = (on: boolean) => {
        setState(prev => ({
        ...prev,
        editMode: on,
        }));
    };

    const toggleEditMode = () => {
        setState(prev => {
            return {
            ...prev,
            editMode: !prev.editMode
            };
        });
    };

    const updateWidget = (updated: GridItem) => {
      setState(prev => ({
          ...prev,
          widgets: prev.widgets.map(w =>
          w.id === updated.id ? updated : w
          ),
      }));
    };

    const onGridResize = (meta: GridMetaData) => {
    setState(prev => {
      const prevMeta = prev.gridMetaData;

      if (!prevMeta) {
        return { ...prev, gridMetaData: meta };
      }

      const reflowed = GridService.computePositions(prev.widgets, prevMeta, meta);

      return {
        ...prev,
        gridMetaData: meta,
        widgets: reflowed,
      };
    });
  };
    
    return (
    <DashboardContext.Provider value={{
      ...state,
      addWidget,
      updateWidget,
      removeWidget,
      toggleEditMode,
      setEditMode,
      onGridResize
    }}>
      {children}
    </DashboardContext.Provider>
  );
}


export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside <DashboardProvider>");
  }
  return ctx;
};

export default DashboardProvider