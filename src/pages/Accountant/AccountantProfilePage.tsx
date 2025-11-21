import AccountantProfile from "./AccountantProfile";

const mockProfile = {
  id: "acc001",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@university.edu",
  telephoneNumber: "+1-555-0789",
  profileImageUrl: "https://via.placeholder.com/150",
  employeeId: "ACC001",
  department: "Finance Department",
  position: "Chief Accountant",
  specialization: "Financial Management & Budgeting",
  yearsOfExperience: 15,
  qualifications: "CPA, MBA in Finance, B.S. in Accounting",
  officeLocation: "Finance Building, Room 201",
  officeHours: "Monday-Friday: 9:00 AM - 5:00 PM",
  managedDepartments: ["Student Payments", "Invoicing", "Financial Reporting"],
};

export default function AccountantProfilePage() {
  return <AccountantProfile profile={mockProfile} />;
}