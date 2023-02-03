import { useNavigation } from '@react-navigation/native';
import { Box, ButtonGroup, Container } from './style';

import { ChartLine, PlusCircle } from 'phosphor-react-native';
import data from '../../../assets/MOCK_DATA.json';
import { ActionCard } from '../../components/ActionCard';
import { ButtonIcon } from '../../components/ButtonIcon';
import theme from '../../theme';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Box>
        {data.map((action) => (
          <ActionCard action={action} key={action.id} />
        ))}
      </Box>
      <ButtonGroup>
        <ButtonIcon
          title="View graph"
          icon={<ChartLine size={24} color={theme.colors.brand.primary} />}
        />
        <ButtonIcon
          title="Add new action"
          icon={<PlusCircle size={24} color={theme.colors.brand.primary} />}
        />
      </ButtonGroup>
    </Container>
  );
};

export { Home };
