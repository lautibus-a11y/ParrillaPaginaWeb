import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, 
  Facebook,
  Twitter,
  MessageCircle,
  MapPin, 
  Phone, 
  Clock, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  ChefHat, 
  Flame, 
  UtensilsCrossed, 
  Wine,
  ArrowRight
} from 'lucide-react';

// --- Official WhatsApp SVG ---
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const useVideoAutoplay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(e => console.warn("Autoplay prevented:", e));
        }
      }
    };

    playVideo();
    
    const events = ['scroll', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, playVideo, { passive: true }));
    video.addEventListener('pause', playVideo);

    return () => {
      events.forEach(event => window.removeEventListener(event, playVideo));
      video.removeEventListener('pause', playVideo);
    };
  }, []);

  return videoRef;
};

// --- Types ---
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  category: string;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  {
    name: "Provoleta Clásica",
    description: "Queso provolone fundido, crujiente por fuera y tierno por dentro.",
    price: "$3,500",
    category: "Entradas",
    image: "/assets/images/products/Provoleta Clasica.jpg"
  },
  {
    name: "Choripán",
    description: "Chorizo puro de cerdo en pan francés con chimichurri casero.",
    price: "$2,800",
    category: "Entradas",
    image: "/assets/images/products/Choripan.jpg"
  },
  {
    name: "Asado",
    description: "Corte clásico argentino asado lentamente a la leña.",
    price: "$8,500",
    category: "Parrilla",
    image: "/assets/images/products/Asado.jpg"
  },
  {
    name: "Entraña",
    description: "Corte fino y jugoso, con gran sabor, asado a fuego fuerte.",
    price: "$9,200",
    category: "Parrilla",
    image: "/assets/images/products/Entrana.jpeg"
  },
  {
    name: "Vacío",
    description: "Corte sin hueso, cocido a fuego lento para máxima terneza.",
    price: "$8,800",
    category: "Parrilla",
    image: "/assets/images/products/Vacio.jpg"
  },
  {
    name: "Matambre a la Pizza",
    description: "Matambre de ternera tiernizado con salsa de tomate, mozzarella y orégano.",
    price: "$9,500",
    category: "Parrilla",
    image: "/assets/images/products/Matambre a la Pizza.jpg"
  },
  {
    name: "Bondiola",
    description: "Bondiola de cerdo a la parrilla, dorada y sabrosa.",
    price: "$7,500",
    category: "Parrilla",
    image: "/assets/images/products/Bondiola.jpeg"
  },
  {
    name: "Hamburguesa Smash",
    description: "Doble medallón smash con cheddar, panceta y salsa especial.",
    price: "$5,500",
    category: "Especiales",
    image: "/assets/images/products/Hamburguesa Smash.jpeg"
  },
  {
    name: "Papas Fritas",
    description: "Papas bastón doradas y crujientes.",
    price: "$2,500",
    category: "Guarniciones",
    image: "/assets/images/products/Papas Fritas.jpeg"
  },
  {
    name: "Papas Rústicas",
    description: "Papas con cáscara asadas con hierbas y especias.",
    price: "$3,000",
    category: "Guarniciones",
    image: "/assets/images/products/Papas Rusticas.jpeg"
  },
  {
    name: "Puré de Papa",
    description: "Puré cremoso y suave, con un toque de manteca.",
    price: "$2,500",
    category: "Guarniciones",
    image: "/assets/images/products/Pure de Papa.avif"
  },
  {
    name: "Vino Malbec",
    description: "Copa de vino Malbec reserva de Mendoza.",
    price: "$3,500",
    category: "Bebidas",
    image: "/assets/images/products/Vino Malbec.jpeg"
  },
  {
    name: "Cerveza Tirada",
    description: "Pinta de cerveza rubia artesanal bien helada.",
    price: "$2,500",
    category: "Bebidas",
    image: "/assets/images/products/Cerveza tirada.jpeg"
  },
  {
    name: "Coca Cola",
    description: "Gaseosa línea Coca Cola regular o zero.",
    price: "$1,500",
    category: "Bebidas",
    image: "/assets/images/products/coca cola.webp"
  },
  {
    name: "Sprite",
    description: "Gaseosa línea Sprite regular o zero.",
    price: "$1,500",
    category: "Bebidas",
    image: "/assets/images/products/Sprite.webp"
  },
  {
    name: "Flan Casero",
    description: "Flan tradicional con abundante dulce de leche.",
    price: "$3,200",
    category: "Postres",
    image: "/assets/images/products/Flan casero.jpeg"
  },
  {
    name: "Budín de Pan",
    description: "Postre clásico argentino con caramelo y pasas.",
    price: "$2,800",
    category: "Postres",
    image: "/assets/images/products/Budin Pan.jpeg"
  },
  {
    name: "Tiramisú",
    description: "Clásico postre italiano con vainillas, café y mascarpone.",
    price: "$3,500",
    category: "Postres",
    image: "/assets/images/products/Tiramisu.jpeg"
  }
];

