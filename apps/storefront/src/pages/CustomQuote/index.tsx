import { ChangeEvent, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

import CustomButton from '@/components/button/CustomButton';
import { useAppSelector } from '@/store';
import { snackbar } from '@/utils';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { IconCross } from '@/components/experro/assets/icons/icon-cross';
const RemoveIconBlock = styled('div')({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
});

// const VariantSkuBlock = styled('div')({
//   display: 'flex',
//   width: '100%',
// });

// const QtyWraper = styled('div')({
//   width: '120px',
// });

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '15px',
  marginTop: '20px',
  justifyContent: 'space-between',
});

interface ImageItem {
  file: File;
  url?: string;
  name?: string;
  uploading?: boolean;
}

interface CustomQuoteItem {
  name: string;
  description: string;
  images: ImageItem[];
  quantity: string;
  errors?: {
    name?: string;
    description?: string;
    images?: string;
    quantity?: string;
  };
}

const CUSTOM_QUOTE_API = {
  URL: 'https://dev-ProductAddRequest.cookandboardman.io/api/v1/add-quote',
  ACCESS_KEY: '11afb7c2-7381-4a74-ac55-9728ad6205b6',
};

function CustomQuote() {
  const customerId = useAppSelector(({ company }) => company.customer.id);
  const [items, setItems] = useState<CustomQuoteItem[]>([
    { name: '', description: '', images: [], quantity: '', errors: {} },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNameChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedItems = [...items];
    updatedItems[index].name = e.target.value;
    // Clear error when user types
    if (updatedItems[index].errors?.name) {
      updatedItems[index].errors = { ...updatedItems[index].errors, name: undefined };
    }
    setItems(updatedItems);
  };

  const handleDescriptionChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedItems = [...items];
    updatedItems[index].description = e.target.value;
    // Clear error when user types
    if (updatedItems[index].errors?.description) {
      updatedItems[index].errors = { ...updatedItems[index].errors, description: undefined };
    }
    setItems(updatedItems);
  };

  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const updatedItems = [...items];
      const files = Array.from(e.target.files);

      // Clear error when user uploads
      if (updatedItems[index].errors?.images) {
        updatedItems[index].errors = { ...updatedItems[index].errors, images: undefined };
      }

      // Add new images to the existing images array
      files.forEach((file) => {
        const newImage: ImageItem = {
          file,
          uploading: true,
        };
        updatedItems[index].images.push(newImage);
      });

      setItems([...updatedItems]);

      // Upload each file
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('file', file);

        const apiUrl =
          'https://admin.experro.app/apis/media-manager-service/v1/workspaces/d0a50e2c-f556-4d85-9646-892db3de0b2a/folders/58f265d2-7692-4319-a51a-6dc8f8a1ed10/files';
        const requestOptions = {
          method: 'POST',
          headers: {
            accesstoken:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjI5M2M1MWFiLTVkNTItNGZiMS05MzBiLTVjZDcyYzQ3MzNkOSIsInVzZXJJZCI6IjZlNDgyNTkzLTEzMmEtNGMzOS1hOTMxLWY1NTUyMjVkYTUyYyIsIndvcmtzcGFjZUlkIjoiZDBhNTBlMmMtZjU1Ni00ZDg1LTk2NDYtODkyZGIzZGUwYjJhIiwibmFtZSI6Ik5heWFuIiwidHlwZSI6IkZVTExfQUNDRVNTIiwidG9rZW5UeXBlIjoiQVBJIiwiYnlUb2tlbiI6Ik5heWFuIiwiYXBwSWQiOiJhYjFjNzFkMy1hYmYzLTRkYWQtYWRmMy1jMTMzM2RjNzk0NTgiLCJpYXQiOjE3NDk1NTA2MjZ9.mYXN1GMBzNQ3xiUVUM1Dm9Db4bYqfA1kGZvXG2Q52oo',
          },
          body: formData,
        };

        fetch(apiUrl, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data?.Status === 'success') {
              // Update the specific image with URL and name
              setItems((currentItems) => {
                const newItems = [...currentItems];
                const imageIndex = newItems[index].images.findIndex(
                  (img) => img.file === file && img.uploading,
                );
                if (imageIndex !== -1) {
                  newItems[index].images[imageIndex] = {
                    ...newItems[index].images[imageIndex],
                    url: data?.Data?.item,
                    name: data?.Data?.file_meta_data.name,
                    uploading: false,
                  };
                }
                return newItems;
              });
            }
          })
          .catch((error) => {
            console.error('Fetch error:', error);
            snackbar.error(`Failed to upload ${file.name}`);
            // Remove the failed image from the list
            setItems((currentItems) => {
              const newItems = [...currentItems];
              newItems[index].images = newItems[index].images.filter(
                (img) => !(img.file === file && img.uploading),
              );
              return newItems;
            });
          });
      });

      // Reset the input value to allow re-uploading the same file
      e.target.value = '';
    }
  };

  const handleRemoveImage = (itemIndex: number, imageIndex: number) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].images.splice(imageIndex, 1);
    setItems(updatedItems);
  };

  const handleQuantityChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = e.target.value;
    // Clear error when user types
    if (updatedItems[index].errors?.quantity) {
      updatedItems[index].errors = { ...updatedItems[index].errors, quantity: undefined };
    }
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    setItems([...items, { name: '', description: '', images: [], quantity: '', errors: {} }]);
  };

  const handleDeleteRow = (index: number) => {
    if (items.length <= 1) {
      return;
    }
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const resetForm = () => {
    setItems([{ name: '', description: '', images: [], quantity: '', errors: {} }]);
  };

  const validateItems = (): boolean => {
    const updatedItems = [...items];
    let isValid = true;

    updatedItems.forEach((item, index) => {
      const errors: CustomQuoteItem['errors'] = {};

      if (!item.name.trim()) {
        errors.name = 'Name is required';
        isValid = false;
      }

      if (!item.description.trim()) {
        errors.description = 'Description is required';
        isValid = false;
      }

      if (!item.images.length || !item.images.some((img) => img.url && !img.uploading)) {
        errors.images = 'Image is required';
        isValid = false;
      }

      if (!item.quantity || parseInt(item.quantity, 10) <= 0) {
        errors.quantity = 'Quantity is required';
        isValid = false;
      }

      updatedItems[index].errors = errors;
    });

    setItems(updatedItems);
    return isValid;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!validateItems()) {
      // snackbar.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const products = items.map((item) => ({
      name: item.name,
      description: item.description,
      url: item.images.filter((img) => img.url && !img.uploading).map((img) => img.url), // Multiple image URLs
      quantity: parseInt(item.quantity, 10),
    }));

    const requestBody = {
      customerId: parseInt(customerId?.toString() || '0', 10),
      products,
    };

    const apiUrl = `${CUSTOM_QUOTE_API.URL}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        appaccesskey: CUSTOM_QUOTE_API.ACCESS_KEY,
      },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response?.status === 200) {
        snackbar.success('Custom quote submitted successfully');
        setIsSubmitting(false);
        // Reset form after successful submission
        resetForm();
      } else {
        snackbar.error('Failed to submit custom quote. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
                        .lds-spinner,
                        .lds-spinner div,
                        .lds-spinner div:after {
                          box-sizing: border-box;
                        }
                        .lds-spinner {
                          color: white;
                          display: inline-block;
                          position: relative;
                          width: 80px;
                          height: 80px;
                        }
                        .lds-spinner div {
                          transform-origin: 40px 40px;
                          animation: lds-spinner 1.2s linear infinite;
                        }
                        .lds-spinner div:after {
                          content: " ";
                          display: block;
                          position: absolute;
                          top: 3.2px;
                          left: 36.8px;
                          width: 6.4px;
                          height: 17.6px;
                          border-radius: 20%;
                          background: white;
                        }
                        .lds-spinner div:nth-child(1) {
                          transform: rotate(0deg);
                          animation-delay: -1.1s;
                        }
                        .lds-spinner div:nth-child(2) {
                          transform: rotate(30deg);
                          animation-delay: -1s;
                        }
                        .lds-spinner div:nth-child(3) {
                          transform: rotate(60deg);
                          animation-delay: -0.9s;
                        }
                        .lds-spinner div:nth-child(4) {
                          transform: rotate(90deg);
                          animation-delay: -0.8s;
                        }
                        .lds-spinner div:nth-child(5) {
                          transform: rotate(120deg);
                          animation-delay: -0.7s;
                        }
                        .lds-spinner div:nth-child(6) {
                          transform: rotate(150deg);
                          animation-delay: -0.6s;
                        }
                        .lds-spinner div:nth-child(7) {
                          transform: rotate(180deg);
                          animation-delay: -0.5s;
                        }
                        .lds-spinner div:nth-child(8) {
                          transform: rotate(210deg);
                          animation-delay: -0.4s;
                        }
                        .lds-spinner div:nth-child(9) {
                          transform: rotate(240deg);
                          animation-delay: -0.3s;
                        }
                        .lds-spinner div:nth-child(10) {
                          transform: rotate(270deg);
                          animation-delay: -0.2s;
                        }
                        .lds-spinner div:nth-child(11) {
                          transform: rotate(300deg);
                          animation-delay: -0.1s;
                        }
                        .lds-spinner div:nth-child(12) {
                          transform: rotate(330deg);
                          animation-delay: 0s;
                        }
                        @keyframes lds-spinner {
                          0% {
                            opacity: 1;
                          }
                          100% {
                            opacity: 0;
                          }
                        }
        `}
      </style>
      {(isSubmitting || items.some((item) => item.images.some((img) => img.uploading))) && (
        <div className="fixed top-0 left-0 w-full h-dvh bg-black/50 z-[9999] flex items-center justify-center">
          <div className="lds-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
      <div className="[&_.quote-items+.quote-items]:mt-8 [&_.quote-items+.quote-items]:pt-8 [&_.quote-items+.quote-items]:border-t [&_.quote-items+.quote-items]:border-[#ccc4c1]">
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Custom Quote
        </Typography>

        <div>
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex w-full md:items-start quote-items">
              <div className="mt-[31px]">
                <RemoveIconBlock
                  className={`${
                    items.length <= 1 ? 'opacity-50 pointer-events-none' : ''
                  } w-[44px] h-[44px]`}
                  onClick={() => handleDeleteRow(index)}
                >
                  <RemoveIcon />
                </RemoveIconBlock>
              </div>

              <div className="w-full">
                <div className="flex items-start flex-wrap">
                  <div className="flex flex-wrap lg:w-[calc(100%_-_300px)] md:w-[calc(100%_-_200px)] w-full md:pr-6">
                    <div className="md:w-[calc(100%_-_120px)] md:pr-6 w-full md:order-1 order-1">
                      <div className="relative [&_.MuiFormLabel-root]:max-w-full">
                        <TextField
                          label={
                            <span className="flex justify-between">
                              <span>
                                Name/sku <span style={{ color: '#d32f2f' }}>*</span>
                              </span>
                              <span>{item.name.replace(/\s/g, '').length}/255</span>
                            </span>
                          }
                          variant="filled"
                          autoComplete="off"
                          size="small"
                          fullWidth
                          value={item.name}
                          onChange={(e: any) => handleNameChange(index, e)}
                          error={!!item.errors?.name}
                          className="w-full [&_.Mui-error]:border-[#d32f2f]"
                          inputProps={{ maxLength: 255 }}
                        />
                        <span className="absolute right-0 top-0"></span>
                      </div>
                      {/* {item.errors?.name && (
                        <Typography
                          className="absolute top-full bottom-auto left-0"
                          color="error"
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.errors.name}
                        </Typography>
                      )} */}
                    </div>
                    <div className="relative md:w-[120px] w-[calc(100%_-_60px)] md:order-2 order-3 md:pt-0 pt-4">
                      <TextField
                        label={
                          <span>
                            Qty <span style={{ color: '#d32f2f' }}>*</span>
                          </span>
                        }
                        inputProps={{ className: 'qty-pad' }}
                        hiddenLabel
                        type="number"
                        variant="filled"
                        size="small"
                        autoComplete="off"
                        value={item.quantity}
                        onChange={(e: any) => handleQuantityChange(index, e)}
                        error={!!item.errors?.quantity}
                        className="[&_.Mui-error]:border-[#d32f2f]"
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                            {
                              display: 'none',
                            },
                          '& input[type=number]': {
                            MozAppearance: 'textfield',
                          },
                          width: '100%',
                        }}
                      />
                      {/* {item.errors?.quantity && (
                        <Typography
                          className="absolute top-full bottom-auto left-0"
                          color="error"
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.errors.quantity}
                        </Typography>
                      )} */}
                    </div>
                    <div className="w-full relative md:pt-6 pt-4 [&_.MuiFormLabel-root]:max-w-full md:order-3 order-2">
                      <TextField
                        label={
                          <span className="flex justify-between">
                            <span>
                              Description <span style={{ color: '#d32f2f' }}>*</span>
                            </span>
                            <span>{item.description.replace(/\s/g, '').length}/2000</span>
                          </span>
                        }
                        variant="filled"
                        autoComplete="off"
                        size="small"
                        fullWidth
                        multiline
                        minRows={5}
                        value={item.description}
                        onChange={(e: any) => handleDescriptionChange(index, e)}
                        error={!!item.errors?.description}
                        className={`w-full [&_.Mui-error]:border-[#d32f2f] [&_.MuiInputBase-multiline]:h-[148px] [&_.MuiInputBase-multiline]:flex [&_.MuiInputBase-multiline]:items-start ${
                          item.description.replace(/\s/g, '').length > 410
                            ? '[&_.MuiInputBase-multiline]:overflow-y-auto'
                            : ''
                        }`}
                        inputProps={{ maxLength: 2000 }}
                      />
                      {/* {item.errors?.description && (
                        <Typography
                          className="absolute top-full bottom-auto left-0"
                          color="error"
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.errors.description}
                        </Typography>
                      )} */}
                    </div>

                    <div className="w-11 relative md:hidden flex items-end md:order-1 order-4 pl-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        id={`image-upload-${index}`}
                        onChange={(e: any) => handleImageChange(index, e)}
                        style={{ display: 'none' }}
                      />
                      <label className="relative" htmlFor={`image-upload-${index}`}>
                        <span
                          className={`p-0 line-clamp-1 text-center w-[44px] h-[44px] flex items-center justify-center border cursor-pointer hover:bg-primary hover:border-primary hover:text-white ${
                            item.errors?.images ? 'border-[#d32f2f]' : ''
                          }`}
                        >
                          <CloudUploadOutlinedIcon />
                        </span>
                        {/* {item.errors?.images && (
                            <Typography
                              className="absolute top-full bottom-auto left-0"
                              color="error"
                              variant="caption"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {item.errors.images}
                            </Typography>
                          )} */}
                      </label>
                    </div>
                  </div>

                  <div className="lg:w-[300px] md:w-[200px] w-full relative md:pt-[31px]">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id={`image-upload-${index}`}
                      onChange={(e: any) => handleImageChange(index, e)}
                      style={{ display: 'none' }}
                    />
                    <label
                      className="relative w-full flex justify-center md:flex block hidden"
                      htmlFor={`image-upload-${index}`}
                    >
                      <span
                        className={`p-0 text-center w-[140px] h-[44px] flex items-center justify-center border cursor-pointer hover:bg-primary hover:border-primary hover:text-white relative group/tooltip ${
                          item.errors?.images ? 'border-[#d32f2f]' : ''
                        }`}
                      >
                        <span className="absolute top-auto bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-sm py-2 px-4 w-[200px] group-hover/tooltip:opacity-100 opacity-0 transition-opacity mb-3 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-l-[6px] after:border-r-[6px] after:border-t-[6px] after:border-l-transparent after:border-r-transparent after:border-t-black">
                          You can upload multiple image here
                        </span>
                        {item.images.some((img) => img.uploading) ? (
                          <Skeleton
                            variant="circular"
                            width={24}
                            height={24}
                            className="animate-pulse"
                          />
                        ) : (
                          <CloudUploadOutlinedIcon />
                        )}
                      </span>
                      {/* {item.errors?.images && (
                        <Typography
                          className="absolute top-full bottom-auto left-0"
                          color="error"
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.errors.images}
                        </Typography>
                      )} */}
                    </label>

                    {/* Display uploaded images */}
                    {item.images.length > 0 && (
                      <div className="mt-6">
                        <label
                          className="text-base text-gray-200 mb-2 block"
                          htmlFor="image-upload-{index}"
                        >
                          Uploaded Images ({item.images.length}):
                        </label>
                        <div className="flex flex-wrap -mx-2 -mt-4">
                          {item.images.map((image, imageIndex) => (
                            <div className=" lg:w-4/12 md:w-6/12 w-4/12 px-2 pt-4">
                              <div
                                // key={imageIndex}
                                className="relative border border-[#dddddd] p-1 h-full"
                              >
                                {image.uploading ? (
                                  <div className="flex flex-col gap-2">
                                    <Skeleton
                                      variant="rectangular"
                                      width="100%"
                                      height={80}
                                      className="aspect-[1/0.7]"
                                    />
                                    <Skeleton variant="text" width="80%" height={16} />
                                  </div>
                                ) : (
                                  <>
                                    <div
                                      className="flex flex-col gap-2 overflow-hidden"
                                      title={image.name}
                                    >
                                      <span>
                                        <img
                                          className="w-full h-full object-cover max-h-[80px] aspect-[1/0.7]"
                                          width={80}
                                          height={80}
                                          alt=""
                                          src={image.url}
                                        />
                                      </span>
                                      <span>
                                        {image.name?.substring(0, 15)}
                                        {image.name && image.name.length > 15 ? '...' : ''}
                                      </span>
                                    </div>
                                    <span
                                      className="w-5 h-5 p-1 bg-primary rounded-full flex items-center justify-center absolute -top-2 -right-2 cursor-pointer text-white hover:opacity-70"
                                      onClick={() => handleRemoveImage(index, imageIndex)}
                                    >
                                      <IconCross />
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ButtonContainer>
          <CustomButton
            onClick={handleSubmit}
            type="button"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote'}
          </CustomButton>
          <CustomButton onClick={handleAddRow} type="button" variant="outlined">
            + Add Row
          </CustomButton>
        </ButtonContainer>
      </div>
    </>
  );
}

export default CustomQuote;
