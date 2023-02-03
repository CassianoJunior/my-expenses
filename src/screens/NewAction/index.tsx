import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Masks } from 'react-native-mask-input';
import theme from '../../theme';
import { Container, Input, SubmitButton } from './style';

type FormData = {
  actionName: string;
  value: string;
  date: string;
};

const NewAction = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <Container>
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

      {errors.actionName && (
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
      {errors.value && (
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
            placeholder="Date"
            mask={Masks.DATE_DDMMYYYY}
          />
        )}
        name="date"
      />
      {errors.date && (
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
          Add action
        </Text>
      </SubmitButton>
    </Container>
  );
};

export { NewAction };
