"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ReservationModalProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
  imageScrollRef: React.RefObject<HTMLDivElement | null>;
  isModalOpen: boolean;
  onClose: () => void;
  modalImages: string[];
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  duration: string;
  guests: string;
  area: string;
  budget: string;
  catering: string;
  details: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato de telefone inválido')
    .required('Telefone é obrigatório'),
  company: Yup.string(),
  eventType: Yup.string(),
  eventDate: Yup.string(),
  eventTime: Yup.string(),
  duration: Yup.string(),
  guests: Yup.string(),
  area: Yup.string(),
  budget: Yup.string(),
  catering: Yup.string(),
  details: Yup.string()
});

export default function ReservationModal({
  modalRef,
  modalContentRef,
  imageScrollRef,
  isModalOpen,
  onClose,
  modalImages,
}: ReservationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    duration: '',
    guests: '',
    area: '',
    budget: '',
    catering: '',
    details: ''
  };

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (formato brasileiro com DDD)
    const truncated = numbers.slice(0, 11);
    
    // Aplica a máscara (00) 00000-0000
    if (truncated.length <= 2) {
      return truncated;
    } else if (truncated.length <= 7) {
      return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
    } else {
      return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
    }
  };

  const sendToRDStation = async (leadData: { name: string; email: string; phone: string }) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';
      const response = await fetch(`${backendUrl}/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Lead enviado para RD Station:', result);
        return { success: true, data: result };
      } else {
        console.error('❌ Erro ao enviar lead:', result);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ Erro de rede:', error);
      return { success: false, error: 'Erro de conexão com o servidor' };
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Enviar para RD Station
      const rdResult = await sendToRDStation({
        name: values.name,
        email: values.email,
        phone: values.phone
      });

      if (rdResult.success) {
        setSubmitMessage('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.');
        
        // Fechar modal após 3 segundos
        setTimeout(() => {
          setSubmitMessage('');
          onClose();
        }, 3000);
      } else {
        setSubmitMessage(`Erro ao enviar: ${rdResult.error}`);
      }
    } catch (error) {
      setSubmitMessage('Erro interno. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4"
      style={{ 
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}
      onClick={onClose}
    >
      <div 
        ref={modalContentRef}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Static Header */}
        <div className="flex-shrink-0 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrolling Images */}
          <div className="h-32 overflow-hidden relative" style={{ background: `linear-gradient(to right, var(--bar-green), var(--bar-green-dark))` }}>
            <div 
              ref={imageScrollRef}
              className="flex absolute top-0 left-0 h-full"
              style={{ width: '200%' }}
            >
              {[...modalImages, ...modalImages].map((image, index) => (
                <div key={index} className="h-32 w-32 flex-shrink-0">
                  <img 
                    src={image} 
                    alt={`Drink ${index + 1}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Header Content */}
          <div className="p-8 pb-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Reserve o Bar para seu Evento
            </h2>
            <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: 'var(--bar-green)' }} />
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transforme o Vedê Bar no cenário perfeito para seu evento privado. Preencha os detalhes e criaremos uma experiência única.
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, touched, errors }) => (
              <Form className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nome do Responsável</label>
                    <Field
                      type="text"
                      name="name"
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus:border-transparent transition-all duration-300 ${
                        touched.name && errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Empresa/Organização</label>
                    <Field
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus:border-transparent transition-all duration-300"
                      placeholder="Nome da empresa (opcional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
                    <Field name="phone">
                      {({ field }: any) => (
                        <input
                          {...field}
                          type="tel"
                          value={field.value}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            setFieldValue('phone', formatted);
                          }}
                          className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus:border-transparent transition-all duration-300 ${
                            touched.phone && errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="(11) 99999-9999"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus:border-transparent transition-all duration-300 ${
                        touched.email && errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="seu@email.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipo de Evento</label>
                  <Field as="select" name="eventType" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                    <option value="">Selecione o tipo de evento</option>
                    <option value="corporate">Evento Corporativo</option>
                    <option value="birthday">Aniversário</option>
                    <option value="wedding">Casamento/Noivado</option>
                    <option value="networking">Networking</option>
                    <option value="launch">Lançamento de Produto</option>
                    <option value="celebration">Confraternização</option>
                    <option value="other">Outro</option>
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Data do Evento</label>
                    <Field
                      type="date"
                      name="eventDate"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Horário Início</label>
                    <Field
                      type="time"
                      name="eventTime"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Duração</label>
                    <Field as="select" name="duration" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                      <option value="">Duração estimada</option>
                      <option value="2">2 horas</option>
                      <option value="3">3 horas</option>
                      <option value="4">4 horas</option>
                      <option value="5">5 horas</option>
                      <option value="6+">6+ horas</option>
                    </Field>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Número de Convidados</label>
                    <Field as="select" name="guests" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                      <option value="">Quantos convidados?</option>
                      <option value="10-20">10-20 pessoas</option>
                      <option value="21-30">21-30 pessoas</option>
                      <option value="31-50">31-50 pessoas</option>
                      <option value="51-80">51-80 pessoas</option>
                      <option value="80+">Mais de 80 pessoas</option>
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Área Preferida</label>
                    <Field as="select" name="area" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                      <option value="">Escolha a área</option>
                      <option value="full-bar">Bar Completo</option>
                      <option value="main-floor">Salão Principal</option>
                      <option value="private-room">Sala Privativa</option>
                      <option value="terrace">Terraço</option>
                      <option value="mixed">Áreas Mistas</option>
                    </Field>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Orçamento Estimado</label>
                    <Field as="select" name="budget" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                      <option value="">Faixa de orçamento</option>
                      <option value="2000-5000">R$ 2.000 - R$ 5.000</option>
                      <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                      <option value="10000-20000">R$ 10.000 - R$ 20.000</option>
                      <option value="20000+">Acima de R$ 20.000</option>
                      <option value="discuss">Preferível discutir</option>
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Serviço de Catering</label>
                    <Field as="select" name="catering" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus:border-transparent transition-all duration-300">
                      <option value="">Necessita catering?</option>
                      <option value="full-meal">Refeição Completa</option>
                      <option value="appetizers">Petiscos/Aperitivos</option>
                      <option value="drinks-only">Apenas Bebidas</option>
                      <option value="external">Catering Externo</option>
                      <option value="discuss">A Discutir</option>
                    </Field>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Detalhes do Evento & Necessidades Especiais</label>
                  <Field
                    as="textarea"
                    rows={6}
                    name="details"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Descreva seu evento, necessidades especiais (decoração, som, iluminação, equipamentos), preferências musicais, restrições alimentares dos convidados, ou qualquer outro detalhe importante..."
                  />
                </div>

                {/* Submit Section */}
                <div className="text-center pt-8">
                  {submitMessage && (
                    <div className={`mb-4 p-3 rounded-lg ${submitMessage.includes('sucesso') ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                      {submitMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: 'var(--bar-green)' }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = 'var(--bar-green-dark)')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = 'var(--bar-green)')}
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    Retornaremos em até 24 horas com uma proposta personalizada
                  </p>
                </div>

                {/* Additional spacing before footer */}
                <div className="h-4"></div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Static Footer - Empty now since button moved inside form */}
        <div className="flex-shrink-0 p-8 pt-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent">
        </div>
      </div>
    </div>
  );
}