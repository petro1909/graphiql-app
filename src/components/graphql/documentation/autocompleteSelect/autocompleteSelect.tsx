import classes from './autocompleteSelect.module.scss';
import { filterItems } from './autocompleteSelectService';
import { GraphQlSearchInputType } from '@app_types/graphql';
import { Input } from '@components/input/input';
import { selectAllEntities } from '@redux/selectors';
import { classNames } from '@utils/classNames';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

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
  const debounceInputValue = useDebounce(inputValue, 500);

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
    <div className={classes.autocompleteWrapper} onBlur={handleBlur}>
      <div onFocus={handleFocus}>
        <Input placeholder={placeholder} value={inputValue} onChange={handleChange} error={errorMessage} className={classes.autocompleteInput} />
      </div>
      <div className={classNames(classes.itemsWrapper, itemsIsVisible && classes.visible)}>
        <div className={classes.itemsScrollWrapper}>
          {proposedItems.map((proposedItem, index) => (
            <AutocompleteSelectLine key={index} item={proposedItem} onMouseDown={handlerSelectList} />
          ))}
        </div>
      </div>
    </div>
  );
};

type AutocompleteSelectLineProps = {
  item: GraphQlSearchInputType;
  onMouseDown: (entity: GraphQlSearchInputType) => void;
};

function AutocompleteSelectLine({ item, onMouseDown }: AutocompleteSelectLineProps) {
  return (
    <p data-testid="proposedItem" className={classes.proposedItem} onMouseDown={() => onMouseDown(item)}>
      <span>{item.typeName}</span>
      {item.fieldName && <span>.{item.fieldName}</span>}
    </p>
  );
}
