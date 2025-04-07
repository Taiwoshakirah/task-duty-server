const methodNotAllowed = (req,res)=>{
res.status(402).json({message:`Method ${req.method} Not Allowed`})
}

module.exports = methodNotAllowed