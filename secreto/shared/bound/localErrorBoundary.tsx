import { ReactNode } from "react";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "./errorFallback";

interface LocalErrorBoundaryProps {
  children: ReactNode;
}

export default function LocalErrorBoundary({
  children,
}: LocalErrorBoundaryProps) {
  return (
    <ErrorBoundary
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
