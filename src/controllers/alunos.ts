import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { handleError } from "../helpers/handleError";
import { json } from "node:stream/consumers";
import { copyFile } from "node:fs";

export default ({
    create: async (request:Request, response:Response) => {
        try{
        const{nome,idade,cpf,genero,email} = request.body;

        if(!nome ||  !idade || !cpf || !email) {
            response.status(400).json("dados incompletos")
        }
        const aluno = await prisma.alunos.create({
            data: {
                nome,
                idade,
                cpf,
                email,
                genero
            }
        
        })
        return response.status(201).json(aluno)
    } catch (e) {
            return handleError(e ,response);
    }
    },
    list: async (request:Request, response:Response) => {
        try {
         const alunos = await prisma.alunos.findMany();
                return response.status(200).json(alunos);
        }   catch (e){
            return handleError(e ,response);
                
        }
    },
    getbyid: async (request:Request, response:Response) => {
        try {
            const { id } = request.params;
            const aluno = await prisma.alunos.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!aluno) {
                return response.status(404).json("aluno não encontrado")
            }
            return response.status(200).json(aluno);
        }catch (e) {
            return handleError(e, response);
        }
    },
    update: async (request:Request, response:Response) => {
        try {
            const {id} = request.params;
            const {nome, idade, cpf, genero, email} = request.body;

            const aluno = await prisma.alunos.update({
                where: {
                    id: Number(id),
                },
                data: {
                    nome,
                    idade,
                    cpf,
                    email,
                    genero,
                },
            });
            return response.status(200).json(aluno);
        }catch (e) {
         return handleError(e, response);
        }
    },
    delete: async (request:Request, response:Response) => {
        try {
            const {id} = request.params;
            const aluno = await prisma.alunos.delete({
                where: {
                    id: Number(id),
                },
            });
            return response.status(200).json(aluno);
        }catch (e) {
            return handleError(e ,response)
        }
    }
});
