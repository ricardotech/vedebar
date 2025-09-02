"use client";

import React from "react";

interface ReservationModalProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
  imageScrollRef: React.RefObject<HTMLDivElement | null>;
  isModalOpen: boolean;
  onClose: () => void;
  modalImages: string[];
}

export default function ReservationModal({
  modalRef,
  modalContentRef,
  imageScrollRef,
  isModalOpen,
  onClose,
  modalImages,
}: ReservationModalProps) {
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
          {/* Event Booking Form */}
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nome do Responsável</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Empresa/Organização</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                  placeholder="Nome da empresa (opcional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipo de Evento</label>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                <option value="">Selecione o tipo de evento</option>
                <option value="corporate">Evento Corporativo</option>
                <option value="birthday">Aniversário</option>
                <option value="wedding">Casamento/Noivado</option>
                <option value="networking">Networking</option>
                <option value="launch">Lançamento de Produto</option>
                <option value="celebration">Confraternização</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Data do Evento</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Horário Início</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Duração</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                  <option value="">Duração estimada</option>
                  <option value="2">2 horas</option>
                  <option value="3">3 horas</option>
                  <option value="4">4 horas</option>
                  <option value="5">5 horas</option>
                  <option value="6+">6+ horas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Número de Convidados</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                  <option value="">Quantos convidados?</option>
                  <option value="10-20">10-20 pessoas</option>
                  <option value="21-30">21-30 pessoas</option>
                  <option value="31-50">31-50 pessoas</option>
                  <option value="51-80">51-80 pessoas</option>
                  <option value="80+">Mais de 80 pessoas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Área Preferida</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                  <option value="">Escolha a área</option>
                  <option value="full-bar">Bar Completo</option>
                  <option value="main-floor">Salão Principal</option>
                  <option value="private-room">Sala Privativa</option>
                  <option value="terrace">Terraço</option>
                  <option value="mixed">Áreas Mistas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Orçamento Estimado</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                  <option value="">Faixa de orçamento</option>
                  <option value="2000-5000">R$ 2.000 - R$ 5.000</option>
                  <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                  <option value="10000-20000">R$ 10.000 - R$ 20.000</option>
                  <option value="20000+">Acima de R$ 20.000</option>
                  <option value="discuss">Preferível discutir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Serviço de Catering</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300">
                  <option value="">Necessita catering?</option>
                  <option value="full-meal">Refeição Completa</option>
                  <option value="appetizers">Petiscos/Aperitivos</option>
                  <option value="drinks-only">Apenas Bebidas</option>
                  <option value="external">Catering Externo</option>
                  <option value="discuss">A Discutir</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Detalhes do Evento & Necessidades Especiais</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring-bar-green focus-ring-bar-green focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Descreva seu evento, necessidades especiais (decoração, som, iluminação, equipamentos), preferências musicais, restrições alimentares dos convidados, ou qualquer outro detalhe importante..."
              />
            </div>

            {/* Additional spacing before footer */}
            <div className="h-4"></div>
          </form>
        </div>

        {/* Static Footer */}
        <div className="flex-shrink-0 p-8 pt-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent">
          <div className="text-center">
            <button
              type="submit"
              className="text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--bar-green)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bar-green-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bar-green)')}
            >
              Solicitar Orçamento
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Retornaremos em até 24 horas com uma proposta personalizada
            </p>
          </div>
        </div>
      </div>
    </div>
      );
} 