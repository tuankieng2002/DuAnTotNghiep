import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Switch} from 'react-native';
import {UserContext} from '../../users/UserContext';

const ProfileStack = props => {
  const {navigation} = props;

  const [switchVal, setSwitchVal] = useState(false);
  const [switchVal1, setSwitchVal1] = useState(false);
  const [switchVal2, setSwitchVal2] = useState(false);

  const {onLogout} = useContext(UserContext);

  const logout = () => {
    onLogout();
    ToastAndroid.showWithGravity(
      'Logout successfully',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={styles.profileCtn}>
      <View style={styles.settingCtn}>
        <Text style={styles.textSetting}>Account Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.upDate}>
            Update your settings like notifications,
          </Text>
          <Text style={styles.upDate}>payments, profile edit etc.</Text>
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/user.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Profile Information</Text>
            <Text style={styles.Textprofile}>
              Change your account information
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate('ProfileInformation')}>
            <Image
              style={styles.image2}
              resizeMode="cover"
              source={require('../../../../assets/images/arrow.png')}
            />
          </Pressable>
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/lock.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Change Password</Text>
            <Text style={styles.Textprofile}>Change your password</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('ChangePassword')}>
            <Image
              style={styles.image2}
              resizeMode="cover"
              source={require('../../../../assets/images/arrow.png')}
            />
          </Pressable>
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/card.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Payment Methods</Text>
            <Text style={styles.Textprofile}>
              Add your credit & debit cards
            </Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/marker.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Locations</Text>
            <Text style={styles.Textprofile}>
              Add or remove your delivery locations
            </Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/iconfacebook.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Add Social Account</Text>
            <Text style={styles.Textprofile}>Add Facebook, Twitter etc</Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/refer.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Refer to Friends</Text>
            <Text style={styles.Textprofile}>
              Get $10 for reffering friends
            </Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.notifiCtn}>
          <Text style={styles.textNotifi}>NOTIFICATIONS</Text>
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/ring.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Refer to Friends</Text>
            <Text style={styles.Textprofile}>
              Get $10 for reffering friends
            </Text>
          </View>
          <Switch
            rackColor={{false: '#868686', true: '#22A45D'}}
            thumbColor={switchVal ? '#22A45D' : '#868686'}
            onValueChange={() => setSwitchVal(prevVal => !prevVal)}
            value={switchVal}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/ring.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>SMS Notifications</Text>
            <Text style={styles.Textprofile}>
              Get $10 for reffering friends
            </Text>
          </View>
          <Switch
            rackColor={{false: '#868686', true: '#22A45D'}}
            thumbColor={switchVal1 ? '#22A45D' : '#868686'}
            onValueChange={() => setSwitchVal1(prevVal => !prevVal)}
            value={switchVal1}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/ring.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Promotional Notifications</Text>
            <Text style={styles.Textprofile}>
              Get $10 for reffering friends
            </Text>
          </View>
          <Switch
            rackColor={{false: '#868686', true: '#22A45D'}}
            thumbColor={switchVal2 ? 'white' : 'white'}
            onValueChange={() => setSwitchVal2(prevVal => !prevVal)}
            value={switchVal2}
          />
        </View>

        <View style={styles.notifiCtn}>
          <Text style={styles.textNotifi}>MORE</Text>
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={{height: 15, width: 15}}
            resizeMode="cover"
            source={require('../../../../assets/images/Star.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Rate Us</Text>
            <Text style={styles.Textprofile}>Rate us playstore, appstor</Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/document.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>FAQ</Text>
            <Text style={styles.Textprofile}>Frequently asked questions</Text>
          </View>
          <Image
            style={styles.image2}
            resizeMode="cover"
            source={require('../../../../assets/images/arrow.png')}
          />
        </View>

        <View style={styles.imageCtn}>
          <Image
            style={styles.image1}
            resizeMode="cover"
            source={require('../../../../assets/images/logout.png')}
          />
          <View style={styles.profileInfCtn}>
            <Text style={styles.profileInf}>Logout</Text>
          </View>
          <Pressable onPress={() => logout()}>
            <Image
              style={styles.image2}
              resizeMode="cover"
              source={require('../../../../assets/images/arrow.png')}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  profileCtn: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  settingCtn: {
    marginBottom: 20,
  },
  textSetting: {
    fontSize: 28,
    color: '#010F07',
    fontWeight: 'bold',
  },
  upDate: {
    fontSize: 16,
    color: '#868686',
  },
  imageCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  image1: {
    opacity: 0.6,
    height: 15,
    width: 15,
  },
  image2: {
    marginTop: 10,
  },
  profileInfCtn: {
    marginLeft: 20,
    flex: 1,
  },
  profileInf: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#010F07',
  },
  notifiCtn: {
    marginTop: 44,
  },
  textNotifi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#868686',
  },
  Textprofile: {
    color: '#868686',
  },
});

