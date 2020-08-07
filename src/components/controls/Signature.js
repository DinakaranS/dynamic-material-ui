/* eslint-disable no-alert,jsx-a11y/label-has-associated-control */
import React from 'react';
import SignatureCanvas from 'react-signature-canvas'
import PropTypes from 'prop-types';

const canvasOptions = { height: 300, width: 500 };

function Signature(props) {
  const sigPad = React.useRef();
  const uploadedFile = React.useRef();
  const clearOnBegin = React.useRef();
  const {
    library, attributes, control
  } = props;
  const style = control.containerstyle ? control.containerstyle : { display: 'flex' };
  const BUTTON = library.Button;
  const enableUpload = control.enableupload || false;

  const clear = () => {
    sigPad.current.clear();
    props.onChange(props.control, '');
    if (uploadedFile && uploadedFile.current) uploadedFile.current.value = null;
  };

  const onEnd = () => {
    props.onChange(props.control, sigPad.current.toDataURL('image/png', 1.0))
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

  const validUrl = (url) => {
    return /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi.test(url);
  }

  const convertImgToBase64 = (url, callback) => {
    let canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function (){
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      callback.call(this, dataURL, { height: img.height, width: img.width });
      // Clean up
      canvas = null;
    };
    img.src = url;
  }

  React.useEffect(() => {
    if (attributes.value && validUrl(attributes.value)) {
      convertImgToBase64(attributes.value, (data, options) => {
        clearOnBegin.current = true;
        sigPad.current.clear();
        sigPad.current.fromDataURL(data, options);
      })
    } else if (attributes.value){
      sigPad.current.fromDataURL(attributes.value, attributes.canvasProps);
    }
  }, []);

  const onBegin = () => {
    if (clearOnBegin.current) {
      sigPad.current.clear();
      clearOnBegin.current = false;
    }
  }

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
