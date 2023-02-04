export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      NewAction: undefined;
      EditAction: { id: string };
      Action: { id: string; name: string };
    }
  }
}
