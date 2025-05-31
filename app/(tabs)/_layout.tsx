import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true), // Ini akan di-override di masing-masing Tab.Screen jika diperlukan
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // Opsi header di sini jika Anda ingin header khusus untuk tab ini
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'News Local',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
          // Opsi header di sini jika Anda ingin header khusus untuk tab ini
        }}
      />
      <Tabs.Screen
        name="laravelapi"
        options={{
          title: 'News API',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
          // Opsi header di sini
        }}
      />
      <Tabs.Screen
        name="news/index" // Ini merujuk ke app/(tabs)/news/index.tsx
        options={{
          title: 'News Global API',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />
        }}
      />
    </Tabs>
  );
}