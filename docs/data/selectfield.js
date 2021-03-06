const mui = [
  {
    id: 'simple',
    type: 'selectfield',
    props: {
      id: 'simple',
      label: 'Country',
      style: {
        width: '400px'
      }
    },
    options: [
      {
        value: 'australia',
        primaryText: 'Australia'
      },
      {
        value: 'india',
        primaryText: 'India'
      },
      {
        value: 'usa',
        primaryText: 'USA'
      },
      {
        value: 'canada',
        primaryText: 'Canada'
      }
    ]
  },
  {
    id: 'disable',
    type: 'selectfield',
    props: {
      id: 'disable',
      label: 'Disabled',
      disabled: true,
      style: {
        width: '400px'
      }
    },
    options: [
      {
        value: 'australia',
        primaryText: 'Australia'
      },
      {
        value: 'india',
        primaryText: 'India'
      }
    ]
  },
  {
    id: 'nullable',
    type: 'selectfield',
    props: {
      id: 'nullable',
      label: '',
      errorText: 'Cannot be empty!',
      errorStyle: { color: 'red' },
      value: null,
      style: {
        width: '400px'
      }
    },
    options: [
      {
        value: null,
        primaryText: ''
      },
      {
        value: 'yes',
        primaryText: 'YES'
      },
      {
        value: 'no',
        primaryText: 'NO'
      }
    ]
  },
  {
    id: 'label',
    type: 'selectfield',
    props: {
      id: 'label',
      selected: 1,
      style: {
        width: '400px'
      }
    },
    options: [
      {
        value: 1,
        primaryText: 'Morning',
        label: '5 am - 12 pm'
      },
      {
        value: 2,
        primaryText: 'Afternoon',
        label: '12 pm - 5 pm'
      },
      {
        value: 3,
        primaryText: 'Evening',
        label: '5 pm - 9 pm'
      },
      {
        value: 4,
        primaryText: 'Night',
        label: '9 pm - 5 am'
      }
    ]
  }
];

export default mui;
