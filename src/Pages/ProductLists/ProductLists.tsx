import { useContext, useEffect, useState } from "react";
import { getAllfilteredProduct, getFeature } from "../../ApiGateways/products";
import { Context } from "../../state/Provider";
import { Backdrop, Button, Checkbox, CircularProgress, Collapse, Drawer, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Select, Slider, TextField, Typography } from "@mui/material";
import { ITEM_PER_PAGE, MAX_PRICE_LIMIT } from "../../utils/utils";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { setProducts } from "../../Redux/features/productSlice";
import ProductCard from "../../component/ProductCard/ProductCard";
import { useNavigate, useParams } from "react-router-dom";


type FilterProps = {
  filters: Record<string, string[]>;
  expandedKeys: Record<string, boolean>;
  setExpandedKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  checkboxStatus: Record<string, Record<string, boolean>>;
  setCheckboxStatus: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}


const FilterTab = (props: FilterProps) => {
  const { filters, expandedKeys, setExpandedKeys, reset, setReset, checkboxStatus, setCheckboxStatus, setCategoryName } = props;

  const { filterDict, setFilterDict } = useContext(Context);

  const clearFilters = () => {
    setCheckboxStatus({});
    setReset(!reset);
    setFilterDict({
      name: "",
      category: "",
      key_features: {},
      min_price: 0,
      max_price: MAX_PRICE_LIMIT
    });
    setCategoryName("all");
  };


  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilterDict((prev) => ({ ...prev, min_price: newValue[0], max_price: newValue[1] }))
    }
  };

  const noNegative = (value: number) => {
    if (value > 0) return Number(value);

    else return 0;
  }

  const handleMinPriceInputChange = (value: number) => {

    if (value > MAX_PRICE_LIMIT) {
      value = MAX_PRICE_LIMIT;
    }

    setFilterDict({
      ...filterDict,
      min_price: value
    })

  };

  const handleMaxPriceInputChange = (value: number) => {

    if (value > MAX_PRICE_LIMIT) {
      value = MAX_PRICE_LIMIT;
    }

    else if (value <= 0) {
      value = 1;
    }

    setFilterDict({
      ...filterDict,
      max_price: value
    })

  };

  const handleChange = (sectionKey: string, checkboxValue: string) => {


    setCheckboxStatus((prev) => {
      const updatedCheckboxStatus = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [checkboxValue]: !prev[sectionKey]?.[checkboxValue],
        },
      };


      const selectedValues = Object.fromEntries(
        Object.entries(updatedCheckboxStatus)
          .map(([key, values]) => [key, values && typeof values === 'object' ? Object.keys(values).filter(value => values[value]) : null])
          .filter(([_, values]) => values && values.length > 0)
      );

      const result = Object.keys(selectedValues).length > 0 ? selectedValues : null;

      setFilterDict((prev) => ({ ...prev, key_features: result }))

      return updatedCheckboxStatus;
    });

  };

  return (
    <section className={`rounded-2xl shadow-xl`} style={{ minWidth: "250px", backgroundColor: "#FFFFFF", padding: "0.5rem", border: "1px solid #9E9E9E" }} >

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={clearFilters} variant="outlined" size="small"
          sx={{
            marginTop: '1rem',
            textTransform: "none",
            color: "black",
            border: "1px solid black"
          }}>
          Clear Filters
        </Button>
      </div>

      <article style={{ padding: "0.5rem 0 0.5rem 1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5">
          Price Range
        </Typography>

        <Slider
          value={[filterDict?.min_price || 0, filterDict?.max_price || MAX_PRICE_LIMIT]}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={MAX_PRICE_LIMIT}
          step={1000}
          style={{ maxWidth: "90%", marginLeft: "0.5rem", color: "black" }}
        />

        <section style={{ display: "flex", justifyContent: "space-between", gap: "3rem" }}>
          <TextField
            type="number"
            value={filterDict?.min_price}
            onChange={(e) => handleMinPriceInputChange(noNegative(Number(e.target.value)))}
            label="Min Price"
            variant="outlined"
            size="small"
            style={{ marginTop: '1rem' }}
          />
          <TextField
            type="number"
            value={filterDict?.max_price}
            onChange={(e) => handleMaxPriceInputChange(noNegative(Number(e.target.value)))}
            label="Max Price"
            variant="outlined"
            size="small"
            style={{ marginTop: '1rem' }}
          />

        </section>
      </article>


      {Object.entries(filters).map(([key, values], index) => (
        <article key={index} style={{ marginBottom: "1rem" }}>
          {/* Filter Section Header */}
          <section
            onClick={() => setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }))}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
              padding: "0.5rem 0.5rem",
            }}
          >
            {expandedKeys[key] ? (
              <ExpandMore style={{ marginRight: "0.25rem", color: "#888" }} />
            ) : (
              <ChevronRightRounded style={{ marginRight: "0.25rem", color: "#888" }} />
            )}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
          </section>

          {/* Filter Options */}
          <Collapse in={expandedKeys[key]} timeout="auto" unmountOnExit>
            <FormGroup
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                maxWidth: "100%",
                paddingLeft: "2rem"
              }}
            >
              {values.map((value, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      checked={checkboxStatus[key]?.[value] || false}
                      onChange={() => handleChange(key, value)}
                      size="small"
                    />
                  }
                  label={value}
                  sx={{ flex: "1 0 45%" }}
                />
              ))}
            </FormGroup>
          </Collapse>
        </article>
      ))}

    </section>
  )

}


