const TextInput = ({ label, placeholder, color, value, setvalue }) => {
    return (
        <div className="TextInputDiv flex flex-col w-full my-5 ">
            <label for={label} className="font-semibold">{label}</label>
            <input
                type="text"
                id={label}
                placeholder={placeholder}
                className={` ${color} p-2 border border-gray-400 border-solid rounded  placeholder-gray-500`}
                value={value}
                onChange={(e) => {
                    setvalue(e.target.value)
                }}
            />
        </div>
    );
};

export default TextInput;