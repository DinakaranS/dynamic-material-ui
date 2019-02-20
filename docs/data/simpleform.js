const mui = [
  {
    id: 1,
    type: 'textfield',
    props: {
      id: 'name',
      label: 'Hello, Whats your name?',
      fullWidth: true,
      margin: 'normal'
    },
    rules: {
      validation: [
        {
          rule: 'mandatory',
          message: 'Name is required!!'
        }
      ]
    },
    layout: {
      row: 1,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  }, {
    id: 2,
    type: 'textfield',
    props: {
      id: 'mobile',
      fullWidth: true,
      defaultValue: '',
      label: 'Whats your mobile number?',
      margin: 'normal'
    },
    rules: {
      validation: [
        {
          rule: 'mandatory',
          message: 'Please fill the field'
        },
        {
          rule: 'mobile',
          message: 'Should be Australian number',
          value: 'en-AU'
        }
      ]
    },
    layout: {
      row: 2,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  }, {
    id: 3,
    type: 'radio',
    props: {
      name: 'gender',
      value: 'male',
      style: {
        marginTop: '30px'
      }
    },
    options: [
      {
        value: 'male',
        label: 'Male'
      },
      {
        value: 'female',
        label: 'Female'
      },
      {
        value: 'other',
        label: 'Other'
      }
    ],
    layout: {
      row: 3,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  }, {
    id: 4,
    type: 'textfield',
    props: {
      id: 'email',
      label: 'What is yor personal email?',
      type: 'email',
      fullWidth: true,
      margin: 'normal'
    },
    rules: {
      isDisplayText: true,
      validation: [
        {
          rule: 'email',
          message: 'Please enter valid email!!'
        }
      ]
    },
    layout: {
      row: 4,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  },
  {
    id: 5,
    type: 'selectfield',
    props: {
      id: 'locations',
      label: 'Which of these places is capital of Australia?',
      selected: 'Sydney',
      margin: 'normal',
      style: {
        width: '400px'
      }
    },
    options: [
      {
        value: 'Sydney',
        primaryText: 'Sydney'
      },
      {
        value: 'Melbourne',
        primaryText: 'Melbourne'
      },
      {
        value: 'Adelaide',
        primaryText: 'Adelaide'
      },
      {
        value: 'Canberra',
        primaryText: 'Canberra'
      }
    ],
    rules: {
      validation: [
        {
          rule: 'equals',
          value: 'Sydney',
          message: 'Your answer is incorrect. Try again!!!'
        }
      ]
    },
    layout: {
      row: 5,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  },
  {
    id: 6,
    type: 'checkbox',
    props: {
      id: 'hobbies',
      label: 'Are you living your life?',
      style: {
        marginTop: '30px'
      },
      defaultChecked: true
    },
    layout: {
      row: 6,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  },
  {
    id: 7,
    type: 'toggle',
    props: {
      id: 'aztec',
      label: 'Are you loving react-aztec?',
      defaultToggled: true
    },
    layout: {
      row: 7,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  },
  {
    id: 8,
    type: 'datepicker',
    props: {
      id: 'dob',
      label: 'Hey Lucky, What is your date of birth?',
      style: {
        marginTop: '30px',
        width: '100%'
      }
    },
    layout: {
      row: 8,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  },
  {
    id: 9,
    type: 'timepicker',
    props: {
      id: 'wakeup',
      label: 'When do you wake up in the morning?',
      style: {
        marginTop: '30px',
        marginBottom: '30px',
        width: '100%'
      }
    },
    layout: {
      row: 9,
      xs: {
        col: 6
      },
      sm: {
        col: 6
      },
      md: {
        col: 6
      },
      lg: {
        col: 6
      }
    }
  }
];

export default mui;
