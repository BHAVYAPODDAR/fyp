const WillCard = ({ will, onView, onDelete, onFinalize }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 relative flex flex-col justify-between">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500"
      >
        &#x2716;
      </button>
      <div>
        <h3 className="font-bold text-lg">Will No: {will.sr}</h3>
        <p className="text-gray-500 text-sm">
          Created: {new Date(will.submissionTimestamp).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm mb-2">
          Time: {new Date(will.submissionTimestamp).toLocaleTimeString()}
        </p>
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          {will.status || "Draft"}
        </span>
        {will.cid && (
          <p className="text-gray-400 text-xs truncate mt-2">CID: {will.cid}</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md text-sm"
          >
            View
          </button>
          <button className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-md text-sm">
            Edit
          </button>
        </div>
        <button
          onClick={onFinalize}
          className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm"
        >
          Finalize
        </button>
      </div>
    </div>
  );
};

export default WillCard;
