import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabaseClient } from "@/services/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromState = (location.state as { from?: string } | null)?.from;

  useEffect(() => {
    if (!authLoading && session) {
      navigate(fromState || "/admin/panel", { replace: true });
    }
  }, [authLoading, session, navigate, fromState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales inválidas. Verifica tus datos.");
      setSubmitting(false);
      return;
    }

    navigate(fromState || "/admin/panel", { replace: true });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/Imagen_hero.png')" }}
    >
      {/* Overlay gradiente azul como en el hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10" />
      <div className="relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Panel Administrativo Palasac
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Validando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
