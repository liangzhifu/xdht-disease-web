import { RecordPreEvaluationModule } from './record-pre-evaluation.module';

describe('RecordPreEvaluationModule', () => {
  let recordPreEvaluationModule: RecordPreEvaluationModule;

  beforeEach(() => {
    recordPreEvaluationModule = new RecordPreEvaluationModule();
  });

  it('should create an instance', () => {
    expect(recordPreEvaluationModule).toBeTruthy();
  });
});
