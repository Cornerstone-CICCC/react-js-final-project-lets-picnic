import Link from "next/link"

const AdminMenu = () => {
  return (
    <div className="fixed top-20 right-2 max-sm:hidden">
      <nav>
        <ul className="flex flex-col gap-2">
          <li className="hover:underline"><Link href='/admin/products'>Products</Link></li>
          <li className="hover:underline"><Link href='/admin/category'>Category</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminMenu