import { error } from "console";
import { Request,Response,NextFunction } from "express";

interface Customerror extends Error{
    status?:number
}

const errormiddleware=(
    err:Customerror,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    console.log("Error:",err.message)

    res.status(err.status||500).json({
        success:false,
        status:err.status||500,
        message:err.message||"internal server error"
    })
}

export default errormiddleware