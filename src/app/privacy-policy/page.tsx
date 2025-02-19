// import dynamic from "next/dynamic";

import Terms from "@/components/pages-menu/privacy-policy";

// export const metadata = {
//   title: 'Terms || Superio - Job Borad React NextJS Template',
//   description:
//     'Superio - Job Borad React NextJS Template',
  
// }



const index = () => {
  return (
    <>
      
      <Terms />
    </>
  );
};

export default index;
// export default dynamic(() => Promise.resolve(index), { ssr: false });
