import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../UserContext';

const Register = props => {
  const {navigation} = props;
  const [getPasswordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const {onRegister} = useContext(UserContext);

  const isEmail = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return emailRegex.test(email); //test là hàm kiểm tra chuỗi có khớp với regex hay không trả về true hoặc false nếu khớp hoặc không khớp với regex tương ứng
  };

  const register = async () => {
    if (
      !email ||
      !password ||
      !fullName ||
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      fullName.trim().length == 0
    ) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    } else if (!isEmail()) {
      ToastAndroid.show('Email không hợp lệ', ToastAndroid.CENTER);
      return;
    } else if (password.length < 8) {
      ToastAndroid.show(
        'Mật khẩu phải có ít nhất 8 ký tự',
        ToastAndroid.CENTER,
      );
      return;
    }

    const res = await onRegister(email, password, fullName);
    if (res == false) {
      ToastAndroid.show('Đăng ký không thành công', ToastAndroid.CENTER);
    } else {
      ToastAndroid.show('Đăng ký thành công', ToastAndroid.CENTER);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.textContainer}>
        <View style={styles.backContainer}>
          <Text style={styles.forgotContainer}>Create Account</Text>
        </View>

        <View style={styles.imageContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              resizeMode="cover"
              source={require('../../../../assets/images/back.png')}
            />
          </Pressable>
        </View>

        <Text style={styles.forgotPassContainer}>Create Account</Text>

        <View style={styles.EnterContainer}>
          <Text style={styles.enter}>Enter your Name, Email and Password</Text>
          <View style={styles.createContainer}>
            <Text style={styles.dontaccount}>for sign up. </Text>
            <Text
              style={styles.create}
              onPress={() => navigation.navigate('Login')}>
              Already have account?
            </Text>
          </View>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Full Name"
            style={styles.textInput}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Password"
            style={styles.textinput}
            secureTextEntry={getPasswordVisible ? false : true}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!getPasswordVisible);
            }}>
            {getPasswordVisible ? (
              <Image
                style={styles.imageEmail}
                resizeMode="cover"
                source={require('../../../../assets/images/invisible.png')}
              />
            ) : (
              <Image
                style={styles.imageEmail}
                resizeMode="cover"
                source={require('../../../../assets/images/invisible.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => register()} style={styles.button}>
          <Text style={styles.signIn}>SIGN UP</Text>
        </Pressable>

        <View style={styles.bySignIn}>
          <Text style={styles.dontaccount}>
            By Signing up you agree to our Terms
          </Text>
          <Text> Conditions & Privacy Policy.</Text>
        </View>
        <View style={styles.orContainer}>
          <Text style={styles.or}>Or</Text>
        </View>
        <View style={styles.socialNetworkContainer}>
          <TouchableOpacity style={styles.facebookContainer}>
            <Image
              style={styles.imageFacebook}
              resizeMode="cover"
              source={require('../../../../assets/images/facebook.png')}
            />
            <Text style={styles.textFacebook}>CONNECT WITH FACEBOOK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookContainer}>
            <Image
              style={styles.imageFacebook}
              resizeMode="cover"
              source={require('../../../../assets/images/google.png')}
            />
            <Text style={styles.textFacebook}>CONNECT WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    // marginLeft: 20,
    alignItems: 'center',
  },
  backContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 10,
  },
  forgotContainer: {
    color: '#010F07',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassContainer: {
    fontSize: 34,
    color: '#010F07',
    marginTop: 41,
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
  },
  EnterContainer: {
    marginTop: 20,
  },
  enter: {
    color: '#868686',
    fontSize: 16,
  },
  textInputContainer: {
    paddingLeft: 28,
    marginVertical: 6,
    borderRadius: 15,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    height: 57,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    width: 350,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    width: '100%',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#22A45D',
    width: 350,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    color: 'white',
  },
  createContainer: {
    flexDirection: 'row',
    marginBottom: 34,
  },
  dontaccount: {
    fontSize: 16,
  },
  create: {
    color: '#22A45D',
    fontSize: 16,
  },
  textinput: {
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  orContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bySignIn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialNetworkContainer: {
    marginHorizontal: 10,
    position: 'relative',
  },
  imageFacebook: {
    marginLeft: 22,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  textFacebook: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  facebookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#395998',
    borderRadius: 15,
    width: 335,
    height: 44,
    elevation: 8,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
});
