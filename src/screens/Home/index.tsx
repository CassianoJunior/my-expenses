import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Container, Title } from './style';

import data from '../../../assets/MOCK_DATA.json';
import { ActionCard } from '../../components/ActionCard';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Box>
        {data.map((action) => (
          <ActionCard action={action} key={action.id} />
        ))}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Test');
          }}
        >
          <Title>Go to Test</Title>
        </TouchableOpacity>
      </Box>
    </Container>
  );
};

export { Home };
