import { DeviceEventEmitter, NativeModules, NativeEventEmitter, Platform } from 'react-native';
const { RNAudioRecord } = NativeModules;

const AudioRecord = {};

AudioRecord.init = options => RNAudioRecord.init(options);
AudioRecord.start = () => RNAudioRecord.start();
AudioRecord.stop = () => RNAudioRecord.stop();

const eventsMap = {
  data: 'data',
  metering1: 'metering1'
  // metering2: "metering2"
};

AudioRecord.on = (event, callback) => {
  const nativeEvent = eventsMap[event];

  if (!nativeEvent) {
    throw new Error('Invalid event');
  }

  if (Platform.OS === 'android') {
    // // 나중에 이 방식으로도 테스트해보기
    // const test = DeviceEventEmitter
    // test.removeAllListeners()
    const EventEmitter = DeviceEventEmitter.addListener('metering1', callback);

    return EventEmitter;
  } else {
    const EventEmitter = new NativeEventEmitter(RNAudioRecord);
    EventEmitter.removeAllListeners(nativeEvent);
    return EventEmitter.addListener(nativeEvent, callback);
  }
};

export default AudioRecord;
