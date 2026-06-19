// Cronograma de Treino de Corrida - 12 Semanas
// Baseado no programa "Comece a Correr"

export const runningPlan = [
  // FASE 1 - OS PRIMEIROS 2KM
  {
    phase: 1,
    phaseName: "Fase 1 - Os Primeiros 2Km",
    week: 1,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "20 min (1 min CAM / 1 min CORRIDA)",
        description: "Aquecimento de 10 min + 10 séries de 1 min de caminhada e 1 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          // 10 sets of 1 min walk / 1 min run
          ...Array(10).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "7x (1 min CAM + 2 min CORRIDA)",
        description: "Aquecimento de 10 min + 7 séries de 1 min de caminhada e 2 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(7).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "6x (2 min CAM / 3 min CORRIDA)",
        description: "Aquecimento de 10 min + 6 séries de 2 min de caminhada e 3 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(6).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 1,
    phaseName: "Fase 1 - Os Primeiros 2Km",
    week: 2,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Mistura de Intervalos (1 min e 2 min)",
        description: "Aquecimento de 10 min + 3 séries de (1 min CAM / 1 min CORRIDA) + 3 séries de (2 min CAM / 2 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "7x (1 min CAM / 2 min CORRIDA)",
        description: "Aquecimento de 10 min + 7 séries de 1 min de caminhada e 2 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(7).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "6x (2 min CAM / 5 min CORRIDA)",
        description: "Aquecimento de 10 min + 6 séries de 2 min de caminhada e 5 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(6).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 300 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 1,
    phaseName: "Fase 1 - Os Primeiros 2Km",
    week: 3,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Mistura de Intervalos (1 min e 2 min)",
        description: "Aquecimento de 10 min + 3 séries de (1 min CAM / 1 min CORRIDA) + 3 séries de (2 min CAM / 2 min CORRIDA) + 10 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 600 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "5x (2 min CAM / 2 min CORRIDA)",
        description: "Aquecimento de 10 min + 5 séries de 2 min de caminhada e 2 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(5).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "3x (2 min CAM / 8 min CORRIDA)",
        description: "Aquecimento de 10 min + 3 séries de 2 min de caminhada e 8 min de corrida leve + 4 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 480 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 240 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 1,
    phaseName: "Fase 1 - Os Primeiros 2Km",
    week: 4,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "21 min (1 min CAM / 2 min CORRIDA)",
        description: "Aquecimento de 10 min + 7 séries de 1 min de caminhada e 2 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(7).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "5x (2 min CAM / 3 min CORRIDA)",
        description: "Aquecimento de 10 min + 5 séries de 2 min de caminhada e 3 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(5).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "🏆 DESAFIO CORRER 2KM",
        description: "Aquecimento de 10 min + Corrida contínua de 2km (meta completar sem caminhar) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          { type: "challenge", name: "DESAFIO 2KM CORRENDO", duration: 900, distanceGoal: "2 km" }, // standard 15 min for 2k
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },

  // FASE 2 - OS PRIMEIROS 3KM
  {
    phase: 2,
    phaseName: "Fase 2 - Os Primeiros 3Km",
    week: 5,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "30 min (1 min CAM / 3 min CORRIDA)",
        description: "Aquecimento de 10 min + 30 min alternando 1 min de caminhada e 3 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(7).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "walk", name: "Caminhada Moderada", duration: 60 },
          { type: "run", name: "Corrida Leve (Trote)", duration: 60 }, // 30 min active
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (2 min CAM / 3 min CORRIDA)",
        description: "Aquecimento de 10 min + 6 séries de 2 min de caminhada e 3 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(6).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "3x (2 min CAM / 8 min CORRIDA)",
        description: "Aquecimento de 10 min + 3 séries de 2 min de caminhada e 8 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 480 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 2,
    phaseName: "Fase 2 - Os Primeiros 3Km",
    week: 6,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Mistura de Intervalos (1 min e 3 min)",
        description: "Aquecimento de 10 min + 3x (2 min CAM / 1 min CORRIDA) + 3x (2 min CAM / 3 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (2 min CAM / 3 min CORRIDA)",
        description: "Aquecimento de 10 min + 6 séries de 2 min de caminhada e 3 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(6).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "3x (2 min CAM / 10 min CORRIDA)",
        description: "Aquecimento de 10 min + 3 séries de 2 min de caminhada e 10 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 600 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 2,
    phaseName: "Fase 2 - Os Primeiros 3Km",
    week: 7,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Mistura de Intervalos (1 min e 4 min)",
        description: "Aquecimento de 10 min + 3x (2 min CAM / 1 min CORRIDA) + 3x (2 min CAM / 4 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (2 min CAM / 4 min CORRIDA)",
        description: "Aquecimento de 10 min + 5 séries de 2 min de caminhada e 4 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(5).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "3x (2 min CAM / 10 min CORRIDA)",
        description: "Aquecimento de 10 min + 3 séries de 2 min de caminhada e 10 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(3).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 600 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 2,
    phaseName: "Fase 2 - Os Primeiros 3Km",
    week: 8,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Mistura Dinâmica de Intervalos",
        description: "Aquecimento de 10 min + 4x (2 min CAM / 1 min CORRIDA) + 4x (1 min CAM / 3 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 180 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (2 min CAM / 4 min CORRIDA)",
        description: "Aquecimento de 10 min + 5 séries de 2 min de caminhada e 4 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(5).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "🏆 DESAFIO CORRER 3KM",
        description: "Aquecimento de 10 min + Corrida contínua de 3km (meta completar sem caminhar) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          { type: "challenge", name: "DESAFIO 3KM CORRENDO", duration: 1320, distanceGoal: "3 km" }, // standard 22 min for 3k
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },

  // FASE 3 - DESAFIO 5KM
  {
    phase: 3,
    phaseName: "Fase 3 - Desafio 5Km",
    week: 9,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Intervalos Mistos (1 min e 4 min)",
        description: "Aquecimento de 10 min + 4x (2 min CAM / 1 min CORRIDA) + 4x (2 min CAM / 4 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 60 }
          ]),
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (1 min CAM / 5 min CORRIDA)",
        description: "Aquecimento de 10 min + 5 séries de 1 min de caminhada e 5 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(5).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 300 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "Trote Longo Fracionado (20 min + 10 min)",
        description: "Aquecimento de 5 min + 20 min de corrida leve + 5 min de caminhada para recuperar + 10 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          { type: "run", name: "Corrida Leve (Trote 1)", duration: 1200 },
          { type: "walk", name: "Caminhada de Recuperação", duration: 300 },
          { type: "run", name: "Corrida Leve (Trote 2)", duration: 600 },
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 3,
    phaseName: "Fase 3 - Desafio 5Km",
    week: 10,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "Intervalos Mistos (2 min e 4 min)",
        description: "Aquecimento de 10 min + 4x (2 min CAM / 2 min CORRIDA) + 4x (2 min CAM / 4 min CORRIDA) + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 120 }
          ]),
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "4x (1 min CAM / 8 min CORRIDA)",
        description: "Aquecimento de 5 min + 4 séries de 1 min de caminhada e 8 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 480 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "Trote Longo Fracionado (20 min + 12 min)",
        description: "Aquecimento de 5 min + 20 min de corrida leve + 3 min de caminhada para recuperar + 12 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          { type: "run", name: "Corrida Leve (Trote 1)", duration: 1200 },
          { type: "walk", name: "Caminhada de Recuperação", duration: 180 },
          { type: "run", name: "Corrida Leve (Trote 2)", duration: 720 },
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 3,
    phaseName: "Fase 3 - Desafio 5Km",
    week: 11,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "8x (2 min CAM / 4 min CORRIDA)",
        description: "Aquecimento de 10 min + 8 séries de 2 min de caminhada e 4 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(8).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 120 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "4x (1 min CAM / 8 min CORRIDA)",
        description: "Aquecimento de 10 min + 4 séries de 1 min de caminhada e 8 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(4).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 480 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "Trote Longo Fracionado (20 min + 15 min)",
        description: "Aquecimento de 5 min + 20 min de corrida leve + 5 min de caminhada para recuperar + 15 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          { type: "run", name: "Corrida Leve (Trote 1)", duration: 1200 },
          { type: "walk", name: "Caminhada de Recuperação", duration: 300 },
          { type: "run", name: "Corrida Leve (Trote 2)", duration: 900 },
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  },
  {
    phase: 3,
    phaseName: "Fase 3 - Desafio 5Km",
    week: 12,
    workouts: [
      {
        day: 1,
        dayName: "Segunda-feira",
        title: "8x (1 min CAM / 4 min CORRIDA)",
        description: "Aquecimento de 5 min + 8 séries de 1 min de caminhada e 4 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          ...Array(8).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 3,
        dayName: "Quarta-feira",
        title: "30 min (1 min CAM / 4 min CORRIDA)",
        description: "Aquecimento de 10 min + 6 séries de 1 min de caminhada e 4 min de corrida leve + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 600 },
          ...Array(6).fill(null).flatMap(() => [
            { type: "walk", name: "Caminhada Moderada", duration: 60 },
            { type: "run", name: "Corrida Leve (Trote)", duration: 240 }
          ]),
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      },
      {
        day: 6,
        dayName: "Sábado",
        title: "🏆 DESAFIO CORRER 5KM DIRETO",
        description: "Aquecimento de 5 min + Corrida contínua de 5km sem andar ou em uma prova! + 5 min de desaquecimento.",
        intervals: [
          { type: "warmup", name: "Aquecimento (Caminhada Leve)", duration: 300 },
          { type: "challenge", name: "DESAFIO FINAL: 5KM CORRENDO!", duration: 2100, distanceGoal: "5 km" }, // standard 35 min for 5k
          { type: "cooldown", name: "Desaquecimento", duration: 300 },
          { type: "stretch", name: "Alongamentos", duration: 0 }
        ]
      }
    ]
  }
];
