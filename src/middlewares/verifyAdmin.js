export const verifyAdmin =(req,res,next)=>{
    try {
        if(!req.user || !req.user.admin)
            return res.status(483).json({error: 'Necesitas permisos de administrador'})
        next();
    } catch (error) {
        
    }
}
