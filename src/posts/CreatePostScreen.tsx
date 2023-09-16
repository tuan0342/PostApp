import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  RootNavigationProp,
  RootRouteProp,
  Routes,
} from '../base/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import colors from '../base/utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ChoiceBottomSheet, {
  ChoiceBottomSheetRefProps,
} from '../base/components/ChoiceBottomSheet';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import distances from '../base/utils/distances';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../base/types/user';

interface Props {
  navigation: RootNavigationProp<Routes.CreatePost>;
  route: RootRouteProp<Routes.CreatePost>;
}

const CreatePostScreen: React.FC<Props> = props => {
  const navigation = useNavigation<RootNavigationProp<Routes.CreatePost>>();
  const [title, setTitle] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [imagesList, setImagesList] = useState<string[]>([]);

  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState(0);

  const isValidation = () => {
    return title!.trim().length > 0 && caption!.trim().length > 0;
  };

  const ref = useRef<ChoiceBottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  const imageFromLibrary = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        if (imagesList!.length > 0) {
          //@ts-ignore
          setImagesList([...imagesList, response.assets[0].uri]);
        } else {
          //@ts-ignore
          setImagesList([response.assets[0].uri]);
        }
        ref?.current?.scrollTo(0);
        // let blob = await fetch(response.assets[0].uri).then(r => r.blob());
        // setBlob(blob);
      }
    });
  };

  const imageFromCamera = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        if (imagesList!.length > 0) {
          //@ts-ignore
          setImagesList([...imagesList, response.assets[0].uri]);
        } else {
          //@ts-ignore
          setImagesList([response.assets[0].uri]);
        }
        ref?.current?.scrollTo(0);
        // let blob = await fetch(response.assets[0].uri).then(r => r.blob());
        // setBlob(blob);
      }
    });
  };

  //@ts-ignore
  const renderImage = (image, index) => {
    return (
      <View key={index.toString()}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  const submitImages = async () => {
    const uploadUri = imagesList[0];
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + extension;

    const myInfoJson = await AsyncStorage.getItem('infoUser');
    const myInfo: User = myInfoJson != null ? JSON.parse(myInfoJson) : null;

    setUploading(true);
    setTransferred(0);

    const task = storage()
      .ref(`images/${myInfo.id}/${filename}`)
      .putFile(uploadUri);

    //set transferred state
    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      setUploading(false);
      Alert.alert(
        'Image uploaded',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully',
      );
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(imagesList);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{width: 24, marginLeft: 20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={23} color={colors.marsBlack} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonNext, isValidation() && styles.buttonVisible]}
            // disabled={isValidation() == false}
            // onPress={() => {
            // navigation.navigate(Routes.Hashtag, {});
            // }}>
            onPress={submitImages}>
            <Text
              style={[styles.textNext, isValidation() && styles.textVisible]}>
              Tiếp
            </Text>
          </TouchableOpacity>
        </View>
        {uploading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text>{transferred} % completed</Text>
            <ActivityIndicator size={'large'} color={'#0000ff'} />
          </View>
        )}
        <ScrollView
          style={styles.bodyContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.addImages}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={onPress}>
              <Icon name="image" size={23} color={colors.marsBlack} />
              <Text
                style={{
                  fontSize: 15,
                  width: 90,
                  marginLeft: 10,
                  color: colors.marsBlack,
                }}>
                Thêm ảnh
              </Text>
              <Icon name="chevron-right" size={23} color={'#A4A4A4'} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.title}
            // onChangeText={text => {
            //   setTitle(text);
            // }}
            onEndEditing={nativeEvent => {
              setTitle(nativeEvent.nativeEvent.text);
            }}
            placeholder="Vui lòng nhập tiêu đề (bắt buộc)"
            placeholderTextColor={'#A3A3A3'}
          />
          <View
            style={{height: 2, backgroundColor: colors.primary, width: '100%'}}
          />
          <TextInput
            style={styles.caption}
            // onChangeText={text => {
            //   setCaption(text);
            // }}
            onEndEditing={nativeEvent => {
              setCaption(nativeEvent.nativeEvent.text);
            }}
            placeholder="Vui lòng nhập văn bản"
            placeholderTextColor={'#A3A3A3'}
            multiline
          />
          <View>{imagesList.length > 0 && imagesList.map(renderImage)}</View>
        </ScrollView>
        <ChoiceBottomSheet ref={ref}>
          <TouchableOpacity
            onPress={imageFromCamera}
            style={styles.buttonGetImage}>
            <View style={styles.buttonGetImageIcon}>
              <Icon name="camera" size={20} color={colors.marsBlack} />
            </View>
            <Text style={styles.textGetImage}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={imageFromLibrary}
            style={styles.buttonGetImage}>
            <View style={styles.buttonGetImageIcon}>
              <Icon name="image" size={20} color={colors.marsBlack} />
            </View>
            <Text style={styles.textGetImage}>Mở thư viện</Text>
          </TouchableOpacity>
        </ChoiceBottomSheet>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonNext: {
    marginLeft: 'auto',
    right: 30,
    width: 50,
    height: 30,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonVisible: {
    backgroundColor: '#f8d3d6',
  },
  textVisible: {
    color: colors.primary,
  },
  textNext: {fontSize: 14, color: '#999999'},
  bodyContainer: {
    flex: 0.9,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  caption: {fontSize: 18, marginTop: 10},
  addImages: {
    marginHorizontal: 2,
    height: 40,
    width: 160,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonGetImage: {
    marginHorizontal: 20,
    marginVertical: 6,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  buttonGetImageIcon: {
    height: 40,
    aspectRatio: 1,
    backgroundColor: '#DCDCDC',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGetImage: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    color: colors.marsBlack,
  },
  image: {
    width: distances.width - 50,
    height: 200,
    borderWidth: 2,
    borderColor: '#4C3D3D',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default CreatePostScreen;
