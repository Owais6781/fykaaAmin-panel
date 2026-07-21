import * as XLSX from "xlsx";

type ExportExcelProps<T> = {
    data: T[];
    fileName: string;
    sheetName?: string;
    buttonText?: string;
    className?: string;
};

export default function ExportExcel<T>({
    data,
    fileName,
    sheetName = "Sheet1",
    buttonText = "Export Excel",
    className = "",
}: ExportExcelProps<T>) {
    const handleExport = () => {
        if (!data.length) return;

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    return (

        <button
            onClick={handleExport}
             className={className}
            >
    
            {buttonText}
        </button>



    );
}