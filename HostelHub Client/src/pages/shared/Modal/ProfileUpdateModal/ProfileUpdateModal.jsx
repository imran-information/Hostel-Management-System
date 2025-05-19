import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { FiLoader, FiUpload, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axios from "axios";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";

const ProfileUpdateModal = ({ isOpen, onClose, student = {}, isLoading }) => {
    const [formData, setFormData] = useState(student);
    const [uploading, setIsUploading] = useState(false);
    const { updateProfileUser } = useAuth()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        setIsUploading(true);
        const imageForm = new FormData();
        imageForm.append('image', file);

        try {
            toast.loading('Uploading image...', { id: 'image-upload' });
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                imageForm
            );
            setFormData(prev => ({
                ...prev,
                photo: res.data.data.url,
            }));
            toast.success('Image uploaded successfully!', { id: 'image-upload' });
        } catch (err) {
            console.error(err);
            toast.error('Image upload failed', { id: 'image-upload' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        await updateProfileUser(formData.displayName, formData.photo)
       const {data} =  await axiosSecure.patch(`/users/${student?.email}`, {
            displayName: formData.displayName,
            photo: formData.photo
        });

        // console.log(data)
        if (data.modifiedCount) {
            toast.success('Uploaded info successfully!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`flex-1 flex flex-col items-center justify-center h-40 border-2 ${formData.image ? 'border-indigo-200' : 'border-gray-200'} border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden`}>
                                {uploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                                        <FiLoader className="animate-spin text-indigo-600" size={24} />
                                    </div>
                                )}
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="mb-1 text-sm text-gray-500">
                                        {formData.image ? 'Change image' : 'Click to upload'}
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>

                            {formData.photo && (
                                <div className="flex-1">
                                    <div className="h-40 relative rounded-xl overflow-hidden border border-gray-200">
                                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, photo: null })}
                                            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                        >
                                            <FiX className="text-gray-700" size={16} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                            <p className="text-white text-sm truncate">Preview</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || uploading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {isLoading || uploading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdateModal;
