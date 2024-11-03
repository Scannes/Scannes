import Documents from "../../components/documents/Documents";

export default function CompanyDocuments({ filteredFiles }) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-lg">Company Documents</h3>
      <Documents filteredFiles={filteredFiles} />
    </div>
  );
}
