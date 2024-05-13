type ErrorProps = {
  error: unknown;
};

export default function Error({ error }: ErrorProps) {
  console.log(error);
  return <div>Error</div>;
}
