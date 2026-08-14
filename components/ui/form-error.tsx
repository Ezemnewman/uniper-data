export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-body-sm text-error mt-1" role="alert">{message}</p>;
}
