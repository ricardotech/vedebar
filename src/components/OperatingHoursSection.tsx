"use client";

import React from "react";

export default function OperatingHoursSection() {
  return (
    <section className="operating-hours-section py-32 bg-green-800/95 backdrop-blur-sm animated-section">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-12" style={{ fontFamily: "Georgia, serif" }}>
          Horário de Funcionamento
        </h2>
        <div className="w-16 h-1 bg-white mx-auto mb-12" />
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Vedê | Coquetelaria & Arte
            </h3>
            <p className="text-lg text-white/90 mb-6">
            </p>
            <div className="w-12 h-0.5 bg-white/50 mx-auto mb-6" />
            <p className="text-lg text-white/90 mb-6 font-medium">Quarta a domingo</p>
            
            <div className="space-y-3 text-white/90">
              <div className="flex justify-between items-center">
                <span className="font-medium">Quarta e quinta</span>
                <span>18h - 23h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Sexta</span>
                <span>18h - 01h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Sábado</span>
                <span>16h - 01h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Domingo</span>
                <span>15h - 21h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 