interface Subject {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  name: string;
  subjectId: number;
}

export const subjectList: Subject[] = [
  {
    id: 1,
    name: "Matemática",
  },
  {
    id: 2,
    name: "Português",
  },
  {
    id: 3,
    name: "História",
  },
  {
    id: 4,
    name: "Geografia",
  },
  {
    id: 5,
    name: "Biologia",
  },
  {
    id: 6,
    name: "Física",
  },
  {
    id: 7,
    name: "Química",
  },
  {
    id: 8,
    name: "Inglês",
  },
  {
    id: 9,
    name: "Espanhol",
  },
  {
    id: 10,
    name: "Filosofia",
  },
  {
    id: 11,
    name: "Sociologia",
  },
  {
    id: 12,
    name: "Artes",
  },
  {
    id: 13,
    name: "Educação Física",
  },
  {
    id: 14,
    name: "Ensino Religioso",
  },
]

export const topicList: Topic[] = [
  {
    id: 1,
    name: "Equações",
    subjectId: 1,
  },
  {
    id: 2,
    name: "Funções",
    subjectId: 1,
  },
  {
    id: 3,
    name: "Trigonometria",
    subjectId: 1,
  },
  {
    id: 4,
    name: "Geometria",
    subjectId: 1,
  },
  {
    id: 5,
    name: "Literatura",
    subjectId: 2,
  },
  {
    id: 6,
    name: "Gramática",
    subjectId: 2,
  },
  {
    id: 7,
    name: "Redação",
    subjectId: 2,
  },
  {
    id: 8,
    name: "Revolução Francesa",
    subjectId: 3,
  },
  {
    id: 9,
    name: "Revolução Industrial",
    subjectId: 3,
  },
  {
    id: 10,
    name: "Primeira Guerra Mundial",
    subjectId: 3,
  },
  {
    id: 11,
    name: "Segunda Guerra Mundial",
    subjectId: 3,
  },
  {
    id: 12,
    name: "Revolução Russa",
    subjectId: 3,
  },
  {
    id: 13,
    name: "Revolução Chinesa",
    subjectId: 3,
  },
  {
    id: 14,
    name: "Revolução Cubana",
    subjectId: 3,
  },
  {
    id: 15,
    name: "Revolução Americana",
    subjectId: 3,
  },
  {
    id: 16,
    name: "Revolução Haitiana",
    subjectId: 3,
  },
  {
    id: 17,
    name: "Revolução Boliviana",
    subjectId: 3,
  },
  {
    id: 18,
    name: "Revolução Mexicana",
    subjectId: 3,
  },
  {
    id: 19,
    name: "Revolução Inglesa",
    subjectId: 3,
  },
  {
    id: 20,
    name: "Revolução Portuguesa",
    subjectId: 3,
  },
  {
    id: 21,
    name: "Revolução Espanhola",
    subjectId: 3,
  },
  {
    id: 22,
    name: "Revolução Italiana",
    subjectId: 3,
  },
  {
    id: 23,
    name: "Revolução Alemã",
    subjectId: 3,
  },
  {
    id: 24,
    name: "Revolução Japonesa",
    subjectId: 3,
  },
  {
    id: 25,
    name: "Revolução Indiana",
    subjectId: 3,
  },
  {
    id: 26,
    name: "Revolução Sul-Africana",
    subjectId: 3,
  },
  {
    id: 27,
    name: "Revolução Australiana",
    subjectId: 3,
  },
  {
    id: 28,
    name: "Revolução Neozelandesa",
    subjectId: 3,
  },
  {
    id: 29,
    name: "Revolução Canadense",
    subjectId: 3,
  },
  {
    id: 30,
    name: "Revolução Americana",
    subjectId: 3,
  },
  {
    id: 31,
    name: "Revolução Argentina",
    subjectId: 3,
  },
  {
    id: 32,
    name: "Revolução Chilena",
    subjectId: 3,
  },
  {
    id: 33,
    name: "Revolução Peruana",
    subjectId: 3,
  },
  {
    id: 34,
    name: "Revolução Colombiana",
    subjectId: 3,
  },
  {
    id: 35,
    name: "Revolução Venezuelana",
    subjectId: 3,
  },
  {
    id: 36,
    name: "Revolução Equatoriana",
    subjectId: 3,
  },
  {
    id: 37,
    name: "Revolução Boliviana",
    subjectId: 3,
  },
]

export const flashcardList = [
  {
    id: 1,
    question: "Qual é a fórmula de Bhaskara?",
    answer: "x = (-b ± √Δ) / 2a",
    topicId: 1
  },
  {
    id: 2,
    question: "Qual é a fórmula da função afim?",
    answer: "f(x) = ax + b",
    topicId: 1
  },
  {
    id: 3,
    question: "Qual é a fórmula da função quadrática?",
    answer: "f(x) = ax² + bx + c",
    topicId: 1
  },
  {
    id: 4,
    question: "Qual é a fórmula da função exponencial?",
    answer: "f(x) = a^x",
    topicId: 1
  },
  {
    id: 5,
    question: "Qual é a fórmula da função logarítmica?",
    answer: "f(x) = loga(x)",
    topicId: 1
  },
  {
    id: 6,
    question: "Qual é a fórmula da função trigonométrica?",
    answer: "f(x) = sen(x), f(x) = cos(x), f(x) = tg(x)",
    topicId: 1
  },
  {
    id: 7,
    question: "Qual é a fórmula da função modular?",
    answer: "f(x) = |x|",
    topicId: 1
  },
  {
    id: 8,
    question: "Qual é a fórmula da função polinomial?",
    answer: "f(x) = a0 + a1x + a2x² + ... + anx^n",
    topicId: 1
  },
  {
    id: 9,
    question: "Qual é a fórmula da função racional?",
    answer: "f(x) = p(x) / q(x)",
    topicId: 1
  },
  {
    id: 10,
    question: "Qual é a fórmula da função irracional?",
    answer: "f(x) = √x",
    topicId: 1
  },
  {
    id: 11,
    question: "Qual é a fórmula da função trigonométrica?",
    answer: "f(x) = sen(x), f(x) = cos(x), f(x) = tg(x)",
    topicId: 1
  },
  {
    id: 12,
    question: "Qual é a fórmula da função trigonométrica?",
    answer: "f(x) = sen(x), f(x) = cos(x), f(x) = tg(x)",
    topicId: 1
  },
]