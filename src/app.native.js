import musicApi from './music-api'
import adapter from 'flyio/src/adapter/dsbridge'

const app = musicApi(adapter)

export const qq = app.qq
export const netease = app.netease
export const xiami = app.xiami
export default app

window.musicApi = app