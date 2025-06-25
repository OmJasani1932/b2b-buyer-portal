import { ChangeEvent, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import CustomButton from '@/components/button/CustomButton';
import { useAppSelector } from '@/store';
import { snackbar } from '@/utils';

const RemoveIconBlock = styled('div')({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
});

const VariantSkuBlock = styled('div')({
  display: 'flex',
  width: '100%',
});

const QtyWraper = styled('div')({
  width: '120px',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '15px',
  marginTop: '20px',
  justifyContent: 'space-between',
});

interface CustomQuoteItem {
  name: string;
  image: File | null;
  imageUrl?: string;
  imageName?: string;
  quantity: string;
  errors?: {
    name?: string;
    image?: string;
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
    { name: '', image: null, quantity: '', errors: {} },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const handleNameChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedItems = [...items];
    updatedItems[index].name = e.target.value;
    // Clear error when user types
    if (updatedItems[index].errors?.name) {
      updatedItems[index].errors = { ...updatedItems[index].errors, name: undefined };
    }
    setItems(updatedItems);
  };

  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingImage(true);
      const updatedItems = [...items];
      // eslint-disable-next-line prefer-destructuring
      updatedItems[index].image = e.target.files[0];
      // Clear error when user uploads
      if (updatedItems[index].errors?.image) {
        updatedItems[index].errors = { ...updatedItems[index].errors, image: undefined };
      }

      const file = e.target.files[0];
      const formData = new FormData();
      const reader = new FileReader();

      // eslint-disable-next-line func-names
      reader.onload = function () {
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
              // Store the image URL and name
              updatedItems[index].imageUrl = data?.Data?.item;
              updatedItems[index].imageName = data?.Data?.file_meta_data.name;
              setItems([...updatedItems]);
              setIsUploadingImage(false);
            }
          })
          .catch((error) => {
            console.error('Fetch error:', error);
            setIsUploadingImage(false);
            snackbar.error('Failed to upload image');
          });
      };

      reader.readAsBinaryString(file);
      // setItems(updatedItems);
    }
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
    setItems([...items, { name: '', image: null, quantity: '', errors: {} }]);
  };

  const handleDeleteRow = (index: number) => {
    if (items.length <= 1) {
      return;
    }
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const resetForm = () => {
    setItems([{ name: '', image: null, quantity: '', errors: {} }]);
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

      if (!item.imageUrl) {
        errors.image = 'Image is required';
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
      url: item.imageUrl, // Use the stored image URL
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
      {(isSubmitting || isUploadingImage) && (
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
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Custom Quote
        </Typography>

        <div>
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} sx={{ marginBottom: '30px' }}>
              <VariantSkuBlock className="md:items-end">
                <RemoveIconBlock
                  className={`${
                    items.length <= 1 ? 'opacity-50 pointer-events-none' : ''
                  } w-[44px] h-[44px]`}
                  onClick={() => handleDeleteRow(index)}
                >
                  <RemoveIcon />
                </RemoveIconBlock>

                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '15px',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                  }}
                >
                  <div className="md:w-[60%] w-full relative">
                    <TextField
                      label="Name"
                      variant="filled"
                      autoComplete="off"
                      size="small"
                      fullWidth
                      value={item.name}
                      onChange={(e: any) => handleNameChange(index, e)}
                      error={!!item.errors?.name}
                      className="w-full"
                    />
                    {item.errors?.name && (
                      <Typography
                        className="absolute top-full bottom-auto left-0"
                        color="error"
                        variant="caption"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {item.errors.name}
                      </Typography>
                    )}
                  </div>

                  <Box sx={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`image-upload-${index}`}
                      onChange={(e: any) => handleImageChange(index, e)}
                      style={{ display: 'none' }}
                    />
                    <label className="relative" htmlFor={`image-upload-${index}`}>
                      <CustomButton
                        component="span"
                        variant="outlined"
                        fullWidth
                        className="py-[11px] line-clamp-1 text-center"
                        // color={item.errors?.image ? 'error' : 'primary'}
                      >
                        Upload Image
                      </CustomButton>
                      {item.imageName && (
                        <Typography
                          className="line-clamp-1 text-black absolute top-full bottom-auto left-0"
                          title={item.imageName}
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.imageName ? item.imageName : ''}
                        </Typography>
                      )}
                      {item.errors?.image && (
                        <Typography
                          className="absolute top-full bottom-auto left-0"
                          color="error"
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {item.errors.image}
                        </Typography>
                      )}
                    </label>
                  </Box>

                  <QtyWraper className="relative">
                    <TextField
                      label="Qty"
                      inputProps={{ className: 'qty-pad' }}
                      hiddenLabel
                      type="number"
                      variant="filled"
                      size="small"
                      autoComplete="off"
                      value={item.quantity}
                      onChange={(e: any) => handleQuantityChange(index, e)}
                      error={!!item.errors?.quantity}
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          display: 'none',
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield',
                        },
                        width: '100%',
                      }}
                    />
                    {item.errors?.quantity && (
                      <Typography
                        className="absolute top-full bottom-auto left-0"
                        color="error"
                        variant="caption"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {item.errors.quantity}
                      </Typography>
                    )}
                  </QtyWraper>
                </Box>
              </VariantSkuBlock>
            </Box>
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
      </Box>
    </>
  );
}

export default CustomQuote;
