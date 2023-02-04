import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Masks } from 'react-native-mask-input';
import uuid from 'react-native-uuid';
import { Loading } from '../../components/Loading';
import { ActionType, useActionContext } from '../../contexts/ActionContext';
import theme from '../../theme';
import { Container, Input, SubmitButton } from './style';

type FormData = {
  actionName: string;
  value: string;
  date: string;
};

type EditActionRouteParams = {
  id: string;
};

const EditAction = () => {
  const [actionToEdit, setActionToEdit] = useState<ActionType>();

  const route = useRoute();
  const { id } = route.params as EditActionRouteParams;

  const dateDay =
    actionToEdit?.date && actionToEdit?.date.getDate().toString().length > 1
      ? `${actionToEdit?.date.getDate().toString()}`
      : `0${actionToEdit?.date.getDate().toString()}`;

  const dateMonth =
    actionToEdit?.date && actionToEdit?.date.getMonth().toString().length > 1
      ? `${actionToEdit?.date.getMonth() + 1}`
      : actionToEdit?.date && `0${actionToEdit?.date.getMonth() + 1}`;
  const dateYear = actionToEdit?.date.getFullYear().toString();

  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      actionName: actionToEdit?.name,
      value: actionToEdit?.value.toString(),
      date: `${dateDay}/${dateMonth}/${dateYear}`,
    },
  });

  const { isLoading, addAction, getAction } = useActionContext();
  const navigation = useNavigation();

  const onSubmit = async ({ actionName, value, date }: FormData) => {
    const valueFormatted = value
      .replace(/\./g, '')
      .replace(',', '.')
      .split(' ')[1];

    const dateStringArray = date.split('/');
    const dateFormatted = `${dateStringArray[1]}/${dateStringArray[0]}/${dateStringArray[2]}`;

    const action = {
      id: uuid.v4(),
      name: actionName,
      value: Number(valueFormatted),
      date: new Date(dateFormatted),
    } as ActionType;

    return addAction(action);
  };

  useEffect(() => {
    setActionToEdit(getAction(id));

    if (formState.isSubmitSuccessful) {
      reset({ value: '', date: '', actionName: '' });
      navigation.navigate('Home');
    }
  }, [formState, reset]);

  return (
    <Container>
      {isLoading && <Loading />}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
            autoFocus
          />
        )}
        name="actionName"
      />

      {formState.errors.actionName && (
        <Text
          style={{
            color: 'red',
            fontSize: theme.sizes.small,
            paddingBottom: theme.spacings.regular,
          }}
        >
          Name is required!
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={'number-pad'}
            placeholder="Value"
            mask={Masks.BRL_CURRENCY}
          />
        )}
        name="value"
      />
      {formState.errors.value && (
        <Text
          style={{
            color: 'red',
            fontSize: theme.sizes.small,
            paddingBottom: theme.spacings.regular,
          }}
        >
          Value is required!
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={'number-pad'}
            placeholder="Date (dd/mm/yyyy)"
            mask={Masks.DATE_DDMMYYYY}
          />
        )}
        name="date"
      />
      {formState.errors.date && (
        <Text
          style={{
            color: 'red',
            fontSize: theme.sizes.small,
            paddingBottom: theme.spacings.regular,
          }}
        >
          Date is required!
        </Text>
      )}

      <SubmitButton onPress={handleSubmit(onSubmit)}>
        <Text
          style={{
            fontSize: theme.sizes.regular,
            fontWeight: 'bold',
          }}
        >
          Edit this action
        </Text>
      </SubmitButton>
    </Container>
  );
};

export { EditAction };
