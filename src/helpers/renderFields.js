import React from 'react';
import { Label, Input, FormGroup } from 'reactstrap';
import { DateTimePicker } from 'react-widgets';

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <React.Fragment>
    <FormGroup>
      <div>
        <Label>{label}</Label>
        <div>
          <Input {...input} placeholder={label} type={type} />
          {touched && error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
      </div>
    </FormGroup>
  </React.Fragment>
);

const renderDateTimePicker = ({ 
  input:{value, onChange}, label, formatter, type, meta: { touched, error },
}) => (
    <React.Fragment>
    <FormGroup>
      <div>
        <Label>{label}</Label>
        <div>
          <DateTimePicker onChange={onChange} value={!value ? null : new Date(value)} step={1} editFormat={'DD-MM-YYYY T HH:mm'}  defaultValue={null} time={true}
          />
          {touched && error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
      </div>
    </FormGroup>
  </React.Fragment>
)


const renderDropdown = ({
  input, label, optionValues, meta: { touched, error },
}) => {
  let options = [];
  if(optionValues && optionValues[0] && optionValues[0].environment_list){
     optionValues[0].environment_list.map((item, index)=>{
      options.push(item)
     })
  }else{
    options.push('Please select type');
    optionValues.map((item, index)=> {
      options.push(item)
    })
  }
  return (
  <React.Fragment>
    <FormGroup>
      <div>
        <Label>{label}</Label>
        <div>
            <Input defaultValue={options[0]} className='overwrite_default_select' {...input} placeholder={label} type="select">
              {
                options.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })
              }
            </Input>
          {touched && error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
      </div>
    </FormGroup>
  </React.Fragment>
);}

export {
  renderField,
  renderDropdown,
  renderDateTimePicker
}