import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import socketServices from '../utils';
import {useSelector, useDispatch} from 'react-redux';
import {setMessage, SetClearAll} from '../Redux/Action';
import Custom_Modal from '../CustomComponent/Custom_Modal';
import CustomHeader from '../CustomComponent/CustomHeader';
import { fontsize } from '../utils/theme';
const ChatUI = ({route, navigation}) => {
  const dispatch = useDispatch();
  const check = useSelector(state => state.theme);
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const Scroll_ref = useRef();
  // ==== onDismiss ===
  const onDismiss = () => {
    console.log('====>onDismiss');
    setIsVisible(!isVisible);
  };
  // === set Images name ====
  const SetImages_name = (imageName) => {
    // setSend(txt);
    console.log('===url> ', imageName);
    setMessages(messages => [
      ...messages,
      {image: imageName, time: moment().format()},
    ]);
  };
  // ===== ONCHANGE ========
  const send_Msg = txt => {
    socketServices.emit('send_msg', {msg: txt, time: moment().format()});
    setSend('');
    // {
    //   messages.length >= 0
    //     ? setMessages(messages => [
    //         ...messages,
    //         {msg: txt, time: moment().format()},
    //       ])
    //     : setMessages([{msg: txt, time: moment().format()}]);
    // }
    // dispatch(setMessage([{msg: txt, time: moment().format()}]));
  };
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);
  useEffect(() => {
    socketServices.on('received_msg', data => {
      console.log('===> received_msg', data);
      {
        messages.length >= 0
          ? setMessages(messages => [...messages, data])
          : setMessages([data]);
      }
    });
  }, []);
  // ==== Clear all chats ====
  const clearAll = () => {
    dispatch(SetClearAll(false));
    console.log('====> clear all ');
    setMessages([]);
  };
  const RenderItem = ({item, index}) => {
    return (
      <View
        key={index + 1}
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          alignSelf: index % 2 != 0 ? 'flex-start' : 'flex-end',
        }}>
        {index % 2 != 0 ? (
          <View
            style={{
              backgroundColor: check === 'light' ? 'lightgrey' : '#fff',
              height: 12,
              width: 12,
              borderBottomLeftRadius: 100,
              marginRight: -8,
              marginTop: 5,
              alignSelf: 'flex-start',
            }}
          />
        ) : null}
        <TouchableOpacity
          style={[
            styles.txt_btn,
            {
              backgroundColor:
                index % 2 != 1
                  ? check === 'light'
                    ? 'darkblue'
                    : '#000'
                  : check === 'light'
                  ? 'lightgrey'
                  : '#fff',
            },
          ]}
          key={index}>
          {item.msg === undefined ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PreviewImage', {
                  imagename: item.image,
                  navigation: navigation,
                })
              }>
              <Image
                source={{uri: item.image}}
                style={{
                  backgroundColor: 'red',
                  height: 200,
                  width: 200,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: index % 2 != 1 ? '#fff' : '#000',
                marginRight: 4,
              }}>
              {item.msg}
            </Text>
          )}
          <Text
            style={{
              fontSize: 9,
              color: index % 2 != 1 ? '#fff' : '#000',
              alignSelf: 'flex-end',
            }}>
            {moment(item.time).format('hh:mm a')}
          </Text>
        </TouchableOpacity>
        {index % 2 != 1 ? (
          <View
            style={{
              backgroundColor: check === 'light' ? 'darkblue' : '#000',
              height: 12,
              width: 12,
              borderTopRightRadius: 100,
              marginLeft: -9,
              alignSelf: 'flex-end',
              marginBottom: 5,
              zIndex: 0,
            }}
          />
        ) : null}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={check === 'light' ? 'darkgrey' : '#000'}
        hidden={false}
      />
      <ImageBackground
        style={{flex: 1}}
        source={
          check === 'light'
            ? require('../assets/Images/whatsaap_bg.png')
            : require('../assets/Images/whatsaap_black.png')
        }
        resizeMode="cover">
        <CustomHeader
          name={route.params.name}
          navigation={navigation}
          clearAll={clearAll}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: 8,
            paddingTop: -8,
            // backgroundColor:"red"
          }}>
          {messages.length >= 1 ? (
            <FlatList
              data={messages}
              ref={Scroll_ref}
              keyExtractor={item => item.id}
              renderItem={item => RenderItem(item)}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => {
                messages.length >= 1
                  ? Scroll_ref.current.scrollToEnd({
                      animated: true,
                    })
                  : null;
              }}
              onLayout={() => Scroll_ref.current.scrollToEnd()}
            />
          ) : (
            <View></View>
          )}
          <View
            style={{
              backgroundColor: check === 'light' ? '#fff' : '#000',
              minHeight: 50,
              maxHeight: 100,
              borderRadius: 8,
              elevation: 2,
              paddingHorizontal: 8,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="send text..."
              multiline={true}
              placeholderTextColor={check === 'light' ? 'grey' : '#fff'}
              defaultValue={send}
              style={{
                flex: 1,
                fontSize: fontsize.font2,
                color: check === 'light' ? 'grey' : '#fff',
              // backgroundColor:"red"
              }}
              onChangeText={txt => setSend(txt)}
            />
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={{padding: 4, borderRadius: 100}}
              activeOpacity={0.1}>
              <FontAwesome
                name={'link'}
                color={check === 'light' ? 'darkblue' : '#fff'}
                size={16}
              />
            </TouchableOpacity>
            {send !== '' ? (
              <TouchableOpacity
                onPress={() => send_Msg(send)}
                style={{padding: 8, borderRadius: 100}}
                activeOpacity={0.1}>
                <FontAwesome
                  name={'send'}
                  color={check === 'light' ? 'darkblue' : '#fff'}
                  size={16}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {isVisible ? (
          <Custom_Modal
            pass={isVisible}
            onDismiss={onDismiss}
            SetImages_name={SetImages_name}
          />
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ChatUI;
const styles = StyleSheet.create({
  txt_btn: {
    marginVertical: 5,
    color: '#000',
    borderRadius: 10,
    paddingVertical: 3,
    minHeight: 20,
    paddingHorizontal: 5,
    zIndex: 1,
    maxWidth: 260,
  },
});
