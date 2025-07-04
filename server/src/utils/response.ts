export function success<T = any>(data: T = null, msg = "success") {
  return { code: 200, msg, data };
}

export function fail(msg = "error", code = 1, data: any = null) {
  return { code, msg, data };
}
