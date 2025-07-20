import { ReactNode } from "react";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "./errorFallback";
import { HttpError } from "../error";

interface HttpErrorBoundaryProps {
  children: ReactNode;
}

export default function HttpErrorBoundary({
  children,
}: HttpErrorBoundaryProps) {
  const handleError = (error: Error, stackTrace: string) => {
    if (!(error instanceof HttpError)) {
      throw error;
    }
  };
  return (
    <ErrorBoundary
      onError={handleError}
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
