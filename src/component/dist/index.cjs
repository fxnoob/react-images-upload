var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.js
var component_exports = {};
__export(component_exports, {
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var import_react = __toESM(require("react"));
var import_prop_types = __toESM(require("prop-types"));
var import_react_flip_move = __toESM(require("react-flip-move"));

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
var ReactImageUploadComponent = class extends import_react.default.Component {
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
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "errorMessage " + this.props.errorClass,
        key: index,
        style: this.props.errorStyle
      }, "* ", fileError.name, " ", fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError : this.props.fileTypeError);
    });
  }
  renderIcon() {
    if (this.props.withIcon) {
      return /* @__PURE__ */ import_react.default.createElement("img", {
        src: UploadIcon_default,
        className: "uploadIcon",
        alt: "Upload Icon"
      });
    }
  }
  renderLabel() {
    if (this.props.withLabel) {
      return /* @__PURE__ */ import_react.default.createElement("p", {
        className: this.props.labelClass,
        style: this.props.labelStyles
      }, this.props.label);
    }
  }
  renderPreview() {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "uploadPicturesWrapper"
    }, /* @__PURE__ */ import_react.default.createElement(import_react_flip_move.default, {
      enterAnimation: "fade",
      leaveAnimation: "fade",
      style: styles
    }, this.renderPreviewPictures()));
  }
  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        key: index,
        className: "uploadPictureContainer"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "deleteImage",
        onClick: () => this.removeImage(picture)
      }, "X"), /* @__PURE__ */ import_react.default.createElement("img", {
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
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "fileUploader " + this.props.className,
      style: this.props.style
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "fileContainer",
      style: this.props.fileContainerStyle
    }, this.renderIcon(), this.renderLabel(), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "errorsContainer"
    }, this.renderErrors()), /* @__PURE__ */ import_react.default.createElement("button", {
      type: this.props.buttonType,
      className: "chooseFileButton " + this.props.buttonClassName,
      style: this.props.buttonStyles,
      onClick: this.triggerFileUpload
    }, this.props.buttonText), /* @__PURE__ */ import_react.default.createElement("input", {
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
  style: import_prop_types.default.object,
  fileContainerStyle: import_prop_types.default.object,
  className: import_prop_types.default.string,
  onChange: import_prop_types.default.func,
  onDelete: import_prop_types.default.func,
  buttonClassName: import_prop_types.default.string,
  buttonStyles: import_prop_types.default.object,
  buttonType: import_prop_types.default.string,
  withPreview: import_prop_types.default.bool,
  accept: import_prop_types.default.string,
  name: import_prop_types.default.string,
  withIcon: import_prop_types.default.bool,
  buttonText: import_prop_types.default.string,
  withLabel: import_prop_types.default.bool,
  label: import_prop_types.default.string,
  labelStyles: import_prop_types.default.object,
  labelClass: import_prop_types.default.string,
  imgExtension: import_prop_types.default.array,
  maxFileSize: import_prop_types.default.number,
  fileSizeError: import_prop_types.default.string,
  fileTypeError: import_prop_types.default.string,
  errorClass: import_prop_types.default.string,
  errorStyle: import_prop_types.default.object,
  singleImage: import_prop_types.default.bool,
  defaultImages: import_prop_types.default.array
};
var component_default = ReactImageUploadComponent;
