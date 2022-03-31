import { createSelector } from '@reduxjs/toolkit';
import { includes } from 'lodash';

const selectSelf = (state) => state;

export const getAuthSelector = createSelector(selectSelf, (state) => state.coreAuth);

export const getCoreAlertSelector = createSelector(selectSelf, (state) => state.coreAlert);

export const getLangSelector = createSelector(getAuthSelector, (auth) => auth?.lang);

export const getUserAuthSelector = createSelector(getAuthSelector, (auth) => auth?.user);

const getRolesSelector = createSelector(getUserAuthSelector, (user) => user?.roles);

export const isAdmin = createSelector(getRolesSelector, (roles) => includes(roles, 'ROLE_ADMIN'));

export const isManager = createSelector(getRolesSelector, (roles) => includes(roles, 'ROLE_MANAGER'));

export const isSupervisor = createSelector(getRolesSelector, (roles) => includes(roles, 'ROLE_SUPERVISOR'));

