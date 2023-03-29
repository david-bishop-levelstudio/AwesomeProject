import { View, StyleSheet, Text, TextInput, Button, SafeAreaView } from 'react-native';
import React from 'react'
import KeyboardAvoidingComponent from './components/KeyboardAvoidingComponent'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingComponent>
        <Text style={styles.header}>Header</Text>
        <TextInput style={styles.input} />
        <View style={{ marginTop: "auto" }}>
          <Button title="Submit" onPress={() => console.log('close')} />
        </View>
      </KeyboardAvoidingComponent>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home"
          // options={{ headerShown: false }}
          component={HomeScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {},
  input: {
    borderWidth: 1, padding: 16, backgroundColor: "white", borderRadius: 4
  }
})

export default App