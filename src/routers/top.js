import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Detail, PokeBag} from '../screens/index';

import React from 'react';

const Tab = createMaterialTopTabNavigator();

export default function Top() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Detail" component={Detail} />
      <Tab.Screen name="PokeBag" component={PokeBag} />
    </Tab.Navigator>
  );
}
