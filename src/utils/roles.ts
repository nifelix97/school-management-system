
// Master list of all available roles in the system
export const ALL_ROLES = [
  "Admin",
  "Principal",
  "Student",
  "Teacher",
  "HOD",
  "Registrar",
  "Accountant",
  "Librarian",
  "Vice Chancellor",
  "Vice Principal",
  "Chancellor",
  "Dean",
  "Nurse",
  "Receptionist",
  "Warden",
  "Manager",
  "Auditor",
  "Alumni",
  "Vendor",
  "Coaches",
  "Parent",
];
export const ROLE_DASHBOARDS: Record<string, string> = {
  "Admin": "/admin/dashboard",
  "Principal": "/principal/dashboard",
  "Student": "/dashboard",
  "Teacher": "/teacher/dashboard",
  "HOD": "/hod/dashboard",
  "Registrar": "/registrar/dashboard",
  "Accountant": "/accountant/dashboard",
  "Librarian": "/librarian/dashboard",
  "Vice Chancellor": "/vice-chancellor/dashboard",
  "Vice Principal": "/vice-principal/dashboard",
  "Chancellor": "/chancellor/dashboard",
  "Dean": "/dean/dashboard",
  "Nurse": "/nurse/dashboard",
  "Receptionist": "/receptionist/dashboard",
  "Warden": "/warden/dashboard",
  "Manager": "/manager/dashboard",
  "Auditor": "/auditor/dashboard",
  "Alumni": "/alumni/dashboard",
  "Vendor": "/vendor/dashboard",
  "Coaches": "/coach/dashboard",
  "Parent": "/parent/dashboard",
};

const ROLES_VISIBILITY_KEY = "system_enabled_roles";

/**
 * Gets the list of roles that are currently enabled for display
 * If no settings are stored, defaults to all roles being enabled
 */
export const getEnabledRoles = (): string[] => {
  const stored = localStorage.getItem(ROLES_VISIBILITY_KEY);
  if (!stored) return ALL_ROLES;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return ALL_ROLES;
  }
};

/**
 * Updates the list of enabled roles in storage
 */
export const setEnabledRoles = (roles: string[]): void => {
  localStorage.setItem(ROLES_VISIBILITY_KEY, JSON.stringify(roles));
};

/**
 * Checks if a specific role is enabled
 */
export const isRoleEnabled = (role: string): boolean => {
  const enabled = getEnabledRoles();
  return enabled.includes(role);
};
