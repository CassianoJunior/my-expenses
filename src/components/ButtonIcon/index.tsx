import { Text, TouchableOpacityProps } from 'react-native';
import theme from '../../theme';
import { Container } from './style';

interface IButtonIconProps extends TouchableOpacityProps {
  title: string;
  icon?: JSX.Element;
}

const ButtonIcon = ({ title, icon, ...rest }: IButtonIconProps) => {
  return (
    <Container {...rest}>
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
