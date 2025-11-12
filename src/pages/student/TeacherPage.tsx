import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Star,
  Award,
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  office: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
  education: string[];
  officeHours: string;
  nextClass: string;
}

export default function TeacherPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Smith",
      subject: "Mathematics",
      email: "dr.smith@school.edu",
      phone: "+1 (555) 123-4567",
      office: "Room 101",
      experience: "15 years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Smith is a passionate mathematics educator with over 15 years of experience. He specializes in advanced calculus and algebra, making complex concepts accessible to students.",
      education: ["PhD in Mathematics - MIT", "MS in Applied Mathematics - Stanford"],
      officeHours: "Mon, Wed, Fri: 2:00 PM - 4:00 PM",
      nextClass: "Today at 9:00 AM"
    },
    {
      id: 2,
      name: "Prof. Johnson",
      subject: "Physics",
      email: "prof.johnson@school.edu",
      phone: "+1 (555) 234-5678",
      office: "Lab 201",
      experience: "12 years",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Prof. Johnson brings physics to life through hands-on experiments and real-world applications. Her research in quantum mechanics has been published in leading journals.",
      education: ["PhD in Physics - Caltech", "BS in Physics - UC Berkeley"],
      officeHours: "Tue, Thu: 1:00 PM - 3:00 PM",
      nextClass: "Tomorrow at 11:00 AM"
    },
    {
      id: 3,
      name: "Dr. Wilson",
      subject: "Chemistry",
      email: "dr.wilson@school.edu",
      phone: "+1 (555) 345-6789",
      office: "Lab 301",
      experience: "10 years",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Wilson is known for his innovative teaching methods in organic chemistry. He has mentored numerous students who have gone on to successful careers in pharmaceutical research.",
      education: ["PhD in Chemistry - Harvard", "MS in Organic Chemistry - Yale"],
      officeHours: "Mon, Wed: 10:00 AM - 12:00 PM",
      nextClass: "Today at 8:00 AM"
    },
    {
      id: 4,
      name: "Ms. Davis",
      subject: "English Literature",
      email: "ms.davis@school.edu",
      phone: "+1 (555) 456-7890",
      office: "Room 105",
      experience: "8 years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Ms. Davis is passionate about literature and creative writing. She has published several short stories and helps students develop their analytical and writing skills.",
      education: ["MA in English Literature - Oxford", "BA in Creative Writing - Columbia"],
      officeHours: "Tue, Thu, Fri: 3:00 PM - 5:00 PM",
      nextClass: "Today at 2:00 PM"
    },
    {
      id: 5,
      name: "Dr. Garcia",
      subject: "Biology",
      email: "dr.garcia@school.edu",
      phone: "+1 (555) 567-8901",
      office: "Lab 501",
      experience: "11 years",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Garcia specializes in molecular biology and genetics. Her research on gene therapy has contributed to several breakthrough treatments.",
      education: ["PhD in Biology - Johns Hopkins", "MS in Genetics - UCSF"],
      officeHours: "Wed, Fri: 11:00 AM - 1:00 PM",
      nextClass: "Tomorrow at 11:00 AM"
    },
    {
      id: 6,
      name: "Ms. Taylor",
      subject: "Computer Science",
      email: "ms.taylor@school.edu",
      phone: "+1 (555) 678-9012",
      office: "Lab 401",
      experience: "6 years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Ms. Taylor is a software engineer turned educator who brings industry experience to the classroom. She specializes in web development and artificial intelligence.",
      education: ["MS in Computer Science - Carnegie Mellon", "BS in Software Engineering - Georgia Tech"],
      officeHours: "Mon, Thu: 2:00 PM - 4:00 PM",
      nextClass: "Today at 3:00 PM"
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <button
            onClick={() => setSelectedTeacher(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Teachers</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedTeacher.image}
                    alt={selectedTeacher.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedTeacher.name}
                      </h1>
                      <p className="text-lg text-primary-50 font-medium mb-2">
                        {selectedTeacher.subject}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{selectedTeacher.rating}</span>
                        <span className="text-gray-500">/ 5.0</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award size={16} />
                      <span>{selectedTeacher.experience} experience</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{selectedTeacher.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-gray-400" />
                          <span>{selectedTeacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-gray-400" />
                          <span>{selectedTeacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{selectedTeacher.office}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-gray-400" />
                          <span>{selectedTeacher.officeHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-gray-400" />
                          <span>Next class: {selectedTeacher.nextClass}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                    <ul className="space-y-1">
                      {selectedTeacher.education.map((edu, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <BookOpen size={14} className="text-gray-400" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Teachers</h1>
          <div className="relative flex-1 sm:flex-initial">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {teacher.name}
                    </h3>
                    <p className="text-primary-50 font-medium text-sm mb-1">
                      {teacher.subject}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{teacher.office}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>Next: {teacher.nextClass}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} />
                    <span>{teacher.experience} experience</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}