"use client"
import MenuCardWithCart from "./menu-card-with-cart"
import type { CartItem } from "@/hooks/useCart"

const menuData = {
 1: [
    {
      id: "w1-1",
      name: "Ayam Saos Padang",
      desc: "Daging ayam dengan bumbu rempah pilihan, dimasak matang hingga sempurna",
      price: 25000,
      image: "/ayamSaosPadang.jpg",
    },
    {
      id: "w1-2",
      name: "Ayam Cabe Merah",
      desc: "Ayam lezat dengan cabe merah pilihan",
      price: 25000,
      image: "/ayamCabeMerah.jpeg",
    },
    {
      id: "w1-3",
      name: "Ayam Cabe Hijau",
      desc: "Ayam lezar dengan cabe hijau pilihan",
      price: 25000,
      image: "/AyamSambalHijau.jpeg",
    },
    {
      id: "w1-4",
      name: "Ayam Suwir",
      desc: "Nasi dengan ayam suwir yang lembut, tepat dimakan hangat",
      price: 25000,
      image: "/ayamSuwir.jpg",
    },
  ],
  2: [
    {
      id: "w2-1",
      name: "Nasi Lele Spesial",
      desc: "Nasi dengan lele spesial dan crispy",
      price: 25000,
      image: "/NasiLeleSpesial.jpeg",
    },
    {
      id: "w2-2",
      name: "Ayam Rendang",
      desc: "Ayam dengan bumbu rendang khas indonesia",
      price: 25000,
      image: "/ayamRendang.jpeg",
    },
    {
      id: "w2-3",
      name: "Ayam Penyet Lezat",
      desc: "Ayam goreng yang dipenyet dengan sambal matah segar dan lezat",
      price: 25000,
      image: "/ayam-penyet-lezat.jpg",
    },
    {
      id: "w2-4",
      name: "Ayam Crispy",
      desc: "Ayam goreng yang renyah dan lezat",
      price: 25000,
      image: "/ayamCrispy.jpeg",
    },
  ],
  3: [
    {
      id: "w3-1",
      name: "Ayam Betutu Bali",
      desc: "Ayam tradisional yang dibumbui dengan rempah khas Bali, rasa autentik dan lezat",
      price: 50000,
      image: "/ayam-betutu-bali.jpg",
    },
    {
      id: "w3-2",
      name: "Ayam Woku Singkong",
      desc: "Ayam dengan irisan singkong yang dimasak dalam woku dengan bumbu kental",
      price: 25000,
      image: "/ayam-woku-singkong.jpg",
    },
    {
      id: "w3-3",
      name: "Ayam Bakar Bumbu Kecil",
      desc: "Ayam bakar dengan bumbu kecil yang meresap, nikmat dan tidak terlalu pedas",
      price: 45000,
      image: "/ayam-bakar-bumbu-kecil.jpg",
    },
    {
      id: "w3-4",
      name: "Snack Susu Kacang Hijau",
      desc: "Snack dengan tambahan susu kacang hijau yang menggugah selera",
      price: 25000,
      image: "/snackKacangHijau.jpeg",
    },
  ],
  4: [
    {
      id: "w4-1",
      name: "Ayam Rendang Padang",
      desc: "Ayam dalam rendang yang kental dan gurih dengan rempah tradisional Minangkabau",
      price: 49000,
      image: "/ayam-rendang-padang.jpg",
    },
    {
      id: "w4-2",
      name: "Ayam Opor Lezat",
      desc: "Ayam dengan kuah santan yang gurih dan lembut, cocok untuk berbagai acara",
      price: 45000,
      image: "/ayam-opor-lezat.jpg",
    },
    {
      id: "w4-3",
      name: "Ayam Taliwang Pedas",
      desc: "Ayam dengan taliwang yang pedas dan gurih, sensasi rasa yang menggugah",
      price: 47000,
      image: "/ayam-taliwang-pedas.jpg",
    },
    {
      id: "w4-4",
      name: "Snack Susu",
      desc: "Snack dengan susu segar yang sangat nikmat",
      price: 25000,
      image: "/SnackSusu.jpeg",
    },
  ],
}

interface MenuGridProps {
  week: number
  onAddToCart?: (item: Omit<CartItem, "quantity">) => void
}

export default function MenuGrid({ week, onAddToCart }: MenuGridProps) {
  const currentMenu = menuData[week as keyof typeof menuData] || menuData[1]

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-foreground">Menu Minggu {week}</h3>
        <p className="text-muted-foreground">Pilih hidangan favorit Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentMenu.map((item, index) => (
          <div
            key={item.id}
            className="animate-slide-up"
            style={{
              animationDelay: `${index * 30}ms`,
            }}
          >
            <MenuCardWithCart
              item={item}
              onAddToCart={() => {
                if (onAddToCart) {
                  onAddToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  })
                }
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
