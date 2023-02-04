import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

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

  const fetchActions = async () => {
    setIsLoading(true);
    try {
      const actionsString = await AsyncStorage.getItem('@myActions:actions');
      if (actionsString) {
        const actions = JSON.parse(actionsString) as ActionType[];
        setActions(actions);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getAction = (id: string) => {
    const [action] = actions.filter((action) => action.id === id);
    return action;
  };

  const addAction = (action: ActionType) => {
    setIsLoading(true);

    console.log('Before', actions);
    setActions([action]);
    console.log('After', actions);

    setIsLoading(false);

    return syncActions();
  };

  const editAction = (action: ActionType) => {
    setActions((oldActions) =>
      oldActions.map((oldAction) =>
        oldAction.id === action.id ? action : oldAction
      )
    );

    return syncActions();
  };

  const deleteAction = (id: string) => {
    setActions((oldActions) =>
      oldActions.filter((oldAction) => oldAction.id !== id)
    );

    return syncActions();
  };

  const syncActions = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('@myActions:actions', JSON.stringify(actions));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
