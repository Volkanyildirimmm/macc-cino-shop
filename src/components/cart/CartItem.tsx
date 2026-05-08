"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart, type CartItem as CartItemType } from "@/hooks/useCart";
import { formatPriceSimple } from "@/lib/utils";

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 py-4 border-b border-[#EEECE6]"
    >
      <div className="w-14 h-14 rounded-xl bg-[#F0EDE6] overflow-hidden flex-shrink-0 relative">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[#1A1A1A] text-sm font-medium truncate">{item.product.title}</p>
        <p className="text-[#8A8A7A] text-xs">{formatPriceSimple(item.product.price, item.product.currency)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full border border-[#E8E6E0] text-[#4A4A4A] hover:border-[#2D5016] hover:text-[#2D5016] transition-colors flex items-center justify-center text-sm"
        >
          −
        </button>
        <span className="text-[#1A1A1A] text-sm w-5 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full border border-[#E8E6E0] text-[#4A4A4A] hover:border-[#2D5016] hover:text-[#2D5016] transition-colors flex items-center justify-center text-sm"
        >
          +
        </button>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-[#1A1A1A] text-sm font-bold">
          {formatPriceSimple(item.product.price * item.quantity, item.product.currency)}
        </p>
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-[#8A8A7A] hover:text-red-500 transition-colors text-xs mt-1"
        >
          Sil
        </button>
      </div>
    </motion.div>
  );
}
