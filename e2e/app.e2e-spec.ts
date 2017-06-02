import { PadrePage } from './app.po';

describe('padre App', () => {
  let page: PadrePage;

  beforeEach(() => {
    page = new PadrePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
