import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="menu" />
      <Tabs.Screen name="featured" />
      <Tabs.Screen name="about" />
    </Tabs>
  );
}