const CATEGORIES = ["De todo", "Entradas", "Parrilla", "Especiales", "Guarniciones", "Bebidas", "Postres"];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Menú", href: "#menu" },
    { name: "Galería", href: "#gallery" },
    { name: "Nosotros", href: "#about" },
    { name: "Reservas", href: "#reserve" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-2xl font-serif tracking-widest uppercase text-white">La Brasa</span>
          <span className="text-[10px] tracking-[4px] uppercase text-orange-brand font-bold">Argentine Grill House</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5491172023171"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-orange-brand/50 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-orange-brand transition-colors text-white"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollingTicker = () => {
  const offers = [
    "🔥 20% OFF EN OJO DE BIFE LOS MIÉRCOLES",
    "🍷 DEGUSTACIÓN DE MALBEC GRATIS CON TU CENA",
    "🥩 MENCIONA 'LA BRASA' Y OBTÉN UN POSTRE DE CORTESÍA",
    "🔥 20% OFF EN OJO DE BIFE LOS MIÉRCOLES",
    "🍷 DEGUSTACIÓN DE MALBEC GRATIS CON TU CENA",
    "🥩 MENCIONA 'LA BRASA' Y OBTÉN UN POSTRE DE CORTESÍA",
  ];

  return (
    <div className="bg-charcoal/80 backdrop-blur-md border-y border-white/5 py-3 overflow-hidden relative z-40">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="flex gap-12 items-center whitespace-nowrap"
      >
        {offers.map((offer, i) => (
          <span key={i} className="text-[10px] md:text-xs tracking-[4px] uppercase font-bold text-orange-brand/80">
            {offer}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const videoRef = useVideoAutoplay();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with zoom effect or Video */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster="/assets/images/nosotros/Nosotros 1.png"
        >
          <source src="/assets/videos/VideooHero.mp4" type="video/mp4" />
        </video>
        {/* Fire Particle Overlay Placeholder (Simulated with Gradient and Subtle Blur) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-flame/40 rounded-full blur-sm"
              style={{
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                left: `${Math.random() * 100}%`,
                bottom: `-10%`,
              }}
              animate={{
                y: -1000,
                x: (Math.random() - 0.5) * 200,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-30 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-orange-brand uppercase tracking-[0.4em] text-xs font-bold mb-6"
        >
          Pasión por el fuego
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl font-serif leading-none mb-8 text-glow"
        >
          El sabor auténtico <br /> 
          <span className="italic text-orange-brand">de la brasa.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-cream/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Carnes premium selectionadas, fuego lento y la tradición inigualable del asado argentino.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#menu" className="w-full sm:w-auto bg-orange-brand text-white px-10 py-5 rounded-sm text-xs uppercase tracking-[3px] font-bold shadow-2xl hover:bg-orange-500 transition-all inline-block text-center">
            Ver Menú
          </a>
          <a href="#reserve" className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-sm text-xs uppercase tracking-[3px] font-bold hover:bg-white/10 transition-all inline-block text-center">
            Reservar Mesa
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("De todo");

  return (
    <section id="menu" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Nuestra Carta</h2>
          <div className="w-24 h-1 bg-flame mx-auto mb-8" />
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] uppercase tracking-[3px] transition-all duration-300 pb-2 border-b-2 ${activeCategory === cat ? 'text-orange-brand border-orange-brand' : 'text-white/20 border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(item => activeCategory === "De todo" || item.category === activeCategory).map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 group transition-all duration-500 rounded-none fire-glow"
              >
                {item.image && (
                  <div className="h-48 overflow-hidden rounded-none mb-6 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
                  <h3 className="text-xl font-serif text-white group-hover:text-orange-brand transition-colors duration-300">{item.name}</h3>
                  <span className="text-orange-brand font-bold font-sans">{item.price}</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
                <motion.div 
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  <a href="#reserve" className="text-xs uppercase tracking-widest flex items-center gap-2 text-white/80 hover:text-orange-brand transition-colors">
                    Saber más <ChevronRight size={14} />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SpecialtySection = () => {
  const carouselImages = [
    "/assets/images/nosotros/Nosotros 1.png",
    "/assets/images/nosotros/Nosotros 2.png",
    "/assets/images/nosotros/Noostros 3.png"
  ];
  
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <span className="text-orange-brand uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Especialidades</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">El Ritual del Fuego</h2>
            <p className="text-cream/70 leading-relaxed text-lg mb-8 font-light italic">
              "No es solo cocinar carne, es honrar la herencia de nuestros gauchos. Cada corte es una historia de paciencia, temperatura y respeto por el animal."
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8 mb-8">
              <div className="flex items-center gap-4">
                <ChefHat className="text-orange-brand" size={32} />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-widest">Maestros Parrilleros</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Tradición gaucha</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <UtensilsCrossed className="text-orange-brand" size={32} />
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-widest">Cortes Premium</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Calidad superior</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-white/5 pt-8">
              <a 
                href="#about"
                className="text-xs uppercase tracking-[3px] font-bold text-orange-brand flex items-center gap-3 group"
              >
                Conoce nuestra historia 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex gap-6 items-center">
                <Instagram size={18} className="text-white/40 hover:text-orange-brand transition-colors cursor-pointer" />
                <Facebook size={18} className="text-white/40 hover:text-orange-brand transition-colors cursor-pointer" />
                <Twitter size={18} className="text-white/40 hover:text-orange-brand transition-colors cursor-pointer" />
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative h-[500px] overflow-hidden"
          >
            <div className="absolute inset-0 border border-orange-brand/30 scale-95 translate-x-4 translate-y-4 rounded-sm z-0" />
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                src={carouselImages[currentImage]} 
                className="absolute inset-0 w-full h-full object-cover rounded-sm z-10 filter brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Chef grilling"
              />
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-3">
              {carouselImages.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-12 h-1 transition-all duration-500 ${currentImage === i ? 'bg-orange-brand' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const videoRef = useVideoAutoplay();

  return (
    <section className="py-32 relative overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2]"
        poster="/assets/images/nosotros/Noostros 3.png"
      >
        <source src="/assets/videos/VideoCTL.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass p-16 rounded-sm border-orange-brand/20 fire-glow"
        >
          <span className="text-orange-brand uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Vive la Experiencia</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">¿Listo para el banquete?</h2>
          <p className="text-cream/60 mb-12 text-lg font-light leading-relaxed">
            Reserva tu mesa hoy y déjate seducir por el aroma incomparable de la leña y los mejores cortes de carne argentina.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#reserve" className="bg-orange-brand text-white px-12 py-5 rounded-sm text-xs uppercase tracking-[4px] font-bold shadow-2xl hover:bg-orange-500 transition-all text-center inline-block">
              Reservar una Mesa
            </a>
            <a href="#menu" className="border border-white/30 text-white px-12 py-5 rounded-sm text-xs uppercase tracking-[4px] font-bold hover:bg-white hover:text-black transition-all text-center inline-block">
              Ver Menú Completo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    "/assets/images/gallery/Galeria 1.png",
    "/assets/images/gallery/galeria 2.png",
    "/assets/images/gallery/Galeria 3.png",
    "/assets/images/gallery/galeria 4.png",
    "/assets/images/gallery/Galeria 5.png",
    "/assets/images/gallery/Galeria 6.png",
  ];

  return (
    <section id="gallery" className="py-24 bg-ink">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif text-center mb-16 italic">Nuestra Galería</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`overflow-hidden rounded-sm group relative ${i % 3 === 1 ? 'md:translate-y-12' : ''}`}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover aspect-square md:aspect-[4/5] transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" 
                alt={`Gallery ${i}`}
              />
              <div className="absolute inset-0 bg-orange-brand/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    personas: '2 Personas',
    fecha: '',
    hora: '',
    comentarios: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, personas, fecha, hora, comentarios } = formData;
    
    const message = `¡Hola! Quiero hacer una reserva en La Brasa.%0A%0A*Nombre:* ${nombre}%0A*Personas:* ${personas}%0A*Fecha:* ${fecha}%0A*Hora:* ${hora}%0A*Comentarios:* ${comentarios || 'Ninguno'}`;
    
    window.open(`https://wa.me/5491172023171?text=${message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="reserve" className="py-24 bg-ink relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-brand to-transparent opacity-30" />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass p-12 rounded-sm relative z-10 border-white/5 fire-glow">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Haz tu Reserva</h2>
            <p className="text-white/40 text-[10px] tracking-[4px] uppercase font-bold">Experiencia Inmersiva</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-wider text-white/40 mb-1 block">Nombre</label>
                <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 outline-none focus:border-orange-brand transition-colors text-white" placeholder="Tu nombre completo" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-wider text-white/40 mb-1 block">Personas</label>
                <select name="personas" value={formData.personas} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 outline-none focus:border-orange-brand transition-colors text-white appearance-none">
                  <option>1 Persona</option>
                  <option>2 Personas</option>
                  <option>4 Personas</option>
                  <option>6+ Personas</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-wider text-white/40 mb-1 block">Fecha</label>
                <input required type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 outline-none focus:border-orange-brand transition-colors text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-wider text-white/40 mb-1 block">Hora</label>
                <input required type="time" name="hora" value={formData.hora} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 outline-none focus:border-orange-brand transition-colors text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-wider text-white/40 mb-1 block">Comentarios Especiales</label>
              <textarea name="comentarios" value={formData.comentarios} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 outline-none focus:border-orange-brand transition-colors text-white h-32" placeholder="Celebración, alergias, o preferencias de mesa..."></textarea>
            </div>
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-white text-black py-4 rounded-sm text-[10px] uppercase tracking-[3px] font-bold hover:bg-orange-brand hover:text-white transition-all shadow-xl"
            >
              Confirmar Reserva
            </motion.button>
          </form>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-brand/10 rounded-full blur-[100px]" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-ink border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-serif tracking-widest uppercase text-white">La Brasa</span>
              <span className="text-[10px] tracking-[4px] uppercase text-orange-brand font-bold">Argentine Grill House</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Ubicados en el corazón de Palermo, llevamos el arte del fuego a tu mesa con la máxima elegancia.
            </p>
            <div className="flex gap-6 justify-center md:justify-start">
              <Instagram className="text-white/60 hover:text-orange-brand transition-colors cursor-pointer" />
              <Facebook className="text-white/60 hover:text-orange-brand transition-colors cursor-pointer" />
              <Twitter className="text-white/60 hover:text-orange-brand transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-brand mb-2">Horarios</h4>
            <div className="flex items-start justify-center md:justify-start gap-3">
              <Clock size={16} className="text-white/40 mt-1" />
              <div className="text-sm text-white/60">
                <p>Lun - Jue: 12:00 - 00:00</p>
                <p>Vie - Dom: 12:00 - 02:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-brand mb-2">Ubicación</h4>
            <div className="flex items-start justify-center md:justify-start gap-3">
              <MapPin size={16} className="text-white/40 mt-1" />
              <div className="text-sm text-white/60">
                <p>Gorriti 456, Palermo</p>
                <p>Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-brand mb-2">Contacto</h4>
            <div className="flex items-start justify-center md:justify-start gap-3">
              <Phone size={16} className="text-white/40 mt-1" />
              <div className="text-sm text-white/60">
                <p>+54 11 4567 8910</p>
                <p>reservas@labrasa.com.ar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="w-full h-80 mb-12 rounded-sm overflow-hidden border border-white/5 relative z-10 filter grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1458872688047!2d-58.4323285!3d-34.5888258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb58a364273df%3A0x6e8e04b407a16f2!2sGorriti%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/20 uppercase tracking-[2px] text-center">
            © 2026 LA BRASA ARGENTINA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-[2px]">
            <a href="#" className="hover:text-orange-brand transition-colors">Privacidad</a>
            <a href="#" className="hover:text-orange-brand transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5491172023171"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/20 flex items-center justify-center hover:bg-[#20ba59] transition-colors"
  >
    <WhatsAppIcon />
  </motion.a>
);

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <Flame className="text-orange-brand mb-6" size={48} />
      <span className="text-4xl md:text-6xl font-serif tracking-widest uppercase text-white mb-4">La Brasa</span>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="h-[2px] bg-orange-brand" 
      />
    </motion.div>
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`font-sans ${loading ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <ScrollingTicker />
      <SpecialtySection />
      <MenuSection />
      <CTASection />
      <GallerySection />
      <ReservationSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
