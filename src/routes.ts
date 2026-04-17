import { Router } from "express";
import alunoController from "./controllers/alunos";
import cursoController from "./controllers/curso";
import * as matrculasController from "./controllers/matriculas";


const routes = Router();

routes.get("/", (request, response) =>
  response.status(200).json("Servidor rodando"),
);
routes.post("/alunos/", alunoController.create);
routes.get("/alunos/", alunoController.list);
routes.get("/alunos/:id", alunoController.getbyid);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete)

export default routes;

routes.post("/curso/", cursoController.create);
routes.get("/curso/", cursoController.list);
routes.get("/curso/:id", cursoController.getbyid);
routes.put("/curso/:id", cursoController.update);
routes.delete("/curso/:id", cursoController.delete)

routes.post("/curso/", matrculasController.create);
routes.delete("/curso/:id", matrculasController.remove);
