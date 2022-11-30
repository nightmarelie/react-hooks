import { useCallback, useState } from "react";

type ToggleProps = {
  initialState: boolean;
};

// Parameter is the boolean, with default "false" value. I decided to stick to object as a parameter because it is more convenient
export const useTaggle = ({ initialState = false }: ToggleProps) => {
  // Initiailize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};
