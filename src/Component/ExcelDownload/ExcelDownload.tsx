import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExcelDownloadProps<T> {
  data?: T[];
  fileName?: string;
  sheetName?: string;
  buttonText?: string;
  className?: string;
};

export default function ExcelDownload<T>({
 
  data,
  className,
  fileName = "Report",
  sheetName = "Sheet1",
  buttonText = "Download Excel",
}: ExcelDownloadProps<T>) {
  const handleDownload = () => {
    if (!data?.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
    className={className}
      onClick={handleDownload}
    >
      {buttonText}
    </button>
  );
}