# Backend RD Station Marketing - Proxy API

Este é um backend Node.js com Express que funciona como proxy entre sua landing page e a API do RD Station Marketing.

## 🚀 Funcionalidades

- ✅ Recebe dados de formulário (nome, email, telefone)
- ✅ Valida os dados obrigatórios
- ✅ Envia dados para a API do RD Station
- ✅ Retorna resposta de sucesso ou erro
- ✅ Logs detalhados para debugging
- ✅ CORS habilitado para frontend
- ✅ Variáveis de ambiente para segurança

## 📦 Instalação

```bash
# Navegar para o diretório do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar o arquivo .env com suas credenciais
```

## ⚙️ Configuração

### Arquivo `.env`
```env
RD_STATION_ACCESS_TOKEN=sua_chave_api_aqui
PORT=3001
```

## 🏃 Como executar

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

O servidor será iniciado em: `http://localhost:3001`

## 📡 Endpoints

### GET `/`
Health check do servidor
- **Resposta**: Status do servidor

### POST `/lead`
Enviar lead para RD Station
- **Body**:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999"
}
```
- **Resposta de sucesso**:
```json
{
  "message": "Lead enviado com sucesso",
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🔗 Integração Frontend

### Exemplo JavaScript/Fetch
```javascript
async function enviarLead(dados) {
  try {
    const response = await fetch('http://localhost:3001/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Sucesso:', result);
    } else {
      console.error('❌ Erro:', result);
    }
  } catch (error) {
    console.error('❌ Erro de rede:', error);
  }
}

// Uso
enviarLead({
  name: "João Silva",
  email: "joao@email.com",
  phone: "(11) 99999-9999"
});
```

### Exemplo React
Veja o arquivo `frontend-example.js` para exemplos completos.

## 🛡️ Validações

### Backend
- ✅ Campos obrigatórios (name, email, phone)
- ✅ Formato de email válido
- ✅ Tratamento de erros da API RD Station

### Frontend (recomendado)
- ✅ Nome mínimo 2 caracteres
- ✅ Email formato válido
- ✅ Telefone mínimo 10 dígitos

## 📊 Logs

O servidor registra:
- ✅ Tentativas de envio de lead
- ✅ Sucessos e falhas
- ✅ Erros da API RD Station
- ✅ Dados mascarados para segurança

## 🔒 Segurança

- ✅ Token da API não exposto no frontend
- ✅ Variáveis de ambiente para credenciais
- ✅ Logs com dados sensíveis mascarados
- ✅ CORS configurado
- ✅ Validação de dados de entrada

## 🐛 Troubleshooting

### Erro 400 - Bad Request
- Verifique se todos os campos obrigatórios estão sendo enviados
- Verifique o formato do email

### Erro 401 - Unauthorized
- Verifique se o token da API RD Station está correto no `.env`

### Erro 500 - Internal Server Error
- Verifique os logs do servidor
- Verifique a conectividade com a API RD Station

## 📚 Documentação RD Station

- [API Conversions](https://developers.rdstation.com/pt-BR/reference/platform-api-conversions)
- [Autenticação](https://developers.rdstation.com/pt-BR/authentication)

## 🧪 Testando

### Teste manual via curl
```bash
curl -X POST http://localhost:3001/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "phone": "(11) 99999-9999"
  }'
```

### Health check
```bash
curl http://localhost:3001/
```