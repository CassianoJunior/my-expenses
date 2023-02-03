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
  date: string;
}

const Badge = ({ date }: IBadgeProps) => {
  const [month, day, year] = date
    .split('/')
    .map((item: string) => Number(item));

  const getMonthAbbreviations = (month: number) => {
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    return monthNames[month - 1];
  };

  return (
    <Container>
      <RightBadge>
        <View>
          <MonthText>{getMonthAbbreviations(month)}</MonthText>
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
