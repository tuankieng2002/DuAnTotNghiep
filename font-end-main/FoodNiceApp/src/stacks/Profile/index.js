import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {IconTextNav, ModalCenterTwoButton, Space} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useScrollToTop} from '@react-navigation/native';
import {getData} from '../../utils';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const ref = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [get_user_profile, Set_user_profile] = useState([]);

  const commingsoon = () => {
    showMessage({
      message: '🚨',
      type: 'success',
      description: 'Comming soon',
    });
  };

  useEffect(() => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `https://doantotnghiepfood.herokuapp.com/api/user/profile/${user._id}`,
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          Set_user_profile(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
    return () => {
      Set_user_profile([]);
    };
  }, []);

  console.log('data profile: ' + get_user_profile);

  useScrollToTop(ref);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const logout = () => {
    AsyncStorage.multiRemove(['user', 'token'])
      .then(() => {
        toggleModal();
      })
      .then(() => {
        navigation.reset({index: 0, routes: [{name: 'Start Screen'}]});
      });
  };

  return (
    <SafeAreaView style={styles.containerStack}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainerStack}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Account', get_user_profile)}>
            <View style={styles.avaNameEmailContainer}>
              <View style={styles.avaContainer}>
                <Image
                  source={{uri: get_user_profile.image}}
                  style={styles.avatar}
                />
              </View>
              <Space height={10} />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{get_user_profile.name}</Text>
              </View>
              <Space height={6} />
              <View style={styles.emailContainer}>
                <Text style={styles.email}>{get_user_profile.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Space height={50} />
          <View>
            <IconTextNav
              icon="🍃"
              text="Bio"
              onPress={() => navigation.navigate('Bio', get_user_profile)}
            />

            <IconTextNav
              icon="🚚"
              text="Order"
              onPress={() => navigation.navigate('Order')}
            />

            <IconTextNav icon="🔐" text="Security" onPress={commingsoon} />

            <IconTextNav icon="🤝" text="Help" onPress={commingsoon} />

            <Space height={10} />

            <View style={{backgroundColor: 'white'}}>
              <TouchableOpacity onPress={toggleModal}>
                <View style={{padding: 20, marginLeft: 10}}>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Bold',
                      color: 'red',
                      fontSize: 16,
                    }}>
                    🔐 Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalCenterTwoButton
        isVisible={isModalVisible}
        onPressYes={logout}
        onPressNo={toggleModal}>
        <Text style={styles.modalTitle}>
          Are you sure for out from this account?
        </Text>
      </ModalCenterTwoButton>
      <FlashMessage
        textStyle={{fontFamily: 'CircularStd-Bold'}}
        hideOnPress={true}
        duration={1000}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerStack: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    // paddingTop: 20,
  },
  subContainerStack: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  avaNameEmailContainer: {
    // flexDirection: 'column',
    // alignContent: 'center',
  },
  avaContainer: {
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 38,
    width: 100,
    height: 100,
  },
  nameContainer: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
  },
  emailContainer: {
    alignItems: 'center',
  },
  email: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
  },
  modalTitle: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    textAlign: 'center',
  },
});
