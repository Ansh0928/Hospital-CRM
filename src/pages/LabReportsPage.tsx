"use client";

import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

// Types
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  test: string;
  date: string;
  status: "Complete" | "Pending" | "In Review";
  priority?: string;
  department?: string;
  requestedBy?: string;
  fileName?: string;
  fileData?: string; // Base64 encoded file data
  fileType?: string;
  results?: string;
  notes?: string;
}

// Test types dropdown options
const testTypes = [
  { value: "blood_glucose", label: "Blood Glucose" },
  { value: "lipid_panel", label: "Lipid Panel" },
  { value: "hemoglobin", label: "Hemoglobin A1C" },
  { value: "complete_blood_count", label: "Complete Blood Count (CBC)" },
  { value: "liver_function", label: "Liver Function Test" },
  { value: "kidney_function", label: "Kidney Function Test" },
  { value: "thyroid_function", label: "Thyroid Function Test" },
  { value: "urine_analysis", label: "Urine Analysis" },
  { value: "cholesterol", label: "Cholesterol Test" },
  { value: "vitamin_d", label: "Vitamin D Test" },
  { value: "iron_studies", label: "Iron Studies" },
  { value: "cardiac_markers", label: "Cardiac Markers" },
  { value: "inflammatory_markers", label: "Inflammatory Markers" },
  { value: "tumor_markers", label: "Tumor Markers" },
  { value: "hormone_panel", label: "Hormone Panel" },
  { value: "allergy_panel", label: "Allergy Panel" },
  { value: "covid_test", label: "COVID-19 Test" },
  { value: "hepatitis_panel", label: "Hepatitis Panel" },
  { value: "std_panel", label: "STD Panel" },
  { value: "other", label: "Other (Specify)" }
];

// Status options
const statusOptions = [
  { value: "Pending", label: "Pending", color: "secondary" },
  { value: "In Review", label: "In Review", color: "outline" },
  { value: "Complete", label: "Complete", color: "default" }
];

// Priority levels
const priorityLevels = [
  { value: "routine", label: "Routine" },
  { value: "urgent", label: "Urgent" },
  { value: "stat", label: "STAT (Immediate)" }
];

// Initial dummy data
const initialDummyLabReports: LabReport[] = [
  { 
    id: "LAB001", 
    patientId: "P001",
    patientName: "John Doe", 
    test: "Blood Glucose", 
    date: "2025-04-16", 
    status: "Complete",
    results: "Glucose: 95 mg/dL (Normal)",
    notes: "Patient fasting glucose within normal range."
  },
  { 
    id: "LAB002", 
    patientId: "P002",
    patientName: "Jane Smith", 
    test: "Lipid Panel", 
    date: "2025-04-19", 
    status: "Pending"
  },
  { 
    id: "LAB003", 
    patientId: "P003",
    patientName: "Robert Johnson", 
    test: "Hemoglobin", 
    date: "2025-04-20", 
    status: "In Review",
    results: "Hemoglobin: 13.5 g/dL (Normal)",
    notes: "Normal hemoglobin levels detected."
  }
];

// Mock patients data - replace with actual API call
const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0101",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    address: "123 Main St, City, State 12345"
  },
  {
    id: "P002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1-555-0102",
    dateOfBirth: "1990-07-22",
    gender: "Female",
    address: "456 Oak Ave, City, State 12345"
  },
  {
    id: "P003",
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    phone: "+1-555-0103",
    dateOfBirth: "1978-11-08",
    gender: "Male",
    address: "789 Pine Rd, City, State 12345"
  },
  {
    id: "P004",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-0104",
    dateOfBirth: "1995-02-14",
    gender: "Female",
    address: "321 Elm St, City, State 12345"
  }
];

const handleDownloadPDF = (report: LabReport) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("LAB DIAGNOSTIC REPORT", 105, 20, { align: "center" });
  
  // Report details
  doc.setFontSize(12);
  doc.text(`Report ID: ${report.id}`, 20, 40);
  doc.text(`Patient Name: ${report.patientName}`, 20, 50);
  doc.text(`Test Type: ${report.test}`, 20, 60);
  doc.text(`Date: ${report.date}`, 20, 70);
  doc.text(`Status: ${report.status}`, 20, 80);
  
  // Results section
  if (report.results) {
    doc.setFontSize(14);
    doc.text("RESULTS:", 20, 100);
    doc.setFontSize(11);
    const resultsLines = doc.splitTextToSize(report.results, 170);
    doc.text(resultsLines, 20, 110);
  }
  
  // Notes section
  if (report.notes) {
    doc.setFontSize(14);
    doc.text("NOTES:", 20, 140);
    doc.setFontSize(11);
    const notesLines = doc.splitTextToSize(report.notes, 170);
    doc.text(notesLines, 20, 150);
  }

  // Footer
  doc.setFontSize(10);
  doc.text("Generated by Hospital Management System", 105, 280, { align: "center" });
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 290, { align: "center" });

  doc.save(`LabReport-${report.id}-${report.patientName.replace(/\s+/g, '_')}.pdf`);
};

