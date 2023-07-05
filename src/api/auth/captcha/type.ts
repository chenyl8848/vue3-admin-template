import {Response} from '@/api/type'

export enum CaptchaType {
    SLIDER = "SLIDER",
    ROTATE = "ROTATE",
    ROTATE_DEGREE = "ROTATE_DEGREE",
    CONCAT = "CONCAT",
    JIGSAW = "JIGSAW",
    IMAGE_CLICK = "IMAGE_CLICK",
    WORD_IMAGE_CLICK = "WORD_IMAGE_CLICK",
    WORD_ORDER_IMAGE_CLICK = "WORD_ORDER_IMAGE_CLICK"
}

export interface Captcha {
    type?: CaptchaType
    backgroundImage?: string
    templateImage?: string,
    backgroundImageTag?: string
    templateImageTag?: string
    backgroundImageWidth?: string
    backgroundImageHeight?: string
    templateImageWidth?: number
    templateImageHeight?: number
    data?: object
}

export interface CaptchaResultResponse {
    id: string,
    captcha: Captcha
}

export interface CaptchaResponse extends Response<CaptchaResultResponse> {
    data: CaptchaResultResponse
}

export interface CheckCaptchaRequest {
    bgImageWidth?: number
    bgImageHeight?: number,
    templateImageWidth?: number
    templateImageHeight?: number
    startSlidingTime?: string
    endSlidingTime?: string
    trackList?: []
    data?: object
}