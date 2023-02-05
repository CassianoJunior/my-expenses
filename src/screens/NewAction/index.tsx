import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Masks } from 'react-native-mask-input';
import uuid from 'react-native-uuid';
import { getHolidays } from '../../api';
import { Loading } from '../../components/Loading';
import { ActionType, useActionContext } from '../../contexts/ActionContext';
import theme from '../../theme';
import { Container, Input, SubmitButton } from './style';

type FormData = {
  actionName: string;
  value: string;
  date: string;
};

const NewAction = () => {
  const { control, handleSubmit, formState, reset, setError } =
    useForm<FormData>();

  const { isLoading, addAction } = useActionContext();
  const navigation = useNavigation();

  const validateDate = async (date: string) => {
    const formDate = new Date(
      date.replace(/\//g, '-').split('-').reverse().join('-')
    );
    const now = new Date();
    const today = new Date(now.setDate(now.getDate() - 1));
    const isPreviuosly = formDate < today;
    if (isPreviuosly) {
      showMessage({
        message: 'Invalid date!',
        description: 'The date must be greater than today!',
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        type: 'danger',
      });

      return false;
    }

    const holidays = await getHolidays(date);
    const dateFormatted = date
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-');

    const holiday = holidays.find((holiday) => holiday.date === dateFormatted);

    if (holiday) {
      showMessage({
        message: 'Invalid date!',
        description: `${holiday?.name} is a holiday!`,
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const onSubmit = async ({ actionName, value, date }: FormData) => {
    const isValidDate = await validateDate(date);
    if (!isValidDate) {
      setError('date', {
        type: 'manual',
        message: 'Invalid date!',
      });
      return;
    }

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
    if (formState.isSubmitSuccessful) {
      reset({ value: '', date: '', actionName: '' });
      showMessage({
        message: 'Action added!',
        description: 'Your action was added successfully!',
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        type: 'success',
      });
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
          Valid date is required!
        </Text>
      )}

      <SubmitButton onPress={handleSubmit(onSubmit)}>
        <Text
          style={{
            fontSize: theme.sizes.regular,
            fontWeight: 'bold',
          }}
        >
          Add action
        </Text>
      </SubmitButton>
    </Container>
  );
};

export { NewAction };
