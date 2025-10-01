import { questions } from './quizQuestions';

export function calculateMatches(answers, breeds) {
  const scores = breeds.map(breed => {
    let score = 0;
    let maxScore = 0;

    Object.keys(answers).forEach(questionIndex => {
      const question = questions[questionIndex];
      const selectedOption = question.options.find(opt => opt.value === answers[questionIndex]);

      if (selectedOption && selectedOption.weight) {
        Object.keys(selectedOption.weight).forEach(trait => {
          if (trait === 'indoor') {
            // Indoor preference (1 = must be indoor)
            const weight = selectedOption.weight[trait];
            if (weight === 1 && breed.indoor === 1) {
              score += 10;
            } else if (weight === 0 && breed.indoor === 0) {
              score += 5;
            } else if (weight === 0.5) {
              score += 5; // neutral
            }
            maxScore += 10;
          } else if (trait === 'lap') {
            // Lap preference
            if (selectedOption.weight[trait] === 1 && breed.lap === 1) {
              score += 8;
            }
            maxScore += 8;
          } else if (trait === 'origin') {
            // Origin preference
            const preferredOrigins = selectedOption.weight[trait];
            if (preferredOrigins.includes(breed.origin)) {
              score += 15;
            }
            maxScore += 15;
          } else {
            // Numeric traits (1-5 scale)
            const userPreference = selectedOption.weight[trait];
            const breedValue = breed[trait] || 0;

            // Calculate similarity (closer = better)
            const difference = Math.abs(userPreference - breedValue);
            const similarity = 5 - difference; // 0-5 scale
            const points = (similarity / 5) * 10; // Convert to 0-10 scale

            score += points;
            maxScore += 10;
          }
        });
      }
    });

    // Calculate percentage
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return {
      breed,
      score,
      maxScore,
      percentage: Math.min(percentage, 100) // Cap at 100%
    };
  });

  // Sort by score descending and return top 3
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function getMatchReasons(answers, breed) {
  const reasons = [];

  Object.keys(answers).forEach(questionIndex => {
    const question = questions[questionIndex];
    const selectedOption = question.options.find(opt => opt.value === answers[questionIndex]);

    if (!selectedOption || !selectedOption.weight) return;

    // Check for strong matches
    Object.keys(selectedOption.weight).forEach(trait => {
      if (trait === 'energy_level' && selectedOption.weight[trait] >= 4 && breed.energy_level >= 4) {
        reasons.push({
          icon: '⚡',
          text: 'Alto nível de energia combina com seu estilo ativo'
        });
      } else if (trait === 'affection_level' && selectedOption.weight[trait] >= 4 && breed.affection_level >= 4) {
        reasons.push({
          icon: '❤️',
          text: 'Muito carinhoso, perfeito para quem adora atenção'
        });
      } else if (trait === 'child_friendly' && selectedOption.weight[trait] >= 4 && breed.child_friendly >= 4) {
        reasons.push({
          icon: '👶',
          text: 'Excelente com crianças'
        });
      } else if (trait === 'dog_friendly' && selectedOption.weight[trait] >= 4 && breed.dog_friendly >= 4) {
        reasons.push({
          icon: '🐕',
          text: 'Convive muito bem com cachorros'
        });
      } else if (trait === 'adaptability' && selectedOption.weight[trait] >= 4 && breed.adaptability >= 4) {
        reasons.push({
          icon: '🔄',
          text: 'Altamente adaptável a diferentes ambientes'
        });
      } else if (trait === 'indoor' && selectedOption.weight[trait] === 1 && breed.indoor === 1) {
        reasons.push({
          icon: '🏠',
          text: 'Ideal para ambientes internos'
        });
      } else if (trait === 'grooming' && selectedOption.weight[trait] <= 2 && breed.grooming <= 2) {
        reasons.push({
          icon: '✨',
          text: 'Baixa manutenção de pelagem'
        });
      } else if (trait === 'intelligence' && breed.intelligence >= 4) {
        reasons.push({
          icon: '🧠',
          text: 'Muito inteligente e fácil de treinar'
        });
      }
    });
  });

  // Remove duplicates and limit to 4 reasons
  const uniqueReasons = reasons.filter((reason, index, self) =>
    index === self.findIndex((r) => r.text === reason.text)
  );

  return uniqueReasons.slice(0, 4);
}
