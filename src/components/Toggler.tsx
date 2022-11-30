import { useToggle } from "../hooks";

export const Toggler = () => {
  const [isTextChanged, setTextChanged] = useToggle();

  return (
    <button onClick={setTextChanged}>
      {isTextChanged ? "Toggled" : "Click to Toggle"}
    </button>
  );
};
