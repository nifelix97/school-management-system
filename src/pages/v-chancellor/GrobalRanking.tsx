import React, { useCallback, useMemo, useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoGlobeOutline,
    IoRibbonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface University {
  id: string;
  name: string;
  country: string;
  rank: number;
  previousRank: number;
  score: number;
  academicReputation: number;
  employerReputation: number;
  facultyStudent: number;
  citations: number;
  internationalFaculty: number;
  internationalStudents: number;
}

interface RankingMetric {
  name: string;
  value: number;
  change: number;
  rank: number;
}

const GlobalRanking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "rankings" | "metrics" | "comparison">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Our university data (highlighted)
  const ourUniversity: University = {
    id: "our-uni",
    name: "Our University",
    country: "Rwanda",
    rank: 245,
    previousRank: 267,
    score: 68.5,
    academicReputation: 72,
    employerReputation: 65,
    facultyStudent: 70,
    citations: 58,
    internationalFaculty: 75,
    internationalStudents: 80,
  };

  const universities: University[] = useMemo(() => [
    ourUniversity,
    {
      id: "1",
      name: "Massachusetts Institute of Technology",
      country: "United States",
      rank: 1,
      previousRank: 1,
      score: 100,
      academicReputation: 100,
      employerReputation: 100,
      facultyStudent: 100,
      citations: 99,
      internationalFaculty: 98,
      internationalStudents: 97,
    },
    {
      id: "2",
      name: "University of Cambridge",
      country: "United Kingdom",
      rank: 2,
      previousRank: 3,
      score: 98.8,
      academicReputation: 99,
      employerReputation: 98,
      facultyStudent: 97,
      citations: 98,
      internationalFaculty: 96,
      internationalStudents: 95,
    },
    {
      id: "3",
      name: "Stanford University",
      country: "United States",
      rank: 3,
      previousRank: 2,
      score: 98.5,
      academicReputation: 98,
      employerReputation: 99,
      facultyStudent: 98,
      citations: 97,
      internationalFaculty: 94,
      internationalStudents: 93,
    },
    {
      id: "4",
      name: "University of Oxford",
      country: "United Kingdom",
      rank: 4,
      previousRank: 4,
      score: 98.2,
      academicReputation: 99,
      employerReputation: 97,
      facultyStudent: 96,
      citations: 98,
      internationalFaculty: 97,
      internationalStudents: 96,
    },
    {
      id: "5",
      name: "Harvard University",
      country: "United States",
      rank: 5,
      previousRank: 5,
      score: 97.9,
      academicReputation: 100,
      employerReputation: 100,
      facultyStudent: 95,
      citations: 96,
      internationalFaculty: 92,
      internationalStudents: 91,
    },
    {
      id: "6",
      name: "University of Nairobi",
      country: "Kenya",
      rank: 412,
      previousRank: 425,
      score: 52.3,
      academicReputation: 58,
      employerReputation: 55,
      facultyStudent: 48,
      citations: 45,
      internationalFaculty: 62,
      internationalStudents: 68,
    },
    {
      id: "7",
      name: "Makerere University",
      country: "Uganda",
      rank: 389,
      previousRank: 401,
      score: 54.8,
      academicReputation: 60,
      employerReputation: 57,
      facultyStudent: 52,
      citations: 48,
      internationalFaculty: 65,
      internationalStudents: 70,
    },
  ], []);

  const metrics: RankingMetric[] = useMemo(() => [
    { name: "Academic Reputation", value: 72, change: 5, rank: 245 },
    { name: "Employer Reputation", value: 65, change: 3, rank: 278 },
    { name: "Faculty/Student Ratio", value: 70, change: -2, rank: 256 },
    { name: "Citations per Faculty", value: 58, change: 8, rank: 312 },
    { name: "International Faculty", value: 75, change: 12, rank: 198 },
    { name: "International Students", value: 80, change: 15, rank: 165 },
  ], []);

  const stats = useMemo(() => [
    { title: "Global Rank", value: "#245", change: "+22", icon: <IoTrophyOutline /> },
    { title: "Overall Score", value: "68.5", change: "+3.2", icon: <IoStatsChartOutline /> },
    { title: "Regional Rank", value: "#12", change: "+3", icon: <IoGlobeOutline /> },
    { title: "Subject Rankings", value: "18", change: "+2", icon: <IoSchoolOutline /> },
  ], []);

  const getRankChange = useCallback((current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { value: `+${change}`, color: "text-green-600", icon: <IoTrendingUpOutline /> };
    if (change < 0) return { value: `${change}`, color: "text-red-600", icon: <IoTrendingDownOutline /> };
    return { value: "0", color: "text-gray-600", icon: null };
  }, []);

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           uni.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "all" || 
                           (selectedRegion === "africa" && ["Rwanda", "Kenya", "Uganda"].includes(uni.country)) ||
                           (selectedRegion === "europe" && uni.country === "United Kingdom") ||
                           (selectedRegion === "americas" && uni.country === "United States");
      return matchesSearch && matchesRegion;
    });
  }, [universities, searchQuery, selectedRegion]);

  const paginatedUniversities = useMemo(() => {
    return filteredUniversities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredUniversities, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredUniversities.length / itemsPerPage);
  }, [filteredUniversities.length, itemsPerPage]);

  const handleTabChange = useCallback((tab: "overview" | "rankings" | "metrics" | "comparison") => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Global Rankings</h1>
        <p className="text-primary-50/70">Track and analyze university performance in global rankings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl text-primary-100">{stat.icon}</div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-primary-300' : 'text-primary-200'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xs text-primary-50/60 mb-1">{stat.title}</div>
            <div className="text-xl font-bold text-primary-50">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20 mb-6">
        <div className="flex flex-wrap border-b border-primary-50/20">
          {[
            { id: "overview", label: "Overview" },
            { id: "rankings", label: "Rankings" },
            { id: "metrics", label: "Performance Metrics" },
            { id: "comparison", label: "Comparison" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-100 text-primary-100"
                  : "border-transparent text-primary-50/60 hover:text-primary-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Current Position */}
              <div className="bg-gradient-to-r from-primary-100/10 to-primary-300/10 rounded-lg p-6 border border-primary-100/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-50 mb-2">Our University</h3>
                    <p className="text-primary-50/70">Current Global Standing</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary-100">#{ourUniversity.rank}</div>
                      <div className="text-sm text-primary-50/60">Global Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary-300">
                        <IoTrendingUpOutline />
                        <span>+{ourUniversity.previousRank - ourUniversity.rank}</span>
                      </div>
                      <div className="text-sm text-primary-50/60">Improvement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Key Performance Indicators</h3>
                  <div className="space-y-3">
                    {metrics.slice(0, 3).map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary-50/70">{metric.name}</span>
                          <span className="font-medium text-primary-50">{metric.value}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              metric.value >= 75 ? 'bg-primary-300' :
                              metric.value >= 60 ? 'bg-primary-100' :
                              'bg-primary-200'
                            }`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Recent Achievements</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Improved 22 positions globally", change: "+22" },
                      { title: "Top 200 in International Faculty", change: "#198" },
                      { title: "Top 170 in International Students", change: "#165" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-primary-50/20">
                        <div className="p-2 rounded bg-primary-100/10 text-primary-100">
                          <IoCheckmarkCircleOutline className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-primary-50">{achievement.title}</div>
                          <div className="text-xs text-primary-100 font-semibold">{achievement.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regional Comparison */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Regional Performance (Africa)</h3>
                <div className="space-y-3">
                  {universities.filter(u => ["Rwanda", "Kenya", "Uganda"].includes(u.country)).map((uni) => (
                    <div key={uni.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                      uni.id === "our-uni" 
                        ? "bg-primary-100/10 border-primary-100/30" 
                        : "bg-white border-primary-50/20"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-bold ${
                          uni.id === "our-uni" ? "text-primary-100" : "text-primary-50/60"
                        }`}>
                          #{uni.rank}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${
                            uni.id === "our-uni" ? "text-primary-50" : "text-primary-50/80"
                          }`}>
                            {uni.name}
                          </div>
                          <div className="text-xs text-primary-50/60">{uni.country}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary-50">{uni.score}</div>
                        <div className={`text-xs flex items-center gap-1 ${getRankChange(uni.rank, uni.previousRank).color}`}>
                          {getRankChange(uni.rank, uni.previousRank).icon}
                          <span>{getRankChange(uni.rank, uni.previousRank).value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rankings" && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
                >
                  <option value="all">All Regions</option>
                  <option value="africa">Africa</option>
                  <option value="americas">Americas</option>
                  <option value="europe">Europe</option>
                </select>
              </div>

              {/* Rankings Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-50/20">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-primary-50">Rank</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-primary-50">University</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-primary-50">Country</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-primary-50">Score</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-primary-50">Change</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-primary-50">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUniversities.map((uni) => (
                      <tr 
                        key={uni.id} 
                        className={`border-b border-primary-50/10 hover:bg-gray-50 ${
                          uni.id === "our-uni" ? "bg-primary-100/5" : ""
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className={`flex items-center gap-2 ${
                            uni.id === "our-uni" ? "font-bold text-primary-100" : "text-primary-50"
                          }`}>
                            {uni.rank <= 3 && <IoRibbonOutline className="text-yellow-500" />}
                            <span>#{uni.rank}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`text-sm ${
                            uni.id === "our-uni" ? "font-semibold text-primary-50" : "text-primary-50/80"
                          }`}>
                            {uni.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-primary-50/70">{uni.country}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm font-semibold text-primary-50">{uni.score}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`flex items-center justify-center gap-1 text-sm ${
                            getRankChange(uni.rank, uni.previousRank).color
                          }`}>
                            {getRankChange(uni.rank, uni.previousRank).icon}
                            <span>{getRankChange(uni.rank, uni.previousRank).value}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedUniversity(uni);
                              setIsModalOpen(true);
                            }}
                            className="text-xs text-primary-100 hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronBackOutline className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-primary-50/70">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronForwardOutline className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Detailed Performance Metrics</h3>
                <div className="space-y-4">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-primary-50/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-primary-50">{metric.name}</h4>
                          <p className="text-xs text-primary-50/60">Global Rank: #{metric.rank}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary-50">{metric.value}/100</div>
                          <div className={`text-xs flex items-center gap-1 ${
                            metric.change > 0 ? 'text-primary-300' : metric.change < 0 ? 'text-primary-200' : 'text-gray-600'
                          }`}>
                            {metric.change > 0 && <IoTrendingUpOutline />}
                            {metric.change < 0 && <IoTrendingDownOutline />}
                            <span>{metric.change > 0 ? '+' : ''}{metric.change}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-full rounded-full ${
                            metric.value >= 75 ? 'bg-primary-300' :
                            metric.value >= 60 ? 'bg-primary-100' :
                            'bg-primary-200'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <IoStatsChartOutline className="w-16 h-16 mx-auto text-primary-100 mb-4" />
                <h3 className="text-lg font-semibold text-primary-50 mb-2">University Comparison Tool</h3>
                <p className="text-sm text-primary-50/70 mb-4">
                  Compare our university with other institutions across multiple metrics
                </p>
                <button className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors text-sm">
                  Select Universities to Compare
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* University Details Modal */}
      {isModalOpen && selectedUniversity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedUniversity.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-100">#{selectedUniversity.rank}</div>
                  <div className="text-sm text-primary-50/60 mt-1">Global Rank</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-50">{selectedUniversity.score}</div>
                  <div className="text-sm text-primary-50/60 mt-1">Overall Score</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary-50 mb-3">Performance Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { name: "Academic Reputation", value: selectedUniversity.academicReputation },
                    { name: "Employer Reputation", value: selectedUniversity.employerReputation },
                    { name: "Faculty/Student Ratio", value: selectedUniversity.facultyStudent },
                    { name: "Citations per Faculty", value: selectedUniversity.citations },
                    { name: "International Faculty", value: selectedUniversity.internationalFaculty },
                    { name: "International Students", value: selectedUniversity.internationalStudents },
                  ].map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-50/70">{metric.name}</span>
                        <span className="font-medium text-primary-50">{metric.value}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            metric.value >= 90 ? 'bg-primary-300' :
                            metric.value >= 70 ? 'bg-primary-100' :
                            'bg-primary-200'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-primary-50/20">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalRanking;
