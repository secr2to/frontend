import { ReactNode } from "react";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "./errorFallback";
import { HttpError } from "../error";

interface LocalErrorBoundaryProps {
  children: ReactNode;
}

export default function LocalErrorBoundary({
  children,
}: LocalErrorBoundaryProps) {
  const handleError = (error: Error, stackTrace: string) => {
    if (error instanceof HttpError) {
      throw error;
    }
  };
  return (
    <ErrorBoundary
      onError={handleError}
      FallbackComponent={({ error, resetError }) => (
        <ErrorFallback
          content="로컬 에러가 발생했습니다."
          handleRetry={resetError}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
