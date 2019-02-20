/* eslint-disable */
const mui = [
  {
    id: "label",
    type: 'label',
    props: {
      variant: "button",
      gutterBottom: true,
      text: "Sample Label",
      style: {
        backgroundColor: "rgb(66, 133, 244)",
        border: "2px solid rgb(66, 133, 244)",
        color: "rgb(255, 255, 255)",
        fontSize: 16,
        fontWeight: 600,
        padding: "5px 10px",
        width: "100%"
      }
    },
    layout: {
      row: 1,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 12
      },
      lg: {
        col: 12
      }
    }
  },
  {
    id: "textfield",
    type: 'textfield',
    props: {
      id: "textfield",
      label: 'First Name',
      value: '',
      helperText: "Full width!",
      fullWidth: true,
      style: {margin: 8},
      InputLabelProps: {
        shrink: true,
      },
      margin: "normal"
    },
    rules: {
      validation: [
        {
          "rule": "mandatory",
          "message": "Please enter your first name."
        }
      ]
    },
    layout: {
      row: 2,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: "textfieldoutlined",
    type: 'textfield',
    props: {
      id: "textfieldoutlined",
      label: 'First Name',
      value: '',
      helperText: "Full width!",
      fullWidth: true,
      style: {margin: 8},
      InputLabelProps: {
        shrink: true,
      },
      margin: "normal",
      variant: "outlined",
      InputProps: {
        InputAdornment: {
          position: "start",
          icon: "account_circle"
        }
      }
    },
    rules: {
      validation: [
        {
          "rule": "mandatory",
          "message": "Please enter your first name."
        }
      ]
    },
    layout: {
      row: 2,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: "selectfield",
    type: "selectfield",
    visible: true,
    props: {
      id: "selectfield",
      floatingLabelText: "Title",
      fullWidth: true,
      isMulti: true,
      selected: [
        "Mr",
        "Mrs"
      ],
      errorText: ""
    },
    options: [
      {
        value: null,
        primaryText: ""
      },
      {
        value: "Mr",
        primaryText: "Mr"
      },
      {
        value: "Mrs",
        primaryText: "Mrs"
      },
      {
        value: "Ms",
        primaryText: "Ms"
      },
      {
        value: "Miss",
        primaryText: "Miss"
      }
    ],
    rules: {
      validation: [
        {
          rule: "mandatory",
          message: "Please select a title."
        }
      ]
    },
    layout: {
      row: 2,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'checkboxstandalone',
    type: 'checkbox',
    props: {
      id: 'checkboxstandalone',
      label: 'Game Of Thrones',
      defaultChecked: false,
      color: "primary",
      formcontrollabel: {
        labelPlacement: 'end'
      },
      tooltip: {
        placement: "right",
        style: {
          top: "15px",
          height: "15px"
        },
        contentstyle: {
          width: "150px",
          height: "25px"
        },
        content: "I am going home early today, are you coming with me ?"
      },
      value: "",
      errorText: ""
    },
    layout: {
      row: 3,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'radiostandalone',
    type: 'radio',
    props: {
      id: 'radiostandalone',
      label: 'Game Of Thrones',
      defaultChecked: false,
      color: "primary",
      formcontrollabel: {
        labelPlacement: 'end'
      },
      tooltip: {
        placement: "right",
        style: {
          top: "15px",
          height: "15px"
        },
        contentstyle: {
          width: "150px",
          height: "25px"
        },
        content: "I am going home early today, are you coming with me ?"
      },
      value: "",
      errorText: ""
    },
    layout: {
      row: 3,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'togglestandalone',
    type: 'toggle',
    props: {
      id: 'togglestandalone',
      label: 'Game Of Thrones',
      defaultChecked: false,
      color: "primary",
      formcontrollabel: {
        labelPlacement: 'end'
      },
      tooltip: {
        placement: "left",
        style: {
          top: "15px",
          height: "15px"
        },
        contentstyle: {
          width: "150px",
          height: "25px"
        },
        content: "I am going home early today, are you coming with me ?"
      },
      value: "",
      errorText: ""
    },
    layout: {
      row: 3,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  // {
  //   id: 'radio',
  //   type: 'radio',
  //   props: {
  //     name: 'gender',
  //     formcontrol: {
  //       component: "fieldset"
  //     },
  //     formlabel: {
  //       component: "legend",
  //       text: "What is your favorite series?"
  //     },
  //     radiogroup: {},
  //     style: {marginTop: 10},
  //     tooltip: {
  //       placement: "right",
  //       style: {
  //         top: "-2px",
  //         marginLeft: "5px",
  //         height: "15px"
  //       },
  //       contentstyle: {
  //         width: "150px",
  //         height: "25px"
  //       },
  //       content: "Select your favourite series"
  //     },
  //   },
  //   options: [
  //     {
  //       value: 'got',
  //       label: 'Game of thrones',
  //     },
  //     {
  //       value: 'vikings',
  //       label: 'Vikings'
  //     },
  //     {
  //       value: 'bbt',
  //       label: 'Big bang theory'
  //     },
  //     {
  //       value: 'friends',
  //       label: 'Friends',
  //       disabled: true
  //     },
  //     {
  //       value: 'lk',
  //       label: 'Last kingdom',
  //       radio:{ color: "primary" },
  //     }
  //   ],
  //   layout: {
  //     row: 5,
  //     xs: {
  //       col: 6
  //     },
  //     sm: {
  //       col: 6
  //     },
  //     md: {
  //       col: 6
  //     },
  //     lg: {
  //       col: 6
  //     }
  //   }
  // },
  // {
  //   id: 'toggle',
  //   type: 'toggle',
  //   props: {
  //     name: 'gender',
  //     formcontrol: {
  //       component: "fieldset"
  //     },
  //     formlabel: {
  //       component: "legend",
  //       text: "What is your favorite series?"
  //     },
  //     formgroup: {},
  //     formhelpertext: {text: "Choose One"},
  //     style: {marginTop: 10},
  //     tooltip: {
  //       placement: "left",
  //       style: {
  //         top: "-2px",
  //         marginLeft: "5px",
  //         height: "15px"
  //       },
  //       contentstyle: {
  //         width: "150px",
  //         height: "25px"
  //       },
  //       content: "Select your favourite series"
  //     },
  //   },
  //   options: [
  //     {
  //       value: 'got',
  //       label: 'Game of thrones',
  //     },
  //     {
  //       value: 'vikings',
  //       label: 'Vikings'
  //     },
  //     {
  //       value: 'bbt',
  //       label: 'Big bang theory'
  //     },
  //     {
  //       value: 'friends',
  //       label: 'Friends',
  //       disabled: true
  //     },
  //     {
  //       value: 'lk',
  //       label: 'Last kingdom',
  //       toggle:{ color: "primary" },
  //     }
  //   ],
  //   layout: {
  //     row: 5,
  //     xs: {
  //       col: 6
  //     },
  //     sm: {
  //       col: 6
  //     },
  //     md: {
  //       col: 6
  //     },
  //     lg: {
  //       col: 6
  //     }
  //   }
  // },
  {
    id: 'datepicker',
    type: 'datepicker',
    props: {
      id: 'datepicker',
      margin: "normal",
      label: "Date picker",
      clearable: true,
      style: {width: "100%"},
      format: "yyyy-MM-dd",
    },
    layout: {
      row: 4,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'timepicker',
    type: 'timepicker',
    props: {
      id: 'timepicker',
      margin: "normal",
      label: "Time picker",
      clearable: true,
      style: {width: "100%"},
      format: "HH:mm:ss",
    },
    layout: {
      row: 4,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'datetimepicker',
    type: 'datetimepicker',
    props: {
      id: 'datetimepicker',
      margin: "normal",
      label: "Date Time picker",
      clearable: true,
      style: {width: "100%"},
      variant: "outlined",
      format: "yyyy-MM-dd HH:mm:ss",
    },
    layout: {
      row: 4,
      xs: {
        col: 4
      },
      sm: {
        col: 4
      },
      md: {
        col: 4
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'expansionpannel',
    type: 'expansionpannel',
    props: {
      id: 'expansionpannel',
      style: {
        marginTop: 15
      }
    },
    options: [
      {
        expansionPanel: {},
        expansionPanelSummary: {
          icon: 'expand_more'
        },
        headerTypography: {text: "Expansion Panel 1"},
        expansionPanelDetails: {style: {width: "100%"}},
        content: {
          guid: "expansion1",
          data: [
            {
              id: "expansiontextfield",
              type: 'textfield',
              props: {
                id: "expansiontextfield",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal"
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
              id: "textfieldexpansionoutlined",
              type: 'textfield',
              props: {
                id: "textfieldexpansionoutlined",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal",
                variant: "outlined",
                InputProps: {
                  InputAdornment: {
                    position: "start",
                    icon: "account_circle"
                  }
                }
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
            },]
        }
      },
      {
        expansionPanel: {},
        expansionPanelSummary: {
          icon: 'expand_more'
        },
        headerTypography: {text: "Expansion Panel 2"},
        expansionPanelDetails: {},
        content: {
          guid: "expansion2",
          data: [
            {
              id: "expansiontextfield",
              type: 'textfield',
              props: {
                id: "expansiontextfield",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal"
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
              id: "textfieldexpansionoutlined",
              type: 'textfield',
              props: {
                id: "textfieldexpansionoutlined",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal",
                variant: "outlined",
                InputProps: {
                  InputAdornment: {
                    position: "start",
                    icon: "account_circle"
                  }
                }
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
            },]
        }
      },
      {
        expansionPanel: {
          disabled: true
        }
      }],
    layout: {
      row: 7,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 12
      },
      lg: {
        col: 12
      }
    }
  },
  {
    id: "tabs",
    type: 'tabs',
    props: {
      appBar: {
        position: "static"
      },
      value: "one",
      tabs: {centered: true},
      style: {marginTop: 10}
    },
    options: [
      {
        value: "one",
        label: "New Arrivals in the Longest Text of Nonfiction",
        content: {
          guid: "one",
          data: [
            {
              id: "tabtextfield",
              type: 'textfield',
              props: {
                id: "tabtextfield",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal"
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
              id: "textfieldtaboutlined",
              type: 'textfield',
              props: {
                id: "textfieldtaboutlined",
                label: 'First Name',
                value: '',
                helperText: "Full width!",
                fullWidth: true,
                style: {margin: 8},
                InputLabelProps: {
                  shrink: true,
                },
                margin: "normal",
                variant: "outlined",
                InputProps: {
                  InputAdornment: {
                    position: "start",
                    icon: "account_circle"
                  }
                }
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
            },
            {
              id: 'radio',
              type: 'radio',
              props: {
                name: 'gender',
                formcontrol: {
                  component: "fieldset"
                },
                formlabel: {
                  component: "legend",
                  text: "What is your favorite series?"
                },
                radiogroup: {},
                style: {marginTop: 10},
                tooltip: {
                  placement: "right",
                  style: {
                    top: "-2px",
                    marginLeft: "5px",
                    height: "15px"
                  },
                  contentstyle: {
                    width: "150px",
                    height: "25px"
                  },
                  content: "Select your favourite series"
                },
              },
              options: [
                {
                  value: 'got',
                  label: 'Game of thrones',
                },
                {
                  value: 'vikings',
                  label: 'Vikings'
                },
                {
                  value: 'bbt',
                  label: 'Big bang theory'
                },
                {
                  value: 'friends',
                  label: 'Friends',
                  disabled: true
                },
                {
                  value: 'lk',
                  label: 'Last kingdom',
                  radio: {color: "primary"},
                }
              ],
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
              id: 'toggle',
              type: 'toggle',
              props: {
                name: 'gender',
                formcontrol: {
                  component: "fieldset"
                },
                formlabel: {
                  component: "legend",
                  text: "What is your favorite series?"
                },
                formgroup: {},
                formhelpertext: {text: "Choose One"},
                style: {marginTop: 10},
                tooltip: {
                  placement: "left",
                  style: {
                    top: "-2px",
                    marginLeft: "5px",
                    height: "15px"
                  },
                  contentstyle: {
                    width: "150px",
                    height: "25px"
                  },
                  content: "Select your favourite series"
                },
              },
              options: [
                {
                  value: 'got',
                  label: 'Game of thrones',
                },
                {
                  value: 'vikings',
                  label: 'Vikings'
                },
                {
                  value: 'bbt',
                  label: 'Big bang theory'
                },
                {
                  value: 'friends',
                  label: 'Friends',
                  disabled: true
                },
                {
                  value: 'lk',
                  label: 'Last kingdom',
                  toggle: {color: "primary"},
                }
              ],
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
            },]
        }
      },
      {
        value: "two",
        label: "Item Two",
        content: {
          guid: "two",
          data: [
            {
              id: "labeltab",
              type: 'label',
              props: {
                variant: "button",
                gutterBottom: true,
                text: "Item Two!",
                style: {}
              },
              layout: {
                row: 1,
                xs: {
                  col: 12
                },
                sm: {
                  col: 12
                },
                md: {
                  col: 12
                },
                lg: {
                  col: 12
                }
              }
            },]
        }
      },
      {
        value: "three",
        label: "Item Three",
        content: {
          guid: "three",
          data: [
            {
              id: "labeltabs",
              type: 'label',
              props: {
                variant: "button",
                gutterBottom: true,
                text: "Item Three!",
                style: {}
              },
              layout: {
                row: 1,
                xs: {
                  col: 12
                },
                sm: {
                  col: 12
                },
                md: {
                  col: 12
                },
                lg: {
                  col: 12
                }
              }
            },]
        }
      }],
    layout: {
      row: 6,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 12
      },
      lg: {
        col: 12
      }
    }
  },
  {
    id: "table",
    type: 'table',
    props: {
      paper: {style: {marginTop: 10}},
      table: {}
    },
    tableDetails: {
      uniqueIdDetails: {name: "id", component: "th", scope: "row"},
      header: [{name: "Name"}, {name: "Age", align: "right"}, {name: "Sex"}, {name: "Country"}],
      row: [{name: "name"}, {
        name: "age",
        align: "right"
      }, {name: "sex"}, {name: "country"}],
      data: [{id: 1, name: "DK", age: 30, sex: "Male", country: "India"},
        {id: 2, name: "TR", age: 28, sex: "Male", country: "India"},
        {id: 3, name: "AC", age: 35, sex: "Female", country: "India"},
        {id: 4, name: "VM", age: 20, sex: "Female", country: "India"}],
    },
    layout: {
      row: 8,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 12
      },
      lg: {
        col: 12
      }
    }
  },
];

export default mui;
