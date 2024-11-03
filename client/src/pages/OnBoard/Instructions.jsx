export default function Instructions({ heading, children }) {
  return (
    <div className="w-full pl-4">
      <h3 className="text-3xl mb-3">{heading}</h3>
      <p className="max-w-[95%] text-lg">{children}</p>
    </div>
  );
}
