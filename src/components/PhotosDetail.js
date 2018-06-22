import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class PhotosListView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('photo', 'undefinedPhoto'),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      comments: [] ,
    };
    this.loadComments();
  }
  loadComments(){

  };

  handleGetSetPhotosResponse(res) {
    //TODO error handling  
    this.setState({ comments: res.comments })
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity>
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
      <View style={styles.container}>
        <Image/>
        <Text/>
      </View>
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.comments}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}