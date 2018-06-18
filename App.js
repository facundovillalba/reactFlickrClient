import React from 'react';
import { StyleSheet, Text, ImageBackground, View,FlatList, TouchableOpacity } from 'react-native';

const baseURL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
const APIKey = '5da3b1261f4b9ba6e92143b48e065a3c';
const params = `&api_key=${APIKey}`;
const requestURL = baseURL + params;

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      userSets: []
    };
    this.getSets('37107167@N07');
  }

  addHeaders() {
    return options = { headers: { "Content-Type": "application/json" }}
  }
  getSets(userId){
    let method = 'flickr.photosets.getList';
    let primary_photo_extras = 'url_m';
    let url = `${requestURL}&user_id=${userId}&method=${method}&primary_photo_extras=${primary_photo_extras}`;
    console.log(url);
    return fetch(url).then((res) => res.json()).then((jsonRes) => this.handleResponse(jsonRes));
  }
  handleResponse(res) {
    console.log(Object.keys(res.photosets.photoset));
    console.log(res.photosets.photoset[0].id);
    console.log(res.photosets.photoset[0].primary_photo_extras.url_m);
    this.setState({ userSets: res.photosets.photoset })
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };
//
  render() {
    return (
      <View style={styles.container}>
        <Text>Dane Pedersen</Text>
        <Text>Seguidores Siguiendo</Text>
        <FlatList  
            style={styles.list}           
            ItemSeparatorComponent={this.renderSeparator}
            data={this.state.userSets}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <FlickrSet 
                  title = {item.title._content}
                  description = {item.description._content}
                  photos = {item.photos}
                  count_views = {item.count_views}
                  primary_photo_url = {item.primary_photo_extras.url_m}
                />
              )}
        />
      </View>
    );
  }
}
//<Image source={albumPic} style={{width: 193, height: 110}}/>
//<Image source={this.props.primary_photo_url} style={{width: 193, height: 110}}/>
//<Text>{props.description}</Text>
class FlickrSet extends React.Component{

  _onPress = () => {
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.item}>
          <ImageBackground 
              source={{uri:this.props.primary_photo_url}}
              resizeMode='cover'
              style={styles.imgBackground}
          >
              <Text>{this.props.title} {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {this.props.photos} photos {this.props.count_views} views
              </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({

  container: {
    marginTop: "8%",    
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",  
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    backgroundColor: "#F5FCFF"
  },
  list : {
    alignSelf: 'stretch',
    height: "80%",
  },
  item: { 
    alignSelf: 'stretch',       
  },
  separator: {
    height: 1,    
    width: "98%",
    alignSelf: "center",
    //alignItems: 'stretch',
    backgroundColor: "#CED0CE",
  }, 
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
},

});


/*

https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=1de577f2902cf659131b606a1f010af5&username=DaneMakes&format=json&nojsoncallback=1
flickr.people.findByUsername Dane Pedersen
{ "user": { "id": "37107167@N07", "nsid": "37107167@N07", 
    "username": { "_content": "DaneMakes" } }, "stat": "ok" }

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
