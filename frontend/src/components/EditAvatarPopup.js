import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onSubmit, onUpdateAvatar }) {
  const inputRef = useRef(0);

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      button={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_linkAvatar"
        placeholder="Ссылка на аватар"
        name="avatar"
        type="url"
        id="popup__input-error-linkAvatar"
        ref={inputRef}
        required
      />
      <span className="popup__text-error popup__input-error-linkAvatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
