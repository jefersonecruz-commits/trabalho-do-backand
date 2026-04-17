-- CreateTable
CREATE TABLE "_alunosTocursos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_alunosTocursos_A_fkey" FOREIGN KEY ("A") REFERENCES "alunos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_alunosTocursos_B_fkey" FOREIGN KEY ("B") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_alunosTocursos_AB_unique" ON "_alunosTocursos"("A", "B");

-- CreateIndex
CREATE INDEX "_alunosTocursos_B_index" ON "_alunosTocursos"("B");
