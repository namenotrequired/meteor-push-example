# Push notifications on Meteor with Android 7 and 8

It took me a long time to get push notifications working on Android with Firebase. I made this example app to save you some of that time.

If any of these steps are unclear or unnecessary, please let me know.

## 0. Download [Meteor](https://www.meteor.com/)

If you've developed in Meteor on this machine before, skip this step.

## 1. Clone this repository

Clone it and then check if it runs well locally like this:

```
$ git clone https://github.com/namenotrequired/meteor-push-example.git
$ cd meteor-push-example
$ meteor
```

Go to http://localhost:3000/ and create an account.

## 2. Set up a database

Personally, I used https://mlab.com for this.

We'll also want to create a `settings.json` file in the root folder of your app, containing at least this info:

```
{
  "galaxy.meteor.com": {
    "env": {
      "MONGO_URL": "mongodb://..."
    }
  },
  "apiKey": "your-api-key-123",
  "projectNumber": 111111111111
}

```

For now, we'll only fill in the MONGO_URL. mLab will show you a link that looks something like this:

```
mongodb://<dbuser>:<dbpassword>@ds017175.mlab.com:17175/example
```

Put this in the settings file. I'm assuming your app is named 'example' by the way, wherever I say `example` put the real name.

## 3. Host it

To host it, I personally used [Galaxy](https://www.meteor.com/hosting). For more details about this part, see the [Meteor Deployment guide](https://guide.meteor.com/deployment.html#galaxy).


```
$ DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy example.meteorapp.com --settings settings.json
```

Once it's done, go to the URL (in this case, example.meteorapp.com) and create an account again.

## 4. Build the mobile app

For more details on this, see the [Meteor Mobile guide](https://guide.meteor.com/mobile.html).

I always start by removing any builds I have (though the first time, there should be none):

```
$ rm -rf .meteor/local/cordova-build && rm -rf ../example-build
```

To build the mobile app, we use this command:

```
$ meteor build ../example-build --server=http://example.meteorapp.com
```

## 5. Register in Firebase

For this I followed the [raix:push Android Guide](https://github.com/raix/push/blob/master/docs/ANDROID.md).

In these steps, you create a sender ID and apiKey. Put these in `settings.json`. Also put the sender ID in `mobile-config.js`.

Firebase will also give you a file called `google-services.json`. Put this in place of the empty file by the same name in this repo.

## 6. Edit `build.gradle`

Go to your `example-build` folder and find `android/project/build.gradle`. Open it in Android Studio.

- Check that it starts with `apply plugin: 'com.android.application'`
- in `buildscript` find `dependencies` (or cmd + F for `classpath`) and add:
```
classpath 'com.google.gms:google-services:4.1.0'
classpath 'com.google.firebase:firebase-core:11.0.1'
```
- in `dependencies` outside any other block (or cmd + F for `implementation`) add:
```
implementation 'com.google.firebase:firebase-core:11.0.1'
```
- At the very end of the file add:
```
apply plugin: 'com.google.gms.google-services'
```

## 7. Generate the APK

- In the menu go to Build -> Select Build Variant
- Choose "Release"
- Go to Build -> Generate Signed APK
- APK -> Next
- "Create new" to [create a keystore](https://developer.android.com/studio/publish/app-signing#generate-key)
- Once they're filled in, click Next -> release -> V2 -> Finish

A minute later, it tells you the APK is done. Click "locate" to find it. (I had to still go into the `release` folder and find `project-release.apk`)

## 8. Install on a device

Send the APK to an Android device (I tested 7 and 8) through something like Google Drive and install it.

Open it and log into the account you created in step 3.

Close the app.

## 9. Send a message

Go to your site again (example.meteorapp.com) and open the developer tools.

Use the global `sendPush()` function to send a message, for example:

```
window.sendPush('Push is working!');
```

Within a few seconds it should appear on your device.




