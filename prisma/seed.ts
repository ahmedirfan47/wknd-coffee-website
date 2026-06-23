import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('🌱 Seeding WKND Coffee database...');

  await db.notification.deleteMany();
  await db.newsletterSubscriber.deleteMany();
  await db.contactMessage.deleteMany();
  await db.coupon.deleteMany();
  await db.banner.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.category.deleteMany();
  await db.siteSettings.deleteMany();
  await db.user.deleteMany();

  // Admin
  const hashed = await bcrypt.hash('WkndAdmin2026!', 12);
  await db.user.create({
    data: {
      name:     'WKND Admin',
      email:    'admin@wkndcoffee.pk',
      password: hashed,
      role:     'ADMIN',
      phone:    '+92 300 0000000',
    },
  });

  // Settings
  await db.siteSettings.create({
    data: {
      id:              'settings',
      siteName:        'WKND Coffee',
      tagline:         "What's better than a weekend?",
      primaryPhone:    '+92 300 0000000',
      primaryEmail:    'hello@wkndcoffee.pk',
      whatsappNumber:  'DAINOCZIHB3UK1',
      deliveryFee:     150,
      freeDeliveryMin: 2000,
      instagramUrl:    'https://www.instagram.com/wkndcoffeeraya',
      facebookUrl:     'https://www.facebook.com/wkndcoffeeraya',
      aboutText:       "Lahore's only ODK café. We take coffee seriously and brunch personally. Tucked into DHA Raya, WKND Coffee is where your week unwinds and your weekend starts early — every single day.",
    },
  });
  console.log('✅ Settings created');

  // ── CATEGORIES ──────────────────────────────────────────
  const [coffee, matcha, specials, frappes, softSips, food, desserts] =
    await Promise.all([
      db.category.create({ data: {
        name:        'Coffee',
        slug:        'coffee',
        description: 'Life happens, coffee helps. Espresso-based drinks from classic to creative.',
        image:       'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600',
        position:    1,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'Matcha Mood',
        slug:        'matcha-mood',
        description: 'Ceremonial grade matcha in classic and signature blends.',
        image:       'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600',
        position:    2,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'WKND Specials',
        slug:        'wknd-specials',
        description: 'Our signature drinks you will not find anywhere else in Lahore.',
        image:       'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600',
        position:    3,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'Frappe Club',
        slug:        'frappe-club',
        description: 'Thick, blended, indulgent frappes for when you need something extra.',
        image:       'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=600',
        position:    4,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'Soft-Sips',
        slug:        'soft-sips',
        description: 'Non-coffee drinks, chillers, teas and fruit-based refreshers.',
        image:       'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600',
        position:    5,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'Toasty Treats',
        slug:        'toasty-treats',
        description: 'Toasted sandwiches done right. Proper fillings, proper bread.',
        image:       'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600',
        position:    6,
        isActive:    true,
      }}),
      db.category.create({ data: {
        name:        'Desserts',
        slug:        'desserts',
        description: 'House-made cakes, brownies, cookies and pastries.',
        image:       'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
        position:    7,
        isActive:    true,
      }}),
    ]);
  console.log('✅ Categories created');

  const coffeeImg   = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600';
  const matchaImg   = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600';
  const icedImg     = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600';
  const frappeImg   = 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=600';
  const softImg     = 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600';
  const sandwichImg = 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600';
  const dessertImg  = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600';
  const cookieImg   = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600';
  const croissantImg= 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600';

  // ── PRODUCTS ────────────────────────────────────────────
  await db.product.createMany({ data: [

    // ── COFFEE ──────────────────────────────────────────
    { name:'Espresso',                slug:'espresso',                categoryId:coffee.id,   price:410,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','espresso','hot'],          description:'A pure, concentrated shot of single-origin espresso. Clean and unapologetic.' },
    { name:'Americano',               slug:'americano',               categoryId:coffee.id,   price:510,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','americano','hot','iced'],   description:'Espresso pulled long with hot water. Available hot or iced.' },
    { name:'Cortado',                 slug:'cortado',                 categoryId:coffee.id,   price:510,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','cortado','hot'],            description:'Equal parts espresso and warm steamed milk. Simple and perfect.' },
    { name:'Flat White',              slug:'flat-white',              categoryId:coffee.id,   price:710,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:true,  tags:['coffee','flat white','bestseller'],  description:'Double ristretto with silky microfoam. Strong and smooth.' },
    { name:'Latte',                   slug:'latte',                   categoryId:coffee.id,   price:710,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','hot'],             description:'Classic espresso with steamed whole milk and a touch of foam.' },
    { name:'Cappuccino',              slug:'cappuccino',              categoryId:coffee.id,   price:710,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','cappuccino','hot'],        description:'Espresso, steamed milk and a generous cap of velvety foam.' },
    { name:'Spanish Latte',           slug:'spanish-latte',           categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:true,  tags:['coffee','latte','spanish','bestseller'], description:'Sweetened condensed milk layered with espresso. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Vanilla Latte',           slug:'vanilla-latte',           categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','vanilla'],         description:'Espresso with vanilla syrup and steamed milk. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Hazelnut Latte',          slug:'hazelnut-latte',          categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','hazelnut'],        description:'Rich hazelnut syrup with espresso and steamed milk. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Caramel Latte',           slug:'caramel-latte',           categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','caramel'],         description:'Warm caramel with espresso and steamed milk. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Popcorn Latte',           slug:'popcorn-latte',           categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','popcorn','unique'], description:'Our fun, buttery popcorn-flavoured latte. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Mocha Latte',             slug:'mocha-latte',             categoryId:coffee.id,   price:910,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','mocha','chocolate'],description:'Dark chocolate and espresso with steamed milk. Hot Rs. 910 | Iced Rs. 960.' },
    { name:'Tiramisu Latte',          slug:'tiramisu-latte',          categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','tiramisu'],        description:'Inspired by the Italian classic. Hot Rs. 810 | Iced Rs. 1210.' },
    { name:'Cinnamon Coconut Latte',  slug:'cinnamon-coconut-latte',  categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','cinnamon','coconut'], description:'Warming cinnamon with coconut milk and espresso. Hot Rs. 810 | Iced Rs. 910.' },
    { name:'Mocha Hazelnut Latte',    slug:'mocha-hazelnut-latte',    categoryId:coffee.id,   price:810,  images:[coffeeImg],    stock:99, isAvailable:true, isFeatured:false, tags:['coffee','latte','mocha','hazelnut'], description:'Dark chocolate meets hazelnut in this rich latte. Hot Rs. 810 | Iced Rs. 1210.' },
    { name:'Slow Bar (V60 / Aeropress)', slug:'slow-bar',             categoryId:coffee.id,   price:1010, images:[coffeeImg],   stock:99, isAvailable:true, isFeatured:false, tags:['coffee','pour over','specialty','slow bar'], description:'Single origin, brewed to order. V60 or Aeropress — your choice.' },

    // ── MATCHA MOOD ─────────────────────────────────────
    { name:'Matcha Latte',                slug:'matcha-latte',                categoryId:matcha.id, price:910,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:true,  tags:['matcha','latte','iced','hot'],           description:'Ceremonial grade matcha with steamed milk. Available hot or iced.' },
    { name:'Vanilla Bean Matcha',         slug:'vanilla-bean-matcha',         categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:false, tags:['matcha','vanilla'],                     description:'Matcha with Tahitian vanilla bean. Smooth, earthy and sweet.' },
    { name:'Mango Matcha',                slug:'mango-matcha',                categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:true,  tags:['matcha','mango','tropical','bestseller'],description:'Ceremonial matcha layered with fresh mango — a tropical twist.' },
    { name:'Strawberry Matcha',           slug:'strawberry-matcha',           categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:false, tags:['matcha','strawberry'],                  description:'Earthy matcha paired with sweet strawberry. Iced perfection.' },
    { name:'Coconut Matcha',              slug:'coconut-matcha',              categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:false, tags:['matcha','coconut'],                     description:'Ceremonial matcha with coconut milk. Creamy, tropical, refreshing.' },
    { name:'Banana Bread Matcha',         slug:'banana-bread-matcha',         categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:false, tags:['matcha','banana'],                      description:'Matcha with banana and a hint of warm spice. Cosy in a cup.' },
    { name:'Dragon Fruit Strawberry Matcha', slug:'dragon-fruit-matcha',     categoryId:matcha.id, price:960,  images:[matchaImg], stock:99, isAvailable:true, isFeatured:false, tags:['matcha','dragon fruit','strawberry'],   description:'Vibrant dragon fruit and strawberry layered with ceremonial matcha.' },

    // ── WKND SPECIALS ────────────────────────────────────
    { name:'Iced Creme Brulee Latte',          slug:'iced-creme-brulee-latte',     categoryId:specials.id, price:1310, images:[icedImg], stock:99, isAvailable:true, isFeatured:true,  tags:['special','iced','creme brulee','bestseller','signature'], description:'Espresso with creme brulee syrup, vanilla and milk over ice. Rich and indulgent.' },
    { name:'Iced Cheesecake Latte',            slug:'iced-cheesecake-latte',       categoryId:specials.id, price:1310, images:[icedImg], stock:99, isAvailable:true, isFeatured:true,  tags:['special','iced','cheesecake','bestseller','signature'],  description:'A latte that tastes like dessert — cheesecake meets espresso over ice.' },
    { name:'Pistachio Latte',                  slug:'pistachio-latte',             categoryId:specials.id, price:1310, images:[icedImg], stock:99, isAvailable:true, isFeatured:true,  tags:['special','pistachio','signature','bestseller'],          description:'Our premium pistachio latte. Iced Rs. 1310 | Hot Rs. 1710.' },
    { name:'WKND Bling',                       slug:'wknd-bling',                  categoryId:specials.id, price:810,  images:[icedImg], stock:99, isAvailable:true, isFeatured:false, tags:['special','signature','bling'],                           description:'Our signature house drink. Ask the team what is in it today.' },
    { name:'Hot Chocolate',                    slug:'hot-chocolate',               categoryId:specials.id, price:860,  images:[coffeeImg],stock:99, isAvailable:true, isFeatured:false, tags:['hot chocolate','chocolate','non-coffee'],               description:'Rich Belgian chocolate melted into steamed milk.' },
    { name:'Kunafa Hot Chocolate',             slug:'kunafa-hot-chocolate',        categoryId:specials.id, price:1310, images:[coffeeImg],stock:99, isAvailable:true, isFeatured:true,  tags:['special','kunafa','hot chocolate','signature'],          description:'Hot chocolate elevated with kunafa flavour. Our most talked-about drink.' },

    // ── FRAPPE CLUB ──────────────────────────────────────
    { name:'Vanilla Frappe',            slug:'vanilla-frappe',            categoryId:frappes.id, price:1210, images:[frappeImg], stock:99, isAvailable:true, isFeatured:false, tags:['frappe','vanilla','blended'],            description:'Classic vanilla frappe, thick and perfectly blended.' },
    { name:'Salted Caramel Frappe',     slug:'salted-caramel-frappe',     categoryId:frappes.id, price:1210, images:[frappeImg], stock:99, isAvailable:true, isFeatured:false, tags:['frappe','caramel','salted','bestseller'],description:'Sweet and salty caramel frappe. A guaranteed crowd-pleaser.' },
    { name:'Dark Choco Mocha Frappe',   slug:'dark-choco-mocha-frappe',   categoryId:frappes.id, price:1510, images:[frappeImg], stock:99, isAvailable:true, isFeatured:false, tags:['frappe','chocolate','mocha'],            description:'Dark chocolate and mocha blended into a rich, indulgent frappe.' },
    { name:'Pistachio Frappe',          slug:'pistachio-frappe',          categoryId:frappes.id, price:1710, images:[frappeImg], stock:99, isAvailable:true, isFeatured:true,  tags:['frappe','pistachio','premium','bestseller'],description:'Premium pistachio frappe — our most requested frozen drink.' },
    { name:'Pistachio Coconut Frappe',  slug:'pistachio-coconut-frappe',  categoryId:frappes.id, price:1710, images:[frappeImg], stock:99, isAvailable:true, isFeatured:false, tags:['frappe','pistachio','coconut'],          description:'Pistachio and coconut blended to tropical perfection.' },

    // ── SOFT-SIPS ────────────────────────────────────────
    { name:'Peach Ice Tea',               slug:'peach-ice-tea',               categoryId:softSips.id, price:610,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','tea','peach','iced'],          description:'Light and refreshing peach-infused iced tea.' },
    { name:'Raspberry Chiller',           slug:'raspberry-chiller',           categoryId:softSips.id, price:760,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','raspberry','chiller'],         description:'Tangy raspberry blended with ice and sparkling water.' },
    { name:'Kiwi Green Apple',            slug:'kiwi-green-apple',            categoryId:softSips.id, price:760,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','kiwi','apple','chiller'],      description:'Bright kiwi and crisp green apple — a refreshing combo.' },
    { name:'Wild-berry Chiller',          slug:'wild-berry-chiller',          categoryId:softSips.id, price:810,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','berry','chiller'],             description:'Mixed wild berries blended into an iced refresher.' },
    { name:'Mango Pineapple Chiller',     slug:'mango-pineapple-chiller',     categoryId:softSips.id, price:810,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','mango','pineapple','tropical'],description:'Tropical mango and pineapple chilled to perfection.' },
    { name:'Yuzu Passion Fruit Chiller',  slug:'yuzu-passion-fruit-chiller',  categoryId:softSips.id, price:810,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','yuzu','passion fruit'],        description:'Zingy yuzu with sweet passion fruit — our most refreshing summer sip.' },
    { name:'Strawberry Cheese Smoothie',  slug:'strawberry-cheese-smoothie',  categoryId:softSips.id, price:810,  images:[softImg], stock:99, isAvailable:true, isFeatured:true,  tags:['non-coffee','strawberry','smoothie','unique'],description:'A unique strawberry and cream cheese smoothie — sweet, creamy, addictive.' },
    { name:'Cardamom Tea',                slug:'cardamom-tea',                categoryId:softSips.id, price:360,  images:[softImg], stock:99, isAvailable:true, isFeatured:false, tags:['non-coffee','tea','cardamom','hot'],        description:'Warming cardamom-spiced tea. A classic done right.' },

    // ── TOASTY TREATS ────────────────────────────────────
    { name:'Pesto Chicken Sandwich',      slug:'pesto-chicken-sandwich',      categoryId:food.id, price:1260, images:[sandwichImg], stock:50, isAvailable:true, isFeatured:false, tags:['sandwich','chicken','pesto','food'],       description:'Grilled chicken with house-made pesto on toasted sourdough.' },
    { name:'Chipotle Chicken Sandwich',   slug:'chipotle-chicken-sandwich',   categoryId:food.id, price:1310, images:[sandwichImg], stock:50, isAvailable:true, isFeatured:true,  tags:['sandwich','chicken','chipotle','bestseller'],description:'Smoky chipotle grilled chicken on a toasted roll. Our most popular food item.' },
    { name:'Chicken Croissant Sandwich',  slug:'chicken-croissant-sandwich',  categoryId:food.id, price:1360, images:[sandwichImg], stock:50, isAvailable:true, isFeatured:false, tags:['sandwich','chicken','croissant'],          description:'Tender chicken in a buttery toasted croissant. Indulgent and satisfying.' },
    { name:'Roast Beef Sandwich',         slug:'roast-beef-sandwich',         categoryId:food.id, price:1360, images:[sandwichImg], stock:50, isAvailable:true, isFeatured:false, tags:['sandwich','beef','roast beef'],            description:'Slow roasted beef on toasted bread with house sauce and greens.' },

    // ── DESSERTS ─────────────────────────────────────────
    { name:'Lisbon Cake',                          slug:'lisbon-cake',                         categoryId:desserts.id, price:760,  images:[dessertImg],  stock:20, isAvailable:true, isFeatured:true,  tags:['dessert','cake','signature','bestseller'], description:'Our signature Lisbon-inspired custard cake. Rich and creamy.' },
    { name:'Carrot Cake',                          slug:'carrot-cake',                         categoryId:desserts.id, price:710,  images:[dessertImg],  stock:20, isAvailable:true, isFeatured:false, tags:['dessert','cake','carrot'],                description:'Moist, spiced carrot cake with cream cheese frosting.' },
    { name:'WKND Brownie',                         slug:'wknd-brownie',                        categoryId:desserts.id, price:510,  images:[cookieImg],   stock:30, isAvailable:true, isFeatured:true,  tags:['dessert','brownie','bestseller','chocolate'],description:'Our fudgy, dense chocolate brownie. Warm and perfect with coffee.' },
    { name:'Chocolate Cookie',                     slug:'chocolate-cookie',                    categoryId:desserts.id, price:430,  images:[cookieImg],   stock:30, isAvailable:true, isFeatured:false, tags:['dessert','cookie','chocolate'],           description:'Chocolate or double chocolate cookie, baked fresh.' },
    { name:'Hazelnut Chocolate Cheesecake',        slug:'hazelnut-chocolate-cheesecake',       categoryId:desserts.id, price:910,  images:[dessertImg],  stock:15, isAvailable:true, isFeatured:false, tags:['dessert','cheesecake','hazelnut','premium'],description:'Decadent hazelnut chocolate cheesecake. A truly premium slice.' },
    { name:'Pistachio Kunafa Chocolate Brownie',   slug:'pistachio-kunafa-chocolate-brownie',  categoryId:desserts.id, price:910,  images:[dessertImg],  stock:15, isAvailable:true, isFeatured:true,  tags:['dessert','pistachio','kunafa','signature','bestseller'],description:'Our famous pistachio kunafa chocolate brownie — the most instagrammed item.' },
    { name:'Butter Croissant',                     slug:'butter-croissant',                    categoryId:desserts.id, price:810,  images:[croissantImg],stock:20, isAvailable:true, isFeatured:false, tags:['dessert','croissant','pastry','baked'],   description:'Classic French croissant baked fresh. Flaky, buttery, simple.' },
  ]});
  console.log('✅ Products created (52 items across 7 categories)');

  // Banners
  await db.banner.createMany({ data: [
    {
      type:'HERO', title:"What's better than a weekend?", subtitle:"Lahore's only ODK café — DHA Raya",
      image:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1400',
      link:'/menu', position:1, isActive:true,
    },
    {
      type:'PROMO', title:'WKND Specials', subtitle:'Creme Brulee Latte, Kunafa Hot Chocolate and more.',
      image:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200',
      link:'/menu?category=wknd-specials', position:1, isActive:true,
    },
  ]});

  // Welcome coupon
  await db.coupon.create({ data: {
    code:'WKND10', type:'PERCENTAGE', value:10,
    minOrderAmount:1000, isActive:true, maxUses:1000, usedCount:0,
  }});

  console.log('');
  console.log('🎉 WKND Coffee seeded! 52 items, 7 categories.');
  console.log('   Admin: admin@wkndcoffee.pk / WkndAdmin2026!');
  console.log('   Coupon: WKND10 (10% off over Rs.1,000)');
}

main().catch(console.error).finally(() => db.$disconnect());