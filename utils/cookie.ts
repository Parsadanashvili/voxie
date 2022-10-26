import { IncomingMessage, ServerResponse } from "http";

interface CookieParseOptions {
  decode?(value: string): string;
}

interface CookieSerializeOptions {
  domain?: string | undefined;

  encode?(value: string): string;

  expires?: Date | undefined;

  httpOnly?: boolean | undefined;

  maxAge?: number | undefined;

  path?: string | undefined;

  priority?: "low" | "medium" | "high" | undefined;

  sameSite?: true | false | "lax" | "strict" | "none" | undefined;

  secure?: boolean | undefined;
}

interface OptionsType extends CookieSerializeOptions {
  res?: ServerResponse;
  req?: IncomingMessage & {
    cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
  };
}

type TmpCookiesObj =
  | { [key: string]: string }
  | Partial<{ [key: string]: string }>;

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

const processValue = (value: string) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "undefined") return undefined;
  if (value === "null") return null;
  return value;
};

const parse = (
  str: string,
  options?: CookieParseOptions
): Record<string, string> => {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }

  var obj: { [key: string]: string } = {};
  var opt = options || {};
  var dec = opt.decode || decode;

  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);

    // no more cookie pairs
    if (eqIdx === -1) {
      break;
    }

    var endIdx = str.indexOf(";", index);

    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }

    var key = str.slice(index, eqIdx).trim();

    // only assign once
    if (undefined === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();

      // quoted values
      if (val.charCodeAt(0) === 0x22) {
        val = val.slice(1, -1);
      }

      obj[key] = tryDecode(val, dec);
    }

    index = endIdx + 1;
  }

  return obj;
};

const serialize = (
  name: string,
  val: string,
  options?: CookieSerializeOptions
): string => {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }

  var str = name + "=" + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }

    str += "; Max-Age=" + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }

    str += "; Domain=" + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }

    str += "; Path=" + opt.path;
  }

  if (opt.expires) {
    var expires = opt.expires;

    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }

    str += "; Expires=" + expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += "; HttpOnly";
  }

  if (opt.secure) {
    str += "; Secure";
  }

  if (opt.priority) {
    var priority =
      typeof opt.priority === "string"
        ? opt.priority.toLowerCase()
        : opt.priority;

    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }

  if (opt.sameSite) {
    var sameSite =
      typeof opt.sameSite === "string"
        ? opt.sameSite.toLowerCase()
        : opt.sameSite;

    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }

  return str;
};

const stringify = (value: string = "") => {
  try {
    const result = JSON.stringify(value);
    return /^[\{\[]/.test(result) ? result : value;
  } catch (e) {
    return value;
  }
};

const encode = (val: string): string => {
  return encodeURIComponent(val);
};

const decode = (str: string): string => {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
};

const tryDecode = (str: string, decode: (str: string) => string) => {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
};

const isDate = (val: any) => {
  return (
    Object.prototype.toString.call(val) === "[object Date]" ||
    val instanceof Date
  );
};

const isClientSide = (): boolean => typeof window !== "undefined";

const getCookies = (options?: OptionsType): TmpCookiesObj => {
  let req;
  if (options) req = options.req;
  if (!isClientSide()) {
    // if cookie-parser is used in project get cookies from ctx.req.cookies
    // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
    if (req && req.cookies) return req.cookies;
    if (req && req.headers && req.headers.cookie)
      return parse(req.headers.cookie);
    return {};
  }

  const _cookies: TmpCookiesObj = {};
  const documentCookies = document.cookie ? document.cookie.split("; ") : [];

  for (let i = 0, len = documentCookies.length; i < len; i++) {
    const cookieParts = documentCookies[i].split("=");

    const _cookie = cookieParts.slice(1).join("=");
    const name = cookieParts[0];

    _cookies[name] = _cookie;
  }

  return _cookies;
};

const getCookie = (key: string, options?: OptionsType) => {
  const _cookies = getCookies(options);
  const value = _cookies[key];
  if (value === undefined) return undefined;
  return processValue(decode(value));
};

const setCookie = (key: string, data: any, options?: OptionsType) => {
  let _cookieOptions: any;
  let _req;
  let _res;
  if (options) {
    const { req, res, ..._options } = options;
    _req = req;
    _res = res;
    _cookieOptions = _options;
  }

  const cookieStr = serialize(key, stringify(data), {
    path: "/",
    ..._cookieOptions,
  });

  if (!isClientSide()) {
    if (_res && _req) {
      let currentCookies = _res.getHeader("Set-Cookie");

      if (!Array.isArray(currentCookies)) {
        currentCookies = !currentCookies ? [] : [String(currentCookies)];
      }
      _res.setHeader("Set-Cookie", currentCookies.concat(cookieStr));

      if (_req && _req.cookies) {
        const _cookies = _req.cookies;
        data === "" ? delete _cookies[key] : (_cookies[key] = stringify(data));
      }

      if (_req && _req.headers && _req.headers.cookie) {
        const _cookies = parse(_req.headers.cookie);

        data === "" ? delete _cookies[key] : (_cookies[key] = stringify(data));

        _req.headers.cookie = Object.entries(_cookies).reduce((accum, item) => {
          return accum.concat(`${item[0]}=${item[1]};`);
        }, "");
      }
    }
  } else {
    document.cookie = cookieStr;
  }
};

const deleteCookie = (key: string, options?: OptionsType): void => {
  return setCookie(key, "", { ...options, maxAge: -1 });
};

export default {
  parse,
  serialize,
  setCookie,
  getCookie,
  deleteCookie,
};
