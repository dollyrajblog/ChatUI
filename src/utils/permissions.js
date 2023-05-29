import {PermissionsAndroid, Platform} from 'react-native';
export const androidPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        console.log(granted, 'granted response');
        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted' ||
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !==
            'granted' ||
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !==
            'granted'
        ) {
          //   showError("Don't have require Perssion, Please allow");
          console.log(
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted',
            granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !==
              'granted',
            granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !==
              'granted',
          );
          return resolve(false);
        }
        return resolve(true);
      }
      return resolve(true);
    } catch (err) {
      return resolve(err);
    }
  });
