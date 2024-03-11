const Password = ({ label, placeholder, color, value, setvalue }) => {
    return (
        <div className="TextInputDiv my-5  flex flex-col space-y-2 w-full">
            <label for={label} className="font-semibold">{label}</label>
            <input
                type="password"
                id={label}
                placeholder={placeholder}
                className={` ${color} p-2 border  border-gray-400 border-solid rounded placeholder-gray-500`}
                value={value}
                onChange={(e) => {
                    setvalue(e.target.value);
                }}
            />
        </div>

    );
};

export default Password;