import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';
import DetailsScreen from './DetailsScreen';
import PaymentScreen from './PaymentScreen';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import {setUserConnected, setUserLoading} from '../features/userSlice';
import {ThunkDispatch} from '@reduxjs/toolkit';

const Stack = createNativeStackNavigator();

const RootScreen = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userData = useSelector((state: any) => state.user.userData);
  const isUserSignedIn = useSelector((state: any) => state.user.isUserSignedIn);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      dispatch(setUserConnected({userConnected: false}));
    } else {
      dispatch(setUserConnected({userConnected: true}));
    }

    return () => {
      dispatch(setUserLoading());
    };
  }, [userData, navigation, dispatch]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isUserSignedIn === 'loading' && (
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{animation: 'fade'}}
        />
      )}
      {typeof isUserSignedIn === 'boolean' && isUserSignedIn === false && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      )}
      {typeof isUserSignedIn === 'boolean' && isUserSignedIn === true && (
        <>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootScreen;
