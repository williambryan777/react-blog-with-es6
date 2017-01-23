import moment from 'moment';
export const API_ROOT = '';
export const DEFAULT_IMG = '/Themes/DefaultClean/images/cwb_default_img.jpg';// 微博默认图片
export const CERTIFICATION_IMG = '/Themes/DefaultClean/images/certification.png';// 身份图标

export const getLongBlogDetail = (blogDate, id) => {
  const date = new Date(blogDate);
  return `/social/${moment(date).format('YYMMDD')}_${id}`;
};


export const getShortBlogDetail = (blogDate, id) => {
  const date = new Date(blogDate);
  return `/social/short/${moment(date).format('YYMMDD')}_${id}`;
};
