import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';
import {setUser} from './redux/action';
import auth from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Input from '../../commponent/input';
import {myDb} from '../../helpers/myDb';
import {NavigationContainer} from '@react-navigation/native';

const messaging = messagingProvider();

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const handleSubmit = async values => {
    try {
      const res = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );
      const token = await messaging.getToken();
      console.log(res);
      if (token) {
        let isUpdate = false;
        await myDb.ref(`users/${res.user.uid}`).update({notifToken: token});
        isUpdate = true;

        if (isUpdate) {
          const result = await myDb
            .ref(`users/`)
            .once('value')
            .then(async snapshot => {
              if (snapshot.val() == null) {
                Alert.alert('Invalid Email Id');
                return false;
              }
              let userData = Object.values(snapshot.val())[0];
              navigation.replace('Home', {userData: userData});
            });
          // console.log(result);
          // if (result.val) {
          //   dispatch(setUser(result.val()));
          //   navigation.replace('Home');
          // }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Not Found User');
    }
  };
  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Password field is Required')
      .min(8, 'Password is too short, should be at least 8 character'),
  });
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={handleSubmit}
      validationSchema={signInSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView style={styles.container}>
          <Image />
          <Text style={styles.HeadTitle}>Welcom To Poke Man App!</Text>
          <View style={{top: 30}}>
            <Text style={styles.TextInput}>Email</Text>
            <Input
              style={styles.errortxt}
              placeHolder={'Email'}
              onChangeText={handleChange('email')}
              values={values.email}
            />
            {errors.email && (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.email}
              </Text>
            )}
            <Text style={styles.TextInput}>Password</Text>
            <Input
              placeHolder={'Password'}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              values={values.password}
            />
            {errors.password && (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Sign In</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.have}>Belum Punya Akun?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={styles.log}>Register</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 170,
  },
  HeadTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
  },
  errortxt: {},
  TextInput: {
    left: 41,
  },
  button: {
    top: 40,
    marginBottom: 40,
    width: 100,
    height: 50,
    backgroundColor: '#827397',
    borderRadius: 10,
    marginHorizontal: 150,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
  have: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  log: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4D4C7D',
    left: 4,
  },
});
