import { hex_md5 } from './md5';

const salt = 'powerdgj_kEEp2023';
function jsonSerialize(jsonData) {
  let result = '';

  for (const key in jsonData) {
    if (typeof jsonData[key] !== 'function') {
      result += `&${key}=${encodeURI(jsonData[key])}`;
    }
  }
  return result.substring(1);
}

export const stringParamsFun = (params) => {
  const keys = Object.keys(params).sort(
    (a, b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
  );
  return keys.join(',') + 'timestamp'
}

export const sign = (params, data) => {
  function sortParams() {
    if (params) {
      const sortParams = {};

      const keys = Object.keys(params).sort(
        (a, b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
      );

      keys.forEach((key) => {
        sortParams[key] = params[key];
      });
      return `${jsonSerialize(sortParams)}`;
    }
    return '';
  }
  const getSignData = sortParams();
  const postSignData = data ? `bodyJsonString=${JSON.stringify(data)}` : '';
  const linker = (getSignData && postSignData && '&') || '';
  console.log(`${getSignData}${linker}${postSignData}${salt}`);
  // console.log(postSignData);

  return hex_md5(`${getSignData}${linker}${postSignData}${salt}`);
};


const urlTobase64 = (folder, fileName, format = "png") => {
  let img = `/static/images/${folder}/${fileName}.${format}`,
    imgBase64 = wx.getFileSystemManager().readFileSync(img, "base64"),
    base64Url = `data:image/png;base64,${imgBase64}`;
  /*   console.log(
    "data:image/png;base64," + imgBase64,
    "图片转换成功+++++++++++++++++++++++++++++"
  ); */

  return base64Url;
};
// #endif

export const uniScrollTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
}

// 事件类型快速响应 = 10,日内响应 = 20,中长期响应 = 30
export const eventTypeList = [
  {
    name: '快速响应',
    value: '10'
  },
  {
    name: '日内响应',
    value: '20'
  },
  {
    name: '中长期响应',
    value: '30'
  }
]

