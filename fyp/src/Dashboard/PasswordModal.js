const PasswordModal = ({
  open,
  password,
  setPassword,
  onConfirm,
  onClose,
  error,
  actionType,
}) => {
  if (!open) return null;

  const isDelete = actionType === "delete";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3">
          Confirm {isDelete ? "Deletion" : "Finalization"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your password to proceed.
        </p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3"
        />
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isDelete ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
