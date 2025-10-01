/**
 * Traduções PT-BR para características de gatos
 */

export const breedCharacteristics = {
  // Características principais
  'affection_level': 'Nível de Afeto',
  'energy_level': 'Nível de Energia',
  'intelligence': 'Inteligência',
  'social_needs': 'Necessidades Sociais',
  'adaptability': 'Adaptabilidade',
  'child_friendly': 'Amigável com Crianças',
  'dog_friendly': 'Amigável com Cães',
  'grooming': 'Cuidados/Grooming',
  'health_issues': 'Problemas de Saúde',
  'shedding_level': 'Nível de Queda de Pelo',
  'vocalisation': 'Vocalização',
  'stranger_friendly': 'Amigável com Estranhos',
  'indoor': 'Interno',
  'rare': 'Raro',
  'experimental': 'Experimental',
  'hairless': 'Sem Pelo',
  'natural': 'Natural',
  'rex': 'Rex',
  'suppressed_tail': 'Cauda Suprimida',
  'short_legs': 'Pernas Curtas',
  'hypoallergenic': 'Hipoalergênico',
  'lap': 'Gato de Colo',

  // Nomes curtos para labels
  'Affection': 'Afeto',
  'Energy': 'Energia',
  'Intelligence': 'Inteligência',
  'Social': 'Social',
  'Adaptability': 'Adaptação',
  'Child Friendly': 'C/ Crianças',
  'Dog Friendly': 'C/ Cães',
  'Grooming': 'Cuidados',
  'Health': 'Saúde',
  'Shedding': 'Queda de Pelo',
  'Vocalisation': 'Vocalização',
  'Stranger Friendly': 'C/ Estranhos',

  // Informações adicionais
  'origin': 'Origem',
  'life_span': 'Expectativa de Vida',
  'weight': 'Peso',
  'temperament': 'Temperamento',
  'description': 'Descrição',

  // Valores
  'Low': 'Baixo',
  'Medium': 'Médio',
  'High': 'Alto',
  'Very High': 'Muito Alto',
  'Yes': 'Sim',
  'No': 'Não',

  // Unidades
  'years': 'anos',
  'kg': 'kg',
  'lbs': 'libras',

  // Textos do card
  'View Details': 'Ver Detalhes',
  'Compare': 'Comparar',
  'Add to Compare': 'Adicionar à Comparação',
  'Remove from Compare': 'Remover da Comparação',

  // Filtros
  'All': 'Todos',
  'Search breeds...': 'Buscar raças...',
  'Filter by origin': 'Filtrar por origem',
  'Sort by': 'Ordenar por',
  'Name (A-Z)': 'Nome (A-Z)',
  'Name (Z-A)': 'Nome (Z-A)',
  'Most Affectionate': 'Mais Afetuoso',
  'Most Intelligent': 'Mais Inteligente',
  'Most Energetic': 'Mais Energético',
  'Most Adaptable': 'Mais Adaptável',

  // Modal
  'Characteristics': 'Características',
  'Additional Information': 'Informações Adicionais',
  'Share this breed': 'Compartilhar esta raça',
  'Close': 'Fechar',
  'Previous': 'Anterior',
  'Next': 'Próximo',

  // Comparação
  'Select breeds to compare': 'Selecione raças para comparar',
  'Compare up to 3 breeds': 'Compare até 3 raças',
  'Comparison': 'Comparação',
  'Breed 1': 'Raça 1',
  'Breed 2': 'Raça 2',
  'Breed 3': 'Raça 3',
  'Select a breed': 'Selecione uma raça',
  'Remove': 'Remover',
  'Clear All': 'Limpar Tudo',

  // Gráficos
  'Chart Title': 'Título do Gráfico',
  'breeds': 'raças',
  'breed': 'raça',
  'Total': 'Total',
  'Average': 'Média',
  'Distribution': 'Distribuição',
  'Analysis': 'Análise',
};

/**
 * Função para traduzir texto
 */
export function translate(key, defaultValue = key) {
  return breedCharacteristics[key] || defaultValue;
}

/**
 * Função para traduzir nível (1-5)
 */
export function translateLevel(level) {
  const levels = {
    0: 'Nenhum',
    1: 'Muito Baixo',
    2: 'Baixo',
    3: 'Médio',
    4: 'Alto',
    5: 'Muito Alto'
  };
  return levels[level] || level;
}

/**
 * Função para traduzir booleano
 */
export function translateBoolean(value) {
  return value ? 'Sim' : 'Não';
}

/**
 * Função para formatar peso
 */
