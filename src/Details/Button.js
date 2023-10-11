const Button = ({ label, handleClick, disabled }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="btn m-1 w-[170px] border-none bg-window shadow-lg shadow-slate-300 hover:translate-y-[-2px] hover:bg-text disabled:bg-text disabled:opacity-30"
    >
      {label}
    </button>
  );
};

export default Button;
