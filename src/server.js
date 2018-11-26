import express from 'express'
import apicache from 'apicache'
import musicApi from './app'
import AV from 'leanengine'

const app = express()

app.use(apicache.middleware('720 minutes'))

app.get('/', async function (req, res) {
    const method = req.query.method
    const vendor = req.query.vendor
    const params = JSON.parse(req.query.params || '[]')

    if (!method) {
        res.status(400).send({
            error: '参数错误'
        })
        return
    }
    let data
    if (vendor) {
        data = await musicApi[vendor][method](...params)
    } else {
        data = await musicApi[method](...params)
    }
    res.send(data)
})

if(process.env.LEAN) {
    AV.init({
        appId: process.env.LEANCLOUD_APP_ID,
        appKey: process.env.LEANCLOUD_APP_KEY,
        masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
    })
    app.use(AV.express())
}

app.listen(process.env.PORT || 3000)