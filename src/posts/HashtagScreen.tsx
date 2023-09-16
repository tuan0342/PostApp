import {
  ActivityIndicator,
  Alert,
  Image,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  RootNavigationProp,
  RootRouteProp,
  Routes,
} from '../base/types/navigation';
import {Hashtag, Post, PostClassification, UserPost} from '../base/types/post';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import colors from '../base/utils/colors';
import ChoiceBottomSheet, {
  ChoiceBottomSheetRefProps,
} from '../base/components/ChoiceBottomSheet';
import {hashtagHotList} from '../data/Posts';
import HashtagItem from './HashtagItem';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../base/types/user';
import images from '../base/utils/images';

interface Props {
  navigation: RootNavigationProp<Routes.Hashtag>;
  route: RootRouteProp<Routes.Hashtag>;
}

const HashtagScreen: React.FC<Props> = props => {
  const {title, caption, imagesList} = props.route.params;
  const navigation = useNavigation<RootNavigationProp<Routes.Hashtag>>();
  const [classification, setClassification] = useState<PostClassification>();
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [inputHashtag, setInputHashtag] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState(0);

  const listClassification = [
    PostClassification.CHARACTER,
    PostClassification.MOVIE,
    PostClassification.SPOILER,
    PostClassification.FAN_ART,
  ];

  const refClassification = useRef<ChoiceBottomSheetRefProps>(null);
  const refHashtag = useRef<ChoiceBottomSheetRefProps>(null);
  const imagesRef = useRef<string[]>([]);
  const hashtagRemoteRef = useRef<Hashtag[]>([]);

  const uploadImages = async (image: string) => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + extension;

    const myInfoJson = await AsyncStorage.getItem('infoUser');
    const myInfo: User = myInfoJson != null ? JSON.parse(myInfoJson) : null;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`images/${myInfo.id}/${filename}`);
    const task = storageRef.putFile(uploadUri);

    //set transferred state
    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      // setUploading(false);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getImageUrl = async () => {
    imagesList!.forEach(async element => {
      const imageUrl = await uploadImages(element);
      imagesRef.current.push(imageUrl!);
    });
  };

  const getHashtag = async () => {
    try {
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/hashtag`)
        .once('value')
        .then(async snapshot => {
          const hashtagObject = snapshot.val();
          const hashtagArray: Hashtag[] = Object.keys(hashtagObject).map(
            eachKey => {
              let eachObject = hashtagObject[eachKey];
              return {
                hashtag: eachObject.hashtag,
                count: eachObject.count,
                lastTimestamp: eachObject.lastTimestamp,
              };
            },
          );
          hashtagRemoteRef.current = hashtagArray;
        });
    } catch (e) {}
  };

  const uploadHashtag = async () => {
    const timestamp = Date.now();
    const hashtagsObject: Hashtag[] = hashtag.map(eachHashtag => {
      return {
        hashtag: eachHashtag,
        count: 1,
        lastTimestamp: timestamp,
      };
    });
    const hashtagRemoteCurrent = hashtagRemoteRef.current.map(value => {
      for (let i = 0; i < hashtagsObject.length; i++) {
        if (hashtagsObject[i].hashtag === value.hashtag) {
          hashtagsObject.splice(i, 1);
          return {
            hashtag: value.hashtag,
            count: value.count + 1,
            lastTimestamp: timestamp,
          };
        }
      }
      return {
        hashtag: value.hashtag,
        count: value.count,
        lastTimestamp: timestamp,
      };
    });
    let hashtagArrayRemote;
    if (hashtagsObject.length > 0) {
      hashtagArrayRemote = hashtagRemoteCurrent.concat(hashtagsObject);
    }
    hashtagArrayRemote = hashtagArrayRemote!.sort(
      (item1, item2) => -item1!.count + item2!.count,
    );
    await firebase
      .app()
      .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
      .ref(`/hashtag`)
      .set(hashtagArrayRemote)
      .then(() => {});
  };

  const uploadPost = async () => {
    try {
      const myInfoJson = await AsyncStorage.getItem('infoUser');
      const myInfo: User = myInfoJson != null ? JSON.parse(myInfoJson) : null;
      const owner: UserPost = {
        name: myInfo.name!,
        avatar: myInfo.avatar!,
        id: myInfo.id!,
        email: myInfo.email,
      };
      const timestamp = Date.now();
      const postInfo: Post = {
        id: myInfo.id! + timestamp + '',
        title: title!,
        cap: caption!,
        images: imagesRef.current,
        comment: [],
        owner: owner,
        like: [],
        hashtag: hashtag,
        classification: classification,
        timestamp: timestamp,
      };
      setUploading(false);
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/myPosts/${myInfo.id}/${myInfo.id! + timestamp}`)
        .set(postInfo)
        .then(() => {});
      await firebase
        .app()
        .database('https://post-app-505ea-default-rtdb.firebaseio.com/')
        .ref(`/allPosts/${myInfo.id! + timestamp}`)
        .set(postInfo)
        .then(() => {
          Alert.alert(
            'Bài đã được đăng',
            'Bài viết của bạn đã được đăng thành công',
            [
              {
                text: 'OK',
                onPress: async () => {
                  // navigation.navigate(Routes.BottomTab, {});
                  uploadHashtag();
                },
              },
            ],
          );
        });
    } catch (e) {}
  };

  const submitPost = async () => {
    await getImageUrl();
    setTimeout(() => {
      uploadPost();
    }, 4000);
  };

  const onPressSelectClassification = useCallback(() => {
    const isActive = refClassification?.current?.isActive();
    if (isActive) {
      refClassification?.current?.scrollTo(0);
    } else {
      refClassification?.current?.scrollTo(-400);
    }
  }, []);

  const onPressSelectHashtag = useCallback(() => {
    const isActive = refHashtag?.current?.isActive();
    if (isActive) {
      refHashtag?.current?.scrollTo(0);
    } else {
      refHashtag?.current?.scrollTo(-600);
    }
  }, []);

  const isValidation = () => {
    return (
      hashtag!.length > 0 &&
      (classification === PostClassification.CHARACTER ||
        classification === PostClassification.FAN_ART ||
        classification === PostClassification.MOVIE ||
        classification === PostClassification.SPOILER)
    );
  };

  const onPressClassification = (item: PostClassification) => {
    refClassification?.current?.scrollTo(0);
    setClassification(item);
  };

  const onPressHashtag = (item: string) => {
    const index = hashtag.indexOf(item, 0);
    if (index < 0) {
      if (hashtag.length <= 2) setHashtag(hashtag.concat(item));
      else {
        setHashtag([]);
      }
    }
  };

  const deleteHashtag = (item: string) => {
    const index = hashtag.indexOf(item, 0);
    if (index > -1) {
      setHashtag(hashtag.filter(obj => obj !== item));
    }
  };

  const renderClassificationItem = (item: PostClassification) => {
    return (
      <TouchableOpacity
        key={item.toString()}
        style={styles.classificationContainer}
        onPress={() => onPressClassification(item)}>
        {item === PostClassification.MOVIE && (
          <Image
            source={images.film}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
        )}
        {item === PostClassification.CHARACTER && (
          <Image
            source={images.character}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
        )}
        {item === PostClassification.SPOILER && (
          <Image
            source={images.spoiler}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
        )}
        {item === PostClassification.FAN_ART && (
          <Image
            source={images.fanart}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
        )}
        <Text style={styles.classificationText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderHashtagHotItem = (item: Hashtag) => {
    return (
      <TouchableOpacity
        key={item.hashtag.toString()}
        style={styles.hashtagContainer}
        onPress={() => onPressHashtag(item.hashtag)}>
        <View style={styles.iconHashtag}>
          <Icon name="hashtag" size={15} color={'#ffffff'} />
        </View>
        <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '600'}}>
          {item.hashtag}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHashtagItem = (item: string) => {
    return (
      <HashtagItem
        hashtag={item}
        onPress={() => deleteHashtag(item)}
        key={item}
      />
    );
  };

  useEffect(() => {
    getHashtag();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
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
            onPress={submitPost}>
            <Text
              style={[styles.textNext, isValidation() && styles.textVisible]}>
              Đăng
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
        <View style={styles.bodyContainer}>
          <View style={styles.selectContainer}>
            <View style={styles.selectClassification}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={onPressSelectClassification}>
                <Icon name="border-all" size={23} color={'#6bccbb'} />
                <Text style={styles.selectClassificationText}>
                  Chọn phân loại {`(bắt buộc)`}
                </Text>
              </TouchableOpacity>
            </View>
            {classification && (
              <View
                style={[
                  styles.classificationContainer,
                  {justifyContent: 'center'},
                ]}>
                <Text
                  style={{fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                  {classification}
                </Text>
              </View>
            )}
            <View
              style={{height: 2, backgroundColor: '#f2f4f8', width: '90%'}}
            />
            <View style={styles.selectHashtag}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={onPressSelectHashtag}>
                <View style={styles.iconHashtag}>
                  <Icon name="hashtag" size={15} color={'#ffffff'} />
                </View>
                <Text style={styles.selectClassificationText}>Chọn chủ đề</Text>
                <View style={styles.chevronRightIconHashtag}>
                  <Text style={styles.textSelect}>Chọn</Text>
                  <Icon name="chevron-right" size={23} color={'#9b9b9b'} />
                </View>
              </TouchableOpacity>
            </View>
            {hashtag.length > 0 && hashtag.map(renderHashtagItem)}
          </View>
        </View>
        <ChoiceBottomSheet ref={refClassification}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Chọn phân loại
            </Text>
          </View>
          {listClassification.map(renderClassificationItem)}
        </ChoiceBottomSheet>
        <ChoiceBottomSheet ref={refHashtag}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={styles.hashtagHeader}>Thêm chủ đề</Text>
          </View>
          <TextInput
            style={styles.inputHashtag}
            placeholder="Nhập tối đa 3 chủ đề"
            placeholderTextColor={'#A3A3A3'}
            onChangeText={text => {
              setInputHashtag(text);
            }}
            onSubmitEditing={(
              nativeEvent: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
            ) => {
              onPressHashtag(nativeEvent.nativeEvent.text);
              setInputHashtag('');
            }}
            value={inputHashtag}
          />
          <View style={styles.line} />
          {hashtag.length > 0 && hashtag.map(renderHashtagItem)}
          <Text style={styles.recommendText}>Chủ đề đề xuất</Text>
          {hashtagHotList.map(renderHashtagHotItem)}
        </ChoiceBottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  buttonNext: {
    marginLeft: 'auto',
    right: 30,
    width: 60,
    height: 33,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonVisible: {
    backgroundColor: '#f8d3d6',
  },
  textNext: {fontSize: 14, color: '#999999'},
  textVisible: {
    color: colors.primary,
  },
  selectContainer: {
    width: '95%',
    height: 400,
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: '#f5f6fb',
    flex: 0.9,
    alignItems: 'center',
  },
  selectClassification: {
    marginHorizontal: 2,
    height: 40,
    width: 240,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 10,
    marginRight: 'auto',
  },
  selectClassificationText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    color: '#595959',
  },
  selectHashtag: {
    width: '100%',
    height: 46,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: 10,
  },
  iconHashtag: {
    height: 25,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#ab7aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronRightIconHashtag: {marginLeft: 'auto', flexDirection: 'row'},
  textSelect: {
    fontSize: 16,
    color: '#9b9b9b',
    paddingHorizontal: 6,
  },
  classificationContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '90%',
    height: 70,
    backgroundColor: '#f5f6fb',
    alignItems: 'center',
    borderRadius: 15,
  },
  classificationText: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  hashtagContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hashtagHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.marsBlack,
  },
  recommendText: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: '700',
  },
  inputHashtag: {
    marginHorizontal: 18,
    fontSize: 18,
  },
  line: {
    height: 2,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
  },
});
