"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
              VEDÊ
            </h3>
            <p className="text-white/70 leading-relaxed">
              Coquetelaria & Arte com alma brasileira. Uma experiência sensorial única onde cada drink conta uma história.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-white/70">
              <p>Rua das Figueiras, 1206</p>
              <p>Santo André, SP - 09080-300</p>
              <p className="mt-4">
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  (11) 99999-9999
                </a>
              </p>
              <p>
                <a href="mailto:contato@vedebar.com" className="hover:text-white transition-colors">
                  contato@vedebar.com
                </a>
              </p>
            </div>
          </div>

          {/* Social and Hours */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Funcionamento</h4>
            <div className="space-y-1 text-white/70 text-sm">
              <p>Quarta e quinta: 18h - 23h</p>
              <p>Sexta: 18h - 01h</p>
              <p>Sábado: 16h - 01h</p>
              <p>Domingo: 15h - 21h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2024 Vedê Bar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 