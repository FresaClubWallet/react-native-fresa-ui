import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { ErrorMessage } from 'formik';

const FormFields = ({ field, form, ...props }) => {
  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        {...props}
      />
      <ErrorMessage name={field.name} component={Text} />
    </View>
  );
};

FormFields.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
};

export default FormFields;