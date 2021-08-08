import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import * as vars from '../../shared/globalVars';
import FilterList from './FilterList';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from './FiltersBar.module.scss';
import Card from '../UI/Card';
import Loader from '../UI/Loader';

const getMinMaxPrice = (list) => {
  let priceList = [];
  if (list[0].price) {
    priceList = list.map((item) => item.price);
  } else {
    const sizeObjList = list.map((item) => item.size);
    sizeObjList.forEach((item) => {
      for (const key in item) {
        priceList.push(item[key].price);
      }
    });
  }
  priceList.sort((a, b) => (a > b ? 1 : -1));
  const minPrice = parseInt(priceList[0]);
  const maxPrice = parseInt(priceList[priceList.length - 1]) + 1;
  return [minPrice, maxPrice];
};

const FiltersBar = (props) => {
  const { pathname } = useLocation();
  const { category, subcategory } = getSubcategoryName(pathname);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [checkedFilters, setCheckedFilters] = useState([]);
  const { filter } = props;

  const {
    value: enteredMinPrice,
    invalid: invalidMinPrice,
    error: minPriceError,
    changeHandler: minPriceChangeHandler,
    blurHandler: minPriceBlurHandler,
    reset: resetMinPrice,
  } = useInput('price', minPrice);

  const {
    value: enteredMaxPrice,
    invalid: invalidMaxPrice,
    error: maxPriceError,
    changeHandler: maxPriceChangeHandler,
    blurHandler: maxPriceBlurHandler,
    reset: resetMaxPrice,
  } = useInput('price', maxPrice);

  useEffect(() => {
    if (props.products.length) {
      const [min, max] = getMinMaxPrice(props.products);
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [props.products]);

  useEffect(() => filter(checkedFilters), [checkedFilters, filter]);

  const updateFilterList = (filterName, filterValue, action) => {
    if (action === vars.ADD) {
      setCheckedFilters((curState) => {
        const updatedState = [...curState];
        updatedState.push({ filterName, filterValue });
        return updatedState;
      });
    }
    if (action === vars.DELETE) {
      setCheckedFilters((curState) => {
        const updatedState = [...curState];
        const index = updatedState.findIndex(
          (item) => item === { filterName, filterValue }
        );
        updatedState.splice(index, 1);
        return updatedState;
      });
    }
  };

  let filters = [];

  if (props.products.length > 0) {
    if (category === vars.COFFEE) {
      const arabicaFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.ARABICA}
          property={vars.ARABICA}
          products={props.products}
        />
      );
      const sournessFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.SOURNESS}
          property={vars.SOURNESS}
          products={props.products}
        />
      );
      const swetnessFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.SWEETNESS}
          property={vars.SWEETNESS}
          products={props.products}
        />
      );
      const strengthFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.STRENGTH}
          property={vars.STRENGTH}
          products={props.products}
        />
      );

      filters.push(
        arabicaFilter,
        sournessFilter,
        swetnessFilter,
        strengthFilter
      );
    }

    if (subcategory === vars.MACHINES) {
      const brandFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.BRAND}
          property={vars.BRAND}
          products={props.products}
        />
      );
      const typeFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.TYPE}
          property={vars.TYPE}
          products={props.products}
        />
      );
      filters.push(brandFilter, typeFilter);
    }

    if (subcategory === vars.MACHINES || subcategory === vars.GRINDERS) {
      const warrantyFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.WARRANTY}
          property={vars.WARRANTY}
          products={props.products}
        />
      );
      filters.push(warrantyFilter);
    }

    if (
      subcategory === vars.MANUAL ||
      subcategory === vars.GRINDERS ||
      category === vars.ACCS
    ) {
      const materialFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.MATERIAL}
          property={vars.MATERIAL}
          products={props.products}
        />
      );
      filters.push(materialFilter);
    }

    if (subcategory !== vars.MACHINES) {
      const sizeFilter = (
        <FilterList
          filter={updateFilterList}
          key={vars.SIZE}
          property={vars.SIZE}
          products={props.products}
        />
      );
      filters.push(sizeFilter);
    }

    const priceFilter = (
      <Card key={vars.PRICE} className={styles.priceFilter}>
        <h4>Price</h4>
        <form>
          <div>
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              id="minPrice"
              onChange={minPriceChangeHandler}
              onBlur={minPriceBlurHandler}
              errorMsg={minPriceError}
              invalid={invalidMinPrice}
              value={enteredMinPrice}
            />
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              id="maxPrice"
              onChange={maxPriceChangeHandler}
              onBlur={maxPriceBlurHandler}
              errorMsg={maxPriceError}
              invalid={invalidMaxPrice}
              value={enteredMaxPrice}
            />
          </div>
          <Button submit btnStyle="btnSemilight">
            OK
          </Button>
        </form>
      </Card>
    );

    filters.push(priceFilter);
  }

  return (
    <aside className={styles.filtersBar}>
      {props.loading ? <Loader /> : filters}
      <Button btnStyle="btnDark">Reset Filters</Button>
    </aside>
  );
};

export default FiltersBar;