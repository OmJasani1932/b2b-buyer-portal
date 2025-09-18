import { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import { useB3Lang } from '@b3/lang';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

import Form from './ui';

export default function B3ControlSelect({ control, errors, ...rest }: Form.B3UIProps) {
  const {
    fieldType,
    name,
    default: defaultValue,
    required,
    label,
    validate,
    options,
    muiSelectProps,
    setValue,
    onChange,
    replaceOptions,
    size = 'small',
    disabled = false,
    extraPadding,
  } = rest;

  const b3Lang = useB3Lang();

  const muiAttributeProps = muiSelectProps || {};

  const fieldsProps = {
    type: fieldType,
    name,
    defaultValue: defaultValue || '', // Ensure empty string for empty defaults
    rules: {
      required:
        required &&
        b3Lang('global.validate.required', {
          label,
        }),
      validate: validate && ((v: string) => validate(v, b3Lang)),
    },
    control,
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: any) => void,
  ) => {
    // First update the form state using react-hook-form's onChange
    fieldOnChange(e.target.value);

    // Then call the custom onChange if provided
    if (onChange) {
      onChange(e.target.value);
    }

    // Also update using setValue for consistency
    if (setValue) {
      setValue(name, e.target.value);
    }
  };

  return ['dropdown'].includes(fieldType) ? (
    <FormControl
      variant="filled"
      style={{
        width: '100%',
        color: muiSelectProps?.disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.6)',
        display: label === 'backorder' ? 'none' : 'flex',
      }}
      disabled={disabled}
    >
      {label && (
        <InputLabel
          sx={{
            color: muiSelectProps?.disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.6)',
          }}
          error={!!errors[name]}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <Controller
        key={`${fieldsProps.name}-${defaultValue}`}
        {...fieldsProps}
        render={({ field }) => (
          <Select
            {...field}
            {...muiAttributeProps}
            onChange={(e) => onHandleChange(e as ChangeEvent<HTMLInputElement>, field.onChange)}
            size={size}
            error={!!errors[name]}
            sx={{
              ...extraPadding,
            }}
            displayEmpty
          >
            <MenuItem disabled value="">
              Choose Options
            </MenuItem>
            {options?.length &&
              options.map((option: any) => (
                <MenuItem
                  key={option[replaceOptions?.label || 'label']}
                  value={option[replaceOptions?.value || 'value']}
                >
                  {option[replaceOptions?.label || 'label']}
                </MenuItem>
              ))}
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText error={!!errors[name]}>
          {errors[name] ? errors[name].message : null}
        </FormHelperText>
      )}
    </FormControl>
  ) : null;
}
