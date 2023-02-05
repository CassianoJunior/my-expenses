import moment from 'moment';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useActionContext } from '../../contexts/ActionContext';
import theme from '../../theme';

const GraphicScreen = () => {
  const { actions } = useActionContext();

  const actionsOrderedByDate = actions.sort((a, b) => {
    return (
      new Date(a.date.toDateString()).getTime() -
      new Date(b.date.toDateString()).getTime()
    );
  });

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: theme.colors.background.primary,
      }}
    >
      <LineChart
        style={{
          marginTop: 96,
        }}
        data={{
          labels: actionsOrderedByDate.map((action) =>
            moment(action.date).format('DD/MM/YYYY')
          ),
          datasets: [
            {
              data: actionsOrderedByDate.map((action) => action.value),
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: theme.colors.background.primary,
          backgroundGradientTo: theme.colors.background.primary,
          color: (opacity = 1) => `rgba(245, 93, 93, ${opacity})`,
        }}
      />
    </View>
  );
};

export { GraphicScreen };
