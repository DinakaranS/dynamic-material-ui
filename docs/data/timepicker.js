const mui = [
  {
    id: '12hr-format',
    type: 'timepicker',
    props: {
      id: '12hr-format',
      hintText: '12hr Format',
      inputVariant: 'outlined'
    }
  },
  {
    id: '12hr-format-ok',
    type: 'timepicker',
    props: {
      id: '12hr-format-ok',
      hintText: '12hr Format with auto ok',
      autoOk: true,
      inputVariant: 'outlined'
    }
  },
  {
    id: '24hr-format',
    type: 'timepicker',
    props: {
      id: '24hr-format',
      hintText: '24hr Format',
      ampm: false,
      inputVariant: 'outlined'
    }
  },
  {
    id: 'disabled',
    type: 'timepicker',
    props: {
      id: 'disabled',
      hintText: 'Disabled Timepicker',
      ampm: false,
      disabled: true,
      inputVariant: 'outlined'
    }
  }
];

export default mui;
