import { ReactNode } from "react";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "./errorFallback";

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export default function GlobalErrorBoundary({
  children,
}: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetError }) => (
        <ErrorFallback
          content="알 수 없는 에러가 발생했습니다"
          handleRetry={resetError}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