export function formatWeight(weightObj) {
  if (!weightObj) return 'N/A';
  const { metric, imperial } = weightObj;
  if (metric) return `${metric} kg`;
  if (imperial) return `${imperial} lbs`;
  return 'N/A';
}

/**
 * Função para formatar expectativa de vida
 */
export function formatLifeSpan(lifeSpan) {
  if (!lifeSpan) return 'N/A';
  return `${lifeSpan} anos`;
}

/**
 * Traduções de descrições de raças (principais raças)
 */
export const breedDescriptions = {
  'Abyssinian': 'O Abissínio é uma raça antiga e elegante, conhecida por sua pelagem única com padrão "ticked" e personalidade extremamente ativa e curiosa. São gatos muito inteligentes, brincalhões e que adoram interagir com seus tutores.',
  'Aegean': 'O Gato do Egeu é uma raça natural da Grécia, conhecida por sua habilidade de pesca e amor pela água. São gatos sociáveis, inteligentes e se adaptam bem à vida em família.',
  'American Bobtail': 'O American Bobtail é conhecido por sua cauda curta característica e aparência selvagem. São gatos afetuosos, inteligentes e brincalhões, com personalidade comparável à de cães.',
  'American Curl': 'Reconhecido por suas orelhas únicas que se curvam para trás, o American Curl é um gato afetuoso, brincalhão e adaptável. Mantém comportamento de filhote por toda a vida.',
  'American Shorthair': 'Uma das raças mais populares, o American Shorthair é robusto, saudável e de temperamento equilibrado. São excelentes gatos de família, adaptáveis e independentes.',
  'Arabian Mau': 'O Arabian Mau é uma raça natural do deserto árabe. São gatos atléticos, devotados à família e muito vocais. Adaptam-se bem a climas quentes.',
  'Bengal': 'Com aparência de leopardo miniatura, o Bengal é extremamente ativo, inteligente e atlético. Adora água, é muito vocal e precisa de bastante estimulação mental e física.',
  'Birman': 'O Birman, ou "Gato Sagrado da Birmânia", é conhecido por seus olhos azuis profundos e pelagem colorpoint. São gatos gentis, afetuosos e equilibrados.',
  'British Shorthair': 'Robusto e com rosto arredondado característico, o British Shorthair é calmo, independente e afetuoso. É uma das raças mais antigas e populares da Inglaterra.',
  'Maine Coon': 'Uma das maiores raças domésticas, o Maine Coon é gentil, sociável e inteligente. Conhecido como "gigante gentil", adora água e é excelente caçador.',
  'Persian': 'O Persa é famoso por sua pelagem longa e luxuosa e face achatada. São gatos calmos, dóceis e que preferem ambientes tranquilos. Requerem escovação diária.',
  'Ragdoll': 'O Ragdoll relaxa completamente quando segurado, daí seu nome. São gatos extremamente dóceis, afetuosos e calmos, ideais para famílias e apartamentos.',
  'Siamese': 'O Siamês é uma das raças mais antigas e reconhecíveis. Extremamente vocal, inteligente e social, forma laços fortes com seus tutores e exige bastante atenção.',
  'Sphynx': 'Conhecido por não ter pelos, o Sphynx é energético, afetuoso e busca calor constantemente. Requer cuidados especiais com a pele e é muito sociável.',
  'Scottish Fold': 'Reconhecido por suas orelhas dobradas características, o Scottish Fold é gentil, adaptável e afetuoso. Adora companhia e se dá bem com crianças e outros pets.',
  'Russian Blue': 'Com pelagem azul-acinzentada única e olhos verdes vibrantes, o Russian Blue é reservado com estranhos mas extremamente leal à família. Inteligente e brincalhão.',
  'Norwegian Forest': 'Raça natural da Noruega, adaptada ao frio com pelagem espessa e impermeável. São gatos grandes, atléticos, inteligentes e independentes, mas afetuosos.',
  'Exotic Shorthair': 'Basicamente um "Persa de pelo curto", o Exotic Shorthair tem a mesma face achatada e temperamento calmo, mas com pelagem mais fácil de cuidar.',
  'Devon Rex': 'Com aparência élfica e pelagem ondulada, o Devon Rex é extremamente brincalhão, inteligente e afetuoso. Adora ficar em lugares altos e no colo.',
  'Turkish Angora': 'Raça antiga da Turquia, conhecida por sua pelagem sedosa e muitas vezes olhos de cores diferentes. São ativos, inteligentes e gostam de ser o centro das atenções.',
};

/**
 * Função para traduzir descrição de raça
 */
export function translateDescription(breedName, originalDescription) {
  // Retorna tradução se existir, senão retorna a descrição original
  return breedDescriptions[breedName] || originalDescription;
}
