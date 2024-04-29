export const validateEmail = (email) => {
  const errors = {};
  if (!email) {
    errors.email = '* Email is required';
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = '* Please enter a valid email address';
    }
  }
  return errors;
};

export const validatePassword = (password) => {
  const errors = {};
  if (!password) {
    errors.password = '* Password is required';
  }
  return errors;
};

export const validateImage = (image) => {
  const errors = {};
  if (!image) {
    errors.image = '* Image is required';
  }
  return errors;
};

export const validateTitle = (title) => {
  const errors = {};
  if (!title.trim()) {
    errors.title = '* Title is required';
  }
  return errors;
};

export const validateDescription = (description) => {
  const errors = {};
  if (!description.trim()) {
    errors.description = '* Description is required';
  }
  return errors;
};

export const validatePrice = (price) => {
  const errors = {};
  if (!price) {
    errors.price = '* Price is required';
  } else if (isNaN(price) || price <= 0) {
    errors.price = '* Price must be a positive number';
  }
  return errors;
};

export const validateCategory = (category) => {
  const errors = {};
  if (!category.trim()) {
    errors.category = '* Category is required';
  }
  return errors;
};

export const validateName = (name) => {
  const errors = {};
  if (!name.trim()) {
    errors.fullName = '* FullName is required';
  }
  return errors;
};

export const validatePhoneNumber = (phoneNumber) => {
  const errors = {};
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumber) {
    errors.phoneNumber = '* Phone number is required';
  } else if (!phoneNumberPattern.test(phoneNumber)) {
    errors.phoneNumber = '* Please enter a valid 10-digit phone number';
  }
  return errors;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = {};
  if (!confirmPassword) {
    errors.cpassword = '* Confirm password is required';
  } else if (password !== confirmPassword) {
    errors.cpassword = '* Passwords do not match';
  }
  return errors;
};
