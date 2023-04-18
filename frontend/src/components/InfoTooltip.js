function InfoTooltip({
  isOpen,
  onClose,
  infoTooltipMessage,
  infoTooltipImage,
}) {
  return (
    <div
      className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container-infotooltip`}>
        <img src={infoTooltipImage} alt="Результат" className="popup__result" />
        <h2 className="popup__result-title">{infoTooltipMessage}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