const ProductLists = () => {

  const { category } = useParams();
  const navigate = useNavigate();
  const [debounceTimeout, setDebounceTimeout] = useState<number>();
  const { filterDict, setFilterDict } = useContext(Context);
  const dispatch = useAppDispatch();
  const all_products = useAppSelector((state) => state.productState);

  const [categoryName, setCategoryName] = useState<string>(category as string);
  const [categoryType, setCategoryType] = useState(["all"]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  const [checkboxStatus, setCheckboxStatus] = useState<Record<string, Record<string, boolean>>>({});

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    navigate(`/products/${categoryName}`)
  }, [categoryName])

  useEffect(() => {
    if (category === "all") {
      setFilterDict({ ...filterDict, category: "" });
    }
    else {
      setFilterDict({ ...filterDict, category: category });
    }
  }, [category])


  useEffect(() => {

    setIsLoading(true);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      getAllfilteredProduct(page, ITEM_PER_PAGE, filterDict,
        (data) => {
          // console.log(data)
          dispatch(setProducts(data));
          setPage(data?.page);
          setTotalPage(data?.total_page);
          setIsLoading(false);
        },
        res => {
          console.log(res);
          setIsLoading(false);
        }
      )
    }, 1000);

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };


  }, [page, filterDict]);


  useEffect(() => {

    getFeature(
      categoryName === "all" ? "" : categoryName,
      (data) => {
        setCategoryType([...new Set([...categoryType, ...(data?.data?.category?.map((item: any) => item?.name))])])
        setFilters(data?.data?.feature);
        setExpandedKeys(Object.keys(data?.data?.feature).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      },
      res => console.log(res)
    )

  }, [categoryName]);



  return (
    <div className='px-4'>

      <div className='mt-8 block lg:hidden'>
        <Button onClick={() => setOpenFilter(true)} className=' bg-black opacity-80 hover:bg-green-400 text-white rounded-lg px-5'>Filter Option</Button>
      </div>
      <div className="grid grid-cols-4 gap-x-8 my-8" >
        <Drawer
          anchor="bottom"
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          className="block lg:hidden col-span-1 row-span-4"
          PaperProps={{
            style: {
              maxHeight: "50%",
              borderRadius: "1rem 1rem 0 0"
            }
          }}
        >
          <FilterTab
            filters={filters}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            reset={reset}
            setReset={setReset}
            checkboxStatus={checkboxStatus}
            setCheckboxStatus={setCheckboxStatus}
            setCategoryName={setCategoryName}
          />
        </Drawer>

        <article className="hidden lg:block col-span-1 row-span-4" >
          <FilterTab
            filters={filters}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            reset={reset}
            setReset={setReset}
            checkboxStatus={checkboxStatus}
            setCheckboxStatus={setCheckboxStatus}
            setCategoryName={setCategoryName}
          />
        </article>

        <article className="col-span-4 lg:col-span-3 flex flex-col gap-12 items-center">

          <section className="w-full">
            <FormControl fullWidth>
              <InputLabel id="select-autowidth-label-for-category">Select a Category</InputLabel>
              <Select
                className=" rounded-xl"
                labelId="select-autowidth-label-for-category"
                id="simple-select-autowidth"
                value={categoryName}
                onChange={(e) => {
                  const catVal = e.target.value as string
                  setCategoryName(catVal);
                  setFilterDict({
                    ...filterDict,
                    category: catVal === "all" ? "" : catVal
                  });
                }}

                label="Select a Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {
                  categoryType?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </section>

          {
            isLoading ?
              <>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={isLoading}
                  onClick={() => { }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <CircularProgress className=" text-violet-900" />
                    <Typography className=" text-center">Loading .....</Typography>
                  </div>

                </Backdrop>
              </>
              :
              <>

                {
                  all_products?.data?.length > 0 ?

                    <>
                      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" >
                        {all_products?.data?.map((item: any, id: number) => (
                          <ProductCard
                            key={id}
                            product={item}
                          />
                        ))}
                      </section>

                      <Pagination count={totalPage} page={page} onChange={(_event: any, value: number) => { setPage(value) }}
                        sx={{
                          "li > button": {
                            backgroundColor: "#73555f",
                            color: "white"
                          },
                          "li > button.Mui-selected": {
                            backgroundColor: "#3da15a",
                            color: "white"
                          }
                        }} />
                    </>
                    :
                    <>
                      <div className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-gradient-to-b from-gray-100 to-gray-300 p-6">
                        <Typography variant="h4" className="font-bold text-gray-700 mb-4">
                          No Product Found
                        </Typography>
                        <Typography variant="subtitle1" className="text-gray-500 text-center mb-6">
                          Explore our other category and start adding !
                        </Typography>
                        <Button
                          variant="contained"
                          className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                          onClick={() => setCategoryName("all")}
                        >
                          See All Products
                        </Button>
                      </div>

                    </>
                }

              </>
          }



        </article>
      </div>
    </div>
  )
}

export default ProductLists
