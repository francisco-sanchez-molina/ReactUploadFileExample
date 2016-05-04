/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  CameraRoll
} from 'react-native';

class ShExample extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.files = {}

    CameraRoll.getPhotos({
      first: 30,
      groupTypes: undefined,
      assetType: undefined
    })
      .then((data) => {
        var photos = data.edges
        photos = photos.filter((photo) => {
          if (photo.node['group_name'] === 'Camera') {
            this.postData('http://localhost:8080/upload', photo.node.image.uri)
            return true
          }
          return false
        }
        )
        this.setState({ files: photos })
      }, (e) => logError(e));
  }



  postData(url, uri) {
    var formdata = new FormData();
    formdata.append('image', { type: 'image/jpeg', name: Date.now() + '.jpg', uri });
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = (response) => {
      alert(response)
    }
    xhr.send(formdata);

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions}>
          {JSON.stringify(this.state.files) }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ShExample', () => ShExample);
