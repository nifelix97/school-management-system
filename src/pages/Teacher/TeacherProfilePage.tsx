import TeacherProfile from "../../components/TeacherProfile";

const TeacherProfilePage = () => {
  // Sample teacher profile data
  const teacherProfile = {
    id: "teacher-001",
    firstName: "Dr. Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@school.edu",
    telephoneNumber: "+1 (555) 123-4567",
    profileImageUrl: "https://via.placeholder.com/150",
    employeeId: "TCH-2024-0892",
    department: "Mathematics",
    position: "Senior Professor",
    specialization: "Advanced Calculus & Statistics",
    yearsOfExperience: 12,
    qualifications: "Ph.D. in Mathematics from MIT, M.Sc. in Applied Mathematics from Stanford University, B.Sc. in Mathematics from Harvard University",
    officeLocation: "Room 204, Mathematics Building",
    officeHours: "Monday-Friday: 2:00 PM - 4:00 PM",
    emergencyContacts: [
      {
        id: "emergency-1",
        name: "John Wilson",
        priority: "Primary" as const,
        phone: "+1 (555) 987-6543",
        mobilePhone: "+1 (555) 876-5432",
        email: "john.wilson@email.com",
        workPhone: "+1 (555) 765-4321",
        relation: "Spouse"
      },
      {
        id: "emergency-2",
        name: "Mary Wilson",
        priority: "Secondary" as const,
        phone: "+1 (555) 654-3210",
        mobilePhone: "+1 (555) 543-2109",
        email: "mary.wilson@email.com",
        workPhone: "",
        relation: "Sister"
      }
    ]
  };

  // const handleCreateEmergencyContact = () => {
  //   console.log("Create emergency contact");
  //   // TODO: Implement create emergency contact functionality
  // };

  // const handleEditEmergencyContact = (id: string) => {
  //   console.log("Edit emergency contact:", id);
  //   // TODO: Implement edit emergency contact functionality
  // };

  const handleDeleteEmergencyContact = (id: string) => {
    console.log("Delete emergency contact:", id);
    // TODO: Implement delete emergency contact functionality
  };

  const handleUpdatePersonal = async (data: any) => {
    console.log("Update personal info:", data);
    // TODO: Implement update personal info functionality
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-50 mb-2 sm:mb-3">
            Teacher Profile
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-50">
            Manage your personal information and emergency contacts
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
          <TeacherProfile
            profile={teacherProfile}
            // onCreateEmergencyContact={handleCreateEmergencyContact}
            // onEditEmergencyContact={handleEditEmergencyContact}
            onDeleteEmergencyContact={handleDeleteEmergencyContact}
            onUpdatePersonal={handleUpdatePersonal}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;