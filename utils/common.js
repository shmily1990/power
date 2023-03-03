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
