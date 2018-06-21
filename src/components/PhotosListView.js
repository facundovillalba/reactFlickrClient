import React from 'react';
import { StyleSheet, Text, Dimensions, ImageBackground, View,FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements'

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;
const numColumns = 2;

export default class PhotosListView extends React.Component {
  

constructor(props){
   super(props)
   this.state = {
    photos: []
   };
   this.getSetPhotos();
}

getSetPhotos(){
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
/*
<TouchableOpacity onPress={this._onPress}>
      <View style ={styles.item}>
        <ImageBackground 
                source={{uri:item.url_m}}
                resizeMode='cover'
                style={styles.imgBackground}>
                  <ListItem                                           
                      title={item.title}
                  /> 
          </ImageBackground>
      </View>
    </TouchableOpacity>
*/

renderItem = ({ item, index }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
      <View style={styles.item}>
        <ImageBackground 
                source={{uri:item.url_m}}
                resizeMode='cover'
                style={styles.imgBackground}>
                  <ListItem                                           
                      title={item.title}
                  /> 
          </ImageBackground>
      </View>
  );
  
};

render () {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.list}>
            <FlatList                        
              keyExtractor={item => item.id}
              data={this.formatData(this.state.photos, numColumns)}
              numColumns={numColumns}
              renderItem={this.renderItem}
            />
        </List>
      </View>
  )
}
}
const styles = StyleSheet.create({
  container: {     
    flex: 1,
    marginVertical: 25,
  },
  list : {
    alignItems: 'stretch',
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
/*
*/