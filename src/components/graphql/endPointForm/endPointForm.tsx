import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';
import classes from './endpointForm.module.scss';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest } from '@redux/selectors';
import { setRawRequest } from '@redux/endpointSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function EndpointForm() {
  const dispatch = useAppDispatch();
  const { language } = useLocale();
  const { URL } = useSelector(selectRawRequest);
  const [endPoint, setEndpoint] = useState(URL);

  const handleEndpoint = () => {
    dispatch(setRawRequest({ URL: endPoint }));
  };

  return (
    <div className={classes.endpoint}>
      <Input value={endPoint} onChange={(e) => setEndpoint(e.target.value)} placeholder={language.strings.endpointPlaceholder} />
      <Button mode="light" onClick={handleEndpoint}>
        {language.strings.setEndpoint}
      </Button>
    </div>
  );
}
