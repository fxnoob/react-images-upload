// index.js
import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";

// UploadIcon.svg
var UploadIcon_default = "./UploadIcon-NXYFJH7Y.svg";

// index.js
var styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};
var ERROR = {
  NOT_SUPPORTED_EXTENSION: "NOT_SUPPORTED_EXTENSION",
  FILESIZE_TOO_LARGE: "FILESIZE_TOO_LARGE"
};
var ReactImageUploadComponent = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [...props.defaultImages],
      files: [],
      fileErrors: [],
      lastDefaultImages: null
    };
    this.inputElement = "";
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.files !== this.state.files) {
      this.props.onChange(this.state.files, this.state.pictures);
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.defaultImages !== state.lastDefaultImages) {
      return {
        pictures: props.defaultImages,
        lastDefaultImages: props.defaultImages
      };
    }
    return null;
  }
  hasExtension(fileName) {
    const pattern = "(" + this.props.imgExtension.join("|").replace(/\./g, "\\.") + ")$";
    return new RegExp(pattern, "i").test(fileName);
  }
  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];
    const fileErrors = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name
      };
      if (!this.hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fileErrors.push(fileError);
        continue;
      }
      if (file.size > this.props.maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fileErrors.push(fileError);
        continue;
      }
      allFilePromises.push(this.readFile(file));
    }
    this.setState({
      fileErrors
    });
    const { singleImage } = this.props;
    Promise.all(allFilePromises).then((newFilesData) => {
      const dataURLs = singleImage ? [] : this.state.pictures.slice();
      const files2 = singleImage ? [] : this.state.files.slice();
      newFilesData.forEach((newFileData) => {
        dataURLs.push(newFileData.dataURL);
        files2.push(newFileData.file);
      });
      this.setState({ pictures: dataURLs, files: files2 });
    });
  }
  onUploadClick(e) {
    e.target.value = null;
  }
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({ file, dataURL });
      };
      reader.readAsDataURL(file);
    });
  }
  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex((e) => e === picture);
    const filteredPictures = this.state.pictures.filter(
      (e, index) => index !== removeIndex
    );
    const filteredFiles = this.state.files.filter(
      (e, index) => index !== removeIndex
    );
    this.setState({ pictures: filteredPictures, files: filteredFiles }, () => {
      this.props.onChange(this.state.files, this.state.pictures);
    });
  }
  renderErrors() {
    const { fileErrors } = this.state;
    return fileErrors.map((fileError, index) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: "errorMessage " + this.props.errorClass,
        key: index,
        style: this.props.errorStyle
      }, "* ", fileError.name, " ", fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError : this.props.fileTypeError);
    });
  }
  renderIcon() {
    if (this.props.withIcon) {
      return /* @__PURE__ */ React.createElement("img", {
        src: UploadIcon_default,
        className: "uploadIcon",
        alt: "Upload Icon"
      });
    }
  }
  renderLabel() {
    if (this.props.withLabel) {
      return /* @__PURE__ */ React.createElement("p", {
        className: this.props.labelClass,
        style: this.props.labelStyles
      }, this.props.label);
    }
  }
  renderPreview() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "uploadPicturesWrapper"
    }, /* @__PURE__ */ React.createElement(FlipMove, {
      enterAnimation: "fade",
      leaveAnimation: "fade",
      style: styles
    }, this.renderPreviewPictures()));
  }
  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return /* @__PURE__ */ React.createElement("div", {
        key: index,
        className: "uploadPictureContainer"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "deleteImage",
        onClick: () => this.removeImage(picture)
      }, "X"), /* @__PURE__ */ React.createElement("img", {
        src: picture,
        className: "uploadPicture",
        alt: "preview"
      }));
    });
  }
  triggerFileUpload() {
    this.inputElement.click();
  }
  clearPictures() {
    this.setState({ pictures: [] });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "fileUploader " + this.props.className,
      style: this.props.style
    }, /* @__PURE__ */ React.createElement("div", {
      className: "fileContainer",
      style: this.props.fileContainerStyle
    }, this.renderIcon(), this.renderLabel(), /* @__PURE__ */ React.createElement("div", {
      className: "errorsContainer"
    }, this.renderErrors()), /* @__PURE__ */ React.createElement("button", {
      type: this.props.buttonType,
      className: "chooseFileButton " + this.props.buttonClassName,
      style: this.props.buttonStyles,
      onClick: this.triggerFileUpload
    }, this.props.buttonText), /* @__PURE__ */ React.createElement("input", {
      type: "file",
      ref: (input) => this.inputElement = input,
      name: this.props.name,
      multiple: !this.props.singleImage,
      onChange: this.onDropFile,
      onClick: this.onUploadClick,
      accept: this.props.accept
    }), this.props.withPreview ? this.renderPreview() : null));
  }
};
ReactImageUploadComponent.defaultProps = {
  className: "",
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: [".jpg", ".jpeg", ".gif", ".png"],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {
  },
  defaultImages: []
};
ReactImageUploadComponent.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImages: PropTypes.array
};
var component_default = ReactImageUploadComponent;
export {
  component_default as default
};
