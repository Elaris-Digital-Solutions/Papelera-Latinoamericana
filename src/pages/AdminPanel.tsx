import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCategoriesQuery, useProductsQuery } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { CatalogProduct, deleteProduct, updateProduct } from "@/services/products";

interface ProductFormState {
  name: string;
  code: string;
  presentation: string;
  description: string;
  categoryId: string;
  imageUrl: string;
}

const emptyFormState: ProductFormState = {
  name: "",
  code: "",
  presentation: "",
  description: "",
  categoryId: "",
  imageUrl: "",
};

export default function AdminPanel() {
  const { data: products = [], isLoading, error } = useProductsQuery();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategoriesQuery();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();
  const [signingOut, setSigningOut] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [formState, setFormState] = useState<ProductFormState>({ ...emptyFormState });
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ProductFormState }) =>
      updateProduct(id, {
        nombre: updates.name.trim(),
        codigo: updates.code.trim() || null,
        presentacion: updates.presentation.trim() || null,
        descripcion: updates.description.trim() || null,
        categoria_id: updates.categoryId,
        imagen_url: updates.imageUrl.trim() || null,
      }),
    onSuccess: () => {
      toast({ title: "Producto actualizado" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo guardar",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),
    onMutate: ({ id }) => {
      setPendingDeleteId(id);
    },
    onSuccess: (_data, { id }) => {
      toast({ title: "Producto eliminado" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo eliminar",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
    onSettled: () => setPendingDeleteId(null),
  });

  useEffect(() => {
    if (!editingProduct) {
      setFormState({ ...emptyFormState });
      return;
    }

    setFormState({
      name: editingProduct.name,
      code: editingProduct.code ?? "",
      presentation: editingProduct.presentation ?? "",
      description: editingProduct.description ?? "",
      categoryId: editingProduct.category.id,
      imageUrl: editingProduct.imageUrl ?? "",
    });
  }, [editingProduct]);

  const disableSave = useMemo(() => {
    if (!editingProduct) return true;
    return (
      !formState.name.trim() ||
      !formState.categoryId ||
      updateMutation.isPending ||
      categoriesLoading ||
      Boolean(categoriesError)
    );
  }, [editingProduct, formState, updateMutation.isPending, categoriesLoading, categoriesError]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
      toast({ title: "Sesión cerrada" });
    } catch (err) {
      toast({
        title: "No se pudo cerrar sesión",
        description: err instanceof Error ? err.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    } finally {
      setSigningOut(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProduct) return;

    updateMutation.mutate({ id: editingProduct.id, updates: formState });
  };

  const handleDelete = (product: CatalogProduct) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;
    deleteMutation.mutate({ id: product.id });
  };

  const closeEditor = () => {
    if (updateMutation.isPending) return;
    setEditingProduct(null);
  };

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
                className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition disabled:opacity-50"
                onClick={() => setEditingProduct(prod)}
                disabled={updateMutation.isPending && editingProduct?.id === prod.id}
              >
                {updateMutation.isPending && editingProduct?.id === prod.id
                  ? "Guardando..."
                  : "Editar"}
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:opacity-50"
                onClick={() => handleDelete(prod)}
                disabled={pendingDeleteId === prod.id}
              >
                {pendingDeleteId === prod.id ? "Eliminando..." : "Eliminar"}
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-700">
              Panel administrativo – Productos Palasac
            </h2>
            <p className="text-sm text-blue-600 mt-1">
              Sesión iniciada como <span className="font-semibold">{user?.email ?? "Administrador"}</span>
            </p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="self-start inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
          >
            {signingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </div>
      </header>
      <main className="px-8 pb-12">
        {Boolean(categoriesError) && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            No se pudieron cargar las categorías. Intenta recargar la página o revisa la conexión con Supabase.
          </div>
        )}
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
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Editar producto</h3>
                <p className="text-sm text-slate-500">{editingProduct.name}</p>
              </div>
              <button
                onClick={closeEditor}
                className="text-slate-500 hover:text-slate-800"
                disabled={updateMutation.isPending}
              >
                ×
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Nombre
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Categoría
                <select
                  name="categoryId"
                  value={formState.categoryId}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                >
                  <option value="" disabled>
                    {categoriesLoading ? "Cargando categorías..." : "Selecciona una categoría"}
                  </option>
                  {Boolean(categoriesError) && (
                    <option value="" disabled>
                      Error al cargar categorías
                    </option>
                  )}
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Código
                  <input
                    type="text"
                    name="code"
                    value={formState.code}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Presentación
                  <input
                    type="text"
                    name="presentation"
                    value={formState.presentation}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Descripción
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                URL de imagen
                <input
                  type="url"
                  name="imageUrl"
                  value={formState.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="https://"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-md border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
                  disabled={updateMutation.isPending}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={disableSave}
                >
                  {updateMutation.isPending ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
