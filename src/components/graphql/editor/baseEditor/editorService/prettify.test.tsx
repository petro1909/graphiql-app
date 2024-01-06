import { prettify } from './prettify';
import { describe, expect, it } from 'vitest';

describe('test prettify function', () => {
  it('should prettify text', () => {
    const initText = `{
      empireHero  :   hero(episode:  EMPIRE)   {
        
    name
    
      }
    
    
         jediHero: hero(episode: JEDI) {
          name
      }
    }
    `;
    const prettifiedText = `{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}`;

    const actualPrettifiedText = prettify(initText);
    expect(actualPrettifiedText).toBe(prettifiedText);
  });
});
