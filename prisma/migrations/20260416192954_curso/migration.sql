-- CreateTable
CREATE TABLE "cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cursos_id_key" ON "cursos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cursos_nome_key" ON "cursos"("nome");
