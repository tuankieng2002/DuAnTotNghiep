import React from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

const Icon = ({ label, focus }) => {
  switch (label) {
    case 'Home':
      return focus ? <Image source={require('../../../assets/icons/icon_home_active.png')} /> : <Image source={require('../../../assets/icons/icon_home.png')} />;
    case 'Search':
      return focus ? <Image source={require('../../../assets/icons/icon_search_active.png')} /> : <Image source={require('../../../assets/icons/icon_search.png')} />;
    case 'Cart':
      return focus ? <Image source={require('../../../assets/icons/icon_cart_active.png')} /> : <Image source={require('../../../assets/icons/icon_cart.png')} />;
    case 'Favorite':
      return focus ? <Image source={require('../../../assets/icons/icon-favorite-active.png')} /> : <Image source={require('../../../assets/icons/icon-favorite.png')} />;
    case 'Profile':
      return focus ? <Image source={require('../../../assets/icons/icon_profile_active.png')} /> : <Image source={require('../../../assets/icons/icon_profile.png')} />;
    default:
      return <Image source={require('../../../assets/icons/icon_home.png')} />;
  }
};

const BottomNav = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 0.5,
          borderTopColor: '#efefef',
          minHeight: 40,
          paddingTop: 6,
          paddingBottom: 6,
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableScale
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}>
              <View>
                <Icon label={label} focus={isFocused} />
              </View>

              <Text
                style={{
                  color: '#000',
                  fontFamily: isFocused
                    ? 'CircularStd-Bold'
                    : 'CircularStd-Book',
                  fontSize: 10,
                  textAlign: 'center',
                }}>
                {label}
              </Text>
            </TouchableScale>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomNav;
