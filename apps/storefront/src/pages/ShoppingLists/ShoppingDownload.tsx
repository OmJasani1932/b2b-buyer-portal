/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import {
  Button,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  FilledInput,
} from '@mui/material';

import { getB2BCountries } from '@/shared/service/b2b';
import { useAppSelector } from '@/store';
import B3Dialog from '@/components/B3Dialog';

function ShoppingDownload(props: any) {
  const { shoppingList } = props;
  const tempallAddressFields = [
    { name: 'firstName', label: 'First Name', required: true, fieldType: 'text' },
    { name: 'lastName', label: 'Last Name', required: true, fieldType: 'text' },
    { name: 'company', label: 'Company Name', required: false, fieldType: 'text' },
    { name: 'phone', label: 'Phone Number', required: false, fieldType: 'text' },
    { name: 'address1', label: 'Address Line 1', required: true, fieldType: 'text' },
    { name: 'address2', label: 'Address Line 2', required: false, fieldType: 'text' },
    { name: 'city', label: 'Suburb/City', required: true, fieldType: 'text' },
    { name: 'country', label: 'Country', required: true, fieldType: 'dropdown' },
    { name: 'state', label: 'State/Province', required: false, fieldType: 'dropdown' },
    { name: 'postalCode', label: 'Zip/Postcode', required: true, fieldType: 'text' },
  ];

  const customerId = useAppSelector(({ company }) => company.customer.id);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [countries, setCountriesData] = useState<any>([]);
  const [states, setStatesData] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setErrors({});
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'country') {
      const selectedCountry = countries.find((country: any) => country.countryCode === value);
      setStatesData(selectedCountry?.states || []);
      setFormData((prevData: any) => ({
        ...prevData,
        country: value,
        state: '',
      }));
    } else {
      setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    tempallAddressFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsloading(true);
      console.log(shoppingList);
      const requestData = {
        shoppingListId: shoppingList?.id,
        customerId,
        poNumber: '',
        notes: '',
        orderName: '',
        address: {
          shipTo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address1: formData.address1,
            address2: formData.address2 || '',
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        },
        quoteConfigurationId: 17,
      };

      try {
        const response = await fetch(
          'https://bigcom-order-service.cookandboardman.io/apis/order-service/v1/shopping-list-quote',
          {
            method: 'POST',
            headers: { clientid: 'order-56aaf9ef-770e-46b1-aeae-d72f62d9b279' },
            body: JSON.stringify(requestData),
          },
        );

        const data = await response.json();
        if (response.ok) {
          console.log('API Response:', data);
          handleClose();
        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        handleClose();
        console.error('Error submitting form:', error);
      }
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const { countries } = await getB2BCountries();
      setCountriesData(countries);
    };
    fetchCountries();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Shipping Address
      </Button>

      <B3Dialog
        isOpen={open}
        fullWidth
        title={'Add Shipping Address'}
        maxWidth="sm"
        rightSizeBtn="submit"
        handleLeftClick={handleClose}
        handRightClick={handleSubmit}
      >
        <form>
          {tempallAddressFields.map((field: any) => (
            <FormControl
              key={field.name}
              variant="filled"
              fullWidth
              style={{ marginBottom: '15px' }}
              error={!!errors[field.name]}
            >
              <InputLabel required={field.required}>{field.label}</InputLabel>
              {field.fieldType === 'text' ? (
                <FilledInput
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
              ) : field.fieldType === 'dropdown' ? (
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>Select {field.label}</em>
                  </MenuItem>
                  {field.name === 'country'
                    ? countries.map((country: any) => (
                        <MenuItem key={country.countryCode} value={country.countryCode}>
                          {country.countryName}
                        </MenuItem>
                      ))
                    : field.name === 'state'
                    ? states.map((state: any) => (
                        <MenuItem key={state.stateCode} value={state.stateName}>
                          {state.stateName}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              ) : null}
              <FormHelperText>{errors[field.name] || ''}</FormHelperText>
            </FormControl>
          ))}
        </form>
      </B3Dialog>
    </>
  );
}

export default ShoppingDownload;
