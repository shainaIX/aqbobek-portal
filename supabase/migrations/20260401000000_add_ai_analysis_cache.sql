CREATE TABLE IF NOT EXISTS ai_analysis_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  analysis JSONB NOT NULL,
  grades_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

  UNIQUE(student_id)
);

CREATE INDEX IF NOT EXISTS idx_ai_analysis_cache_student_id
  ON ai_analysis_cache(student_id);

CREATE INDEX IF NOT EXISTS idx_ai_analysis_cache_expires_at
  ON ai_analysis_cache(expires_at);

ALTER TABLE ai_analysis_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read own cache"
  ON ai_analysis_cache
  FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Service role can manage cache"
  ON ai_analysis_cache
  FOR ALL
  USING (auth.role() = 'service_role');
