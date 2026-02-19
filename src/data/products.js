// 1. Give each photo a unique name
import mimiImg from '../assets/product-images/mimi.jpg';
import beboImg from '../assets/product-images/bebo.jpg';
import bunnyImg from '../assets/product-images/bunny.jpg';
import princeImg from '../assets/product-images/prince.jpg';
import arnieImg from '../assets/product-images/arnie.jpg';
import chichiImg from '../assets/product-images/chichi.jpg';
import dukeImg from '../assets/product-images/duke.jpg';
import bogieImg from '../assets/product-images/bogie.jpg';
import simbaImg from '../assets/product-images/simba.jpg';

export const products = [
  { 
    id: 1, 
    name: "Mimi", 
    desc: "The perfect starter AI companion for kids.", 
    price: "₹5,999", 
    image: mimiImg, 
    video: "/videos/mimi-video.mp4",
    color: "bg-pink-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ] 
  },
  { 
    id: 2, 
    name: "Bebo", 
    desc: "Encourages crawling! Bunny hops away safely, motivating your little one to chase and move.", 
    price: "₹5,999", 
    image: beboImg,
    video: "/videos/bebo-video.mp4", 
    color: "bg-blue-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ] 
  },
  { 
    id: 3, 
    name: "Bunny", 
    desc: "Built tough for rough toddlers. Bunny loves the sandbox, mud, and being dropped. Totally unbreakable.", 
    price: "₹9,999", 
    image: bunnyImg,
    video: "/videos/bunny-video.mp4", 
    color: "bg-green-500",
    features: ["Screen-free fun", "Night Vision", "Parent Voice Cloning", "HD Camera", "Wifi Connected", "Educational content with saftey features" ]
  },
  { 
    id: 4, 
    name: "Prince", 
    desc: "Encourages crawling! motivating your little one to chase and move.", 
    price: "₹5,999", 
    image: princeImg, 
    video: "/videos/prince-video.mp4",
    color: "bg-purple-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ]
  },
  { 
    id: 5, 
    name: "Arnie", 
    desc: "A soft, huggable friend that glows gently. Plays calming lullabies to help your baby sleep better.", 
    price: "₹5,999", 
    image: arnieImg, 
    video: "/videos/arnie-video.mp4",
    color: "bg-yellow-600",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ]
  },
  { 
    id: 6, 
    name: "Chichi", 
    desc: "The party starter! Chichi plays nursery rhymes and spins around to get your toddler dancing.", 
    price: "₹5,999", 
    image: chichiImg, 
    video: "/videos/chichi-video.mp4",
    color: "bg-indigo-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ]
  },
  { 
    id: 7, 
    name: "Duke", 
    desc: "A smart guardian for the nursery. Duke alerts you if the baby cries and can play soothing sounds remotely.", 
    price: "₹5,999", 
    image: dukeImg, 
    video: "/videos/duke-video.mp4",
    color: "bg-gray-700",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ] 
  },
  { 
    id: 8, 
    name: "Bogie", 
    desc: "Screen-free learning. Teaches logic without screens.", 
    price: "₹5,999", 
    image: bogieImg, 
    video: "/videos/bogie-video.mp4",
    color: "bg-teal-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ]
  },
  { 
    id: 9, 
    name: "Simba", 
    desc: "A brave lion protector. Roars softly when picked up and guards the bedroom door from 'monsters'.", 
    price: "₹5,999", 
    image: simbaImg,
    video: "/videos/simba-video.mp4", 
    color: "bg-orange-500",
    features: ["Screen-free fun", "Sleep Companion", "Parent Voice Cloning", "Soft Touch Finish", "Wifi Connected", "Educational content with saftey features" ] 
  },
];