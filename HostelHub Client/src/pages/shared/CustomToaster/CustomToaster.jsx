import { Toaster } from 'react-hot-toast';

const CustomToaster = () => (
    <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
            success: {
                duration: 3000,
                style: {
                    background: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
                iconTheme: {
                    primary: '#16a34a',
                    secondary: '#f0fdf4',
                },
            },
            error: {
                duration: 4000,
                style: {
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
            },
            loading: {
                duration: 5000,
                style: {
                    background: '#f8fafc',
                    color: '#64748b',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
            },
        }}
    />
);

export default CustomToaster;