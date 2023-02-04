import { View } from 'react-native';
import {
  Container,
  DayText,
  LeftBadge,
  LeftBadgeInner,
  LeftBadgeOuter,
  MonthText,
  RightBadge,
  YearText,
} from './style';

interface IBadgeProps {
  date: Date;
}

const Badge = ({ date }: IBadgeProps) => {
  const [, month, day, year] = date
    .toDateString()
    .split(' ')
    .map((item: string, index) => (index !== 1 ? Number(item) : item));

  return (
    <Container>
      <RightBadge>
        <View>
          <MonthText>{month}</MonthText>
        </View>
        <View>
          <DayText>{day}</DayText>
        </View>
        <View>
          <YearText>{year}</YearText>
        </View>
      </RightBadge>
      <LeftBadge>
        <LeftBadgeOuter>
          <LeftBadgeInner></LeftBadgeInner>
        </LeftBadgeOuter>
      </LeftBadge>
    </Container>
  );
};

export { Badge };
