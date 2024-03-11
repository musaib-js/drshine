import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, Image} from 'react-native';
import WebView from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Load stuff
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }
  , []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }
  , [appIsReady]);

  if (!appIsReady) {
    return (
      <Image
        source={require('./assets/splash.png')}
        onLoadEnd={onLayoutRootView}
        fadeDuration={0}
        style={{ flex: 1, width: '100%', height: '100%' }}
        ressizeMode="cover"
      />
    )
  }

  return (
    <SafeAreaProvider>
    <WebView
      source={{ uri: 'https://drshineclient.vercel.app/' }}
      style={styles.container}
      onLayout={onLayoutRootView}
    />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
