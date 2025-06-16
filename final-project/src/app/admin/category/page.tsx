'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import toast from "react-hot-toast"
import { Category } from "@/types/category.types"
import { useRouter } from "next/navigation"
import AdminMenu from "@/components/AdminMenu"

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'| 'createdAt' | 'updatedAt' >>({
    categoryName: '',
    description: '',
    image: null,
  })
  
  //-------------------------------------------- Edit modal -------------------------------------------
  const [editingCategory, setEditingCategory] = useState<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>({
    categoryName: '',
    description: '',
    image: null
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)

  const fetchCategoryById = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`)
      const data = await res.json()
      console.log(data)
      setEditingCategory({
        categoryName: data.categoryName,
        description: data.description,
        image: data.image
      })
    } catch(err) {
      console.log('Failed to fetch category:', err)
      toast.error('Failed to fetch category')
    }
  }

  const handleOpenModal = (id: number) => {
    setIsModalOpen(true)
    fetchCategoryById(id)
    setEditingCategoryId(id)
  }

  const handleCategory = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target

    setEditingCategory(state => ({
      ...state,
      [name]: value
    }))
  }

  const router = useRouter()

  const handleEditCategory = async(id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editingCategory)
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('success:', data)
      toast.success('Category created successfully')
      setIsModalOpen(false)
      fetchCategory()
    } catch(err) {
      console.log('failed:', err)
      toast.error('Failed creating category')
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingCategoryId) {
      handleEditCategory(editingCategoryId)
    } else {
      handleCreateCategory()
    }
  }


  //--------------------------------------- Create Category ------------------------------------------------
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

  const handleNewCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setNewCategory(state => ({
      ...state,
      [name]: value
    }))
  }

  const handleCreateCategory = async() => {
    try {
      const res = await fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newCategory)
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('success:', data)
      toast.success('Category created successfully')
      setNewCategory({
        categoryName: '',
        description: '',
        image: null,
      })
      fetchCategory()
    } catch(err) {
      console.log('failed:', err)
      toast.error('Failed creating category')
    }
  }

  const handleDelete = async(id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error (`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('delete success', data)
      toast.success('Category deleted successfully')
    } catch(err) {
      console.log('delete failed: ', err)
    }
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/admin/products')
    }
  }
  
  return (
    <div className="w-full min-h-screen">
      <AdminMenu />
      <div className="w-full mb-10 pt-24 px-4 flex flex-col items-center">
        <div className="w-full">
          <button onClick={handleBack} className="hover:border-b cursor-pointer transition inline-flex items-center gap-2">
              <span>&lt;</span>
              <span className="text-md">Back</span>
          </button>
        </div>
        <div className="w-full text-center mb-10">
          <h1>Categories</h1>
        </div>
        <div className="md:w-2/3 w-full max-md:p-4 overflow-scroll custom-scrollbar">
          <table className="w-full min-w-[600px]  table-auto border">
            <thead className="border">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border">Name</th>
                <th className="border">Description</th>
                <th className="border">Image</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.map((cat) => (
                <tr key={cat.id} className="">
                  <td className="border py-1 pl-2">{cat.id}</td>
                  <td className="border py-1 pl-2">{cat.categoryName}</td>
                  <td className="border py-1 pl-2">{cat.description}</td>
                  <td className="border py-1 pl-2">{cat.image === null ? 'N/A' : cat.image}</td>
                  <td className="border py-2 flex gap-4 justify-center">
                    <button type="button" onClick={() => handleOpenModal(cat.id)} className="border py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">Edit</button>
                    <button onClick={() => handleDelete(cat.id)} className="border py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-8 w-full">
        <div className="flex flex-col gap-4 justify-center items-center p-6 rounded w-full">
          <form className="flex flex-col bg-white dark:bg-neutral-800 md:w-2/3 w-full rounded-lg px-8 pt-8 pb-4 gap-4">
            <h3 className="text-xl text-center">Create new category</h3>
            <div className="flex flex-col">
              <label htmlFor="categoryName">Category name</label>
              <input type="text" name="categoryName" placeholder="Enter category name..." value={newCategory.categoryName} onChange={e => handleNewCategory(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Category description</label>
              <input type="text" name="description" placeholder="Enter category description..." value={newCategory.description} onChange={e => handleNewCategory(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"/>
            </div>
            <button type="button" onClick={handleCreateCategory} className="bg-black text-white p-3 text-sm uppercase hover:bg-neutral-900 transition">Create</button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed w-screen h-screen inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-10 w-2/3 shadow-lg relative">
            <h1 className="text-center text-xl mb-4">Edit Category</h1>
            <div className="w-full">
              <form onSubmit={e => handleSubmit(e)} className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="categoryName">Category Name</label>
                  <input type="text" name="categoryName" required placeholder="Enter category name..." value={editingCategory.categoryName} onChange={(e) => handleCategory(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Category Description</label>
                  <textarea name="description" id="description" placeholder="Enter category description..." value={editingCategory.description} onChange={e => handleCategory(e)} className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"></textarea>
                </div>
                <button className="bg-black text-white p-3 text-sm uppercase hover:bg-neutral-800 transition">Edit</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-red-500 text-black p-3 text-sm uppercase hover:bg-red-700 dark:hover:bg-red-300 transition text-center">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryList