const usePhoneRange = (ref, phone, position) => {
  const inputPhoneRange = () => {
    if (phone.length > 4) return;
    if (ref.current) {
      const phonePosition = position;
      ref.current.setSelectionRange(phonePosition, phonePosition);
      ref.current.focus();
    }
  };
  return inputPhoneRange;
};

export default usePhoneRange;
