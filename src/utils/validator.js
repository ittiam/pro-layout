/**
 * @DATE: 2019-12-19 11:22
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 校验器
 * @Update: 更新内容 by yunchangJia 2019-12-19 11:22
 */

/**
 * 标题字符串：如角色标题
 * @param rule
 * @param value
 * @param callback
 */
export const isTitleString = (rule, value, callback) => {
  const patrn = /^.{6,10}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是长度为6到10的字符串！'));
  } else {
    callback();
  }
};

/**
 * 一般字符串：如名称等
 * @param rule
 * @param value
 * @param callback
 */
export const isNormalString = (rule, value, callback) => {
  const patrn = /^.{2,20}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是长度为2到20的字符串！'));
  } else {
    callback();
  }
};

/**
 * 较短字符串：如名称等
 * @param rule
 * @param value
 * @param callback
 */
export const isSmallString = (rule, value, callback) => {
  const patrn = /^.{2,7}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是长度为2到7的字符串！'));
  } else {
    callback();
  }
};

/**
 * deviceCode  设备备编号为：1180800001
 * @param rule
 * @param value
 * @param callback
 */
export const isDeviceCode = (rule, value, callback) => {
  const patrn = /^[1-3][0-9][0-9]((0[1-9])|(1[0-2]))[0-9]{5}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('格式不对！'));
  } else {
    callback();
  }
};

/**
 * 较长字符串：如地址等
 * @param rule
 * @param value
 * @param callback
 */
export const isLongString = (rule, value, callback) => {
  const patrn = /^.{2,50}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是长度为2到50的字符串！'));
  } else {
    callback();
  }
};

/**
 * 大段文字：如备注等
 * @param rule
 * @param value
 * @param callback
 */
export const isParagraph = (rule, value, callback) => {
  const patrn = /^.{2,200}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是长度为2到200的字符串！'));
  } else {
    callback();
  }
};

/**
 * 纯数字型字符串
 * @param rule
 * @param value
 * @param callback
 */
export const isNumberString = (rule, value, callback) => {
  const patrn = /^([0-9]){0,16}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是由数字组成的字符串（长度不超过16位）！'));
  } else {
    callback();
  }
};

/**
 * 整数(非零开头的正整数)
 * @param rule
 * @param value
 * @param callback
 */
export const isInteger = (rule, value, callback) => {
  const patrn = /^([1-9]{1}[0-9]{0,9})$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是非零开头的正整数（长度不超过10位）！'));
  } else {
    callback();
  }
};

/**
 * 金额（元，精确到小数点后两位）
 * @param rule
 * @param value
 * @param callback
 */
export const isMoney = (rule, value, callback) => {
  const patrn = /^(0|[1-9]{1}[0-9]{0,7})$|(^-?(0|[1-9]{1}[0-9]{0,7})[\.]{1}[0-9]{1,2}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('单位：元，精确到小数点后两位'));
  } else {
    callback();
  }
};

/**
 * 精确到小数点后两位
 * @param rule
 * @param value
 * @param callback
 */
export const isFoloatNumber = (rule, value, callback) => {
  const patrn = /^(0|[1-9]{1}[0-9]{0,7})$|(^-?(0|[1-9]{1}[0-9]{0,7})[\.]{1}[0-9]{1,2}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入数字'));
  } else {
    callback();
  }
};

/**
 * 登录名
 * @param rule
 * @param value
 * @param callback
 */
export const isUserName = (rule, value, callback) => {
  const patrn = /^([a-zA-Z0-9]|[_]){4,20}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是由数字、26个英文字母及下划线组成的长度为4到20的字符串！'));
  } else {
    callback();
  }
};

/**
 * 密码
 * @param rule
 * @param value
 * @param callback
 */
export const isPassword = (rule, value, callback) => {
  const patrn = /^[A-Za-z0-9]{4,20}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('密码是4-20位字母数字组合！'));
  } else {
    callback();
  }
};

/**
 * 姓名
 * @param rule
 * @param value
 * @param callback
 */
export const isTrueName = (rule, value, callback) => {
  const patrn = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{2,20}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是由数字、26个英文字母或下划线和中文组成的长度为2到20的字符串！'));
  } else {
    callback();
  }
};

/**
 * 手机
 * @param rule
 * @param value
 * @param callback
 */
export const isMobile = (rule, value, callback) => {
  const patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的手机号码！'));
  } else {
    callback();
  }
};

/**
 * 普通电话号码、传真号码：可以“+”开头，除数字外，可含有“-”
 * @param rule
 * @param value
 * @param callback
 */
