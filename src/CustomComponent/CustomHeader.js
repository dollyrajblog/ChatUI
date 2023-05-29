import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {SetClearAll} from '../Redux/Action';
const CustomHeader = ({navigation, name, clearAll}) => {
  const dispatch = useDispatch();
  const check = useSelector(state => state.theme);
  const MenuModal = () => {
    return (
      <Modal
        isVisible={useSelector(state => state.clearAllmodal)}
        onBackdropPress={() => dispatch(SetClearAll(false))}
        backdropOpacity={0}
        animationIn={'slideInDown'}
        style={{flex: 1, justifyContent: 'flex-start'}}>
        <View
          style={{
            backgroundColor: check === 'light' ? '#fff' : '#000',
            width: '30%',
            height: 30,
            alignSelf: 'flex-end',
            elevation: 1,
            borderRadius: 2,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <TouchableOpacity onPress={clearAll}>
            <Text style={{color: check === 'light' ? '#000' : '#fff'}}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <View
      style={{
        height: 45,
        backgroundColor: check === 'light' ? 'darkgrey' : '#000',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={24} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/Images/woman.png')}
            style={{height: 40, width: 40, borderRadius: 100}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#fff',
          marginLeft: -20,
        }}>
        {name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(SetClearAll(true));
        }}>
        <Entypo name={'dots-three-vertical'} size={16} color={'#fff'} />
      </TouchableOpacity>
      {useSelector(state => state.theme) ? <MenuModal /> : null}
    </View>
  );
};
export default CustomHeader;
