import React, { useRef, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const PhotoSelector = ({ image, setImage, preview, setPreview }) => {
  console.log('PhotoSelector props:', { image, setImage, preview, setPreview });

  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(newPreviewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  if (!setImage || !setPreview) {
    return (
      <div className="text-red-500 text-sm">
        Error: PhotoSelector is missing required props (setImage or setPreview).
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
        id="photo-selector"
        aria-label="Upload profile photo"
      />

      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <LuUser className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
        )}
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onChooseFile}
          className="flex items-center px-4 py-2 bg-[#FF6F61] text-white rounded-full hover:bg-[#FF8A80] transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
          aria-label="Choose a photo"
        >
          <LuUpload className="w-5 h-5 mr-2" />
          {preview ? 'Change Photo' : 'Upload Photo'}
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Remove photo"
          >
            <LuTrash className="w-5 h-5 mr-2" />
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoSelector;