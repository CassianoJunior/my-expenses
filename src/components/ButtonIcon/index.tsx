import { Text } from 'react-native';
import theme from '../../theme';
import { Container } from './style';

interface IButtonIconProps {
  title: string;
  icon?: JSX.Element;
}

const ButtonIcon = ({ title, icon }: IButtonIconProps) => {
  return (
    <Container>
      {icon}
      <Text
        style={{
          marginLeft: theme.spacings.thin,
          color: 'white',
        }}
      >
        {title}
      </Text>
    </Container>
  );
};

export { ButtonIcon };
