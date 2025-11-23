import React from "react";
import { useProductsQuery } from "@/hooks/useProducts";

export default function AdminPanel() {
  const { data: products = [], isLoading, error } = useProductsQuery();

  const renderStatus = () => {
    if (isLoading) {
      return (
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={`skeleton-${idx}`} className="animate-pulse border-b last:border-none">
              {Array.from({ length: 8 }).map((_, cellIdx) => (
                <td key={cellIdx} className="px-4 py-4">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    if (error) {
      return (
        <tbody>
          <tr>
            <td colSpan={8} className="px-4 py-6 text-center text-red-600 font-medium">
              No se pudo cargar el catálogo. Revisa la conexión con Supabase e intenta nuevamente.
            </td>
          </tr>
        </tbody>
      );
    }

    if (products.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
              Aún no hay productos registrados en Supabase.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id} className="border-b last:border-none">
            <td className="px-4 py-2 font-mono text-sm">{prod.code || "-"}</td>
            <td className="px-4 py-2 font-semibold text-slate-900">{prod.name}</td>
            <td className="px-4 py-2">{prod.category.nombre}</td>
            <td className="px-4 py-2">{prod.presentation || "-"}</td>
            <td className="px-4 py-2 text-xs text-slate-500">{prod.slug}</td>
            <td className="px-4 py-2">
              {prod.imageUrl ? (
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-12 h-12 object-cover rounded border"
                />
              ) : (
                <span className="text-gray-400">Sin imagen</span>
              )}
            </td>
            <td className="px-4 py-2 text-sm text-slate-700">
              {prod.description || "Sin descripción"}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <button
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded mr-2 opacity-50 cursor-not-allowed"
                disabled
              >
                Editar
              </button>
              <button
                className="bg-red-200 text-red-700 px-3 py-1 rounded opacity-50 cursor-not-allowed"
                disabled
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white/90 shadow py-6 px-8 mb-8 rounded-b-xl">
        <h2 className="text-2xl font-bold text-blue-700">
          Panel administrativo – Productos Palasac
        </h2>
      </header>
      <main className="px-8 pb-12">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/95 rounded-xl shadow">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="px-4 py-2 text-left font-semibold">Código</th>
                <th className="px-4 py-2 text-left font-semibold">Nombre</th>
                <th className="px-4 py-2 text-left font-semibold">Categoría</th>
                <th className="px-4 py-2 text-left font-semibold">Presentación</th>
                <th className="px-4 py-2 text-left font-semibold">Slug</th>
                <th className="px-4 py-2 text-left font-semibold">Imagen</th>
                <th className="px-4 py-2 text-left font-semibold">Descripción</th>
                <th className="px-4 py-2 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            {renderStatus()}
          </table>
        </div>
      </main>
    </div>
  );
}