export const isPhone = (rule, value, callback) => {
  const patrn = /^([+]{0,1}(\d){3,4}[-](\d){7,8}|[+]{0,1}(\d){3,4}[-](\d){7,8}?([-](\d){1,4}))$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的电话号码！(如：+区号(3-4位)-电话(7-8位)-分机号(1-4位))'));
  } else {
    callback();
  }
};

/**
 * 电话号码：包括11位手机号和普通座机号码
 * @param rule
 * @param value
 * @param callback
 */
export const isTelephone = (rule, value, callback) => {
  const patrn = /^(1[34578]\d{9}$)|^(([+]{0,1}(\d){3,4}[-](\d){7,8}|[+]{0,1}(\d){3,4}(\d){7}|[+]{0,1}(\d){3,4}[-](\d){7,8}?([-](\d){1,4}))$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的手机号码或座机号码！'));
  } else {
    callback();
  }
};

/**
 * 邮箱^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
 * @param rule
 * @param value
 * @param callback
 */
export const isEmail = (rule, value, callback) => {
  const patrn = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的邮箱地址！'));
  } else {
    callback();
  }
};

/**
 * QQ
 * @param rule
 * @param value
 * @param callback
 */
export const isQQ = (rule, value, callback) => {
  const patrn = /^[1-9]\d{4,10}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的QQ！'));
  } else {
    callback();
  }
};

/**
 * 微信
 * @param rule
 * @param value
 * @param callback
 */
export const isWeixin = (rule, value, callback) => {
  const patrn = /^[a-zA-Z\d_]{5,}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的微信！'));
  } else {
    callback();
  }
};

/**
 * URL
 * @param rule
 * @param value
 * @param callback
 */
export const isUrl = (rule, value, callback) => {
  const patrn = /^(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的Url地址！'));
  } else {
    callback();
  }
};

/**
 * IP
 * @param rule
 * @param value
 * @param callback
 */
export const isIP = (rule, value, callback) => {
  const patrn = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的IP地址！'));
  } else {
    callback();
  }
};

/**
 * 端口号
 * @param rule
 * @param value
 * @param callback
 */
export const isPort = (rule, value, callback) => {
  const patrn = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的端口号（必须在0-65535之间）！'));
  } else {
    callback();
  }
};

/**
 * 区域编码
 * @param rule
 * @param value
 * @param callback
 */
export const isPostalCode = (rule, value, callback) => {
  const patrn = /^[0-9]{6}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入长度为6位的数字！'));
  } else {
    callback();
  }
};

/**
 * 编码：如产品编码
 * @param rule
 * @param value
 * @param callback
 */
export const isCode = (rule, value, callback) => {
  const patrn = /^([a-zA-Z0-9]|[/_-]|[（）]|[()]|[.])+$/;
  if ((value && !patrn.test(value)) || `${value}`.toLowerCase() === 'null') {
    callback(new Error('请输入数字、26个英文字母、或"/"、"-"、"_"、"."、"()"组成的字符串！'));
  } else {
    callback();
  }
};

/**
 * 尺寸：255*255*255
 * @param rule
 * @param value
 * @param callback
 */
export const isRule = (rule, value, callback) => {
  const patrn = /^([1-9]{1}[0-9]{0,4})([*]([1-9]{1}[0-9]{0,4}))([*]([1-9]{1}[0-9]{0,4}))$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的尺寸！(如：255*255*255)'));
  } else {
    callback();
  }
};

/**
 * 经度
 * @param rule
 * @param value
 * @param callback
 */
export const isLongi = (rule, value, callback) => {
  const patrn = /^-?(((\d|[1-9]\d|1[0-7]\d|0)\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的经度！'));
  } else {
    callback();
  }
};

/**
 * 纬度
 * @param rule
 * @param value
 * @param callback
 */
export const isLati = (rule, value, callback) => {
  const patrn = /^-?([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入正确的纬度！'));
  } else {
    callback();
  }
};

export const validateRatio = (rule, value, callback) => {
  // 10的n次方正则
  const patrn = /(^[1]{1}[0]{0,4}$)|(^[0]{1}[\.]{1}[0]{0,4}[1]{1}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('10的n次方, 范围：0.00001~10000'));
  } else {
    callback();
  }
};

/**
 * float数据的校验
 * @param rule
 * @param value
 * @param callback
 */
export const isFloat = (rule, value, callback) => {
  const patrn = /(^-?[0-9]{0,8}$)|(^-?[0-9]{0,8}[\.]{1}[0-9]{0,5}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('范围：-100000000 ~ +100000000 , 精确到:0.00001'));
  } else {
    callback();
  }
};

