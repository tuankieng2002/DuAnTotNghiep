import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  NavHeader,
  Space,
  TextInput,
  Button,
  ModalBottom,
  Border
} from '../../components';
import { KeyboardScrollUpForms, useForm } from '../../utils';

const Bio = ({ navigation, route }) => {

  const [isModalReset, setModalReset] = useState(false);

  const toggleModal = () => {
    setModalReset(!isModalReset);
  };

  const [formReset, setFormReset] = useForm({
    passwordOld: '',
    passwordNew: '',
    _id: route.params._id,
  });

  const [form, setForm] = useForm({
    email: route.params.email,
    name: route.params.name,
    phone: route.params.phone,
  });

  const EditUser = () => {
    console.log(form.email)
    console.log(form.name)
    console.log(form.phone)
  }

  const ResetPassword = () => {
    console.log(formReset._id)
    console.log(formReset.passwordOld)
    console.log(formReset.passwordNew)
    setModalReset(false)
  }

  const space_height = Dimensions.get('screen').height / 28;

  return (
    <SafeAreaView style={styles.page}>
      <NavHeader title={'Profile'} navigation={navigation}>
      </NavHeader>
      <KeyboardScrollUpForms
        enabled
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <Space height={space_height} />
          <View style={styles.mainContainer}>
            <TextInput
              label="Email"
              placeholder={route.params.email}
              onChangeText={e => setForm('email', e)}
            />
            <Space height={10} />
            <TextInput
              label="Name"
              placeholder={route.params.name}
              onChangeText={e => setForm('name', e)}
            />
            <Space height={10} />
            <TextInput
              label="Phone"
              placeholder={route.params.phone}
              onChangeText={e => setForm('phone', e)}
            />
            <Space height={30} />

            <Button
              label="Change"
              radius={6}
              txtSize={14}
              bgColor="#0030FF"
              padSizeX={20}
              borderWidth={0}
              fontFam="CircularStd-Bold"
              txtDecorationLine="none"
              onPress={EditUser}
            />
            <Space height={50} />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ borderBottomWidth: 1, fontSize: 16 }}
                onPress={toggleModal}
              >Reset Password</Text>
            </View>
          </View>
        </ScrollView>
        <ModalBottom
          isVisible={isModalReset}
          showButton={false}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          showSwipeCloseButton={true}
          useNativeDriverForBackdrop
          swipeDirection={['down']}>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <TextInput
                  label="Mật khẩu cũ"
                  placeholder="Password Old"
                  secureTextEntry
                  onChangeText={e => setFormReset('passwordOld', e)}
                />
                <Space height={10} />
                <TextInput
                  label="Mật khẩu mới"
                  placeholder="Password New"
                  secureTextEntry
                  onChangeText={e => setFormReset('passwordNew', e)}
                />
                <Space height={10} />
              </View>
            </TouchableOpacity>
            <Border height={1} />
            <TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <Button
                  label='Submit'
                  radius={6}
                  txtSize={14}
                  bgColor="#0030FF"
                  padSizeX={20}
                  borderWidth={0}
                  fontFam="CircularStd-Bold"
                  txtDecorationLine="none"
                  onPress={ResetPassword}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ModalBottom>
      </KeyboardScrollUpForms>
    </SafeAreaView>
  );
};

export default Bio;

const styles = StyleSheet.compose({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 24,
    marginTop: 0,
    flex: 1,
  },
  avaForm: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 30,
  },
  avaBorder: {
    borderRadius: 120,
    height: 120,
    width: 120,
    borderStyle: 'solid',
    borderColor: '#0030FF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAvaTextContainer: {
    borderRadius: 90,
    height: 100,
    width: 100,
    backgroundColor: '#0030FF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAvaText: {
    fontSize: 14,
    fontFamily: 'CircularStd-Bold',
    color: '#fff',
    textAlign: 'center',
  },
});
