import { ReactNode } from "react";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "./errorFallback";

interface HttpErrorBoundaryProps {
  children: ReactNode;
}

export default function HttpErrorBoundary({
  children,
}: HttpErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetError }) => (
        <ErrorFallback
          content="네트워크 상태를 확인 해 주세요"
          handleRetry={resetError}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
