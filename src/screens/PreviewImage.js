import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SetStarIcon} from '../Redux/Action';
const PreviewImage = ({route, navigation}) => {
  //   console.log(route.params.imagename);
  const dispatch = useDispatch();
  const star = useSelector(state => state.starIcon);
  const check = useSelector(state => state.theme);
  const [showHeader, setShowHeader] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={check === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={check === 'light' ? '#fff' : '#000'}
        hidden={showHeader?false:true}
      />
      {showHeader ? (
        <View
          style={{
            backgroundColor: '#000',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 80,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{color: '#fff'}}>name</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              width: 120,
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('==>'), dispatch(SetStarIcon());
              }}>
              <FontAwesome
                name={star ? 'star-o' : 'star'}
                size={24}
                color={'#fff'}
              />
            </TouchableOpacity>
            <FontAwesome name="share" size={24} color={'#fff'} />
            <Feather name="more-vertical" size={24} color={'#fff'} />
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => setShowHeader(!showHeader)}>
        <Image
          source={{uri: route.params.imagename}}
          style={{flex: 1, marginTop: 2}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PreviewImage;
const styles = StyleSheet.create({});
