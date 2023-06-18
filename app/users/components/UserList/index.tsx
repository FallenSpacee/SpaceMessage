'use client';

// react
import {FC, useState} from 'react';
// components
import SearchInput from '@/app/components/SearchInput';
import UserBox from '../UserBox';
// types
import {UserListProps} from './types';
import useSearch from '@/app/hooks/UseSearch';

const UserList: FC<UserListProps> = ({items}) => {
  const {searchValue, setSearchValue, filteredItems} = useSearch(items, 'name', 500);

  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
        </div>
        {/* Add search input field */}
        <SearchInput
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search users"
        />
        {/* Render filtered user list */}
        {filteredItems.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
