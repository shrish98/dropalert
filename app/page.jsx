import Image from "next/image";
import { LogIn } from "lucide-react";
import { Rabbit } from "lucide-react";
import { Shield } from "lucide-react";
import { Bell } from "lucide-react";
import { TrendingDown } from "lucide-react";
import AddProductForm from "@/components/ui/AddProductForm";
import ProductCard from "@/components/ui/ProductCard";
import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/app/utils/supabase/server";
import { getProducts } from "@/app/actions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MotionDiv, MotionSection, MotionH2, MotionP } from "@/components/MotionWrapper";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default async function Home() {
  // Placeholder variables so the UI can render without crashing
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
      colorClass: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
      colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
      colorClass: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },
  ];

  return (
    <main className="min-h-screen transition-colors duration-500 bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0 z-10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/dropalert.png"
              alt="Drop Alert Logo"
              width={600}
              height={200}
              className="h-10 w-auto drop-shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <MotionDiv
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="max-w-7xl mx-auto text-center"
        >
          <MotionH2 
            variants={FADE_DOWN_ANIMATION_VARIANTS} 
            className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm"
          >
            Never Miss a Price Drop
          </MotionH2>
          
          <MotionP 
            variants={FADE_DOWN_ANIMATION_VARIANTS} 
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </MotionP>

          <MotionDiv variants={FADE_DOWN_ANIMATION_VARIANTS} className="relative z-10">
            <AddProductForm user={user} />
          </MotionDiv>

          {/* Features */}
          <MotionDiv 
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            {FEATURES.map(({ icon: Icon, title, description, colorClass }) => (
              <div
                key={title}
                className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              </div>
            ))}
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Tracked Products
            </h3>
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <MotionDiv 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </MotionDiv>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto px-4 pb-20 text-center"
        >
          <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border-2 border-dashed border-gray-300 dark:border-zinc-700 p-12 shadow-inner">
            <TrendingDown className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </MotionDiv>
      )}
    </main>
  );
}
