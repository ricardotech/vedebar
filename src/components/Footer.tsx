"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
              VEDÊ
            </h3>
            <p className="text-white/70 leading-relaxed">
              Coquetelaria & Arte com alma brasileira. Uma experiência sensorial única onde cada drink conta uma história.
            </p>
          </div>


          {/* Social and Hours */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-1 text-white/70 text-sm">
              <p>(11) 97625-0998</p>
              <p>contato@vedebar.com.br</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2025 Vedê Bar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 