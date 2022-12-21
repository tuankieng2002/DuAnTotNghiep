import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles/StyleFilter';

const Filter = props => {
  const {navigation} = props;

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Pressable style={styles.text}>
          <Text>{item.categories}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filter}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
              position: 'relative',
            }}>
            Filters
          </Text>
        </View>
        <Pressable
          onPress={navigation.goBack}
          style={{position: 'absolute', left: 20, width: 24, height: 24}}>
          <Image source={require('../../../../assets/images/backblack.png')} />
        </Pressable>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.all}>
          <Text style={styles.textContent}>CATEGORIES</Text>
          <Text style={styles.textClear}>CLEAR ALL</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={Math.random}
          numColumns={3}
          showVerticalScrollIndicator={false}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.all}>
          <Text style={styles.textContent}>DIETARY</Text>
          <Text style={styles.textClear}>CLEAR ALL</Text>
        </View>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={Math.random}
          numColumns={3}
          showVerticalScrollIndicator={false}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.all}>
          <Text style={styles.textContent}>PRICE RANGE</Text>
          <Text style={styles.textClear}>CLEAR ALL</Text>
        </View>
        <FlatList
          data={data2}
          renderItem={({item}) => (
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                marginLeft: 20,
                marginTop: 20,
              }}>
              <Text>{item.categories}</Text>
            </View>
          )}
          keyExtractor={Math.random}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 40,
        }}>
        <Pressable style={styles.button}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
            APPLY FILTERS
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Filter;

var data = [
  {
    id: 1,
    categories: 'Orran',
  },
  {
    id: 2,
    categories: 'Chandler',
  },
  {
    id: 3,
    categories: 'Eberhard',
  },
  {
    id: 4,
    categories: 'Frances',
  },
  {
    id: 5,
    categories: 'Heather',
  },
  {
    id: 6,
    categories: 'Madelina',
  },
  {
    id: 7,
    categories: 'Konstantin',
  },
  {
    id: 8,
    categories: 'Celle',
  },
  {
    id: 9,
    categories: 'Dominick',
  },
];

var data1 = [
  {
    id: 1,
    categories: 'Orran',
  },
  {
    id: 2,
    categories: 'Chandler',
  },
  {
    id: 3,
    categories: 'Eberhard',
  },
  {
    id: 4,
    categories: 'Frances',
  },
];

var data2 = [
  {
    id: 1,
    categories: '$',
  },
  {
    id: 2,
    categories: '$$',
  },
  {
    id: 3,
    categories: '$$$',
  },
  {
    id: 4,
    categories: '$$$$',
  },
  {
    id: 5,
    categories: '$$$$$',
  },
];
