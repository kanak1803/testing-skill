// import dynamic from "next/dynamic";

import Terms from "@/components/pages-menu/terms-and-conditions";

// export const metadata = {
//   title: 'Terms & Conditions',
//   description:
//     'Terms & Conditions',
  
// }



const index = () => {
  return (
    <>
      
      <Terms />
    </>
  );
};

export default index


// export default dynamic(() => Promise.resolve(index), { ssr: false });
