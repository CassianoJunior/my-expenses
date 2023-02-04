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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetchActions: () => void;
  getAction: (id: string) => ActionType;
  addAction: (action: ActionType) => void;
  editAction: (action: ActionType) => void;
  deleteAction: (id: string) => void;
};

export const ActionContext = createContext<ActionContextData | undefined>(
  undefined
);

type ActionProviderProps = {
  children: React.ReactNode;
};

const ActionProvider = ({ children }: ActionProviderProps) => {
  const [actions, setActions] = useState<ActionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // AsyncStorage.removeItem('@myActions:actions');
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
    console.log(actions);
    await AsyncStorage.setItem('@myActions:actions', JSON.stringify(actions))
      .then((res) => setActions(actions))
      .finally(() => setIsLoading(false));
  };

  const contextValue = {
    actions,
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
