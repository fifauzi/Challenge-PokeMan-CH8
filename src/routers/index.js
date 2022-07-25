import React from 'react';
import {StyleSheet} from 'react-native';
import {Login, Register, Home, Detail, PokeBag} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Top from './top';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="PokeBag" component={PokeBag} />
      <Stack.Screen name="Top" component={Top} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
