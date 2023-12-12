import { useState } from 'react';
import { HeadersEditor } from '../headersEditor/headersEditor';
import { VarsEditor } from '../varsEditor/varsEditor';
import { Button } from '@components/button/button';

export function QueryPropertiesEditor() {
  const [isHeadersSelected, setIsHeadersSelected] = useState(true);

  return (
    <>
      <div>
        <Button mode="light" onClick={() => setIsHeadersSelected(true)}>
          Headers
        </Button>
        <Button mode="light" onClick={() => setIsHeadersSelected(false)}>
          Variables
        </Button>
      </div>
      {isHeadersSelected ? <HeadersEditor /> : <VarsEditor />}
    </>
  );
}
