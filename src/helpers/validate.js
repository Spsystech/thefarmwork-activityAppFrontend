const validate = (values) => {
  const errors = {};
  if (!values.summary) {
    errors.summary = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  if (!values.issueType) {
    errors.issueType = 'Please select valid type';
  }else if(values.issueType == 'Please select type'){
    errors.issueType = 'Please select valid type';
  }

  return errors;
};

export default validate;
