import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const KeyboardAvoidingComponent = ({children}: Props) => {
  // android
  if (Platform.OS === 'android') {
    return (
      <View style={{flex: 1}}>
        <View style={styles.inner}>{children}</View>
      </View>
    );
  }

  // iOS
  // get height of header
  const headerHeight = useHeaderHeight();
  // store height of buffer that pushes content into view
  const [height, heightSet] = useState(0);
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => heightSet(headerHeight));
    Keyboard.addListener('keyboardWillHide', () => heightSet(0));

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, [Keyboard]);

  // store animated height value and animate when height changes
  const [bufferHeight] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(bufferHeight, {
      toValue: height,
      useNativeDriver: false,
      duration: 500,
    }).start();
  }, [height]);

  return (
    <KeyboardAvoidingView enabled={true} style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} bounces={false}>
            <View style={styles.inner}>{children}</View>
            <Animated.View style={{height: bufferHeight}} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  inner: {
    flex: 1,
    padding: 16,
  },
});

export default KeyboardAvoidingComponent;
