
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@/components/button";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { DiaryProvider } from "@/contexts/DiaryContext";
import { ThemeProvider as DiaryThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  useFonts as useGoogleFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular,
} from "@expo-google-fonts/playfair-display";
import {
  Lora_400Regular,
  Lora_600SemiBold,
} from "@expo-google-fonts/lora";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { audioManager } from "@/utils/audioManager";
import { getCurrentSeason } from "@/utils/seasonTheme";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [googleFontsLoaded] = useGoogleFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Lora_400Regular,
    Lora_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded && googleFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, googleFontsLoaded]);

  useEffect(() => {
    const initializeAudio = async () => {
      await audioManager.initialize();
      const season = getCurrentSeason();
      await audioManager.playSeasonalMusic(season);
    };

    initializeAudio();

    return () => {
      audioManager.cleanup();
    };
  }, []);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded || !googleFontsLoaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(0, 122, 255)",
      background: "rgb(242, 242, 247)",
      card: "rgb(255, 255, 255)",
      text: "rgb(0, 0, 0)",
      border: "rgb(216, 216, 220)",
      notification: "rgb(255, 59, 48)",
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(10, 132, 255)",
      background: "rgb(1, 1, 1)",
      card: "rgb(28, 28, 30)",
      text: "rgb(255, 255, 255)",
      border: "rgb(44, 44, 46)",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <>
      <StatusBar style="auto" animated />
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
      >
        <LanguageProvider>
          <DiaryThemeProvider>
            <DiaryProvider>
              <WidgetProvider>
                <GestureHandlerRootView>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                      name="modal"
                      options={{
                        presentation: "modal",
                        title: "Standard Modal",
                      }}
                    />
                    <Stack.Screen
                      name="formsheet"
                      options={{
                        presentation: "formSheet",
                        title: "Form Sheet Modal",
                        sheetGrabberVisible: true,
                        sheetAllowedDetents: [0.5, 0.8, 1.0],
                        sheetCornerRadius: 20,
                      }}
                    />
                    <Stack.Screen
                      name="transparent-modal"
                      options={{
                        presentation: "transparentModal",
                        headerShown: false,
                      }}
                    />
                  </Stack>
                  <SystemBars style={"auto"} />
                </GestureHandlerRootView>
              </WidgetProvider>
            </DiaryProvider>
          </DiaryThemeProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
