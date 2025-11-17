import HODProfile from "./HoDProfile";

const mockProfile = {
  id: "hod001",
  firstName: "Dr. Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@university.edu",
  telephoneNumber: "+1-555-0123",
  profileImageUrl: "https://via.placeholder.com/150",
  employeeId: "HOD001",
  department: "Computer Science",
  position: "Head of Department",
  specialization: "Artificial Intelligence & Machine Learning",
  yearsOfExperience: 15,
  qualifications: "Ph.D. in Computer Science, M.S. in Software Engineering",
  officeLocation: "Building A, Room 301",
  officeHours: "Monday-Friday: 9:00 AM - 5:00 PM",
  managedDepartments: ["Computer Science", "Information Technology", "Data Science"],
};

export default function HODProfilePage() {
  return <HODProfile profile={mockProfile} />;
}