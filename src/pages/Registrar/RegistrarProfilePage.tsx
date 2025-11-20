import RegistrarProfile from "./RegistrarProfile";

const mockProfile = {
  id: "reg001",
  firstName: "Dr. Michael",
  lastName: "Thompson",
  email: "michael.thompson@university.edu",
  telephoneNumber: "+1-555-0456",
  profileImageUrl: "https://via.placeholder.com/150",
  employeeId: "REG001",
  department: "Registrar's Office",
  position: "Registrar",
  specialization: "Student Records & Registration Management",
  yearsOfExperience: 12,
  qualifications: "Ph.D. in Education Administration, M.S. in Information Systems",
  officeLocation: "Administration Building, Room 105",
  officeHours: "Monday-Friday: 8:00 AM - 4:00 PM",
  managedDepartments: ["Student Registrations", "Academic Records", "Admissions"],
};

export default function RegistrarProfilePage() {
  return <RegistrarProfile profile={mockProfile} />;
}