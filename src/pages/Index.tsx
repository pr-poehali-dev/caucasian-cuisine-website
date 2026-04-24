import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4bffc032-5f84-4cc8-b361-07d9cb07480f/files/7611f06c-40b5-4e2f-b89c-74811feb79c0.jpg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  emoji: string;
  category: string;
  popular?: boolean;
  image?: string;
}

const MENU: MenuItem[] = [
  { id: 1, name: "Шашлык из баранины", description: "Нежная баранина, маринованная в специях и луке, на живом огне", price: 890, weight: "350г", emoji: "🍖", category: "Мангал", popular: true, image: "https://cdn.poehali.dev/projects/4bffc032-5f84-4cc8-b361-07d9cb07480f/files/3e8e9b92-1094-4d04-9487-27c661b30dfc.jpg" },
  { id: 2, name: "Шашлык из говядины", description: "Вырезка из молодой говядины с травами Кавказа", price: 750, weight: "350г", emoji: "🥩", category: "Мангал" },
  { id: 3, name: "Люля-кебаб", description: "Рубленое мясо с луком и специями на шампуре", price: 620, weight: "300г", emoji: "🍢", category: "Мангал", popular: true },
  { id: 4, name: "Хачапури по-аджарски", description: "Лодочка из теста с сыром сулугуни, яйцом и маслом", price: 480, weight: "400г", emoji: "🫓", category: "Хлеб и выпечка", popular: true },
  { id: 5, name: "Хачапури по-имеретински", description: "Закрытый пирог с сыром, запечённый в дровяной печи", price: 420, weight: "380г", emoji: "🥮", category: "Хлеб и выпечка" },
  { id: 6, name: "Хинкали", description: "Сочные грузинские пельмени с бульоном внутри, 6 штук", price: 390, weight: "360г", emoji: "🥟", category: "Хинкали", popular: true },
  { id: 7, name: "Хинкали с грибами", description: "Вегетарианские хинкали с лесными грибами и зеленью", price: 350, weight: "360г", emoji: "🍄", category: "Хинкали" },
  { id: 8, name: "Долма", description: "Виноградные листья с рисом и мясом в томатном соусе", price: 420, weight: "280г", emoji: "🫙", category: "Закуски" },
  { id: 9, name: "Аджапсандали", description: "Рагу из баклажанов, перца, помидоров и зелени", price: 380, weight: "300г", emoji: "🫑", category: "Закуски" },
  { id: 10, name: "Пхали", description: "Ассорти закусок из шпината, свёклы и грецких орехов", price: 320, weight: "240г", emoji: "🌿", category: "Закуски" },
  { id: 11, name: "Харчо", description: "Острый суп из говядины с рисом, томатами и кинзой", price: 340, weight: "350мл", emoji: "🍲", category: "Супы", popular: true },
  { id: 12, name: "Чихиртма", description: "Традиционный грузинский куриный суп с яйцом", price: 290, weight: "350мл", emoji: "🍵", category: "Супы" },
  { id: 13, name: "Баклава", description: "Слоёное медовое пирожное с грецкими орехами", price: 220, weight: "150г", emoji: "🍯", category: "Десерты" },
  { id: 14, name: "Чурчхела", description: "Грузинская сладость из виноградного сока с орехами", price: 180, weight: "100г", emoji: "🍬", category: "Десерты" },
];

const CATEGORIES = ["Все", "Мангал", "Хлеб и выпечка", "Хинкали", "Закуски", "Супы", "Десерты"];

const REVIEWS = [
  { id: 1, name: "Марина К.", rating: 5, text: "Лучший ресторан в городе! Хачапури по-аджарски просто таят во рту. Атмосфера невероятная, как будто попал в настоящую Грузию.", date: "12 апреля 2026" },
  { id: 2, name: "Дмитрий В.", rating: 5, text: "Шашлык из баранины — шедевр! Мясо нежнейшее, специи идеально подобраны. Буду возвращаться снова и снова.", date: "8 апреля 2026" },
  { id: 3, name: "Анна С.", rating: 5, text: "Заказывали доставку хинкали — приехали горячими, упакованы бережно. Вкус ресторанный! Очень рекомендую.", date: "2 апреля 2026" },
  { id: 4, name: "Алексей М.", rating: 5, text: "Отмечали юбилей всей семьёй. Персонал внимательный, блюда подавали быстро. Особенно понравился харчо!", date: "25 марта 2026" },
];

