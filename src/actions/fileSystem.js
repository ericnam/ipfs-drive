import { ADD_ENTRY, DELETE_ENTRY } from '@Utils/constants';

export const addEntry = entry => {
  // conduct business logic here before adding or deleting records
  return {
    type: ADD_ENTRY,
    payload: entry
  };
};

export const deleteEntry = entry => {
  // conduct business logic here before adding or deleting records
  return {
    type: DELETE_ENTRY,
    payload: entry
  };
};
