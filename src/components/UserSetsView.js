import React from 'react';
import { StyleSheet, Image,Text, ImageBackground, View,FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from "react-native-elements";

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;

export default class UserSetsView extends React.Component {

  constructor(){
    super()
    this.state = {
      userSets: []
    };
    this.getSets('37107167@N07');
  }

  getSets(userId){
    let method = 'flickr.photosets.getList';
    let primary_photo_extras = 'url_m';
    let url = `${requestURL}&user_id=${userId}&method=${method}&primary_photo_extras=${primary_photo_extras}`;
    return fetch(url).then((res) => res.json()).then((jsonRes) => this.handleGetSetsResponse(jsonRes));
  }

  handleGetSetsResponse(res) {
    //TODO error handling
    this.setState({ userSets: res.photosets.photoset })
  }

  renderSeparator = () => {
    return (
      <ListSpearator/>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <User/>
        <List containerStyle={styles.list}> 
          <FlatList                    
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={item => item.id}
              data={this.state.userSets}
              renderItem={({item}) => (
                <FlickrSet 
                  title = {item.title._content}
                  id = {item.id}
                  description = {item.description._content}
                  photos = {item.photos}
                  count_views = {item.count_views}
                  primary_photo_url = {item.primary_photo_extras.url_m}
                  navigation = {this.props.navigation}
                />
              )}
            />
        </List>
      </View>
    );
  }
}

class FlickrSet extends React.Component{
  
  _onPress = () => {
    this.props.navigation.navigate('PhotosListView', {
      user_id: '37107167@N07',
      photoset_id: this.props.id,
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
          <View>
            <ImageBackground 
                source={{uri:this.props.primary_photo_url}}
                resizeMode='cover'
                style={styles.imgBackground}>
                <ListItem
                    containerStyle={styles.item}                         
                    title={this.props.title}
                    titleStyle={{fontWeight: 'bold' }}
                    subtitle={`${this.props.photos} photos ${this.props.count_views} views`}
                />
            </ImageBackground>
          </View>
      </TouchableOpacity>      
    );
  }
}

class User extends React.Component {

  constructor(){
    super()
    this.state = {
      pictureUrl: 'undefined'
    };
    this.getProfilePicture('37107167@N07');
  }

  getProfilePicture(userId){
    let method = 'flickr.people.getInfo';
    let url = `${requestURL}&user_id=${userId}&method=${method}`;
    fetch(url).then((res) => res.json()).then((jsonRes) => this.handleGetProfilePictureResponse(jsonRes));
  }

  handleGetProfilePictureResponse(res) {
    //TODO error handling
    let picture = `http://farm${res.person.iconfarm}.staticflickr.com/${res.person.iconserver}/buddyicons/${res.person.nsid}.jpg`;
    this.setState({ pictureUrl: picture })
  }

  render() {
    return (
    <View style={styles.user}>
            <Image source={{uri:this.state.pictureUrl}} style={styles.userPicture} />
            <ImageBackground 
              source={require('../assets/usercover.png')}
              resizeMode ='contain'
              style={styles.imgBackground}
              alignSelf= 'flex-start'>
                    <Text style={styles.username}>Dane Pedersen</Text>
          </ImageBackground>
    </View>
    );
  }  
}

function ListSpearator() {
  return (
    <View style={{height: 1, width: "98%", alignSelf: "center", backgroundColor: "#CED0CE"}} />
  );
}

const styles = StyleSheet.create({
    container: {     
      flex: 1,
      backgroundColor:'#efeaff',
    },
    user: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      alignSelf: 'flex-start',
      marginTop: "5%",
      marginLeft: "5%",
    },
    username: {
      marginTop: "35%",
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      fontWeight: 'bold',
      fontSize: 20,
    },   
    userPicture: {
      alignSelf: 'center',
      justifyContent: 'center',
      height: 100,
      width: 100,
      borderWidth: 1,
      borderRadius: 50
  },
    list : {
      height: "80%",
      alignItems: 'stretch',
    },
    item: { 
      flex: 1,
      alignSelf: 'stretch',
      height: 220,
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
    },
});


/*


https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=1de577f2902cf659131b606a1f010af5&user_id=37107167%40N07&primary_photo_extras=&format=json&nojsoncallback=1
flickr.photosets.getList
{ "photosets": { "page": 1, "pages": 1, "perpage": 6, "total": 6, 
    "photoset": [
        { "id": "72157628999584415", "primary": "6721070865", "secret": "df5f291da3", "server": "7005", "farm": 8, "photos": 8, "videos": 0, 
          "title": { "_content": "Memory Series" }, 
          "description": { 
              "_content": "My final series for my photo course last semester was focused on the idea of memory, and how color and shape alone can be easy mental connections to a previous memory.\n\nWhat memory comes to mind for you from these frames?" }, 
              "needs_interstitial": 0, 
              "visibility_can_see_set": 1, 
              "count_views": 24, 
              "count_comments": 0, 
              "can_comment": 0, 
              "date_create": "1327340021", 
              "date_update": "1352151644" }
    ] }, "stat": "ok" }

class FlickrImage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Text> visitas favoritos comentarios {this.props.likes}</Text>
      </View>
    );
  }
}
*/