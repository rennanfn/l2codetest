import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma: PrismaService) {}

  async getHorasProfessor() {
    const sqlQuery = `
      SELECT
          p.name AS nome_professor,
          SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600) AS horas_total
      FROM
          professor AS p
      JOIN
          class AS c ON p.id = c.taught_by
      JOIN
          class_schedule AS cs ON c.id = cs.class_id
      GROUP BY
          p.name
      ORDER BY
          horas_total DESC;
    `;
    const result = await this.prisma.$queryRawUnsafe(sqlQuery);
    return result;
  }

  async getHorariosSalas() {
    const sqlQuery = `
      SELECT
         r.name AS nome_sala,
         cs.day_of_week AS dia_semana,
         TO_CHAR(cs.start_time, 'HH24:MI') AS horario_inicio,
         TO_CHAR(cs.end_time, 'HH24:MI') AS horario_fim
      FROM
        room AS r
      JOIN
        class_schedule AS cs ON r.id = cs.room_id
      ORDER BY
        r.name,
        cs.day_of_week,
        cs.start_time;
    `;
    type HorarioOcupado = {
      nome_sala: string;
      dia_semana: string;
      horario_inicio: string;
      horario_fim: string;
    };

    const horariosOcupadosDoBanco =
      await this.prisma.$queryRawUnsafe<HorarioOcupado[]>(sqlQuery);

    const salas: Record<
      string,
      Record<
        string,
        { ocupado: { inicio: string; fim: string }[]; livre: any[] }
      >
    > = {};

    horariosOcupadosDoBanco.forEach((aula) => {
      const nome_sala = aula.nome_sala;
      const dia_semana = aula.dia_semana;

      if (!salas[nome_sala]) {
        salas[nome_sala] = {};
      }
      if (!salas[nome_sala][dia_semana]) {
        salas[nome_sala][dia_semana] = { ocupado: [], livre: [] };
      }

      salas[nome_sala][dia_semana].ocupado.push({
        inicio: aula.horario_inicio,
        fim: aula.horario_fim,
      });
    });

    return salas;
  }
}
