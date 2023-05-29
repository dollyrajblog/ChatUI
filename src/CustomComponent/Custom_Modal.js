import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { androidPermission } from '../utils/permissions';

const Custom_Modal = props => {
  const [modalVisible, setModalVisible] = useState(props.pass);
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      props.onDismiss(); // for dismiss modal
      props.SetImages_name( res[0].uri); /// for set images
      // console.log(
      //   res[0].name,
      //   res,
      //   // res.uri,
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancel');
      } else {
        throw err;
      }
    }
  };
  const pickAudio = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const pickGallery = async() => {
    const permisssion= await androidPermission();
    console.log(permisssion, " androidPermission ")
    // if(permisssion)
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(abc => {
        console.log(abc);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const pickCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        props.SetImages_name(image.path);
        props.onDismiss();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0}
      onBackdropPress={props.onDismiss}
      style={{flex: 1, justifyContent: 'flex-end'}}>
      <View
        style={{
          height: 200,
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 20,
          elevation: 2,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={pickDocument}
              style={[styles.icon_style, {backgroundColor: 'blue'}]}>
              <Ionicons name={'document'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.txtstyle}>Document</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={pickCamera}
              style={[styles.icon_style, {backgroundColor: 'pink'}]}>
              <Ionicons name={'camera'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.txtstyle}>Camera</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={pickGallery}
              style={[styles.icon_style, {backgroundColor: 'darkviolet'}]}>
              <FontAwesome name={'photo'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.txtstyle}>Gallery</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={pickAudio}
              style={[styles.icon_style, {backgroundColor: 'red'}]}>
              <FontAwesome name={'music'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.txtstyle}>Music</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Custom_Modal;
const styles = StyleSheet.create({
  icon_style: {
    height: 50,
    width: 50,
    borderRadius: 100,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtstyle: {
    fontSize: 10,
    color: '#000',
  },
});
