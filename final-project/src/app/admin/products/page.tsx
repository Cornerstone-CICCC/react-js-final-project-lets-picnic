'use client'

import type { Product } from "@/types/product.types"
import Link from "next/link"
import Image from "next/image"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Search } from 'lucide-react'
import toast from "react-hot-toast"
import { Category } from "@/types/category.types"
import AdminMenu from "@/components/AdminMenu"
import Loading from "@/components/Loading"

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:3000/product')
        const data = await res.json()
        setProducts(data)
        console.log('fetched products:', data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
    console.log(products)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log(searchInput)
  }

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:3000/category')
      const categoryData: Category[] = await res.json()
      const categoryMatch = categoryData.find(c => c.categoryName.toLowerCase() === searchInput.toLowerCase())

      if (categoryMatch) {
        const res = await fetch(`http://localhost:3000/product/category/${categoryMatch.id}`)
        const data = await res.json()
        console.log('search by category: ', data)
        setProducts(data)
        return
      }

      const res2 = await fetch(`http://localhost:3000/product/search/${searchInput}`)
      const data2 = await res2.json()
      console.log('success:', data2)
      setProducts([data2])
    } catch (err) {
      console.log('search failed:', err)
      toast.error('Search failed, please try again')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDelete = async(id: number) => {
    const result = confirm('Are you sure you want to delete this product?')
    if (result) {
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
        setProducts(state => state.filter(p => p.id !== id))
        toast.success('Product deleted successfully')
      } catch(err) {
        console.log('failed:', err)
      }
    } else {
      toast.error('Failed deleting product')
      return 
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="m-6 md:w-3/4 w-full md:p-0 p-8 mt-20">
        <div className="text-center mb-10 w-full flex items-center gap-4 px-2 ">
          <div className="md:w-1/3">
            <form onSubmit={e => handleSearch(e)} className='flex justify-center items-center md:mt-4'>
              <input type="text" value={searchInput} name='search' onChange={handleChange} placeholder='Search...' className='shadow-[0_0_1px] rounded-3xl w-full py-2 pl-4 pr-9' />
              <button className='-translate-x-8 cursor-pointer'><Search /></button>
            </form>
          </div>
          <div className="w-full flex-1">
            <h1 className="text-2xl max-md:hidden">Products</h1>
          </div>
          <div className="md:w-1/4 w-1/3">
            <Link href='/admin/add-product' className="shadow-[0_0_1px] rounded-4xl  md:px-6 px-4 py-3 hover:bg-gray-200 dark:hover:bg-neutral-800 transition w-22"><span className="max-md:text-2xl align-middle">+</span> <span className="max-md:hidden">New</span></Link>
          </div>
          <AdminMenu />
        </div>
        <div className="w-full overflow-scroll custom-scrollbar">
          {isLoading ? (

            <div className="flex justify-center py-10">
              <Loading />
            </div>
            ) : (
              products.length > 0 ? (
                products.map((product: Product, index: number) => (
                  <div key={product.id} className={`flex justify-between items-stretch ${index === 0 ? 'border' : 'border-x border-b'}  min-w-[650px]`}>
                    <div className="relative h-[150px] w-[150px] border-r">
                      <Image src={product.mainImage} alt={product.productName} fill className="object-contain" /> 
                    </div>
                    <div className="flex flex-col justify-center max-md:px-4 lg:min-w-[400px] min-w-[250px]">
                      <div className="flex justify-between max-md:gap-4 mb-2 max-h-[56px]">
                        <h3 className="text-xl line-clamp-2 max-w-[230px]">{product.productName}</h3>
                        <p>Category: {product.category.categoryName}</p>
                      </div>
                      <p className="max-w-[400px] line-clamp-2 mb-4 text-sm">{product.description}</p>
                      <p className="text-lg">Price: ${product.price}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex items-center border-l px-4">
                        <Link href={`/admin/products/${product.id}`}>
                          <button className="border rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 transition">Detail</button>
                        </Link>
                      </div>
                      <div className="flex items-center border-x px-4">
                        <Link href={`/admin/edit-product/${product.id}`}>
                          <button className="border rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 transition">Edit</button>
                        </Link>
                      </div>
                      <div className="flex items-center px-4">
                        <button className="border rounded-lg py-2 px-4 bg-red-500 text-black hover:bg-red-700 dark:hover:bg-red-300 transition" onClick={() => handleDelete(product.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))) : (
                  <p>No products found.</p>
                )
              )
          }
        </div>
      </div>
    </div>
  )
}

export default AdminProducts