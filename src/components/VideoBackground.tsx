import { colors } from '@/constants/theme';

interface VideoBackgroundProps {
  source: string;
  children: React.ReactNode;
}

export default function VideoBackground({ source, children }: VideoBackgroundProps) {
  return (
    <div style={styles.container}>
      <video
        src={source}
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};
