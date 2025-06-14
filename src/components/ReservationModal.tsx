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
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}
      onClick={onClose}
    >
      <div 
        ref={modalContentRef}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Static Header */}
        <div className="flex-shrink-0 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrolling Images */}
          <div className="h-32 overflow-hidden relative bg-gradient-to-r from-green-800 to-green-900">
            <div 
              ref={imageScrollRef}
              className="flex absolute top-0 left-0 h-full"
              style={{ width: '200%' }}
            >
              {[...modalImages, ...modalImages].map((image, index) => (
                <div key={index} className="h-32 w-32 flex-shrink-0 mx-2">
                  <img 
                    src={image} 
                    alt={`Drink ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Header Content */}
          <div className="p-8 pb-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Reserve sua Mesa
            </h2>
            <div className="w-16 h-1 bg-green-800 mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Garante sua experiência única no Vedê Bar. Preencha os dados abaixo e entraremos em contato.
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8">
          {/* Reservation Form */}
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pessoas</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300">
                  <option>1 pessoa</option>
                  <option>2 pessoas</option>
                  <option>3 pessoas</option>
                  <option>4 pessoas</option>
                  <option>5+ pessoas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Alguma preferência ou observação especial?"
              />
            </div>

            {/* Additional spacing before footer */}
            <div className="h-4"></div>
          </form>
        </div>

        {/* Static Footer */}
        <div className="flex-shrink-0 p-8 pt-4 bg-gradient-to-t from-white to-transparent">
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 