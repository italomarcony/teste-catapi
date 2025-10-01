export const questions = [
  {
    id: 0,
    question: "Qual é o seu estilo de vida?",
    icon: "🏃",
    options: [
      {
        text: "Muito ativo - Adoro exercícios e atividades físicas",
        value: "very_active",
        weight: { energy_level: 5, adaptability: 4 }
      },
      {
        text: "Moderadamente ativo - Gosto de atividades mas também de relaxar",
        value: "moderate",
        weight: { energy_level: 3, adaptability: 5 }
      },
      {
        text: "Calmo - Prefiro atividades relaxantes em casa",
        value: "calm",
        weight: { energy_level: 1, adaptability: 3 }
      }
    ]
  },
  {
    id: 1,
    question: "Quanto espaço você tem disponível?",
    icon: "🏠",
    options: [
      {
        text: "Apartamento pequeno",
        value: "small",
        weight: { indoor: 1, adaptability: 5, energy_level: 2 }
      },
      {
        text: "Casa com quintal pequeno",
        value: "medium",
        weight: { indoor: 0.5, adaptability: 4, energy_level: 3 }
      },
      {
        text: "Casa grande com muito espaço externo",
        value: "large",
        weight: { indoor: 0, adaptability: 3, energy_level: 5 }
      }
    ]
  },
  {
    id: 2,
    question: "Quanto tempo você pode dedicar ao seu gato por dia?",
    icon: "⏰",
    options: [
      {
        text: "Muito tempo - Trabalho em casa ou tenho flexibilidade",
        value: "lots",
        weight: { social_needs: 5, affection_level: 5, grooming: 5 }
      },
      {
        text: "Tempo moderado - Algumas horas por dia",
        value: "moderate",
        weight: { social_needs: 3, affection_level: 3, grooming: 3 }
      },
      {
        text: "Pouco tempo - Trabalho fora o dia todo",
        value: "little",
        weight: { social_needs: 1, affection_level: 2, grooming: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "Qual é a sua experiência com gatos?",
    icon: "📚",
    options: [
      {
        text: "Nenhuma - Será meu primeiro gato",
        value: "none",
        weight: { adaptability: 5, intelligence: 3, grooming: 2 }
      },
      {
        text: "Alguma - Já tive ou convivi com gatos",
        value: "some",
        weight: { adaptability: 4, intelligence: 4, grooming: 3 }
      },
      {
        text: "Muita - Sou experiente com gatos",
        value: "lots",
        weight: { adaptability: 3, intelligence: 5, grooming: 5 }
      }
    ]
  },
  {
    id: 4,
    question: "Você tem crianças em casa?",
    icon: "👶",
    options: [
      {
        text: "Sim, crianças pequenas (0-5 anos)",
        value: "young",
        weight: { child_friendly: 5, adaptability: 5, energy_level: 3 }
      },
      {
        text: "Sim, crianças mais velhas (6+ anos)",
        value: "older",
        weight: { child_friendly: 4, adaptability: 4, energy_level: 4 }
      },
      {
        text: "Não tenho crianças",
        value: "none",
        weight: { child_friendly: 0 }
      }
    ]
  },
  {
    id: 5,
    question: "Você tem outros animais de estimação?",
    icon: "🐕",
    options: [
      {
        text: "Sim, tenho cachorro(s)",
        value: "dog",
        weight: { dog_friendly: 5, adaptability: 5, social_needs: 4 }
      },
      {
        text: "Sim, tenho outro(s) gato(s)",
        value: "cat",
        weight: { social_needs: 4, adaptability: 4, energy_level: 3 }
      },
      {
        text: "Não tenho outros pets",
        value: "none",
        weight: { dog_friendly: 0 }
      }
    ]
  },
  {
    id: 6,
    question: "Que tipo de personalidade você procura?",
    icon: "😸",
    options: [
      {
        text: "Carinhoso e grudento - Adora colo e atenção",
        value: "affectionate",
        weight: { affection_level: 5, social_needs: 5, lap: 1 }
      },
      {
        text: "Independente - Carinhoso mas valoriza seu espaço",
        value: "independent",
        weight: { affection_level: 3, social_needs: 2, adaptability: 5 }
      },
      {
        text: "Brincalhão e ativo - Cheio de energia",
        value: "playful",
        weight: { energy_level: 5, intelligence: 5, social_needs: 4 }
      }
    ]
  },
  {
    id: 7,
    question: "Qual o seu nível de tolerância com barulho?",
    icon: "🔊",
    options: [
      {
        text: "Alto - Não me importo com gatos vocais",
        value: "high",
        weight: { vocalisation: 5 }
      },
      {
        text: "Médio - Um pouco de miado é ok",
        value: "medium",
        weight: { vocalisation: 3 }
      },
      {
        text: "Baixo - Prefiro gatos silenciosos",
        value: "low",
        weight: { vocalisation: 1 }
      }
    ]
  },
  {
    id: 8,
    question: "Quanto você se importa com cuidados de pelagem?",
    icon: "✂️",
    options: [
      {
        text: "Não me importo - Posso escovar diariamente",
        value: "high",
        weight: { grooming: 5, shedding_level: 5 }
      },
      {
        text: "Moderado - Escovar algumas vezes por semana é ok",
        value: "medium",
        weight: { grooming: 3, shedding_level: 3 }
      },
      {
        text: "Prefiro baixa manutenção - Pouca escovação",
        value: "low",
        weight: { grooming: 1, shedding_level: 1 }
      }
    ]
  },
  {
    id: 9,
    question: "Você tem alguma preferência de origem?",
    icon: "🌍",
    options: [
      {
        text: "Raças asiáticas (Siamês, Persa, etc)",
        value: "asian",
        weight: { origin: ["Thailand", "Iran", "Burma", "China", "Japan", "Singapore"] }
      },
      {
        text: "Raças americanas (Maine Coon, American Shorthair, etc)",
        value: "american",
        weight: { origin: ["United States", "Canada"] }
      },
      {
        text: "Raças europeias (British, Russian Blue, etc)",
        value: "european",
        weight: { origin: ["United Kingdom", "Russia", "France", "Turkey", "Egypt"] }
      },
      {
        text: "Não tenho preferência",
        value: "none",
        weight: {}
      }
    ]
  }
];
