import { BulbVoiceControlPage } from './app.po';

describe('bulb-voice-control App', function() {
  let page: BulbVoiceControlPage;

  beforeEach(() => {
    page = new BulbVoiceControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
