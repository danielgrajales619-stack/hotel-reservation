const logErrors = (err, req, res, next) => {
    console.error(err)  
    next(err)
}

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err
    })
}

const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err 
        res.status(output.statusCode).json(output)
        console.log(output.error)
    }
    next(err)
}

const formErrorHandler = (err, req, res, next) => {
    console.error(err)

    if (err.name === "MongoserverError") {
        const { keyValue, errmsg } = err.errorResponse
        const objectKey = Object.keys(keyValue)
        const duplicate = errmsg.includes("duplicate")
        if (duplicate){
            res.status(409).json({
                statusCode: 409,
                message: `El valor ${objectKey} : ${keyValue[objectKey]} esta duplicado`,
            })
        }
    }
    next(err)
}

export {
    logErrors,
    errorHandler,
    boomErrorHandler,
    formErrorHandler
}