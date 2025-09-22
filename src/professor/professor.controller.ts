// src/professor/professor.controller.ts
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Consultas do Professor Girafales')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get('horas-professor')
  @ApiOperation({ summary: 'Obtém a carga horária de cada professor.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna a quantidade de horas de aula comprometidas de cada professor.',
  })
  async getHorasProfessor() {
    return this.professorService.getHorasProfessor();
  }

  @Get('horarios-salas')
  @ApiOperation({ summary: 'Obtém os horários ocupados e livres das salas.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Retorna a lista de horários de cada sala, indicando se estão livres ou ocupados.',
  })
  async getHorariosSalas() {
    return this.professorService.getHorariosSalas();
  }
}
