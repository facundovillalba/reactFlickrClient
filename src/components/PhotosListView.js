import React from 'react';
import { StyleSheet, Text, Dimensions, ImageBackground, View, FlatList, TouchableOpacity } from 'react-native';

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;
const numColumns = 2;

export default class PhotosListView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('album', 'undefinedAlbum'),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
    };
    this.getSetPhotos();
  }

  getSetPhotos() {
    let method = 'flickr.photosets.getPhotos';
    let extras = 'url_m';
    const user_id = this.props.navigation.getParam('user_id', 'undefinedUserId');
    const photoset_id = this.props.navigation.getParam('photoset_id', 'undefinedPhotosetId');
    let url = `${requestURL}&user_id=${user_id}&method=${method}&extras=${extras}&photoset_id=${photoset_id}`;
    return fetch(url).then((res) => res.json()).then((jsonRes) => this.handleGetSetPhotosResponse(jsonRes));
  }

  handleGetSetPhotosResponse(res) {
    //TODO error handling  
    this.setState({ photos: res.photoset.photo })
  }

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  _onPress = (item) => {
    console.log(item)
    this.props.navigation.navigate('PhotoDetail', {
      photo: item,
    });
  };

  renderItem = ({ item, index }) => {    
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._onPress(item)}>
          <ImageBackground
            source={{ uri: item.url_m }}
            resizeMode='cover'
            style={styles.imgBackground}>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          data={this.formatData(this.state.photos, numColumns)}
          numColumns={numColumns}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    alignItems: 'stretch',
  },
  photoName: {
    letterSpacing: 1,
    fontSize: 20,
  },
  imgBackground: {
    flex: 1,
    margin: 5,
    height: (Dimensions.get('window').width) / numColumns,
  },
  item: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});