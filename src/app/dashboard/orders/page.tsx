import React from 'react';
import OrderTable from '@/components/dashboard/OrderTable';

export const metadata = {
  title: 'Order Management - Haven',
};

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Management</h1>
        <p className="text-sm text-gray-500">View and manage customer orders.</p>
      </div>

      <OrderTable />
    </div>
  );
}
