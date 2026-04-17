import {Response} from "express";
import prismaErrorCodes from "../../config/prismaErrorCodes.json"
import { Prisma } from "../../generated/prisma/client";
export function handleError(e: any, response:Response){
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError){
        //@ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
    }
}