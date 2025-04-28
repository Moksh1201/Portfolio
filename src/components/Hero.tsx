// 'use client';

// import { motion } from 'framer-motion';
// import Scene from './Scene';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// const Hero = () => {
//   const [mounted, setMounted] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
//       <div className="absolute inset-0 z-0 opacity-70">
//         <Scene />
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-0"></div>
      
//       <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center space-y-16"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative w-40 h-40 mx-auto mb-12"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-0"
//             >
//               {!imageError && (
//                 <Image
//                   src="/tech-image.png"
//                   alt="Technology Circle"
//                   fill
//                   className="object-contain"
//                   onError={() => setImageError(true)}
//                   priority
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//               )}
//               {imageError && (
//                 <div className="absolute inset-0 rounded-full border-4 border-purple-500/50 animate-pulse"></div>
//               )}
//             </motion.div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
//                 <span className="text-3xl font-bold text-white">MM</span>
//               </div>
//             </div>
//           </motion.div>

//           <div className="space-y-8">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight"
//             >
//               Moksh Madaan
//             </motion.h1>
            
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
//             >
//               Software Engineer & Full Stack Developer
//             </motion.p>
//           </div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="flex flex-col sm:flex-row justify-center gap-8 mt-16"
//           >
//             <motion.a
//               href="#contact"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-purple-500/50 text-lg"
//             >
//               Get in Touch
//             </motion.a>
//             <motion.a
//               href="#projects"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-10 py-4 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-lg"
//             >
//               View Projects
//             </motion.a>
//           </motion.div>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, delay: 1 }}
//         className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
//       >
//         <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
//           <motion.div
//             animate={{ y: [0, 12, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-1.5 h-1.5 bg-white rounded-full"
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero; 
'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      
      {/* Background Particle Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* You can put your particles or background scene here */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        
        {/* Your Name Typing */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          <TypeAnimation
            sequence={[
              'Moksh Madaan',
              1000,
              '',
              500,
              'Moksh Madaan',
            ]}
            speed={50}
            repeat={Infinity}
          />
        </motion.h1>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl italic"
        >
          "Transforming ideas into reality through code and creativity."
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap gap-6 mt-10"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition px-2"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition"
          >
            View Projects
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
