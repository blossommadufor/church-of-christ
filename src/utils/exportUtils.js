import * as xlsx from "xlsx";

export const exportToExcel = (data, filename = "export.xlsx") => {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Data");
  xlsx.writeFile(wb, filename);
};
