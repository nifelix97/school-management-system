import React, { useState } from "react";
import {
    // IoCheckmarkCircleOutline,
    IoBarChartOutline,
    IoCashOutline,
    IoCloudDownloadOutline,
    IoDocumentTextOutline,
    IoPeopleOutline,
    IoRefreshOutline,
    IoSchoolOutline,
    IoTimeOutline,
} from "react-icons/io5";

interface Report {
    id: string;
    title: string;
    category: "Academic" | "Financial" | "Staff" | "Attendance";
    generatedDate: string;
    size: string;
    status: "Ready" | "Processing" | "Failed";
}

const Reports: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("All");

    // Mock Data
    const [reports, setReports] = useState<Report[]>([
        { id: "R-001", title: "Monthly Financial Statement - March", category: "Financial", generatedDate: "2024-03-31", size: "2.5 MB", status: "Ready" },
        { id: "R-002", title: "Student Attendance Report - Q1", category: "Attendance", generatedDate: "2024-03-30", size: "1.2 MB", status: "Ready" },
        { id: "R-003", title: "Staff Performance Review 2023", category: "Staff", generatedDate: "2024-03-28", size: "4.8 MB", status: "Ready" },
        { id: "R-004", title: "Term 1 Grade Summary", category: "Academic", generatedDate: "Today", size: "-", status: "Processing" },
    ]);

    const reportCategories = [
        { name: "Academic", icon: <IoSchoolOutline />, color: "text-blue-600 bg-blue-50 border-blue-100" },
        { name: "Financial", icon: <IoCashOutline />, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        { name: "Staff", icon: <IoPeopleOutline />, color: "text-purple-600 bg-purple-50 border-purple-100" },
        { name: "Attendance", icon: <IoTimeOutline />, color: "text-amber-600 bg-amber-50 border-amber-100" },
    ];

    const handleGenerateReport = (category: string) => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            const newReport: Report = {
                id: `R-${Math.floor(Math.random() * 1000)}`,
                title: `${category} Summary Report - ${new Date().toLocaleDateString()}`,
                category: category as any,
                generatedDate: "Just Now",
                size: "1.5 MB",
                status: "Ready"
            };
            setReports([newReport, ...reports]);
            setIsGenerating(false);
        }, 2000);
    };

    const handleDownload = (report: Report) => {
        // Create CSV content
        const csvContent = [
            ["Report ID", "Title", "Category", "Generated Date", "Status"],
            [report.id, report.title, report.category, report.generatedDate, report.status]
        ].map(e => e.join(",")).join("\n");

        const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = `${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const filteredReports = activeTab === "All" ? reports : reports.filter(r => r.category === activeTab);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-50 to-primary-100 mb-2">
                        Reports Center
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Generate and manage detailed institutional reports.
                    </p>
                </div>
                <button 
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <IoRefreshOutline className="w-6 h-6 animate-spin" /> : <IoBarChartOutline className="w-6 h-6" />}
                    <span>{isGenerating ? "Processing..." : "Custom Report"}</span>
                </button>
            </div>

            {/* Quick Actions / Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {reportCategories.map((cat) => (
                    <div key={cat.name} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:scale-[1.02] transition-transform duration-300 group cursor-pointer`} onClick={() => handleGenerateReport(cat.name)}>
                        <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                            {cat.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Generate {cat.name}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-4">Click to create new report</p>
                        <div className="flex items-center text-primary-600 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                            Generate Now <IoChevronForwardOutline />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reports */}
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <IoDocumentTextOutline className="text-primary-500" />
                        Recent Reports
                    </h2>
                    
                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-50 rounded-xl overflow-x-auto w-full sm:w-auto">
                        {["All", "Academic", "Financial", "Staff"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab 
                                    ? "bg-white text-primary-600 shadow-sm" 
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {filteredReports.map((report) => (
                        <div key={report.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${
                                    report.category === "Financial" ? "bg-emerald-50 text-emerald-600" :
                                    report.category === "Academic" ? "bg-blue-50 text-blue-600" :
                                    report.category === "Staff" ? "bg-purple-50 text-purple-600" :
                                    "bg-amber-50 text-amber-600"
                                }`}>
                                    <IoDocumentTextOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{report.title}</h3>
                                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1"><IoTimeOutline /> {report.generatedDate}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{report.size}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                {report.status === "Ready" ? (
                                    <button 
                                        onClick={() => handleDownload(report)}
                                        className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 hover:text-primary-600 hover:border-primary-100 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <IoCloudDownloadOutline className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                        Download
                                    </button>
                                ) : (
                                    <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 font-bold rounded-xl text-sm border border-gray-100 cursor-not-allowed">
                                        <IoRefreshOutline className="animate-spin" />
                                        Processing...
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredReports.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            <IoDocumentTextOutline className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="font-medium">No reports found for this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper Icon for card link
const IoChevronForwardOutline = ({ className }: { className?: string }) => (
    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"></path></svg>
);

export default Reports;
