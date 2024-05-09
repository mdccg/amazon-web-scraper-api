enum Status {
  MALFORMATTED_REQUEST = 'Parâmetro query `keyword` ausente ou mal formatado',
  BLOCKED_REQUEST = 'Parece que a Amazon detectou atividade incomum e está temporariamente impedindo o acesso aos resultados da pesquisa. Por favor, espere um momento e tente novamente',
  GENERIC_ERROR = 'Oops! Parece que algo deu errado temporariamente. Não se preocupe, estamos trabalhando para resolver isso o mais rápido possível'
}

export default Status;