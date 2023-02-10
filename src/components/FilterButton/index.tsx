import { FunnelSimple } from 'phosphor-react-native';
import { Alert, TouchableOpacity } from 'react-native';
import { useActionContext } from '../../contexts/ActionContext';

const FilterButton = () => {
  const { changeSortType, actions, fetchActions } = useActionContext();

  const filterAlert = () => {
    Alert.alert(
      'Filter',
      'Choose a filter',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'By date',
          onPress: () => {
            Alert.alert(
              'Filter by date',
              'Choose a filter',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Ascending',
                  onPress: () => {
                    changeSortType('ascending-date', actions);
                  },
                },
                {
                  text: 'Descending',
                  onPress: () => {
                    changeSortType('descending-date', actions);
                  },
                },
              ],
              { cancelable: true }
            );
          },
        },
        {
          text: 'By value',
          onPress: () => {
            Alert.alert(
              'Filter by value',
              'Choose a filter',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Ascending',
                  onPress: () => {
                    changeSortType('ascending-value', actions);
                  },
                },
                {
                  text: 'Descending',
                  onPress: () => {
                    changeSortType('descending-value', actions);
                  },
                },
              ],
              { cancelable: true }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        right: 16,
        top: 4,
      }}
      onPress={filterAlert}
    >
      <FunnelSimple size={24} color="black" weight="bold" />
    </TouchableOpacity>
  );
};

export { FilterButton };
