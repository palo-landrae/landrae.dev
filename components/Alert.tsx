export const AlertMessage = ({
  error,
  show,
  message,
}: {
  error?: boolean;
  show: boolean;
  message?: string;
}) => {
  if (error) {
    return (
      <div
        className={`${
          show ? 'block' : 'hidden'
        } bg-red-100 rounded max-w-3xl w-full mx-auto border-l-4 border-red-500 text-red-700 p-4`}
        role="alert"
      >
        <p className="font-bold">Error 🧰</p>
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } bg-green-100 rounded max-w-3xl w-full mx-auto border-l-4 border-green-500 text-green-700 p-4`}
      role="alert"
    >
      <p className="font-bold">Success 🎉</p>
      <p>Hooray! You're on the list</p>
    </div>
  );
};
