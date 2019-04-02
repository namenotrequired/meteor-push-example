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
    gcm: {
      apiKey: Meteor.settings.apiKey,
      projectNumber: Meteor.settings.projectNumber,
    },
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
  //
  });
});
