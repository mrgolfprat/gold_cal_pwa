export const saveState = state => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem("state", serializeState);
  } catch (error) {
    console.error(error);
  }
};

export const loadState = () => {
  try {
    const persistantState = localStorage.getItem("state");
    if (!persistantState) {
      return undefined;
    }
    return JSON.parse(persistantState);
  } catch (error) {
    return undefined;
  }
};
