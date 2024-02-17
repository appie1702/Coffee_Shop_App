import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {persistor, store} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import RootScreen from './src/screens/RootScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
const App = () => {
  useEffect(() => {
    const initalSetup = () => {
      GoogleSignin.configure({
        webClientId:
          '811491759167-ppvahnfai9j5vsqg3abdlagddr052tvq.apps.googleusercontent.com',
      });
      SplashScreen.hide();
    };
    initalSetup();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.ScreenContainer}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              /*  initialRouteName="Loading" */
            >
              <Stack.Screen
                name="Root"
                component={RootScreen}
                options={{animation: 'slide_from_bottom'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {flex: 1, backgroundColor: '#0C0F14'},
});
export default App;
