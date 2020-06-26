let wind = 0
let rain_cnt = 0
let old_rain = 0
let rain = 0
let water = 0
let windd = 0
let 風向 = 0
let press = 0
let humid = 0
let temp = 0
let seq = 0
let instance = 0
let _namespace = 0
weatherbit.startWeatherMonitoring()
basic.forever(function () {
    _namespace = 1634558569
    instance = seq * 1073741824
    if (seq < 2) {
        temp = weatherbit.temperature() / 100
        humid = weatherbit.humidity() / 1024
        press = weatherbit.pressure() / 25600
        instance = instance + (Math.trunc(press) - 400) * 1048576
        instance = instance + Math.trunc(humid * 10) * 1024
        instance = instance + Math.trunc(temp * 10)
    } else {
        風向 = pins.analogReadPin(AnalogPin.P1)
        if (風向 <= 447) {
            windd = 0
        } else {
            if (風向 > 447 && 風向 <= 534) {
                windd = 45
            } else {
                if (風向 > 534 && 風向 <= 640) {
                    windd = 90
                } else {
                    if (風向 > 757 && 風向 <= 855) {
                        windd = 135
                    } else {
                        if (風向 > 970) {
                            windd = 180
                        } else {
                            if (風向 > 925 && 風向 <= 970) {
                                windd = 225
                            } else {
                                if (風向 > 855 && 風向 <= 925) {
                                    windd = 270
                                } else {
                                    if (風向 > 640 && 風向 <= 757) {
                                        windd = 315
                                    } else {
                                        windd = 361
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (seq == 2) {
        water = weatherbit.soilMoisture()
        instance = instance + Math.trunc(water) * 524288
    } else {
        rain = weatherbit.rain()
        if (rain > old_rain) {
            old_rain = rain
            rain_cnt += 1
            if (rain_cnt > 10) {
                control.reset()
            }
        }
        instance = instance + Math.trunc(rain * 100) * 524288
    }
    wind = weatherbit.windSpeed()
    instance = instance + Math.trunc(windd) * 1024
    instance = instance + Math.trunc(wind * 10)
    bluetooth.advertiseUid(
    _namespace,
    instance,
    7,
    false
    )
    seq += 1
    if (seq > 3) {
        seq = 0
    }
    basic.pause(5000)
    bluetooth.stopAdvertising()
    basic.pause(5000)
    if (input.runningTime() > 86400000) {
        control.reset()
    }
})
