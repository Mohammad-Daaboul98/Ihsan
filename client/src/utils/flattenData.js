//for future
// const flattenData = (data, arrayKey, fieldsToInclude) => {
//     return data.flatMap((item) =>
//       item[arrayKey].map((nestedItem) => {
//         // Create a new object with the specified fields
//         const result = { ...fieldsToInclude.reduce((acc, field) => {
//           acc[field] = item[field];
//           return acc;
//         }, {}) };
        
//         // Merge in the nestedItem's fields
//         return { ...result, ...nestedItem };
//       })
//     );
//   };
  