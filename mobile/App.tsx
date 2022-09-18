import { useRef, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from 'routes/index';
import { Background } from "components/Background";
import { Loading } from "components/Loading";

import './src/services/notificationConfigs';
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  /*
    Para implementar o sistema completo de notificações via backend, acessar:
    https://docs.expo.dev/push-notifications/sending-notifications/
    https://expo.dev/notifications
  */
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => console.log(notification));
    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, []);

  useEffect(() => {
    getPushNotificationToken();
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}