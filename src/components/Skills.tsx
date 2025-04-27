// 'use client';

// import { motion } from 'framer-motion';

// const Skills = () => {
//   const skills = [
//     {
//       category: 'Frontend',
//       items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
//     },
//     {
//       category: 'Backend',
//       items: ['Node.js', 'Python', 'Express', 'Django', 'REST APIs'],
//     },
//     {
//       category: 'Cloud & DevOps',
//       items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
//     },
//     {
//       category: 'Database',
//       items: ['MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'Prisma'],
//     },
//   ];

//   return (
//     <section id="skills" className="py-20 bg-gray-900">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
//             Skills
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12"></div>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-12">
//           {skills.map((skill, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className="group w-72 h-80 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300"
//             >
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors">
//                   {skill.category}
//                 </h3>
//                 <div className="space-y-3">
//                   {skill.items.map((item, itemIndex) => (
//                     <motion.div
//                       key={itemIndex}
//                       whileHover={{ x: 10 }}
//                       className="flex items-center"
//                     >
//                       <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
//                       <span className="text-gray-300">{item}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;
'use client';

import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'Express', 'Django', 'REST APIs'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
    {
      category: 'Database',
      items: ['MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'Prisma'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12"></div>
        </motion.div>

        <div className="flex flex-wrap justify-around gap-y-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group w-64 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-6 text-white group-hover:text-purple-400 transition-colors underline underline-offset-4 decoration-purple-500">
                  {skill.category}
                </h3>
                <div className="flex flex-col space-y-3 flex-grow">
                  {skill.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;