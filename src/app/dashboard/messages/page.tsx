export default function MessagesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Messages</h1>
      <p className="text-gray-500 mb-8">Customer inquiries and support tickets.</p>
      <div className="bg-white p-12 border border-gray-100 rounded-2xl text-center">
        <h2 className="text-xl font-medium text-gray-700">Inbox is empty</h2>
        <p className="text-sm text-gray-500 mt-2">You're all caught up with customer messages.</p>
      </div>
    </div>
  );
}
