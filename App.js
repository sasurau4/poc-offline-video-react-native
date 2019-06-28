/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import { downloadFile, stat, DocumentDirectoryPath } from 'react-native-fs'
import Video from 'react-native-video'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})
const iosVideoPath = `${DocumentDirectoryPath}/sample.mp4`

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          title="check"
          onPress={async () => {
            const result = await stat(`${DocumentDirectoryPath}/sample.mp4`)
            console.log(result)
          }}
        />
        <Button
          title="download"
          onPress={async () => {
            const options = {
              fromUrl:
                'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4',
              toFile: `${DocumentDirectoryPath}/sample.mp4`,
              progress: res => console.log(res),
            }
            const result = await downloadFile(options)
            console.log('Finished')
            console.log(result)
          }}
        />
        <Video
          source={{ uri: iosVideoPath }}
          onError={e => {
            console.log(e)
          }}
          style={styles.video}
        />
      </View>
    )
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
  video: {
    width: 160,
    height: 480,
  },
})
