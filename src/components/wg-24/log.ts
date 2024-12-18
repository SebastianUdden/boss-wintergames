export const log = (() => {
  const loggedMessages = new Set<string>();

  return (message: string) => {
    if (!loggedMessages.has(message)) {
      console.log(message);
      loggedMessages.add(message);
    }

    // Clear logged messages after the current update cycle
    setTimeout(() => loggedMessages.clear(), 0);
  };
})();
