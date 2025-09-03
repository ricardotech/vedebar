// EXEMPLO DE USO NO FRONTEND
// Este arquivo mostra como usar o backend no seu frontend React/JavaScript

// 1. EXEMPLO BÁSICO COM FETCH API
async function enviarLead(dadosFormulario) {
  try {
    const response = await fetch('http://localhost:3001/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dadosFormulario.name,
        email: dadosFormulario.email,
        phone: dadosFormulario.phone
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Lead enviado com sucesso:', result);
      alert('Obrigado! Seus dados foram enviados com sucesso.');
      return { success: true, data: result };
    } else {
      console.error('❌ Erro ao enviar lead:', result);
      alert(`Erro: ${result.error}`);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error('❌ Erro de rede:', error);
    alert('Erro de conexão. Tente novamente.');
    return { success: false, error: error.message };
  }
}

// 2. EXEMPLO DE USO EM UM FORMULÁRIO HTML
const exemploFormularioHTML = `
<form id="leadForm">
  <input type="text" id="name" placeholder="Nome completo" required>
  <input type="email" id="email" placeholder="E-mail" required>
  <input type="tel" id="phone" placeholder="Telefone" required>
  <button type="submit">Enviar</button>
</form>

<script>
document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const dadosFormulario = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  
  const resultado = await enviarLead(dadosFormulario);
  
  if (resultado.success) {
    // Limpar formulário
    document.getElementById('leadForm').reset();
  }
});
</script>
`;

// 3. EXEMPLO PARA REACT
const exemploReact = `
import React, { useState } from 'react';

function FormularioLead() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Lead enviado com sucesso!');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        alert(\`Erro: \${result.error}\`);
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome completo"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-mail"
        required
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Telefone"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default FormularioLead;
`;

// 4. EXEMPLO COM VALIDAÇÃO AVANÇADA
async function enviarLeadComValidacao(dadosFormulario) {
  // Validações do frontend
  if (!dadosFormulario.name || dadosFormulario.name.trim().length < 2) {
    alert('Nome deve ter pelo menos 2 caracteres');
    return { success: false, error: 'Nome inválido' };
  }

  if (!dadosFormulario.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosFormulario.email)) {
    alert('E-mail inválido');
    return { success: false, error: 'E-mail inválido' };
  }

  if (!dadosFormulario.phone || dadosFormulario.phone.replace(/\D/g, '').length < 10) {
    alert('Telefone deve ter pelo menos 10 dígitos');
    return { success: false, error: 'Telefone inválido' };
  }

  return await enviarLead(dadosFormulario);
}

// 5. EXEMPLO DE TESTE MANUAL
// Para testar manualmente, abra o console do navegador e execute:
const testeManual = `
// Teste com dados válidos
enviarLead({
  name: "João Silva",
  email: "joao@email.com", 
  phone: "(11) 99999-9999"
});

// Teste com dados inválidos
enviarLead({
  name: "",
  email: "email-invalido",
  phone: "123"
});
`;

console.log('📋 Exemplos de uso do backend criados!');
console.log('💡 Veja o arquivo frontend-example.js para exemplos completos');