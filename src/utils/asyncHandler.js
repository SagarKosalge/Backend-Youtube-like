const asyncHandler = (requestHandlar) => {
    (req, res, next)=> {
        Promise.resolve(requestHandlar(req, res, next))
        .catch((err) => next(err))
    }
}



export {asyncHandler}


// const asyncHandler = () => {}
// const asyncHandler = (func) => {()=> {}} we write this to pass function in another function
// const asyncHandler = (func) => {aync()=> {}} pass func into async function
// const asyncHandler = (func) => aync()=> {}   we can remove curly braces in second function



// this code below is try catch code to be used above code is for promises

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: true,
//             message: err.message
//         })
//     }
// }