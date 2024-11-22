import TextParallaxContent from "../../component/TextParallaxContent/TextParallaxContent";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypewriterText from "../../component/TypewriterText/TypewriterText";
import { useEffect, useState } from "react";
import { getAllfilteredProduct, getFeature } from "../../ApiGateways/products";
import { ITEM_PER_PAGE } from "../../utils/utils";
import HorizontalScroll from "../../component/HorizontalScroll/HorizontalScroll";

const TextParallaxContentComponent = () => {

  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    getAllfilteredProduct(1, ITEM_PER_PAGE, {},
      (data) => {
        setAllProduct(data?.data)
      },
      res => console.log(res)
    )
  }, []);


  const BrowseProduct = () => {
    return (
      <div className="bg-white p-5 rounded-xl hover:bg-indigo-800">
        <Button
          variant="contained"
          className="bg-indigo-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/products/all")}
        >
          Browse Products
        </Button>
      </div>
    )
  }

  const BodyComponent = () => {

    const [categoryType, setCategoryType] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
      getFeature(
        "",
        (data) => {
          setCategoryType([...new Set([...categoryType, ...(data?.data?.category?.map((item: any) => item?.name))])])
        },
        res => console.log(res)
      )
    }, []);

    return (
      <div>

        <section className="mb-[5rem]">
          <div className="px-4 py-6 bg-gray-100 mx-4 rounded-2xl">
            <h2 className="text-center text-xl font-bold text-gray-700 mb-4">
              Explore Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categoryType?.map((category, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-2 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                  onClick={() => navigate(`/products/${category}`)}
                >
                  {/* Icon Placeholder */}
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Typography className="text-blue-500 font-bold text-lg">{category.charAt(0).toUpperCase()}</Typography>
                  </div>
                  {/* Category Name */}
                  <Typography className="text-gray-700 font-medium capitalize text-sm text-center">{category.toUpperCase()}</Typography>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section>
          <HorizontalScroll products={allProduct} />
        </section>

      </div>
    )
  }

  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1680585499966-d73b4f54f127?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading={<BrowseProduct />}
        heading={<TypewriterText text="Your go-to shop for smart living" speed={80} />}
      >
        <BodyComponent />
      </TextParallaxContent>

      {/* <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent />
      </TextParallaxContent> */}

    </div>
  );
};




// const ExampleContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
//       Additional content explaining the above card here
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
//         blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
//         maiores voluptate est ut saepe accusantium maxime doloremque nulla
//         consectetur possimus.
//       </p>
//       <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
//         reiciendis blanditiis aliquam aut fugit sint.
//       </p>
//       <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
//         Learn more <FiArrowUpRight className="inline" />
//       </button>
//     </div>
//   </div>
// );

export default TextParallaxContentComponent;