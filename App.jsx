import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaTimes,
} from "react-icons/fa";


const IMG = (id, w = 400, h = 400) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=contain&bg=ffffff&auto=format&q=85`;

const PRODUCTS = [
  { id:1,  title:"Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price:549,  oldPrice:749,  category:"Electronics", rating:4.8, reviews:12847, image:IMG("photo-1505740420928-5e560c06d30e"), badges:["Prime","Sale"], prime:true },
  { id:2,  title:"Apple iPhone 15 Pro 256GB Natural Titanium",             price:1899, oldPrice:2099, category:"Electronics", rating:4.9, reviews:8563,  image:IMG("photo-1592750475338-74b7b21085ab"), badges:["Prime","New"],  prime:true },
  { id:3,  title:"Nike Air Max 270 React Sneakers – Black/White",          price:219,  oldPrice:299,  category:"Fashion",     rating:4.6, reviews:3421,  image:IMG("photo-1542291026-7eec264c27ff"), badges:["Sale"],         prime:false },
  { id:4,  title:"Instant Pot Duo 7-in-1 Electric Pressure Cooker 6qt",   price:189,  oldPrice:249,  category:"Home",        rating:4.7, reviews:24901, image:IMG("photo-1584568694244-14fbdf83bd30"), badges:["Prime","Sale"], prime:true },
  { id:5,  title:"The Psychology of Money by Morgan Housel – Bestseller",  price:79,   oldPrice:149,  category:"Books",       rating:4.9, reviews:45210, image:IMG("photo-1544716278-ca5e3f4abd8c"), badges:["Prime"],        prime:true },
  { id:6,  title:'Samsung 27" 4K UHD IPS Monitor with USB-C 65W',         price:799,  oldPrice:999,  category:"Electronics", rating:4.5, reviews:6732,  image:IMG("photo-1527443224154-c4a573d55272"), badges:["Sale"],         prime:false },
  { id:7,  title:"Adidas Ultraboost 23 Running Shoes – Womens",            price:279,  oldPrice:399,  category:"Fashion",     rating:4.7, reviews:2198,  image:IMG("photo-1608231387042-66d1773070a5"), badges:["Prime"],        prime:true },
  { id:8,  title:"LEGO Technic Land Rover Defender 2573 Pieces",           price:699,  oldPrice:899,  category:"Sports",      rating:4.8, reviews:9012,  image:IMG("photo-1558618666-fcd25c85cd64"), badges:["Prime","New"],  prime:true },
  { id:9,  title:"Logitech MX Master 3S Wireless Mouse – Graphite",        price:149,  oldPrice:199,  category:"Electronics", rating:4.9, reviews:18430, image:IMG("photo-1527864550417-7fd91fc51a46"), badges:["Prime"],        prime:true },
  { id:10, title:"KitchenAid Stand Mixer 4.8L – Empire Red",               price:1299, oldPrice:1699, category:"Home",        rating:4.8, reviews:31200, image:IMG("photo-1556909114-f6e7ad7d3136"), badges:["Sale","Prime"],  prime:true },
  { id:11, title:"Atomic Habits by James Clear – Hardcover Edition",       price:99,   oldPrice:199,  category:"Books",       rating:4.9, reviews:78320, image:IMG("photo-1589829085413-56de8ae18c73"), badges:["Prime"],        prime:true },
  { id:12, title:"Wilson Pro Staff RF97 Tennis Racket",                    price:449,  oldPrice:599,  category:"Sports",      rating:4.6, reviews:1876,  image:IMG("photo-1617083934555-ac7c5a6d5870"), badges:["Sale"],         prime:false },
];

const CATEGORIES = [
  { name:"Deals",                filter:"all",         image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Deals_Spring_shovelor_Lowres._CB564592108_.jpg" },
  { name:"Books",                filter:"Books",       image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Books_Spring_shovelor_Lowres._CB564592108_.jpg" },
  { name:"Electronics",          filter:"Electronics", image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Electronics_Spring_shovelor_lowres._CB564592108_.jpg" },
  { name:"Health & Personal Care",filter:"Home",       image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/HPC_Spring_shovelor_Hires0.5x._CB799931608_.jpg" },
  { name:"Jewellery",            filter:"Fashion",     image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Jewellery_Spring_shovelor_Lowres._CB564592108_.jpg" },
  { name:"Toys & Games",         filter:"Sports",      image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Toys_and_Games_Spring_shovelor_Lowres._CB564592108_.jpg" },
  { name:"Baby",                 filter:"Home",        image:"https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler/Baby_Spring_shovelor_LowRes._CB564592108_.jpg" },
];

const AMZ = "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/Homepage2024/SpringRefresh/BubbleShoveler";

const HERO_BANNERS = [
  "https://m.media-amazon.com/images/I/71ozDzBc3zL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/618bHGowYbL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71pT27NckBL._SX3000_.jpg",
];

const HOME_PANELS = [
  {
    title: "Shop Headphones & Speakers",
    filter: "Electronics",
    items: [
      { label: "Headphones", image: `${AMZ}/Electronics_Spring_shovelor_lowres._CB564592108_.jpg` },
      { label: "Portable Speakers", image: `${AMZ}/Electronics_Spring_shovelor_lowres._CB564592108_.jpg` },
      { label: "Home Audio", image: `${AMZ}/Electronics_Spring_shovelor_lowres._CB564592108_.jpg` },
      { label: "Earbuds", image: `${AMZ}/Electronics_Spring_shovelor_lowres._CB564592108_.jpg` },
    ],
  },
  {
    title: "Shop deals on Lighting",
    filter: "deals",
    single: `${AMZ}/Deals_Spring_shovelor_Lowres._CB564592108_.jpg`,
  },
  {
    title: "Shop Home & Kitchen",
    filter: "Home",
    items: [
      { label: "Home Décor", image: `${AMZ}/Baby_Spring_shovelor_LowRes._CB564592108_.jpg` },
      { label: "Kitchen Tools", image: `${AMZ}/Baby_Spring_shovelor_LowRes._CB564592108_.jpg` },
      { label: "Kitchen Appliances", image: `${AMZ}/Baby_Spring_shovelor_LowRes._CB564592108_.jpg` },
      { label: "Bedding", image: `${AMZ}/Baby_Spring_shovelor_LowRes._CB564592108_.jpg` },
    ],
  },
];



const CSS = `
  *, *::before, *::after {
   box-sizing: 
   border-box; 
   margin: 0;
    padding: 0;
     }
  :root {
    --amz-navy: #131921;
     --amz-subnav: #232f3e; 
     --amz-orange: #ff6201;
    --amz-orange-dark: #e47911; 
    --amz-orange-light: #febd69; 
    --amz-blue: #007185;
    --amz-green: #007600;
     --amz-bg: #eaeded;
      --amz-white: #ffffff;
    --amz-gray: #dddddd;
     --amz-dark-gray: #555555;
     --amz-text: #0f1111;
    --amz-red: #B12704;
  }
  body { font-family: Arial, Helvetica, sans-serif; background: var(--amz-bg); color: var(--amz-text); font-size: 14px; min-height: 100vh; }
  .dark { --amz-bg:#1a1a2e; --amz-white:#16213e; --amz-text:#e0e0e0; --amz-gray:#2a2a3e; --amz-dark-gray:#aaaaaa; }
  .dark .nav, .dark .nav-sub { filter: brightness(0.9); }
  .dark .product-card, .dark .filter-bar, .dark .reco-card,
  .dark .cart-panel, .dark .checkout-modal, .dark .panel-card { background:#16213e; border-color:#2a2a3e; }
  .dark .hero-banner { background: linear-gradient(135deg,#b35e00,#8a4500) !important; }
  .dark .cart-item { border-color:#2a2a3e; }
  .dark select,.dark input[type=text],.dark input[type=email],.dark input[type=password],.dark input[type=range]
    { background:#0f3460; color:var(--amz-text); border-color:#2a2a3e; }
  .dark .order-summary-mini { background:#0f3460; }
  .dark .modal-overlay { background:rgba(0,0,0,0.85); }
  .dark .continue-btn { background:#16213e; color:var(--amz-text); border-color:#2a2a3e; }
  .dark .delivery-opt { border-color:#2a2a3e; }
  .dark .delivery-opt.selected { background:#0f3460; }
  .dark .signin-btn { background:var(--amz-orange); }

  .nav { background:var(--amz-navy); color:#fff; position:sticky; top:0; z-index:1000; }
  .nav-main { display:flex; align-items:center; gap:6px; padding:6px 12px; max-width:1500px; margin:0 auto; min-height:58px; }
  .logo { cursor:pointer; border:1px solid transparent; padding:6px 8px; border-radius:2px; user-select:none; flex-shrink:0; background:transparent; display:flex; align-items:flex-start; overflow:visible; }
  .logo:hover { border-color:#fff; }
  .logo-brand { display:flex; flex-direction:column; align-items:flex-start; line-height:1; overflow:visible; }
  .logo-text-row { display:flex; align-items:baseline; gap:0; }
  .logo-word { color:#fff; font-size:24px; font-weight:700; letter-spacing:-0.6px; font-family:Arial,Helvetica,sans-serif; }
  .logo-domain { color:#fff; font-size:11px; font-weight:400; margin-left:1px; }
  .logo-smile { width:96px; height:24px; min-height:24px; margin-top:2px; display:block; overflow:visible; flex-shrink:0; }
  .nav-location { display:flex; align-items:center; gap:4px; color:#fff; cursor:pointer; border:1px solid transparent; border-radius:2px; padding:4px 6px; white-space:nowrap; flex-shrink:0; }
  .nav-location:hover { border-color:#fff; }
  .nav-location-text small { display:block; font-size:11px; color:#ccc; }
  .nav-location-text strong { display:block; font-size:13px; font-weight:700; }
  .search-wrap { flex:1; display:flex; min-width:0; border-radius:4px; overflow:hidden; border:2px solid transparent; }
  .search-wrap:focus-within { border-color:var(--amz-orange-light); }
  .search-cat { background:#f3f3f3; border:none; padding:0 8px; font-size:12px; color:#333; height:40px; cursor:pointer; white-space:nowrap; flex-shrink:0; border-right:1px solid #ccc; }
  .search-input { flex:1; height:40px; border:none; outline:none; padding:0 12px; font-size:14px; min-width:0; }
  .search-btn { background:var(--amz-orange); border:none; height:40px; width:48px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; transition:background 0.2s; }
  .search-btn:hover { background:var(--amz-orange-dark); }
  .nav-actions { display:flex; align-items:center; gap:2px; flex-shrink:0; }
  .nav-btn { color:#fff; padding:6px 8px; border-radius:2px; border:1px solid transparent; cursor:pointer; background:none; line-height:1.3; white-space:nowrap; text-align:left; }
  .nav-btn:hover { border-color:#fff; }
  .nav-btn small { display:block; font-size:11px; color:#ccc; }
  .nav-btn strong { display:block; font-size:13px; font-weight:700; }
  .cart-btn { position:relative; }
  .cart-inner { display:flex; align-items:center; gap:4px; }
  .cart-icon { font-size:26px; line-height:1; }
  .cart-inner strong { font-size:14px; font-weight:700; }
  .cart-count { position:absolute; top:0; left:22px; color:var(--amz-orange); font-weight:700; font-size:13px; border-radius:50%; width:20px; height:22px; display:flex; align-items:center; justify-content:center; }
  .dark-mode-toggle { background:transparent; border:1px solid transparent; cursor:pointer; padding:5px 6px; border-radius:4px; display:inline-flex; align-items:center; }
  .dark-mode-toggle:hover { border-color:#fff; }
  .dark-mode-track { width:52px; height:26px; border-radius:999px; background:#4f5c6b; border:1px solid rgba(255,255,255,0.2); position:relative; display:flex; align-items:center; justify-content:space-between; padding:0 7px; }
  .dark-mode-icon { font-size:11px; line-height:1; z-index:1; color:#fff; }
  .dark-mode-thumb { position:absolute; top:2px; left:2px; width:20px; height:20px; border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.35); transition:transform 0.2s ease; }
  .dark .dark-mode-track { background:#1f7a5a; }
  .dark .dark-mode-thumb { transform:translateX(26px); }
  .nav-sub { background:var(--amz-subnav); padding:0 12px; display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .nav-sub-links { display:flex; align-items:center; gap:0; overflow-x:auto; scrollbar-width:none; flex:1; }
  .nav-sub-links::-webkit-scrollbar { display:none; }
  .nav-sub a { color:#fff; font-size:13px; white-space:nowrap; cursor:pointer; padding:8px 10px; border:1px solid transparent; border-radius:2px; display:inline-block; transition:border-color 0.15s; text-decoration:none; }
  .nav-sub a:hover { border-color:#fff; }
  .nav-sub-all { font-weight:700; }
  .nav-sub-highlight { color:var(--amz-orange-light); }
  .nav-sub-side { flex-shrink:0; background:var(--amz-orange); border:none; border-left:1px solid rgba(255,255,255,0.35); color:#fff; font-size:20px; font-weight:700; line-height:1; cursor:pointer; padding:8px 14px; white-space:nowrap; border-radius:3px; }

  .hero-banner { background-color:#eaeded; color:#fff; padding:0; position:relative; overflow:hidden; min-height:clamp(180px,22vw,380px); background-size:cover; background-position:center 12%; background-repeat:no-repeat; }
  .hero-banner::after { content:""; position:absolute; left:0; right:0; bottom:0; height:100px; background:linear-gradient(to bottom,rgba(234,237,237,0),var(--amz-bg)); pointer-events:none; }
  .hero-left { flex:1; min-width:0; }
  .hero-title { font-size:56px; font-weight:800; color:#fff; margin-bottom:10px; line-height:1.1; text-shadow:0 1px 2px rgba(0,0,0,0.15); }
  .hero-sub { font-size:18px; color:#fff; margin-bottom:14px; }
  .hero-price-tag { font-size:14px; color:rgba(255,255,255,0.9); text-decoration:underline; cursor:pointer; }
  .hero-products { display:flex; gap:10px; align-items:flex-end; flex-shrink:0; }
  .hero-products img { width:140px; height:140px; object-fit:contain; border-radius:4px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25)); }
  .hero-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.85); border:1px solid #ddd; color:#111; font-size:18px; width:42px; height:84px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; z-index:2; box-shadow:0 1px 3px rgba(0,0,0,0.12); }
  .hero-nav:hover { background:#fff; }
  .hero-prev { left:0; border-radius:0 4px 4px 0; }
  .hero-next { right:0; border-radius:4px 0 0 4px; }

  .panel-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; max-width:1500px; margin:-86px auto 12px; padding:0 12px; position:relative; z-index:3; }
  .panel-card { background:var(--amz-white); border-radius:4px; padding:14px 12px 12px; display:flex; flex-direction:column; gap:12px; box-shadow:0 1px 2px rgba(0,0,0,0.14); }
  .panel-title { font-size:18px; font-weight:700; color:var(--amz-text); line-height:1.2; }
  .panel-items { display:grid; grid-template-columns:1fr 1fr; gap:8px; flex:1; }
  .panel-item { cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:6px; }
  .panel-item img { width:100%; height:120px; object-fit:contain; border-radius:2px; background:#fff; padding:4px; transition:opacity 0.15s; }
  .panel-item:hover img { opacity:0.92; }
  .panel-item span { font-size:12px; color:var(--amz-text); text-align:center; }
  .panel-single { flex:1; cursor:pointer; }
  .panel-single img { width:100%; height:292px; object-fit:contain; border-radius:2px; background:#fff; padding:8px; }
  .panel-more { font-size:13px; color:var(--amz-blue); cursor:pointer; margin-top:auto; text-decoration:none; display:block; }
  .panel-more:hover { color:var(--amz-orange-dark); text-decoration:underline; }
  .panel-promo { gap:14px; }
  .signin-btn { background:var(--amz-orange); border:none; border-radius:16px; padding:8px; width:100%; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.2s; color:#111; }
  .signin-btn:hover { background:var(--amz-orange-dark); color:#fff; }
  .promo-box { background:#f0fce1; border-radius:4px; padding:14px; flex:1; display:flex; flex-direction:column; gap:8px; }
  .promo-headline { font-size:18px; font-weight:700; line-height:1.3; color:#111; }
  .promo-code-pill { background:var(--amz-orange); color:#fff; border-radius:4px; padding:5px 10px; font-size:12px; display:inline-block; width:fit-content; }
  .promo-note { font-size:12px; color:var(--amz-dark-gray); }
  .promo-imgs { display:flex; gap:8px; margin-top:6px; }
  .promo-imgs img { flex:1; height:65px; object-fit:cover; border-radius:3px; }

  .section { max-width:1500px; margin:12px auto; padding:0 12px; }
  .section-card { background:var(--amz-white); border-radius:4px; border:1px solid #e3e6e6; box-shadow:0 1px 2px rgba(15,17,17,0.06); padding:16px; }
  .section-title { font-size:22px; font-weight:700; margin-bottom:14px; }
  .categories-grid { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:10px; }
  .category-card { background:transparent; border:none; border-radius:0; padding:4px 2px; cursor:pointer; text-align:center; transition:transform 0.2s; }
  .category-card:hover { transform:translateY(-2px); }
  .category-card.active { transform:translateY(-2px); }
  .category-thumb { width:110px; height:110px; border-radius:50%; object-fit:cover; display:block; margin:0 auto 8px; border:2px solid transparent; background:#fff; }
  .category-card.active .category-thumb { border-color:var(--amz-orange); }
  .category-card h3 { font-size:14px; font-weight:700; }

  .filter-bar { background:transparent; border:1px solid var(--amz-gray); border-radius:4px; padding:12px 16px; margin-bottom:14px; display:flex; flex-wrap:wrap; gap:14px; align-items:center; }
  .filter-group { display:flex; align-items:center; gap:8px; }
  .filter-bar label { font-size:13px; font-weight:600; color:var(--amz-dark-gray); white-space:nowrap; }
  .filter-bar select { border:1px solid var(--amz-gray); border-radius:4px; padding:6px 10px; font-size:13px; cursor:pointer; background:var(--amz-white); color:var(--amz-text); }
  .filter-bar input[type=range] { width:120px; cursor:pointer; }
  .price-display { font-size:13px; font-weight:700; color:var(--amz-orange-dark); min-width:70px; }
  .active-filter { background:var(--amz-orange-light); padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600; color:#333; }
  .clear-filter-btn { font-size:12px; cursor:pointer; color:var(--amz-blue); background:none; border:none; text-decoration:underline; }

  .products-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
  @media(min-width:768px){.products-grid{grid-template-columns:repeat(3,1fr);}}
  @media(min-width:1024px){.products-grid{grid-template-columns:repeat(4,1fr);}}
  @media(min-width:1280px){.products-grid{grid-template-columns:repeat(5,1fr);}}
  .product-card { background:var(--amz-white); border:1px solid #e3e6e6; border-radius:0; overflow:hidden; transition:box-shadow 0.15s; display:flex; flex-direction:column; }
  .product-card:hover { box-shadow:0 4px 14px rgba(15,17,17,0.18); }
  .product-img-wrap { position:relative; background:#fff; padding:12px 8px; display:flex; align-items:center; justify-content:center; height:200px; overflow:hidden; }
  .product-img-wrap img { max-height:170px; max-width:100%; width:100%; object-fit:contain; transition:transform 0.25s ease; }
  .product-card:hover .product-img-wrap img { transform:scale(1.03); }
  .badge-wrap { position:absolute; top:8px; left:8px; display:flex; flex-direction:column; gap:3px; z-index:1; }
  .badge { font-size:10px; font-weight:700; padding:2px 7px; border-radius:3px; letter-spacing:0.3px; }
  .badge-sale { background:var(--amz-red); color:#fff; }
  .badge-prime { background:#00A8E0; color:#fff; }
  .badge-new { background:var(--amz-green); color:#fff; }
  .wishlist-btn { position:absolute; top:8px; right:8px; background:#fff; border:1px solid var(--amz-gray); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:11px; transition:all 0.2s; z-index:1; }
  .wishlist-btn:hover { border-color:var(--amz-orange); }
  .wishlist-btn.active { color:var(--amz-red); border-color:var(--amz-red); }
  .product-info { padding:12px; flex:1; display:flex; flex-direction:column; gap:4px; }
  .product-title { font-size:13px; font-weight:500; line-height:1.4; flex:1; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .stars { color:#ff6201; font-size:13px; }
  .rating-count { color:var(--amz-blue); font-size:11px; margin-left:4px; }
  .product-price { margin:4px 0 8px; }
  .price-old { color:var(--amz-dark-gray); text-decoration:line-through; font-size:12px; }
  .price-now { font-size:20px; font-weight:700; color:var(--amz-red); display:block; }
  .prime-tag { color:#00A8E0; font-size:11px; font-weight:700; }
  .add-btn { background:var(--amz-orange); border:none; border-radius:20px; padding:8px 12px; font-size:13px; font-weight:600; cursor:pointer; width:100%; transition:background 0.2s; }
  .add-btn:hover { background:var(--amz-orange-dark); }
  .added-btn { background:#e7f7e7; color:var(--amz-green); border:1px solid var(--amz-green); border-radius:20px; padding:8px 12px; font-size:13px; font-weight:600; width:100%; text-align:center; }

  .reco-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:10px; }
  .reco-card { background:var(--amz-white); border:1px solid var(--amz-gray); border-radius:4px; padding:10px; cursor:pointer; transition:all 0.2s; }
  .reco-card:hover { box-shadow:0 3px 12px rgba(0,0,0,0.12); transform:translateY(-1px); }
  .reco-card img { width:100%; height:110px; object-fit:contain; background:#fff; border-radius:0; margin-bottom:8px; padding:6px; }
  .reco-title { font-size:12px; font-weight:500; line-height:1.3; margin-bottom:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .reco-price { font-size:13px; font-weight:700; color:var(--amz-red); }

  .cart-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:2000; }
  .cart-panel { position:fixed; right:0; top:0; bottom:0; width:400px; max-width:100vw; background:var(--amz-white); z-index:2001; box-shadow:-4px 0 24px rgba(0,0,0,0.2); display:flex; flex-direction:column; transform:translateX(100%); transition:transform 0.3s ease; }
  .cart-panel.open { transform:translateX(0); }
  .cart-header { background:var(--amz-navy); color:#fff; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
  .cart-header h2 { font-size:17px; }
  .cart-close { background:none; border:none; color:#fff; font-size:22px; cursor:pointer; line-height:1; padding:4px 8px; }
  .cart-close:hover { opacity:0.7; }
  .cart-body { flex:1; overflow-y:auto; padding:16px; }
  .cart-empty { text-align:center; padding:48px 20px; color:var(--amz-dark-gray); }
  .cart-item { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--amz-gray); }
  .cart-item img { width:64px; height:64px; object-fit:contain; background:#f7f7f7; border-radius:4px; flex-shrink:0; }
  .cart-item-info { flex:1; min-width:0; }
  .cart-item-title { font-size:13px; font-weight:500; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cart-item-price { color:var(--amz-red); font-weight:700; font-size:15px; }
  .qty-controls { display:flex; align-items:center; gap:6px; margin-top:6px; }
  .qty-btn { background:var(--amz-gray); border:none; width:26px; height:26px; border-radius:50%; cursor:pointer; font-size:16px; font-weight:700; display:flex; align-items:center; justify-content:center; transition:background 0.15s; }
  .qty-btn:hover { background:var(--amz-orange-light); }
  .qty-display { font-weight:700; min-width:22px; text-align:center; }
  .remove-btn { background:none; border:none; color:var(--amz-blue); font-size:12px; cursor:pointer; margin-left:auto; align-self:flex-start; text-decoration:underline; }
  .remove-btn:hover { color:var(--amz-red); }
  .cart-footer { border-top:2px solid var(--amz-gray); padding:16px; flex-shrink:0; }
  .subtotal-line { display:flex; justify-content:space-between; align-items:center; font-size:15px; font-weight:700; margin-bottom:14px; }
  .subtotal-amount { color:var(--amz-red); font-size:22px; }
  .checkout-btn { background:var(--amz-orange); border:none; border-radius:4px; padding:13px; width:100%; font-size:15px; font-weight:700; cursor:pointer; margin-bottom:8px; transition:background 0.2s; }
  .checkout-btn:hover { background:var(--amz-orange-dark); }
  .continue-btn { background:var(--amz-white); border:1px solid var(--amz-gray); border-radius:4px; padding:10px; width:100%; font-size:14px; cursor:pointer; transition:background 0.2s; }
  .continue-btn:hover { background:var(--amz-bg); }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:3000; display:flex; align-items:center; justify-content:center; padding:16px; }
  .checkout-modal { background:var(--amz-white); border-radius:8px; max-width:560px; width:100%; max-height:90vh; overflow-y:auto; padding:28px; }
  .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--amz-gray); padding-bottom:14px; }
  .modal-header h2 { font-size:20px; font-weight:700; }
  .modal-close { background:none; border:none; font-size:22px; cursor:pointer; color:var(--amz-dark-gray); }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
  .form-row.full { grid-template-columns:1fr; }
  .form-group label { display:block; font-size:12px; font-weight:600; color:var(--amz-dark-gray); margin-bottom:4px; }
  .form-group input,.form-group select { width:100%; border:1px solid var(--amz-gray); border-radius:4px; padding:9px 12px; font-size:14px; background:var(--amz-white); color:var(--amz-text); transition:border-color 0.2s,box-shadow 0.2s; }
  .form-group input:focus,.form-group select:focus { outline:none; border-color:var(--amz-orange); box-shadow:0 0 0 2px rgba(255,153,0,0.2); }
  .delivery-options { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:12px 0; }
  .delivery-opt { border:2px solid var(--amz-gray); border-radius:6px; padding:12px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:10px; }
  .delivery-opt:hover { border-color:var(--amz-orange-light); }
  .delivery-opt.selected { border-color:var(--amz-orange); background:#fffbf2; }
  .opt-icon { font-size:13px; font-weight:700; background:var(--amz-gray); padding:4px 6px; border-radius:4px; }
  .opt-name { font-weight:600; font-size:13px; }
  .opt-desc { font-size:11px; color:var(--amz-dark-gray); }
  .order-summary-mini { background:var(--amz-bg); border-radius:6px; padding:14px; margin-bottom:16px; }
  .order-summary-mini h4 { font-size:14px; font-weight:700; margin-bottom:10px; }
  .summary-item { display:flex; justify-content:space-between; font-size:13px; margin-bottom:5px; color:var(--amz-dark-gray); }
  .summary-total { display:flex; justify-content:space-between; font-weight:700; font-size:15px; border-top:1px solid var(--amz-gray); padding-top:8px; margin-top:8px; }
  .place-order-btn { background:var(--amz-orange); border:none; border-radius:4px; padding:14px; width:100%; font-size:16px; font-weight:700; cursor:pointer; margin-top:16px; transition:background 0.2s; }
  .place-order-btn:hover { background:var(--amz-orange-dark); }
  .auth-meta { margin-top:14px; background:var(--amz-bg); border-radius:6px; padding:12px; font-size:13px; color:var(--amz-dark-gray); }
  .auth-actions { display:flex; gap:10px; margin-top:16px; }
  .auth-actions .continue-btn,.auth-actions .place-order-btn { margin-top:0; }
  .confirm-screen { text-align:center; padding:32px 20px; }
  .confirm-title { font-size:22px; font-weight:700; margin-bottom:8px; color:var(--amz-green); }
  .confirm-num { font-size:13px; color:var(--amz-dark-gray); margin-bottom:12px; }
  .continue-shopping { background:var(--amz-orange); border:none; border-radius:4px; padding:12px 26px; font-size:14px; font-weight:700; cursor:pointer; margin-top:14px; transition:background 0.2s; }
  .continue-shopping:hover { background:var(--amz-orange-dark); }

  .wishlist-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:12px; }
  .wishlist-empty { text-align:center; padding:60px 20px; color:var(--amz-dark-gray); }

  .toast { position:fixed; bottom:24px; right:24px; background:var(--amz-navy); color:#fff; padding:12px 20px; border-radius:6px; font-size:13px; font-weight:600; z-index:9999; transform:translateY(100px); opacity:0; transition:all 0.3s ease; max-width:300px; border-left:3px solid var(--amz-orange); }
  .toast.show { transform:translateY(0); opacity:1; }

  .back-btn { background:var(--amz-orange-light); border:none; border-radius:4px; padding:8px 16px; font-size:13px; font-weight:600; cursor:pointer; margin-bottom:16px; display:inline-flex; align-items:center; gap:6px; transition:background 0.2s; }
  .back-btn:hover { background:var(--amz-orange); }

  .footer { background:#232f3e; color:#fff; margin-top:32px; }
  .footer-top-bar { background:#37475a; padding:14px; text-align:center; cursor:pointer; transition:background 0.2s; }
  .footer-top-bar:hover { background:#485769; }
  .footer-top-bar a { color:#fff; font-size:13px; cursor:pointer; }
  .footer-links { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; max-width:1200px; margin:0 auto; padding:32px 24px; }
  .footer-col h4 { font-size:15px; font-weight:700; margin-bottom:14px; color:#fff; }
  .footer-col a { display:block; font-size:13px; color:#bbb; margin-bottom:8px; cursor:pointer; text-decoration:none; }
  .footer-col a:hover { color:#fff; text-decoration:underline; }
  .footer-bottom { background:var(--amz-navy); padding:20px; text-align:center; }
  .footer-bottom p { font-size:12px; color:#888; }
  .footer-legal { display:flex; gap:40px; flex-wrap:wrap; justify-content:center; margin-bottom:12px; }
  .footer-legal p { font-size:12px; color:#888; }

  @media(max-width:1100px){.panel-grid{grid-template-columns:repeat(2,1fr);margin-top:-70px;}.products-grid{grid-template-columns:repeat(3,1fr);}.categories-grid{grid-template-columns:repeat(4,1fr);}}
  @media(max-width:800px){.panel-grid{grid-template-columns:repeat(2,1fr);margin-top:12px;}.products-grid{grid-template-columns:repeat(2,1fr);}.categories-grid{grid-template-columns:repeat(3,1fr);}.hero-title{font-size:26px;}.hero-banner{min-height:240px;padding-bottom:24px;}.hero-products img{width:90px;height:90px;}.footer-links{grid-template-columns:repeat(2,1fr);}.nav-location{display:none;}}
  @media(max-width:600px){.nav-main{flex-wrap:wrap;}.search-wrap{order:3;flex-basis:100%;}.nav-btn small{display:none;}.cart-panel{width:100vw;}.form-row{grid-template-columns:1fr;}.delivery-options{grid-template-columns:1fr;}.panel-grid{grid-template-columns:1fr;}.section-card{padding:12px;}.hero-products{display:none;}.nav-sub-side{display:none;}}
  @media(max-width:420px){.products-grid{grid-template-columns:1fr;}.categories-grid{grid-template-columns:repeat(2,1fr);}.footer-links{grid-template-columns:1fr;}}
`;



const fmtRating = r => `${r.toFixed(1)}/5`;
const randId    = () => "AMZ-" + Math.floor(Math.random() * 9000000 + 1000000);

function AmazonLogo() {
  return (
    <div className="logo-brand">
      <span className="logo-text-row">
        <span className="logo-word">amazon</span>
        <span className="logo-domain">.co.za</span>
      </span>
      <svg
        className="logo-smile"
        viewBox="0 0 96 28"
        width="96"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M5 18 C28 8, 52 8, 75 16"
          fill="none"
          stroke="#FF9900"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path d="M71 12 L90 17 L71 22 Z" fill="#FF9900" />
      </svg>
    </div>
  );
}

function Toast({ msg }) {
  return <div className={`toast${msg ? " show" : ""}`}>{msg}</div>;
}

function ProductCard({ p, cart, wishlist, onAddToCart, onToggleWishlist }) {
  const inCart = cart.find(c => c.id === p.id);
  const inWish = wishlist.includes(p.id);
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <div className="badge-wrap">
          {p.badges.map(b => (
            <span key={b} className={`badge badge-${b.toLowerCase()}`}>{b}</span>
          ))}
        </div>
        <img src={p.image} alt={p.title} loading="lazy" />
        <button
          className={`wishlist-btn${inWish ? " active" : ""}`}
          onClick={e => { e.stopPropagation(); onToggleWishlist(p.id); }}
          title={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >{inWish ? "Saved" : "Save"}
        </button>
      </div>
      <div className="product-info">
        <div className="product-title">{p.title}</div>
        <div>
          <span className="stars">{fmtRating(p.rating)}</span>
          <span className="rating-count">({p.reviews.toLocaleString()})</span>
        </div>
        <div className="product-price">
          <span className="price-old">R{p.oldPrice.toLocaleString()}</span><br />
          <span className="price-now"><small>R</small>{p.price.toLocaleString()}</span>
          {p.prime && <><br /><span className="prime-tag">FREE Prime Delivery</span></>}
        </div>
        {inCart
          ? <div className="added-btn">In Cart (×{inCart.qty})</div>
          : <button className="add-btn" onClick={() => onAddToCart(p.id)}>Add to Cart</button>
        }
      </div>
    </div>
  );
}

function CartPanel({ open, cart, onClose, onChangeQty, onRemove, onCheckout }) {
  const sub      = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const qty      = cart.reduce((s, i) => s + i.qty, 0);
  const delivery = sub > 500 ? 0 : 99;
  const total    = sub + delivery;
  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-panel${open ? " open" : ""}`}>
        <div className="cart-header">
          <h2>Your Basket</h2>
          <button type="button" className="cart-close" onClick={onClose} aria-label="Close basket"><FaTimes /></button>
        </div>
        <div className="cart-body">
          {!cart.length
            ? <div className="cart-empty">
                <FaShoppingCart style={{fontSize:52,marginBottom:14}} aria-hidden />
                <p style={{fontSize:15,fontWeight:600,marginBottom:6}}>Your basket is empty!</p>
                <p style={{fontSize:13,color:"var(--amz-dark-gray)"}}>Add some products to get started.</p>
                <button onClick={onClose} className="add-btn" style={{marginTop:18,maxWidth:200,borderRadius:4}}>Keep Shopping</button>
              </div>
            : cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">R{(item.price * item.qty).toLocaleString()}</div>
                    <div style={{fontSize:11,color:"var(--amz-dark-gray)"}}>R{item.price.toLocaleString()} each</div>
                    <div className="qty-controls">
                      <button type="button" className="qty-btn" onClick={() => onChangeQty(item.id, -1)} aria-label="Decrease quantity"><FaMinus /></button>
                      <span className="qty-display">{item.qty}</span>
                      <button type="button" className="qty-btn" onClick={() => onChangeQty(item.id, 1)} aria-label="Increase quantity"><FaPlus /></button>
                      <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{fontSize:13,color:"var(--amz-dark-gray)",marginBottom:8}}>
              {delivery === 0
                ? <>You qualify for <strong>FREE delivery</strong>.</>
                : `Spend R${(500-sub).toFixed(0)} more for free delivery`}
            </div>
            <div className="subtotal-line">
              <span>Subtotal ({qty} item{qty!==1?"s":""}):</span>
              <span className="subtotal-amount">R{total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
            <button className="continue-btn" onClick={onClose}>Keep Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}

function CheckoutModal({ cart, onClose, onPlaceOrder }) {
  const [fname, setFname]       = useState("");
  const [lname, setLname]       = useState("");
  const [email, setEmail]       = useState("");
  const [address, setAddress]   = useState("");
  const [city, setCity]         = useState("");
  const [postal, setPostal]     = useState("");
  const [delivery, setDelivery] = useState("standard");
  const [ordered, setOrdered]   = useState(false);
  const [orderNum, setOrderNum] = useState("");

  const sub      = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const deliveryCost = sub > 500 ? 0 : 99;
  const total    = sub + deliveryCost;

  const place = () => {
    if (!fname.trim() || !email.trim()) { alert("Please fill in your name and email!"); return; }
    const num = randId();
    setOrderNum(num);
    setOrdered(true);
    onPlaceOrder();
  };

  if (ordered) return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <div className="confirm-screen">
          <FaCheckCircle style={{fontSize:64,marginBottom:16,color:"var(--amz-green)"}} aria-hidden />
          <h2 className="confirm-title">Order Placed Successfully!</h2>
          <p className="confirm-num">Order number: <strong>{orderNum}</strong></p>
          <p style={{color:"var(--amz-dark-gray)",fontSize:14,lineHeight:1.6}}>
            Thank you, {fname}! A confirmation has been sent to {email}.<br/>
            Estimated delivery: 3–5 business days.
          </p>
          <div style={{marginTop:16,padding:12,background:"var(--amz-bg)",borderRadius:6,fontSize:13,color:"var(--amz-dark-gray)"}}>
            Your items are being prepared for shipment.
          </div>
          <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <div className="modal-header">
          <h2>Checkout</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
        </div>
        <div className="order-summary-mini">
          <h4>Order Summary</h4>
          {cart.map(i => (
            <div className="summary-item" key={i.id}>
              <span>{i.title.slice(0,38)}{i.title.length>38?"…":""} ×{i.qty}</span>
              <span>R{(i.price*i.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-item">
            <span>Delivery</span>
            <span>{deliveryCost===0?<span style={{color:"var(--amz-green)",fontWeight:700}}>FREE</span>:`R${deliveryCost}`}</span>
          </div>
          <div className="summary-total">
            <span>Total</span><span style={{color:"var(--amz-red)"}}>R{total.toLocaleString()}</span>
          </div>
        </div>
        <h3 style={{marginBottom:12,fontSize:15,fontWeight:700}}>Shipping Details</h3>
        <div className="form-row">
          <div className="form-group"><label>First Name *</label><input type="text" value={fname} onChange={e=>setFname(e.target.value)} placeholder="Jane"/></div>
          <div className="form-group"><label>Last Name *</label><input type="text" value={lname} onChange={e=>setLname(e.target.value)} placeholder="Doe"/></div>
        </div>
        <div className="form-row full"><div className="form-group"><label>Email Address *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@example.com"/></div></div>
        <div className="form-row full"><div className="form-group"><label>Street Address *</label><input type="text" value={address} onChange={e=>setAddress(e.target.value)} placeholder="123 Main Street"/></div></div>
        <div className="form-row">
          <div className="form-group"><label>City *</label><input type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder="Cape Town"/></div>
          <div className="form-group"><label>Postal Code *</label><input type="text" value={postal} onChange={e=>setPostal(e.target.value)} placeholder="8001"/></div>
        </div>
        <h3 style={{margin:"16px 0 10px",fontSize:15,fontWeight:700}}>Delivery Option</h3>
        <div className="delivery-options">
          <div className={`delivery-opt${delivery==="standard"?" selected":""}`} onClick={()=>setDelivery("standard")}>
            <span className="opt-icon">STD</span>
            <div className="opt-info"><div className="opt-name">Standard Delivery</div><div className="opt-desc">3–5 business days • {deliveryCost===0?"FREE":"R"+deliveryCost}</div></div>
          </div>
          <div className={`delivery-opt${delivery==="express"?" selected":""}`} onClick={()=>setDelivery("express")}>
            <span className="opt-icon">EXP</span>
            <div className="opt-info"><div className="opt-name">Express Delivery</div><div className="opt-desc">Next business day • R149</div></div>
          </div>
        </div>
        <button className="place-order-btn" onClick={place}>Place Order — R{total.toLocaleString()}</button>
      </div>
    </div>
  );
}

function AuthModal({ user, onClose, onSignIn, onSignOut }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const doSignIn = () => {
    if (!name.trim() || !email.trim() || !password.trim()) { alert("Please fill in all sign-in fields"); return; }
    onSignIn({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={e => e.stopPropagation()}>
        {user
          ? <>
              <div className="modal-header"><h2>Account</h2><button type="button" className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button></div>
              <p style={{fontSize:15,fontWeight:700,marginBottom:8}}>Signed in as {user.name}</p>
              <p style={{fontSize:13,color:"var(--amz-dark-gray)"}}>Email: {user.email}</p>
              <div className="auth-meta">You're signed in on this device. Session is saved in localStorage.</div>
              <div className="auth-actions">
                <button className="continue-btn" onClick={onClose}>Close</button>
                <button className="place-order-btn" onClick={onSignOut}>Sign out</button>
              </div>
            </>
          : <>
              <div className="modal-header"><h2>Sign In</h2><button type="button" className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button></div>
              <div className="form-row full"><div className="form-group"><label>Full Name *</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe"/></div></div>
              <div className="form-row full"><div className="form-group"><label>Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@example.com"/></div></div>
              <div className="form-row full"><div className="form-group"><label>Password *</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password"/></div></div>
              <button className="place-order-btn" onClick={doSignIn}>Sign In</button>
              <div className="auth-meta">Demo auth only: no backend, saved locally.</div>
            </>
        }
      </div>
    </div>
  );
}

export default function App() {
  const [cart,     setCart]     = useState(() => { try { return JSON.parse(localStorage.getItem("amz_cart") || "[]"); } catch { return []; } });
  const [wishlist, setWishlist] = useState(() => { try { return JSON.parse(localStorage.getItem("amz_wishlist") || "[]"); } catch { return []; } });
  const [user,     setUser]     = useState(() => { try { return JSON.parse(localStorage.getItem("amz_user") || "null"); } catch { return null; } });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("amz_dark") === "1");

  const [page,         setPage]         = useState("home");
  const [cartOpen,     setCartOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen,     setAuthOpen]     = useState(false);
  const [toast,        setToast]        = useState("");
  const [heroIdx,      setHeroIdx]      = useState(0);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [currentFilter,setCurrentFilter]= useState("all");
  const [currentSort,  setCurrentSort]  = useState("");
  const [maxPrice,     setMaxPrice]     = useState(2000);
  const toastTimer = useRef(null);
  const heroTimer  = useRef(null);

  useEffect(() => { localStorage.setItem("amz_cart",     JSON.stringify(cart));     }, [cart]);
  useEffect(() => { localStorage.setItem("amz_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("amz_user",     JSON.stringify(user));     }, [user]);
  useEffect(() => { localStorage.setItem("amz_dark",     darkMode ? "1" : "0");     }, [darkMode]);

  useEffect(() => {
    heroTimer.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_BANNERS.length), 4500);
    return () => clearInterval(heroTimer.current);
  }, []);

  const resetHeroTimer = () => {
    clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_BANNERS.length), 4500);
  };

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const getFiltered = () => PRODUCTS
    .filter(p => {
      if (currentFilter !== "all" && p.category !== currentFilter) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (currentSort === "price-asc")  return a.price - b.price;
      if (currentSort === "price-desc") return b.price - a.price;
      if (currentSort === "rating")     return b.rating - a.rating;
      return 0;
    });

  const filterCat = (cat) => { setCurrentFilter(cat); setSearchQuery(""); setPage("home"); };
  const clearFilters = () => { setCurrentFilter("all"); setCurrentSort(""); setMaxPrice(2000); setSearchQuery(""); };

  const addToCart = (id) => {
    const p = PRODUCTS.find(x => x.id === id);
    setCart(prev => {
      const ex = prev.find(x => x.id === id);
      if (ex) return prev.map(x => x.id === id ? {...x, qty: x.qty + 1} : x);
      return [...prev, {...p, qty: 1}];
    });
    showToast(`"${p.title.slice(0, 32)}…" added to basket`);
  };
  const removeFromCart = (id) => { setCart(prev => prev.filter(x => x.id !== id)); showToast("Item removed from basket"); };
  const changeQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(x => x.id === id ? {...x, qty: x.qty + delta} : x);
      return updated.filter(x => x.qty > 0);
    });
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) { setWishlist(prev => prev.filter(x => x !== id)); showToast("Removed from wishlist"); }
    else { setWishlist(prev => [...prev, id]); showToast("Added to wishlist"); }
  };

  const signIn  = (u)  => { setUser(u); showToast(`Welcome ${u.name}! Signed in successfully`); setAuthOpen(false); };
  const signOut = ()   => { setUser(null); showToast("Signed out"); setAuthOpen(false); };

  const heroBanner = HERO_BANNERS[heroIdx];
  const filtered = getFiltered();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className={darkMode ? "dark" : ""} style={{minHeight:"100vh",background:"var(--amz-bg)",color:"var(--amz-text)"}}>
      <style>{CSS}</style>
      <Toast msg={toast} />

      <CartPanel
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => { setCheckoutOpen(false); setCart([]); setPage("home"); }}
          onPlaceOrder={() => setCart([])}
        />
      )}

      {/* Auth Modal */}
      {authOpen && (
        <AuthModal
          user={user}
          onClose={() => setAuthOpen(false)}
          onSignIn={signIn}
          onSignOut={signOut}
        />
      )}

      <nav className="nav">
        <div className="nav-main">
          <div className="logo" onClick={() => setPage("home")}>
            <AmazonLogo />
          </div>
          <div className="nav-location" onClick={() => showToast("Location is demo only")}>
            <FaMapMarkerAlt style={{fontSize:14,flexShrink:0}} aria-hidden />
            <div className="nav-location-text">
              <small>Delivering to Cape Town 7505</small>
              <strong>Update location</strong>
            </div>
          </div>
          <div className="search-wrap">
            <select className="search-cat">
              <option>All</option><option>Electronics</option><option>Fashion</option>
              <option>Home</option><option>Books</option><option>Sports</option>
            </select>
            <input
              className="search-input"
              type="text"
              placeholder="Search Amazon.co.za"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage("home"); }}
            />
            <button type="button" className="search-btn" aria-label="Search"><FaSearch /></button>
          </div>
          <div className="nav-actions">
            <button className="dark-mode-toggle" onClick={() => setDarkMode(d => !d)} title="Toggle dark mode">
              <span className="dark-mode-track">
                <span className="dark-mode-icon">L</span>
                <span className="dark-mode-icon">D</span>
                <span className="dark-mode-thumb" />
              </span>
            </button>
            <button className="nav-btn" onClick={() => setPage("wishlist")}>
              <small>Saved items</small><strong>Wishlist</strong>
            </button>
            <button className="nav-btn" onClick={() => setAuthOpen(true)}>
              <small>{user?.name ? `Hello, ${user.name}` : "Hello, sign in"}</small>
              <strong style={{display:"inline-flex",alignItems:"center",gap:4}}>Account &amp; Lists <FaChevronDown size={10} aria-hidden /></strong>
            </button>
            <button className="nav-btn" onClick={() => showToast("Orders page is demo only")}>
              <small>Returns</small><strong>&amp; Orders</strong>
            </button>
            <button className="nav-btn cart-btn" onClick={() => setCartOpen(true)}>
              <div className="cart-inner">
                <span className="cart-count">{cartCount}</span>
                <span className="cart-icon"><FaShoppingCart aria-hidden /></span>
                <strong>Basket</strong>
              </div>
            </button>
          </div>
        </div>
        <div className="nav-sub">
          <div className="nav-sub-links">
            <a className="nav-sub-all" onClick={() => filterCat("all")}>All</a>
            <a onClick={() => showToast("Customer Service is demo only")}>Customer Service</a>
            <a onClick={() => setPage("deals")}>Today's Deals</a>
            <a onClick={() => showToast("Keep Shopping is demo only")}>Keep Shopping for</a>
            <a onClick={() => showToast("Everyday Essentials is demo only")}>Everyday Essentials</a>
            <a onClick={() => filterCat("Books")}>Best Sellers</a>
            <a onClick={() => showToast("Shop Mzansi is demo only")}>Shop Mzansi</a>
            <a onClick={() => showToast("Gift Cards is demo only")}>Gift Cards</a>
            <a onClick={() => showToast("Sell is demo only")}>Sell</a>
            <a className="nav-sub-highlight" onClick={() => showToast("Welcome!")}>Welcome to Amazon.co.za</a>
          </div>
          <button className="nav-sub-side" onClick={() => showToast("Everyday Essentials")}>Everyday Essentials</button>
        </div>
      </nav>

      {page === "home" && (
        <main style={{paddingBottom:8}}>
          {/* Hero */}
          <div className="hero-banner" style={{ backgroundImage: `url(${heroBanner})` }}>
            <button type="button" className="hero-nav hero-prev" onClick={() => { setHeroIdx(i => (i - 1 + HERO_BANNERS.length) % HERO_BANNERS.length); resetHeroTimer(); }} aria-label="Previous slide"><FaChevronLeft /></button>
            <button type="button" className="hero-nav hero-next" onClick={() => { setHeroIdx(i => (i + 1) % HERO_BANNERS.length); resetHeroTimer(); }} aria-label="Next slide"><FaChevronRight /></button>
          </div>

          <div className="panel-grid">
            <div className="panel-card">
              <h3 className="panel-title">Shop Headphones &amp; Speakers</h3>
              <div className="panel-items">
                {HOME_PANELS[0].items.map(item => (
                  <div className="panel-item" key={item.label} onClick={() => filterCat("Electronics")}>
                    <img src={item.image} alt={item.label} loading="lazy" /><span>{item.label}</span>
                  </div>
                ))}
              </div>
              <a className="panel-more" onClick={() => filterCat("Electronics")}>Discover more</a>
            </div>

            <div className="panel-card">
              <h3 className="panel-title">Shop deals on Lighting</h3>
              <div className="panel-single" onClick={() => setPage("deals")}>
                <img src={`${AMZ}/Deals_Spring_shovelor_Lowres._CB564592108_.jpg`} alt="Lighting deals" loading="lazy" />
              </div>
              <a className="panel-more" onClick={() => setPage("deals")}>Discover More</a>
            </div>

            <div className="panel-card">
              <h3 className="panel-title">Shop Home &amp; Kitchen</h3>
              <div className="panel-items">
                {HOME_PANELS[2].items.map(item => (
                  <div className="panel-item" key={item.label} onClick={() => filterCat("Home")}>
                    <img src={item.image} alt={item.label} loading="lazy" /><span>{item.label}</span>
                  </div>
                ))}
              </div>
              <a className="panel-more" onClick={() => filterCat("Home")}>Discover more</a>
            </div>

            <div className="panel-card panel-promo">
              <h3 className="panel-title">Sign in for your best experience</h3>
              <button className="signin-btn" onClick={() => setAuthOpen(true)}>Sign in securely</button>
              <div className="promo-box">
                <div className="promo-headline">Get 15% off your<br/>first order</div>
                <div className="promo-code-pill">Use Code: <strong>WELCOME15</strong></div>
                <div className="promo-note">No minimum spend.</div>
                <div className="promo-imgs">
                  <img src={`${AMZ}/Jewellery_Spring_shovelor_Lowres._CB564592108_.jpg`} alt="Promo" loading="lazy"/>
                  <img src={`${AMZ}/Toys_and_Games_Spring_shovelor_Lowres._CB564592108_.jpg`} alt="Promo" loading="lazy"/>
                </div>
              </div>
            </div>
          </div>

          <div className="section section-card">
            <h2 className="section-title">Shop our Categories</h2>
            <div className="categories-grid">
              {CATEGORIES.map(c => (
                <div className={`category-card${currentFilter === c.filter ? " active" : ""}`} key={c.name} onClick={() => filterCat(c.filter)}>
                  <img className="category-thumb" src={c.image} alt={c.name}/>
                  <h3>{c.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="section section-card">
            <div className="filter-bar">
              <div className="filter-group">
                <label>Sort by:</label>
                <select value={currentSort} onChange={e => setCurrentSort(e.target.value)}>
                  <option value="">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max Price:</label>
                <input type="range" min="10" max="2000" value={maxPrice} step="10" onChange={e => setMaxPrice(parseInt(e.target.value,10))}/>
                <span className="price-display">R{maxPrice.toLocaleString()}</span>
              </div>
              {currentFilter !== "all" && (
                <div className="filter-group">
                  <label>Filtering:</label>
                  <span className="active-filter">{currentFilter}</span>
                  <button onClick={clearFilters} className="clear-filter-btn">Clear</button>
                </div>
              )}
            </div>
          </div>

          <div className="section section-card" id="products">
            <h2 className="section-title">
              {searchQuery
                ? `Search: "${searchQuery}" — ${filtered.length} result${filtered.length!==1?"s":""}`
                : currentFilter !== "all"
                  ? `${currentFilter} (${filtered.length} products)`
                  : `Featured Products (${filtered.length})`}
            </h2>
            {filtered.length === 0
              ? <div style={{textAlign:"center",padding:"48px 20px",color:"var(--amz-dark-gray)"}}>
                  <FaSearch style={{fontSize:40,marginBottom:12,opacity:0.5}} aria-hidden />
                  <h3>No products found</h3>
                  <p style={{marginTop:8}}>Try different filters or a different search term.</p>
                  <button onClick={clearFilters} className="add-btn" style={{marginTop:16,maxWidth:200,borderRadius:4}}>Clear Filters</button>
                </div>
              : <div className="products-grid">
                  {filtered.map(p => (
                    <ProductCard key={p.id} p={p} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist}/>
                  ))}
                </div>
            }
          </div>

          <div className="section section-card">
            <h2 className="section-title" style={{display:"flex",alignItems:"center",gap:8}}><FaStar style={{color:"#FF9900"}} aria-hidden /> You May Also Like</h2>
            <div className="reco-grid">
              {[...PRODUCTS].sort(() => Math.random()-0.5).slice(0,6).map(p => (
                <div className="reco-card" key={p.id} onClick={() => filterCat(p.category)}>
                  <img src={p.image} alt={p.title}/>
                  <div className="reco-title">{p.title}</div>
                  <div className="reco-price">R{p.price.toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#FF9900"}}>{fmtRating(p.rating)} <span style={{color:"var(--amz-dark-gray)",fontSize:10}}>({p.reviews.toLocaleString()})</span></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {page === "wishlist" && (
        <div className="section" style={{paddingTop:16}}>
          <button type="button" className="back-btn" onClick={() => setPage("home")}><FaArrowLeft aria-hidden /> Back to Shopping</button>
          <h2 className="section-title">Your Wishlist</h2>
          {wishlist.length === 0
            ? <div className="wishlist-empty">
                <FaHeart style={{fontSize:52,marginBottom:12,color:"var(--amz-orange)"}} aria-hidden />
                <h3>Your wishlist is empty</h3>
                <p style={{marginTop:8}}>Click Save on any product to add it here.</p>
                <button onClick={() => setPage("home")} className="add-btn" style={{marginTop:18,maxWidth:220,borderRadius:4,display:"inline-block"}}>Start Shopping</button>
              </div>
            : <div className="wishlist-grid">
                {PRODUCTS.filter(p => wishlist.includes(p.id)).map(p => (
                  <ProductCard key={p.id} p={p} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist}/>
                ))}
              </div>
          }
        </div>
      )}

      {page === "deals" && (
        <div className="section" style={{paddingTop:16}}>
          <button type="button" className="back-btn" onClick={() => setPage("home")}><FaArrowLeft aria-hidden /> Back</button>
          <h2 className="section-title">Today's Hot Deals</h2>
          <div className="products-grid">
            {[...PRODUCTS].sort((a,b) => (b.oldPrice-b.price)-(a.oldPrice-a.price)).map(p => (
              <ProductCard key={p.id} p={p} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist}/>
            ))}
          </div>
        </div>
      )}

   
      <footer className="footer">
        <div className="footer-top-bar">
          <a onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>Back to top</a>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <a href="#">About Amazon</a><a href="#">Careers</a><a href="#">Press Releases</a>
          </div>
          <div className="footer-col">
            <h4>Make Money with Us</h4>
            <a href="#">Sell on Amazon</a><a href="#">Become an Affiliate</a><a href="#">Advertise Your Products</a>
          </div>
          <div className="footer-col">
            <h4>Payment Products</h4>
            <a href="#">Amazon Business Card</a><a href="#">Shop with Points</a><a href="#">Reload Your Balance</a>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <a href="#">Your Account</a><a href="#">Your Orders</a><a href="#">Help</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>Conditions of Use & Sale</p><p>Privacy Notice</p><p>Cookies Notice</p>
            <p>Legal Notice</p><p>Interest-Based Ads Notice</p>
          </div>
          <p>© 2026 Amazon.com clone, Inc or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}
