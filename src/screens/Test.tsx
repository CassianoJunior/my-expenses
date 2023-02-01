import { Text, View } from 'react-native';

const Test = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Text>Changed</Text>
    </View>
  );
};

export { Test };
