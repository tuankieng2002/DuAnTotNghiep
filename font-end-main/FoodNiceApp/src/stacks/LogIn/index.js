import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {Space, Header, Button, TextInput, NavHeader} from '../../components';
import FlashMessage from 'react-native-flash-message';
import {KeyboardScrollUpForms, useForm} from '../../utils';
import {authLoginAction} from '../../redux/actions/auth';
import AwesomeAlert from 'react-native-awesome-alerts';

const LogIn = ({navigation, route}) => {
  const [showAlert, setShowAlert] = useState(false);

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    authLoginAction(form, navigation);
  };

  const space = Dimensions.get('screen').height / 28;

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardScrollUpForms
        enabled
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        {Platform.OS === 'android' && <StatusBar backgroundColor="#000000" />}
        <NavHeader
          borderWidth={0}
          showSpaceLeft={true}
          navGoBack={false}
          title="">
          {route.params === 'success_register' ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Start Screen')}>
              <Image source={require('../../assets/icons/previous.png')} />
            </TouchableOpacity>
          )}
        </NavHeader>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <Space height={space} />
          <Header
            title="Login"
            desc="For buying drinks and beverages, login first. 🤝"
          />
          <View style={styles.container}>
            <TextInput
              label="Email"
              placeholder="abc@gmail.com"
              onChangeText={value => setForm('email', value)}
            />
            <Space height={30} />
            <TextInput
              label="Password"
              placeholder="******"
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Space height={50} />
            <Button
              label="Log In"
              radius={6}
              txtSize={14}
              bgColor="#0030FF"
              padSizeX={20}
              borderWidth={0}
              fontFam="CircularStd-Bold"
              txtDecorationLine="none"
              onPress={onSubmit}
            />
            <Space height={40} />
            <Button
              label="Forgot Password"
              txtSize={12}
              radius={0}
              borderWidth={0}
              bgColor="#fff"
              textColor="#0030FF"
              fontFam="CircularStd-Bold"
              onPress={() => navigation.navigate('Register')}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '80%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#000',
                borderRadius: 6,
                backgroundColor: 'green',
              }}>
              <Image source={require('../../assets/images/google.png')} />
              <Text style={{marginLeft: 10, color: '#fff'}}>Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardScrollUpForms>
      <FlashMessage
        textStyle={{fontFamily: 'CircularStd-Bold'}}
        hideOnPress={true}
        duration={4000}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={true}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.compose({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: 0,
    flex: 1,
  },
});

export default LogIn;