/**
 * 节能指标
 * @param rule
 * @param value
 * @param callback
 */
export const isSmallFloat = (rule, value, callback) => {
  const patrn = /^(?!00)(?:[0-9]{1,2}|100)(\.\d{0,2})?$/;
  if (value && !patrn.test(value)) {
    callback(new Error('范围：0.01-100 , 精确到:0.01'));
  } else {
    callback();
  }
};

/**
 * 节能范围
 * @param rule
 * @param value
 * @param callback
 */
export const isLongFloat = (rule, value, callback) => {
  const patrn = /^(?!00)(?:[0-9]{1,4}|99998)(\.\d{2,2})?$/;
  if (value && !patrn.test(value)) {
    callback(new Error('范围：0.01-99999.00 , 精确到:0.01'));
  } else {
    callback();
  }
};

/**
 * 精度值检验校验
 * @param rule
 * @param value
 * @param callback
 */
export const validatePrecision = (rule, value, callback) => {
  const patrn = /(^1$)|(^[0]{1}[\.]{1}[0]{0,4}[1]{1}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('精确度:0.00001 ~ 1'));
  } else {
    callback();
  }
};

/**
 * 功率因数
 * @param rule
 * @param value
 * @param callback
 */
export const validatePowerFactor = (rule, value, callback) => {
  const patrn = /(^1$)|(^[0]{1}[\.]{1}[0-9]{1,2}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('精确度:0.01 ~ 1'));
  } else {
    callback();
  }
};

/**
 * 8位正整数
 * @param rule
 * @param value
 * @param callback
 */
export const validateInteger = (rule, value, callback) => {
  const patrn = /(^[1-9]{1}[0-9]{0,7}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('精确度:1 ~ 99999999'));
  } else {
    callback();
  }
};

/**
 * 2位到18位数字
 * @param rule
 * @param value
 * @param callback
 */
export const waterCardNumber = (rule, value, callback) => {
  const patrn = /^\d{2,18}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('2位到18位数字'));
  } else {
    callback();
  }
};

/**
 * 建筑面积
 * @param rule
 * @param value
 * @param callback
 */
export const validateArea = (rule, value, callback) => {
  const patrn = /(^[1-9]{1}[0-9]{0,9}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('精确度:1 ~ 9999999999'));
  } else {
    callback();
  }
};

/**
 * 电压、功率等只能由数字和英文组成的字符串
 * @param rule
 * @param value
 * @param callback
 */
export const isNumberAndLetter = (rule, value, callback) => {
  const patrn = /^([a-zA-Z0-9]){3,19}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('必须是由数字和26个英文字母组成的长度为4到20的字符串！'));
  } else {
    callback();
  }
};

/**
 * 温度
 * @param rule
 * @param value
 * @param callback
 */
export const isTemperature = (rule, value, callback) => {
  // const patrn = /(^-?(0|[1-9]{1}[0-9]{0,7})$)|(^-?(0|[1-9]{1}[0-9]{0,7})[\.]{1}[0-9]{1,3}$)/;
  // 4-40℃
  const patrn = /(^-?([1-9]{1}[0-9]{0,2}[-][1-9]{1}[0-9]{0,2})$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入温度的区间值: ±2-50'));
  } else {
    callback();
  }
};

/**
 * 罐体规格
 * @param rule
 * @param value
 * @param callback
 */
export const isTankSpecification = (rule, value, callback) => {
  const patrn = /[Φ][0-9]{1}([0-9]|[*]){1,18}$/;
  if (value && !patrn.test(value)) {
    callback(new Error('请输入以 Φ 开头由数字和 * 组成的字符串！'));
  } else {
    callback();
  }
};

/**
 * 电机功率
 * @param rule
 * @param value
 * @param callback
 * @constructor
 */
export const MotorEfficiency = (rule, value, callback) => {
  const patrn = /(^(0|[1-9][0-9]{0,1}|100)$)|(^(0|[1-9][0-9]{0,1})[\.]{1}[0-9]{1,2}$)/;
  if (value && !patrn.test(value)) {
    callback(new Error('精确度:0 ~ 100 (可保留两位小数)'));
  } else {
    callback();
  }
};

/**
 * 校验密码
 * 密码必须包含一个大写字母和一个小写字母和一个数字.
 * 长度 >= 8位
 */
export const validPassword = pass => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8+}$/.test(pass);
};
