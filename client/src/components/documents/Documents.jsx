import Document from "./Document";

export default function Documents({ filteredFiles = [] }) {
  console.log(filteredFiles, "gg");
  return (
    <div className="bg-white rounded-md py-3 px-5 border border-[#ddd] overflow-scroll lg:overflow-hidden">
      <div className="flex flex-col gap-2 min-w-[1200px]">
        <Document />
        {/* Render documents based on filtered files */}
        {filteredFiles.map((file) => (
          <Document
            key={file.img}
            name={file.name}
            date={file.date}
            file={file.path}
            category={file.category}
            src={file.img}
            company={file.company}
          />
        ))}
      </div>
    </div>
  );
}
