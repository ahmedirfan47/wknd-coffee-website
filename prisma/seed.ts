import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('🌱 Seeding WKND Coffee database...');

  // Clear all existing data in correct order
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

  // ── Admin user ──────────────────────────────────────────
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
  console.log('✅ Admin user created');

  // ── Site settings ────────────────────────────────────────
  await db.siteSettings.create({
    data: {
      id:              'settings',
      siteName:        'WKND Coffee',
      tagline:         'Your Weekend, Every Day.',
      primaryPhone:    '+92 300 0000000',
      primaryEmail:    'hello@wkndcoffee.pk',
      whatsappNumber:  '+923000000000',
      deliveryFee:     150,
      freeDeliveryMin: 2500,
      instagramUrl:    'https://www.instagram.com/wkndcoffeeraya',
      facebookUrl:     'https://www.facebook.com/wkndcoffeeraya',
      aboutText:
        'WKND Coffee started with one obsession: great coffee. Set in the heart of DHA Raya, we built a space where every day feels like a long, unhurried weekend — good espresso, food worth sitting down for, and a room that earns your time. We source with care, brunch without a clock, and serve everything with the kind of attention that makes the difference between a good cafe and your regular.',
    },
  });
  console.log('✅ Site settings created');

  // ── Categories ───────────────────────────────────────────
  const [espresso, coldBrew, brunch, bites, pastries, smoothies] =
    await Promise.all([
      db.category.create({
        data: {
          name:        'Espresso Bar',
          slug:        'espresso-bar',
          description: 'Single origin espresso drinks crafted with precision.',
          image:       'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600',
          position:    1,
          isActive:    true,
        },
      }),
      db.category.create({
        data: {
          name:        'Cold Brew & Iced',
          slug:        'cold-brew-iced',
          description: 'Chilled, refreshing coffee for warm Lahore days.',
          image:       'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600',
          position:    2,
          isActive:    true,
        },
      }),
      db.category.create({
        data: {
          name:        'All-Day Brunch',
          slug:        'all-day-brunch',
          description: 'Brunch served all day — because weekends have no schedule.',
          image:       'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600',
          position:    3,
          isActive:    true,
        },
      }),
      db.category.create({
        data: {
          name:        'Light Bites',
          slug:        'light-bites',
          description: 'Sandwiches, salads and small plates done properly.',
          image:       'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600',
          position:    4,
          isActive:    true,
        },
      }),
      db.category.create({
        data: {
          name:        'Pastries & Bakes',
          slug:        'pastries-bakes',
          description: 'Baked fresh every morning in our kitchen.',
          image:       'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600',
          position:    5,
          isActive:    true,
        },
      }),
      db.category.create({
        data: {
          name:        'Smoothies & Shakes',
          slug:        'smoothies-shakes',
          description: 'Blended fruit smoothies and thick milkshakes.',
          image:       'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600',
          position:    6,
          isActive:    true,
        },
      }),
    ]);
  console.log('✅ Categories created');

  // ── Image placeholders ───────────────────────────────────
  const coffeeImg    = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600';
  const icedImg      = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600';
  const brunchImg    = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600';
  const toastImg     = 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?q=80&w=600';
  const sandwichImg  = 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600';
  const croissantImg = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600';
  const cakeImg      = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600';
  const smoothieImg  = 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600';

  // ── Products ─────────────────────────────────────────────
  await db.product.createMany({
    data: [

      // ESPRESSO BAR
      {
        name:        'Espresso',
        slug:        'espresso',
        description: 'A pure, concentrated shot of single-origin espresso. Clean, bold, and unapologetic.',
        price:       280,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['coffee', 'espresso'],
      },
      {
        name:        'Americano',
        slug:        'americano',
        description: 'Espresso pulled long with hot water. Clean and bold — for those who mean business.',
        price:       320,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['coffee', 'americano'],
      },
      {
        name:        'Flat White',
        slug:        'flat-white',
        description: 'Double ristretto with silky microfoam. Strong, smooth, and seriously good.',
        price:       380,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['coffee', 'bestseller', 'flat white'],
      },
      {
        name:        'Cappuccino',
        slug:        'cappuccino',
        description: 'Espresso, steamed milk and a thick cap of velvety foam. A timeless classic.',
        price:       380,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['coffee', 'cappuccino'],
      },
      {
        name:        'Caramel Latte',
        slug:        'caramel-latte',
        description: 'House espresso with warm caramel and steamed whole milk. Rich, sweet, satisfying.',
        price:       460,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['coffee', 'latte', 'caramel', 'signature'],
      },
      {
        name:        'WKND Signature Latte',
        slug:        'wknd-signature-latte',
        description: 'Brown sugar, cinnamon and double espresso with steamed oat milk. Our most-ordered drink.',
        price:       490,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['coffee', 'signature', 'bestseller', 'latte'],
      },
      {
        name:        'Hazelnut Mocha',
        slug:        'hazelnut-mocha',
        description: 'Dark chocolate, hazelnut and double espresso topped with steamed milk and cocoa dust.',
        price:       480,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['coffee', 'mocha', 'hazelnut'],
      },
      {
        name:        'Vanilla Cortado',
        slug:        'vanilla-cortado',
        description: 'Equal parts espresso and warm steamed milk with Tahitian vanilla. Simple. Perfect.',
        price:       420,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['coffee', 'cortado', 'vanilla'],
      },
      {
        name:        'Hot Chocolate',
        slug:        'hot-chocolate',
        description: 'Rich Belgian chocolate melted into steamed milk, finished with whipped cream.',
        price:       420,
        images:      [coffeeImg],
        categoryId:  espresso.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['hot chocolate', 'chocolate', 'non-coffee'],
      },

      // COLD BREW & ICED
      {
        name:        'Cold Brew',
        slug:        'cold-brew',
        description: '18-hour cold steeped single-origin. Smooth, low acid, intensely flavoured.',
        price:       480,
        images:      [icedImg],
        categoryId:  coldBrew.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['cold brew', 'iced', 'signature'],
      },
      {
        name:        'Iced Caramel Latte',
        slug:        'iced-caramel-latte',
        description: 'Double espresso over ice with salted caramel syrup and cold whole milk.',
        price:       490,
        images:      [icedImg],
        categoryId:  coldBrew.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['iced', 'latte', 'bestseller', 'caramel'],
      },
      {
        name:        'Iced Matcha Latte',
        slug:        'iced-matcha-latte',
        description: 'Ceremonial grade matcha whisked smooth with oat milk, poured over ice.',
        price:       490,
        images:      [icedImg],
        categoryId:  coldBrew.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['matcha', 'iced', 'non-coffee'],
      },
      {
        name:        'Iced Spanish Latte',
        slug:        'iced-spanish-latte',
        description: 'Sweetened condensed milk layered with double espresso and whole milk over ice.',
        price:       490,
        images:      [icedImg],
        categoryId:  coldBrew.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['iced', 'latte', 'spanish'],
      },
      {
        name:        'Brown Sugar Cold Brew',
        slug:        'brown-sugar-cold-brew',
        description: 'Cold brew shaken with house brown sugar syrup and poured over oat milk.',
        price:       520,
        images:      [icedImg],
        categoryId:  coldBrew.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['cold brew', 'iced', 'brown sugar'],
      },

      // ALL-DAY BRUNCH
      {
        name:        'WKND Big Breakfast',
        slug:        'wknd-big-breakfast',
        description: 'Eggs your way, turkey sausage, grilled tomato, sautéed mushrooms, hashbrowns and sourdough toast. The full spread.',
        price:       1750,
        images:      [brunchImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['brunch', 'bestseller', 'signature', 'full breakfast'],
      },
      {
        name:        'Eggs Benedict',
        slug:        'eggs-benedict',
        description: 'Two poached eggs on toasted English muffin with smoked turkey and hollandaise. Brunch done right.',
        price:       1350,
        images:      [brunchImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['brunch', 'eggs', 'bestseller'],
      },
      {
        name:        'Smashed Avocado Toast',
        slug:        'smashed-avocado-toast',
        description: 'Sourdough, smashed avocado, chilli flakes, poached egg, crumbled feta and dukkah. A proper classic.',
        price:       1150,
        images:      [toastImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['brunch', 'avocado', 'vegetarian', 'bestseller'],
      },
      {
        name:        'Shakshuka',
        slug:        'shakshuka',
        description: 'Two eggs poached in a spiced tomato and roasted pepper sauce, served with crusty bread.',
        price:       1100,
        images:      [brunchImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['brunch', 'eggs', 'vegetarian'],
      },
      {
        name:        'French Toast',
        slug:        'french-toast',
        description: 'Thick cut brioche French toast, fresh berries, maple syrup and whipped butter.',
        price:       1050,
        images:      [brunchImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['brunch', 'sweet', 'french toast'],
      },
      {
        name:        'Pancake Stack',
        slug:        'pancake-stack',
        description: 'Three fluffy buttermilk pancakes with seasonal fruit compote and maple butter.',
        price:       950,
        images:      [brunchImg],
        categoryId:  brunch.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['brunch', 'sweet', 'pancakes'],
      },

      // LIGHT BITES
      {
        name:        'WKND Club Sandwich',
        slug:        'wknd-club-sandwich',
        description: 'Triple decker with grilled chicken, turkey bacon, lettuce, heirloom tomato and chipotle mayo on toasted sourdough.',
        price:       1150,
        images:      [sandwichImg],
        categoryId:  bites.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['sandwich', 'bestseller', 'chicken'],
      },
      {
        name:        'BLT Baguette',
        slug:        'blt-baguette',
        description: 'Crisp turkey bacon, baby gem lettuce and heirloom tomato in a toasted French baguette with herb mayo.',
        price:       980,
        images:      [sandwichImg],
        categoryId:  bites.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['sandwich', 'baguette'],
      },
      {
        name:        'Grilled Chicken Salad',
        slug:        'grilled-chicken-salad',
        description: 'Charred chicken breast, rocket, shaved parmesan, croutons and Caesar dressing.',
        price:       1100,
        images:      [sandwichImg],
        categoryId:  bites.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['salad', 'chicken', 'healthy'],
      },
      {
        name:        'Loaded Fries',
        slug:        'loaded-fries',
        description: 'Crispy golden fries topped with melted cheese, pickled jalapeños, sour cream and spring onion.',
        price:       780,
        images:      [sandwichImg],
        categoryId:  bites.id,
        stock:       99,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['fries', 'snack', 'sharing'],
      },
      {
        name:        'Cheese Board',
        slug:        'cheese-board',
        description: 'Aged cheddar, brie and truffle gouda with fig jam, artisan crackers and seasonal fruit.',
        price:       1400,
        images:      [sandwichImg],
        categoryId:  bites.id,
        stock:       20,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['cheese', 'sharing', 'premium'],
      },

      // PASTRIES & BAKES
      {
        name:        'Butter Croissant',
        slug:        'butter-croissant',
        description: 'Classic French croissant baked fresh every morning. Flaky, buttery, made with laminated dough.',
        price:       380,
        images:      [croissantImg],
        categoryId:  pastries.id,
        stock:       30,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['pastry', 'croissant', 'baked'],
      },
      {
        name:        'Pain au Chocolat',
        slug:        'pain-au-chocolat',
        description: 'Buttery croissant dough wrapped around a core of dark Belgian chocolate. Warm from the oven.',
        price:       420,
        images:      [croissantImg],
        categoryId:  pastries.id,
        stock:       30,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['pastry', 'chocolate', 'bestseller'],
      },
      {
        name:        'Almond Croissant',
        slug:        'almond-croissant',
        description: 'Flaky croissant filled and generously topped with almond frangipane and toasted flaked almonds.',
        price:       450,
        images:      [croissantImg],
        categoryId:  pastries.id,
        stock:       30,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['pastry', 'almond', 'croissant'],
      },
      {
        name:        'Banana Bread',
        slug:        'banana-bread',
        description: 'House-made banana walnut bread, served warm with salted brown butter.',
        price:       360,
        images:      [cakeImg],
        categoryId:  pastries.id,
        stock:       20,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['bake', 'banana bread'],
      },
      {
        name:        'Cinnamon Roll',
        slug:        'cinnamon-roll',
        description: 'Pillowy soft cinnamon roll with cream cheese glaze. Baked fresh every morning.',
        price:       480,
        images:      [cakeImg],
        categoryId:  pastries.id,
        stock:       20,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['pastry', 'cinnamon', 'signature', 'bestseller'],
      },

      // SMOOTHIES & SHAKES
      {
        name:        'Mango & Passionfruit',
        slug:        'mango-passionfruit',
        description: 'Alphonso mango blended with passionfruit, banana and coconut water. Tropical and refreshing.',
        price:       720,
        images:      [smoothieImg],
        categoryId:  smoothies.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['smoothie', 'mango', 'tropical'],
      },
      {
        name:        'Berry Blast',
        slug:        'berry-blast',
        description: 'Mixed berries, Greek yogurt, raw honey and almond milk blended until perfectly smooth.',
        price:       750,
        images:      [smoothieImg],
        categoryId:  smoothies.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  false,
        tags:        ['smoothie', 'berry', 'healthy'],
      },
      {
        name:        'WKND Shake',
        slug:        'wknd-shake',
        description: 'Vanilla ice cream, double espresso, caramel sauce and toasted almond crumble. Our signature shake.',
        price:       850,
        images:      [smoothieImg],
        categoryId:  smoothies.id,
        stock:       50,
        isAvailable: true,
        isFeatured:  true,
        tags:        ['shake', 'signature', 'bestseller', 'coffee'],
      },
    ],
  });
  console.log('✅ Products created');

  // ── Banners ──────────────────────────────────────────────
  await db.banner.createMany({
    data: [
      {
        type:     'HERO',
        title:    'Your Weekend, Every Day.',
        subtitle: 'Specialty coffee & all-day brunch at DHA Raya, Lahore.',
        image:    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1400',
        link:     '/menu',
        position: 1,
        isActive: true,
      },
      {
        type:     'PROMO',
        title:    'All-Day Brunch',
        subtitle: 'Served 8am to close. Because good mornings have no deadline.',
        image:    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1200',
        link:     '/menu?category=all-day-brunch',
        position: 1,
        isActive: true,
      },
    ],
  });
  console.log('✅ Banners created');

  // ── Welcome coupon ───────────────────────────────────────
  await db.coupon.create({
    data: {
      code:           'WKND10',
      type:           'PERCENTAGE',
      value:          10,
      minOrderAmount: 1000,
      isActive:       true,
      maxUses:        500,
      usedCount:      0,
    },
  });
  console.log('✅ Welcome coupon WKND10 created');

  console.log('');
  console.log('🎉 WKND Coffee database seeded successfully!');
  console.log('');
  console.log('Admin login:');
  console.log('  Email:    admin@wkndcoffee.pk');
  console.log('  Password: WkndAdmin2026!');
  console.log('');
  console.log('Welcome coupon: WKND10 (10% off orders over Rs. 1,000)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });