'use client'

import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react"
import type { AddProduct } from "@/types/product.types"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { Category } from "@/types/category.types"
import AdminMenu from "@/components/AdminMenu"

const AddProduct = () => {
  //--------------------------------- state -----------------------------------------------
  const [formInputs, setFormInputs] = useState<Omit<AddProduct, 'sku'>>({
    productName: '',
    categoryId: 0,
    price: 0,
    mainImage: '',
    description: '',
    discountPercentage: 0,
    rating: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPrevew] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [categories, setCategories] = useState<Category[]>([])

  const categoryList = [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ]

  //--------------------------------------- category ---------------------------------------------
  
  const fetchCategory = async() => {
    try {
      const res = await fetch('http://localhost:3000/category')
      const data = await res.json()
      const categoryNames = data.map((c: Category)  => c.categoryName)
      console.log(data)
      console.log(categoryNames)
      setCategories(data)
    } catch(err) {
      console.log('category fetch failed: ', err)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])
  //----------------------------------- product -----------------------------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormInputs(state => ({
      ...state,
      [name]: value
    }))
  }

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const formData = new FormData()

    if (file) {
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file)
      setPrevew(imageUrl)
      formData.append('file', file);
      formData.append('upload_preset', 'final-image-preset');
    } else {
      setImageFile(null)
      setPrevew('')
      setFormInputs(state => ({
        ...state,
        mainImage: ''
      }))
      return 
    }

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dzkt7opf7/image/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      console.log('Uploaded to Cloudinary', data.secure_url)

      setFormInputs(state => ({
        ...state,
        mainImage: data.secure_url
      }))
    } catch(err) {
      console.log('failed uploading', err)
      toast.error('Image upload failed')
    }
  }

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategoryName = e.target.value
    const selectedCategory = categories.find(cat => cat.categoryName === selectedCategoryName)

    if (selectedCategory) {
      setFormInputs(state => ({
        ...state,
        categoryId: selectedCategory.id
      }))
    }
  }

  useEffect(() => {
    console.log(formInputs)
  }, [formInputs])

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const generateSku = () => {
      return 'SKU-' + Math.floor(Math.random() * 1000000);
    };
    const newProduct = {
      ...formInputs,
      sku: generateSku()
    }

      try {
        const res = await fetch('http://localhost:3000/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newProduct)
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json()
        console.log('success:', data)
        toast.success('Product added successfully')
      } catch(err) {
        console.log('failed:', err)
        toast.error('Failed adding product')
      }

    router.push('/admin/products')
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/admin/products')
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setPrevew('')
    setFormInputs(state => ({
      ...state,
      mainImage: ''
    }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <AdminMenu />
      <div className="w-full flex flex-col justify-center items-center md:p-10 p-4">
        <div className="mt-14 mb-8 w-full">
          <button onClick={handleBack} className="hover:border-b cursor-pointer transition inline-flex items-center gap-2">
              <span>&lt;</span>
              <span className="text-md">Back</span>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center md:p-4 py-8 md:w-2/3 w-full bg-white dark:bg-neutral-800">
          <h1 className="text-xl mt-6">Add Product</h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full rounded-lg px-8 pt-8 pb-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="productName">Product Name</label>
              <input type="text" name="productName" required placeholder="Enter product name..." value={formInputs.productName} onChange={(e) => handleChange(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mainImage">Product Image</label>
              <div className="w-full flex justify-between gap-6">
                <input type="file" name="mainImage" ref={fileInputRef}  onChange={(e) => handleImage(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white w-full" />
                <button type="button" onClick={handleRemoveImage} className="border rounded-lg px-4 py-3 hover:bg-neutral-800">Remove</button>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Image preview: </h3>
              {preview && (
                <div className="relative w-[300px] h-[300px] flex justify-center w-full">
                  <Image src={preview} alt="preview image" fill className="object-contain"/>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Product Description</label>
              <textarea name="description" id="description" required placeholder="Enter product description..." value={formInputs.description} onChange={(e) => handleChange(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white min-h-[200px]"></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Product Price</label>
              <input type="number" name="price" required placeholder="Enter product price..." value={formInputs.price} onChange={(e) => handleChange(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discountPercentage">Discount Parcentage</label>
              <input type="number" name="discountPercentage" required placeholder="Enter discount percentage..." value={formInputs.discountPercentage} onChange={(e) => handleChange(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rating">Product Rating</label>
              <input type="number" name="rating" required placeholder="Enter product rating..." value={formInputs.rating} onChange={(e) => handleChange(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
            </div>
            <div>
              <h3>Product Category</h3>
              <div className="flex flex-col">
                {categories && categories.map((cat) => (
                  <label key={cat.id} className="pl-2">
                    <input type="radio" name="category" value={cat.categoryName} onChange={(e) => handleCategory(e)} />
                    <span>{cat.categoryName}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="bg-black text-white p-3 text-sm uppercase hover:bg-gray-800 transition">Submit</button>
          </form>
          <div className="w-full px-8 pb-4">
            <button onClick={() => router.push('/admin/products')} className="w-full bg-red-500 text-black p-3 text-sm uppercase hover:bg-red-700 dark:hover:bg-red-300 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct