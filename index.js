import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNAudioRecord } = NativeModules;

const AudioRecord = {};

AudioRecord.init = options => RNAudioRecord.init(options);
AudioRecord.start = () => RNAudioRecord.start();
AudioRecord.stop = () => RNAudioRecord.stop();

const eventsMap = {
  data: 'data',
  metering1: "metering1",
  metering2: "metering2"
};

AudioRecord.on = (event, callback) => {
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }

  const EventEmitter = new NativeEventEmitter(RNAudioRecord);

  EventEmitter.removeAllListeners(nativeEvent);
  return EventEmitter.addListener(nativeEvent, callback);
};

export default AudioRecord;
