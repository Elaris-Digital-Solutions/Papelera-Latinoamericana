import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCategoriesQuery, useProductsQuery } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  CatalogProduct,
  CategoryRecord,
  CategoryCreateInput,
  CategoryUpdateInput,
  ProductCreateInput,
  ProductUpdateInput,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  findCategoryConflicts,
  findProductConflicts,
  updateCategory,
  updateProduct,
} from "@/services/products";
import { deleteCloudinaryAssetByUrl, uploadProductImage } from "@/services/cloudinary";
import { slugify } from "@/lib/utils";

interface ProductFormState {
  name: string;
  code: string;
  presentation: string;
  description: string;
  categoryId: string;
  imageUrl: string;
}

type EditorMode = "create" | "edit" | null;

const emptyFormState: ProductFormState = {
  name: "",
  code: "",
  presentation: "",
  description: "",
  categoryId: "",
  imageUrl: "",
};

type PanelTab = "products" | "categories";

interface CategoryFormState {
  name: string;
  slug: string;
}

type CategoryEditorMode = "create" | "edit" | null;

const emptyCategoryFormState: CategoryFormState = {
  name: "",
  slug: "",
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
  const [activeTab, setActiveTab] = useState<PanelTab>("products");
  const [editorMode, setEditorMode] = useState<EditorMode>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [formState, setFormState] = useState<ProductFormState>({ ...emptyFormState });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [categoryEditorMode, setCategoryEditorMode] = useState<CategoryEditorMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRecord | null>(null);
  const [categoryFormState, setCategoryFormState] = useState<CategoryFormState>({
    ...emptyCategoryFormState,
  });
  const [categorySlugEdited, setCategorySlugEdited] = useState(false);
  const [categoryPendingDeleteId, setCategoryPendingDeleteId] = useState<string | null>(null);

  const resetEditor = () => {
    setEditorMode(null);
    setSelectedProduct(null);
    setFormState({ ...emptyFormState });
    setImageFile(null);
  };

  const resetCategoryEditor = () => {
    setCategoryEditorMode(null);
    setSelectedCategory(null);
    setCategoryFormState({ ...emptyCategoryFormState });
    setCategorySlugEdited(false);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ProductUpdateInput }) =>
      updateProduct(id, updates),
    onSuccess: () => {
      toast({ title: "Producto actualizado" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetEditor();
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

  const createMutation = useMutation({
    mutationFn: (payload: ProductCreateInput) => createProduct(payload),
    onSuccess: () => {
      toast({ title: "Producto creado" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetEditor();
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo crear el producto",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, imageUrl }: { id: string; imageUrl?: string | null }) =>
      deleteProduct(id, imageUrl),
    onMutate: ({ id }) => {
      setPendingDeleteId(id);
    },
    onSuccess: (_data, { id }) => {
      toast({ title: "Producto eliminado" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (selectedProduct?.id === id) {
        resetEditor();
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

  const createCategoryMutation = useMutation({
    mutationFn: (payload: CategoryCreateInput) => createCategory(payload),
    onSuccess: () => {
      toast({ title: "Categoría creada" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetCategoryEditor();
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo crear la categoría",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: CategoryUpdateInput }) =>
      updateCategory(id, updates),
    onSuccess: () => {
      toast({ title: "Categoría actualizada" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetCategoryEditor();
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo actualizar la categoría",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteCategory(id),
    onMutate: ({ id }) => {
      setCategoryPendingDeleteId(id);
    },
    onSuccess: () => {
      toast({ title: "Categoría eliminada" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (selectedCategory?.id) {
        resetCategoryEditor();
      }
    },
    onError: (mutationError) => {
      toast({
        title: "No se pudo eliminar la categoría",
        description:
          mutationError instanceof Error ? mutationError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
    },
    onSettled: () => setCategoryPendingDeleteId(null),
  });

  useEffect(() => {
    if (editorMode === "edit" && selectedProduct) {
      setFormState({
        name: selectedProduct.name,
        code: selectedProduct.code ?? "",
        presentation: selectedProduct.presentation ?? "",
        description: selectedProduct.description ?? "",
        categoryId: selectedProduct.category.id,
        imageUrl: selectedProduct.imageUrl ?? "",
      });
      setImageFile(null);
      return;
    }

    if (editorMode === "create") {
      setFormState({ ...emptyFormState });
      setImageFile(null);
      return;
    }

    setFormState({ ...emptyFormState });
    setImageFile(null);
  }, [editorMode, selectedProduct]);

  useEffect(() => {
    if (categoryEditorMode === "edit" && selectedCategory) {
      setCategoryFormState({
        name: selectedCategory.nombre,
        slug: selectedCategory.slug,
      });
      setCategorySlugEdited(true);
      return;
    }

    if (categoryEditorMode === "create") {
      setCategoryFormState({ ...emptyCategoryFormState });
      setCategorySlugEdited(false);
      return;
    }

    setCategoryFormState({ ...emptyCategoryFormState });
    setCategorySlugEdited(false);
  }, [categoryEditorMode, selectedCategory]);

  const generatedSlug = useMemo(() => slugify(formState.name), [formState.name]);
  const generatedCategorySlug = useMemo(
    () => slugify(categoryFormState.name),
    [categoryFormState.name],
  );
  const isEditorOpen = editorMode !== null;
  const isCategoryModalOpen = categoryEditorMode !== null;
  const isSaving = isUploadingImage || updateMutation.isPending || createMutation.isPending;
  const isCategorySaving = updateCategoryMutation.isPending || createCategoryMutation.isPending;
  const categoryUsageCount = useMemo(() => {
    return products.reduce((acc, product) => {
      const categoryId = product.category.id;
      acc[categoryId] = (acc[categoryId] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [products]);

  useEffect(() => {
    if (!categoryEditorMode || categorySlugEdited) return;
    setCategoryFormState((prev) => {
      if (prev.slug === generatedCategorySlug) return prev;
      return { ...prev, slug: generatedCategorySlug };
    });
  }, [categoryEditorMode, categorySlugEdited, generatedCategorySlug]);

  const disableSave = useMemo(() => {
    if (!editorMode) return true;
    return (
      !formState.name.trim() ||
      !formState.categoryId ||
      categoriesLoading ||
      Boolean(categoriesError) ||
      isSaving
    );
  }, [editorMode, formState, categoriesLoading, categoriesError, isSaving]);

  const disableCategorySave = useMemo(() => {
    if (!categoryEditorMode) return true;
    return (
      !categoryFormState.name.trim() ||
      !categoryFormState.slug.trim() ||
      categoriesLoading ||
      Boolean(categoriesError) ||
      isCategorySaving
    );
  }, [categoryEditorMode, categoryFormState, categoriesLoading, categoriesError, isCategorySaving]);

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

  const ensureNoConflicts = async (params: {
    code: string | null;
    slug: string;
    excludeId?: string;
  }) => {
    try {
      const conflicts = await findProductConflicts(params);
      if (conflicts.length === 0) return true;

      const trimmedCode = params.code ?? undefined;
      const details = conflicts
        .map((conflict) => {
          const fields: string[] = [];
          if (trimmedCode && conflict.codigo === trimmedCode) {
            fields.push(`código ${conflict.codigo}`);
          }
          if (conflict.slug === params.slug) {
            fields.push(`slug ${conflict.slug}`);
          }
          return `${conflict.nombre} (${fields.join(" y ") || "duplicado"})`;
        })
        .join(" • ");

      toast({
        title: "Conflicto detectado",
        description:
          details || "Ya existe un producto con el mismo código o slug. Ajusta los valores e inténtalo nuevamente.",
        variant: "destructive",
      });
      return false;
    } catch (conflictError) {
      toast({
        title: "No se pudo validar duplicados",
        description:
          conflictError instanceof Error ? conflictError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
      return false;
    }
  };

  const ensureCategoryNoConflicts = async (params: {
    slug: string;
    nombre: string;
    excludeId?: string;
  }) => {
    try {
      const conflicts = await findCategoryConflicts(params);
      if (conflicts.length === 0) return true;

      const details = conflicts
        .map((conflict) => {
          const clashes: string[] = [];
          if (conflict.slug === params.slug) {
            clashes.push(`slug ${conflict.slug}`);
          }
          if (conflict.nombre === params.nombre) {
            clashes.push(`nombre ${conflict.nombre}`);
          }
          return `${conflict.nombre} (${clashes.join(" y ") || "duplicado"})`;
        })
        .join(" • ");

      toast({
        title: "Conflicto con la categoría",
        description:
          details || "Ya existe una categoría con el mismo nombre o slug. Ajusta los datos e inténtalo nuevamente.",
        variant: "destructive",
      });
      return false;
    } catch (conflictError) {
      toast({
        title: "No se pudo validar la categoría",
        description:
          conflictError instanceof Error ? conflictError.message : "Inténtalo nuevamente",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategoryFormState((prev) => ({
      ...prev,
      name: value,
      slug: categorySlugEdited ? prev.slug : slugify(value),
    }));
  };

  const handleCategorySlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategorySlugEdited(true);
    setCategoryFormState((prev) => ({ ...prev, slug: slugify(value) }));
  };

  const resetCategorySlug = () => {
    setCategorySlugEdited(false);
    setCategoryFormState((prev) => ({ ...prev, slug: generatedCategorySlug }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editorMode) return;

    const trimmedName = formState.name.trim();
    const trimmedCode = formState.code.trim();
    const slug = generatedSlug;

    const conflictsOk = await ensureNoConflicts({
      code: trimmedCode || null,
      slug,
      excludeId: editorMode === "edit" ? selectedProduct?.id : undefined,
    });

    if (!conflictsOk) return;

    let finalImageUrl = formState.imageUrl.trim() || null;
    const previousImageUrl = editorMode === "edit" ? selectedProduct?.imageUrl ?? null : null;
    let uploadedNewImage = false;

    if (imageFile) {
      try {
        setIsUploadingImage(true);
        finalImageUrl = await uploadProductImage(imageFile);
        uploadedNewImage = true;
      } catch (uploadError) {
        toast({
          title: "No se pudo subir la imagen",
          description: uploadError instanceof Error ? uploadError.message : "Inténtalo nuevamente",
          variant: "destructive",
        });
        return;
      } finally {
        setIsUploadingImage(false);
      }
    }

    const payload: ProductUpdateInput = {
      nombre: trimmedName,
      codigo: trimmedCode || null,
      presentacion: formState.presentation.trim() || null,
      descripcion: formState.description.trim() || null,
      categoria_id: formState.categoryId,
      imagen_url: finalImageUrl,
    };

    try {
      if (editorMode === "create") {
        await createMutation.mutateAsync({ ...payload, slug });
      } else if (selectedProduct) {
        await updateMutation.mutateAsync({ id: selectedProduct.id, updates: payload });
      }

      if (
        uploadedNewImage &&
        previousImageUrl &&
        finalImageUrl &&
        previousImageUrl.trim() !== finalImageUrl.trim()
      ) {
        try {
          await deleteCloudinaryAssetByUrl(previousImageUrl);
        } catch (deleteError) {
          toast({
            title: "Imagen anterior no eliminada",
            description:
              deleteError instanceof Error
                ? deleteError.message
                : "La imagen previa no pudo eliminarse de Cloudinary",
            variant: "destructive",
          });
        }
      }
    } catch (mutationError) {
      console.error(mutationError);
    }
  };

  const handleCategorySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!categoryEditorMode) return;

    const trimmedName = categoryFormState.name.trim();
    const requestedSlug = categoryFormState.slug.trim() || trimmedName;
    const normalizedSlug = slugify(requestedSlug);

    if (!trimmedName || !normalizedSlug) {
      toast({
        title: "Faltan datos",
        description: "Ingresa el nombre y asegurate de que el slug sea válido",
        variant: "destructive",
      });
      return;
    }

    const conflictsOk = await ensureCategoryNoConflicts({
      slug: normalizedSlug,
      nombre: trimmedName,
      excludeId: categoryEditorMode === "edit" ? selectedCategory?.id : undefined,
    });

    if (!conflictsOk) return;

    const payload: CategoryCreateInput = {
      nombre: trimmedName,
      slug: normalizedSlug,
    };

    try {
      if (categoryEditorMode === "create") {
        await createCategoryMutation.mutateAsync(payload);
      } else if (selectedCategory) {
        await updateCategoryMutation.mutateAsync({ id: selectedCategory.id, updates: payload });
      }
    } catch (mutationError) {
      console.error(mutationError);
    }
  };

  const handleDelete = (product: CatalogProduct) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;
    deleteMutation.mutate({ id: product.id, imageUrl: product.imageUrl });
  };

  const openCreateModal = () => {
    setEditorMode("create");
    setSelectedProduct(null);
  };

  const openEditModal = (product: CatalogProduct) => {
    setEditorMode("edit");
    setSelectedProduct(product);
  };

  const closeEditor = () => {
    if (isSaving) return;
    resetEditor();
  };

  const openCreateCategoryModal = () => {
    setCategoryEditorMode("create");
    setSelectedCategory(null);
    setCategorySlugEdited(false);
  };

  const openEditCategoryModal = (category: CategoryRecord) => {
    setCategoryEditorMode("edit");
    setSelectedCategory(category);
    setCategorySlugEdited(true);
  };

  const closeCategoryEditor = () => {
    if (isCategorySaving) return;
    resetCategoryEditor();
  };

  const handleDeleteCategory = (category: CategoryRecord) => {
    const usage = categoryUsageCount[category.id] ?? 0;
    if (usage > 0) {
      toast({
        title: "No se puede eliminar",
        description: `Reasigna o elimina los ${usage} producto(s) que pertenecen a esta categoría antes de eliminarla.`,
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la categoría "${category.nombre}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;
    deleteCategoryMutation.mutate({ id: category.id });
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
                onClick={() => openEditModal(prod)}
                disabled={isSaving && selectedProduct?.id === prod.id}
              >
                {isSaving && selectedProduct?.id === prod.id ? "Guardando..." : "Editar"}
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

  const renderCategoryRows = () => {
    if (categoriesLoading) {
      return (
        <tbody>
          {Array.from({ length: 4 }).map((_, idx) => (
            <tr key={`cat-skeleton-${idx}`} className="animate-pulse border-b last:border-none">
              {Array.from({ length: 4 }).map((__, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3">
                  <div className="h-4 w-full rounded bg-gray-200" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    if (categoriesError) {
      return (
        <tbody>
          <tr>
            <td colSpan={4} className="px-4 py-6 text-center text-red-600 font-medium">
              No se pudieron cargar las categorías. Recarga la página e intenta nuevamente.
            </td>
          </tr>
        </tbody>
      );
    }

    if (categories.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
              Aún no hay categorías registradas.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {categories.map((category) => {
          const usage = categoryUsageCount[category.id] ?? 0;
          const deleteDisabled = usage > 0 || categoryPendingDeleteId === category.id;
          return (
            <tr key={category.id} className="border-b last:border-none">
              <td className="px-4 py-2 font-semibold text-slate-900">{category.nombre}</td>
              <td className="px-4 py-2 font-mono text-sm text-slate-600">{category.slug}</td>
              <td className="px-4 py-2 text-sm text-slate-700">
                {usage > 0 ? `${usage} producto${usage === 1 ? "" : "s"}` : "Sin productos"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <button
                  className="mr-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  onClick={() => openEditCategoryModal(category)}
                  disabled={isCategorySaving && selectedCategory?.id === category.id}
                >
                  {isCategorySaving && selectedCategory?.id === category.id ? "Guardando..." : "Editar"}
                </button>
                <button
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                  onClick={() => handleDeleteCategory(category)}
                  disabled={deleteDisabled}
                  title={
                    usage > 0
                      ? "Reasigna o elimina los productos que dependen de esta categoría"
                      : undefined
                  }
                >
                  {categoryPendingDeleteId === category.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          );
        })}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={activeTab === "products" ? openCreateModal : openCreateCategoryModal}
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700"
            >
              {activeTab === "products" ? "Añadir producto" : "Nueva categoría"}
            </button>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition disabled:opacity-60"
            >
              {signingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      </header>
      <main className="px-8 pb-12">
        <div className="mb-6 flex flex-wrap gap-3 border-b border-blue-100 text-sm font-semibold">
          {([
            { key: "products", label: "Productos" },
            { key: "categories", label: "Categorías" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`rounded-t-md border-b-2 px-4 py-2 transition ${
                activeTab === tab.key
                  ? "border-blue-600 bg-white text-blue-700 shadow"
                  : "border-transparent text-slate-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "products" ? (
          <div className="space-y-4">
            {Boolean(categoriesError) && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
          </div>
        ) : (
          <section className="rounded-xl bg-white/95 shadow">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Gestión de categorías</h3>
                <p className="text-sm text-slate-500">
                  Organiza el catálogo y mantén consistencia en los formularios de producto.
                </p>
              </div>
              <button
                onClick={openCreateCategoryModal}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
              >
                Nueva categoría
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-100 text-blue-700">
                    <th className="px-4 py-2 text-left font-semibold">Nombre</th>
                    <th className="px-4 py-2 text-left font-semibold">Slug</th>
                    <th className="px-4 py-2 text-left font-semibold">Productos asociados</th>
                    <th className="px-4 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                {renderCategoryRows()}
              </table>
            </div>
          </section>
        )}
      </main>
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {editorMode === "create" ? "Agregar producto" : "Editar producto"}
                </h3>
                <p className="text-sm text-slate-500">
                  {editorMode === "create"
                    ? "Completa los campos para registrar un nuevo producto"
                    : selectedProduct?.name}
                </p>
                <p className="text-xs text-slate-400">Slug generado: {generatedSlug}</p>
              </div>
              <button
                onClick={closeEditor}
                className="text-slate-500 hover:text-slate-800"
                disabled={isSaving}
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

              <div className="space-y-2 text-sm">
                <p className="font-medium text-slate-700">Imagen</p>
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                  {formState.imageUrl ? (
                    <a
                      href={formState.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Ver imagen actual
                    </a>
                  ) : (
                    <span>Sin imagen registrada</span>
                  )}
                </div>
                <label className="block text-slate-600">
                  Adjuntar nueva imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 w-full rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <p className="text-xs text-slate-500">
                  La imagen solo se subirá a Cloudinary (carpeta PALASAC) cuando confirmes el guardado.
                </p>
                {imageFile && (
                  <p className="text-xs text-slate-500">Archivo seleccionado: {imageFile.name}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-md border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={disableSave}
                >
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-40 overflow-auto flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {categoryEditorMode === "create" ? "Nueva categoría" : "Editar categoría"}
                </h3>
                <p className="text-sm text-slate-500">
                  {categoryEditorMode === "create"
                    ? "Define cómo se mostrará y organizará tu catálogo"
                    : selectedCategory?.nombre}
                </p>
              </div>
              <button
                onClick={closeCategoryEditor}
                className="text-slate-500 hover:text-slate-800"
                disabled={isCategorySaving}
              >
                ×
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleCategorySubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Nombre
                <input
                  type="text"
                  value={categoryFormState.name}
                  onChange={handleCategoryNameChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>

              <div className="text-sm">
                <label className="block font-medium text-slate-700">
                  Slug (URL)
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={categoryFormState.slug}
                      onChange={handleCategorySlugChange}
                      className="flex-1 rounded-md border border-slate-300 px-3 py-2 lowercase focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={resetCategorySlug}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                      disabled={!categorySlugEdited}
                    >
                      Restablecer
                    </button>
                  </div>
                </label>
                <p className="mt-1 text-xs text-slate-500">
                  Se genera automáticamente a partir del nombre y se usa en las URLs públicas.
                </p>
                <p className="text-xs text-slate-400">Sugiero: {generatedCategorySlug || "(completa el nombre)"}</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCategoryEditor}
                  className="rounded-md border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
                  disabled={isCategorySaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={disableCategorySave}
                >
                  {isCategorySaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
