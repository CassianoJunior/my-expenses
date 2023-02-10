import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { getHolidays } from '../api';

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
  validateDate: (date: string) => Promise<boolean>;
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

  const validateDate = async (date: string) => {
    const formDate = new Date(
      date.replace(/\//g, '-').split('-').reverse().join('-')
    );
    const now = new Date();
    const today = new Date(now.setDate(now.getDate() - 1));
    const isPreviuosly = formDate < today;
    if (isPreviuosly) {
      showMessage({
        message: 'Invalid date!',
        description: 'The date must be greater than today!',
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        type: 'danger',
      });

      return false;
    }

    const holidays = await getHolidays(date);
    const dateFormatted = date
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-');

    const holiday = holidays.find((holiday) => holiday.date === dateFormatted);

    if (holiday) {
      showMessage({
        message: 'Invalid date!',
        description: `${holiday?.name} is a holiday!`,
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        type: 'danger',
      });

      return false;
    }

    return true;
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
    validateDate,
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
