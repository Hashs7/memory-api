/* -------------------- Import -------------------- */
import Vue from 'vue';
import imagesLoaded from 'imagesloaded';

/* -------------------- Plugin -------------------- */
const Color = {
  install(Vue) {
    Vue.prototype.$color = (url) =>
      new Promise((resolve) => {
        let data;
        const image = new Image();
        imagesLoaded(image, () => {
          const rvb = { r: 0, v: 0, b: 0 };
          const canvas = document.createElement('canvas');
          const height =
            image.naturalHeight || image.offsetHeight || image.height;
          canvas.height = height;
          const width = image.naturalWidth || image.offsetWidth || image.width;
          canvas.width = width;
          const context = canvas.getContext && canvas.getContext('2d');
          if (!context) {
            resolve('#ffffff');
            return;
          }
          context.drawImage(image, 0, 0);
          if (width === 0 || height === 0) {
            resolve('#ffffff');
            return;
          }
          data = context.getImageData(0, 0, width, height);

          let i = 0;
          let count = 0;
          const { length } = data.data;

          while (i < length) {
            count += 1;
            rvb.r += data.data[i];
            rvb.v += data.data[i + 1];
            rvb.b += data.data[i + 2];
            i += 4;
          }

          /* eslint-disable no-bitwise */
          rvb.r = ~~(rvb.r / count);
          rvb.v = ~~(rvb.v / count);
          rvb.b = ~~(rvb.b / count);
          /* eslint-enable no-bitwise */
          resolve(`rgba(${rvb.r}, ${rvb.v}, ${rvb.b}, 255)`);
        });
        image.crossOrigin = '*';
        image.src = url;
      });
  },
};

/* -------------------- Use -------------------- */
Vue.use(Color);
