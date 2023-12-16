import { Input } from '@components/input/input';
import React from 'react';
import { useState } from 'react';
import classes from './autocompleteSelect.module.scss';
import classNames from 'classnames';
import { GraphQlSearchInputType } from '@app_types/graphql';
import { useSelector } from 'react-redux';
import { selectAllEntities } from '@redux/docsSlice';

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

  const filterItems = (value: string) => {
    value = value.toLowerCase();
    if (value === '') {
      return [];
    }

    return initItems.filter(
      (item) => (item.typeName.toLowerCase().toLowerCase().includes(value) && !item.fieldName) || item.fieldName?.toLocaleLowerCase().includes(value)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setItemsIsVisible(true);
    const filteredItems = filterItems(e.target.value);
    setProposedItems(filteredItems);
  };

  const handlerSelectList = (entity: GraphQlSearchInputType) => {
    setInputValue(entity.fieldName || entity.typeName);
    setProposedItems(filterItems(entity.fieldName || entity.typeName));
    setItemsIsVisible(false);
    handleSelectItem(entity);
  };

  const handleFocus = () => {
    if (inputValue !== '') {
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
            <p className={classes.proposedItem} key={index} onMouseDown={() => handlerSelectList(proposedItem)}>
              <span>{proposedItem.typeName}</span>
              {proposedItem.fieldName && (
                <>
                  <span>.</span>
                  <span>{proposedItem.fieldName}</span>
                </>
              )}
            </p>
          ))}
        </section>
      </section>
    </section>
  );
};
