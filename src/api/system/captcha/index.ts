import request from '@/utils/request'
import {
  CaptchaResponse,
  CaptchaType,
  CheckCaptchaRequest,
} from '@/api/system/captcha/type'
import { Response } from '@/api/type'

enum API {
  GENERATE_CAPTCHA_URL = '/captcha/generate?captchaType=',
  CHECK_CAPTCHA_URL = '/captcha/check?id=',
}

export const generateCaptcha = (captchaType: CaptchaType) =>
  request.get<any, CaptchaResponse>(API.GENERATE_CAPTCHA_URL + captchaType)

export const checkCaptcha = (id: string, requestData: CheckCaptchaRequest) =>
  request.post<any, Response<boolean>>(API.CHECK_CAPTCHA_URL + id, requestData)
