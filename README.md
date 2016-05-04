Install cli:
npm install -g react-native-cli

Export in your bashrc android home:
export ANDROID_HOME="/home/yourUser/Android/Sdk/"

Install Android SDK Build-tools version 23.0.1

Install project dependencies:
npm install

Start server:
react-native start


Allow access android to local server:
adb reverse tcp:8081 tcp:8081
adb reverse tcp:8080 tcp:8080

Deploy debug apk in adroid:
react-native run-android




