'use client';

import React from 'react';
import {Title} from "@/components/ui/shared/title";
import {useFilters, useIngredients, useQueryFilters} from "@/components/shop/hooks";
import {Input} from "@/components/ui/input";
import {CheckboxFiltersGroup} from "@/components/shop/checkbox-filters-group";
import {RangeSlider} from "@/components/shop/range-slider";



interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients(); // Убедитесь, что ingredients — это массив
  const filters = useFilters();

  useQueryFilters(filters);

  // Логирование для диагностики данных
  React.useEffect(() => {
    console.log('Ingredients:', ingredients); // Логируем значение ingredients при изменении
    console.log('Is Ingredients Array?', Array.isArray(ingredients)); // Проверяем, является ли ingredients массивом
  }, [ingredients]);

  // Проверка, что ingredients — это массив, если нет, то присваиваем пустой массив
  const items = Array.isArray(ingredients)
    ? ingredients.map((item) => ({ value: String(item.id), text: item.name }))
    : [];

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип аппарата"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Аппарат', value: '1' },
          { text: 'Комплект', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Виды"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: 'Аппарат', value: '20' },
          { text: 'Маска Yuwell', value: '30' },
          { text: 'Маска Resmed', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={400000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={400000}
            placeholder="400000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={400000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 400000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Аксессуары"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={loading ? [] : items.slice(0, 6)}
        items={loading ? [] : items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
