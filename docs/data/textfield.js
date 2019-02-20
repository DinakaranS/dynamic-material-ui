const mui = [
  {
    id: 'simple',
    type: 'textfield',
    props: {
      id: 'simple',
      label: 'Simple Textfield',
      value: ''
    }
  },
  {
    id: 'password',
    type: 'textfield',
    props: {
      id: 'password',
      label: 'Password Textfield',
      value: '',
      margin: 'normal',
      type: 'password'
    }
  },
  {
    id: 'error',
    type: 'textfield',
    props: {
      id: 'error',
      label: 'Number',
      margin: 'normal',
      type: 'number'
    }
  },
  {
    id: 'Filled',
    type: 'textfield',
    props: {
      id: 'Filled',
      label: 'Filled Textfield',
      value: '',
      variant: 'filled',
      margin: 'normal',
    }
  },
  {
    id: 'Outlined',
    type: 'textfield',
    props: {
      id: 'Outlined',
      label: 'Outlined Textfield',
      value: '',
      variant: 'outlined',
      margin: 'normal',
    }
  }
];

export default mui;
