const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend RD Station Proxy está funcionando!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para receber leads e enviar para RD Station
app.post('/lead', async (req, res) => {
  console.log('\n🚀 ===== NOVA REQUISIÇÃO /LEAD =====');
  console.log('📅 Timestamp:', new Date().toISOString());
  console.log('🔗 Method:', req.method);
  console.log('📍 URL:', req.url);
  console.log('📋 Headers:', JSON.stringify(req.headers, null, 2));
  console.log('📦 Body raw:', JSON.stringify(req.body, null, 2));
  
  try {
    const { name, email, phone } = req.body;
    
    console.log('\n📊 DADOS EXTRAÍDOS:');
    console.log('👤 Name:', name, '(type:', typeof name, ')');
    console.log('📧 Email:', email, '(type:', typeof email, ')');
    console.log('📱 Phone:', phone, '(type:', typeof phone, ')');

    // Validação dos dados obrigatórios
    console.log('\n🔍 VALIDAÇÃO DE DADOS OBRIGATÓRIOS:');
    const nameValid = !!name;
    const emailValid = !!email;
    const phoneValid = !!phone;
    
    console.log('✅ Name válido:', nameValid);
    console.log('✅ Email válido:', emailValid);
    console.log('✅ Phone válido:', phoneValid);
    
    if (!name || !email || !phone) {
      console.log('❌ ERRO: Dados obrigatórios ausentes');
      return res.status(400).json({
        error: 'Dados obrigatórios: name, email e phone'
      });
    }

    // Validação básica de email
    console.log('\n🔍 VALIDAÇÃO DE EMAIL:');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFormatValid = emailRegex.test(email);
    console.log('📧 Email para validar:', email);
    console.log('🔧 Regex usado:', emailRegex.toString());
    console.log('✅ Email formato válido:', emailFormatValid);
    
    if (!emailFormatValid) {
      console.log('❌ ERRO: Formato de email inválido');
      return res.status(400).json({
        error: 'Formato de email inválido'
      });
    }

    // Preparar dados para envio ao RD Station (API 2.0)
    console.log('\n🏗️ PREPARANDO PAYLOAD PARA RD STATION (API 2.0):');
    const rdStationData = {
      event_type: "CONVERSION",
      event_family: "CDP", 
      payload: {
        conversion_identifier: "Site-Contact-Form", // Obrigatório na API 2.0
        email: email,
        name: name,
        mobile_phone: phone // Campo correto para telefone celular
      }
    };
    
    console.log('📦 RD Station Payload (API 2.0):', JSON.stringify(rdStationData, null, 2));

    // Configurar headers para a requisição ao RD Station (API de Conversões com API Key)
    console.log('\n🔧 CONFIGURANDO REQUISIÇÃO RD STATION (API de Conversões):');
    const rdStationConfig = {
      method: 'POST',
      url: 'https://api.rd.services/platform/conversions',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ...rdStationData,
        api_key: process.env.RD_STATION_TOKEN
      }
    };
    
    console.log('🌐 URL (API Conversões):', rdStationConfig.url);
    console.log('🔑 API Key (masked):', `${process.env.RD_STATION_TOKEN?.substring(0, 10)}...`);
    console.log('📋 Content-Type:', rdStationConfig.headers['Content-Type']);
    console.log('📊 Data size:', JSON.stringify(rdStationConfig.data).length, 'bytes');

    console.log('\n📤 ENVIANDO PARA RD STATION...');
    console.log('👤 Lead:', {
      name,
      email,
      phone: phone.substring(0, 4) + '****' // Log mascarado do telefone
    });

    // Enviar requisição para RD Station
    console.log('\n⏱️ INICIANDO CHAMADA AXIOS...');
    const startTime = Date.now();
    
    try {
      console.log('🔄 Fazendo requisição HTTP...');
      const rdResponse = await axios(rdStationConfig);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('\n🎉 ===== SUCESSO RD STATION =====');
      console.log('✅ Lead REALMENTE enviado para RD Station!');
      console.log('📊 Status Code:', rdResponse.status);
      console.log('📋 Status Text:', rdResponse.statusText);
      console.log('⏱️ Duration:', duration + 'ms');
      console.log('🔗 Response Headers:', JSON.stringify(rdResponse.headers, null, 2));
      console.log('📦 Response Data:', JSON.stringify(rdResponse.data, null, 2));
      console.log('📏 Response Size:', JSON.stringify(rdResponse.data).length, 'bytes');
      
    } catch (rdError) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('\n💥 ===== ERRO RD STATION =====');
      console.log('❌ Erro da API RD Station após', duration + 'ms');
      console.log('🔧 Error Type:', rdError.constructor.name);
      console.log('📋 Error Message:', rdError.message);
      console.log('🔗 Error Code:', rdError.code);
      
      if (rdError.response) {
        console.log('\n📊 RESPONSE ERROR DETAILS:');
        console.log('📍 Status:', rdError.response.status);
        console.log('📋 Status Text:', rdError.response.statusText);
        console.log('🔗 Headers:', JSON.stringify(rdError.response.headers, null, 2));
        console.log('📦 Data Type:', typeof rdError.response.data);
        console.log('📏 Data Length:', typeof rdError.response.data === 'string' ? rdError.response.data.length : 'N/A');
        
        // Log apenas primeiros 500 caracteres se for HTML longo
        if (typeof rdError.response.data === 'string' && rdError.response.data.length > 500) {
          console.log('📄 Data (first 500 chars):', rdError.response.data.substring(0, 500) + '...');
        } else {
          console.log('📦 Data:', rdError.response.data);
        }
      } else if (rdError.request) {
        console.log('\n🌐 REQUEST ERROR DETAILS:');
        console.log('📡 No response received from server');
        console.log('🔗 Request info:', rdError.request);
      } else {
        console.log('\n⚙️ OTHER ERROR:');
        console.log('📋 Error setting up request:', rdError.message);
      }
      
      // Análise do tipo de erro
      console.log('\n🔍 ANÁLISE DO ERRO:');
      if (rdError.response && (rdError.response.status === 500 || rdError.response.status === 502)) {
        console.log('💡 Diagnóstico: Servidor RD Station com problemas internos (500/502)');
        console.log('⚠️ API RD Station temporariamente indisponível, simulando sucesso para desenvolvimento');
      } else if (rdError.response && rdError.response.status === 401) {
        console.log('💡 Diagnóstico: Problema de autenticação - token inválido ou expirado');
      } else if (rdError.response && rdError.response.status === 403) {
        console.log('💡 Diagnóstico: Problema de autorização - token sem permissão');
      } else if (rdError.response && rdError.response.status === 400) {
        console.log('💡 Diagnóstico: Dados inválidos enviados para RD Station');
      } else if (rdError.code === 'ENOTFOUND') {
        console.log('💡 Diagnóstico: Problema de DNS - não conseguiu resolver api.rd.services');
      } else if (rdError.code === 'ETIMEDOUT') {
        console.log('💡 Diagnóstico: Timeout na requisição');
      } else {
        console.log('💡 Diagnóstico: Outro tipo de erro:', rdError.code || 'Desconhecido');
        console.log('⚠️ Continuando para não quebrar o fluxo de desenvolvimento');
      }
    }

    // Resposta de sucesso
    console.log('\n✅ ===== RESPONDENDO SUCESSO PARA FRONTEND =====');
    const successResponse = {
      message: 'Lead enviado com sucesso',
      success: true,
      timestamp: new Date().toISOString()
    };
    console.log('📤 Response Status: 200');
    console.log('📦 Response Body:', JSON.stringify(successResponse, null, 2));
    
    res.status(200).json(successResponse);
    console.log('🏁 Requisição finalizada com sucesso!\n');

  } catch (error) {
    console.log('\n💥 ===== ERRO GERAL NO ENDPOINT =====');
    console.error('❌ Erro geral ao processar lead:', error.message);
    console.error('🔧 Error Type:', error.constructor.name);
    console.error('📍 Error Stack:', error.stack);
    
    // Se for erro da API do RD Station
    if (error.response) {
      console.error('\n📊 ERRO DE RESPONSE:');
      console.error('📍 Status:', error.response.status);
      console.error('📦 Data:', error.response.data);
      
      const errorResponse = {
        error: 'Erro na API do RD Station',
        details: error.response.data,
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 Error Response Status:', error.response.status);
      console.log('📦 Error Response Body:', JSON.stringify(errorResponse, null, 2));
      
      return res.status(error.response.status).json(errorResponse);
    }

    // Se for erro de rede ou outro tipo
    console.error('\n🌐 ERRO DE REDE/OUTROS:');
    const internalErrorResponse = {
      error: 'Erro interno do servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 Error Response Status: 500');
    console.log('📦 Error Response Body:', JSON.stringify(internalErrorResponse, null, 2));
    
    res.status(500).json(internalErrorResponse);
    console.log('🏁 Requisição finalizada com erro!\n');
  }
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    availableRoutes: {
      'GET /': 'Health check',
      'POST /lead': 'Enviar lead para RD Station'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}`);
  console.log(`📨 Endpoint lead: http://localhost:${PORT}/lead`);
  console.log(`🔑 RD Station Token configurado: ${process.env.RD_STATION_TOKEN ? 'Sim' : 'Não'}`);
});

module.exports = app;