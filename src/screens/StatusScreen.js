import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Svg} from 'react-native-svg';
import {AnimatedFAB} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
const {height, width} = Dimensions.get('screen');
const data = [
  {id: 1, data: 'statsu'},
  {id: 2, data: 'statsu'},
  {id: 3, data: 'statsu'},
  {id: 4, data: 'statsu'},
  {id: 5, data: 'statsu'},
];
// console.log(height * 0.08);k
const StatusScreen = ({navigation}) => {
  // console.log('navigation', navigation.navigate);
  const RenderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <Image
          source={require('../assets/Images/developer.png')}
          style={styles.imageView}
        />
        <View style={{marginLeft: 10}}>
          <Text>{item.data}</Text>
          <Text>{item.data}</Text>
        </View>
      </View>
    );
  };
  // ===== Camera ======
  const pickCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      mediaType:'any',
      
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.itemView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('StatusPlay')}
            style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image
              source={require('../assets/Images/developer.png')}
              style={styles.imageView}
            />
            <View style={{marginLeft: 10}}>
              <Text>My status</Text>
              <Text>Tap to add status update</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text>Recently updates</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={item => RenderItem(item)}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
        <Text>View updates</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={item => RenderItem(item)}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
      </ScrollView>
      <AnimatedFAB
        icon={'camera'}
        label={'Label'}
        // extended={isExtended}
        onPress={() => pickCamera()}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={styles.fabStyle}
        variant="tertiary"
        color="#000"
      />
    </SafeAreaView>
  );
};
export default StatusScreen;
const styles = StyleSheet.create({
  itemView: {
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'white',
  },

  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
