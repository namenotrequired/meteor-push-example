Meteor.startup(() => {
  Push.debug = true;

  Push.allow({
    send: function(userId, notification) {
      console.log('userId:', userId);
      console.log('notification:', notification);
      // Allow all users to send to everybody - For test only!
      return true;
    }
  });

  Push.Configure({
    android: {
      senderID: 728367964742,
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
      clearNotifications: true,
      // icon: '',
      // iconColor: ''
    },
    ios: {
      alert: true,
      badge: true,
      sound: true,
    }
  });


  //----------------------------------------------------------------------
  // Send a push message to myself
  //----------------------------------------------------------------------
  window.sendPush = (text) => {
    const userId = Meteor.userId();

    // Send mobile push notification
    return Push.send({
      text,
      from: 'push',
      title: 'Dummy app',
      contentAvailable: 1,
      badge: 1,
      sound: 'notification',
      query: { userId },
      android_channel_id: userId,
    });
  };

  if (!Meteor.isCordova) return;

  PushNotification.createChannel(
    () => {
      console.log('createChannel');
    },
    () => {
      console.log('error');
    },
    {
      id: Meteor.userId(), // Use any Id you prefer, but the same Id for this channel must be sent from the server,
      description: 'Android Channel', // And any description your prefer
      importance: 3,
      vibration: true,
    }
  );
});
