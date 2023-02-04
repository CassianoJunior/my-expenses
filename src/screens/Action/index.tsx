import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Container } from './style';

import { Loading } from '../../components/Loading';
import { ActionType, useActionContext } from '../../contexts/ActionContext';

type ActionRouteParams = {
  id: string;
};

const Action = () => {
  const route = useRoute();
  const { id } = route.params as ActionRouteParams;

  const { getAction, isLoading } = useActionContext();

  const [action, setAction] = useState<ActionType>();

  useEffect(() => {
    const action = getAction(id);
    setAction(action);
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <Text style={{ color: 'white' }}> {action?.name} </Text>
    </Container>
  );
};

export { Action };
