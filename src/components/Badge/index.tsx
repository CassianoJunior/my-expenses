import {
  Container,
  LeftBadge,
  LeftBadgeInner,
  LeftBadgeOuter,
  RightBadge,
} from './style';

const Badge = () => {
  return (
    <Container>
      <RightBadge></RightBadge>
      <LeftBadge>
        <LeftBadgeOuter>
          <LeftBadgeInner></LeftBadgeInner>
        </LeftBadgeOuter>
      </LeftBadge>
    </Container>
  );
};

export { Badge };
