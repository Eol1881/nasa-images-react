import { isRouteErrorResponse } from 'react-router-dom';

export function extractErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  console.error(error);
  return 'Unknown error';
}
