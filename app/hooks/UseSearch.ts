import {useState, useMemo, useEffect, useCallback} from 'react';
import {debounce} from 'lodash';

const useSearch = (items: any[], searchKey: string, debounceDelay: number) => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const filterItems = (searchText: string) => {
    return items.filter((item) => item[searchKey]?.toLowerCase().startsWith(searchText.toLowerCase()));
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return debouncedSearch.cancel;
  }, [searchValue, debouncedSearch]);

  const filteredItems = useMemo(() => filterItems(debouncedSearchValue), [debouncedSearchValue, items, searchKey]);

  return {
    searchValue,
    setSearchValue,
    filteredItems,
  };
};

export default useSearch;
