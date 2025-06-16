'use client'

import { Product } from "@/types/product.types"
import Image from "next/image"
import { useEffect, use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AdminMenu from "@/components/AdminMenu"

type Props = {
  params: Promise<{id: string}>
}

const ProductDetail = ({ params }: Props) => {
  const [thisProduct, setThisProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'sku'>>({
    productName: '',
    category: { id: 0, categoryName: ''},
    price: 0,
    mainImage: '',
    description: '',
    discountPercentage: 0,
    rating: 0,
  })

  const { id } = use(params)

  useEffect(() => {
    const fetchProduct = async() => {
      const res = await fetch(`http://localhost:3000/product/${id}`)
      const data = await res.json()
      setThisProduct(data)
    }

    fetchProduct()
  }, [])

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/admin/products')
    }
  }

  const router = useRouter()
  
  const handleDelete = async() => {
    try {
      const res = await fetch(`http://localhost:3000/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('success:', data)
      router.push('/admin/products')
      alert('Product deleted successfully')
    } catch(err) {
      console.log('failed:', err)
    }
  }
  
  return (
    <div className="min-h-screen">
      <AdminMenu />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-20 w-full pl-10">
          <button onClick={handleBack} className="hover:border-b cursor-pointer transition inline-flex items-center gap-2">
              <span>&lt;</span>
              <span className="text-md">Back</span>
          </button>
        </div>
        <div className="flex justify-center items-center w-3/4 mb-20">
          {thisProduct.mainImage && (
            <div className="relative w-[500px] h-[500px]">
              <Image src={thisProduct.mainImage} alt={thisProduct.mainImage} fill className="object-contain"/>
            </div>
          )}
          <div className="p-6 w-2/3">
            <h2 className="text-3xl mb-4">{thisProduct.productName}</h2>
            <p className="mt-4 text-xl mb-2">${thisProduct.price}</p>
            <p>{thisProduct.description}</p>
            <p className="my-2">Category: {thisProduct.category.categoryName}</p>
            <p>Rating: {thisProduct.rating}</p>
            <p>Discount: {thisProduct.discountPercentage}%</p>
            <div className="mt-8 text-right">
              <Link href={`/admin/edit-product/${id}`} className="shadow-[0_0_1px] rounded-lg px-4 py-3 mr-10 hover:bg-gray-200 dark:hover:bg-neutral-800 transition">EDIT</Link>
              <button onClick={handleDelete} className="shadow-[0_0_1px] text-black rounded-lg px-4 py-2 bg-red-500 hover:bg-red-700 dark:hover:bg-red-300 cursor-pointer">DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail