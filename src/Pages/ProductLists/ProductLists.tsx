import { useContext, useEffect, useState } from "react";
import { getFeature } from "../../ApiGateways/products";
import { Context } from "../../state/Provider";
import { Button, Checkbox, Drawer, FormControlLabel, FormGroup, Slider, TextField, Typography } from "@mui/material";
import { MAX_PRICE_LIMIT } from "../../utils/utils";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";


type FilterProps = {
  filters: Record<string, string[]>;
  expandedKeys: Record<string, boolean>;
  setExpandedKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<any>>;
  checkboxStatus: Record<string, Record<string, boolean>>;
  setCheckboxStatus: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>
  categoryName: any;
}


const FilterTab = (props: FilterProps) => {
  const { filters, expandedKeys, setExpandedKeys, reset, setReset, setSelectedFilters, checkboxStatus, setCheckboxStatus, categoryName } = props;

  const { filterDict, setFilterDict } = useContext(Context);

  const clearFilters = () => {
    setCheckboxStatus({});
    setSelectedFilters(null);
    setReset(!reset);
  };


  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {

  };

  const noNegative = (value: number) => {
    if (value > 0) return Number(value);

    else return 0;
  }

  const handleMinPriceInputChange = (value: number) => {



  };

  const handleMaxPriceInputChange = (value: number) => {



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
          .filter(([key, values]) => values && values.length > 0)
      );

      const result = Object.keys(selectedValues).length > 0 ? selectedValues : null;

      // console.log(result);

      setSelectedFilters(result);


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
          step={100}
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


      {
        Object.entries(filters).map(([key, values], index) => (
          <article key={index} style={{ padding: "0.5rem 0 0.5rem 1rem" }} >
            <section
              onClick={() => setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }))}
              style={{ cursor: "pointer", display: "flex", flexFlow: "row nowrap", alignItems: "center", gap: "0 0.25rem", padding: "0.25rem 0" }}
            >
              {
                expandedKeys[key] ?
                  <ExpandMore style={{ marginRight: "0.25rem" }} /> :
                  <ChevronRightRounded style={{ marginRight: "0.25rem" }} />
              }
              <Typography variant="h5" sx={{ textTransform: "none" }}>
                {key.split(" ").map((k) => k ? k[0].toUpperCase() + k.slice(1) : "").join(" ")}
              </Typography>
            </section>
            <FormGroup style={{ display: expandedKeys[key] ? "flex" : "none", overflowY: 'auto' }}>
              {
                values.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={checkboxStatus[key]?.[value] || false}
                        onChange={() => handleChange(key, value)}
                      />
                    }
                    label={
                      <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                        {value.split(" ").map((k) => k ? k[0].toUpperCase() + k.slice(1) : "").join(" ")}
                      </Typography>
                    }
                    sx={{ marginLeft: "0.5rem" }}
                  />
                ))
              }
            </FormGroup>
          </article>
        ))
      }

    </section>
  )

}


const ProductLists = () => {

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryType, setCategoryType] = useState(["all"]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  const [checkboxStatus, setCheckboxStatus] = useState<Record<string, Record<string, boolean>>>({});
  const [selectedFilters, setSelectedFilters] = useState(null);

  const [openFilter, setOpenFilter] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {

    getFeature(
      categoryName,
      (data) => {
        setCategoryType([...categoryType, ...(data?.data?.category?.map((item: any) => item?.name))])
        setFilters(data?.data?.feature);
        setExpandedKeys(Object.keys(data?.data?.feature).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      },
      res => console.log(res)
    )

  }, []);


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
            setSelectedFilters={setSelectedFilters}
            checkboxStatus={checkboxStatus}
            setCheckboxStatus={setCheckboxStatus}
            categoryName={categoryName}
          />
        </Drawer>

        <article className="hidden lg:block col-span-1 row-span-4" >
          <FilterTab
            filters={filters}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            reset={reset}
            setReset={setReset}
            setSelectedFilters={setSelectedFilters}
            checkboxStatus={checkboxStatus}
            setCheckboxStatus={setCheckboxStatus}
            categoryName={categoryName}
          />
        </article>

        {/* <article className="col-span-4 lg:col-span-3 flex flex-col gap-12 items-center">
          <section className="flex gap-6 flex-wrap justify-center" >
            {all_products?.data?.map((item: any, id: number) => (
              <ProductCard
                key={id}
                item={item}
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
        </article> */}
      </div>
    </div>
  )
}

export default ProductLists
