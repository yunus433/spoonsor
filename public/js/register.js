const toggleDisplay = (element, condition) => {
  const newStyle = condition ? 'block' : 'none';
  if (element.style.display !== newStyle) {
    if (newStyle === 'block') {
      element.style.display = newStyle;
      setTimeout(() => element.style.opacity = 1, 250);
    } else {
      element.style.opacity = 0;
      setTimeout(() => element.style.display = newStyle, 250);
    }
  }
};
const scrollTo = (element, to, duration) => {
  if (duration < 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};
const hideForm = (forms, currentForm, type = 'front') => {
  forms[currentForm].classList.remove('fadeInRight');
  forms[currentForm].classList.remove('fadeInLeft');
  forms[currentForm].classList.add('fadeOut' + (type === 'front' ? 'Left' : 'Right'));
  ((currentForm) => {
    setTimeout(() => forms[currentForm].style.display = 'none', 1000);
  })(currentForm);
};
const showForm = (forms, currentForm, type = 'front') => {
  forms[currentForm].style.display = 'block';
  forms[currentForm].classList.remove('fadeOutLeft');
  forms[currentForm].classList.remove('fadeOutRight');
  forms[currentForm].classList.add('fadeIn' + (type === 'front' ? 'Right' : 'Left'));
  scrollTo(document.querySelector('html'), 0, 500);
};
const validateCurrentForm = (forms, currentForm, userType) => {
  const formUsers = {
    'etkinlik': 'proje',
    'proje': 'etkinlik'
  };
  return !userType || !forms[currentForm].classList.contains('form-wrapper--' + formUsers[userType]);
}
const nextForm = (forms, currentForm, formsBack, userType, type = 'front') => {
  hideForm(forms, currentForm, type);
  currentForm = type === 'front' ? currentForm + 1 : currentForm - 1;
  if (!validateCurrentForm(forms, currentForm, userType)) {
    return nextForm(forms, currentForm, formsBack, userType, type);
  }
  toggleDisplay(formsBack, currentForm > 0);
  showForm(forms, currentForm, type);
  return currentForm;
};

window.onload = () => {
  let userType = '';
  let currentForm = 0;
  const formsBack = document.querySelector('.forms-back');
  const forms = document.querySelectorAll('.form-wrapper');
  const nextButtons = document.querySelectorAll('.button--next');
  const typeRadios = document.querySelectorAll('.form-wrapper--2 .radio');
  const etkinlikTypeRadios = document.querySelectorAll('.radios--etkinlik-type .radio');
  const etkinlikTypeOtherRadio = document.querySelector('.radios--etkinlik-type .radio--other');
  const etkinlikTypeOtherField = document.querySelector('.radios--etkinlik-type .field--other');
  const etkinlikSubjectRadios = document.querySelectorAll('.radios--etkinlik-subject .radio');
  const etkinlikSubjectOtherRadio = document.querySelector('.radios--etkinlik-subject .radio--other');
  const etkinlikSubjectOtherField = document.querySelector('.radios--etkinlik-subject .field--other');

  formsBack.onclick = () => {currentForm = nextForm(forms, currentForm, formsBack, userType, 'back')};
  nextButtons.forEach(nextButton => {
    nextButton.onclick = () => {currentForm = nextForm(forms, currentForm, formsBack, userType)};
  });
  typeRadios.forEach(typeRadio => {
    typeRadio.onchange = () => userType = typeRadio.checked ? typeRadio.value : userType;
  });
  etkinlikTypeRadios.forEach(etkinlikTypeRadio => {
    etkinlikTypeRadio.onchange = () => toggleDisplay(etkinlikTypeOtherField, etkinlikTypeOtherRadio.checked);
  });
  etkinlikSubjectRadios.forEach(etkinlikSubjectRadio => {
    etkinlikSubjectRadio.onchange = () => toggleDisplay(etkinlikSubjectOtherField, etkinlikSubjectOtherRadio.checked);
  });
};