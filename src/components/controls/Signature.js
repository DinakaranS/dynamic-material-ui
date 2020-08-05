/* eslint-disable no-alert,jsx-a11y/label-has-associated-control */
import React from 'react';
import SignatureCanvas from 'react-signature-canvas'
import PropTypes from 'prop-types';

const canvasOptions = { height: 300, width: 500 };

function Signature(props) {
  const sigPad = React.useRef();
  const uploadedFile = React.useRef();
  const {
    library, attributes, control
  } = props;
  const style = control.containerstyle ? control.containerstyle : { display: 'flex' };
  const BUTTON = library.Button;
  const enableUpload = control.enableupload || false;

  const clear = () => {
    sigPad.current.clear();
    props.onChange(props.control, '');
    uploadedFile.current.value = null;
  };

  const onEnd = () => {
    props.onChange(props.control, sigPad.current.toDataURL())
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const files = (e.target.files || e.dataTransfer.files) || [];
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 1048576) {
        alert('File is too big!.You can\'t upload file more than 1mb..');
        setTimeout(() => {
          uploadedFile.current.value = null;
          sigPad.current.clear();
        }, 10)
      } else {
        getBase64(file)
          .then(
            (data) => {
              sigPad.current.clear();
              sigPad.current.fromDataURL(data, canvasOptions);
            }
          );
      }
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const isUrl = (s) => {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    return regexp.test(s);
  }

  const toDataUrl = (url, callback) => {
    if (isUrl(url)) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result, canvasOptions);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', `https://nsproxy.geoviewer.io?url=${url}`);
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.responseType = 'blob';
      xhr.send();
    }
  }

  React.useEffect(() => {
    if (attributes.value) {
      toDataUrl(attributes.value, (data, options) => {
        sigPad.current.clear();
        sigPad.current.fromDataURL(data, options);
      })
    }
  }, [attributes.value]);

  return (
    <div>
      <div style={style}>
        <SignatureCanvas ref={sigPad} {...attributes} onEnd={onEnd} />
      </div>
      <div style={{
        display: 'flex',
        margin: '1rem',
        float: 'right'
      }}>
        {enableUpload && (
        <>
          <input
            key={Date.now()}
            accept="image/*"
            style={{
            display: 'none',
          }}
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={handleFileSelect}
            ref={uploadedFile}
        />
          <label htmlFor="contained-button-file">
            <BUTTON variant="contained" color="primary" component="span">
              Upload
            </BUTTON>
          </label>
        </>
        )}
        <BUTTON variant="contained" color="primary" style={{ marginLeft: '1rem' }} onClick={clear}>
          Clear
        </BUTTON>
      </div>
    </div>
  )
}

Signature.propTypes = {
  attributes: PropTypes.object,
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  control: PropTypes.object,
};
Signature.defaultProps = {
  attributes: null,
  library: null,
  onChange: null,
  control: {}
};
export default Signature;
