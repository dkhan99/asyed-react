import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Notifications} from 'expo';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class LinksScreen extends React.Component {
  state = {
    notification: {},
  };

  componentWillMount() {
     registerForPushNotificationsAsync();

     // Handle notifications that are received or selected while the app
     // is open. If the app was closed and then opened by tapping the
     // notification (rather than just tapping the app icon to open it),
     // this function will fire on the next tick after the app starts
     // with the notification data.
     this._notificationSubscription = Notifications.addListener(this._handleNotification);
   }

   _handleNotification = (notification) => {
      this.setState({notification: notification});
    };
  static navigationOptions = {
    title: 'Notifications',
  };

  render() {
    console.log("state.notifications", this.state.notification)
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
