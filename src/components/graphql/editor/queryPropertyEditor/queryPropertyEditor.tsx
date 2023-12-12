import { useState } from 'react';
import { HeadersEditor } from '../headersEditor/headersEditor';
import { VarsEditor } from '../varsEditor/varsEditor';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';

export function QueryPropertiesEditor() {
  const { language } = useLocale();
  const [isHeadersSelected, setIsHeadersSelected] = useState(true);

  return (
    <>
      <div>
        <Button mode="light" onClick={() => setIsHeadersSelected(true)}>
          {language.strings.headers}
        </Button>
        <Button mode="light" onClick={() => setIsHeadersSelected(false)}>
          {language.strings.variables}
        </Button>
      </div>
      {isHeadersSelected ? <HeadersEditor /> : <VarsEditor />}
    </>
  );
}
