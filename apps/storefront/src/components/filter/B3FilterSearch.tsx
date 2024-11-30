import { ChangeEvent, useEffect, useState } from 'react';
import { useB3Lang } from '@b3/lang';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';

import { useDebounce } from '@/hooks';

interface B3FilterSearchProps {
  handleChange: (value: string) => void;
  w?: number | undefined | string;
  searchBGColor?: string;
  placeholder?: string;
  h?: number | string;
  searchValue?: string;
}

function B3FilterSearch({
  handleChange,
  w = '100%',
  h,
  searchBGColor = '#efeae7',
  searchValue = '',
  ...restProps
}: B3FilterSearchProps) {
  const [search, setSearch] = useState<string>('');
  const b3Lang = useB3Lang();
  const debouncedValue = useDebounce<string>(search, 500);
  const { placeholder = b3Lang('global.filter.search') } = restProps;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearchValue = () => {
    setSearch('');
  };

  // debounce
  useEffect(() => {
    handleChange(search);
    // disabling this rule as we need to wait for debounceValue change, to search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  useEffect(() => {
    if (searchValue.length > 0) {
      setSearch(searchValue);
    }
  }, [searchValue]);

  return (
    <Paper
      component="div" className='shadow-none rounded-none block border border-gray-300 text-base leading-5 py-2.5 w-full px-5 placeholder-gray-200 bg-white focus-visible:shadow-none focus-visible:outline-none focus-visible:border-primary'>
      <SearchIcon />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          '& .MuiInputBase-input': {
            pb: 0,
          },
        }}
        size="small"
        value={search}
        placeholder={placeholder}
        onChange={handleOnChange}
        endAdornment={
          search.length > 0 && (
            <ClearIcon
              sx={{
                marginRight: '8px',
                cursor: 'pointer',
                padding: '4px',
                fontSize: '1.8rem',
                color: 'rgba(0, 0, 0, 0.54)',
                ':hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '48px',
                },
              }}
              onClick={handleClearSearchValue}
            />
          )
        }
      />
    </Paper>
  );
}

export default B3FilterSearch;
