import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export type ActionType = {
  id: string;
  name: string;
  value: number;
  date: Date;
};

export type ActionContextData = {
  actions: ActionType[];
  changeSortType: (sortValue: SortValues, actions: ActionType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetchActions: () => void;
  getAction: (id: string) => ActionType;
  addAction: (action: ActionType) => void;
  editAction: (action: ActionType) => void;
  deleteAction: (id: string) => void;
};

export type SortValues =
  | 'ascending-date'
  | 'descending-date'
  | 'ascending-value'
  | 'descending-value';

export const ActionContext = createContext<ActionContextData | undefined>(
  undefined
);

type ActionProviderProps = {
  children: React.ReactNode;
};

const ActionProvider = ({ children }: ActionProviderProps) => {
  const [actions, setActions] = useState<ActionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortValue, setSortValue] = useState<SortValues>('ascending-date');

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    setIsLoading(true);
    await AsyncStorage.getItem('@myActions:actions')
      .then((res) => {
        const actionsStoraged: ActionType[] = res ? JSON.parse(res) : [];
        actionsStoraged.forEach((action) => {
          action.date = new Date(action.date);
        });

        setActions(actionsStoraged);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const getAction = (id: string) => {
    const [action] = actions.filter((action) => action.id === id);
    setIsLoading(false);
    return action;
  };

  const addAction = (action: ActionType) => {
    setIsLoading(true);
    setTimeout(() => {
      syncActions([...actions, action]);
    }, 1000);
  };

  const editAction = (action: ActionType) => {
    setIsLoading(true);
    setTimeout(() => {
      const actionsEdited = [
        ...actions.filter((oldAction) => oldAction.id !== action.id),
        action,
      ];

      syncActions(actionsEdited);
    }, 1000);
  };

  const deleteAction = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const actionsEdited = actions.filter((action) => action.id !== id);

      syncActions(actionsEdited);
    }, 1000);
  };

  const syncActions = async (actions: ActionType[]) => {
    setActions(actions);
    await AsyncStorage.setItem('@myActions:actions', JSON.stringify(actions))
      .then((res) => {
        return changeSortType(sortValue, actions);
      })
      .finally(() => setIsLoading(false));
  };

  const changeSortType = (type: SortValues, actions: ActionType[]) => {
    const actionsCopy = [...actions];
    switch (type) {
      case 'ascending-date':
        setSortValue('ascending-date');
        actionsCopy.sort((a, b) => a.date.getTime() - b.date.getTime());
        return setActions(actionsCopy);
      case 'descending-date':
        setSortValue('descending-date');
        actionsCopy.sort((a, b) => b.date.getTime() - a.date.getTime());
        return setActions(actionsCopy);
      case 'ascending-value':
        setSortValue('ascending-value');
        actionsCopy.sort((a, b) => a.value - b.value);
        return setActions(actionsCopy);
      case 'descending-value':
        setSortValue('descending-value');
        actionsCopy.sort((a, b) => b.value - a.value);
        return setActions(actionsCopy);
      default:
        return setActions(actionsCopy);
    }
  };

  const contextValue = {
    actions,
    changeSortType,
    isLoading,
    setIsLoading,
    fetchActions,
    getAction,
    addAction,
    editAction,
    deleteAction,
  } as ActionContextData;

  return (
    <ActionContext.Provider value={contextValue}>
      {children}
    </ActionContext.Provider>
  );
};

const useActionContext = () => {
  const context = useContext(ActionContext);

  if (typeof context === 'undefined') {
    throw new Error('Error Actions Context');
  }

  return context;
};

export { ActionProvider, useActionContext };
