import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ArticleProvider } from '@/context/ArticleContext';

import { useColorScheme } from '@/components/useColorScheme';
// Impor file CSS global di sini!
import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ArticleProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='detailsnews/[details]' options={{ headerShown: false }} />

          {/* <Stack.Screen name='detailnews' options={{ headerShown: false }} /> */}
          {/* <Stack.Screen
            name="/detail/[slug]"
            options={{
              title: 'Detail Artikel',
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
              },
              headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
              headerTitleStyle: {
                fontFamily: 'SpaceMono',
                fontSize: 20,
              },
            }}
          /> */}
        </Stack>
      </ThemeProvider>
    </ArticleProvider>
  );
}
