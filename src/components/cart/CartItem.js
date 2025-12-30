'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <Link href={`/products/${item.slug}`}>
          <h3 className="font-bold text-[#2d3e5f] hover:text-[#d87f3f] mb-2">
            {item.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-[#d87f3f] mb-3">₹{item.price}</p>

        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-gray-200 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xl font-bold text-[#2d3e5f]">
          ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  )
}
