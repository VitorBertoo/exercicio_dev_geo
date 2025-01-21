const customMessage = (field: string) => {
  return {
    "string.empty": `O campo ${field} não pode ser vazio!`,
    "number.min": `O campo ${field} deve ser maior ou igual a {#limit}!`,
    "any.required": `O campo ${field} é obrigatório!`,
    "string.min": `O campo ${field} deve ter no mínimo {#limit} caracteres!`,
    "string.max": `O campo ${field} deve ter no máximo {#limit} caracteres!`,
    "string.email": `O campo ${field} deve ser um endereço de e-mail válido!`,
    "string.length": `O campo ${field} deve ter exatamente {#limit} caracteres!`,
    "string.pattern.base": `O campo ${field} tem caracteres inválidos!`,
    "string.guid": `O campo ${field} deve ser um UUID válido!`,
    "date.format": `O campo ${field} deve estar no formato de data correto!`,
    "date.min": `A ${field} não pode ser menor que a data atual!`
  };
};

export { customMessage };
