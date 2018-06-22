import React from 'react';
import { StyleSheet, Image, Text, ImageBackground, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { List, ListItem } from "react-native-elements";

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;

export default class UserSetsView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userSets: []
    };
    this.getSets('37107167@N07');
  }

  static navigationOptions = {
    header: null,
  };

  getSets(userId) {
    let method = 'flickr.photosets.getList';
    let primary_photo_extras = 'url_m';
    let url = `${requestURL}&user_id=${userId}&method=${method}&primary_photo_extras=${primary_photo_extras}`;
    return fetch(url).then((res) => res.json()).then((jsonRes) => this.handleGetSetsResponse(jsonRes));
  }

  handleGetSetsResponse(res) {
    //TODO error handling
    this.setState({ userSets: res.photosets.photoset });
  }

  renderSeparator = () => {
    return (
      <ListSpearator />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.user} >
          <User />
        </View>
        <View style={{ flexDirection: 'row', height: '6%', alignContent: 'center', borderBottomColor: '#CED0CE', borderBottomWidth: StyleSheet.hairlineWidth, }} >
          <Image source={require("../assets/album.png")} style={{ resizeMode: 'contain', marginLeft: 15 }} />
          <Text style={{ fontSize: 22, letterSpacing: 1, marginLeft: 15, marginTop: 5 }} >
            Albums
          </Text>
        </View>
        <View style={{ flex: 1, }}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            data={this.state.userSets}
            renderItem={({ item }) => (
              <FlickrSet
                title={item.title._content}
                id={item.id}
                description={item.description._content}
                photos={item.photos}
                count_views={item.count_views}
                primary_photo_url={item.primary_photo_extras.url_m}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

class FlickrSet extends React.Component {

  _onPress = () => {
    this.props.navigation.navigate('PhotosListView', {
      user_id: '37107167@N07',
      photoset_id: this.props.id,
      album: this.props.title,
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <ImageBackground
            source={{ uri: this.props.primary_photo_url }}
            resizeMode='cover'
            style={styles.imgBackground}>
            <ListItem
              containerStyle={styles.item}
              title={this.props.title}
              titleStyle={{ fontWeight: 'bold' }}
              subtitle={`${this.props.photos} photos ${this.props.count_views} views`}
            />
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

class User extends React.Component {

  constructor() {
    super()
    this.state = {
      pictureUrl: 'undefined'
    };
    this.getProfilePicture('37107167@N07');
  }

  getProfilePicture(userId) {
    let method = 'flickr.people.getInfo';
    let url = `${requestURL}&user_id=${userId}&method=${method}`;
    fetch(url).then((res) => res.json()).then((jsonRes) => this.handleGetProfilePictureResponse(jsonRes));
  }

  handleGetProfilePictureResponse(res) {
    //TODO error handling
    let picture = `http://farm${res.person.iconfarm}.staticflickr.com/${res.person.iconserver}/buddyicons/${res.person.nsid}.jpg`;
    this.setState({ pictureUrl: picture })
  }

  //TODO sacar imagen hardcodeada, la url salio de inspeccionar la pagina hay que ver de donde sale el 1 parametro o parsear html
  //class="coverphoto"
  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        source={{ uri: 'http://farm2.staticflickr.com/1517/coverphoto/37107167@N07_h.jpg?1452524334#37107167@N07' }}
        resizeMode='cover'
        alignSelf='flex-start'>
        <View style={{ marginTop: '5%', marginLeft: '5%' }}>
          <Image source={{ uri: this.state.pictureUrl }} style={styles.userPicture} />
          <Text style={styles.username}>Dane Pedersen</Text>
        </View>
      </ImageBackground>
    );
  }
}

function ListSpearator() {
  return (
    <View style={{ height: 1, width: "98%", alignSelf: "center", backgroundColor: "#CED0CE" }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  user: {
    flex: 0,
    height: '20%',
    alignItems: 'stretch',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  userPicture: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderRadius: 45
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    height: 220,
  },
  imgBackground: {
    flex: 1,
    height: '100%',
  },
});