const handleExportAllReports = (reports: LabReport[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.text("LAB REPORTS SUMMARY", 105, 20, { align: "center" });
  
  // Table headers
  doc.setFontSize(10);
  doc.text("ID", 20, 40);
  doc.text("Patient", 50, 40);
  doc.text("Test", 100, 40);
  doc.text("Date", 140, 40);
  doc.text("Status", 170, 40);
  
  // Table data
  let yPosition = 50;
  reports.forEach((report) => {
    doc.text(report.id, 20, yPosition);
    doc.text(report.patientName, 50, yPosition);
    doc.text(report.test, 100, yPosition);
    doc.text(report.date, 140, yPosition);
    doc.text(report.status, 170, yPosition);
    yPosition += 10;
    
    // Add new page if needed
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 30;
    }
  });
  
  // Footer
  doc.setFontSize(8);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 290, { align: "center" });
  
  doc.save(`AllLabReports-${new Date().toISOString().split('T')[0]}.pdf`);
};

const handleFileUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const handleFileDownload = (report: LabReport) => {
  if (!report.fileData || !report.fileName) {
    alert("No file attached to this report");
    return;
  }
  
  // Convert base64 back to blob and download
  const link = document.createElement('a');
  link.href = report.fileData;
  link.download = report.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function LabReportsPage() {
  const [reports, setReports] = useState<LabReport[]>(initialDummyLabReports);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({ 
    patientId: "", 
    test: "", 
    customTest: "",
    date: "", 
    priority: "routine",
    department: "",
    requestedBy: "",
    file: null as File | null,
    results: "",
    notes: ""
  });
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch patients on component mount
  useEffect(() => {
    // Replace this with actual API call to fetch patients
    const fetchPatients = async () => {
      try {
        // Simulating API call
        setPatients(mockPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    
    fetchPatients();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const selectedPatient = patients.find(p => p.id === form.patientId);
      if (!selectedPatient) {
        alert("Please select a valid patient");
        return;
      }

      let fileData = "";
      let fileName = "";
      let fileType = "";
      
      if (form.file) {
        fileData = await handleFileUpload(form.file);
        fileName = form.file.name;
        fileType = form.file.type;
      }

      const newReport: LabReport = {
        id: `LAB${(reports.length + 1).toString().padStart(3, "0")}`,
        patientId: form.patientId,
        patientName: selectedPatient.name,
        test: form.test === "other" ? form.customTest : testTypes.find(t => t.value === form.test)?.label || form.test,
        date: form.date,
        status: "Pending",
        priority: form.priority,
        department: form.department,
        requestedBy: form.requestedBy,
        fileName,
        fileData,
        fileType,
        results: form.results,
        notes: form.notes
      };

      setReports(r => [...r, newReport]);
      setForm({ 
        patientId: "", 
        test: "", 
        customTest: "",
        date: "", 
        priority: "routine",
        department: "",
        requestedBy: "",
        file: null,
        results: "",
        notes: ""
      });
      
      // Reset file input
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      alert("Lab report uploaded successfully!");
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Error uploading report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (report: LabReport) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleStatusUpdate = (reportId: string, newStatus: "Complete" | "Pending" | "In Review") => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus }
        : report
    ));
  };

  return (
    <div>
      <PageHeader title="Lab & Diagnostic Reports" subtitle="Upload lab reports and link to patient records." />
      <div className="flex flex-col lg:flex-row gap-8 flex-wrap mb-4">
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-semibold">Recent Lab Reports</span>
            <Button size="sm" onClick={() => handleExportAllReports(reports)}>
              Export All
            </Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-separate min-w-[640px]">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50">Report ID</th>
                  <th className="py-3 px-4 bg-gray-50">Patient</th>
                  <th className="py-3 px-4 bg-gray-50">Test</th>
                  <th className="py-3 px-4 bg-gray-50">Date</th>
                  <th className="py-3 px-4 bg-gray-50">Status</th>
                  <th className="py-3 px-4 bg-gray-50">File</th>
                  <th className="py-3 px-4 bg-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{report.id}</td>
                    <td className="py-2 px-4">{report.patientName}</td>
                    <td className="py-2 px-4">{report.test}</td>
                    <td className="py-2 px-4">{report.date}</td>
                    <td className="py-2 px-4">
                      <Select
                        value={report.status}
                        onValueChange={(value: "Complete" | "Pending" | "In Review") => 
                          handleStatusUpdate(report.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Review">In Review</SelectItem>
                          <SelectItem value="Complete">Complete</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-2 px-4">
                      {report.fileName ? (
                        <Badge variant="outline" className="text-xs">
                          📎 {report.fileName.substring(0, 15)}...
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-xs">No file</span>
                      )}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleView(report)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadPDF(report)}>
                        PDF
                      </Button>
                      {report.fileName && (
                        <Button size="sm" variant="secondary" onClick={() => handleFileDownload(report)}>
                          File
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <h3 className="font-semibold mb-4 text-lg">Upload New Report</h3>
          <form className="space-y-4" onSubmit={handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Patient *</label>
                <Select
                  value={form.patientId}
                  onValueChange={(value) => setForm(f => ({ ...f, patientId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} - {patient.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Test Type *</label>
                <Select
                  value={form.test}
                  onValueChange={(value) => setForm(f => ({ ...f, test: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map((test) => (
                      <SelectItem key={test.value} value={test.value}>
                        {test.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {form.test === "other" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Custom Test Name *</label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    type="text"
                    placeholder="Enter custom test name"
                    value={form.customTest}
                    onChange={e => setForm(f => ({ ...f, customTest: e.target.value }))}
                    required={form.test === "other"}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select
                  value={form.priority}
                  onValueChange={(value) => setForm(f => ({ ...f, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityLevels.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Select
                  value={form.department}
                  onValueChange={(value) => setForm(f => ({ ...f, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pathology">Pathology</SelectItem>
                    <SelectItem value="hematology">Hematology</SelectItem>
                    <SelectItem value="biochemistry">Biochemistry</SelectItem>
                    <SelectItem value="microbiology">Microbiology</SelectItem>
                    <SelectItem value="immunology">Immunology</SelectItem>
                    <SelectItem value="molecular">Molecular Biology</SelectItem>
                    <SelectItem value="cytology">Cytology</SelectItem>
                    <SelectItem value="histopathology">Histopathology</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Requested By</label>
                <Select
                  value={form.requestedBy}
                  onValueChange={(value) => setForm(f => ({ ...f, requestedBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr_smith">Dr. John Smith</SelectItem>
                    <SelectItem value="dr_johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="dr_brown">Dr. Michael Brown</SelectItem>
                    <SelectItem value="dr_davis">Dr. Emily Davis</SelectItem>
                    <SelectItem value="dr_wilson">Dr. Robert Wilson</SelectItem>
                    <SelectItem value="dr_taylor">Dr. Lisa Taylor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Upload File</label>
                <input
                  id="fileInput"
                  className="border rounded px-3 py-2 w-full"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  onChange={e => setForm(f => ({ ...f, file: e.target.files?.[0] || null }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX (Max: 10MB)
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Results</label>
              <textarea
                className="border rounded px-3 py-2 w-full h-20"
                placeholder="Enter test results..."
                value={form.results}
                onChange={e => setForm(f => ({ ...f, results: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                className="border rounded px-3 py-2 w-full h-20"
                placeholder="Additional notes..."
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>
            
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload Report"}
            </Button>
          </form>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Lab Test Trends</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>↑ Increase in lipid panels ordered last week</li>
              <li>↑ Glucose tests for diabetic patients</li>
              <li>→ Stable hemoglobin orders</li>
            </ul>
          </div>
        </div>
      </div>

      {/* View Report Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lab Report - {selectedReport?.id}</DialogTitle>
          </DialogHeader>
                        {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Patient:</strong> {selectedReport.patientName}</p>
                  <p><strong>Test:</strong> {selectedReport.test}</p>
                  <p><strong>Date:</strong> {selectedReport.date}</p>
                  <p><strong>Status:</strong> 
                    <Badge 
                      variant={
                        selectedReport.status === "Complete" ? "default" : 
                        selectedReport.status === "Pending" ? "secondary" : "outline"
                      }
                      className="ml-2"
                    >
                      {selectedReport.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  {selectedReport.priority && (
                    <p><strong>Priority:</strong> 
                      <Badge 
                        variant={selectedReport.priority === "stat" ? "destructive" : selectedReport.priority === "urgent" ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {priorityLevels.find(p => p.value === selectedReport.priority)?.label || selectedReport.priority}
                      </Badge>
                    </p>
                  )}
                  {selectedReport.department && (
                    <p><strong>Department:</strong> {selectedReport.department}</p>
                  )}
                  {selectedReport.requestedBy && (
                    <p><strong>Requested By:</strong> {selectedReport.requestedBy}</p>
                  )}
                  {selectedReport.fileName && (
                    <p><strong>File:</strong> {selectedReport.fileName}</p>
                  )}
                </div>
              </div>
              
              {selectedReport.results && (
                <div>
                  <h4 className="font-semibold mb-2">Results:</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedReport.results}</p>
                </div>
              )}
              
              {selectedReport.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes:</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedReport.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleDownloadPDF(selectedReport)}>
                  Download PDF Report
                </Button>
                {selectedReport.fileName && (
                  <Button variant="secondary" onClick={() => handleFileDownload(selectedReport)}>
                    Download Original File
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}