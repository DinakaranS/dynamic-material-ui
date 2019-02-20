const mui = [
  {
    id: 1,
    type: 'toggle',
    props: {
      id: 'simple',
      label: 'Simple',
    }
  },
  {
    id: 2,
    type: 'toggle',
    props: {
      id: 'disabled',
      label: 'Disabled',
      defaultToggled: true,
      disabled: true,
    }
  },
  {
    id: 3,
    type: 'toggle',
    props: {
      label: 'Styling',
      thumbStyle: {
        backgroundColor: '#ffcccc'
      },
      trackStyle: {
        backgroundColor: '#ff9d9d'
      },
      thumbSwitchedStyle: {
        backgroundColor: 'red'
      },
      trackSwitchedStyle: {
        backgroundColor: '#ff9d9d'
      },
      labelStyle: {
        color: 'red'
      },
    }
  }
];

export default mui;
