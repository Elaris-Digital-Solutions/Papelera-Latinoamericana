import React from "react";
import { products } from "../data/products";

export default function AdminPanel() {
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
            <tbody>
              {products.map((prod, idx) => (
                <tr key={prod.code || prod.slug || idx} className="border-b last:border-none">
                  <td className="px-4 py-2">{prod.code || "-"}</td>
                  <td className="px-4 py-2">{prod.name}</td>
                  <td className="px-4 py-2">{prod.category}</td>
                  <td className="px-4 py-2">{prod.presentation || "-"}</td>
                  <td className="px-4 py-2">{prod.slug}</td>
                  <td className="px-4 py-2">
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{prod.description}</td>
                  <td className="px-4 py-2">
                    {/* Placeholder para acciones futuras */}
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
          </table>
        </div>
      </main>
    </div>
  );
}
