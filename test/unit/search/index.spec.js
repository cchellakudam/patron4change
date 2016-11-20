import baseSpec from './base.spec';
import profileSpec from './profile.spec';

describe('Search Service', () => {

  describe('Base', baseSpec);

  describe('/profile', profileSpec);

  it('should find an inserted profile');
  it('should\'nt find a deleted profile');
});
