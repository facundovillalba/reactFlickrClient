import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;

export default class PhotoDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      photo: this.props.navigation.getParam('photo', 'undefinedPhoto'),
      comments: null,
    };
    this.loadComments();
  }
  loadComments(){
    let method = 'flickr.photos.comments.getList';    
    let url = `${requestURL}&method=${method}&photo_id=${this.state.photo.id}`;
    return fetch(url).then((res) => res.json()).then((jsonRes) => this.handleloadCommentsResponse(jsonRes));
  };

  handleloadCommentsResponse(res) {
    //TODO error handling  
    this.setState({ comments: res.comments.comment })
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <View style={styles.container}>
              <Text>{item.authorname}</Text>
              <Text>{item._content}</Text>
            </View> 
    );

  };

  render() {
    return (
      <View style={styles.container}>
      <View style={{backgroundColor: 'black', flex: 1 }}>
        <Image source={{uri: this.state.photo.url_m}} style={{flex: 1 , height: '100%'}}/>
      </View>
      <View style={styles.container}>
          <FlatList
            keyExtractor={item => item.id}
            data= { this.state.comments }
            renderItem={this.renderItem }
          />
      </View>
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
    height: 250,
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