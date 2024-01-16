const useTheme = () => ({ spacing: [] as string[], spacingByChar: (_: number) => null });

export const useSpacing = (size: string | number) => {
  const { spacing, spacingByChar } = useTheme();

  if (typeof size === 'number') {
    return spacingByChar(size);
  } else if (typeof size === 'string') {
    return spacing[size];
  } else {
    // not going through
    return '0';
  }
};
