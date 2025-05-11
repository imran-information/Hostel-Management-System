// components/ConfirmationModal.js
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel"
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal forceMount>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <Dialog.Overlay asChild>
                                <motion.div
                                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Dialog.Overlay>

                            <Dialog.Content asChild>
                                <motion.div
                                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-lg shadow-xl max-w-md w-full z-50 focus:outline-none"
                                    initial={{ opacity: 0, y: '-48%', scale: 0.95 }}
                                    animate={{ opacity: 1, y: '-50%', scale: 1 }}
                                    exit={{ opacity: 0, y: '-48%', scale: 0.95 }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                >
                                    <Dialog.Title className="text-lg font-medium text-white mb-2">
                                        {title}
                                    </Dialog.Title>
                                    <Dialog.Description className="text-gray-400 mb-6">
                                        {message}
                                    </Dialog.Description>

                                    <div className="flex justify-end space-x-3">
                                        <Dialog.Close asChild>
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-400 hover:text-black hover:bg-gray-50"
                                            >
                                                {cancelText}
                                            </motion.button>
                                        </Dialog.Close>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={onConfirm}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            {confirmText}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ConfirmationModal;