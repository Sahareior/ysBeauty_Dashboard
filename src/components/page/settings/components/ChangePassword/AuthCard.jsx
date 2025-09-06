const AuthCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto mt-10">
    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
      <span className="cursor-pointer">&larr;</span> {title}
    </h2>
    <div className="text-gray-600 text-sm mb-4">
      {children}
    </div>
  </div>
);
export default AuthCard;