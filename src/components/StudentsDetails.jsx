function StudentsDetails({ name, email, phone, created_at }) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`}
          alt={`${name}'s profile`}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="mt-1 truncate text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm text-gray-900">{phone}</p>
        <p className="mt-1 text-xs text-gray-500">
          Date Created: {new Date(created_at).toDateString()}
        </p>
      </div>
    </li>
  );
}

export default StudentsDetails;
