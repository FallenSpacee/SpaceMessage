// react
import {useState, useMemo, useEffect, useCallback} from 'react';
// libraries
import {debounce} from 'lodash';

const useSearch = (items: any[], searchKey: string, StrMethodKey: 'includes' | 'startsWith', debounceDelay: number) => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const filterItems = useCallback(
    (searchText: string) => {
      return searchText
        ? items.filter((item) => item[searchKey]?.toLowerCase()[StrMethodKey](searchText.toLowerCase()))
        : items;
    },
    [items, searchKey]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value);
      }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const filteredItems = useMemo(() => filterItems(debouncedSearchValue), [debouncedSearchValue, filterItems]);

  return {
    searchValue,
    setSearchValue,
    filteredItems,
  };
};

export default useSearch;
