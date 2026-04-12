/**
 * Checks if a user has a required permission.
 * Includes DO_ALL as a super-admin override.
 * 
 * @param {Object} user 
 * @param {string} permission 
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes('DO_ALL') || user.permissions.includes(permission);
};
