import { PencilSimpleLine, XCircle } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Badge } from '../Badge';
import { Box, Container } from './style';

export type ActionCardProps = {
  id: number;
  name: string;
  value: number;
  date: string;
};

export interface IActionCard {
  action: ActionCardProps;
}

const ActionCard = ({ action }: IActionCard) => {
  const { colors, spacings } = useTheme();

  return (
    <Container>
      <Box>
        <TouchableOpacity>
          <PencilSimpleLine size={24} weight={'bold'} color={colors.brand} />
        </TouchableOpacity>
        <TouchableOpacity>
          <XCircle
            size={24}
            weight={'bold'}
            color={colors.brand}
            style={{ marginLeft: spacings.regular }}
          />
        </TouchableOpacity>
      </Box>
      <Badge />
    </Container>
  );
};

export { ActionCard };
