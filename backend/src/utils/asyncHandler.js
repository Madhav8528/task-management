

export const asyncHandler = async (method) => {
    
    return async (req, res, next) => {
        
        Promise.resolve(method(req, res, next))
        .catch((err) => next(err))
    }
}