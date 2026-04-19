export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-6">
          Please sign in to track products and set up price drop alerts.
        </p>
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-medium">
          Sign In
        </button>
      </div>
    </div>
  );
}
