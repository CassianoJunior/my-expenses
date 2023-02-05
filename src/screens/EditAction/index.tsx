import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Masks } from 'react-native-mask-input';
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

type EditActionRouteParams = {
  id: string;
};

const EditAction = () => {
  const [actionToEdit, setActionToEdit] = useState<ActionType>();

  const route = useRoute();
  const { id } = route.params as EditActionRouteParams;

  const { control, handleSubmit, formState, reset, setError } =
    useForm<FormData>({
      defaultValues: {
        actionName: '',
        value: '',
        date: '',
      },
    });

  const { isLoading, editAction, getAction, setIsLoading } = useActionContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: actionToEdit?.name,
    });
  }, [navigation, actionToEdit]);

  const validateDate = async (date: string) => {
    const formDate = new Date(
      date.replace(/\//g, '-').split('-').reverse().join('-')
    );
    const isPreviuosly = formDate < new Date();
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
    const { dirtyFields } = formState;
    if (dirtyFields.date) {
      const isValidDate = await validateDate(date);
      if (!isValidDate) {
        setError('date', {
          type: 'manual',
          message: 'Invalid date!',
        });
        return;
      }
    }

    const valueFormatted = value
      .replace(/\./g, '')
      .replace(',', '.')
      .split(' ')[1];

    const dateStringArray = date.split('/');
    const dateFormatted = `${dateStringArray[1]}/${dateStringArray[0]}/${dateStringArray[2]}`;

    const action = {
      id: actionToEdit?.id,
      name: dirtyFields.actionName ? actionName : actionToEdit?.name,
      value: dirtyFields.value ? Number(valueFormatted) : actionToEdit?.value,
      date: dirtyFields.date ? new Date(dateFormatted) : actionToEdit?.date,
    } as ActionType;

    return editAction(action);
  };

  useEffect(() => {
    setIsLoading(true);
    setActionToEdit(getAction(id));

    if (formState.isSubmitSuccessful) {
      reset({ value: '', date: '', actionName: '' });
      showMessage({
        message: 'Action edited!',
        description: 'Your action was edited successfully!',
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={actionToEdit?.name}
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={'number-pad'}
            placeholder={actionToEdit?.value.toString()}
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={'number-pad'}
            placeholder={moment(actionToEdit?.date)
              .format('DD/MM/YYYY')
              .toString()}
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

      <SubmitButton
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isDirty}
      >
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
