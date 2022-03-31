import {
    isEqual,
    camelCase,
    get,
    takeRight,
    forEach,
    uniq,
    indexOf,
    concat,
    size,
    includes,
    toUpper,
    snakeCase,
    dropRight,
    drop,
    split,
    join,
    head,
} from 'lodash';

export const canReadEntity = (user, entityName, entity = null) =>
    includes(user?.roles, `ROLE_${toUpper(snakeCase(entityName))}_READ`) || canWriteEntity(user, entityName, entity);

export const canWriteEntity = (user, entityName, entity = null) =>
    includes(user?.roles, `ROLE_${toUpper(snakeCase(entityName))}_WRITE`) ||
    (entityName === 'staff' && isEqual(entity?.user, get(user, '@id'))) ||
    (entityName === 'user' && isEqual(get(entity, '@id'), get(user, '@id'))) ||
    canAllEntity(user, entityName, entity);

//  eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canAllEntity = (user, entityName, entity = null) => includes(user?.roles, `ROLE_${toUpper(snakeCase(entityName))}_ALL`);

export const getEntityFromRole = (role, entityKeyTrad = false) => {
    const roleArray = drop(split(role, '_'));
    const entityName = size(roleArray) > 1 ? join(dropRight(roleArray), '_') : head(roleArray);
    return entityKeyTrad ? camelCase(entityName) : entityName;
};

export const getPermissionFromRole = (role: string) => {
    const roleArray: string[] = split(role, '_');
    return camelCase(head(takeRight(roleArray)));
};

export const getGroupFromRole = (role) => {
    let group = null;

    switch (getEntityFromRole(role)) {
        case 'MANAGER':
        case 'SUPERVISOR':
        case 'DISTRIBUTOR':
        case 'ADMIN':
        case 'TERMOD':
            group = 'common.roles.scope';
            break;
        case 'ACTION':
        case 'ACTION_CAMPAIGN':
        case 'ACTION_MODEL':
            group = 'action.entityName.0';
            break;
        case 'ALERT':
        case 'CONDITION':
        case 'CONDITION_MODEL':
        case 'INDICATOR':
        case 'NOTIFIER':
            group = 'alert.entityName.0';
            break;
        case 'STAFF':
        case 'DIVISION':
        case 'OFFICE':
        case 'BUSINESS_UNIT':
        case 'COMPANY':
            group = 'company.entityName.0';
            break;
        case 'DEVICE':
        case 'DEVICE_MODEL':
            group = 'device.entityName.0';
            break;
        case 'DOCUMENT':
        case 'VALIDATION':
            group = 'document.entityName.0';
            break;
        case 'MEDIA_OBJECT':
            group = 'mediaObject.entityName.0';
            break;
        case 'CONFIG_TIME':
        case 'TIME_SLOT':
            group = 'configTime.entityName.0';
            break;
        case 'SENSOR':
        case 'SENSOR_MODEL':
            group = 'sensor.entityName.0';
            break;
        case 'SURVEY':
        case 'ANSWER':
        case 'QUESTION':
        case 'TRIGGER':
            group = 'survey.entityName.0';
            break;
        case 'SYNCHRONIZATION':
            group = 'synchronization.entityName.0';
            break;
        case 'TOPIC':
        case 'ACTIVITY':
        case 'EVENT_ACTIVITY':
            group = 'topic.entityName.0';
            break;
        case 'USER':
        case 'GROUP':
            group = 'user.entityName.0';
            break;
        case 'NOTIFICATION':
            group = 'notification.entityName.0';
            break;
    }

    return group;
};

export const getFullRoles = (roles) => {
    let fullRoles = [];
    // Hierarchie des scopes
    const scopeRoles = ['ROLE_ADMIN', 'ROLE_DISTRIBUTOR', 'ROLE_SUPERVISOR', 'ROLE_MANAGER', 'ROLE_USER', 'ROLE_TERMOD'];
    forEach(roles, (role) => {
        if (includes(fullRoles, role)) return;
        if (includes(scopeRoles, role)) {
            fullRoles = concat(fullRoles, takeRight(scopeRoles, size(scopeRoles) - indexOf(scopeRoles, role)));
            return;
        }

        const roleWithoutPermission = join(dropRight(split(role, '_')), '_');
        const permissionRole = getPermissionFromRole(role);
        switch (permissionRole) {
            case 'read':
                fullRoles = [...fullRoles, role];
                break;
            case 'write':
                fullRoles = [...fullRoles, role, `${roleWithoutPermission}_READ`];
                break;
            case 'all':
                fullRoles = [...fullRoles, role, `${roleWithoutPermission}_WRITE`, `${roleWithoutPermission}_READ`];
                break;
        }
    });
    return uniq(fullRoles);
};
