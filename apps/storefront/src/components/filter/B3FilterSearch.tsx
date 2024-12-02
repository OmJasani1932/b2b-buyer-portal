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
    <div className="relative w-full">
      <SearchIcon className="text-gray-200 w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <InputBase
        className="w-full !px-10"
        size="small"
        value={search}
        placeholder={placeholder}
        onChange={handleOnChange}
        endAdornment={
          search.length > 0 && (
            <ClearIcon
              className="absolute right-4 w-5 h-5 cursor-pointer text-gray-200 hover:text-primary"
              onClick={handleClearSearchValue}
            />
          )
        }
      />
    </div>
  );
}

export default B3FilterSearch;
