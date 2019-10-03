import React from 'react';
import MaskedInput from 'react-text-mask';

function PhoneMask(props) {
    const { inputRef, ...other } = props;

    const handleInputChange = (event) => {
      props.onChange(event);
    }
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        guide={false}
        showMask
        onChange={props.onChange}
      />
    );
}

export default PhoneMask;