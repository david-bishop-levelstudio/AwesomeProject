import { TouchableWithoutFeedback, Keyboard, StyleSheet, KeyboardAvoidingView, Platform, View, SafeAreaView, Animated, Text } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const KeyboardAvoidingComponent = ({ children }: Props) => {

  // get height of header
  const headerHeight = useHeaderHeight()

  const [height, heightSet] = useState(0)
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => heightSet(headerHeight));
    Keyboard.addListener("keyboardWillHide", () => heightSet(0));

    return () => {
      Keyboard.removeAllListeners("keyboardWillShow")
      Keyboard.removeAllListeners("keyboardWillHide")
    }
  }, [Keyboard])

  const [bufferHeight] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(bufferHeight, {
      toValue: height,
      useNativeDriver: false,
      duration: 500
    }).start()
  }, [height])

  return (
    <KeyboardAvoidingView enabled={true} style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <Text>{JSON.stringify(height, null, 2)}</Text>
          <View style={styles.inner}>
            {children}
          </View>
            <Animated.View style={{ height: bufferHeight }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    padding: 16,
    backgroundColor: "red",
    borderBottomWidth: 2
  },
})

export default KeyboardAvoidingComponent