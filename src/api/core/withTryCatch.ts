export const withTryCatch = <T extends (...args: any[]) => Promise<any>>(
    apiFunction: T
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
      try {
        const result = await apiFunction(...args);
        return result;
      } catch (error) {
        console.error('API Error:', error);
        return null;
      }
    };
  };