const GALLERY_ITEMS = [
  { emoji: "🍖", label: "Шашлыки на углях" },
  { emoji: "🫓", label: "Хачапури" },
  { emoji: "🥟", label: "Хинкали" },
  { emoji: "🏺", label: "Традиционная посуда" },
  { emoji: "🌿", label: "Свежие травы" },
  { emoji: "🍷", label: "Кавказские вина" },
];

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "menu", label: "Меню" },
  { id: "delivery", label: "Доставка" },
  { id: "about", label: "О нас" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-caucasus-gold" : "text-caucasus-sand"}>★</span>
      ))}
    </div>
  );
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState({ name: "", phone: "", address: "" });

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c)
    );
  };

  const filteredMenu = activeCategory === "Все" ? MENU : MENU.filter((m) => m.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) { scrollTo("menu"); return; }
    setOrderSuccess(true);
    setCart([]);
    setCartOpen(false);
    setDeliveryForm({ name: "", phone: "", address: "" });
    setTimeout(() => setOrderSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-caucasus-cream font-golos">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-caucasus-dark/95 backdrop-blur-sm border-b border-caucasus-gold/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="text-2xl">🏺</span>
            <span className="font-cormorant text-xl font-bold text-caucasus-cream tracking-wide">
              Кавказский Дворик
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-caucasus-sand hover:text-caucasus-gold transition-colors font-medium">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-caucasus-terracotta text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-caucasus-burgundy transition-all"
            >
              <Icon name="ShoppingBag" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-caucasus-gold text-caucasus-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-caucasus-cream">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-caucasus-dark border-t border-caucasus-gold/20 py-4 px-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-caucasus-sand hover:text-caucasus-gold transition-colors py-1">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* SUCCESS TOAST */}
      {orderSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-caucasus-olive text-white px-6 py-3 rounded-xl shadow-xl animate-fade-in flex items-center gap-2">
          <Icon name="CheckCircle" size={18} />
          <span className="font-semibold">Заказ принят! Ждите звонка.</span>
        </div>
      )}

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-caucasus-cream shadow-2xl flex flex-col h-full overflow-hidden">
            <div className="bg-caucasus-dark p-5 flex items-center justify-between">
              <h2 className="font-cormorant text-2xl font-bold text-caucasus-cream">Ваш заказ</h2>
              <button onClick={() => setCartOpen(false)} className="text-caucasus-sand hover:text-white transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-muted-foreground font-medium">Корзина пуста</p>
                  <p className="text-sm text-muted-foreground mt-1">Добавьте блюда из меню</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex-1">
                      <p className="font-semibold text-caucasus-dark text-sm">{item.name}</p>
                      <p className="text-caucasus-terracotta font-bold">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-full bg-caucasus-sand flex items-center justify-center hover:bg-caucasus-gold/30 transition-colors">
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-full bg-caucasus-sand flex items-center justify-center hover:bg-caucasus-gold/30 transition-colors">
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors ml-1">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-caucasus-sand p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cormorant text-xl font-semibold text-caucasus-dark">Итого:</span>
                  <span className="font-cormorant text-2xl font-bold text-caucasus-terracotta">{cartTotal} ₽</span>
                </div>
                <form onSubmit={handleOrder} className="space-y-3">
                  <input required placeholder="Ваше имя" value={deliveryForm.name} onChange={(e) => setDeliveryForm({ ...deliveryForm, name: e.target.value })} className="w-full border border-caucasus-sand rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-caucasus-terracotta bg-white" />
                  <input required placeholder="Телефон" value={deliveryForm.phone} onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })} className="w-full border border-caucasus-sand rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-caucasus-terracotta bg-white" />
                  <input required placeholder="Адрес доставки" value={deliveryForm.address} onChange={(e) => setDeliveryForm({ ...deliveryForm, address: e.target.value })} className="w-full border border-caucasus-sand rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-caucasus-terracotta bg-white" />
                  <button type="submit" className="w-full bg-caucasus-terracotta text-white py-3 rounded-xl font-bold text-base hover:bg-caucasus-burgundy transition-colors">
                    Оформить заказ
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-caucasus-dark/92 via-caucasus-dark/70 to-transparent" />
        <div className="absolute inset-0 hero-pattern" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-caucasus-gold/20 border border-caucasus-gold/40 rounded-full px-4 py-1.5 mb-6">
              <span className="text-caucasus-gold text-sm font-semibold">Открыты каждый день · 11:00 – 23:00</span>
            </div>

            <h1 className="font-cormorant text-6xl md:text-7xl font-bold text-caucasus-cream leading-tight mb-6">
              Вкус<br />
              <span className="text-caucasus-gold italic">Кавказа</span><br />
              в каждом блюде
            </h1>

            <p className="text-caucasus-sand text-lg leading-relaxed mb-8 max-w-lg">
              Традиционные рецепты, живой огонь мангала и гостеприимство кавказских гор.
              Хинкали, хачапури, шашлыки — готовим с душой.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("menu")} className="bg-caucasus-terracotta text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-caucasus-burgundy transition-all hover:scale-105">
                Смотреть меню
              </button>
              <button onClick={() => scrollTo("delivery")} className="border-2 border-caucasus-cream text-caucasus-cream px-8 py-4 rounded-xl font-bold text-lg hover:bg-caucasus-cream hover:text-caucasus-dark transition-all">
                Заказать доставку
              </button>
            </div>

            <div className="flex flex-wrap gap-10 mt-12">
              {[["500+", "Довольных гостей"], ["15", "Лет традиций"], ["50+", "Блюд в меню"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-cormorant text-4xl font-bold text-caucasus-gold">{num}</p>
                  <p className="text-caucasus-sand text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-caucasus-gold animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 relative" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/4bffc032-5f84-4cc8-b361-07d9cb07480f/files/dbd6f638-3bd6-4517-aeab-3790fe9cf8fa.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-caucasus-cream/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-2">Наше меню</p>
            <h2 className="font-cormorant text-5xl font-bold text-caucasus-dark mb-4">Традиционные блюда Кавказа</h2>
            <div className="w-24 h-0.5 bg-caucasus-gold mx-auto" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? "bg-caucasus-terracotta text-white shadow-md" : "bg-white text-caucasus-dark hover:bg-caucasus-sand border border-caucasus-sand"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-caucasus-sand/50 group">
                <div className="h-40 bg-gradient-to-br from-caucasus-sand to-caucasus-cream flex items-center justify-center relative overflow-hidden">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    : <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                  }
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-caucasus-gold text-caucasus-dark text-xs font-bold px-2 py-0.5 rounded-full">⭐ Популярное</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-cormorant text-xl font-bold text-caucasus-dark mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-caucasus-terracotta font-bold text-lg">{item.price} ₽</span>
                      <span className="text-xs text-muted-foreground ml-1">/ {item.weight}</span>
                    </div>
                    <button onClick={() => addToCart(item)} className="bg-caucasus-terracotta text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-caucasus-burgundy transition-colors hover:scale-110">
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-caucasus-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-2">Доставка</p>
            <h2 className="font-cormorant text-5xl font-bold text-caucasus-cream mb-4">Горячо — прямо к вашей двери</h2>
            <div className="w-24 h-0.5 bg-caucasus-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { emoji: "⚡", title: "Быстро", desc: "Доставка за 45–60 минут по всему городу" },
              { emoji: "🌡️", title: "Горячо", desc: "Специальные термосумки сохраняют тепло блюд" },
              { emoji: "🛵", title: "Бесплатно", desc: "Бесплатная доставка при заказе от 1500 ₽" },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 border border-caucasus-gold/20 rounded-2xl hover:border-caucasus-gold/50 transition-colors">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-cormorant text-2xl font-bold text-caucasus-gold mb-2">{f.title}</h3>
                <p className="text-caucasus-sand text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto bg-caucasus-cream rounded-2xl p-8">
            <h3 className="font-cormorant text-3xl font-bold text-caucasus-dark text-center mb-6">Оформить доставку</h3>
            <form onSubmit={handleOrder} className="space-y-4">
              <input required placeholder="Ваше имя" value={deliveryForm.name} onChange={(e) => setDeliveryForm({ ...deliveryForm, name: e.target.value })} className="w-full border-2 border-caucasus-sand rounded-xl px-4 py-3 focus:outline-none focus:border-caucasus-terracotta bg-white text-caucasus-dark" />
              <input required placeholder="Номер телефона" value={deliveryForm.phone} onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })} className="w-full border-2 border-caucasus-sand rounded-xl px-4 py-3 focus:outline-none focus:border-caucasus-terracotta bg-white text-caucasus-dark" />
              <input required placeholder="Адрес доставки" value={deliveryForm.address} onChange={(e) => setDeliveryForm({ ...deliveryForm, address: e.target.value })} className="w-full border-2 border-caucasus-sand rounded-xl px-4 py-3 focus:outline-none focus:border-caucasus-terracotta bg-white text-caucasus-dark" />
              <p className="text-sm text-caucasus-dark/60 text-center">
                {cart.length === 0 ? "Сначала добавьте блюда в корзину" : `В корзине: ${cartCount} блюд на ${cartTotal} ₽`}
              </p>
              <button type="submit" className="w-full bg-caucasus-terracotta text-white py-4 rounded-xl font-bold text-lg hover:bg-caucasus-burgundy transition-colors">
                {cart.length === 0 ? "Выбрать блюда" : "Оформить заказ"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-caucasus-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-3">О ресторане</p>
              <h2 className="font-cormorant text-5xl font-bold text-caucasus-dark mb-6 leading-tight">
                Гостеприимство — наша главная традиция
              </h2>
              <div className="space-y-4 text-caucasus-dark/70 leading-relaxed">
                <p>«Кавказский Дворик» — место, где каждый гость чувствует себя желанным. Мы готовим по рецептам, которые передавались из поколения в поколение в горных сёлах Грузии, Армении и Азербайджана.</p>
                <p>Наш шеф-повар прошёл обучение у лучших мастеров Тбилиси и Еревана. Каждое блюдо — это история, рассказанная языком вкуса и аромата.</p>
                <p>Только свежие продукты: мясо от местных фермеров, зелень с собственного огорода, специи из Кавказских гор.</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "Flame", label: "Живой огонь мангала" },
                  { icon: "Leaf", label: "Свежие ингредиенты" },
                  { icon: "Award", label: "Рецепты горных мастеров" },
                  { icon: "Heart", label: "С душой и любовью" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-caucasus-sand">
                    <div className="w-10 h-10 bg-caucasus-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon as "Flame"} size={18} className="text-caucasus-terracotta" />
                    </div>
                    <span className="text-sm font-semibold text-caucasus-dark">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-caucasus-terracotta rounded-2xl p-8 flex items-center justify-center aspect-square">
                  <span className="text-8xl">🏔️</span>
                </div>
                <div className="bg-caucasus-gold/20 rounded-2xl p-8 flex items-center justify-center aspect-square mt-8">
                  <span className="text-8xl">🍷</span>
                </div>
                <div className="bg-caucasus-burgundy/10 rounded-2xl p-8 flex items-center justify-center aspect-square">
                  <span className="text-8xl">🌿</span>
                </div>
                <div className="bg-caucasus-sand rounded-2xl p-8 flex items-center justify-center aspect-square mt-8">
                  <span className="text-8xl">🔥</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-caucasus-dark text-caucasus-cream rounded-2xl p-5 shadow-xl">
                <p className="font-cormorant text-3xl font-bold text-caucasus-gold">15</p>
                <p className="text-sm text-caucasus-sand">лет на страже<br />традиций Кавказа</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-caucasus-dark caucasus-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-2">Галерея</p>
            <h2 className="font-cormorant text-5xl font-bold text-caucasus-cream mb-4">Атмосфера ресторана</h2>
            <div className="w-24 h-0.5 bg-caucasus-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-caucasus-terracotta/20 to-caucasus-gold/10 rounded-2xl border border-caucasus-gold/20 flex flex-col items-center justify-center gap-3 hover:border-caucasus-gold/50 hover:scale-105 transition-all cursor-pointer group">
                <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="text-caucasus-sand text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-caucasus-cream caucasus-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-2">Отзывы</p>
            <h2 className="font-cormorant text-5xl font-bold text-caucasus-dark mb-4">Что говорят наши гости</h2>
            <div className="w-24 h-0.5 bg-caucasus-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-caucasus-sand/50 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-caucasus-terracotta/10 rounded-full flex items-center justify-center font-cormorant text-xl font-bold text-caucasus-terracotta">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-caucasus-dark">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-caucasus-dark/70 leading-relaxed italic">«{review.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-caucasus-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-caucasus-gold font-semibold tracking-widest text-sm uppercase mb-2">Контакты</p>
            <h2 className="font-cormorant text-5xl font-bold text-caucasus-cream mb-4">Мы вас ждём!</h2>
            <div className="w-24 h-0.5 bg-caucasus-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["ул. Шашлычная, 12", "Москва, Россия"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "Ежедневно 11:00–23:00"] },
              { icon: "Clock", title: "Часы работы", lines: ["Пн–Чт: 11:00–23:00", "Пт–Вс: 11:00–01:00"] },
            ].map((c) => (
              <div key={c.title} className="text-center p-6 border border-caucasus-gold/20 rounded-2xl hover:border-caucasus-gold/50 transition-colors">
                <div className="w-14 h-14 bg-caucasus-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={c.icon as "MapPin"} size={22} className="text-caucasus-gold" />
                </div>
                <h3 className="font-cormorant text-xl font-bold text-caucasus-gold mb-2">{c.title}</h3>
                {c.lines.map((l) => <p key={l} className="text-caucasus-sand text-sm">{l}</p>)}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="tel:+74951234567" className="inline-flex items-center gap-3 bg-caucasus-terracotta text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-caucasus-burgundy transition-all hover:scale-105">
              <Icon name="Phone" size={20} />
              Позвонить и забронировать стол
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-caucasus-dark border-t border-caucasus-gold/20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏺</span>
            <span className="font-cormorant text-lg font-bold text-caucasus-cream">Кавказский Дворик</span>
          </div>
          <p className="text-caucasus-sand/50 text-sm">© 2026 Все права защищены</p>
          <div className="flex gap-4">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-caucasus-sand/60 hover:text-caucasus-gold text-sm transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;