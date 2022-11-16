export const profileButton = document.querySelector(".profile__button-edit")
export const popupProfile = document.querySelector(".popup_type_edit")
export const popupProfileForm = popupProfile.querySelector(".popup__form")
export const namePopupProfile = popupProfile.querySelector(".popup__input_name")
export const aboutPopupProfile = popupProfile.querySelector(".popup__input_job")
export const profileName = document.querySelector(".profile__name")
export const profileAbout = document.querySelector(".profile__description")
export const elements = document.querySelector('.elements')
export const elementTemplete = document.querySelector(".element-template").content.querySelector(".element")
export const popupButtonAdd = document.querySelector(".profile__button-add")
export const popupAdd = document.querySelector(".popup_type_add")
export const popupAddForm = popupAdd.querySelector(".popup__form_type_add")
export const popupImage = document.querySelector(".popup_type_image")

export const popupAvatar = document.querySelector(".popup_type_avatar");
export const formPopupAvatar= popupAvatar.querySelector(".popup__form");
export const buttonOpenPopupAvatar = document.querySelector(".profile__avatar-button");
export const imageAvatar = document.querySelector(".profile__avatar");

export const popupTypeConfirm = document.querySelector(".popup_type_confirm");
export const cardDell = document.querySelector(".element__delete-button");

export let userData = {}
export let userId = {}

export const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', 
}