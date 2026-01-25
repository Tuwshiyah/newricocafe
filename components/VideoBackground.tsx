import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/theme';

interface VideoBackgroundProps {
  source: string;
  children: React.ReactNode;
}

export default function VideoBackground({ source, children }: VideoBackgroundProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <video
          src={source}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          } as React.CSSProperties}
        />
        {children}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background,
  },
});
