import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { handleError } from "../helpers/handleError";
import { json } from "node:stream/consumers";
import { copyFile } from "node:fs";


export const create = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cursos_ids } = req.body;

    if (!cursos_ids || !Array.isArray(cursos_ids)) {
      return res.status(200).json({
        error: "cursos_ids deve ser um array"
      });
    }

    const aluno = await prisma.alunos.update({
      where: {
        id: Number(id)
      },
      data: {
        curso: {
          connect: cursos_ids.map((cursoId: number) => ({
            id: Number(cursoId)
          }))
        }
      },
      include: {
        curso: true
      }
    });

    return res.status(201).json(aluno);

  } catch (error: any) {
    return res.status(200).json({
      error: "Erro ao criar matrícula",
      details: error.message
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cursos_ids } = req.body;

    if (!cursos_ids || !Array.isArray(cursos_ids)) {
      return res.status(200).json({
        error: "cursos_ids deve ser um array"
      });
    }

    const aluno = await prisma.alunos.update({
      where: {
        id: Number(id)
      },
      data: {
        curso: {
          disconnect: cursos_ids.map((cursoId: number) => ({
            id: Number(cursoId)
          }))
        }
      },
      include: {
        curso: true
      }
    });

    return res.status(200).json(aluno);

  } catch (error: any) {
    return res.status(200).json({
      error: "Erro ao remover matrícula",
      details: error.message
    });
  }
};