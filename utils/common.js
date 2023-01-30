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

export default {
  urlTobase64,
};