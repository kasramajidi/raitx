"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProductsTable from "./components/ProductsTable";
import ProductForm from "./components/ProductForm";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
  description?: string;
}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: number;
  description: string;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "لپ تاپ اپل MacBook Pro",
    category: "لپ تاپ",
    price: "25,000,000 تومان",
    stock: 15,
    sales: 45,
    status: "موجود",
  },
  {
    id: "2",
    name: "گوشی سامسونگ Galaxy S24",
    category: "گوشی موبایل",
    price: "15,000,000 تومان",
    stock: 8,
    sales: 32,
    status: "موجود",
  },
  {
    id: "3",
    name: "تبلت آیپد Pro",
    category: "تبلت",
    price: "18,000,000 تومان",
    stock: 0,
    sales: 28,
    status: "ناموجود",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleSave = (formData: ProductFormData) => {
    const priceFormatted =
      new Intl.NumberFormat("fa-IR").format(
        parseInt(formData.price.replace(/,/g, "")) || 0
      ) + " تومان";

    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...formData,
                price: priceFormatted,
                status: formData.stock > 0 ? "موجود" : "ناموجود",
              }
            : product
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        price: priceFormatted,
        sales: 0,
        status: formData.stock > 0 ? "موجود" : "ناموجود",
      };
      setProducts([newProduct, ...products]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              مدیریت محصولات
            </h1>
            <p className="text-sm text-gray-600">
              افزودن، ویرایش و حذف محصولات
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            افزودن محصول جدید
          </button>
        </div>

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        <ProductsTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <ProductForm
            product={
              editingProduct
                ? {
                    id: editingProduct.id,
                    name: editingProduct.name,
                    category: editingProduct.category,
                    price: editingProduct.price,
                    stock: editingProduct.stock,
                    description: editingProduct.description || "",
                  }
                : undefined
            }
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
