


import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialEMR = [
  {
    patient: "Prinkesh Jha",
    dob: "1980-05-15",
    gender: "Male",
    id: "P-1234",
    age: 43,
    bloodType: "O+",
    allergies: ["Penicillin", "Sulfa drugs"],
    chronic: ["Hypertension", "Type 2 Diabetes"],
    recent: [
      {
        doctor: "Dr. Sarah ",
        date: "2023-04-15",
        diagnosis: "Unstable angina",
        notes: "Chest pain and shortness of breath",
        department: "Cardiology",
      },
    ],
  },
];

const initialMedications = [
  {
    prescribedId: "RI24014",
    medication: "Zerodel SP",
    start: "22/07/2024",
    end: "23/07/2024",
    instructions: "-",
  },
  {
    prescribedId: "RI24015",
    medication: "Atorvastatin",
    start: "15/03/2024",
    end: "15/04/2024",
    instructions: "Take after food",
  },
];

const initialMedicalHistory = [
  {
    date: "12/03/2022",
    diagnosis: "Hypertension",
    doctor: "Dr. Sarah Johnson",
    notes: "Started antihypertensive therapy",
  },
  {
    date: "14/10/2023",
    diagnosis: "Type 2 Diabetes",
    doctor: "Dr. David Lee",
    notes: "Lifestyle modification advised",
  },
];

const initialDentalHistory = [
  {
    date: "02/06/2022",
    procedure: "Dental Filling",
    doctor: "Dr. Emily White",
    notes: "Composite restoration of upper molar",
  },
  {
    date: "21/11/2023",
    procedure: "Teeth Cleaning",
    doctor: "Dr. Rahul Mehta",
    notes: "Routine cleaning",
  },
];

const initialFamilyHistory = [
  {
    relation: "Father",
    condition: "Hypertension",
    ageDiagnosed: "52",
  },
  {
    relation: "Mother",
    condition: "Diabetes",
    ageDiagnosed: "45",
  },
];

const initialSocialHistory = [
  {
    habit: "Smoking",
    status: "Former",
    details: "Quit in 2021 after 10 years",
  },
  {
    habit: "Alcohol",
    status: "Occasional",
    details: "Mostly social",
  },
];

export default function EMRPage() {
  const [tab, setTab] = useState<
    "medications" | "medical" | "dental" | "family" | "social"
  >("medications");

  // State for all data arrays
  const [emr] = useState(initialEMR); // no update needed for EMR patient details
  const [medications, setMedications] = useState(initialMedications);
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);
  const [dentalHistory, setDentalHistory] = useState(initialDentalHistory);
  const [familyHistory, setFamilyHistory] = useState(initialFamilyHistory);
  const [socialHistory, setSocialHistory] = useState(initialSocialHistory);

  // Show Add Record form or not
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state (dynamically keyed for each tab)
  const [formData, setFormData] = useState<any>({});

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Add Record submit handler
  const handleAddRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === "medications") {
      setMedications((prev) => [...prev, formData]);
    } else if (tab === "medical") {
      setMedicalHistory((prev) => [...prev, formData]);
    } else if (tab === "dental") {
      setDentalHistory((prev) => [...prev, formData]);
    } else if (tab === "family") {
      setFamilyHistory((prev) => [...prev, formData]);
    } else if (tab === "social") {
      setSocialHistory((prev) => [...prev, formData]);
    }

    setFormData({});
    setShowAddForm(false);
  };

  // Print handler
  // const handlePrint = () => {
  //   window.print();
  // };
