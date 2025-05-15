import { useState } from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import Spinner from '../../shared/LoadingSpinner/Spiner';
import toast from 'react-hot-toast';

const MyPayments = () => {
    
    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

        switch (status) {
            case 'completed':
                return (
                    <span className={`${baseClasses} bg-green-100 text-green-800`}>
                        Completed
                    </span>
                );
            case 'pending':
                return (
                    <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
                        Pending
                    </span>
                );
            case 'failed':
                return (
                    <span className={`${baseClasses} bg-red-100 text-red-800`}>
                        Failed
                    </span>
                );
            case 'refunded':
                return (
                    <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
                        Refunded
                    </span>
                );
            default:
                return (
                    <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
                        Unknown
                    </span>
                );
        }
    };

    const { user, loading } = useAuth()
    const { isPending, error, data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !loading || user.email, 
            queryFn: async () => {
            const { data } = await axiosSecure(`/payments/${user.email}`)
            console.log(data)
            return data
        }

    })

    if (isPending) return <Spinner/>

    if (error) return  toast.error(error.message)

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">My Payments</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all your recent payment transactions
                    </p>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Payment ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Method
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Order
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {payment.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {payment.date}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            ${payment.amount.toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {payment.method}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {getStatusBadge(payment.status)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a href={`/orders/${payment.orderId}`} className="text-blue-600 hover:text-blue-900">
                                                {payment.orderId}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPayments;