import classes from './endpointForm.module.scss';
import { Button } from '@components/button/button';
import { Input } from '@components/input/input';
import { useLocale } from '@localization/useLocale';
import { setRawRequest } from '@redux/endpointSlice';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest } from '@redux/selectors';
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
      <Input value={endPoint} onChange={(e) => setEndpoint(e.target.value)} placeholder={language.strings.placeholder.endpoint} />
      <Button mode="light" onClick={handleEndpoint}>
        {language.strings.setEndpoint}
      </Button>
    </div>
  );
}
