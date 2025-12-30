
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
  "Procurement",
  "Sport Activity",
  "Parent",
  // "Super Admin",
  "Student Association",
  "Student Life",
  "Transport Manager",
  "Human Resource"
];

export const ROLE_GROUPS = {
  "Leadership & Governance": [
    "Chancellor",
    "Vice Chancellor",
    "Principal",
    "Vice Principal"
  ],

  "Academic & Learning": [
    "Dean",
    "HOD",
    "Teacher",
    "Student",
    "Alumni",
    "Guild President",
    "Parent"
  ],

  "Administration & Operations": [
    "Admin",
    "Registrar",
    "Accountant",
    "Auditor",
    "Receptionist",
    "Manager",
    "Human Resource"
  ],

  "Support & Welfare Services": [
    "Librarian",
    "Nurse",
    "Student Life",
    "Warden",
    "Transport Manager",
    "Sport Activity",
    "Procurement",
    "Student Association"
  ]
} as const;


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
  "Procurement": "/vendor/dashboard",
  "Sport Activity": "/coach/dashboard",
  "Parent": "/parent/dashboard",
  "Super Admin": "/super-admin/dashboard",
  "Student Association": "/guild/dashboard",
  "Student Life": "/counselor/dashboard",
  "Transport Manager": "/transport-manager/dashboard",
  "Human Resource": "/hr/dashboard",
};

const ROLES_VISIBILITY_KEY = "system_enabled_roles";
const SYSTEM_LOCK_KEY = "system_global_lock";

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

/**
 * Checks if the system is globally locked
 */
export const isSystemLocked = (): boolean => {
  return localStorage.getItem(SYSTEM_LOCK_KEY) === "true";
};

/**
 * Sets the system lock status
 */
export const setSystemLock = (locked: boolean): void => {
  localStorage.setItem(SYSTEM_LOCK_KEY, locked ? "true" : "false");
};
