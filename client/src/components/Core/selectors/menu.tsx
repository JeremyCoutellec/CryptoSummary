import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

export const getMenuSelector = createSelector(selectSelf, (state) => state.coreMenu);
