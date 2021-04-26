import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';

Vue.use(wysiwyg, {
  // { [module]: boolean (set true to hide) }
  hideModules: {
    justifyLeft: true,
    justifyCenter: true,
    justifyRight: true,
    headings: true,
    code: true,
    image: true,
    orderedList: true,
    table: true,
  },

  // iconOverrides: { bold: "<i class='your-custom-icon'></i>" },

  // if the image option is not set, images are inserted as base64
  image: {
    uploadURL: '/api/myEndpoint',
    dropzoneOptions: {},
  },

  // limit content height if you wish. If not set, editor size will grow with content.
  // maxHeight: '500px',

  // set to 'true' this will insert plain text without styling when you paste something into the editor.
  forcePlainTextOnPaste: true,
  locale: 'fr',
});
