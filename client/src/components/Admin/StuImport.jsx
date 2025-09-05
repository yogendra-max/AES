import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploadAndSend = () => {
  const [data, setData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [status, setStatus] = useState("");

  // Convert Excel serial to YYYY-MM-DD
  const excelDateToJSDate = (serial) => {
    const utc_days = serial - 25569;
    const utc_value = utc_days * 86400 * 1000;
    const date = new Date(utc_value);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Convert string to YYYY-MM-DD
  const formatDateForMySQL = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return null;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Transform and validate a row
  const transformAndValidateRow = (row, index) => {
    const [firstName, ...lastNameParts] = (row["Full  Name"] || "").split(" ");
    const lastName = lastNameParts.join(" ");

    let dobValue = row["DOB"];
    if (typeof dobValue === "number") {
      dobValue = excelDateToJSDate(dobValue);
    } else {
      dobValue = formatDateForMySQL(dobValue);
    }

    const transformed = {
      firstName: firstName || "",
      lastName: lastName || "",
      fatherName: row["Father Name"] || "",
      motherName: row["Mother Name"] || "",
      dob: dobValue || null,
      gender: row["gender"] || "",
      interHallticket: row["Inter Hallticket No"] || "",
      adharNo: row["Adhar No"] || "",
      mobileNo: row["Mobile No"] || "",
      email: row["email"] || "",
      group: row["Branch"] || "",
      hallticketNo: row["Inter Hallticket No"] || "",
      semester: row["Semester"] || "",
      photo: null,
    };

    // Validate required fields
    const errors = [];
    if (!transformed.firstName) errors.push("Missing First Name");
    if (!transformed.lastName) errors.push("Missing Last Name");
    if (!transformed.dob) errors.push("Invalid DOB");
    if (!transformed.email) errors.push("Missing Email");
    if (!transformed.mobileNo) errors.push("Missing Mobile No");

    return { transformed, errors, rowIndex: index + 1 };
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      let allData = [];
      let allErrors = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        rawData.forEach((row, idx) => {
          const { transformed, errors, rowIndex } = transformAndValidateRow(
            row,
            idx
          );
          allData.push(transformed);
          if (errors.length) {
            allErrors.push({ row: rowIndex, errors });
          }
        });
      });

      setData(allData);
      setValidationErrors(allErrors);
      setStatus(
        allErrors.length
          ? `Found ${allErrors.length} rows with issues. Please fix before sending.`
          : "All data looks good ✅"
      );
    };
    reader.readAsBinaryString(file);
  };

  // Send to API
  const sendToAPI = async () => {
    try {
      if (validationErrors.length > 0) {
        alert("Please fix errors before sending!");
        return;
      }

      for (const student of data) {
        await fetch("http://localhost:3000/addstudent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
      }

      setStatus("All students uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      setStatus("Error uploading students ❌");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Upload Excel and Preview</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {status && <p className="font-semibold mb-4">{status}</p>}

      {validationErrors.length > 0 && (
        <div className="mb-4 text-red-600">
          <h3 className="font-bold">Validation Errors:</h3>
          <ul>
            {validationErrors.map((err, idx) => (
              <li key={idx}>
                Row {err.row}: {err.errors.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.length > 0 && (
        <div className="overflow-x-auto max-h-96 mb-4">
          <table className="border-collapse border border-gray-300 w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 p-1 text-left"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    validationErrors.some((e) => e.row === idx + 1)
                      ? "bg-red-100"
                      : ""
                  }
                >
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length > 0 && (
        <button
          onClick={sendToAPI}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send to API
        </button>
      )}
    </div>
  );
};

export default ExcelUploadAndSend;