const handlePrint = (tab: string) => {
  // Define the renderPrintTable function first
  const renderPrintTable = (tab: string) => {
    let data: any[] = [];
    let headers: string[] = [];
    let rowsHtml = "";

    switch (tab) {
      case "medications":
        data = medications;
        headers = ["Prescribed ID", "Medication", "Period", "Instructions"];
        rowsHtml = data
          .map(
            (item) => `
          <tr>
            <td>${item.prescribedId}</td>
            <td>${item.medication}</td>
            <td>${item.start} - ${item.end}</td>
            <td>${item.instructions}</td>
          </tr>
        `
          )
          .join("");
        break;

      case "medical":
        data = medicalHistory;
        headers = ["Date", "Diagnosis", "Doctor", "Notes"];
        rowsHtml = data
          .map(
            (item) => `
          <tr>
            <td>${item.date}</td>
            <td>${item.diagnosis}</td>
            <td>${item.doctor}</td>
            <td>${item.notes}</td>
          </tr>
        `
          )
          .join("");
        break;

      case "dental":
        data = dentalHistory;
        headers = ["Date", "Procedure", "Doctor", "Notes"];
        rowsHtml = data
          .map(
            (item) => `
          <tr>
            <td>${item.date}</td>
            <td>${item.procedure}</td>
            <td>${item.doctor}</td>
            <td>${item.notes}</td>
          </tr>
        `
          )
          .join("");
        break;

      case "family":
        data = familyHistory;
        headers = ["Relation", "Condition", "Age Diagnosed"];
        rowsHtml = data
          .map(
            (item) => `
          <tr>
            <td>${item.relation}</td>
            <td>${item.condition}</td>
            <td>${item.ageDiagnosed}</td>
          </tr>
        `
          )
          .join("");
        break;

      case "social":
        data = socialHistory;
        headers = ["Habit", "Status", "Details"];
        rowsHtml = data
          .map(
            (item) => `
          <tr>
            <td>${item.habit}</td>
            <td>${item.status}</td>
            <td>${item.details}</td>
          </tr>
        `
          )
          .join("");
        break;

      default:
        return "<p>No data available for printing.</p>";
    }

    return `
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  };

  // Now build the printable content and call renderPrintTable after it's defined
  const printableContent = `
  <html>
    <head>
      <title>Patient Record - Print</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        h1, h2, h3, h4 {
          margin-bottom: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
        }
        .badge {
          display: inline-block;
          padding: 5px 10px;
          margin-right: 5px;
          background-color: #ddd;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        .header {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }
        .avatar {
          width: 60px;
          height: 60px;
          background-color: #7c3aed;
          color: white;
          font-size: 28px;
          font-weight: bold;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="avatar">${emr[0].patient[0]}</div>
        <div>
          <h1>${emr[0].patient}</h1>
          <p>DOB: ${emr[0].dob}</p>
          <p>Gender: ${emr[0].gender}</p>
          <p>Patient ID: ${emr[0].id}</p>
          <p>Age: ${emr[0].age} years</p>
          <div>
            <span class="badge">Blood Type: ${emr[0].bloodType}</span>
            <span class="badge">Allergies: ${emr[0].allergies.join(", ")}</span>
            <span class="badge">Chronic Conditions: ${emr[0].chronic.join(", ")}</span>
          </div>
        </div>
      </div>

      <h2>Recent Visits</h2>
      ${emr[0].recent
        .map(
          (visit) => `
            <div style="margin-bottom: 15px;">
              <strong>${visit.doctor}</strong> (${visit.department}) — ${visit.date}<br/>
              <strong>Diagnosis:</strong> ${visit.diagnosis}<br/>
              <strong>Notes:</strong> ${visit.notes}
            </div>
          `
        )
        .join("")}

      <h2>${tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}</h2>
      ${renderPrintTable(tab)}
    </body>
  </html>
`;

  // Open new window and print
  const printWindow = window.open("", "", "width=900,height=650");
  if (printWindow) {
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  } else {
    alert("Pop-up blocked. Please allow pop-ups for this site to print.");
  }
};

  // Export handler
  const handleExport = () => {
    const data = {
      patient: emr[0],
      medications,
      medicalHistory,
      dentalHistory,
      familyHistory,
      socialHistory,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${emr[0].patient.replace(/\s+/g, "_")}_EMR.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render the Add Record form inputs based on current tab
  const renderFormFields = () => {
    switch (tab) {
      case "medications":
        return (
          <>
            <label className="block mb-2">
              Prescribed Item ID:
              <input
                type="text"
                name="prescribedId"
                value={formData.prescribedId || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Medication:
              <input
                type="text"
                name="medication"
                value={formData.medication || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Period Start:
              <input
                type="date"
                name="start"
                value={formData.start || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Period End:
              <input
                type="date"
                name="end"
                value={formData.end || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Additional Instructions:
              <textarea
                name="instructions"
                value={formData.instructions || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </label>
          </>
        );
      case "medical":
        return (
          <>
            <label className="block mb-2">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Diagnosis:
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Doctor:
              <input
                type="text"
                name="doctor"
                value={formData.doctor || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Notes:
              <textarea
                name="notes"
                value={formData.notes || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </label>
          </>
        );
      case "dental":
        return (
          <>
            <label className="block mb-2">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Procedure:
              <input
                type="text"
                name="procedure"
                value={formData.procedure || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Doctor:
              <input
                type="text"
                name="doctor"
                value={formData.doctor || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Notes:
              <textarea
                name="notes"
                value={formData.notes || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </label>
          </>
        );
      case "family":
        return (
          <>
            <label className="block mb-2">
              Relation:
              <input
                type="text"
                name="relation"
                value={formData.relation || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Condition:
              <input
                type="text"
                name="condition"
                value={formData.condition || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Age Diagnosed:
              <input
                type="number"
                name="ageDiagnosed"
                value={formData.ageDiagnosed || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </label>
          </>
        );
      case "social":
        return (
          <>
            <label className="block mb-2">
              Habit:
              <input
                type="text"
                name="habit"
                value={formData.habit || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Status:
              <input
                type="text"
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Details:
              <textarea
                name="details"
                value={formData.details || ""}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <PageHeader
        title="Electronic Medical Records (EMR)"
        subtitle="Manage digital prescriptions, treatments, and diagnostics."
      />
      <div className="bg-white rounded-lg p-6 shadow mb-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-blue-800 bg-blue-100 text-blue-900 grid place-items-center text-3xl font-bold">
            {emr[0].patient[0]}
          </div>
          <div>
            <h3 className="font-bold text-2xl">{emr[0].patient}</h3>
            <p className="text-sm opacity-80">DOB: {emr[0].dob}</p>
            <p className="text-sm opacity-80">Gender: {emr[0].gender}</p>
            <p className="text-sm opacity-80">Patient ID: {emr[0].id}</p>
            <p className="text-sm opacity-80">Age: {emr[0].age} years</p>
          </div>
        </div>

        <section className="flex items-center gap-4 mb-6">
          <Badge className="uppercase">Blood Type: {emr[0].bloodType}</Badge>
          <Badge variant="secondary" className="uppercase">
            Allergies: {emr[0].allergies.join(", ")}
          </Badge>
          <Badge variant="outline" className="uppercase">
            Chronic Conditions: {emr[0].chronic.join(", ")}
          </Badge>
        </section>

        <section>
          <h4 className="mb-2 font-semibold">Recent Visits</h4>
          {emr[0].recent.map((visit, i) => (
            <div
              key={i}
              className="p-3 mb-3 rounded-lg bg-blue-50 border border-blue-200"
            >
              <p>
                <span className="font-semibold">{visit.doctor}</span> (
                {visit.department}) — {visit.date}
              </p>
              <p>
                <strong>Diagnosis:</strong> {visit.diagnosis}
              </p>
              <p>
                <strong>Notes:</strong> {visit.notes}
              </p>
            </div>
          ))}
        </section>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-3">
        <Button
          variant={tab === "medications" ? "default" : "outline"}
          onClick={() => setTab("medications")}
        >
          Medications
        </Button>
        <Button
          variant={tab === "medical" ? "default" : "outline"}
          onClick={() => setTab("medical")}
        >
          Medical History
        </Button>
        <Button
          variant={tab === "dental" ? "default" : "outline"}
          onClick={() => setTab("dental")}
        >
          Dental History
        </Button>
        <Button
          variant={tab === "family" ? "default" : "outline"}
          onClick={() => setTab("family")}
        >
          Family History
        </Button>
        <Button
          variant={tab === "social" ? "default" : "outline"}
          onClick={() => setTab("social")}
        >
          Social History
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <Button onClick={() => setShowAddForm(true)}>Add Record</Button>
        <Button onClick={() => handlePrint("medications")}>Print Medications</Button>

       {/* [ <Button onClick={handleExport}>Export</Button>] */}
      </div>

      {/* Add Record Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddRecordSubmit}
          className="mb-8 border p-4 rounded bg-gray-50"
        >
          <h3 className="text-lg font-semibold mb-4">Add New {tab}</h3>
          {renderFormFields()}
          <div className="mt-4 flex gap-3">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Tab Content Display */}
      <div>
        {tab === "medications" && (
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="border p-2">Prescribed ID</th>
                <th className="border p-2">Medication</th>
                <th className="border p-2">Period</th>
                <th className="border p-2">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.prescribedId}</td>
                  <td className="border p-2">{item.medication}</td>
                  <td className="border p-2">
                    {item.start} - {item.end}
                  </td>
                  <td className="border p-2">{item.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "medical" && (
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Diagnosis</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.diagnosis}</td>
                  <td className="border p-2">{item.doctor}</td>
                  <td className="border p-2">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "dental" && (
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Procedure</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {dentalHistory.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.procedure}</td>
                  <td className="border p-2">{item.doctor}</td>
                  <td className="border p-2">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "family" && (
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="border p-2">Relation</th>
                <th className="border p-2">Condition</th>
                <th className="border p-2">Age Diagnosed</th>
              </tr>
            </thead>
            <tbody>
              {familyHistory.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.relation}</td>
                  <td className="border p-2">{item.condition}</td>
                  <td className="border p-2">{item.ageDiagnosed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "social" && (
          <table className="w-full border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="border p-2">Habit</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {socialHistory.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.habit}</td>
                  <td className="border p-2">{item.status}</td>
                  <td className="border p-2">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
