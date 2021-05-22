const mui = [
  {
    id: 'portrait',
    type: 'datepicker',
    props: {
      id: 'portrait',
      hintText: 'Portrait Dialog',
      value: '',
      inputVariant: 'outlined',
      margin: 'normal',
      isEmpty: true
    }
  },
  {
    id: 'landscape',
    type: 'datepicker',
    props: {
      id: 'landscape',
      hintText: 'Landscape Dialog with clear',
      orientation: 'landscape',
      clear: true,
      inputVariant: 'outlined',
      margin: 'normal'
    }
  },
  {
    id: 'disabled',
    type: 'datepicker',
    props: {
      id: 'disabled',
      hintText: 'Dialog Disabled',
      disabled: true,
      inputVariant: 'outlined',
      margin: 'normal'
    }
  },
  {
    id: 'formatted',
    type: 'datepicker',
    props: {
      id: 'formatted',
      hintText: 'Moment Formatted Date',
      value: '01/26/2017',
      inputVariant: 'outlined',
      margin: 'normal'
    },
    format: 'll'
  },
  {
    id: 'daterange',
    type: 'datepicker',
    props: {
      id: 'formatted',
      hintText: 'Date Range',
      minDate: '01/01/2017',
      maxDate: '', // empty string refers to now
      inputVariant: 'outlined',
      margin: 'normal'
    }
  }
];

export default mui;
