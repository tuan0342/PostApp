import {
  Modal,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type BlogQAImageListProps = {
  visible: boolean;
  onClose: () => void;
  index: number;
  images: string[];
};

const PostImageList: React.FC<BlogQAImageListProps> = ({
  visible,
  onClose,
  index,
  images,
}) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    images?.[index],
  );
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  const handlePressNext = () => {
    if (currentIndex < images?.length! - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePressPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentIndex(index);
    setCurrentImage(images?.[index]);
  }, [images, index]);

  useEffect(() => {
    setCurrentImage(images?.[currentIndex]);
  }, [images, currentIndex]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButtonBox} onPress={onClose}>
          <Icon
            style={styles.closeIcon}
            name="times-circle"
            size={30}
            color={'#fff'}
          />
        </TouchableOpacity>
        <View style={styles.popup}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={handlePressPrev} style={styles.button}>
              <Icon
                style={{height: 50, width: 50}}
                name="chevron-left"
                size={25}
                color={'#454040'}
              />
            </TouchableOpacity>
          )}
          {currentImage ? (
            <Image
              source={{uri: currentImage}}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.loader}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              onPress={handlePressNext}
              style={[styles.button, styles.next]}>
              <Icon
                style={{height: 60, width: 60}}
                name="chevron-right"
                size={25}
                color={'#454040'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.imageHorizontalList}>
          {images?.map((item, itemIndex) => {
            return (
              <Image
                key={itemIndex}
                source={{uri: item}}
                style={styles.imageHorizontal}
                resizeMode="cover"
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  popup: {
    width: '90%',
    maxWidth: 1200,
    height: '80%',
    maxHeight: 800,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButtonBox: {
    width: '100%',
    alignItems: 'flex-end',
    // top: 10,
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    height: 40,
    width: 40,
  },
  button: {
    width: 40,
    height: 50,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    borderColor: '#d7d7d7',
    opacity: 0.65,
    borderWidth: 2,
    borderRadius: 2,
    paddingLeft: 7,
    paddingTop: 8,
  },
  next: {
    right: 0,
  },
  image: {
    width: '96%',
    marginLeft: '2%',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHorizontalList: {
    marginVertical: 10,
    width: '100%',
    // overflowX: 'scroll',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageHorizontal: {
    width: 110,
    height: 68,
    marginHorizontal: 10,
  },
  arrowRight: {},
  arrowLeft: {},
});

export default PostImageList;
