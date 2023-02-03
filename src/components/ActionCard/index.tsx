import { PencilSimpleLine, XCircle } from 'phosphor-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Badge } from '../Badge';
import { Container, Content, IconsBox } from './style';

const image = require('../../assets/calculo_r.png');

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
  const { colors, spacings, sizes } = useTheme();

  return (
    <Container>
      <IconsBox>
        <TouchableOpacity>
          <PencilSimpleLine
            size={24}
            weight={'bold'}
            color={colors.brand.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <XCircle
            size={24}
            weight={'bold'}
            color={colors.brand.primary}
            style={{ marginLeft: spacings.regular }}
          />
        </TouchableOpacity>
      </IconsBox>
      <Content>
        <Badge date={action.date} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={image} />
          <View
            style={{ marginLeft: spacings.regular, justifyContent: 'center' }}
          >
            <Text style={{ fontSize: sizes.regular }}>{action.name}</Text>
            <Text style={{ fontSize: sizes.medium }}>
              R$ {action.value.toFixed(2)}
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export { ActionCard };
