import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import {
  NavHeader,
  Button
} from '../../components';

import { KeyboardScrollUpForms, useForm } from '../../utils';

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'
}

const Comment = ({ navigation, route }) => {

  const [form, setForm] = useForm({
    comment: '',
  });

  const comment = () => {
    console.log(form.comment)
  }

  const cart = route.params;

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardScrollUpForms
        enabled
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: 'white' }}>
            <NavHeader title={'Đánh giá'} navigation={navigation}>
            </NavHeader>
          </View>
          <View style={{ paddingHorizontal: 30, marginTop: 10 }}>
            {cart.map(item => (
              <View key={item._id} style={{
                paddingHorizontal: 30,
                paddingVertical: 30,
                backgroundColor: 'white',
                marginBottom: 10,
                marginTop: 10,
                borderRadius: 10
              }}>
                <View style={{ flexDirection: 'row', }}>
                  <Image style={{ height: '100%', width: 150 }} source={{ uri: item.product_id.image }} />
                  <View style={{ paddingLeft: 30, width: '50%' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>{item.product_id.name}</Text>
                    <Text>{currencyFormat(item.product_id.price)}</Text>
                    <Text>{item.product_id.description}</Text>
                  </View>
                </View>
                <Text style={{ marginTop: 20, color: 'green', fontSize: 16 }}>Đánh giá</Text>
                <View style={styles.textAreaContainer} >
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập đánh giá"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={value => setForm('comment', value)}
                  />
                </View>
                <Button
                  label='Gửi đánh giá'
                  radius={6}
                  txtSize={14}
                  bgColor="#D0770B"
                  padSizeX={15}
                  borderWidth={0}
                  fontFam="CircularStd-Bold"
                  txtDecorationLine="none"
                onPress={comment}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardScrollUpForms>
    </SafeAreaView>
  );
};

export default Comment;

const styles = StyleSheet.compose({
  page: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  textAreaContainer: {
    borderColor: '#D7D7D7',
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    backgroundColor: 'snow',
    marginBottom: 10
  },
  textArea: {
    height: 70,
    justifyContent: "flex-start"
  }
});
