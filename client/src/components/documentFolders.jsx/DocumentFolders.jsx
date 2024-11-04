import DocumentFolderComponent from "./DocumentFolderComponent";

export default function DocumentFolders({ company = null }) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return (
    <div className="mt-5 pb-8">
      <h3 className="font-semibold mb-2 text-lg">Dokumentenordner</h3>

      <div>
        {" "}
        <div className="flex gap-4 mt-1 overflow-x-auto">
          {months.map((month) => (
            <DocumentFolderComponent
              key={month}
              company={company}
              month={month?.at(0).toUpperCase() + month.slice(1).toLowerCase()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
