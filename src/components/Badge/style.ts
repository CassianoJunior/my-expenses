import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${theme.spacings.regular}px;
`;

export const RightBadge = styled.View`
  width: 80px;
  height: 100px;
  background-color: ${theme.colors.brand.primary};
  border-radius: ${theme.spacings.thin}px;
  justify-content: center;
  align-items: center;
`;

export const LeftBadge = styled.View`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: transparent;
  top: -36px;
  left: -2px;
`;

export const LeftBadgeInner = styled.View`
  transform: rotate(45deg);
  background-color: ${theme.colors.brand.primary};
  width: 82px;
  height: 82px;
  top: 20px;
  left: -42px;
  position: relative;
  border-radius: 20px;
`;

export const LeftBadgeOuter = styled.View`
  position: absolute;
  width: 70px;
  height: 120px;
  overflow: hidden;
`;

export const MonthText = styled.Text`
  text-transform: uppercase;
  font-size: ${theme.sizes.regular}px;
`;

export const DayText = styled.Text`
  font-size: ${theme.sizes.extraLarge}px;
  font-weight: bold;
`;

export const YearText = styled.Text`
  font-size: ${theme.sizes.regular}px;
`;
