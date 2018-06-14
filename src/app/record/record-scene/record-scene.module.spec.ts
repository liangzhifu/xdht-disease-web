import { RecordSceneModule } from './record-scene.module';

describe('RecordSceneModule', () => {
  let recordSceneModule: RecordSceneModule;

  beforeEach(() => {
    recordSceneModule = new RecordSceneModule();
  });

  it('should create an instance', () => {
    expect(recordSceneModule).toBeTruthy();
  });
});
