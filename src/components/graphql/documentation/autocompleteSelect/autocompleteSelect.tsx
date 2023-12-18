import { Input } from '@components/input/input';
import React, { useEffect } from 'react';
import { useState } from 'react';
import classes from './autocompleteSelect.module.scss';
import classNames from 'classnames';
import { GraphQlSearchInputType } from '@app_types/graphql';
import { useSelector } from 'react-redux';
import { selectAllEntities } from '@redux/docsSlice';
import { useDebounce } from '@uidotdev/usehooks';
import { filterItems } from './autocompleteSelectService';

type AutocompleteSelectProps = {
  placeholder?: string;
  errorMessage?: string;
  handleSelectItem: (entity: GraphQlSearchInputType) => void;
};

export const AutocompleteSelect = ({ placeholder, handleSelectItem, errorMessage }: AutocompleteSelectProps) => {
  const initItems = useSelector(selectAllEntities);
  const [inputValue, setInputValue] = useState('');
  const [itemsIsVisible, setItemsIsVisible] = useState(false);
  const [proposedItems, setProposedItems] = useState(initItems);
  const debounceInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setProposedItems(filterItems(inputValue, initItems));
  }, [debounceInputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setItemsIsVisible(true);
  };

  const handlerSelectList = (entity: GraphQlSearchInputType) => {
    const entityName = entity.fieldName || entity.typeName;
    setInputValue(entityName);
    setProposedItems(filterItems(entityName, initItems));
    setItemsIsVisible(false);
    handleSelectItem(entity);
  };

  const handleFocus = () => {
    if (inputValue) {
      setItemsIsVisible(true);
    }
  };

  const handleBlur = () => {
    setItemsIsVisible(false);
  };

  return (
    <section className={classes.autocompleteWrapper} onBlur={handleBlur}>
      <div onFocus={handleFocus}>
        <Input placeholder={placeholder} value={inputValue} onChange={handleChange} error={errorMessage} className={classes.autocompleteInput} />
      </div>
      <section className={classNames(classes.itemsWrapper, itemsIsVisible && classes.visible)}>
        <section className={classes.itemsScrollWrapper}>
          {proposedItems.map((proposedItem, index) => (
            <AutocompleteSelectLine key={index} item={proposedItem} onMouseDown={handlerSelectList} />
          ))}
        </section>
      </section>
    </section>
  );
};

type AutocompleteSelectLineProps = {
  item: GraphQlSearchInputType;
  onMouseDown: (entity: GraphQlSearchInputType) => void;
};

function AutocompleteSelectLine({ item, onMouseDown }: AutocompleteSelectLineProps) {
  return (
    <p className={classes.proposedItem} onMouseDown={() => onMouseDown(item)}>
      <span>{item.typeName}</span>
      {item.fieldName && <span>.{item.fieldName}</span>}
    </p>
  );
}
