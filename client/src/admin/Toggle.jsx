// eslint-disable-next-line react/prop-types
const Toggle = ({ onDelete, setToggle, type, id }) => {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 flex flex-col gap-6">
        <h2 className="text-xl text-center">Are you sure ?</h2>
        <h3 className="text-red-600 text-sm text-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Pressing 'delete' button will remove this {type} completely
        </h3>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 text-sm text-white py-2 px-4 text-center"
        >
          Yes, delete
        </button>
      </div>
    </div>
  );
};

export default Toggle;
