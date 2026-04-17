import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { handleError } from "../helpers/handleError";
import { json } from "node:stream/consumers";
import { copyFile } from "node:fs";

export default ({
    create: async (request:Request, response:Response) => {
        try{
        const{nome,descricao, duracao} = request.body;

        if(!nome ||  !descricao || !duracao ) {
            response.status(400).json("dados incompletos")
        }
        const curso = await prisma.cursos.create({
            data: {
                nome,
                descricao,
                duracao
            },
        
        })
        return response.status(201).json(curso)
    } catch (e) {
            return handleError(e ,response);
    }
    },
    list: async (request:Request, response:Response) => {
        try {
         const curso = await prisma.cursos.findMany();
                return response.status(200).json(curso);
        }   catch (e){
            return handleError(e ,response);
                
        }
    },
    getbyid: async (request:Request, response:Response) => {
        try {
            const { id } = request.params;
            const curso = await prisma.cursos.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!curso) {
                return response.status(404).json("aluno não encontrado")
            }
            return response.status(200).json(curso);
        }catch (e) {
            return handleError(e, response);
        }
    },
    update: async (request:Request, response:Response) => {
        try {
            const {id} = request.params;
            const {nome,descricao,duracao } = request.body;

            const curso = await prisma.cursos.update({
                where: {
                    id: Number(id),
                },
                data: {
                    nome,
                descricao,
                duracao
                },
            });
            return response.status(200).json(curso);
        }catch (e) {
         return handleError(e, response);
        }
    },
    delete: async (request:Request, response:Response) => {
        try {
            const {id} = request.params;
            const curso = await prisma.cursos.delete({
                where: {
                    id: Number(id),
                },
            });
            return response.status(200).json(curso);
        }catch (e) {
            return handleError(e ,response)
        }
    }
})