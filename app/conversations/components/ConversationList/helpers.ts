import {User} from '@prisma/client';

const filterItems = (items: any[], searchValue: string) => {
  if (!searchValue) {
    return items;
  }

  return items.filter((item) => {
    if (item.isGroup && item.name && item.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
      return true; // Matched by group name
    } else if (!item.isGroup && item.users) {
      const userNames = item.users.map((user: User) => user.name);
      const matchedUsers = userNames.filter(
        (name: string) => name && name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      return matchedUsers.length > 0; // Matched by user names
    }
    return false; // No match
  });
};

export default filterItems;
