class ApiResponse {

    constructor(
        statusCode,
        data,
        message,
    ){

        super(message)
        
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = true

    }
}

export { ApiResponse };