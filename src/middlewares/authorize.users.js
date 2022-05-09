function authorize(roles){

    return function(req,res,next){
        const user  =  req.user
        let ispermission = false

        roles.map(e =>{
            if(user.role.includes(e)) ispermission = true
        })
        if (!ispermission) {
            return res.send({message: "Permission Denied"}).status(404)
        }
        return next()
    }
}



module.exports = {authorize}