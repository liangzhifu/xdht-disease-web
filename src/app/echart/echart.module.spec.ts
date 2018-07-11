import { EchartModule } from './echart.module';

describe('EchartModule', () => {
  let echartModule: EchartModule;

  beforeEach(() => {
    echartModule = new EchartModule();
  });

  it('should create an instance', () => {
    expect(echartModule).toBeTruthy();
  });
});
