export default function DiscountsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Discounts</h1>
      <p className="text-gray-500 mb-8">Create and manage promo codes and automatic discounts.</p>
      <div className="bg-white p-12 border border-gray-100 rounded-2xl text-center">
        <h2 className="text-xl font-medium text-gray-700">No discounts active</h2>
        <p className="text-sm text-gray-500 mt-2">Click below to create your first discount code.</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">Create Discount</button>
      </div>
    </div>
  );
}
